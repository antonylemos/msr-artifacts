---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

# 284 — RafaM-dev/hostRepo

## Leitura do repositório

O repositório tem uma só aplicação React + Vite, o host, na raiz. O remote que ele carrega, `mf-remoteDetails`, não está no snapshot: aparece só como `http://localhost:5001/assets/remoteEntry.js` na configuração do Module Federation (vite.config.ts:11-13; ver a revisão de composição). O build e o deploy desse remote, se existem, estão fora do repositório. O build do host é o padrão do Vite, `tsc -b && vite build` (package.json:8), com o plugin `@originjs/vite-plugin-federation` (vite.config.ts:3, 8-15). O config não define `build.outDir` nem `base`, então a saída é a padrão do Vite; `.gitignore:11` ignora `dist`.

Os outros scripts são de desenvolvimento: `vite` e `vite preview` (package.json:7, 10). Não há Dockerfile, CI, configuração de hospedagem nem script de publicação, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` ou `cfg-public-path`. O README só manda rodar `npm run build` e `npm run preview` localmente e cita a porta 5173 do servidor de desenvolvimento (README.md:52, 56-62, 318-322); ele não descreve deploy. O arquivo vazio `remote-root@0.0.0` na raiz não é artefato de build nem de deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | — | No | package.json:8 (`tsc -b && vite build`); vite.config.ts:5-17 (config Vite com `react()` e `federation(...)` do host) |

## Observações

**1. Raiz (`.`).** Aplicação da raiz, o host. Build separado: tem script e config de build próprios (package.json:8; vite.config.ts:5-17), e o código do remote não está neste repositório. Sem deploy observado: só há os comandos de desenvolvimento `vite` e `vite preview` (package.json:7, 10), e nada no snapshot publica a aplicação. Onde é servida fica `—`: o `vite.config.ts` não fixa porta nem `base`; a porta 5173 aparece só no README (README.md:52), que não é artefato. Sem versionamento: package.json:4 declara `0.0.0`, sem uso em publicação.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.
