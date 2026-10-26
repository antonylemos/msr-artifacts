---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
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
  date: 2026-10-24
---

# 228 — Christian-Encalada/examen-microfrontend

## Leitura do repositório

Demonstração de um “Sistema de Alertas Académicas” em três aplicações React com Rspack e `@module-federation/enhanced`: o host `appclases` na raiz do repositório e dois remotes em subdiretórios, `alert-sender` e `alert-dashboard`. O host declara os dois remotes com URLs `remoteEntry.js` em localhost, portas 3001 e 3002 (module-federation.config.ts:5-8), e cada remote expõe um único componente (alert-sender/module-federation.config.ts:2-6; alert-dashboard/module-federation.config.ts:2-6). No código, o host importa os dois componentes de forma estática (src/App.tsx:3-4), depois do bootstrap assíncrono (src/index.ts:1), e os monta lado a lado, em duas seções da mesma página (src/App.tsx:61-68). Os dois remotes são carregados sempre juntos; não há rota nem carregamento sob demanda.

A particularidade do repositório é que os dois remotes conversam entre si sem passar pelo host: o `AlertSender` dispara um `CustomEvent('academic-alert')` em `window` quando um dos três botões é clicado (alert-sender/src/components/AlertSender.tsx:71-81, 87-95), e o `AlertDashboard` escuta esse evento e mostra o `detail` recebido (alert-dashboard/src/components/AlertDashboard.tsx:97-108). O host não passa props aos componentes (src/App.tsx:63, 66). Essa troca só tem os dois lados quando ambos estão na página do host; rodando sozinho, cada remote não tem o par do evento.

O que não virou relação: os tipos gerados em `@mf-types/` e o `declare module "Footer/Footer"` de src/types/federation.d.ts:1-5, que a revisão de código-fonte marcou como `No` (não há remote `Footer` na configuração do host, module-federation.config.ts:5-8); os `import("./App")` de cada unidade, internos a ela; e o `exposes: {}` vazio do host (module-federation.config.ts:3). As três aplicações compartilham `react` e `react-dom` (module-federation.config.ts:4).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | alert-sender | alert-dashboard | communication | origem → destino | events | Yes | Yes | — | alert-dashboard/src/components/AlertDashboard.tsx:103; alert-sender/src/components/AlertSender.tsx:72; alert-sender/src/components/AlertSender.tsx:80 |
| 2 | . | alert-sender | host → remote | origem → destino | module-federation | Yes | Yes | module-federation.config.ts:6 (remote `AlertSender@http://localhost:3001/remoteEntry.js`); alert-sender/module-federation.config.ts:2-6 (`name: "AlertSender"`, `filename: "remoteEntry.js"`, expõe `./AlertSender`); alert-sender/rspack.config.ts:25 (porta 3001); alert-sender/rspack.config.ts:33 (`publicPath: "http://localhost:3001/"`) | src/App.tsx:63 |
| 3 | . | alert-dashboard | host → remote | origem → destino | module-federation | Yes | Yes | module-federation.config.ts:7 (remote `AlertDashboard@http://localhost:3002/remoteEntry.js`); alert-dashboard/module-federation.config.ts:2-6 (`name: "AlertDashboard"`, `filename: "remoteEntry.js"`, expõe `./AlertDashboard`); alert-dashboard/rspack.config.ts:25 (porta 3002); alert-dashboard/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`) | src/App.tsx:66 |

## Observações

**1. alert-sender → alert-dashboard.** A origem é alert-sender, que envia: `sendAlert` cria o `CustomEvent('academic-alert', { detail: { type, message, timestamp } })` (alert-sender/src/components/AlertSender.tsx:72-78) e o dispara em `window` (alert-sender/src/components/AlertSender.tsx:80). O destino é alert-dashboard, que registra o ouvinte do mesmo nome de evento (alert-dashboard/src/components/AlertDashboard.tsx:103) e grava o `detail` no estado (alert-dashboard/src/components/AlertDashboard.tsx:98-101). Não há envio no sentido contrário, por isso a direção é `origem → destino`. A relação é ativa porque os dois componentes ficam na mesma página do host (src/App.tsx:62-67). Não há configuração que declare o canal; o nome do evento é a única correspondência.

**2. . → alert-sender.** O remote `AlertSender` do host (module-federation.config.ts:6) corresponde à unidade alert-sender pelo `name: "AlertSender"` e pelo `./AlertSender` exposto (alert-sender/module-federation.config.ts:2-6), que é o módulo importado em src/App.tsx:3; a porta e o `publicPath` 3001 (alert-sender/rspack.config.ts:25, 33) coincidem com a URL do remote e só corroboram. Ativa pela renderização de `<AlertSender />` em src/App.tsx:63.

**3. . → alert-dashboard.** Mesma forma da relação 2: remote `AlertDashboard` (module-federation.config.ts:7), resolvido por `name: "AlertDashboard"` e `./AlertDashboard` (alert-dashboard/module-federation.config.ts:2-6), import em src/App.tsx:4, porta e `publicPath` 3002 (alert-dashboard/rspack.config.ts:25, 33). Ativa pela renderização de `<AlertDashboard />` em src/App.tsx:66.

## Resumo

Relações: 3 (communication: 1, host → remote: 2). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
