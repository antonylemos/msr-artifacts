// src/pages/flowbuilder/customNodes/StartNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlayCircleIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'; // Using outline for consistency

const StartNode = memo(({ data, isConnectable, id, selected }) => {
  const label = data.label || 'Start Trigger';
  const triggerType = data.triggerType || 'NEW_CHAT_STARTED';
  const isValid = data.isValid !== false; // Default to true

  let IconComponent = PlayCircleIcon;
  let baseBgColor = 'bg-green-500';
  let baseBorderColor = 'border-green-600';
  let baseTextColor = 'text-white';
  let ringColor = 'ring-green-300';

  if (triggerType === 'MESSAGE_RECEIVED') {
    IconComponent = ChatBubbleLeftRightIcon;
    baseBgColor = 'bg-sky-500';
    baseBorderColor = 'border-sky-600';
    ringColor = 'ring-sky-300';
  }
  // Add more else if for other trigger types

  const selectedClasses = selected ? `ring-2 ring-offset-1 ${ringColor}` : '';
  const invalidClasses = !isValid ? '!border-red-500 !ring-1 !ring-red-400' : ''; // Use ! to override

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg border-2
      ${baseBgColor} ${baseTextColor} ${baseBorderColor}
      ${selectedClasses} ${invalidClasses}
      w-auto min-w-[180px] max-w-xs transition-all relative group
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-100 absolute top-1 right-1 bg-red-600 rounded-full p-0.5" title="Configuration error"/>
      )}
      <div className="flex items-center mb-1">
        <IconComponent className={`w-5 h-5 mr-2 ${!isValid ? 'text-red-200' : baseTextColor}`} />
        <div className="text-sm font-semibold truncate" title={label}>
          {label}
        </div>
      </div>
      <div className={`text-xs opacity-80 truncate ${!isValid && !data.triggerType ? 'text-red-200 italic' : ''}`} title={`Trigger: ${triggerType.replace(/_/g, ' ')}`}>
        Trigger: {!isValid && !data.triggerType ? "Type Required" : triggerType.replace(/_/g, ' ')}
        {triggerType === 'MESSAGE_RECEIVED' && data.triggerKeywords && (
            <span className={`block text-xxs italic truncate ${!isValid && (!data.triggerKeywords || data.triggerKeywords.length ===0) ? 'text-red-200' : ''}`}>
                Keywords: {!isValid && (!data.triggerKeywords || data.triggerKeywords.length ===0) ? "Required" : data.triggerKeywords.join(', ')}
            </span>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id || 'start'}-source`}
        isConnectable={isConnectable}
        className={`!${baseBgColor} !w-3 !h-3`}
        style={{ filter: 'brightness(0.8)'}}
      />
    </div>
  );
});

export default StartNode;