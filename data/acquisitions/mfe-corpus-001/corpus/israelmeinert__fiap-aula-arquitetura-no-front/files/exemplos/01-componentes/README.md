# Componentes

Dividir uma tela em unidades com contratos claros de entrada e saída. Bloco 01, slides 12–16 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 01 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 01 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Página → props/inputs → CardEvento → callback/output → página
```

O card apresenta um evento e emite o ID selecionado.

A página possui o estado da seleção e decide o próximo passo.

## Arquivos para acompanhar

- [React: react/src/components/CardEvento.tsx](react/src/components/CardEvento.tsx)
- [Angular: angular/src/app/card-evento/card-evento.ts](angular/src/app/card-evento/card-evento.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── card-evento/
│   │   │   │   └── card-evento.ts
│   │   │   ├── evento-page/
│   │   │   │   └── evento-page.ts
│   │   │   └── evento.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── components/
    │   │   └── CardEvento.tsx
    │   ├── evento.ts
    │   ├── main.tsx
    │   └── pages/
    │       └── EventoPage.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/components/CardEvento.tsx](react/src/components/CardEvento.tsx)

```tsx
import type { Evento } from '../evento';
type Props = { evento: Evento; onSelecionar: (id: string) => void };
// O card emite intenção; o consumidor decide o que fazer com ela.
export function CardEvento({ evento, onSelecionar }: Props) {
  return <article><h2>{evento.titulo}</h2><p>{evento.vagas} vagas</p>
    <button onClick={() => onSelecionar(evento.id)}>Selecionar evento</button></article>;
}
```

## Exercício

Mova a decisão da seleção para o pai. Depois adicione um segundo card e confirme que a seleção continua correta.

## Decisão e custo

Composição reduz responsabilidades da tela. Um card reutilizável sozinho não define regras de negócio, dados ou entrega.

## Referências

[Documentação ou artigo de referência](https://react.dev/learn/thinking-in-react). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
