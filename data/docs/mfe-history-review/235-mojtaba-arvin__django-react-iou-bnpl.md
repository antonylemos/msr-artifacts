---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
inputs:
  clone: data/samples/mfe-sample-001/repos/mojtaba-arvin__django-react-iou-bnpl
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Leitura do repositório

O histórico até o snapshot tem 170 commits, de `8461370` (2025-05-23, "Initial commit") a `bf4da76` (2025-06-14, "docs(readme): add table of contents"). Os primeiros commits montam o backend Django (ex.: `5ad86a5` 2025-05-24, "chore(backend): scaffold Django “bnpl” project structure"). O frontend entra todo no último dia: 71 commits em `frontend/`, todos de 2025-06-14, de `2875005` ("chore(frontend): add dev Dockerfile, extend .gitignore, and update docker-compose") a `a351ac6` ("refactor(frontend/merchant-app-plans): remove redundant formData state and move installment preview logic into FormDataConsumer"). Os arquivos de configuração do workspace e das aplicações são criados nesse dia, um commit por pacote: a raiz em `4407d40` ("feat(frontend/setup): initial monorepo configuration"), o customer-app em `dba76f7`, o merchant-app em `785cc27` e o shell em `9b20b3c`. Esses commits são a introdução dos arquivos neste repositório, não onde o código foi escrito: entrar com mais de 70 commits num único dia sugere que o frontend foi feito em outro lugar, o que o histórico não mostra. Nenhum arquivo sob `frontend/` foi removido ou renomeado até o snapshot.

As revisões anteriores deixaram um só ponto em aberto que o histórico pode esclarecer: o pacote `@module-federation/typescript`, `Undetermined` na 3.4.2, cuja descrição na raiz do workspace a 3.4.7 registrou como `contradita`. As demais revisões não têm unidade, construção, relação ou deploy `Undetermined`, e não há outra afirmação `contradita` ou `parcial`; a afirmação sobre "isolated deployments" (3.4.7 #4) está `sem corroboração`, valor que não vira ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@module-federation/typescript` está declarado e listado como plugin do compilador no `tsconfig` do shell, sem invocação no build, e a raiz do workspace o descreve como fonte do `ModuleFederationPlugin`, que os `webpack.config.js` obtêm de `webpack` | 3.4.2 (frontend/package.json:40); 3.4.7 #9 | uso de dependência | 4407d40 2025-06-14 feat(frontend/setup): initial monorepo configuration; 9b20b3c 2025-06-14 feat(frontend/shell): scaffold shell config; dba76f7 2025-06-14 feat(frontend/customer): scaffold customer-app config; 785cc27 2025-06-14 feat(frontend/merchant): scaffold merchant-app config | esclarecido |

## Observações

**1. `@module-federation/typescript` sem invocação no build.** O `frontend/package.json` só aparece em `4407d40` e tem no snapshot o mesmo identificador de objeto que nesse commit (`349ef53`); a versão de `4407d40`, legível, já traz a declaração em `devDependencies` e a descrição em `dependenciesDocumentation` ("Webpack requires ModuleFederationPlugin to dynamically provide/consume modules at runtime."), além de "@module-federation/typescript requires axios". Os dois `tsconfig` do shell são criados em `9b20b3c` e não mudam até o snapshot (`14f2fed` e `709a6e0`); a versão de `9b20b3c` do `tsconfig.build.json` já tem a entrada em `compilerOptions.plugins` com `configPath: ./webpack.config.js`. Os três `webpack.config.js` têm um único commit no `log` cada um, o que os cria (`9b20b3c`, `dba76f7`, `785cc27`), e os mesmos identificadores de objeto no snapshot (`a912b60`, `fafeb9c`, `3db58a4`). Conclusão, delimitada a esses arquivos: no repositório nunca houve uma versão em que o build invocasse o pacote, ou obtivesse o `ModuleFederationPlugin` dele, que depois tenha sido trocada pelo plugin nativo do webpack; a declaração, a entrada no `tsconfig` e a descrição entraram juntas com a configuração atual e não mudaram. O `Undetermined` não é resto de um estágio abandonado, e a descrição contradita existe desde a primeira presença observável do manifesto. O histórico não diz se a entrada no `tsconfig` tem efeito no build, nem por que a descrição atribui o plugin ao pacote. A linha continua `Undetermined` na 3.4.2, e a afirmação, `contradita` na 3.4.7.

## Comandos

```
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl rev-list --count bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/package.json frontend/shell/tsconfig.build.json frontend/shell/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --reverse --format='%h %ad %s' --date=short bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/shell/webpack.config.js frontend/customer-app/webpack.config.js frontend/merchant-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 4407d40 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/package.json frontend/shell/tsconfig.build.json frontend/shell/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 9b20b3c -- frontend/shell/tsconfig.build.json frontend/shell/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl show 4407d40:frontend/package.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl show 9b20b3c:frontend/shell/tsconfig.build.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/pnpm-lock.yaml
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend/shell/webpack.config.js frontend/customer-app/webpack.config.js frontend/merchant-app/webpack.config.js frontend/customer-app/tsconfig.json frontend/merchant-app/tsconfig.json
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 9b20b3c -- frontend/shell/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree dba76f7 -- frontend/customer-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl ls-tree 785cc27 -- frontend/merchant-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh mojtaba-arvin__django-react-iou-bnpl log --format='%h %ad %s' --date=short --name-status --diff-filter=DR bf4da7610d2a1343b2f97eab1dfeb6b026e50e19 -- frontend
```

## Resumo

Commits até o snapshot: 170 (2025-05-23 a 2025-06-14). Pontos: 1 (esclarecido: 1, inconclusivo: 0, resolvido pelo snapshot: 0).
