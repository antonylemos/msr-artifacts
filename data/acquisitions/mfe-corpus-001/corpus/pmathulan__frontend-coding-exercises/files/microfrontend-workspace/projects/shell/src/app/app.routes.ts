import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
    {
        path: 'mfe1',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './Component',
            }).then(m => m.AppComponent)  // <-- the actual component name
    },
    // {
    //     path: 'mfe2',
    //     loadChildren: () =>
    //         loadRemoteModule({
    //             type: 'module',
    //             remoteEntry: 'http://localhost:4202/remoteEntry.js',
    // exposedModule: './Component',
    // }).then(m => m.AppComponent)

    { path: '', redirectTo: 'mfe1', pathMatch: 'full' }
];
