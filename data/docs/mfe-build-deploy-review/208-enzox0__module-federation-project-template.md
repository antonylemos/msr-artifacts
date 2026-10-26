---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
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

# 208 — enzox0/module-federation-project-template

## Leitura do repositório

Template de monorepo pnpm/Turbo com cinco aplicações React/Vite em `apps/`. O build da raiz é `turbo run build` (package.json:12), que executa o `build` de cada membro e guarda o `dist/**` de cada um (turbo.json:5-8). Cada aplicação tem o mesmo script, `tsc && vite build` (por exemplo apps/admin-mf/package.json:8), e o próprio `vite.config.ts` com o plugin de federação (por exemplo apps/admin-mf/vite.config.ts:6-13). `scripts/build-all.sh:3` só repete `pnpm build`.

O empacotamento é feito por um Dockerfile em cada aplicação, todos iguais exceto pela pasta copiada. O estágio `builder` instala dependências e roda `pnpm build` no workspace inteiro (apps/admin-mf/Dockerfile:1-7). O estágio final é uma imagem `nginx:alpine` que recebe só o `dist` da própria aplicação e expõe a porta 80 (apps/admin-mf/Dockerfile:9-12). O shell tem ainda dois Dockerfiles em `infrastructure/docker/`. O de produção repete o do app e acrescenta `infrastructure/nginx/nginx.conf` (infrastructure/docker/production/Dockerfile.shell:9-13), uma configuração de SPA com fallback para `index.html` (infrastructure/nginx/nginx.conf:13-17). O de desenvolvimento roda `pnpm dev` na pasta do shell, porta 3000 (infrastructure/docker/development/Dockerfile.shell:7-9), e não conta como deploy. Não há docker-compose nem outro artefato que construa ou suba essas imagens.

O resto da infraestrutura é esqueleto. O CI roda `pnpm build` e `pnpm lint` no workspace inteiro, sem publicar nada (.github/workflows/ci.yml:23-28), e o `lint.yml` só roda o lint (.github/workflows/lint.yml:18-21). O CD dispara em tags `v*`, mas o passo de deploy só imprime "Deploying..." (.github/workflows/cd.yml:3-6, 14-15), assim como `scripts/deploy.sh:2`. Os manifestos Kubernetes, um por aplicação, e os Terraform de AWS e Cloudflare são só comentários de placeholder (infrastructure/kubernetes/shell/index.yaml:1; infrastructure/kubernetes/admin-mf/index.yaml:1; infrastructure/terraform/aws/index.tf:1; infrastructure/terraform/cloudflare/index.tf:1). O `.changeset/config.json:1-11` configura o Changesets, mas nenhum script ou job o usa para publicar.

