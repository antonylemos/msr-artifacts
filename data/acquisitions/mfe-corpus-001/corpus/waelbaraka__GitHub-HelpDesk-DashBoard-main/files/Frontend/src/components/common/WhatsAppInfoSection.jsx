// src/components/chat/detailsContent/WhatsAppInfoSection.jsx
import React from 'react';

const WhatsAppInfoSection = React.memo(({ contact }) => {
  return (
    <div className="text-sm text-gray-700">
      <p><span className="font-medium">WhatsApp:</span> {contact?.whatsapp || 'N/A'}</p>
      {/* Add more WhatsApp specific info */}
    </div>
  );
});

export default WhatsAppInfoSection;