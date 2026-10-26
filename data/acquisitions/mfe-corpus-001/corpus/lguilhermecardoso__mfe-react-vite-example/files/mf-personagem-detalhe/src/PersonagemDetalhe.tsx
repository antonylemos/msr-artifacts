import React, { useEffect, useState } from "react";

type PersonagemDetalheProps = {
  id: string | number;
  onBack?: () => void;
  user?: { username: string };
  token?: string;
};

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
};

const API_URL = "https://rickandmortyapi.com/api/character";

const statusBadge = (status: string) => {
  if (status === "Alive") return "bg-green-200 text-green-800";
  if (status === "Dead") return "bg-red-200 text-red-800";
  return "bg-gray-200 text-gray-700";
};

const PersonagemDetalhe: React.FC<PersonagemDetalheProps> = ({ id, onBack, user }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    console.log("Fetching character with ID:", id);
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="w-screen h-screen min-h-dvh min-w-dvw bg-gradient-to-tr from-indigo-100 via-sky-50 to-teal-100 flex flex-col items-center justify-center relative overflow-auto">
      {/* Botão Voltar fixo no topo */}
      <div className="fixed top-4 left-4 z-30">
        <button
          onClick={onBack}
          className="
            flex items-center gap-2 bg-blue-600 text-white font-bold px-4 py-2 rounded-xl shadow-lg
            hover:bg-blue-700 active:scale-95 transition
            backdrop-blur bg-opacity-80
          "
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Voltar
        </button>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-10 sm:py-16">
        {loading && (
          <div className="flex flex-col items-center justify-center h-80">
            <span className="h-12 w-12 rounded-full border-4 border-blue-300 border-t-blue-600 animate-spin mb-4" />
            <span className="text-blue-700 text-xl font-semibold">Carregando personagem...</span>
          </div>
        )}

        {notFound && (
          <div className="text-center py-16 text-red-600 text-lg font-bold">
            Personagem não encontrado!
          </div>
        )}

        {character && (
          <div
            className="
              w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-6 sm:p-10
              flex flex-col md:flex-row items-center gap-8
              border border-blue-100
              backdrop-blur
            "
          >
            <div className="flex-shrink-0">
              <img
                src={character.image}
                alt={character.name}
                className="
                  w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover
                  border-8 border-white shadow-lg
                  mx-auto
                "
              />
            </div>
            <div className="flex-1 w-full flex flex-col gap-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 drop-shadow tracking-tight text-center md:text-left">
                {character.name}
              </h2>
              <span className={`inline-block px-4 py-1 rounded-full text-base font-bold ${statusBadge(character.status)} w-fit mb-2`}>
                {character.status}
              </span>
              <div className="grid grid-cols-2 gap-y-1 text-gray-700 text-base mb-2">
                <div className="font-semibold">Espécie:</div>
                <div>{character.species}</div>
                <div className="font-semibold">Gênero:</div>
                <div>{character.gender}</div>
                <div className="font-semibold">Origem:</div>
                <div>{character.origin?.name}</div>
                <div className="font-semibold">Localização:</div>
                <div>{character.location?.name}</div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-semibold text-gray-500">Episódios:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {character.episode.slice(0, 5).map((ep) => (
                    <span
                      key={ep}
                      className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-bold"
                    >
                      Ep. {ep.split("/").pop()}
                    </span>
                  ))}
                  {character.episode.length > 5 && (
                    <span className="bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                      +{character.episode.length - 5} outros
                    </span>
                  )}
                </div>
              </div>
              {user && (
                <div className="mt-6 text-xs text-right text-gray-400">
                  Visualizando como <span className="font-bold text-blue-500">{user.username}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonagemDetalhe;