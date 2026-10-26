'use client';
export default function Painel() { return <section><h1>Painel renderizado no navegador</h1><p>Horário do navegador: {new Date().toISOString()}</p><a href="/evento">Voltar ao evento</a></section>; }
