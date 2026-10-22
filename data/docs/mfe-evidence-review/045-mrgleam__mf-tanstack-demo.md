---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
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
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Leitura do repositório

A cadeia de Module Federation está completa até a carga do módulo:
- **Dependência:** `@originjs/vite-plugin-federation`, nas duas aplicações (#1, #2).
- **Configuração:** o shell declara o remote `shop` (#3), e o shop se declara e expõe as próprias rotas (#4).
- **Código:** o shell importa o módulo remoto pelo nome (#5), num registro de módulos com cache e fallback (#6), e pede esse módulo ao criar o router (#7).
- **Relação:** isso resulta na relação ativa shell → shop (#11).

A ambiguidade está no passo seguinte. O shell lê `default.routes`, e o shop só exporta `routes` por nome (#8). O módulo é carregado, mas nada garante que as rotas cheguem à árvore. A documentação afirma que chegam, e os artefatos a desmentem (#18). O histórico não diz se houve uma versão compatível (#21).

Também é contradito o "retry logic" do carregador (#20): as tentativas aguardam a mesma promessa. O histórico mostra que nunca houve uma versão em que o retry funcionasse (#22).

Build é separado para as duas aplicações (#12, #13). O deploy não é observado: os dois arranjos de Kong só encaminham para servidores locais.

## Observações

### 1. shell/package.json:16

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell.

### 2. shop/package.json:17

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shop.

### 3. shell/vite.config.ts:1-34

**Observação:** `federation` declara o remote `shop: 'http://localhost:3001/shop/assets/remoteEntry.js'` e compartilha `react`, `react-dom` e `@tanstack/react-router`.

**Interpretação:** A configuração do host declara o remote e onde encontrá-lo em desenvolvimento.

### 4. shop/vite.config.ts:1-30

**Observação:** `base: '/shop/'`. `federation` declara `name: 'shop'` e `filename: 'remoteEntry.js'`, expõe `./ShopRoutes` (`./src/routes/ShopRoutes.tsx`) e compartilha as mesmas bibliotecas.

**Interpretação:** O shop está configurado como remote, sob um caminho próprio, e oferece suas rotas a um host.

**Nota:** As configurações do Kong (`kong-shell/kong.yml`, `kong-remote/kong.yml`), citadas na tabela da revisão de build e deploy (3.4.6), são rotas de gateway, ou seja, caminhos de publicação. Elas ficam na dimensão 6, e não aqui.

### 5. shell/src/moduleLoader.ts:130

**Observação:** `module: import('shop/ShopRoutes')`, dentro de `MODULE_CONFIGS.shop`.

**Interpretação:** O shell importa o módulo exposto pelo remote, pelo nome dele.

### 6. shell/src/moduleLoader.ts:127-136

**Observação:** `MODULE_CONFIGS.shop` declara o nome `shop/ShopRoutes`, o import, `retries: 3`, `retryDelay: 1000` e o fallback `{ default: { routes: [] } }`.

**Interpretação:** O host declara o módulo remoto que usa e como seguir sem ele.

### 7. shell/src/router.tsx:49-58

**Observação:** `moduleLoader.loadModules([MODULE_CONFIGS.shop])`, chamado na criação do router.

**Interpretação:** O host pede o módulo do shop ao iniciar o roteamento.

### 8. shell/src/router.tsx:61-68; shop/src/routes/ShopRoutes.tsx:49-53

**Observação:** O shell atribui `result.module.default.routes` às rotas do shop. O módulo do shop exporta `routes` e `shopRouter` só por nome, sem export default.

**Interpretação:** A integração das rotas remotas é ambígua: o módulo é carregado, mas o formato lido não existe nele, e as rotas podem cair no fallback vazio.

### 9. shell; shell/package.json:1-9; shell/index.html:10-11; shell/src/main.tsx:6-8; shell/vite.config.ts:5-29

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 10. shop; shop/package.json:1-10; shop/index.html:10-11; shop/src/main.tsx:6-8; shop/vite.config.ts:5-25

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio, capaz de rodar sozinha.

### 11. shell/src/moduleLoader.ts:127-130; shell/src/router.tsx:52, 64; shell/vite.config.ts:9-11; shop/vite.config.ts:6, 10-12

**Observação:** O shell solicita `shop/ShopRoutes` na inicialização do router. O nome, o `remoteEntry.js` e o caminho `/shop/` correspondem à configuração do shop.

**Interpretação:** É uma relação host → remote ativa, com a integração das rotas ambígua (#8).

### 12. shell/vite.config.ts:5-34; shell/package.json:7; kong-shell/kong.yml:3-9

**Observação:** Tem configuração e `vite build` próprios. O gateway Kong só encaminha `/` para o servidor local do shell, e nada empacota ou publica o build.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 13. shop/vite.config.ts:5-30; shop/package.json:7; kong-remote/kong.yml:8-13

**Observação:** Tem configuração e `vite build` próprios, com `base: '/shop/'`. Um dos arranjos do Kong encaminha `/shop` para o servidor local do shop.

**Interpretação:** Há uma fronteira de build própria, com caminho próprio, sem deploy observado.

### 14. README.md:1

**Observação:** "Microfrontend Monorepo with Vite, TanStack Router, and Module Federation".

**Interpretação:** Apresenta o repositório como monorepo de micro-frontends com Module Federation. A afirmação é corroborada.

### 15. README.md:7-8

**Observação:** "shell/ # Host app with layout & routing / shop/ # Remote microfrontend exposing routes".

**Interpretação:** Descreve os papéis de host e remote. A afirmação é corroborada.

### 16. README.md:9-10

**Observação:** "kong-shell/ # Kong config for layout-controlled routing / kong-remote/ # Kong config for standalone remote access".

**Interpretação:** Descreve dois gateways, um só com o shell e outro que também expõe o remote. A afirmação é corroborada.

### 17. README.md:53

**Observação:** "Shared layout with always-visible NavBar".

**Interpretação:** Afirma que o shell dá o layout comum. A afirmação é corroborada.

### 18. README.md:54

**Observação:** "Remote subroutes via Module Federation".

**Interpretação:** Afirma que as sub-rotas do remote entram no shell. O formato que o shell lê não existe no módulo do shop, e a afirmação é contradita.

### 19. shell/src/moduleLoader.ts:1

**Observação:** "Module Federation Loader with caching, […] and error handling".

**Interpretação:** Afirma que o carregador tem cache e tratamento de erro. A afirmação é corroborada.

### 20. shell/src/moduleLoader.ts:1

**Observação:** "retry logic".

**Interpretação:** Afirma que o carregador tenta de novo quando a carga falha. As tentativas reaguardam a mesma promessa, e a afirmação é contradita.

### 21. 04bfb96 2025-07-30 (shop/src/routes/ShopRoutes.tsx, shell/src/router.tsx); 5633835 2025-07-30 (shell/src/router.tsx, versão ausente); 1816f5b 2025-07-30 (shell/src/router.tsx, versão ausente); a717597 2025-08-01 (shell/src/router.tsx)

**Observação:** O `ShopRoutes.tsx` não muda desde o primeiro commit e nunca teve export default. O `router.tsx` do shell mudou em quatro commits, e as versões anteriores não estão disponíveis.

**Interpretação:** Não se sabe se uma versão anterior do shell lia o export nomeado. A dúvida é só sobre o passado: no snapshot, o desencontro existe.

### 22. a717597 2025-08-01 (shell/src/moduleLoader.ts)

**Observação:** O carregador é criado no commit do snapshot e tem uma única versão.

**Interpretação:** Não houve estágio em que o retry tenha funcionado. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (shell/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #3 |
| 2 | 3.4.2 (shop/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 3 | 3.4.2 (shell/package.json:16, Evidência); 3.4.3 (shell, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #9; configura #11 |
| 4 | 3.4.2 (shop/package.json:17, Evidência); 3.4.3 (shop, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #2 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #10; configura #11 |
| 5 | 3.4.4 (shell/src/moduleLoader.ts:130) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #11 |
| 6 | 3.4.4 (shell/src/moduleLoader.ts:127) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #11 |
| 7 | 3.4.4 (shell/src/router.tsx:52) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #11 |
| 8 | 3.4.4 (shell/src/router.tsx:64) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #11 |
| 9 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 10 | 3.4.3 (shop) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #9; liga #10 |
| 12 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #9 |
| 13 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #10 |
| 14 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #1; corrobora #2 |
| 15 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora #4 |
| 16 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora kong-shell/kong.yml:3-9; corrobora kong-remote/kong.yml:8-13 |
| 17 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora shell/src/router.tsx:19-25 |
| 18 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz shop/src/routes/ShopRoutes.tsx:49-53; contradiz shell/src/router.tsx:61-68 |
| 19 | 3.4.7 #6 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #6; corrobora shell/src/moduleLoader.ts:33-40, 49-53, 61-74 |
| 20 | 3.4.7 #7 | 7 documentação | comentário | module-federation | tecnológica | fraca | contradiz shell/src/moduleLoader.ts:42-47; contradiz #5 |
| 21 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #8; explica #18 |
| 22 | 3.4.8 #2 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #20 |

## Resumo

Observações: 22. Dimensões (tecnologia: 2, configuração: 2, código: 4, estrutura: 2, composição: 1, build-deploy: 2, documentação: 7, histórico: 2). Força (forte: 5, moderada: 5, fraca: 11, ambígua: 1). Evidência (tecnológica: 6, arquitetural: 16, contexto: 0).
