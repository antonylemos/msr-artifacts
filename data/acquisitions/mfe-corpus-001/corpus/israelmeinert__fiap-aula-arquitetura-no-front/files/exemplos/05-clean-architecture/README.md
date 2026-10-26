# Clean Architecture

Proteger o cálculo e o caso de uso das ferramentas de interface e transporte. Bloco 05, slides 34–43 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 05 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 05 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Imports: apresentação → aplicação → domínio; infraestrutura → contrato da aplicação
```

calcularTotal valida preço, quantidade e overflow usando somente TypeScript.

criarSimulador recebe a porta Catalogo. Composition/provider conecta catalogoHttp à apresentação.

## Arquivos para acompanhar

- [React: react/src/features/compra/application/criar-simulador.ts](react/src/features/compra/application/criar-simulador.ts)
- [Angular: angular/src/app/features/compra/providers.ts](angular/src/app/features/compra/providers.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts
│   │   │   └── features/
│   │   │       └── compra/
│   │   │           ├── application/
│   │   │           │   └── criar-simulador.ts
│   │   │           ├── compra-root.ts
│   │   │           ├── domain/
│   │   │           │   └── calcular-total.ts
│   │   │           ├── index.ts
│   │   │           ├── infrastructure/
│   │   │           │   ├── catalogo-http.ts
│   │   │           │   ├── evento-dto.ts
│   │   │           │   └── parse-evento.ts
│   │   │           ├── presentation/
│   │   │           │   ├── simulador.ts
│   │   │           │   └── tokens.ts
│   │   │           └── providers.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── App.tsx
    │   ├── features/
    │   │   └── compra/
    │   │       ├── application/
    │   │       │   └── criar-simulador.ts
    │   │       ├── composition.tsx
    │   │       ├── domain/
    │   │       │   └── calcular-total.ts
    │   │       ├── index.ts
    │   │       ├── infrastructure/
    │   │       │   ├── catalogo-http.ts
    │   │       │   ├── evento-dto.ts
    │   │       │   └── parse-evento.ts
    │   │       └── presentation/
    │   │           └── Simulador.tsx
    │   └── main.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/features/compra/application/criar-simulador.ts](react/src/features/compra/application/criar-simulador.ts)

```ts
import { calcularTotal } from '../domain/calcular-total';

export interface Catalogo { precoDe(eventoId: string): Promise<number>; }
export type Simular = (id: string, qtd: number) => Promise<number>;
export function criarSimulador(catalogo: Catalogo): Simular {
  return async (id, qtd) => calcularTotal(await catalogo.precoDe(id), qtd);
}
```

## Exercício

Altere a política de cálculo no domínio e teste sem abrir o navegador. Localize todos os imports de catalogoHttp e explique por que estão na composição.

## Decisão e custo

O fluxo em execução passa pelo adaptador HTTP, mas o caso de uso não importa esse adaptador. A simulação não reserva nem cobra ingressos.

## Referências

[Documentação ou artigo de referência](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
