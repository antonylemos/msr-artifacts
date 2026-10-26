---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
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

# 343 — Jonadersonmoura/descompara

## Leitura do repositório

Workspace Nx único com quatro aplicações Angular (`shell` e os remotes `admin`, `intranet` e `marAberto`) e bibliotecas em `libs/shared/`. O `package.json` da raiz não tem scripts (package.json:5); os builds são targets Nx nos `project.json` de cada aplicação. Nas quatro, o target `build` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild` (`@angular/build:application`), com configuração padrão `production`, e cada `esbuild` grava num diretório próprio: `dist/shell`, `dist/admin`, `dist/intranet` e `dist/marAberto` (shell/project.json:9-24, 63-70; admin/project.json:9-24, 72-79; intranet/project.json:9-24, 72-79; marAberto/project.json:9-24, 72-79). O README mostra o build de uma aplicação por vez ou das quatro com `run-many` (README.md:86-87).

O único artefato de CI é o workflow `.github/workflows/ci.yml`, que em push na `main` e em pull requests instala as dependências e roda `npx nx run-many -t lint test build typecheck e2e` sobre todos os projetos (.github/workflows/ci.yml:3-7, 33, 37), com distribuição de tarefas pelo Nx Cloud (.github/workflows/ci.yml:25). Ele constrói e testa, mas não empacota nem publica nada: não há passo de upload, imagem ou deploy. As duas ocorrências `ci-*` do `matches.csv` (`ci-workflow-file` e `ci-monorepo-tooling` em .github/workflows/ci.yml:37) apontam para esse arquivo; não há ocorrências `ops-*` nem `cfg-public-path`.

Não há Dockerfile, compose, manifesto de deploy, configuração de hospedagem nem script de publicação no snapshot. O que existe para servir as aplicações é de desenvolvimento: o `serve` de cada uma envolve o dev-server do Nx (`serve-original`, `@nx/angular:dev-server`) nas portas 4200 a 4203 (shell/project.json:117-124; admin/project.json:126-133; intranet/project.json:126-133; marAberto/project.json:126-133), e o `serve-static` (`@nx/web:file-server`) serve o build localmente nas mesmas portas (shell/project.json:54-62; admin/project.json:54-62). O README manda subir os quatro dev-servers em terminais separados (README.md:66-73). Os testes e2e do shell sobem o próprio dev-server do shell (shell-e2e/playwright.config.mts:33-37). O manifesto de federação, copiado para o build do shell como asset de `shell/public` (shell/project.json:74-79), fixa os remotes em `http://localhost:4201` a `4203` (shell/public/federation.manifest.json:2-4), isto é, nos dev-servers.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | admin | separado | não observado | `http://localhost:4203` (admin/project.json:132); `http://localhost:4203/remoteEntry.json`, consumido pelo shell (shell/public/federation.manifest.json:2) | No | admin/project.json:9-24 (target `build` com Native Federation sobre `esbuild`); admin/project.json:72-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/admin`); .github/workflows/ci.yml:37 (CI roda o `build` de todos os projetos) |
| 2 | intranet | separado | não observado | `http://localhost:4202` (intranet/project.json:132); `http://localhost:4202/remoteEntry.json`, consumido pelo shell (shell/public/federation.manifest.json:3) | No | intranet/project.json:9-24 (target `build` com Native Federation sobre `esbuild`); intranet/project.json:72-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/intranet`); .github/workflows/ci.yml:37 (CI roda o `build` de todos os projetos) |
| 3 | marAberto | separado | não observado | `http://localhost:4201` (marAberto/project.json:132); `http://localhost:4201/remoteEntry.json`, consumido pelo shell (shell/public/federation.manifest.json:4) | No | marAberto/project.json:9-24 (target `build` com Native Federation sobre `esbuild`); marAberto/project.json:72-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/marAberto`); .github/workflows/ci.yml:37 (CI roda o `build` de todos os projetos) |
| 4 | shell | separado | não observado | `http://localhost:4200` (shell/project.json:123) | No | shell/project.json:9-24 (target `build` com Native Federation sobre `esbuild`); shell/project.json:63-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/shell`, com `shell/public` como asset); .github/workflows/ci.yml:37 (CI roda o `build` de todos os projetos) |

## Observações

**1. admin.** Build próprio pelo target Nx do projeto, que gera um artefato só do admin em `dist/admin` (admin/project.json:9-24, 72-79); o código das bibliotecas de `libs/shared/` entra nesse artefato como dependência, não como outra aplicação. O CI executa esse build junto com o dos demais projetos (.github/workflows/ci.yml:37), mas executar builds não é publicar, e nenhum artefato do snapshot empacota ou publica o `dist/admin`: Deploy `não observado`. O endereço registrado é o do dev-server, porta 4203 (admin/project.json:130-133), o mesmo que o manifesto do shell usa para o `remoteEntry.json` (shell/public/federation.manifest.json:2). Não há `package.json` próprio nem versão usada em publicação.

**2. intranet.** Mesmo arranjo do admin: build próprio em `dist/intranet` (intranet/project.json:9-24, 72-79), executado pelo CI com os demais (.github/workflows/ci.yml:37), sem artefato de deploy. Servido só pelo dev-server na porta 4202 (intranet/project.json:130-133), endereço do manifesto do shell (shell/public/federation.manifest.json:3). Sem versão própria.

**3. marAberto.** Mesmo arranjo: build próprio em `dist/marAberto` (marAberto/project.json:9-24, 72-79), executado pelo CI com os demais (.github/workflows/ci.yml:37), sem artefato de deploy. Servido só pelo dev-server na porta 4201 (marAberto/project.json:130-133), endereço do manifesto do shell (shell/public/federation.manifest.json:4). Sem versão própria.

**4. shell.** Build próprio em `dist/shell` (shell/project.json:9-24, 63-70). O artefato leva o manifesto de federação como asset (shell/project.json:74-79), mas não o código dos remotes, que é buscado em tempo de execução nas URLs do manifesto (shell/src/main.ts:3; shell/public/federation.manifest.json:2-4). Como essas URLs apontam para `localhost`, o build do shell só compõe com os remotes rodando nos dev-servers locais; publicá-lo exigiria trocar o manifesto, o que o snapshot não faz. Deploy `não observado`: só o dev-server na porta 4200 (shell/project.json:117-124) e o `serve-static` local (shell/project.json:54-62). Sem versão própria; a versão `0.0.0` do `package.json` da raiz (package.json:3) é do workspace privado e não é usada em publicação.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
