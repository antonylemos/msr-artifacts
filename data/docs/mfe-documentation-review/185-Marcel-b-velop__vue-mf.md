---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Leitura do repositório

A documentação está toda em alemão. O README da raiz é um caderno de experimento: diz o objetivo
("Ziel": páginas carregadas como módulos remotos, um host com navegação, cabeçalho e rodapé, uma
biblioteca de controles compartilhados), a montagem do teste ("Testaufbau": Host, App1 e Lib), os
problemas resolvidos ("Gelöste Probleme": como rodar os remotes, o `shared` do PrimeVue, o CSS do
Tailwind, as declarações de tipo dos módulos remotos) e o estado ("Stand"). O `app-2/README.md`
descreve app-2 como módulo de autenticação, carregável por Module Federation e ligado ao
IdentityServer. O `Api/IdentityServer/README.md` documenta o backend de identidade .NET. Os
READMEs de `app-1/`, `host/` e `lib/` são o template do Vite (app-1/README.md:1-5;
host/README.md:1-5; lib/README.md:1-5) e não trazem afirmação sobre o projeto.

O README da raiz confere com as revisões anteriores na composição (host, app-1 e lib ligados por
`@originjs/vite-plugin-federation`, dependências comuns em `shared`, remotes servidos por `vite
preview` em `localhost`), mas está atrasado em relação ao snapshot: fala em três partes e nunca cita
app-2, que existe como quarta unidade (pnpm-workspace.yaml:4) e é o remote das rotas `/login` e
`/register` do host (host/src/router/index.ts:7-8). app-2 só é descrita no próprio README. Também
nem toda página do host é remota: `/about` é local (host/src/router/index.ts:6).

Ficaram fora da tabela:
- a segunda metade de README.md:7 (se a lógica de funções será compartilhada por NPM ou pela
  biblioteca "muss noch erarbeitet werden", ainda está por definir) e README.md:9 (estratégia para
  compartilhar o estilo, também em aberto): são intenções;
