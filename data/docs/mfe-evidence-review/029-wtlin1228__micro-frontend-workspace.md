---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
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
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Leitura do repositório

Um host React compõe quatro aplicações por dois mecanismos ao mesmo tempo, a partir de um único registro, `APP_CONFIGS` (#32). Esse registro é a única observação de código que nomeia diretamente as unidades de destino. As demais construções do host são genéricas: recebem o nome e a entrada do registro.

**Module Federation em runtime (app-mf-1 e app-mf-2):**
- **Dependências:** o plugin de federação do Rsbuild e o runtime `@module-federation/enhanced` (#1 a #3, #5).
- **Configuração:**
  - cada remote se declara, expõe a fábrica do componente e fixa seu caminho público (#6 a #9);
  - o host configura a federação com os `remotes` estáticos comentados (#10, #11).
- **Código:** o host registra e carrega cada remote sob demanda, quando a rota é acessada (#17 a #19, #33 a #35).

**qiankun (app-qiankun-1 e app-qiankun-2):**
- **Dependência:** `qiankun` (#4).
- **Configuração:** cada sub-app é empacotada como biblioteca UMD com nome próprio (#12, #13).
- **Código:** cada sub-app exporta os lifecycles (#20 a #27). O host registra as duas no orquestrador e o inicia (#28 a #31).

**Relações:** as duas cadeias resultam em quatro relações ativas (#43 a #46), entre cinco unidades com limites próprios.

Todas as aplicações têm build próprio, mas a saída fica presa a `localhost`, e não há deploy (#47 a #51). A documentação é curta e confere com a implementação, inclusive na combinação dos dois mecanismos (#53). O único ponto histórico, os `remotes` comentados, é resolvido pelo próprio snapshot (#55).

## Observações

### 1. packages/app-mf-1/package.json:17

**Observação:** `@module-federation/rsbuild-plugin` (`^0.18.3`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do app-mf-1.

### 2. packages/app-mf-2/package.json:17

**Observação:** `@module-federation/rsbuild-plugin` (`^0.18.3`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do app-mf-2.

### 3. packages/host/package.json:11

**Observação:** `@module-federation/enhanced` (`^0.18.3`) está declarada em `dependencies`.

**Interpretação:** O runtime de federação está presente no host, que o usa para carregar os remotes.

### 4. packages/host/package.json:13

**Observação:** `qiankun` (`^2.10.16`) está declarada em `dependencies`.

**Interpretação:** O orquestrador qiankun está presente no host.

### 5. packages/host/package.json:19

**Observação:** `@module-federation/rsbuild-plugin` (`^0.18.3`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do host.

### 6. packages/app-mf-1/module-federation.config.ts:1-13

**Observação:** `createModuleFederationConfig` declara `name: 'mf1'`, expõe `.` (`./src/exposed.tsx`), compartilha `react` e `react-dom` como singletons e fixa `getPublicPath` em `http://localhost:4001/`.

**Interpretação:** O app-mf-1 está configurado como remote, com um caminho público fixo.

### 7. packages/app-mf-1/rsbuild.config.ts:1-25

**Observação:** Aplica `pluginModuleFederation(moduleFederationConfig)`, com `assetPrefix: 'http://localhost:4001/'` e porta 4001.

**Interpretação:** O build do app-mf-1 usa o plugin de federação.

### 8. packages/app-mf-2/module-federation.config.ts:1-13

**Observação:** `createModuleFederationConfig` declara `name: 'mf2'`, expõe `.` (`./src/exposed.tsx`), compartilha `react` e `react-dom` como singletons e fixa `getPublicPath` em `http://localhost:4002/`.

**Interpretação:** O app-mf-2 está configurado como remote, com um caminho público fixo.

### 9. packages/app-mf-2/rsbuild.config.ts:1-25

**Observação:** Aplica `pluginModuleFederation(moduleFederationConfig)`, com `assetPrefix: 'http://localhost:4002/'` e porta 4002.

**Interpretação:** O build do app-mf-2 usa o plugin de federação.

### 10. packages/host/module-federation.config.ts:1-16

**Observação:** `createModuleFederationConfig` declara `name: 'host'` e `remotes` vazio, com `mf1` e `mf2` comentados e um comentário que remete à API de runtime. Usa `shareStrategy: 'loaded-first'` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O host está configurado como participante da federação, mas não declara remotes estáticos.

**Nota:** A configuração é do host, mas não nomeia remotes ativos. Por isso fica `moderada`, e não `forte`.

### 11. packages/host/rsbuild.config.ts:1-22

**Observação:** Aplica `pluginModuleFederation(moduleFederationConfig)`, com porta 3000.

**Interpretação:** O build do host usa o plugin de federação.

### 12. packages/app-qiankun-1/rsbuild.config.ts:1-29

**Observação:** Empacota a aplicação como biblioteca `umd` chamada `qiankun1`, com `assetPrefix: 'http://localhost:3001/'` e porta 3001.

**Interpretação:** A sub-app está configurada para expor seus lifecycles ao orquestrador, pelo nome da biblioteca.

### 13. packages/app-qiankun-2/rsbuild.config.ts:1-29

**Observação:** Empacota a aplicação como biblioteca `umd` chamada `qiankun2`, com `assetPrefix: 'http://localhost:3002/'` e porta 3002.

**Interpretação:** A sub-app está configurada para expor seus lifecycles ao orquestrador, pelo nome da biblioteca.

### 14. packages/app-mf-1/src/index.tsx:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 15. packages/app-mf-2/src/index.tsx:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 16. packages/host/src/index.tsx:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno ao host.

### 17. packages/host/src/app-loaders/module-federation.ts:1-4

**Observação:** Importa `registerRemotes` e `loadRemote` de `@module-federation/enhanced/runtime`.

**Interpretação:** O mecanismo de registro e carga em runtime está disponível no host.

### 18. packages/host/src/app-loaders/module-federation.ts:27-32

**Observação:** `registerRemotes` com o nome e a entrada vindos do registro de aplicações.

**Interpretação:** O host registra em runtime o remote indicado pelo registro.

### 19. packages/host/src/app-loaders/module-federation.ts:34-43

**Observação:** `loadRemote` carrega o módulo do remote e obtém a fábrica `getRootComponent`.

**Interpretação:** O host carrega em runtime o componente do remote indicado.

### 20. packages/app-qiankun-1/src/index.tsx:1

**Observação:** Reexporta os lifecycles de `./lifecycles`.

**Interpretação:** A sub-app oferece seus lifecycles ao orquestrador.

### 21. packages/app-qiankun-1/src/lifecycles.tsx:14-16

**Observação:** `bootstrap`, que só registra log.

**Interpretação:** Faz parte do contrato de lifecycle da sub-app.

### 22. packages/app-qiankun-1/src/lifecycles.tsx:22-39

**Observação:** `mount` cria a raiz React no contêiner recebido e renderiza a aplicação com o `basepath`.

**Interpretação:** É o lifecycle que insere a sub-app na página do host.

### 23. packages/app-qiankun-1/src/lifecycles.tsx:45-52

**Observação:** `unmount` desmonta a raiz React.

**Interpretação:** É o lifecycle que retira a sub-app da página do host.

### 24. packages/app-qiankun-2/src/index.tsx:1

**Observação:** Reexporta os lifecycles de `./lifecycles`.

**Interpretação:** A sub-app oferece seus lifecycles ao orquestrador.

### 25. packages/app-qiankun-2/src/lifecycles.tsx:14-16

**Observação:** `bootstrap`, que só registra log.

**Interpretação:** Faz parte do contrato de lifecycle da sub-app.

### 26. packages/app-qiankun-2/src/lifecycles.tsx:22-39

**Observação:** `mount` cria a raiz React no contêiner recebido e renderiza a aplicação com o `basepath`.

**Interpretação:** É o lifecycle que insere a sub-app na página do host.

### 27. packages/app-qiankun-2/src/lifecycles.tsx:45-52

**Observação:** `unmount` desmonta a raiz React.

**Interpretação:** É o lifecycle que retira a sub-app da página do host.

### 28. packages/host/src/app-loaders/qiankun.ts:2

**Observação:** Importa `registerMicroApps` e `start` de `qiankun`.

**Interpretação:** O orquestrador está disponível no host.

### 29. packages/host/src/app-loaders/qiankun.ts:10-25

**Observação:** `registerMicroApps` com `entry`, `container` e `activeRule` de cada aplicação qiankun do registro.

**Interpretação:** O host registra as sub-apps no orquestrador, com a regra de ativação por caminho.

### 30. packages/host/src/App.tsx:7-9

**Observação:** Um `useEffect` do `App` chama o registro das aplicações qiankun.

**Interpretação:** O registro é disparado quando o host monta.

### 31. packages/host/src/app-loaders/qiankun.ts:26

**Observação:** `start()` depois do registro.

**Interpretação:** O host inicia o orquestrador.

### 32. packages/host/src/configs/apps.ts:9-34

**Observação:** `APP_CONFIGS` declara `app-mf-1` (`mf1`) e `app-mf-2` (`mf2`) como "Module Federation", com entrada `mf-manifest.json` em `localhost:4001` e `4002`. Declara `app-qiankun-1` (`qiankun1`) e `app-qiankun-2` (`qiankun2`) como "Qiankun", com `index.html` em `localhost:3001` e `3002`.

**Interpretação:** O host declara num único registro as quatro unidades que compõe e o mecanismo de cada uma.

### 33. packages/host/src/routes/apps.$baseRoute.tsx:12-25

**Observação:** O loader da rota `/apps/$baseRoute` chama `getRemote` do carregador para a aplicação selecionada.

**Interpretação:** A carga do remote é disparada pela navegação.

### 34. packages/host/src/routes/apps.$baseRoute.tsx:39-45

**Observação:** `React.lazy` aguarda o componente devolvido pela fábrica do remote.

**Interpretação:** O componente remoto é carregado de forma preguiçosa.

### 35. packages/host/src/routes/apps.$baseRoute.tsx:52-56

**Observação:** Renderiza `RootComponent` dentro de `Suspense`.

**Interpretação:** O host renderiza o componente remoto na própria árvore.

### 36. .; package.json:1-16; pnpm-workspace.yaml:1-2

**Observação:** É a raiz do workspace pnpm (`packages/*`), com os scripts de build em etapas e sem entrada de UI.

**Interpretação:** É a raiz de coordenação de um monorepo, e não uma unidade.

### 37. packages/app-mf-1; packages/app-mf-1/package.json:1-12; packages/app-mf-1/src/index.tsx:1; packages/app-mf-1/src/bootstrap.tsx:6-15; packages/app-mf-1/rsbuild.config.ts:7-17

**Observação:** Tem manifesto, entrada e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 38. packages/app-mf-2; packages/app-mf-2/package.json:1-12; packages/app-mf-2/src/index.tsx:1; packages/app-mf-2/src/bootstrap.tsx:6-15; packages/app-mf-2/rsbuild.config.ts:7-17

**Observação:** Tem manifesto, entrada e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 39. packages/app-qiankun-1; packages/app-qiankun-1/package.json:1-12; packages/app-qiankun-1/src/index.tsx:1; packages/app-qiankun-1/src/lifecycles.tsx:22-38; packages/app-qiankun-1/rsbuild.config.ts:5-16

**Observação:** Tem manifesto, entrada que exporta lifecycles e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio, iniciada pelo `mount`.

### 40. packages/app-qiankun-2; packages/app-qiankun-2/package.json:1-12; packages/app-qiankun-2/src/index.tsx:1; packages/app-qiankun-2/src/lifecycles.tsx:22-38; packages/app-qiankun-2/rsbuild.config.ts:5-16

**Observação:** Tem manifesto, entrada que exporta lifecycles e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio, iniciada pelo `mount`.

### 41. packages/host; packages/host/package.json:1-12; packages/host/src/index.tsx:1; packages/host/src/bootstrap.tsx:5-12; packages/host/rsbuild.config.ts:7-17

**Observação:** Tem manifesto, entrada e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 42. packages/lib-app-interface; packages/lib-app-interface/package.json:1-19; packages/lib-app-interface/rslib.config.ts:4-16

**Observação:** É uma biblioteca de contrato e tipos construída com Rslib, sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, e não uma unidade frontend.

### 43. packages/host/src/configs/apps.ts:10-15; packages/host/src/app-loaders/module-federation.ts:27-43; packages/host/src/routes/apps.$baseRoute.tsx:24, 52-56; packages/app-mf-1/module-federation.config.ts:4-7

**Observação:** O host registra `mf1` com a entrada `http://localhost:4001/mf-manifest.json`, carrega a fábrica exposta e renderiza o componente. O nome corresponde à configuração do app-mf-1.

**Interpretação:** É uma relação host → remote ativa.

### 44. packages/host/src/configs/apps.ts:16-21; packages/host/src/app-loaders/module-federation.ts:27-43; packages/host/src/routes/apps.$baseRoute.tsx:24, 52-56; packages/app-mf-2/module-federation.config.ts:4-7

**Observação:** O mesmo fluxo para `mf2`, com entrada em `localhost:4002`.

**Interpretação:** É uma relação host → remote ativa.

### 45. packages/host/src/configs/apps.ts:22-27; packages/host/src/app-loaders/qiankun.ts:12-26; packages/app-qiankun-1/rsbuild.config.ts:13-15; packages/app-qiankun-1/src/lifecycles.tsx:14-52

**Observação:** O host registra `app-qiankun-1` no qiankun com entrada `http://localhost:3001/index.html` e `activeRule` `/apps/app-qiankun-1`. O nome `qiankun1` corresponde à biblioteca UMD da sub-app.

**Interpretação:** É uma relação root-config → application ativa.

### 46. packages/host/src/configs/apps.ts:28-33; packages/host/src/app-loaders/qiankun.ts:12-26; packages/app-qiankun-2/rsbuild.config.ts:13-15; packages/app-qiankun-2/src/lifecycles.tsx:14-52

**Observação:** O mesmo fluxo para `app-qiankun-2`, com entrada em `localhost:3002`.

**Interpretação:** É uma relação root-config → application ativa.

### 47. packages/app-mf-1/rsbuild.config.ts:7-25; packages/app-mf-1/package.json:7; package.json:11

**Observação:** Tem `rsbuild build` próprio, disparado com os outros remotes por `build:apps`. O `assetPrefix` é fixo em `localhost:4001`, e não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, presa a `localhost`, sem deploy observado.

### 48. packages/app-mf-2/rsbuild.config.ts:7-25; packages/app-mf-2/package.json:7; package.json:11

**Observação:** Tem `rsbuild build` próprio, com `assetPrefix` fixo em `localhost:4002`, e não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, presa a `localhost`, sem deploy observado.

### 49. packages/app-qiankun-1/rsbuild.config.ts:5-29; packages/app-qiankun-1/package.json:7; package.json:11

**Observação:** Tem `rsbuild build` próprio, que gera a biblioteca UMD `qiankun1` com `assetPrefix` fixo em `localhost:3001`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, presa a `localhost`, sem deploy observado.

### 50. packages/app-qiankun-2/rsbuild.config.ts:5-29; packages/app-qiankun-2/package.json:7; package.json:11

**Observação:** Tem `rsbuild build` próprio, que gera a biblioteca UMD `qiankun2` com `assetPrefix` fixo em `localhost:3002`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, presa a `localhost`, sem deploy observado.

### 51. packages/host/rsbuild.config.ts:7-22; packages/host/package.json:7; package.json:14

**Observação:** Tem `rsbuild build` próprio, com script de raiz separado, rodado depois dos remotes. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 52. README.md:1

**Observação:** "micro-frontend workspace".

**Interpretação:** Apresenta o repositório como um workspace de micro-frontends. A afirmação é corroborada.

### 53. package.json:4

**Observação:** "a micro-frontend workspace architected by qiankun and module federation".

**Interpretação:** Afirma que o workspace combina qiankun e Module Federation. A afirmação é corroborada.

### 54. packages/host/module-federation.config.ts:6-7

**Observação:** "we use the runtime API to load our remotes / see `src/app-loaders/module-federation.ts`".

**Interpretação:** Afirma que os remotes são carregados pela API de runtime. A afirmação é corroborada.

### 55. packages/host/module-federation.config.ts:5-10 (resolvido pelo snapshot)

**Observação:** Os `remotes` estáticos do host estão comentados, e o próprio arquivo explica que os remotes são carregados pela API de runtime.

**Interpretação:** As entradas comentadas não são resto de um estágio abandonado. O snapshot resolve o ponto.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (packages/app-mf-1/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6; declara #7 |
| 2 | 3.4.2 (packages/app-mf-2/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8; declara #9 |
| 3 | 3.4.2 (packages/host/package.json:11) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #17; declara #18; declara #19 |
| 4 | 3.4.2 (packages/host/package.json:13) | 1 tecnologia | manifesto | qiankun | tecnológica | fraca | declara #28; declara #29; declara #31 |
| 5 | 3.4.2 (packages/host/package.json:19) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #10; declara #11 |
| 6 | 3.4.2 (packages/app-mf-1/package.json:17, Evidência); 3.4.3 (packages/app-mf-1, Marcadores); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #37; configura #43 |
| 7 | 3.4.2 (packages/app-mf-1/package.json:17, Evidência); 3.4.3 (packages/app-mf-1, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #37; configura #43 |
| 8 | 3.4.2 (packages/app-mf-2/package.json:17, Evidência); 3.4.3 (packages/app-mf-2, Marcadores); 3.4.5 #2 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38; configura #44 |
| 9 | 3.4.2 (packages/app-mf-2/package.json:17, Evidência); 3.4.3 (packages/app-mf-2, Marcadores e Build); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38; configura #44 |
| 10 | 3.4.2 (packages/host/package.json:19, Evidência); 3.4.3 (packages/host, Marcadores); 3.4.7 #3 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #41 |
| 11 | 3.4.2 (packages/host/package.json:19, Evidência); 3.4.3 (packages/host, Marcadores e Build); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #41 |
| 12 | 3.4.3 (packages/app-qiankun-1, Marcadores e Build); 3.4.5 #3 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | qiankun | tecnológica | moderada | configura #39; configura #45 |
| 13 | 3.4.3 (packages/app-qiankun-2, Marcadores e Build); 3.4.5 #4 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | qiankun | tecnológica | moderada | configura #40; configura #46 |
| 14 | 3.4.4 (packages/app-mf-1/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 15 | 3.4.4 (packages/app-mf-2/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 16 | 3.4.4 (packages/host/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 17 | 3.4.4 (packages/host/src/app-loaders/module-federation.ts:3) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #43; implementa #44 |
| 18 | 3.4.4 (packages/host/src/app-loaders/module-federation.ts:27) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #43; implementa #44 |
| 19 | 3.4.4 (packages/host/src/app-loaders/module-federation.ts:34) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #43; implementa #44 |
| 20 | 3.4.4 (packages/app-qiankun-1/src/index.tsx:1) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45 |
| 21 | 3.4.4 (packages/app-qiankun-1/src/lifecycles.tsx:14) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45 |
| 22 | 3.4.4 (packages/app-qiankun-1/src/lifecycles.tsx:22) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45 |
| 23 | 3.4.4 (packages/app-qiankun-1/src/lifecycles.tsx:45) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45 |
| 24 | 3.4.4 (packages/app-qiankun-2/src/index.tsx:1) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #46 |
| 25 | 3.4.4 (packages/app-qiankun-2/src/lifecycles.tsx:14) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #46 |
| 26 | 3.4.4 (packages/app-qiankun-2/src/lifecycles.tsx:22) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #46 |
| 27 | 3.4.4 (packages/app-qiankun-2/src/lifecycles.tsx:45) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #46 |
| 28 | 3.4.4 (packages/host/src/app-loaders/qiankun.ts:2) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45; implementa #46 |
| 29 | 3.4.4 (packages/host/src/app-loaders/qiankun.ts:25) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45; implementa #46 |
| 30 | 3.4.4 (packages/host/src/App.tsx:8) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45; implementa #46 |
| 31 | 3.4.4 (packages/host/src/app-loaders/qiankun.ts:26) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #45; implementa #46 |
| 32 | 3.4.4 (packages/host/src/configs/apps.ts:9) | 3 código | código-fonte | module-federation; qiankun | arquitetural | forte | implementa #43; implementa #44; implementa #45; implementa #46 |
| 33 | 3.4.4 (packages/host/src/routes/apps.$baseRoute.tsx:24) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #43; implementa #44 |
| 34 | 3.4.4 (packages/host/src/routes/apps.$baseRoute.tsx:43) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #43; implementa #44 |
| 35 | 3.4.4 (packages/host/src/routes/apps.$baseRoute.tsx:54) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #43; implementa #44 |
| 36 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 37 | 3.4.3 (packages/app-mf-1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 38 | 3.4.3 (packages/app-mf-2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 39 | 3.4.3 (packages/app-qiankun-1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 40 | 3.4.3 (packages/app-qiankun-2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 41 | 3.4.3 (packages/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 42 | 3.4.3 (packages/lib-app-interface) | 4 estrutura | diretório | — | contexto | fraca | — |
| 43 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #41; liga #37 |
| 44 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #41; liga #38 |
| 45 | 3.4.5 #3 | 5 composição | código-fonte | qiankun | arquitetural | forte | liga #41; liga #39 |
| 46 | 3.4.5 #4 | 5 composição | código-fonte | qiankun | arquitetural | forte | liga #41; liga #40 |
| 47 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #37 |
| 48 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #38 |
| 49 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #39 |
| 50 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #40 |
| 51 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #41 |
| 52 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #37; corrobora #38; corrobora #39; corrobora #40; corrobora #41 |
| 53 | 3.4.7 #2 | 7 documentação | comentário | module-federation; qiankun | arquitetural | fraca | corrobora #4; corrobora #5; corrobora #43; corrobora #44; corrobora #45; corrobora #46 |
| 54 | 3.4.7 #3 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #10; corrobora #18; corrobora #19 |
| 55 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #10; explica #54 |

## Resumo

Observações: 55. Dimensões (tecnologia: 5, configuração: 8, código: 22, estrutura: 7, composição: 4, build-deploy: 5, documentação: 3, histórico: 1). Força (forte: 5, moderada: 36, fraca: 14, ambígua: 0). Evidência (tecnológica: 35, arquitetural: 18, contexto: 2).
