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
  const isEmbedded = location.pathname.startsWith('/underwriter');
  const basePath = isEmbedded ? '/underwriter' : '';
  
  const underwritingMetrics = [
    { label: "Pending Reviews", value: "18", change: "+5" },
    { label: "Approved Today", value: "12", change: "+3" },
    { label: "Risk Score Avg", value: "6.2", change: "-0.3" },
    { label: "Processing Time", value: "2.1 days", change: "-0.5" },
  ];

  return (
    <div>
      {/* Portal Indicator Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              🛡️ You are currently in the Underwriter Portal
            </h3>
            <p className="text-xs text-green-600 mt-1">
              Risk assessment, policy approvals, and underwriting decisions
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Underwriter Dashboard
        </h1>
        <p className="text-gray-600">Risk assessment and policy approvals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {underwritingMetrics.map((metric) => (
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
            <Link to={`${basePath}/assessments`}>
              <Button className="w-full" variant="default">
                View Risk Assessments
              </Button>
            </Link>
            <Link to={`${basePath}/approvals`}>
              <Button className="w-full" variant="outline">
                Pending Approvals
              </Button>
            </Link>
            <Button className="w-full" variant="outline">
              Generate Reports
            </Button>
            <Button className="w-full" variant="outline">
              Risk Guidelines
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Priority Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application #UW-2024-001</p>
                  <p className="text-sm text-gray-600">
                    Life Insurance - $500K coverage
                  </p>
                </div>
                <span className="text-sm text-red-600 font-medium">
                  High Risk
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application #UW-2024-002</p>
                  <p className="text-sm text-gray-600">
                    Health Insurance - Group Policy
                  </p>
                </div>
                <span className="text-sm text-yellow-600 font-medium">
                  Medium Risk
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application #UW-2024-003</p>
                  <p className="text-sm text-gray-600">Disability Insurance</p>
                </div>
                <span className="text-sm text-orange-600 font-medium">
                  Review Required
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
