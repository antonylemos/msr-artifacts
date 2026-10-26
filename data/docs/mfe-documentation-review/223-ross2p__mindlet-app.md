---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
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

# 223 — ross2p/mindlet-app

## Leitura do repositório

A documentação do projeto é um único `README.md`, em inglês, que é o único arquivo `documentation` do `artifacts.csv`. Ele apresenta o repositório como o superprojeto do Mindlet: cinco micro-frontends Next.js (dashboard, auth, profile, study e decks), cada um com `basePath` próprio, mais as bibliotecas `@ross2p/shared` e `@ross2p/types` (README.md:3). Descreve o layout, com as zonas e as bibliotecas como submódulos e o nginx e o `compose.yml` como ambiente local (README.md:5-11), e explica como subir o conjunto com Docker atrás de um gateway em `localhost:8080` (README.md:26-37) ou sem Docker, uma zona por terminal nas portas 3001-3005 (README.md:39-51). Explica também como publicar e consumir `@ross2p/shared` pelo GitHub Packages (README.md:53-74) e como atualizar um submódulo (README.md:76-84). A única ocorrência `doc-*` do `matches.csv` é `doc-mfe-term` em README.md:3, que é a linha 1 da tabela.

O que o README diz confere, no geral, com as revisões anteriores, com uma limitação de fundo: as cinco zonas e as duas bibliotecas são submódulos com repositório próprio (.gitmodules:1-21), e os diretórios `apps/*` e `libs/*` não existem no snapshot. As revisões 3.4.2 a 3.4.6 não têm linha nenhuma por isso, e o que se pode conferir aqui é só a orquestração versionada: o `compose.yml`, as configurações de nginx e o `start-local-dev.sh`. Tudo o que o README diz sobre o interior das zonas e das bibliotecas (versão do Next.js, `basePath`, scripts, `.npmrc`, dependência `file:`) fica sem artefato. A única contradição é sobre como o compose sobe as zonas (linha 9), já registrada na revisão de build e deploy.

