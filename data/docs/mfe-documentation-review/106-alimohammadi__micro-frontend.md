---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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

# 106 — alimohammadi/micro-frontend

## Leitura do repositório

O único documento é o README.md, que tem só o título `# micro-frontend` (README.md:1); essa é também a única ocorrência `doc-*` da mineração (`doc-mfe-term`), um título sem afirmação. Os `package.json` do exemplo `ecomm` têm `description` vazia (ecomm/cart/package.json:11; ecomm/container/package.json:11; ecomm/products/package.json:11), e os do exemplo `packages` não têm o campo. A documentação da arquitetura está, portanto, só nos comentários do código, em inglês.

Os comentários dos remotes explicam o padrão do curso, o mesmo nos dois exemplos: em desenvolvimento e isolado, o remote monta a si mesmo num elemento do seu próprio `index.html`; quando roda pelo container, só exporta `mount` para o host chamar (ecomm/cart/src/mount.js:9-25; ecomm/products/src/mount.js:14-30; packages/marketing/src/bootstrap.js:9,16). Isso confere com as revisões anteriores, que registraram as três relações host → remote por Module Federation com contrato `mount(el)` e a montagem isolada de cada remote como interna à unidade. O comentário de ecomm/cart/webpack.config.js:18 explica o `singleton` do `faker` compartilhado. O comentário de packages/marketing/src/bootstrap.js:5 ("Mount function to start up the app") descreve a função interna e não virou linha. Os containers não têm comentários, ao contrário do repositório 007, em que o bootstrap do container copiava os do marketing.

Foram lidos os artefatos que as revisões anteriores citam:
- as configurações webpack (`webpack.config.js` do `ecomm`; `webpack.common.js`, `webpack.dev.js` e `webpack.prod.js` de packages/container e packages/marketing);
- os `package.json`, inclusive os de packages/auth e packages/dashboard, que só têm manifesto;
- os `index.js`, `bootstrap.js` e `mount.js` das cinco aplicações e os `public/index.html`;
- packages/container/src/App.js e packages/container/src/components/MarketingApp.js.

Fora deles, os únicos comentários são de layout (ex.: packages/marketing/src/components/Landing.js:53; packages/marketing/src/components/Pricing.js:173).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | ecomm/cart/src/mount.js:9-13 | "we are running this file in development in isolation / we are using our local index.html file / ... / we want to immediately render our app into that element" (em desenvolvimento e isolado, o cart monta a si mesmo) | independência | corroborada | 3.4.3 (ecomm/cart `Yes`); ecomm/cart/src/mount.js:14-19; ecomm/cart/public/index.html:9 |
| 2 | ecomm/cart/src/mount.js:21-25 | "we are running this file in development or production / we are running through the container app / ... / we want to NOT immediately render the app" (o cart é carregado pelo container, em desenvolvimento ou produção, e só exporta `mount`) | composição | parcial | 3.4.5 #1; ecomm/cart/src/mount.js:26; ecomm/container/src/bootstrap.js:3,6; ecomm/cart/webpack.config.js:5 |
| 3 | ecomm/cart/webpack.config.js:18 | "load only one single faker no matter what" (uma só instância do `faker` compartilhado) | composição | corroborada | ecomm/cart/webpack.config.js:16-20; ecomm/products/webpack.config.js:16; ecomm/cart/src/mount.js:1; ecomm/products/src/mount.js:1 |
| 4 | ecomm/products/src/mount.js:14-18 | "we are running this file in development in isolation / we are using our local index.html file / which DEFINITELY has an element with id of 'dev-products' / we want to immediately render our app into that element" (em desenvolvimento e isolado, o products monta a si mesmo) | independência | corroborada | 3.4.3 (ecomm/products `Yes`); ecomm/products/src/mount.js:19-24; ecomm/products/public/index.html:9 |
| 5 | ecomm/products/src/mount.js:26-30 | "we are running this file in development or production / we are running through the container app / ... / we want to NOT immediately render the app" (o products é carregado pelo container, em desenvolvimento ou produção, e só exporta `mount`) | composição | parcial | 3.4.5 #2; ecomm/products/src/mount.js:31; ecomm/container/src/bootstrap.js:1,5; ecomm/products/webpack.config.js:5 |
| 6 | packages/marketing/src/bootstrap.js:9 | "if we are in development mode and in isolation call mount imediately" (em desenvolvimento e isolado, o marketing monta a si mesmo) | independência | corroborada | 3.4.3 (packages/marketing `Yes`); packages/marketing/src/bootstrap.js:10-14; packages/marketing/public/index.html:9 |
| 7 | packages/marketing/src/bootstrap.js:16 | "We are running through container and we should export the mount function" (o marketing é carregado pelo container por meio de `mount`) | composição | corroborada | 3.4.5 #3; packages/marketing/src/bootstrap.js:17; packages/marketing/config/webpack.dev.js:20-22; packages/container/src/components/MarketingApp.js:1,8 |

