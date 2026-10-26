---
schema: 1
id: 1059720425
full_name: sofiaresttrepo/ms-generator
url: https://github.com/sofiaresttrepo/ms-generator
commit: 7bf1a37eeca1309ccb3a2eb22bc057a4fbb5d225
classification: Uncertain
checklist: { q1: yes, q2: undetermined, q3: undetermined, q4: undetermined, q5: undetermined }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 104 — sofiaresttrepo/ms-generator

## Contexto

Microserviço baseado no framework NebulaE, com backend de geração de dados de veículos e um módulo React de gestão. O script de desenvolvimento referencia um shell FUSE React de outro repositório do mesmo titular e entrega ao comando `nebulae compose-ui` o diretório de fontes deste módulo. A saída de composição e o código do shell não estão versionados neste snapshot (`playground/generate_playground.sh:5`; `playground/.gitignore:1–5`; `etc/mfe-setup.json:3–6`).

`frontend_units: 2` registra os dois alvos identificáveis pela configuração: um módulo local e o shell externo explicitamente referenciado. Não conta cada rota, o gateway/backend nem uma terceira unidade correspondente à saída futura do comando. A independência desses alvos e a suficiência dessa forma de integração permanecem abertas. O tipo `example` considera as instruções de playground, os trechos ainda exemplificativos e a tela de teste (`README.md:61–75`; `README.md:209–219`; `frontend/emi/generator-generator-management/vehicle/VehicleGeneratorTest.js:11–17`).

## Proveniência na amostra

