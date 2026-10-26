# Exercícios de arquitetura front-end

Faça as atividades no código das pastas. Escolha React ou Angular; use a outra implementação para comparar contratos. Entregue os arquivos alterados, as verificações executadas e uma explicação curta da decisão.

## Atividades por bloco

### 01 Componentes

[Pasta do exercício](../exemplos/01-componentes/README.md).

Mova a decisão da seleção para o pai. Depois adicione um segundo card e confirme que a seleção continua correta.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 02 Atomic Design

[Pasta do exercício](../exemplos/02-atomic-design/README.md).

Adicione uma indicação de quantidade de resultados. Decida se ela pertence à página, à molécula ou ao organismo e justifique.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 03 Camadas

[Pasta do exercício](../exemplos/03-camadas/README.md).

Inclua um filtro de preço máximo na aplicação. Use os cenários esgotado e invalido para conferir a lista vazia e o erro.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 04 Funcionalidades e monólito modular

[Pasta do exercício](../exemplos/04-feature-based/README.md).

Crie a feature inscrições e exponha apenas sua tela ou suas rotas em index.ts. Tente um import profundo e execute npm run check.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 05 Clean Architecture

[Pasta do exercício](../exemplos/05-clean-architecture/README.md).

Altere a política de cálculo no domínio e teste sem abrir o navegador. Localize todos os imports de catalogoHttp e explique por que estão na composição.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 06 Hexagonal

[Pasta do exercício](../exemplos/06-hexagonal/README.md).

Ative o cenário erro e compare os adaptadores: memória deve continuar calculando 30000 centavos para dois ingressos; HTTP deve informar falha.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 07 Feature-Sliced Design

[Pasta do exercício](../exemplos/07-feature-sliced-design/README.md).

Faça shared/ui importar SelecionarIngresso e execute npm run check. Explique a violação e desfaça o import.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 08 MVVM

[Pasta do exercício](../exemplos/08-mvvm/README.md).

Adicione diminuir() ao ViewModel e um botão à View. O limite inferior deve ser um e o total deve acompanhar a quantidade.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 09 Flux e estado

[Pasta do exercício](../exemplos/09-flux/README.md).

Adicione uma ação remover e prove que vinte remoções não levam a quantidade abaixo de um. Evite HTTP e DOM no reducer.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 10 Micro-frontends

[Pasta do exercício](../exemplos/10-micro-frontends/README.md).

Abra catálogo, checkout e desmonte; depois pare um servidor remoto e observe o fallback. Recompile apenas catálogo e confirme que o shell continua sem novo build.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 11 CSR, SSR e SSG

[Pasta do exercício](../exemplos/11-renderizacao/README.md).

Compare o HTML bruto das três rotas e repita requisições a /evento. No build de produção, verifique que /sobre mantém seu conteúdo entre requisições.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 12 Ilhas e carregamento seletivo

[Pasta do exercício](../exemplos/12-ilhas/README.md).

Abra Network, filtre JavaScript e role a página até a seleção/mapa. Registre quais arquivos chegam antes e depois da rolagem.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 13 Backend for Frontend

[Pasta do exercício](../exemplos/13-bff/README.md).

Teste normal, esgotado, erro e invalido. A falha de qualquer upstream deve resultar em 502 e mensagem de nova tentativa no cliente.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

### 14 Escolha e evolução

[Pasta do exercício](../exemplos/14-escolha-e-evolucao/README.md).

Escreva um ADR comparando esta solução com micro-frontends. Identifique a evidência que justificaria mudar a fronteira de deploy.

Explique quais responsabilidades mudaram, qual contrato foi preservado e como verificou o comportamento.

## Desafio integrador

O EventFlow passou a ter catálogo, compra e inscrições. Uma equipe publica o produto; políticas de preço mudam semanalmente. A página pública precisa ser indexável e o checkout precisa apresentar falhas de disponibilidade. Não há exigência atual de releases independentes.

1. Proponha a árvore de pastas e as dependências permitidas.
2. Justifique a combinação de organização, proteção de regras e estratégia de renderização.
3. No bloco 14, adicione uma política de preço ou uma nova funcionalidade preservando as fronteiras.
4. Verifique carregamento, erro, vazio, limite de quantidade e JSON inválido.
5. Registre um ADR com contexto, decisão, alternativas, consequências e critérios de revisão.

A simulação continua sem cobrança e reserva reais. Se propor um BFF, identifique o contrato específico que ele agrega e o custo adicional.

## Rubrica de avaliação

| Critério | Pontos | Evidência |
|---|---:|---|
| Responsabilidades e dependências | 3 | Imports coerentes e regra com responsável definido |
| Justificativa por contexto | 2 | Decisão conectada a requisitos e mudanças concretas |
| Comportamento e contratos | 2 | Quantidade, total, carregamento e falhas tratados |
| Verificação | 2 | Tipos, templates, fronteiras e testes pertinentes |
| ADR e comunicação | 1 | Consequências e critérios de revisão explícitos |
| Total | 10 | |

O [gabarito comentado](gabarito.md) é uma referência de discussão. Outras soluções podem atender aos mesmos critérios.
