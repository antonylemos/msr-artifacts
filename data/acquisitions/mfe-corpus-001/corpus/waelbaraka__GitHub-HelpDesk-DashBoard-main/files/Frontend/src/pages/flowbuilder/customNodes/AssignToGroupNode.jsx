// src/pages/flowbuilder/customNodes/AssignToGroupNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { UserGroupIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AssignToGroupNode = memo(({ data, isConnectable, id, selected }) => {
  const groupName = data.groupName || 'Configure Group';
  const isValid = data.isValid !== false;

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-teal-500 ring-2 ring-teal-300' : 'border-slate-300 hover:border-teal-400')}
      transition-all w-64 relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow" title="Configuration error"/>
      )}
      <div className="flex items-center mb-1 pb-1 border-b border-slate-200">
        <UserGroupIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-teal-500'}`} />
        <div className={`text-xs font-bold ${!isValid ? 'text-red-700' : 'text-slate-700'}`}>Assign to Group</div>
      </div>
      <div className={`text-sm break-words text-center py-1 truncate ${!isValid && !data.groupName ? 'text-red-400 italic' : 'text-slate-800'}`} title={groupName}>
        {isValid || data.groupName ? groupName : "Group Required"}
      </div>

      <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} id={`${id}-source`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
    </div>
  );
});

export default AssignToGroupNode;