---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| main-vue3/package.json:12 | dependencies | qiankun | ^2.10.16 | qiankun | Yes | main-vue3/src/main.ts:3 (importa `registerMicroApps, start` de `'qiankun'`); main-vue3/src/main.ts:10-23 (invoca `registerMicroApps` com `sub-vue2` e `sub-react16`); main-vue3/src/main.ts:26-36 (invoca `start` com `strictStyleIsolation: true`); main-vue3/index.html:11 (ponto de entrada do host carrega `/src/main.ts`) |

## Notas

- O lado da sub-app (`sub-vue2/src/main.js`, `sub-vue2/vue.config.js`) não importa o pacote `qiankun`; ele só segue o contrato (lifecycles, saída UMD), e `sub-vue2/package.json` não declara o pacote. A resposta se apoia apenas no host.
