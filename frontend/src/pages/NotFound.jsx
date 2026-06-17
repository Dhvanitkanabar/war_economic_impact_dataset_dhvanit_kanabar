import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-8xl font-black text-gradient-accent mb-4 leading-none">404</div>
      <h1 className="text-2xl font-bold text-ink-100 mb-2">Mission Not Found</h1>
      <p className="text-muted text-sm max-w-sm mb-8">The page you&apos;re looking for has been redacted, moved, or never existed.</p>
      <Link to="/" className="clip-corner-sm text-sm font-semibold bg-accent-500 hover:bg-accent-400 text-white px-6 py-2.5 transition-all duration-200 hover:shadow-glow-accent">
        Return to Base →
      </Link>
    </div>
  );
};

export default NotFound;
