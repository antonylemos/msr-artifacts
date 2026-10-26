// src/pages/flowbuilder/customNodes/AskQuestionNode.jsx
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { QuestionMarkCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AskQuestionNode = memo(({ data, isConnectable, id, selected }) => {
  const answers = data.answers || [];
  const questionText = data.questionText || 'Your Question Here?';
  const isValid = data.isValid !== false;

  return (
    <div className={`
      px-4 py-3 shadow-lg rounded-lg bg-white border-2 w-72
      ${!isValid ? 'border-red-500 ring-1 ring-red-400' : (selected ? 'border-purple-500 ring-2 ring-purple-300' : 'border-slate-300 hover:border-purple-400')}
      transition-all relative group min-h-[140px] flex flex-col justify-between
    `}>
      {!isValid && (
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500 absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow" title="Configuration error"/>
      )}
      <div>
        <div className="flex items-center mb-2 pb-2 border-b border-slate-200">
          <QuestionMarkCircleIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${!isValid ? 'text-red-400' : 'text-purple-500'}`} />
          <div className={`text-xs font-bold ${!isValid ? 'text-red-700' : 'text-slate-700'}`}>Ask a Question</div>
        </div>
        <div className={`text-sm break-words p-2 bg-slate-50 rounded min-h-[30px] mb-3 text-center ${!isValid && !data.questionText ? 'text-red-400 italic' : 'text-slate-800'}`}>
          {isValid || data.questionText ? questionText : "Question text required"}
        </div>
      </div>

      <div className="mt-auto pt-1"> {/* Ensure handles are at the bottom part */}
        <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!bg-slate-400 !w-3 !h-3" />
        <div className="space-y-1 mt-1">
          {answers.map((answer, index) => (
            <div key={answer.id || `answer-${index}`} className="text-xs text-slate-600 flex justify-end items-center relative pr-5">
              <span className={`px-2 py-0.5 rounded text-xs mr-2 truncate max-w-[180px] ${!isValid && (!answer.text || answer.text.trim() === '') ? 'bg-red-100 text-red-600 italic' : 'bg-purple-100 text-purple-700'}`} title={answer.text}>
                {isValid || (answer.text && answer.text.trim() !== '') ? (answer.text || `Option ${index + 1}`) : "Text Required"}
              </span>
              <Handle type="source" position={Position.Right} id={answer.id} isConnectable={isConnectable}  className="!bg-slate-400 !w-3 !h-3 hover:!bg-blue-500 hover:!ring-2 hover:!ring-blue-300 transition-all" // Added hover styles
 />
            </div>
          ))}
        </div>
        {(!isValid && answers.length === 0) && <p className="text-xxs text-red-500 text-center mt-1">At least one answer option required.</p>}
        {(answers.length === 0) && (
           <Handle type="source" position={Position.Bottom} id={`${id}-default-source`} isConnectable={isConnectable}  className="!bg-slate-400 !w-3 !h-3 hover:!bg-blue-500 hover:!ring-2 hover:!ring-blue-300 transition-all" // Added hover styles
style={{ bottom: '-5px' }} />
        )}
      </div>
    </div>
  );
});

export default AskQuestionNode;