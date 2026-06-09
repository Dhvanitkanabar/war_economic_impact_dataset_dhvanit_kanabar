import React from 'react';

const TableRow = ({ conflict, country, status, gdp, casualties, duration }) => (
  <tr className="border-b border-border hover:bg-ink-950/40 transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'Active' ? 'bg-crimson-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-ink-600'}`} />
        <span className="text-sm font-medium text-ink-100">{conflict}</span>
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-muted">{country}</td>
    <td className="px-4 py-3">
      <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${status === 'Active' ? 'bg-crimson-600/15 text-crimson-400 border border-crimson-600/30' : 'bg-ink-800 text-ink-500 border border-border'}`}>
        {status}
      </span>
    </td>
    <td className="px-4 py-3 text-sm font-semibold text-accent-400 font-mono">{gdp}</td>
    <td className="px-4 py-3 text-sm text-muted font-mono">{casualties}</td>
    <td className="px-4 py-3 text-sm text-muted">{duration}</td>
  </tr>
);

const Conflicts = () => {
  const data = [
    { conflict: 'Russia-Ukraine War', country: 'Ukraine', status: 'Active', gdp: '-31.4%', casualties: '~500K', duration: '4+ yrs' },
    { conflict: 'Gaza Conflict', country: 'Palestine / Israel', status: 'Active', gdp: '-24.1%', casualties: '~40K', duration: '2+ yrs' },
    { conflict: 'Sudan Civil War', country: 'Sudan', status: 'Active', gdp: '-18.7%', casualties: '~150K', duration: '3+ yrs' },
    { conflict: 'Myanmar Civil War', country: 'Myanmar', status: 'Active', gdp: '-11.3%', casualties: '~50K', duration: '5+ yrs' },
    { conflict: 'Ethiopia-Tigray War', country: 'Ethiopia', status: 'Resolved', gdp: '-9.8%', casualties: '~500K', duration: '2 yrs' },
    { conflict: 'Yemen Civil War', country: 'Yemen', status: 'Active', gdp: '-52.0%', casualties: '~377K', duration: '9+ yrs' },
    { conflict: 'Sahel Insurgencies', country: 'Mali, Niger, Burkina', status: 'Active', gdp: '-7.4%', casualties: '~20K', duration: '12+ yrs' },
    { conflict: 'Nagorno-Karabakh', country: 'Azerbaijan', status: 'Resolved', gdp: '-4.2%', casualties: '~7K', duration: '44 days' },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          Conflict Database
        </div>
        <h1 className="text-4xl font-black text-ink-50 tracking-tight">Global Conflicts</h1>
        <p className="text-muted mt-2 text-sm">Economic impact data for all tracked active and resolved conflicts.</p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {['All', 'Active', 'Resolved'].map(f => (
          <button key={f}
            className={`text-xs px-3 py-1.5 rounded border transition-all ${f === 'All' ? 'border-accent-500 bg-accent-600/20 text-accent-300' : 'border-border text-muted hover:border-ink-600 hover:text-ink-300'}`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto text-xs text-ink-600 font-mono">{data.length} conflicts tracked</div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-ink-950/60">
                {['Conflict', 'Country/Region', 'Status', 'GDP Impact', 'Casualties', 'Duration'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-ink-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(row => <TableRow key={row.conflict} {...row} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Conflicts;
