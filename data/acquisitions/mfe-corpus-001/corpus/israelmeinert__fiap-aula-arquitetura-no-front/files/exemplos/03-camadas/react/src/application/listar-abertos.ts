import { listarEventos } from '../data/eventos-http';
export async function listarAbertos() { return (await listarEventos()).filter(evento => evento.vagas > 0); }
