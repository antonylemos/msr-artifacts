import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '3rem', 
      background: '#ffffff', 
      borderRadius: '16px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      minWidth: '300px'
    }}>
      <h2 style={{ color: '#333333' }}>Messaging Microfrontend</h2>
    </div>
  );
};

export default App;
