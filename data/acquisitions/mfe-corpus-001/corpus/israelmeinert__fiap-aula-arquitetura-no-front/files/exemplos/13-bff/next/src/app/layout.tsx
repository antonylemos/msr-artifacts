import type { ReactNode } from 'react';
import '../../../../../material/estilos.css';
export const metadata = { title: 'EventFlow · Arquitetura front-end', description: 'Laboratório de arquitetura front-end' };
export default function Layout({ children }: { children: ReactNode }) { return <html lang="pt-BR"><body>{children}</body></html>; }
