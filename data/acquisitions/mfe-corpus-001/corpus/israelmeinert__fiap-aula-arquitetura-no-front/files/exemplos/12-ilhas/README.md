# Ilhas e carregamento seletivo

Enviar interatividade de forma seletiva em páginas com conteúdo estático ou blocos adiáveis. Bloco 12, slides 78–81 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 12 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 12 angular
```

Astro: http://127.0.0.1:4321 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Astro: HTML → ilha client:visible; Angular: viewport → chunk @defer → componente
```

A página Astro contém uma ilha React e hidrata quando o usuário chega à seleção. O botão é habilitado depois da hidratação, evitando uma ação visualmente disponível antes da conexão dos eventos.

SeatMap é standalone e usado somente dentro de @defer. O build Angular produz um chunk separado. O comando de desenvolvimento desliga HMR para preservar o carregamento adiado na demonstração.

## Arquivos para acompanhar

- [React com Astro: astro/src/pages/index.astro](astro/src/pages/index.astro)
- [Angular: angular/src/app/evento/evento-page.ts](angular/src/app/evento/evento-page.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── evento/
│   │   │   │   └── evento-page.ts
│   │   │   └── seat-map/
│   │   │       └── seat-map.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── astro/
    ├── astro.config.mjs
    ├── package.json
    ├── src/
    │   ├── components/
    │   │   └── Selecionar.tsx
    │   └── pages/
    │       └── index.astro
    └── tsconfig.json
```

## Trecho do exemplo

[astro/src/pages/index.astro](astro/src/pages/index.astro)

```astro
---
import { Selecionar } from '../components/Selecionar';
import '../../../../../material/estilos.css';
---
<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>EventFlow · Ilhas</title></head><body><main><h1>12 · Ilhas · React Day</h1><p>Descrição, programação e localização são HTML estático.</p><section style="min-height: 100vh"><h2>Programação</h2><p>Arquitetura, componentes e estado. Role até a seleção de ingressos.</p></section><Selecionar client:visible /></main></body></html>
```

## Exercício

Abra Network, filtre JavaScript e role a página até a seleção/mapa. Registre quais arquivos chegam antes e depois da rolagem.

## Decisão e custo

As abordagens têm propriedades diferentes. Este Angular usa CSR com carregamento adiado; não implementa ilhas independentes nem hidratação incremental.

## Referências

[Astro e suas ilhas](https://docs.astro.build/en/concepts/islands/) e [Angular @defer, incluindo o comportamento com HMR](https://angular.dev/guide/templates/defer). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
