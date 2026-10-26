// Root config single-spa — точка входа, которая регистрирует
// и запускает все микрофронтенды приложения.
import { registerApplication, start } from 'single-spa';

// URL-адреса микрофронтендов берутся из переменных окружения Vite
// (файл .env / .env.local), чтобы легко переключать адреса между dev/prod.
const env = (import.meta as any).env;

// Микрофронтенд «menu» — навигационное меню.
// activeWhen: '/' — монтируется на всех маршрутах (всегда виден).
// @vite-ignore — подавляет предупреждение Vite о динамическом импорте
// с переменной (не строковым литералом).
registerApplication({
  name: 'menu',
  app: () => import(/* @vite-ignore */ env.VITE_MENU),
  activeWhen: '/',
});

// Микрофронтенд «base» — основное содержимое страниц.
// Тоже активен на '/', т.е. отображается параллельно с menu.
registerApplication({
  name: 'base',
  app: () => import(/* @vite-ignore */ env.VITE_BASE),
  activeWhen: '/',
});

// Запуск single-spa: начинает слушать изменения URL
// и монтировать/размонтировать зарегистрированные микрофронтенды.
start();