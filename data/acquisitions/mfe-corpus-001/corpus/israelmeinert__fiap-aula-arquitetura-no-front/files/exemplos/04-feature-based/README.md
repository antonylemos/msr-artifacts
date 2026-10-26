# Funcionalidades e monólito modular

Agrupar arquivos por capacidade do produto e controlar dependências entre módulos. Bloco 04, slides 28–33 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 04 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 04 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
App → API pública de eventos e compra; features → shared/ui
```

A composição do fluxo fica no App; as features não importam umas às outras.

No React, App repassa dados tipados. No Angular, a URL fornece o ID e a compra consulta o preço por seu próprio contrato.

## Arquivos para acompanhar

- [React: react/src/app/App.tsx](react/src/app/App.tsx)
- [Angular: angular/src/app/app.routes.ts](angular/src/app/app.routes.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.routes.ts
│   │   │   ├── app.ts
│   │   │   ├── features/
│   │   │   │   ├── compra/
│   │   │   │   │   ├── calcular-total.ts
│   │   │   │   │   ├── compra-page.ts
│   │   │   │   │   ├── compra.routes.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── preco-api.ts
│   │   │   │   └── eventos/
│   │   │   │       ├── evento.ts
│   │   │   │       ├── eventos-http.ts
│   │   │   │       ├── eventos-page.ts
│   │   │   │       ├── eventos.routes.ts
│   │   │   │       ├── index.ts
│   │   │   │       └── parse-eventos.ts
│   │   │   └── shared/
│   │   │       └── ui/
│   │   │           └── status.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   └── App.tsx
    │   ├── features/
    │   │   ├── compra/
    │   │   │   ├── Compra.tsx
    │   │   │   ├── calcular-total.ts
    │   │   │   └── index.ts
    │   │   └── eventos/
    │   │       ├── EventosPage.tsx
    │   │       ├── evento.ts
    │   │       ├── eventos-http.ts
    │   │       ├── index.ts
    │   │       └── parse-eventos.ts
    │   ├── main.tsx
    │   └── shared/
    │       └── ui/
    │           └── Status.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/app/App.tsx](react/src/app/App.tsx)

```tsx
import { useState } from 'react';
import { EventosPage, type Evento } from '../features/eventos';
import { Compra } from '../features/compra';
export function App() {
  const [evento, selecionar] = useState<Evento | null>(null);
  return <main><h1>04 · Funcionalidades e módulos</h1><EventosPage onSelecionar={selecionar} />
    {evento && <Compra key={evento.id} titulo={evento.titulo} precoCentavos={evento.precoCentavos} />}</main>;
}
```

## Exercício

Crie a feature inscrições e exponha apenas sua tela ou suas rotas em index.ts. Tente um import profundo e execute npm run check.

## Decisão e custo

Há um único release. Rotas Angular carregadas sob demanda geram chunks, mas continuam no mesmo produto.

## Referências

[Documentação ou artigo de referência](https://angular.dev/style-guide). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
