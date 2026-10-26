---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Leitura do repositório

Exemplo de Module Federation 2.0 (`@module-federation/enhanced/rspack`) com duas aplicações React/Rspack independentes, sem workspace na raiz (README.md:1-14). `home-app` é o host (`name: "HomeApp"`, home-app/rspack.config.js:47) e `header-app` é o remote (`name: "HeaderApp"`, `filename: "remoteEntry.js"`, expõe `./Header` → `./src/App`, header-app/rspack.config.js:58-62). O host declara o remote pelo manifesto do MF2, `HeaderApp@http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:51-53), e não por uma URL fixa de `remoteEntry.js`; o comentário de home-app/rspack.config.js:48-50 explica a escolha. As duas pontas compartilham `react` e `react-dom` como singletons (home-app/rspack.config.js:55-65; header-app/rspack.config.js:64-74).

A única composição é o cabeçalho: o host carrega `HeaderApp/Header` por `React.lazy` (home-app/src/App.tsx:13) e o renderiza dentro de `Suspense` no topo da página (home-app/src/App.tsx:18-20). A particularidade do repositório é a tipagem entre builds: com `dts: true` nos dois lados (home-app/rspack.config.js:54; header-app/rspack.config.js:63), o host recebe as declarações geradas em `home-app/@mf-types/` e as resolve por `paths` (home-app/tsconfig.json:15-17). Além do `import()` dinâmico, o host importa estaticamente o enum `HeaderVariant` do mesmo módulo remoto (home-app/src/App.tsx:11), e o comentário de home-app/src/App.tsx:3-10 diz que isso traz o tipo e os valores do enum do build do remote. Os arquivos de `@mf-types` são tipos gerados e não carregam nada em runtime. O `header-app` também roda sozinho na porta 4001 (header-app/rspack.config.js:10), servindo o `dist/` como estático para os arquivos de tipos (header-app/rspack.config.js:14-20). Não há comunicação entre as unidades além das props passadas ao componente.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | home-app | header-app | host → remote | origem → destino | module-federation | Yes | Yes | home-app/rspack.config.js:51-53 (remote `HeaderApp` em `http://localhost:4001/mf-manifest.json`); header-app/rspack.config.js:58-62 (`name: "HeaderApp"`, `filename: "remoteEntry.js"`, expõe `./Header` → `./src/App`); header-app/rspack.config.js:23 (`publicPath: "http://localhost:4001/"`); header-app/rspack.config.js:10 (porta 4001) | home-app/src/App.tsx:13; home-app/src/App.tsx:19 |

## Observações

**1. home-app → header-app.** O remote `HeaderApp` declarado pelo host (home-app/rspack.config.js:52) corresponde à unidade header-app pelo `name: "HeaderApp"` (header-app/rspack.config.js:58) e pelo módulo exposto `./Header` (header-app/rspack.config.js:60-62), que é o especificador `HeaderApp/Header` usado em home-app/src/App.tsx:13; o `publicPath` e a porta 4001 (header-app/rspack.config.js:23, :10) só corroboram. A relação é ativa: o `lazy(() => import('HeaderApp/Header'))` (home-app/src/App.tsx:13) é renderizado em home-app/src/App.tsx:19, na árvore montada a partir de home-app/rspack.config.js:6 → home-app/src/entry.ts:1 → home-app/src/index.tsx:4,11-16. O componente exposto recebe `title` e `variant` (header-app/src/App.tsx:9-20). O import estático de `HeaderVariant` (home-app/src/App.tsx:11) usa o mesmo remote; a revisão de código-fonte não o registrou como linha própria, e ele só aparece aqui como parte da renderização em :19. A linha `home-app/@mf-types/HeaderApp/apis.d.ts:3` (Composição `No`) não entra.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
