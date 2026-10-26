'use client';
import dynamic from 'next/dynamic';
// use client sozinho não desliga SSR. Aqui o painel usa ssr: false de propósito.
const Painel = dynamic(() => import('./Painel'), { ssr: false, loading: () => <p>Aguardando o navegador</p> });
export default function Page() { return <main><Painel /></main>; }
