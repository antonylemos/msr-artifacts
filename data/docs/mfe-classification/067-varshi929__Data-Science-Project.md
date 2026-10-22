---
schema: 1
id: 1307941132
full_name: varshi929/Data-Science-Project
url: https://github.com/varshi929/Data-Science-Project
commit: 43ec8517a15681a02c964c238d47cc586b5de23c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 067 — varshi929/Data-Science-Project

## Contexto

- **Tipo de repositório:** example/proof of concept (projeto de ciência de dados "AI News Sentiment Analysis", Python)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Projeto Python (`main.py`, `src/{data,features,model,utils,config}/*.py`, `data/raw/*.csv`); 19.618 dos 19.650 arquivos são um ambiente virtual versionado (`.venv/`) | contrária |
| Documentação | `README.md:1-15`: projeto de análise de sentimento com Pandas, Scikit-learn, FastAPI, MLflow; nenhuma menção a micro-frontends | ausente |
| Tecnologia / Configuração / Código-fonte | Inexistentes | ausente |
| Estrutura (ruído) | `data/raw/news_sentiment_analysis.csv:268,1291,1641`: o termo "Federation" aparece no texto das notícias do dataset ("Attorney-General of the Federation", "Horse Racing Federation", "Confederation of Zimbabwe Industries") (sinal enganoso) | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend |
| Q2 | No | Não há unidades |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É um projeto de ML em Python sem frontend; na filtragem automática do protocolo (seção 3.2), "repositories containing no relevant frontend implementation".
- Provavelmente capturado por busca de conteúdo indexado: "Federation" aparece em notícias do dataset CSV (falso positivo de termo).

## Notas para análise

- **RQ1 (sinais enganosos):** termos de busca como "federation" casam com texto natural em datasets; buscas de conteúdo deveriam restringir extensões (código/config) ou usar frases compostas ("module federation").
