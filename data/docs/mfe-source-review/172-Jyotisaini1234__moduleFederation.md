---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 172 — Jyotisaini1234/moduleFederation

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | mfe1/src/App.tsx:4 | mfe1 | dynamic-loading | Yes | `React.lazy(() => import("app2/App").catch(...))` carrega em runtime o módulo `./App` exposto pela unidade mfe2 (mfe1/src/App.tsx:3-12); o remote `app2` aponta para `app2@http://localhost:3002/remoteEntry.js` em mfe1/webpack.config.ts:76-77, e mfe2 expõe `'./App': './src/App.tsx'` com `name: 'app2'` em mfe2/webpack.config.ts:38-40. Ativo: mfe1/src/index.tsx:3 → mfe1/src/bootstrap.tsx:8,15,18 → `App`. |
| src-remote-import | mfe1/src/App.tsx:39 | mfe1 | dynamic-loading | No | Linha comentada: toda a versão alternativa do componente está comentada com `//` em mfe1/src/App.tsx:35-53. |
| src-async-bootstrap | mfe1/src/index.tsx:3 | mfe1 | dynamic-loading | No | `import("./bootstrap")` de arquivo local da própria unidade (fronteira assíncrona do Module Federation); interno a mfe1. |
| src-async-bootstrap | mfe2/src/index.tsx:1 | mfe2 | dynamic-loading | No | `import("./bootstrap")` de arquivo local da própria unidade (fronteira assíncrona do Module Federation); interno a mfe2. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | mfe1/src/App.tsx:26 | mfe1 | runtime-composition | Yes | Renderiza `<RemoteApp2 />`, componente da unidade mfe2, dentro de `Suspense` (mfe1/src/App.tsx:25-27); o componente vem do `React.lazy` em mfe1/src/App.tsx:3-12, e `App` é renderizado em mfe1/src/bootstrap.tsx:15,18. |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- `window.app2Url = "http://localhost:3002"` (mfe1/src/index.tsx:1, repetido no HTML do SSR em mfe1/src/server/server.ts:81) só tem o tipo declarado em mfe1/src/types/global.d.ts:17 e não é lido em nenhum arquivo do snapshot; o endereço do remote vem fixo da configuração do webpack (mfe1/webpack.config.ts:77). Não vira linha.
- `mfe1/src/server/server.ts` renderiza o mesmo `App` no servidor (mfe1/src/server/server.ts:7,54) e injeta os bundles de `dist` com `<script src="/static/...">` (mfe1/src/server/server.ts:84); são bundles da própria mfe1, não de outra unidade, e nenhum script do mfe1/package.json executa esse servidor (mfe1/package.json:8-9). Não vira linha.
