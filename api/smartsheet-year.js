export default async function handler(req, res) {
    const ALLOWED_ORIGIN = (process.env.ALLOWED_ORIGIN || '*').trim();
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const apiToken = process.env.SMARTSHEET_API_TOKEN;
    if (!apiToken) {
        return res.status(500).json({ error: 'Smartsheet API token not configured on server' });
    }

    const { workspaceId, templateSheetId, planName } = req.query;
    if (!workspaceId || !templateSheetId) {
        return res.status(400).json({ error: 'Missing required query params' });
    }

    const year = new Date().getFullYear();
    const sheetName = `${year} ${planName || 'Participant Tracking'}`;
    const headers = { 'Authorization': `Bearer ${apiToken}` };

    try {
        const wsResp = await fetch(`https://api.smartsheet.com/2.0/workspaces/${workspaceId}`, { headers });
        const wsData = await wsResp.json();

        const existingSheet = (wsData.sheets || []).find(s => s.name.startsWith(`${year} `));
        if (existingSheet) {
            const sheetResp = await fetch(`https://api.smartsheet.com/2.0/sheets/${existingSheet.id}?include=columns`, { headers });
            const sheetData = await sheetResp.json();
            const columnMap = {};
            (sheetData.columns || []).forEach(col => {
                const fieldName = titleToFieldName(col.title);
                if (fieldName) columnMap[fieldName] = col.id;
            });
            return res.status(200).json({ sheetId: String(existingSheet.id), columnMap, year, created: false });
        }

        const templateResp = await fetch(`https://api.smartsheet.com/2.0/sheets/${templateSheetId}/columns`, { headers });
        const templateData = await templateResp.json();

        const columns = (templateData.data || []).map((col, i) => ({
            title: col.title,
            type: col.type,
            ...(i === 0 ? { primary: true } : {})
        }));

        const createResp = await fetch(`https://api.smartsheet.com/2.0/workspaces/${workspaceId}/sheets`, {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: sheetName, columns })
        });
        const createData = await createResp.json();

        if (!createResp.ok) {
            return res.status(createResp.status).json({ error: 'Failed to create sheet', details: createData });
        }

        const newSheetId = createData.result.id;
        const newSheetResp = await fetch(`https://api.smartsheet.com/2.0/sheets/${newSheetId}?include=columns`, { headers });
        const newSheetData = await newSheetResp.json();
        const columnMap = {};
        (newSheetData.columns || []).forEach(col => {
            const fieldName = titleToFieldName(col.title);
            if (fieldName) columnMap[fieldName] = col.id;
        });

        return res.status(200).json({ sheetId: String(newSheetId), columnMap, year, created: true });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

function titleToFieldName(title) {
    const map = {
        'First Name': 'firstName', 'Last Name': 'lastName', 'Email': 'email',
        'Phone': 'phone', 'Date of Birth': 'dob', 'Pretax %': 'pretax',
        'Roth %': 'roth', 'Match / Paycheck': 'match', 'Total to 401(k)': 'total',
        'Risk Profile': 'riskProfile', 'Selected Fund': 'fund',
        'Projected Balance': 'projBalance', 'Income Target': 'incomeTarget',
        'Gap / Surplus': 'gap', 'Facility': 'facility', 'Visit Date': 'visitDate',
        'Advisor': 'advisor', 'Investment Selected': 'investmentSelected',
        'Meeting Reasons': 'meetingReasons', 'Loan Details': 'loan',
        'Rollover Details': 'rollover', 'Notes': 'notes', 'Submitted At': 'submittedAt'
    };
    return map[title] || null;
}
