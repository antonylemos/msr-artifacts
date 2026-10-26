---
schema: 1
id: 1217014736
full_name: pramodyapriyasanka/collaboration-platform
url: https://github.com/pramodyapriyasanka/collaboration-platform
commit: e0beccb6235e08bdc799c9c006ccf04eb2029525
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

# 133 — pramodyapriyasanka/collaboration-platform

## Contexto

Site institucional Next.js (App Router) do produto “Hela Ahasa”, montado sobre um template de landing page: o manifesto se chama `startup-nextjs` versão 2.2.1 e a home mantém a metadata “Free Next.js Template for Startup and SaaS” (`package.json:2–3`; `src/app/page.tsx:14–17`). O README declara uma estrutura “Micro-frontend inspired”, mas o snapshot é um único app Next sem composição. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:134` registra rank 133, ID 1217014736, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:134` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28816` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:28822` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-04` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T22:34:23.585Z / 2026-10-08T15:59:00.892Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-04` | `"micro frontends" … created:2026-04-01..2026-04-30` | 2026-10-07T23:02:41.710Z / 2026-10-08T16:08:48.189Z |

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, criação em 2026-04-21T13:10:08Z, push em 2026-04-21T15:34:28Z. Por eliminação, o acerto vem do README. `README.md:71` contém “**Architecture:** Scalable Micro-frontend inspired structure”, na grafia com hífen e no singular. Não há forma plural no README; o hit de `"micro frontends"` depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `e0beccb` (2026-04-21T21:04:27+05:30), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 114 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São 34 imagens PNG/JPG, SVGs, um vídeo e um único projeto Next na raiz (`package.json`, `next.config.js`, `tsconfig.json`, `src/app`, `src/components`, `src/types`). Não há segundo manifesto, subprojeto ou `node_modules`. | contrária |
| Código-fonte (UI) | `src/app/layout.tsx:11–35`: layout raiz com `Header`, `{children}`, `Footer` e `Providers` (tema). `src/app/page.tsx:1–35` compõe a home com seções importadas de `@/components`. As demais rotas (`src/app/about`, `blog`, `contact`, `demo`, `privacy-policy`, `security`, `tos`) são páginas do mesmo App Router. `src/app/demo/page.tsx:82–147` é um formulário estático sem `action` nem handler. | contrária |
| Código-fonte (fronteiras) | Busca por `../` em `src`: `src/app/layout.tsx:7` (`../styles/index.css`) e `../Common/SectionTitle` em seis componentes (por exemplo, `src/components/Video/index.tsx:6`). Os demais imports usam o alias `@/`. Tudo fica dentro do mesmo `src`; não há segunda unidade cuja fronteira pudesse ser atravessada. | contexto |
| Configuração / Build/deploy | `package.json:5–10`: um único ciclo `next dev`/`next build`. `next.config.js:2–12` só configura `images.remotePatterns`, sem `rewrites`, zones ou federação. Next 16.2.4 e React/ReactDOM 19.2.5 estão resolvidos em `package-lock.json:4461–4462`, `5016–5017` e `5025–5026`. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `multi.?zone`, `rewrites` e `zones`: único acerto em `README.md:71`. O lockfile não contém `federation` nem `single-spa`. | ausente |
| Documentação (afirmação MFE) | `README.md:66–71` lista Next.js, React, Tailwind, Hooks/Context e “Scalable Micro-frontend inspired structure”, sem identificar unidades nem mecanismo. Há divergência de versões: `README.md:8` e `README.md:67` dizem Next.js 14 e `README.md:9`/`README.md:68` React 18, enquanto o manifesto declara `next` `^16.2.4` e `react` `^19.2.0` (`package.json:15`, `18`). | fraca |
| Documentação (origem) | `package.json:2–3` (`startup-nextjs`, `2.2.1`), `src/app/page.tsx:15–16` (“Free Next.js Template for Startup and SaaS”, “Startup Nextjs Template”) e logos de marcas de terceiros em `public/images/brands/` indicam a base em um template público de landing page. O template é estrutura de um único app, não plataforma MFE de terceiros. | contexto |

## Autoria e histórico

Clone não raso; 6 commits, nenhum merge, raiz `5d7385a` (“My cleaned project push”, 2026-04-21T18:41:04+05:30), que adiciona o projeto inteiro. Os commits seguintes, todos no mesmo dia, mudam só o README (`da0b154`, `1d0093a`, `7f71ae3`, `e0beccb`) ou adicionam screenshots (`eba38af`). Todos têm o e-mail noreply `143013116+pramodyapriyasanka@users.noreply.github.com`, com os nomes “pramodya priyasanka” (1) e “Pramodya Priyasanka” (5). `git log --no-renames --name-status` mostra que `src/`, `package.json` e `next.config.js` só aparecem na raiz. O histórico não registra a evolução a partir do template nem distingue código próprio de código herdado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, o app Next da raiz (`package.json:5–10`; `src/app/layout.tsx:11–35`). Não existe configuração de composição que referencie unidades externas (busca registrada). A frase em `README.md:71` não identifica unidades. |
| Q2 | No | Sem duas unidades, não há entradas ou builds independentes; páginas e seções compartilham o mesmo build e importam `@/components` (`src/app/page.tsx:1–11`). |
| Q3 | No | O layout raiz envolve rotas do mesmo App Router (`src/app/layout.tsx:25–32`), sem host ou shell montando unidades distintas. |
| Q4 | No | `next.config.js:2–12` não configura composição, e nenhum mecanismo foi encontrado (busca registrada). |
| Q5 | No | Q1–Q4 são No: landing page monolítica com rótulo “Micro-frontend inspired” sem implementação correspondente. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”. Não há preparo para host externo, então `MFE-unit` não se aplica.
- Como em 023 e 129, a autodeclaração (“Micro-frontend inspired structure”) não basta sem unidades e mecanismo. A base em template de terceiro não se assemelha a 074/080/102: o template é um app único de landing page, não uma plataforma de composição.
- `repo_type: production`: o repositório se apresenta como site do produto “Hela Ahasa” (`README.md:4–6`; `src/app/demo/page.tsx:36–39`), não como exemplo didático nem como template a ser reutilizado. Não há homepage nem deploy configurado, e o formulário de demo não envia dados. A classificação de tipo fica registrada como dúvida.
- `ui_technologies: [react, next]`. `build_tools: []`, pela convenção de Next encapsulando o bundler sem configuração explícita. `frontend_units: 1` / `single-unit`.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** o rótulo “Micro-frontend inspired structure” no README (`README.md:71`) é o único sinal. Junto com versões documentadas divergentes do manifesto, indica texto descritivo não verificado contra o código.
- **Protocolo (busca):** sem descrição nem tópicos, o acerto só pode vir do README. O hit no plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `frontend_units: 1`, `single-unit`, `[react, next]` e `build_tools: []`; sem decisão arquitetural aberta. O README é anterior às buscas (última alteração no próprio SHA, 2026-04-21) e a origem do acerto, o `Micro-frontend` hifenizado do README, é inferida por eliminação. Divergência de campo, sem efeito em Q1–Q5: a revisora recomenda `repo_type: template` em lugar de `production`, porque o pacote preserva a identificação do template de origem (`package.json` com `name: startup-nextjs`, `version: 2.2.1`) e não há evidência operacional de produto completo. Mantido `production` (apresentação como site do produto "Hela Ahasa") e registrada a alternativa para o pesquisador, na harmonização pendente de `repo_type`.
