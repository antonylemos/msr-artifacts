---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
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

# 008 — mrmechazilla/host-app

## Leitura do repositório

O único `.md` é um README de uma linha, só com o título "# Host Application Documentation" (README.md:1). O título chama o repositório de host, mas não afirma nada verificável sobre a organização das unidades. O `package.json` não tem `description`.

Foram lidos os artefatos que as revisões anteriores citam: angular.json, package.json, public/mf.manifest.json, webpack.config.js, webpack.prod.config.js, src/index.html, src/main.ts, src/app/app.config.ts, src/app/app.routes.ts, src/app/core/models/remote-config.ts e src/app/shared/utils/remote-loader.ts. O único comentário é um bloco que desativa uma versão antiga do carregador de remotes (src/app/shared/utils/remote-loader.ts:1-28). É código comentado, não documentação.

O repositório, portanto, não documenta sua arquitetura. Tudo o que se sabe dele vem dos artefatos, já registrado nas revisões anteriores.

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

Nenhuma afirmação arquitetural.

## Observações

Sem afirmações.

## Resumo

Afirmações: 0.
