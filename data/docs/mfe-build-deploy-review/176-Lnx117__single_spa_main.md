---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
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

# 176 — Lnx117/single_spa_main

## Leitura do repositório

O snapshot é só o root config de uma aplicação single-spa: um projeto Vite na raiz, sem workspace, com `package.json`, `package-lock.json`, `vite.config.ts`, `index.html`, `src/main.ts` e `.envtest`. O `package.json` tem três scripts: `dev` (`vite`), `build` (`vite build`) e `preview` (`vite preview`) (package.json:6-10). O build usa a configuração de `vite.config.ts`, com o `vitePluginSingleSpa` em `type: 'root'` (vite.config.ts:12-15); a saída vai para o diretório padrão do Vite, porque a configuração não define `build` nem `base`. O bloco `server` só vale para o dev server: porta 9080 e `host: true` (vite.config.ts:17-22).

Não há artefato de deploy. O `matches.csv` não tem ocorrências `ops-*`, `ci-*` nem `cfg-public-path`, e o snapshot não tem Dockerfile, compose, workflow de CI nem configuração de hospedagem. O que existe é configuração de desenvolvimento: os dois microfrontends que o root config carrega, `menu` e `base`, estão fora do repositório e são apontados por URLs de dev servers Vite em `localhost` (.envtest:8, 11; src/main.ts:15, 23). Um comentário do `.envtest` menciona, como passo futuro, usar builds publicados num CDN, com uma URL de exemplo (.envtest:5); é um comentário, não um artefato de deploy, e não decide a coluna Deploy.

Como `menu` e `base` não estão no snapshot, não entram na tabela; a revisão estrutural só tem a raiz como aplicação. Não há backend nem servidor de API.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | `http://localhost:9080` em desenvolvimento (vite.config.ts:18) | No | package.json:8 (`vite build`); vite.config.ts:5-16 (configuração Vite com `vitePluginSingleSpa` em `type: 'root'`) |

## Observações

**1. Raiz (`.`).** Build próprio: o script `build` roda `vite build` na raiz (package.json:8), com a configuração do root config (vite.config.ts:5-16), e gera um artefato só desta aplicação. Os microfrontends não entram nele: o `import()` das URLs de `VITE_MENU` e `VITE_BASE` é marcado com `@vite-ignore` (src/main.ts:15, 23) e resolvido em tempo de execução. Deploy `não observado`: nenhum artefato do snapshot empacota ou publica a aplicação; `dev` e `preview` (package.json:7, 9) são comandos de desenvolvimento e a porta 9080 é do dev server (vite.config.ts:17-18). A versão `1.0.0` (package.json:3) não é usada em nenhuma publicação, daí Versionamento `No`.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.
