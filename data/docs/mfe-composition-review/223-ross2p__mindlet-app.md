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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Leitura do repositório

Superprojeto de um produto pessoal, o Mindlet, com cinco zonas Next.js (dashboard, auth, profile, study e decks) e duas bibliotecas (`@ross2p/shared` e `@ross2p/types`) (README.md:3). Todas são submódulos Git, cada uma com repositório próprio (.gitmodules:1-21). O snapshot não tem o código de nenhuma delas: os diretórios `apps/*` e `libs/*` não existem em `files/`. O que está versionado aqui é só a orquestração local, ou seja, o `compose.yml`, as configurações de nginx e as skills de agentes em `.agents/`.

A composição é por zonas atrás de um proxy reverso. O `compose.yml` declara um serviço por zona, construído a partir do diretório do submódulo (compose.yml:15-18, com `context: apps/dashboard`; os outros em compose.yml:36, :55, :74 e :93). Declara também um serviço `nginx` que monta as configurações de `infra/nginx/` e depende das cinco zonas (compose.yml:110-124). O nginx define um upstream por zona (infra/nginx/nginx.conf:14-18), encaminha cada prefixo para o seu upstream (infra/nginx/nginx.conf:36-38 para `/dashboard/`, e análogos até infra/nginx/nginx.conf:64-66 para `/decks/`) e redireciona `/` para `/dashboard/` (infra/nginx/nginx.conf:29-31). O mapa infra/nginx/routing-map.frontend.conf:1-9 repete a correspondência entre prefixo e serviço. A variante para desenvolvimento sem Docker aponta os mesmos upstreams para `localhost:3001-3005` (infra/nginx/nginx.conf.local:16-20). Há ainda um `config/nginx/nginx.conf` com upstreams nas portas 3001-3005 dos serviços (config/nginx/nginx.conf:11-25), que o `compose.yml` não monta (compose.yml:115-118). Segundo o README, cada zona usa `basePath` próprio (README.md:3), e o gateway fica em `localhost:8080` (README.md:34-35). Os `basePath` estão nos submódulos e não podem ser conferidos.

Nenhuma relação foi registrada. A revisão estrutural não tem nenhuma linha na tabela "Unidades" e conta 0 aplicações frontend no snapshot. A revisão de código-fonte não tem nenhuma construção `Yes` ou `Undetermined`, e a revisão de dependências não tem dependência das tecnologias inspecionadas. Uma relação precisa de uma Origem que seja diretório `Yes` ou `Undetermined` da revisão estrutural, e aqui não há nenhum. O gateway nginx é configuração de deploy, não unidade frontend, e roteia requisições entre zonas sem que uma zona carregue, registre ou embuta outra. As cinco zonas estão fora do snapshot. O mesmo vale para a dependência de pacote `@ross2p/shared`, que as zonas consomem por `file:../../libs/shared` no desenvolvimento local (README.md:74): ela não é verificável aqui e não é relação de composição. Isso não contradiz a classificação (`MFE-implemented`, `approaches: [multi-zones]`, cinco unidades `multi-repo`): o repositório configura uma composição por rotas cujas unidades ficam todas em outros repositórios.

## Relações

Nenhuma relação.

## Observações

Nenhuma relação. A revisão de código-fonte não tem linha `Yes` ou `Undetermined` para distribuir na coluna Código.

## Resumo

Relações: 0. Ativas: 0. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
