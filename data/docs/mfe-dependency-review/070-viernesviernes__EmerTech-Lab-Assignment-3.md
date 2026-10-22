---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| client/auth-app/package.json:15 | dependencies | @originjs/vite-plugin-federation | 1.3.5 | module-federation | Yes | client/auth-app/vite.config.js:3-17 (configuração padrão do Vite importa `federation` e o invoca em plugins com exposes e shared); client/auth-app/package.json:6-11 (build executa `vite build` sem configuração alternativa) |
| client/community-app/package.json:15 | dependencies | @originjs/vite-plugin-federation | 1.3.5 | module-federation | Yes | client/community-app/vite.config.js:3-17 (configuração padrão do Vite importa `federation` e o invoca em plugins com exposes e shared); client/community-app/package.json:6-11 (build executa `vite build` sem configuração alternativa) |
| client/shell-app/package.json:14 | dependencies | @originjs/vite-plugin-federation | 1.3.5 | module-federation | Yes | client/shell-app/vite.config.js:3-17 (configuração padrão do Vite importa `federation` e o invoca em plugins com remotes e shared); client/shell-app/package.json:6-10 (build executa `vite build` sem configuração alternativa) |
