import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore.js';
import { motion, AnimatePresence } from 'framer-motion';
import isEqual from 'lodash.isequal';
import toast from 'react-hot-toast';
import ChangePasswordModal from '../components/auth/ChangePasswordModal.jsx';
import GroupChip from '../components/GroupChip.jsx'; // Import GroupChip
import AgentLoginStatusCard from '../components/profile/AgentLoginStatusCard'; // <-- IMPORT THE NEW CARD

import {
  ArrowLeftIcon, PencilIcon, LockClosedIcon, InformationCircleIcon,
  QuestionMarkCircleIcon, UserCircleIcon as UserCircleOutline, ClockIcon,
  ShieldExclamationIcon, BellIcon, CheckCircleIcon, MinusCircleIcon,
  EllipsisHorizontalIcon, MagnifyingGlassIcon, XMarkIcon, ChevronDownIcon,
} from '@heroicons/react/24/outline';

// Simulated API Service (replace with your actual API calls)
const api = {
  getUserProfile: async (userId) => {
    console.log("API: Fetching profile for user", userId);
    await new Promise(res => setTimeout(res, 500));
    // This should come from your authStore or a dedicated API call
    const globalUser = useAuthStore.getState().user;
    return {
      id: globalUser?.id || 1,
      organizationId: globalUser?.organizationId || 1,
      fullName: globalUser?.fullName || 'Pytsud',
      firstName: globalUser?.firstName || 'Pytsud',
      lastName: globalUser?.lastName || '',
      email: globalUser?.email || 'pytsud@gmail.com',
      role: globalUser?.roles?.[0]?.name || 'Admin',
      jobTitle: globalUser?.jobTitle || 'Product Expert',
      chatLimit: globalUser?.maxConcurrentChats || 3,
      profilePictureUrl: globalUser?.profilePictureUrl,
      agentStatusAfterLogin: 'accept_chats',
      timeFormat: '12-hour',
      emailUpdates: { dailySummary: true, weeklySummary: true, newUnassignedChat: true },
    };
  },
  getUserGroups: async (userId) => {
    console.log("API: Fetching groups for user", userId);
    await new Promise(res => setTimeout(res, 600));
    // Simulate initial groups
    return [
        { id: 'g1', name: 'General', initial: 'G', color: 'bg-blue-600' },
        { id: 'g2', name: 'mwees', initial: 'M', color: 'bg-red-500' }
    ];
  },
  getAllOrgGroups: async (organizationId) => {
    console.log("API: Fetching all org groups for org", organizationId);
    await new Promise(res => setTimeout(res, 400));
    return [
      { id: 'g1', name: 'General' }, { id: 'g2', name: 'mwees' },
      { id: 'g3', name: 'Support Tier 1' }, { id: 'g4', name: 'Billing Queries' },
      { id: 'g5', name: 'Technical Escalations' }, { id: 'g6', name: 'Product Feedback' }
    ];
  },
  updateUserProfile: async (userId, data) => {
    console.log("API: Updating profile for user", userId, data);
    await new Promise(res => setTimeout(res, 1000));
    return { success: true, updatedData: data };
  },
  updateUserGroups: async (userId, groupsToAdd, groupsToRemove) => {
    console.log("API: Updating groups for user", userId);
    console.log("==> ADDING:", groupsToAdd.map(g => g.name));
    console.log("==> REMOVING:", groupsToRemove.map(g => g.name));
    await new Promise(res => setTimeout(res, 1000));
    return { success: true };
  }
};


