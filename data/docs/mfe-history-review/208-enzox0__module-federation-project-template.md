---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
inputs:
  clone: data/samples/mfe-sample-001/repos/enzox0__module-federation-project-template
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Leitura do repositório

O histórico até o snapshot tem 60 commits, todos de 2026-05-29, sem merges. O primeiro é `d503356` ("chore: initialize project with root package configuration") e o do snapshot é `b3c96cb` ("docs: add Quick Start and Running guides for module federation setup"). O projeto entra arquivo a arquivo, por pasta: depois da configuração da raiz vêm o `README.md` (`76d4857`, "docs: add comprehensive README with architecture and setup guide", o 7.º commit a partir do primeiro), a configuração do monorepo (`73d3333`), as cinco aplicações (admin-mf, auth-mf, dashboard-mf, messaging-mf e shell, de `4c4be4f` a `cd99281`), a infraestrutura (`de055a2` a `ed07d0d`), os pacotes de `packages/` (`2521e23` a `cc32c75`), os scripts (`785290a`), os workflows (`4db3303`) e, por último, os dois guias de `.docs/` (`b3c96cb`).

Em todo o histórico, só um arquivo é alterado depois de criado: o `.gitignore`, em `94411bf` ("chore(.gitignore): add VS Code configuration directory to ignore list"). Nenhum arquivo é removido ou renomeado (`log --diff-filter=MDR`). Cada arquivo do snapshot tem, portanto, uma única versão, a do commit que o cria, e essa versão é a que as revisões leram. Cada artefato tem um commit de introdução, mas tudo entra no mesmo dia, e o histórico não mostra onde nem em que ordem o código foi escrito antes de ser versionado. A ordem dos commits só diz em que ordem os arquivos foram adicionados ao repositório.

As revisões 3.4.2 a 3.4.6 não deixaram dependência sem uso, unidade, construção, relação ou deploy `Undetermined`. Os pontos vêm do `module-federation.config.js` obsoleto do shell, citado na 3.4.5, e das seis afirmações `contradita` da 3.4.7.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O `module-federation.config.js` do shell aponta os remotes para as portas 3004 a 3007 sem o prefixo `/dist`, e o guia dá o `remoteEntry.js` sem `/dist`, enquanto o `.ts` usa 3001 a 3004 com `/dist` | 3.4.5 (Leitura); 3.4.7 #6 | estágios em conflito | 7e00cd3 2026-05-29 chore(shell): add module federation configuration; b3c96cb 2026-05-29 docs: add Quick Start and Running guides for module federation setup | esclarecido |
| 2 | O README chama o template de "production-ready", e o CD, o Kubernetes e o Terraform são placeholders, com URLs `localhost` no shell | 3.4.7 #8 | estágios em conflito | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 7e00cd3 2026-05-29 chore(shell): add module federation configuration; a158918 2026-05-29 chore(kubernetes): add placeholder Kubernetes configurations for module federation apps; 599d40d 2026-05-29 chore(kubernetes): add shell Kubernetes configuration placeholder; ed07d0d 2026-05-29 chore(infrastructure): add Terraform configuration placeholders; 785290a 2026-05-29 chore(scripts): add project automation scripts; 4db3303 2026-05-29 ci: add GitHub Actions workflows for CI/CD and linting | esclarecido |
| 3 | O README descreve pacotes compartilhados importados pelas aplicações, que os declaram e não os importam | 3.4.7 #9 | uso de dependência | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 23b3cd7 2026-05-29 feat(admin-mf): add build and TypeScript configuration; b51dc85 2026-05-29 feat(auth-mf): add build and TypeScript configuration; 5c843e2 2026-05-29 feat(dashboard-mf): add Vite configuration and TypeScript setup; 4187380 2026-05-29 chore(messaging-mf): add Docker and configuration setup; 31ac7bf 2026-05-29 chore(shell): add build configuration and dependencies; cefcdba 2026-05-29 chore(sdk): add package configuration and TypeScript setup; 6437f4e 2026-05-29 chore(shared): add package configuration and TypeScript setup; 40908b4 2026-05-29 chore(types): add package configuration and TypeScript setup; b5a45f8 2026-05-29 chore(ui): add package configuration and TypeScript setup | esclarecido |
| 4 | O diagrama do README põe um Nginx de proxy reverso à frente do shell, e o `nginx.conf` só serve arquivos estáticos | 3.4.7 #10 | estágios em conflito | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; de055a2 2026-05-29 chore(shell): add Docker configuration for development and production; 4da0ea3 2026-05-29 chore(infrastructure): add nginx configuration for module federation app | esclarecido |
| 5 | O README promete deploy sem reconstruir a aplicação inteira, e cada Dockerfile constrói o workspace todo | 3.4.7 #14 | estágios em conflito | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 4c4be4f 2026-05-29 chore(admin-mf): add Docker and HTML entry point configuration; 264b5f2 2026-05-29 chore(auth-mf): add Docker and HTML entry point configuration; 452d4f3 2026-05-29 chore(dashboard-mf): add Docker and HTML entry point configuration; 4187380 2026-05-29 chore(messaging-mf): add Docker and configuration setup; adc6f0f 2026-05-29 chore(shell): add Docker and configuration setup | esclarecido |
| 6 | O README diz que o build constrói primeiro os pacotes compartilhados, que não têm script `build` | 3.4.7 #17 | estágios em conflito | 76d4857 2026-05-29 docs: add comprehensive README with architecture and setup guide; 73d3333 2026-05-29 chore: add build and monorepo configuration; cefcdba 2026-05-29 chore(sdk): add package configuration and TypeScript setup; 6437f4e 2026-05-29 chore(shared): add package configuration and TypeScript setup; 40908b4 2026-05-29 chore(types): add package configuration and TypeScript setup; b5a45f8 2026-05-29 chore(ui): add package configuration and TypeScript setup | esclarecido |

