import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/authService';
import { setCredentials, setLoading, setError, clearError } from '../features/auth/authSlice';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Already logged in
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }
    if (password.length < 6) {
      dispatch(setError('Password must be at least 6 characters'));
      return;
    }

    dispatch(setLoading(true));
    try {
      const data = await registerUser({ name, email, password });
      if (data.token) localStorage.setItem('token', data.token);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message || 'Registration failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-400 uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
            Free Account
          </div>
          <h1 className="text-3xl font-black text-ink-50 tracking-tight">Join WarLens</h1>
          <p className="text-muted text-sm mt-2">Start analyzing economic conflict data instantly</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded shadow-card overflow-hidden">
          <div className="h-0.5 bg-gradient-to-r from-accent-600 via-accent-400 to-transparent" />

          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-3 rounded border border-crimson-600/30 bg-crimson-600/10 flex items-start gap-2.5 text-sm text-crimson-400">
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                required
                prefix={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                }
              />
              <Input
                label="Email address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                prefix={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                }
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                required
                hint="At least 6 characters"
                prefix={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                }
              />
              <Input
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                prefix={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                }
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </Button>
              </div>
            </form>
          </div>

          <div className="px-6 md:px-8 py-4 bg-ink-950/40 border-t border-border text-center">
            <p className="text-xs text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-ink-700 mt-5 leading-relaxed">
          By creating an account, you agree to our{' '}
          <span className="text-ink-500 cursor-pointer hover:text-ink-300 transition-colors">Terms of Service</span>
          {' '}and{' '}
          <span className="text-ink-500 cursor-pointer hover:text-ink-300 transition-colors">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Register;
