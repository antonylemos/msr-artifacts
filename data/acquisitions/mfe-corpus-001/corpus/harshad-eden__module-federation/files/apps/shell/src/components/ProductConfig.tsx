import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const RemoteProductConfig = lazy(() =>
  import("productConfig/App").catch(() => ({
    default: () => (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            🚨 Product Configuration Unavailable
          </h2>
          <p className="text-red-600 mb-4">
            The Product Configuration portal is not available. Please make sure it's running on port 3004.
          </p>
          <a
            href="http://localhost:3004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Open Product Configuration →
          </a>
        </div>
      </div>
    ),
  }))
);

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          🚨 Product Configuration Error
        </h2>
        <p className="text-red-600 mb-4">
          Failed to load Product Configuration: {error.message}
        </p>
        <div className="space-x-2">
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="http://localhost:3004"
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

export default function ProductConfig() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className="p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-800 mb-2">
                ⚙️ Loading Product Configuration...
              </h2>
              <p className="text-orange-600">Please wait while we load the Product Configuration.</p>
            </div>
          </div>
        }
      >
        <RemoteProductConfig />
      </Suspense>
    </ErrorBoundary>
  );
}