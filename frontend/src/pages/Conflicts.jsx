import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getConflicts, deleteConflict } from '../services/conflictService';
import { searchConflicts } from '../services/searchService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isActive = (status) => {
  const s = status?.toLowerCase() ?? '';
  return s === 'active' || s === 'ongoing';
};

const StatusBadge = ({ status }) => (
  <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
    isActive(status)
      ? 'bg-crimson-600/15 text-crimson-400 border border-crimson-600/30'
      : 'bg-ink-800 text-ink-500 border border-border'
  }`}>
    {status || 'Unknown'}
  </span>
);

// Normalise a raw conflict object to a display-friendly shape
// Handles multiple possible backend field names defensively.
const normalise = (c) => ({
  id:            c._id ?? c.id ?? Math.random(),
  name:          c.conflictName ?? c.name ?? c.title ?? '—',
  region:        c.region ?? '—',
  country:       c.primaryCountry ?? c.country ?? c.location ?? '—',
  status:        c.status ?? '—',
  gdpImpact:     c.gdpPerCapitaChange ?? c.gdpImpact ?? c.gdpChange ?? null,
  inflationRate: c.inflationRate ?? c.inflation ?? null,
  warCost:       c.warCost ?? c.estimatedWarCost ?? null,
});

// Format numeric values for display
const fmtGDP = (v) => {
  if (v == null) return '—';
  const n = Number(v);
  return `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
};

const fmtCost = (v) => {
  if (v == null) return '—';
  const n = Number(v);
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};

const fmtInflation = (v) => {
  if (v == null) return '—';
  return `${Number(v).toFixed(1)}%`;
};

// ─── Row ──────────────────────────────────────────────────────────────────────