- Rank, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:105`. O SHA e o clone correspondem a `data/samples/mfe-sample-001/clones.csv:105`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- O candidato aparece em `data/discovery/mfe-round-001/candidates.csv:18967` e `data/discovery/mfe-round-002/candidates.csv:18973`: descrição nula, tópicos vazios, JavaScript, licença MIT e branch padrão `master`.
- Consulta somente leitura às tabelas `hits` e `queries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, por `repository_id=1059720425`: ambas registram `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories`, estratégia `terminology`, endpoint `repositories`, consultas `"micro frontend" in:name,description,readme` e `"micro frontends" in:name,description,readme`; sem caminho de arquivo. São chaves de registros SQLite, não referências de linha de código.
- Por eliminação dos campos pesquisados, o nome não contém os termos, a descrição é nula e os tópicos estão vazios; o README apresenta “Micro-FrontEnd”/“MicroFrontEnd” na estrutura (`README.md:27–28`). Isso é compatível com a recuperação via README; os hits não fornecem o trecho exato que casou com a consulta. A recuperação não confirma arquitetura.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário completo por `git ls-tree -r` do SHA: 76 arquivos regulares (75 modo 100644 e um 100755), zero symlinks e zero gitlinks. Há 22 arquivos em `frontend/`, 33 em `backend/`, quatro em `docs/`, quatro em `playground/`, três em `api/`, três em `etc/`, dois em `deployment/` e cinco na raiz. Não há `node_modules` versionado nem submódulos. Contagens se referem à árvore Git, sem linhas textuais artificiais. | contexto |
| Configuração / Composição | O setup nomeia `generator-generator-management`, indica seu diretório de fontes existente e seus assets, sem comandos de prebuild (`etc/mfe-setup.json:3–6`). O script passa esse setup a `compose-ui`, com `FUSE_REACT`, shell `https://github.com/sofiaresttrepo/emi.git` e saída `emi` (`playground/generate_playground.sh:3–5`). Há relação explícita entre módulo e shell, mas não remotes/exposes de Module Federation. | moderada |
| Código-fonte | O módulo exporta `MicroFrontendConfig`, contendo rotas e imports lazy de três arquivos locais existentes: `generator/Generator`, `generators/Generators` e `vehicle/VehicleGenerator` (`frontend/emi/generator-generator-management/MicroFrontendConfig.js:7–29`). Exporta também navegação e locales (`frontend/emi/generator-generator-management/MicroFrontendConfig.js:30–58`). Não foi localizado no snapshot o consumidor desse export pelo shell. | ambígua |
| Tecnologia / Código-fonte | Existe UI React efetiva. A lista utiliza `FusePageCarded`, Redux e componentes locais, exportando a tela com reducer (`frontend/emi/generator-generator-management/generators/Generators.js:1–11`; `frontend/emi/generator-generator-management/generators/Generators.js:23–50`). A tela de veículos executa mutations/subscription e renderiza controles de iniciar/parar e lista (`frontend/emi/generator-generator-management/vehicle/VehicleGenerator.js:69–109`; `frontend/emi/generator-generator-management/vehicle/VehicleGenerator.js:134–180`; `frontend/emi/generator-generator-management/vehicle/VehicleGenerator.js:207–240`). | moderada |
| Código-fonte / Build/deploy | Os imports `@fuse` e `app/store/withReducer` dependem da árvore do shell ausente (`frontend/emi/generator-generator-management/generators/Generators.js:2–4`). A tela de detalhe também importa actions e páginas de erro por aliases do host (`frontend/emi/generator-generator-management/generator/Generator.js:12–13`; `frontend/emi/generator-generator-management/generator/Generator.js:23–24`). Os imports relativos de rotas têm arquivos correspondentes; isso não valida os aliases nem o contrato do consumidor externo. | ambígua |
| Build/deploy | O único par `package.json`/lockfile da árvore fica no backend. Seus scripts e dependências são de Node/backend (`backend/generator/package.json:9–16`; `backend/generator/package.json:31–43`). Não há manifesto, lockfile, entrada autônoma ou configuração de bundler do frontend que permita verificar versões de React/Fuse/router ou build independente. O README requer instalação global do CLI (`README.md:172–173`), sem versão fixada; não comprova sua disponibilidade/compatibilidade. `build_tools: []` não infere Webpack a partir do nome FUSE. | ausente |
| Estrutura / Documentação | A árvore não contém `playground/emi`; o ignore exclui os resultados gerados (`playground/.gitignore:1–5`). O README manda compor o frontend e iniciar a saída no playground (`README.md:216–219`; `README.md:257–260`), mas seu exemplo usa `FUSE2_ANGULAR`/`nebulae-university/emi`, divergindo do script React e shell do titular (`playground/generate_playground.sh:5`). O script e o código React sustentam a descrição do snapshot; a documentação antiga não valida o build. | ambígua |
| Código-fonte | “Generator” descreve geração de dados: o backend usa `interval(50)`, cria veículo aleatório e publica eventos (`backend/generator/bin/domain/vehicle/VehicleCRUD.js:163–174`; `backend/generator/bin/domain/vehicle/VehicleCRUD.js:220–249`). A interface local controla essa operação. Não é somente texto/código frontend exibido ou produzido por um gerador. Os veículos gerados não são unidades frontend. | contexto |
| Tecnologia / Configuração / Composição | Busca textual no SHA por `ModuleFederation`, `remoteEntry`, `exposes`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `webpack`, `vite`, `createRoot` e `ReactDOM.render`, em arquivos textuais próprios, excluindo o lockfile backend e o JSON de realm Keycloak: nenhum mecanismo correspondente; `exposes` aparece apenas como verbo na descrição de microAPIs (`README.md:51`). A composição candidata encontrada é `compose-ui`, não federação. | ausente |
| Documentação | O README identifica o framework NebulaE (`README.md:9`) e ainda orienta clonar uma base `nebulae-university/ms-generator` (`README.md:178–179`). `CONFIGURATION.md:100–106` descreve geração de dados e otimizações da UI. Inventariados `README.md`, `CONFIGURATION.md`, `docs/` e demais caminhos: não há ADR ou documento de arquitetura adicional que explique como o CLI importa `MicroFrontendConfig` ou isola builds. | contexto |

## Autoria e histórico

Metadados de `rev-list`/`log`, sempre com `GIT_NO_LAZY_FETCH=1`: cinco commits alcançáveis pelo SHA fixado, zero merges, um commit-raiz (`914d39b8f61a509a0fb489e5eac047374459eb11`), sem limite shallow. Autor e committer registrados nos cinco commits: `sofiaresttrepo`. `master`, `origin/master` e `origin/HEAD` apontam ao SHA avaliado; nenhum conteúdo de outro branch foi usado.

O histórico de nomes por pasta mostra adaptação efetiva: em `66088ab002a10a24a752a16671b21e199c76aef7` (“generator generating”), o frontend modifica `MicroFrontendConfig.js` e traduções e adiciona `gql/Vehicle.js`, `vehicle/VehicleGenerator.js` e `vehicle/VehicleGeneratorTest.js`; o backend ganha os arquivos de domínio de veículos. Em `7bf1a37eeca1309ccb3a2eb22bc057a4fbb5d225` (“generation started”), mudam `backend/generator/bin/domain/vehicle/VehicleCRUD.js`, `VehicleES.js` e os arquivos de data-access. Em `dcf6b8232be5fa01ad0fef9f99a3d919d00cae5c` (“customized template”), mudam os setups de `etc/` e o script de playground. São referências a metadados de commits e caminhos, não a linhas de blobs históricos.

