---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | Frontend/src/components/layouts/DashboardLayout.jsx:144 | Frontend | dynamic-loading | Yes | `React.lazy` com `import('remote_app/WhatsAppChannelSettingsPage')` carrega a página exposta pela unidade whatsapp-module-frontend (`remote_app` em Frontend/vite.config.js:20, `name: 'remote_app'` e `exposes` em whatsapp-module-frontend/vite.config.js:13-19). Ativa: renderizada pela rota em Frontend/src/components/layouts/DashboardLayout.jsx:385; DashboardLayout é a rota `/*` em Frontend/src/App.jsx:48, e App é renderizado em Frontend/src/main.jsx:30. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | Frontend/src/components/layouts/DashboardLayout.jsx:385 | Frontend | runtime-composition | Yes | O element da rota `/integrations/whatsapp` renderiza `RemoteWhatsAppSettingsPage`, resolvido da unidade whatsapp-module-frontend em Frontend/src/components/layouts/DashboardLayout.jsx:144, dentro de `Suspense`/`Routes` (Frontend/src/components/layouts/DashboardLayout.jsx:356-357). O host passa `apiClient={platformApi}` e `useAuthStoreHook={useAuthStore}` (importados em Frontend/src/components/layouts/DashboardLayout.jsx:65 e :69), recebidos em whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:196. |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- `Frontend/src/modules/moduleLoader.js:2` define `loadRemoteComponent`, mas é um placeholder que só devolve um componente fictício (Frontend/src/modules/moduleLoader.js:20-32) e não é importado por nenhum arquivo de `Frontend/src`; o `FEDERATION_REMOTES_CONFIG` com as URLs de `remoteEntry.js` (Frontend/src/modules/moduleLoader.js:8-18) não é usado. Não virou linha.
- O carregamento genérico de remotos por módulo instalado está comentado em Frontend/src/components/layouts/DashboardLayout.jsx:410; as rotas dinâmicas renderizam só `GenericPage` (Frontend/src/components/layouts/DashboardLayout.jsx:405, :414).
- O remoto declara o host como remote (`platform_host` em whatsapp-module-frontend/vite.config.js:28), mas os imports de `platform_host/authStore` e `platform_host/apiClient` estão comentados em whatsapp-module-frontend/src/components/Button.jsx:5-7; o remoto recebe API e store do host por props. Nenhum consumo de módulo do host no código do remoto.
- Os demais `lazy(() => import(...))` do host (Frontend/src/App.jsx:8-9, Frontend/src/components/layouts/DashboardLayout.jsx:123-143 e :145) carregam páginas locais da própria unidade e não estão no matches.csv.
