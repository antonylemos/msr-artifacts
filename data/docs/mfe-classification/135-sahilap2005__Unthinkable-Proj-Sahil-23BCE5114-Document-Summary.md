---
schema: 1
id: 1339658435
full_name: sahilap2005/Unthinkable-Proj-Sahil-23BCE5114-Document-Summary
url: https://github.com/sahilap2005/Unthinkable-Proj-Sahil-23BCE5114-Document-Summary
commit: 94cd8d9c9204dec5d19ec81a20b4c9b35b48bd95
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

# 135 — sahilap2005/Unthinkable-Proj-Sahil-23BCE5114-Document-Summary

## Contexto

“Document Summary Assistant”: um app Next.js full-stack que extrai texto de PDF, DOCX e imagens no navegador e resume via Gemini numa rota de API, implantado na Vercel (`README.md:1–11`; `README.md:480`; `APPROACH.md:3–12`). Foi entregue como avaliação técnica: o README incorpora o próprio enunciado de submissão (`README.md:29–32`; `README.md:452–455`). A frase “frontend orchestrates” descreve o pipeline de extração no cliente, não composição de unidades. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:136` registra rank 135, ID 1339658435, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:136` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35681` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:35686` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:45:57.379Z / 2026-10-08T16:25:31.230Z |

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, criação em 2026-08-19T14:08:59Z, push em 2026-08-19T16:29:52Z, homepage `https://unthinkable-proj-sahil-23-bce-5114.vercel.app`. Sem descrição, o acerto só pode vir do README. A frase literal “frontend orchestration” não aparece em nenhum arquivo do SHA. A ocorrência mais próxima é `README.md:480`, “The frontend orchestrates file processing and text extraction directly in the browser.” O casamento com a forma verbal depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `94cd8d9` (2026-08-19T21:59:52+05:30), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 34 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Next na raiz (`package.json`, `next.config.ts`, `app/`, `components/`, `lib/`, `types/`, `public/`), sem `node_modules`, subprojetos ou segundo manifesto. | contrária |
| Código-fonte (UI) | `app/layout.tsx:12–24`: layout raiz único. `app/page.tsx:1–9` é a página cliente que importa componentes de upload e resumo de `@/components` e tipos de `@/types`. `app/api/summarize/route.ts:2–4` é a rota de servidor do mesmo app. | contrária |
| Código-fonte (fronteiras) | Busca por todos os imports em `app`, `components` e `lib`: usam o alias `@/` ou relativos dentro de `lib/` (`lib/document.ts:1–4`). O único `../` é `lib/gemini.ts:2` → `types/summary`, no mesmo projeto. Não há segunda unidade cuja fronteira pudesse ser atravessada. | contexto |
| Configuração / Build/deploy | `package.json:5–10`: um ciclo `next dev`/`next build`. `next.config.ts:3–5` vazio, sem `rewrites`, zones ou federação. Next 16.3.1 e React/ReactDOM 19.2.8 estão resolvidos em `package-lock.json:5861–5862`, `6447–6448` e `6456–6457`. `README.md:487` e `README.md:561–571` descrevem um deploy único na Vercel. | contrária |
| Documentação (arquitetura) | `README.md:458–480`: fluxo em que o frontend Next extrai texto e chama `/api/summarize`, “built as a single, full-stack Next.js application”. `APPROACH.md:3`: “a single-repository Next.js application”. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile, por `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `rewrites` e `zones`: único acerto em `README.md:480`. O lockfile não contém `federation` nem `single-spa`. | ausente |
| Documentação (avaliação) | `README.md:29–455` contém o enunciado de auditoria e submissão de uma “technical assessment” (por exemplo, `README.md:30–32` e `README.md:452–455`), com trechos repetidos; o README técnico continua em `README.md:456`. `AGENTS.md:1–9` contém o bloco padrão gerado pelo Next; `CLAUDE.md:1` é apenas `@AGENTS.md`. | contexto |

## Autoria e histórico

Clone não raso; 9 commits, nenhum merge, todos em 2026-08-19. A raiz `4443d8c` (“Initial commit from Create Next App”, 19:45) traz o scaffold do Next. `d2b76fd` (“Initial commit: Completed Document Summary Assistant”, 20:01) adiciona rota de API, componentes e `lib/`. `0313e82` (21:07) acrescenta o leitor DOCX. Os commits seguintes só alteram o README. Autores: “Sahil Titu `<s3hil@Sahils-MacBook-Air.local>`” em 7 commits (scaffold e código) e “sahilap2005 `<sahilap2005@gmail.com>`” em 2 edições de README, provavelmente feitas pela interface web. `git log --no-renames --name-status` mostra uma única árvore de app que evolui sem divisão em unidades. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, o app Next da raiz (`package.json:5–10`; `app/layout.tsx:12–24`). Não existe configuração de composição que referencie unidades externas (busca registrada). |
| Q2 | No | Sem duas unidades, não há entradas ou builds independentes; a UI e a rota de API são o mesmo app (`app/page.tsx:1–9`; `app/api/summarize/route.ts:2–4`). |
| Q3 | No | O layout raiz envolve a única página (`app/layout.tsx:20`), sem host ou shell montando unidades. |
| Q4 | No | `next.config.ts:3–5` está vazio, e nenhum mecanismo de composição foi encontrado (busca registrada). |
| Q5 | No | Q1–Q4 são No: app Next monolítico, captado pela forma verbal “frontend orchestrates”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”. Não há preparo para host externo, então `MFE-unit` não se aplica.
- Mesmo padrão lexical de 066, 130 e 132 para `"frontend orchestration"`: aqui o termo descreve o pipeline de extração no cliente (`README.md:480`).
- `repo_type: example`: é a entrega de uma avaliação técnica (`README.md:30–32`), como o exercício de entrevista de 094, ainda que com deploy demonstrativo na Vercel (`README.md:6`). `ui_technologies: [react, next]`. `build_tools: []`, pela convenção de Next encapsulando o bundler. `frontend_units: 1` / `single-unit`.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta ampla `"frontend orchestration"` casou a frase “The frontend orchestrates file processing…” (`README.md:480`), sem a forma nominal literal. É o quarto caso observado dessa consulta sem relação com composição de frontend (066, 130, 132).
- **Protocolo (completude):** o README mistura documentação técnica com um enunciado de submissão colado, repetido. Isso não afeta a classificação, mas aumenta o texto que pode gerar acertos nas buscas.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `example`, `[react, next]`, `build_tools: []`, uma unidade e `single-unit`; sem decisão aberta. Correção adotada: `CLAUDE.md:1` é só `@AGENTS.md` (verificado no SHA), não outro bloco Next. A origem do acerto (consulta `"frontend orchestration"`, estratégia `broader`, partição `created:2026-Q3`) é inferência por eliminação pelo README: a expressão exata não aparece, e o casamento com "frontend orchestrates" parece depender do processamento textual da busca, que os dados locais não registram. O README é anterior às buscas (último commit no próprio SHA, 2026-08-19). `example` se apoia no enunciado de avaliação técnica (`README.md:29–32`, `452–455`, `621`); a demo na Vercel não é tomada como produção.
