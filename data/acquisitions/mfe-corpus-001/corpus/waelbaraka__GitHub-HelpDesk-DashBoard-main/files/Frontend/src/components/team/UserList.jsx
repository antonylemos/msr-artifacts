// src/components/team/UserList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon, PlusIcon, UserPlusIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
// --- Ensure this import points to your API setup that uses apiClient ---
import api from '../../api/api.js'; // This should import the 'realApi' object or equivalent
import { useAuthStore } from '../../stores/authStore.js';

// AgentAvatar can be a shared component
const AgentAvatar = React.memo(({ initials, bgColorClass = 'bg-gray-400', size = 'w-8 h-8' }) => (
    <div className={`${size} ${bgColorClass || 'bg-gray-400'} rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3 flex-shrink-0`}>
        {initials || 'U'}
    </div>
));

const UserList = ({ onUserSelect, onInviteAgentClick, onAddNewChatbotClick }) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [limitPerPage] = useState(20); // Or make this configurable

  const fetchUsersList = useCallback(async (pageToFetch = 1, currentSearchTerm = searchTerm) => {
    setIsLoading(true);
    try {
      // This now calls the real API function which uses apiClient
      const response = await api.listUsers({ 
          page: pageToFetch, 
          limit: limitPerPage, 
          searchTerm: currentSearchTerm 
      });
      setUsers(response.users || []);
      setTotalUsers(response.totalUsers || 0);
      setCurrentPage(response.currentPage || 1);
    } catch (error) {
      console.error("UserList: Failed to fetch users:", error);
      toast.error(error.response?.data?.message || "Could not load users list.");
      setUsers([]); 
      setTotalUsers(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, limitPerPage]); // Include searchTerm and limitPerPage if they can change

  // Initial fetch and fetch on search term change
  useEffect(() => {
    fetchUsersList(1, searchTerm); // Fetch page 1 when searchTerm changes
  }, [searchTerm, fetchUsersList]);

  // Function to handle page changes for pagination
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalUsers / limitPerPage)) {
        fetchUsersList(newPage, searchTerm);
    }
  };

  const getDisplayStatus = (user) => {
    if (!user) return { text: 'Unknown', type: 'offline' };
    if (!user.isActiveAccount && user.invitationToken) return { text: 'Invite sent', type: 'pending' };
    // Check isEmailVerified as well for better "pending activation" status
    if (!user.isActiveAccount && !user.isEmailVerified && !user.invitationToken) return { text: 'Deactivated', type: 'offline' };
    if (user.isBanned) return { text: 'Banned', type: 'banned' };
    
    switch (user.agentStatusAfterLogin?.toLowerCase()) {
        case 'online': case 'accept_chats': return { text: 'Online', type: 'active' };
        case 'offline': case 'dont_accept_chats': return { text: 'Offline', type: 'idle' };
        case 'according_to_working_hours': return { text: 'By Schedule', type: 'scheduled' };
        default: return { text: 'Available', type: 'active' };
    }
  };

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
            placeholder="Search by name or email"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={onAddNewChatbotClick} className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap"><PlusIcon className="w-4 h-4 mr-1.5"/>Add new chatbot</button>
          <button onClick={onInviteAgentClick} className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center whitespace-nowrap"><UserPlusIcon className="w-4 h-4 mr-1.5"/>Invite users</button>
        </div>
      </div>
      <div className="py-2"><h3 className="text-xs font-medium text-gray-500 uppercase">All Users ({totalUsers})</h3></div>
      
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading users...</div>
      ) : (
        <>
          <div className="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => {
                  if (!user) return null;
                  const displayStatus = getDisplayStatus(user);
                  const roleName = user.roles && user.roles.length > 0 ? user.roles[0].name : 'N/A';
                  // Construct avatar initials more robustly
                  let initials = 'U';
                  if (user.firstName && user.lastName) {
                    initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
                  } else if (user.fullName) {
                    const names = user.fullName.split(' ');
                    initials = names[0].charAt(0).toUpperCase() + (names.length > 1 ? names[names.length -1].charAt(0).toUpperCase() : '');
                  } else if (user.email) {
                    initials = user.email.charAt(0).toUpperCase();
                  }
                  const avatarBg = user.avatarBg || (user.id === (useAuthStore.getState().user?.id) ? 'bg-yellow-500' : 'bg-blue-500'); // Check for 'isYou' equivalent

                  return (
                    <tr key={user.id} onClick={() => onUserSelect(user)} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><AgentAvatar initials={initials} bgColorClass={avatarBg} /><div className="ml-4"><div className="text-sm font-medium text-gray-900">{user.fullName} {user.id === (useAuthStore.getState().user?.id) && <span className="text-xs text-gray-500">(You)</span>}</div><div className="text-sm text-gray-500">{user.email}</div></div></div></td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleName === 'Owner' ? 'bg-yellow-100 text-yellow-800' : roleName === 'Admin' || roleName === 'Admin with Billing' ? 'bg-red-100 text-red-800' : roleName === 'Agent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }`}>{roleName}</span></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {displayStatus.type === 'active' && <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>{displayStatus.text}</span>}
                          {displayStatus.type === 'pending' && <span>{displayStatus.text} <button className="ml-1 text-xs text-indigo-600 hover:underline">Resend</button></span>}
                          {!(displayStatus.type === 'active' || displayStatus.type === 'pending') && <span className="flex items-center"><span className={`w-2 h-2 ${displayStatus.type === 'offline' ? 'bg-gray-400' : displayStatus.type === 'idle' ? 'bg-yellow-400' : 'bg-blue-500'} rounded-full mr-1.5`}></span>{displayStatus.text}</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={(e) => { e.stopPropagation(); alert('Actions for ' + user.fullName); }} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"><EllipsisHorizontalIcon className="w-5 h-5" /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {users.length === 0 && !isLoading && !searchTerm && (<div className="text-center py-10 text-gray-500">No users in this organization.</div>)}
            {users.length === 0 && !isLoading && searchTerm && (<div className="text-center py-10 text-gray-500">No users found matching "{searchTerm}".</div>)}
          </div>
          {/* TODO: Pagination UI - Render buttons to call handlePageChange(newPage) */}
          {totalUsers > limitPerPage && (
            <div className="mt-4 flex justify-center">
              {/* Example Pagination (very basic) */}
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage <= 1 || isLoading}
                className="px-3 py-1 border rounded-l-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 border-t border-b">Page {currentPage} of {Math.ceil(totalUsers / limitPerPage)}</span>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage >= Math.ceil(totalUsers / limitPerPage) || isLoading}
                className="px-3 py-1 border rounded-r-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default React.memo(UserList);