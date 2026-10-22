import React from "react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <main className="min-w-0 isolate flex items-center justify-center min-h-screen px-5">
      <div className="flex flex-col items-center text-center gap-4">
        <h3 className="text-4xl font-display lg:text-4xl font-semibold leading-snug text-primary dark:text-primary-dark">
          React Performance Focused Practical
        </h3>

        <p className="text-3xl font-display max-w-lg md:max-w-full py-1 text-secondary dark:text-primary-dark leading-snug">
          Click below link to navigate to the relevant exercise page.
        </p>

        <div className="mt-5 flex gap-2 w-full sm:w-auto flex-col sm:flex-row justify-center">
          <Link
            className="w-full sm:w-auto flex justify-center items-center font-bold text-lg leading-snug px-4 sm:px-6 py-3 rounded-full bg-link text-white dark:bg-brand-dark dark:text-secondary hover:bg-opacity-80 ring-1 ring-white focus:outline-white focus:outline-offset-2 active:scale-[.98] transition-transform"
            aria-label="Custom Hook: useFetchWithCache"
            to="/custom-hook"
          >
            3.1 - Custom Hook: useFetchWithCache
          </Link>

          <Link
            className="w-full sm:w-auto flex justify-center items-center font-bold text-lg leading-snug px-4 sm:px-6 py-3 rounded-full text-primary dark:text-primary-dark hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 ring-1 ring-white focus:outline-white focus:outline-offset-2 shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark active:scale-[.98] transition-transform"
            aria-label="Virtualized List"
            to="/virtual-list"
          >
            3.2 - Virtualized List
          </Link>
          <Link
            className="w-full sm:w-auto flex justify-center items-center font-bold text-lg leading-snug px-4 sm:px-6 py-3 rounded-full text-primary dark:text-primary-dark hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 ring-1 ring-white focus:outline-white focus:outline-offset-2 shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark active:scale-[.98] transition-transform"
            aria-label="Higher-Order Components"
            to="/hoc"
          >
            3.3 Higher-Order Components
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
