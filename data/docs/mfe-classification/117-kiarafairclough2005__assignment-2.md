---
schema: 1
id: 1171174006
full_name: kiarafairclough2005/assignment-2
url: https://github.com/kiarafairclough2005/assignment-2
commit: 55700d67f141ec9529d3e14be1a9205ff66eac32
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
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

# 117 — kiarafairclough2005/assignment-2

## Contexto

Estrutura inicial do template `cd-wordpress`, com comandos delegados ao pacote externo `wp-pwa` e publicação por GitHub Actions (`README.md:1–11`; `package.json:2–9`; `.github/workflows/main.yml:28–32`). O snapshot não contém o site WordPress, fontes frontend ou configuração que componha unidades. O nome do candidato não foi usado para inferir implementação nem natureza de exercício.

Rank, ID e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:118`, com status `cloned`; HEAD coincide com o SHA do front matter. Inspeção integral por `git ls-tree`, `git show` e `git grep`, sempre com `GIT_NO_LAZY_FETCH=1`. Não foram instaladas dependências, executados builds, consultada a rede ou percorridos submódulos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:118` registra rank 117, estratégia `terminology` e elegibilidade `unknown`. A amostra usa a rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato está em `data/discovery/mfe-round-001/candidates.csv:25725` e `data/discovery/mfe-round-002/candidates.csv:25732`: descrição nula, tópicos vazios, linguagem nula, `fork: false`, criação em 2026-03-03T00:20:40Z e último push em 2026-03-03T00:20:43Z. Em ambas, a elegibilidade permanece `unknown` por `recent-human-commit: activity_incomplete`, embora a regra de push tenha passado. Essa elegibilidade não confirma arquitetura.

As tabelas `hits`, `queries` e `subqueries` dos arquivos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, consultados com `sqlite3 -readonly` pelo ID 1171174006, registram os mesmos dois tipos de hit, no endpoint `repositories`:

| Consulta | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-03` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-03-01..2026-03-31` | 2026-10-07T20:15:07.163Z / 2026-10-08T15:41:30.708Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-03` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-03-01..2026-03-31` | 2026-10-07T22:11:29.411Z / 2026-10-08T15:49:16.695Z |

Os hits têm `path` vazio e partição `created:2026-03`, sem indicar linha ou campo casado. Por eliminação, o nome não contém os termos, a descrição é nula e os tópicos estão vazios; o README é compatível com as duas grafias: `README.md:13` contém `microfrontends` e `microfrontend`, além do link `paypal-microfrontend`. Essa é a explicação observável do sinal temático, sem atribuir à API uma localização que ela não registrou. O README do SHA foi introduzido no único commit, em 2026-03-03T00:20:43Z, antes das buscas de outubro; não é posterior às coletas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Código-fonte | Inventário integral por `git ls-tree -r` no SHA: seis arquivos regulares `100644`, zero symlinks `120000` e zero gitlinks `160000`. São `.devcontainer/devcontainer.json`, `.github/workflows/main.yml`, `.gitignore`, `LICENSE.txt`, `README.md` e `package.json`, todos lidos. Não há fontes de UI, HTML de entrada, host, remote, import map, banco de conteúdo WordPress, lockfile ou `node_modules` versionado. | ausente |
| Configuração / Build/deploy | `package.json:2–9` declara apenas `wp-pwa: latest` e os comandos `dev`, `start`, `preview` e `build`, todos delegados à CLI. Não há entradas/builds de unidades nem configuração de composição. Sem lockfile ou implementação local da CLI, não é possível verificar sua versão resolvida, internals ou algum bundler subjacente. | fraca |
| Build/deploy | `.github/workflows/main.yml:6–14` define gatilhos; `.github/workflows/main.yml:28–32` chama `diy-pwa/npm-build-2-gh-pages@v1.11`. É publicação delegada, sem declarar carregamento de unidades frontend ou ligação remotes↔exposes↔consumo. | contexto |
| Configuração | `.devcontainer/devcontainer.json:2–17` configura imagem Node e extensões de editor. `.gitignore:1–5` ignora `.env`, `node_modules`, `dist`, `package-lock.json` e `.wordpress`; esses conteúdos não aparecem na árvore. Não se presume uma aplicação ou composição nos arquivos ausentes. | contexto |
| Documentação | `README.md:13` declara a ideia de consumir microfrontends e aponta para um exemplo externo PayPal; `README.md:15` menciona equipes autônomas. O link não configura o consumo desse exemplo pelo candidato. | fraca |
| Tecnologia / Configuração / Composição | Busca integral com `git grep -n -I -i -E` por `module.?federation`, `remoteEntry`, `remotes`, `exposes`, `single.?spa`, `registerApplication`, `import.?map`, `qiankun`, `wujie`, `iframe`, `postMessage`, `customElements`, `createRoot`, `bootstrap` e `<script`: nenhuma ocorrência. Não foram encontrados configuração de bundler, importação de remote, exportação de ciclo de vida ou contrato de montagem na leitura dos seis arquivos. | ausente |
| Código-fonte (fronteiras) | Busca ativa com `git grep -n -F -e '../../' -e '../../../'` em toda a árvore: nenhuma ocorrência. Como não há fontes de unidades no inventário, essa ausência não demonstra independência de unidades inexistentes. | ausente |
| Histórico / Documentação | `LICENSE.txt:3` atribui copyright de 2024 a `diy-pwa`; o título `cd-wordpress` e as referências à mesma organização permanecem em `README.md:1–13`. Indicam origem do material inicial, sem evidenciar código de composição escrito pelo titular. | contexto |

