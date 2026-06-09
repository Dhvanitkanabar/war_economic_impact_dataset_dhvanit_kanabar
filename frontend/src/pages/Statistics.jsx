import React from 'react';

const MetricCard = ({ label, value, subtext, color = 'accent' }) => (
  <div className="bg-card border border-border rounded p-6 hover:border-ink-700 transition-colors">
    <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">{label}</div>
    <div className={`text-3xl font-black ${color === 'accent' ? 'text-accent-400' : color === 'crimson' ? 'text-crimson-400' : 'text-ink-100'} font-mono`}>{value}</div>
    {subtext && <div className="text-xs text-muted mt-2">{subtext}</div>}
  </div>
);

const BarChart = ({ data, title }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bg-card border border-border rounded overflow-hidden shadow-card">
      <div className="px-5 py-4 border-b border-border">
        <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="p-5 flex flex-col gap-3">
        {data.map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-ink-300">{item.label}</span>
              <span className="text-accent-400 font-mono font-semibold">{item.display}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-accent-700 to-accent-400"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Statistics = () => {
  const metrics = [
    { label: 'Total War Costs (2020-2026)', value: '$2.4T', subtext: 'Cumulative economic damage', color: 'accent' },
    { label: 'Highest Single GDP Loss', value: '-52%', subtext: 'Yemen, 9-year civil war', color: 'crimson' },
    { label: 'Average Conflict Duration', value: '4.7 yrs', subtext: 'Active conflicts baseline', color: 'default' },
    { label: 'Displaced Population', value: '68M', subtext: 'Across all conflict zones', color: 'default' },
  ];

  const gdpImpacts = [
    { label: 'Yemen', value: 52, display: '-52.0%' },
    { label: 'Ukraine', value: 31.4, display: '-31.4%' },
    { label: 'Gaza', value: 24.1, display: '-24.1%' },
    { label: 'Sudan', value: 18.7, display: '-18.7%' },
    { label: 'Myanmar', value: 11.3, display: '-11.3%' },
    { label: 'Sahel Region', value: 7.4, display: '-7.4%' },
  ];

  const tradeLoss = [
    { label: 'Black Sea Shipping', value: 88, display: '-$340B' },
    { label: 'Red Sea Route', value: 72, display: '-$210B' },
    { label: 'Energy Exports', value: 65, display: '-$180B' },
    { label: 'Agricultural Trade', value: 55, display: '-$120B' },
    { label: 'Financial Flows', value: 40, display: '-$95B' },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          Aggregate Data
        </div>
        <h1 className="text-4xl font-black text-ink-50 tracking-tight">Statistics</h1>
        <p className="text-muted mt-2 text-sm">Aggregated economic impact statistics across all tracked conflict zones.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart title="GDP Impact by Country (%)" data={gdpImpacts} />
        <BarChart title="Trade Route Disruption" data={tradeLoss} />
      </div>
    </div>
  );
};

export default Statistics;
