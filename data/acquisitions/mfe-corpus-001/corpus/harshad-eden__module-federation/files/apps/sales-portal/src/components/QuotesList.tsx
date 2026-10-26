import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@insurance/shared-ui';
import type { Quote } from '@insurance/shared-types';

const mockQuotes: Quote[] = [
  {
    id: '1',
    policyType: 'health',
    requestedCoverage: [{ id: '1', type: 'Medical', amount: 50000, deductible: 1000, description: 'Comprehensive health coverage' }],
    estimatedPremium: 450,
    status: 'pending',
    validUntil: '2024-02-15',
    createdAt: '2024-01-15',
    applicant: {
      id: '1',
      type: 'individual',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0123',
      address: { street: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', country: 'US' }
    }
  },
  {
    id: '2',
    policyType: 'life',
    requestedCoverage: [{ id: '2', type: 'Term Life', amount: 100000, deductible: 0, description: '20-year term life insurance' }],
    estimatedPremium: 75,
    status: 'approved',
    validUntil: '2024-02-20',
    createdAt: '2024-01-10',
    applicant: {
      id: '2',
      type: 'individual',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-0456',
      address: { street: '456 Oak Ave', city: 'Somewhere', state: 'NY', zipCode: '67890', country: 'US' }
    }
  }
];

export default function QuotesList() {
  const getStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-600">Manage insurance quotes and proposals</p>
        </div>
        <Button>Create New Quote</Button>
      </div>

      <div className="space-y-4">
        {mockQuotes.map((quote) => (
          <Card key={quote.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Quote #{quote.id}</h3>
                  <p className="text-gray-600">{quote.applicant.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Policy Type</p>
                  <p className="font-medium capitalize">{quote.policyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Premium</p>
                  <p className="font-medium">${quote.estimatedPremium}/month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valid Until</p>
                  <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm">View Details</Button>
                <Button size="sm" variant="outline">Edit</Button>
                {quote.status === 'approved' && (
                  <Button size="sm" variant="default">Convert to Policy</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}