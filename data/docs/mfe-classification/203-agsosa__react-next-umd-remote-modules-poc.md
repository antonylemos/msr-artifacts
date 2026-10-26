---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
url: https://github.com/agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [runtime-script]
ui_technologies: [react, next]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Contexto

“UMD-based Microfrontends PoC” (`README.md:1–17`): duas aplicações Next.js 15 / React 19, `shell` e `mf-1`. O `mf-1` roda como app próprio (porta 3001) e, além disso, compila com Vite três componentes (`Header`, `Fulfilment`, `FulfilmentDetails`) num bundle UMD servido em `/remote-modules/bundle.js`. O `shell` carrega esse bundle em runtime por `<script>` e renderiza os componentes a partir de `window.MF1_RemoteModules`. O README declara que a solução “not Module Federation” (`README.md:12`) e a apresenta como “remote component sharing” (`README.md:3`, `138`). Há deploy na Vercel indicado no README (`README.md:7–8`) e nos metadados (homepage). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:204` registra rank 203, ID 1027727587, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:204` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16998` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17002` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:41:46.312Z / 2026-10-08T15:38:37.705Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:08:19.765Z / 2026-10-08T15:47:35.096Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:18:44.074Z / 2026-10-08T16:15:15.681Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 258;
- criação em 2025-07-28T12:50:25Z, push em 2025-07-29T00:02:39Z;
- homepage `react-next-umd-remote-modules-poc-s.vercel.app`.

Grafias no README:
- “microfrontend”: `README.md:125` (“Each microfrontend can be developed independently”), também em `132` e `138`;
- “microfrontends”: `README.md:3` (“implementation of microfrontends using UMD”); “Microfrontends” em `1` e `12`;
- “Module Federation”: `README.md:3` (“similar to Module Federation”), `12` (“not Module Federation”) e `138`.

O hit de `"module federation"` vem de menções que contrastam a solução com Module Federation; não há Module Federation no código.

A última alteração do README é `ed8c864` (2025-07-28), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 50 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há dois projetos com `package.json`, `package-lock.json`, `next.config` e `src/` próprios (`shell/`, `mf-1/`), sem workspace na raiz. `mf-1/public/remote-modules/bundle.js` (123 KB) é o bundle UMD gerado, versionado. `shell/src/data/orders.ts` e `mf-1/src/data/orders.ts` são o mesmo blob (`64c31a3`), uma cópia e não um import. | contexto |
| Configuração (produtor) | `mf-1/vite.mf.ts:27–47`: entrada `src/RemoteModules/RemoteModules.ts`, `format: "umd"`, `name: "MF1_RemoteModules"`, `entryFileNames: "bundle.js"`, `outDir: "public/remote-modules"`, `react`/`react-dom` externos como globais. `mf-1/package.json:6–12`: `build` = `build:vite && next build`; `dev` roda Next e Vite em watch. `mf-1/src/RemoteModules/RemoteModules.ts:1–10` exporta os três componentes envoltos em `withProviders`. `mf-1/next.config.ts:9–23`: `Cache-Control` para `/remote-modules/:path*` em produção. | forte |
| Configuração (consumidor) | `shell/next.config.js:7–9`: `publicRuntimeConfig.MF1_BASE_URL` = `process.env.MF1_BASE_URL \|\| 'http://localhost:3001'`. | forte |
| Código-fonte (composição) | `shell/src/hooks/useRemoteModule.ts:35–37`, `79–99`: publica `React`/`ReactDOM` em `window`, injeta `<script src=url>` e lê `window[moduleName][componentName]`. `shell/src/components/RemoteHeader.tsx:14–22`, `37` e `RemoteFulfilment.tsx:29–33`, `64–69` carregam `MF1_BASE_URL + "/remote-modules/bundle.js"` e renderizam o componente com props e callbacks. São usados em `shell/src/pages/fulfilment.tsx:29–33`, `index.tsx:178` e `orders/[id].tsx:273`, `289`, `410`. `shell/src/types/mf1-remote-components.d.ts:3–29` define o contrato. | forte |
| Código-fonte (fronteiras) | Busca por `../..`, `mf-1/` e `shell/` em `shell/src`, `mf-1/src` e nas configurações: só imports internos de `shell/src/pages/orders/[id].tsx:4–6` (`../../data`, `../../components`). Nenhum import cruza de `shell/` para `mf-1/` ou o contrário. O `mf-1` usa os mesmos componentes localmente (`mf-1/src/pages/fulfilment.tsx:3–4`; `index.tsx:3–4`). | contexto |
| Natureza do que é exposto | `Header` é um cabeçalho comum (2,8 KB). `Fulfilment` (`mf-1/src/RemoteModules/Fulfilment.tsx:155–363`) é uma tela de processamento de pedidos com estado próprio (`useState(mockOrders)`, `:157`). `FulfilmentDetails` é o detalhe de pedido. O README descreve o objetivo como compartilhamento de componentes (`README.md:3`, `126`, `138`). | ambígua |

