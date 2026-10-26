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

## Construções da mineração

Nenhuma ocorrência src-* no matches.csv.

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 0.

## Notas

- O `matches.csv` não tem linhas `src-*`, e a tabela "Unidades" da revisão estrutural não tem linhas: o snapshot não tem código de nenhuma das cinco zonas. Elas são submódulos com repositório próprio (.gitmodules:4-18: `apps/dashboard`, `apps/auth`, `apps/profile`, `apps/study`, `apps/decks`), e os diretórios não existem em `files/`. Os alvos da composição ficam todos fora do snapshot.
- A composição multi-zones aparece só no gateway nginx, que é configuração de deploy e não código de unidade: infra/nginx/routing-map.frontend.conf:1-9 mapeia `/dashboard`, `/auth`, `/profile`, `/study` e `/decks` para o serviço de cada zona. Por isso não vira linha manual.
- A busca do passo 4 só encontrou exemplos de documentação nas skills de `.agents/` (ex.: `lazy(() => import('./HeavyChart'))` em .agents/skills/frontend-patterns/SKILL.md:324-325 e linhas de dados em .agents/skills/ui-ux-pro-max/data/*.csv). Não são código de unidade e não viram linha.
