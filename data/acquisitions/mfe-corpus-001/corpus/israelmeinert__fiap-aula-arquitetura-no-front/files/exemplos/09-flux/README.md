# Flux e estado

Tornar transições de estado explícitas usando ações e um reducer puro. Bloco 09, slides 61–66 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 09 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 09 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Interação → ação → reducer → estado → interface
```

useReducer mantém o estado local no React.

CompraStore oferece um signal readonly e dispatch no Angular; o provider limita o escopo.

## Arquivos para acompanhar

- [React: react/src/compra/quantidade-reducer.ts](react/src/compra/quantidade-reducer.ts)
- [Angular: angular/src/app/compra/compra-store.ts](angular/src/app/compra/compra-store.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   └── compra/
│   │   │       ├── compra-store.ts
│   │   │       ├── quantidade-reducer.ts
│   │   │       └── quantidade.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── compra/
    │   │   ├── Quantidade.tsx
    │   │   └── quantidade-reducer.ts
    │   └── main.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/compra/quantidade-reducer.ts](react/src/compra/quantidade-reducer.ts)

```ts
export type Acao = { type: 'adicionar' } | { type: 'reiniciar' };
export function quantidadeReducer(qtd: number, acao: Acao): number {
  switch (acao.type) {
    case 'adicionar': return Math.min(6, qtd + 1);
    case 'reiniciar': return 1;
    default: return qtd;
  }
}
```

## Exercício

Adicione uma ação remover e prove que vinte remoções não levam a quantidade abaixo de um. Evite HTTP e DOM no reducer.

## Decisão e custo

Este é um fluxo inspirado em Redux. Não instala Redux nem NgRx e não oferece automaticamente persistência ou devtools.

## Referências

[Documentação ou artigo de referência](https://react.dev/reference/react/useReducer). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
