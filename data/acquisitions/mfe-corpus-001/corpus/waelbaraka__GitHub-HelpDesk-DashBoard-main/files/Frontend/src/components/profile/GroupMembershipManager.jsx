import React, { useState, useEffect, useMemo } from 'react';
import GroupChip from '../GroupChip';
import api from '../../api/api'; // Assumes api.js exists

const GroupMembershipManager = ({ user }) => {
  const [initialGroups, setInitialGroups] = useState([]);
  const [currentGroups, setCurrentGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const [userGroupsResponse, allGroupsResponse] = await Promise.all([
          api.getUserGroups(user.id),
          api.getAllOrgGroups(user.organizationId),
        ]);
        setInitialGroups(userGroupsResponse);
        setCurrentGroups(userGroupsResponse);
        setAllGroups(allGroupsResponse);
      } catch (error) {
        console.error("Failed to fetch group data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (isLoading) return;
    const initialIds = new Set(initialGroups.map(g => g.id));
    const currentIds = new Set(currentGroups.map(g => g.id));
    const areEqual = initialIds.size === currentIds.size && [...initialIds].every(id => currentIds.has(id));
    setIsDirty(!areEqual);
  }, [currentGroups, initialGroups, isLoading]);

  const filteredAvailableGroups = useMemo(() => {
    const currentGroupIds = new Set(currentGroups.map(g => g.id));
    return allGroups.filter(
      (group) => !currentGroupIds.has(group.id) && group.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currentGroups, allGroups, searchTerm]);

  const handleAssignGroup = (group) => {
    setCurrentGroups(prev => [...prev, group].sort((a, b) => a.name.localeCompare(b.name)));
    setSearchTerm('');
    setDropdownOpen(false);
  };

  const handleRemoveGroup = (groupId) => {
    const group = currentGroups.find(g => g.id === groupId);
    if (group?.name === 'General') return;
    setCurrentGroups(prev => prev.filter(g => g.id !== groupId));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const initialIds = new Set(initialGroups.map(g => g.id));
    const currentIds = new Set(currentGroups.map(g => g.id));
    const groupsToAdd = currentGroups.filter(g => !initialIds.has(g.id));
    const groupsToRemove = initialGroups.filter(g => !currentIds.has(g.id));

    try {
      await api.updateUserGroups(user.id, groupsToAdd, groupsToRemove);
      setInitialGroups(currentGroups);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setCurrentGroups(initialGroups);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200" style={{ maxWidth: '800px', minHeight: '184px' }}>
        <p className="text-gray-500">Loading group memberships...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200" style={{ maxWidth: '800px' }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Member of {currentGroups.length} groups
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
          <div className="relative">
            <label htmlFor="assign-group-input" className="block text-sm font-medium text-gray-700 mb-1">Assign to groups</label>
            <input id="assign-group-input" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setDropdownOpen(true)} onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} placeholder="Enter groups" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
            {isDropdownOpen && filteredAvailableGroups.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <ul>{filteredAvailableGroups.map(group => (<li key={group.id} className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleAssignGroup(group)}>{group.name}</li>))}</ul>
              </div>
            )}
          </div>
          <div className="relative">
            <label htmlFor="find-group-input" className="block text-sm font-medium text-gray-700 mb-1">Find group</label>
             {/* ... find group input ... */}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[42px]">
          {currentGroups.map(group => (
            <GroupChip key={group.id} group={group} onRemove={handleRemoveGroup} isLocked={group.name === 'General'} />
          ))}
        </div>
      </div>
      
      {isDirty && (
        <div className="mt-6 flex justify-end items-center gap-x-3">
          <button type="button" onClick={handleCancel} disabled={isSaving} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={handleSaveChanges} disabled={isSaving} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">{isSaving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      )}
    </div>
  );
};

export default GroupMembershipManager;