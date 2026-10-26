// src/pages/flowbuilder/flowEngine.js

// This is the simple, non-generator based executor.
// It's different from the flowRunner generator used for the UI simulator.
export const executeFlow = (nodes, edges, startNodeId = null, simulatedUserInput = {}) => {
  const outputLog = [];
  let currentNodeId = startNodeId || nodes.find(n => n.type === 'startNode')?.id;

  if (!currentNodeId) {
    outputLog.push({ type: 'ERROR', message: 'No StartNode found or specified.' });
    return outputLog;
  }

  const maxSteps = 20;
  let steps = 0;

  while (currentNodeId && steps < maxSteps) {
    const currentNode = nodes.find(n => n.id === currentNodeId);
    if (!currentNode) {
      outputLog.push({ type: 'ERROR', message: `Flow ended: Node not found with ID ${currentNodeId}` });
      break;
    }

    outputLog.push({ type: 'NODE_EXECUTION', nodeId: currentNode.id, nodeType: currentNode.type, data: currentNode.data });
    steps++;
    let nextEdge = null;

    switch (currentNode.type) {
      case 'startNode':
        nextEdge = edges.find(e => e.source === currentNodeId);
        break;
      case 'sendMessageNode':
        outputLog.push({ type: 'ACTION_SEND_MESSAGE', message: currentNode.data.messageText });
        nextEdge = edges.find(e => e.source === currentNodeId);
        break;
      case 'askQuestionNode':
        outputLog.push({ type: 'ACTION_ASK_QUESTION', nodeId: currentNode.id, question: currentNode.data.questionText, answers: currentNode.data.answers });
        const userAnswerId = simulatedUserInput[currentNode.id];
        if (userAnswerId) {
          outputLog.push({ type: 'USER_RESPONSE', questionNodeId: currentNode.id, answerHandleId: userAnswerId });
          nextEdge = edges.find(e => e.source === currentNodeId && e.sourceHandle === userAnswerId);
        } else {
          outputLog.push({ type: 'INFO', message: `No user input for ${currentNode.id}, trying default.`});
          nextEdge = edges.find(e => e.source === currentNodeId && !e.sourceHandle);
          if(!nextEdge) outputLog.push({ type: 'INFO', message: `Path ended at ${currentNode.id} (no answer/default).` });
        }
        break;
      case 'endNode':
        outputLog.push({ type: 'FLOW_END', nodeId: currentNode.id });
        currentNodeId = null;
        continue;
      default:
        outputLog.push({ type: 'WARNING', message: `Unknown node type in executeFlow: ${currentNode.type}` });
        nextEdge = edges.find(e => e.source === currentNodeId);
    }

    if (nextEdge) {
      currentNodeId = nextEdge.target;
    } else {
      if (currentNode.type !== 'endNode') {
          outputLog.push({ type: 'INFO', message: `Flow path ended (executeFlow): No outgoing edge from ${currentNode.id}` });
      }
      currentNodeId = null;
    }
  }

  if (steps >= maxSteps) {
    outputLog.push({ type: 'ERROR', message: 'Flow execution stopped (executeFlow): Max steps reached.' });
  }
  return outputLog;
};

// If you have other utility functions for the flow engine, export them too.
// export const anotherFlowUtil = () => { ... };