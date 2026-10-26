---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-cross-unit-communication | analytics-dashboard/public/workers/filterWorker.js:7 | analytics-dashboard | none | No | `self.postMessage(logs)` de um Web Worker de filtragem de logs (`self.onmessage`, analytics-dashboard/public/workers/filterWorker.js:2), que devolve o resultado à própria thread principal; não é comunicação entre unidades. O arquivo também não é usado: nenhum código referencia `filterWorker` ou `workers/`, e a página cria o worker a partir de um Blob inline (analytics-dashboard/src/app/page.tsx:46-50) |
| src-cross-unit-communication | analytics-dashboard/public/workers/filterWorker.js:23 | analytics-dashboard | none | No | `self.postMessage(filteredLogs)` do mesmo Web Worker não usado (ver analytics-dashboard/public/workers/filterWorker.js:7); mensagem worker → thread principal dentro da unidade |
| src-cross-unit-communication | analytics-dashboard/src/app/page.tsx:30 | analytics-dashboard | none | No | `self.postMessage(logs)` dentro da string `workerCode` (analytics-dashboard/src/app/page.tsx:26-43), código do Web Worker inline instanciado em analytics-dashboard/src/app/page.tsx:50; a resposta volta para `setFilteredLogs` na mesma página (analytics-dashboard/src/app/page.tsx:52-54). Interno à unidade |
| src-cross-unit-communication | analytics-dashboard/src/app/page.tsx:41 | analytics-dashboard | none | No | `self.postMessage(filtered)` do mesmo worker inline (analytics-dashboard/src/app/page.tsx:26-43); mensagem worker → página, interna à unidade |
| src-cross-unit-communication | analytics-dashboard/src/app/page.tsx:97 | analytics-dashboard | none | No | `workerRef.current.postMessage({ logs: tableLogs, searchTerm })` envia os logs ao Web Worker inline da própria página (`new Worker(workerUrl)` em analytics-dashboard/src/app/page.tsx:50); não envolve outra unidade |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | host-shell/next.config.ts:10 | host-shell | host-relationship | Yes | `async rewrites()` declara quais aplicações o host-shell usa e sob quais caminhos (`beforeFiles`): `/analytics`, `/analytics/api/metrics`, `/analytics/:path` e `/analytics-assets/_next/:path*` para `ANALYTICS_URL` (host-shell/next.config.ts:14-33), `/workspace`, `/workspace/:path*` e `/workspace-assets/_next/:path*` para `WORKSPACE_URL` (host-shell/next.config.ts:35-46). `ANALYTICS_URL` e `WORKSPACE_URL` valem `PRODUCTION_*_URL` ou `http://localhost:3001` e `http://localhost:3002` (host-shell/next.config.ts:3-6), portas de analytics-dashboard (analytics-dashboard/package.json:6) e workspace-document (workspace-document/package.json:6), que respondem nesses caminhos por `basePath`/`assetPrefix` (analytics-dashboard/next.config.ts:5-6, workspace-document/next.config.ts:5,7). Config exportada como `nextConfig` em host-shell/next.config.ts:52 |

## Resumo

Construções com composição: 1 (host-relationship: 1).

## Notas

- Decisão do pesquisador (24/10/2026), válida para todos os repositórios: quando o `rewrites()` do host declara um app remoto sob um caminho (`cfg-route-rewrites` no `matches.csv`), aplica-se a opção B decidida em 013-nikJovanovic__ita-vaje; por isso host-shell/next.config.ts:10 entrou como linha manual `host-relationship` / `Yes`, mesmo sendo ocorrência `cfg-route-rewrites` no `matches.csv`.
- As cinco linhas `src-cross-unit-communication` são falsos positivos: `postMessage` entre a página do analytics-dashboard e um Web Worker de filtragem. A composição multi-zones aparece nas ocorrências `cfg-*`: `cfg-route-rewrites` em host-shell/next.config.ts:10 e `cfg-zone-path` em analytics-dashboard/next.config.ts:5-6 e workspace-document/next.config.ts:5,7.
- A busca do passo 4 (`import(`, `React.lazy`, `dynamic(`, `loadRemote*`, `customElements`, `registerApplication`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`, `localStorage`, `document.cookie`) não achou carregamento, montagem, embutimento nem comunicação entre unidades. O `indexedDB` de workspace-document/src/utils/indexedDB.ts:11 guarda o rascunho da própria unidade, e o `EventSource("/analytics/api/metrics")` (analytics-dashboard/src/app/page.tsx:68) fala com a rota de API da própria unidade (analytics-dashboard/src/app/api/metrics/route.ts).
- A navegação entre zonas é por link de página inteira: `<a href={link.path}>` com `/analytics` e `/workspace` em host-shell/src/components/GlobalNavbar.tsx:10-14,41-43 e `<Link href={app.path}>` em host-shell/src/app/page.tsx:11,19,74-75. Link de navegação não é um dos tipos do passo 4, por isso não virou linha.
