---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
url: https://github.com/EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [runtime-script]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 002 — EnjoyFX/fe_containerize

## Contexto

Aplicação de demonstração (`README.md`, "Демо застосунок") com host `frontend/`, widget `microfrontend/`, backend NestJS (`backend/`) e banco (`db/`). A composição é feita por carga dinâmica de um bundle IIFE em runtime, com contrato `mount`/`unmount` registrado em global, fora das três abordagens inicialmente previstas (Module Federation, single-spa e Web Components).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | Nenhuma dependência de MFE (sem Module Federation, single-spa ou Web Components); `frontend/package.json` e `microfrontend/package.json` só têm React e Vite | ausente |
| Estrutura | Duas unidades frontend: `frontend/` e `microfrontend/`, cada uma com `package.json`, `vite.config.js`, `Dockerfile`, `nginx.conf` e entry point próprios; versões independentes (`frontend/package.json:4` 1.0.0, `microfrontend/package.json:4` 1.0.1) | forte |
| Estrutura | `backend/` (NestJS) e `db/` não são unidades frontend | contexto |
| Configuração | `microfrontend/vite.config.js:25-29`: `build.lib` com `name: 'MicroFrontendWidget'` e `formats: ['iife']`, o global que o host espera | moderada |
| Código-fonte (exposição) | `microfrontend/src/main.jsx:7` `export function mount(container)` e `:14` `export function unmount(container)` | forte |
| Código-fonte (consumo) | `frontend/src/RemoteWidget.jsx:8` injeta `<script>` dinamicamente; `:13-14` chama `window.MicroFrontendWidget.mount(container)`; `:25-26` chama `unmount` na limpeza; `frontend/src/App.jsx:802` renderiza `<RemoteWidget src="/mfe/widget.iife.js?v=...">` no painel lateral | forte |
| Código-fonte | Busca por imports diretos entre `frontend/src` e `microfrontend/src`: nenhum (sustenta a independência das unidades) | ausente |
| Composição | `frontend/nginx.conf:57-58`: `location /mfe/ { proxy_pass http://microfrontend:80/; }` liga host e widget pela rede | forte |
| Build/deploy | `docker-compose.yml:35-36` serviço `microfrontend` com build próprio; `:46` `frontend` depende de `microfrontend`; `helm/fe-containerize/templates/microfrontend.yaml:2-4` `Deployment` próprio (`:44` `Service`) | forte |
| Documentação | `README.md:17` "loads JS bundle at runtime" no diagrama; `README.md:32` `microfrontend` descrito como "Незалежний widget" (widget independente); coerente com o código | moderada |
| Histórico | `640fb99`, `d7bbe3d` (versão própria do widget), `f36930d` "Disable caching for microfrontend assets to prevent stale bundles", `bbd5537` "Add cache-busting query param to widget.iife.js URL" | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `frontend/` e `microfrontend/`, duas unidades frontend no repositório |
| Q2 | Yes | Entry, build, imagem e deploy próprios (`docker-compose.yml:35-36`, `helm/.../microfrontend.yaml`); sem import de código-fonte entre as unidades |
| Q3 | Yes | O host (`frontend`) monta o widget na mesma tela (`App.jsx:802`, `RemoteWidget.jsx:13-14`) |
| Q4 | Yes | Mecanismo configurado e em uso: build IIFE com global (`vite.config.js:25-29`), contrato `mount`/`unmount` (`main.jsx:7,14`), carga em runtime (`RemoteWidget.jsx:8`) e proxy (`nginx.conf:57-58`) |
| Q5 | Yes | Q1–Q4 convergem |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde ao caso de inclusão "examples, templates, and proofs of concept that actually compose frontend units": a composição é simples (um único widget, sem roteamento nem comunicação entre MFEs), mas é explícita e observável no código e na infraestrutura.
- Não cai em nenhum caso Non-MFE: não há dependência morta, nem só menção ao termo, nem apps sem composição.
- A carga é por `<script>` em runtime, não por link nem iframe, então não depende das decisões em aberto do checklist.

## Notas para análise

- **RQ1:** evidência arquitetural sem evidência de tecnologia; nenhuma dependência associada a MFE, e o MFE aparece só em código-fonte, build e infraestrutura.
- **RQ2:** abordagem emergente (IIFE + global + `mount`/`unmount`), fora de Module Federation, single-spa e Web Components.
