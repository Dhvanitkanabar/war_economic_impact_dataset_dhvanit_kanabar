import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 text-neutral-100">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-4 mt-8">
        Home
      </h1>
      <p className="text-neutral-400 text-lg mb-8 text-center max-w-2xl">
        Welcome to WarLens. Testing our new reusable components below.
      </p>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card 
          title="Component Testing" 
          subtitle="Buttons & Cards"
          headerAction={<Button variant="ghost" size="sm">Action</Button>}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Card>

        <Card 
          title="Basic Card" 
          subtitle="No header action"
        >
          <p>This is a basic card displaying body content inside the reusable Card component. It uses the default surface background.</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
