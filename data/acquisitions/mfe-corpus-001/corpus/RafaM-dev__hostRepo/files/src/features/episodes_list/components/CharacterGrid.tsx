import { Card } from "@darkar9512/my-react-library";
import type { Character } from "../../../store";

interface CharacterGridProps {
  characters: Character[];
  onStarClick: (character: Character) => void;
  isFavorite: (id: number) => boolean;
  onCharacterClick: (character: Character) => void;
}

export const CharacterGrid = ({
  characters,
  onStarClick,
  isFavorite,
  onCharacterClick
}: CharacterGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
      {characters.map((character) => (
        <Card
          key={character.id}
          layout="responsive"
          title={character.name}
          description={character.species}
          imageUrl={character.image}
          status={character.status}
          onClick={() => onCharacterClick(character)}
          metadata={[
            {
              label: "Last known location",
              value: character.location.name,
            },
            { label: "First seen in", value: character.origin.name },
          ]}
          isFavorite={isFavorite(character.id)}
          onStarClick={() => onStarClick(character)}
        />
      ))}
    </div>
  );
};