---
schema: 1
id: 1308515217
full_name: akaliwod/console-plugin-template
url: https://github.com/akaliwod/console-plugin-template
commit: cbbc152fd696da6fb47d75850d436c12f3976f1f
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 258 — akaliwod/console-plugin-template

## Contexto

- **Tipo de repositório:** template (cópia gerada do template oficial `openshift/console-plugin-template`).
- **Classificação:** Non-MFE via Q5, pela regra de plugins de plataforma do final 037.

O repositório é o template mínimo de um plugin dinâmico do OpenShift Console: uma página de exemplo que a console da plataforma carrega em runtime por Module Federation (`README.md:1–11`). O `package.json` aponta para o repositório oficial (`package.json:8–11`), `OWNERS` lista os aprovadores da equipe da console (`OWNERS:1–10`) e `AGENTS.md:1–8` descreve “a template repository… meant to be used via GitHub's ‘Use this template’ feature”. O único commit tem committer `GitHub` e mensagem “Initial commit”. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:259` registra rank 258, ID 1308515217, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:259` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:33996` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:34003` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T23:29:25.295Z / 2026-10-08T16:19:04.667Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, licença Apache-2.0, `fork: false`, tamanho 1199, criação em 2026-07-22T07:24:17Z, push em 2026-07-22T07:24:22Z.

Sem descrição, o acerto vem do README: “webpack module federation” em `README.md:9` (“They are based on [webpack module federation](…)”).

O README só existe no commit único (o SHA, 2026-07-22T09:24:21+02:00, isto é, 07:24:21Z), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

O template oficial `openshift/console-plugin-template` também está nas rodadas (`data/discovery/mfe-round-002/candidates.csv:3400`), assim como outras instâncias geradas dele (por exemplo, `:12557`, `:20501`, `:31095`). Só este está em `sample.csv`; os demais não foram inspecionados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 66 entradas, sendo 55 arquivos regulares `100644`, 10 executáveis `100755` (scripts de shell e i18n, `.devcontainer/init.sh`, o release do Yarn em `.yarn/releases/`) e 1 symlink `120000` (`CLAUDE.md` → `AGENTS.md`); zero gitlinks. Um único projeto: `package.json`, `rspack.config.ts`, `console-extensions.json`, `src/components/ExamplePage.tsx`, testes, Helm chart e Dockerfile. | contrária |
| Configuração (remote) | `rspack.config.ts:3`, `:82`: `ConsoleRemotePlugin` do SDK da console; `:10–11`: “No regular entry points needed. All plugin related scripts are generated via ConsoleRemotePlugin.” `package.json:82–93`: `consolePlugin` com `exposedModules: { ExamplePage: "./components/ExamplePage" }` e dependência `@console/pluginAPI`. | moderada |
| Configuração (registro na plataforma) | `console-extensions.json:2–19`: extensões `console.page/route` (`/example` → `$codeRef: ExamplePage`) e `console.navigation/href` na seção Home. `charts/openshift-console-plugin/templates/consoleplugin.yaml:1–17`: recurso `ConsolePlugin` que registra o serviço do plugin na console. `charts/openshift-console-plugin/templates/patch-consoles-job.yaml:38`: job que adiciona o plugin a `consoles.operator.openshift.io`. | moderada |
| Código-fonte | `src/components/ExamplePage.tsx:9–41`: página de exemplo (“Hello, plugin!”) com componentes do SDK e PatternFly; texto instrui a trocar os metadados após clonar o template (`:33–36`). | moderada |
| Composição | O host é a OpenShift Console, plataforma externa ao repositório (`README.md:6–11`); nenhum host próprio. `start-console.sh` sobe a imagem da console para desenvolvimento local. | contexto |
| Build/deploy | `package.json:14`: build com Rspack; `Dockerfile:1–17`: build e imagem nginx que serve `dist`; Helm chart com `deployment.yaml` e `service.yaml` próprios. Deploy independente do plugin. | moderada |
| Código-fonte (fronteiras) | Busca ativa de `../` em `src`, `integration-tests` e `__mocks__`: só imports internos dos testes de integração (`integration-tests/tests/auth.setup.ts:2`; `integration-tests/tests/example-page.spec.ts:3`) e `integration-tests/tsconfig.json:2`. Unidade única; não há outra a cruzar. | contexto |
| Tecnologia | `package.json:26–27`: `@openshift-console/dynamic-plugin-sdk` e `@openshift-console/dynamic-plugin-sdk-webpack`. A busca por `remotes`, `exposes`, `registerApplication`, `loadRemote`, `<iframe` e `customElements` (exceto Yarn) não encontra configuração de federação além do plugin do SDK. | fraca |

