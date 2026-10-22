---
schema: 1
id: 1105923509
full_name: parthibanktech/parthi_mcp-multi-agent-console
url: https://github.com/parthibanktech/parthi_mcp-multi-agent-console
commit: 8e9a6c0e5cdf88c1e476f5278b28437a62e70b77
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [streamlit]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 066 — parthibanktech/parthi_mcp-multi-agent-console

## Contexto

- **Tipo de repositório:** example/proof of concept (console multiagente com MCP em Python)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Só Python: `client_agent.py` (UI Streamlit + orquestração LangChain/LangGraph), `finance_mcp_server.py` e `hr_mcp_server.py` (servidores MCP), `Dockerfile.{client,finance,hr}`, `docker-compose.yml`, `render.yaml` e vários guias em Markdown | contrária |
| Código-fonte (UI) | `client_agent.py:1,14`: `import streamlit as st`, `st.set_page_config(...)`, uma única interface Streamlit | contrária |
| Composição | Os "agentes" (Finance, HR) são **servidores MCP de backend** consultados pelo LLM; não há unidades frontend compostas | ausente |
| Documentação | `README.md:3` (UTF-16): "unifies multiple AI agents (Finance & HR) into a single, cohesive Streamlit interface… specialized micro-agents"; nenhuma menção a micro-frontends | contexto |
| Tecnologia (MFE) | Nenhuma dependência nem configuração de MFE | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única UI (Streamlit, `client_agent.py`); os demais componentes são servidores backend |
| Q2 | No | Não há unidades frontend a comparar |
| Q3 | No | Não há host, shell nem root config compondo frontends |
| Q4 | No | A "orquestração" é de agentes de IA no backend (MCP), não de frontends |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É uma aplicação de IA multiagente; "orchestration", "unifies multiple… agents" e "micro-agents" descrevem a composição de serviços MCP no backend, não de unidades frontend.
- Na filtragem automática do protocolo (seção 3.2), cabe em "repositories containing no relevant frontend implementation" (a UI é Streamlit, gerada em Python).
- Provavelmente entrou por termos amplos ("orchestration", "unifies… into a single interface").

## Notas para análise

- **RQ1 (sinais enganosos):** vocabulário de composição ("orchestration platform", "micro-agents", "single cohesive interface") aplicado a agentes de IA; esse padrão deve crescer com projetos de MCP/LLM.
