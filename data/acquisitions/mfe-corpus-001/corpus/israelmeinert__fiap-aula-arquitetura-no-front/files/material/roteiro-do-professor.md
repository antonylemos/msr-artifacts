# Roteiro do professor para arquitetura front-end

A aula usa o EventFlow para comparar decisões sem trocar de domínio. Ao final, a turma deve explicar responsabilidades, direção dos imports, fluxo em execução e consequências de uma escolha. Os 104 slides são modulares; selecione a trilha conforme a experiência da turma.

## Preparação

1. Instale as dependências na raiz com `npm ci` e rode `npm run check`, `npm test` e o build dos blocos que pretende demonstrar.
2. Abra a apresentação HTML e as pastas correspondentes. Use o README de cada bloco como índice do código.
3. Inicie um exemplo antes da exposição, confirme o endereço e deixe o terminal dos cenários disponível.
4. No bloco de renderização, prepare o build de produção. No bloco de ilhas, abra Network e deixe a seleção inicialmente fora da área visível.

## Trilha essencial sugerida de 120 minutos

| Tempo | Slides e prática | Evidência esperada |
|---|---|---|
| 0–15 min | Fundamentos, slides 1–11 | Turma diferencia pastas, contratos e dependências |
| 15–30 min | 01 Componentes | Card emite seleção; página controla o estado |
| 30–50 min | 03 Camadas | HTTP e filtro possuem responsáveis diferentes |
| 50–75 min | 04 Funcionalidades e módulos | Alteração de eventos fica local; imports passam pela API pública |
| 75–95 min | Comparação rápida com 05 Clean | Caso de uso recebe uma porta; regra é testada sem UI |
| 95–115 min | 14 Escolha e evolução e exercício de ADR | Grupo defende uma escolha por requisito |
| 115–120 min | Pergunta de fechamento | Qual mudança a estrutura escolhida torna mais barata? |

Este tempo é uma sugestão de condução. Os demais blocos cabem em encontros adicionais ou atividades de aprofundamento.

## Aprofundamentos

| Encontro sugerido | Blocos | Demonstração |
|---|---|---|
| Organização da UI | 01, 02, 07 | Contrato do card, composição de átomos e regra de camadas do FSD |
| Regras e estado | 05, 06, 08, 09 | Domínio puro, troca de adaptador, total derivado e reducer |
| Execução e integração | 10, 11, 12, 13 | Remoto fora do ar, HTML bruto, chunk adiado e BFF com erro |

## Sequência de demonstração por bloco

### 01 Componentes

Abra [a pasta do bloco](../exemplos/01-componentes/README.md), slides 12–16. Dividir uma tela em unidades com contratos claros de entrada e saída.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Página → props/inputs → CardEvento → callback/output → página`.

Proponha: Mova a decisão da seleção para o pai. Depois adicione um segundo card e confirme que a seleção continua correta.

Feche discutindo o custo: Composição reduz responsabilidades da tela. Um card reutilizável sozinho não define regras de negócio, dados ou entrega.

### 02 Atomic Design

Abra [a pasta do bloco](../exemplos/02-atomic-design/README.md), slides 17–21. Organizar unidades visuais e sua composição em um pequeno sistema de UI.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Página → template → organismo/molécula → átomos`.

Proponha: Adicione uma indicação de quantidade de resultados. Decida se ela pertence à página, à molécula ou ao organismo e justifique.

Feche discutindo o custo: A classificação ajuda o vocabulário visual. Ela não estabelece as fronteiras de catálogo, compra ou integrações.

### 03 Camadas

Abra [a pasta do bloco](../exemplos/03-camadas/README.md), slides 22–27. Separar apresentação, aplicação e acesso a dados mantendo a dependência tradicional.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Apresentação → listarAbertos → listarEventos → parser → API`.

Proponha: Inclua um filtro de preço máximo na aplicação. Use os cenários esgotado e invalido para conferir a lista vazia e o erro.

Feche discutindo o custo: A aplicação importa o acesso HTTP concreto. Essa dependência é intencional para comparar com Clean e Hexagonal.

### 04 Funcionalidades e monólito modular

Abra [a pasta do bloco](../exemplos/04-feature-based/README.md), slides 28–33. Agrupar arquivos por capacidade do produto e controlar dependências entre módulos.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `App → API pública de eventos e compra; features → shared/ui`.

Proponha: Crie a feature inscrições e exponha apenas sua tela ou suas rotas em index.ts. Tente um import profundo e execute npm run check.

Feche discutindo o custo: Há um único release. Rotas Angular carregadas sob demanda geram chunks, mas continuam no mesmo produto.

### 05 Clean Architecture

Abra [a pasta do bloco](../exemplos/05-clean-architecture/README.md), slides 34–43. Proteger o cálculo e o caso de uso das ferramentas de interface e transporte.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Imports: apresentação → aplicação → domínio; infraestrutura → contrato da aplicação`.

Proponha: Altere a política de cálculo no domínio e teste sem abrir o navegador. Localize todos os imports de catalogoHttp e explique por que estão na composição.

Feche discutindo o custo: O fluxo em execução passa pelo adaptador HTTP, mas o caso de uso não importa esse adaptador. A simulação não reserva nem cobra ingressos.

### 06 Hexagonal

Abra [a pasta do bloco](../exemplos/06-hexagonal/README.md), slides 44–49. Trocar uma integração preservando a porta e o núcleo da operação.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `UI → porta de entrada (Simular) → core → porta de saída (Catalogo) → HTTP ou memória`.

Proponha: Ative o cenário erro e compare os adaptadores: memória deve continuar calculando 30000 centavos para dois ingressos; HTTP deve informar falha.

Feche discutindo o custo: A arquitetura precisa de contratos estáveis e composição explícita. Renomear services para adapters não produz isolamento por si só.

