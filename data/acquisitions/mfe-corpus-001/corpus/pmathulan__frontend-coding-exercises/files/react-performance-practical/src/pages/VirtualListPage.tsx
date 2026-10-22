import React, { useMemo } from "react";
import { generateLargeList } from "../utils/generateLargeList";
import VirtualizedList from "../components/VirtualizedList";

const VirtualListPage = () => {
  // Memoize to avoid recreating the list on every render
  const users = useMemo(() => generateLargeList(10000), []);

  return (
    <main className="min-h-screen px-5 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Virtualized List (10,000 Users)
      </h2>
      <div className="max-w-3xl mx-auto w-full">
        <VirtualizedList users={users} />
      </div>
    </main>
  );
};

export default VirtualListPage;
