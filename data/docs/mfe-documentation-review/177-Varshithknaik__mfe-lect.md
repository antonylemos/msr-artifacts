---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Leitura do repositório

O único documento é o `README.md`, em inglês, com 11 linhas. Ele apresenta o repositório como um projeto de aprendizado de Module Federation com webpack, com um shell React, remotes React de marketing e de autenticação e um dashboard Vue "legacy" (README.md:1-5). O resto do README remete a um guia em capítulos, `docs/README.md` (README.md:7-11), que não existe no snapshot. O README não menciona que há duas árvores com os mesmos nomes de unidade. Na raiz, `container`, `marketing` e `auth` são publicados por workflows. Em `packages/`, uma cópia completa acrescenta o dashboard e não tem workflow (3.4.3; 3.4.6). O que ele afirma confere com as revisões anteriores. O dashboard Vue só existe como unidade na cópia de `packages/` (3.4.5 #4).

As quatro ocorrências `doc-*` estão no README. `doc-mfe-term` (README.md:1) é a linha 1. `doc-integration-technology` (README.md:3) e `doc-host-remote` (README.md:4) estão na linha 2. `doc-runtime-loading` (README.md:9) não virou linha: a frase lista os assuntos do guia ausente ("the current implementation, webpack, runtime integration, modern implementation options, production concerns, and a phased improvement plan", README.md:9-11) e não diz como as unidades se compõem. A instrução de começar pelo guia (README.md:7) também não é afirmação.

O resto da documentação são comentários do padrão de curso, em inglês:
- **`bootstrap.js` de cada remote:** cada um monta a si mesmo quando roda isolado em desenvolvimento e exporta `mount` para o container. Os comentários estão nos cinco remotes: auth, marketing, packages/auth, packages/dashboard e packages/marketing.
- **Wrappers do container de `packages/`:** os de auth e marketing montam o remote uma vez e sincronizam a navegação do container para o remote. Os wrappers do container da raiz fazem o mesmo, sem comentários (container/src/components/AuthApp.js:11-27).

Os comentários são iguais nos remotes, mas cada um fala da própria unidade e foi conferido nela; por isso viraram uma linha por arquivo.

Ficaram fora da tabela alguns comentários de detalhe interno de cada remote:
- "Mount function to start up the app", sobre a função `mount` (auth/src/bootstrap.js:6; marketing/src/bootstrap.js:6; packages/auth/src/bootstrap.js:6; packages/dashboard/src/bootstrap.js:4; packages/marketing/src/bootstrap.js:6);
- "Listen to history changes and update location state" e o da limpeza do listener (auth/src/App.js:12, 17; packages/auth/src/App.js:12, 17; packages/marketing/src/App.js:12, 17).

Também ficaram fora os comentários de layout (marketing/src/components/Landing.js:100; marketing/src/components/Pricing.js:127; packages/marketing/src/components/Landing.js:95; packages/marketing/src/components/Pricing.js:127; packages/dashboard/src/components/Dashboard.vue:394-564). As linhas comentadas do container da raiz são código desativado, não texto: o remote `dashboard` (container/config/webpack.prod.js:20), o `DashboardLazy` e a rota `/dashboard` (container/src/App.js:16, 40-43). Elas entram só como contexto da linha 2.

Também foram lidos os artefatos que as revisões anteriores citam:
- os três workflows de deploy;
- as configurações webpack das duas árvores;
- os `package.json` (nenhum tem `description`), os `index.js` e os `public/index.html`;
- `container/src/App.js` e `packages/container/src/App.js`, e os wrappers `AuthApp.js`, `MarketingApp.js` e `DashboardApp.js`.

Os workflows, as configurações webpack e os `index.html` não têm comentários; `.vscode/settings.json` só configura o editor.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:1 | "MFE learning project" | estrutura | corroborada | 3.4.3 (sete aplicações `Yes`); 3.4.5 #1-#5 |
| 2 | README.md:3-5 | "a webpack Module Federation learning project containing a React shell, React marketing and authentication remotes, and a legacy Vue dashboard example" | composição | corroborada | 3.4.3 (container, auth, marketing, packages/dashboard `Yes`); 3.4.5 #1-#5; container/config/webpack.prod.js:2, 15-21; packages/dashboard/src/bootstrap.js:1, 5-7 |
| 3 | auth/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (o auth monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (auth `Yes`); auth/src/bootstrap.js:36-42; auth/public/index.html:7 |
| 4 | auth/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (o auth é montado pelo container) | composição | corroborada | 3.4.5 #1; auth/src/bootstrap.js:46; container/src/components/AuthApp.js:1, 12 |
| 5 | marketing/src/bootstrap.js:32 | "If we are development and in isolation, call mount immediately" (o marketing monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (marketing `Yes`); marketing/src/bootstrap.js:33-38; marketing/public/index.html:5 |
| 6 | marketing/src/bootstrap.js:40 | "We are running through container and we should export the mount function" (o marketing é montado pelo container) | composição | corroborada | 3.4.5 #2; marketing/src/bootstrap.js:41; container/src/components/MarketingApp.js:1, 13 |
| 7 | packages/auth/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (o auth de `packages/` monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (packages/auth `Yes`); packages/auth/src/bootstrap.js:36-42; packages/auth/public/index.html:5 |
| 8 | packages/auth/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (o auth de `packages/` é montado pelo container) | composição | corroborada | 3.4.5 #3; packages/auth/src/bootstrap.js:46; packages/container/src/components/AuthApp.js:1, 13 |
| 9 | packages/container/src/components/AuthApp.js:11 | "Mount the microfrontend once" (o container monta o auth uma única vez) | composição | corroborada | 3.4.4 (packages/container/src/components/AuthApp.js:13); packages/container/src/components/AuthApp.js:12-22 |
| 10 | packages/container/src/components/AuthApp.js:24 | "Sync navigation from container to child" (a navegação do container é repassada ao auth) | composição | corroborada | packages/container/src/components/AuthApp.js:21, 25-29; packages/auth/src/bootstrap.js:23-30 |
| 11 | packages/container/src/components/MarketingApp.js:11 | "Mount the microfrontend once" (o container monta o marketing uma única vez) | composição | corroborada | 3.4.4 (packages/container/src/components/MarketingApp.js:13); packages/container/src/components/MarketingApp.js:12-21 |
| 12 | packages/container/src/components/MarketingApp.js:23 | "Sync navigation from container to child" (a navegação do container é repassada ao marketing) | composição | corroborada | packages/container/src/components/MarketingApp.js:20, 24-28; packages/marketing/src/bootstrap.js:23-30 |
| 13 | packages/dashboard/src/bootstrap.js:10-11 | "If we are in development and in isolation, call mount immediately" (o dashboard monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (packages/dashboard `Yes`); packages/dashboard/src/bootstrap.js:12-18; packages/dashboard/public/index.html:5 |
| 14 | packages/dashboard/src/bootstrap.js:20-21 | "We are running through container and we should export the mount function" (o dashboard é montado pelo container) | composição | corroborada | 3.4.5 #4; packages/dashboard/src/bootstrap.js:22; packages/container/src/components/DashboardApp.js:1, 8 |
| 15 | packages/marketing/src/bootstrap.js:34-35 | "If we are in development and in isolation, call mount immediately" (o marketing de `packages/` monta a si mesmo quando isolado) | independência | corroborada | 3.4.3 (packages/marketing `Yes`); packages/marketing/src/bootstrap.js:36-42; packages/marketing/public/index.html:5 |
| 16 | packages/marketing/src/bootstrap.js:44-45 | "We are running through container and we should export the mount function" (o marketing de `packages/` é montado pelo container) | composição | corroborada | 3.4.5 #5; packages/marketing/src/bootstrap.js:46; packages/container/src/components/MarketingApp.js:1, 13 |

## Observações

**1. README.md:1.** O título apresenta o projeto como micro-frontends. A revisão estrutural tem sete aplicações nas duas árvores (3.4.3), e a de composição tem cinco relações host → remote por Module Federation, todas ativas (3.4.5 #1-#5).

**2. README.md:3-5.** A tecnologia nomeada é a do snapshot: todos os containers e remotes usam o `ModuleFederationPlugin` que vem com o webpack (container/config/webpack.prod.js:2, 15-21), e 3.4.5 registra as cinco relações com o mecanismo `module-federation`. A revisão de dependências não tem linha porque o plugin vem no próprio webpack, então não há nome divergente. O shell React é o `container`, único host em cada árvore. Os remotes React de marketing e de autenticação são `marketing` e `auth` (3.4.5 #1, #2, #3, #5). O dashboard Vue é `packages/dashboard`, que monta um componente Vue com `createApp` (packages/dashboard/src/bootstrap.js:1, 5-7) e é remote do container de `packages/` (3.4.5 #4). Na árvore da raiz, que o autor publica, o dashboard está desativado: o remote e a rota estão comentados (container/config/webpack.prod.js:20; container/src/App.js:16, 40-43), e `dashboard/` só tem `package.json` (3.4.3). Isso combina com o "legacy" do README, mas a palavra não tem propriedade verificável. O README descreve um projeto só e não diz que há duas cópias. Isso não contradiz nenhuma parte da frase, porque cada unidade citada existe no snapshot.

**3. auth/src/bootstrap.js:34-35.** Em desenvolvimento, o auth procura `#_auth-dev-root` e, se o elemento existir, monta a si mesmo com um histórico do navegador (auth/src/bootstrap.js:36-42). Esse elemento só existe no `index.html` do próprio auth (auth/public/index.html:7). A revisão estrutural registrou essa montagem na coluna Entrada (3.4.3).

**4. auth/src/bootstrap.js:44-45.** O auth exporta `mount` (auth/src/bootstrap.js:46). O container da raiz importa essa função de `auth/AuthApp` e a chama no seu wrapper (container/src/components/AuthApp.js:1, 12), que é a relação 3.4.5 #1.

**5. marketing/src/bootstrap.js:32.** O mesmo comentário, em uma linha e com "If we are development" sem o "in". Em desenvolvimento, o marketing monta a si mesmo em `#_marketing-dev-root` (marketing/src/bootstrap.js:33-38), elemento do seu próprio `index.html` (marketing/public/index.html:5).

**6. marketing/src/bootstrap.js:40.** O marketing exporta `mount` (marketing/src/bootstrap.js:41), e o wrapper do container da raiz o importa e o chama (container/src/components/MarketingApp.js:1, 13). É a relação 3.4.5 #2.

**7. packages/auth/src/bootstrap.js:34-35.** É a cópia de `packages/`, com o mesmo código da raiz: monta em `#_auth-dev-root` quando isolado em desenvolvimento (packages/auth/src/bootstrap.js:36-42; packages/auth/public/index.html:5).

**8. packages/auth/src/bootstrap.js:44-45.** O `mount` exportado (packages/auth/src/bootstrap.js:46) é importado e chamado pelo wrapper do container de `packages/` (packages/container/src/components/AuthApp.js:1, 13). É a relação 3.4.5 #3.

**9. packages/container/src/components/AuthApp.js:11.** O `useEffect` chama `mount` com a lista de dependências vazia (packages/container/src/components/AuthApp.js:12-22), e por isso roda só na primeira renderização do wrapper. O comentário da linha 22, "Empty dependency - mount once", repete a afirmação. A revisão de código-fonte registrou a chamada como `runtime-composition` (3.4.4).

**10. packages/container/src/components/AuthApp.js:24.** O wrapper guarda o `onParentNavigate` que o `mount` devolve (packages/container/src/components/AuthApp.js:21). A cada mudança de `location`, chama essa função com o caminho atual (packages/container/src/components/AuthApp.js:25-29). Do lado do auth, ela empurra o caminho no histórico em memória se ele for diferente (packages/auth/src/bootstrap.js:23-30). O sentido inverso, do remote para o container, passa pelo `onNavigate` e não é o que o comentário afirma. A 3.4.5 descreve essa troca na Leitura, sem relação própria.

**11. packages/container/src/components/MarketingApp.js:11.** Como na linha 9: `mount` é chamado num `useEffect` com dependências vazias (packages/container/src/components/MarketingApp.js:12-21), com o comentário repetido na linha 21. A chamada está em 3.4.4.

**12. packages/container/src/components/MarketingApp.js:23.** Como na linha 10: o wrapper guarda `onParentNavigate` (packages/container/src/components/MarketingApp.js:20) e o chama a cada mudança de `location` (packages/container/src/components/MarketingApp.js:24-28). O marketing de `packages/` atualiza o próprio histórico (packages/marketing/src/bootstrap.js:23-30).

**13. packages/dashboard/src/bootstrap.js:10-11.** Em desenvolvimento, o dashboard monta o componente Vue em `#_dashboard-dev-root` (packages/dashboard/src/bootstrap.js:12-18), elemento do seu `index.html` (packages/dashboard/public/index.html:5). Diferente dos remotes React, o `mount` não recebe histórico (packages/dashboard/src/bootstrap.js:5-8), o que não muda a afirmação.

**14. packages/dashboard/src/bootstrap.js:20-21.** O dashboard exporta `mount` (packages/dashboard/src/bootstrap.js:22), e o container de `packages/` o importa e o chama só com o elemento (packages/container/src/components/DashboardApp.js:1, 8). É a relação 3.4.5 #4. O container da raiz não carrega o dashboard (linha 2).

**15. packages/marketing/src/bootstrap.js:34-35.** É a cópia de `packages/`: monta em `#_marketing-dev-root` quando isolado em desenvolvimento (packages/marketing/src/bootstrap.js:36-42; packages/marketing/public/index.html:5).

**16. packages/marketing/src/bootstrap.js:44-45.** O `mount` exportado (packages/marketing/src/bootstrap.js:46) é importado e chamado pelo wrapper do container de `packages/` (packages/container/src/components/MarketingApp.js:1, 13). É a relação 3.4.5 #5.

## Resumo

Afirmações: 16 (corroborada: 16, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 1, composição: 10, independência: 5).
