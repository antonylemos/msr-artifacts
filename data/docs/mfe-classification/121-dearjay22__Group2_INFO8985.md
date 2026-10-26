---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
url: https://github.com/dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [iframe]
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 121 — dearjay22/Group2_INFO8985

## Contexto

Demonstração de e-commerce com microsserviços Java, duas aplicações React, Docker Compose e monitoramento (`README.md:6–16`). O shell monta a aplicação Products em iframe na rota `/products`, com URL de Codespaces cuja porta 3001 corresponde ao serviço Products no Compose (`frontend/shell-app/src/App.js:6–35`; `docker-compose.yml:59–71`). A relação entre alvos próprios é observável; a suficiência desse contrato de URL/rota para composição MFE por iframe fica para revisão, sem pressupor uma regra metodológica nova.

Identidade e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:122`, status `cloned`; HEAD coincide com o commit do front matter. Toda inspeção Git do clone usou `GIT_NO_LAZY_FETCH=1`, sem alteração do snapshot, instalação, execução de aplicações ou rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:122` registra rank 121, estratégia `terminology` e elegibilidade `pass`. A fonte da amostra é a rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato aparece em `data/discovery/mfe-round-001/candidates.csv:21751`, com elegibilidade `unknown`, e `data/discovery/mfe-round-002/candidates.csv:21757`, com `pass`. Ambos registram descrição nula, tópicos vazios, linguagem JavaScript, `fork: false`, criação em 2025-12-02T20:20:55Z e push em 2025-12-09T20:29:58Z.

