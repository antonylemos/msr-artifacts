---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
url: https://github.com/dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 043 — dhiman1987/micro-frontend-demo

## Contexto

- **Abordagem de implementação:** Web Components (custom elements carregados por `<script>` de origens separadas em runtime; app3 é React num custom element com Shadow DOM)
- **Tipo de repositório:** example/proof of concept ("micro-frontend playground", `README.md:3`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Quatro diretórios: `app-shell/` (HTML estático), `app1/` e `app2/` (Vanilla JS, cada um com `index.html` e `app.js` standalone) e `app3/` (React + Vite, com `package.json` e `vite.config.js` próprios) | forte |
| Composição (shell) | `app-shell/index.html:14-15`: `<script type="module" src="http://localhost:3001/app.js">` + `<hello-app>`; `:20-21`: `http://localhost:3002/app.js` + `<world-app>`; `:26-27`: `http://localhost:3003/my-counter-app.iife.js` + `<my-counter-app theme="dark" maxcount="7">` | forte |
| Código-fonte (unidades) | `app1/app.js:1-6`: `customElements.define('hello-app', …)`; `app2/app.js` análogo (`world-app`); `app3/src/MyCounterElement.jsx:6-28`: custom element com `attachShadow`, lê os atributos `theme`/`maxCount` e monta React no shadow root; `:28` `customElements.define('my-counter-app', …)` | forte |
| Configuração (app3) | `app3/vite.config.js:9-15`: `build.lib` com `formats: ['iife']`, `name: 'MyCounterApp'`, `fileName: 'my-counter-app'`, gerando um bundle autocontido para o shell | moderada |
| Código-fonte (contrato) | Atributos HTML como interface host → unidade (`theme`, `maxcount`) | moderada |
| Build/deploy | Cada unidade servida por um `http-server` próprio com CORS em portas distintas (3000–3003) (`README.md:44-70`); app3 com build próprio | moderada |
| Documentação | `README.md:3-8,35`: "3 independently deployed apps… dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy" | moderada |
| Tecnologia | `app3/package.json:13-17`: React, Lit e `@lit/react` (`MyCounterLitElement.jsx` é variante alternativa) | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `app-shell`, `app1`, `app2` e `app3` |
| Q2 | Yes | Cada unidade tem entry e é servida de uma origem própria; app3 tem build próprio; nenhuma importa código-fonte de outra; o shell só referencia URLs |
| Q3 | Yes | O shell monta as três unidades na mesma página (`app-shell/index.html:11-29`) |
| Q4 | Yes | Carga de script em runtime + registro de custom elements, configurados e em uso |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Não é uma "component library using Web Components": cada custom element é uma unidade servida e (segundo o README) implantada separadamente, composta em runtime por um shell; não um pacote de componentes importado em build.
- Corresponde a "examples… and proofs of concept that actually compose frontend units".

## Notas para análise

- **RQ2:** abordagem Web Components pura (sem framework de MFE), com uma unidade React encapsulada em Shadow DOM e build IIFE.
- **RQ1 (simplicidade):** `app1` e `app2` são custom elements triviais (só exibem um texto); o caso é didático, mas o mecanismo de composição é completo.
