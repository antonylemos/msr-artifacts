---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Leitura do repositório

A documentação é o README da raiz, em inglês: um tutorial passo a passo de micro frontends em Angular com Native Federation (README.md:1-2). Ele começa por uma definição geral do conceito e das vantagens, apresenta as três aplicações do exemplo (um app base e os micro frontends tea tracker e sticky notes, README.md:35-38) e ensina a criar o primeiro remote (Parte 1), o app base como `dynamic-host` com rotas que chamam `loadRemoteModule` e um manifesto de federação (Parte 2), e a rodar tudo junto (Parte 3). Os READMEs de `sticky-notes/` e `tea-tracker/` são o template do Angular CLI ("This project was generated using Angular CLI version 21.0.5", sticky-notes/README.md:3; os dois são iguais exceto pelo título, sticky-notes/README.md:1 e tea-tracker/README.md:1), sem afirmação sobre o projeto; o `http://localhost:4200/` que citam (sticky-notes/README.md:13) é o texto padrão do template, enquanto os remotes servem nas portas 4333 e 4222 (sticky-notes/angular.json:96-97; tea-tracker/angular.json:96-97).

O que o README diz do projeto confere com as revisões anteriores: três projetos Angular, um host que carrega os dois remotes por rota com `loadRemoteModule`, a partir de um manifesto com URLs de `localhost` (3.4.5 #1, #2). A única afirmação sem artefato é a de micro frontends "independently deployable" (afirmação 2): o snapshot não tem deploy (3.4.6). O tutorial também é mais antigo, ou mais simplificado, que o código em alguns detalhes, todos em blocos de código ou em instruções, que não viram linha:
- o app base se chama `digital-desktop` no tutorial (README.md:297-298) e `test-base` no snapshot (test-base/package.json:2);
- o bloco de `federation.config.js` (README.md:242-270) expõe `./src/app/app.component.ts`, e o snapshot expõe `./src/app/app.ts` (tea-tracker/federation.config.js:6-8); o bloco também não tem o `features.ignoreUnusedDeps` do arquivo real (tea-tracker/federation.config.js:25-30);
- o bloco de rotas (README.md:333-349) tem só a rota `tea-tracker` e a home em `path: ''`; o snapshot tem a home em `home-page` e as rotas dos dois remotes (test-base/src/app/app.routes.ts:6-19);
- o manifesto vai, no tutorial, em `src/assets/federation.manifest.json` (README.md:366) e é lido de `/assets/federation.manifest.json` (README.md:395), com só o `tea-tracker` (README.md:375-379); no snapshot fica em `public/` e é lido como `federation.manifest.json` (test-base/public/federation.manifest.json:1-4; test-base/src/main.ts:3), com os dois remotes;
- a Parte 3 anuncia "add a second micro frontend (Sticky Notes)" (README.md:86), mas não traz os passos; o sticky-notes só reaparece nas imagens e no texto final (README.md:438, 440-441).

Ficaram fora da tabela:
- a definição geral de micro frontends e da arquitetura (README.md:15-33: "Micro frontends are essentially the frontend equivalent of microservices", README.md:17; peças "independently developed and deployed", README.md:19; "owned by a separate team [...] can be deployed independently", README.md:24-25; os papéis genéricos de "Base App (Container/Shell)" e "Micro Frontends (Remote Apps)", README.md:30-33), que não fala deste projeto; a frase seguinte, que fala, é a afirmação 1;
- as vantagens em geral (README.md:40-53: implantação independente, com o exemplo do Teams, autonomia de times, lazy loading, escalabilidade), sem afirmação sobre este projeto;
- a descrição geral da tecnologia: "Native Federation is Angular's recommended solution for micro frontends. It uses JavaScript's native module system to load remote applications dynamically" (README.md:148) e o `remoteEntry.json` como "A special file Native Federation generates that describes what the remote app exposes" (README.md:385); o carregamento dinâmico neste projeto é a afirmação 11;
- as regras da tecnologia: o primeiro parâmetro de `loadRemoteModule` "must match the name in the remote's `federation.config.js`" e o segundo "must match the key in the remote's `exposes`" (README.md:358-359), e a chave do manifesto "Must match the `name`" (README.md:382). Aqui os nomes coincidem (3.4.5 #1, #2);
- as explicações de blocos de código: o `name` como "identifier for this micro frontend" (README.md:272), as chaves de `exposes` (README.md:273-275, que repetem a afirmação 6), `strictVersion` e `skip` (README.md:278-279), as rotas da home e do tea-tracker (README.md:353-356) e o `.then((_) => import('./bootstrap'))` (README.md:406), que a revisão de código-fonte registrou como construção interna (3.4.4, `src-async-bootstrap`);
- o `bootstrap.ts` criado pelo schematic, "handles the dynamic bootstrapping required for federation" (README.md:189), detalhe interno da unidade (tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5);
- as portas (README.md:175-178, 199, 208, 321, 384, 444) e as instruções de instalação, de criação dos projetos e de execução (README.md:58-139, 152-161, 165-171, 180-184, 191-224, 281-284, 291-303, 307-316, 368-371, 388, 415-432); "Choose 'dynamic-host' (NOT 'remote')" (README.md:316-318) entra na afirmação 9.

Ocorrências `doc-*`: README.md:1 é o título; README.md:5, 6 e 9 são o sumário; README.md:15 e 40 são títulos de seção; README.md:17, 19, 24, 25, 30, 32 e 33 estão na definição geral citada acima; README.md:37 e 38 estão na afirmação 1; README.md:45, 47, 49, 51 e 52 são as vantagens em geral; README.md:84 e 86 repetem a 1; README.md:88 está na 2; README.md:91, 141, 146 e 305 são títulos; README.md:93 está na 3; README.md:143 e 144 na 4; README.md:148 e 385 são a descrição geral da tecnologia; README.md:173 está na 5; README.md:272 é explicação de bloco de código; README.md:288 está na 9, e README.md:318 repete a 9; README.md:307 é instrução de instalação; README.md:329 está na 10; README.md:357 na 11; README.md:364 na 12, e README.md:383 repete a 12; README.md:404 está na 13; README.md:413 na 14; README.md:440 na 15; README.md:446 na 16.

Foram lidos os artefatos que as revisões anteriores citam: os três `package.json` (sem `description`), `angular.json`, `federation.config.js`, `src/main.ts` e `src/bootstrap.ts`, o manifesto do host, test-base/src/app/app.config.ts, test-base/src/app/app.routes.ts, test-base/src/app/app.html e os `app.ts`/`app.html` dos remotes. Os comentários dos `federation.config.js` são os do schematic do Native Federation, sobre pacotes a ignorar, o FAQ de compartilhamento e o `ignoreUnusedDeps` (tea-tracker/federation.config.js:19-28; test-base/federation.config.js:15-24). Os `app.html` dos remotes guardam, comentado, o template inicial do Angular CLI (sticky-notes/src/app/app.html:3-10). O comentário "// The Micro Frontends" (test-base/src/app/app.routes.ts:11) e o texto da tela inicial do host (test-base/src/app/home-component/home-component.html:6-7) repetem as afirmações 10 e 1.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:35-38 | "In our example project, we'll build: A **base app** serving as our digital desktop; A **tea tracker** micro frontend [...]; A **sticky notes** micro frontend" | estrutura | corroborada | 3.4.3 (test-base, tea-tracker e sticky-notes `Yes`); 3.4.5 #1, #2 |
| 2 | README.md:88 | "a working digital desktop with two independently deployable micro frontends" | build-deploy | sem corroboração | — |
| 3 | README.md:93 | "the Tea Tracker micro frontend - a standalone Angular application" | independência | corroborada | 3.4.3 (tea-tracker, coluna Entrada); 3.4.4 (Notas); tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5 |
| 4 | README.md:143-144 | "Native Federation is the technology that enables micro frontends. It allows multiple Angular applications to share code and components at runtime." | composição | corroborada | 3.4.2; 3.4.5 #1, #2; test-base/src/app/app.routes.ts:14, 18; test-base/federation.config.js:6-8; tea-tracker/federation.config.js:10-12; sticky-notes/federation.config.js:10-12 |
| 5 | README.md:173 | "Choose \"remote\" because this micro frontend will be loaded BY another application (the base app we'll create later)" | estrutura | corroborada | 3.4.5 #2; tea-tracker/federation.config.js:4-8; test-base/src/app/app.routes.ts:12-15 |
| 6 | README.md:187 | "Creates `federation.config.js` - defines what this app exposes to other apps" | composição | corroborada | 3.4.2; tea-tracker/federation.config.js:6-8; sticky-notes/federation.config.js:6-8 |
| 7 | README.md:188 | "Updates `angular.json` - adds federation build configuration" | build-deploy | corroborada | 3.4.2; 3.4.6 #2; tea-tracker/angular.json:16-29 |
| 8 | README.md:276-277 | "**`shared`**: Which dependencies are shared between apps / `singleton: true`: Only one instance of shared libraries" | composição | corroborada | test-base/federation.config.js:6-8; tea-tracker/federation.config.js:10-12; sticky-notes/federation.config.js:10-12; test-base/package.json:30; tea-tracker/package.json:30; sticky-notes/package.json:30 |
| 9 | README.md:288 | "the main application - our digital desktop - that will host all micro frontends" | estrutura | corroborada | 3.4.5 #1, #2; test-base/src/main.ts:3; test-base/federation.config.js:3-8 |
| 10 | README.md:329 | "To add your micro frontends to this app we will use routing" | composição | corroborada | 3.4.4 (test-base/src/app/app.routes.ts:5, `host-relationship`); test-base/src/app/app.routes.ts:12-19; test-base/src/app/app.config.ts:9 |
| 11 | README.md:357 | "Uses `loadRemoteModule()` to dynamically load the remote micro frontend" | composição | corroborada | 3.4.4 (test-base/src/app/app.routes.ts:14); 3.4.5 #2; test-base/src/app/app.routes.ts:13-14 |
| 12 | README.md:364 | "The manifest file tells the base app where to find each micro frontend." | composição | corroborada | 3.4.5 #1, #2; test-base/public/federation.manifest.json:2-3; test-base/src/main.ts:3 |
| 13 | README.md:401-404 | "**`initFederation()`**: Initializes the federation system / Loads the manifest file / Discovers available micro frontends" | composição | corroborada | 3.4.4 (test-base/src/main.ts:3); test-base/src/main.ts:1-6; test-base/angular.json:48-53 |
| 14 | README.md:413 | "You need BOTH applications running simultaneously. This is crucial for micro frontends to work." | composição | corroborada | 3.4.6 (Leitura); 3.4.5 #1, #2; test-base/public/federation.manifest.json:2-3 |
| 15 | README.md:440-441 | "I can see my home page, from my base app and I can see the two separate micro frontends from the same application." | composição | corroborada | 3.4.5 #1, #2; test-base/src/app/app.html:12, 17, 26 |
| 16 | README.md:445-447 | "When you clicked \"Tea Tracker\", it dynamically fetched the code from port 4222 / The micro frontend loaded seamlessly into the base app / All without a page refresh!" | composição | corroborada | 3.4.5 #2; test-base/public/federation.manifest.json:2; test-base/src/app/app.routes.ts:13-14; test-base/src/app/app.html:12, 26 |

## Observações

**1. README.md:35-38.** As três aplicações existem como projetos Angular próprios na raiz, cada uma com manifesto, entrada e build (3.4.3), e o host liga os dois remotes (3.4.5 #1, #2). O "base app" é o `test-base` (test-base/package.json:2), não o `digital-desktop` do passo a passo (README.md:297). O roteiro do tutorial repete as três unidades (README.md:84-86), e a tela inicial do host também: "Each widget is its own individual mini app. You can track your tea and take notes." (test-base/src/app/home-component/home-component.html:6-7).

**2. README.md:88.** Os três builds são separados e o host carrega os remotes em runtime pelas URLs do manifesto (3.4.6 #1-#3; 3.4.5 #1, #2), mas o snapshot não tem nenhum artefato de deploy: a revisão de build e deploy registrou `não observado` para as três aplicações, e as URLs do manifesto são de `localhost` (test-base/public/federation.manifest.json:2-3). Nada no snapshot confirma nem desmente que os remotes sejam implantados sozinhos. As vantagens em geral repetem a ideia ("Independent Deployment", README.md:45-48), sem falar deste projeto.

**3. README.md:93.** O tea-tracker tem entrada e bootstrap próprios (tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5), e o `initFederation()` sem manifesto serve à execução isolada (3.4.4, Notas). O próprio tutorial o serve sozinho na porta 4222 antes de existir o host (README.md:197-216). O README não diz o mesmo do sticky-notes, que tem o mesmo arranjo (sticky-notes/src/main.ts:3-5).

**4. README.md:143-144.** Native Federation é a única tecnologia de composição do snapshot (3.4.2), e as duas relações host → remote são `native-federation` (3.4.5 #1, #2). Os componentes vêm em runtime pelo `loadRemoteModule` (test-base/src/app/app.routes.ts:14, 18), e as três configurações compartilham as dependências com `shareAll` (test-base/federation.config.js:6-8; tea-tracker/federation.config.js:10-12; sticky-notes/federation.config.js:10-12). A instrução de adicionar Native Federation também ao host (README.md:307) repete a tecnologia.

**5. README.md:173.** O tea-tracker só expõe `./App` e não declara remotes nem manifesto (tea-tracker/federation.config.js:4-8; tea-tracker/src/main.ts:3), e o host o carrega na rota `tea-tracker` (test-base/src/app/app.routes.ts:12-15). O sticky-notes tem o mesmo papel (3.4.5 #1), mas o README não traz a sua configuração.

**6. README.md:187.** Os dois `federation.config.js` dos remotes declaram o que expõem, `./App` (tea-tracker/federation.config.js:6-8; sticky-notes/federation.config.js:6-8); o do host não tem `exposes` (test-base/federation.config.js:3-8). A explicação do bloco de código repete a afirmação: "**`exposes`**: What this app makes available to others" (README.md:273).

**7. README.md:188.** O alvo `build` do `angular.json` usa o builder `@angular-architects/native-federation:build` sobre o alvo `esbuild` do projeto (tea-tracker/angular.json:16-29), o mesmo nas três aplicações (3.4.2; 3.4.6 #1-#3).

**8. README.md:276-277.** As três configurações usam `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })` (test-base/federation.config.js:7; tea-tracker/federation.config.js:11; sticky-notes/federation.config.js:11), e as três aplicações dependem do mesmo Angular (`@angular/core` `^21.0.0`, test-base/package.json:30; tea-tracker/package.json:30; sticky-notes/package.json:30), então há bibliotecas usadas por mais de uma unidade.

**9. README.md:288.** O `test-base` é o host das duas relações (3.4.5 #1, #2): inicializa a federação com o manifesto (test-base/src/main.ts:3) e não expõe nada (test-base/federation.config.js:3-8). O tutorial repete o papel ao escolher o tipo `dynamic-host`, "because this app will LOAD other apps" (README.md:316-318), e na diferença entre os tipos (README.md:323-325). O host é dinâmico no sentido de que lê os remotes de um manifesto em runtime, em vez de fixá-los na configuração.

**10. README.md:329.** Cada remote entra no host por uma rota com `loadComponent` (test-base/src/app/app.routes.ts:12-19), registrada por `provideRouter` (test-base/src/app/app.config.ts:9), o que a revisão de código-fonte registrou como `host-relationship` (3.4.4). O comentário "// The Micro Frontends" (test-base/src/app/app.routes.ts:11) marca essas rotas.

**11. README.md:357.** A rota `tea-tracker` chama `loadRemoteModule('tea-tracker', './App')` dentro do `loadComponent`, então o remote só é carregado quando a rota é visitada (test-base/src/app/app.routes.ts:13-14). A rota `sticky-notes` faz o mesmo (test-base/src/app/app.routes.ts:17-18).

**12. README.md:364.** O manifesto associa `tea-tracker` e `sticky-notes` a um `remoteEntry.json` em `localhost` (test-base/public/federation.manifest.json:2-3), e o host o passa ao `initFederation` (test-base/src/main.ts:3). O local difere do tutorial: `public/`, copiado como asset (test-base/angular.json:48-53), e não `src/assets/` (README.md:366). A explicação do valor, "The URL where Native Federation can find this remote app" (README.md:383), repete a afirmação.

**13. README.md:401-404.** O host chama `initFederation('federation.manifest.json')` antes do bootstrap (test-base/src/main.ts:1-6), e o manifesto entra no build como asset (test-base/angular.json:48-53). A revisão de código-fonte registrou essa chamada como construção de composição (3.4.4). O "Discovers available micro frontends" corresponde aos dois nomes do manifesto; o snapshot não tem outro mecanismo de descoberta.

**14. README.md:413.** Como o manifesto aponta para os servidores de desenvolvimento dos remotes (test-base/public/federation.manifest.json:2-3), o host só mostra um remote se o servidor dele estiver no ar, como registrou a revisão de build e deploy (3.4.6, Leitura). O "BOTH" vale para o ponto do tutorial em que só existe o tea-tracker; no snapshot são três aplicações.

**15. README.md:440-441.** O menu do host liga as rotas dos dois remotes (test-base/src/app/app.html:12, 17), e o componente remoto aparece no `<router-outlet>` do host (test-base/src/app/app.html:26). As imagens citadas (README.md:434-438) não foram consideradas.

**16. README.md:445-447.** O código do tea-tracker vem de `http://localhost:4222/remoteEntry.json` (test-base/public/federation.manifest.json:2), carregado pelo `loadRemoteModule` da rota (test-base/src/app/app.routes.ts:13-14). A troca sem recarregar a página corresponde à navegação do roteador do Angular, por `routerLink` (test-base/src/app/app.html:12) e `<router-outlet>` (test-base/src/app/app.html:26).

## Resumo

Afirmações: 16 (corroborada: 15, parcial: 0, contradita: 0, sem corroboração: 1). Temas: (estrutura: 3, composição: 10, build-deploy: 2, independência: 1).
