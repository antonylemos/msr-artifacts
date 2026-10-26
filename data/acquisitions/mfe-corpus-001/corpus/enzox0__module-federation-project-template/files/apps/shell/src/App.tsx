import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/index.css';
import ErrorBoundary from './components/ErrorBoundary';
import RemoteHealthCheck from './components/RemoteHealthCheck';

const AuthApp = lazy(() => import('authMf/App'));
const AdminApp = lazy(() => import('adminMf/App'));
const DashboardApp = lazy(() => import('dashboardMf/App'));
const MessagingApp = lazy(() => import('messagingMf/App'));

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/auth" className="nav-link">Auth</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/messaging" className="nav-link">Messaging</Link>
        </nav>
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="center-content">
                  <h1>Template</h1>
                  <p style={{ marginTop: '1rem', color: '#666' }}>
                    Check the remote status indicator in the bottom-right corner
                  </p>
                </div>
              } 
            />
            <Route 
              path="/auth" 
              element={
                <ErrorBoundary moduleName="Auth Module">
                  <Suspense fallback={<div className="loading">Loading Auth Module...</div>}>
                    <AuthApp />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ErrorBoundary moduleName="Admin Module">
                  <Suspense fallback={<div className="loading">Loading Admin Module...</div>}>
                    <AdminApp />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ErrorBoundary moduleName="Dashboard Module">
                  <Suspense fallback={<div className="loading">Loading Dashboard Module...</div>}>
                    <DashboardApp />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/messaging" 
              element={
                <ErrorBoundary moduleName="Messaging Module">
                  <Suspense fallback={<div className="loading">Loading Messaging Module...</div>}>
                    <MessagingApp />
                  </Suspense>
                </ErrorBoundary>
              } 
            />
          </Routes>
        </main>
        <RemoteHealthCheck />
      </div>
    </Router>
  );
}

export default App;
