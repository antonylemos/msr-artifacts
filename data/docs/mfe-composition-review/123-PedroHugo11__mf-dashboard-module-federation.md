---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Leitura do repositório

Prova de conceito de um dashboard React com Vite e `@originjs/vite-plugin-federation`, em três projetos independentes na raiz, sem workspace. `shell` é o host e `mfe-weather` e `mfe-counter` são remotes de Module Federation. O shell declara os dois remotes por URL fixa em `localhost` (shell/vite.config.ts:14-18) e compartilha `react` e `react-dom` (shell/vite.config.ts:19); cada remote se nomeia, gera `remoteEntry.js` e expõe a chave `./Widget`, que aponta para o seu `src/bootstrap` (mfe-weather/vite.config.ts:14-20; mfe-counter/vite.config.ts:14-20). O `bootstrap.tsx` só reexporta o widget da unidade (mfe-weather/src/bootstrap.tsx:1-2; mfe-counter/src/bootstrap.tsx:1-2).

A composição é por componentes num só dashboard. O shell carrega `weather/Widget` e `counter/Widget` por `React.lazy` (shell/src/App.tsx:3-4) e os renderiza em dois cards, cada um sob `Suspense` com um esqueleto de carregamento (shell/src/App.tsx:16-28). Os tipos dos dois módulos federados são declarados à mão como componentes sem props (shell/src/vite-env.d.ts:1-9). Cada remote também roda sozinho, montando o mesmo widget que expõe (mfe-weather/src/main.tsx:4-6; mfe-counter/src/main.tsx:4-6).

As URLs dos remotes usam as portas 4173 e 4174 (shell/vite.config.ts:16-17), e não as portas de `server.port` dos remotes, 5173 e 5174 (mfe-weather/vite.config.ts:6-8; mfe-counter/vite.config.ts:6-8). Elas casam com o `vite preview` dos remotes, que não tem porta própria (mfe-counter/package.json:10), na ordem do README: build e preview de weather, depois de counter, e então `npm run dev` no shell (README.md:67-78). Não há comunicação entre as unidades, custom elements, iframes nem scripts injetados (revisão de código-fonte, Notas). Todas as três unidades estão em alguma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | mfe-weather | host → remote | origem → destino | module-federation | Yes | Yes | shell/vite.config.ts:16 (remote `weather` em `http://localhost:4173/assets/remoteEntry.js`); shell/vite.config.ts:19 (`shared` react, react-dom); mfe-weather/vite.config.ts:15-18 (`name: "weather"`, `filename: "remoteEntry.js"`, expõe `./Widget`) | shell/src/App.tsx:3; shell/src/App.tsx:19 |
| 2 | shell | mfe-counter | host → remote | origem → destino | module-federation | Yes | Yes | shell/vite.config.ts:17 (remote `counter` em `http://localhost:4174/assets/remoteEntry.js`); shell/vite.config.ts:19 (`shared` react, react-dom); mfe-counter/vite.config.ts:15-18 (`name: "counter"`, `filename: "remoteEntry.js"`, expõe `./Widget`) | shell/src/App.tsx:4; shell/src/App.tsx:25 |

## Observações

**1. shell → mfe-weather.** O especificador `weather/Widget` (shell/src/App.tsx:3) corresponde ao remote `weather` do shell (shell/vite.config.ts:16) e, na unidade mfe-weather, ao `name: "weather"` e à chave `./Widget` (mfe-weather/vite.config.ts:15-18); o destino foi resolvido por esse nome e pela chave exposta, não pela porta. O arquivo exposto exporta por default o `WeatherWidget` (mfe-weather/src/bootstrap.tsx:1-2), renderizado no card "Weather" (shell/src/App.tsx:17-21). Ativa porque as duas linhas de código são `Yes`. A porta 4173 da URL não está fixada na configuração do remote; ela depende de o `vite preview` de weather subir primeiro, como o README manda (README.md:67-69).

**2. shell → mfe-counter.** Mesma resolução: `counter/Widget` (shell/src/App.tsx:4), remote `counter` (shell/vite.config.ts:17), `name: "counter"` e `./Widget` (mfe-counter/vite.config.ts:15-18), que reexporta o `CounterWidget` (mfe-counter/src/bootstrap.tsx:1-2), renderizado no card "Counter" (shell/src/App.tsx:23-27). Ativa porque as duas linhas de código são `Yes`. A porta 4174 também não está fixada no remote e corresponde ao segundo `vite preview` da sequência do README (README.md:71-73).

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
