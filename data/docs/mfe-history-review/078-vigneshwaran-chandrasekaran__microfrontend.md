---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
inputs:
  clone: data/samples/mfe-sample-001/repos/vigneshwaran-chandrasekaran__microfrontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Leitura do repositório

O histórico até o snapshot tem 15 commits, de 2026-04-09 a 2026-04-14, sem merges. O primeiro commit é `8be5efd` (2026-04-09, "Initial commit"), só com `.gitignore`, `LICENSE` e `README.md`; o do snapshot é `28c70f8` (2026-04-14, "redux added in react apps"). Os cinco diretórios de aplicação (`host`, `react-mfe-1`, `react-mfe-2`, `vue-mfe`, `angular-mfe`) são criados juntos por `20b10e1` (2026-04-09, "basic micro frontend apps added"), com manifesto, configuração webpack e fontes de cada um; nenhum commit até o snapshot remove arquivo, e a raiz do snapshot tem os mesmos cinco diretórios.

Os marcos que importam aos pontos são todos de 2026-04-11 e 2026-04-12, numa sequência de commits sobre publicação: `027c8f7` ("vercel app configuration added") cria um `vercel.json` em cada um dos cinco diretórios e altera `host/webpack.config.js`; `204f174` ("fix: add root vercel.json to build host app for deployment") cria o `vercel.json` da raiz; `50e2db2` ("fix: single-domain deployment - build all MFEs into one dist folder for Vercel") altera o `vercel.json` e o `package.json` da raiz e as cinco configurações webpack; `444c709` ("docs: add live Vercel deployment section to README") é a última alteração do README; depois vêm `87ce05b`, `d99e748`, `2c4e8da`, `2e2f847` e `769c802`, correções de produção no host, no rewrite e no Angular.

O que o clone permite ver: as mensagens, os arquivos tocados por commit e os identificadores dos objetos de cada versão (`ls-tree`). O conteúdo das versões antigas não está no clone: todos os objetos anteriores consultados falharam (`cat-file -t` e `show`), e o único README legível é o do snapshot, o objeto `d2b188c`, que é o mesmo desde `444c709`. Quando um arquivo tem no snapshot o mesmo identificador de uma versão antiga, sabe-se que não mudou desde então; o que ele dizia antes disso não se sabe.

Das revisões anteriores, só a 3.4.6 e a 3.4.7 deixaram pontos. A 3.4.2 não tem dependência sem uso (as citações em comentário são notas, não dependências declaradas), a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa (as seis linhas `none` são comentários que descrevem em prosa uma construção presente em outra linha) e a 3.4.5 não tem relação `Undetermined`. Na 3.4.7, a afirmação 3 (`parcial`) não vira ponto: a parte não confirmada é a independência das duas aplicações externas, que não têm artefato no repositório, e não há estágio, intenção ou cópia a esclarecer.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | Há dois caminhos de publicação na Vercel, um `vercel.json` por diretório e o da raiz com o `dist` conjunto, e um comentário do host descreve um terceiro arranjo, por variáveis de ambiente de cada projeto Vercel. | 3.4.6 #1-#5; 3.4.7 #25, #29 | estágios em conflito | 027c8f7 2026-04-11 vercel app configuration added; 204f174 2026-04-11 fix: add root vercel.json to build host app for deployment; 50e2db2 2026-04-11 fix: single-domain deployment - build all MFEs into one dist folder for Vercel; 444c709 2026-04-11 docs: add live Vercel deployment section to README; 87ce05b 2026-04-11 fix: use argv.mode instead of process.env.NODE_ENV in webpack config | esclarecido |
| 2 | O README conta "Six independent apps" e "five child apps", que não batem com os seis destinos do host nem com as cinco aplicações locais. | 3.4.7 #4 | estágios em conflito | 20b10e1 2026-04-09 basic micro frontend apps added; 444c709 2026-04-11 docs: add live Vercel deployment section to README | inconclusivo |
| 3 | O README diz que todo remote usa `publicPath: 'auto'`, mas o Angular fixa `/angular-mfe/` em produção. | 3.4.7 #28 | estágios em conflito | 444c709 2026-04-11 docs: add live Vercel deployment section to README; 2e2f847 2026-04-12 fix: set Angular publicPath to /angular-mfe/ in production to fix chunk 404s | esclarecido |
| 4 | O comentário do vue-mfe diz que o `vue` é compartilhado para haver uma só cópia, mas nenhuma outra unidade declara `vue`. | 3.4.7 #32 | estágios em conflito | 20b10e1 2026-04-09 basic micro frontend apps added; 50e2db2 2026-04-11 fix: single-domain deployment - build all MFEs into one dist folder for Vercel | inconclusivo |

