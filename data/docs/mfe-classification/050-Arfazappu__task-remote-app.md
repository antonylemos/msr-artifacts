---
schema: 1
id: 981968069
full_name: Arfazappu/task-remote-app
url: https://github.com/Arfazappu/task-remote-app
commit: a5eba71aa7f4a9386a26b497ecd70f439d56ec4e
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 050 — Arfazappu/task-remote-app

## Contexto

- **Abordagem de implementação:** Module Federation (`@originjs/vite-plugin-federation`)
- **Tipo de repositório:** example/proof of concept (app de tarefas com Supabase; README é o boilerplate do Vite)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Configuração | `vite.config.js:8-15`: `federation({ name: 'taskApp', filename: 'remoteEntry.js', exposes: { './TaskDashboard': './src/TaskDashboard.jsx' }, shared: ['react', 'react-dom'] })`; sem `remotes` | moderada |
| Código-fonte | `src/TaskDashboard.jsx:4`: `export default function TaskDashboard()`, o componente exposto; `src/main.jsx` + `src/App.jsx` montam standalone; `supabase.js` acessa o backend | moderada |
| Estrutura | Uma única app (um `package.json`, um entry) | contrária |
| Composição | Nenhum host no repositório; o nome ("task-remote-app") indica o papel de remote de um host externo, não observável | ausente |
| Build/deploy | Histórico: `01bc8f8` "workflow setup" adicionou `.github/workflows/deploy-login.yml` (copiado de um app "Login"), depois renomeado para `deploy-task.yml` e removido em `8406479` ("Delete .github directory"); hoje não há pipeline no repositório | fraca |
| Documentação | `README.md:1-12`: boilerplate do template React + Vite | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a config de composição só tem `exposes` (`vite.config.js:11-13`) |
| Q2 | Yes (para a unidade) | Build próprio que gera `remoteEntry.js` |
| Q3 | Undetermined | O host não está no repositório |
| Q4 | Undetermined | O lado remote está configurado; o consumidor não é observável |
| Q5 | No | A evidência mostra uma unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No; aplica-se a exceção MFE-unit: unidade única "explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…)", com host não observável.
- Corresponde a "repositories containing only a remote unit, without the composing host", como o repositório 001.

## Notas para análise

- **RQ1 (histórico):** o workflow copiado de um "Login App" (`deploy-login.yml`) sugere uma arquitetura com vários remotes (login, task) e um host, cada um num repositório; nenhum deles está na amostra.