const UserProfilePage = React.memo(({ pageLabel = "Profile" }) => {
  const navigate = useNavigate();
  const { user: globalUser, setUser: updateGlobalUser } = useAuthStore();

  const [initialProfileData, setInitialProfileData] = useState(null);
  const [formProfileData, setFormProfileData] = useState(null);

  const [initialGroupsData, setInitialGroupsData] = useState([]);
  const [formGroupsData, setFormGroupsData] = useState([]);
  const [allOrgGroups, setAllOrgGroups] = useState([]);

  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [assignGroupSearch, setAssignGroupSearch] = useState('');
  const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);

// src/pages/UserProfilePage.jsx
// ...
const [hasLoadedData, setHasLoadedData] = useState(false); // New state to track loading

useEffect(() => {
  const loadData = async () => {
    if (!globalUser?.id || !globalUser?.organizationId) {
      toast.error("User session or organization details are missing for data loading.");
      setIsLoading(false); // Ensure loading stops if we can't proceed
      return;
    }

    console.log("UserProfilePage: ENTERING loadData for user:", globalUser.id);
    setIsLoading(true); // Set loading true before fetching

    try {
      const [profile, userGroupsResponse, orgGroups] = await Promise.all([
        api.getUserProfile(globalUser.id),
        api.getUserGroups(globalUser.id),
        api.getAllOrgGroups(globalUser.organizationId),
      ]);

      console.log("UserProfilePage: api.getUserProfile response:", profile);
      console.log("UserProfilePage: api.getUserGroups response:", userGroupsResponse);
      console.log("UserProfilePage: api.getAllOrgGroups response:", orgGroups);

      const fullProfile = { 
          ...profile, 
          workingHours: profile.workingHours || [],
          // Ensure agentStatusAfterLogin has a default from profile or a general default
          agentStatusAfterLogin: profile.agentStatusAfterLogin || 'accept_chats', 
      };

      setInitialProfileData(fullProfile);
      setFormProfileData(fullProfile);

      setInitialGroupsData(userGroupsResponse || []);
      setFormGroupsData(userGroupsResponse || []);
      
      setAllOrgGroups(orgGroups || []);
      setHasLoadedData(true); // Mark that data has been loaded

    } catch (error) {
      console.error("UserProfilePage - Load data error:", error);
      toast.error("Failed to load profile data. Please try again.");
      setHasLoadedData(false); // Indicate loading failed, might allow retry
    } finally {
      setIsLoading(false);
    }
  };

  // Only load data if we have the necessary IDs AND data hasn't been loaded yet for this user/org combination.
  // If globalUser.id or organizationId can change during the component's lifecycle and you need to refetch,
  // then hasLoadedData should be reset when those IDs change.
  // For now, this aims to load once when IDs are available.
  if (globalUser?.id && globalUser?.organizationId && !hasLoadedData) {
    loadData();
  } else if (!globalUser?.id || !globalUser?.organizationId) {
    // console.log("UserProfilePage: Waiting for globalUser to be populated to load data.");
    // If not loading and no IDs, might want to set loading to true to show spinner until IDs arrive.
    if (!isLoading && !hasLoadedData) {
        // setIsLoading(true); // Optional: show loading if waiting for globalUser
    }
  }
// Dependency array: This effect now depends on globalUser's ID and orgId, and also on hasLoadedData.
// When globalUser.id/orgId changes, and hasLoadedData is false (or reset), it will try to load.
}, [globalUser?.id, globalUser?.organizationId, hasLoadedData, isLoading]); // Added isLoading to dependencies
  // Check for dirty state
  useEffect(() => {
    if (isLoading || !initialProfileData || !formProfileData) { setIsDirty(false); return; }
    
    // Separate profile details from workingHours for comparison if workingHours is complex
    const { workingHours: initialWH, ...initialDetails } = initialProfileData;
    const { workingHours: formWH, ...formDetails } = formProfileData;

    const profileDetailsDirty = !isEqual(initialDetails, formDetails);
    const workingHoursDirty = !isEqual(initialWH || [], formWH || []); // Compare workingHours
    
    const initialGroupIds = new Set((initialGroupsData || []).map(g => g.id));
    const formGroupIds = new Set((formGroupsData || []).map(g => g.id));
    const groupsDirty = initialGroupIds.size !== formGroupIds.size || ![...initialGroupIds].every(id => formGroupIds.has(id));
    
    setIsDirty(profileDetailsDirty || workingHoursDirty || groupsDirty);

  }, [formProfileData, formGroupsData, initialProfileData, initialGroupsData, isLoading]);

 const handleProfileChange = useCallback((eOrValue, fieldName) => {
    // This function needs to be flexible to handle direct value changes (from AgentLoginStatusCard)
    // and event-based changes (from regular inputs)
    if (typeof eOrValue === 'object' && eOrValue.target) { // It's an event
      const { name, value, type, checked } = eOrValue.target;
      setFormProfileData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value, 10) || 0 : value)
      }));
    } else { // It's a direct value, like from our new card
      setFormProfileData(prev => ({
        ...prev,
        [fieldName]: eOrValue
      }));
    }
  }, []);
  
  // --- Group Management Logic ---
  const filteredAvailableGroups = useMemo(() => {
    const currentGroupIds = new Set(formGroupsData.map(g => g.id));
    return allOrgGroups.filter(
      (group) => !currentGroupIds.has(group.id) && group.name.toLowerCase().includes(assignGroupSearch.toLowerCase())
    );
  }, [formGroupsData, allOrgGroups, assignGroupSearch]);

  const handleAssignGroup = (group) => {
    setFormGroupsData(prev => [...prev, group].sort((a, b) => a.name.localeCompare(b.name)));
    setAssignGroupSearch('');
    setIsGroupDropdownOpen(false);
  };

  const handleRemoveGroup = (groupId) => {
    const group = formGroupsData.find(g => g.id === groupId);
    if (group?.name === 'General') { // "General" group often has special meaning
        toast.error("The 'General' group cannot be removed.");
        return;
    }
    setFormGroupsData(prev => prev.filter(g => g.id !== groupId));
  };
  // --- End Group Management ---
