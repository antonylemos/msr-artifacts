---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
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

# 176 — Lnx117/single_spa_main

## Leitura do repositório

O repositório não tem README nem outro `.md`: o `artifacts.csv` não lista nenhum arquivo `documentation`, e a mineração não tem ocorrência `doc-*`. Toda a documentação está nos comentários, em russo, de três dos seis arquivos do snapshot: `.envtest`, `src/main.ts` e `vite.config.ts`. Eles descrevem o projeto como o root config de uma aplicação single-spa que registra, carrega por `import()` e monta dois microfrontends externos, `menu` (menu de navegação) e `base` (conteúdo principal das páginas), cada um servido por um dev server Vite próprio. É o que as revisões anteriores mostram: uma única unidade no snapshot, a raiz (3.4.3), com duas relações `root-config → application` para destinos fora do snapshot (3.4.5 #1, #2). As afirmações que os artefatos não sustentam por inteiro são as que dependem dos microfrontends ausentes ou de um ambiente que não está versionado: o servidor Vite de cada microfrontend, os arquivos `.env`/`.env.local`, a troca entre dev e prod, os builds num CDN e o efeito da isolação de CSS.

Comentários lidos que não viraram linha: o título "URL микрофронтендов." (URLs dos microfrontends) (.envtest:1), que só nomeia o bloco de variáveis cujo conteúdo as linhas 1, 2, 4 e 5 cobrem; a explicação de `@vite-ignore` como supressão do aviso do Vite sobre `import()` com variável (src/main.ts:11-12), diretiva de ferramenta; os comentários do bloco `server`, sobre porta e `host: true` para acesso pela rede (vite.config.ts:19-20), detalhe de infraestrutura; e o do alias `@` para `src/` (vite.config.ts:25-26), detalhe interno da unidade. Campos descritivos: o `package.json` tem `name: "main"` e `description` vazia (package.json:2, 14); o `index.html` não tem comentários, e seu título é "MyBreez" (index.html:6). O `package-lock.json` só repete o nome do pacote. A descrição do repositório no GitHub, citada na classificação, não está no snapshot e não virou linha.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .envtest:2 | "В dev-режиме каждый микрофронт — отдельный Vite dev-сервер на своём порту." (No modo dev, cada microfront é um dev server Vite separado, na sua própria porta.) | independência | parcial | 3.4.5 #1, #2; .envtest:8, 11; vite.config.ts:18 |
| 2 | .envtest:3-4 | "main.ts делает import() по этим URL, чтобы загрузить lifecycle-хуки (bootstrap, mount, unmount) каждого микрофронта." (main.ts faz import() dessas URLs para carregar os hooks de lifecycle de cada microfront.) | composição | corroborada | 3.4.4 (src/main.ts:15, :23, `dynamic-loading`); 3.4.5 #1, #2; src/main.ts:13-25 |
| 3 | .envtest:5 | "А потом уже можно использовать билды по типу VITE_MENU_URL=https://test-cdn.breez.ru/bt/menu/index.js" (Depois já se podem usar builds do tipo VITE_MENU_URL=…) | build-deploy | sem corroboração | — |
| 4 | .envtest:7 | "Навигационное меню" (Menu de navegação) | estrutura | corroborada | 3.4.5 #1; src/main.ts:13-17; index.html:11-12 |
| 5 | .envtest:10 | "Основной контент страниц" (Conteúdo principal das páginas) | estrutura | corroborada | 3.4.5 #2; src/main.ts:21-25; index.html:16-17 |
| 6 | src/main.ts:1-2 | "Root config single-spa — точка входа, которая регистрирует и запускает все микрофронтенды приложения." (Root config single-spa — ponto de entrada que registra e inicia todos os microfrontends da aplicação.) | estrutura | corroborada | 3.4.3 (unidade `.`, coluna Entrada); 3.4.4 (src/main.ts:13, :21, :29); 3.4.5 #1, #2; index.html:20 |
| 7 | src/main.ts:5-6 | "URL-адреса микрофронтендов берутся из переменных окружения Vite (файл .env / .env.local), чтобы легко переключать адреса между dev/prod." (As URLs dos microfrontends vêm das variáveis de ambiente do Vite (arquivo .env / .env.local), para trocar facilmente os endereços entre dev/prod.) | composição | parcial | 3.4.4 (Notas); src/main.ts:7, 15, 23; .envtest:8, 11 |
| 8 | src/main.ts:10 | "activeWhen: '/' — монтируется на всех маршрутах (всегда виден)." (activeWhen: '/' — é montado em todas as rotas (sempre visível).) | composição | corroborada | 3.4.5 #1; src/main.ts:16 |
| 9 | src/main.ts:20 | "Тоже активен на '/', т.е. отображается параллельно с menu." (Também ativo em '/', isto é, exibido em paralelo com menu.) | composição | corroborada | 3.4.5 #2; src/main.ts:16, 24; index.html:12, 17 |
| 10 | src/main.ts:27-28 | "Запуск single-spa: начинает слушать изменения URL и монтировать/размонтировать зарегистрированные микрофронтенды." (Início do single-spa: começa a escutar mudanças de URL e a montar/desmontar os microfrontends registrados.) | composição | corroborada | 3.4.4 (src/main.ts:29, `runtime-composition`); src/main.ts:3, 29 |
| 11 | vite.config.ts:7 | "Интеграция с single-spa — микрофронтендовым оркестратором." (Integração com single-spa, orquestrador de microfrontends.) | composição | corroborada | 3.4.2 (vite-plugin-single-spa, Configurada `Yes`); vite.config.ts:3, 12-15 |
| 12 | vite.config.ts:8-9 | "type: 'root' — этот проект является корневым (root config), т.е. он загружает и монтирует дочерние микрофронтенды." (type: 'root' — este projeto é o raiz (root config), isto é, carrega e monta os microfrontends filhos.) | estrutura | corroborada | 3.4.5 #1, #2; vite.config.ts:13 |
| 13 | vite.config.ts:10-11 | "cssStrategy: 'multiMife' — изоляция CSS между микрофронтендами, чтобы стили одного приложения не ломали другое." (cssStrategy: 'multiMife' — isolação de CSS entre os microfrontends, para que os estilos de uma aplicação não quebrem a outra.) | composição | parcial | 3.4.2 (vite-plugin-single-spa, Configurada `Yes`); vite.config.ts:14 |

## Observações

**1. .envtest:2.** Diz que cada microfrontend roda sozinho, num dev server Vite separado e com porta própria. As portas conferem: as duas URLs do arquivo apontam para `localhost:9083` e `localhost:9081` (.envtest:8, 11), diferentes entre si e da porta 9080 do root config (vite.config.ts:18), e as revisões de composição as têm como destinos distintos (3.4.5 #1, #2). Que cada servidor seja um Vite fica sem artefato, porque os projetos `menu` e `base` não estão no snapshot. O caminho `/src/index.ts` das URLs combina com um dev server Vite, mas não mostra a ferramenta. Daí `parcial`.

**2. .envtest:3-4.** O `import()` das URLs está em src/main.ts:15 e :23, como função `app` de cada `registerApplication` (src/main.ts:13-25), e a revisão de código-fonte registra as duas cargas como `dynamic-loading` (3.4.4). Os lifecycles `bootstrap`, `mount` e `unmount` são o que o single-spa espera do retorno dessa função. O comentário fala do que o `main.ts` faz, e isso está todo no snapshot. Os módulos que exportam os hooks estão fora dele, como já registram 3.4.5 #1 e #2.

**3. .envtest:5.** Fala de um passo futuro: usar builds publicados num CDN, com uma URL de exemplo. Nenhum artefato do snapshot faz build dos microfrontends nem aponta para esse endereço; a revisão de build e deploy registrou o comentário como intenção, sem decidir com ele a coluna Deploy (3.4.6, Leitura). O nome da variável do exemplo, `VITE_MENU_URL`, não é o que o código lê, `VITE_MENU` (src/main.ts:15). Como o comentário trata de um uso futuro, isso não o desmente.

**4. .envtest:7.** O rótulo diz que a URL de `VITE_MENU` é o menu de navegação. A mesma afirmação aparece em src/main.ts:9, "Микрофронтенд «menu» — навигационное меню." (Microfrontend «menu» — menu de navegação.), que nomeia o registro. O código registra a aplicação `menu` com essa URL (src/main.ts:13-17), e a página a monta no contêiner `single-spa-application:menu` dentro do `<nav>` do `<header>` (index.html:10-14), como mostra 3.4.5 #1. O conteúdo do menu fica fora do snapshot; o papel da unidade na página está confirmado pelo ponto de montagem.

**5. .envtest:10.** O rótulo diz que a URL de `VITE_BASE` é o conteúdo principal das páginas. Repete-se em src/main.ts:19, "Микрофронтенд «base» — основное содержимое страниц." (Microfrontend «base» — conteúdo principal das páginas.). O registro `base` usa essa URL (src/main.ts:21-25) e monta no contêiner `single-spa-application:base` dentro de `<main>` (index.html:16-18; 3.4.5 #2). Como na linha 4, o conteúdo está fora do snapshot e o papel na página confere.

**6. src/main.ts:1-2.** O comentário apresenta o arquivo como o root config e a entrada que registra e inicia os microfrontends. O arquivo é a entrada da única unidade do snapshot (index.html:20; 3.4.3), registra `menu` e `base` e chama `start()` (src/main.ts:13, 21, 29; 3.4.4). "Todos" vale para os dois registros que existem; as relações de 3.4.5 #1 e #2 são as únicas da unidade. A linha 12 diz do projeto o mesmo papel, pela configuração do plugin; aqui o sujeito é o arquivo de entrada e o mecanismo é o registro.

**7. src/main.ts:5-6.** Diz que as URLs vêm das variáveis de ambiente do Vite, em `.env`/`.env.local`, para trocar endereços entre dev e prod. A leitura de `import.meta.env` está em src/main.ts:7, 15 e 23. Os arquivos citados não estão no snapshot: o único arquivo com as variáveis é `.envtest` (.envtest:8, 11), que o Vite não carrega por padrão, ressalva já anotada em 3.4.4 (Notas) e na Leitura de 3.4.5. Não há endereço de produção configurado, e a troca dev/prod fica sem artefato. A parte confirmada é a ligação por variável de ambiente; daí `parcial`.

**8. src/main.ts:10.** `activeWhen: '/'` no registro de `menu` (src/main.ts:16) faz o single-spa montá-lo em todas as rotas, como diz o comentário e registra 3.4.5 #1.

**9. src/main.ts:20.** O registro de `base` também tem `activeWhen: '/'` (src/main.ts:24), igual ao de `menu` (src/main.ts:16), e as duas aplicações têm contêineres próprios na mesma página (index.html:12, 17). Então são exibidas juntas, como diz o comentário (3.4.5 #2).

**10. src/main.ts:27-28.** Descreve o `start()` do single-spa (src/main.ts:29, importado em src/main.ts:3), que inicia o roteamento e a montagem dos registros. A revisão de código-fonte tem a chamada como `runtime-composition` e anota que sem ela os registros não montam (3.4.4).

**11. vite.config.ts:7.** O comentário acompanha o `vitePluginSingleSpa` na lista de plugins (vite.config.ts:3, 12-15), que a revisão de dependências registra como configurado (3.4.2). A tecnologia nomeada é a mesma das dependências e da composição.

**12. vite.config.ts:8-9.** Diz que o projeto é o root config e que carrega e monta os microfrontends filhos. A opção `type: 'root'` está em vite.config.ts:13, e o carregamento e a montagem são as relações 3.4.5 #1 e #2. É afirmação diferente da linha 6: o sujeito é o projeto e o mecanismo é a configuração do plugin.

**13. vite.config.ts:10-11.** A opção `cssStrategy: 'multiMife'` está configurada no plugin do root config (vite.config.ts:14; 3.4.2). O efeito anunciado, isolar os estilos de `menu` e `base` entre si, depende dos dois microfrontends, que estão fora do snapshot, e da ação do plugin, que o snapshot não mostra (não há `node_modules` nem CSS no repositório). A parte confirmada é a configuração; a isolação fica sem artefato.

## Resumo

Afirmações: 13 (corroborada: 9, parcial: 3, contradita: 0, sem corroboração: 1). Temas: (estrutura: 4, composição: 7, build-deploy: 1, independência: 1).
