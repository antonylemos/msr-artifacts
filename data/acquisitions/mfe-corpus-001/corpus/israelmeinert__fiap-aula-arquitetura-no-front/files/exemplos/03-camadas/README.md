# Camadas

Separar apresentação, aplicação e acesso a dados mantendo a dependência tradicional. Bloco 03, slides 22–27 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 03 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 03 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Apresentação → listarAbertos → listarEventos → parser → API
```

A UI possui carregamento, mensagem de erro e lista de resultados.

A aplicação filtra eventos com vagas; data conhece a URL e valida o JSON.

## Arquivos para acompanhar

- [React: react/src/application/listar-abertos.ts](react/src/application/listar-abertos.ts)
- [Angular: angular/src/app/application/listar-abertos.ts](angular/src/app/application/listar-abertos.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── application/
│   │   │   │   └── listar-abertos.ts
│   │   │   ├── data/
│   │   │   │   ├── eventos-http.ts
│   │   │   │   └── parse-eventos.ts
│   │   │   ├── model/
│   │   │   │   └── evento.ts
│   │   │   └── presentation/
│   │   │       └── eventos-page.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── application/
    │   │   └── listar-abertos.ts
    │   ├── data/
    │   │   ├── eventos-http.ts
    │   │   └── parse-eventos.ts
    │   ├── main.tsx
    │   ├── model/
    │   │   └── evento.ts
    │   └── presentation/
    │       └── EventosPage.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/application/listar-abertos.ts](react/src/application/listar-abertos.ts)

```ts
import { listarEventos } from '../data/eventos-http';
export async function listarAbertos() { return (await listarEventos()).filter(evento => evento.vagas > 0); }
```

## Exercício

Inclua um filtro de preço máximo na aplicação. Use os cenários esgotado e invalido para conferir a lista vazia e o erro.

## Decisão e custo

A aplicação importa o acesso HTTP concreto. Essa dependência é intencional para comparar com Clean e Hexagonal.

## Referências

[Documentação ou artigo de referência](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
