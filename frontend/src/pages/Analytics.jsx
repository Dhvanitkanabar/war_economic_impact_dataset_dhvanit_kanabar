import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import {
  getRegionDistribution,
  getTypeDistribution,
  getWarCostByRegion,
  getInflationByRegion,
  getSectorImpact
} from '../services/analyticsService';
import { getStatsOverview } from '../services/statsService';
import { getConflicts } from '../services/conflictService';

// ─── Constants & Styles ──────────────────────────────────────────────────────
const COLORS = ['#f56e10', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4'];

const fmtCost = (val) => {
  if (val == null) return '—';
  const n = Number(val);
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};

const fmtPct = (val) => (val != null ? `${Number(val).toFixed(1)}%` : '—');

const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-ink-950/95 border border-border p-3 rounded-lg shadow-xl text-xs font-mono">
        {label && <p className="text-ink-100 font-bold mb-1">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || p.fill }}>
            {p.name}: {prefix}{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}{suffix}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Stat Card Component ─────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color = 'accent' }) => {
  const colors = {
    accent: 'text-accent-400 border-l-accent-500',
    crimson: 'text-crimson-400 border-l-crimson-500',
    blue: 'text-blue-400 border-l-blue-500',
    green: 'text-green-400 border-l-green-500',
    yellow: 'text-yellow-500 border-l-yellow-500',
  };
  const borderCol = colors[color] || colors.accent;

  return (
    <div className={`bg-card border border-border border-l-2 ${borderCol} rounded-xl p-5 hover:border-ink-700 transition-colors shadow-card`}>
      <div className="text-[10px] text-ink-500 uppercase tracking-widest font-mono mb-2">{label}</div>
      <div className="text-2xl font-black text-ink-100 font-mono tracking-tight">{value}</div>
      {sub && <div className="text-xs text-muted mt-1.5">{sub}</div>}
    </div>
  );
};

