export default async function handler(req, res) {
    var ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || '*').trim();
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        var serviceId = process.env.EMAILJS_SERVICE_ID;
        var templateId = process.env.EMAILJS_TEMPLATE_ID;
        var publicKey = process.env.EMAILJS_PUBLIC_KEY;
        var privateKey = process.env.EMAILJS_PRIVATE_KEY || '';

        if (!serviceId || !templateId || !publicKey) {
            return res.status(500).json({ error: 'EmailJS not configured: missing SERVICE_ID, TEMPLATE_ID, or PUBLIC_KEY' });
        }

        var templateParams = req.body || {};

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
            return res.status(resp.status).json({ error: text, status: resp.status });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