const handleSaveChanges = useCallback(async (e) => {
    e.preventDefault();
    if (!formProfileData) return;
    setIsSaving(true);
    let changesMadeOverall = false;
    try {
      // Profile details (excluding workingHours if handled by a separate API endpoint)
      const { workingHours: formWorkingHours, ...profileDetailsToSave } = formProfileData;
      const { workingHours: initialWorkingHours, ...initialDetailsToCompare } = initialProfileData;

      if (!isEqual(initialDetailsToCompare, profileDetailsToSave)) {
        await api.updateUserProfile(globalUser.id, profileDetailsToSave);
        changesMadeOverall = true;
      }
      
      // Working Hours
      if (!isEqual(initialWorkingHours || [], formWorkingHours || [])) {
        console.log("API: Saving working hours:", formWorkingHours);
        // Example: await api.updateUserWorkingHours(globalUser.id, formWorkingHours);
        // For now, assume updateUserProfile can handle it or it's part of the profileDetailsToSave
        // If it's a separate field for updateUserProfile, ensure it's included there.
        // If your main api.updateUserProfile takes the whole formProfileData including workingHours:
        // await api.updateUserProfile(globalUser.id, formProfileData); // if profile save includes workingHours
        changesMadeOverall = true; 
      }

      // Group memberships (same as your working version)
      // ...
      
      if (changesMadeOverall) {
        setInitialProfileData(formProfileData); // Update all initial data
        updateGlobalUser({ ...globalUser, ...formProfileData });
        toast.success('Profile updated successfully!');
      } else { /* ... */ }
       setIsDirty(false);
    } catch (error) { /* ... */ } finally { setIsSaving(false); }
  }, [formProfileData, formGroupsData, initialProfileData, initialGroupsData, globalUser, updateGlobalUser]);

  const handleCancel = useCallback(() => {
    setFormProfileData(initialProfileData);
    setFormGroupsData(initialGroupsData);
  }, [initialProfileData, initialGroupsData]);


   const handleInputChangeEvent = useCallback((event) => {
    if (!event || !event.target) {
      console.warn("handleInputChangeEvent called without a valid event or target");
      return;
    }
    const { name, value, type, checked } = event.target;
    setFormProfileData(prev => {
      if (!prev) return null; // Safety check if formProfileData is somehow null
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value, 10) || 0 : value),
      };
    });
  }, []); // Dependency array usually empty for setState from useState if using functional update

  // This one is for custom components like AgentLoginStatusCard
  const handleFormValueChange = useCallback((value, fieldName) => {
    setFormProfileData(prev => {
      if (!prev) return null;
      return { ...prev, [fieldName]: value };
    });
  }, []);

 const UserProfileHeaderDisplay = ({ user }) => (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className={`w-24 h-24 ${user?.avatarColor || 'bg-gray-400'} rounded-full flex items-center justify-center text-white text-4xl font-semibold`}>
          {user?.firstName ? user.firstName.charAt(0).toUpperCase() : (user?.fullName?.charAt(0).toUpperCase() || 'U')}
        </div>
      </div>
      <div>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
          {user?.role || 'User Role'}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">{user?.fullName || 'User Full Name'}</h1>
        <p className="text-base text-gray-600 mt-1">{user?.jobTitle || 'Job Title Not Set'}</p>
      </div>
    </div>
  );  const memoizedOnScheduleChange = useCallback((newSchedule) => {
    handleFormValueChange(newSchedule, 'workingHours');
  }, [handleFormValueChange]);

  const memoizedOnLoginStatusChange = useCallback((newStatus) => { // THIS IS THE FUNCTION TO PASS
    handleFormValueChange(newStatus, 'agentStatusAfterLogin');
  }, [handleFormValueChange]);
  


  if (isLoading || !formProfileData) {
    return (
      <div className="relative flex flex-1 flex-col bg-white overflow-hidden">
        {/* Header even during loading for consistency, or a simpler loading header */}
        <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center flex-shrink-0">
          <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 w-20 opacity-50 cursor-not-allowed">
            <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold text-gray-800">{pageLabel}</h1>
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Profile...</p>
        </div>
      </div>
    );
  }

  // Main return statement for when data is loaded
  return (
    <div className="relative flex flex-1 flex-col bg-white overflow-hidden">
      {/* Password Change Modal */}
      {isPasswordModalOpen && <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />}
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center flex-shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-semibold text-gray-800">{pageLabel}</h1>
        </div>
        <div className="w-20"></div> {/* Spacer to keep title centered */}
      </div>

      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto p-6 space-y-10"> {/* Consistent vertical spacing between sections */}
          
          {/* User Profile Header Display Component */}
          <UserProfileHeaderDisplay user={formProfileData} />

          {/* Sections Container with Bottom Padding for Sticky Bar */}
          <div className="pb-28"> 
            
            {/* Details Section */}
            <div> {/* Section Wrapper */}
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
                Details
              </h3>
              {/* 
                The form tag is optional here if the save button is outside. 
                If kept, ensure its onSubmit is not conflicting with the sticky bar's button.
              */}
              <div className="space-y-6"> {/* Changed from form tag for clarity, as save is external */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      value={formProfileData.fullName || ''} 
                      onChange={handleInputChangeEvent} // Use specific handler for input events
                      disabled={isLoading || isSaving}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  {/* Email & Change Password */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                      <button 
                        type="button" 
                        onClick={() => setIsPasswordModalOpen(true)} 
                        disabled={isLoading || isSaving}
                        className="text-sm text-blue-600 hover:underline font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 rounded disabled:text-gray-400 disabled:no-underline"
                      >
                        Change password
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email" 
                        value={formProfileData.email || ''} 
                        readOnly 
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed pr-10 shadow-sm" 
                      />
                      <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Job Title Field */}
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
                    <input 
                      type="text" 
                      id="jobTitle" 
                      name="jobTitle" 
                      value={formProfileData.jobTitle || ''} 
                      onChange={handleInputChangeEvent}
                      disabled={isLoading || isSaving}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  {/* Chat Limit Field */}
                  <div>
                    <label htmlFor="chatLimit" className="block text-sm font-medium text-gray-700 mb-1">
                      Chat limit <InformationCircleIcon className="w-4 h-4 inline-block text-gray-400 -mt-0.5"/>
                    </label>
                    <input 
                      type="number" 
                      id="chatLimit" 
                      name="chatLimit" 
                      value={formProfileData.chatLimit || 0} 
                      onChange={handleInputChangeEvent}
                      disabled={isLoading || isSaving}
                      className="w-24 p-2 border border-gray-300 rounded-md text-center shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">3 is optimal for rookies</p>
                  </div>
                </div>
              </div>
            </div> {/* End Details Section Wrapper */}

            {/* Group Membership Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
                {/* MODIFIED HEADER TO INCLUDE COUNT */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Group Membership
                    </h3>
                    {/* Display the count if formGroupsData is loaded */}
                    {formGroupsData && (
                        <span className="text-sm text-gray-500">
                            Member of {formGroupsData.length} group{formGroupsData.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
                
                {/* The rest of the group management UI */}
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                        {/* ... Assign to groups input ... */}
                        <div className="relative">
                            <label htmlFor="assign-group-input" className="block text-sm font-medium text-gray-700 mb-1">Assign to groups</label>
                            <input 
                              id="assign-group-input" 
                              type="text" 
                              value={assignGroupSearch}
                              onChange={(e) => setAssignGroupSearch(e.target.value)}
                              onFocus={() => setIsGroupDropdownOpen(true)}
                              onBlur={() => setTimeout(() => setIsGroupDropdownOpen(false), 200)}
                              placeholder="Enter groups"
                              disabled={isLoading || isSaving}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                            {isGroupDropdownOpen && filteredAvailableGroups.length > 0 && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    <ul>{filteredAvailableGroups.map(group => (
                                        <li key={group.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onMouseDown={() => handleAssignGroup(group)}
                                        >
                                            {group.name}
                                        </li>
                                    ))}</ul>
                                </div>
                            )}
                        </div>
                        {/* ... Find group input ... */}
                        <div className="relative">
                             <label htmlFor="find-group-input" className="block text-sm font-medium text-gray-700 mb-1">Find group</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <input 
                                  type="text" 
                                  id="find-group-input"
                                  placeholder="Find group" 
                                  // You might want to wire this up to filter displayed chips or for a different search
                                  disabled={isLoading || isSaving}
                                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                />
                              </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[42px]">
                        {(formGroupsData || []).map(group => ( // Add default empty array for safety before map
                            <GroupChip 
                              key={group.id} 
                              group={group} 
                              onRemove={handleRemoveGroup} 
                              isLocked={group.name === 'General'}
                              disabled={isLoading || isSaving} 
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* --- END GROUP MEMBERSHIP SECTION --- */}
            
            {/* Agent Status Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
               <AgentLoginStatusCard
                currentLoginStatus={formProfileData.agentStatusAfterLogin}
                onLoginStatusChange={memoizedOnLoginStatusChange} // <<< --- ADD THIS PROP BACK
                currentSchedule={formProfileData.workingHours || []}
                onScheduleChange={memoizedOnScheduleChange}
                disabled={isSaving || isLoading}
              />
            </div>
          </div> {/* End of Sections Container with Bottom Padding */}
        </div> {/* End of max-w-800px container */}
      </div> {/* End of Main Scrollable Content Area */}
      
      {/* Sticky Save Changes Bar */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-[70px] z-40 shadow-[0_-4px_12px_-5px_rgba(0,0,0,0.08)]"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            <div className="max-w-[800px] mx-auto px-6 h-full flex justify-end items-center">
              <button 
                onClick={handleCancel} 
                disabled={isSaving} // Only disabled by isSaving, not isLoading for cancel
                className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveChanges} 
                disabled={isSaving || isLoading} // Disabled if saving OR if still initial loading
                className="ml-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default UserProfilePage;