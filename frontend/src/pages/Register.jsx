import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../services/authService';
import { setCredentials, setLoading, setError, clearError } from '../features/auth/authSlice';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }

    dispatch(setLoading(true));
    try {
      const data = await registerUser({ name, email, password });
      const token = data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 w-full py-12">
      <div className="w-full max-w-md">
        <Card 
          title="Create Your WarLens Account" 
          subtitle="Join us to explore the economic impact of conflicts worldwide."
        >
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
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
              placeholder="Create a password"
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Register'}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-white transition-colors font-medium">
              Login here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
