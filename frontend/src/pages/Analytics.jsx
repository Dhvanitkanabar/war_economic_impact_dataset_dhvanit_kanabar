import React, { useState, useEffect } from 'react';
import {
  getRegionDistribution,
  getTypeDistribution,
  getWarCostByRegion,
  getInflationByRegion,
  getSectorImpact
} from '../services/analyticsService';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const extractList = (data) => Array.isArray(data) ? data : (data?.data ?? data?.distribution ?? []);

const fmtCost = (val) => {
  if (val == null) return '—';
  const n = Number(val);
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};

const fmtPct = (val) => (val != null ? `${Number(val).toFixed(1)}%` : '—');

const getMax = (list, key) => Math.max(...list.map(i => Number(i[key]) || 0), 1);

// ─── UI Components ────────────────────────────────────────────────────────────

const BarRow = ({ label, valueStr, valueNum, maxNum, color = 'accent' }) => {
  const colors = {
    accent: 'from-accent-700 to-accent-400',
    crimson: 'from-crimson-700 to-crimson-400',
    blue: 'from-blue-700 to-blue-400',
    green: 'from-green-700 to-green-400',
  };
  const gradient = colors[color] || colors.accent;
  const pct = Math.min((valueNum / maxNum) * 100, 100);

  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-ink-300">{label}</span>
        <span className="text-ink-100 font-mono font-semibold">{valueStr}</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub, color = 'accent' }) => {
  const colors = {
    accent: 'text-accent-400',
    crimson: 'text-crimson-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
  };
  const textCol = colors[color] || colors.accent;

  return (
    <div className="bg-card border border-border rounded p-5 hover:border-ink-700 transition-colors">
      <div className="text-xs text-muted uppercase tracking-wider mb-2">{label}</div>
      <div className={`text-2xl font-black ${textCol} font-mono`}>{value}</div>
      {sub && <div className="text-xs text-ink-600 mt-1">{sub}</div>}
    </div>
  );
};

const EmptyState = ({ message = "No data available" }) => (
  <div className="flex items-center justify-center p-12 bg-card border border-dashed border-border rounded">
    <div className="text-center">
      <div className="text-2xl mb-2 text-ink-600">∅</div>
      <p className="text-muted text-sm">{message}</p>
    </div>
  </div>
);

// ─── Tab Contents ─────────────────────────────────────────────────────────────

const EconomicDamage = ({ warCost, inflation }) => {
  const normCost = warCost.map(item => ({
    label: item._id ?? item.region ?? 'Unknown',
    cost: item.totalWarCost ?? item.value ?? 0
  }));
  const maxCost = getMax(normCost, 'cost');

  const normInflation = inflation.map(item => ({
    label: item._id ?? item.region ?? 'Unknown',
    rate: item.avgInflation ?? item.value ?? 0
  }));

  if (normCost.length === 0 && normInflation.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded overflow-hidden shadow-card">
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Total War Cost by Region</span>
        </div>
        <div className="p-5 space-y-5">
          {normCost.length > 0 ? normCost.map(c => (
            <BarRow key={c.label} label={c.label} valueNum={c.cost} maxNum={maxCost} valueStr={fmtCost(c.cost)} color="crimson" />
          )) : <p className="text-xs text-muted">No cost data.</p>}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-1 mb-2">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Avg Inflation by Region</span>
        </div>
        {normInflation.length > 0 ? normInflation.map(inf => (
          <StatCard key={inf.label} label={inf.label} value={fmtPct(inf.rate)} color="accent" />
        )) : <p className="text-xs text-muted">No inflation data.</p>}
      </div>
    </div>
  );
};

const TradeImpact = ({ sectors }) => {
  const normSectors = sectors.map(item => ({
    label: item._id ?? item.sector ?? 'Unknown',
    count: item.count ?? item.value ?? 0
  }));
  const maxCount = getMax(normSectors, 'count');

  if (normSectors.length === 0) return <EmptyState />;

  return (
    <div className="bg-card border border-border rounded overflow-hidden shadow-card max-w-3xl">
      <div className="px-5 py-4 border-b border-border">
        <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Most Affected Sectors</span>
      </div>
      <div className="p-5 space-y-5">
        {normSectors.map(s => (
          <BarRow key={s.label} label={s.label} valueNum={s.count} maxNum={maxCount} valueStr={s.count} color="blue" />
        ))}
      </div>
    </div>
  );
};

