import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SEO from '../components/SEO.jsx';

const StatBadge = ({ value, label, trend }) => (
  <div className="bg-card border border-border rounded p-5 space-y-1 hover:border-accent-700 transition-colors">
    <div className="text-2xl font-bold text-ink-50">{value}</div>
    <div className="text-xs text-muted uppercase tracking-wider">{label}</div>
    {trend && (
      <div className={`text-xs font-medium ${trend > 0 ? 'text-crimson-400' : 'text-green-400'}`}>
        {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last year
      </div>
    )}
  </div>
);

const ConflictRow = ({ name, region, gdpImpact, status }) => (
  <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0 hover:bg-ink-950/40 px-2 -mx-2 rounded transition-colors">
    <div className="flex items-center gap-3 min-w-0">
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status === 'active' ? 'bg-crimson-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'bg-ink-600'}`} />
      <div className="min-w-0">
        <div className="text-sm font-medium text-ink-100 truncate">{name}</div>
        <div className="text-xs text-muted">{region}</div>
      </div>
    </div>
    <div className="text-right flex-shrink-0">
      <div className="text-sm font-semibold text-accent-400">{gdpImpact}</div>
      <div className="text-xs text-muted">GDP Impact</div>
    </div>
  </div>
);

const Home = () => {
  const stats = [
    { value: '43', label: 'Active Conflicts', trend: 8 },
    { value: '$2.4T', label: 'Total Economic Cost', trend: 12 },
    { value: '68M', label: 'Displaced People', trend: 5 },
    { value: '127', label: 'Countries Affected', trend: -3 },
  ];

  const conflicts = [
    { name: 'Russia-Ukraine War', region: 'Eastern Europe', gdpImpact: '-31.4%', status: 'active' },
    { name: 'Sudan Civil War', region: 'Northeast Africa', gdpImpact: '-18.7%', status: 'active' },
    { name: 'Gaza Conflict', region: 'Middle East', gdpImpact: '-24.1%', status: 'active' },
    { name: 'Myanmar Civil War', region: 'Southeast Asia', gdpImpact: '-11.3%', status: 'active' },
    { name: 'Ethiopia Tigray', region: 'East Africa', gdpImpact: '-9.8%', status: 'resolved' },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      <SEO title="Home" description="WarLens is an AI-powered war economic impact analysis platform providing interactive analytics, historical insights, and real-time conflict statistics." path="/" />

      {/* Hero */}
      <section className="flex flex-col items-start gap-6 pt-4">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-slow" />
          Live Global Analysis
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-ink-50 leading-[1.05] tracking-tight max-w-3xl">
          The Real Cost of{' '}
          <span className="text-gradient-accent">War.</span>
        </h1>
        <p className="text-ink-400 text-lg max-w-xl leading-relaxed">
          WarLens tracks and quantifies the economic devastation of armed conflicts worldwide — from GDP collapse to trade disruption and reconstruction debt.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link to="/conflicts">
            <Button variant="primary" size="lg" icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            }>
              Explore Conflicts
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="ghost" size="lg">
              View Analytics
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-semibold text-ink-500 uppercase tracking-widest">Global Overview</h2>
          <span className="text-xs text-muted font-mono">Updated: Jun 2026</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatBadge key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Active Conflicts + Feature */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Conflict List */}
        <div className="lg:col-span-3 bg-card border border-border rounded overflow-hidden shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-400 uppercase tracking-widest">Active Conflicts</span>
            <Link to="/conflicts" className="text-xs text-accent-400 hover:text-accent-300 transition-colors">View all →</Link>
          </div>
          <div className="p-5">
            {conflicts.map((c) => <ConflictRow key={c.name} {...c} />)}
          </div>
        </div>

        {/* Feature card */}
        <div className="lg:col-span-2 bg-card border border-border rounded overflow-hidden shadow-card flex flex-col">
          <div className="px-5 py-4 border-b border-border">
            <span className="text-xs font-semibold text-ink-400 uppercase tracking-widest">Economic Sectors</span>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-3">
            {[
              { label: 'Trade & Exports', pct: 74 },
              { label: 'Energy Markets', pct: 61 },
              { label: 'Agriculture', pct: 48 },
              { label: 'Financial Sector', pct: 38 },
              { label: 'Infrastructure', pct: 83 },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink-300">{item.label}</span>
                  <span className="text-accent-400 font-mono">{item.pct}%</span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-600 to-accent-400 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-border">
            <Link to="/analytics">
              <Button variant="outline" size="sm" className="w-full">
                Deep Analysis →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden rounded border border-accent-700/40 bg-gradient-to-r from-accent-950/60 via-ink-950/80 to-ink-950/60 p-8 md:p-10">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #f56e10 0, #f56e10 1px, transparent 0, transparent 50%)`,
            backgroundSize: '16px 16px',
          }}
        />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-ink-50 mb-2">Track any conflict in real-time</h3>
            <p className="text-ink-400 text-sm max-w-md">Get detailed economic indicators, sanctions data, and currency impact reports for every active conflict zone.</p>
          </div>
          <Link to="/register" className="flex-shrink-0">
            <Button variant="primary" size="lg">Create Free Account</Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
