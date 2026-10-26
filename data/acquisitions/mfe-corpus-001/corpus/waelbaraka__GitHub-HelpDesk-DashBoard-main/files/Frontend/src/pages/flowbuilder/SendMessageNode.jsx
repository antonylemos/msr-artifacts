// src/pages/flowbuilder/customNodes/SendMessageNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, id }) => { // data contains { messageText }
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-slate-400 w-64">
      <div className="flex">
        <div className="ml-2">
          <div className="text-xs font-bold text-slate-600 mb-1">Send Message</div>
          <div className="text-xs text-slate-800 break-words">
            {data.messageText || 'Type a message...'}
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
});