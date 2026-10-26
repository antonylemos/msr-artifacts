---
schema: 1
id: 1126203332
full_name: emmanueliyanu21/goalsof2026
url: https://github.com/emmanueliyanu21/goalsof2026
commit: 7ce9e26a0ba62cbd10d28c7371246ca9588a8a1b
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 171 — emmanueliyanu21/goalsof2026

## Contexto

Aplicação Next.js pessoal de acompanhamento de metas (“GoalsTracker”), com abas de painel, tarefas diárias, ideias, motivação e referências, e dados em `localStorage` (`app/page.tsx:12–40`). Tem demo na Vercel. O `README.md` não descreve a aplicação: é um guia de preparação para entrevista de React sênior (`README.md:1–12`). Nesse guia, micro-frontends e Module Federation aparecem como tópico de entrevista (`README.md:179–187`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:172` registra rank 171, ID 1126203332, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:172` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22727` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:22733` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:48.763Z / 2026-10-08T15:57:44.440Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:58.776Z / 2026-10-08T16:07:54.827Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:22:43.252Z / 2026-10-08T16:16:56.013Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 105;
- criação em 2026-01-01T11:27:43Z, push em 2026-01-07T04:40:24Z;
- homepage `goalsof2026.vercel.app`.

Grafias no README:
- “micro-frontends”: `README.md:179` (“### ✔ "Architecture for micro-frontends"”);
- “Module Federation”: `README.md:185` (“Module Federation (you already know this from Stanbic project)”).

A busca de frase trata o hífen como separador. A forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `7ce9e26` (2026-01-07, “adding preparatory guide for Q&A session”), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 27 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Next.js (App Router) na raiz: `app/page.tsx`, `app/layout.tsx`, `app/components/{tabs,shared}`, `next.config.ts` e `package.json`. | contrária |
| Código-fonte | `app/page.tsx:1–40`: componente cliente com estado de metas, persistido em `localStorage`, e imports internos das abas (`./components/tabs/*`) e de componentes compartilhados. A busca por imports `../../` em `app` não retorna nada. | contrária |
| Configuração / Build | `next.config.ts:3–5`: configuração vazia. `package.json:5–25`: `next dev/build/start`, `next` 16.1.1, React 19.2.3, Tailwind, sem dependência de federação. O `name` é `feanpay-web` (`package.json:2`); a aplicação e seus dados acompanham metas de usuários FeanPay (`app/page.tsx:15–17`; `app/components/tabs/IdeasLabTab.tsx:21–38`), de modo que o nome pode refletir esse contexto, e não se usa como evidência de origem diferente. | contrária |
| Documentação | `README.md:1–12`: guia de preparação para entrevista. `README.md:179–187`: “Architecture for micro-frontends” com pontos-chave, entre eles Module Federation. É conteúdo, não descrição do repositório. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA por `micro.?front` e `federation`: só `README.md:179` e `185`; nada em `app/`. | ausente |

## Autoria e histórico

Clone não raso; 7 commits, nenhum merge, todos de `emmanueliyanu21 <emmanueliyanu2012@gmail.com>`, de 2026-01-01 (`b7da3d4`, “first commit”) a 2026-01-07 (SHA). O guia de entrevista foi acrescentado ao README só no SHA. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; `app/page.tsx` só alterna abas internas. |
| Q4 | No | Nenhum mecanismo de composição (`next.config.ts:3–5`; busca registrada). |
| Q5 | No | Q1–Q4 são No: SPA pessoal com README de estudo que cita micro-frontends. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”.
- O termo é conteúdo de estudo, como em 023. Há uma aplicação real, por isso `frontend_units: 1` e `single-unit`, e não 0 como nos perfis sem implementação.
- `ui_technologies: [react, next]`, `build_tools: []` (Next encapsula o bundler). `repo_type: other`: ferramenta pessoal de metas, sem caráter de exemplo de MFE, template ou produto.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README usado como bloco de notas de entrevista, com tópicos de MFE e Module Federation, sobre uma aplicação sem relação com o tema. Bate em consultas terminológicas e de tecnologia.
- **Protocolo (busca):** o hit singular `"micro frontend"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No (uma aplicação Next.js; abas, componentes e estado na mesma árvore, sem outra unidade nem mecanismo de composição); sem decisão aberta (`draft`). A menção a micro-frontends e Module Federation está em um guia de entrevista adicionado ao README no próprio SHA (2026-01-07), anterior às buscas, e não descreve a aplicação. A exceção MFE-unit não se aplica (sem `exposes`, ciclos de vida ou componente preparado para host externo). `repo_type: other` é defensável para uma ferramenta pessoal, embora mereça explicação mais forte diante da aplicação funcional e da homepage na Vercel, e entra na harmonização pendente de `repo_type`. O histórico (sete commits, uma única conta) não acusou objeto ausente nos logs por caminho consultados.
- **Contribuição da revisão independente (Lupa), complemento:** a alegação de que o nome `feanpay-web` seria resquício de outro projeto não é comprovada e foi retirada. Os finais 019 e 032 classificam aplicações pessoais ou portfólios implantados como `production`, enquanto 014 é um app React convencional de tipo `template`; o `repo_type: other` daqui entra na harmonização pendente. 013 (Next Multi-Zones, quatro apps Next com `rewrites`) não é comparável. Q1 e Q2 do checklist devem apontar caminhos e linhas diretamente.
