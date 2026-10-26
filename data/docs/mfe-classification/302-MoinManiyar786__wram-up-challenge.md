---
schema: 1
id: 1297144886
full_name: MoinManiyar786/wram-up-challenge
url: https://github.com/MoinManiyar786/wram-up-challenge
commit: e5113920a6afc975569adb4e2bc54ad9def57c80
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 302 — MoinManiyar786/wram-up-challenge

## Contexto

Aplicação pequena para um desafio (“Warm-Up Challenge”, `README.md:5–6`): um servidor Express (`server.js`) que chama a API Gemini e serve uma página estática em HTML/CSS/JS sem framework (`public/`). “Micro-app” aparece só como autodescrição de app pequena (`README.md:3`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:303` registra rank 302, ID 1297144886, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:303` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:33318` (`broader`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:33326` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q3` | `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:50:47.485Z / 2026-10-08T16:27:17.627Z |

Metadados do hit: descrição nula, sem tópicos, linguagem JavaScript, sem licença, `fork: false`, tamanho 14, criação em 2026-07-11T05:10:53Z, push em 2026-07-11T06:01:42Z.

O acerto vem do README: “micro-app”, no singular e hifenizado, em `README.md:3` (“A simple, lightweight AI micro-app that helps users generate a personalized daily cooking plan…”), e “Frontend” em `README.md:13` (“**Frontend:** Vanilla HTML, CSS (Glassmorphism UI), JavaScript”). A frase plural “micro apps” não aparece literalmente; o casamento depende do processamento textual da busca do GitHub (hífen e flexão), que não está registrado.

O README foi introduzido na raiz `cd8932f` (2026-07-11) e não foi alterado depois; é anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 11 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `server.js`, `package.json`/lockfile, `Dockerfile`, `vercel.json`, `.gitignore`, `.dockerignore`, `README.md` e `public/index.html`, `public/app.js`, `public/styles.css`. | contrária |
| Código-fonte (UI) | `public/index.html:7`, `71`: uma única página que carrega `styles.css` e `app.js`; `public/app.js:1–63`: um handler de formulário que faz `fetch('/api/generate-plan')` (`:17`) e preenche o DOM. Sem framework, bundler ou outra página. | contrária |
| Código-fonte (backend) | `server.js:14`: `express.static` da pasta `public`; `:19–67`: rota `POST /api/generate-plan` com Gemini; `:70–72`: health check. `package.json:5–7`, `13–18`: só `start` e dependências de servidor. | contexto |
| Build/deploy | `Dockerfile:1–13`: imagem Node que executa `npm start`; `vercel.json:2–18`: `server.js` em `@vercel/node` para `/api/*` e `public/` para o resto. Um só artefato de deploy. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto `package-lock.json`, por `micro`, `federation`, `single.?spa`, `import.?map`, `iframe` e `customElements`: só `README.md:3`. `package-lock.json` por `module-federation`, `single-spa`, `qiankun`: nenhuma ocorrência. Sem imports entre módulos frontend (há um único script). | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 2 commits alcançáveis (2 em todos os refs), nenhum merge, ambos com autor e committer `AI Bot <bot@example.com>` em 2026-07-11: a raiz `cd8932f` (“Initial commit”) adiciona os dez arquivos originais; o SHA `e511392` (“Add Vercel configuration”) altera `server.js` e adiciona `vercel.json`. A identidade é genérica e não permite atribuir o código a uma pessoa; registra-se como autoria não identificável. `git rev-list --objects $SHA --missing=print` identifica 1 objeto histórico ausente; os blobs do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`public/index.html` + `app.js`); nenhuma configuração de composição (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | Não há host, shell nem root config; o Express só serve arquivos estáticos e uma API (`server.js:14`, `19`). |
| Q4 | No | Nenhum mecanismo de composição; “micro-app” é autodescrição (`README.md:3`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” (página única servida por um backend) e, pelo vocabulário, a “repositories mentioning micro-frontends without implementing them”.
- Não é `MFE-unit`: a página não exporta contrato para host externo.
- `repo_type: example` (entrega de desafio, `README.md:5–6`), `frontend_units: 1`, `unit_organization: single-unit`; `ui_technologies: []` e `build_tools: []` (HTML/CSS/JS sem biblioteca nem bundler).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “AI micro-app” como adjetivo de tamanho em app de desafio; a consulta ampla `"micro apps" frontend` casa o termo hifenizado no singular e a palavra “Frontend” da lista de stack.
- **Protocolo (autoria):** os dois commits usam a identidade genérica `AI Bot <bot@example.com>`; não há metadado que identifique o titular como autor.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
