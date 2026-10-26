---
schema: 1
id: 1163740306
full_name: bluetorch/mtsynergy-platform-design-system
url: https://github.com/bluetorch/mtsynergy-platform-design-system
commit: 083c31698fea69c741812937fba32b63bc7a8ffa
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: [tsup]
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 296 — bluetorch/mtsynergy-platform-design-system

## Contexto

- **Tipo de repositório:** biblioteca de componentes React (design system) publicada como pacote npm `@mtsynergy/platform-design-system` (`package.json:3–5`), com tokens, preset Tailwind, CSS compilado e Storybook (`README.md:1–12`). Segundo o README, é consumida por um shell e por micro-frontends mantidos em outros repositórios (`README.md:571–593`, `659–665`), nenhum deles presente no snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:297` registra rank 296, ID 1163740306, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:297` registra as estratégias `terminology;broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25249` (`terminology;broader`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:25256` (`terminology;broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-02` | `… pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:32:05.378Z / 2026-10-08T15:58:08.819Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-02` | `… pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T23:00:40.387Z / 2026-10-08T16:08:10.841Z |
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q1` | `… pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:49:49.455Z / 2026-10-08T16:27:03.230Z |

Metadados do hit: descrição “The React Component Library — UI Components, Tailwind Tokens, Storybook for MTSynergy” (sem os termos), sem tópicos, linguagem TypeScript, Apache-2.0, `fork: false`, tamanho 410, criação em 2026-02-22T04:14:33Z, push em 2026-02-23T08:40:37Z.

Correspondência no README:
- “micro frontend”: `README.md:466` (“### Micro-Frontend Considerations”) e `README.md:468` (“For Micro-Frontend (MFE) architectures”), com hífen tratado como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.
- “micro apps” + “frontend”: `README.md:472` (“Consumer micro-apps”) e, no singular, `README.md:470` (“each micro-app”); “frontend” ocorre em `README.md:466`/`468`.

A última alteração alcançável do README é o próprio SHA `083c316` (2026-02-23), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 219 entradas, 216 arquivos regulares `100644`, 2 executáveis `100755` (`.husky/pre-commit`, `scripts/build-css.mjs`), 1 symlink `120000` (`SPECIFICATION.md` → caminho absoluto local `/Users/bholt/dev/mtsynergy/SPECIFICATION.md`, inexistente no repositório) e zero gitlinks. Um único pacote: `package.json`, `src/` (10 componentes com stories e testes, tema, tokens), `.storybook/`, `scripts/` e 85 PNG de referência do Loki armazenados como ponteiros Git LFS (`.gitattributes:2`). | contrária |
| Configuração (pacote) | `package.json:6–30`: `main`/`module`/`types` e `exports` (`.`, `./tokens`, `./tailwind-preset`, `./tokens.json`, `./styles.css`); `:52–55`: React como `peerDependencies`; `:109–111`: publicação em registry npm interno. `tsup.config.ts:3–9`: build de biblioteca (CJS/ESM + d.ts) a partir de `src/index.ts`, `src/tokens/index.ts` e `src/tailwind.preset.ts`. | contrária |
| Código-fonte | `src/index.ts:1–19`: só reexporta componentes (`Button`, `Input`, `Modal`, …), `ThemeProvider`/`useTheme` e utilitários de tema; por exemplo, `src/components/Button.tsx:3–12` define um componente de apresentação. Não há entrada de aplicação, montagem em DOM, rotas nem lifecycles. | contrária |
| Código-fonte (fronteiras) | Busca por especificadores `../`: só dentro do próprio pacote (`src/theme/web/*.ts` → `src/theme/types`; `scripts/generate-tailwind-config.ts:10–12` → `src/`; `.storybook/main.ts:4`, `.storybook/preview.ts:3`). Como há um único pacote, não há fronteira entre unidades a atravessar. | contexto |
| Documentação (MFE) | `README.md:466–490`: recomenda carregar o CSS uma vez no host e mostra um `HostShell` com `<MicroApp1 />` e `<MicroApp2 />` como exemplo em bloco de código; `README.md:571–593`: distribuição via CDN e import map no “platform-shell”; `README.md:659–665`: projetos relacionados `platform-shell`, `platform-mfe-publishing`, `platform-mfe-inbox`, `platform-mfe-reporting`, fora do repositório. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto Markdown e `package-lock.json`, por `federation`, `single.?spa`, `remoteEntry`, `importmap`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `systemjs`, `registerApplication`, `bootstrap` e `mount`: nenhuma ocorrência. O import map só existe como exemplo no README. | ausente |
| Build/deploy | `.onedev-buildspec.yml:3–66`: CI com lint, formatação, testes, `npm run build` e build do Storybook; `:75–105`: job “Publish” com `npm publish` no registry interno (`:105`). Nenhuma etapa de deploy de aplicação. | contexto |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 18 commits alcançáveis (18 em todos os refs), nenhum merge, raiz `c078f8f` (2026-02-21, “Initial commit”) e SHA `083c316` (2026-02-23, “feat(DS-1005): implement complete theming solution with compiled CSS”). Autoria: Bruce Holt com dois e-mails, `bruce.holt@spaceiq.com` (17 commits locais) e `bjholt@gmail.com` (1, pela interface web). Os arquivos `.github/agents/riper.agent.md`, `.github/prompts/*` e `.github/memory-bank/**` (planos e revisões por feature DS-1001 a DS-1005) indicam uso de assistente de código; os metadados não separam autoria intelectual. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 40 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: o único pacote é uma biblioteca de componentes sem entrada de aplicação (`src/index.ts:1–19`; `tsup.config.ts:3–9`); nenhuma configuração de composição no repositório referencia unidades externas (busca registrada). O shell e os MFEs aparecem só no README. |
| Q2 | No | Não há unidades a avaliar. |
| Q3 | No | Não há host, shell nem root config no repositório; o `HostShell` é exemplo de documentação (`README.md:476–490`). |
| Q4 | No | Nenhum mecanismo de composição configurado; o import map é descrito no README (`README.md:573–583`), não versionado como configuração. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “component libraries” e, por analogia, a “MFE frameworks and libraries”: é uma dependência compartilhada de um ecossistema MFE, não uma unidade composta nem um host.
- Não é `MFE-unit`: o pacote não está preparado para ser montado como unidade por um host (sem `exposes`, lifecycles, bundle SystemJS ou entrada de aplicação); o import map citado distribui a biblioteca como dependência compartilhada, o que se aproxima de code sharing (089/100), não de composição.
- Não há unidade de terceiros composta (102/074/080) nem cadeia a avaliar (097/103/104; 076/084/096/106/109).
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `ui_technologies: [react]`, `build_tools: [tsup]` (`tsup.config.ts`; Storybook usa Vite apenas para documentação, `.storybook/main.ts:11–14`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** design system de um ecossistema MFE com seção “Micro-Frontend Considerations” e exemplo de `HostShell` no README; o vocabulário MFE vem da documentação de consumo, não de artefatos de composição.
- **RQ3:** distribuição de biblioteca compartilhada por CDN e import map no shell (`README.md:571–593`) é um padrão de compartilhamento de dependência em MFE; se repositórios irmãos (`platform-shell`, `platform-mfe-*`) existirem nas rodadas, a família poderia mostrar a composição. Busca por `bluetorch/` em `data/discovery/mfe-round-002/candidates.csv` encontrou só este repositório (`:25256`).
- **Protocolo:** o symlink `SPECIFICATION.md` aponta a um caminho absoluto da máquina do autor; o conteúdo da especificação não está no repositório.
