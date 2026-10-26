import type { Routes } from '@angular/router';
export const COMPRA_ROUTES: Routes = [{ path: '', loadComponent: () => import('./compra-page').then(m => m.CompraPage) }];
