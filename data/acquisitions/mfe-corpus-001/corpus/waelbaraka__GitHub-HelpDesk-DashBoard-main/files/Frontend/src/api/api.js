// src/api/api.js
import axios from 'axios';
import { useAuthStore } from '../stores/authStore.js'; // Adjust path if necessary

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: BASE_URL, // Axios will prepend this to relative paths
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor for global error handling (optional but good)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios response error details:", error.response?.data || error.message);
    if (error.response && error.response.status === 401) {
      console.warn("API request resulted in 401 Unauthorized. Logging out.");
      // Optional: Trigger global logout
      // useAuthStore.getState().logout();
      // if (window.location.pathname !== '/login') {
      //   window.location.href = '/login';
      // }
    }
    return Promise.reject(error);
  }
);

// --- Define your API functions ---
const realApiInterface = {
  
  // --- Auth ---
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },
  registerOwner: async (payload) => {
    const { data } = await apiClient.post('/auth/register-owner', payload);
    return data;
  },
  acceptInvitation: async ({ token, password, firstName, lastName }) => {
    const { data } = await apiClient.post(`/auth/accept-invitation/${token}`, { password, firstName, lastName });
    return data;
  },
  getAuthProfile: async () => {
    const { data } = await apiClient.get('/auth/profile');
    return data; // Should be { profile: { ...userWithModules } }
  },

  // --- Modules (Marketplace) ---
  listAvailableModules: async (params = {}) => {
    // `params` object will be like { page: 1, limit: 12, sortBy: 'alphabetically', category: '...' }
    // Axios will automatically convert this to a query string.
    // The path '/modules/available' is RELATIVE to BASE_URL.
    // So, BASE_URL + '/modules/available' = http://localhost:3001/api/modules/available
    console.log("API: Calling listAvailableModules with params:", params);
    const { data } = await apiClient.get('/modules/available', { params });
    return data; // Expected: { modules: [], totalModules, currentPage, totalPages }
  },
  getAppDetails: async (moduleId) => { // Renamed from getModuleDetails for clarity
    console.log(`API: Fetching details for module ID: ${moduleId}`);
    const { data } = await apiClient.get(`/modules/available/${moduleId}`);
    return data; // Expected: Full module object
  },
  installOrganizationModule: async ({ moduleId }) => {
    // organizationId is usually inferred from the JWT on the backend
    console.log(`API: Requesting to install module ID: ${moduleId}`);
    const { data } = await apiClient.post(`/modules/install`, { moduleId });
    return data;
  },
  // uninstallOrganizationModule: async ({ moduleId }) => { ... }
sendWhatsAppTestMessage: async (channelId, testPhoneNumber) => {
    const { data } = await apiClient.post(`/integrations/whatsapp/channels/${channelId}/test`, { testPhoneNumber });
    return data;
},

  // --- Users ---
  listUsers: async (params = {}) => {
    const { data } = await apiClient.get('/users', { params });
    return data;
  },
  // ... other user API functions

  // --- Teams/Groups ---
  listTeams: async (params = {}) => {
    const { data } = await apiClient.get('/teams', { params });
    return data;
  },
  createTeam: async (teamData) => {
    const { data } = await apiClient.post('/teams', teamData);
    return data;
  },
  // ... other team API functions

  // --- Conversations & Messages ---
  listConversations: async (params = {}) => {
    const { data } = await apiClient.get('/conversations', { params });
    return data;
  },
  getConversationById: async (conversationId) => {
    const { data } = await apiClient.get(`/conversations/${conversationId}`);
    return data;
  },

    listMessagesForConversation: async (conversationId, params = {}) => {
    console.log(`%c[API CALL] GET /api/conversations/${conversationId}/messages`, 'color: brown;');
    const { data } = await apiClient.get(`/conversations/${conversationId}/messages`, { params });
    return data;
  },
  addMessageToConversation: async (conversationId, messagePayload) => {
    const { data } = await apiClient.post(`/conversations/${conversationId}/messages`, messagePayload);
    return data;
  },
  // ... other conversation/message API functions

  // --- WhatsApp Channel Config ---
  // (Assuming these are needed by a settings page somewhere)
  listWhatsAppChannels: async () => {
    const { data } = await apiClient.get('/integrations/whatsapp/channels');
    return data;
  },
  createWhatsAppChannel: async (channelData) => {
    const { data } = await apiClient.post('/integrations/whatsapp/channels', channelData);
    return data;
  },
  
  // --- ADD THESE TWO FUNCTIONS ---
  updateWhatsAppChannel: async (channelId, updateData) => {
    const { data } = await apiClient.put(`/integrations/whatsapp/channels/${channelId}`, updateData);
    return data;
  },
  deleteWhatsAppChannel: async (channelId) => {
    // The .delete method doesn't typically have a request body.
    const { data } = await apiClient.delete(`/integrations/whatsapp/channels/${channelId}`);
    return data;
  },
  // --- END ADD ---

  sendWhatsAppTestMessage: async (channelId, testPhoneNumber) => {
    const { data } = await apiClient.post(`/integrations/whatsapp/channels/${channelId}/test`, { testPhoneNumber });
    return data;
  },

   assignConversation: async (conversationId, { agentId, teamId }) => {
    const { data } = await apiClient.put(`/conversations/${conversationId}/assign`, { agentId, teamId });
    return data;
  },

  getClientById: async (clientId) => {
    const { data } = await apiClient.get(`/clients/${clientId}`);
    return data;
  },


  listAllOrgTags: async () => {
    // This assumes your GET /api/tags can list all tags for an admin
    const { data } = await apiClient.get('/tags'); 
    return data;
  },
  listTeams: async () => {
    const { data } = await apiClient.get('/teams');
    return data;
  },
  createTag: async (tagData) => {
    const { data } = await apiClient.post('/tags', tagData);
    return data;
  },
  deleteTag: async (tagId) => {
    await apiClient.delete(`/tags/${tagId}`);
  },
  
  getUserTeams: async (userId) => {
  if (!userId) {
    console.error("[API LOG] getUserTeams called without a userId.");
    return [];
  }
  console.log(`%c[API CALL] GET /api/users/${userId}/teams`, 'color: brown;');
  try {
    const { data } = await apiClient.get(`/users/${userId}/teams`);
    console.log(`%c[API SUCCESS] getUserTeams responded with ${data.length} teams.`, 'color: green;');
    return data;
  } catch (error) {
    console.error("[API ERROR] getUserTeams failed:", error.response?.data || error);
    throw error;
  }
},


listTagsForAgent: async (teamIds) => {
  if (!teamIds || teamIds.length === 0) {
    console.log("[API LOG] listTagsForAgent called with no team IDs. Returning empty array.");
    return [];
  }
  const teamIdQuery = teamIds.join(',');
  console.log(`%c[API CALL] GET /api/tags?teamIds=${teamIdQuery}`, 'color: brown;');
  try {
    const { data } = await apiClient.get(`/tags`, { params: { teamIds: teamIdQuery } });
    console.log(`%c[API SUCCESS] listTagsForAgent responded with ${data.length} tags.`, 'color: green;');
    return data;
  } catch (error) {
    console.error("[API ERROR] listTagsForAgent failed:", error.response?.data || error);
    throw error;
  }
},







  //  getWhatsAppChannelById
};

export default realApiInterface;