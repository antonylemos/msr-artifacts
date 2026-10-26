const API_BASE_URL = "https://rickandmortyapi.com/api";

export const fetchAllCharactersPaginated = async () => {
  try {
    let allCharacters: any[] = [];
    let nextUrl: string | null = `${API_BASE_URL}/character`;
    let page = 1;

    while (nextUrl) {
      const response: Response = await fetch(nextUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();

      allCharacters = allCharacters.concat(data.results);
      nextUrl = data.info?.next;
      page++;
    }

    return { results: allCharacters };
  } catch (error) {
    throw error;
  }
};

export const fetchCharacter = async (id: any) => {
  try {
    const url = `${API_BASE_URL}/character/${id}`;

    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllCharacters = async () => {
  try {
    let allCharacters: any[] = [];
    let nextUrl: string | null = `${API_BASE_URL}/character`;
    let page = 1;

    while (nextUrl) {
      const response: Response = await fetch(nextUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();

      allCharacters = allCharacters.concat(data.results);
      nextUrl = data.info?.next;
      page++;
    }

    return { results: allCharacters };
  } catch (error) {
    throw error;
  }
};

export const fetchEpisodes = async (episodeIds: any) => {
  try {
    const ids = Array.isArray(episodeIds) ? episodeIds.join(",") : episodeIds;
    const url = `${API_BASE_URL}/episode/${ids}`;

    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
