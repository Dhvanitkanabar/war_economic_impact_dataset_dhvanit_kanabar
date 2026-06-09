import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Conflicts', to: '/conflicts' },
    { label: 'Statistics', to: '/statistics' },
    { label: 'Analytics', to: '/analytics' },
  ];

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 clip-corner-sm bg-accent-500 flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <span className="font-bold text-ink-100">
                War<span className="text-gradient-accent">Lens</span>
              </span>
            </Link>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              Data-driven intelligence on the economic impact of global armed conflicts. Real-time analysis. Historical context.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `text-sm transition-colors ${isActive ? 'text-accent-400' : 'text-muted hover:text-ink-100'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-widest mb-4">System</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                All systems operational
              </div>
              <div className="text-xs text-ink-600">Data updated continuously</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-600">&copy; {year} WarLens. All rights reserved.</p>
          <p className="text-xs text-ink-700 font-mono">v2.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
