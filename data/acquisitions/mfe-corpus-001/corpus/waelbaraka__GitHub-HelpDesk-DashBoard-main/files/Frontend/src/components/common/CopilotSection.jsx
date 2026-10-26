// src/components/chat/detailsContent/CopilotSection.jsx
import React from 'react';

const CopilotSection = React.memo(({ contact }) => {
  // In a real app, this would likely fetch or display AI suggestions based on the contact/chat
  return (
    <div className="text-sm text-gray-700">
      <p>Copilot Suggestions</p>
      <ul className="list-disc list-inside mt-1 space-y-1">
        <li>Suggest relevant FAQ article.</li>
        <li>Offer a discount for next purchase.</li>
      </ul>
    </div>
  );
});

export default CopilotSection;