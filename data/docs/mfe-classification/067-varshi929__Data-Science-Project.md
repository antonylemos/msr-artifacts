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

## Context

- **Repository type:** example/proof of concept ("AI News Sentiment Analysis" data science project, Python)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Python project (`main.py`, `src/{data,features,model,utils,config}/*.py`, `data/raw/*.csv`); 19,618 of the 19,650 files are a tracked virtual environment (`.venv/`) | contrary |
| Documentation | `README.md:1-15`: sentiment analysis project with Pandas, Scikit-learn, FastAPI, MLflow; no mention of micro-frontends | absent |
| Technology / Configuration / Source code | Nonexistent | absent |
| Structure (noise) | `data/raw/news_sentiment_analysis.csv:268,1291,1641`: "Federation" appears in dataset news text ("Attorney-General of the Federation", "Horse Racing Federation", "Confederation of Zimbabwe Industries") (misleading signal) | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend units |
| Q2 | No | No units |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is a Python ML project without a frontend; in the protocol's automatic filtering (section 3.2), "repositories containing no relevant frontend implementation".
- Probably captured through indexed-content search: "Federation" appears in CSV dataset news (term false positive).

## Analysis notes

- **RQ1 (misleading signals):** search terms such as "federation" match natural text in datasets; content searches should restrict extensions (code/config) or use compound phrases ("module federation").
