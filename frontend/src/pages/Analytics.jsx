import React, { useState } from 'react';

const tabs = ['Economic Damage', 'Trade Impact', 'Humanitarian', 'Recovery'];

const DamageSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 bg-card border border-border rounded overflow-hidden shadow-card">
      <div className="px-5 py-4 border-b border-border">
        <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Annual GDP Loss by Conflict (USD Billions)</span>
      </div>
      <div className="p-5 space-y-4">
        {[
          { name: 'Russia-Ukraine War', value: 480, display: '$480B' },
          { name: 'Yemen Civil War', value: 140, display: '$140B' },
          { name: 'Gaza Conflict', value: 95, display: '$95B' },
          { name: 'Sudan Civil War', value: 72, display: '$72B' },
          { name: 'Myanmar Civil War', value: 38, display: '$38B' },
          { name: 'Sahel Insurgencies', value: 22, display: '$22B' },
        ].map(item => (
          <div key={item.name}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-ink-300">{item.name}</span>
              <span className="text-crimson-400 font-mono font-semibold">{item.display}</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-crimson-700 to-crimson-400"
                style={{ width: `${(item.value / 480) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-4">
      {[
        { label: 'Total Annual Loss', value: '$847B', tag: 'across all zones' },
        { label: 'Infrastructure Damage', value: '$1.2T', tag: 'replacement cost' },
        { label: 'Foreign Investment Loss', value: '-67%', tag: 'vs pre-conflict' },
        { label: 'Currency Devaluation', value: 'Avg -41%', tag: 'conflict currencies' },
      ].map(c => (
        <div key={c.label} className="bg-card border border-border rounded p-4 hover:border-ink-700 transition-colors">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">{c.label}</div>
          <div className="text-2xl font-black text-accent-400 font-mono">{c.value}</div>
          <div className="text-xs text-ink-600 mt-0.5">{c.tag}</div>
        </div>
      ))}
    </div>
  </div>
);

const PlaceholderSection = ({ label }) => (
  <div className="flex items-center justify-center h-64 bg-card border border-dashed border-border rounded">
    <div className="text-center">
      <div className="text-3xl mb-2">📊</div>
      <p className="text-ink-500 text-sm">{label} data — coming soon</p>
    </div>
  </div>
);

const Analytics = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-slow" />
          Deep Intelligence
        </div>
        <h1 className="text-4xl font-black text-ink-50 tracking-tight">Analytics</h1>
        <p className="text-muted mt-2 text-sm">Multi-dimensional economic analysis across all tracked conflict zones.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-end gap-0 border-b border-border mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
              activeTab === i
                ? 'text-accent-400 border-accent-500'
                : 'text-muted border-transparent hover:text-ink-200 hover:border-ink-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 0 && <DamageSection />}
      {activeTab === 1 && <PlaceholderSection label="Trade Impact" />}
      {activeTab === 2 && <PlaceholderSection label="Humanitarian" />}
      {activeTab === 3 && <PlaceholderSection label="Recovery" />}
    </div>
  );
};

export default Analytics;
