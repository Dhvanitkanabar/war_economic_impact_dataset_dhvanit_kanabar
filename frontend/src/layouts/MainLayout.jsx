import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col">
      {/* Header Placeholder */}
      <header className="w-full border-b border-neutral-800 bg-surface py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-400">WarLens</h2>
          <p className="text-sm text-neutral-400">Header Placeholder</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <Outlet />
      </main>

      {/* Footer Placeholder */}
      <footer className="w-full border-t border-neutral-800 bg-surface py-4 px-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-neutral-500">Footer Placeholder &copy; 2026 WarLens</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
