---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 083 — webdevqadeer/frontend-development

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| react/mv-marketplace/apps/admin/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/admin/vite.config.js:3-18 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "admin_app"`, `exposes` e `shared`); react/mv-marketplace/apps/admin/package.json:8 (`"build": "vite build"`, sem configuração alternativa) |
| react/mv-marketplace/apps/buyer/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/buyer/vite.config.js:3-18 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "buyer_app"`, `exposes` e `shared`); react/mv-marketplace/apps/buyer/package.json:8 (`"build": "vite build"`, sem configuração alternativa) |
| react/mv-marketplace/apps/payment/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/payment/vite.config.js:3-16 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "payment-app"`, `exposes` e `shared`); react/mv-marketplace/apps/payment/package.json:8 (`"build": "vite build"`, sem configuração alternativa) |
| react/mv-marketplace/apps/seller/package.json:18 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/seller/vite.config.js:3-16 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "seller_app"`, `exposes` e `shared`); react/mv-marketplace/apps/seller/package.json:8 (`"build": "vite build"`, sem configuração alternativa) |
| react/mv-marketplace/apps/shell/package.json:19 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | react/mv-marketplace/apps/shell/vite.config.js:3-19 (configuração padrão do Vite importa `federation` e o invoca em plugins com `name: "shell_app"`, `remotes` para as portas 5001–5005 e `shared`); react/mv-marketplace/apps/shell/package.json:8 (`"build": "vite build"`, sem configuração alternativa) |

## Notas

- O grep do nome do pacote em `.js`, `.jsx`, `.ts`, `.mjs`, `.cjs` e `.json` do snapshot (fora de lockfiles e `node_modules/`) só encontrou os cinco `vite.config.js` e as cinco declarações nos manifestos; não há uso fora das listas da inspeção.
- `react/mv-marketplace/package.json:15` constrói as cinco aplicações por workspace, chamando o script `build` de cada uma.
- O remote `package` (`localhost:5005`) declarado nos cinco `vite.config.js` não é servido por nenhum alvo; isso não altera o julgamento das linhas, porque cada configuração invoca o plugin com o próprio `name` e com `exposes` ou `remotes` concretos.
