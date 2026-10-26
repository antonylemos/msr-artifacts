---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-dynamic-script | shell/src/hooks/useRemoteModule.ts:79 | shell | script-loading | Yes | `document.createElement('script')` no hook `useRemoteModule` injeta o bundle UMD de `mf-1`: `script.src = url` (:80), `document.head.appendChild(script)` (:99) e, no `onload`, lê o componente de `window[moduleName][componentName]` (:23-24, :82-87); antes expõe `window.React`/`window.ReactDOM` (:36-37), que o bundle usa como globais externos (mf-1/vite.mf.ts:35, :42-45). O `url` é `MF1_BASE_URL + '/remote-modules/bundle.js'` (shell/src/components/RemoteHeader.tsx:19), saída do build `format: "umd"`, `name: "MF1_RemoteModules"` de `mf-1` (mf-1/vite.mf.ts:28, :37-39). Ativo: shell/src/pages/index.tsx:178 → `RemoteHeader` → `useRemoteModule` (shell/src/components/RemoteHeader.tsx:18). |
| src-cross-unit-communication | mf-1/public/remote-modules/bundle.js:10 | mf-1 | none | No | Falso positivo em saída gerada: o `postMessage(r,"*")` casado é o polyfill de `setImmediate` embutido do axios (`` `axios@${Math.random()}` `` na mesma linha), que manda mensagem à própria janela para agendar callbacks; não é comunicação entre unidades. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/components/RemoteHeader.tsx:18 | shell | script-loading | Yes | `useRemoteModule<HeaderProps>({ url: MF1_BASE_URL + "/remote-modules/bundle.js", moduleName: "MF1_RemoteModules", componentName: "Header" })` (:18-22) passa ao carregador a URL do bundle UMD de `mf-1` e pede o componente `Header` (exportado em mf-1/src/RemoteModules/RemoteModules.ts:10); `MF1_BASE_URL` vem de `publicRuntimeConfig` (shell/src/components/RemoteHeader.tsx:8-10; shell/next.config.js:8, padrão `http://localhost:3001`, porta de mf-1/package.json:7). |
| manual | shell/src/components/RemoteHeader.tsx:37 | shell | runtime-composition | Yes | `<Header appName="Shell App" router={router} onMount={handleMount} />` renderiza no shell o `Header` de `mf-1` obtido em :14-22; o shell passa o próprio `router` do Next, que o remote usa para navegar (mf-1/src/RemoteModules/Header.tsx:83-85, :104-106). Usado em shell/src/pages/index.tsx:178, shell/src/pages/fulfilment.tsx:29 e shell/src/pages/orders/[id].tsx:273, :289. |
| manual | shell/src/components/RemoteFulfilment.tsx:29 | shell | script-loading | Yes | `useRemoteModule<FulfilmentProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'Fulfilment' })` (:29-33) carrega o mesmo bundle de `mf-1` e pede o componente `Fulfilment` (mf-1/src/RemoteModules/RemoteModules.ts:10); se o script já está no `head`, o hook reaproveita (shell/src/hooks/useRemoteModule.ts:55-75). |
| manual | shell/src/components/RemoteFulfilment.tsx:65 | shell | runtime-composition | Yes | `<Fulfilment onFulfil={onFulfil} onTrack={onTrack} />` (:65-68) renderiza no shell o `Fulfilment` de `mf-1`, com callbacks do shell. Usado em shell/src/pages/fulfilment.tsx:30. |
| manual | shell/src/components/RemoteFulfilmentDetails.tsx:29 | shell | script-loading | Yes | `useRemoteModule<FulfilmentDetailsProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'FulfilmentDetails' })` (:29-33) carrega o bundle de `mf-1` e pede o componente `FulfilmentDetails` (mf-1/src/RemoteModules/RemoteModules.ts:10). |
| manual | shell/src/components/RemoteFulfilmentDetails.tsx:65 | shell | runtime-composition | Yes | `<FulfilmentDetailsComponent orderId={orderId} onStatusChange={onStatusChange} />` (:65-68) renderiza no shell o `FulfilmentDetails` de `mf-1`. Usado em shell/src/pages/orders/[id].tsx:410. |

## Resumo

Construções com composição: 7 (script-loading: 4, runtime-composition: 3).

## Notas

- A única ocorrência `src-cross-unit-communication` está em `mf-1/public/remote-modules/bundle.js`, saída versionada do build Vite (`outDir: "public/remote-modules"`, mf-1/vite.mf.ts:28), e é código do axios.
- Não há mecanismo explícito de comunicação entre unidades: o shell e o remote trocam dados só por props e callbacks (`router`, `onMount`, `onFulfil`, `onTrack`, `onStatusChange`).
- `mf-1` também usa os mesmos componentes localmente, por import estático (mf-1/src/pages/index.tsx:3-4, mf-1/src/pages/fulfilment.tsx:3-4); isso é interno à unidade e não vira linha.
