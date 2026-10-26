---
schema: 1
id: 1102884192
full_name: shenulal/mashroom-playground
url: https://github.com/shenulal/mashroom-playground
commit: db50ff104c043d98305c40f006d6ed09bf431bb7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 118 — shenulal/mashroom-playground

## Contexto

Tutorial de Mashroom Server com cinco projetos de exemplo materializados, um projeto de serviços/API e um desafio final documental. O propósito didático é explícito em `README.md:11–22`. As páginas efetivamente implementadas são quatro demonstrações independentes servidas por plugins HTTP; os microfrontends de portal descritos nos guias não estão implementados no snapshot.

Rank, ID e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:119`, status `cloned`; HEAD coincide com o SHA do front matter. Inspeção somente leitura no commit, com `GIT_NO_LAZY_FETCH=1` em todos os comandos Git do clone. Não foram instaladas dependências, executados exemplos, buscados objetos na rede ou percorridos submódulos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:119` registra estratégia `terminology` e elegibilidade `unknown`. A fonte da amostra é a rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:21423` e `data/discovery/mfe-round-002/candidates.csv:21429`, ambas com elegibilidade `unknown`, descrição “A comprehensive, beginner-to-advanced learning environment for Mashroom Server.”, tópicos vazios, `fork: false`, criação em 2025-11-24T06:57:50Z e push em 2025-11-24T07:00:00Z.

Consulta somente leitura por ID 1102884192 às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite` identificou os seguintes hits:

| Consulta | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-11` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T19:17:25.775Z / 2026-10-08T15:40:03.503Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-11` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T22:09:45.099Z / 2026-10-08T15:48:26.230Z |

