import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Angular Module Federation</h1>

    <h2>Remote Widget Component</h2>
    <ng-container #mfeHost></ng-container>

    <h2>RouterOutlet</h2>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'demo';

  @ViewChild('mfeHost', { read: ViewContainerRef, static: true })
  private mfeHost!: ViewContainerRef;

  async ngAfterViewInit() {
    try {
      const remoteComponent = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './RemoteWidget',
      });

      if (!remoteComponent?.RemoteWidgetComponent) {
        throw new Error('RemoteWidgetComponent not found in loaded module.');
      }

      this.mfeHost.createComponent(remoteComponent.RemoteWidgetComponent);
    } catch (error) {
      console.error('[MFE LOAD ERROR]', error);
    }
  }
}