A consulta adicional `git log --root --name-status` por `frontend/` e `etc/` interrompeu-se por objeto ausente `a7288a651d355dbc680d4c81d56e2ee0723d5e73`, com lazy fetch desativado. Essa parte do histórico é indisponível localmente; não houve busca remota nem insistência. Assim, o README aponta uma base de terceiros, e os metadados mostram customizações pelo titular, mas não permitem atribuir a autoria original de todos os arquivos importados. Não se presume que toda a UI seja vendorizada, nem que o titular tenha escrito toda a base.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Dois alvos identificáveis: módulo React local no setup e shell externo do mesmo titular explicitamente passado ao comando de composição (`etc/mfe-setup.json:3–5`; `playground/generate_playground.sh:5`). A contagem inclui a referência externa, sem afirmar independência. |
| Q2 | Undetermined | Há fontes de módulo destinadas ao shell, sem build/entrada independentes observáveis; aliases apontam para código do host (`frontend/emi/generator-generator-management/generators/Generators.js:2–4`). A montagem por CLI aparentemente integra fontes e não permite decidir a independência sem resolver a questão de composição em build time. |
| Q3 | Undetermined | Rotas, navegação e locales estão preparados para a aplicação do shell (`frontend/emi/generator-generator-management/MicroFrontendConfig.js:7–58`), e o script relaciona os alvos. Não há código consumidor do shell para verificar o carregamento/registro efetivo. |
| Q4 | Undetermined | Setup e comando estão conectados entre si (`etc/mfe-setup.json:3–6`; `playground/generate_playground.sh:5`), além de mera dependência. Entretanto CLI, shell, dependências frontend e resultado não estão presentes/fixados; não é verificável a cadeia setup → descoberta do export → registro das rotas. |
| Q5 | Undetermined | A preparação para um shell externo é concreta, mas a independência, o consumo e a admissibilidade da composição de fontes em build time permanecem abertos. Não basta a nomenclatura “MicroFrontend”. |

## Motivo

- `Uncertain/review`: não há resposta No conclusiva, mas Q2–Q5 permanecem Undetermined. Não se promove a arquitetura por README, nome, framework ou export de configuração isolado.
- A UI de controle realmente existe; as exclusões 075/081 para código frontend apenas gerado/exibido não eliminam esse módulo. Tampouco transformam os dados gerados ou a futura cópia do shell em unidades adicionais.
- Não há uma cadeia Module Federation para validar. Há um contrato de setup e um export de rotas, cujos caminhos locais existem, mas falta verificar o consumidor externo e sua compatibilidade. A ausência dessa verificação impede confirmar MFE-implemented ou aplicar automaticamente MFE-unit.
- `approaches: []` registra que não foi confirmado um mecanismo qualificável: o comando sugere composição de fontes em build time, mas não há publicação/importação de pacotes frontend que justifique rotulá-lo como `build-time-packages`.

## Notas para análise

- **RQ1 (família):** buscas por `sofiaresttrepo`, `ms-generator`, `nebulae`, `compose-ui` e `FUSE_REACT` nas anotações disponíveis não localizaram irmão/template já anotado. O parentesco com o framework/base NebulaE decorre de `README.md:9` e `README.md:178–179`, não de comparação de blobs históricos indisponíveis.
- **RQ2:** 097/103 alertam para configuração sem cadeia conectável. Aqui os destinos relativos das rotas existem, mas CLI, aliases e consumidor do export não são resolvíveis neste snapshot; não se afirma erro específico de props/exports sem o shell. 089/100 discutem code sharing; este caso oferece páginas, navegação e operações de domínio, embora ainda possa resultar em um único build do host.
- **RQ3:** 074/102/080 requerem separar plataforma/base de terceiros e código próprio. O comando atual aponta a shell do próprio titular; não configura exclusivamente plugin hospedado por plataforma de terceiros. As customizações identificadas não autorizam atribuir toda a base ao titular. 076/084/096 apresentam cadeias host/remotes mais completas; não há aqui essa mesma evidência de builds e consumo.
- **Checklist:** a decisão aberta sobre composição em build time também importa quando o mecanismo fornece fontes de módulos a um shell via CLI, sem manifestos frontend independentes. O snapshot não demonstra publicação de pacotes ou deploy separado.

## Decisão registrada

Manter **Uncertain**. O módulo local, o setup de `compose-ui` e o shell externo referenciado mostram uma relação de composição, mas o shell, o resultado gerado e o build independente não estão no snapshot. Assim, não é possível determinar se o módulo é uma unidade MFE relativamente independente ou apenas fontes incorporadas a uma aplicação FUSE convencional.
