declare module "MF_CharacterDetail/CharacterInfo";
declare module "MF_CharacterDetail/View";
declare module "MF_CharacterDetail/useCharacters" {
  export function useCharacters(): {
    characters: any[];
    loading: boolean;
    error: string | null;
    loadCharacters: (page: number) => Promise<void>;
    refetch: () => Promise<void>;
  };
}
declare module "MF_Characters/useCharacterDetail";
declare module "MF_Characters/Vista";
declare module "MF_Characters/useCharacters" {
  export function useCharacters(): {
    characters: any[];
    loading: boolean;
    error: string | null;
    loadCharacters: (page: number) => Promise<void>;
    refetch: () => Promise<void>;
  };
}

interface Character {
  id: number;
  name: string;
  // ... otros campos
}

declare module "MF_Characters/useCharacters" {
  export function useCharacters(): {
    characters: Character[];
    loading: boolean;
    error: string | null;
    loadCharacters: (page: number) => Promise<void>;
    refetch: () => Promise<void>;
  };
}


