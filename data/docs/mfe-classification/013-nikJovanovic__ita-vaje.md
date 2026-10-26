---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
url: https://github.com/nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 013 — nikJovanovic/ita-vaje

## Contexto

- **Abordagem de implementação:** Next.js Multi-Zones, com composição por rota via `rewrites` no shell e navegação entre zonas por link (fora das três abordagens iniciais)
- **Tipo de repositório:** example/proof of concept (trabalho acadêmico, "vaje" = exercícios; "PC Build Planner")
- **Classificação:** MFE-implemented (depende de uma decisão em aberto; ver revisão)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Quatro apps Next.js: `shell/`, `catalog-mfe/`, `builds-mfe/` e `auth-mfe/`, cada uma com `package.json`, `next.config.ts`, `Dockerfile`, `src/app/layout.tsx` e testes próprios; mais cinco serviços backend (`parts-service`, `builds-service`, `users-service`, `web-bff`, `mobile-bff`) | forte |
| Configuração (host) | `shell/next.config.ts:6-29`: `rewrites()` mapeia `/catalog`, `/builds` e `/auth` (e os assets `/<zona>-static/_next/*`) para `CATALOG_URL` (3001), `BUILDS_URL` (3002) e `AUTH_URL` (3003) | forte |
| Configuração (zonas) | `catalog-mfe/next.config.ts:6`, `builds-mfe/next.config.ts:6`, `auth-mfe/next.config.ts:6`: `assetPrefix` próprio (`/catalog-static`, `/builds-static`, `/auth-static`) para coexistir sob a mesma origem do shell | forte |
| Código-fonte (navegação) | `shell/src/components/Header.tsx:28-37`: `<a href="/">`, `<a href="/catalog">`, `<a href="/builds">`, links simples (navegação completa entre zonas); cada zona renderiza a página inteira com o próprio layout | moderada |
| Código-fonte (duplicação) | `Header.tsx`, `Footer.tsx` e `src/lib/{auth,auth-client,bff,jwt}.ts` duplicados em cada app (cópia, não import); nenhuma app importa código-fonte de outra (sustenta a independência das unidades) | moderada |
| Código-fonte (estado compartilhado) | Sessão compartilhada por cookie JWT lido em cada zona (`Header.tsx:5,12`, `readJwtFromDocument`) | moderada |
| Build/deploy | `docker-compose.yml:157-211`: um serviço por zona; o `shell` recebe `CATALOG_URL`/`BUILDS_URL`/`AUTH_URL` (`:200-202`, `:209-211`); `.github/workflows/{shell,catalog-mfe,builds-mfe,auth-mfe}.yml` com CI por app, disparado por `paths` (`catalog-mfe.yml:3-7`) | forte |
| Documentação | `README.md:11` "Micro-Frontends (Next.js Multi-Zones) — one shell + 3 feature zones stitched together by path rewrites. Each zone is its own Next.js app, own Dockerfile, own CI pipeline."; diagrama em `README.md:14-45`; seção `:60` | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell`, `catalog-mfe`, `builds-mfe` e `auth-mfe` |
| Q2 | Yes | Entry, build, Dockerfile, CI e serviço próprios por app; código comum duplicado, não importado |
| Q3 | Yes | O shell roteia `/catalog`, `/builds` e `/auth` para as zonas sob a mesma origem (`shell/next.config.ts:10-28`) |
| Q4 | Yes | `rewrites` no shell + `assetPrefix` nas zonas, configurados e conectados no `docker-compose.yml:200-211` |
| Q5 | Yes | Q1–Q4 convergem; ver ponto de revisão abaixo |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de MFE-implemented.
- Multi-Zones é um mecanismo documentado pelo Next.js para micro-frontends: o shell funciona como roteador reverso de caminhos, e cada zona entrega sua fatia vertical da aplicação.
- Corresponde a "monorepos containing a host and its remotes", aqui com composição por rota no servidor em vez de montagem no cliente.

## Notas para análise

- **RQ2:** abordagem emergente (Next.js Multi-Zones / composição por rota no servidor).
- **RQ3:** a independência se sustenta com duplicação de código (Header, auth) e sessão compartilhada por cookie JWT, sem lib compartilhada.

## Ponto para revisão conjunta

- A composição acontece no nível de rota: o shell não monta as zonas na mesma página; cada zona serve páginas inteiras, e a troca entre zonas é uma navegação completa por `<a href>`.
- Isso fica perto da decisão em aberto "link-only or iframe composition". Considerei Q4 = Yes porque há mais que links: o `rewrites` do shell une as zonas sob uma origem e um espaço de rotas, e os `assetPrefix` coordenam os assets, ou seja, há configuração de composição explícita.
- Se a decisão em aberto for resolvida exigindo composição na mesma página (client-side), este repositório passa a Non-MFE ("multiple frontend applications without explicit composition" não se aplica literalmente, mas Q3/Q4 cairiam).
- Sugestão de regra: "composição por roteamento de caminhos (reverse proxy, rewrites, Multi-Zones) sob uma mesma origem conta como mecanismo de composição para Q4; links entre aplicações em origens distintas não contam".