## Observações

**1. Dois caminhos de publicação.** Os cinco `vercel.json` por diretório são criados por `027c8f7` ("vercel app configuration added") e têm no snapshot os mesmos objetos dessa versão (`e8fc375` no host, `8ce08a2` no angular-mfe e `eb42623`, o mesmo arquivo, nos três outros remotes): não foram alterados depois. O `vercel.json` da raiz vem depois, com `204f174`, cuja mensagem anuncia construir o host para publicação, e é alterado por `50e2db2`, cuja mensagem anuncia a publicação num só domínio, com todas as aplicações num único `dist`; esse commit também altera o `package.json` da raiz, a configuração do host e as dos quatro remotes. A mensagem de `87ce05b` diz que o erro corrigido fazia "all MFEs to load from localhost URLs in production" quando a Vercel roda o build, e `2c4e8da` volta a alterar só o `vercel.json` da raiz. O README do snapshot, que descreve só a publicação conjunta, é o objeto gravado por `444c709`, depois de `50e2db2`. O conteúdo das versões de `host/webpack.config.js` de `027c8f7` e `50e2db2` não está no clone, então não se sabe em que commit o comentário das variáveis de ambiente (host/webpack.config.js:8-14) foi escrito nem se o código algum dia as leu; a mensagem de `87ce05b` fala de `process.env.NODE_ENV`, não das URLs. Conclusão, delimitada aos arquivos consultados: os `vercel.json` por diretório são do estágio de `027c8f7`, anterior ao arranjo num só domínio de `50e2db2`, e não mudaram depois dele; o arranjo conjunto é o mais recente e o único que os commits seguintes ajustam. O comentário das variáveis de ambiente descreve o arranjo por projeto, mas a sua data não pôde ser lida. O histórico não mostra se os projetos Vercel separados continuaram publicados; o deploy da 3.4.6 continua `Undetermined`.

**2. Contagem do README.** Os cinco diretórios de aplicação existem desde `20b10e1` e nenhum commit até o snapshot cria outro diretório de aplicação ou remove arquivo, então o número de aplicações locais não mudou no histórico. O README do snapshot é o objeto gravado por `444c709`; as versões anteriores (`2cac130`, de `20b10e1`, e `3fc50ac`, de `68bea5b`) não estão no clone, e as de `host/src/App.jsx` também não, então não se sabe quando a frase de README.md:6-7 apareceu nem quando as duas aplicações externas entraram no host. Conclusão: a divergência não vem de um estágio com outro número de aplicações locais; se vem de um estágio com outro número de aplicações externas, o histórico não responde.

**3. `publicPath: 'auto'`.** O README do snapshot, com a frase de README.md:528-529 na seção de publicação, é o objeto gravado por `444c709` ("docs: add live Vercel deployment section to README"), e o README não muda depois. A configuração do angular-mfe muda três vezes: em `50e2db2`, em `2e2f847`, cuja mensagem anuncia "set Angular publicPath to /angular-mfe/ in production to fix chunk 404s", e em `769c802` (zone.js). O conteúdo das versões antigas não está no clone, então o valor anterior a `2e2f847` não pôde ser lido; o que se tem é a mensagem. Conclusão, delimitada a esses arquivos: a frase do README é de antes de `2e2f847`, e o caminho fixo do Angular, segundo a mensagem, foi introduzido depois, como correção de produção; o README não foi atualizado depois dessa correção.

