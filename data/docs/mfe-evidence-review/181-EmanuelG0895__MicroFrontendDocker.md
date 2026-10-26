---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
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

# 181 — EmanuelG0895/MicroFrontendDocker

## Leitura do repositório

É um teste técnico de micro-frontends com Module Federation sobre Rspack e `@module-federation/enhanced`, empacotado em Docker atrás de um proxy Nginx. Tem três projetos irmãos, sem workspace na raiz: o host `MF-Shell` e os remotes `MF-CharacterDetail` e `MF-Characters`, todos em React (#20 a #22). Cada um tem build próprio e imagem própria num serviço próprio do compose (#25 a #27).

A cadeia que sustenta a arquitetura está toda no snapshot:
- **Dependência:** cada projeto declara `@module-federation/enhanced` no próprio manifesto (#1 a #3).
- **Configuração:** o host nomeia os containers `MF_CharacterDetail` e `MF_Characters`, com endereços em `localhost:3003` e `localhost:3002` (#8). `MF-CharacterDetail` expõe `./CharacterInfo` e `./View`, as duas para o mesmo arquivo (#4), e `MF-Characters` expõe `./Vista` (#6). Cada `rspack.config.ts` aplica o `ModuleFederationPlugin` ao seu projeto, e os dois remotes geram o bundle com `publicPath` absoluto nas portas que o host pede (#5, #7, #9).
- **Código:** o host carrega `MF_CharacterDetail/View` e `MF_Characters/Vista` por `React.lazy` (#15, #16). A tabela de rotas liga `/` ao primeiro e `/details/:id` ao segundo (#17), e os componentes são renderizados com props e callback (#18, #19).
- **Relações:** daí saem duas relações host → remote, ambas ativas (#23, #24). Os remotes não consomem nada um do outro. A passagem da lista ao detalhe vai pelo host: o remote da lista chama `onCharacterClick` e o host navega e entrega o `characterId` ao remote de detalhe.

Sinais que enganam:
- **Nomes trocados:** `MF_CharacterDetail` expõe a lista e `MF_Characters` expõe o detalhe. A documentação diz o contrário, e as duas afirmações são contraditas (#32, #33). O histórico mostra que a lista sempre esteve em `MF-CharacterDetail` e o detalhe em `MF-Characters` (#41).
- **Portas e deploy:** a composição funciona com as portas de desenvolvimento (3003 e 3002). Nas imagens, os remotes servem em 3002 e 3001, portas que o compose não publica. O Nginx só os expõe por `/character-detail` e `/characters`, que não são as URLs de `remotes` (#25 a #27, #34). A tabela de portas do README não confere com nenhum dos dois perfis (#37), e o histórico não diz se ela e a configuração do host vêm de estágios diferentes (#43). O deploy separado vale como fronteira de cada aplicação, mas o perfil Docker, como está, não entrega a composição ao navegador.
- **`webpack.config.js` dos remotes:** declaram um `ModuleFederationPlugin` do webpack, mas nenhum script os usa; o build vigente é o do Rspack (#10, #11). O histórico não diz se algum dia foram usados (#40).
- **`shared-hooks`:** o host o compartilha como singleton, sem pacote nem uso nos remotes (#8). O histórico não diz se foi planejado ou abandonado (#42).
- **Tipos gerados:** as três linhas de `MF-Shell/@mf-types/` são declarações de tipo do DTS do Module Federation; duas delas são falsos positivos da busca por `import()` (#12 a #14).

A documentação, em espanhol, confere no geral (#28, #30, #31, #34 a #36, #39): três micro-frontends com Module Federation, empacotados com Docker e servidos pelo Nginx. Diverge na troca de papéis (#32, #33), nas portas (#37) e no Dockerfile que a árvore põe em `MF-Shell/` (#38). Ela também anuncia que os serviços sobem ao acessar qualquer URL, o que só se confirma em parte (#29). Nada fica ambíguo no snapshot.

Configuração: ficaram 8 blocos, um por arquivo, porque cada arquivo serve uma única unidade. Os `webpack.config.js` entram por estarem entre os Marcadores da 3.4.3. Ficaram de fora:
- os `package.json`: os `scripts` são build e servidores (dimensão 6), e as `dependencies` são a dimensão 1;
- os `index.html`, que só têm `<title>`, a folha de estilo e `<div id="app">` (MF-Shell/index.html:7-12);
- os `tsconfig.json`, que só têm `include` e alias de caminho (MF-Shell/tsconfig.json:19);
- o `docker-compose.yml`, os Dockerfiles, o `start.sh` e o `nginx.conf`: serviços, imagens e `location` são deploy (dimensão 6), e nenhum deles declara remote, exposição ou URL de remote.

## Observações

### 1. MF-CharacterDetail/package.json:29

**Observação:** `@module-federation/enhanced` `^0.8.9` em `dependencies`. A revisão o marca como configurado: MF-CharacterDetail/rspack.config.ts:5 importa `ModuleFederationPlugin` de `@module-federation/enhanced/rspack` e o instancia com `mfConfig` em :86, com a configuração de MF-CharacterDetail/module-federation.config.ts:1-10.

**Interpretação:** `MF-CharacterDetail` declara a implementação de Module Federation que o seu build usa.

### 2. MF-Characters/package.json:29

**Observação:** `@module-federation/enhanced` `^0.8.9` em `dependencies`. A revisão o marca como configurado: MF-Characters/rspack.config.ts:5 e :81 importam e instanciam o `ModuleFederationPlugin` com a configuração de MF-Characters/module-federation.config.ts:1-8.

**Interpretação:** `MF-Characters` declara a implementação de Module Federation que o seu build usa.

### 3. MF-Shell/package.json:29

**Observação:** `@module-federation/enhanced` `^0.8.9` em `dependencies`. A revisão o marca como configurado: MF-Shell/rspack.config.ts:5 e :98 importam e instanciam o `ModuleFederationPlugin` com a configuração de MF-Shell/module-federation.config.ts, que declara os remotes (:3-6), e o host importa `MF_CharacterDetail/View` em MF-Shell/src/App.tsx:7.

**Interpretação:** O host declara a implementação de Module Federation que o seu build usa.

### 4. MF-CharacterDetail/module-federation.config.ts:1-10

**Observação:** `mfConfig` com `name: "MF_CharacterDetail"`, `filename: "remoteEntry.js"`, `remotes: {}`, `exposes: { "./CharacterInfo": "./src/components/view.tsx", "./View": "./src/components/view.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** `MF-CharacterDetail` se declara como container `MF_CharacterDetail` e expõe o mesmo componente sob dois nomes. Não nomeia outra unidade.

### 5. MF-CharacterDetail/rspack.config.ts:1-97

**Observação:** `defineConfig` com entrada `./src/index.ts`, `devServer` na porta 3003 com cabeçalhos CORS, `output.uniqueName: "MF_CharacterDetail"` e `publicPath: "http://localhost:3003/"` (:17-39). Os plugins são `HtmlRspackPlugin` com `./index.html` e `new ModuleFederationPlugin(mfConfig)`, com o `mfConfig` importado de `./module-federation.config` (:8, :83-86).

**Interpretação:** O plugin de federação é aplicado ao build de `MF-CharacterDetail` com a configuração de #4. O `publicPath` é o endereço que o host pede em #8.

### 6. MF-Characters/module-federation.config.ts:1-8

**Observação:** `mfConfig` com `name: "MF_Characters"`, `filename: "remoteEntry.js"`, `exposes: { "./Vista": "./src/components/vista.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** `MF-Characters` se declara como container `MF_Characters` e expõe um componente. Não nomeia outra unidade.

### 7. MF-Characters/rspack.config.ts:1-92

**Observação:** A mesma forma de #5, com `devServer` na porta 3002, sem cabeçalhos CORS, `uniqueName: "MF_Characters"` e `publicPath: "http://localhost:3002/"` (:24-34), e `new ModuleFederationPlugin(mfConfig)` (:81).

**Interpretação:** O plugin de federação é aplicado ao build de `MF-Characters` com a configuração de #6. O `publicPath` é o endereço que o host pede em #8.

### 8. MF-Shell/module-federation.config.ts:1-12

**Observação:** `mfConfig` com `name: "MF_Shell"` e `remotes: { MF_CharacterDetail: "MF_CharacterDetail@http://localhost:3003/remoteEntry.js", MF_Characters: "MF_Characters@http://localhost:3002/remoteEntry.js" }`. Em `shared`, declara `react` e `react-dom` como singletons e `"shared-hooks": { singleton: true, requiredVersion: "*" }`. Não há pacote `shared-hooks` no `package.json` do host (MF-Shell/package.json:28-34).

**Interpretação:** A configuração do host declara os dois containers remotes e o endereço dos seus `remoteEntry.js`. O `shared-hooks` é uma entrada de compartilhamento sem pacote correspondente.

### 9. MF-Shell/rspack.config.ts:1-110

**Observação:** `defineConfig` com entrada `./src/index.ts`, `devServer` na porta 3000 com `Access-Control-Allow-Origin: "*"`, `output.uniqueName: "MF_Shell"` e `publicPath: "auto"` (:16-36). Os plugins são `HtmlRspackPlugin` com `./index.html` e `new ModuleFederationPlugin(mfConfig)`, com o `mfConfig` importado de `./module-federation.config` (:8, :95-98).

**Interpretação:** O plugin de federação é aplicado ao build do host com a configuração de #8.

### 10. MF-CharacterDetail/webpack.config.js:1-53

**Observação:** Configuração de webpack com entrada `./src/index.tsx`, `mode: 'development'`, porta 3003 e `publicPath: 'auto'`. O `ModuleFederationPlugin` vem de `require('webpack').container` (:2) e declara `name: 'MF_CharacterDetail'`, `library: { type: 'global', name: 'MF_CharacterDetail' }`, `filename: 'remoteEntry.js'`, expõe `./View` e compartilha `react` e `react-dom` como singletons (:37-48). Nenhum script do `package.json` chama webpack, só `rspack` (MF-CharacterDetail/package.json:5-9).

**Interpretação:** É uma configuração de federação alternativa que o build não lê. Não participa da composição do snapshot.

**Nota:** Força `fraca`, e não `moderada`, porque o arquivo não é usado por nenhum script (3.4.2 e 3.4.3, Notas): a construção não participa da composição.

### 11. MF-Characters/webpack.config.js:1-52

**Observação:** Configuração de webpack com entrada `./src/index.tsx`, `mode: 'development'`, porta 3002 e `publicPath: 'auto'`. O `ModuleFederationPlugin` vem de `require('webpack').container` (:2) e declara `name: 'mf_characters'`, `filename: 'remoteEntry.js'`, `exposes` vazio (só um comentário de exemplo, :41) e `react` e `react-dom` como singletons (:37-47). Nenhum script do `package.json` chama webpack (MF-Characters/package.json:5-9).

**Interpretação:** É uma configuração de federação alternativa que o build não lê, com outro nome de container e nada exposto. Não participa da composição do snapshot.

**Nota:** Força `fraca`, e não `moderada`, pelo mesmo motivo de #10.

### 12. MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts:3

**Observação:** `type PackageType<T> = T extends 'MF_CharacterDetail/Vista' ? typeof import('MF_CharacterDetail/Vista') :any`, num arquivo de declaração gerado pelo DTS do Module Federation (MF-Shell/@mf-types/index.d.ts:1-10). O `include` do `tsconfig` do host é `["src", "src/types/federation.d.ts"]` e não cobre `@mf-types/` (MF-Shell/tsconfig.json:19).

**Interpretação:** É um tipo do módulo remoto, usado só na verificação de tipos. Não carrega nada em runtime.

### 13. MF-Shell/@mf-types/MF_CharacterDetail/compiled-types/components/view.d.ts:5

**Observação:** `export default function View({ onCharacterClick }: ViewProps): import("react/jsx-runtime").JSX.Element;`, na declaração gerada do componente `View`.

**Interpretação:** O `import()` é só o tipo de retorno JSX. É um falso positivo da busca por `import()` remoto.

### 14. MF-Shell/@mf-types/MF_Characters/compiled-types/components/vista.d.ts:5

**Observação:** `export default function Vista({ characterId }: VistaProps): import("react/jsx-runtime").JSX.Element;`, na declaração gerada do componente `Vista`.

**Interpretação:** O `import()` é só o tipo de retorno JSX. É um falso positivo da busca por `import()` remoto.

### 15. MF-Shell/src/App.tsx:7; MF-Shell/src/App.tsx:6-8

**Observação:** `const CharacterInfo = React.lazy(() => import("MF_CharacterDetail/View"));`. O `App.tsx` é carregado por `import("./App")` na entrada do host (MF-Shell/src/index.ts:1).

**Interpretação:** O host carrega sob demanda o módulo `./View` do container `MF_CharacterDetail`.

### 16. MF-Shell/src/app/details.tsx:3

**Observação:** `const Vista = React.lazy(() => import("MF_Characters/Vista"));`, num componente `Details` do host, que por sua vez é carregado por `React.lazy` (MF-Shell/src/App.tsx:10-12).

**Interpretação:** O host carrega sob demanda o módulo `./Vista` do container `MF_Characters`.

### 17. MF-Shell/src/App.tsx:24; MF-Shell/src/App.tsx:24-41, 55-56

**Observação:** `<Routes>` com `path="/"` para `<CharacterInfo onCharacterClick={handleCharacterClick} />` e `path="/details/:id"` para `<Details characterId={selectedCharacterId} />`, ambos em `Suspense`, dentro de um `BrowserRouter` (:45-53). `App` é montado por `root.render(<App />)` (:55-56).

**Interpretação:** A tabela de rotas do host liga cada caminho a uma tela remota: `/` à de `MF_CharacterDetail` e `/details/:id` à de `MF_Characters`, por meio de `Details`.

### 18. MF-Shell/src/App.tsx:29; MF-Shell/src/App.tsx:18-21

**Observação:** `<CharacterInfo onCharacterClick={handleCharacterClick} />` dentro de `Suspense`. O callback guarda o id e navega para `/details/${id}` (:18-21).

**Interpretação:** O host renderiza o componente remoto da lista e recebe dele, por callback, o personagem escolhido.

### 19. MF-Shell/src/app/details.tsx:13; MF-Shell/src/app/details.tsx:10-11

**Observação:** `return <Vista characterId={idFromParams} />;`, com o id lido da rota por `useParams` (:10-11).

**Interpretação:** O host renderiza o componente remoto do detalhe e lhe passa o id por prop.

### 20. MF-CharacterDetail; MF-CharacterDetail/package.json; MF-CharacterDetail/rspack.config.ts:17-19, 83-85; MF-CharacterDetail/src/App.tsx:14-15; MF-CharacterDetail/package.json:5

**Observação:** Projeto com `package.json`, lockfile e `rspack.config.ts` próprios. A entrada é `./src/index.ts`, a página vem de `./index.html`, e `App` é renderizado por `createRoot`. O build é `NODE_ENV=production rspack build`. Tem Dockerfile próprio e serviço `mf-character-detail` no compose. Não declara workspace.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React.

### 21. MF-Characters; MF-Characters/package.json; MF-Characters/rspack.config.ts:17-19, 78-80; MF-Characters/src/App.tsx:8-9; MF-Characters/package.json:5

**Observação:** Projeto com `package.json`, lockfile e `rspack.config.ts` próprios. A entrada é `./src/index.ts`, a página vem de `./index.html`, e `App` é renderizado por `createRoot`. O build é `NODE_ENV=production rspack build`. Tem Dockerfile próprio e serviço `mf-characters` no compose.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React.

### 22. MF-Shell; MF-Shell/package.json; MF-Shell/rspack.config.ts:16-18, 95-97; MF-Shell/src/App.tsx:55-56; MF-Shell/package.json:5

**Observação:** Projeto com `package.json`, lockfile e `rspack.config.ts` próprios. A entrada é `./src/index.ts`, a página vem de `./index.html`, e `App` é renderizado por `createRoot`. O build é `NODE_ENV=production rspack build`. A imagem vem do Dockerfile da raiz, que só copia `MF-Shell/` (Dockerfile:7-8, 15), no serviço `mf-shell` do compose.

**Interpretação:** É uma unidade frontend com limite próprio, a aplicação React que faz o papel de host.

### 23. MF-Shell/src/App.tsx:7; MF-Shell/src/App.tsx:24, 29; MF-Shell/module-federation.config.ts:4; MF-Shell/rspack.config.ts:98; MF-CharacterDetail/module-federation.config.ts:2-8; MF-CharacterDetail/rspack.config.ts:25, 38, 86

**Observação:** O host declara o container `MF_CharacterDetail` em `http://localhost:3003/remoteEntry.js`. Esse é o `name` e o `filename` da configuração de `MF-CharacterDetail`, servida na porta 3003 com o mesmo `publicPath`. O módulo importado, `MF_CharacterDetail/View`, é uma das duas entradas de `exposes`, e o host o renderiza na rota `/`. A outra exposição, `./CharacterInfo`, aponta para o mesmo arquivo e não é importada.

**Interpretação:** É uma relação host → remote ativa, do `MF-Shell` ao `MF-CharacterDetail`, por Module Federation.

### 24. MF-Shell/src/app/details.tsx:3, 13; MF-Shell/src/App.tsx:24; MF-Shell/module-federation.config.ts:5; MF-Shell/rspack.config.ts:98; MF-Characters/module-federation.config.ts:2-6; MF-Characters/rspack.config.ts:25, 33, 81

**Observação:** O host declara o container `MF_Characters` em `http://localhost:3002/remoteEntry.js`. Esse é o `name` e o `filename` da configuração de `MF-Characters`, servida na porta 3002 com o mesmo `publicPath`. O módulo importado, `MF_Characters/Vista`, é a única exposição, e o host o renderiza em `Details`, na rota `/details/:id`. `details.tsx` é um arquivo do host.

**Interpretação:** É uma relação host → remote ativa, do `MF-Shell` ao `MF-Characters`, por Module Federation.

### 25. MF-CharacterDetail/package.json:5; MF-CharacterDetail/rspack.config.ts:38; MF-CharacterDetail/Dockerfile:2-40; docker-compose.yml:52-55; nginx.conf:47-48

**Observação:** Build próprio com `rspack build` e imagem própria em dois estágios, feita da pasta da aplicação, que serve o `dist` com `serve` na porta 3002 (`EXPOSE 3002`, `start:prod`). É o serviço `mf-character-detail` do compose, que não publica a porta, e chega ao navegador por `/character-detail` no Nginx, na porta 80. O bundle é gerado com `publicPath: "http://localhost:3003/"`, a porta de desenvolvimento. A versão `0.0.1` não é usada, e o serviço não tem imagem nomeada nem tag.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. O endereço de onde o host carrega o remote só existe em desenvolvimento.

### 26. MF-Characters/package.json:5; MF-Characters/rspack.config.ts:33; MF-Characters/Dockerfile:2-40; docker-compose.yml:35-38; nginx.conf:38-39

**Observação:** O mesmo arranjo de #25: build e imagem próprios, `serve` na porta 3001 (`EXPOSE 3001`), serviço `mf-characters` sem porta publicada, rota `/characters` no Nginx. O bundle é gerado com `publicPath: "http://localhost:3002/"`, a porta de desenvolvimento. Sem versão usada na publicação.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. O endereço de onde o host carrega o remote só existe em desenvolvimento.

### 27. MF-Shell/package.json:5; MF-Shell/rspack.config.ts:35; Dockerfile:2-44; start.sh:7-21; docker-compose.yml:18-21; nginx.conf:29-30

**Observação:** Build próprio com `rspack build` e `publicPath: "auto"`. A imagem vem do Dockerfile da raiz, que copia só `MF-Shell/` e leva apenas o `dist` do host. O `CMD` é `start.sh`, que espera o `/health` de `mf-characters:3001` e de `mf-character-detail:3002` antes de rodar `start:prod` na porta 3000. É o serviço `mf-shell` do compose, servido em `/` pelo Nginx. Sem versão usada na publicação.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. Os remotes não entram na imagem do host; o deploy do host depende de os remotes estarem de pé.

### 28. README-Docker.md:3

**Observação:** "Este proyecto está configurado para ser desplegado usando Docker y Docker Compose con **inicio automático de todos los servicios**". A ideia se repete em README-Docker.md:130, README.md:224 e VALIDACION-MANUAL.md:25.

**Interpretação:** A afirmação diz que as aplicações são publicadas juntas por Docker Compose.

### 29. README-Docker.md:7, 55

**Observação:** "¡Ahora cuando accedas a cualquier URL, se levantan automáticamente TODOS los servicios!". A frase se repete em README-Docker.md:55.

**Interpretação:** A afirmação diz que os serviços sobem juntos e que a subida é disparada por uma requisição.

### 30. README-Docker.md:16

**Observação:** "El proyecto consiste en tres microfrontends con un **reverse proxy nginx**". O README.md repete a lista em README.md:7-12.

**Interpretação:** A afirmação fala das unidades como conjunto: três micro-frontends atrás de um proxy reverso.

### 31. README-Docker.md:19

**Observação:** "**MF-Shell**: Aplicación principal (puerto interno 3000)". O papel se repete em README.md:9, 104, 110 e 196.

**Interpretação:** A afirmação dá ao `MF-Shell` o papel de aplicação principal.

### 32. README-Docker.md:20

**Observação:** "**MF-Characters**: Microfrontend de lista de personajes (puerto interno 3001)". Repete-se em README.md:10, 105, 126 e 201.

**Interpretação:** A afirmação dá ao `MF-Characters` o papel de lista de personagens.

### 33. README-Docker.md:21

**Observação:** "**MF-CharacterDetail**: Microfrontend de detalles de personajes (puerto interno 3002)". Repete-se em README.md:11, 106, 139 e 206.

**Interpretação:** A afirmação dá ao `MF-CharacterDetail` o papel de detalhe de um personagem.

### 34. README-Docker.md:45-49

**Observação:** "**Todas las URLs ahora acceden a través del puerto 80:**", com a aplicação em `/`, MF-Characters em `/characters` e MF-CharacterDetail em `/character-detail`. A ideia se repete em README-Docker.md:65-66, 132, README.md:12, 41, 103, 240 e VALIDACION-MANUAL.md:63-75, 129-133.

**Interpretação:** A afirmação diz que cada aplicação é servida por um caminho próprio atrás de uma única porta.

### 35. README-Docker.md:57

**Observação:** "**Script de inicio** espera a que todos los microfrontends estén disponibles". Repete-se em README.md:238 e no comentário de start.sh:3.

**Interpretação:** A afirmação diz que o início de uma aplicação depende de as outras estarem disponíveis.

### 36. README.md:3

**Observação:** "Este proyecto implementa una arquitectura de microfrontends utilizando Module Federation con React, TypeScript y Docker." O título (README.md:1), README.md:222 e VALIDACION-MANUAL.md:3 dizem o mesmo.

**Interpretação:** A afirmação apresenta o repositório como arquitetura de micro-frontends composta por Module Federation.

### 37. README.md:99-106

**Observação:** Tabela de portas: "MF-Shell | 3000 | http://localhost:3000", "MF-Characters | 3001 | http://localhost:3001", "MF-CharacterDetail | 3002 | http://localhost:3002", e o Nginx em `http://localhost`. As mesmas portas aparecem nas URLs de `remoteEntry.js` a conferir (README.md:180-182) e no bloco que reproduz a configuração do host (README.md:113-118).

**Interpretação:** A afirmação diz que cada aplicação é servida na sua porta em `localhost`, e que o host acha os remotes nessas portas.

### 38. README.md:194-216

**Observação:** Árvore de pastas comentada com `MF-Shell/`, `MF-Characters/` e `MF-CharacterDetail/`, cada uma com `src/`, `module-federation.config.ts`, `package.json` e `Dockerfile`, e na raiz um "Dockerfile # Dockerfile principal". Não há `MF-Shell/Dockerfile` no snapshot.

**Interpretação:** A afirmação descreve três pastas de aplicação, cada uma com a sua imagem, e uma imagem geral na raiz.

### 39. README.md:221

**Observação:** "**Build Tool**: Rspack".

**Interpretação:** A afirmação só nomeia a ferramenta de build.

### 40. c228808 2025-06-27 (MF-Characters/webpack.config.js); 7c93dbc 2025-06-27 (MF-CharacterDetail/webpack.config.js, MF-Shell/webpack.config.js); 411b8a1 2025-06-27 (MF-Shell/webpack.config.js); 8850753 2025-06-27 (MF-Characters/package.json, MF-CharacterDetail/package.json); 137ba29 2025-08-19 (MF-Characters/webpack.config.js, MF-CharacterDetail/webpack.config.js)

**Observação:** `MF-Characters/webpack.config.js` está no commit que cria as pastas, `7c93dbc` adiciona o de `MF-CharacterDetail` e um de `MF-Shell`, e `411b8a1` remove o do shell. Os dois que restam mudam no snapshot. Os `package.json` dos remotes só mudam em `c228808` e `8850753`, e as versões antigas não estão no clone. A revisão marca o ponto como inconclusivo.

**Interpretação:** O histórico não diz se algum script já chamou webpack. A dúvida é só sobre o passado: no snapshot, os arquivos não são usados.

### 41. c228808 2025-06-27 (MF-CharacterDetail/src/components); 63e9550 2025-06-27 (MF-CharacterDetail/src/components/view.tsx); 7c93dbc 2025-06-27 (MF-Characters/src/components/vista.tsx); 0608a73 2025-06-27 (README-Docker.md); feccf9f 2025-06-27 (README.md)

**Observação:** `view.tsx`, a lista, é adicionado em `MF-CharacterDetail` por `63e9550`, e `vista.tsx`, o detalhe, em `MF-Characters` por `7c93dbc`. Nenhum arquivo dessas pastas é removido ou movido até o snapshot. O README-Docker.md e o README.md são escritos depois e não mudam mais. A revisão marca o ponto como esclarecido.

**Interpretação:** A troca de papéis da documentação não descreve um estágio anterior: a lista sempre esteve em `MF-CharacterDetail` e o detalhe em `MF-Characters`. As afirmações continuam contraditas.

### 42. 137ba29 2025-08-19 (MF-Shell/module-federation.config.ts)

**Observação:** A configuração do host muda em sete dos dezoito commits, o último deles o snapshot, e nenhuma versão anterior está no clone. Nenhum commit cria um caminho com `shared-hooks`. A revisão marca o ponto como inconclusivo.

**Interpretação:** O histórico não distingue um compartilhamento planejado e nunca conectado de um abandonado. A dúvida é só sobre o passado: no snapshot, não há pacote `shared-hooks`.

### 43. 411b8a1 2025-06-27 (MF-CharacterDetail/rspack.config.ts); 8850753 2025-06-27 (MF-Characters/package.json, MF-CharacterDetail/package.json); 6d5fdab 2025-06-27 (MF-Characters/rspack.config.ts); feccf9f 2025-06-27 (README.md, MF-Shell/module-federation.config.ts); 137ba29 2025-08-19 (MF-Shell/module-federation.config.ts)

**Observação:** As portas de desenvolvimento e do perfil Docker dos remotes já eram as do snapshot quando o README.md foi escrito, em `feccf9f`. A configuração do host muda nesse commit e de novo no snapshot, cuja mensagem anuncia "Update ports, module federation", e a versão de `feccf9f` não está no clone. A revisão marca o ponto como inconclusivo.

**Interpretação:** A tabela de portas não descreve um estágio anterior dos remotes, mas o histórico não diz se o bloco do README reproduzia a configuração do host naquele dia. A dúvida é só sobre o passado: no snapshot, a composição usa as portas de desenvolvimento.

### 44. 0608a73 2025-06-27 (README-Docker.md, docker-compose.yml); 4473fa3 2025-06-27 (docker-compose.yml)

**Observação:** O README-Docker.md nasce em `0608a73` e não muda mais. O `docker-compose.yml` nasce no mesmo commit e muda uma vez, em `4473fa3`, cuja versão anterior não está no clone. A revisão marca o ponto como inconclusivo.

**Interpretação:** O histórico não diz se algum artefato já iniciou contêineres por requisição. A dúvida é só sobre o passado: no snapshot, os serviços sobem no `up`.

### 45. 0608a73 2025-06-27 (Dockerfile, MF-Characters/Dockerfile, MF-CharacterDetail/Dockerfile); feccf9f 2025-06-27 (README.md)

**Observação:** `MF-Shell/Dockerfile` nunca existiu até o snapshot. O Dockerfile da raiz é adicionado em `0608a73`, com os dos remotes, e o README.md, com a árvore, só depois, em `feccf9f`. A revisão marca o ponto como esclarecido.

**Interpretação:** A árvore de pastas não descreve um estágio anterior: a imagem do shell sempre veio do Dockerfile da raiz. A afirmação continua contradita.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (MF-CharacterDetail/package.json:29) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4; declara #5 |
| 2 | 3.4.2 (MF-Characters/package.json:29) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6; declara #7 |
| 3 | 3.4.2 (MF-Shell/package.json:29) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8; declara #9; declara #15 |
| 4 | 3.4.2 (MF-CharacterDetail/package.json:29, Evidência); 3.4.3 (MF-CharacterDetail, Marcadores); 3.4.4 (MF-Shell/src/App.tsx:7, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #23 |
| 5 | 3.4.2 (MF-CharacterDetail/package.json:29, Evidência); 3.4.3 (MF-CharacterDetail, Marcadores, Entrada e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida e Artefatos); 3.4.7 #10 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #23 |
| 6 | 3.4.2 (MF-Characters/package.json:29, Evidência); 3.4.3 (MF-Characters, Marcadores); 3.4.4 (MF-Shell/src/app/details.tsx:3, Observação); 3.4.5 #2 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #21; configura #24 |
| 7 | 3.4.2 (MF-Characters/package.json:29, Evidência); 3.4.3 (MF-Characters, Marcadores, Entrada e Build); 3.4.5 #2 (Configuração); 3.4.6 #2 (Onde é servida e Artefatos); 3.4.7 #10 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #21; configura #24 |
| 8 | 3.4.2 (MF-Shell/package.json:29, Evidência); 3.4.3 (MF-Shell, Marcadores); 3.4.4 (MF-Shell/src/App.tsx:7, MF-Shell/src/app/details.tsx:3, Observação); 3.4.5 #1, #2 (Configuração); 3.4.7 #10 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #22; configura #23; configura #24 |
| 9 | 3.4.2 (MF-Shell/package.json:29, Evidência); 3.4.3 (MF-Shell, Marcadores, Entrada e Build); 3.4.4 (MF-Shell/src/App.tsx:7, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #23; configura #24 |
| 10 | 3.4.3 (MF-CharacterDetail, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | fraca | — |
| 11 | 3.4.3 (MF-Characters, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | fraca | — |
| 12 | 3.4.4 (MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts:3) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 13 | 3.4.4 (MF-Shell/@mf-types/MF_CharacterDetail/compiled-types/components/view.d.ts:5) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (MF-Shell/@mf-types/MF_Characters/compiled-types/components/vista.d.ts:5) | 3 código | código-fonte | — | contexto | fraca | — |
| 15 | 3.4.4 (MF-Shell/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #23 |
| 16 | 3.4.4 (MF-Shell/src/app/details.tsx:3) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #24 |
| 17 | 3.4.4 (MF-Shell/src/App.tsx:24) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #23; implementa #24 |
| 18 | 3.4.4 (MF-Shell/src/App.tsx:29) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #23 |
| 19 | 3.4.4 (MF-Shell/src/app/details.tsx:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #24 |
| 20 | 3.4.3 (MF-CharacterDetail) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.3 (MF-Characters) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (MF-Shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #22; liga #20 |
| 24 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #22; liga #21 |
| 25 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #20 |
| 26 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #21 |
| 27 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #22 |
| 28 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #26; corrobora #27 |
| 29 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte docker-compose.yml:9-12; corrobora em parte #27 |
| 30 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #20; corrobora #21; corrobora #22; corrobora nginx.conf:6-16 |
| 31 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora #24; corrobora #27 |
| 32 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #24; contradiz MF-Characters/src/components/vista.tsx:11-15 |
| 33 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #23; contradiz MF-CharacterDetail/src/components/view.tsx:11-27 |
| 34 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #26; corrobora #27 |
| 35 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27 |
| 36 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #20; corrobora #21; corrobora #22; corrobora #23; corrobora #24 |
| 37 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #25; contradiz #26; contradiz #5; contradiz #7; contradiz #8 |
| 38 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #22; contradiz #27 |
| 39 | 3.4.7 #12 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #20; corrobora #21; corrobora #22; corrobora #25; corrobora #26; corrobora #27 |
| 40 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #10; explica #11 |
| 41 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #32; explica #33 |
| 42 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #8 |
| 43 | 3.4.8 #4 | 8 histórico | histórico | — | contexto | fraca | explica #8; explica #25; explica #26; explica #37 |
| 44 | 3.4.8 #5 | 8 histórico | histórico | — | contexto | fraca | explica #29 |
| 45 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #38 |

## Resumo

Observações: 45. Dimensões (tecnologia: 3, configuração: 8, código: 8, estrutura: 3, composição: 2, build-deploy: 3, documentação: 12, histórico: 6). Força (forte: 6, moderada: 13, fraca: 26, ambígua: 0). Evidência (tecnológica: 14, arquitetural: 23, contexto: 8).
