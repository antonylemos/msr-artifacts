---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
inputs:
  clone: data/samples/mfe-sample-001/repos/charger17__mfe
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 197 — charger17/mfe

## Leitura do repositório

O histórico até o snapshot tem 44 commits, de 2025-06-05 a 2025-06-16, sem merges. A maioria tem mensagem padrão de envio ou edição pela interface web ("Add files via upload", "Update …", "Create …", "Delete …"). Os marcos são estes:

- `c353631` (2025-06-05, "Create readme.txt") cria o `readme.txt`;
- `ed8bc04` (2025-06-05, "Add files via upload") cria o `.gitignore`;
- `90a9779` (2025-06-06, "Add files via upload") cria de uma vez o container e o marketing completos, com as configurações webpack, os fontes e o wrapper `MarketingApp.js`, além de só o `package.json` (e o `package-lock.json`) de auth e dashboard;
- entre 2025-06-06 e 2025-06-09, uma série de commits cria e ajusta os workflows do container (`900f654`, "Create container", depois `c10b605`, "Rename container to container.yml", e vários "Update container.yml") e do marketing (`25b361c`, "Create marketing.yml");
- `5fc915e` (2025-06-16, "Add files via upload") cria os fontes e as configurações do auth e o wrapper `AuthApp.js` do container, e altera a configuração e o `App.js` do container;
- `c04d19e` (2025-06-16, "Add files via upload"), o commit do snapshot, cria os fontes e as configurações do dashboard e o wrapper `DashboardApp.js`, e altera de novo a configuração e o `App.js` do container.

Os `package-lock.json` de container, marketing, auth e dashboard são removidos em commits próprios (`2346ff7`, `7efba35`, `26a63ec`, `0d605c5`), o que bate com o `.gitignore` citado na revisão de build e deploy. O commit `d22735d` (2025-06-16, "Add files via upload") não lista nenhum arquivo alterado. Como os arquivos chegam por upload, o histórico mostra a ordem em que cada unidade foi enviada, mas não onde nem como o código foi feito antes. Cada unidade tem primeira presença observável no commit de upload em que aparece.

As revisões anteriores não deixaram ponto ambíguo que o histórico pudesse esclarecer:

- a revisão de dependências não tem linha;
- as quatro unidades são `Yes`;
- as construções de composição são todas ativas, sem nenhuma comentada ou `Undetermined`;
- as três relações são ativas;
- o deploy das quatro aplicações é `separado`;
- a revisão de documentação não tem afirmações.

O bloco de template comentado em `packages/dashboard/src/components/Dashboard.vue:138` foi deixado fora pela revisão de documentação, por tratar da aparência de uma unidade. Por isso o histórico não foi consultado além deste contexto.

## Pontos

Nenhum ponto ambíguo nas revisões anteriores.

## Comandos

```
docs/mfe-history-review/tools/hist.sh charger17__mfe rev-list --count c04d19eb237bd77ce574657d732efe265c0de531
docs/mfe-history-review/tools/hist.sh charger17__mfe rev-list --count --merges c04d19eb237bd77ce574657d732efe265c0de531
docs/mfe-history-review/tools/hist.sh charger17__mfe log --format='%h %ad %s' --date=short --name-status --no-renames c04d19eb237bd77ce574657d732efe265c0de531
```

## Resumo

Commits até o snapshot: 44 (2025-06-05 a 2025-06-16). Pontos: 0.
