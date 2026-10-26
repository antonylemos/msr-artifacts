---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Leitura do repositório

É o superprojeto do Mindlet, um produto pessoal: cinco zonas Next.js (dashboard, auth, profile, study e decks) e duas bibliotecas (`@ross2p/shared` e `@ross2p/types`), todas como submódulos Git com repositório próprio (.gitmodules:1-21). Os diretórios `apps/*` e `libs/*` não existem no snapshot. O que está versionado é só a orquestração local: o `compose.yml`, as configurações de nginx em `infra/nginx/` e `config/nginx/`, o `start-local-dev.sh` e as skills de agentes em `.agents/`.

Por isso as dimensões 1 a 6 ficam vazias. A revisão de dependências não tem dependência (não há `package.json`), a estrutural tem a tabela "Unidades" vazia, a de código-fonte não tem construção, e as de composição e de build e deploy não têm relação nem aplicação. Todas as observações vêm da documentação (#1 a #13) e do histórico (#14, #15), e todas são `fraca`: nenhuma observação deste arquivo configura, usa ou liga unidades por si.

A cadeia que a classificação usa (`MFE-implemented`, `multi-zones`, cinco unidades `multi-repo`) está nos artefatos de orquestração, que aqui só aparecem como alvos das afirmações:
- **Unidades:** cada zona é um submódulo com repositório próprio (#4, corroborada por .gitmodules:4-18), com um serviço próprio no compose, construído a partir do diretório do submódulo (#1, compose.yml:15-108).
- **Composição:** um gateway nginx publica a porta 8080, define um upstream por zona e encaminha cada prefixo (`/dashboard/`, `/auth/`, `/profile/`, `/study/`, `/decks/`) ao seu upstream (#6, #8; compose.yml:112-113, infra/nginx/nginx.conf:14-66, infra/nginx/routing-map.frontend.conf:1-9).
- **Independência:** sem Docker, cada zona roda num terminal e numa porta própria (3001 a 3005), atrás de uma variante local do nginx (#10).

Nenhum desses arquivos virou observação de configuração. O `.gitmodules` registra repositórios num checkout (estrutura); o `compose.yml` declara serviços, builds e portas, e os `nginx.conf` e o `routing-map.frontend.conf` declaram upstreams e `location`, que o passo 2 trata como deploy (dimensão 6). Nenhum deles declara builder de federação, remote, módulo exposto, dependência compartilhada, URL de remote, import map ou registro de aplicação. Como a 3.4.6 não tem linha (as zonas não são aplicações deste snapshot), a dimensão 6 também fica sem observação. O mecanismo que liga as zonas está no snapshot, mas só como alvo de afirmações.

Sinais que enganam ou ficam abertos:
- **`basePath` por zona:** o README diz que cada zona tem `basePath` próprio (#3). A variante local e a configuração antiga do nginx repassam o prefixo, mas o `nginx.conf` montado pelo compose o remove (`proxy_pass` com barra final). O histórico mostra que os três arquivos são de estágios diferentes, com a configuração de `config/nginx/` como resto intacto do primeiro estágio (#14), mas não diz se a remoção do prefixo desmente o `basePath`, que fica nos submódulos.
- **Como o compose sobe as zonas:** o README fala em `node:20-alpine` com `npm run dev` e o repositório montado; o compose constrói cada zona pelo Dockerfile do submódulo, sem volume (#9, contradita; #7, em parte). O histórico é compatível com o README descrever um compose anterior, sem mostrar o conteúdo que o confirmaria (#15).
- **Biblioteca compartilhada:** a publicação de `@ross2p/shared` no GitHub Packages e o consumo por `.npmrc` ou `file:` (#5, #11, #12) não têm artefato no snapshot e não são relação de composição (3.4.5, Leitura).
- **Next.js:** o framework só tem indícios no compose (argumento `NEXT_PUBLIC_API_BASE_URL` e `NEXT_TELEMETRY_DISABLED`); a versão 16 não tem artefato (#2).
- **Backend:** a API fica no repositório `mindlet-api`, fora desta pilha (#13).
- **Linguagem:** o GitHub dá "Python" por causa dos scripts das skills em `.agents/`, que não falam do projeto.

## Observações

### 1. README.md:3

**Observação:** "Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** (Next.js 16, `basePath` per zone), plus **`@ross2p/shared`** and **`@ross2p/types`**." O cabeçalho do compose repete "Next.js micro-frontends" (compose.yml:1), e README.md:8-9 situam as bibliotecas em `libs/shared` e `libs/types`. A revisão marca a afirmação como corroborada por .gitmodules:1-21, pelos cinco serviços de compose.yml:15-108 e pelos cinco upstreams de infra/nginx/nginx.conf:14-18.

**Interpretação:** A afirmação fala das unidades como conjunto: cinco micro-frontends e duas bibliotecas formam o produto.

### 2. README.md:3

**Observação:** "Next.js 16". Não há `package.json` no snapshot. O compose passa a cada zona o argumento de build `NEXT_PUBLIC_API_BASE_URL` e a variável `NEXT_TELEMETRY_DISABLED` (compose.yml:20, 27, e o mesmo nos outros serviços), convenções do Next.js. A revisão marca a afirmação como parcial: o framework tem indícios, a versão não.

**Interpretação:** A afirmação só nomeia o framework e a versão das zonas.

### 3. README.md:3

**Observação:** "`basePath` per zone". README.md:51 repete ("hit ports directly with the correct `basePath` URLs"). O comentário do compose indica o acesso direto em `http://localhost:3001/dashboard/` (compose.yml:8); infra/nginx/nginx.conf.local:38-39 repassa `/dashboard/` para `http://mindlet_dashboard/dashboard/`, e config/nginx/nginx.conf:38-39 usa `proxy_pass` sem URI, preservando o prefixo. O arquivo montado pelo compose usa `proxy_pass http://mindlet_dashboard/;` (infra/nginx/nginx.conf:36-37 e análogos), que remove o prefixo. A revisão marca a afirmação como parcial.

**Interpretação:** A afirmação diz que cada zona serve as páginas sob um prefixo próprio, que é a forma de compor zonas Next.js sob uma mesma origem.

### 4. README.md:7

**Observação:** "`apps/*` — submodule repos (`mindlet-dashboard`, `mindlet-app-auth`, …)". O `.gitmodules` declara os cinco caminhos `apps/<zona>` com as URLs `mindlet-dashboard`, `mindlet-app-auth`, `mindlet-profile`, `mindlet-study` e `mindlet-decks` (.gitmodules:4-18). README.md:76-84 mostra como atualizar uma zona no repositório dela e registrar o novo commit no superprojeto. A revisão marca a afirmação como corroborada.

**Interpretação:** A afirmação diz que cada zona é um repositório próprio, reunido ao superprojeto por submódulo.

### 5. README.md:8

**Observação:** "`libs/shared` — `@ross2p/shared` (GitHub Packages name under scope `ross2p`)". README.md:53-65 detalha a publicação a partir do repositório `mindlet-shared`, que é a URL do submódulo `libs/shared` (.gitmodules:19-21). O snapshot não tem o `package.json` da biblioteca, `.npmrc` nem workflow de publicação. A revisão marca a afirmação como sem corroboração.

**Interpretação:** A afirmação descreve a publicação de uma biblioteca num registro externo, não uma unidade frontend nem um mecanismo de composição.

### 6. README.md:10

**Observação:** "`infra/nginx` — dev reverse proxy". O compose sobe um nginx que monta `infra/nginx/nginx.conf`, `proxy.conf`, `logging.conf` e `routing-map.frontend.conf` e depende das cinco zonas (compose.yml:110-124); o `nginx.conf` define um upstream por zona e repassa cada prefixo (infra/nginx/nginx.conf:14-66). A pasta tem também o gateway da API de backend (`api-gateway.conf`, `api-gateway.host.conf`), que o compose não monta. A revisão marca a afirmação como corroborada.

**Interpretação:** A afirmação só nomeia o mecanismo, um proxy reverso de desenvolvimento, sem dizer o que fica atrás dele.

### 7. README.md:11

**Observação:** "`compose.yml` — one-command local stack (Node + nginx)". O compose reúne as cinco zonas e o gateway num só arquivo (compose.yml:14-127), e o nginx é a imagem `nginx:1.27-alpine` (compose.yml:111). Cada zona é construída pelo `Dockerfile` do próprio submódulo (compose.yml:16-18 e análogos), que não está no snapshot. O cabeçalho do compose dá outro comando, `docker compose build --parallel 1 && docker compose up` (compose.yml:3-4). A revisão marca a afirmação como parcial.

**Interpretação:** A afirmação diz que as zonas e o gateway sobem juntos, num único comando, como uma pilha local.

### 8. README.md:34-35

**Observação:** "Gateway: **http://localhost:8080** (nginx maps host 8080 → container 80)" e "Zones: `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`". O nginx publica `8080:80` (compose.yml:112-113), redireciona `/` para `/dashboard/` e `/auth` para `/auth/login` e encaminha cada prefixo ao upstream da zona (infra/nginx/nginx.conf:29-66); infra/nginx/routing-map.frontend.conf:1-9 repete a correspondência. README.md:51 e o comentário "Entrypoint: http://localhost:8080" (compose.yml:6) repetem a ideia. A revisão marca a afirmação como corroborada.

**Interpretação:** A afirmação diz que as zonas ficam sob prefixos próprios atrás de uma entrada única.

### 9. README.md:37

**Observação:** "Each service runs `npm install` then `npm run dev` inside `node:20-alpine` with the repo mounted at `/workspace`." No compose, cada zona tem `build` com `context: apps/<zona>` e `dockerfile: Dockerfile` (compose.yml:15-32 e análogos), sem `image`, `command` nem `volumes`; o único serviço com volumes é o nginx (compose.yml:114-118). A revisão marca a afirmação como contradita.

**Interpretação:** A afirmação diz que cada zona roda num contêiner próprio, como servidor de desenvolvimento sobre o checkout montado.

### 10. README.md:41-49

**Observação:** "In separate terminals, from each app (after `npm install`)", com a tabela dashboard 3001, auth 3002, profile 3003, study 3004 e decks 3005. infra/nginx/nginx.conf.local:16-20 aponta um upstream por zona para `localhost:3001` a `localhost:3005`, e start-local-dev.sh:75-90 instrui a rodar `npm install && npm run dev` em cada `apps/<zona>`, um terminal por zona, nas mesmas portas. README.md:51 ("or hit ports directly") e compose.yml:7-8 repetem que cada zona pode ser acessada sem o gateway. A revisão marca a afirmação como parcial.

**Interpretação:** A afirmação diz que cada zona roda sozinha, num processo e numa porta próprios.

### 11. README.md:67

**Observação:** "In consuming apps, `.npmrc`:", seguido do registro `@ross2p:registry=https://npm.pkg.github.com` (README.md:69-72). Nem as aplicações nem `.npmrc` estão no snapshot. A revisão marca a afirmação como sem corroboração.

**Interpretação:** A afirmação descreve como as zonas obteriam a biblioteca compartilhada de um registro de pacotes, uma dependência de pacote e não uma relação de composição.

### 12. README.md:74

**Observação:** "For local monorepo development, apps use `\"@ross2p/shared\": \"file:../../libs/shared\"`." O caminho é coerente com o layout `apps/<zona>` e `libs/shared` (.gitmodules:4-21), mas os `package.json` das zonas não estão no snapshot. A revisão marca a afirmação como sem corroboração.

**Interpretação:** A afirmação descreve como as zonas apontam para a biblioteca no checkout local, uma dependência de pacote e não uma relação de composição.

**Nota:** "monorepo" descreve o checkout local do superprojeto; as zonas são repositórios separados reunidos por submódulos (#4).

### 13. compose.yml:10

**Observação:** "API (optional, run separately in mindlet-api)", com os comandos de compose.yml:11-12 apontando para `../mindlet-api`. O compose só declara as cinco zonas e o nginx (compose.yml:14-127), e cada zona recebe a URL da API como argumento de build, com padrão `http://localhost:4000/api/v1` (compose.yml:19-20). A revisão marca a afirmação como parcial.

**Interpretação:** A afirmação situa o backend fora desta pilha, em outro repositório.

### 14. 404dce1 2026-05-03 (infra/nginx/nginx.conf, infra/nginx/proxy.conf); 4128490 2026-05-03 (config/nginx/nginx.conf, config/nginx/proxy.conf); 2581f29 2026-05-23 (infra/nginx/nginx.conf); e98db1d 2026-08-17 (infra/nginx/nginx.conf); b1c17af 2026-09-19 (infra/nginx/nginx.conf.local)

**Observação:** `config/nginx/nginx.conf` tem o mesmo objeto (`fd6ada3`) que `infra/nginx/nginx.conf` tinha em `404dce1`, o commit que cria os submódulos das zonas; `4128490` move os dois arquivos para `config/nginx/`, e eles não mudam mais. O `infra/nginx/nginx.conf` montado pelo compose é recriado em `2581f29` e alterado em `e98db1d`, que dá o objeto do snapshot. `infra/nginx/nginx.conf.local` só aparece em `b1c17af`. O conteúdo das versões intermediárias não está no clone. A revisão marca o ponto como esclarecido.

**Interpretação:** A divergência sobre o prefixo vem de estágios diferentes: a configuração que preserva o prefixo em `config/nginx/` é um resto do primeiro estágio, não montado; a montada é posterior; e a variante local é a mais recente. Se a remoção do prefixo contradiz o `basePath` das zonas continua em aberto, porque o `basePath` fica nos submódulos.

### 15. 404dce1 2026-05-03 (README.md, compose.yml); 77a6cf8 2026-05-03 (README.md); 2581f29 2026-05-23 (compose.yml); 4f2dbca 2026-05-23 (compose.yml); e98db1d 2026-08-17 (compose.yml); 91bfed2 2026-08-29 (README.md)

**Observação:** O README e o compose nascem juntos em `404dce1`. Depois de `77a6cf8`, o README fica com o mesmo objeto enquanto o `compose.yml` muda três vezes (`2581f29`, `4f2dbca`, `e98db1d`, este último com o objeto do snapshot), com mensagens que anunciam um "refresh" do compose e a separação da pilha local. `91bfed2`, o único commit posterior que altera o README, anuncia só a troca do repositório da zona auth. As versões antigas dos dois arquivos não estão no clone. A revisão marca o ponto como inconclusivo.

**Interpretação:** O histórico é compatível com README.md:37 descrever um compose anterior, mas não o mostra. A dúvida é só sobre o passado: no snapshot, o compose constrói cada zona pelo Dockerfile do submódulo.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora .gitmodules:1-21; corrobora compose.yml:15-108; corrobora infra/nginx/nginx.conf:14-18 |
| 2 | 3.4.7 #2 | 7 documentação | documentação | — | tecnológica | fraca | corrobora em parte compose.yml:20; corrobora em parte compose.yml:27 |
| 3 | 3.4.7 #3 | 7 documentação | documentação | multi-zones | arquitetural | fraca | corrobora em parte compose.yml:8; corrobora em parte infra/nginx/nginx.conf.local:35-68; corrobora em parte config/nginx/nginx.conf:38-39 |
| 4 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora .gitmodules:4-18 |
| 5 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | — |
| 6 | 3.4.7 #6 | 7 documentação | documentação | — | tecnológica | fraca | corrobora compose.yml:110-124; corrobora infra/nginx/nginx.conf:14-66 |
| 7 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte compose.yml:14-127 |
| 8 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora compose.yml:112-113; corrobora infra/nginx/nginx.conf:29-66; corrobora infra/nginx/routing-map.frontend.conf:1-9 |
| 9 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz compose.yml:15-32 |
| 10 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte infra/nginx/nginx.conf.local:16-20; corrobora em parte start-local-dev.sh:75-90 |
| 11 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | — |
| 12 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | — |
| 13 | 3.4.7 #13 | 7 documentação | comentário | — | contexto | fraca | corrobora em parte compose.yml:14-127; corrobora em parte compose.yml:19-20 |
| 14 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #3 |
| 15 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #7; explica #9 |

## Resumo

Observações: 15. Dimensões (tecnologia: 0, configuração: 0, código: 0, estrutura: 0, composição: 0, build-deploy: 0, documentação: 13, histórico: 2). Força (forte: 0, moderada: 0, fraca: 15, ambígua: 0). Evidência (tecnológica: 2, arquitetural: 7, contexto: 6).
