---
schema: 1
id: 1001914825
full_name: Kyrie112/ceph_cls_dev
url: https://github.com/Kyrie112/ceph_cls_dev
commit: 30bf0d825d417ba4687e547838f2740bab5e636b
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 354 — Kyrie112/ceph_cls_dev

## Contexto

Cópia, com histórico completo, do sistema de armazenamento Ceph (C++, Python), sem fork declarado. No SHA, o HEAD do branch padrão `main` é um merge upstream de 2025-07-22. O único frontend é o Ceph Dashboard (`src/pybind/mgr/dashboard/frontend/`), uma aplicação Angular em Nx. Desde `a0dd52fe10` (2025-05-04, “mgr/dashboard: set up dashboard as a app shell”), ela está configurada como host Nx Module Federation com `remotes: []` e manifesto de runtime vazio. O titular do repositório só tem commits num branch separado (`origin/ndp_dev`), fora do snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:355` registra rank 354, ID 1001914825, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:355` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:15142` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:15146` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `code`, consulta `technology-module-federation-package-code` (`"@module-federation" filename:package.json`), subconsulta `…#size:6000..9999`, `path` `src/pybind/mgr/dashboard/frontend/package.json`. As coletas são 2026-10-07T21:13:13.263Z (001) e 2026-10-08T15:44:19.145Z (002).

O arquivo tem 6.090 bytes no SHA e declara `"@module-federation/enhanced": "^0.9.0"` e `"@nx/module-federation": "20.8.1"` (`package.json:105–106`). Os metadados do hit de código não trazem descrição, tópicos nem datas. A entrada é só por código.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 13.605 entradas, 11.195 arquivos regulares `100644`, 682 executáveis `100755`, 1.701 symlinks `120000` e 27 gitlinks `160000` (submódulos do projeto Ceph, por exemplo `ceph-erasure-code-corpus`, `ceph-object-corpus` e `src/BLAKE3`). Os gitlinks são dependências do backend, não unidades frontend. O único frontend é `src/pybind/mgr/dashboard/frontend/`. | contexto |
| Configuração MF | `src/pybind/mgr/dashboard/frontend/module-federation.config.ts:3–18`: `name: 'ceph-dashboard'`, `remotes: []`, com apenas comentários de exemplo. `webpack.config.ts:1–9` e `webpack.prod.config.ts:9–24`: `withModuleFederation(config)`, com remotos de produção só em comentário. `project.json:181`: `@nx/angular:module-federation-dev-server`. | contrária |
| Runtime | `src/main.ts:1–10`: carrega `/assets/module-federation.manifest.json` e chama `setRemoteDefinitions` antes do `bootstrap`. `src/assets/module-federation.manifest.json`: `{}`, sem remotos definidos. | contrária |
| Consumo | `git grep` por `loadRemote` e `remotes` em `src/` do dashboard: nenhum carregamento de módulo remoto. | ausente |

## Autoria e histórico

Clone não raso:
- **Histórico do SHA:** 155.018 commits, 38.172 merges, de 2001-04-29 (`7091d44931`) a 2025-07-22, todos upstream. Os maiores autores são Sage Weil e Kefu Chai.
- **Refs:** 161.963 commits e 40.386 merges em todos os refs, com vários branches `dependabot-*`.
- **Titular:** os 8 commits de `Kyrie112` estão no branch `origin/ndp_dev` (por exemplo, `a5dc1135c7`, 2025-11-03), fora do snapshot.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (Ceph Dashboard); nenhuma unidade remota referenciada (`remotes: []`, manifesto `{}`). |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | O dashboard está preparado como shell, mas não carrega nem monta nenhuma unidade. |
| Q4 | No | Federação configurada sem remotos nem consumo: “A declared dependency alone is No”. |
| Q5 | No | Q1–Q4 são No: frontend único com federação preparada, mas não usada. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE-related dependencies that are unused or experimental”: o host Nx MF existe sem nenhum remoto.
- Diferentemente de 097, aqui a configuração é executável. Ainda assim não conecta unidades, então Q4 é No, não Undetermined.
- **Campos:**
  - `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`;
  - `ui_technologies: [angular]`, `build_tools: [webpack]` (Nx com `withModuleFederation` sobre webpack);
  - `repo_type: production` (software de produção Ceph).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** o Ceph Dashboard adotou o padrão de app shell do Nx MF, com manifesto de runtime pronto para receber remotos. No snapshot, isso é preparação de arquitetura, não composição.
- **Protocolo (amostra):** cópia integral de um projeto upstream, com o trabalho do titular num branch não padrão.
- **Protocolo (busca):** entrada só por código, por dependência declarada. A elegibilidade muda de `unknown` (001) para `pass` (002).
