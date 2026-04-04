// Simple in-memory rate limiter (per IP, 60 requests per minute)
var rateLimitMap = {};
function checkRateLimit(ip) {
    var now = Date.now();
    if (!rateLimitMap[ip]) rateLimitMap[ip] = [];
    rateLimitMap[ip] = rateLimitMap[ip].filter(function(t) { return t > now - 60000; });
    if (rateLimitMap[ip].length >= 60) return false;
    rateLimitMap[ip].push(now);
    return true;
}

// Allowed endpoint patterns for POST requests (prevents SSRF via arbitrary paths)
// Matches: 'rows', 'columns', 'attachments', 'rows/12345/attachments'
var ALLOWED_ENDPOINT_PATTERN = /^(rows|columns|attachments)(\/\d+\/(attachments|columns))?$/;
var ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

export default async function handler(req, res) {
    try {
        var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        if (!checkRateLimit(clientIp)) {
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        }

        const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || '*').trim();
        res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') return res.status(200).end();

        const apiToken = process.env.SMARTSHEET_API_TOKEN;
        if (!apiToken) {
            return res.status(500).json({ error: 'SMARTSHEET_API_TOKEN env var not set' });
        }

        const headers = { 'Authorization': 'Bearer ' + apiToken };

        // Validate sheetId format (must be numeric)
        function validateSheetId(id) {
            return id && /^\d+$/.test(id);
        }

        // Optionally restrict to allowed sheet IDs via env var
        function isSheetAllowed(id) {
            var allowed = process.env.ALLOWED_SHEET_IDS;
            if (!allowed) return true; // no restriction if env var not set
            return allowed.split(',').map(function(s) { return s.trim(); }).includes(id);
        }

        // GET: fetch sheet rows
        if (req.method === 'GET') {
            const sheetId = req.query.sheetId;
            if (!validateSheetId(sheetId)) return res.status(400).json({ error: 'Invalid or missing sheetId' });
            if (!isSheetAllowed(sheetId)) return res.status(403).json({ error: 'Sheet not allowed' });
            const resp = await fetch('https://api.smartsheet.com/2.0/sheets/' + sheetId, { headers: headers });
            const data = await resp.json();
            return res.status(resp.status).json(data);
        }

        // DELETE: delete a row
        if (req.method === 'DELETE') {
            const sheetId = req.query.sheetId;
            const rowId = req.query.rowId;
            if (!validateSheetId(sheetId)) return res.status(400).json({ error: 'Invalid or missing sheetId' });
            if (!rowId || !/^\d+$/.test(rowId)) return res.status(400).json({ error: 'Invalid or missing rowId' });
            if (!isSheetAllowed(sheetId)) return res.status(403).json({ error: 'Sheet not allowed' });
            const resp = await fetch(
                'https://api.smartsheet.com/2.0/sheets/' + sheetId + '/rows?ids=' + rowId + '&ignoreRowsNotFound=true',
                { method: 'DELETE', headers: headers }
            );
            const data = await resp.json();
            return res.status(resp.status).json(data);
        }

        // POST: create row or attach file
        if (req.method === 'POST') {
            const sheetId = req.body && req.body.sheetId;
            const endpoint = (req.body && req.body.endpoint) || 'rows';
            const method = (req.body && req.body.method) || 'POST';
            const body = req.body && req.body.body;

            if (!validateSheetId(sheetId)) return res.status(400).json({ error: 'Invalid or missing sheetId' });
            if (!isSheetAllowed(sheetId)) return res.status(403).json({ error: 'Sheet not allowed' });

            // Restrict endpoint to allowlist pattern (prevents SSRF)
            if (!ALLOWED_ENDPOINT_PATTERN.test(endpoint)) {
                return res.status(400).json({ error: 'Invalid endpoint' });
            }

            // Restrict HTTP method to allowlist
            if (!ALLOWED_METHODS.includes(method.toUpperCase())) {
                return res.status(400).json({ error: 'Invalid method' });
            }

            const url = 'https://api.smartsheet.com/2.0/sheets/' + sheetId + '/' + endpoint;

            const fetchOpts = {
                method: method.toUpperCase(),
                headers: { 'Authorization': 'Bearer ' + apiToken },
            };

            if (req.body.pdfBase64) {
                var pdfBuffer = Buffer.from(req.body.pdfBase64, 'base64');
                // Sanitize filename: strip path separators and control characters
                var filename = (req.body.filename || 'attachment.pdf').replace(/[\/\\<>:"|?*\x00-\x1f]/g, '_');
                fetchOpts.headers['Content-Type'] = 'application/pdf';
                fetchOpts.headers['Content-Length'] = String(pdfBuffer.length);
                fetchOpts.headers['Content-Disposition'] = 'attachment; filename="' + filename + '"';
                fetchOpts.body = pdfBuffer;
            } else if (body) {
                fetchOpts.headers['Content-Type'] = 'application/json';
                fetchOpts.body = JSON.stringify(body);
            }

            const resp = await fetch(url, fetchOpts);
            const text = await resp.text();

            try {
                var data = JSON.parse(text);
                return res.status(resp.status).json(data);
            } catch (e) {
                return res.status(resp.status).json({ message: resp.ok ? 'SUCCESS' : 'FAILED', raw: text });
            }
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
