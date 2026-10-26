import React, { useState } from "react";
import type { User } from "./types";

interface Props {
  onSignupSuccess: () => void; // retorna apenas feedback positivo
  onBackToLogin: () => void;
}

const SignupForm: React.FC<Props> = ({ onSignupSuccess, onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Preencha todos os campos.");
      setSuccess(false);
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    if (users.find(u => u.username === username)) {
      setError("Usuário já cadastrado.");
      setSuccess(false);
      return;
    }
    const newUser: User = { username, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setError("");
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSignupSuccess();
    }, 1200); // mostra feedback de sucesso e volta pra login
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
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
      {success && <p className="text-green-600 text-sm">Conta criada com sucesso!</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Criar conta
      </button>
      <button
        type="button"
        className="w-full text-blue-600 hover:underline py-2 rounded-lg"
        onClick={onBackToLogin}
      >
        Já tenho conta
      </button>
    </form>
  );
};

export default SignupForm;