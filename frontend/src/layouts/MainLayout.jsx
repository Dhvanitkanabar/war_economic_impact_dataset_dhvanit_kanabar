import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col">
      <Navbar />

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
