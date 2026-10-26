import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@insurance/shared-ui';
import Dashboard from './components/Dashboard';
import RiskAssessments from './components/RiskAssessments';
import PendingApprovals from './components/PendingApprovals';

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assessments" element={<RiskAssessments />} />
        <Route path="/approvals" element={<PendingApprovals />} />
        <Route path="/underwriter" element={<Dashboard />} />
        <Route path="/underwriter/assessments" element={<RiskAssessments />} />
        <Route path="/underwriter/approvals" element={<PendingApprovals />} />
      </Routes>
    </div>
  );
}

export default App;