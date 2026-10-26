---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
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

# 128 — fudoyoki/ai-portal-mfe-example

## Leitura do repositório

Monorepo npm workspaces com duas aplicações React/Vite, o shell (host) e o dashboard (remote), um BFF NestJS e dois pacotes compartilhados. A cadeia de Module Federation está completa:
- **Dependência:** `@originjs/vite-plugin-federation`, nas duas aplicações (#1, #2).
- **Configuração:** o shell declara o remote `mfeDashboard`, com URL de desenvolvimento e de produção (#5), e o dashboard se publica com esse nome e expõe `./DashboardApp` (#4); os dois lados compartilham as mesmas bibliotecas como singleton.
- **Código:** o shell importa `mfeDashboard/DashboardApp` com `React.lazy` (#6), liga a rota `/dashboard/*` ao componente remoto (#7) e o renderiza passando `user` e `basePath` (#8).
- **Relação:** isso resulta na relação ativa shell → dashboard (#15), entre duas unidades com limite próprio (#11, #12), com build e deploy separados, uma imagem nginx por aplicação (#16, #17).

Os sinais enganosos vêm do portal que a documentação desenha e o snapshot não tem. Os remotes Chat, Tools e Admin só existem como linhas comentadas na configuração do shell e como placeholders nas rotas (#5, #7); o README os apresenta como remotes (#20, #23), e o histórico mostra que nunca tiveram código (#42). O README liga as unidades ao BFF, e nenhuma delas o chama (#22, #43); o pacote de tipos se diz compartilhado com o BFF, que não o usa (#39, #47). O BFF (#10), a raiz de coordenação (#9) e os pacotes (#13, #14) são contexto, não unidades frontend.

Duas afirmações sobre publicação não se sustentam: o deploy em CDN do README usa um prefixo diferente do que o shell espera (#33), e os `sonar-project.properties` de cada app não existem (#35). O histórico não diz quando a seção de CDN entrou no README (#45) nem se a exigência de `build` + `preview` do remote é de outro estágio que o compose de desenvolvimento (#44); nos dois casos a dúvida é só sobre o passado. A única observação ambígua é o `turbo` (#3): declarado e configurado, mas invocado só pelos scripts do `package.json`, sem decidir se orquestra o build.

## Observações

### 1. apps/mfe-dashboard/package.json:21

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.6`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do dashboard.

### 2. apps/shell/package.json:22

**Observação:** `@originjs/vite-plugin-federation` (`^1.3.6`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell.

### 3. package.json:18; turbo.json:3-25

**Observação:** `turbo` (`^2.3.0`) está declarada em `devDependencies`. `turbo.json` define as tasks `build`, `dev`, `lint`, `test`, `test:coverage` e `clean`. A única invocação de `turbo` está nos scripts do `package.json` da raiz (package.json:10-15); os Dockerfiles copiam `turbo.json` e constroem com `npm run build --workspace=...`, e não há workflow de CI.

**Interpretação:** É a ferramenta de monorepo, não uma tecnologia de MFE. Pela regra da revisão de dependências, o uso fica indeterminado: o Turborepo pode ser a orquestração efetiva do build ou só um atalho de scripts.

### 4. apps/mfe-dashboard/vite.config.ts:11-40

**Observação:** `federation` declara `name: 'mfeDashboard'` e `filename: 'remoteEntry.js'`, expõe `./DashboardApp` (`./src/DashboardApp.tsx`) e compartilha como `singleton` `react`, `react-dom`, `react-router-dom`, `@ai-portal/ui-kit` e `@ai-portal/shared-types`.

**Interpretação:** O dashboard está configurado como remote e oferece seu componente principal a um host.

### 5. apps/shell/vite.config.ts:17-23; apps/shell/vite.config.ts:28-60

**Observação:** `federation` declara `name: 'shell'` e o remote `mfeDashboard: getRemoteUrl('mfeDashboard')`. `getRemoteUrl` devolve `http://localhost:3001/assets/remoteEntry.js` em desenvolvimento e `${CDN_URL}/mfeDashboard/remoteEntry.js`, com `https://cdn.example.com` como padrão, em produção. As entradas `mfeChat`, `mfeTools` e `mfeAdmin` estão comentadas sob "Add more MFEs as they're created" (:32-35). O `shared` é o mesmo do dashboard.

**Interpretação:** A configuração do host declara o dashboard como remote e onde encontrá-lo em cada ambiente; os outros três remotes só estão previstos.

### 6. apps/shell/src/App.tsx:7

**Observação:** `const DashboardApp = React.lazy(() => import('mfeDashboard/DashboardApp'))`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo remote, pelo nome dele.

### 7. apps/shell/src/App.tsx:165-179

**Observação:** A tabela de rotas de `AppRoutes` liga `/dashboard/*` ao `DashboardApp` remoto; `/chat/*` e `/tools/*` renderizam o placeholder local `ComingSoon`. `AppRoutes` é usado por `App` (:184-189).

**Interpretação:** O host encaixa o remote numa rota própria; as rotas dos outros remotes não carregam nenhuma unidade.

### 8. apps/shell/src/App.tsx:170-174

**Observação:** `<DashboardApp user={user} basePath="/dashboard" />`, dentro de `MfeErrorBoundary` e `Suspense`, com `user` vindo do `AuthContext` do shell.

**Interpretação:** O host renderiza o componente remoto e lhe passa props; o contrato entre as unidades é só de props.

**Nota:** A linha está no `element` da rota, mas a ligação do caminho ao componente remoto é a linha da rota (#7); esta só renderiza o componente, caso `moderada` da orientação.

### 9. .; package.json:1-25; docker-compose.yml:3-58

**Observação:** A raiz tem o manifesto do workspace, que declara `apps/*` e `packages/*` e só delega `dev` e `build` a `turbo run`, e o `docker-compose.yml`, que orquestra os serviços dos subdiretórios. Não tem entrada nem build próprio.

**Interpretação:** É a raiz de coordenação do workspace, não uma unidade frontend.

### 10. apps/bff; apps/bff/package.json:1-32; apps/bff/nest-cli.json:1-8; apps/bff/Dockerfile:2-16

**Observação:** Tem manifesto próprio com build `nest build`, configuração do Nest CLI, imagem Docker própria e serviço `bff` no compose.

**Interpretação:** É um servidor NestJS (BFF), não uma unidade frontend.

### 11. apps/mfe-dashboard; apps/mfe-dashboard/package.json:1-31; apps/mfe-dashboard/index.html:10-11; apps/mfe-dashboard/src/main.tsx:17-26; apps/mfe-dashboard/vite.config.ts:8-56

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios; o `main.tsx` monta o `DashboardApp` sozinho, em modo standalone. Tem imagem de deploy própria.

**Interpretação:** É uma unidade frontend com limite próprio, capaz de rodar sem o shell.

### 12. apps/shell; apps/shell/package.json:1-32; apps/shell/index.html:10-11; apps/shell/src/main.tsx:8-16; apps/shell/vite.config.ts:25-76

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios. Tem imagem de deploy própria.

**Interpretação:** É uma unidade frontend com limite próprio.

### 13. packages/shared-types; packages/shared-types/package.json:1-25

**Observação:** Tem manifesto próprio e build de biblioteca (`tsup src/index.ts`, :17), sem entrada de aplicação nem deploy.

**Interpretação:** É um pacote compartilhado de tipos, não uma unidade frontend.

### 14. packages/ui-kit; packages/ui-kit/package.json:1-35

**Observação:** Tem manifesto próprio e build de biblioteca (`tsup src/index.ts`, :18), sem entrada de aplicação nem deploy.

**Interpretação:** É uma biblioteca de componentes compartilhada, não uma unidade frontend.

### 15. apps/shell/src/App.tsx:7, 165, 172; apps/shell/vite.config.ts:17-23, 28-31; apps/mfe-dashboard/vite.config.ts:11-17

**Observação:** O shell importa `mfeDashboard/DashboardApp` e o renderiza na rota `/dashboard/*`. O nome do remote, o `remoteEntry.js` e o módulo `./DashboardApp` correspondem à configuração do dashboard.

**Interpretação:** É uma relação host → remote ativa, por Module Federation.

### 16. apps/mfe-dashboard/package.json:8; apps/mfe-dashboard/vite.config.ts:8-56; apps/mfe-dashboard/Dockerfile:2-33; apps/mfe-dashboard/nginx.conf:1-38; docker-compose.yml:19-27

**Observação:** Tem `tsc && vite build` e configuração próprios, que geram o `remoteEntry.js`. O Dockerfile constrói os pacotes e o app e copia para a imagem nginx só `apps/mfe-dashboard/dist`; o serviço `mfe-dashboard` do compose a publica na porta 3001. O `nginx.conf` abre CORS e não põe `remoteEntry.js` em cache. O shell, em produção, espera o remote num CDN (apps/shell/vite.config.ts:22) que nenhum artefato publica. Versão `0.1.0` com `private: true`.

**Interpretação:** O dashboard tem build e deploy separados, sem versionamento independente; o endereço de produção que o shell usa não é publicado no snapshot.

### 17. apps/shell/package.json:8; apps/shell/vite.config.ts:25-76; apps/shell/Dockerfile:2-33; apps/shell/nginx.conf:1-34; docker-compose.yml:5-16

**Observação:** Tem `tsc && vite build` e configuração próprios; o artefato só guarda a URL do remote. O Dockerfile copia para a imagem nginx só `apps/shell/dist`; o serviço `shell` a publica na porta 3000, com `depends_on` sobre `mfe-dashboard` e `bff`. Versão `0.1.0` com `private: true`.

**Interpretação:** O shell tem build e deploy separados, sem versionamento independente; trocar o endereço do remote exige reconstruí-lo.

### 18. README.md:3

**Observação:** "A complete example of a micro-frontend architecture using **Vite + React + Module Federation**, with a **NestJS BFF**".

**Interpretação:** Apresenta o repositório como arquitetura de micro-frontends com Module Federation e um BFF. A afirmação é corroborada.

### 19. README.md:11-16

**Observação:** "SHELL (Host) / Auth · Routing · Layout · State" […] "Dashboard MFE (remote)".

**Interpretação:** Descreve o shell como host, com autenticação, roteamento, layout e estado, e o dashboard como remote. A afirmação é corroborada.

### 20. README.md:14-16

**Observação:** "Chat MFE (remote)" […] "Tools MFE (remote)".

**Interpretação:** Afirma dois remotes além do dashboard. Eles só aparecem comentados na configuração e como placeholders nas rotas, e a afirmação é contradita.

### 21. README.md:21-22

**Observação:** "SHARED PACKAGES (via Federation) / @ai-portal/ui-kit · @ai-portal/shared-types".

**Interpretação:** Afirma que os pacotes internos são compartilhados pela federação. A afirmação é corroborada.

### 22. README.md:25-30

**Observação:** "BROWSER" […] "▼" […] "BFF (NestJS) / /api/auth · /api/chat · ...".

**Interpretação:** Afirma que as unidades no navegador chamam o BFF. O BFF existe com essas rotas, mas nenhuma unidade frontend o chama, e a afirmação é contradita.

### 23. README.md:46

**Observação:** "MFE Admin | 3004 | Admin panel".

**Interpretação:** Afirma um MFE Admin com porta própria. Ele não tem diretório, rota nem remote ativo, e a afirmação é contradita.

### 24. README.md:61

**Observação:** "Build Shared Packages (required first!)".

**Interpretação:** Afirma que o build das aplicações depende do build prévio dos pacotes. A afirmação é corroborada.

### 25. README.md:70

**Observação:** "MFEs must be built before running — Module Federation needs the `remoteEntry.js` file."

**Interpretação:** Afirma que o remote precisa ser construído para servir o `remoteEntry.js`. A configuração gera o arquivo e o shell o busca, mas que o plugin só o gere no build é comportamento da ferramenta; a afirmação é corroborada em parte.

### 26. README.md:103

**Observação:** "You should see the Dashboard MFE loaded inside the Shell".

**Interpretação:** Afirma que o dashboard é renderizado dentro do shell. A afirmação é corroborada.

### 27. README.md:115

**Observação:** "The Shell (host) can run `npm run dev` because it *consumes* remotes, not *exposes* them."

**Interpretação:** Distingue os papéis de consumidor e de provedor de módulos. A afirmação é corroborada.

### 28. README.md:142-143

**Observação:** "turbo.json              # Turborepo config" / "package.json            # Workspace root".

**Interpretação:** Descreve a raiz como workspace e o `turbo.json` como configuração do Turborepo. A afirmação é corroborada.

### 29. README.md:150

**Observação:** "MFEs expose components that the Shell loads at runtime".

**Interpretação:** Afirma a carga em runtime de componentes expostos pelo remote. A afirmação é corroborada.

### 30. README.md:168

**Observação:** "Packages listed in `shared` are **provided by the Shell** at runtime. MFEs don't bundle their own copies."

**Interpretação:** Afirma que o host fornece as dependências compartilhadas. Os dois lados as declaram como singleton, mas o bundle gerado não está no snapshot e o dashboard também roda sozinho; a afirmação é corroborada em parte.

### 31. README.md:170

**Observação:** "**Rule:** Shared packages must be installed on the Shell (host)."

**Interpretação:** Afirma que todo pacote compartilhado é dependência do host. A afirmação é corroborada.

### 32. README.md:183

**Observação:** "Develop MFEs in standalone mode first".

**Interpretação:** Afirma que o remote roda sem o shell. A afirmação é corroborada.

### 33. README.md:187-196

**Observação:** "Static Assets to CDN" […] "aws s3 sync apps/shell/dist/ s3://cdn/shell/" / "aws s3 sync apps/mfe-dashboard/dist/ s3://cdn/mfe-dashboard/".

**Interpretação:** Descreve a publicação de cada aplicação num prefixo de CDN. O shell busca o remote em `/mfeDashboard/remoteEntry.js`, e não em `mfe-dashboard/assets/`, e a afirmação é contradita.

### 34. README.md:201

**Observação:** "Production: Set CDN_URL for remote URLs".

**Interpretação:** Afirma que a URL de produção do remote vem de `CDN_URL`. A afirmação é corroborada.

### 35. README.md:207

**Observação:** "Each app has independent quality metrics. See `sonar-project.properties` in each app directory."

**Interpretação:** Afirma métricas de qualidade independentes por aplicação. O arquivo não existe em nenhum diretório, e a afirmação é contradita.

### 36. README.md:226-248

**Observação:** "Production Build" […] "docker-compose up -d" […] "Services will be available at: - Shell: http://localhost:3000 - MFE Dashboard: http://localhost:3001".

**Interpretação:** Descreve um contêiner por aplicação, cada um no seu endereço. A afirmação é corroborada.

### 37. README.md:279

**Observação:** "**Module Federation:** @originjs/vite-plugin-federation".

**Interpretação:** Nomeia o plugin de federação. A afirmação é corroborada.

### 38. apps/mfe-dashboard/nginx.conf:21

**Observação:** "remoteEntry.js - never cache (Shell needs latest)".

**Interpretação:** Afirma que o servidor do remote entrega sempre o `remoteEntry.js` mais recente ao shell. A afirmação é corroborada.

### 39. packages/shared-types/src/index.ts:1

**Observação:** "Shared Types across all MFEs and BFF".

**Interpretação:** Afirma que o pacote de tipos é comum às unidades frontend e ao BFF. O BFF não o declara nem importa, e a afirmação é contradita.

### 40. packages/shared-types/src/index.ts:47

**Observação:** "MFE Props - passed from Shell to MFEs".

**Interpretação:** Afirma que a interface `MfeProps` é o contrato de props do shell com os remotes. A afirmação é corroborada.

### 41. 2a87116 2026-01-30 (package.json, turbo.json); 26c3601 2026-01-30 (Dockerfiles)

**Observação:** O `package.json` e o `turbo.json` da raiz têm um único commit, e os Dockerfiles, criados depois, não mudam. Nenhum commit cria ou remove workflow de CI ou script, e nenhum remove arquivo.

**Interpretação:** Nunca houve uma automação que invocasse `turbo` e tenha sido apagada. O ponto está esclarecido, e a dependência continua indeterminada.

### 42. 2a87116 2026-01-30 (apps/shell/vite.config.ts, apps/shell/src/vite-env.d.ts); 26c3601 2026-01-30 (docker-compose.yml)

**Observação:** A configuração do shell com os remotes Chat, Tools e Admin comentados e as declarações de tipo deles têm um único commit; o compose, com `mfe-chat` comentado, também. Nenhum commit cria diretório ou arquivo para esses remotes.

**Interpretação:** São remotes previstos e nunca conectados, não remotes removidos. O ponto está esclarecido.

### 43. 2a87116 2026-01-30 (apps/shell/src/context/AuthContext.tsx); d0748ce 2026-01-30 (apps/shell/src/App.tsx, apps/shell/src/main.tsx, versões anteriores ausentes); 912587f 2026-01-30 (apps/mfe-dashboard/src/DashboardApp.tsx, versão anterior ausente)

**Observação:** O `AuthContext`, com o usuário fictício e os comentários "In real app: … BFF", tem um único commit. Os outros arquivos frontend mudam em commits que anunciam mover o `AuthProvider` e remover imports.

**Interpretação:** A ligação com o BFF é uma intenção desde a primeira presença, não uma chamada abandonada. O ponto está esclarecido, delimitado ao `AuthContext`.

### 44. 26c3601 2026-01-30 (docker-compose.dev.yml, README.md, versão ausente); f1fd5b0 2026-01-30 (README.md)

**Observação:** O `docker-compose.dev.yml` é criado junto com uma alteração do README e não muda depois; o README muda de novo no snapshot. As versões anteriores do README não estão disponíveis.

**Interpretação:** Não se sabe se a exigência de `build` + `preview` já estava no README quando o compose de desenvolvimento foi criado. A dúvida é só sobre o passado: no snapshot, as duas instruções divergem.

### 45. 2a87116 2026-01-30 (apps/shell/vite.config.ts, README.md, versão ausente); 26c3601 2026-01-30 (README.md, versão ausente); f1fd5b0 2026-01-30 (README.md)

**Observação:** A configuração do shell, com `${CDN_URL}/mfeDashboard/remoteEntry.js`, tem um único commit. O README tem três, e nenhuma versão anterior está disponível.

**Interpretação:** Não se sabe quando a seção de deploy para CDN entrou nem se já divergia do shell. A dúvida é só sobre o passado: no snapshot, o prefixo diverge.

### 46. 2a87116 2026-01-30, 26c3601 2026-01-30, f1fd5b0 2026-01-30 (README.md; sonar-project.properties, log vazio)

**Observação:** O `log` dos caminhos `sonar-project.properties` é vazio, e nenhum commit tem arquivo de Sonar ou remove arquivo.

**Interpretação:** O arquivo nunca existiu; a menção do README não é resto de configuração removida. O ponto está esclarecido.

### 47. 2a87116 2026-01-30 (packages/shared-types/src/index.ts, apps/bff/package.json); 3ced632 2026-01-30 (apps/bff/src/chat/chat.service.ts)

**Observação:** O pacote de tipos e o manifesto do BFF têm um único commit, e o manifesto nunca declarou `@ai-portal/shared-types`. O serviço de chat muda num commit que anuncia exportar as próprias interfaces do BFF.

**Interpretação:** O compartilhamento com o BFF é uma intenção do comentário desde a primeira presença, não um uso abandonado. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/mfe-dashboard/package.json:21) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (apps/shell/package.json:22) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5; declara #6 |
| 3 | 3.4.2 (package.json:18) | 1 tecnologia | manifesto | — | contexto | ambígua | declara turbo.json:3-25 |
| 4 | 3.4.2 (apps/mfe-dashboard/package.json:21, Evidência); 3.4.3 (apps/mfe-dashboard, Marcadores e Build); 3.4.4 (apps/shell/src/App.tsx:7, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #4, #8, #10, #12, #13, #16 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #11; configura #15 |
| 5 | 3.4.2 (apps/shell/package.json:22, Evidência); 3.4.3 (apps/shell, Marcadores e Build); 3.4.4 (apps/shell/src/App.tsx:7, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida), #2 (Artefatos); 3.4.7 #3, #4, #6, #8, #10, #13, #14, #16, #17 (Evidência); 3.4.8 #2 (Origem) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #12; configura #15 |
| 6 | 3.4.4 (apps/shell/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 7 | 3.4.4 (apps/shell/src/App.tsx:165) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 8 | 3.4.4 (apps/shell/src/App.tsx:172) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #15 |
| 9 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 10 | 3.4.3 (apps/bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 11 | 3.4.3 (apps/mfe-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (packages/shared-types) | 4 estrutura | diretório | — | contexto | fraca | — |
| 14 | 3.4.3 (packages/ui-kit) | 4 estrutura | diretório | — | contexto | fraca | — |
| 15 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #12; liga #11 |
| 16 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #11 |
| 17 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #12 |
| 18 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #11; corrobora #12; corrobora #10; corrobora #1; corrobora #2; corrobora #15 |
| 19 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #7; corrobora apps/shell/src/App.tsx:57-118; corrobora apps/shell/src/context/AuthContext.tsx:14-49 |
| 20 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #5; contradiz #7; contradiz apps/shell/src/App.tsx:150-158 |
| 21 | 3.4.7 #4 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #4; corrobora #5; corrobora apps/shell/src/App.tsx:3; corrobora apps/mfe-dashboard/src/DashboardApp.tsx:2-3; corrobora apps/shell/src/context/AuthContext.tsx:2 |
| 22 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/shell/src/context/AuthContext.tsx:14-34 |
| 23 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #5; contradiz #7; contradiz apps/shell/src/App.tsx:61-66 |
| 24 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/shell/package.json:14-15; corrobora apps/mfe-dashboard/package.json:14-15; corrobora turbo.json:4-6; corrobora #16; corrobora #17 |
| 25 | 3.4.7 #8 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #4; corrobora em parte #5; corrobora em parte apps/mfe-dashboard/package.json:8-9 |
| 26 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #15 |
| 27 | 3.4.7 #10 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #15; corrobora #5; corrobora #4 |
| 28 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | corrobora #9; corrobora turbo.json:3-25 |
| 29 | 3.4.7 #12 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #6; corrobora #15; corrobora #4 |
| 30 | 3.4.7 #13 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #5; corrobora em parte #4; corrobora em parte apps/shell/package.json:14-18 |
| 31 | 3.4.7 #14 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora apps/shell/package.json:14-18; corrobora #5 |
| 32 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora apps/mfe-dashboard/src/main.tsx:7-26 |
| 33 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #5; contradiz #4 |
| 34 | 3.4.7 #17 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #5; corrobora #15 |
| 35 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/mfe-dashboard/package.json:6-12; contradiz apps/shell/package.json:6-12 |
| 36 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17 |
| 37 | 3.4.7 #20 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #15 |
| 38 | 3.4.7 #21 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #16 |
| 39 | 3.4.7 #22 | 7 documentação | comentário | — | contexto | fraca | contradiz apps/bff/package.json:15-30; contradiz apps/bff/src/chat/chat.service.ts:3-16 |
| 40 | 3.4.7 #23 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #8; corrobora packages/shared-types/src/index.ts:48-51 |
| 41 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #3 |
| 42 | 3.4.8 #2 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #5; explica #7; explica #20; explica #23 |
| 43 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #22 |
| 44 | 3.4.8 #4 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #25 |
| 45 | 3.4.8 #5 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #33 |
| 46 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #35 |
| 47 | 3.4.8 #7 | 8 histórico | histórico | — | contexto | fraca | explica #39 |

## Resumo

Observações: 47. Dimensões (tecnologia: 3, configuração: 2, código: 3, estrutura: 6, composição: 1, build-deploy: 2, documentação: 23, histórico: 7). Força (forte: 4, moderada: 6, fraca: 36, ambígua: 1). Evidência (tecnológica: 11, arquitetural: 25, contexto: 11).
