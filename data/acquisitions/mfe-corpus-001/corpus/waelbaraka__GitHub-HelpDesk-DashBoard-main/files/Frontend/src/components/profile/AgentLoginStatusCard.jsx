// src/components/profile/AgentLoginStatusCard.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast'; // Ensure react-hot-toast is installed and imported
import WorkingHoursScheduler from './WorkingHoursScheduler'; // This will render the Radix UI slider via its children

// Helper for Radio Button Styling
const RadioOption = ({ id, name, value, label, checked, onChange, disabled = false }) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <label htmlFor={id} className={`ml-3 block text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
      {label}
    </label>
  </div>
);

const AgentLoginStatusCard = ({
    currentLoginStatus,   // From UserProfilePage's formProfileData.agentStatusAfterLogin
    onLoginStatusChange,  // Memoized callback from UserProfilePage: (newStatus) => void
    currentSchedule,      // From UserProfilePage's formProfileData.workingHours (should be an array)
    onScheduleChange,     // Memoized callback from UserProfilePage: (newScheduleArray) => void
    disabled = false      // From UserProfilePage (isSaving || isLoading)
}) => {
  // Determine initial state for showScheduler based on whether a meaningful schedule exists
  // AND if the currentLoginStatus allows for scheduling.
  const initialCanManageSchedule = currentLoginStatus === 'according_to_working_hours';
  const hasInitialActiveSchedule = initialCanManageSchedule && !!currentSchedule && currentSchedule.some(day => day.enabled && day.slots.length > 0);
  const [showScheduler, setShowScheduler] = useState(hasInitialActiveSchedule);

  // Effect to manage scheduler visibility when login status changes externally
  useEffect(() => {
    if (currentLoginStatus !== 'according_to_working_hours') {
      if (showScheduler) {
        setShowScheduler(false); // Hide if status no longer supports scheduling
      }
    } else {
      // If status IS 'according_to_working_hours', but scheduler is hidden,
      // AND a schedule exists, then show it.
      const scheduleExists = !!currentSchedule && currentSchedule.some(day => day.enabled && day.slots.length > 0);
      if (scheduleExists && !showScheduler) {
        setShowScheduler(true);
      }
      // If no schedule exists, keep scheduler hidden until user clicks "Add Schedule"
    }
  }, [currentLoginStatus, currentSchedule, showScheduler]);


  const handleRadioSelectionChange = useCallback((event) => {
    const newStatus = event.target.value;
    if (typeof onLoginStatusChange === 'function') {
      onLoginStatusChange(newStatus);
    } else {
      console.error("AgentLoginStatusCard: onLoginStatusChange prop is not a function!");
    }
  }, [onLoginStatusChange]); // Depends on the stability of onLoginStatusChange from parent

  const handleToggleSchedulerClick = useCallback(() => {
    if (currentLoginStatus !== 'according_to_working_hours') {
      toast.error("Please select 'According to working hours' first to set up a schedule.", { duration: 4000 });
      // Optionally, auto-select and then show scheduler
      // if (typeof onLoginStatusChange === 'function') {
      //   onLoginStatusChange('according_to_working_hours');
      //   setShowScheduler(true); // This will trigger the below logic for default schedule
      // }
      return;
    }

    const newShowSchedulerState = !showScheduler;
    setShowScheduler(newShowSchedulerState);

    if (newShowSchedulerState) {
      // If opening scheduler and currentSchedule is effectively empty, provide a default.
      const scheduleIsEmpty = !currentSchedule || currentSchedule.length === 0 || currentSchedule.every(day => !day.enabled || day.slots.length === 0);
      if (scheduleIsEmpty && typeof onScheduleChange === 'function') {
        const defaultSchedule = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(dayName => ({
            day: dayName,
            enabled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayName),
            slots: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayName) ? [{ start: '09:00', end: '17:00' }] : [],
        }));
        onScheduleChange(defaultSchedule);
      }
    }
  }, [currentLoginStatus, showScheduler, currentSchedule, onScheduleChange, onLoginStatusChange]);
  
  const handleSchedulerCancel = useCallback(() => {
    setShowScheduler(false);
    // Reverting schedule data to its initial state (before opening scheduler)
    // should be handled by UserProfilePage's main "Cancel" button if the whole form is canceled.
    // If user cancels scheduler, the changes they made in `formProfileData.workingHours` persist
    // until the main form is saved or canceled.
  }, []); // No dependencies needed if it only sets local state

  const canManageSchedule = currentLoginStatus === 'according_to_working_hours';
  const buttonText = (currentSchedule && currentSchedule.some(d => d.enabled && d.slots.length > 0)) ? "Edit Schedule" : "Add Schedule";
  const isSetScheduleButtonDisabled = disabled || !canManageSchedule;


  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Agent status after logging in
      </h3>
      <div className="space-y-4">
        <RadioOption id="agent_status_accept_chats_radio" name="agentLoginStatusOptionsRadioGroup" value="accept_chats" label="Accept chats" checked={currentLoginStatus === 'accept_chats'} onChange={handleRadioSelectionChange} disabled={disabled}/>
        <RadioOption id="agent_status_dont_accept_chats_radio" name="agentLoginStatusOptionsRadioGroup" value="dont_accept_chats" label="Don't accept chats" checked={currentLoginStatus === 'dont_accept_chats'} onChange={handleRadioSelectionChange} disabled={disabled}/>
        <RadioOption id="agent_status_according_to_working_hours_radio" name="agentLoginStatusOptionsRadioGroup" value="according_to_working_hours" label="According to working hours" checked={currentLoginStatus === 'according_to_working_hours'} onChange={handleRadioSelectionChange} disabled={disabled}/>
      </div>

      <div className="mt-8">
        {showScheduler && canManageSchedule ? (
          <WorkingHoursScheduler
            initialSchedule={currentSchedule || []}
            onScheduleChange={onScheduleChange}
            onCancel={handleSchedulerCancel}
            disabled={disabled}
          />
        ) : (
          <div className={`p-6 bg-blue-50 rounded-lg border border-blue-200 flex items-start space-x-4 ${!canManageSchedule && !disabled ? 'opacity-60 cursor-default' : ''}`}>
            <div className="flex-shrink-0">
              <ClockIcon className={`h-10 w-10 ${!canManageSchedule && !disabled ? 'text-gray-400' : 'text-blue-500'}`} />
            </div>
            <div>
              <h4 className={`text-md font-semibold ${!canManageSchedule && !disabled ? 'text-gray-500' : 'text-gray-800'}`}>
                Working Hours
              </h4>
              <p className={`text-sm mt-1 ${!canManageSchedule && !disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                Set custom hours for when the agent will be accepting chats each day.
                {!canManageSchedule &&
                 (<span className="block text-xs text-blue-700">(Select 'According to working hours' above to define a schedule.)</span>)
                }
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleToggleSchedulerClick}
                  disabled={isSetScheduleButtonDisabled}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {buttonText}
                </button>
                <button
                  type="button"
                  className="ml-3 px-4 py-2 text-blue-600 text-sm font-medium hover:underline disabled:opacity-50"
                  onClick={() => toast.info('Working hours allow agents to automatically set their chat availability based on a predefined schedule.')}
                  disabled={disabled} // "Learn more" is only disabled by the parent's general disabled state
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentLoginStatusCard;