---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 136 — swtbhsmn/micro-frontend-demo

## Leitura do repositório

É uma demonstração mínima de Module Federation do webpack 5, com duas aplicações React em pastas próprias: `app1` (host) e `app2` (remote). A cadeia está completa:
- **Configuração:** o app2 se declara com `remoteEntry.js` e expõe `./RemoteApp` (#2), e o app1 declara o remote `app2` numa URL de localhost (#1). Os dois compartilham React como singleton.
- **Código:** o host importa `app2/RemoteApp` pelo nome do remote (#3) e o renderiza em `Suspense` (#6).
- **Relação:** isso resulta numa relação host → remote ativa (#9) entre duas unidades com limites próprios (#7, #8) e build separado (#10, #11).

Não há dimensão de tecnologia: o `ModuleFederationPlugin` vem do próprio pacote `webpack`, e a revisão de dependências não tem linha. A tecnologia aparece só na configuração. Os dois `import('./bootstrap')` são bootstraps internos (#4, #5) e não mostram, sozinhos, a federação.

O limite está na publicação: as duas aplicações só rodam em modo development, e não há artefato de deploy (#10, #11). O README confirma os papéis e a composição (#12 a #14). O histórico tem dois commits do mesmo dia e nenhum ponto ambíguo, por isso não há observação histórica.

## Observações

### 1. app1/webpack.config.js:2, 28-34

**Observação:** `ModuleFederationPlugin`, importado de `webpack`, declara `name: "app1"`, o remote `app2: "app2@http://localhost:3002/remoteEntry.js"` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** A configuração do host declara o app2 como remote e onde encontrá-lo em desenvolvimento.

### 2. app2/webpack.config.js:2, 28-35

**Observação:** `ModuleFederationPlugin`, importado de `webpack`, declara `name: "app2"` e `filename: "remoteEntry.js"`, expõe `./RemoteApp` (`./src/RemoteApp`) e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O app2 está configurado como remote e oferece seu componente a um host.

### 3. app1/src/App.jsx:2

**Observação:** `const RemoteApp = React.lazy(() => import('app2/RemoteApp'));`.

**Interpretação:** O host importa sob demanda o componente exposto pelo app2, pelo nome do remote.

### 4. app1/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno ao app1.

### 5. app2/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno ao app2.

### 6. app1/src/App.jsx:8-10

**Observação:** `<RemoteApp />` dentro de `Suspense`, com fallback "Loading remote...".

**Interpretação:** O host renderiza o componente remoto do app2 na própria página.

### 7. app1; app1/package.json:1-21; app1/src/index.js:1; app1/src/bootstrap.js:5-6; app1/webpack.config.js:5-40; app1/package.json:6

**Observação:** Tem pacote próprio, entrada `./src/index.js`, montagem React em `#root` e configuração webpack própria, servida por `webpack serve` na porta 3001.

**Interpretação:** É uma unidade frontend com limite próprio.

### 8. app2; app2/package.json:1-21; app2/src/index.js:1; app2/src/bootstrap.js:5-6; app2/webpack.config.js:5-41; app2/package.json:6

**Observação:** Tem pacote próprio, entrada `./src/index.js`, montagem React em `#root` e configuração webpack própria, servida por `webpack serve` na porta 3002.

**Interpretação:** É uma unidade frontend com limite próprio.

### 9. app1/src/App.jsx:2, 9; app1/webpack.config.js:30-31; app2/webpack.config.js:29-32

**Observação:** O app1 importa `app2/RemoteApp` e o renderiza. O nome `app2`, o `remoteEntry.js` e o módulo `./RemoteApp` correspondem à configuração do app2.

**Interpretação:** É uma relação host → remote ativa.

### 10. app1/webpack.config.js:5-40; app1/package.json:6

**Observação:** Tem configuração webpack e script `start` (`webpack serve --mode development --port 3001`) próprios, sem script de build de produção. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, usada só em desenvolvimento, sem deploy observado.

### 11. app2/webpack.config.js:5-41; app2/package.json:6

**Observação:** Tem configuração webpack e script `start` (`webpack serve --mode development --port 3002`) próprios, que geram o `remoteEntry.js`, sem script de build de produção. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, usada só em desenvolvimento, sem deploy observado.

### 12. README.txt:1

**Observação:** "Microfrontend Webpack Module Federation demo".

**Interpretação:** Apresenta o projeto como micro-frontends com Module Federation do webpack. A afirmação é corroborada.

### 13. README.txt:3-5

**Observação:** "Two apps: / - app1 (host) -> http://localhost:3001 / - app2 (remote) -> http://localhost:3002".

**Interpretação:** Afirma duas aplicações com os papéis de host e remote. A afirmação é corroborada.

### 14. README.txt:14

**Observação:** "app1 will open at http://localhost:3001 and load remote component from app2".

**Interpretação:** Afirma que o host carrega o componente do remote. A afirmação é corroborada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (app1, Marcadores, Entrada e Build); 3.4.4 (app1/src/App.jsx:2, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.6 #2 (Onde é servida); 3.4.7 #1 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #7; configura #9 |
| 2 | 3.4.3 (app2, Marcadores, Entrada e Build); 3.4.4 (app1/src/App.jsx:2, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #1 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #8; configura #9 |
| 3 | 3.4.4 (app1/src/App.jsx:2) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #9 |
| 4 | 3.4.4 (app1/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 5 | 3.4.4 (app2/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 6 | 3.4.4 (app1/src/App.jsx:9) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #9 |
| 7 | 3.4.3 (app1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 8 | 3.4.3 (app2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 9 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #7; liga #8 |
| 10 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #7 |
| 11 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #8 |
| 12 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #1; corrobora #2 |
| 13 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #11 |
| 14 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #3; corrobora #6 |

## Resumo

Observações: 14. Dimensões (tecnologia: 0, configuração: 2, código: 4, estrutura: 2, composição: 1, build-deploy: 2, documentação: 3, histórico: 0). Força (forte: 3, moderada: 6, fraca: 5, ambígua: 0). Evidência (tecnológica: 4, arquitetural: 10, contexto: 0).
