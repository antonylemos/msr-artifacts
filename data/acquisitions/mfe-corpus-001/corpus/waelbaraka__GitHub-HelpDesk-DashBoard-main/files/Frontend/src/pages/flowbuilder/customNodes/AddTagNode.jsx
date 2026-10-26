// src/pages/flowbuilder/customNodes/AddTagNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TagIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Or solid, ensure ExclamationTriangleIcon is imported

const AddTagNode = memo(({ data, isConnectable, id, selected }) => {
  const tagName = data.tagName || 'Configure Tag';
  // Check for the isValid flag, default to true if not present (for nodes before validation was added)
  const isValid = data.isValid !== false;

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-slate-300 hover:border-indigo-400')}
      transition-all w-60 relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon
          className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow"
          title="Configuration error"
        />
      )}
      <div className="flex items-center mb-1 pb-1 border-b border-slate-200">
        <TagIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-indigo-500'}`} />
        <div className={`text-xs font-bold ${!isValid ? 'text-red-700' : 'text-slate-700'}`}>Add Tag</div>
      </div>
      <div className={`text-sm break-words text-center py-1 truncate ${!isValid && !data.tagName ? 'text-red-400 italic' : 'text-slate-800'}`} title={tagName}>
        {isValid || data.tagName ? tagName : "Tag name required"}
      </div>

      <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} id={`${id}-source`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
    </div>
  );
});

export default AddTagNode;