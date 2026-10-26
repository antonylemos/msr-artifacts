---
schema: 1
id: 1273847803
full_name: rendongping/jgs
url: https://github.com/rendongping/jgs
commit: d9e8b7e64e32adbd62deb74fb3c9c2a14dcccb4b
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [vue]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 239 — rendongping/jgs

## Contexto

“前端架构师知识图谱与学习资料库” (base de conhecimento e material de estudo para arquiteto frontend, `README.md:1–8`). O repositório organiza documentos de estudo, cadernos de exercícios e bancos de questões de entrevista em quatro níveis (`level-01-foundation` a `level-04-leadership`), mais `interview-bank/`, `quizzes/` e `templates/`. Esse conteúdo é publicado por um único site estático VitePress (`website/`). Um dos capítulos de arquitetura é `A02-micro-frontend/` (“微前端”, `README.md:156`), com texto sobre qiankun, single-spa e Module Federation. Não há configuração de composição de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:240` registra rank 239, ID 1273847803, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:240` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:32118` e `data/discovery/mfe-round-002/candidates.csv:32126`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:23.431Z / 2026-10-08T16:00:38.564Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:11.673Z / 2026-10-08T16:09:47.363Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem Python, `fork: false`, tamanho 13.122;
- criação em 2026-06-18T23:50:30Z, push em 2026-08-07T09:58:53Z.

O acerto vem de `README.md:156`, `├── A02-micro-frontend/    # 微前端`, nome de pasta no índice. A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece literalmente no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `da9def8` (2026-06-25), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 714 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Predominam Markdown e JSON de conteúdo (níveis, `interview-bank/`, `quizzes/`, `website/`). Também estão versionados `tmp-pinyin/node_modules/` (35 entradas), `__pycache__/` e scripts temporários (`temp_w1.py` a `temp_w3.py`). | contexto |
| Configuração / Build | `website/package.json:6–17`: um único site VitePress (`vitepress dev/build`, Vue 3, ECharts). `.github/workflows/deploy.yml:18–51`: build de `website/` e publicação de `website/.vitepress/dist` no GitHub Pages. Os únicos `package.json` são `website/` e `tmp-pinyin/`. Não há `ModuleFederationPlugin`, `registerApplication`, `registerMicroApps` nem `remoteEntry` em arquivos de código. | contrária |
| Conteúdo | `level-03-architecture/A02-micro-frontend/` (`01-学习文档.md`, `02-练习册.md`, `03-面试题.md`) e `website/architecture/micro-frontend*.md`: material de estudo e questões sobre micro-frontends. As menções a qiankun/single-spa/Module Federation em JSON (por exemplo, `interview-bank/data/quality-audit.json:28226`, `28574`) são títulos de questões. | fraca |
| Código-fonte | Os componentes Vue do tema (`website/.vitepress/theme/components/*.vue`) implementam o próprio site de estudo (quizzes, painel, assistente); as ocorrências de “micro-frontend” neles são rótulos de conteúdo. | contexto |

## Autoria e histórico

Clone não raso; 21 commits, 1 merge. São 18 de pingi `<754830524@qq.com>` e 3 de `GitHub Actions <actions@github.com>` (gatilho de deploy e inserções de questões). Vão de 2026-06-18 (`aa206e9`, “ADD-前端架构师进阶规划初始化”) a 2026-08-07 (SHA `d9e8b7e`, ajuste de `base` do site para domínio próprio). O branch padrão é `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (o site VitePress); nenhuma configuração referencia outra unidade. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation, qiankun e single-spa aparecem só como conteúdo de estudo. |
| Q5 | No | Q1–Q4 são No: base de conhecimento cujo capítulo sobre micro-frontends é material didático. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É conteúdo didático e de entrevista, como 023 e o rascunho 194 (exercícios e notas sobre micro-frontends dentro de um site de estudo).
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [vue]`, `build_tools: []` (VitePress encapsula o build), `repo_type: other`, como em 194.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** nome de pasta `A02-micro-frontend/` no índice do README de um repositório de estudo.
- **Protocolo (busca):** o hit plural não tem grafia literal. Elegibilidade `unknown` nas duas rodadas; o repositório entrou na amostra com `unknown`. A linguagem principal “Python” se deve a scripts auxiliares.
