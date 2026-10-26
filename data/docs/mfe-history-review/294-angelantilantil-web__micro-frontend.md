---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
inputs:
  clone: data/samples/mfe-sample-001/repos/angelantilantil-web__micro-frontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Leitura do repositório

O histórico até o snapshot tem 12 commits, um deles merge, de 2026-05-03 a 2026-07-10. O primeiro commit, `c7a7aa3` (2026-05-03, "Initial commit: HDFC micro-frontend project with host-app and remote modules"), já traz o host e os nove remotos de então (accounts, business-reports, cards, incoming-api-logs, loans, maker-requests, model-portfolio-configuration, outgoing-api-logs, vro-uploads), com os `DOCUMENTATION.md`, `README.md`, `webpack.config.js`, `src/` e o start-all-modules.bat: é a primeira presença observável desses artefatos, não a sua introdução. `89278d2` (2026-05-03, "Revise project title and description in README") altera só o README. `a1d2264` (2026-05-25, "testing") é o único commit que mexe no host depois do primeiro: cria `ai-agent-module/` e `ai-agent-backend/`, altera host-app/src/App.js, host-app/webpack.config.js, start-all-modules.bat, o README e o código e CSS de outgoing-api-logs e vro-uploads; `fd2169b` (2026-05-25) junta esse commit com `89278d2`. Os commits seguintes tratam de arquivos de modelo do backend e Git LFS (`56e2c5c`, `1e6cca3`, `0ea24ad`, 2026-05-27) e de enviar e apagar o openapi-mcp-server.zip (`6a5dd52` a `a5b4cae`, 2026-07-09 e 2026-07-10).

O clone não tem o conteúdo das versões antigas consultadas: as versões de `c7a7aa3` de host-app/webpack.config.js, host-app/src/App.js, start-all-modules.bat e README.md, e a de `89278d2` do README, não estão disponíveis localmente. As versões de host-app/src/App.js, host-app/webpack.config.js e start-all-modules.bat em `a1d2264` têm os mesmos objetos do snapshot. Para os pontos abaixo há, portanto, as listas de arquivos por commit e os identificadores dos objetos, não o que o host continha antes de `a1d2264`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O host define e publica um event bus global sem publicar nada nele, e os únicos assinantes, que também procuram um store compartilhado (`getAccounts`/`getCards`/`getLoans`) que o bus não tem, são os três módulos que o host não carrega | 3.4.4 (host-app/src/App.js:6); 3.4.7 #17, #23, #24, #34, #35, #45, #46 | ativo ou abandonado | c7a7aa3 2026-05-03 Initial commit: HDFC micro-frontend project with host-app and remote modules; a1d2264 2026-05-25 testing | inconclusivo |
| 2 | A documentação e o start-all-modules.bat dizem que o host carrega todos os módulos, inclusive accounts, cards e loans, e o host só declara sete remotes, sem esses três | 3.4.7 #11, #22, #33, #44, #55 | estágios em conflito | c7a7aa3 2026-05-03 Initial commit: HDFC micro-frontend project with host-app and remote modules; a1d2264 2026-05-25 testing | inconclusivo |
| 3 | Os `DOCUMENTATION.md` dos remotos prometem estilos isolados, e as folhas usam seletores globais carregados por `style-loader`/`css-loader` sem escopo | 3.4.7 #21, #28, #32, #43, #48, #51, #54, #57 | estágios em conflito | c7a7aa3 2026-05-03 Initial commit: HDFC micro-frontend project with host-app and remote modules; a1d2264 2026-05-25 testing | esclarecido |

## Observações

**1. Event bus sem publicador e store compartilhado ausente.** Os três assinantes (accounts-module/src/App.js, cards-module/src/App.js, loans-module/src/App.js) estão no primeiro commit e não mudam até o snapshot: nenhum commit toca accounts-module, cards-module ou loans-module depois de `c7a7aa3`, e os objetos desses `App.js` em `c7a7aa3` são os mesmos do snapshot. O lado do host, host-app/src/App.js, muda uma vez, em `a1d2264` ("testing"), e a versão de `c7a7aa3` não está disponível no clone. O histórico não mostra, assim, se o bus do primeiro commit tinha publicador ou os métodos `getAccounts`/`getCards`/`getLoans`, nem se o host carregava os assinantes antes; a mensagem "testing" não diz o que mudou. O README, onde está a afirmação #17 (README.md:135), muda em `89278d2` e `a1d2264`, e suas versões antigas também não estão disponíveis. Conclusão: não se sabe se o bus é resto de um estágio em que comunicava ou se nunca foi conectado.

