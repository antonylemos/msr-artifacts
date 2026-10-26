import { RenderMode, type ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  { path: 'sobre', renderMode: RenderMode.Prerender },
  { path: 'evento', renderMode: RenderMode.Server },
  { path: 'painel', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];
