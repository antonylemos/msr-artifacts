import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const RemoteSalesPortal = lazy(() =>
  import("salesPortal/App").catch((err) => ({
    default: () => (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            🚨 Sales Portal Unavailable
          </h2>
          <p className="text-red-600 mb-4">
            The Sales Portal is not available. Please make sure it's running on
            port 3001.
          </p>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Open Sales Portal →
          </a>
        </div>
      </div>
    ),
  }))
);

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          🚨 Sales Portal Error
        </h2>
        <p className="text-red-600 mb-4">
          Failed to load Sales Portal: {error.message}
        </p>
        <div className="space-x-2">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open in New Tab →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SalesPortal() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                🎯 Loading Sales Portal...
              </h2>
              <p className="text-blue-600">
                Please wait while we load the Sales Portal.
              </p>
            </div>
          </div>
        }
      >
        <RemoteSalesPortal />
      </Suspense>
    </ErrorBoundary>
  );
}
