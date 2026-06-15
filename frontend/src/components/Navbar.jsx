import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { logoutUser } from '../services/authService';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      await logoutUser(); // call backend logout (best-effort)
    } catch {
      // ignore — we always clear local state
    }
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-200 px-1 py-0.5
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:transition-all after:duration-300
    ${isActive
      ? 'text-accent-400 after:w-full after:bg-accent-500'
      : 'text-ink-400 hover:text-ink-100 after:w-0 hover:after:w-full after:bg-accent-500'
    }`;

  const initials = (user?.name || user?.email || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-60" />

      <nav className="glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-8 h-8 clip-corner-sm bg-accent-500 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-ink-50 tracking-tight group-hover:text-white transition-colors">
              War<span className="text-gradient-accent">Lens</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/conflicts" className={navLinkClass}>Conflicts</NavLink>
                <NavLink to="/statistics" className={navLinkClass}>Statistics</NavLink>
                <NavLink to="/analytics" className={navLinkClass}>Analytics</NavLink>
                {user?.role === 'admin' && (
                  <NavLink to="/admin/conflicts/create" className={navLinkClass}>Admin Panel</NavLink>
                )}
                <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
              </>
            )}
          </div>

          {/* Auth section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isAuthenticated ? (
              /* ── User dropdown ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 clip-corner-sm bg-accent-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 group-hover:bg-accent-500 transition-colors">
                    {initials}
                  </div>
                  <span className="hidden sm:block text-sm text-ink-300 group-hover:text-ink-100 transition-colors max-w-[120px] truncate">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`text-ink-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded shadow-card overflow-hidden z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-border bg-ink-950/60">
                      <p className="text-xs text-muted truncate">{user?.email}</p>
                      <p className="text-sm font-semibold text-ink-100 mt-0.5 truncate">{user?.name || 'User'}</p>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-300 hover:text-white hover:bg-ink-900/60 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        to="/conflicts"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-300 hover:text-white hover:bg-ink-900/60 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        Conflicts
                      </Link>
                      <Link
                        to="/analytics"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-300 hover:text-white hover:bg-ink-900/60 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                          <line x1="6" y1="20" x2="6" y2="14"/>
                        </svg>
                        Analytics
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-300 hover:text-white hover:bg-ink-900/60 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        Profile
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin/conflicts/create"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-300 hover:text-white hover:bg-ink-900/60 transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                          Admin Panel
                        </Link>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-crimson-400 hover:text-crimson-300 hover:bg-crimson-600/10 transition-colors text-left"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16 17 21 12 16 7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Guest buttons ── */
              <>
                <NavLink to="/login" className="text-sm font-medium text-ink-300 hover:text-white transition-colors px-3 py-1.5">
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="clip-corner-sm text-sm font-semibold bg-accent-500 hover:bg-accent-400 text-white px-4 py-1.5 transition-all duration-200 hover:shadow-glow-accent"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