Os hits não fornecem linha, com `path` vazio. Por eliminação, nome e descrição não contêm as grafias pesquisadas e não há tópicos; o README é compatível com o achado: `README.md:132` contém “Microfrontend container”, `README.md:133` contém “External microfrontends”, `README.md:156` menciona “Portal app (microfrontend)” e `README.md:256` contém “Microfrontends”. Não se atribui à API uma linha casada que ela não informou. O README foi introduzido no único commit, em 2025-11-24T06:59:35Z, antes das buscas de outubro de 2026; não é posterior a elas. O nome do repositório não foi usado como evidência arquitetural.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` no SHA: 54 arquivos regulares `100644` (26 JSON, 16 Markdown, 12 JavaScript), zero symlinks e zero gitlinks. Só existem exemplos 01–05; exemplos 06–14 e as pastas frontend prometidas não estão na árvore. Não há `node_modules`, lockfile ou configuração explícita de bundler. | contexto |
| Código-fonte (alvos reais) | Quatro plugins retornam páginas HTML: `examples/01-basic-architecture/plugins/hello-world-plugin/dist/index.js:15–24`; `examples/02-mashroom-config/plugins/config-demo-plugin/dist/index.js:7–16`; `examples/03-plugin-types/plugins/2-web-app-plugin/dist/index.js:19–27`; `examples/05-dependency-injection/plugins/calculator-api/dist/index.js:22–30`. São handlers efetivos, não snippets em Markdown. Cada página pertence a um exemplo separado. | contrária |
| Configuração (separação dos exemplos) | Cada servidor aponta à sua pasta local de plugins e página inicial: `examples/01-basic-architecture/mashroom.json:2–5` (`/hello`), `examples/02-mashroom-config/mashroom.json:2–5` (`/config`), `examples/03-plugin-types/mashroom.json:2–5` (`/api`) e `examples/05-dependency-injection/mashroom.json:2–5` (`/calculator`). Não há raiz que carregue as quatro páginas como unidades de uma aplicação. | contrária |
| Configuração / Código-fonte (contratos) | Os 26 JSON foram lidos e parseados: 12 descritores de plugins, sendo 6 `services`, 5 `web-app` e 1 `middleware`; nenhum `portal-app`. Todos os 12 caminhos `bootstrap` existem na árvore. Por exemplo, `examples/03-plugin-types/plugins/2-web-app-plugin/package.json:8–14` aponta ao handler HTTP, e `examples/05-dependency-injection/plugins/calculator-api/package.json:7–13` registra API e dependências de serviços. Resolver esses caminhos não transforma plugins de servidor em microfrontends. | contrária |
| Configuração / Build/deploy | `complete-project/package.json:5–11` declara comando de servidor e pacotes Mashroom, portal e tema. `complete-project/mashroom.json:4–12` procura plugins locais e da plataforma, com índice `/portal`. Não há página/layout com instâncias de unidades próprias nem URL de remote configurada. A plataforma externa Mashroom não é contada como unidade própria. | fraca |
| Código-fonte (projeto completo) | `complete-project/plugins/3-task-api/package.json:8–13` registra `web-app` em `/api/tasks`; `complete-project/plugins/3-task-api/dist/index.js:16–31` implementa parsing e respostas JSON. O inventário contém apenas logger, task service e task API nesse projeto. As duas UIs desenhadas em `complete-project/README.md:44–48` e listadas em `complete-project/README.md:75–88` não têm arquivos correspondentes. | contrária |
| Documentação (arquitetura) | `MASHROOM-LEARNING-GUIDE.md:355–385` explica portal e aponta a `examples/09-portal-basics/`, ausente. `MASHROOM-LEARNING-GUIDE.md:389–412` exibe um objeto `portal-app` com URL `https://cdn.example.com/widget.js` e aponta ao exemplo 10, também ausente. `MASHROOM-LEARNING-GUIDE.md:428–440` mostra publicação/assinatura em message bus como conteúdo didático. Nenhum desses snippets é configuração ou código executável versionado das aplicações. | fraca |
| Documentação (desafio) | `final-project/README.md:9–24` pede implementar dashboard e widgets; `final-project/README.md:188–198` lista as tarefas de frontend ainda como marcos. Nesse diretório existe somente o README. O diagrama e o desafio não identificam unidades implementadas. | contexto |
| Código-fonte (fronteiras) | Busca literal ativa `git grep -n -F -e '../../' -e '../../../'` em todos os `*.js` do SHA: nenhuma ocorrência. Busca por `require(` e `import ` nos JavaScript/JSON encontra apenas `require('express')` em `complete-project/plugins/3-task-api/dist/index.js:19`. A injeção de serviços em `examples/05-dependency-injection/plugins/calculator-api/dist/index.js:8–17` é backend, não importação/composição de UI. Ausência de imports cruzados não comprova Q2 sem unidades compostas com entradas/builds próprios. | contexto |
| Tecnologia / Configuração / Composição | Busca por `portal-app`, `remoteEntry`, `ModuleFederation`, `registerApplication`, `iframe` e `postMessage` em todos os JSON/JS: nenhuma ocorrência. Não há cadeia de remotes/exposes/consumo nesses artefatos. A busca adicional em JSON por `mashroom-portal`, `remoteApps`, `task-list`, `task-stats`, `render` e `bootstrap` encontra as dependências de portal e os bootstraps de servidor, sem os alvos frontend prometidos. | ausente |

## Autoria e histórico

Metadados de `git rev-list` confirmam **1 commit, 0 merges e 1 commit-raiz**, o próprio SHA avaliado; o clone não é shallow. Autor e committer: `Shenulal HP`, data 2025-11-24T10:59:35+04:00 (2025-11-24T06:59:35Z), mensagem `first commit`. `git log --no-renames --name-status` por `examples`, `complete-project` e `final-project` mostra todos esses arquivos adicionados em bloco no mesmo commit. Isso demonstra introdução conjunta, mas não permite concluir que o titular escreveu originalmente cada arquivo ou identificar uma importação de terceiro; não há sequência de desenvolvimento disponível. A plataforma é explicitamente externa (`README.md:246–248`), e não foi atribuída ao titular. Não foi necessário ler blobs históricos nem houve objeto ausente.

