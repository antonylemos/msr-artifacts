---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 378 — cMancillaValle/ARGOS-SiVIA

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-custom-element | frontend-hermes/src/hermes-widget.tsx:6 | frontend-hermes | custom-element | Yes | `class HermesWidget extends HTMLElement` encapsula a aplicação React: no `connectedCallback` cria o shadow DOM e monta `<App>` com `createRoot` (frontend-hermes/src/hermes-widget.tsx:14-28, 42-46), lendo os atributos `token`, `api-base` e `modulo` (:10-12, :38-40). Ativo: o arquivo é a entrada do build IIFE (frontend-hermes/vite.config.ts:11-15) e o bundle é carregado pela unidade frontend em frontend/dashboard.html:366, que usa a tag em frontend/dashboard.html:361. |
| src-custom-element | frontend-hermes/src/hermes-widget.tsx:16 | frontend-hermes | custom-element | Yes | `this.attachShadow({ mode: 'open' })` cria o shadow DOM do mesmo custom element, onde injeta o CSS (frontend-hermes/src/hermes-widget.tsx:19-21) e o ponto de montagem do React (:24-27); consumido pela unidade frontend (frontend/dashboard.html:361). |
| src-custom-element | frontend-hermes/src/hermes-widget.tsx:58 | frontend-hermes | custom-element | Yes | `customElements.define('hermes-widget', HermesWidget)`, protegido por `customElements.get` (frontend-hermes/src/hermes-widget.tsx:57), registra a tag para consumo; a tag `<hermes-widget>` é usada pela unidade frontend em frontend/dashboard.html:361 depois de carregar `/hermes/hermes-widget.js` (frontend/dashboard.html:366). |
| src-dynamic-script | frontend/js/router.js:54 | frontend | none | No | Em `loadComponent`, recria como `<script>` os scripts inline de um fragmento HTML da própria unidade (`components/<arquivo>`, frontend/js/router.js:45-57), porque `innerHTML` não os executa; os fragmentos são `topbar.html` e `sidebar.html` de frontend/components (frontend/js/router.js:181-182). Não carrega o bundle de outra unidade. |
| src-dynamic-script | frontend/js/router.js:93 | frontend | none | No | Em `loadView`, recria como `<script>` os scripts inline da vista carregada de `views/` da própria unidade (frontend/js/router.js:64-96), com os arquivos do mapa `MODULES` (frontend/js/router.js:13-29). Não carrega o bundle de outra unidade. |
| src-dynamic-script | frontend/views/mapa_transmilenio.html:604 | frontend | none | No | `ensureLeaflet` injeta o script da biblioteca Leaflet de CDN (`https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`, frontend/views/mapa_transmilenio.html:592-608) quando `L` ainda não existe; biblioteca de mapas, não outra unidade. |
| src-html-external-script | frontend/dashboard.html:14 | frontend | none | No | `<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">` carrega a biblioteca Leaflet de CDN, não o bundle de outra unidade. |
| src-html-external-script | frontend/dashboard.html:15 | frontend | none | No | `<script src="https://cdn.tailwindcss.com">` carrega o CDN do Tailwind, não o bundle de outra unidade. |
| src-html-external-script | frontend/index.html:23 | frontend | none | No | Mesmo `<script src="https://cdn.tailwindcss.com">` do CDN do Tailwind, na página inicial. |
| src-html-external-script | frontend/login.html:12 | frontend | none | No | Mesmo `<script src="https://cdn.tailwindcss.com">` do CDN do Tailwind, na página de login. |
| src-cross-unit-communication | frontend-hermes/src/App.tsx:35 | frontend-hermes | communication | Yes | `window.addEventListener('toggle-hermes', handleToggle)` no `useEffect` de `App` (frontend-hermes/src/App.tsx:25-42) abre ou fecha o painel do widget; o evento é disparado pelo botão do topbar da unidade frontend (frontend/components/topbar.html:26). Ativo: `App` é montado pelo custom element (frontend-hermes/src/hermes-widget.tsx:44). Os listeners são removidos em frontend-hermes/src/App.tsx:39-40. |
| src-cross-unit-communication | frontend-hermes/src/App.tsx:36 | frontend-hermes | communication | Yes | `window.addEventListener('close-hermes', handleCloseEvent)` no mesmo `useEffect` (frontend-hermes/src/App.tsx:30-36) fecha o painel; o evento é disparado pela unidade frontend ao abrir o drawer de perfil (frontend/dashboard.html:421). |
| src-cross-unit-communication | frontend/components/topbar.html:26 | frontend | communication | Yes | O botão "Hermes IA" dispara `window.dispatchEvent(new CustomEvent('toggle-hermes'))` (frontend/components/topbar.html:24-30), ouvido pelo widget da unidade frontend-hermes (frontend-hermes/src/App.tsx:35). Ativo: o fragmento é carregado no `topbar-container` por `loadComponent` (frontend/js/router.js:181; frontend/dashboard.html:85), chamado por `AppRouter.init()` (frontend/dashboard.html:724). |
| src-cross-unit-communication | frontend/dashboard.html:421 | frontend | communication | Yes | `toggleProfileDrawer` dispara `window.dispatchEvent(new CustomEvent('close-hermes'))` ao abrir o drawer de perfil (frontend/dashboard.html:408-422), ouvido pelo widget da unidade frontend-hermes (frontend-hermes/src/App.tsx:36). |
| src-cross-unit-communication | frontend/js/router.js:71 | frontend | none | No | `document.dispatchEvent(new CustomEvent('argos:navaway'))` avisa as vistas da própria unidade, antes de trocar o DOM, para limparem timers e listeners (comentário em frontend/js/router.js:68-70); os ouvintes estão só em frontend/views. Evento interno. |
| src-cross-unit-communication | frontend/views/auditoria.html:219 | frontend | none | No | `addEventListener('argos:navaway', ...)` limpa o `setInterval` da vista ao sair dela; ouve o evento interno do roteador da mesma unidade (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/auditoria.html:288 | frontend | none | No | Mesmo ouvinte de `argos:navaway` para limpar outro intervalo da vista; evento interno da unidade (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/dashboard_home.html:458 | frontend | none | No | Mesmo ouvinte de `argos:navaway` para limpar o intervalo da vista inicial; evento interno da unidade (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/infra_servidores.html:306 | frontend | none | No | Mesmo ouvinte de `argos:navaway` para limpar o polling da vista; evento interno da unidade (frontend/js/router.js:71). |
| src-cross-unit-communication | frontend/views/mapa_transmilenio.html:616 | frontend | none | No | Ouvinte de `argos:navaway` que remove o listener de `resize` e destrói o mapa Leaflet (frontend/views/mapa_transmilenio.html:616-622); evento interno da unidade (frontend/js/router.js:71). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | frontend/dashboard.html:361 | frontend | custom-element | Yes | Uso da tag `<hermes-widget id="hermes-ai-widget" api-base="/api" modulo="dashboard">` no shell do dashboard (comentário "HERMES IA WIDGET (MICRO-FRONTEND)" em frontend/dashboard.html:358-360); consome o custom element definido pela unidade frontend-hermes (frontend-hermes/src/hermes-widget.tsx:58). |
| manual | frontend/dashboard.html:366 | frontend | script-loading | Yes | `<script src="/hermes/hermes-widget.js">` carrega o bundle IIFE da unidade frontend-hermes (`fileName` em frontend-hermes/vite.config.ts:14-15), servido pelo backend a partir de `frontend-hermes/dist` (backend/main.py:92, 281-288). O padrão `src-html-external-script` não pegou a linha porque o caminho é local. |

## Resumo

Construções com composição: 9 (custom-element: 4, communication: 4, script-loading: 1).

## Notas

- Os 13 `none` são falsos positivos: scripts de biblioteca de CDN (Leaflet, Tailwind), a reexecução dos scripts inline dos fragmentos HTML da própria unidade pelo roteador e o evento interno `argos:navaway`.
- A comunicação entre as duas unidades é por `CustomEvent` em `window`, em um só sentido: frontend dispara `toggle-hermes` e `close-hermes`, e frontend-hermes ouve.
