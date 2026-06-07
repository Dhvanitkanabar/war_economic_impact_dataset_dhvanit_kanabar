import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-800 bg-surface py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-2">
            WarLens
          </Link>
          <p className="text-neutral-400 text-sm max-w-sm">
            Tracking and analyzing the economic impact of global conflicts through data-driven insights.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link to="/" className="text-neutral-400 hover:text-primary-400 transition-colors">Home</Link>
          <Link to="/conflicts" className="text-neutral-400 hover:text-primary-400 transition-colors">Conflicts</Link>
          <Link to="/statistics" className="text-neutral-400 hover:text-primary-400 transition-colors">Statistics</Link>
          <Link to="/analytics" className="text-neutral-400 hover:text-primary-400 transition-colors">Analytics</Link>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-neutral-800/50 text-center text-xs text-neutral-500">
        &copy; {currentYear} WarLens. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
