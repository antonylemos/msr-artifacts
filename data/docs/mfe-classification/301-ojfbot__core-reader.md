---
schema: 1
id: 1170401686
full_name: ojfbot/core-reader
url: https://github.com/ojfbot/core-reader
commit: 480973916c7259c09e91cf8601e88eca4fdce266
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 301 — ojfbot/core-reader

## Contexto

“Core Reader”, visualizador somente leitura da documentação do framework “Frame OS” (`README.md:1–5`). É um monorepo pnpm com três pacotes:
- `packages/browser-app`: dashboard React/Carbon, configurado como remote de Module Federation (`README.md:11`, `:20`; `packages/browser-app/vite.config.ts:6–8`, `:23–37`);
- `packages/api`: servidor Express que lê os arquivos do repositório `core`;
- `packages/browser-automation`: serviço Node com Playwright para testes visuais.

O host é o repositório `ojfbot/shell` (“Module Federation host”, `README.md:74`), externo. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:302` registra rank 301, ID 1170401686, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:302` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25666` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:25673` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | code | `…#size:800..899` | `packages/browser-app/package.json` | 2026-10-07T22:05:03.417Z / 2026-10-08T15:48:05.846Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-03` | vazio | 2026-10-07T23:23:54.590Z / 2026-10-08T16:17:20.346Z |

As consultas efetivas acrescentam a faixa `size:800..899` (código) e `pushed:>=2025-04-01 created:2026-03-01..2026-03-31` (repositórios).

Metadados do hit (iguais nas duas rodadas): descrição “Frame OS CoreReader — metadata dashboard for core repo commands, ADRs, and roadmap”, sem tópicos, linguagem TypeScript, licença MIT, `fork: false`, tamanho 388, criação em 2026-03-02T04:39:10Z, push em 2026-06-04T23:10:55Z.

Correspondências no SHA:
- **Código:** `packages/browser-app/package.json` tem 814 bytes, dentro da faixa, e declara `@originjs/vite-plugin-federation` (`:22`).
- **README:** “Module Federation” em `README.md:11` (“Module Federation remote — renders inside the Frame OS shell”), `:20`, `:29`, `:59` e `:74`.

A última alteração de `README.md`/`package.json` do browser-app é `9741fa4` (2026-05-06), e o SHA é de 2026-06-04. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

O dono tem 18 candidatos nas rodadas, entre eles `ojfbot/shell` (`data/discovery/mfe-round-002/candidates.csv:25474`), `core`, `cv-builder`, `BlogEngine`, `TripPlanner` e `frame-ui-components` (por exemplo, `:21099`, `:22130`, `:26806`). Só `core-reader` está em `sample.csv` (`:302`); os demais não foram inspecionados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 193 entradas, sendo 142 arquivos regulares `100644` e 51 symlinks `120000` (`.claude/commands`, 38 em `.claude/skills/`, 12 em `scripts/hooks/`), que apontam para fora do repositório, ao `core` vizinho (por exemplo, `.claude/skills/adr` → `../../../core/.claude/skills/adr`); zero gitlinks. Os symlinks são ferramentas de assistente de código, não unidades. Pacotes `packages/browser-app`, `packages/api`, `packages/browser-automation`; ADRs em `decisions/adr/`. | contexto |
| Configuração (remote) | `packages/browser-app/vite.config.ts:23–37`: `federation({ name: 'core_reader', filename: 'remoteEntry.js', exposes: { './Dashboard': './src/components/Dashboard' }, shared: react, react-dom, @carbon/react, react-redux singletons })`, sem `remotes`; `:6–8`: “CoreReader is a Module Federation REMOTE. Shell dev: core_reader@http://localhost:3015/assets/remoteEntry.js; Shell prod: shell reads VITE_REMOTE_CORE_READER”; `:51–57`: porta 3015 com CORS para o shell. | forte |
| Código-fonte (exposição) | `packages/browser-app/src/components/Dashboard.tsx:1–25`: componente exposto com `Provider` Redux próprio, abas (Skills, ADRs, Roadmap, OKRs, Docs, Changes, Events) e layout de `@ojfbot/frame-ui-components`. `packages/browser-app/src/main.tsx:9–15`: montagem isolada em `#root`. | moderada |
| Build/deploy | `packages/browser-app/package.json:5–8`: `vite build` próprio. `vercel.json:1–34`: deploy na Vercel com `outputDirectory: packages/browser-app/dist`, e CORS de `/assets/*` liberado para `https://frame.jim.software` (`:17–22`), a origem do shell em produção. | moderada |
| Composição | Nenhum host no repositório; o README aponta o host em `ojfbot/shell` (`README.md:74`) e registra “Module Federation remote registered in shell” (`README.md:59`). | ausente |
| Código-fonte (fronteiras) | Busca ativa de imports relativos `../../` em `packages`: só travessias internas de cada pacote (por exemplo, `packages/browser-app/src/components/changes-tab/FileRow.tsx:2`, `:10`; `packages/browser-automation/src/test-runner/assertions/index.ts:1–2`). O browser-app consome a API por HTTP (`packages/browser-app/src/api/index.ts:2–7`) e a UI comum por pacote npm (`@ojfbot/frame-ui-components`, `packages/browser-app/package.json:11`). Não há outra unidade frontend no repositório. | contexto |
| Tecnologia | `packages/api/package.json:1–21`: Express; `packages/browser-automation/package.json:1–25`: Playwright e Express. São backends e ferramentas de teste, não frontends. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 55 commits alcançáveis a partir do SHA (93 em todos os refs), nenhum merge:
- 45 de `ojfbot <151410806+ojfbot@users.noreply.github.com>` (5 com committer `GitHub`);
- 9 de `ojfbot-clean[bot]`;
- 1 com autor `Claude <noreply@anthropic.com>`.

