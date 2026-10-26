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

A documentação do projeto é o README da raiz, em inglês. Ele apresenta o repositório como demonstração de micro-frontends com Module Federation num monorepo Nx com Zephyr (README.md:1-3), descreve as três aplicações, o shell como host e courses e profile como remotes (README.md:9-29), lista a pilha de tecnologias (README.md:31-79), traz um diagrama mermaid da arquitetura (README.md:85-93), a seção de deploy na Vercel (README.md:95-101), instruções de execução (README.md:103-127), a árvore de pastas comentada (README.md:129-140) e uma lista de recursos (README.md:142-149). Os READMEs de `apps/courses`, `apps/profile`, `apps/shell` e `packages/zephyr-rsbuild-plugin` são templates das ferramentas ("# Rsbuild project", apps/courses/README.md:1 e apps/shell/README.md:1; "# Rspack project", com comandos `npm`, apps/profile/README.md:1, 8; "# Rslib project", packages/zephyr-rsbuild-plugin/README.md:1), só com instruções de instalação e build, sem afirmação sobre o projeto.

O que o README diz confere, quase todo, com as revisões anteriores: três aplicações React com Rsbuild (3.4.3), o shell carregando os dois remotes por Module Federation em rotas (3.4.4; 3.4.5 #1, #2), `react` e `react-dom` compartilhados e um deploy Vercel para cada aplicação (3.4.6 #1-#3). As exceções são a "Shared component library" (afirmação 7), que o snapshot não tem, o endereço do Live Demo (afirmação 2), que só aparece no README, e a otimização da federação atribuída à Zephyr (afirmação 8), cujo efeito não se observa no snapshot.

Ficaram fora da tabela:
- a frase "This project showcases how to build scalable, modular web applications using cutting-edge technologies" (README.md:3), genérica;
- as descrições das unidades que tratam de negócio ou aparência: "Modern header with responsive design" (README.md:16), as listas de courses (README.md:20-23) e de profile (README.md:26-29);
- as descrições genéricas das tecnologias, que não falam do projeto: Nx "Monorepo management / Efficient build system / Smart caching / Project dependency graph" (README.md:37-40), Rsbuild/Rspack "Next-generation build tool / Fast compilation / Built-in optimizations" (README.md:58-60), Biome (README.md:63-66), React (README.md:72-74) e TypeScript (README.md:76-79). As versões citadas conferem com os manifestos: Nx 20.7.2 (README.md:35; package.json:13, 17) e React 19.1.0 (README.md:70; apps/shell/package.json:15-16);
- os recursos que não são arquiteturais: "Type Safety", "Modern UI" e "Hot Module Replacement (HMR) support" (README.md:146-147, 149);
- as instruções de clonagem, instalação e execução (README.md:103-121) e as portas de desenvolvimento (README.md:123-127), que conferem com apps/shell/rsbuild.config.ts:8, apps/courses/rsbuild.config.ts:8 e apps/profile/rsbuild.config.ts:8; o nome da raiz na árvore, `nx-module-federation-with-zephyr/` (README.md:132), é o `name` de package.json:2;
- as seções "Contributing" e "License" (README.md:151-157).

Ocorrências `doc-*`: README.md:1 é o título; README.md:3 está na afirmação 1, e README.md:47 e 83 a repetem; README.md:9 está na 3; README.md:42 na 6; README.md:52 na 8; README.md:61 na 9; README.md:100 e 101 repetem a 5.

Foram lidos os artefatos que as revisões anteriores citam: os quatro `package.json` das aplicações e do plugin (sem `description`) e o da raiz, `nx.json`, `pnpm-workspace.yaml`, os três `module-federation.config.ts`, `rsbuild.config.ts`, `project.json` e `vercel.json`, os `src/index.tsx` e `src/bootstrap.tsx`, apps/shell/src/App.tsx, apps/shell/src/components/Header.tsx, apps/shell/src/remotes.d.ts, os `App.tsx` dos remotes e packages/zephyr-rsbuild-plugin/src/index.ts. O comentário "// Lazy load the remote modules" (apps/shell/src/App.tsx:5) repete a afirmação 13. O plugin guarda, comentada, uma versão anterior do gancho que aplica `withZephyr` (packages/zephyr-rsbuild-plugin/src/index.ts:11-15), sem afirmação. Os `vercel.json` e o `nx.json` não têm comentários.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A modern micro-frontend architecture demonstration using Module Federation, built with Nx monorepo and Zephyr." | estrutura | corroborada | 3.4.2 (`nx`, `@nx/js`); 3.4.3 (três unidades `Yes`); 3.4.5 #1, #2; apps/shell/rsbuild.config.ts:3, 29, 31-33 |
| 2 | README.md:5 | "[Live Demo](https://nx-zephyr-module-federation-shell.vercel.app/)" (endereço publicado do shell) | build-deploy | sem corroboração | — |
| 3 | README.md:9 | "This monorepo contains three main applications that work together using Module Federation" | estrutura | corroborada | 3.4.3 (Resumo); 3.4.5 #1, #2; pnpm-workspace.yaml:1-3 |
| 4 | README.md:11-15 | "**Shell** (Host Application) / Main container application / Handles routing and navigation / Integrates remote modules seamlessly" | estrutura | corroborada | 3.4.4 (apps/shell/src/App.tsx:18, `host-relationship`); 3.4.5 #1, #2; apps/shell/src/App.tsx:13-22; apps/shell/src/components/Header.tsx:16-43 |
| 5 | README.md:18-25 | "**Courses** (Remote Module) [...] **Profile** (Remote Module)" | estrutura | corroborada | 3.4.5 #1, #2; apps/courses/module-federation.config.ts:5-9; apps/profile/module-federation.config.ts:5-9 |
| 6 | README.md:42-45 | "**Module Federation** / Runtime dependency sharing / Dynamic remote loading" | composição | corroborada | 3.4.4 (apps/shell/src/App.tsx:6, 7); 3.4.5 #1, #2; apps/shell/module-federation.config.ts:20-37; apps/courses/module-federation.config.ts:10-20; apps/profile/module-federation.config.ts:10-20 |
| 7 | README.md:46 | "Shared component library" | composição | contradita | 3.4.3 (packages/zephyr-rsbuild-plugin `No`); pnpm-workspace.yaml:1-3; apps/courses/src/App.tsx:1; apps/profile/src/App.tsx:1; apps/courses/module-federation.config.ts:7-9; apps/profile/module-federation.config.ts:7-9 |
| 8 | README.md:49-52 | "**Zephyr** / Custom RSBuild plugin / Enhanced build configuration / Optimized module federation setup" | build-deploy | parcial | 3.4.6 (Leitura); packages/zephyr-rsbuild-plugin/src/index.ts:4-10; apps/shell/rsbuild.config.ts:3, 29; apps/courses/rsbuild.config.ts:3, 29; apps/profile/rsbuild.config.ts:3, 29 |
| 9 | README.md:56-61 | "**RSBuild/RSPack** [...] Module Federation support" | build-deploy | corroborada | 3.4.3 (coluna Build); 3.4.6 #1-#3; apps/shell/package.json:7; apps/shell/rsbuild.config.ts:31-33; apps/courses/rsbuild.config.ts:31-33; apps/profile/rsbuild.config.ts:31-33 |
| 10 | README.md:86-88 | diagrama "A[Shell App] --> B[Courses App]" / "A --> C[Profile App]" | composição | corroborada | 3.4.5 #1, #2 |
| 11 | README.md:89-92 | diagrama "B --> D[Shared Dependencies]" / "C --> D" / "D --> E[React]" / "D --> F[React DOM]" | composição | corroborada | apps/courses/module-federation.config.ts:10-20; apps/profile/module-federation.config.ts:10-20; apps/shell/module-federation.config.ts:25-37; apps/courses/package.json:16-17; apps/profile/package.json:16-17; apps/shell/package.json:15-16 |
| 12 | README.md:97 | "The project is deployed on Vercel with separate deployments for each application" | build-deploy | corroborada | 3.4.6 #1-#3; vercel.json:2-3; apps/courses/vercel.json:2-3; apps/profile/vercel.json:2-3 |
| 13 | README.md:144 | "**Dynamic Module Loading**: Remote modules are loaded on demand" | composição | corroborada | 3.4.4 (apps/shell/src/App.tsx:6, 7); apps/shell/src/App.tsx:6-7, 17-21 |

## Observações

**1. README.md:3.** As três aplicações são unidades frontend (3.4.3) e o shell carrega os dois remotes por `module-federation` (3.4.5 #1, #2), declarado pela opção `moduleFederation` do Rsbuild (apps/shell/rsbuild.config.ts:31-33). O monorepo Nx é o workspace pnpm com `project.json` do Nx em cada aplicação, e `nx` e `@nx/js` estão em uso (3.4.2). A Zephyr entra pelo plugin local que os três `rsbuild.config.ts` aplicam (apps/shell/rsbuild.config.ts:3, 29). A mesma afirmação reaparece em "Micro-frontend architecture" (README.md:47) e em "The project uses a micro-frontend architecture with Module Federation" (README.md:83). O título "Nx Module Federation with Zephyr" (README.md:1) nomeia as mesmas tecnologias.

**2. README.md:5.** O endereço do shell está só no README, aqui e na seção de deploy ("Shell App: https://nx-zephyr-module-federation-shell.vercel.app/", README.md:99). O `vercel.json` da raiz configura o deploy do shell (vercel.json:2-3), mas não registra domínio, e a revisão de build e deploy notou que o nome desse domínio não segue o padrão das URLs dos remotes no host (`nx-zephyr-module-federation-example-<nome>`, apps/shell/module-federation.config.ts:10, 15; 3.4.6 #3). Nada no snapshot confirma nem desmente que o shell esteja publicado nesse endereço.

**3. README.md:9.** O snapshot tem três unidades frontend, apps/courses, apps/profile e apps/shell, no workspace pnpm (pnpm-workspace.yaml:3; 3.4.3), ligadas por duas relações `module-federation` (3.4.5 #1, #2). O "main" deixa espaço para outros projetos: o quarto pacote do workspace é o plugin de build, que não é aplicação (3.4.3, packages/zephyr-rsbuild-plugin `No`).

**4. README.md:11-15.** O shell é o host das duas relações (3.4.5 #1, #2) e não expõe nada (`exposes: {}`, apps/shell/module-federation.config.ts:24). O roteamento e a navegação são dele: `BrowserRouter` com as rotas `/courses*` e `/profile*` e o redirecionamento de `/` (apps/shell/src/App.tsx:13-22), e os links do cabeçalho (apps/shell/src/components/Header.tsx:16-43). Os remotes não têm roteador próprio. A árvore de pastas repete o papel ("shell/ # Host application", README.md:134).

**5. README.md:18-25.** Os dois remotes expõem `./App` com `filename: "remoteEntry.js"` (apps/courses/module-federation.config.ts:5-9; apps/profile/module-federation.config.ts:5-9) e são carregados pelo shell (3.4.5 #1, #2). A árvore de pastas (README.md:135-136) e a seção de deploy ("Remote module integrated with Shell", README.md:100-101) repetem os papéis.

**6. README.md:42-45.** O carregamento dinâmico é o `lazy(() => import("courses/App"))` e o `lazy(() => import("profile/App"))` do shell, resolvidos pelos remotes declarados em apps/shell/module-federation.config.ts:20-23 (3.4.4; 3.4.5 #1, #2). O compartilhamento em runtime é o `shared` das três configurações, que espalha as `dependencies` de cada `package.json` e marca `react` e `react-dom` como singleton (apps/shell/module-federation.config.ts:25-37; apps/courses/module-federation.config.ts:10-20; apps/profile/module-federation.config.ts:10-20); as três aplicações dependem de `react` e `react-dom` (afirmação 11). Os recursos "Shared Dependencies: Efficient runtime dependency sharing" (README.md:145) repetem o compartilhamento.

**7. README.md:46.** O snapshot não tem biblioteca de componentes. O único pacote do workspace fora de `apps/` é o plugin de build (pnpm-workspace.yaml:2; 3.4.3), os `App.tsx` dos remotes só importam o próprio CSS (apps/courses/src/App.tsx:1; apps/profile/src/App.tsx:1) e o shell só importa o próprio `Header` e os dois módulos remotos (apps/shell/src/App.tsx:3, 6-7). Os remotes expõem cada um só o seu `./App` (apps/courses/module-federation.config.ts:7-9; apps/profile/module-federation.config.ts:7-9), consumido apenas pelo shell; nenhum componente é usado por mais de uma unidade como biblioteca. Por isso a afirmação é `contradita`, e não `sem corroboração`.

**8. README.md:49-52.** O "Custom RSBuild plugin" existe: `ZephyrRsbuildPlugin` troca a configuração do bundler pelo resultado de `withZephyr()` antes de criar o compilador (packages/zephyr-rsbuild-plugin/src/index.ts:4-10), e as três aplicações o usam (apps/shell/rsbuild.config.ts:3, 29; apps/courses/rsbuild.config.ts:3, 29; apps/profile/rsbuild.config.ts:3, 29), o que também confirma que a configuração de build é alterada. O que `withZephyr` faz com a configuração, e se otimiza a federação, depende do `zephyr-rspack-plugin` e não se observa no snapshot, que não tem nenhuma outra configuração da Zephyr (3.4.6, Leitura). A árvore de pastas repete o plugin ("zephyr-rsbuild-plugin/ # Custom build plugin", README.md:138).

**9. README.md:56-61.** As três aplicações são construídas com `rsbuild build` (apps/shell/package.json:7; apps/courses/package.json:7; apps/profile/package.json:7), e a federação é declarada na opção `moduleFederation` do próprio Rsbuild (apps/shell/rsbuild.config.ts:31-33; apps/courses/rsbuild.config.ts:31-33; apps/profile/rsbuild.config.ts:31-33). "Build Optimization: Efficient build process with RSBuild" (README.md:148) repete o build com Rsbuild. Os `vercel.json` declaram `framework: "vite"` (vercel.json:4), embora o build seja Rsbuild (3.4.6, Leitura).

**10. README.md:86-88.** O diagrama tem exatamente as duas relações da revisão de composição, shell → courses e shell → profile (3.4.5 #1, #2), e nenhuma ligação entre os remotes, como no snapshot (3.4.5, Leitura).

**11. README.md:89-92.** `react` e `react-dom` estão no `shared` das três configurações (apps/courses/module-federation.config.ts:12-19; apps/profile/module-federation.config.ts:12-19; apps/shell/module-federation.config.ts:27-36), e as três aplicações dependem deles (apps/courses/package.json:16-17; apps/profile/package.json:16-17; apps/shell/package.json:15-16). O diagrama liga às dependências compartilhadas só os remotes, mas o shell também as compartilha, com `eager: true` (apps/shell/module-federation.config.ts:29, 34). Como o `shared` espalha todas as `dependencies` de cada aplicação (apps/shell/module-federation.config.ts:26), a lista compartilhada é maior que React e React DOM (inclui `react-router-dom` no shell, apps/shell/package.json:17).

**12. README.md:97.** Há três configurações de deploy na Vercel, uma por aplicação, cada uma construindo e publicando só a sua (vercel.json:2-3; apps/courses/vercel.json:2-3; apps/profile/vercel.json:2-3), e a revisão de build e deploy registrou deploy `separado` nas três (3.4.6 #1-#3). As linhas seguintes repetem o endereço do shell (README.md:99, afirmação 2) e os papéis dos remotes (README.md:100-101, afirmação 5).

**13. README.md:144.** Os dois remotes são importados com `React.lazy` (apps/shell/src/App.tsx:6-7) e só são renderizados nas rotas `/courses*` e `/profile*`, dentro de `Suspense` (apps/shell/src/App.tsx:17-21), então cada um só é buscado quando a sua rota é visitada; como `/` redireciona para `/courses` (apps/shell/src/App.tsx:19), o courses é carregado já na entrada. O comentário "// Lazy load the remote modules" (apps/shell/src/App.tsx:5) repete a afirmação.

## Resumo

Afirmações: 13 (corroborada: 10, parcial: 1, contradita: 1, sem corroboração: 1). Temas: (estrutura: 4, composição: 5, build-deploy: 4).
