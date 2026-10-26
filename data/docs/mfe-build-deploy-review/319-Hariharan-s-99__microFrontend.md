---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
inputs:
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

## Leitura do repositório

Quatro projetos irmãos, sem manifesto nem workspace na raiz: `container` (host), `home` e `settings` (remotes), todos com Rspack e Module Federation, e `advancedWebpack`, um app React com webpack fora da composição. Cada projeto tem `package.json` e lockfile próprios. Os três projetos Rspack têm os mesmos scripts: `build` (`NODE_ENV=production rspack build`), `build:dev`, `build:start` (`cd dist && rspack serve`) e `start` (`rspack serve` em desenvolvimento) (container/package.json:4-9; home/package.json:4-9; settings/package.json:4-9). As três configurações Rspack são quase idênticas: entrada `./src/index.ts`, `HtmlRspackPlugin` e `ModuleFederationPlugin` com a configuração federada do próprio projeto (container/rspack.config.ts:17-19, 91, 94; home/rspack.config.ts:17-19, 91, 94; settings/rspack.config.ts:16-18, 90, 93). Nenhuma define `output.path`, só `uniqueName` e `publicPath` (container/rspack.config.ts:29-34), então a saída fica no diretório padrão `dist`, ignorado pelo git (container/.gitignore:86; home/.gitignore:85; settings/.gitignore:85). O `advancedWebpack` tem `build` com `webpack --mode production` e `start` com `webpack serve` (advancedWebpack/package.json:6-9), saída em `dist` com `publicPath: "/"` (advancedWebpack/webpack.config.js:6-11). Nenhum script dispara os builds juntos.

Tudo o que o snapshot executa é de desenvolvimento. O `build:start` roda `rspack serve` de dentro de `dist`, que ainda é o servidor de desenvolvimento. Os `publicPath` apontam para `localhost`, um por porta: `http://localhost:8080/` no container, `:8081/` no home e `:8082/` no settings (container/rspack.config.ts:33; home/rspack.config.ts:33; settings/rspack.config.ts:32), as mesmas portas do `devServer` (container/rspack.config.ts:24-25; home/rspack.config.ts:24-25; settings/rspack.config.ts:23-24). São as quatro ocorrências `cfg-public-path` do `matches.csv`, junto com `publicPath: "/"` do advancedWebpack (advancedWebpack/webpack.config.js:10). O `matches.csv` não tem ocorrência `ops-*` nem `ci-*`, e o snapshot não tem Dockerfile, compose, workflow de CI, configuração de hospedagem nem README.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | advancedWebpack | separado | não observado | `http://localhost:3001` em desenvolvimento (advancedWebpack/webpack.config.js:119-122) | No | advancedWebpack/webpack.config.js:4-124 (configuração própria, saída `dist`, `publicPath: "/"`); advancedWebpack/package.json:8 (`webpack --mode production`) |
| 2 | container | separado | não observado | `http://localhost:8080/` em desenvolvimento (container/rspack.config.ts:24-25, 33) | No | container/rspack.config.ts:15-105 (configuração própria, `publicPath` em `localhost:8080`); container/package.json:5 (`rspack build`) |
| 3 | home | separado | não observado | `http://localhost:8081/` em desenvolvimento (home/rspack.config.ts:24-25, 33) | No | home/rspack.config.ts:15-105 (configuração própria, gera `remoteEntry.js`, `publicPath` em `localhost:8081`); home/package.json:5 (`rspack build`) |
| 4 | settings | separado | não observado | `http://localhost:8082/` em desenvolvimento (settings/rspack.config.ts:23-24, 32) | No | settings/rspack.config.ts:14-104 (configuração própria, gera `remoteEntry.js`, `publicPath` em `localhost:8082`); settings/package.json:5 (`rspack build`) |

## Observações

**1. advancedWebpack.** Build próprio, com saída em `dist` e bundle com hash de conteúdo (advancedWebpack/webpack.config.js:6-11). Não participa da composição (revisão de composição, "Unidades sem relação"). O deploy é `não observado`: só há o `webpack serve` na porta 3001 (advancedWebpack/package.json:7; advancedWebpack/webpack.config.js:119-123). A versão `1.0.0` (advancedWebpack/package.json:3) não é usada em publicação.

**2. container.** Build próprio. O host busca os remotes por URL fixa em `localhost` (container/module-federation.config.ts:4-5), então o build de produção também só funciona com os remotes servidos nessas portas. O deploy é `não observado`: `start` e `build:start` rodam `rspack serve` (container/package.json:7-8). A versão `0.0.1` (container/package.json:3) não é usada em publicação.

**3. home.** Build próprio, que gera o `remoteEntry.js` do remote (home/module-federation.config.ts:3). O `publicPath` fixo em `http://localhost:8081/` (home/rspack.config.ts:33) amarra os chunks a esse endereço, o mesmo que o container usa. O deploy é `não observado`, pelo mesmo motivo do container (home/package.json:7-8). A versão `0.0.1` (home/package.json:3) não é usada.

**4. settings.** Mesma forma do home, na porta 8082: `remoteEntry.js` (settings/module-federation.config.ts:3) e `publicPath` `http://localhost:8082/` (settings/rspack.config.ts:32). O deploy é `não observado` (settings/package.json:7-8). A versão `0.0.1` (settings/package.json:3) não é usada.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
