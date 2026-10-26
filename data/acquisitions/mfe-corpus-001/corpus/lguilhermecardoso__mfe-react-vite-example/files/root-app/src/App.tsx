import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import Sobre from "./pages/Sobre";

const Navbar = React.lazy(() => import("mf_navbar/Navbar"));
const LoginMFE = React.lazy(() => import("mf_login/Login"));
const DashboardMFE = React.lazy(() => import("mf_dashboard/Dashboard"));
const PersonagemDetalheMFE = React.lazy(() => import("mf_personagem_detalhe/PersonagemDetalhe"));

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// COMPONENTE WRAPPER PARA PEGAR O PARAMS
type PersonagemDetalheWrapperProps = {
  user: any;
};

function PersonagemDetalheWrapper({ user }: PersonagemDetalheWrapperProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <PersonagemDetalheMFE
      id={id}
      user={user}
      onBack={() => navigate(-1)}
    />
  );
}

export default function App() {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();

  function handleLogin({ username, token }: { username: string; token: string }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ username }));
    setUser({ username });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  useEffect(() => {
    function handleStorage() {
      setUser(getUser());
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <>
      <React.Suspense fallback={null}>
        {user && <Navbar user={user} onLogout={handleLogout} />}
      </React.Suspense>
      <div className="pt-16">
        <React.Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            <Route path="/login" element={
              user
                ? <Navigate to="/dashboard" replace />
                : <LoginMFE onAuthSuccess={handleLogin} />
            } />
            <Route path="/dashboard" element={
              user
                ? <div
                  style={{ marginTop: "60px" }}>
                  <DashboardMFE
                    user={user}
                    token={localStorage.getItem("token")}
                    onCharacterClick={(id: number) => navigate(`/personagem/${id}`)}
                  />
                </div>
                : <Navigate to="/login" replace />
            } />
            <Route path="/personagem/:id" element={
              <div
                style={{ marginTop: "60px" }}>
                <PersonagemDetalheWrapper user={user} />
              </div>
            } />
            <Route path="/sobre" element={
              <div
                style={{ marginTop: "65px" }}>
                <Sobre />
              </div>
            }
            />
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
            <Route path="*" element={<div style={{ marginTop: "60px" }}>Página não encontrada</div>} />
          </Routes>
        </React.Suspense>
      </div>
    </>
  );
}