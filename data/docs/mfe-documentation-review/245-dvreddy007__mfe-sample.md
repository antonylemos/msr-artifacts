---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
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

# 245 — dvreddy007/mfe-sample

## Leitura do repositório

A documentação é o README da raiz, em inglês. Ele apresenta o projeto como exemplo de arquitetura de micro frontends com Vue 3, Vite e Module Federation num monorepo Lerna, com um host (shell) e dois micro frontends, cada um com instância Vue própria. A maior parte do texto descreve o "Route Manifest" do host e o componente `Loader.vue`, que monta e desmonta os remotes conforme a rota. Os READMEs de `packages/app-1/`, `packages/app-2/` e `packages/host/` são o template do Vite (packages/app-1/README.md:1-5) e não trazem afirmação sobre o projeto.

No geral, o README confere com as revisões anteriores: três aplicações Vite num workspace, o host carrega os dois remotes por `@module-federation/runtime`, e as rotas vêm de um manifesto que aponta todas para `Loader.vue`. As divergências estão nos detalhes do roteamento. O README atribui aos micro frontends rotas e roteamento próprios, mas as rotas estão todas no manifesto do host (packages/host/src/routeManifest.js:7-13, 20-26), e os remotes não têm roteador. Também anuncia atualização de rotas em tempo de execução, sem código que a faça. Os dois blocos de código de exemplo (README.md:79-98, 101-122) reproduzem arquivos-fonte e não viram linha, mas não batem com o snapshot. O título de README.md:78 dá o caminho `packages/host/src/router/routeManifest.js`, e o arquivo real é `packages/host/src/routeManifest.js`. No exemplo, os módulos são `app1/App` e `app2/App`, e o real usa `module: 'app1'` (packages/host/src/routeManifest.js:4), com `/entry` acrescentado pelo plugin (packages/host/src/plugins/federationPlugin.js:29). O exemplo do roteador exporta `router` como default, e o real exporta `useRoute` (packages/host/src/router/index.js:24-26). O comando de clonagem aponta para outro repositório, `lmlong-huynh/micro-frontend-sample` (README.md:41-42).

Ficaram fora da tabela:
- a tabela de endereços `localhost` 5010, 5011 e 5012 (README.md:65-70). Portas são detalhe de infraestrutura e conferem com packages/host/vite.config.js:22, packages/app-1/vite.config.js:19 e packages/app-2/vite.config.js:19;
- `npm run dev` "will start the host app and all micro frontends simultaneously" (README.md:52-56), instrução de execução. Confere com `lerna run dev` (package.json:8).

