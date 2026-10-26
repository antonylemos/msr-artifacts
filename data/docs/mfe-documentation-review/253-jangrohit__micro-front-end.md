---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Leitura do repositório

A documentação é o README da raiz, em inglês, o único arquivo `documentation` do `artifacts.csv`. É longo e técnico: descreve a arquitetura com um diagrama (README.md:7-15), o papel do container e do marketing, a sequência de carregamento em runtime, uma tabela dos quatro pacotes, a execução local, o build, as configurações webpack, o deploy de produção e uma nota sobre os roteadores. Quase tudo confere com as revisões anteriores: host `packages/container`, remote `packages/marketing` ligado por Module Federation e montado por `mount`, `packages/auth` e `packages/dashboard` sem código e sem ligação ao host. Há duas exceções. A do deploy: o README diz que o repositório não tem pipeline de publicação (README.md:104), mas os dois workflows do GitHub Actions constroem e publicam cada aplicação no S3, como registrou a revisão de build e deploy (afirmação 22). E a da nota sobre os roteadores: o README diz que os dois `BrowserRouter` ficam aninhados (README.md:108), mas o marketing é renderizado numa árvore React separada pelo próprio `ReactDOM.render` (afirmação 23).

Foram lidos os artefatos que as revisões anteriores citam: os dois workflows, as configurações `config/webpack.{common,dev,prod}.js` do container e do marketing, os quatro `package.json`, os `public/index.html`, os `index.js` e `bootstrap.js` das duas aplicações, `packages/container/src/App.js`, `packages/container/src/components/MarketingApp.js`, `packages/container/src/components/Header.js` e `packages/marketing/src/App.js`. Os únicos comentários são o bloco `devServer` comentado nas configurações de produção (packages/container/config/webpack.prod.js:12-17; packages/marketing/config/webpack.prod.js:12-17), sem afirmação. Nenhum `package.json` tem `description`. Os nomes dos passos dos workflows ("Build the container app", .github/workflows/container.yml:30) só descrevem o passo.

Ficaram fora da tabela:
- as rotas internas do marketing, Landing em `/` e Pricing em `/pricing` (README.md:13-14, 27; packages/marketing/src/App.js:16-17), e o início de cada aplicação por `src/index.js`, que importa dinamicamente `src/bootstrap.js` para o webpack inicializar as dependências compartilhadas antes do React (README.md:21, 27; packages/container/src/index.js:1; packages/marketing/src/index.js:1). São detalhes internos de cada unidade;
- as portas 8080 e 8081 (README.md:10, 12, 45-46), detalhe de infraestrutura de desenvolvimento (packages/container/config/webpack.dev.js:8; packages/marketing/config/webpack.dev.js:9);
- o primeiro passo da sequência de carregamento, "The container's HTML loads its Webpack entry" (README.md:33), interno ao host, e as explicações do comportamento do Module Federation e do webpack em geral: o remote entry descreve os módulos expostos e não é a aplicação inteira (README.md:35) e o webpack carrega os chunks adicionais (README.md:37);
- o propósito reservado de `auth` e `dashboard` ("Reserved for authentication UI", "Reserved for dashboard UI", README.md:47-48), intenção sem artefato de UI; o `package.json` do dashboard lista Vue e PrimeVue (packages/dashboard/package.json:9-13), mas não há código;
- as instruções de instalação e execução e os comandos de build (README.md:54-66, 74-80), o diretório `dist/` e os nomes com hash de conteúdo da saída de produção (README.md:82; packages/container/config/webpack.prod.js:9; packages/marketing/config/webpack.prod.js:9), e o uso de Babel e `HtmlWebpackPlugin` (README.md:88, 92; packages/container/config/webpack.common.js:9-21), detalhes do build de cada unidade que não mudam a composição;
- o bloco de código com a URL do remote (README.md:100-102), que reproduz a configuração e acompanha a afirmação 20;
- os conselhos da nota de integração, de usar um único roteador ou um roteamento isolado no remote (README.md:108), e o cabeçalho com `signedIn={true}` e callback de saída provisório (README.md:110; packages/container/src/App.js:18), autenticação simulada interna ao host.

