import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,) {
  }

  /**
   * Loads a component dynamically using import(). This achieves code splitting
   * at the component level, loading 'dynamic-widget.component.ts' only when needed.
   */
  async loadDynamicComponent() {
    try {
      const { DynamicWidgetComponent } = await import('../dynamic-widget/dynamic-widget.component');
      const factory = this.componentFactoryResolver.resolveComponentFactory(DynamicWidgetComponent);
      this.viewContainerRef.createComponent(factory);
    } catch (error) {
      console.error('Failed to load dynamic component', error);
    }
  }
}
