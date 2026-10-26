# CSR, SSR e SSG

Comparar onde e quando o conteúdo principal é renderizado. Bloco 11, slides 73–77 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 11 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 11 angular
```

React/Next: http://127.0.0.1:3000 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
SSR: requisição → servidor → HTML; SSG: build → HTML; CSR: navegador → interface
```

Next usa /evento com fetch no-store, /sobre estática e /painel com ssr:false.

Angular configura RenderMode.Server, Prerender e Client nas mesmas três rotas; bootstrap de servidor e hidratação estão completos.

## Arquivos para acompanhar

- [React com Next.js: next/src/app/evento/page.tsx](next/src/app/evento/page.tsx)
- [Angular: angular/src/app/app.routes.server.ts](angular/src/app/app.routes.server.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.config.server.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.server.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.ts
│   │   │   ├── evento/
│   │   │   │   └── evento-page.ts
│   │   │   ├── painel/
│   │   │   │   └── painel-page.ts
│   │   │   └── sobre/
│   │   │       └── sobre-page.ts
│   │   ├── index.html
│   │   ├── main.server.ts
│   │   ├── main.ts
│   │   └── server.ts
│   └── tsconfig.json
└── next/
    ├── .env.example
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── error.tsx
    │   │   ├── evento/
    │   │   │   ├── Selecionar.tsx
    │   │   │   └── page.tsx
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── painel/
    │   │   │   ├── Painel.tsx
    │   │   │   └── page.tsx
    │   │   └── sobre/
    │   │       └── page.tsx
    │   └── server/
    │       ├── evento-dto.ts
    │       └── parse-evento.ts
    └── tsconfig.json
```

## Trecho do exemplo

[next/src/app/evento/page.tsx](next/src/app/evento/page.tsx)

```tsx
import { Selecionar } from './Selecionar';
import { parseEvento } from '../../server/parse-evento';
export default async function Page() {
  const base = process.env.CATALOGO_URL;
  if (!base) throw new Error('Configure CATALOGO_URL');
  const r = await fetch(`${base}/eventos/react-day`, { cache: 'no-store', signal: AbortSignal.timeout(3000) });
  if (!r.ok) throw new Error('Evento indisponível');
  const evento = parseEvento(await r.json());
  return <main><h1>11 · Renderização · {evento.titulo}</h1><p>{evento.vagas} vagas</p><p>SSR por requisição: {new Date().toISOString()}</p><Selecionar /><nav><a href="/sobre">Sobre (SSG)</a><a href="/painel">Painel (CSR)</a></nav></main>;
}
```

## Exercício

Compare o HTML bruto das três rotas e repita requisições a /evento. No build de produção, verifique que /sobre mantém seu conteúdo entre requisições.

## Decisão e custo

Server Components e SSR são decisões diferentes. use client sozinho não elimina HTML inicial no servidor. O evento Angular usa dados fixos e TransferState para o horário.

## Referências

[Documentação ou artigo de referência](https://angular.dev/guide/ssr). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).

## Observar produção

`npm run build -- 11` cria os dois exemplos. Para Next, mantenha a API em outro terminal (`npm run api`), configure `CATALOGO_URL` copiando `.env.example` para `.env.local` na pasta next e execute `npm run start --workspace 11-next`. Para Angular, execute `node exemplos/11-renderizacao/angular/dist/server/server.mjs`. O servidor autoriza as origens locais `127.0.0.1` e `localhost`; ajuste a lista de hosts se mudar o ambiente. Abra `/evento`, `/sobre` e `/painel`. No desenvolvimento, SSG não demonstra o momento do build; compare produção.
