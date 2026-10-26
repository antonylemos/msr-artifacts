# Escolha e evolução

Escolher uma combinação a partir das mudanças esperadas no produto. Bloco 14, slides 89–94 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 14 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 14 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
App → catálogo simples + compra com apresentação, aplicação, domínio e infraestrutura
```

Catálogo conserva organização por funcionalidades; compra usa Clean para isolar o cálculo.

O App coordena o contexto da seleção. Um único release atende o estudo de caso e suas fronteiras são verificadas.

## Arquivos para acompanhar

- [React: react/src/app/App.tsx](react/src/app/App.tsx)
- [Angular: angular/src/app/features/compra/providers.ts](angular/src/app/features/compra/providers.ts)

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
│   │   │   │   │   ├── application/
│   │   │   │   │   │   └── criar-simulador.ts
│   │   │   │   │   ├── compra-page.ts
│   │   │   │   │   ├── compra-root.ts
│   │   │   │   │   ├── compra.routes.ts
│   │   │   │   │   ├── domain/
│   │   │   │   │   │   └── calcular-total.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── infrastructure/
│   │   │   │   │   │   ├── catalogo-http.ts
│   │   │   │   │   │   ├── evento-dto.ts
│   │   │   │   │   │   └── parse-evento.ts
│   │   │   │   │   ├── presentation/
│   │   │   │   │   │   ├── simulador.ts
│   │   │   │   │   │   └── tokens.ts
│   │   │   │   │   └── providers.ts
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
    │   │   │   ├── application/
    │   │   │   │   └── criar-simulador.ts
    │   │   │   ├── composition.tsx
    │   │   │   ├── domain/
    │   │   │   │   └── calcular-total.ts
    │   │   │   ├── index.ts
    │   │   │   ├── infrastructure/
    │   │   │   │   ├── catalogo-http.ts
    │   │   │   │   ├── evento-dto.ts
    │   │   │   │   └── parse-evento.ts
    │   │   │   └── presentation/
    │   │   │       └── Simulador.tsx
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
import { CompraRoot } from '../features/compra';
export function App() {
  const [evento, selecionar] = useState<Evento | null>(null);
  return <main><h1>14 · Módulos com Clean na compra</h1><EventosPage onSelecionar={selecionar} />
    {evento && <section><h2>Simulação · {evento.titulo}</h2><CompraRoot key={evento.id} eventoId={evento.id} /></section>}</main>;
}
```

## Exercício

Escreva um ADR comparando esta solução com micro-frontends. Identifique a evidência que justificaria mudar a fronteira de deploy.

## Decisão e custo

A solução é uma referência para discussão. Avalie coesão, custo de operação, testes e frequência das mudanças antes de adotar mais camadas.

## Referências

[Documentação ou artigo de referência](https://martinfowler.com/architecture/). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
