---
schema: 1
id: 1044372265
full_name: lucky-pyco/webpack-module-federation
url: https://github.com/lucky-pyco/webpack-module-federation
commit: 4548c35f738c1b6508367317cef9d1ea2ba79edb
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 100 — lucky-pyco/webpack-module-federation

## Contexto

Exemplo de interface de reserva de cinema com quatro alvos React próprios: `HomePageApp`, `DetailsPageApp`, `SeatSelectionApp` e a vitrine de componentes `ReactComponents`. Há também uma API Express em `MF_Server`. Somente HomePageApp e ReactComponents estão ligados por federação: o primeiro importa e renderiza o MovieCard exposto pelo segundo. DetailsPageApp e SeatSelectionApp têm entradas/builds, mas não participam dessa cadeia no snapshot.

A configuração de federação possui produtor, consumidor e pacotes compatíveis observáveis. A dúvida é interpretativa: compartilhar um card de imagem/título a partir de uma vitrine de componentes constitui composição de unidades frontend ou apenas code sharing, excluído pelo checklist? Segue-se a cautela de 089, sem criar regra de tamanho mínimo ou exigir tela completa. Q1–Q4 registram a cadeia técnica; Q5 fica Undetermined, com justificativa e revisão conjunta.

Clone confirmado: `lucky-pyco__webpack-module-federation`; SHA conforme `data/samples/mfe-sample-001/clones.csv:101`. Inventário integral por `git ls-tree -r 4548c35f738c1b6508367317cef9d1ea2ba79edb`: **80 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. Não há `node_modules/` versionado nem submódulos. `frontend_units: 4` conta os quatro alvos próprios com entradas e builds, incluindo a vitrine executável; não conta botões/cards individualmente nem a API. Dois desses quatro alvos têm ligação federada; o número não afirma que os outros dois estejam compostos. Não há manifesto na raiz, embora exista `package-lock.json` raiz; as configurações e scripts de build pertencem às respectivas subpastas.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:101` registra rank 100, id 1044372265, `strategies: technology` e elegibilidade `pass`. A rodada de origem é `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:18050` e `data/discovery/mfe-round-002/candidates.csv:18055` registram estratégia `technology`, descrição nula, tópicos vazios, linguagem JavaScript, licença nula, branch padrão `master`, criação e último push em 2025-08-25. São metadados de descoberta, não confirmação de arquitetura.
- Em ambos os bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, consultados com `sqlite3 -readonly`, a junção `hits JOIN queries` por `query_id` e filtro `hits.repository_id = 1044372265` retorna somente `technology-module-federation-repositories`: estratégia `technology`, endpoint `repositories`, consulta `"module federation" in:name,description,readme`, `path` vazio. Não há hit de código localizado nesses registros.
- **Eliminação dos campos:** não há README na árvore, e descrição/tópicos registrados estão vazios. Entre os campos nome/descrição/tópicos/README, o único campo textual disponível compatível com o tema é o nome `webpack-module-federation`. Isso identifica o sinal de descoberta por eliminação, sem reproduzir a indexação do GitHub ou usar o nome como evidência arquitetural. A avaliação abaixo depende exclusivamente de configurações e fontes.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | Os quatro manifestos possuem build/serve próprios com `webpack.config.js`: `HomePageApp/package.json:6–9`, `DetailsPageApp/package.json:6–9`, `SeatSelectionApp/package.json:6–9`, `ReactComponents/package.json:6–9`. Cada configuração define entrada e dist locais (`HomePageApp/webpack.config.js:6–18`, `DetailsPageApp/webpack.config.js:5–18`, `SeatSelectionApp/webpack.config.js:5–17`, `ReactComponents/webpack.config.js:6–18`). São quatro alvos físicos, sem inferir composição dos quatro. | moderada |
| Código-fonte (entradas) | `HomePageApp/src/index.js:1–5` e `ReactComponents/src/index.js:1–5` montam Apps locais com ReactDOM. Details e SeatSelection também têm entradas ReactDOM próprias (`DetailsPageApp/src/index.js:1–11`, `SeatSelectionApp/src/index.js:1–11`). Não são unidades extraídas de conteúdo documental ou dependências vendorizadas. | moderada |
| Configuração (host e remote) | `HomePageApp/webpack.config.js:26–32` instancia ModuleFederationPlugin e define `components@http://localhost:3002/remoteEntry.js`. `ReactComponents/webpack.config.js:26–33` usa nome `components`, filename `remoteEntry.js` e expõe `./MovieCard` e `./SnowButton`; seu dev server usa porta 3002 (`:13–18`). Nome, URL, porta e chave consumida se correspondem. | forte |
| Configuração (resolução de pacotes) | Os configs requerem plugins e Webpack (`HomePageApp/webpack.config.js:1–4`, `ReactComponents/webpack.config.js:1–4`). Esses pacotes estão declarados, junto dos loaders/presets usados (`HomePageApp/package.json:20–36`, `ReactComponents/package.json:17–41`). O lock do host registra Webpack 5.101.3, HtmlWebpackPlugin 5.6.4 e MiniCssExtractPlugin 2.9.4 (`HomePageApp/package-lock.json:6783–6785`, `:4173–4175`, `:4831–4833`); o do remote registra as mesmas versões (`ReactComponents/package-lock.json:9287–9289`, `:5500–5502`, `:6657–6659`). O plugin de federação vem de `webpack.container`, coerente com Webpack 5 declarado/travado, não de pacote ausente. | moderada |
| Configuração (demais builds) | As dependências dos requires/loaders/presets nos quatro configs foram confrontadas com os quatro manifestos; todas estão declaradas. Autoprefixer é requerido pelos configs PostCSS (`HomePageApp/postcss.config.js:1–3`, `ReactComponents/postcss.config.js:1–3`) e declarado em `HomePageApp/package.json:25` e `ReactComponents/package.json:21`. Details/SeatSelection declaram Webpack 5 e os mesmos plugins/loaders (`DetailsPageApp/package.json:19–34`, `SeatSelectionApp/package.json:19–34`), mas não possuem lockfiles próprios no inventário. A verificação é estática; não afirma resolução em instalação/build executados. | contexto |
| Código-fonte (consumo efetivo) | `HomePageApp/src/App.js:1–8` alcança HomeContent. Este declara `React.lazy(() => import('components/MovieCard'))` (`HomePageApp/src/components/HomeContent/HomeContent.jsx:6`) e renderiza `<MovieCard/>` sob Suspense na lista (`:28–46`). O módulo exposto tem default export correspondente (`ReactComponents/src/components/MovieCard/MovieCard.jsx:5–22`). O mecanismo não é dependência isolada ou configuração morta. | forte |
| Código-fonte (granularidade do elemento remoto) | MovieCard recebe título/imagem, monta URL de imagem e renderiza imagem mais Typography (`ReactComponents/src/components/MovieCard/MovieCard.jsx:3–22`). O host busca filmes, mas não passa seus dados ao card (`HomePageApp/src/components/HomeContent/HomeContent.jsx:16–18`, `:28–35`), que usa valores default. Isso sustenta a leitura como componente reutilizável de apresentação, mantendo a dúvida sobre code sharing. | ambígua |
| Código-fonte (vitrine do produtor) | `ReactComponents/src/App.js:3–11` importa componentes locais; `:22–40` demonstra MovieCard, botões, tipografia e dropdown. A federação expõe só card e botão, não esse App ou rotas (`ReactComponents/webpack.config.js:29–32`). SnowButton tem implementação visual (`ReactComponents/src/components/Button/Snow/Snow.jsx:4–7`, `:56`) e é usado na vitrine (`ReactComponents/src/App.js:28`), mas não foi encontrado consumidor federado dele. | ambígua |
| Configuração / Código-fonte (outros alvos) | Details e SeatSelection usam configurações convencionais sem ModuleFederationPlugin (`DetailsPageApp/webpack.config.js:20–26`, `SeatSelectionApp/webpack.config.js:19–25`); seus Apps importam apenas conteúdo local (`DetailsPageApp/src/App.js:1–8`, `SeatSelectionApp/src/App.js:1–8`). Não foram encontrados remotes, exposes ou ligação de navegação que os conecte ao host. | contrária |
| Código-fonte (fluxo de negócio parcial) | QuickBooking apenas monta dados e os escreve no console (`HomePageApp/src/components/QuickBooking/QuickBooking.jsx:9–16`); o callback opcional movieClicked não é fornecido pelo App (`HomePageApp/src/components/HomeContent/HomeContent.jsx:22–25`, `HomePageApp/src/App.js:8`). O domínio comum de reserva não estabelece composição com Details/SeatSelection. Isso não elimina o import federado observado do card. | contexto |
| Código-fonte (servidor) | `MF_Server/index.js:1–13` cria Express, serve imagens/arquivos estáticos e retorna dados de filmes, com porta 5555 (`:38–40`). É API/assets; seu manifesto declara Express/CORS (`MF_Server/package.json:11–16`), não outro frontend ou host federado. | contexto |
| Estrutura / Código-fonte (buscas negativas) | No inventário procurados README, ADRs, documentos/diagramas de arquitetura e submódulos: ausentes. Nos fontes/configs dos quatro alvos, excluídos lockfiles, procurados consumo de `SnowButton`, imports de `DetailsPageApp`/`SeatSelectionApp`, `window.location`, `location.href`, `<Route`, `<Link`, `iframe`, `postMessage`, `single-spa`, `registerApplication` e `importmap`. SnowButton aparece apenas no produtor/vitrine; os demais não estabelecem outra integração. Auditoria dos imports observados não encontrou caminhos relativos atravessando para fontes de outra aplicação; o especificador federado é `components/MovieCard`. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Os projetos são alvos físicos, mas o único artefato federado consumido é um card de apresentação de uma vitrine de componentes; não há unidades frontend compostas. |
| Q2 | No | Builds separados não estabelecem independência de unidades MFE quando a única relação aceita é compartilhamento de componente. |
| Q3 | No | HomePageApp insere um componente visual reutilizável, sem região funcional, página ou fluxo próprio do produtor. |
| Q4 | No | Module Federation está configurado e consumido, mas exclusivamente para distribuir um componente de uma biblioteca/vitrine de UI. |
| Q5 | No | O caso se enquadra na exclusão de compartilhamento de código e de biblioteca de componentes. |

