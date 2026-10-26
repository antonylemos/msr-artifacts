import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import type { AuthPayload } from "./types";

interface Props {
  onAuthSuccess?: (payload: AuthPayload) => void;
}

const App: React.FC<Props> = ({ onAuthSuccess }) => {
  const [screen, setScreen] = useState<"login" | "signup">("login");

  const handleAuth = (payload: AuthPayload) => {
    if (onAuthSuccess) onAuthSuccess(payload);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-400">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          {screen === "login" ? "Login" : "Criar Conta"}
        </h2>
        <div className="w-full">
          {screen === "login" ? (
            <LoginForm
              onLoginSuccess={handleAuth}
              onGoToSignup={() => setScreen("signup")}
            />
          ) : (
            <SignupForm
              onSignupSuccess={() => setScreen("login")}
              onBackToLogin={() => setScreen("login")}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default App;