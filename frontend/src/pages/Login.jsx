import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/authService';
import { setCredentials, setLoading, setError, clearError } from '../features/auth/authSlice';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(setLoading(true));
    try {
      const data = await loginUser({ email, password });
      // Depending on the API response structure, adjust this if needed
      // Assuming it returns { user, token }
      const token = data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/');
    } catch (err) {
      // Assuming error message is in err.response.data.message or err.message
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-neutral-100">
      <div className="w-full max-w-md">
        <Card 
          title="Login to WarLens" 
          subtitle="Welcome back! Please sign in to your account."
        >
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-neutral-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 transition-colors">
              Register here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