### 07 Feature-Sliced Design

Abra [a pasta do bloco](../exemplos/07-feature-sliced-design/README.md), slides 50–55. Aplicar convenções de camadas, slices e APIs públicas ao front-end.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `app → pages → widgets → features → entities → shared`.

Proponha: Faça shared/ui importar SelecionarIngresso e execute npm run check. Explique a violação e desfaça o import.

Feche discutindo o custo: FSD e organização simples por funcionalidades têm regras diferentes. Entities pode incluir UI; não equivale à entidade da Clean.

### 08 MVVM

Abra [a pasta do bloco](../exemplos/08-mvvm/README.md), slides 56–60. Separar o comportamento de apresentação da View sem duplicar estado derivado.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `View → operações do ViewModel → estado; Model → cálculo do total`.

Proponha: Adicione diminuir() ao ViewModel e um botão à View. O limite inferior deve ser um e o total deve acompanhar a quantidade.

Feche discutindo o custo: Um hook não vira ViewModel somente por estar em outro arquivo. Regras de negócio continuam nas funções do Model.

### 09 Flux e estado

Abra [a pasta do bloco](../exemplos/09-flux/README.md), slides 61–66. Tornar transições de estado explícitas usando ações e um reducer puro.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Interação → ação → reducer → estado → interface`.

Proponha: Adicione uma ação remover e prove que vinte remoções não levam a quantidade abaixo de um. Evite HTTP e DOM no reducer.

Feche discutindo o custo: Este é um fluxo inspirado em Redux. Não instala Redux nem NgRx e não oferece automaticamente persistência ou devtools.

### 10 Micro-frontends

Abra [a pasta do bloco](../exemplos/10-micro-frontends/README.md), slides 67–72. Compor aplicações que possuem artefatos de build separados.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Shell → manifesto → módulo ESM remoto → mount(host) → cleanup()`.

Proponha: Abra catálogo, checkout e desmonte; depois pare um servidor remoto e observe o fallback. Recompile apenas catálogo e confirme que o shell continua sem novo build.

Feche discutindo o custo: A composição usa ESM por URL e manifesto. Há bundles separados e um caminho de publicação independente; o laboratório não provisiona um pipeline de deploy.

### 11 CSR, SSR e SSG

Abra [a pasta do bloco](../exemplos/11-renderizacao/README.md), slides 73–77. Comparar onde e quando o conteúdo principal é renderizado.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `SSR: requisição → servidor → HTML; SSG: build → HTML; CSR: navegador → interface`.

Proponha: Compare o HTML bruto das três rotas e repita requisições a /evento. No build de produção, verifique que /sobre mantém seu conteúdo entre requisições.

Feche discutindo o custo: Server Components e SSR são decisões diferentes. use client sozinho não elimina HTML inicial no servidor. O evento Angular usa dados fixos e TransferState para o horário.

### 12 Ilhas e carregamento seletivo

Abra [a pasta do bloco](../exemplos/12-ilhas/README.md), slides 78–81. Enviar interatividade de forma seletiva em páginas com conteúdo estático ou blocos adiáveis.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Astro: HTML → ilha client:visible; Angular: viewport → chunk @defer → componente`.

Proponha: Abra Network, filtre JavaScript e role a página até a seleção/mapa. Registre quais arquivos chegam antes e depois da rolagem.

Feche discutindo o custo: As abordagens têm propriedades diferentes. Este Angular usa CSR com carregamento adiado; não implementa ilhas independentes nem hidratação incremental.

### 13 Backend for Frontend

Abra [a pasta do bloco](../exemplos/13-bff/README.md), slides 82–88. Agregar duas APIs no servidor e expor um contrato específico para a tela.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `Cliente → BFF → evento + disponibilidade → Resumo`.

Proponha: Teste normal, esgotado, erro e invalido. A falha de qualquer upstream deve resultar em 502 e mensagem de nova tentativa no cliente.

Feche discutindo o custo: Disponibilidade é uma fotografia da consulta. Ela não reserva vaga. Promise.all inicia consultas em paralelo e não cancela a outra automaticamente quando há falha.

### 14 Escolha e evolução

Abra [a pasta do bloco](../exemplos/14-escolha-e-evolucao/README.md), slides 89–94. Escolher uma combinação a partir das mudanças esperadas no produto.

Comece pela árvore de pastas, acompanhe o arquivo indicado no README e faça a interação da tela. Desenhe a direção das dependências com a turma: `App → catálogo simples + compra com apresentação, aplicação, domínio e infraestrutura`.

Proponha: Escreva um ADR comparando esta solução com micro-frontends. Identifique a evidência que justificaria mudar a fronteira de deploy.

Feche discutindo o custo: A solução é uma referência para discussão. Avalie coesão, custo de operação, testes e frequência das mudanças antes de adotar mais camadas.

## Perguntas para verificar compreensão

- Onde a regra de quantidade deve ser validada além da interface?
- Qual arquivo conhece a URL do serviço? Quem importa esse arquivo?
- Como a UI recebe erro, vazio e carregamento?
- Qual dependência precisa mudar ao substituir HTTP por memória?
- Existe publicação independente ou apenas carregamento sob demanda?
- O total está armazenado ou calculado? Que erro uma segunda cópia poderia causar?
- Qual requisito do produto justifica o custo desta abordagem?

## Critérios de avaliação

Use a rubrica dos [exercícios](exercicios.md). Aceite propostas diferentes da solução de referência quando os contratos, requisitos e consequências forem consistentes. Não avalie pelo número de pastas ou pelo uso de uma ferramenta específica.

Os slides 95–98 ajudam na validação de JSON e no bootstrap; as referências dos slides 99–104 servem para consulta e aprofundamento.
