import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const getLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
        : 'text-neutral-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <NavLink to="/" className="text-2xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 hover:opacity-80 transition-opacity">
            WarLens
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex flex-wrap items-center space-x-2">
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
        </nav>
        
        {/* Auth Links */}
        <div className="flex items-center space-x-3">
          <NavLink to="/login" className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            Login
          </NavLink>
          <NavLink to="/register" className="px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-500 shadow-lg shadow-primary-500/25 transition-all active:scale-95">
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
