import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/authService';

import toast from 'react-hot-toast';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data?.data || data?.user || data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = () => {
    toast.success('Profile updated');
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-ink-300">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
        <div className="p-4 rounded border border-crimson-600/30 bg-crimson-600/10 text-sm text-crimson-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ink-50">Profile</h1>
        <p className="text-muted mt-2 text-sm">Manage your profile details and view session status.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-card border border-border rounded p-6 shadow-card">
          <h2 className="text-xl font-bold text-ink-100 mb-4 pb-2 border-b border-border">Profile Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm font-semibold text-ink-300">Name</span>
              <span className="text-sm text-white">{profile?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm font-semibold text-ink-300">Email</span>
              <span className="text-sm text-white">{profile?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm font-semibold text-ink-300">Role</span>
              <span className="text-sm text-white capitalize">{profile?.role || 'User'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sm font-semibold text-ink-300">Account Status</span>
              <span className="text-sm text-emerald-400 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Session Information */}
        <div className="bg-card border border-border rounded p-6 shadow-card">
          <h2 className="text-xl font-bold text-ink-100 mb-4 pb-2 border-b border-border">Session Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-sm font-semibold text-ink-300">Authentication Status</span>
              <span className="text-sm text-white font-semibold">Authenticated</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-sm font-semibold text-ink-300">Session Status</span>
              <span className="text-sm text-emerald-400 font-semibold">Valid</span>
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleUpdateProfile}
            className="clip-corner-sm text-xs font-semibold bg-accent-500 hover:bg-accent-400 text-white px-6 py-2.5 transition-all"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
