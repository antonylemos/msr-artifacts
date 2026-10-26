---
schema: 1
id: 1044389461
full_name: mhmdgh92/React-Recipes-App
url: https://github.com/mhmdgh92/React-Recipes-App
commit: 608fd0fab42fcbc85759555fad98f011efa0b396
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 297 — mhmdgh92/React-Recipes-App

## Contexto

Aplicação de receitas de demonstração em Next.js (App Router) com React Query, Supabase opcional e dados mock (`README.md:1–3`, `12–26`). Há um único projeto frontend; micro-frontends aparecem só como possibilidade futura de extração (`README.md:26`, `80`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:298` registra rank 297, ID 1044389461, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:298` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18051` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:18056` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-08` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T22:24:46.445Z / 2026-10-08T15:55:27.142Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-08` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T22:56:00.831Z / 2026-10-08T16:06:25.259Z |

Metadados do hit: descrição nula, sem tópicos, linguagem JavaScript, licença MIT, `fork: false`, tamanho 13301, criação em 2025-08-25T15:56:18Z, push em 2025-08-25T15:56:46Z.

O acerto vem do README: o plural “micro frontends” aparece literalmente em `README.md:26` (“**Vite** → optional setup for building micro frontends or standalone tools.”) e `README.md:80` (“Consider using Vite if extracting features into standalone micro frontends.”). O singular “micro frontend” não aparece isolado; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README foi introduzido no único commit, o próprio SHA (2025-08-25), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 55 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único `package.json` na raiz e um único `src/` com rotas do App Router (`src/app/`), `features/`, `lib/`, `MockData/`; mais arquivos `.DS_Store`, `.vscode/` e `demo/demo.gif`. Não há `index.html` nem entrada Vite própria. | contrária |
| Configuração | `package.json:6–15`: `dev`/`build`/`start` com Next (`next dev -p 3000`, `next build`); `next.config.ts:3–8`: só `reactStrictMode` e `typedRoutes`. `vite.config.ts:6–8`: `react()` e `tailwindcss()`, sem entrada nem plugin de federação; o único uso em script é `preview` (`package.json:8`). | contrária |
| Código-fonte | `src/app/layout.tsx:13–48`: um layout raiz com navegação por `next/link` (`/`, `/recipes`, `/about`) envolvendo `{children}`; as páginas (`src/app/page.tsx`, `src/app/recipes/page.tsx`, `src/app/recipe/[id]/page.tsx` etc.) pertencem à mesma app. | contrária |
| Código-fonte (iframe) | `src/features/recipes/components/VideoModal.tsx:18–24`: `<iframe src={video}>` incorporando vídeos do YouTube (por exemplo, `src/MockData/dataArrays.js:52`), conteúdo externo, não unidade frontend. | contexto |
| Código-fonte (fronteiras) | Busca por especificadores `../`: única ocorrência `src/features/recipes/components/RecipeItem.tsx:1` (`'../types'`, interna à mesma feature); demais imports por alias `@/`. Há um só projeto, sem fronteira entre unidades a atravessar. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto `package-lock.json` e README, por `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `systemjs`, `registerApplication` e `micro.?front`: só o iframe de vídeo acima. `package-lock.json` por `module-federation`, `single-spa`, `originjs`: nenhuma ocorrência. | ausente |
| Documentação | `README.md:26`, `80`: micro-frontends citados como uso opcional de Vite para extração futura de features. | fraca |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 1 commit (1 em todos os refs), nenhum merge: o próprio SHA `608fd0f` (2025-08-25T18:56:33+03:00, “First launch”), autor e committer `MhmdGH92 <mohammedghabyen+1@gmail.com>`, que adiciona os 55 arquivos em bloco. Não há sequência de desenvolvimento; os metadados não permitem separar autoria intelectual. O nome do pacote (`"todo-app"`, `package.json:2`) e o título `TodoApp` (`src/app/layout.tsx:9–10`) coincidem com outro repositório da conta nas rodadas, `mhmdgh92/React-Todo-App` (`data/discovery/mfe-round-002/candidates.csv:17869`), fora da amostra e não inspecionado. `git rev-list --objects $SHA --missing=print` não identifica objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (um `package.json`, um App Router em `src/app/`); nenhuma configuração de composição referencia outras unidades (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | O layout raiz (`src/app/layout.tsx:13–48`) roteia páginas da mesma aplicação, não unidades distintas. |
| Q4 | No | Nenhum mecanismo de composição configurado; o `iframe` incorpora vídeo externo e a menção a micro-frontends é intenção futura (`README.md:80`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”.
- Não é `MFE-unit`: a app não exporta contrato para host externo (sem `exposes`, lifecycles ou bundle para import map).
- Não há cadeia parcial (097/103/104), code sharing (089/100) ou unidade de terceiros (102/074/080) a avaliar.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react, next]`, `build_tools: []` (bundler encapsulado pelo Next; o `vite.config.ts` não é usado no build, `package.json:9`), `repo_type: example` (“demo Rrecipes application”, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** menção a “micro frontends” como possibilidade futura (`README.md:26`, `80`) em uma app monolítica; a presença de `vite.config.ts` ao lado do Next reforça o vocabulário, sem uso efetivo.
- **Protocolo (família):** pacote e título herdados de uma app de tarefas (`package.json:2`; `src/app/layout.tsx:9–10`), consistente com `mhmdgh92/React-Todo-App` nas rodadas; só este repositório está na amostra (`sample.csv:298`).
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
