/* global globalThis */
import 'zone.js';
import { registerApplication, start, triggerAppChange } from 'single-spa';
import RootApp from './root.app'; // Asegúrate que src/root.app.js exista y exporte 'reactLifecycles'

// --- 1. Configuración ---
const ANGULAR_PORT = 4200; // Puerto donde corre tu 'ng serve'
const ANGULAR_ORIGIN = process.env.REACT_APP_LEAPDOCS_ORIGIN || `http://localhost:${ANGULAR_PORT}`;
const LEAPDOCS_BUNDLE_URL = process.env.REACT_APP_LEAPDOCS_BUNDLE_URL || `${ANGULAR_ORIGIN}/main.js`;
const HIDDEN_ROUTE_PREFIX = '/leapdocs';

function sanitizeUrl(url) {
  if (typeof url !== 'string' || !url.startsWith(HIDDEN_ROUTE_PREFIX)) {
    return url;
  }

  const nextPath = url.slice(HIDDEN_ROUTE_PREFIX.length) || '/';
  return nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
}

function normalizeCurrentUrl() {
  const { pathname, search, hash } = globalThis.location;
  if (!pathname.startsWith(HIDDEN_ROUTE_PREFIX)) {
    return;
  }

  const nextPath = pathname.slice(HIDDEN_ROUTE_PREFIX.length) || '/';
  const safePath = nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
  globalThis.history.replaceState(globalThis.history.state, '', `${safePath}${search}${hash}`);
}

const originalPushState = globalThis.history.pushState.bind(globalThis.history);
globalThis.history.pushState = function patchedPushState(state, title, url) {
  return originalPushState(state, title, sanitizeUrl(url));
};

const originalReplaceState = globalThis.history.replaceState.bind(globalThis.history);
globalThis.history.replaceState = function patchedReplaceState(state, title, url) {
  return originalReplaceState(state, title, sanitizeUrl(url));
};

normalizeCurrentUrl();

// --- 2. Activación por evento (sin rutas) ---
let isLeadocsActive = false;

globalThis.addEventListener('toggle-leapdocs', (event) => {
  isLeadocsActive = Boolean(event?.detail?.isActive);
  normalizeCurrentUrl();
  triggerAppChange();
});

globalThis.addEventListener('popstate', normalizeCurrentUrl);

// --- 3. Registrar Odin (React Local) ---
registerApplication(
  'odin-react',
  async () => RootApp, // Carga directa del componente exportado
  () => true
);

// --- 4. Registrar Leadocs (Angular Remoto) ---
registerApplication(
  'leadocs-angular',
  () => {
    // Promesa que carga el script y devuelve el módulo
    return new Promise((resolve, reject) => {
      // Si ya está cargado, lo devolvemos
      if (globalThis.leapdocs) return resolve(globalThis.leapdocs);

      // Creamos el script apuntando al main.js de Angular
      const script = document.createElement('script');
      script.src = LEAPDOCS_BUNDLE_URL;
      script.id = 'leadocs-bundle';
      
      script.onload = () => {
        // Al terminar de cargar, Angular debe haber expuesto 'window.leapdocs'
        if (globalThis.leapdocs) {
          console.log("✅ Angular cargado correctamente");
          resolve(globalThis.leapdocs);
        } else {
          console.error("❌ El script cargó, pero 'window.leapdocs' no existe.");
          console.warn("Asegúrate de que en el 'angular.json' de Leadocs, la propiedad 'libraryName' sea 'leadocs'");
          reject(new Error("Angular module not found on window"));
        }
      };
      
      script.onerror = () => {
        console.error("❌ Error cargando el script de Angular. ¿Está corriendo 'npm start' en el puerto 4200?");
        reject(new Error('No se pudo cargar el script remoto de Angular'));
      };

      document.head.appendChild(script);
    });
  },
  () => isLeadocsActive,
  {
    domElementGetter: () => document.getElementById('microfrontend-container')
  }
);

// --- 5. Iniciar ---
start();