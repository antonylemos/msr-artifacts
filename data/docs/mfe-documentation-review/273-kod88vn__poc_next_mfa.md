---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
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

# 273 — kod88vn/poc_next_mfa

## Leitura do repositório

A documentação está em inglês, em dois arquivos `documentation` do `artifacts.csv`, ambos lidos
inteiros. O `README.md` da raiz apresenta o projeto como uma POC de micro-frontends com Next.js 16
Multi-Zones e Turborepo (README.md:1, 3), com um diagrama do fluxo de requisições
(README.md:9-14), uma tabela de workspaces com papel de cada um (README.md:16-20), instruções de
execução (README.md:24-49), uma tabela de arquivos-chave (README.md:53-63), a explicação de como
as zonas se ligam (README.md:67-72) e uma seção sobre o cache do Turborepo (README.md:76-84). O
README descreve só duas zonas, `apps/shell` e `apps/shop`: não menciona `apps/duda`, que a revisão
estrutural registrou como a terceira unidade frontend (3.4.3) e que o shell também alcança por
rewrite (3.4.5 #1). Como a revisão de composição já notou, o texto parece anterior à zona duda; as
afirmações sobre "both zones" ficam verdadeiras para as duas que nomeiam, e o parágrafo de cada uma
diz quando a terceira zona também participa. O segundo documento, `apps/duda/ARCHITECTURE.md`,
descreve a zona duda: escopo (apps/duda/ARCHITECTURE.md:5-10), a variável `DUDA_ORIGIN` lida de um `.env` da
raiz (apps/duda/ARCHITECTURE.md:14-24), o fluxo de requisição (apps/duda/ARCHITECTURE.md:26-37) e os componentes que
buscam no servidor o HTML e o CSS de um site externo do construtor Duda, derivam dele um tema de
marca e o injetam na página (apps/duda/ARCHITECTURE.md:39-144). Ele já fala em "All three zones"
(apps/duda/ARCHITECTURE.md:10, 30, 45) e completa o que o README omite.

O que não virou linha. No README: o título "How the MFE \"string\" works" (README.md:67, ocorrência
`doc-mfe-term`); a linha da tabela de arquivos sobre a Server Action (README.md:62, ocorrência
`doc-mfe-term`), que diz o que faz um arquivo do shop e entra no parágrafo da afirmação 7 como
repetição; a linha sobre a PDP com `generateMetadata` e `generateStaticParams` (README.md:63), que
é detalhe interno do shop; os pré-requisitos (README.md:26-29); e os blocos de comando
(README.md:33-36, 43-49, 78-82), dos quais só se extraíram as afirmações das linhas 10 e 11. No
`apps/duda/ARCHITECTURE.md`: a configuração de `DUDA_ORIGIN` por um `.env` da raiz carregado por
`load-root-env.js` em cada `next.config.js` (apps/duda/ARCHITECTURE.md:16-24; load-root-env.js:4-28;
apps/shell/next.config.js:1-2) é detalhe de variável de ambiente, e o `.env` não está no snapshot
(o `.gitignore` o ignora, .gitignore:26); a captura, sanitização e injeção do HTML do site externo
(apps/duda/ARCHITECTURE.md:31-38, 73-138) é interna à zona duda e liga-a a um sistema fora do snapshot, não a
outra unidade — inclui a ocorrência `doc-integration-technology` em apps/duda/ARCHITECTURE.md:80 ("Strips
`script`, `noscript`, and `iframe` blocks"), que descreve a remoção de iframes do HTML externo
(apps/duda/lib/duda-landing.ts:383-387), não um embutimento; a política de URLs que reescreve links
do site externo para `/`, `/shop/*` e `/duda` (apps/duda/ARCHITECTURE.md:86-102; apps/duda/lib/duda-landing.ts:320-322,
396-397) e a página `not-found` do shell que recebe os links não mapeados (apps/duda/ARCHITECTURE.md:104-108)
são navegação, que as revisões anteriores não tomaram como relação; a normalização de contraste e
os testes (apps/duda/ARCHITECTURE.md:55-71, 146-152) são internos à biblioteca; e as limitações
(apps/duda/ARCHITECTURE.md:154-159), cuja ocorrência `doc-host-remote` em apps/duda/ARCHITECTURE.md:157 ("remote host
rules") fala do host do site externo, não de uma unidade remote.

Comentários e campos descritivos lidos: os três `next.config.js`, os três `layout.tsx`, a página
inicial do shell, `apps/duda/app/page.tsx`, `apps/shop/app/actions.ts`, `packages/ui/src/Header.tsx`,
`apps/duda/lib/duda-landing.ts`, os `package.json` da raiz, das apps e de `packages/ui` (nenhum tem
`description`) e o `turbo.json`. Viraram linha o comentário de apps/shell/next.config.js:8 (#18) e o
de apps/shop/app/layout.tsx:4-7 (#19); os demais repetem afirmações do README e estão nos parágrafos
delas. As `description` do `metadata` do Next.js repetem afirmações já registradas
(apps/shell/app/layout.tsx:18-19 e apps/shell/app/page.tsx:11-12, #1; apps/duda/app/layout.tsx:12 e
apps/duda/app/page.tsx:6, #15) ou são de negócio (apps/shop/app/layout.tsx:22). O CORS liberado para
`http://localhost:3000`, com o comentário "In a production deployment, replace with the actual
shell origin" (apps/shop/next.config.js:25-27), é restrição de acesso, citada no parágrafo da
afirmação 2. A página inicial do shell também tem texto de interface, não comentário, que repete o
README: "Two independent Next.js applications seamlessly stitched together via URL rewrites.
Independent deployments, shared design system, and a cross-zone cart counter"
(apps/shell/app/page.tsx:60-62), os cartões de apps/shell/app/page.tsx:17-43 e o diagrama
apps/shell/app/page.tsx:120-128; como o README, conta duas aplicações onde o snapshot tem três.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:1, 3 | "A production-style Microfrontend architecture using **Next.js 16 Multi-Zones** and **Turborepo**" | estrutura | corroborada | 3.4.3 (apps/duda, apps/shell, apps/shop = `Yes`); 3.4.5 #1-#2; 3.4.6 (package.json:9; turbo.json:6-10) |
| 2 | README.md:3 | "demonstrating independent deployability" | build-deploy | parcial | 3.4.6 #1-#3 (build `separado`, deploy `não observado`); apps/shell/next.config.js:28-41 |
| 3 | README.md:3 | "a shared design system" | composição | corroborada | apps/shell/app/layout.tsx:10, 57; apps/shop/app/layout.tsx:14, 60; apps/duda/app/layout.tsx:3, 82; apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8 |
| 4 | README.md:3 | "cross-zone state" | composição | corroborada | 3.4.4 (apps/shop/app/actions.ts:26, communication); 3.4.5 #3-#4 |
| 5 | README.md:10, 18 | "localhost:3000/ ← Shell zone (homepage + global navigation)" / "`apps/shell` \| 3000 \| Host — homepage, global nav, rewrite proxy" | estrutura | corroborada | 3.4.3 (apps/shell = `Yes`); 3.4.4 (apps/shell/next.config.js:25, host-relationship); apps/shell/app/page.tsx:46; apps/shell/package.json:7, 9 |
| 6 | README.md:11 | "localhost:3000/shop/* ← Shell rewrites → Shop zone (localhost:3001/shop/*)" | composição | corroborada | 3.4.4 (apps/shell/next.config.js:25, host-relationship); 3.4.5 #2; apps/shell/next.config.js:32-41 |
| 7 | README.md:13 | "Cookie: mfe_cart_count ← Shared by both zones (port-agnostic on localhost)" | composição | corroborada | 3.4.4 (apps/shop/app/actions.ts:26, communication); 3.4.5 #3-#4; apps/shell/app/layout.tsx:29-32; apps/shop/app/layout.tsx:32-35 |
| 8 | README.md:19 | "`apps/shop` \| 3001 \| Remote — product listing & PDP (`basePath: /shop`)" | estrutura | corroborada | 3.4.3 (apps/shop = `Yes`); 3.4.5 #2; apps/shop/next.config.js:19; apps/shop/package.json:7, 9 |
| 9 | README.md:20 | "`packages/ui` \| — \| Shared design system — `Header`, `Button`" (parte `Button`) | composição | contradita | packages/ui/src/index.ts:1; apps/shell/app/layout.tsx:10; apps/shop/app/layout.tsx:14; apps/duda/app/layout.tsx:3 |
| 10 | README.md:35 | "Turborepo starts shell (:3000) + shop (:3001) in parallel" | outro | corroborada | package.json:10; turbo.json:11-14; apps/shell/package.json:7; apps/shop/package.json:7 |
| 11 | README.md:41-48 | "Run a single zone" / "Shell only" / "Shop only (direct, no shell proxy)" | independência | corroborada | 3.4.3 (apps/shell, apps/shop = `Yes`); apps/shell/package.json:7; apps/shop/package.json:7; apps/shop/next.config.js:19 |
| 12 | README.md:57 | "`turbo.json` \| Pipeline tasks with Turborepo caching" | build-deploy | corroborada | 3.4.6 (package.json:9; turbo.json:6-10); turbo.json:5-26 |
| 13 | README.md:71 | "Cross-zone links use plain `<a>` tags (not `<Link>`) to force a full navigation and load the correct zone's JS bundle." | composição | contradita | 3.4.4 (apps/shell/app/page.tsx:68, 74; packages/ui/src/Header.tsx:74, 81); apps/shell/app/not-found/page.tsx:1, 50-55 |
| 14 | README.md:84 | "The `turbo.json` pipeline ensures `packages/ui` is always built before the apps, and apps build in parallel after that." | build-deploy | contradita | 3.4.6 (packages/ui/package.json:13-16; turbo.json:6-10); apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8 |
| 15 | apps/duda/ARCHITECTURE.md:3, 7 | "the current Duda zone architecture" / "Zone app: `apps/duda`" | estrutura | corroborada | 3.4.3 (apps/duda = `Yes`); apps/duda/next.config.js:6; apps/duda/package.json:6-9 |
| 16 | apps/duda/ARCHITECTURE.md:9 | "Host shell route: `/duda` via shell rewrite to the Duda zone" | composição | corroborada | 3.4.4 (apps/shell/next.config.js:25, host-relationship); 3.4.5 #1; apps/shell/next.config.js:28-31; apps/duda/next.config.js:6 |
| 17 | apps/duda/ARCHITECTURE.md:10 | "All three zones (shell, shop, duda) share a single brand theme pipeline" | composição | corroborada | packages/ui/src/index.ts:5; apps/shell/app/layout.tsx:10, 28; apps/shop/app/layout.tsx:14, 31; apps/duda/app/layout.tsx:3, 23 |
| 18 | apps/shell/next.config.js:8 | "Compile the shared UI package from source (no separate build step needed)." | build-deploy | corroborada | 3.4.6 (transpilePackages nas três apps; packages/ui/package.json:13-16); apps/shell/next.config.js:9 |
| 19 | apps/shop/app/layout.tsx:5-7 | "When accessed via the shell's rewrite (localhost:3000/shop) the browser loads the shell's layout for the outer chrome" | composição | contradita | 3.4.5 (Leitura: cada zona renderiza a página inteira com layout próprio); apps/shell/next.config.js:32-41; apps/shop/app/layout.tsx:49-63 |

## Observações

**1. README.md:1, 3.** O título e a primeira frase dizem que o projeto é uma arquitetura de
micro-frontends feita com Next.js Multi-Zones e Turborepo. As revisões confirmam as três partes:
três apps Next.js são unidades frontend (3.4.3), o shell as liga por `rewrites()` (3.4.5 #1-#2) e o
build da raiz é `turbo build` com a tarefa `build` do `turbo.json` (package.json:9;
turbo.json:6-10). "Production-style" não é verificável; 3.4.6 não achou artefato de deploy. As
`description` do `metadata` repetem a afirmação: "A Next.js 16 Multi-Zone Microfrontend POC powered
by Turborepo and Tailwind CSS." (apps/shell/app/layout.tsx:18-19) e "built with Next.js 16
Multi-Zones and Turborepo" (apps/shell/app/page.tsx:11-12).

**2. README.md:3.** Cada app tem build próprio por `next build` e sobe sozinha por `next start`
numa porta própria (3.4.6 #1-#3), o que sustenta a parte de artefatos separados. O deploy em si não
tem artefato: 3.4.6 registrou `não observado` para as três. Além disso, os destinos do `rewrites()`
do shell são endereços fixos de `localhost` (apps/shell/next.config.js:28-41), e o comentário do
CORS do shop pede para trocar a origem "In a production deployment" (apps/shop/next.config.js:25-27):
a configuração do snapshot é de execução local. Por isso `parcial`. O texto de interface do shell
repete "Independent deployments" (apps/shell/app/page.tsx:61).

**3. README.md:3.** O sistema de design comum é `packages/ui` (`@repo/ui`): as três apps importam
dele o `Header` e o renderizam no layout (apps/shell/app/layout.tsx:10, 57;
apps/shop/app/layout.tsx:14, 60; apps/duda/app/layout.tsx:3, 82) e compilam o pacote por
`transpilePackages` (apps/shell/next.config.js:9; apps/shop/next.config.js:23;
apps/duda/next.config.js:8). Repetem a afirmação a tabela de workspaces na parte do `Header`
(README.md:20; a parte do `Button` é a afirmação 9), a tabela de arquivos ("Shared header showing
the live cart count", README.md:60), o escopo do `apps/duda/ARCHITECTURE.md` ("Shared UI: `packages/ui`",
apps/duda/ARCHITECTURE.md:8), a descrição do layout da duda ("Renders shared `Header` from `packages/ui`",
apps/duda/ARCHITECTURE.md:136) e a seção "Shared header component", com a ocorrência `doc-mfe-term` "Renders
the MFE navigation header" (apps/duda/ARCHITECTURE.md:140-144). As revisões de código-fonte e de composição
trataram o `Header` como código compartilhado, não como relação (3.4.4, Notas).

**4. README.md:3.** "Cross-zone state" é o contador do carrinho: a Server Action do shop grava o
cookie `mfe_cart_count` (3.4.4, apps/shop/app/actions.ts:26) e o shell e a duda o leem (3.4.5
#3-#4). A frase não nomeia o mecanismo; a afirmação com o cookie é a 7.

**5. README.md:10, 18.** O diagrama e a tabela dão ao shell o papel de host, com a página inicial,
a navegação global e o proxy por rewrite. A página `HomePage` responde em `/`
(apps/shell/app/page.tsx:46), o app sobe na porta 3000 (apps/shell/package.json:7, 9) e a revisão
de código-fonte registrou o `rewrites()` dele como `host-relationship` (3.4.4). A navegação global
é o `Header` de `@repo/ui`, que as outras zonas também renderizam (afirmação 3). A parte "rewrite
proxy" é desenvolvida na afirmação 6.

**6. README.md:11.** O shell repassa `/shop` e `/shop/:path*` para `http://localhost:3001/shop` e
`http://localhost:3001/shop/:path*` (apps/shell/next.config.js:32-41), relação 2 da revisão de
composição. Repetem a afirmação: "Navigate to **http://localhost:3000/shop** — transparently served
by the shop zone" (README.md:39); a tabela de arquivos, "**Rewrite rules** — the multi-zone
\"glue\"" (README.md:58, ocorrência `doc-import-map-zones`); README.md:69; o comentário
"MULTI-ZONE ROUTING — the core MFE \"string\" ... forwarding the request to the independent shop
Next.js app running on port 3001" (apps/shell/next.config.js:11-20); e a parte do shop em
apps/duda/ARCHITECTURE.md:29. A rota da duda é a afirmação 16.

**7. README.md:13.** A Server Action `addToCart` grava `mfe_cart_count` com `path: '/'`
(apps/shop/app/actions.ts:26-31), e os layouts do shell e do shop leem o cookie
(apps/shell/app/layout.tsx:29-32; apps/shop/app/layout.tsx:32-35). "Both zones" se confirma para as
duas que o README nomeia; a duda também lê o cookie (apps/duda/app/layout.tsx:24-27), como a
revisão de composição registrou (3.4.5 #3). A explicação "port-agnostic" é sobre o navegador e não
tem artefato próprio. Repetem a afirmação: a ocorrência `doc-mfe-term` de README.md:62 ("Server
Action — increments `mfe_cart_count` cookie"), README.md:72 (ocorrência `doc-mfe-term`), os
comentários apps/shell/app/layout.tsx:4-6, apps/shop/app/layout.tsx:9-10,
apps/shop/app/actions.ts:4-9 e packages/ui/src/Header.tsx:6, 90.

**8. README.md:19.** O shop responde sob `basePath: '/shop'` (apps/shop/next.config.js:19), na
porta 3001 (apps/shop/package.json:7, 9), com a listagem em `/shop` e o detalhe em `/shop/[id]`
(apps/shop/app/page.tsx:65; apps/shop/app/[id]/page.tsx). O rótulo "Remote" é do README: a revisão
de composição registrou a ligação como `other`, encaminhamento de rota e não carregamento de
módulo (3.4.5 #2), mas o papel de unidade alcançada pelo host se confirma. Repetem o `basePath`
README.md:59, README.md:70 e o comentário "MULTI-ZONE KEY SETTING" (apps/shop/next.config.js:6-18).

**9. README.md:20.** A linha da tabela diz que o sistema de design compartilhado fornece `Header`
e `Button`. O `Header` é usado pelas três apps (afirmação 3), mas o `Button`, exportado por
`packages/ui/src/index.ts:1`, não é importado por nenhuma: os imports de `@repo/ui` nos layouts
trazem só `Header`, `getDudaBrandTheme` e `normalizeHeaderTheme` (apps/shell/app/layout.tsx:10;
apps/shop/app/layout.tsx:14; apps/duda/app/layout.tsx:3), e a busca por `Button` em `apps/` só acha
o texto de interface de apps/shell/app/page.tsx:33. Existir no pacote não basta para ser
compartilhado, por isso a parte `Button` é `contradita`. Repete a afirmação "Shared button
(`\"use client\"`)" (README.md:61), e o texto de interface diz "@repo/ui exports a Header and Button
consumed by both zones" (apps/shell/app/page.tsx:33).

**10. README.md:35.** O comentário do comando diz que o `npm run dev` da raiz sobe shell e shop em
paralelo. O script é `turbo dev` (package.json:10), e a tarefa `dev` é persistente e sem cache
(turbo.json:11-14), o que roda o `dev` de cada workspace: shell na 3000 e shop na 3001
(apps/shell/package.json:7; apps/shop/package.json:7). O mesmo comando também sobe a duda na 3002
(apps/duda/package.json:7), que o README não menciona. O título da seção, "Install & run all zones
simultaneously" (README.md:31), repete a afirmação.

**11. README.md:41-48.** Cada zona tem script `dev` próprio e pode subir sozinha
(apps/shell/package.json:7; apps/shop/package.json:7); o shop, acessado direto, responde em
`localhost:3001/shop` pelo seu `basePath` (apps/shop/next.config.js:19). As três são apps com
manifesto, entrada e build próprios (3.4.3). Repetem a afirmação o comentário "the independent shop
Next.js app" (apps/shell/next.config.js:15) e "The shop zone has its own <html> root because it is
an independent Next.js app" (apps/shop/app/layout.tsx:4-5).

**12. README.md:57.** O `turbo.json` define as tarefas `build`, `dev`, `lint`, `type-check` e
`clean` (turbo.json:5-26), com saídas cacheadas para o `build` (turbo.json:9), e o `build` da raiz é
`turbo build` (package.json:9), como registrou 3.4.6. O título "Turborepo caching" (README.md:76) e
o bloco de comandos (README.md:78-82) repetem a afirmação; os tempos "sub-second" não têm artefato.

**13. README.md:71.** Os links entre zonas do `Header` e da página inicial do shell são `<a>`
(packages/ui/src/Header.tsx:74, 81; apps/shell/app/page.tsx:68, 74), como a revisão de código-fonte
notou. Mas a página `not-found` do shell importa `Link` de `next/link` (apps/shell/app/not-found/page.tsx:1)
e o usa para ir a `/shop` e `/duda` (apps/shell/app/not-found/page.tsx:50-55), que são outras zonas.
A afirmação é geral ("Cross-zone links use plain `<a>` tags (not `<Link>`)"), e o snapshot a
desmente nessa página, por isso `contradita`; a parte que se confirma são o `Header` e a página
inicial. Os `<Link>` do shop apontam para rotas do próprio shop (apps/shop/app/page.tsx:103-104,
116-117; apps/shop/app/[id]/page.tsx:106-107). Repetem a afirmação os comentários
apps/shell/next.config.js:21-23, apps/shell/app/page.tsx:4-5, 66 e packages/ui/src/Header.tsx:45, 72.

**14. README.md:84.** `packages/ui` não tem script `build` (packages/ui/package.json:13-16), então o
`dependsOn: ["^build"]` (turbo.json:7) não tem o que rodar nele; o pacote é compilado dentro de cada
app por `transpilePackages` (apps/shell/next.config.js:9; apps/shop/next.config.js:23;
apps/duda/next.config.js:8), como registrou 3.4.6. A parte "apps build in parallel" se confirma (os
`next build` das três apps não dependem uns dos outros), mas "ensures `packages/ui` is always built
before the apps" é desmentida pelos artefatos, por isso `contradita`. O próprio comentário do shell
diz o contrário do README (afirmação 18). O diagrama do texto de interface repete a afirmação:
"build ──► ^build (packages/ui first, then apps in parallel)" (apps/shell/app/page.tsx:126).

**15. apps/duda/ARCHITECTURE.md:3, 7.** `apps/duda` é uma app Next.js com `basePath: '/duda'` e
scripts próprios na porta 3002 (apps/duda/next.config.js:6; apps/duda/package.json:6-9), uma das
três unidades da revisão estrutural (3.4.3). Repetem a afirmação as `description` "Duda integration
zone." (apps/duda/app/layout.tsx:12) e "Duda site inside a dedicated multi-zone app."
(apps/duda/app/page.tsx:6). A contagem "All three zones" está na afirmação 17.

**16. apps/duda/ARCHITECTURE.md:9.** O shell repassa `/duda` para `http://localhost:3002/duda`
(apps/shell/next.config.js:28-31), e a duda responde nesse caminho pelo `basePath`
(apps/duda/next.config.js:6): relação 1 da revisão de composição. O rewrite cobre só `/duda`, sem
`/duda/:path*` (3.4.5, Leitura); a zona tem uma única página, então isso não limita a afirmação.
apps/duda/ARCHITECTURE.md:28-29 repete a afirmação no fluxo de execução.

**17. apps/duda/ARCHITECTURE.md:10.** A função `getDudaBrandTheme`, exportada por `@repo/ui`
(packages/ui/src/index.ts:5), é chamada pelos layouts das três zonas (apps/shell/app/layout.tsx:28;
apps/shop/app/layout.tsx:31; apps/duda/app/layout.tsx:23), que aplicam as variáveis `--brand-*` ao
`body`. Usada por mais de duas unidades, a biblioteca é compartilhada. Diferença menor: shell e
shop chamam de novo `normalizeHeaderTheme` sobre o resultado, e a duda não, mas a função já
normaliza o tema antes de devolvê-lo (packages/ui/src/dudaBrandTheme.ts:356), como diz
apps/duda/ARCHITECTURE.md:51. Repetem a afirmação apps/duda/ARCHITECTURE.md:30, 45 ("Single source of truth for
`--brand-*` CSS variables used by all three zones"). As revisões anteriores não registraram esse
uso como relação, por ser código compartilhado; a evidência é do snapshot.

**18. apps/shell/next.config.js:8.** O comentário diz que `@repo/ui` é compilado a partir do
código-fonte, sem etapa de build própria. É o que 3.4.6 registrou: o pacote não tem script `build`
(packages/ui/package.json:13-16), aponta `main` e `exports` para `./src/index.ts`
(packages/ui/package.json:5-11) e é compilado por `transpilePackages` em cada app
(apps/shell/next.config.js:9). Contradiz a afirmação 14 do README.

**19. apps/shop/app/layout.tsx:5-7.** O comentário diz que, acessado pelo rewrite do shell, o shop
é exibido com o layout do shell como moldura, e que o layout próprio só aparece no acesso direto.
O rewrite repassa a requisição inteira ao shop (apps/shell/next.config.js:32-41), e o shop responde
com seu próprio `<html>`, `<body>` e `Header` (apps/shop/app/layout.tsx:49-63) nos dois casos; a
revisão de composição registrou que cada zona renderiza a página inteira com layout próprio
(3.4.5, Leitura). Nada no snapshot aplica o layout do shell a uma resposta do shop, por isso
`contradita`. A parte "its own <html> root because it is an independent Next.js app"
(apps/shop/app/layout.tsx:4-5) se confirma e está na afirmação 11.

## Resumo

Afirmações: 19 (corroborada: 14, parcial: 1, contradita: 4, sem corroboração: 0). Temas: (estrutura: 4, composição: 9, build-deploy: 4, independência: 1, outro: 1).
