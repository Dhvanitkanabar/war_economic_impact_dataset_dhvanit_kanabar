import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/authService';
import { getConflicts } from '../services/conflictService';
import { searchConflicts } from '../services/searchService';
import { getStatsOverview } from '../services/statsService';
import { getRegionDistribution } from '../services/analyticsService';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://war-economic-impact-dataset-dhvanit.onrender.com/api';

// ─── Small helper components ─────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    idle:    'bg-ink-800 text-ink-400',
    loading: 'bg-ink-800 text-accent-400 animate-pulse',
    ok:      'bg-green-900/40 text-green-400 border border-green-700/40',
    error:   'bg-crimson-900/40 text-crimson-400 border border-crimson-700/40',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-mono ${map[status] || map.idle}`}>
      {status.toUpperCase()}
    </span>
  );
};

const TestBlock = ({ label, onRun, result, status }) => (
  <div className="bg-card border border-border rounded overflow-hidden">
    <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border bg-ink-950/40">
      <span className="text-sm font-medium text-ink-200">{label}</span>
      <div className="flex items-center gap-3">
        <StatusBadge status={status} />
        <button
          onClick={onRun}
          disabled={status === 'loading'}
          className="clip-corner-sm text-xs font-semibold bg-accent-600 hover:bg-accent-500 disabled:opacity-40 text-white px-3 py-1.5 transition-all"
        >
          Run
        </button>
      </div>
    </div>
    {result && (
      <pre className="p-4 text-xs text-ink-300 font-mono overflow-auto max-h-48 leading-relaxed whitespace-pre-wrap break-all">
        {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
      </pre>
    )}
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

const ApiTest = () => {
  const [tests, setTests] = useState({
    login:      { status: 'idle', result: null },
    register:   { status: 'idle', result: null },
    conflicts:  { status: 'idle', result: null },
    search:     { status: 'idle', result: null },
    stats:      { status: 'idle', result: null },
    analytics:  { status: 'idle', result: null },
  });

  const run = async (key, fn) => {
    setTests(prev => ({ ...prev, [key]: { status: 'loading', result: null } }));
    try {
      const data = await fn();
      setTests(prev => ({ ...prev, [key]: { status: 'ok', result: data } }));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Unknown error';
      const detail = `HTTP ${err.response?.status || '?'} — ${msg}`;
      setTests(prev => ({ ...prev, [key]: { status: 'error', result: detail } }));
    }
  };

  const testCases = [
    {
      key: 'login',
      label: 'POST /auth/login — Test with dummy credentials (expect 401, not 404)',
      fn: () => loginUser({ email: 'test@example.com', password: 'testpass123' }),
    },
    {
      key: 'register',
      label: 'POST /auth/register — Test endpoint availability (expect 400/409, not 404)',
      fn: () => registerUser({ name: 'Test', email: 'probe@test.com', password: 'probe12345' }),
    },
    {
      key: 'conflicts',
      label: 'GET /conflicts — Fetch first page of conflicts',
      fn: () => getConflicts({ page: 1, limit: 3 }),
    },
    {
      key: 'search',
      label: 'GET /conflicts/search?keyword=ukraine',
      fn: () => searchConflicts('ukraine'),
    },
    {
      key: 'stats',
      label: 'GET /conflicts/stats/overview',
      fn: () => getStatsOverview(),
    },
    {
      key: 'analytics',
      label: 'GET /conflicts/analytics/region-distribution',
      fn: () => getRegionDistribution(),
    },
  ];

  const runAll = async () => {
    for (const tc of testCases) {
      await run(tc.key, tc.fn);
    }
  };

  const allDone = testCases.every(tc => tests[tc.key].status !== 'idle' && tests[tc.key].status !== 'loading');
  const allOk = testCases.every(tc => tests[tc.key].status === 'ok');

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          Developer Tool
        </div>
        <h1 className="text-3xl font-black text-ink-50 tracking-tight">API Integration Test</h1>
        <p className="text-muted text-sm mt-2">Verify that the frontend can reach every backend endpoint.</p>
      </div>

      {/* Base URL info */}
      <div className="mb-6 p-4 bg-card border border-border rounded flex items-start gap-3">
        <svg className="text-accent-500 flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div>
          <div className="text-xs text-ink-400 mb-1">Base URL in use:</div>
          <code className="text-xs font-mono text-accent-300 break-all">{BASE_URL}</code>
        </div>
      </div>

      {/* Run All button */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted">{testCases.length} tests available</span>
        <div className="flex items-center gap-3">
          {allDone && (
            <span className={`text-xs font-semibold ${allOk ? 'text-green-400' : 'text-crimson-400'}`}>
              {allOk ? '✓ All endpoints reachable' : '✗ Some endpoints failed — check errors below'}
            </span>
          )}
          <button
            onClick={runAll}
            className="clip-corner-sm text-sm font-semibold bg-accent-500 hover:bg-accent-400 text-white px-5 py-2 transition-all hover:shadow-glow-accent"
          >
            Run All Tests
          </button>
        </div>
      </div>

      {/* Test blocks */}
      <div className="flex flex-col gap-3">
        {testCases.map(tc => (
          <TestBlock
            key={tc.key}
            label={tc.label}
            status={tests[tc.key].status}
            result={tests[tc.key].result}
            onRun={() => run(tc.key, tc.fn)}
          />
        ))}
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-ink-950/60 border border-dashed border-border rounded text-xs text-ink-500 leading-relaxed">
        <strong className="text-ink-400">Note:</strong> Login and Register tests intentionally use dummy credentials.
        A <code className="text-accent-400">401</code> or <code className="text-accent-400">400</code>/<code className="text-accent-400">409</code> response confirms the endpoint is reachable and the route is correct.
        A <code className="text-crimson-400">404</code> means the URL is wrong or the backend is not running.
      </div>
    </div>
  );
};

export default ApiTest;
