---
schema: 1
id: 1238394528
full_name: j4flmao/agent-skills
url: https://github.com/j4flmao/agent-skills
commit: 5a19d636db60d2f7e08f036037a5b49c0a4ae8bd
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 252 — j4flmao/agent-skills

## Contexto

- **Tipo de repositório:** não é projeto de software com aplicação. É uma biblioteca de “agent skills” em Markdown (`SKILL.md` e referências) para assistentes de código, com arquivos de configuração para vários assistentes (`README.md:1–3`; `package.json:2–4`, `:53–65`).

Micro-frontends aparecem como tema de skills e de documentos de referência, com trechos de código de exemplo dentro de Markdown. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:253` registra rank 252, ID 1238394528, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:253` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30057` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30063` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2026-05` | vazio | 2026-10-07T21:51:29.129Z / 2026-10-08T15:42:48.382Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2026-05` | vazio | 2026-10-07T22:12:58.622Z / 2026-10-08T15:49:57.059Z |
| `technology-custom-elements-single-spa-code`: `customElements.define registerApplication` | code | sem partição (mesmo id da consulta) | `skills/frontend/angular/architecture/references/angular-micro-frontends.md` | 2026-10-07T22:44:45.930Z / 2026-10-08T16:22:16.158Z |
| `technology-web-components-microfrontends-repositories`: `"web components" microfrontends in:readme` | repositories | sem partição (mesmo id da consulta) | vazio | 2026-10-07T23:38:33.427Z / 2026-10-08T16:22:32.538Z |

As subconsultas `#created:2026-05` acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`; a de web components acrescenta `pushed:>=2025-04-01`.

Metadados do hit: descrição nula, sem tópicos, linguagem Shell, licença MIT, `fork: false`, tamanho 56420, 30 estrelas na rodada 001 e 32 na 002, criação em 2026-05-14T04:47:30Z, push em 2026-10-07T08:57:31Z.

Correspondências no SHA:
- **`microfrontend`:** `README.md:132`, dentro do identificador de skill `` `frontend-microfrontend` `` (o hífen separa os termos).
- **`microfrontends`:** não aparece literalmente no README (busca `grep -i` por `microfrontends`, `micro` e `web.?component`). O hit depende do processamento textual da busca do GitHub, que não está registrado.
- **`"web components" microfrontends`:** “web components” corresponde a `README.md:133` (`` `frontend-web-components` ``); “microfrontends” segue a observação anterior.
- **Busca de código:** o arquivo casado contém `customElements.define('products-app', ProductsAppElement)` (`skills/frontend/angular/architecture/references/angular-micro-frontends.md:2534`) e `registerApplication` (`:2543`, `:2545`), ambos dentro de blocos de código Markdown.

**Datas:** a última alteração do README é `e63c74b` (2026-10-07T15:57:31+07:00, isto é, 08:57:31Z), igual ao `pushed_at` registrado e anterior às coletas. O arquivo do hit de código foi alterado pela última vez em `0ef16b3` (2026-05-27). O SHA avaliado (`5a19d63`, 2026-10-10T10:28:26+07:00) é posterior às buscas, mas não altera nenhum desses arquivos: adiciona regras de governança, `AGENTS.md`, `docs/agent-*`, `scripts/validate-agent-governance.js` e altera bundles JSON e `package.json`. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 4.806 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Por extensão: 4.770 `.md`, 16 `.mdc`, 11 `.json`, 5 `.sh`, 1 `.yml`, 1 `.js`, `.gitignore` e `LICENSE`. Não há `index.html`, configuração de bundler ou `package.json` além do da raiz. | contrária |
| Configuração | `package.json:2–4`: “Central mega-repository of 399 AI agent skills”; `:53–65`: publica pastas de skills e de configuração de assistentes; `:66–70`: só scripts de validação de Markdown e governança. Nenhuma dependência de UI ou build. | contrária |
| Código-fonte | Os únicos arquivos executáveis são scripts de suporte: `scripts/validate-agent-governance.js:1–15` (valida arquivos de regras de assistentes) e cinco `.sh` (hooks de `.claude/hooks/scripts/`, `skills/core/project-init/scripts/scaffold.sh`, `skills/devops/chaos-engineering/scripts/pod_killer.sh`). Nenhum é aplicação frontend. | contrária |
| Documentação (conteúdo MFE) | `skills/frontend/universal/microfrontend/SKILL.md:1–21`: skill “microfrontend” para responder perguntas sobre Module Federation, Web Components e iframes, com seis referências em `skills/frontend/universal/microfrontend/references/`. `skills/frontend/angular/architecture/references/angular-micro-frontends.md:1–30`, `:2502`, `:2534`, `:2539–2545`: guia de micro-frontends em Angular com exemplos de Module Federation, Web Components e single-spa em blocos de código. É conteúdo para assistentes, não configuração de aplicação. | contexto |
| Tecnologia / Configuração / Composição | Nenhum arquivo de configuração ou código de aplicação no inventário (sem `index.html`, bundler ou `package.json` de unidade); os termos de MFE só aparecem em Markdown. | ausente |
| Código-fonte (fronteiras) | Não há unidades frontend; a busca de imports relativos entre unidades não se aplica. O único `.js` usa `require("fs")`/`require("path")` (`scripts/validate-agent-governance.js:3–4`). | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 180 commits (180 em todos os refs), nenhum merge, todos com o e-mail `j4flmao@gmail.com`:
- 164 como `j4flmao`, com committer `j4flmao`;
- 14 como “Shiroko” e 2 como “Rias”, com committer `GitHub` (edições pela interface web, como `e63c74b`, “Update README.md”).

A raiz é `af05a5d` (2026-05-14T11:48:30+07:00, “feat: agent skill suite — planning to deveploment”). Os metadados não separam autoria intelectual de conteúdo gerado.

`git rev-list --objects $SHA --missing=print` lista 26.144 objetos ausentes, nenhum na árvore do SHA (comparação entre os objetos da árvore e a lista de ausentes: zero em comum). `git show --stat` do SHA falha por blob histórico ausente; a inspeção foi repetida com `--no-renames --name-status`. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: o repositório é composto de Markdown de skills e configurações de assistentes (inventário; `package.json:2–4`). |
| Q2 | No | Não há unidades a avaliar. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição configurado. `customElements.define` e `registerApplication` só aparecem em blocos de código de um guia (`skills/frontend/angular/architecture/references/angular-micro-frontends.md:2534`, `:2543–2545`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “repositories mentioning micro-frontends without implementing them”. Na filtragem do protocolo, caberia em “repositories that are purely documentation without an implementation”.
- Mesmo padrão de 023: trechos de configuração de micro-frontends existem só como conteúdo em Markdown. Também se aproxima dos casos de conteúdo e gerador (075/081/094/105): material para produzir código em outros projetos, não implementação.
- `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, arrays de tecnologia vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a busca de código `customElements.define registerApplication` casa exemplos em Markdown (`angular-micro-frontends.md:2534`, `:2543`), como no 023 com `ModuleFederationPlugin` em slides. Bibliotecas de skills ou prompts para assistentes de código são uma fonte recorrente desse falso positivo.
- **Protocolo (busca):** o README casa as consultas terminológicas só por identificadores de skill hifenizados (`frontend-microfrontend`, `frontend-web-components`, `README.md:132–133`); “microfrontends” não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (snapshot):** o SHA clonado em 2026-10-12 é posterior às coletas de 7 e 8 de outubro, mas não altera os arquivos que geraram os hits.
