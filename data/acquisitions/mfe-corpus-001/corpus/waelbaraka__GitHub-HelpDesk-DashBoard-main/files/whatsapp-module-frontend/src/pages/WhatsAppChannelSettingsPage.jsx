// whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

// --- Shared Modules passed as props from the host ---
// We will receive `apiClient` and `useAuthStoreHook` as props.

// --- Icons ---
import {
  PlusIcon, PencilIcon, TrashIcon, XMarkIcon, InformationCircleIcon,
  CheckCircleIcon, XCircleIcon
} from '@heroicons/react/24/solid';

// --- Reusable Toggle Switch Component ---
const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    disabled={disabled}
    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'}
      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
      border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    <span
      className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow 
        ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);


// --- Channel Form Modal Component ---
const ChannelFormModal = ({ isOpen, onClose, onSave, currentChannel, apiClient }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (currentChannel) {
        // Editing existing channel
        setFormData({
          id: currentChannel.id,
          channelName: currentChannel.channelName || '',
          phoneNumber: currentChannel.phoneNumber || '',
          provider: currentChannel.provider || 'meta_cloud_api',
          metaPhoneNumberId: currentChannel.metaPhoneNumberId || '',
          metaBusinessAccountId: currentChannel.metaBusinessAccountId || '',
          metaAccessToken: '', // Security: Always clear token field for editing
          webhookVerificationToken: currentChannel.webhookVerificationToken || '',
          isActive: currentChannel.isActive || false,
        });
      } else {
        // Adding new channel
        setFormData({
          channelName: '',
          phoneNumber: '',
          provider: 'meta_cloud_api',
          metaPhoneNumberId: '',
          metaBusinessAccountId: '',
          metaAccessToken: '',
          webhookVerificationToken: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().substring(0, 20) : `verifyToken${Date.now()}`,
          isActive: false,
        });
      }
    }
  }, [currentChannel, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.channelName || !formData.phoneNumber || !formData.metaPhoneNumberId || !formData.metaBusinessAccountId || (!formData.id && !formData.metaAccessToken) || !formData.webhookVerificationToken) {
      toast.error("Please fill in all required Meta Cloud API fields.");
      return;
    }
    setIsSubmitting(true);
    
    // Don't send the token field if it's empty during an update
    const payload = { ...formData };
    if (formData.id && !formData.metaAccessToken) {
      delete payload.metaAccessToken;
    }

    try {
      if (formData.id) {
        await apiClient.updateWhatsAppChannel(formData.id, payload);
        toast.success("Channel updated successfully!");
      } else {
        await apiClient.createWhatsAppChannel(payload);
        toast.success("Channel created successfully!");
      }
      onSave(); // This will trigger a refetch in the parent component
      onClose();
    } catch (error) {
      console.error("Error saving WhatsApp channel:", error);
      toast.error(error.response?.data?.message || "Failed to save channel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // Dynamically determine the webhook URL based on the window's hostname
  const webhookUrl = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? 'YOUR_NGROK_HTTPS_URL/webhooks/whatsapp'
    : `https://${window.location.hostname}/webhooks/whatsapp`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 className="text-lg font-semibold text-gray-800">
              {formData.id ? 'Edit WhatsApp Channel' : 'Add New WhatsApp Channel'}
            </h3>
            <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
              <XMarkIcon className="w-5 h-5"/>
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto scrollbar-thin">
            {/* --- Basic Information --- */}
            <div>
              <label htmlFor="channelName" className="block text-sm font-medium text-gray-600 mb-1">Channel Display Name*</label>
              <input type="text" name="channelName" id="channelName" value={formData.channelName || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Main Sales Line"/>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600 mb-1">WhatsApp Phone Number (E.164 format)*</label>
              <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" placeholder="+1xxxxxxxxxx"/>
            </div>

            {/* --- Meta Cloud API Credentials --- */}
            <h4 className="text-base font-semibold text-gray-700 pt-3 border-t mt-5">Meta Cloud API Credentials</h4>
            <div>
              <label htmlFor="metaPhoneNumberId" className="block text-sm font-medium text-gray-600 mb-1">Phone Number ID*</label>
              <input type="text" name="metaPhoneNumberId" id="metaPhoneNumberId" value={formData.metaPhoneNumberId || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md"/>
              <p className="text-xs text-gray-500 mt-1">Find this in your Meta App Dashboard under WhatsApp  API Setup.</p>
            </div>
            <div>
              <label htmlFor="metaBusinessAccountId" className="block text-sm font-medium text-gray-600 mb-1">WhatsApp Business Account ID (WABA ID)*</label>
              <input type="text" name="metaBusinessAccountId" id="metaBusinessAccountId" value={formData.metaBusinessAccountId || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md"/>
              <p className="text-xs text-gray-500 mt-1">Find this in your Meta Business Manager or App Dashboard.</p>
            </div>
            <div>
              <label htmlFor="metaAccessToken" className="block text-sm font-medium text-gray-600 mb-1">
                System User Access Token* {formData.id && <span className="text-xs">(Leave blank to keep existing)</span>}
              </label>
              <input type="password" name="metaAccessToken" id="metaAccessToken" value={formData.metaAccessToken || ''} onChange={handleChange} required={!formData.id} className="w-full p-2 border border-gray-300 rounded-md"/>
              <p className="text-xs text-gray-500 mt-1">A permanent, non-expiring System User token is required for production.</p>
            </div>

            {/* --- Webhook Configuration --- */}
            <h4 className="text-base font-semibold text-gray-700 pt-3 border-t mt-5">Webhook Configuration</h4>
            <div>
              <label htmlFor="webhookVerificationToken" className="block text-sm font-medium text-gray-600 mb-1">Your Webhook Verify Token*</label>
              <input type="text" name="webhookVerificationToken" id="webhookVerificationToken" value={formData.webhookVerificationToken || ''} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md"/>
              <p className="text-xs text-gray-500 mt-1">Create a strong random string. You'll enter this token in your Meta App Dashboard.</p>
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-md border border-blue-200">
              <InformationCircleIcon className="w-5 h-5 inline-block mr-2 text-blue-500 relative -top-px"/>
              <span className="font-medium text-blue-800">Webhook URL for Meta:</span>
              <code className="block break-all bg-blue-100 p-2 rounded text-blue-900 text-xs mt-2">{webhookUrl}</code>
              <p className="mt-2 text-xs text-blue-700">During development, replace `YOUR_NGROK_HTTPS_URL` with your actual ngrok URL.</p>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200 sticky bottom-0">
            <label className="flex items-center text-sm">
                <input type="checkbox" name="isActive" id="isActive" checked={!!formData.isActive} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"/>
                Activate channel upon saving
            </label>
            <div>
              <button type="button" onClick={onClose} disabled={isSubmitting} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition disabled:opacity-50">
                {isSubmitting ? 'Saving...' : (formData.id ? 'Save Changes' : 'Create Channel')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const WhatsAppChannelSettingsPage = ({ apiClient, useAuthStoreHook }) => {
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState(null);
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(null); // Holds the channel to be deleted
const [testingChannel, setTestingChannel] = useState(null); // Will hold the channel being tested

  const fetchChannels = useCallback(async () => {
    if (!apiClient) {
        setError("API Client not available.");
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiClient.listWhatsAppChannels();
      setChannels(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching WhatsApp channels:", err);
      setError(err.response?.data?.message || "Could not load channels.");
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleModalSave = () => {
    fetchChannels(); // Refetch the list after saving
  };

  const handleAddChannel = () => {
    setEditingChannel(null);
    setIsModalOpen(true);
  };

  const handleEditChannel = (channel) => {
    setEditingChannel(channel);
    setIsModalOpen(true);
  };
  
  const handleDeleteChannel = async () => {
    if (!showConfirmDelete) return;
    try {
        await apiClient.deleteWhatsAppChannel(showConfirmDelete.id);
        toast.success(`Channel "${showConfirmDelete.channelName}" deleted.`);
        setShowConfirmDelete(null);
        fetchChannels();
    } catch (err) {
        toast.error("Failed to delete channel.");
        console.error("Delete error:", err);
    }
  };
  
  const handleToggleActive = async (channel) => {
    try {
        await apiClient.updateWhatsAppChannel(channel.id, { isActive: !channel.isActive });
        toast.success(`Channel ${!channel.isActive ? 'activated' : 'deactivated'}.`);
        fetchChannels();
    } catch (err) {
        toast.error("Failed to update channel status.");
        console.error("Toggle active error:", err);
    }
  };


  const handleSendTest = async (phoneNumber) => {
    if (!testingChannel || !phoneNumber) {
        toast.error("Channel or phone number is missing.");
        return;
    }
    toast.loading("Sending test message...");
    try {
        const result = await apiClient.sendWhatsAppTestMessage(testingChannel.id, phoneNumber);
        toast.dismiss();
        toast.success(result.message);
        setTestingChannel(null); // Close the modal
    } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message || "Failed to send test message.");
        console.error("Test message error:", err);
    }
};


  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">WhatsApp Business</h1>
                <p className="text-sm text-gray-500 mt-1">Connect and manage your official WhatsApp Business API channels.</p>
            </div>
            <button onClick={handleAddChannel} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Channel
            </button>
        </div>

        {isLoading && <p>Loading channels...</p>}
        {error && <p className="text-red-500 font-medium p-4 bg-red-50 rounded-md">Error: {error}</p>}
        
        {!isLoading && !error && (
            channels.length > 0 ? (
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel / Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {channels.map(channel => (
                                <tr key={channel.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{channel.channelName}</div>
                                        <div className="text-sm text-gray-500">{channel.phoneNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Meta Cloud API</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {/* This is a placeholder for webhook status. A real implementation would need a backend check. */}
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            <InformationCircleIcon className="w-4 h-4 mr-1.5"/>
                                            Check in Meta
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ToggleSwitch enabled={channel.isActive} onChange={() => handleToggleActive(channel)} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button onClick={() => setTestingChannel(channel)} title="Test Channel" className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors">
        {/* You can use a PaperAirplaneIcon or similar here */}
        Test
    </button>
                                        <button onClick={() => handleEditChannel(channel)} title="Edit" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"><PencilIcon className="w-5 h-5"/></button>
                                        <button onClick={() => setShowConfirmDelete(channel)} title="Delete" className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No WhatsApp channels</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new channel.</p>
                    <div className="mt-6">
                        <button onClick={handleAddChannel} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Add New Channel
                        </button>
                    </div>
                </div>
            )
        )}
      </div>

      {isModalOpen && (
        <ChannelFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
          currentChannel={editingChannel}
          apiClient={apiClient}
        />
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-800">Delete Channel?</h3>
                <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to delete the channel "{showConfirmDelete.channelName}"? This action cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setShowConfirmDelete(null)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                    <button onClick={handleDeleteChannel} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
      )}
      {testingChannel && (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800">Send Test Message</h3>
            <p className="text-sm text-gray-500 mt-2">Enter a phone number (with country code) to send a test message from "{testingChannel.channelName}".</p>
            <form onSubmit={(e) => { e.preventDefault(); handleSendTest(e.target.elements.phoneNumber.value); }}>
                <input
                    name="phoneNumber"
                    type="tel"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md mt-4"
                    placeholder="+15551234567"
                />
                <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" onClick={() => setTestingChannel(null)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Send Test</button>
                </div>
            </form>
        </div>
    </div>
)}

      

    </div>
  );
};

export default WhatsAppChannelSettingsPage;