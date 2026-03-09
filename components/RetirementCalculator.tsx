'use client';

import { useState, useRef, useEffect } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

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

interface Investment { instrument: string; value: string; year: string; }

interface InvestmentResult extends Investment {
  fv: number; r: number; isCurrent: boolean; yearsToGrow: number;
}

interface InsuranceAlert {
  who: string; msg: string;
}

interface CalcResult {
  corpusNeeded: number; emergencyFund: number; totalTarget: number;
  bankFV: number; investmentFV: number; totalCurrentProjected: number;
  gap: number; monthlyGap: number; yearsToRetire: number; retirementYears: number;
  annualExpenseAtRetirement: number; investBreakdown: InvestmentResult[];
  monthlyExpenseNow: number; surplus: number;
  sipAffordability: 'comfortable' | 'stretch' | 'tight' | 'deficit';
  monthlyIncome: number; bankBalanceNum: number;
  retireAgeNum: number; insuranceAlerts: InsuranceAlert[];
}

// ─── Helper UI — all defined OUTSIDE main component to prevent remount ────────

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl p-5 sm:p-6 ${className}`} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-1" style={{ color: '#d4a843' }}>{children}</h2>
);

const SectionSub = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm mb-6" style={{ color: '#b0bec5' }}>{children}</p>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#cfd8dc' }}>
    {children}
  </label>
);

const Input = ({ value, onChange, placeholder, prefix }: {
  value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string;
}) => (
  <div className="relative">
    {prefix && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold pointer-events-none" style={{ color: '#d4a843' }}>
        {prefix}
      </span>
    )}
    <input
      type="text" inputMode="numeric" value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-xl text-sm outline-none transition-all py-3"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)',
        color: '#ffffff',
        paddingLeft: prefix ? '2rem' : '1rem',
        paddingRight: '1rem',
      }}
      onFocus={e => { e.target.style.borderColor = '#d4a843'; }}
      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.18)'; }}
    />
  </div>
);

// ✅ Custom dropdown — fully styled, no browser-native black background
const CustomSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const groups = [
    { label: 'Enter Current Market Value', items: INSTRUMENTS_CURRENT_VALUE },
    { label: 'Enter Amount Invested', items: INSTRUMENTS_INVESTED },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full rounded-xl text-sm text-left flex items-center justify-between py-3 px-4 transition-all"
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: `1px solid ${open ? '#d4a843' : 'rgba(255,255,255,0.18)'}`,
          color: '#ffffff',
        }}
      >
        <span className="truncate pr-2">{value}</span>
        <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: '#d4a843' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-2xl"
          style={{ background: '#1a3a5c', border: '1px solid rgba(212,168,67,0.4)' }}
        >
          {groups.map((group, gi) => (
            <div key={gi}>
              <div
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest"
                style={{ background: 'rgba(212,168,67,0.15)', color: '#d4a843', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                {group.label}
              </div>
              {group.items.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => { onChange(item); setOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-all"
                  style={{
                    background: value === item ? 'rgba(212,168,67,0.2)' : 'transparent',
                    color: value === item ? '#d4a843' : '#e8eaf0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontWeight: value === item ? 600 : 400,
                  }}
                  onMouseEnter={e => { if (value !== item) (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { if (value !== item) (e.target as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  {item}
                </button>
              ))}
              {gi < groups.length - 1 && <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InsBtn = ({ active, variant, onClick, children }: {
  active: boolean; variant: 'yes' | 'no'; onClick: () => void; children: React.ReactNode;
}) => (
  <button onClick={onClick} className="px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
    style={
      variant === 'yes'
        ? active
          ? { background: '#22c55e', borderColor: '#22c55e', color: '#fff' }
          : { background: 'transparent', borderColor: 'rgba(34,197,94,0.5)', color: '#86efac' }
        : active
          ? { background: '#ef4444', borderColor: '#ef4444', color: '#fff' }
          : { background: 'transparent', borderColor: 'rgba(239,68,68,0.5)', color: '#fca5a5' }
    }
  >
    {children}
  </button>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RetirementCalculator() {
  const [step, setStep] = useState(0);

  const [age, setAge]                     = useState('');
  const [retireAge, setRetireAge]         = useState('');
  const [lifeExp, setLifeExp]             = useState('80');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const [grocery, setGrocery]         = useState('');
  const [fuel, setFuel]               = useState('');
  const [rent, setRent]               = useState('');
  const [electricity, setElectricity] = useState('');
  const [kidsEdu, setKidsEdu]         = useState('');
  const [medical, setMedical]         = useState('');
  const [other, setOther]             = useState('');

  const [bankBalance, setBankBalance] = useState('');
  const [investments, setInvestments] = useState<Investment[]>([
    { instrument: 'Mutual Fund', value: '', year: String(CURRENT_YEAR) },
  ]);

  const [insuredSelf, setInsuredSelf]         = useState<boolean | null>(null);
  const [hasSpouse, setHasSpouse]             = useState<boolean | null>(null);
  const [insuredSpouse, setInsuredSpouse]     = useState<boolean | null>(null);
  const [hasChildren, setHasChildren]         = useState<boolean | null>(null);
  const [insuredChildren, setInsuredChildren] = useState<boolean | null>(null);
  const [hasParents, setHasParents]           = useState<boolean | null>(null);
  const [insuredParents, setInsuredParents]   = useState<boolean | null>(null);

  const [result, setResult] = useState<CalcResult | null>(null);

  const totalExpense = () =>
    [grocery, fuel, rent, electricity, kidsEdu, medical, other]
      .map(v => Number(v) || 0).reduce((a, b) => a + b, 0);

  const surplus = () => (Number(monthlyIncome) || 0) - totalExpense();

  const addInv    = () => setInvestments(p => [...p, { instrument: 'Mutual Fund', value: '', year: String(CURRENT_YEAR) }]);
  const removeInv = (i: number) => setInvestments(p => p.filter((_, idx) => idx !== i));
  const updateInv = (i: number, field: keyof Investment, val: string) =>
    setInvestments(p => p.map((inv, idx) => idx === i ? { ...inv, [field]: val } : inv));

  const canProceed = () => {
    if (step === 0) return age && monthlyIncome && retireAge && Number(retireAge) >= 35 && Number(retireAge) > Number(age);
    if (step === 1) return totalExpense() > 0;
    if (step === 2) return bankBalance !== '';
    if (step === 3) return insuredSelf !== null
      && (hasSpouse   != null ? (hasSpouse   ? insuredSpouse   !== null : true) : false)
      && (hasChildren != null ? (hasChildren ? insuredChildren !== null : true) : false)
      && (hasParents  != null ? (hasParents  ? insuredParents  !== null : true) : false);
    return true;
  };

  const calculate = () => {
    const currentAge      = Number(age);
    const retAge          = Number(retireAge);
    const lifeExpNum      = Number(lifeExp);
    const yearsToRetire   = retAge - currentAge;
    const retirementYears = lifeExpNum - retAge;
    const inflation = 0.07, preReturn = 0.12, postReturn = 0.065;

    const monthlyExpenseNow         = totalExpense();
    const annualExpenseAtRetirement = monthlyExpenseNow * 12 * Math.pow(1 + inflation, yearsToRetire);
    const realRate                  = (postReturn - inflation) / (1 + inflation);
    const corpusNeeded              = realRate > 0
      ? annualExpenseAtRetirement * (1 - Math.pow(1 + realRate, -retirementYears)) / realRate
      : annualExpenseAtRetirement * retirementYears;

    const emergencyFund         = annualExpenseAtRetirement / 2;
    const totalTarget           = corpusNeeded + emergencyFund;
    const bankBalanceNum        = Number(bankBalance) || 0;
    const bankFV                = bankBalanceNum * Math.pow(1.065, yearsToRetire);

    let investmentFV = 0;
    const investBreakdown: InvestmentResult[] = investments.map(inv => {
      const val = Number(inv.value) || 0;
      const r   = RETURNS[inv.instrument] || 0.09;
      const isCur = isCurrentValue(inv.instrument);
      const yearsAlready = Math.max(0, CURRENT_YEAR - Number(inv.year));
      const yearsToGrow  = isCur ? yearsToRetire : yearsToRetire + yearsAlready;
      const fv = val * Math.pow(1 + r, Math.max(yearsToGrow, 0));
      investmentFV += fv;
      return { ...inv, fv, r, isCurrent: isCur, yearsToGrow };
    });

    const totalCurrentProjected = bankFV + investmentFV;
    const gap        = totalTarget - totalCurrentProjected;
    const monthlyGap = gap > 0 ? gap / ((Math.pow(1 + preReturn / 12, yearsToRetire * 12) - 1) / (preReturn / 12)) : 0;

    const surplusVal = surplus();
    const sipAffordability: CalcResult['sipAffordability'] =
      surplusVal <= 0                ? 'deficit'     :
      monthlyGap <= surplusVal       ? 'comfortable' :
      monthlyGap <= surplusVal * 1.3 ? 'stretch'     : 'tight';

    // ── Insurance alerts — only for uninsured members ──────────────────────
    const insuranceAlerts: InsuranceAlert[] = [];
    if (insuredSelf === false)
      insuranceAlerts.push({ who: 'You (Self)', msg: 'No health insurance. Medical inflation is 8–10% p.a. A single hospitalisation can wipe ₹5–20L from your savings instantly.' });
    if (hasSpouse && insuredSpouse === false)
      insuranceAlerts.push({ who: 'Spouse', msg: 'Not covered. A critical illness for your spouse hits your retirement corpus directly. Add to a family floater or get a separate policy.' });
    if (hasChildren && insuredChildren === false)
      insuranceAlerts.push({ who: 'Children', msg: 'Not covered. Paediatric emergencies are expensive and unpredictable. Adding children to a family floater is low additional cost when done young.' });
    if (hasParents && insuredParents === false)
      insuranceAlerts.push({ who: 'Parents (Dependent)', msg: 'Dependent but uninsured. Senior citizen hospitalisation costs ₹5–30L per incident. Without a dedicated parent plan, your corpus absorbs every shock directly.' });

    setResult({
      corpusNeeded, emergencyFund, totalTarget, bankFV, bankBalanceNum,
      investmentFV, totalCurrentProjected, gap, monthlyGap,
      yearsToRetire, retirementYears, annualExpenseAtRetirement,
      investBreakdown, monthlyExpenseNow, surplus: surplusVal,
      sipAffordability, monthlyIncome: Number(monthlyIncome),
      retireAgeNum: retAge, insuranceAlerts,
    });
    setStep(4);
  };

  // shared inline styles
  const statCard: React.CSSProperties = { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 10px', textAlign: 'center' };
  const statLabel: React.CSSProperties = { fontSize: 10, color: '#90a4ae', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, display: 'block' };

  const affordBadge = {
    comfortable: { bg: 'rgba(34,197,94,0.2)',  color: '#86efac', border: '1px solid rgba(34,197,94,0.4)',  text: '✓ Comfortable' },
    stretch:     { bg: 'rgba(212,168,67,0.2)', color: '#d4a843', border: '1px solid rgba(212,168,67,0.5)', text: '~ Achievable' },
    tight:       { bg: 'rgba(239,68,68,0.2)',  color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)',  text: '⚠ Tight' },
    deficit:     { bg: 'rgba(239,68,68,0.2)',  color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)',  text: '✗ Deficit' },
  };

  return (
    <div style={{ color: '#e8eaf0', fontFamily: 'inherit' }}>
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4a843' }}>Free Tool</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#ffffff' }}>
            Retirement <span style={{ color: '#d4a843' }}>Calculator</span>
          </h1>
          <p className="text-lg" style={{ color: '#b0bec5' }}>A comprehensive retirement planner for Indian investors</p>
        </div>

        {/* ✅ FIX: Step bar scrollable on mobile instead of wrapping/overflowing */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1 justify-start sm:justify-center">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col items-center gap-1.5">
                <div style={{
                  borderRadius: '50%', transition: 'all 0.3s',
                  width: i === step ? 12 : 8, height: i === step ? 12 : 8,
                  background: i === step ? '#d4a843' : i < step ? '#4ade80' : 'rgba(255,255,255,0.2)',
                }} />
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  color: i === step ? '#d4a843' : i < step ? 'rgba(74,222,128,0.7)' : 'rgba(255,255,255,0.25)',
                }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ width: 28, height: 1, flexShrink: 0, background: i < step ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)', marginBottom: 14 }} />}
            </div>
          ))}
        </div>

        {/* ── STEP 0 ── */}
        {step === 0 && (
          <Card>
            <SectionTitle>Profile & Income</SectionTitle>
            <SectionSub>Your age, retirement horizon, and current monthly income</SectionSub>

            {/* ✅ FIX 1: single col on mobile, 2 col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <Label>Current Age</Label>
                <Input value={age} onChange={setAge} placeholder="e.g. 30" />
              </div>
              <div>
                <Label>Retirement Age (min 35)</Label>
                <Input value={retireAge} onChange={setRetireAge} placeholder="e.g. 50" />
                {retireAge && Number(retireAge) < 35 && <p className="text-xs mt-1" style={{ color: '#fca5a5' }}>Minimum retirement age is 35</p>}
                {retireAge && Number(retireAge) >= 35 && Number(retireAge) <= Number(age) && <p className="text-xs mt-1" style={{ color: '#fca5a5' }}>Must be greater than current age</p>}
              </div>
            </div>

            <div className="mb-5">
              <Label>Life Expectancy</Label>
              <div className="flex gap-2 flex-wrap">
                {['75', '80', '85', '90'].map(v => (
                  <button key={v} onClick={() => setLifeExp(v)}
                    className="px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all"
                    style={lifeExp === v
                      ? { background: '#d4a843', borderColor: '#d4a843', color: '#0f2044' }
                      : { background: 'transparent', borderColor: 'rgba(255,255,255,0.2)', color: '#cfd8dc' }
                    }>
                    {v} yrs
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.25)' }}>
              <Label>Monthly Take-Home Income</Label>
              <p className="text-xs mb-3" style={{ color: '#90a4ae' }}>Post-tax salary, business income, rent received, or any regular monthly inflow</p>
              <Input value={monthlyIncome} onChange={setMonthlyIncome} placeholder="e.g. 150000" prefix="₹" />
            </div>

            {age && retireAge && Number(retireAge) > Number(age) && Number(retireAge) >= 35 && (
              <div className="rounded-r-xl px-5 py-4" style={{ background: 'rgba(212,168,67,0.1)', borderLeft: '4px solid #d4a843' }}>
                <span style={{ color: '#cfd8dc' }}>You have </span>
                <span className="text-xl font-bold" style={{ color: '#d4a843' }}>{Number(retireAge) - Number(age)} years</span>
                <span style={{ color: '#cfd8dc' }}> to build your corpus and </span>
                <span className="text-xl font-bold" style={{ color: '#d4a843' }}>{Number(lifeExp) - Number(retireAge)} years</span>
                <span style={{ color: '#cfd8dc' }}> of retirement to fund.</span>
              </div>
            )}
          </Card>
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <Card>
            <SectionTitle>Monthly Expenditure</SectionTitle>
            <SectionSub>Current monthly spending — inflated at 7% p.a. to your retirement date</SectionSub>

            {/* ✅ FIX 2: single col on mobile, 2 col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                ['🛒 Groceries', grocery, setGrocery], ['⛽ Fuel / Transport', fuel, setFuel],
                ['🏠 Rent / Home Loan', rent, setRent], ['💡 Electricity & Utilities', electricity, setElectricity],
                ['🎓 Kids Education', kidsEdu, setKidsEdu], ['🏥 Medical / OPD', medical, setMedical],
                ['📦 Other Expenses', other, setOther],
              ] as [string, string, (v: string) => void][]).map(([lbl, val, setter]) => (
                <div key={lbl}>
                  <Label>{lbl}</Label>
                  <Input value={val} onChange={setter} placeholder="0" prefix="₹" />
                </div>
              ))}
            </div>
            {monthlyIncome && totalExpense() > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-6">
                {([
                  ['Income', Number(monthlyIncome), '#ffffff'],
                  ['Expenses', totalExpense(), '#fca5a5'],
                  ['Surplus', surplus(), surplus() >= 0 ? '#86efac' : '#fca5a5'],
                ] as [string, number, string][]).map(([lbl, val, color]) => (
                  <div key={lbl} style={statCard}>
                    <span style={statLabel}>{lbl}</span>
                    <span className="text-sm sm:text-lg font-bold" style={{ color }}>{formatINR(val)}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="space-y-4">
            <Card>
              <SectionTitle>Bank Balance</SectionTitle>
              <SectionSub>Liquid cash in savings & current accounts only</SectionSub>
              <Input value={bankBalance} onChange={setBankBalance} placeholder="e.g. 200000" prefix="₹" />
              <p className="text-xs mt-2" style={{ color: '#90a4ae' }}>Do not include FDs, mutual funds, or any invested amounts here.</p>
            </Card>

            <Card>
              <SectionTitle>Existing Investments</SectionTitle>
              <div className="mb-5 space-y-2">
                <p className="text-sm" style={{ color: '#cfd8dc' }}>
                  For <span style={{ color: '#d4a843', fontWeight: 700 }}>MF, EPF, NPS, ETF, Stocks, Gold</span> — enter the{' '}
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>current market value</span> (past returns already embedded).
                </p>
                <p className="text-sm" style={{ color: '#cfd8dc' }}>
                  For <span style={{ color: '#b0bec5', fontWeight: 600 }}>PPF, Land, FD, ELSS etc.</span> — enter the{' '}
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>total amount invested so far</span> + start year.
                </p>
              </div>

              {investments.map((inv, i) => {
                const isCur = isCurrentValue(inv.instrument);
                return (
                  <div key={i} className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>

                    {/* ✅ FIX 3a: Row 1 — instrument selector always full width + remove button */}
                    <div className="flex gap-2 items-end mb-3">
                      <div className="flex-1 min-w-0">
                        <Label>Instrument</Label>
                        <CustomSelect value={inv.instrument} onChange={v => updateInv(i, 'instrument', v)} />
                      </div>
                      <button
                        onClick={() => removeInv(i)}
                        className="flex-shrink-0 w-9 rounded-lg text-lg transition-all"
                        style={{ height: 46, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#90a4ae' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = '#fca5a5'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = '#90a4ae'; }}>
                        ×
                      </button>
                    </div>

                    {/* ✅ FIX 3b: Row 2 — value full-width for current instruments; value+year side-by-side for invested */}
                    {isCur ? (
                      <div>
                        <Label>Current Market Value (₹)</Label>
                        <Input value={inv.value} onChange={v => updateInv(i, 'value', v)} placeholder="e.g. 500000" prefix="₹" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Amount Invested (₹)</Label>
                          <Input value={inv.value} onChange={v => updateInv(i, 'value', v)} placeholder="0" prefix="₹" />
                        </div>
                        <div>
                          <Label>Since Year</Label>
                          <Input value={inv.year} onChange={v => updateInv(i, 'year', v)} placeholder={String(CURRENT_YEAR)} />
                        </div>
                      </div>
                    )}

                    <p className="text-xs mt-2" style={{ color: '#90a4ae' }}>
                      {isCur
                        ? `Current value → projected at ${((RETURNS[inv.instrument] || 0.09) * 100).toFixed(1)}% p.a. forward to retirement only`
                        : `Amount invested → compounded at ${((RETURNS[inv.instrument] || 0.09) * 100).toFixed(1)}% p.a. from ${inv.year} to retirement`}
                    </p>
                  </div>
                );
              })}

              <button onClick={addInv}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cfd8dc', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d4a843'; (e.currentTarget as HTMLButtonElement).style.color = '#d4a843'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#cfd8dc'; }}>
                + Add Investment
              </button>

              {investments.some(i => Number(i.value) > 0) && (
                <div className="flex justify-between items-center mt-5 rounded-xl px-5 py-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <span className="text-sm" style={{ color: '#cfd8dc' }}>Total Value Entered</span>
                  <span className="text-xl font-bold" style={{ color: '#d4a843' }}>
                    {formatINR(investments.reduce((s, i) => s + (Number(i.value) || 0), 0))}
                  </span>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <Card>
            <SectionTitle>Insurance Coverage</SectionTitle>
            <SectionSub>Uninsured medical emergencies are the #1 silent threat to retirement savings</SectionSub>
            <div className="rounded-xl p-4 mb-7" style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#fde68a' }}>
                ⚠️ Medical inflation in India runs at 8–10% per year. One uninsured hospitalisation can instantly wipe ₹5–30L from your savings — before your retirement corpus gets a chance to grow.
              </p>
            </div>

            {[
              { q: 'Do you have health insurance for yourself?', state: insuredSelf, set: setInsuredSelf, warn: '🚨 This is critical — an uninsured illness can derail your entire retirement plan.', alwaysShow: true },
            ].map((item, idx) => (
              <div key={idx} className="pb-6 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Label>{item.q}</Label>
                <div className="flex gap-3">
                  <InsBtn active={item.state === true}  variant="yes" onClick={() => item.set(true)}>✓ Yes, Covered</InsBtn>
                  <InsBtn active={item.state === false} variant="no"  onClick={() => item.set(false)}>✗ Not Covered</InsBtn>
                </div>
                {item.state === false && <p className="text-xs mt-2" style={{ color: '#fca5a5' }}>{item.warn}</p>}
              </div>
            ))}

            {[
              { q: 'Do you have a spouse / partner?', hasState: hasSpouse, hasSet: (v: boolean) => { setHasSpouse(v); if (!v) setInsuredSpouse(null); }, q2: 'Is your spouse covered?', insState: insuredSpouse, insSet: setInsuredSpouse, warn: '⚠️ Add to a family floater or separate policy immediately.' },
              { q: 'Do you have children?',           hasState: hasChildren, hasSet: (v: boolean) => { setHasChildren(v); if (!v) setInsuredChildren(null); }, q2: 'Are your children covered?', insState: insuredChildren, insSet: setInsuredChildren, warn: '⚠️ Add to a family floater — low additional cost when done young.' },
              { q: 'Do you have dependent parents?',  hasState: hasParents,  hasSet: (v: boolean) => { setHasParents(v);  if (!v) setInsuredParents(null); },  q2: 'Are your parents covered?',  insState: insuredParents,  insSet: setInsuredParents,  warn: '🚨 Without a dedicated parent plan, 1–2 incidents can erode ₹10–30L from your corpus.' },
            ].map((item, idx, arr) => (
              <div key={idx} className="mb-6 pb-6" style={{ borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <Label>{item.q}</Label>
                <div className="flex gap-3 mb-4">
                  <InsBtn active={item.hasState === true}  variant="yes" onClick={() => item.hasSet(true)}>Yes</InsBtn>
                  <InsBtn active={item.hasState === false} variant="no"  onClick={() => item.hasSet(false)}>No</InsBtn>
                </div>
                {item.hasState && (
                  <>
                    <Label>{item.q2}</Label>
                    <div className="flex gap-3">
                      <InsBtn active={item.insState === true}  variant="yes" onClick={() => item.insSet(true)}>✓ Yes, Covered</InsBtn>
                      <InsBtn active={item.insState === false} variant="no"  onClick={() => item.insSet(false)}>✗ Not Covered</InsBtn>
                    </div>
                    {item.insState === false && <p className="text-xs mt-2" style={{ color: '#fca5a5' }}>{item.warn}</p>}
                  </>
                )}
              </div>
            ))}
          </Card>
        )}

        {/* ── STEP 4: Results ── */}
        {step === 4 && result && (
          <div className="space-y-4">

            {/* Hero corpus */}
            <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.18) 0%, rgba(212,168,67,0.06) 100%)', border: '1px solid rgba(212,168,67,0.35)' }}>
              <div className="text-center pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#90a4ae' }}>Corpus Required at Retirement</p>
                <p className="text-4xl sm:text-5xl font-bold" style={{ color: '#d4a843' }}>{formatINR(result.totalTarget)}</p>
                <p className="text-sm mt-3" style={{ color: '#b0bec5' }}>
                  to sustain <span style={{ color: '#ffffff', fontWeight: 700 }}>{formatINR(result.annualExpenseAtRetirement / 12)}/month</span>{' '}
                  (today's {formatINR(result.monthlyExpenseNow)}/month at 7% inflation) for {result.retirementYears} years
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-5">
                {([
                  ['Retirement\nCorpus',        result.corpusNeeded,          '#ffffff'],
                  ['Emergency\nBuffer (6 mo.)', result.emergencyFund,         '#fde68a'],
                  ['Your Current\nProjection',  result.totalCurrentProjected, result.totalCurrentProjected >= result.totalTarget ? '#86efac' : '#fca5a5'],
                ] as [string, number, string][]).map(([label, val, color]) => (
                  <div key={label} style={statCard}>
                    <span style={{ ...statLabel, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{label}</span>
                    <span className="text-sm sm:text-base font-bold" style={{ color }}>{formatINR(val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cash flow */}
            <Card>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#d4a843' }}>Monthly Cash Flow</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                {([
                  ['Income', result.monthlyIncome, '#ffffff'],
                  ['Expenses', result.monthlyExpenseNow, '#fca5a5'],
                  ['Surplus', result.surplus, result.surplus >= 0 ? '#86efac' : '#fca5a5'],
                ] as [string, number, string][]).map(([lbl, val, color]) => (
                  <div key={lbl} style={statCard}>
                    <span style={statLabel}>{lbl}</span>
                    <span className="text-sm sm:text-base font-bold" style={{ color }}>{formatINR(val)}</span>
                  </div>
                ))}
              </div>
              {result.gap > 0 && (
                <div className="flex justify-between items-center rounded-xl px-4 sm:px-5 py-4 gap-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#90a4ae' }}>SIP Needed to Close Gap</p>
                    <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#d4a843' }}>{formatINR(result.monthlyGap)}</p>
                    <p className="text-xs mt-1" style={{ color: '#b0bec5' }}>@ 12% p.a. over {result.yearsToRetire} years</p>
                  </div>
                  <div className="flex-shrink-0">
                    {(() => { const b = affordBadge[result.sipAffordability]; return (
                      <span style={{ ...b, background: b.bg, padding: '6px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{b.text}</span>
                    ); })()}
                  </div>
                </div>
              )}
            </Card>

            {/* Gap bar */}
            {result.gap > 0 ? (
              <Card>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-semibold" style={{ color: '#cfd8dc' }}>Corpus Gap</p>
                  <p className="text-xl sm:text-2xl font-bold" style={{ color: '#fca5a5' }}>{formatINR(result.gap)}</p>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="h-full rounded-full" style={{
                    width: `${Math.min(100, (result.totalCurrentProjected / result.totalTarget) * 100)}%`,
                    background: 'linear-gradient(90deg, #d4a843, #4ade80)',
                  }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs font-semibold" style={{ color: '#b0bec5' }}>{Math.min(100, ((result.totalCurrentProjected / result.totalTarget) * 100)).toFixed(1)}% funded</span>
                  <span className="text-xs font-semibold" style={{ color: '#b0bec5' }}>Target: {formatINR(result.totalTarget)}</span>
                </div>
              </Card>
            ) : (
              <div className="rounded-2xl p-6" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                <p className="text-xl font-bold mb-2" style={{ color: '#86efac' }}>✅ You're on track!</p>
                <p className="text-sm" style={{ color: '#bbf7d0' }}>Projected corpus exceeds the target. Shift from equity to debt gradually as retirement nears to protect what you have built.</p>
              </div>
            )}

            {/* Investment growth */}
            {result.investBreakdown.some(i => Number(i.value) > 0) && (
              <Card>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#d4a843' }}>Projected Growth of Investments</h3>
                {result.investBreakdown.filter(i => Number(i.value) > 0).map((inv, i, arr) => (
                  <div key={i} className="flex justify-between items-center py-4 gap-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: '#ffffff' }}>{inv.instrument}</p>
                      <p className="text-xs mt-1" style={{ color: '#90a4ae' }}>
                        {inv.isCurrent
                          ? `Current value → ${(inv.r * 100).toFixed(1)}% p.a. × ${result.yearsToRetire} yrs`
                          : `Since ${inv.year} → ${(inv.r * 100).toFixed(1)}% p.a. × ${inv.yearsToGrow} yrs`}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs mb-1" style={{ color: '#90a4ae' }}>{formatINR(Number(inv.value))} grows to</p>
                      <p className="text-base sm:text-lg font-bold" style={{ color: '#86efac' }}>{formatINR(inv.fv)}</p>
                    </div>
                  </div>
                ))}
                {/* Bank balance row */}
                <div className="flex justify-between items-center py-4 gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="min-w-0">
                    <p className="text-sm font-bold" style={{ color: '#ffffff' }}>Bank Balance</p>
                    <p className="text-xs mt-1" style={{ color: '#90a4ae' }}>At 6.5% p.a. × {result.yearsToRetire} yrs</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs mb-1" style={{ color: '#90a4ae' }}>{formatINR(result.bankBalanceNum)} grows to</p>
                    <p className="text-base sm:text-lg font-bold" style={{ color: '#86efac' }}>{formatINR(result.bankFV)}</p>
                  </div>
                </div>
                {/* Total */}
                <div className="flex justify-between items-center mt-2 rounded-xl px-5 py-4" style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)' }}>
                  <p className="text-sm font-bold" style={{ color: '#e8eaf0' }}>Total Projected at Retirement</p>
                  <p className="text-xl font-bold" style={{ color: '#d4a843' }}>{formatINR(result.totalCurrentProjected)}</p>
                </div>
              </Card>
            )}

            {/* Instruments to Consider — educational, SEBI-safe */}
            {result.gap > 0 && (() => {
              const earlyRetire  = result.retireAgeNum < 60;
              const shortHorizon = result.yearsToRetire < 5;
              const sipInstruments = [
                {
                  icon: '📈', name: 'Equity Mutual Fund (SIP)',
                  returnRange: '12–14% p.a. (historical CAGR, large/flexi-cap)',
                  taxNote: 'No lock-in. Most liquid. LTCG above ₹1.25L taxed at 12.5%.',
                  suitability: 'Primary growth engine for any horizon. No statutory ceiling on investment amount.',
                  color: '#d4a843', lockinNote: null as string | null,
                },
                {
                  icon: '⚡', name: 'ELSS (Tax-Saving Mutual Fund)',
                  returnRange: '12–14% p.a. (equity, market-linked)',
                  taxNote: 'Section 80C benefit — shared ₹1.5L/yr ceiling with PPF.',
                  suitability: shortHorizon
                    ? 'Preferred over PPF for short horizons — 3-year lock-in is the shortest among 80C instruments.'
                    : 'Combines tax saving with equity growth. 3-year lock-in.',
                  color: '#a78bfa', lockinNote: null,
                },
                {
                  icon: '🏛️', name: 'NPS (National Pension System)',
                  returnRange: '9–12% p.a. (market-linked, equity + debt mix)',
                  taxNote: 'Additional ₹50,000/yr deduction under 80CCD(1B) — separate from the ₹1.5L 80C limit.',
                  suitability: 'Useful for extra tax saving beyond the 80C ceiling.',
                  color: '#60a5fa',
                  lockinNote: earlyRetire
                    ? `⚠️ You retire at ${result.retireAgeNum}. NPS corpus is locked until age 60 — inaccessible for ${60 - result.retireAgeNum} years post-retirement. Treat as a long-term tax-saving satellite, not a primary retirement income source.`
                    : null,
                },
                {
                  icon: '🔒', name: 'PPF (Public Provident Fund)',
                  returnRange: '7.1% p.a. (tax-free, EEE status, government-backed)',
                  taxNote: 'Section 80C benefit — shared ₹1.5L/yr ceiling with ELSS. Hard cap at ₹1.5L/yr.',
                  suitability: 'Risk-free debt component. 15-year lock-in.',
                  color: '#4ade80',
                  lockinNote: result.yearsToRetire < 15
                    ? `⚠️ PPF has a 15-year lock-in. With ${result.yearsToRetire} years to retirement, the account matures after your planned retirement date — plan for restricted access until maturity.`
                    : null,
                },
              ];
              return (
                <Card>
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#d4a843' }}>Instruments to Consider for Your SIP</h3>
                  <p className="text-xs mb-2" style={{ color: '#90a4ae' }}>
                    You need <span style={{ color: '#d4a843', fontWeight: 700 }}>{formatINR(result.monthlyGap)}/month</span> in additional investments.
                    Below is factual information on commonly used instruments — caps, lock-ins, and tax treatment.
                  </p>
                  {/* Disclaimer */}
                  <div className="rounded-xl px-4 py-3 mb-5" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' }}>
                    <p className="text-xs" style={{ color: '#93c5fd' }}>
                      ℹ️ This is <strong>educational information only</strong>, not investment advice. The right allocation depends on your income slab, existing 80C utilisation, and liquidity needs. Consult a SEBI-registered investment adviser for a personalised plan.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {sipInstruments.map((ins, i) => (
                      <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${ins.color}30` }}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-xl flex-shrink-0 mt-0.5">{ins.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold mb-1" style={{ color: '#ffffff' }}>{ins.name}</p>
                            <span className="text-xs" style={{ color: '#b0bec5' }}>📈 {ins.returnRange}</span>
                          </div>
                        </div>
                        <p className="text-xs mb-1" style={{ color: '#90a4ae', paddingLeft: 32 }}>🏷️ {ins.taxNote}</p>
                        <p className="text-xs font-semibold" style={{ color: ins.color, paddingLeft: 32 }}>{ins.suitability}</p>
                        {ins.lockinNote && (
                          <div className="rounded-lg px-3 py-2 mt-3" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', marginLeft: 32 }}>
                            <p className="text-xs leading-relaxed" style={{ color: '#fde68a' }}>{ins.lockinNote}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* 80C note */}
                  <div className="mt-4 rounded-xl px-4 py-3" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.15)' }}>
                    <p className="text-xs leading-relaxed" style={{ color: '#93c5fd' }}>
                      <span className="font-bold">80C Note:</span> PPF + ELSS combined cannot exceed ₹1.5L/year for the Section 80C deduction. NPS gets an additional ₹50,000/year under 80CCD(1B) — a separate bucket on top of 80C.
                    </p>
                  </div>
                </Card>
              );
            })()}

            {/* Insurance Alerts — only rendered when there are uninsured members */}
            {result.insuranceAlerts.length > 0 && (
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <h3 className="text-lg font-bold mb-1" style={{ color: '#fca5a5' }}>🚨 Insurance Gaps — Action Required</h3>
                <p className="text-xs mb-5" style={{ color: '#90a4ae' }}>
                  Medical inflation runs at 8–10% p.a. These gaps can silently erode your corpus before retirement.
                </p>
                <div className="space-y-3">
                  {result.insuranceAlerts.map((alert, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-bold" style={{ color: '#fca5a5' }}>{alert.who}</p>
                        <span style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>Critical</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#fcd4d4' }}>{alert.msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ background: 'rgba(15,32,68,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-lg font-bold mb-2" style={{ color: '#ffffff' }}>Ready to act on this plan?</p>
              <p className="text-sm mb-5" style={{ color: '#b0bec5' }}>Our team can connect you with SEBI-registered advisers, AMFI-registered distributors, and IRDAI-registered agents — in your language, near your city.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact" className="inline-block font-semibold px-8 py-3 rounded-full transition text-sm"
                  style={{ background: '#d4a843', color: '#0f2044' }}>
                  Get in Touch
                </a>
                <a href="https://wa.me/919746207344" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-full transition text-sm"
                  style={{ background: '#22c55e', color: '#ffffff' }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            <button onClick={() => { setStep(0); setResult(null); }}
              className="w-full py-3 rounded-full text-sm font-semibold transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#b0bec5', background: 'transparent' }}>
              ← Start Over
            </button>
          </div>
        )}

        {/* Nav */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="px-8 py-3 rounded-full text-sm font-semibold transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cfd8dc', background: 'transparent', opacity: step === 0 ? 0.3 : 1 }}>
              ← Back
            </button>
            {step < 3
              ? <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()}
                  className="px-8 py-3 rounded-full text-sm font-semibold transition-all"
                  style={{ background: canProceed() ? '#d4a843' : 'rgba(212,168,67,0.4)', color: '#0f2044', opacity: canProceed() ? 1 : 0.5, cursor: canProceed() ? 'pointer' : 'not-allowed' }}>
                  Continue →
                </button>
              : <button onClick={calculate} disabled={!canProceed()}
                  className="px-8 py-3 rounded-full text-sm font-semibold transition-all"
                  style={{ background: canProceed() ? '#d4a843' : 'rgba(212,168,67,0.4)', color: '#0f2044', opacity: canProceed() ? 1 : 0.5, cursor: canProceed() ? 'pointer' : 'not-allowed' }}>
                  See My Results →
                </button>
            }
          </div>
        )}

        <p className="text-center text-xs mt-10 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
          For informational purposes only · Not financial advice · Consult a SEBI-registered advisor
        </p>
      </div>
    </div>
  );
}
