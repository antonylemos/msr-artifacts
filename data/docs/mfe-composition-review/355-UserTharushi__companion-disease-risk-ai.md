---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Leitura do repositório

Projeto acadêmico em monorepo com um shell e sete micro-frontends React/Vite unidos por Module Federation (`@originjs/vite-plugin-federation`). `apps/shell` é o host: declara sete remotes em `http://localhost:3001` a `3007` (apps/shell/vite.config.ts:9-21), e cada app `mfe-*` se declara remote com `name`, `filename: "remoteEntry.js"` e `exposes` próprios (por exemplo apps/mfe-pet-profile/vite.config.ts:8-18). O shell carrega seis deles por `lazy(() => import("<remote>/App"))` (apps/shell/src/App.tsx:18-23) e os encaixa como rotas filhas do `ShellLayout` (apps/shell/src/App.tsx:47-54). Cada remote expõe, além de `./App`, páginas avulsas (por exemplo apps/mfe-admin/vite.config.ts:11-18) que o shell não importa; só `./App` é consumido.

A particularidade está em `apps/mfe-auth`. O shell declara o remote `mfeAuth` (apps/shell/vite.config.ts:12) e o módulo `mfeAuth/App` (apps/shell/src/federation.d.ts:1), e mfe-auth expõe `./App`, `./LoginPage` e `./RegisterPage` (apps/mfe-auth/vite.config.ts:12-16), mas nenhum código do shell importa esse remote. Em vez disso, a rota `/auth/*` e a falta de token levam o navegador para outra página: `window.location.replace("http://localhost:3001...")` (apps/shell/src/App.tsx:8-13, :44; apps/shell/src/layouts/ShellLayout.tsx:22-26). O comentário do próprio código diz "Auth MFE runs standalone at localhost:3001 – redirect to it instead of federating" (apps/shell/src/App.tsx:8). Esse redirecionamento é navegação entre páginas, não composição, e não virou relação; a relação shell → mfe-auth fica só na configuração.

