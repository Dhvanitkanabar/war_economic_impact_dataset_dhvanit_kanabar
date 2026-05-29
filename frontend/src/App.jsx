import React from 'react';

function App() {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      margin: 0,
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#38bdf8' }}>
        WarLens Frontend
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#94a3b8' }}>
        WarLens Frontend Initialized Successfully
      </p>
    </div>
  );
}

export default App;
