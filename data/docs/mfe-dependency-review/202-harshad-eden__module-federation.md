---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| apps/product-config/package.json:23 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/product-config/vite.config.ts:3-15 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "productConfig"`, `exposes` e `shared`); apps/product-config/package.json:5-9 (`dev`/`build` executam `vite`/`vite build` sem configuração alternativa) |
| apps/sales-portal/package.json:23 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/sales-portal/vite.config.ts:3-15 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "salesPortal"`, `exposes` e `shared`); apps/sales-portal/package.json:5-9 (`dev`/`build` executam `vite`/`vite build` sem configuração alternativa) |
| apps/shell/package.json:24 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/shell/vite.config.ts:3-16 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "shell"`, `remotes` e `shared`); apps/shell/package.json:5-9 (`dev`/`build` executam `vite`/`vite build` sem configuração alternativa) |
| apps/underwriter-portal/package.json:23 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/underwriter-portal/vite.config.ts:3-15 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "underwriterPortal"`, `exposes` e `shared`); apps/underwriter-portal/package.json:5-9 (`dev`/`build` executam `vite`/`vite build` sem configuração alternativa) |
