import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  const cardStyles: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  };

  const titleStyles: React.CSSProperties = {
    margin: '0 0 10px 0',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={cardStyles}>
      <h3 style={titleStyles}>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;
