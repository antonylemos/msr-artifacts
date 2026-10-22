---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/diaspora/src/main.ts:5 | projects/diaspora | dynamic-loading | No | projects/diaspora/src/main.ts:5 importa seu próprio bootstrap; carregamento interno à unidade. |
| src-async-bootstrap | projects/promote/src/main.ts:5 | projects/promote | dynamic-loading | No | projects/promote/src/main.ts:5 importa seu próprio bootstrap; carregamento interno à unidade. |
| src-async-bootstrap | projects/shell/src/main.ts:5 | projects/shell | dynamic-loading | No | projects/shell/src/main.ts:5 importa o bootstrap local, após a resolução do manifesto. |
| src-load-remote | projects/diaspora/src/main.ts:1 | projects/diaspora | remote-resolution | No | Importa initFederation para a chamada sem manifesto em projects/diaspora/src/main.ts:3; prepara o runtime standalone da própria unidade, sem resolver outra aplicação observável. |
| src-load-remote | projects/diaspora/src/main.ts:3 | projects/diaspora | remote-resolution | No | projects/diaspora/src/main.ts:3 inicializa o runtime local antes do bootstrap. O shell consome ./Routes diretamente, exposto em projects/diaspora/federation.config.js:8-9; não passa por este main standalone. |
| src-load-remote | projects/promote/src/main.ts:1 | projects/promote | remote-resolution | No | Importa initFederation para o runtime local usado em projects/promote/src/main.ts:3, sem manifesto de outras unidades. |
| src-load-remote | projects/promote/src/main.ts:3 | projects/promote | remote-resolution | No | projects/promote/src/main.ts:3 prepara a própria aplicação standalone; a composição pelo shell carrega ./Routes exposto em projects/promote/federation.config.js:8-9, sem executar este main. |
| src-load-remote | projects/shell/src/app/app.routes.ts:2 | projects/shell | remote-resolution | Yes | Importa loadRemoteModule para as chamadas ativas em projects/shell/src/app/app.routes.ts:13-18; rotas registradas em projects/shell/src/app/app.config.ts:7-10. |
| src-load-remote | projects/shell/src/app/app.routes.ts:13 | projects/shell | remote-resolution | Yes | Carrega as rotas da outra unidade promote em projects/shell/src/app/app.routes.ts:11-13; o módulo exposto exporta routes em projects/promote/src/app/remote.routes.ts:23-38. |
| src-load-remote | projects/shell/src/app/app.routes.ts:18 | projects/shell | remote-resolution | Yes | Carrega as rotas da outra unidade diaspora em projects/shell/src/app/app.routes.ts:16-18; o módulo exposto exporta routes em projects/diaspora/src/app/remote.routes.ts:12-18. |
| src-load-remote | projects/shell/src/main.ts:1 | projects/shell | remote-resolution | Yes | Importa initFederation usado com manifesto em projects/shell/src/main.ts:3; o manifesto nomeia promote e diaspora em projects/shell/public/federation.manifest.json:2-3. |
| src-load-remote | projects/shell/src/main.ts:3 | projects/shell | remote-resolution | Yes | Resolve as entradas de promote e diaspora antes do bootstrap, via projects/shell/src/main.ts:3-5 e projects/shell/public/federation.manifest.json:2-3. |
| src-iframe | projects/diaspora/src/app/pages/legacy-onboarding.ts:31 | projects/diaspora | embedding | Undetermined | Iframe ativo pela rota projects/diaspora/src/app/app.routes.ts:11; src calculado em projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24 e projects/diaspora/src/app/pages/legacy-onboarding.ts:53-54. A aplicação alvo do caminho /open-account-flow-test não está confirmada no snapshot. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | projects/shell/src/app/app.routes.ts:9 | projects/shell | host-relationship | Yes | Declara as rotas que nomeiam promote e diaspora (projects/shell/src/app/app.routes.ts:9-20), registradas em projects/shell/src/app/app.config.ts:7-10 e usadas pelo bootstrap em projects/shell/src/bootstrap.ts:2-5. |
| manual | projects/auth/src/lib/client-auth-store.ts:71 | — | communication | No | Listener de storage para compartilhar sessão (projects/auth/src/lib/client-auth-store.ts:68-75), mas a biblioteca não é importada/injetada por nenhum frontend; projects/diaspora/src/app/core/admin-auth.ts:19-23 também registra que ela não está conectada. |

## Resumo

Construções com composição: 6 (remote-resolution: 5, host-relationship: 1).

## Notas

- Cadeia do shell: projects/shell/src/main.ts:3-5 → projects/shell/src/bootstrap.ts:2-5 → projects/shell/src/app/app.config.ts:7-10 → projects/shell/src/app/app.routes.ts:9-20. Os initFederation sem manifesto dos remotes são internos ao fluxo standalone, não chamadas que resolvem outras unidades.
- Ponto de dúvida: o iframe aponta por padrão para /open-account-flow-test, descrito em comentário como fluxo FastAPI externo. Não há implementação nem override de __LEGACY_ONBOARDING_URL__ no snapshot. deploy/nginx.conf:125-130 usa fallback para o shell nos demais caminhos; não demonstra encaminhamento desse endpoint ao frontend legacy. Por isso o iframe recebeu Undetermined; o resolvedor de URL serve como evidência dessa linha.
- A busca por ClientAuthStore e @union/auth encontrou apenas definição, reexportação, alias e documentação, sem import de aplicação. O comentário de SSO em projects/shell/src/app/app.ts:5-7 não prova uso; a construção de storage (listener em projects/auth/src/lib/client-auth-store.ts:71) recebeu No e Unidade — porque projects/auth é biblioteca.
- Os imports locais de páginas em projects/diaspora/src/app/app.routes.ts:6-17 e projects/promote/src/app/app.routes.ts:6-20 são lazy loading interno; imports de @mediapipe/tasks-vision são biblioteca, não outra unidade frontend. Não foram acrescentados como composição.
- Pelo critério de construções fora da mineração (passo 4 do método), ficam fora da tabela os exports das rotas expostas (projects/diaspora/src/app/remote.routes.ts:12-18 e projects/promote/src/app/remote.routes.ts:23-38), o cálculo da URL do iframe em projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24 (passo da linha src-iframe) e a escrita da sessão em projects/auth/src/lib/client-auth-store.ts:153-158 (ponto de uso do mecanismo registrado em :71).
