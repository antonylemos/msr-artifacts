---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
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

# 013 — nikJovanovic/ita-vaje

## Leitura do repositório

Trabalho acadêmico ("PC Build Planner") com quatro aplicações Next.js (`shell`, `catalog-mfe`, `builds-mfe` e `auth-mfe`) unidas por Next.js Multi-Zones, ao lado de três serviços e dois BFFs. A composição usa só recursos do próprio Next.js e não depende de nenhuma tecnologia do catálogo de dependências. Por isso não há observação de dependência.

A cadeia que sustenta a arquitetura é de roteamento no servidor, não de montagem na página:
- **Estrutura:** as quatro apps têm manifesto, entrada e build próprios (#7, #8, #10, #13).
- **Configuração:** o `rewrites()` do shell encaminha `/catalog`, `/builds` e `/auth` e os assets `/<zona>-static/_next/*` para `CATALOG_URL`, `BUILDS_URL` e `AUTH_URL` (#2). O serviço `shell` do compose dá a essas variáveis os endereços dos serviços das zonas, no build e na execução (#1).
- **Código:** a linha do `rewrites()` registrada na 3.4.4 (#4), que está dentro do bloco de #2.
- **Relações:** isso resulta nas três relações ativas shell → zona (#16 a #18). Cada zona responde com a página inteira e o próprio layout.

A segunda ligação é a sessão: o `auth-mfe` grava o cookie `jwt` com `path=/` (#5), e as outras três apps o leem no `Header`. Isso dá as relações #19 a #21, que só funcionam porque o shell põe as zonas sob a mesma origem.

Build e deploy são separados por app (#22 a #25): Dockerfile, imagem, serviço no compose e workflow de CI próprios. Não há publicação de imagem nem versionamento, e o build do shell recebe os endereços das zonas.

Sinais que enganam ou ficam de fora:
- Os cinco diretórios de backend e a raiz têm manifesto, Dockerfile e workflow, mas não são frontend (#6, #9, #11, #12, #14, #15).
- O único `<script src>` da mineração é a Swagger UI de um serviço backend (#3).
- Os `assetPrefix` das zonas e os `ARG` do Dockerfile do shell não viraram observação de configuração (ver Nota de #2).

A documentação confirma a forma geral: quatro zonas, `rewrites`, sessão por cookie, apps e deploy independentes (#28 a #30, #32, #33, #36, #38). Três pontos não batem com o snapshot:
- `.github/copilot-instructions.md` descreve um único `frontend/` (#26). O histórico mostra que ele parou antes da divisão em zonas (#40).
- "Shared" para o preset shadcn, o `src/lib/bff.ts` e o Header/Footer (#31, #35, #39) descreve cópias idênticas por app, não código comum. Texto e cópias nasceram no mesmo commit (#41).
- "Every MFE fetches from `web-bff`" não vale para o shell (#34). O `bff.ts` do shell nunca foi usado (#42).

Nada fica ambíguo no snapshot.

## Observações

### 1. docker-compose.yml:196-217

**Observação:** O serviço `shell` é construído de `./shell` com os build args `CATALOG_URL: http://catalog-mfe:3001`, `BUILDS_URL: http://builds-mfe:3002` e `AUTH_URL: http://auth-mfe:3003` (199-202). As mesmas três variáveis voltam no `environment` (209-211). Publica a porta 3000 e depende de `catalog-mfe`, `builds-mfe` e `auth-mfe` (214-217).

**Interpretação:** A configuração de execução do host dá os endereços pelos quais o shell resolve as três zonas.

### 2. shell/next.config.ts:3-31

**Observação:** `output: "standalone"`. `async rewrites()` lê `CATALOG_URL`, `BUILDS_URL` e `AUTH_URL`, com padrões `http://localhost:3001` a `3003`, e devolve nove regras: `/catalog`, `/catalog/:path+` e `/catalog-static/_next/:path+` para `${catalog}`, e o mesmo para `builds` e `auth`.

**Interpretação:** A configuração do host declara as três zonas como destinos de caminhos sob a sua origem, incluindo os assets de cada uma.

**Nota:** Os `next.config.ts` das zonas, citados nas mesmas tabelas, só declaram `output: "standalone"` e `assetPrefix` (ex.: auth-mfe/next.config.ts:3-7). O `assetPrefix` é o caminho em que a zona publica os assets, ou seja, deploy (dimensão 6), e está nas observações #22 a #24. Os `ARG`/`ENV` de shell/Dockerfile:8-13 só declaram os nomes das variáveis, sem endereço. Nenhum desses blocos virou observação de configuração.

### 3. users-service/src/identity/api/openapi.ts:188

**Observação:** `<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js">` no HTML da Swagger UI que o `users-service` serve em `/swagger`.

**Interpretação:** Um serviço backend carrega uma biblioteca de CDN, sem mecanismo de MFE.

### 4. shell/next.config.ts:6

**Observação:** `async rewrites()` liga `/catalog`, `/builds` e `/auth`, as subrotas e os assets `/<zona>-static/_next/:path+` a `CATALOG_URL`, `BUILDS_URL` e `AUTH_URL` (6-30).

**Interpretação:** O roteamento do host declara para qual zona vai cada caminho.

**Nota:** É a linha manual da 3.4.4, que fica dentro do bloco de configuração de #2. Ela vira observação própria porque toda linha da 3.4.4 vira uma (passo 2). A força segue a orientação de uma rota que liga um caminho a outra unidade numa tabela de rotas.

### 5. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46

**Observação:** `setJwtCookie` grava o cookie `jwt` com `path=/`, `max-age` de um dia e `samesite=lax`. É chamada após o login e o registro.

**Interpretação:** O auth grava a sessão num cookie válido para toda a origem, o mecanismo de estado compartilhado. A leitura pelas outras zonas está nas relações #19 a #21.

### 6. .; package.json:1-6

**Observação:** A raiz tem só um `package.json` com `@biomejs/biome` em `devDependencies`, sem entrada nem build. O `docker-compose.yml` da raiz orquestra os serviços dos subdiretórios.

**Interpretação:** É raiz de coordenação, não uma unidade frontend.

### 7. auth-mfe; auth-mfe/package.json:7; auth-mfe/src/app/layout.tsx:28; auth-mfe/src/app/auth/page.tsx; auth-mfe/next.config.ts:3-7

**Observação:** Tem manifesto, layout raiz do App Router, rota `/auth` e build `next build` próprios, com saída `standalone` e `assetPrefix: "/auth-static"`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 8. builds-mfe; builds-mfe/package.json:7; builds-mfe/src/app/layout.tsx:28; builds-mfe/src/app/builds/page.tsx; builds-mfe/next.config.ts:3-7

**Observação:** Tem manifesto, layout raiz do App Router, rota `/builds` e build `next build` próprios, com saída `standalone` e `assetPrefix: "/builds-static"`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 9. builds-service; builds-service/package.json:6; builds-service/src/index.ts:15

**Observação:** `bun run src/index.ts` sobe um servidor Bun (`export default {`), com Dockerfile, workflow e serviço no compose próprios.

**Interpretação:** É um serviço backend, não uma unidade frontend.

### 10. catalog-mfe; catalog-mfe/package.json:7; catalog-mfe/src/app/layout.tsx:28; catalog-mfe/src/app/catalog/page.tsx; catalog-mfe/next.config.ts:3-7

**Observação:** Tem manifesto, layout raiz do App Router, rota `/catalog` e build `next build` próprios, com saída `standalone` e `assetPrefix: "/catalog-static"`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 11. mobile-bff; mobile-bff/package.json:6; mobile-bff/src/index.ts:19

**Observação:** `bun run src/index.ts` sobe um servidor HTTP (`app.listen(port)`), com Dockerfile, workflow e serviço no compose próprios.

**Interpretação:** É um backend-for-frontend, não uma unidade frontend.

### 12. parts-service; parts-service/package.json:6; parts-service/src/index.ts:9-12

**Observação:** `bun run src/index.ts` inicia um servidor gRPC e um `Bun.serve`, com Dockerfile, workflow e serviço no compose próprios.

**Interpretação:** É um serviço backend, não uma unidade frontend.

### 13. shell; shell/package.json:7; shell/src/app/layout.tsx:28; shell/src/app/page.tsx; shell/next.config.ts:3-31

**Observação:** Tem manifesto, layout raiz do App Router, rota `/` e build `next build` próprios, com saída `standalone` e `rewrites()` para as zonas.

**Interpretação:** É uma unidade frontend com limite próprio.

### 14. users-service; users-service/deno.json:4; users-service/src/index.ts:40

**Observação:** `deno run ... src/index.ts` sobe um servidor (`app.listen({ port })`). O `package.json` só declara drizzle.

**Interpretação:** É um serviço backend, não uma unidade frontend.

### 15. web-bff; web-bff/package.json:6; web-bff/src/index.ts:22

**Observação:** `bun run src/index.ts` sobe um servidor Bun (`export default {`), com Dockerfile, workflow e serviço no compose próprios.

**Interpretação:** É um backend-for-frontend, não uma unidade frontend.

### 16. shell/next.config.ts:6, 9, 23-28; docker-compose.yml:202, 211; auth-mfe/next.config.ts:6; auth-mfe/src/app/auth/page.tsx

**Observação:** O shell repassa `/auth`, `/auth/:path+` e `/auth-static/_next/:path+` para `AUTH_URL`. O compose dá a `AUTH_URL` o endereço `http://auth-mfe:3003`, do serviço construído de `./auth-mfe`. O prefixo `/auth-static` é o `assetPrefix` do auth-mfe, e a rota `/auth` existe nele.

**Interpretação:** É uma relação ativa em que o shell encaminha um caminho para a zona auth, que responde com a página inteira.

### 17. shell/next.config.ts:6, 8, 17-22; docker-compose.yml:201, 210; builds-mfe/next.config.ts:6; builds-mfe/src/app/builds/page.tsx

**Observação:** O shell repassa `/builds`, `/builds/:path+` e `/builds-static/_next/:path+` para `BUILDS_URL`, que o compose aponta para `http://builds-mfe:3002`. O prefixo `/builds-static` é o `assetPrefix` do builds-mfe, e a rota `/builds` existe nele.

**Interpretação:** É uma relação ativa em que o shell encaminha um caminho para a zona builds.

### 18. shell/next.config.ts:6, 7, 11-16; docker-compose.yml:200, 209; catalog-mfe/next.config.ts:6; catalog-mfe/src/app/catalog/page.tsx

**Observação:** O shell repassa `/catalog`, `/catalog/:path+` e `/catalog-static/_next/:path+` para `CATALOG_URL`, que o compose aponta para `http://catalog-mfe:3001`. O prefixo `/catalog-static` é o `assetPrefix` do catalog-mfe, e a rota `/catalog` existe nele.

**Interpretação:** É uma relação ativa em que o shell encaminha um caminho para a zona catalog.

### 19. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46; builds-mfe/src/components/Header.tsx:12; builds-mfe/src/app/builds/new/new-build-form.tsx:59-62

**Observação:** O auth-mfe grava o cookie `jwt` com `path=/` após o login e o registro. O builds-mfe lê o cookie no `Header` e antes de criar uma build, e manda para `/auth/login` quando não há sessão.

**Interpretação:** É uma relação ativa de estado compartilhado por cookie entre o auth e o builds, possível porque as zonas ficam sob a origem do shell.

### 20. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46; catalog-mfe/src/components/Header.tsx:12

**Observação:** O cookie `jwt` gravado pelo auth-mfe é lido no `Header` do catalog-mfe, que mostra o usuário e o botão de logout.

**Interpretação:** É uma relação ativa de estado compartilhado por cookie entre o auth e o catalog.

### 21. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46; shell/src/components/Header.tsx:12

**Observação:** O cookie `jwt` gravado pelo auth-mfe é lido no `Header` do shell.

**Interpretação:** É uma relação ativa de estado compartilhado por cookie entre o auth e o shell.

### 22. auth-mfe/package.json:7; auth-mfe/next.config.ts:5-6; auth-mfe/Dockerfile:10, 15-20; docker-compose.yml:157-158; .github/workflows/auth-mfe.yml:5-7, 15

**Observação:** `next build` gera um servidor `standalone`, com assets em `/auth-static`. O Dockerfile constrói uma imagem só dele, que o compose sobe como serviço `auth-mfe`, construído de `./auth-mfe`. Um workflow próprio, disparado por `auth-mfe/**`, instala, roda lint, build e testes, sem publicar nada.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 23. builds-mfe/package.json:7; builds-mfe/next.config.ts:5-6; builds-mfe/Dockerfile:10, 15-20; docker-compose.yml:183-184; .github/workflows/builds-mfe.yml:5-7, 15

**Observação:** `next build` gera um servidor `standalone`, com assets em `/builds-static`. O Dockerfile constrói uma imagem só dele, e o compose a sobe como serviço `builds-mfe`. O workflow próprio dispara por `builds-mfe/**`, sem publicar nada.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 24. catalog-mfe/package.json:7; catalog-mfe/next.config.ts:5-6; catalog-mfe/Dockerfile:10, 15-20; docker-compose.yml:170-171; .github/workflows/catalog-mfe.yml:5-7, 15

**Observação:** `next build` gera um servidor `standalone`, com assets em `/catalog-static`. O Dockerfile constrói uma imagem só dele, e o compose a sobe como serviço `catalog-mfe`. O workflow próprio dispara por `catalog-mfe/**`, sem publicar nada.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 25. shell/package.json:7; shell/next.config.ts:5-30; shell/Dockerfile:8-16, 21-26; docker-compose.yml:196-202; .github/workflows/shell.yml:5-7, 15

**Observação:** `next build` gera um servidor `standalone` com o `rewrites()`. O build no Dockerfile recebe os endereços das zonas como `ARG`, que o compose passa. A imagem é só do shell, servida na porta 3000. O workflow próprio dispara por `shell/**`, sem publicar nada.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. O artefato do shell não contém código das zonas, mas o roteamento que ele leva depende de onde elas estão.

### 26. .github/copilot-instructions.md:7, 13-18

**Observação:** "Architecture: 3 backend microservices + 1 Next.js frontend.", com um único diretório `frontend/` "consuming all three services".

**Interpretação:** O documento descreve um frontend único. O snapshot tem quatro unidades frontend e nenhum `frontend/`, o que contradiz a afirmação.

### 27. .github/copilot-instructions.md:138

**Observação:** "Do not create shared packages/libs between services — keep them fully independent".

**Interpretação:** Afirma a independência entre as partes sem biblioteca comum. Nas quatro apps, cada `layout.tsx` importa o próprio Header e Footer, e nenhuma importa código de outra, o que confirma a afirmação.

### 28. CLAUDE.md:11

**Observação:** "4-zone Next.js micro-frontend".

**Interpretação:** Afirma quatro unidades frontend, o que a estrutura confirma.

### 29. CLAUDE.md:25-30

**Observação:** Tabela das zonas: `shell` (3000, "landing + rewrites"), `catalog-mfe` (3001, `/catalog-static`, `/catalog/*`), `builds-mfe` (3002, `/builds-static`, `/builds/*`) e `auth-mfe` (3003, `/auth-static`, `/auth/*`).

**Interpretação:** Afirma que o shell encaminha um caminho para cada zona, o que as relações shell → zona confirmam.

### 30. CLAUDE.md:32

**Observação:** "All zones are independent Next.js 16 apps."

**Interpretação:** Afirma unidades independentes, o que a estrutura e o build e deploy por app confirmam.

### 31. CLAUDE.md:32

**Observação:** "Each uses shadcn/ui with the shared preset `b1t3ILnrM` for consistent design tokens."

**Interpretação:** Afirma um preset de design comum às zonas. Os quatro `components.json` têm a mesma configuração, mas em cópias separadas, e o identificador não aparece em nenhum artefato. A afirmação se confirma em parte.

### 32. CLAUDE.md:32

**Observação:** "Cross-zone navigation uses plain `<a>` tags (never `next/link`)."

**Interpretação:** Afirma navegação entre zonas por página inteira. Os quatro `Header.tsx` confirmam a afirmação.

### 33. CLAUDE.md:32

**Observação:** "Shared auth = `jwt` cookie on the shared origin; each zone has both server-side ... and client-side ... helpers."

**Interpretação:** Afirma a sessão compartilhada por cookie sob a mesma origem, o que as relações de sessão confirmam.

### 34. CLAUDE.md:32

**Observação:** "Every MFE fetches from `web-bff`".

**Interpretação:** Afirma que todas as zonas chamam o mesmo BFF. Catalog, builds e auth chamam `bffFetch`, mas o shell não, por isso a afirmação se confirma em parte.

### 35. CLAUDE.md:32

**Observação:** "the shared `src/lib/bff.ts`".

**Interpretação:** Afirma um módulo comum às zonas. Há quatro cópias separadas do arquivo, uma por app, o que contradiz a afirmação.

### 36. README.md:11

**Observação:** "Each zone is its own Next.js app, own Dockerfile, own CI pipeline."

**Interpretação:** Afirma app, imagem e CI próprios por zona, o que a estrutura e o build e deploy confirmam.

### 37. README.md:46

**Observação:** "`mobile-bff` ... not wired into the micro-frontend zones".

**Interpretação:** Afirma que um backend não está ligado às zonas. Nenhuma zona referencia o `mobile-bff`, o que confirma a afirmação.

### 38. README.md:69

**Observação:** "despite being deployed independently".

**Interpretação:** Afirma deploy independente das zonas, o que as observações de build e deploy confirmam.

### 39. shell/README.md:3, 28-29

**Observação:** "shared header/footer"; `Header.tsx` — "shared nav..."; `Footer.tsx` — "shared footer".

**Interpretação:** Afirma componentes comuns às zonas. Cada app importa o próprio `@/components/Header` e `@/components/Footer`, cópias idênticas em arquivos separados, o que contradiz a afirmação.

### 40. 7470aff 2026-03-21 (.github/copilot-instructions.md); 1695f25 2026-04-16 (CLAUDE.md); 28c49a9 2026-04-16 (frontend/, shell/, catalog-mfe/, builds-mfe/, auth-mfe/, CLAUDE.md, README.md)

**Observação:** `.github/copilot-instructions.md` não muda desde 7470aff. O `CLAUDE.md` é atualizado em 1695f25, que adiciona os BFFs, e em 28c49a9, que remove os 21 arquivos de `frontend/` e adiciona as quatro apps.

**Interpretação:** Os dois documentos são de estágios diferentes do projeto, e só um foi atualizado quando o frontend único virou quatro zonas. O ponto está esclarecido.

### 41. 28c49a9 2026-04-16 (CLAUDE.md, shell/README.md, <app>/src/components/Header.tsx, <app>/src/components/Footer.tsx, <app>/src/lib/bff.ts, <app>/components.json); 999c879 2026-04-16 (shell/tests/header.test.tsx); 842a007 2026-05-07

**Observação:** 28c49a9 cria as quatro apps, cada uma já com o próprio Header, Footer, `bff.ts` e `components.json`, e a redação "shared" de `CLAUDE.md:32` e `shell/README.md:3, 28-29` no mesmo commit. Os commits seguintes não tocam esses arquivos.

**Interpretação:** O texto "shared" e as cópias nasceram juntos. Não há extração nem cópia posterior. O ponto está esclarecido.

### 42. 28c49a9 2026-04-16 (shell/src/lib/bff.ts); 999c879 2026-04-16 (shell/tests/header.test.tsx); 842a007 2026-05-07

**Observação:** `shell/src/lib/bff.ts` é criado com o shell em 28c49a9. Depois, só 999c879 toca `shell/`, e apenas um teste. O commit do snapshot não toca `shell/`.

**Interpretação:** O shell nunca chamou o `web-bff`: o arquivo está sem uso desde a criação, e não é uma chamada removida. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (., Deploy); 3.4.3 (shell, Deploy); 3.4.4 (shell/next.config.ts:6, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1, #2, #3, #4 (Onde é servida); 3.4.6 #4 (Artefatos); 3.4.7 #4 (Evidência) | 2 configuração | deploy | other | arquitetural | forte | configura #13; configura #16; configura #17; configura #18 |
| 2 | 3.4.3 (shell, Marcadores); 3.4.3 (shell, Build); 3.4.4 (shell/next.config.ts:6, Observação); 3.4.5 #1, #2, #3 (Configuração, Código); 3.4.6 #1, #2, #3 (Onde é servida); 3.4.6 #4 (Artefatos); 3.4.7 #4 (Evidência) | 2 configuração | configuração | other | arquitetural | forte | configura #13; configura #16; configura #17; configura #18 |
| 3 | 3.4.4 (users-service/src/identity/api/openapi.ts:188) | 3 código | código-fonte | — | contexto | fraca | — |
| 4 | 3.4.4 (shell/next.config.ts:6) | 3 código | configuração | other | arquitetural | forte | implementa #16; implementa #17; implementa #18 |
| 5 | 3.4.4 (auth-mfe/src/lib/auth-client.ts:20) | 3 código | código-fonte | other | tecnológica | moderada | implementa #19; implementa #20; implementa #21 |
| 6 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 7 | 3.4.3 (auth-mfe) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 8 | 3.4.3 (builds-mfe) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 9 | 3.4.3 (builds-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 10 | 3.4.3 (catalog-mfe) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.3 (mobile-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 12 | 3.4.3 (parts-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 13 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (users-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 15 | 3.4.3 (web-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.5 #1 | 5 composição | configuração | other | arquitetural | forte | liga #13; liga #7 |
| 17 | 3.4.5 #2 | 5 composição | configuração | other | arquitetural | forte | liga #13; liga #8 |
| 18 | 3.4.5 #3 | 5 composição | configuração | other | arquitetural | forte | liga #13; liga #10 |
| 19 | 3.4.5 #4 | 5 composição | código-fonte | other | arquitetural | forte | liga #7; liga #8 |
| 20 | 3.4.5 #5 | 5 composição | código-fonte | other | arquitetural | forte | liga #7; liga #10 |
| 21 | 3.4.5 #6 | 5 composição | código-fonte | other | arquitetural | forte | liga #7; liga #13 |
| 22 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #7 |
| 23 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #8 |
| 24 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #10 |
| 25 | 3.4.6 #4 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #13 |
| 26 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #7; contradiz #8; contradiz #10; contradiz #13 |
| 27 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora shell/src/app/layout.tsx:3-4; corrobora catalog-mfe/src/app/layout.tsx:3-4; corrobora builds-mfe/src/app/layout.tsx:3-4; corrobora auth-mfe/src/app/layout.tsx:3-4 |
| 28 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #10; corrobora #13 |
| 29 | 3.4.7 #4 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18 |
| 30 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #10; corrobora #13; corrobora #22; corrobora #23; corrobora #24; corrobora #25 |
| 31 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte shell/components.json:3; corrobora em parte catalog-mfe/components.json:3; corrobora em parte builds-mfe/components.json:3; corrobora em parte auth-mfe/components.json:3 |
| 32 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora shell/src/components/Header.tsx:28-56; corrobora catalog-mfe/src/components/Header.tsx:28-56; corrobora builds-mfe/src/components/Header.tsx:28-56; corrobora auth-mfe/src/components/Header.tsx:28-56 |
| 33 | 3.4.7 #8 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #21 |
| 34 | 3.4.7 #9 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte catalog-mfe/src/app/catalog/page.tsx:38; corrobora em parte builds-mfe/src/app/builds/page.tsx:29; corrobora em parte auth-mfe/src/app/auth/me/page.tsx:34 |
| 35 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz shell/src/lib/bff.ts; contradiz catalog-mfe/src/lib/bff.ts; contradiz builds-mfe/src/lib/bff.ts; contradiz auth-mfe/src/lib/bff.ts |
| 36 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #10; corrobora #13; corrobora #22; corrobora #23; corrobora #24; corrobora #25 |
| 37 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | corrobora docker-compose.yml:129-130 |
| 38 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #23; corrobora #24; corrobora #25 |
| 39 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | contradiz shell/src/app/layout.tsx:3-4; contradiz catalog-mfe/src/app/layout.tsx:3-4; contradiz builds-mfe/src/app/layout.tsx:3-4; contradiz auth-mfe/src/app/layout.tsx:3-4 |
| 40 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #26 |
| 41 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #31; explica #35; explica #39 |
| 42 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #34 |

## Resumo

Observações: 42. Dimensões (tecnologia: 0, configuração: 2, código: 3, estrutura: 10, composição: 6, build-deploy: 4, documentação: 14, histórico: 3). Força (forte: 9, moderada: 9, fraca: 24, ambígua: 0). Evidência (tecnológica: 1, arquitetural: 31, contexto: 10).
