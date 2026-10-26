---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Leitura do repositório

O repositório tem documentação em inglês, em dois arquivos de instrução para agentes de código
(`.github/copilot-instructions.md` e `CLAUDE.md`), um `README.md` curto por aplicação e um `README.md`
na raiz. O `artifacts.csv` não marca `.github/copilot-instructions.md` com o tipo `documentation` (a
coluna `artifact_types` vem vazia), mas o arquivo é prosa sobre o projeto como um todo, por isso foi
lido inteiro e entra na tabela como as demais. Ele descreve uma arquitetura mais antiga que a do
snapshot atual: "3 backend microservices + 1 Next.js frontend" (.github/copilot-instructions.md:7),
com um único diretório `frontend/` (:13-18, :83-88, :93, :118-119) — nenhum `frontend/` existe no
snapshot, que tem `shell/`, `catalog-mfe/`, `builds-mfe/` e `auth-mfe/`. `CLAUDE.md` é o texto mais
denso e atualizado: descreve a arquitetura completa — 3 microsserviços, 2 BFFs e um "4-zone Next.js
micro-frontend" (CLAUDE.md:11) —, lista as quatro zonas com porta e `assetPrefix` (CLAUDE.md:25-30), e contém
um parágrafo (CLAUDE.md:32) que concentra várias afirmações sobre as zonas: independência, preset de
design compartilhado, navegação só por `<a>`, sessão por cookie JWT e uso comum do `web-bff`. O
`README.md` da raiz repete a mesma leitura em prosa e com um diagrama ASCII (README.md:11, 13-44,
60-69), acrescenta que `mobile-bff` não está ligado às zonas (README.md:46) e que as zonas são
"deployed independently" (README.md:69), e fecha com uma árvore de pastas comentada (README.md:93-108).
Os quatro `README.md` de `auth-mfe/`, `builds-mfe/`, `catalog-mfe/` e `shell/` são textos curtos, cada
um descrevendo a própria zona; a maior parte repete o que `CLAUDE.md`/`README.md` já afirmam (rota que
possui, dependência do cookie JWT, chamada ao `web-bff`), com mais detalhe por zona, exceto o
`shell/README.md`, que acrescenta uma afirmação própria sobre "shared header/footer" (shell/README.md:3,
28-29). Os `README.md` de `builds-service/`, `mobile-bff/`, `parts-service/`, `users-service/` e
`web-bff/` foram lidos inteiros; descrevem cada serviço isoladamente (framework, endpoints, variáveis
de ambiente) e suas chamadas a outros backends, sem nenhuma afirmação sobre as unidades frontend como
conjunto — não entraram na tabela.

