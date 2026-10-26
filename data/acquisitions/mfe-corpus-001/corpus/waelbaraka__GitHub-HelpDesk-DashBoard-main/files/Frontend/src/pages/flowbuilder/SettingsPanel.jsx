import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon, Bars3BottomLeftIcon ,ExclamationCircleIcon } from '@heroicons/react/24/solid';

// Helper to generate unique IDs
const generateUniqueId = (prefix = 'id_') => `${prefix}${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
const availableChatGroups = [
  { id: 'group_sales', name: 'Sales Team' },
  { id: 'group_support_t1', name: 'Support Tier 1' },
  { id: 'group_billing', name: 'Billing Department' },
  { id: 'group_technical', name: 'Technical Issues' },
];
// Define available operators for conditions (should be relatively static)
const conditionOperators = [
  { value: 'EQUALS', label: 'Equals' }, { value: 'NOT_EQUALS', label: 'Not Equals' },
  { value: 'CONTAINS', label: 'Contains' }, { value: 'NOT_CONTAINS', label: 'Does Not Contain' },
  { value: 'STARTS_WITH', label: 'Starts With' }, { value: 'ENDS_WITH', label: 'Ends With' },
  { value: 'IS_SET', label: 'Is Set (Exists & Not Empty)' }, { value: 'IS_NOT_SET', label: 'Is Not Set (Empty or Missing)' },
  { value: 'GREATER_THAN', label: 'Greater Than (Numeric)' }, { value: 'LESS_THAN', label: 'Less Than (Numeric)' },
];

// Base context fields that are generally available
const baseAvailableContextFields = [
  { value: 'trigger.type', label: 'Trigger: Type of Trigger', group: 'Trigger Data' },
  { value: 'trigger.data.messageText', label: 'Trigger: Incoming Message Text', group: 'Trigger Data' },
  { value: 'trigger.data.visitorName', label: 'Trigger: Visitor Name', group: 'Trigger Data' },
  { value: 'trigger.data.chatSource', label: 'Trigger: Chat Source', group: 'Trigger Data'},
  { value: 'contact.id', label: 'Contact: ID', group: 'Contact Data' },
  { value: 'contact.name', label: 'Contact: Name', group: 'Contact Data' },
  { value: 'contact.email', label: 'Contact: Email', group: 'Contact Data' },
  { value: 'contact.phone', label: 'Contact: Phone', group: 'Contact Data' },
  { value: 'contact.tags', label: 'Contact: Tags (Array)', group: 'Contact Data' },
  { value: 'chat.id', label: 'Chat: ID', group: 'Chat Data' },
  // Add more static/global context variables here
];


// --- Validation Functions for each Node Type ---
const validateNodeData = (nodeType, data) => {
    const errors = {};
    switch (nodeType) {
        case 'startNode':
            if (!data.triggerType) errors.triggerType = 'Trigger type is required.';
            if (data.triggerType === 'MESSAGE_RECEIVED' && (!data.triggerKeywords || data.triggerKeywords.length === 0)) {
                errors.triggerKeywords = 'Keywords are required for this trigger type.';
            }
            break;
        case 'sendMessageNode':
            if (!data.messageText || data.messageText.trim() === '') {
                errors.messageText = 'Message text cannot be empty.';
            }
            break;
          case 'loopNode':
              if (!data.listSourcePath || data.listSourcePath.trim() === '') errors.listSourcePath = 'List source path is required.';
              if (!data.currentItemVariable || data.currentItemVariable.trim() === '') errors.currentItemVariable = 'Current item variable name is required.';
              else if (!data.currentItemVariable.startsWith('loop.')) errors.currentItemVariable = 'Item variable should start with "loop." (e.g., loop.item)';
              if (data.currentIndexVariable && !data.currentIndexVariable.startsWith('loop.')) errors.currentIndexVariable = 'Index variable should start with "loop." (e.g., loop.index)';
              break;
        case 'askQuestionNode':
            if (!data.questionText || data.questionText.trim() === '') {
                errors.questionText = 'Question text cannot be empty.';
            }
            if (!data.answers || data.answers.length < 1) { // Require at least one answer for this example
                errors.answers = 'At least one answer option is required.';
            } else {
                data.answers.forEach((ans, index) => {
                    if (!ans.text || ans.text.trim() === '') {
                        if (!errors.answerTexts) errors.answerTexts = {};
                        errors.answerTexts[index] = 'Answer text cannot be empty.';
                    }
                    if (!ans.id || ans.id.trim() === '') { // Should be auto-generated, but good check
                        if (!errors.answerIds) errors.answerIds = {};
                        errors.answerIds[index] = 'Answer ID is missing (internal error).';
                    }
                });
            }
            break;
        case 'conditionNode':
            if (!data.conditions || data.conditions.length === 0) {
                errors.conditions = 'At least one condition is required.';
            } else {
                data.conditions.forEach((cond, index) => {
                    if (!cond.sourceField) {
                         if (!errors.conditionFields) errors.conditionFields = {};
                         errors.conditionFields[index] = 'Field to check is required.';
                    }
                    if (!(cond.operator === 'IS_SET' || cond.operator === 'IS_NOT_SET') && (!cond.value || String(cond.value).trim() === '')) {
                         if (!errors.conditionValues) errors.conditionValues = {};
                         errors.conditionValues[index] = 'Value to compare is required for this operator.';
                    }
                });
            }
            break;
        case 'addTagNode':
            if (!data.tagName || data.tagName.trim() === '') {
                errors.tagName = 'Tag name cannot be empty.';
            }
            break;
        case 'assignToGroupNode':
            if (!data.groupName || data.groupName.trim() === '') {
                // If using placeholder, check placeholder field instead/also
                if (data.groupName !== 'USE_PLACEHOLDER' || !data.groupNamePlaceholder?.trim()) {
                    errors.groupName = 'Group name or placeholder is required.';
                }
            }
            break;
        case 'setVariableNode':
            if (!data.variableName || !data.variableName.trim()) {
                errors.variableName = 'Variable name cannot be empty.';
            }
          
            
            // Value can technically be empty string if intended
            break;
        
        default:
            break;
    }
    return errors;
};


const SettingsPanel = ({ node, onUpdateNodeData, onClose, flowNodes = [] }) => {
  const [localData, setLocalData] = useState({});
  const [dynamicContextFields, setDynamicContextFields] = useState([...baseAvailableContextFields]);
  const [showContextPickerFor, setShowContextPickerFor] = useState(null);
  const [validationErrors, setValidationErrors] = useState({}); // <-- NEW STATE FOR ERRORS

  
  useEffect(() => {
    // --- Populate Dynamic Context Fields ---
    const generatedFields = [];
    if (flowNodes && node) { // Ensure flowNodes and current node are available
      const nodeIndex = flowNodes.findIndex(n => n.id === node.id);

      flowNodes.forEach((n, index) => {
        if (index < nodeIndex) { // Only consider nodes that appear *before* the current one
          if (n.type === 'askQuestionNode' && n.data?.answers?.length > 0) {
             generatedFields.push({
              value: `answer_handle_${n.id}`, // e.g., answer_handle_askq_1
              label: `Selected Answer ID from: "${n.data.questionText?.substring(0, 20) || n.id}..."`,
              group: 'Flow Answers'
            });
            // Variable for the selected answer's text
            generatedFields.push({
              value: `answer_text_${n.id}`, // e.g., answer_text_askq_1
              label: `Selected Answer Text from: "${n.data.questionText?.substring(0, 20) || n.id}..."`,
              group: 'Flow Answers'
            });
          } else if (n.type === 'setVariableNode' && n.data?.variableName) {
            // Only add if variableName is not empty and doesn't already exist (to avoid duplicates from base)
            if (n.data.variableName.trim() && !baseAvailableContextFields.some(f => f.value === n.data.variableName) && !generatedFields.some(f => f.value === n.data.variableName)) {
              generatedFields.push({
                value: n.data.variableName, // e.g., flow.userName
                label: `Flow Variable: ${n.data.variableName}`,
                group: 'Flow Variables'
              });
            }else if (n.type === 'setVariableNode' && n.data?.variableName) {
            // Only add if variableName is not empty and doesn't already exist (to avoid duplicates from base)
            if (n.data.variableName.trim() && !baseAvailableContextFields.some(f => f.value === n.data.variableName) && !generatedFields.some(f => f.value === n.data.variableName)) {
              generatedFields.push({
                value: n.data.variableName, // e.g., flow.userName
                label: `Flow Variable: ${n.data.variableName}`,
                group: 'Flow Variables'
              });
            }
          } else if (n.type === 'loopNode' && n.data?.currentItemVariable) {
            // If the current node is *inside* a loop (more complex to determine topologically),
            // then loop.currentItemVariable would be available.
            // For now, let's just add it if a LoopNode exists anywhere before.
            if (n.data.currentItemVariable.trim() && !baseAvailableContextFields.some(f => f.value === n.data.currentItemVariable) && !generatedFields.some(f => f.value === n.data.currentItemVariable)) {
                 generatedFields.push({
                    value: n.data.currentItemVariable,
                    label: `Loop Item: ${n.data.currentItemVariable} (from loop ${n.data.label || n.id})`,
                    group: 'Loop Variables'
                 });
            }
            if (n.data.currentIndexVariable?.trim() && !baseAvailableContextFields.some(f => f.value === n.data.currentIndexVariable) && !generatedFields.some(f => f.value === n.data.currentIndexVariable)) {
                generatedFields.push({
                    value: n.data.currentIndexVariable,
                    label: `Loop Index: ${n.data.currentIndexVariable} (from loop ${n.data.label || n.id})`,
                    group: 'Loop Variables'
                 });
            }
          }
          // Add logic for other nodes that output to context, e.g., API Call Node
        }
      }});
    }
        const uniqueGeneratedFields = generatedFields.filter((field, index, self) =>
        index === self.findIndex((f) => (
            f.value === field.value
        ))
    );
    setDynamicContextFields([...baseAvailableContextFields, ...uniqueGeneratedFields]);    // --- End Populate Dynamic Context Fields ---

    if (node && node.data) {
      let initialNodeData = { ...node.data };
      // Default initializations for specific node types
      if (node.type === 'startNode' && !initialNodeData.triggerType) initialNodeData.triggerType = 'NEW_CHAT_STARTED';
      if (node.type === 'askQuestionNode') initialNodeData.answers = (initialNodeData.answers || []).map(ans => ({ ...ans, id: ans.id || generateUniqueId('ans_') }));
      if (node.type === 'conditionNode') {
        initialNodeData.conditionLogic = initialNodeData.conditionLogic || 'AND';
        initialNodeData.conditions = (initialNodeData.conditions || [{id: generateUniqueId('cond_'),
          sourceField: '', operator: 'EQUALS', value: ''}]).map(c => ({...c, id: c.id || generateUniqueId('cond_') }));
      }
      if (node.type === 'startNode' && initialNodeData.triggerType === 'MESSAGE_RECEIVED') {
        if (typeof initialNodeData.triggerKeywords === 'string') initialNodeData.triggerKeywords = initialNodeData.triggerKeywords.split(',').map(k => k.trim()).filter(Boolean);
        else if (!Array.isArray(initialNodeData.triggerKeywords)) initialNodeData.triggerKeywords = [];
      } else if (node.type === 'startNode' && initialNodeData.triggerType !== 'MESSAGE_RECEIVED') {
        delete initialNodeData.triggerKeywords;
      }
      setLocalData(initialNodeData);
      setValidationErrors({}); // Clear errors when node change
    } else {
       setLocalData({});
      setValidationErrors({});
    }
  }, [node, flowNodes]);

  // Memoize handlers to prevent unnecessary re-renders of child components
   const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field on change
    if (validationErrors[name]) {
        setValidationErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[name];
            return newErrors;
        });
    }
  }, [validationErrors]);

  const handleTriggerTypeChange = useCallback((e) => { /* ... as before, clear relevant validation errors if any */ 
    const newTriggerType = e.target.value; setLocalData(prev => { const newData = { ...prev, triggerType: newTriggerType };
       if (newTriggerType === 'MESSAGE_RECEIVED') { newData.triggerKeywords = prev.triggerKeywords || []; } 
       else { delete newData.triggerKeywords; } return newData; }); 
       
       setValidationErrors(prev => ({...prev, triggerType: undefined, triggerKeywords: undefined }));
       }, []);

  const handleKeywordsChange = useCallback((e) => {
    const keywordsString = e.target.value; setLocalData(prev => ({ ...prev, triggerKeywords: keywordsString.split(',').map(k => k.trim()).filter(Boolean) })); 
    setValidationErrors(prev => ({...prev, triggerKeywords: undefined}));
   }, []);
  

  const handleAnswerTextChange = useCallback((index, newText) => {
    setLocalData(prev => {
      const newAnswers = [...(prev.answers || [])];
      if (newAnswers[index]) {
        newAnswers[index] = { ...newAnswers[index], text: newText };
      }
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const addAnswerOption = useCallback(() => {
    const newAnswer = { id: generateUniqueId('ans_'), text: 'New Option' };
    setLocalData(prev => ({ ...prev, answers: [...(prev.answers || []), newAnswer] }));
  }, []);

  const removeAnswerOption = useCallback((indexToRemove) => {
    setLocalData(prev => {
      const newAnswers = (prev.answers || []).filter((_, index) => index !== indexToRemove);
      // Ensure at least one answer remains if it's an askQuestionNode
      if (node.type === 'askQuestionNode' && newAnswers.length === 0) {
        return { ...prev, answers: [{ id: generateUniqueId('ans_'), text: 'New Option' }] };
      }
      return { ...prev, answers: newAnswers };
    });
  }, [node]); // Add node to dependency array if its type influences logic

  const handleConditionLogicChange = useCallback((e) => {
    setLocalData(prev => ({ ...prev, conditionLogic: e.target.value }));
  }, []);

  const handleConditionFieldChange = useCallback((condIndex, fieldName, value) => {
    setLocalData(prev => {
      const newConditions = JSON.parse(JSON.stringify(prev.conditions || [])); // Deep copy to avoid direct mutation
      if (newConditions[condIndex]) {
        newConditions[condIndex][fieldName] = value;
        // Clear value if operator is IS_SET or IS_NOT_SET
        if (fieldName === 'operator' && (value === 'IS_SET' || value === 'IS_NOT_SET')) {
          newConditions[condIndex].value = '';
        }
      }
      return { ...prev, conditions: newConditions };
    });
  }, []);

  const addConditionRow = useCallback(() => {
    const newCond = { id: generateUniqueId('cond_'), sourceField: dynamicContextFields[0]?.value || '', operator: 'EQUALS', value: '' };
    setLocalData(prev => ({ ...prev, conditions: [...(prev.conditions || []), newCond] }));
  }, [dynamicContextFields]); // dynamicContextFields is needed here

  const removeConditionRow = useCallback((condIndex) => {
    setLocalData(prev => {
        const newConditions = (prev.conditions || []).filter((_, i) => i !== condIndex);
        // Ensure at least one condition remains if it's a conditionNode
        if (node.type === 'conditionNode' && newConditions.length === 0) {
            return { ...prev, conditions: [{ id: generateUniqueId('cond_'), sourceField: '', operator: 'EQUALS', value: '' }] };
        }
        return { ...prev, conditions: newConditions };
    });
  }, [node]); // Add node to dependency array if its type influences logic

  const handleApplyChanges = useCallback(() => {
    if (!node) return;
    const errors = validateNodeData(node.type, localData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      let dataToSave = { ...localData };
      // Ensure all sub-elements have IDs (answers, conditions)
      if (node.type === 'askQuestionNode') dataToSave.answers = (dataToSave.answers || []).map(ans => ({...ans, id: ans.id || generateUniqueId('ans_')}));
      if (node.type === 'conditionNode') dataToSave.conditions = (dataToSave.conditions || []).map(c => ({...c, id: c.id || generateUniqueId('cond_')}));

      onUpdateNodeData(node.id, { ...dataToSave, isValid: true }); // Add isValid: true
      // onClose(); // Optionally close panel on successful save
    } else {
      onUpdateNodeData(node.id, { ...localData, isValid: false }); // Save data even with errors, but mark as invalid
      console.warn("Validation errors:", errors);
    }
  }, [node, localData, onUpdateNodeData]);;

const ErrorDisplay = ({ fieldName, subIndex }) => {
        let errorMsg;
        if (subIndex !== undefined) { // For errors in arrays like conditions[index].sourceField
            if (validationErrors[fieldName] && validationErrors[fieldName][subIndex]) {
                errorMsg = validationErrors[fieldName][subIndex];
            }
        } else {
            errorMsg = validationErrors[fieldName];
        }
        return errorMsg ? <p className="mt-1 text-xs text-red-500 flex items-center"><ExclamationCircleIcon className="w-3.5 h-3.5 mr-1"/> {errorMsg}</p> : null;
    };


  const handleInsertContextVar = useCallback((variable) => {
    if (!showContextPickerFor) return;
    const { fieldName, condIndex, subFieldName } = showContextPickerFor;
    setLocalData(prev => {
        let currentVal = "";
        const updatedData = { ...prev };

        if (condIndex !== undefined && subFieldName) {
            const newConditions = JSON.parse(JSON.stringify(updatedData.conditions || []));
            if (newConditions[condIndex]) {
                currentVal = newConditions[condIndex][subFieldName] || "";
                newConditions[condIndex][subFieldName] = currentVal + `{{${variable}}}`;
                updatedData.conditions = newConditions;
            }
        } else if (fieldName) {
            currentVal = updatedData[fieldName] || "";
            updatedData[fieldName] = currentVal + `{{${variable}}}`;
        }
        return updatedData;
    });
    setShowContextPickerFor(null);
  }, [showContextPickerFor]); // showContextPickerFor is a dependency here

  const renderNodeSpecificSettings = () => {
    if (!node || !node.type) return <p className="text-xs text-slate-500 p-2">Select a node to see its settings.</p>;

    switch (node.type) {
      case 'startNode':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label:</label>
              <input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="triggerType" className="block text-xs font-medium text-slate-600 mb-1">Trigger Type:</label>
              <select
                id="triggerType"
                name="triggerType"
                value={localData.triggerType || 'NEW_CHAT_STARTED'}
                onChange={handleTriggerTypeChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
              >
                {triggerOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {localData.triggerType === 'MESSAGE_RECEIVED' && (
              <div>
                <label htmlFor="triggerKeywordsInput" className="block text-xs font-medium text-slate-600 mb-1">
                  Keywords (comma-separated, triggers if message contains any):
                </label>
                <input
                  type="text"
                  id="triggerKeywordsInput"
                  name="triggerKeywords"
                  placeholder="e.g. help, price, support"
                  value={(localData.triggerKeywords || []).join(', ')}
                  onChange={handleKeywordsChange}
                  className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                   <p className="mt-1 text-[10px] text-slate-500">Flow starts if message contains any keyword (case-insensitive).</p>
              </div>
            )}
          </div>
        );


      
        case 'sendMessageNode':
        return (
          <div>
            <label htmlFor="messageText" className="block text-xs font-medium text-slate-600 mb-1">Message Text:</label>
            <div className="relative">
                <textarea id="messageText" name="messageText" rows="4" value={localData.messageText || ''} onChange={handleChange}
                          className="mt-1 block w-full px-3 py-1.5 pr-10 border border-slate-300 rounded-md text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
               
                <button type="button" onClick={() => setShowContextPickerFor({fieldName: 'messageText'})} title="Insert Variable"
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-100">
                    <Bars3BottomLeftIcon className="w-4 h-4"/>
                </button>
            </div>
                  <ErrorDisplay fieldName="messageText" />
          </div>
        );
         case 'loopNode': // <-- NEW CASE
            return (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label (Optional):</label>
                        <input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange}
                               className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/>
                        <ErrorDisplay fieldName="label" />
                    </div>
                    <div>
                        <label htmlFor="listSourcePath" className="block text-xs font-medium text-slate-600 mb-1">
                            Iterate Over List (Context Variable Path):
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="listSourcePath"
                                name="listSourcePath"
                                value={localData.listSourcePath || ''}
                                onChange={handleChange}
                                placeholder="e.g., contact.appointments or {{flow.myList}}"
                                className="mt-1 block w-full px-3 py-1.5 pr-10 border border-slate-300 rounded-md text-xs"
                            />
                            <button type="button" onClick={() => setShowContextPickerFor({fieldName: 'listSourcePath'})} title="Insert Variable"
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-100">
                                <Bars3BottomLeftIcon className="w-4 h-4"/>
                            </button>
                        </div>
                        <ErrorDisplay fieldName="listSourcePath" />
                        <p className="mt-1 text-xxs text-slate-500">Path to an array in the context, e.g., `contact.tags` or ``.</p>
                    </div>
                    <div>
                        <label htmlFor="currentItemVariable" className="block text-xs font-medium text-slate-600 mb-1">
                            Store Current Item As (Variable Name):
                        </label>
                        <input
                            type="text"
                            id="currentItemVariable"
                            name="currentItemVariable"
                            value={localData.currentItemVariable || 'loop.item'}
                            onChange={handleChange}
                            placeholder="e.g., loop.appointment"
                            className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                        />
                        <ErrorDisplay fieldName="currentItemVariable" />
                        <p className="mt-1 text-xxs text-slate-500">Prefix with "loop." for clarity (e.g., `loop.currentProduct`). Nodes in the loop body can use ``.</p>
                    </div>
                    <div>
                        <label htmlFor="currentIndexVariable" className="block text-xs font-medium text-slate-600 mb-1">
                            Store Current Index As (Optional Variable Name):
                        </label>
                        <input
                            type="text"
                            id="currentIndexVariable"
                            name="currentIndexVariable"
                            value={localData.currentIndexVariable || ''}
                            onChange={handleChange}
                            placeholder="e.g., loop.index (0-based)"
                            className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                        />
                        <ErrorDisplay fieldName="currentIndexVariable" />
                    </div>
                </div>
            );
        case 'askQuestionNode':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="questionText" className="block text-xs font-medium text-slate-600 mb-1">Question Text:</label>
              <textarea id="questionText" name="questionText" rows="3" value={localData.questionText || ''} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                 <ErrorDisplay fieldName="questionText" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">Answer Options (each creates an output handle):</label>
               <ErrorDisplay fieldName="answers" /> {/* General error for answers array */}
              {(localData.answers || []).map((answer, index) => (
                <div key={answer.id || `new-ans-${index}`} className="flex items-center space-x-2 mb-2 p-2 border rounded-md bg-slate-50/70">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1} Text`}
                    value={answer.text || ''}
                    onChange={(e) => handleAnswerTextChange(index, e.target.value)}
                    className="flex-grow px-2 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-xs text-slate-400 w-24 truncate" title={`Handle ID: ${answer.id}`}>ID: ...{answer.id?.slice(-6)}</span>
                  <button
                    type="button"
                    onClick={() => removeAnswerOption(index)}
                    className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 flex-shrink-0"
                    title="Remove option"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                   <ErrorDisplay fieldName="answerTexts" subIndex={index} />
                </div>
              ))}
              <button
                type="button"
                onClick={addAnswerOption}
                className="mt-1 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center py-1 px-2 rounded hover:bg-blue-50"
              >
                <PlusIcon className="w-4 h-4 mr-1" /> Add Option
              </button>
            </div>
          </div>
        );

        case 'addTagNode':
          return (
            <div className="space-y-4">
              <div>
                <label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label (Optional):</label>
                <input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange}
                       className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/>
              </div>
              <div>
                <label htmlFor="tagName" className="block text-xs font-medium text-slate-600 mb-1">
                  Tag Name to Add:
                </label>
                                <ErrorDisplay fieldName="conditions" /> {/* General error for conditions array */}

                <div className="relative">
                  <input
                    type="text"
                    id="tagName"
                    name="tagName"
                    value={localData.tagName || ''}
                    onChange={handleChange}
                    placeholder="e.g., VIP, Follow-Up, {{flow.productInterest}}"
                    className="mt-1 block w-full px-3 py-1.5 pr-10 border border-slate-300 rounded-md text-xs shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button type="button" onClick={() => setShowContextPickerFor({fieldName: 'tagName'})} title="Insert Variable"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-100">
                      <Bars3BottomLeftIcon className="w-4 h-4"/>
                  </button>
                </div>
                <p className="mt-1 text-xxs text-slate-500">Tag will be added to the current contact. Can use </p>
                <ErrorDisplay fieldName="tagName" />
              </div>
            </div>
          );
         case 'setVariableNode': // This is likely where line 361 could be if placeholders were directly rendered.
        return (
          <div className="space-y-4">
            <div><label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label (Optional):</label><input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange}className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/></div>
            <div><label htmlFor="variableName" className="block text-xs font-medium text-slate-600 mb-1">Variable Name (e.g., `flow.userName`):
              </label><input type="text" id="variableName" name="variableName" value={localData.variableName || ''} 
              onChange={handleChange} placeholder="context.variable.path" className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/> 
              <p className="mt-1 text-xxs text-slate-500">Use dot notation for nested variables.</p>
              <ErrorDisplay fieldName="variableName" />
              </div>
            <div>
              <label htmlFor="variableValue" className="block text-xs font-medium text-slate-600 mb-1">Value to Set:</label>
              <div className="relative">
                <textarea id="variableValue" name="variableValue" rows="3" value={localData.variableValue || ''} onChange={handleChange} placeholder="Static text, number, true/false, or {{context.variable}}" className="mt-1 block w-full px-3 py-1.5 pr-10 border border-slate-300 rounded-md text-xs"/>
                <button type="button" onClick={() => setShowContextPickerFor({fieldName: 'variableValue'})} title="Insert Variable" className="absolute top-2 right-2 p-1 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-100"><Bars3BottomLeftIcon className="w-4 h-4"/></button>
              </div>
              <p className="mt-1 text-xxs text-slate-500">Can be static or use .</p>
            </div>
          </div>
        );
         case 'conditionNode':
        return (
          <div className="space-y-4">
            {/* ... Node Label and Condition Logic dropdown as before ... */}
            <div><label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label (Optional):</label><input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/></div>
            {(localData.conditions && localData.conditions.length > 1) && (<div><label htmlFor="conditionLogic" className="block text-xs font-medium text-slate-600 mb-1">Combine conditions using:</label><select id="conditionLogic" name="conditionLogic" value={localData.conditionLogic || 'AND'} onChange={handleConditionLogicChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm sm:text-xs"><option value="AND">ALL conditions true (AND)</option><option value="OR">ANY condition true (OR)</option></select></div>)}

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Conditions:</label>
              {(localData.conditions || []).map((condition, index) => (
                <div key={condition.id || index} className="p-3 border rounded-md mb-2 space-y-2 bg-slate-50/70 relative">
                  {/* ... Remove button ... */}
                  <div>
                    <label htmlFor={`condField-${index}`} className="block text-xxs font-medium text-slate-500 mb-0.5">Field to Check</label>
                    <select id={`condField-${index}`} value={condition.sourceField || ''} onChange={(e) => handleConditionFieldChange(index, 'sourceField', e.target.value)} 
                    className="block w-full px-2 py-1.5 border border-slate-300 bg-white rounded-md text-xs">
                        <option value="" disabled>Select field...</option>
                        {dynamicContextFields.map(opt => <option key={opt.value} value={opt.value} title={opt.value}>{opt.label}</option>)}
                    </select>
                                          <ErrorDisplay fieldName="conditionFields" subIndex={index} />

                  </div>
                  {/* ... Operator dropdown ... */}
                  { !(condition.operator === 'IS_SET' || condition.operator === 'IS_NOT_SET') &&
                    <div>
                        <label htmlFor={`condVal-${index}`} className="block text-xxs font-medium text-slate-500 mb-0.5">Value to Compare</label>
                        <div className="relative">
                            <input type="text" id={`condVal-${index}`} value={condition.value || ''} onChange={(e) => handleConditionFieldChange(index, 'value', e.target.value)} className="block w-full px-2 py-1.5 pr-8 border border-slate-300 rounded-md text-xs"/>
                            <button type="button" onClick={() => setShowContextPickerFor({condIndex: index, subFieldName: 'value'})} title="Insert Variable" className="absolute top-1/2 right-1.5 transform -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-100"><Bars3BottomLeftIcon className="w-4 h-4"/></button>
                        </div>
                         <ErrorDisplay fieldName="conditionValues" subIndex={index} />
                    </div>
                  }
                </div>
              ))}
              <button type="button" onClick={addConditionRow} className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center py-1 px-2 rounded hover:bg-blue-50"><PlusIcon className="w-4 h-4 mr-1" /> Add Condition</button>
            </div>
          </div>
        );

        case 'assignToGroupNode':
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label (Optional):</label>
        <input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange}
               className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/>
      </div>
      <div>
        <label htmlFor="groupName" className="block text-xs font-medium text-slate-600 mb-1">
          Assign Chat to Group:
        </label>
        <select
          id="groupName"
          name="groupName" // Key in node.data
          value={localData.groupName || ''}
          onChange={handleChange} // Generic handleChange is fine for select
          className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-xs"
        >
          <option value="" disabled>Select a group...</option>
          {availableChatGroups.map(group => (
            <option key={group.id} value={group.name}>{group.name}</option>
          ))}
          {/* Optionally allow dynamic group name via placeholder */}
          <option value="USE_PLACEHOLDER">Use Placeholder/Variable...</option>
        </select>
        <ErrorDisplay fieldName="groupName" />
      </div>
      {/* Conditional input if "Use Placeholder" is selected */}
      {localData.groupName === 'USE_PLACEHOLDER' && (
         <div>
             <label htmlFor="groupNamePlaceholder" className="block text-xs font-medium text-slate-600 mb-1">
                 Group Name Placeholder:
             </label>
             <div className="relative">
                 <input
                     type="text"
                     id="groupNamePlaceholder"
                     name="groupNamePlaceholder" // Store this in localData, e.g., localData.groupNamePlaceholder
                     value={localData.groupNamePlaceholder || ''}
                     onChange={handleChange}
                     placeholder="e.g., {{flow.department}}"
                     className="mt-1 block w-full px-3 py-1.5 pr-10 border border-slate-300 rounded-md text-xs"
                 />
                 <button type="button" onClick={() => setShowContextPickerFor({fieldName: 'groupNamePlaceholder'})} title="Insert Variable"
                         className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-100">
                     <Bars3BottomLeftIcon className="w-4 h-4"/>
                 </button>
             </div>
         </div>
      )}
    </div>
  );
      
        case 'delayNode': // <-- NEW CASE
            return (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label (Optional):</label>
                        <input type="text" id="label" name="label" value={localData.label || ''} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/>
                        <ErrorDisplay fieldName="label" />
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <label htmlFor="duration" className="block text-xs font-medium text-slate-600 mb-1">Duration:</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={localData.duration || ''}
                                onChange={handleChange}
                                min="1"
                                placeholder="e.g., 10"
                                className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                            />
                            <ErrorDisplay fieldName="duration" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="unit" className="block text-xs font-medium text-slate-600 mb-1">Unit:</label>
                            <select
                                id="unit"
                                name="unit"
                                value={localData.unit || 'minutes'}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm sm:text-xs"
                            >
                                <option value="seconds">Seconds</option>
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                            </select>
                            <ErrorDisplay fieldName="unit" />
                        </div>
                    </div>
                </div>
            );

      default: return (<div><label htmlFor="label" className="block text-xs font-medium text-slate-600 mb-1">Node Label:</label><input type="text" id="label" name="label" value={localData.label || node.id} onChange={handleChange} className="mt-1 block w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"/></div>);
    }
  };

  if (!node) return (<div className="w-72 p-4 border-l border-slate-200 bg-white h-full flex items-center justify-center"><p className="text-sm text-slate-400">Select a node to edit its settings.</p></div>);
  const canApplyChanges = Object.keys(validationErrors).length === 0;

   return (
    <div className="w-72 p-4 border-l border-slate-200 bg-white h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200 flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-700">
          Settings: <span className="font-normal italic">{localData?.label || node.type?.replace('Node','').replace(/([A-Z])/g, ' $1').trim() || node.id}</span>
        </h3>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full"><XMarkIcon className="w-5 h-5"/></button>
      </div>
      <div className="flex-grow space-y-4 overflow-y-auto scrollbar-thin pr-1 pb-2">
        {renderNodeSpecificSettings()}
      </div>
      <div className="pt-4 mt-auto flex-shrink-0 border-t border-slate-200">
        <button onClick={handleApplyChanges} 
         disabled={!canApplyChanges} 
        className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
          Apply Changes</button>
                  {!canApplyChanges && <p className="text-xs text-red-500 text-center mt-2">Please fix validation errors.</p>}

      </div>

      {/* Context Variable Picker Modal/Popover */}
      {showContextPickerFor && (
        <div className="fixed inset-0 bg-black/30 z-[60] flex items-center justify-center p-4" onClick={() => setShowContextPickerFor(null)}>
            <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto scrollbar-thin" onClick={e => e.stopPropagation()}>
                <h4 className="text-base font-semibold mb-3 text-slate-700 border-b pb-2">Select a Context Variable</h4>
                {Object.entries(
                    dynamicContextFields.reduce((acc, curr) => {
                        const group = curr.group || 'Other Variables';
                        acc[group] = [...(acc[group] || []), curr];
                        return acc;
                    }, {})
                ).map(([groupName, fieldsInGroup]) => (
                    <div key={groupName} className="mb-3">
                        <p className="text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">{groupName}</p>
                        {fieldsInGroup.map(field => (
                            <button key={field.value} onClick={() => handleInsertContextVar(field.value)}
                                    className="block w-full text-left text-sm p-2 hover:bg-slate-100 rounded transition-colors my-0.5 border-b border-slate-100 last:border-b-0">
                                {field.label}
                                <span className="block text-slate-400 text-xs italic mt-0.5">{`{{${field.value}}}`}</span>
                            </button>
                        ))}
                    </div>
                ))}
                <button onClick={() => setShowContextPickerFor(null)} className="mt-4 w-full text-sm text-slate-600 hover:bg-slate-100 py-2 rounded border border-slate-300">Close</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;