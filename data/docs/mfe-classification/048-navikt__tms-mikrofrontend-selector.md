---
schema: 1
id: 586861464
full_name: navikt/tms-mikrofrontend-selector
url: https://github.com/navikt/tms-mikrofrontend-selector
commit: f08e5555fda303c2243e8deea73030db1434cb38
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: no, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 048 — navikt/tms-mikrofrontend-selector

## Contexto

- **Tipo de repositório:** production-oriented (serviço da NAV, a agência norueguesa de trabalho e bem-estar, para o portal "Min side"; 320 commits, deploy NAIS dev/prod)
- **Classificação:** Non-MFE (componente de backend de uma arquitetura de MFE real em produção; mantido pelos pesquisadores, com interpretação ainda em aberto)

O repositório é um **serviço backend em Kotlin** ("Tjeneste som holder oversikt over hvilke mikrofrontends som skal vises på min side", ou seja, o serviço que controla quais micro-frontends aparecem no Min side, `README.md:2`). Ele funciona como registro e seletor: guarda quais micro-frontends cada usuário deve ver e devolve ao portal as URLs dos bundles JS a carregar. Os micro-frontends (criados a partir de `navikt/tms-microfrontend-template-ssr`, `howto.md:5`) e o portal Min side (host) estão em outros repositórios.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Só backend: `app/` (Ktor + Postgres + Kafka/Rapids, `app/src/main/kotlin/…`), `lib/` (builder de mensagens para produtores, `lib/src/main/kotlin/no/nav/tms/microfrontend/Actions.kt`), `nais/{dev,prod}-gcp/nais.yaml`, `Dockerfile` | contrária |
| Código-fonte (API de registro) | `README.md:15-31`: `GET /microfrontends` retorna `[{ microfrontend_id, url: "https://cdn…/mk1….js" }]` + `offerStepup`; `app/src/main/kotlin/…/SelectorApi.kt:30` (papel na composição) | forte |
| Configuração (manifesto) | `update-manifests-v2.py:3-21`: registra cada MFE em `manifests-v2.json` com `url`, `appname`, `namespace`, `fallback`, `ssr`; `versions/ManifestsStorage.kt:8-24`: lê o manifesto de um bucket GCS em runtime (papel na composição) | forte |
| Código-fonte (seleção) | `EnableSubscriber.kt`/`DisableSubscriber.kt`: ativam/desativam MFEs por usuário via mensagens; `collector/regelmotor/ContentRules.kt` + `app/src/main/resources/contentrules.yaml`: regras de exibição; `database/Microfrontend.kt` | moderada |
| Documentação | `howto.md:1-30`: guia para equipes produtoras de micro-frontends (template SSR, `nais.yaml`, workflow de deploy, atualização do manifesto, canal `#minside-microfrontends`) | moderada |
| Build/deploy | `.github/workflows/update-manifest*.yaml`, `manual-manifest-update.yaml`: atualização do manifesto de MFEs como parte do deploy dos produtores | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório; os MFEs só aparecem como entradas de manifesto/registro em runtime (bucket GCS, banco), não como configuração versionada aqui |
| Q2 | Yes (externas) | Os MFEs são implantados separadamente (CDN, NAIS), segundo `howto.md` |
| Q3 | No | O host (portal Min side) não está no repositório; este serviço não monta, carrega nem roteia unidades: só informa quais URLs carregar |
| Q4 | Undetermined | É parte do mecanismo de composição (registro dinâmico), mas a carga/montagem acontece no host ausente |
| Q5 | No | O repositório não contém frontend; é um serviço de suporte à composição |

## Motivo

- Q1 e Q3 são No; a exceção MFE-unit não se aplica (não há unidade frontend). Na filtragem automática (seção 3.2 do protocolo), cabe em "repositories containing no relevant frontend implementation".
- Apesar disso, é **evidência forte de uma arquitetura de MFE real em produção** (NAV Min side), distribuída em vários repositórios: registro de MFEs por usuário, manifesto com URL/SSR/fallback, guia para equipes produtoras.

## Notas para análise

- **RQ3:** relação host → remote mediada por um **serviço de registro em runtime** (frontend service discovery) com regras por usuário, nível de sensibilidade (`offerStepup`) e SSR, uma camada que os exemplos didáticos não têm.

## Ponto para revisão conjunta

- **Alternativa — Uncertain**, por coerência com o repositório 038 (meta-repositório que descreve um MFE cujo código está fora). Diferença: o 038 descreve o sistema inteiro (host + sub-apps); este repositório é um componente backend específico.
- **Regra sugerida:** "serviços backend de registro/seleção de MFEs (service discovery de frontends) sem unidade frontend no repositório são Non-MFE, mas registrados como evidência de ecossistema".
- Para a mineração, poderia valer buscar o repositório do host (portal Min side) e um MFE produtor fora da amostra, se o estudo aceitar expansão por bola de neve; o protocolo atual não prevê isso.
