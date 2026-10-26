# ADR 0001 Organização do EventFlow

Status: proposta didática implementada no bloco 14.

## Contexto

O produto possui catálogo e simulação de compra. Uma equipe mantém uma unidade de release. Regras de preço e quantidade precisam de verificação independente da interface; o catálogo apresenta poucas regras. A simulação não realiza cobrança nem reserva.

## Decisão

Organizar por funcionalidades com APIs públicas e composição no App. Aplicar Clean dentro da compra, isolando domínio, caso de uso, adaptador HTTP e apresentação. Manter o catálogo simples. Verificar fronteiras por análise dos imports, tipos, templates e testes de comportamento relevantes.

Neste recorte a UI usa CSR. A estratégia de renderização do catálogo público é uma decisão complementar a avaliar com frequência de atualização e indexação; o bloco 11 demonstra alternativas.

## Alternativas consideradas

- Pastas técnicas globais: simples inicialmente, mas distribuem uma capacidade por vários locais.
- Clean em todas as features: aumenta camadas em consultas que ainda não exigem esse isolamento.
- FSD: oferece convenções adicionais, com curva de aprendizado que o pequeno recorte não exige.
- Micro-frontends: permite artefatos e releases separados, com custo de integração e operação sem requisito atual correspondente.

## Consequências

As mudanças de preço ficam no domínio da compra; substituir o transporte preserva o contrato do caso de uso. O App continua responsável por coordenar catálogo e compra. Há mais arquivos na compra e a equipe precisa manter suas regras de dependência. As features compartilham um release.

## Critérios para revisão

Reavaliar se surgirem equipes com cadências incompatíveis, necessidade de publicação independente, crescimento dos imports entre capacidades ou custo de manutenção das camadas superior ao benefício observado. Avaliar SSR/SSG do catálogo usando requisitos de atualização e conteúdo inicial, medindo a experiência real.
