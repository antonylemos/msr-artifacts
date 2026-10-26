---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
inputs:
  clone: data/samples/mfe-sample-001/repos/marcos-roberto-dev__poc-mfe-custom-root
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Leitura do repositório

O histórico até o snapshot tem 4 commits lineares, todos de 2026-01-09, sem merges. O primeiro, `546aa27` ("tada: start poc project MFE"), já traz os quatro projetos (`content-app`, `root-app`, `root-classic`, `topbar-app`): é a primeira presença observável de quase todos os arquivos, inclusive os import maps dos dois hosts, o helper `dynamicImport.ts` e o `vite.config.ts` do topbar. O primeiro commit não diz onde esse código foi feito antes. Os três commits seguintes mexem pouco: `0cccd59` ("feat: add topbar component with theme toggle functionality") cria `topbar-app/src/App.vue`, remove `topbar-app/src/TopbarApp.vue` e altera `topbar-app/src/main.ts`, além de estilos e lockfiles; `f2f2494` ("feat: implement topbar component with theme toggle functionality") cria a cópia do topbar em `root-app/src/modules/Topbar/` e altera `root-app/src/App.vue`; `6ae6565` ("style: format App.vue for consistency and readability"), o snapshot, altera `content-app/src/App.vue`, `content-app/src/main.ts` e `topbar-app/src/App.vue`.

Nenhum arquivo do `root-classic` muda depois de `546aa27`. Em `root-app`, `index.html`, `package.json`, `vite.config.ts`, `src/utils/dynamicImport.ts`, `mfe-app.json`, `src/importMap.json` e `src/importMap.dev.json` também não mudam. Como o identificador do objeto é o mesmo em todos os commits, a versão desses arquivos em todo o histórico é a do snapshot. O clone é parcial: o conteúdo das versões antigas dos arquivos que mudaram (`root-app/src/App.vue` de `546aa27`, `topbar-app/src/TopbarApp.vue`, os `main.ts` anteriores e `topbar-app/src/App.vue` de `0cccd59`) não está disponível localmente. O que se compara aí são só os identificadores dos objetos, por `ls-tree`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `single-spa` declarado nos dois remotos sem import, que só importam `single-spa-vue` | 3.4.2 (content-app/package.json:12; topbar-app/package.json:12) | uso de dependência | 546aa27 2026-01-09 tada: start poc project MFE; 0cccd59 2026-01-09 feat: add topbar component with theme toggle functionality; 6ae6565 2026-01-09 style: format App.vue for consistency and readability | inconclusivo |
| 2 | `vite-plugin-single-spa` declarado no `root-app` sem import nem registro no `vite.config.ts` | 3.4.2 (root-app/package.json:14) | uso de dependência | 546aa27 2026-01-09 tada: start poc project MFE | esclarecido |
| 3 | `@types/systemjs` declarado no `root-classic` sem uso | 3.4.2 (root-classic/package.json:44) | uso de dependência | 546aa27 2026-01-09 tada: start poc project MFE | esclarecido |
| 4 | A montagem própria (`createApp(App).mount('#app')`) está comentada nos dois remotos | 3.4.3 (Notas); 3.4.5 (Leitura) | ativo ou abandonado | 546aa27 2026-01-09 tada: start poc project MFE; 0cccd59 2026-01-09 feat: add topbar component with theme toggle functionality; 6ae6565 2026-01-09 style: format App.vue for consistency and readability | inconclusivo |
| 5 | O `root-app` tem uma cópia local do topbar em `src/modules/Topbar/`, com import e uso comentados | 3.4.3 (Notas); 3.4.4 (Notas); 3.4.5 (Leitura) | extração | 546aa27 2026-01-09 tada: start poc project MFE; 0cccd59 2026-01-09 feat: add topbar component with theme toggle functionality; f2f2494 2026-01-09 feat: implement topbar component with theme toggle functionality; 6ae6565 2026-01-09 style: format App.vue for consistency and readability | esclarecido |
| 6 | O caminho SystemJS do `root-app` (carregador, fallback `System.import` e build `app.js` do topbar) não tem alvo, porque o único `systemjs-importmap` está comentado | 3.4.4 (root-app/index.html:24; root-app/src/utils/dynamicImport.ts:24; Notas); 3.4.6 (Leitura); 3.4.7 #2, #5 | ativo ou abandonado | 546aa27 2026-01-09 tada: start poc project MFE | esclarecido |
| 7 | A meta `import-map-overrides-domains` e as instruções sobre ela estão comentadas no `root-classic` | 3.4.4 (root-classic/src/index.ejs:12, 13, 14) | ativo ou abandonado | 546aa27 2026-01-09 tada: start poc project MFE | esclarecido |
| 8 | `root-app/mfe-app.json`, `root-app/src/importMap.json` e `root-app/src/importMap.dev.json` mapeiam as unidades em outras URLs e não são lidos | 3.4.4 (Notas); 3.4.5 (Leitura); 3.4.6 (Leitura) | estágios em conflito | 546aa27 2026-01-09 tada: start poc project MFE | esclarecido |
| 9 | O import map de produção do `root-classic` está comentado, e só o modo local liga as aplicações | 3.4.4 (Notas); 3.4.6 (Leitura) | ativo ou abandonado | 546aa27 2026-01-09 tada: start poc project MFE | esclarecido |
| 10 | O topbar se chama `@org/header-app` no `root-app` e `@org/topbar-app` no `root-classic` | 3.4.5 #4 | estágios em conflito | 546aa27 2026-01-09 tada: start poc project MFE; f2f2494 2026-01-09 feat: implement topbar component with theme toggle functionality | esclarecido |

