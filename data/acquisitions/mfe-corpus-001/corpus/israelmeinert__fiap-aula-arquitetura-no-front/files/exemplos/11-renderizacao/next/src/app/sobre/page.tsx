export const dynamic = 'force-static';
export default function Page() { return <main><h1>Sobre o EventFlow</h1><p>Conteúdo estático gerado no build.</p><p>Gerado em: {new Date().toISOString()}</p><a href="/evento">Voltar ao evento</a></main>; }
