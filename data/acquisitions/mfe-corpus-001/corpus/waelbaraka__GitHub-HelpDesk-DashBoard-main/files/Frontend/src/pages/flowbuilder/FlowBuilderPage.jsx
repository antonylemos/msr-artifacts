// src/pages/flowbuilder/FlowBuilderPage.jsx
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import  {ReactFlow,
  ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, MiniMap, MarkerType, useReactFlow, Handle, Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LoopNode from './customNodes/LoopNode'; // <-- IMPORT
import { ArrowPathIcon as PaletteLoopIcon } from '@heroicons/react/24/outline'; // For palette
import StartNode from './customNodes/StartNode';
import SendMessageNode from './customNodes/SendMessageNode';
import AskQuestionNode from './customNodes/AskQuestionNode';
import ConditionNode from './customNodes/ConditionNode';
import AddTagNode from './customNodes/AddTagNode';
import AssignToGroupNode from './customNodes/AssignToGroupNode';
import SetVariableNode from './customNodes/SetVariableNode';
import { getContextValue, replacePlaceholders, setContextValue } from './utils/flowUtils';
import DelayNode from './customNodes/DelayNode';
import ConfirmationModal from '../../components/common/ConfirmationModal'; // Adjust path

import NodePalette from './NodePalette';
import SettingsPanel from './SettingsPanel';
import ChatSimulatorSidebar from './ChatSimulatorSidebar';
import { PlayIcon, ArrowPathIcon, DocumentPlusIcon, FolderOpenIcon, TrashIcon } from '@heroicons/react/24/solid';

// --- Initial Flow Data & ID Generation (as in the previous correct version) ---
let idCounterGlobal = 0;
const initializeIdCounterFromNodes = (nodesArray) => {
    let maxIdNum = 0;
    (nodesArray || []).forEach(node => {
        const parts = node.id.split('_'); const numPart = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(numPart)) maxIdNum = Math.max(maxIdNum, numPart);
        if (node.data?.answers) { (node.data.answers || []).forEach(ans => { if (ans && ans.id) { const ansParts = ans.id.split('_'); const ansNumPart = parseInt(ansParts[ansParts.length - 1], 10); if (!isNaN(ansNumPart)) maxIdNum = Math.max(maxIdNum, ansNumPart); }});}
        if (node.data?.conditions) { (node.data.conditions || []).forEach(cond => { if (cond && cond.id) { const condParts = cond.id.split('_'); const condNumPart = parseInt(condParts[condParts.length - 1], 10); if (!isNaN(condNumPart)) maxIdNum = Math.max(maxIdNum, condNumPart); }});}
    });
    idCounterGlobal = maxIdNum;
    console.log("idCounterGlobal RE-INITIALIZED to:", idCounterGlobal); // For debugging load/new
};
// Initialize the counter based on the static initialNodesData *once* at module level



function getUniqueNodeId(prefix = 'node_') {
  idCounterGlobal += 1;
  return `${prefix}${idCounterGlobal}`;
}



const _initialStartNodeId = 'start_1'; const _initialMsgWelcomeId = 'msg_welcome_1'; const _initialAskQ1Id = 'askq_1'; const _initialAskQ1AnsProdId = 'askq_1_ans_product'; const _initialAskQ1AnsSupportId = 'askq_1_ans_support'; const _initialCond1Id = 'cond_1'; const _initialCond1C1Id = 'cond_1_c1'; const _initialMsgProdId = 'msg_prod_info_1'; const _initialMsgSupportId = 'msg_support_route_1'; const _initialEndId = 'end_1';
const initialNodesData = [ { id: _initialStartNodeId, type: 'startNode', data: { label: 'On New Chat', triggerType: 'NEW_CHAT_STARTED', triggerKeywords: [] }, position: { x: 250, y: 25 } }, { id: _initialMsgWelcomeId, type: 'sendMessageNode', data: { messageText: 'Welcome, {{trigger.data.visitorName}}! You said: "{{trigger.data.messageText}}". How can I help?' }, position: { x: 250, y: 175 } }, { id: _initialAskQ1Id, type: 'askQuestionNode', data: { questionText: 'Are you looking for product information or support?', answers: [ { id: _initialAskQ1AnsProdId, text: 'Product Info' }, { id: _initialAskQ1AnsSupportId, text: 'Support' } ] }, position: { x: 250, y: 325 } }, { id: _initialCond1Id, type: 'conditionNode', data: { label: 'Is Support Query?', conditionLogic: 'AND', conditions: [{id: _initialCond1C1Id, sourceField: `answer_handle_${_initialAskQ1Id}`, operator: 'EQUALS', value: _initialAskQ1AnsSupportId }] }, position: { x: 250, y: 500 } }, { id: _initialMsgProdId, type: 'sendMessageNode', data: { messageText: 'Great! Check out our products at example.com/products' }, position: { x: 100, y: 650 } }, { id: _initialMsgSupportId, type: 'sendMessageNode', data: { messageText: 'Okay, I see you selected Support. Routing you now.' }, position: { x: 400, y: 650 } }, { id: _initialEndId, type: 'endNode', data: { label: 'End Flow' }, position: { x: 250, y: 800 } } ];
const initialEdgesData = [ { id: getUniqueNodeId('e_'), source: _initialStartNodeId, target: _initialMsgWelcomeId, markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialMsgWelcomeId, target: _initialAskQ1Id, markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialAskQ1Id, sourceHandle: _initialAskQ1AnsProdId, target: _initialMsgProdId, label: 'Product Info', markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialAskQ1Id, sourceHandle: _initialAskQ1AnsSupportId, target: _initialCond1Id, label: 'Support', markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialCond1Id, sourceHandle: `${_initialCond1Id}-true`, target: _initialMsgSupportId, label: 'Is Support', markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialCond1Id, sourceHandle: `${_initialCond1Id}-false`, target: _initialMsgProdId, label: 'Not Support (-> Prod)', markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialMsgProdId, target: _initialEndId, targetHandle: `${_initialEndId}-target`, markerEnd: { type: MarkerType.ArrowClosed } }, { id: getUniqueNodeId('e_'), source: _initialMsgSupportId, target: _initialEndId, targetHandle: `${_initialEndId}-target`, markerEnd: { type: MarkerType.ArrowClosed } }, ];
const createDefaultStartNode = () => { return { id: getUniqueNodeId('start_flow_'), type: 'startNode', data: { label: 'On New Chat', triggerType: 'NEW_CHAT_STARTED', triggerKeywords: [] }, position: { x: 150, y: 50 }, draggable: false, deletable: false, }; };
const LOCAL_STORAGE_FLOWS_KEY = 'reactFlowBuilderFlows';
initializeIdCounterFromNodes(initialNodesData);

 // Ref for the "Open" button
