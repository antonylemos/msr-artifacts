---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Leitura do repositório

Exemplo de demonstração com três aplicações React construídas com Rsbuild num monorepo pnpm/Nx: o host `apps/shell` e os remotes `apps/courses` e `apps/profile`, cada um com manifesto, entrada e build próprios (#17 a #19). A arquitetura se sustenta por uma cadeia de Module Federation completa, sem dependência própria de federação: o mecanismo vem da opção nativa `moduleFederation` do Rsbuild.
- **Configuração:** cada remote se declara pelo nome, com `remoteEntry.js`, e expõe `./App` (#3, #5). O shell nomeia os dois remotes, com URL de desenvolvimento e de produção (#7). Os três `rsbuild.config.ts` passam essas declarações à opção `moduleFederation` (#4, #6, #8).
- **Código:** o shell importa `courses/App` e `profile/App` com `React.lazy` (#9, #10) e os liga às rotas `/courses*` e `/profile*` numa tabela de rotas (#13 a #15).
- **Relações:** isso resulta em duas relações host → remote ativas (#21, #22).
- **Build e deploy:** cada aplicação tem build próprio e uma configuração de deploy própria na Vercel (#23 a #25). As URLs de produção que o host usa para os remotes são coerentes com essas publicações independentes (#7).

A documentação é o README da raiz e confere quase toda com a implementação (#26, #28 a #31, #34 a #38). As exceções:
- **Live Demo (#27):** o endereço do shell só aparece no README.
- **Zephyr (#33):** o plugin que altera a configuração do bundler existe e é usado pelas três aplicações, mas o efeito sobre a federação não se observa no snapshot.
- **"Shared component library" (#32):** é contradita pelo snapshot, que não tem biblioteca de componentes. O histórico confirma que nenhum estágio observável teve uma (#39).

Há sinais que enganam se lidos sozinhos:
- **Nx (#1, #2):** são ferramentas de monorepo em uso, e não de MFE.
- **Bootstrap assíncrono (#11, #12):** é interno a cada unidade.
- **Plugin Zephyr (#20):** é o quarto pacote do workspace, mas é um plugin de build, e não uma unidade nem uma biblioteca compartilhada.

Nada fica ambíguo no snapshot.

## Observações

### 1. package.json:13; nx.json:8-22

**Observação:** `@nx/js` (`20.7.2`) está declarada em `devDependencies`. O `nx.json` registra o plugin `@nx/js/typescript`, com as opções `typecheck` e `build`. Não há import nem executor `@nx/js` fora do `nx.json`.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 2. package.json:17; vercel.json:2; apps/courses/vercel.json:2; apps/profile/vercel.json:2; apps/shell/project.json:6-20; apps/courses/project.json:6-20; apps/profile/project.json:6-20

**Observação:** `nx` (`20.7.2`) está declarada em `devDependencies`. Os três `vercel.json` invocam `npx nx build shell`, `npx nx build courses` e `npx nx build profile`, e os três `project.json` das aplicações definem os targets `build` e `serve` com o executor `nx:run-commands`.

**Interpretação:** É a ferramenta de monorepo que dispara os builds de deploy, e não uma tecnologia de MFE.

### 3. apps/courses/module-federation.config.ts:1-21

**Observação:** `mfConfig` declara `name: "courses"`, `filename: "remoteEntry.js"` e expõe `./App` (`./src/App`). O `shared` espalha as `dependencies` do `package.json` e marca `react` e `react-dom` como singletons.

**Interpretação:** O courses está configurado como remote e oferece a sua aplicação a um host.

**Nota:** Os demais arquivos de configuração citados nas tabelas da 3.4 (`nx.json`, `pnpm-workspace.yaml`, os `project.json`, os `vercel.json` e packages/zephyr-rsbuild-plugin/rslib.config.ts) não declaram elemento da composição e não viraram observação de configuração. As portas de desenvolvimento só corroboram.

### 4. apps/courses/rsbuild.config.ts:1-34

**Observação:** `defineConfig` define a porta 3001, a saída em `dist`, os plugins `pluginReact` e `ZephyrRsbuildPlugin`, e `moduleFederation.options: mfConfig`, importado do `module-federation.config.ts` vizinho.

**Interpretação:** O build do courses aplica a federação nativa do Rsbuild com a configuração de #3.

### 5. apps/profile/module-federation.config.ts:1-21

**Observação:** `mfConfig` declara `name: "profile"`, `filename: "remoteEntry.js"` e expõe `./App` (`./src/App`). O `shared` espalha as `dependencies` do `package.json` e marca `react` e `react-dom` como singletons.

**Interpretação:** O profile está configurado como remote e oferece a sua aplicação a um host.

### 6. apps/profile/rsbuild.config.ts:1-34

**Observação:** `defineConfig` define a porta 3002, a saída em `dist`, os plugins `pluginReact` e `ZephyrRsbuildPlugin`, e `moduleFederation.options: mfConfig`.

**Interpretação:** O build do profile aplica a federação nativa do Rsbuild com a configuração de #5.

### 7. apps/shell/module-federation.config.ts:1-38

**Observação:** `mfConfig` declara `name: "shell"`, `filename: "remoteEntry.js"`, `exposes: {}` e os `remotes` `courses: courses@${COURSES_URL}/remoteEntry.js` e `profile: profile@${PROFILE_URL}/remoteEntry.js`. As URLs são `http://localhost:3001` e `http://localhost:3002` em desenvolvimento e, fora dele, `VITE_COURSES_URL`/`VITE_PROFILE_URL` ou, como padrão, `https://nx-zephyr-module-federation-example-courses.vercel.app` e `https://nx-zephyr-module-federation-example-profile.vercel.app`. O `shared` espalha as `dependencies` e marca `react` e `react-dom` como singletons `eager`.

**Interpretação:** A configuração do host declara as unidades courses e profile como remotes e diz onde encontrá-las em cada ambiente.

### 8. apps/shell/rsbuild.config.ts:1-34

**Observação:** `defineConfig` define a porta 3000, a saída em `dist`, os plugins `pluginReact` e `ZephyrRsbuildPlugin`, e `moduleFederation.options: mfConfig`.

**Interpretação:** O build do shell aplica a federação nativa do Rsbuild com a configuração de #7.

### 9. apps/shell/src/App.tsx:6

**Observação:** `const Courses = lazy(() => import("courses/App"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo courses.

### 10. apps/shell/src/App.tsx:7

**Observação:** `const Profile = lazy(() => import("profile/App"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo profile.

### 11. apps/courses/src/index.tsx:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 12. apps/shell/src/index.tsx:1

**Observação:** `import("./bootstrap")`.

**Interpretação:** É um bootstrap assíncrono interno ao shell.

### 13. apps/shell/src/App.tsx:18-22; apps/shell/src/App.tsx:13-17; apps/shell/src/components/Header.tsx:16-43

**Observação:** `Routes` liga `/courses*` a `Courses` e `/profile*` a `Profile`, e redireciona `/` para `/courses`, dentro de `BrowserRouter` e `Suspense`. O cabeçalho do shell tem os links para as duas rotas.

**Interpretação:** O roteamento do host declara a relação host → remotes e apresenta os dois remotes numa mesma aplicação.

### 14. apps/shell/src/App.tsx:20

**Observação:** `<Route path="/courses*" element={<Courses />} />`.

**Interpretação:** A rota liga o caminho `/courses*` ao componente remoto do courses.

### 15. apps/shell/src/App.tsx:21

**Observação:** `<Route path="/profile*" element={<Profile />} />`.

**Interpretação:** A rota liga o caminho `/profile*` ao componente remoto do profile.

### 16. .; package.json:1-21; pnpm-workspace.yaml:1-3

**Observação:** É a raiz do workspace pnpm (`packages/*` e `apps/*`), com scripts `nx run-many` para as três aplicações e sem entrada nem build de UI.

**Interpretação:** É a raiz de coordenação de um monorepo, e não uma unidade.

### 17. apps/courses; apps/courses/package.json:1-27; apps/courses/src/index.tsx:1; apps/courses/src/bootstrap.tsx:5-13; apps/courses/rsbuild.config.ts:6-34

**Observação:** Tem manifesto, entrada que monta React e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 18. apps/profile; apps/profile/package.json:1-27; apps/profile/src/index.tsx:1; apps/profile/src/bootstrap.tsx:5-13; apps/profile/rsbuild.config.ts:6-34

**Observação:** Tem manifesto, entrada que monta React e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 19. apps/shell; apps/shell/package.json:1-29; apps/shell/src/index.tsx:1; apps/shell/src/bootstrap.tsx:5-13; apps/shell/rsbuild.config.ts:6-34

**Observação:** Tem manifesto, entrada que monta React e build Rsbuild próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 20. packages/zephyr-rsbuild-plugin; packages/zephyr-rsbuild-plugin/package.json:1-39; packages/zephyr-rsbuild-plugin/rslib.config.ts:4-21

**Observação:** É um pacote construído como biblioteca ESM com Rslib, que envolve a configuração com `withZephyr`, sem entrada que inicie UI. Os três `rsbuild.config.ts` o importam.

**Interpretação:** É um plugin de build das aplicações, e não uma unidade frontend.

### 21. apps/shell/src/App.tsx:6; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:20; apps/shell/module-federation.config.ts:7-10, 21; apps/courses/module-federation.config.ts:5-9; apps/shell/rsbuild.config.ts:31-33; apps/courses/rsbuild.config.ts:31-33

**Observação:** O remote `courses` do shell corresponde ao `name: "courses"`, ao `filename: "remoteEntry.js"` e à chave `./App` da unidade, que é o especificador `courses/App` importado pelo shell e renderizado na rota `/courses*`, também destino do redirecionamento de `/`.

**Interpretação:** É uma relação host → remote ativa.

### 22. apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:21; apps/shell/module-federation.config.ts:12-15, 22; apps/profile/module-federation.config.ts:5-9; apps/shell/rsbuild.config.ts:31-33; apps/profile/rsbuild.config.ts:31-33

**Observação:** O mesmo fluxo para `profile`: remote `profile` no shell, `name: "profile"`, `remoteEntry.js` e `./App` na unidade, import `profile/App` e rota `/profile*`.

**Interpretação:** É uma relação host → remote ativa.

### 23. apps/courses/rsbuild.config.ts:10-21; apps/courses/package.json:7; apps/courses/project.json:7-13; apps/courses/vercel.json:2-3

**Observação:** Tem `rsbuild build` próprio, com saída em `apps/courses/dist`, e target Nx `build`. O `vercel.json` da aplicação constrói só `courses` e publica `dist`. O endereço de produção é a URL padrão que o host usa para o remote. A versão `0.0.0` não é usada na publicação.

**Interpretação:** Há fronteiras de build e de deploy próprias.

### 24. apps/profile/rsbuild.config.ts:10-21; apps/profile/package.json:7; apps/profile/project.json:7-13; apps/profile/vercel.json:2-3

**Observação:** Tem `rsbuild build` próprio, com saída em `apps/profile/dist`, e target Nx `build`. O `vercel.json` da aplicação constrói só `profile` e publica `dist`. O endereço de produção é a URL padrão que o host usa para o remote. A versão `0.0.0` não é usada na publicação.

**Interpretação:** Há fronteiras de build e de deploy próprias.

### 25. apps/shell/rsbuild.config.ts:10-21; apps/shell/package.json:7; apps/shell/project.json:7-13; vercel.json:2-3

**Observação:** Tem `rsbuild build` próprio, com saída em `apps/shell/dist`, e target Nx `build`. O `vercel.json` da raiz constrói só o shell e publica `apps/shell/dist`; os remotes não entram nesse artefato. Nenhum artefato registra o endereço público do shell. A versão `1.0.0` não é usada na publicação.

**Interpretação:** Há fronteiras de build e de deploy próprias. O shell carrega os remotes publicados em separado.

### 26. README.md:3

**Observação:** "A modern micro-frontend architecture demonstration using Module Federation, built with Nx monorepo and Zephyr."

**Interpretação:** Apresenta o repositório como uma arquitetura de micro-frontends com Module Federation num monorepo Nx. A afirmação é corroborada.

### 27. README.md:5

**Observação:** "[Live Demo](https://nx-zephyr-module-federation-shell.vercel.app/)".

**Interpretação:** Dá o endereço publicado do shell, que nenhum artefato registra. A afirmação fica sem corroboração.

### 28. README.md:9

**Observação:** "This monorepo contains three main applications that work together using Module Federation".

**Interpretação:** Afirma que o monorepo tem três aplicações compostas por Module Federation. A afirmação é corroborada.

### 29. README.md:11-15

**Observação:** "**Shell** (Host Application) / Main container application / Handles routing and navigation / Integrates remote modules seamlessly".

**Interpretação:** Atribui ao shell o papel de host, com o roteamento e a navegação. A afirmação é corroborada.

### 30. README.md:18-25

**Observação:** "**Courses** (Remote Module) [...] **Profile** (Remote Module)".

**Interpretação:** Atribui a courses e profile o papel de remotes. A afirmação é corroborada.

### 31. README.md:42-45

**Observação:** "**Module Federation** / Runtime dependency sharing / Dynamic remote loading".

**Interpretação:** Atribui ao Module Federation o compartilhamento de dependências e a carga dinâmica dos remotes. A afirmação é corroborada.

### 32. README.md:46

**Observação:** "Shared component library".

**Interpretação:** Afirma que há uma biblioteca de componentes compartilhada. O snapshot não tem nenhuma: o único pacote fora de `apps/` é o plugin de build, e cada remote expõe só a sua aplicação. A afirmação é contradita.

### 33. README.md:49-52

**Observação:** "**Zephyr** / Custom RSBuild plugin / Enhanced build configuration / Optimized module federation setup".

**Interpretação:** Afirma que um plugin Rsbuild próprio altera o build e otimiza a federação. O plugin existe e altera a configuração do bundler, mas o efeito sobre a federação não se observa no snapshot. A afirmação é corroborada em parte.

### 34. README.md:56-61

**Observação:** "**RSBuild/RSPack** [...] Module Federation support".

**Interpretação:** Afirma que o build usa Rsbuild com suporte a Module Federation. A afirmação é corroborada.

### 35. README.md:86-88

**Observação:** Diagrama "A[Shell App] --> B[Courses App]" / "A --> C[Profile App]".

**Interpretação:** Desenha as duas ligações do shell aos remotes, sem ligação entre eles. A afirmação é corroborada.

### 36. README.md:89-92

**Observação:** Diagrama "B --> D[Shared Dependencies]" / "C --> D" / "D --> E[React]" / "D --> F[React DOM]".

**Interpretação:** Afirma que os remotes compartilham React e React DOM. A afirmação é corroborada; o shell também os compartilha, e a lista compartilhada é maior.

### 37. README.md:97

**Observação:** "The project is deployed on Vercel with separate deployments for each application".

**Interpretação:** Afirma um deploy separado para cada aplicação. A afirmação é corroborada.

### 38. README.md:144

**Observação:** "**Dynamic Module Loading**: Remote modules are loaded on demand".

**Interpretação:** Afirma que os remotes são carregados sob demanda. A afirmação é corroborada.

### 39. 5a52004 2025-06-09 (packages/, apps/settings); 78c42b1 2025-06-10 (apps/settings, apps/courses); f9593dc 2025-06-10 (README.md); 766b6a2 2025-06-10 (packages/zephyr-rsbuild-plugin)

**Observação:** Nenhum dos 13 commits cria um pacote ou diretório de componentes compartilhados. Em `packages/` só houve o `.gitkeep` e o plugin Zephyr. O único conjunto removido é `apps/settings`, com o mesmo arranjo das outras aplicações, apagado em `78c42b1`. O README do snapshot é a versão de `f9593dc`, posterior a essa remoção. As versões antigas do README e de `apps/settings` não estão disponíveis.

**Interpretação:** Nenhum estágio observável teve uma biblioteca de componentes que a afirmação pudesse descrever. O ponto está esclarecido, e a afirmação continua contradita.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:13) | 1 tecnologia | manifesto | — | contexto | fraca | declara nx.json:8-22 |
| 2 | 3.4.2 (package.json:17) | 1 tecnologia | manifesto | — | contexto | fraca | declara vercel.json:2; declara apps/courses/vercel.json:2; declara apps/profile/vercel.json:2; declara apps/shell/project.json:6-20; declara apps/courses/project.json:6-20; declara apps/profile/project.json:6-20 |
| 3 | 3.4.3 (apps/courses, Marcadores); 3.4.4 (apps/shell/src/App.tsx:6, Observação); 3.4.5 #1 (Configuração); 3.4.7 #5, #6, #7, #11 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #21 |
| 4 | 3.4.3 (apps/courses, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #8, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #21 |
| 5 | 3.4.3 (apps/profile, Marcadores); 3.4.4 (apps/shell/src/App.tsx:7, Observação); 3.4.5 #2 (Configuração); 3.4.7 #5, #6, #7, #11 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #22 |
| 6 | 3.4.3 (apps/profile, Marcadores e Build); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #8, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #22 |
| 7 | 3.4.3 (apps/shell, Marcadores); 3.4.4 (apps/shell/src/App.tsx:6, apps/shell/src/App.tsx:7, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #2 (Onde é servida); 3.4.7 #6, #11 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #19; configura #21; configura #22 |
| 8 | 3.4.3 (apps/shell, Marcadores e Build); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #1, #8, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #19; configura #21; configura #22 |
| 9 | 3.4.4 (apps/shell/src/App.tsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21 |
| 10 | 3.4.4 (apps/shell/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #22 |
| 11 | 3.4.4 (apps/courses/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (apps/shell/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (apps/shell/src/App.tsx:18) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21; implementa #22 |
| 14 | 3.4.4 (apps/shell/src/App.tsx:20) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21 |
| 15 | 3.4.4 (apps/shell/src/App.tsx:21) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #22 |
| 16 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 17 | 3.4.3 (apps/courses) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (apps/profile) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.3 (packages/zephyr-rsbuild-plugin) | 4 estrutura | diretório | — | contexto | fraca | — |
| 21 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #19; liga #17 |
| 22 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #19; liga #18 |
| 23 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #17 |
| 24 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #18 |
| 25 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #19 |
| 26 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #8; corrobora #17; corrobora #18; corrobora #19; corrobora #21; corrobora #22 |
| 27 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 28 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #21; corrobora #22; corrobora pnpm-workspace.yaml:1-3 |
| 29 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #21; corrobora #22 |
| 30 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #5; corrobora #21; corrobora #22 |
| 31 | 3.4.7 #6 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #3; corrobora #5; corrobora #7; corrobora #9; corrobora #10; corrobora #21; corrobora #22 |
| 32 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #3; contradiz #5; contradiz #20; contradiz pnpm-workspace.yaml:1-3; contradiz apps/courses/src/App.tsx:1; contradiz apps/profile/src/App.tsx:1 |
| 33 | 3.4.7 #8 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #4; corrobora em parte #6; corrobora em parte #8; corrobora em parte packages/zephyr-rsbuild-plugin/src/index.ts:4-10 |
| 34 | 3.4.7 #9 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #4; corrobora #6; corrobora #8; corrobora #23; corrobora #24; corrobora #25 |
| 35 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22 |
| 36 | 3.4.7 #11 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #3; corrobora #5; corrobora #7; corrobora apps/courses/package.json:16-17; corrobora apps/profile/package.json:16-17; corrobora apps/shell/package.json:15-16 |
| 37 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora #24; corrobora #25 |
| 38 | 3.4.7 #13 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #9; corrobora #10; corrobora #14; corrobora #15 |
| 39 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #32; explica #20 |

## Resumo

Observações: 39. Dimensões (tecnologia: 2, configuração: 6, código: 7, estrutura: 5, composição: 2, build-deploy: 3, documentação: 13, histórico: 1). Força (forte: 8, moderada: 11, fraca: 20, ambígua: 0). Evidência (tecnológica: 12, arquitetural: 23, contexto: 4).
