---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
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

# 237 — Axiean/micro-store

## Leitura do repositório

Exemplo feito para uma avaliação técnica de frontend: uma loja com duas aplicações Next.js, `store-app` (vitrine) e `cart-app` (carrinho), unidas por Next.js Multi-Zones. A composição usa só recursos do próprio Next.js e não depende de nenhuma tecnologia do catálogo de dependências. Por isso não há observação de dependência.

A cadeia que sustenta a arquitetura é de roteamento no servidor, não de montagem na página:
- **Estrutura:** as duas apps têm manifesto, entrada e build próprios (#4, #5).
- **Configuração:** o `rewrites()` do `store-app` encaminha `/cart/:path*` para `http://cart-app:3000/cart/:path*` (#1). O endereço está fixo no arquivo, sem variável de ambiente.
- **Código:** a linha do `rewrites()` registrada na 3.4.4 (#2), dentro do bloco de #1.
- **Relação:** isso resulta na relação ativa `store-app → cart-app` (#6). O hostname `cart-app` é o serviço do compose construído de `./cart-app`, e o `cart-app` responde sob `basePath: "/cart"` com a página inteira.

A segunda ligação é o estado do carrinho: as duas zonas persistem o mesmo store zustand na chave `cart-storage` do `localStorage` (#3). O `store-app` grava e o `cart-app` lê (#7). Só funciona porque o rewrite de #1 põe as duas zonas na mesma origem. O store é uma cópia em cada zona, não código comum.

Build e deploy são separados por app (#8, #9): `next build` com saída `standalone`, Dockerfile, imagem e serviço no compose próprios. Não há CI, registro de imagens nem versionamento, e o compose é uma stack local.

A documentação confirma tudo o que afirma: arquitetura de micro-frontends, duas apps independentes, Multi-Zones por rewrites, entrada pelo `store-app`, carrinho compartilhado por `localStorage` e build e contêiner próprios (#10 a #18). A conteinerização (#17) só fala da infraestrutura.

Sinais que enganam ou ficam de fora:
- O `basePath` do `cart-app` e os serviços do compose resolvem o destino do rewrite, mas são caminho e publicação, por isso estão nas observações de build e deploy, e não em configuração (ver Nota de #1).
- O `cart-app` também é publicado direto na porta 3001, em outra origem, onde não lê o carrinho gravado pelo `store-app` (#6, #7, #14).
- A navegação da loja para o carrinho é um link de página inteira (`<a href="/cart">`), não uma construção de composição.

Nada fica ambíguo no snapshot, e o histórico não teve ponto a esclarecer.

## Observações

### 1. store-app/next.config.ts:6-43

**Observação:** `output: "standalone"` (10), `images.remotePatterns` para `images.unsplash.com` e `fakestoreapi.com` (12-25) e `async rewrites()` (32-42), que devolve uma regra: `source: "/cart/:path*"` para `destination: "http://cart-app:3000/cart/:path*"` (36-39). O comentário do bloco diz "Configures the core of the Multi-Zone micro-frontend architecture" (27-28).

**Interpretação:** A configuração do host declara outra aplicação, o `cart-app`, como destino de um caminho sob a sua origem, com o endereço pelo qual a resolve.

**Nota:** `cart-app/next.config.ts:3-15`, citado nas mesmas tabelas, só declara `basePath: "/cart"`, `images` e `output: "standalone"`. O `basePath` é o caminho em que a zona é publicada, ou seja, deploy (dimensão 6), e está na observação #8. Os serviços de `docker-compose.yml:8-15, 20-28` declaram contexto de build, nome de contêiner e portas, também deploy (#8, #9); o endereço do destino está no rewrite, e o compose só dá o nome do serviço. Nenhum desses blocos virou observação de configuração.

### 2. store-app/next.config.ts:32

**Observação:** `async rewrites()` liga `/cart/:path*` a `http://cart-app:3000/cart/:path*` (36-39). A configuração é exportada como `nextConfig` (45).

**Interpretação:** O roteamento do host declara que o caminho `/cart` vai para a zona do carrinho.

**Nota:** É a linha manual da 3.4.4, que fica dentro do bloco de configuração de #1. Ela vira observação própria porque toda linha da 3.4.4 vira uma (passo 2). A força segue a orientação de uma rota que liga um caminho a outra unidade numa tabela de rotas.

### 3. store-app/src/store/cartStore.ts:83-84; store-app/src/store/cartStore.ts:26; store-app/src/store/cartStore.ts:38-55; store-app/src/components/ProductCart.tsx:17

**Observação:** O store zustand `useCartStore` é persistido com `persist` na chave `cart-storage` (`name: "cart-storage"`, 83), com `createJSONStorage(() => safeLocalStorage)` (84), que grava por `localStorage.setItem` (26). `addToCart` (38-55) grava o carrinho e é chamado pelo `ProductCard`.

**Interpretação:** O `store-app` grava o carrinho no `localStorage` sob uma chave fixa, o mecanismo de estado compartilhado. A leitura pelo `cart-app` está na relação #7.

### 4. cart-app; cart-app/package.json:7; cart-app/src/app/layout.tsx:20; cart-app/src/app/page.tsx:3; cart-app/next.config.ts:3-15

**Observação:** Tem manifesto, layout raiz do App Router (`RootLayout`), página `Home` e build `next build` próprios, com `basePath: "/cart"` e saída `standalone`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 5. store-app; store-app/package.json:7; store-app/src/app/layout.tsx:10; store-app/src/app/page.tsx; store-app/next.config.ts:6-43

**Observação:** Tem manifesto, layout raiz do App Router (`RootLayout`), rota `/` e build `next build` próprios, com saída `standalone` e `rewrites()` para `/cart`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 6. store-app/next.config.ts:32, 36-39; docker-compose.yml:20-24; cart-app/next.config.ts:4; cart-app/src/app/page.tsx:10

**Observação:** O `store-app` repassa `/cart/:path*` para `http://cart-app:3000/cart/:path*`. O hostname `cart-app` é o serviço do compose construído de `./cart-app`, com o contêiner na porta 3000. O prefixo `/cart` é o `basePath` do `cart-app`, cuja página `Home` monta o carrinho.

**Interpretação:** É uma relação ativa em que o `store-app` encaminha um caminho para a zona do carrinho, que responde com a página inteira.

### 7. store-app/src/store/cartStore.ts:83-84; store-app/src/components/ProductCart.tsx:17; cart-app/src/store/cartStore.ts:83-84; cart-app/src/components/CartDisplay.tsx:15; store-app/next.config.ts:36-39

**Observação:** O `store-app` grava o carrinho na chave `cart-storage` ao adicionar produtos. O `cart-app` declara o mesmo store na mesma chave e lê os itens em `CartDisplay` (`const { items, removeItem, updateQuantity } = useCartStore();`).

**Interpretação:** É uma relação ativa de estado compartilhado por `localStorage` entre o `store-app` e o `cart-app`, possível porque o rewrite põe o `cart-app` sob a origem do `store-app`. Acessado direto pela porta 3001, o `cart-app` fica em outra origem e não vê o mesmo estado.

### 8. cart-app/package.json:7; cart-app/next.config.ts:4, 14; cart-app/Dockerfile:22, 25-33; docker-compose.yml:20-28

**Observação:** `next build` gera um servidor `standalone` sob `basePath: "/cart"`. O Dockerfile roda o build e gera uma imagem só dele, que sobe com `node server.js` na porta 3000. O compose a sobe como serviço `cart-app`, construído de `./cart-app`, publicado na porta 3001 do host. `version: "0.1.0"` não é usado em publicação, e a app é `private`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 9. store-app/package.json:7; store-app/next.config.ts:10, 32-41; store-app/Dockerfile:22, 25-33; docker-compose.yml:8-15

**Observação:** `next build` gera um servidor `standalone` com o `rewrites()`. O Dockerfile roda o build e gera uma imagem só dele, servida na porta 3000. O compose a sobe como serviço `store-app`, construído de `./store-app`, sem `depends_on`. `version: "0.1.0"` sem uso e app `private`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. O artefato do `store-app` não contém código do `cart-app`, mas leva o endereço fixo do serviço dele.

### 10. README.md:3

**Observação:** "This project is a demonstration of a micro-frontend architecture for a simple e-commerce application".

**Interpretação:** Afirma uma arquitetura de micro-frontends, o que as duas unidades e as duas relações entre elas confirmam.

### 11. README.md:3

**Observação:** "It consists of two independent Next.js applications: a **Store** for Browse products and a **Cart** for managing the shopping cart, containerized with Docker".

**Interpretação:** Afirma duas apps independentes, cada uma em contêiner, o que a estrutura e o build e deploy por app confirmam.

### 12. README.md:7

**Observação:** "The application employs a **Multi-Zone** architecture".

**Interpretação:** Nomeia o padrão de composição do Next.js, o que a configuração do rewrite e a relação de rota confirmam.

### 13. README.md:9

**Observação:** "**Store App (Zone 1)**: The main application that runs on port `3000`. ... acts as the primary entry point for users."

**Interpretação:** Afirma o `store-app` como entrada, o que o deploy na porta 3000 e o encaminhamento de `/cart` confirmam.

### 14. README.md:10

**Observação:** "**Cart App (Zone 2)**: An independent application that runs on port `3001`."

**Interpretação:** Afirma o `cart-app` como app independente, o que a estrutura e o build e deploy próprios confirmam. A porta 3001 é a do script `dev` e a do host no compose.

### 15. README.md:12

**Observação:** "These two \"zones\" are seamlessly combined under a single domain using **Next.js Rewrites**. The Store App is configured to proxy all requests for the `/cart` path to the Cart App".

**Interpretação:** Afirma que o host encaminha um caminho para a outra zona sob o mesmo domínio, o que a linha do `rewrites()` e a relação de rota confirmam.

### 16. README.md:19

**Observação:** "`localStorage` is used to persist and share the cart state between the two independent applications."

**Interpretação:** Afirma estado compartilhado por `localStorage` entre as zonas, o que a gravação no `store-app` e a relação de estado confirmam. O que se compartilha é o estado; o código do store é uma cópia em cada zona.

### 17. README.md:20

**Observação:** "**Containerization**: Docker & Docker Compose for creating a reproducible production environment."

**Interpretação:** Fala da infraestrutura de contêineres, sem situar as unidades. O compose e os Dockerfiles das duas apps confirmam a afirmação, e o "production environment" é o que o compose monta, sem hospedagem no snapshot.

### 18. docker-compose.yml:19

**Observação:** Comentário do serviço `cart-app`: "It has its own build process and runs in a separate container."

**Interpretação:** Afirma build e contêiner próprios do `cart-app`, o que o build e deploy dele confirmam.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (store-app, Marcadores); 3.4.3 (store-app, Build); 3.4.4 (store-app/next.config.ts:32, Observação); 3.4.4 (store-app/src/store/cartStore.ts:83, Observação); 3.4.5 #1 (Configuração, Código); 3.4.6 #1 (Onde é servida); 3.4.6 #2 (Artefatos); 3.4.7 #3, #6 (Evidência) | 2 configuração | configuração | other | arquitetural | forte | configura #5; configura #6 |
| 2 | 3.4.4 (store-app/next.config.ts:32) | 3 código | configuração | other | arquitetural | forte | implementa #6 |
| 3 | 3.4.4 (store-app/src/store/cartStore.ts:83) | 3 código | código-fonte | other | tecnológica | moderada | implementa #7 |
| 4 | 3.4.3 (cart-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 5 | 3.4.3 (store-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 6 | 3.4.5 #1 | 5 composição | configuração | other | arquitetural | forte | liga #5; liga #4 |
| 7 | 3.4.5 #2 | 5 composição | código-fonte | other | arquitetural | forte | liga #5; liga #4 |
| 8 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #4 |
| 9 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #5 |
| 10 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #5; corrobora #6; corrobora #7 |
| 11 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #5; corrobora #8; corrobora #9 |
| 12 | 3.4.7 #3 | 7 documentação | documentação | other | tecnológica | fraca | corrobora #1; corrobora #6 |
| 13 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #6 |
| 14 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #8 |
| 15 | 3.4.7 #6 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #2; corrobora #6 |
| 16 | 3.4.7 #7 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #3; corrobora #7 |
| 17 | 3.4.7 #8 | 7 documentação | documentação | — | contexto | fraca | corrobora #8; corrobora #9 |
| 18 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #8 |

## Resumo

Observações: 18. Dimensões (tecnologia: 0, configuração: 1, código: 2, estrutura: 2, composição: 2, build-deploy: 2, documentação: 9, histórico: 0). Força (forte: 4, moderada: 5, fraca: 9, ambígua: 0). Evidência (tecnológica: 2, arquitetural: 15, contexto: 1).
