---
schema: 1
id: 1401956079
full_name: mmss1995/SkewForge
url: https://github.com/mmss1995/SkewForge
commit: 848f9a66cbf2aa33ffd0054898aea3d8119fc6a7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react, vue]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 028 — mmss1995/SkewForge

## Contexto

- **Tipo de repositório:** biblioteca/ferramenta (gateway self-hosted de "version skew protection" para SPAs, com CLI, runtime de cliente, plugins e dashboard)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação (propósito) | `README.md:3`: "Self-hosted version skew protection. Tabs opened before a deploy keep working after it…"; `:19-29`: resolve o erro de chunk ausente após deploy em SPAs com code splitting | contexto |
| Estrutura | Monorepo com pacotes `@skewforge/{core,client,server,cli,vite,react,vue}` (`packages/*/package.json:2`), um dashboard administrativo (`apps/dashboard`, `@skewforge/dashboard`) e dois exemplos (`examples/react-app`, `examples/vue-app`) | contrária |
| Configuração | `examples/react-app/vite.config.ts:5-12`: `react()` + `skewforge()` e split de vendor; `apps/dashboard/vite.config.ts:7-13`: React + Tailwind + proxy para a API admin; nenhuma config de federação, `remotes`, `exposes` ou import map | ausente |
| Composição | Nenhuma app carrega outra: o dashboard administra o gateway; os exemplos são apps de demonstração isoladas (React e Vue) servidas pelo gateway | ausente |
| Documentação (MF) | `README.md:49` e `docs/how-it-works.md:39`: o gateway serve `remoteEntry.js` de Module Federation da deployment correta (compatibilidade); `README.md:214`: "[ ] Module Federation mode" no roadmap (compatibilidade/futuro) | fraca |
| Build/deploy | `Dockerfile`, `docker-compose.yml`, `deploy/nginx.conf`: empacotam o gateway e o dashboard | contrária |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | As apps frontend do repositório (`apps/dashboard`, `examples/react-app`, `examples/vue-app`) não formam unidades de uma mesma aplicação; nenhuma config de composição referencia outras unidades |
| Q2 | No | Não há unidades de uma mesma aplicação a avaliar |
| Q3 | No | Nenhum host/shell carrega, monta ou roteia as apps; o gateway seleciona versões de deploy da mesma app, não compõe apps distintas |
| Q4 | No | Nenhum mecanismo de composição configurado |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É uma ferramenta de infraestrutura de deploy (versionamento de assets e roteamento por deployment), não uma aplicação composta por micro-frontends.
- As várias apps frontend do repositório são independentes entre si (dashboard administrativo e exemplos), o que corresponde a "monorepos containing several unrelated frontend applications".
- Module Federation aparece só como cenário suportado pelo gateway e como item de roadmap, o que corresponde, por analogia, a "MFE frameworks and libraries" e a "repositories mentioning micro-frontends without implementing them".

## Notas para análise

- **RQ1 (sinais enganosos):** ferramentas de infraestrutura que citam `remoteEntry.js`/Module Federation como caso de uso aparecem nas buscas por tecnologia.
- **RQ3 (gateway ≠ shell):** o roteamento por requisição seleciona a versão de uma mesma app; não compõe unidades distintas (contraste com o shell por `rewrites` do repositório 013).
