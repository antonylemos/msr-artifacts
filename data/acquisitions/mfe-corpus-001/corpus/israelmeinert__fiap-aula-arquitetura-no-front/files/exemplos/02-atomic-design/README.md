# Atomic Design

Organizar unidades visuais e sua composição em um pequeno sistema de UI. Bloco 02, slides 17–21 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 02 react
# Pare com Ctrl+C antes de trocar.
npm run aula -- 02 angular
```

React: http://127.0.0.1:5173 · Angular: http://127.0.0.1:4200. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Página → template → organismo/molécula → átomos
```

TextInput e Button são átomos; SearchField os compõe em uma molécula.

EventList é um organismo e CatalogTemplate define a estrutura visual. A página aplica o filtro.

## Arquivos para acompanhar

- [React: react/src/ui/molecules/SearchField.tsx](react/src/ui/molecules/SearchField.tsx)
- [Angular: angular/src/app/ui/molecules/search-field.ts](angular/src/app/ui/molecules/search-field.ts)

## Estrutura implementada

```text
├── angular/
│   ├── package.json
│   ├── proxy.conf.json
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   └── eventos-page.ts
│   │   │   └── ui/
│   │   │       ├── atoms/
│   │   │       │   ├── button.ts
│   │   │       │   └── text-input.ts
│   │   │       ├── molecules/
│   │   │       │   └── search-field.ts
│   │   │       ├── organisms/
│   │   │       │   └── event-list.ts
│   │   │       └── templates/
│   │   │           └── catalog-template.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── tsconfig.json
└── react/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── main.tsx
    │   ├── pages/
    │   │   └── EventosPage.tsx
    │   └── ui/
    │       ├── atoms/
    │       │   ├── Button.tsx
    │       │   └── TextInput.tsx
    │       ├── molecules/
    │       │   └── SearchField.tsx
    │       ├── organisms/
    │       │   └── EventList.tsx
    │       └── templates/
    │           └── CatalogTemplate.tsx
    ├── tsconfig.json
    └── vite.config.ts
```

## Trecho do exemplo

[react/src/ui/molecules/SearchField.tsx](react/src/ui/molecules/SearchField.tsx)

```tsx
import { TextInput } from '../atoms/TextInput';
import { Button } from '../atoms/Button';
export function SearchField({ value, onChange, onClear }: { value: string; onChange: (v: string) => void; onClear: () => void }) {
  return <div><label>Buscar evento<TextInput value={value} onChange={onChange} /></label><Button onClick={onClear}>Limpar busca</Button></div>;
}
```

## Exercício

Adicione uma indicação de quantidade de resultados. Decida se ela pertence à página, à molécula ou ao organismo e justifique.

## Decisão e custo

A classificação ajuda o vocabulário visual. Ela não estabelece as fronteiras de catálogo, compra ou integrações.

## Referências

[Documentação ou artigo de referência](https://atomicdesign.bradfrost.com/chapter-2/). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).
