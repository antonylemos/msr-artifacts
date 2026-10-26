---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
inputs:
  clone: data/samples/mfe-sample-001/repos/Sara-hkm__creamati-micro-web
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Leitura do repositório

O histórico até o snapshot tem 7 commits lineares, de 2025-09-21 a 2025-09-22, sem merges. O primeiro, `4f941bb` ("Initial commit: Micro-frontend architecture with container app and 4 micro-frontends"), é a primeira presença observável dos documentos (`README.md`, `STATUS.md`, `implementation-plan.md`, `implementation-plan-mui-microservices.md`, `micro-web-golden-sample.md`), do `package.json` da raiz, de `.cursor/` e de um `node_modules/` versionado na raiz. Os seis documentos e o `package.json` têm o mesmo identificador de objeto no primeiro commit e no snapshot (`ls-tree 4f941bb` e `ls-tree 541f8ed`), e `log` por caminho só lista `4f941bb`: a versão deles em todo o histórico é a do snapshot. O primeiro commit não diz onde esses textos foram escritos antes.

Em `4f941bb`, os cinco diretórios de `frontend/` (`analytics-app`, `container`, `data-grid-app`, `settings-app`, `user-management-app`) não têm arquivos: são entradas de submódulo (modo `160000`) que apontam para commits de fora deste repositório, sem `.gitmodules`. Esses commits não estão no clone (`cat-file -e` falha para os cinco), e as entradas continuam iguais até `1f789f7` (`ls-tree 1f789f7`). O código das cinco aplicações só entra no snapshot, `541f8ed` ("Recreate complete micro-frontend applications"), que remove as cinco entradas de submódulo e cria os arquivos de cada aplicação; a mensagem anuncia "Fixed submodule issues and properly tracked all source files" e "Container app configured to embed micro-frontends via GitHub Pages URLs". É, portanto, o commit que introduz o `<iframe>` do container (`frontend/container/src/App.tsx` só aparece em `541f8ed`).

Entre os dois, cinco commits tratam do deploy: `81f06d6` ("Add GitHub Actions workflows for automated deployment") cria os seis workflows e o `DEPLOYMENT.md`; `c6d475b` ("Update workflows for GitHub Pages deployment"), `5148e21` ("Fix GitHub Actions workflows - remove cache-dependency-path") e `1f789f7` ("Fix GitHub Actions workflow - install dependencies for each app individually") alteram os workflows; `ea81537` ("Trigger GitHub Actions deployment after creating gh-pages branch") não altera arquivos. O clone é parcial: o conteúdo das versões antigas dos workflows não está disponível localmente (`show 81f06d6:.github/workflows/deploy-analytics.yml` falha; `cat-file -e` falha para os blobs de `deploy-analytics.yml` e `deploy-all.yml` de `81f06d6`). O que se vê aí são mensagens, a lista de arquivos alterados e os identificadores de objeto.

As URLs do `<iframe>` para o GitHub Pages da conta `olivium-dev`, registradas nas revisões 3.4.4, 3.4.5 e 3.4.6, têm primeira presença em `541f8ed`. A mensagem de `c6d475b` também anuncia "Update container app to use GitHub Pages URLs", mas esse commit só altera os seis workflows: a entrada `frontend/container` não muda entre `4f941bb` e `541f8ed` (`log -- frontend` lista só esses dois). O histórico não diz por que as URLs apontam para outra conta; como as revisões anteriores não deixaram essa relação `Undetermined`, isso fica aqui como contexto, sem linha na tabela.

