---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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

# 106 — alimohammadi/micro-frontend

## Leitura do repositório

O repositório traz o código de um curso, com dois exemplos independentes de Module Federation: `ecomm/` (container, products e cart, em JavaScript puro) e `packages/` (container e marketing, em React). Os dois usam o plugin nativo do webpack 5, e por isso não há observação de dependência. Nos dois exemplos a cadeia é a mesma:
- **Configuração:**
  - o host declara os remotes (#2 no `ecomm`; #4 e #5 no `packages`);
  - cada remote se declara e expõe um módulo cujo contrato é uma função `mount` (#1, #3, #6, #7).
- **Código:** o host importa o módulo remoto pelo nome (#17 a #19) e chama `mount` num elemento próprio (#16, #20, #21). Os remotes exportam `mount` (#11 a #13).
- **Relações:** daí as três relações ativas: container → cart e container → products no `ecomm` (#31, #32), e container → marketing no `packages` (#33).

As cinco aplicações têm build próprio (#34 a #38). Não há deploy observado. No `ecomm` só existe o servidor de desenvolvimento. No `packages` há também build de produção, mas o endereço do remote depende de `PRODUCTION_DOMAIN`, que não tem valor no snapshot (#5). A relação ativa se apoia na configuração de desenvolvimento (#4).

Sinais que enganam se lidos sozinhos:
- **Bootstrap assíncrono e montagem local:** os bootstraps assíncronos (#8 a #10) e as montagens no elemento de desenvolvimento do próprio remote (#14, #15) são internos a cada unidade.
- **Pastas só com manifesto:** `packages/auth` e `packages/dashboard` só têm `package.json` e lockfile (#25, #28). O histórico mostra que nunca tiveram outro arquivo (#46).
- **"development or production":** os comentários dos `mount.js` do `ecomm` dizem que o remote roda pelo container também em produção (#40, #43). O exemplo, porém, só tem configuração de desenvolvimento, e o histórico mostra que é assim desde o commit que trouxe o comentário (#47).

Os comentários dos remotes (#39 a #45) descrevem o padrão de montagem isolada e montagem pelo container, e conferem com o código. Nada fica ambíguo no snapshot.

## Observações

### 1. ecomm/cart/webpack.config.js:1-26

**Observação:** `ModuleFederationPlugin` declara `name: "cart"` e `filename: "remoteEntry.js"`, expõe `./CartShow` (`./src/mount`) e compartilha `faker` com `singleton: true`. A configuração é só de desenvolvimento (`mode: "development"`, porta 8082).

**Interpretação:** O cart está configurado como remote e oferece seu `mount` a um host.

### 2. ecomm/container/webpack.config.js:1-29

**Observação:** `ModuleFederationPlugin` declara `name: "container"` e os remotes `products: "products@http://localhost:8081/remoteEntry.js"` e `carts: "cart@http://localhost:8082/remoteEntry.js"`. A configuração é só de desenvolvimento (`mode: "development"`, porta 8080).

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los em desenvolvimento. O nome local `carts` aponta para o container `cart`.

### 3. ecomm/products/webpack.config.js:1-22

**Observação:** `ModuleFederationPlugin` declara `name: "products"` e `filename: "remoteEntry.js"`, expõe `./ProductsIndex` (`./src/mount.js`) e compartilha `faker`. A configuração é só de desenvolvimento (`mode: "development"`, porta 8081).

**Interpretação:** O products está configurado como remote e oferece seu `mount` a um host.

### 4. packages/container/config/webpack.dev.js:1-26

**Observação:** `ModuleFederationPlugin` declara `name: "container"` e o remote `marketing: "marketing@http://localhost:8081/remoteEntry.js"`, e compartilha as `dependencies` do `package.json`. A configuração é de desenvolvimento (`mode: "development"`, porta 8080) e se junta à `webpack.common.js`.

**Interpretação:** A configuração do host declara o remote marketing e onde encontrá-lo em desenvolvimento.

### 5. packages/container/config/webpack.prod.js:1-25

**Observação:** `ModuleFederationPlugin` declara `name: "container"` e o remote `` marketing: `marketing@${domain}/marketing/remoteEntry.js` ``, com `domain` lido de `process.env.PRODUCTION_DOMAIN`, e compartilha as `dependencies` do `package.json`. O build é de produção, com `publicPath: "/container/latest/"`.

**Interpretação:** A configuração de produção do host declara o mesmo remote marketing. O endereço depende de uma variável de ambiente que não tem valor no snapshot.

### 6. packages/marketing/config/webpack.dev.js:1-31

**Observação:** `ModuleFederationPlugin` declara `name: "marketing"` e `filename: "remoteEntry.js"`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`. A configuração é de desenvolvimento (porta 8081).

**Interpretação:** O marketing está configurado como remote e oferece seu bootstrap a um host.

### 7. packages/marketing/config/webpack.prod.js:1-23

**Observação:** `ModuleFederationPlugin` repete `name: "marketing"`, `filename: "remoteEntry.js"`, a exposição `./MarketingApp` (`./src/bootstrap`) e o compartilhamento das `dependencies`. O build é de produção, com nomes de arquivo com hash.

**Interpretação:** O marketing também é configurado como remote no build de produção.

### 8. ecomm/container/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 9. packages/container/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 10. packages/marketing/src/index.js:1

**Observação:** `import("./bootstrap")`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 11. ecomm/cart/src/mount.js:26; ecomm/cart/src/mount.js:3-7

**Observação:** `export { mount }`. A função `mount(el)` escreve no elemento recebido o texto do carrinho, com um número gerado pelo `faker`. O arquivo é o exposto como `./CartShow`.

**Interpretação:** O cart oferece a função de montagem ao host.

### 12. ecomm/products/src/mount.js:31; ecomm/products/src/mount.js:5-12

**Observação:** `export { mount }`. A função `mount(el)` escreve no elemento recebido três nomes de produto gerados pelo `faker`. O arquivo é o exposto como `./ProductsIndex`.

**Interpretação:** O products oferece a função de montagem ao host.

### 13. packages/marketing/src/bootstrap.js:17; packages/marketing/src/bootstrap.js:6-8

**Observação:** `export { mount }`. A função `mount(el)` executa `ReactDom.render(<App />, el)`. O arquivo é o exposto como `./MarketingApp`.

**Interpretação:** O marketing oferece ao host a função que monta a sua aplicação.

### 14. ecomm/cart/src/mount.js:17; ecomm/cart/src/mount.js:14-19; ecomm/cart/public/index.html:9

**Observação:** Em `NODE_ENV === "development"`, chama `mount` sobre `#dev-cart` quando esse elemento existe. O elemento está no `index.html` do próprio cart.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 15. ecomm/products/src/mount.js:22; ecomm/products/src/mount.js:19-24; ecomm/products/public/index.html:9

**Observação:** Em `NODE_ENV === "development"`, chama `mount` sobre `#dev-products` quando esse elemento existe. O elemento está no `index.html` do próprio products.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 16. packages/container/src/components/MarketingApp.js:8; packages/container/src/components/MarketingApp.js:7-11; packages/container/src/App.js:10

**Observação:** `mount(ref.current)` dentro de um `useEffect`, sobre o `div` que o componente renderiza. O componente é renderizado pelo `App` do container.

**Interpretação:** O host monta o remote num elemento próprio, pela função importada.

### 17. ecomm/container/src/bootstrap.js:1

**Observação:** `import { mount as productsMount } from "products/ProductsIndex"`.

**Interpretação:** O host importa o módulo exposto pelo remote products, pelo nome dele.

### 18. ecomm/container/src/bootstrap.js:3

**Observação:** `import { mount as cartMount } from "carts/CartShow"`.

**Interpretação:** O host importa o módulo exposto pelo remote cart, pelo nome local `carts`.

### 19. packages/container/src/components/MarketingApp.js:1

**Observação:** `import { mount } from "marketing/MarketingApp"`.

**Interpretação:** O host importa o módulo exposto pelo remote marketing, pelo nome dele.

### 20. ecomm/container/src/bootstrap.js:5; ecomm/container/public/index.html:9

**Observação:** `productsMount(document.querySelector("#my-products"))`. O elemento está no `index.html` do container.

**Interpretação:** O host monta o remote num elemento fixo da sua página, pela função importada.

### 21. ecomm/container/src/bootstrap.js:6; ecomm/container/public/index.html:10

**Observação:** `cartMount(document.querySelector("#my-cart"))`. O elemento está no `index.html` do container.

**Interpretação:** O host monta o remote num elemento fixo da sua página, pela função importada.

### 22. ecomm/cart; ecomm/cart/package.json:1-24; ecomm/cart/src/index.js:1; ecomm/cart/webpack.config.js:4-26; ecomm/cart/package.json:6

**Observação:** É uma aplicação JavaScript com manifesto, entrada e configuração webpack próprios, servida por `webpack serve`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 23. ecomm/container; ecomm/container/package.json:1-22; ecomm/container/src/index.js:1; ecomm/container/webpack.config.js:4-29; ecomm/container/package.json:6

**Observação:** É uma aplicação JavaScript com manifesto, entrada e configuração webpack próprios, servida por `webpack serve`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 24. ecomm/products; ecomm/products/package.json:1-24; ecomm/products/src/index.js:1; ecomm/products/webpack.config.js:4-22; ecomm/products/package.json:6

**Observação:** É uma aplicação JavaScript com manifesto, entrada e configuração webpack próprios, servida por `webpack serve`. O manifesto declara `name` `container`.

**Interpretação:** É uma unidade frontend com limite próprio. O `name` do manifesto não muda o nome federado, que vem do plugin.

### 25. packages/auth; packages/auth/package.json:1-29

**Observação:** A pasta só tem `package.json`, com um script de teste, e o lockfile. Não tem código, entrada nem build.

**Interpretação:** Não é uma unidade frontend no snapshot.

### 26. packages/container; packages/container/package.json:1-30; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.dev.js:6-26; packages/container/config/webpack.prod.js:8-25; packages/container/package.json:5-6

**Observação:** É uma aplicação React com entrada própria e builds webpack de desenvolvimento e de produção, acionados pelos scripts `start` e `build`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 27. packages/container/config

**Observação:** A pasta contém as configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 28. packages/dashboard; packages/dashboard/package.json:1-33

**Observação:** A pasta só tem `package.json`, com um script de teste, e o lockfile. Não tem código, entrada nem build.

**Interpretação:** Não é uma unidade frontend no snapshot.

### 29. packages/marketing; packages/marketing/package.json:1-30; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:10-14; packages/marketing/config/webpack.dev.js:7-31; packages/marketing/config/webpack.prod.js:6-23; packages/marketing/package.json:5-6

**Observação:** É uma aplicação React com entrada própria e builds webpack de desenvolvimento e de produção, acionados pelos scripts `start` e `build`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 30. packages/marketing/config

**Observação:** A pasta contém as configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 31. ecomm/container/src/bootstrap.js:3, 6; ecomm/container/webpack.config.js:20-23; ecomm/cart/webpack.config.js:10-15; ecomm/cart/src/mount.js:26

**Observação:** O container importa `mount` de `carts/CartShow` e o chama sobre `#my-cart`. O nome local `carts` aponta para `cart@http://localhost:8082/remoteEntry.js`, e o nome e o módulo correspondem à configuração do cart.

**Interpretação:** É uma relação host → remote ativa.

### 32. ecomm/container/src/bootstrap.js:1, 5; ecomm/container/webpack.config.js:20-21; ecomm/products/webpack.config.js:10-15; ecomm/products/src/mount.js:31

**Observação:** O container importa `mount` de `products/ProductsIndex` e o chama sobre `#my-products`. O nome e o módulo correspondem à configuração do products.

**Interpretação:** É uma relação host → remote ativa.

### 33. packages/container/src/components/MarketingApp.js:1, 8; packages/container/config/webpack.dev.js:16-20; packages/container/config/webpack.prod.js:15-19; packages/marketing/config/webpack.dev.js:17-22; packages/marketing/config/webpack.prod.js:12-17; packages/marketing/src/bootstrap.js:17

**Observação:** O adaptador do container importa `mount` de `marketing/MarketingApp` e o chama sobre o seu `div`. O nome e o módulo correspondem à configuração do marketing, em desenvolvimento e em produção.

**Interpretação:** É uma relação host → remote ativa, apoiada na configuração de desenvolvimento acionada por `webpack serve`.

### 34. ecomm/cart/webpack.config.js:4-26; ecomm/cart/package.json:6

**Observação:** Configuração webpack própria em modo de desenvolvimento, usada por `webpack serve` na porta 8082, que gera o `remoteEntry.js`. Não há build de produção nem artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 35. ecomm/container/webpack.config.js:4-29; ecomm/container/package.json:6

**Observação:** Configuração webpack própria em modo de desenvolvimento, usada por `webpack serve` na porta 8080. Não há build de produção nem artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 36. ecomm/products/webpack.config.js:4-22; ecomm/products/package.json:6

**Observação:** Configuração webpack própria em modo de desenvolvimento, usada por `webpack serve` na porta 8081, que gera o `remoteEntry.js`. Não há build de produção nem artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 37. packages/container/config/webpack.prod.js:8-25; packages/container/package.json:6; packages/container/config/webpack.dev.js:6-26; packages/container/package.json:5

**Observação:** Configurações webpack próprias de desenvolvimento (`webpack serve`, porta 8080) e de produção (`webpack --config config/webpack.prod.js`, `publicPath` `/container/latest/`). Não há artefato que publique o build.

**Interpretação:** Há uma fronteira de build própria, inclusive de produção, sem deploy observado.

### 38. packages/marketing/config/webpack.prod.js:6-23; packages/marketing/package.json:6; packages/marketing/config/webpack.dev.js:7-31; packages/marketing/package.json:5

**Observação:** Configurações webpack próprias de desenvolvimento (`webpack serve`, porta 8081) e de produção (`webpack --config config/webpack.prod.js`), que geram o `remoteEntry.js`. O caminho de produção `${PRODUCTION_DOMAIN}/marketing/remoteEntry.js` só aparece do lado do container. Não há artefato que publique o build.

**Interpretação:** Há uma fronteira de build própria, inclusive de produção, sem deploy observado.

### 39. ecomm/cart/src/mount.js:9-13

**Observação:** "we are running this file in development in isolation / we are using our local index.html file / ... / we want to immediately render our app into that element".

**Interpretação:** Afirma que o cart monta a si mesmo quando isolado. A afirmação é corroborada. O elemento `'dev-products'` citado no comentário é resto da cópia do products; o código usa `#dev-cart`.

### 40. ecomm/cart/src/mount.js:21-25

**Observação:** "we are running this file in development or production / we are running through the container app / ... / we want to NOT immediately render the app".

**Interpretação:** Afirma que o cart é carregado pelo container, em desenvolvimento ou em produção, e só exporta `mount`. A carga pelo container é corroborada; a menção a produção não tem artefato, porque o exemplo só tem configuração de desenvolvimento. A afirmação é corroborada em parte.

### 41. ecomm/cart/webpack.config.js:18

**Observação:** "load only one single faker no matter what", no `shared` do `faker` com `singleton: true`.

**Interpretação:** Afirma que haverá uma só instância do `faker` compartilhado. A afirmação é corroborada: o cart e o products compartilham `faker` e o importam.

### 42. ecomm/products/src/mount.js:14-18

**Observação:** "we are running this file in development in isolation / we are using our local index.html file / which DEFINITELY has an element with id of 'dev-products' / we want to immediately render our app into that element".

**Interpretação:** Afirma que o products monta a si mesmo quando isolado. A afirmação é corroborada.

### 43. ecomm/products/src/mount.js:26-30

**Observação:** "we are running this file in development or production / we are running through the container app / ... / we want to NOT immediately render the app".

**Interpretação:** Afirma que o products é carregado pelo container, em desenvolvimento ou em produção, e só exporta `mount`. A carga pelo container é corroborada; a menção a produção não tem artefato. A afirmação é corroborada em parte.

### 44. packages/marketing/src/bootstrap.js:9

**Observação:** "if we are in development mode and in isolation call mount imediately".

**Interpretação:** Afirma que o marketing monta a si mesmo quando isolado. A afirmação é corroborada.

### 45. packages/marketing/src/bootstrap.js:16

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** Afirma que o marketing é carregado pelo container por meio de `mount`. A afirmação é corroborada.

### 46. 00dbb64 2025-04-27 (packages/auth, packages/dashboard)

**Observação:** As duas pastas são criadas nesse commit só com `package.json` e `package-lock.json`, e nenhum commit posterior até o snapshot as toca.

**Interpretação:** As pastas nunca tiveram código, e não houve código removido. Não se sabe se as aplicações eram planejadas; no snapshot, não são unidades.

### 47. de130a5 2025-04-24 (ecomm/products/package.json); 3817fd6 2025-04-24 (ecomm/cart/package.json); a8c742c 2025-04-26 (ecomm/products/src/mount.js, ecomm/products/webpack.config.js); c784f55 2025-04-26 (ecomm/cart/src/mount.js, ecomm/cart/webpack.config.js)

**Observação:** Os `mount.js` são criados em `a8c742c` e `c784f55` e não mudam depois. As configurações webpack mudam pela última vez nesses commits, já com `mode: "development"`. Os `package.json`, com o único script `webpack serve`, não mudam desde a criação.

**Interpretação:** O comentário "development or production" e a configuração só de desenvolvimento estão juntos desde o commit que trouxe o comentário. Não houve estágio com build de produção a que a menção corresponda.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (ecomm/cart, Marcadores, Entrada e Build); 3.4.4 (ecomm/cart/src/mount.js:26, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida e Artefatos); 3.4.7 #2 (Evidência); 3.4.7 #3 (Documento e Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #31 |
| 2 | 3.4.3 (ecomm/container, Marcadores, Entrada e Build); 3.4.4 (ecomm/container/src/bootstrap.js:1, :3, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #2 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #23; configura #31; configura #32 |
| 3 | 3.4.3 (ecomm/products, Marcadores, Entrada e Build); 3.4.4 (ecomm/products/src/mount.js:31, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Onde é servida e Artefatos); 3.4.7 #3 (Evidência); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #32 |
| 4 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (packages/container/src/components/MarketingApp.js:1, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #33 |
| 5 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.5 #3 (Configuração); 3.4.6 #4 (Onde é servida e Artefatos); 3.4.6 #5 (Onde é servida) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #33 |
| 6 | 3.4.3 (packages/marketing, Entrada e Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:17, Observação); 3.4.5 #3 (Configuração); 3.4.6 #5 (Onde é servida e Artefatos); 3.4.7 #7 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #29; configura #33 |
| 7 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.5 #3 (Configuração); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #29; configura #33 |
| 8 | 3.4.4 (ecomm/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 9 | 3.4.4 (packages/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (packages/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 11 | 3.4.4 (ecomm/cart/src/mount.js:26) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #31 |
| 12 | 3.4.4 (ecomm/products/src/mount.js:31) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 13 | 3.4.4 (packages/marketing/src/bootstrap.js:17) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 14 | 3.4.4 (ecomm/cart/src/mount.js:17) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 15 | 3.4.4 (ecomm/products/src/mount.js:22) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 16 | 3.4.4 (packages/container/src/components/MarketingApp.js:8) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 17 | 3.4.4 (ecomm/container/src/bootstrap.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 18 | 3.4.4 (ecomm/container/src/bootstrap.js:3) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #31 |
| 19 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 20 | 3.4.4 (ecomm/container/src/bootstrap.js:5) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 21 | 3.4.4 (ecomm/container/src/bootstrap.js:6) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #31 |
| 22 | 3.4.3 (ecomm/cart) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (ecomm/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (ecomm/products) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | contexto | fraca | — |
| 26 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | contexto | fraca | — |
| 29 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 31 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #23; liga #22 |
| 32 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #23; liga #24 |
| 33 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #29 |
| 34 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #22 |
| 35 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #23 |
| 36 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #24 |
| 37 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #26 |
| 38 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #29 |
| 39 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #22; corrobora #14 |
| 40 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #31; corrobora em parte #11; corrobora em parte #18; corrobora em parte #21 |
| 41 | 3.4.7 #3 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #1; corrobora #3; corrobora ecomm/cart/src/mount.js:1; corrobora ecomm/products/src/mount.js:1 |
| 42 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #24; corrobora #15 |
| 43 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #32; corrobora em parte #12; corrobora em parte #17; corrobora em parte #20 |
| 44 | 3.4.7 #6 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #29; corrobora packages/marketing/src/bootstrap.js:10-14 |
| 45 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #33; corrobora #13; corrobora #6; corrobora #19; corrobora #16 |
| 46 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #25; explica #28 |
| 47 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #40; explica #43 |

## Resumo

Observações: 47. Dimensões (tecnologia: 0, configuração: 7, código: 14, estrutura: 9, composição: 3, build-deploy: 5, documentação: 7, histórico: 2). Força (forte: 9, moderada: 20, fraca: 18, ambígua: 0). Evidência (tecnológica: 16, arquitetural: 27, contexto: 4).
