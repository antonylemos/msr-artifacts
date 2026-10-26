---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
url: https://github.com/kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
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

# 381 — kamulupraneeth/nextjs-mfe-platform

## Contexto

Plataforma de demonstração em Next.js 16 Multi-Zones (`README.md:1–10`, decodificado de UTF-16). Tem três aplicações Next.js independentes:
- `host-shell` (porta 3000), com navegação global;
- `analytics-dashboard` (3001, `basePath: '/analytics'`);
- `workspace-document` (3002, `basePath: '/workspace'`).

O shell faz `rewrites` das rotas e dos assets de cada zona para os servidores correspondentes, e a navegação entre zonas usa `<a>` com recarga completa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:382` registra rank 381, ID 1254311775, status `cloned`, branch `main`, o commit do front matter, que é o HEAD do clone e de `origin/main`, e `replaces` = `979558095`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

O candidato não está em `sample.csv`. Entrou como substituto do rank 259 (`979558095`, `surendra190/microfrontend`), cujo clone falhou (`data/samples/mfe-sample-001/clones.csv:260`, status `failed`). A posição dele no ranking é `data/samples/mfe-sample-001/ranking.csv:382` (rank 381, estratégia `terminology`, elegibilidade `pass`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30961` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30969` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-05` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:35:41.883Z / 2026-10-08T15:59:28.928Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:04:12.402Z / 2026-10-08T16:09:04.849Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 231;
- criação em 2026-05-30T12:09:58Z, push em 2026-05-31T15:16:03Z.

O `README.md` da raiz está em UTF-16 LE (com BOM). Decodificado, traz “Micro-Frontend” em `README.md:1` e “micro-frontend” em `:3` e `:7`; o plural não aparece. Como o GitHub indexa um arquivo UTF-16 não está registrado, assim como o processamento textual da busca. A última alteração do README é `c201365` (2026-05-31), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 67 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três apps Next.js (`host-shell`, `analytics-dashboard`, `workspace-document`), cada uma com `package.json`, lockfile, `next.config.ts` e `src/`, além do README da raiz. | contexto |
| Composição (shell) | `host-shell/next.config.ts:3–6`, `10–48`: `rewrites` (`beforeFiles`) de `/analytics`, `/analytics/api/metrics`, `/analytics/:path` e `/analytics-assets/_next/:path*` para `ANALYTICS_URL` (`http://localhost:3001` por padrão). O mesmo vale para `/workspace`, `/workspace/:path*` e `/workspace-assets/_next/:path*` → `WORKSPACE_URL` (3002). | forte |
| Zonas | `analytics-dashboard/next.config.ts:5–6`: `basePath: '/analytics'`, `assetPrefix: '/analytics-assets'`. `workspace-document/next.config.ts:5–7`: `basePath: '/workspace'`, `assetPrefix: '/workspace-assets'`. Portas em `*/package.json:6` (3000, 3001, 3002). | forte |
| Navegação | `host-shell/src/components/GlobalNavbar.tsx:10–14`, `40–52`: links `<a href>` para `/`, `/analytics` e `/workspace` (comentário `:37–39` sobre trocar `Link` por `<a>`). | moderada |
| Código-fonte (fronteiras) | Busca por imports com `../../` no SHA: nenhum. Cada app só importa os próprios arquivos e pacotes; não há pacote compartilhado. | contexto |

## Autoria e histórico

Clone não raso; 16 commits em todos os refs, 4 merges de PR feitos na interface do GitHub, de 2026-05-30 (`1dedac6`, “feat(analytics): engineer multi-zone app router architecture…”) a 2026-05-31 (SHA `750571a`). O autor aparece como “Kamulu Praneeth”, “Praneeth-Kamulu” e `kamulupraneeth`. Há cinco branches `feature/*`, não considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três apps Next.js, com as zonas referenciadas pelos `rewrites` do shell (`host-shell/next.config.ts:10–48`). |
| Q2 | Yes | Cada app tem `package.json`, `next.config.ts`, porta e build próprios, sem import de código entre apps. |
| Q3 | Yes | O shell roteia `/analytics` e `/workspace`, com assets, para as zonas sob uma origem. |
| Q4 | Yes | Multi-Zones: `rewrites` no shell e `basePath`/`assetPrefix` nas zonas, com navegação por `<a>`. É configuração explícita de composição, sujeita à decisão em aberto sobre composição só por rota ou link. |
| Q5 | Yes | Q1–Q4 Yes, com a mesma ressalva de 013. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”, com `status: review` pela decisão em aberto. Mesmo padrão de 013 (final, `review`), 237 e 273: shell com `rewrites`, zonas com `basePath`/`assetPrefix` e navegação de página inteira.
- **Campos:**
  - `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js sem bundler explícito, como em 013);
  - `frontend_units: 3`, `unit_organization: monorepo`;
  - `repo_type: example` (plataforma de demonstração com estudo de caso no README).

## Notas para análise

- **RQ2:** Multi-Zones do Next.js 16 com `assetPrefix` por zona para isolar os chunks e `rewrites` `beforeFiles` também para rotas de API da zona.
- **Protocolo (amostra):** candidato de substituição (`replaces` 979558095) após falha do clone do rank 259.
- **Protocolo (busca):** README em UTF-16 LE; o plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

1. **Composição por zonas:** Multi-Zones por `rewrites` e navegação de página inteira conta como mecanismo de composição para Q4? É a mesma pergunta pendente em 013, 199, 237 e 273. Se contar, o caso fica `MFE-implemented`; se a composição só por rota não contar, vira `Non-MFE`. Não se propõe regra nova; até a decisão, preservar `review`.
