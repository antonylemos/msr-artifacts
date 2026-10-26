import ReactDOM from "react-dom/client";
import React, { Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";

const CharacterInfo = React.lazy(
  () => import("MF_CharacterDetail/View")
);

const Details = React.lazy(
  () => import("./app/details")
);

const AppContent = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(1);
  const navigate = useNavigate();

  const handleCharacterClick = (id: number) => {
    setSelectedCharacterId(id);
    navigate(`/details/${id}`);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <Suspense fallback={<div>Cargando...</div>}>
            <CharacterInfo onCharacterClick={handleCharacterClick} />
          </Suspense>
        } 
      />
      <Route 
        path="/details/:id" 
        element={
          <Suspense fallback={<div>Cargando...</div>}>
            <Details characterId={selectedCharacterId} />
          </Suspense>
        } 
      />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid">
        <AppContent />
      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
