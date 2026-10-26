---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
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
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Leitura do repositório

São dois exemplos independentes de Module Federation, ambos com o plugin nativo do webpack 5. Por isso não há observação de dependência. Nos dois, a cadeia é a mesma:
- **Configuração:**
  - o host declara os remotes (#1, #4);
  - cada remote se declara e expõe um módulo cujo contrato é uma função `mount` (#2, #3, #5).
- **Código:** o host importa o módulo remoto pelo nome (#18 a #20) e chama `mount` num elemento próprio (#15, #21, #22). Os remotes exportam `mount` (#12 a #14).
- **Relações:** isso resulta nas três relações ativas: container → marketing no exemplo React (#32), e Container → Cart e Container → Products no exemplo em JavaScript puro (#33, #34).

Cada aplicação tem build próprio, mas só para o servidor de desenvolvimento, e não há deploy observado (#35 a #39).

Sinais que enganam se lidos sozinhos:
- **Bootstrap assíncrono e montagem local:** os bootstraps assíncronos (#6 a #10) e as montagens no próprio elemento de desenvolvimento (#16, #17) são internos a cada unidade.
- **`mount` sem consumidor:** o `mount` exportado pelo container React não tem consumidor (#11).
- **Comentário copiado:** o comentário do container diz que ele é carregado "through container" (#41). É uma cópia do marketing e é desmentida pela configuração do próprio container.
- **Pastas e arquivos vazios:** as pastas `auth` e `dashboard` só têm manifesto (#23, #26), e os `webpack.prod.js` estão vazios.

O histórico tem um único commit e não esclarece nenhum desses pontos (#44 a #46). Nenhuma dessas dúvidas muda a leitura do snapshot.

## Observações

### 1. react-js/container/config/webpack.dev.js:1-29

**Observação:** `ModuleFederationPlugin` declara `name: "container"` e o remote `marketing: "marketing@http://localhost:8081/remoteEntry.js"`, e compartilha as `dependencies` do `package.json`. A configuração é só de desenvolvimento (`mode: "development"`, porta 8080).

**Interpretação:** A configuração do host declara o remote marketing e onde encontrá-lo em desenvolvimento.

### 2. react-js/marketing/config/webpack.dev.js:1-30

**Observação:** `ModuleFederationPlugin` declara `name: "marketing"` e `filename: "remoteEntry.js"`, expõe `./MarketingApp` (`./src/bootstrap.js`) e compartilha as `dependencies` do `package.json`. A configuração é só de desenvolvimento (porta 8081).

**Interpretação:** O marketing está configurado como remote e oferece seu bootstrap a um host.

### 3. simple-js/Cart/webpack.config.js:1-22

**Observação:** `ModuleFederationPlugin` declara `name: "cart"` e `filename: "remoteEntry.js"`, expõe `./CartShow` (`./src/bootstrap.js`) e compartilha `@faker-js/faker` como singleton. A configuração é só de desenvolvimento (porta 8082).

**Interpretação:** O Cart está configurado como remote e oferece seu bootstrap a um host.

### 4. simple-js/Container/webpack.config.js:1-21

**Observação:** `ModuleFederationPlugin` declara `name: "container"` e os remotes `products@http://localhost:8081/remoteEntry.js` e `cart@http://localhost:8082/remoteEntry.js`. A configuração é só de desenvolvimento (porta 8080).

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los em desenvolvimento.

### 5. simple-js/Products/webpack.config.js:1-22

**Observação:** `ModuleFederationPlugin` declara `name: "products"` e `filename: "remoteEntry.js"`, expõe `./ProductsIndex` (`./src/bootstrap.js`) e compartilha `@faker-js/faker` como singleton. A configuração é só de desenvolvimento (porta 8081).

**Interpretação:** O Products está configurado como remote e oferece seu bootstrap a um host.

### 6. react-js/container/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 7. react-js/marketing/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 8. simple-js/Cart/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 9. simple-js/Container/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 10. simple-js/Products/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 11. react-js/container/src/bootstrap.js:22

**Observação:** `export { mount }` no bootstrap do container. Nenhuma configuração expõe esse arquivo, e nenhuma unidade o importa.

**Interpretação:** É um contrato de montagem sem consumidor, resíduo do padrão copiado do remote.

### 12. react-js/marketing/src/bootstrap.js:22

**Observação:** `export { mount }` no bootstrap do marketing, o arquivo exposto como `./MarketingApp`.

**Interpretação:** O marketing oferece a função de montagem ao host.

### 13. simple-js/Cart/src/bootstrap.js:3-8

**Observação:** `export function mount(el)` renderiza o carrinho no elemento recebido.

**Interpretação:** O Cart oferece a função de montagem ao host.

### 14. simple-js/Products/src/bootstrap.js:3-12

**Observação:** `export function mount(el)` renderiza a lista de produtos no elemento recebido.

**Interpretação:** O Products oferece a função de montagem ao host.

### 15. react-js/container/src/components/MarketingApp.js:8-10; react-js/container/src/App.js:8

**Observação:** `mount(ref.current)` dentro de um `useEffect`. O componente é renderizado pelo `App` do container.

**Interpretação:** O host monta o remote num elemento próprio, pela função importada.

### 16. simple-js/Cart/src/bootstrap.js:10-14

**Observação:** Chama `mount` no próprio elemento de desenvolvimento quando ele existe.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 17. simple-js/Products/src/bootstrap.js:14-18

**Observação:** Chama `mount` no próprio elemento de desenvolvimento quando ele existe.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 18. react-js/container/src/components/MarketingApp.js:3

**Observação:** `import { mount } from "marketing/MarketingApp"`.

**Interpretação:** O host importa o módulo exposto pelo remote marketing, pelo nome dele.

### 19. simple-js/Container/src/bootstrap.js:1

**Observação:** `import { mount as mountProducts } from "products/ProductsIndex"`.

**Interpretação:** O host importa o módulo exposto pelo remote products, pelo nome dele.

### 20. simple-js/Container/src/bootstrap.js:2

**Observação:** `import { mount as mountCart } from "cart/CartShow"`.

**Interpretação:** O host importa o módulo exposto pelo remote cart, pelo nome dele.

### 21. simple-js/Container/src/bootstrap.js:4

**Observação:** `mountProducts(document.querySelector("#dev-products"))`.

**Interpretação:** O host monta o remote num elemento fixo da página, pela função importada.

### 22. simple-js/Container/src/bootstrap.js:5

**Observação:** `mountCart(document.querySelector("#dev-cart"))`.

**Interpretação:** O host monta o remote num elemento fixo da página, pela função importada.

### 23. react-js/auth; react-js/auth/package.json:1-6

**Observação:** A pasta só tem `package.json`, com um script de teste, e o lockfile. Não tem código, entrada nem build.

**Interpretação:** Não é uma unidade frontend no snapshot.

### 24. react-js/container; react-js/container/src/index.js:1; react-js/container/src/bootstrap.js:6-17; react-js/container/config/webpack.dev.js:7-29

**Observação:** É uma aplicação React com entrada própria e configuração webpack de desenvolvimento.

**Interpretação:** É uma unidade frontend com limite próprio.

### 25. react-js/container/config

**Observação:** A pasta contém as configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 26. react-js/dashboard; react-js/dashboard/package.json:1-6

**Observação:** A pasta só tem `package.json`, com um script de teste, e o lockfile. Não tem código, entrada nem build.

**Interpretação:** Não é uma unidade frontend no snapshot.

### 27. react-js/marketing; react-js/marketing/src/index.js:1; react-js/marketing/src/bootstrap.js:6-17; react-js/marketing/config/webpack.dev.js:7-29

**Observação:** É uma aplicação React com entrada própria e configuração webpack de desenvolvimento.

**Interpretação:** É uma unidade frontend com limite próprio.

### 28. react-js/marketing/config

**Observação:** A pasta contém as configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 29. simple-js/Cart; simple-js/Cart/package.json:1-9; simple-js/Cart/src/index.js:1; simple-js/Cart/src/bootstrap.js:1-7; simple-js/Cart/webpack.config.js:4-8

**Observação:** É uma aplicação JavaScript com manifesto, entrada e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 30. simple-js/Container; simple-js/Container/package.json:1-9; simple-js/Container/src/index.js:1; simple-js/Container/src/bootstrap.js:1-5; simple-js/Container/webpack.config.js:4-8

**Observação:** É uma aplicação JavaScript com manifesto, entrada e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 31. simple-js/Products; simple-js/Products/package.json:1-9; simple-js/Products/src/index.js:1; simple-js/Products/src/bootstrap.js:1-7; simple-js/Products/webpack.config.js:4-8

**Observação:** É uma aplicação JavaScript com manifesto, entrada e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 32. react-js/container/src/components/MarketingApp.js:3, 9; react-js/container/config/webpack.dev.js:19-23; react-js/marketing/config/webpack.dev.js:19-23

**Observação:** O container importa `mount` de `marketing/MarketingApp` e o chama num elemento próprio. O nome e o módulo correspondem à configuração do marketing.

**Interpretação:** É uma relação host → remote ativa.

### 33. simple-js/Container/src/bootstrap.js:2, 5; simple-js/Container/webpack.config.js:10-14; simple-js/Cart/webpack.config.js:10-15

**Observação:** O Container importa `mount` de `cart/CartShow` e o chama sobre `#dev-cart`. O nome e o módulo correspondem à configuração do Cart.

**Interpretação:** É uma relação host → remote ativa.

### 34. simple-js/Container/src/bootstrap.js:1, 4; simple-js/Container/webpack.config.js:10-13; simple-js/Products/webpack.config.js:10-15

**Observação:** O Container importa `mount` de `products/ProductsIndex` e o chama sobre `#dev-products`. O nome e o módulo correspondem à configuração do Products.

**Interpretação:** É uma relação host → remote ativa.

### 35. react-js/container/config/webpack.dev.js:7-29; react-js/container/package.json:5

**Observação:** Configuração webpack própria, só de desenvolvimento, usada por `webpack serve`. O `webpack.prod.js` está vazio. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 36. react-js/marketing/config/webpack.dev.js:7-29; react-js/marketing/package.json:5

**Observação:** Configuração webpack própria, só de desenvolvimento, que gera o `remoteEntry.js`. O `webpack.prod.js` está vazio. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 37. simple-js/Cart/webpack.config.js:4-22; simple-js/Cart/package.json:7

**Observação:** Configuração webpack própria em modo de desenvolvimento, usada por `webpack server`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 38. simple-js/Container/webpack.config.js:4-21; simple-js/Container/package.json:7

**Observação:** Configuração webpack própria em modo de desenvolvimento, usada por `webpack server`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 39. simple-js/Products/webpack.config.js:4-8; simple-js/Products/package.json:8

**Observação:** Configuração webpack própria em modo de desenvolvimento, usada por `webpack serve`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, restrita ao desenvolvimento, sem deploy observado.

### 40. react-js/container/src/bootstrap.js:10-11

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** Afirma que o container monta a si mesmo quando isolado. A afirmação é corroborada.

### 41. react-js/container/src/bootstrap.js:20-21

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** Afirma que o container seria carregado por outro container. A configuração do container não expõe nada, e a afirmação é contradita.

### 42. react-js/marketing/src/bootstrap.js:10-11

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** Afirma que o marketing monta a si mesmo quando isolado. A afirmação é corroborada.

### 43. react-js/marketing/src/bootstrap.js:20-21

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** Afirma que o marketing é carregado pelo container por meio de `mount`. A afirmação é corroborada.

### 44. eeb8488 2025-11-17 (react-js/auth, react-js/dashboard)

**Observação:** As duas pastas chegam no único commit.

**Interpretação:** Não se sabe se eram aplicações planejadas ou restos de outras. A dúvida é só sobre o passado: no snapshot, não são unidades.

### 45. eeb8488 2025-11-17 (react-js/container/config/webpack.prod.js, react-js/marketing/config/webpack.prod.js)

**Observação:** Os dois arquivos chegam vazios no único commit.

**Interpretação:** Não se sabe se tiveram conteúdo antes. A dúvida é só sobre o passado: no snapshot, não há build de produção.

### 46. eeb8488 2025-11-17 (react-js/container/src/bootstrap.js, react-js/marketing/src/bootstrap.js)

**Observação:** Os dois arquivos chegam juntos no único commit.

**Interpretação:** Não há estágio anterior que explique a cópia. A dúvida é só sobre o passado: no snapshot, o comentário do container não corresponde ao seu papel.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (react-js/container, Build); 3.4.3 (react-js/container/config, Marcadores); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #2 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #24; configura #32 |
| 2 | 3.4.3 (react-js/marketing, Build); 3.4.3 (react-js/marketing/config, Marcadores); 3.4.4 (react-js/marketing/src/bootstrap.js:22, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #27; configura #32 |
| 3 | 3.4.3 (simple-js/Cart, Marcadores e Build); 3.4.4 (simple-js/Cart/src/bootstrap.js:3, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #29; configura #33 |
| 4 | 3.4.3 (simple-js/Container, Marcadores e Build); 3.4.5 #2, #3 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #30; configura #33; configura #34 |
| 5 | 3.4.3 (simple-js/Products, Marcadores e Build); 3.4.4 (simple-js/Products/src/bootstrap.js:3, Observação); 3.4.5 #3 (Configuração); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #31; configura #34 |
| 6 | 3.4.4 (react-js/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 (react-js/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 8 | 3.4.4 (simple-js/Cart/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 9 | 3.4.4 (simple-js/Container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (simple-js/Products/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 11 | 3.4.4 (react-js/container/src/bootstrap.js:22) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 12 | 3.4.4 (react-js/marketing/src/bootstrap.js:22) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 13 | 3.4.4 (simple-js/Cart/src/bootstrap.js:3) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 14 | 3.4.4 (simple-js/Products/src/bootstrap.js:3) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 15 | 3.4.4 (react-js/container/src/components/MarketingApp.js:9) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 16 | 3.4.4 (simple-js/Cart/src/bootstrap.js:13) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 17 | 3.4.4 (simple-js/Products/src/bootstrap.js:17) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 18 | 3.4.4 (react-js/container/src/components/MarketingApp.js:3) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 19 | 3.4.4 (simple-js/Container/src/bootstrap.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34 |
| 20 | 3.4.4 (simple-js/Container/src/bootstrap.js:2) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 21 | 3.4.4 (simple-js/Container/src/bootstrap.js:4) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 22 | 3.4.4 (simple-js/Container/src/bootstrap.js:5) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 23 | 3.4.3 (react-js/auth) | 4 estrutura | diretório | — | contexto | fraca | — |
| 24 | 3.4.3 (react-js/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (react-js/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 26 | 3.4.3 (react-js/dashboard) | 4 estrutura | diretório | — | contexto | fraca | — |
| 27 | 3.4.3 (react-js/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 28 | 3.4.3 (react-js/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 29 | 3.4.3 (simple-js/Cart) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (simple-js/Container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (simple-js/Products) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #24; liga #27 |
| 33 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #30; liga #29 |
| 34 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #30; liga #31 |
| 35 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #24 |
| 36 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #27 |
| 37 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #29 |
| 38 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #30 |
| 39 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #31 |
| 40 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora react-js/container/src/bootstrap.js:12-17; corrobora react-js/container/public/index.html:5 |
| 41 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #1 |
| 42 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #27 |
| 43 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #32; corrobora #2; corrobora #18; corrobora #15 |
| 44 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #23; explica #26 |
| 45 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #35; explica #36 |
| 46 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #41; explica #11 |

## Resumo

Observações: 46. Dimensões (tecnologia: 0, configuração: 5, código: 17, estrutura: 9, composição: 3, build-deploy: 5, documentação: 4, histórico: 3). Força (forte: 8, moderada: 19, fraca: 19, ambígua: 0). Evidência (tecnológica: 17, arquitetural: 25, contexto: 4).
