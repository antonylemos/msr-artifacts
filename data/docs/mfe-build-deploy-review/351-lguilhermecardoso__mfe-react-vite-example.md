---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Leitura do repositório

Não há `package.json` na raiz nem workspace. Cada uma das cinco aplicações (`mf-dashboard`, `mf-login`, `mf-navbar`, `mf-personagem-detalhe`, `root-app`) tem manifesto, lockfile e script de build próprios (`tsc -b && vite build`, por exemplo mf-login/package.json:8). Cada uma também tem seu `vite.config.ts`, com pasta de saída própria dentro de um `dist/` comum na raiz do repositório: `../dist/<aplicação>` (mf-login/vite.config.ts:23; mf-dashboard/vite.config.ts:23; mf-navbar/vite.config.ts:23; mf-personagem-detalhe/vite.config.ts:23; root-app/vite.config.ts:38). Todas usam `emptyOutDir: false` (por exemplo mf-login/vite.config.ts:24), e a limpeza do `dist/` fica a cargo do script da raiz.

O script `build-all.sh` apaga o `dist` anterior (build-all.sh:6). Depois roda, em sequência e em cada diretório, `npm install && npm run build` para os quatro remotes e por último para o host (build-all.sh:8-21). Por fim, copia o conteúdo de `dist/root-app` para a raiz de `dist` (build-all.sh:23). O resultado é uma única árvore estática: o host na raiz e cada remote na sua subpasta (`dist/mf-login/`, `dist/mf-navbar/` etc.).

O único workflow de CI, `.github/workflows/deploy.yml`, roda em todo push na `main` (.github/workflows/deploy.yml:3-5). Ele tem um job só, `build-and-deploy` (.github/workflows/deploy.yml:8), que executa `build-all.sh` (.github/workflows/deploy.yml:19-20) e publica o `./dist` inteiro no GitHub Pages com `peaceiris/actions-gh-pages@v4` (.github/workflows/deploy.yml:22-27). É deploy de produção, e é conjunto: um único artefato publicado contém as cinco aplicações. Os endereços de produção dos remotes no host apontam para as subpastas desse mesmo site do GitHub Pages (`https://lguilhermecardoso.github.io/mfe-react-vite-example/<mf>/assets/remoteEntry.js`, root-app/vite.config.ts:12-23), quando `IS_LOCAL` não é `true` (root-app/vite.config.ts:9; root-app/.env:1). O host fixa `base: '/mfe-react-vite-example/'` (root-app/vite.config.ts:27), que é a ocorrência `cfg-public-path`. Os remotes não definem `base`.

A configuração local (`root-app/.env.local.bkp:1`, `IS_LOCAL=true`) aponta os remotes para `localhost:4173–4176` (root-app/vite.config.ts:13-22), portas do `vite preview` segundo o README (README.md:62-65). As portas 5000–5004 dos `server.port` (por exemplo root-app/vite.config.ts:42; mf-login/vite.config.ts:20) são de desenvolvimento. Nenhum dos dois conta como deploy.

