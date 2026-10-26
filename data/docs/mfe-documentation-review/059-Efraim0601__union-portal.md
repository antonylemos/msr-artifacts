---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Leitura do repositório

A documentação está em francês e tem duas camadas.
- **README:** é o único `.md` do repositório. Tem 286 linhas e funciona como manual de operação: arquitetura (README.md:7-31), desenvolvimento local, build, deploy em Docker, deploy centralizado dos quatro componentes da solução, HTTPS, pagamento e solução de problemas.
- **Comentários e campos descritivos:** foram lidos nos artefatos que as revisões anteriores citam:
  - package.json (`description`), tsconfig.json e angular.json;
  - os três `federation.config.js`, que só têm os comentários-padrão do gerador;
  - Dockerfile, deploy/nginx.conf, deploy/40-selfsigned-cert.sh, deploy/federation.manifest.prod.json e docker-compose.yml;
  - deploy/test/docker-compose.yml, deploy/test/Dockerfile.otp e deploy/test/Dockerfile.ocr;
  - deploy/server/deploy.sh, deploy/server/stop.sh e deploy/server/components.env;
  - projects/shell/src/main.ts, projects/shell/src/bootstrap.ts, projects/shell/src/app/app.config.ts, projects/shell/src/app/app.routes.ts e projects/shell/src/app/app.ts;
  - projects/promote/src/app/remote.routes.ts e projects/diaspora/src/app/remote.routes.ts;
  - projects/diaspora/src/app/app.routes.ts e projects/diaspora/src/app/pages/legacy-onboarding.ts;
  - projects/auth/src/lib/client-auth-store.ts e projects/diaspora/src/app/core/admin-auth.ts;
  - server/diaspora-otp/index.js e server/diaspora-otp/package.json.

Quase tudo o que a documentação diz sobre a organização das unidades confere com as revisões anteriores: monorepo, host e remotes em Native Federation, imagem única numa só origem, manifesto de produção, rotas aninhadas e remotes que também rodam sozinhos. Quatro pontos destoam.
- **Tecnologia:** a abertura do README chama a federação de "module federation", e a própria linha 17 corrige para Native Federation.
- **Login compartilhado:** a documentação afirma em vários lugares uma sessão compartilhada (SSO) por meio da biblioteca `@union/auth`. A biblioteca implementa o mecanismo, mas nenhuma aplicação a usa.
- **Bibliotecas compartilhadas:** o README apresenta `@union/auth` como uma das "libs partagées", o que o snapshot desmente pelo mesmo motivo.
- **Fluxo legado:** um comentário diz que o reverse proxy serve o fluxo legado no mesmo domínio, mas o nginx do snapshot manda esse caminho para o shell.

Ficaram fora da tabela, por não tratarem das unidades como conjunto (critério de afirmação arquitetural, passo 3 do método em `INSTRUCTIONS.md`), mas vale registrá-los:
- **Detalhes da infraestrutura:**
  - **Certificado:** a imagem gera um certificado autoassinado na partida, caso ainda não exista (Dockerfile:34-36; deploy/40-selfsigned-cert.sh:16-27).
  - **Upstreams:** os endereços dos backends vêm de variáveis de ambiente (Dockerfile:26-33).
  - **Porta HTTPS:** o README dá 8443 como porta HTTPS local padrão (README.md:182-183, 187), mas o compose declara 6443 (docker-compose.yml:29). É uma inconsistência de documentação.
  - **Stack de teste:** tem um backend local, e o compose publica o portal só em loopback (deploy/test/docker-compose.yml:27). O comentário informa acesso por um túnel da Cloudflare, que fica fora do snapshot (deploy/test/docker-compose.yml:8-9).
  - **Back-office:** o gateway encaminha os caminhos do back-office do diaspora ao backend, na mesma origem (deploy/nginx.conf:101-123). O comentário o descreve como renderizado pelo backend, que não está no snapshot (deploy/nginx.conf:96-98).
