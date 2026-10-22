---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
url: https://github.com/viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Contexto

- **Abordagem de implementação:** Module Federation (`@originjs/vite-plugin-federation`)
- **Tipo de repositório:** example/proof of concept (trabalho de disciplina, "Emerging Technologies Lab Assignment 3": frontend MF + microsserviços GraphQL)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `client/shell-app`, `client/auth-app` e `client/community-app`, cada um com `package.json`, `vite.config.js`, `index.html` e `src/main.jsx`; `server/` com gateway e microsserviços GraphQL (auth, community-engagement) | forte |
| Configuração (host) | `client/shell-app/vite.config.js:10-13`: `name: 'shellApp'`, `remotes: { authApp: 'http://localhost:3001/assets/remoteEntry.js', communityApp: 'http://localhost:3002/assets/remoteEntry.js' }`; porta 3000 (`:28`) | forte |
| Configuração (remotes) | `client/auth-app/vite.config.js:10-13` e `client/community-app/vite.config.js:10-13`: `name`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/App.jsx' }`; portas 3001/3002 | forte |
| Código-fonte (composição) | `client/shell-app/src/App.jsx:5-6`: `lazy(() => import('authApp/App'))` e `import('communityApp/App')`; `:43-47`: rotas `/login` e `/community` montam os remotes | forte |
| Código-fonte (comunicação) | `client/shell-app/src/App.jsx:25-31`: o shell escuta o evento `loginSuccess` (`window.addEventListener`) disparado pelo remote de autenticação | moderada |
| Build/deploy | `client/package.json:10`: `concurrently` com `npm run deploy` (build + preview) de cada remote e `dev` do shell; `client/auth-app/package.json:8-11` | moderada |
| Código-fonte | Nenhum import de código-fonte entre as apps (sustenta a independência das unidades) | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell-app`, `auth-app` e `community-app` |
| Q2 | Yes | `vite.config.js`, entry, build e porta próprios; sem import de código-fonte entre as apps |
| Q3 | Yes | O shell roteia e monta os remotes (`App.jsx:43-47`) |
| Q4 | Yes | `remotes`/`exposes` configurados e usados via `import('<remote>/App')` |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes" e a "examples… that actually compose frontend units".

## Notas para análise

- **RQ3:** comunicação remote → host por `CustomEvent` global (`loginSuccess`), além do estado de sessão consultado pelo shell via GraphQL.
- Arquitetura alinhada entre frontend e backend: cada remote corresponde a um microsserviço (auth, community).
