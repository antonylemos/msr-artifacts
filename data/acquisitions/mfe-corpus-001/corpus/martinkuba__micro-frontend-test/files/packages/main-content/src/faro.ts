import {
  initializeFaro,
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
    url: 'https://faro-collector-prod-us-east-2.grafana.net/collect/d7387f26c83dcfeeb0937b3b44669137',
    app: {
      name: 'mfe-test-app1',
      version: '1.0.0',
      environment: 'development',
    },
    instrumentations: [
      new SessionInstrumentation(),
      new ConsoleInstrumentation(),
      // new TracingInstrumentation(),
    ],
    isolate: true, // Create isolated instance for this micro frontend
  });

  return faro;
}

export function getFaro(): Faro | null {
  return faro;
}