const FlowCanvasAndLogic = ({ sectionConfig }) => {
    const [isOpenFlowDropdownOpen, setIsOpenFlowDropdownOpen] = useState(false);
      const [showNewFlowConfirm, setShowNewFlowConfirm] = useState(false);
const [isSaving, setIsSaving] = useState(false);
const [isLoading, setIsLoading] = useState(false);
  const openFlowButtonRef = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(() => { initializeIdCounterFromNodes(initialNodesData); return initialNodesData; });
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);
  const [selectedNode, setSelectedNode] = useState(null);
  const flowWrapperRef = useRef(null);
  const { screenToFlowPosition, getNodes, getEdges, fitView } = useReactFlow();
  const [simulationLog, setSimulationLog] = useState([]);
  const [isSimulatorVisible, setIsSimulatorVisible] = useState(false);
  const [currentFlowRunner, setCurrentFlowRunner] = useState(null);
  const [currentTriggerContext, setCurrentTriggerContext] = useState(null);
  const [isWaitingForUserInput, setIsWaitingForUserInput] = useState(false);
  const [flowName, setFlowName] = useState("My Automation Flow");
  const [savedFlows, setSavedFlows] = useState([]);
  const [currentFlowId, setCurrentFlowId] = useState(null);
  
   

  useEffect(() => { const storedFlows = localStorage.getItem(LOCAL_STORAGE_FLOWS_KEY); if (storedFlows) { setSavedFlows(JSON.parse(storedFlows)); } }, []);
  useEffect(() => { if (nodes.length > 0 && fitView) { setTimeout(() => fitView({ padding: 0.2, duration: 250 }), 50); } }, [nodes, fitView]);

  const nodeTypes = useMemo(() => ({ delayNode: DelayNode, startNode: StartNode, sendMessageNode: SendMessageNode, askQuestionNode: AskQuestionNode,loopNode: LoopNode,
     conditionNode: ConditionNode, addTagNode: AddTagNode, assignToGroupNode: AssignToGroupNode, setVariableNode: SetVariableNode,
      endNode: ({data, id, isConnectable}) => ( <div className="px-3 py-1.5 shadow-md rounded-full bg-slate-600 text-white border-2 border-slate-700 text-xs text-center min-w-[80px] relative"> <Handle type="target" position={Position.Top} id={`${id}-target`} isConnectable={isConnectable} className="!w-2.5 !h-2.5 !bg-slate-400 !border-slate-500" style={{ top: '-4px', opacity: 0.5 }}/> {data?.label || 'End'} </div> ), }), []);
  const onConnect = useCallback(  (params) => {
        const newEdge = {
            ...params,
            animated: true,
            type: 'smoothstep', // Or 'default', 'straight', 'step'
            markerEnd: { type: MarkerType.ArrowClosed }
        };

        // Add specific styling for edges from ConditionNode
        const sourceNode = getNodes().find(node => node.id === params.source);
        if (sourceNode && sourceNode.type === 'conditionNode') {
            if (params.sourceHandle === `${sourceNode.id}-true`) {
                newEdge.label = 'TRUE';
                newEdge.labelStyle = { fill: '#16a34a', fontWeight: 600, fontSize: '10px' };
                newEdge.style = { stroke: '#16a34a', strokeWidth: 1.5 };
            } else if (params.sourceHandle === `${sourceNode.id}-false`) {
                newEdge.label = 'FALSE';
                newEdge.labelStyle = { fill: '#dc2626', fontWeight: 600, fontSize: '10px' };
                newEdge.style = { stroke: '#dc2626', strokeWidth: 1.5 };
            }
            newEdge.labelBgStyle = { fill: 'white', fillOpacity: 0.8 };
            newEdge.labelBgPadding = [4, 2];
            newEdge.labelBgBorderRadius = 2;
        }
        // Add styling for edges from AskQuestionNode
        else if (sourceNode && sourceNode.type === 'askQuestionNode' && params.sourceHandle) {
            const answer = sourceNode.data.answers.find(ans => ans.id === params.sourceHandle);
            newEdge.label = answer?.text.substring(0, 15) + (answer?.text.length > 15 ? '...' : '') || 'Option';
            newEdge.labelStyle = { fill: '#4f46e5', fontWeight: 500, fontSize: '10px' }; // Indigo-600
            newEdge.labelBgStyle = { fill: 'white', fillOpacity: 0.7 };
            newEdge.labelBgPadding = [4, 2];
            newEdge.labelBgBorderRadius = 2;
        }

        setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, getNodes] // getNodes is from useReactFlow()
 );

  const onNodeClick = useCallback((event, node) => { setSelectedNode(node); }, []);
  const onPaneClick = useCallback(() => { setSelectedNode(null); }, []);
  const onDragOver = useCallback((event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }, []);
  const onDrop = useCallback( (event) => { 
    event.preventDefault(); const type = event.dataTransfer.getData('application/reactflow-nodetype');
     if (typeof type === 'undefined' || !type || type === 'startNode')
       { return; } 
     const position = screenToFlowPosition({ x: event.clientX, y: event.clientY }); const newNodeIdSuffix = type.toLowerCase().replace('node', '').replace(/[^a-z0-9]/gi, '');
      const newNodeId = getUniqueNodeId(`${newNodeIdSuffix}_`); 
  let newNodeData = { label: `${type.replace(/([A-Z])/g, ' $1').trim()}` }; if (type === 'sendMessageNode') newNodeData = { messageText: 'Configure message...' };

  
   else if (type === 'askQuestionNode') { newNodeData = { questionText: 'Your Question?', answers: [ { id: getUniqueNodeId('ans_'), text: 'Option A' }, 
    { id: getUniqueNodeId('ans_'), text: 'Option B' } ] }; }
    else if (type === 'loopNode') {
        newNodeData = {
          label: 'For Each Item',
          listSourcePath: '',
          currentItemVariable: 'loop.item',
          isValid: false // Invalid until configured
        };
      }
    else if (type === 'delayNode') {
  newNodeData = { label: 'Wait 5 minutes', duration: 5, unit: 'minutes', isValid: false }; // Mark as invalid initially
}
    else if (type === 'setVariableNode') { newNodeData = { label: 'Set Variable', variableName: 'flow.myNewVariable', variableValue: '' }; } else if (type === 'conditionNode') { newNodeData = { label: 'New Condition', conditionLogic: 'AND', conditions: [{id: getUniqueNodeId('cond_'), sourceField: '', operator: 'EQUALS', value: ''}] }; } else if (type === 'addTagNode') { newNodeData = { label: 'Add Tag Action', tagName: '' }; }
     else if (type === 'assignToGroupNode') { newNodeData = { label: 'Assign to Group', groupName: '' }; } else if (type === 'endNode') newNodeData = {label: 'End Flow'}; setNodes((nds) => nds.concat({ id: newNodeId, type, position, data: newNodeData })); }, [screenToFlowPosition, setNodes] );
  const updateNodeData = useCallback( (nodeId, newData) => { setNodes((nds) => nds.map((node) => node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node )); if (selectedNode && selectedNode.id === nodeId) { setSelectedNode(prevNode => ({ ...prevNode, data: { ...prevNode.data, ...newData } })); } }, [setNodes, selectedNode] );

  function* flowRunner(flowNodes, flowEdges, initialContextFromTrigger = {}) {
    let currentExecutionContext = JSON.parse(JSON.stringify(initialContextFromTrigger));
    let startNode;
    if (currentExecutionContext.trigger?.type) {
        startNode = flowNodes.find(n => n.type === 'startNode' && n.data?.triggerType === currentExecutionContext.trigger.type);
    }
    if (!startNode) {
        startNode = flowNodes.find(n => n.type === 'startNode');
    }
    if (!startNode) { yield { type: 'ERROR', message: 'No suitable StartNode found for the trigger.' }; return; }
    let currentNodeId = startNode.id;
    yield { type: 'TRIGGER_FIRED', triggerTypeFired: currentExecutionContext.trigger?.type || startNode.data?.triggerType || 'UNKNOWN', initialContextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)), startingNodeId: currentNodeId};
    const maxSteps = 30; let steps = 0;
    const loopCounters = {}; 

    while (currentNodeId && steps < maxSteps) {
      const currentNode = flowNodes.find(n => n.id === currentNodeId);
      if (!currentNode) { yield { type: 'ERROR', message: `Node not found: ${currentNodeId}` }; return; }
      yield { type: 'NODE_EXECUTION', nodeId: currentNode.id, nodeType: currentNode.type, data: currentNode.data, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) };
      steps++; let nextEdge = null; let userAnswer = null;

      switch (currentNode.type) {
        case 'startNode': nextEdge = flowEdges.find(e => e.source === currentNodeId); break;
        case 'sendMessageNode': let messageText = currentNode.data.messageText || ""; const processedMessage = replacePlaceholders(messageText, currentExecutionContext); yield { type: 'ACTION_SEND_MESSAGE', originalText: messageText, processedText: processedMessage, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) }; nextEdge = flowEdges.find(e => e.source === currentNodeId); break;
        case 'askQuestionNode': 
        let questionText = currentNode.data.questionText || "";
         const processedQuestion = replacePlaceholders(questionText, currentExecutionContext); 
         const processedAnswers = (currentNode.data.answers || []).map(ans => ({ ...ans, text: replacePlaceholders(ans.text, currentExecutionContext) }));
          userAnswer = yield { type: 'ACTION_ASK_QUESTION', nodeId: currentNode.id, 
            originalQuestion: questionText, processedQuestion: processedQuestion, 
            
            answers: processedAnswers, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) };
              if (userAnswer && userAnswer.questionNodeId === currentNode.id && userAnswer.answerHandleId) {
                const selectedAnswerObject = processedAnswers.find(a => a.id === userAnswer.answerHandleId);
                // SET CONTEXT for both handle ID and text
                setContextValue(currentExecutionContext, `answer_handle_${currentNode.id}`, userAnswer.answerHandleId);
                setContextValue(currentExecutionContext, `answer_text_${currentNode.id}`, selectedAnswerObject?.text);
                nextEdge = flowEdges.find(e => e.source === currentNodeId && e.sourceHandle === userAnswer.answerHandleId);
              }
                 else { nextEdge = flowEdges.find(e => e.source === currentNodeId && !e.sourceHandle); if(!nextEdge) yield { type: 'INFO', message: `Path ended at Question Node ${currentNode.id} (no matching/default answer path).` }; } break;
        
        case 'conditionNode':
          let overallConditionMet = false; // <<<< DECLARED HERE
          const nodeConditions = currentNode.data.conditions || [];
          const conditionLogic = currentNode.data.conditionLogic || 'AND';

          if (nodeConditions.length === 0) {
            overallConditionMet = true;
            yield { type: 'INFO', message: `ConditionNode ${currentNode.id} has no conditions, defaulting to TRUE path.`};
          } else {
            let results = [];
            let brokenEarlyInLoop = false; // To track if loop exited due to AND false or OR true
            for (const cond of nodeConditions) {
              let actualValue = getContextValue(currentExecutionContext, cond.sourceField);
              const valueToCompareRaw = cond.value || "";
              const valueToCompareResolved = replacePlaceholders(String(valueToCompareRaw), currentExecutionContext);
              let currentConditionResult = false;

              switch (cond.operator) {
                case 'EQUALS': currentConditionResult = String(actualValue).toLowerCase() === String(valueToCompareResolved).toLowerCase(); break;
                case 'NOT_EQUALS': currentConditionResult = String(actualValue).toLowerCase() !== String(valueToCompareResolved).toLowerCase(); break;
                case 'CONTAINS': if (Array.isArray(actualValue)) { currentConditionResult = actualValue.some(item => String(item).toLowerCase().includes(String(valueToCompareResolved).toLowerCase())); } else { currentConditionResult = String(actualValue ?? '').toLowerCase().includes(String(valueToCompareResolved ?? '').toLowerCase()); } break;
                case 'NOT_CONTAINS': if (Array.isArray(actualValue)) { currentConditionResult = !actualValue.some(item => String(item).toLowerCase().includes(String(valueToCompareResolved).toLowerCase())); } else { currentConditionResult = !String(actualValue ?? '').toLowerCase().includes(String(valueToCompareResolved ?? '').toLowerCase()); } break;
                case 'STARTS_WITH': currentConditionResult = String(actualValue ?? '').toLowerCase().startsWith(String(valueToCompareResolved ?? '').toLowerCase()); break;
                case 'ENDS_WITH': currentConditionResult = String(actualValue ?? '').toLowerCase().endsWith(String(valueToCompareResolved ?? '').toLowerCase()); break;
                case 'IS_SET': currentConditionResult = actualValue !== undefined && actualValue !== null && String(actualValue).trim() !== ''; break;
                case 'IS_NOT_SET': currentConditionResult = actualValue === undefined || actualValue === null || String(actualValue).trim() === ''; break;
                case 'GREATER_THAN': currentConditionResult = !isNaN(parseFloat(actualValue)) && !isNaN(parseFloat(valueToCompareResolved)) && parseFloat(actualValue) > parseFloat(valueToCompareResolved); break;
                case 'LESS_THAN': currentConditionResult = !isNaN(parseFloat(actualValue)) && !isNaN(parseFloat(valueToCompareResolved)) && parseFloat(actualValue) < parseFloat(valueToCompareResolved); break;
                default: currentConditionResult = false;
              }
              results.push(currentConditionResult);
              yield { type: 'CONDITION_EVALUATION', conditionId: cond.id, condition: cond, actualValueRendered: String(actualValue), valueToCompareRendered: String(valueToCompareResolved), result: currentConditionResult, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext))};

              if (conditionLogic === 'AND' && !currentConditionResult) {
                overallConditionMet = false; brokenEarlyInLoop = true; break;
              }
              if (conditionLogic === 'OR' && currentConditionResult) {
                overallConditionMet = true; brokenEarlyInLoop = true; break;
              }
            }

            if (!brokenEarlyInLoop) { // Only if loop completed normally
                if (conditionLogic === 'AND') {
                    overallConditionMet = results.length > 0 ? results.every(r => r === true) : true;
                } else if (conditionLogic === 'OR') {
                    overallConditionMet = results.length > 0 ? results.some(r => r === true) : false;
                }
            }
          }

          if (overallConditionMet) { nextEdge = flowEdges.find(e => e.source === currentNodeId && e.sourceHandle === `${currentNode.id}-true`); }
          else { nextEdge = flowEdges.find(e => e.source === currentNodeId && e.sourceHandle === `${currentNode.id}-false`); }
          if (!nextEdge) { nextEdge = flowEdges.find(e => e.source === currentNodeId && !e.sourceHandle); if (!nextEdge) yield { type: 'INFO', message: `Path ended at ConditionNode ${currentNode.id} (no TRUE/FALSE/default path taken).` }; }
          break;
        case 'loopNode':
          const listPath = currentNode.data.listSourcePath;
          const itemVarName = currentNode.data.currentItemVariable;
          const indexVarName = currentNode.data.currentIndexVariable;

          let listToIterate = getContextValue(currentExecutionContext, listPath);
          if (typeof listToIterate === 'string' && listToIterate.startsWith('{{') && listToIterate.endsWith('}}')) {
              // If listSourcePath itself is a placeholder, resolve it.
              listToIterate = getContextValue(currentExecutionContext, listToIterate.slice(2,-2).trim());
          }


          if (!Array.isArray(listToIterate)) {
            yield { type: 'WARNING', message: `LoopNode ${currentNode.id}: listSourcePath "${listPath}" did not resolve to an array. Skipping loop.` };
            nextEdge = flowEdges.find(e => e.source === currentNodeId && e.sourceHandle === `${currentNode.id}-done`); // Go to "Done" path
            if (!nextEdge) nextEdge = flowEdges.find(e => e.source === currentNodeId && !e.sourceHandle); // Fallback
            break;
          }

          loopCounters[currentNode.id] = loopCounters[currentNode.id] === undefined ? 0 : loopCounters[currentNode.id] + 1;
          const currentIndex = loopCounters[currentNode.id];

          if (currentIndex < listToIterate.length) {
            const currentItem = listToIterate[currentIndex];
            if (itemVarName) setContextValue(currentExecutionContext, itemVarName, currentItem);
            if (indexVarName) setContextValue(currentExecutionContext, indexVarName, currentIndex);

            yield {
              type: 'ACTION_LOOP_ITERATION',
              loopNodeId: currentNode.id,
              currentIndex,
              currentItem,
              message: `Looping: Item ${currentIndex + 1} of ${listToIterate.length}`,
              contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext))
            };
            nextEdge = flowEdges.find(e => e.source === currentNodeId && e.sourceHandle === `${currentNode.id}-loopBody`);
          } else {
            // Loop finished
            yield { type: 'ACTION_LOOP_COMPLETED', loopNodeId: currentNode.id, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) };
            delete loopCounters[currentNode.id]; // Reset counter for this loop ID
            // Clean up loop variables from context (optional, good practice)
            if (itemVarName) setContextValue(currentExecutionContext, itemVarName, undefined); // Or delete using a helper
            if (indexVarName) setContextValue(currentExecutionContext, indexVarName, undefined);

            nextEdge = flowEdges.find(e => e.source === currentNodeId && e.sourceHandle === `${currentNode.id}-done`);
          }
          break;

        case 'setVariableNode': 
        const varName = currentNode.data.variableName; 
        const rawValueToSet = currentNode.data.variableValue; 
        if (varName && rawValueToSet !== undefined)
           { const resolvedValue = replacePlaceholders(String(rawValueToSet),
             currentExecutionContext); let finalValue = resolvedValue; 
             if (resolvedValue.toLowerCase() === 'true') finalValue = true;
              else if (resolvedValue.toLowerCase() === 'false') finalValue = false;
               else if (!isNaN(parseFloat(resolvedValue)) && isFinite(resolvedValue)) 
                { if (resolvedValue.includes('.')) finalValue = parseFloat(resolvedValue); 
                  else finalValue = parseInt(resolvedValue, 10); } 
                  setContextValue(currentExecutionContext, varName.trim(), finalValue); 
                  yield { type: 'ACTION_SET_VARIABLE', variableName: varName.trim(), 
                    valueSet: finalValue, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) }; } else { yield { type: 'WARNING', message: `SetVariableNode ${currentNode.id} is missing variableName or variableValue.`}; } nextEdge = flowEdges.find(e => e.source === currentNodeId); break;
       
       
       
                    case 'addTagNode': const tagNameRaw = currentNode.data.tagName || ""; const processedTagName = replacePlaceholders(tagNameRaw, currentExecutionContext); if (processedTagName) { if (!currentExecutionContext.contact) currentExecutionContext.contact = { tags: [] }; if (!Array.isArray(currentExecutionContext.contact.tags)) currentExecutionContext.contact.tags = []; if (!currentExecutionContext.contact.tags.some(t => t.toLowerCase() === processedTagName.toLowerCase())) { currentExecutionContext.contact.tags.push(processedTagName); } setContextValue(currentExecutionContext, 'contact.tags', [...currentExecutionContext.contact.tags]); yield { type: 'ACTION_ADD_TAG', tagName: processedTagName, contactId: getContextValue(currentExecutionContext, 'contact.id'), contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext))}; } else { yield { type: 'WARNING', message: `AddTagNode ${currentNode.id} has no tagName configured.`}; } nextEdge = flowEdges.find(e => e.source === currentNodeId); break;
        case 'assignToGroupNode': let groupNameToAssign = currentNode.data.groupName; if (groupNameToAssign === 'USE_PLACEHOLDER' && currentNode.data.groupNamePlaceholder) { groupNameToAssign = replacePlaceholders(currentNode.data.groupNamePlaceholder, currentExecutionContext); } if (groupNameToAssign) { setContextValue(currentExecutionContext, 'chat.assignedGroup', groupNameToAssign); yield { type: 'ACTION_ASSIGN_GROUP', groupName: groupNameToAssign, chatId: getContextValue(currentExecutionContext, 'chat.id'), contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) }; } else { yield { type: 'WARNING', message: `AssignToGroupNode ${currentNode.id} has no groupName configured.`}; } nextEdge = flowEdges.find(e => e.source === currentNodeId); break;
        case 'delayNode': const duration = parseInt(currentNode.data.duration, 10); const unit = currentNode.data.unit; if (isNaN(duration) || duration <= 0 || !unit) { yield { type: 'WARNING', message: `DelayNode ${currentNode.id} has invalid configuration. Skipping delay.` }; } else { yield { type: 'ACTION_SCHEDULE_DELAY', duration, unit, message: `SIMULATING: Would wait for ${duration} ${unit}. Proceeding immediately.`, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) }; } nextEdge = flowEdges.find(e => e.source === currentNodeId); break;
        case 'endNode': yield { type: 'FLOW_END', nodeId: currentNode.id, contextSnapshot: JSON.parse(JSON.stringify(currentExecutionContext)) }; return;
        default: yield { type: 'WARNING', message: `Unknown node type: ${currentNode.type}` }; nextEdge = flowEdges.find(e => e.source === currentNodeId);
      }
      if (nextEdge) { currentNodeId = nextEdge.target; } else { if(currentNode.type !== 'endNode') { yield { type: 'INFO', message: `Flow path naturally ended: No outgoing edge from ${currentNode.id} (Type: ${currentNode.type})` }; } return; }
    }
    if (steps >= maxSteps) { yield { type: 'ERROR', message: 'Max steps reached, possibly an infinite loop.' }; }
  }
  
 const startFlowSimulationWithTrigger = (triggerType, triggerData = {}) => {
    const currentFlowNodes = getNodes();
    const currentFlowEdges = getEdges();
    const initialContext = {
        trigger: { type: triggerType, data: triggerData }, // Standardize trigger data
        contact: triggerData.contact || { name: 'Guest', tags: [] }, // Example contact data
        chat: triggerData.chat || { id: `sim_${Date.now()}`, source: 'Test' },
        // other global context items can be added here
    };
    // If triggerData has messageText, make it easily accessible
    if (triggerData.messageText) {
        initialContext.messageText = triggerData.messageText;
    }


    console.log("--- STARTING NEW FLOW SIMULATION ---");
    console.log("INITIAL CONTEXT:", JSON.parse(JSON.stringify(initialContext)));
    setSimulationLog([]);
    setIsSimulatorVisible(true);
    setIsWaitingForUserInput(false);
    setCurrentTriggerContext(initialContext); // Store full initial context

    const runner = flowRunner(currentFlowNodes, currentFlowEdges, initialContext);
    setCurrentFlowRunner(runner);
    processFlowStep(runner);
  };


  const processFlowStep = (runner, userAnswerFromSimulator) => {
    if (!runner) return;
    setIsWaitingForUserInput(false);
    const { value: logEntry, done } = runner.next(userAnswerFromSimulator);
    if (logEntry) { setSimulationLog(prevLog => [...prevLog, logEntry]); }
    if (done) { setSimulationLog(prevLog => [...prevLog, {type: 'SIMULATION_END', message: 'Flow processing complete.'}]); setCurrentFlowRunner(null); return; }
   if (logEntry && logEntry.type === 'ACTION_ASK_QUESTION') {
        setIsWaitingForUserInput(true);
    } else if (!done) {
        // If it was a simulated delay, add a slightly longer pause for visual effect in simulator
        const delayDuration = logEntry && logEntry.type === 'ACTION_SCHEDULE_DELAY' ? 1000 : 200; // 1 sec for delay, 0.2 for others
        setTimeout(() => processFlowStep(runner), delayDuration);
    }
  };

  const handleUserSimulationAnswer = (questionNodeId, answerHandleId) => {
    const currentFlowNodes = getNodes();
    const questionNode = currentFlowNodes.find(n => n.id === questionNodeId);
    const answerClicked = questionNode?.data.answers?.find(a => a.id === answerHandleId);
    setSimulationLog(prevLog => [...prevLog, { type: 'USER_RESPONSE', questionNodeId, answerHandleId, answerText: answerClicked?.text || answerHandleId }]);
    if (currentFlowRunner) { processFlowStep(currentFlowRunner, { questionNodeId, answerHandleId }); }
  };

  const handleUserFreeTextReply = (questionNodeId, freeText) => {
    setSimulationLog(prevLog => [...prevLog, { type: 'USER_RESPONSE', questionNodeId, answerText: freeText, isFreeText: true }]);
    if (currentFlowRunner) {
        const currentFlowNodes = getNodes();
        const questionNode = currentFlowNodes.find(n => n.id === questionNodeId);
        let matchedAnswerHandleId = null;
        if (questionNode && questionNode.data.answers) {
            const matchedAnswer = questionNode.data.answers.find(ans => ans.text.toLowerCase() === freeText.toLowerCase());
            if (matchedAnswer) matchedAnswerHandleId = matchedAnswer.id;
            // Add more sophisticated matching logic here if needed
        }
        console.log(`Free text "${freeText}" for Q(${questionNodeId}) mapped to handle: ${matchedAnswerHandleId}`);
        processFlowStep(currentFlowRunner, { questionNodeId, answerHandleId: matchedAnswerHandleId });
    }
  };

  const handleResetSimulation = () => {
    setSimulationLog([]);
    setCurrentFlowRunner(null);
    setIsWaitingForUserInput(false);
    // setIsSimulatorVisible(false); // Optionally close simulator
  };
  // --- Save, Load, New Flow Logic ---
 const handleSaveFlow = useCallback(() => {
    const currentNodes = getNodes(); // <-- Use getNodes() from useReactFlow
    const currentEdges = getEdges(); // <-- Use getEdges() from useReactFlow
  setIsSaving(true);

    // Find the start node from the current nodes on the canvas
    const startNode = currentNodes.find(n => n.type === 'startNode');
    const startNodeData = startNode?.data || {};

    const flowToSave = {
      id: currentFlowId || `flow_${Date.now()}_${Math.random().toString(36).substr(2,5)}`, // More unique ID for new flows
      name: flowName.trim() || 'Untitled Flow',
      trigger: {
        type: startNodeData.triggerType || 'NEW_CHAT_STARTED',
        keywords: startNodeData.triggerKeywords || [],
        // Add any other relevant trigger parameters from startNodeData
      },
      nodes: currentNodes,
      edges: currentEdges,
      lastSaved: new Date().toISOString(),
    };

    console.log("Saving flow:", JSON.parse(JSON.stringify(flowToSave))); // For debugging

    let updatedFlows;
    const existingFlowIndex = savedFlows.findIndex(f => f.id === flowToSave.id);

    if (existingFlowIndex > -1) { // Update existing flow
      updatedFlows = [...savedFlows];
      updatedFlows[existingFlowIndex] = flowToSave;
    } else { // Save as new flow
      updatedFlows = [flowToSave, ...savedFlows];
      setCurrentFlowId(flowToSave.id); // Set current ID for future saves on this new flow
    }

    setSavedFlows(updatedFlows);
    localStorage.setItem('reactFlowBuilderFlows', JSON.stringify(updatedFlows)); // Using consistent key
    alert(`Flow "${flowToSave.name}" saved!`);
    
  }, [flowName, getNodes, getEdges, savedFlows, currentFlowId, setCurrentFlowId]); // Added setCurrentFlowId to deps

  const handleLoadFlow = useCallback((flowIdToLoad) => {
    
  const flowToLoad = savedFlows.find(f => f.id === flowIdToLoad);
    if (flowToLoad) {
        setFlowName(flowToLoad.name);
        const nodesToLoad = flowToLoad.nodes && flowToLoad.nodes.length > 0 ? flowToLoad.nodes : [createDefaultStartNode()];
        initializeIdCounterFromNodes(nodesToLoad);
        setNodes(nodesToLoad);
        setEdges(flowToLoad.edges || []);
        setCurrentFlowId(flowToLoad.id);
        setSelectedNode(null);
        setIsSimulatorVisible(false);
        setSimulationLog([]);
        setTimeout(() => fitView({ padding: 0.1, duration: 100 }), 100);
        alert(`Flow "${flowToLoad.name}" loaded!`);
    } else {
        alert("Error: Flow not found!");
    }

    setIsOpenFlowDropdownOpen(false); // Close dropdown after loading
  }, [savedFlows, setNodes, setEdges, fitView, setFlowName, setCurrentFlowId, setSelectedNode, setIsSimulatorVisible, setSimulationLog]);

 const handleNewFlow = useCallback(() => {
    if (window.confirm("Are you sure? Unsaved changes will be lost.")) {
        setFlowName("Untitled Flow");
        const newStartNode = createDefaultStartNode();
        initializeIdCounterFromNodes([newStartNode]);
        setNodes([newStartNode]);
        setEdges([]);
        setCurrentFlowId(null);
        setSelectedNode(null);
        setIsSimulatorVisible(false);
        setSimulationLog([]);
        // fitView will be called by the useEffect watching `nodes`
    }
        setIsOpenFlowDropdownOpen(false); // Close dropdown if open
  }, [setNodes, setEdges, fitView, setFlowName, setCurrentFlowId, setSelectedNode, setIsSimulatorVisible, setSimulationLog]);

   const handleDeleteFlow = useCallback((flowIdToDelete) => {
    const flowToDelete = savedFlows.find(f => f.id === flowIdToDelete);
    if (!flowToDelete) {
        console.error("Flow to delete not found:", flowIdToDelete);
        return;
    }

    if (window.confirm(`Are you sure you want to delete the flow "${flowToDelete.name}"? This action cannot be undone.`)) {
        const updatedFlows = savedFlows.filter(f => f.id !== flowIdToDelete);
        setSavedFlows(updatedFlows);
        localStorage.setItem('reactFlowBuilderFlows', JSON.stringify(updatedFlows)); // Ensure consistent key
        alert(`Flow "${flowToDelete.name}" deleted.`);

        setIsOpenFlowDropdownOpen(false); // <-- EXPLICITLY CLOSE THE DROPDOWN

        if (currentFlowId === flowIdToDelete) { // If the currently active flow was deleted
            // Optionally, load the first available flow or start a new one
            if (updatedFlows.length > 0) {
                // This is a simplified load, ideally use handleLoadFlow if it doesn't cause issues with state updates
                const firstFlow = updatedFlows[0];
                setFlowName(firstFlow.name);
                const nodesToLoad = firstFlow.nodes && firstFlow.nodes.length > 0 ? firstFlow.nodes : [createDefaultStartNode()];
                initializeIdCounterFromNodes(nodesToLoad);
                setNodes(nodesToLoad);
                setEdges(firstFlow.edges || []);
                setCurrentFlowId(firstFlow.id);
                setSelectedNode(null); // Deselect
                setIsSimulatorVisible(false);
                setSimulationLog([]);
                setTimeout(() => fitView({ padding: 0.1, duration: 100 }), 100);
            } else {
                handleNewFlow(); // If no flows left, start a new blank flow
            }
        }
    }
  }, [savedFlows, currentFlowId, handleNewFlow, setNodes, setEdges, fitView, setFlowName, setCurrentFlowId, setSelectedNode, setIsSimulatorVisible, setSimulationLog]); // Added all dependencies used in the "load first flow" or "new flow" logic
 
  const toggleOpenFlowDropdown = () => {
    setIsOpenFlowDropdownOpen(prev => !prev);
  };


   const promptNewFlow = () => {
    // Check if there are unsaved changes (more complex logic needed for true "unsaved changes")
    // For now, always show confirm if there's more than the default start node or a non-default name
    const isDirty = nodes.length > 1 || (nodes.length === 1 && nodes[0].id !== createDefaultStartNode().id) || flowName !== "Untitled Flow";
    if (isDirty) {
      setShowNewFlowConfirm(true);
    } else {
      handleNewFlowConfirmed(); // Proceed directly if no changes
    }
  };

  const handleNewFlowConfirmed = () => {
    setFlowName("Untitled Flow");
    const newStartNode = createDefaultStartNode();
    initializeIdCounterFromNodes([newStartNode]);
    setNodes([newStartNode]);
    setEdges([]);
    setCurrentFlowId(null);
    setSelectedNode(null);
    setIsSimulatorVisible(false);
    setSimulationLog([]);
    setIsOpenFlowDropdownOpen(false);
    setShowNewFlowConfirm(false);
    setTimeout(() => fitView({ padding: 0.1, duration: 100 }), 0);
  };


