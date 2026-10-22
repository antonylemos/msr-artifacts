import React from "react";

export type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Post[];
};

const PostList = React.memo(({ posts }: Props) => {
  return (
    <ul className="space-y-4 max-w-4xl mx-auto">
      {posts.map((post) => (
        <li
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-2 text-primary dark:text-primary-dark">
            {post.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
        </li>
      ))}
    </ul>
  );
});

export default PostList;
