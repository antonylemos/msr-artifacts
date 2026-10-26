import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./Components/Header/header";
import Paragraph from "./Components/Paragraph/paragraph";
import Application1 from "./Components/Application1/Application1";
import Application2 from "./Components/Application2/Application2";

function App(){
    return (
        <>
        <Header/>
        <Paragraph/>
        <Application1/>
        <Application2/>
        </>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);
