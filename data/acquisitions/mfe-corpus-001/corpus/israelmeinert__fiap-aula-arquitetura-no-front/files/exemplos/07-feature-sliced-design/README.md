# Feature-Sliced Design

Aplicar convenções de camadas, slices e APIs públicas ao front-end. Bloco 07, slides 50–55 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 07 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 07 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
app → pages → widgets → features → entities → shared
```

A página entrega o evento ao widget Compra; ele compõe CardEvento e SelecionarIngresso.

Cada slice possui index.ts. A feature não importa a página nem outras features. No Angular, architecture/ contém as camadas.

## Arquivos para acompanhar

- [React: react/src/widgets/compra/ui/Compra.tsx](react/src/widgets/compra/ui/Compra.tsx)
- [Angular: angular/src/app/architecture/widgets/compra/ui/compra.ts](angular/src/app/architecture/widgets/compra/ui/compra.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   └── architecture/
│   │   │       ├── app/
│   │   │       │   └── app.ts
│   │   │       ├── entities/
│   │   │       │   └── evento/
│   │   │       │       ├── index.ts
│   │   │       │       ├── model/
│   │   │       │       │   └── evento.ts
│   │   │       │       └── ui/
│   │   │       │           └── card-evento.ts
│   │   │       ├── features/
│   │   │       │   └── selecionar-ingresso/
│   │   │       │       ├── index.ts
│   │   │       │       ├── model/
│   │   │       │       │   └── limitar-quantidade.ts
│   │   │       │       └── ui/
│   │   │       │           └── selecionar-ingresso.ts
│   │   │       ├── pages/
│   │   │       │   └── evento/
│   │   │       │       ├── index.ts
│   │   │       │       └── ui/
│   │   │       │           └── evento-page.ts
│   │   │       ├── shared/
│   │   │       │   └── ui/
│   │   │       │       ├── button.ts
│   │   │       │       └── index.ts
│   │   │       └── widgets/
│   │   │           └── compra/
│   │   │               ├── index.ts
│   │   │               └── ui/
│   │   │                   └── compra.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   └── App.tsx
    │   ├── entities/
    │   │   └── evento/
    │   │       ├── index.ts
    │   │       ├── model/
    │   │       │   └── evento.ts
    │   │       └── ui/
    │   │           └── CardEvento.tsx
    │   ├── features/
    │   │   └── selecionar-ingresso/
    │   │       ├── index.ts
    │   │       ├── model/
    │   │       │   └── limitar-quantidade.ts
    │   │       └── ui/
    │   │           └── SelecionarIngresso.tsx
    │   ├── main.tsx
    │   ├── pages/
    │   │   └── evento/
    │   │       ├── index.ts
    │   │       └── ui/
    │   │           └── EventoPage.tsx
    │   ├── shared/
    │   │   └── ui/
    │   │       ├── Button.tsx
    │   │       └── index.ts
    │   └── widgets/
    │       └── compra/
    │           ├── index.ts
    │           └── ui/
    │               └── Compra.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/widgets/compra/ui/Compra.tsx](react/src/widgets/compra/ui/Compra.tsx)

```tsx
import { CardEvento, type Evento } from '../../../entities/evento';
import { SelecionarIngresso } from '../../../features/selecionar-ingresso';
export function Compra({ evento }: { evento: Evento }) { return <section><CardEvento evento={evento} /><SelecionarIngresso eventoId={evento.id} /></section>; }
```

## Exercício

Faça shared/ui importar SelecionarIngresso e execute npm run check. Explique a violação e desfaça o import.

## Decisão e custo

FSD e organização simples por funcionalidades têm regras diferentes. Entities pode incluir UI; não equivale à entidade da Clean.

## Referências

[Documentação ou artigo de referência](https://feature-sliced.design/docs/reference/layers). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
