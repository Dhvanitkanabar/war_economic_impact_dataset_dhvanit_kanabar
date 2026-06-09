import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Conflicts from './pages/Conflicts.jsx';
import Statistics from './pages/Statistics.jsx';
import Analytics from './pages/Analytics.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import ApiTest from './pages/ApiTest.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="conflicts" element={<Conflicts />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="api-test" element={<ApiTest />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
