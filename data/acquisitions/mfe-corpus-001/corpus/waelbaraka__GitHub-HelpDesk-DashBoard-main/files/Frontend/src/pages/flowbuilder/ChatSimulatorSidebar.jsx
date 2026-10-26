// src/pages/flowbuilder/ChatSimulatorSidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    TagIcon, 
    PaperAirplaneIcon,
    UserIcon as HumanIcon,
    SparklesIcon as BotIcon,
    XMarkIcon,
    PencilSquareIcon as LogSetVariableIcon,
    UserGroupIcon // For Assign to Group action
} from '@heroicons/react/24/solid';

// ChatMessage and QuestionWithOptions remain the same
const ChatMessage = ({ type, text, isBot }) => ( <div className={`flex mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}> <div className={`max-w-[75%] p-2.5 rounded-lg shadow ${ isBot ? 'bg-slate-200 text-slate-800 rounded-bl-none' : 'bg-blue-500 text-white rounded-br-none' }`}> <p className="text-sm">{text}</p> </div> </div>);
const QuestionWithOptions = ({ question, answers, onAnswerSelect }) => ( <div className="my-3 p-3 bg-slate-100 rounded-lg shadow"> <p className="text-sm font-medium text-slate-700 mb-2">{question}</p> <div className="flex flex-col space-y-1.5"> {(answers || []).map((answer) => ( <button key={answer.id} onClick={() => onAnswerSelect(answer.id)} className="w-full text-left text-sm bg-white hover:bg-blue-50 border border-slate-300 text-blue-600 px-3 py-1.5 rounded-md transition-colors" > {answer.text} </button> ))} </div> </div>);


const ChatSimulatorSidebar = ({ log, onUserAnswer, onUserFreeTextReply, onClose, isVisible }) => {
  const [userInput, setUserInput] = useState('');
  const [currentQuestionNodeId, setCurrentQuestionNodeId] = useState(null);
  const messagesEndRef = useRef(null);

  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const lastAction = [...log].reverse().find(entry => entry.type === 'ACTION_ASK_QUESTION' || entry.type === 'FLOW_END' || entry.type === 'SIMULATION_END' || entry.type === 'ERROR');
    if (lastAction && lastAction.type === 'ACTION_ASK_QUESTION') {
      setCurrentQuestionNodeId(lastAction.nodeId);
    } else {
      setCurrentQuestionNodeId(null);
    }
  }, [log]);

  

  const handleSendUserInput = () => {
    if (!userInput.trim() || !currentQuestionNodeId) return;
    if (onUserFreeTextReply) {
      onUserFreeTextReply(currentQuestionNodeId, userInput.trim());
    }
    setUserInput('');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-80 md:w-96 h-full flex flex-col bg-white border-l border-slate-200 shadow-lg">
      {/* Header */}
      <div className="p-3 flex items-center justify-between border-b border-slate-200 bg-slate-50">
        <div className="flex items-center"> <BotIcon className="w-5 h-5 text-blue-500 mr-2" /> <h3 className="text-sm font-semibold text-slate-700">Flow Test Simulator</h3> </div> <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full"> <XMarkIcon className="w-5 h-5" /> </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {log.map((entry, index) => {
          if (entry.type === 'ACTION_SEND_MESSAGE') {
          return <ChatMessage key={`log-send-${index}`} text={entry.processedText} isBot={true} />;
              }
          if (entry.type === 'ACTION_ASK_QUESTION') {
            return (
              <QuestionWithOptions
                key={`log-ask-${index}`}
                question={entry.question}
                answers={entry.answers}
                onAnswerSelect={(answerHandleId) => onUserAnswer(entry.nodeId, answerHandleId)}
              />
            );
          }
          if (entry.type === 'USER_RESPONSE') {
            const questionNode = log.find(l => l.type === 'ACTION_ASK_QUESTION' && l.nodeId === entry.questionNodeId);
            const answerText = questionNode?.answers?.find(a => a.id === entry.answerHandleId)?.text || entry.answerText || entry.answerHandleId;
            return <ChatMessage key={`log-userresp-${index}`} text={answerText} isBot={false} />;
          }
          // --- NEW: Render ACTION_ADD_TAG ---
          if (entry.type === 'ACTION_ADD_TAG') {
            return (
              <div key={`log-addtag-${index}`} className="my-2 p-2 text-xs text-indigo-700 bg-indigo-50 rounded-md flex items-center justify-center italic">
                <TagIcon className="w-4 h-4 mr-1.5 flex-shrink-0"/> {/* Assuming TagIcon is imported if AddTagNode exists */}
                <span>System: Added tag "<span className="font-semibold">{entry.tagName}</span>"</span>
              </div>
            );
          }
          // --- NEW: Render ACTION_ASSIGN_GROUP ---
          if (entry.type === 'ACTION_ASSIGN_GROUP') {
            return (
              <div key={`log-assigngroup-${index}`} className="my-2 p-2 text-xs text-teal-700 bg-teal-50 rounded-md flex items-center justify-center italic">
                <UserGroupIcon className="w-4 h-4 mr-1.5 flex-shrink-0"/>
                <span>System: Chat assigned to group "<span className="font-semibold">{entry.groupName}</span>"</span>
              </div>
            );
          }
          if (entry.type === 'ACTION_SET_VARIABLE') {
            return (
              <div key={`log-setvar-${index}`} className="my-2 p-2 text-xs text-cyan-700 bg-cyan-50 rounded-md flex items-center justify-center italic">
                <LogSetVariableIcon className="w-4 h-4 mr-1.5 flex-shrink-0"/>
                <span>System: Set <span className="font-semibold font-mono">{entry.variableName}</span> to "<span className="font-semibold">{String(entry.valueSet)}</span>"</span>
              </div>
            );
          }
          if (entry.type === 'ACTION_LOOP_ITERATION' || entry.type === 'ACTION_LOOP_COMPLETED') {
            return (
              <div key={`log-loop-${index}`} className="my-1 p-1.5 text-xxs text-purple-700 bg-purple-50 rounded-md flex items-center justify-center italic">
                <ArrowPathIcon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-purple-500"/>
                <span>System: {entry.message || (entry.type === 'ACTION_LOOP_COMPLETED' ? `Loop on node ${entry.loopNodeId} completed.` : `Loop action`)}</span>
              </div>
            );
          }
          if (entry.type === 'ACTION_SCHEDULE_DELAY') {
            return (
              <div key={`log-delay-${index}`} className="my-2 p-2 text-xs text-orange-700 bg-orange-50 rounded-md flex items-center justify-center italic">
                <ClockIcon className="w-4 h-4 mr-1.5 flex-shrink-0 text-orange-500"/>
                <span>System: {entry.message}</span>
              </div>
            );
          }
          if (entry.type === 'FLOW_END' || entry.type === 'SIMULATION_END') {
            return ( <div key={`log-end-${index}`} className="text-center text-xs text-slate-400 italic py-2 my-2 border-y border-slate-200"> --- {entry.message || 'Flow Path Ended'} --- </div> );
          }
          if (entry.type === 'ERROR' || entry.type === 'WARNING') {
            return ( <div key={`log-err-${index}`} className={`text-xs p-1.5 rounded my-1 ${entry.type === 'ERROR' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}> <strong>{entry.type}:</strong> {entry.message} </div> );
          }
          // Optionally log NODE_EXECUTION for debugging, but not usually shown to user
          // if (entry.type === 'NODE_EXECUTION') {
          //   return <div key={`log-exec-${index}`} className="text-xxs text-slate-400 italic my-0.5">Executing: {entry.nodeType} ({entry.nodeId})</div>;
          // }
          return null;
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* User Input Area */}
      {currentQuestionNodeId && (
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type your answer..." onKeyPress={(e) => { if (e.key === 'Enter') handleSendUserInput(); }} className="flex-grow px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"/>
            <button onClick={handleSendUserInput} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex-shrink-0" title="Send">
              <PaperAirplaneIcon className="w-5 h-5 transform rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSimulatorSidebar;