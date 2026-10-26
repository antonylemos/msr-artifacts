---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Leitura do repositório

Prova de conceito de um dashboard React com três projetos Vite independentes na raiz, sem workspace: `shell` (host), `mfe-weather` e `mfe-counter` (remotes). As três são unidades frontend com manifesto, entrada e build próprios (#11, #12, #13).

A cadeia de Module Federation está completa nas duas relações:
- **Dependência:** `@originjs/vite-plugin-federation` `^1.4.1`, declarada nas três unidades (#1, #2, #3).
- **Configuração:** cada remote se nomeia (`counter`, `weather`), gera `remoteEntry.js`, expõe `./Widget` e compartilha `react` e `react-dom` (#4, #5); o shell declara os dois remotes por URL e compartilha as mesmas bibliotecas (#6).
- **Código:** o shell importa `weather/Widget` e `counter/Widget` por `React.lazy` (#7, #8) e renderiza os dois componentes em cards do mesmo grid, sob `Suspense` (#9, #10).
- **Relação:** daí as relações ativas shell → mfe-weather e shell → mfe-counter (#14, #15).

Os três builds são separados, e nenhum deploy é observado: o único jeito de servir os builds é o `vite preview` local (#16, #17, #18). As URLs dos remotes no shell são fixas em `localhost`, nas portas 4173 e 4174, que não estão na configuração dos remotes; elas dependem de os previews subirem na ordem do README (#6, #14, #15). Isso limita a execução a uma máquina, mas não muda a composição.

A documentação é o README da raiz. Dez das onze afirmações são corroboradas pelas observações acima (#19 a #25, #27 a #29). A única sem artefato é o deploy independente (#26): nenhum Dockerfile, CI ou hospedagem existe no snapshot, e as três aplicações têm deploy `não observado`. O histórico tem 4 commits num só dia e não gerou pontos, porque as revisões anteriores não deixaram ambiguidade. Nada fica ambíguo no snapshot.

## Observações

### 1. mfe-counter/package.json:13

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do mfe-counter.

### 2. mfe-weather/package.json:13

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do mfe-weather.

### 3. shell/package.json:13

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell.

### 4. mfe-counter/vite.config.ts:3, 14-21

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "counter"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/bootstrap" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** O mfe-counter está configurado como remote de Module Federation, com nome próprio e um módulo exposto a um host.

**Nota:** O `server.port: 5174` (linhas 6-8) é porta de desenvolvimento e não entra.

### 5. mfe-weather/vite.config.ts:3, 14-21

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "weather"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/bootstrap" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** O mfe-weather está configurado como remote de Module Federation, com nome próprio e um módulo exposto a um host.

**Nota:** O `server.port: 5173` (linhas 6-8) é porta de desenvolvimento e não entra.

### 6. shell/vite.config.ts:3, 14-20

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `remotes: { weather: "http://localhost:4173/assets/remoteEntry.js", counter: "http://localhost:4174/assets/remoteEntry.js" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** A configuração do host declara os dois remotes, com nomes iguais aos que os remotes se dão (#4, #5), e o endereço local de cada um.

**Nota:** O `server.port: 5175` (linhas 6-8) é porta de desenvolvimento e não entra.

### 7. shell/src/App.tsx:3

**Observação:** `const WeatherWidget = React.lazy(() => import("weather/Widget"));`

**Interpretação:** O shell carrega em runtime o módulo `./Widget` do remote `weather`, pelo nome dele.

### 8. shell/src/App.tsx:4

**Observação:** `const CounterWidget = React.lazy(() => import("counter/Widget"));`

**Interpretação:** O shell carrega em runtime o módulo `./Widget` do remote `counter`, pelo nome dele.

### 9. shell/src/App.tsx:19; shell/src/App.tsx:17-21

**Observação:** `<WeatherWidget />`, dentro de `<Suspense fallback={<CardSkeleton title="Weather" />}>` e `<WidgetCard title="Weather">`. O componente vem do `React.lazy` da linha 3.

**Interpretação:** O shell renderiza o componente federado do weather num card do dashboard.

### 10. shell/src/App.tsx:25; shell/src/App.tsx:23-27

**Observação:** `<CounterWidget />`, dentro de `<Suspense fallback={<CardSkeleton title="Counter" />}>` e `<WidgetCard title="Counter">`. O componente vem do `React.lazy` da linha 4.

**Interpretação:** O shell renderiza o componente federado do counter num card do dashboard.

### 11. mfe-counter; mfe-counter/package.json:1-31; mfe-counter/index.html:10-11; mfe-counter/src/main.tsx:4-6; mfe-counter/vite.config.ts:5-23; mfe-counter/package.json:8

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.tsx`, entrada que monta `CounterWidget` com `ReactDOM.createRoot`, `vite.config.ts` próprio e script `build` `tsc -b && vite build`. Não há workspace.

**Interpretação:** É uma unidade frontend com limite próprio, que também roda sozinha.

### 12. mfe-weather; mfe-weather/package.json:1-31; mfe-weather/index.html:10-11; mfe-weather/src/main.tsx:4-6; mfe-weather/vite.config.ts:5-23; mfe-weather/package.json:8

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.tsx`, entrada que monta `WeatherWidget` com `ReactDOM.createRoot`, `vite.config.ts` próprio e script `build` `tsc -b && vite build`. Não há workspace.

**Interpretação:** É uma unidade frontend com limite próprio, que também roda sozinha.

### 13. shell; shell/package.json:1-31; shell/index.html:10-11; shell/src/main.tsx:5-7; shell/vite.config.ts:5-22; shell/package.json:8

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.tsx`, entrada que monta `App` com React, `vite.config.ts` próprio e script `build` `tsc -b && vite build`. Não há workspace.

**Interpretação:** É uma unidade frontend com limite próprio, e é a que contém os imports federados (#7, #8).

### 14. shell/src/App.tsx:3; shell/src/App.tsx:19; shell/vite.config.ts:16, 19; mfe-weather/vite.config.ts:15-18; mfe-weather/src/bootstrap.tsx:1-2

**Observação:** O especificador `weather/Widget` do shell corresponde ao remote `weather` (`http://localhost:4173/assets/remoteEntry.js`) da configuração do shell e, no mfe-weather, a `name: "weather"` e à chave `./Widget`, que aponta para `src/bootstrap`, que reexporta o `WeatherWidget`. O componente é renderizado no card "Weather". A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do shell para o mfe-weather. O destino é resolvido pelo nome e pela chave exposta; a porta 4173 depende de o preview do weather subir primeiro (README.md:67-69).

### 15. shell/src/App.tsx:4; shell/src/App.tsx:25; shell/vite.config.ts:17, 19; mfe-counter/vite.config.ts:15-18; mfe-counter/src/bootstrap.tsx:1-2

**Observação:** O especificador `counter/Widget` do shell corresponde ao remote `counter` (`http://localhost:4174/assets/remoteEntry.js`) da configuração do shell e, no mfe-counter, a `name: "counter"` e à chave `./Widget`, que aponta para `src/bootstrap`, que reexporta o `CounterWidget`. O componente é renderizado no card "Counter". A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do shell para o mfe-counter. A porta 4174 corresponde ao segundo `vite preview` da sequência do README (README.md:71-73).

### 16. mfe-counter/package.json:8; mfe-counter/vite.config.ts:5-23; mfe-counter/package.json:10

**Observação:** Script `build` `tsc -b && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` do remote `counter`. O único comando que serve o build é `vite preview`, local. Não há Dockerfile, CI nem configuração de hospedagem. `version: "0.0.0"` com `private: true`.

**Interpretação:** O mfe-counter tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 17. mfe-weather/package.json:8; mfe-weather/vite.config.ts:5-23; mfe-weather/package.json:10

**Observação:** Script `build` `tsc -b && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` do remote `weather`. O único comando que serve o build é `vite preview`, local. Não há Dockerfile, CI nem configuração de hospedagem. `version: "0.0.0"` com `private: true`.

**Interpretação:** O mfe-weather tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 18. shell/package.json:8; shell/vite.config.ts:5-22

**Observação:** Script `build` `tsc -b && vite build` com `vite.config.ts` próprio, que guarda só as URLs `localhost` dos `remoteEntry.js`, sem o código dos remotes. Não há Dockerfile, CI nem configuração de hospedagem. `version: "0.0.0"` com `private: true`.

**Interpretação:** O shell tem build separado, que só funciona contra remotes servidos na mesma máquina. O deploy não é observado, e não há versionamento usado em publicação.

### 19. README.md:3

**Observação:** "demonstrate the usage of **Microfrontends with Module Federation** using **Vite, React and TypeScript**"

**Interpretação:** Afirma um projeto de micro-frontends ligados por Module Federation. As três unidades (#11, #12, #13) e as duas relações de Module Federation (#14, #15) confirmam a afirmação.

### 20. README.md:5

**Observação:** "focusing on **application decoupling**, **independent builds**, and **runtime loading of remote front-end applications**"

**Interpretação:** Afirma desacoplamento, builds independentes e carga em runtime. Os três builds separados (#16, #17, #18), os imports por `React.lazy` (#7, #8) e as relações ativas (#14, #15) confirmam os três pontos.

### 21. README.md:11

**Observação:** "The application is composed of three independent front-end applications"

**Interpretação:** Afirma três aplicações frontend independentes, que são as três unidades do snapshot (#11, #12, #13).

### 22. README.md:13-14

**Observação:** "**Shell (Host)** Responsible for layout, orchestration and dynamically loading the microfrontends."

**Interpretação:** Atribui ao shell o papel de host que carrega os micro-frontends. O shell carrega os dois remotes (#7, #8) e é a origem das duas relações (#14, #15).

### 23. README.md:16-17

**Observação:** "**Weather Microfrontend** A standalone widget exposed remotely and loaded by the Shell."

**Interpretação:** Afirma que o weather roda sozinho, é exposto e é carregado pelo shell. A unidade com entrada própria (#12), a exposição de `./Widget` (#5), a relação com o shell (#14) e a entrada que monta o widget sozinho (mfe-weather/src/main.tsx:4-6) confirmam a afirmação.

### 24. README.md:19-20

**Observação:** "**Counter Microfrontend** Another standalone widget, independently built and consumed by the Shell."

**Interpretação:** Afirma que o counter roda sozinho, tem build próprio e é consumido pelo shell. A unidade (#11), o build separado (#16), a relação com o shell (#15) e a entrada que monta o widget sozinho (mfe-counter/src/main.tsx:4-6) confirmam a afirmação.

### 25. README.md:22, 24

**Observação:** "Each microfrontend: […] Can be developed […] independently"

**Interpretação:** Afirma desenvolvimento independente de cada micro-frontend. Cada remote tem manifesto, scripts `dev`, `build` e `preview` próprios e uma entrada que roda sem o shell (#11, #12; mfe-weather/package.json:6-11; mfe-counter/package.json:6-11), o que confirma a afirmação.

### 26. README.md:22, 24

**Observação:** "Each microfrontend: […] Can be […] deployed independently"

**Interpretação:** Afirma deploy independente de cada micro-frontend. Nenhum artefato do snapshot faz deploy: as três aplicações têm deploy não observado (#16, #17, #18). A afirmação fica sem corroboração; as URLs fixas em `localhost` não a desmentem nem a sustentam.

### 27. README.md:22, 25

**Observação:** "Each microfrontend: […] Is loaded at runtime via Module Federation"

**Interpretação:** Afirma carga em runtime por Module Federation. Os imports federados por `React.lazy` (#7, #8) e as duas relações ativas (#14, #15) confirmam a afirmação.

### 28. README.md:32-33

**Observação:** "**Module Federation** (`@originjs/vite-plugin-federation`)"

**Interpretação:** Nomeia a tecnologia de federação, a mesma declarada nas três unidades (#1, #2, #3) e usada nas duas relações (#14, #15).

### 29. README.md:45

**Observação:** "Integration of multiple applications in a single UI"

**Interpretação:** Afirma a integração de várias aplicações numa só interface. Os dois widgets remotos são renderizados em cards do mesmo grid do shell (#9, #10; shell/src/App.tsx:16-28).

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (mfe-counter/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (mfe-weather/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (shell/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (mfe-counter/package.json:13, Evidência); 3.4.3 (mfe-counter, Marcadores e Build); 3.4.4 (shell/src/App.tsx:4, Observação); 3.4.5 #2 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #11; configura #15 |
| 5 | 3.4.2 (mfe-weather/package.json:13, Evidência); 3.4.3 (mfe-weather, Marcadores e Build); 3.4.4 (shell/src/App.tsx:3, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #12; configura #14 |
| 6 | 3.4.2 (shell/package.json:13, Evidência); 3.4.3 (shell, Marcadores e Build); 3.4.4 (shell/src/App.tsx:3, shell/src/App.tsx:4, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #13; configura #14; configura #15 |
| 7 | 3.4.4 (shell/src/App.tsx:3) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #14 |
| 8 | 3.4.4 (shell/src/App.tsx:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 9 | 3.4.4 (shell/src/App.tsx:19) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #14 |
| 10 | 3.4.4 (shell/src/App.tsx:25) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #15 |
| 11 | 3.4.3 (mfe-counter) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.3 (mfe-weather) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #13; liga #12 |
| 15 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #13; liga #11 |
| 16 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #11 |
| 17 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #12 |
| 18 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #13 |
| 19 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #11; corrobora #12; corrobora #13; corrobora #14; corrobora #15 |
| 20 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18; corrobora #7; corrobora #8; corrobora #14; corrobora #15 |
| 21 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora #12; corrobora #13 |
| 22 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #14; corrobora #15; corrobora #7; corrobora #8 |
| 23 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #14; corrobora #5; corrobora mfe-weather/src/main.tsx:4-6 |
| 24 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora #16; corrobora #15; corrobora mfe-counter/src/main.tsx:4-6 |
| 25 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora #12; corrobora mfe-weather/package.json:6-11; corrobora mfe-counter/package.json:6-11 |
| 26 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 27 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #14; corrobora #15 |
| 28 | 3.4.7 #10 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #14; corrobora #15 |
| 29 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #10; corrobora shell/src/App.tsx:16-28 |

## Resumo

Observações: 29. Dimensões (tecnologia: 3, configuração: 3, código: 4, estrutura: 3, composição: 2, build-deploy: 3, documentação: 11, histórico: 0). Força (forte: 5, moderada: 10, fraca: 14, ambígua: 0). Evidência (tecnológica: 6, arquitetural: 23, contexto: 0).
