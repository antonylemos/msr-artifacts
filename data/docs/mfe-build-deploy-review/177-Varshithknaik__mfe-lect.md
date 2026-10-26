---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Leitura do repositório

Projeto de aprendizado de Module Federation com webpack 5 (README.md:3-5), sem `package.json` na raiz e sem workspace. Cada aplicação é um pacote npm isolado, com os mesmos dois scripts: `start` roda `webpack serve` com a configuração de desenvolvimento e `build` roda `webpack` com a de produção (auth/package.json:5-6; container/package.json:5-6; marketing/package.json:5-6; packages/auth/package.json:5-6; packages/container/package.json:5-6; packages/dashboard/package.json:5-6; packages/marketing/package.json:5-6). Cada build de produção gera o artefato da própria aplicação, com `publicPath` `/<aplicação>/latest/` (por exemplo auth/config/webpack.prod.js:8-11; container/config/webpack.prod.js:10-13); os remotes geram também seu `remoteEntry.js` (auth/config/webpack.prod.js:13-17). As configurações de desenvolvimento usam portas fixas, 8080 para o container, 8081 para marketing, 8082 para auth e 8083 para o dashboard (container/config/webpack.dev.js:8-12; packages/dashboard/config/webpack.dev.js:9-13); só o dashboard libera CORS no servidor de desenvolvimento (packages/dashboard/config/webpack.dev.js:17-19, ocorrência `ops-cors`), o que não é deploy.

O deploy de produção existe só para a árvore da raiz. Há três workflows do GitHub Actions, um por aplicação, cada um disparado por push na `main` que altere o próprio diretório (.github/workflows/auth.yml:3-8; .github/workflows/container.yml:3-8; .github/workflows/marketing.yml:3-8). Cada um instala e constrói só o seu diretório (.github/workflows/auth.yml:10-20), sincroniza o `dist` com `s3://<bucket>/<aplicação>/latest` e invalida no CloudFront o arquivo de entrada: o `remoteEntry.js` dos remotes e o `index.html` do container (.github/workflows/auth.yml:23, 28; .github/workflows/marketing.yml:23, 28; .github/workflows/container.yml:25, 30). Bucket e distribuição são os mesmos para os três, lidos de secrets, cada aplicação num prefixo próprio. O container recebe no build o domínio de produção (.github/workflows/container.yml:20-22), que compõe os endereços dos remotes (container/config/webpack.prod.js:6, 17-20); os caminhos `/marketing/latest/remoteEntry.js` e `/auth/latest/remoteEntry.js` coincidem com os prefixos que os workflows dos remotes publicam. Os nomes `latest` e a sobrescrita do mesmo prefixo indicam que não há versões publicadas lado a lado.

