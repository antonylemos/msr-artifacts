// src/layouts/AuthLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // We'll use Link for navigation

// A simple placeholder for the orange chat widget
const ChatWidget = () => (
  <div className="fixed bottom-5 right-5 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </div>
);

// A simple placeholder for the footer links
const FooterLinks = () => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-xs text-gray-400">
      <p className="mb-2">powered by [text]</p>
      <div className="flex items-center space-x-4">
        <span><svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM4.5 9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm3 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm3.5.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z"/></svg>LiveChat</span>
        <span><svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V6h-1.5a.5.5 0 0 1-.5-.5Z M2 10.5a.5.5 0 0 1 .5.5v1.5H4a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5V11a.5.5 0 0 1 .5-.5Z"/></svg>ChatBot</span>
        <span><svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M2 13.5V2.5A2.5 2.5 0 0 1 4.5 0h1A2.5 2.5 0 0 1 8 2.5v11A2.5 2.5 0 0 1 5.5 16h-1A2.5 2.5 0 0 1 2 13.5Zm3.5-2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z"/></svg>KnowledgeBase</span>
        <span><svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm8.5 2.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2Zm-3 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2Zm6 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2Z"/></svg>OpenWidget</span>
      </div>
    </div>
);

const AuthLayout = ({ children, headerButtonLabel, headerButtonLink }) => {
  return (
    <div className="bg-white min-h-screen font-sans relative">
      <header className="absolute top-0 right-0 p-6">
        <Link to={headerButtonLink} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          {headerButtonLabel}
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen py-12">
        {children}
      </main>

      <FooterLinks />
      <ChatWidget />
    </div>
  );
};

export default AuthLayout;