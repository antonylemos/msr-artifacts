---
schema: 1
id: 1264718438
full_name: satyamyadav/zanto-rust
url: https://github.com/satyamyadav/zanto-rust
commit: 5495c74f9c107afebc6b22b389e9109477c1f588
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [svelte, astro]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 146 — satyamyadav/zanto-rust

## Contexto

“zanto”: assistente de IA local-first em Rust, com biblioteca `zanto-core`, CLI de terminal e app desktop Tauri com UI SvelteKit, mais um site de marketing Astro em `site/` (`README.md:9`; `README.md:92–99`; `site/astro.config.mjs:11–18`). O produto chama de “micro-apps” as ferramentas internas, como Personal Finance (`README.md:39–40`). Elas são módulos Svelte do mesmo build do desktop, importados estaticamente pelo canvas, não unidades frontend separadas. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:147` registra rank 146, ID 1264718438, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:147` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31587` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:31595` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q2` | `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:50:27.916Z / 2026-10-08T16:27:12.314Z |

Metadados do hit:
- descrição sobre o workspace de IA local-first, com “focused apps like Personal Finance”, sem “micro apps”;
- tópicos incluem `desktop-app`, `tauri` e `sevltekit`;
- linguagem Rust, `fork: false`, criação em 2026-06-10T05:57:57Z, push em 2026-07-02T17:46:20Z, homepage no GitHub Pages.

O README contém “**Micro-apps.**” (`README.md:39`, grafia hifenizada) e “frontend” (`README.md:97`, “terminal frontend”), os dois termos exigidos pela consulta.