**4. Compartilhamento do Vue.** `vue-mfe/webpack.config.js` aparece em `20b10e1` e muda só uma vez, em `50e2db2`; a configuração e o manifesto do host mudam em vários commits (`log` de `host/webpack.config.js` e `host/package.json`). Nenhuma versão antiga desses arquivos está no clone, então não se sabe se o comentário de vue-mfe/webpack.config.js:10 existia desde `20b10e1` nem se o host algum dia declarou `vue`. Conclusão: o histórico não diz se o comentário é resto de outro estágio, intenção ou explicação genérica do padrão.

## Comandos

```
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend rev-list --count 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend rev-list --count --merges 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='%h %ad %s' --date=short --reverse --name-status 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 20b10e1 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r f04a4a7 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 68bea5b -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 027c8f7 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 204f174 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 50e2db2 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 444c709 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 87ce05b -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r d99e748 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 2c4e8da -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 2e2f847 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 769c802 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 28c70f8 -- README.md vercel.json host/vercel.json react-mfe-1/vercel.json host/webpack.config.js angular-mfe/webpack.config.js vue-mfe/webpack.config.js host/src/App.jsx package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='--- %h %ad%n%B' --date=short 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 20c2bb8c17e82fa121d50ebe6f7f3205d1ff710d   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d17c92928a520cf72cbd294df037af46457df793   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 396ce0e5d322304d69269c4c51fa21655bfbf050   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 1248b80290052e2188ef56d46e6cefcea3a33e76   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t db4670f4302d4f377392c286806f6162a9870058   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 3fc50ac2f608a19bec389acd124550440d2ae77b   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 2cac130e5bc136aff619bc44beaf5277894a8466   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d1e4996b488e7454c4e480774fa88f61a89aee43   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 96f7a12650b05570c50db70150466c7457c6472d   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 651362ae28a3cfa1919dbd56b1ee99d2500b125c   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t ac4ee013c5c338e13e0e54241f7e3f540e72790d   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 09fdcc8c7ece727f86005c602276acc6454973ec   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t e4962d8eca3cbbdf5488f8f3d8111b2d3eaaa729   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d6afff55d8a217291d2efb5bf05e4cfd2ae99f4c   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 2910e07af6656c10ab6c47f01a9b9eaddced17d4   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t d952b29d16801e24712f108842e19cf5b02c598e   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t 7fb007964ef5e5bf7bca851c0fb1c696c117bcb3   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend cat-file -t dd9b2cbdd760a62fd1ad3d345735a69fbc6b9710   # falhou: objeto ausente (could not get object info)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='%h %ad %s' --date=short --diff-filter=D --name-status 28c70f8b2b748f07872a8dd1f56240d8a3415c05
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 027c8f7 -- host/vercel.json react-mfe-1/vercel.json react-mfe-2/vercel.json vue-mfe/vercel.json angular-mfe/vercel.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree -r 28c70f8 -- host/vercel.json react-mfe-1/vercel.json react-mfe-2/vercel.json vue-mfe/vercel.json angular-mfe/vercel.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree 20b10e1
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend ls-tree 28c70f8
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend log --format='%h %ad %s' --date=short 28c70f8b2b748f07872a8dd1f56240d8a3415c05 -- vue-mfe/webpack.config.js host/webpack.config.js host/package.json
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend show 444c709:README.md
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend show 50e2db2:angular-mfe/webpack.config.js   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh vigneshwaran-chandrasekaran__microfrontend show 027c8f7:host/webpack.config.js   # falhou: objeto ausente (bad object)
```

## Resumo

Commits até o snapshot: 15 (2026-04-09 a 2026-04-14). Pontos: 4 (esclarecido: 2, inconclusivo: 2, resolvido pelo snapshot: 0).
