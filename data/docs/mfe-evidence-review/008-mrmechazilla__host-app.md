---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
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

# 008 — mrmechazilla/host-app

## Leitura do repositório

O snapshot tem só o host de um sistema distribuído em vários repositórios. A cadeia de Module Federation está completa do lado do host:
- **Dependência:** `@angular-architects/module-federation` (#1).
- **Configuração da federação:** o host configura a federação, sem expor nada (#2).
- **Manifesto:** declara os remotes `users-mfe` e `payments-mfe` (#3).
- **Código:** o host carrega o manifesto antes do bootstrap (#9, #10) e monta as rotas de `users-mfe` pelo nome (#6).
- **Relações:** isso resulta em duas relações ativas cujos destinos estão fora do snapshot (#13, #14). Só a de `users-mfe` tem rota. A de `payments-mfe` é resolvida pelo manifesto e nunca é montada.

Por isso a estrutura mostra uma única unidade (#11). Isoladas, a estrutura e o build (#15) não revelam a decomposição. Ela só aparece na configuração e no código.

Há um sinal que engana: um carregador genérico todo comentado (#7, #8). O histórico mostra que ele já chegou comentado no commit do snapshot (#16).

O repositório não documenta a arquitetura: não há afirmações.

## Observações

### 1. package.json:14

**Observação:** `@angular-architects/module-federation` (`^19.0.0`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente. A configuração e o código a usam.

### 2. webpack.config.js:1-13

**Observação:** `withModuleFederationPlugin` declara `name: 'host-mfe'`, com `exposes` vazio, e compartilha as dependências com `shareAll`.

**Interpretação:** O host está configurado como participante da federação, sem oferecer módulos.

**Nota:** O `angular.json`, citado na mesma tabela, só aponta o builder genérico `ngx-build-plus:browser` para este arquivo (`extraWebpackConfig`). O `webpack.prod.config.js` só o reexporta. Nenhum dos dois declara elemento da composição, e por isso não viraram observação.

### 3. public/mf.manifest.json:1-20

**Observação:** Declara `users-mfe` (`remoteEntry` em `http://localhost:4202/remoteEntry.js`, `exposedModule` `./users`) e `payments-mfe` (`http://localhost:4203/remoteEntry.js`, `./payments`). Também traz metadados de exibição e roteamento (`displayName`, `routePath`, `exportName`, `type`).

**Interpretação:** A configuração do host declara dois remotes externos e onde encontrá-los em desenvolvimento.

### 4. src/main.ts:4-6

**Observação:** `import('./bootstrap')` depois de `loadManifest`.

**Interpretação:** É um bootstrap assíncrono interno ao host.

### 5. src/app/app.routes.ts:1

**Observação:** Importa `loadRemoteModule` de `@angular-architects/module-federation`.

**Interpretação:** O mecanismo de carga remota está disponível nas rotas do host.

### 6. src/app/app.routes.ts:4-15

**Observação:** A rota raiz chama `loadRemoteModule({ type: 'manifest', remoteName: 'users-mfe', exposedModule: './users' })` e usa `m.usersRoutes`. Em caso de falha, só registra "service unavailable".

**Interpretação:** O host carrega em runtime as rotas do remote `users-mfe` pelo nome.

### 7. src/app/shared/utils/remote-loader.ts:1; src/app/shared/utils/remote-loader.ts:28

**Observação:** É uma linha de um arquivo inteiramente comentado (`/*` na linha 1, `*/` na 28).

**Interpretação:** É um carregador genérico desativado, que não participa da composição.

### 8. src/app/shared/utils/remote-loader.ts:14; src/app/shared/utils/remote-loader.ts:1-28

**Observação:** Uma chamada de carga remota dentro do mesmo bloco comentado.

**Interpretação:** É um carregador genérico desativado, que não participa da composição.

### 9. src/main.ts:2

**Observação:** Importa `loadManifest` de `@angular-architects/module-federation`.

**Interpretação:** O mecanismo de resolução por manifesto está disponível no host.

### 10. src/main.ts:4-7

**Observação:** `loadManifest("mf.manifest.json")` antes de `import('./bootstrap')`.

**Interpretação:** O host resolve os remotes declarados no manifesto antes de iniciar.

### 11. .; angular.json:17-21, 41-42; package.json:7

**Observação:** É a única aplicação Angular do snapshot, com entrada (`src/main.ts`) e target de build próprios.

**Interpretação:** É uma unidade frontend com limite próprio: o host.

### 12. src; src/index.html

**Observação:** É a pasta de código da aplicação da raiz, com a página de entrada declarada no `angular.json`.

**Interpretação:** É parte da unidade da raiz, e não outra unidade.

### 13. src/app/app.routes.ts:8-12; src/main.ts:4; public/mf.manifest.json:2-9

**Observação:** O host carrega `./users` de `users-mfe`, resolvido pelo manifesto. O remote não está no snapshot.

**Interpretação:** É uma relação host → remote ativa com destino externo.

### 14. src/main.ts:4; public/mf.manifest.json:11-18

**Observação:** O manifesto resolvido no início declara `payments-mfe`, mas nenhuma rota o carrega. O remote não está no snapshot.

**Interpretação:** É uma relação host → remote ativa na resolução, sem uso observado do módulo, com destino externo.

### 15. angular.json:17-20, 42, 63; package.json:3, 7

**Observação:** O target `build` usa `ngx-build-plus:browser` com configuração webpack extra e grava em `dist/host-app`. Não há artefato de deploy, e a versão é `0.0.0`.

**Interpretação:** Há uma fronteira de build própria do host, sem deploy observado.

### 16. 38ab4eb 2026-01-21 (src/app/shared/utils/remote-loader.ts)

**Observação:** O arquivo é criado no commit do snapshot, e essa é a única versão dele no histórico. Ela já está toda comentada.

**Interpretação:** O carregador nunca esteve ativo: não houve desativação posterior. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #2; declara #5; declara #9 |
| 2 | 3.4.2 (package.json:14, Evidência); 3.4.3 (., Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #11 |
| 3 | 3.4.4 (src/main.ts:4, Observação); 3.4.5 #1, #2 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #10; configura #13; configura #14 |
| 4 | 3.4.4 (src/main.ts:6) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 5 | 3.4.4 (src/app/app.routes.ts:1) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #13 |
| 6 | 3.4.4 (src/app/app.routes.ts:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #13 |
| 7 | 3.4.4 (src/app/shared/utils/remote-loader.ts:1) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 8 | 3.4.4 (src/app/shared/utils/remote-loader.ts:14) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 9 | 3.4.4 (src/main.ts:2) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #13; implementa #14 |
| 10 | 3.4.4 (src/main.ts:4) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #13; implementa #14 |
| 11 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.3 (src) | 4 estrutura | diretório | — | contexto | fraca | — |
| 13 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #11 |
| 14 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #11 |
| 15 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #11 |
| 16 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #7; explica #8 |

## Resumo

Observações: 16. Dimensões (tecnologia: 1, configuração: 2, código: 7, estrutura: 2, composição: 2, build-deploy: 1, documentação: 0, histórico: 1). Força (forte: 4, moderada: 6, fraca: 6, ambígua: 0). Evidência (tecnológica: 9, arquitetural: 6, contexto: 1).
