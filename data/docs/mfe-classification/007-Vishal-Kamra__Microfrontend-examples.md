---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
url: https://github.com/Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Contexto

- **Abordagem de implementação:** Module Federation (webpack 5 `ModuleFederationPlugin`) com contrato `mount(el)` exportado pelos remotes
- **Tipo de repositório:** example/proof of concept (nome "Microfrontend-examples", dois exemplos didáticos, sem README)
- **Commit avaliado:** `eeb8488` (único commit do repositório)

## Evidências observadas

O repositório contém dois exemplos independentes, `simple-js/` e `react-js/`. Pelo protocolo (seção 3.1), os dois exemplos contam como observações de uma mesma implementação do repositório, não como implementações separadas.

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura (`simple-js`) | Três unidades, `Container/`, `Products/` e `Cart/`, cada uma com `package.json`, `webpack.config.js`, `public/index.html` e `src/index.js` próprios | forte |
| Configuração (`simple-js`, host) | `simple-js/Container/webpack.config.js:10-15`: `name: "container"`, `remotes` para `products@…:8081/remoteEntry.js` e `cart@…:8082/remoteEntry.js` | forte |
| Configuração (`simple-js`, remotes) | `simple-js/Products/webpack.config.js:10-16` expõe `./ProductsIndex`; `simple-js/Cart/webpack.config.js:10-16` expõe `./CartShow`; ambos com `shared` singleton de `@faker-js/faker` | forte |
| Código-fonte (`simple-js`) | `simple-js/Container/src/index.js:1` `import('./bootstrap')`; `simple-js/Container/src/bootstrap.js:1-5` importa `mount` de `products/ProductsIndex` e `cart/CartShow` e monta nos elementos `#dev-products` e `#dev-cart` (`public/index.html:9-10`) | forte |
| Código-fonte (`simple-js`) | `simple-js/Products/src/bootstrap.js:3` e `simple-js/Cart/src/bootstrap.js:3` exportam `mount(el)`; `:14-18` / `:10-14` montam isoladamente em desenvolvimento | forte |
| Estrutura (`react-js`) | `container/` e `marketing/` completos; `auth/` e `dashboard/` (Vue) só têm `package.json`, sem código nem config (parcial) | forte |
| Configuração (`react-js`) | `react-js/container/config/webpack.dev.js:19-25`: `remotes: { marketing }`; `react-js/marketing/config/webpack.dev.js:19-26`: expõe `./MarketingApp`; `shared: packageJson.dependencies` | forte |
| Código-fonte (`react-js`) | `react-js/container/src/components/MarketingApp.js:3-12` importa `mount` de `marketing/MarketingApp` e monta via `useRef`/`useEffect`; `react-js/container/src/App.js:8` renderiza `<MarketingApp />`; `react-js/marketing/src/bootstrap.js:6-22` exporta `mount` | forte |
| Build/deploy | `react-js/*/config/webpack.prod.js` estão vazios; nenhum CI/CD, Dockerfile nem config de hospedagem. Só servidores de desenvolvimento em portas distintas (8080/8081/8082). | fraca |
| Código-fonte | Nenhuma unidade importa código-fonte de outra diretamente; tudo passa pelo MF (sustenta a independência das unidades) | ausente |
| Documentação | Sem README | ausente |
| Histórico | Um único commit | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `simple-js`: `Container`, `Products` e `Cart`; `react-js`: `container` e `marketing` |
| Q2 | Yes | Entry, `webpack.config` e dev server próprios por unidade; sem import de código-fonte entre unidades. Não há deploy independente, mas o checklist só exige entry e build próprios. |
| Q3 | Yes | O container monta os remotes na mesma página (`simple-js/Container/src/bootstrap.js:4-5`; `react-js/container/src/App.js:8`) |
| Q4 | Yes | MF configurado nos dois lados (`remotes`/`exposes`) e usado via import de módulos remotos (`bootstrap.js:1-2`, `MarketingApp.js:3`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "examples, templates, and proofs of concept that actually compose frontend units" e a "monorepos containing a host and its remotes" (duas vezes).
- O exemplo `react-js` está incompleto (`auth` e `dashboard` são só manifestos, e as configs de produção estão vazias), mas `container` + `marketing` já satisfazem o checklist. O `simple-js` está completo.

## Notas para análise

- **RQ1:** a evidência é toda de configuração e código; não há documentação, deploy nem histórico. É um caso típico de exemplo didático no padrão `mount(el)` + `bootstrap` assíncrono.
- **RQ2:** `dashboard/package.json` declara Vue 3, o que indica a intenção de um exemplo multi-framework (React + Vue), mas sem implementação no snapshot; não conta como híbrido.
