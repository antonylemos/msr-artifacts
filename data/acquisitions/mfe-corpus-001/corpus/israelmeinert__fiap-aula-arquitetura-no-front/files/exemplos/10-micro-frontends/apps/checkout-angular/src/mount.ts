import { createApplication } from '@angular/platform-browser';
import { createComponent, provideZonelessChangeDetection } from '@angular/core';
import { CheckoutApp } from './app/checkout-app';
export async function mount(host: HTMLElement): Promise<() => void> {
  const app = await createApplication({ providers: [provideZonelessChangeDetection()] });
  try {
    const ref = createComponent(CheckoutApp, { hostElement: host, environmentInjector: app.injector });
    try { app.attachView(ref.hostView); ref.changeDetectorRef.detectChanges(); }
    catch (error) { ref.destroy(); throw error; }
    return () => { app.detachView(ref.hostView); ref.destroy(); app.destroy(); };
  } catch (error) { app.destroy(); throw error; }
}
