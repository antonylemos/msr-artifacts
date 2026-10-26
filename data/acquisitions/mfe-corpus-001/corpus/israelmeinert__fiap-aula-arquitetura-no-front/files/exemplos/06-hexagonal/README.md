# Hexagonal

Trocar uma integração preservando a porta e o núcleo da operação. Bloco 06, slides 44–49 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 06 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 06 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
UI → porta de entrada (Simular) → core → porta de saída (Catalogo) → HTTP ou memória
```

O núcleo usa Catalogo, sem importar adapters.

Trocar adaptador alterna entre HTTP e memória no React; no Angular, wrappers registram providers diferentes.

## Arquivos para acompanhar

- [React: react/src/features/compra/composition.tsx](react/src/features/compra/composition.tsx)
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
│   │   │           ├── adapters/
│   │   │           │   ├── http/
│   │   │           │   │   ├── catalogo-http.ts
│   │   │           │   │   ├── evento-dto.ts
│   │   │           │   │   └── parse-evento.ts
│   │   │           │   ├── memory/
│   │   │           │   │   └── catalogo.ts
│   │   │           │   └── ui/
│   │   │           │       ├── simulador.ts
│   │   │           │       └── tokens.ts
│   │   │           ├── compra-demo.ts
│   │   │           ├── compra-root.ts
│   │   │           ├── core/
│   │   │           │   ├── calcular-total.ts
│   │   │           │   └── criar-simulador.ts
│   │   │           ├── index.ts
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
    │   │       ├── adapters/
    │   │       │   ├── http/
    │   │       │   │   ├── catalogo-http.ts
    │   │       │   │   ├── evento-dto.ts
    │   │       │   │   └── parse-evento.ts
    │   │       │   ├── memory/
    │   │       │   │   └── catalogo.ts
    │   │       │   └── ui/
    │   │       │       └── Simulador.tsx
    │   │       ├── composition.tsx
    │   │       ├── core/
    │   │       │   ├── calcular-total.ts
    │   │       │   └── criar-simulador.ts
    │   │       └── index.ts
    │   └── main.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/features/compra/composition.tsx](react/src/features/compra/composition.tsx)

```tsx
import { criarSimulador } from './core/criar-simulador';
import { catalogoHttp } from './adapters/http/catalogo-http';
import { catalogoMemoria } from './adapters/memory/catalogo';
import { Simulador } from './adapters/ui/Simulador';
// Só a composição conhece as implementações concretas.
const simularHttp = criarSimulador(catalogoHttp);
const simularMemoria = criarSimulador(catalogoMemoria);
export function CompraRoot({ memoria = false }: { memoria?: boolean }) {
  return <Simulador simular={ memoria ? simularMemoria : simularHttp } />;
}
```

## Exercício

Ative o cenário erro e compare os adaptadores: memória deve continuar calculando 30000 centavos para dois ingressos; HTTP deve informar falha.

## Decisão e custo

A arquitetura precisa de contratos estáveis e composição explícita. Renomear services para adapters não produz isolamento por si só.

## Referências

[Documentação ou artigo de referência](https://alistair.cockburn.us/hexagonal-architecture/). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
