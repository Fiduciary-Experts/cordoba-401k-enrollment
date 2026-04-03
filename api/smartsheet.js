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

        // GET: fetch sheet rows
        if (req.method === 'GET') {
            const sheetId = req.query.sheetId;
            if (!sheetId) return res.status(400).json({ error: 'Missing sheetId' });
            const resp = await fetch('https://api.smartsheet.com/2.0/sheets/' + sheetId, { headers: headers });
            const data = await resp.json();
            return res.status(resp.status).json(data);
        }

        // DELETE: delete a row
        if (req.method === 'DELETE') {
            const sheetId = req.query.sheetId;
            const rowId = req.query.rowId;
            if (!sheetId || !rowId) return res.status(400).json({ error: 'Missing sheetId or rowId' });
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

            if (!sheetId) return res.status(400).json({ error: 'Missing sheetId in body' });

            const url = 'https://api.smartsheet.com/2.0/sheets/' + sheetId + '/' + endpoint;

            const fetchOpts = {
                method: method,
                headers: { 'Authorization': 'Bearer ' + apiToken },
            };

            if (req.body.pdfBase64) {
                var pdfBuffer = Buffer.from(req.body.pdfBase64, 'base64');
                fetchOpts.headers['Content-Type'] = 'application/pdf';
                fetchOpts.headers['Content-Length'] = String(pdfBuffer.length);
                fetchOpts.headers['Content-Disposition'] = 'attachment; filename="' + (req.body.filename || 'attachment.pdf') + '"';
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
        return res.status(500).json({ error: err.message, stack: err.stack });
    }
}
