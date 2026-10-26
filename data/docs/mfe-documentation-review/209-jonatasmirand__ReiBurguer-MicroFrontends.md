---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Leitura do repositório

A documentação está em português, num único texto sobre o projeto: o `README.md` da raiz (94 linhas). O `artifacts.csv` marca também `cardapio/README.md` como `documentation`, mas ele é o README padrão do create-next-app (cardapio/README.md:1), com instruções de `npm run dev`, a porta 3000 e a seção genérica "Deploy on Vercel" (cardapio/README.md:36-40). Não diz nada sobre este projeto e não virou linha. Todas as ocorrências `doc-*` estão no README da raiz.

O README descreve um projeto de aprendizado com três microfrontends Next.js ligados por Module Federation (`nextjs-mf`): `container` como host e `cardapio` e `pedido` como remotes (README.md:4-15). O host carrega os dois com `dynamic()` (README.md:30-32), e o cardápio fala com o pedido por Custom Events do navegador (README.md:34-42). Isso confere com as revisões anteriores: três unidades em pastas irmãs, sem workspace (3.4.3), `@module-federation/nextjs-mf` configurado nas três (3.4.2), duas relações `host → remote` e uma de `communication` por eventos (3.4.5 #1-3). Nenhuma afirmação é contradita. A única que fica sem artefato é a da hospedagem na Vercel (afirmação 11). O deploy separado só se confirma na parte do build (afirmação 10), porque o snapshot não tem nenhum artefato de deploy (3.4.6, Leitura).

Blocos de código que reproduzem arquivos-fonte não viraram linha, e os quatro conferem com o snapshot. O botão do cardápio (README.md:45-58) é cardapio/src/components/Cardapio.jsx:30-43. O `useEffect` do pedido (README.md:62-71) é pedido/src/_components/Pedido.jsx:7-16. O `exposes` (README.md:78-81) é cardapio/next.config.js:10-12, e não o cardapio/next.config.mjs:12-14, que aponta para `./src/_components/Cardapio.jsx`, ausente do snapshot (3.4.2, Notas). O `dynamic(() => import("cardapio/Cardapio"), { ssr: false })` (README.md:85) é container/src/pages/index.js:5. Também ficaram de fora os comandos `npm install` e `npm run dev` (README.md:21-27).

Ocorrências `doc-*` que não viraram linha própria: o título "ReiBurguer – Micro Frontends + Module Federation" (README.md:2, `doc-mfe-term` e `doc-integration-technology`) e o título de seção "🔧 Module Federation" (README.md:74, `doc-integration-technology`). Também ficou de fora o passo "Rodando cada microfrontend individualmente - Em cada repositório" (README.md:24, `doc-mfe-term`), que é instrução de execução. Ele vem logo depois do aviso de que é preciso executar os três (README.md:18), e "individualmente" quer dizer cada um no seu diretório. Esse sentido de independência está na afirmação 2. "Em cada repositório" (README.md:20 e :24) trata cada pasta como repositório. No snapshot, as três são pastas de um mesmo repositório, cada uma com `package.json` e `package-lock.json` próprios (3.4.3, Notas), e o texto foi lido como uso solto da palavra, sem virar afirmação. O aviso "Não usar Next.js > 15, pois o MF não é suportado" (README.md:6) é uma restrição de instalação sobre uma ferramenta externa. Ele condiz com o `next` `^14.2.33` dos três `package.json` (por exemplo container/package.json:13) e não virou linha. As outras ocorrências estão nos parágrafos das afirmações: README.md:4, :7, :10 (afirmação 1); :12 e :89 (afirmação 2); :18 e :94 (afirmação 4); :32 (afirmação 5); :42 (afirmação 8); :89 (afirmação 10); :94 (afirmação 11). As descrições funcionais "Exibe os itens do menu" (README.md:35) e "Atualiza a lista de pedidos em tempo real" (README.md:40) são de negócio ou internas da unidade.

Comentários e campos lidos: os `next.config` das três unidades (container/next.config.mjs; cardapio/next.config.js; cardapio/next.config.mjs; pedido/next.config.mjs) só têm a anotação de tipo JSDoc na linha 3 dos `.mjs`. O código de composição (container/src/pages/index.js) tem um único comentário, "// Importação dinâmica" (container/src/pages/index.js:4), que repete a afirmação 5. Os `package.json` não têm `description`. O `name` do lockfile vazio da raiz, "ReiBurguer - MicroFrontends" (package-lock.json:2), não faz afirmação.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:4 | "Projeto para testar aprendizado com Modulate Federation incluindo três Micro Frontends dividos em (container, cardápio e pedido)" | composição | corroborada | 3.4.2 (três linhas `module-federation`); 3.4.3 Resumo; 3.4.5 #1-2 |
| 2 | README.md:12 | "Ele contém três aplicações independentes, que se comunicam entre si" | independência | corroborada | 3.4.3 (entradas e builds próprios); 3.4.6 #1-3; cardapio/src/pages/index.js:14-17; pedido/src/pages/index.js:15-18; 3.4.5 #1-3 |
| 3 | README.md:13-15 | "/container → Host principal" / "/cardapio → Remote 1" / "/pedido → Remote 2" | estrutura | corroborada | 3.4.3 Resumo; 3.4.5 #1-2; container/next.config.mjs:12-15; cardapio/next.config.js:10-12; pedido/next.config.mjs:12-14 |
| 4 | README.md:18 | "é necessário baixar e executar os três microfrontends, pois o Container consome os remotes via localhost" | composição | corroborada | 3.4.5 #1-2; container/next.config.mjs:13-14; 3.4.6 Leitura |
| 5 | README.md:31-32 | "Carrega dinamicamente os remotes Cardápio e Pedido." / "Usa dynamic() + Module Federation." | composição | corroborada | 3.4.4 src-remote-import (container/src/pages/index.js:5-6); 3.4.5 #1-2; container/src/pages/index.js:20, :25 |
| 6 | README.md:36 | "Envia eventos globais ao adicionar itens ao pedido." | composição | corroborada | 3.4.4 src-cross-unit-communication (cardapio/src/components/Cardapio.jsx:32-33); 3.4.5 #3 |
| 7 | README.md:39 | "Escuta eventos enviados pelo Cardápio." | composição | corroborada | 3.4.4 src-cross-unit-communication (pedido/src/_components/Pedido.jsx:13); 3.4.5 #3 |
| 8 | README.md:42 | "A comunicação é feita via Custom Events do navegador, permitindo comunicação desacoplada entre aplicações separadas." | composição | corroborada | 3.4.5 #3; cardapio/src/components/Cardapio.jsx:32-38; pedido/src/_components/Pedido.jsx:13 |
| 9 | README.md:75-76 | "O mesmo vale para o micro Pedido." / "Cardápio expõe componentes assim:" | composição | corroborada | 3.4.2; 3.4.5 #1-2; cardapio/next.config.js:10-12; pedido/next.config.mjs:12-14 |
| 10 | README.md:89 | "Cada microfrontend pode ser desenvolvido e deployado separadamente." | build-deploy | parcial | 3.4.6 #1-3; cardapio/package.json:7; container/package.json:7; pedido/package.json:7 |
| 11 | README.md:94 | "o projeto pode ser hospedado em Vercel da vida ou semelhantes." | build-deploy | sem corroboração | — |

## Observações

**1. README.md:4.** A frase diz que o projeto usa Module Federation e tem três microfrontends, `container`, `cardapio` e `pedido`. A revisão estrutural acha exatamente essas três unidades (3.4.3 Resumo), e a de dependências registra `@module-federation/nextjs-mf` configurado nas três (3.4.2). As duas relações de composição são por `module-federation` (3.4.5 #1-2). "Modulate Federation" foi lido como erro de grafia de Module Federation, e não como outra tecnologia: não existe tecnologia com esse nome, e o próprio README escreve "Module Federation" no título e na lista de tecnologias (README.md:2, :10). A mesma afirmação se repete em "Este repositório implementa uma arquitetura de Microfrontends, utilizando: [...] Module Federation (nextjs-mf)" (README.md:7-10), que nomeia o pacote registrado em 3.4.2. O Tema é `composição` porque a primeira propriedade da frase é a tecnologia.

**2. README.md:12.** "Aplicações independentes" se confirma no que os artefatos mostram de cada unidade: `package.json`, lockfile, entrada pelo Pages Router e `next build` próprios (3.4.3), e build `separado` nas três (3.4.6 #1-3). Os dois remotes também montam o próprio componente na rota `/` quando rodam sozinhos (cardapio/src/pages/index.js:14-17; pedido/src/pages/index.js:15-18). O container sobe sozinho, mas a página dele precisa dos remotes no ar, como diz a afirmação 4. "Que se comunicam entre si" vale para as três: o container se liga a cada remote por Module Federation, e o cardápio ao pedido por eventos (3.4.5 #1-3). "Cada microfrontend pode ser desenvolvido [...] separadamente" (README.md:89) repete a parte de desenvolvimento da afirmação. A parte de deploy da mesma frase é a afirmação 10.

**3. README.md:13-15.** Os papéis conferem com a configuração. O `container` declara os remotes `pedido` e `cardapio` (container/next.config.mjs:12-15). O `cardapio` e o `pedido` expõem um módulo cada (cardapio/next.config.js:10-12; pedido/next.config.mjs:12-14). As duas relações `host → remote` têm o container como origem (3.4.5 #1-2). Os caminhos `/container`, `/cardapio` e `/pedido` são as pastas das unidades (3.4.3). "Host principal" (README.md:30) repete o papel do container. O container também declara `filename: 'static/chunks/remoteEntry.js'` sem expor nada (container/next.config.mjs:11; 3.4.5, Leitura), o que não muda o papel de host.

**4. README.md:18.** O host aponta os dois remotes para `http://localhost:3002` e `http://localhost:3001` (container/next.config.mjs:13-14), sem variável para outro endereço (3.4.6, Leitura). Por isso os três precisam estar rodando para a página do container carregar os remotes (3.4.5 #1-2). As portas batem com os scripts `dev` dos remotes (cardapio/package.json:6; pedido/package.json:6). README.md:94 ("O Container consome os remotes via localhost") repete a afirmação. O "baixar" da frase, como o "Em cada repositório" dos passos seguintes, trata as unidades como repositórios separados, e no snapshot elas estão no mesmo (ver Leitura).

**5. README.md:31-32.** O container importa `cardapio/Cardapio` e `pedido/Pedido` com `next/dynamic` e `ssr: false` (container/src/pages/index.js:5-6), resolvidos pelos remotes do plugin de federação. São as duas construções `src-remote-import` de 3.4.4 e as relações #1-2 de 3.4.5. Os componentes são montados na rota `/` (container/src/pages/index.js:20, :25). Repetem a afirmação "O Container importa dinamicamente" com o bloco de código (README.md:83-85), "O Container carrega tudo em tempo real como uma aplicacao 'normal'" (README.md:90) e o comentário "// Importação dinâmica" (container/src/pages/index.js:4).

**6. README.md:36.** O botão de cada prato dispara `adicionarCarrinho` com nome e preço por `window.top.dispatchEvent` (cardapio/src/components/Cardapio.jsx:30-40), construção marcada com composição em 3.4.4 e origem da relação #3 de 3.4.5. "Globais" corresponde ao `window` da página do container, onde os dois remotes estão montados juntos (3.4.4, Notas). Há ainda a função `adicionarPedido`, que dispara outro evento (cardapio/src/components/Cardapio.jsx:5-8). Ela nunca é chamada, não tem ouvinte e foi marcada `No` em 3.4.4. A afirmação vale pelo evento do botão.

**7. README.md:39.** O pedido registra `window.addEventListener("adicionarCarrinho", handler)` no `useEffect` (pedido/src/_components/Pedido.jsx:7-16) e acrescenta `e.detail` aos itens. É o evento que o cardápio emite (afirmação 6), e esse é o destino da relação #3 (3.4.5). O "Atualiza a lista de pedidos em tempo real" da linha seguinte (README.md:40) é comportamento interno da unidade.

**8. README.md:42.** O mecanismo da comunicação entre microfrontends é `CustomEvent` no `window` do navegador (cardapio/src/components/Cardapio.jsx:32-38; pedido/src/_components/Pedido.jsx:13), registrado como `events` em 3.4.5 #3. É desacoplada no sentido de que as duas unidades não se importam: só compartilham o nome do evento e o formato de `detail`, e não há configuração própria do canal (3.4.5 #3). O canal só existe na página do container, que monta as duas unidades juntas. Cada remote, rodando sozinho, não recebe nem envia para o outro. "Comunicação leve, rápida e desacoplada (se bem configurada)" (README.md:91) repete o "desacoplada"; "leve" e "rápida" não são verificáveis no snapshot.

**9. README.md:75-76.** O cardápio expõe `./Cardapio` (cardapio/next.config.js:10-12), e "o mesmo vale" para o pedido, que expõe `./Pedido` (pedido/next.config.mjs:12-14). As duas chaves são as que o container consome (container/src/pages/index.js:5-6; 3.4.5 #1-2). O exemplo do README reproduz o `next.config.js` do cardápio, que é o carregado pelo Next 14 (3.4.2, Notas; 3.4.3, Notas). O `next.config.mjs` do cardápio expõe a mesma chave com um caminho que não existe (cardapio/next.config.mjs:13), o que não altera a afirmação.

**10. README.md:89.** A frase fala de desenvolvimento e de deploy separados. A parte de desenvolvimento repete a afirmação 2. A de deploy é `parcial`: cada aplicação tem build e `next start` próprios, sem script ou configuração que as junte (cardapio/package.json:7-8; container/package.json:7-8; pedido/package.json:7-8; 3.4.6 #1-3, Build `separado`). Mas o snapshot não tem nenhum artefato de deploy, e as três ficam `não observado` (3.4.6, Resumo). O host ainda embute os endereços `localhost` dos remotes no build (container/next.config.mjs:13-14; 3.4.6 #2). Assim, implantar um remote em outro endereço exigiria mudar e reconstruir o container.

**11. README.md:94.** Sugere hospedar o projeto na Vercel ou em serviço parecido "para melhor usabilidade". Não há `vercel.json` nem outro artefato de hospedagem no snapshot (3.4.3, Notas; 3.4.6, Leitura), e nada o contradiz, porque a frase fala de uma possibilidade. Para hospedar fora da máquina local, seria preciso trocar as URLs `localhost` fixas do host (container/next.config.mjs:13-14) e a origem das imagens do cardápio (cardapio/src/components/Cardapio.jsx:21). A homepage na Vercel citada pela classificação é metadado, não artefato do snapshot (3.4.3, Notas). A seção "Deploy on Vercel" de cardapio/README.md:36-40 é texto do template (ver Leitura).

## Resumo

Afirmações: 11 (corroborada: 9, parcial: 1, contradita: 0, sem corroboração: 1). Temas: (estrutura: 1, composição: 7, build-deploy: 2, independência: 1).