A última alteração do README é `fa0dbd7` (2026-06-28). Ela e o SHA (2026-07-02) antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 411 entradas, 410 arquivos regulares `100644` e 1 executável `100755` (`install.sh`); zero symlinks e zero gitlinks. Workspace Cargo com `crates/zanto-core`, `crates/zanto-cli` e `crates/zanto-desktop` (`README.md:94–99`), um site Astro em `site/` e documentação em `docs/`. Só há dois projetos frontend: `crates/zanto-desktop/package.json` e `site/package.json`. | contexto |
| Código-fonte (micro-apps) | `crates/zanto-desktop/src/lib/components/Canvas.svelte:6`: `import FinanceV1 from "$lib/apps/finance/FinanceV1.svelte"`, renderizado em `Canvas.svelte:116–120`. `crates/zanto-desktop/src/lib/registry.ts:13–15`, `32–34`: componentes da finance registrados num mapa estático junto aos blocos genéricos. `crates/zanto-desktop/src/lib/stores/app.svelte.ts:15–24`: lista e “monta” apps via IPC Tauri, isto é, ativa o perfil de backend, não carrega código frontend. | contrária |
| Documentação (arquitetura) | `docs/product.md:27–33`: “A micro app is a self-contained Svelte module mounted in the desktop shell's right-side panel… Think micro-frontends — each app is independently defined, mounted, and switched at runtime”. `crates/zanto-desktop/src-tauri/src/app.rs:1–4`: app = fatia Rust + fatia Svelte + manifesto. `docs/archive/genui-d.md:70–71` e `75`: micro-app “not a separately built application”; entrega “CDN/ESM micro-app” foi descartada. | contrária |
| Configuração / Build/deploy | Desktop: um único build SvelteKit com `adapter-static` (`crates/zanto-desktop/svelte.config.js:9–15`) e Vite (`crates/zanto-desktop/vite.config.js:12–41`), empacotado pelo Tauri (`crates/zanto-desktop/src-tauri/tauri.conf.json:6–11`). Site: Astro estático independente (`site/package.json:7–11`; `site/astro.config.mjs:11–18`). Nenhum dos dois carrega o outro. | contrária |
| Código-fonte (fronteiras) | Busca por imports relativos em `site` e `crates/zanto-desktop/src`. Os `../` do desktop ficam dentro de `src/lib/apps/finance` (por exemplo, `v1/AccountsTab.svelte:4–6`), e `src/lib/mock/backend.ts:8` lê fixtures em `contract/`, do próprio projeto. O site não referencia `crates/` nem o desktop. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfiles e `docs/archive`, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` e `wujie`. Os acertos são texto, mais o componente executável `Html.svelte` (iframe sandbox para HTML gerado, reaberto em `ArtifactHub.svelte:360`), que não é unidade remota: `docs/product.md:31`, `docs/feature-roadmap.md:51` (iframe sandbox para artefatos HTML gerados, como plano) e falsos positivos (`fetch_url.rs:276`, `import.rs:208`, `finance-v1-plan.md`). Nenhum mecanismo de composição. | ausente |

## Autoria e histórico

Clone não raso; 336 commits, nenhum merge, todos de Satyam `<satyamyadav3@gmail.com>`, de 2026-06-09 (`24acb39`, “core structure”) a 2026-07-02. Por caminho (`git log --no-renames`): `crates/zanto-desktop` 231 commits, `crates/zanto-core` 76, `site` 3 e `docs` 78. Há tags `v1.0.0-beta.0` a `v1.0.0-beta.3` e dois refs remotos `worktree-agent-*`, cujo conteúdo não foi considerado. `CLAUDE.md` e `.claude/` indicam uso de assistente de código; os metadados não separam autoria intelectual. Nenhum blob histórico foi lido. A travessia completa de `git log --name-status` em `crates/zanto-desktop`, `crates/zanto-core` e `docs` falha com `GIT_NO_LAZY_FETCH=1` por objetos promisor indisponíveis no clone parcial; os logs por caminho necessários estão disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Dois projetos frontend identificáveis no repositório: a aplicação desktop SvelteKit/Tauri e o site Astro (`frontend_units: 2`). As “micro-apps” não são unidades separadas: são módulos do mesmo build importados estaticamente (`Canvas.svelte:6`; `registry.ts:13–15`). Q1 conta unidades identificáveis no repositório, referenciadas ou não por configuração de composição (cf. 042). |
| Q2 | Yes | Desktop e site têm entrada e build próprios e não importam o código um do outro; o site é independente do desktop. A finance compartilha entrada e build com o shell desktop (`svelte.config.js:9–15`; `vite.config.js:12–41`), e não conta como unidade à parte. |
| Q3 | No | O desktop monta módulos internos, não unidades independentes. O site e o desktop não participam da mesma aplicação. |
| Q4 | No | Nenhum mecanismo de composição frontend configurado. A “montagem” é import estático mais ativação de perfil por IPC (`app.svelte.ts:21–24`). |
| Q5 | No | Q1–Q4 são No: app desktop modular com “micro-apps” internos e site separado, sem composição de unidades. |

## Motivo

- `Non-MFE` pela regra “at least one question is No” (Q3 e Q4 No; Q1 e Q2 Yes por haver dois projetos frontend independentes, desktop e site, que não compõem um ao outro). Corresponde a “conventional frontend monoliths”, por modularização interna chamada de micro-app, e a “monorepos containing several unrelated frontend applications” (desktop e site).
- A analogia “Think micro-frontends” (`docs/product.md:31`) é autodescrição, e o próprio histórico de design registra que a entrega separada de micro-apps foi descartada (`docs/archive/genui-d.md:70–75`). Por isso não se trata como mecanismo de composição.
- `frontend_units: 2` (desktop SvelteKit e site Astro), `unit_organization: monorepo`. `ui_technologies: [svelte, astro]`. `build_tools: [vite]` pela configuração explícita do desktop; o Astro encapsula o bundler do site. `repo_type: production`: produto distribuído por releases e tags (`README.md:43–50`).
- Não há decisão aberta: o iframe citado no roadmap é sandbox para artefatos gerados, não composição de unidades, e não está implementado como composição.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-app” como nome de módulo interno de produto (com backend Rust e UI Svelte no mesmo binário), acompanhado da analogia “Think micro-frontends”. A consulta ampla `"micro apps" frontend` capta esse vocabulário.
- **Protocolo (busca):** os dois termos da consulta aparecem em linhas distintas do README (`README.md:39`, `97`). A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE e `draft`; divergência adotada nas respostas Q1/Q2, que passaram de No a Yes. Fundamento verificável: o texto literal de Q1 conta unidades frontend identificáveis no repositório, e Q2 pede entrada e build próprios sem import de código entre as unidades; desktop e site cumprem os dois, e o final 042 aplica Q1 Yes a duas apps frontend em monorepo, excluindo a classe por Q4 No. Aqui, adicionalmente, desktop e site nem se compõem (Q3 No), e Q5 No acompanha Q3/Q4. Também foram corrigidas a descrição da busca por `<iframe` e a afirmação de que não faltavam objetos no histórico.
