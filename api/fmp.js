// Simple in-memory rate limiter (per IP, 30 requests per minute)
var rateLimitMap = {};
function checkRateLimit(ip) {
    var now = Date.now();
    if (!rateLimitMap[ip]) rateLimitMap[ip] = [];
    rateLimitMap[ip] = rateLimitMap[ip].filter(function(t) { return t > now - 60000; });
    if (rateLimitMap[ip].length >= 30) return false;
    rateLimitMap[ip].push(now);
    return true;
}

export default async function handler(req, res) {
    var ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || '*').trim();
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    try {
        var apiKey = process.env.FMP_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'FMP API key not configured on server' });
        }

        var ticker = req.query.ticker;
        if (!ticker || !/^[A-Za-z0-9.]+$/.test(ticker)) {
            return res.status(400).json({ error: 'Invalid or missing ticker' });
        }

        var url = 'https://financialmodelingprep.com/api/v3/profile/' + encodeURIComponent(ticker) + '?apikey=' + apiKey;
        var resp = await fetch(url);
        var data = await resp.json();
        return res.status(resp.status).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
