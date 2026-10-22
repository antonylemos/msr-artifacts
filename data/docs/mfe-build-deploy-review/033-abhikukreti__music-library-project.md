---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
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

# 033 — abhikukreti/music-library-project

## Leitura do repositório

Duas aplicações Vite independentes, `main-app` (host) e `music-library` (remote), sem workspace na raiz. Cada uma tem manifesto, lockfile, `vite.config.js` e `vite build` próprios (main-app/package.json:8; music-library/package.json:8). O remote gera `remoteEntry.js` no build (music-library/vite.config.js:8-13). Por isso o README manda rodá-lo com `build` + `preview` mesmo em desenvolvimento, já que o servidor de desenvolvimento não serve a entrada federada (README.md:17-22).

O deploy está descrito no README, e não em artefatos de configuração. Cada aplicação foi publicada como um site Netlify separado, configurado no painel da Netlify com pasta-base, comando de build e pasta de publicação próprios (README.md:30-34). Os dois endereços publicados aparecem no README (README.md:5-7). O README também registra a ordem: publicar o remote, copiar a URL do `remoteEntry.js` para o `vite.config.js` do host e só então publicar o host (README.md:32-34).

Dois artefatos do snapshot sustentam esse relato:
- A URL Netlify do remote está fixada na configuração do host (main-app/vite.config.js:10-12).
- O remote traz um arquivo `_headers` da Netlify que libera CORS para `/assets/*`, onde fica o `remoteEntry.js`, "since remote loads from a different domain" (music-library/public/_headers:1-2; README.md:35).

Não há `netlify.toml`, CI nem Dockerfile.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | main-app | separado | não observado | `https://fluffy-pika-9e723b.netlify.app`, segundo o README (README.md:6); `http://localhost:5000` em desenvolvimento (main-app/vite.config.js:21) | No | main-app/vite.config.js:5-22 (configuração própria); main-app/package.json:8 (`vite build`) |
| 2 | music-library | separado | separado | `https://astonishing-seahorse-d2decf.netlify.app` (main-app/vite.config.js:11; README.md:7); `http://localhost:5001` em desenvolvimento e preview (music-library/vite.config.js:22-23) | No | music-library/vite.config.js:5-24 (configuração própria, gera `remoteEntry.js`); music-library/package.json:8 (`vite build`); music-library/public/_headers:1-2 (cabeçalhos da hospedagem própria); main-app/vite.config.js:11 (domínio próprio do remote) |

## Observações

**1. main-app.** O build é separado. O deploy separado só é afirmado pelo README (README.md:6, 31-34): nenhum artefato do snapshot configura a hospedagem do host, então o valor é `não observado` (ver a Decisão registrada). A versão `0.0.0` não é usada.

**2. music-library.** Build separado. O deploy é separado porque dois artefatos de configuração o sustentam: o host carrega o remote de um domínio próprio (main-app/vite.config.js:11), e o remote tem um `_headers` da hospedagem que existe justamente porque é servido em outra origem (music-library/public/_headers:1-2). A configuração do site (pasta-base e pasta de publicação) fica na Netlify, fora do repositório (README.md:32). Como a URL do remote está fixada no build do host, republicar o remote em outro endereço exige rebuild do host (README.md:33). Sem versionamento.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (separado: 1, não observado: 1). Versionamento independente: 0.

## Decisão registrada

O deploy do `main-app` como site Netlify próprio só é afirmado pelo README (README.md:6, 31-34). Decisão do pesquisador (2026-10-21): `não observado`. Documentação não é artefato de deploy; a afirmação fica registrada no texto e entra na revisão de documentação (seção 3.4.7 do protocolo).
