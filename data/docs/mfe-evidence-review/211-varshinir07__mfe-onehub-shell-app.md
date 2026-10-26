---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Leitura do repositório

O snapshot contém só o host React `onehub`, com entrada e build próprios (#12, #17). Uma única configuração Webpack declara dois remotes externos, `subscription` e `ownership`, em URLs localhost, além do compartilhamento de React (#1). Os cinco imports nomeiam módulos desses remotes (#2–#6), e os cinco elementos os inserem no Dashboard sob Suspense (#7–#11). Essa cadeia sustenta as duas relações host → remote ativas (#15, #16), sem inspecionar os provedores ausentes nem confirmar seus builds, deploys ou compartilhamento de bibliotecas.

Não há dependência a extrair da 3.4.2: o mecanismo é o plugin do próprio Webpack, observado na configuração. As pastas public e src são partes da mesma unidade (#13, #14). O build separado observado é do host e usa modo de desenvolvimento; deploy não foi observado (#17).

O README chama o projeto de remote, em contradição com o papel de host (#18). Os comentários sobre consumo e federação são corroborados (#19–#21), enquanto o compartilhamento singleton é confirmado apenas pelo lado do host (#22). O histórico mostra que o código já nasce como host e que os provedores nunca estiveram neste repositório (#23, #24). A ausência do primeiro blob do README limita a origem do rótulo, sem criar ambiguidade sobre a arquitetura do snapshot.

## Observações

### 1. src/webpack.config.js:3; src/webpack.config.js:5-102

**Observação:** A configuração usa `ModuleFederationPlugin`, declara o nome `onehub` e mapeia `remote1` para `subscription@http://localhost:3001/remoteEntry.js` e `remote2` para `ownership@http://localhost:3002/remoteEntry.js`. Declara `react` e `react-dom` como `singleton`, com `requiredVersion: '^19.1.0'` e `eager: true`, sem `exposes`.

**Interpretação:** Declara o host e sua ligação por Module Federation a duas unidades externas. O compartilhamento está configurado pelo host; não demonstra a configuração dos provedores ausentes.

### 2. src/pages/Dashboard.jsx:3

**Observação:** `const ModemAuthorization = React.lazy(() => import('remote1/ModemAuthorization'));`.

**Interpretação:** O host nomeia o módulo `ModemAuthorization` do remote `remote1` e declara sua carga sob demanda por import federado.

### 3. src/pages/Dashboard.jsx:4

**Observação:** `const SecurityPackage = React.lazy(() => import('remote1/SecurityPackage'));`.

**Interpretação:** O host nomeia o módulo `SecurityPackage` do remote `remote1` e declara sua carga sob demanda por import federado.

### 4. src/pages/Dashboard.jsx:6

**Observação:** `const LabourHourHold = React.lazy(() => import('remote2/LabourHourHold'));`.

**Interpretação:** O host nomeia o módulo `LabourHourHold` do remote `remote2` e declara sua carga sob demanda por import federado.

### 5. src/pages/Dashboard.jsx:7

**Observação:** `const MobileService = React.lazy(() => import('remote2/MobileService'));`.

**Interpretação:** O host nomeia o módulo `MobileService` do remote `remote2` e declara sua carga sob demanda por import federado.

### 6. src/pages/Dashboard.jsx:9

**Observação:** `const Card = React.lazy(() => import('remote1/Card'));`.

**Interpretação:** O host nomeia o módulo `Card` do remote `remote1` e declara sua carga sob demanda por import federado.

### 7. src/pages/Dashboard.jsx:16; src/pages/Dashboard.jsx:3; src/pages/Dashboard.jsx:15-26

**Observação:** `<ModemAuthorization />` é renderizado sob `React.Suspense`, com fallback `Loading...`; o componente vem do import da linha 3.

**Interpretação:** A renderização insere o componente remoto no painel do host. O elemento isolado usa o componente já carregado, sem declarar por si o destino federado.

### 8. src/pages/Dashboard.jsx:17; src/pages/Dashboard.jsx:4; src/pages/Dashboard.jsx:15-26

**Observação:** `<SecurityPackage />` é renderizado sob `React.Suspense`, com fallback `Loading...`; o componente vem do import da linha 4.

**Interpretação:** A renderização insere o componente remoto no painel do host. O elemento isolado usa o componente já carregado, sem declarar por si o destino federado.

### 9. src/pages/Dashboard.jsx:18; src/pages/Dashboard.jsx:6; src/pages/Dashboard.jsx:15-26

**Observação:** `<LabourHourHold />` é renderizado sob `React.Suspense`, com fallback `Loading...`; o componente vem do import da linha 6.

**Interpretação:** A renderização insere o componente remoto no painel do host. O elemento isolado usa o componente já carregado, sem declarar por si o destino federado.

### 10. src/pages/Dashboard.jsx:19; src/pages/Dashboard.jsx:7; src/pages/Dashboard.jsx:15-26

**Observação:** `<MobileService />` é renderizado sob `React.Suspense`, com fallback `Loading...`; o componente vem do import da linha 7.

**Interpretação:** A renderização insere o componente remoto no painel do host. O elemento isolado usa o componente já carregado, sem declarar por si o destino federado.

### 11. src/pages/Dashboard.jsx:22-25; src/pages/Dashboard.jsx:9; src/pages/Dashboard.jsx:15-26

**Observação:** `Card` é renderizado sob `React.Suspense`, recebendo `topic="OneHUB"` e `description="Welcome to OneHUB"`; vem do import da linha 9.

**Interpretação:** A renderização insere o componente remoto no painel do host. O elemento isolado usa o componente já carregado, sem declarar por si o destino federado.

### 12. .; package.json:19-20; src/webpack.config.js:10; src/webpack.config.js:68-70; src/index.js:7-12; src/App.js:3-8

**Observação:** A raiz reúne manifesto, entrada React e build Webpack próprios. A entrada renderiza App, que monta Dashboard; o build usa o template public/index.html.

**Interpretação:** Confirma o limite da única unidade frontend presente no snapshot, o host. Os dois remotes referenciados não são diretórios inspecionados.

### 13. public; public/index.html:31; src/webpack.config.js:68-70

**Observação:** public/index.html contém o elemento root e é o template do HtmlWebpackPlugin da aplicação da raiz.

**Interpretação:** O diretório é parte da unidade da raiz, sem entrada e build de outra aplicação.

### 14. src; src/index.js:7-12; src/webpack.config.js:10; package.json:19-20

**Observação:** src contém a entrada e a configuração usadas pelos scripts start e build do manifesto da raiz.

**Interpretação:** É parte da unidade da raiz. A presença da configuração nessa pasta não estabelece outra unidade frontend.

### 15. src/pages/Dashboard.jsx:3-4; src/pages/Dashboard.jsx:9; src/pages/Dashboard.jsx:16-17; src/pages/Dashboard.jsx:22-25; src/webpack.config.js:76; src/App.js:3-8; src/index.js:8-12

**Observação:** O Dashboard importa ModemAuthorization, SecurityPackage e Card de remote1 e os renderiza, passando props ao Card. A configuração resolve remote1 como subscription em localhost:3001. A cadeia da entrada monta App e Dashboard.

**Interpretação:** Relação host → remote ativa entre a unidade da raiz e subscription, externo ao snapshot. O consumo é registrado pelo lado do host; não há fonte do provedor para conferir sua implementação.

### 16. src/pages/Dashboard.jsx:6-7; src/pages/Dashboard.jsx:18-19; src/webpack.config.js:77; src/App.js:3-8; src/index.js:8-12

**Observação:** O Dashboard importa LabourHourHold e MobileService de remote2 e os renderiza. A configuração resolve remote2 como ownership em localhost:3002. A cadeia da entrada monta App e Dashboard.

**Interpretação:** Relação host → remote ativa entre a unidade da raiz e ownership, externo ao snapshot, observada pelo lado do consumidor.

### 17. package.json:20; src/webpack.config.js:5-29; src/webpack.config.js:72-92

**Observação:** O script build chama webpack com configuração própria e modo development. A saída é dist/bundle.js, com publicPath http://localhost:3000/. A revisão registra build separado, deploy não observado e versionamento independente No; os remotes são referenciados por URLs externas ao build.

**Interpretação:** Confirma uma fronteira de build do host. A configuração é de desenvolvimento; não estabelece publicação nem independência de deploy dos remotes.

### 18. README.md:2

**Observação:** “MFE Remote App for OnehubShell”.

**Interpretação:** Afirma papel de remote para o projeto. A 3.4.7 registra a afirmação como contradita: a configuração e as duas relações mostram o projeto como host consumidor. O rótulo é um sinal semântico enganoso.

### 19. src/pages/Dashboard.jsx:21

**Observação:** O comentário diz “Using Card from Remote App”.

**Interpretação:** Afirma a origem remota de Card, corroborada pelo import federado, pela renderização e pela relação com subscription. A confirmação se limita ao host.

### 20. src/webpack.config.js:71

**Observação:** O comentário diz “Module Federation configuration for micro-frontends”.

**Interpretação:** Nomeia a tecnologia de composição, corroborada pelo plugin configurado e pelas duas relações ativas. A frase sozinha é evidência semântica.

### 21. src/webpack.config.js:75

**Observação:** O comentário apresenta remotes como “Remote apps to consume modules from”.

**Interpretação:** Afirma consumo de aplicações remotas, corroborado pelos mapeamentos e imports usados nas duas relações. Os provedores não estão no snapshot.

### 22. src/webpack.config.js:80

**Observação:** O comentário diz “Share React and ReactDOM as singletons to avoid version conflicts”.

**Interpretação:** Afirma compartilhamento como singleton. A 3.4.7 registra corroboração parcial: o host configura shared, mas não há artefato dos remotes que confirme o outro lado ou a prevenção de conflitos.

### 23. 74cbf87 2025-06-05 (README.md); 1ddddc4241157e335c1b6e39372f050aa1705c1d 2025-06-05 (README.md; src/webpack.config.js; src/pages/Dashboard.jsx)

**Observação:** A revisão histórica registra dois commits: o primeiro cria apenas README.md; o segundo altera o README e cria todo o código do host. O blob do primeiro README está ausente. Resultado do ponto: esclarecido.

**Interpretação:** O rótulo de remote e o código de host coexistem na única versão com código; não há estágio anterior implementado como remote neste repositório. A origem textual do rótulo permanece desconhecida, sem mudar o papel do snapshot.

### 24. 74cbf87 2025-06-05 (README.md); 1ddddc4241157e335c1b6e39372f050aa1705c1d 2025-06-05 (src/webpack.config.js; src/pages/Dashboard.jsx)

**Observação:** As listas de arquivos dos dois commits registram somente o README inicial e os arquivos do host adicionados no snapshot. Não há criação ou remoção de arquivos dos remotes subscription e ownership. Resultado do ponto: esclarecido.

**Interpretação:** Os remotes não foram extraídos nem removidos deste repositório. O histórico explica a ausência dos provedores, mas não verifica suas declarações shared; a afirmação sobre compartilhamento continua parcial.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (., Entrada e Build; src, Marcadores); 3.4.4 (src/pages/Dashboard.jsx:3,4,6,7,9, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #1, #3, #4, #5 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #12; configura #15; configura #16 |
| 2 | 3.4.4 (src/pages/Dashboard.jsx:3, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 3 | 3.4.4 (src/pages/Dashboard.jsx:4, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 4 | 3.4.4 (src/pages/Dashboard.jsx:6, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #16 |
| 5 | 3.4.4 (src/pages/Dashboard.jsx:7, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #16 |
| 6 | 3.4.4 (src/pages/Dashboard.jsx:9, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 7 | 3.4.4 (src/pages/Dashboard.jsx:16, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #15 |
| 8 | 3.4.4 (src/pages/Dashboard.jsx:17, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #15 |
| 9 | 3.4.4 (src/pages/Dashboard.jsx:18, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #16 |
| 10 | 3.4.4 (src/pages/Dashboard.jsx:19, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #16 |
| 11 | 3.4.4 (src/pages/Dashboard.jsx:22, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #15 |
| 12 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (public) | 4 estrutura | diretório | — | contexto | fraca | — |
| 14 | 3.4.3 (src) | 4 estrutura | diretório | — | contexto | fraca | — |
| 15 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #12; liga src/webpack.config.js:76 |
| 16 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #12; liga src/webpack.config.js:77 |
| 17 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #12 |
| 18 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1; contradiz #15; contradiz #16 |
| 19 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #6; corrobora #11; corrobora #15 |
| 20 | 3.4.7 #3 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #1; corrobora #15; corrobora #16 |
| 21 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #15; corrobora #16 |
| 22 | 3.4.7 #5 | 7 documentação | comentário | — | tecnológica | fraca | corrobora em parte #1 |
| 23 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #18; explica #1; explica #15; explica #16 |
| 24 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #22; explica #1; explica #15; explica #16 |

## Resumo

Observações: 24. Dimensões (tecnologia: 0, configuração: 1, código: 10, estrutura: 3, composição: 2, build-deploy: 1, documentação: 5, histórico: 2). Força (forte: 8, moderada: 7, fraca: 9, ambígua: 0). Evidência (tecnológica: 2, arquitetural: 20, contexto: 2).
