import { useState, useCallback, useMemo } from "react";

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

interface UseSearchReturn {
  searchTerm: string;
  filteredCharacters: Character[];
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

export const useSearch = (characters: Character[]): UseSearchReturn => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const filteredCharacters = useMemo(() => {
    if (!searchTerm.trim()) {
      return characters;
    }

    const searchLower = searchTerm.toLowerCase();
    return characters.filter((character) =>
      character.name.toLowerCase().includes(searchLower) ||
      character.status.toLowerCase().includes(searchLower) ||
      character.species.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, characters]);

  return {
    searchTerm,
    filteredCharacters,
    handleSearchChange,
    clearSearch
  };
};