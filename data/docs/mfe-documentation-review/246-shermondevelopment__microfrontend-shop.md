---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Leitura do repositório

A documentação tem dois arquivos `documentation` no `artifacts.csv`: README.md, em português, e CHANGELOG.md, em inglês. O README apresenta o projeto, "Microfrontend Challenge" (README.md:1), como e-commerce em micro frontends com Module Federation para Vite e React. Ele traz a árvore de pastas comentada (README.md:12-29), uma tabela com o papel, a porta e o módulo exposto de cada app (README.md:33-38), instruções de instalação, desenvolvimento, build, preview, testes e lint (README.md:42-139), uma seção de deploy com os endereços CloudFront de cada app (README.md:142-162) e a lista de tecnologias (README.md:165-174). O que ele diz confere com as revisões anteriores: um shell `apps/host` e três remotes (`apps/header`, `apps/footer`, `apps/products`) num workspace npm, ligados por `@module-federation/vite`, com bibliotecas comuns em `packages/`, o carrinho num store Zustand compartilhado e deploy de cada app num bucket S3 com distribuição CloudFront própria. Nenhuma afirmação é desmentida. Só os endereços publicados não têm artefato, porque as URLs dos remotes e os buckets vêm de variáveis e secrets do repositório (.github/workflows/ci-cd.yml:102-104, :131-132).

Ficaram fora da tabela, sem afirmação arquitetural: a raiz da árvore, `microfrontend-challange/` (README.md:13), que é o `name` do package.json da raiz (package.json:2); as portas 3000-3003 (README.md:15-18, :33-38, :68-71), detalhe de infraestrutura que confere com as configs (ex.: apps/host/vite.config.ts:68-69); a coluna "Descrição" da tabela (README.md:36-38), que descreve o conteúdo de cada app; os comandos `npm run dev:all` (README.md:62) e `npm run preview:all` (README.md:102), instruções de execução que conferem com package.json:17 e :29; a seção de testes (README.md:116-131), que só tem `test:header` e `test:products`, como package.json:33-34; e as tecnologias React, TypeScript, TailwindCSS, TanStack Query, Axios e Vitest (README.md:168-170, :172-174), internas a cada unidade. A árvore não lista `packages/config/eslint-config`, que existe no snapshot (packages/config/eslint-config/package.json:2); é omissão, não afirmação.

O CHANGELOG.md é gerado pelo `semantic-release` (.releaserc.json:13-15, :22) e registra as versões 1.1.0 e 1.0.0 do repositório inteiro (CHANGELOG.md:1, :13). Seus itens são títulos de commits, relato da história e não descrição do snapshot, por isso não viram linha. Os que nomeiam a arquitetura, "add footer microfrontend with Vite and React configuration" (CHANGELOG.md:36), "add module federation support for header app" (CHANGELOG.md:39) e "add RemoteErrorBoundary component for error handling in remote modules" (CHANGELOG.md:43), são compatíveis com o snapshot (apps/footer/vite.config.ts:13-19; apps/header/vite.config.ts:13-19; apps/host/src/App.tsx:12-30).

