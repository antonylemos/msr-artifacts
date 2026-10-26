---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Leitura do repositório

Trabalho acadêmico ("PC Build Planner") com quatro aplicações Next.js unidas por Next.js
Multi-Zones: um `shell` e três zonas (`catalog-mfe`, `builds-mfe`, `auth-mfe`), "stitched together
by path rewrites" (README.md:11). O repositório também tem três serviços backend e dois BFFs
(README.md:9-10), que não são unidades frontend.

A composição é por rota no servidor, não por montagem na página. O `shell` declara em `rewrites()`
que `/catalog`, `/builds` e `/auth` (e as subrotas) vão para `CATALOG_URL`, `BUILDS_URL` e
`AUTH_URL`, junto com os assets `/<zona>-static/_next/*` de cada zona (shell/next.config.ts:6-29).
Cada zona serve seus assets com um `assetPrefix` próprio (catalog-mfe/next.config.ts:6,
builds-mfe/next.config.ts:6, auth-mfe/next.config.ts:6), para coexistir sob a origem do shell. O
`docker-compose.yml` liga as variáveis aos serviços das zonas (docker-compose.yml:200-202,
209-211). Cada zona renderiza a página inteira com layout próprio. Nenhum dos tipos de relação
`host → remote`, `root-config → application`, `application → custom-element` ou
`page → embedded-frontend` descreve essa forma de entrada, por isso as três relações do shell
estão como `other`.

A segunda forma de ligação é a sessão. O `auth-mfe` grava o cookie `jwt` com `path=/` depois do
login e do registro (auth-mfe/src/lib/auth-client.ts:20-23, auth-mfe/src/app/auth/login/page.tsx:41,
auth-mfe/src/app/auth/register/page.tsx:46), e as outras três apps o leem no `Header`
(shell/src/components/Header.tsx:12, catalog-mfe/src/components/Header.tsx:12,
builds-mfe/src/components/Header.tsx:12), relendo quando a janela ganha foco (`focus`, linha 16
dos três arquivos). Isso funciona porque as zonas ficam sob a mesma origem do shell.

O que não virou relação: a navegação entre zonas é por link de página inteira (`<a href>` em
shell/src/components/Header.tsx:32, 35, 51 e na lista `sections` de shell/src/app/page.tsx:12, 19,
26), que não é um tipo de relação. O `Header`, o `Footer` e `src/lib/{auth,auth-client,bff,jwt}.ts`
são cópias em cada app, não imports entre unidades. A comunicação com `web-bff`/`mobile-bff` é com
backend, não entre frontends.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | auth-mfe | other | origem → destino | other | Yes | Yes | shell/next.config.ts:9, 23-28 (`AUTH_URL`; `/auth`, `/auth/:path+`, `/auth-static/_next/:path+`); docker-compose.yml:202, 211 (`AUTH_URL: http://auth-mfe:3003`); auth-mfe/next.config.ts:6 (`assetPrefix: "/auth-static"`) | shell/next.config.ts:6 |
| 2 | shell | builds-mfe | other | origem → destino | other | Yes | Yes | shell/next.config.ts:8, 17-22 (`BUILDS_URL`; `/builds`, `/builds/:path+`, `/builds-static/_next/:path+`); docker-compose.yml:201, 210 (`BUILDS_URL: http://builds-mfe:3002`); builds-mfe/next.config.ts:6 (`assetPrefix: "/builds-static"`) | shell/next.config.ts:6 |
| 3 | shell | catalog-mfe | other | origem → destino | other | Yes | Yes | shell/next.config.ts:7, 11-16 (`CATALOG_URL`; `/catalog`, `/catalog/:path+`, `/catalog-static/_next/:path+`); docker-compose.yml:200, 209 (`CATALOG_URL: http://catalog-mfe:3001`); catalog-mfe/next.config.ts:6 (`assetPrefix: "/catalog-static"`) | shell/next.config.ts:6 |
| 4 | auth-mfe | builds-mfe | communication | origem → destino | other | Yes | Yes | — | auth-mfe/src/lib/auth-client.ts:20 |
| 5 | auth-mfe | catalog-mfe | communication | origem → destino | other | Yes | Yes | — | auth-mfe/src/lib/auth-client.ts:20 |
| 6 | auth-mfe | shell | communication | origem → destino | other | Yes | Yes | — | auth-mfe/src/lib/auth-client.ts:20 |

