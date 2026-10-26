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

O repositório é o superprojeto do Mindlet e não contém o código de nenhuma aplicação frontend. As cinco zonas Next.js (dashboard, auth, profile, study e decks) e as bibliotecas `libs/types` e `libs/shared` são submódulos Git com repositório próprio (.gitmodules:1-21), e os diretórios `apps/*` e `libs/*` não existem no snapshot. A revisão estrutural tem a tabela "Unidades" vazia e conta 0 aplicações; por isso não há linhas na tabela abaixo. O snapshot não tem `package.json`, Dockerfile nem workflow de CI, e o `matches.csv` não tem ocorrências `ci-*` nem `cfg-public-path`.

O que está versionado aqui é orquestração local. O `compose.yml` se apresenta como "frontend stack", a subir com `docker compose build --parallel 1 && docker compose up` e entrada em `http://localhost:8080` (compose.yml:1-8). Ele declara um serviço por zona, cada um construído a partir do diretório do submódulo com o `Dockerfile` de lá, recebendo `NEXT_PUBLIC_API_BASE_URL` como argumento de build e publicando a porta 3000 do contêiner nas portas 3001-3005 do host (compose.yml:15-32 para `dashboard`; análogos em compose.yml:34-51, :53-70, :72-89 e :91-108). Esses Dockerfiles estão nos submódulos e não podem ser abertos. O serviço `nginx` usa a imagem pública `nginx:1.27-alpine`, publica a porta 8080, monta as configurações de `infra/nginx/` e depende das cinco zonas (compose.yml:110-127). O README descreve o conjunto como ambiente de desenvolvimento local: `infra/nginx` é "dev reverse proxy" e `compose.yml` é "one-command local stack" (README.md:10-11), sob o título "Local dev (Docker)" (README.md:26-35). Há uma contradição entre os dois: o README diz que cada serviço roda `npm install` e `npm run dev` num `node:20-alpine` com o repositório montado em `/workspace` (README.md:37), mas o `compose.yml` constrói cada zona pelo seu próprio Dockerfile e não monta volume nas zonas (compose.yml:16-18, :28-29). O que o Dockerfile de cada zona faz (build de produção ou servidor de desenvolvimento) não se vê no snapshot.

As ocorrências `ops-*` do `matches.csv` são todas do gateway nginx, que não é aplicação frontend. `infra/nginx/nginx.conf`, o arquivo montado pelo compose (compose.yml:115), define um upstream por zona na porta 3000 do serviço (infra/nginx/nginx.conf:14-18), redireciona `/` para `/dashboard/` (infra/nginx/nginx.conf:29-31) e encaminha cada prefixo ao seu upstream (infra/nginx/nginx.conf:36-38 para `/dashboard/`, :43-45 para `/auth/`, :50-52 para `/profile/`, :57-59 para `/study/` e :64-66 para `/decks/`). `config/nginx/nginx.conf` repete as mesmas rotas, mas aponta para as portas 3001-3005 dos serviços (config/nginx/nginx.conf:11-25; rotas em config/nginx/nginx.conf:31-73), enquanto os contêineres escutam na 3000 (compose.yml:24-25); o compose não monta esse arquivo (compose.yml:114-118), e ele parece uma versão anterior. `infra/nginx/nginx.conf.local` é a variante sem Docker, com os upstreams em `localhost:3001-3005` e escuta na 8080 (infra/nginx/nginx.conf.local:16-23), usada pelo `start-local-dev.sh`, que só confere os submódulos e imprime instruções para rodar `npm run dev` em cada zona e o nginx à mão (start-local-dev.sh:24-39; start-local-dev.sh:75-97). `infra/nginx/api-gateway.conf` e `infra/nginx/api-gateway.host.conf` são o gateway da API de backend (`/api/v1/...` para serviços como `auth-service:3000`) (infra/nginx/api-gateway.conf:5-7; infra/nginx/api-gateway.conf:57-68; infra/nginx/api-gateway.host.conf:1-5), não montados pelo compose e sem relação com as zonas frontend. O backend fica em outro repositório, `mindlet-api` (compose.yml:10-12).

Quanto a versionamento, o único pacote com publicação descrita é `@ross2p/shared`, publicado no GitHub Packages a partir do repositório `mindlet-shared` (README.md:53-65), uma biblioteca que também está fora do snapshot. Isso é documentação, não artefato do snapshot. Nada disso contradiz a classificação (`multi-zones`, cinco unidades `multi-repo`): o compose e o gateway sugerem build e deploy por zona, cada uma em seu contêiner, mas as zonas não são aplicações deste snapshot.

## Aplicações

Nenhuma aplicação frontend na revisão estrutural.

## Observações

Nenhuma aplicação frontend na revisão estrutural.

## Resumo

Aplicações: 0.
