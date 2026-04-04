// Simple in-memory rate limiter (per IP, 10 requests per minute)
var rateLimitMap = {};
function checkRateLimit(ip) {
    var now = Date.now();
    if (!rateLimitMap[ip]) rateLimitMap[ip] = [];
    rateLimitMap[ip] = rateLimitMap[ip].filter(function(t) { return t > now - 60000; });
    if (rateLimitMap[ip].length >= 10) return false;
    rateLimitMap[ip].push(now);
    return true;
}

export default async function handler(req, res) {
    var ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || '*').trim();
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    try {
        var serviceId = process.env.EMAILJS_SERVICE_ID;
        var templateId = process.env.EMAILJS_TEMPLATE_ID;
        var publicKey = process.env.EMAILJS_PUBLIC_KEY;
        var privateKey = process.env.EMAILJS_PRIVATE_KEY || '';

        if (!serviceId || !templateId || !publicKey) {
            return res.status(500).json({ error: 'EmailJS not configured on server' });
        }

        var templateParams = req.body || {};

        // Reject empty requests
        if (!templateParams || Object.keys(templateParams).length === 0) {
            return res.status(400).json({ error: 'Missing template parameters' });
        }

        // EmailJS REST API requires different auth for server-side
        var payload = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams
        };

        // If private key is set, use accessToken auth instead
        if (privateKey) {
            payload.accessToken = privateKey;
        }

        var resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        var text = await resp.text();
        if (resp.ok) {
            return res.status(200).json({ message: 'Email sent' });
        } else {
            return res.status(resp.status).json({ error: 'Email send failed', status: resp.status });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
