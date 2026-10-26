---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
url: https://github.com/kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 273 — kod88vn/poc_next_mfa

## Contexto

Prova de conceito de Next.js 16 Multi-Zones num monorepo npm workspaces + Turborepo (`README.md:1–20`; `package.json:4–15`; `turbo.json:1–27`). Três aplicações Next.js:
- `apps/shell` (porta 3000), que faz `rewrites` de `/shop` e `/duda` para as outras zonas;
- `apps/shop` (porta 3001, `basePath: '/shop'`);
- `apps/duda` (porta 3002, `basePath: '/duda'`), que busca no servidor o HTML de um site externo, construído com Duda, e o renderiza.

As três usam a biblioteca `packages/ui` (`@repo/ui`) e um cookie compartilhado, `mfe_cart_count`. A navegação entre zonas é por `<a>` com recarga completa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:274` registra rank 273, ID 1208265953, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:274` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28212` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:28218` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T20:52:29.002Z / 2026-10-08T15:42:17.890Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:37.047Z / 2026-10-08T15:49:43.133Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 91;
- criação em 2026-04-12T03:30:08Z, push em 2026-04-24T20:04:48Z.

Grafias no README:
- “Microfrontend”: `README.md:1` (“# poc_next_mfa — Next.js 16 Multi-Zone Microfrontend POC”) e `README.md:3` (“A production-style Microfrontend architecture using **Next.js 16 Multi-Zones** and **Turborepo**…”);
- “microfrontends”: o plural não aparece; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `18d620e` (2026-04-12), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas. Ele também não menciona a zona `duda`, acrescentada depois.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 45 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Três apps em `apps/` (`shell`, `shop`, `duda`), cada uma com `package.json`, `next.config.js`, `tsconfig.json` e `app/`; a biblioteca `packages/ui`; na raiz, `load-root-env.js`, `turbo.json`, `tests/` e `test-duda-themes.js`. | contexto |
| Composição (shell) | `apps/shell/next.config.js:25–43`: `rewrites` de `/duda` → `http://localhost:3002/duda`, de `/shop` → `http://localhost:3001/shop` e de `/shop/:path*` → `http://localhost:3001/shop/:path*`. | forte |
| Zonas | `apps/shop/next.config.js:19`: `basePath: '/shop'`; `:29–41`: CORS para a origem do shell. `apps/duda/next.config.js:6`, `10–22`: `basePath: '/duda'` e o mesmo cabeçalho. Portas próprias em `apps/*/package.json:7–9` (3000, 3001 e 3002). | forte |
| Navegação e estado | `packages/ui/src/Header.tsx:45–93`: links entre zonas com `<a href="/">`, `"/shop"` e `"/duda"` (“Cross-zone link: must use <a>”). `apps/shop/app/actions.ts:16–35`: Server Action que grava o cookie `mfe_cart_count`, lido pelos layouts do shell (`apps/shell/app/layout.tsx:27–32`) e da duda (`apps/duda/app/layout.tsx:20–27`). | moderada |
| Zona de conteúdo externo | `apps/duda/app/page.tsx:9–14` e `apps/duda/lib/duda-landing.ts:4–5`: busca o HTML de `DUDA_ORIGIN` (padrão `https://pocmfe.multiscreensite.com/`) e o injeta com `dangerouslySetInnerHTML`. `apps/duda/ARCHITECTURE.md:26–36`: descreve o fluxo. A zona é uma aplicação Next.js própria; o conteúdo vem de um site externo. | contexto |
| Código-fonte (fronteiras) | Os imports relativos ficam dentro de cada app (`apps/shop/app/[id]/page.tsx:13`, `apps/duda/app/*.tsx` → `../lib/duda-landing`). As três `next.config.js` fazem `require('../../load-root-env')` (linha 2), um script de configuração da raiz que lê `.env`. `tests/header-theme-accessibility.test.ts:8` importa de `packages/ui`. Não há import entre apps; o código comum é `@repo/ui`, dependência de workspace (`apps/*/package.json:13`, com `transpilePackages`). | contexto |

## Autoria e histórico

Clone não raso; 5 commits lineares, nenhum merge, todos de Jay Quach, de 2026-04-11 (`9afe190`, “Initial commit”, criado pelo GitHub) a 2026-04-24 (SHA `d20db82`, “feat: simplify header navigation and accessibility logic”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três apps Next.js (`apps/shell`, `apps/shop`, `apps/duda`), referenciadas pelos `rewrites` do shell (`apps/shell/next.config.js:25–43`). |
| Q2 | Yes | Cada app tem `package.json`, `next.config.js`, porta e build (`next build`) próprios, sem import de código-fonte entre apps; o código comum vem da biblioteca `@repo/ui`. |
| Q3 | Yes | O shell roteia `/shop/*` e `/duda` para as zonas sob uma origem (`apps/shell/next.config.js:25–43`). |
| Q4 | Yes | Multi-Zones: `rewrites` no shell, `basePath` nas zonas e navegação entre zonas com estado por cookie. É configuração explícita de composição, sujeita à decisão em aberto sobre composição só por rota ou link. |
| Q5 | Yes | Q1–Q4 Yes, com a mesma ressalva de 013. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”, com `status: review` pela decisão em aberto. É o mesmo padrão de 013 (final, `review`) e 237: shell com `rewrites`, zonas com `basePath` e navegação de página inteira.
- **Zona duda:** traz conteúdo de terceiros por proxy, mas é uma aplicação própria do repositório; não é plugin em plataforma de terceiros (102/074/080).
- **Campos:** `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js sem bundler explícito, como em 013), `frontend_units: 3` (shell, shop e duda; `packages/ui` é biblioteca), `unit_organization: monorepo`, `repo_type: example` (POC declarada em `README.md:1`).

## Notas para análise

- **RQ2:** Multi-Zones do Next.js 16 com Turborepo; estado entre zonas por cookie no mesmo domínio (`README.md:13`, `72`); zona que faz proxy de um site externo (Duda) com tema de marca comum às três zonas (`packages/ui/src/dudaBrandTheme.ts`).
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

1. **Composição por zonas:** Multi-Zones por `rewrites` e navegação de página inteira conta como mecanismo de composição para Q4? É a mesma pergunta pendente em 013, 199 e 237. Se contar, o caso fica `MFE-implemented`; se a composição só por rota não contar, vira `Non-MFE`. Não se propõe regra nova; até a decisão, preservar `review`.