- **Detalhes internos das unidades:**
  - **Promote:** fornece `HttpClient`, `Api` e `Auth` nas rotas expostas para não herdar o injetor do shell (projects/promote/src/app/remote.routes.ts:26-33).
  - **Diaspora:** faz o mesmo com `HttpClient` (projects/diaspora/src/app/remote.routes.ts:9-15).
  - **Autenticação do diaspora:** é simulada só em desenvolvimento (projects/diaspora/src/app/core/admin-auth.ts:24-27).
- **Relações só entre backends:**
  - **OTP e OCR:** o servidor OTP repassa as requisições ao serviço OCR (server/diaspora-otp/index.js:26-27).
  - **Chave de API:** fica no servidor (server/diaspora-otp/package.json:6).
- **Aparência e sistemas externos:**
  - **Tokens:** seriam iguais aos de um sistema do banco (README.md:18-19).
  - **Componentes externos:** equipes, stacks e ciclos dos componentes externos (README.md:114-115).
- **Trecho desatualizado:** o README manda acrescentar ao `deploy/nginx.conf` um `location /api` que já existe (README.md:104-106; deploy/nginx.conf:86-87).

Ocorrências `doc-*` que não viraram linha: README.md:50 e README.md:54, que são instruções de execução (`serve:all` e `serve:shell`). As demais (README.md:4, 10, 17, 27, 282) estão nas afirmações 2, 8, 9 e 19.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | Dockerfile:2-3 | "image unique (gateway) servant shell + promote + diaspora […] une seule origine" (imagem única que serve as três aplicações numa só origem) | build-deploy | corroborada | 3.4.6 #1-#3 (deploy `conjunto`); Dockerfile:38-41; deploy/nginx.conf:31-40, 128-130 |
| 2 | Dockerfile:3 | "Architecture host/remotes (Native Federation)" | estrutura | corroborada | 3.4.2 (tecnologia `native-federation`); 3.4.5 #1-#2; projects/shell/src/app/app.routes.ts:2 |
| 3 | Dockerfile:3 | "(SSO partagé)" (login compartilhado) | composição | contradita | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71, Composição `No`); projects/diaspora/src/app/core/admin-auth.ts:21-23; projects/shell/src/app/app.config.ts:9-10 |
| 4 | Dockerfile:8 | "Stage 1 : build des 3 apps" (os três builds são feitos na imagem) | build-deploy | corroborada | 3.4.6 (Leitura); Dockerfile:9-22 |
| 5 | Dockerfile:42 | "Manifest de PROD (chemins same-origin) écrase celui de dev (localhost:*)" (o manifesto de produção substitui o de desenvolvimento) | build-deploy | corroborada | 3.4.5 #1-#2 (Configuração); Dockerfile:43; deploy/federation.manifest.prod.json:2-3 |
| 6 | README.md:1 | "Monorepo frontend" | estrutura | corroborada | 3.4.3 (Workspace e três aplicações em `projects/`); angular.json:20-21, 146-147, 273-274 |
| 7 | README.md:3 | "reproduisant l'architecture de `portal-client-firstpay`" (reproduz a arquitetura de outro portal) | outro | sem corroboração | — |
| 8 | README.md:4 | "(host + remotes via **module federation**)" | composição | contradita | 3.4.2 (tecnologia `native-federation`, não `module-federation`); projects/shell/src/app/app.routes.ts:2 |
| 9 | README.md:10-11 | "shell (host, :4200) ──loadRemoteModule──► promote (remote, :4201) expose ./Routes / diaspora (remote, :4202) expose ./Routes" | composição | corroborada | 3.4.5 #1-#2; projects/shell/src/app/app.routes.ts:13, 18; projects/promote/federation.config.js:4-10; projects/diaspora/federation.config.js:4-10 |
| 10 | README.md:13 | "libs partagées : @union/design-system" (biblioteca de design compartilhada) | estrutura | corroborada | angular.json:88, 214, 341 (tokens nos três builds) |
| 11 | README.md:13-14 | "libs partagées : […] @union/auth" (biblioteca de autenticação compartilhada) | estrutura | contradita | 3.4.4 (sem import de aplicação); tsconfig.json:20; projects/diaspora/src/app/core/admin-auth.ts:21-23 |
| 12 | README.md:20 | "`@union/auth` partage la clé localStorage `portail_client_auth` (JWT, sync cross-tab)" (a sessão é compartilhada pela chave comum, com sincronização entre abas) | composição | contradita | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71, Composição `No`); projects/promote/src/app/core/auth.ts:7; projects/diaspora/src/app/core/admin-auth.ts:3 |
| 13 | README.md:20-21 | "interopérable avec les apps de la banque servies sur la même origine" (a sessão interopera com as aplicações do banco) | composição | sem corroboração | — |
| 14 | README.md:42-43 | "Le frontend ne fonctionne pas seul : il appelle **deux backends** (dépôts séparés)" (o frontend depende de dois backends em outros repositórios) | estrutura | corroborada | deploy/nginx.conf:72-87; deploy/server/components.env:35-39, 50-54 |
| 15 | README.md:52 | "(app complète, standalone)" (o promote roda sozinho como aplicação completa) | independência | corroborada | 3.4.3 (entrada e build próprios do promote); angular.json:192 (target `serve` do promote) |
| 16 | README.md:114-116 | "**4 composants**, chacun dans son dépôt […] **pilotés depuis union**, qui est le point de centralisation du déploiement" (quatro componentes, cada um no seu repositório, com deploy dirigido daqui) | estrutura | corroborada | 3.4.6 (Leitura); deploy/server/components.env:15, 22-73; deploy/server/deploy.sh:35-40, 130-153 |
| 17 | README.md:138-143 | "Câblage API (proxy `deploy/nginx.conf`, origine unique — pas de CORS)" (o gateway faz proxy das APIs) | build-deploy | corroborada | 3.4.6 (Leitura); deploy/nginx.conf:72-87 |
| 18 | README.md:279-281 | "l'adoption complète des composants `@union/design-system` dans les 17 pages est progressive" (os componentes do design-system estão sendo adotados aos poucos) | estrutura | parcial | projects/design-system/src/public-api.ts:6-10; projects/promote/src/styles.css:8, 12 |
| 19 | README.md:282 | "les remotes tournent parfaitement en standalone" (os dois remotes rodam sozinhos) | independência | corroborada | 3.4.3 (entrada e build próprios de promote e diaspora); angular.json:192, 319 (targets `serve` dos remotes) |
| 20 | README.md:282-284 | "sous le host, les routes s'imbriquent (`/promote/…`, `/diaspora/…`)" (sob o host, as rotas ficam aninhadas) | composição | corroborada | 3.4.5 #1-#2; projects/shell/src/app/app.routes.ts:9-20 |
| 21 | deploy/nginx.conf:43-48 | "On sert l'unique copie (identique entre remotes) à la racine, pour les deux apps" (uma cópia dos arquivos do MediaPipe serve as duas aplicações) | build-deploy | corroborada | deploy/nginx.conf:51-52; projects/promote/src/app/shared/face-mesh.ts:51, 53; projects/diaspora/src/app/shared/face-mesh.ts:53, 65-66; projects/promote/public/mediapipe e projects/diaspora/public/mediapipe (conteúdo idêntico) |
| 22 | projects/diaspora/src/app/app.routes.ts:10 | "embarque le parcours legacy FastAPI en iframe" (embute o fluxo legado por iframe) | composição | contradita | 3.4.5 #3; projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24, 31-36; deploy/nginx.conf:128-130 |
| 23 | projects/diaspora/src/app/core/admin-auth.ts:21-23 | "`@union/auth` (ClientAuthStore) existe dans le monorepo mais n'est branché nulle part" (a biblioteca comum de autenticação não está conectada a nenhuma aplicação) | estrutura | corroborada | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71, Composição `No`); projects/promote/src/app/core/auth.ts:7; projects/diaspora/src/app/core/admin-auth.ts:3 |
| 24 | projects/diaspora/src/app/pages/legacy-onboarding.ts:16-17 | "le reverse proxy sert le flux legacy sur le même domaine" (o reverse proxy serve o fluxo legado no mesmo domínio) | build-deploy | contradita | 3.4.5 #3; deploy/nginx.conf:128-130 |
| 25 | projects/shell/src/app/app.ts:5-6 | "chaque remote (diaspora hub, promote) fournit son propre layout plein écran + en-tête. Le shell ne fait qu'orchestrer la fédération" (cada remote traz o próprio layout; o shell só orquestra) | composição | corroborada | projects/shell/src/app/app.ts:9-14; projects/promote/src/app/remote.routes.ts:35-36; projects/diaspora/src/app/pages/home.ts:29-31 |
| 26 | projects/shell/src/app/app.ts:7 | "partager la session (SSO via ClientAuthStore, provisionné au bootstrap)" (o shell provisiona o `ClientAuthStore` no bootstrap) | composição | contradita | projects/shell/src/bootstrap.ts:1-5; projects/shell/src/app/app.config.ts:9-10 |

