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
        episode: string[] | Episode[];
        created: string;
        url?: string;
    };
    onBack?: () => void;
}
declare const CharacterDetailView: React.FC<CharacterDetailProps>;
export default CharacterDetailView;
