---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-custom-element | src/main.ts:218 | . | none | No | Linha de comentário (`// O outro projeto precisa servir url com CORS * e registrar customElements.define(tag)`) que descreve o contrato esperado da unidade externa; não é código executável. O `customElements.define` fica no bundle externo, fora do snapshot; o consumo da tag está na tabela manual (src/main.ts:167). |
| src-dynamic-script | src/main.ts:225 | . | script-loading | Yes | `document.createElement('script')` com `type = 'module'` e `src = url` (src/main.ts:226-227), anexado ao `head` (src/main.ts:230), carrega o bundle da unidade externa `member-manager` de `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6). Cadeia ativa: index.html:34 → `initAuth()` (src/main.ts:234) → `loadMicrofrontends()` (src/main.ts:81) → `selectMicrofrontend()` (src/main.ts:174) → `loadScript(entry.url, entry.tag)` (src/main.ts:210). |
| src-cross-unit-communication | public/silent-check-sso.html:3 | . | none | No | `parent.postMessage(location.href, location.origin)` é a página de silent check-sso do keycloak-js (comentário em public/silent-check-sso.html:1-2), comunicação com a biblioteca de autenticação, não entre unidades frontend; além disso, `keycloak.init` usa `onLoad: 'login-required'` e `checkLoginIframe: false`, sem `silentCheckSsoRedirectUri` (src/main.ts:74-78), e nenhum outro arquivo referencia a página. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | public/microfrontends.json:4 | . | host-relationship | Yes | `"tag": "member-manager"` com `"url": "https://crud-member-manager.vercel.app/main.js"` (public/microfrontends.json:6) declara a aplicação externa que a casca usa e de onde a carrega; o registro é lido em runtime por `fetch('/microfrontends.json')` (src/main.ts:139) dentro de `loadMicrofrontends()`, chamada em src/main.ts:81. |
| manual | src/main.ts:167 | . | custom-element | Yes | ``mount.innerHTML = `<${entry.tag}></${entry.tag}>` `` insere a tag do custom element da unidade externa (`<member-manager>`, public/microfrontends.json:4) no wrapper anexado ao container `#microfrontends` (src/main.ts:168-169, index.html:31); a definição do elemento vem do script carregado em src/main.ts:225, e `customElements.get(tag)` (src/main.ts:221) evita recarregar. Não é pego pelos padrões `src-*` porque a tag é montada por template string. |

## Resumo

Construções com composição: 3 (script-loading: 1, host-relationship: 1, custom-element: 1).

## Notas

- A unidade alvo `member-manager` é externa (https://crud-member-manager.vercel.app/main.js) e não está no snapshot; não há `customElements.define` no snapshot. O comentário de docker-compose.yml:18 cita `customElements.define('posts-crud')` para o serviço `posts-crud`, cujo contexto está fora do repositório (docker-compose.yml:19-22) e que não aparece em public/microfrontends.json.
- O padrão `src-custom-element` casou com prosa de comentário (src/main.ts:218) e `src-cross-unit-communication` com o `postMessage` do Keycloak (public/silent-check-sso.html:3); ambos são falsos positivos.
