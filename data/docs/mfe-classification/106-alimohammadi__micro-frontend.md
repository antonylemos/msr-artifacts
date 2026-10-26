---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
url: https://github.com/alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 106 — alimohammadi/micro-frontend

## Contexto

Dois exemplos de composição federada: `ecomm/` contém container, produtos e carrinho em JavaScript/DOM; `packages/` contém container e Marketing em React. Cada exemplo compõe sua própria aplicação. Seguindo o precedente final 007, os dois exemplos do repositório são registrados juntos, com cinco alvos concretos; não se afirma que os cinco participem de uma única aplicação global. `packages/auth` e `packages/dashboard` contêm somente manifestos/lockfiles, sem entradas, configurações ou código, e não são unidades adicionais.

## Proveniência na amostra

- Rank, ID e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:107`. Clone, branch `main` e SHA correspondem a `data/samples/mfe-sample-001/clones.csv:107`. Origem da amostra na rodada 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:13377` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:13382`, `pass`. Ambas registram descrição `Repository for microfrontend course source code`, tópicos vazios, linguagem JavaScript, licença nula e `fork: false`.
- Consultas somente leitura aos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits` e `queries` e filtrando `repository_id=971885751`: as duas rodadas registram os mesmos quatro hits de estratégia `terminology`, endpoint `repositories`, sem caminho de arquivo. Grafias exatas:
  - `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme`;
  - `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme`;
  - `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme`;
  - `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme`.
