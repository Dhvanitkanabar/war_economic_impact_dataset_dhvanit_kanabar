import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [rememberSession, setRememberSession] = useState(() => localStorage.getItem('rememberSession') || 'enabled');
  const [preserveFilters, setPreserveFilters] = useState(() => {
    return sessionStorage.getItem('preserveFilters') || 'enabled';
  });

  // Apply theme change
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.style.backgroundColor = '#f6f7f9';
      document.body.style.color = '#0b0e14';
    } else {
      document.body.classList.remove('light-theme');
      document.body.style.backgroundColor = '#0b0e14';
      document.body.style.color = '#eceef2';
    }
  }, [theme]);

  // Apply session preference
  useEffect(() => {
    localStorage.setItem('rememberSession', rememberSession);
  }, [rememberSession]);

  // Apply filter preference
  useEffect(() => {
    sessionStorage.setItem('preserveFilters', preserveFilters);
  }, [preserveFilters]);

  const handleSave = () => {
    toast.success('Settings saved');
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ink-50">Settings</h1>
        <p className="text-muted mt-2 text-sm">Configure your application preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-card border border-border rounded p-6 shadow-card">
          <h2 className="text-xl font-bold text-ink-100 mb-4 pb-2 border-b border-border">Appearance Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink-300 mb-2">Theme Preference</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer text-white">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={() => setTheme('dark')}
                    className="accent-accent-500"
                  />
                  Dark Mode
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer text-white">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={theme === 'light'}
                    onChange={() => setTheme('light')}
                    className="accent-accent-500"
                  />
                  Light Mode
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Session Settings */}
        <div className="bg-card border border-border rounded p-6 shadow-card">
          <h2 className="text-xl font-bold text-ink-100 mb-4 pb-2 border-b border-border">Session Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink-300 mb-2">Remember Session</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer text-white">
                  <input
                    type="radio"
                    name="rememberSession"
                    value="enabled"
                    checked={rememberSession === 'enabled'}
                    onChange={() => setRememberSession('enabled')}
                    className="accent-accent-500"
                  />
                  Enabled
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer text-white">
                  <input
                    type="radio"
                    name="rememberSession"
                    value="disabled"
                    checked={rememberSession === 'disabled'}
                    onChange={() => setRememberSession('disabled')}
                    className="accent-accent-500"
                  />
                  Disabled
                </label>
              </div>
              <p className="text-xs text-muted mt-1">If enabled, you will stay logged in across browser restarts.</p>
            </div>
          </div>
        </div>

        {/* Temporary Filter Storage Settings */}
        <div className="bg-card border border-border rounded p-6 shadow-card">
          <h2 className="text-xl font-bold text-ink-100 mb-4 pb-2 border-b border-border">Filter Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink-300 mb-2">Temporary Filter Storage (sessionStorage)</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer text-white">
                  <input
                    type="radio"
                    name="preserveFilters"
                    value="enabled"
                    checked={preserveFilters === 'enabled'}
                    onChange={() => setPreserveFilters('enabled')}
                    className="accent-accent-500"
                  />
                  Preserve Filters (Session)
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer text-white">
                  <input
                    type="radio"
                    name="preserveFilters"
                    value="disabled"
                    checked={preserveFilters === 'disabled'}
                    onChange={() => setPreserveFilters('disabled')}
                    className="accent-accent-500"
                  />
                  Clear Filters on Reload
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="clip-corner-sm text-xs font-semibold bg-accent-500 hover:bg-accent-400 text-white px-6 py-2.5 transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
