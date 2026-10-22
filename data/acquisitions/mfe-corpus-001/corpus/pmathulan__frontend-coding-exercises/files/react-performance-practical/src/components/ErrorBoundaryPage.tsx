import React from "react";
import withErrorBoundary from "../hocs/withErrorBoundary";

interface MyComponentProps {
  someData: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ someData }) => {
  if (someData === "error") {
    throw new Error("Something went wrong in MyComponent!");
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6">
      Data: {someData}
    </div>
  );
};

const FallbackComponent: React.FC = () => (
  <div className="bg-lightcoral text-white p-6 rounded-md shadow-md">
    <h3 className="text-xl font-semibold mb-2">Oh no! An error occurred.</h3>
    <p>Please try again later.</p>
  </div>
);

// We need a way to reset the error boundary's state from the parent.
// Let's create a wrapper component that holds the state and the error boundary.
const ErrorBoundaryWrapper: React.FC<{
  children: React.ReactNode;
  resetError: () => void;
}> = ({ children, resetError }) => {
  React.useEffect(() => {
    resetError(); // Call the reset function when this component re-renders
  }, [resetError]);

  return <>{children}</>;
};

const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent);

const ErrorBoundaryPage = () => {
  const [data, setData] = React.useState("initial");
  const [errorKey, setErrorKey] = React.useState(0); // Force re-mount of ErrorBoundary

  // Function to reset the error boundary by changing the key
  const resetErrorBoundary = React.useCallback(() => {
    setErrorKey((prevKey) => prevKey + 1);
  }, []);

  const handleSetSuccess = () => {
    setData("success");
    resetErrorBoundary(); // Reset the error boundary when setting to success
  };

  const handleSetError = () => {
    setData("error");
  };

  const handleSetInitial = () => {
    setData("initial");
    resetErrorBoundary(); // Reset on initial as well for clarity
  };

  const handleRetry = () => {
    setData("retrying...");
    setTimeout(() => {
      setData("success");
      resetErrorBoundary(); // Reset after a successful "retry"
    }, 1000);
  };

  return (
    <main className="min-h-screen px-5 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Awesome Error Boundary Example
      </h1>
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Interactive Error Handling
          </h2>
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSetInitial}
            >
              Set to Initial
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSetError}
            >
              Cause Error
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSetSuccess}
            >
              Set to Success
            </button>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Current Data: {data}
          </p>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <MyComponentWithErrorBoundary key={errorKey} someData={data} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Custom Fallback UI
          </h2>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <MyComponentWithErrorBoundary
              key={errorKey + 1} // Different key
              someData={data === "error" ? "error" : "normal"}
              fallbackUI={<FallbackComponent />}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            With Retry Mechanism
          </h2>
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <MyComponentWithErrorBoundary
              key={errorKey + 2} // Different key
              someData={data === "error" ? "error" : "normal"}
              fallbackUI={
                <div className="bg-orange-200 text-orange-800 p-4 rounded-md">
                  <h4 className="text-lg font-semibold mb-2">Oops!</h4>
                  <p>There was an issue rendering.</p>
                </div>
              }
              onRetry={handleRetry}
            />
            {data === "retrying..." && (
              <p className="text-yellow-500 italic mt-2">Retrying...</p>
            )}
            {data === "error" && (
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                onClick={handleRetry}
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorBoundaryPage;
