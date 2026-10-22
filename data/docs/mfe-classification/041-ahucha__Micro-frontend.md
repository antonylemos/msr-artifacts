---
schema: 1
id: 1192728522
full_name: ahucha/Micro-frontend
url: https://github.com/ahucha/Micro-frontend
commit: 72c6f439b29b8e3b47e79b1b3ba0e8fe77a790a6
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 041 — ahucha/Micro-frontend

## Contexto

- **Tipo de repositório:** example/proof of concept (exercício didático "PixelArena - Checkpoint 1 : Le Bug du Lobby", `README.md:1`)
- **Commit avaliado:** `72c6f43` (único commit)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:1-37`: exercício em que o aluno muda a cor do botão do Lobby; `:41-46` pergunta se os outros botões também mudaram "e por quê"; `:55-62` marca cada CSS com uma "Equipe" (Navbar, Lobby, Leaderboard) | contexto |
| Estrutura | Uma única app React: `src/App.jsx` e três componentes em `src/components/` (`Navbar`, `Lobby`, `Leaderboard`) | contrária |
| Configuração | `webpack.config.js:1-40`: webpack com Babel, CSS e `HtmlWebpackPlugin`; sem `ModuleFederationPlugin`; `package.json` sem dependências de MFE | ausente |
| Código-fonte | `src/index.js:5-6` um único `createRoot`; `src/App.jsx:2-4` importa estaticamente `Navbar`, `Lobby` e `Leaderboard` | contrária |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`src/index.js:5`) |
| Q2 | No | Os "times" são componentes importados diretamente (`App.jsx:2-4`), com um só build |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É o ponto de partida de um exercício sobre micro-frontends: um monolito React em que os CSS globais de "times" diferentes colidem (o bug que o aluno deve descobrir), provavelmente para motivar a separação em MFEs nos próximos checkpoints.
- O nome do repositório ("Micro-frontend") reflete o tema do curso, não a implementação.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them".

## Notas para análise

- **RQ1 (sinais enganosos):** o termo está no nome do repositório; o conteúdo é o "antes" didático de uma migração para MFE.
