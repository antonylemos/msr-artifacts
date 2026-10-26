---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Leitura do repositório

Monorepo sem `package.json` na raiz e sem workspace, com quatro pacotes webpack 5 independentes em `packages/`: `container` (shell React), `marketing` e `auth` (React) e `dashboard` (Vue 3). Cada pacote tem seu `package.json`, seu `package-lock.json` e os mesmos dois scripts: `start` roda `webpack serve` com a configuração de desenvolvimento e `build` roda `webpack` com a de produção (packages/container/package.json:4-7; packages/auth/package.json:4-7; packages/dashboard/package.json:4-7; packages/marketing/package.json:4-7). Cada configuração de produção define `mode: "production"`, nomes de arquivo com `contenthash` e um `publicPath` fixo no prefixo `/<pacote>/latest/` (packages/container/config/webpack.prod.js:8-13; packages/auth/config/webpack.prod.js:8-13; packages/dashboard/config/webpack.prod.js:8-13; packages/marketing/config/webpack.prod.js:6-11); a saída vai para o `dist` padrão de cada pacote, ignorado pelo git (.gitignore:2). Nenhum script dispara os quatro builds juntos.

O deploy é um workflow do GitHub Actions por pacote. Cada um dispara em push para `master` só quando muda a pasta do seu pacote, roda nela, instala, constrói e sincroniza o `dist` com o prefixo `<pacote>/latest` de um bucket S3 cujo nome vem de segredo, comum aos quatro (.github/workflows/auth.yml:3-12, 19-21, 26; .github/workflows/container.yml:26; .github/workflows/dashboard.yml:26; .github/workflows/marketing.yml:24). Depois invalida no CloudFront, numa distribuição também comum, um único arquivo do prefixo: `index.html` no container, no auth e no dashboard e `remoteEntry.js` no marketing (.github/workflows/container.yml:32; .github/workflows/auth.yml:32; .github/workflows/dashboard.yml:32; .github/workflows/marketing.yml:30). Para o auth e o dashboard, que são remotes, o arquivo invalidado é o `index.html` e não o `remoteEntry.js` que o container carrega; isso afeta só o cache, não a separação do deploy. Os workflows do container, do auth e do dashboard passam `PRODUCTION_DOMAIN` ao build (.github/workflows/container.yml:21-23; .github/workflows/auth.yml:21-23; .github/workflows/dashboard.yml:21-23), mas só o container o usa, para montar as URLs dos remotes (packages/container/config/webpack.prod.js:6, 17-21); auth e dashboard leem a variável sem usá-la (packages/auth/config/webpack.prod.js:6; packages/dashboard/config/webpack.prod.js:6), e o marketing nem a lê nem a recebe (.github/workflows/marketing.yml:21).