Ocorrências `doc-*`: README.md:1 e README.md:29 são títulos ("Micro Frontend Project", "Runtime loading"); README.md:37 é a explicação geral do webpack citada acima. As demais estão na tabela: README.md:3 nas afirmações 1 a 4; README.md:19 nas 7 e 8; README.md:25 nas 9 e 10; README.md:39 na 11 (e repete a 3); README.md:82 na 16; README.md:89 na 18; README.md:98 na 20; README.md:108 na 23. São repetições, registradas no parágrafo da afirmação: README.md:34 (7), README.md:36 (8), README.md:45 (2 e 5), README.md:68 (7 e 10) e README.md:94 (11).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "This project demonstrates a micro frontend architecture using **Webpack 5 Module Federation**." | estrutura | corroborada | 3.4.3 (packages/container e packages/marketing `Yes`); 3.4.5 #1; packages/container/config/webpack.prod.js:3, 19-23; packages/container/package.json:25 |
| 2 | README.md:3 | "The `container` package is the host application." | estrutura | corroborada | 3.4.5 #1; packages/container/config/webpack.prod.js:19-23 |
| 3 | README.md:3 | "It loads the independently built `marketing` application at runtime." | composição | corroborada | 3.4.5 #1; 3.4.6 #2; 3.4.4 src-mount-call |
| 4 | README.md:3 | "The `auth` and `dashboard` directories exist, but they are not currently connected to the host as micro frontends." | estrutura | corroborada | 3.4.3 (packages/auth e packages/dashboard `No`); packages/container/config/webpack.prod.js:21-23; packages/container/config/webpack.dev.js:16-18 |
| 5 | README.md:11 | "Header and host-level layout" (no container) | estrutura | corroborada | packages/container/src/App.js:3, 18; packages/container/src/components/Header.js:57-98 |
| 6 | README.md:12 | "marketing (remote, port 8081)" | estrutura | corroborada | 3.4.5 #1; packages/marketing/config/webpack.prod.js:19-24 |
| 7 | README.md:19 | "Its Module Federation configuration declares a remote named `marketing`, served in development from `http://localhost:8081/remoteEntry.js`." | composição | corroborada | 3.4.5 #1; packages/container/config/webpack.dev.js:14-18; packages/marketing/config/webpack.dev.js:9, 17 |
| 8 | README.md:19 | "The container imports `marketing/MarketingApp` in `src/components/MarketingApp.js`, then calls the remote's exported `mount` function with a DOM element owned by the container." | composição | corroborada | 3.4.4 src-mount-import; 3.4.4 src-mount-call; packages/container/src/components/MarketingApp.js:3, 9, 11 |
| 9 | README.md:25 | "Marketing exposes `./MarketingApp` from `src/bootstrap.js` using Module Federation. That module exports `mount(element)`, which renders the marketing React app into the element supplied by the host." | composição | corroborada | 3.4.4 src-mount-export; packages/marketing/config/webpack.prod.js:22-23; packages/marketing/src/bootstrap.js:5-7, 17 |
| 10 | README.md:25 | "In development, it also mounts itself into `#_marketing-dev-root`, allowing the remote to run on its own at `http://localhost:8081`." | independência | corroborada | packages/marketing/src/bootstrap.js:9-13; packages/marketing/public/index.html:9; packages/marketing/config/webpack.dev.js:8-9 |
| 11 | README.md:39 | "Module Federation coordinates loading the remote and sharing configured dependencies." (parte do compartilhamento) | composição | corroborada | packages/container/config/webpack.dev.js:19; packages/container/config/webpack.prod.js:24; packages/marketing/config/webpack.dev.js:21; packages/marketing/config/webpack.prod.js:25; packages/container/src/App.js:1; packages/marketing/src/App.js:1 |
| 12 | README.md:47 | "`packages/auth` \| … \| Package metadata only" | estrutura | corroborada | 3.4.3 (packages/auth `No`); packages/auth/package.json:1-29 |
| 13 | README.md:48 | "`packages/dashboard` \| … \| Package metadata only; its scripts reference Webpack config files that are not present" | estrutura | corroborada | 3.4.3 (packages/dashboard `No`); packages/dashboard/package.json:5-6 |
| 14 | README.md:52 | "Each package has its own `package.json` and lockfile; there is no root-level install script." | estrutura | corroborada | 3.4.3 (nenhuma declaração de workspace); packages/auth/package.json:1; packages/container/package.json:1; packages/dashboard/package.json:1; packages/marketing/package.json:1 |
| 15 | README.md:72 | "Build each deployable application from its own package directory" | build-deploy | corroborada | 3.4.6 #1; 3.4.6 #2; packages/container/package.json:6; packages/marketing/package.json:6 |
| 16 | README.md:82 | "The marketing build also emits `remoteEntry.js`, which the host needs to locate and load the remote's exposed module." | build-deploy | corroborada | 3.4.6 #2; packages/marketing/config/webpack.prod.js:21; packages/container/config/webpack.prod.js:22 |
| 17 | README.md:86 | "Each application has common, development, and production Webpack configuration files under `config/`" | build-deploy | corroborada | 3.4.3 (packages/container/config, packages/marketing/config); packages/container/package.json:5-6; packages/marketing/package.json:5-6 |
| 18 | README.md:89 | "`webpack.dev.js` configures the local dev server and Module Federation URLs." | composição | corroborada | packages/container/config/webpack.dev.js:7-8, 16-18; packages/marketing/config/webpack.dev.js:8-9, 15-20 |
| 19 | README.md:90 | "`webpack.prod.js` enables production output and sets deployment paths." | build-deploy | corroborada | 3.4.6 #1; 3.4.6 #2; packages/container/config/webpack.prod.js:7-11; packages/marketing/config/webpack.prod.js:7-11 |
| 20 | README.md:98-101 | "The container's production Webpack config uses `PRODUCTION_DOMAIN` to locate the marketing remote at: `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`" | composição | corroborada | 3.4.5 #1; packages/container/config/webpack.prod.js:5, 22 |
| 21 | README.md:104 | "Deploy the marketing assets, including `remoteEntry.js`, at the configured marketing path, and deploy the container at its configured path." | build-deploy | corroborada | 3.4.6 #1; 3.4.6 #2; .github/workflows/container.yml:36; .github/workflows/marketing.yml:34 |
| 22 | README.md:104 | "this repository does not include a deployment pipeline that publishes those artifacts" | build-deploy | contradita | 3.4.6 #1; 3.4.6 #2; .github/workflows/container.yml:1-9, 30-42; .github/workflows/marketing.yml:1-9, 30-40 |
| 23 | README.md:108 | "Both `container/src/App.js` and `marketing/src/App.js` currently render a `BrowserRouter`. Since the host mounts marketing inside its own router, this creates nested routers in the composed application." | composição | contradita | packages/container/src/App.js:17-20; packages/marketing/src/App.js:14-19; packages/marketing/src/bootstrap.js:6 |

