---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
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

# 273 — kod88vn/poc_next_mfa

## Leitura do repositório

Monorepo npm com `workspaces` `apps/*` e `packages/*` (package.json:4-7), orquestrado pelo
Turborepo. O `build` da raiz só chama `turbo build` (package.json:9), e a tarefa `build` do
`turbo.json` roda o build de cada pacote depois dos de suas dependências (`dependsOn: ["^build"]`)
e guarda como saída `.next/**` e `dist/**` de cada um (turbo.json:6-10). As três apps Next.js têm
o mesmo script `build: next build` (apps/shell/package.json:6; apps/shop/package.json:6;
apps/duda/package.json:6), que gera o `.next` de cada uma no seu diretório. A biblioteca
`packages/ui` não tem script de build (packages/ui/package.json:13-16) e é compilada dentro de
cada app por `transpilePackages: ['@repo/ui']` (apps/shell/next.config.js:9;
apps/shop/next.config.js:23; apps/duda/next.config.js:8). O README diz que o pipeline garante que
`packages/ui` seja construído antes das apps (README.md:84), mas, sem script `build` no pacote, o
`^build` não tem o que rodar nele. Os três `next.config.js` carregam o `.env` da raiz por
`load-root-env.js` (ex.: apps/shell/next.config.js:2; load-root-env.js:4-28), só para variáveis
como `DUDA_ORIGIN` (turbo.json:4).

Não há artefato de deploy no snapshot: nenhum Dockerfile, compose, workflow de CI, manifesto de
hospedagem nem configuração de proxy. O `matches.csv` não tem ocorrências `ops-*`, `ci-*` nem
`cfg-public-path` (só o cabeçalho). O `.gitignore` ignora `.vercel` (.gitignore:31-32), mas isso
não é configuração de hospedagem. O que existe é de execução local: cada app sobe com
`next dev` ou `next start` numa porta fixa — 3000 no shell, 3001 no shop e 3002 na duda
(apps/shell/package.json:7, 9; apps/shop/package.json:7, 9; apps/duda/package.json:7, 9) — e o
shell encaminha `/duda` e `/shop` para `http://localhost:3002` e `http://localhost:3001`
(apps/shell/next.config.js:25-43). As zonas liberam CORS para `http://localhost:3000`, e o
comentário do shop pede para trocar pela origem real "In a production deployment"
(apps/shop/next.config.js:26-38; apps/duda/next.config.js:10-19). O README fala em
"independent deployability" (README.md:3), mas documentação não decide a coluna Deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/duda | separado | não observado | `/duda` pelo shell (apps/shell/next.config.js:28-31); `http://localhost:3002/duda` (apps/duda/next.config.js:6; apps/duda/package.json:7, 9) | No | apps/duda/package.json:6 (`next build`); apps/duda/next.config.js:5-23 (`basePath: '/duda'`, `transpilePackages`); package.json:9 (`turbo build`); turbo.json:6-10 (tarefa `build`, saída `.next/**`) |
| 2 | apps/shell | separado | não observado | `http://localhost:3000/` (apps/shell/package.json:7, 9) | No | apps/shell/package.json:6 (`next build`); apps/shell/next.config.js:5-44 (`transpilePackages`, `rewrites()` para as zonas); package.json:9 (`turbo build`); turbo.json:6-10 (tarefa `build`, saída `.next/**`) |
| 3 | apps/shop | separado | não observado | `/shop` e `/shop/:path*` pelo shell (apps/shell/next.config.js:32-41); `http://localhost:3001/shop` (apps/shop/next.config.js:19; apps/shop/package.json:7, 9) | No | apps/shop/package.json:6 (`next build`); apps/shop/next.config.js:5-42 (`basePath: '/shop'`, `transpilePackages`); package.json:9 (`turbo build`); turbo.json:6-10 (tarefa `build`, saída `.next/**`) |

## Observações

**1. apps/duda.** Build próprio por `next build` (apps/duda/package.json:6), com `basePath: '/duda'`
(apps/duda/next.config.js:6); o `.next` gerado é só dela, ainda que o `turbo build` da raiz dispare
os builds das três (package.json:9). O código de `@repo/ui` entra no artefato dela por
`transpilePackages` (apps/duda/next.config.js:8), o que é código compartilhado, não build conjunto
com outra aplicação. Nenhum artefato a empacota ou publica: só os scripts `dev`/`start` na porta
3002 (apps/duda/package.json:7, 9), por isso o deploy é `não observado`. O usuário chega a ela
pelo rewrite do shell em `/duda` (apps/shell/next.config.js:28-31). `version: "0.0.1"` sem uso em
publicação, num pacote `private` (apps/duda/package.json:3-4).

**2. apps/shell.** Build próprio por `next build` (apps/shell/package.json:6). O `rewrites()` fica
na configuração dele e aponta para endereços fixos de `localhost` (apps/shell/next.config.js:25-43),
então o roteamento só funciona com as zonas rodando na mesma máquina, nas portas dos scripts; não
há variável para trocar esses endereços. Sem artefato de deploy; sobe na porta 3000 por
`next dev`/`next start` (apps/shell/package.json:7, 9). `version: "0.0.1"` sem uso
(apps/shell/package.json:3-4).

**3. apps/shop.** Build próprio por `next build` (apps/shop/package.json:6), com `basePath: '/shop'`
(apps/shop/next.config.js:19). Sem artefato de deploy; sobe na porta 3001 (apps/shop/package.json:7,
9) e é alcançado pelo shell em `/shop` e `/shop/:path*` (apps/shell/next.config.js:32-41). O
cabeçalho CORS fixo em `http://localhost:3000`, com o comentário sobre trocar em produção
(apps/shop/next.config.js:26-38), confirma que a configuração é de execução local.
`version: "0.0.1"` sem uso (apps/shop/package.json:3-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
