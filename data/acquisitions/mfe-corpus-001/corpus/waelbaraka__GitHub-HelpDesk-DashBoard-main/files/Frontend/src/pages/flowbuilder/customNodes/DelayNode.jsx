// src/pages/flowbuilder/customNodes/DelayNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const DelayNode = memo(({ data, isConnectable, id, selected }) => {
  const isValid = data.isValid !== false; // Default to true
  const duration = data.duration || 1;
  const unit = data.unit || 'minutes';
  const label = data.label || `Wait ${duration} ${unit}`;

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-sky-500 ring-2 ring-sky-300' : 'border-slate-300 hover:border-sky-400')}
      transition-all w-64 relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow" title="Configuration error"/>
      )}
      <div className="flex items-center mb-1 pb-1 border-b border-slate-200">
        <ClockIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-sky-500'}`} />
        <div className={`text-xs font-bold truncate ${!isValid ? 'text-red-700' : 'text-slate-700'}`} title={label}>
          {isValid ? label : (data.label || "Delay Misconfigured")}
        </div>
      </div>
      <div className={`text-sm break-words text-center py-1 ${!isValid && (!data.duration || !data.unit) ? 'text-red-400 italic' : 'text-slate-800'}`}>
        {isValid || (data.duration && data.unit) ? `Wait for ${data.duration || '[duration]'} ${data.unit || '[unit]'}` : "Duration & Unit Required"}
      </div>

      <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} id={`${id}-source`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
    </div>
  );
});

export default DelayNode;