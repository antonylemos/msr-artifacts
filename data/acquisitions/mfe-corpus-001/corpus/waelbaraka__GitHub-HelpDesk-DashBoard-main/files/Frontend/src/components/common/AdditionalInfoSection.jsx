// src/components/chat/detailsContent/AdditionalInfoSection.jsx
import React from 'react';

const AdditionalInfoSection = React.memo(({ contact }) => {
  return (
    <div className="text-sm text-gray-700 space-y-1">
      <p><span className="font-medium">Chat Duration:</span> {contact?.additionalInfo?.duration || 'N/A'}</p>
      <p><span className="font-medium">Returning Visitor:</span> {contact?.additionalInfo?.returningVisitor || 'N/A'}</p>
      <p><span className="font-medium">Last Seen:</span> {contact?.additionalInfo?.lastSeen || 'N/A'}</p>
      <p><span className="font-medium">Group:</span> {contact?.additionalInfo?.group || 'N/A'}</p>
      {/* Add more additional info fields */}
    </div>
  );
});

export default AdditionalInfoSection;