## Observações

**1. Dockerfile:2-3.** O comentário de abertura da imagem descreve o arranjo que a revisão de build e deploy registrou: três builds copiados para um único nginx, numa só origem. Repetições: docker-compose.yml:2-3, deploy/nginx.conf:1-4, deploy/server/deploy.sh:9, deploy/server/components.env:61-62, deploy/test/docker-compose.yml:4, README.md:75-79 e README.md:133.

**2. Dockerfile:3.** "host/remotes" com Native Federation confere com a dependência, a configuração e o código de carregamento. Repetições: a `description` do package.json (package.json:4), README.md:17, os papéis da tabela de projetos (README.md:27-29) e o comentário das rotas do host (projects/shell/src/app/app.routes.ts:4-5).

**3. Dockerfile:3.** A sessão compartilhada é a afirmação mais repetida da documentação: README.md:4-5 e 77; deploy/nginx.conf:5. Duas variações descrevem mecanismos próprios e têm linha separada: o compartilhamento pela chave comum com sincronização entre abas (afirmação 12) e o provisionamento no bootstrap (afirmação 26). O mecanismo existe na biblioteca: ela escuta o evento `storage` e grava a sessão na chave comum (projects/auth/src/lib/client-auth-store.ts:68-75, 153-157). Mas não está conectado às aplicações. Nenhuma aplicação importa `@union/auth`, e o comentário do diaspora admite que ela "n'est branché nulle part" (projects/diaspora/src/app/core/admin-auth.ts:21-23). Promote e diaspora guardam seus tokens com chaves próprias: `afp_token` e `diaspora_admin_token` (projects/promote/src/app/core/auth.ts:7, 41, 93; projects/diaspora/src/app/core/admin-auth.ts:3, 10, 42). Só a parte "une seule origine" se confirma, e ela já está na afirmação 1. É documentação que descreve a intenção, e não o estado do snapshot.