## Observações

**1. shell → auth-mfe.** O shell repassa `/auth`, `/auth/:path+` e os assets `/auth-static/_next/:path+`
para `AUTH_URL` (shell/next.config.ts:9, 23-28). O destino foi resolvido por três
correspondências: `AUTH_URL: http://auth-mfe:3003` aponta para o serviço `auth-mfe`
(docker-compose.yml:211, também como build arg em docker-compose.yml:202), que é construído de
`./auth-mfe` (docker-compose.yml:158); o prefixo `/auth-static` é o `assetPrefix` da zona
(auth-mfe/next.config.ts:6); e a rota `/auth` existe em `auth-mfe/src/app/auth/page.tsx`. Tipo e
mecanismo são `other`: o shell não carrega módulos da zona nem a registra num orquestrador. Ele
encaminha requisições de um caminho para outra aplicação, que responde com a página inteira (Next.js
Multi-Zones, roteamento por `rewrites`). A direção é a do encaminhamento.

**2. shell → builds-mfe.** Mesmo padrão com `/builds`, `/builds/:path+` e `/builds-static/_next/:path+`
para `BUILDS_URL` (shell/next.config.ts:8, 17-22). `BUILDS_URL: http://builds-mfe:3002`
(docker-compose.yml:201, 210) aponta para o serviço construído de `./builds-mfe`
(docker-compose.yml:184), cujo `assetPrefix` é `/builds-static` (builds-mfe/next.config.ts:6), e a
rota `/builds` existe em `builds-mfe/src/app/builds/page.tsx`.

**3. shell → catalog-mfe.** Mesmo padrão com `/catalog`, `/catalog/:path+` e
`/catalog-static/_next/:path+` para `CATALOG_URL` (shell/next.config.ts:7, 11-16).
`CATALOG_URL: http://catalog-mfe:3001` (docker-compose.yml:200, 209) aponta para o serviço
construído de `./catalog-mfe` (docker-compose.yml:171), cujo `assetPrefix` é `/catalog-static`
(catalog-mfe/next.config.ts:6), e a rota `/catalog` existe em `catalog-mfe/src/app/catalog/page.tsx`.
Os valores-padrão em `localhost:3001-3003` (shell/next.config.ts:7-9) só corroboram as três
resoluções.

**4. auth-mfe → builds-mfe.** O `auth-mfe` grava o cookie `jwt` com `path=/`
(auth-mfe/src/lib/auth-client.ts:20-23; nome em auth-mfe/src/lib/jwt.ts:7) após o login e o
registro (auth-mfe/src/app/auth/login/page.tsx:41, auth-mfe/src/app/auth/register/page.tsx:46).
O `builds-mfe` lê o cookie no `Header` (builds-mfe/src/components/Header.tsx:12) e antes de criar
uma build, mandando para `/auth/login` quando não há sessão
(builds-mfe/src/app/builds/new/new-build-form.tsx:59-62). Mecanismo `other`: é estado
compartilhado por cookie sob a mesma origem, não troca de eventos. A leitura só vê o cookie porque
o shell une as zonas numa origem (relações 1-3). O logout de cada app apaga o cookie
(`clearJwtCookie` em builds-mfe/src/components/Header.tsx:21, e igual nos outros três `Header.tsx`).
A revisão de código-fonte não registrou essas linhas, então a direção fica a da gravação da
sessão, a única construção registrada.

**5. auth-mfe → catalog-mfe.** Mesma sessão: o `catalog-mfe` lê o cookie no `Header`
(catalog-mfe/src/components/Header.tsx:12) para mostrar o usuário e o botão de logout. Vale a mesma
observação sobre `clearJwtCookie` (catalog-mfe/src/components/Header.tsx:21).

**6. auth-mfe → shell.** Mesma sessão: o shell lê o cookie no `Header`
(shell/src/components/Header.tsx:12). Vale a mesma observação sobre `clearJwtCookie`
(shell/src/components/Header.tsx:21).

## Resumo

Relações: 6 (other: 3, communication: 3). Ativas: 6. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
