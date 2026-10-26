---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Leitura do repositório

Tutorial de micro frontends em Angular com Native Federation. São três projetos Angular irmãos na raiz, sem manifesto nem workspace comum: o host `test-base` e os remotes `tea-tracker` e `sticky-notes`. Cada um tem seu `package.json`, lockfile e `angular.json`, e os três `angular.json` são iguais exceto pelo nome do projeto e pela porta. O alvo `build` usa o builder `@angular-architects/native-federation:build` sobre o alvo `esbuild` do próprio projeto, com configuração `production` por padrão (test-base/angular.json:16-29). O alvo `esbuild` é o `@angular/build:application`, com entrada `src/main.ts` e otimização de produção (`outputHashing: all`) (test-base/angular.json:43-84). Os scripts de cada pacote são os gerados pelo Angular CLI: `start` roda `ng serve` e `build` roda `ng build` (test-base/package.json:4-9; tea-tracker/package.json:4-9; sticky-notes/package.json:4-9). O resultado iria para `dist/`, que cada projeto ignora no git (test-base/.gitignore:4).

Não há artefato de deploy no snapshot: nem Dockerfile, nem compose, nem CI, nem configuração de hospedagem, e o `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. As pastas `.vscode` só trazem tarefas de editor que rodam `npm start` (test-base/.vscode/tasks.json:5-7). O `serve` é um servidor de desenvolvimento, nas portas 4200, 4222 e 4333 (test-base/angular.json:85-98; tea-tracker/angular.json:96-97; sticky-notes/angular.json:96-97). O host resolve os remotes por um manifesto de federação copiado como asset (test-base/angular.json:48-53), que aponta para `http://localhost:4222/remoteEntry.json` e `http://localhost:4333/remoteEntry.json` (test-base/public/federation.manifest.json:2-3). A composição, portanto, só funciona com os três servidores de desenvolvimento no ar. O README apresenta a implantação independente como vantagem da arquitetura e promete "two independently deployable micro frontends" (README.md:45-47; README.md:88), mas o passo a passo é todo local, com `ng serve --port 4222` (README.md:197-208). Isso é documentação, não artefato de deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | sticky-notes | separado | não observado | `http://localhost:4333` em desenvolvimento (sticky-notes/angular.json:96-97); `remoteEntry.json` nessa origem, esperado pelo host (test-base/public/federation.manifest.json:3) | No | sticky-notes/angular.json:16-29 (alvo `build` com native-federation); sticky-notes/angular.json:43-84 (alvo `esbuild`, `@angular/build:application`); sticky-notes/package.json:7 (`ng build`) |
| 2 | tea-tracker | separado | não observado | `http://localhost:4222` em desenvolvimento (tea-tracker/angular.json:96-97); `remoteEntry.json` nessa origem, esperado pelo host (test-base/public/federation.manifest.json:2) | No | tea-tracker/angular.json:16-29 (alvo `build` com native-federation); tea-tracker/angular.json:43-84 (alvo `esbuild`, `@angular/build:application`); tea-tracker/package.json:7 (`ng build`) |
| 3 | test-base | separado | não observado | `http://localhost:4200` em desenvolvimento (test-base/angular.json:96-97) | No | test-base/angular.json:16-29 (alvo `build` com native-federation); test-base/angular.json:43-84 (alvo `esbuild`, copia `public/` com o manifesto de federação); test-base/package.json:7 (`ng build`) |

## Observações

**1. sticky-notes.** Build separado: projeto Angular próprio, cujo `ng build` gera um artefato só dele (sticky-notes/package.json:7; sticky-notes/angular.json:16-29), com o `remoteEntry.json` que expõe `./App` (sticky-notes/federation.config.js:4-8). Não empacota código das outras aplicações. Sem deploy observado: o único endereço é o do servidor de desenvolvimento na porta 4333, que o manifesto do host repete. A versão `0.0.0` (sticky-notes/package.json:3) não é usada em publicação, e o pacote é `private` (sticky-notes/package.json:23).

**2. tea-tracker.** Mesmo arranjo do sticky-notes, na porta 4222, expondo `./App` (tea-tracker/federation.config.js:4-8). Build separado, sem deploy observado. Versão `0.0.0` (tea-tracker/package.json:3) sem uso na publicação; pacote `private` (tea-tracker/package.json:23).

**3. test-base.** Host com build próprio (test-base/package.json:7; test-base/angular.json:16-29). Não inclui o código dos remotes: carrega-os em tempo de execução pelas URLs de localhost do manifesto, que entra no build como asset de `public/` (test-base/angular.json:48-53; test-base/public/federation.manifest.json:2-3). Para publicar o host fora do ambiente local seria preciso trocar essas URLs, e nada no snapshot faz isso. Sem deploy observado. Versão `0.0.0` (test-base/package.json:3) sem uso na publicação; pacote `private` (test-base/package.json:23).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
