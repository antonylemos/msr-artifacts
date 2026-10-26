---
schema: 1
id: 1154061735
full_name: Mixtry14/UX221-Midterm
url: https://github.com/Mixtry14/UX221-Midterm
commit: a9fc22627e945f4b68ca0c390ef505ae9e28aff0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [wordpress]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 119 — Mixtry14/UX221-Midterm

## Contexto

Site WordPress personalizado sobre uma data comemorativa, com páginas, posts e imagens versionados, construído a partir de `cd-wordpress`/`wp-pwa` (`README.md:1–11`; `package.json:2–9`). O banco contém o conteúdo efetivo do site; o iframe encontrado na página Contact é um embed de Google Maps, sem contrato de integração entre unidades frontend próprias. O nome do repositório não foi usado como evidência arquitetural.

Identidade e commit conferidos em `data/samples/mfe-sample-001/clones.csv:120`, status `cloned`; HEAD coincide com o SHA do front matter. Toda inspeção Git do clone usou `GIT_NO_LAZY_FETCH=1`, somente leitura no snapshot. Não foram instaladas dependências, executados builds ou consultados sites externos.

**Localização das evidências no banco:** o blob `wp-content/database/.ht.sqlite` foi obtido com `git show` no SHA e desserializado em SQLite em memória, com `PRAGMA query_only=ON`, sem criar arquivos de banco ou journal. Como um SQLite binário não possui linhas de texto, a notação `arquivo::tabela[chave=valor].campo:linha` abaixo identifica a linha lógica do campo textual, numerada a partir de 1 pela separação em `\n`. Por exemplo, `SELECT post_content FROM wp_posts WHERE ID=12` reproduz a citação da página Contact. Não se apresentam essas posições como linhas físicas do arquivo binário.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:120` registra rank 119, estratégia `terminology` e elegibilidade `pass`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:24701` (elegibilidade `unknown`) e `data/discovery/mfe-round-002/candidates.csv:24707` (`pass`). Os metadados registram descrição “Special Day Midterm”, tópicos vazios, linguagem PHP, `fork: false`, criação em 2026-02-10T01:08:52Z e push em 2026-02-10T01:49:15Z. A descrição contextualiza o tipo `example`; não confirma MFE.

