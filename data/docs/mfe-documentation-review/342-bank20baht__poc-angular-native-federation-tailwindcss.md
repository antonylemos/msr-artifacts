---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Leitura do repositório

A documentação em inglês consiste em três arquivos: o README raiz contém apenas o título “Native Federation Angular” (README.md:1), e os READMEs de `host/` e `remote/` são textos gerados pelo Angular CLI, com instruções de desenvolvimento, geração de componentes, build e testes (host/README.md:1-59; remote/README.md:1-59). Foram lidos inteiros. Eles não explicam a relação entre as unidades, a exposição de módulos, o compartilhamento de dependências ou o acoplamento de CSS. A única ocorrência `doc-*`, `doc-integration-technology` em README.md:1, é o título, sem afirmação arquitetural, e não vira linha. Os títulos “Host” e “Remote” (host/README.md:1; remote/README.md:1) nomeiam os projetos, mas não descrevem seus papéis como conjunto. Os blocos `ng serve`, `ng build` e os demais comandos são instruções de ferramenta, sem afirmação sobre a arquitetura entre unidades (host/README.md:7-55; remote/README.md:7-55). O endereço 4200 repetido no README do remote é resíduo do template (remote/README.md:13): sua configuração usa 4201 (remote/angular.json:108); o detalhe de porta não entra na tabela.

As revisões 3.4.2 a 3.4.6 estão `final` e têm o mesmo commit da classificação e da aquisição. Elas mostram uma composição que os READMEs não descrevem: o host registra o `remoteEntry.json` (host/src/main.ts:3-5), carrega o componente e as rotas do remote (host/src/app/app.routes.ts:7-29), e o remote expõe os respectivos módulos (remote/federation.config.js:5-10). O CSS do host também varre o código-fonte do remote (host/src/styles.css:2-5), sem explicação desse acoplamento na documentação. Essas são evidências de implementação, não novas afirmações documentais.

Foram lidos os comentários e campos descritivos dos artefatos citados nas revisões anteriores: `host/package.json:1-55` e `remote/package.json:1-55` não têm `description`; `host/angular.json:1-117` e `remote/angular.json:1-114` não têm comentários; os comentários de `host/federation.config.js:14-24` e `remote/federation.config.js:21-31` são orientações genéricas da ferramenta sobre pacotes dispensáveis, FAQ de compartilhamento e `ignoreUnusedDeps`, sem afirmação específica sobre estas unidades. Os comentários de estilos (host/src/styles.css:1; remote/src/styles.css:1) e das tarefas do editor (host/.vscode/tasks.json:2; remote/.vscode/tasks.json:2) também são genéricos. As entradas, bootstraps e configurações de rotas não acrescentam prosa arquitetural (host/src/main.ts:1-8; remote/src/main.ts:1-6; host/src/bootstrap.ts:1-6; remote/src/bootstrap.ts:1-6; host/src/app/app.config.ts:1-12; remote/src/app/app.config.ts:1-12; remote/src/app/app.routes.ts:1-9; remote/src/app/modules/home/home.routes.ts:1-14), exceto o comentário de host/src/app/app.routes.ts:20, registrado abaixo. Os templates e declarações citados também foram lidos (host/src/app/app.html:1-2; remote/src/app/app.html:1-14; host/src/remote.d.ts:1; remote/src/app/app.ts:1-12); o texto de boas-vindas do remote é apresentação da própria unidade, sem descrever a composição.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | host/src/app/app.routes.ts:20 | "loadChildreas instead of loadComponent !!!" | composição | corroborada | 3.4.4 (host/src/app/app.routes.ts:22); 3.4.5 #1; host/src/app/app.routes.ts:19-23; remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3-14 |

## Observações

**1. host/src/app/app.routes.ts:20.** O comentário, com a grafia original “loadChildreas”, orienta usar `loadChildren` em vez de `loadComponent` na rota `flights`. Pelo contexto, descreve como o host integra as rotas do remote, não uma recomendação sobre uma rota interna isolada. Logo abaixo, `loadChildren` chama `loadRemoteModule('remote', './routes')` e seleciona `APP_ROUTES` (host/src/app/app.routes.ts:19-23); o remote expõe esse arquivo (remote/federation.config.js:9), que exporta o conjunto de rotas correspondente (remote/src/app/modules/home/home.routes.ts:3-14). A revisão 3.4.4 registra essa carga como composição, e a relação ativa de 3.4.5 #1 a inclui. A outra rota usa efetivamente `loadComponent` para o componente exposto (host/src/app/app.routes.ts:9-12), coerente com a distinção do comentário.

## Resumo

Afirmações: 1 (corroborada: 1, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (composição: 1).