## Observações

**1. README.md:3.** Há duas unidades frontend, o container e o marketing, ligadas pelo `ModuleFederationPlugin` do próprio webpack, importado de `webpack/lib/container/ModuleFederationPlugin` (packages/container/config/webpack.prod.js:3), com webpack `^5.88.0` (packages/container/package.json:25). Por ser o plugin embutido no webpack, a revisão de dependências não registrou pacote de tecnologia, e a revisão de composição registrou o mecanismo `module-federation`; o README não nomeia tecnologia diferente da dos artefatos.

**2. README.md:3.** A configuração do container declara `name: "container"` e só `remotes`, sem `exposes` (packages/container/config/webpack.prod.js:19-23). O diagrama ("container (host, port 8080)", README.md:10) e a tabela ("Host shell", README.md:45) repetem o papel.

**3. README.md:3.** O container carrega o marketing em runtime pelo remote do Module Federation, e o marketing tem build próprio (3.4.6 #2). README.md:39 repete a afirmação: "This is runtime composition: the container does not compile the marketing source into its own bundle as a normal source import", e a primeira parte da frase seguinte ("Module Federation coordinates loading the remote") também. A importação `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:3) é resolvida pelo remote, não por caminho de código-fonte.

**4. README.md:3.** As duas configurações do container só declaram o remote `marketing` (packages/container/config/webpack.prod.js:21-23; packages/container/config/webpack.dev.js:16-18), e os dois pacotes nem são unidades frontend na revisão estrutural. A tabela repete "not wired into the host" para cada um (README.md:47-48).

**5. README.md:11.** O diagrama põe o cabeçalho e o layout de nível superior no container, acima do marketing. O `App` do host renderiza o `Header` próprio antes do wrapper do marketing (packages/container/src/App.js:3, 18-19), e o componente está em packages/container/src/components/Header.js:57-98. README.md:19 ("The container owns the top-level page and header") e a tabela (README.md:45) repetem a divisão.

**6. README.md:12.** O marketing declara `name: "marketing"`, `filename: "remoteEntry.js"` e expõe `./MarketingApp` (packages/marketing/config/webpack.prod.js:19-24). A tabela repete o papel ("Federated remote with landing and pricing routes", README.md:46). A porta fica na Leitura.

**7. README.md:19.** A configuração de desenvolvimento do container declara `marketing: "marketing@http://localhost:8081/remoteEntry.js"` (packages/container/config/webpack.dev.js:16-18), endereço que bate com a porta do devServer e o `filename` do marketing (packages/marketing/config/webpack.dev.js:9, 17). Repetem a afirmação o passo 2 da sequência ("The container requests the marketing remote entry from port `8081`", README.md:34) e README.md:68 ("The marketing remote must be running because the container fetches it from port `8081`"). Em produção, o endereço é outro (afirmação 20).

**8. README.md:19.** O wrapper do host importa `mount` de `marketing/MarketingApp` e o chama com o `div` que ele mesmo renderiza (packages/container/src/components/MarketingApp.js:3, 9, 11). O passo 4 da sequência repete a afirmação (README.md:36).

**9. README.md:25.** O módulo exposto é `./src/bootstrap` (packages/marketing/config/webpack.prod.js:22-23), que define `mount(el)` com `ReactDOM.render(<App />, el)` e o exporta (packages/marketing/src/bootstrap.js:5-7, 17).

**10. README.md:25.** Em desenvolvimento, o bootstrap procura `#_marketing-dev-root` e se monta nele (packages/marketing/src/bootstrap.js:9-13); o elemento existe no `index.html` do marketing (packages/marketing/public/index.html:9), servido pelo devServer na porta 8081 (packages/marketing/config/webpack.dev.js:8-9). A montagem isolada é só de desenvolvimento, sem relação com build ou deploy. README.md:68 repete ("To work on the remote by itself, open **http://localhost:8081**").

**11. README.md:39.** A parte nova da frase é o compartilhamento; a do carregamento está na afirmação 3. As quatro configurações passam as `dependencies` do próprio `package.json` como `shared` (packages/container/config/webpack.dev.js:4, 19; packages/container/config/webpack.prod.js:4, 24; packages/marketing/config/webpack.dev.js:5, 21; packages/marketing/config/webpack.prod.js:4, 25), e as duas listas são iguais (packages/container/package.json:8-14; packages/marketing/package.json:8-14). As duas unidades usam React (packages/container/src/App.js:1; packages/marketing/src/App.js:1). README.md:94 repete a afirmação com detalhes que também conferem: a lista vem das dependências de cada pacote, e não há `singleton` nem restrição de versão.

**12. README.md:47.** O `package.json` do auth só tem o script `test` padrão e dependências (packages/auth/package.json:4-6); além dele, há só o lockfile. README.md:110 diz algo próximo: "The `auth` package is not yet responsible for authentication", e o cabeçalho do host usa `signedIn={true}` fixo (packages/container/src/App.js:18).

**13. README.md:48.** Os scripts `start` e `build` do dashboard apontam para `config/webpack.dev.js` e `config/webpack.prod.js` (packages/dashboard/package.json:5-6), e o snapshot não tem o diretório `config/` do dashboard, como anota a revisão estrutural.

**14. README.md:52.** Os quatro pacotes têm `package.json` e `package-lock.json` próprios, e não há `package.json` na raiz nem `workspaces` (3.4.3, notas). A frase vem na seção de execução, mas afirma a fronteira dos pacotes.

**15. README.md:72.** Cada aplicação tem o próprio script `build` com a própria configuração (packages/container/package.json:6; packages/marketing/package.json:6), e a revisão de build e deploy registrou build `separado` para as duas.

**16. README.md:82.** A configuração de produção do marketing define `filename: "remoteEntry.js"` (packages/marketing/config/webpack.prod.js:21), e é esse arquivo que o host busca (packages/container/config/webpack.prod.js:22). O workflow do marketing invalida justamente o `remoteEntry.js` no CloudFront (.github/workflows/marketing.yml:40).

**17. README.md:86.** O container e o marketing têm `config/webpack.common.js`, `webpack.dev.js` e `webpack.prod.js` próprios, e os scripts de cada um apontam para essas configurações (packages/container/package.json:5-6; packages/marketing/package.json:5-6). O dashboard também referencia esses arquivos, mas não os tem (afirmação 13); o README fala de "each application", e o dashboard não é aplicação no snapshot.

**18. README.md:89.** No container, `webpack.dev.js` configura o devServer (packages/container/config/webpack.dev.js:7-8) e a URL do remote (:16-18). No marketing, configura o devServer na porta 8081 e o `ModuleFederationPlugin` com `filename: "remoteEntry.js"` (packages/marketing/config/webpack.dev.js:8-9, 15-20), sem URL explícita: o endereço do remote resulta da porta e do nome do arquivo, o mesmo que o container usa. O servidor de desenvolvimento, em si, é detalhe de infraestrutura; a parte arquitetural é a URL do Module Federation.

**19. README.md:90.** As duas configurações de produção definem `mode: "production"`, nomes com hash e `publicPath` (packages/container/config/webpack.prod.js:7-11; packages/marketing/config/webpack.prod.js:7-11). README.md:104 repete com os valores: "The marketing output uses `/marketing/latest/` as its public path; the container output uses `/container/latest/`" e "The `latest` directory convention is configured in Webpack". Os workflows publicam nesses mesmos prefixos (.github/workflows/container.yml:36; .github/workflows/marketing.yml:34).

**20. README.md:98-101.** A configuração lê `process.env.PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:5) e monta o remote como `marketing@${domain}/marketing/latest/remoteEntry.js` (:22). O valor do domínio é um secret do workflow do container (.github/workflows/container.yml:32-33), fora do snapshot.

**21. README.md:104.** A instrução separa o deploy das duas aplicações, cada uma no seu caminho, e é o que os workflows fazem: um por aplicação, cada um com gatilho no diretório dela e sincronização do `dist` com o prefixo próprio (.github/workflows/container.yml:36; .github/workflows/marketing.yml:34). A revisão de build e deploy registrou deploy `separado` para as duas. O README trata a publicação como passo manual; a afirmação 22 trata disso.

**22. README.md:104.** O snapshot tem os workflows `deploy-container` e `deploy-marketing`, que, a cada push na `main`/`master` que mude o diretório da aplicação, constroem, sincronizam o `dist` com o bucket S3 e invalidam o CloudFront (.github/workflows/container.yml:1-9, 30-42; .github/workflows/marketing.yml:1-9, 30-40). A revisão de build e deploy já registrou a contradição na sua Leitura. Os workflows não aparecem em nenhum trecho do README.

**23. README.md:108.** Os dois `App` renderizam `BrowserRouter` (packages/container/src/App.js:17; packages/marketing/src/App.js:14), e o wrapper do marketing é filho do `BrowserRouter` do host (packages/container/src/App.js:17-20). Na página, o roteador do marketing fica dentro do elemento do host. Essas partes se confirmam. A conclusão, não: o `mount` do marketing chama `ReactDOM.render` no elemento recebido (packages/marketing/src/bootstrap.js:6), o que cria uma árvore React separada, e os dois roteadores não ficam aninhados na mesma árvore de componentes; o aninhamento é só no DOM. Por isso a afirmação é `contradita`. O efeito em runtime dos dois roteadores sobre o mesmo histórico do navegador não se verifica sem execução.

## Resumo

Afirmações: 23 (corroborada: 21, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 8, composição: 8, build-deploy: 6, independência: 1).
