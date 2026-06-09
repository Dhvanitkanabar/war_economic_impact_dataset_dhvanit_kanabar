import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-200 px-1 py-0.5
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:transition-all after:duration-300
    ${isActive
      ? 'text-accent-400 after:w-full after:bg-accent-500'
      : 'text-ink-400 hover:text-ink-100 after:w-0 hover:after:w-full after:bg-accent-500'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-60" />
      
      <nav className="glass border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* Icon */}
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
            <NavLink to="/conflicts" className={navLinkClass}>Conflicts</NavLink>
            <NavLink to="/statistics" className={navLinkClass}>Statistics</NavLink>
            <NavLink to="/analytics" className={navLinkClass}>Analytics</NavLink>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-ink-400">
                  {user?.name || user?.email}
                </span>
                <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center text-white text-xs font-bold">
                  {(user?.name || user?.email || 'U')[0].toUpperCase()}
                </div>
              </div>
            ) : (
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
