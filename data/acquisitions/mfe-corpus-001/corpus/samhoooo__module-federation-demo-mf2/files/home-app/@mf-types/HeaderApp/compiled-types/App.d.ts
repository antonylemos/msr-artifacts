import React from 'react';
import './App.css';
export declare enum HeaderVariant {
    Light = "light",
    Dark = "dark"
}
export interface HeaderProps {
    title: string;
    variant?: HeaderVariant;
}
declare function App({ title, variant }: HeaderProps): React.JSX.Element;
export default App;