Consultas `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, pelo ID 1108713604, mostram:

| Consulta | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-12` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-12-01..2025-12-31` | 2026-10-07T19:25:56.873Z / 2026-10-08T15:40:18.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-12` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-12-01..2025-12-31` | 2026-10-07T22:09:59.973Z / 2026-10-08T15:48:34.496Z |

Os hits têm `path` vazio, sem localização do campo casado. Por eliminação, o nome não contém os termos e descrição/tópicos não os explicam; `README.md:2` contém “Microfrontends”, `README.md:13` contém “Products Microfrontend” e `README.md:107` contém “microfrontends”. Essas são linhas observadas compatíveis com as duas grafias, não posições fornecidas pela API. O README do SHA foi revisado em 2025-12-09T03:09:28Z, antes das buscas de outubro de 2026; não é posterior às coletas. O nome do repositório não fundamenta a classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r`: 111 arquivos regulares, sendo 110 `100644` e um `100755`; zero symlinks e zero gitlinks. Há dois alvos próprios em `frontend/shell-app` e `frontend/products-mf`, backend Java com artefatos `target`, dados e monitoramento. Não há `node_modules` versionado nem configuração explícita de bundler. JARs e dashboards de infraestrutura não são novas unidades frontend próprias. | contexto |
| Código-fonte (entradas) | `frontend/shell-app/src/index.js:1–12` e `frontend/products-mf/src/index.js:1–12` importam seus respectivos `App` e criam raízes React separadas. Cada diretório tem `public/index.html`, com o elemento `root` na linha 31. | moderada |
| Build/deploy (independência) | `frontend/shell-app/package.json:10–19` e `frontend/products-mf/package.json:10–19` declaram React, ReactDOM e scripts próprios de start/build/test via `react-scripts`. Os dois lockfiles resolvem `react-scripts` 5.0.1 em `frontend/shell-app/package-lock.json:12674–12676` e `frontend/products-mf/package-lock.json:12674–12676`. Não há hook/configuração de federação a resolver; o bundler permanece encapsulado pelo CRA. | moderada |
| Build/deploy (imagens) | `frontend/shell-app/Dockerfile:1–11` e `frontend/products-mf/Dockerfile:1–11` compilam cada diretório isoladamente e publicam sua saída em Nginx. `docker-compose.yml:59–71` define builds separados e publica shell em `3000:80` e Products em `3001:80`. Ambos têm fallback de navegação em seu `nginx.conf:5–9`. Os arquivos e entradas referenciados existem no snapshot; não se executou build. | forte |
| Código-fonte / Composição (ligação) | `frontend/shell-app/src/App.js:4–14` identifica a rota e, para hostname `app.github.dev` compatível, deriva `https://${codespaceName}-3001.app.github.dev`. `frontend/shell-app/src/App.js:26–36` oferece navegação para `/products` e monta iframe intitulado “Products Microfrontend” nessa rota. A porta corresponde à aplicação Products (`docker-compose.yml:66–69`), e não ao gateway backend na porta 8080. | forte |
| Código-fonte (alvo consumido) | `frontend/products-mf/src/App.js:1–9` lê `products.json` local e `frontend/products-mf/src/App.js:18–38` renderiza uma tabela de produtos. Esse `App` é a entrada importada em `frontend/products-mf/src/index.js:4–10`. `frontend/products-mf/src/ProductList.js:3–18` contém uma alternativa de fetch à API, mas não é importada pelo App efetivamente montado; não se presume que ela participe da cadeia atual. | moderada |
| Código-fonte (fronteiras) | Busca ativa literal por `../../` e `../../../` em todos os JavaScript sob `frontend`: nenhuma ocorrência. Foram lidos os imports/exports de todos os 11 JS de `frontend/*/src`, incluindo `import()` e `require()`: os imports relativos ficam no respectivo alvo, sem consumo direto de fontes do outro. A ligação shell→Products ocorre por URL do iframe, não por import estático entre árvores. | moderada |
| Configuração / Composição (limites) | `frontend/shell-app/src/App.js:6–18` não retorna URL de fallback para localhost ou hostnames sem o padrão esperado; o template string do `src` recebe `undefined` nesses casos. A configuração é orientada a Codespaces, como declara `README.md:2`, e não demonstra funcionamento universal. O comentário em `frontend/shell-app/src/App.js:13` fala em gateway 8080, mas o código seguinte usa 3001, coerente com Products no Compose. | ambígua |
| Tecnologia / Composição (buscas) | Busca em toda a árvore `frontend` por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage` e `import.?map`: nenhuma ocorrência. Há montagem por iframe, mas não protocolo de mensagens, registro dinâmico, autenticação compartilhada ou outro contrato bidirecional observado entre os alvos. A suficiência da relação explícita URL/rota é a decisão aberta de Q4. | ambígua |
| Documentação (limitações) | `README.md:50–74` orienta entrar em diretórios sem o prefixo `frontend/` e executar `npm run dev`, script inexistente nos manifestos; `README.md:80–84` indica portas 5173/4173, diferentes das publicações 3000/3001 do Compose. Essas instruções não substituem a cadeia implementada lida nos fontes e no Compose. | contexto |

## Autoria e histórico

Metadados de `git rev-list`: **56 commits, 16 merges e 1 commit-raiz**, raiz `095fa1229e81a2f2fb2e9d6ef2bf0e09b63ed34b`; clone não shallow. A raiz tem autor Patel Jay em 2025-12-02T15:20:55-05:00. O SHA avaliado tem autor Patel Jay em 2025-12-08T22:09:28-05:00 e mensagem `Revise README for Microservices E‑Commerce Project`.

`git log --no-renames --name-status` foi consultado separadamente por `frontend/shell-app` e `frontend/products-mf`, além dos arquivos centrais e README. Os 18 arquivos iniciais do shell e 19 de Products são adicionados por `altaf-khan-jk` em `ebce825` (2025-12-02T21:23:55Z). Os App.js são posteriormente modificados por `altaf-khan-jk` em `b3e4f84` e `20fcc0c`, e por Patel Jay em `3b6d2f0`; Products recebe alterações adicionais em `5c59071` e `9f51b10`. Dockerfiles são adicionados por `altaf-khan-jk` e modificados por Patel Jay. Isso mostra trabalho de colaboradores e evolução dos arquivos relevantes, não apenas importação imutável de aplicações de terceiros.

Os arquivos básicos conservam características de scaffold CRA (`frontend/shell-app/public/index.html:9–10` e `frontend/shell-app/src/index.js:14–17`); não se atribui a autoria original desse scaffold aos colaboradores. A ligação específica de rota/URL e a tabela de produtos foram avaliadas como implementação materializada no repositório. Não se leram blobs históricos nem se inferiu o conteúdo de versões antigas a partir das mensagens; nenhum objeto ausente foi encontrado.

Branches locais, somente para registro: `main`, `origin/main` e `origin/HEAD` apontam ao SHA avaliado; existem `origin/Jay-load-test` em `b90842606ee7f510f521fdc0178c6660ec693c13` e `origin/varunfeature/fix-api-gateway` em `3ad49c0cac9f87bbbb64a907eab5369f0d4244a1`. Nenhum conteúdo desses branches foi incorporado à análise. Não há ADR separado no inventário; a visão de arquitetura está no README e nas configurações citadas.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell e Products são aplicações identificáveis, com respectivas entradas (`frontend/shell-app/src/index.js:1–12`; `frontend/products-mf/src/index.js:1–12`). O shell referencia a URL da porta 3001, mapeada a Products (`frontend/shell-app/src/App.js:6–14`; `docker-compose.yml:66–69`). |
| Q2 | Yes | Cada alvo tem entrada, manifesto, build e imagem próprios, sem import direto de fontes do outro (`frontend/shell-app/package.json:15–19`; `frontend/products-mf/package.json:15–19`; respectivos Dockerfiles, linhas 1–11; busca integral de imports descrita acima). |
| Q3 | Yes | A rota `/products` do shell monta Products por iframe (`frontend/shell-app/src/App.js:26–36`), participando da mesma interface de e-commerce. A cadeia é explícita para o hostname de Codespaces esperado. |
| Q4 | Yes | O shell monta Products por iframe na rota `/products`, usando a URL da porta que o Compose associa explicitamente à aplicação Products (`frontend/shell-app/src/App.js:26–36`; `docker-compose.yml:66–69`). |
| Q5 | Yes | Duas aplicações independentes são compostas na interface por iframe; a limitação ao ambiente Codespaces é de portabilidade, não ausência do mecanismo. |

## Motivo

- Aplica-se a regra `MFE-implemented`: Q1–Q5 são Yes após a revisão conjunta. A relação entre aplicações do próprio projeto é implementada por iframe, não apenas descrita em documentação.
- `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: example`, apoiados nas entradas/builds e no propósito demonstrativo (`README.md:6–16`). Não se contam serviços Java, Eureka, Grafana ou Prometheus como unidades próprias do frontend.
- `approaches: [iframe]` registra o mecanismo concretamente observado; `ui_technologies: [react]` decorre das entradas e implementações. `build_tools: []`: CRA encapsula o bundler, sem configuração explícita de bundler ou hook no snapshot. Dependências transitivas dos lockfiles não alteram essa convenção.
- Não se conclui No apenas pelo fallback local ausente ou por instruções desatualizadas; também não se conclui Yes sem resolver o critério do iframe. O snapshot permite uma cadeia estática coerente em Codespaces, sem execução que confirme acesso público da porta ou resultado do carregamento remoto.

## Notas para análise

- **Protocolo (família):** busca nas anotações por `dearjay22`, `INFO8985` e `ObsShop` não encontrou irmão já anotado. A família de scaffold CRA não prova duplicação de um candidato específico.
- **Checklist:** ao contrário do caso 119 (mapa de terceiro), o iframe aqui aponta a outro alvo do próprio repositório. O caso 031 está em `review` e possui contrato mais amplo (registro e mensagens), não uma regra final transferível. Comparação com 076/084/096/106/109: há duas entradas/builds e ligação concreta, mas por outro mecanismo. Diferentemente de 089/100, a ligação carrega uma aplicação, não apenas código compartilhado.
- **RQ1:** o gateway backend roteia APIs (`backend/api-gateway/src/main/resources/application.yml:15–28`), não as unidades frontend; os nomes “Shell” e “Microfrontend” do README só foram considerados em conjunto com os fontes e o mapeamento de porta.

## Decisão registrada

Promover para **MFE-implemented**. O shell incorpora a aplicação Products por iframe em uma rota própria, com URL ligada ao serviço Products do Compose. O contrato URL/rota é suficiente neste caso de duas aplicações do mesmo projeto; a dependência do padrão de URL do Codespaces é uma limitação de portabilidade.
