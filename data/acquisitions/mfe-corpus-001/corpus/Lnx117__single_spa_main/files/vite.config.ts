import { defineConfig } from 'vite';
import path from 'node:path';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    // Интеграция с single-spa — микрофронтендовым оркестратором.
    // type: 'root' — этот проект является корневым (root config),
    //   т.е. он загружает и монтирует дочерние микрофронтенды.
    // cssStrategy: 'multiMife' — изоляция CSS между микрофронтендами,
    //   чтобы стили одного приложения не ломали другое.
    vitePluginSingleSpa({
      type: 'root',
      cssStrategy: 'multiMife',
    }),
  ],
  server: {
    port: 9080,
    // host: true — слушать на 0.0.0.0, а не только localhost,
    // чтобы dev-сервер был доступен по сети (другие машины, Docker и т.д.)
    host: true,
  },
  resolve: {
    alias: {
      // Алиас '@' → папка src/, чтобы в импортах писать
      // '@/components/Button' вместо '../../src/components/Button'
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
