---
schema: 1
id: 1267284042
full_name: Byron2306/EdgeK-BEAST
url: https://github.com/Byron2306/EdgeK-BEAST
commit: 320bb1f48d84a59353d5252687fb305dfa06b166
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 071 — Byron2306/EdgeK-BEAST

## Contexto

- **Tipo de repositório:** production-oriented / pesquisa (camada de governança para agentes de código via MCP + IDE desktop; 32.864 arquivos)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:5-12`: "BEAST - Auditable, Governed AI Editing via MCP and Gateway… governance layer for coding agents and editor clients"; nenhuma menção a micro-frontends | contexto |
| Estrutura | `app/` (kernel Python), `desktop-ide/` (IDE desktop: `main/`, `renderer/`, `extensions/`, mais `.bundle-build/` e `.beast-python-tools/` versionados), `benchmarks/`, `evidence/`, `seeds/`, dezenas de relatórios de fases | contrária |
| Tecnologia (MF de terceiros) | `desktop-ide/.beast-python-tools/jupyterlab/staging/webpack.config.js`, `…/labextensions/@jupyter-notebook/lab-extension/static/remoteEntry.*.js`, `…/galata-extension/static/remoteEntry.*.js`: JupyterLab vendorizado num ambiente Python embutido, que usa Module Federation como sistema de extensões (tecnologia de terceiros vendorizada) | contexto |
| Código-fonte (falso positivo) | `app/kernel/compute/forge_kv_hf_official.py:17`: `"RemoteEntryNotFoundError"` (exceção da biblioteca Hugging Face Hub) | contexto |
| Código-fonte (autoral, frontend) | `desktop-ide/renderer/` e `desktop-ide/main/`: IDE desktop (Electron); nenhuma configuração de federação, `remotes`/`exposes` ou composição de unidades | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend autoral composta; a IDE desktop é uma aplicação única |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config compondo unidades |
| Q4 | No | Os `remoteEntry.js` são build de extensões do JupyterLab vendorizado (dependência de terceiros), não composição configurada pelo autor |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- O repositório não implementa micro-frontends. Os sinais de Module Federation vêm de uma cópia do JupyterLab (com seu sistema de extensões baseado em MF) empacotada no ambiente Python da IDE, e de um nome de exceção do Hugging Face.
- Por analogia com a regra de plugins de plataforma (010, 022, 035, 037): MF como mecanismo de extensão de uma plataforma de terceiros (JupyterLab), aqui nem sequer usado pelo autor, só vendorizado.

## Notas para análise

- **RQ1 (sinais enganosos):** dependências vendorizadas (ambientes Python, `site-packages`, bundles de build versionados) introduzem `remoteEntry.js` e `webpack.config.js` com MF no repositório; buscas de conteúdo devem excluir diretórios de dependências e builds.
