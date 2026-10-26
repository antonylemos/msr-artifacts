---
schema: 1
id: 717416117
full_name: bigMeowCoding/interview
url: https://github.com/bigMeowCoding/interview
commit: 3f841f3c2dd92624f57388379035268d8ba183d5
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 213 — bigMeowCoding/interview

## Contexto

Repositório pessoal de preparação para entrevistas de frontend. A descrição do `package.json` diz “handwritten code implementation and LeetCode algorithm problems” (`package.json:2–4`). `src/` tem exercícios por tema (`basic`, `promise`, `reactive`, `leetcode`, `designPattern`, `react` etc.). `packages/` é um workspace pnpm (`pnpm-workspace.yaml:1–2`) com cinco experimentos independentes: `webpack`, `webpack2`, `ssr`, `mini-vite` e `ga-tsp`.

Dois desses experimentos testam Module Federation: `packages/webpack` expõe uma função `sum`, e `packages/webpack2` tem a configuração de host comentada. Não há README na raiz. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:214` registra rank 213, ID 717416117, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:214` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:7046` e `data/discovery/mfe-round-002/candidates.csv:7051`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `technology-module-federation-plugin-js-code#size:1800..1999` / `ModuleFederationPlugin remotes extension:js size:1800..1999` | `packages/webpack2/webpack.config.js` | 2026-10-07T22:32:41.499Z / 2026-10-08T16:12:54.595Z |

O arquivo tem 1.961 bytes no SHA, dentro da faixa. `ModuleFederationPlugin` aparece no `require` (`:4`), e o bloco com `remotes` está todo comentado (`:71–76`). A busca de código casou o texto do comentário. Os metadados do hit de código vêm vazios. A entrada é só por código; não há README na raiz para citar grafias.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 228 entradas, 227 arquivos regulares `100644` e 1 executável `100755` (`src/example/a.md`); zero symlinks e zero gitlinks. Há 159 entradas em `src/` (exercícios), 53 em `packages/` (cinco experimentos), 6 em `.ai/` e arquivos de raiz (`package.json`, `vite.config.js`, `index.html`, `AGENTS.md`). | contexto |
| Configuração (host comentado) | `packages/webpack2/webpack.config.js:66–77`: plugins ativos `CleanWebpackPlugin`, `HtmlWebpackPlugin` e `StatoscopeWebpackPlugin`. O `ModuleFederationPlugin` com `name: "host"` e `remotes: { webpack1: "webpack1@http://localhost:3002/remoteEntry.js" }` está comentado (`:71–76`). `packages/webpack2/src/index.js:1–28` é um exercício de escopo e `lodash-es`, sem import federado. | contrária |
| Configuração (remoto) | `packages/webpack/webpack.config.js:37–43`: `ModuleFederationPlugin` com `name: "webpack1"`, `filename: "remoteEntry.js"` e `exposes: { "./sum": "./src/sum.js" }`. `packages/webpack/src/sum.js:1–4` é uma função de soma, sem UI. Nenhum consumidor ativo existe no repositório. | fraca |
| Busca | `git grep -i` no SHA (exceto lockfiles) por `ModuleFederation`, `remoteEntry`, `federation`, `single.?spa` e `micro.?front`: só as duas configurações acima. | ausente |
| Histórico | Os dois pacotes entram em `251ba55` (2023-12-10, “feat:模块联邦测试”, isto é, “teste de federação de módulos”), junto com `mini-vite` e mudanças em `ssr`. | contexto |

## Autoria e histórico

Clone não raso; 114 commits em todos os refs, nenhum merge, todos da mesma pessoa:
- `zhouyijun <zhou495248579@hotmail.com>`: 59 commits (51 em 2023, 8 em 2024);
- `周义竣 <zhouyijun@chagee.com>`: 55 commits em 2026.

A raiz é `7871291` (2023-11-11, “chore:init”); o SHA é `3f841f3` (2026-05-20, “refactor: 删除不再使用的 Claude 和 Codex 文件”). O branch `origin/dev` (`29f090e`, 2026-05-23) tem 5 commits além de `master`, sobre o projeto `ga-tsp`, e não foi considerado. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Não há duas unidades frontend em composição. A única configuração de host está comentada (`packages/webpack2/webpack.config.js:71–76`), e o “remoto” expõe uma função utilitária, não uma unidade frontend (`packages/webpack/src/sum.js:1–4`). |
| Q2 | No | Sem unidades em composição, não há independência a avaliar. Os pacotes do workspace são experimentos sem relação entre si. |
| Q3 | No | Nenhum host carrega, monta ou roteia outra unidade. |
| Q4 | No | O mecanismo está desativado no consumidor, e o produtor não tem consumidor. É uma dependência experimental, sem conexão entre unidades. |
| Q5 | No | Q1–Q4 são No: repositório de estudo com um teste de Module Federation abandonado. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE-related dependencies that are unused or experimental” e a “monorepos containing several unrelated frontend applications”.
- É material de estudo e exercício, como 023 e o rascunho 167. Pelo mesmo critério: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`, pois não há unidade frontend no sentido de Q1. Os experimentos (`ssr`, `ga-tsp`, `mini-vite`) são demos isoladas, sem composição.
- Não é MFE-unit: o `exposes` publica uma função `sum`, não uma unidade frontend preparada para composição por host externo.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a busca de código casou `remotes` dentro de um bloco comentado; o `require('webpack').container` continua ativo sem uso.
- **Protocolo (busca):** elegibilidade `unknown` nas duas rodadas, e o repositório entrou na amostra com `unknown`. O branch padrão é `master`.
- **Protocolo (snapshot):** `origin/dev` está à frente de `master` e não foi inspecionado.