**4. Dockerfile:8.** O primeiro estágio instala as dependências uma vez e roda os três builds (Dockerfile:13-14, 20-22). Repetição: README.md:162-163, que acrescenta que o servidor só precisa de Docker.

**5. Dockerfile:42.** A imagem substitui o manifesto de federação de desenvolvimento, com URLs `localhost`, pelo de produção, com caminhos na mesma origem (Dockerfile:43; deploy/federation.manifest.prod.json:2-3). É o elo entre o deploy conjunto e o carregamento dos remotes, já registrado na revisão de composição.

**6. README.md:1.** O repositório é um workspace Angular CLI com as três aplicações e duas bibliotecas em `projects/` (angular.json:20-21, 146-147, 273-274; tsconfig.json:19-20). Repetições: README.md:3 ("Monorepo **Angular CLI 21**"), package.json:4 e tsconfig.json:1.

**7. README.md:3.** A referência a `portal-client-firstpay`, que seria outro sistema do banco, não é verificável no snapshot.

**8. README.md:4.** A frase de abertura nomeia "module federation". O snapshot usa `@angular-architects/native-federation` (projects/shell/src/app/app.routes.ts:2), que a revisão de dependências registra como tecnologia própria. A linha 17 do mesmo README corrige o nome ("équivalent esbuild du Module Federation de la banque"), mas pela regra o nome errado é uma afirmação `contradita`. Para uma busca por termo, essa é a frase que levaria à tecnologia errada. A parte "host + remotes" está na afirmação 2.

