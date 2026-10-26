---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-html-external-script | users-service/src/identity/api/openapi.ts:188 | — | none | No | `<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js">` dentro do HTML da Swagger UI do serviço (`swaggerHtml`, users-service/src/identity/api/openapi.ts:179-191, servido na rota `/swagger` em users-service/src/identity/api/openapi.ts:200-203); carrega uma biblioteca de CDN, não o bundle de outra unidade. `users-service` é `No` na revisão estrutural e `.` também, por isso a unidade é `—` |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/next.config.ts:6 | shell | host-relationship | Yes | `async rewrites()` declara quais aplicações o shell usa e sob quais caminhos: `/catalog` e `/catalog/:path+` para `CATALOG_URL`, `/builds` para `BUILDS_URL`, `/auth` para `AUTH_URL`, mais os assets `/<zona>-static/_next/:path+` de cada zona (shell/next.config.ts:6-30); os destinos são as apps `catalog-mfe`, `builds-mfe` e `auth-mfe`, ligadas por `CATALOG_URL`, `BUILDS_URL` e `AUTH_URL` em docker-compose.yml:209-211, e cada zona responde no caminho declarado por seu `assetPrefix` (catalog-mfe/next.config.ts:6, builds-mfe/next.config.ts:6, auth-mfe/next.config.ts:6). Config exportada como `nextConfig` em shell/next.config.ts:33 |
| manual | auth-mfe/src/lib/auth-client.ts:20 | auth-mfe | communication | Yes | `setJwtCookie` grava o cookie `jwt` com `path=/` (auth-mfe/src/lib/auth-client.ts:22; nome em auth-mfe/src/lib/jwt.ts:7), compartilhando a sessão com as outras zonas sob a mesma origem do shell; disparado após o login e o registro (auth-mfe/src/app/auth/login/page.tsx:41, auth-mfe/src/app/auth/register/page.tsx:46) e lido pelas demais unidades em shell/src/components/Header.tsx:12, catalog-mfe/src/components/Header.tsx:12 e builds-mfe/src/components/Header.tsx:12 (`readJwtFromDocument`), além de builds-mfe/src/app/builds/new/new-build-form.tsx:59 |

## Resumo

Construções com composição: 2 (host-relationship: 1, communication: 1).

## Notas

- O `matches.csv` tem uma única linha `src-*`, e ela é de um serviço backend: nenhum padrão `src-*` acertou as quatro apps frontend. A composição deste repositório é por rota no servidor (Next.js Multi-Zones), que a mineração pegou com padrões `cfg-*` (`cfg-route-rewrites` em shell/next.config.ts:6; `cfg-zone-path` em auth-mfe/next.config.ts:6, builds-mfe/next.config.ts:6 e catalog-mfe/next.config.ts:6).
- Decisão do pesquisador (23/10/2026), válida só para este repositório: a exclusão do passo 4 ("construção que não está no `matches.csv`") vale só para as ocorrências `src-*`, por isso shell/next.config.ts:6 entrou como linha manual `host-relationship` / `Yes`, mesmo sendo ocorrência `cfg-route-rewrites` no `matches.csv`.
- A busca do passo 4 (`import(`, `React.lazy`, `loadRemote*`, `customElements`, `registerApplication`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script'`) não retornou nada em shell, auth-mfe, catalog-mfe e builds-mfe: não há carregamento, resolução, montagem nem embutimento de uma unidade dentro de outra no código-fonte.
- A navegação entre zonas é por link de página inteira (`<a href="/catalog">`, `<a href="/builds">`, `<a href="/auth/login">` em shell/src/components/Header.tsx:32,35,51 e a lista `sections` em shell/src/app/page.tsx:10-32). Link de navegação não é um dos tipos do passo 4 nem tem categoria no vocabulário, por isso não virou linha.
- Header, Footer e `src/lib/{auth,auth-client,bff,jwt}.ts` são cópias idênticas em cada app (ex.: auth-client.ts igual nas quatro, linhas 1-28); nenhuma app importa código de outra. O cookie `jwt` é o único mecanismo de troca entre unidades no código-fonte.
- `src/lib/bff.ts` e `src/lib/auth.ts` falam com os BFFs (`web-bff`, `mobile-bff`), que a revisão estrutural julgou `No`; comunicação com backend, não entre unidades frontend.
