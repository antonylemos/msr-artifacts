---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-lifecycles | src/main.ts:13 | . | runtime-composition | Yes | `registerApplication({ name: 'menu', app: () => import(env.VITE_MENU), activeWhen: '/' })` (src/main.ts:13-17, `registerApplication` importado de `single-spa` em src/main.ts:3) registra no root config o microfrontend externo `menu`, fora do snapshot, ativo em todas as rotas; monta no nó `#single-spa-application:menu` da página (index.html:12). O arquivo é a entrada da unidade (index.html:20). |
| src-lifecycles | src/main.ts:21 | . | runtime-composition | Yes | `registerApplication({ name: 'base', app: () => import(env.VITE_BASE), activeWhen: '/' })` (src/main.ts:21-25) registra o microfrontend externo `base`, fora do snapshot, também ativo em `/`; monta no nó `#single-spa-application:base` (index.html:17). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/main.ts:15 | . | dynamic-loading | Yes | `app: () => import(/* @vite-ignore */ env.VITE_MENU)` carrega em runtime os lifecycles do microfrontend externo `menu` pela URL da variável `VITE_MENU` (src/main.ts:7), que no snapshot só aparece em `.envtest:8` (`http://localhost:9083/src/index.ts`). |
| manual | src/main.ts:23 | . | dynamic-loading | Yes | `app: () => import(/* @vite-ignore */ env.VITE_BASE)` carrega em runtime os lifecycles do microfrontend externo `base` pela URL de `VITE_BASE`, definida no snapshot só em `.envtest:11` (`http://localhost:9081/src/index.ts`). |
| manual | src/main.ts:29 | . | runtime-composition | Yes | `start()` do single-spa (importado em src/main.ts:3) inicia o orquestrador; sem ele os registros de src/main.ts:13-17 e :21-25 não montam `menu` nem `base`. |

## Resumo

Construções com composição: 5 (runtime-composition: 3, dynamic-loading: 2).

## Notas

- As duas unidades alvo (`menu` e `base`) estão fora do snapshot; o repositório contém só o root config (revisão estrutural 176, unidade `.`).
- As URLs dos microfrontends vêm de `import.meta.env` (src/main.ts:7). O único arquivo do snapshot que as define é `.envtest` (`.envtest:8` e `:11`); o comentário de src/main.ts:5-6 indica `.env` / `.env.local`, que não estão no snapshot. Isso não muda a resposta: o alvo de cada registro é nomeado (`menu`, `base`) e os registros estão na entrada da unidade.
- Os nós `#single-spa-application:menu` e `#single-spa-application:base` (index.html:12 e :17) são os pontos de montagem dos registros e estão nas observações deles; não viraram linha própria.
- A busca do passo 4 nos arquivos do snapshot (exceto `package-lock.json`) não encontrou `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, injeção de `<script>`, `loadRemote*`, `initFederation`, `registerRemotes` nem `System.import`; os únicos `import()` são os de src/main.ts:15 e :23.
