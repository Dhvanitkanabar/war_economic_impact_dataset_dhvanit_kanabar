import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-background/40 backdrop-blur-md py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Branding & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-3 hover:opacity-80 transition-opacity">
            WarLens
          </Link>
          <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
            Tracking and analyzing the economic impact of global conflicts through data-driven insights and modern visualization.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link>
          <Link to="/conflicts" className="text-neutral-400 hover:text-white transition-colors">Conflicts</Link>
          <Link to="/statistics" className="text-neutral-400 hover:text-white transition-colors">Statistics</Link>
          <Link to="/analytics" className="text-neutral-400 hover:text-white transition-colors">Analytics</Link>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 text-center text-sm text-neutral-500">
        &copy; {currentYear} WarLens. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