## Observações

**1. Configuração `.js` obsoleta do shell e caminho sem `/dist`.** `apps/shell/module-federation.config.js` e `apps/shell/module-federation.config.ts` entram juntos em `7e00cd3` e nunca mudam até o snapshot. O `.js`, com as portas 3004 a 3007 e sem `/dist`, e o `.ts`, com 3001 a 3004 e `/dist`, já divergem no commit em que aparecem: o histórico do repositório não tem um estágio em que o `.js` fosse a única configuração ou em que os dois coincidissem. `.docs/RUNNING.md`, com o exemplo `http://localhost:3001/assets/remoteEntry.js`, é criado no último commit, `b3c96cb`, depois das duas configurações, e também não muda. O histórico não mostra qual dos dois arquivos de configuração foi gerado antes, fora do repositório, nem de onde veio o caminho do guia. Conclusão, para os arquivos consultados: a divergência não é resto de um estágio anterior observável no repositório; as três versões convivem desde que foram adicionadas.

**2. "production-ready" e infraestrutura de placeholder.** O README entra em `76d4857`, antes de qualquer aplicação ou arquivo de infraestrutura, e nunca muda. Os manifestos Kubernetes (`a158918`, `599d40d`), o Terraform (`ed07d0d`), os scripts, incluindo `scripts/deploy.sh` (`785290a`), e os workflows, incluindo `cd.yml` (`4db3303`), entram depois, e as mensagens já os anunciam como "placeholder" no caso do Kubernetes e do Terraform. Nenhum deles é alterado ou removido, então o conteúdo de placeholder e o `echo` do CD são os da criação. As URLs `localhost` do shell estão em `module-federation.config.ts` desde `7e00cd3`, também sem mudança. Não houve, no repositório, uma infraestrutura de produção que tenha sido retirada depois. O histórico não mostra se havia uma fora dele. Conclusão: a afirmação e o esqueleto convivem desde a criação; a afirmação antecede, na ordem dos commits, os artefatos que a contradizem, e eles nunca foram completados.