**9. README.md:10-11.** O diagrama acrescenta à afirmação 2 o mecanismo e os módulos. O shell chama `loadRemoteModule('promote', './Routes')` e `loadRemoteModule('diaspora', './Routes')` (projects/shell/src/app/app.routes.ts:13, 18), e cada remote expõe `./Routes` com o nome correspondente. As portas são as dos servidores de desenvolvimento (ver a revisão de build e deploy).

**10. README.md:13.** As três aplicações usam o design-system: os três builds incluem os seus tokens CSS (angular.json:88, 214, 341). Repetições: README.md:30 e tsconfig.json:2. A adoção dos componentes é a afirmação 18.

**11. README.md:13-14.** A biblioteca existe e tem alias (tsconfig.json:20; projects/auth/src/lib/client-auth-store.ts:15, 60), mas nenhuma unidade a usa. Por isso não é compartilhada no snapshot (regra de bibliotecas compartilhadas, passo 3 do método em `INSTRUCTIONS.md`). Repetições: README.md:31 e tsconfig.json:2. O uso dela para a sessão é a afirmação 3.

**12. README.md:20.** A biblioteca implementa o mecanismo: grava a sessão na chave `portail_client_auth` e escuta o evento `storage` para sincronizar abas e aplicações (projects/auth/src/lib/client-auth-store.ts:15, 68-75, 153-157). Nenhuma aplicação a usa, e promote e diaspora guardam tokens em chaves próprias. Repetição: projects/auth/src/lib/client-auth-store.ts:4-12, que apresenta o store como "PARTAGÉ" entre promote, diaspora e as aplicações do banco.

**13. README.md:20-21.** A interoperabilidade da sessão com as aplicações do banco, servidas na mesma origem, depende de sistemas externos. O comentário de abertura da biblioteca repete o "contrat d'interopérabilité" (projects/auth/src/lib/client-auth-store.ts:7-9). A biblioteca grava no formato do `zustand/persist` "pour rester interopérable" (projects/auth/src/lib/client-auth-store.ts:156-157), mas nada no snapshot confirma o outro lado, e a própria biblioteca não está em uso (afirmações 3 e 12).

**14. README.md:42-43.** O nginx encaminha `/promote-api/` e `/api/` para dois upstreams (deploy/nginx.conf:72-87). O manifesto de deploy aponta os dois backends para repositórios externos (deploy/server/components.env:35-39, 50-54).

**15. README.md:52.** O promote tem entrada, build e servidor de desenvolvimento próprios, e o comentário das suas rotas expostas explica como ele mantém o mesmo layout servido sozinho ou no shell. Repetição: projects/promote/src/app/remote.routes.ts:19-21.

**16. README.md:114-116.** O manifesto de deploy descreve quatro componentes, cada um com seu repositório, e o portal frontend é um deles, com as três aplicações juntas (deploy/server/components.env:15, 61-73; README.md:133). O deploy.sh lê o manifesto e, para cada componente, reconstrói a imagem e recria o serviço. Repetições: deploy/server/deploy.sh:5-7 e deploy/server/stop.sh:3. A documentação reforça que a fronteira de deploy é o portal inteiro, e não cada micro-frontend. A parte sobre equipes, stacks e ciclos diferentes trata dos componentes externos e ficou fora da tabela. A frase fala de estrutura e de deploy, ambos confirmados; como não se divide, o Tema é o da primeira propriedade, `estrutura`.

**17. README.md:138-143.** A tabela de "câblage" corresponde aos blocos de proxy do nginx. Repetições: docker-compose.yml:2-5 e deploy/server/components.env:61-63.

**18. README.md:279-281.** O design-system exporta componentes: um utilitário, três diretivas e um card (projects/design-system/src/public-api.ts:6-10). Nenhuma aplicação os importa, e a folha de estilos do promote só se diz "alinhada" ao design-system em comentários (projects/promote/src/styles.css:8, 12). Confirma-se que a adoção não está completa. Que ela esteja em curso não tem artefato. Por isso a afirmação é `parcial`.

