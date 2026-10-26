---
schema: 1
id: 1097221198
full_name: efekrsdg0/market-actions
url: https://github.com/efekrsdg0/market-actions
commit: 437e339bf4ba2293b3a7909a7be345c34ed2bbbf
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
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

# 170 — efekrsdg0/market-actions

## Contexto

“Market Actions App”: remoto Module Federation em Vite + React + TypeScript, com README em turco: “Remote App” (`README.md:1–5`). Ele expõe `./MarketActions` (`vite.config.ts:9–16`), um painel de compra e venda de moedas que recebe do host uma store Redux por prop (`src/App.tsx:6–27`; `src/store/remoteStore.tsx:76–127`). Os componentes de UI vêm da biblioteca `market-ui`, ligada por `yarn link` (`README.md:29`) e ausente do `package.json`. O host não está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:171` registra rank 170, ID 1097221198, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:171` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21125` e `data/discovery/mfe-round-002/candidates.csv:21131`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-11` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T23:21:18.809Z / 2026-10-08T16:16:23.699Z |

Metadados do hit:
- descrição “Market Actions MFE”, sem a frase;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 263;
- criação em 2025-11-15T18:59:49Z, push em 2025-11-20T07:53:07Z.

O acerto vem de `README.md:1`, “# Market Actions App | React + TypeScript + Vite + Module Federation”, única ocorrência. A última alteração do README é `c0d5945` (2025-11-20, “ADD : Readme file”), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 41 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz, com `src/components/*`, `src/store/remoteStore.tsx` e `src/locales/tr.json`. Também há resíduos: `src/main.js` e `src/App.js` compilados de uma versão anterior, que importam um `testComponent` inexistente (`src/App.js:3`), e `.__mf__temp/marketActionsApp/localSharedImportMap.js`, gerado por `@module-federation/vite`, que não é a dependência atual. | contexto |
| Configuração (federação) | `vite.config.ts:9–16`: `federation({ name: "marketActionsApp", filename: "remoteEntry.js", exposes: { "./MarketActions": "./src/App.tsx" }, shared: ["react", "react-dom"] })`, sem `remotes`. `vite.config.ts:6`: porta 5001 com CORS. `package.json:13`: `@originjs/vite-plugin-federation` ^1.4.1. | moderada |
| Código-fonte (contrato com o host) | `src/App.tsx:6–27`: o componente exposto recebe `store?: RemoteStore` e o injeta num contexto. `src/store/remoteStore.tsx:50–131`: tipos do estado do host (`main`, `listing`, `wallet`) e hooks com `useSyncExternalStore` sobre `subscribe`/`getState`/`dispatch` da store do host. `src/components/FooterActions/FooterActions.tsx:51`, `69`, `94`: notificações por `window.toast`, fornecido pelo host (`src/global.d.ts:7–16`). | moderada |
| Código-fonte (fronteiras) | Imports internos ao projeto. Os componentes importam `market-ui` (`CurrencyBadge.tsx:5`, `FooterActions.tsx:2`, `TabContainer.tsx:2`, `WalletInfo.tsx:2`), biblioteca externa ligada por `yarn link` (`README.md:29`), não declarada no `package.json` e não observável. Não há import de fonte de outra unidade. | contexto |
| Build | `package.json:6–11`: `tsc -b && vite build`. `src/main.tsx:1–10`: entrada standalone. | contexto |

## Autoria e histórico

Clone não raso; 25 commits, nenhum merge, todos de `ekarsidag <efe.karsidag@hepsiburada.com>`, de 2025-11-15 (`7b458f9`, “Create vite default project”) a 2025-11-20 (SHA `437e339`, “DELETE : remove unused lib”).
- **Primeiro MFE:** `68f771d` (2025-11-16, “ADD : Test MFE dummy component”).
- **Store do host:** `ced900d` (“Remove local test redux integration for global redux”).

O e-mail é corporativo; a concentração de commits em cinco dias é compatível com exercício técnico, mas isso não está demonstrado. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`): a varredura `git log --name-status` termina com `warning: lazy fetching disabled` e `fatal: could not fetch 87d2f8e… from promisor remote`, e `git cat-file` não encontra o objeto localmente; os logs dos caminhos relevantes foram observáveis e a lacuna não afeta os arquivos presentes no SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a configuração de composição só tem `exposes` (`vite.config.ts:12–14`) e não referencia unidades externas. `market-ui` é biblioteca de componentes, não unidade referenciada por configuração de composição. |
| Q2 | Yes (para a unidade) | Entrada e build próprios que geram `remoteEntry.js` (`vite.config.ts:11`; `package.json:8`). |
| Q3 | Undetermined | O host não está no repositório; só o contrato (store por prop, `window.toast`) o indica. |
| Q4 | Undetermined | O lado remoto está configurado; o consumidor não é observável. |
| Q5 | No | Há uma unidade preparada para composição, não uma instância de MFE no repositório. |

## Motivo

- `MFE-unit` pela exceção do checklist: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- O padrão é o mesmo do final 050 (Vite + `@originjs/vite-plugin-federation`, um `exposes`, `shared` React), com contrato de host explícito (store Redux injetada, `window.toast`). A combinação de `exposes` com contrato aproxima o caso de 001/069.
- O módulo exposto é uma tela de domínio, não um componente genérico, então a questão de code sharing (089/100) não se coloca. Não há plataforma de terceiros (102/074/080).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: example`: painel de mercado (pares, ticker, carteira) que depende de host não observável, de cinco dias de desenvolvimento.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** remoto que recebe a store Redux do host por prop e a consome com `useSyncExternalStore` (`remoteStore.tsx:103–131`). É uma variante de estado compartilhado por injeção, sem compartilhar a biblioteca Redux.
- **RQ3:** dependência de UI (`market-ui`) por `yarn link`, fora do manifesto, e resíduos de outra ferramenta de federação (`.__mf__temp/…`, `@module-federation/vite`) versionados.
- **Protocolo (busca/elegibilidade):** entrada só pela consulta `"module federation"`, com elegibilidade `unknown` nas duas rodadas, pela regra `recent-human-commit`: `activity_incomplete` na rodada 001 e `author_indeterminate` na 002 (a regra `recent-push` passa nas duas). O histórico local de um único autor não substitui o estado registrado pelo avaliador.
- **Contribuição da revisão independente (Lupa):** concordância com MFE-unit e Q1–Q5 No/Yes/Undetermined/Undetermined/No (exceção do checklist: `remoteEntry.js` e `./MarketActions` expostos, host ausente); não há decisão real de Q3/Q4 a resolver dentro do commit. Ressalva de buildabilidade a manter antes de finalizar: o pacote `market-ui`, importado por cinco componentes (`FooterActions.tsx:2`, `CurrencyBadge.tsx:5`, `CurrencyInput.tsx:2`, `TabContainer.tsx:2`, `WalletInfo.tsx:2`), não consta em `package.json`, `package-lock.json` nem `yarn.lock` (verificado) e não existe na árvore; o build depende de `yarn link market-ui` (`README.md:29`), de modo que a configuração de federação e o `exposes` são resolvíveis estaticamente, mas o build reproduzível só com este snapshot não está demonstrado. Correções: `src/store/remoteStore.tsx` termina na linha 127 (a citação passa a `:76–127`); `.__mf__temp/marketActionsApp/localSharedImportMap.js:81–86` mostra `usedRemotes` vazio; `src/App.js` e `src/main.js` antigos são resíduos (`index.html:8–10` aponta para `src/main.tsx`; `src/App.js:3` importa caminho ausente).
