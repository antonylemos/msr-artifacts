---
schema: 1
id: 1342735218
full_name: portable-genai/operational-resilience-mapping
url: https://github.com/portable-genai/operational-resilience-mapping
commit: 39502428edc71341641d7cdf7eda4557d3a0aa3a
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 036 — portable-genai/operational-resilience-mapping

## Contexto

- **Tipo de repositório:** template (serviço backend Python "scaffolded from the catalog commons", com script `rename_fork.py` para forks e `make drop-ui` para remover a UI)
- **Classificação:** Non-MFE (depende da decisão em aberto sobre iframe; alternativa: MFE-unit)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | O repositório é principalmente um serviço Python hexagonal (`src/operational_resilience_mapping/`, `tests/`, `infra/terraform/`, `eval/`); `ui/` é uma única app Next.js opcional | contrária |
| Documentação | `README.md:80-84` "`ui/` is a Next.js micro-frontend that runs standalone or embeds in a client application"; `ui/README.md:1-5` "embeds into a client's existing web application as an iframe"; `ui/package.json:6` "Embeddable micro-frontend…"; `ARCHITECTURE.md:50`, `AGENTS.md:59` | fraca |
| Configuração (embedding) | `ui/lib/embed-policy.mjs:14-21,172-193,325-349`: allowlist de `frame-ancestors` (`UI_FRAME_ANCESTORS`), `X-Frame-Options` coerente e CORS por tenant (`:205-230`, `UI_TENANT_ORIGINS`); `ui/proxy.ts:12` aplica os headers (permite ser embutida) | moderada |
| Código-fonte (contrato com o host) | `ui/README.md:142-150`: para embutir, registrar a origem do pai e usar `<iframe src="…">`; "The host page passes no identity. That is the design". Nenhum `postMessage`, `window.parent`, registro de navegação ou props do host em `ui/app` ou `ui/lib` (iframe isolado) | ausente |
| Composição | Nenhum host no repositório; o "client's existing web application" é genérico/hipotético (`https://portal.client.example`) | ausente |
| Build/deploy | `.github/workflows/gate.yaml:44`: `ui-check` no gate de CI; `infra/terraform/production_edge.tf:18`: "the micro-frontend ships no Dockerfile" | fraca |
| Tecnologia | Nenhuma dependência de MFE em `ui/package.json` | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`ui/`); nenhuma configuração de composição referencia outras unidades |
| Q2 | Yes (para a unidade) | Next.js com build próprio, separado do serviço Python |
| Q3 | No | Nenhum host identificável, nem no repositório nem por referência; o pai é qualquer aplicação de cliente que se registre |
| Q4 | No | O único mecanismo é um iframe genérico sem contrato com o host (`ui/README.md:147-150`); é permissão de embedding, não composição configurada |
| Q5 | No | Q1, Q3 e Q4 convergem |

## Motivo

- O "micro-frontend" aqui é um console embutível por iframe de um serviço backend: a app só permite ser embutida (allowlist de framing e CORS) e não tem contrato de integração com nenhum host específico.
- Diferente do repositório 031 (MFE-unit), onde a app tinha um shell nomeado (`j26-app`), registro de navegação consumido pelo shell e protocolo `postMessage`. Pela regra sugerida no 031 ("iframe conta quando há contrato explícito com o host; iframe isolado não conta"), este caso fica de fora.
- Corresponde a "repositories mentioning micro-frontends without implementing them": o termo descreve a UI embutível, mas não há composição de unidades.

## Notas para análise

- **RQ1 (sinais enganosos):** "micro-frontend" usado para "UI embutível por iframe" em repositórios de serviços backend gerados por template.

## Ponto para revisão conjunta

- Se a decisão sobre iframe for permissiva (qualquer unidade preparada para iframe conta), o caso passa a **MFE-unit**, já que a preparação para embedding é explícita e testada (`ui/tests/embed-policy.test.mjs`).
- A distinção 031 × 036 é um bom par para calibrar a regra de iframe.
