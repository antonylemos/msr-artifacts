---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
url: https://github.com/mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 045 — mrgleam/mf-tanstack-demo

## Contexto

- **Abordagem de implementação:** Module Federation (`@originjs/vite-plugin-federation`) com composição de rotas do TanStack Router; gateway Kong para roteamento
- **Tipo de repositório:** example/proof of concept ("demo", `README.md:1`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `shell/` (host) e `shop/` (remote), cada um com `package.json`, `vite.config.ts`, `index.html` e `src/main.tsx`; `kong-shell/` e `kong-remote/` com configs de gateway (`README.md:5-11`) | forte |
| Configuração (host) | `shell/vite.config.ts:8-13`: `federation({ remotes: { shop: 'http://localhost:3001/shop/assets/remoteEntry.js' }, shared: [react, react-dom, @tanstack/react-router] })` | forte |
| Configuração (remote) | `shop/vite.config.ts:6-14`: `base: '/shop/'`, `federation({ name: 'shop', filename: 'remoteEntry.js', exposes: { './ShopRoutes': './src/routes/ShopRoutes.tsx' } })` | forte |
| Código-fonte (carga) | `shell/src/moduleLoader.ts:26-81`: loader com cache, retries e fallback; `:127-136`: `MODULE_CONFIGS.shop` com `import('shop/ShopRoutes')` e fallback `{ routes: [] }` | forte |
| Código-fonte (composição) | `shell/src/router.tsx:53-92`: carrega os módulos configurados e enxerta as rotas remotas (`shopRoutes`) na árvore de rotas do shell (`replaceParentRoute(modules.shopRoutes, root)`) | forte |
| Configuração (gateway) | `kong-remote/kong.yml:3-12`: `/` → shell (3000), `/shop` → shop (3001); `kong-shell/kong.yml:4-8`: só `/` → shell (layout controlado pelo shell) | moderada |
| Código-fonte | Nenhum import de código-fonte entre `shell` e `shop` (sustenta a independência das unidades) | ausente |
| Documentação | `README.md:1` "Microfrontend Monorepo with Vite, TanStack Router, and Module Federation"; `:7-10` papéis de host, remote e gateway | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell` e `shop` |
| Q2 | Yes | Entry, `vite.config.ts` e dev server próprios (3000/3001); sem import de código-fonte entre as apps |
| Q3 | Yes | O shell enxerta as rotas do `shop` no seu roteador (`router.tsx:53-92`) |
| Q4 | Yes | `remotes`/`exposes` configurados e usados via `import('shop/ShopRoutes')` (`moduleLoader.ts:130`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes".

## Notas para análise

- **RQ3:** o remote expõe **rotas** (não um componente) e o host as integra na árvore do TanStack Router, uma composição no nível de roteamento.
- **RQ3 (resiliência):** loader com retry e fallback (`moduleLoader.ts`) para o caso de o remote estar fora do ar, um artefato que mostra a preocupação com a independência de deploy.
- **RQ3 (gateway):** as duas configs Kong mostram dois modos de acesso: remote via shell (`kong-shell`) ou também standalone (`kong-remote`).
