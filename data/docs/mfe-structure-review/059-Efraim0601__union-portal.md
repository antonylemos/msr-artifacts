---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 059 — Efraim0601/union-portal

## Workspace

angular.json:19-21 e angular.json:48-49 (shell); angular.json:146-147 e angular.json:174-175 (promote); angular.json:273-274 e angular.json:301-302 (diaspora).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-17 (manifesto do workspace) | — | — | — | — | No | Raiz de coordenação Angular; os targets pertencem às três aplicações em projects/, sem UI adicional na raiz. |
| projects/diaspora | projects/diaspora/federation.config.js | — | angular.json:332 (browser diaspora); projects/diaspora/src/main.ts:1-6 (carrega bootstrap); projects/diaspora/src/bootstrap.ts:1-5 (inicia a UI) | angular.json:305-317 (target build diaspora); angular.json:329-333 (alvo esbuild); Dockerfile:22 (`ng build diaspora`) | angular.json:273-274 e angular.json:301-302 (projeto diaspora) | Dockerfile:22 e Dockerfile:41 (build e diretório de artefatos próprios dentro de imagem conjunta) | Yes | Projeto Angular com entrada e target de build próprios, sem necessidade de manifesto local. |
| projects/promote | projects/promote/federation.config.js | — | angular.json:205 (browser promote); projects/promote/src/main.ts:1-6 (carrega bootstrap); projects/promote/src/bootstrap.ts:1-5 (inicia a UI) | angular.json:178-190 (target build promote); angular.json:202-206 (alvo esbuild); Dockerfile:21 (`ng build promote`) | angular.json:146-147 e angular.json:174-175 (projeto promote) | Dockerfile:21 e Dockerfile:40 (build e diretório de artefatos próprios dentro de imagem conjunta) | Yes | Projeto Angular com entrada e target de build próprios, sem necessidade de manifesto local. |
| projects/shell | projects/shell/federation.config.js | — | angular.json:79 (browser shell); projects/shell/src/main.ts:1-6 (carrega bootstrap); projects/shell/src/bootstrap.ts:1-5 (inicia a UI) | angular.json:52-64 (target build shell); angular.json:76-80 (alvo esbuild); Dockerfile:20 (`ng build shell`) | angular.json:20-21 e angular.json:48-49 (projeto shell) | Dockerfile:20 e Dockerfile:38 (build e diretório de artefatos próprios dentro de imagem conjunta) | Yes | Projeto Angular com entrada e target de build próprios, sem necessidade de manifesto local. |
| server/diaspora-otp | server/diaspora-otp/package.json | server/diaspora-otp/package.json:1-16 (pacote do servidor) | server/diaspora-otp/package.json:8-9 (executa index.js); server/diaspora-otp/index.js:18 e server/diaspora-otp/index.js:528-530 (inicia servidor Express, sem UI) | — | — | deploy/test/Dockerfile.otp:5-9 (imagem do backend) | No | Servidor Express de API/OTP, sem entrada de aplicação frontend. |

## Resumo

Aplicações frontend no snapshot: 3 (projects/diaspora, projects/promote, projects/shell).

## Notas

- Dockerfile:20-22 constrói as aplicações separadamente e Dockerfile:38-41 mantém seus artefatos em diretórios distintos. A imagem e o deploy são conjuntos; a coluna Deploy registra a separação dos artefatos, sem afirmar imagens independentes.
- projects/auth e projects/design-system são bibliotecas referenciadas por aliases em tsconfig.json:18-24; não estão em units.csv e não foram acrescentadas à tabela.
