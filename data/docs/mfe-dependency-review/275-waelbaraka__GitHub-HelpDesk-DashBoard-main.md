---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| Frontend/package.json:53 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | Frontend/vite.config.js:4 (`import federation from '@originjs/vite-plugin-federation'`); Frontend/vite.config.js:11-35 (`federation({ name: 'platform_host', remotes: { remote_app: ... }, exposes, shared })` em `plugins`); Frontend/package.json:7-8 (`vite` e `vite build`, que leem o `vite.config.js` do diretório); Frontend/src/components/layouts/DashboardLayout.jsx:144 (`import('remote_app/WhatsAppChannelSettingsPage')`) e :385 (rota `/integrations/whatsapp`) |
| whatsapp-module-frontend/package.json:28 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | whatsapp-module-frontend/vite.config.js:4 (`import federation from '@originjs/vite-plugin-federation'`); whatsapp-module-frontend/vite.config.js:11-50 (`federation({ name: 'remote_app', filename: 'remoteEntry.js', exposes: { './Button', './WhatsAppChannelSettingsPage' }, ... })` em `plugins`); whatsapp-module-frontend/package.json:7-8 (`vite --port 5001` e `vite build --watch`, que leem o `vite.config.js` do diretório) |

## Notas

- Os dois pacotes não têm workspace comum; cada linha foi julgada pela configuração do próprio pacote (`same_package_matches`). As `other_package_matches` de cada linha são a configuração do outro frontend, que usa a sua própria declaração do pacote.
- Fora das listas, o grep do nome do pacote em `.js/.jsx/.ts/.mjs/.cjs/.json` (sem lockfiles) só achou os dois `import` em `vite.config.js:4` e as duas declarações nos manifestos.
- `Frontend/src/modules/moduleLoader.js` (placeholder citado pela classificação) não importa o pacote e não foi usado como evidência.
