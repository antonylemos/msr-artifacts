---
schema: 1
id: 1316830018
full_name: In731/NexSupport-Al-_Customer-Support-AI
url: https://github.com/In731/NexSupport-Al-_Customer-Support-AI
commit: 290f3a732db6fa33367af5d4c46094d3333a984e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 334 — In731/NexSupport-Al-_Customer-Support-AI

## Contexto

Plataforma B2B de atendimento com chatbots RAG (Gemini + MongoDB Vector Search), feita como uma única aplicação Next.js (`src/app/`), com rotas de API e páginas de dashboard, administração e geração de embed (`README.md:12–26`). Para os sites dos clientes há um widget de chat em JavaScript puro (`public/chatBot.js`), inserido por uma tag `<script>`; ele cria o próprio DOM e conversa com a API (`README.md:26`, `50`). O termo da busca aparece em “The React frontend orchestrates a Client-Side Queue” (`README.md:226`), sobre a fila de ingestão de PDFs. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:335` registra rank 334, ID 1316830018, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:335` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34453` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34459` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `broader-frontend-orchestration` (`"frontend orchestration" in:name,description,readme`), subconsulta `…#created:2026-Q3`, com `path` vazio. As coletas são 2026-10-07T23:45:40.806Z (001) e 2026-10-08T16:25:27.031Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2026-07-01..2026-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 2.007;
- criação em 2026-07-30T04:34:19Z, push em 2026-09-04T19:35:09Z.

A frase exata não aparece; o acerto vem de `README.md:226` (“The React frontend orchestrates a Client-Side Queue…”) e depende do processamento textual da busca do GitHub, que não está registrado. O README é do próprio SHA (2026-09-05), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 49 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há uma aplicação Next.js (`next.config.ts`, `src/app/` com páginas e `api/`, `src/components/`, `src/lib/`, `src/model/`), `public/chatBot.js`, testes Vitest em `__tests__/` e um workflow de CI. | contrária |
| Widget | `public/chatBot.js:7–8`: deriva a origem da API do `src` da própria tag `<script>`. `:46`, `73` e seguintes: cria botão e caixa de chat por `document.createElement`. `src/app/embed/page.tsx:1–18`: página autenticada que mostra o snippet de embed (`EmbedClient`). É um widget de produto SaaS inserido em sites de terceiros, sem host, mecanismo de composição ou outra unidade no repositório. | contexto |
| Busca de mecanismos | `git grep` no README por `orchestrat`, `micro.?front`, `federation`, `iframe`, `widget` e `embed`: só a menção de `README.md:226` e descrições do widget e de embeddings. Não há configuração de federação, single-spa ou import maps. | ausente |

## Autoria e histórico

Clone não raso:
- **Commits:** 59 em todos os refs, 3 merges, de autoria de “In731” (53) e “Mukesh Chaudhari” (6), um deles (`86d7d6a`, “Delete test-mongo.js”) feito na interface do GitHub.
- **Período:** até 2026-09-05 (SHA `290f3a7`, “feat: README.md update with latest changes”).
- **Repositório:** um merge cita `In731/Customer-Support-AI` como origem (`2fcbed7`).

Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend (Next.js). O widget `chatBot.js` é parte do produto para sites externos, não uma segunda unidade composta por um host do repositório. |
| Q2 | No | Sem duas unidades compostas, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz que componha unidades. |
| Q4 | No | Nenhum mecanismo de composição; “orchestrates” descreve uma fila de ingestão (`README.md:226`). |
| Q5 | No | Q1–Q4 são No: aplicação SaaS convencional com widget de embed. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”.
- Mesmo enquadramento de 217, 221, 277 e 281, que entraram pela consulta ampla `"frontend orchestration"` por uso não relacionado do termo.
- Não é MFE-unit: o widget não é uma unidade preparada para composição por host MFE, como `exposes` ou lifecycles single-spa. É um script de produto para sites de clientes.
- **Campos:**
  - `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`;
  - `ui_technologies: [react, next]`, `build_tools: []` (Next.js sem bundler explícito, como em 013 e 094);
  - `repo_type: production`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “orchestrates” referido a uma fila de ingestão casa a consulta ampla.
- **Protocolo (busca):** a frase exata não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
