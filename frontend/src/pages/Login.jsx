import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../services/authService';
import { setCredentials, setLoading, setError, clearError } from '../features/auth/authSlice';
import FormInput from '../components/forms/FormInput';
import SubmitButton from '../components/forms/SubmitButton';

import toast from 'react-hot-toast';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    dispatch(clearError());
    dispatch(setLoading(true));
    try {
      const data = await loginUser({ email: values.email, password: values.password });
      if (data.token) localStorage.setItem('token', data.token);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success('Login successful');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed';
      dispatch(setError(errMsg));
      if (err.response?.status === 400 || err.response?.status === 401) {
        toast.error('Invalid credentials');
      } else {
        toast.error(errMsg);
      }
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
            Secure Access
          </div>
          <h1 className="text-3xl font-black text-ink-50 tracking-tight">Sign in to WarLens</h1>
          <p className="text-muted text-sm mt-2">Access real-time economic conflict analysis</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded shadow-card overflow-hidden">
          {/* Accent top bar */}
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

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-5">
                  <FormInput
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    prefix={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    }
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    prefix={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    }
                  />

                  <div className="pt-2">
                    <SubmitButton isLoading={isLoading} loadingText="Logging in..." className="w-full">
                      Sign In
                    </SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="px-6 md:px-8 py-4 bg-ink-950/40 border-t border-border text-center">
            <p className="text-xs text-muted">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-accent-400 hover:text-accent-300 font-medium transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {['256-bit encrypted', 'No spam, ever', 'Cancel anytime'].map(label => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-ink-600">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-600">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
