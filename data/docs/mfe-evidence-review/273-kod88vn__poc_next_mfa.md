---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 273 — kod88vn/poc_next_mfa

## Leitura do repositório

Prova de conceito de Next.js 16 Multi-Zones num monorepo npm workspaces + Turborepo, com três aplicações Next.js: `apps/shell` (host, porta 3000), `apps/shop` (sob `basePath: '/shop'`, porta 3001) e `apps/duda` (sob `basePath: '/duda'`, porta 3002), mais a biblioteca `packages/ui` (`@repo/ui`). A composição usa só recursos do próprio Next.js. A única dependência da revisão de dependências é o `turbo`, ferramenta de monorepo cujo uso fica indeterminado (#1).

A cadeia que sustenta a arquitetura é de roteamento no servidor, não de montagem na página:
- **Estrutura:** as três apps têm manifesto, entrada e build próprios (#7, #8, #9).
- **Configuração:** o `rewrites()` do shell encaminha `/duda` para `http://localhost:3002/duda` e `/shop` e `/shop/:path*` para `http://localhost:3001/shop...` (#2).
- **Código:** a linha do `rewrites()` registrada na 3.4.4 (#4), dentro do bloco de #2.
- **Relações:** isso resulta nas duas relações ativas shell → zona (#11, #12). Cada zona responde com a página inteira e o próprio layout.

A segunda ligação é o contador do carrinho: a Server Action do shop grava o cookie `mfe_cart_count` com `path: '/'` (#5), e os layouts do shell e da duda o leem e o passam ao `Header` (#13, #14).

Build é separado por app (`next build` em cada uma, disparado pelo `turbo build` da raiz), mas não há artefato de deploy: as apps só sobem por `next dev`/`next start` em portas fixas de `localhost` (#15 a #17).

Sinais que enganam ou ficam de fora:
- A raiz do workspace e a biblioteca `packages/ui` não são unidades frontend (#6, #10). O `Header` comum vem dessa biblioteca, compilada dentro de cada app; é código compartilhado, não uma unidade montada em outra.
- A única construção da mineração, um `src-iframe`, é uma expressão regular que remove iframes do HTML externo que a zona duda injeta (#3). Esse HTML vem de um site do construtor Duda, fora do repositório.
- Os `basePath`, os cabeçalhos CORS e as portas das zonas não viraram observação de configuração (ver Nota de #2).
- A navegação entre zonas é por link de página inteira, não uma construção de composição.

A documentação confirma a forma geral: Multi-Zones, host e zonas, rewrite, cookie compartilhado, biblioteca comum e apps que sobem sozinhas (#18, #20 a #25, #27, #28, #32 a #35). O README foi escrito antes da zona duda e fala em duas zonas; o `apps/duda/ARCHITECTURE.md` completa a terceira. "Independent deployability" se confirma só em parte, porque não há artefato de deploy (#19). Quatro afirmações são desmentidas pelo snapshot: o `Button` que nenhuma app importa (#26), a regra de só usar `<a>` entre zonas, que a página `not-found` do shell não segue (#30), o build de `packages/ui` antes das apps, que não tem script `build` (#31), e o layout do shell como moldura do shop, que responde com o próprio layout (#36). O histórico esclarece que o README é anterior à `not-found` e que `packages/ui` nunca teve build (#40, #41); não diz se o `Button` já foi usado nem de quando é o comentário do layout do shop (#39, #42), dúvidas que são só sobre o passado.

A única observação ambígua é o `turbo` (#1); a arquitetura do snapshot não fica ambígua.

## Observações

### 1. package.json:18; turbo.json:5-26

**Observação:** `turbo` (`^2.3.3`) está declarada em `devDependencies`. `turbo.json` define as tasks `build`, `dev`, `lint`, `type-check` e `clean`. A única invocação de `turbo` está nos scripts do `package.json` da raiz (package.json:9-11, 13-14), sem workflow de CI, Dockerfile ou script de automação que o chame.

**Interpretação:** É a ferramenta de monorepo, não uma tecnologia de MFE. Pela regra da revisão de dependências, o uso fica indeterminado: o Turborepo pode ser a orquestração efetiva do build ou só um atalho de scripts.

### 2. apps/shell/next.config.js:5-44

**Observação:** `reactStrictMode: true` (6), `transpilePackages: ['@repo/ui']` (9) e `async rewrites()` (25-43), que devolve três regras: `/duda` para `http://localhost:3002/duda` (29-30), `/shop` para `http://localhost:3001/shop` (34-35) e `/shop/:path*` para `http://localhost:3001/shop/:path*` (39-40). O comentário do bloco diz "MULTI-ZONE ROUTING — the core MFE \"string\"" (12). Os endereços estão fixos no arquivo, sem variável de ambiente.

**Interpretação:** A configuração do host declara as duas zonas, duda e shop, como destinos de caminhos sob a sua origem, com os endereços pelos quais as resolve.

**Nota:** Os `next.config.js` das zonas, citados nas mesmas tabelas, só declaram `basePath`, `reactStrictMode`, `transpilePackages` e um cabeçalho CORS para `http://localhost:3000` (apps/shop/next.config.js:5-42; apps/duda/next.config.js:5-23). O `basePath` é o caminho em que a zona é publicada, ou seja, deploy (dimensão 6), e está nas observações #15 e #17; o CORS e o `transpilePackages` não declaram elemento da composição. Os `package.json` das apps só têm scripts com as portas, o `package.json` da raiz declara o workspace (estrutura, #6) e o `turbo.json` declara tasks de build. Nenhum desses blocos virou observação de configuração.

### 3. apps/duda/lib/duda-landing.ts:387

**Observação:** `sanitized = sanitized.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');`, em `sanitizeLandingHtml` (363), ao lado das remoções de `<script>` e `<noscript>` (385-386), aplicada ao HTML do site externo do Duda.

**Interpretação:** É sanitização do conteúdo externo que a zona duda injeta, não um embutimento de unidade; nenhum mecanismo de MFE.

### 4. apps/shell/next.config.js:25

**Observação:** `async rewrites()` liga `/duda` a `http://localhost:3002/duda` e `/shop` e `/shop/:path*` a `http://localhost:3001/shop` e `http://localhost:3001/shop/:path*` (26-42). A configuração é exportada em `module.exports = nextConfig` (46).

**Interpretação:** O roteamento do host declara para qual zona vai cada caminho.

**Nota:** É a linha manual da 3.4.4, que fica dentro do bloco de configuração de #2. Ela vira observação própria porque toda linha da 3.4.4 vira uma (passo 2). A força segue a orientação de uma rota que liga um caminho a outra unidade numa tabela de rotas.

### 5. apps/shop/app/actions.ts:26-31; apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141

**Observação:** A Server Action `addToCart` grava o cookie `mfe_cart_count` com `path: '/'`, `sameSite: 'lax'` e validade de uma semana. É disparada pelos formulários `<form action={addToCart}>` da listagem e do detalhe do produto.

**Interpretação:** O shop grava a contagem do carrinho num cookie válido para toda a origem, o mecanismo de estado compartilhado. A leitura pelas outras zonas está nas relações #13 e #14.

### 6. .; package.json:1-27; package.json:9

**Observação:** A raiz tem só o `package.json`, com `workspaces` (`apps/*`, `packages/*`), `devDependencies` `tsx` e `turbo` e um `build` que é `turbo build`. Não tem entrada nem configuração de build próprias.

**Interpretação:** É raiz de coordenação do workspace, não uma unidade frontend.

### 7. apps/duda; apps/duda/package.json:6; apps/duda/app/layout.tsx:15; apps/duda/app/page.tsx:9; apps/duda/next.config.js:5-23

**Observação:** Tem manifesto, layout raiz do App Router (`DudaLayout`), página `DudaPage` e build `next build` próprios, com `basePath: '/duda'` e `transpilePackages`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 8. apps/shell; apps/shell/package.json:6; apps/shell/app/layout.tsx:22; apps/shell/app/page.tsx:46; apps/shell/next.config.js:5-44

**Observação:** Tem manifesto, layout raiz do App Router (`RootLayout`), página `HomePage` na rota `/` e build `next build` próprios, com `rewrites()` para `/shop` e `/duda`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 9. apps/shop; apps/shop/package.json:6; apps/shop/app/layout.tsx:25; apps/shop/app/page.tsx:65; apps/shop/next.config.js:5-42

**Observação:** Tem manifesto, layout raiz do App Router (`ShopLayout`), página `ShopPage` e build `next build` próprios, com `basePath: '/shop'` e `transpilePackages`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 10. packages/ui; packages/ui/package.json:5-11; packages/ui/package.json:13-16

**Observação:** `main`, `types` e `exports` apontam para `./src/index.ts`. Os scripts são só `lint` e `type-check`, sem `build`; as apps compilam o pacote por `transpilePackages`.

**Interpretação:** É a biblioteca compartilhada `@repo/ui`, sem entrada de aplicação, não uma unidade frontend.

### 11. apps/shell/next.config.js:25, 28-31; apps/duda/next.config.js:6; apps/duda/app/page.tsx:9

**Observação:** O shell repassa `/duda` para `http://localhost:3002/duda`. O prefixo `/duda` é o `basePath` de `apps/duda`, cuja página `DudaPage` responde nessa rota. O rewrite cobre só `/duda`, sem `/duda/:path*`; a zona tem uma única página.

**Interpretação:** É uma relação ativa em que o shell encaminha um caminho para a zona duda, que responde com a página inteira.

### 12. apps/shell/next.config.js:25, 32-41; apps/shop/next.config.js:19; apps/shop/app/page.tsx:65

**Observação:** O shell repassa `/shop` e `/shop/:path*` para `http://localhost:3001/shop` e `http://localhost:3001/shop/:path*`. O prefixo `/shop` é o `basePath` de `apps/shop`, e o comentário da zona diz que o rewrite do shell encaminha `localhost:3000/shop/*` para ela (apps/shop/next.config.js:13-14).

**Interpretação:** É uma relação ativa em que o shell encaminha um caminho e suas subrotas para a zona shop, que responde com a página inteira.

### 13. apps/shop/app/actions.ts:26-31; apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141; apps/duda/app/layout.tsx:24-27, 82

**Observação:** O shop grava o cookie `mfe_cart_count` com `path: '/'` ao adicionar produtos. O layout da duda lê o cookie e passa a contagem como `cartCount` ao `Header` (`<Header cartCount={cartCount} currentZone="duda" />`).

**Interpretação:** É uma relação ativa de estado compartilhado por cookie entre o shop e a duda.

### 14. apps/shop/app/actions.ts:26-31; apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141; apps/shell/app/layout.tsx:29-32, 58

**Observação:** O cookie `mfe_cart_count` gravado pelo shop é lido no layout do shell e passado como `cartCount` ao `Header`.

**Interpretação:** É uma relação ativa de estado compartilhado por cookie entre o shop e o shell.

### 15. apps/duda/package.json:6; apps/duda/next.config.js:5-23; package.json:9; turbo.json:6-10; apps/duda/package.json:7, 9

**Observação:** `next build` gera o `.next` só da duda, sob `basePath: '/duda'`; o `turbo build` da raiz dispara esse build, e a task `build` guarda `.next/**` como saída. O código de `@repo/ui` entra no artefato por `transpilePackages`. Não há Dockerfile, compose, workflow nem configuração de hospedagem: a app só sobe por `next dev`/`next start` na porta 3002. `version: "0.0.1"` não é usado em publicação, e a app é `private`.

**Interpretação:** Há fronteira de build própria, sem deploy observado nem versionamento independente.

### 16. apps/shell/package.json:6; apps/shell/next.config.js:5-44; package.json:9; turbo.json:6-10; apps/shell/package.json:7, 9

**Observação:** `next build` gera o `.next` só do shell, com o `rewrites()` para endereços fixos de `localhost`. Sem artefato de deploy; sobe por `next dev`/`next start` na porta 3000. `version: "0.0.1"` sem uso e app `private`.

**Interpretação:** Há fronteira de build própria, sem deploy observado nem versionamento independente. O artefato do shell não contém código das zonas, mas o roteamento que ele leva só funciona com as zonas nas portas locais dos scripts.

### 17. apps/shop/package.json:6; apps/shop/next.config.js:5-42; package.json:9; turbo.json:6-10; apps/shop/package.json:7, 9

**Observação:** `next build` gera o `.next` só do shop, sob `basePath: '/shop'`. Sem artefato de deploy; sobe na porta 3001. O CORS fixo em `http://localhost:3000` vem com o comentário "In a production deployment, replace with the actual shell origin" (apps/shop/next.config.js:26-27). `version: "0.0.1"` sem uso e app `private`.

**Interpretação:** Há fronteira de build própria, sem deploy observado nem versionamento independente; a configuração é de execução local.

### 18. README.md:1, 3

**Observação:** "A production-style Microfrontend architecture using **Next.js 16 Multi-Zones** and **Turborepo**".

**Interpretação:** Afirma uma arquitetura de micro-frontends com Multi-Zones e Turborepo, o que as três unidades, as relações de rota e o `turbo build` da raiz confirmam. "Production-style" não tem artefato de deploy que o sustente.

### 19. README.md:3

**Observação:** "demonstrating independent deployability".

**Interpretação:** Afirma deploy independente das zonas. Cada app tem build próprio e sobe sozinha, mas nenhum artefato faz deploy, e os destinos do rewrite são endereços fixos de `localhost`. A afirmação se confirma em parte.

### 20. README.md:3

**Observação:** "a shared design system".

**Interpretação:** Afirma uma biblioteca de UI comum às zonas. As três apps importam o `Header` de `@repo/ui` e compilam o pacote por `transpilePackages`, o que confirma a afirmação.

### 21. README.md:3

**Observação:** "cross-zone state".

**Interpretação:** Afirma estado compartilhado entre as zonas, sem nomear o mecanismo. O cookie gravado pelo shop e lido pelo shell e pela duda confirma a afirmação.

### 22. README.md:10, 18

**Observação:** "localhost:3000/ ← Shell zone (homepage + global navigation)" / "`apps/shell` | 3000 | Host — homepage, global nav, rewrite proxy".

**Interpretação:** Afirma o shell como host, com a página inicial e o proxy por rewrite, o que a unidade do shell e a linha do `rewrites()` confirmam.

### 23. README.md:11

**Observação:** "localhost:3000/shop/* ← Shell rewrites → Shop zone (localhost:3001/shop/*)".

**Interpretação:** Afirma que o host encaminha `/shop/*` para a zona shop, o que a linha do `rewrites()` e a relação de rota confirmam.

### 24. README.md:13

**Observação:** "Cookie: mfe_cart_count ← Shared by both zones (port-agnostic on localhost)".

**Interpretação:** Afirma estado compartilhado por cookie, o que a gravação no shop e as relações de cookie confirmam. "Both zones" vale para as duas que o README nomeia; a duda também lê o cookie.

### 25. README.md:19

**Observação:** "`apps/shop` | 3001 | Remote — product listing & PDP (`basePath: /shop`)".

**Interpretação:** Afirma o shop como zona alcançada pelo host sob `/shop`, o que a unidade do shop e a relação de rota confirmam. O rótulo "Remote" é do README: a ligação é encaminhamento de rota, não carregamento de módulo.

### 26. README.md:20

**Observação:** "`packages/ui` | — | Shared design system — `Header`, `Button`" (parte `Button`).

**Interpretação:** Afirma que o `Button` é compartilhado. `packages/ui/src/index.ts:1` o exporta, mas os imports de `@repo/ui` nas três apps trazem só `Header`, `getDudaBrandTheme` e `normalizeHeaderTheme`, o que contradiz a afirmação.

### 27. README.md:35

**Observação:** "Turborepo starts shell (:3000) + shop (:3001) in parallel".

**Interpretação:** Afirma que cada zona sobe no próprio servidor, em paralelo, pelo Turborepo. O `turbo dev` da raiz e a task `dev` persistente rodam o `dev` de cada app na sua porta, o que confirma a afirmação; o mesmo comando também sobe a duda, que o README não cita.

### 28. README.md:41-48

**Observação:** "Run a single zone" / "Shell only" / "Shop only (direct, no shell proxy)".

**Interpretação:** Afirma que cada zona roda sozinha, o que as unidades com manifesto, entrada e build próprios confirmam.

### 29. README.md:57

**Observação:** "`turbo.json` | Pipeline tasks with Turborepo caching".

**Interpretação:** Fala da ferramenta de monorepo, sem situar as unidades. As tasks do `turbo.json` e o `turbo build` da raiz confirmam a afirmação.

### 30. README.md:71

**Observação:** "Cross-zone links use plain `<a>` tags (not `<Link>`) to force a full navigation and load the correct zone's JS bundle."

**Interpretação:** Afirma navegação entre zonas só por página inteira. O `Header` e a página inicial do shell usam `<a>`, mas a página `not-found` do shell usa `Link` de `next/link` para `/shop` e `/duda` (apps/shell/app/not-found/page.tsx:1, 50-55), o que contradiz a afirmação geral.

### 31. README.md:84

**Observação:** "The `turbo.json` pipeline ensures `packages/ui` is always built before the apps, and apps build in parallel after that."

**Interpretação:** Afirma um build próprio de `packages/ui` antes das apps. O pacote não tem script `build`, então o `^build` não roda nada nele, e cada app o compila por `transpilePackages`, o que contradiz a afirmação.

### 32. apps/duda/ARCHITECTURE.md:3, 7

**Observação:** "the current Duda zone architecture" / "Zone app: `apps/duda`".

**Interpretação:** Afirma a duda como zona própria, o que a unidade de `apps/duda` confirma.

### 33. apps/duda/ARCHITECTURE.md:9

**Observação:** "Host shell route: `/duda` via shell rewrite to the Duda zone".

**Interpretação:** Afirma que o host encaminha `/duda` para a zona duda, o que a linha do `rewrites()` e a relação de rota confirmam.

### 34. apps/duda/ARCHITECTURE.md:10

**Observação:** "All three zones (shell, shop, duda) share a single brand theme pipeline".

**Interpretação:** Afirma código de tema comum às três zonas. Os layouts das três chamam `getDudaBrandTheme`, exportada por `@repo/ui`, o que confirma a afirmação.

### 35. apps/shell/next.config.js:8

**Observação:** Comentário: "Compile the shared UI package from source (no separate build step needed)."

**Interpretação:** Afirma que a biblioteca comum não tem build próprio e é compilada dentro das apps, o que a biblioteca `packages/ui` confirma.

### 36. apps/shop/app/layout.tsx:5-7

**Observação:** Comentário: "When accessed via the shell's rewrite (localhost:3000/shop) the browser loads the shell's layout for the outer chrome".

**Interpretação:** Afirma que, pelo rewrite, o shop é exibido dentro do layout do shell. O rewrite repassa a requisição inteira, e o shop responde com o próprio `<html>`, `<body>` e `Header` (apps/shop/app/layout.tsx:49-63), o que contradiz a afirmação.

### 37. 18d620e 2026-04-12 (package.json, turbo.json); 3e95170 2026-04-24 (package.json, turbo.json, load-root-env.js, test-duda-themes.js)

**Observação:** `package.json` e `turbo.json` aparecem em 18d620e e são alterados uma vez, em 3e95170. Nenhum commit cria ou remove workflow de CI, Dockerfile ou script que chame `turbo`; os scripts soltos entram em 3e95170 e continuam no snapshot.

**Interpretação:** Nunca houve uma automação que invocasse `turbo` e tenha sido apagada. O ponto está esclarecido, e a dependência continua indeterminada.

### 38. 18d620e 2026-04-12; e001413 2026-04-12 (apps/shell/tsconfig.json, apps/shop/tsconfig.json, yarn.lock); 3e95170 2026-04-24

**Observação:** e001413 tem a mensagem "ready for deploy", mas só altera os `tsconfig.json` do shell e do shop e cria `yarn.lock`. Nenhum dos cinco commits cria ou remove Dockerfile, compose, workflow, manifesto de hospedagem ou configuração de proxy.

**Interpretação:** A falta de artefato de deploy não é abandono: em nenhuma versão até o snapshot houve um. O ponto está esclarecido.

### 39. 18d620e 2026-04-12 (packages/ui/src/Button.tsx, packages/ui/src/index.ts, README.md); 3e95170 2026-04-24 (packages/ui/src/Button.tsx, packages/ui/src/index.ts)

**Observação:** `Button.tsx` e `index.ts` aparecem em 18d620e, com as apps shell e shop, e são alterados em 3e95170. O README que cita o `Button` é o mesmo desde 18d620e. O conteúdo das versões antigas não está no clone.

**Interpretação:** O histórico não diz se o `Button` foi usado e deixou de ser, ou se nunca foi. O ponto fica inconclusivo, mas a dúvida é só sobre o passado: no snapshot nenhuma app o importa.

### 40. 18d620e 2026-04-12 (README.md); 3e95170 2026-04-24 (apps/shell/app/not-found/page.tsx)

**Observação:** A frase sobre links só com `<a>` está no README desde 18d620e, com o mesmo objeto no snapshot. A página `not-found` do shell, que usa `Link` para `/shop` e `/duda`, é criada em 3e95170, com a zona duda.

**Interpretação:** A afirmação e a página são de estágios diferentes: o README não foi atualizado quando a página entrou. O ponto está esclarecido.

### 41. 18d620e 2026-04-12 (packages/ui/package.json, README.md, turbo.json); 3e95170 2026-04-24 (turbo.json)

**Observação:** `packages/ui/package.json` é criado em 18d620e e nunca alterado (mesmo objeto no snapshot), e a frase de README.md:84 também é a mesma desde 18d620e. O `turbo.json` muda em 3e95170.

**Interpretação:** O pacote nunca teve script `build`; a contradição existe desde que a frase foi escrita, e não é resto de um estágio anterior. O ponto está esclarecido.

### 42. 18d620e 2026-04-12 (apps/shop/app/layout.tsx); 3e95170 2026-04-24 (apps/shop/app/layout.tsx, apps/shell/next.config.js)

**Observação:** `apps/shop/app/layout.tsx` aparece em 18d620e e é alterado em 3e95170, o mesmo commit que altera o `next.config.js` do shell. O conteúdo das versões antigas dos dois não está no clone.

**Interpretação:** O histórico não diz se o comentário já existia na primeira versão nem se descrevia uma configuração anterior. O ponto fica inconclusivo, mas a dúvida é só sobre o passado: no snapshot o shop responde com o próprio layout.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:18) | 1 tecnologia | manifesto | — | contexto | ambígua | declara turbo.json:5-26 |
| 2 | 3.4.3 (apps/shell, Marcadores); 3.4.3 (apps/shell, Build); 3.4.4 (apps/shell/next.config.js:25, Observação); 3.4.5 #1, #2 (Configuração, Código); 3.4.6 #1, #3 (Onde é servida); 3.4.6 #2 (Artefatos); 3.4.7 #2, #3, #6, #14, #16, #18 (Evidência) | 2 configuração | configuração | other | arquitetural | forte | configura #8; configura #11; configura #12 |
| 3 | 3.4.4 (apps/duda/lib/duda-landing.ts:387) | 3 código | código-fonte | — | contexto | fraca | — |
| 4 | 3.4.4 (apps/shell/next.config.js:25) | 3 código | configuração | other | arquitetural | forte | implementa #11; implementa #12 |
| 5 | 3.4.4 (apps/shop/app/actions.ts:26) | 3 código | código-fonte | other | tecnológica | moderada | implementa #13; implementa #14 |
| 6 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 7 | 3.4.3 (apps/duda) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 8 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 9 | 3.4.3 (apps/shop) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 10 | 3.4.3 (packages/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 11 | 3.4.5 #1 | 5 composição | configuração | other | arquitetural | forte | liga #8; liga #7 |
| 12 | 3.4.5 #2 | 5 composição | configuração | other | arquitetural | forte | liga #8; liga #9 |
| 13 | 3.4.5 #3 | 5 composição | código-fonte | other | arquitetural | forte | liga #9; liga #7 |
| 14 | 3.4.5 #4 | 5 composição | código-fonte | other | arquitetural | forte | liga #9; liga #8 |
| 15 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #7 |
| 16 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #8 |
| 17 | 3.4.6 #3 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #9 |
| 18 | 3.4.7 #1 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #11; corrobora #12; corrobora #15; corrobora #16; corrobora #17 |
| 19 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #15; corrobora em parte #16; corrobora em parte #17 |
| 20 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10; corrobora apps/shell/app/layout.tsx:10; corrobora apps/shop/app/layout.tsx:14; corrobora apps/duda/app/layout.tsx:3 |
| 21 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #5; corrobora #13; corrobora #14 |
| 22 | 3.4.7 #5 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #8; corrobora #4 |
| 23 | 3.4.7 #6 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #4; corrobora #12 |
| 24 | 3.4.7 #7 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #5; corrobora #13; corrobora #14 |
| 25 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #12 |
| 26 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/app/layout.tsx:10; contradiz apps/shop/app/layout.tsx:14; contradiz apps/duda/app/layout.tsx:3 |
| 27 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:10; corrobora turbo.json:11-14; corrobora apps/shell/package.json:7; corrobora apps/shop/package.json:7 |
| 28 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #9 |
| 29 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | corrobora turbo.json:5-26; corrobora package.json:9 |
| 30 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/app/not-found/page.tsx:50-55 |
| 31 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #10 |
| 32 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7 |
| 33 | 3.4.7 #16 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #4; corrobora #11 |
| 34 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/shell/app/layout.tsx:28; corrobora apps/shop/app/layout.tsx:31; corrobora apps/duda/app/layout.tsx:23 |
| 35 | 3.4.7 #18 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #10 |
| 36 | 3.4.7 #19 | 7 documentação | comentário | other | arquitetural | fraca | contradiz apps/shop/app/layout.tsx:49-63; contradiz #12 |
| 37 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #1 |
| 38 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #19; explica #15; explica #16; explica #17 |
| 39 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #26 |
| 40 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #30 |
| 41 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #31 |
| 42 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #36 |

## Resumo

Observações: 42. Dimensões (tecnologia: 1, configuração: 1, código: 3, estrutura: 5, composição: 4, build-deploy: 3, documentação: 19, histórico: 6). Força (forte: 6, moderada: 7, fraca: 28, ambígua: 1). Evidência (tecnológica: 1, arquitetural: 35, contexto: 6).
