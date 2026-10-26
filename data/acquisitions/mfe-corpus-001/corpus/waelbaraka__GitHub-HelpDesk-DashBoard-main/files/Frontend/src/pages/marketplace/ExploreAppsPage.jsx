// src/pages/marketplace/ExploreAppsPage.jsx
import React, { useState, useMemo, useCallback ,useRef ,useEffect } from 'react';
import {
  ListBulletIcon, // For Categories filter
  CreditCardIcon, // For Payment type filter
  Squares2X2Icon as PlacementIcon, // For Placement filter
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CheckIcon, // For selected items in dropdown
  ArrowLeftIcon, // For "Collections" carousel
  ArrowRightIcon, // For "Collections" carousel
  StarIcon ,ShoppingCartIcon ,
} from '@heroicons/react/24/solid'; // Or outline as preferred
import { Link } from 'react-router-dom'; // Add this import
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
import { useAuthStore } from '../../stores/authStore';  // Adjust the path as needed

// --- Dummy Data (Replace with API calls) ---
const dummyCollections = [
  { id: 'ai', title: 'AI-Powered', description: 'Extend your LiveChat with AI apps...', bgColor: 'bg-indigo-50', icons: ['🤖', '🎓', '✨'] },
  { id: 'new', title: 'New & Noteworthy', description: 'Recently published, high-quality apps...', bgColor: 'bg-sky-50', icons: ['🌟', '🚀', '💡'] },
  { id: 'staff', title: 'Staff Top Picks', description: 'Feature-rich applications that greatly enhance...', bgColor: 'bg-green-50', icons: ['🏆', '👍', '✅'] },
  { id: 'productivity', title: 'Productivity Boosters', description: 'Streamline workflows and save time...', bgColor: 'bg-amber-50', icons: ['⏱️', '⚡', '📈'] },
];

const dummyApps = [
  // Replicating some apps from your screenshot
  { id: 'app1', name: 'AgentTrainer', category: 'Analytics', paymentType: ['free'], placement: ['Details'], rating: 5, description: 'Automated agent training with customer simulation.', logo: '🤖', worksWith: 'LiveChat', isAiPowered: true },
  { id: 'app2', name: 'Chats Transcripts Exporter', category: 'Analytics', paymentType: ['free'], placement: ['Settings'], rating: 3.7, description: 'Export your chat transcripts to CSV.', logo: '📄', worksWith: 'LiveChat' },
  { id: 'app3', name: 'Getscreen.me', category: 'Desktop Sharing', paymentType: ['free', 'per_license'], placement: ['Message Box'], rating: 5, description: 'Remote access to desktops. Momentarily. From a web browser.', logo: '💻', worksWith: 'LiveChat' },
  { id: 'app4', name: 'LiveSession', category: 'Analytics', paymentType: ['per_license'], placement: ['Navigation'], rating: 4.5, description: 'Watch LiveSession recording instantly from LiveChat.', logo: ' ls ', worksWith: 'LiveChat' },
  { id: 'app5', name: 'Mixpanel', category: 'Analytics', paymentType: ['free', 'per_month'], placement: ['Settings'], rating: 5, description: 'Monitor LiveChat events using Mixpanel.', logo: '📊', worksWith: 'LiveChat' },
  { id: 'app6', name: 'RemSupp', category: 'Desktop Sharing', paymentType: ['free'], placement: ['Message Box'], rating: 5, description: 'Remotely access and control desktops.', logo: '🛠️', worksWith: 'LiveChat' },
  { id: 'app7', name: 'KnowledgeBase for LiveChat', category: 'Contact Management', paymentType: ['free'], placement: ['Details'], rating: 4.4, description: 'Integrate LiveChat with KnowledgeBase...', logo: '📚', worksWith: 'LiveChat', isAiPowered: true },
  { id: 'app8', name: 'WhatsApp Business', category: 'CRM Connectors', paymentType: ['free'], placement: ['Navigation', 'Message Box'], rating: 4.6, description: 'Manage your chats with WhatsApp customers...', logo: '💬', worksWith: 'LiveChat' },
  // Add more apps...
];

