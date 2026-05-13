import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          WarLens
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Global War Economic Impact Analysis Platform. Start analyzing the socio-economic transformations caused by conflicts.
        </p>
      </header>
      
      <main className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer">
          <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
          <p className="text-slate-500 text-sm">Visualize GDP loss and inflation spikes across global conflicts.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer">
          <h3 className="text-xl font-bold mb-2">Conflict Explorer</h3>
          <p className="text-slate-500 text-sm">Filter through historical data and reconstruction cost estimates.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer">
          <h3 className="text-xl font-bold mb-2">Predictive Modeling</h3>
          <p className="text-slate-500 text-sm">AI-driven analysis of future economic recovery timelines.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
