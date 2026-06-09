import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col relative overflow-hidden">
      {/* Decorative Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
