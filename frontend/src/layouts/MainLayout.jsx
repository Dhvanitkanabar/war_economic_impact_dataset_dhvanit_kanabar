import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function MainLayout() {
  return (
    <div className="app-container">
      <header className="header">
        <Navbar />
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            WarLens <span>Economic Analytics</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} WarLens. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