## Observações

**1. `single-spa` declarado nos remotos sem import.** `content-app/package.json` e `topbar-app/package.json` não mudam desde `546aa27`: a declaração está em todas as versões. Os arquivos onde o pacote seria importado, os `main.ts`, mudaram depois: `topbar-app/src/main.ts` em `0cccd59` e `content-app/src/main.ts` em `6ae6565`. As versões anteriores deles não estão disponíveis, então o histórico não mostra se algum dia importaram `single-spa` diretamente. A dúvida fica como estava; o pacote continua sem uso no snapshot.

**2. `vite-plugin-single-spa` declarado sem uso.** `root-app/package.json` e `root-app/vite.config.ts`, onde um plugin do Vite seria registrado, têm o mesmo objeto em todos os commits. Em nenhuma versão do histórico o plugin aparece registrado no `vite.config.ts`, que só tem `vue()`. A conclusão vale para a configuração de build; as versões antigas de `root-app/src/App.vue` e `root-app/src/shims-remote-modules.d.ts`, alterados em `f2f2494`, não estão disponíveis. Dentro do histórico, a dependência foi declarada e nunca configurada; não foi desconectada depois. O histórico não diz por que foi declarada.

**3. `@types/systemjs` declarado sem uso.** Nenhum arquivo do `root-classic` muda depois de `546aa27`, então todas as versões do projeto no histórico são a do snapshot, em que o pacote não é referenciado. A dependência chega com o projeto e nunca é usada no histórico. Não dá para saber se veio só do gerador (`create-single-spa`) ou se teve uso antes do primeiro commit.

**4. A montagem própria dos remotos está comentada.** Os dois `main.ts` existem desde `546aa27` e mudam uma vez cada um: `topbar-app/src/main.ts` em `0cccd59`, cuja mensagem anuncia o componente do topbar com troca de tema, e `content-app/src/main.ts` em `6ae6565`, cuja mensagem anuncia formatação do `App.vue`. As versões anteriores não estão disponíveis. O histórico não mostra se a linha `createApp(App).mount('#app')` já estava comentada no primeiro commit nem se algum remoto montou a UI sozinho. Inconclusivo.

**5. Cópia local do topbar no `root-app`.** O `topbar-app` existe como projeto desde `546aa27`, com `src/TopbarApp.vue`; em `0cccd59` esse arquivo sai e entra `src/App.vue`. A cópia em `root-app/src/modules/Topbar/` só aparece depois, em `f2f2494`, no mesmo commit que altera `root-app/src/App.vue`. Pelos identificadores de objeto, os `HelloWorld.vue` e `vue.svg` da cópia são os mesmos do `topbar-app`, e o `TopbarApp.vue` da cópia (`064fd53`) é idêntico ao `topbar-app/src/App.vue` do snapshot, que só chega a esse conteúdo em `6ae6565`. O `root-app/src/App.vue` de `f2f2494` já é o objeto do snapshot, com o import e o uso da cópia comentados; não há versão no histórico em que a cópia estivesse ligada. Conclusão, delimitada a esses arquivos: o `topbar-app` não foi extraído dessa cópia, que é posterior a ele e reproduz o código do topbar dentro do host; ela entra já desligada. O conteúdo de `root-app/src/App.vue` antes de `f2f2494` não está disponível, e o histórico não diz para que a cópia foi feita.

