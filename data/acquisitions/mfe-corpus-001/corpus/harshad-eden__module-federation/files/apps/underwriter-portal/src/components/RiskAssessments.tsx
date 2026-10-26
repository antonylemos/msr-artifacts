import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@insurance/shared-ui';

export default function RiskAssessments() {
  const assessments = [
    {
      id: 'RA-2024-001',
      applicant: 'John Doe',
      type: 'Health Insurance',
      riskLevel: 'Medium',
      status: 'In Progress',
      assignedTo: 'Sarah Wilson',
      dueDate: '2024-01-15',
    },
    {
      id: 'RA-2024-002',
      applicant: 'Jane Smith',
      type: 'Life Insurance',
      riskLevel: 'Low',
      status: 'Completed',
      assignedTo: 'Mike Johnson',
      dueDate: '2024-01-12',
    },
    {
      id: 'RA-2024-003',
      applicant: 'Bob Wilson',
      type: 'Auto Insurance',
      riskLevel: 'High',
      status: 'Review Required',
      assignedTo: 'Emily Davis',
      dueDate: '2024-01-20',
    },
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Review Required':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              🛡️ You are in the Risk Assessments section
            </h3>
            <p className="text-xs text-green-600 mt-1">
              Review and analyze insurance risk assessments
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Risk Assessments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          New Assessment
        </button>
      </div>

      <div className="grid gap-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{assessment.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {assessment.applicant} - {assessment.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(assessment.riskLevel)}`}>
                    {assessment.riskLevel} Risk
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Assigned to:</span>
                  <span className="ml-2 font-medium">{assessment.assignedTo}</span>
                </div>
                <div>
                  <span className="text-gray-500">Due Date:</span>
                  <span className="ml-2 font-medium">{assessment.dueDate}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Complete Review
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}