- O README inteiro é a linha `# micro-frontend` (`README.md:1`), com hífen e singular. A descrição contém `microfrontend`, unido e singular. Por eliminação, tópicos não explicam a recuperação; nome/README contêm a forma hifenizada e a descrição contém a forma unida. Os hits não identificam o campo exato ou a normalização usada pelo buscador. Não há plural literal no README nem se atribuem todos os hits a ele. O nome é contexto de recuperação, sem valor confirmatório da arquitetura; a classificação abaixo se apoia em configuração e consumo no código.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 50 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. Vinte arquivos em `ecomm/`, 27 em `packages/` e três na raiz. Não há `node_modules` versionado ou submódulos. Dois arquivos `ecomm/products/dist/` são saída de build, não outra unidade. Contagens da árvore Git, sem números de linha artificiais. | contexto |
| Estrutura / Build/deploy | `ecomm/container`, `ecomm/products` e `ecomm/cart` têm manifestos, lockfiles, `src/index.js`, HTML e `webpack.config.js` próprios. Seus scripts `webpack serve` acionam os builds locais (`ecomm/container/package.json:5–7`; `ecomm/products/package.json:5–7`; `ecomm/cart/package.json:5–7`). As entradas padrão `src/index.js` existem e importam assincronamente o bootstrap/mount (`ecomm/container/src/index.js:1`; `ecomm/products/src/index.js:1`; `ecomm/cart/src/index.js:1`). | forte |
| Configuração / Composição (ecomm) | O host configura `products` → `products@http://localhost:8081/remoteEntry.js` e alias `carts` → `cart@http://localhost:8082/remoteEntry.js` (`ecomm/container/webpack.config.js:18–23`). Os provedores correspondem: `products`, porta 8081, arquivo `remoteEntry.js`, `./ProductsIndex` → `./src/mount.js` (`ecomm/products/webpack.config.js:6–16`); `cart`, porta 8082, `./CartShow` → `./src/mount` (`ecomm/cart/webpack.config.js:6–15`). O alias plural `carts` no consumidor aponta corretamente ao container remoto singular `cart`. | forte |
| Código-fonte (ecomm) | O host importa os exports nomeados `mount` de `products/ProductsIndex` e `carts/CartShow` e os chama com os elementos `#my-products` e `#my-cart` (`ecomm/container/src/bootstrap.js:1–6`). Ambos os elementos existem (`ecomm/container/public/index.html:8–11`). Produtos exporta `mount(el)` e escreve a lista no elemento (`ecomm/products/src/mount.js:5–12`; `ecomm/products/src/mount.js:31`); carrinho exporta `mount(el)` e escreve seu painel (`ecomm/cart/src/mount.js:3–7`; `ecomm/cart/src/mount.js:26`). O contrato recebido é um elemento DOM, exatamente o que o host passa. | forte |
| Código-fonte / Build/deploy (isolamento) | Os remotes também montam isoladamente em desenvolvimento quando existe seu elemento local (`ecomm/products/src/mount.js:19–23`; `ecomm/products/public/index.html:9`; `ecomm/cart/src/mount.js:14–18`; `ecomm/cart/public/index.html:9`). Isso distingue a composição de mera biblioteca de funções, mesmo sendo exemplos pequenos e usando Faker para dados fictícios. | forte |
| Estrutura / Build/deploy (React) | `packages/container` e `packages/marketing` têm fontes, entradas, HTML, manifests, lockfiles e configs Webpack próprias. Start/build indicam explicitamente as configs de desenvolvimento/produção (`packages/container/package.json:4–6`; `packages/marketing/package.json:4–6`). A configuração comum aplica Babel/React (`packages/container/config/webpack.common.js:4–17`; `packages/marketing/config/webpack.common.js:2–15`). | forte |
| Configuração / Composição (React) | O host configura `marketing@http://localhost:8081/remoteEntry.js` (`packages/container/config/webpack.dev.js:16–22`); o remote chama-se `marketing`, publica `remoteEntry.js` e expõe `./MarketingApp` → `./src/bootstrap` (`packages/marketing/config/webpack.dev.js:17–23`). Os arquivos comuns, manifests, HTML e fontes indicados existem. | forte |
| Código-fonte (React) | O adaptador importa `{ mount }` de `marketing/MarketingApp`, passa `ref.current` no effect e renderiza o div correspondente (`packages/container/src/components/MarketingApp.js:1–12`). O host renderiza o adaptador (`packages/container/src/App.js:3–11`). O remote exporta o mesmo `mount(el)` e executa `ReactDom.render(<App />, el)` (`packages/marketing/src/bootstrap.js:1–17`); não há divergência de nome de export ou argumento entre provedor e consumidor. | forte |
| Código-fonte (unidade de aplicação) | Marketing contém aplicação com páginas Landing/Pricing e router próprios (`packages/marketing/src/App.js:1–20`), além de bootstrap isolado condicional (`packages/marketing/src/bootstrap.js:9–13`) e elemento local (`packages/marketing/public/index.html:9`). O mount exposto inicializa essa aplicação, não apenas um botão/hook. O bootstrap do host monta seu próprio App em `#root` (`packages/container/src/bootstrap.js:1–5`; `packages/container/public/index.html:9`). | forte |
| Tecnologia / Build/deploy | Configs CommonJS são coerentes com manifests sem `type: module`. Os cinco manifests declaram as dependências usadas pelas configurações, e os respectivos lockfiles contêm todos esses pacotes. Exemplos: Webpack 5.99.6 no ecomm (`ecomm/cart/package-lock.json:6869–6874`; `ecomm/products/package-lock.json:6869–6874`; `ecomm/container/package-lock.json:6852–6857`) e 5.99.7 no React (`packages/container/package-lock.json:10064–10069`; `packages/marketing/package-lock.json:10064–10069`). CLI 4.10 e dev-server 3.11 têm peers compatíveis com Webpack 5, conforme lockfiles. React/ReactDOM 17 são declarados e fixados (`packages/marketing/package.json:11–13`; `packages/marketing/package-lock.json:7781–7799`). Verificação estática de resolução; não foram executados instalação/build/servidor. | moderada |
| Configuração / Build/deploy (limites) | Os dois exemplos reutilizam portas 8080/8081 e devem ser considerados separadamente. A produção React possui configs e depende de `PRODUCTION_DOMAIN` no host (`packages/container/config/webpack.prod.js:6–20`); não foi encontrado valor configurado no snapshot. Isso limita a afirmação sobre deploy de produção, sem desfazer a cadeia completa em desenvolvimento. O `name` incorreto `container` no manifesto de produtos (`ecomm/products/package.json:2`) não muda o nome federado explícito `products`. | contexto |
| Estrutura / Tecnologia | Inventário de `packages/auth/` e `packages/dashboard/`: somente `package.json` e lockfile, sem código, entrada, HTML ou configuração de build. As dependências React/Vue desses manifestos (`packages/auth/package.json:7–12`; `packages/dashboard/package.json:7–12`) não confirmam unidades implementadas. Vue não entra em `ui_technologies`. | ausente |
| Código-fonte / Composição | Inspeção dos imports das fontes dos cinco alvos e busca por imports relativos cruzando para `products/cart/marketing/container/src`: nenhum acesso direto às fontes de outra unidade; as ligações observadas passam por MF. Busca textual nos arquivos textuais do SHA, excluindo lockfiles e `ecomm/products/dist/`, por `single-spa`, `registerApplication`, `qiankun`, `wujie`, `customElements`, `postMessage` e `iframe`: nenhum resultado. Não há abordagem adicional sustentada. | ausente |
| Documentação | O README contém somente o título (`README.md:1`). Inventário dos 50 caminhos: não há ADR ou outro Markdown/documento de arquitetura, nem gerador de projetos. A classificação não depende de documentação descritiva. | contexto |

