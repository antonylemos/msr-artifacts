import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// @ts-ignore
import Button from 'common_simple/Button';
// @ts-ignore
import Card from 'common_simple/Card';

// Lazy load the UserList micro frontend
const UserList = lazy(() => import('users_simple/UserList'));

const Home: React.FC = () => {
  return (
    <div>
      <h2>Welcome to Core Simple</h2>
      <Card title="About This Project">
        <p>This is a simple micro frontend architecture demonstration.</p>
        <p>It consists of:</p>
        <ul>
          <li><strong>core_simple</strong> - Shell application (this app)</li>
          <li><strong>common_simple</strong> - Shared components (Button, Card)</li>
          <li><strong>users_simple</strong> - User management micro frontend</li>
        </ul>
      </Card>
      <Card title="Navigation">
        <p>Use the navigation above to explore different sections.</p>
      </Card>
    </div>
  );
};

const App: React.FC = () => {
  const navStyles: React.CSSProperties = {
    backgroundColor: '#333',
    padding: '15px 20px',
    marginBottom: '20px',
  };

  const linkStyles: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
    fontSize: '16px',
  };

  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <nav style={navStyles}>
          <Link to="/" style={linkStyles}>Home</Link>
          <Link to="/users" style={linkStyles}>Users</Link>
        </nav>

        <div style={{ padding: '20px' }}>
          <h1>Core Simple - Shell Application</h1>
          
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
