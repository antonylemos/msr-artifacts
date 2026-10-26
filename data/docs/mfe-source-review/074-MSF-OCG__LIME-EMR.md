---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Construções da mineração

Nenhuma ocorrência src-* no matches.csv.

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 0.

## Notas

- O `matches.csv` tem 37 linhas, nenhuma com `pattern` começando por `src-`: só `ci-workflow-file` (9), `ops-compose-service` (12), `ops-deployment-file` (5), `ops-dockerfile` (2), `doc-import-map-zones` (5), `doc-mfe-term` (3) e `doc-independence` (1).
- A revisão estrutural julga `No` os dois diretórios candidatos (`.`, pacote de testes Playwright; `docs`, site Docsify), ou seja, 0 aplicações frontend no snapshot. Qualquer linha desta etapa receberia `Unidade: —`.
- O snapshot tem 450 arquivos fora de `.yarn/` e quase nenhum código de UI: 10 `.ts` (todos em `e2e/`, specs Playwright), 1 `.js` (`playwright.config.js`), 1 `.html` (`docs/index.html`) e 3 `.groovy` em `scripts/`. A busca do passo 4 (`import(`, `React.lazy`, `loadRemote*`, `initFederation`, `registerRemotes`, `System.import`, `customElements`, `registerApplication`, `registerMicroApps`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `createElement('script')`) não teve nenhuma ocorrência fora de `.yarn/releases/yarn-4.13.0.cjs`, que é o binário do gerenciador de pacotes empacotado no repositório.
- `docs/index.html:35-40` carrega seis scripts de CDN (`docsify.min.js`, `search.min.js`, quatro componentes do Prism). Não entraram no `matches.csv` porque o regex de `src-html-external-script` exige `https?://` e as URLs são relativas ao protocolo (`//cdn.jsdelivr.net/...`). Não viraram linha manual porque são bibliotecas de terceiros do próprio site de documentação, não o bundle de outra unidade.
- O mecanismo de composição que a classificação registra (`approaches: [import-maps]`) não aparece em código-fonte neste commit. Toda referência a import map está em configuração ou build: `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json` (42 `frontendModules`), `README.md:1081-1082` e os `pom.xml` dos três sites (`sites/mosul/pom.xml:232-233`, `sites/bunia/pom.xml:330-331`, `sites/matsapha/pom.xml:285-286`), que ligam `scripts/remove-importmap-entries.groovy` ao build. Esse script edita `importmap.json` e `routes.registry.json` em `target/` (`scripts/remove-importmap-entries.groovy:71-100`) e falha o build quando uma rota fica sem entrada no mapa (`:113-122`); é manutenção dos mapas em tempo de build, não carregamento, resolução, montagem ou registro em runtime, e por isso não cabe em nenhum dos tipos do passo 4. Os mapas que ele edita são gerados e não estão no snapshot, e o app-shell que os consome é externo ao repositório.
