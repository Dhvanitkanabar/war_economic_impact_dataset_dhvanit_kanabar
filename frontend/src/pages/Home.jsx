import React from 'react';
import Button from '../components/Button.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-neutral-100">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-4">
        Home
      </h1>
      <p className="text-neutral-400 text-lg mb-8">Welcome to WarLens.</p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="danger">Danger Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </div>
    </div>
  );
};

export default Home;
