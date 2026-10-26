---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Leitura do repositório

Prova de conceito com dois workspaces Angular independentes, `host` e `remote`, sem workspace que os agrupe; a raiz do snapshot tem só `.gitignore`, `README.md` (uma linha de título, README.md:1) e as duas pastas. Cada workspace tem seu `package.json` com os scripts padrão do Angular CLI, `start: ng serve` e `build: ng build` (host/package.json:6-7; remote/package.json:6-7), e seu `angular.json` com um único projeto. Nos dois, o alvo `build` usa o builder `@angular-architects/native-federation:build` sobre o alvo `esbuild` (`@angular/build:application`), com configuração padrão `production` (host/angular.json:16-29, 57-58; remote/angular.json:16-31, 58-59). O `outputPath` não é declarado, então cada build sai no `dist/` do próprio workspace, como dizem os READMEs gerados pelo CLI (host/README.md:34-37; remote/README.md:34-37).

Não há Dockerfile, compose, workflow de CI, configuração de hospedagem nem script de publicação no snapshot, e o `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. O que existe para executar as aplicações é de desenvolvimento: o `serve` de cada workspace envolve o dev-server do Angular (`serve-original`, `@angular/build:dev-server`) nas portas 4200 e 4201 (host/angular.json:30-37, 99-112; remote/angular.json:32-35, 96-109), e as tarefas do VS Code só rodam `npm start` (host/.vscode/tasks.json:5-7). O host aponta o remote para `http://localhost:4201/remoteEntry.json` (host/src/main.ts:3-5), isto é, para o dev-server do remote.

Há um acoplamento de build no nível do CSS: o Tailwind do host varre também os templates do remote (host/src/styles.css:3-4) para gerar as classes que eles usam quando montados no host. Isso não põe o código do remote no artefato do host; só as classes CSS geradas a partir dele. O build do host depende, porém, de o diretório `remote/src` estar presente ao lado.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | host | separado | não observado | `http://localhost:4200` (host/angular.json:111) | No | host/angular.json:16-29 (alvo `build` com Native Federation sobre `esbuild`); host/angular.json:57-98 (alvo `esbuild`, `@angular/build:application`); host/package.json:7 (`ng build`); host/src/styles.css:3-4 (Tailwind varre o próprio código e o do remote) |
| 2 | remote | separado | não observado | `http://localhost:4201` (remote/angular.json:108); `http://localhost:4201/remoteEntry.json`, consumido pelo host (host/src/main.ts:4) | No | remote/angular.json:16-31 (alvo `build` com Native Federation sobre `esbuild`); remote/angular.json:58-95 (alvo `esbuild`, `@angular/build:application`); remote/package.json:7 (`ng build`) |

## Observações

**1. host.** Build próprio, no workspace dele, que gera um artefato só do host em `host/dist/`. A geração de CSS inclui as classes dos templates do remote (host/src/styles.css:4), mas o código do remote continua fora desse artefato e é carregado em tempo de execução pelo `remoteEntry.json` (host/src/main.ts:3-5). O deploy é `não observado`: a única forma de servir o host no snapshot é o dev-server na porta 4200 (host/angular.json:99-112). A versão `0.0.0` do pacote privado (host/package.json:3, 21) não é usada em publicação.

**2. remote.** Build próprio, no workspace dele, com o mesmo arranjo do host (remote/angular.json:16-31, 58-59). O deploy é `não observado` pelo mesmo motivo: o remote só é servido pelo dev-server na porta 4201 (remote/angular.json:96-109), que é o endereço que o host fixa para o `remoteEntry.json` (host/src/main.ts:4). A versão `0.0.0` do pacote privado (remote/package.json:3, 21) não é usada em publicação.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