Ocorrências `doc-*` que não viraram linha, por serem título, menção solta ou detalhe de infraestrutura
sem afirmação arquitetural: CLAUDE.md:23 e README.md:60 (título "Micro-frontends (Next.js Multi-Zones)");
CLAUDE.md:72, README.md:75-81 e .github/copilot-instructions.md:27,30 (tabelas de tech stack,
runtime/framework, não composição); README.md:24-25 (diagrama ASCII, repete a mesma composição
shell→zonas→web-bff já afirmada em CLAUDE.md:25-30, sem acrescentar propriedade nova); README.md:103-105
(comentários da árvore de pastas que só descrevem a função de negócio de cada zona: "browse
components", "manage builds", "register / login / profile"); README.md:106 (comentário "all MFE
zones" no `docker-compose.yml`, já coberto pela revisão de build e deploy); auth-mfe/README.md:1,
builds-mfe/README.md:1 e catalog-mfe/README.md:1 (títulos "# auth-mfe" etc.). Em CLAUDE.md:11, a frase
"**BFFs and MFEs have no database** — they compose upstream calls" não virou linha: é um detalhe
interno de cada unidade (ausência de banco), não uma relação entre as unidades frontend. As seções
"Inter-Service Communication" (CLAUDE.md:59-66), "BFFs (Backends-for-Frontends)" (CLAUDE.md:34-45) e as
seções equivalentes de `.github/copilot-instructions.md` ("Key rules", "Service Responsibilities",
"Database") descrevem só relações entre backends e BFFs, ou regras internas de uma unidade, e não
mencionam as zonas de frontend.

Não há comentário com conteúdo arquitetural nos artefatos de configuração ou código citados pelas
revisões anteriores (`next.config.ts`, `docker-compose.yml`, `Header.tsx`, `auth-client.ts`); são
arquivos sem comentários explicativos.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .github/copilot-instructions.md:7,13-18 | "Architecture: 3 backend microservices + 1 Next.js frontend." / "frontend/ # Next.js UI consuming all three services" | estrutura | contradita | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell = `Yes`, quatro unidades frontend; nenhum diretório `frontend/` no snapshot); inputs da classificação (`frontend_units: 4`) |
| 2 | .github/copilot-instructions.md:138 | "Do not create shared packages/libs between services — keep them fully independent" | independência | corroborada | 3.4.4 (Header.tsx, Footer.tsx e src/lib/{auth,auth-client,bff,jwt}.ts duplicados em cada app; nenhuma app importa código-fonte de outra); CLAUDE.md:117 (mesma regra, "fully independent") |
| 3 | CLAUDE.md:11 | "4-zone Next.js micro-frontend" | estrutura | corroborada | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell = `Yes`, quatro unidades frontend); CLAUDE.md:25-30 |
| 4 | CLAUDE.md:25-30 | "`shell` ... landing + rewrites"; "`catalog-mfe` ... `/catalog-static` ... `/catalog/*`" (e as linhas equivalentes de `builds-mfe` e `auth-mfe`) | composição | corroborada | 3.4.4 (shell/next.config.ts:6, host-relationship); 3.4.5 #1-#3; shell/next.config.ts:6-30; docker-compose.yml:209-211; README.md:17-20,62-69; auth-mfe/README.md:3; builds-mfe/README.md:3; catalog-mfe/README.md:3; shell/README.md:3,19-21 |
| 5 | CLAUDE.md:32 | "All zones are independent Next.js 16 apps." | independência | corroborada | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell: manifesto, entrada e build próprios); 3.4.6 #1-#4 (CI própria por app, sem orquestração conjunta) |
| 6 | CLAUDE.md:32 | "Each uses shadcn/ui with the shared preset `b1t3ILnrM` for consistent design tokens." | composição | parcial | shell/components.json:3 (`"style": "radix-lyra"`); catalog-mfe/components.json:3; builds-mfe/components.json:3; auth-mfe/components.json:3 (mesmo `style`, `baseColor`, `aliases` nas quatro); README.md:69 ("so they look like one app") |
| 7 | CLAUDE.md:32 | "Cross-zone navigation uses plain `<a>` tags (never `next/link`)." | composição | corroborada | 3.4.4 (busca por `import(`, `React.lazy`, `loadRemote*` etc. sem resultado nas quatro apps); shell/src/components/Header.tsx:28-56; catalog-mfe/src/components/Header.tsx:28-56; builds-mfe/src/components/Header.tsx:28-56; auth-mfe/src/components/Header.tsx:28-56 |
| 8 | CLAUDE.md:32 | "Shared auth = `jwt` cookie on the shared origin; each zone has both server-side ... and client-side ... helpers." | composição | corroborada | 3.4.4 (auth-mfe/src/lib/auth-client.ts:20); 3.4.5 #4-#6; auth-mfe/README.md:3; builds-mfe/README.md:3; shell/README.md:30 |
| 9 | CLAUDE.md:32 | "Every MFE fetches from `web-bff`" | composição | parcial | catalog-mfe/src/app/catalog/page.tsx:8,38; builds-mfe/src/app/builds/page.tsx:9,29; auth-mfe/src/app/auth/me/page.tsx:10,34; catalog-mfe/README.md:3; shell/src/lib/bff.ts (presente, sem chamada `bffFetch`/`bffUrl` em `shell/src`) |
| 10 | CLAUDE.md:32 | "the shared `src/lib/bff.ts`" | composição | contradita | shell/src/lib/bff.ts; catalog-mfe/src/lib/bff.ts; builds-mfe/src/lib/bff.ts; auth-mfe/src/lib/bff.ts |
| 11 | README.md:11 | "Each zone is its own Next.js app, own Dockerfile, own CI pipeline." | build-deploy | corroborada | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell com Dockerfile e manifesto próprios); 3.4.6 #1-#4 (build e deploy separados, CI própria por app sem deploy) |
| 12 | README.md:46 | "`mobile-bff` ... not wired into the micro-frontend zones" | composição | corroborada | busca por "mobile" e pela porta 4005 sem resultado em shell/src, catalog-mfe/src, builds-mfe/src e auth-mfe/src; docker-compose.yml:129-130 (`mobile-bff` sem variável de ambiente lida por nenhuma zona) |
| 13 | README.md:69 | "despite being deployed independently" | build-deploy | corroborada | 3.4.6 #1-#4 (build e deploy sempre `separado` por app, sem artefato de release ou implantação conjunta) |
| 14 | shell/README.md:3,28-29 | "shared header/footer" / "[Header.tsx] — shared nav..." / "[Footer.tsx] — shared footer" | composição | contradita | shell/src/app/layout.tsx:3-4; catalog-mfe/src/app/layout.tsx:3-4; builds-mfe/src/app/layout.tsx:3-4; auth-mfe/src/app/layout.tsx:3-4 (cada zona importa `@/components/Header` e `@/components/Footer` local); shell/src/components/{Header,Footer}.tsx idênticos byte a byte aos de catalog-mfe, builds-mfe e auth-mfe, mas em arquivos separados |

