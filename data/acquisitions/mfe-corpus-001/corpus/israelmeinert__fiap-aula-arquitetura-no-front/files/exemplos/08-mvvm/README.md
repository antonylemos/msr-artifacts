# MVVM

Separar o comportamento de apresentação da View sem duplicar estado derivado. Bloco 08, slides 56–60 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 08 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 08 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
View → operações do ViewModel → estado; Model → cálculo do total
```

O hook React e o serviço Angular expõem quantidade, total e operações.

O total é calculado a partir da quantidade. O provider Angular é local à View.

## Arquivos para acompanhar

- [React: react/src/compra/useCompraViewModel.ts](react/src/compra/useCompraViewModel.ts)
- [Angular: angular/src/app/compra/compra-view-model.ts](angular/src/app/compra/compra-view-model.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   └── compra/
│   │   │       ├── calcular-total.ts
│   │   │       ├── compra-view-model.ts
│   │   │       └── compra-view.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── compra/
    │   │   ├── CompraView.tsx
    │   │   ├── calcular-total.ts
    │   │   └── useCompraViewModel.ts
    │   └── main.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/compra/useCompraViewModel.ts](react/src/compra/useCompraViewModel.ts)

```ts
import { useState } from 'react';
import { calcularTotal } from './calcular-total';
export function useCompraViewModel(preco: number) {
  const [qtd, setQtd] = useState(1);
  return { qtd, total: calcularTotal(preco, qtd), podeAumentar: qtd < 6,
    aumentar: () => setQtd(q => Math.min(6, q + 1)), reiniciar: () => setQtd(1) };
}
```

## Exercício

Adicione diminuir() ao ViewModel e um botão à View. O limite inferior deve ser um e o total deve acompanhar a quantidade.

## Decisão e custo

Um hook não vira ViewModel somente por estar em outro arquivo. Regras de negócio continuam nas funções do Model.

## Referências

[Documentação ou artigo de referência](https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
