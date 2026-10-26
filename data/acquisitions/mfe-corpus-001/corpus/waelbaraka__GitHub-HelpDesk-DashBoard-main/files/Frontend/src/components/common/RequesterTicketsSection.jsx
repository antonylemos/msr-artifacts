// src/components/chat/detailsContent/RequesterTicketsSection.jsx
import React from 'react';

const RequesterTicketsSection = React.memo(({ contact }) => {
  const tickets = contact?.requesterTickets?.recent || [];
  return (
    <div className="text-sm text-gray-700">
      {tickets.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {tickets.map((ticket, index) => (
            <li key={ticket.id || index}>{ticket.subject} - <span className="text-xs text-gray-500">{ticket.status}</span></li>
          ))}
        </ul>
      ) : (
        <p>No recent tickets for this requester.</p>
      )}
      <a href={contact?.requesterTickets?.archivedSearchLink || '#'} className="text-blue-600 hover:underline text-xs mt-2 block">Search archived tickets</a>
    </div>
  );
});

export default RequesterTicketsSection;