**2. "Each module" carregado pelo host, sem accounts, cards e loans.** O DOCUMENTATION.md da raiz (#11) e os `DOCUMENTATION.md` de accounts, cards e loans (#22, #33, #44) estão no primeiro commit e nunca mudam até o snapshot, assim como todo o conteúdo dos três módulos. O que muda é o lado que os carregaria: host-app/webpack.config.js, host-app/src/App.js e start-all-modules.bat (#55) são alterados só em `a1d2264`, o mesmo commit que cria o ai-agent-module, que o host carrega no snapshot (host-app/webpack.config.js:54). As versões de `c7a7aa3` desses três arquivos não estão disponíveis (`show` e `cat-file -e` falham), e os objetos são diferentes dos de `a1d2264`. O histórico mostra, portanto, que a documentação que nomeia os três como carregados é do primeiro commit e que o host foi alterado depois, mas não mostra se o host de `c7a7aa3` declarava accounts, cards e loans e os perdeu em `a1d2264`, ou se nunca os declarou. Conclusão: inconclusivo.

**3. Estilos "isolados" com seletores globais.** Os `DOCUMENTATION.md` com as oito afirmações estão no primeiro commit e nunca mudam até o snapshot. Os `webpack.config.js` dos remotos, onde fica a regra `use: ['style-loader', 'css-loader']` (linha 39 de cada um no snapshot), também estão no primeiro commit e não mudam: o único `webpack.config.js` alterado depois é o do host, em `a1d2264`. As folhas de accounts, business-reports, cards, loans, maker-requests e model-portfolio-configuration não mudam desde `c7a7aa3`; as de outgoing-api-logs (#54) e vro-uploads (#57) são alteradas em `a1d2264`, sem o conteúdo antigo, mas a configuração de carregamento delas é a do primeiro commit. Assim, nos artefatos consultados, a promessa de isolamento e a configuração de CSS sem escopo coexistem desde a primeira presença observável: não há commit que crie ou retire um mecanismo de escopo nas configurações dos remotos. O histórico não mostra o conteúdo das duas folhas antes de `a1d2264` nem a origem do texto, que pode ter sido escrito antes do primeiro commit.

## Comandos

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # antes: sem diferença
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend rev-list --count a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short --reverse a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short --name-status --reverse a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- host-app/webpack.config.js host-app/src/App.js
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- accounts-module cards-module loans-module
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- DOCUMENTATION.md accounts-module/DOCUMENTATION.md cards-module/DOCUMENTATION.md loans-module/DOCUMENTATION.md start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree c7a7aa3 -- host-app/webpack.config.js host-app/src/App.js start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree a1d2264 -- host-app/webpack.config.js host-app/src/App.js start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree a5b4cae18e6c3266d737894bba07c24b0959805b -- host-app/webpack.config.js host-app/src/App.js start-all-modules.bat
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend cat-file -e d3278f6204d681d4e62c21a55b7929932820d9e6   # falhou: objeto ausente (saída 1)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:host-app/webpack.config.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:host-app/src/App.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:start-all-modules.bat   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- '*/DOCUMENTATION.md' DOCUMENTATION.md
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short --name-status a5b4cae18e6c3266d737894bba07c24b0959805b -- '*/src/styles.css' '*/webpack.config.js'
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s%n%b' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- README.md
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%H %ad %s%n%b' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- host-app
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend rev-list --count --merges a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %p %ad %s' --date=short --merges a5b4cae18e6c3266d737894bba07c24b0959805b
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show c7a7aa3:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend show 89278d2:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend cat-file -e 0f6c5625743b470f43aabed32cd921d5f8b42de9   # falhou: objeto ausente (saída 1)
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree c7a7aa3 -- loans-module/src/App.js accounts-module/src/App.js cards-module/src/App.js
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend ls-tree a5b4cae18e6c3266d737894bba07c24b0959805b -- loans-module/src/App.js accounts-module/src/App.js cards-module/src/App.js
docs/mfe-history-review/tools/hist.sh angelantilantil-web__micro-frontend log --format='%h %ad %s' --date=short a5b4cae18e6c3266d737894bba07c24b0959805b -- ai-agent-module/src/App.js
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # depois: sem diferença
```

## Resumo

Commits até o snapshot: 12 (2026-05-03 a 2026-07-10). Pontos: 3 (esclarecido: 1, inconclusivo: 2, resolvido pelo snapshot: 0).