Ocorrências `doc-*` que não viraram linha: README.md:1 (título); README.md:26 (raiz da árvore de pastas); README.md:41 e :42 (comando de clonagem); README.md:52 e :56 (instrução de execução, acima); README.md:65 e :66 (título e cabeçalho da tabela de endereços); README.md:106-109 (bloco de código). As demais estão nas linhas da tabela: README.md:3 (#2 e #3), :5 (#4), :7 (#5), :9 (#7), :10 (#8), :11 (#9), :15 (#2), :17 (#11), :19 (#13), :20 (#3), :29-30 (#14), :72 (#4 e #11), :76 (#4 e #9), :124 (#9).

Comentários e campos lidos: os `package.json` da raiz e dos três pacotes (nenhum tem `description`), `lerna.json`, os três `vite.config.js`, os `index.html` (título "Vite + Vue"), `packages/host/src/main.js`, `App.vue`, `router/index.js`, `routeManifest.js`, `plugins/federationPlugin.js`, `components/Loader.vue`, os `entry.js` e `main.js` dos remotes e o workflow `.github/workflows/main_vdumpavue3.yml`. Viraram linha o nome do workflow (#1), o comentário de `federationPlugin.js` (#17) e o do `filename` do host (#18). Os comentários de `Loader.vue` (:62, :66, :69, :99, e o contrato de `unmount` em :43-46) repetem as afirmações #9 e #11. Ficaram na leitura, sem linha: o tipo `Remote` (packages/host/src/components/Loader.vue:22-26) diz que, sem `entry`, vale o export default do módulo, mas o plugin sempre pede `<remote>/entry` (packages/host/src/plugins/federationPlugin.js:29), um detalhe interno do host; o comentário de `getRemotes` (packages/host/src/routeManifest.js:30-32) só descreve a função; `// Ensure shared dependencies are listed` (packages/host/vite.config.js:13) é instrução, ao lado de `shared: ['vue']`, que as três configurações declaram (packages/app-1/vite.config.js:15; packages/app-2/vite.config.js:15); os comentários do workflow (:1-2, :16, :48) são links e permissões do template do Azure.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .github/workflows/main_vdumpavue3.yml:4 | "Build and deploy Node.js app to Azure Web App - vdumpavue3" | build-deploy | contradita | 3.4.6 #1, #2, #3; .github/workflows/main_vdumpavue3.yml:26-33, 67-73; package.json:7-9 |
| 2 | README.md:3 | "demonstrate the Micro Frontend Architecture using Vue 3, Vite, and Module Federation to build modular applications" | estrutura | corroborada | 3.4.3 (packages/app-1, packages/app-2 e packages/host `Yes`); 3.4.2 (`@module-federation/vite` e `@module-federation/runtime` `Yes`); 3.4.5 #1, #2 |
| 3 | README.md:3 | "Each micro frontend runs with its own Vue instance, initialized separately via `entry.js`, rather than sharing the host's Vue instance." | composição | corroborada | 3.4.4 (src-mount-export de packages/app-1/src/entry.js:6 e packages/app-2/src/entry.js:6); packages/app-1/src/entry.js:6-13; packages/app-2/src/entry.js:6-13; packages/host/src/main.js:8-17 |
| 4 | README.md:5 | "this project utilizes a Route Manifest to dynamically define and manage routing for different micro frontends" | composição | corroborada | 3.4.4 (manual packages/host/src/routeManifest.js:1); packages/host/src/routeManifest.js:1-28; packages/host/src/router/index.js:4-22 |
| 5 | README.md:7 | "Dynamically loading routes from micro frontends" | composição | contradita | packages/host/src/routeManifest.js:7-13, 20-26; packages/app-1/vite.config.js:12-14; packages/app-2/vite.config.js:12-14 |
| 6 | README.md:8 | "Ensuring seamless navigation between different micro apps" | composição | corroborada | 3.4.5 #2; packages/host/src/App.vue:4-8; packages/host/src/components/Loader.vue:64-74, 103-108 |
| 7 | README.md:9 | "Registering and updating route configurations at runtime" | composição | parcial | packages/host/src/router/index.js:4-22; packages/host/src/main.js:13 |
| 8 | README.md:10 | "Maintaining consistency in route structure across the micro frontends" | composição | corroborada | packages/host/src/routeManifest.js:2-27; packages/host/src/router/index.js:5-12 |
| 9 | README.md:11 | "Delegating rendering responsibilities to `Loader.vue`, which mounts or unmounts micro frontends dynamically" | composição | corroborada | 3.4.4 (packages/host/src/components/Loader.vue:70, :96 e :74); packages/host/src/router/index.js:11; packages/host/src/components/Loader.vue:63-84 |
| 10 | README.md:16 | "Vite for fast development and bundling" | build-deploy | corroborada | 3.4.6 #1, #2, #3 (build `separado`); packages/app-1/package.json:7-8; packages/app-2/package.json:7-8; packages/host/package.json:7-8 |
| 11 | README.md:17 | "Module Federation to dynamically load micro frontends" | composição | corroborada | 3.4.5 #1, #2; packages/host/src/plugins/federationPlugin.js:15-18, 29 |
| 12 | README.md:18 | "Lerna for monorepo management" | estrutura | parcial | 3.4.2 (lerna `Undetermined`); package.json:4-8; lerna.json:1-4 |
| 13 | README.md:19 | "Independent Routing per micro frontend" | independência | contradita | packages/host/src/routeManifest.js:7-13, 20-26; packages/app-1/package.json:11-13; packages/app-2/package.json:11-13; packages/app-1/src/entry.js:8-13 |
| 14 | README.md:28-30 | "host/ # Shell application (Main container)", "app-1/ # Micro frontend 1", "app-2/ # Micro frontend 2" | estrutura | corroborada | 3.4.3 (packages/host, packages/app-1, packages/app-2 `Yes`); 3.4.5 #1, #2 |
| 15 | README.md:32 | "package.json # Monorepo package manager with workspaces" | estrutura | corroborada | 3.4.3 (workspace); package.json:4-6 |
| 16 | README.md:58-63 | "Alternatively, you can start each package individually" | independência | corroborada | packages/host/package.json:7; packages/app-1/package.json:7; packages/app-2/package.json:7; packages/app-1/src/main.js:5; packages/app-2/src/main.js:5 |
| 17 | packages/host/src/plugins/federationPlugin.js:3-6 | "initializes the module federation plugin before the app is mounted" | composição | corroborada | 3.4.4 (manual packages/host/src/plugins/federationPlugin.js:15); packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/main.js:15-17 |
| 18 | packages/host/vite.config.js:12 | "Entry point for the host's own remote modules" | composição | contradita | packages/host/vite.config.js:10-14; 3.4.5 (só relações host → remote) |

## Observações

**1. .github/workflows/main_vdumpavue3.yml:4.** O nome do workflow diz que ele constrói e implanta a aplicação. A parte de deploy existe: o job `deploy` publica um zip no Azure Web App `vdumpavue3` (.github/workflows/main_vdumpavue3.yml:67-73). A parte de build é desmentida: o passo de build roda `npm run build --if-present` na raiz (:26-30), que não define `build` (package.json:7-9), e o zip leva a árvore de fontes sem nenhum `vite build` dos pacotes (:32-33). Por isso a revisão de build e deploy deixou as três aplicações com Deploy `Undetermined`. O texto é o nome padrão do assistente do Azure para apps Node.js, e a raiz não tem script `start`.

**2. README.md:3.** São três aplicações Vite com Vue 3 num workspace, ligadas por Module Federation: `@module-federation/vite` nas três configurações e `@module-federation/runtime` no host. A revisão de composição registrou as duas relações host → remote, ativas. "Micro Frontend Architecture with Vue 3" (README.md:15) repete a afirmação.

**3. README.md:3.** Cada remote cria a própria instância com `createApp` dentro de `mount` (packages/app-1/src/entry.js:8-13; packages/app-2/src/entry.js:8-13), e o host cria a sua em packages/host/src/main.js:8. O host chama `mount` de cada remote no seu contêiner (packages/host/src/components/Loader.vue:74). A instância é separada, mas a biblioteca `vue` é declarada como `shared` nas três configurações (packages/host/vite.config.js:13; packages/app-1/vite.config.js:15; packages/app-2/vite.config.js:15), o que a frase não contradiz. "Separate Vue Instances for each micro frontend" (README.md:20) repete a afirmação.

**4. README.md:5.** O manifesto é um array fixo no host (packages/host/src/routeManifest.js:1-28), com remote e rota de cada micro frontend. O roteador gera as rotas a partir dele na inicialização (packages/host/src/router/index.js:4-22), e `getRemotes` (packages/host/src/routeManifest.js:33-35) alimenta o registro dos remotes. "Dinâmico" vale no sentido de que as rotas são derivadas do manifesto por código, não declaradas uma a uma; o próprio manifesto é compilado no host. Repetem a afirmação "Dynamic Route Manifest Management" (README.md:21), "manages routing through the Route Manifest" (README.md:72) e "The Route Manifest is used to dynamically register micro frontend routes in the host application" (README.md:76).

**5. README.md:7.** Lida ao pé da letra, a frase diz que as rotas vêm dos micro frontends. No snapshot, nome e caminho de cada rota estão no manifesto do host (packages/host/src/routeManifest.js:7-13, 20-26). Os remotes expõem só `./entry` com `mount`/`unmount` (packages/app-1/vite.config.js:12-14; packages/app-2/vite.config.js:12-14) e não fornecem rota nenhuma. O que se carrega dinamicamente é o micro frontend de cada rota, não a rota.

**6. README.md:8.** O host tem links para `/app-1` e `/app-2` e um único `<RouterView />` (packages/host/src/App.vue:4-8). Na troca de rota, `Loader.vue` desmonta o remote atual e monta o da nova rota no mesmo contêiner (packages/host/src/components/Loader.vue:64-74, 103-108), sem recarregar a página. "Seamless" é qualidade que o snapshot não mede; o mecanismo de navegação existe.

**7. README.md:9.** O registro existe: o roteador é criado em tempo de execução a partir do manifesto (packages/host/src/router/index.js:4-22) e instalado em packages/host/src/main.js:13. A atualização não tem artefato: não há `addRoute`, `removeRoute` nem outra mudança de rota depois da criação do roteador, e o manifesto é constante. Daí `parcial`.

**8. README.md:10.** As duas entradas do manifesto têm a mesma forma, `remote` (`module`, `entry`) e `route` (`name`, `path`, `meta`) (packages/host/src/routeManifest.js:2-27). O roteador as converte do mesmo jeito, com o mesmo componente (packages/host/src/router/index.js:5-12). A consistência vem de as rotas ficarem num só arquivo do host, não de algo nos micro frontends.

**9. README.md:11.** Todas as rotas usam `Loader.vue` (packages/host/src/router/index.js:11), que acha o remote da rota, desmonta o anterior, carrega o novo e chama `mount` (packages/host/src/components/Loader.vue:63-84, 87-97). Repetem a afirmação "Instead of directly referencing remote apps, all routes are set to render `Loader.vue`, which is responsible for loading, mounting, and unmounting the micro frontends dynamically" (README.md:76), "using `Loader.vue` as the single entry point for rendering micro frontends" (README.md:124) e os comentários de packages/host/src/components/Loader.vue:43-46, 62, 66 e 99.

**10. README.md:16.** Cada pacote usa `vite` para desenvolvimento e `vite build` para gerar o próprio artefato (packages/app-1/package.json:7-8; packages/app-2/package.json:7-8; packages/host/package.json:7-8). A revisão de build e deploy registrou build `separado` para as três. "Fast" não é verificável no snapshot.

**11. README.md:17.** O host registra os remotes com `init` de `@module-federation/runtime` e os carrega sob demanda com `loadRemote(`${module}/entry`)` (packages/host/src/plugins/federationPlugin.js:15-18, 29), chamado por `Loader.vue` quando a rota é renderizada (packages/host/src/components/Loader.vue:70). Repetem a afirmação "The Host dynamically loads App 1 and App 2 via Module Federation" (README.md:72) e o comentário "Load the remote module dynamically via Vite Module Federation" (packages/host/src/components/Loader.vue:69). O comentário fala em Vite, mas a chamada é da biblioteca de runtime; as duas são Module Federation, a tecnologia registrada na revisão de dependências, e o host também usa `@module-federation/vite` (packages/host/vite.config.js:3, 10-14).

**12. README.md:18.** O Lerna está nas dependências de desenvolvimento e orquestra o `dev` da raiz (`lerna run dev`, package.json:8). O `lerna.json` só tem `$schema` e `version` (lerna.json:1-4), e os pacotes são definidos pelos `workspaces` do npm (package.json:4-6). Não há build, versionamento nem publicação via Lerna. A revisão de dependências deixou o `lerna` como `Undetermined`. Confirma-se o papel no `dev`; o resto da "gestão do monorepo" não tem artefato. "lerna.json # Lerna configuration" (README.md:33) repete a afirmação.

**13. README.md:19.** Nenhum micro frontend tem roteamento próprio. Os remotes não dependem de `vue-router` (packages/app-1/package.json:11-13; packages/app-2/package.json:11-13), e o `mount` deles cria a aplicação sem roteador (packages/app-1/src/entry.js:8-13). As rotas de app-1 e app-2 são definidas pelo host, no manifesto (packages/host/src/routeManifest.js:7-13, 20-26). O roteamento é central no host, o contrário do que a frase diz. O tema é `independência` porque a frase fala do roteamento de cada unidade como coisa própria dela.

**14. README.md:28-30.** A árvore de pastas dá os papéis: `host` como shell e contêiner principal, `app-1` e `app-2` como micro frontends. A revisão de estrutura registrou os três como unidades frontend, e a de composição registrou o host carregando os dois remotes.

**15. README.md:32.** A raiz declara `packages/*` em `workspaces` (package.json:4-6), o workspace que a revisão de estrutura registrou.

**16. README.md:58-63.** Cada pacote tem seu `dev` com `vite` (packages/host/package.json:7; packages/app-1/package.json:7; packages/app-2/package.json:7). Os remotes rodam sozinhos por `main.js`, que monta a própria aplicação em `#app` sem passar por `entry.js` (packages/app-1/src/main.js:5; packages/app-2/src/main.js:5). O host também sobe sozinho, mas só mostra os micro frontends se os remotes estiverem servidos nos endereços do manifesto (packages/host/src/routeManifest.js:5, 18). A falha na carga é capturada e registrada no console (packages/host/src/components/Loader.vue:81-83).

**17. packages/host/src/plugins/federationPlugin.js:3-6.** O plugin Vue do host chama `init` de `@module-federation/runtime` com os remotes do manifesto (packages/host/src/plugins/federationPlugin.js:9-18). Ele é instalado em packages/host/src/main.js:15, antes de `app.mount('#app')` em :17, como o comentário diz. É a mesma construção que a revisão de código-fonte registrou como `remote-resolution`.

**18. packages/host/vite.config.js:12.** O comentário diz que o `remoteEntry.js` do host é a entrada dos módulos remotos do próprio host. O plugin do host não declara `exposes` (packages/host/vite.config.js:10-14), então o host não oferece módulo nenhum. A revisão de composição não registrou nenhuma relação em que o host seja remote e observou que esse `filename` sem `exposes` não gera relação.

## Resumo

Afirmações: 18 (corroborada: 12, parcial: 2, contradita: 4, sem corroboração: 0). Temas: (estrutura: 4, composição: 10, build-deploy: 2, independência: 2).
