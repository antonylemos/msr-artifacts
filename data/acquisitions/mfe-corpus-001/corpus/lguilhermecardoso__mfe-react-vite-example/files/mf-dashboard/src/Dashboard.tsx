import React, { useEffect, useState, useRef, useCallback } from "react";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

type DashboardProps = {
  user: { username: string };
  token?: string;
  onCharacterClick?: (id: number) => void;
};

const API_URL = "https://rickandmortyapi.com/api/character";

const statusColor = (status: string) => {
  if (status === "Alive") return "text-green-600";
  if (status === "Dead") return "text-red-500";
  return "text-gray-500";
};

const Dashboard: React.FC<DashboardProps> = ({ user, onCharacterClick }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Infinite scroll observer
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCharacterRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setCharacters(prev =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(Boolean(data.info?.next));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pb-10">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <header className="pt-8 pb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 drop-shadow-lg tracking-tight">
            Rick and Morty Dashboard
          </h1>
          <p className="text-lg md:text-xl text-teal-800 font-medium mb-1">
            Welcome, <span className="font-bold text-blue-600">{user.username}</span>!
          </p>
          <p className="text-base text-gray-600 hidden sm:block">
            Browse all Rick and Morty characters. Infinite scroll enabled. Click a card to see details soon!
          </p>
        </header>

        <main>
          {/* Grid Responsive */}
          <div
            className="
              grid gap-4
              sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              sm:gap-6
            "
          >
            {characters.map((char, idx) => {
              const Card = (
                <div
                  className="
                    group bg-white/70 backdrop-blur shadow-xl rounded-xl border border-blue-100 p-4 flex flex-col items-center
                    transition-all duration-200 ease-in-out
                    hover:scale-105 hover:shadow-2xl hover:z-10
                    cursor-pointer
                  "
                  key={char.id}
                  onClick={() => onCharacterClick && onCharacterClick(char.id)}
                >
                  <div className="relative">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="
                        w-24 h-24 md:w-28 md:h-28 
                        object-cover rounded-full border-4 border-white shadow-md
                        group-hover:ring-4 group-hover:ring-blue-200 transition-all
                      "
                    />
                    <span
                      className={`
                        absolute bottom-1 right-1 px-2 py-0.5 rounded-full text-xs font-bold bg-white/80
                        ${statusColor(char.status)} shadow
                      `}
                    >
                      {char.status}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-semibold text-lg text-gray-700 group-hover:text-blue-700 transition">
                      {char.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium capitalize mt-1">
                      {char.species}
                    </div>
                  </div>
                </div>
              );

              if (idx === characters.length - 1) {
                return (
                  <div ref={lastCharacterRef} key={char.id}>
                    {Card}
                  </div>
                );
              }
              return Card;
            })}
          </div>
          {loading && (
            <div className="text-center my-6">
              <span className="inline-block animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 h-8 w-8 align-middle mr-2" />
              <span className="text-blue-800 font-semibold">Loading...</span>
            </div>
          )}
          {!hasMore && !loading && (
            <div className="text-center my-8 text-gray-500 text-lg">
              All characters loaded! 🚀
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;