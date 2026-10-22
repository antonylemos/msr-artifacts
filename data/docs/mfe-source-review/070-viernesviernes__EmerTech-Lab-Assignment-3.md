---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | client/shell-app/src/App.jsx:5 | client/shell-app | dynamic-loading | Yes | Importa authApp/App em client/shell-app/src/App.jsx:5, montado pela rota /login em client/shell-app/src/App.jsx:45; App iniciado por client/shell-app/src/main.jsx:5-20. |
| src-remote-import | client/shell-app/src/App.jsx:6 | client/shell-app | dynamic-loading | Yes | Importa communityApp/App em client/shell-app/src/App.jsx:6, montado pela rota /community em client/shell-app/src/App.jsx:46; App iniciado por client/shell-app/src/main.jsx:5-20. |
| src-cross-unit-communication | client/auth-app/src/subcomponents/Login.jsx:37 | client/auth-app | communication | Yes | O login da unidade auth dispara loginSuccess com isLoggedIn (client/auth-app/src/subcomponents/Login.jsx:31-38); o shell escuta o evento em client/shell-app/src/App.jsx:24-28. Login está ligado ao componente remoto por client/auth-app/src/AuthComponent.jsx:4 e client/auth-app/src/AuthComponent.jsx:27. |
| src-cross-unit-communication | client/shell-app/src/App.jsx:28 | client/shell-app | communication | Yes | O shell registra listener para loginSuccess e atualiza seu estado a partir de event.detail (client/shell-app/src/App.jsx:23-28); evento emitido pela outra unidade em client/auth-app/src/subcomponents/Login.jsx:37. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | client/shell-app/src/App.jsx:43 | client/shell-app | host-relationship | Yes | Routes declara /login e /community para as duas aplicações remotas (client/shell-app/src/App.jsx:43-47); BrowserRouter instalado em client/shell-app/src/main.jsx:18-22. |
| manual | client/shell-app/src/App.jsx:45 | client/shell-app | runtime-composition | Yes | Renderiza AuthApp na rota /login, após sua resolução por import remoto em client/shell-app/src/App.jsx:5; App do host é usado em client/shell-app/src/main.jsx:20. |
| manual | client/shell-app/src/App.jsx:46 | client/shell-app | runtime-composition | Yes | Renderiza CommunityApp na rota /community, após sua resolução por import remoto em client/shell-app/src/App.jsx:6; App do host é usado em client/shell-app/src/main.jsx:20. |

## Resumo

Construções com composição: 7 (dynamic-loading: 2, communication: 2, host-relationship: 1, runtime-composition: 2).

## Notas

- A comunicação loginSuccess é entre a unidade auth e o shell, não um evento interno isolado: emissão e listener ativos foram encontrados nos dois lados. O payload é lido em client/shell-app/src/App.jsx:24-25.
- Após emitir o evento, Login navega para / em client/auth-app/src/subcomponents/Login.jsx:38. O shell também consulta a sessão no backend em client/shell-app/src/App.jsx:19-21; essa consulta HTTP não foi contada como comunicação entre frontends.
- Cadeia do emissor: componente remoto client/auth-app/src/App.jsx:5-22 → client/auth-app/src/AuthComponent.jsx:4-27 → Login. Cadeia do receptor: client/shell-app/src/main.jsx:5-20 → client/shell-app/src/App.jsx:23-37. Nenhum ponto de dúvida.
- Pelo critério de construções fora da mineração (passo 4 do método), ficam fora da tabela a remoção do listener `loginSuccess` em client/shell-app/src/App.jsx:35 (ponto de uso do evento registrado em :28) e os exports dos componentes expostos em client/auth-app/src/App.jsx:27 e client/community-app/src/App.jsx:23.