const Humanitarian = ({ regions, types }) => {
  const normRegions = regions.map(item => ({
    label: item._id ?? item.region ?? 'Unknown',
    count: item.count ?? item.value ?? 0
  }));
  const maxReg = getMax(normRegions, 'count');

  const normTypes = types.map(item => ({
    label: item._id ?? item.type ?? 'Unknown',
    count: item.count ?? item.value ?? 0
  }));
  const maxType = getMax(normTypes, 'count');

  if (normRegions.length === 0 && normTypes.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded overflow-hidden shadow-card">
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Conflicts by Region</span>
        </div>
        <div className="p-5 space-y-5">
          {normRegions.length > 0 ? normRegions.map(r => (
            <BarRow key={r.label} label={r.label} valueNum={r.count} maxNum={maxReg} valueStr={r.count} color="accent" />
          )) : <p className="text-xs text-muted">No region data.</p>}
        </div>
      </div>
      <div className="bg-card border border-border rounded overflow-hidden shadow-card">
        <div className="px-5 py-4 border-b border-border">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Conflicts by Type</span>
        </div>
        <div className="p-5 space-y-5">
          {normTypes.length > 0 ? normTypes.map(t => (
            <BarRow key={t.label} label={t.label} valueNum={t.count} maxNum={maxType} valueStr={t.count} color="green" />
          )) : <p className="text-xs text-muted">No type data.</p>}
        </div>
      </div>
    </div>
  );
};

const Recovery = ({ sectors, warCost }) => {
  // Reuse existing data to show a "Recovery Focus" perspective without blank placeholders
  const normSectors = sectors.map(item => ({
    label: item._id ?? item.sector ?? 'Unknown',
    count: item.count ?? item.value ?? 0
  }));
  const normCost = warCost.map(item => ({
    label: item._id ?? item.region ?? 'Unknown',
    cost: item.totalWarCost ?? item.value ?? 0
  }));

  if (normSectors.length === 0 && normCost.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="px-1 mb-2">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Sectors Requiring Reconstruction</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {normSectors.length > 0 ? normSectors.map(s => (
            <StatCard key={s.label} label={s.label} value={`${s.count} conflicts`} sub="Tracking critical sector impact" color="green" />
          )) : <p className="text-xs text-muted">No sector data.</p>}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="px-1 mb-2">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Est. Rebuild Cost Scale</span>
        </div>
        {normCost.length > 0 ? normCost.slice(0, 4).map(c => (
          <StatCard key={c.label} label={c.label} value={fmtCost(c.cost)} color="blue" />
        )) : <p className="text-xs text-muted">No cost data.</p>}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const tabs = ['Economic Damage', 'Trade Impact', 'Humanitarian', 'Recovery'];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [data, setData] = useState({
    regionDistribution: [],
    typeDistribution: [],
    warCostByRegion: [],
    inflationByRegion: [],
    sectorImpact: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rd, td, wcr, ibr, si] = await Promise.all([
          getRegionDistribution().catch(() => []),
          getTypeDistribution().catch(() => []),
          getWarCostByRegion().catch(() => []),
          getInflationByRegion().catch(() => []),
          getSectorImpact().catch(() => [])
        ]);

        setData({
          regionDistribution: extractList(rd),
          typeDistribution: extractList(td),
          warCostByRegion: extractList(wcr),
          inflationByRegion: extractList(ibr),
          sectorImpact: extractList(si)
        });
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

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
      <div className="flex flex-wrap items-end gap-0 border-b border-border mb-8">
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

      {/* States */}
      {loading ? (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-48 bg-ink-900/50 rounded-lg border border-border" />
          <div className="h-48 bg-ink-900/50 rounded-lg border border-border" />
        </div>
      ) : error ? (
        <div className="p-4 bg-crimson-600/10 border border-crimson-600/30 rounded text-sm text-crimson-400">
          {error}
        </div>
      ) : (
        /* Tab Content */
        <div className="animate-in fade-in duration-300">
          {activeTab === 0 && <EconomicDamage warCost={data.warCostByRegion} inflation={data.inflationByRegion} />}
          {activeTab === 1 && <TradeImpact sectors={data.sectorImpact} />}
          {activeTab === 2 && <Humanitarian regions={data.regionDistribution} types={data.typeDistribution} />}
          {activeTab === 3 && <Recovery sectors={data.sectorImpact} warCost={data.warCostByRegion} />}
        </div>
      )}
    </div>
  );
};

export default Analytics;
