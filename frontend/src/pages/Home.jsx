import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Input from '../components/Input.jsx';

const Home = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-neutral-100 min-h-[calc(100vh-80px)]">
      
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center mb-16 mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
          WarLens 2.0 is Here
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500 mb-6 tracking-tight drop-shadow-sm">
          Understand the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500">Economic Impact</span> of Global Conflicts
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          A data-driven platform delivering real-time analytics, historical comparisons, and deep financial insights into modern warfare.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" className="w-full sm:w-auto px-8">
            Explore Dashboard
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
            View Analytics
          </Button>
        </div>
      </div>

      {/* Component Showcase Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card 
          title="Component Testing" 
          subtitle="Buttons & Interactions"
          headerAction={<Button variant="ghost" size="sm">Action</Button>}
        >
          <div className="flex flex-wrap gap-4 mt-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Card>

        <Card 
          title="Form Components" 
          subtitle="Input Fields & Validation"
        >
          <div className="flex flex-col space-y-4">
            <Input 
              label="Standard Input" 
              name="standard" 
              placeholder="Type something..." 
            />
            <Input 
              label="Input with Error" 
              name="error_input" 
              placeholder="Error state" 
              error="This field is invalid." 
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
