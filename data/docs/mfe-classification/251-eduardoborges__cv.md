---
schema: 1
id: 1224729508
full_name: eduardoborges/cv
url: https://github.com/eduardoborges/cv
commit: a022fc3dd29f665d9d4686253baea8026ff4e92e
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

# 251 — eduardoborges/cv

## Contexto

Currículo pessoal escrito como `README.md`, com scripts que o convertem em PDF. `scripts/generate-pdf.tsx` lê o README, converte o Markdown com `marked`, renderiza um invólucro React no servidor (`renderToStaticMarkup`, `ResumeShell.tsx`) e imprime o resultado com Puppeteer (`scripts/generate-pdf.tsx:1–25`). Um workflow gera o PDF como artefato. Micro-frontends aparecem só como experiência profissional declarada (`README.md:80`). Não há aplicação frontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:252` registra rank 251, ID 1224729508, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:252` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29259` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:29265` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:35:20.160Z / 2026-10-08T15:59:21.679Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:03:54.282Z / 2026-10-08T16:09:01.413Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 36;
- criação em 2026-04-29T15:10:56Z, push em 2026-09-24T16:54:30Z.

O acerto vem de `README.md:80`, “Defined frontend engineering standards across multiple teams working with React, GraphQL, and Micro Frontends.”, única ocorrência. O singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `a022fc3` (2026-09-24), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 10 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `README.md`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `mise.toml`, `.gitignore`, `.github/workflows/build.yaml` e três scripts em `scripts/`. Não há `index.html`, servidor de desenvolvimento nem aplicação web. | contrária |
| Código-fonte | `scripts/generate-pdf.tsx:1–25`: script Node que gera `dist/EduardoBorgesResume.pdf` a partir do README. React é usado só para gerar HTML estático no servidor. `package.json:6–9`: scripts `pdf`/`build` rodam esse script com `tsx`. | contrária |
| Documentação | `README.md:1–12`, `80`: currículo profissional; a menção a “Micro Frontends” descreve experiência em outro contexto. | fraca |
| Busca | `git grep -i` no SHA por `micro.?front`, `federation` e `single.?spa`: só `README.md:80`. | ausente |

## Autoria e histórico

Clone não raso; 7 commits lineares, nenhum merge, de Eduardo Borges, de 2026-04-29 (`2d72fd3`, “Initial commit”) a 2026-09-24 (SHA `a022fc3`, “Update README.md”), com o gerador de PDF adicionado em `60ea263`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; há só um script de geração de PDF. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends só aparecem como experiência declarada (`README.md:80`). |
| Q5 | No | Q1–Q4 são No: currículo pessoal com gerador de PDF. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Equivale aos repositórios de perfil sem implementação (finais 011/064/068/073/077/101/111 e os rascunhos de perfil). O script de PDF não é aplicação frontend: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** experiência com “Micro Frontends” num currículo em README casa as consultas terminológicas.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
