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
interface UseSearchReturn {
    searchTerm: string;
    filteredCharacters: Character[];
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clearSearch: () => void;
}
export declare const useSearch: (characters: Character[]) => UseSearchReturn;
export {};
