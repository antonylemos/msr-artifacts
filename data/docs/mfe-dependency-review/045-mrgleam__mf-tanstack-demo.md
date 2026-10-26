---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 045 — mrgleam/mf-tanstack-demo

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| shell/package.json:16 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | shell/vite.config.ts:2-14 (configuração padrão do Vite importa `federation` e o invoca em plugins com remotes e shared); shell/package.json:5-8 (build executa `vite build` sem configuração alternativa) |
| shop/package.json:17 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | shop/vite.config.ts:2-15 (configuração padrão do Vite importa `federation` e o invoca em plugins com exposes e shared); shop/package.json:5-8 (build executa `vite build` sem configuração alternativa) |
