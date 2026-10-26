import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@insurance/shared-ui';
import type { Policy } from '@insurance/shared-types';

const mockPolicies: Policy[] = [
  {
    id: '1',
    policyNumber: 'P-2024-001',
    type: 'health',
    status: 'active',
    premium: 450,
    coverage: [{ id: '1', type: 'Medical', amount: 50000, deductible: 1000, description: 'Comprehensive health coverage' }],
    policyholder: {
      id: '1',
      type: 'individual',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0123',
      address: { street: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', country: 'US' }
    },
    effectiveDate: '2024-01-01',
    expirationDate: '2024-12-31',
    createdAt: '2023-12-15',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    policyNumber: 'P-2024-002',
    type: 'life',
    status: 'active',
    premium: 75,
    coverage: [{ id: '2', type: 'Term Life', amount: 100000, deductible: 0, description: '20-year term life insurance' }],
    policyholder: {
      id: '2',
      type: 'individual',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-0456',
      address: { street: '456 Oak Ave', city: 'Somewhere', state: 'NY', zipCode: '67890', country: 'US' }
    },
    effectiveDate: '2024-01-15',
    expirationDate: '2044-01-15',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  }
];

export default function PoliciesList() {
  const getStatusColor = (status: Policy['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
          <p className="text-gray-600">Active insurance policies and coverage</p>
        </div>
        <Button>Create New Policy</Button>
      </div>

      <div className="space-y-4">
        {mockPolicies.map((policy) => (
          <Card key={policy.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{policy.policyNumber}</h3>
                  <p className="text-gray-600">{policy.policyholder.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
                  {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Policy Type</p>
                  <p className="font-medium capitalize">{policy.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Premium</p>
                  <p className="font-medium">${policy.premium}/month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Effective Date</p>
                  <p className="font-medium">{new Date(policy.effectiveDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expiration Date</p>
                  <p className="font-medium">{new Date(policy.expirationDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Coverage</p>
                <div className="space-y-1">
                  {policy.coverage.map((coverage) => (
                    <div key={coverage.id} className="text-sm">
                      <span className="font-medium">{coverage.type}</span> - 
                      <span className="ml-1">${coverage.amount.toLocaleString()}</span>
                      {coverage.deductible > 0 && (
                        <span className="ml-1 text-gray-600">(${coverage.deductible} deductible)</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Edit Policy</Button>
                <Button size="sm" variant="outline">View Claims</Button>
                <Button size="sm" variant="outline">Renew</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}