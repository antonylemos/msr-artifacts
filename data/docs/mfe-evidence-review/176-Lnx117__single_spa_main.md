---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
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

# 176 — Lnx117/single_spa_main

## Leitura do repositório

O snapshot tem seis arquivos e só uma unidade, o root config single-spa na raiz, um projeto Vite (#10). Os dois microfrontends que ele compõe, `menu` e `base`, estão em outros repositórios e só aparecem como URLs de dev servers em `localhost`.

A cadeia que sustenta a arquitetura está toda no root:
- **Dependências:** `single-spa` e `vite-plugin-single-spa` são declarados e usados (#1, #2).
- **Configuração:** o plugin é configurado em modo `type: 'root'` (#3), e o `.envtest` dá as URLs de `menu` e `base` (#4).
- **Código:** os registros `menu` e `base` nomeiam as unidades externas (#5, #6), as funções de carga trazem os lifecycles por `import()` das URLs das variáveis de ambiente (#7, #8), e `start()` inicia o orquestrador (#9).
- **Relações:** daí saem duas relações root-config → application, ativas e com destino fora do snapshot (#11, #12).

O build é próprio do root, sem deploy no repositório (#13).

A ressalva é de execução: o código diz que as URLs vêm de `.env`/`.env.local`, mas o único arquivo versionado com elas é `.envtest`, que o Vite não carrega por padrão (#4, #20). O histórico não explica a diferença, porque os dois arquivos chegam juntos no único commit (#27). Isso não muda as relações: o alvo de cada registro é nomeado no código e a URL está declarada no snapshot.

A documentação está toda nos comentários, em russo, de `.envtest`, `src/main.ts` e `vite.config.ts`. Ela confirma o papel do root e dos registros (#15, #17–#19, #21–#25). Ficam confirmadas só em parte as afirmações que dependem dos microfrontends ausentes ou de arquivos não versionados: o dev server Vite de cada microfrontend (#14), os arquivos `.env` (#20) e a isolação de CSS (#26). Os builds num CDN não têm artefato (#16). Nada fica ambíguo no snapshot. O que não se observa é o próprio lado dos microfrontends.

Configuração: ficaram 2 blocos. `vite.config.ts` serve uma única unidade e entrou pelo plugin single-spa (#3). O `.envtest` entrou pelas URLs dos microfrontends (#4). Ficaram de fora:
- o bloco `server` de `vite.config.ts:17-22`, com a porta 9080 do dev server, citada em 3.4.6 #1 (Onde é servida) e em 3.4.7 #1 (Evidência), e o alias `@` de `vite.config.ts:23-29`;
- os `scripts` de `package.json:6-10`, que são build e servidor de desenvolvimento (dimensão 6);
- `index.html`, que não é arquivo de configuração: os contêineres e a entrada estão nas observações de código e de estrutura (#5, #6, #10).

## Observações

### 1. package.json:16

**Observação:** `single-spa` `^6.0.3` em `dependencies`. A revisão o marca como configurado, pelo import em src/main.ts:3, pelos `registerApplication` em src/main.ts:13-17 e 21-25 e pelo `start()` em src/main.ts:29.

**Interpretação:** O root declara o orquestrador single-spa e o usa na entrada.

### 2. package.json:20

**Observação:** `vite-plugin-single-spa` `^1.1.0` em `devDependencies`. A revisão o marca como configurado, pelo import em vite.config.ts:3 e pela chamada em `plugins` (vite.config.ts:12-15), carregada pelos scripts `vite` e `vite build` (package.json:7-8).

**Interpretação:** O root declara o plugin Vite do single-spa e o usa na própria configuração de build.

### 3. vite.config.ts:3; vite.config.ts:12-15

**Observação:** `vitePluginSingleSpa({ type: 'root', cssStrategy: 'multiMife' })` na lista `plugins` do `defineConfig` (vite.config.ts:5-16), importado de `vite-plugin-single-spa`. O arquivo não declara remotes nem URLs.

**Interpretação:** A configuração põe o projeto no papel de root config do single-spa e define a estratégia de CSS para várias aplicações. Configura o mecanismo na unidade, sem nomear as outras.

### 4. .envtest:8; .envtest:11; .envtest:2-4

**Observação:** `VITE_MENU=http://localhost:9083/src/index.ts` e `VITE_BASE=http://localhost:9081/src/index.ts`, com os comentários de que cada microfrontend é um dev server Vite na sua porta e de que `main.ts` faz `import()` dessas URLs para carregar os lifecycles `bootstrap`, `mount` e `unmount`. O arquivo se chama `.envtest`; o comentário de src/main.ts:5-6 fala em `.env`/`.env.local`, que não estão no snapshot.

**Interpretação:** O arquivo declara os endereços pelos quais o root resolve as duas unidades externas, `menu` e `base`. O nome do arquivo é uma ressalva de execução local: o Vite não o carrega por padrão.

### 5. src/main.ts:13-17; src/main.ts:3; index.html:12

**Observação:** `registerApplication({ name: 'menu', app: () => import(env.VITE_MENU), activeWhen: '/' })`, com `registerApplication` importado de `single-spa`. A página tem o contêiner `single-spa-application:menu` dentro do `<nav>`.

**Interpretação:** O root registra pelo nome a aplicação externa `menu`, ativa em todas as rotas, e define onde ela monta.

### 6. src/main.ts:21-25; index.html:17

**Observação:** `registerApplication({ name: 'base', app: () => import(env.VITE_BASE), activeWhen: '/' })`. A página tem o contêiner `single-spa-application:base` dentro de `<main>`.

**Interpretação:** O root registra pelo nome a aplicação externa `base`, também ativa em todas as rotas, ao lado de `menu`.

### 7. src/main.ts:15; src/main.ts:7; .envtest:8

**Observação:** `app: () => import(/* @vite-ignore */ env.VITE_MENU)`, com `env` lido de `import.meta.env`. O valor de `VITE_MENU` no snapshot só está em `.envtest`.

**Interpretação:** A função de carga do registro `menu` traz em runtime os lifecycles do microfrontend externo pela URL da variável de ambiente.

### 8. src/main.ts:23; .envtest:11

**Observação:** `app: () => import(/* @vite-ignore */ env.VITE_BASE)`. O valor de `VITE_BASE` no snapshot só está em `.envtest`.

**Interpretação:** A função de carga do registro `base` traz em runtime os lifecycles do microfrontend externo pela URL da variável de ambiente.

### 9. src/main.ts:29; src/main.ts:3

**Observação:** `start()`, importado de `single-spa`.

**Interpretação:** Inicia o orquestrador. Sem ele os registros de `menu` e `base` não montam.

### 10. .; index.html:20; vite.config.ts:5-16; package.json:8

**Observação:** Projeto Vite na raiz, com `package.json`, página de entrada `index.html` que carrega `/src/main.ts`, configuração Vite com o plugin single-spa e build `vite build`, sem workspace.

**Interpretação:** É a única unidade frontend do snapshot, o root config, com limite próprio.

### 11. src/main.ts:13; src/main.ts:15; src/main.ts:29; .envtest:8; vite.config.ts:12-15

**Observação:** O root `.` registra `menu` no single-spa, carrega os lifecycles por `import()` da URL `http://localhost:9083/src/index.ts` e inicia o orquestrador, com o plugin em `type: 'root'`. O destino não está no snapshot.

**Interpretação:** É uma relação root-config → application ativa, com destino externo.

### 12. src/main.ts:21; src/main.ts:23; src/main.ts:29; .envtest:11; vite.config.ts:12-15

**Observação:** O root `.` registra `base`, carrega os lifecycles por `import()` da URL `http://localhost:9081/src/index.ts` e inicia o orquestrador. O destino não está no snapshot, e a aplicação é montada em paralelo com `menu`.

**Interpretação:** É uma relação root-config → application ativa, com destino externo.

### 13. package.json:8; vite.config.ts:5-16

**Observação:** `"build": "vite build"` na raiz, com a configuração do root config. Os `import()` dos microfrontends têm `@vite-ignore` e são resolvidos em runtime (src/main.ts:15, 23). Não há artefato de deploy; `dev` e `preview` são comandos de desenvolvimento, e a versão `1.0.0` não é usada em publicação.

**Interpretação:** O root tem build próprio, que não inclui os microfrontends, sem deploy observado nem versionamento independente.

### 14. .envtest:2

**Observação:** "В dev-режиме каждый микрофронт — отдельный Vite dev-сервер на своём порту." (No modo dev, cada microfront é um dev server Vite separado, na sua própria porta.)

**Interpretação:** Afirma que cada microfrontend roda à parte, num servidor próprio. As portas distintas confirmam a separação; que cada servidor seja um Vite fica sem artefato. A afirmação é corroborada em parte.

### 15. .envtest:3-4

**Observação:** "main.ts делает import() по этим URL, чтобы загрузить lifecycle-хуки (bootstrap, mount, unmount) каждого микрофронта." (main.ts faz import() dessas URLs para carregar os hooks de lifecycle de cada microfront.)

**Interpretação:** Afirma como o root carrega os microfrontends. A afirmação é corroborada pelos `import()` das funções de carga.

### 16. .envtest:5

**Observação:** "А потом уже можно использовать билды по типу VITE_MENU_URL=https://test-cdn.breez.ru/bt/menu/index.js" (Depois já se podem usar builds do tipo VITE_MENU_URL=…)

**Interpretação:** Afirma um passo futuro, com os microfrontends publicados num CDN. Nenhum artefato do snapshot faz esse build nem aponta para o endereço, e a afirmação fica sem corroboração.

### 17. .envtest:7

**Observação:** "Навигационное меню" (Menu de navegação), rótulo de `VITE_MENU`.

**Interpretação:** Afirma o papel da unidade `menu` na página. A afirmação é corroborada pelo registro e pelo contêiner no `<nav>`.

### 18. .envtest:10

**Observação:** "Основной контент страниц" (Conteúdo principal das páginas), rótulo de `VITE_BASE`.

**Interpretação:** Afirma o papel da unidade `base` na página. A afirmação é corroborada pelo registro e pelo contêiner em `<main>`.

### 19. src/main.ts:1-2

**Observação:** "Root config single-spa — точка входа, которая регистрирует и запускает все микрофронтенды приложения." (Root config single-spa — ponto de entrada que registra e inicia todos os microfrontends da aplicação.)

**Interpretação:** Afirma que o arquivo é a entrada do root config e registra e inicia os microfrontends. A afirmação é corroborada.

### 20. src/main.ts:5-6

**Observação:** "URL-адреса микрофронтендов берутся из переменных окружения Vite (файл .env / .env.local), чтобы легко переключать адреса между dev/prod." (As URLs dos microfrontends vêm das variáveis de ambiente do Vite (arquivo .env / .env.local), para trocar facilmente os endereços entre dev/prod.)

**Interpretação:** Afirma de onde vêm as URLs dos microfrontends. A leitura por variável de ambiente é confirmada; os arquivos `.env`/`.env.local` e a troca dev/prod ficam sem artefato. A afirmação é corroborada em parte.

### 21. src/main.ts:10

**Observação:** "activeWhen: '/' — монтируется на всех маршрутах (всегда виден)." (activeWhen: '/' — é montado em todas as rotas (sempre visível).)

**Interpretação:** Afirma quando a unidade `menu` é montada. A afirmação é corroborada.

### 22. src/main.ts:20

**Observação:** "Тоже активен на '/', т.е. отображается параллельно с menu." (Também ativo em '/', isto é, exibido em paralelo com menu.)

**Interpretação:** Afirma que `base` e `menu` são exibidas juntas. A afirmação é corroborada.

### 23. src/main.ts:27-28

**Observação:** "Запуск single-spa: начинает слушать изменения URL и монтировать/размонтировать зарегистрированные микрофронтенды." (Início do single-spa: começa a escutar mudanças de URL e a montar/desmontar os microfrontends registrados.)

**Interpretação:** Afirma o papel de `start()`. A afirmação é corroborada.

### 24. vite.config.ts:7

**Observação:** "Интеграция с single-spa — микрофронтендовым оркестратором." (Integração com single-spa, orquestrador de microfrontends.)

**Interpretação:** Nomeia a tecnologia do plugin. A afirmação é corroborada.

### 25. vite.config.ts:8-9

**Observação:** "type: 'root' — этот проект является корневым (root config), т.е. он загружает и монтирует дочерние микрофронтенды." (type: 'root' — este projeto é o raiz (root config), isto é, carrega e monta os microfrontends filhos.)

**Interpretação:** Afirma que o projeto é o root que compõe os microfrontends. A afirmação é corroborada pela opção do plugin e pelas relações.

### 26. vite.config.ts:10-11

**Observação:** "cssStrategy: 'multiMife' — изоляция CSS между микрофронтендами, чтобы стили одного приложения не ломали другое." (cssStrategy: 'multiMife' — isolação de CSS entre os microfrontends, para que os estilos de uma aplicação não quebrem a outra.)

**Interpretação:** Afirma o efeito de uma opção do plugin. A opção está configurada; a isolação depende dos microfrontends ausentes e fica sem artefato. A afirmação é corroborada em parte.

### 27. 112c73b 2026-03-14 (src/main.ts; .envtest)

**Observação:** `src/main.ts`, com o comentário sobre `.env`/`.env.local`, e `.envtest`, com os valores de `VITE_MENU` e `VITE_BASE`, chegam juntos no único commit, que é o snapshot. Nenhum `.env` ou `.env.local` aparece no histórico, nem como arquivo removido.

**Interpretação:** O histórico não diz se `.envtest` é um `.env` renomeado para ser versionado ou uma cópia de exemplo de um arquivo mantido fora do repositório. A dúvida é sobre a origem do arquivo; no snapshot, as URLs estão declaradas e as relações seguem ativas.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:16) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #5; declara #6; declara #9 |
| 2 | 3.4.2 (package.json:20) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #3 |
| 3 | 3.4.2 (package.json:20, Evidência); 3.4.3 (., Build); 3.4.5 #1, #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #11, #12, #13 (Evidência) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #10; configura #11; configura #12 |
| 4 | 3.4.4 (src/main.ts:15, :23, Observação); 3.4.5 #1, #2 (Configuração); 3.4.7 #1, #7 (Evidência) | 2 configuração | configuração | single-spa | arquitetural | forte | configura #11; configura #12; configura #7; configura #8 |
| 5 | 3.4.4 (src/main.ts:13) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #11 |
| 6 | 3.4.4 (src/main.ts:21) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #12 |
| 7 | 3.4.4 (src/main.ts:15) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #11 |
| 8 | 3.4.4 (src/main.ts:23) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #12 |
| 9 | 3.4.4 (src/main.ts:29) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #11; implementa #12 |
| 10 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.5 #1 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #10 |
| 12 | 3.4.5 #2 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #10 |
| 13 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #10 |
| 14 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #4; corrobora em parte #11; corrobora em parte #12 |
| 15 | 3.4.7 #2 | 7 documentação | comentário | single-spa | tecnológica | fraca | corrobora #7; corrobora #8; corrobora #11; corrobora #12 |
| 16 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | — |
| 17 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #5; corrobora #11 |
| 18 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #6; corrobora #12 |
| 19 | 3.4.7 #6 | 7 documentação | comentário | single-spa | arquitetural | fraca | corrobora #10; corrobora #5; corrobora #6; corrobora #9; corrobora #11; corrobora #12 |
| 20 | 3.4.7 #7 | 7 documentação | comentário | — | tecnológica | fraca | corrobora em parte #7; corrobora em parte #8; corrobora em parte #4 |
| 21 | 3.4.7 #8 | 7 documentação | comentário | single-spa | arquitetural | fraca | corrobora #5; corrobora #11 |
| 22 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #6; corrobora #12 |
| 23 | 3.4.7 #10 | 7 documentação | comentário | single-spa | tecnológica | fraca | corrobora #9 |
| 24 | 3.4.7 #11 | 7 documentação | comentário | single-spa | tecnológica | fraca | corrobora #2; corrobora #3 |
| 25 | 3.4.7 #12 | 7 documentação | comentário | single-spa | arquitetural | fraca | corrobora #3; corrobora #11; corrobora #12 |
| 26 | 3.4.7 #13 | 7 documentação | comentário | — | tecnológica | fraca | corrobora em parte #3 |
| 27 | 3.4.8 #1 | 8 histórico | histórico | — | tecnológica | fraca | explica #4; explica #20 |

## Resumo

Observações: 27. Dimensões (tecnologia: 2, configuração: 2, código: 5, estrutura: 1, composição: 2, build-deploy: 1, documentação: 13, histórico: 1). Força (forte: 5, moderada: 6, fraca: 16, ambígua: 0). Evidência (tecnológica: 12, arquitetural: 15, contexto: 0).
