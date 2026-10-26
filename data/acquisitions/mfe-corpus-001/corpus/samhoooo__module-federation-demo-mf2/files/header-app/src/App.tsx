import React from 'react';
import './App.css';

export enum HeaderVariant {
  Light = 'light',
  Dark = 'dark',
}

export interface HeaderProps {
  title: string;
  variant?: HeaderVariant;
}

function App({ title, variant = HeaderVariant.Dark }: HeaderProps) {
  return (
    <div className={`headerApp headerApp--${variant}`}>
      <div>{title}</div>
    </div>
  );
}

export default App;