## Autoria e histórico

Metadados no SHA fixado: 13 commits alcançáveis, zero merges, um commit-raiz `de130a50a2b7c406234a22c394cbfa37216522a4`, clone não shallow. Todos registram autor e committer `Ali Mohammadi`, entre 24/04/2025 e 08/05/2025. As únicas refs são `main`, `origin/main` e `origin/HEAD`, todas no SHA avaliado.

`git log --no-renames --name-status` por pasta, com `GIT_NO_LAZY_FETCH=1`, mostra evolução incremental. Em `ecomm/`, o commit-raiz adiciona container/produtos; `ff27de28f7d8deacde1c62ffe10d11e4b8f5ad38` modifica a configuração do container e acrescenta seu bootstrap; `3817fd66df866586efa8a539e1603d26d9c4c1a3` adiciona o carrinho; `a8c742c5439831109aab630effc092905d6761ec` e `c784f558d5ddd0ca07d92454955d2bbdd96d27f3` acrescentam os mounts isolados e alteram o consumo/configuração.

Em `packages/`, `00dbb64db539caaf22b5701f70f026f70a37a3dc` adiciona os manifests iniciais; `02977ce34aba29060231547e958ddf30e5801624` acrescenta código/configuração Marketing; `3f24bcd5f430154a88fc1cf9ac841e50d27596ae` acrescenta o container; `97d5c5303cb70765ffaba6dae274351cf2737d7e` acrescenta o adaptador Marketing e altera os dois lados da federação; o HEAD adiciona o Header e ajusta manifests/configs. Não houve objeto ausente nessas consultas; não foi necessário ler blobs históricos.

A descrição em candidates identifica código de curso. Os metadados sustentam adaptação incremental sob a identidade do titular, mas não provam autoria original de todos os trechos. O padrão é próximo do caso 007; não foi comprovada cópia direta ou origem comum específica. Não se trata de uma pasta de terceiros vendorizada separada do alvo: essas fontes são os próprios exemplos que os manifests e configurações do candidato constroem e compõem.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades concretas e explicitamente conectadas em `ecomm/` e duas em `packages/`, com fontes/entradas/configurações; `ecomm/container/webpack.config.js:18–23` e `packages/container/config/webpack.dev.js:16–22` ligam os respectivos remotes. Os dois exemplos são agregados como no final 007, sem contar manifestos vazios. |
| Q2 | Yes | Cada alvo tem entrada e build Webpack próprios; scripts e configs observáveis, sem import direto de fontes de outra unidade (`ecomm/container/package.json:5–7`; `ecomm/products/package.json:5–7`; `ecomm/cart/package.json:5–7`; `packages/container/package.json:4–6`; `packages/marketing/package.json:4–6`). Q2 não exige script chamado literalmente build nem deploy de produção comprovado: o dev-server executa o build de cada alvo. |
| Q3 | Yes | Em cada exemplo, o container monta seus remotes na mesma aplicação: produtos/carrinho em elementos próprios (`ecomm/container/src/bootstrap.js:1–6`) e Marketing no adaptador React renderizado pelo host (`packages/container/src/components/MarketingApp.js:1–12`; `packages/container/src/App.js:3–11`). |
| Q4 | Yes | Configuração dos dois lados e consumo efetivo nas fontes: aliases/nomes, URLs/portas, exposes, destinos existentes e exports `mount` correspondem. `ecomm/products/webpack.config.js:10–16`, `ecomm/cart/webpack.config.js:10–15`, `packages/marketing/config/webpack.dev.js:17–23` e os consumidores acima. Não é dependência isolada ou configuração sem uso. |
| Q5 | Yes | As duas cadeias convergem para composição de aplicações com entradas/builds próprios. Não há divergência interpretativa em relação a Q1–Q4; enquadra-se em exemplos que efetivamente compõem unidades. |

