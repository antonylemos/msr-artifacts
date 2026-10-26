---
schema: 1
id: 1199566448
full_name: piyalidas10/Angular-API-Response-Mocking
url: https://github.com/piyalidas10/Angular-API-Response-Mocking
commit: 7fdcde15543b4ac9a64b09e1be2019ea566a4471
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 107 — piyalidas10/Angular-API-Response-Mocking

## Contexto

Exemplo Angular de simulação de respostas HTTP a partir de CSV. Uma tela de usuários consome um serviço; o interceptor seleciona um CSV e devolve `HttpResponse`, com possibilidade de encaminhamento à API real. A referência a isolamento de microfrontends descreve uma aplicação possível dessa técnica de desenvolvimento, sem implementar composição frontend (`README.md:34–39`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:28–43`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:73–80`).

## Proveniência na amostra

- Rank 107, ID, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:108`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:108`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:27674` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:27681`, `pass`. Ambas apresentam descrição `In DEV and ST, API requests and responses are stubbed using CSV-based mock data.`, tópicos `angular`/`mock`, linguagem TypeScript, licença nula e `fork: false`.
- Consulta `sqlite3 -readonly` nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits` e `queries` e filtrando `repository_id=1199566448`: ambas as rodadas registram `terminology-microfrontend-repositories`, consulta exata `microfrontend in:name,description,readme`, e `terminology-microfrontends-repositories`, consulta exata `microfrontends in:name,description,readme`. Estratégia `terminology`, endpoint `repositories`, sem caminho de arquivo. Identificadores SQLite não são referências a linhas de código.
- Por eliminação, nome, descrição e tópicos não contêm os termos pesquisados. O README da raiz contém a grafia singular unida `Microfrontend` em `README.md:37` e `microfrontend` em `README.md:49`; o README interno repete `Microfrontend` em `angular-csv-mocking/README.md:34`. Isso é compatível com recuperação via README. Não há plural literal nesses trechos, e os hits não identificam o trecho exato ou a normalização usada para o hit plural. Nome, menção e recuperação temática não confirmam arquitetura.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 32 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. São 30 arquivos em `angular-csv-mocking/`, mais `.gitignore` e `README.md` na raiz. Não há `node_modules`, árvore vendorizada de plataforma, submódulo ou segundo projeto frontend. Contagens são da árvore Git, sem linhas textuais artificiais. | contexto |
| Configuração / Build/deploy | `angular.json` declara um único projeto `angular-csv-mocking`, tipo application, com builder `@angular-devkit/build-angular:application`, entrada `src/main.ts`, índice e tsconfig (`angular-csv-mocking/angular.json:5–26`). Os scripts start/build chamam Angular CLI (`angular-csv-mocking/package.json:4–9`), e `tsconfig.app.json` inclui a mesma entrada (`angular-csv-mocking/tsconfig.app.json:4–15`). Os caminhos indicados existem. | contrária |
| Tecnologia / Build/deploy | Angular e o builder estão declarados (`angular-csv-mocking/package.json:13–29`). O lockfile fixa builder 19.2.19 (`angular-csv-mocking/package-lock.json:79–89`), compiler-cli/core 19.2.15 (`angular-csv-mocking/package-lock.json:463–470`; `angular-csv-mocking/package-lock.json:536–544`) e TypeScript 5.6.3 (`angular-csv-mocking/package-lock.json:12510–12516`), compatível com o intervalo de peers TypeScript do builder/compiler-cli, `>=5.5 <5.9`. Resolução estática básica conferida, sem executar build. `build_tools: []`: bundler encapsulado pelo CLI, sem configuração ou hook explícito de Webpack/Vite/Rspack na árvore. | contexto |
| Código-fonte | `main.ts` importa os exports locais `appConfig` e `AppComponent` e chama `bootstrapApplication` (`angular-csv-mocking/src/main.ts:1–12`). `AppComponent` importa diretamente `UsersComponent` e o registra no componente raiz (`angular-csv-mocking/src/app/app.component.ts:1–10`); o template contém somente `<app-users>` (`angular-csv-mocking/src/app/app.component.html:1`). | contrária |
| Código-fonte / Composição | O selector `app-users` e o export `UsersComponent` correspondem ao consumo (`angular-csv-mocking/src/app/components/users/users.component.ts:4–10`). Não há props/exports remotos: o componente injeta `MockApiService`, chama `getResource('users')` e apresenta os dados (`angular-csv-mocking/src/app/components/users/users.component.ts:16–35`; `angular-csv-mocking/src/app/components/users/users.component.html:10–28`). É composição convencional de componentes de uma aplicação, sem entrada/build próprios por componente. | contrária |
| Configuração / Código-fonte | `appConfig` registra o export local `APP_ROUTES` e o `MockInterceptor` (`angular-csv-mocking/src/app/app.config.ts:6–23`); a lista de rotas está vazia (`angular-csv-mocking/src/app/app.routes.ts:8–9`). Não há root config carregando aplicações externas ou locais independentes. | contrária |
| Código-fonte | O serviço forma URLs `/api/...` e chama `HttpClient.get` (`angular-csv-mocking/src/app/shared/mock-api.service.ts:10–38`). O interceptor, registrado por DI, usa `HttpBackend` para obter CSV sem recursão, verifica ambiente/localhost/dev mode e responde com dados (`angular-csv-mocking/src/app/shared/mock.interceptor.ts:18–43`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:73–80`). Esse contrato é HTTP/dados; não há montagem ou carregamento de outra UI. | contrária |
| Tecnologia / Configuração / Composição | Busca textual no SHA, em todos os arquivos textuais exceto o lockfile, por `ModuleFederation`, `remoteEntry`, `exposes`, `remotes`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe` e `loadRemote`: nenhum resultado. Inventário de caminhos e inspeção do único manifesto/build não encontraram config de federação, import map, ciclos de vida para host externo ou cadeia remotes ↔ exposes ↔ consumo. | ausente |
| Estrutura / Código-fonte | O arquivo adicional `mock-api.service copy.ts` exporta outro serviço HTTP (`angular-csv-mocking/src/app/shared/mock-api.service copy.ts:1–16`); o componente importa o arquivo sem sufixo `copy` (`angular-csv-mocking/src/app/components/users/users.component.ts:1–2`). Cópia de serviço, CSV e templates HTML da tela não são unidades ou projetos gerados. | contexto |
| Documentação | O README apresenta a cadeia componente → serviço → HttpClient → interceptor (`README.md:8–13`) e cita `Microfrontend isolation`/`microfrontend + contract testing` como usos da técnica (`README.md:34–49`). O README interno explica CSV → JSON → resposta do interceptor (`angular-csv-mocking/README.md:96–114`). Inventário e leitura dos dois READMEs: não há ADR ou documento adicional de arquitetura, nem descrição de host/remotes concretos. | contexto |

## Autoria e histórico

Metadados no SHA: cinco commits alcançáveis, zero merges, um commit-raiz `b7f7a69469dfd32c143d218313a580ecb794f7ad`, clone não shallow. Todos registram autora `Piyali Das`; quatro têm committer `GitHub` e um, `Piyali Das`. As datas vão de 02/04/2026 a 04/04/2026. As únicas refs observadas são `main`, `origin/main` e `origin/HEAD`, todas no SHA avaliado; nenhum conteúdo de outro branch foi usado.

`git log --no-renames --name-status` por `angular-csv-mocking/`, com `GIT_NO_LAZY_FETCH=1`, mostra adição em bloco dos 30 arquivos no commit `523713855e72e13af7496858837378d1ef9d9931` (“angular-csv-mocking”), seguido de alterações apenas no README interno nos commits `c6f89e677deb97d59bad47142634f9aaa8cdb325` e `7fdcde15543b4ac9a64b09e1be2019ea566a4471`. A identidade dos commits não demonstra autoria intelectual original de todos os arquivos, e a adição em bloco, sozinha, não prova importação de terceiros. Não há indicação observada de cópia vendorizada separada: o aplicativo constitui o alvo próprio do candidato. Não houve objeto ausente nessas consultas, e não foram necessários blobs históricos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único projeto frontend, sem segunda unidade local ou referência de composição externa (`angular-csv-mocking/angular.json:5–26`). Menções didáticas a microfrontends não acrescentam unidades (`README.md:37`; `README.md:49`). |
| Q2 | No | O único projeto tem entrada/build próprios, mas não há conjunto de unidades independentes. Users é importado diretamente como fonte local do App, sem entrada/build separados (`angular-csv-mocking/src/app/app.component.ts:1–10`; `angular-csv-mocking/angular.json:17–26`). Isso não satisfaz o critério literal de independência entre unidades. |
| Q3 | No | O App renderiza sua tela local; as rotas estão vazias (`angular-csv-mocking/src/app/app.component.html:1`; `angular-csv-mocking/src/app/app.routes.ts:8–9`). Não há host carregando, montando ou roteando unidades distintas. |
| Q4 | No | Não há mecanismo configurado e usado para conectar unidades frontend. O interceptor conecta requisição HTTP a CSV/resposta, não UI a UI (`angular-csv-mocking/src/app/shared/mock.interceptor.ts:28–43`; `angular-csv-mocking/src/app/shared/mock.interceptor.ts:73–80`). Busca de mecanismos e inspeção da configuração não encontraram cadeia de federação. |
| Q5 | No | Aplicativo Angular convencional que demonstra mocking de API e menciona MFE como possível contexto de uso, sem implementar arquitetura MFE. |

## Motivo

- `Non-MFE`: Q1–Q5 No, sem exceção MFE-unit. `frontend_units: 1` resulta da árvore completa e do único alvo concreto; não indica falta de observabilidade. `repo_type: example` registra a demonstração de mocking com tela de usuários.
- Q2 exige entradas e builds próprios e ausência de import direto entre fontes de unidades. Uma aplicação com componente local e serviço não fornece essa pluralidade; não se reinterpretam arquivos `.ts`, CSV ou exemplos de API como unidades.
- Q4 exige composição configurada e conectando unidades. `provideRouter` com array vazio e interceptor HTTP não satisfazem esse critério. Não há preparação para host externo: Q2–Q4 ficam No, sem razão para Undetermined.
- Como no final 023 e nos comparadores 075/081/105, conteúdo sobre MFE, dados ou código exibido/gerado não estabelecem unidade. Aqui existe uma UI real, por isso a contagem é um, e não zero. Não há gerador de projetos frontend.
- Em contraste com 076/084/096/106 e o final 007, não há cadeia host/remotes; em contraste com 097/103/104, tampouco há configuração de integração a verificar como não conectável. Não surge a decisão de code sharing de 089/100, pois não há federação nem consumidor externo.
- Não é plugin/distribuição de plataforma como discutido em 074/102, nem cópia de código de framework separada como em 080. A procedência intelectual não integralmente demonstrada pelos metadados não altera o fato observável de haver um único alvo.
- Não há decisão aberta de composição em build time, link, iframe ou imperfeição de execução determinante para Q4. Não foram executados dependências, testes, build ou aplicação; a classificação decorre da estrutura e do código inspecionados.

## Notas para análise

- **RQ1 (famílias):** buscas por `piyalidas10`, `angular-csv`, `MockInterceptor`, `CSV-based` e `mock-api.service` nas anotações disponíveis não localizaram irmão/template já anotado. A técnica de interceptação para facilitar desenvolvimento de uma unidade não é evidência de composição MFE do projeto que a demonstra.
- **RQ3:** cadeia conferida: bootstrap → App → Users → serviço HTTP → interceptor → dados CSV/resposta. Os exports, selector e imports locais correspondem; não existe uma etapa remota omitida nessa cadeia observável.
- **Protocolo:** os dois hits têm grafias unidas, singular e plural; os trechos de README são singulares. A eliminação de nome/descrição/tópicos sustenta a origem temática pelo README, sem atribuir ao arquivo um plural que ele não contém ou transformar a busca em evidência arquitetural.
- **RQ1 (sinal temático):** micro-frontend é citado como benefício da técnica de mock ("Microfrontend isolation", `README.md:37`; "Great for microfrontend + contract testing", `README.md:49`), sem implementação; o README interno repete o texto (`angular-csv-mocking/README.md:34`).
