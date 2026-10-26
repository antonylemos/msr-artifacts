---
schema: 1
id: 977924934
full_name: narendra814/micronew2
url: https://github.com/narendra814/micronew2
commit: cd856ad01781d18a3248819fb27fb866277c85f6
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: undetermined }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 242 — narendra814/micronew2

## Contexto

O snapshot tem só dois arquivos:
- `README.md`, escrito como mensagem (“Subject: Micro-Frontend Demo Application… Dear Team… Best regards, [Your Name]”, `README.md:1–68`);
- `micro.rar`, um arquivo compactado.

O README descreve um demo com três micro-frontends, `container` (shell), `products` e `cart` (`README.md:9–12`). O código só existe dentro do RAR. Para inspecioná-lo, o blob foi lido do objeto Git e listado e extraído para a saída padrão com `bsdtar`, sem gravar arquivos. O arquivo contém `micro-frontend-demo/` com os três projetos webpack 5 + Module Federation e um `package.json` de raiz. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:243` registra rank 242, ID 977924934, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução, extração em disco ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:243` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:13658` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:13664` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-05` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:21:34.178Z / 2026-10-08T15:54:11.457Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:52:58.133Z / 2026-10-08T16:05:37.452Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-05-01..2025-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 179;
- criação em 2025-05-05T07:35:37Z, push em 2025-05-05T07:41:02Z.

Grafias no README:
- “Micro-Frontend”: `README.md:1`;
- “micro-frontend”: `README.md:5`;
- “micro-frontends”: `README.md:9–10`.

O README vem do SHA `cd856ad` (2025-05-05, “Create README.md”), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 2 entradas, `README.md` e `micro.rar` (182.210 bytes, assinatura `Rar!`), ambos `100644`; zero symlinks e zero gitlinks. Não há código-fonte versionado como arquivo. | ambígua |
| Conteúdo do arquivo compactado | Listagem do RAR: `micro-frontend-demo/{container,products,cart}/` com `package.json`, `package-lock.json`, `webpack.config.js`, `public/index.html` e `src/` (`index.js` → `bootstrap.js`), `micro-frontend-demo/start.js`, e `package.json` e `package-lock.json` na raiz (datas de abril/maio de 2025). | contexto |
| Configuração (host, no RAR) | `micro-frontend-demo/container/webpack.config.js:34–41`: `ModuleFederationPlugin({ name: 'container', remotes: { products: 'products@http://localhost:8081/remoteEntry.js', cart: 'cart@http://localhost:8082/remoteEntry.js' } })`; porta 8090 (`:11`). | forte, condicionada ao arquivo |
| Configuração (remotos, no RAR) | `micro-frontend-demo/products/webpack.config.js:33–40`: `name: 'products'`, `exposes: { './ProductsApp': './src/bootstrap' }`, porta 8081. `micro-frontend-demo/cart/webpack.config.js:33–40`: `name: 'cart'`, `./CartApp`, porta 8082. | forte, condicionada ao arquivo |
| Código-fonte (composição, no RAR) | `micro-frontend-demo/container/src/components/ProductsApp.js:1–20` e `CartApp.js:1–21`: `import { mount } from 'products/ProductsApp'` / `'cart/CartApp'` e `mount(ref.current, { … })`, passando callbacks do carrinho. `container/src/App.js:56–59`: rotas `/` e `/cart`. `products/src/bootstrap.js:6–26`: `mount` exportado. | forte, condicionada ao arquivo |
| Documentação | `README.md:50–53`: portas 3000/3001/3002, que divergem das configurações do arquivo (8090/8081/8082). `README.md:18–20`: “Concurrently package”; `start.js` abre terminais só no Windows. | ambígua |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de narendra814 (noreply) pela interface web, em 2025-05-05: `b9fe010` (“Add files via upload”, o RAR) e o SHA `cd856ad` (“Create README.md”). Os imports relativos entre projetos não puderam ser buscados com `git grep`, pois o código está compactado; na leitura dos arquivos citados, só há o import de `../App` dentro do próprio `container` (`ProductsApp.js:3`). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades dentro do arquivo compactado, duas referenciadas pela configuração de composição do container (`container/webpack.config.js:36–39`). |
| Q2 | Yes | Cada projeto do arquivo tem `package.json`, `webpack.config.js` e porta próprios; nos arquivos lidos, não há imports de código entre projetos. |
| Q3 | Yes | O container monta os remotos por rota (`container/src/App.js:56–59`). |
| Q4 | Yes | Module Federation com `remotes` e `exposes`, consumido por `import { mount }` (`ProductsApp.js:2`, `10–12`). |
| Q5 | Undetermined | A cadeia está completa, mas só dentro de um arquivo compactado versionado como binário; o repositório não versiona o código-fonte como arquivos. |

## Motivo

- Proposta `Uncertain`: Q1–Q4 seriam Yes pelo conteúdo do RAR, mas Q5 fica Undetermined, com justificativa explícita e `status: review`.
- Se o conteúdo do arquivo compactado contar como “no repositório”, o caso é o padrão de curso de 174/177/197/216 (container com `mount` de remotos) e vira `MFE-implemented`, cadeia completa como 076/084/096/106/109.
- Se não contar, o repositório tem só um README-mensagem e um binário. Ficaria como os casos sem implementação observável e viraria `Non-MFE`.
- **Campos:** pelo conteúdo do arquivo, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example`.

## Notas para análise

- **Protocolo (mineração):** o código está dentro de `micro.rar`; a aquisição e a mineração por arquivo não o veriam sem extração.
- **RQ1 (sinais enganosos):** README em forma de e-mail com placeholder “[Your Name]”, com portas diferentes das configuradas.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Mantido como `Uncertain`. O RAR contém uma cadeia completa de Module Federation, mas o repositório não versiona esse código como arquivos-fonte observáveis; apresenta apenas um binário e um README com informações divergentes. Essa forma inadequada de disponibilização impede promover a implementação.