## Motivo

- `MFE-implemented`, com Q1–Q5 Yes: monorepo com exemplos host/remotes e integração verificável no código. O precedente final 007 apresenta praticamente a mesma organização e contrato de montagem, inclusive auth/dashboard ainda sem implementação. `repo_type: example` corresponde ao código de curso, dados fictícios e páginas demonstrativas.
- A contagem é cinco, com React somente nas duas unidades implementadas de `packages/`; os três alvos DOM de `ecomm/` não implicam framework adicional. Faker gera dados da UI, não projetos frontend; não se aplica a exclusão de saída de geradores de 075/081/105. O dist de produtos é duplicação compilada do mesmo alvo, não sexta unidade.
- Diferentemente de 097/103/104, entradas, destinos expostos, exports consumidos, argumentos e elementos de montagem existem e correspondem; não é necessário um host externo ausente para compreender a cadeia. As configs são acionadas pelos scripts ou descobertas pelo padrão Webpack, com pacotes presentes nos lockfiles.
- Diferentemente do limite em 089/100, o contrato inicia unidades com UI própria e modo isolado, não apenas compartilhamento de botão/hook. O compartilhamento de Faker/React pelo MF não é a evidência decisiva: os mounts e o consumo dos remotes são. A cadeia é comparável a 076/084/096, com precedente final mais específico em 007.
- 074/102 tratam de distribuição/plataforma de terceiros; aqui não há host de plataforma externo, e o histórico registra implementação incremental dos exemplos no próprio repositório. Como em 080, dependência ou fonte compilada de terceiros não vira unidade adicional; isso não elimina automaticamente exemplos adaptados de curso.
- A ausência de deploy confirmado, valor de `PRODUCTION_DOMAIN`, sincronização explícita dos routers ou implementação auth/dashboard não impede a constatação da composição em desenvolvimento. Não foi detectado impedimento concreto na cadeia que exija tratar Q4 como Undetermined. Não há decisão aberta sobre build-time packages, links ou iframes.

## Notas para análise

- **RQ1 (família):** `docs/mfe-classification/007-Vishal-Kamra__Microfrontend-examples.md` registra dois exemplos com `ProductsIndex`, `CartShow`, `marketing/MarketingApp`, contrato `mount(el)` e os mesmos placeholders auth/dashboard. A semelhança indica família de implementação didática, não identidade de commits ou comprovação de procedência. As buscas por esses identificadores e por referência a curso não localizaram outro irmão nas anotações consultadas.
- **RQ2:** composição Module Federation com bootstrap assíncrono e montagem DOM explícita; React é detalhe interno de Marketing/container no segundo exemplo. Links de navegação internos não são o mecanismo de integração entre unidades.
- **RQ3:** a evidência central é a cadeia build/entry → configuração remotes/exposes → export nomeado → consumidor → destino DOM. O nome do repositório, o título README e dependências sozinhos seriam insuficientes.
- **Protocolo:** grafias singulares/plurais e hifenizadas/unidas dos hits foram preservadas. Os registros de busca não permitem atribuir automaticamente o hit plural a um README que contém apenas título singular.
