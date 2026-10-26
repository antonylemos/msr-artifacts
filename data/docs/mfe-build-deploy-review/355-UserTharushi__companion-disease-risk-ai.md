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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Leitura do repositório

Monorepo de npm workspaces (`apps/*`, `backend/services/nodejs/*`, `backend/services/python/*`, `packages/*`; package.json:5-10) orquestrado pelo Turbo: o `build` da raiz é só `turbo run build` (package.json:13), e a tarefa `build` do Turbo grava em `dist/**` de cada pacote (turbo.json:6-9). As oito aplicações frontend têm a mesma receita: script `build` com `tsc && vite build` (por exemplo apps/shell/package.json:8) sobre um `vite.config.ts` próprio, com o plugin `@originjs/vite-plugin-federation` e `build: { target: "esnext", minify: false, cssCodeSplit: false }` (apps/shell/vite.config.ts:9-21, :56-60; apps/mfe-admin/vite.config.ts:8-22). Cada remote gera o próprio `remoteEntry.js` (por exemplo apps/mfe-pet-profile/vite.config.ts:9-10), e o shell os busca em `http://localhost:3001` a `3007` (apps/shell/vite.config.ts:12-18), endereços fixos que coincidem com as portas dos scripts `dev` e `preview` de cada app (por exemplo apps/mfe-pet-profile/package.json:7, :9). Não há variante de produção dessas URLs.

O único artefato de contêiner do frontend é de desenvolvimento. O `docker-compose.yml` sobe dois serviços frontend, `shell` na porta 3000 e `mfe-auth` na 3001 (docker-compose.yml:11-16, :24-29), cada um com Dockerfile próprio. Os dois Dockerfiles são iguais exceto pela pasta e pela porta: instalam as dependências só da pasta do app, copiam o código e o `tsconfig.base.json`, e terminam em `CMD ["npm", "run", "dev", ...]`, ou seja, o servidor de desenvolvimento do Vite (apps/shell/Dockerfile:1-15; apps/mfe-auth/Dockerfile:1-15). Nenhum deles roda `vite build`. O próprio `vite.config.ts` do mfe-auth registra isso ao ligar o service worker em desenvolvimento: "The container serves `vite dev`" (apps/mfe-auth/vite.config.ts:47-49); a pasta `apps/mfe-auth/dev-dist/` (`registerSW.js`, `sw.js`, `workbox-*.js`) é saída desse modo, não um build de produção. Como na revisão do repositório 208, imagem que só roda o servidor de desenvolvimento não conta como deploy. Os outros seis remotes (portas 3002 a 3007) não têm serviço no compose, então o shell em contêiner só os alcançaria se fossem subidos à mão.

O resto da infraestrutura é de backend. Os sete serviços Node.js têm Dockerfiles de dois estágios que compilam com `tsc` e rodam `node dist/server.js` (por exemplo backend/services/nodejs/api-gateway/Dockerfile:1-20); os dois serviços Python, imagens `python:3.11-slim` com `uvicorn` (backend/services/python/ai-service/Dockerfile:1-7; backend/services/python/agent-service/Dockerfile:1). O compose os sobe junto com Neo4j e MongoDB (docker-compose.yml:35-237). O `infra/gcp/cloudbuild.yaml`, que a mineração não registrou, constrói e publica no Artifact Registry só as imagens de backend, marcadas com `$COMMIT_SHA` (infra/gcp/cloudbuild.yaml:1-59), e o `infra/gcp/services.env.example` lista URLs do Cloud Run apenas desses serviços (:1-8). Nenhum passo do Cloud Build cobre aplicação frontend. Há ainda uma incoerência no Cloud Build: ele usa a pasta do serviço como contexto (infra/gcp/cloudbuild.yaml:7), mas os Dockerfiles Node.js copiam caminhos relativos à raiz do repositório (backend/services/nodejs/api-gateway/Dockerfile:3-4), como faz o compose com `context: .` (docker-compose.yml:36-38).

