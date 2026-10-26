---
schema: 1
id: 1165865529
full_name: adraw-dev/angular-elements-ssr
url: https://github.com/adraw-dev/angular-elements-ssr
commit: b9b6dfc7e74bfafd8c934c33515c6294f2b4f795
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 256 — adraw-dev/angular-elements-ssr

## Contexto

Demonstração em Next.js 16 / React 19 de como usar Web Components de um sistema de design (Angular Elements `siste-ui-button` e `siste-ui-text-field`) com estratégias SSR, híbrida e client-only (`README.md:1–16`). Os componentes não estão no repositório: são carregados em runtime de um CDN externo (`app/hooks/useDesignSystem.ts:3–4`, `:64–70`). O caminho desse CDN contém o segmento `micro-frontends/desing-lib`, que é a única ocorrência do termo. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:257` registra rank 256, ID 1165865529, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede (o CDN não foi consultado).

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:257` registra as estratégias `terminology;technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25375` e `data/discovery/mfe-round-002/candidates.csv:25382`, ambos com `terminology;technology` e `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T22:32:05.378Z / 2026-10-08T15:58:08.819Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T23:00:40.387Z / 2026-10-08T16:08:10.841Z |
| `technology-web-components-mfe-repositories`: `"web components" "micro frontends" in:readme` | sem partição (mesmo id da consulta) | 2026-10-07T23:37:09.864Z / 2026-10-08T16:22:11.019Z |

As subconsultas `#created:2026-02` acrescentam `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`; a de web components acrescenta `pushed:>=2025-04-01`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 77, homepage `https://angular-elements-ssr.vercel.app`, criação em 2026-02-24T16:20:27Z, push em 2026-02-24T16:25:15Z.

Sem descrição, o acerto vem do README:
- **“micro frontends”:** só dentro da URL do CDN em `README.md:93` (`…/frontend/micro-frontends/desing-lib/beta-1.0.0`); hífen e barras funcionam como separadores.
- **“micro frontend”:** não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.
- **“web components”:** `README.md:3`, `:9`, `:88`, entre outras.

O README foi alterado pela última vez no SHA (2026-02-24T11:24:10-05:00, isto é, 16:24:10Z), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 26 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Next.js com App Router: `package.json`, `next.config.ts`, `app/` (páginas `/`, `/demo`, `/ssr`, `/client-only`, wrappers, hook, tipos) e `public/`. | contrária |
| Configuração / Build | `package.json:5–16`: scripts `next dev/build/start` e dependências Next, React, React DOM e react-hook-form. `next.config.ts:3–5`: configuração vazia. Nenhum pacote de federação ou de Angular. | contrária |
| Código-fonte (carga dos Web Components) | `app/hooks/useDesignSystem.ts:3–4`: `CDN_BASE` em `https://stoconopmercurio.blob.core.windows.net/frontend/micro-frontends/desing-lib/beta-1.0.0`; `:31–41`, `:64–70`: injeta `siste-ui-elements.css`, `polyfills.js` e `main.js` desse CDN. Usado por `app/demo/components-demo.tsx:7`, `:15` e `app/client-only/page.tsx:8`, `:17`. | ambígua |
| Código-fonte (uso) | `app/components/Button.tsx:43–55` e `app/components/text-field.tsx:86–105`: wrappers React que renderizam `<siste-ui-button>` e `<siste-ui-text-field>` e escutam eventos (`clickButton`, `input`, `iconRightClick`). `app/vite-env.d.ts:10–100`: tipos JSX para esses e outros elementos `siste-*` (select, checkbox, modal etc.). Os elementos são controles de formulário de um sistema de design, não aplicações. | contrária |
| Código-fonte (fronteiras) | Busca ativa de imports relativos em `app/`: só `../components/*` e `../hooks/useDesignSystem` dentro do mesmo projeto (por exemplo, `app/client-only/page.tsx:6–8`). | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile e README, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` e `registerApplication`: só a URL do CDN em `useDesignSystem.ts:4`. Nenhum `customElements.define` próprio, nenhuma unidade remota além do pacote de componentes. | ausente |
| Documentação | `README.md:88–98`: “Los Web Components se cargan desde el CDN de Azure” e lista os dois componentes; `README.md:231–234`: Web Components como custom elements que exigem Client Components. Nenhuma menção a micro-frontends fora da URL. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 2 commits (2 em todos os refs), nenhum merge, ambos de `alejandro velez <alvelez@sistecredito.com>` como autor e committer:
- a raiz `a5b610c` (2026-02-24T11:22:13-05:00, “Initial commit: Next.js SSR demo with Angular Web Components”) adiciona o projeto em bloco;
- o SHA `b9b6dfc` (2026-02-24T11:24:10-05:00) atualiza o README.

O e-mail corporativo e o prefixo `siste-` dos elementos sugerem que o sistema de design pertence à organização do autor, mas o repositório não contém o código Angular nem sua configuração; nada sobre ele é afirmado além da URL e dos nomes de elementos.

`git rev-list --objects $SHA --missing=print` lista 1 objeto ausente, que não está na árvore do SHA (a versão anterior do README). Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, a app Next.js (`package.json:5–10`). O pacote carregado do CDN (`useDesignSystem.ts:64–70`) fornece controles de formulário de um sistema de design (`Button.tsx:43–55`; `text-field.tsx:86–105`), não uma unidade frontend referenciada por configuração de composição. |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | A app não carrega, monta nem roteia outra unidade; usa componentes de UI dentro das próprias páginas. |
| Q4 | No | Não há mecanismo de composição de unidades: a injeção de script carrega uma biblioteca de Web Components. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “component libraries using Web Components”, aqui do lado consumidor: a app usa botões e campos de um sistema de design publicado como custom elements. Também se enquadra em “conventional frontend monoliths”.
- Comparável a 042 (biblioteca de Web Components compartilhada classificada como Non-MFE) e 044 (custom elements como componentes internos).
- O termo “micro-frontends” só aparece no caminho de armazenamento do CDN; não descreve a arquitetura do repositório.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`. `build_tools: []`: Next.js encapsula o bundler e não há configuração explícita (`next.config.ts:3–5`). `vite-env.d.ts` é só um arquivo de tipos com referência a `vite/client`, sem Vite instalado. `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** o termo da busca vem de um caminho de URL (`…/micro-frontends/desing-lib/…`, `README.md:93`; `useDesignSystem.ts:4`), não de texto sobre a arquitetura. Pastas de armazenamento com nomes como `micro-frontends` podem conter só bibliotecas compartilhadas.
- **RQ1:** carregar Web Components de um sistema de design por `<script type="module">` em runtime tem a mesma forma técnica de uma composição por script, mas o artefato carregado é uma biblioteca de controles.
- **Protocolo (busca):** o hit singular não tem grafia literal; a elegibilidade permanece `unknown` nas duas rodadas.