O resultado são quatro publicações independentes no mesmo domínio, distinguidas pelo prefixo, que casam com as URLs de produção do container (`${domain}/<pacote>/latest/remoteEntry.js`, revisão de composição, coluna Configuração). Bucket, distribuição e domínio vêm de segredos, então os endereços finais não estão no snapshot. Não há Dockerfile, compose nem outro artefato de deploy, e não há backend. As ocorrências `ops-hosting` do README (README.md:453, 464, 477, 479, 481) descrevem o mesmo S3 + CloudFront e os segredos dos workflows; são documentação e não decidem a coluna Deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/auth | separado | separado | `s3://<bucket>/auth/latest`, servido em `<domínio>/auth/latest/` (.github/workflows/auth.yml:26; packages/auth/config/webpack.prod.js:12); `http://localhost:8082` em desenvolvimento (packages/auth/config/webpack.dev.js:9) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:8-23 (configuração de produção própria, `remoteEntry.js`); .github/workflows/auth.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/auth.yml:20-23 (instala e constrói); .github/workflows/auth.yml:26 (sync para o prefixo próprio); .github/workflows/auth.yml:32 (invalidação do `index.html`) |
| 2 | packages/container | separado | separado | `s3://<bucket>/container/latest`, servido em `<domínio>/container/latest/` (.github/workflows/container.yml:26; packages/container/config/webpack.prod.js:12); `http://localhost:8080` em desenvolvimento (packages/container/config/webpack.dev.js:9) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:6-24 (configuração de produção com os remotes em `PRODUCTION_DOMAIN`); .github/workflows/container.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/container.yml:20-23 (build com `PRODUCTION_DOMAIN`); .github/workflows/container.yml:26 (sync para o prefixo próprio); .github/workflows/container.yml:32 (invalidação do `index.html`) |
| 3 | packages/dashboard | separado | separado | `s3://<bucket>/dashboard/latest`, servido em `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:26; packages/dashboard/config/webpack.prod.js:12); `http://localhost:8083` em desenvolvimento (packages/dashboard/config/webpack.dev.js:10) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:8-28 (configuração de produção própria, `remoteEntry.js`); .github/workflows/dashboard.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/dashboard.yml:20-23 (instala e constrói); .github/workflows/dashboard.yml:26 (sync para o prefixo próprio); .github/workflows/dashboard.yml:32 (invalidação do `index.html`) |
| 4 | packages/marketing | separado | separado | `s3://<bucket>/marketing/latest`, servido em `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:24; packages/marketing/config/webpack.prod.js:10); `http://localhost:8081` em desenvolvimento (packages/marketing/config/webpack.dev.js:10) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-21 (configuração de produção própria, `remoteEntry.js`); .github/workflows/marketing.yml:3-12 (gatilho e diretório da aplicação); .github/workflows/marketing.yml:20-21 (instala e constrói); .github/workflows/marketing.yml:24 (sync para o prefixo próprio); .github/workflows/marketing.yml:30 (invalidação do `remoteEntry.js`) |

## Observações

**1. packages/auth.** Build próprio com a configuração de produção do pacote, que gera o `remoteEntry.js` do remote `auth` com `publicPath` `/auth/latest/` (packages/auth/config/webpack.prod.js:12, 15-21). O workflow `deploy-auth` só dispara com mudanças em `packages/auth/**` e publica apenas o `dist` deste pacote no prefixo `auth/latest` (.github/workflows/auth.yml:7-8, 26), o que sustenta deploy `separado`, embora o bucket e a distribuição sejam os mesmos dos outros pacotes. Invalida `index.html` em vez do `remoteEntry.js` (.github/workflows/auth.yml:32). Recebe `PRODUCTION_DOMAIN` sem usá-lo (packages/auth/config/webpack.prod.js:6). O prefixo é sempre `latest`; a versão `1.0.0` (packages/auth/package.json:3) não entra na publicação.

**2. packages/container.** Build próprio; é o único que depende de `PRODUCTION_DOMAIN`, interpolado nas URLs dos três remotes (packages/container/config/webpack.prod.js:6, 17-21) e fornecido pelo workflow (.github/workflows/container.yml:21-23). O workflow `deploy-container` publica só o `dist` do container em `container/latest` e invalida o `index.html`, a página de entrada do shell (.github/workflows/container.yml:26, 32). Os remotes não entram no artefato do container: são carregados em tempo de execução dos prefixos deles, de modo que o container é publicado sem reconstruir os demais. Versão `1.0.0` sem uso na publicação (packages/container/package.json:3).

**3. packages/dashboard.** Build próprio do remote Vue, com `remoteEntry.js` e `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:12, 15-27). O workflow `deploy-dashboard` publica só este pacote em `dashboard/latest` (.github/workflows/dashboard.yml:7-8, 26). Como no auth, invalida `index.html` e não o `remoteEntry.js` (.github/workflows/dashboard.yml:32) e recebe `PRODUCTION_DOMAIN` sem usá-lo (packages/dashboard/config/webpack.prod.js:6). Versão `1.0.0` sem uso na publicação (packages/dashboard/package.json:3).

**4. packages/marketing.** Build próprio, com `remoteEntry.js` e `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10, 13-20). O workflow `deploy-marketing` publica só este pacote em `marketing/latest` (.github/workflows/marketing.yml:7-8, 24) e é o único que invalida o `remoteEntry.js` (.github/workflows/marketing.yml:30); também é o único que não passa `PRODUCTION_DOMAIN` ao build (.github/workflows/marketing.yml:21), coerente com a configuração, que não lê a variável. Versão `1.0.0` sem uso na publicação (packages/marketing/package.json:3).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (separado: 4). Versionamento independente: 0.
