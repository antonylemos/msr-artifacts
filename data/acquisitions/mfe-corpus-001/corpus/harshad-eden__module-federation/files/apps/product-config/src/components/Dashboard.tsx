import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@insurance/shared-ui";

export default function Dashboard() {
  const productMetrics = [
    { label: "Active Products", value: "24", change: "+3" },
    { label: "Pending Reviews", value: "7", change: "+2" },
    { label: "Rate Changes", value: "12", change: "+5" },
    { label: "Avg Processing", value: "2.3 days", change: "-0.4" },
  ];

  return (
    <div>
      {/* Portal Indicator Banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-orange-800">
              ⚙️ You are currently in the Product Configuration Portal
            </h3>
            <p className="text-xs text-orange-600 mt-1">
              Manage insurance products, pricing rules, and eligibility criteria
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Product Configuration
        </h1>
        <p className="text-gray-600">
          Manage insurance products, pricing, and eligibility rules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {productMetrics.map((metric) => (
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
            <CardTitle>Product Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="default">
              Create New Product
            </Button>
            <Button className="w-full" variant="outline">
              Manage Pricing Rules
            </Button>
            <Button className="w-full" variant="outline">
              Eligibility Criteria
            </Button>
            <Button className="w-full" variant="outline">
              Coverage Options
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Premium Health Plus</p>
                  <p className="text-sm text-gray-600">
                    Health Insurance - $299/month base
                  </p>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Term Life Secure</p>
                  <p className="text-sm text-gray-600">
                    Life Insurance - $45/month base
                  </p>
                </div>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dental Care Standard</p>
                  <p className="text-sm text-gray-600">
                    Dental Insurance - $35/month base
                  </p>
                </div>
                <span className="text-sm text-yellow-600">Under Review</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