const ConflictRow = ({ c, isAdmin }) => (
  <tr className="border-b border-border/60 last:border-0 hover:bg-ink-950/40 transition-colors">
    <td className="px-5 py-3.5">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          isActive(c.status)
            ? 'bg-crimson-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]'
            : 'bg-ink-600'
        }`} />
        <span className="text-sm text-ink-100 font-medium">{c.name}</span>
      </div>
    </td>
    <td className="px-5 py-3.5 text-sm text-muted">{c.region}</td>
    <td className="px-5 py-3.5 text-sm text-muted">{c.country}</td>
    <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
    <td className="px-5 py-3.5 text-right text-sm font-mono font-semibold text-accent-400">{fmtGDP(c.gdpImpact)}</td>
    <td className="px-5 py-3.5 text-right text-sm font-mono text-ink-300">{fmtInflation(c.inflationRate)}</td>
    <td className="px-5 py-3.5 text-right text-sm font-mono text-ink-300">{fmtCost(c.warCost)}</td>
    {isAdmin && (
      <td className="px-5 py-3.5 text-right">
        <div className="flex items-center justify-end gap-3">
          <Link to={`/admin/conflicts/edit/${c.id}`} className="text-xs font-medium text-ink-400 hover:text-accent-400 transition-colors">Edit</Link>
          <Link to={`/admin/conflicts/replace/${c.id}`} className="text-xs font-medium text-ink-400 hover:text-accent-400 transition-colors">Replace</Link>
          <button 
            onClick={() => window.confirm('Are you sure you want to delete this conflict?') && onDelete(c.id)} 
            disabled={c.isDeleting}
            className="text-xs font-medium text-ink-400 hover:text-crimson-400 disabled:opacity-50 transition-colors"
          >
            {c.isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </td>
    )}
  </tr>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonRows = ({ isAdmin }) => (
  <>
    {[...Array(6)].map((_, i) => (
      <tr key={i} className="border-b border-border/60">
        {[...Array(isAdmin ? 8 : 7)].map((__, j) => (
          <td key={j} className="px-5 py-3.5">
            <div className="h-4 bg-ink-800/60 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
          </td>
        ))}
      </tr>
    ))}
  </>
);

// ─── Pagination ───────────────────────────────────────────────────────────────

const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-border">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="text-xs font-medium text-ink-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Previous
      </button>
      <span className="text-xs text-muted font-mono">
        Page <span className="text-accent-400 font-semibold">{page}</span> of <span className="text-ink-300">{totalPages}</span>
      </span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="text-xs font-medium text-ink-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
      >
        Next
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const LIMIT = 10;
const HEADERS = ['Conflict', 'Region', 'Country', 'Status', 'GDP Δ', 'Inflation', 'War Cost'];

const Conflicts = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  const [conflicts,   setConflicts]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const [totalCount,  setTotalCount]  = useState(0);

  // Search & Filtering State (initialised from sessionStorage if enabled)
  const [searchInput, setSearchInput] = useState(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    return preserve === 'enabled' ? sessionStorage.getItem('conflictSearchInput') || '' : '';
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    return preserve === 'enabled' ? sessionStorage.getItem('conflictSearchQuery') || '' : '';
  });
  const [isSearchMode, setIsSearchMode] = useState(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    return preserve === 'enabled' && sessionStorage.getItem('conflictSearchQuery') ? true : false;
  });

  // ── Fetch normal list ────────────────────────────────────────────────────────
  const fetchConflicts = useCallback(async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getConflicts({ page: p, limit: LIMIT });
      // Handle multiple response shapes: { data, totalPages, total } or { conflicts, ... } or plain array
      const list       = Array.isArray(data) ? data : (data?.data ?? data?.conflicts ?? data?.results ?? []);
      const pages      = data?.totalPages ?? data?.pages ?? (data?.total ? Math.ceil(data.total / LIMIT) : 1);
      const total      = data?.total ?? data?.totalCount ?? list.length;
      setConflicts(list.map(normalise));
      setTotalPages(pages);
      setTotalCount(total);
      setPage(p);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load conflicts.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch search results ─────────────────────────────────────────────────────
  const fetchSearch = useCallback(async (keyword) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchConflicts(keyword);
      const list = Array.isArray(data) ? data : (data?.data ?? data?.conflicts ?? data?.results ?? []);
      setConflicts(list.map(normalise));
      setTotalPages(1);
      setTotalCount(list.length);
      setPage(1);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Search failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { fetchConflicts(1); }, [fetchConflicts]);

  // Run search / revert whenever searchQuery changes
  useEffect(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    if (preserve === 'enabled') {
      sessionStorage.setItem('conflictSearchInput', searchInput);
    } else {
      sessionStorage.removeItem('conflictSearchInput');
    }
  }, [searchInput]);

  useEffect(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    if (preserve === 'enabled') {
      sessionStorage.setItem('conflictSearchQuery', searchQuery);
    } else {
      sessionStorage.removeItem('conflictSearchQuery');
    }

    if (searchQuery.trim()) {
      setIsSearchMode(true);
      fetchSearch(searchQuery.trim());
    } else {
      setIsSearchMode(false);
      fetchConflicts(1);
    }
  }, [searchQuery, fetchSearch, fetchConflicts]);

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    // Optimistically mark as deleting to show loading state
    setConflicts((prev) => prev.map((c) => c.id === id ? { ...c, isDeleting: true } : c));
    setError(null);
    try {
      await deleteConflict(id);
      // Refresh list
      if (isSearchMode) {
        fetchSearch(searchQuery);
      } else {
        fetchConflicts(page);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete conflict.');
      // Revert deleting state
      setConflicts((prev) => prev.map((c) => c.id === id ? { ...c, isDeleting: false } : c));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleSearchClear = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  const handlePrev = () => { if (page > 1) fetchConflicts(page - 1); };
  const handleNext = () => { if (page < totalPages) fetchConflicts(page + 1); };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          Conflict Database
        </div>
        <h1 className="text-4xl font-black text-ink-50 tracking-tight">Global Conflicts</h1>
        <p className="text-muted mt-2 text-sm">Live economic impact data for all tracked conflicts.</p>
      </div>

      {/* Search + count bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Search form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search conflicts, regions, countries…"
              className="w-full pl-9 pr-9 py-2.5 bg-card border border-border rounded text-sm text-ink-100 placeholder:text-ink-600 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="clip-corner-sm text-xs font-semibold bg-accent-500 hover:bg-accent-400 text-white px-4 py-2.5 transition-all hover:shadow-glow-accent flex-shrink-0"
          >
            Search
          </button>
          {isAdmin && (
            <Link
              to="/admin/conflicts/create"
              className="clip-corner-sm text-xs font-semibold bg-ink-800 hover:bg-ink-700 text-white px-4 py-2.5 transition-all flex-shrink-0 border border-border"
            >
              + Create Conflict
            </Link>
          )}
        </form>

        {/* Count / mode indicator */}
        <div className="text-xs text-ink-500 font-mono flex-shrink-0">
          {loading ? (
            <span className="animate-pulse">Loading…</span>
          ) : isSearchMode ? (
            <span>
              <span className="text-accent-400">{totalCount}</span> result{totalCount !== 1 ? 's' : ''} for{' '}
              <span className="text-ink-300">"{searchQuery}"</span>
              {' — '}
              <button onClick={handleSearchClear} className="text-accent-400 hover:text-accent-300 transition-colors">
                Clear
              </button>
            </span>
          ) : (
            <span><span className="text-ink-300">{totalCount}</span> conflicts tracked</span>
          )}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-crimson-600/10 border border-crimson-600/30 rounded flex items-start gap-3 text-sm text-crimson-400">
          <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
          <button onClick={() => isSearchMode ? fetchSearch(searchQuery) : fetchConflicts(page)} className="ml-auto text-xs underline hover:no-underline flex-shrink-0">
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-ink-950/60">
                {HEADERS.map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider ${
                      ['GDP Δ', 'Inflation', 'War Cost'].includes(h) ? 'text-right' : 'text-left'
                    }`}
                  >
                    {h}
                  </th>
                ))}
                {isAdmin && (
                  <th className="px-5 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows isAdmin={isAdmin} />
              ) : conflicts.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 8 : 7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <p className="text-muted text-sm">
                        {isSearchMode ? `No conflicts found for "${searchQuery}".` : 'No conflict data available.'}
                      </p>
                      {isSearchMode && (
                        <button onClick={handleSearchClear} className="text-xs text-accent-400 hover:text-accent-300 transition-colors">
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                conflicts.map((c) => <ConflictRow key={c.id} c={c} isAdmin={isAdmin} onDelete={handleDelete} />)
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && !isSearchMode && (
          <Pagination page={page} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
        )}
      </div>
    </div>
  );
};

export default Conflicts;