## Autoria e histórico

Metadados de `git rev-list` no SHA: **1 commit, 0 merges, 1 commit-raiz**, sendo a raiz o próprio SHA analisado. `git log --no-renames --name-status` por `.devcontainer`, `.github` e arquivos da raiz registra os seis arquivos adicionados juntos em `Initial commit`, com autor `kiarafairclough2005`, committer `GitHub`, em 2026-03-02T19:20:43-05:00 (2026-03-03T00:20:43Z). Não há alterações posteriores alcançáveis que mostrem uma composição acrescentada ao material inicial. O nome do autor do commit não demonstra autoria original do template, que conserva a atribuição a `diy-pwa` (`LICENSE.txt:3`). Não foi necessário consultar blobs históricos nem houve objeto ausente.

Referências locais, apenas para registro: `refs/heads/main`, `refs/remotes/origin/main` e `refs/remotes/origin/HEAD` apontam ao SHA fixado. Não se inspecionou conteúdo de outro branch. No inventário não há ADR ou documentação de arquitetura além do README, cuja declaração temática está em `README.md:13–15`.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O inventário integral não identifica duas unidades nem configuração que referencie unidades externas. `README.md:13` é apenas referência documental; `package.json:2–9` é um wrapper de CLI. |
| Q2 | No | Não há unidades com entradas e builds próprios. O comando global `wp-pwa build` (`package.json:9`) não estabelece tais entradas/builds. A busca integral de imports relativos não altera essa ausência. |
| Q3 | No | Não há host, shell ou raiz que carregue, monte ou roteie unidades. O workflow apenas delega publicação (`.github/workflows/main.yml:28–32`); `README.md:13–15` expressa intenção. |
| Q4 | No | Nenhum mecanismo configurado conecta unidades na árvore lida. Dependência e scripts (`package.json:2–9`) e link PayPal (`README.md:13`) não demonstram uma cadeia de composição. |
| Q5 | No | Q1–Q4 são No: documentação temática e estrutura de publicação sem implementação observável de arquitetura MFE (`README.md:13–15`; `package.json:1–11`; inventário completo). |

## Motivo

- Aplica-se `Non-MFE`, no caso de menção a microfrontends sem implementação observável. Não há unidade preparada para host externo; portanto não se aplica `MFE-unit` nem há motivo para Q2–Q4 serem Undetermined.
- `repo_type: template` descreve a estrutura genérica de desenvolvimento/build/publicação (`README.md:1–11`; `package.json:2–9`). Um template pode satisfazer o checklist, mas este não contém uma aplicação composta.
- `frontend_units: 0` decorre do inventário integral, sem alvos próprios implementados ou externos referenciados por configuração. A saída que uma CLI poderia gerar e o exemplo externo do README não são unidades deste snapshot.
- `approaches`, `ui_technologies` e `build_tools` ficam vazios: a dependência CLI não demonstra mecanismo de composição, framework de UI ou configuração explícita de bundler.
- Não há decisão aberta sobre composição por links, iframes ou build time: o link é documental e não há configuração ou código que implemente essas relações. As limitações da dependência externa não substituem evidência de unidades e composição.

## Notas para análise

- **Protocolo (família):** mesma família `cd-wordpress`/`wp-pwa` das anotações 079 e 049, identificada pelo texto e manifesto, não pelo nome do candidato. A 079 está em `draft`, com `Non-MFE`, seis arquivos e o mesmo padrão de ausência de site. A 049 está em `review`, propondo `MFE-implemented` porque registra conteúdo de página no banco WordPress que carrega um script externo e monta um custom element. Aqui não há `wp-content`, banco versionado ou contrato equivalente; a evidência da 049 não é transferível.
- **RQ1:** a frase de intenção e o exemplo PayPal (`README.md:13`) explicam o achado terminológico sem confirmar arquitetura. Não se atribuem ao titular o código do pacote `wp-pwa`, o exemplo externo ou um site gerado não versionado.
- **Checklist:** a exclusão de conteúdo/geração sem unidades implementadas é compatível com 023/075/081/105. Não se reproduzem os casos de cadeia completa 076/084/096/106: faltam host, unidades e ligação de composição, não apenas detalhes de execução.
- **Protocolo (identidade com a 079):** `git ls-tree -r` deste commit e do commit da 079 (`snur7070/VictorFinalWebsite`) são idênticos: mesmos seis caminhos, modos e hashes de blob. A identidade de conteúdo com a 079 é verificável, e vale a mesma decisão (Non-MFE, `template`, 0 unidades). A 049 continua não transferível, pois versiona o conteúdo WordPress com a composição.
