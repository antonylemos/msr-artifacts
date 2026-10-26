---
schema: 1
id: 1041317348
full_name: MyMicroFrontend/next-home
url: https://github.com/MyMicroFrontend/next-home
commit: 542acbd89f7c5c3a4118f4dfe00c820659b2b8ee
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 199 — MyMicroFrontend/next-home

## Contexto

Aplicação Next.js 15 de loja (home, produtos, detalhe, carrinho em Redux), descrita como “Nextjs micro-frontend home application” (metadados do hit) e “Shopping app with micro-frontend” (`src/app/layout.tsx:16`). O `next.config.ts` reescreve `/cart` e `/cart/:path+` para `${process.env.CART_DOMAIN}/cart` (`next.config.ts:8–13`), padrão Multi-Zones do Next.js: a página de carrinho seria servida por outra aplicação. O botão do cabeçalho leva a `/cart` por link comum (`src/components/layout/header/cart-btn.tsx:10`). A aplicação de carrinho não está no repositório, e `CART_DOMAIN` não está definido no snapshot (`.gitignore:34` ignora `.env*`). O README é o padrão do `create-next-app`. O nome do repositório e o da organização não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:200` registra rank 199, ID 1041317348, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:200` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17859` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17864` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:15.889Z / 2026-10-08T15:55:18.725Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:50.710Z / 2026-10-08T16:06:21.351Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Metadados do hit:
- descrição “Nextjs micro-frontend home application”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 89;
- criação em 2025-08-20T10:02:38Z, push em 2025-08-24T22:53:50Z;
- homepage `next-home-seven.vercel.app`.

O acerto vem da descrição, que contém “micro-frontend”; a busca de frase trata o hífen como separador. O README (padrão do `create-next-app`, `README.md:1–36`) não menciona micro-frontends. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. O README vem do commit-raiz `116f535` (2025-08-20) e não foi alterado depois.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 45 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Next.js (App Router: `src/app/(main)`, `src/app/products`, componentes, containers, stores Redux) e um `Dockerfile` (bun). Não há aplicação de carrinho. | contexto |
| Configuração (composição por rota) | `next.config.ts:8–13`: `rewrites()` com `{ source: '/cart', destination: \`${process.env.CART_DOMAIN}/cart\` }` e `{ source: '/cart/:path+', … }`. É composição por zonas: o host encaminha um prefixo de rota para outra aplicação implantada separadamente. | forte |
| Configuração (localização da unidade) | `CART_DOMAIN` não tem valor no snapshot: não há `.env*` versionado (`.gitignore:34`), e nenhum outro arquivo define a variável. A busca por `CART_DOMAIN` acha só `next.config.ts`. | ambígua |
| Código-fonte (navegação) | `src/components/layout/header/cart-btn.tsx:10`: `<a href="/cart">`, navegação de página inteira para a zona de carrinho. O estado do carrinho é guardado em cookie `httpOnly` (`src/utils/cookie-storage.ts:5–13`), o que permitiria compartilhamento com outra zona no mesmo domínio, sem evidência do consumidor. | moderada |
| Código-fonte (fronteiras) | Imports por alias `@/` dentro de `src`; a busca por `../../` não retorna nada. Não há código da unidade de carrinho. | contexto |
| Busca | `git grep -i` no SHA (exceto lockfile) por `micro.?front`, `federation`, `remoteEntry`, `zones`, `basePath` e `assetPrefix`: só `src/app/layout.tsx:16` e a `rewrites` citada. | contexto |

## Autoria e histórico

Clone não raso; 13 commits, 1 merge, de Yusuf Akkurt (`ysfakkurt@hotmail.com` e noreply), de 2025-08-20 (`116f535`, “Initial commit from Create Next App”) a 2025-08-25 (SHA `542acbd`, merge do PR #1 de `dev/1.0.0`). O branch `origin/dev/1.0.0` não foi considerado. A organização contém só este repositório na amostra (`sample.csv`). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades: o host e a aplicação de carrinho, explicitamente referenciada pela configuração de composição por rota (`next.config.ts:8–13`). |
| Q2 | Yes | O host tem build próprio (`package.json:5–8`; `Dockerfile`). A unidade de carrinho é implantada separadamente (domínio próprio em `CART_DOMAIN`), sem import de código-fonte. |
| Q3 | Yes | O host roteia `/cart` para a unidade, que participa da mesma aplicação sob o mesmo caminho (`next.config.ts:10–11`; `cart-btn.tsx:10`). |
| Q4 | Undetermined | O mecanismo (rewrites de Multi-Zones) está configurado, mas a localização da unidade depende de `CART_DOMAIN`, ausente do repositório. Pelo critério, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | Nenhuma resposta No e Q4 Undetermined. |

## Motivo

- `Uncertain` pela regra “No question is No, but at least one is Undetermined”, com `status: review`.
- **Mecanismo:** é o de 013 (`multi-zones`, `MFE-implemented`/review). Lá o host e as zonas estavam no snapshot; aqui só o host, com a zona de carrinho externa, como no caso de host que referencia unidades externas (008/040/087).
- **Localização da unidade:** é a questão de 145, em que a URL da unidade vinha só de variável de ambiente não definida, sem valor padrão nem documentação.
- **Mecanismo de rota:** a composição por rewrites e navegação de página inteira se aproxima da decisão aberta “Link-only or iframe composition”. Diferentemente de um link solto, porém, o host reserva o prefixo `/cart` e encaminha as requisições.
- **Campos:** `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (convenção Next), `frontend_units: 2` (host e carrinho), `unit_organization: multi-repo`, `repo_type: example` (loja de demonstração com dados de `fakestoreapi.com`, `next.config.ts:5–7`).

## Notas para análise

- **RQ2:** Next.js Multi-Zones por `rewrites` para outra aplicação, com estado do carrinho em cookie e navegação por link de página inteira.
- **RQ1 (sinais enganosos):** o README é o padrão do `create-next-app`; o sinal de MFE está na descrição e na configuração.
- **Protocolo (busca):** o hit plural não tem grafia literal; a descrição traz “micro-frontend”. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Mantido como `Uncertain`. O host implementa a composição por rota com rewrites de Multi-Zones, mas a localização da zona de carrinho depende de `CART_DOMAIN`, que não é definido nem documentado no snapshot. Portanto, o uso efetivo da configuração externa permanece não verificável.
