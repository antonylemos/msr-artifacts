// src/components/team/GroupList.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MagnifyingGlassIcon, PlusIcon, EllipsisHorizontalIcon, UserGroupIcon as GroupIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
// Assuming your real API client is the default export from api.js
import api from '../../api/api.js'; // Adjust path as needed
import MemberAvatarsStack from './MemberAvatarsStack'; // Assuming it's in the same folder or adjust path



const GroupList = ({ onGroupSelect, onCreateNewGroup }) => {
  const [allFetchedGroups, setAllFetchedGroups] = useState([]);
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGroups, setTotalGroups] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limitPerPage] = useState(10); // Or from props/config

  const fetchGroupsList = useCallback(async (pageToFetch, currentSearchTerm) => {
    // Ensure pageToFetch and currentSearchTerm are always defined with defaults if not passed
    const page = pageToFetch || 1;
    const search = currentSearchTerm === undefined ? searchTerm : currentSearchTerm; // Use state if arg is undefined

    console.log("GroupList: fetchGroupsList called with:", { page, search, limit: limitPerPage });
    setIsLoading(true);
    try {
      // The object passed to api.listTeams MUST be defined.
      const apiParams = { 
          page: page, 
          limit: limitPerPage, 
          searchTerm: search 
      };
      console.log("GroupList: Calling api.listTeams with params:", apiParams);

      const responseData = await api.listTeams(apiParams); // This response is the direct array from backend

      console.log("GroupList: Fetched raw teams data:", responseData);

      // If backend returns { teams: [], totalTeams: X, currentPage: Y, totalPages: Z }
      if (responseData && Array.isArray(responseData.teams)) {
          setAllFetchedGroups(responseData.teams);
          setTotalGroups(responseData.totalTeams || 0);
          setCurrentPage(responseData.currentPage || 1);
          setTotalPages(responseData.totalPages || 1);
      } 
      // If backend returns a direct array (as your Postman test showed)
      else if (Array.isArray(responseData)) {
          setAllFetchedGroups(responseData);
          setTotalGroups(responseData.length); // For client-side pagination
          setCurrentPage(page); // We control current page
          setTotalPages(Math.ceil(responseData.length / limitPerPage)); // For client-side pagination
      } else {
          console.error("GroupList: Unexpected response format from api.listTeams");
          setAllFetchedGroups([]);
          setTotalGroups(0);
      }

    } catch (error) {
      console.error("GroupList: Failed to fetch groups:", error, error.response);
      toast.error(error.response?.data?.message || "Could not load groups list.");
      setAllFetchedGroups([]);
      setTotalGroups(0);
    } finally {
      setIsLoading(false);
    }
  }, [limitPerPage, searchTerm]); // searchTerm dependency for when it changes via input

  // Initial fetch and re-fetch when searchTerm changes
  useEffect(() => {
    console.log("GroupList: useEffect for fetch, searchTerm is:", searchTerm);
    fetchGroupsList(1, searchTerm); // Always fetch page 1 on searchTerm change
  }, [searchTerm, fetchGroupsList]); // fetchGroupsList is a dependency

  // Client-side filtering (only if backend doesn't filter by searchTerm)
  // If backend filters, then allFetchedGroups IS the list to display (after potential client-side pagination)
  useEffect(() => {
    // This effect is for client-side filtering based on allFetchedGroups
    // If your backend already filters by searchTerm, you might not need this specific effect
    // and displayedGroups would be derived from allFetchedGroups differently (e.g. for pagination)
    if (!searchTerm) {
      setDisplayedGroups(allFetchedGroups);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      setDisplayedGroups(
        allFetchedGroups.filter(group => 
          group && group.name && group.name.toLowerCase().includes(searchTermLower)
        )
      );
    }
    // If using client-side filtering, reset to page 1 on search
    // setCurrentPage(1); 
  }, [searchTerm, allFetchedGroups]);

  const handlePageChange = (newPage) => {
    // If backend handles pagination:
    if (newPage > 0 && newPage <= totalPages) {
        fetchGroupsList(newPage, searchTerm);
    }
    // If client-side pagination:
    // if (newPage > 0 && newPage <= totalPages) {
    //     setCurrentPage(newPage);
    // }
  };

  // For client-side pagination (if you choose this route)
  const paginatedClientSideGroups = useMemo(() => {
      const startIndex = (currentPage - 1) * limitPerPage;
      return displayedGroups.slice(startIndex, startIndex + limitPerPage);
  }, [displayedGroups, currentPage, limitPerPage]);


  // ----- RENDER LOGIC -----
  // Determine which list of groups to map over for rendering:
  // Option A: If backend paginates, `allFetchedGroups` is the current page's data.
  // const groupsToRender = allFetchedGroups; 
  // Option B: If client-side pagination on `displayedGroups` (which is client-side filtered `allFetchedGroups`)
  const groups = paginatedClientSideGroups; // Or just displayedGroups if no client pagination yet

  

  function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
  return colors[Math.abs(hash) % colors.length];
}

  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
         <div className="relative min-w-[250px] sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MagnifyingGlassIcon className="h-5 w-5 text-gray-400" /></div>
            <input 
                type="search" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" 
                placeholder="Search groups by name"
            />
        </div>
        <button 
            onClick={onCreateNewGroup} // This prop comes from TeamPage
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <PlusIcon className="w-4 h-4 mr-1.5"/> New group
        </button>
      </div>
      <div className="py-2"><h3 className="text-xs font-medium text-gray-500 uppercase">All Groups ({totalGroups})</h3></div>
      
      {isLoading ? (<div className="text-center py-10 text-gray-500">Loading groups...</div>)
      : groups.length === 0 && !searchTerm ? ( // Empty state only if no search and no groups
          <div className="text-center py-12">
            <GroupIconSolid className="mx-auto h-12 w-12 text-gray-400"/>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Create groups to organize your team</h3>
            <p className="mt-1 text-sm text-gray-500">Groups help to automatically route chats to the right agents.</p>
            <div className="mt-6">
                <button 
                    type="button" 
                    onClick={onCreateNewGroup} 
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />Create group
                </button>
            </div>
          </div>
      ) : groups.length === 0 && searchTerm ? (
          <div className="text-center py-10 text-gray-500">No groups found matching "{searchTerm}".</div>
      ) : (
        <>
            <div className="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> 
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
      {groups.map((group) => { // Assuming groupsToRender is your final list
          if (!group) return null;
          // Team Avatar Initial & BG (from backend or generated)
          const teamInitial = group.avatarInitial || (group.name ? group.name.charAt(0).toUpperCase() : 'G');
          const teamBgColor = group.avatarBg || 'bg-blue-600 text-white'; // Default if not provided

          return (
            <tr key={group.id} onClick={() => onGroupSelect(group)} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 ${teamBgColor} rounded-md flex items-center justify-center text-sm font-semibold mr-3`}> {/* Team Icon */}
                            {teamInitial}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                                {group.name}
                                {group.isGeneralTeam && <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">Default</span>}
                            </div>
                            <div className="text-xs text-gray-500">{group.membersCount || 0} members</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {/* Pass the members array from the group object */}
                    <MemberAvatarsStack members={group.members || []} maxVisible={5} /> 
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={group.description}>
                    {group.description || <span className="italic text-gray-400">No description</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={(e) => { e.stopPropagation(); alert('Actions for ' + group.name); }} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                </td>
            </tr>
          );
      })}
    </tbody>
            </table>
            </div>
            {/* Pagination UI */}
            {totalGroups > limitPerPage && (
            <div className="mt-4 flex justify-center">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1 || isLoading} className="px-3 py-1 border rounded-l-md disabled:opacity-50">Previous</button>
              <span className="px-3 py-1 border-t border-b">Page {currentPage} of {Math.ceil(totalGroups / limitPerPage)}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(totalGroups / limitPerPage) || isLoading} className="px-3 py-1 border rounded-r-md disabled:opacity-50">Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default React.memo(GroupList);