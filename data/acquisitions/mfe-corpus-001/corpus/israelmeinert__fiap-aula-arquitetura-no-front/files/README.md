# Material da aula de arquitetura front-end

Exemplos completos do EventFlow para acompanhar a aula com React, Angular e TypeScript. As pastas seguem os 14 blocos da apresentação e implementam alternativas do mesmo problema: consultar eventos, selecionar ingressos e simular um total.

A [apresentação HTML](aula-arquitetura-front-end.html) e o [conteúdo dos slides](conteudo/aula-arquitetura-front-end.md) são os materiais de exposição. O [roteiro do professor](material/roteiro-do-professor.md), o [guia do aluno](material/guia-do-aluno.md), os [exercícios](material/exercicios.md) e o [gabarito comentado](material/gabarito.md) complementam a prática.

## Preparar e executar

Use Node.js 22.22.3 ou uma versão compatível com `engines` do package.json, e npm. As dependências estão fixadas em package-lock.json; faça a instalação somente na raiz.

```bash
npm ci
npm run aula -- 01 react
```

Para comparar com Angular, encerre com Ctrl+C e execute:

```bash
npm run aula -- 01 angular
```

`npm run aula` lista os blocos. Troque `01` pelo número desejado. O comando sobe automaticamente a API/BFF quando necessário. `10` inicia o conjunto de micro-frontends; `11 react` usa Next.js e `12 react` usa Astro com uma ilha React.

| Exemplo | Endereço |
|---|---|
| React nos blocos 01–09 e 14 | http://127.0.0.1:5173 |
| Angular | http://127.0.0.1:4200 |
| Shell dos micro-frontends | http://127.0.0.1:4300 |
| Next nos blocos 11 e 13 | http://127.0.0.1:3000 |
| Astro no bloco 12 | http://127.0.0.1:4321 |
| API de demonstração | http://127.0.0.1:4010 |
| BFF Express para Angular | http://127.0.0.1:4011 |

Os endereços são locais. Use um exemplo por vez para evitar disputa de portas. Ao executar um workspace diretamente, inicie manualmente os serviços auxiliares descritos no seu README.

## Pastas e slides

| Bloco | Pasta | Slides |
|---|---|---|
| 01 · Componentes | [01-componentes](exemplos/01-componentes/README.md) | 12–16 |
| 02 · Atomic Design | [02-atomic-design](exemplos/02-atomic-design/README.md) | 17–21 |
| 03 · Camadas | [03-camadas](exemplos/03-camadas/README.md) | 22–27 |
| 04 · Funcionalidades e monólito modular | [04-feature-based](exemplos/04-feature-based/README.md) | 28–33 |
| 05 · Clean Architecture | [05-clean-architecture](exemplos/05-clean-architecture/README.md) | 34–43 |
| 06 · Hexagonal | [06-hexagonal](exemplos/06-hexagonal/README.md) | 44–49 |
| 07 · Feature-Sliced Design | [07-feature-sliced-design](exemplos/07-feature-sliced-design/README.md) | 50–55 |
| 08 · MVVM | [08-mvvm](exemplos/08-mvvm/README.md) | 56–60 |
| 09 · Flux e estado | [09-flux](exemplos/09-flux/README.md) | 61–66 |
| 10 · Micro-frontends | [10-micro-frontends](exemplos/10-micro-frontends/README.md) | 67–72 |
| 11 · CSR, SSR e SSG | [11-renderizacao](exemplos/11-renderizacao/README.md) | 73–77 |
| 12 · Ilhas e carregamento seletivo | [12-ilhas](exemplos/12-ilhas/README.md) | 78–81 |
| 13 · Backend for Frontend | [13-bff](exemplos/13-bff/README.md) | 82–88 |
| 14 · Escolha e evolução | [14-escolha-e-evolucao](exemplos/14-escolha-e-evolucao/README.md) | 89–94 |

## Explorar falhas

Nos exemplos que consultam a API, deixe a aula aberta e use outro terminal na raiz:

```bash
npm run cenario -- erro
npm run cenario -- invalido
npm run cenario -- esgotado
npm run cenario -- normal
```

Clique novamente em consultar, simular ou carregar resumo após cada mudança. O cenário afeta a API em memória e é reiniciado como normal quando ela sobe novamente. A Hexagonal com adaptador em memória continua funcionando quando o cenário HTTP está em erro.

## Verificar os exemplos

```bash
npm run check
npm test
npm run build
```

`check` valida tipos, templates Angular e regras de import. `test` verifica invariantes, contratos externos, reducers, agregação e o verificador de fronteiras. `build` constrói todos os workspaces; para um recorte, use `npm run build -- 05 react` ou `npm run build -- 11`.

Para testar no navegador, instale o navegador do Playwright uma vez e execute a suíte:

```bash
npx playwright install chromium
npm run test:e2e
```

No Linux, `npx playwright install --with-deps chromium` também instala as bibliotecas necessárias ao navegador.

A suíte inicia e encerra exemplos automaticamente; mantenha as portas da tabela livres. Ela cobre interações, limites, troca de adaptador, fallback dos remotos, renderização, carregamento seletivo e falhas do BFF.

## Regras do estudo de caso

- Moeda BRL, valores inteiros em centavos e quantidade entre 1 e 6.
- O código simula uma compra. Preço, disponibilidade e autorização da compra real pertencem ao servidor.
- Cada pasta é uma alternativa independente. Os exemplos não importam regras uns dos outros; compartilham apenas o estilo visual de demonstração.
- Camadas globais, FSD e Clean são apresentados para comparação. Não são estruturas obrigatórias de React ou Angular.
- O Angular usa componentes standalone, signals e detecção de mudanças sem Zone.js. CLI e compilador verificam os templates; não são arquivos soltos sem bootstrap.

A [combinação do bloco 14](exemplos/14-escolha-e-evolucao/README.md) mantém catálogo simples e concentra Clean na compra. O [ADR](exemplos/14-escolha-e-evolucao/adr/0001-organizacao-eventflow.md) registra contexto e consequências dessa escolha.
