---
schema: 1
id: 1285891447
full_name: Ankamsudeep/BEZ
url: https://github.com/Ankamsudeep/BEZ
commit: f98478aeaa74562e53bd29040aec7126d560d500
classification: Non-MFE
checklist: { q1: yes, q2: no, q3: yes, q4: undetermined, q5: no }
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

# 347 — Ankamsudeep/BEZ

## Contexto

Monorepo npm com duas aplicações React/Vite, `bez` (app principal, base `/`) e `bookkeeping` (base `/bookkeeping/`), descrito como “BEZ Microfrontend Monorepo” (`README.md:1–9`). As duas são publicadas em caminhos distintos do mesmo domínio por CloudFront/S3 ou por um servidor Express local (`README.md:37–63`; `server.js:9–26`). A navegação entre elas é por mudança de URL. As apps importam código-fonte uma da outra por aliases de caminho. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:348` registra rank 347, ID 1285891447, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:348` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:32734` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:32742` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-07` | 2026-10-07T21:51:56.270Z / 2026-10-08T15:43:13.235Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-07` | 2026-10-07T22:13:42.967Z / 2026-10-08T15:50:15.909Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 15189, criação em 2026-07-01T08:37:39Z, push em 2026-07-01T08:43:26Z.

**Grafias:** “Microfrontend” em `README.md:1` (“# BEZ Microfrontend Monorepo”), que casa `microfrontend`. A forma plural `microfrontends` não aparece; esse hit depende do processamento textual da busca do GitHub, que não está registrado. As linhas `README.md:64–66` contêm “B E Z” com caracteres intercalados, resíduo de codificação UTF-16.

O README só existe no commit único, que é o SHA (2026-07-01T14:13:18+05:30, isto é, 08:43:18Z), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 743 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Raiz com `package.json` (workspaces `bez` e `bookkeeping`, `package.json:5–8`), `server.js`, `scripts/merge-dist.js` e configuração de testes; `bez/` e `bookkeeping/` com `package.json`, `vite.config`, `index.html`, `src/` e `tests/`. | contexto |
| Configuração (apps) | `bez/vite.config.js:6–14`: React, `base: "/"`, porta 3000. `bookkeeping/vite.config.ts:5–8`: React, `base: "/bookkeeping/"`, porta 3002. Builds Vite próprios (`bez/package.json:7–8`; `bookkeeping/package.json:7–8`). Nenhuma configuração de federação, single-spa ou import map. | moderada |
| Código-fonte (fronteiras) | Busca ativa de imports cruzados: `bez/vite.config.js:19` define o alias `@bookkeeping` → `../bookkeeping/src`, e `bez/tsconfig.json:21`, `:24` inclui os fontes de `bookkeeping`; `bez/src/AdminV2/components/AdminHeader.tsx:5` importa `AccountSettingsPanel` de `@bookkeeping/chat/components/AccountSettingsPanel`. No sentido inverso, `bookkeeping/vite.config.ts:12` define `@bez` → `../bez/src`; `bookkeeping/src/chat/components/ChatHeader.tsx:4` importa `SupportForm` de `@bez/AdminV2/…`; `bookkeeping/src/chat/css/chat.scss:4–6` usa três folhas de estilo de `@bez/…`. As apps compilam código-fonte uma da outra. | contrária |
| Composição (rota por caminho) | `server.js:9–26`: Express serve `bookkeeping/dist` em `/bookkeeping` e `bez/dist` em `/`, cada um com fallback SPA. `README.md:41–63`: o mesmo arranjo por S3 e regras de comportamento do CloudFront. `scripts/merge-dist.js:12–16`: copia os dois `dist` para uma pasta única. | ambígua |
| Código-fonte (navegação) | `bez/src/AdminV2/components/AdminHeader.tsx:196–197` e `bez/src/Auth0/components/LoginPage.tsx:141–142`: `window.location.href = "/bookkeeping/chat"`; `bez/src/SecureGeneralLLM/components/Header.jsx:647`: link para `/bookkeeping/chat`. A ligação entre as apps é por navegação de página inteira. | ambígua |

## Autoria e histórico

Clone não raso. Há 1 commit (1 em todos os refs), sem merges: `f98478a` (2026-07-01T14:13:18+05:30), autor e committer `Sudeep <sudeepankam003@gmail.com>`, “first commit”, que adiciona tudo em bloco. `bookkeeping/CLAUDE.md` indica uso de assistente de código; os metadados não separam autoria intelectual. `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas aplicações identificáveis, `bez` e `bookkeeping`, com entry, `index.html` e configuração Vite próprios (`bez/vite.config.js:6–14`; `bookkeeping/vite.config.ts:5–8`). |
| Q2 | No | Pelo critério literal (“units do not import each other's source code directly”), as apps importam código-fonte uma da outra nos dois sentidos (`bez/src/AdminV2/components/AdminHeader.tsx:5`; `bookkeeping/src/chat/components/ChatHeader.tsx:4`; `bookkeeping/src/chat/css/chat.scss:4–6`), com aliases que apontam para a pasta da outra (`bez/vite.config.js:19`; `bookkeeping/vite.config.ts:12`). |
| Q3 | Yes | O servidor e a configuração de CDN roteiam as duas apps no mesmo domínio por caminho (`server.js:9–26`; `README.md:50–53`), e a app principal leva à outra por navegação (`AdminHeader.tsx:196–197`). |
| Q4 | Undetermined | A ligação é só roteamento por caminho e navegação de página inteira. Se isso conta como mecanismo de composição é decisão aberta do checklist (“Link-only… composition”). |
| Q5 | No | Com Q2 No, a regra geral dá Non-MFE em qualquer resposta para Q4. |

## Motivo

- `Non-MFE` pela regra “at least one question is No” (Q2).
- O acoplamento por código-fonte, com aliases cruzados e imports nos dois sentidos, contraria a independência exigida pelo critério literal de Q2, como na proposta da revisão de 104.
- A classe independe da decisão aberta sobre composição só por links ou rotas (Q4).
- Não é cadeia completa (076/084/096/106/109): não há mecanismo de carregamento de unidades em runtime.
- Diferente do shell por `rewrites` de 013: aqui não há shell que componha, só um servidor de estáticos com dois prefixos de caminho.
- `frontend_units: 2`, `unit_organization: monorepo`, `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: []` (Non-MFE). `repo_type: production`: produto com autenticação Auth0, integrações OAuth, RUM da AWS (`bez/package.json:21`) e deploy em S3/CloudFront.
- Não há decisão aberta que altere a classe.

## Notas para análise

- **RQ1 (sinais enganosos):** “Microfrontend Monorepo” (`README.md:1`) e o nome do pacote raiz `bez_microfrontend` (`package.json:2`) descrevem duas SPAs servidas em caminhos distintos que compartilham fontes por alias; o rótulo não corresponde a independência de unidades.
- **RQ3:** acoplamento bidirecional por aliases de caminho (`@bookkeeping`, `@bez`) é um padrão a observar em monorepos que se dizem micro-frontends. A busca de `../` não o detecta, porque os imports usam alias.
- **Checklist:** caso de “link-only composition” combinado com acoplamento de fontes. A segunda característica resolve a classe sem decidir a primeira.
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
