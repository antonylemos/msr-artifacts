import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  ...props
}) => {
  return (
    <button onClick={onClick} className={`button button--${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
