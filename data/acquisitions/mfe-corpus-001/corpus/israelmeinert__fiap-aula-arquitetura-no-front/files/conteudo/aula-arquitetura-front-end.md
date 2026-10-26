---
marp: true
theme: default
size: "16:9"
paginate: true
lang: pt-BR
title: "Arquitetura no Front-end — React e Angular"
description: "Fundamentos, estruturas, exemplos e decisões arquiteturais com React e Angular."
author: "Israel"
footer: "ARQUITETURA FRONT-END · EVENTFLOW"
style: |
  section {
    background: #f8fafc;
    color: #172536;
    font-family: "Aptos", "DejaVu Sans", "Arial", sans-serif;
    font-size: 27px;
    line-height: 1.33;
    padding: 52px 60px 56px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  section > * { flex-shrink: 0; }
  section::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 13px;
    height: 100%;
    background: #0e7490;
  }
  h1 {
    color: #12324b;
    font-size: 38px;
    line-height: 1.14;
    margin: 0 0 24px;
    letter-spacing: -0.8px;
  }
  h2 { color: #12324b; font-size: 30px; }
  p { margin: 0 0 17px; }
  strong { color: #0c6075; }
  a { color: #075f84; text-decoration: none; }
  blockquote {
    margin: 10px 0 0;
    padding: 12px 22px;
    border-left: 5px solid #0e7490;
    background: #e9f3f6;
    color: #12324b;
  }
  blockquote p { margin: 0; }
  pre {
    background: #edf2f7;
    border: 1px solid #d7e1eb;
    border-radius: 9px;
    color: #172536;
    font-size: 22px;
    line-height: 1.24;
    padding: 17px 21px;
    margin: 0 0 18px;
    overflow: visible;
  }
  code {
    font-family: "DejaVu Sans Mono", "Consolas", monospace;
    font-size: 0.86em;
    background: #e8eef3;
    border-radius: 4px;
    padding: 1px 5px;
  }
  pre code { font-size: 1em; background: none; padding: 0; }
  table { width: 100%; font-size: 23px; border-collapse: collapse; margin: 4px 0 21px; }
  th { background: #12324b; color: white; text-align: left; }
  th, td { padding: 10px 14px; border: 1px solid #d6e1eb; }
  tr:nth-child(even) td { background: #edf3f8; }
  header, footer { font-size: 13px; color: #617487; letter-spacing: 0.3px; }
  footer { position: absolute; left: 60px; bottom: 22px; max-width: 1100px; }
  section::after { color: #617487; font-size: 15px; right: 28px; bottom: 20px; }
  section.code { font-size: 24px; }
  section.code h1 { margin-bottom: 20px; }
  section.code pre { font-size: 21px; line-height: 1.22; }
  section.code p { margin-bottom: 12px; }
  section.tree pre { font-size: 23px; line-height: 1.26; }
  section.compact { font-size: 24px; }
  section.compact pre { font-size: 19.5px; line-height: 1.2; padding: 14px 18px; margin-bottom: 13px; }
  section.compact table { font-size: 21.5px; }
  section.compact th, section.compact td { padding: 9px 12px; }
  section.trade { font-size: 26px; }
  section.trade p { margin-bottom: 15px; }
  section.references { font-size: 23px; }
  section.references p { margin-bottom: 22px; }
  section.lead {
    background: #12324b;
    color: #f8fafc;
    justify-content: center;
    padding: 65px 75px;
  }
  section.lead h1 { color: #ffffff; font-size: 55px; max-width: 1080px; }
  section.lead strong { color: #a5e3ef; }
  section.lead p { font-size: 28px; margin-bottom: 25px; }
  section.lead footer, section.lead::after { color: #b8cbd7; }
---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos" -->
<!-- _class: lead -->

# Arquitetura no Front-end

Da organização do código às decisões de entrega.

**React + Angular · TypeScript · Um mesmo problema, diferentes escolhas**

Estudo de caso: **EventFlow**, uma plataforma de eventos e ingressos.

Israel · Material de aula

<!--
GUIA DO PROFESSOR
Material completo: 104 slides. A duração não foi fixada; selecione os blocos conforme a turma.
Roteiro por blocos:
- Fundamentos: slides 1–11
- 01 · Componentes: slides 12–16
- 02 · Atomic Design: slides 17–21
- 03 · Camadas: slides 22–27
- 04 · Funcionalidades e módulos: slides 28–33
- 05 · Clean Architecture: slides 34–43
- 06 · Hexagonal: slides 44–49
- 07 · Feature-Sliced Design: slides 50–55
- 08 · MVVM: slides 56–60
- 09 · Flux e estado: slides 61–66
- 10 · Micro-frontends: slides 67–72
- 11 · Renderização: slides 73–77
- 12 · Ilhas e carregamento seletivo: slides 78–81
- 13 · BFF: slides 82–88
- 14 · Escolha e evolução: slides 89–94
- Apêndice · Execução dos exemplos: slides 95–98
- Referências: slides 99–104
Trilha essencial sugerida: Fundamentos; Componentes; Camadas; Funcionalidades e módulos; Escolha e evolução.
Aprofundamento de código: Clean; Hexagonal; FSD; MVVM; Flux.
Aprofundamento de execução e escala: Micro-frontends; Renderização; Ilhas; BFF.
Apêndices e referências são material de consulta; não precisam ser apresentados na íntegra.
Público: alunos com base em JavaScript/TypeScript e componentes. Nenhuma experiência prévia com todas as arquiteturas é exigida.
Não monte infraestrutura ao vivo para cada abordagem: use os recortes para comparar decisões.
Os exemplos são alternativas didáticas, não um repositório completo. Imports de componentes de composição pressupõem os contratos descritos nas notas.

Abra perguntando: quando uma alteração aparentemente pequena fica difícil, o problema é sempre a linguagem? Este material é modular: não é necessário percorrer todos os aprofundamentos em um encontro. Os códigos são recortes de aplicações alternativas, não arquivos para concatenar em um único projeto.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos" -->

# O que vamos aprender

**Entender:** o que é arquitetura e quais problemas ela resolve.

**Comparar:** responsabilidades, dependências, pastas e código.

**Decidir:** quais benefícios justificam os custos de uma abordagem.

Ao final, o objetivo não é decorar nomes: é **defender uma escolha a partir do contexto**.

<!--
Pré-requisitos: JavaScript/TypeScript básico, componentes e noções de requisição HTTP. Os exemplos Angular usam componentes standalone e signals; explique brevemente essa sintaxe para alunos que conhecem apenas React.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R01" -->

# O que é arquitetura de software?

É o conjunto de decisões relevantes sobre **como um sistema é dividido, como suas partes se relacionam e quais regras orientam sua evolução**.

```text
Responsabilidades  +  Fronteiras  +  Dependências  +  Restrições
                              ↓
             Como o sistema funciona e pode mudar
```

Uma arquitetura também envolve execução, dados, segurança e entrega — não somente código-fonte.

<!--
Definição didática, não citação literal de uma norma. Use a arquitetura para explicitar decisões importantes ao produto. Uma pasta é apenas uma forma de representar algumas dessas decisões.

Fontes deste slide:
R01: Martin Fowler — Software Architecture Guide — https://martinfowler.com/architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R01" -->

# Para que a arquitetura serve?

**Conter o impacto das mudanças.** Uma regra de desconto não deveria exigir reescrever a navegação.

**Tornar responsabilidades claras.** Onde corrigir, testar e evoluir cada comportamento?

**Atender requisitos de qualidade.** Desempenho, segurança, acessibilidade e confiabilidade.

**Apoiar o trabalho do time.** Reduzir conflitos e decisões contraditórias.

> O benefício esperado é um sistema que continue compreensível e modificável.

<!--
Não prometa ausência de bugs, trocas gratuitas de framework ou aumento automático de performance. A arquitetura cria condições para esses objetivos; a implementação e a operação ainda precisam ser boas.

Fontes deste slide:
R01: Martin Fowler — Software Architecture Guide — https://martinfowler.com/architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R01, R12, R16" -->
<!-- _class: compact -->

# Arquitetura não é uma árvore de pastas

| Escolha isolada | O que ainda falta decidir? |
|---|---|
| “Usamos React” | Como separar regras, estado e integrações? |
| “Temos uma pasta services” | Quem pode importar esses serviços? |
| “Usamos Redux” | Que estado pertence à store e quem pode alterá-lo? |
| “Criamos vários projetos” | Eles podem ser publicados independentemente? |

**Uma arquitetura existe nos contratos e nas dependências reais.**

<!--
Uma biblioteca é uma ferramenta; um padrão resolve uma classe de problemas; uma arquitetura combina decisões. Verifique os imports: dois projetos com as mesmas pastas podem ter arquiteturas diferentes.

Fontes deste slide:
R01: Martin Fowler — Software Architecture Guide — https://martinfowler.com/architecture/
R12: Redux — Overview and Concepts — https://redux.js.org/tutorials/essentials/part-1-overview-concepts
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R22, R23, R26" -->
<!-- _class: compact -->

# Comece pelos problemas e pelas restrições

| Necessidade do EventFlow | Decisão a investigar |
|---|---|
| Divulgar eventos em mecanismos de busca | Pré-renderização ou renderização no servidor |
| Alterar políticas de preço com segurança | Regras isoladas e testes |
| Manter catálogo e checkout coerentes | Contratos entre funcionalidades |
| Publicar áreas com equipes independentes | Fronteiras de deploy |
| Exibir dados de vários serviços | Agregação e tratamento de falhas |

**Não existe “melhor arquitetura” sem explicitar o contexto.**

<!--
As necessidades e escolhas desta tabela são hipóteses do estudo de caso, não recomendações universais. Pergunte qual requisito seria mais importante em um MVP e qual mudaria com várias equipes.

Fontes deste slide:
R22: Next.js — Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
R23: Angular — Server-side and hybrid rendering — https://angular.dev/guide/ssr
R26: Microsoft — Backends for Frontends — https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R06, R10" -->

# Três conceitos para ler qualquer arquitetura

**Coesão:** manter juntas responsabilidades que mudam pelos mesmos motivos.

**Acoplamento:** quanto uma parte precisa conhecer os detalhes de outra.

**Contrato:** a interface explícita pela qual uma parte usa outra.

```text
Checkout → API pública do Catálogo       dependência explícita
Checkout → arquivos internos do Catálogo conhecimento de detalhes
```

O objetivo não é eliminar todas as dependências, mas **controlá-las**.

<!--
A primeira dependência só é aceita se a política do projeto permitir. Em FSD, por exemplo, slices irmãs têm regras mais restritas. Não apresente API pública como permissão automática para qualquer import.

Fontes deste slide:
R06: Nx — Architecting Angular Applications — https://nx.dev/blog/architecting-angular-applications
R10: Feature-Sliced Design — Public API — https://feature-sliced.design/docs/reference/public-api
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R04, R07, R09, R12, R16, R26" -->
<!-- _class: compact -->

# Não estamos comparando coisas equivalentes

| Dimensão | Abordagens desta aula |
|---|---|
| Composição da interface | Componentes, Atomic Design |
| Organização e dependências | Camadas, Feature-Based, monólito modular, FSD |
| Proteção das regras | Clean Architecture, Hexagonal |
| Apresentação e estado | MVVM, fluxo unidirecional/Flux |
| Execução e entrega | CSR, SSR, SSG, ilhas, micro-frontends |
| Integração com serviços | BFF |

**Elas podem ser combinadas; não formam uma competição única.**

<!--
Retome este mapa nas transições. BFF é backend voltado à experiência do frontend. Atomic Design não estabelece sozinho a arquitetura de negócio. CSR/SSR não determinam a organização das funcionalidades.

Fontes deste slide:
R04: Brad Frost — Atomic Design — https://atomicdesign.bradfrost.com/chapter-2/
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R12: Redux — Overview and Concepts — https://redux.js.org/tutorials/essentials/part-1-overview-concepts
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
R26: Microsoft — Backends for Frontends — https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R28" -->

# O mesmo produto durante toda a aula

**EventFlow:** consultar eventos, selecionar ingressos e simular uma compra.

```text
Catálogo           Compra                 Área do participante
listar eventos     escolher quantidade    consultar inscrições
ver detalhes       simular total          apresentar ingresso
```

**Hipóteses didáticas:** moeda BRL, valores inteiros em centavos, compra de 1 a 6 ingressos.

O servidor continua responsável por validar preço, autorização e disponibilidade na compra real.

<!--
A simulação não reserva vagas e não efetua cobrança. As arquiteturas são versões alternativas do mesmo caso. Usar um problema constante permite comparar a estrutura sem aprender um domínio novo a cada bloco.

Fontes deste slide:
R28: Next.js — Data Security — https://nextjs.org/docs/app/guides/data-security
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos" -->
<!-- _class: code -->

# Contrato mínimo do exemplo

```ts
// evento.ts — o caminho muda conforme a arquitetura.
export type Evento = {
  id: string;
  titulo: string;
  precoCentavos: number;
  vagas: number;
};

export const eventoDemo: Evento = {
  id: 'react-day', titulo: 'React Day',
  precoCentavos: 15000, vagas: 40,
};
```

**TypeScript não valida JSON em execução.** O adaptador deve verificar dados externos; há um exemplo no apêndice.

<!--
A tipagem e a validação em runtime são responsabilidades diferentes. precoCentavos usa uma unidade explícita para evitar confundir 150 reais com 150 centavos. O contrato é simplificado: um domínio real também precisaria tratar moeda e demais políticas.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Fundamentos | Ref.: R03" -->

# Como interpretar os códigos e as pastas

**As árvores são propostas didáticas**, não estruturas obrigatórias dos frameworks.

**Cada abordagem é uma alternativa.** Não crie todas as pastas em um único projeto.

Os trechos mostram arquivos essenciais; componentes auxiliares e bootstrap ficam indicados nas notas e no apêndice.

```text
React:   src/...
Angular: src/app/...   + main.ts e configuração do projeto
```

HTTP usa endpoints ilustrativos. **Não há backend executável embutido neste arquivo.**

<!--
Os exemplos têm imports explícitos quando o espaço permite. Imports de arquivos locais pressupõem os arquivos mostrados no bloco ou os contratos informados nas notas. Não apresente recortes como projetos completos. Os snippets Next.js e Astro são identificados: não são APIs do React puro.

Fontes deste slide:
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 01 · Componentes | Ref.: R02, R03" -->

# Componentes: dividir a interface

**Problema:** uma tela mistura toda a marcação e todas as interações.

**Ideia:** compor unidades de UI com entradas e eventos explícitos.

```text
PaginaEvento
  ├── CabecalhoEvento
  ├── CardEvento
  └── SeletorIngressos
```

Uma unidade visual não precisa conhecer HTTP, navegação e regras de todo o produto.

<!--
A divisão deve seguir responsabilidades, não uma quantidade fixa de linhas. Um componente pode ter estado local. Ser reutilizável é um possível benefício, não a única razão para extraí-lo.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 01 · Componentes | Ref.: R02, R03" -->
<!-- _class: tree -->

# Componentes · estruturas possíveis

```text
React                         Angular
src/                          src/app/
├── pages/                    ├── evento-page/
│   └── EventoPage.tsx         │   └── evento-page.ts
├── components/               ├── card-evento/
│   └── CardEvento.tsx         │   └── card-evento.ts
└── evento.ts                 └── evento.ts
```

Neste primeiro passo, o contrato é: **dados entram; eventos saem**.

A estrutura global por componentes será revista quando o produto crescer.

<!--
Este é um recorte pequeno para introduzir composição. Não contradiga o guia Angular: organizar aplicações maiores por áreas funcionais é preferível a reunir todos os componentes ou serviços em pastas técnicas globais.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 01 · Componentes | Ref.: R02" -->
<!-- _class: code -->

# Componentes · React

```tsx
import type { Evento } from '../evento';

type Props = { evento: Evento; onSelecionar: (id: string) => void };

export function CardEvento({ evento, onSelecionar }: Props) {
  return (
    <article>
      <h2>{evento.titulo}</h2>
      <p>{evento.vagas} vagas</p>
      <button onClick={() => onSelecionar(evento.id)}>
        Selecionar evento
      </button>
    </article>
  );
}
```

A decisão sobre o que fazer com a seleção pertence ao consumidor.

<!--
Mostre o componente sendo consumido como <CardEvento evento={eventoDemo} onSelecionar={id => console.log(id)} />. Props expressam o contrato; o componente não importa o router nem a API.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 01 · Componentes | Ref.: R35, R03" -->
<!-- _class: code -->

# Componentes · Angular

```ts
import { Component, input, output } from '@angular/core';
import type { Evento } from '../evento';

@Component({
  selector: 'ef-card-evento', standalone: true,
  template: `<article>
    <h2>{{ evento().titulo }}</h2>
    <p>{{ evento().vagas }} vagas</p>
    <button (click)="selecionar.emit(evento().id)">Selecionar</button>
  </article>`,
})
export class CardEvento {
  readonly evento = input.required<Evento>();
  readonly selecionar = output<string>();
}
```

O pai importa `CardEvento` e usa `[evento]` e `(selecionar)`.

<!--
input.required declara uma entrada obrigatória, lida como signal com evento(). output representa a emissão de um evento. Exemplo do pai: <ef-card-evento [evento]="evento" (selecionar)="abrir($event)" />. O binding de mão dupla não é necessário.

Fontes deste slide:
R35: Angular — Component inputs — https://angular.dev/guide/components/inputs
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 01 · Componentes | Ref.: R02, R03" -->
<!-- _class: trade -->

# Componentes · ganhos e limites

**Pontos positivos**

Responsabilidades visuais menores; composição; testes de interação mais focados.

**Pontos negativos**

Fragmentação excessiva; muitos parâmetros; componentes genéricos difíceis de usar.

**Faz sentido:** quase toda UI construída com React ou Angular.

**Evite quando:** a extração apenas espalha marcação sem criar uma responsabilidade clara.

<!--
Arquitetura de componentes é uma base, não uma resposta para todos os problemas. Um componente com dezenas de flags pode esconder responsabilidades incompatíveis.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 02 · Atomic Design | Ref.: R04" -->

# Atomic Design: organizar o sistema de UI

**Problema:** botões, campos e layouts variam sem critérios entre telas.

**Ideia:** construir a interface em níveis de composição.

```text
Átomos → Moléculas → Organismos → Templates → Páginas
botão     campo       busca         catálogo    catálogo real
```

É uma metodologia de **design de interfaces**. Não define onde ficam casos de uso, cache ou regras do negócio.

<!--
Os níveis não são uma linha de produção obrigatória. O objetivo é pensar nas partes e no todo de um sistema de interface. Não transforme a taxonomia em burocracia.

Fontes deste slide:
R04: Brad Frost — Atomic Design — https://atomicdesign.bradfrost.com/chapter-2/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 02 · Atomic Design | Ref.: R04" -->
<!-- _class: tree -->

# Atomic Design · estruturas possíveis

```text
React: src/ui/                 Angular: src/app/ui/
├── atoms/                     ├── atoms/
│   └── Button.tsx             │   └── button.ts
├── molecules/                 ├── molecules/
│   └── SearchField.tsx        │   └── search-field.ts
├── organisms/                 ├── organisms/
│   └── SearchBar.tsx          │   └── search-bar.ts
└── templates/                 └── templates/
    └── CatalogLayout.tsx          └── catalog-layout.ts
```

**Páginas concretas podem continuar nas funcionalidades ou nas rotas.**

<!--
Uma biblioteca de componentes pode preferir nomes por responsabilidade em vez de atoms/molecules. A metodologia não obriga estes diretórios. Não mova regras de precificação para um átomo chamado Price.

Fontes deste slide:
R04: Brad Frost — Atomic Design — https://atomicdesign.bradfrost.com/chapter-2/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 02 · Atomic Design | Ref.: R04, R02" -->
<!-- _class: code -->

# Atomic Design · composição em React

```tsx
// molecules/SearchField.tsx
export function SearchField({
  value, onChange,
}: { value: string; onChange: (value: string) => void }) {
  return (
    <label>
      Buscar eventos
      <input type="search" value={value}
        onChange={e => onChange(e.target.value)} />
    </label>
  );
}
```

A molécula compõe label e input nativos. **Ela não consulta a API.**

<!--
Elementos HTML podem cumprir o papel de átomos; não é necessário criar um wrapper React para cada tag. A busca e o tratamento de debounce podem ser coordenados pela funcionalidade que consome esse campo.

Fontes deste slide:
R04: Brad Frost — Atomic Design — https://atomicdesign.bradfrost.com/chapter-2/
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 02 · Atomic Design | Ref.: R35, R04" -->
<!-- _class: code -->

# Atomic Design · composição em Angular

```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ef-search-field', standalone: true,
  template: `<label>Buscar eventos
    <input #campo type="search" [value]="value()"
      (input)="valueChange.emit(campo.value)" />
  </label>`,
})
export class SearchField {
  readonly value = input('');
  readonly valueChange = output<string>();
}
```

A responsabilidade e o contrato são os mesmos do exemplo React.

<!--
A referência de template #campo evita casting de EventTarget dentro da expressão. É possível consumir com [value] e (valueChange). O rótulo envolve o input e fornece nome acessível.

Fontes deste slide:
R35: Angular — Component inputs — https://angular.dev/guide/components/inputs
R04: Brad Frost — Atomic Design — https://atomicdesign.bradfrost.com/chapter-2/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 02 · Atomic Design | Ref.: R04" -->
<!-- _class: trade -->

# Atomic Design · ganhos e limites

**Pontos positivos**

Vocabulário comum com design; consistência visual; composição e reutilização de UI.

**Pontos negativos**

Classificações subjetivas; abstrações visuais prematuras; não resolve regras de negócio.

**Faz sentido:** design systems ou vários produtos com uma linguagem visual comum.

**Evite quando:** a equipe discute os nomes dos níveis mais do que os contratos dos componentes.

<!--
Atomic Design é complementar a Feature-Based ou Clean. Uma molécula pode conter lógica de UI, como abrir uma lista; isso não a torna responsável por autorização, preço ou persistência.

Fontes deste slide:
R04: Brad Frost — Atomic Design — https://atomicdesign.bradfrost.com/chapter-2/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 03 · Camadas | Ref.: R05" -->

# Camadas: separar responsabilidades técnicas

**Problema:** apresentação, regras e comunicação externa estão misturadas.

```text
Apresentação → Aplicação → Acesso a dados → API externa
```

Neste exemplo, a camada superior usa a inferior; o acesso a dados não importa componentes.

**Camada lógica não é servidor físico.** As três primeiras partes podem executar no mesmo navegador.

<!--
Este bloco usa uma versão tradicional de camadas. A aplicação depende do acesso a dados concreto; depois, Clean e Hexagonal mostram como inverter essa dependência. Não coloque banco de dados acessível diretamente no navegador.

Fontes deste slide:
R05: Microsoft — N-tier architecture — https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 03 · Camadas | Ref.: R05" -->
<!-- _class: tree -->

# Camadas · estruturas possíveis

```text
React: src/                      Angular: src/app/
├── presentation/                ├── presentation/
│   └── EventosPage.tsx           │   └── eventos-page.ts
├── application/                 ├── application/
│   └── listar-abertos.ts         │   └── listar-abertos.ts
├── data/                        ├── data/
│   ├── eventos-http.ts          │   ├── eventos-http.ts
│   └── parse-eventos.ts         │   └── parse-eventos.ts
└── model/evento.ts              └── model/evento.ts
```

A mesma funcionalidade aparece em várias camadas.

<!--
A árvore ilustra organização técnica global, útil para comparação. Não é a recomendação geral do guia Angular para um produto grande. Model é um contrato compartilhado simples, e parse-eventos está na borda de dados.

Fontes deste slide:
R05: Microsoft — N-tier architecture — https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 03 · Camadas" -->
<!-- _class: code -->

# Camadas · dados e aplicação

```ts
// data/eventos-http.ts — fetch pode ser usado nos dois frameworks.
import { parseEventos } from './parse-eventos';
export async function listarEventos() {
  const response = await fetch('/api/eventos');
  if (!response.ok) throw new Error('Falha ao consultar eventos');
  return parseEventos(await response.json());
}

// application/listar-abertos.ts
import { listarEventos } from '../data/eventos-http';
export async function listarAbertos() {
  const eventos = await listarEventos();
  return eventos.filter(evento => evento.vagas > 0);
}
```

`parseEventos` valida o contrato; sua implementação está no apêndice.

<!--
São dois arquivos, separados pelos comentários. A mesma função TypeScript pode ser usada em React ou Angular. O acesso à implementação HTTP é direto neste exemplo, diferente da inversão de dependência vista adiante. Em produção, defina também cancelamento e timeout.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 03 · Camadas | Ref.: R02" -->
<!-- _class: code compact -->

# Camadas · consumidor React

```tsx
import { useState } from 'react';
import { listarAbertos } from '../application/listar-abertos';
export function EventosPage() {
  const [status, setStatus] = useState('Pronto');
  async function carregar() {
    setStatus('Carregando');
    try {
      const eventos = await listarAbertos();
      setStatus(`${eventos.length} eventos disponíveis`);
    } catch { setStatus('Falha ao carregar. Tente novamente.'); }
  }
  return <>
    <button disabled={status === 'Carregando'} onClick={carregar}>
      Consultar eventos
    </button>
    <p role="status">{status}</p>
  </>;
}
```

<!--
A UI apresenta estado de carregamento e erro, mas não conhece a URL. O carregamento por botão reduz código de ciclo de vida no slide. Para uma lista real, adote estado estruturado e uma política de consulta, cancelamento e cache. A string de status é uma simplificação de apresentação, não um padrão ideal para toda aplicação.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 03 · Camadas | Ref.: R14" -->
<!-- _class: code compact -->

# Camadas · consumidor Angular

```ts
import { Component, signal } from '@angular/core';
import { listarAbertos } from '../application/listar-abertos';
@Component({
  selector: 'ef-eventos-page', standalone: true,
  template: `<button [disabled]="status() === 'Carregando'"
    (click)="carregar()">Consultar eventos</button>
    <p role="status">{{ status() }}</p>`,
})
export class EventosPage {
  readonly status = signal('Pronto');
  async carregar() {
    this.status.set('Carregando');
    try {
      const eventos = await listarAbertos();
      this.status.set(`${eventos.length} eventos disponíveis`);
    } catch { this.status.set('Falha ao carregar. Tente novamente.'); }
  }
}
```

<!--
Não é obrigatório transformar toda função em serviço Angular. Aqui usamos o mesmo módulo de aplicação do React. HttpClient e DI poderiam ser adotados na camada de acesso a dados sem alterar a responsabilidade da página.

Fontes deste slide:
R14: Angular — Signals — https://angular.dev/guide/signals
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 03 · Camadas | Ref.: R05, R06" -->
<!-- _class: trade -->

# Camadas · ganhos e limites

**Pontos positivos**

Separação técnica simples; localização previsível dos tipos de responsabilidade.

**Pontos negativos**

Funcionalidade espalhada; camadas de mero repasse; serviços globais podem crescer demais.

**Faz sentido:** aplicações pequenas ou uma organização técnica dentro de um módulo.

**Evite quando:** o principal problema já é o acoplamento entre muitas áreas de negócio.

<!--
Nem toda camada precisa apenas encaminhar a chamada. Se não agrega uma responsabilidade, reavalie. Esta organização pode evoluir para camadas internas de uma feature, em vez de camadas globais.

Fontes deste slide:
R05: Microsoft — N-tier architecture — https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier
R06: Nx — Architecting Angular Applications — https://nx.dev/blog/architecting-angular-applications
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 04 · Funcionalidades e módulos | Ref.: R03, R06" -->

# Feature-Based: organizar pelo produto

**Problema:** para mudar “eventos”, precisamos procurar arquivos em todo o projeto.

**Ideia:** agrupar a UI, os dados e a lógica da mesma capacidade.

```text
Antes: components/ + services/ + hooks/ + models/
Depois: eventos/   + compra/   + inscricoes/
```

O primeiro nível responde: **“a qual parte do produto isso pertence?”**

<!--
Feature-Based é uma família de organizações por capacidade. Não exige o vocabulário ou todas as regras do Feature-Sliced Design. Comece com módulos de negócio reconhecíveis e refine quando necessário.

Fontes deste slide:
R03: Angular — Style Guide — https://angular.dev/style-guide
R06: Nx — Architecting Angular Applications — https://nx.dev/blog/architecting-angular-applications
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 04 · Funcionalidades e módulos | Ref.: R03" -->
<!-- _class: tree compact -->

# Feature-Based · estruturas possíveis

```text
React: src/                       Angular: src/app/
├── app/                          ├── app.routes.ts
├── features/                     ├── features/
│   ├── eventos/                   │   ├── eventos/
│   │   ├── EventosPage.tsx        │   │   ├── eventos-page.ts
│   │   ├── eventos-http.ts        │   │   ├── eventos-http.ts
│   │   ├── evento.ts              │   │   ├── evento.ts
│   │   └── index.ts               │   │   ├── eventos.routes.ts
│   └── compra/                    │   │   └── index.ts
└── shared/ui/                     │   └── compra/
                                  └── shared/ui/
```

Crie subpastas internas apenas quando ajudarem a navegação.

<!--
Os arquivos de teste devem acompanhar seus módulos. Shared recebe UI e utilitários de propósito claro; não deve receber regras específicas de eventos só porque outra tela também as usa.

Fontes deste slide:
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 04 · Funcionalidades e módulos | Ref.: R10" -->
<!-- _class: code -->

# Feature-Based · fronteira no React

```tsx
// features/eventos/index.ts — API pública explícita.
export { EventosPage } from './EventosPage';
export type { Evento } from './evento';

// app/App.tsx
import { EventosPage } from '../features/eventos';
export function App() {
  return <EventosPage />;
}
```

O consumidor não precisa conhecer `eventos-http.ts`.

**Exportar tudo com `export *` enfraquece a fronteira.**

<!--
São dois arquivos no mesmo slide. A escolha de exportar Evento é contextual: nem todo tipo interno precisa ser público. Um barrel não impede imports profundos sozinho; as regras precisam ser verificadas. Evite importar o próprio barrel dentro da feature e criar ciclos.

Fontes deste slide:
R10: Feature-Sliced Design — Public API — https://feature-sliced.design/docs/reference/public-api
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 04 · Funcionalidades e módulos | Ref.: R34" -->
<!-- _class: code compact -->

# Feature-Based · fronteira no Angular

```ts
// features/eventos/index.ts
export { EVENTOS_ROUTES } from './eventos.routes';

// features/eventos/eventos.routes.ts
import type { Routes } from '@angular/router';
export const EVENTOS_ROUTES: Routes = [{
  path: '', loadComponent: () => import('./eventos-page')
    .then(m => m.EventosPage),
}];

// app.routes.ts
import type { Routes } from '@angular/router';
export const routes: Routes = [{
  path: 'eventos', loadChildren: () => import('./features/eventos')
    .then(m => m.EVENTOS_ROUTES),
}];
```

<!--
Três arquivos separados pelos comentários. Registre routes usando provideRouter no bootstrap. Lazy loading é carregamento sob demanda do mesmo produto; não significa deploy independente e não transforma sozinho o projeto em micro-frontends.

Fontes deste slide:
R34: Angular — Define routes — https://angular.dev/guide/routing/define-routes
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 04 · Funcionalidades e módulos | Ref.: R06, R29" -->

# De pastas por feature a monólito modular

**Monólito modular:** uma unidade de release/deploy, com módulos internos delimitados.

```text
App → Catálogo → Shared
App → Compra   → Shared
App compõe os fluxos entre capacidades.
```

**Regras do nosso exemplo:** imports pela API pública; `shared` não importa features; sem ciclos entre módulos.

**Verificação:** revisão de código + lint/regras de fronteiras no CI.

<!--
Monólito não quer dizer um único arquivo JavaScript: code splitting pode gerar vários chunks no mesmo release. Uma alternativa de política é permitir dependências explícitas e acíclicas entre features; neste exemplo, a composição principal fica em App. As regras do Nx dependem de configuração por projetos/tags.

Fontes deste slide:
R06: Nx — Architecting Angular Applications — https://nx.dev/blog/architecting-angular-applications
R29: Nx — Enforce Module Boundaries — https://nx.dev/docs/features/enforce-module-boundaries
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 04 · Funcionalidades e módulos | Ref.: R03, R06, R29" -->
<!-- _class: trade -->

# Feature-Based + módulos · ganhos e limites

**Pontos positivos**

Coesão por negócio; mudanças mais locais; entrega e operação relativamente simples.

**Pontos negativos**

Fronteiras exigem disciplina; shared pode virar depósito; release continua conjunto.

**Faz sentido:** sistemas de gestão, SaaS e produtos com várias capacidades relacionadas.

**Evite quando:** há uma necessidade comprovada de releases realmente independentes que o modelo não atende.

<!--
Esta é uma boa base a avaliar, não uma resposta automática para qualquer produto. Depois é possível usar Clean apenas em compra, sem criar domínio/aplicação/infraestrutura em módulos triviais.

Fontes deste slide:
R03: Angular — Style Guide — https://angular.dev/style-guide
R06: Nx — Architecting Angular Applications — https://nx.dev/blog/architecting-angular-applications
R29: Nx — Enforce Module Boundaries — https://nx.dev/docs/features/enforce-module-boundaries
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R07" -->

# Clean: proteger regras dos detalhes

**Problema:** uma regra só pode ser testada montando componentes ou acessando HTTP.

**Ideia central:** dependências de código apontam para o núcleo.

```text
Apresentação ──→ Aplicação ──→ Domínio
Infraestrutura ──→ contratos da Aplicação
Composição conecta as implementações concretas.
```

React, Angular e HTTP não precisam aparecer na regra de cálculo.

<!--
Diferencie fluxo de execução e direção dos imports. O caso de uso pode chamar um adaptador em execução sem importar a implementação: ele conhece um contrato. Isso não exige classes, interfaces em todos os arquivos ou exatamente quatro pastas.

Fontes deste slide:
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R07" -->
<!-- _class: tree compact -->

# Clean · estruturas possíveis

```text
React: src/features/compra/      Angular: src/app/features/compra/
├── domain/                     ├── domain/
│   └── calcular-total.ts        │   └── calcular-total.ts
├── application/                ├── application/
│   └── criar-simulador.ts       │   └── criar-simulador.ts
├── infrastructure/             ├── infrastructure/
│   ├── catalogo-http.ts         │   ├── catalogo-http.ts
│   └── parse-evento.ts         │   └── parse-evento.ts
├── presentation/               ├── presentation/
│   └── Simulador.tsx            │   ├── simulador.ts
└── composition.tsx             │   └── tokens.ts
                                └── providers.ts
```

<!--
Árvore adaptada ao exemplo, não um template oficial de Clean Architecture. O módulo pode existir dentro de uma organização Feature-Based. A validação do DTO externo fica na infraestrutura; o domínio valida suas próprias invariantes.

Fontes deste slide:
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture" -->
<!-- _class: code -->

# Clean · domínio igual nos dois frameworks

```ts
// domain/calcular-total.ts
export function calcularTotal(preco: number, qtd: number): number {
  if (!Number.isSafeInteger(qtd) || qtd < 1 || qtd > 6) {
    throw new Error('Selecione de 1 a 6 ingressos');
  }
  if (!Number.isSafeInteger(preco) || preco < 0) {
    throw new Error('Preço inválido');
  }
  const total = preco * qtd;
  if (!Number.isSafeInteger(total)) throw new Error('Total inválido');
  return total;
}
```

**Sem JSX, decorators, DOM, signals ou chamadas de rede.**

<!--
Regra simplificada para a simulação: mesma moeda, preço em centavos e sem impostos ou descontos. Use 15000 × 2 = 30000 como demonstração. Isolar a função permite testar os limites sem framework. O servidor deverá recalcular o valor da compra real.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R07" -->
<!-- _class: code -->

# Clean · porta e caso de uso

```ts
// application/criar-simulador.ts
import { calcularTotal } from '../domain/calcular-total';
export interface Catalogo {
  precoDe(eventoId: string): Promise<number>;
}
export type Simular = (id: string, qtd: number) => Promise<number>;

export function criarSimulador(catalogo: Catalogo): Simular {
  return async (id, qtd) => {
    const preco = await catalogo.precoDe(id);
    return calcularTotal(preco, qtd);
  };
}
```

O caso de uso conhece `Catalogo`, não `fetch` nem `HttpClient`.

<!--
A interface está no módulo que precisa dela, não dentro da implementação HTTP. Injeção de dependência pode ser apenas passar um argumento. No recorte, a consulta ocorre antes da validação de quantidade; uma versão mais elaborada pode validar essa entrada antes da rede.

Fontes deste slide:
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R08" -->
<!-- _class: code -->

# Clean · adaptador HTTP

```ts
// infrastructure/catalogo-http.ts
import type { Catalogo } from '../application/criar-simulador';
import { parseEvento } from './parse-evento';

export const catalogoHttp: Catalogo = {
  async precoDe(id) {
    const response = await fetch(`/api/eventos/${encodeURIComponent(id)}`);
    if (!response.ok) throw new Error('Evento indisponível');
    const evento = parseEvento(await response.json());
    return evento.precoCentavos;
  },
};
```

O adaptador traduz o mundo externo para o contrato do caso de uso.

<!--
parseEvento é apresentado no apêndice e pode ser copiado para esta borda com seu contrato local. O método expõe preço em centavos, não Response, AxiosResponse ou um Observable imposto pelo transporte. Timeouts e cancelamento são políticas adicionais a definir.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R02" -->
<!-- _class: code compact -->

# Clean · apresentação React

```tsx
import { useState } from 'react';
import type { Simular } from '../application/criar-simulador';
export function Simulador({ simular }: { simular: Simular }) {
  const [mensagem, setMensagem] = useState('');
  async function executar() {
    setMensagem('Calculando');
    try {
      const total = await simular('react-day', 2);
      setMensagem(`Total: ${total} centavos`);
    } catch { setMensagem('Não foi possível simular'); }
  }
  return <>
    <button disabled={mensagem === 'Calculando'} onClick={executar}>
      Simular 2 ingressos
    </button>
    <p role="status">{mensagem}</p>
  </>;
}
```

<!--
A UI recebe uma operação, não um repositório concreto. A quantidade fixa simplifica a demonstração. Em uma tela real, venha de um formulário validado e apresente moeda formatada. A função pode ser substituída no teste do componente.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R07, R03" -->
<!-- _class: code compact -->

# Clean · quem conecta as peças?

```tsx
// React: composition.tsx
import { criarSimulador } from './application/criar-simulador';
import { catalogoHttp } from './infrastructure/catalogo-http';
import { Simulador } from './presentation/Simulador';
const simular = criarSimulador(catalogoHttp);
export function CompraRoot() { return <Simulador simular={simular} />; }
```

```ts
// Angular: presentation/tokens.ts
import { InjectionToken } from '@angular/core';
import type { Simular } from '../application/criar-simulador';
export const SIMULAR = new InjectionToken<Simular>('SIMULAR');
```

**Composition root:** o ponto autorizado a escolher implementações.

<!--
A closure simular deste exemplo não mantém dados de usuário. Não transforme esse padrão em autorização para singletons mutáveis compartilhados entre requisições SSR. O token Angular está na borda, mantendo Angular fora de domínio e aplicação.

Fontes deste slide:
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R03, R07" -->
<!-- _class: code -->

# Clean · provider Angular

```ts
// providers.ts
import type { Provider } from '@angular/core';
import { criarSimulador } from './application/criar-simulador';
import { catalogoHttp } from './infrastructure/catalogo-http';
import { SIMULAR } from './presentation/tokens';

export const COMPRA_PROVIDERS: Provider[] = [{
  provide: SIMULAR,
  useFactory: () => criarSimulador(catalogoHttp),
}];
```

O componente, a rota ou a aplicação registra esses providers.

O mecanismo de DI não faz parte do caso de uso.

<!--
A escolha do escopo importa: provider de componente cria uma instância associada àquele componente; provider em raiz tem outro ciclo de vida. Neste caso o valor é uma função sem estado de sessão. Mostre o registro no slide seguinte.

Fontes deste slide:
R03: Angular — Style Guide — https://angular.dev/style-guide
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R14, R03" -->
<!-- _class: code compact -->

# Clean · apresentação Angular

```ts
import { Component, inject, signal } from '@angular/core';
import { SIMULAR } from './tokens';
import { COMPRA_PROVIDERS } from '../providers';
@Component({
  selector: 'ef-simulador', standalone: true, providers: COMPRA_PROVIDERS,
  template: `<button [disabled]="mensagem() === 'Calculando'"
    (click)="executar()">Simular 2 ingressos</button>
    <p role="status">{{ mensagem() }}</p>`,
})
export class Simulador {
  private readonly simular = inject(SIMULAR);
  readonly mensagem = signal('');
  async executar() {
    this.mensagem.set('Calculando');
    try { const total = await this.simular('react-day', 2);
      this.mensagem.set(`Total: ${total} centavos`);
    } catch { this.mensagem.set('Não foi possível simular'); }
  }
}
```

<!--
A view usa o mesmo caso de uso do React; a diferença está na adaptação ao framework. O provider é local para deixar explícito o ponto de composição. Não confunda a existência de DI com inversão de dependência: uma classe pode receber uma implementação concreta por DI e continuar fortemente acoplada.

Fontes deste slide:
R14: Angular — Signals — https://angular.dev/guide/signals
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 05 · Clean Architecture | Ref.: R07" -->
<!-- _class: trade -->

# Clean · ganhos e limites

**Pontos positivos**

Regras testáveis sem UI; dependências explícitas; menor exposição a detalhes externos.

**Pontos negativos**

Mais arquivos e contratos; navegação adicional; risco de interfaces sem necessidade.

**Faz sentido:** regras complexas, simulações, editores ou fluxos que precisam de testes independentes.

**Evite quando:** uma tela trivial de CRUD ganha camadas que apenas repassam dados.

<!--
Uma UI continuar acoplada a React ou Angular não é um fracasso: ela é a borda do framework. A proposta é proteger o núcleo que importa, não prometer uma migração de framework sem custo.

Fontes deste slide:
R07: Robert C. Martin — The Clean Architecture — https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 06 · Hexagonal | Ref.: R08" -->

# Hexagonal: portas e adaptadores

**Problema:** o comportamento fica preso a uma UI ou integração específica.

```text
React / Angular / teste → porta de entrada: simular
                              ↓
                        núcleo da aplicação
                              ↓
               porta de saída: Catalogo
                    ↙                    ↘
              adaptador HTTP       adaptador em memória
```

O foco é a fronteira **dentro × fora**, não “criar seis serviços”.

<!--
Clean e Hexagonal são relacionadas, mas não sinônimas. Reaproveitaremos o caso de uso e o contrato anteriores para mostrar a mesma decisão sob a perspectiva de portas/adaptadores. O desenho em hexágono é uma metáfora, não uma quantidade obrigatória de partes.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 06 · Hexagonal | Ref.: R08" -->
<!-- _class: tree compact -->

# Hexagonal · estruturas possíveis

```text
React: src/compra/               Angular: src/app/compra/
├── core/                       ├── core/
│   ├── calcular-total.ts        │   ├── calcular-total.ts
│   └── criar-simulador.ts       │   └── criar-simulador.ts
├── adapters/                   ├── adapters/
│   ├── http/catalogo.ts        │   ├── http/catalogo.ts
│   ├── memory/catalogo.ts      │   ├── memory/catalogo.ts
│   └── ui/Simulador.tsx         │   └── ui/
└── composition.tsx             │       ├── simulador.ts
                                │       └── tokens.ts
                                └── providers.ts
```

O contrato continua pertencendo ao núcleo, não ao transporte.

<!--
Renomear domain/application para core não torna o sistema hexagonal. A condição relevante é não importar os adaptadores de dentro do núcleo. Os arquivos do bloco Clean podem ser reorganizados nesta alternativa com ajuste dos imports.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 06 · Hexagonal | Ref.: R08" -->
<!-- _class: code -->

# Hexagonal · outro adaptador, mesmo contrato

```ts
// adapters/memory/catalogo.ts
import type { Catalogo } from '../../core/criar-simulador';
const precos = new Map([['react-day', 15000]]);

export const catalogoMemoria: Catalogo = {
  async precoDe(id) {
    const preco = precos.get(id);
    if (preco === undefined) throw new Error('Evento não encontrado');
    return preco;
  },
};
```

Útil em uma demonstração ou teste. **Memória não equivale a persistência offline.**

<!--
Esse fake não implementa sincronização, armazenamento durável, autorização ou reserva de vagas. Ele satisfaz apenas a porta necessária à simulação. Não troque o backend real por este fake em uma compra de produção.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 06 · Hexagonal | Ref.: R08" -->
<!-- _class: code -->

# Hexagonal · troca no React

```tsx
// composition.tsx
import { criarSimulador } from './core/criar-simulador';
import { catalogoMemoria } from './adapters/memory/catalogo';
import { Simulador } from './adapters/ui/Simulador';

const simularDemo = criarSimulador(catalogoMemoria);
export function CompraDemo() {
  return <Simulador simular={simularDemo} />;
}
```

O componente é o mesmo do bloco Clean, com os imports ajustados.

**A troca acontece na composição, não dentro da regra.**

<!--
A UI só conhece a operação simular. Compare com uma condição if (ambiente === teste) dentro do caso de uso: isso acoplaria o núcleo à seleção de infraestrutura. A escolha do adaptador deve ocorrer fora.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 06 · Hexagonal | Ref.: R08, R03" -->
<!-- _class: code -->

# Hexagonal · troca no Angular

```ts
// providers.ts — mesma porta, implementação de demonstração.
import type { Provider } from '@angular/core';
import { SIMULAR } from './adapters/ui/tokens';
import { criarSimulador } from './core/criar-simulador';
import { catalogoMemoria } from './adapters/memory/catalogo';

export const COMPRA_PROVIDERS: Provider[] = [{
  provide: SIMULAR,
  useFactory: () => criarSimulador(catalogoMemoria),
}];
```

O componente mantém `inject(SIMULAR)` e o registro do provider local.

<!--
Aqui substituímos a implementação em providers.ts; o componente continua com o mesmo import. Em testes, também é possível sobrescrever providers com a infraestrutura de testes Angular. A equivalência depende de ambos os adaptadores respeitarem o mesmo contrato.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
R03: Angular — Style Guide — https://angular.dev/style-guide
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 06 · Hexagonal | Ref.: R08" -->
<!-- _class: trade -->

# Hexagonal · ganhos e limites

**Pontos positivos**

Integrações substituíveis por contrato; testes do núcleo; separação entre ambiente e regra.

**Pontos negativos**

Adaptadores extras; contratos mal desenhados vazam detalhes; testes falsos podem divergir da API.

**Faz sentido:** várias integrações, operação offline planejada ou testes sem dependências externas.

**Evite quando:** a abstração é criada apenas para uma possibilidade remota, sem benefício atual.

<!--
Um teste de contrato ajuda a impedir que o fake aceite situações que o adaptador real rejeita. A substituição de adaptador não elimina a necessidade de testes de integração.

Fontes deste slide:
R08: Alistair Cockburn — Hexagonal Architecture — https://alistair.cockburn.us/hexagonal-architecture/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 07 · Feature-Sliced Design | Ref.: R09, R33" -->

# FSD: convenções para fronteiras do front-end

**Problema:** o time organiza por funcionalidades, mas discorda sobre responsabilidades e imports.

```text
app → pages → widgets → features → entities → shared
```

**Camada:** nível de responsabilidade. **Slice:** recorte de negócio. **Segmento:** finalidade técnica dentro do recorte.

Exemplo: `features/selecionar-ingresso/ui/SelecionarIngresso.tsx`.

<!--
Não acrescente processes: essa camada está depreciada na documentação consultada. FSD é mais específico que Feature-Based. Não é obrigatório criar todas as camadas e nem toda interação precisa virar feature.

Fontes deste slide:
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R33: Feature-Sliced Design — Slices and segments — https://feature-sliced.design/docs/reference/slices-segments
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 07 · Feature-Sliced Design | Ref.: R09, R33" -->
<!-- _class: tree compact -->

# FSD · uma estrutura para os dois frameworks

```text
React: src/                   Angular: src/app/architecture/
├── app/                      ├── app/
├── pages/evento/             ├── pages/evento/
├── widgets/compra/           ├── widgets/compra/
├── features/                 ├── features/
│   └── selecionar-ingresso/  │   └── selecionar-ingresso/
│       ├── ui/               │       ├── ui/
│       ├── model/            │       ├── model/
│       └── index.ts          │       └── index.ts
├── entities/evento/          ├── entities/evento/
└── shared/ui/                └── shared/ui/
```

`architecture/` evita confundir a raiz `src/app` do Angular com a camada `app` do FSD.

<!--
Esta é uma adaptação didática ao Angular, não uma estrutura oficial Angular nem uma regra obrigatória de FSD. Outra opção seria manter todas as camadas diretamente em src e deixar src/app como a camada app. No React com Next, também separe as rotas do framework da camada de composição quando necessário.

Fontes deste slide:
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R33: Feature-Sliced Design — Slices and segments — https://feature-sliced.design/docs/reference/slices-segments
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 07 · Feature-Sliced Design | Ref.: R09, R10" -->
<!-- _class: compact -->

# FSD · regras que fazem diferença

**Regra geral:** uma slice importa outras slices apenas de camadas inferiores e por suas APIs públicas.

```text
pages/evento → features/selecionar-ingresso   permitido
features/... → entities/evento               permitido
features/a   → features/b                    não, por padrão
shared/ui    → features/a                    não
```

`app` e `shared` não são divididas em slices de negócio.

**Entity no FSD não é a entidade da Clean:** pode incluir UI e acesso a dados.

<!--
A regra não proíbe imports entre arquivos dentro da mesma slice. A documentação prevê relações explícitas entre entities via APIs @x; são exceções a tratar conscientemente, não autorização para imports cruzados arbitrários. Os segmentos de app/shared podem se relacionar, mantendo a regra de camadas.

Fontes deste slide:
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R10: Feature-Sliced Design — Public API — https://feature-sliced.design/docs/reference/public-api
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 07 · Feature-Sliced Design | Ref.: R09, R10" -->
<!-- _class: code -->

# FSD · composição no React

```tsx
// pages/evento/ui/EventoPage.tsx
import { CardEvento, eventoDemo } from '../../../entities/evento';
import { SelecionarIngresso } from '../../../features/selecionar-ingresso';

export function EventoPage() {
  return <main>
    <CardEvento evento={eventoDemo} />
    <SelecionarIngresso eventoId={eventoDemo.id} />
  </main>;
}
```

A página coordena o contexto. A entity apresenta o evento; a feature implementa a interação reutilizável.

<!--
Nesta versão FSD, CardEvento é uma apresentação somente de leitura, exportada em entities/evento/index.ts com eventoDemo. SelecionarIngresso recebe eventoId e mantém o comportamento na feature. Não reutilize sem ajuste o CardEvento do primeiro bloco, que exigia onSelecionar. O objetivo do recorte é mostrar os imports e a composição, não implementar novamente a seleção.

Fontes deste slide:
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R10: Feature-Sliced Design — Public API — https://feature-sliced.design/docs/reference/public-api
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 07 · Feature-Sliced Design | Ref.: R09, R35" -->
<!-- _class: code -->

# FSD · composição no Angular

```ts
// pages/evento/ui/evento-page.ts
import { Component } from '@angular/core';
import { CardEvento, eventoDemo } from '../../../entities/evento';
import { SelecionarIngresso } from '../../../features/selecionar-ingresso';
@Component({
  selector: 'ef-evento-page', standalone: true,
  imports: [CardEvento, SelecionarIngresso],
  template: `<main>
    <ef-card-evento [evento]="evento" />
    <ef-selecionar-ingresso [eventoId]="evento.id" />
  </main>`,
})
export class EventoPage { readonly evento = eventoDemo; }
```

As mesmas regras de dependência; mecanismos de composição diferentes.

<!--
CardEvento e SelecionarIngresso são standalone e exportados pelos index.ts de suas slices. Seus seletores e inputs precisam corresponder ao template. A feature recebe um ID e não importa a página. FSD não depende de JSX.

Fontes deste slide:
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R35: Angular — Component inputs — https://angular.dev/guide/components/inputs
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 07 · Feature-Sliced Design | Ref.: R09, R10, R33" -->
<!-- _class: trade -->

# FSD · ganhos e limites

**Pontos positivos**

Vocabulário explícito; política de imports; responsabilidades e APIs públicas padronizadas.

**Pontos negativos**

Curva de aprendizado; classificações difíceis; excesso de slices em projetos pequenos.

**Faz sentido:** um time precisa de uma metodologia comum para uma aplicação em crescimento.

**Evite quando:** as convenções custam mais esforço do que os problemas de fronteira que resolvem.

<!--
Evite criar a camada entities inteira antecipadamente. A documentação sugere considerar a reutilização entre páginas ao extrair features. Uma organização por funcionalidades mais simples pode atender antes de FSD.

Fontes deste slide:
R09: Feature-Sliced Design — Layers — https://feature-sliced.design/docs/reference/layers
R10: Feature-Sliced Design — Public API — https://feature-sliced.design/docs/reference/public-api
R33: Feature-Sliced Design — Slices and segments — https://feature-sliced.design/docs/reference/slices-segments
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 08 · MVVM | Ref.: R11" -->

# MVVM: separar comportamento de apresentação

**Model:** dados e regras. **View:** interface. **ViewModel:** estado e operações que a interface consome.

```text
React: compra/                  Angular: compra/
├── calcular-total.ts           ├── calcular-total.ts
├── useCompraViewModel.ts       ├── compra-view-model.ts
└── CompraView.tsx              └── compra-view.ts
```

Um hook ou serviço pode adaptar o padrão. **Nem todo hook é um ViewModel; Angular não impõe MVVM clássico.**

<!--
Apresente como adaptação ao frontend moderno. O MVVM clássico frequentemente usa data binding; React mantém seu fluxo de dados por props e callbacks. O objetivo é separar o comportamento da apresentação, não declarar equivalência perfeita entre frameworks.

Fontes deste slide:
R11: Microsoft — Model-View-ViewModel — https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 08 · MVVM | Ref.: R02, R11" -->
<!-- _class: code -->

# MVVM · ViewModel no React

```ts
// useCompraViewModel.ts
import { useState } from 'react';
import { calcularTotal } from './calcular-total';

export function useCompraViewModel(preco: number) {
  const [qtd, setQtd] = useState(1);
  const total = calcularTotal(preco, qtd);
  const aumentar = () => setQtd(atual => Math.min(6, atual + 1));
  return { qtd, total, aumentar, podeAumentar: qtd < 6 };
}
```

O total é derivado. Não precisamos guardar `qtd` e `total` em estados independentes.

<!--
Use a função de domínio do bloco Clean com o import local ajustado. O preço é um valor válido recebido pelo componente. Um hook que só encapsula fetch não é automaticamente MVVM. O ViewModel contém estado de apresentação e operações, mas deve delegar regras de negócio relevantes.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
R11: Microsoft — Model-View-ViewModel — https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 08 · MVVM | Ref.: R14, R11" -->
<!-- _class: code -->

# MVVM · ViewModel no Angular

```ts
// compra-view-model.ts
import { Injectable, computed, signal } from '@angular/core';
import { calcularTotal } from './calcular-total';

@Injectable()
export class CompraViewModel {
  private readonly _qtd = signal(1);
  readonly qtd = this._qtd.asReadonly();
  readonly total = computed(() => calcularTotal(15000, this.qtd()));
  readonly podeAumentar = computed(() => this.qtd() < 6);
  aumentar() { this._qtd.update(atual => Math.min(6, atual + 1)); }
}
```

O provider será local ao componente. O preço fixo é apenas dado da demonstração.

<!--
A classe é Injectable, mas sem providedIn root para evitar transformar estado local em singleton global. Em produção, o preço pode ser um input validado ou parte do estado recebido. Expor um signal readonly evita set direto por consumidores, mas não oferece imutabilidade profunda para objetos.

Fontes deste slide:
R14: Angular — Signals — https://angular.dev/guide/signals
R11: Microsoft — Model-View-ViewModel — https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 08 · MVVM | Ref.: R02, R14" -->
<!-- _class: code compact -->

# MVVM · as Views ficam menores

```tsx
// React: CompraView.tsx
import { useCompraViewModel } from './useCompraViewModel';
export function CompraView() {
  const vm = useCompraViewModel(15000);
  return <button disabled={!vm.podeAumentar} onClick={vm.aumentar}>
    {vm.qtd} ingresso(s) · {vm.total} centavos · adicionar
  </button>;
}
```

```ts
// Angular: metadados e classe; imports indicados nas notas.
@Component({ selector: 'ef-compra', standalone: true,
  providers: [CompraViewModel], template: `<button
    [disabled]="!vm.podeAumentar()" (click)="vm.aumentar()">
    {{ vm.qtd() }} ingresso(s) · {{ vm.total() }} centavos</button>` })
export class CompraView { readonly vm = inject(CompraViewModel); }
```

<!--
Para o trecho Angular, importe Component e inject de @angular/core e CompraViewModel de ./compra-view-model. O código foi dividido para caber no slide. A instância local é destruída com o componente; não compartilhe quantidades entre usuários em SSR por uma variável global.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
R14: Angular — Signals — https://angular.dev/guide/signals
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 08 · MVVM | Ref.: R11" -->
<!-- _class: trade -->

# MVVM · ganhos e limites

**Pontos positivos**

View mais declarativa; comportamento da tela concentrado; testes de apresentação mais focados.

**Pontos negativos**

ViewModels gigantes; camada extra para telas simples; regras podem acabar no lugar errado.

**Faz sentido:** uma tela acumula filtros, permissões visuais, estados derivados e interações.

**Evite quando:** o ViewModel apenas repassa propriedades sem reduzir complexidade.

<!--
Um ViewModel pode depender de casos de uso da Clean Architecture. Ele não substitui módulos de negócio nem resolve publicação independente. Testes dos hooks ainda exigem suporte ao runtime React; mantenha regras puras fora deles quando isso ajudar.

Fontes deste slide:
R11: Microsoft — Model-View-ViewModel — https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 09 · Flux e estado | Ref.: R12, R13" -->

# Flux: tornar as mudanças de estado explícitas

**Problema:** várias partes alteram estado compartilhado de formas difíceis de rastrear.

```text
Interação → ação → atualização do estado → interface
```

A seguir: exemplo **inspirado no fluxo Redux**, com reducer puro.

```text
React: compra/                  Angular: compra/
├── quantidade-reducer.ts       ├── quantidade-reducer.ts
└── Quantidade.tsx              ├── compra-store.ts
                                └── quantidade.ts
```

<!--
Flux clássico, Redux e um reducer local não são a mesma implementação. Redux introduz uma organização específica de store/actions/reducers. O exemplo ensina fluxo unidirecional sem instalar uma store global. Signals sozinhos também não equivalem a Flux.

Fontes deste slide:
R12: Redux — Overview and Concepts — https://redux.js.org/tutorials/essentials/part-1-overview-concepts
R13: React — useReducer — https://react.dev/reference/react/useReducer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 09 · Flux e estado | Ref.: R12, R13" -->
<!-- _class: code -->

# Flux · transição pura em TypeScript

```ts
// quantidade-reducer.ts — compartilhável entre os dois exemplos.
export type Acao =
  | { type: 'adicionar' }
  | { type: 'reiniciar' };

export function quantidadeReducer(qtd: number, acao: Acao): number {
  switch (acao.type) {
    case 'adicionar': return Math.min(6, qtd + 1);
    case 'reiniciar': return 1;
    default: return qtd;
  }
}
```

Sem HTTP, alteração do DOM ou mutação do estado recebido.

<!--
O limite é uma proteção de interação; a regra do domínio/servidor continua validando a compra. Requisições e outros efeitos devem ser coordenados fora do reducer. As actions expressam intenção de mudança, não apenas um set genérico que qualquer tela pode executar.

Fontes deste slide:
R12: Redux — Overview and Concepts — https://redux.js.org/tutorials/essentials/part-1-overview-concepts
R13: React — useReducer — https://react.dev/reference/react/useReducer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 09 · Flux e estado | Ref.: R13" -->
<!-- _class: code -->

# Flux · React com useReducer

```tsx
import { useReducer } from 'react';
import { quantidadeReducer } from './quantidade-reducer';

export function Quantidade() {
  const [qtd, dispatch] = useReducer(quantidadeReducer, 1);
  return <>
    <p>{qtd} ingresso(s)</p>
    <button disabled={qtd >= 6}
      onClick={() => dispatch({ type: 'adicionar' })}>Adicionar</button>
    <button onClick={() => dispatch({ type: 'reiniciar' })}>
      Reiniciar
    </button>
  </>;
}
```

`useReducer` é local ao componente. **Não cria uma store global.**

<!--
É possível elevar o estado para um ancestral, usar Context ou adotar uma biblioteca quando houver necessidade. Não comece compartilhando estado que apenas um componente consome.

Fontes deste slide:
R13: React — useReducer — https://react.dev/reference/react/useReducer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 09 · Flux e estado | Ref.: R14, R12" -->
<!-- _class: code -->

# Flux · Angular com uma store local

```ts
// compra-store.ts
import { Injectable, signal } from '@angular/core';
import { quantidadeReducer, type Acao } from './quantidade-reducer';
@Injectable()
export class CompraStore {
  private readonly state = signal(1);
  readonly qtd = this.state.asReadonly();
  dispatch(acao: Acao) {
    this.state.update(atual => quantidadeReducer(atual, acao));
  }
}
```

Na View, registre `providers: [CompraStore]`, use `inject(CompraStore)` e chame `store.dispatch({ type: 'adicionar' })`.

**Este exemplo não é uma implementação de NgRx Store.**

<!--
A atualização por actions/reducer é uma escolha arquitetural sobre signals, não uma obrigação do Angular. Template possível: <button [disabled]="store.qtd() >= 6" (click)="store.dispatch({type: 'adicionar'})">Adicionar</button>. A store é local ao componente que registra o provider.

Fontes deste slide:
R14: Angular — Signals — https://angular.dev/guide/signals
R12: Redux — Overview and Concepts — https://redux.js.org/tutorials/essentials/part-1-overview-concepts
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 09 · Flux e estado | Ref.: R12, R13" -->
<!-- _class: trade -->

# Flux / fluxo unidirecional · ganhos e limites

**Pontos positivos**

Transições explícitas; comportamento previsível; reducers pequenos e testáveis.

**Pontos negativos**

Mais indireção; excesso de ações; centralização desnecessária de estado local.

**Faz sentido:** várias interações precisam coordenar estados e transições relevantes.

**Evite quando:** uma store global vira requisito para abrir um modal ou editar um campo isolado.

<!--
Bibliotecas de estado também podem oferecer ferramentas de depuração, mas o pequeno reducer deste exemplo não oferece automaticamente histórico, devtools ou persistência. Não atribua benefícios de uma ferramenta que não foi instalada.

Fontes deste slide:
R12: Redux — Overview and Concepts — https://redux.js.org/tutorials/essentials/part-1-overview-concepts
R13: React — useReducer — https://react.dev/reference/react/useReducer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 09 · Flux e estado | Ref.: R02, R15" -->
<!-- _class: compact -->

# Antes de escolher a store, classifique o estado

| Natureza | Exemplo | Local a considerar |
|---|---|---|
| UI local | Modal aberto | Componente |
| Navegação | Filtro, ordenação, página | URL |
| Formulário | Campos e mensagens | Estado do formulário |
| Remoto | Eventos e disponibilidade | Mecanismo de consulta/cache |
| Compartilhado do cliente | Seleção entre etapas | Escopo comum ou store |
| Derivado | Total = preço × quantidade | Cálculo, não outra cópia |

**Um cache remoto e uma store de UI não resolvem o mesmo problema.**

<!--
TanStack Query é um exemplo para estado remoto. HttpClient transporta dados, mas não oferece sozinho uma política geral de cache de domínio. Evite duplicar respostas em Query e outra store sem um motivo claro. Defina invalidação e expiração em vez de tratar dados remotos como permanentes.

Fontes deste slide:
R02: React — Thinking in React — https://react.dev/learn/thinking-in-react
R15: TanStack Query — Overview — https://tanstack.com/query/latest/docs/framework/react/overview
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 10 · Micro-frontends | Ref.: R16" -->

# Micro-frontends: fronteiras de entrega

**Problema:** equipes de áreas diferentes dependem do mesmo release.

**Ideia:** compor partes do produto que possam ser entregues independentemente.

```text
Shell / composição
  ├── Catálogo       equipe A · release A
  ├── Checkout       equipe B · release B
  └── Participante   equipe C · release C
```

**Code splitting, lazy loading e monorepo não bastam para definir micro-frontends.**

<!--
A principal motivação é organizacional e de entrega. Não é necessário usar frameworks diferentes. Uma UI compartilhada no mesmo documento não é uma fronteira de segurança; código remoto nessa página precisa ser confiável.

Fontes deste slide:
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 10 · Micro-frontends | Ref.: R16, R18" -->
<!-- _class: tree -->

# Micro-frontends · estrutura do produto

```text
workspace/                     # monorepo é opcional
├── apps/
│   ├── shell/                 # descoberta, rotas, fallback
│   ├── catalogo-react/
│   │   └── src/{App.tsx, mount.tsx}
│   └── checkout-angular/
│       └── src/{app/checkout-app.ts, mount.ts}
└── packages/
    └── contracts/mount.ts     # contrato estável, sem store global
```

Cada aplicação precisa de build, testes e publicação próprios.

Nos próximos exemplos: **adaptadores de montagem**, não uma configuração completa de federação.

<!--
As chaves na árvore são notação abreviada para listar arquivos, não um nome de diretório literal. A aquisição dos módulos remotos, o manifesto, a origem dos assets e o fallback não estão implementados neste recorte. Separar repositórios não garante independência.

Fontes deste slide:
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
R18: single-spa — Microfrontends Overview — https://single-spa.js.org/docs/microfrontends-concept/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 10 · Micro-frontends | Ref.: R19, R16" -->
<!-- _class: code -->

# Micro-frontends · adaptador React

```tsx
// catalogo-react/src/mount.tsx
import { createRoot } from 'react-dom/client';
import { App } from './App';

export async function mount(host: HTMLElement): Promise<() => void> {
  const root = createRoot(host);
  root.render(<App />);
  return () => root.unmount();
}
```

Contrato com o shell: **receber um elemento e devolver a limpeza**.

A origem do módulo pode mudar sem expor os componentes internos ao shell.

<!--
Este é um contrato didático próprio, não o contrato exato bootstrap/mount/unmount de single-spa. App precisa existir e ser exportado no projeto React. O shell chama a limpeza antes de descartar a montagem. createRoot é para este recorte CSR; hidratação de HTML existente exige outro caminho.

Fontes deste slide:
R19: React — createRoot — https://react.dev/reference/react-dom/client/createRoot
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 10 · Micro-frontends | Ref.: R20, R21" -->
<!-- _class: code compact -->

# Micro-frontends · adaptador Angular

```ts
// checkout-angular/src/mount.ts
import { createApplication } from '@angular/platform-browser';
import { createComponent } from '@angular/core';
import { CheckoutApp } from './app/checkout-app';
export async function mount(host: HTMLElement): Promise<() => void> {
  const app = await createApplication();
  const ref = createComponent(CheckoutApp, {
    hostElement: host, environmentInjector: app.injector,
  });
  app.attachView(ref.hostView);
  ref.changeDetectorRef.detectChanges();
  return () => {
    app.detachView(ref.hostView);
    ref.destroy();
    app.destroy();
  };
}
```

`CheckoutApp` é standalone; o shell mantém o mesmo contrato.

<!--
Configure os providers exigidos pelo projeto em createApplication, inclusive a estratégia de detecção de mudanças correspondente à versão Angular. O trecho mostra o ciclo normal; trate falhas parciais de inicialização destruindo recursos já criados. Não destrua o platform compartilhado ao desmontar uma aplicação.

Fontes deste slide:
R20: Angular — createComponent — https://angular.dev/api/core/createComponent
R21: Angular — createApplication — https://angular.dev/api/platform-browser/createApplication
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 10 · Micro-frontends | Ref.: R17, R18, R36, R16" -->
<!-- _class: compact -->

# Micro-frontends · integração e operação

| Mecanismo | O que oferece |
|---|---|
| Rotas / reverse proxy / Multi-Zones | Composição por áreas de URL |
| Module Federation | Consumo de módulos de builds separados |
| single-spa | Orquestração do ciclo de vida de aplicações |
| iframe | Contexto de documento separado, com custos de integração |

Defina: contratos, estilos, autenticação, falhas, observabilidade e rollback.

**Compartilhar uma store mutável global pode destruir a autonomia pretendida.**

<!--
As configurações dependem do builder e das versões. Não prometa que um plugin webpack funciona automaticamente no App Router do Next ou em qualquer builder Angular. Multi-Zones faz navegação completa entre zonas. Iframe só oferece a proteção desejada com políticas de origem/sandbox apropriadas; não trate isolamento visual como autorização.

Fontes deste slide:
R17: webpack — Module Federation — https://webpack.js.org/concepts/module-federation/
R18: single-spa — Microfrontends Overview — https://single-spa.js.org/docs/microfrontends-concept/
R36: Next.js — Multi-zones — https://nextjs.org/docs/app/guides/multi-zones
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 10 · Micro-frontends | Ref.: R16, R18" -->
<!-- _class: trade -->

# Micro-frontends · ganhos e limites

**Pontos positivos**

Autonomia de releases; migração incremental; responsabilidade por áreas do produto.

**Pontos negativos**

Integração e operação mais caras; dependências duplicadas; falhas e estilos precisam de coordenação.

**Faz sentido:** existem equipes, fronteiras de negócio e necessidades reais de publicação independente.

**Evite quando:** o único motivo é ter muitas pastas ou querer misturar frameworks.

<!--
Compartilhar um design system pode fazer sentido, mas versionamento e compatibilidade precisam ser definidos. Antes de distribuir, tente entender se modularização e melhorias no pipeline resolveriam o gargalo.

Fontes deste slide:
R16: Cam Jackson — Micro Frontends — https://martinfowler.com/articles/micro-frontends.html
R18: single-spa — Microfrontends Overview — https://single-spa.js.org/docs/microfrontends-concept/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 11 · Renderização | Ref.: R22, R23" -->
<!-- _class: compact -->

# CSR, SSR e SSG: onde e quando gerar a página?

| Estratégia | Geração principal do HTML | Contrapartida |
|---|---|---|
| CSR | No navegador | Conteúdo depende de baixar e executar JS |
| SSR | No servidor, por requisição | Trabalho e infraestrutura no servidor |
| SSG | Antecipadamente, no build | Atualização depende de novo build/revalidação definida |

**SPA descreve navegação; não é sinônimo de CSR.**

Essas estratégias podem conviver e não determinam as pastas de negócio.

<!--
A linha SSG cita revalidação como política adicional de alguns frameworks, não parte obrigatória da definição. Desempenho não é garantido pelo nome da estratégia: rede, dados, cache e JavaScript também importam. Não ensine SSR como sempre mais rápido em qualquer métrica.

Fontes deste slide:
R22: Next.js — Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
R23: Angular — Server-side and hybrid rendering — https://angular.dev/guide/ssr
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 11 · Renderização | Ref.: R22, R23" -->
<!-- _class: tree -->

# Renderização · estruturas possíveis

```text
React com Next.js               Angular com SSR configurado
src/                            src/
├── app/                        ├── app/
│   └── evento/                 │   ├── evento/evento-page.ts
│       ├── page.tsx            │   ├── app.routes.ts
│       └── Selecionar.tsx      │   ├── app.routes.server.ts
└── server/                     │   └── app.config.server.ts
    └── parse-evento.ts         ├── main.server.ts
                                └── server.ts
```

**Não existe uma pasta universal “SSR”.** A estrutura depende da ferramenta.

<!--
O framework decide os pontos de entrada de renderização, mas o negócio ainda pode ser organizado por features. Use o scaffold do projeto para os arquivos completos de bootstrap. As páginas do Next são Server Components por padrão no App Router.

Fontes deste slide:
R22: Next.js — Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
R23: Angular — Server-side and hybrid rendering — https://angular.dev/guide/ssr
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 11 · Renderização | Ref.: R22" -->
<!-- _class: code compact -->

# Renderização · React com Next.js

```tsx
// app/evento/page.tsx — Server Component.
import { Selecionar } from './Selecionar';
import { parseEvento } from '../../server/parse-evento';
export default async function Page() {
  const base = process.env.CATALOGO_URL;
  if (!base) throw new Error('Configure CATALOGO_URL');
  const r = await fetch(`${base}/eventos/react-day`, { cache: 'no-store' });
  if (!r.ok) throw new Error('Evento indisponível');
  const evento = parseEvento(await r.json());
  return <><h1>{evento.titulo}</h1><Selecionar /></>;
}
```

```tsx
// app/evento/Selecionar.tsx — outro arquivo.
'use client';
import { useState } from 'react';
export function Selecionar() {
  const [qtd, setQtd] = useState(1);
  return <button onClick={() => setQtd(q => Math.min(6, q + 1))}>{qtd}</button>;
}
```

<!--
Configure CATALOGO_URL como a URL absoluta de uma API confiável, sem barra final neste exemplo. Não coloque segredos nas props do cliente. RSC e SSR são conceitos diferentes; um Client Component também pode participar da geração inicial de HTML no servidor. O no-store evita depender de defaults de cache e indica a intenção de consulta atualizada.

Fontes deste slide:
R22: Next.js — Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 11 · Renderização | Ref.: R23" -->
<!-- _class: code compact -->

# Renderização · Angular por rota

```ts
// app.routes.server.ts
import { RenderMode, type ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  { path: 'sobre', renderMode: RenderMode.Prerender },
  { path: 'evento', renderMode: RenderMode.Server },
  { path: 'painel', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];

// app.config.server.ts — mesclar à configuração do projeto.
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';
export const serverConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};
```

As rotas de renderização complementam as rotas da aplicação.

<!--
O projeto precisa ter @angular/ssr configurado; adicionar este objeto sozinho a uma aplicação CSR não cria servidor. O scaffold deve mesclar serverConfig com a configuração principal e registrar hidratação quando apropriado. Rotas dinâmicas pré-renderizadas exigem definir quais parâmetros gerar.

Fontes deste slide:
R23: Angular — Server-side and hybrid rendering — https://angular.dev/guide/ssr
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 11 · Renderização | Ref.: R22, R23" -->
<!-- _class: compact -->

# Renderização · ganhos e limites por escolha

| Escolha | Pontos positivos | Pontos negativos |
|---|---|---|
| CSR | Modelo centrado no browser; assets estáticos | JS e requisições podem atrasar o conteúdo |
| SSR | HTML inicial com dados da requisição | Custo de execução, cache e hidratação |
| SSG | Distribuição de HTML já produzido | Conteúdo pode ficar desatualizado |
| Server Components | Execução de partes da árvore no servidor | Novas fronteiras e restrições de composição |

**Considere:** tipo de página, atualização, indexação e volume de interatividade.

**Evite:** escolher uma estratégia única para todas as rotas por hábito.

<!--
Server Components não são um quarto local/instante de geração do HTML e não são equivalentes a SSR. A tabela adiciona uma decisão complementar. Não há equivalência direta entre Server Components do React e renderização SSR de componentes Angular.

Fontes deste slide:
R22: Next.js — Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
R23: Angular — Server-side and hybrid rendering — https://angular.dev/guide/ssr
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 12 · Ilhas e carregamento seletivo | Ref.: R24, R25" -->

# Ilhas: interatividade onde ela é necessária

**Problema:** um site de conteúdo envia uma aplicação grande para poucas interações.

**Ideia:** HTML como base e partes interativas ativadas seletivamente.

```text
React + Astro                    Angular: aproximação para comparar
src/pages/evento.astro            src/app/evento/evento-page.ts
src/components/Selecionar.tsx     src/app/seat-map/seat-map.ts
                                 @defer controla carregamento
```

**Ilhas no Astro e `@defer` no Angular não são a mesma arquitetura.**

<!--
No Astro, ilhas de cliente podem ter ciclos de hidratação independentes. Angular oferece carregamento adiado e também mecanismos de hidratação incremental em contextos SSR. Não atribua a @defer sozinho todas as propriedades de uma arquitetura de ilhas.

Fontes deste slide:
R24: Astro — Islands architecture — https://docs.astro.build/en/concepts/islands/
R25: Angular — Deferred loading with @defer — https://angular.dev/guide/templates/defer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 12 · Ilhas e carregamento seletivo | Ref.: R24" -->
<!-- _class: code compact -->

# Ilhas · componente React dentro do Astro

```astro
---
// src/pages/evento.astro — com a integração React do Astro.
import { Selecionar } from '../components/Selecionar';
---
<h1>React Day</h1>
<p>Descrição do evento, programação e localização.</p>
<Selecionar client:visible />
```

```tsx
// src/components/Selecionar.tsx
import { useState } from 'react';
export function Selecionar() {
  const [qtd, setQtd] = useState(1);
  return <button onClick={() => setQtd(q => Math.min(6, q + 1))}>
    {qtd} ingresso(s)
  </button>;
}
```

`client:visible` hidrata a ilha quando ela entra na área visível.

<!--
A sintaxe client:visible é do Astro, não do React. A integração React precisa estar instalada/configurada no projeto Astro. O componente é renderizado em HTML inicialmente, e a interatividade chega com a hidratação. O conteúdo essencial não deve depender de uma interação indisponível antes disso.

Fontes deste slide:
R24: Astro — Islands architecture — https://docs.astro.build/en/concepts/islands/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 12 · Ilhas e carregamento seletivo | Ref.: R25" -->
<!-- _class: code -->

# Angular · adiar um bloco interativo

```ts
import { Component } from '@angular/core';
import { SeatMap } from '../seat-map/seat-map';
@Component({
  selector: 'ef-evento-page', standalone: true,
  imports: [SeatMap],
  template: `<h1>React Day</h1>
    @defer (on viewport) {
      <ef-seat-map />
    } @placeholder {
      <p>O mapa de assentos será carregado aqui.</p>
    } @error {
      <p>Não foi possível carregar o mapa.</p>
    }`,
})
export class EventoPage {}
```

`SeatMap` precisa atender às condições de carregamento adiado.

<!--
Neste exemplo, SeatMap é standalone e não é usado fora do bloco defer no mesmo arquivo; seu selector é ef-seat-map. O placeholder tem um elemento observável para on viewport. Não confunda adiar o código com adiar automaticamente uma chamada de dados executada em outro serviço. Hidratação incremental exige configuração própria.

Fontes deste slide:
R25: Angular — Deferred loading with @defer — https://angular.dev/guide/templates/defer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 12 · Ilhas e carregamento seletivo | Ref.: R24, R25" -->
<!-- _class: trade -->

# Ilhas / adiamento · ganhos e limites

**Pontos positivos**

Possibilidade de reduzir JS inicial; interatividade concentrada; conteúdo estático preservado.

**Pontos negativos**

Coordenação entre partes; cuidado com hidratação, estado compartilhado e conteúdo crítico.

**Faz sentido:** portais, documentação e páginas com interações pontuais ou blocos pesados não imediatos.

**Evite quando:** a experiência é um aplicativo intensamente interativo que exige coordenação contínua.

<!--
A economia depende do que é realmente enviado e executado; meça o bundle e o comportamento do usuário. Esta avaliação reúne abordagens relacionadas, preservando suas diferenças: @defer não transforma uma aplicação Angular inteira em Astro.

Fontes deste slide:
R24: Astro — Islands architecture — https://docs.astro.build/en/concepts/islands/
R25: Angular — Deferred loading with @defer — https://angular.dev/guide/templates/defer
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF | Ref.: R26, R27" -->

# BFF: uma API orientada à experiência

**Problema:** a tela precisa coordenar várias APIs e formatos.

```text
React ou Angular → BFF → serviço de eventos
                       → serviço de disponibilidade
                       → serviço de inscrições
```

O BFF adapta e agrega respostas para a interface.

**Ele executa no servidor.** Um service Angular ou um hook React no navegador não é um BFF.

<!--
O BFF pode existir junto do servidor do frontend ou como serviço separado. Não precisa reimplementar regras centrais do backend. Uma aplicação pode ter BFFs diferentes para experiências com necessidades distintas.

Fontes deste slide:
R26: Microsoft — Backends for Frontends — https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
R27: Next.js — Backend for Frontend — https://nextjs.org/docs/app/guides/backend-for-frontend
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF | Ref.: R26, R27, R28" -->
<!-- _class: tree -->

# BFF · estruturas possíveis

```text
React com Next.js                  Angular + backend Node
src/                               apps/
├── app/api/resumo/route.ts         ├── web-angular/src/app/
├── app/evento/page.tsx             │   └── evento/resumo-api.ts
└── server/                        └── web-bff/src/
    ├── montar-resumo.ts               ├── resumo-router.ts
    └── upstreams.ts                   ├── montar-resumo.ts
                                      └── upstreams.ts
```

`upstreams.ts` encapsula chamadas a serviços confiáveis e valida suas respostas.

A camada do servidor não deve ser importada como código de runtime pelo cliente.

<!--
Os próximos trechos demonstram agregação e endpoints, não um backend completo. Os adaptadores upstreams precisam implementar Consultas, com URLs de configuração confiáveis, timeouts e validação. Em Next, marque módulos exclusivos de servidor conforme o mecanismo server-only do projeto.

Fontes deste slide:
R26: Microsoft — Backends for Frontends — https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
R27: Next.js — Backend for Frontend — https://nextjs.org/docs/app/guides/backend-for-frontend
R28: Next.js — Data Security — https://nextjs.org/docs/app/guides/data-security
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF" -->
<!-- _class: code -->

# BFF · agregação independente da UI

```ts
// montar-resumo.ts — executado somente no servidor.
export type Consultas = {
  evento: () => Promise<{ id: string; titulo: string }>;
  vagas: () => Promise<number>;
};

export async function montarResumo(api: Consultas) {
  const [evento, vagas] = await Promise.all([
    api.evento(), api.vagas(),
  ]);
  return { ...evento, disponivel: vagas > 0 };
}
```

Política deste exemplo: **se uma consulta falhar, o resumo falha**.

A disponibilidade exibida não reserva ingressos nem garante a compra.

<!--
As funções consultam o mesmo evento, definido no adaptador do caso. Promise.all executa consultas independentes em paralelo, mas não cancela a outra automaticamente quando uma falha. Um produto real precisa escolher timeout, resultado parcial, cancelamento e observabilidade. A resposta deve expor apenas campos necessários.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF | Ref.: R27" -->
<!-- _class: code -->

# BFF · endpoint na stack React/Next

```ts
// app/api/resumo/route.ts — endpoint de backend, não componente React.
import { montarResumo } from '../../../server/montar-resumo';
import { api } from '../../../server/upstreams';

export async function GET() {
  try {
    const resumo = await montarResumo(api);
    return Response.json(resumo, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ erro: 'Resumo indisponível' }, { status: 502 });
  }
}
```

Um cliente React pode consultar `/api/resumo` com sua camada de dados.

<!--
IMPORTANTE: na árvore apresentada, route.ts está em src/app/api/resumo. O import correto para src/server exige ../../../server, porque três .. retornam a src. O endpoint é público no exemplo e apenas retorna informações públicas de catálogo. Para dados privados, valide sessão e autorização; não confie em esconder o botão. Server Components podem chamar a lógica diretamente sem HTTP ao próprio Route Handler.

Fontes deste slide:
R27: Next.js — Backend for Frontend — https://nextjs.org/docs/app/guides/backend-for-frontend
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF | Ref.: R26" -->
<!-- _class: code -->

# BFF · endpoint para a aplicação Angular

```ts
// web-bff/src/resumo-router.ts — aplicação Node com Express.
import { Router } from 'express';
import { montarResumo } from './montar-resumo';
import { api } from './upstreams';
export const resumoRouter = Router();

resumoRouter.get('/bff/resumo', async (_req, res) => {
  try {
    res.setHeader('Cache-Control', 'no-store');
    res.json(await montarResumo(api));
  } catch {
    res.status(502).json({ erro: 'Resumo indisponível' });
  }
});
```

O servidor registra `app.use(resumoRouter)`. Angular continua sendo o cliente.

<!--
Express é uma escolha ilustrativa, não um requisito Angular. Registre o router antes de um fallback de SPA. Configure proxy para a mesma origem ou uma política CORS adequada. O código do servidor não deve ser compilado para o bundle Angular. O bootstrap HTTP e os upstreams não estão incluídos nesta apresentação.

Fontes deste slide:
R26: Microsoft — Backends for Frontends — https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF | Ref.: R31" -->
<!-- _class: code compact -->

# BFF · contrato consumido pelos clientes

```ts
// React: camada de dados; a UI consome essa função.
export async function carregarResumo(): Promise<unknown> {
  const r = await fetch('/api/resumo');
  if (!r.ok) throw new Error('Resumo indisponível');
  return r.json(); // validar/decodificar antes de expor ao domínio.
}
```

```ts
// Angular: resumo-api.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ResumoApi {
  private readonly http = inject(HttpClient);
  carregar() { return this.http.get<unknown>('/bff/resumo'); }
}
```

O contrato é único para cada experiência; o transporte continua fora da UI.

<!--
A resposta é unknown intencionalmente: não estamos fingindo que uma interface TypeScript valida JSON. Decodifique o contrato antes de entregá-lo à UI tipada. No Angular, HttpClient exige provideHttpClient; a requisição é executada quando o Observable é consumido. Acrescente tratamento de erro na camada de apresentação e evite múltiplas subscrições não intencionais.

Fontes deste slide:
R31: Angular — Setting up HttpClient — https://angular.dev/guide/http/setup
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 13 · BFF | Ref.: R26, R27" -->
<!-- _class: trade -->

# BFF · ganhos e limites

**Pontos positivos**

Agregação orientada à tela; adaptação de contratos; credenciais de serviços podem ficar no servidor.

**Pontos negativos**

Mais backend para manter; outro ponto de falha; risco de duplicar negócio e criar repasses inúteis.

**Faz sentido:** uma experiência precisa coordenar várias APIs ou tem necessidades específicas.

**Evite quando:** o BFF apenas encaminha tudo sem simplificar segurança, contrato ou orquestração.

<!--
Não exponha segredos mesmo quando usa BFF. A existência dessa camada não resolve automaticamente CSRF, XSS ou autorização. Cache de dados privados exige isolamento correto por usuário/tenant. Falhas upstream devem ser observáveis sem vazar detalhes sensíveis para o cliente.

Fontes deste slide:
R26: Microsoft — Backends for Frontends — https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends
R27: Next.js — Backend for Frontend — https://nextjs.org/docs/app/guides/backend-for-frontend
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 14 · Escolha e evolução" -->
<!-- _class: compact -->

# Como escolher: problema antes da ferramenta

| Principal problema | Abordagem a avaliar |
|---|---|
| Interface repetitiva ou inconsistente | Componentes + design system |
| Código de uma capacidade espalhado | Feature-Based + módulos |
| Regra presa ao framework ou ao transporte | Clean / Hexagonal |
| Time sem convenção de fronteiras | FSD ou política modular explícita |
| Tela com muitas transições | MVVM / fluxo unidirecional |
| Releases de equipes bloqueando uns aos outros | Micro-frontends |
| Conteúdo e JS inicial inadequados | Estratégia de renderização / ilhas |
| Cliente coordenando muitas APIs | BFF |

<!--
Tabela de análise do estudo de caso, não prescrição automática. Para cada linha, peça uma alternativa mais simples e pergunte qual evidência justificaria aumentar a complexidade. O nome da tecnologia deve vir depois da necessidade.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 14 · Escolha e evolução" -->
<!-- _class: tree -->

# Uma combinação possível para o EventFlow

```text
app/                         composição e rotas
features/
├── eventos/                 organização simples por capacidade
├── compra/
│   ├── domain/              regras relevantes isoladas
│   ├── application/         casos de uso
│   ├── infrastructure/      adaptadores
│   └── presentation/        componentes e estado da UI
└── inscricoes/
shared/ui/                   base visual comum
server/                      BFF, se houver necessidade
```

**Um deploy no início.** Renderização escolhida por página; extração futura de módulos somente quando justificada.

<!--
Esta estrutura é Feature-Based com Clean localizada; não é uma implementação canônica de FSD. No Angular, server/BFF fica no projeto de servidor, não dentro do bundle src/app. Evite copiar toda a árvore para cada CRUD apenas por simetria.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 14 · Escolha e evolução | Ref.: R30" -->
<!-- _class: code -->

# Testes: transformar fronteiras em evidência

```ts
// calcular-total.spec.ts — exemplo com Vitest.
import { describe, it, expect } from 'vitest';
import { calcularTotal } from './calcular-total';

describe('simulação de ingressos', () => {
  it('calcula dois ingressos', () => {
    expect(calcularTotal(15000, 2)).toBe(30000);
  });
  it('rejeita quantidade acima do limite', () => {
    expect(() => calcularTotal(15000, 7)).toThrow();
  });
});
```

**Complete a proteção:** integração do adaptador, interação da UI, contratos e jornadas críticas ponta a ponta.

<!--
O teste da função pura é o mesmo independentemente de React ou Angular. Vitest é apenas a sintaxe do runner deste exemplo, não requisito arquitetural. Testes de UI devem observar o comportamento percebido pelo usuário; um teste de função não substitui um teste do fluxo real. Acrescente limites inferiores, preço inválido e overflow ao demonstrar.

Fontes deste slide:
R30: Testing Library — Guiding Principles — https://testing-library.com/docs/guiding-principles/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 14 · Escolha e evolução | Ref.: R28, R22, R30" -->
<!-- _class: compact -->

# A arquitetura também precisa tratar o usuário

| Preocupação | Decisão concreta a registrar |
|---|---|
| Segurança | Autorização no servidor; dados mínimos; segredos fora do cliente |
| Estado assíncrono | Carregamento, vazio, erro, cancelamento e repetição |
| Desempenho | JS por rota, estratégia de cache e carregamento |
| Acessibilidade | Semântica, foco, teclado e anúncios de status |
| Operação | Logs, rastreio, versões e rollback |

**Pastas bem organizadas não compensam uma experiência quebrada.**

<!--
Estas são decisões propostas para o caso. Em SSR, evite estado de usuário em singletons globais e cache compartilhado indevidamente. Em micro-frontends, falha no remoto deve ter fallback. Não considere autenticação no navegador equivalente a autorização no servidor.

Fontes deste slide:
R28: Next.js — Data Security — https://nextjs.org/docs/app/guides/data-security
R22: Next.js — Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
R30: Testing Library — Guiding Principles — https://testing-library.com/docs/guiding-principles/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 14 · Escolha e evolução" -->

# Registre a escolha em um ADR pequeno

**ADR: começar com um monólito modular por funcionalidades.**

**Contexto:** uma equipe; catálogo e compra evoluem juntos; regras de cálculo mudam com frequência.

**Decisão:** fronteiras por capacidade, Clean apenas em compra e UI compartilhada pequena.

**Consequências:** deploy conjunto; revisão de imports; menos infraestrutura inicial.

**Revisitar quando:** autonomia de releases virar um problema recorrente e mensurável.

<!--
ADR significa registro de decisão arquitetural. O modelo é uma proposta didática de documentação, não uma norma específica. Inclua alternativas consideradas e por que foram descartadas. Um documento curto, atualizado e verificável é mais útil que um diagrama sem relação com o código.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · 14 · Escolha e evolução" -->
<!-- _class: lead -->

# A pergunta que fica

**Qual mudança queremos facilitar — e qual custo aceitamos pagar por isso?**

Arquitetura é decidir responsabilidades e limites.

Pastas representam essas decisões.
Código, testes e operação mostram se elas são reais.

**Comece com o necessário. Evolua com evidências.**

<!--
Retome a pergunta inicial sobre uma alteração pequena que virou trabalho grande. Peça um exemplo de cada dimensão: organização, estado, renderização, deploy e integração. Use os apêndices apenas se precisar aprofundar a demonstração.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Apêndice · Execução dos exemplos" -->
<!-- _class: code -->

# Apêndice · validar o JSON da API

```ts
// data/parse-eventos.ts — contrato da versão em camadas.
import type { Evento } from '../model/evento';
function isEvento(value: unknown): value is Evento {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === 'string' && v.id.length > 0
    && typeof v.titulo === 'string'
    && typeof v.precoCentavos === 'number'
    && Number.isSafeInteger(v.precoCentavos) && v.precoCentavos >= 0
    && typeof v.vagas === 'number'
    && Number.isSafeInteger(v.vagas) && v.vagas >= 0;
}
```

O adaptador não deve confiar apenas em `as Evento` ou em um genérico do cliente HTTP.

<!--
O exemplo valida apenas o contrato simplificado da aula. Pode ser substituído por um schema de validação, conforme as dependências do projeto. Para Clean, copie esse parser para infrastructure e mantenha um contrato DTO local, ajustando o import de Evento. Não importe um schema do framework dentro do núcleo apenas por conveniência.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Apêndice · Execução dos exemplos | Ref.: R28" -->
<!-- _class: code -->

# Apêndice · decodificar objeto e lista

```ts
// Continuação de data/parse-eventos.ts.
export function parseEvento(value: unknown): Evento {
  if (!isEvento(value)) throw new Error('Formato de evento inválido');
  return value;
}

export function parseEventos(value: unknown): Evento[] {
  if (!Array.isArray(value)) throw new Error('Formato de lista inválido');
  return value.map(parseEvento);
}
```

Para os blocos Clean e Next, exponha `parseEvento` no arquivo indicado nos imports e ajuste o caminho do contrato.

**Validar formato não substitui autorização nem a validação de negócio.**

<!--
Este trecho continua o mesmo arquivo do slide anterior e usa isEvento e Evento. Nos blocos que importam ./parse-evento, o arquivo pode conter as mesmas funções ou reexportar parseEvento do parser local. Em um projeto real, faça o mapeamento do DTO externo para o domínio quando seus modelos forem diferentes.

Fontes deste slide:
R28: Next.js — Data Security — https://nextjs.org/docs/app/guides/data-security
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Apêndice · Execução dos exemplos | Ref.: R19, R31, R34" -->
<!-- _class: code compact -->

# Apêndice · pontos de entrada mínimos

```tsx
// React: src/main.tsx — com React/ReactDOM e JSX configurados.
import { createRoot } from 'react-dom/client';
import { App } from './App';
const host = document.getElementById('root');
if (!host) throw new Error('Elemento #root não encontrado');
createRoot(host).render(<App />);
```

```ts
// Angular: src/main.ts — App e routes pertencem ao projeto.
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
bootstrapApplication(App, {
  providers: [provideHttpClient(), provideRouter(routes)],
}).catch(console.error);
```

<!--
Use um projeto React/TypeScript ou Angular previamente criado, com suas dependências e versão de Node compatíveis. Não substitua por este bootstrap mínimo a configuração SSR gerada pelo framework. Para Next e Astro, os pontos de entrada são controlados por suas próprias ferramentas. O servidor HTTP de exemplo não é fornecido.

Fontes deste slide:
R19: React — createRoot — https://react.dev/reference/react-dom/client/createRoot
R31: Angular — Setting up HttpClient — https://angular.dev/guide/http/setup
R34: Angular — Define routes — https://angular.dev/guide/routing/define-routes
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Apêndice · Execução dos exemplos | Ref.: R32" -->
<!-- _class: code -->

# Apêndice · usar este arquivo no Marp

**Editor:** abra o `.md` no VS Code com a extensão Marp habilitada.

**Apresentação:** os comentários de cada slide contêm notas do professor.

```bash
# Converter o Markdown em uma apresentação HTML.
npx @marp-team/marp-cli aula-arquitetura-front-end.md   -o aula-arquitetura-front-end.html
```

O arquivo usa tema padrão, CSS embutido e formato **16:9**.

Não depende de imagens externas nem de um plugin de diagramas.

<!--
O comando requer Node/npm e acesso para obter o CLI, caso ainda não esteja instalado. O comando pode ser executado na pasta do arquivo. Os separadores --- internos aos exemplos Astro estão protegidos por blocos de código e não representam novos slides. As referências abaixo usam os identificadores presentes nos rodapés.

Fontes deste slide:
R32: Marp — Markdown Presentation Ecosystem — https://marp.app/
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Referências" -->
<!-- _class: references -->

# Referências · fundamentos e organização

**R01** · [Martin Fowler — Software Architecture Guide](https://martinfowler.com/architecture/)

**R02** · [React — Thinking in React](https://react.dev/learn/thinking-in-react)

**R03** · [Angular — Style Guide](https://angular.dev/style-guide)

**R04** · [Brad Frost — Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/)

**R05** · [Microsoft — N-tier architecture](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier)

**R06** · [Nx — Architecting Angular Applications](https://nx.dev/blog/architecting-angular-applications)

Consulta às fontes: **6 de outubro de 2026**. Exemplos e árvores: adaptações didáticas.

<!--
As fontes fundamentam conceitos e APIs. As estruturas de diretório, regras do EventFlow, exemplos de código e avaliações de custo/benefício são adaptações para esta aula, não cópias de uma estrutura oficial. Consulte compatibilidade ao usar versões diferentes dos frameworks.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Referências" -->
<!-- _class: references -->

# Referências · núcleo e fronteiras

**R07** · [Robert C. Martin — The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

**R08** · [Alistair Cockburn — Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

**R09** · [Feature-Sliced Design — Layers](https://feature-sliced.design/docs/reference/layers)

**R10** · [Feature-Sliced Design — Public API](https://feature-sliced.design/docs/reference/public-api)

**R33** · [Feature-Sliced Design — Slices and segments](https://feature-sliced.design/docs/reference/slices-segments)

**R11** · [Microsoft — Model-View-ViewModel](https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm)

Consulta às fontes: **6 de outubro de 2026**. Exemplos e árvores: adaptações didáticas.

<!--
As fontes fundamentam conceitos e APIs. As estruturas de diretório, regras do EventFlow, exemplos de código e avaliações de custo/benefício são adaptações para esta aula, não cópias de uma estrutura oficial. Consulte compatibilidade ao usar versões diferentes dos frameworks.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Referências" -->
<!-- _class: references -->

# Referências · estado e composição

**R12** · [Redux — Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

**R13** · [React — useReducer](https://react.dev/reference/react/useReducer)

**R14** · [Angular — Signals](https://angular.dev/guide/signals)

**R15** · [TanStack Query — Overview](https://tanstack.com/query/latest/docs/framework/react/overview)

**R35** · [Angular — Component inputs](https://angular.dev/guide/components/inputs)

**R34** · [Angular — Define routes](https://angular.dev/guide/routing/define-routes)

Consulta às fontes: **6 de outubro de 2026**. Exemplos e árvores: adaptações didáticas.

<!--
As fontes fundamentam conceitos e APIs. As estruturas de diretório, regras do EventFlow, exemplos de código e avaliações de custo/benefício são adaptações para esta aula, não cópias de uma estrutura oficial. Consulte compatibilidade ao usar versões diferentes dos frameworks.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Referências" -->
<!-- _class: references -->

# Referências · entrega independente

**R16** · [Cam Jackson — Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)

**R17** · [webpack — Module Federation](https://webpack.js.org/concepts/module-federation/)

**R18** · [single-spa — Microfrontends Overview](https://single-spa.js.org/docs/microfrontends-concept/)

**R19** · [React — createRoot](https://react.dev/reference/react-dom/client/createRoot)

**R20** · [Angular — createComponent](https://angular.dev/api/core/createComponent)

**R21** · [Angular — createApplication](https://angular.dev/api/platform-browser/createApplication)

Consulta às fontes: **6 de outubro de 2026**. Exemplos e árvores: adaptações didáticas.

<!--
As fontes fundamentam conceitos e APIs. As estruturas de diretório, regras do EventFlow, exemplos de código e avaliações de custo/benefício são adaptações para esta aula, não cópias de uma estrutura oficial. Consulte compatibilidade ao usar versões diferentes dos frameworks.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Referências" -->
<!-- _class: references -->

# Referências · execução e integração

**R22** · [Next.js — Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

**R23** · [Angular — Server-side and hybrid rendering](https://angular.dev/guide/ssr)

**R24** · [Astro — Islands architecture](https://docs.astro.build/en/concepts/islands/)

**R25** · [Angular — Deferred loading with @defer](https://angular.dev/guide/templates/defer)

**R26** · [Microsoft — Backends for Frontends](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)

**R27** · [Next.js — Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend)

Consulta às fontes: **6 de outubro de 2026**. Exemplos e árvores: adaptações didáticas.

<!--
As fontes fundamentam conceitos e APIs. As estruturas de diretório, regras do EventFlow, exemplos de código e avaliações de custo/benefício são adaptações para esta aula, não cópias de uma estrutura oficial. Consulte compatibilidade ao usar versões diferentes dos frameworks.
-->

---

<!-- _footer: "ARQUITETURA FRONT-END · Referências" -->
<!-- _class: references -->

# Referências · qualidade e ferramentas

**R28** · [Next.js — Data Security](https://nextjs.org/docs/app/guides/data-security)

**R29** · [Nx — Enforce Module Boundaries](https://nx.dev/docs/features/enforce-module-boundaries)

**R30** · [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/)

**R31** · [Angular — Setting up HttpClient](https://angular.dev/guide/http/setup)

**R32** · [Marp — Markdown Presentation Ecosystem](https://marp.app/)

**R36** · [Next.js — Multi-zones](https://nextjs.org/docs/app/guides/multi-zones)

Consulta às fontes: **6 de outubro de 2026**. Exemplos e árvores: adaptações didáticas.

<!--
As fontes fundamentam conceitos e APIs. As estruturas de diretório, regras do EventFlow, exemplos de código e avaliações de custo/benefício são adaptações para esta aula, não cópias de uma estrutura oficial. Consulte compatibilidade ao usar versões diferentes dos frameworks.
-->