O README cita "GCP (Cloud Run + Vertex AI + Cloud Build) + Firebase" e uma pasta `infra/firebase/` (README.md:13, :50), que não existe no snapshot; manda subir tudo com `docker compose up --build` (README.md:67-71) e afirma que a aplicação usada de fato é `apps/mfe-auth`, na porta 3001, enquanto "The shell + other MFEs are scaffold" (README.md:80). Não há workflow de CI, configuração de hospedagem nem ocorrências `ci-*` ou `cfg-public-path` no `matches.csv`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/mfe-admin | separado | não observado | `http://localhost:3007/assets/remoteEntry.js` (apps/shell/vite.config.ts:18), porta só de `dev`/`preview` (apps/mfe-admin/package.json:7, :9) | No | apps/mfe-admin/package.json:8 (`tsc && vite build`); apps/mfe-admin/vite.config.ts:8-22 (remote `mfeAdmin`, `remoteEntry.js` e opções de build); package.json:13 (`turbo run build` dispara os builds) |
| 2 | apps/mfe-auth | separado | não observado | `http://localhost:3001` (apps/mfe-auth/package.json:7, :9; apps/shell/vite.config.ts:12; apps/shell/src/App.tsx:12), servida pelo servidor de desenvolvimento no contêiner (apps/mfe-auth/Dockerfile:13-15; docker-compose.yml:28-29) | No | apps/mfe-auth/package.json:8 (`tsc && vite build`); apps/mfe-auth/vite.config.ts:9-52 (remote `mfeAuth`, PWA e opções de build); apps/mfe-auth/Dockerfile:1-15 (imagem que roda `npm run dev`); docker-compose.yml:24-32 (serviço `mfe-auth`) |
| 3 | apps/mfe-pet-profile | separado | não observado | `http://localhost:3002/assets/remoteEntry.js` (apps/shell/vite.config.ts:13), porta só de `dev`/`preview` (apps/mfe-pet-profile/package.json:7, :9) | No | apps/mfe-pet-profile/package.json:8 (`tsc && vite build`); apps/mfe-pet-profile/vite.config.ts:8-20 (remote `mfePetProfile`, `remoteEntry.js` e opções de build) |
| 4 | apps/mfe-risk-results | separado | não observado | `http://localhost:3004/assets/remoteEntry.js` (apps/shell/vite.config.ts:15), porta só de `dev`/`preview` (apps/mfe-risk-results/package.json:7, :9) | No | apps/mfe-risk-results/package.json:8 (`tsc && vite build`); apps/mfe-risk-results/vite.config.ts:8-19 (remote `mfeRiskResults`, `remoteEntry.js` e opções de build) |
| 5 | apps/mfe-symptom-checker | separado | não observado | `http://localhost:3003/assets/remoteEntry.js` (apps/shell/vite.config.ts:14), porta só de `dev`/`preview` (apps/mfe-symptom-checker/package.json:7, :9) | No | apps/mfe-symptom-checker/package.json:8 (`tsc && vite build`); apps/mfe-symptom-checker/vite.config.ts:8-19 (remote `mfeSymptom`, `remoteEntry.js` e opções de build) |
| 6 | apps/mfe-vaccination | separado | não observado | `http://localhost:3006/assets/remoteEntry.js` (apps/shell/vite.config.ts:17), porta só de `dev`/`preview` (apps/mfe-vaccination/package.json:7, :9) | No | apps/mfe-vaccination/package.json:8 (`tsc && vite build`); apps/mfe-vaccination/vite.config.ts:8-19 (remote `mfeVaccination`, `remoteEntry.js` e opções de build) |
| 7 | apps/mfe-vet-discovery | separado | não observado | `http://localhost:3005/assets/remoteEntry.js` (apps/shell/vite.config.ts:16), porta só de `dev`/`preview` (apps/mfe-vet-discovery/package.json:7, :9) | No | apps/mfe-vet-discovery/package.json:8 (`tsc && vite build`); apps/mfe-vet-discovery/vite.config.ts:8-20 (remote `mfeVetDiscover`, `remoteEntry.js` e opções de build) |
| 8 | apps/shell | separado | não observado | `http://localhost:3000` (apps/shell/package.json:7), servida pelo servidor de desenvolvimento no contêiner (apps/shell/Dockerfile:13-15; docker-compose.yml:15-16) | No | apps/shell/package.json:8 (`tsc && vite build`); apps/shell/vite.config.ts:9-60 (host com remotes em `localhost`, PWA e opções de build); apps/shell/Dockerfile:1-15 (imagem que roda `npm run dev`); docker-compose.yml:11-21 (serviço `shell`) |

## Observações

**1. apps/mfe-admin.** Build próprio: o script `tsc && vite build` (apps/mfe-admin/package.json:8) usa a configuração do app, que gera o `remoteEntry.js` do remote `mfeAdmin` (apps/mfe-admin/vite.config.ts:9-10); o shell só o consome em tempo de execução (apps/shell/vite.config.ts:18), por isso `separado`, mesmo com o disparo conjunto pelo Turbo (package.json:13). Nenhum Dockerfile, serviço do compose ou passo do Cloud Build cobre o app. A porta 3007 aparece só nos scripts `dev` e `preview` (apps/mfe-admin/package.json:7, :9). A `version` `1.0.0` não é usada para publicar, e o pacote é `private` (apps/mfe-admin/package.json:3-4).

