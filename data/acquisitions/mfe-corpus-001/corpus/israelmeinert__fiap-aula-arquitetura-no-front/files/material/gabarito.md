# Gabarito comentado de arquitetura front-end

As respostas abaixo identificam responsabilidades e evidências esperadas. Implementações alternativas são válidas quando atendem ao comportamento e preservam os contratos definidos pelo grupo.

## Respostas por bloco

1. **Componentes:** o card recebe Evento e emite o ID. A página mantém a seleção. Dois cards continuam sem conhecer navegação ou HTTP; o ID correto aparece no status.
2. **Atomic Design:** quantidade de resultados pode acompanhar EventList se fizer parte da apresentação da lista. A filtragem permanece na página. A justificativa deve descrever o motivo da composição e evitar colocar regra de catálogo no átomo.
3. **Camadas:** o filtro de preço pertence a listarAbertos ou a uma operação da aplicação. Data continua responsável por transporte e validação. Esgotado produz zero eventos; JSON inválido produz mensagem de falha, sem renderizar a resposta.
4. **Módulos:** inscrições possui sua própria tela/rotas e index.ts. App coordena a nova capacidade. Import profundo deve ser rejeitado pelo verificador; shared continua sem conhecer features.
5. **Clean:** a política de cálculo muda no domínio, acompanhada de casos de limite. O caso de uso recebe Catalogo; catalogoHttp é conhecido pela composição/providers. A UI continua recebendo Simular.
6. **Hexagonal:** o adaptador de memória calcula 30000 centavos com a API em erro. HTTP informa falha. Nenhuma alteração no core é necessária para a troca. Um terceiro adaptador implementaria a mesma porta.
7. **FSD:** shared → features viola a regra de camadas. Corrija a direção: a feature consome shared. Slices irmãs de features continuam sem dependência direta por padrão e consumidores externos usam index.ts.
8. **MVVM:** diminuir altera somente quantidade, limitada com Math.max(1, qtd - 1). O total é derivado por calcularTotal/computed. A View apenas conecta o botão à operação do ViewModel.
9. **Flux:** adicione `{ type: 'remover' }` e a transição pura `Math.max(1, qtd - 1)`. Teste várias remoções e o retorno ao estado inicial. Effects ficam fora do reducer.
10. **Micro-frontends:** montar e desmontar destrói a raiz React ou a aplicação Angular; a próxima montagem começa com estado novo. Um remoto indisponível exibe fallback. Catálogo pode gerar novo dist sem reconstruir shell ou checkout. O manifesto e as origens confiáveis fazem parte do contrato de operação.
11. **Renderização:** /evento recebe HTML com conteúdo antes de executar o JavaScript; /sobre é gerada no build; /painel depende do navegador para seu conteúdo principal. No Next o CSR explícito usa dynamic com ssr:false; use client sozinho não prova CSR. No Angular, RenderMode controla cada rota.
12. **Ilhas e adiamento:** o HTML Astro já contém a seleção, mas seu código interativo chega para hidratar a ilha quando visível. Angular apresenta placeholder até carregar o chunk SeatMap. Compare requisições antes/depois da rolagem e preserve a distinção entre as duas abordagens.
13. **BFF:** normal devolve disponivel true; esgotado devolve false. Erro HTTP ou JSON inválido em qualquer upstream resulta em 502 e mensagem de tentativa. O cliente recebe três campos e não conhece as URLs dos upstreams.
14. **Escolha:** com uma equipe e um release, a solução de referência combina módulos com Clean na compra. Micro-frontends acrescentariam operação sem uma exigência atual de entrega independente. Equipes com áreas e cadências distintas podem justificar reavaliar a fronteira; registre a evidência no ADR.

## Resposta de referência do desafio integrador

```text
app/                         composição e rotas
features/eventos/             catálogo com organização simples
features/compra/
  domain/                    regras puras de preço e quantidade
  application/               casos de uso e portas necessárias
  infrastructure/            integração e validação de DTO
  presentation/              estado de UI e interação
  composition ou providers   conexão entre porta e adaptador
features/inscricoes/          consulta de inscrições
shared/ui/                   UI de propósito explícito
```

A página pública pode usar SSR ou pré-renderização conforme a frequência de atualização. Compra pode permanecer interativa no navegador. Um BFF só se justifica se simplificar agregação, adaptação ou proteção das integrações. Esse desenho não exige Clean para consultas triviais nem store global para estado local.

Comece pela [implementação do bloco 14](../exemplos/14-escolha-e-evolucao/README.md), que já combina catálogo e compra. Inscrições e a nova política ficam como extensão do exercício.

## Evidências de correção

- Um teste de cálculo pode rodar sem React, Angular ou rede.
- Imports não atravessam detalhes internos de outra feature.
- Quantidade e total não ficam em estados independentes.
- A interface permite nova tentativa após falha.
- Os parsers rejeitam o cenário invalido e eventos inexistentes são tratados.
- O ADR registra o que faria a equipe reconsiderar a decisão.
