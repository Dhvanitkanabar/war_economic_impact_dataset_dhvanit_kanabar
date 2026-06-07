import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-neutral-100">
      <h1 className="text-5xl font-extrabold text-error mb-4">
        404
      </h1>
      <p className="text-neutral-400 text-lg">Page not found.</p>
    </div>
  );
};

export default NotFound;
