---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
inputs:
  clone: data/samples/mfe-sample-001/repos/lorem98__mfe
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 174 — lorem98/mfe

## Leitura do repositório

O histórico até o snapshot tem 17 commits, sem merges, de 2026-02-05 (`ba3fc6f`, "Initial commit") a 2026-05-21 (`44eb295`, "Revert previous temp commit", o commit do snapshot). Há três fases. Em fevereiro e março, o container e o marketing: o primeiro commit já traz os dois pacotes com configurações webpack (e só o `package.json` e o `package-lock.json` de `auth` e `dashboard`); os workflows do container e do marketing entram em `13cc9fe` (2026-02-06, "Created container deploy script") e `6819b9e` (2026-02-13, "Added marketing MFE workflow"), e a navegação entre o container e o marketing em `2be6f54` (2026-03-24, "Navigation between orchestrator and MF and viceversa"). Em 2026-05-11, `6af9f6d` ("Created auth MFE") cria o código e as configurações do auth, e `91feee5` ("Created Dashboard MFE + added readme") cria o dashboard, os wrappers `AuthApp` e `DashboardApp` do container e o `README.md`. Em 2026-05-21, `60008a4` ("Created deploy workflows for auth and dashboard") cria os dois workflows que faltavam; `d1cf5a5` ("Temp commit to test the new deploy workflows") altera `packages/auth/src/components/Signup.js` e `packages/dashboard/src/App.vue`, e `44eb295` desfaz essas duas mudanças.

Os pontos vêm todos da revisão de documentação (3.4.7). O que decide quase todos é a comparação dos identificadores de objeto (`ls-tree`) em `91feee5`, `60008a4`, `d1cf5a5` e no snapshot: o `README.md`, todo o `src` e o `config` do dashboard, o `public` e o `config` do auth, o `bootstrap.js` do auth e do marketing, o `webpack.dev.js` e o `src` do container têm, no snapshot, os mesmos objetos que em `91feee5` (o `public` e o `config` do auth, os mesmos que em `6af9f6d`). O único desses arquivos que mudou depois é o `App.vue`, que em `d1cf5a5` muda de objeto e em `44eb295` volta ao de `91feee5`. Ou seja, o README e o código que ele descreve são do mesmo estágio e não mudaram até o snapshot. Isso é primeira presença observável e introdução ao mesmo tempo para o README e o dashboard, que são criados nesses commits; o histórico não diz de onde o texto do README foi tirado.

Não viraram pontos: as revisões 3.4.2, 3.4.3, 3.4.5 e 3.4.6 não deixaram nada `Undetermined` nem dependência sem uso; as duas linhas `none` da revisão de código-fonte (packages/auth/config/webpack.dev.js:19; packages/dashboard/config/webpack.dev.js:20) são comentários explicativos que conferem com o código, e não construções comentadas. O conteúdo das versões antigas não foi lido: os pontos se resolvem pelos identificadores de objeto e pelas mensagens.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README atribui a "cada remote" a sincronização de histórico e o `mount` isolado com browser history, e o dashboard não segue esse padrão. | 3.4.7 #10, #24 | estágios em conflito | 2be6f54 2026-03-24 Navigation between orchestrator and MF and viceversa; 6af9f6d 2026-05-11 Created auth MFE; 91feee5 2026-05-11 Created Dashboard MFE + added readme | esclarecido |
| 2 | O README justifica o `singleton` do Vue para "all Vue-based remotes", e só há um remote Vue. | 3.4.7 #22 | estágios em conflito | — | resolvido pelo snapshot |
| 3 | O README diz que todo SFC do dashboard usa `<style scoped>`, e o `App.vue` não usa. | 3.4.7 #27 | estágios em conflito | 91feee5 2026-05-11 Created Dashboard MFE + added readme; d1cf5a5 2026-05-21 Temp commit to test the new deploy workflows; 44eb295 2026-05-21 Revert previous temp commit | esclarecido |
| 4 | O README manda subir os remotes antes do container porque o servidor de desenvolvimento falharia ao buscar os `remoteEntry.js`, o que a configuração não sustenta. | 3.4.7 #28 | estágios em conflito | 91feee5 2026-05-11 Created Dashboard MFE + added readme | esclarecido |
| 5 | O comentário do `index.html` do auth diz que esse HTML nunca é servido, e o build de produção o gera e o workflow o publica e invalida. | 3.4.7 #32 | estágios em conflito | 6af9f6d 2026-05-11 Created auth MFE; 60008a4 2026-05-21 Created deploy workflows for auth and dashboard | esclarecido |

## Observações