## Motivo

- Aplica-se a exclusão de Module Federation usado somente para compartilhamento de código. O único consumo remoto é `MovieCard`, fornecido por uma vitrine de componentes.
- A cadeia técnica de federação é real, mas não há unidade funcional, página ou fluxo remoto integrado na interface do host.
- `approaches: []` registra que Module Federation não é aceito como abordagem MFE neste caso; DetailsPageApp e SeatSelectionApp permanecem alvos sem ligação de composição.
- `frontend_units: 4` conta alvos próprios executáveis, não módulos expostos; `repo_type: example` corresponde ao caráter demonstrativo da vitrine e do fluxo parcial de reserva. `ui_technologies: [react]` e `build_tools: [webpack]` decorrem dos fontes e configurações efetivas.

## Notas para análise

- **RQ1:** o único hit de descoberta em cada rodada é de repositório, compatível por eliminação com o nome. A evidência positiva de federação vem de fontes/configs; a classe não é inferida do nome ou da presença do plugin.
- **RQ3:** host → HomeContent → import lazy de components/MovieCard → exposição no produtor → componente default export. A cadeia de SnowButton termina na exposição/vitrine, e Details/SeatSelection têm entradas próprias, sem ligação encontrada à aplicação host. Esses limites precisam constar da análise mesmo que se aceite o card como composição suficiente.
- **Checklist (comparadores):** o caso 089 mantém Q5 em revisão por componentes/hook compartilhados; é o paralelo interpretativo mais próximo. O caso 083 mantém revisão sobre a suficiência da cadeia de entrada diante de defeito de execução. Aqui não foi encontrado desencontro equivalente de nome de container, chave exposta ou caminho consumido para o card; não se transfere a dúvida de execução de 083 para Q4 sem evidência. Os casos 076/084/096 têm host e remotes com cadeia explícita; a presença dessa cadeia técnica também existe aqui, mas sua granularidade funcional é a decisão aberta. As anotações consultadas de 089/083 estão em `review`, e 076/084/096 em `draft`; não se promoveu nenhuma delas a final nem se tratou uma proposta de regra como regra decidida.
- **Protocolo (famílias/templates):** buscas nas anotações por `lucky-pyco`, `webpack-module-federation`, `HomePageApp`, `ReactComponents`, `Avenger hi`, `QuickBooking` e `10-react-project` não encontraram irmão. Os quatro manifestos repetem o nome `10-react-project` e os configs têm estrutura semelhante, indicando base interna comum; não se demonstrou origem externa ou template compartilhado com candidato específico.
- **Histórico e branches:** clone não raso; **1 commit alcançável**, **0 merges** e **1 commit-raiz**, o próprio SHA avaliado, com assunto “init” e data 2025-08-25. Contagens conferidas por `git rev-list --count`, `--count --merges` e `--max-parents=0`. Somente `master`, `origin/master` e `origin/HEAD`, todos nesse SHA; sem outro branch usado para completar o snapshot.
- **Protocolo (limites):** não foram acessados rede/submódulos nem executados instalação, build, servidor ou navegador. Não se afirma comportamento operacional dos servidores locais, API, dados ou imagens externas. O ponto de revisão é a exclusão de code sharing, não uma exigência nova de execução bem-sucedida.

## Decisão registrada

Promover para **Non-MFE**. A federação entrega apenas `MovieCard` de uma vitrine de componentes para a HomePageApp; isso é compartilhamento de UI reutilizável, sem composição de unidade funcional. Os demais aplicativos não participam de uma cadeia de composição no snapshot.
