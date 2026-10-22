---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 046 — pgarr/microfrontend-template

## Leitura do repositório

O repositório não tem nenhum arquivo `.md`, e os `package.json` não têm `description`. A documentação são os comentários do padrão de curso que o template segue:
- **`bootstrap.js` de cada remote:** cada um monta a si mesmo quando roda isolado em desenvolvimento e exporta `mount` para o container.
- **Wrappers do container:** os de auth e marketing montam o remote uma vez e sincronizam a navegação do container para o remote.

Os comentários são iguais nos três remotes, mas cada um fala da sua própria unidade e foi conferido nela. É a mesma arquitetura do repositório 017, que não tem esses comentários.

Também foram lidos os artefatos que as revisões anteriores citam:
- os quatro workflows de deploy;
- as configurações webpack;
- os `package.json` e `index.js`;
- `container/src/App.js`, o `DashboardApp.js` e os componentes de login do auth.

Nenhum tem comentário sobre a arquitetura. Ficou fora da tabela o comentário "Listen to history changes and update location state", de `auth/src/App.js:12` e `marketing/src/App.js:12`, um detalhe interno de cada remote.

Tudo o que os comentários afirmam confere com as revisões anteriores.

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | auth/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (o auth monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (auth `Yes`); auth/src/bootstrap.js:36-42; auth/public/index.html:5 |
| 2 | auth/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (o auth é montado pelo container) | composição | corroborada | 3.4.5 #1; container/src/components/AuthApp.js:1, 13 |
| 3 | container/src/components/AuthApp.js:11 | "Mount the microfrontend once" (o container monta o auth uma única vez) | composição | corroborada | container/src/components/AuthApp.js:12-22 |
| 4 | container/src/components/AuthApp.js:24 | "Sync navigation from container to child" (a navegação do container é repassada ao auth) | composição | corroborada | container/src/components/AuthApp.js:21, 25-29 |
| 5 | container/src/components/MarketingApp.js:11 | "Mount the microfrontend once" (o container monta o marketing uma única vez) | composição | corroborada | container/src/components/MarketingApp.js:12-21 |
| 6 | container/src/components/MarketingApp.js:23 | "Sync navigation from container to child" (a navegação do container é repassada ao marketing) | composição | corroborada | container/src/components/MarketingApp.js:24-28 |
| 7 | dashboard/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (o dashboard monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (dashboard `Yes`); dashboard/src/bootstrap.js:12-18; dashboard/public/index.html:5 |
| 8 | dashboard/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (o dashboard é montado pelo container) | composição | corroborada | 3.4.5 #2; container/src/components/DashboardApp.js:1, 8 |
| 9 | marketing/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (o marketing monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (marketing `Yes`); marketing/src/bootstrap.js:36-42; marketing/public/index.html:5 |
| 10 | marketing/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (o marketing é montado pelo container) | composição | corroborada | 3.4.5 #3; container/src/components/MarketingApp.js:1, 13 |

## Observações

**1. auth/src/bootstrap.js:34-35.** Em desenvolvimento, o auth procura `#_auth-dev-root`, que existe no seu `index.html`, e se monta com histórico do navegador. Quando montado pelo container, usa histórico em memória (ver a revisão de composição).

**2. auth/src/bootstrap.js:44-45.** O auth expõe `./AuthApp`, e o container importa `mount` de `auth/AuthApp` e o chama no seu wrapper.

**3. container/src/components/AuthApp.js:11.** A montagem fica num `useEffect` com dependências vazias, executado uma vez por montagem do wrapper. O wrapper passa ao auth o caminho inicial e os callbacks `onNavigate` e `onSignIn`.

**4. container/src/components/AuthApp.js:24.** O wrapper guarda o `onParentNavigate` devolvido pelo `mount` e o chama sempre que a localização do container muda. A sincronização no outro sentido é feita pelo `onNavigate` (container/src/components/AuthApp.js:15-17).

**5. container/src/components/MarketingApp.js:11.** Mesmo padrão do auth, uma vez por montagem do wrapper, sem o callback de login.

**6. container/src/components/MarketingApp.js:23.** Mesmo padrão do auth.

**7. dashboard/src/bootstrap.js:10-11.** O dashboard, em Vue, procura `#_dashboard-dev-root` e se monta. Diferente de auth e marketing, não recebe histórico nem opções. O wrapper do container também não tem os comentários de montagem e de sincronização, porque não há navegação a sincronizar (container/src/components/DashboardApp.js:1-11).

**8. dashboard/src/bootstrap.js:20-21.** O dashboard expõe `./DashboardApp`, e o container chama `mount(ref.current)` uma vez.

**9. marketing/src/bootstrap.js:34-35.** Mesmo padrão do auth, com `#_marketing-dev-root`.

**10. marketing/src/bootstrap.js:44-45.** O marketing expõe `./MarketingApp`, e o container importa e chama o seu `mount`.

## Resumo

Afirmações: 10 (corroborada: 10, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (composição: 7, independência: 3).
