---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Leitura do repositório

Exemplo de uma plataforma de seguros fictícia: um monorepo pnpm (`apps/*` e `packages/*`) com quatro aplicações React/Vite. `apps/shell` é o host, e `apps/sales-portal`, `apps/underwriter-portal` e `apps/product-config` são remotes. As quatro são unidades frontend com manifesto, entrada e build próprios (#17, #18, #19, #20). A raiz e os dois pacotes de `packages/` não são unidades (#16, #21, #22).

A cadeia de Module Federation está completa nas três relações:
- **Dependência:** `@originjs/vite-plugin-federation` `^1.3.5`, declarada nas quatro unidades (#1, #2, #3, #4).
- **Configuração:** cada remote se nomeia (`productConfig`, `salesPortal`, `underwriterPortal`), gera `remoteEntry.js` e expõe `./App` (#5, #6, #8). O shell declara os três remotes por URL (#7). As quatro compartilham `react`, `react-dom` e `react-router-dom`.
- **Código:** o shell tem um wrapper por remote, que importa `<remote>/App` por `React.lazy` (#9, #10, #11) e o renderiza dentro de `ErrorBoundary` e `Suspense` (#13, #14, #15). A tabela de rotas do shell liga `/sales/*`, `/underwriter/*` e `/products/*` aos wrappers (#12).
- **Relação:** daí as três relações ativas shell → remote (#23, #24, #25).

Os quatro builds são separados, disparados pela raiz, e nenhum deploy é observado (#26 a #29). As URLs dos remotes estão fixas em `localhost` no build do shell (#7), o que limita a execução a uma máquina, mas não muda a composição.

A documentação é extensa, em seis arquivos Markdown, e rende 35 afirmações (#30 a #64). A maioria confere com a cadeia acima. Os sinais que enganam estão nela:
- seis aplicações, com `employer-portal` e `service-provider`, que não existem no snapshot nem têm remote no shell (#61, #62);
- login com sessão compartilhada, que nenhuma unidade implementa e o `TODO.md` lista como por fazer (#58);
- o pacote `shared-types` como compartilhado, quando só o sales-portal o importa (#40);
- o endereço `http://localhost:3001/remoteEntry.js`, diferente do caminho `/dist/assets/` da configuração (#55);
- domínios de produção, rollback, ciclos de release e isolamento de desempenho, sem artefato no snapshot (#47, #48, #50, #59, #60); o deploy por aplicação e a carga a partir de domínios próprios ficam corroborados só em parte (#31, #33, #49).

O histórico tem 2 commits no mesmo dia. O primeiro já traz o projeto inteiro e os documentos, então os desencontros acima coexistem desde a primeira presença observável, sem estágio abandonado (#65 a #69). Nada fica ambíguo no snapshot.

## Observações

### 1. apps/product-config/package.json:23

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do product-config.

### 2. apps/sales-portal/package.json:23

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do sales-portal.

### 3. apps/shell/package.json:24

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell.

### 4. apps/underwriter-portal/package.json:23

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do underwriter-portal.

### 5. apps/product-config/vite.config.ts:3, 8-15

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "productConfig"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.tsx" }` e `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretação:** O product-config está configurado como remote de Module Federation, com nome próprio e um módulo exposto a um host.

**Nota:** A porta 3004 e os cabeçalhos CORS do bloco `server` (linhas 25-32) são do servidor de desenvolvimento e não entram.

### 6. apps/sales-portal/vite.config.ts:3, 8-15

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "salesPortal"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.tsx" }` e `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretação:** O sales-portal está configurado como remote de Module Federation, com nome próprio e um módulo exposto a um host.

**Nota:** A porta 3001 e os cabeçalhos CORS do bloco `server` (linhas 25-32) são do servidor de desenvolvimento e não entram.

### 7. apps/shell/vite.config.ts:3, 8-16

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "shell"`, `remotes: { salesPortal: "http://localhost:3001/dist/assets/remoteEntry.js", underwriterPortal: "http://localhost:3002/dist/assets/remoteEntry.js", productConfig: "http://localhost:3004/dist/assets/remoteEntry.js" }` e `shared: ["react", "react-dom", "react-router-dom"]`. Não há `filename` nem `exposes`.

**Interpretação:** A configuração do host declara os três remotes, com nomes iguais aos que os remotes se dão (#5, #6, #8), e o endereço local de cada um.

**Nota:** A porta 3000 do bloco `server` (linhas 23-25) é do servidor de desenvolvimento e não entra.

### 8. apps/underwriter-portal/vite.config.ts:3, 8-15

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "underwriterPortal"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.tsx" }` e `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretação:** O underwriter-portal está configurado como remote de Module Federation, com nome próprio e um módulo exposto a um host.

**Nota:** A porta 3002 e os cabeçalhos CORS do bloco `server` (linhas 25-32) são do servidor de desenvolvimento e não entram.

### 9. apps/shell/src/components/ProductConfig.tsx:5; apps/shell/src/components/ProductConfig.tsx:4-26

**Observação:** `const RemoteProductConfig = lazy(() => import("productConfig/App").catch(() => ({ default: () => (…) })))`; o `.catch` devolve um componente local que diz que o portal não está disponível na porta 3004.

**Interpretação:** O shell carrega em runtime o módulo `./App` do remote `productConfig`, pelo nome dele, com uma tela local se a carga falhar.

### 10. apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/components/SalesPortal.tsx:4-27

**Observação:** `const RemoteSalesPortal = lazy(() => import("salesPortal/App").catch((err) => ({ default: () => (…) })))`; o `.catch` devolve um componente local de indisponibilidade.

**Interpretação:** O shell carrega em runtime o módulo `./App` do remote `salesPortal`, pelo nome dele, com uma tela local se a carga falhar.

### 11. apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/components/UnderwriterPortal.tsx:4-26

**Observação:** `const RemoteUnderwriterPortal = lazy(() => import("underwriterPortal/App").catch(() => ({ default: () => (…) })))`; o `.catch` devolve um componente local de indisponibilidade.

**Interpretação:** O shell carrega em runtime o módulo `./App` do remote `underwriterPortal`, pelo nome dele, com uma tela local se a carga falhar.

### 12. apps/shell/src/App.tsx:12; apps/shell/src/App.tsx:5-7, 12-17; apps/shell/src/main.tsx:7-13

**Observação:** `<Routes>` com `<Route path="/sales/*" element={<SalesPortal />} />`, `<Route path="/underwriter/*" element={<UnderwriterPortal />} />` e `<Route path="/products/*" element={<ProductConfig />} />`, além de `/` para o `Dashboard` local. Os três componentes são os wrappers importados de `./components/`. O `App` é montado dentro de `BrowserRouter`.

**Interpretação:** A tabela de rotas do shell liga um prefixo de URL a cada wrapper de remote (#9, #10, #11) e decide quando cada unidade é carregada.

### 13. apps/shell/src/components/ProductConfig.tsx:75; apps/shell/src/components/ProductConfig.tsx:62-77

**Observação:** `<RemoteProductConfig />`, dentro de `<ErrorBoundary FallbackComponent={ErrorFallback}>` e `<Suspense fallback={…}>`. O componente vem do `lazy` da linha 4.

**Interpretação:** O shell renderiza o componente federado do product-config, protegido por limite de erro e carregamento.

### 14. apps/shell/src/components/SalesPortal.tsx:84; apps/shell/src/components/SalesPortal.tsx:69-86

**Observação:** `<RemoteSalesPortal />`, dentro de `<ErrorBoundary FallbackComponent={ErrorFallback}>` e `<Suspense fallback={…}>`. O componente vem do `lazy` da linha 4.

**Interpretação:** O shell renderiza o componente federado do sales-portal, protegido por limite de erro e carregamento.

### 15. apps/shell/src/components/UnderwriterPortal.tsx:75; apps/shell/src/components/UnderwriterPortal.tsx:62-77

**Observação:** `<RemoteUnderwriterPortal />`, dentro de `<ErrorBoundary FallbackComponent={ErrorFallback}>` e `<Suspense fallback={…}>`. O componente vem do `lazy` da linha 4.

**Interpretação:** O shell renderiza o componente federado do underwriter-portal, protegido por limite de erro e carregamento.

### 16. .; package.json:1-43; package.json:16-22

**Observação:** Raiz com o manifesto `insurance-platform` (`private`), `workspaces` `apps/*` e `packages/*` e scripts que só delegam aos pacotes e aplicações (`cd … && pnpm run build`). Não tem entrada nem configuração de build de UI.

**Interpretação:** É raiz de coordenação do workspace, não unidade frontend.

### 17. apps/product-config; apps/product-config/package.json:1-9; apps/product-config/index.html:10-11; apps/product-config/src/main.tsx:7-13; apps/product-config/vite.config.ts:5-33; apps/product-config/package.json:7

**Observação:** Diretório com o manifesto `@insurance/product-config`, `index.html` com `#root` que carrega `/src/main.tsx`, entrada que monta React, `vite.config.ts` próprio e script `build` `tsc && vite build`. Está no workspace por `apps/*` (pnpm-workspace.yaml:2).

**Interpretação:** É uma unidade frontend com limite próprio, que também roda sozinha.

### 18. apps/sales-portal; apps/sales-portal/package.json:1-9; apps/sales-portal/index.html:10-11; apps/sales-portal/src/main.tsx:7-13; apps/sales-portal/vite.config.ts:5-33; apps/sales-portal/package.json:7

**Observação:** Diretório com o manifesto `@insurance/sales-portal`, `index.html` com `#root` que carrega `/src/main.tsx`, entrada que monta React, `vite.config.ts` próprio e script `build` `tsc && vite build`. Está no workspace por `apps/*` (pnpm-workspace.yaml:2).

**Interpretação:** É uma unidade frontend com limite próprio, que também roda sozinha.

### 19. apps/shell; apps/shell/package.json:1-9; apps/shell/index.html:10-11; apps/shell/src/main.tsx:7-13; apps/shell/vite.config.ts:5-26; apps/shell/package.json:7

**Observação:** Diretório com o manifesto `@insurance/shell`, `index.html` com `#root` que carrega `/src/main.tsx`, entrada que monta React dentro de `BrowserRouter`, `vite.config.ts` próprio e script `build` `tsc && vite build`. Está no workspace por `apps/*` (pnpm-workspace.yaml:2).

**Interpretação:** É uma unidade frontend com limite próprio, e é a que contém os imports federados (#9, #10, #11).

### 20. apps/underwriter-portal; apps/underwriter-portal/package.json:1-9; apps/underwriter-portal/index.html:10-11; apps/underwriter-portal/src/main.tsx:7-13; apps/underwriter-portal/vite.config.ts:5-33; apps/underwriter-portal/package.json:7

**Observação:** Diretório com o manifesto `@insurance/underwriter-portal`, `index.html` com `#root` que carrega `/src/main.tsx`, entrada que monta React, `vite.config.ts` próprio e script `build` `tsc && vite build`. Está no workspace por `apps/*` (pnpm-workspace.yaml:2).

**Interpretação:** É uma unidade frontend com limite próprio, que também roda sozinha.

### 21. packages/shared-types; packages/shared-types/package.json:1-17; packages/shared-types/package.json:8

**Observação:** Manifesto `@insurance/shared-types` com `main: dist/index.js` e build `tsc`, sem entrada de aplicação. Está no workspace por `packages/*` (pnpm-workspace.yaml:3).

**Interpretação:** É pacote de tipos compartilhado, não unidade frontend.

### 22. packages/shared-ui; packages/shared-ui/package.json:1-39; packages/shared-ui/package.json:8

**Observação:** Manifesto `@insurance/shared-ui` com `main: dist/index.js` e build `tsc` seguido de `tailwindcss`, sem entrada de aplicação. Está no workspace por `packages/*` (pnpm-workspace.yaml:3).

**Interpretação:** É biblioteca de componentes compartilhada, não unidade frontend.

### 23. apps/shell/src/components/ProductConfig.tsx:5; apps/shell/src/App.tsx:16; apps/shell/src/components/ProductConfig.tsx:75; apps/shell/vite.config.ts:13; apps/product-config/vite.config.ts:9-13

**Observação:** O especificador `productConfig/App` do shell corresponde ao remote `productConfig` (`http://localhost:3004/dist/assets/remoteEntry.js`) da configuração do shell e, no product-config, a `name: "productConfig"`, `filename: "remoteEntry.js"` e à chave `./App`. O wrapper é renderizado na rota `/products/*` e renderiza o componente remoto. A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do shell para o product-config. O destino é resolvido pelo nome e pela chave exposta.

### 24. apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/App.tsx:14; apps/shell/src/components/SalesPortal.tsx:84; apps/shell/vite.config.ts:11; apps/sales-portal/vite.config.ts:9-13

**Observação:** O especificador `salesPortal/App` do shell corresponde ao remote `salesPortal` (`http://localhost:3001/dist/assets/remoteEntry.js`) da configuração do shell e, no sales-portal, a `name: "salesPortal"`, `filename: "remoteEntry.js"` e à chave `./App`. O wrapper é renderizado na rota `/sales/*` e renderiza o componente remoto. A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do shell para o sales-portal. O remote declara as rotas com e sem o prefixo `/sales` (apps/sales-portal/src/App.tsx:11-18), o que permite servir as mesmas telas sob o shell ou isoladamente.

### 25. apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/App.tsx:15; apps/shell/src/components/UnderwriterPortal.tsx:75; apps/shell/vite.config.ts:12; apps/underwriter-portal/vite.config.ts:9-13

**Observação:** O especificador `underwriterPortal/App` do shell corresponde ao remote `underwriterPortal` (`http://localhost:3002/dist/assets/remoteEntry.js`) da configuração do shell e, no underwriter-portal, a `name: "underwriterPortal"`, `filename: "remoteEntry.js"` e à chave `./App`. O wrapper é renderizado na rota `/underwriter/*` e renderiza o componente remoto. A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do shell para o underwriter-portal. O remote declara as rotas com e sem o prefixo `/underwriter` (apps/underwriter-portal/src/App.tsx:11-18).

### 26. apps/product-config/package.json:7; apps/product-config/vite.config.ts:5-33; package.json:22; apps/product-config/package.json:3

**Observação:** Script `build` `tsc && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` do remote `productConfig`; a raiz só o dispara (`build:product`). O único endereço é o servidor local da porta 3004 (`dev` e `preview`). Não há Dockerfile, CI, compose nem `vercel.json`. `version: "1.0.0"`, não usada em publicação.

**Interpretação:** O product-config tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 27. apps/sales-portal/package.json:7; apps/sales-portal/vite.config.ts:5-33; package.json:20; apps/sales-portal/package.json:3

**Observação:** Script `build` `tsc && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` do remote `salesPortal`; a raiz só o dispara (`build:sales`). O único endereço é o servidor local da porta 3001 (`dev` com `--strictPort` e `preview`). Não há Dockerfile, CI, compose nem `vercel.json`. `version: "1.0.0"`, não usada em publicação.

**Interpretação:** O sales-portal tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 28. apps/shell/package.json:7; apps/shell/vite.config.ts:5-26; package.json:19; apps/shell/package.json:3

**Observação:** Script `build` `tsc && vite build` com `vite.config.ts` próprio, de host, que embute as URLs `localhost` dos remotes; a raiz só o dispara (`build:shell`). O único endereço é o servidor local da porta 3000. Não há Dockerfile, CI, compose nem `vercel.json`. `version: "1.0.0"`, não usada em publicação.

**Interpretação:** O shell tem build separado, que só funciona contra remotes servidos na mesma máquina. O deploy não é observado, e não há versionamento usado em publicação.

### 29. apps/underwriter-portal/package.json:7; apps/underwriter-portal/vite.config.ts:5-33; package.json:21; apps/underwriter-portal/package.json:3

**Observação:** Script `build` `tsc && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` do remote `underwriterPortal`; a raiz só o dispara (`build:underwriter`). O único endereço é o servidor local da porta 3002. Não há Dockerfile, CI, compose nem `vercel.json`. `version: "1.0.0"`, não usada em publicação.

**Interpretação:** O underwriter-portal tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 30. ARCHITECTURE_DOCUMENTATION.md:5

**Observação:** "This project implements a **Micro-Frontend Architecture** using **Module Federation** within a **Monorepo** structure."

**Interpretação:** Afirma micro-frontends ligados por Module Federation num monorepo. A dependência configurada nas quatro unidades (#1 a #4), as quatro unidades no workspace (#17 a #20) e as três relações (#23, #24, #25) confirmam a afirmação.

### 31. ARCHITECTURE_DOCUMENTATION.md:5

**Observação:** "multiple independent applications work together as a unified system"

**Interpretação:** Afirma aplicações independentes que funcionam como um sistema. Cada unidade tem entrada e build próprios (#17 a #20), e o shell as une pela configuração dos remotes (#7). A independência não se confirma inteira: o deploy não é observado (#26 a #29), e o shell só funciona com os remotes nos endereços fixos. A afirmação é corroborada em parte.

### 32. ARCHITECTURE_DOCUMENTATION.md:12

**Observação:** "Independent development [...] of features"

**Interpretação:** Afirma desenvolvimento independente. Cada aplicação tem manifesto, entrada e build próprios (#17 a #20) e servidor de desenvolvimento disparado por script separado na raiz (package.json:12-15), o que confirma a afirmação.

### 33. ARCHITECTURE_DOCUMENTATION.md:12

**Observação:** "Independent [...] deployment of features"

**Interpretação:** Afirma deploy independente. O build é separado nas quatro aplicações (#26 a #29), mas o deploy não é observado em nenhuma. A afirmação é corroborada em parte.

### 34. ARCHITECTURE_DOCUMENTATION.md:13

**Observação:** "Technology diversity across teams"

**Interpretação:** Afirma que cada equipe pode usar tecnologias diferentes. As quatro aplicações usam as mesmas versões de React, React Router e Vite e compartilham as bibliotecas pela federação (#5 a #8), o que não confirma nem desmente a possibilidade. A afirmação fica sem corroboração.

### 35. ARCHITECTURE_DOCUMENTATION.md:14

**Observação:** "Runtime composition of applications"

**Interpretação:** Afirma composição em runtime. Os imports federados por `React.lazy` (#9, #10, #11), a renderização dos componentes remotos (#13, #14, #15) e as três relações ativas (#23, #24, #25) confirmam a afirmação.

### 36. ARCHITECTURE_DOCUMENTATION.md:19-20

**Observação:** "The project uses a monorepo pattern with workspace management: - Single repository containing multiple related applications"

**Interpretação:** Afirma um monorepo com workspace que reúne as aplicações. O workspace pnpm abrange `apps/*` e `packages/*` (pnpm-workspace.yaml:1-3; package.json:6-9), o que confirma a afirmação.

### 37. ARCHITECTURE_DOCUMENTATION.md:29-74

**Observação:** Árvore: "apps/ # Micro-frontend applications", "shell/ # Host application (Module Federation Host)", "SalesPortal.tsx # Remote wrapper for Sales" [...], "sales-portal/ # Sales micro-frontend (Remote)", "underwriter-portal/ # Underwriting micro-frontend (Remote)", "product-config/ # Product configuration micro-frontend (Remote)"

**Interpretação:** Descreve um host e três remotes, com um wrapper por remote no shell. As quatro unidades (#17 a #20), os três wrappers (#9, #10, #11) e as três relações (#23, #24, #25) confirmam a árvore.

### 38. ARCHITECTURE_DOCUMENTATION.md:52

**Observação:** "main.tsx # Standalone entry point" (o remote roda sozinho)

**Interpretação:** Afirma que o remote tem entrada própria para rodar sozinho. A entrada do sales-portal (#18), seu servidor de desenvolvimento (apps/sales-portal/package.json:6) e as rotas sem prefixo (apps/sales-portal/src/App.tsx:12-14) confirmam a afirmação.

### 39. ARCHITECTURE_DOCUMENTATION.md:76-77

**Observação:** "packages/ # Shared libraries" / "shared-ui/ # Common UI components"

**Interpretação:** Afirma uma biblioteca de UI comum. O `shared-ui` (#22) é usado pelas quatro unidades (ex.: apps/shell/src/components/Dashboard.tsx:3; apps/sales-portal/src/App.tsx:3), o que confirma a afirmação. O pacote não é unidade frontend.

### 40. ARCHITECTURE_DOCUMENTATION.md:78

**Observação:** "shared-types/ # Shared TypeScript types"

**Interpretação:** Afirma tipos compartilhados entre as aplicações. As quatro declaram `@insurance/shared-types` (ex.: apps/shell/package.json:16), mas só o sales-portal o importa (apps/sales-portal/src/components/QuotesList.tsx:3; apps/sales-portal/src/components/PoliciesList.tsx:3). O snapshot desmente o compartilhamento.

### 41. ARCHITECTURE_DOCUMENTATION.md:108-114

**Observação:** "Each portal acts as a **Module Federation Remote**" / "Sales Portal | 3001 | Remote | `./App` component" [...]

**Interpretação:** Afirma que cada portal é um remote que expõe `./App`. A configuração dos três remotes (#5, #6, #8) e as três relações (#23, #24, #25) confirmam a afirmação.

### 42. ARCHITECTURE_DOCUMENTATION.md:132

**Observação:** "No build-time dependencies between micro-frontends"

**Interpretação:** Afirma que não há dependência de build entre micro-frontends. Os quatro builds são separados (#26 a #29), o `build:apps` roda as quatro em paralelo (package.json:18), e o shell não depende de nenhuma aplicação no manifesto (apps/shell/package.json:10-28), o que confirma a afirmação.

### 43. ARCHITECTURE_DOCUMENTATION.md:136-138

**Observação:** "Each remote module wrapped in error boundaries" / "Graceful degradation when remotes fail to load" / "Fallback UI with links to standalone applications"

**Interpretação:** Afirma isolamento de falhas na carga dos remotes. Cada wrapper renderiza o remote dentro de `ErrorBoundary` e `Suspense` (#13, #14, #15) e devolve uma tela local com link para o servidor do remote se o import falhar (apps/shell/src/components/SalesPortal.tsx:4-28), o que confirma a afirmação.

### 44. ARCHITECTURE_DOCUMENTATION.md:141-143

**Observação:** "Shell app provides consistent navigation" / "Each portal maintains its own internal routing" / "Seamless transitions between applications"

**Interpretação:** Afirma navegação no shell e roteamento interno nos remotes. As rotas do shell (#12), o `Layout` com a barra de navegação (apps/shell/src/components/Layout.tsx:8-13, 30-48, 54) e as rotas internas dos remotes sob o `BrowserRouter` do shell (apps/sales-portal/src/App.tsx:11-18) confirmam a afirmação.

### 45. ARCHITECTURE_DOCUMENTATION.md:152-153

**Observação:** "**Vite**: Build tool and dev server" / "**@originjs/vite-plugin-federation**: Module Federation implementation for Vite"

**Interpretação:** Nomeia o Vite e o plugin de federação, os mesmos declarados (#1 a #4) e configurados (#5 a #8) nas quatro unidades.

### 46. ARCHITECTURE_DOCUMENTATION.md:167

**Observação:** "**Concurrently**: Run multiple dev servers"

**Interpretação:** Nomeia a ferramenta que sobe os servidores de desenvolvimento. O `dev` da raiz usa `concurrently` (package.json:11, 34), o que confirma a afirmação. Não é mecanismo de composição.

### 47. ARCHITECTURE_DOCUMENTATION.md:175

**Observação:** "Independent release cycles"

**Interpretação:** Afirma ciclos de release independentes. Não há registro de releases, e as quatro versões `1.0.0` não são usadas em publicação (#26 a #29). A afirmação fica sem corroboração.

### 48. ARCHITECTURE_DOCUMENTATION.md:197-203

**Observação:** Diagrama: "Production Environment: ├── shell.insurance-platform.com # Host application ├── sales.insurance-platform.com # Sales portal [...]"

**Interpretação:** Descreve um domínio de produção por aplicação. Nenhum desses domínios aparece em configuração do snapshot, e não há artefato de deploy (#26 a #29). A afirmação fica sem corroboração.

### 49. ARCHITECTURE_DOCUMENTATION.md:207

**Observação:** "Module Federation loads remotes from their respective domains"

**Interpretação:** Afirma que o host busca cada remote na origem dele. O shell busca cada `remoteEntry.js` na porta do remote correspondente (#7; #23, #24, #25), mas os domínios de produção a que a frase se refere não têm artefato. A afirmação é corroborada em parte.

### 50. ARCHITECTURE_DOCUMENTATION.md:208-209

**Observação:** "Rollback capabilities per application" / "Blue-green deployments possible"

**Interpretação:** Afirma rollback e deploy blue-green por aplicação. Não há pipeline nem configuração de hospedagem no snapshot (#26 a #29). A afirmação fica sem corroboração.

### 51. ARCHITECTURE_DOCUMENTATION.md:237

**Observação:** "Decomposition by business domain"

**Interpretação:** Afirma unidades recortadas por domínio de negócio. As quatro unidades (#17 a #20) e o Dashboard do shell, que apresenta os três remotes como vendas, subscrição e produtos (apps/shell/src/components/Dashboard.tsx:6-28), confirmam a afirmação.

### 52. ARCHITECTURE_DOCUMENTATION.md:243

**Observação:** "Shared dependencies optimization" (Module Federation Pattern)

**Interpretação:** Afirma dependências compartilhadas pela federação. As quatro configurações compartilham `react`, `react-dom` e `react-router-dom` (#5 a #8), o que confirma a afirmação.

### 53. ARCHITECTURE_DOCUMENTATION.md:253

**Observação:** "Route-based micro-frontend loading"

**Interpretação:** Afirma carga dos micro-frontends por rota. A tabela de rotas do shell (#12) liga cada prefixo a um wrapper com `lazy` (#9, #10, #11), o que confirma a afirmação.

### 54. DEPLOYMENT_GUIDE.md:20-21

**Observação:** "Shared packages must be built before individual applications" / "Applications have interdependencies that affect build order"

**Interpretação:** Afirma uma ordem de build entre pacotes e aplicações. O `build` da raiz constrói `shared-types` e `shared-ui` antes das aplicações (package.json:16-18), e os pacotes publicam `dist/index.js` (packages/shared-types/package.json:5; packages/shared-ui/package.json:5), o que confirma a afirmação. As interdependências são com os pacotes, não entre unidades.

### 55. NAVIGATION_AND_EMBEDDING.md:12-16

**Observação:** "Shell app renders `<SalesPortal />` component" / "Module Federation dynamically imports the Sales app from `http://localhost:3001/remoteEntry.js`" / "Sales app renders WITHIN the shell - no page reload, no redirect"

**Interpretação:** Descreve o fluxo de carga do sales-portal dentro do shell. O fluxo confere com a relação #24, mas o endereço não: o shell busca `http://localhost:3001/dist/assets/remoteEntry.js` (#7). A configuração desmente a afirmação nesse ponto.

### 56. NAVIGATION_AND_EMBEDDING.md:74

**Observação:** "Each portal supports **dual routing** for both modes"

**Interpretação:** Afirma rotas para os modos embutido e standalone. Os três remotes declaram rotas sem prefixo e com o prefixo da rota do shell (apps/sales-portal/src/App.tsx:12-17; apps/underwriter-portal/src/App.tsx:12-17; apps/product-config/src/App.tsx:10-11), o que confirma a afirmação, e as relações #24 e #25 registram esse arranjo.

### 57. NAVIGATION_AND_EMBEDDING.md:93

**Observação:** "Internal navigation adapts based on context"

**Interpretação:** Afirma navegação interna que muda conforme o remote roda no shell ou sozinho. Os Dashboards do sales-portal e do underwriter-portal detectam o prefixo na URL e montam os links com ele (apps/sales-portal/src/components/Dashboard.tsx:12-14, 79, 84; apps/underwriter-portal/src/components/Dashboard.tsx:12-14, 73, 78), o que confirma a afirmação.

### 58. NAVIGATION_AND_EMBEDDING.md:108-111

**Observação:** "User logs in to Shell App" / "User stays logged in for ALL portals (shared session)" / "No additional logins required for individual portals"

**Interpretação:** Afirma login no shell com sessão compartilhada entre as unidades. O shell monta as rotas sem tela de entrada (apps/shell/src/App.tsx:11-18; apps/shell/src/main.tsx:7-13), nenhuma unidade tem sessão, e TODO.md:8-13 lista a autenticação e o "Token sharing across microfrontends" como por fazer. O snapshot desmente a afirmação.

### 59. NAVIGATION_AND_EMBEDDING.md:173

**Observação:** "**Performance Isolation**: Poor performance in one portal doesn't affect others"

**Interpretação:** Afirma isolamento de desempenho entre os portais. Eles rodam na mesma página do shell, com React compartilhado (#5 a #8), e o snapshot não tem medição nem mecanismo de isolamento. A afirmação fica sem corroboração.

### 60. NAVIGATION_AND_EMBEDDING.md:179-185

**Observação:** Diagrama: "Production URLs: ├── app.insurance.com # Shell app ├── sales.insurance.com # Sales portal (for Module Federation) [...]"

**Interpretação:** Descreve endereços de produção por aplicação, diferentes dos de ARCHITECTURE_DOCUMENTATION.md:197-203 (#48). Nenhum aparece em configuração do snapshot. A afirmação fica sem corroboração.

### 61. README.md:7

**Observação:** "each business domain (Sales, Underwriting, Employer Services, Product Configuration, and Service Provider) operates as an independent application"

**Interpretação:** Afirma cinco domínios, cada um uma aplicação independente. O snapshot tem um shell e três remotes (#17 a #20), e o shell declara só três remotes (#7); `employer-portal` e `service-provider` não existem. O snapshot desmente a afirmação.

### 62. README.md:119-120

**Observação:** "This starts all 6 applications simultaneously: - Shell (3000), Sales (3001), Underwriter (3002), Employer (3003), Product (3004), Service (3005)"

**Interpretação:** Afirma que o `dev` sobe seis aplicações. O `dev` da raiz sobe quatro (package.json:11), sem Employer nem Service. O snapshot desmente a afirmação.

### 63. README.md:150-156

**Observação:** "Build individual applications: [...] cd apps/sales-portal && npm run build [...] Preview production build"

**Interpretação:** Afirma build e preview por aplicação. O sales-portal tem build separado (#27) e scripts `build` e `preview` próprios (apps/sales-portal/package.json:7-8), o que confirma a afirmação.

### 64. README.md:247-250

**Observação:** "Add to shell application: - Add remote reference in `apps/shell/vite.config.ts` - Add route in `apps/shell/src/App.tsx` - Add navigation item in `apps/shell/src/components/Layout.tsx`" (um remote novo exige mudar o shell)

**Interpretação:** Afirma que um remote novo exige mudar o host em três lugares. A declaração dos remotes (#7), a tabela de rotas (#12) e o menu (apps/shell/src/components/Layout.tsx:8-13) são os pontos que ligam cada remote ao shell nas relações #23, #24 e #25, o que confirma a afirmação.

### 65. ac5fbbc 2025-07-07 (DEPLOYMENT_GUIDE.md, ARCHITECTURE_DOCUMENTATION.md, NAVIGATION_AND_EMBEDDING.md, apps/shell/vite.config.ts); dde74e6 2025-07-07 (README.md)

**Observação:** Nenhum dos dois commits cria ou remove `vercel.json`, workflow, Dockerfile ou outro arquivo de deploy, e nenhum commit remove arquivo. Os documentos de deploy e a configuração do shell aparecem juntos em `ac5fbbc` e não mudam depois. Resultado: `esclarecido`.

**Interpretação:** O histórico não registra um estágio com deploy configurado que tenha sido abandonado: as URLs de `localhost` e os planos de publicação coexistem desde a primeira presença observável. Explica o deploy independente sem artefato das afirmações #31, #33 e #49.

### 66. ac5fbbc 2025-07-07 (apps/*/package.json, apps/, packages/shared-types/src/index.ts)

**Observação:** Os `package.json` das quatro aplicações, os fontes de `apps/` e `packages/shared-types/src/index.ts` são criados em `ac5fbbc` e não mudam depois. Não há import de `@insurance/shared-types` removido. Resultado: `esclarecido`.

**Interpretação:** A declaração sem import já está na primeira presença observável; o pacote nunca foi usado pelas outras três aplicações no histórico. Explica a afirmação #40.

### 67. ac5fbbc 2025-07-07 (NAVIGATION_AND_EMBEDDING.md, apps/shell/vite.config.ts)

**Observação:** O documento e a configuração do shell são criados no mesmo commit e não mudam depois. Não há versão da configuração com o caminho que o documento cita. Resultado: `esclarecido`.

**Interpretação:** Os dois caminhos do `remoteEntry.js` coexistem desde a primeira presença observável; não houve uma configuração anterior com o caminho do documento. Explica a afirmação #55 e o endereço da configuração #7.

### 68. TODO.md:8-13

**Observação:** O próprio snapshot lista a autenticação JWT e o "Token sharing across microfrontends" como itens por fazer (`- [ ]`). Sem commits consultados para o ponto. Resultado: `resolvido pelo snapshot`.

**Interpretação:** A sessão compartilhada é plano, não algo implementado e retirado. Explica a afirmação #58.

### 69. ac5fbbc 2025-07-07 (apps/, context.md); dde74e6 2025-07-07 (README.md)

**Observação:** Nenhum commit cria ou remove arquivo em `apps/employer-portal` ou `apps/service-provider`; as únicas aplicações do histórico são as quatro criadas em `ac5fbbc`. `context.md`, que lista as seis, é criado em `ac5fbbc` e não muda. O `README.md` é alterado em `dde74e6`, e a versão anterior não está no clone. Resultado: `esclarecido`.

**Interpretação:** As duas aplicações nunca existiram no histórico do repositório, e não houve estágio com seis aplicações reduzido a quatro. Explica as afirmações #61 e #62.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/product-config/package.json:23) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 2 | 3.4.2 (apps/sales-portal/package.json:23) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 3 | 3.4.2 (apps/shell/package.json:24) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 4 | 3.4.2 (apps/underwriter-portal/package.json:23) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 5 | 3.4.2 (apps/product-config/package.json:23, Evidência); 3.4.3 (apps/product-config, Marcadores e Build); 3.4.4 (apps/shell/src/components/ProductConfig.tsx:5, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #12, #23 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #23 |
| 6 | 3.4.2 (apps/sales-portal/package.json:23, Evidência); 3.4.3 (apps/sales-portal, Marcadores e Build); 3.4.4 (apps/shell/src/components/SalesPortal.tsx:5, Observação); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #12, #23 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #24 |
| 7 | 3.4.2 (apps/shell/package.json:24, Evidência); 3.4.3 (apps/shell, Marcadores e Build); 3.4.4 (apps/shell/src/components/ProductConfig.tsx:5, apps/shell/src/components/SalesPortal.tsx:5, apps/shell/src/components/UnderwriterPortal.tsx:5, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1, #2, #4 (Onde é servida); 3.4.6 #3 (Artefatos); 3.4.7 #2, #20, #23, #26, #32, #35 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #19; configura #23; configura #24; configura #25 |
| 8 | 3.4.2 (apps/underwriter-portal/package.json:23, Evidência); 3.4.3 (apps/underwriter-portal, Marcadores e Build); 3.4.4 (apps/shell/src/components/UnderwriterPortal.tsx:5, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #12, #23 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #25 |
| 9 | 3.4.4 (apps/shell/src/components/ProductConfig.tsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #23 |
| 10 | 3.4.4 (apps/shell/src/components/SalesPortal.tsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #24 |
| 11 | 3.4.4 (apps/shell/src/components/UnderwriterPortal.tsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #25 |
| 12 | 3.4.4 (apps/shell/src/App.tsx:12) | 3 código | código-fonte | — | arquitetural | forte | implementa #23; implementa #24; implementa #25 |
| 13 | 3.4.4 (apps/shell/src/components/ProductConfig.tsx:75) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #23 |
| 14 | 3.4.4 (apps/shell/src/components/SalesPortal.tsx:84) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #24 |
| 15 | 3.4.4 (apps/shell/src/components/UnderwriterPortal.tsx:75) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #25 |
| 16 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 17 | 3.4.3 (apps/product-config) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (apps/sales-portal) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.3 (apps/underwriter-portal) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.3 (packages/shared-types) | 4 estrutura | diretório | — | contexto | fraca | — |
| 22 | 3.4.3 (packages/shared-ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 23 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #19; liga #17 |
| 24 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #19; liga #18 |
| 25 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #19; liga #20 |
| 26 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #17 |
| 27 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #18 |
| 28 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #19 |
| 29 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #20 |
| 30 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #23; corrobora #24; corrobora #25 |
| 31 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #17; corrobora em parte #18; corrobora em parte #19; corrobora em parte #20; corrobora em parte #7 |
| 32 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora package.json:12-15 |
| 33 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #26; corrobora em parte #27; corrobora em parte #28; corrobora em parte #29 |
| 34 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 35 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #11; corrobora #13; corrobora #14; corrobora #15; corrobora #23; corrobora #24; corrobora #25 |
| 36 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora pnpm-workspace.yaml:1-3; corrobora package.json:6-9 |
| 37 | 3.4.7 #8 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #9; corrobora #10; corrobora #11; corrobora #23; corrobora #24; corrobora #25 |
| 38 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #18; corrobora apps/sales-portal/package.json:6; corrobora apps/sales-portal/src/App.tsx:12-14 |
| 39 | 3.4.7 #10 | 7 documentação | documentação | — | contexto | fraca | corrobora #22; corrobora apps/shell/src/components/Dashboard.tsx:3; corrobora apps/sales-portal/src/App.tsx:3; corrobora apps/underwriter-portal/src/App.tsx:3; corrobora apps/product-config/src/App.tsx:3 |
| 40 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/sales-portal/src/components/QuotesList.tsx:3; contradiz apps/sales-portal/src/components/PoliciesList.tsx:3; contradiz apps/shell/package.json:16 |
| 41 | 3.4.7 #12 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #5; corrobora #6; corrobora #8; corrobora #23; corrobora #24; corrobora #25 |
| 42 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora package.json:18; corrobora apps/shell/package.json:10-28 |
| 43 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #15; corrobora apps/shell/src/components/SalesPortal.tsx:4-28 |
| 44 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora apps/shell/src/components/Layout.tsx:8-13; corrobora apps/sales-portal/src/App.tsx:11-18 |
| 45 | 3.4.7 #16 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #7; corrobora #8 |
| 46 | 3.4.7 #17 | 7 documentação | documentação | — | contexto | fraca | corrobora package.json:11 |
| 47 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 48 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 49 | 3.4.7 #20 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora em parte #7; corrobora em parte #23; corrobora em parte #24; corrobora em parte #25 |
| 50 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 51 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora apps/shell/src/components/Dashboard.tsx:6-28 |
| 52 | 3.4.7 #23 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #5; corrobora #6; corrobora #7; corrobora #8 |
| 53 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #9; corrobora #10; corrobora #11 |
| 54 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:16-18; corrobora packages/shared-types/package.json:5; corrobora packages/shared-ui/package.json:5 |
| 55 | 3.4.7 #26 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #7 |
| 56 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/sales-portal/src/App.tsx:12-17; corrobora apps/underwriter-portal/src/App.tsx:12-17; corrobora apps/product-config/src/App.tsx:10-11 |
| 57 | 3.4.7 #28 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/sales-portal/src/components/Dashboard.tsx:12-14; corrobora apps/underwriter-portal/src/components/Dashboard.tsx:12-14 |
| 58 | 3.4.7 #29 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/src/App.tsx:11-18; contradiz apps/shell/src/main.tsx:7-13; contradiz TODO.md:8-13 |
| 59 | 3.4.7 #30 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 60 | 3.4.7 #31 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 61 | 3.4.7 #32 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #17; contradiz #18; contradiz #19; contradiz #20; contradiz #7 |
| 62 | 3.4.7 #33 | 7 documentação | documentação | — | arquitetural | fraca | contradiz package.json:11 |
| 63 | 3.4.7 #34 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27; corrobora apps/sales-portal/package.json:7-8 |
| 64 | 3.4.7 #35 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #12; corrobora apps/shell/src/components/Layout.tsx:8-13 |
| 65 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #31; explica #33; explica #49 |
| 66 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #40 |
| 67 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #55; explica #7 |
| 68 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #58 |
| 69 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #61; explica #62 |

## Resumo

Observações: 69. Dimensões (tecnologia: 4, configuração: 4, código: 7, estrutura: 7, composição: 3, build-deploy: 4, documentação: 35, histórico: 5). Força (forte: 8, moderada: 14, fraca: 47, ambígua: 0). Evidência (tecnológica: 9, arquitetural: 53, contexto: 7).
