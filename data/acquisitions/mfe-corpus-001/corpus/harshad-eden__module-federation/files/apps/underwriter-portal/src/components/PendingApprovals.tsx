import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@insurance/shared-ui';

export default function PendingApprovals() {
  const approvals = [
    {
      id: 'PA-2024-001',
      applicant: 'Alice Johnson',
      type: 'Health Insurance',
      premium: '$299/month',
      submittedDate: '2024-01-10',
      priority: 'High',
      riskScore: 7.2,
      documents: ['Medical Records', 'Application Form', 'ID Verification'],
    },
    {
      id: 'PA-2024-002',
      applicant: 'Robert Chen',
      type: 'Life Insurance',
      premium: '$450/month',
      submittedDate: '2024-01-08',
      priority: 'Medium',
      riskScore: 5.8,
      documents: ['Application Form', 'Medical Exam', 'Financial Statement'],
    },
    {
      id: 'PA-2024-003',
      applicant: 'Maria Garcia',
      type: 'Auto Insurance',
      premium: '$189/month',
      submittedDate: '2024-01-12',
      priority: 'Low',
      riskScore: 3.4,
      documents: ['Driving Record', 'Vehicle Information', 'Application Form'],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 7) return 'text-red-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-orange-800">
              ⏳ You are in the Pending Approvals section
            </h3>
            <p className="text-xs text-orange-600 mt-1">
              Review and approve or deny insurance applications
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pending Approvals</h1>
        <div className="flex space-x-2">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Filter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Bulk Review
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {approvals.map((approval) => (
          <Card key={approval.id} className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{approval.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {approval.applicant} - {approval.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                    {approval.priority} Priority
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-gray-500 text-sm">Premium:</span>
                  <p className="font-semibold text-lg">{approval.premium}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Risk Score:</span>
                  <p className={`font-semibold text-lg ${getRiskScoreColor(approval.riskScore)}`}>
                    {approval.riskScore}/10
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Submitted:</span>
                  <p className="font-medium">{approval.submittedDate}</p>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-500 text-sm">Required Documents:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {approval.documents.map((doc, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
                    >
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex-1">
                  Approve
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex-1">
                  Deny
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex-1">
                  Request More Info
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}