return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
      {/* Header */}
      <div className="bg-white p-3 border-b border-slate-200 flex-shrink-0 flex justify-between items-center h-[60px]">
         <input type="text" value={flowName} onChange={(e) => setFlowName(e.target.value)} className="text-lg font-semibold border-b-2 border-transparent focus:border-blue-500 focus:ring-0 p-1 bg-transparent text-slate-700 placeholder-slate-400 flex-grow mr-4" placeholder="Flow Name" />
        <div className="flex items-center space-x-2">
            <button onClick={() => startFlowSimulationWithTrigger(nodes.find(n=>n.type==='startNode')?.data.triggerType || 'NEW_CHAT_STARTED', { visitorName: 'Simulated User', chatSource: 'Website Test', messageText: 'Hello, I need help with my order' })} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center" title="Test current flow" > <PlayIcon className="w-4 h-4 mr-1.5"/> Test</button>
            {isSimulatorVisible && simulationLog.length > 0 && ( <button onClick={handleResetSimulation} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center" title="Reset Simulation Log" > <ArrowPathIcon className="w-4 h-4 mr-1.5"/> Reset Sim </button> )}
            <button onClick={handleNewFlow} title="New Flow" className="p-2 text-slate-600 hover:bg-slate-100 rounded-md flex items-center text-sm border border-slate-300"> <DocumentPlusIcon className="w-4 h-4 mr-1.5 text-slate-500"/> New </button>
            <div className="relative">
                <button ref={openFlowButtonRef} onClick={toggleOpenFlowDropdown} title="Open Flow" className="p-2 text-slate-600 hover:bg-slate-100 rounded-md flex items-center text-sm border border-slate-300"> <FolderOpenIcon className="w-4 h-4 mr-1.5 text-slate-500"/> Open </button>
                {isOpenFlowDropdownOpen && ( <div ref={openFlowDropdownRef} className="absolute top-full right-0 mt-1 w-64 bg-white border border-slate-200 rounded-md shadow-lg z-20 py-1 max-h-60 overflow-y-auto scrollbar-thin"> {savedFlows.length > 0 ? savedFlows.map(flow => ( <div key={flow.id} className="flex justify-between items-center px-3 py-1.5 hover:bg-slate-50"> <button onClick={() => handleLoadFlow(flow.id)} className="text-sm text-slate-700 hover:text-blue-600 text-left flex-grow truncate" title={flow.name}> {flow.name} </button> <button onClick={() => handleDeleteFlow(flow.id)} title="Delete Flow" className="p-1 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 ml-2 flex-shrink-0"> <TrashIcon className="w-4 h-4"/> </button> </div> )) : <div className="px-3 py-2 text-sm text-slate-500">No saved flows.</div> } </div> )}
            </div>
            <button onClick={handleSaveFlow} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium"> Save </button>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex flex-1 h-[calc(100%-60px)] overflow-hidden"> {/* Adjusted for potentially taller header */}
          <NodePalette />
          <div className="flex-grow h-full relative" 
          ref={flowWrapperRef} 
          onDragOver={onDragOver} onDrop={onDrop}>

            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} onNodeClick={onNodeClick} onPaneClick={onPaneClick} fitView className="bg-slate-50" deleteKeyCode={['Backspace', 'Delete']} >
              <Controls className="!z-20"  />
              <MiniMap nodeColor={(node) => { if (node.type === 'startNode')
              
              return 'rgb(134 239 172)'; 

              if (node.type === 'sendMessageNode') return 'rgb(147 197 253)'; if (node.type === 'askQuestionNode') return 'rgb(196 181 253)'; if (node.type === 'conditionNode') return 'rgb(252 211 77)'; if (node.type === 'addTagNode') return 'rgb(167 139 250)';  if (node.type === 'assignToGroupNode') return 'rgb(110 231 183)'; if (node.type === 'setVariableNode') return 'rgb(29 78 216)'; 
                if (node.type === 'delayNode') return 'rgb(249 115 22)'; if (node.type === 'endNode') return 'rgb(107 114 128)'; return '#e2e8f0'; }}
                 nodeStrokeWidth={3} pannable zoomable
                  />
             <div
  className="absolute inset-0 bg-stone-50" // White background for the canvas
  style={{
    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 0.8px, transparent 0.9px)', // Dots
    backgroundSize: '20px 20px',
  }}
/>
           
            </ReactFlow>
          </div>
          {selectedNode && !isSimulatorVisible && ( <SettingsPanel key={selectedNode.id} node={selectedNode} onUpdateNodeData={updateNodeData} onClose={() => setSelectedNode(null)} flowNodes={nodes} /> )}
          <ChatSimulatorSidebar log={simulationLog} onUserAnswer={handleUserSimulationAnswer} onUserFreeTextReply={handleUserFreeTextReply} onClose={() => { setIsSimulatorVisible(false); setCurrentFlowRunner(null); }} isVisible={isSimulatorVisible} />
      </div>
      <ConfirmationModal
        isOpen={showNewFlowConfirm}
        onClose={() => setShowNewFlowConfirm(false)}
        onConfirm={handleNewFlowConfirmed}
        title="Start New Flow?"
        message="Are you sure you want to start a new flow? Any unsaved changes to the current flow will be lost."
        confirmText="Yes, Start New"
      />
    </div>
  );
};

const FlowBuilderPage = ({ sectionConfig }) => {
    return (
        <ReactFlowProvider>
            <FlowCanvasAndLogic sectionConfig={sectionConfig} />
        </ReactFlowProvider>
    );
};

export default FlowBuilderPage;