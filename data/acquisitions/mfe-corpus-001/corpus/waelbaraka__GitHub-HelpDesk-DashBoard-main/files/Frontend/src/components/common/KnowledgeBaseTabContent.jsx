// src/components/chat/common/KnowledgeBaseTabContent.jsx
import React, { useState, useMemo, useCallback } from 'react';
import {
    MagnifyingGlassIcon,
    LinkIcon,
    ArrowLeftIcon,
    ClipboardDocumentIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/solid';

// Dummy KB articles - ensure this is present
const allKbArticles = [
    { id: 'kb1', title: 'How to reset your password', category: 'Account Management', categoryLink: 'FAQ', snippet: 'Step 1: Go to the login page...', fullContent: "Full content for resetting password...", updatedDate: 'June 2, 2025', url: 'https://example.com/kb/reset-password' },
    { id: 'kb2', title: 'Ensuring Animal Well-Being: The Vital Role of Veterinary Medicine in Health and Welfare', category: 'FAQ', categoryLink: 'FAQ', snippet: 'Veterinary (VET) animal health is a crucial field...', fullContent: "Full content about Veterinary Medicine...", updatedDate: 'June 4, 2025', url: 'https://example.com/kb/animal-well-being' },
    { id: 'kb3', title: 'Step 3: Use articles in the chat', category: 'Getting started', categoryLink: 'Getting started', snippet: 'Learn how to effectively use KB articles in your chats...', fullContent: "Full content for using articles in chat...", updatedDate: 'June 4, 2025', url: 'https://example.com/kb/use-in-chat' },
    { id: 'kb4', title: 'UAE', category: 'Getting started', categoryLink: 'Getting started', snippet: 'Information about UAE region services...', fullContent: "Full content about UAE services...", updatedDate: 'June 4, 2025', url: 'https://example.com/kb/uae' },
    { id: 'kb5', title: 'Exploring the Spectrum of Dental Services: From Preventive Care to ...', category: 'Getting started', categoryLink: 'Getting started', snippet: 'An overview of available dental services...', fullContent: "Full content about dental services...", updatedDate: 'June 4, 2025', url: 'https://example.com/kb/dental-services' },
    { id: 'kb6', title: 'HighTech Solutions Overview', category: 'HighTech', categoryLink: 'HighTech', snippet: 'An overview of our HighTech solutions...', fullContent: "Full content about HighTech solutions...", updatedDate: 'June 4, 2025', url: 'https://example.com/kb/hightech' },
];

const ArticleListItem = React.memo(({ article, onSelectArticle, onInsertLink }) => {
    return (
        <div
            className="p-3 hover:bg-slate-100 border-b border-slate-200 last:border-b-0 cursor-pointer group"
            onClick={() => onSelectArticle(article)}
        >
            <div className="flex justify-between items-center">
                <h4 className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors truncate flex-1 pr-2">
                    {article.title}
                </h4>
                <button
                    onClick={(e) => { e.stopPropagation(); onInsertLink(article); }}
                    title="Insert link to chat"
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
});

const KnowledgeBaseTabContent = ({ contact, onInsertTextIntoChat }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setSelectedArticle(null);
    }, []);

    const handleSelectArticle = useCallback((article) => { setSelectedArticle(article); }, []);
    const handleBackToList = useCallback(() => { setSelectedArticle(null); }, []);
    const handleInsertLinkOrSend = useCallback((article, type = 'send') => {
        const textToSend = type === 'copy' ?
            article.url :
            `Here's an article that might help: ${article.title}\n${article.url}`;
        if (type === 'copy') {
            navigator.clipboard.writeText(article.url).then(() => alert("Article URL copied!")).catch(err => console.error("Copy failed: ", err));
        } else if (onInsertTextIntoChat) {
            onInsertTextIntoChat(textToSend);
        } else {
            alert("Would insert: " + textToSend);
        }
    }, [onInsertTextIntoChat]);

    // --- FIX: This block was missing, causing the "displayedContent is not defined" error ---
    const articlesByCategory = useMemo(() => {
        return allKbArticles.reduce((acc, article) => {
            const category = article.category || 'Uncategorized';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(article);
            return acc;
        }, {});
    }, []); // This only needs to run once

    const displayedContent = useMemo(() => {
        if (!searchTerm.trim()) {
            // If no search, show articles grouped by category
            return { type: 'categories', data: articlesByCategory };
        }
        // If searching, show a flat list of filtered articles
        const filtered = allKbArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.snippet && article.snippet.toLowerCase().includes(searchTerm.toLowerCase())) ||
            article.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { type: 'search_results', data: filtered };
    }, [searchTerm, articlesByCategory]);
    // --- END OF FIX ---

    if (selectedArticle) {
        // --- ARTICLE DETAIL VIEW ---
        return (
            <div className="flex flex-col h-full bg-white">
                {/* Breadcrumbs & Actions */}
                <div className="p-3 border-b border-slate-200">
                    <div className="text-xs text-slate-500 mb-2">
                        <span onClick={handleBackToList} className="hover:underline cursor-pointer">All articles</span>
                        {' > '}
                        <span onClick={handleBackToList} className="hover:underline cursor-pointer">{selectedArticle.categoryLink || selectedArticle.category}</span>
                        {' > '}
                        <span className="text-slate-700 truncate max-w-[200px] inline-block align-bottom" title={selectedArticle.title}>
                            {selectedArticle.title}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <button onClick={handleBackToList} className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium p-1 -ml-1">
                            <ArrowLeftIcon className="w-5 h-5 mr-1" /> Back
                        </button>
                        <div className="flex items-center space-x-3">
                            <button onClick={() => handleInsertLinkOrSend(selectedArticle, 'copy')} className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium p-1">
                                <ClipboardDocumentIcon className="w-4 h-4 mr-1" /> Copy url
                            </button>
                            <button onClick={() => handleInsertLinkOrSend(selectedArticle, 'send')} className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium p-1">
                                <PaperAirplaneIcon className="w-4 h-4 mr-1 transform rotate-45" /> Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="flex-grow p-4 overflow-y-auto scrollbar-thin">
                    <h1 className="text-xl font-bold text-slate-800 mb-1">{selectedArticle.title}</h1>
                    <p className="text-xs text-slate-500 mb-4">Updated {selectedArticle.updatedDate}</p>
                    <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                        {selectedArticle.fullContent.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- ARTICLE LIST/SEARCH VIEW (using the now-defined displayedContent) ---
    return (
        <div className="flex flex-col h-full bg-white">
            {/* Search Bar */}
            <div className="p-3 border-b border-slate-200 sticky top-0 bg-white z-10">
                <div className="relative">
                    <input
                        type="search" placeholder="Search articles" value={searchTerm} onChange={handleSearchChange}
                        className="w-full py-2.5 px-4 pl-10 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Content: Categories or Search Results */}
            <div className="flex-grow overflow-y-auto scrollbar-thin">
                {displayedContent.type === 'categories' && Object.keys(displayedContent.data).length > 0 && (
                    <div className="p-3 space-y-4">
                        <h3 className="text-xs text-slate-500 uppercase font-semibold tracking-wide">All articles</h3>
                        {Object.entries(displayedContent.data).map(([category, articles]) => (
                            <div key={category} className="bg-slate-50 rounded-lg p-4 shadow-sm border border-slate-200">
                                <h3 className="text-base font-bold text-slate-800 mb-2">{category}</h3>
                                <div className="space-y-1">
                                    {articles.map(article => (
                                        <ArticleListItem
                                            key={article.id}
                                            article={article}
                                            onSelectArticle={handleSelectArticle}
                                            onInsertLink={(articleData) => handleInsertLinkOrSend(articleData, 'send')}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {displayedContent.type === 'search_results' && displayedContent.data.length > 0 && (
                    displayedContent.data.map(article => (
                        <ArticleListItem
                            key={article.id}
                            article={article}
                            onSelectArticle={handleSelectArticle}
                            onInsertLink={(articleData) => handleInsertLinkOrSend(articleData, 'send')}
                        />
                    ))
                )}

                {displayedContent.type === 'search_results' && displayedContent.data.length === 0 && searchTerm && (
                    <p className="p-4 text-sm text-slate-500 text-center">No articles found for "{searchTerm}".</p>
                )}
                 {displayedContent.type === 'categories' && Object.keys(displayedContent.data).length === 0 && !searchTerm && (
                    <p className="p-4 text-sm text-slate-500 text-center">No categories or articles available.</p>
                )}
            </div>
        </div>
    );
};

export default KnowledgeBaseTabContent;