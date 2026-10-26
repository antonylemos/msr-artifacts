import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@insurance/shared-ui';
import Dashboard from './components/Dashboard';
import QuotesList from './components/QuotesList';
import PoliciesList from './components/PoliciesList';

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quotes" element={<QuotesList />} />
        <Route path="/policies" element={<PoliciesList />} />
        <Route path="/sales" element={<Dashboard />} />
        <Route path="/sales/quotes" element={<QuotesList />} />
        <Route path="/sales/policies" element={<PoliciesList />} />
      </Routes>
    </div>
  );
}

export default App;