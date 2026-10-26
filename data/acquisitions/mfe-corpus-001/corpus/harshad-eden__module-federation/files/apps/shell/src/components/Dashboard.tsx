import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@insurance/shared-ui";

export default function Dashboard() {
  const portals = [
    {
      name: "Sales Portal",
      description: "CRM, quotes, and policy management",
      href: "/sales",
      color: "blue",
      icon: "🎯",
    },
    {
      name: "Underwriter Portal",
      description: "Risk assessment and approvals",
      href: "/underwriter",
      color: "green",
      icon: "🛡️",
    },
    {
      name: "Product Configuration",
      description: "Product setup and pricing",
      href: "/products",
      color: "orange",
      icon: "⚙️",
    },
  ];

  return (
    <div>
      {/* Main Dashboard Indicator Banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">
              🏠 You are on the Main Insurance Platform Dashboard
            </h3>
            <p className="text-xs text-indigo-600 mt-1">
              Select a portal below to access specific functionality
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Insurance Platform Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Welcome to your insurance management platform. Choose a portal to get
          started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portals.map((portal) => (
          <Link key={portal.name} to={portal.href}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer border-2 hover:border-gray-300">
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 bg-${portal.color}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-3xl">{portal.icon}</span>
                </div>
                <CardTitle className="text-xl">{portal.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{portal.description}</p>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${portal.color}-100 text-${portal.color}-800`}
                  >
                    Click to enter →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