Consultas com `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, filtradas pelo ID 1154061735, registram:

| Consulta | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-02` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T19:47:08.329Z / 2026-10-08T15:41:04.057Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-02` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:10:51.084Z / 2026-10-08T15:49:02.020Z |

Os hits têm `path` vazio, sem linha casada. Por eliminação, o nome e a descrição não contêm as grafias pesquisadas e não há tópicos; `README.md:13` contém tanto `microfrontends` quanto `microfrontend`, além do link `paypal-microfrontend`, explicando o sinal temático observável. Isso não atribui à API uma localização que ela não informou. O README foi adicionado no commit-raiz em 2026-02-10T01:08:54Z e não foi alterado no commit seguinte, segundo os metadados de histórico: o texto do SHA é anterior às buscas, não posterior.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` no SHA: 575 arquivos regulares `100644`, zero symlinks e zero gitlinks. Há seis arquivos do template na raiz/ambiente/CI e `wp-content` com banco, uploads, temas, plugins e traduções. Não há `node_modules` versionado, lockfile ou configuração explícita de bundler autoral. Os temas alternativos e plugins de terceiros não são contados como unidades próprias. | contexto |
| Código-fonte / Composição (site) | `wp-content/database/.ht.sqlite::wp_posts[ID=6].post_content:1–7` contém a página inicial personalizada; `wp-content/database/.ht.sqlite::wp_posts[ID=10].post_content:1–35` contém texto e imagens de outra página do mesmo site. A opção `wp-content/database/.ht.sqlite::wp_options[option_name=page_on_front].option_value:1` vale `6`; `show_on_front` vale `page`. Não são aplicações frontend distintas com entradas/builds próprios. | contrária |
| Configuração / Tecnologia | `wp-content/database/.ht.sqlite::wp_options[option_name=template].option_value:1` e `wp-content/database/.ht.sqlite::wp_options[option_name=stylesheet].option_value:1` valem `twentytwentyfive`. `wp-content/themes/twentytwentyfive/templates/page.html:1–15` monta cabeçalho, conteúdo de post e rodapé do tema. É a renderização convencional de um site WordPress. | contrária |
| Composição (iframe) | `wp-content/database/.ht.sqlite::wp_posts[ID=12].post_content:2` contém um iframe cuja origem é `https://www.google.com/maps/embed`; a revisão ID 13 repete esse iframe na linha 2. Os atributos são de apresentação, carregamento e referrer policy. Não há ponte de mensagens, API entre unidades próprias, montagem de aplicação do titular ou contrato de integração além da inclusão do mapa. Não se conta o serviço Google Maps como unidade própria. | contexto |
| Código-fonte (terceiros) | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1–7` define `x-year`, que apenas mostra o ano atual. É um template do plugin, sem aplicação própria ou consumo no conteúdo do banco. `wp-content/themes/wpico/style.css:2–5` atribui o tema alternativo a Mike Wassmer; `wp-content/themes/twentytwentyfive/style.css:2–5` atribui o tema ativo à equipe WordPress. Não se atribuem esses componentes ao titular nem se contam como unidades adicionais. | contexto |
| Configuração / Build/deploy | `package.json:2–9` declara `wp-pwa: latest` e comandos delegados à CLI; `.github/workflows/main.yml:28–32` chama `diy-pwa/npm-build-2-gh-pages@v1.11`. Não há configuração de host/remote/exposes/consumo ou builds de múltiplas unidades. `.gitignore:1–5` ignora dependências, saída e lockfile; sem implementação local ou versão travada da CLI, seus internals não são verificáveis. | fraca |
| Documentação | `README.md:13–15` descreve a intenção de consumir microfrontends e aponta a um exemplo externo PayPal. Não configura o carregamento desse exemplo pelo site. `LICENSE.txt:3` mantém a atribuição do template a `diy-pwa`. | fraca |
| Tecnologia / Configuração / Código-fonte | Busca integral nos arquivos textuais por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage` e `import.?map`: nenhuma ocorrência. Busca adicional de `iframe`, `customElements.define` e `micro.?frontend` em JS/PHP/JSON e README encontra texto do template, traduções, `x-year` e iframes administrativos de Akismet. Os resultados pertencem a documentação ou código vendorizado, sem demonstrar uma segunda unidade própria. | ausente |
| Código-fonte (fronteiras) | Busca literal ativa `git grep -n -F -e '../../' -e '../../../'` em todos os `*.js` do SHA: nenhuma ocorrência. O inventário tem apenas quatro JS, todos em Akismet ou no template de child theme. Essa ausência não estabelece Q2: falta um conjunto de unidades frontend compostas, não apenas imports cruzados. | contexto |
| Composição (busca no banco) | Inspecionados os 29 valores de `wp_posts.post_content`, 29 de `post_excerpt`, 31 de `wp_postmeta.meta_value` e 153 de `wp_options.option_value`, procurando `<script`, `<iframe`, `postMessage`, `remoteEntry`, `registerApplication`, `customElements`, `micro.?frontend`, `single-spa` e elementos `<x-...>`. Só aparecem os dois iframes de Contact, em IDs 12/13; não há script de remote, custom element ou contrato de comunicação nesses campos. `wp-content/database/.ht.sqlite::wp_options[option_name=active_plugins].option_value:1` vale `a:0:{}`. | ausente |

## Autoria e histórico

Metadados de `git rev-list`: **2 commits, 0 merges, 1 commit-raiz**, raiz `2662e6e21558aa273e1a46626779cf3db3a6c25f`; clone não shallow. A raiz, `Initial commit`, tem autor Nakul Mistry e committer GitHub em 2026-02-09T20:08:54-05:00 (2026-02-10T01:08:54Z); o SHA avaliado, `initial commit`, tem autor e committer Nakul Mistry em 2026-02-10T01:48:22Z.

`git log --no-renames --name-status` por `README.md`, `package.json`, `wp-content/database`, `wp-content/themes`, `wp-content/plugins`, `wp-content/mu-plugins`, traduções e uploads mostra o template introduzido na raiz e o banco/conteúdo, temas e plugins adicionados juntos no segundo commit. O histórico de adição não demonstra autoria original do material de terceiros: as atribuições em `LICENSE.txt:3`, `wp-content/themes/wpico/style.css:2–5` e `wp-content/themes/twentytwentyfive/style.css:2–5` permanecem explícitas. O conteúdo personalizado do banco foi distinguido desse material. Nenhum blob histórico precisou ser lido; não houve objeto ausente.

