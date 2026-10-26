// src/components/chat/detailsContent/ContactInfoSection.jsx
import React from 'react';

const ContactInfoSection = React.memo(({ contact }) => {
  return (
    <div className="text-sm text-gray-700">
      <p><span className="font-medium">Name:</span> {contact?.name || 'N/A'}</p>
      <p><span className="font-medium">Email:</span> {contact?.email || 'N/A'}</p>
      {/* Add more contact fields as needed */}
    </div>
  );
});

export default ContactInfoSection;