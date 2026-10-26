# Guia do aluno para arquitetura front-end

Arquitetura reúne decisões sobre responsabilidades, fronteiras, dependências e execução. Neste laboratório, o EventFlow mantém o mesmo domínio para permitir comparar o que muda no código e o custo de cada escolha.

## Como estudar

1. Prepare o ambiente pelo [README principal](../README.md).
2. Escolha um bloco e execute primeiro na tecnologia que conhece. Depois compare o mesmo contrato na outra tecnologia.
3. Leia a árvore de pastas e siga a interação do usuário até a regra ou a integração.
4. Faça o exercício e registre os arquivos que precisaram mudar.
5. Explique o benefício e o custo da organização usando uma mudança concreta.

## Contrato comum

```ts
type Evento = {
  id: string;
  titulo: string;
  precoCentavos: number;
  vagas: number;
};
```

`15000` representa R$ 150,00. Dois ingressos totalizam `30000` centavos. A quantidade deve estar entre 1 e 6 e os cálculos devem permanecer inteiros seguros. Interfaces TypeScript ajudam durante o desenvolvimento; dados externos são `unknown` até a validação em execução.

## Dimensões das decisões

| Dimensão | Abordagens | Pergunta principal |
|---|---|---|
| Composição da UI | Componentes, Atomic Design | Como dividir e compor a interface? |
| Organização e dependências | Camadas, Feature-Based, FSD | Onde uma mudança pertence e quem pode importar quem? |
| Proteção das regras | Clean, Hexagonal | Como manter a regra independente dos detalhes? |
| Apresentação e estado | MVVM, Flux | Quem possui o estado e como ele muda? |
| Execução e entrega | CSR, SSR, SSG, ilhas, micro-frontends | Onde roda, quando carrega e como publica? |
| Integração | BFF | Qual contrato simplifica a experiência da tela? |

Essas dimensões podem se combinar. Uma aplicação por funcionalidades pode usar Clean na compra, MVVM na apresentação, SSR no catálogo e BFF para agregar serviços.

## Mapa de estudo

### 01 Componentes

Dividir uma tela em unidades com contratos claros de entrada e saída. Leia [o código e a explicação](../exemplos/01-componentes/README.md), slides 12–16.

Composição reduz responsabilidades da tela. Um card reutilizável sozinho não define regras de negócio, dados ou entrega.

### 02 Atomic Design

Organizar unidades visuais e sua composição em um pequeno sistema de UI. Leia [o código e a explicação](../exemplos/02-atomic-design/README.md), slides 17–21.

A classificação ajuda o vocabulário visual. Ela não estabelece as fronteiras de catálogo, compra ou integrações.

### 03 Camadas

Separar apresentação, aplicação e acesso a dados mantendo a dependência tradicional. Leia [o código e a explicação](../exemplos/03-camadas/README.md), slides 22–27.

A aplicação importa o acesso HTTP concreto. Essa dependência é intencional para comparar com Clean e Hexagonal.

### 04 Funcionalidades e monólito modular

Agrupar arquivos por capacidade do produto e controlar dependências entre módulos. Leia [o código e a explicação](../exemplos/04-feature-based/README.md), slides 28–33.

Há um único release. Rotas Angular carregadas sob demanda geram chunks, mas continuam no mesmo produto.

### 05 Clean Architecture

Proteger o cálculo e o caso de uso das ferramentas de interface e transporte. Leia [o código e a explicação](../exemplos/05-clean-architecture/README.md), slides 34–43.

O fluxo em execução passa pelo adaptador HTTP, mas o caso de uso não importa esse adaptador. A simulação não reserva nem cobra ingressos.

### 06 Hexagonal

Trocar uma integração preservando a porta e o núcleo da operação. Leia [o código e a explicação](../exemplos/06-hexagonal/README.md), slides 44–49.

A arquitetura precisa de contratos estáveis e composição explícita. Renomear services para adapters não produz isolamento por si só.

### 07 Feature-Sliced Design

Aplicar convenções de camadas, slices e APIs públicas ao front-end. Leia [o código e a explicação](../exemplos/07-feature-sliced-design/README.md), slides 50–55.