Referências locais apenas para registro: `main`, `origin/main` e `origin/HEAD` apontam ao SHA avaliado; existe ainda `origin/gh-pages` em `fbf07091e88a417b7a663533ec4e95fdf0350144`. Não se inspecionou conteúdo desse branch e ele não modifica a classificação do snapshot. Não há ADR ou documento de arquitetura autoral no inventário; o README da raiz fornece apenas a intenção genérica do template.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um site WordPress personalizado, sem duas unidades próprias ou referência de composição a aplicações externas. Páginas do banco são conteúdo do mesmo alvo; o iframe de mapa (`wp-content/database/.ht.sqlite::wp_posts[ID=12].post_content:2`) não estabelece outro alvo do titular. |
| Q2 | No | Não existe conjunto de unidades compostas com entradas/builds próprios. `package.json:5–9` fornece comandos globais do site; páginas e temas não demonstram independência de aplicações. A ausência de imports relativos cruzados não supre esse requisito. |
| Q3 | No | A página do tema renderiza conteúdo WordPress (`wp-content/themes/twentytwentyfive/templates/page.html:1–15`), sem host/shell que monte unidades próprias. O mapa é embed de serviço externo, sem contrato entre unidades do candidato. |
| Q4 | No | Não há mecanismo configurado conectando unidades frontend próprias. `README.md:13` e `package.json:2–9` são sinais isolados; o iframe no banco não demonstra integração explícita entre tais unidades. |
| Q5 | No | Q1–Q4 convergem: um site convencional com mapa externo e material de terceiros, sem arquitetura MFE observável no snapshot. |

## Motivo

- `Non-MFE`: frontend convencional único e menção temática sem composição implementada de unidades. Não há unidade preparada para host externo; logo não se aplica `MFE-unit` nem há razão para Q2–Q4 serem Undetermined.
- `frontend_units: 1` conta o site personalizado, apoiado pelo conteúdo efetivo do banco e configuração de página inicial. Os quatro temas instalados, plugins, imagens, páginas individuais e revisões não são unidades independentes; a infraestrutura WordPress vendorizada não multiplica a contagem.
- `repo_type: example` registra o site demonstrativo contextualizado como “Special Day Midterm” nos metadados, com conteúdo personalizado simples. Não se deduz arquitetura ou autoria pelo nome do repositório.
- `ui_technologies: [wordpress]` segue a convenção da família 049 e se apoia no banco e nos templates efetivos, não só no README. `build_tools: []`: não há bundler configurado para unidades próprias; a CLI `wp-pwa` e os scripts de CSS do tema externo não autorizam inferir bundler. `approaches: []` acompanha a ausência de composição MFE.
- Não se decide aqui que todo iframe deixa de contar: neste caso específico não há contrato de integração entre unidades, conforme o critério vigente. A presença de Google Maps como serviço de terceiro não basta para criar uma segunda unidade frontend própria. Não há decisão metodológica aberta sobre uma cadeia de unidades implementada.

## Notas para análise

- **Protocolo (família):** mesma família `cd-wordpress`/`wp-pwa` de 049/079/117. As anotações 079 e 117 estão em `draft`, como `Non-MFE`, sem conteúdo do site; aqui o banco permite identificar uma unidade. A 049 está em `review`, propondo composição por script remoto/custom element em conteúdo de CMS. A busca no banco deste candidato não encontrou esse contrato; o iframe Maps não é evidência transferível da 049.
- **RQ1:** `x-year` e os iframes de Akismet são sinais de código de terceiros, como os cuidados dos casos 080/102/074. O sinal terminológico do README explica a seleção, mas não substitui a inspeção do conteúdo.
- **Checklist:** não se reproduz cadeia autoral host/remotes de 076/084/096/106/109, federação para code sharing de 089/100 ou configuração de frontend incompletamente conectável de 097/103/104. A regra de plataforma de 037 também impede atribuir widgets de infraestrutura ao titular; não é necessário promover o mapa de terceiro a uma unidade própria para avaliar o site.
- **Protocolo (identidade de família):** os seis arquivos do template (`README.md`, `package.json`, `.github/workflows/main.yml`, `.gitignore`, `LICENSE.txt`, `.devcontainer/devcontainer.json`) têm os mesmos hashes de blob dos de 117 e, portanto, da 079. A filiação `cd-wordpress` é identidade verificável; a diferença é o `wp-content` versionado, sem o contrato de script e custom element da 049.
- **Protocolo (convenção pendente, server-rendered):** `frontend_units: 1` conta o site WordPress como produto de UI (tema, templates e conteúdo, com tecnologia de UI observada). Em 118 as respostas HTML eram incidentais de handlers de servidor/API, sem tecnologia de UI, e contam 0. Critério sugerido pelo revisor para a decisão do pesquisador: produto de UI com tecnologia de UI observável conta; respostas HTML incidentais de servidor/API não contam (cobre 049, 082, 118 e 119).
