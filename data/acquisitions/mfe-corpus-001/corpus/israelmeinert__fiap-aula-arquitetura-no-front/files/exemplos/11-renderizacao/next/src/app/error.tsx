'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main><h1>Evento indisponível</h1><p role="alert">Não foi possível carregar os dados.</p><button onClick={reset}>Tentar novamente</button></main>; }
