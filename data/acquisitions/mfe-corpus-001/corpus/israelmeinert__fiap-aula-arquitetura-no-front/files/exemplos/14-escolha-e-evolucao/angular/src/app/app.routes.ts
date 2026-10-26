import type { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'eventos', loadChildren: () => import('./features/eventos').then(m => m.EVENTOS_ROUTES) },
  { path: 'compra', loadChildren: () => import('./features/compra').then(m => m.COMPRA_ROUTES) },
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: '**', redirectTo: 'eventos' },
];