Não viraram linha: os blocos de comando de README.md:15-24 (clone com submódulos), README.md:30-32 (`docker compose up`), README.md:59-65 e README.md:69-72 (configuração do registro e `npm publish`) e README.md:78-84 (atualização de um submódulo), citados aqui como instruções de execução, com o texto em volta tratado nas linhas 4, 5 e 11; e o título "Mindlet — superproject" (README.md:1). Lidos também os comentários dos artefatos que as revisões anteriores citam. O `compose.yml` abre com um cabeçalho (compose.yml:1-12): "frontend stack (Next.js micro-frontends)" repete as linhas 1 e 2; o comando de build em compose.yml:3-4 é instrução; a entrada em `localhost:8080` (compose.yml:6) repete a linha 8; o acesso direto a cada zona (compose.yml:7-8) entra no parágrafo da linha 10; e a nota sobre a API vira a linha 13. O `start-local-dev.sh` tem mensagens em ucraniano: "Запуск Mindlet локально (без Docker)" (executar o Mindlet localmente, sem Docker) (start-local-dev.sh:56) e "Запустіть кожен додаток у окремому терміналі" (execute cada aplicação num terminal separado) (start-local-dev.sh:75), que repetem a linha 10; as demais só verificam submódulos e portas. As configurações de nginx da frontend (`infra/nginx/nginx.conf`, `infra/nginx/nginx.conf.local`, `infra/nginx/routing-map.frontend.conf`, `config/nginx/nginx.conf`) não têm comentários. Os comentários de `infra/nginx/api-gateway.conf:1` e `infra/nginx/api-gateway.host.conf:1-5` tratam do gateway da API de backend; o último diz que "Frontends use NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1" (infra/nginx/api-gateway.host.conf:5), o mesmo valor padrão que o compose passa às zonas (compose.yml:20), mas é detalhe de variável de ambiente e fica fora da tabela. As skills de `.agents/skills/` (com `skills-lock.json`) são material de terceiros para agentes de código e não falam do projeto.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** [...] plus **`@ross2p/shared`** and **`@ross2p/types`**" | estrutura | corroborada | 3.4.3 (Notas: cinco zonas como submódulos `apps/*`); 3.4.5 (Leitura); .gitmodules:1-21; compose.yml:15-108; infra/nginx/nginx.conf:14-18 |
| 2 | README.md:3 | "Next.js 16" | estrutura | parcial | compose.yml:20, 27 |
| 3 | README.md:3 | "`basePath` per zone" | composição | parcial | 3.4.5 (Leitura); compose.yml:8; infra/nginx/nginx.conf.local:35-68; config/nginx/nginx.conf:38-39 |
| 4 | README.md:7 | "`apps/*` — submodule repos (`mindlet-dashboard`, `mindlet-app-auth`, …)" | estrutura | corroborada | 3.4.3 (Notas); .gitmodules:4-18 |
| 5 | README.md:8 | "`@ross2p/shared` (GitHub Packages name under scope `ross2p`)" | build-deploy | sem corroboração | — |
| 6 | README.md:10 | "`infra/nginx` — dev reverse proxy" | composição | corroborada | 3.4.5 (Leitura); 3.4.6 (Leitura); compose.yml:110-124; infra/nginx/nginx.conf:14-66 |
| 7 | README.md:11 | "`compose.yml` — one-command local stack (Node + nginx)" | build-deploy | parcial | 3.4.6 (Leitura); compose.yml:14-127 |
| 8 | README.md:34-35 | "Gateway: **http://localhost:8080** [...] Zones: `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`" | composição | corroborada | 3.4.5 (Leitura); compose.yml:112-113; infra/nginx/nginx.conf:29-66; infra/nginx/routing-map.frontend.conf:1-9 |
| 9 | README.md:37 | "Each service runs `npm install` then `npm run dev` inside `node:20-alpine` with the repo mounted at `/workspace`." | build-deploy | contradita | 3.4.6 (Leitura); compose.yml:15-32 |
| 10 | README.md:41-49 | "In separate terminals, from each app (after `npm install`)" (tabela: dashboard 3001, auth 3002, profile 3003, study 3004, decks 3005) | independência | parcial | infra/nginx/nginx.conf.local:16-20; start-local-dev.sh:75-90 |
| 11 | README.md:67 | "In consuming apps, `.npmrc`" (as zonas consomem `@ross2p/shared` do GitHub Packages) | estrutura | sem corroboração | — |
| 12 | README.md:74 | "For local monorepo development, apps use `\"@ross2p/shared\": \"file:../../libs/shared\"`." | estrutura | sem corroboração | — |
| 13 | compose.yml:10 | "API (optional, run separately in mindlet-api)" | outro | parcial | compose.yml:14-127; compose.yml:19-20 |

## Observações

**1. README.md:3.** A frase nomeia cinco micro-frontends e duas bibliotecas como partes do superprojeto. O snapshot confirma o conjunto: os sete são submódulos, cinco em `apps/` e dois em `libs/` (.gitmodules:1-21); o compose declara um serviço por zona, construído a partir do diretório do submódulo (compose.yml:15-18 e análogos até compose.yml:91-94); e o gateway define um upstream por zona (infra/nginx/nginx.conf:14-18). A revisão estrutural conta 0 aplicações no snapshot, mas registra nas Notas que a diferença para `frontend_units: 5` vem de as zonas serem externas, e a revisão de composição lê o repositório como composição por rotas cujas unidades ficam em outros repositórios. O que cada zona contém não se vê aqui. O cabeçalho do compose repete a afirmação ("Next.js micro-frontends", compose.yml:1), e README.md:8-9 situam as bibliotecas em `libs/shared` e `libs/types`, o que confere com .gitmodules:1-3, 19-20.

**2. README.md:3.** A frase diz que as zonas são Next.js 16. Sem `package.json` no snapshot (3.4.2, Notas), a versão não tem artefato. O compose dá indícios de Next.js sem nomeá-lo em configuração: cada zona recebe o argumento de build `NEXT_PUBLIC_API_BASE_URL` e a variável `NEXT_TELEMETRY_DISABLED` (compose.yml:20, 27, e o mesmo nos outros serviços), convenções do Next.js. O framework é sustentado por esses indícios; o "16" não. O cabeçalho "Next.js micro-frontends" (compose.yml:1) repete a afirmação sem a versão.

