---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 319 — Hariharan-s-99/microFrontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| advancedWebpack | advancedWebpack/package.json;advancedWebpack/webpack.config.js | advancedWebpack/package.json:1-37 (manifesto próprio, `name` `webpack`) | advancedWebpack/webpack.config.js:5 (`entry: "./src/index.tsx"`); advancedWebpack/src/index.tsx:14-19 (`ReactDOM.render` em `#root`); advancedWebpack/webpack.config.js:116 (template `./public/index.html`) | advancedWebpack/webpack.config.js:4-124 (configuração webpack própria, porta 3001 em :121); advancedWebpack/package.json:8 (`webpack --mode production`) | — | — | Yes | App React com entrada e build webpack próprios, independente dos demais. |
| container | container/index.html;container/module-federation.config.ts;container/package.json;container/rspack.config.ts | container/package.json:1-35 (manifesto próprio, `name` `container`) | container/rspack.config.ts:17-19 (`entry.main: "./src/index.ts"`); container/src/index.ts:1 (`import("./App")`); container/src/App.tsx:24-27 (`createRoot` em `#container` e `render`); container/rspack.config.ts:92 (template `./index.html`) | container/rspack.config.ts:15-105 (configuração Rspack própria, porta 8080 em :25); container/package.json:5 (`rspack build`) | — | — | Yes | Host React com entrada de UI e build Rspack próprios. |
| home | home/index.html;home/module-federation.config.ts;home/package.json;home/rspack.config.ts | home/package.json:1-35 (manifesto próprio, `name` `home`) | home/rspack.config.ts:17-19 (`entry.main: "./src/index.ts"`); home/src/index.ts:1 (`import("./bootstrap")`); home/src/bootstrap.tsx:6-10 (`mount` renderiza a UI no elemento recebido); home/rspack.config.ts:92 (template `./index.html`) | home/rspack.config.ts:15-105 (configuração Rspack própria, porta 8081 em :25); home/package.json:5 (`rspack build`) | — | — | Yes | Remoto React com entrada que monta a UI e build Rspack próprios. |
| settings | settings/index.html;settings/module-federation.config.ts;settings/package.json;settings/rspack.config.ts | settings/package.json:1-34 (manifesto próprio, `name` `settings`) | settings/rspack.config.ts:16-18 (`entry.main: "./src/index.ts"`); settings/src/index.ts:1 (`import("./bootstrap")`); settings/src/bootstrap.tsx:6-10 (`mount` renderiza a UI no elemento recebido); settings/rspack.config.ts:91 (template `./index.html`) | settings/rspack.config.ts:14-104 (configuração Rspack própria, porta 8082 em :24); settings/package.json:5 (`rspack build`) | — | — | Yes | Remoto React com entrada que monta a UI e build Rspack próprios. |

## Resumo

Aplicações frontend no snapshot: 4 (advancedWebpack, container, home, settings).

## Notas

- A classificação registra `frontend_units: 3` (`container`, `home`, `settings`). A diferença é `advancedWebpack/`, app React + webpack independente, sem federação nem ligação com os demais, que é uma fronteira de aplicação mas não participa da composição.
- Nos remotos, `src/bootstrap.tsx` só exporta `mount` e não o chama; servido sozinho, `home/index.html:11` (`#home`) e `settings/index.html:11` (`#settings`) ficam vazios. A UI é montada quando o host chama `mount` (container/src/Home.tsx:8, container/src/Settings.tsx:7). Isso não muda a resposta: a entrada leva ao `mount` que inicia a UI, e o build é próprio.
- Não há `package.json` na raiz. As ocorrências `ws-path-alias` do `matches.csv` são `paths` em `tsconfig.json` de cada pacote, não declaração de workspace. Nenhuma ocorrência `ops-*` ou `ci-*` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot.
