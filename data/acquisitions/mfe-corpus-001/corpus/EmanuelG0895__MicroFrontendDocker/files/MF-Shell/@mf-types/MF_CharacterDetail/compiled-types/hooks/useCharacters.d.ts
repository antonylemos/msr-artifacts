interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    type?: string;
    image?: string;
    episode: any[];
    created: string;
}
interface UseCharactersReturn {
    characters: Character[];
    loading: boolean;
    error: string | null;
    loadCharacters: () => Promise<void>;
    refetch: () => Promise<void>;
}
export declare const useCharacters: () => UseCharactersReturn;
export {};
