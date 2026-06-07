import React from 'react';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background text-neutral-100 p-6">
      <div className="max-w-md w-full bg-surface border border-neutral-800 rounded-xl shadow-2xl p-8 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
          WarLens
        </h1>
        
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <p className="text-success font-medium flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Theme Setup Complete
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
          <div className="h-10 rounded bg-primary-500 shadow-lg shadow-primary-500/20 flex items-center justify-center text-sm font-semibold">Primary</div>
          <div className="h-10 rounded bg-secondary-500 shadow-lg shadow-secondary-500/20 flex items-center justify-center text-sm font-semibold">Secondary</div>
          <div className="h-10 rounded bg-warning shadow-lg shadow-warning/20 flex items-center justify-center text-sm font-semibold text-black">Warning</div>
          <div className="h-10 rounded bg-error shadow-lg shadow-error/20 flex items-center justify-center text-sm font-semibold">Error</div>
        </div>
      </div>
    </div>
  );
}

export default App;
