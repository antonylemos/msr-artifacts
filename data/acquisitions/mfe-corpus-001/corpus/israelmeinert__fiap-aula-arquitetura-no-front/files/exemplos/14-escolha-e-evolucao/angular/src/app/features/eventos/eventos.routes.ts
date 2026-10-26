import type { Routes } from '@angular/router';
export const EVENTOS_ROUTES: Routes = [{ path: '', loadComponent: () => import('./eventos-page').then(m => m.EventosPage) }];
