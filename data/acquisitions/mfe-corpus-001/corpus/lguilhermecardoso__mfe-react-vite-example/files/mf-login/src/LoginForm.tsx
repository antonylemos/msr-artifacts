import React, { useState } from "react";
import type { AuthPayload, User } from "./types";

interface Props {
  onLoginSuccess: (data: AuthPayload) => void;
  onGoToSignup: () => void;
}

const LoginForm: React.FC<Props> = ({ onLoginSuccess, onGoToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setError("");
      // Simule um JWT token
      const token = `JWT_${btoa(`${username}:${Date.now()}`)}`;
      localStorage.setItem("token", token);
      onLoginSuccess({ username, token });
    } else {
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Usuário</label>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Digite seu usuário"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Entrar
      </button>
      <button
        type="button"
        className="w-full text-blue-600 hover:underline py-2 rounded-lg"
        onClick={onGoToSignup}
      >
        Criar conta
      </button>
    </form>
  );
};

export default LoginForm;