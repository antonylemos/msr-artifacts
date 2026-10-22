import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

/**
 * Defining the application's routes. This central configuration
 * promotes better organization and scalability for larger applications.
 */
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, // Landing page, eagerly loaded.
        title: 'Home',          // Optional: Route title for browser tab/SEO
    },
    {
        path: 'feature',
        /**
         * Lazy loading the FeatureComponent. This route will trigger a separate
         * network request to load the 'feature.component' bundle only when
         * the user navigates to '/feature'.
         */
        loadComponent: () =>
            import('./components/feature/feature.component').then(
                (mod) => mod.FeatureComponent
            ),
        title: 'Feature',       // Optional: Route title
    },
    {
        path: 'admin',
        /**
         * Example of lazy loading a more complex area of the application.
         * This could potentially load a module (if we weren't in a standalone context exclusively)
         * or a set of related components. Here, we're still lazy-loading a component.
         */
        loadComponent: () =>
            import('./components/admin/admin.component').then(
                (mod) => mod.AdminComponent
            ),
        title: 'Admin Area',    // Optional: Route title
        // Example of adding route-level data (can be used by guards, resolvers)
        data: { requiresAuth: true },
        // Example of a guard to protect this route
        // canActivate: [AuthGuard],
    },
    // Add more routes as your application grows
    {
        path: '**',
        redirectTo: '', // Default redirect for unknown paths
    },
];
