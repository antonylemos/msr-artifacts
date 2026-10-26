import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';

const SendMessageNode = memo(({ data, isConnectable, id, selected }) => {
  const isValid = data.isValid !== false;
  const messageText = data?.messageText;

  return (
    <div
      className={`
        group relative rounded-xl shadow-md overflow-hidden transition-all
        border-2 px-4 py-3 w-64 min-h-[100px]
        ${!isValid 
          ? 'border-red-500 bg-red-50 ring-1 ring-red-400' 
          : selected 
            ? 'border-blue-500 bg-white ring-2 ring-blue-200' 
            : 'border-slate-300 bg-white hover:border-blue-400'}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1 rounded-md ${isValid ? 'bg-blue-50 text-blue-600' : 'bg-red-100 text-red-600'}`}>
          <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
        </div>
        <h4 className={`text-xs font-semibold ${isValid ? 'text-slate-700' : 'text-red-700'}`}>
          Send Message
        </h4>
      </div>

      {/* Message body */}
      <div className="text-xs text-slate-800 bg-slate-50 rounded p-2 h-full overflow-y-auto whitespace-pre-wrap scrollbar-thin">
        {isValid && messageText 
          ? messageText 
          : <span className="italic text-slate-400">Click to edit...</span>}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id={`${id}-target`}
        isConnectable={isConnectable}
        className="!bg-slate-400 !w-2.5 !h-2.5"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id}-source`}
        isConnectable={isConnectable}
        className="!bg-slate-400 !w-3 !h-3 hover:!bg-blue-500 hover:!ring-2 hover:!ring-blue-300 transition-all"
      />
    </div>
  );
});

export default SendMessageNode;
