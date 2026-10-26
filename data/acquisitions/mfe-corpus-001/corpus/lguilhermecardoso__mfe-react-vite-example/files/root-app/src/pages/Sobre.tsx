import React from "react";
import { useNavigate } from "react-router-dom";

const Sobre: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex flex-col items-center px-4 pt-12">
      <nav className="w-full max-w-2xl mb-4 flex items-center gap-1 text-sm">
        <button
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold px-2 py-1 rounded transition focus:outline-none"
        >
          {' < '}
          Dashboard
        </button>
        <span className="mx-1 select-none text-gray-400">{'>'}</span>
        <span className="text-gray-700 font-bold">Sobre</span>
      </nav>

      <div className="max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col gap-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight text-center">
          Sobre o Projeto
        </h1>
        <p className="text-base text-gray-700 mb-2">
          Este aplicativo é um painel interativo de personagens de <span className="font-bold text-blue-700">Rick and Morty</span>, desenvolvido como demonstração de arquitetura <span className="font-bold text-teal-700">Micro Frontends</span> com React e TailwindCSS.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Micro Frontends:</span> Cada parte do app (login, dashboard, detalhes) é um microfrontend independente, promovendo escalabilidade e autonomia de desenvolvimento.
          </li>
          <li>
            <span className="font-semibold">Tecnologias:</span> React 18, Vite, TailwindCSS 4, Module Federation, integração com a API pública Rick and Morty.
          </li>
          <li>
            <span className="font-semibold">Funcionalidades:</span> Login, listagem dinâmica de personagens, detalhes completos, navegação protegida por autenticação e visual moderno.
          </li>
        </ul>
        <div className="mt-4 text-center text-gray-500 text-sm">
          Projeto de estudo e demonstração. Dados dos personagens fornecidos pela <a href="https://rickandmortyapi.com/" className="text-blue-700 underline hover:text-blue-900" target="_blank" rel="noopener noreferrer">Rick and Morty API</a>.
        </div>
        <div className="text-center mt-6">
          <span className="text-base text-gray-700">
            Desenvolvido por <span className="font-bold text-blue-600">Guilherme Cardoso</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sobre;