"use client"

import type React from "react"

import "./detalles-personaje.css"

interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
}

interface CharacterDetailProps {
  character: {
    id: number
    name: string
    status: string
    species: string
    gender: string
    origin: { name: string; url?: string }
    location: { name: string; url?: string }
    type?: string
    image?: string
    episode: string[] | Episode[]
    created: string
    url?: string
  }
  onBack?: () => void
}

const CharacterDetailView: React.FC<CharacterDetailProps> = ({ character, onBack }) => {
  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "status-alive"
      case "dead":
        return "status-dead"
      default:
        return "status-unknown"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "alive":
        return "#22c55e"
      case "dead":
        return "#ef4444"
      default:
        return "#64748b"
    }
  }

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
    )
  }

  return (
    <div className="detail-view-container">
      {/* Header with back button */}
      {onBack && (
        <div className="detail-view-header">
          <button onClick={onBack} className="back-button">
          {"<"}
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
                <div className="status-dot-detail" style={{ backgroundColor: getStatusColor(character.status) }}></div>
                <span className={`status-text ${getStatusClass(character.status)}`}>{character.status}</span>
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
                  <span className="stat-value">{character.origin?.name || "Unknown"}</span>
                </div>
              </div>

              <div className="stat-item">
             
                <div className="stat-content">
                  <span className="stat-label">Location</span>
                  <span className="stat-value">{character.location?.name || "Unknown"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed information sections */}
        <div className="character-details-expanded">
          {/* Character Information */}
          <div className="detail-section">
            <h3 className="section-title">
             
              Character Information
            </h3>
            <div className="detail-grid">
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Full Name</span>
                <span className="detail-value-expanded">{character.name}</span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Status</span>
                <span className={`detail-value-expanded status-badge-expanded ${getStatusClass(character.status)}`}>
                  {character.status}
                </span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Species</span>
                <span className="detail-value-expanded">{character.species}</span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Gender</span>
                <span className="detail-value-expanded">{character.gender}</span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Type</span>
                <span className="detail-value-expanded">{character.type || "Unknown"}</span>
              </div>
              <div className="detail-item-expanded">
                <span className="detail-label-expanded">Origin</span>
                <span className="detail-value-expanded">{character.origin?.name || "Unknown"}</span>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="detail-section">
            <h3 className="section-title">
          
              Location Details
            </h3>
            <div className="location-card">
              <div className="location-info">
                <h4 className="location-name">{character.location?.name || "Unknown Location"}</h4>
                <p className="location-description">Current residence of {character.name}</p>
              </div>
            </div>
          </div>

          {/* Episodes Information */}
          <div className="detail-section">
            <h3 className="section-title">
     
              Episode Appearances
            </h3>
            <div className="episodes-info">
              <div className="episodes-count">
                <span className="episodes-number">{character.episode?.length || 0}</span>
                <span className="episodes-label">Episodes</span>
              </div>
              <div className="episodes-description">
                <p>This character appears in {character.episode?.length || 0} episodes throughout the series.</p>
              </div>
              
              {/* Lista detallada de episodios */}
              {character.episode && character.episode.length > 0 && (
                <div className="episodes-list">
                  <h4 style={{ 
                    marginTop: '1.5rem', 
                    marginBottom: '1rem', 
                    fontSize: '1.1rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Episodes List:
                  </h4>
                  <div style={{
                    display: 'grid',
                    gap: '0.75rem',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0'
                  }}>
                    {character.episode.map((episode, index) => {
                      // Verificar si el episodio es un objeto completo o solo una URL
                      const isEpisodeObject = typeof episode === 'object' && episode !== null && 'id' in episode;
                      
                      if (isEpisodeObject) {
                        const episodeData = episode as Episode;
                        return (
                          <div key={episodeData.id} style={{
                            padding: '1rem',
                            backgroundColor: 'white',
                            borderRadius: '0.375rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '0.5rem'
                            }}>
                              <h5 style={{
                                margin: 0,
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#1f2937'
                              }}>
                                {episodeData.name}
                              </h5>
                              <span style={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}>
                                {episodeData.episode}
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.875rem',
                              color: '#6b7280'
                            }}>
                              <span>Air Date: {episodeData.air_date}</span>
                              <span>Episode ID: #{episodeData.id}</span>
                            </div>
                          </div>
                        );
                      } else {
                        // Si es solo una URL, mostrar información básica
                        const episodeUrl = episode as string;
                        const episodeId = episodeUrl.split('/').pop();
                        return (
                          <div key={index} style={{
                            padding: '1rem',
                            backgroundColor: 'white',
                            borderRadius: '0.375rem',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span style={{
                                fontSize: '0.875rem',
                                color: '#6b7280'
                              }}>
                                Episode #{episodeId}
                              </span>
                              <span style={{
                                backgroundColor: '#f3f4f6',
                                color: '#6b7280',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem'
                              }}>
                                Loading...
                              </span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Meta Information */}
          <div className="detail-section">
            <h3 className="section-title">
        
              Meta Information
            </h3>
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
  )
}

export default CharacterDetailView
