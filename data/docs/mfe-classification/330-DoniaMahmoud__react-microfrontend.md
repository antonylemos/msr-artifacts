---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
url: https://github.com/DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vanilla]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 330 — DoniaMahmoud/react-microfrontend

## Contexto

Exemplo didático de Module Federation em JavaScript puro: um `container` (host) e dois remotes, `products` e `cart`, que geram HTML com dados falsos (`faker`). É a mesma estrutura do exemplo `simple-js` do final 007 (container/products/cart, portas 8080/8081/8082, `mount(el)`). Não há README na árvore, e não há React no snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:331` registra rank 330, ID 1147094315, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:331` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24227` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:24234` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-02` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T19:59:51.558Z / 2026-10-08T15:41:15.380Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 57, criação em 2026-02-01T07:15:27Z, push em 2026-02-01T08:25:38Z.

**Grafia:** não há README no snapshot (`git ls-tree -r` sem `README*`) e a descrição é nula. A grafia `microfrontend` só existe no nome do repositório, coberto por `in:name`. O nome explica a entrada na amostra, mas não é evidência de arquitetura. Sem README, não há linha a citar nem questão de data do README; o SHA (2026-02-01T10:25:24+02:00) antecede as coletas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 20 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Três projetos, `container/`, `products/` e `cart/`, cada um com `package.json`, lockfile, `webpack.config.js`, `public/index.html` e `src/index.js` + `src/bootstrap.js`; mais `.gitignore` e um `.DS_Store`. | contexto |
| Configuração (host) | `container/webpack.config.js:10–16`: `ModuleFederationPlugin({ name: "container", remotes: { products: "products@http://localhost:8081/remoteEntry.js", cart: "cart@http://localhost:8082/remoteEntry.js" } })`; `:6–8`: porta 8080. | forte |
| Configuração (remotes) | `products/webpack.config.js:10–16`: `name: "products"`, `filename: "remoteEntry.js"`, `exposes: { "./ProductsIndex": "./src/bootstrap" }`, `shared: ["faker"]`; porta 8081 (`:6–8`). `cart/webpack.config.js:10–16`: `name: "cart"`, `exposes: { "./CartShow": "./src/bootstrap" }`, `shared: ["faker"]`; porta 8082 (`:6–8`). | forte |
| Código-fonte (composição) | `container/src/index.js:2` → `container/src/bootstrap.js:1–2`: `import { mount as mountProducts } from "products/ProductsIndex"` e `import { mount as mountCart } from "cart/CartShow"`; `:6–7`: monta cada um em `#my-products` e `#my-cart` (`container/public/index.html:5–6`). | forte |
| Código-fonte (remotes) | `products/src/bootstrap.js:4–13`, `:26` e `cart/src/bootstrap.js:3–6`, `:15`: exportam `mount(el)`, que escreve o HTML no elemento recebido; `products/src/bootstrap.js:17–25` e `cart/src/bootstrap.js:8–13`: montagem isolada em desenvolvimento. | forte |
| Configuração (correspondência da cadeia) | Nomes `products`/`cart`, módulos `ProductsIndex`/`CartShow` e portas 8081/8082 do host correspondem aos `name`, `exposes` e `devServer.port` dos remotes. | forte |
| Código-fonte (fronteiras) | Busca ativa de imports relativos: só `import("./bootstrap")` dentro de cada projeto; o host acessa os remotes apenas pelos módulos federados. Nenhum import de código-fonte entre unidades. | contexto |
| Build/deploy | Cada projeto tem `package.json` próprio com `webpack serve` (`container/package.json:6–8`; `products/package.json:6–8`; `cart/package.json:6–8`). Só há modo de desenvolvimento (`mode: "development"` nos três `webpack.config.js:5`); não há deploy configurado. | moderada |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 3 commits (3 em todos os refs), nenhum merge, todos de `DoniaMahmoud <donia1999mahmoud@gmail.com>` como autor e committer, em 2026-02-01:
- `9c0bdef`, “Add basic configs of microfrontend apps and host”;
- `6b01d5d`, “Use faker library as shared dependency between remote apps”;
- o SHA `adc0ef9`, “Refactor remote apps to be used in isolation”.

`git rev-list --objects $SHA --missing=print` lista 9 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades, `container`, `products` e `cart`, os remotes referenciados no `remotes` do host (`container/webpack.config.js:12–15`). |
| Q2 | Yes | Cada unidade tem entry, HTML, configuração webpack, porta e `package.json` próprios; nenhum import de código-fonte entre elas (busca registrada). |
| Q3 | Yes | O host monta os dois remotes na mesma página (`container/src/bootstrap.js:6–7`; `container/public/index.html:5–6`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nomes, módulos e portas correspondentes, e consumo por `import { mount } from "products/ProductsIndex"` / `"cart/CartShow"` (`container/src/bootstrap.js:1–2`). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “examples… that actually compose frontend units” e a “monorepos containing a host and its remotes”.
- Mesma cadeia e estrutura do `simple-js` do final 007 (e do exemplo `ecomm/` do rascunho 106): host com `remotes`, remotes com `mount(el)` montados em elementos da página.
- Não é code sharing (089/100): cada remote expõe uma função de montagem de um fragmento de página com dados próprios. O `faker` compartilhado é dependência, não o mecanismo de composição.
- Não é cadeia não conectável (097/103/104).
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `build_tools: [webpack]`, `repo_type: example`. `ui_technologies: [vanilla]`: JavaScript puro com `innerHTML`, sem framework de UI; o React do nome não está no código.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** o nome do repositório cita React, mas o código é JavaScript puro; só o nome casou a busca (não há README nem descrição).
- **Protocolo (famílias/duplicatas):** a estrutura container/products/cart com `faker` é a do material de curso também presente no final 007 (`simple-js`) e no rascunho 106 (`ecomm/`). Exemplos de curso aparecem repetidamente na amostra como repositórios independentes.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