## Autoria e histórico

Clone não raso. Há 1 commit, que é o SHA e a raiz (1 em todos os refs), sem merges: autor `Arkadiusz Kaliwoda <akaliwod@cisco.com>`, committer `GitHub <noreply@github.com>`, 2026-07-22T09:24:21+02:00, “Initial commit”. É o padrão de um repositório criado por “Use this template” (`README.md:25–26`): o conteúdo é o do template oficial e não há alteração posterior do titular. A identidade registrada não demonstra autoria do código; `package.json:8–11` e `OWNERS:1–10` apontam ao projeto OpenShift. `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (o plugin); a configuração só expõe `ExamplePage` (`package.json:87–89`) e não referencia outras unidades. |
| Q2 | Yes (para a unidade) | Build próprio com `ConsoleRemotePlugin` (`rspack.config.ts:82`), imagem e Helm chart próprios (`Dockerfile:1–17`). |
| Q3 | Undetermined | O host (OpenShift Console) não está no repositório. |
| Q4 | Undetermined | Remote configurado e registrado na plataforma (`console-extensions.json`; `consoleplugin.yaml`); o consumidor é a console. |
| Q5 | No (override) | Module Federation como mecanismo de extensão de plataforma de terceiros, como em 010, 035 e 037. |

## Justificativa do Q5

Pela letra do checklist, o vetor No/Yes/Undetermined/Undetermined indicaria a exceção MFE-unit: uma unidade preparada para composição por host externo não observável. O final 037 registra a decisão dos pesquisadores de classificar como Non-MFE as unidades cujo único host é uma plataforma de terceiros que usa MF como mecanismo de extensão, independentemente de a configuração ser autoral. Aqui:
- o host é a OpenShift Console (`README.md:6–11`);
- o mecanismo é o SDK oficial de plugins dinâmicos (`rspack.config.ts:3`, `:82`; `package.json:26–27`, `:82–93`);
- o registro é feito por recursos da plataforma (`console-extensions.json:2–19`; `consoleplugin.yaml:1–17`).

Além disso, o conteúdo é o template oficial gerado sem modificações (commit único “Initial commit” com committer `GitHub`).

## Motivo

- `Non-MFE` via Q5, pela regra de plugins de plataforma do final 037 (casos 010, 022, 035 e 037).
- O plugin estende a UI de administração de uma plataforma, não uma aplicação decomposta pelo autor.
- Também é cópia não modificada de um template de terceiros (`openshift/console-plugin-template`, `package.json:8–11`). O tratamento de redistribuições de terceiros segue aberto em 074/080/102/122, mas aqui não altera a classe, que já decorre da regra de 037.
- `repo_type: template`, `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`, `build_tools: [rspack]`. `approaches: []` segue 037, Non-MFE com abordagem vazia; o mecanismo é registrado nas notas.
- Não há decisão aberta.

## Notas para análise

- **Checklist (regra de plugins de plataforma):** novo caso, depois de 010, 022, 035 e 037. A plataforma é a OpenShift Console, com plugins dinâmicos sobre Module Federation (`ConsoleRemotePlugin`, `exposedModules`, `console-extensions.json`, CRD `ConsolePlugin`).
- **RQ2:** OpenShift Console dynamic plugins como variante de MF encapsulada por SDK de plataforma: o desenvolvedor declara `exposedModules` e extensões em JSON, e o SDK gera o remote.
- **RQ1 (sinais enganosos):** README do template oficial com “webpack module federation” (`README.md:9`) é replicado em cada repositório gerado do template.
- **Protocolo (famílias/duplicatas):** o template oficial e ao menos outras três instâncias geradas dele estão nas rodadas (`data/discovery/mfe-round-002/candidates.csv:3400`, `:12557`, `:20501`, `:31095`; 39 linhas contêm `console-plugin`). Repositórios gerados de templates com `fork: false` passam pela filtragem como candidatos distintos.
