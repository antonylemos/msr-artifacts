---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
url: https://github.com/Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 237 — Axiean/micro-store

## Contexto

“Micro-Frontend E-Commerce Application” (`README.md:1–12`): duas aplicações Next.js 15 independentes, combinadas no padrão Multi-Zones:
- `store-app` (zona 1, porta 3000), com a vitrine de produtos;
- `cart-app` (zona 2, porta 3001, `basePath: "/cart"`), com o carrinho.

O `store-app` reescreve `/cart/:path*` para o `cart-app`, e as duas zonas compartilham o estado do carrinho por `localStorage`. Há um `docker-compose.yml` com um contêiner por zona. O README diz que o projeto foi feito como avaliação técnica de frontend (`README.md:3`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:238` registra rank 237, ID 1031213794, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:238` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17230` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17234` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:46.445Z / 2026-10-08T15:55:27.142Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:56:00.831Z / 2026-10-08T16:06:25.259Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 184;
- criação em 2025-08-03T09:04:45Z, push em 2025-08-04T06:36:46Z.

Grafias no README:
- “Micro-Frontend”: `README.md:1`; “micro-frontend”: `README.md:3`;
- “Micro-Frontends”: `README.md:5` (“Architecture: Multi-Zone Micro-Frontends”).

A busca de frase trata o hífen como separador. A última alteração do README é o próprio SHA, `7ed9142` (2025-08-04), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 46 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `store-app/` e `cart-app/` têm cada um `package.json`, `package-lock.json`, `next.config.ts`, `Dockerfile` e `src/` (App Router). Na raiz ficam `README.md`, `docker-compose.yml` e `.gitignore`. | contexto |
| Configuração (composição por rota) | `store-app/next.config.ts:27–42`: `rewrites()` com `{ source: "/cart/:path*", destination: "http://cart-app:3000/cart/:path*" }`, descrito como “the core of the Multi-Zone micro-frontend architecture”. `cart-app/next.config.ts:4`: `basePath: "/cart"`. | forte |
| Build/deploy | `docker-compose.yml:5–29`: serviços `store-app` (porta 3000) e `cart-app` (3001→3000), cada um com `build.context` e `Dockerfile` próprios. O hostname `cart-app` do rewrite é o nome do serviço no Compose. `store-app/Dockerfile:3–30` (e o análogo do carrinho) gera uma imagem `standalone`. Scripts próprios: `store-app/package.json:5–10`; `cart-app/package.json:5–10` (`-p 3001`). | forte |
| Código-fonte (navegação e estado) | `store-app/src/components/Header.tsx:29`: `<a href="/cart">`, navegação de página inteira para a zona do carrinho. As duas zonas persistem o carrinho na mesma chave de `localStorage` (`store-app/src/store/cartStore.ts:82–85`; `cart-app/src/store/cartStore.ts:83`), em arquivos duplicados por zona, não importados. | moderada |
| Código-fonte (fronteiras) | Busca por `../..` e por `../store-app` ou `../cart-app`: nenhuma ocorrência. Cada zona usa alias `@/` para o próprio `src`. | contexto |

## Autoria e histórico

Clone não raso; 15 commits lineares, nenhum merge, todos de Axiean `<axieans@gmail.com>`, entre 2025-08-03 (`1718d95`, “init”) e 2025-08-04 (SHA `7ed9142`, “update readme”). `ce3eddd` (“docker file setup”) adiciona a conteinerização. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` mostra 52 objetos históricos ausentes; os arquivos atuais necessários foram legíveis e nenhum fetch foi tentado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades no repositório, a do carrinho referenciada pela configuração de composição (`store-app/next.config.ts:36–39`). |
| Q2 | Yes | Cada zona tem `package.json`, lockfile, `next.config.ts`, `Dockerfile` e serviço próprios, sem imports de código-fonte entre elas. |
| Q3 | Yes | O `store-app` é a entrada e encaminha `/cart` para o `cart-app`, que serve sob o mesmo domínio (`README.md:9–12`; `next.config.ts:32–41`). |
| Q4 | Yes | Composição por rota com Next.js Multi-Zones (`rewrites` + `basePath`), configurada e coerente com o Compose. |
| Q5 | Yes | Q1–Q4 são Yes: duas zonas Next.js compostas por rota. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, com `status: review`, como 013 (`multi-zones`, `MFE-implemented`/review). As duas zonas e a configuração de composição estão no snapshot.
- A composição é por rota no servidor, com navegação de página inteira entre zonas. Ela depende da mesma revisão de 013 e do rascunho 199 (decisão aberta “link-only or iframe composition”, aqui com o host reservando e encaminhando o prefixo `/cart`). Diferente de 199, a localização da zona está definida (`http://cart-app:3000`, nome do serviço no `docker-compose.yml:20–24`).
- `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (convenção Next sem bundler explícito, como 199), `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: example` (avaliação técnica, `README.md:3`).

## Notas para análise

- **RQ2:** Multi-Zones com `rewrites` resolvidos pela rede do Docker Compose, `basePath` na zona remota e estado do carrinho compartilhado por `localStorage` com a mesma chave.
- **Protocolo (busca):** as grafias com hífen casam as consultas de frase. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

1. **Composição por zonas:** Multi-Zones por `rewrites` e navegação de página inteira conta como mecanismo de composição para Q4? É a mesma pergunta pendente em 013 e 199.

Se a resposta for positiva, o caso fica `MFE-implemented`. Se a composição por rota não contar, vira `Non-MFE`. Não se propõe regra nova. Até a decisão, preservar `review`.
- **Contribuição da revisão independente (Lupa):** concordância com MFE-implemented (Q1–Q5 Yes), `multi-zones`, duas unidades em `monorepo` e `review`, e recomendação de decidir favoravelmente a composição por rotas neste caso e em 013. A composição por zonas está implementada: o servidor da vitrine reserva `/cart` e o encaminha a outra aplicação presente, cujo `basePath` é `/cart`. Divergência de campo, não adotada por contrariar a convenção vigente (flags de CLI não contam como configuração de bundler): ambos os manifests declaram `next dev --turbopack` (`cart-app/package.json:6`, `store-app/package.json:6`), e a revisora recomenda `build_tools: [turbopack]` como observação do modo dev (o build usa `next build` sem flag de bundler); mantido `build_tools: []`, e a alternativa fica registrada. Os precedentes 013 (MFE-implemented/`review`) e 199 (`Uncertain`/`review`) não são finais; a lacuna de `CART_DOMAIN` de 199 não existe aqui, pois há serviço, alvo e código efetivos. A busca textual: o README contém as variantes hifenizadas do singular e do plural (`README.md:1,3,5`); a compatibilidade entre consulta e grafia é observada e não propriedade geral demonstrada do GitHub. Também registrar o alias residual `../../packages/ui` e o escopo de `-p 3001`.