## Observações

**1. ecomm/cart/src/mount.js:9-13.** Em desenvolvimento, o cart procura `#dev-cart` e, se o encontra, chama `mount` sobre ele (ecomm/cart/src/mount.js:14-19); o elemento existe no `index.html` do próprio cart (ecomm/cart/public/index.html:9), servido pela sua configuração própria na porta 8082. Isso sustenta a execução isolada registrada na revisão estrutural. O comentário fala de um elemento `'dev-products'` (ecomm/cart/src/mount.js:12), resto da cópia do arquivo do products: o código e o `index.html` usam `dev-cart`. O nome do elemento é detalhe interno da unidade e não muda a afirmação.

**2. ecomm/cart/src/mount.js:21-25.** O cart exporta `mount` (ecomm/cart/src/mount.js:26), exposto como `./CartShow`, e o container o importa e chama sobre `#my-cart` (ecomm/container/src/bootstrap.js:3,6), relação 3.4.5 #1. Como a página do container não tem `#dev-cart`, a montagem automática não acontece ali. A parte "or production" não tem artefato: a configuração do exemplo `ecomm` fixa `mode: "development"` (ecomm/cart/webpack.config.js:5) e o único script é `webpack serve` (ecomm/cart/package.json:6), e a revisão de build e deploy não registrou build de produção para o cart. Daí `parcial`. O comentário repete o `'dev-products'` da cópia (ecomm/cart/src/mount.js:24).

**3. ecomm/cart/webpack.config.js:18.** O cart declara `faker` em `shared` com `singleton: true` (ecomm/cart/webpack.config.js:16-20), e o products também compartilha `faker` (ecomm/products/webpack.config.js:16), sem `singleton`. As duas unidades importam `faker` (ecomm/cart/src/mount.js:1; ecomm/products/src/mount.js:1) e declaram a mesma faixa `^5.1.0` (ecomm/cart/package.json:14; ecomm/products/package.json:14), então ao menos duas unidades usam a biblioteca compartilhada. O container do exemplo não declara `shared` (ecomm/container/webpack.config.js:18-24); o compartilhamento é entre os dois remotes montados na mesma página. Os dois manifestos também declaram `@faker-js/faker` (linha 13), que o código não importa.

**4. ecomm/products/src/mount.js:14-18.** Mesmo padrão do cart, aqui com o elemento certo: o products monta a si mesmo em `#dev-products` (ecomm/products/src/mount.js:19-24), que existe no seu `index.html` (ecomm/products/public/index.html:9). Sustenta a execução isolada da revisão estrutural.

**5. ecomm/products/src/mount.js:26-30.** O products exporta `mount` (ecomm/products/src/mount.js:31), exposto como `./ProductsIndex`, e o container o importa como `productsMount` e o chama sobre `#my-products` (ecomm/container/src/bootstrap.js:1,5), relação 3.4.5 #2. Como no #2, a parte "or production" não tem artefato: `mode: "development"` fixo (ecomm/products/webpack.config.js:5) e só o script `webpack serve` (ecomm/products/package.json:6). Daí `parcial`.

**6. packages/marketing/src/bootstrap.js:9.** Em desenvolvimento, o marketing monta a si mesmo quando encontra `#_marketing-dev-root` (packages/marketing/src/bootstrap.js:10-14), que existe no seu próprio `index.html` (packages/marketing/public/index.html:9). Sustenta a execução isolada da revisão estrutural.

**7. packages/marketing/src/bootstrap.js:16.** O marketing exporta `mount` (packages/marketing/src/bootstrap.js:17) e o expõe como `./MarketingApp` → `./src/bootstrap` (packages/marketing/config/webpack.dev.js:20-22); o adaptador do container importa `mount` de `marketing/MarketingApp` e o chama sobre o seu `div` (packages/container/src/components/MarketingApp.js:1,8). A relação é a 3.4.5 #3. Diferente do `ecomm`, o comentário não fala de produção; o exemplo tem build de produção com a mesma exposição (packages/marketing/config/webpack.prod.js:12-17).

## Resumo

Afirmações: 7 (corroborada: 5, parcial: 2, contradita: 0, sem corroboração: 0). Temas: (composição: 4, independência: 3).
