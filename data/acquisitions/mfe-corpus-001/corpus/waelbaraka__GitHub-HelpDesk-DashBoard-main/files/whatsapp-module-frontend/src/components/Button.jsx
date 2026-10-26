// whatsapp-module-frontend/src/components/Button.jsx

import React from 'react';

// --- NO MORE IMPORTS FROM 'platform_host' ---
// import { useAuthStore } from 'platform_host/authStore';
// import platformApi from 'platform_host/apiClient';

// The component now accepts props from the host
export const Button = ({ apiClient, useAuthStoreHook, user }) => {

  // --- VERIFICATION LOGS ---
  // These will now show the props received from the host.
  console.log("REMOTE (Button): Received 'apiClient' prop ->", apiClient);
  console.log("REMOTE (Button): Received 'useAuthStoreHook' prop ->", useAuthStoreHook);
  console.log("REMOTE (Button): Received 'user' prop ->", user);

  const handleButtonClick = () => {
    // Check if the props were received correctly
    if (!apiClient || !useAuthStoreHook) {
      alert("Error: Shared modules were not passed correctly as props from the host.");
      return;
    }

    const authState = useAuthStoreHook.getState();
    console.log("Button clicked! Current auth state from host's store:", authState);
    
    if (apiClient && typeof apiClient.getAuthProfile === 'function') {
      console.log("The shared 'apiClient' object has a 'getAuthProfile' method. It's working!");
      alert("Success! The remote component is using modules passed as props from the host. Check the console.");
    }
  };

  return (
    <div style={{ border: '2px dashed green', padding: '20px', margin: '10px' }}>
      <h3 style={{ marginTop: 0 }}>This is the Remote Button Component</h3>
      <p>This component now receives shared modules via props.</p>
      <button
        onClick={handleButtonClick}
        style={{
            backgroundColor: '#228B22',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}
      >
        Test Props from Host
      </button>
    </div>
  );
};

export default Button;