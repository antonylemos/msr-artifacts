// src/pages/flowbuilder/NodePalette.jsx
import React from 'react';
import {
    ChatBubbleLeftEllipsisIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,       // For ConditionNode
    TagIcon,         // For AddTagNode
    UserGroupIcon,   // For AssignToGroupNode
    PencilSquareIcon as SetVariableIcon,
    ClockIcon as PaletteDelayIcon,
    ArrowPathIcon as PaletteLoopIcon, // <-- IMPORT ICON FOR LOOP NODE
    MinusCircleIcon // Example for EndNode
} from '@heroicons/react/24/outline';

// DraggableNode sub-component (remains the same)
const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow-nodetype', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="p-3 mb-2 flex items-center border border-slate-300 rounded-md cursor-grab bg-white hover:shadow-lg hover:border-blue-500 transition-all text-sm text-slate-700"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {Icon && <Icon className="w-5 h-5 mr-2 text-slate-500 flex-shrink-0" />}
      {label}
    </div>
  );
};


const NodePalette = () => {
  return (
   <aside className="w-64 p-4 border-r border-slate-200 bg-stone-50 h-full overflow-y-auto scrollbar-thin">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-300">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Add Nodes
        </h3>
      </div>

      <DraggableNode type="sendMessageNode" label="Send Message" icon={ChatBubbleLeftEllipsisIcon} />
      <DraggableNode type="askQuestionNode" label="Ask Question" icon={QuestionMarkCircleIcon} />
      <DraggableNode type="conditionNode" label="Condition (If/Else)" icon={ScaleIcon} />
      <DraggableNode type="addTagNode" label="Add Tag" icon={TagIcon} />
      <DraggableNode type="assignToGroupNode" label="Assign to Group" icon={UserGroupIcon} />
      <DraggableNode type="setVariableNode" label="Set Variable" icon={SetVariableIcon} />
      <DraggableNode type="delayNode" label="Wait / Delay" icon={PaletteDelayIcon} />
      <DraggableNode type="loopNode" label="For Each (Loop)" icon={PaletteLoopIcon} /> {/* <-- ADDED THIS LINE */}
      <DraggableNode type="endNode" label="End Flow" icon={MinusCircleIcon}/>
    </aside>
  );
};

export default NodePalette;