---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | microfrontend-workspace/projects/mfe1/src/main.ts:1 | microfrontend-workspace/projects/mfe1 | dynamic-loading | No | microfrontend-workspace/projects/mfe1/src/main.ts:1 importa o próprio bootstrap, não outra unidade. |
| src-async-bootstrap | microfrontend-workspace/projects/shell/src/main.ts:1 | microfrontend-workspace/projects/shell | dynamic-loading | No | microfrontend-workspace/projects/shell/src/main.ts:1 importa o próprio bootstrap do shell. |
| src-load-remote | microfrontend-workspace/projects/shell/src/app/app.routes.ts:2 | microfrontend-workspace/projects/shell | remote-resolution | Yes | Importa loadRemoteModule para a chamada ativa em microfrontend-workspace/projects/shell/src/app/app.routes.ts:8-12; rotas registradas por microfrontend-workspace/projects/shell/src/app/app.config.ts:4-7. |
| src-load-remote | microfrontend-workspace/projects/shell/src/app/app.routes.ts:8 | microfrontend-workspace/projects/shell | remote-resolution | Yes | Carrega o AppComponent da unidade mfe1 pelo remoteEntry e ./Component (microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12); rota ativa em microfrontend-workspace/projects/shell/src/app/app.config.ts:7. |
| src-load-remote | microfrontend-workspace/projects/shell/src/app/app.routes.ts:17 | microfrontend-workspace/projects/shell | remote-resolution | No | A chamada da rota mfe2 está comentada junto com a rota em microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21. |
| src-html-external-script | angular-frontend-practical/src/index.html:13 | angular-frontend-practical | none | No | angular-frontend-practical/src/index.html:13-15 carrega Bootstrap de CDN, biblioteca de UI; não carrega outra aplicação frontend. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | microfrontend-workspace/projects/shell/src/app/app.routes.ts:4 | microfrontend-workspace/projects/shell | host-relationship | Yes | Tabela de rotas nomeia mfe1 e o redirecionamento inicial em microfrontend-workspace/projects/shell/src/app/app.routes.ts:4-23; registrada por microfrontend-workspace/projects/shell/src/app/app.config.ts:7. |
| manual | microfrontend-workspace/projects/shared/src/lib/message.service.ts:12 | — | communication | Yes | Publica no BehaviorSubject usado como canal entre shell e mfe1 (microfrontend-workspace/projects/shared/src/lib/message.service.ts:8-12); produtores e consumidores em microfrontend-workspace/projects/shell/src/app/app.component.ts:19 e microfrontend-workspace/projects/mfe1/src/app/app.component.ts:16. |

## Resumo

Construções com composição: 4 (remote-resolution: 2, host-relationship: 1, communication: 1).

## Notas

- A cadeia do shell é microfrontend-workspace/projects/shell/src/main.ts:1 → microfrontend-workspace/projects/shell/src/bootstrap.ts:2-5 → microfrontend-workspace/projects/shell/src/app/app.config.ts:4-7 → app.routes. O componente mfe1 é exposto em microfrontend-workspace/projects/mfe1/webpack.config.js:8-9.
- A comunicação via MessageService foi encontrada fora dos padrões. O alias shared aponta para dist/shared em microfrontend-workspace/tsconfig.json:15-18; as duas configurações usam withModuleFederationPlugin e shareAll (microfrontend-workspace/projects/shell/webpack.config.js:1-12; microfrontend-workspace/projects/mfe1/webpack.config.js:1-13). A biblioteca não é unidade frontend na revisão estrutural; sua linha recebe Unidade —.
- Os imports dinâmicos locais em angular-frontend-practical/src/app/app.routes.ts:12-22, ssr-app/src/app/app.routes.ts:23-36 e ssr-app/src/app/components/home/home.component.ts:21 são lazy loading interno, sem construção adicional de composição entre unidades.
- Pelo critério de construções fora da mineração (passo 4 do método), o canal `MessageService` tem uma linha onde é definido (microfrontend-workspace/projects/shared/src/lib/message.service.ts:12); seus pontos de uso ficam fora da tabela: o shell importa e envia em microfrontend-workspace/projects/shell/src/app/app.component.ts:4 e :19, e o mfe1 importa e assina `message$` em microfrontend-workspace/projects/mfe1/src/app/app.component.ts:3 e :16-18.
