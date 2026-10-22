---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
url: https://github.com/AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 040 — AlanOlimpio/list

## Contexto

- **Abordagem de implementação:** Module Federation (webpack 5), com unidade bidirecional: expõe `./ListRoutes` e consome o remote externo `RegisterApp`
- **Tipo de repositório:** example/proof of concept (projeto do curso "Webpack do básico ao avançado", `README.md:1-3`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Uma única app (`ListApp`) no repositório; o README fala em "cada micro front end" (`README.md:29`), mas os outros estão em repositórios separados | contexto |
| Configuração | `webpack.config.js:46-72`: `ModuleFederationPlugin` com `name: 'ListApp'`, `filename: 'remoteEntry.js'`, `exposes: { './ListRoutes' }` **e** `remotes: { RegisterApp: 'RegisterApp@https://register-navy-ten.vercel.app/remoteEntry.js' }`; `shared` singletons de react, react-dom e react-router-dom | forte |
| Código-fonte (consumo) | `src/components/ListRoutes/ListRoutes.js:5`: `React.lazy(() => import('RegisterApp/ModalRegister'))`; `:10-12`: monta o componente remoto na rota aninhada `register` dentro de `List` | forte |
| Código-fonte (exposição) | `ListRoutes` exposto para um container externo; `src/index.js:1` `import('./bootstrap')`; `src/bootstrap.js:7-15` monta standalone | moderada |
| Build/deploy | `vercel.json`: deploy próprio na Vercel; o remote `RegisterApp` também é servido da Vercel (`register-navy-ten.vercel.app`), em outro deploy (deploys independentes) | forte |
| Documentação | `README.md:1,15,29`: "module federation", "micro front end" | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `ListApp` (no repositório) + `RegisterApp` (externo, referenciado no `remotes`, `webpack.config.js:52-55`) |
| Q2 | Yes | `ListApp` tem build e deploy próprios; `RegisterApp` é externo e implantado separadamente (URL de produção própria) |
| Q3 | Yes | `ListApp` monta o `ModalRegister` remoto na sua árvore de rotas (`ListRoutes.js:10-12`) |
| Q4 | Yes | `remotes` configurado e usado via `import('RegisterApp/ModalRegister')` (`ListRoutes.js:5`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "repositories containing only the host, which references external remote units" (como o repositório 008): a app consome um remote externo implantado separadamente. Ao mesmo tempo, ela expõe `ListRoutes` para um container que não está no repositório.

## Notas para análise

- **RQ3:** unidade bidirecional (host e remote ao mesmo tempo): consome `RegisterApp` e expõe `ListRoutes`. A arquitetura completa (provavelmente container + list + register) está distribuída em vários repositórios do autor; na amostra, só este aparece.
- **RQ1 (build/deploy):** URL de produção fixa no `remotes` (`webpack.config.js:54`), sem separação dev/prod.