FSD e organização simples por funcionalidades têm regras diferentes. Entities pode incluir UI; não equivale à entidade da Clean.

### 08 MVVM

Separar o comportamento de apresentação da View sem duplicar estado derivado. Leia [o código e a explicação](../exemplos/08-mvvm/README.md), slides 56–60.

Um hook não vira ViewModel somente por estar em outro arquivo. Regras de negócio continuam nas funções do Model.

### 09 Flux e estado

Tornar transições de estado explícitas usando ações e um reducer puro. Leia [o código e a explicação](../exemplos/09-flux/README.md), slides 61–66.

Este é um fluxo inspirado em Redux. Não instala Redux nem NgRx e não oferece automaticamente persistência ou devtools.

### 10 Micro-frontends

Compor aplicações que possuem artefatos de build separados. Leia [o código e a explicação](../exemplos/10-micro-frontends/README.md), slides 67–72.

A composição usa ESM por URL e manifesto. Há bundles separados e um caminho de publicação independente; o laboratório não provisiona um pipeline de deploy.

### 11 CSR, SSR e SSG

Comparar onde e quando o conteúdo principal é renderizado. Leia [o código e a explicação](../exemplos/11-renderizacao/README.md), slides 73–77.

Server Components e SSR são decisões diferentes. use client sozinho não elimina HTML inicial no servidor. O evento Angular usa dados fixos e TransferState para o horário.

### 12 Ilhas e carregamento seletivo

Enviar interatividade de forma seletiva em páginas com conteúdo estático ou blocos adiáveis. Leia [o código e a explicação](../exemplos/12-ilhas/README.md), slides 78–81.

As abordagens têm propriedades diferentes. Este Angular usa CSR com carregamento adiado; não implementa ilhas independentes nem hidratação incremental.

### 13 Backend for Frontend

Agregar duas APIs no servidor e expor um contrato específico para a tela. Leia [o código e a explicação](../exemplos/13-bff/README.md), slides 82–88.

Disponibilidade é uma fotografia da consulta. Ela não reserva vaga. Promise.all inicia consultas em paralelo e não cancela a outra automaticamente quando há falha.

### 14 Escolha e evolução

Escolher uma combinação a partir das mudanças esperadas no produto. Leia [o código e a explicação](../exemplos/14-escolha-e-evolucao/README.md), slides 89–94.

A solução é uma referência para discussão. Avalie coesão, custo de operação, testes e frequência das mudanças antes de adotar mais camadas.

## Erros de interpretação frequentes

- Uma pasta services não informa quem pode depender dela. Confira os imports.
- Lazy loading muda o carregamento do mesmo release. Micro-frontends exigem uma fronteira de entrega.
- Signals são um mecanismo reativo. O fluxo de ações e reducer é uma decisão adicional.
- Entity do FSD pode incluir UI. O domínio da Clean preserva independência de UI e infraestrutura.
- Server Components não são sinônimo de SSR. Client Components também podem ter HTML inicial no servidor.
- `@defer` adia um bloco Angular. Ilhas do Astro possuem hidratação seletiva própria.
- Um BFF executa no servidor. Hooks e serviços de navegador consomem sua API.

## Referências para consulta

- [React: Thinking in React](https://react.dev/learn/thinking-in-react) e [useReducer](https://react.dev/reference/react/useReducer).
- [Angular: guia de estilo](https://angular.dev/style-guide), [signals](https://angular.dev/guide/signals), [SSR](https://angular.dev/guide/ssr) e [@defer](https://angular.dev/guide/templates/defer).
- [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/).
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) e [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
- [FSD: camadas](https://feature-sliced.design/docs/reference/layers) e [API pública](https://feature-sliced.design/docs/reference/public-api).
- [Micro-frontends](https://martinfowler.com/articles/micro-frontends.html).
- [Next: Server e Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components).
- [Astro: ilhas](https://docs.astro.build/en/concepts/islands/).
- [Microsoft: BFF](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) e [Next: BFF](https://nextjs.org/docs/app/guides/backend-for-frontend).

A bibliografia completa e as notas do professor estão no [conteúdo da aula](../conteudo/aula-arquitetura-front-end.md).
