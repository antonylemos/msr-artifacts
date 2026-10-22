import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { User } from "../utils/generateLargeList";

type Props = {
  users: User[];
};

// Memoized row renderer to avoid unnecessary re-renders
const Row = React.memo(({ index, style, data }: ListChildComponentProps) => {
  const user: User = data[index];
  return (
    <div
      style={style}
      className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100"
    >
      #{index + 1} &nbsp;–&nbsp; {user.name}
    </div>
  );
});

const VirtualizedList: React.FC<Props> = ({ users }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-300 dark:border-gray-700">
      <List
        height={500} // viewport height
        itemCount={users.length}
        itemSize={40} // row height
        width={"100%"}
        itemData={users}
      >
        {Row}
      </List>
    </div>
  );
};

export default React.memo(VirtualizedList);
