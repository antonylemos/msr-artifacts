---
schema: 1
id: 1099555541
full_name: Nidhi812/mfe-personal-loan-app
url: https://github.com/Nidhi812/mfe-personal-loan-app
commit: 245d2d1aec6172c5dcec223b1f55097bf626bc2e
classification: Non-MFE
checklist: { q1: no, q2: undetermined, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: null
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 072 — Nidhi812/mfe-personal-loan-app

## Contexto

- **Abordagem de implementação (declarada):** Module Federation (Angular), host + remote
- **Tipo de repositório:** example/proof of concept ("Module Federation Demo - Host & Remote Applications", `README.md:1`)
- **Classificação:** Non-MFE (código das unidades inacessível; alternativa: Uncertain)
- **Commit avaliado:** `245d2d1` (branch padrão `master`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Só 6 entradas: `README.md`, `.gitignore`, `.github/workflows/{deploy,main}.yml` e dois **gitlinks** (`host-app` e `personal-loan-app`, modo `160000`, commits `314812e` e `b02e940`) sem `.gitmodules`. São repositórios aninhados adicionados por engano (`8aff2f8` "initial import of host-app and personal-loan-app"); o conteúdo das apps não está no repositório nem há URL para recuperá-lo | ausente |
| Documentação | `README.md:1-35`: host (4200) e remote "Personal Loan App" (4201); `:100` `"personalLoanApp": "http://localhost:4201/remoteEntry.js"`; `:112-113` trecho de `exposes` (não corroborada) | fraca |
| Build/deploy | `.github/workflows/deploy.yml:24-59`: `npm install` e `npm run build --prod` na raiz, que não tem `package.json`; o workflow não teria o que construir (workflow quebrado) | contexto |
| Configuração / Código-fonte | Inexistentes no repositório (estão dentro dos gitlinks) | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend acessível no repositório; as unidades só aparecem no README, não numa configuração de composição versionada |
| Q2 | Undetermined | Não há como verificar as unidades |
| Q3 | Undetermined | O host não é observável |
| Q4 | Undetermined | A configuração de MF existe só como trecho no README |
| Q5 | No | Documentação sem corroboração em artefatos (protocolo 3.4.7) |

## Motivo

- Q1 é No pelo critério operacional ("identifiable in the repository or explicitly referenced by its composition configuration"): o código está em gitlinks sem conteúdo nem origem. A exceção MFE-unit não se aplica, pois nenhuma unidade é observável.
- Na filtragem automática (seção 3.2 do protocolo), cabe em "repositories with no accessible source or configuration artifacts". O README descreve um MFE que o repositório não contém.

## Notas para análise

- **RQ1 (artefato incomum):** gitlinks sem `.gitmodules` (repositórios aninhados commitados por engano) deixam o repositório vazio na prática; uma busca por arquivos não encontraria nada além do README.

## Ponto para revisão conjunta

- Alternativa: **Uncertain**, por coerência com o repositório 038 (código fora do repositório). Diferença: o 038 tinha orquestração (compose, gateway) referenciando as unidades; aqui só há README e workflows quebrados, e os gitlinks não apontam para nenhum repositório recuperável.
