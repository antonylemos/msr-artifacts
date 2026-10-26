import { useState, useEffect } from "react";
import DetallesPersonaje from "./detalles-personaje";
import {
  fetchCharacterById,
  fetchCharacterEpisodes,
  type Character,
  type Episode,
} from "../api/detail";
import "./vista.css";

interface VistaProps {
  characterId: number;
}

export default function Vista({ characterId }: VistaProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar un personaje por ID
  const loadCharacter = async (characterId: number) => {
    try {
      setLoading(true);
      setError(null);

      // Obtener el personaje
      const characterData = await fetchCharacterById(characterId);
      setCharacter(characterData);

      // Obtener los episodios si hay URLs de episodios
      if (characterData.episode && characterData.episode.length > 0) {
        const episodeUrls = characterData.episode as string[];
        const episodesData = await fetchCharacterEpisodes(episodeUrls);
        setEpisodes(episodesData);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar el personaje"
      );
      console.error("Error loading character:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar el personaje cuando cambie el characterId
  useEffect(() => {
    loadCharacter(characterId);
  }, [characterId]);

  // Función para cambiar de personaje
  const handleCharacterChange = (characterId: number) => {
    loadCharacter(characterId);
  };

  // Función para volver atrás (puedes personalizarla según tus necesidades)
  const handleBack = () => {
    console.log("Volviendo atrás...");
    // Aquí puedes implementar la navegación hacia atrás
  };

  if (loading) {
    return <div className="vista-loading">Cargando personaje...</div>;
  }

  if (error) {
    return (
      <div className="vista-error">
        <h2 className="vista-error-title">Error</h2>
        <p className="vista-error-message">{error}</p>
        <button
          onClick={() => loadCharacter(characterId)}
          className="vista-retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!character) {
    return <div className="vista-not-found">No se encontró el personaje</div>;
  }

  // Crear un objeto character con los episodios completos si están disponibles
  const characterWithEpisodes = {
    ...character,
    episode: episodes.length > 0 ? episodes : character.episode,
  };

  return (
    <DetallesPersonaje character={characterWithEpisodes} onBack={handleBack} />
  );
}
