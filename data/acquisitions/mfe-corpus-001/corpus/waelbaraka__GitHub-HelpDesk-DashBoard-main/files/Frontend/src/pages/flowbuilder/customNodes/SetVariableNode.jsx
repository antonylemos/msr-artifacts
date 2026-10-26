// src/pages/flowbuilder/customNodes/SetVariableNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PencilSquareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'; // Changed to PencilSquareIcon

const SetVariableNode = memo(({ data, isConnectable, id, selected }) => {
  const nodeLabel = data.label || 'Set Variable';
  const variableName = data.variableName || 'context.myVariable';
  let displayValue = String(data.variableValue !== undefined ? data.variableValue : '"value"');
  if (displayValue.length > 25) displayValue = displayValue.substring(0, 22) + "...";
  const isValid = data.isValid !== false;

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-cyan-500 ring-2 ring-cyan-300' : 'border-slate-300 hover:border-cyan-400')}
      transition-all w-72 relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow" title="Configuration error"/>
      )}
      <div className="flex items-center mb-2 pb-2 border-b border-slate-200">
        <PencilSquareIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-cyan-500'}`} />
        <div className={`text-xs font-bold truncate ${!isValid ? 'text-red-700' : 'text-slate-700'}`} title={nodeLabel}>{nodeLabel}</div>
      </div>
      <div className="text-xs space-y-0.5 mt-1">
        <p className={`truncate ${!isValid && !data.variableName ? 'text-red-400 italic' : 'text-slate-700'}`} title={`Set: {{${variableName}}}`}>
            Set: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-cyan-700">{`{{${ isValid || data.variableName ? variableName : 'Name Req.'}}}`}</span>
        </p>
        <p className="truncate text-slate-700" title={`To: ${data.variableValue}`}>
            To: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{displayValue}</span>
        </p>
      </div>

      <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} id={`${id}-source`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
    </div>
  );
});

export default SetVariableNode;