---
schema: 1
id: 1247700661
full_name: byte-od/mermaid-diagram-driven-development
url: https://github.com/byte-od/mermaid-diagram-driven-development
commit: d2942971ccf55f3edccd3c201ab5568c9022a225
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 289 — byte-od/mermaid-diagram-driven-development

## Contexto

- **Tipo de repositório:** ferramenta (CLI Node.js `mddd-cli` para “Mermaid Diagram Driven Development”, com skills e templates para assistentes de código; `package.json:2–15`; `readme.md:4`).

O README avisa que o projeto foi abandonado em favor de outro protocolo (`readme.md:1–2`). Micro-frontends e micro-apps aparecem só num diagrama Mermaid de exemplo no README (`readme.md:66–107`), que ilustra o que a ferramenta documenta, sobre uma plataforma fictícia de micro-apps. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:290` registra rank 289, ID 1247700661, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:290` registra as estratégias `terminology;broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30585` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30592` (`pass`), ambos com `terminology;broader`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:36:39.291Z / 2026-10-08T15:59:48.873Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:05:10.076Z / 2026-10-08T16:09:15.173Z |
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `…#created:2026-Q2` | 2026-10-07T23:50:08.905Z / 2026-10-08T16:27:07.764Z |

As subconsultas acrescentam `pushed:>=2025-04-01` e `created:2026-05-01..2026-05-31` (ou `2026-04-01..2026-06-30` para `broader-micro-apps`).

Metadados do hit (iguais nas duas rodadas): descrição “MDDD - Mermaid Diagram Driven Development”; tópicos `ia-development`, `mdd`, `mddd`, `mddd-development`, `sdd`, `spec-driven-development`; linguagem JavaScript; `fork: false`; tamanho 425; 21 estrelas; criação em 2026-05-23T16:59:49Z; push em 2026-07-26T00:24:25Z.

Correspondências no README do SHA (`readme.md`):
- **“micro frontend”:** `readme.md:100`, “Render Isolated UI Fragment / Micro-Frontend”, dentro do diagrama de exemplo; o hífen funciona como separador;
- **“micro frontends”:** a forma plural não aparece literalmente;
- **“micro apps” + frontend:** só a forma singular “Micro-App” (`readme.md:72`, `:80`, `:94`, `:97`, `:109`; “micro-app” em `:77`) e “Frontend” em `:94` (“Boot Micro-App Frontend/Backend Bundle”).

Os hits do plural dependem do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA (`d294297`, 2026-07-25T21:24:25-03:00, isto é, 2026-07-26T00:24:25Z), igual ao `pushed_at` e anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 38 entradas, sendo 37 arquivos regulares `100644` e 1 executável `100755` (`bin/cli.js`); zero symlinks e zero gitlinks. CLI em `bin/` e `src/` (comandos `init`, `listSpecs`, `status`, `validator`; serviços de arquivos e specs), testes em `tests/`, skills e templates em `.agents/`, `AGENTS.md`, `.clinerules`. Não há HTML, bundler nem aplicação frontend. | contrária |
| Configuração | `package.json:2–9`: pacote `mddd-cli` com binário `md`; `:40–44`: dependências `@mermaid-js/mermaid-cli`, `commander`, `picocolors`. `bin/cli.js:1–20`: CLI Commander que usa os serviços de `src/`. | contrária |
| Documentação (exemplo) | `readme.md:62–107`: “Architectural Diagram Example”, um `sequenceDiagram` de uma plataforma fictícia com “Micro-App Registry” (`:72`) e “Render Isolated UI Fragment / Micro-Frontend” (`:100`); `readme.md:109`: tabela de decisão de exemplo. É conteúdo ilustrativo da ferramenta de diagramas. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto o README, por `micro.?front`, `micro.?app`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements` e `<iframe`: nenhuma ocorrência. | ausente |
| Código-fonte (fronteiras) | Não há unidades frontend; os imports relativos de `bin/cli.js:5–11` para `src/` são da própria CLI. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 121 commits (121 em todos os refs), 4 merges, todos com o e-mail `reisfilho1116@gmail.com`:
- 115 como `JulioCRFilho`, com committer `JulioCRFilho`;
- 5 como `Julio Cesar` e 1 como `TheTod`, com committer `GitHub`.

Os registros vão de 2026-05-23 (`15edb14`, “Initial”) ao SHA (2026-07-25, “Update readme.md”). O `package.json` aponta o repositório em `JulioCRFilho/mermaid-diagram-driven-development` (`package.json:32–39`), o que sugere transferência ou espelhamento para a organização `byte-od` (não verificado). `git rev-list --objects $SHA --missing=print` lista 314 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: o repositório é uma CLI Node.js (`package.json:2–9`; `bin/cli.js:1–20`). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; “Micro-Frontend” e “Micro-App” só aparecem num diagrama de exemplo (`readme.md:66–107`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “repositories mentioning micro-frontends without implementing them”: o termo aparece num diagrama ilustrativo de uma ferramenta de documentação.
- Próximo dos casos de conteúdo e gerador (023/075/081/094/105) e de 252 (rascunho, skills para assistentes de código): ferramenta e documentação, não aplicação.
- `repo_type: library` (CLI distribuída no npm), `frontend_units: 0`, `unit_organization: none`, arrays de tecnologia vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** diagramas Mermaid de exemplo em READMEs (“Micro-App Registry”, “Micro-Frontend”) geram hits terminológicos e da consulta ampla `"micro apps" frontend` sem relação com a arquitetura do repositório.
- **Protocolo (busca):** os hits plurais (`"micro frontends"` e `"micro apps"`) não têm grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