const filterOptions = {
  categories: ['Analytics', 'CMS Integrations', 'CRM Connectors', 'Chatbots', 'Contact Management', 'Desktop Sharing', 'E-commerce', 'Email Marketing', 'Files Sharing', 'Help Desk', 'Invoicing'],
  paymentTypes: ['Free', 'One time payment', 'Per license, per month', 'Per agent, per month'],
  placements: ['Campaigns', 'Navigation', 'Message Box', 'Details (Chats or Tickets)', 'Settings'],
  sortBy: [
    { id: 'alphabetically', label: 'Alphabetically' },
    { id: 'price', label: 'Price' },
    { id: 'popularity', label: 'Popularity' },
    { id: 'recommended', label: 'Recommended' },
    { id: 'recently_published', label: 'Recently published' },
  ],
};

  const filterOptions1 = [
    { id: 'all', label: 'All Apps' },
    { id: 'installed', label: 'Installed' },
    { id: 'notInstalled', label: 'Not Installed' }
  ];

  const filterOptions2 = [
    { id: 'all', label: 'All Categories' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' }
  ];

   const filterOptions3 = [
    { id: 'all', label: 'All Categories' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' }
  ];

   const filterOptions4 = [
    { id: 'all', label: 'All Categories' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' }
  ];
   const filterOptions5 = [
    { id: 'all', label: 'All Categories' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' }
  ];
   const filterOptions6 = [
    { id: 'all', label: 'All Categories' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'communication', label: 'Communication' },
    { id: 'analytics', label: 'Analytics' }
  ];

  // 2. Then define your state variables

  
// --- End Dummy Data ---


// --- Reusable Filter Dropdown Component ---
const FilterDropdown = ({ label, icon: Icon, options, selectedOptions, onToggleOption, isMultiSelect = true, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [activeFilter1, setActiveFilter1] = useState(filterOptions1[0].id);
  const [activeFilter2, setActiveFilter2] = useState(filterOptions2[0].id);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayLabel = useMemo(() => {
    if (selectedOptions.length === 0 || selectedOptions.length === options.length) return `${label}: all`;
    if (selectedOptions.length === 1) return `${label}: ${selectedOptions[0]}`;
    return `${label}: ${selectedOptions.length} selected`;
  }, [label, selectedOptions, options.length]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
      >
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
        {displayLabel}
        <ChevronDownIcon className="w-4 h-4 ml-2 -mr-1 text-gray-500" />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="origin-top-left absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-80 overflow-y-auto scrollbar-thin">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { onToggleOption(option); if(!isMultiSelect) setIsOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                  selectedOptions.includes(option) ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {option}
                {selectedOptions.includes(option) && <CheckIcon className="w-4 h-4 text-indigo-600" />}
              </button>
            ))}
            {isMultiSelect && selectedOptions.length > 0 && (
                 <div className="border-t border-gray-200 px-4 py-2">
                    <button onClick={() => {onClear(); setIsOpen(false);}} className="text-xs text-indigo-600 hover:underline">Clear selection</button>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Reusable App Card ---
const AppCard = ({ app }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4 mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          {app.logoUrl && app.logoUrl !== '🤖' ? <img src={app.logoUrl} alt={app.name} className="w-full h-full object-contain p-1"/> : app.logo || '⚙️'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate">{app.name}</h3>
          <div className="text-xs text-gray-500 flex items-center mt-0.5">
            <span>{(app.paymentTypes || ['free']).includes('free') ? 'Free to install' : 'Paid'}</span>
            {app.averageRating && <><span className="mx-1.5">·</span><StarIcon className="w-3.5 h-3.5 text-yellow-400 mr-0.5"/> {parseFloat(app.averageRating).toFixed(1)}</>}
          </div>
        </div>
      </div>
      {app.isAiPowered && (
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full self-start mb-2">
              ✨ AI-Powered
          </span>
      )}
      <p className="text-xs text-gray-600 leading-relaxed flex-grow mb-3 line-clamp-3">{app.shortDescription || app.description}</p>
      <p className="text-xxs text-gray-400">Works with {app.worksWithText || 'Your Platform'}</p>
      <Link
        to={`/apps/details/${app.id}`}
        className="mt-4 w-full text-center bg-indigo-600 text-white text-sm font-medium py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        {app.getButtonText || 'View Details'}
      </Link>
    </div>
  );
const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };


// --- Main Page Component ---
const ExploreAppsPage = () => {
   const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState([]);
  const [selectedPlacements, setSelectedPlacements] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState(filterOptions.sortBy[0].label); // Default sort

  const [apps, setApps] = useState([]); // State for fetched apps
  const [totalApps, setTotalApps] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingApps, setIsLoadingApps] = useState(true);
  const limitPerPage = 12; // Or make configurable
  const { token } = useAuthStore();  // Get token from auth store


  const dummyCollections = [
    { id: 'ai', title: 'AI-Powered', description: 'Extend your LiveChat with AI apps that boost your customer service.', bgColor: 'bg-indigo-50', icons: ['🤖', '🎓', '✨'] },
    { id: 'new', title: 'New & Noteworthy', description: 'Recently published, high-quality apps recognized by LiveChat experts.', bgColor: 'bg-sky-50', icons: ['🌟', '🚀', '💡'] },
    { id: 'staff', title: 'Staff Top Picks', description: 'Feature-rich applications that greatly enhance your chatting experience.', bgColor: 'bg-green-50', icons: ['🏆', '👍', '✅'] },
  ];


// Create api instance
// Replace the existing api configuration with:
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



  const fetchApps = useCallback(async () => {
    try {
      setIsLoadingApps(true);

      const params = {
        page: currentPage,
        limit: limitPerPage,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategories.length > 0 && { categories: selectedCategories.join(',') }),
        ...(selectedPaymentTypes.length > 0 && { paymentTypes: selectedPaymentTypes.join(',') }),
        ...(selectedPlacements.length > 0 && { placements: selectedPlacements.join(',') }),
        ...(selectedSortBy && selectedSortBy !== 'All' && { sortBy: selectedSortBy.toLowerCase() })
      };

      const response = await api.get('/modules/available', { 
        params,
        headers: {
          Authorization: `Bearer ${token}`  // Add token to request headers
        }
      });
      
      if (!response.data) {
        throw new Error('No data received from API');
      }

      setApps(response.data.modules || []);
      setTotalApps(response.data.total || 0);
      setTotalPages(Math.ceil((response.data.total || 0) / limitPerPage));

    } catch (error) {
      console.error('Failed to fetch apps:', error);
      if (error.response?.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        console.error('Authentication required');
      }
      setApps([]);
      setTotalApps(0);
      setTotalPages(1);
    } finally {
      setIsLoadingApps(false);
    }
  }, [currentPage, limitPerPage, searchTerm, selectedCategories, selectedPaymentTypes, selectedPlacements, selectedSortBy, token]);


useEffect(() => {
  if (!token) {
    console.error('No authentication token found');
    return;
  }
  fetchApps();
}, [fetchApps, token]);


useEffect(() => {
  fetchApps().catch(console.error);
}, [fetchApps]);

 const toggleSelection = useCallback((setter, option, isMultiSelect) => {
    setter(prev => {
      if (isMultiSelect) {
        if (option === 'All') return prev.includes('All') ? [] : ['All'];
        const newSelection = prev.filter(item => item !== 'All');
        return newSelection.includes(option) ? newSelection.filter(item => item !== option) : [...newSelection, option];
      }
      return [option]; // Single select
    });
    setCurrentPage(1); // Reset to page 1 on filter change
  }, []);
  
 const clearMultiSelection = useCallback((setter) => {
    setter([]);
    setCurrentPage(1);
  }, []);
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
        setCurrentPage(newPage);
    }
  };

  const filteredApps = useMemo(() => {
    return dummyApps
      .filter(app => 
        searchTerm === '' || app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(app => 
        selectedCategories.length === 0 || selectedCategories.includes(app.category)
      )
      .filter(app => 
        selectedPaymentTypes.length === 0 || app.paymentType.some(pt => selectedPaymentTypes.map(spt => spt.toLowerCase().replace(/ /g, '_')).includes(pt)) // Normalize payment type for filtering
      )
      .filter(app =>
        selectedPlacements.length === 0 || selectedPlacements.includes(app.placement) || (Array.isArray(app.placement) && app.placement.some(p => selectedPlacements.includes(p)))
      )
      .sort((a, b) => {
        // Implement actual sorting logic based on selectedSortBy
        if (selectedSortBy === 'Alphabetically') return a.name.localeCompare(b.name);
        if (selectedSortBy === 'Price') return (a.priceRange?.min || 0) - (b.priceRange?.min || 0); // Simplistic price sort
        if (selectedSortBy === 'Popularity' || selectedSortBy === 'Recommended') return (b.rating || 0) - (a.rating || 0); // Sort by rating
        // Add logic for 'Recently published' if you have date data
        return 0;
      });
  }, [searchTerm, selectedCategories, selectedPaymentTypes, selectedPlacements, selectedSortBy]);

 return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Explore apps</h1>
        <Link to="/cart" className="text-sm text-indigo-600 hover:underline flex items-center font-medium">
          Go to Cart <ShoppingCartIcon className="w-4 h-4 ml-1.5"/>
        </Link>
      </div>

      {/* Collections Carousel */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Collections</h2>
        <div className="relative">
            {/* Add Prev/Next buttons for carousel if many collections */}
            <div className="flex space-x-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent -mx-1 px-1">
                {dummyCollections.map(col => (
                    <div key={col.id} className={`min-w-[300px] sm:min-w-[320px] p-6 rounded-xl ${col.bgColor} border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer`}>
                        <div className="flex items-center mb-3 space-x-2">
                            {col.icons.map((icon, idx) => <span key={idx} className="text-3xl shadow-sm bg-white/50 p-1 rounded-md">{icon}</span>)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{col.title}</h3>
                        <p className="text-xs text-gray-700 mt-1.5 leading-relaxed line-clamp-2">{col.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* All Apps Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">All Apps ({totalApps})</h2>
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(3,auto)_1fr_auto] gap-3 mb-8 items-center">
          <FilterDropdown 
            label="Categories" 
            icon={ListBulletIcon} 
            options={filterOptions.categories} 
            selectedOptions={selectedCategories} 
            onToggleOption={(opt) => toggleSelection(setSelectedCategories, opt, true)} 
            onClear={() => clearMultiSelection(setSelectedCategories)}
            isMultiSelect={true} 
          />
          <FilterDropdown 
            label="Payment type" 
            icon={CreditCardIcon} 
            options={filterOptions.paymentTypes} 
            selectedOptions={selectedPaymentTypes} 
            onToggleOption={(opt) => toggleSelection(setSelectedPaymentTypes, opt, true)} 
            onClear={() => clearMultiSelection(setSelectedPaymentTypes)}
            isMultiSelect={true}
          />
          <FilterDropdown 
            label="Placement" 
            icon={PlacementIcon} 
            options={filterOptions.placements} 
            selectedOptions={selectedPlacements} 
            onToggleOption={(opt) => toggleSelection(setSelectedPlacements, opt, true)} 
            onClear={() => clearMultiSelection(setSelectedPlacements)}
            isMultiSelect={true}
          />
          
          <div className="relative xl:col-start-4"> {/* Search input takes remaining space or its own column */}
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
                type="search" 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Search for apps" 
                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <FilterDropdown 
            label={selectedSortBy} // Label is dynamic for single-select
            options={filterOptions.sortBy.map(s=>s.label)} 
            selectedOptions={[selectedSortBy]} // Pass as array for consistency
            onToggleOption={(opt) => toggleSelection(setSelectedSortBy, opt, false)} 
            isMultiSelect={false}
          />
        </div>

        {/* App Grid or Loading/Empty State */}
        {isLoadingApps ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading apps...</div>
        ) : apps.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
              {apps.map(app => <AppCard key={app.id} app={app} />)}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center space-x-3">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={currentPage <= 1} 
                        className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                    </span>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        disabled={currentPage >= totalPages} 
                        className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Apps Found</h3>
            <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? `No apps matched your search "${searchTerm}" and selected filters.` : "No apps currently match your selected filters."}
            </p>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};



// const StarIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props}><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>;
// // Example icon imports (ensure these match what you have in FilterDropdown, AppCard etc.)
// const ListBulletIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>;
// const CreditCardIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>;
// const PlacementIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>;



export default ExploreAppsPage;