- README.md:11, a descrição funcional do diálogo de seleção (inicializado com seleções, carrega os
  próprios dados e devolve o selecionado ao chamador). É o contrato interno do componente `Confirm`
  (lib/src/components/Confirm.vue:9-24), já registrado na revisão de composição (3.4.5 #1);
- README.md:36-56, as declarações `declare module` no `vite-env.d.ts` para o compilador conhecer os
  módulos remotos (host/src/vite-env.d.ts:1-29), detalhe de tipagem; o bloco de código reproduz o
  arquivo;
- o bloco de código README.md:28-34, que reproduz a configuração citada na afirmação 11;
- README.md:60, o estado ("Host, App1 und Lib sind schon lauffähig. Es fehlt noch der Footer und die
  Auslagerung der Styles und Funktionen.", host, App1 e Lib já rodam; faltam o rodapé e a extração
  dos estilos e funções): "lauffähig" não se verifica no snapshot, e o rodapé entra no parágrafo da
  afirmação 2;
- "die vite configs wurden optimiert" (README.md:62), sem conteúdo verificável;
- em `app-2/README.md`: a descrição funcional (:3), as features de login, registro, logout, token
  JWT e store Pinia (:7-11), detalhes internos da unidade; as rotas da execução isolada (:48-52); as
  dependências (:54-61); o bloco de comandos (:23-38);
- `Api/IdentityServer/README.md`, que trata só do backend (endpoints, JWT, senha, banco em memória,
  execução em `localhost:5283`). A seção "Integration mit Vue-App" (Api/IdentityServer/README.md:113-121)
  manda guardar o token no `localStorage` e enviá-lo no cabeçalho `Authorization`; é instrução de
  integração com o backend, sem afirmação sobre as unidades. No snapshot, app-2 grava o token
  (app-2/src/services/authService.ts:67) e lib o lê (lib/src/services/apiClient.ts:15), o canal da
  relação 3.4.5 #5.

Ocorrências `doc-*` que não viraram linha: README.md:1 (título "Vue Module Federation");
app-2/README.md:30, :33 e :36, comentários dentro do bloco de comandos (`pnpm build`,
`pnpm dev:watch`, `pnpm preview` "für Module Federation"), cujo arranjo está na afirmação 7;
app-2/README.md:40, título da seção "Module Federation". README.md:5 está nas afirmações 1 e 2, e
app-2/README.md:12 na 15.

Comentários e campos lidos nos artefatos que as revisões anteriores citam: os quatro
`vite.config.ts` (os rótulos "Modules to expose" em host/vite.config.ts:14, app-1/vite.config.ts:14 e
app-2/vite.config.ts:14 e "Modules to exposed" em lib/vite.config.ts:20 só marcam a seção; o do host
fica acima de `remotes`, sem `exposes`; host/vite.config.ts:36 e lib/vite.config.ts:34, 36 tratam de
chunks e top-level await; app-2/vite.config.ts:16 virou a afirmação 19); app-2/src/main.ts:9 e
app-2/src/App.vue:9, 23, 45, 79 (afirmação 18); app-1/src/main.ts:17, 19;
app-2/src/services/authService.ts:37, 51; lib/src/services/apiClient.ts:12, 32, 51; o workflow
(.github/workflows/node.js.yml:1, nome "Build UI", e :24, ".NET Setup und Build"). Fora os indicados,
são detalhes internos. Nenhum `package.json` tem `description`.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:5 | "Die einzelnen Seiten sollen als Remote Module geladen werden." (as páginas devem ser carregadas como módulos remotos) | composição | contradita | 3.4.5 #2, #4; host/src/router/index.ts:5-8; host/src/views/Home.vue:1; host/src/views/About.vue:1-5 |
| 2 | README.md:5 | "Der Host hält die Navigationsleiste, Header und den Footer." (o host mantém a barra de navegação, o cabeçalho e o rodapé) | estrutura | parcial | host/src/App.vue:8-9; host/src/components/Navigation.vue:26 |
| 3 | README.md:7 | "Mehrfach genutzte Steuerelemente sollen durch eine Library bereitgestellt werden" (controles usados em vários lugares devem ser fornecidos por uma biblioteca) | estrutura | corroborada | 3.4.5 #1, #3; lib/vite.config.ts:22; app-1/src/main.ts:11, 16; app-1/src/App.vue:33; host/src/main.ts:14, 21 |
| 4 | README.md:15 | "Host: Host der/für Anwendung/en" (host das aplicações) | estrutura | corroborada | 3.4.3 (host `Yes`); 3.4.5 #2, #3, #4; host/vite.config.ts:15-19 |
| 5 | README.md:17 | "App1: Eine Anwendung, welche zu Testzwecken eine Library mit einem Dialog nuten soll" (uma aplicação que, para teste, usa uma biblioteca com um diálogo) | composição | corroborada | 3.4.5 #1; app-1/src/main.ts:11, 16; app-1/src/App.vue:33 |
| 6 | README.md:22 | "die drei Teile der anwendung" (as três partes da aplicação) | estrutura | contradita | 3.4.3 (app-1, app-2, host, lib `Yes`); pnpm-workspace.yaml:2-5 |
| 7 | README.md:22 | "Den Host kann man so starten, Lib und App1 müssen gebaut werden und danach über preview bereitgestellt werden, um alles im Host zu sehen." (o host pode rodar com `pnpm dev`; Lib e App1 precisam ser construídas e servidas por `preview` para aparecer no host) | build-deploy | corroborada | 3.4.6 #1, #4; host/vite.config.ts:16, 18; app-1/package.json:9-11; lib/package.json:8-10; host/package.json:7 |
| 8 | README.md:22 | "Einzelne Anwendungen kann man natürlich auch direkt starten und debuggen, sie funktionieren dann allerdings nicht in der Hostanwendung." (cada aplicação também pode ser iniciada e depurada sozinha, mas então não funciona no host) | independência | corroborada | 3.4.3 (entrada própria de app-1, app-2, host e lib); app-1/package.json:7; lib/package.json:7 |
| 9 | README.md:24 | "Primevue, Pinia, Vue sollten von allen Anwendungen geteilt werden. In der vite.config.ts wird das konfiguriert" (PrimeVue, Pinia e Vue são compartilhados por todas as aplicações, configurados no `vite.config.ts`) | composição | corroborada | 3.4.2 (federation configurada nas quatro); host/vite.config.ts:20-25; app-1/vite.config.ts:21-26; app-2/vite.config.ts:24-29; lib/vite.config.ts:26-31 |
| 10 | README.md:24 | "Für Primevue musste nur in der Host Anwendung die vite.confit.ts erweitert werden […] Die Lösung war version und requiredVersion." (para o PrimeVue, só a configuração do host precisou de `version` e `requiredVersion`) | composição | corroborada | host/vite.config.ts:23; app-1/vite.config.ts:24; app-2/vite.config.ts:27; lib/vite.config.ts:29 |
| 11 | README.md:26 | "Folgender Code hat in der vite.config.ts der Lib und App1 zur Lösung geführt (in der Host Anwendung gab es die Anpassung nicht)" (o bloco `build` com `target: "esnext"`, `minify: false`, `cssCodeSplit: false` está nas configurações de Lib e App1, e não na do host) | build-deploy | contradita | lib/vite.config.ts:40-44; app-1/vite.config.ts:30-35; host/vite.config.ts:28-30 |
| 12 | README.md:62 | "Bis jetzt wurde nur lokal getestet, wie der Host sich im Livebetrieb verhält ist noch unklar." (até agora só se testou localmente; o comportamento do host em produção é desconhecido) | build-deploy | corroborada | 3.4.6 #1-#4 (deploy `não observado`); host/vite.config.ts:16-18 |
| 13 | README.md:62 | "GitHub Action wurde implementiert" (foi implementada uma GitHub Action) | build-deploy | corroborada | 3.4.6 (Leitura); .github/workflows/node.js.yml:1-23 |
| 14 | README.md:62 | "Auch ein apiClient wird in der lib gepflegt und den anderen Anwendungen zur Verfügung gestellt." (um `apiClient` é mantido na lib e fornecido às outras aplicações) | estrutura | corroborada | lib/vite.config.ts:23; lib/src/components/Confirm.vue:7, 22; app-1/src/main.ts:8; app-1/src/composables/api.ts:1 |
| 15 | app-2/README.md:12 | "Module Federation: Kann als Remote-Modul in andere Apps geladen werden" (pode ser carregada como módulo remoto em outras aplicações) | composição | corroborada | 3.4.2 (app-2 configurada); 3.4.5 #4; app-2/vite.config.ts:11-20 |
| 16 | app-2/README.md:16 | "Die App kommuniziert mit dem IdentityServer unter `http://localhost:5283/api/identity`" (a aplicação se comunica com o IdentityServer nesse endereço) | outro | corroborada | app-2/src/services/authService.ts:3, 29-30; Api/IdentityServer/Properties/launchSettings.json:9 |
| 17 | app-2/README.md:42 | "Die App wird als `remote-app2` exponiert und kann in anderen Apps wie folgt verwendet werden" (a aplicação é exposta como `remote-app2` e usada em outras por `defineAsyncComponent(() => import("remote-app2/App2"))`) | composição | corroborada | app-2/vite.config.ts:12, 16; host/src/main.ts:13 |
| 18 | app-2/src/App.vue:9 | "Prüfen ob Router verfügbar ist (nur für standalone-Modus)" (verifica se há router, que só existe no modo standalone) | independência | corroborada | 3.4.3 (app-2 `Yes`, router próprio em modo standalone); app-2/index.html:11; app-2/src/main.ts:10-37 |
| 19 | app-2/vite.config.ts:16 | `"./App2": "./src/App.vue", // Für standalone-Modus` (o `./App2` exposto é a aplicação do modo standalone) | composição | corroborada | app-2/src/main.ts:4, 33; app-2/src/App.vue:80-82 |

## Observações

**1. README.md:5.** O objetivo é que cada página seja um módulo remoto, com o host só segurando a
moldura. No snapshot, três das quatro rotas do host mostram código remoto: `/` renderiza o `App1` de
app-1 (host/src/router/index.ts:5; host/src/views/Home.vue:1) e `/login` e `/register` carregam os
formulários de app-2 (host/src/router/index.ts:7-8). A rota `/about` é uma página local do host
(host/src/router/index.ts:2, 6; host/src/views/About.vue:1-5). Como uma página contraria a frase, ela
fica `contradita`; a parte remota se confirma. A frase está escrita como objetivo ("sollen"), e o
README não diz que ela já foi cumprida. É também a ocorrência `doc-host-remote`.

**2. README.md:5.** A barra de navegação está no host: `host/src/App.vue:8` monta o `Navigation`,
um `Menubar` do PrimeVue (host/src/components/Navigation.vue:26), acima do `<RouterView />`
(host/src/App.vue:9). Não há cabeçalho nem rodapé no host; o próprio README diz que "Es fehlt noch
der Footer" (falta ainda o rodapé, README.md:60). A afirmação é `parcial`: a navegação se confirma, e
cabeçalho e rodapé não têm artefato. O único `<header>` do snapshot é o de app-2
(app-2/src/App.vue:46), que o host não renderiza.

**3. README.md:7.** A biblioteca é a unidade lib, que expõe o diálogo `Confirm`
(lib/vite.config.ts:22). Ele é usado por mais de uma unidade: app-1 o carrega e o registra
(app-1/src/main.ts:11, 16) e o usa em app-1/src/App.vue:33; o host o carrega e o registra
(host/src/main.ts:14, 21) para o `App1` que renderiza. O mesmo conteúdo aparece em README.md:18
("Lib: Stellt einen Dialog bereit, der von mehreren Anwendungen benutzt werden kann", fornece um
diálogo que várias aplicações podem usar). É o único controle exposto: os outros módulos de lib são
o `apiClient` e os tipos (lib/vite.config.ts:23-24).

**4. README.md:15.** O host é a casca que consome os três remotes (host/vite.config.ts:15-19) e
não expõe nada. A revisão de composição registra as relações dele com app-1, lib e app-2.

**5. README.md:17.** app-1 consome o `Confirm` de lib: carrega-o por `defineAsyncComponent`
(app-1/src/main.ts:11), registra-o como global (app-1/src/main.ts:16) e o abre em
app-1/src/App.vue:33. "Zu Testzwecken" (para teste) descreve o propósito, o que combina com o
`repo_type: example` da classificação.

**6. README.md:22.** A frase fala das três partes da aplicação, as mesmas três listadas no
"Testaufbau" (README.md:15-18: Host, App1, Lib). O snapshot tem quatro unidades frontend no
workspace (pnpm-workspace.yaml:2-5), e a revisão de estrutura marcou as quatro como `Yes`; app-2
falta na contagem. A afirmação é `contradita`. O README parece anterior a app-2, que tem
documentação própria (app-2/README.md).

**7. README.md:22.** Os remotes são vistos pelo host em `localhost:5174` e `localhost:5177`
(host/vite.config.ts:16, 18), as portas do `vite preview` de app-1 e lib (app-1/package.json:10;
lib/package.json:9), e os scripts `dev:all` combinam `vite build --watch` com `preview`
(app-1/package.json:9-11; lib/package.json:8-10). O host roda com `vite` (host/package.json:7). A
revisão de build e deploy já citou este trecho na Leitura. O mesmo arranjo aparece nos comentários do
bloco de comandos de app-2 (app-2/README.md:30-37), e app-2 segue o mesmo padrão
(app-2/package.json:9-11).

**8. README.md:22.** Cada unidade tem `index.html`, entrada que monta o próprio app e `dev` próprio
(3.4.3; app-1/package.json:7; lib/package.json:7), por isso pode ser iniciada sozinha. A segunda
parte, que no `dev` elas não funcionam dentro do host, é a outra face da afirmação 7: o host busca
`/assets/remoteEntry.js` (host/vite.config.ts:16-18), que vem do build servido pelo `preview`.

**9. README.md:24.** `vue`, `pinia` e `primevue` estão no `shared` dos quatro `vite.config.ts`
(host/vite.config.ts:20-25; app-1/vite.config.ts:21-26; app-2/vite.config.ts:24-29;
lib/vite.config.ts:26-31), junto com `axios`, que o README não cita. Nos remotes, as três ficam com
`generate: false, import: false`, ou seja, usam a cópia fornecida pelo host; app-2 é a única que gera
e importa a própria `axios` (app-2/vite.config.ts:28).

**10. README.md:24.** Só o host declara `requiredVersion` e `version` para o PrimeVue
(host/vite.config.ts:23); nos três remotes a entrada é só `generate: false, import: false`
(app-1/vite.config.ts:24; app-2/vite.config.ts:27; lib/vite.config.ts:29). O trecho de código citado
no README traz também `singleton: true`, que não está na configuração atual, onde aparece
`modulePreload: true`. A frase conclui que a solução foram `version` e `requiredVersion`, e essa
parte se confirma.

**11. README.md:26.** O bloco citado (README.md:28-34) está inteiro só em lib
(lib/vite.config.ts:40-44, que acrescenta `sourcemap`). Em app-1 há `target: "esnext"` e
`cssCodeSplit: false`, mas `minify: "esbuild"` em vez de `false` (app-1/vite.config.ts:30-35). No host
falta `cssCodeSplit`, mas `target: "esnext"` também está lá (host/vite.config.ts:28-30). A parte que
resolve o CSS, `cssCodeSplit: false` em lib e app-1 e ausente no host, se confirma; o resto do bloco
não corresponde às configurações atuais, daí `contradita`. app-2, que o README não cita, também tem
`cssCodeSplit: false` (app-2/vite.config.ts:36). O README diz depois que as configurações foram
otimizadas (README.md:62), o que pode explicar a diferença.

**12. README.md:62.** Nenhum artefato publica as aplicações: a revisão de build e deploy marcou as
quatro com deploy `não observado`, e o host aponta para os remotes em `localhost`
(host/vite.config.ts:16-18). A frase confere com o snapshot.

**13. README.md:62.** O workflow "Build UI" roda em todo push, instala o workspace e chama
`pnpm build` (.github/workflows/node.js.yml:1-3, 20-23), e depois constrói e testa a solução .NET
(:25-34). É integração contínua, sem publicação.

**14. README.md:62.** lib expõe `./apiClient` (lib/vite.config.ts:23) e o usa no próprio `Confirm`
(lib/src/components/Confirm.vue:7, 22); app-1 o importa estaticamente de `remote-lib/apiClient`
(app-1/src/main.ts:8, 20; app-1/src/composables/api.ts:1). São duas unidades que o usam, por isso
`corroborada`. "Den anderen Anwendungen" (às outras aplicações) fica mais largo que o uso: host e
app-2 não importam o `apiClient` (app-2 tem o próprio cliente, app-2/src/services/authService.ts:29);
o host só o executa indiretamente, pelo `Confirm` dentro do `App1`.

**15. app-2/README.md:12.** app-2 é o remote `remote-app2`, com quatro módulos expostos
(app-2/vite.config.ts:11-20). O host o carrega nas rotas `/login` e `/register`
(host/src/router/index.ts:7-8), relação ativa na revisão de composição (3.4.5 #4).

**16. app-2/README.md:16.** O cliente de autenticação de app-2 usa essa base
(app-2/src/services/authService.ts:3, 29-30), e o perfil de execução do IdentityServer expõe
`http://localhost:5283` (Api/IdentityServer/Properties/launchSettings.json:9). É a dependência de
app-2 em relação a um backend do próprio repositório, que não é unidade frontend.

**17. app-2/README.md:42.** O nome `remote-app2` e a exposição `./App2` estão em
app-2/vite.config.ts:12 e :16, e o host faz exatamente o carregamento do exemplo
(host/src/main.ts:13, registrado como `AppTwo` em :20). A revisão de código-fonte marcou esse
carregamento `No`, porque nenhum template usa `<AppTwo>`; a afirmação diz que o uso é possível, e isso
se confirma. O que o host usa de fato são `LoginForm` e `RegisterForm` (host/src/router/index.ts:7-8),
que o README não menciona.

**18. app-2/src/App.vue:9.** O router de app-2 é criado só na entrada da execução isolada
(app-2/src/main.ts:10-37, com o comentário "Router nur für standalone-Modus (wenn app-2 direkt
verwendet wird)", router só para o modo standalone, quando app-2 é usada diretamente,
app-2/src/main.ts:9), e o `App.vue` só mostra o `<router-view />` quando há router
(app-2/src/App.vue:10-17, 79-82: "Main Content - nur wenn Router vorhanden (standalone)"). Os três
comentários dizem a mesma coisa: app-2 tem um modo em que roda sozinha, com entrada própria
(app-2/index.html:11).

**19. app-2/vite.config.ts:16.** `./App2` aponta para `./src/App.vue`, o componente raiz montado pela
entrada standalone (app-2/src/main.ts:4, 33), com cabeçalho e área de rotas
(app-2/src/App.vue:46-82). O comentário confere com o arquivo exposto. Esse módulo é o `App2` que o
host registra sem usar (host/src/main.ts:13, 20).

## Resumo

Afirmações: 19 (corroborada: 15, parcial: 1, contradita: 3, sem corroboração: 0). Temas: (estrutura: 5, composição: 7, build-deploy: 4, independência: 2, outro: 1).
