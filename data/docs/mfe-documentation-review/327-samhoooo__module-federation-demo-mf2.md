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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Leitura do repositório

A documentação é o README da raiz, em inglês e curto, o único arquivo `documentation` do `artifacts.csv`. Ele apresenta o repositório como exemplo de micro frontend com Module Federation 2.0 (README.md:1-3), descreve as duas aplicações, `header-app` como remote e `home-app` como host (README.md:5-6, 11-12), e diz como rodá-las e checar os tipos (README.md:17-30). O ponto que o README destaca é a tipagem entre builds separados: o remote publica o manifesto e os `.d.ts` gerados, e o host checa o import remoto com `tsc`. As duas capturas de tela (README.md:8, 14) são imagens externas, sem texto.

Os comentários do código dizem mais que o README. O de home-app/rspack.config.js:48-50 justifica o uso do `mf-manifest.json` no lugar de uma URL fixa de `remoteEntry.js`, e o de home-app/src/App.tsx:3-10 explica de onde vêm os tipos e os valores do enum `HeaderVariant`. Também foram lidos os comentários e campos de header-app/rspack.config.js, dos dois `package.json` (sem `description`), dos `tsconfig.json`, dos `entry.ts` e `index.tsx`, dos `public/index.html`, de header-app/src/App.tsx e dos tipos gerados em `home-app/@mf-types/` (home-app/@mf-types/index.d.ts:1-22; home-app/@mf-types/HeaderApp/apis.d.ts:1-3; home-app/@mf-types/HeaderApp/Header.d.ts:1-2; home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12), que não têm comentário. O comentário de header-app/rspack.config.js:14-17 diz que o plugin de `dts` grava os arquivos de tipos em `dist/` fora da compilação e que por isso o `devServer` os serve como estáticos; é detalhe do servidor de desenvolvimento e ficou fora da tabela, citado na afirmação 4. O comentário `// This application named 'Home'` (home-app/rspack.config.js:47) só nomeia a aplicação.

