import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-crimson-600/20 flex items-center justify-center mb-6 text-crimson-400">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h1 className="text-4xl font-black text-ink-50 tracking-tight mb-4">Access denied</h1>
      <p className="text-muted text-lg mb-8 max-w-md mx-auto">
        Administrator privileges required. You do not have permission to view this page.
      </p>
      <Link 
        to="/dashboard" 
        className="clip-corner-sm text-sm font-semibold bg-accent-500 hover:bg-accent-400 text-white px-6 py-3 transition-all hover:shadow-glow-accent"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
