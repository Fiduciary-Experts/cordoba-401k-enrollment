// ============================================================
//  CLIENT CONFIGURATION — Cordoba Corporation 401(k) Plan
//  Swap this file for each new client. index.html is the
//  shared template and should never need to be edited.
// ============================================================

const clientConfig = {

    // ----------------------------------------------------------
    // Admin Password — Change this to reset the advisor login
    // ----------------------------------------------------------
    // Password verified via simple hash comparison (not plaintext)
    adminPasswordHash: '-yzakq',
    adminResetEmail: 'ed@401kfe.com',

    // ----------------------------------------------------------
    // Branding & Identity
    // ----------------------------------------------------------
    pageTitle:    'Cordoba Corporation - 401(k) Plan',
    planName:     'Cordoba Corporation',
    planSubtitle: '401(k) Plan',

    // Logos (leave as empty string '' to hide)
    clientLogoUrl:    'CORDOBA.png',
    fiduciaryLogoUrl: 'fiduciary-experts-logo.png',

    // Theme colors — Cordoba Corporation brand (burgundy/maroon with warm gold accent)
    colors: {
        primary:      '#4a0e1a',
        primaryLight: '#7a1830',
        accent:       '#d4a03c',
        accentLight:  '#e6b84d'
    },

    // ----------------------------------------------------------
    // Login / CTA
    // ----------------------------------------------------------
    loginUrl:  'https://nb.fidelity.com/static/mybenefits/netbenefitslogin/#/login',
    loginText: 'Log In to Fidelity',
    ctaTitle:  'Ready to Invest?',
    ctaBody:   'Log in to your Fidelity retirement account to select your investment allocation and start putting your plan into action.',

    // ----------------------------------------------------------
    // EmailJS — Auto-send enrollment guide emails with PDF attachment
    // Sign up at https://www.emailjs.com (free: 200 emails/month)
    // Leave blank to fall back to mailto: (manual email client)
    // ----------------------------------------------------------
    emailjs: {
        publicKey:  '2svHaheksv3TZXaCU',
        serviceId:  'service_jmolsjx',
        templateId: 'template_37a9b7s',
    },

    // ----------------------------------------------------------
    // Smartsheet — Admin tracking integration
    // apiToken: your Smartsheet API token
    // sheetId: the numeric ID of the target sheet
    // columnMap: maps form field names -> Smartsheet column IDs
    // To find column IDs, run: GET https://api.smartsheet.com/2.0/sheets/{sheetId}
    // ----------------------------------------------------------
    smartsheet: {
        // API token is now stored securely in Vercel environment variables (SMARTSHEET_API_TOKEN)
        workspaceId: '2982055152772996',
        templateSheetId: '6601073713172356',
        planName: 'Cordoba Corporation - Participant Tracking',
        sheetId: '6601073713172356',
        columnMap: {
            firstName:      332870444158852,
            lastName:       5726951009718148,
            email:          6518316383637380,
            phone:          1858480408661892,
            dob:            1683949043879812,
            pretax:         748629116882820,
            roth:           6612436900941700,
            match:          3459603884183428,
            total:          3465582478659460,
            riskProfile:    8699528409812868,
            fund:           4784889661788036,
            projBalance:    5660737646399364,
            incomeTarget:   3970942893330308,
            gap:            4906522531630980,
            facility:       6869992600801156,
            visitDate:      8282676063932292,
            advisor:        3146457818632068,
            investmentSelected: 1493977741430660,
            meetingReasons:  5252228744253316,
            loan:           7927546693062532,
            rollover:       2354836894158724,
            notes:          3374774589099908,
            submittedAt:    6590527668785028
        }
    },

    // ----------------------------------------------------------
    // Default Pretax Contribution (auto-enrollment default)
    // Slider starts at this value on page load. Set to 0 to disable.
    // ----------------------------------------------------------
    defaultPretax: 4,

    // ----------------------------------------------------------
    // Employer Match Formula
    // ratePerDollar: match rate (0.50 = 50 cents per dollar)
    // maxContribPct: match applies up to this % of gross pay
    // Auto-enrolled at 4% pretax
    // ----------------------------------------------------------
    employerMatch: {
        ratePerDollar: 0.50,
        maxContribPct: 7
    },

    // Estimated payroll deduction rate (taxes + benefits, excluding 401k)
    // Used to estimate gross from net when only net pay is provided.
    // 0.28 = ~28% average for CA employees earning $20K-$80K annually.
    estimatedDeductionRate: 0.28,

    // FMP API key moved to Vercel env var (FMP_API_KEY) — used by /api/fmp proxy

    // ----------------------------------------------------------
    // Plan Fund Lineup — for auto-suggest in the Asset Allocation Analyzer.
    // Each fund has a ticker, name, and category for allocation inference.
    // Participants can also enter tickers not on this list.
    // ----------------------------------------------------------
    // Performance data sourced from Fi360 Monitoring Report, Yahoo Finance,
    // and Morningstar. Updated quarterly.
    planFunds: [
        // U.S. Equity — Large Cap
        // Performance data from Fi360 Monitoring Report (3/31/2026)
        // U.S. Equity — Large Cap
        { ticker: 'FXAIX',  name: 'Fidelity 500 Index', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.02%', performance: { yr1: '17.79%', yr5: '12.05%', yr10: '14.15%' } },
        { ticker: 'VIGAX',  name: 'Vanguard Growth Index Admiral', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.05%', performance: { yr1: '18.25%', yr5: '11.80%', yr10: '16.12%' } },
        { ticker: 'VTSAX',  name: 'Vanguard Total Stock Market Index Admiral', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.04%', performance: { yr1: '18.18%', yr5: '10.76%', yr10: '13.67%' } },
        { ticker: 'VFTAX',  name: 'Vanguard FTSE Social Index Admiral', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.13%', performance: { yr1: '15.59%', yr5: '10.73%', yr10: '14.31%' } },
        // U.S. Equity — Mid Cap
        { ticker: 'FSMDX',  name: 'Fidelity Mid Cap Index', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.03%', performance: { yr1: '15.99%', yr5: '7.26%', yr10: '10.90%' } },
        { ticker: 'MJRFX',  name: 'BlackRock Mid-Cap Value Equity K', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.72%', performance: { yr1: '12.29%', yr5: '7.63%', yr10: '10.49%' } },
        // U.S. Equity — Small Cap
        { ticker: 'VSMAX',  name: 'Vanguard Small Cap Index Admiral', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.05%', performance: { yr1: '19.73%', yr5: '5.67%', yr10: '10.53%' } },
        { ticker: 'VSGAX',  name: 'Vanguard Small Cap Growth Index Admiral', category: 'U.S. Equity', stocks: 100, bonds: 0, expenseRatio: '0.07%', performance: { yr1: '20.69%', yr5: '2.56%', yr10: '10.50%' } },
        // International Equity
        { ticker: 'FSPSX',  name: 'Fidelity International Index', category: 'International Equity', stocks: 100, bonds: 0, expenseRatio: '0.04%', performance: { yr1: '23.40%', yr5: '8.59%', yr10: '8.82%' } },
        { ticker: 'VEMAX',  name: 'Vanguard Emerging Markets Stock Index Admiral', category: 'International Equity', stocks: 100, bonds: 0, expenseRatio: '0.13%', performance: { yr1: '21.91%', yr5: '3.85%', yr10: '7.52%' } },
        { ticker: 'RNPGX',  name: 'American Funds New Perspective R6', category: 'International Equity', stocks: 100, bonds: 0, expenseRatio: '0.40%', performance: { yr1: '17.48%', yr5: '7.72%', yr10: '12.72%' } },
        { ticker: 'CHILX',  name: 'BlackRock China A Opportunities Institutional', category: 'International Equity', stocks: 100, bonds: 0, expenseRatio: '2.87%', performance: { yr1: '22.77%', yr5: '-0.45%', yr10: '-' } },
        // Real Estate
        { ticker: 'VGSLX',  name: 'Vanguard Real Estate Index Admiral', category: 'Real Estate', stocks: 100, bonds: 0, expenseRatio: '0.13%', performance: { yr1: '1.84%', yr5: '3.17%', yr10: '4.64%' } },
        { ticker: 'CSRSX',  name: 'Cohen & Steers Realty Shares', category: 'Real Estate', stocks: 100, bonds: 0, expenseRatio: '0.93%', performance: { yr1: '3.17%', yr5: '4.71%', yr10: '6.30%' } },
        // Allocation
        { ticker: 'FPKFX',  name: 'Fidelity Puritan K6', category: 'Moderate Allocation', stocks: 60, bonds: 40, expenseRatio: '0.33%', performance: { yr1: '14.26%', yr5: '8.27%', yr10: '-' } },
        // Bond / Fixed Income
        { ticker: 'VBTLX',  name: 'Vanguard Total Bond Market Index Admiral', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.04%', performance: { yr1: '4.32%', yr5: '0.33%', yr10: '1.67%' } },
        { ticker: 'PIMIX',  name: 'PIMCO Income Institutional', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.54%', performance: { yr1: '6.91%', yr5: '3.81%', yr10: '4.85%' } },
        { ticker: 'PFORX',  name: 'PIMCO International Bond (USD-Hedged) Institutional', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.57%', performance: { yr1: '2.41%', yr5: '1.32%', yr10: '2.88%' } },
        { ticker: 'BCOIX',  name: 'Baird Core Plus Bond Institutional', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.30%', performance: { yr1: '4.57%', yr5: '0.92%', yr10: '2.54%' } },
        { ticker: 'VMBSX',  name: 'Vanguard Mortgage-Backed Securities Index Admiral', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.06%', performance: { yr1: '5.65%', yr5: '0.45%', yr10: '1.38%' } },
        { ticker: 'VWEAX',  name: 'Vanguard High Yield Corporate Admiral', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.12%', performance: { yr1: '7.10%', yr5: '4.10%', yr10: '5.38%' } },
        { ticker: 'VFIDX',  name: 'Vanguard Intermediate-Term Investment Grade Admiral', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.09%', performance: { yr1: '6.10%', yr5: '1.56%', yr10: '2.85%' } },
        { ticker: 'BPLBX',  name: 'BlackRock Inflation Protected Bond K', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '1.09%', performance: { yr1: '3.07%', yr5: '1.43%', yr10: '2.74%' } },
        { ticker: 'FBIIX',  name: 'Fidelity International Bond Index', category: 'Bond / Fixed Income', stocks: 0, bonds: 100, expenseRatio: '0.06%', performance: { yr1: '2.66%', yr5: '0.56%', yr10: '-' } },
        // Stable Value
        { ticker: 'PUTSV', name: 'Putnam Stable Value Fund', category: 'Stable Value', stocks: 0, bonds: 100, expenseRatio: '0.37%', performance: { yr1: '3.95%', yr5: '3.21%', yr10: '2.70%' } },
        // Money Market
        { ticker: 'VUSXX',  name: 'Vanguard Treasury Money Market Investor', category: 'Money Market', stocks: 0, bonds: 100, expenseRatio: '0.07%', performance: { yr1: '4.07%', yr5: '3.37%', yr10: '2.22%' } },
        // American Funds Target Date R6 Series
        { ticker: 'RFTTX',  name: 'American Funds Target Date 2010 R6', category: 'Target Date', stocks: 30, bonds: 70, expenseRatio: '0.29%', performance: { yr1: '10.28%', yr5: '5.31%', yr10: '6.35%' } },
        { ticker: 'RFJTX',  name: 'American Funds Target Date 2015 R6', category: 'Target Date', stocks: 35, bonds: 65, expenseRatio: '0.30%', performance: { yr1: '10.62%', yr5: '5.42%', yr10: '6.68%' } },
        { ticker: 'RRCTX',  name: 'American Funds Target Date 2020 R6', category: 'Target Date', stocks: 40, bonds: 60, expenseRatio: '0.30%', performance: { yr1: '11.29%', yr5: '5.67%', yr10: '7.13%' } },
        { ticker: 'RFDTX',  name: 'American Funds Target Date 2025 R6', category: 'Target Date', stocks: 50, bonds: 50, expenseRatio: '0.31%', performance: { yr1: '11.60%', yr5: '5.76%', yr10: '7.86%' } },
        { ticker: 'RFETX',  name: 'American Funds Target Date 2030 R6', category: 'Target Date', stocks: 60, bonds: 40, expenseRatio: '0.33%', performance: { yr1: '13.12%', yr5: '6.40%', yr10: '8.90%' } },
        { ticker: 'RFFTX',  name: 'American Funds Target Date 2035 R6', category: 'Target Date', stocks: 68, bonds: 32, expenseRatio: '0.34%', performance: { yr1: '14.63%', yr5: '7.20%', yr10: '10.10%' } },
        { ticker: 'RFGTX',  name: 'American Funds Target Date 2040 R6', category: 'Target Date', stocks: 75, bonds: 25, expenseRatio: '0.36%', performance: { yr1: '17.42%', yr5: '8.14%', yr10: '10.91%' } },
        { ticker: 'RFHTX',  name: 'American Funds Target Date 2045 R6', category: 'Target Date', stocks: 82, bonds: 18, expenseRatio: '0.37%', performance: { yr1: '18.26%', yr5: '8.32%', yr10: '11.13%' } },
        { ticker: 'RFITX',  name: 'American Funds Target Date 2050 R6', category: 'Target Date', stocks: 87, bonds: 13, expenseRatio: '0.37%', performance: { yr1: '18.37%', yr5: '8.25%', yr10: '11.18%' } },
        { ticker: 'RFKTX',  name: 'American Funds Target Date 2055 R6', category: 'Target Date', stocks: 90, bonds: 10, expenseRatio: '0.38%', performance: { yr1: '18.89%', yr5: '8.23%', yr10: '11.16%' } },
        { ticker: 'RFUTX',  name: 'American Funds Target Date 2060 R6', category: 'Target Date', stocks: 90, bonds: 10, expenseRatio: '0.39%', performance: { yr1: '18.96%', yr5: '8.21%', yr10: '11.14%' } },
        { ticker: 'RFVTX',  name: 'American Funds Target Date 2065 R6', category: 'Target Date', stocks: 90, bonds: 10, expenseRatio: '0.39%', performance: { yr1: '18.97%', yr5: '8.21%', yr10: '-' } },
    ],

    // ----------------------------------------------------------
    // Footer
    // ----------------------------------------------------------
    footerName:       'Cordoba Corporation 401(k) Plan',
    // Update this date whenever fund performance data is refreshed (e.g., '3/31/2026' → '6/30/2026')
    fundDataAsOf: '3/31/2026',
    footerDisclaimer: null, // Built automatically in initPage using fundDataAsOf

    // ----------------------------------------------------------
    // Target Date Fund — Name Template & Brackets
    // [YEAR] is replaced with the participant's target retirement year.
    // ----------------------------------------------------------
    targetDateNameTemplate: 'American Funds Target Date [YEAR] R6',

    // American Funds Target Date R6 Series — glide path brackets
    // Performance from Fi360 Monitoring Report (3/31/2026)
    targetDateBrackets: [
        { minYears: 25, stockBond: '~90% Stocks / ~10% Bonds', riskLevel: 'Aggressive (becomes more conservative over time)', performance: { yr1: '18.89%', yr3: '15.50%', yr5: '8.23%', yr10: '11.16%' }, allocation: ['Diversified mix of American Funds U.S. equity funds', 'American Funds international equity funds', 'American Funds bond funds and short-term funds', 'Glide path automatically adjusts toward bonds as you near [YEAR]'] },
        { minYears: 20, stockBond: '~85% Stocks / ~15% Bonds', riskLevel: 'Moderately Aggressive (becomes more conservative over time)', performance: { yr1: '18.37%', yr3: '15.32%', yr5: '8.25%', yr10: '11.18%' }, allocation: ['Diversified mix of American Funds U.S. equity funds', 'American Funds international equity funds', 'American Funds bond funds and short-term funds', 'Glide path automatically adjusts toward bonds as you near [YEAR]'] },
        { minYears: 15, stockBond: '~75% Stocks / ~25% Bonds', riskLevel: 'Moderate Growth (becomes more conservative over time)', performance: { yr1: '17.42%', yr3: '14.73%', yr5: '8.14%', yr10: '10.91%' }, allocation: ['Diversified mix of American Funds U.S. equity funds', 'American Funds international equity funds', 'American Funds investment-grade bond funds', 'Glide path automatically adjusts toward bonds as you near [YEAR]'] },
        { minYears: 10, stockBond: '~68% Stocks / ~32% Bonds', riskLevel: 'Moderate (becomes more conservative over time)', performance: { yr1: '14.63%', yr3: '12.98%', yr5: '7.20%', yr10: '10.10%' }, allocation: ['Diversified mix of American Funds U.S. equity funds', 'American Funds international equity funds', 'American Funds investment-grade and high-yield bond funds', 'Glide path automatically adjusts toward bonds as you near [YEAR]'] },
        { minYears: 5, stockBond: '~50% Stocks / ~50% Bonds', riskLevel: 'Moderately Conservative (near target date)', performance: { yr1: '11.60%', yr3: '10.34%', yr5: '5.76%', yr10: '7.86%' }, allocation: ['Diversified mix of American Funds U.S. equity funds', 'American Funds international equity funds', 'American Funds investment-grade bond funds', 'American Funds short-term funds', 'Glide path automatically adjusts toward bonds as you near [YEAR]'] },
        { minYears: -1, stockBond: '~30% Stocks / ~55% Bonds / ~15% Cash', riskLevel: 'Conservative (at or past target date)', performance: { yr1: '10.28%', yr3: '9.09%', yr5: '5.31%', yr10: '6.35%' }, allocation: ['~15% American Funds U.S. Equity', '~15% American Funds International Equity', '~40% American Funds Domestic Bonds', '~15% American Funds International Bonds', '~15% American Funds Short-Term / Cash', 'Designed for investors at or past retirement'] }
    ],

    // ----------------------------------------------------------
    // Model Portfolios
    // Set to false if the client has no model portfolios.
    // When false, the target date fund becomes the Best Match.
    // ----------------------------------------------------------
    hasModelPortfolios: true,

    // ----------------------------------------------------------
    // Risk Profile -> Fund Mapping
    // Scores are cumulative (timeScore + riskScore).
    // modelFund: null if client has no model portfolios.
    // ----------------------------------------------------------
    // Score range: timeScore (0-5) + riskScore (9-37 from 9 questions) = 9-42 total
    riskProfiles: [
        { maxScore: 16,       profile: 'Conservative',            modelFund: 'modelConservative', allocationFund: null },
        { maxScore: 22,       profile: 'Moderately Conservative', modelFund: 'modelConservative', allocationFund: 'fpkfx' },
        { maxScore: 28,       profile: 'Moderate',                modelFund: 'modelBalance',      allocationFund: null },
        { maxScore: 33,       profile: 'Moderate Growth',         modelFund: 'modelModerate',     allocationFund: null },
        { maxScore: 38,       profile: 'Moderately Aggressive',   modelFund: 'modelAggressive',   allocationFund: null },
        { maxScore: Infinity, profile: 'Aggressive',              modelFund: 'modelAggressive',   allocationFund: null }
    ],

    // ----------------------------------------------------------
    // Fund Data
    // Add, remove, or edit funds here for each client.
    // ----------------------------------------------------------
    fundData: {

        // -- Model Portfolios (Fi360 data as of 3/31/2026) --------------------

        modelAggressive: {
            id: 'modelAggressive',
            type: 'Model Portfolio',
            name: 'Cordoba Aggressive Model',
            badge: 'Best Match',
            shortDesc: 'A diversified portfolio targeting 85% equity and 15% fixed income, designed for participants seeking maximum long-term growth.',
            riskLevel: 'Aggressive',
            stockBond: '85% Equity / 15% Fixed Income',
            expenseRatio: '0.17%',
            turnover: 'Low',
            minInvestment: 'None',
            bestFor: 'Participants with 20+ years to retirement who want maximum growth potential and can tolerate significant short-term volatility.',
            performance: { yr1: '14.90%', yr3: '12.04%', yr5: '6.19%', yr10: '-' },
            stats: { sharpe3yr: '0.66', stdDev3yr: '11.04%', inception: '6/1/2020', rebalance: 'Manual' },
            description: 'The Cordoba Aggressive Model is constructed using individual funds available in the Cordoba Corporation 401(k) plan. It targets approximately 85% equity across U.S. large-cap, mid-cap, small-cap, international, and real estate, with about 15% in inflation-protected bonds and international bonds for modest diversification. The portfolio has delivered 12.04% annualized 3-year returns, outperforming its peer group benchmark of 10.60%.',
            allocation: [
                '20.00% Fidelity 500 Index (FXAIX)',
                '15.00% Fidelity International Index (FSPSX)',
                '15.00% Fidelity Mid Cap Index (FSMDX)',
                '15.00% Vanguard Small Cap Index Admiral (VSMAX)',
                '10.00% BlackRock Inflation Protected Bond K (BPLBX)',
                '10.00% Vanguard Growth Index Admiral (VIGAX)',
                '10.00% Vanguard Real Estate Index Admiral (VGSLX)',
                '5.00% PIMCO International Bond (USD-Hdg) Instl (PFORX)'
            ],
            pros: ['Highest growth potential: 12.04% annualized 3-year return', 'Very low expense ratio of 0.17%', 'Broad diversification across 8 funds and multiple asset classes', 'Outperformed peer group benchmark since inception (9.92% vs 9.37%)'],
            cons: ['Highest volatility (11.04% standard deviation)', 'Requires understanding that short-term losses are normal', 'Not suitable for participants nearing retirement']
        },

        modelModerate: {
            id: 'modelModerate',
            type: 'Model Portfolio',
            name: 'Cordoba Moderate Model',
            badge: 'Best Match',
            shortDesc: 'A growth-oriented portfolio targeting 60% equity and 40% fixed income, designed for participants seeking strong growth with moderate risk.',
            riskLevel: 'Moderate Growth',
            stockBond: '60% Equity / 40% Fixed Income',
            expenseRatio: '0.21%',
            turnover: 'Low',
            minInvestment: 'None',
            bestFor: 'Participants with 15-25 years to retirement seeking growth with meaningful fixed-income protection.',
            performance: { yr1: '11.31%', yr3: '11.90%', yr5: '6.09%', yr10: '-' },
            stats: { sharpe3yr: '0.69', stdDev3yr: '10.25%', inception: '6/1/2020', rebalance: 'Manual' },
            description: 'The Cordoba Moderate Model targets 60% equity and 40% fixed income. It includes broad U.S. equity exposure through large-cap, mid-cap, and small-cap index funds, international diversification, real estate, and a substantial bond allocation through diversified bond funds. The portfolio has the highest Sharpe ratio (0.69) among the four models, indicating excellent risk-adjusted returns.',
            allocation: [
                '15.00% Fidelity 500 Index (FXAIX)',
                '10.00% BlackRock Inflation Protected Bond K (BPLBX)',
                '10.00% Fidelity International Index (FSPSX)',
                '10.00% Fidelity Mid Cap Index (FSMDX)',
                '10.00% PIMCO International Bond (USD-Hdg) Instl (PFORX)',
                '10.00% Vanguard High-Yield Corporate Admiral (VWEAX)',
                '10.00% Vanguard Real Estate Index Admiral (VGSLX)',
                '10.00% Vanguard Small Cap Index Admiral (VSMAX)',
                '10.00% Vanguard Total Bond Market Index Admiral (VBTLX)',
                '5.00% Vanguard Growth Index Admiral (VIGAX)'
            ],
            pros: ['Best risk-adjusted returns: highest Sharpe ratio (0.69) of all models', 'Strong 3-year return of 11.90%, outperforming peer benchmark (10.59%)', 'Broad diversification across 10 funds and multiple asset classes', 'Balanced 60/40 equity-to-bond ratio provides meaningful downside protection'],
            cons: ['Moderate volatility (10.25% standard deviation)', 'Higher expense ratio (0.21%) than Balance and Conservative models', 'Less growth potential than the Aggressive model']
        },

        modelBalance: {
            id: 'modelBalance',
            type: 'Model Portfolio',
            name: 'Cordoba Balance Model',
            badge: 'Best Match',
            shortDesc: 'A balanced portfolio targeting 60% equity, 30% fixed income, and 10% stable value/cash, designed for moderate growth with meaningful downside protection.',
            riskLevel: 'Moderate',
            stockBond: '60% Equity / 30% Fixed / 10% SV/Cash',
            expenseRatio: '0.15%',
            turnover: 'Low',
            minInvestment: 'None',
            bestFor: 'Participants with 10-20 years to retirement who want balanced growth and stability.',
            performance: { yr1: '11.64%', yr3: '10.59%', yr5: '5.46%', yr10: '-' },
            stats: { sharpe3yr: '0.62', stdDev3yr: '9.26%', inception: '6/1/2020', rebalance: 'Quarterly' },
            description: 'The Cordoba Balance Model targets 60% equity, 30% fixed income, and 10% in money market. It balances growth through U.S. and international equities with meaningful fixed-income protection through diversified bond funds and a cash allocation. The portfolio is rebalanced quarterly and has the lowest expense ratio (0.15%) among the four models.',
            allocation: [
                '23.00% Fidelity 500 Index (FXAIX)',
                '10.00% Fidelity Mid Cap Index (FSMDX)',
                '10.00% Vanguard Small Cap Index Admiral (VSMAX)',
                '10.00% Vanguard Total Bond Market Index Admiral (VBTLX)',
                '10.00% Vanguard Treasury Money Market Investor (VUSXX)',
                '7.00% Vanguard Real Estate Index Admiral (VGSLX)',
                '5.00% BlackRock Inflation Protected Bond K (BPLBX)',
                '5.00% Fidelity International Index (FSPSX)',
                '5.00% PIMCO Income Institutional (PIMIX)',
                '5.00% PIMCO International Bond (USD-Hdg) Instl (PFORX)',
                '5.00% Vanguard Growth Index Admiral (VIGAX)',
                '5.00% Vanguard Interm-Term Investment Grade Admiral (VFIDX)'
            ],
            pros: ['Lowest expense ratio of all models at 0.15%', 'Balanced approach: 10.59% annualized 3-year return with moderate risk', '10% cash allocation provides stability and liquidity', 'Quarterly rebalancing maintains target allocation'],
            cons: ['Lower growth potential than the Moderate and Aggressive models', 'Moderate volatility (9.26% standard deviation)', 'Cash allocation may lag inflation in rising-rate environments']
        },

        modelConservative: {
            id: 'modelConservative',
            type: 'Model Portfolio',
            name: 'Cordoba Conservative Model',
            badge: 'Best Match',
            shortDesc: 'A conservative portfolio targeting 45% equity, 40% fixed income, and 15% stable value/cash, designed for capital preservation with modest growth.',
            riskLevel: 'Conservative',
            stockBond: '45% Equity / 40% Fixed / 15% SV/Cash',
            expenseRatio: '0.18%',
            turnover: 'Low',
            minInvestment: 'None',
            bestFor: 'Participants nearing retirement or those who prioritize capital preservation over growth.',
            performance: { yr1: '9.79%', yr3: '10.06%', yr5: '4.91%', yr10: '-' },
            stats: { sharpe3yr: '0.63', stdDev3yr: '8.27%', inception: '6/1/2020', rebalance: 'Quarterly' },
            description: 'The Cordoba Conservative Model targets 45% equity, 40% fixed income, and 15% in money market. This portfolio emphasizes capital preservation while maintaining modest growth potential through a diversified equity allocation. The large cash and bond allocations help cushion against market downturns. The portfolio has outperformed its peer group benchmark since inception (7.52% vs 6.91%).',
            allocation: [
                '25.00% Fidelity 500 Index (FXAIX)',
                '15.00% Vanguard Total Bond Market Index Admiral (VBTLX)',
                '15.00% Vanguard Treasury Money Market Investor (VUSXX)',
                '10.00% PIMCO International Bond (USD-Hdg) Instl (PFORX)',
                '5.00% BlackRock Inflation Protected Bond K (BPLBX)',
                '5.00% Fidelity International Index (FSPSX)',
                '5.00% Fidelity Mid Cap Index (FSMDX)',
                '5.00% PIMCO Income Institutional (PIMIX)',
                '5.00% Vanguard High-Yield Corporate Admiral (VWEAX)',
                '5.00% Vanguard Real Estate Index Admiral (VGSLX)',
                '5.00% Vanguard Small Cap Index Admiral (VSMAX)'
            ],
            pros: ['Lowest volatility: 8.27% standard deviation', 'Substantial 15% cash allocation provides stability and liquidity', 'Outperformed peer group benchmark since inception (7.52% vs 6.91%)', 'Low expense ratio of 0.18%'],
            cons: ['Lowest growth potential among the four models', 'Large cash allocation may underperform inflation over long periods', 'Conservative allocation may not keep pace with spending needs over long retirements']
        },

        // -- Target Date Fund -- REQUIRED, do not remove ---------------------
        // Name, allocation, performance, and risk level are set
        // automatically based on the participant's retirement year.
        targetDate: {
            id: 'targetDate',
            type: 'Target Date Fund',
            name: '',
            badge: '',
            shortDesc: 'An American Funds Target Date R6 Fund that automatically adjusts its stock/bond mix to become more conservative as you approach your target retirement year.',
            riskLevel: '',
            stockBond: '',
            expenseRatio: '0.37%',
            turnover: 'Low',
            minInvestment: 'None',
            bestFor: 'Participants who want a professionally managed, hands-off approach to retirement investing.',
            description: 'American Funds Target Date R6 Funds are all-in-one solutions available in the Cordoba Corporation 401(k) plan. You choose the fund closest to your expected retirement year, and Capital Group automatically adjusts the asset allocation over time \u2014 starting with a higher equity allocation when retirement is far away and gradually shifting toward bonds and stable value as the target date approaches.',
            allocation: [],
            pros: ['Automatic professional management \u2014 no rebalancing needed', 'Gradually reduces risk as retirement approaches', 'Low expense ratio for the R6 share class', 'Broad diversification across domestic and international stocks and bonds'],
            cons: ['Less customizable than building your own allocation', 'One-size-fits-all approach may not match individual circumstances', 'Expense ratio is higher than the model portfolios']
        },

        // -- Default Allocation Fund -----------------------------------------

        fpkfx: {
            id: 'fpkfx',
            type: 'Allocation Fund',
            name: 'Fidelity Puritan K6 (FPKFX)',
            badge: 'Plan Default',
            shortDesc: 'The plan\'s default investment option. A balanced fund that invests approximately 60% in stocks and 40% in bonds, seeking income and capital growth consistent with reasonable risk.',
            riskLevel: 'Moderate',
            stockBond: '60% Stocks / 40% Bonds',
            expenseRatio: '0.34%',
            turnover: 'Moderate',
            minInvestment: 'None',
            bestFor: 'Participants seeking a single professionally managed balanced fund with moderate risk.',
            performance: { yr1: '14.26%', yr3: '14.17%', yr5: '8.27%', yr10: '-' },
            description: 'The Fidelity Puritan K6 Fund seeks income and capital growth by investing approximately 60% of assets in stocks and 40% in bonds. Managed by Fidelity, this balanced fund offers a moderate approach combining equity growth potential with bond income and stability. It serves as the plan\'s default investment (QDIA) for participants who do not make an active investment election.',
            allocation: [
                '~60% U.S. and International Equities',
                '~40% Investment-Grade and High-Yield Bonds'
            ],
            pros: ['Plan default (QDIA) — automatic enrollment investment', 'Balanced 60/40 approach provides growth with stability', 'Low expense ratio of 0.34% for the K6 share class', 'Managed by experienced Fidelity investment team'],
            cons: ['Moderate growth potential compared to pure equity funds', 'Actively managed — future performance depends on manager skill', 'Less customizable than building your own allocation']
        }

    } // end fundData

}; // end clientConfig