A ocorrência `ops-hosting` em roadmap.md:82 é um item de roadmap não marcado ("Copiar arquivos finais para branch `gh-pages` no deploy"), não um artefato. O roadmap e o README ainda listam o deploy no GitHub Pages como pendente (roadmap.md:80-84; README.md:104), mas o workflow existe no snapshot. É documentação desatualizada, que não muda a coluna Deploy. Não há Dockerfile, compose nem backend no repositório.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | mf-dashboard | separado | conjunto | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-dashboard/` (root-app/vite.config.ts:17); `http://localhost:4175` em preview (root-app/vite.config.ts:16) | No | mf-dashboard/package.json:8 (`tsc -b && vite build`); mf-dashboard/vite.config.ts:22-24 (saída `../dist/mf-dashboard`); build-all.sh:12 (build do diretório); .github/workflows/deploy.yml:19-27 (publica `./dist` inteiro no GitHub Pages) |
| 2 | mf-login | separado | conjunto | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-login/` (root-app/vite.config.ts:14); `http://localhost:4173` em preview (root-app/vite.config.ts:13) | No | mf-login/package.json:8 (`tsc -b && vite build`); mf-login/vite.config.ts:22-24 (saída `../dist/mf-login`); build-all.sh:9 (build do diretório); .github/workflows/deploy.yml:19-27 (publica `./dist` inteiro no GitHub Pages) |
| 3 | mf-navbar | separado | conjunto | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-navbar/` (root-app/vite.config.ts:23); `http://localhost:4174` em preview (root-app/vite.config.ts:22) | No | mf-navbar/package.json:8 (`tsc -b && vite build`); mf-navbar/vite.config.ts:22-24 (saída `../dist/mf-navbar`); build-all.sh:15 (build do diretório); .github/workflows/deploy.yml:19-27 (publica `./dist` inteiro no GitHub Pages) |
| 4 | mf-personagem-detalhe | separado | conjunto | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-personagem-detalhe/` (root-app/vite.config.ts:20); `http://localhost:4176` em preview (root-app/vite.config.ts:19) | No | mf-personagem-detalhe/package.json:8 (`tsc -b && vite build`); mf-personagem-detalhe/vite.config.ts:22-24 (saída `../dist/mf-personagem-detalhe`); build-all.sh:18 (build do diretório); .github/workflows/deploy.yml:19-27 (publica `./dist` inteiro no GitHub Pages) |
| 5 | root-app | separado | conjunto | `/mfe-react-vite-example/` no GitHub Pages (root-app/vite.config.ts:27; build-all.sh:23) | No | root-app/package.json:8 (`tsc -b && vite build`); root-app/vite.config.ts:37-40 (saída `../dist/root-app`); root-app/vite.config.ts:27 (`base`); build-all.sh:21-23 (build e cópia para a raiz de `dist`); .github/workflows/deploy.yml:19-27 (publica `./dist` inteiro no GitHub Pages) |

## Observações

**1. mf-dashboard.** O build é separado: script e `vite.config.ts` próprios, que geram só o remote em `dist/mf-dashboard` (mf-dashboard/package.json:8; mf-dashboard/vite.config.ts:23). O build é disparado pelo script comum da raiz (build-all.sh:12). O deploy é conjunto: o diretório entra no mesmo `./dist` que o workflow publica de uma vez no GitHub Pages (.github/workflows/deploy.yml:26), e não há job nem configuração de hospedagem só dele. O endereço de produção usado pelo host corresponde à pasta de saída. O `version: "0.0.0"` do manifesto (mf-dashboard/package.json:4), num pacote `private` (mf-dashboard/package.json:3), não é usado na publicação: Versionamento `No`.

**2. mf-login.** Mesmo arranjo do mf-dashboard: build próprio (mf-login/package.json:8; mf-login/vite.config.ts:23), disparado por build-all.sh:9, e publicação no mesmo `./dist` do único workflow (.github/workflows/deploy.yml:22-27). É o primeiro diretório que o script builda, mas a ordem não cria dependência de build: cada remote só escreve na sua subpasta. Sem versão própria (mf-login/package.json:4).

**3. mf-navbar.** Build próprio (mf-navbar/package.json:8; mf-navbar/vite.config.ts:23), disparado por build-all.sh:15, e deploy conjunto pelo mesmo workflow. Sem versão própria (mf-navbar/package.json:4).

**4. mf-personagem-detalhe.** Build próprio (mf-personagem-detalhe/package.json:8; mf-personagem-detalhe/vite.config.ts:23), disparado por build-all.sh:18, e deploy conjunto pelo mesmo workflow. Sem versão própria (mf-personagem-detalhe/package.json:4).

**5. root-app.** O build é separado (root-app/package.json:8; root-app/vite.config.ts:38) e é o último do script (build-all.sh:21). É a única aplicação cujo artefato o script reorganiza: a cópia para a raiz de `dist` (build-all.sh:23) faz do host a página inicial do site, servida sob o `base` `/mfe-react-vite-example/` (root-app/vite.config.ts:27). O build do host não incorpora o código dos remotes. Ele só fixa os endereços deles no mesmo site, escolhidos por `IS_LOCAL` em tempo de build (root-app/vite.config.ts:7-24; root-app/.env:1). Por isso, mudar a hospedagem de um remote exige rebuildar o host, embora no snapshot tudo seja republicado junto a cada push. Deploy conjunto com os remotes, sem versão própria (root-app/package.json:4).

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (conjunto: 5). Versionamento independente: 0.
