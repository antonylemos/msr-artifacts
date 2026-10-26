---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
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

# 368 — Ba5ik7/seed-mfe-remote

## Leitura do repositório

O único documento do tipo `documentation` em `artifacts.csv` é `README.md`, lido integralmente. Em inglês, ele conserva o texto padrão do Angular CLI: geração do projeto pela versão 19.0.6, servidor de desenvolvimento, scaffolding, build, testes e links de referência (README.md:1-59). O título `SeedMfeRemote` (README.md:1) é um nome, sem afirmação arquitetural. A orientação de acesso foi ajustada para `http://localhost:4202/` (README.md:13), porta configurada para o remote (angular.json:80-81); trata-se de instrução de execução. Os blocos de comandos `ng serve`, `ng generate`, `ng build`, `ng test` e `ng e2e` (README.md:9-11, :19-21, :25-27, :33-35, :43-45, :51-53) e a explicação genérica de saída em `dist/` (README.md:37) pertencem ao template da ferramenta e não descrevem a composição ou a separação das unidades deste projeto. Não há diagramas, árvores comentadas ou afirmações sobre host, remote, independência ou compartilhamento. O `matches.csv` não contém ocorrências `doc-*`.

As revisões 3.4.2 a 3.4.6 estão `final` e têm o mesmo commit da classificação e do `acquisition.csv`. Elas mostram uma composição que o README não explica: `demo` declara o remote `seedMfeRemote` (projects/demo/webpack.config.js:5-7), cujo `./RemoteWidget` é exposto pelo outro projeto (projects/seed-mfe-remote/webpack.config.js:5-8). O host carrega esse componente por URL e o monta em `ViewContainerRef`, além de oferecê-lo pela rota `remote` (projects/demo/src/app/app.component.ts:24-36; projects/demo/src/app/app.routes.ts:5-12). Os dois projetos têm targets e saídas de build próprios (angular.json:17-20, :122-125). Essas são evidências de implementação já registradas nas etapas anteriores, sem afirmação documental correspondente para confrontar nesta etapa.

Foram lidos os comentários e campos descritivos dos artefatos citados nas revisões anteriores: `package.json:1-41`, `angular.json:1-220`, `.gitignore:1-42`, `.vscode/tasks.json:1-42`, as configurações webpack e webpack de produção dos dois projetos (projects/demo/webpack.config.js:1-13; projects/demo/webpack.prod.config.js:1; projects/seed-mfe-remote/webpack.config.js:1-15; projects/seed-mfe-remote/webpack.prod.config.js:1), os respectivos `src/main.ts:1-2`, `src/bootstrap.ts:1-6`, `src/index.html:1-13`, `src/app/app.config.ts:1-8`, e os componentes e rotas (projects/demo/src/app/app.component.ts:1-41; projects/demo/src/app/app.routes.ts:1-14; projects/seed-mfe-remote/src/app/app.component.ts:1-10; projects/seed-mfe-remote/src/app/app.routes.ts:1-3; projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:1-10). O manifesto não tem campo `description`; os comentários do `.gitignore` e das tarefas do editor apenas explicam arquivos gerados e ferramentas. Os títulos da interface, como “Angular Module Federation” e “Remote Widget Component” (projects/demo/src/app/app.component.ts:9-11), são rótulos, sem explicação arquitetural. Nenhum desses textos acrescenta afirmação à tabela.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|

## Observações

Não foram identificadas afirmações arquiteturais nos textos examinados. A ausência de documentação da composição não contradiz a cadeia de implementação registrada nas revisões anteriores.

## Resumo

Afirmações: 0.
