---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
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
