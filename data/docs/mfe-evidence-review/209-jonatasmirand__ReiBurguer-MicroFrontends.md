---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Leitura do repositório

Projeto de aprendizado com três aplicações Next.js (Pages Router) em pastas irmãs, sem workspace: `container` é o host, e `cardapio` e `pedido` são remotes. As três declaram `@module-federation/nextjs-mf` (#1 a #3) e o usam pelo `NextFederationPlugin` dentro de `webpack(config)`.

A cadeia que sustenta a arquitetura é a do Module Federation:
- **Estrutura:** as três apps têm manifesto, entrada pelo Pages Router e `next build` próprios (#17 a #19).
- **Configuração:** o host declara os remotes `pedido` e `cardapio` com URLs `localhost` fixas (#5). Os remotes se dão os nomes `cardapio` e `pedido` e expõem `./Cardapio` e `./Pedido` (#4, #6).
- **Código:** o host importa `cardapio/Cardapio` e `pedido/Pedido` com `next/dynamic` e `ssr: false` (#8, #9) e renderiza os dois na página `/` (#15, #16).
- **Relações:** isso resulta nas duas relações ativas host → remote (#20, #21).

A segunda ligação é entre os remotes: o botão de cada prato do cardápio dispara o `CustomEvent` `adicionarCarrinho` no `window` (#12, #13), e o pedido o escuta (#14). Isso dá a relação ativa cardapio → pedido (#22), que só existe porque o container monta os dois componentes na mesma página.

Build é separado por app (#23 a #25), mas não há nenhum artefato de deploy, e o host embute os endereços `localhost` dos remotes no build. O histórico mostra que o repositório nunca teve artefato de deploy (#39).

Sinais que enganam ou ficam de fora:
- `cardapio` tem um segundo arquivo de configuração, `next.config.mjs`, que expõe `./src/_components/Cardapio.jsx`, ausente do snapshot (#7). O Next 14 carrega o `next.config.js` (#4), e o histórico não diz de onde veio o `.mjs` (#37).
- A função `adicionarPedido` do cardápio dispara outro evento, nunca é chamada e não tem ouvinte (#10, #11). O histórico não diz se foi abandonada ou nunca conectada (#38).

A documentação, num único README, confirma a forma geral: três microfrontends ligados por Module Federation, host e remotes, carga com `dynamic()` e comunicação por Custom Events (#26 a #34). O deploy separado se confirma só na parte do build (#35), e a hospedagem na Vercel não tem artefato (#36).

Nada fica ambíguo no snapshot.

## Observações

### 1. cardapio/package.json:12

**Observação:** `@module-federation/nextjs-mf` (`^8.8.47`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do cardapio.

### 2. container/package.json:12

**Observação:** `@module-federation/nextjs-mf` (`^8.8.47`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do container.

### 3. pedido/package.json:12

**Observação:** `@module-federation/nextjs-mf` (`^8.8.47`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do pedido.

### 4. cardapio/next.config.js:1, 7-17

**Observação:** O `next.config.js` faz `require("@module-federation/nextjs-mf")` e, em `webpack(config)`, acrescenta `new NextFederationPlugin({ name: "cardapio", filename: "static/chunks/remoteEntry.js", exposes: { "./Cardapio": "./src/components/Cardapio.jsx" }, shared: { react: { singleton: true }, "react-dom": { singleton: true } } })`.

**Interpretação:** A configuração do remote cardapio dá a ele o nome pelo qual o host o resolve, expõe o componente do cardápio e compartilha o React como singleton.

### 5. container/next.config.mjs:1, 9-26

**Observação:** O `next.config.mjs` importa `NextFederationPlugin` e o invoca em `webpack(config)` com `name: 'container'`, `filename: 'static/chunks/remoteEntry.js'`, `remotes: { pedido: 'pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js', cardapio: 'cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js' }` e `react` e `react-dom` compartilhados como singleton, com `requiredVersion: false`. Não há `exposes`.

**Interpretação:** A configuração do host declara os dois remotes, com os nomes que eles se dão (#4, #6) e o endereço local de cada um.

### 6. pedido/next.config.mjs:1, 9-25

**Observação:** O `next.config.mjs` importa `NextFederationPlugin` e o invoca em `webpack(config)` com `name: 'pedido'`, `filename: 'static/chunks/remoteEntry.js'`, `exposes: { './Pedido': './src/_components/Pedido.jsx' }` e `react` e `react-dom` compartilhados como singleton, com `requiredVersion: false`.

**Interpretação:** A configuração do remote pedido dá a ele o nome pelo qual o host o resolve e expõe o componente do pedido.

### 7. cardapio/next.config.mjs:1, 9-25

**Observação:** Um segundo arquivo de configuração do cardapio importa `NextFederationPlugin` e o invoca com `name: 'cardapio'`, `filename: 'static/chunks/remoteEntry.js'`, `exposes: { './Cardapio': './src/_components/Cardapio.jsx' }` e o mesmo `shared` do pedido. `cardapio/src/_components/Cardapio.jsx` não existe no snapshot; o componente está em `src/components`.

**Interpretação:** É uma configuração de federação do cardapio que não é a carregada pelo build, e cujo módulo exposto aponta para um caminho inexistente.

**Nota:** A orientação para a configuração do mecanismo numa unidade é `moderada`. A força é `fraca` porque, como registram as revisões de dependências e de estrutura (3.4.2, Notas; 3.4.3, Notas), o Next 14 carrega o `next.config.js` (#4) com precedência, e este arquivo não é usado pelo build: é uma construção que não participa da composição. Pela mesma razão, a linha não tem relação `configura`. O arquivo só aparece na coluna Marcadores da 3.4.3, sem linhas, e o bloco é a configuração inteira da unidade.

### 8. container/src/pages/index.js:5

**Observação:** `const Cardapio = dynamic(() => import("cardapio/Cardapio"), { ssr: false });`, abaixo do comentário `// Importação dinâmica` (linha 4).

**Interpretação:** O host carrega, só no cliente, o módulo `./Cardapio` do remote `cardapio`.

### 9. container/src/pages/index.js:6

**Observação:** `const Pedido = dynamic(() => import("pedido/Pedido"), { ssr: false });`.

**Interpretação:** O host carrega, só no cliente, o módulo `./Pedido` do remote `pedido`.

### 10. cardapio/src/components/Cardapio.jsx:6

**Observação:** `new CustomEvent('adicionarPedido', { detail: item })` dentro da função `adicionarPedido` (linhas 5-8). A função não é chamada no arquivo, e nenhum arquivo de código escuta `adicionarPedido`.

**Interpretação:** Um evento de comunicação é preparado, mas não chega a nenhuma unidade.

### 11. cardapio/src/components/Cardapio.jsx:7

**Observação:** `window.dispatchEvent(event)` da mesma função `adicionarPedido`, não chamada (linhas 5-8).

**Interpretação:** O disparo existe, mas não está conectado a nenhuma unidade.

### 12. cardapio/src/components/Cardapio.jsx:32; cardapio/src/components/Cardapio.jsx:30-40

**Observação:** `window.top.dispatchEvent(...)` no `onClick` do botão `+` de cada prato.

**Interpretação:** O cardápio emite um evento global quando o usuário adiciona um prato. O ouvinte está em #14.

### 13. cardapio/src/components/Cardapio.jsx:33; cardapio/src/components/Cardapio.jsx:33-38

**Observação:** `new CustomEvent("adicionarCarrinho", { detail: { nome: prato.nome, preco: Number(prato.preco) } })`, o evento disparado na linha 32.

**Interpretação:** É a mensagem que o cardápio envia, com o nome do evento e o formato de `detail` que o pedido espera (#14).

### 14. pedido/src/_components/Pedido.jsx:13; pedido/src/_components/Pedido.jsx:7-16

**Observação:** `window.addEventListener("adicionarCarrinho", handler)` no `useEffect` de `Pedido`. O `handler` acrescenta `e.detail` aos itens, e o retorno remove o ouvinte.

**Interpretação:** O pedido recebe o evento que o cardápio emite (#12, #13) e atualiza a própria lista.

### 15. container/src/pages/index.js:20; container/src/pages/index.js:8-29

**Observação:** `<Cardapio />` na página `Home` (`export default function Home`), abaixo do logo. O componente vem do `dynamic` da linha 5.

**Interpretação:** O host renderiza o componente federado do cardápio na sua página `/`.

### 16. container/src/pages/index.js:25; container/src/pages/index.js:24-26

**Observação:** `<Pedido />` dentro de `<div className={styles.section}>`, abaixo do cardápio. O componente vem do `dynamic` da linha 6.

**Interpretação:** O host renderiza o componente federado do pedido na mesma página.

### 17. cardapio; cardapio/package.json:1-22; cardapio/src/pages/_app.js:3; cardapio/src/pages/index.js:14; cardapio/next.config.js:3-21; cardapio/package.json:7

**Observação:** Tem manifesto, `App` do Pages Router, rota `/` e build `next build` próprios, com o `next.config.js` que carrega o `NextFederationPlugin`. Tem também um `next.config.mjs` (#7).

**Interpretação:** É uma unidade frontend com limite próprio, o remote `cardapio`.

### 18. container; container/package.json:1-22; container/src/pages/_app.js:3; container/src/pages/index.js:8; container/next.config.mjs:4-32; container/package.json:7

**Observação:** Tem manifesto, `App` do Pages Router, rota `/` e build `next build` próprios, com o `next.config.mjs` que carrega o `NextFederationPlugin`.

**Interpretação:** É uma unidade frontend com limite próprio, o host.

### 19. pedido; pedido/package.json:1-22; pedido/src/pages/_app.js:3; pedido/src/pages/index.js:15; pedido/next.config.mjs:4-31; pedido/package.json:7

**Observação:** Tem manifesto, `App` do Pages Router, rota `/` e build `next build` próprios, com o `next.config.mjs` que carrega o `NextFederationPlugin`.

**Interpretação:** É uma unidade frontend com limite próprio, o remote `pedido`.

### 20. container/src/pages/index.js:5; container/src/pages/index.js:20; container/next.config.mjs:14; cardapio/next.config.js:8-11

**Observação:** O import `cardapio/Cardapio` usa o remote `cardapio` do host, `cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js`. O remote se chama `cardapio` e expõe `./Cardapio`. O componente é renderizado na página `/` do host.

**Interpretação:** É uma relação ativa host → remote em que o container monta o cardápio por Module Federation.

### 21. container/src/pages/index.js:6; container/src/pages/index.js:25; container/next.config.mjs:13; pedido/next.config.mjs:10-13

**Observação:** O import `pedido/Pedido` usa o remote `pedido` do host, `pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js`. O remote se chama `pedido` e expõe `./Pedido`. O componente é renderizado dentro de `styles.section`, na mesma página.

**Interpretação:** É uma relação ativa host → remote em que o container monta o pedido por Module Federation.

### 22. cardapio/src/components/Cardapio.jsx:32-38; pedido/src/_components/Pedido.jsx:13; container/src/pages/index.js:20, 25

**Observação:** O cardápio envia `adicionarCarrinho` por `window.top.dispatchEvent`, e o pedido o recebe por `window.addEventListener`. Não há envio no sentido inverso nem configuração própria do canal. Os dois componentes são montados na mesma página do container, sem iframe.

**Interpretação:** É uma relação ativa de comunicação por eventos do cardápio para o pedido. O canal depende de o host montar os dois juntos: cada remote, rodando sozinho, não fala com o outro.

### 23. cardapio/package.json:7; cardapio/next.config.js:5-20

**Observação:** `next build` na pasta do app, com a própria configuração, que gera `static/chunks/remoteEntry.js`. Não há artefato de deploy. O único endereço é o de desenvolvimento que o host espera, `http://localhost:3001` (container/next.config.mjs:14; cardapio/package.json:6). O pacote é `private`, na versão `0.1.0`, não usada para publicar.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado e sem versionamento independente.

### 24. container/package.json:7; container/next.config.mjs:7-29

**Observação:** `next build` na pasta do app, com a configuração de host, que embute os endereços `localhost` dos remotes. Não há artefato de deploy, e nenhum endereço do snapshot diz onde o container é servido. O pacote é `private`, na versão `0.1.0`.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado e sem versionamento independente. Mudar o endereço de um remote exige reconstruir o host.

### 25. pedido/package.json:7; pedido/next.config.mjs:7-29

**Observação:** `next build` na pasta do app, com a própria configuração, que gera `static/chunks/remoteEntry.js`. Não há artefato de deploy. O único endereço é o de desenvolvimento que o host espera, `http://localhost:3002` (container/next.config.mjs:13; pedido/package.json:6). O pacote é `private`, na versão `0.1.0`.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado e sem versionamento independente.

### 26. README.md:4

**Observação:** "Projeto para testar aprendizado com Modulate Federation incluindo três Micro Frontends dividos em (container, cardápio e pedido)".

**Interpretação:** Afirma três microfrontends ligados por Module Federation ("Modulate" lido como erro de grafia). As três unidades, a dependência configurada nas três e as relações host → remote confirmam a afirmação.

### 27. README.md:12

**Observação:** "Ele contém três aplicações independentes, que se comunicam entre si".

**Interpretação:** Afirma unidades independentes e ligadas. A estrutura e o build por app confirmam a independência, e as três relações confirmam a comunicação.

### 28. README.md:13-15

**Observação:** "/container → Host principal" / "/cardapio → Remote 1" / "/pedido → Remote 2".

**Interpretação:** Afirma os papéis de host e de remotes de cada pasta, o que a configuração do host, a dos remotes e as relações host → remote confirmam.

### 29. README.md:18

**Observação:** "é necessário baixar e executar os três microfrontends, pois o Container consome os remotes via localhost".

**Interpretação:** Afirma que o host depende dos remotes no ar em endereços locais. As URLs `localhost` fixas do host e as relações host → remote confirmam a afirmação.

### 30. README.md:31-32

**Observação:** "Carrega dinamicamente os remotes Cardápio e Pedido." / "Usa dynamic() + Module Federation."

**Interpretação:** Afirma a carga dinâmica dos remotes pelo host, o que os dois `dynamic(() => import(...))` e a renderização na página confirmam.

### 31. README.md:36

**Observação:** "Envia eventos globais ao adicionar itens ao pedido." (seção do Cardápio)

**Interpretação:** Afirma que o cardápio emite eventos para o pedido, o que o disparo do botão confirma.

### 32. README.md:39

**Observação:** "Escuta eventos enviados pelo Cardápio." (seção do Pedido)

**Interpretação:** Afirma que o pedido recebe os eventos do cardápio, o que o ouvinte do pedido e a relação de comunicação confirmam.

### 33. README.md:42

**Observação:** "A comunicação é feita via Custom Events do navegador, permitindo comunicação desacoplada entre aplicações separadas."

**Interpretação:** Afirma o mecanismo de comunicação entre as unidades. O `CustomEvent` no `window`, sem import entre as unidades, confirma a afirmação.

### 34. README.md:75-76

**Observação:** "O mesmo vale para o micro Pedido." / "Cardápio expõe componentes assim:", seguido do bloco `exposes` do `next.config.js` do cardápio.

**Interpretação:** Afirma que cada remote expõe um componente pela configuração de federação, o que as configurações do cardápio e do pedido confirmam.

### 35. README.md:89

**Observação:** "Cada microfrontend pode ser desenvolvido e deployado separadamente."

**Interpretação:** Afirma desenvolvimento e deploy separados. O build por app confirma a parte que o snapshot mostra; não há artefato de deploy, e o host embute os endereços dos remotes. A afirmação se confirma em parte.

### 36. README.md:94

**Observação:** "o projeto pode ser hospedado em Vercel da vida ou semelhantes."

**Interpretação:** Sugere um serviço externo de hospedagem para o projeto como um todo. Não há artefato de hospedagem no snapshot, nem nada que o contradiga, porque a frase fala de uma possibilidade.

### 37. 8e7f1d9 2025-12-14 (cardapio, gitlink); 682204a 2025-12-16 (cardapio, gitlink); b7c02c3 2025-12-16 (cardapio/next.config.js, cardapio/next.config.mjs)

**Observação:** `cardapio` entra como gitlink para um sub-repositório (8e7f1d9, 682204a), cujos commits não estão no clone. Os dois `next.config` entram juntos em b7c02c3, com os mesmos objetos do snapshot, e nenhum commit posterior os toca. Nenhum commit cria `cardapio/src/_components`.

**Interpretação:** No repositório, os dois arquivos chegam juntos e já em conflito. O histórico não diz se pertencem a estágios diferentes. O ponto está inconclusivo, mas só sobre o passado: no snapshot, o carregado é o `next.config.js`.

### 38. b7c02c3 2025-12-16 (cardapio/src/components/Cardapio.jsx)

**Observação:** `Cardapio.jsx` entra em b7c02c3 com o mesmo objeto do snapshot e não muda depois. Em nenhuma versão vista a função `adicionarPedido` é chamada, e nenhuma chamada é removida.

**Interpretação:** O histórico não diz se a função foi abandonada ou nunca conectada, porque o passado dela estaria no sub-repositório. O ponto está inconclusivo, mas só sobre o passado: no snapshot, a função não está conectada.

### 39. 8e7f1d9 2025-12-14; 670f5e2 2025-12-14; 682204a 2025-12-16; b7c02c3 2025-12-16; 268d79a 2026-01-04 (README.md)

**Observação:** Nenhum dos cinco commits cria ou remove Dockerfile, compose, `vercel.json`, `netlify.toml`, workflow de CI ou outra configuração de hospedagem, nem os arquivos que b7c02c3 traz do sub-repositório do cardápio.

**Interpretação:** A falta de artefato de deploy não é resto de um estágio abandonado: o repositório nunca teve um. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (cardapio/package.json:12) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (container/package.json:12) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (pedido/package.json:12) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (cardapio/package.json:12, Evidência); 3.4.3 (cardapio, Marcadores e Build); 3.4.4 (container/src/pages/index.js:5, cardapio/src/components/Cardapio.jsx:32, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #3, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #20 |
| 5 | 3.4.2 (container/package.json:12, Evidência); 3.4.3 (container, Marcadores e Build); 3.4.4 (container/src/pages/index.js:5, container/src/pages/index.js:6, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #3 (Onde é servida); 3.4.6 #2 (Artefatos); 3.4.7 #3, #4 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #18; configura #20; configura #21 |
| 6 | 3.4.2 (pedido/package.json:12, Evidência); 3.4.3 (pedido, Marcadores e Build); 3.4.4 (container/src/pages/index.js:6, pedido/src/_components/Pedido.jsx:13, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #3, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #19; configura #21 |
| 7 | 3.4.3 (cardapio, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | fraca | — |
| 8 | 3.4.4 (container/src/pages/index.js:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 9 | 3.4.4 (container/src/pages/index.js:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21 |
| 10 | 3.4.4 (cardapio/src/components/Cardapio.jsx:6) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 11 | 3.4.4 (cardapio/src/components/Cardapio.jsx:7) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 12 | 3.4.4 (cardapio/src/components/Cardapio.jsx:32) | 3 código | código-fonte | events | tecnológica | moderada | implementa #22 |
| 13 | 3.4.4 (cardapio/src/components/Cardapio.jsx:33) | 3 código | código-fonte | events | tecnológica | moderada | implementa #22 |
| 14 | 3.4.4 (pedido/src/_components/Pedido.jsx:13) | 3 código | código-fonte | events | tecnológica | moderada | implementa #22 |
| 15 | 3.4.4 (container/src/pages/index.js:20) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #20 |
| 16 | 3.4.4 (container/src/pages/index.js:25) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #21 |
| 17 | 3.4.3 (cardapio) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (pedido) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #18; liga #17 |
| 21 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #18; liga #19 |
| 22 | 3.4.5 #3 | 5 composição | código-fonte | events | arquitetural | forte | liga #17; liga #19 |
| 23 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #17 |
| 24 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #18 |
| 25 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #19 |
| 26 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #1; corrobora #2; corrobora #3; corrobora #20; corrobora #21 |
| 27 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #23; corrobora #24; corrobora #25; corrobora #20; corrobora #21; corrobora #22 |
| 28 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #21; corrobora #5; corrobora #4; corrobora #6 |
| 29 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #20; corrobora #21; corrobora #5 |
| 30 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #20; corrobora #21; corrobora #15; corrobora #16 |
| 31 | 3.4.7 #6 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #22 |
| 32 | 3.4.7 #7 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #14; corrobora #22 |
| 33 | 3.4.7 #8 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #22; corrobora #12; corrobora #13; corrobora #14 |
| 34 | 3.4.7 #9 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #4; corrobora #6 |
| 35 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #23; corrobora em parte #24; corrobora em parte #25 |
| 36 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | — |
| 37 | 3.4.8 #1 | 8 histórico | histórico | — | tecnológica | fraca | explica #4; explica #7 |
| 38 | 3.4.8 #2 | 8 histórico | histórico | — | tecnológica | fraca | explica #10; explica #11 |
| 39 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #35; explica #23; explica #24; explica #25 |

## Resumo

Observações: 39. Dimensões (tecnologia: 3, configuração: 4, código: 9, estrutura: 3, composição: 3, build-deploy: 3, documentação: 11, histórico: 3). Força (forte: 6, moderada: 13, fraca: 20, ambígua: 0). Evidência (tecnológica: 14, arquitetural: 24, contexto: 1).
