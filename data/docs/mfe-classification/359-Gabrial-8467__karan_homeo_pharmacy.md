---
schema: 1
id: 1023722918
full_name: Gabrial-8467/karan_homeo_pharmacy
url: https://github.com/Gabrial-8467/karan_homeo_pharmacy
commit: 32f56c8e4953a5a64f61e9faab62b304d8250110
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 359 — Gabrial-8467/karan_homeo_pharmacy

## Contexto

Plataforma de e-commerce full-stack com backend Node.js/Express (`backend/`) e duas aplicações React + Vite separadas: `admin` (porta 4444) e `frontend`, a loja do cliente (porta 3000). Cada aplicação tem o próprio `vercel.json` (`README.md:1–4`, `27–33`). O README chama isso de arquitetura “micro‑frontend”: “each UI has its own build pipeline, `package.json`, and deployment configuration, while sharing a common backend API.” (`README.md:4`). Não há host nem mecanismo que componha as duas aplicações. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:360` registra rank 359, ID 1023722918, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:360` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16664` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:16668` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:04.410Z / 2026-10-08T15:55:14.653Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:39.933Z / 2026-10-08T16:06:16.274Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 11.578;
- criação em 2025-07-21T15:37:46Z, push em 2026-07-02T06:38:21Z.

A única grafia é “micro‑frontend”, com hífen não separável (U+2011), em `README.md:4`. O plural não aparece; ambos os hits dependem do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2026-07-02), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 80 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `admin/`, `frontend/` (32 arquivos em `src/` somados), `backend/` (Express, rotas, modelos) e o `README.md` da raiz. | contexto |
| Aplicações | `admin/vite.config.js:1–15` e `frontend/vite.config.js:1–43`: só React e Tailwind, portas 4444 e 3000. Os `vercel.json` de cada app têm só o rewrite de SPA para o próprio `index`. | contrária |
| Busca de mecanismos | `git grep` em `admin/` e `frontend/`, sem lockfiles, por `federation`, `remoteEntry`, `iframe`, `single-spa` e `import()` de URL: nada. Não há imports com `../../` em `admin/src` e `frontend/src`. | ausente |
| Documentação | `README.md:4`: “micro‑frontend” definido como UIs com build, `package.json` e deploy próprios que compartilham o backend, sem composição. | contrária |

## Autoria e histórico

Clone não raso; 181 commits em todos os refs, 2 merges, de 2025-07-21 a 2026-07-02 (SHA `32f56c8`). Os autores aparecem como `gabrialdeora`, “Gabrial Deora” e `Gabrial-8467`; parte dos commits foi feita pela interface do GitHub. Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas aplicações frontend identificáveis (`admin`, `frontend`). |
| Q2 | Yes | Cada uma tem `package.json`, Vite, porta e deploy próprios, sem import de código entre elas. |
| Q3 | No | Nenhum host, shell ou configuração raiz carrega, monta ou roteia as aplicações. |
| Q4 | No | Nenhum mecanismo de composição configurado. |
| Q5 | No | Duas SPAs independentes que compartilham só o backend. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “multiple frontend applications without explicit composition”.
- Mesmo enquadramento do rascunho 278 (SPAs por perfil chamadas de micro-frontends, sem composição).
- **Campos:** `frontend_units: 2`, `unit_organization: monorepo`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (e-commerce com configuração de deploy na Vercel; é juízo, e `example` seria a alternativa).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro‑frontend” usado para SPAs separadas com backend comum casa as consultas terminológicas.
- **Protocolo (busca):** o README usa hífen não separável (U+2011), e o plural não aparece. A elegibilidade muda de `unknown` (001) para `pass` (002).
