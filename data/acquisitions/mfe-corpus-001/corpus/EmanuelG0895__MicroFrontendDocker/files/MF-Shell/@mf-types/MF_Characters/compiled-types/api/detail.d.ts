export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url?: string;
    };
    location: {
        name: string;
        url?: string;
    };
    type?: string;
    image?: string;
    episode: string[];
    created: string;
    url?: string;
}
export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}
export declare const fetchCharacterById: (id: number) => Promise<Character>;
export declare const fetchCharacterEpisodes: (episodeUrls: string[]) => Promise<Episode[]>;
export declare const fetchCharacterTwo: () => Promise<Character>;