As revisões 3.4.2 a 3.4.6 não deixam pontos abertos: nenhuma dependência das tecnologias, nenhuma unidade `Undetermined`, a única construção é ativa, as quatro relações são `Yes` e o deploy das cinco aplicações é `separado`. Os pontos vêm das afirmações `contradita` e `parcial` da 3.4.7, agrupadas por dúvida. As afirmações `sem corroboração` (3.4.7 #10, #22, #23) ficam fora, conforme o passo 2.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O `DEPLOYMENT.md` descreve deploy no Vercel, e os workflows publicam no GitHub Pages | 3.4.7 #1 | estágios em conflito | 81f06d6 2025-09-21 Add GitHub Actions workflows for automated deployment; c6d475b 2025-09-21 Update workflows for GitHub Pages deployment; 5148e21 2025-09-21 Fix GitHub Actions workflows - remove cache-dependency-path; 1f789f7 2025-09-21 Fix GitHub Actions workflow - install dependencies for each app individually | esclarecido |
| 2 | Os planos e o guia descrevem outras unidades (auth, dashboard, profile, biblioteca compartilhada, backend), e o snapshot tem container, user-management, data-grid, analytics e settings | 3.4.7 #11, #12, #16 | estágios em conflito | 4f941bb 2025-09-21 Initial commit: Micro-frontend architecture with container app and 4 micro-frontends; 541f8ed 2025-09-22 Recreate complete micro-frontend applications | esclarecido |
| 3 | O guia e a descrição do `package.json` afirmam Module Federation (módulos remotos, React compartilhado, estado e autenticação compartilhados, lazy loading, URLs de `remoteEntry.js`, Material-UI), e a composição é por iframe entre aplicações CRA | 3.4.7 #13, #14, #17, #18, #19, #20, #21, #24, #25, #26 | estágios em conflito | 4f941bb 2025-09-21 Initial commit: Micro-frontend architecture with container app and 4 micro-frontends; 541f8ed 2025-09-22 Recreate complete micro-frontend applications | inconclusivo |

## Observações

**1. Deploy no Vercel no `DEPLOYMENT.md`.** O `DEPLOYMENT.md` foi criado em `81f06d6`, junto com os seis workflows, e não mudou depois (`log -- DEPLOYMENT.md` só lista `81f06d6`; mesmo objeto em `81f06d6` e no snapshot). Os workflows foram alterados três vezes depois dele (`c6d475b`, `5148e21`, `1f789f7`). A mensagem de `81f06d6` anuncia "Vercel integration with production deployment" e "Comprehensive deployment documentation"; a de `c6d475b` anuncia "Replace Vercel deployment with GitHub Pages" e "Configure workflows to deploy to gh-pages branch". O conteúdo das versões antigas dos workflows não está disponível, então a troca de Vercel por Pages é o que as mensagens anunciam, não algo inspecionado. Conclusão, delimitada a esses arquivos: o `DEPLOYMENT.md` pertence ao estágio dos workflows de `81f06d6` e não foi atualizado quando os workflows mudaram; a divergência com os workflows do snapshot é de estágios diferentes.

**2. Unidades dos planos e do guia.** `implementation-plan.md`, `implementation-plan-mui-microservices.md` e `micro-web-golden-sample.md` estão no primeiro commit com o conteúdo do snapshot e não mudaram depois. Em nenhum commit até o snapshot há diretório `auth-app`, `dashboard-app`, `profile-app`, `ui-lib`, `shared-ui-lib`, `backend` ou `docker`: a lista de arquivos de cada commit (`log --name-status`) e a árvore do primeiro commit mostram, em `frontend/`, só as cinco entradas com os nomes atuais desde `4f941bb`. Os nomes auth, dashboard e profile aparecem apenas em prompts de `.cursor/prompts/` (ex.: `02-setup-auth-remote.md`), também do primeiro commit. O histórico não mostra o conteúdo das cinco aplicações antes de `541f8ed` (submódulos externos ausentes do clone), nem o que houve antes do primeiro commit. Conclusão, delimitada ao histórico deste repositório: a divisão de unidades dos planos nunca existiu na árvore; as aplicações atuais têm os mesmos nomes desde o primeiro commit, e os documentos ficaram como estavam.

**3. Module Federation no guia e no `package.json`.** O guia `micro-web-golden-sample.md` e o `package.json` da raiz (com a descrição "React + Webpack Module Federation + Material-UI") estão no primeiro commit com o conteúdo do snapshot e não mudaram. Fora de `.cursor/templates/` (`webpack.config.template.js`, `RemoteComponent.template.tsx`, `mui-theme.template.ts`, criados em `4f941bb`), nenhum commit cria arquivo de configuração de webpack ou de federação na árvore deste repositório. O `<iframe>` do container entra em `541f8ed`, cuja mensagem anuncia a incorporação "via GitHub Pages URLs". O que o histórico não mostra é o conteúdo das cinco aplicações de `4f941bb` a `1f789f7`: eram submódulos que apontam para commits fora do clone, então não se sabe se alguma delas teve federação antes de ser recriada em `541f8ed`. Por isso, não dá para dizer se as afirmações do guia são resto de um estágio federado ou intenção nunca implementada. Conclusão: inconclusivo.

## Comandos

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # antes: igual
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web rev-list --count 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --reverse --date=short --format='%h %ad %s' --name-status 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --reverse --date=short --format='== %h %ad%n%B' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 4f941bb -- frontend/
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 4f941bb
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 541f8ed
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 1f789f7 -- frontend/
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 81f06d6 -- .github/workflows/ DEPLOYMENT.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web ls-tree 541f8ed -- .github/workflows/
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web show 81f06d6:.github/workflows/deploy-analytics.yml   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- DEPLOYMENT.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- README.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- STATUS.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- implementation-plan.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- implementation-plan-mui-microservices.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- micro-web-golden-sample.md
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- package.json
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- .github/workflows
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- frontend/container/src/App.tsx
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web log --full-history --date=short --format='%h %ad %s' 541f8edc7615e399cbbf0fe3f1ae33abe14c4796 -- frontend
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e 7c2603a0db331de54e2158feb9b1d616b754d745   # ausente (submódulo frontend/analytics-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e e88c23e5f5f772104770f18ecb2e3a3bcf5d0acf   # ausente (submódulo frontend/container)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e 3a97a78ef3b0e06366c8318751fcc3c5db646667   # ausente (submódulo frontend/data-grid-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e dd4fb9fb2fafa002f7331baf7fef14d688aec863   # ausente (submódulo frontend/settings-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e bf99b47aec8ae53d25b4d19480ee341fff7c3937   # ausente (submódulo frontend/user-management-app)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e a900b4340f82b4c995edc833315f6ead2f3cbb8f   # ausente (deploy-analytics.yml de 81f06d6)
docs/mfe-history-review/tools/hist.sh Sara-hkm__creamati-micro-web cat-file -e 5b5b063f8b673c6eff17dca609d45e37f8d0b8d3   # ausente (deploy-all.yml de 81f06d6)
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # depois: igual
```

## Resumo

Commits até o snapshot: 7 (2025-09-21 a 2025-09-22). Pontos: 3 (esclarecido: 2, inconclusivo: 1, resolvido pelo snapshot: 0).
