---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Leitura do repositório

A documentação é extensa, toda em inglês, e está em seis arquivos Markdown na raiz, todos do tipo `documentation` no `artifacts.csv`:

- `ARCHITECTURE_DOCUMENTATION.md`: visão geral da arquitetura, árvore de pastas, papéis de host e remotes, benefícios, deploy em produção e padrões usados;
- `DEPLOYMENT_GUIDE.md`: guia de publicação na Vercel;
- `NAVIGATION_AND_EMBEDDING.md`: navegação dentro do shell e modo standalone;
- `README.md`: apresentação, instalação, execução e guia de desenvolvimento;
- `TODO.md`: lista de melhorias futuras;
- `context.md`: descrição aplicação por aplicação.

Todos apresentam o projeto como uma plataforma de seguros feita de micro-frontends React/Vite unidos por Module Federation num monorepo. Os textos se repetem muito entre si, e a maior parte das afirmações se reduz a poucas ideias: host e remotes, carga em runtime, pacotes compartilhados, desenvolvimento e deploy independentes.

Quanto ao que existe no snapshot, `ARCHITECTURE_DOCUMENTATION.md` e `NAVIGATION_AND_EMBEDDING.md` conferem com as revisões anteriores: um shell e três remotes (`sales-portal`, `underwriter-portal`, `product-config`), cada um expondo `./App`, carregados por rota dentro de `ErrorBoundary` e `Suspense` (3.4.5 #1-#3). `README.md` e `context.md` descrevem seis aplicações, e duas delas, `employer-portal` e `service-provider`, não existem no snapshot (afirmação 32). As divergências que pesam são essa, o login com sessão compartilhada (afirmação 29), que nenhuma unidade implementa, e o pacote `shared-types`, que só uma unidade usa (afirmação 11).

O deploy independente fica sem artefato. A revisão de build e deploy registrou build `separado` e deploy `não observado` nas quatro aplicações (3.4.6), e os endereços de produção dos documentos não aparecem em nenhuma configuração.

`DEPLOYMENT_GUIDE.md` é quase todo prescritivo. Propõe três estratégias de publicação na Vercel (DEPLOYMENT_GUIDE.md:35-46, 161-214, 221-247), variáveis de ambiente para as URLs dos remotes (DEPLOYMENT_GUIDE.md:49-65, 257-268), mudanças de código "Required" (DEPLOYMENT_GUIDE.md:67-122) e um checklist (DEPLOYMENT_GUIDE.md:316-337). Nada disso foi aplicado no snapshot:
- não há `vercel.json`;
- as URLs dos remotes continuam fixas em `localhost` (apps/shell/vite.config.ts:11-13);
- não existe script `build:prod` (package.json:10-32).

Por ser plano e instrução, e não descrição do projeto, o guia não vira linha, salvo na afirmação 25; DEPLOYMENT_GUIDE.md:5 repete as afirmações 1 e 2. Os planos também incluem as aplicações ausentes (DEPLOYMENT_GUIDE.md:44, 46, 117, 119, 140, 142, 185-198). O mesmo vale para as seções "Production Deployment" do README (README.md:398-415), as "Future Enhancements" (ARCHITECTURE_DOCUMENTATION.md:256-264) e o roadmap de context.md:389-407.

`TODO.md` é inteiro uma lista de itens não feitos (`- [ ]`). Não afirma nada sobre o estado atual, mas confirma que autenticação JWT e "Token sharing across microfrontends" estão por fazer (TODO.md:8-13).

Ficaram fora da tabela:
- os blocos de código que reproduzem configuração ou fonte:
  - ARCHITECTURE_DOCUMENTATION.md:94-104 e NAVIGATION_AND_EMBEDDING.md:47-57: remotes em `http://localhost:300N/remoteEntry.js`, quando a configuração usa `/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:11-13);
  - ARCHITECTURE_DOCUMENTATION.md:116-126, NAVIGATION_AND_EMBEDDING.md:60-70, README.md:255-265 e context.md:350-360: configuração de remote, com `./src/App` no lugar de `./src/App.tsx`, como em apps/sales-portal/vite.config.ts:12;
  - README.md:268-276: remote em `/assets/remoteEntry.js`;
  - context.md:48-57 e 336-348: cinco remotes, incluindo `employerPortal` e `serviceProvider`, em `/assets/remoteEntry.js`, quando o shell declara três (apps/shell/vite.config.ts:10-14);
  - NAVIGATION_AND_EMBEDDING.md:76-89, 95-102, 128-142 e 148-154: reproduzem com pouca diferença apps/sales-portal/src/App.tsx:11-18, apps/sales-portal/src/components/Dashboard.tsx:12-14 e apps/shell/src/components/SalesPortal.tsx:4-28, 69-86;
- os comandos de instalação, execução, build e solução de problemas: ARCHITECTURE_DOCUMENTATION.md:214-226; README.md:36-59, 113-132, 136-148, 290-340, 361-383, 387-396 e 425-440; context.md:248-272; DEPLOYMENT_GUIDE.md:126-143 e 348-370;
  - o "Development Deployment" (README.md:387-396) serve cada `dist` na raiz da sua porta, onde o `remoteEntry.js` não fica no caminho `/dist/assets/` que o shell busca (apps/shell/vite.config.ts:11-13);
  - README.md:309-312 ("Ensure all required applications are running") descreve um efeito das URLs fixas;
- as portas: ARCHITECTURE_DOCUMENTATION.md:90 e 228-232; NAVIGATION_AND_EMBEDDING.md:31, 37. São detalhe do servidor de desenvolvimento e conferem com apps/*/vite.config.ts e apps/*/package.json:6;
- os benefícios genéricos, sem propriedade verificável das unidades:
  - "Scalable team organization" (ARCHITECTURE_DOCUMENTATION.md:15) e "Easier cross-application refactoring" (:23);
  - "Centralized configuration and tooling" (:22): cada aplicação tem `vite.config.ts`, `tailwind.config.js` e `tsconfig.json` próprios, e a raiz centraliza só os scripts e o lockfile;
  - escalabilidade e equipes (:178-181; NAVIGATION_AND_EMBEDDING.md:168);
  - "Hot module replacement for all apps" (:190) e "Distributed architecture" (:244);
  - monitoramento (NAVIGATION_AND_EMBEDDING.md:171, 192-195; DEPLOYMENT_GUIDE.md:343);
  - as estruturas de equipe recomendadas (README.md:348-359; context.md:274-283), que também incluem as aplicações ausentes;
- a pilha de UI e de ferramentas: React, TypeScript, React Router, Tailwind, shadcn/ui, Radix, ESLint e PostCSS (ARCHITECTURE_DOCUMENTATION.md:156-169; README.md:278-288; context.md:232-242), exceto o Vite, o plugin de federação e o Concurrently (afirmações 16 e 17). As versões da tabela conferem com os manifestos (ex.: apps/shell/package.json:11, 13, 22-25), e não há ESLint em nenhum `package.json`;
- negócio, funcionalidades e dados fictícios: README.md:159-196; context.md:31-181, 362-374; NAVIGATION_AND_EMBEDDING.md:158-161, salvo o que repete afirmações. Inclui a nota "components planned" (context.md:100), que já não vale, porque apps/underwriter-portal/src/components/RiskAssessments.tsx e PendingApprovals.tsx existem;
- aparência e segurança: context.md:200-205, 409-423;
- os desafios genéricos da tecnologia em DEPLOYMENT_GUIDE.md:9-17 e 22. No snapshot, as URLs dos remotes são de fato fixadas no build (apps/shell/vite.config.ts:11-13), e o CORS dos remotes vale só para o servidor de desenvolvimento (apps/sales-portal/vite.config.ts:25-31);
- as referências a `ARCHITECTURE.md` (README.md:107, 344, 422, 446; context.md:380), arquivo que não existe; o documento é `ARCHITECTURE_DOCUMENTATION.md`;
- o texto `# module-federation` colado ao fim do README (README.md:447).

Ocorrências `doc-*`:
- `ARCHITECTURE_DOCUMENTATION.md`:
  - na tabela: 5 (afirmações 1 e 2); 12 (3 e 4); 14 (6); 29, 30, 42, 45, 53, 56 e 67 (8); 108 (12); 132 (13); 153 (16); 175 (18); 207 (20); 253 (24);
  - repetições: 11 repete a 1; 131, 239 e 242 repetem a 6; 133 e 206 repetem a 4; 238 repete as 3 e 4; 270 e 273 repetem a 3; 271 repete as 6 e 4;
  - títulos: 9, 85, 130, 151, 195 (seção da afirmação 19), 205, 236 e 241;
- `DEPLOYMENT_GUIDE.md`:
  - 5 repete as 1 e 2; 10 é um desafio genérico da tecnologia e repete a 6;
  - plano e instrução, citados acima: 15, 30, 37, 69, 288, 330, 335, 341 ("Always deploy remotes before the shell") e 343;
  - 1, 9 e 372 são título, subtítulo e fecho;
- `NAVIGATION_AND_EMBEDDING.md`:
  - na tabela: 14 e 22 (26);
  - repetições: 5 repete a 15; 38 repete a 9; 40 repete as 9 e 14; 165 repete a 3; 166 repete a 4; 182 está no diagrama da 31; 199 repete as 15, 29 e 6;
  - título de bloco de código: 44; monitoramento, citado acima: 171, 193 e 194;
- `README.md`:
  - na tabela: 7 (32); 248 (35);
  - repetições: 3 repete as 1, 3 e 4; 7 também repete as 1, 3 e 4; 73, 83 e 267 repetem a 8; 164 repete as 8 e 6; 254 repete a 12; 285 repete a 16; 444 repete a 1;
  - títulos: 1, 227 e 252; instruções: 244 e 365; solução de problemas: 309 e 332;
- `TODO.md`: 3 é a introdução; 10, 24 e 90 são itens futuros (a 10 é citada na afirmação 29);
- `context.md`:
  - 5 repete as 1 e 2; 10 repete a 32; 26, 297 e 307 repetem a 8; 29 repete as 3 e 4; 39 repete as 8 e 6; 45 e 450 repetem a 24; 63 e 444 repetem a 14; 239 repete a 16; 427 repete as 6, 23 e 4; 446 e 456 repetem a 3;
  - títulos: 25, 333 e 442; título de bloco de código: 47.

Foram lidos os artefatos que as revisões anteriores citam: os cinco `package.json` das aplicações e da raiz, os dos dois pacotes, `pnpm-workspace.yaml`, as quatro `vite.config.ts`, os `index.html` e `main.tsx`, apps/shell/src/App.tsx, os componentes do shell (`Layout`, `Dashboard`, `SalesPortal`, `UnderwriterPortal`, `ProductConfig`), apps/shell/src/types/remotes.d.ts e os `App.tsx` dos remotes. Nenhum tem comentário sobre a arquitetura; o único é de interface (apps/shell/src/components/Dashboard.tsx:32). Só a raiz tem `description`, "Module Federation Insurance Platform" (package.json:4), que é o título do README (README.md:1).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | ARCHITECTURE_DOCUMENTATION.md:5 | "This project implements a **Micro-Frontend Architecture** using **Module Federation** within a **Monorepo** structure." | estrutura | corroborada | 3.4.2 (module-federation configurada nas quatro aplicações); 3.4.3 (quatro unidades `Yes`; Workspace); 3.4.5 #1-#3 |
| 2 | ARCHITECTURE_DOCUMENTATION.md:5 | "multiple independent applications work together as a unified system" | independência | parcial | 3.4.3 (Entrada e Build próprios nas quatro unidades); 3.4.6 (Deploy `não observado`: 4); apps/shell/vite.config.ts:10-14 |
| 3 | ARCHITECTURE_DOCUMENTATION.md:12 | "Independent development [...] of features" | independência | corroborada | 3.4.3 (Manifesto, Entrada e Build por unidade); package.json:12-15; apps/sales-portal/package.json:6; apps/sales-portal/src/main.tsx:7-13 |
| 4 | ARCHITECTURE_DOCUMENTATION.md:12 | "Independent [...] deployment of features" | build-deploy | parcial | 3.4.6 (Build `separado`: 4; Deploy `não observado`: 4); package.json:19-22 |
| 5 | ARCHITECTURE_DOCUMENTATION.md:13 | "Technology diversity across teams" | independência | sem corroboração | — |
| 6 | ARCHITECTURE_DOCUMENTATION.md:14 | "Runtime composition of applications" | composição | corroborada | 3.4.4 (dynamic-loading: 3; runtime-composition: 3); 3.4.5 #1-#3 |
| 7 | ARCHITECTURE_DOCUMENTATION.md:19-20 | "The project uses a monorepo pattern with workspace management: - Single repository containing multiple related applications" | estrutura | corroborada | 3.4.3 (Workspace); pnpm-workspace.yaml:1-3; package.json:6-9 |
| 8 | ARCHITECTURE_DOCUMENTATION.md:29-74 | Árvore: "apps/ # Micro-frontend applications", "shell/ # Host application (Module Federation Host)", "SalesPortal.tsx # Remote wrapper for Sales" [...], "sales-portal/ # Sales micro-frontend (Remote)", "underwriter-portal/ # Underwriting micro-frontend (Remote)", "product-config/ # Product configuration micro-frontend (Remote)" | estrutura | corroborada | 3.4.3 (quatro unidades `Yes`); 3.4.4 (apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/components/ProductConfig.tsx:5); 3.4.5 #1-#3 |
| 9 | ARCHITECTURE_DOCUMENTATION.md:52 | "main.tsx # Standalone entry point" (o remote roda sozinho) | independência | corroborada | 3.4.3 (apps/sales-portal/index.html:10-11; apps/sales-portal/src/main.tsx:7-13); apps/sales-portal/package.json:6; apps/sales-portal/src/App.tsx:12-14 |
| 10 | ARCHITECTURE_DOCUMENTATION.md:76-77 | "packages/ # Shared libraries" / "shared-ui/ # Common UI components" | estrutura | corroborada | 3.4.3 (packages/shared-ui `No`); apps/shell/src/components/Dashboard.tsx:3; apps/sales-portal/src/App.tsx:3; apps/underwriter-portal/src/App.tsx:3; apps/product-config/src/App.tsx:3 |
| 11 | ARCHITECTURE_DOCUMENTATION.md:78 | "shared-types/ # Shared TypeScript types" | estrutura | contradita | apps/sales-portal/src/components/QuotesList.tsx:3; apps/sales-portal/src/components/PoliciesList.tsx:3; apps/shell/package.json:16 |
| 12 | ARCHITECTURE_DOCUMENTATION.md:108-114 | "Each portal acts as a **Module Federation Remote**" / "Sales Portal \| 3001 \| Remote \| `./App` component" [...] | composição | corroborada | 3.4.5 #1-#3; apps/sales-portal/vite.config.ts:8-13; apps/underwriter-portal/vite.config.ts:8-13; apps/product-config/vite.config.ts:8-13 |
| 13 | ARCHITECTURE_DOCUMENTATION.md:132 | "No build-time dependencies between micro-frontends" | build-deploy | corroborada | 3.4.6 (Build `separado`: 4); package.json:18; apps/shell/package.json:10-28 |
| 14 | ARCHITECTURE_DOCUMENTATION.md:136-138 | "Each remote module wrapped in error boundaries" / "Graceful degradation when remotes fail to load" / "Fallback UI with links to standalone applications" | composição | corroborada | 3.4.4 (runtime-composition: SalesPortal.tsx:84, UnderwriterPortal.tsx:75, ProductConfig.tsx:75); apps/shell/src/components/SalesPortal.tsx:4-28, 53-60, 69-86 |
| 15 | ARCHITECTURE_DOCUMENTATION.md:141-143 | "Shell app provides consistent navigation" / "Each portal maintains its own internal routing" / "Seamless transitions between applications" | composição | corroborada | 3.4.5 (Leitura); apps/shell/src/components/Layout.tsx:8-13, 30-48, 54; apps/shell/src/main.tsx:9-11; apps/sales-portal/src/App.tsx:11-18 |
| 16 | ARCHITECTURE_DOCUMENTATION.md:152-153 | "**Vite**: Build tool and dev server" / "**@originjs/vite-plugin-federation**: Module Federation implementation for Vite" | composição | corroborada | 3.4.2 (quatro linhas `@originjs/vite-plugin-federation`, `Yes`); 3.4.3 (coluna Build) |
| 17 | ARCHITECTURE_DOCUMENTATION.md:167 | "**Concurrently**: Run multiple dev servers" | outro | corroborada | package.json:11, 34 |
| 18 | ARCHITECTURE_DOCUMENTATION.md:175 | "Independent release cycles" | independência | sem corroboração | — |
| 19 | ARCHITECTURE_DOCUMENTATION.md:197-203 | Diagrama: "Production Environment: ├── shell.insurance-platform.com # Host application ├── sales.insurance-platform.com # Sales portal [...]" | build-deploy | sem corroboração | — |
| 20 | ARCHITECTURE_DOCUMENTATION.md:207 | "Module Federation loads remotes from their respective domains" | composição | parcial | 3.4.5 #1-#3; apps/shell/vite.config.ts:11-13 |
| 21 | ARCHITECTURE_DOCUMENTATION.md:208-209 | "Rollback capabilities per application" / "Blue-green deployments possible" | build-deploy | sem corroboração | — |
| 22 | ARCHITECTURE_DOCUMENTATION.md:237 | "Decomposition by business domain" | estrutura | corroborada | 3.4.3 (quatro unidades `Yes`); apps/shell/src/components/Dashboard.tsx:6-28 |
| 23 | ARCHITECTURE_DOCUMENTATION.md:243 | "Shared dependencies optimization" (Module Federation Pattern) | composição | corroborada | apps/shell/vite.config.ts:15; apps/sales-portal/vite.config.ts:14; apps/underwriter-portal/vite.config.ts:14; apps/product-config/vite.config.ts:14 |
| 24 | ARCHITECTURE_DOCUMENTATION.md:253 | "Route-based micro-frontend loading" | composição | corroborada | 3.4.4 (host-relationship, apps/shell/src/App.tsx:12); apps/shell/src/App.tsx:14-16; apps/shell/src/components/SalesPortal.tsx:4-5 |
| 25 | DEPLOYMENT_GUIDE.md:20-21 | "Shared packages must be built before individual applications" / "Applications have interdependencies that affect build order" | build-deploy | corroborada | 3.4.6 (Leitura); package.json:16-18; packages/shared-types/package.json:5; packages/shared-ui/package.json:5 |
| 26 | NAVIGATION_AND_EMBEDDING.md:12-16 | "Shell app renders `<SalesPortal />` component" / "Module Federation dynamically imports the Sales app from `http://localhost:3001/remoteEntry.js`" / "Sales app renders WITHIN the shell - no page reload, no redirect" | composição | contradita | apps/shell/vite.config.ts:11; 3.4.5 #2; apps/shell/src/components/SalesPortal.tsx:5, 84; apps/shell/src/App.tsx:14 |
| 27 | NAVIGATION_AND_EMBEDDING.md:74 | "Each portal supports **dual routing** for both modes" | composição | corroborada | 3.4.5 #2, #3 (Observações); apps/sales-portal/src/App.tsx:12-17; apps/underwriter-portal/src/App.tsx:12-17; apps/product-config/src/App.tsx:10-11 |
| 28 | NAVIGATION_AND_EMBEDDING.md:93 | "Internal navigation adapts based on context" | composição | corroborada | apps/sales-portal/src/components/Dashboard.tsx:12-14, 79, 84; apps/underwriter-portal/src/components/Dashboard.tsx:12-14, 73, 78 |
| 29 | NAVIGATION_AND_EMBEDDING.md:108-111 | "User logs in to Shell App" / "User stays logged in for ALL portals (shared session)" / "No additional logins required for individual portals" | composição | contradita | apps/shell/src/App.tsx:11-18; apps/shell/src/main.tsx:7-13; TODO.md:8-13 |
| 30 | NAVIGATION_AND_EMBEDDING.md:173 | "**Performance Isolation**: Poor performance in one portal doesn't affect others" | independência | sem corroboração | — |
| 31 | NAVIGATION_AND_EMBEDDING.md:179-185 | Diagrama: "Production URLs: ├── app.insurance.com # Shell app ├── sales.insurance.com # Sales portal (for Module Federation) [...]" | build-deploy | sem corroboração | — |
| 32 | README.md:7 | "each business domain (Sales, Underwriting, Employer Services, Product Configuration, and Service Provider) operates as an independent application" | estrutura | contradita | 3.4.3 (quatro unidades: apps/shell, apps/sales-portal, apps/underwriter-portal, apps/product-config); 3.4.5 (Leitura); apps/shell/vite.config.ts:10-14 |
| 33 | README.md:119-120 | "This starts all 6 applications simultaneously: - Shell (3000), Sales (3001), Underwriter (3002), Employer (3003), Product (3004), Service (3005)" | outro | contradita | package.json:11 |
| 34 | README.md:150-156 | "Build individual applications: [...] cd apps/sales-portal && npm run build [...] Preview production build" | build-deploy | corroborada | 3.4.6 #2 (Build `separado`); apps/sales-portal/package.json:7-8 |
| 35 | README.md:247-250 | "Add to shell application: - Add remote reference in `apps/shell/vite.config.ts` - Add route in `apps/shell/src/App.tsx` - Add navigation item in `apps/shell/src/components/Layout.tsx`" (um remote novo exige mudar o shell) | independência | corroborada | 3.4.5 #1-#3; apps/shell/vite.config.ts:10-14; apps/shell/src/App.tsx:14-16; apps/shell/src/components/Layout.tsx:8-13 |

## Observações

**1. ARCHITECTURE_DOCUMENTATION.md:5.** As quatro aplicações estão no workspace pnpm (pnpm-workspace.yaml:1-3) e se ligam pelo `@originjs/vite-plugin-federation`: um host e três remotes (3.4.5 #1-#3). A mesma afirmação reaparece, com outras palavras, em DEPLOYMENT_GUIDE.md:5, README.md:3, 7 e 444, context.md:5 e na abertura da lista de ARCHITECTURE_DOCUMENTATION.md:11.

**2. ARCHITECTURE_DOCUMENTATION.md:5.** Cada aplicação tem manifesto, entrada e build próprios e pode rodar sozinha (afirmação 9). Mas a independência não se confirma inteira:
- o deploy não tem artefato (afirmação 4);
- o shell só funciona com os remotes servidos nos endereços fixados na sua configuração (apps/shell/vite.config.ts:10-14);
- as quatro dependem dos mesmos pacotes de workspace, construídos antes delas (afirmação 25).

Repetem a afirmação DEPLOYMENT_GUIDE.md:5 e context.md:5.

**3. ARCHITECTURE_DOCUMENTATION.md:12.** Cada aplicação tem servidor de desenvolvimento próprio, disparado por script separado na raiz (package.json:12-15; apps/sales-portal/package.json:6), e os remotes montam a própria árvore React (apps/sales-portal/src/main.tsx:7-13). A frase divide-se porque o deploy recebe outra corroboração (afirmação 4). Repetem esta parte:
- ARCHITECTURE_DOCUMENTATION.md:174, 238, 270 e 273, sobre equipes;
- NAVIGATION_AND_EMBEDDING.md:165;
- README.md:3 e 7 ("developed, tested");
- context.md:29, 446 e 456.

A organização em equipes em si não tem artefato.

**4. ARCHITECTURE_DOCUMENTATION.md:12.** O build é separado por aplicação (package.json:19-22; 3.4.6 #1-#4). O deploy, porém, é `não observado` nas quatro: não há workflow, Dockerfile nem `vercel.json`, e o único endereço é o servidor local (3.4.6, Leitura). As URLs dos remotes fixadas no build do shell (apps/shell/vite.config.ts:11-13) limitam a troca de um remote sem reconstruir o host. Repetem a afirmação:
- ARCHITECTURE_DOCUMENTATION.md:133, 206, 238 e 271;
- NAVIGATION_AND_EMBEDDING.md:166;
- README.md:3 e 7;
- context.md:29 e 427.

As estratégias da Vercel de DEPLOYMENT_GUIDE.md:35-247 são plano, como diz a Leitura.

**5. ARCHITECTURE_DOCUMENTATION.md:13.** O texto diz que a arquitetura permite tecnologias diferentes por equipe. Repetem a afirmação ARCHITECTURE_DOCUMENTATION.md:176 ("within React ecosystem") e NAVIGATION_AND_EMBEDDING.md:167 ("Each portal can use different React versions, state management, etc."). No snapshot, as quatro aplicações usam as mesmas versões de React, React Router e Vite (ex.: apps/shell/package.json:11-13, 23; apps/sales-portal/package.json:11-13, 22) e compartilham `react`, `react-dom` e `react-router-dom` pela federação (afirmação 23). Isso não confirma nem desmente a possibilidade.

**6. ARCHITECTURE_DOCUMENTATION.md:14.** O shell carrega cada remote com `React.lazy` sobre o módulo federado, e o `remoteEntry.js` é buscado no navegador (3.4.4; apps/shell/src/components/SalesPortal.tsx:4-5). Repetem a afirmação:
- ARCHITECTURE_DOCUMENTATION.md:131, 239, 242 e 271;
- DEPLOYMENT_GUIDE.md:10;
- NAVIGATION_AND_EMBEDDING.md:199;
- README.md:164;
- context.md:39 e 427.

**7. ARCHITECTURE_DOCUMENTATION.md:19-20.** O workspace pnpm abrange `apps/*` e `packages/*` (pnpm-workspace.yaml:1-3), com os mesmos padrões em `workspaces` (package.json:6-9), e há um único lockfile na raiz. Repetem a afirmação ARCHITECTURE_DOCUMENTATION.md:246-249 e 269 e context.md:429. "Shared dependencies and build tools" (ARCHITECTURE_DOCUMENTATION.md:21) é o compartilhamento das afirmações 10 e 11.

**8. ARCHITECTURE_DOCUMENTATION.md:29-74.** A árvore confere com o snapshot:
- os quatro diretórios de `apps/`;
- o shell como host, sem `exposes` (apps/shell/vite.config.ts:8-16);
- os três remotes;
- os três wrappers do shell que carregam os remotes (apps/shell/src/components/SalesPortal.tsx:4-5; UnderwriterPortal.tsx:4-5; ProductConfig.tsx:4-5);
- `remotes.d.ts` (apps/shell/src/types/remotes.d.ts:1-14).

Repetem os papéis de host e remote:
- ARCHITECTURE_DOCUMENTATION.md:89-92;
- as árvores de README.md:66, 73 e 83 e de context.md:297 e 307;
- README.md:164 e 267;
- context.md:26 e 35-40.

As listas de README e context.md acrescentam aplicações que não existem, o que é a afirmação 32.

**9. ARCHITECTURE_DOCUMENTATION.md:52.** O comentário está só no sales-portal, mas os três remotes têm `index.html` e `main.tsx` próprios, que montam `BrowserRouter` (3.4.3, coluna Entrada; apps/sales-portal/src/main.tsx:7-13). Também têm rotas sem prefixo para rodar fora do shell (apps/sales-portal/src/App.tsx:12-14). Repetem a afirmação o "Dual Access Modes" (ARCHITECTURE_DOCUMENTATION.md:145-147) e o "Standalone Mode" (NAVIGATION_AND_EMBEDDING.md:36-40). Os links "Open … in New Tab" do shell apontam para esses servidores (afirmação 14).

**10. ARCHITECTURE_DOCUMENTATION.md:76-77.** As quatro unidades usam `@insurance/shared-ui`. O shell o usa no Dashboard e no CSS (apps/shell/src/components/Dashboard.tsx:3; apps/shell/src/index.css:1), e cada remote nos seus componentes (ex.: apps/sales-portal/src/App.tsx:3). Repetem a afirmação:
- ARCHITECTURE_DOCUMENTATION.md:163 e 191;
- README.md:23;
- context.md:185-208, 431 e 438.

O pacote não é unidade (3.4.3).

**11. ARCHITECTURE_DOCUMENTATION.md:78.** As quatro aplicações declaram `@insurance/shared-types` (ex.: apps/shell/package.json:16), mas só o sales-portal o importa (apps/sales-portal/src/components/QuotesList.tsx:3; apps/sales-portal/src/components/PoliciesList.tsx:3). Declarar a dependência não basta para o pacote ser compartilhado, e no snapshot ele serve a uma só unidade. Repetem a afirmação README.md:24 ("TypeScript definitions for all applications"), context.md:212-230 e 439. A parte "Shared libraries" (ARCHITECTURE_DOCUMENTATION.md:76) se confirma para o `shared-ui` (afirmação 10).

**12. ARCHITECTURE_DOCUMENTATION.md:108-114.** Os três remotes declaram `filename: "remoteEntry.js"` e expõem `./App` a partir de `./src/App.tsx` (apps/sales-portal/vite.config.ts:9-12 e equivalentes). O shell importa `<remote>/App` (3.4.5 #1-#3). As portas da tabela conferem (ex.: apps/sales-portal/vite.config.ts:26). Repetem a afirmação README.md:254 e context.md:27.

**13. ARCHITECTURE_DOCUMENTATION.md:132.** Nenhuma aplicação depende de outra no `package.json`: o shell só depende de bibliotecas e dos dois pacotes de workspace (apps/shell/package.json:10-28). O `build:apps` roda as quatro em paralelo (package.json:18). O shell resolve os remotes só em runtime, pela URL (apps/shell/vite.config.ts:10-14). A dependência de build que existe é com os pacotes compartilhados (afirmação 25), não entre micro-frontends.

**14. ARCHITECTURE_DOCUMENTATION.md:136-138.** Cada wrapper renderiza o remote dentro de `ErrorBoundary` e `Suspense` (apps/shell/src/components/SalesPortal.tsx:69-86; UnderwriterPortal.tsx:62-77; ProductConfig.tsx:62-77). Se o import falhar, o `.catch` mostra um componente local (apps/shell/src/components/SalesPortal.tsx:4-28). As duas telas de erro têm link para o servidor do remote (apps/shell/src/components/SalesPortal.tsx:17, 54; UnderwriterPortal.tsx:16, 47; ProductConfig.tsx:16, 47). Repetem a afirmação NAVIGATION_AND_EMBEDDING.md:40, 124-154 (em parte em blocos de código), context.md:63 e 444.

**15. ARCHITECTURE_DOCUMENTATION.md:141-143.** O shell envolve todas as rotas no seu `Layout`, que tem a barra de navegação com `Link` (apps/shell/src/components/Layout.tsx:8-13, 30-48, 54). Os remotes declaram rotas internas que usam o `BrowserRouter` do shell (apps/shell/src/main.tsx:9-11; apps/sales-portal/src/App.tsx:11-18), então a troca de portal é navegação no cliente, sem recarregar a página. Repetem a afirmação:
- ARCHITECTURE_DOCUMENTATION.md:184-186 e 252;
- NAVIGATION_AND_EMBEDDING.md:3-5, 30-34, 116-119, 160 e 199;
- README.md:162 e 165;
- context.md:38-40 e 43.

**16. ARCHITECTURE_DOCUMENTATION.md:152-153.** As quatro aplicações configuram o Vite com o plugin `@originjs/vite-plugin-federation` (3.4.2). A versão `^1.3.5` que README.md:285 e context.md:239 dão à "Module Federation" é a do plugin (apps/shell/package.json:24). Repetem a afirmação, além dessas linhas, context.md:5 e 428 ("Vite over Webpack").

**17. ARCHITECTURE_DOCUMENTATION.md:167.** O `dev` da raiz usa `concurrently` para subir os quatro servidores de desenvolvimento (package.json:11, 34). A contagem de seis aplicações é a afirmação 33.

**18. ARCHITECTURE_DOCUMENTATION.md:175.** Não há registro de releases. As quatro aplicações têm a versão `1.0.0`, que nenhuma publicação usa (3.4.6, Versionamento independente: 0), mas isso não confirma nem desmente que as versões possam evoluir separadamente.

**19. ARCHITECTURE_DOCUMENTATION.md:197-203.** Os domínios de produção não aparecem em nenhuma configuração do snapshot. As URLs dos remotes são de `localhost` (apps/shell/vite.config.ts:11-13), e não há artefato de deploy (3.4.6). Os domínios também diferem dos de NAVIGATION_AND_EMBEDDING.md:179-185 (afirmação 31) e dos de DEPLOYMENT_GUIDE.md:41-46.

**20. ARCHITECTURE_DOCUMENTATION.md:207.** O shell busca cada remote na origem do próprio remote: as portas 3001, 3002 e 3004 (apps/shell/vite.config.ts:11-13), cada uma servida pela aplicação correspondente (3.4.5 #1-#3). A frase fala dos domínios de produção da afirmação 19, e essa parte não tem artefato.

**21. ARCHITECTURE_DOCUMENTATION.md:208-209.** Não há pipeline nem configuração de hospedagem no snapshot (3.4.6). Repete a afirmação NAVIGATION_AND_EMBEDDING.md:172 ("Selective Rollbacks"). DEPLOYMENT_GUIDE.md:344 é recomendação.

**22. ARCHITECTURE_DOCUMENTATION.md:237.** Cada remote corresponde a uma área da plataforma: vendas, subscrição e configuração de produtos. O Dashboard do shell apresenta as três assim (apps/shell/src/components/Dashboard.tsx:6-28). Repetem a afirmação context.md:430 e 437. As duas áreas a mais de README.md:7 são a afirmação 32.

**23. ARCHITECTURE_DOCUMENTATION.md:243.** As quatro configurações de federação compartilham `react`, `react-dom` e `react-router-dom` (apps/shell/vite.config.ts:15 e equivalentes), sem `singleton` nem versão. Repetem a afirmação context.md:28, 427 e 443.

**24. ARCHITECTURE_DOCUMENTATION.md:253.** Cada remote só é carregado quando a rota do seu prefixo é renderizada (apps/shell/src/App.tsx:14-16), porque o `lazy` está no wrapper (apps/shell/src/components/SalesPortal.tsx:4-5). Repetem a afirmação:
- NAVIGATION_AND_EMBEDDING.md:162 e 174;
- context.md:45 e 450.

Em context.md:45 o `lazy` é atribuído a `App.tsx`, mas está nos wrappers.

**25. DEPLOYMENT_GUIDE.md:20-21.** O `build` da raiz constrói primeiro `shared-types` e `shared-ui` e só depois as aplicações (package.json:16-18). Os pacotes publicam `dist/index.js` (packages/shared-types/package.json:5; packages/shared-ui/package.json:5), que as aplicações consomem. As "interdependencies" são com esses pacotes, como o próprio guia explica adiante (DEPLOYMENT_GUIDE.md:309-314). Entre as aplicações não há dependência de build (afirmação 13). Repetem a afirmação DEPLOYMENT_GUIDE.md:251-255, 280-284 e 295-300, README.md:47 e context.md:265.

**26. NAVIGATION_AND_EMBEDDING.md:12-16.** O fluxo se confirma: a rota `/sales/*` renderiza `SalesPortal` (apps/shell/src/App.tsx:14), que importa `salesPortal/App` e o renderiza dentro do layout do shell (apps/shell/src/components/SalesPortal.tsx:5, 84). O endereço citado não se confirma. O shell busca `http://localhost:3001/dist/assets/remoteEntry.js` (apps/shell/vite.config.ts:11), não `http://localhost:3001/remoteEntry.js`, por isso a afirmação é `contradita`. O diagrama de NAVIGATION_AND_EMBEDDING.md:19-26 repete a parte confirmada.

**27. NAVIGATION_AND_EMBEDDING.md:74.** Os três remotes declaram as rotas sem prefixo, para o modo standalone, e com o prefixo da rota do shell, para o modo embutido:
- apps/sales-portal/src/App.tsx:12-17;
- apps/underwriter-portal/src/App.tsx:12-17;
- apps/product-config/src/App.tsx:10-11, só `/` e `/products`.

O bloco de NAVIGATION_AND_EMBEDDING.md:76-89 reproduz o do sales-portal. Repete a afirmação context.md:445 ("Consistent routing patterns").

**28. NAVIGATION_AND_EMBEDDING.md:93.** Os Dashboards do sales-portal e do underwriter-portal detectam o prefixo na URL e montam os links com ele (apps/sales-portal/src/components/Dashboard.tsx:12-14, 79, 84; apps/underwriter-portal/src/components/Dashboard.tsx:12-14, 73, 78). O product-config não tem navegação interna desse tipo.

**29. NAVIGATION_AND_EMBEDDING.md:108-111.** Nenhuma unidade tem login, autenticação ou sessão:
- o shell monta as rotas diretamente, sem tela de entrada (apps/shell/src/main.tsx:7-13; apps/shell/src/App.tsx:11-18);
- não há código de sessão ou token em `apps/`;
- o próprio TODO.md lista autenticação e "Token sharing across microfrontends" como itens por fazer (TODO.md:8-13).

A sessão compartilhada não tem uso em nenhuma unidade, e o código mostra o contrário do fluxo descrito. Repetem a afirmação NAVIGATION_AND_EMBEDDING.md:159, 187-190 (SSO, JWT e sessão centralizada, em "Production Considerations") e 199 ("Users login once at localhost:3000").

**30. NAVIGATION_AND_EMBEDDING.md:173.** Os portais rodam na mesma página do shell, com React compartilhado (afirmação 23). O snapshot não tem medição nem mecanismo de isolamento que confirme ou desminta a afirmação.

**31. NAVIGATION_AND_EMBEDDING.md:179-185.** Como na afirmação 19, os domínios não aparecem em nenhuma configuração, e são outros que os de ARCHITECTURE_DOCUMENTATION.md:197-203.

**32. README.md:7.** O snapshot tem um shell e três remotes. `employer-portal` e `service-provider` não existem em `apps/`, e o shell não declara remote para eles (apps/shell/vite.config.ts:10-14; 3.4.3; 3.4.5, Leitura). As demais partes da frase repetem as afirmações 1, 3 e 4. Repetem a lista de seis aplicações:
- o diagrama de README.md:11-19 e a árvore de README.md:86-88;
- as seções de README.md:180-184 e 192-196;
- context.md:10-16 ("6 independent applications"), 116-135 e 162-181.

**33. README.md:119-120.** O `dev` da raiz sobe quatro aplicações, sem Employer nem Service, que não existem (package.json:11). Repete a afirmação context.md:250 ("Starts all 6 applications simultaneously").

**34. README.md:150-156.** Cada aplicação tem `build` e `preview` próprios (apps/sales-portal/package.json:7-8), e o build é `separado` nas quatro (3.4.6 #1-#4). O exemplo usa `npm`, mas o workspace e os scripts da raiz usam `pnpm` (pnpm-workspace.yaml:1-3; package.json:19-22).

**35. README.md:247-250.** Os três lugares citados são os que ligam cada remote ao shell: a declaração do remote (apps/shell/vite.config.ts:10-14), a rota (apps/shell/src/App.tsx:14-16) e o item do menu (apps/shell/src/components/Layout.tsx:8-13). Um remote novo exige, portanto, mudar e reconstruir o host. O README não cita o wrapper com `lazy` e `ErrorBoundary`, que também é preciso criar (apps/shell/src/components/SalesPortal.tsx:4-88), nem a declaração de tipo (apps/shell/src/types/remotes.d.ts:1-14).

## Resumo

Afirmações: 35 (corroborada: 21, parcial: 3, contradita: 5, sem corroboração: 6). Temas: (estrutura: 7, composição: 12, build-deploy: 7, independência: 7, outro: 2).
