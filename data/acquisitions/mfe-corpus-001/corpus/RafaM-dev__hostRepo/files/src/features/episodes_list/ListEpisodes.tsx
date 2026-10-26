import { useState } from "react";
import { useCharacters } from "./hooks/useCharacters";
import { useFavoritesStore } from "../../store/favoritesStore";
import type { Character } from "../../store";
import { filterCharacters } from "./utils/filterCharacters";
import { EmptyState } from "./components/EmptyState";
import { CustomTabs } from "./components/CustomTabs";
import { TabPanel } from "./components/TabPanel";
import { CharacterCount } from "./components/CharacterCount";
import { CharacterGrid } from "./components/CharacterGrid";
import { FilterModal, type Filters } from "./components/FilterModal";
import { AppliedFilters } from "./components/AppliedFilters";
import { ClearFiltersButton } from "./components/ClearFiltersButton";
import { useOutletContext } from "react-router";
import DetailEpisode from "mf-remoteDetails/DetailEpisode";

export const ListEpisodes = () => {
  const { search } = useOutletContext<{ search: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [filters, setFilters] = useState<Filters>({
    species: [],
    gender: [],
    status: [],
  });

  const { characters, loading } = useCharacters();
  const { favorites, addFavorite, removeFavorite, isFavorite } =
    useFavoritesStore();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStarClick = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (category: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      species: [],
      gender: [],
      status: [],
    });
  };

  const hasFilters =
    filters.species.length > 0 ||
    filters.gender.length > 0 ||
    filters.status.length > 0;

  const filteredCharacters = filterCharacters(characters, search, filters);
  const filteredFavorites = filterCharacters(favorites, search, filters);

  if (loading) {
    return <EmptyState message="Loading characters..." />;
  }

  return (
    <div className="w-full flex flex-col items-center max-w-[1040px] mx-auto px-4 mt-6">
      <CustomTabs
        value={tabValue}
        onChange={handleTabChange}
        onFilterClick={() => setFilterModalOpen(true)}
      />

      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />

      <DetailEpisode
        character={selectedCharacter}
        open={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />

      <AppliedFilters filters={filters} onRemoveFilter={handleRemoveFilter} />

      <TabPanel value={tabValue} index={0}>
        {filteredCharacters.length > 0 && (
          <CharacterCount count={filteredCharacters.length} />
        )}
        {filteredCharacters.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-h1 text-neutral-800">¡Oh no!</h1>
            <EmptyState message="¡Parece perdido en tu viaje!" />
            {hasFilters && <ClearFiltersButton onClick={handleClearFilters} />}
          </div>
        ) : (
          <CharacterGrid
            characters={filteredCharacters}
            onStarClick={handleStarClick}
            onCharacterClick={handleCharacterClick}
            isFavorite={isFavorite}
          />
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {filteredFavorites.length > 0 && (
          <CharacterCount count={filteredFavorites.length} />
        )}
        {filteredFavorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <EmptyState message="No tienes personajes favoritos aún" />
            {hasFilters && <ClearFiltersButton onClick={handleClearFilters} />}
          </div>
        ) : (
          <CharacterGrid
            characters={filteredFavorites}
            onStarClick={handleStarClick}
            onCharacterClick={handleCharacterClick}
            isFavorite={isFavorite}
          />
        )}
      </TabPanel>
    </div>
  );
};
