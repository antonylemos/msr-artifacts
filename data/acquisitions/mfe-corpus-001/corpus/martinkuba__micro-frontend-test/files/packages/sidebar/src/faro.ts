import {
  initializeFaro,
  getWebInstrumentations,
  type Faro,
} from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

let faro: Faro | null = null;

export function initFaro(): Faro {
  if (faro) {
    return faro;
  }

  faro = initializeFaro({
    url: 'https://faro-collector-prod-us-east-2.grafana.net/collect/0fdf3b73ada8e0ad798e1fdc2ac46784',
    app: {
      name: 'mfe-test-sidebar',
      version: '1.0.0',
      environment: 'development',
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: true,
      }),
      new TracingInstrumentation(),
    ],
    isolate: true, // Create isolated instance for this micro frontend
  });

  // console.log('[Faro] Initialized for mfe-test-sidebar');

  return faro;
}

export function getFaro(): Faro | null {
  return faro;
}

