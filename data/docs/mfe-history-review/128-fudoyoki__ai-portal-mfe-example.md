---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
inputs:
  clone: data/samples/mfe-sample-001/repos/fudoyoki__ai-portal-mfe-example
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Leitura do repositório

O histórico até o snapshot tem 9 commits, sem merges, todos de 2026-01-30. O primeiro, `2a87116`
("Initial commit: MFE architecture with Vite + React + Module Federation"), já traz a estrutura
inteira: `package.json` e `turbo.json` da raiz, `apps/shell`, `apps/mfe-dashboard`, `apps/bff`,
`packages/shared-types`, `packages/ui-kit` e o `README.md`. O segundo, `26c3601` ("Add Docker setup
with Alpine images"), cria os três Dockerfiles, os dois `nginx.conf`, o `.dockerignore`, o
`docker-compose.yml` e o `docker-compose.dev.yml`, e altera o `README.md`. Os seis seguintes são
correções curtas: workspaces npm nos `package.json` das apps (`7e48df8`), `exports` dos pacotes
(`1167458`), imports não usados no dashboard (`912587f`), exports de interfaces do BFF (`3ced632`,
`972a03e`) e o `AuthProvider` movido para `main.tsx` (`d0748ce`). O último, `f1fd5b0` ("Docs: update
README with exact step-by-step build and run instructions"), é o snapshot e só altera o `README.md`.

O que está no primeiro commit é primeira presença observável, não introdução: o histórico não mostra
onde o código foi feito antes. Nenhum commit remove arquivo. Os arquivos ligados aos pontos abaixo
têm um único commit no `log` até o snapshot: `package.json`, `turbo.json`, os dois `vite.config.ts`,
`apps/shell/src/vite-env.d.ts`, `apps/shell/src/context/AuthContext.tsx`,
`packages/shared-types/src/index.ts`, `apps/bff/package.json` e `apps/bff/src/main.ts` (`2a87116`), e
`docker-compose.yml`, `docker-compose.dev.yml` e os Dockerfiles (`26c3601`). Ou seja, estão no
snapshot como estavam na primeira presença.

As versões anteriores do `README.md` (`2a87116`, `26c3601`) e do `apps/shell/src/App.tsx` e
`apps/shell/src/main.tsx` (`2a87116`) não estão disponíveis no clone (o `show` falha por objeto
ausente). Não dá para saber, portanto, em qual dos três commits do README entrou cada trecho dele.

Pontos levantados: da 3.4.2, a dependência `turbo` `Undetermined`; da 3.4.4 (Notas), os remotes
comentados, que são a mesma dúvida das afirmações 3 e 6 da 3.4.7; da 3.4.7, as afirmações
`contradita` 5, 16, 18 e 22 e a `parcial` 8. A 3.4.3 não tem unidade `Undetermined`, a 3.4.5 não tem
relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. A afirmação 13 (`parcial`) não virou
ponto: o que falta para corroborá-la é o build gerado pelo plugin, comportamento da ferramenta, não
intenção, resto de estágio ou cópia.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `turbo` tem `turbo.json`, mas só os scripts do `package.json` o invocam | 3.4.2 (package.json:18) | uso de dependência | 2a87116 2026-01-30 Initial commit: MFE architecture with Vite + React + Module Federation; 26c3601 2026-01-30 Add Docker setup with Alpine images | esclarecido |
| 2 | Os remotes Chat, Tools e Admin estão comentados no shell e descritos no README como remotes | 3.4.4 (Notas; apps/shell/vite.config.ts:32-35); 3.4.7 #3, #6 | ativo ou abandonado | 2a87116 2026-01-30 Initial commit: MFE architecture with Vite + React + Module Federation; 26c3601 2026-01-30 Add Docker setup with Alpine images | esclarecido |
| 3 | O README liga as unidades frontend ao BFF, e nenhuma delas o chama | 3.4.7 #5 | ativo ou abandonado | 2a87116 2026-01-30 Initial commit: MFE architecture with Vite + React + Module Federation; d0748ce 2026-01-30 Fix: move AuthProvider to main.tsx so useAuth works in all components; 912587f 2026-01-30 Fix: remove unused imports to pass strict TypeScript checks | esclarecido |
| 4 | O README exige `build` + `preview` do remote, e o `docker-compose.dev.yml` o roda com `npm run dev` | 3.4.7 #8 | estágios em conflito | 26c3601 2026-01-30 Add Docker setup with Alpine images; f1fd5b0 2026-01-30 Docs: update README with exact step-by-step build and run instructions | inconclusivo |
| 5 | O README publica o dashboard em `s3://cdn/mfe-dashboard/`, e o shell o busca em `/mfeDashboard/remoteEntry.js` | 3.4.7 #16 | estágios em conflito | 2a87116 2026-01-30 Initial commit: MFE architecture with Vite + React + Module Federation; 26c3601 2026-01-30 Add Docker setup with Alpine images; f1fd5b0 2026-01-30 Docs: update README with exact step-by-step build and run instructions | inconclusivo |
| 6 | O README cita `sonar-project.properties` em cada app, e o arquivo não existe | 3.4.7 #18 | ativo ou abandonado | 2a87116 2026-01-30 Initial commit: MFE architecture with Vite + React + Module Federation; 26c3601 2026-01-30 Add Docker setup with Alpine images; f1fd5b0 2026-01-30 Docs: update README with exact step-by-step build and run instructions | esclarecido |
| 7 | `shared-types` se diz compartilhado com o BFF, e o BFF não o declara nem importa | 3.4.7 #22 | ativo ou abandonado | 2a87116 2026-01-30 Initial commit: MFE architecture with Vite + React + Module Federation; 3ced632 2026-01-30 Fix: export ChatMessage and ChatSession interfaces from BFF | esclarecido |

## Observações

**1. `turbo` sem invocação fora dos scripts.** O `package.json` e o `turbo.json` da raiz têm um único
commit, `2a87116`: os scripts que delegam a `turbo run` são os mesmos desde a primeira presença. Nenhum
dos 9 commits cria ou remove workflow de CI ou arquivo de script, e nenhum commit remove arquivo. Os
Dockerfiles, que copiam o `turbo.json` e constroem com `npm run build --workspace=...`, foram criados
em `26c3601` e não mudam até o snapshot. Delimitado a esses caminhos, não houve em nenhum commit um
arquivo de automação que invocasse `turbo` e tenha sido apagado. Esclarecido; continua `Undetermined`.

**2. Remotes Chat, Tools e Admin comentados.** O `apps/shell/vite.config.ts`, com as entradas
`mfeChat`, `mfeTools` e `mfeAdmin` comentadas, e o `apps/shell/src/vite-env.d.ts`, com as declarações
de tipo dos três, têm um único commit, `2a87116`; o `docker-compose.yml`, com o serviço `mfe-chat`
comentado, tem só `26c3601`. Nenhum commit cria diretório ou arquivo para Chat, Tools ou Admin, e
nenhum remove arquivo. O `apps/shell/src/App.tsx`, que tem o placeholder `ComingSoon`, muda em
`d0748ce`, mas a versão de `2a87116` não está disponível; a mensagem anuncia só a mudança do
`AuthProvider`. O histórico mostra que os três remotes nunca tiveram código em nenhum commit até o
snapshot e que a configuração comentada está assim desde a primeira presença: são remotes previstos e
nunca conectados, não remotes removidos. Esclarecido.

**3. Unidades frontend sem chamada ao BFF.** O `apps/shell/src/context/AuthContext.tsx`, com o usuário
fictício e os comentários "In real app: redirect to BFF /api/auth/login" e "In real app: call BFF
/api/auth/logout", tem um único commit, `2a87116`: o ponto de autenticação nunca teve outra versão até o
snapshot. Os outros arquivos frontend que mudam são `apps/shell/src/App.tsx` e `main.tsx` (`d0748ce`) e
`apps/mfe-dashboard/src/DashboardApp.tsx` (`912587f`); as versões anteriores não estão disponíveis, e as
mensagens anunciam mover o `AuthProvider` e remover imports não usados. Delimitado ao `AuthContext`, a
ligação com o BFF é uma intenção presente desde a primeira presença, não uma chamada abandonada.
Esclarecido; o conteúdo antigo de `App.tsx`, `main.tsx` e `DashboardApp.tsx` não foi inspecionado.

**4. README com `preview` e compose de desenvolvimento com `npm run dev`.** O `docker-compose.dev.yml`
é criado em `26c3601`, junto com uma alteração do `README.md`, e não muda depois. O README muda de
novo no snapshot, `f1fd5b0`, cuja mensagem anuncia "exact step-by-step build and run instructions". As
versões do README de `2a87116` e `26c3601` não estão disponíveis, e não dá para ver se a exigência de
`build` + `preview` já estava no README quando o compose de desenvolvimento foi criado ou se entrou só
em `f1fd5b0`. Que o README mudou depois do compose não basta para dizer que são estágios diferentes.
Inconclusivo.

**5. Prefixo do CDN no README e no shell.** O `apps/shell/vite.config.ts`, com
`${CDN_URL}/mfeDashboard/remoteEntry.js`, tem um único commit, `2a87116`. O README, com os comandos
`aws s3 sync` para `s3://cdn/mfe-dashboard/`, tem três (`2a87116`, `26c3601`, `f1fd5b0`), e nenhuma
versão anterior está disponível. Não dá para saber em qual commit a seção de deploy para CDN entrou nem
se ela já divergia do shell desde o primeiro commit. Inconclusivo.

**6. `sonar-project.properties` ausente.** O `log` dos caminhos `sonar-project.properties` na raiz e em
`apps/shell`, `apps/mfe-dashboard` e `apps/bff` é vazio, e a lista de arquivos de todos os commits não
tem nenhum arquivo de Sonar; nenhum commit remove arquivo. O arquivo nunca existiu em nenhum commit
até o snapshot, de modo que a menção do README não é resto de uma configuração removida. Em qual dos
três commits do README a seção do SonarQube entrou não se sabe, porque as versões anteriores não estão
disponíveis. Esclarecido, delimitado à existência do arquivo.

**7. `shared-types` e o BFF.** O `packages/shared-types/src/index.ts`, com o comentário "Shared Types
across all MFEs and BFF", e o `apps/bff/package.json` têm um único commit, `2a87116`: o manifesto do
BFF nunca declarou `@ai-portal/shared-types` até o snapshot. O `apps/bff/src/chat/chat.service.ts`, que
redefine `ChatMessage` e `ChatSession`, muda em `3ced632`, cuja mensagem anuncia exportar essas
interfaces do próprio BFF; a versão anterior não foi lida. Delimitado ao manifesto, o compartilhamento
com o BFF é uma intenção do comentário desde a primeira presença, não um uso abandonado. Esclarecido.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example rev-list --count f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --merges --format=%h f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94   # saída vazia: nenhum merge
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --name-status --no-renames --format='@@ %h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- package.json turbo.json
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/vite.config.ts apps/shell/src/vite-env.d.ts docker-compose.yml
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/src/context/AuthContext.tsx apps/shell/src/App.tsx apps/shell/src/main.tsx apps/mfe-dashboard/src
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- packages/shared-types apps/bff/package.json apps/bff/src
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/sonar-project.properties apps/mfe-dashboard/sonar-project.properties apps/bff/sonar-project.properties sonar-project.properties   # saída vazia
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- README.md docker-compose.dev.yml
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example ls-tree 2a87116 -- README.md apps/shell/src/App.tsx apps/shell/src/main.tsx
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example ls-tree 26c3601 -- README.md
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example ls-tree f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- README.md apps/shell/src/App.tsx
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/vite.config.ts
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/src/context/AuthContext.tsx
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- packages/shared-types/src/index.ts
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/bff/package.json
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/mfe-dashboard/vite.config.ts
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example show 2a87116:README.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example show 26c3601:README.md   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example show 2a87116:apps/shell/src/App.tsx   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example show 2a87116:apps/shell/src/main.tsx   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/src/App.tsx
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/src/vite-env.d.ts
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/bff/src/main.ts
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/bff/src/chat/chat.service.ts
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/shell/Dockerfile
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/mfe-dashboard/Dockerfile
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --format='%h %ad %s' --date=short f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94 -- apps/mfe-dashboard/package.json
docs/mfe-history-review/tools/hist.sh fudoyoki__ai-portal-mfe-example log --name-status --no-renames --diff-filter=D --format='@@ %h' f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94   # saída vazia: nenhuma remoção
```

## Resumo

Commits até o snapshot: 9 (2026-01-30 a 2026-01-30). Pontos: 7 (esclarecido: 5, inconclusivo: 2, resolvido pelo snapshot: 0).
