import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getConflicts, deleteConflict } from '../services/conflictService';

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

const normalise = (c) => ({
  id:            c._id ?? c.id ?? Math.random(),
  name:          c.conflictName ?? c.name ?? c.title ?? '—',
  region:        c.region ?? '—',
  country:       c.primaryCountry ?? c.country ?? c.location ?? '—',
  status:        c.status ?? '—',
  gdpImpact:     c.gdpPerCapitaChange ?? c.gdpImpact ?? c.gdpChange ?? null,
  inflationRate: c.inflationRate ?? c.inflation ?? null,
  warCost:       c.warCost ?? c.estimatedWarCost ?? null,
  reconstructionCost: c.reconstructionCost ?? null,
  startYear:     c.startYear ?? null,
});

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

const ConflictRow = ({ c, isAdmin, onDelete }) => (
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


// ─── Pagination ───────────────────────────────────────────────────────────────

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-ink-950/20">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="text-xs font-medium text-ink-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Previous
      </button>
      
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-2.5 py-1 text-xs font-mono rounded ${
              p === page
                ? 'bg-accent-500 text-white font-bold'
                : 'text-ink-400 hover:text-white hover:bg-ink-800'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
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
const HEADERS = [
  { label: 'Conflict', value: 'conflictName' },
  { label: 'Region', value: 'region' },
  { label: 'Country', value: 'primaryCountry' },
  { label: 'Status', value: 'status' },
  { label: 'GDP Δ', value: 'gdpPerCapitaChange' },
  { label: 'Inflation', value: 'inflationRate' },
  { label: 'War Cost', value: 'warCost' }
];

const DEFAULT_FILTERS = {
  region: '',
  conflictType: '',
  primaryCountry: '',
  status: '',
  minInflation: '',
  maxInflation: '',
  minGDP: '',
  maxGDP: '',
  minWarCost: '',
  maxWarCost: '',
  minReconstructionCost: '',
  maxReconstructionCost: '',
  startYear: '',
  endYear: '',
  blackMarketActivityLevel: '',
  mostAffectedSector: '',
  warProfiteeringDocumented: ''
};

const Conflicts = () => {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';

  const [conflicts, setConflicts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState('Loading conflicts...');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Sorting State
  const [sortField, setSortField] = useState(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    return preserve === 'enabled' ? sessionStorage.getItem('conflictSortField') || 'conflictName' : 'conflictName';
  });
  const [sortOrder, setSortOrder] = useState(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    return preserve === 'enabled' ? sessionStorage.getItem('conflictSortOrder') || 'asc' : 'asc';
  });

  // Filters State
  const [filters, setFilters] = useState(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    if (preserve === 'enabled') {
      const saved = sessionStorage.getItem('conflictFilters');
      return saved ? JSON.parse(saved) : DEFAULT_FILTERS;
    }
    return DEFAULT_FILTERS;
  });

  const [showFilters, setShowFilters] = useState(false);

  // ── Fetch list ────────────────────────────────────────────────────────
  const fetchConflicts = useCallback(async (p = 1, currentFilters = filters, currentSortField = sortField, currentSortOrder = sortOrder) => {
    setLoading(true);
    setError(null);

    // Set correct message depending on trigger
    if (currentSortField !== sortField || currentSortOrder !== sortOrder) {
      setLoadingType('Sorting...');
    } else if (JSON.stringify(currentFilters) !== JSON.stringify(filters)) {
      setLoadingType('Applying filters...');
    } else {
      setLoadingType('Loading conflicts...');
    }

    try {
      const queryParams = {
        page: p,
        limit: LIMIT,
        sort: `${currentSortOrder === 'desc' ? '-' : ''}${currentSortField}`
      };

      // Clean filter params before passing to backend
      Object.keys(currentFilters).forEach((key) => {
        const val = currentFilters[key];
        if (val !== '') {
          if (key === 'warProfiteeringDocumented') {
            queryParams[key] = val === 'Yes' ? 'true' : 'false';
          } else {
            queryParams[key] = val;
          }
        }
      });

      const data = await getConflicts(queryParams);
      const list = Array.isArray(data) ? data : (data?.data ?? data?.conflicts ?? data?.results ?? []);
      const pages = data?.totalPages ?? data?.pages ?? (data?.total ? Math.ceil(data.total / LIMIT) : 1);
      const total = data?.total ?? data?.totalCount ?? list.length;

      setConflicts(list.map(normalise));
      setTotalPages(pages);
      setTotalCount(total);
      setPage(p);
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load conflicts.');
    } finally {
      setLoading(false);
    }
  }, [filters, sortField, sortOrder]);

  // Initial load & State persistence
  useEffect(() => {
    const preserve = sessionStorage.getItem('preserveFilters') || 'enabled';
    if (preserve === 'enabled') {
      sessionStorage.setItem('conflictFilters', JSON.stringify(filters));
      sessionStorage.setItem('conflictSortField', sortField);
      sessionStorage.setItem('conflictSortOrder', sortOrder);
    } else {
      sessionStorage.removeItem('conflictFilters');
      sessionStorage.removeItem('conflictSortField');
      sessionStorage.removeItem('conflictSortOrder');
    }
    fetchConflicts(page, filters, sortField, sortOrder);
  }, [page, filters, sortField, sortOrder, fetchConflicts]);

  // ── Handlers ──────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (id) => {
    // Warning notification before proceeding with deletion confirmation
    toast('Warning: Deleting a conflict is a permanent action.', {
      icon: '⚠️',
      duration: 4000,
    });

    if (!window.confirm('Are you sure you want to delete this conflict?')) {
      return;
    }

    setConflicts((prev) => prev.map((c) => c.id === id ? { ...c, isDeleting: true } : c));
    setError(null);
    try {
      await deleteConflict(id);
      toast.success('Conflict deleted');
      fetchConflicts(page);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete conflict.');
      setConflicts((prev) => prev.map((c) => c.id === id ? { ...c, isDeleting: false } : c));
    }
  }, [page, fetchConflicts]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Reset to page 1 on filter change
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const handleSort = useCallback((field) => {
    setSortField((currentField) => {
      if (currentField === field) {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        return currentField;
      } else {
        setSortOrder('asc');
        return field;
      }
    });
    setPage(1);
  }, []);

  const handleSortSelectChange = useCallback((e) => {
    const [field, order] = e.target.value.split(':');
    setSortField(field);
    setSortOrder(order);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  }, [totalPages]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
            Conflict Database
          </div>
          <h1 className="text-4xl font-black text-ink-50 tracking-tight">Global Conflicts</h1>
          <p className="text-muted mt-2 text-sm">Live economic impact data for all tracked conflicts.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`clip-corner-sm text-xs font-semibold px-4 py-2.5 transition-all border flex items-center gap-2 ${
              showFilters 
                ? 'bg-accent-500 border-accent-500 text-white' 
                : 'bg-card border-border text-ink-300 hover:text-white'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            {showFilters ? 'Hide Filters' : 'Advanced Filters'}
          </button>
          {isAdmin && (
            <Link
              to="/admin/conflicts/create"
              className="clip-corner-sm text-xs font-semibold bg-accent-500 hover:bg-accent-400 text-white px-4 py-2.5 transition-all hover:shadow-glow-accent flex items-center gap-2"
            >
              + Create Conflict
            </Link>
          )}
        </div>
      </div>

      {/* Sorting & Search Controls Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Sorting Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-ink-500 uppercase tracking-wider">Sort By:</label>
            <select
              value={`${sortField}:${sortOrder}`}
              onChange={handleSortSelectChange}
              className="bg-card border border-border rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-500"
            >
              <option value="conflictName:asc">Conflict Name (A-Z)</option>
              <option value="conflictName:desc">Conflict Name (Z-A)</option>
              <option value="region:asc">Region (A-Z)</option>
              <option value="region:desc">Region (Z-A)</option>
              <option value="startYear:asc">Start Year (Oldest First)</option>
              <option value="startYear:desc">Start Year (Newest First)</option>
              <option value="inflationRate:asc">Inflation Rate (Lowest First)</option>
              <option value="inflationRate:desc">Inflation Rate (Highest First)</option>
              <option value="gdpPerCapitaChange:asc">GDP Change (Lowest First)</option>
              <option value="gdpPerCapitaChange:desc">GDP Change (Highest First)</option>
              <option value="warCost:asc">War Cost (Lowest First)</option>
              <option value="warCost:desc">War Cost (Highest First)</option>
              <option value="reconstructionCost:asc">Reconstruction Cost (Lowest First)</option>
              <option value="reconstructionCost:desc">Reconstruction Cost (Highest First)</option>
            </select>
          </div>
        </div>

        {/* Count / mode indicator */}
        <div className="text-xs text-ink-500 font-mono flex-shrink-0">
          {loading ? (
            <span className="animate-pulse">Loading…</span>
          ) : (
            <span><span className="text-ink-300">{totalCount}</span> conflicts matched</span>
          )}
        </div>
      </div>

      {/* Advanced Filters Drawer */}
      {showFilters && (
        <div className="bg-card border border-border rounded p-6 shadow-card mb-6 transition-all duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
            <h2 className="text-lg font-bold text-white">Filter Parameters</h2>
            <button
              onClick={handleResetFilters}
              className="text-xs text-crimson-400 hover:text-crimson-300 font-semibold underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Region */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Region</label>
              <select
                name="region"
                value={filters.region}
                onChange={handleFilterChange}
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="Americas">Americas</option>
              </select>
            </div>

            {/* Conflict Type */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Conflict Type</label>
              <select
                name="conflictType"
                value={filters.conflictType}
                onChange={handleFilterChange}
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              >
                <option value="">All Types</option>
                <option value="Civil War">Civil War</option>
                <option value="Interstate War">Interstate War</option>
                <option value="Proxy War">Proxy War</option>
                <option value="Hybrid Conflict">Hybrid Conflict</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Country</label>
              <input
                type="text"
                name="primaryCountry"
                value={filters.primaryCountry}
                onChange={handleFilterChange}
                placeholder="e.g. Ukraine"
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Ended">Ended</option>
              </select>
            </div>

            {/* Inflation Range */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Inflation Range (%)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minInflation"
                  value={filters.minInflation}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
                <input
                  type="number"
                  name="maxInflation"
                  value={filters.maxInflation}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* GDP Range */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">GDP Change Range (%)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minGDP"
                  value={filters.minGDP}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
                <input
                  type="number"
                  name="maxGDP"
                  value={filters.maxGDP}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* War Cost Range */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">War Cost Range ($)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minWarCost"
                  value={filters.minWarCost}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
                <input
                  type="number"
                  name="maxWarCost"
                  value={filters.maxWarCost}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* Reconstruction Cost Range */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Recon Cost Range ($)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minReconstructionCost"
                  value={filters.minReconstructionCost}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
                <input
                  type="number"
                  name="maxReconstructionCost"
                  value={filters.maxReconstructionCost}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Year Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="startYear"
                  value={filters.startYear}
                  onChange={handleFilterChange}
                  placeholder="Start"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
                <input
                  type="number"
                  name="endYear"
                  value={filters.endYear}
                  onChange={handleFilterChange}
                  placeholder="End"
                  className="w-1/2 bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            {/* Black Market Activity Level */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Black Market Level</label>
              <select
                name="blackMarketActivityLevel"
                value={filters.blackMarketActivityLevel}
                onChange={handleFilterChange}
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              >
                <option value="">All Levels</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Most Affected Sector */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">Most Affected Sector</label>
              <input
                type="text"
                name="mostAffectedSector"
                value={filters.mostAffectedSector}
                onChange={handleFilterChange}
                placeholder="e.g. Energy"
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              />
            </div>

            {/* War Profiteering Documented */}
            <div>
              <label className="block text-xs font-bold text-ink-300 mb-1.5">War Profiteering</label>
              <select
                name="warProfiteeringDocumented"
                value={filters.warProfiteeringDocumented}
                onChange={handleFilterChange}
                className="w-full bg-ink-950/60 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-500"
              >
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mb-6 p-4 bg-crimson-600/10 border border-crimson-600/30 rounded flex items-start gap-3 text-sm text-crimson-400">
          <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
          <button onClick={() => fetchConflicts(page)} className="ml-auto text-xs underline hover:no-underline flex-shrink-0">
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
                    key={h.value}
                    onClick={() => handleSort(h.value)}
                    className={`px-5 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors ${
                      ['gdpPerCapitaChange', 'inflationRate', 'warCost'].includes(h.value) ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className={`flex items-center gap-1.5 ${['gdpPerCapitaChange', 'inflationRate', 'warCost'].includes(h.value) ? 'justify-end' : 'justify-start'}`}>
                      {h.label}
                      {sortField === h.value ? (
                        sortOrder === 'asc' ? '▲' : '▼'
                      ) : (
                        <span className="opacity-20">⇅</span>
                      )}
                    </div>
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
                <tr>
                  <td colSpan={isAdmin ? 8 : 7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
                      <p className="text-sm text-ink-300 animate-pulse">{loadingType}</p>
                    </div>
                  </td>
                </tr>
              ) : conflicts.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 8 : 7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <p className="text-muted text-sm">
                        No conflicts found matching the selected criteria.
                      </p>
                      <button onClick={handleResetFilters} className="text-xs text-accent-400 hover:text-accent-300 transition-colors">
                        Clear all filters
                      </button>
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
        {!loading && (
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default Conflicts;
