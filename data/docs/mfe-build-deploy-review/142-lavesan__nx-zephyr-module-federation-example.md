---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
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

# 142 — lavesan/nx-zephyr-module-federation-example

## Leitura do repositório

Monorepo pnpm/Nx de demonstração com três aplicações React construídas com Rsbuild: o host `apps/shell` e os remotes `apps/courses` e `apps/profile` (README.md:9-29). Cada aplicação tem um target Nx `build` que roda `pnpm build` no próprio diretório (apps/shell/project.json:7-13; apps/courses/project.json:7-13; apps/profile/project.json:7-13), e esse script é `rsbuild build` (apps/shell/package.json:7; apps/courses/package.json:7; apps/profile/package.json:7). Cada `rsbuild.config.ts` gera a saída em `dist` dentro da aplicação (apps/shell/rsbuild.config.ts:10-21, idem nas outras duas). O `build` da raiz só dispara os três targets com `nx run-many` (package.json:6). O `nx.json` registra o plugin `@nx/js/typescript` com um target de build baseado em `tsconfig.lib.json` (nx.json:8-22), que não existe no snapshot; os builds das aplicações vêm dos `project.json`.

Os três `rsbuild.config.ts` usam o `ZephyrRsbuildPlugin` do pacote local `packages/zephyr-rsbuild-plugin` (apps/shell/rsbuild.config.ts:3, 29), que aplica `withZephyr` do `zephyr-rspack-plugin` à configuração do bundler antes da compilação (packages/zephyr-rsbuild-plugin/src/index.ts:2, 7-10). O pacote é privado e não tem publicação (packages/zephyr-rsbuild-plugin/package.json:34). O snapshot não tem nenhuma outra configuração da Zephyr, então o que esse plugin faz com o resultado do build não se observa aqui; ele não decide nenhuma coluna da tabela.

O deploy é na Vercel, com três configurações de hospedagem, uma por aplicação. O `vercel.json` da raiz instala o workspace, roda `npx nx build shell` e publica `apps/shell/dist` (vercel.json:2-3). Os de `apps/courses` e `apps/profile` sobem para a raiz, rodam `npx nx build courses` e `npx nx build profile` e publicam `dist` (apps/courses/vercel.json:2-3; apps/profile/vercel.json:2-3), o que pressupõe projetos Vercel com diretório raiz na própria aplicação, configuração que fica fora do snapshot. Os três declaram `framework: "vite"`, embora o build seja Rsbuild, e reescrevem todas as rotas para `/index.html` (vercel.json:4-10; apps/courses/vercel.json:4-10; apps/profile/vercel.json:4-10). O host aponta, fora de desenvolvimento, para domínios Vercel próprios de cada remote, a menos que `VITE_COURSES_URL`/`VITE_PROFILE_URL` sejam definidas (apps/shell/module-federation.config.ts:7-15), o que é coerente com publicações independentes. O README também diz que cada aplicação tem deploy separado na Vercel e dá o endereço do shell (README.md:95-101), mas isso é documentação. Não há CI, Dockerfile nem compose no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/courses | separado | separado | https://nx-zephyr-module-federation-example-courses.vercel.app (apps/shell/module-federation.config.ts:10); `http://localhost:3001` em desenvolvimento (apps/courses/rsbuild.config.ts:8) | No | apps/courses/rsbuild.config.ts:10-21 (saída própria em `dist`); apps/courses/package.json:7 (`rsbuild build`); apps/courses/project.json:7-13 (target `build`); apps/courses/vercel.json:2-3 (deploy Vercel próprio, `npx nx build courses`, publica `dist`) |
| 2 | apps/profile | separado | separado | https://nx-zephyr-module-federation-example-profile.vercel.app (apps/shell/module-federation.config.ts:15); `http://localhost:3002` em desenvolvimento (apps/profile/rsbuild.config.ts:8) | No | apps/profile/rsbuild.config.ts:10-21 (saída própria em `dist`); apps/profile/package.json:7 (`rsbuild build`); apps/profile/project.json:7-13 (target `build`); apps/profile/vercel.json:2-3 (deploy Vercel próprio, `npx nx build profile`, publica `dist`) |
| 3 | apps/shell | separado | separado | `http://localhost:3000` em desenvolvimento (apps/shell/rsbuild.config.ts:8) | No | apps/shell/rsbuild.config.ts:10-21 (saída própria em `dist`); apps/shell/package.json:7 (`rsbuild build`); apps/shell/project.json:7-13 (target `build`); vercel.json:2-3 (deploy Vercel da raiz, `npx nx build shell`, publica `apps/shell/dist`) |

## Observações

**1. apps/courses.** Build próprio: o Rsbuild gera `apps/courses/dist` com o `remoteEntry.js` declarado em apps/courses/module-federation.config.ts:5-9. Deploy separado: apps/courses/vercel.json:2-3 constrói só o projeto `courses` e publica só a sua saída. O endereço de produção vem da URL padrão que o host usa para o remote (apps/shell/module-federation.config.ts:9-10); o snapshot não registra o domínio no próprio deploy, e a variável `VITE_COURSES_URL` pode trocá-lo. A versão `0.0.0` (apps/courses/package.json:3) não é usada na publicação.

**2. apps/profile.** Mesma forma de courses: build Rsbuild próprio, com `remoteEntry.js` (apps/profile/module-federation.config.ts:5-9), e deploy Vercel próprio que constrói e publica só `profile` (apps/profile/vercel.json:2-3). O endereço de produção é a URL padrão do host para o remote (apps/shell/module-federation.config.ts:14-15), substituível por `VITE_PROFILE_URL`. A versão `0.0.0` (apps/profile/package.json:3) não é usada na publicação.

**3. apps/shell.** Build próprio e deploy separado pelo `vercel.json` da raiz, que constrói só o shell e publica `apps/shell/dist` (vercel.json:2-3). Os remotes não entram nesse artefato: o shell os carrega em tempo de execução pelas URLs de apps/shell/module-federation.config.ts:20-23. O único endereço público do shell está no README (README.md:5, 99), que não é artefato, por isso "Onde é servida" registra só a porta de desenvolvimento; o nome desse domínio (`nx-zephyr-module-federation-shell`) não segue o padrão dos domínios dos remotes (`nx-zephyr-module-federation-example-<nome>`). A versão `1.0.0` (apps/shell/package.json:3) não é usada na publicação.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (separado: 3). Versionamento independente: 0.
