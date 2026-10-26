import type { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'evento', loadComponent: () => import('./evento/evento-page').then(m => m.EventoPage) },
  { path: 'sobre', loadComponent: () => import('./sobre/sobre-page').then(m => m.SobrePage) },
  { path: 'painel', loadComponent: () => import('./painel/painel-page').then(m => m.PainelPage) },
  { path: '', redirectTo: 'evento', pathMatch: 'full' },
  { path: '**', redirectTo: 'evento' },
];
