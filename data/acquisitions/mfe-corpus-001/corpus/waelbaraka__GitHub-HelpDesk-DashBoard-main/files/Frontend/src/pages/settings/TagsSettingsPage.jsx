import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/api.js';
import { useAuthStore } from '../../stores/authStore.js';
import {
    ChevronDownIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    TagIcon as TagIconOutline,
} from '@heroicons/react/24/outline';

const AuthorAvatar = ({ authorName }) => {
    const initials = authorName ? authorName.split(' ').map(n => n[0]).join('').substring(0, 2) : '?';
    return (<div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-2 flex-shrink-0">{initials}</div>);
};

const TagsSettingsPage = () => {
  const [allTags, setAllTags] = useState([]);
  const [agentTeams, setAgentTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#6B7280');
  const { user } = useAuthStore();

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const teams = await api.getUserTeams(user.id);
      setAgentTeams(teams || []);

      if (teams && teams.length > 0) {
        // Default the dropdown to the first team if none is selected
        if (!selectedTeamId) {
            setSelectedTeamId(String(teams[0].id));
        }
        const teamIds = teams.map(t => t.id);
        const tags = await api.listTagsForAgent(teamIds);
        setAllTags(tags || []);
      }
    } catch (error) { toast.error("Could not load settings data."); }
    finally { setIsLoading(false); }
  }, [user?.id, selectedTeamId]); // We refetch when user is available

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim() || !selectedTeamId) {
      toast.error("Tag name and a selected group are required.");
      return;
    }
    try {
      await api.createTag({ name: newTagName.trim(), color: newTagColor, teamId: parseInt(selectedTeamId) });
      toast.success("Tag created successfully!");
      setNewTagName('');
      setNewTagColor('#6B7280');
      fetchData();
    } catch (error) { toast.error(error.response?.data?.message || "Failed to create tag."); }
  };
  
  const handleDeleteTag = async (tag) => { /* ... As defined before ... */ };
  
  // --- THIS IS THE CORRECTED FILTERING LOGIC ---
  const filteredTags = useMemo(() => {
    if (isLoading || !selectedTeamId) return [];
    // Filter the master list of tags based on the dropdown selection
    return allTags.filter(tag => tag.teamId === parseInt(selectedTeamId));
  }, [selectedTeamId, allTags, isLoading]);


  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Page Header */}
      <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tags</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Manage tags for group</span>
          <div className="relative">
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="pl-3 pr-8 py-1.5 text-sm font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              disabled={isLoading || agentTeams.length === 0}
            >
              {agentTeams.length === 0 ? (
                <option>No groups assigned</option>
              ) : (
                agentTeams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)
              )}
            </select>
            <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Create a new tag</h2>
        <form onSubmit={handleCreateTag} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
          <input type="color" value={newTagColor} onChange={(e) => setNewTagColor(e.target.value)} className="w-full sm:w-12 h-10 border-gray-300 rounded-md p-0 m-0 cursor-pointer"/>
          <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Tag name (e.g., urgent-issue)" required className="flex-grow w-full sm:w-auto p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"/>
          <button type="submit" className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm"><PlusIcon className="w-5 h-5 inline -ml-1 mr-1" />Create tag</button>
        </form>

        {/* Tags Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan="4" className="text-center py-10 text-gray-500">Loading...</td></tr>
              ) : filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span style={{ backgroundColor: tag.color || '#e5e7eb' }} className="text-white text-xs font-semibold px-2.5 py-1 rounded-full">{tag.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AuthorAvatar authorName={user.fullName} />
                      <span className="text-sm text-gray-800">Agent ID: {tag.createdByAgentId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(tag.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => alert('Edit feature coming soon!')} className="text-gray-500 hover:text-blue-700 p-1"><PencilIcon className="w-4 h-4"/></button>
                    <button onClick={() => handleDeleteTag(tag)} className="text-gray-500 hover:text-red-700 p-1 ml-2"><TrashIcon className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && filteredTags.length === 0 && (
             <div className="text-center py-10 text-gray-500">
               {agentTeams.length > 0 ? "No tags have been created for this group yet." : "You must be a member of a group to create or view tags."}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsSettingsPage;