---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
inputs:
  clone: data/samples/mfe-sample-001/repos/pierrekasongo__bahmni-drc
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Leitura do repositório

O histórico até o snapshot tem 42 commits, nenhum merge, de 2025-04-21 a 2025-06-19. O primeiro,
`ee1e6fc` (2025-04-21, "First commit"), tem só quatro entradas, todas gitlinks (modo `160000`),
sem `.gitmodules`: `bahmni-core`, `bahmni-java-utils`, `default-config` e
`openmrs-module-bahmniapps`, este apontando ao commit `6f15c4c`, que não existe no clone. No dia
seguinte, `f710945` (2025-04-22, "Adding subfolders") remove os quatro gitlinks e cria as quatro
pastas como árvores comuns, com todos os arquivos. É uma introdução observável por cópia: o
conteúdo do host Bahmni, da ponte React/Module Federation e da configuração clínica entra de uma
vez, vindo de repositórios que antes estavam só referenciados. O clone não diz de qual versão
upstream nem com que alterações.

Os outros 40 commits são da distribuição: traduções (de `f3ee559`, 2025-04-23, a `ae836e9`,
2025-06-19), configuração de dados mestres e locais, proxy, Docker e Compose. Na ponte
`openmrs-module-bahmniapps/micro-frontends`, o único commit depois da cópia é `d1faead`
(2025-06-12, "translating micro-frontends"), que só altera `public/i18n/locale_fr.json`. O último
commit é o próprio snapshot, `8039007` (2025-06-19, "Fixing locations").

O clone mostra mensagens, datas, arquivos tocados e identificadores de objeto. O conteúdo das
versões anteriores de arquivos alterados depois da cópia não está disponível (`cat-file` falha para
o `app.json` do registro e para as quatro páginas da `ui` alteradas). Os resultados abaixo se
apoiam em arquivos que não mudaram desde `f710945`, cujo conteúdo é o do snapshot.

Uma diferença entre o commit e o snapshot apareceu nas consultas: o commit tem
`openmrs-module-bahmniapps/ui/dist/` (criada em `f445aea`, 2025-05-18, "Adding dist folder") e os
`ipd.min.js`, `next-ui.min.js` e `shared.min.js` em `ui/app/micro-frontends-dist`. A aquisição os
tirou do snapshot pelas regras `preset:build-output` e `path:**/*.min.js`
(`data/acquisitions/mfe-corpus-001/corpus/pierrekasongo__bahmni-drc/normalization.json`). Por isso
a revisão de build e deploy diz que o snapshot não tem `ui/dist` nem os `.min.js`; a afirmação vale
para o snapshot e não muda nenhum ponto.

As revisões 3.4.2, 3.4.3 e 3.4.6 não deixaram nada em aberto. A construção inativa e as duas
`Undetermined` da 3.4.4, as duas relações `Undetermined` da 3.4.5 e as quatro afirmações
`contradita` da 3.4.7 viraram três pontos.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O template de iframe da biblioteca vendorizada magnific-popup não é referenciado por nenhuma página nem pelo build | 3.4.4 (openmrs-module-bahmniapps/ui/app/lib/magnific-popup/jquery.magnific-popup.js:1593) | ativo ou abandonado | f710945 2025-04-22 Adding subfolders; f3ee559 2025-04-23 Adding translations; 1ed2b99 2025-05-01 Customizing masterdata | esclarecido |
| 2 | O iframe `extension-popup` do registro e o listener de `message` dependem do ponto de extensão `org.bahmni.registration.identifier`, que nenhuma configuração declara | 3.4.4 (openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93; openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39); 3.4.5 #2, #3 | ativo ou abandonado | f710945 2025-04-22 Adding subfolders; f3ee559 2025-04-23 Adding translations; 1ed2b99 2025-05-01 Customizing masterdata; f44767d 2025-05-01 Renaming default visit | esclarecido |
| 3 | O README da ponte chama de micro-frontends os bundles locais `ipd`, `next-ui` e `shared`, que são parte do host | 3.4.7 #7, #8, #10, #11 | estágios em conflito | ee1e6fc 2025-04-21 First commit; f710945 2025-04-22 Adding subfolders; d1faead 2025-06-12 translating micro-frontends | esclarecido |

## Observações

**1. O template de iframe da biblioteca vendorizada magnific-popup não é referenciado por nenhuma
página nem pelo build.** Os dois arquivos de `openmrs-module-bahmniapps/ui/app/lib/magnific-popup/`
chegam em `f710945`, com a cópia da árvore do Bahmni, e nenhum commit até o snapshot os altera. O
`ui/Gruntfile.js` também não muda depois da cópia, e nenhum arquivo de `ui/app` foi removido no
histórico. Fora traduções e imagens, só quatro arquivos de página da `ui` mudam depois da cópia:
`admin/index.html`, `home/index.html` e `home/views/dashboard.html` em `f3ee559`, cuja mensagem
anuncia traduções, e `registration/views/patientcommon.html` em `1ed2b99`, cuja mensagem anuncia
customização de dados mestres. As versões anteriores dessas quatro não estão disponíveis, então o
histórico não exclui que uma delas tenha citado a biblioteca. Delimitado ao que se pode ver: a
biblioteca é parte do conteúdo copiado, e a distribuição não a ligou nem a desligou depois. O
histórico não diz se ela era usada no upstream antes da cópia.