O README confere com as revisões anteriores: duas unidades (3.4.3), `@module-federation/enhanced` configurado nas duas (3.4.2), uma relação host → remote ativa por `mf-manifest.json` (3.4.5 #1) e build separado de cada uma (3.4.6). A única afirmação que vai além do snapshot está no comentário de home-app/src/App.tsx:10, que fala em "build/deploy" separados: não há artefato de deploy (3.4.6, Deploy `não observado: 2`).

Ficaram fora da tabela:
- as portas 4001 e 4000 (README.md:5, 27-28), detalhe de infraestrutura;
- o bloco de comandos `cd header-app && npm install && npm start` e `cd home-app && npm install && npm start` (README.md:22-25), citado na afirmação 4;
- "Open http://localhost:4000 to view the host (Home App)" (README.md:27), que repete o papel do host e está no parágrafo da afirmação 3.

Ocorrências `doc-*` que não viraram linha: README.md:1 (`doc-integration-technology`), título "Module Federation 2.0 React Example". README.md:3 (`doc-mfe-term` e `doc-integration-technology`) está na afirmação 1, e README.md:11 (`doc-host-remote`) na afirmação 3.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "An example app designed with micro frontend architectural pattern using **Module Federation 2.0**" | estrutura | corroborada | 3.4.3 (header-app e home-app `Yes`); 3.4.2 (`@module-federation/enhanced` ^2.8.2 configurado nas duas); 3.4.5 #1 |
| 2 | README.md:5-6 | "`header-app` — remote, exposes `./Header`, […] publishes `mf-manifest.json` and generated `.d.ts` types for everything it exposes" | estrutura | corroborada | 3.4.5 #1; header-app/rspack.config.js:57-63; home-app/rspack.config.js:52; home-app/@mf-types/HeaderApp/Header.d.ts:1-2 |
| 3 | README.md:11-12 | "`home-app` — host, consumes `HeaderApp/Header` via the remote's manifest and gets full IDE/`tsc` type checking on that import, even though it's a separate build" | estrutura | corroborada | 3.4.5 #1; 3.4.6 #1 e #2 (`separado`); home-app/rspack.config.js:51-54; home-app/tsconfig.json:15-17 |
| 4 | README.md:19-20 | "Start `header-app` first — `home-app` fetches both its runtime bundle *and* its types from it on startup" | composição | corroborada | 3.4.4 (dynamic-loading em home-app/src/App.tsx:13); home-app/rspack.config.js:52, 54; header-app/rspack.config.js:14-20 |
| 5 | README.md:28 | "Open [http://localhost:4001](http://localhost:4001) to view the remote (Header App)" (o remote roda sozinho) | independência | corroborada | 3.4.3 (entrada de header-app); header-app/src/index.tsx:11-16; header-app/rspack.config.js:54-56 |
| 6 | README.md:30 | "Type-check either app on its own with `npm run typecheck`." | independência | corroborada | header-app/package.json:12; home-app/package.json:12; home-app/tsconfig.json:15-19 |
| 7 | home-app/rspack.config.js:48-50 | "Remotes are resolved via each remote's mf-manifest.json rather than a hardcoded remoteEntry.js URL — […] so consumers can resolve remotes at runtime." | composição | corroborada | 3.4.5 #1; 3.4.4 (dynamic-loading em home-app/src/App.tsx:13); home-app/rspack.config.js:51-53 |
| 8 | home-app/src/App.tsx:3-5 | "TS downloaded HeaderApp's generated declarations into ./@mf-types/HeaderApp and resolves them via the \"HeaderApp/*\" path in tsconfig.json" | composição | corroborada | home-app/tsconfig.json:15-17; home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12; header-app/rspack.config.js:63; home-app/rspack.config.js:54 |
| 9 | home-app/src/App.tsx:5-8 | "HeaderVariant is a real enum defined in header-app/src/App.tsx — this pulls in both its type AND its runtime values (Light/Dark) from the remote's own build, with no shared package and no hand-written .d.ts" | composição | corroborada | 3.4.4 (Notas, import estático de home-app/src/App.tsx:11); header-app/src/App.tsx:4-7; header-app/rspack.config.js:60-62; home-app/@mf-types/index.d.ts:1-22 |
| 10 | home-app/src/App.tsx:8-10 | "tsc will reject it even though header-app is a completely separate build/deploy" | build-deploy | parcial | 3.4.6 #1 e #2 (build `separado`, deploy `não observado`) |

## Observações

**1. README.md:3.** O snapshot tem duas aplicações React/Rspack, cada uma com manifesto e build próprios, ligadas pelo `ModuleFederationPlugin` de `@module-federation/enhanced` ^2.8.2 (header-app/package.json:15; home-app/package.json:15), o pacote do Module Federation 2.0. A palavra "example" confere com `repo_type: example` da classificação.

**2. README.md:5-6.** O header-app é o remote `HeaderApp` e expõe `./Header` a partir de `./src/App` (header-app/rspack.config.js:58-62). O manifesto e os tipos não estão no snapshot como arquivos publicados, porque o `dist` é ignorado (.gitignore:2), mas a publicação se confirma de dois lados: o host busca `http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:52), e as declarações geradas de `./Header`, com `dts: true` no remote (header-app/rspack.config.js:63), estão em `home-app/@mf-types/HeaderApp/` (home-app/@mf-types/HeaderApp/Header.d.ts:1-2). A porta 4001 ficou fora da tabela.

**3. README.md:11-12.** O home-app é o host `HomeApp` (home-app/rspack.config.js:47) e declara o remote pelo manifesto (home-app/rspack.config.js:51-53). A checagem de tipos se apoia em `dts: true` (home-app/rspack.config.js:54) e no `paths` que leva `HeaderApp/*` a `./@mf-types/HeaderApp/*` (home-app/tsconfig.json:15-17); o mecanismo está descrito no comentário da afirmação 8. O build separado é o da revisão de build e deploy (home-app/package.json:11). README.md:27 repete o papel de host ("to view the host (Home App)").

**4. README.md:19-20.** O host depende do remote no ar para as duas coisas: o código vem em runtime pelo manifesto (home-app/rspack.config.js:52) quando a página carrega o `lazy(() => import('HeaderApp/Header'))` (home-app/src/App.tsx:13), e os tipos são baixados pelo plugin de `dts` do host (home-app/rspack.config.js:54). Do lado do remote, o `devServer` serve o `dist/` como estático justamente para os arquivos de tipos (header-app/rspack.config.js:14-20). "On startup" vale de fato para os tipos; o código remoto é buscado quando o navegador abre o host. Os comandos que seguem (README.md:22-25) rodam cada aplicação no seu diretório, primeiro o remote.

**5. README.md:28.** O header-app tem entrada própria que renderiza o cabeçalho sem o host, com `<App title="Header (MF2)" />` (header-app/src/index.tsx:11-16) e um `index.html` próprio (header-app/rspack.config.js:54-56). Rodando sozinho, o remote usa o `variant` padrão `Dark` (header-app/src/App.tsx:14), enquanto o host passa `Light` (home-app/src/App.tsx:19).

**6. README.md:30.** As duas aplicações têm o script `typecheck` com `tsc --noEmit` (header-app/package.json:12; home-app/package.json:12). O host consegue checar os tipos sem o remote no ar porque as declarações geradas estão no snapshot e o `tsconfig.json` as inclui (home-app/tsconfig.json:15-19).

**7. home-app/rspack.config.js:48-50.** O comentário repete o uso do manifesto da afirmação 3 e acrescenta que a resolução do remote acontece em runtime. O remote é declarado por `HeaderApp@http://localhost:4001/mf-manifest.json`, não por `remoteEntry.js` (home-app/rspack.config.js:51-53), e o host o carrega por `import()` dinâmico (home-app/src/App.tsx:13), relação ativa na revisão de composição. A URL do manifesto, porém, também está fixa na configuração. A parte do comentário sobre o conteúdo do manifesto ("carries build metadata (exposed modules, shared deps)") descreve o formato do Module Federation 2.0, não este projeto.

**8. home-app/src/App.tsx:3-5.** As declarações geradas estão em `home-app/@mf-types/HeaderApp/` e reproduzem o `HeaderVariant` e o `HeaderProps` do remote (home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12; header-app/src/App.tsx:4-12). O `paths` do tsconfig liga o especificador `HeaderApp/*` a elas (home-app/tsconfig.json:15-17). Os dois lados têm `dts: true` (header-app/rspack.config.js:63; home-app/rspack.config.js:54).

**9. home-app/src/App.tsx:5-8.** O enum está em header-app/src/App.tsx:4-7 e é exportado pelo módulo exposto `./Header` (header-app/rspack.config.js:60-62). O host o importa estaticamente de `HeaderApp/Header` (home-app/src/App.tsx:11), import que a revisão de código-fonte registrou nas Notas como consumo do remote em runtime. Não há pacote comum entre as duas aplicações (sem workspace, 3.4.3), e os `.d.ts` de `@mf-types` têm o formato gerado pelo plugin (home-app/@mf-types/index.d.ts:1-22), não escrito à mão. Os pacotes que o `shared` declara (header-app/rspack.config.js:64-74; home-app/rspack.config.js:55-65) são o React, não código do projeto.

**10. home-app/src/App.tsx:8-10.** A parte da checagem de tipos se confirma (afirmação 8), e o build separado também (header-app/package.json:11; home-app/package.json:11). Já o deploy separado não tem artefato: as duas aplicações só são servidas pelo `rspack serve` em `localhost`, e a revisão de build e deploy registrou Deploy `não observado` para ambas. Por isso a afirmação é `parcial`.

## Resumo

Afirmações: 10 (corroborada: 9, parcial: 1, contradita: 0, sem corroboração: 0). Temas: (estrutura: 3, composição: 4, build-deploy: 1, independência: 2).
