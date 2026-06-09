import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getStatsOverview } from '../services/statsService';
import { getConflicts } from '../services/conflictService';
import { getRegionDistribution } from '../services/analyticsService';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Safely extract a numeric value from an object, trying multiple key names.
 * Returns null if none found.
 */
const pick = (obj, ...keys) => {
  for (const k of keys) {
    if (obj?.[k] != null) return obj[k];
  }
  return null;
};

const isActiveStatus = (status) => {
  const s = status?.toLowerCase() ?? '';
  return s === 'active' || s === 'ongoing';
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, icon, color = 'accent', loading, error }) => {
  const colors = {
    accent:  { text: 'text-accent-400',  border: 'border-l-accent-500',  bg: 'bg-accent-600/10' },
    crimson: { text: 'text-crimson-400', border: 'border-l-crimson-500', bg: 'bg-crimson-600/10' },
    green:   { text: 'text-green-400',   border: 'border-l-green-500',   bg: 'bg-green-600/10'  },
    blue:    { text: 'text-blue-400',    border: 'border-l-blue-500',    bg: 'bg-blue-600/10'   },
  };
  const c = colors[color] || colors.accent;

  return (
    <div className={`bg-card border border-border border-l-2 ${c.border} rounded p-5 shadow-card hover:border-ink-700 transition-colors`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">{label}</p>
          {loading ? (
            <div className="h-8 w-24 bg-ink-800 rounded animate-pulse" />
          ) : error ? (
            <p className="text-2xl font-black text-ink-700">—</p>
          ) : (
            <p className={`text-3xl font-black font-mono ${c.text} leading-none`}>
              {value ?? '—'}
            </p>
          )}
          {sub && <p className="text-xs text-muted mt-2">{sub}</p>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded ${c.bg} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, action }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xs font-semibold text-ink-500 uppercase tracking-widest">{title}</h2>
    {action}
  </div>
);

const Badge = ({ status }) => (
  <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
    isActiveStatus(status)
      ? 'bg-crimson-600/15 text-crimson-400 border border-crimson-600/30'
      : 'bg-ink-800 text-ink-500 border border-border'
  }`}>
    {status || 'Unknown'}
  </span>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const [stats,           setStats]           = useState(null);
  const [statsError,      setStatsError]      = useState(false);
  const [conflicts,       setConflicts]       = useState([]);
  const [regions,         setRegions]         = useState([]);
  const [loadingStats,    setLoadingStats]    = useState(true);
  const [loadingConflicts,setLoadingConflicts]= useState(true);
  const [loadingRegions,  setLoadingRegions]  = useState(true);

  // ── Stats Overview ──────────────────────────────────────────────────────────
  useEffect(() => {
    getStatsOverview()
      .then((data) => {
        // Backend may wrap in { data: ... } or { success, data } or return directly
        setStats(data?.data ?? data);
        setStatsError(false);
      })
      .catch(() => {
        setStats(null);
        setStatsError(true);
      })
      .finally(() => setLoadingStats(false));
  }, []);

  // ── Recent Conflicts ────────────────────────────────────────────────────────
  useEffect(() => {
    getConflicts({ page: 1, limit: 6 })
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : (data?.data ?? data?.conflicts ?? data?.results ?? []);
        setConflicts(list);
      })
      .catch(() => setConflicts([]))
      .finally(() => setLoadingConflicts(false));
  }, []);

  // ── Region Distribution ─────────────────────────────────────────────────────
  useEffect(() => {
    getRegionDistribution()
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : (data?.data ?? data?.distribution ?? []);
        setRegions(list.slice(0, 7));
      })
      .catch(() => setRegions([]))
      .finally(() => setLoadingRegions(false));
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // ── Stat value derivation (handle multiple backend key names) ───────────────
  const totalConflicts  = pick(stats, 'totalConflicts', 'total', 'count');
  const activeConflicts = pick(stats, 'activeConflicts', 'active', 'ongoingConflicts', 'ongoing');
  const avgGDP          = pick(stats, 'avgGDPImpact', 'averageGDPImpact', 'avgGDP', 'averageGdpChange', 'avgGdpPerCapitaChange');
  const avgWarCost      = pick(stats, 'avgWarCost', 'averageWarCost', 'avgCost');

  const fmtGDP = (v) => v != null ? `${Number(v).toFixed(1)}%` : null;
  const fmtCost = (v) => {
    if (v == null) return null;
    const n = Number(v);
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
    return `$${n.toLocaleString()}`;
  };

  // ── Region data normalise ───────────────────────────────────────────────────
  const normRegions = regions.map((r) => ({
    label: r.region ?? r._id ?? r.name ?? r.label ?? '?',
    count: r.count  ?? r.value ?? r.total ?? 0,
  }));
  const maxRegionCount = Math.max(...normRegions.map((r) => r.count), 1);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10">

      {/* ── Welcome Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-slow" />
            Dashboard
          </div>
          <h1 className="text-3xl font-black text-ink-50 tracking-tight">
            {greeting()},{' '}
            <span className="text-gradient-accent">
              {user?.name || user?.email?.split('@')[0] || 'Analyst'}
            </span>
          </h1>
          <p className="text-muted text-sm mt-1">Here's the latest global conflict economic data.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live data
          <span className="text-ink-700">·</span>
          <span className="font-mono">
            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <section>
        <SectionHeader title="Overview" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Conflicts"
            value={totalConflicts}
            sub="In database"
            color="accent"
            loading={loadingStats}
            error={statsError}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f56e10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
          />
          <StatCard
            label="Active Conflicts"
            value={activeConflicts}
            sub="Ongoing globally"
            color="crimson"
            loading={loadingStats}
            error={statsError}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
          />
          <StatCard
            label="Avg GDP Impact"
            value={fmtGDP(avgGDP)}
            sub="GDP loss per conflict"
            color="blue"
            loading={loadingStats}
            error={statsError}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}
          />
          <StatCard
            label="Avg War Cost"
            value={fmtCost(avgWarCost)}
            sub="USD estimate"
            color="green"
            loading={loadingStats}
            error={statsError}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
          />
        </div>
        {statsError && (
          <p className="text-xs text-crimson-400 mt-2 flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Could not load stats — backend may be waking up. Try refreshing in 30 seconds.
          </p>
        )}
      </section>

      {/* ── Conflicts + Region ── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Recent Conflicts Table */}
        <div className="lg:col-span-3 bg-card border border-border rounded overflow-hidden shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Recent Conflicts</span>
            <Link to="/conflicts" className="text-xs text-accent-400 hover:text-accent-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            {loadingConflicts ? (
              <div className="p-5 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-ink-800/50 rounded animate-pulse" />
                ))}
              </div>
            ) : conflicts.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-muted text-sm">No conflict data yet.</p>
                <p className="text-ink-600 text-xs mt-1">The backend may still be waking up — try refreshing.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-ink-950/40">
                    <th className="px-5 py-3 text-left text-xs text-ink-600 font-semibold uppercase tracking-wider">Conflict</th>
                    <th className="px-5 py-3 text-left text-xs text-ink-600 font-semibold uppercase tracking-wider">Region</th>
                    <th className="px-5 py-3 text-left text-xs text-ink-600 font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-right text-xs text-ink-600 font-semibold uppercase tracking-wider">GDP Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {conflicts.map((c, i) => {
                    const name      = c.conflictName ?? c.name ?? c.title ?? '—';
                    const region    = c.region ?? '—';
                    const status    = c.status ?? '—';
                    const gdp       = c.gdpPerCapitaChange ?? c.gdpImpact ?? c.gdpChange;
                    const gdpStr    = gdp != null ? `${Number(gdp) > 0 ? '+' : ''}${Number(gdp).toFixed(1)}%` : '—';

                    return (
                      <tr key={c._id ?? i} className="border-b border-border/50 last:border-0 hover:bg-ink-950/40 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActiveStatus(status) ? 'bg-crimson-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-ink-600'}`} />
                            <span className="text-sm text-ink-100 font-medium truncate max-w-[160px]">{name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-muted">{region}</td>
                        <td className="px-5 py-3"><Badge status={status} /></td>
                        <td className="px-5 py-3 text-right text-sm font-mono font-semibold text-accent-400">{gdpStr}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Region Distribution */}
        <div className="lg:col-span-2 bg-card border border-border rounded overflow-hidden shadow-card flex flex-col">
          <div className="px-5 py-4 border-b border-border">
            <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">Conflicts by Region</span>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            {loadingRegions ? (
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 bg-ink-800/50 rounded animate-pulse" />
                ))}
              </div>
            ) : normRegions.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted text-sm">No data</div>
            ) : (
              normRegions.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-ink-300 truncate">{r.label}</span>
                    <span className="text-accent-400 font-mono font-semibold ml-2">{r.count}</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-700 to-accent-400 rounded-full transition-all duration-700"
                      style={{ width: `${(r.count / maxRegionCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="px-5 py-4 border-t border-border">
            <Link to="/analytics">
              <button className="w-full border border-accent-700 text-accent-400 text-xs font-semibold py-2 rounded hover:bg-accent-600/10 transition-colors">
                Full Analytics →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section>
        <SectionHeader title="Quick Access" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Browse Conflicts', to: '/conflicts', icon: '🗺️', desc: 'Full conflict database' },
            { label: 'Statistics',       to: '/statistics', icon: '📊', desc: 'Aggregate metrics'     },
            { label: 'Analytics',        to: '/analytics',  icon: '📈', desc: 'Trends & distributions' },
            { label: 'API Test',         to: '/api-test',   icon: '🔌', desc: 'Backend connectivity'  },
          ].map((item) => (
            <Link key={item.to} to={item.to}>
              <div className="bg-card border border-border rounded p-4 hover:border-accent-700 hover:bg-ink-950/60 transition-all duration-200 group h-full">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="text-sm font-semibold text-ink-100 group-hover:text-white transition-colors">{item.label}</div>
                <div className="text-xs text-muted mt-1">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
