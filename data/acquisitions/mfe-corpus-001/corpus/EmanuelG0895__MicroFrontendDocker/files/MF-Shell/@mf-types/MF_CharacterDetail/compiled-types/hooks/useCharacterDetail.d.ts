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
interface UseCharacterDetailReturn {
    characters: Character[];
    loading: boolean;
    error: string | null;
    loadCharacters: () => Promise<void>;
    loadMore: () => void;
    hasMore: boolean;
    refetch: () => Promise<void>;
    clearCharacters: () => void;
}
export declare const useCharacterDetail: () => UseCharacterDetailReturn;
export {};
