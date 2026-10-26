import { useState, useEffect, useCallback } from "react";
import { fetchAllCharacters } from "../services/api";

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

interface UseCharactersReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  loadCharacters: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCharacters = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllCharacters();
      setCharacters(data.results || []);
    } catch (err) {
      setError("Error loading characters");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await loadCharacters(1);
  }, [loadCharacters]);

  useEffect(() => {
    loadCharacters(1);
  }, [loadCharacters]);

  return {
    characters,
    loading,
    error,
    loadCharacters,
    refetch
  };
}; 