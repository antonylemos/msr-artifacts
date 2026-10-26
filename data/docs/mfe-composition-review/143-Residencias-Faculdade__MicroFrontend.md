---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Leitura do repositório

O repositório contém só a casca (`.`), uma aplicação Vite + TypeScript sem framework que se
apresenta como "Biblioteca Shell para Micro Frontends via Web Components" e promete plugar
"qualquer frontend que exponha um `Custom Element`" sem rebuild da casca (README.md:1-3). Os
frontends plugados ficam em outros repositórios, de outras equipes: o registro diz "Projeto da
equipe 2 (Member Manager)" (public/microfrontends.json:3).

A composição é por registro lido em runtime. Depois do login obrigatório no Keycloak
(`onLoad: 'login-required'`, src/main.ts:74-78), a casca busca `/microfrontends.json`
(src/main.ts:139) e, para cada entrada, cria um botão na barra lateral e um wrapper com a tag do
custom element (``mount.innerHTML = `<${entry.tag}></${entry.tag}>` ``, src/main.ts:167),
anexado ao container `#microfrontends` (src/main.ts:169, index.html:31). Ao selecionar uma
entrada, a casca injeta `<script type="module" src=url>` no `head` se a tag ainda não estiver
definida (src/main.ts:219-231); o bundle externo é que deve chamar `customElements.define(tag)`
(comentário em src/main.ts:218). A única entrada do registro é `member-manager`, servida de
`https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6), fora do
snapshot. O propósito é de exemplo de integração entre equipes.

O que não virou relação: o `docker-compose.yml` sobe um serviço `posts-crud`, descrito como
"Micro frontend Angular (outro repo)" que deve registrar `customElements.define('posts-crud')`
(docker-compose.yml:17-18), com `context` fora do repositório (docker-compose.yml:21), e o
comentário src/main.ts:165 usa `<posts-crud></posts-crud>` como exemplo; mas `posts-crud` não
está no registro (public/microfrontends.json:1-8) e nenhum código da casca o carrega, então não há
relação. A página `public/silent-check-sso.html` faz `postMessage` para a biblioteca do Keycloak,
não para outra unidade frontend. Não há troca de mensagens nem repasse de token entre a casca e o
custom element no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | member-manager | application → custom-element | origem → destino | web-components | No | Yes | public/microfrontends.json:4-6 (`tag: member-manager`, `url: https://crud-member-manager.vercel.app/main.js`) | src/main.ts:225; public/microfrontends.json:4; src/main.ts:167 |

## Observações

**1. . → member-manager.** A casca usa a tag `<member-manager>`, montada por template string a
partir do registro (src/main.ts:167; tag em public/microfrontends.json:4), e carrega o script que
a define com `document.createElement('script')`, `type = 'module'` e `src = url`
(src/main.ts:225-227, anexado em src/main.ts:230); pela regra do tipo, o script entra na mesma
relação da tag. O destino é o nome da tag como aparece no registro: o bundle vem de
`https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:6), e nenhuma
unidade do snapshot define esse elemento, por isso No snapshot `No`. Ativa `Yes`: as três linhas
da revisão de código-fonte são `Yes`, numa cadeia que parte da entrada (index.html:34 →
`initAuth()` em src/main.ts:234 → `loadMicrofrontends()` em src/main.ts:81 →
`selectMicrofrontend()` em src/main.ts:174 → `loadScript` em src/main.ts:210). O registro
aparece na Configuração por ser a declaração que liga a casca à unidade, e no Código porque a
revisão de código-fonte o registrou como construção manual.

## Resumo

Relações: 1 (application → custom-element: 1). Ativas: 1. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
