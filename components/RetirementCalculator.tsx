'use client';

import { useState } from 'react';

// ─── Constants ───────────────────────────────────────────────────────────────

const INSTRUMENTS_CURRENT_VALUE = ['Mutual Fund', 'EPF / PF', 'NPS', 'ETF', 'Stocks', 'Gold (Physical/ETF)'];
const INSTRUMENTS_INVESTED      = ['PPF', 'Land / Property', 'FD / RD', 'ELSS', 'Insurance (Investment)', 'Other'];
const CURRENT_YEAR = new Date().getFullYear();

const RETURNS: Record<string, number> = {
  'Mutual Fund': 0.13, 'EPF / PF': 0.0825, 'NPS': 0.105,
  'ETF': 0.12, 'Stocks': 0.14, 'Gold (Physical/ETF)': 0.085,
  'PPF': 0.071, 'Land / Property': 0.10, 'FD / RD': 0.065,
  'ELSS': 0.13, 'Insurance (Investment)': 0.06, 'Other': 0.09,
};

const isCurrentValue = (name: string) => INSTRUMENTS_CURRENT_VALUE.includes(name);

const formatINR = (val: number) => {
  if (!val || isNaN(val) || val === 0) return '₹0';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000)   return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${Number(val).toLocaleString('en-IN')}`;
};

const STEPS = ['Profile & Income', 'Expenses', 'Savings & Investments', 'Insurance', 'Results'];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Investment {
  instrument: string;
  value: string;
  year: string;
}

interface InvestmentResult extends Investment {
  fv: number;
  r: number;
  isCurrent: boolean;
  yearsToGrow: number;
}

interface Recommendation {
  icon: string;
  title: string;
  detail: string;
  priority: 'Critical' | 'High' | 'Medium' | 'On Track';
}

interface Result {
  corpusNeeded: number;
  emergencyFund: number;
  totalTarget: number;
  bankFV: number;
  investmentFV: number;
  totalCurrentProjected: number;
  gap: number;
  monthlyGap: number;
  yearsToRetire: number;
  retirementYears: number;
  annualExpenseAtRetirement: number;
  investBreakdown: InvestmentResult[];
  monthlyExpenseNow: number;
  surplus: number;
  sipAffordability: 'comfortable' | 'stretch' | 'tight' | 'deficit';
  recommendations: Recommendation[];
  monthlyIncome: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RetirementCalculator() {

  const [step, setStep] = useState(0);

  // Step 0 — Profile
  const [age, setAge]                   = useState('');
  const [retireAge, setRetireAge]       = useState('');
  const [lifeExp, setLifeExp]           = useState('80');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  // Step 1 — Expenses
  const [grocery, setGrocery]           = useState('');
  const [fuel, setFuel]                 = useState('');
  const [rent, setRent]                 = useState('');
  const [electricity, setElectricity]   = useState('');
  const [kidsEdu, setKidsEdu]           = useState('');
  const [medical, setMedical]           = useState('');
  const [other, setOther]               = useState('');

  // Step 2 — Savings
  const [bankBalance, setBankBalance]   = useState('');
  const [investments, setInvestments]   = useState<Investment[]>([
    { instrument: 'Mutual Fund', value: '', year: String(CURRENT_YEAR) },
  ]);

  // Step 3 — Insurance
  const [insuredSelf, setInsuredSelf]         = useState<boolean | null>(null);
  const [hasSpouse, setHasSpouse]             = useState<boolean | null>(null);
  const [insuredSpouse, setInsuredSpouse]     = useState<boolean | null>(null);
  const [hasChildren, setHasChildren]         = useState<boolean | null>(null);
  const [insuredChildren, setInsuredChildren] = useState<boolean | null>(null);
  const [hasParents, setHasParents]           = useState<boolean | null>(null);
  const [insuredParents, setInsuredParents]   = useState<boolean | null>(null);

  const [result, setResult] = useState<Result | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const totalExpense = () =>
    [grocery, fuel, rent, electricity, kidsEdu, medical, other]
      .map(v => Number(v) || 0).reduce((a, b) => a + b, 0);

  const surplus = () => (Number(monthlyIncome) || 0) - totalExpense();

  const addInv = () =>
    setInvestments(p => [...p, { instrument: 'Mutual Fund', value: '', year: String(CURRENT_YEAR) }]);

  const removeInv = (i: number) =>
    setInvestments(p => p.filter((_, idx) => idx !== i));

  const updateInv = (i: number, field: keyof Investment, val: string) =>
    setInvestments(p => p.map((inv, idx) => idx === i ? { ...inv, [field]: val } : inv));

  const canProceed = () => {
    if (step === 0) return age && monthlyIncome && retireAge && Number(retireAge) >= 35 && Number(retireAge) > Number(age);
    if (step === 1) return totalExpense() > 0;
    if (step === 2) return bankBalance !== '';
    if (step === 3) return insuredSelf !== null
      && (hasSpouse  != null ? (hasSpouse  ? insuredSpouse   !== null : true) : false)
      && (hasChildren != null ? (hasChildren ? insuredChildren !== null : true) : false)
      && (hasParents  != null ? (hasParents  ? insuredParents  !== null : true) : false);
    return true;
  };

  // ── Calculate ─────────────────────────────────────────────────────────────

  const calculate = () => {
    const currentAge     = Number(age);
    const retAge         = Number(retireAge);
    const lifeExpNum     = Number(lifeExp);
    const yearsToRetire  = retAge - currentAge;
    const retirementYears = lifeExpNum - retAge;
    const inflation      = 0.07;
    const preReturn      = 0.12;
    const postReturn     = 0.065;

    const monthlyExpenseNow         = totalExpense();
    const annualExpenseAtRetirement = monthlyExpenseNow * 12 * Math.pow(1 + inflation, yearsToRetire);
    const realRate                  = (postReturn - inflation) / (1 + inflation);
    const corpusNeeded              = realRate > 0
      ? annualExpenseAtRetirement * (1 - Math.pow(1 + realRate, -retirementYears)) / realRate
      : annualExpenseAtRetirement * retirementYears;

    const emergencyFund        = annualExpenseAtRetirement / 2;
    const totalTarget          = corpusNeeded + emergencyFund;
    const bankFV               = (Number(bankBalance) || 0) * Math.pow(1.065, yearsToRetire);

    let investmentFV = 0;
    const investBreakdown: InvestmentResult[] = investments.map(inv => {
      const val  = Number(inv.value) || 0;
      const r    = RETURNS[inv.instrument] || 0.09;
      const isCur = isCurrentValue(inv.instrument);
      const yearsAlready = Math.max(0, CURRENT_YEAR - Number(inv.year));
      const yearsToGrow  = isCur ? yearsToRetire : yearsToRetire + yearsAlready;
      const fv   = val * Math.pow(1 + r, Math.max(yearsToGrow, 0));
      investmentFV += fv;
      return { ...inv, fv, r, isCurrent: isCur, yearsToGrow };
    });

    const totalCurrentProjected = bankFV + investmentFV;
    const gap          = totalTarget - totalCurrentProjected;
    const monthlyGap   = gap > 0
      ? gap / ((Math.pow(1 + preReturn / 12, yearsToRetire * 12) - 1) / (preReturn / 12))
      : 0;

    const surplusVal = surplus();
    const sipAffordability: Result['sipAffordability'] =
      surplusVal <= 0              ? 'deficit'    :
      monthlyGap <= surplusVal     ? 'comfortable' :
      monthlyGap <= surplusVal * 1.3 ? 'stretch'  : 'tight';

    const recommendations = buildRecs(gap, monthlyGap, surplusVal, sipAffordability, currentAge, yearsToRetire);

    setResult({
      corpusNeeded, emergencyFund, totalTarget,
      bankFV, investmentFV, totalCurrentProjected,
      gap, monthlyGap, yearsToRetire, retirementYears,
      annualExpenseAtRetirement, investBreakdown,
      monthlyExpenseNow, surplus: surplusVal, sipAffordability,
      recommendations, monthlyIncome: Number(monthlyIncome),
    });
    setStep(4);
  };

  const buildRecs = (
    gap: number, monthlyGap: number, surplusVal: number,
    aff: string, age: number, yearsToRetire: number
  ): Recommendation[] => {
    const recs: Recommendation[] = [];
    const isNear = age >= 50;

    if (aff === 'deficit')
      recs.push({ icon: '🔴', title: 'Spending Exceeds Income', detail: `Your monthly expenses exceed income by ${formatINR(Math.abs(surplusVal))}. Close this gap before investing — debt will erode any savings you build.`, priority: 'Critical' });
    else if (aff === 'tight')
      recs.push({ icon: '⚠️', title: 'SIP Requires Lifestyle Adjustments', detail: `Surplus is ${formatINR(surplusVal)} but SIP needed is ${formatINR(monthlyGap)}. Reduce discretionary spend or add income streams.`, priority: 'High' });
    else if (aff === 'stretch')
      recs.push({ icon: '💡', title: 'Achievable with Discipline', detail: `Your surplus (${formatINR(surplusVal)}) nearly covers the required SIP (${formatINR(monthlyGap)}). A step-up SIP or annual bonus can bridge the gap comfortably.`, priority: 'Medium' });
    else if (surplusVal > 0 && gap > 0)
      recs.push({ icon: '✅', title: 'Surplus Covers the SIP', detail: `Your monthly surplus of ${formatINR(surplusVal)} comfortably covers the required SIP of ${formatINR(monthlyGap)}. Start investing it immediately.`, priority: 'On Track' });

    if (gap > 0) {
      if (!isNear)
        recs.push({ icon: '📈', title: 'Equity Mutual Funds (SIP)', detail: `Start a SIP immediately — compounded over ${yearsToRetire} years at 12–14% CAGR via large-cap or flexi-cap funds, small monthly amounts grow significantly.`, priority: 'High' });
      if (age < 60)
        recs.push({ icon: '🏛️', title: 'NPS — National Pension System', detail: 'Extra ₹50,000 deduction under 80CCD(1B). Historically 9–12% returns. Lock-in to retirement enforces discipline and reduces temptation to withdraw early.', priority: 'High' });
      if (!isNear) {
        recs.push({ icon: '🔒', title: 'PPF — Public Provident Fund', detail: '7.1% tax-free, EEE status, government-backed. Max ₹1.5L/year. The lock-in prevents early withdrawal — a feature, not a bug.', priority: 'Medium' });
        recs.push({ icon: '⚡', title: 'ELSS — Tax-Saving Mutual Fund', detail: 'Shortest 80C lock-in at 3 years. Market-linked 12–15% returns. Doubles as tax saving under Section 80C.', priority: 'Medium' });
      }
      if (isNear) {
        recs.push({ icon: '🏦', title: 'Senior Citizens Savings Scheme', detail: 'Available post-60. Quarterly government-backed interest at ~8.2%. Safe and liquid for post-retirement cash flow.', priority: 'High' });
        recs.push({ icon: '📊', title: 'Debt Mutual Funds + SWP', detail: 'Systematic Withdrawal Plan is more tax-efficient than FD interest for post-retirement income. Shift equity corpus here gradually.', priority: 'High' });
      }
    } else {
      recs.push({ icon: '🎯', title: 'On Track — Focus on Rebalancing', detail: 'Projected corpus exceeds target. As retirement nears, progressively shift from equity to debt to protect the corpus from market volatility.', priority: 'On Track' });
    }

    if (insuredSelf === false)
      recs.push({ icon: '🚨', title: 'No Health Insurance for You', detail: 'Medical inflation is 8–10% p.a. A single hospitalisation can wipe years of savings. Get a ₹10–25L individual policy immediately.', priority: 'Critical' });
    if (hasSpouse && insuredSpouse === false)
      recs.push({ icon: '🚨', title: 'Spouse Not Covered', detail: "A critical illness for your spouse directly hits your retirement corpus. Add them to a family floater or get a separate policy.", priority: 'Critical' });
    if (hasChildren && insuredChildren === false)
      recs.push({ icon: '⚠️', title: 'Children Not Insured', detail: 'Paediatric emergencies are expensive and unpredictable. Adding children to a family floater is typically low additional cost at young ages.', priority: 'High' });
    if (hasParents && insuredParents === false)
      recs.push({ icon: '🚨', title: 'Parents Not Insured', detail: 'Senior citizen hospitalisation can cost ₹5–30L per incident. Without a dedicated parent plan, your corpus absorbs these shocks directly.', priority: 'Critical' });

    return recs;
  };

  // ── Shared UI pieces ─────────────────────────────────────────────────────

  const priorityBadge = (p: string) => {
    const map: Record<string, string> = {
      Critical: 'bg-red-500/10 text-red-400 border border-red-500/30',
      High:     'bg-pankh-gold/10 text-pankh-gold border border-pankh-gold/30',
      Medium:   'bg-blue-500/10 text-blue-300 border border-blue-500/30',
      'On Track': 'bg-green-500/10 text-green-400 border border-green-500/30',
    };
    return `text-xs font-semibold px-3 py-1 rounded-full ${map[p] || ''}`;
  };

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-pankh-gold mb-1">{children}</h2>
  );

  const SectionSub = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-gray-400 mb-6">{children}</p>
  );

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
      {children}
    </label>
  );

  const Input = ({ value, onChange, placeholder, type = 'number', prefix }: {
    value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; prefix?: string;
  }) => (
    <div className="relative">
      {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pankh-gold font-semibold">{prefix}</span>}
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-pankh-gold transition-colors py-3 ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
      />
    </div>
  );

  const InsBtn = ({ active, variant, onClick, children }: {
    active: boolean; variant: 'yes' | 'no'; onClick: () => void; children: React.ReactNode;
  }) => (
    <button onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
        variant === 'yes'
          ? active ? 'bg-green-500 border-green-500 text-white' : 'border-green-500/40 text-green-400 hover:border-green-500'
          : active ? 'bg-red-500 border-red-500 text-white' : 'border-red-500/40 text-red-400 hover:border-red-500'
      }`}
    >
      {children}
    </button>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-16 max-w-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-pankh-gold uppercase mb-3">Free Tool</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Retirement <span className="text-pankh-gold">Calculator</span>
          </h1>
          <p className="text-gray-300 text-lg">A comprehensive retirement planner for Indian investors</p>
        </div>

        {/* Step Bar */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`rounded-full transition-all ${
                  i === step ? 'w-3 h-3 bg-pankh-gold' :
                  i < step   ? 'w-2.5 h-2.5 bg-green-400' : 'w-2 h-2 bg-white/20'
                }`} />
                <span className={`text-[9px] font-semibold tracking-widest uppercase whitespace-nowrap ${
                  i === step ? 'text-pankh-gold' : i < step ? 'text-green-400/60' : 'text-white/20'
                }`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-7 h-px mb-3.5 ${i < step ? 'bg-green-400/30' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── STEP 0: Profile & Income ── */}
        {step === 0 && (
          <Card>
            <SectionTitle>Profile & Income</SectionTitle>
            <SectionSub>Your age, retirement horizon, and current monthly income</SectionSub>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <Label>Current Age</Label>
                <Input value={age} onChange={setAge} placeholder="e.g. 30" />
              </div>
              <div>
                <Label>Retirement Age <span className="text-white/30 normal-case">(min 35)</span></Label>
                <Input value={retireAge} onChange={setRetireAge} placeholder="e.g. 50" />
                {retireAge && Number(retireAge) < 35 && (
                  <p className="text-red-400 text-xs mt-1">Minimum retirement age is 35</p>
                )}
                {retireAge && Number(retireAge) >= 35 && Number(retireAge) <= Number(age) && (
                  <p className="text-red-400 text-xs mt-1">Must be greater than current age</p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <Label>Life Expectancy</Label>
              <div className="flex gap-2 flex-wrap">
                {['75', '80', '85', '90'].map(v => (
                  <button key={v} onClick={() => setLifeExp(v)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                      lifeExp === v
                        ? 'bg-pankh-gold border-pankh-gold text-pankh-navy'
                        : 'border-white/20 text-gray-400 hover:border-pankh-gold/50'
                    }`}>
                    {v} yrs
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-pankh-gold/5 border border-pankh-gold/20 rounded-xl p-5 mb-5">
              <Label>Monthly Take-Home Income</Label>
              <p className="text-xs text-gray-500 mb-3">Post-tax salary, business income, rent received, or any regular monthly inflow</p>
              <Input value={monthlyIncome} onChange={setMonthlyIncome} placeholder="e.g. 150000" prefix="₹" />
            </div>

            {age && retireAge && Number(retireAge) > Number(age) && Number(retireAge) >= 35 && (
              <div className="bg-pankh-gold/10 border-l-4 border-pankh-gold rounded-r-xl px-5 py-4">
                <span className="text-gray-300">You have </span>
                <span className="text-xl font-bold text-pankh-gold">{Number(retireAge) - Number(age)} years</span>
                <span className="text-gray-300"> to build your corpus and </span>
                <span className="text-xl font-bold text-pankh-gold">{Number(lifeExp) - Number(retireAge)} years</span>
                <span className="text-gray-300"> of retirement to fund.</span>
              </div>
            )}
          </Card>
        )}

        {/* ── STEP 1: Expenses ── */}
        {step === 1 && (
          <Card>
            <SectionTitle>Monthly Expenditure</SectionTitle>
            <SectionSub>Current monthly spending — inflated at 7% p.a. to your retirement date</SectionSub>

            <div className="grid grid-cols-2 gap-4">
              {([
                ['🛒 Groceries', grocery, setGrocery],
                ['⛽ Fuel / Transport', fuel, setFuel],
                ['🏠 Rent / Home Loan', rent, setRent],
                ['💡 Electricity & Utilities', electricity, setElectricity],
                ['🎓 Kids Education', kidsEdu, setKidsEdu],
                ['🏥 Medical / OPD', medical, setMedical],
                ['📦 Other Expenses', other, setOther],
              ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
                <div key={label}>
                  <Label>{label}</Label>
                  <Input value={val} onChange={setter} placeholder="0" prefix="₹" />
                </div>
              ))}
            </div>

            {monthlyIncome && totalExpense() > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-6">
                {([
                  ['Income',   Number(monthlyIncome), 'text-white'],
                  ['Expenses', totalExpense(),         'text-red-400'],
                  ['Surplus',  surplus(),              surplus() >= 0 ? 'text-green-400' : 'text-red-400'],
                ] as [string, number, string][]).map(([lbl, val, color]) => (
                  <div key={lbl} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{lbl}</p>
                    <p className={`text-lg font-bold ${color}`}>{formatINR(val)}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* ── STEP 2: Savings & Investments ── */}
        {step === 2 && (
          <div className="space-y-4">
            <Card>
              <SectionTitle>Bank Balance</SectionTitle>
              <SectionSub>Liquid cash in savings & current accounts only</SectionSub>
              <Input value={bankBalance} onChange={setBankBalance} placeholder="e.g. 200000" prefix="₹" />
              <p className="text-xs text-gray-600 mt-2">Do not include FDs, mutual funds, or any invested amounts here.</p>
            </Card>

            <Card>
              <SectionTitle>Existing Investments</SectionTitle>
              <div className="mb-5 space-y-1">
                <p className="text-sm text-gray-300">
                  For <span className="text-pankh-gold font-semibold">MF, EPF, NPS, ETF, Stocks, Gold</span> — enter the{' '}
                  <span className="text-white font-semibold">current market value</span> (past returns already embedded).
                </p>
                <p className="text-sm text-gray-300">
                  For <span className="text-gray-400 font-semibold">PPF, Land, FD, ELSS etc.</span> — enter the{' '}
                  <span className="text-white font-semibold">total amount invested so far</span> + start year.
                </p>
              </div>

              {investments.map((inv, i) => {
                const isCur = isCurrentValue(inv.instrument);
                return (
                  <div key={i} className="bg-white/5 rounded-xl p-4 mb-3">
                    <div className={`grid gap-3 items-end mb-2 ${isCur ? 'grid-cols-[2fr_2fr_36px]' : 'grid-cols-[2fr_1.5fr_0.8fr_36px]'}`}>
                      <div>
                        <Label>Instrument</Label>
                        <select
                          value={inv.instrument}
                          onChange={e => updateInv(i, 'instrument', e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-xl text-white text-sm outline-none focus:border-pankh-gold transition-colors py-3 px-4"
                        >
                          <optgroup label="── Current Market Value ──">
                            {INSTRUMENTS_CURRENT_VALUE.map(ins => <option key={ins} className="bg-gray-900">{ins}</option>)}
                          </optgroup>
                          <optgroup label="── Amount Invested ──">
                            {INSTRUMENTS_INVESTED.map(ins => <option key={ins} className="bg-gray-900">{ins}</option>)}
                          </optgroup>
                        </select>
                      </div>
                      <div>
                        <Label>{isCur ? 'Current Market Value' : 'Amount Invested (₹)'}</Label>
                        <Input value={inv.value} onChange={v => updateInv(i, 'value', v)} placeholder="0" prefix="₹" />
                      </div>
                      {!isCur && (
                        <div>
                          <Label>Since</Label>
                          <Input value={inv.year} onChange={v => updateInv(i, 'year', v)} placeholder={String(CURRENT_YEAR)} />
                        </div>
                      )}
                      <div className={isCur ? '' : 'pt-6'}>
                        <button onClick={() => removeInv(i)}
                          className="w-9 h-11 bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-lg text-gray-500 hover:text-red-400 transition-all text-lg">
                          ×
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {isCur
                        ? `Current value → projected at ${((RETURNS[inv.instrument] || 0.09) * 100).toFixed(1)}% p.a. forward to retirement only`
                        : `Amount invested → compounded at ${((RETURNS[inv.instrument] || 0.09) * 100).toFixed(1)}% p.a. from ${inv.year} to retirement`}
                    </p>
                  </div>
                );
              })}

              <button onClick={addInv}
                className="border border-white/20 hover:border-pankh-gold/50 text-gray-400 hover:text-pankh-gold px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
                + Add Investment
              </button>

              {investments.some(i => Number(i.value) > 0) && (
                <div className="flex justify-between items-center mt-5 bg-white/5 rounded-xl px-5 py-4">
                  <span className="text-gray-400 text-sm">Total Value Entered</span>
                  <span className="text-xl font-bold text-pankh-gold">
                    {formatINR(investments.reduce((s, i) => s + (Number(i.value) || 0), 0))}
                  </span>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ── STEP 3: Insurance ── */}
        {step === 3 && (
          <Card>
            <SectionTitle>Insurance Coverage</SectionTitle>
            <SectionSub>Uninsured medical emergencies are the #1 silent threat to retirement savings</SectionSub>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-7">
              <p className="text-sm text-yellow-300 leading-relaxed">
                ⚠️ Medical inflation in India runs at 8–10% per year. One uninsured hospitalisation can instantly wipe ₹5–30L from your savings — before your retirement corpus gets a chance to grow.
              </p>
            </div>

            {/* Self */}
            <div className="pb-6 border-b border-white/10 mb-6">
              <Label>Do you have health insurance for yourself?</Label>
              <div className="flex gap-3">
                <InsBtn active={insuredSelf === true}  variant="yes" onClick={() => setInsuredSelf(true)}>✓ Yes, Covered</InsBtn>
                <InsBtn active={insuredSelf === false} variant="no"  onClick={() => setInsuredSelf(false)}>✗ Not Covered</InsBtn>
              </div>
              {insuredSelf === false && <p className="text-red-400 text-xs mt-2">🚨 This is critical — an uninsured illness can derail your entire retirement plan.</p>}
            </div>

            {/* Spouse */}
            <div className="pb-6 border-b border-white/10 mb-6">
              <Label>Do you have a spouse / partner?</Label>
              <div className="flex gap-3 mb-4">
                <InsBtn active={hasSpouse === true}  variant="yes" onClick={() => setHasSpouse(true)}>Yes</InsBtn>
                <InsBtn active={hasSpouse === false} variant="no"  onClick={() => { setHasSpouse(false); setInsuredSpouse(null); }}>No</InsBtn>
              </div>
              {hasSpouse && (<>
                <Label>Is your spouse covered?</Label>
                <div className="flex gap-3">
                  <InsBtn active={insuredSpouse === true}  variant="yes" onClick={() => setInsuredSpouse(true)}>✓ Yes, Covered</InsBtn>
                  <InsBtn active={insuredSpouse === false} variant="no"  onClick={() => setInsuredSpouse(false)}>✗ Not Covered</InsBtn>
                </div>
                {insuredSpouse === false && <p className="text-red-400 text-xs mt-2">⚠️ Add to a family floater or separate policy immediately.</p>}
              </>)}
            </div>

            {/* Children */}
            <div className="pb-6 border-b border-white/10 mb-6">
              <Label>Do you have children?</Label>
              <div className="flex gap-3 mb-4">
                <InsBtn active={hasChildren === true}  variant="yes" onClick={() => setHasChildren(true)}>Yes</InsBtn>
                <InsBtn active={hasChildren === false} variant="no"  onClick={() => { setHasChildren(false); setInsuredChildren(null); }}>No</InsBtn>
              </div>
              {hasChildren && (<>
                <Label>Are your children covered?</Label>
                <div className="flex gap-3">
                  <InsBtn active={insuredChildren === true}  variant="yes" onClick={() => setInsuredChildren(true)}>✓ Yes, Covered</InsBtn>
                  <InsBtn active={insuredChildren === false} variant="no"  onClick={() => setInsuredChildren(false)}>✗ Not Covered</InsBtn>
                </div>
                {insuredChildren === false && <p className="text-red-400 text-xs mt-2">⚠️ Add to a family floater — low additional cost when done young.</p>}
              </>)}
            </div>

            {/* Parents */}
            <div>
              <Label>Do you have dependent parents?</Label>
              <div className="flex gap-3 mb-4">
                <InsBtn active={hasParents === true}  variant="yes" onClick={() => setHasParents(true)}>Yes</InsBtn>
                <InsBtn active={hasParents === false} variant="no"  onClick={() => { setHasParents(false); setInsuredParents(null); }}>No</InsBtn>
              </div>
              {hasParents && (<>
                <Label>Are your parents covered?</Label>
                <div className="flex gap-3">
                  <InsBtn active={insuredParents === true}  variant="yes" onClick={() => setInsuredParents(true)}>✓ Yes, Covered</InsBtn>
                  <InsBtn active={insuredParents === false} variant="no"  onClick={() => setInsuredParents(false)}>✗ Not Covered</InsBtn>
                </div>
                {insuredParents === false && <p className="text-red-400 text-xs mt-2">🚨 Without a dedicated parent plan, 1–2 major incidents can erode ₹10–30L from your corpus directly.</p>}
              </>)}
            </div>
          </Card>
        )}

        {/* ── STEP 4: Results ── */}
        {step === 4 && result && (
          <div className="space-y-4">

            {/* Hero corpus card */}
            <div className="bg-gradient-to-br from-pankh-gold/20 to-pankh-gold/5 border border-pankh-gold/30 rounded-2xl p-6">
              <div className="text-center pb-6 border-b border-white/10">
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Corpus Required at Retirement</p>
                <p className="text-5xl font-bold text-pankh-gold">{formatINR(result.totalTarget)}</p>
                <p className="text-sm text-gray-400 mt-3">
                  to sustain <span className="text-white font-semibold">{formatINR(result.annualExpenseAtRetirement / 12)}/month</span>{' '}
                  (today's {formatINR(result.monthlyExpenseNow)}/month at 7% inflation) for {result.retirementYears} years
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-5">
                {([
                  ['Retirement\nCorpus',        result.corpusNeeded,           'text-white'],
                  ['Emergency\nBuffer (6 mo.)', result.emergencyFund,          'text-yellow-300'],
                  ['Your Current\nProjection',  result.totalCurrentProjected,  result.totalCurrentProjected >= result.totalTarget ? 'text-green-400' : 'text-red-400'],
                ] as [string, number, string][]).map(([label, val, color]) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-2 whitespace-pre-line">{label}</p>
                    <p className={`text-base font-bold ${color}`}>{formatINR(val)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cash flow */}
            <Card>
              <h3 className="text-lg font-bold text-pankh-gold mb-4">Monthly Cash Flow</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {([
                  ['Income',   result.monthlyIncome,      'text-white'],
                  ['Expenses', result.monthlyExpenseNow,  'text-red-400'],
                  ['Surplus',  result.surplus,            result.surplus >= 0 ? 'text-green-400' : 'text-red-400'],
                ] as [string, number, string][]).map(([lbl, val, color]) => (
                  <div key={lbl} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-2">{lbl}</p>
                    <p className={`text-base font-bold ${color}`}>{formatINR(val)}</p>
                  </div>
                ))}
              </div>

              {result.gap > 0 && (
                <div className="flex justify-between items-center bg-white/5 rounded-xl px-5 py-4 border border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">SIP Needed to Close Gap</p>
                    <p className="text-3xl font-bold text-pankh-gold">{formatINR(result.monthlyGap)}</p>
                    <p className="text-xs text-gray-600 mt-1">@ 12% p.a. over {result.yearsToRetire} years</p>
                  </div>
                  <div>
                    {{
                      comfortable: <span className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs font-semibold px-3 py-1.5 rounded-full">✓ Comfortable</span>,
                      stretch:     <span className="bg-pankh-gold/10 text-pankh-gold border border-pankh-gold/30 text-xs font-semibold px-3 py-1.5 rounded-full">~ Achievable</span>,
                      tight:       <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-semibold px-3 py-1.5 rounded-full">⚠ Tight</span>,
                      deficit:     <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-semibold px-3 py-1.5 rounded-full">✗ Deficit</span>,
                    }[result.sipAffordability]}
                  </div>
                </div>
              )}
            </Card>

            {/* Gap bar */}
            {result.gap > 0 ? (
              <Card>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-400 text-sm">Corpus Gap</p>
                  <p className="text-2xl font-bold text-red-400">{formatINR(result.gap)}</p>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pankh-gold to-green-400"
                    style={{ width: `${Math.min(100, (result.totalCurrentProjected / result.totalTarget) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-600">{Math.min(100, ((result.totalCurrentProjected / result.totalTarget) * 100)).toFixed(1)}% funded</span>
                  <span className="text-xs text-gray-600">Target: {formatINR(result.totalTarget)}</span>
                </div>
              </Card>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <p className="text-xl font-bold text-green-400 mb-2">✅ You're on track!</p>
                <p className="text-sm text-green-300/70">Your projected corpus exceeds the target. Shift from equity to debt gradually as retirement nears to protect what you've built.</p>
              </div>
            )}

            {/* Investment growth */}
            {result.investBreakdown.some(i => Number(i.value) > 0) && (
              <Card>
                <h3 className="text-lg font-bold text-pankh-gold mb-4">Projected Growth of Investments</h3>
                {result.investBreakdown.filter(i => Number(i.value) > 0).map((inv, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                    <div>
                      <p className="text-sm font-semibold text-white">{inv.instrument}</p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {inv.isCurrent
                          ? `Current value → ${(inv.r * 100).toFixed(1)}% p.a. × ${result.yearsToRetire}y`
                          : `Invested since ${inv.year} → ${(inv.r * 100).toFixed(1)}% p.a. × ${inv.yearsToGrow}y`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{formatINR(Number(inv.value))} →</p>
                      <p className="text-lg font-bold text-green-400">{formatINR(inv.fv)}</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3">
                  <p className="text-sm text-gray-400">Bank Balance (at 6.5% p.a.)</p>
                  <p className="text-base font-semibold text-gray-300">{formatINR(result.bankFV)}</p>
                </div>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <h3 className="text-lg font-bold text-pankh-gold mb-1">Personalised Recommendations</h3>
              <p className="text-xs text-gray-500 mb-5">Based on your gap, surplus, age, and insurance status</p>
              {result.recommendations.map((rec, i) => (
                <div key={i} className={`flex gap-4 items-start py-4 ${i < result.recommendations.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <span className="text-2xl flex-shrink-0">{rec.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3 mb-1.5">
                      <p className="text-base font-semibold text-white">{rec.title}</p>
                      <span className={`flex-shrink-0 ${priorityBadge(rec.priority)}`}>{rec.priority}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{rec.detail}</p>
                  </div>
                </div>
              ))}
            </Card>

            {/* CTA — matches site's style */}
            <div className="bg-gradient-to-r from-pankh-navy to-pankh-navy-light border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-lg font-bold text-white mb-2">Ready to act on this plan?</p>
              <p className="text-sm text-gray-400 mb-5">Our team can help you start your SIP, choose the right NPS fund, and get the right insurance — all in one place.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact"
                  className="bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold px-8 py-3 rounded-full transition text-sm inline-block">
                  Talk to an Advisor
                </a>
                <a href="https://wa.me/919746207344" target="_blank" rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition text-sm inline-flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            <button onClick={() => { setStep(0); setResult(null); }}
              className="w-full border border-white/20 hover:border-white/40 text-gray-400 hover:text-white py-3 rounded-full text-sm font-semibold transition-all">
              ← Start Over
            </button>
          </div>
        )}

        {/* Nav */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="border border-white/20 hover:border-white/40 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed px-8 py-3 rounded-full text-sm font-semibold transition-all">
              ← Back
            </button>
            {step < 3
              ? <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()}
                  className="bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold px-8 py-3 rounded-full transition text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue →
                </button>
              : <button onClick={calculate} disabled={!canProceed()}
                  className="bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold px-8 py-3 rounded-full transition text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                  See My Results →
                </button>
            }
          </div>
        )}

        <p className="text-center text-xs text-gray-700 mt-10 tracking-widest uppercase">
          For informational purposes only · Not financial advice · Consult a SEBI-registered advisor
        </p>

      </div>
    </div>
  );
}
