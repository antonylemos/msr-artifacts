import React from "react";
import PostList, { Post } from "../components/PostList";
import useFetchWithCache from "../hooks/useFetchWithCache";

const CustomHookPage = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetchWithCache<Post[]>("https://jsonplaceholder.typicode.com/posts");

  return (
    <main className="min-h-screen px-5 py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        React Custom Hook with Caching
      </h1>

      {error && (
        <p className="text-red-600 text-center">Error: {error.message}</p>
      )}
      {loading && <p className="text-center">Loading posts...</p>}

      {!loading && posts && <PostList posts={posts} />}
    </main>
  );
};

export default CustomHookPage;
