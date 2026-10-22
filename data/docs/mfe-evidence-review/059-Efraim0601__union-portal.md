---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
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
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Leitura do repositório

A arquitetura se sustenta por uma cadeia completa de Native Federation:
- **Dependência:** `@angular-architects/native-federation` (#2).
- **Configuração:**
  - os targets `build` e `serve` das três aplicações usam o builder da federação (#3 a #8);
  - nos `federation.config.js`, os remotes expõem `./Routes`, e as três aplicações configuram dependências compartilhadas (#9 a #11);
  - os manifestos de desenvolvimento e de produção dão ao shell os endereços dos dois remotes (#12, #13).
- **Código:** o shell inicializa a federação com o manifesto (#24, #25) e carrega as rotas de cada remote por nome (#22, #23, #27).
- **Relações:** isso resulta nas duas relações ativas, shell → diaspora e shell → promote (#34, #35). Elas ligam três unidades com limites confirmados (#30 a #32).

Build e deploy mostram unidades separadas no build e juntas no deploy (#37 a #39). A separação de publicação não aparece neste repositório.

Três sinais enganam se lidos sozinhos:
- **Dependência sem uso:** `@softarc/native-federation-node` está declarada e não é usada (#1). O histórico não diz quando ela entrou (#66), mas isso não muda a leitura do snapshot.
- **Inicializações que não compõem:** os remotes também chamam `initFederation` e fazem o bootstrap assíncrono (#14 a #20, exceto #16). São construções de federação que só servem ao modo standalone da própria unidade.
- **Sessão compartilhada só no papel:** a biblioteca de sessão compartilhada existe (#28), e a documentação a anuncia várias vezes (#42, #50, #51, #65). Nenhuma aplicação a usa.

A única ambiguidade arquitetural é o iframe do fluxo legado (#26, #36). Os comentários que o acompanham são desmentidos pelo nginx do snapshot (#61, #63), e o histórico não resolve a dúvida (#67).

A documentação tem 26 afirmações, todas fracas pelo critério do protocolo: 16 corroboradas, 1 parcial, 7 contraditas e 2 sem corroboração. Ficam como contexto, e não como evidência de MFE:
- a raiz de coordenação (#29) e o backend de OTP (#33);
- as afirmações sobre sistemas externos e backends (#46, #52, #53, #56).

## Observações

### 1. package.json:28

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarada em `dependencies`. Não há import nem invocação dela nos arquivos de código e de build do snapshot.

**Interpretação:** Uma tecnologia de federação é declarada e não é usada. É um sinal enganoso.

### 2. package.json:39

**Observação:** `@angular-architects/native-federation` (`21.2.5`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente. A configuração e o código a usam.

### 3. angular.json:52-64

**Observação:** O target `build` do projeto `shell` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild`.

**Interpretação:** O build do shell está configurado para Native Federation.

### 4. angular.json:66-75

**Observação:** O target `serve` do projeto `shell` usa o builder `@angular-architects/native-federation:build` em modo `dev`.

**Interpretação:** O servidor de desenvolvimento do shell passa pela federação.

### 5. angular.json:178-190

**Observação:** O target `build` do projeto `promote` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild`.

**Interpretação:** O build do promote está configurado para Native Federation.

### 6. angular.json:192-201

**Observação:** O target `serve` do projeto `promote` usa o builder `@angular-architects/native-federation:build` em modo `dev`.

**Interpretação:** O servidor de desenvolvimento do promote passa pela federação, o que permite rodá-lo sozinho.

### 7. angular.json:305-317

**Observação:** O target `build` do projeto `diaspora` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild`.

**Interpretação:** O build do diaspora está configurado para Native Federation.

### 8. angular.json:319-328

**Observação:** O target `serve` do projeto `diaspora` usa o builder `@angular-architects/native-federation:build` em modo `dev`.

**Interpretação:** O servidor de desenvolvimento do diaspora passa pela federação, o que permite rodá-lo sozinho.

### 9. projects/diaspora/federation.config.js:1-33

**Observação:** `withNativeFederation` declara `name: 'diaspora'`, expõe `./Routes` (`./projects/diaspora/src/app/remote.routes.ts`) e configura `shared` com `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Declara também exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** O diaspora está configurado como remote, oferece suas rotas a um host e configura o compartilhamento de dependências, com as exclusões declaradas.

### 10. projects/promote/federation.config.js:1-33

**Observação:** `withNativeFederation` declara `name: 'promote'`, expõe `./Routes` (`./projects/promote/src/app/remote.routes.ts`) e configura `shared` com `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Declara também exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** O promote está configurado como remote, oferece suas rotas a um host e configura o compartilhamento de dependências, com as exclusões declaradas.

### 11. projects/shell/federation.config.js:1-28

**Observação:** `withNativeFederation` declara `name: 'shell'`, sem expor módulos, e configura `shared` com `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Declara também exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** O shell está configurado como participante da federação e configura o compartilhamento de dependências, com as exclusões declaradas.

### 12. projects/shell/public/federation.manifest.json:2-3

**Observação:** O manifesto do shell mapeia `promote` para `http://localhost:4201/remoteEntry.json` e `diaspora` para `http://localhost:4202/remoteEntry.json`.

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los em desenvolvimento.

### 13. deploy/federation.manifest.prod.json:2-3; Dockerfile:42-43

**Observação:** O manifesto de produção mapeia `promote` para `/remotes/promote/remoteEntry.json` e `diaspora` para `/remotes/diaspora/remoteEntry.json`. A imagem o copia sobre o manifesto de desenvolvimento.

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los em produção, na mesma origem.

### 14. projects/diaspora/src/main.ts:3-5

**Observação:** `import('./bootstrap')` depois de `initFederation()`.

**Interpretação:** É um bootstrap assíncrono interno à unidade, que não compõe outra.

### 15. projects/promote/src/main.ts:3-5

**Observação:** `import('./bootstrap')` depois de `initFederation()`.

**Interpretação:** É um bootstrap assíncrono interno à unidade, que não compõe outra.

### 16. projects/shell/src/main.ts:3-5

**Observação:** `import('./bootstrap')` depois de `initFederation('federation.manifest.json')`.

**Interpretação:** É um bootstrap assíncrono interno ao shell. A composição está nas linhas #24 e #25.

### 17. projects/diaspora/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o runtime de federação do modo standalone da própria unidade.

### 18. projects/diaspora/src/main.ts:3

**Observação:** `initFederation()`, sem manifesto.

**Interpretação:** O runtime standalone não resolve nenhuma outra unidade. O shell consome `./Routes` diretamente e não passa por este `main`.

### 19. projects/promote/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o runtime de federação do modo standalone da própria unidade.

### 20. projects/promote/src/main.ts:3

**Observação:** `initFederation()`, sem manifesto.

**Interpretação:** O runtime standalone não resolve nenhuma outra unidade. O shell consome `./Routes` diretamente e não passa por este `main`.

### 21. projects/shell/src/app/app.routes.ts:2

**Observação:** Importa `loadRemoteModule` de `@angular-architects/native-federation`.

**Interpretação:** O mecanismo de carga remota está disponível nas rotas do shell.

### 22. projects/shell/src/app/app.routes.ts:11-13

**Observação:** A rota `promote` carrega os filhos com `loadRemoteModule('promote', './Routes').then((m) => m.routes)`.

**Interpretação:** O shell carrega as rotas do promote em runtime.

### 23. projects/shell/src/app/app.routes.ts:16-18

**Observação:** A rota `diaspora` carrega os filhos com `loadRemoteModule('diaspora', './Routes').then((m) => m.routes)`.

**Interpretação:** O shell carrega as rotas do diaspora em runtime.

### 24. projects/shell/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** O runtime de federação do host está disponível.

### 25. projects/shell/src/main.ts:3-5

**Observação:** `initFederation('federation.manifest.json')` antes do bootstrap.

**Interpretação:** O host resolve as entradas dos remotes pelo manifesto antes de iniciar.

### 26. projects/diaspora/src/app/pages/legacy-onboarding.ts:31-36; projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 53-54; projects/diaspora/src/app/app.routes.ts:11

**Observação:** Uma rota ativa renderiza um `<iframe>`. O `src` vem da global `__LEGACY_ONBOARDING_URL__` ou, na falta dela, do caminho relativo `/open-account-flow-test`. Nenhum dos dois está definido ou implementado no snapshot.

**Interpretação:** Pode haver a incorporação de um frontend legado, mas o destino não é observável.

### 27. projects/shell/src/app/app.routes.ts:9-20; projects/shell/src/app/app.config.ts:7-10

**Observação:** As rotas do host nomeiam `promote` e `diaspora`, e a rota vazia redireciona para `diaspora/home`. As rotas estão registradas na configuração do shell.

**Interpretação:** O roteamento do host declara a relação host → remotes.

### 28. projects/auth/src/lib/client-auth-store.ts:71; projects/auth/src/lib/client-auth-store.ts:68-75

**Observação:** A biblioteca `projects/auth` registra um listener do evento `storage` para sincronizar a sessão. Nenhuma aplicação importa a biblioteca.

**Interpretação:** Um mecanismo de comunicação entre aplicações está implementado e não está conectado.

### 29. .; package.json:1-17; angular.json:20-21, 146-147, 273-274

**Observação:** A raiz tem o `angular.json` e o `package.json` do workspace, sem UI própria. Os targets pertencem às três aplicações em `projects/`.

**Interpretação:** É a raiz de coordenação de um monorepo, e não uma unidade.

### 30. projects/diaspora; angular.json:332; projects/diaspora/src/main.ts:1-6; projects/diaspora/src/bootstrap.ts:1-5; angular.json:305-317

**Observação:** É um projeto do `angular.json` com entrada (`main.ts` → `bootstrap.ts`) e target de build próprios, sem manifesto local.

**Interpretação:** É uma unidade frontend com limite próprio.

### 31. projects/promote; angular.json:205; projects/promote/src/main.ts:1-6; projects/promote/src/bootstrap.ts:1-5; angular.json:178-190

**Observação:** É um projeto do `angular.json` com entrada (`main.ts` → `bootstrap.ts`) e target de build próprios, sem manifesto local.

**Interpretação:** É uma unidade frontend com limite próprio.

### 32. projects/shell; angular.json:79; projects/shell/src/main.ts:1-6; projects/shell/src/bootstrap.ts:1-5; angular.json:52-64

**Observação:** É um projeto do `angular.json` com entrada (`main.ts` → `bootstrap.ts`) e target de build próprios, sem manifesto local.

**Interpretação:** É uma unidade frontend com limite próprio.

### 33. server/diaspora-otp; server/diaspora-otp/package.json:1-16; server/diaspora-otp/index.js:18; deploy/test/Dockerfile.otp:5-9

**Observação:** É o pacote de um servidor Express de OTP, com imagem própria e sem entrada de UI.

**Interpretação:** É um backend no mesmo repositório, e não uma unidade frontend.

### 34. projects/shell/src/app/app.routes.ts:16-18; projects/shell/public/federation.manifest.json:3; deploy/federation.manifest.prod.json:3; projects/diaspora/federation.config.js:4-9

**Observação:** O shell carrega `./Routes` de `diaspora`. O nome é resolvido pelos manifestos e corresponde ao nome e ao módulo exposto na configuração do diaspora.

**Interpretação:** É uma relação host → remote ativa.

### 35. projects/shell/src/app/app.routes.ts:11-13; projects/shell/public/federation.manifest.json:2; deploy/federation.manifest.prod.json:2; projects/promote/federation.config.js:4-9

**Observação:** O shell carrega `./Routes` de `promote`. O nome é resolvido pelos manifestos e corresponde ao nome e ao módulo exposto na configuração do promote.

**Interpretação:** É uma relação host → remote ativa.

### 36. projects/diaspora/src/app/pages/legacy-onboarding.ts:31-36; projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 53-54; deploy/nginx.conf:128-130

**Observação:** O diaspora embute por iframe o caminho `/open-account-flow-test`. O snapshot não tem override nem implementação desse caminho, e o nginx manda os caminhos não mapeados para o shell.

**Interpretação:** É uma relação page → embedded-frontend com destino e atividade indeterminados.

### 37. angular.json:305-317; Dockerfile:22; Dockerfile:41; docker-compose.yml:19-23; deploy/server/components.env:65-70

**Observação:** O diaspora tem target e `ng build` próprios, com `base-href` `/remotes/diaspora/`. O artefato é copiado para a imagem do portal, que é um único serviço no compose e um único componente no deploy.

**Interpretação:** Há uma fronteira de build própria, mas não uma fronteira de deploy.

**Nota:** O build do diaspora também carrega os arquivos do MediaPipe que o nginx serve na raiz para as duas aplicações (deploy/nginx.conf:42-52). É um acoplamento de deploy entre unidades (#60).

### 38. angular.json:178-190; Dockerfile:21; Dockerfile:40; docker-compose.yml:19-23; deploy/server/components.env:65-70

**Observação:** O promote tem target e `ng build` próprios, com `base-href` `/remotes/promote/`. O artefato é copiado para a mesma imagem.

**Interpretação:** Há uma fronteira de build própria, mas não uma fronteira de deploy.

### 39. angular.json:52-64; Dockerfile:20; Dockerfile:38; Dockerfile:43; deploy/server/deploy.sh:153

**Observação:** O shell tem target e `ng build` próprios (`--base-href /`). O artefato é copiado para a raiz da mesma imagem, que também recebe o manifesto de produção (Dockerfile:43). O script de deploy reconstrói a imagem e recria o serviço (`--build --force-recreate`).

**Interpretação:** Há uma fronteira de build própria, mas não uma fronteira de deploy. Pelo fluxo de deploy registrado, mudar o manifesto que liga os remotes exige republicar a imagem conjunta.

### 40. Dockerfile:2-3

**Observação:** "image unique (gateway) servant shell + promote + diaspora […] une seule origine".

**Interpretação:** Descreve o deploy conjunto das três aplicações numa só origem. A afirmação é corroborada.

### 41. Dockerfile:3

**Observação:** "Architecture host/remotes (Native Federation)".

**Interpretação:** Descreve a composição host/remotes com a tecnologia usada. A afirmação é corroborada.

### 42. Dockerfile:3

**Observação:** "(SSO partagé)".

**Interpretação:** Anuncia uma sessão compartilhada entre as unidades. A afirmação é contradita.

### 43. Dockerfile:8

**Observação:** "Stage 1 : build des 3 apps".

**Interpretação:** Descreve os três builds feitos dentro da imagem. A afirmação é corroborada.

### 44. Dockerfile:42

**Observação:** "Manifest de PROD (chemins same-origin) écrase celui de dev (localhost:*)".

**Interpretação:** Descreve a troca de manifesto que liga o deploy ao carregamento dos remotes. A afirmação é corroborada.

### 45. README.md:1

**Observação:** "Monorepo frontend".

**Interpretação:** Descreve as aplicações reunidas num monorepo. A afirmação é corroborada.

### 46. README.md:3

**Observação:** "reproduisant l'architecture de `portal-client-firstpay`".

**Interpretação:** Faz referência a um sistema externo, que não é verificável. A afirmação fica sem corroboração.

### 47. README.md:4

**Observação:** "(host + remotes via **module federation**)".

**Interpretação:** Nomeia uma tecnologia diferente da usada. A afirmação é contradita.

### 48. README.md:10-11

**Observação:** É um diagrama: o shell (`:4200`) chama `loadRemoteModule` para promote (`:4201`) e diaspora (`:4202`), e cada um "expose ./Routes".

**Interpretação:** Descreve as relações e os módulos expostos. A afirmação é corroborada.

### 49. README.md:13

**Observação:** "libs partagées : @union/design-system".

**Interpretação:** Apresenta uma biblioteca de design usada pelas três aplicações. A afirmação é corroborada.

### 50. README.md:13-14

**Observação:** "libs partagées : […] @union/auth".

**Interpretação:** Apresenta uma biblioteca de autenticação compartilhada. A afirmação é contradita.

### 51. README.md:20

**Observação:** "`@union/auth` partage la clé localStorage `portail_client_auth` (JWT, sync cross-tab)".

**Interpretação:** Anuncia uma sessão compartilhada por uma chave comum. A afirmação é contradita.

### 52. README.md:20-21

**Observação:** "interopérable avec les apps de la banque servies sur la même origine".

**Interpretação:** Anuncia interoperabilidade com sistemas externos, que não é verificável. A afirmação fica sem corroboração.

### 53. README.md:42-43

**Observação:** "Le frontend ne fonctionne pas seul : il appelle **deux backends** (dépôts séparés)".

**Interpretação:** Descreve a dependência de backends externos. A afirmação é corroborada.

### 54. README.md:52

**Observação:** "(app complète, standalone)", sobre o promote.

**Interpretação:** Afirma que o promote roda sozinho. A afirmação é corroborada.

### 55. README.md:114-116

**Observação:** "**4 composants**, chacun dans son dépôt […] **pilotés depuis union**, qui est le point de centralisation du déploiement".

**Interpretação:** Descreve o portal inteiro como um único componente de deploy. A afirmação é corroborada.

### 56. README.md:138-143

**Observação:** "Câblage API (proxy `deploy/nginx.conf`, origine unique — pas de CORS)".

**Interpretação:** Descreve o gateway como proxy das APIs. A afirmação é corroborada.

### 57. README.md:279-281

**Observação:** "l'adoption complète des composants `@union/design-system` dans les 17 pages est progressive".

**Interpretação:** Confirma-se que a adoção não está completa, mas não há artefato de que ela esteja em curso. A afirmação é parcial.

### 58. README.md:282

**Observação:** "les remotes tournent parfaitement en standalone".

**Interpretação:** Afirma que os dois remotes rodam sozinhos. A afirmação é corroborada.

### 59. README.md:282-284

**Observação:** "sous le host, les routes s'imbriquent (`/promote/…`, `/diaspora/…`)".

**Interpretação:** Afirma que as rotas dos remotes ficam aninhadas no host. A afirmação é corroborada.

### 60. deploy/nginx.conf:43-48

**Observação:** "On sert l'unique copie (identique entre remotes) à la racine, pour les deux apps".

**Interpretação:** Descreve um acoplamento de deploy entre as unidades. A afirmação é corroborada.

### 61. projects/diaspora/src/app/app.routes.ts:10

**Observação:** "embarque le parcours legacy FastAPI en iframe".

**Interpretação:** Anuncia a incorporação do fluxo legado. Com a configuração do snapshot, o iframe não recebe esse fluxo, e a afirmação é contradita.

### 62. projects/diaspora/src/app/core/admin-auth.ts:21-23

**Observação:** "`@union/auth` (ClientAuthStore) existe dans le monorepo mais n'est branché nulle part".

**Interpretação:** Reconhece que a biblioteca de sessão não está conectada. A afirmação é corroborada.

### 63. projects/diaspora/src/app/pages/legacy-onboarding.ts:16-17

**Observação:** "le reverse proxy sert le flux legacy sur le même domaine".

**Interpretação:** Atribui o destino do iframe a um proxy. O único proxy do snapshot não serve esse caminho, e a afirmação é contradita.

### 64. projects/shell/src/app/app.ts:5-6

**Observação:** "chaque remote (diaspora hub, promote) fournit son propre layout plein écran + en-tête. Le shell ne fait qu'orchestrer la fédération".

**Interpretação:** Descreve a divisão de papéis entre o host e os remotes. A afirmação é corroborada.

### 65. projects/shell/src/app/app.ts:7

**Observação:** "partager la session (SSO via ClientAuthStore, provisionné au bootstrap)".

**Interpretação:** Anuncia um provisionamento que o bootstrap não faz. A afirmação é contradita.

### 66. 012b229 2026-07-11 (package.json, versão ausente); cd974b8 2026-07-14 (package.json)

**Observação:** O `package.json` mudou em dois commits. A versão de `cd974b8` já declara a dependência, e a do commit inicial não está disponível.

**Interpretação:** Não se sabe quando nem por que a dependência sem uso entrou. A dúvida é só sobre o passado: no snapshot, a dependência não é usada.

### 67. 1e8d9fb 2026-07-15 (projects/diaspora/src/app/pages/legacy-onboarding.ts, projects/diaspora/src/app/app.routes.ts); 81b1158 2026-07-15 (deploy/nginx.conf, versão ausente); 092eff1 2026-07-16 (deploy/nginx.conf); bf7d95d 2026-07-16 (deploy/nginx.conf)

**Observação:** O commit que cria o iframe não toca no deploy. As mensagens dos commits seguintes no nginx anunciam o back-office e o MediaPipe, e uma versão anterior do nginx não está disponível.

**Interpretação:** O histórico não diz se alguma versão teve rota para o fluxo legado. Continuam plausíveis duas leituras do snapshot: o iframe incorpora um frontend legado servido por um proxy fora do repositório, ou o iframe não tem destino ativo.

### 68. 012b229 2026-07-11 (projects/auth/src/lib/client-auth-store.ts); 77c7b4f 2026-07-12 (projects/promote/src/app/core/auth.ts); 1cea70e 2026-07-15 (projects/diaspora/src/app/core/admin-auth.ts)

**Observação:** A biblioteca não muda desde o primeiro commit. Desde `1cea70e`, um comentário a declara não conectada. A versão inicial do `auth.ts` do promote não está disponível.

**Interpretação:** Não se exclui que as aplicações tenham usado a biblioteca antes. A dúvida é só sobre o passado: no snapshot, a biblioteca não está conectada.

### 69. 012b229 2026-07-11 (projects/design-system)

**Observação:** A pasta do design-system não muda desde o primeiro commit.

**Interpretação:** Não se sabe se a adoção dos componentes avançou ou recuou. A dúvida é só sobre o passado: no snapshot, nenhuma aplicação importa os componentes.

### 70. 012b229 2026-07-11 (projects/shell/src/bootstrap.ts, projects/shell/src/main.ts, projects/shell/src/app/app.config.ts, projects/shell/src/app/app.ts)

**Observação:** Os quatro arquivos aparecem no commit inicial com os mesmos identificadores de objeto do snapshot, e nenhum commit os altera.

**Interpretação:** O provisionamento anunciado no comentário nunca existiu nesses arquivos. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:28) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 2 | 3.4.2 (package.json:39) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #3; declara #4; declara #5; declara #6; declara #7; declara #8; declara #9; declara #10; declara #11; declara #17; declara #19; declara #21; declara #24 |
| 3 | 3.4.2 (package.json:39, Evidência); 3.4.3 (., Marcadores); 3.4.3 (projects/shell, Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #32 |
| 4 | 3.4.3 (., Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #32 |
| 5 | 3.4.3 (., Marcadores); 3.4.3 (projects/promote, Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #31 |
| 6 | 3.4.3 (., Marcadores); 3.4.7 #15, #19 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #31 |
| 7 | 3.4.3 (., Marcadores); 3.4.3 (projects/diaspora, Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #30 |
| 8 | 3.4.3 (., Marcadores); 3.4.7 #19 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #30 |
| 9 | 3.4.3 (projects/diaspora, Marcadores); 3.4.4 (projects/diaspora/src/main.ts:3, Observação); 3.4.5 #1 (Configuração); 3.4.7 #9 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #30; configura #34 |
| 10 | 3.4.3 (projects/promote, Marcadores); 3.4.4 (projects/promote/src/main.ts:3, Observação); 3.4.5 #2 (Configuração); 3.4.7 #9 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #31; configura #35 |
| 11 | 3.4.3 (projects/shell, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #32 |
| 12 | 3.4.4 (projects/shell/src/main.ts:1, Observação); 3.4.4 (projects/shell/src/main.ts:3, Observação); 3.4.5 #1, #2 (Configuração) | 2 configuração | configuração | native-federation | arquitetural | forte | configura #25; configura #34; configura #35 |
| 13 | 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #2 (Artefatos); 3.4.7 #5 (Evidência) | 2 configuração | configuração | native-federation | arquitetural | forte | configura #34; configura #35 |
| 14 | 3.4.4 (projects/diaspora/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 15 | 3.4.4 (projects/promote/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 16 | 3.4.4 (projects/shell/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 17 | 3.4.4 (projects/diaspora/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 18 | 3.4.4 (projects/diaspora/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 19 | 3.4.4 (projects/promote/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 20 | 3.4.4 (projects/promote/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 21 | 3.4.4 (projects/shell/src/app/app.routes.ts:2) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #34; implementa #35 |
| 22 | 3.4.4 (projects/shell/src/app/app.routes.ts:13) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #35 |
| 23 | 3.4.4 (projects/shell/src/app/app.routes.ts:18) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #34 |
| 24 | 3.4.4 (projects/shell/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #34; implementa #35 |
| 25 | 3.4.4 (projects/shell/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #34; implementa #35 |
| 26 | 3.4.4 (projects/diaspora/src/app/pages/legacy-onboarding.ts:31) | 3 código | código-fonte | iframe | arquitetural | ambígua | implementa #36 |
| 27 | 3.4.4 (projects/shell/src/app/app.routes.ts:9) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #34; implementa #35 |
| 28 | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 29 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 30 | 3.4.3 (projects/diaspora) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (projects/promote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.3 (projects/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (server/diaspora-otp) | 4 estrutura | diretório | — | contexto | fraca | — |
| 34 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #32; liga #30 |
| 35 | 3.4.5 #2 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #32; liga #31 |
| 36 | 3.4.5 #3 | 5 composição | código-fonte | iframe | arquitetural | ambígua | liga #30 |
| 37 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #30 |
| 38 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #31 |
| 39 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #32 |
| 40 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #37; corrobora #38; corrobora #39 |
| 41 | 3.4.7 #2 | 7 documentação | comentário | native-federation | arquitetural | fraca | corrobora #2; corrobora #34; corrobora #35 |
| 42 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #28; contradiz #62 |
| 43 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #37; corrobora #38; corrobora #39 |
| 44 | 3.4.7 #5 | 7 documentação | comentário | native-federation | arquitetural | fraca | corrobora #13 |
| 45 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #32 |
| 46 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | — |
| 47 | 3.4.7 #8 | 7 documentação | documentação | module-federation | tecnológica | fraca | contradiz #21; contradiz #2 |
| 48 | 3.4.7 #9 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #34; corrobora #35 |
| 49 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora angular.json:88; corrobora angular.json:214; corrobora angular.json:341 |
| 50 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #28; contradiz #62 |
| 51 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #28; contradiz projects/promote/src/app/core/auth.ts:7; contradiz projects/diaspora/src/app/core/admin-auth.ts:3 |
| 52 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | — |
| 53 | 3.4.7 #14 | 7 documentação | documentação | — | contexto | fraca | corrobora deploy/nginx.conf:72-87; corrobora deploy/server/components.env:35-39; corrobora deploy/server/components.env:50-54 |
| 54 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #6 |
| 55 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #37; corrobora #38; corrobora #39; corrobora deploy/server/components.env:15, 22-73; corrobora deploy/server/deploy.sh:35-40, 130-153 |
| 56 | 3.4.7 #17 | 7 documentação | documentação | — | contexto | fraca | corrobora deploy/nginx.conf:72-87 |
| 57 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte projects/design-system/src/public-api.ts:6-10; corrobora em parte projects/promote/src/styles.css:8, 12 |
| 58 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #6; corrobora #8 |
| 59 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #34; corrobora #35 |
| 60 | 3.4.7 #21 | 7 documentação | comentário | — | arquitetural | fraca | corrobora deploy/nginx.conf:51-52; corrobora projects/promote/src/app/shared/face-mesh.ts:51, 53; corrobora projects/diaspora/src/app/shared/face-mesh.ts:53, 65-66 |
| 61 | 3.4.7 #22 | 7 documentação | comentário | iframe | arquitetural | fraca | contradiz deploy/nginx.conf:128-130 |
| 62 | 3.4.7 #23 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #28 |
| 63 | 3.4.7 #24 | 7 documentação | comentário | — | arquitetural | fraca | contradiz deploy/nginx.conf:128-130 |
| 64 | 3.4.7 #25 | 7 documentação | comentário | — | arquitetural | fraca | corrobora projects/shell/src/app/app.ts:9-14; corrobora projects/promote/src/app/remote.routes.ts:35-36; corrobora projects/diaspora/src/app/pages/home.ts:29-31 |
| 65 | 3.4.7 #26 | 7 documentação | comentário | — | arquitetural | fraca | contradiz projects/shell/src/bootstrap.ts:1-5; contradiz projects/shell/src/app/app.config.ts:9-10 |
| 66 | 3.4.8 #1 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #1 |
| 67 | 3.4.8 #2 | 8 histórico | histórico | iframe | arquitetural | ambígua | explica #26; explica #36; explica #61; explica #63 |
| 68 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #28; explica #42; explica #50; explica #51 |
| 69 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #57 |
| 70 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #65 |

## Resumo

Observações: 70. Dimensões (tecnologia: 2, configuração: 11, código: 15, estrutura: 5, composição: 3, build-deploy: 3, documentação: 26, histórico: 5). Força (forte: 7, moderada: 18, fraca: 42, ambígua: 3). Evidência (tecnológica: 24, arquitetural: 40, contexto: 6).
