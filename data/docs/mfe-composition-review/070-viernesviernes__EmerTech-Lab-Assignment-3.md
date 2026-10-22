---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Leitura do repositório

Trabalho acadêmico com três aplicações React/Vite unidas por Module Federation (`@originjs/vite-plugin-federation`) e um backend GraphQL. O `shell-app` roteia `/login` para o `auth-app` e `/community` para o `community-app` (client/shell-app/src/App.jsx:43-47). As três compartilham `react`, `react-dom`, `@apollo/client` e `graphql` (ex.: client/shell-app/vite.config.js:15).

Além do carregamento, há comunicação explícita: depois do login, o auth-app dispara o evento `loginSuccess` no `window` (client/auth-app/src/subcomponents/Login.jsx:37), e o shell o escuta para atualizar seu estado (client/shell-app/src/App.jsx:23-28). Particularidade: logo depois do evento, o auth-app recarrega a página com `window.location.href = '/'` (client/auth-app/src/subcomponents/Login.jsx:38). Com isso, o efeito do evento dura pouco, e o estado de login passa a depender da consulta de sessão que o shell faz ao backend (client/shell-app/src/App.jsx:19-21). Na prática, o canal entre frontends convive com um canal pelo backend.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | client/shell-app | client/auth-app | host → remote | origem → destino | module-federation | Yes | Yes | client/shell-app/vite.config.js:9-12 (remote `authApp` em `http://localhost:3001/assets/remoteEntry.js`); client/auth-app/vite.config.js:9-14 (`name: 'authApp'`, `filename: 'remoteEntry.js'`, expõe `./App`); client/auth-app/vite.config.js:28, 31 (porta 3001) | client/shell-app/src/App.jsx:5; client/shell-app/src/App.jsx:43; client/shell-app/src/App.jsx:45 |
| 2 | client/shell-app | client/community-app | host → remote | origem → destino | module-federation | Yes | Yes | client/shell-app/vite.config.js:9-11, 13 (remote `communityApp` em `http://localhost:3002/assets/remoteEntry.js`); client/community-app/vite.config.js:9-14 (`name: 'communityApp'`, `filename: 'remoteEntry.js'`, expõe `./App`); client/community-app/vite.config.js:28, 31 (porta 3002) | client/shell-app/src/App.jsx:6; client/shell-app/src/App.jsx:43; client/shell-app/src/App.jsx:46 |
| 3 | client/auth-app | client/shell-app | communication | origem → destino | events | Yes | Yes | — | client/auth-app/src/subcomponents/Login.jsx:37; client/shell-app/src/App.jsx:28 |

## Observações

**1. client/shell-app → client/auth-app.** O shell importa `authApp/App` (client/shell-app/src/App.jsx:5) e o renderiza em `/login` (client/shell-app/src/App.jsx:45). O nome `authApp` e o módulo `./App` correspondem a client/auth-app/vite.config.js:10-13; a porta 3001 só corrobora.

**2. client/shell-app → client/community-app.** Mesmo padrão com `communityApp/App` em `/community` (client/shell-app/src/App.jsx:6, 46). O nome e o módulo correspondem a client/community-app/vite.config.js:10-13; a porta 3002 só corrobora.

**3. client/auth-app → client/shell-app.** O auth-app emite `loginSuccess` com `isLoggedIn` (client/auth-app/src/subcomponents/Login.jsx:37), e o shell escuta e remove o listener na limpeza (client/shell-app/src/App.jsx:28, 35). Não há envio no sentido inverso. Ver a leitura sobre o recarregamento logo após o evento.

## Resumo

Relações: 3 (host → remote: 2, communication: 1). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