Referências locais apenas para registro: `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado. Não se incorporou conteúdo de outros branches. Documentação arquitetural relevante consta nos guias e no README do projeto completo, citados acima; nenhum ADR separado aparece no inventário.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | As quatro páginas dos exemplos 01/02/03/05 não têm relação de composição. As UIs de tarefa são apenas descritas (`complete-project/README.md:75–88`), e o remote é snippet didático (`MASHROOM-LEARNING-GUIDE.md:400–412`), sem configuração materializada. |
| Q2 | No | Não há unidades de uma aplicação composta com entradas/builds próprios a avaliar. Os comandos iniciam servidores (`examples/01-basic-architecture/package.json:5–10`; `complete-project/package.json:5–11`); bootstraps de servidor e ausência de imports cruzados não satisfazem o critério literal. |
| Q3 | No | Os exemplos possuem configurações locais separadas; o projeto completo aponta ao portal da plataforma (`complete-project/mashroom.json:4–12`) sem registrar páginas que montem unidades próprias. |
| Q4 | No | Não existe mecanismo configurado que efetivamente conecte unidades frontend. Dependência do portal (`complete-project/package.json:9–11`) e snippets documentais (`MASHROOM-LEARNING-GUIDE.md:400–435`) não comprovam conexão. |
| Q5 | No | Q1–Q4 convergem: exemplos HTTP independentes e documentação de MFE sem aplicação frontend composta implementada. |

## Motivo

- `Non-MFE`: exemplos sem composição explícita e menções didáticas a microfrontends. Não se exclui por ser tutorial: exemplos implementados que realmente compõem unidades podem satisfazer o checklist; aqui faltam as próprias aplicações de portal descritas.
- `frontend_units: 0` e `unit_organization: none`: as quatro páginas HTML dos exemplos 01, 02, 03 e 05 são respostas de handlers Express (plugins `web-app` de servidor Mashroom, `expressApp: (app) => app.get('/', … res.send(`<!DOCTYPE html>…`))`), sem código cliente, entrada HTML/JS própria, manifesto de UI nem build frontend. Dois deles se declaram API (`Time API`, `Calculator API`). Não se contam como unidades frontend, como em 100 (API Express que serve estáticos) e 116 (backend). Não inclui serviços, middleware, o servidor Mashroom, snippets ou widgets anunciados mas ausentes.
- `repo_type: example` decorre do propósito e estrutura didáticos (`README.md:13–22`). Não se observam bibliotecas/frameworks de UI nos alvos próprios nem configuração explícita de bundler; `ui_technologies` e `build_tools` permanecem vazios. Mashroom é plataforma de servidor, não evidência de uma UI autoral específica.
- Não é `MFE-unit`: nenhum alvo frontend existente exporta contrato de integração com um host externo. Os descritores de plugin presentes são de serviços, HTTP ou middleware. Por isso Q2–Q4 são No, sem exceção para unidade externa preparada.
- Não há questão aberta de composição por links, iframes ou build time: nenhuma dessas relações é implementada entre unidades. Não é necessário julgar imperfeições de uma cadeia existente, pois o conteúdo MFE não saiu dos guias.

## Notas para análise

- **Protocolo (famílias):** busca em todas as anotações por `mashroom` e `shenulal` não encontrou irmão já anotado. A família tecnológica observada é Mashroom, identificada pelos manifestos e guias. Comparação com o final 028: múltiplos alvos não relacionados mantêm Q1=No; comparação com 023/075/081/094/105: conteúdo ou aplicações apenas propostas não contam como implementação.
- **Checklist:** a regra de plugins de plataforma do final 037 é compatível com não atribuir o host Mashroom ao titular, mas aqui nem há remote/portal-app próprio preparado que demande essa exceção. Diferentemente de 076/084/096/106/109, não há cadeia frontend configurada; diferentemente de 089/100, não há federação ativa usada para code sharing. O caso não depende de decidir entre composição e compartilhamento ou de tolerar erro de conexão como em 097/103/104.
- **RQ1:** o README promete 14 exemplos (`README.md:111–142`) e UIs de tarefa (`README.md:154–158`), enquanto o inventário materializa apenas 01–05 e o backend do projeto completo. Documentação e dependências isoladas superestimariam o estado implementado.
- **Contribuição da revisão independente / divergência resolvida:** o Prisma recomendou `frontend_units: 0` / `none` em vez de 4 / `monorepo` (rascunho da Lupa), com a classe inalterada. Verificado no commit que os handlers devolvem HTML por template string em rotas Express, sem UI cliente; adotado 0 / `none`. Alternativa registrada para o pesquisador: contar páginas renderizadas no servidor como alvos frontend exigiria uma convenção uniforme (por exemplo, também para 082), ainda não definida.
