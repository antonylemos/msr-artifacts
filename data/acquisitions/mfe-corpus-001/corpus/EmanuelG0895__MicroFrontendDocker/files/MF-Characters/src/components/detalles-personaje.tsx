"use client";

import type React from "react";

import "./detalles-personaje.css";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface CharacterDetailProps {
  character: {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string; url?: string };
    location: { name: string; url?: string };
    type?: string;
    image?: string;
    episode: string[] | Episode[];
    created: string;
    url?: string;
  };
  onBack?: () => void;
}

const CharacterDetailView: React.FC<CharacterDetailProps> = ({
  character,
  onBack,
}) => {
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "status-alive";
      case "dead":
        return "status-dead";
      default:
        return "status-unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "#22c55e";
      case "dead":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  if (!character) {
    return (
      <div className="detail-view-container">
        <div className="detail-view-error">
          <h2>Character not found</h2>
          <p>The requested character could not be loaded.</p>
          {onBack && (
            <button onClick={onBack} className="back-button">
              {"<"}
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="detail-view-container">
      {/* Header with back button */}
      {onBack && (
        <div className="detail-view-header">
          <button onClick={onBack} className="back-button">
            {"< "}
            Back to Characters
          </button>
        </div>
      )}

      {/* Main character detail card */}
      <div className="character-detail-card">
        {/* Hero section with image and basic info */}
        <div className="character-hero">
          <div className="character-image-section">
            <div className="character-image-container-detail">
              <img
                src={character.image || "/placeholder.svg?height=400&width=400"}
                alt={character.name}
                className="character-image-detail"
                loading="lazy"
              />
              <div className="image-overlay-detail"></div>

              {/* Status indicator */}
              <div className="status-indicator-detail">
                <div
                  className="status-dot-detail"
                  style={{ backgroundColor: getStatusColor(character.status) }}
                ></div>
                <span
                  className={`status-text ${getStatusClass(character.status)}`}
                >
                  {character.status}
                </span>
              </div>
            </div>
          </div>

          <div className="character-info-section">
            <div className="character-title">
              <h1 className="character-name-detail">{character.name}</h1>
              <div className="character-subtitle">
                <span className="character-id">#{character.id}</span>
                <span className="character-species">{character.species}</span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="quick-stats">
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">Gender</span>
                  <span className="stat-value">{character.gender}</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">Origin</span>
                  <span className="stat-value">
                    {character.origin?.name || "Unknown"}
                  </span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">Location</span>
                  <span className="stat-value">
                    {character.location?.name || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed information sections */}
        <div className="character-details-expanded">
          {/* Character Information */}
          <div className="detail-section">
            <h3 className="section-title">Character Information</h3>
            <div className="detail-grid">
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Full Name</span>
                <span className="detail-value-expanded">{character.name}</span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Status</span>
                <span
                  className={`detail-value-expanded status-badge-expanded ${getStatusClass(
                    character.status
                  )}`}
                >
                  {character.status}
                </span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Species</span>
                <span className="detail-value-expanded">
                  {character.species}
                </span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Gender</span>
                <span className="detail-value-expanded">
                  {character.gender}
                </span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Type</span>
                <span className="detail-value-expanded">
                  {character.type || "Unknown"}
                </span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Origin</span>
                <span className="detail-value-expanded">
                  {character.origin?.name || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="detail-section">
            <h3 className="section-title">Location Details</h3>
            <div className="location-card">
              <div className="location-info">
                <h4 className="location-name">
                  {character.location?.name || "Unknown Location"}
                </h4>
                <p className="location-description">
                  Current residence of {character.name}
                </p>
              </div>
            </div>
          </div>

          {/* Episodes Information */}
          <div className="detail-section">
            <h3 className="section-title">Episode Appearances</h3>

            {/* Lista detallada de episodios */}
            {character.episode && character.episode.length > 0 && (
              <div className="episodes-list">
                <h4 className="episodes-list-title">Episodes List:</h4>
                <div className="episodes-grid">
                  {character.episode.map((episode, index) => {
                    // Verificar si el episodio es un objeto completo o solo una URL
                    const isEpisodeObject =
                      typeof episode === "object" &&
                      episode !== null &&
                      "id" in episode;

                    if (isEpisodeObject) {
                      const episodeData = episode as Episode;
                      return (
                        <div key={episodeData.id} className="episode-card">
                          <div className="episode-header">
                            <h5 className="episode-name">{episodeData.name}</h5>
                            <span className="episode-code">
                              {episodeData.episode}
                            </span>
                          </div>
                          <div className="episode-details">
                            <span className="episode-air-date">
                              Air Date: {episodeData.air_date}
                            </span>
                            <span className="episode-id">
                              Episode ID: #{episodeData.id}
                            </span>
                          </div>
                        </div>
                      );
                    } else {
                      // Si es solo una URL, mostrar información básica
                      const episodeUrl = episode as string;
                      const episodeId = episodeUrl.split("/").pop();
                      return (
                        <div key={index} className="episode-card">
                          <div className="episode-header">
                            <span className="episode-id-basic">
                              Episode #{episodeId}
                            </span>
                            <span className="episode-loading">Loading...</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Meta Information */}
          <div className="detail-section">
            <h3 className="section-title">Meta Information</h3>
            <div className="meta-info">
              <div className="meta-item">
                <span className="meta-label">Created</span>
                <span className="meta-value">
                  {character.created
                    ? new Date(character.created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Unknown"}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Character ID</span>
                <span className="meta-value">#{character.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailView;
