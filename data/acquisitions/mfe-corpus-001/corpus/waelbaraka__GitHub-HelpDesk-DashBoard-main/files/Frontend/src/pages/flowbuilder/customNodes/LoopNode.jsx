// src/pages/flowbuilder/customNodes/LoopNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Using ArrowPath for loop/iteration

const LoopNode = memo(({ data, isConnectable, id, selected }) => {
  const isValid = data.isValid !== false;
  const label = data.label || 'For Each Loop';
  const listSource = data.listSourcePath || '{{context.arrayVariable}}';
  const itemVar = data.currentItemVariable || 'loop.item';

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-purple-500 ring-2 ring-purple-300' : 'border-slate-300 hover:border-purple-400')}
      transition-all w-72 min-h-[130px] flex flex-col justify-between relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow" title="Configuration error"/>
      )}
      <div>
        <div className="flex items-center mb-2 pb-2 border-b border-slate-200">
          <ArrowPathIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-purple-500'}`} />
          <div className={`text-xs font-bold truncate ${!isValid ? 'text-red-700' : 'text-slate-700'}`} title={label}>
            {isValid ? label : (data.label || "Loop Misconfigured")}
          </div>
        </div>
        <div className={`text-xs space-y-0.5 ${!isValid && (!data.listSourcePath || !data.currentItemVariable) ? 'text-red-400 italic' : 'text-slate-700'}`}>
          <p className="truncate" title={`Iterate over: ${listSource}`}>
            List: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-purple-700">{listSource}</span>
          </p>
          <p className="truncate" title={`Current item as: {{${itemVar}}}`}>
            Item as: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-purple-700">{`{{${itemVar}}}`}</span>
          </p>
          {(!isValid && (!data.listSourcePath || !data.currentItemVariable)) && <p className="text-xxs text-red-500 mt-1">List source and item variable name are required.</p>}
        </div>
      </div>

      <div className="mt-auto pt-2"> {/* Handles at the bottom */}
        <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />

        {/* Output Handle for LOOP BODY (Next Item) */}
        <div className="text-xs text-green-600 flex justify-end items-center mt-2 relative pr-5">
            <span className="bg-green-100 px-2 py-0.5 rounded text-green-700 text-xxs mr-1">NEXT ITEM</span>
            <Handle type="source" position={Position.Right} id={`${id}-loopBody`} isConnectable={isConnectable} className="!bg-green-500 !w-3 !h-3" style={{top: 'auto', bottom: '28px'}}/>
        </div>

        {/* Output Handle for AFTER LOOP (Done) */}
        <div className="text-xs text-slate-500 flex justify-end items-center mt-1 relative pr-5">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 text-xxs mr-1">DONE</span>
            <Handle type="source" position={Position.Right} id={`${id}-done`} isConnectable={isConnectable} className="!bg-slate-500 !w-3 !h-3" style={{top: 'auto', bottom: '8px'}}/>
        </div>
      </div>
    </div>
  );
});

export default LoopNode;