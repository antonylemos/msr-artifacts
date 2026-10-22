---
schema: 1
id: 328423452
full_name: dkhrunov/dkhrunov
url: https://github.com/dkhrunov/dkhrunov
commit: eced863473d6488c21448cf7a81c6801da4d8dbd
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 061 — dkhrunov/dkhrunov

## Contexto

- **Tipo de repositório:** não é projeto de software (repositório de perfil do GitHub, `<usuário>/<usuário>`)
- **Classificação:** Non-MFE (classificado pelos pesquisadores no `catalog.csv`; arquivo registrado depois)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Um único arquivo versionado: `README.md` | ausente |
| Documentação | `README.md:8`: "I'm a micro-frontend enthusiast, created the ngx-mfe library for a plugin-based approach to MFE"; `:20-22`: links para artigos "Angular micro-frontend architecture" (partes 1–3) no Medium | fraca |
| Tecnologia / Configuração / Código-fonte / Build/deploy | Inexistentes | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só `README.md` |
| Q2 | No | Não há unidades |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- README de perfil do GitHub; os termos de MFE descrevem a atuação do autor (biblioteca `ngx-mfe` e artigos), em outros repositórios.
- Corresponde a "repositories mentioning micro-frontends without implementing them"; na filtragem automática (seção 3.2 do protocolo), "clearly not software projects".

## Notas para análise

- O autor mantém a biblioteca `dkhrunov/ngx-mfe` (framework de MFE para Angular), fora da amostra; pela regra do repositório 039, seria Non-MFE salvo se tiver app de referência que componha unidades.