**1. Padrão de histórico "em cada remote".** O padrão que o README generaliza é anterior ao dashboard: a mensagem de `2be6f54` (2026-03-24) anuncia a navegação entre o container e o marketing, e o auth, com o mesmo padrão, é criado em `6af9f6d`. O README e o dashboard nascem juntos em `91feee5`, e os objetos do `README.md`, de `packages/dashboard/src/bootstrap.js` e de `packages/container/src/components/DashboardApp.js` são os mesmos de `91feee5` até o snapshot. Não há, portanto, uma versão do dashboard com histórico de roteamento que tenha sido removida, nem um README posterior ao dashboard. O histórico não mostra se a frase foi escrita antes do dashboard em outro lugar ou copiada de outro texto. Conclusão, delimitada a esses arquivos: a generalização e o dashboard sem roteamento são do mesmo commit e não mudaram depois; a contradição não vem de estágios diferentes do repositório.

**2. Vue compartilhado entre remotes Vue.** O próprio README marca o caso como hipótese ("should you add more", README.md:256), e o snapshot só tem um pacote Vue (3.4.7 #22). Não há o que o histórico acrescente: a frase descreve uma extensão possível, não um estado do repositório. Não houve consulta.

**3. `<style scoped>` "em todo SFC".** O `App.vue` e o `Dashboard.vue` são criados em `91feee5`, junto com o README. O `App.vue` é o único arquivo dessa parte que muda depois: em `d1cf5a5` (2026-05-21, "Temp commit to test the new deploy workflows") ganha outro objeto, e em `44eb295` ("Revert previous temp commit") volta ao objeto de `91feee5` (`dd66cc2`). O `Dashboard.vue` e o `README.md` não mudam. O conteúdo da versão temporária não foi lido; a mensagem anuncia uma mudança para testar os workflows. Conclusão: o `App.vue` do snapshot é o mesmo de quando o README foi escrito; o `<style>` sem `scoped` não é resto nem mudança posterior ao README.

**4. Ordem de subida no desenvolvimento.** O `packages/container/config/webpack.dev.js` é alterado em `ba3fc6f`, `13cc9fe` e `91feee5`, e o objeto de `91feee5` é o do snapshot; os wrappers `AuthApp.js` e `DashboardApp.js` e o `App.js` do container também estão, no snapshot, como em `91feee5`. O README é criado nesse mesmo commit. A instrução, portanto, foi escrita com a configuração de desenvolvimento e os wrappers atuais, e não sobra de uma configuração anterior. O conteúdo das versões de `ba3fc6f` e `13cc9fe` não foi lido, e o histórico não mostra de onde vem a explicação sobre o servidor de desenvolvimento. Conclusão, delimitada a esses arquivos: a afirmação e a configuração que a desmente são do mesmo estágio.

**5. `index.html` do auth "nunca servido".** O `packages/auth/public/index.html`, com o comentário, e o `packages/auth/config/webpack.common.js`, com o `HtmlWebpackPlugin` que gera esse HTML também na produção, são criados juntos em `6af9f6d` (2026-05-11) e têm os mesmos objetos até o snapshot. O workflow que publica o `dist` e invalida `/auth/latest/index.html` vem depois, em `60008a4` (2026-05-21, "Created deploy workflows for auth and dashboard"); no snapshot, `.github/workflows/auth.yml` só difere de `.github/workflows/container.yml` pelo nome do pacote (linhas 1, 8, 12, 26 e 32), inclusive no arquivo invalidado. O histórico mostra que o comentário é anterior ao workflow, mas o build que já gerava o HTML é do mesmo commit do comentário, então a afirmação não confere nem no estágio em que foi escrita. Que o workflow do auth tenha sido feito a partir do do container é coerente com o texto igual, mas a mensagem só anuncia a criação. Conclusão: o comentário não descreve um estágio anterior do build; a publicação e a invalidação do HTML entraram depois, num workflow com a mesma forma do do container.

## Comandos

```
docs/mfe-history-review/tools/hist.sh lorem98__mfe rev-list --count 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
docs/mfe-history-review/tools/hist.sh lorem98__mfe rev-list --count --merges 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
docs/mfe-history-review/tools/hist.sh lorem98__mfe log --format='%h %ad %s' --date=short --reverse --name-status 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 91feee5 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 60008a4 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r d1cf5a5 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 44eb295 -- README.md packages/dashboard/src packages/dashboard/config packages/auth/public packages/auth/config packages/auth/src/bootstrap.js packages/marketing/src/bootstrap.js packages/container/config/webpack.dev.js packages/container/src .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe ls-tree -r 6af9f6d -- packages/auth/public packages/auth/config .github/workflows
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 6af9f6d
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 91feee5
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 60008a4
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short d1cf5a5
docs/mfe-history-review/tools/hist.sh lorem98__mfe show -s --format='--- %h %ad%n%B' --date=short 44eb295
docs/mfe-history-review/tools/hist.sh lorem98__mfe log --format='%h %ad %s' --date=short 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4 -- README.md packages/auth/public/index.html packages/auth/config/webpack.common.js packages/dashboard/src/App.vue packages/dashboard/src/bootstrap.js packages/container/config/webpack.dev.js .github/workflows/auth.yml
```

## Resumo

Commits até o snapshot: 17 (2026-02-05 a 2026-05-21). Pontos: 5 (esclarecido: 4, inconclusivo: 0, resolvido pelo snapshot: 1).