// ─── Empty State Component ───────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-16 bg-card border border-dashed border-border rounded-2xl">
    <div className="w-12 h-12 rounded-full bg-ink-900/50 flex items-center justify-center text-ink-500 mb-4 font-mono">
      ∅
    </div>
    <h3 className="text-sm font-semibold text-ink-200">No analytics data available.</h3>
    <p className="text-xs text-muted mt-1">Try again later or seed some conflict data.</p>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('Loading analytics...');
  const [error, setError] = useState(null);

  // States for API data
  const [stats, setStats] = useState(null);
  const [regionData, setRegionData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [warCostRegion, setWarCostRegion] = useState([]);
  const [inflationRegion, setInflationRegion] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [rawConflicts, setRawConflicts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      // Toggle messages halfway
      const timer = setTimeout(() => {
        setLoadingMsg('Fetching statistics...');
      }, 800);

      try {
        const [
          resStats,
          resRegion,
          resType,
          resWarCost,
          resInflation,
          resSector,
          resConflicts
        ] = await Promise.all([
          getStatsOverview().catch(() => null),
          getRegionDistribution().catch(() => []),
          getTypeDistribution().catch(() => []),
          getWarCostByRegion().catch(() => []),
          getInflationByRegion().catch(() => []),
          getSectorImpact().catch(() => []),
          getConflicts({ limit: 100 }).catch(() => null)
        ]);

        setStats(resStats?.data || resStats);
        
        const extractList = (d) => Array.isArray(d) ? d : (d?.data || d?.distribution || []);
        setRegionData(extractList(resRegion));
        setTypeData(extractList(resType));
        setWarCostRegion(extractList(resWarCost));
        setInflationRegion(extractList(resInflation));
        setSectorData(extractList(resSector));
        setRawConflicts(extractList(resConflicts));
      } catch (err) {
        setError('Failed to load analytics dashboard data.');
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent-500"></div>
        <p className="text-sm font-mono text-ink-300 animate-pulse">{loadingMsg}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="p-4 bg-crimson-600/10 border border-crimson-600/30 rounded-xl text-sm text-crimson-400">
          {error}
        </div>
      </div>
    );
  }

  // Derive counts & lists
  const totalConflicts = stats?.totalConflicts ?? rawConflicts.length ?? 0;
  const activeConflicts = stats?.ongoingConflicts ?? rawConflicts.filter(c => c.status === 'Ongoing').length ?? 0;
  const endedConflicts = stats?.resolvedConflicts ?? rawConflicts.filter(c => c.status === 'Resolved').length ?? 0;
  
  const avgInflation = stats?.averageInflationRate ?? 0;
  const avgGDP = stats?.averageGDPChange ?? 0;
  
  const totalWarCost = stats?.totalWarCostUsd ?? rawConflicts.reduce((sum, c) => sum + (c.warCostUsd || 0), 0);
  const totalReconCost = stats?.totalReconstructionCostUsd ?? rawConflicts.reduce((sum, c) => sum + (c.reconstructionCostUsd || 0), 0);

  const avgWarCost = totalConflicts > 0 ? totalWarCost / totalConflicts : 0;
  const avgReconCost = totalConflicts > 0 ? totalReconCost / totalConflicts : 0;

  // Check if any data exists
  if (totalConflicts === 0 && regionData.length === 0 && typeData.length === 0) {
    return (
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <EmptyState />
      </div>
    );
  }

  // 1. Pie Chart: Conflict Status Distribution
  const statusPieData = [
    { name: 'Active/Ongoing', value: activeConflicts },
    { name: 'Ended/Resolved', value: endedConflicts }
  ].filter(d => d.value > 0);

  // 2. Pie Chart: Region Distribution
  const regionPieData = regionData.map(item => ({
    name: item.region ?? 'Unknown',
    value: item.totalConflicts ?? item.count ?? 0
  })).filter(d => d.value > 0);

  // 3. Pie Chart: Type Distribution
  const typePieData = typeData.map(item => ({
    name: item.conflictType ?? 'Unknown',
    value: item.totalConflicts ?? item.count ?? 0
  })).filter(d => d.value > 0);

  // 4. Bar Chart: War Cost & Reconstruction Cost comparisons
  // Sort individual conflicts by cost
  const sortedByWarCost = [...rawConflicts]
    .sort((a, b) => (b.warCostUsd || 0) - (a.warCostUsd || 0))
    .slice(0, 8)
    .map(c => ({
      name: c.conflictName ?? c.primaryCountry ?? 'Unknown',
      cost: c.warCostUsd ?? 0,
      reconCost: c.reconstructionCostUsd ?? 0
    }));

  // Sort individual conflicts by economic impacts
  const sortedByGDP = [...rawConflicts]
    .sort((a, b) => (a.gdpChange || 0) - (b.gdpChange || 0)) // Most negative first
    .slice(0, 8)
    .map(c => ({
      name: c.conflictName ?? c.primaryCountry ?? 'Unknown',
      gdp: c.gdpChange ?? 0,
      inflation: c.inflationRate ?? 0
    }));

  // 5. Line Chart: Year-wise trends & Historical statistics
  // Group conflicts by startYear
  const yearGroups = {};
  rawConflicts.forEach(c => {
    const y = c.startYear;
    if (y) {
      if (!yearGroups[y]) {
        yearGroups[y] = { year: y, count: 0, sumGDP: 0, sumInflation: 0, countWithEcon: 0 };
      }
      yearGroups[y].count += 1;
      if (c.gdpChange != null && c.inflationRate != null) {
        yearGroups[y].sumGDP += c.gdpChange;
        yearGroups[y].sumInflation += c.inflationRate;
        yearGroups[y].countWithEcon += 1;
      }
    }
  });

  const lineChartData = Object.values(yearGroups)
    .sort((a, b) => a.year - b.year)
    .map(g => ({
      year: String(g.year),
      'Conflict Count': g.count,
      'Avg GDP Change (%)': g.countWithEcon > 0 ? Number((g.sumGDP / g.countWithEcon).toFixed(1)) : 0,
      'Avg Inflation (%)': g.countWithEcon > 0 ? Number((g.sumInflation / g.countWithEcon).toFixed(1)) : 0
    }));

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-slow" />
          Analytics Dashboard
        </div>
        <h1 className="text-4xl font-black text-ink-50 tracking-tight">Intelligence & Insights</h1>
        <p className="text-muted mt-2 text-sm">Deep-dive visualizations of macroeconomics, war damages, and regional distributions.</p>
      </div>

      {/* ── Dashboard Cards ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard label="Total Conflicts" value={totalConflicts} sub="Tracked zones" color="accent" />
        <StatCard label="Active Conflicts" value={activeConflicts} sub="Ongoing actions" color="crimson" />
        <StatCard label="Ended Conflicts" value={endedConflicts} sub="Resolved cases" color="green" />
        <StatCard label="Avg Inflation" value={fmtPct(avgInflation)} sub="Global average" color="yellow" />
        <StatCard label="Avg GDP Change" value={fmtPct(avgGDP)} sub="Economic contraction" color="blue" />
        <StatCard label="Avg War Cost" value={fmtCost(avgWarCost)} sub="Per conflict" color="crimson" />
        <StatCard label="Avg Reconstruction" value={fmtCost(avgReconCost)} sub="Rebuild estimate" color="green" />
      </section>

      {/* ── Pie Charts Section ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status distribution */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">Conflict Status Distribution</span>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip content={<CustomTooltip suffix=" conflicts" />} />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" iconSize={10} iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region distribution */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">Region Distribution</span>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {regionPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip suffix=" conflicts" />} />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" iconSize={10} iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conflict type distribution */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">Conflict Type Distribution</span>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {typePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip suffix=" conflicts" />} />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" iconSize={10} iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── Bar Charts Section ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* War Cost vs Reconstruction Cost */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">Cost comparison (Top Conflicts)</span>
          <div className="h-80 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedByWarCost} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e3545" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} angle={-25} textAnchor="end" interval={0} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(v) => fmtCost(v)} />
                <Tooltip content={<CustomTooltip prefix="$" />} />
                <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Bar name="War Cost (USD)" dataKey="cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar name="Reconstruction Cost (USD)" dataKey="reconCost" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GDP & Inflation comparisons */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">GDP Impact vs Inflation Rate (Top Conflicts)</span>
          <div className="h-80 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedByGDP} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e3545" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} angle={-25} textAnchor="end" interval={0} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip suffix="%" />} />
                <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Bar name="GDP Change (%)" dataKey="gdp" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar name="Inflation Rate (%)" dataKey="inflation" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── Line Charts Section ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Year-wise Conflict Count Trends */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">Year-Wise Trends & Historical Conflict Statistics</span>
          <div className="h-80 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e3545" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Line type="monotone" name="New Conflict Openings" dataKey="Conflict Count" stroke="#f56e10" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Economic Indicators Over Time */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
          <span className="text-xs font-bold text-ink-400 uppercase tracking-wider font-mono mb-4">Economic Indicators (Yearly Average Trends)</span>
          <div className="h-80 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2e3545" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip suffix="%" />} />
                <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Line type="monotone" name="Avg GDP Change (%)" dataKey="Avg GDP Change (%)" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" name="Avg Inflation Rate (%)" dataKey="Avg Inflation (%)" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Analytics;
