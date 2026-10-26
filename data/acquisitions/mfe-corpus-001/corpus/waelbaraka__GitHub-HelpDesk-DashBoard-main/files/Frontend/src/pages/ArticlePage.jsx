// src/pages/ArticlePage.jsx
import React, { useState, useCallback, useMemo } from 'react';
import {
  XMarkIcon, // For removing keywords
  InformationCircleIcon, // For info icon next to keywords
  PlusIcon, // For adding keywords
  ChevronDownIcon, // For dropdowns
  SparklesIcon // For generate keywords with AI
} from '@heroicons/react/24/outline'; // Using outline for most icons in the editor and settings

// Placeholder icons for rich text editor toolbar.
// In a real application, you would use an actual rich text editor library (e.g., Quill, TinyMCE, Slate.js)
// which would provide its own icons and functionality.
const EditorIcons = {
  Bold: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 4H8v16h4c2.21 0 4-1.79 4-4s-1.79-4-4-4H8V4zm0 12h-2V6h2c1.1 0 2 .9 2 2s-.9 2-2 2h-2v4h2c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>,
  Italic: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M10 4h3.24l-2.52 16H8l2.52-16z"/></svg>,
  Underline: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2v8c0 2.21-1.79 4-4 4s-4-1.79-4-4V3H6v8c0 3.31 2.69 6 6 6zM5 21h14v2H5z"/></svg>,
  Strikethrough: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M10 19h4v-2h-4v2zM5 11h14v2H5v-2zM10 4h4V2h-4v2z"/></svg>,
  Superscript: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M7 11h-2V5h-2V3h4V5h2V3h-4V5h2V3h-4V5h2V3h-4V5h2V3h-4V5h2V3h-4V5h2V3h-4V5h2V3z"/></svg>, // Placeholder
  Subscript: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M7 11h-2V5h-2V3h4V5h2V3h-4V5h2V3h-4V5h2V3h-4V5h2V3z"/></svg>, // Placeholder
  Code: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  Link: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M17 7h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2zM12 9c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V7h-6zm5 8H7v-2h10v2zM5 15h14v2H5v-2z"/></svg>,
  Image: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z"/></svg>,
  Video: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M18 10l4 4-4 4V10zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>,
  Emoji: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4.5-8c.83 0 1.5-.67 1.5-1.5S8.33 9 7.5 9 6 9.67 6 10.5s.67 1.5 1.5 1.5zm9 0c.83 0 1.5-.67 1.5-1.5S16.83 9 16.5 9 15 9.67 15 10.5s.67 1.5 1.5 1.5zM12 16c-1.66 0-3-.67-3-1.5h6c0 .83-1.34 1.5-3 1.5z"/></svg>,
  Omega: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4.5-8c.83 0 1.5-.67 1.5-1.5S8.33 9 7.5 9 6 9.67 6 10.5s.67 1.5 1.5 1.5zm9 0c.83 0 1.5-.67 1.5-1.5S16.83 9 16.5 9 15 9.67 15 10.5s.67 1.5 1.5 1.5zM12 16c-1.66 0-3-.67-3-1.5h6c0 .83-1.34 1.5-3 1.5z"/></svg>, // Placeholder (replace if needed)
  Table: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M19 19H5V5h14v14zM5 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5zm0 12h14v2H5v-2zM5 7h14v2H5V7zm0 4h14v2H5v-2z"/></svg>,
  ListBullet: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M4 10h16v2H4zm0-4h16v2H4zm0 8h16v2H4zm0 4h16v2H4z"/></svg>,
  ListOrdered: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M4 10h16v2H4zm0-4h16v2H4zm0 8h16v2H4zm0 4h16v2H4z"/></svg>,
  AlignLeft: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>,
  AlignCenter: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zm-4-6h18v-2H3v2z"/></svg>,
  AlignRight: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M3 15h12v2H3v-2zm0-8h12v2H3V7zm0 14h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2z"/></svg>,
  Justify: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 8h18v-2H3v2zm0-8h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V3H3v2z"/></svg>,
  Quote: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zM16 17h3l2-4V7h-6v6h3z"/></svg>,
  HorizontalRule: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M20 12H4v2h16v-2z"/></svg>,
  Search: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
  // Text color/background - often a palette icon or simple A with down arrow
  TextColor: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 8h-2v4h-2V8h4V4h2v4h2v4h-4z"/></svg>, // Placeholder
  HighlightColor: (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 8h-2v4h-2V8h4V4h2v4h2v4h-4z"/></svg>, // Placeholder
};


const ArticlePage = React.memo(({ onClose, sectionConfig }) => {
  const [articleTitle, setArticleTitle] = useState('Untitled');
  const [titleCharCount, setTitleCharCount] = useState(0); // For character count
  const [currentTab, setCurrentTab] = useState('Settings'); // Settings or SEO
  const [status, setStatus] = useState('Draft'); // Published or Draft
  const [showInTopic, setShowInTopic] = useState('General');
  const [keywords, setKeywords] = useState([]); // Array of keywords
  const [newKeyword, setNewKeyword] = useState('');
  const [articleContent, setArticleContent] = useState(''); // For the rich text editor content

  // Update char count on title change
  const handleTitleChange = useCallback((e) => {
    const title = e.target.value;
    setArticleTitle(title);
    setTitleCharCount(title.length);
  }, []);

  const handleAddKeyword = useCallback(() => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  }, [newKeyword, keywords]);

  const handleRemoveKeyword = useCallback((keywordToRemove) => {
    setKeywords(prev => prev.filter(k => k !== keywordToRemove));
  }, []);

  const handleGenerateKeywords = useCallback(() => {
    console.log('Generating keywords with AI...');
    // Simulate AI generation - for demo, add some hardcoded keywords
    setTimeout(() => {
      setKeywords(prev => [...new Set([...prev, 'AI Generated', 'Keywords', 'Example', articleTitle.split(' ')[0] || ''] )]);
    }, 500);
  }, [articleTitle]);

  const handleSave = useCallback((saveStatus) => {
    console.log(`Saving article as ${saveStatus}:`, {
      articleTitle,
      status: saveStatus, // Use the status passed from the button
      showInTopic,
      keywords,
      articleContent
    });
    alert(`Article saved as ${saveStatus}!`);
    onClose(); // Navigate back to KnowledgeBase page after saving
  }, [articleTitle, showInTopic, keywords, articleContent, onClose]);

  // Max character count for title
  const maxTitleChars = 225;

  return (
    <div className="flex flex-1 flex-col bg-gray-100 overflow-y-auto">
      {/* Top Bar for Article Actions */}
      <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-800 uppercase mr-4">Article Title</h1>
        <div className="flex items-center flex-grow">
          <input
            type="text"
            className="text-lg font-semibold text-gray-700 outline-none border-b border-transparent focus:border-blue-500 transition-colors bg-transparent flex-grow"
            value={articleTitle}
            onChange={handleTitleChange}
            placeholder="Untitled"
          />
          <span className="text-sm text-gray-500 ml-4">{titleCharCount} / {maxTitleChars}</span>
        </div>
        <div className="flex items-center ml-8">
          <button onClick={() => onClose()} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 mr-2">Close</button>
          <button onClick={() => handleSave('Draft')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create</button> {/* "Create" acts as primary save, default to Draft if status is not explicitly chosen before */}
        </div>
      </div>

      {/* Main Content Area (Editor + Settings Sidebar) */}
      <div className="flex flex-1">
        {/* Rich Text Editor Area */}
        <div className="flex-1 flex flex-col bg-white border-r border-gray-200 p-6">
          {/* Editor Toolbar */}
          <div className="border border-gray-300 rounded-md p-2 mb-4 flex flex-wrap gap-x-1 gap-y-2 text-gray-700 items-center">
            {/* Group 1: Basic Formatting */}
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Bold className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Italic className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Underline className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Strikethrough className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Superscript className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Subscript className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Code className="w-5 h-5"/></button>
            <span className="h-6 border-l border-gray-300 mx-1"></span> {/* Divider */}

            {/* Group 2: Links, Media, Emojis, Symbols */}
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Link className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Image className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Video className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Emoji className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Omega className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Table className="w-5 h-5"/></button>
            <span className="h-6 border-l border-gray-300 mx-1"></span> {/* Divider */}

            {/* Group 3: Text Color, Background, Headings */}
            <select className="p-1 border-none focus:ring-0 text-sm bg-transparent outline-none cursor-pointer"><option>Tx</option></select> {/* Text Color/Font */}
            <select className="p-1 border-none focus:ring-0 text-sm bg-transparent outline-none cursor-pointer"><option>A</option></select> {/* Background Color */}
            <select className="p-1 border-none focus:ring-0 text-sm bg-transparent outline-none cursor-pointer"><option>H1</option></select> {/* Headings */}
            <span className="h-6 border-l border-gray-300 mx-1"></span> {/* Divider */}

            {/* Group 4: Lists & Alignment */}
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.ListBullet className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.ListOrdered className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.AlignLeft className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.AlignCenter className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.AlignRight className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Justify className="w-5 h-5"/></button>
            <span className="h-6 border-l border-gray-300 mx-1"></span> {/* Divider */}

            {/* Group 5: Quotes, Horizontal Rule, Search */}
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Quote className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.HorizontalRule className="w-5 h-5"/></button>
            <button className="p-1 hover:bg-gray-100 rounded"><EditorIcons.Search className="w-5 h-5"/></button>
          </div>

          {/* Editor Content Area */}
          <textarea
            className="flex-1 p-4 border border-gray-300 rounded-md resize-none outline-none focus:border-blue-500 text-gray-700"
            placeholder="Start writing your article..."
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
          ></textarea>

          {/* Generate with AI Button */}
          <div className="mt-4 flex justify-center">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <span className="text-blue-500 mr-2">⚡</span> Generate your article with AI
            </button>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-80 flex-shrink-0 bg-white border-l border-gray-200 p-6 space-y-6">
          {/* Tabs: Settings / SEO */}
          <div className="flex border-b border-gray-200 pb-2 mb-4">
            <button
              onClick={() => setCurrentTab('Settings')}
              className={`px-3 py-1 ${currentTab === 'Settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent'} font-medium`}
            >Settings</button>
            <button
              onClick={() => setCurrentTab('SEO')}
              className={`px-3 py-1 ${currentTab === 'SEO' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent'} font-medium`}
            >SEO</button>
          </div>

          {currentTab === 'Settings' && (
            <>
              {/* Status */}
              <div>
                <span className="block text-gray-600 mb-2">Status</span>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="articleStatus"
                      value="Published"
                      checked={status === 'Published'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Published</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="articleStatus"
                      value="Draft"
                      checked={status === 'Draft'}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Draft</span>
                  </label>
                </div>
              </div>

              {/* Show in Topic */}
              <div>
                <label htmlFor="showInTopic" className="block text-gray-600 mb-2">Show in topic</label>
                <div className="relative">
                  <select
                    id="showInTopic"
                    value={showInTopic}
                    onChange={(e) => setShowInTopic(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="General">General</option>
                    <option value="Getting started">Getting started</option>
                    <option value="HighTech">HighTech</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label htmlFor="newKeyword" className="block text-gray-600 mb-2">Keywords:</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywords.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2.5 py-0.5 rounded-full">
                      {keyword}
                      <button onClick={() => handleRemoveKeyword(keyword)} className="ml-1 -mr-0.5 p-0.5 rounded-full hover:bg-gray-200">
                        <XMarkIcon className="w-3 h-3 text-gray-500" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    id="newKeyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); }}}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="New Keyword"
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    title="Add keyword"
                  >
                    <PlusIcon className="w-5 h-5"/>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Add words or phrases that readers may use to search for this article.</p>
              </div>

              {/* Generate Keywords Button */}
              <button
                onClick={handleGenerateKeywords}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <SparklesIcon className="w-5 h-5 text-blue-500 mr-2"/> Generate keywords
              </button>
            </>
          )}

          {currentTab === 'SEO' && (
            <div className="text-gray-600">
              <h3 className="text-lg font-medium text-gray-800 mb-4">SEO Settings</h3>
              <p>Meta Title:</p>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md mb-4" placeholder="Enter meta title" />
              <p>Meta Description:</p>
              <textarea className="w-full p-2 border border-gray-300 rounded-md resize-y" rows="3" placeholder="Enter meta description"></textarea>
              <p className="text-xs text-gray-500 mt-2">Optimize your article for search engines.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ArticlePage;