---
schema: 1
id: 617509606
full_name: acald-creator/module-federation-examples
url: https://github.com/acald-creator/module-federation-examples
commit: d81aa4f81ca09655bf54259d802c8be38b201dc9
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 244 — acald-creator/module-federation-examples

## Contexto

“A comprehensive collection of Module Federation patterns and implementations” (`README.md:1–16`). Na prática, o snapshot tem um único exemplo, `apps/nextjs-cra/`, sobre Module Federation com versões de React diferentes:
- `dashboard`, host Next.js 13 com `@module-federation/nextjs-mf`;
- `remote`, CRA com `react-app-rewired`, React 18, porta 8081;
- `cloud`, CRA com CRACO, React 17, porta 8082.

Também há `packages/performance-monitor` (biblioteca de métricas usada pelo host) e `scripts/benchmark.js`. Os dois remotos expõem só um componente `Button`, que o host mostra ao lado do próprio botão. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:245` registra rank 244, ID 617509606, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:245` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:5721` e `data/discovery/mfe-round-002/candidates.csv:5726`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:600..699` | `apps/nextjs-cra/dashboard/package.json` | 2026-10-07T18:20:45.384Z / 2026-10-08T15:36:05.759Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2023-03` (`created:2023-03-01..2023-03-31`) | — | 2026-10-07T23:15:46.527Z / 2026-10-08T16:13:03.022Z |

O `package.json` do `dashboard` tem 654 bytes e declara `"@module-federation/nextjs-mf": "^6.1.3"` (`:13`).

Metadados do hit de repositório:
- descrição “A comprehensive collection of Module Federation patterns and implementations.”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 762;
- criação em 2023-03-22T14:39:07Z, push em 2025-09-23T19:45:54Z.

Grafia “Module Federation” em `README.md:1`, `3` e `34`. A última alteração do README é `9847672` (2025-09-22), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 112 entradas, 111 arquivos regulares `100644` e 1 executável `100755` (`scripts/benchmark.js`); zero symlinks e zero gitlinks. Workspace pnpm/lerna (`pnpm-workspace.yaml:1–5`; `package.json:6–10`) com três apps em `apps/nextjs-cra/` e o pacote `packages/performance-monitor`. Há também `CLAUDE.md`. | contexto |
| Configuração (host) | `apps/nextjs-cra/dashboard/next.config.js:12–31`: `NextFederationPlugin({ name: 'dashboard', remotes: { remote: 'remote@http://localhost:8081/remote.js', cloud: 'cloud@http://localhost:8082/remote.js' }, exposes: './newReact', './newReactDOM', shared react com shareKey 'newReact' })`. | forte |
| Configuração (remoto `remote`) | `apps/nextjs-cra/remote/config-overrides.js:9–37`: `ModuleFederationPlugin({ name: "remote", filename: "remote.js", exposes: { "./Button": "./src/Button" } })`, aplicado pelo `react-app-rewired` (`package.json:21–22`, porta 8081). | forte |
| Configuração (remoto `cloud`) | `apps/nextjs-cra/cloud/craco.config.js:5`: `module.expots = {…}`, com erro de digitação; o objeto com o `ModuleFederationPlugin` não é exportado e o CRACO não o recebe. Além disso, a chave exposta é `"./CloudButton"` (`:28–30`), mas o host importa `cloud/Button`. | ambígua |
| Código-fonte (composição) | `apps/nextjs-cra/dashboard/src/async-pages/index.tsx:7–17`: `dynamic(() => import('remote/Button'))` e `import('cloud/Button')`, `ssr: false`. `:49–54`: mostra o botão do host, o do `remote` e o do `cloud`. `src/pages/index.tsx:3–14`: a página inteira é carregada de forma assíncrona. | forte |
| Natureza do que é composto | `apps/nextjs-cra/remote/src/Button.tsx:10–15` e `cloud/src/components/Button.tsx:10–15`: um botão estilizado com `useEffect` de log. Os remotos não expõem telas nem fatias funcionais. | ambígua |
| Código-fonte (fronteiras) | Não há import de código entre apps. `apps/nextjs-cra/remote/config-overrides.js:42–45` inclui `../dashboard/src/components` na compilação SWC, mas nenhum arquivo do `remote` importa esse caminho. `@mf-examples/performance-monitor` é pacote de workspace do host (`dashboard/package.json:12`). | contexto |

## Autoria e histórico

Clone não raso; 73 commits no `main`, 28 merges, todos de Antonette Caldwell. Começam em 2023-03-07 (“Created nextjs project called dashboard”). Depois de um intervalo, há uma reorganização em 2025-09-22/23 (`24865e8`, “feat: move existing apps to apps/nextjs-cra”), com o pacote de performance e testes. O SHA `d81aa4f` (2025-09-23) adiciona testes de tipos. Há 28 outros branches remotos de funcionalidade e documentação, não considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O snapshot demonstra aplicações de demonstração e botões remotos, não múltiplas unidades frontend funcionais compostas. |
| Q2 | No | A separação de builds serve ao experimento de compartilhamento de componentes, não a unidades frontend participantes de uma composição. |
| Q3 | No | O host renderiza apenas botões remotos de demonstração. |
| Q4 | No | Module Federation é usado para distribuir componentes; além disso, o remoto `cloud` não exporta sua configuração corretamente. |
| Q5 | No | Q1–Q4 caracterizam code sharing experimental, não uma implementação MFE. |

## Motivo

- Classificado como `Non-MFE`: os remotos fornecem apenas botões de demonstração, caracterizando compartilhamento de componentes entre versões de React.
- **Configuração quebrada:** o remoto `cloud` não funciona como escrito (`module.expots`, chave `./CloudButton`), o que reforça que não há composição funcional.
- **Campos:** `approaches: []`, `ui_technologies: [react, next]`, `build_tools: [webpack]` (configurações explícitas de webpack via `nextjs-mf`, `react-app-rewired` e CRACO), `frontend_units: 1`, `unit_organization: monorepo`, `repo_type: example`.

## Notas para análise

- **RQ2:** host Next.js 13 com `nextjs-mf` e remotos CRA com React 17 e 18; o host expõe o próprio React (`./newReact`) e usa `shareKey` para conviver com versões diferentes.
- **RQ1 (sinais enganosos):** a descrição promete uma “comprehensive collection”, mas o snapshot tem um exemplo, com um dos remotos quebrado.
- **Protocolo (busca):** elegibilidade `unknown` nas duas rodadas; o repositório entrou na amostra com `unknown`.

## Decisão registrada

Classificado como `Non-MFE`. O host consome apenas botões demonstrativos de remotos, num experimento de compartilhamento de componentes entre versões de React. O remoto `cloud` também tem configuração quebrada; não há composição de unidades frontend funcionais.
