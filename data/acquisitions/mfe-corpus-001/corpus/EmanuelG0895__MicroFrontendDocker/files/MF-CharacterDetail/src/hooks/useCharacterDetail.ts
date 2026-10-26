import { useState, useCallback } from "react";
import { fetchAllCharactersPaginated } from "../services/api";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  type?: string;
  image?: string;
  episode: any[];
  created: string;
}

interface UseCharacterDetailReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  loadCharacters: () => Promise<void>;
  loadMore: () => void;
  hasMore: boolean;
  refetch: () => Promise<void>;
  clearCharacters: () => void;
}

const CHARACTERS_PER_PAGE = 30;

export const useCharacterDetail = (): UseCharacterDetailReturn => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchAllCharactersPaginated();
      setAllCharacters(data.results || []);
      setCharacters(data.results.slice(0, CHARACTERS_PER_PAGE));
      setCurrentPage(1);
    } catch (err) {
      setError("Error loading characters");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const nextCharacters = allCharacters.slice(0, nextPage * CHARACTERS_PER_PAGE);
    setCharacters(nextCharacters);
    setCurrentPage(nextPage);
  }, [allCharacters, currentPage]);

  const refetch = useCallback(() => loadCharacters(), [loadCharacters]);

  const clearCharacters = useCallback(() => {
    setAllCharacters([]);
    setCharacters([]);
    setCurrentPage(1);
    setError(null);
  }, []);

  const hasMore = characters.length < allCharacters.length;

  return {
    characters,
    loading,
    error,
    loadCharacters,
    loadMore,
    hasMore,
    refetch,
    clearCharacters
  };
};
