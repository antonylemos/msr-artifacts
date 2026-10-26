---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 040 — AlanOlimpio/list

## Leitura do repositório

O repositório contém uma única aplicação React (webpack 5, Module Federation nativo), `ListApp`, que faz parte de um sistema distribuído em vários repositórios e tem **dois papéis**:

- **Host:** consome `RegisterApp`, hospedado na Vercel (webpack.config.js:52-55). O modal de cadastro é carregado com `React.lazy` e renderizado na rota `/register` (src/components/ListRoutes/ListRoutes.js:5-12), dentro do `Outlet` do layout da lista (src/components/List/List.js:82-84).
- **Remote:** expõe as próprias rotas, `./ListRoutes` (webpack.config.js:47-51), para um consumidor que não está no snapshot.

Só o primeiro papel vira relação aqui; o segundo fica registrado nesta leitura. A aplicação tem configuração de hospedagem própria (revisão estrutural).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | RegisterApp | host → remote | origem → destino | module-federation | No | Yes | webpack.config.js:52-55 (remote `RegisterApp@https://register-navy-ten.vercel.app/remoteEntry.js`) | src/components/ListRoutes/ListRoutes.js:5; src/components/ListRoutes/ListRoutes.js:9; src/components/ListRoutes/ListRoutes.js:11 |

## Observações

**1. . → RegisterApp.** A aplicação importa `RegisterApp/ModalRegister` e o renderiza na rota `/register` (src/components/ListRoutes/ListRoutes.js:5-12). O remote é identificado pelo nome e pela URL da Vercel, fora do snapshot.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
