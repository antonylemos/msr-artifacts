---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
url: https://github.com/sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Contexto

- **Abordagem de implementação:** Module Federation (webpack 5)
- **Tipo de repositório:** example/proof of concept ("Microfrontends Demo - Complete Working Example", `README.md:1`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Três apps: `shell/`, `header-mf/` e `products-mf/`, cada uma com `package.json`, `webpack.config.js`, `src/index.js` (`import('./bootstrap')`) e `src/bootstrap.js` | forte |
| Configuração (host) | `shell/webpack.config.js:23-26`: `name: 'shell'`, `remotes: { headerMf: 'headerMf@http://localhost:3001/remoteEntry.js', productsMf: 'productsMf@http://localhost:3002/remoteEntry.js' }`; porta 3000 (`:7`) | forte |
| Configuração (remotes) | `header-mf/webpack.config.js:23-26`: `name: 'headerMf'`, `exposes: { './Header' }`; `products-mf/webpack.config.js:23-26`: `name: 'productsMf'`, `exposes: { './Products' }`; `shared` react/react-dom (`:32-39`); portas 3001/3002 | forte |
| Código-fonte (composição) | `shell/src/App.js:3-17`: `React.lazy(() => import('headerMf/Header'))` e `import('productsMf/Products')` com fallback em erro; `:24-34` monta os dois em `Suspense` na mesma página | forte |
| Código-fonte | Nenhum import de código-fonte entre as apps (sustenta a independência das unidades) | ausente |
| Estrutura (lacuna) | `public/index.html` (referenciado em `webpack.config.js:40/46`) não está versionado em nenhuma app; o README pede para "create the project structure" (`README.md:19-20`) (projeto incompleto como está) | ambígua |
| Build/deploy | Dev servers separados (3000–3002); sem CI/CD | fraca |
| Documentação | `README.md:3-11`: "3 Working Applications that can run standalone OR together… Bootstrap Pattern" | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell`, `header-mf` e `products-mf` |
| Q2 | Yes | `webpack.config.js`, entry e porta próprios; sem import de código-fonte entre as apps |
| Q3 | Yes | O shell monta Header e Products na mesma página (`App.js:24-34`) |
| Q4 | Yes | `remotes`/`exposes` configurados e usados via `import('<remote>/<Module>')` (`App.js:5,13`) |
| Q5 | Yes | Q1–Q4 convergem; a ausência de `public/index.html` não afeta a configuração de composição |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes" e a "examples… that actually compose frontend units".

## Notas para análise

- **Composição por componente** (Header + Products numa página), não por rota; fallback por remote em caso de erro de carga (`App.js:5-7,13-15`).
- **Protocolo (completude):** os templates HTML não estão versionados; o build exige criá-los. Registrar se a análise considerar "executabilidade" do snapshot.
