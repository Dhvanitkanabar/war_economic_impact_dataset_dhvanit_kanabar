import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import ApiTest from './pages/ApiTest.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import AdminRoute from './components/auth/AdminRoute.jsx';
import GuestRoute from './components/auth/GuestRoute.jsx';

// Lazy loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Conflicts = lazy(() => import('./pages/Conflicts.jsx'));
const Statistics = lazy(() => import('./pages/Statistics.jsx'));
const Analytics = lazy(() => import('./pages/Analytics.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'));
const CreateConflict = lazy(() => import('./pages/admin/CreateConflict.jsx'));
const EditConflict = lazy(() => import('./pages/admin/EditConflict.jsx'));
const ReplaceConflict = lazy(() => import('./pages/admin/ReplaceConflict.jsx'));

const LoadingPage = () => (
  <div className="flex-1 w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent-500"></div>
    <p className="text-sm font-mono text-ink-300 animate-pulse">Loading page...</p>
  </div>
);

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
      <Suspense fallback={<LoadingPage />}>
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
    </Suspense>
    </>
  );
}

export default App;
