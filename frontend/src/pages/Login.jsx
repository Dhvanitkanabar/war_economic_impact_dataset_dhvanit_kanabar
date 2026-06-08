import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', { email, password });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-neutral-100">
      <div className="w-full max-w-md">
        <Card 
          title="Login to WarLens" 
          subtitle="Welcome back! Please sign in to your account."
        >
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
              <Button type="submit" variant="primary" className="w-full">
                Login
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
