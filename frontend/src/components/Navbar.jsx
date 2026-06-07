import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-900/50 text-primary-400'
        : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
    }`;

  return (
    <nav className="w-full border-b border-neutral-800 bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <NavLink to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
            WarLens
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center space-x-1">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/conflicts" className={getLinkClass}>
            Conflicts
          </NavLink>
          <NavLink to="/statistics" className={getLinkClass}>
            Statistics
          </NavLink>
          <NavLink to="/analytics" className={getLinkClass}>
            Analytics
          </NavLink>
        </div>
        
        {/* Auth Links */}
        <div className="flex items-center space-x-2">
          <NavLink to="/login" className={getLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={getLinkClass}>
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
