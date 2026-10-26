---
schema: 1
id: 1228993246
full_name: clarivex-tech/pervaxis-forge
url: https://github.com/clarivex-tech/pervaxis-forge
commit: 890dc0b4c4af914b2282f7546e5f39ead1026595
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 105 — clarivex-tech/pervaxis-forge

## Contexto

Ferramenta de geração de projetos, com um frontend administrativo Angular (Launchpad), API .NET e engine Scriban. Os diretórios `Templates/angular-shell` e `Templates/angular-microfrontend` são entradas do gerador: ele renderiza arquivos e devolve um ZIP, sem montar esses projetos como unidades da própria interface (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`; `pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/FileGenerator.cs:33–57`). `repo_type: other` registra a ferramenta, seguindo a distinção de 075; sua UI própria é contabilizada.

## Proveniência na amostra

- Rank 105, ID, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:106`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:106`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:29521` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:29527` registra `pass`. A rodada 001 tinha atividade incompleta para o critério de commit humano recente; a 002 registra commit qualificante. Ambas apresentam descrição nula, tópicos vazios, linguagem C#, licença MIT e `fork: false`.
- Consulta `sqlite3 -readonly`, unindo `hits` e `queries` por `query_id` e filtrando `repository_id=1228993246`, nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`: ambas as rodadas têm os hits `terminology-microfrontend-repositories` e `terminology-microfrontends-repositories`, estratégia `terminology`, endpoint `repositories`, consultas `microfrontend in:name,description,readme` e `microfrontends in:name,description,readme`, sem caminho de arquivo. Esses identificadores são chaves SQLite, sem numeração de linhas textuais.
- Por eliminação: o nome não contém os termos pesquisados, a descrição é nula e os tópicos estão vazios; o README menciona “Angular 18 Microfrontend” entre os produtos gerados (`README.md:28–41`). Isso é compatível com recuperação via README, embora os hits não informem o trecho exato de casamento. O nome e a recuperação temática não são evidência de implementação MFE.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 571 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. São 348 em `pervaxis-forge-api/`, 201 em `pervaxis-forge-launchpad/`, dez em `docs/`, quatro em `.github/`, dois em `.claude/` e seis arquivos na raiz. Não há `node_modules` versionado. Contagens são da árvore Git, sem linhas textuais artificiais. | contexto |
| Estrutura / Build/deploy | Há um único `project.json` real, do aplicativo `launchpad`, com executor `@nx/angular:application`, índice, entrada `main.ts` e tsconfig próprios (`pervaxis-forge-launchpad/apps/launchpad/project.json:2–14`). Os scripts de start/build apontam a esse mesmo alvo (`pervaxis-forge-launchpad/package.json:5–10`). Outros manifestos de frontend são templates `.sbn` ou cache, sem outro alvo próprio concreto. | contrária |
| Tecnologia / Build/deploy | Angular 21.2.9 e Nx Angular 22.7.0 estão declarados (`pervaxis-forge-launchpad/package.json:15–24`; `pervaxis-forge-launchpad/package.json:30–40`) e fixados no lockfile (`pervaxis-forge-launchpad/package-lock.json:292–297`; `pervaxis-forge-launchpad/package-lock.json:631–636`; `pervaxis-forge-launchpad/package-lock.json:6529–6534`). Os peers registrados para Nx Angular admitem os builders Angular 19 até antes de 22. As entradas e tsconfigs indicados existem. Isso valida a resolução estática básica do alvo, sem afirmar sucesso de build. Não há arquivo/hook explícito de bundler: `build_tools: []`, sem inferir Vite pelo cache ou Webpack por dependência transitiva. | contexto |
| Código-fonte | O bootstrap real importa `AppComponent` e `appConfig` e chama `bootstrapApplication` (`pervaxis-forge-launchpad/apps/launchpad/src/main.ts:3–11`). `appConfig` importa e registra `appRoutes` com `provideRouter` (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.config.ts:31–41`). `AppComponent` existe e é exportado (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.component.ts:52`). | contrária |
| Código-fonte / Composição | As cinco rotas lazy importam componentes locais de dashboard, enrollment, workspace, geração e acesso não autorizado (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.routes.ts:23–75`). Os arquivos existem e exportam os nomes consumidos: `VerticalDashboardComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/vertical-dashboard/vertical-dashboard.component.ts:239`), `VerticalEnrollmentComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/vertical-enrollment/vertical-enrollment.component.ts:102`), `VerticalWorkspaceComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/vertical-workspace/vertical-workspace.component.ts:64`), `GenerationWizardComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/service-generation/generation-wizard.component.ts:1009`) e `UnauthorizedComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/unauthorized/unauthorized.component.ts:35`). São páginas de uma aplicação com um build; lazy loading não cria unidades independentes. | contrária |
| Configuração | Os aliases `@core`, `@features`, `@shared`, `@models`, `@layout` e `@env` resolvem dentro da mesma aplicação (`pervaxis-forge-launchpad/tsconfig.base.json:17–23`). Não há import de fontes de outra unidade própria: o único alvo importa suas próprias páginas e serviços. | contexto |
| Código-fonte / Estrutura | O projeto da engine embute `Templates/**/*.sbn` como recursos e referencia Scriban (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Pervaxis.Forge.Engine.csproj:6–17`). `FileGenerator` carrega e renderiza cada template, substitui tokens de nomes e converte extensões `.sbn`/`.tstemplate` para os arquivos de saída (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/FileGenerator.cs:21–57`). Não são apps adicionais em execução no repositório. | contrária |
| Código-fonte | `PrintGenerator` seleciona `Templates/angular-shell` ou `Templates/angular-microfrontend` conforme o tipo solicitado e empacota os resultados (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`). O template MFE contém um export simbólico `MFE_ROUTES`, com nome de componente ainda parametrizado (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Templates/angular-microfrontend/libs/__APP__/src/lib/routes.tstemplate.sbn:19–24`). O template shell deixa o exemplo `loadChildren` comentado e parametrizado (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Templates/angular-shell/apps/__APP__/src/app/app.routes.tstemplate.sbn:21–32`). Não há cadeia remotes ↔ exposes ↔ consumo entre unidades próprias concretas. | contrária |
| Código-fonte | O Launchpad chama a API de geração e recebe um blob ZIP (`pervaxis-forge-launchpad/apps/launchpad/src/app/core/api/generation-api.service.ts:61–85`); não importa o código gerado como aplicação. O papel de produto exportado está demonstrado pelo código, além do README. | contrária |
| Tecnologia / Configuração / Composição | Busca no SHA por `ModuleFederation`, `remoteEntry`, `loadRemote`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `exposes` e `remotes`, em `pervaxis-forge-launchpad/apps/`, seu `package.json` e `nx.json`: nenhum resultado. Inventário de nomes não encontrou configuração Webpack/Rspack/Vite/federation. Não há unidade própria preparada para host externo nem mecanismo de integração por link/iframe/postMessage nessa aplicação. | ausente |
| Estrutura / Tecnologia | Há 56 arquivos em `.angular/` e 16 em `.nx/` versionados dentro do Launchpad. Uma busca mais ampla encontrou `registerApplication` e segurança de iframe em código Angular pré-empacotado (`pervaxis-forge-launchpad/.angular/cache/21.2.9/launchpad/vite/deps/chunk-LCXWEOF5.js:6768–6772`; `pervaxis-forge-launchpad/.angular/cache/21.2.9/launchpad/vite/deps/chunk-LCXWEOF5.js:15444–15448`) e dependências transitivas de federação no grafo Nx (`pervaxis-forge-launchpad/.nx/workspace-data/parsed-lock-file.dependencies.json:4583–4584`). São artefatos de ferramentas/terceiros, não registro single-spa ou composição do candidato. | contexto |
| Documentação | A especificação de arquitetura desenha uma UI Angular Launchpad, API REST e engine .NET/Scriban (`docs/FORGE_TECHNICAL_SPECIFICATION.md:29–85`), coerente com os alvos observados. O README apresenta a ferramenta e os projetos que gera (`README.md:8–24`; `README.md:28–41`). Inventário de nomes por ADR/architecture não encontrou ADR separado; a especificação e os blueprints são documentação de arquitetura, não evidência autônoma de MFE executado. | contexto |

## Autoria e histórico

Metadados no SHA fixado: 377 commits alcançáveis, 166 merges, um commit-raiz (`1ef7ea2f92a9075c3015d19c667ef0db1a3f9d9c`), clone não shallow. Pares autor/committer: 213 commits `Anand Jayaseelan`/`Anand Jayaseelan` e 164 `anand-clarivex`/`GitHub`. O HEAD é o merge de 22/05/2026 “Merge pull request #166 from clarivex-tech/develop”. São identidades registradas, sem inferir autoria intelectual integral ou procedência de cada dependência.

`git log --name-status` por pastas mostra adições de estrutura da UI, templates e engine no commit `356b537fc9dbf4338bec5384b95e15766dc5e430`, de Anand Jayaseelan (“Add Vertical Enrollment module, split blueprints, and create solution skeletons”). Para o arquivo de rotas, o histórico registra alterações em `a890cd5611db90d6c3e0c483c857fddf0038eacb` (“implement persistent layout shell”) e `d67784606b5dc7de2fe31c4f0dcc02b220624859` (“complete vertical enrollment integration with hosted BFF”). Na pasta `Generation/`, `b27ec276ea20c076eca1f7a200fc2daf00d0dd27` altera o núcleo de geração e `54228325653e04ba928c3629b109229890ffc429` acrescenta os tipos Angular Shell/MFE ao gerador. Esses registros apoiam evolução da ferramenta no histórico do titular; não demonstram que os projetos gerados componham sua UI.

A consulta de nomes por `Templates/` terminou parcialmente com objeto ausente `180c1f5a87748d994d0e6d7d87f9b32dfbba0ed8`. Com `GIT_NO_LAZY_FETCH=1`, não houve busca remota; esse trecho histórico é indisponível e não foi reconsultado. Nenhum blob histórico ou conteúdo de outro branch foi usado. Foram apenas registradas as refs: `main`/`origin/main`/`origin/HEAD` no SHA avaliado, `origin/develop` e diversas branches de features/fixes, além da tag `v1.0.0-rc1`.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um alvo frontend próprio, Launchpad (`pervaxis-forge-launchpad/apps/launchpad/project.json:2–14`). Shell/MFE são tipos de saída do gerador (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`); templates e cache não contam como unidades. |
| Q2 | No | Não há conjunto de unidades com entradas e builds próprios a comparar. O único alvo tem sua entrada/build e importa páginas locais do mesmo aplicativo (`pervaxis-forge-launchpad/apps/launchpad/project.json:7–14`; `pervaxis-forge-launchpad/apps/launchpad/src/app/app.routes.ts:23–75`). Isso não satisfaz o requisito literal de independência entre unidades. |
| Q3 | No | O router conecta páginas internas, não unidades frontend distintas (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.config.ts:31–41`; `pervaxis-forge-launchpad/apps/launchpad/src/app/app.routes.ts:23–75`). A engine devolve projetos como ZIP, sem carregá-los no Launchpad. |
| Q4 | No | Nenhum mecanismo de composição entre unidades próprias. Os sinais MFE estão nos templates de saída, não conectados à aplicação administrativa (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`; `pervaxis-forge-api/src/Pervaxis.Forge.Engine/Templates/angular-shell/apps/__APP__/src/app/app.routes.tstemplate.sbn:27–31`). |
| Q5 | No | Aplicação frontend convencional de uma ferramenta de geração; não implementa arquitetura MFE nem é unidade preparada para host externo. |

## Motivo

- `Non-MFE`: respostas No, sem exceção MFE-unit. A classificação resulta da relação entre engine, templates, saída e aplicativo administrativo; não da palavra Forge ou do README isolado.
- `frontend_units: 1` decorre do inventário completo e do único alvo próprio com bootstrap/build. Não conta o backend, páginas locais, código de terceiros em cache ou produtos que poderiam ser gerados. Segue 023/028 e 075/081: conteúdo/template de MFE e saída de gerador não são unidades concretas de Q1.
- Q2 aplica literalmente entradas/builds próprios e ausência de imports diretos de fontes de outra unidade. Um build do Launchpad e imports locais não fornecem uma segunda unidade independente. Não há composição de pacotes frontend em build time a arbitrar.
- Q2–Q4 ficam No: não foi encontrada unidade própria preparada para host externo fora do snapshot. A indisponibilidade de parte do histórico não transforma a estrutura observável do SHA em Undetermined.
- Não depende de decidir code sharing (089/100), imperfeição de execução ou contrato externo não conectável (097/103/104). Não há federação própria configurada/consumida nem contrato externo do Launchpad; os templates simbólicos pertencem ao produto do gerador. Também não é distribuição de plataforma ou plugin de host terceiro (074/102); caches de terceiros são separados como em 080.

## Notas para análise

- **RQ1 (famílias):** busca por `clarivex`, `pervaxis` e `Scriban` nas anotações disponíveis não localizou irmão/template já anotado. Os casos 075 e 081 são comparadores funcionais, sem afirmar origem comum. A UI Angular continua observável apesar de o tema MFE estar principalmente no produto gerado.
- **RQ1 (sinais enganosos):** `registerApplication` no runtime Angular refere-se a testabilidade, não single-spa; o grafo transitivo Nx não equivale a configuração de federação. O cache Vite não justifica `build_tools: [vite]`.
- **RQ3:** a cadeia relevante é template embutido → renderização/substituição de nomes → `GeneratedFile` → ZIP. A cadeia da UI é bootstrap → configuração do router → componentes locais com exports conferidos. Não há elo que faça o Launchpad consumir as saídas como unidades.
- **Protocolo:** as duas rodadas têm os mesmos hits temáticos, mas diferem na completude da elegibilidade. O snapshot analisado é exclusivamente o SHA de `clones.csv`, sem incorporar estados de outras branches, commits posteriores ou projetos gerados.
- **RQ1 (grafia e origem do acerto):** as duas consultas de descoberta usam a grafia sem espaço nem hífen (`microfrontend(s)`), nas duas rodadas, e a única ocorrência no README é `README.md:34` ("Angular 18 Microfrontend, fully wired"); os metadados da descoberta não têm descrição nem tópicos.
- **RQ2 (natureza da saída):** mesmo o produto gerado não é composição em runtime. O template `angular-microfrontend` gera uma biblioteca Nx (`libs/__APP__`, com `ng-package.json.sbn` e `project.json.sbn`, exportando `MFE_ROUTES`), e o template do shell prevê consumi-la por `loadChildren: () => import('@{{product}}/domain-feature')`, apenas em comentário de exemplo (`app.routes.tstemplate.sbn:27–31`): importação de pacote de workspace em build time, sem federação. "Microfrontend" designa, no gerador, uma biblioteca de rotas Nx.
