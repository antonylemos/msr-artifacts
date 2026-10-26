// src/pages/TeamPage.jsx
import React, { useState, useCallback } from 'react'; // Removed useMemo, useEffect from here as they move to child
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

// Child Components
import TeamTabs from '../components/team/TeamTabs';
import UserList from '../components/team/UserList';
import GroupList from '../components/team/GroupList';
import TeamMemberDetailsSidebar from '../components/team/TeamMemberDetailsSidebar';
import GroupDetailsSidebar from '../components/team/GroupDetailsSidebar';
import CreateTeamModal from '../components/team/CreateTeamModal';
// API (if needed directly by TeamPage, e.g., for initial counts or global actions)
// import { myApiFunctions as api } from '../api/api.js';
import toast from 'react-hot-toast';


const TeamPage = () => { // Removed React.memo for simplicity, add back if performance profiling shows need
    const [activeTab, setActiveTab] = useState('Users'); // Default tab
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserDetailsSidebarOpen, setIsUserDetailsSidebarOpen] = useState(false);


    const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
    const [groups, setGroups] = useState([]); // Initialize as empty array
    const [totalGroups, setTotalGroups] = useState(0);
    const [groupsCurrentPage, setGroupsCurrentPage] = useState(1);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isGroupDetailsSidebarOpen, setIsGroupDetailsSidebarOpen] = useState(false);
    const [refreshGroupsKey, setRefreshGroupsKey] = useState(0); // New state
    // For now, GroupList is self-contained for displaying.
    const [groupsDataForPage, setGroupsDataForPage] = useState([]); 


    const tabs = ['Users', 'Chatbots', 'Groups', 'Suspended agents'];

    const handleTabChange = useCallback((tabName) => {
        setActiveTab(tabName);
        // Reset selections when changing tabs
        setSelectedUser(null);
        setIsUserDetailsSidebarOpen(false);
        setSelectedGroup(null);
        setIsGroupDetailsSidebarOpen(false);
    }, []);

    const handleUserSelect = useCallback((user) => {
        setSelectedUser(user);
        setIsUserDetailsSidebarOpen(true);
        setIsGroupDetailsSidebarOpen(false); // Close other sidebar
    }, []);
    const handleCloseUserDetailsSidebar = useCallback(() => {
        setIsUserDetailsSidebarOpen(false);
        setSelectedUser(null);
    }, []);

    const handleGroupSelect = useCallback((group) => {
        setSelectedGroup(group);
        setIsGroupDetailsSidebarOpen(true);
        setIsUserDetailsSidebarOpen(false); // Close other sidebar
    }, []);
    const handleCloseGroupDetailsSidebar = useCallback(() => {
        setIsGroupDetailsSidebarOpen(false);
        setSelectedGroup(null);
    }, []);

    const handleOpenCreateTeamModal = useCallback(() => {
        setIsCreateTeamModalOpen(true);
    }, []);

  const handleTeamCreatedInModal = useCallback((newTeamFromApi) => {
        // 'setGroups' is now correctly in scope from TeamPage's useState
        setGroups(prevGroups => { 
            const existing = prevGroups.find(g => g.id === newTeamFromApi.id);
            if (existing) {
                return prevGroups.map(g => g.id === newTeamFromApi.id ? newTeamFromApi : g);
            }
            return [newTeamFromApi, ...prevGroups].sort((a, b) => a.name.localeCompare(b.name));
        });
        setIsCreateTeamModalOpen(false);
        setRefreshGroupsKey(prevKey => prevKey + 1); 
        toast.success(`Group "${newTeamFromApi.name}" created!`);
    }, []); // setGroups is stable, not needed as dependency


    const renderTabContent = () => {
        switch (activeTab) {
            case 'Users':
                return <UserList 
                            onUserSelect={handleUserSelect} 
                            onInviteAgentClick={() => toast.info("Invite agents clicked!")}
                            onAddNewChatbotClick={() => toast.info("Add new chatbot clicked!")}
                        />;
            case 'Groups':
                return <GroupList 
                            onGroupSelect={handleGroupSelect}
                            onCreateNewGroup={handleOpenCreateTeamModal}
                            key={refreshGroupsKey} 
                        />;
            case 'Chatbots':
            case 'Suspended agents':
                return <div className="p-6 text-center text-gray-500">Content for {activeTab} tab will go here.</div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-1 bg-gray-100 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200 px-6">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">Team</h1>
                        <button className="text-sm text-indigo-600 hover:underline flex items-center">
                            Invite settings <Cog6ToothIcon className="w-4 h-4 ml-1.5"/>
                        </button>
                    </div>
                    {/* Tabs Navigation */}
                    <TeamTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
                </div>

                {/* Main Content Area based on Active Tab */}
                <div className="flex-grow p-6">
                    {renderTabContent()}
                </div>
            </div>

            {/* Sidebars - Rendered based on state */}
            {isUserDetailsSidebarOpen && selectedUser && (
                <TeamMemberDetailsSidebar agent={selectedUser} onClose={handleCloseUserDetailsSidebar} />
            )}
            {isGroupDetailsSidebarOpen && selectedGroup && (
                <GroupDetailsSidebar group={selectedGroup} onClose={handleCloseGroupDetailsSidebar} />
            )}
        
            {/* Modal - Rendered based on state */}
            <CreateTeamModal 
                isOpen={isCreateTeamModalOpen} 
                onClose={() => setIsCreateTeamModalOpen(false)} 
                onTeamCreated={handleTeamCreatedInModal} 
            />
        </div>
    );
};

export default TeamPage;