Há uma incoerência entre as imagens e o host. O shell espera cada remoto em `http://localhost:300N/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:5-8). As imagens copiam o conteúdo do `dist` para a raiz do nginx (apps/auth-mf/Dockerfile:10) e escutam na porta 80 (apps/auth-mf/Dockerfile:11), então o arquivo ficaria em `/assets/remoteEntry.js`, sem o prefixo `/dist`, e em outra porta. As portas 3000 a 3004 são as dos servidores de desenvolvimento (apps/auth-mf/vite.config.ts:14-17; check-ports.js:10-16). As ocorrências `ops-cors` são o `cors: true` desses servidores de desenvolvimento, no `.ts` e no `.js` compilado de cada app (por exemplo apps/shell/vite.config.ts:16; apps/shell/vite.config.js:15). Nenhum artefato de build ou deploy cobre os pacotes de `packages/*`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/admin-mf | separado | separado | porta 80 da imagem (apps/admin-mf/Dockerfile:11); `http://localhost:3003/dist/assets/remoteEntry.js`, como o shell espera (apps/shell/module-federation.config.ts:7) | No | apps/admin-mf/package.json:8 (`tsc && vite build`); apps/admin-mf/vite.config.ts:6-13 (configuração própria); apps/admin-mf/Dockerfile:1-12 (build do workspace e imagem nginx só com o `dist` do app) |
| 2 | apps/auth-mf | separado | separado | porta 80 da imagem (apps/auth-mf/Dockerfile:11); `http://localhost:3001/dist/assets/remoteEntry.js`, como o shell espera (apps/shell/module-federation.config.ts:5) | No | apps/auth-mf/package.json:8 (`tsc && vite build`); apps/auth-mf/vite.config.ts:6-13 (configuração própria); apps/auth-mf/Dockerfile:1-12 (build do workspace e imagem nginx só com o `dist` do app) |
| 3 | apps/dashboard-mf | separado | separado | porta 80 da imagem (apps/dashboard-mf/Dockerfile:11); `http://localhost:3002/dist/assets/remoteEntry.js`, como o shell espera (apps/shell/module-federation.config.ts:6) | No | apps/dashboard-mf/package.json:8 (`tsc && vite build`); apps/dashboard-mf/vite.config.ts:6-13 (configuração própria); apps/dashboard-mf/Dockerfile:1-12 (build do workspace e imagem nginx só com o `dist` do app) |
| 4 | apps/messaging-mf | separado | separado | porta 80 da imagem (apps/messaging-mf/Dockerfile:11); `http://localhost:3004/dist/assets/remoteEntry.js`, como o shell espera (apps/shell/module-federation.config.ts:8) | No | apps/messaging-mf/package.json:8 (`tsc && vite build`); apps/messaging-mf/vite.config.ts:6-13 (configuração própria); apps/messaging-mf/Dockerfile:1-12 (build do workspace e imagem nginx só com o `dist` do app) |
| 5 | apps/shell | separado | separado | porta 80 da imagem (apps/shell/Dockerfile:11; infrastructure/docker/production/Dockerfile.shell:12), caminho `/` (infrastructure/nginx/nginx.conf:10-17) | No | apps/shell/package.json:8 (`tsc && vite build`); apps/shell/vite.config.ts:6-13 (configuração própria); apps/shell/Dockerfile:1-12 (imagem nginx só com o `dist` do shell); infrastructure/docker/production/Dockerfile.shell:1-13 (imagem nginx do shell com `nginx.conf`); infrastructure/nginx/nginx.conf:9-18 (SPA com fallback para `index.html`) |

## Observações

**1. apps/admin-mf.** O build é próprio: o script `tsc && vite build` (apps/admin-mf/package.json:8) usa a configuração do app (apps/admin-mf/vite.config.ts:6-13) e gera o `dist` dele. O Dockerfile constrói o workspace inteiro (apps/admin-mf/Dockerfile:7), mas a imagem final só leva `apps/admin-mf/dist` (apps/admin-mf/Dockerfile:10), o que sustenta deploy `separado`. Nada no snapshot constrói ou sobe essa imagem: o CD é um `echo` (.github/workflows/cd.yml:15) e o manifesto Kubernetes do app é placeholder (infrastructure/kubernetes/admin-mf/index.yaml:1). O endereço que o shell espera usa a porta de desenvolvimento e o prefixo `/dist`, que a imagem não reproduz (ver "Leitura do repositório"). A versão `0.1.0` (apps/admin-mf/package.json:4) não é usada para publicar; o pacote é `private` (apps/admin-mf/package.json:3).

**2. apps/auth-mf.** Mesma forma do admin-mf: build próprio (apps/auth-mf/package.json:8; apps/auth-mf/vite.config.ts:6-13) e imagem nginx só com `apps/auth-mf/dist` (apps/auth-mf/Dockerfile:10). O manifesto Kubernetes é placeholder (infrastructure/kubernetes/auth-mf/index.yaml:1). O shell o espera na porta 3001 (apps/shell/module-federation.config.ts:5). Sem versionamento usado na publicação.

**3. apps/dashboard-mf.** Mesma forma: build próprio (apps/dashboard-mf/package.json:8; apps/dashboard-mf/vite.config.ts:6-13) e imagem nginx só com `apps/dashboard-mf/dist` (apps/dashboard-mf/Dockerfile:10). Manifesto Kubernetes placeholder (infrastructure/kubernetes/dashboard-mf/index.yaml:1). O shell o espera na porta 3002 (apps/shell/module-federation.config.ts:6). Sem versionamento usado na publicação.

**4. apps/messaging-mf.** Mesma forma: build próprio (apps/messaging-mf/package.json:8; apps/messaging-mf/vite.config.ts:6-13) e imagem nginx só com `apps/messaging-mf/dist` (apps/messaging-mf/Dockerfile:10). Manifesto Kubernetes placeholder (infrastructure/kubernetes/messaging-mf/index.yaml:1). O shell o espera na porta 3004 (apps/shell/module-federation.config.ts:8). Sem versionamento usado na publicação.

**5. apps/shell.** Build próprio (apps/shell/package.json:8; apps/shell/vite.config.ts:6-13). É a única aplicação com duas imagens de produção, ambas só com `apps/shell/dist`: a da pasta do app (apps/shell/Dockerfile:10) e a de `infrastructure/docker/production`, que acrescenta a configuração nginx de SPA (infrastructure/docker/production/Dockerfile.shell:10-11; infrastructure/nginx/nginx.conf:13-17). As duas publicam o shell à parte, então o deploy é `separado`. O Dockerfile de desenvolvimento roda `pnpm dev` (infrastructure/docker/development/Dockerfile.shell:9) e não conta. O shell embute as URLs `localhost` dos remotos no build (apps/shell/module-federation.config.ts:5-8), sem variável de ambiente para produção. Sem versionamento usado na publicação.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (separado: 5). Versionamento independente: 0.
