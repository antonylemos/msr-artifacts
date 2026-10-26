---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 033 — abhikukreti/music-library-project

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| main-app/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | main-app/vite.config.js:3-15 (configuração padrão do Vite importa `federation` e o invoca em plugins com remotes e shared); main-app/package.json:6-10 (build executa `vite build` sem configuração alternativa) |
| music-library/package.json:20 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | music-library/vite.config.js:3-16 (configuração padrão do Vite importa `federation` e o invoca em plugins com exposes e shared); music-library/package.json:6-10 (build executa `vite build` sem configuração alternativa) |
