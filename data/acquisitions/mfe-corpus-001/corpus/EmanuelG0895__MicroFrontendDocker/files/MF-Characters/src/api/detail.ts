export interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  origin: { name: string; url?: string }
  location: { name: string; url?: string }
  type?: string
  image?: string
  episode: string[]
  created: string
  url?: string
}

export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export const fetchCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const character: Character = await response.json()
    return character
  } catch (error) {
    console.error('Error fetching character:', error)
    throw error
  }
}

export const fetchCharacterEpisodes = async (episodeUrls: string[]): Promise<Episode[]> => {
  try {
    const episodePromises = episodeUrls.map(async (url) => {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return response.json()
    })
    
    const episodes: Episode[] = await Promise.all(episodePromises)
    return episodes
  } catch (error) {
    console.error('Error fetching episodes:', error)
    throw error
  }
}

// Función específica para obtener el personaje con ID 2
export const fetchCharacterTwo = async (): Promise<Character> => {
  return fetchCharacterById(2)
}
