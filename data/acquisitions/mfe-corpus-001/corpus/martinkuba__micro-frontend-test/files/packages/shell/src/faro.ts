import {
  initializeFaro,
  getWebInstrumentations,
  SessionInstrumentation,
  ConsoleInstrumentation,
  type Faro,
} from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

let faro: Faro | null = null;

export function initFaro(): Faro {
  if (faro) {
    return faro;
  }

  faro = initializeFaro({
    url: 'https://faro-collector-prod-us-east-2.grafana.net/collect/ec5267d8035475647a5f1e8beb6471bf',
    app: {
      name: 'mfe-test-shell',
      version: '1.0.0',
      environment: 'development',
    },
    instrumentations: [
      new SessionInstrumentation(),
      new ConsoleInstrumentation(),
      // new TracingInstrumentation(),
    ],

    // Enable debug logging to see what Faro is doing (disable in production)
    // isolate: true,
  });

  return faro;
}

export function getFaro(): Faro | null {
  return faro;
}

