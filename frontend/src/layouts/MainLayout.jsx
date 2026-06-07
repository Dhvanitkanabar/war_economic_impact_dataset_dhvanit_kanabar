import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
