import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register form submitted:', { name, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-neutral-100">
      <div className="w-full max-w-md">
        <Card 
          title="Create Your WarLens Account" 
          subtitle="Join us to explore the economic impact of conflicts worldwide."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full">
                Register
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 transition-colors">
              Login here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
