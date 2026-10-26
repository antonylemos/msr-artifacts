---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
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

# 327 — samhoooo/module-federation-demo-mf2

## Leitura do repositório

A cadeia parte das dependências de Module Federation (#1–#2), passa pela exposição do cabeçalho em HeaderApp (#3) e pela configuração do consumidor HomeApp por manifesto (#4), chegando ao carregamento e à renderização no host (#6–#7). As duas unidades têm entradas e builds próprios (#8–#9, #11–#12). A correspondência do nome remoto e do módulo exposto sustenta uma relação ativa home-app → header-app (#10), num repositório com duas aplicações React/Rspack.

O import em declaração gerada (#5) é um sinal que não carrega código em runtime. A documentação descreve os papéis das unidades, a composição e a tipagem entre builds (#13–#21), mas a afirmação de build/deploy separado só é corroborada na parte do build (#22). Deploy independente não foi observado (#11–#12). O histórico esclarece que essa afirmação e as configurações de desenvolvimento coexistem desde o primeiro commit, sem um estágio de deploy abandonado registrado (#23); publicação externa e intenção futura permanecem fora do que ele esclarece.

## Observações

### 1. header-app/package.json:15

**Observação:** O manifesto de header-app declara `@module-federation/enhanced` em devDependencies, versão `^2.8.2`.

**Interpretação:** É um sinal tecnológico isolado de Module Federation; a configuração efetiva está em #3.

### 2. home-app/package.json:15

**Observação:** O manifesto de home-app declara `@module-federation/enhanced` em devDependencies, versão `^2.8.2`.

**Interpretação:** É um sinal tecnológico isolado de Module Federation; a configuração efetiva está em #4.

### 3. header-app/rspack.config.js:57-75

**Observação:** O `ModuleFederationPlugin` configura `name: "HeaderApp"`, `filename: "remoteEntry.js"`, exposição `./Header` a partir de `./src/App`, `dts: true` e React/ReactDOM compartilhados como singletons.

**Interpretação:** Configura a oferta de um módulo de UI e de tipos por uma unidade, sem nomear um consumidor.

### 4. home-app/rspack.config.js:46-66

**Observação:** O `ModuleFederationPlugin` configura `name: "HomeApp"`, remote `HeaderApp` em `HeaderApp@http://localhost:4001/mf-manifest.json`, `dts: true` e React/ReactDOM compartilhados como singletons.

**Interpretação:** Liga o host HomeApp à unidade remota HeaderApp por manifesto, configurando o consumo de código e tipos.

### 5. home-app/@mf-types/HeaderApp/apis.d.ts:3; home-app/tsconfig.json:15-17; home-app/@mf-types/index.d.ts:1-22

**Observação:** A declaração gerada usa `typeof import('HeaderApp/Header')` num tipo condicional. O tsconfig resolve `HeaderApp/*` para as declarações locais de `@mf-types`.

**Interpretação:** A sintaxe de import remoto neste arquivo é tipagem, não carregamento em runtime; a 3.4.4 registra Composição No.

### 6. home-app/src/App.tsx:13; home-app/rspack.config.js:51-53; header-app/rspack.config.js:60-62

**Observação:** `lazy(() => import('HeaderApp/Header'))` nomeia o módulo remoto. O host resolve HeaderApp pelo manifesto e o remote expõe `./Header` a partir de `./src/App`.

**Interpretação:** O carregamento nomeia o destino da composição e conecta o host ao módulo de UI de header-app.

### 7. home-app/src/App.tsx:11-20; header-app/src/App.tsx:14-20

**Observação:** Dentro de Suspense, o host renderiza `<Header title="Header (MF2)" variant={HeaderVariant.Light} />`. Header vem do lazy e HeaderVariant do import estático de `HeaderApp/Header`.

**Interpretação:** Integra o cabeçalho remoto à página por props; a renderização usa o componente preparado pelo carregamento, sem nomear diretamente o destino na tag.

### 8. header-app/; header-app/rspack.config.js:7; header-app/src/entry.ts:1; header-app/src/index.tsx:11-16; header-app/rspack.config.js:54-56; header-app/package.json:11

**Observação:** O diretório header-app tem manifesto, entrada própria por entry.ts e index.tsx, template HTML e configuração Rspack próprios; o script de build é `rspack build`.

**Interpretação:** Confirma o limite de uma unidade frontend, o remote HeaderApp, que também renderiza sua própria página.

### 9. home-app/; home-app/rspack.config.js:6; home-app/src/entry.ts:1; home-app/src/index.tsx:11-16; home-app/rspack.config.js:43-45; home-app/package.json:11

**Observação:** O diretório home-app tem manifesto, entrada própria por entry.ts e index.tsx, template HTML e configuração Rspack próprios; o script de build é `rspack build`.

**Interpretação:** Confirma o limite de outra unidade frontend, o host HomeApp.

### 10. home-app/src/App.tsx:13; home-app/src/App.tsx:19; home-app/rspack.config.js:51-53; header-app/rspack.config.js:58-62

**Observação:** home-app declara HeaderApp pelo manifesto, importa `HeaderApp/Header` e renderiza Header. O nome HeaderApp e a exposição `./Header` correspondem à configuração de header-app.

**Interpretação:** A relação host → remote está ativa e tem ambas as unidades no snapshot: o host compõe seu topo de página com a UI do remote.

### 11. header-app/package.json:10-12; header-app/rspack.config.js:6-81

**Observação:** header-app tem build próprio com `rspack build`; sua configuração Rspack usa modo development, porta 4001, publicPath localhost e o plugin de federação. A 3.4.6 registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Sustenta a separação do build da unidade, mas os artefatos de desenvolvimento não demonstram deploy independente.

### 12. home-app/package.json:10-12; home-app/rspack.config.js:5-72

**Observação:** home-app tem build próprio com `rspack build`; sua configuração Rspack usa modo development, porta 4000, publicPath localhost e o remote HeaderApp por manifesto. A 3.4.6 registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Sustenta a separação do build do host, sem demonstrar deploy independente.

### 13. README.md:3

**Observação:** O README apresenta um exemplo desenhado com o padrão arquitetural micro frontend usando Module Federation 2.0.

**Interpretação:** Afirma uma organização de MFE, corroborada pelas duas unidades e sua relação; a afirmação sozinha é semântica.

### 14. README.md:5-6

**Observação:** O README chama header-app de remote, diz que expõe `./Header` e publica `mf-manifest.json` e tipos `.d.ts` gerados.

**Interpretação:** Descreve o papel e a oferta da unidade remota, corroborados pela configuração, relação e declarações geradas.

### 15. README.md:11-12

**Observação:** O README chama home-app de host, consumidor de `HeaderApp/Header` pelo manifesto, com checagem de tipos mesmo em build separado.

**Interpretação:** Descreve o consumo entre unidades e a tipagem entre builds, corroborados pela relação, pelos builds e pelo paths do TypeScript.

### 16. README.md:19-20

**Observação:** O README manda iniciar header-app primeiro e diz que home-app busca nele o bundle de runtime e os tipos ao iniciar.

**Interpretação:** Descreve a dependência do consumidor em relação ao remote. Conforme a 3.4.7, os tipos são buscados no início; o código remoto é carregado quando o navegador abre o host.

### 17. README.md:28

**Observação:** O README orienta abrir `http://localhost:4001` para ver o remote Header App.

**Interpretação:** Afirma que o remote pode apresentar UI sozinho, corroborado pela entrada e pelo template próprios.

### 18. README.md:30

**Observação:** O README orienta checar os tipos de cada aplicação isoladamente com `npm run typecheck`.

**Interpretação:** Afirma autonomia da checagem de tipos das unidades, corroborada pelos scripts individuais e pelas declarações incluídas no host.

### 19. home-app/rspack.config.js:48-50

**Observação:** O comentário diz que os remotes são resolvidos pelo `mf-manifest.json` em vez de uma URL fixa de remoteEntry.js, permitindo resolução em runtime.

**Interpretação:** Descreve o mecanismo que liga consumidor e remote, corroborado pelo manifesto configurado e pelo import dinâmico. A URL do manifesto também é fixa, como ressalva a 3.4.7.

### 20. home-app/src/App.tsx:3-5

**Observação:** O comentário diz que o TypeScript baixou as declarações geradas de HeaderApp para `./@mf-types/HeaderApp` e as resolve pelo paths `HeaderApp/*`.

**Interpretação:** Descreve a ligação de tipos entre as unidades, corroborada pelas declarações, pelo mapeamento local e pelo dts configurado.

### 21. home-app/src/App.tsx:5-8

**Observação:** O comentário diz que HeaderVariant é um enum de header-app e que seu import traz tipo e valores de runtime do build remoto, sem pacote comum nem declarações escritas à mão.

**Interpretação:** Descreve consumo de valores e tipos entre builds, corroborado pelo import estático registrado nas Notas da 3.4.4, pelo enum e pela exposição do módulo.

### 22. home-app/src/App.tsx:8-10

**Observação:** O comentário diz que tsc rejeita props inválidas mesmo que header-app tenha build/deploy completamente separado.

**Interpretação:** A afirmação é parcial na 3.4.7: os builds são separados, mas o deploy separado não tem artefato observado.

### 23. eeac072 2026-08-10 (home-app/src/App.tsx; header-app/package.json; home-app/package.json; header-app/rspack.config.js; home-app/rspack.config.js)

**Observação:** A 3.4.8 registra que o primeiro commit cria o comentário sobre build/deploy separado e as duas aplicações com configurações de desenvolvimento. Os dois commits seguintes só alteram o README; nenhum dos três cria ou remove artefato de deploy. O ponto foi esclarecido.

**Interpretação:** O histórico explica que comentário e ausência de deploy provisionado coexistem desde a primeira presença observável, sem registrar um estágio de deploy abandonado. Não esclarece publicação fora do repositório nem intenção futura.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (header-app/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #3 |
| 2 | 3.4.2 (home-app/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 3 | 3.4.2 (header-app/package.json:15, Evidência); 3.4.3 (header-app, Marcadores e Build); 3.4.4 (home-app/src/App.tsx:13, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #2, #8, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #8; configura #10 |
| 4 | 3.4.2 (home-app/package.json:15, Evidência); 3.4.3 (home-app, Marcadores e Build); 3.4.4 (home-app/@mf-types/HeaderApp/apis.d.ts:3 e home-app/src/App.tsx:13, :19, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #2, #3, #4, #7, #8 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #6; configura #7; configura #9; configura #10 |
| 5 | 3.4.4 (home-app/@mf-types/HeaderApp/apis.d.ts:3) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 6 | 3.4.4 (home-app/src/App.tsx:13) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #10 |
| 7 | 3.4.4 (home-app/src/App.tsx:19) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #10 |
| 8 | 3.4.3 (header-app) | 4 estrutura | diretório | module-federation | arquitetural | moderada | — |
| 9 | 3.4.3 (home-app) | 4 estrutura | diretório | module-federation | arquitetural | moderada | — |
| 10 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #9; liga #8 |
| 11 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #8 |
| 12 | 3.4.6 #2 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #9 |
| 13 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #8; corrobora #9; corrobora #10 |
| 14 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3; corrobora #4; corrobora #10; corrobora home-app/@mf-types/HeaderApp/Header.d.ts:1-2 |
| 15 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #4; corrobora #10; corrobora #11; corrobora #12; corrobora home-app/tsconfig.json:15-17 |
| 16 | 3.4.7 #4 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #6; corrobora #4; corrobora header-app/rspack.config.js:14-20 |
| 17 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8 |
| 18 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora header-app/package.json:12; corrobora home-app/package.json:12; corrobora home-app/tsconfig.json:15-19 |
| 19 | 3.4.7 #7 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #4; corrobora #6; corrobora #10 |
| 20 | 3.4.7 #8 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #3; corrobora #4; corrobora home-app/tsconfig.json:15-17; corrobora home-app/@mf-types/HeaderApp/compiled-types/App.d.ts:1-12 |
| 21 | 3.4.7 #9 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora home-app/src/App.tsx:11; corrobora header-app/src/App.tsx:4-7; corrobora #3; corrobora home-app/@mf-types/index.d.ts:1-22 |
| 22 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #11; corrobora em parte #12 |
| 23 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #22; explica #11; explica #12 |

## Resumo

Observações: 23. Dimensões (tecnologia: 2, configuração: 2, código: 3, estrutura: 2, composição: 1, build-deploy: 2, documentação: 10, histórico: 1). Força (forte: 3, moderada: 6, fraca: 14, ambígua: 0). Evidência (tecnológica: 4, arquitetural: 19, contexto: 0).
