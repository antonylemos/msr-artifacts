import React, { useState } from 'react';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login attempt with email: ${email}`);
  };

  return (
    <div style={{ 
      background: '#ffffff', 
      padding: '3rem', 
      borderRadius: '16px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      minWidth: '400px',
      border: '1px solid #e0e0e0'
    }}>
      <h2 style={{ color: '#333333', marginBottom: '2rem', textAlign: 'center' }}>Auth Microfrontend</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666666', fontWeight: 500 }}>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.875rem', 
              borderRadius: '8px', 
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Enter your email"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666666', fontWeight: 500 }}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.875rem', 
              borderRadius: '8px', 
              border: '2px solid #e0e0e0',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit"
          style={{ 
            width: '100%', 
            padding: '1rem', 
            background: '#333333',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#555555';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#333333';
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default App;
