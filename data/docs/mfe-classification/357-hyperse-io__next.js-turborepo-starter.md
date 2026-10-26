---
schema: 1
id: 836965517
full_name: hyperse-io/next.js-turborepo-starter
url: https://github.com/hyperse-io/next.js-turborepo-starter
commit: ef0bd28bb8b9b387b246603bdd0670ab250e520d
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 357 — hyperse-io/next.js-turborepo-starter

## Contexto

Starter de monorepo Next.js com Turborepo, Yarn 4, next-intl, Tailwind e ferramentas de qualidade (`README.md:1–23`). Tem duas aplicações Next.js independentes, `apps/web` (porta 4001) e `apps/docs` (porta 3001), e dois pacotes internos (`packages/core`, `packages/utils`). Micro-frontends aparecem só na seção final, que remete a outro repositório: “Multi Zones are an approach to micro-frontends…” com link para `hyperse-io/next.js-multi-zone-starter` (`README.md:72–76`). Neste repositório não há `rewrites`, `basePath` nem outra ligação entre as apps. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:358` registra rank 357, ID 836965517, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:358` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:9320` e `data/discovery/mfe-round-002/candidates.csv:9326`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2024-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:24.681Z / 2026-10-08T15:53:22.516Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:50:26.114Z / 2026-10-08T16:05:01.569Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2024-08-01..2024-08-31`.

Metadados do hit:
- descrição “Best practices on using Next.js in a TypeScript monorepo”;
- tópicos `hyperse`, `n`, `nexjts-starter`, `nextjs-monorepo`, `nextjs-turborepo`, linguagem TypeScript, `fork: false`, tamanho 3.736;
- criação em 2024-08-01T23:47:34Z, push em 2025-04-24T06:14:17Z.

A única grafia é “micro-frontends”, em `README.md:74`. O singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `564e3fc` (2024-08-02), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 122 entradas, 119 arquivos regulares `100644` e 3 executáveis `100755` (`.husky/commit-msg`, `.husky/pre-commit`, `.yarn/releases/yarn-4.9.1.cjs`); zero symlinks e zero gitlinks. Há `apps/web` (38 arquivos), `apps/docs` (21), `packages/core` (18), `packages/utils` (14), `turbo.json` e configs de qualidade. | contexto |
| Aplicações | `apps/web/next.config.mjs:1–65`: next-intl, bundle analyzer, svgr e env validado; sem `rewrites`, `basePath` ou `assetPrefix`. `apps/docs/next.config.mjs:1–4`: config vazia. Portas próprias em `apps/*/package.json` (`docs` 3001, `web` 4001). | contrária |
| Busca de mecanismos | `git grep` em `apps/` e `packages/` por `rewrites`, `basePath`, `assetPrefix`, `zones`, `federation`, `iframe` e `micro.?front`: nada. | ausente |
| Código-fonte (fronteiras) | Os imports com `../../` vão a configs da raiz (`lint-staged.common.mjs`) ou a arquivos da própria app (`apps/web/src/types.d/next-intl.d.ts:3` → `messages/en.json`). O código comum vem dos pacotes de workspace `@hyperse/core` e `@hyperse/utils` (`apps/*/package.json`). | contexto |
| Documentação | `README.md:72–76`: Multi-Zones citadas só como referência a outro starter; não há multi-zones aqui. | contrária |

## Autoria e histórico

Clone não raso:
- **Commits:** 11 em todos os refs, 1 merge, de 2024-08-02 a 2025-04-24 (SHA `ef0bd28`, “chore: update demo”).
- **Autores:** `tianyingchun` (9), “Yingchun Tian” (1, pela interface do GitHub) e `github-actions[bot]` (1).
- **Branches:** há também `origin/changeset-release/main`, não considerado.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas aplicações frontend identificáveis no repositório (`apps/web`, `apps/docs`). |
| Q2 | Yes | Cada app tem `package.json`, `next.config.mjs`, porta e build próprios, sem import de código entre apps. |
| Q3 | No | Nenhum host, shell ou configuração raiz carrega, monta ou roteia as apps. |
| Q4 | No | Nenhum mecanismo de composição configurado. Multi-Zones só citadas como referência externa (`README.md:72–76`). |
| Q5 | No | Duas aplicações independentes num monorepo, sem composição. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “monorepos containing several unrelated frontend applications”.
- Diferentemente de 013, 237 e 273 (multi-zones com `rewrites`), aqui não há nenhuma configuração de zonas.
- **Campos:** `approaches: []`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js sem bundler explícito, como em 013), `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: template` (starter declarado).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** link para outro starter de Multi-Zones descrito como “approach to micro-frontends” casa as consultas terminológicas.
- **Protocolo (amostra):** o starter de multi-zones citado (`hyperse-io/next.js-multi-zone-starter`) não aparece entre os candidatos da rodada 002. A mesma organização tem `hyperse-io/hps` nas rodadas, fora da amostra.
- **Protocolo (busca):** o hit singular não tem grafia literal. Elegibilidade `pass` nas duas rodadas.
