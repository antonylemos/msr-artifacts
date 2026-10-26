---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
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

# 355 — UserTharushi/companion-disease-risk-ai

## Leitura do repositório

Oito aplicações React/Vite têm entradas e builds próprios (#28–#35). A cadeia de federação parte das dependências declaradas (#1–#8), passa pelos sete blocos de remote e pelo mapa do host (#10–#17), e chega aos imports e rotas do shell (#18–#23, #26). As seis relações ativas (#45–#50) integram pet-profile, symptom-checker, risk-results, vet-discovery, vaccination e admin à UI do shell. “Ativa” descreve o código registrado na 3.4.5, sem comprovar execução em produção.

Auth tem configuração de remote (#11), mas a relação federada permanece apenas configurada (#51): o shell redireciona o navegador para a aplicação independente. As oito aplicações têm build separado (#52–#59), enquanto deploy e versionamento independente não foram observados. Os contêineres de auth e shell executam servidores de desenvolvimento. A documentação situa auth como aplicação funcional principal, mas o uso real exclusivo tem corroboração parcial (#61); a alegação de shell inerte carece de corroboração (#65). O histórico não resolve o estado operacional (#78).

Os sinais enganosos incluem o carregador e o MessageChannel de Workbox, internos ao PWA (#24–#25), e diretórios de coordenação, serviços e bibliotecas que não são unidades frontend (#27, #36–#44). A declaração de Turbo permanece com uso por automação indeterminado (#9, #76). A documentação que chama todos os demais frontends de vazios conflita com implementação existente (#63); a generalização de acesso via gateway também conflita com clientes diretos (#68). As consultas históricas delimitam a persistência de código, sem explicar a origem desses conflitos (#79, #81). Tipos comuns são corroborados em compilação (#66), enquanto shared-utils não tem compartilhamento corroborado (#67, #80).

## Observações

### 1. apps/mfe-admin/package.json:26

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 2. apps/mfe-auth/package.json:43

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 3. apps/mfe-pet-profile/package.json:27

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 4. apps/mfe-risk-results/package.json:25

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 5. apps/mfe-symptom-checker/package.json:27

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 6. apps/mfe-vaccination/package.json:25

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 7. apps/mfe-vet-discovery/package.json:25

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 8. apps/shell/package.json:26

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `devDependencies`, versão `^1.3.5`.

**Interpretação:** A declaração sinaliza Module Federation; sua configuração é examinada separadamente.

### 9. package.json:20

**Observação:** O manifesto declara `turbo` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** Turbo sinaliza coordenação de monorepo, sem mecanismo de composição frontend. O snapshot permite tanto coordenação apenas configurada quanto uso por automação não registrado nos artefatos observados; a 3.4.2 mantém esse uso indeterminado.

### 10. apps/mfe-admin/vite.config.ts:8-20

**Observação:** O bloco `federation` nomeia `mfeAdmin`, define `filename: "remoteEntry.js"`, expõe `./App`, `./DashboardPage`, `./ClinicManagementPage`, `./SurgeonManagementPage`, `./DiseaseVaccineDBPage`, `./AnalyticsPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 11. apps/mfe-auth/vite.config.ts:9-18

**Observação:** O bloco `federation` nomeia `mfeAuth`, define `filename: "remoteEntry.js"`, expõe `./App`, `./LoginPage`, `./RegisterPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 12. apps/mfe-pet-profile/vite.config.ts:8-18

**Observação:** O bloco `federation` nomeia `mfePetProfile`, define `filename: "remoteEntry.js"`, expõe `./App`, `./PetListPage`, `./PetDetailPage`, `./AddPetPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 13. apps/mfe-risk-results/vite.config.ts:8-17

**Observação:** O bloco `federation` nomeia `mfeRiskResults`, define `filename: "remoteEntry.js"`, expõe `./App`, `./RiskResultPage`, `./PredictionHistoryPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 14. apps/mfe-symptom-checker/vite.config.ts:8-17

**Observação:** O bloco `federation` nomeia `mfeSymptom`, define `filename: "remoteEntry.js"`, expõe `./App`, `./SymptomFormPage`, `./ChatbotPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 15. apps/mfe-vaccination/vite.config.ts:8-17

**Observação:** O bloco `federation` nomeia `mfeVaccination`, define `filename: "remoteEntry.js"`, expõe `./App`, `./VaccinationDashboard`, `./AddVaccinationPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 16. apps/mfe-vet-discovery/vite.config.ts:8-18

**Observação:** O bloco `federation` nomeia `mfeVetDiscover`, define `filename: "remoteEntry.js"`, expõe `./App`, `./ClinicMapPage`, `./ClinicDetailPage`, `./BookingPage` e declara react, react-dom, react-router-dom e zustand em `shared`.

**Interpretação:** Configura o mecanismo de federação e a interface exposta desta unidade, sem nomear consumidores.

### 17. apps/shell/vite.config.ts:9-21

**Observação:** O bloco `federation` nomeia `shell`, mapeia mfeAuth, mfePetProfile, mfeSymptom, mfeRiskResults, mfeVetDiscover, mfeVaccination e mfeAdmin para URLs `http://localhost:3001` a `3007`, em `/assets/remoteEntry.js`, e compartilha react, react-dom, react-router-dom e zustand.

**Interpretação:** A configuração do host liga explicitamente o shell a sete destinos remotos. O mapa não demonstra consumo de todos os destinos.

### 18. apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:48; apps/shell/vite.config.ts:13; apps/mfe-pet-profile/vite.config.ts:9-12

**Observação:** O shell declara `lazy(() => import("mfePetProfile/App"))` e renderiza o componente na rota `pets/*` sob `ShellLayout`.

**Interpretação:** O consumo nomeia o destino apps/mfe-pet-profile e o integra à UI por Module Federation.

### 19. apps/shell/src/App.tsx:19; apps/shell/src/App.tsx:49; apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/vite.config.ts:9-12

**Observação:** O shell declara `lazy(() => import("mfeSymptom/App"))` e renderiza o componente na rota `symptom/*` sob `ShellLayout`.

**Interpretação:** O consumo nomeia o destino apps/mfe-symptom-checker e o integra à UI por Module Federation.

### 20. apps/shell/src/App.tsx:20; apps/shell/src/App.tsx:50; apps/shell/vite.config.ts:15; apps/mfe-risk-results/vite.config.ts:9-12

**Observação:** O shell declara `lazy(() => import("mfeRiskResults/App"))` e renderiza o componente na rota `risk-results/*` sob `ShellLayout`.

**Interpretação:** O consumo nomeia o destino apps/mfe-risk-results e o integra à UI por Module Federation.

### 21. apps/shell/src/App.tsx:21; apps/shell/src/App.tsx:51; apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/vite.config.ts:9-12

**Observação:** O shell declara `lazy(() => import("mfeVetDiscover/App"))` e renderiza o componente na rota `vet-discovery/*` sob `ShellLayout`.

**Interpretação:** O consumo nomeia o destino apps/mfe-vet-discovery e o integra à UI por Module Federation.

### 22. apps/shell/src/App.tsx:22; apps/shell/src/App.tsx:52; apps/shell/vite.config.ts:17; apps/mfe-vaccination/vite.config.ts:9-12

**Observação:** O shell declara `lazy(() => import("mfeVaccination/App"))` e renderiza o componente na rota `vaccination/*` sob `ShellLayout`.

**Interpretação:** O consumo nomeia o destino apps/mfe-vaccination e o integra à UI por Module Federation.

### 23. apps/shell/src/App.tsx:23; apps/shell/src/App.tsx:53; apps/shell/vite.config.ts:18; apps/mfe-admin/vite.config.ts:9-12

**Observação:** O shell declara `lazy(() => import("mfeAdmin/App"))` e renderiza o componente na rota `admin/*` sob `ShellLayout`.

**Interpretação:** O consumo nomeia o destino apps/mfe-admin e o integra à UI por Module Federation.

### 24. apps/mfe-auth/dev-dist/sw.js:22-37

**Observação:** O carregador gerado cria uma tag script e atribui a ela a URI do chunk requerido.

**Interpretação:** O código carrega chunks do próprio Workbox no PWA, sem compor outra unidade frontend.

### 25. apps/mfe-auth/dev-dist/workbox-af90992f.js:775-778

**Observação:** O código gerado responde por `event.ports[0].postMessage(true)` após a requisição de cache.

**Interpretação:** A comunicação ocorre entre service worker e página da mesma unidade; é falso positivo para comunicação entre frontends.

### 26. apps/shell/src/App.tsx:18-23; apps/shell/src/App.tsx:42-55; apps/shell/src/main.tsx:6-10

**Observação:** Routes associa pets, symptom, risk-results, vet-discovery, vaccination e admin aos seis componentes importados, sob ShellLayout. A rota /auth/* renderiza AuthRedirect.

**Interpretação:** As rotas compõem seis unidades remotas sob a UI do shell; auth é alcançado por navegação para outra página.

### 27. .; package.json:1-31

**Observação:** O manifesto da raiz lista workspaces de apps, serviços e pacotes e scripts que chamam Turbo; não há entrada de UI própria.

**Interpretação:** É raiz de coordenação, sem constituir uma unidade frontend.

### 28. apps/mfe-admin; apps/mfe-admin/package.json:1-33; apps/mfe-admin/index.html:10; apps/mfe-admin/src/main.tsx:6-12; apps/mfe-admin/vite.config.ts:5-23; apps/mfe-admin/package.json:8

**Observação:** O diretório `apps/mfe-admin` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 29. apps/mfe-auth; apps/mfe-auth/package.json:1-55; apps/mfe-auth/index.html:17; apps/mfe-auth/src/main.tsx:53-64; apps/mfe-auth/vite.config.ts:5-53; apps/mfe-auth/package.json:8; apps/mfe-auth/Dockerfile:1-15; docker-compose.yml:24-27

**Observação:** O diretório `apps/mfe-auth` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio. Há também Dockerfile próprio e serviço no Compose que executam o servidor de desenvolvimento.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 30. apps/mfe-pet-profile; apps/mfe-pet-profile/package.json:1-34; apps/mfe-pet-profile/index.html:10; apps/mfe-pet-profile/src/main.tsx:6-12; apps/mfe-pet-profile/vite.config.ts:5-21; apps/mfe-pet-profile/package.json:8

**Observação:** O diretório `apps/mfe-pet-profile` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 31. apps/mfe-risk-results; apps/mfe-risk-results/package.json:1-32; apps/mfe-risk-results/index.html:10; apps/mfe-risk-results/src/main.tsx:6-12; apps/mfe-risk-results/vite.config.ts:5-20; apps/mfe-risk-results/package.json:8

**Observação:** O diretório `apps/mfe-risk-results` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 32. apps/mfe-symptom-checker; apps/mfe-symptom-checker/package.json:1-34; apps/mfe-symptom-checker/index.html:10; apps/mfe-symptom-checker/src/main.tsx:6-12; apps/mfe-symptom-checker/vite.config.ts:5-20; apps/mfe-symptom-checker/package.json:8

**Observação:** O diretório `apps/mfe-symptom-checker` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 33. apps/mfe-vaccination; apps/mfe-vaccination/package.json:1-32; apps/mfe-vaccination/index.html:10; apps/mfe-vaccination/src/main.tsx:6-12; apps/mfe-vaccination/vite.config.ts:5-20; apps/mfe-vaccination/package.json:8

**Observação:** O diretório `apps/mfe-vaccination` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 34. apps/mfe-vet-discovery; apps/mfe-vet-discovery/package.json:1-32; apps/mfe-vet-discovery/index.html:10; apps/mfe-vet-discovery/src/main.tsx:6-12; apps/mfe-vet-discovery/vite.config.ts:5-21; apps/mfe-vet-discovery/package.json:8

**Observação:** O diretório `apps/mfe-vet-discovery` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 35. apps/shell; apps/shell/package.json:1-34; apps/shell/index.html:17; apps/shell/src/main.tsx:6-10; apps/shell/vite.config.ts:5-61; apps/shell/package.json:8; apps/shell/Dockerfile:1-15; docker-compose.yml:11-14

**Observação:** O diretório `apps/shell` tem manifesto próprio, index.html que carrega src/main.tsx, montagem React e script `tsc && vite build` com vite.config.ts próprio. Há também Dockerfile próprio e serviço no Compose que executam o servidor de desenvolvimento.

**Interpretação:** Entrada e build próprios confirmam o limite de uma aplicação frontend.

### 36. backend/services/nodejs/admin-service; backend/services/nodejs/admin-service/package.json:1-23; backend/services/nodejs/admin-service/src/server.ts:5; backend/services/nodejs/admin-service/package.json:5; backend/services/nodejs/admin-service/Dockerfile:1-20; docker-compose.yml:142

**Observação:** O diretório `backend/services/nodejs/admin-service` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 37. backend/services/nodejs/api-gateway; backend/services/nodejs/api-gateway/package.json:1-37; backend/services/nodejs/api-gateway/src/server.ts:6; backend/services/nodejs/api-gateway/package.json:7; backend/services/nodejs/api-gateway/Dockerfile:1-20; docker-compose.yml:38

**Observação:** O diretório `backend/services/nodejs/api-gateway` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 38. backend/services/nodejs/auth-service; backend/services/nodejs/auth-service/package.json:1-33; backend/services/nodejs/auth-service/src/server.ts:24; backend/services/nodejs/auth-service/package.json:7; backend/services/nodejs/auth-service/Dockerfile:1-20; docker-compose.yml:67

**Observação:** O diretório `backend/services/nodejs/auth-service` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 39. backend/services/nodejs/clinic-service; backend/services/nodejs/clinic-service/package.json:1-20; backend/services/nodejs/clinic-service/src/server.ts:5; backend/services/nodejs/clinic-service/package.json:5; backend/services/nodejs/clinic-service/Dockerfile:1-20; docker-compose.yml:97

**Observação:** O diretório `backend/services/nodejs/clinic-service` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 40. backend/services/nodejs/notification-service; backend/services/nodejs/notification-service/package.json:1-24; backend/services/nodejs/notification-service/src/server.ts:5; backend/services/nodejs/notification-service/package.json:5; backend/services/nodejs/notification-service/Dockerfile:1-20; docker-compose.yml:112

**Observação:** O diretório `backend/services/nodejs/notification-service` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 41. backend/services/nodejs/pet-service; backend/services/nodejs/pet-service/package.json:1-32; backend/services/nodejs/pet-service/src/server.ts:4; backend/services/nodejs/pet-service/package.json:7; backend/services/nodejs/pet-service/Dockerfile:1-20; docker-compose.yml:82

**Observação:** O diretório `backend/services/nodejs/pet-service` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 42. backend/services/nodejs/vaccination-service; backend/services/nodejs/vaccination-service/package.json:1-24; backend/services/nodejs/vaccination-service/src/server.ts:5; backend/services/nodejs/vaccination-service/package.json:5; backend/services/nodejs/vaccination-service/Dockerfile:1-20; docker-compose.yml:127

**Observação:** O diretório `backend/services/nodejs/vaccination-service` tem manifesto, entrada HTTP com app.listen, build TypeScript e Dockerfile do serviço.

**Interpretação:** É serviço backend, sem limite de aplicação frontend.

### 43. packages/shared-types; packages/shared-types/package.json:1-14; packages/shared-types/package.json:9

**Observação:** O pacote `packages/shared-types` declara main e types em ./src/index.ts e build com tsc, sem entrada de aplicação.

**Interpretação:** É biblioteca de apoio; a presença do pacote não estabelece uma unidade frontend.

### 44. packages/shared-utils; packages/shared-utils/package.json:1-18; packages/shared-utils/package.json:9

**Observação:** O pacote `packages/shared-utils` declara main e types em ./src/index.ts e build com tsc, sem entrada de aplicação.

**Interpretação:** É biblioteca de apoio; a presença do pacote não estabelece uma unidade frontend.

### 45. apps/shell/vite.config.ts:13; apps/mfe-pet-profile/vite.config.ts:9-12; apps/mfe-pet-profile/package.json:7; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:48

**Observação:** O mapa do shell resolve `apps/mfe-pet-profile` pelo nome do remote e remoteEntry.js; o import correspondente consome ./App e a rota o renderiza sob ShellLayout.

**Interpretação:** A relação host → remote está ativa no código do snapshot, ligando aplicações com entradas e builds próprios.

### 46. apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/vite.config.ts:9-12; apps/mfe-symptom-checker/package.json:7; apps/shell/src/App.tsx:19; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:49

**Observação:** O mapa do shell resolve `apps/mfe-symptom-checker` pelo nome do remote e remoteEntry.js; o import correspondente consome ./App e a rota o renderiza sob ShellLayout.

**Interpretação:** A relação host → remote está ativa no código do snapshot, ligando aplicações com entradas e builds próprios.

### 47. apps/shell/vite.config.ts:15; apps/mfe-risk-results/vite.config.ts:9-12; apps/mfe-risk-results/package.json:7; apps/shell/src/App.tsx:20; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:50

**Observação:** O mapa do shell resolve `apps/mfe-risk-results` pelo nome do remote e remoteEntry.js; o import correspondente consome ./App e a rota o renderiza sob ShellLayout.

**Interpretação:** A relação host → remote está ativa no código do snapshot, ligando aplicações com entradas e builds próprios.

### 48. apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/vite.config.ts:9-12; apps/mfe-vet-discovery/package.json:7; apps/shell/src/App.tsx:21; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:51

**Observação:** O mapa do shell resolve `apps/mfe-vet-discovery` pelo nome do remote e remoteEntry.js; o import correspondente consome ./App e a rota o renderiza sob ShellLayout.

**Interpretação:** A relação host → remote está ativa no código do snapshot, ligando aplicações com entradas e builds próprios.

### 49. apps/shell/vite.config.ts:17; apps/mfe-vaccination/vite.config.ts:9-12; apps/mfe-vaccination/package.json:7; apps/shell/src/App.tsx:22; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:52

**Observação:** O mapa do shell resolve `apps/mfe-vaccination` pelo nome do remote e remoteEntry.js; o import correspondente consome ./App e a rota o renderiza sob ShellLayout.

**Interpretação:** A relação host → remote está ativa no código do snapshot, ligando aplicações com entradas e builds próprios.

### 50. apps/shell/vite.config.ts:18; apps/mfe-admin/vite.config.ts:9-12; apps/mfe-admin/package.json:7; apps/shell/src/App.tsx:23; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:53

**Observação:** O mapa do shell resolve `apps/mfe-admin` pelo nome do remote e remoteEntry.js; o import correspondente consome ./App e a rota o renderiza sob ShellLayout.

**Interpretação:** A relação host → remote está ativa no código do snapshot, ligando aplicações com entradas e builds próprios.

### 51. apps/shell/vite.config.ts:12; apps/mfe-auth/vite.config.ts:10-16; apps/mfe-auth/package.json:7; apps/shell/src/App.tsx:8-15; apps/shell/src/App.tsx:44

**Observação:** O shell declara mfeAuth em seu mapa e auth expõe ./App, ./LoginPage e ./RegisterPage. Não há consumidor federado registrado; /auth/* usa redirecionamento.

**Interpretação:** A ligação federada com auth existe apenas na configuração; não é composição ativa.

### 52. apps/mfe-admin/package.json:8; apps/mfe-admin/vite.config.ts:8-22; package.json:13; apps/shell/vite.config.ts:18; apps/mfe-admin/package.json:7

**Observação:** `apps/mfe-admin/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. A porta citada pertence aos scripts dev/preview; a revisão não registra artefato de deploy para a aplicação.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 53. apps/mfe-auth/package.json:8; apps/mfe-auth/vite.config.ts:9-52; apps/mfe-auth/Dockerfile:1-15; docker-compose.yml:24-32; apps/mfe-auth/package.json:7; apps/shell/vite.config.ts:12; apps/shell/src/App.tsx:12; apps/mfe-auth/Dockerfile:13-15; docker-compose.yml:28-29

**Observação:** `apps/mfe-auth/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. Seu Dockerfile executa npm run dev e o Compose publica a porta de desenvolvimento.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 54. apps/mfe-pet-profile/package.json:8; apps/mfe-pet-profile/vite.config.ts:8-20; apps/shell/vite.config.ts:13; apps/mfe-pet-profile/package.json:7

**Observação:** `apps/mfe-pet-profile/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. A porta citada pertence aos scripts dev/preview; a revisão não registra artefato de deploy para a aplicação.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 55. apps/mfe-risk-results/package.json:8; apps/mfe-risk-results/vite.config.ts:8-19; apps/shell/vite.config.ts:15; apps/mfe-risk-results/package.json:7

**Observação:** `apps/mfe-risk-results/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. A porta citada pertence aos scripts dev/preview; a revisão não registra artefato de deploy para a aplicação.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 56. apps/mfe-symptom-checker/package.json:8; apps/mfe-symptom-checker/vite.config.ts:8-19; apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/package.json:7

**Observação:** `apps/mfe-symptom-checker/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. A porta citada pertence aos scripts dev/preview; a revisão não registra artefato de deploy para a aplicação.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 57. apps/mfe-vaccination/package.json:8; apps/mfe-vaccination/vite.config.ts:8-19; apps/shell/vite.config.ts:17; apps/mfe-vaccination/package.json:7

**Observação:** `apps/mfe-vaccination/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. A porta citada pertence aos scripts dev/preview; a revisão não registra artefato de deploy para a aplicação.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 58. apps/mfe-vet-discovery/package.json:8; apps/mfe-vet-discovery/vite.config.ts:8-20; apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/package.json:7

**Observação:** `apps/mfe-vet-discovery/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. A porta citada pertence aos scripts dev/preview; a revisão não registra artefato de deploy para a aplicação.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 59. apps/shell/package.json:8; apps/shell/vite.config.ts:9-60; apps/shell/Dockerfile:1-15; docker-compose.yml:11-21; apps/shell/package.json:7; apps/shell/Dockerfile:13-15; docker-compose.yml:15-16

**Observação:** `apps/shell/package.json` declara build com `tsc && vite build`, usando a configuração Vite própria. A aplicação tem version 1.0.0 e private true. Seu Dockerfile executa npm run dev e o Compose publica a porta de desenvolvimento.

**Interpretação:** O build separado confirma o limite da unidade. Deploy e versionamento independente não foram observados; o build configurado não comprova publicação.

### 60. CLAUDE.md:7

**Observação:** O texto afirma: "Monorepo with React micro-frontends, Node.js microservices, Python ML/agent services".

**Interpretação:** A afirmação descreve o conjunto de unidades frontend num monorepo, corroborado por seus diretórios e pelo workspace.

### 61. CLAUDE.md:56

**Observação:** O texto afirma: "apps/mfe-auth […] is the entire live front end […] the application monolith".

**Interpretação:** A concentração funcional em auth é confirmada pelas rotas, mas a condição de único frontend em uso real não é demonstrada; a corroboração é parcial.

### 62. CLAUDE.md:58

**Observação:** O texto afirma: "apps/shell […] the Module Federation host, remotes map in apps/shell/vite.config.ts".

**Interpretação:** O papel de host e o mapa de remotes são corroborados pela configuração e pelas relações registradas.

### 63. CLAUDE.md:58

**Observação:** O texto afirma: "The other MFEs […] and apps/shell […] are empty scaffolds".

**Interpretação:** A afirmação de que todos são vazios é contradita pelas rotas do shell e pelo acesso a dados de pet-profile; scaffold não equivale a ausência de implementação.

### 64. CLAUDE.md:62

**Observação:** O texto afirma: "Shared libs react, react-dom, react-router-dom, zustand are declared federated shared deps".

**Interpretação:** A declaração de dependências federadas compartilhadas é corroborada; isso não comprova o uso de cada pacote por várias unidades.

### 65. CLAUDE.md:62

**Observação:** O texto afirma: "inert while the shell is unused".

**Interpretação:** A alegação operacional de inércia por falta de uso do shell permanece sem corroboração. O código existente não decide uso real.

### 66. CLAUDE.md:95

**Observação:** O texto afirma: "packages/shared-types — canonical TypeScript interfaces".

**Interpretação:** O compartilhamento de tipos é corroborado por import type de três frontends; é apoio em compilação, sem mecanismo de composição runtime.

### 67. CLAUDE.md:96

**Observação:** O texto afirma: "packages/shared-utils — shared utility functions".

**Interpretação:** A afirmação de compartilhamento da biblioteca utilitária permanece sem corroboração, pois não há consumidores observados.

### 68. CLAUDE.md:115

**Observação:** O texto afirma: "frontends call everything through the gateway (:4000) with Authorization: Bearer <jwt>".

**Interpretação:** A generalização de acesso ao gateway com Bearer é contradita pelos clientes diretos de pet-profile e admin; descreve acessos backend, sem mecanismo de composição frontend.

### 69. README.md:7

**Observação:** O texto afirma: "Frontend: React + Tailwind + Module Federation micro-frontends + PWA".

**Interpretação:** A pilha descrita como micro-frontends federados é corroborada por configurações e relações; o PWA não prova publicação da arquitetura.

### 70. README.md:18-26

**Observação:** O texto afirma: "apps/ […] shell/ […] mfe-auth/ […] mfe-admin/" (árvore com shell e sete apps mfe-*).

**Interpretação:** A árvore documental corresponde às oito unidades frontend, sem provar oito implantações ou limites funcionais completos.

### 71. apps/mfe-auth/vite.config.ts:47-48

**Observação:** O texto afirma: "The container serves vite dev, so enable the SW there too".

**Interpretação:** O comentário é corroborado pelo Dockerfile e pelo script dev; caracteriza execução de desenvolvimento, sem deploy de produção observado.

### 72. apps/shell/src/App.tsx:8

**Observação:** O texto afirma: "Auth MFE runs standalone at localhost:3001 – redirect to it instead of federating".

**Interpretação:** O comentário é corroborado pelo redirecionamento e pela execução própria de auth, sem demonstrar sua composição federada.

### 73. apps/shell/src/App.tsx:17

**Observação:** O texto afirma: "Lazy MFE Imports (Module Federation)".

**Interpretação:** O comentário é corroborado pelos seis imports e suas rotas de consumo no shell.

### 74. docs/INTERIM_REPORT.md:462

**Observação:** O texto afirma: "Turborepo, npm workspaces […] Coordinated builds across services".

**Interpretação:** A coordenação de builds está configurada nos workspaces, scripts e tarefas Turbo; a afirmação não comprova automação executada.

### 75. docs/INTERIM_REPORT.md:504

**Observação:** O texto afirma: "microservice architecture behind an API gateway, with a React PWA client".

**Interpretação:** A ligação do cliente principal PWA ao gateway é corroborada; trata de frontend e serviços backend, sem estabelecer composição entre aplicações frontend.

### 76. 1d5c716 2026-03-25 (package.json; turbo.json); f1531e1 2026-04-09 (package.json; turbo.json)

**Observação:** O histórico registra package.json com o mesmo objeto em março, abril e no snapshot; turbo.json tem o mesmo objeto desde abril. A consulta não registra workflow em .github; os scripts encontrados em julho tratam de outras tarefas.

**Interpretação:** A origem e o eventual uso anterior de automação Turbo continuam inconclusivos. No snapshot, a coordenação configurada está clara; não se altera o limite das unidades frontend.

### 77. 1d5c716 2026-03-25 (apps/shell/vite.config.ts; apps/shell/src/App.tsx); f1531e1 2026-04-09 (apps/shell/vite.config.ts; apps/shell/src/App.tsx)

**Observação:** A configuração federada do shell tem o mesmo objeto em março, abril e no snapshot. O App de abril é idêntico ao atual; o conteúdo do App de março não pôde ser lido.

**Interpretação:** O redirecionamento atual de auth persiste desde a incorporação de abril. O ponto é esclarecido nesse limite; não prova abandono nem exclui consumo federado anterior.

### 78. f1531e1 2026-04-09 (CLAUDE.md); 46d7f21 2026-07-18 (CLAUDE.md); 869945f 2026-07-26 (CLAUDE.md); dcd3623 2026-07-29 (CLAUDE.md)

**Observação:** CLAUDE.md é adicionado em abril e alterado em julho. As leituras das versões de abril e de 18 de julho falharam; os metadados não atribuem a frase de uso real a um commit.

**Interpretação:** O uso real do shell ou a concentração operacional exclusiva em auth continuam indeterminados: composição existente e aplicação principal isolada são compatíveis com diferentes estados de operação no snapshot.

### 79. f1531e1 2026-04-09 (CLAUDE.md; apps/shell/src/App.tsx; apps/mfe-pet-profile/src/pages/PetListPage.tsx; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts); 3d48ece 2026-07-18 (CLAUDE.md; apps/shell/src/App.tsx; apps/mfe-pet-profile/src/pages/PetListPage.tsx; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts); 46d7f21 2026-07-18 (CLAUDE.md; apps/shell/src/App.tsx; apps/mfe-pet-profile/src/pages/PetListPage.tsx; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts)

**Observação:** O App do shell de abril é idêntico ao snapshot. Em julho, entram os clientes de API de pet-profile e admin e muda PetListPage; seus objetos são iguais aos atuais. As versões antigas de CLAUDE.md não puderam ser lidas.

**Interpretação:** A dúvida histórica é quando surgiu a descrição de vazio. A implementação atual está clara e contradiz a afirmação; não se pode atribuir o conflito a documentação desatualizada.

### 80. 1d5c716 2026-03-25 (packages/shared-utils); f1531e1 2026-04-09 (packages/shared-utils); 9ac4ff2 2026-07-18 (packages/shared-utils)

**Observação:** O manifesto e o código de shared-utils aparecem em março e na incorporação de abril; julho acrescenta o tsconfig. A consulta não rastreia todos os possíveis consumidores históricos.

**Interpretação:** A presença histórica da biblioteca não prova compartilhamento anterior nem abandono. A ausência de consumidores no snapshot permanece como registrada.

### 81. 3d48ece 2026-07-18 (CLAUDE.md; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts); 46d7f21 2026-07-18 (CLAUDE.md; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts)

**Observação:** Os clientes diretos de pet-profile e admin entram em julho e têm os mesmos objetos do snapshot. As versões antigas de CLAUDE.md não puderam ser lidas.

**Interpretação:** A persistência dos clientes diretos desde julho não data a generalização documental. O conflito atual está claro; sua origem histórica continua inconclusiva.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/mfe-admin/package.json:26) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #10 |
| 2 | 3.4.2 (apps/mfe-auth/package.json:43) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #11 |
| 3 | 3.4.2 (apps/mfe-pet-profile/package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #12 |
| 4 | 3.4.2 (apps/mfe-risk-results/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #13 |
| 5 | 3.4.2 (apps/mfe-symptom-checker/package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #14 |
| 6 | 3.4.2 (apps/mfe-vaccination/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #15 |
| 7 | 3.4.2 (apps/mfe-vet-discovery/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #16 |
| 8 | 3.4.2 (apps/shell/package.json:26) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #17 |
| 9 | 3.4.2 (package.json:20) | 1 tecnologia | manifesto | — | contexto | ambígua | — |
| 10 | 3.4.2 (apps/mfe-admin/package.json:26) (Evidência); 3.4.3 (apps/mfe-admin) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:23) (Observação); 3.4.5 #6 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #50 |
| 11 | 3.4.2 (apps/mfe-auth/package.json:43) (Evidência); 3.4.3 (apps/mfe-auth) (Marcadores, Build); 3.4.5 #7 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #5 (Evidência); 3.4.7 #10 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #29; configura #51 |
| 12 | 3.4.2 (apps/mfe-pet-profile/package.json:27) (Evidência); 3.4.3 (apps/mfe-pet-profile) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:18) (Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #45 |
| 13 | 3.4.2 (apps/mfe-risk-results/package.json:25) (Evidência); 3.4.3 (apps/mfe-risk-results) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:20) (Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #31; configura #47 |
| 14 | 3.4.2 (apps/mfe-symptom-checker/package.json:27) (Evidência); 3.4.3 (apps/mfe-symptom-checker) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:19) (Observação); 3.4.5 #2 (Configuração); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #32; configura #46 |
| 15 | 3.4.2 (apps/mfe-vaccination/package.json:25) (Evidência); 3.4.3 (apps/mfe-vaccination) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:22) (Observação); 3.4.5 #5 (Configuração); 3.4.6 #6 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #33; configura #49 |
| 16 | 3.4.2 (apps/mfe-vet-discovery/package.json:25) (Evidência); 3.4.3 (apps/mfe-vet-discovery) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:21) (Observação); 3.4.5 #4 (Configuração); 3.4.6 #7 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #34; configura #48 |
| 17 | 3.4.2 (apps/shell/package.json:26) (Evidência); 3.4.3 (apps/shell) (Marcadores, Build); 3.4.4 (apps/shell/src/App.tsx:18) (Observação); 3.4.4 (apps/shell/src/App.tsx:19) (Observação); 3.4.4 (apps/shell/src/App.tsx:20) (Observação); 3.4.4 (apps/shell/src/App.tsx:21) (Observação); 3.4.4 (apps/shell/src/App.tsx:22) (Observação); 3.4.4 (apps/shell/src/App.tsx:23) (Observação); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.5 #3 (Configuração); 3.4.5 #4 (Configuração); 3.4.5 #5 (Configuração); 3.4.5 #6 (Configuração); 3.4.5 #7 (Configuração); 3.4.6 #1 (Onde é servida); 3.4.6 #2 (Onde é servida); 3.4.6 #3 (Onde é servida); 3.4.6 #4 (Onde é servida); 3.4.6 #5 (Onde é servida); 3.4.6 #6 (Onde é servida); 3.4.6 #7 (Onde é servida); 3.4.6 #8 (Artefatos); 3.4.7 #3 (Evidência); 3.4.7 #5 (Evidência); 3.4.7 #10 (Evidência); 3.4.7 #11 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #35; configura #45; configura #46; configura #47; configura #48; configura #49; configura #50; configura #51 |
| 18 | 3.4.4 (apps/shell/src/App.tsx:18) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #45 |
| 19 | 3.4.4 (apps/shell/src/App.tsx:19) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #46 |
| 20 | 3.4.4 (apps/shell/src/App.tsx:20) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #47 |
| 21 | 3.4.4 (apps/shell/src/App.tsx:21) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #48 |
| 22 | 3.4.4 (apps/shell/src/App.tsx:22) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #49 |
| 23 | 3.4.4 (apps/shell/src/App.tsx:23) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #50 |
| 24 | 3.4.4 (apps/mfe-auth/dev-dist/sw.js:28) | 3 código | código-fonte | — | contexto | fraca | — |
| 25 | 3.4.4 (apps/mfe-auth/dev-dist/workbox-af90992f.js:777) | 3 código | código-fonte | — | contexto | fraca | — |
| 26 | 3.4.4 (apps/shell/src/App.tsx:42, fora da mineração) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #45; implementa #46; implementa #47; implementa #48; implementa #49; implementa #50 |
| 27 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (apps/mfe-admin) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (apps/mfe-auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (apps/mfe-pet-profile) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (apps/mfe-risk-results) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.3 (apps/mfe-symptom-checker) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (apps/mfe-vaccination) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 34 | 3.4.3 (apps/mfe-vet-discovery) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 35 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 36 | 3.4.3 (backend/services/nodejs/admin-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 37 | 3.4.3 (backend/services/nodejs/api-gateway) | 4 estrutura | diretório | — | contexto | fraca | — |
| 38 | 3.4.3 (backend/services/nodejs/auth-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 39 | 3.4.3 (backend/services/nodejs/clinic-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 40 | 3.4.3 (backend/services/nodejs/notification-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 41 | 3.4.3 (backend/services/nodejs/pet-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 42 | 3.4.3 (backend/services/nodejs/vaccination-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 43 | 3.4.3 (packages/shared-types) | 4 estrutura | diretório | — | contexto | fraca | — |
| 44 | 3.4.3 (packages/shared-utils) | 4 estrutura | diretório | — | contexto | fraca | — |
| 45 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #30 |
| 46 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #32 |
| 47 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #31 |
| 48 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #34 |
| 49 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #33 |
| 50 | 3.4.5 #6 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #28 |
| 51 | 3.4.5 #7 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #35; liga #29 |
| 52 | 3.4.6 #1 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #28 |
| 53 | 3.4.6 #2 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #29 |
| 54 | 3.4.6 #3 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #30 |
| 55 | 3.4.6 #4 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #31 |
| 56 | 3.4.6 #5 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #32 |
| 57 | 3.4.6 #6 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #33 |
| 58 | 3.4.6 #7 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #34 |
| 59 | 3.4.6 #8 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #35 |
| 60 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #32; corrobora #33; corrobora #34; corrobora #35 |
| 61 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte apps/mfe-auth/src/App.tsx:23-70 |
| 62 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #17 |
| 63 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #26; contradiz apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; contradiz apps/mfe-pet-profile/src/lib/api.ts:24-51 |
| 64 | 3.4.7 #5 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #17; corrobora #11; corrobora #12 |
| 65 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 66 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | corrobora apps/mfe-auth/src/lib/clinic-api.ts:1; corrobora apps/mfe-pet-profile/src/lib/api.ts:1; corrobora apps/mfe-admin/src/lib/api.ts:1 |
| 67 | 3.4.7 #8 | 7 documentação | documentação | — | contexto | fraca | — |
| 68 | 3.4.7 #9 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/mfe-pet-profile/src/lib/api.ts:3-18; contradiz apps/mfe-admin/src/lib/api.ts:3-9 |
| 69 | 3.4.7 #10 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #45; corrobora #46; corrobora #47; corrobora #48; corrobora #49; corrobora #50 |
| 70 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #32; corrobora #33; corrobora #34; corrobora #35 |
| 71 | 3.4.7 #12 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #53 |
| 72 | 3.4.7 #13 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #51; corrobora #29; corrobora #53 |
| 73 | 3.4.7 #14 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #18; corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #23 |
| 74 | 3.4.7 #15 | 7 documentação | documentação | — | contexto | fraca | corrobora #27; corrobora turbo.json:5-9 |
| 75 | 3.4.7 #16 | 7 documentação | documentação | — | contexto | fraca | corrobora apps/mfe-auth/src/lib/api-base.ts:49-59; corrobora apps/mfe-auth/src/lib/clinic-api.ts:3-14; corrobora docker-compose.yml:35-61 |
| 76 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #9; explica #74 |
| 77 | 3.4.8 #2 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #51; explica #72 |
| 78 | 3.4.8 #3 | 8 histórico | histórico | module-federation | arquitetural | ambígua | explica #61; explica #65 |
| 79 | 3.4.8 #4 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #63 |
| 80 | 3.4.8 #5 | 8 histórico | histórico | — | contexto | fraca | explica #67 |
| 81 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #68 |

## Resumo

Observações: 81. Dimensões (tecnologia: 9, configuração: 8, código: 9, estrutura: 18, composição: 7, build-deploy: 8, documentação: 16, histórico: 6). Força (forte: 14, moderada: 24, fraca: 41, ambígua: 2). Evidência (tecnológica: 17, arquitetural: 43, contexto: 21).