A raiz é `2f27b66` (2026-03-01, “feat: initial CoreReader Phase 1 implementation”) e o SHA é `4809739` (2026-06-04). Há 20 refs, incluindo branches remotos não considerados. `git rev-list --objects $SHA --missing=print` lista 111 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`packages/browser-app`). A configuração de federação só tem `exposes` e não referencia outras unidades (`vite.config.ts:23–28`). |
| Q2 | Yes (para a unidade) | Entry, build Vite e deploy próprios (`packages/browser-app/package.json:5–8`; `vercel.json:2–3`). |
| Q3 | Undetermined | O host (`ojfbot/shell`) não está no repositório. |
| Q4 | Undetermined | O lado remote está configurado (`exposes: ./Dashboard`, `remoteEntry.js`); o consumidor não é observável. |
| Q5 | No | Unidade preparada para composição por host externo não observável. |

## Motivo

- `MFE-unit` pela exceção “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- Corresponde a “repositories containing only a remote unit, without the composing host”, como 001, 050 e 225 (rascunho).
- O host é do mesmo ecossistema do titular (`ojfbot/shell`), não uma plataforma de terceiros (037).
- A biblioteca compartilhada `@ojfbot/frame-ui-components` entra por npm (build time) e não é unidade composta.
- `repo_type: production`: deploy na Vercel com origem do shell em domínio próprio (`vercel.json:16–20`). `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: [module-federation]`. `frontend_units: 1`: API e automação de browser não são frontends.
- Não há decisão aberta.

## Notas para análise

- **RQ1:** os 51 symlinks para `../../../core/...` dependem de um checkout vizinho do repositório `core` e ficam quebrados num clone isolado; pertencem ao tooling de assistente (`.claude`) e a hooks.
- **RQ2:** remote `@originjs/vite-plugin-federation` com `vite-plugin-css-injected-by-js` para levar o CSS no chunk exposto (`vite.config.ts:13–22`) e singleton de `@carbon/react`.
- **Protocolo (famílias/multi-repo):** o ecossistema Frame OS tem ao menos 18 repositórios nas rodadas, incluindo o host `ojfbot/shell`. Uma análise de famílias poderia verificar Q3/Q4 no shell.
