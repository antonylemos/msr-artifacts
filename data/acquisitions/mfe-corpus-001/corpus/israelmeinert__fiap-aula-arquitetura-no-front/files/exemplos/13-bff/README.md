# Backend for Frontend

Agregar duas APIs no servidor e expor um contrato específico para a tela. Bloco 13, slides 82–88 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 13 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 13 angular
```

React/Next: http://127.0.0.1:3000 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Cliente → BFF → evento + disponibilidade → Resumo
```

Next expõe /api/resumo em um Route Handler e marca os upstreams com server-only.

Angular consulta /bff/resumo via HttpClient; o backend Express em 4011 agrega os serviços e fica fora do bundle cliente.

## Arquivos para acompanhar

- [React com Next.js: next/src/app/api/resumo/route.ts](next/src/app/api/resumo/route.ts)
- [Angular: apps/web-angular/src/app/evento/resumo-api.ts](apps/web-angular/src/app/evento/resumo-api.ts)

## Estrutura implementada

```text
├── apps/
│   ├── web-angular/
│   │   ├── package.json
│   │   ├── proxy.conf.json
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── evento/
│   │   │   │       ├── evento-page.ts
│   │   │   │       ├── parse-resumo.ts
│   │   │   │       └── resumo-api.ts
│   │   │   ├── index.html
│   │   │   └── main.ts
│   │   └── tsconfig.json
│   └── web-bff/
│       ├── package.json
│       ├── src/
│       │   ├── evento-dto.ts
│       │   ├── main.ts
│       │   ├── montar-resumo.ts
│       │   ├── parse-evento.ts
│       │   ├── resumo-router.ts
│       │   └── upstreams.ts
│       └── tsconfig.json
└── next/
    ├── .env.example
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   └── resumo/
    │   │   │       └── route.ts
    │   │   ├── error.tsx
    │   │   ├── evento/
    │   │   │   ├── ResumoView.tsx
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── server/
    │   │   ├── evento-dto.ts
    │   │   ├── montar-resumo.ts
    │   │   ├── parse-evento.ts
    │   │   └── upstreams.ts
    │   └── shared/
    │       └── parse-resumo.ts
    └── tsconfig.json
```

## Trecho do exemplo

[next/src/app/api/resumo/route.ts](next/src/app/api/resumo/route.ts)

```ts
import { montarResumo } from '../../../server/montar-resumo';
import { api } from '../../../server/upstreams';
export async function GET() {
  try { return Response.json(await montarResumo(api), { headers: { 'Cache-Control': 'no-store' } }); }
  catch (error) { console.error('Falha ao montar resumo:', error); return Response.json({ erro: 'Resumo indisponível' }, { status: 502 }); }
}
```

## Exercício

Teste normal, esgotado, erro e invalido. A falha de qualquer upstream deve resultar em 502 e mensagem de nova tentativa no cliente.

## Decisão e custo

Disponibilidade é uma fotografia da consulta. Ela não reserva vaga. Promise.all inicia consultas em paralelo e não cancela a outra automaticamente quando há falha.

## Referências

[Documentação ou artigo de referência](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).

## Política do BFF

As consultas usam timeout de três segundos; o cliente espera até cinco segundos. JSON inesperado falha no adaptador. O endpoint devolve somente `id`, `titulo` e `disponivel`, com cache desabilitado. A demonstração não tem usuários autenticados nem compra real. A API local representa dois serviços por endpoints diferentes; em produção eles podem ter origens distintas.