**3. Pacotes compartilhados declarados e não importados.** Os `package.json` das cinco aplicações, que declaram `@mf/ui`, `@mf/shared`, `@mf/types` e `@mf/sdk`, entram em `23b3cd7`, `b51dc85`, `5c843e2`, `4187380` e `31ac7bf` e não mudam. Os arquivos de `apps/*/src` entram nos commits de bootstrap e de "barrel export" de cada aplicação (por exemplo `bca7121`, `2137978`, `89b3016`, `03d38b4`, `2817bb1`) e também nunca são alterados nem removidos. Como nenhum arquivo além do `.gitignore` muda em todo o histórico, a versão de cada arquivo de `apps/*/src` lida na 3.4.4, sem import de `packages/*`, é a única que existiu: em nenhum commit até o snapshot uma aplicação importou um pacote compartilhado. Os pacotes entram depois das aplicações (`cefcdba`, `6437f4e`, `40908b4`, `b5a45f8`). Conclusão: as dependências de workspace foram declaradas desde a criação das aplicações e nunca conectadas; não há desconexão posterior.

**4. Nginx como proxy reverso.** `infrastructure/nginx/nginx.conf` entra em `4da0ea3` e nunca muda, então nunca teve outra versão além da de arquivos estáticos com fallback lida na 3.4.6. O Dockerfile de produção do shell, que o usa, entra em `de055a2`, também sem mudança. O diagrama com o "Reverse Proxy" está no README desde `76d4857`, antes desses dois arquivos. Conclusão: o proxy reverso descrito nunca existiu no repositório; a descrição antecede a configuração e não foi revista.

**5. Deploy sem reconstruir o resto.** Os cinco Dockerfiles das aplicações entram em `4c4be4f`, `264b5f2`, `452d4f3`, `4187380` e `adc6f0f` e nunca mudam. A versão que roda `pnpm build` no workspace inteiro é a única que existiu: não houve, no repositório, um Dockerfile que construísse só a própria aplicação. O README com a promessa está em `76d4857`, antes deles. Conclusão: a promessa e o build do workspace inteiro convivem desde a criação; não são estágios diferentes.

**6. Build dos pacotes compartilhados primeiro.** Os `package.json` de `packages/sdk`, `packages/shared`, `packages/types` e `packages/ui` entram em `cefcdba`, `6437f4e`, `40908b4` e `b5a45f8` e nunca mudam: em nenhum commit eles tiveram script `build`. O `turbo.json`, com a dependência `^build`, entra em `73d3333` e também não muda. O README com "Builds all shared packages first" está em `76d4857`, antes dos pacotes. Conclusão: o passo descrito nunca teve script correspondente no repositório; o texto antecede os pacotes e não foi ajustado a eles.

## Comandos

```
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template rev-list --count b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status --diff-filter=MDR b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --merges --format=%h b3c96cb653137038838f32097018cf8f8182b9f2
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- apps/shell/module-federation.config.js apps/shell/module-federation.config.ts .docs/RUNNING.md apps/auth-mf/package.json packages/ui/package.json infrastructure/nginx/nginx.conf README.md
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- apps/admin-mf/package.json apps/dashboard-mf/package.json apps/messaging-mf/package.json apps/shell/package.json apps/auth-mf/src apps/admin-mf/src apps/dashboard-mf/src apps/messaging-mf/src apps/shell/src
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- packages/sdk/package.json packages/shared/package.json packages/types/package.json packages/ui/package.json
docs/mfe-history-review/tools/hist.sh enzox0__module-federation-project-template log --format='%h %ad %s' --date=short --name-status b3c96cb653137038838f32097018cf8f8182b9f2 -- apps/admin-mf/Dockerfile apps/auth-mf/Dockerfile apps/dashboard-mf/Dockerfile apps/messaging-mf/Dockerfile apps/shell/Dockerfile infrastructure .github scripts turbo.json package.json .docs
```

## Resumo

Commits até o snapshot: 60 (2026-05-29 a 2026-05-29). Pontos: 6 (esclarecido: 6, inconclusivo: 0, resolvido pelo snapshot: 0).
