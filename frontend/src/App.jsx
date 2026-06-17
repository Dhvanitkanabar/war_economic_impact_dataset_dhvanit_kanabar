import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Conflicts from './pages/Conflicts.jsx';
import Statistics from './pages/Statistics.jsx';
import Analytics from './pages/Analytics.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import ApiTest from './pages/ApiTest.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminRoute from './components/auth/AdminRoute.jsx';
import GuestRoute from './components/auth/GuestRoute.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import CreateConflict from './pages/admin/CreateConflict.jsx';
import EditConflict from './pages/admin/EditConflict.jsx';
import ReplaceConflict from './pages/admin/ReplaceConflict.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      document.body.classList.remove('light-theme');
      document.body.style.backgroundColor = '#0b0e14';
      document.body.style.color = '#eceef2';
    }
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1c212c',
            color: '#eceef2',
            border: '1px solid #2e3545',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#1c212c',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1c212c',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="api-test" element={<ApiTest />} />

        {/* Protected routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="conflicts"
          element={
            <ProtectedRoute>
              <Conflicts />
            </ProtectedRoute>
          }
        />
        <Route
          path="statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="search"
          element={
            <ProtectedRoute>
              <Conflicts />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="admin/conflicts/create"
          element={
            <AdminRoute>
              <CreateConflict />
            </AdminRoute>
          }
        />
        <Route
          path="admin/conflicts/edit/:id"
          element={
            <AdminRoute>
              <EditConflict />
            </AdminRoute>
          }
        />
        <Route
          path="admin/conflicts/replace/:id"
          element={
            <AdminRoute>
              <ReplaceConflict />
            </AdminRoute>
          }
        />

        {/* Access denied page */}
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