O README confirma o quadro: a aplicação usada de fato é `apps/mfe-auth` (porta 3001), e "The shell + other MFEs are scaffold" (README.md:80). O shell lê o token em `localStorage` com a chave `companion_ai_access_token` (apps/shell/src/layouts/ShellLayout.tsx:5-8), a mesma que mfe-auth grava, mas, como registrou a revisão de código-fonte, isso não é um dos mecanismos de comunicação listados e as duas unidades rodam em portas diferentes. Não há custom elements, iframes, eventos nem orquestrador.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/mfe-pet-profile | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:13 (remote `mfePetProfile` em `http://localhost:3002/assets/remoteEntry.js`); apps/mfe-pet-profile/vite.config.ts:9-12 (`name: "mfePetProfile"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/mfe-pet-profile/package.json:7 (porta 3002) | apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:42 |
| 2 | apps/shell | apps/mfe-symptom-checker | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:14 (remote `mfeSymptom` em `http://localhost:3003/assets/remoteEntry.js`); apps/mfe-symptom-checker/vite.config.ts:9-12 (`name: "mfeSymptom"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/mfe-symptom-checker/package.json:7 (porta 3003) | apps/shell/src/App.tsx:19; apps/shell/src/App.tsx:42 |
| 3 | apps/shell | apps/mfe-risk-results | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:15 (remote `mfeRiskResults` em `http://localhost:3004/assets/remoteEntry.js`); apps/mfe-risk-results/vite.config.ts:9-12 (`name: "mfeRiskResults"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/mfe-risk-results/package.json:7 (porta 3004) | apps/shell/src/App.tsx:20; apps/shell/src/App.tsx:42 |
| 4 | apps/shell | apps/mfe-vet-discovery | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:16 (remote `mfeVetDiscover` em `http://localhost:3005/assets/remoteEntry.js`); apps/mfe-vet-discovery/vite.config.ts:9-12 (`name: "mfeVetDiscover"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/mfe-vet-discovery/package.json:7 (porta 3005) | apps/shell/src/App.tsx:21; apps/shell/src/App.tsx:42 |
| 5 | apps/shell | apps/mfe-vaccination | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:17 (remote `mfeVaccination` em `http://localhost:3006/assets/remoteEntry.js`); apps/mfe-vaccination/vite.config.ts:9-12 (`name: "mfeVaccination"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/mfe-vaccination/package.json:7 (porta 3006) | apps/shell/src/App.tsx:22; apps/shell/src/App.tsx:42 |
| 6 | apps/shell | apps/mfe-admin | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:18 (remote `mfeAdmin` em `http://localhost:3007/assets/remoteEntry.js`); apps/mfe-admin/vite.config.ts:9-12 (`name: "mfeAdmin"`, `filename: "remoteEntry.js"`, expõe `./App`); apps/mfe-admin/package.json:7 (porta 3007) | apps/shell/src/App.tsx:23; apps/shell/src/App.tsx:42 |
| 7 | apps/shell | apps/mfe-auth | host → remote | origem → destino | module-federation | Yes | No | apps/shell/vite.config.ts:12 (remote `mfeAuth` em `http://localhost:3001/assets/remoteEntry.js`); apps/mfe-auth/vite.config.ts:10-16 (`name: "mfeAuth"`, `filename: "remoteEntry.js"`, expõe `./App`, `./LoginPage`, `./RegisterPage`); apps/mfe-auth/package.json:7 (porta 3001) | — |

## Observações

**1. apps/shell → apps/mfe-pet-profile.** O remote `mfePetProfile` do shell (apps/shell/vite.config.ts:13) corresponde a apps/mfe-pet-profile pelo `name` e pelo `remoteEntry.js` (apps/mfe-pet-profile/vite.config.ts:9-10), e o `./App` importado em apps/shell/src/App.tsx:18 é exposto em apps/mfe-pet-profile/vite.config.ts:12; a porta 3002 (apps/mfe-pet-profile/package.json:7) só corrobora. Ativa pelo import e pela rota `pets/*` (apps/shell/src/App.tsx:48). O remote também expõe `./PetListPage`, `./PetDetailPage` e `./AddPetPage` (apps/mfe-pet-profile/vite.config.ts:13-15), sem consumidor.

**2. apps/shell → apps/mfe-symptom-checker.** `mfeSymptom` (apps/shell/vite.config.ts:14) resolve para apps/mfe-symptom-checker pelo `name` e `exposes` (apps/mfe-symptom-checker/vite.config.ts:9-12); o nome do remote não repete o do diretório, mas a correspondência pelo `name` é explícita. Ativa pelo import em apps/shell/src/App.tsx:19 e pela rota `symptom/*` (apps/shell/src/App.tsx:49).

**3. apps/shell → apps/mfe-risk-results.** `mfeRiskResults` (apps/shell/vite.config.ts:15) resolve para apps/mfe-risk-results (apps/mfe-risk-results/vite.config.ts:9-12). Ativa pelo import em apps/shell/src/App.tsx:20 e pela rota `risk-results/*` (apps/shell/src/App.tsx:50). A rota não aparece nos itens de navegação do layout (apps/shell/src/layouts/ShellLayout.tsx:11-16), mas está declarada no `Routes`.

**4. apps/shell → apps/mfe-vet-discovery.** `mfeVetDiscover` (apps/shell/vite.config.ts:16) resolve para apps/mfe-vet-discovery pelo `name` (apps/mfe-vet-discovery/vite.config.ts:9-12). Ativa pelo import em apps/shell/src/App.tsx:21 e pela rota `vet-discovery/*` (apps/shell/src/App.tsx:51).

**5. apps/shell → apps/mfe-vaccination.** `mfeVaccination` (apps/shell/vite.config.ts:17) resolve para apps/mfe-vaccination (apps/mfe-vaccination/vite.config.ts:9-12). Ativa pelo import em apps/shell/src/App.tsx:22 e pela rota `vaccination/*` (apps/shell/src/App.tsx:52).

**6. apps/shell → apps/mfe-admin.** `mfeAdmin` (apps/shell/vite.config.ts:18) resolve para apps/mfe-admin (apps/mfe-admin/vite.config.ts:9-12). Ativa pelo import em apps/shell/src/App.tsx:23 e pela rota `admin/*` (apps/shell/src/App.tsx:53); como a 3, não está nos itens de navegação (apps/shell/src/layouts/ShellLayout.tsx:11-16).

**7. apps/shell → apps/mfe-auth.** O remote `mfeAuth` (apps/shell/vite.config.ts:12) corresponde a apps/mfe-auth pelo `name`, `filename` e `exposes` (apps/mfe-auth/vite.config.ts:10-16), e o shell até declara o tipo `mfeAuth/App` (apps/shell/src/federation.d.ts:1), por isso No snapshot `Yes`. Nenhuma linha da revisão de código-fonte sustenta a relação: o shell não importa o remote e manda o usuário para `http://localhost:3001` por `window.location.replace` (apps/shell/src/App.tsx:12; apps/shell/src/layouts/ShellLayout.tsx:24). A relação só existe na configuração, então Ativa `No`.

## Resumo

Relações: 7 (host → remote: 7). Ativas: 6. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