## Autoria e histórico

Clone não raso; 17 commits lineares, nenhum merge, todos de Alejandro Sosa `<aleej.gs@gmail.com>` em 2025-07-28. A raiz é `6d2fa15` (“Initial commit”), seguida de `b50998d` (“Init”), vários “wip” e ajustes: `77ded93` (“Add env var for remote urls”), `500c3c4` (“Add cache control to mf1 production builds”), `03aa81d` (“Create README.md”) e `ed8c864` (“Add styled components theme, update readme, cleanup”). O SHA `130ddb6` (“Delete settings.local.json”) só remove `.claude/settings.local.json`; esse blob não foi lido. Comentários em espanhol (`mf-1/vite.mf.ts:8–9`, `35`, `39`) mencionam coordenação entre equipes e pods Kubernetes, sem artefato de deploy correspondente no repositório.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades no repositório (`shell/`, `mf-1/`); a URL do bundle de `mf-1` é configurada no shell (`shell/next.config.js:7–9`). |
| Q2 | Yes | Cada unidade tem entrada, `package.json` e build próprios (`mf-1/package.json:6–12`; `shell/package.json:5–9`). Não há import de código-fonte entre elas; a ligação é pelo bundle servido. |
| Q3 | Yes | O shell renderiza os componentes remotos em suas páginas (`shell/src/pages/fulfilment.tsx:29–33`; `orders/[id].tsx:410`). |
| Q4 | Yes | Mecanismo de carga por `<script>` em runtime configurado nos dois lados (`mf-1/vite.mf.ts:27–47`; `shell/src/hooks/useRemoteModule.ts:79–99`) e consumido. Não é link nem iframe. |
| Q5 | Yes | Além do cabeçalho reutilizável, o bundle remoto fornece telas de fulfillment e de detalhe de pedido, com estado próprio, renderizadas como conteúdo das páginas do shell. Isso constitui composição de unidades frontend, não apenas compartilhamento de código. |

## Motivo

- Classificado como `MFE-implemented`: o shell carrega e compõe em runtime uma unidade externa que fornece telas de domínio completas, além de um componente de cabeçalho.
- **Mecanismo:** é o de 002 (`runtime-script`, final `MFE-implemented`): bundle gerado por Vite, carregado por `<script>` e lido de um global. Lá, porém, o remoto expunha `mount`/`unmount` de um widget próprio. Aqui são componentes React que dependem do React do host (`external`, `README.md:39–43`), recebem `router` e callbacks do shell (`RemoteHeader.tsx:37`) e também são usados localmente pelo `mf-1`.
- **Composição ou compartilhamento:** `Fulfilment` e `FulfilmentDetails` são telas de domínio com estado próprio e ocupam o conteúdo de rotas do shell, o que se aproxima de composição. `Header` é um componente de layout reutilizado, o que se aproxima de compartilhamento. Em 089/100 essa mesma fronteira deixou Q5 Undetermined.
- **Campos:** `approaches: [runtime-script]` (slug do template, primeiro caso 002), `ui_technologies: [react, next]`, `build_tools: [vite]` (o bundle remoto é feito pelo Vite; o Next segue a convenção de 199), `frontend_units: 2`, `unit_organization: monorepo` (dois projetos num repositório, sem workspace), `repo_type: example` (PoC declarada, `README.md:1`; `mf-1/next.config.ts:25`).

## Notas para análise

- **RQ2:** UMD gerado por Vite a partir de uma aplicação Next.js, servido pelo `public/` dela e carregado no host com React exposto em `window`. O roteador é passado por props porque `useRouter` não funciona no remoto (`README.md:102–110`).
- **RQ1 (sinais enganosos):** o hit de `"module federation"` vem de frases que negam o uso de Module Federation (`README.md:3`, `12`, `138`).
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Promovido para `MFE-implemented`. `mf-1` produz um bundle UMD que o `shell` carrega em runtime e usa para compor telas completas de fulfillment e detalhe de pedidos. Embora também exponha um cabeçalho reutilizável, as telas remotas com estado próprio demonstram composição de unidades frontend.
