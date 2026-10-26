---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
inputs:
  clone: data/samples/mfe-sample-001/repos/riponcc__Group4COMP308Project
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Leitura do repositório

O histórico até o snapshot tem 8 commits, de 2025-11-26 a 2025-12-10, com um merge, o próprio commit do snapshot, `59db8c8` (2025-12-10, "Merge pull request #1 from riponcc/ahmadsbranch"), que junta `f94a6e6` e `0df228d`. O primeiro commit, `934af61` (2025-11-26, "Initial project commit having backend auth-microservice"), cria só o backend: `server/package.json`, `server/.gitignore`, o auth-service e o `package.json` do issue-management-service. As três aplicações frontend são introduzidas uma por commit: a user-app em `9983a55` (2025-11-28, "Created frontend user-app"), o shell em `94eaf5d` (2025-11-29, "Added shell app to handle microservices") e a issue-app em `8c2b4f9` (2025-12-07, "Added backend and fronend for issue microservices"), que no mesmo commit altera `client/shell-app/vite.config.js`, `client/shell-app/src/App.jsx`, `client/shell-app/src/main.jsx` e `client/user-app/src/UserComponent.jsx` e cria o código do issue-management-service. Depois disso, `f94a6e6` (2025-12-09, "Added AI chatboat") e `0df228d` (2025-12-10, "Update project files and add new features") mexem na issue-app, em `client/user-app/src/App.jsx` e nos serviços de backend, e `0df228d` cria o `README.md`; nenhum dos dois altera arquivos do shell.

O clone guarda o conteúdo das versões a partir de `8c2b4f9` para os arquivos consultados; as versões de `94eaf5d`, `9983a55` e `934af61` dos arquivos de código lidos não estão disponíveis (só `server/package.json` de `934af61` pôde ser lido).

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `client/shell-app/vite.config.js:1-26` guarda uma configuração de federation toda comentada, só com o remote `userApp`, acima da configuração ativa com `userApp` e `issueApp` | 3.4.2 (Notas; client/shell-app/vite.config.js:1-26); 3.4.5 (Leitura); 3.4.6 #2 | estágios em conflito | 94eaf5d 2025-11-29 Added shell app to handle microservices; 8c2b4f9 2025-12-07 Added backend and fronend for issue microservices | esclarecido |
| 2 | Os comentários do shell dizem que ele consulta o usuário num "Gateway", mas o endereço é o do auth-service, e o snapshot não tem gateway, só sinais de um na porta 4000 | 3.4.7 #6 | estágios em conflito | 934af61 2025-11-26 Initial project commit having backend auth-microservice; 94eaf5d 2025-11-29 Added shell app to handle microservices; 8c2b4f9 2025-12-07 Added backend and fronend for issue microservices; 0df228d 2025-12-10 Update project files and add new features | esclarecido |

## Observações

**1. Configuração comentada no `vite.config.js` do shell.** O arquivo é introduzido em `94eaf5d`, quando a user-app já existia e a issue-app ainda não (ela só é criada em `8c2b4f9`). O conteúdo dessa primeira versão não está no clone (`show` falhou por objeto ausente), então não dá para confirmar que o bloco comentado é literalmente ela. A versão de `8c2b4f9`, o commit que cria `client/issue-app/`, já tem as duas partes: o bloco comentado com só `userApp` em remotes e a configuração ativa com `userApp` e `issueApp`, esta com o comentário "Added Issue App" na linha do novo remote. O arquivo não muda depois disso até o snapshot. Conclusão, delimitada a este arquivo: o bloco comentado e a configuração ativa pertencem a estágios diferentes; o bloco corresponde ao período em que o shell só tinha a user-app como remote, e foi comentado no mesmo commit que acrescentou a issue-app. Não é uma configuração alternativa em uso.

**2. "Gateway" no shell.** Nenhum dos 8 commits cria arquivo de gateway: os caminhos criados em `server/` são só os do auth-service, do issue-management-service e do analytics-ai-service, e o `index.js` que `server/package.json` declara como `main` desde `934af61` nunca é criado. Na primeira versão legível do shell, a de `8c2b4f9`, o comentário "// Gateway" já acompanha o endereço `http://localhost:4001/graphql` em `client/shell-app/src/main.jsx:14`, e "Check logged-in user from Gateway" já está em `client/shell-app/src/App.jsx:13`, os dois como no snapshot; as versões de `94eaf5d` não estão no clone, e não dá para saber se o shell apontou antes para outra porta. Os sinais da porta 4000 também já estão em versões anteriores ao snapshot: a de `8c2b4f9` do auth-service tem a origem `http://localhost:4000` no CORS e o esquema montado como subgrafo, tanto num bloco comentado quanto no código ativo (linhas 44 e 58, 160 e 174), e a de `0df228d` do `client/user-app/src/App.jsx` tem o Apollo Client comentado "for the gateway" em `http://localhost:4000/graphql` (linhas 17-19), ao lado do ativo em 4001. A versão de `934af61` do auth-service e a de `9983a55` da user-app não estão no clone. Conclusão, delimitada aos arquivos consultados: nenhum gateway foi versionado no repositório até o snapshot, e o shell aponta para a porta 4001 com o rótulo "Gateway" desde a primeira versão legível; a afirmação não é resto de um gateway que existiu no repositório. O histórico não mostra se o gateway na porta 4000 foi planejado, rodou fora do repositório ou foi abandonado.

## Comandos

```
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project rev-list --count 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project rev-list --count --merges 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project log --format='%h %ad %s' --date=short --name-status --no-renames 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project log --format='%h %p %ad %s' --date=short 59db8c8172c1e0efde31fe32c5135226a41cd044
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 94eaf5d:client/shell-app/vite.config.js    # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:client/shell-app/vite.config.js
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 94eaf5d:client/shell-app/src/main.jsx    # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:client/shell-app/src/main.jsx
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 94eaf5d:client/shell-app/src/App.jsx    # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:client/shell-app/src/App.jsx
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 9983a55:client/user-app/src/App.jsx    # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 934af61:server/microservices/auth-service/auth-microservice.js    # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 934af61:server/package.json
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 8c2b4f9:server/microservices/auth-service/auth-microservice.js
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project show 0df228d:client/user-app/src/App.jsx
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project ls-tree -r 94eaf5d client/shell-app/vite.config.js client/shell-app/src/main.jsx client/shell-app/src/App.jsx    # recusado pelo script (caminho tomado como revisão); sem resultado
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project ls-tree -r 8c2b4f9 client/shell-app/vite.config.js client/shell-app/src/main.jsx client/shell-app/src/App.jsx    # recusado pelo script (caminho tomado como revisão); sem resultado
docs/mfe-history-review/tools/hist.sh riponcc__Group4COMP308Project ls-tree -r 59db8c8172c1e0efde31fe32c5135226a41cd044 client/shell-app/vite.config.js client/shell-app/src/main.jsx client/shell-app/src/App.jsx    # recusado pelo script (caminho tomado como revisão); sem resultado
```

## Resumo

Commits até o snapshot: 8 (2025-11-26 a 2025-12-10). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
