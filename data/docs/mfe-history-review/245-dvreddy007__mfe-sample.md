---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
inputs:
  clone: data/samples/mfe-sample-001/repos/dvreddy007__mfe-sample
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Leitura do repositório

O histórico até o snapshot tem 2 commits, de 2025-05-17 a 2025-05-25, sem merges. O primeiro, `e4a97c4` (2025-05-17, "push first commit"), cria de uma vez todo o código: os `package.json` da raiz e dos três pacotes, o `lerna.json`, o `README.md`, os `vite.config.js`, o manifesto de rotas, o `Loader.vue`, o plugin de federação e os `entry.js` dos remotes. O segundo, `d4cef45` (2025-05-25, "Add or update the Azure App Service build and deployment workflow config"), é o snapshot e só cria `.github/workflows/main_vdumpavue3.yml`. Nenhum arquivo do primeiro commit muda depois: os identificadores dos objetos de `README.md`, `lerna.json`, `package.json`, `packages/host/vite.config.js` e `packages/host/src/routeManifest.js` são os mesmos em `e4a97c4` e no snapshot.

O código, o README e as configurações já estão no primeiro commit, então são primeira presença observável, não introdução: o histórico não diz onde nem em que ordem foram feitos antes. Também não há versão anterior para comparar com o README, que manda clonar outro repositório (README.md:41-42). A única introdução que o histórico mostra é a do workflow do Azure.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O `lerna` é declarado e só aparece no script `dev` da raiz, com `lerna.json` mínimo | 3.4.2 (package.json:12); 3.4.7 #12 | uso de dependência | e4a97c4 2025-05-17 push first commit | inconclusivo |
| 2 | O workflow do Azure publica o zip do repositório inteiro sem construir nenhum pacote, e o deploy das três aplicações ficou `Undetermined` | 3.4.6 #1, #2, #3; 3.4.7 #1 | ativo ou abandonado | e4a97c4 2025-05-17 push first commit; d4cef45 2025-05-25 Add or update the Azure App Service build and deployment workflow config | inconclusivo |
| 3 | O README atribui rotas e roteamento próprios aos micro frontends e atualização de rotas em tempo de execução, e as rotas são fixas no manifesto do host | 3.4.7 #5, #7, #13 | estágios em conflito | e4a97c4 2025-05-17 push first commit | inconclusivo |
| 4 | O comentário do `filename` do host fala nos módulos remotos do próprio host, e o host não tem `exposes` | 3.4.7 #18 | ativo ou abandonado | e4a97c4 2025-05-17 push first commit | inconclusivo |

## Observações

**1. `lerna` declarado e só no script `dev`.** `package.json` e `lerna.json` têm um único commit, `e4a97c4`, e o mesmo objeto no primeiro commit e no snapshot. O `lerna` não foi configurado e depois abandonado dentro do histórico observável: o estado é o mesmo desde a primeira presença. O histórico não diz se o `lerna run dev` era usado para subir os pacotes, nem se o `lerna.json` mínimo já veio assim do exemplo de origem. O `lerna` continua `Undetermined`.

**2. Deploy no Azure.** O workflow é criado sozinho em `d4cef45`, oito dias depois do código, e é o último commit até o snapshot. A mensagem anuncia a criação ou atualização da configuração de build e deploy do Azure App Service, o texto padrão desse assistente. O commit não altera nenhum `package.json`: a raiz continua sem `build`, `test` e `start` (package.json, mesmo objeto em `e4a97c4` e no snapshot). Ou seja, o workflow foi acrescentado sobre um código que não foi adaptado para ele. O histórico não mostra se a publicação rodou, se serviu alguma das aplicações ou se foi usada depois, e não há commit posterior. Saber quando o workflow apareceu não prova uso nem abandono. O deploy continua `Undetermined`.

**3. Roteamento descrito no README e rotas no manifesto do host.** O `README.md`, o `routeManifest.js` e o `router/index.js` só têm o commit `e4a97c4` e não mudam até o snapshot. Em `e4a97c4` não existe `packages/host/src/router/routeManifest.js`, o caminho do título de README.md:78; o diretório `packages/host/src/router` só tem `index.js`. Dentro do histórico observável, portanto, não há um estágio do código com rotas vindas dos remotes, roteamento próprio neles ou o manifesto no caminho do README. README e código chegam juntos, e o histórico não diz se o README foi escrito para outro estágio ou copiado do exemplo de origem antes do primeiro commit.

**4. Comentário do `filename` do host.** O `packages/host/vite.config.js` só tem o commit `e4a97c4`, com o mesmo objeto no snapshot. Não há versão em que o host tenha `exposes`; o comentário e a configuração sem `exposes` chegam juntos. O histórico não diz se o comentário é resto de uma configuração anterior ao primeiro commit ou uma intenção não realizada.

## Comandos

```
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample rev-list --count d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample rev-list --count --merges d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --reverse --format='%h %ad %s' --date=short --name-status d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- package.json
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- lerna.json
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- .github/workflows/main_vdumpavue3.yml
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- README.md
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- packages/host/src/routeManifest.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- packages/host/src/router/index.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample log --format='%h %ad %s' --date=short d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- packages/host/vite.config.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample ls-tree e4a97c4 -- package.json lerna.json README.md packages/host/vite.config.js packages/host/src/routeManifest.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample ls-tree d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a -- package.json lerna.json README.md packages/host/vite.config.js packages/host/src/routeManifest.js
docs/mfe-history-review/tools/hist.sh dvreddy007__mfe-sample ls-tree -r --name-only e4a97c4 -- packages/host/src/router
```

## Resumo

Commits até o snapshot: 2 (2025-05-17 a 2025-05-25). Pontos: 4 (esclarecido: 0, inconclusivo: 4, resolvido pelo snapshot: 0).