**3. README.md:3.** Cada zona teria seu próprio `basePath`, ou seja, serviria as páginas sob um prefixo. A configuração do Next.js fica nos submódulos e não pode ser aberta, como já registra a revisão de composição. O snapshot é coerente com a afirmação em três pontos: o comentário do compose indica o acesso direto ao dashboard em `http://localhost:3001/dashboard/` (compose.yml:8); a variante sem Docker do nginx repassa cada prefixo sem removê-lo, por exemplo `/dashboard/` para `http://mindlet_dashboard/dashboard/` (infra/nginx/nginx.conf.local:38-39, e análogos até :66-67); e `config/nginx/nginx.conf` faz o mesmo com `proxy_pass` sem URI (config/nginx/nginx.conf:38-39). Já `infra/nginx/nginx.conf`, o arquivo que o compose monta (compose.yml:115), usa `proxy_pass http://mindlet_dashboard/;` com barra final (infra/nginx/nginx.conf:36-37, e análogos até :64-65), o que no nginx remove o prefixo antes de repassar. Sem ver os Dockerfiles e as configurações das zonas, não dá para dizer se isso desmente o `basePath` ou só reflete outra forma de build. README.md:51 repete a afirmação ("hit ports directly with the correct `basePath` URLs").

**4. README.md:7.** Cada zona é um repositório próprio incluído como submódulo. O `.gitmodules` confirma, com os cinco caminhos `apps/<zona>` e as URLs `mindlet-dashboard`, `mindlet-app-auth`, `mindlet-profile`, `mindlet-study` e `mindlet-decks` (.gitmodules:4-18), e a revisão estrutural registra o mesmo nas Notas. A seção "Updating a submodule" (README.md:76-84) mostra o fluxo correspondente: atualizar a zona no repositório dela e registrar o novo commit no superprojeto. README.md:9 diz o mesmo de `libs/types` ("existing submodule"), conferido em .gitmodules:1-3; como a biblioteca não é unidade frontend, fica citada aqui e não vira linha.

**5. README.md:8.** `@ross2p/shared` seria publicado no GitHub Packages sob o escopo `ross2p`. README.md:53-65 repete e detalha a afirmação: o pacote é publicado a partir do repositório `mindlet-shared`, que é de fato a URL do submódulo `libs/shared` (.gitmodules:19-21), com `npm publish` e um token. Mas o snapshot não tem o `package.json` da biblioteca, `.npmrc` nem workflow de publicação, e a revisão de build e deploy anota que essa publicação é só documentação. Nada confirma nem desmente.

**6. README.md:10.** `infra/nginx` seria o proxy reverso de desenvolvimento. O compose sobe um nginx que monta `infra/nginx/nginx.conf`, `proxy.conf`, `logging.conf` e `routing-map.frontend.conf` e depende das cinco zonas (compose.yml:110-124), e o `nginx.conf` repassa cada prefixo ao upstream da zona (infra/nginx/nginx.conf:14-18, 36-66). As revisões de composição e de build e deploy leem o mesmo nas Leituras. O "dev" confere com o uso descrito: nada no snapshot indica implantação fora da máquina local. A pasta tem também os arquivos do gateway da API de backend (`api-gateway.conf`, `api-gateway.host.conf`, `routing-map.api.conf`), que o compose não monta.

**7. README.md:11.** O compose sobe tudo com um comando e seria composto de "Node + nginx". A parte do nginx confere (`image: nginx:1.27-alpine`, compose.yml:111), e o compose de fato reúne as cinco zonas e o gateway num só arquivo (compose.yml:14-127). A parte do Node não tem artefato: cada zona é construída pelo `Dockerfile` do próprio submódulo (compose.yml:16-18 e análogos), que não está no snapshot, como anota a revisão de build e deploy. O cabeçalho do compose sugere outro comando, `docker compose build --parallel 1 && docker compose up` (compose.yml:3-4).