**2. apps/mfe-auth.** Build próprio (apps/mfe-auth/package.json:8; apps/mfe-auth/vite.config.ts:9-52), com remote `mfeAuth` e PWA. É uma das duas aplicações com imagem e serviço próprios no compose (apps/mfe-auth/Dockerfile:1-15; docker-compose.yml:24-32), mas a imagem só instala dependências, copia o código e roda `npm run dev` na porta 3001 (apps/mfe-auth/Dockerfile:7, :10, :15), sem `vite build`; por isso o deploy é `não observado`, e não `separado`. O `devOptions` do PWA foi ligado justamente porque "The container serves `vite dev`" (apps/mfe-auth/vite.config.ts:47-49). Segundo o README, é a aplicação usada de fato, executada isoladamente na porta 3001 (README.md:80), e o shell redireciona para ela em vez de federá-la (apps/shell/src/App.tsx:8-13). `version` `1.0.0` sem uso na publicação; pacote `private` (apps/mfe-auth/package.json:3-4).

**3. apps/mfe-pet-profile.** Mesma forma da aplicação 1: build próprio (apps/mfe-pet-profile/package.json:8) com o remote `mfePetProfile` (apps/mfe-pet-profile/vite.config.ts:9-10), consumido pelo shell em `localhost:3002` (apps/shell/vite.config.ts:13). Sem artefato de deploy; porta só em `dev` e `preview` (apps/mfe-pet-profile/package.json:7, :9). `version` `1.0.0` sem uso; pacote `private` (apps/mfe-pet-profile/package.json:3-4).

**4. apps/mfe-risk-results.** Build próprio (apps/mfe-risk-results/package.json:8) com o remote `mfeRiskResults` (apps/mfe-risk-results/vite.config.ts:9-10), consumido em `localhost:3004` (apps/shell/vite.config.ts:15). Sem artefato de deploy; porta só em `dev` e `preview` (apps/mfe-risk-results/package.json:7, :9). `version` `1.0.0` sem uso; pacote `private` (apps/mfe-risk-results/package.json:3-4).

**5. apps/mfe-symptom-checker.** Build próprio (apps/mfe-symptom-checker/package.json:8) com o remote `mfeSymptom` (apps/mfe-symptom-checker/vite.config.ts:9-10), consumido em `localhost:3003` (apps/shell/vite.config.ts:14). Sem artefato de deploy; porta só em `dev` e `preview` (apps/mfe-symptom-checker/package.json:7, :9). `version` `1.0.0` sem uso; pacote `private` (apps/mfe-symptom-checker/package.json:3-4).

**6. apps/mfe-vaccination.** Build próprio (apps/mfe-vaccination/package.json:8) com o remote `mfeVaccination` (apps/mfe-vaccination/vite.config.ts:9-10), consumido em `localhost:3006` (apps/shell/vite.config.ts:17). Sem artefato de deploy; porta só em `dev` e `preview` (apps/mfe-vaccination/package.json:7, :9). `version` `1.0.0` sem uso; pacote `private` (apps/mfe-vaccination/package.json:3-4).

**7. apps/mfe-vet-discovery.** Build próprio (apps/mfe-vet-discovery/package.json:8) com o remote `mfeVetDiscover` (apps/mfe-vet-discovery/vite.config.ts:9-10), consumido em `localhost:3005` (apps/shell/vite.config.ts:16). Sem artefato de deploy; porta só em `dev` e `preview` (apps/mfe-vet-discovery/package.json:7, :9). `version` `1.0.0` sem uso; pacote `private` (apps/mfe-vet-discovery/package.json:3-4).

**8. apps/shell.** Build próprio (apps/shell/package.json:8; apps/shell/vite.config.ts:9-60); os remotes são resolvidos em tempo de execução pelas URLs `localhost` (apps/shell/vite.config.ts:12-18), de modo que o código deles não entra no artefato do shell. Como o mfe-auth, tem imagem e serviço próprios no compose (apps/shell/Dockerfile:1-15; docker-compose.yml:11-21), mas a imagem roda `npm run dev` na porta 3000 (apps/shell/Dockerfile:15), sem build; por isso o deploy é `não observado`. O `preview` do shell não fixa porta (apps/shell/package.json:9). `version` `1.0.0` sem uso na publicação; pacote `private` (apps/shell/package.json:3-4).

## Resumo

Aplicações: 8. Build (separado: 8). Deploy (não observado: 8). Versionamento independente: 0.