**19. README.md:282.** Promote e diaspora têm entrada, build e servidor de desenvolvimento próprios, nas portas 4201 e 4202. Repetição: projects/diaspora/src/app/remote.routes.ts:9-10, que fornece o `HttpClient` nas rotas expostas para o diaspora funcionar sozinho ou no shell. O "parfaitement" não é verificável sem execução.

**20. README.md:282-284.** As rotas `promote` e `diaspora` do shell carregam os remotes como rotas filhas, o que confirma o aninhamento. O aviso sobre links absolutos internos do promote é uma pendência declarada que não foi verificada.

**21. deploy/nginx.conf:43-48.** O comentário explica um acoplamento de deploy entre as unidades. As duas aplicações pedem os arquivos do MediaPipe na raiz (ex.: projects/promote/src/app/shared/face-mesh.ts:51, 53), e o nginx serve na raiz a cópia que está no build do diaspora (deploy/nginx.conf:51-52). As pastas `public/mediapipe` do promote e do diaspora têm conteúdo idêntico, o que confirma o "identique entre remotes".

**22. projects/diaspora/src/app/app.routes.ts:10.** A rota existe e o componente renderiza um `<iframe>` (projects/diaspora/src/app/pages/legacy-onboarding.ts:31-36). Repetição: projects/diaspora/src/app/pages/legacy-onboarding.ts:5-7. O destino padrão é o caminho relativo `/open-account-flow-test` (projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24), e nada no snapshot define o override `__LEGACY_ONBOARDING_URL__`. Com a configuração do snapshot, o nginx manda esse caminho para o shell (deploy/nginx.conf:128-130), e o iframe não recebe o fluxo FastAPI anunciado. O julgamento vale para a configuração do snapshot. A revisão de composição deixou a relação `Undetermined` porque o destino pode ser definido fora do repositório.

**23. projects/diaspora/src/app/core/admin-auth.ts:21-23.** É o único texto do repositório que descreve o estado real da biblioteca de autenticação. A revisão de código-fonte não encontrou importação dela por nenhuma aplicação, e promote e diaspora usam chaves próprias (`afp_token` e `diaspora_admin_token`). O mesmo comentário explica que a autenticação do promote depende do seu próprio backend. Ele contradiz as afirmações 3, 11, 12 e 26, escritas no mesmo repositório.

**24. projects/diaspora/src/app/pages/legacy-onboarding.ts:16-17.** O comentário diz que, sem override, o caminho relativo `/open-account-flow-test` é servido pelo reverse proxy no mesmo domínio. O único reverse proxy do snapshot não tem rota para esse caminho e o manda para o `index.html` do shell (deploy/nginx.conf:128-130). Pode existir outro proxy fora do repositório, mas o do snapshot desmente a afirmação.

**25. projects/shell/src/app/app.ts:5-6.** O shell só tem um `<router-outlet />` (projects/shell/src/app/app.ts:9-14). O promote usa o próprio componente `App` como layout das rotas expostas (projects/promote/src/app/remote.routes.ts:35-36), e a página inicial do diaspora tem cabeçalho próprio (projects/diaspora/src/app/pages/home.ts:29-31). A frase seguinte do mesmo comentário, sobre a sessão, é a afirmação 26.

**26. projects/shell/src/app/app.ts:7.** O comentário atribui ao shell um mecanismo específico: provisionar o `ClientAuthStore` no bootstrap. O bootstrap só chama `bootstrapApplication(App, appConfig)` (projects/shell/src/bootstrap.ts:1-5), e a configuração só fornece o tratamento global de erros e o roteador (projects/shell/src/app/app.config.ts:9-10). O store não é provisionado.

## Resumo

Afirmações: 26 (corroborada: 16, parcial: 1, contradita: 7, sem corroboração: 2). Temas: (estrutura: 8, composição: 9, build-deploy: 6, independência: 2, outro: 1).
