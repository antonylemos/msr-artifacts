// src/components/teams/CreateTeamModal.jsx
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// --- CORRECT IMPORT ---
// 'api' will now be your 'realApiInterface' object from api.js
import api from '../../api/api.js'; // Assuming this path is correct

const CreateTeamModal = ({ isOpen, onClose, onTeamCreated }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTeamName('');
    setTeamDescription('');
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      toast.error("Team name is required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const newTeamData = {
        name: teamName.trim(),
        description: teamDescription.trim(),
      };

      console.log("FRONTEND: Sending data to create team via API interface:", newTeamData);
      
      // --- CALL THE DEDICATED createTeam METHOD from your API interface ---
      const createdTeam = await api.createTeam(newTeamData); 
      // 'api' is now 'realApiInterface', which has a 'createTeam' method.
      // That method internally uses apiClient.post('/teams', newTeamData).
      // --- END CORRECTED API CALL ---
      
      console.log("FRONTEND: Team created successfully, API response:", createdTeam);
      toast.success(`Team "${createdTeam.name}" created successfully!`);
      
      if (typeof onTeamCreated === 'function') {
        onTeamCreated(createdTeam);
      }
      handleClose();
    } catch (error) {
      console.error("CreateTeamModal - Failed to create team:", error.response?.data?.message || error.message, error);
      toast.error(error.response?.data?.message || "Could not create team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-6 pt-5 pb-6">
                    <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                        Create a new group
                      </Dialog.Title>
                      <button type="button" className="p-1 text-gray-400 hover:text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleClose} disabled={isSubmitting} aria-label="Close modal"><span className="sr-only">Close</span><XMarkIcon className="h-6 w-6" aria-hidden="true" /></button>
                    </div>
                    <div className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="teamModalName" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                        <input type="text" name="teamModalName" id="teamModalName" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Support Team Alpha" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5" disabled={isSubmitting} required />
                      </div>
                      <div>
                        <label htmlFor="teamModalDescription" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-gray-400">(Optional)</span></label>
                        <textarea name="teamModalDescription" id="teamModalDescription" rows={3} value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} placeholder="Enter a brief description for this group" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5" disabled={isSubmitting}/>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex flex-shrink-0 justify-end space-x-3">
                    <button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50" onClick={handleClose} disabled={isSubmitting}>Cancel</button>
                    <button type="submit" disabled={isSubmitting || !teamName.trim()} className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? 'Creating...' : 'Create Group'}</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateTeamModal;