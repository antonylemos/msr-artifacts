---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | frontend/apps/host/src/App.tsx:6 | frontend/apps/host | dynamic-loading | Yes | `React.lazy(() => import("remote_header/Header"))` carrega o `./Header` exposto pela unidade frontend/apps/remote-header (frontend/apps/remote-header/rspack.config.ts:74-78), declarada como remote `remote_header` em frontend/apps/host/rspack.config.ts:85; `App.tsx` é a entrada do build do host (frontend/apps/host/rspack.config.ts:10) |
| src-remote-import | frontend/apps/host/src/App.tsx:7 | frontend/apps/host | dynamic-loading | Yes | `React.lazy(() => import("remote_footer/Footer"))` carrega o `./Footer` exposto pela unidade frontend/apps/remote-footer (frontend/apps/remote-footer/rspack.config.ts:74-78), remote `remote_footer` em frontend/apps/host/rspack.config.ts:86 |
| src-remote-import | frontend/apps/host/src/utils/VueShortener.tsx:12 | frontend/apps/host | dynamic-loading | Yes | `await import("url_shortener/Shortener")` carrega o componente Vue `./Shortener` exposto pela unidade frontend/apps/url-shortener (frontend/apps/url-shortener/rspack.config.ts:75-78), remote `url_shortener` em frontend/apps/host/rspack.config.ts:87; o wrapper é importado em frontend/apps/host/src/App.tsx:4 e renderizado em frontend/apps/host/src/App.tsx:17 |
| src-mount-call | frontend/apps/host/src/utils/VueShortener.tsx:16 | frontend/apps/host | runtime-composition | Yes | `app.mount(containerRef.current)` monta no host React o componente Vue da unidade frontend/apps/url-shortener, criado por `createApp(Shortener.default)` em frontend/apps/host/src/utils/VueShortener.tsx:15 com o `vue` carregado em frontend/apps/host/src/utils/VueShortener.tsx:10 |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | frontend/apps/host/src/App.tsx:13 | frontend/apps/host | runtime-composition | Yes | Renderiza `<RemoteHeader />` da unidade frontend/apps/remote-header dentro de `Suspense` (frontend/apps/host/src/App.tsx:12-14); componente resolvido em frontend/apps/host/src/App.tsx:6 e App montado em frontend/apps/host/src/App.tsx:27-28 |
| manual | frontend/apps/host/src/App.tsx:21 | frontend/apps/host | runtime-composition | Yes | Renderiza `<RemoteFooter />` da unidade frontend/apps/remote-footer dentro de `Suspense` (frontend/apps/host/src/App.tsx:20-22); componente resolvido em frontend/apps/host/src/App.tsx:7 |

## Resumo

Construções com composição: 6 (dynamic-loading: 3, runtime-composition: 3).

## Notas

- `<VueShortener />` (frontend/apps/host/src/App.tsx:17) renderiza o wrapper local do host; a montagem do componente remoto já está na linha frontend/apps/host/src/utils/VueShortener.tsx:16, por isso não vira linha manual.
- A busca do passo 4 achou também `import("./App")` em frontend/apps/host/src/index.ts:1, interno e fora do build (a entrada é `./src/App.tsx`, frontend/apps/host/rspack.config.ts:10), e `createApp(App)`/`app.mount("#app")` em frontend/apps/url-shortener/src/index.ts:18-19, que monta a própria unidade no modo standalone. Nenhum é construção de composição.
- Não há custom elements, iframes nem mecanismo de comunicação entre unidades no código das quatro apps.
- Os remotes são resolvidos por URLs `localhost` fixas (frontend/apps/host/rspack.config.ts:85-87); o `withZephyr()` (frontend/apps/host/rspack.config.ts:7) pode reescrevê-las na publicação, o que não aparece no código.