## Observações

**1. .github/copilot-instructions.md:7,13-18.** Este documento descreve um estágio anterior do
projeto: um único `frontend/` consumindo os três serviços de backend, sem BFFs e sem zonas. O
snapshot atual não tem diretório `frontend/`; tem quatro apps Next.js (`shell`, `catalog-mfe`,
`builds-mfe`, `auth-mfe`), confirmadas pela revisão estrutural e pela classificação (`frontend_units:
4`). A mesma suposição de um único `frontend/` se repete em `.github/copilot-instructions.md:83-88`
("### frontend — Next.js App Router"), `:93` ("`biome.json` in `frontend/`") e `:118-119` ("cd
frontend && bun run dev"). A afirmação é `contradita`: o artefato mostra o contrário do que o
documento descreve.

**2. .github/copilot-instructions.md:138.** A regra vale tanto para os serviços de backend quanto
para as zonas de frontend: a revisão de fonte encontrou `Header.tsx`, `Footer.tsx` e
`src/lib/{auth,auth-client,bff,jwt}.ts` copiados em cada uma das quatro apps, sem nenhuma app
importando código-fonte de outra — "fully independent" por duplicação, não por biblioteca comum. A
mesma regra, com redação quase idêntica, aparece de novo em `CLAUDE.md:117` ("Do not create shared
packages/libs between services — fully independent").

**3. CLAUDE.md:11.** A contagem de "4-zone" confere com a revisão estrutural: `shell`, `catalog-mfe`,
`builds-mfe` e `auth-mfe` são as quatro unidades frontend do snapshot. A mesma contagem aparece de
novo na tabela de CLAUDE.md:25-30 e na tabela equivalente de README.md:60-67.

**4. CLAUDE.md:25-30.** A tabela nomeia as quatro zonas, a porta e o `assetPrefix` de cada uma, e a
coluna "Owns" repete a relação de roteamento que a revisão de fonte e a de composição já
encontraram no `shell/next.config.ts`: o `shell` reescreve `/catalog`, `/builds` e `/auth` para
`catalog-mfe`, `builds-mfe` e `auth-mfe`, cada uma respondendo sob o próprio `assetPrefix`. A mesma
informação se repete, com mais detalhe por zona, em README.md:17-20 e 62-69, no diagrama ASCII de
README.md:13-44, e nos quatro `README.md` de zona ("owns `/auth/...`", "owns `/builds/...`", "owns
`/catalog/...`", "forwards path-prefixed requests to the other zones via `rewrites`").

**5. CLAUDE.md:32.** "Independent" é a mesma conclusão da revisão estrutural (cada app com
`package.json`, build e entrada próprios) e da revisão de build e deploy (CI própria por app, sem
artefato de orquestração conjunta de release). Esta afirmação não cita deploy; a afirmação de deploy
("deployed independently", README.md:69) é tratada em linha própria (#13), por ser outra propriedade.

**6. CLAUDE.md:32.** O identificador `b1t3ILnrM` não aparece em nenhum artefato do snapshot — nem
em `components.json`, nem em `tailwind.config`, nem no código-fonte — só no texto de CLAUDE.md e
README.md. A parte verificável, "consistent design tokens", se confirma: os quatro `components.json`
têm o mesmo `style` (`radix-lyra`), a mesma `baseColor` e os mesmos `aliases`, e cada zona tem seu
próprio `globals.css`. Mas a palavra "shared" não se sustenta: não há um preset compartilhado como
arquivo ou pacote comum — cada zona tem sua própria cópia idêntica da configuração, no mesmo padrão
de duplicação que a revisão de fonte já registrou para `Header.tsx`/`Footer.tsx`. A afirmação é
`parcial`: os tokens são de fato consistentes entre as quatro zonas, mas por configuração duplicada,
não por um preset compartilhado identificável.

**7. CLAUDE.md:32.** Confirma o que a revisão de fonte já encontrou: links de página inteira
(`<a href="/catalog">` etc.) nos quatro `Header.tsx`, idênticos entre si, e nenhuma ocorrência de
`import('next/link')` ou `<Link>` no código das quatro apps — a única menção a "next/link" no
snapshot é o nome de um teste em `shell/tests/header.test.tsx:49` ("exposes cross-zone nav links as
`<a>` (not next/link)"), que descreve o próprio comportamento testado.

**8. CLAUDE.md:32.** Mesmo mecanismo que as revisões de fonte e de composição encontraram: o
`auth-mfe` grava o cookie `jwt` (`path=/`) depois do login/registro, e `shell`, `catalog-mfe` e
`builds-mfe` o leem em seus próprios `Header.tsx` (`readJwtFromDocument`). Os `README.md` de
`auth-mfe` e `builds-mfe` repetem a dependência ("every other zone reads that cookie"; "Create +
delete require a JWT cookie (set by auth-mfe)"), e o `README.md` do `shell` lista os helpers de
cookie em `src/lib/auth.ts`/`auth-client.ts`.

**9. CLAUDE.md:32.** `catalog-mfe`, `builds-mfe` e `auth-mfe` de fato importam `bffFetch`/`bffUrl` de
`src/lib/bff.ts` e chamam `web-bff` (ex.: catalog-mfe/src/app/catalog/page.tsx:38, builds-mfe/src/app/
builds/page.tsx:29, auth-mfe/src/app/auth/me/page.tsx:34); `catalog-mfe/README.md:3` confirma
("Fetches from web-bff"). O `shell` tem o mesmo arquivo `src/lib/bff.ts`, mas nenhuma chamada a
`bffFetch` ou `bffUrl` aparece em `shell/src` — a afirmação "every MFE" não se sustenta para o
`shell`, por isso é `parcial`.

**10. CLAUDE.md:32.** Os quatro `src/lib/bff.ts` (`shell`, `catalog-mfe`, `builds-mfe`, `auth-mfe`)
são idênticos byte a byte na lógica (mesmas constantes, mesma `bffUrl`, mesma `bffFetch`), mas são
quatro arquivos separados, cada um dentro do seu próprio app — o mesmo padrão de duplicação que a
revisão de fonte registrou para `Header.tsx`/`Footer.tsx`/`auth-client.ts`. Não há um módulo ou
pacote comum importado pelas quatro zonas; "shared" está contradito pelo artefato.

**11. README.md:11.** Confirma o que a revisão estrutural e a de build e deploy já mostraram: cada
uma das quatro apps tem seu próprio `Dockerfile` (ex.: auth-mfe/Dockerfile:10) e seu próprio workflow
de CI disparado por `paths` (ex.: .github/workflows/auth-mfe.yml:5-7), sem deploy automatizado em
nenhum deles.

**12. README.md:46.** Nenhum artefato do snapshot liga o `mobile-bff` às zonas de micro-frontend: o
serviço existe no `docker-compose.yml:129-130`, mas nenhuma variável de ambiente do `shell` ou das
zonas o referencia, e nenhum arquivo de `shell/src`, `catalog-mfe/src`, `builds-mfe/src` ou
`auth-mfe/src` menciona `mobile-bff` ou a porta `4005`. A afirmação do README se confirma.

**13. README.md:69.** O deploy separado de cada zona é exatamente o que a revisão de build e deploy
registrou: build, imagem e CI próprios por app, sem artefato de release ou implantação conjunta
(3.4.6 #1-#4). Esta é uma propriedade distinta de "independent apps" (#5): aqui o documento se refere
explicitamente ao deploy, por isso fica em linha e tema próprios (build-deploy), como no passo 3 da
INSTRUCTIONS.md.

**14. shell/README.md:3,28-29.** O `shell/README.md` chama `Header.tsx` e `Footer.tsx` de "shared"
duas vezes. No snapshot, cada uma das quatro apps importa seu próprio `@/components/Header` e
`@/components/Footer` (shell/src/app/layout.tsx:3-4; catalog-mfe/src/app/layout.tsx:3-4;
builds-mfe/src/app/layout.tsx:3-4; auth-mfe/src/app/layout.tsx:3-4) — os quatro arquivos são
idênticos byte a byte entre si, mas não há um componente ou pacote comum importado por mais de uma
unidade: é duplicação, não compartilhamento. A afirmação é `contradita`, no mesmo padrão já visto em
`src/lib/bff.ts` (#10) e no preset de design (#6).

## Resumo

Afirmações: 14 (corroborada: 9, parcial: 2, contradita: 3, sem corroboração: 0). Temas: (estrutura: 2, composição: 8, build-deploy: 2, independência: 2).