Ocorrências `doc-*` que não viraram linha: README.md:1 (título); README.md:13 (raiz da árvore); README.md:142 (título da seção de deploy); todas as 33 do CHANGELOG.md (CHANGELOG.md:1, :6, :11, :18-26, :31-50), das quais as `doc-mfe-term` das linhas 6 a 50 casaram só com o nome do repositório nas URLs dos commits, e a `doc-integration-technology` de CHANGELOG.md:39 é o título de commit citado acima. As demais estão nas linhas da tabela: README.md:3 (#3), :15 (#4), :16-18 (#4), :35 (#4), :74 (#9), :144 (#12), :153 (#4), :171 (#14).

Comentários e campos lidos: os `package.json` da raiz, dos quatro apps e dos cinco pacotes (nenhum tem `description`); os quatro `vite.config.ts` (o único comentário é o link da documentação do Vite, apps/host/vite.config.ts:8); apps/host/src/App.tsx, apps/host/src/main.tsx e apps/host/src/components/RemoteErrorBoundary.tsx (sem comentários); packages/shared/src/index.ts e packages/shared/src/state/cart-store.ts; scripts/ci/affected-workspaces.mjs (sem comentários); .releaserc.json; e .github/workflows/ci-cd.yml, cujos nomes de job e descrições de entrada foram lidos. Viraram linha a descrição da entrada `app` do rollback (#1) e o nome do job `deploy` (#2). Ficaram na leitura: o nome do workflow, `ci-cd` (.github/workflows/ci-cd.yml:1); os nomes dos jobs "Detect affected workspaces" (:31) e "Test changed apps" (:63), etapas do mesmo encadeamento da linha #2; e a descrição "Git ref for rollback (tag, branch, or commit SHA)" (:21), detalhe da entrada do rollback.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .github/workflows/ci-cd.yml:12 | "App to rollback" (o rollback é feito por app: header, footer, products ou host) | build-deploy | corroborada | 3.4.6 #1-#4 (rollback próprio); .github/workflows/ci-cd.yml:9-27, 181-248 |
| 2 | .github/workflows/ci-cd.yml:86 | "Deploy changed apps to CloudFront" | build-deploy | corroborada | 3.4.6 #1-#4; .github/workflows/ci-cd.yml:96-99, 116-117, 125-152; scripts/ci/affected-workspaces.mjs:37-46 |
| 3 | README.md:3 | "Aplicação de e-commerce construída com arquitetura de microfrontends usando **Module Federation** (Vite)" | estrutura | corroborada | 3.4.3 (apps/footer, apps/header, apps/host e apps/products `Yes`); 3.4.2 (`@module-federation/vite` configurado); 3.4.5 #1-#3 |
| 4 | README.md:15-18 | "host/ # App principal — orquestra os remotes", "header/ # Microfrontend do cabeçalho", "footer/ # Microfrontend do rodapé", "products/ # Microfrontend da listagem de produtos" | estrutura | corroborada | 3.4.3 (apps/host, apps/header, apps/footer e apps/products `Yes`); 3.4.5 #1-#3 |
| 5 | README.md:21-25 | "shared/ # Estado global (Zustand), API client, React Query config", "types/ # Tipos TypeScript compartilhados", "ui/ # Componentes UI reutilizáveis", "tailwind-config/ # Config base do Tailwind compartilhada" | estrutura | corroborada | 3.4.3 (packages/shared, packages/types, packages/ui e packages/config/tailwind-config `No`, bibliotecas); apps/host/src/main.tsx:4; apps/products/src/api.ts:1-2; apps/header/src/service/api.ts:1-2; apps/host/src/App.tsx:2; apps/header/src/Header.tsx:5; apps/products/src/ProductsList.tsx:5; apps/host/tailwind.config.ts:2; apps/header/tailwind.config.ts:2; apps/footer/tailwind.config.ts:2; apps/products/tailwind.config.ts:2 |
| 6 | README.md:27 | "package.json # Scripts e dependências raiz (npm workspaces)" | estrutura | corroborada | 3.4.3 (workspace); package.json:4-8 |
| 7 | README.md:33-38 | "Expõe": "—" (host), "`header/Header`", "`footer/Footer`", "`products/ProductsList`" | composição | corroborada | 3.4.5 #1-#3; apps/header/vite.config.ts:17-18; apps/footer/vite.config.ts:17-18; apps/products/vite.config.ts:17-18; apps/host/vite.config.ts:22-65; apps/host/src/App.tsx:5-7 |
| 8 | README.md:65-70 | "Ou individualmente: npm run dev:header … npm run dev:footer … npm run dev:products" (cada remote roda sozinho) | independência | corroborada | package.json:14-16; apps/header/index.html:10; apps/footer/index.html:10; apps/products/index.html:10; apps/header/src/main.tsx:5; apps/footer/src/main.tsx:5; apps/products/src/main.tsx:5 |
| 9 | README.md:71 | "npm run dev:host # http://localhost:3000 (depende dos outros)" | independência | corroborada | 3.4.5 #1-#3; apps/host/vite.config.ts:12-15; apps/host/src/App.tsx:5-7, 12-30; apps/host/src/components/RemoteErrorBoundary.tsx:33-46 |
| 10 | README.md:80 | "Build completo (todos os apps em sequência)" | build-deploy | corroborada | package.json:18 |
| 11 | README.md:86-95 | "Ou por app: npm run build:header …" / "Os artefatos são gerados em `dist/<app>`." | build-deploy | corroborada | 3.4.6 #1-#4 (build `separado`); package.json:19-22; apps/header/vite.config.ts:65; apps/footer/vite.config.ts:49; apps/products/vite.config.ts:65; apps/host/vite.config.ts:92 |
| 12 | README.md:144 | "A aplicação está distribuída em múltiplos microfrontends, cada um hospedado de forma independente via **AWS S3 + CloudFront**." | build-deploy | corroborada | 3.4.6 #1-#4 (deploy `separado`); .github/workflows/ci-cd.yml:125-152 |
| 13 | README.md:148-162 | "Host (App principal) https://d6kooi9qoycog.cloudfront.net", "Header https://do4w2f9yum2t1.cloudfront.net", "Products https://dpprlnwt0shjp.cloudfront.net", "Footer https://d1h65an7ioo3f5.cloudfront.net" (endereços publicados de cada app) | build-deploy | sem corroboração | — |
| 14 | README.md:171 | "Zustand — estado do carrinho compartilhado entre microfrontends" | composição | corroborada | 3.4.4 (manual packages/shared/src/state/cart-store.ts:12); 3.4.5 #4; apps/products/src/components/Product.tsx:1; apps/header/src/Header.tsx:4 |

## Observações

**1. .github/workflows/ci-cd.yml:12.** A descrição da entrada `app` do disparo manual diz que o rollback se escolhe por app, e as opções são os quatro apps (.github/workflows/ci-cd.yml:9-19). O job `rollback` faz checkout do ref dado (:200-202), constrói só o app escolhido pelo seu workspace (:212-213) e o publica no bucket e na distribuição desse app (:221-248). O nome do job, "Manual Rollback to CloudFront" (:182), repete a afirmação. A revisão de build e deploy registrou o rollback próprio de cada app.

**2. .github/workflows/ci-cd.yml:86.** O job `deploy` roda em matriz sobre os apps afetados (.github/workflows/ci-cd.yml:96-99), que scripts/ci/affected-workspaces.mjs calcula pelo diff (scripts/ci/affected-workspaces.mjs:37-41). Cada app é construído pelo seu workspace (.github/workflows/ci-cd.yml:116-117) e sincronizado no seu bucket S3, com invalidação da sua distribuição CloudFront (:125-152). "Changed" tem um limite: mudança em `packages/*`, `package.json`, `tsconfig.json` ou `.github/` marca os quatro apps de uma vez (scripts/ci/affected-workspaces.mjs:4-13, :43-44).

**3. README.md:3.** São quatro aplicações React/Vite no workspace, unidas por `@module-federation/vite`, que a revisão de dependências registrou como configurado nos quatro `vite.config.ts`. A revisão de composição registrou as três relações host → remote, ativas. "Vite + @module-federation/vite" (README.md:167) repete a afirmação.

**4. README.md:15-18.** A árvore dá os papéis: `host` como app principal que orquestra os remotes, e `header`, `footer` e `products` como micro frontends. A revisão de estrutura registrou os quatro como unidades frontend, e a de composição registrou o host carregando os três remotes por `lazy(() => import(...))` (apps/host/src/App.tsx:5-7). Repetem a afirmação a coluna "Descrição" do host, "Shell da aplicação, carrega os remotes" (README.md:35), "Host (App principal)" (README.md:148) e o título "Microfrontends (Remotes)" (README.md:153), que encabeça header, products e footer.

**5. README.md:21-25.** Os quatro pacotes são bibliotecas, sem entrada de aplicação, e cada um é usado por mais de uma unidade. `@microfrontend/shared` é importado pelo host (apps/host/src/main.tsx:4, `createAppQueryClient`), por products (apps/products/src/api.ts:1; apps/products/src/components/Product.tsx:1) e por header (apps/header/src/service/api.ts:1; apps/header/src/Header.tsx:4). Os tipos de `@microfrontend/types` são usados por products e header (apps/products/src/api.ts:2; apps/header/src/service/api.ts:2). Os componentes de `@microfrontend/ui` são usados pelo host (os skeletons, apps/host/src/App.tsx:2), por header (`Modal` e `CartList`, apps/header/src/Header.tsx:5) e por products (apps/products/src/ProductsList.tsx:5). A config de Tailwind é importada pelos quatro apps (apps/host/tailwind.config.ts:2; apps/header/tailwind.config.ts:2; apps/footer/tailwind.config.ts:2; apps/products/tailwind.config.ts:2). Além do uso no código, `@microfrontend/shared` é declarado singleton do Module Federation no host, em header e em products (apps/host/vite.config.ts:58-60; apps/header/vite.config.ts:30; apps/products/vite.config.ts:30).

**6. README.md:27.** A raiz declara os `workspaces` npm `apps/*`, `packages/*` e `packages/config/*` (package.json:4-8), o workspace que a revisão de estrutura registrou.

**7. README.md:33-38.** A coluna "Expõe" dá o especificador que o host importa. Cada remote expõe um único módulo com esse nome: header expõe `./Header` (apps/header/vite.config.ts:17-18), footer expõe `./Footer` (apps/footer/vite.config.ts:17-18) e products expõe `./ProductsList` (apps/products/vite.config.ts:17-18). O host importa `header/Header`, `footer/Footer` e `products/ProductsList` (apps/host/src/App.tsx:5-7). O "—" do host também confere: o plugin do host declara `remotes` e `shared`, sem `exposes` (apps/host/vite.config.ts:22-65).

**8. README.md:65-70.** Cada remote tem seu script de desenvolvimento na raiz (package.json:14-16) e sua própria entrada, que monta a aplicação sozinha (apps/header/index.html:10 e apps/header/src/main.tsx:5; apps/footer/index.html:10 e apps/footer/src/main.tsx:5; apps/products/index.html:10 e apps/products/src/main.tsx:5). O preview individual de cada app (README.md:105-110; package.json:25-28) repete a afirmação para o build gerado.

**9. README.md:71.** O host busca os três `remoteEntry.js` nas URLs configuradas, com `localhost:3001`-`3003` como padrão em desenvolvimento (apps/host/vite.config.ts:12-15), e importa os três módulos remotos (apps/host/src/App.tsx:5-7). "Para o `host` funcionar corretamente, os três remotes devem estar rodando antes" (README.md:74) repete a afirmação. O "corretamente" importa: sem um remote, o host não cai inteiro, porque cada faixa está num `RemoteErrorBoundary` próprio (apps/host/src/App.tsx:12-30) que mostra "Falha ao carregar …" no lugar do componente (apps/host/src/components/RemoteErrorBoundary.tsx:33-46).

**10. README.md:80.** O `build` da raiz roda `tsc -b` e depois os quatro builds em sequência, `header`, `footer`, `products` e `host` (package.json:18). O CI não usa esse script: constrói cada app pelo seu workspace (.github/workflows/ci-cd.yml:117).

**11. README.md:86-95.** Cada app tem seu `build:<app>` na raiz (package.json:19-22), que roda o `vite build` com a config do app, e cada config grava em `dist/<app>` na raiz (apps/header/vite.config.ts:65; apps/footer/vite.config.ts:49; apps/products/vite.config.ts:65; apps/host/vite.config.ts:92). A revisão de build e deploy registrou build `separado` para os quatro.

**12. README.md:144.** Cada app tem bucket S3 e distribuição CloudFront próprios no job `deploy` (.github/workflows/ci-cd.yml:125-152), e a revisão de build e deploy registrou deploy `separado` para os quatro. A hospedagem independente vale também para o host em relação aos remotes: ele não é reconstruído quando só um remote muda (scripts/ci/affected-workspaces.mjs:38-41) e continua apontando para os mesmos endereços. A independência é do deploy; o versionamento é único para o repositório (3.4.6, Versionamento `No` para os quatro).

**13. README.md:148-162.** Os quatro endereços CloudFront, um por app, não aparecem em nenhum artefato do snapshot: os buckets e as distribuições vêm de secrets (.github/workflows/ci-cd.yml:131-147), e as URLs dos remotes usadas no build do host vêm de variáveis do repositório (:102-104), sem valor no snapshot. Que existe um endereço por app é coerente com a linha #12, mas os endereços em si não se verificam.

**14. README.md:171.** O carrinho é o store Zustand `useCartStore` de packages/shared (packages/shared/src/state/cart-store.ts:12), escrito por products (apps/products/src/components/Product.tsx:1, `addProduct`) e lido por header (apps/header/src/Header.tsx:4), duas unidades. A revisão de composição registrou essa relação de comunicação (3.4.5 #4), com o store declarado singleton no host e nos dois remotes. O footer não usa o carrinho.

## Resumo

Afirmações: 14 (corroborada: 13, parcial: 0, contradita: 0, sem corroboração: 1). Temas: (estrutura: 4, composição: 2, build-deploy: 6, independência: 2).
