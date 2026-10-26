import type { Character } from "../../../store";
import type { Filters } from "../components/FilterModal";

export const filterCharacters = (
  characters: Character[],
  search: string,
  filters?: Filters
): Character[] => {
  let filtered = characters;

  // Filtro por búsqueda de nombre
  if (search.trim()) {
    filtered = filtered.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filtros avanzados
  if (filters) {
    if (filters.species.length > 0) {
      filtered = filtered.filter((character) =>
        filters.species.includes(character.species)
      );
    }
    if (filters.gender.length > 0) {
      filtered = filtered.filter((character) =>
        filters.gender.includes(character.gender)
      );
    }
    if (filters.status.length > 0) {
      filtered = filtered.filter((character) =>
        filters.status.includes(character.status)
      );
    }
  }

  return filtered;
};