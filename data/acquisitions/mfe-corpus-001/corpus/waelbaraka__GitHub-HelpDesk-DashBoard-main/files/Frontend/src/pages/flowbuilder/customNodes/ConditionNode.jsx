// src/pages/flowbuilder/customNodes/ConditionNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ScaleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ConditionNode = memo(({ data, isConnectable, id, selected }) => {
  const label = data.label || 'Condition';
  const conditions = data.conditions || [];
  const logic = data.conditionLogic || 'AND';
  const isValid = data.isValid !== false;

  // Check if any condition is incomplete
  const hasIncompleteConditions = !isValid && conditions.some(cond => !cond.sourceField || (!(cond.operator === 'IS_SET' || cond.operator === 'IS_NOT_SET') && !cond.value));


  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-300 hover:border-amber-400')}
      transition-all w-72 min-h-[120px] flex flex-col justify-between relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow" title="Configuration error"/>
      )}
      <div>
        <div className="flex items-center mb-2 pb-2 border-b border-slate-200">
          <ScaleIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-amber-500'}`} />
          <div className={`text-xs font-bold truncate ${!isValid ? 'text-red-700' : 'text-slate-700'}`} title={label}>{label}</div>
        </div>

        <div className={`text-xs space-y-1 max-h-20 overflow-y-auto scrollbar-thin pr-1 ${!isValid && conditions.length === 0 ? 'text-red-400 italic' : 'text-slate-600'}`}>
          {conditions.length > 0 ? (
            conditions.map((cond, index) => (
              <div key={cond.id || index} className="truncate flex items-center" title={`${cond.sourceField} ${cond.operator} ${cond.value}`}>
                <span className="font-mono text-xxs text-amber-700 mr-1">{index > 0 ? logic : 'IF'}</span>
                <span className={`font-medium truncate ${!isValid && !cond.sourceField ? 'text-red-500 italic' : 'text-slate-700'}`}>{cond.sourceField || '[Field Required]'}</span>
                <span className="mx-1">{cond.operator || '[op]'}</span>
                <span className={`font-medium truncate ${!isValid && !(cond.operator === 'IS_SET' || cond.operator === 'IS_NOT_SET') && !cond.value ? 'text-red-500 italic' : 'text-slate-700'}`}>
                    { (cond.operator === 'IS_SET' || cond.operator === 'IS_NOT_SET') ? '' : `"${cond.value || '[Value Req.]'}"` }
                </span>
              </div>
            ))
          ) : (
            <p className={`${!isValid ? 'text-red-400 italic' : 'italic text-slate-400'}`}>
                {!isValid ? "At least one condition required." : "Click to configure conditions..."}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-2">
        <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
        <div className="text-xs text-green-600 flex justify-end items-center mt-2 relative pr-5">
            <span className="bg-green-100 px-2 py-0.5 rounded text-green-700 text-xxs mr-1">TRUE</span>
            <Handle type="source" position={Position.Right} id={`${id}-true`} isConnectable={isConnectable} className="!bg-green-500 !w-3 !h-3" style={{top: 'auto', bottom: '28px'}}/>
        </div>
        <div className="text-xs text-red-600 flex justify-end items-center mt-1 relative pr-5">
            <span className="bg-red-100 px-2 py-0.5 rounded text-red-700 text-xxs mr-1">FALSE</span>
            <Handle type="source" position={Position.Right} id={`${id}-false`} isConnectable={isConnectable} className="!bg-red-500 !w-3 !h-3" style={{top: 'auto', bottom: '8px'}}/>
        </div>
      </div>
    </div>
  );
});

export default ConditionNode;