**6. Caminho SystemJS sem alvo.** `root-app/index.html`, com o SystemJS carregado e o único `systemjs-importmap` comentado, `root-app/src/utils/dynamicImport.ts`, com o fallback `System.import`, e `topbar-app/vite.config.ts`, com o build `format: "system"` e saída `app.js`, têm o mesmo objeto em todos os commits desde `546aa27`. Em nenhuma versão do histórico o mapa SystemJS esteve ativo: o caminho não foi desligado depois, chega assim no primeiro commit. O histórico não diz se ele esteve ligado antes do primeiro commit nem se foi planejado e nunca conectado. As afirmações `parcial` 3.4.7 #2 e #5 continuam como estão.

**7. Meta `import-map-overrides-domains` comentada.** `root-classic/src/index.ejs` não muda depois de `546aa27`; as linhas 12 a 14 estão comentadas em todas as versões. Não houve, no histórico, uma versão com a meta ativa. São comentários do template do `create-single-spa`, e o histórico não diz se algum dia foram descomentados antes do primeiro commit.

**8. Mapas de import não lidos.** Os três arquivos são criados em `546aa27`, no mesmo commit do import map nativo de `root-app/index.html`, e nenhum dos quatro muda depois. As URLs diferentes (porta 5173, `spa.js`) não pertencem a um estágio anterior observável: os mapas não lidos e o mapa ativo convivem desde o primeiro commit. O histórico não diz se esses arquivos tiveram uso antes do primeiro commit.

**9. Import map de produção comentado.** O mesmo `root-classic/src/index.ejs` chega em `546aa27` com o mapa de produção comentado e o mapa local condicionado a `isLocal`, e não muda depois. Não há versão em que o mapa de produção estivesse ativo nem commit que o comente. O histórico não diz se ele foi planejado e nunca conectado ou se é só o texto do gerador.

**10. Dois nomes para o topbar.** `root-app/index.html`, com `@org/header-app`, `root-classic/src/index.ejs` e `root-classic/src/microfrontend-layout.html`, com `@org/topbar-app`, e `topbar-app/package.json` não mudam desde `546aa27`. Os dois nomes convivem desde o primeiro commit, e nenhum commit renomeia a unidade. O `root-app/src/App.vue`, que usa `@org/header-app` na linha 8, muda em `f2f2494`, e a versão anterior não está disponível; mas o mapa que resolve o nome, em `index.html`, é o mesmo em todas as versões. Conclusão, delimitada a esses arquivos: os nomes não pertencem a estágios diferentes do histórico. O histórico não liga `@org/header-app` ao `topbar-app`, e a relação 3.4.5 #4 fica como está.

## Comandos

```
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root rev-list --count 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root rev-list --count --merges 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --reverse --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --reverse --name-status --no-renames --format='--- %h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r 546aa27 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r 0cccd59 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r f2f2494 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root ls-tree -r 6ae6565 -- topbar-app/src root-app/src/App.vue root-app/src/modules root-app/index.html root-app/src/utils/dynamicImport.ts root-classic/src/index.ejs root-app/mfe-app.json root-app/src/importMap.json root-app/src/importMap.dev.json content-app/package.json topbar-app/package.json root-app/package.json root-classic/package.json topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 546aa27:root-app/src/App.vue          # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 546aa27:topbar-app/src/TopbarApp.vue   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 546aa27:topbar-app/src/main.ts        # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root show 0cccd59:topbar-app/src/App.vue        # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e 7bdbd66488bbc178965cb9e0d338a96d59a6a1c5   # ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e 42c5d27d9381b1844b9a08adf2bba16239778d9b   # ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e 73c35efb899418e4db9c80fdf4fa0c7449e155e0   # ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root cat-file -e f5dc067023592d4e1f28db789ac61328e4c4d3cc   # ausente
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- content-app/package.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/package.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- content-app/src/main.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/src/main.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/package.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-classic
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/App.vue
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/modules
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/src
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/index.html
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/utils/dynamicImport.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- topbar-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/mfe-app.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/importMap.json
docs/mfe-history-review/tools/hist.sh marcos-roberto-dev__poc-mfe-custom-root log --no-renames --format='%h %ad %s' --date=short 6ae6565dc49a391729b62588c5fccf37d2be104b -- root-app/src/importMap.dev.json
```

## Resumo

Commits até o snapshot: 4 (2026-01-09 a 2026-01-09). Pontos: 10 (esclarecido: 8, inconclusivo: 2, resolvido pelo snapshot: 0).
