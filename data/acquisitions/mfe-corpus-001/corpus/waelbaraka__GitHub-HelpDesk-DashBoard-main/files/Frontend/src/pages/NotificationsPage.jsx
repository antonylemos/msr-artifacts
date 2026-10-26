// src/pages/NotificationsPage.jsx
import React from 'react';
import GenericPage from './GenericPage'; // Reusing GenericPage for a simple placeholder

const NotificationsPage = React.memo(({ sectionConfig }) => {
  return (
    <GenericPage
      sectionConfig={sectionConfig || { label: "Notifications" }}
      // For now, NotificationsPage doesn't have internal navigation
    />
  );
});

export default NotificationsPage;