**8. README.md:34-35.** O conjunto teria uma entrada única em `localhost:8080`, com cada zona sob seu prefixo. O nginx publica a porta 8080 (compose.yml:112-113), redireciona `/` para `/dashboard/` (infra/nginx/nginx.conf:29-31) e encaminha `/dashboard/`, `/auth/`, `/profile/`, `/study/` e `/decks/` aos upstreams das zonas (infra/nginx/nginx.conf:36-66); o mapa infra/nginx/routing-map.frontend.conf:1-9 repete a correspondência. `/auth` sem barra redireciona para `/auth/login` (infra/nginx/nginx.conf:40-42), como no README; `/profile/me` é uma página dentro da zona e não se confere, mas o prefixo `/profile/` está roteado (infra/nginx/nginx.conf:50-52). README.md:51 ("Use `compose.yml` / nginx for a single entrypoint") e o comentário "Entrypoint: http://localhost:8080" (compose.yml:6) repetem a afirmação.

**9. README.md:37.** O README diz que cada serviço roda `npm install` e `npm run dev` numa imagem `node:20-alpine` com o repositório montado em `/workspace`. O compose não faz isso: cada zona tem `build` com `context: apps/<zona>` e `dockerfile: Dockerfile` (compose.yml:16-18), sem `image`, sem `command` e sem `volumes`; o único serviço com volumes é o nginx (compose.yml:114-118). A revisão de build e deploy registrou a mesma contradição. Confirma-se só que há um serviço por zona; o que o Dockerfile de cada uma executa não se vê no snapshot.

**10. README.md:41-49.** Sem Docker, cada zona rodaria sozinha, num terminal próprio, numa porta própria (3001 a 3005). O snapshot tem dois artefatos coerentes com isso: a variante local do nginx aponta um upstream por zona para `localhost:3001` a `localhost:3005` (infra/nginx/nginx.conf.local:16-20), e o `start-local-dev.sh` instrui a rodar `npm install && npm run dev` em cada `apps/<zona>`, um terminal por zona, com as mesmas portas (start-local-dev.sh:75-90). Os scripts `dev` e as portas configuradas em cada zona ficam nos submódulos. README.md:51 ("or hit ports directly") e o acesso direto descrito no compose (compose.yml:7-8) repetem que cada zona pode ser acessada sem o gateway.

**11. README.md:67.** As aplicações que consomem `@ross2p/shared` configurariam o registro do GitHub Packages num `.npmrc`. Nem as aplicações nem `.npmrc` estão no snapshot, e as revisões anteriores não registram dependência de `@ross2p/shared`. Não há como saber se alguma zona consome o pacote dessa forma, nem quantas.

**12. README.md:74.** No desenvolvimento local, as zonas apontariam para a biblioteca por `file:../../libs/shared`. O caminho é coerente com o layout (`apps/<zona>` e `libs/shared`, .gitmodules:4-21), mas os `package.json` das zonas não estão no snapshot, e a revisão de composição já registra que essa dependência não é verificável aqui. O texto chama o conjunto de "monorepo", embora as zonas sejam repositórios separados reunidos por submódulos (linha 4); a expressão descreve o checkout local do superprojeto e não muda a corroboração.

**13. compose.yml:10.** O comentário diz que a API é opcional e roda à parte, no repositório `mindlet-api`. O compose não declara serviço de backend: tem só as cinco zonas e o nginx (compose.yml:14-127), e cada zona recebe a URL da API como argumento de build, com padrão `http://localhost:4000/api/v1` (compose.yml:19-20), o que confirma que o backend fica fora desta pilha. Que as zonas funcionem sem a API ("optional") não se pode conferir sem o código delas. Os comandos de compose.yml:11-12 apontam para `../mindlet-api`, fora do snapshot.

## Resumo

Afirmações: 13 (corroborada: 4, parcial: 5, contradita: 1, sem corroboração: 3). Temas: (estrutura: 5, composição: 3, build-deploy: 3, independência: 1, outro: 1).
