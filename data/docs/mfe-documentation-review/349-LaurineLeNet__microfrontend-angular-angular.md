---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
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

# 349 — LaurineLeNet/microfrontend-angular-angular

## Leitura do repositório

Os três documentos classificados como `documentation` foram lidos integralmente:
athletes/README.md:1-59, ranking/README.md:1-59 e shell/README.md:1-59. São textos em inglês
gerados pelo Angular CLI, com os títulos Athletes, Ranking e Shell e a mesma sequência de
instruções genéricas de desenvolvimento, scaffolding, build e testes. Não há README na raiz nem
outro documento no inventário. A indicação de geração pelo Angular CLI (linha 3 de cada README),
os comandos de execução e build (linhas 7-13 e 31-37) e as orientações de testes e recursos
(linhas 39-59) não explicam as unidades como conjunto. Os títulos apenas nomeiam os projetos:
`Shell` em shell/README.md:1 não afirma seu papel de host. Esses textos de template não geram
linhas na tabela. O `matches.csv` deste repositório não contém ocorrências `doc-*`.

A documentação não descreve a composição que as revisões 3.4.2 a 3.4.6 registram: o shell
inicializa Native Federation com um manifesto (shell/src/main.ts:1-5), aponta para dois remotes
(shell/public/federation.manifest.json:1-4) e carrega suas rotas e componentes
(shell/src/app/app.routes.ts:10-19; shell/src/app/dashboard/dashboard.ts:54-79). A ausência de
explicação arquitetural nos READMEs não contradiz essas evidências de implementação; apenas não
oferece afirmações semânticas para confrontar. As cinco revisões anteriores estão `final`, com
o mesmo commit da classificação e do `acquisition.csv`.

Foram lidos os comentários e campos descritivos dos artefatos citados nas revisões anteriores:
os três package.json e angular.json; os três federation.config.js; os três wrangler.jsonc;
athletes/public/_headers e ranking/public/_headers; shell/public/federation.manifest.json; os
main.ts, bootstrap.ts e app.config.ts das três unidades; athletes/src/app/app.routes.ts,
athletes/src/app/shell.routes.ts, shell/src/app/app.routes.ts, shell/src/app/app.html,
shell/src/app/dashboard/dashboard.ts, athletes/src/app/race/race.ts,
athletes/src/app/athlete-detail/athlete-detail.ts e ranking/src/app/app.ts. Nenhum package.json
contém `description` (athletes/package.json:1-41; ranking/package.json:1-41;
shell/package.json:1-41). Os comentários das configurações de federação são orientações genéricas
do gerador sobre exclusão de pacotes, FAQ de compartilhamento e `ignoreUnusedDeps`
(athletes/federation.config.js:20-30; ranking/federation.config.js:19-29;
shell/federation.config.js:15-25), sem afirmar algo sobre a relação entre estas aplicações.
Os wrangler.jsonc têm apenas uma linha de configuração comentada, sem explicação textual
(athletes/wrangler.jsonc:4; ranking/wrangler.jsonc:4; shell/wrangler.jsonc:4).
O comentário em francês sobre fallback de nome no perfil de atleta é interno à unidade
(athletes/src/app/athlete-detail/athlete-detail.ts:51-59). Configurações executáveis, nomes,
URLs e código de carregamento não foram convertidos em afirmações documentais.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|

## Observações

Nenhuma afirmação arquitetural nos textos lidos, conforme o recorte da etapa 3.4.7.

## Resumo

Afirmações: 0.
