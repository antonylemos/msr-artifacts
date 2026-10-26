import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@insurance/shared-ui";

export default function Dashboard() {
  const location = useLocation();
  const isEmbedded = location.pathname.startsWith('/sales');
  const basePath = isEmbedded ? '/sales' : '';
  
  const salesMetrics = [
    { label: "Active Quotes", value: "24", change: "+12%" },
    { label: "Policies Sold", value: "156", change: "+8%" },
    { label: "Revenue", value: "$425K", change: "+15%" },
    { label: "Conversion Rate", value: "18%", change: "+3%" },
  ];

  return (
    <div>
      {/* Portal Indicator Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              🎯 You are currently in the Sales Portal
            </h3>
            <p className="text-xs text-blue-600 mt-1">
              Manage customer relationships, quotes, and policy sales
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
        <p className="text-gray-600">
          Manage quotes, policies, and customer relationships
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {salesMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-green-600">{metric.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="default">
              Create New Quote
            </Button>
            <Button className="w-full" variant="outline">
              Search Customers
            </Button>
            <Link to={`${basePath}/quotes`}>
              <Button className="w-full" variant="outline">
                View All Quotes
              </Button>
            </Link>
            <Link to={`${basePath}/policies`}>
              <Button className="w-full" variant="outline">
                View All Policies
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Quote #Q-2024-001</p>
                  <p className="text-sm text-gray-600">
                    Health Insurance - John Doe
                  </p>
                </div>
                <span className="text-sm text-blue-600">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Policy #P-2024-089</p>
                  <p className="text-sm text-gray-600">
                    Life Insurance - Jane Smith
                  </p>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Quote #Q-2024-002</p>
                  <p className="text-sm text-gray-600">
                    Dental Insurance - Mike Johnson
                  </p>
                </div>
                <span className="text-sm text-orange-600">Review</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