A cópia em `packages/` (container, marketing, auth e dashboard) tem as mesmas configurações de produção, com os mesmos `publicPath` (packages/container/config/webpack.prod.js:12, 17-21; packages/dashboard/config/webpack.prod.js:10), mas nenhum workflow a filtra ou constrói: os filtros `paths` cobrem só `auth/**`, `container/**` e `marketing/**` da raiz. O remote `dashboard` aparece comentado no container da raiz (container/config/webpack.prod.js:20) e o `dashboard/` da raiz só tem `package.json`, que chama configurações ausentes (dashboard/package.json:4-6); como não é aplicação na revisão estrutural, não entra na tabela. Os `dist` são ignorados pelo git (.gitignore:2), então os builds acontecem no CI ou na máquina do autor. Não há Dockerfile, compose nem configuração de hospedagem além dos workflows.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | auth | separado | separado | `<bucket>/auth/latest` no S3/CloudFront (.github/workflows/auth.yml:23, 28; auth/config/webpack.prod.js:10); `http://localhost:8082/` em desenvolvimento (auth/config/webpack.dev.js:9, 12) | No | auth/package.json:6 (`webpack --config config/webpack.prod.js`); auth/config/webpack.prod.js:6-21 (build de produção do remote `auth`, `publicPath` `/auth/latest/`); .github/workflows/auth.yml:7-8, 12, 20 (job disparado por `auth/**`, build só de `auth`); .github/workflows/auth.yml:23 (publica `dist` em `auth/latest`); .github/workflows/auth.yml:28 (invalida `/auth/latest/remoteEntry.js`) |
| 2 | container | separado | separado | `<bucket>/container/latest` no S3/CloudFront (.github/workflows/container.yml:25, 30; container/config/webpack.prod.js:12); `http://localhost:8080/` em desenvolvimento (container/config/webpack.dev.js:9, 12) | No | container/package.json:6 (`webpack --config config/webpack.prod.js`); container/config/webpack.prod.js:8-24 (build de produção do host, remotes em `${domain}/<remote>/latest/remoteEntry.js`); .github/workflows/container.yml:7-8, 12, 20-22 (job disparado por `container/**`, build só de `container` com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:25 (publica `dist` em `container/latest`); .github/workflows/container.yml:30 (invalida `/container/latest/index.html`) |
| 3 | marketing | separado | separado | `<bucket>/marketing/latest` no S3/CloudFront (.github/workflows/marketing.yml:23, 28; marketing/config/webpack.prod.js:10); `http://localhost:8081/` em desenvolvimento (marketing/config/webpack.dev.js:9, 12) | No | marketing/package.json:6 (`webpack --config config/webpack.prod.js`); marketing/config/webpack.prod.js:6-21 (build de produção do remote `marketing`, `publicPath` `/marketing/latest/`); .github/workflows/marketing.yml:7-8, 12, 20 (job disparado por `marketing/**`, build só de `marketing`); .github/workflows/marketing.yml:23 (publica `dist` em `marketing/latest`); .github/workflows/marketing.yml:28 (invalida `/marketing/latest/remoteEntry.js`) |
| 4 | packages/auth | separado | não observado | `http://localhost:8082/` em desenvolvimento (packages/auth/config/webpack.dev.js:10, 13) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:6-35 (build de produção do remote `auth`, `publicPath` `/auth/latest/`) |
| 5 | packages/container | separado | não observado | `http://localhost:8080/` em desenvolvimento (packages/container/config/webpack.dev.js:9, 12) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:8-38 (build de produção do host, `publicPath` `/container/latest/`, três remotes) |
| 6 | packages/dashboard | separado | não observado | `http://localhost:8083/` em desenvolvimento (packages/dashboard/config/webpack.dev.js:10, 13) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:6-21 (build de produção do remote `dashboard`, `publicPath` `/dashboard/latest/`) |
| 7 | packages/marketing | separado | não observado | `http://localhost:8081/` em desenvolvimento (packages/marketing/config/webpack.dev.js:10, 13) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-35 (build de produção do remote `marketing`, `publicPath` `/marketing/latest/`) |

## Observações

**1. auth.** Build separado: o script `build` do pacote roda a configuração de produção, que gera o artefato do remote `auth` com seu `remoteEntry.js` (auth/package.json:6; auth/config/webpack.prod.js:13-17). Deploy separado: o workflow `deploy-auth` só dispara com mudanças em `auth/**`, constrói só esse diretório e publica o `dist` dele no prefixo `auth/latest` (.github/workflows/auth.yml:1-8, 12, 20, 23), à parte das outras aplicações, embora no mesmo bucket e na mesma distribuição. O `publicPath` `/auth/latest/` (auth/config/webpack.prod.js:10) coincide com esse prefixo e com o endereço que o container usa (container/config/webpack.prod.js:19). O `version: 1.0.0` (auth/package.json:3) não é usado na publicação, que vai sempre para `latest`.

**2. container.** Build separado (container/package.json:6; container/config/webpack.prod.js:8-24) e deploy separado pelo workflow `deploy-container`, disparado por `container/**`, que publica o `dist` em `container/latest` e invalida o `index.html` (.github/workflows/container.yml:1-8, 25, 30). O build depende do secret `PRODUCTION_DOMAIN` (.github/workflows/container.yml:20-22) para montar os endereços dos remotes (container/config/webpack.prod.js:6, 18-19), mas não inclui o código deles: os remotes são resolvidos em runtime nos prefixos que os outros workflows publicam. Trocar um remote não exige rebuild do container, porque o caminho `latest/remoteEntry.js` é fixo e é invalidado no CloudFront a cada deploy do remote (.github/workflows/marketing.yml:28; .github/workflows/auth.yml:28). Sem versão própria usada na publicação (container/package.json:3).

**3. marketing.** Mesmo arranjo do auth: build próprio (marketing/package.json:6; marketing/config/webpack.prod.js:13-17), workflow `deploy-marketing` disparado por `marketing/**` que publica em `marketing/latest` e invalida o `remoteEntry.js` (.github/workflows/marketing.yml:1-8, 23, 28). O `publicPath` `/marketing/latest/` (marketing/config/webpack.prod.js:10) bate com o remote do container (container/config/webpack.prod.js:18). Sem versão própria usada na publicação.

**4. packages/auth.** Build separado pelo script e pela configuração de produção próprios (packages/auth/package.json:6; packages/auth/config/webpack.prod.js:6-35). Nenhum artefato de deploy cobre `packages/`: os três workflows filtram e constroem só os diretórios da raiz (.github/workflows/auth.yml:8, 12). O `publicPath` `/auth/latest/` (packages/auth/config/webpack.prod.js:10) é o mesmo do auth da raiz, mas só o da raiz é publicado nesse prefixo. Deploy `não observado`; em "Onde é servida" fica só o endereço de desenvolvimento.

**5. packages/container.** Build separado (packages/container/package.json:6; packages/container/config/webpack.prod.js:8-38), sem deploy observado, pelo mesmo motivo de packages/auth. Diferente do container da raiz, declara também o remote `dashboard` em `${domain}/dashboard/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:20), caminho que nenhum workflow publica.

**6. packages/dashboard.** Build separado (packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:6-21), com `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:10). Não há workflow para o dashboard em nenhuma das árvores, então o deploy é `não observado`. É a única aplicação que libera CORS no servidor de desenvolvimento (packages/dashboard/config/webpack.dev.js:17-19), configuração que não conta como deploy.

**7. packages/marketing.** Build separado (packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-35), sem deploy observado, como packages/auth; o `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10) repete o do marketing da raiz.

## Resumo

Aplicações: 7. Build (separado: 7). Deploy (separado: 3, não observado: 4). Versionamento independente: 0.