**2. O iframe `extension-popup` do registro e o listener de `message` dependem do ponto de extensão
`org.bahmni.registration.identifier`, que nenhuma configuração declara.** O controller lê esse ponto
com `getExtensions("org.bahmni.registration.identifier", "link")`
(openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21), e os
pontos de extensão do registro ficam no `extension.json` da configuração, em entradas
`extensionPointId` (default-config/openmrs/apps/registration/extension.json:4, :15, :26, :36). O
template do iframe, a diretiva e o controller chegam em `f710945` e não mudam até o snapshot. O
`default-config/openmrs/apps/registration/extension.json` também chega em `f710945` e tem o mesmo
objeto (`847ccfb`) em `f710945`, `f3ee559`, `1ed2b99` e no snapshot: nunca teve outro conteúdo, e
nenhum arquivo de configuração foi removido no histórico. Na mesma pasta, só o `app.json` muda, em
`f3ee559`, `1ed2b99` e `f44767d`; as versões antigas não estão disponíveis, e as mensagens anunciam
traduções, dados mestres e o nome da visita padrão. Delimitado ao `extension.json`: o ponto de
extensão nunca foi declarado neste histórico, então o iframe e o listener não foram desativados
pela distribuição; são código herdado da cópia que a configuração dela não aciona. O histórico não
diz se outra configuração, fora do repositório, o declara.

**3. O README da ponte chama de micro-frontends os bundles locais `ipd`, `next-ui` e `shared`, que
são parte do host.** O `openmrs-module-bahmniapps/micro-frontends/README.md`, o `webpack.config.js`,
o `package.json` e o `src/` da ponte chegam juntos em `f710945`, quando a árvore substitui o gitlink
de `openmrs-module-bahmniapps` do primeiro commit (`ee1e6fc`), e nenhum deles muda até o snapshot; o
único commit posterior na pasta, `d1faead`, só toca `public/i18n/locale_fr.json`. O texto e o código
que o contradiz pertencem, portanto, ao mesmo estágio neste histórico: não há versão anterior da
ponte em que os bundles fossem unidades separadas, nem edição da distribuição sobre o README. A
redação vem com o conteúdo copiado. O histórico não mostra o upstream, então não diz se o texto
descreveu outro arranjo antes da cópia.

## Comandos

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # antes: igual
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc rev-list --count 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc rev-list --count --merges 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show --name-status --no-renames --format='=== %h %ad %s' --date=short ee1e6fc
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show --name-status --no-renames --format='=== %h %ad %s' --date=short ee1e6fc
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show --name-status --no-renames --format='=== %h %ad %s' --date=short f710945
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree ee1e6fc
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show -s --format='%h %ad%n%B' --date=short f710945
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree f710945
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/micro-frontends/README.md openmrs-module-bahmniapps/micro-frontends/webpack.config.js openmrs-module-bahmniapps/micro-frontends/src openmrs-module-bahmniapps/micro-frontends/package.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js openmrs-module-bahmniapps/ui/app/registration/directives/extraPatientIdentifiers.js
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/lib/magnific-popup
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree 80390077a0a2375568289d01bcde52a082dc28e0 -- default-config/openmrs/apps/registration/
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- default-config/openmrs/apps/registration
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --diff-filter=D --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree f710945 -- default-config/openmrs/apps/registration/app.json default-config/openmrs/apps/registration/extension.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:default-config/openmrs/apps/registration/app.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree f3ee559 -- default-config/openmrs/apps/registration/app.json default-config/openmrs/apps/registration/extension.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f3ee559:default-config/openmrs/apps/registration/app.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree 1ed2b99 -- default-config/openmrs/apps/registration/app.json default-config/openmrs/apps/registration/extension.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t 1ed2b99:default-config/openmrs/apps/registration/app.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h' 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/dist
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h' 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/dist
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/dist/
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree -r --name-only 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/micro-frontends-dist
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/lib/magnific-popup openmrs-module-bahmniapps/ui/Gruntfile.js
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree -r --name-only 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/lib/magnific-popup
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/admin/index.html   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/home/index.html   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/home/views/dashboard.html   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/registration/views/patientcommon.html   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/package/docker/index.html   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-only --no-renames --format='@@ %h' 80390077a0a2375568289d01bcde52a082dc28e0 -- '*.html'
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --diff-filter=MD --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app openmrs-module-bahmniapps/ui/Gruntfile.js
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t 6f15c4c3fd52a253a5bb3368d6908dd08123c56c   # falha: objeto ausente (commit do gitlink)
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/micro-frontends
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # depois: igual
```

## Resumo

Commits até o snapshot: 42 (2025-04-21 a 2025-06-19). Pontos: 3 (esclarecido: 3, inconclusivo: 0, resolvido pelo snapshot: 0).
