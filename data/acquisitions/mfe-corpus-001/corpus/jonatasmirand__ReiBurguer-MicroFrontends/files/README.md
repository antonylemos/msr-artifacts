
# 🍔 ReiBurguer – Micro Frontends + Module Federation 

Projeto para testar aprendizado com Modulate Federation incluindo três Micro Frontends dividos em (container, cardápio e pedido) 

> ⚠️ Não usar Next.js > 15, pois o MF não é suportado.
Este repositório implementa uma arquitetura de Microfrontends, utilizando:
- Next.js 14
- React 18
- Module Federation (nextjs-mf)

Ele contém três aplicações independentes, que se comunicam entre si: 
- /container → Host principal
- /cardapio → Remote 1
- /pedido → Remote 2
---
## 🚀 Como rodar o projeto 
> ⚠️ Importante: Para rodar o projeto localmente, é necessário baixar e executar os três microfrontends, pois o Container consome os remotes via localhost.

### 1️. Instale as dependências - Em cada repositório:
```sh
npm install
```
### 2️. Rodando cada microfrontend individualmente - Em cada repositório:
```sh
npm run dev
```
--- 
## 🚀 O que cada aplicacao faz? 
✔ Host principal. 
- Carrega dinamicamente os remotes Cardápio e Pedido.
- Usa dynamic() + Module Federation.

✔ Cardápio 
- Exibe os itens do menu.
- Envia eventos globais ao adicionar itens ao pedido.

✔ Pedido 
- Escuta eventos enviados pelo Cardápio.
- Atualiza a lista de pedidos em tempo real.
---
## 🔗 Comunicação entre Microfrontends A comunicação é feita via Custom Events do navegador, permitindo comunicação desacoplada entre aplicações separadas. 
- Exemplo no micro Cardápio:
```jsx
  <button
      onClick={() =>
        window.top.dispatchEvent(
          new CustomEvent("adicionarCarrinho", {
            detail: {
              nome: prato.nome,
              preco: Number(prato.preco)
            }
          })
        )
      }
    >
    +
  </button>
```
- Exemplo no micro Pedido:
```jsx
     useEffect(() => {
        const handler = (e) => {
            const { nome, preco } = e.detail;
            setItens((prev) => [...prev, e.detail]);
        };

        window.addEventListener("adicionarCarrinho", handler);

        return () => window.removeEventListener("adicionarCarrinho", handler);
    }, []);
```
--- 
## 🔧 Module Federation 
> ⚠️ O mesmo vale para o micro Pedido.
Cardápio expõe componentes assim:
```jsx
    // cardapio/next.config.js
    exposes: {
      './Cardapio': './src/components/Cardapio.jsx',
    },
```
O Container importa dinamicamente:
```jsx
    const Cardapio = dynamic(() => import("cardapio/Cardapio"), { ssr: false });
```
--- 
## 🎯 Objetivo da arquitetura 
- Cada microfrontend pode ser desenvolvido e deployado separadamente.
- O Container carrega tudo em tempo real como uma aplicacao "normal".
- Comunicação leve, rápida e desacoplada (se bem configurada).
---
## Aplicação local 
> O Container consome os remotes via localhost. Para melhor usabilidade, o projeto pode ser hospedado em Vercel da vida ou semelhantes.
