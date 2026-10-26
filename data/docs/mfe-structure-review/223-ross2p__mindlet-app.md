---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|

## Resumo

Aplicações frontend no snapshot: 0.

## Notas

- O `units.csv` tem só o cabeçalho, e por isso a tabela não tem linhas. O snapshot não tem `package.json`, `angular.json`, `project.json` nem configuração de build; tem só `README.md`, `compose.yml`, `start-local-dev.sh`, `.gitmodules`, `skills-lock.json`, as configurações de nginx em `config/nginx/` e `infra/nginx/`, e as skills em `.agents/`.
- A contagem difere de `frontend_units: 5` da classificação porque as cinco zonas são externas ao snapshot. São submódulos (.gitmodules:4-18: `apps/dashboard`, `apps/auth`, `apps/profile`, `apps/study`, `apps/decks`, cada um com repositório próprio), e os diretórios não existem em `files/`. `libs/types` e `libs/shared` (.gitmodules:1-3, 19-21) também são submódulos.
- O deploy dessas zonas aparece só fora delas: compose.yml:15-108 declara um serviço por zona com `build.context: apps/<zona>` e `dockerfile: Dockerfile` (ex.: compose.yml:17-18). As ocorrências `ops-*` do `matches.csv` são do gateway nginx (`config/nginx/nginx.conf:31-71`, `infra/nginx/nginx.conf:29-65`), que não é unidade frontend. Não há ocorrências `ws-*` nem `ci-*`.
