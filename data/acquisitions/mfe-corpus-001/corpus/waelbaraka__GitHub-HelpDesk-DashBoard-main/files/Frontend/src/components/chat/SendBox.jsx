import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

// --- Reusable "Click Outside" Hook ---
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// --- Dummy Data ---
const DUMMY_TAGS = ['chatbot', 'complaint', 'positive feedback', 'sales', 'spam', 'support', 'test'];
const DUMMY_CANNED_RESPONSES = {
  general: [ { id: 'g3', text: "Hello! How can I assist you today?" }, { id: 'g5', text: "Sure thing! One moment please." } ],
  ticket: [ { id: 't1', text: "I'm opening a HelpDesk ticket now. You'll get updates over email." } ]
};
const INITIAL_QUICK_RESPONSES = [
    { id: 1, short: "Hi there! 👋 How can I help you...", full: "Hi there! 👋 How can I help you today?" },
    { id: 2, short: "Hello! 👋 Let me find that out...", full: "Hello! 👋 Let me find that out for you." },
];

// --- SVG Icons ---
const classNames = (...classes) => classes.filter(Boolean).join(' ');
const TagIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg> );
const XMarkIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> );
const CheckIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> );
const ChatBubbleIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.125 1.125 0 01-1.59 0L13.25 12l-2.52 2.52a1.125 1.125 0 01-1.59 0l-3.72-3.72A1.125 1.125 0 013.75 12V8.25c0-1.136.847-2.1 1.98-2.193l3.72 3.72a1.125 1.125 0 011.59 0l2.52-2.52a1.125 1.125 0 011.59 0l3.72 3.72z" /></svg> );
const NoteIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> );
const HashtagIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-16.5-15h19.5a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 18V4.5A2.25 2.25 0 014.5 3z" /></svg> );
const AttachmentIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg> );
const EmojiIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" /></svg> );
const MoreOptionsIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg> );
const ChevronRightIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg> );
const ChevronLeftIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg> );


const SendBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('message');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagSearch, setTagSearch] = useState('');
  const [quickResponses, setQuickResponses] = useState(INITIAL_QUICK_RESPONSES);
  
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCannedMenu, setShowCannedMenu] = useState(false);
  const [selectedCannedCategory, setSelectedCannedCategory] = useState(null);
  
  const tagDropdownRef = useRef(null);
  const modeDropdownRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const cannedMenuRef = useRef(null);
  const textareaRef = useRef(null);

  useClickOutside(tagDropdownRef, () => setShowTagDropdown(false));
  useClickOutside(modeDropdownRef, () => setShowModeDropdown(false));
  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));
  useClickOutside(cannedMenuRef, () => { setShowCannedMenu(false); setSelectedCannedCategory(null); });

  const handleSend = () => { if (message.trim()) { onSendMessage(message, mode, selectedTags); setMessage(''); setSelectedTags([]); } };
  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleMessageChange = (e) => { if (e.target.value.endsWith('#')) { setShowCannedMenu(true); setSelectedCannedCategory(null); } setMessage(e.target.value); };
  const onEmojiClick = (emojiData) => { setMessage(prev => prev + emojiData.emoji); setShowEmojiPicker(false); textareaRef.current.focus(); };
  const toggleTag = (tag) => { setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]); };
  const handleRemoveTag = (tagToRemove) => { setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove)); };
  
  const handleCannedResponseSelect = (responseText) => {
    setMessage(prev => prev.replace(/#$/, '') + responseText);
    setShowCannedMenu(false);
    setSelectedCannedCategory(null);
    textareaRef.current.focus();
  };
  
  const useQuickResponse = (response) => {
    setMessage(response.full);
    setQuickResponses(prev => prev.filter(r => r.id !== response.id));
    textareaRef.current.focus();
  };

  const removeQuickResponse = (e, responseId) => {
    e.stopPropagation();
    setQuickResponses(prev => prev.filter(r => r.id !== responseId));
  };
  
  const filteredTags = DUMMY_TAGS.filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()));

  return (
    <div className="flex-shrink-0 p-4 bg-gray-50 border-t border-gray-200">
      <div className="relative">
        {/* --- QUICK RESPONSES BAR (The Fix) --- */}
        <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-2 -mt-1">
          {quickResponses.map(response => (
            <div key={response.id} className="group relative flex-shrink-0">
              <span onClick={() => useQuickResponse(response)} className="block bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">{response.short}</span>
              <div className="absolute bottom-full mb-2 w-64 bg-white rounded-lg shadow-lg p-3 text-sm border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-gray-500"><ChatBubbleIcon className="w-4 h-4 inline-block mr-1 -mt-px"/> hi</p>
                  <button onClick={(e) => removeQuickResponse(e, response.id)} className="text-gray-400 hover:text-red-500 pointer-events-auto p-1 -mt-1 -mr-1"><XMarkIcon className="w-3.5 h-3.5"/></button>
                </div>
                <p className="text-gray-800 mt-1">{response.full}</p>
                <div className="flex justify-start mt-3"><button onClick={() => useQuickResponse(response)} className="text-blue-600 font-bold text-xs pointer-events-auto">Use</button></div>
              </div>
            </div>
          ))}
        </div>

        {/* --- POP-UP MENUS --- */}
        {showEmojiPicker && ( <div ref={emojiPickerRef} className="absolute bottom-full right-0 mb-2 z-20"><EmojiPicker onEmojiClick={onEmojiClick} emojiStyle={EmojiStyle.NATIVE} height={350} width={320}/></div> )}
        {showCannedMenu && (
          <div ref={cannedMenuRef} className="absolute bottom-full left-0 mb-2 bg-white w-72 rounded-lg shadow-xl border border-gray-200 z-20">
            {selectedCannedCategory ? (
              <div>
                <div className="p-2 border-b flex items-center bg-gray-50 rounded-t-lg"><button onClick={() => setSelectedCannedCategory(null)} className="p-1 hover:bg-gray-200 rounded-full mr-2"><ChevronLeftIcon className="w-5 h-5"/></button><h4 className="font-semibold text-gray-800 capitalize">{selectedCannedCategory}</h4></div>
                <ul className="max-h-60 overflow-y-auto">{DUMMY_CANNED_RESPONSES[selectedCannedCategory].map(response => (<li key={response.id} onClick={() => handleCannedResponseSelect(response.text)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate">{response.text}</li>))}</ul>
              </div>
            ) : (
              <div>
                <div className="p-2.5 border-b bg-gray-50 rounded-t-lg"><h4 className="font-semibold text-gray-800 px-1">Canned Responses</h4></div>
                <ul className="max-h-60 overflow-y-auto">{Object.keys(DUMMY_CANNED_RESPONSES).map(category => (<li key={category} onClick={() => setSelectedCannedCategory(category)} className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"><span className="capitalize">{category}</span><div className="flex items-center"><span className="text-xs text-gray-400 mr-2">{DUMMY_CANNED_RESPONSES[category].length}</span><ChevronRightIcon className="w-4 h-4"/></div></li>))}</ul>
              </div>
            )}
          </div>
        )}

        {/* --- MAIN TEXTBOX --- */}
        <div className={`w-full border rounded-lg shadow-sm transition-all duration-300 ${mode === 'note' ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-300'}`}>
          <div className="p-1"><textarea ref={textareaRef} rows="3" placeholder="ctrl+K for quick actions" className="w-full p-2 outline-none bg-transparent resize-none placeholder-gray-400 text-sm" value={message} onChange={handleMessageChange} onKeyDown={handleKeyDown}/></div>
          <div className="flex justify-between items-center p-2 border-t border-gray-200">
            <div className="flex items-center gap-1 text-gray-500">
              <div className="relative" ref={modeDropdownRef}><button onClick={() => setShowModeDropdown(!showModeDropdown)} className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100">{mode === 'message' ? <ChatBubbleIcon className="w-5 h-5"/> : <NoteIcon className="w-5 h-5 text-yellow-600"/>}<span className={`font-medium text-sm ${mode === 'note' && 'text-yellow-700'}`}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</span></button>{showModeDropdown && (<div className="absolute bottom-full mb-2 w-40 bg-white border rounded-lg shadow-xl z-10 py-1"><button onClick={() => {setMode('message'); setShowModeDropdown(false)}} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100"><ChatBubbleIcon className="w-5 h-5 text-gray-600"/>Message</button><button onClick={() => {setMode('note'); setShowModeDropdown(false)}} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100"><NoteIcon className="w-5 h-5 text-gray-600"/>Note</button></div>)}</div>
              <div className="w-px h-5 bg-gray-200 mx-1"></div>
              <button onClick={() => {setShowCannedMenu(!showCannedMenu); setSelectedCannedCategory(null)}} title="Canned Responses (#)" className="p-1.5 hover:bg-gray-100 rounded-md"><HashtagIcon className="w-5 h-5"/></button>
              <button onClick={() => alert('Attachment feature coming soon!')} title="Attach file" className="p-1.5 hover:bg-gray-100 rounded-md"><AttachmentIcon className="w-5 h-5"/></button>
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Add emoji" className="p-1.5 hover:bg-gray-100 rounded-md"><EmojiIcon className="w-5 h-5"/></button>
              <button onClick={() => alert('More options coming soon!')} title="More options" className="p-1.5 hover:bg-gray-100 rounded-md"><MoreOptionsIcon className="w-5 h-5"/></button>
            </div>
            <button onClick={handleSend} disabled={!message.trim()} className="px-5 py-2 rounded-lg text-white font-semibold transition-colors bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed">Send</button>
          </div>
        </div>
        
        {/* --- TAGS SECTION --- */}
        <div className="flex items-center gap-2 pt-3">
          <div className="relative" ref={tagDropdownRef}><button onClick={() => setShowTagDropdown(!showTagDropdown)} className="text-xs text-gray-600 flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-200"><TagIcon className="w-3.5 h-3.5"/>Add tag</button>{showTagDropdown && (<div className="absolute bottom-full mb-2 w-64 bg-white border rounded-md shadow-lg z-10"><div className="p-2 border-b"><input type="text" placeholder="Search or create..." value={tagSearch} onChange={(e) => setTagSearch(e.target.value)} className="w-full px-2 py-1 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" autoFocus/></div><ul className="max-h-48 overflow-y-auto">{filteredTags.map(tag => (<li key={tag} onClick={() => toggleTag(tag)} className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex justify-between items-center"><span className={selectedTags.includes(tag) ? 'font-semibold text-blue-600' : ''}>{tag}</span>{selectedTags.includes(tag) && <CheckIcon className="w-4 h-4 text-blue-600"/>}</li>))}</ul></div>)}</div>
          <div className="flex flex-wrap items-center gap-1.5">{selectedTags.map(tag => (<span key={tag} className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs flex items-center gap-1.5">{tag}<button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500"><XMarkIcon className="w-3 h-3"/></button></span>))}</div>
        </div>
      </div>
    </div>
  );
};

export default SendBox;