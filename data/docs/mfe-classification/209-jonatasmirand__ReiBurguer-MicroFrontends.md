---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
url: https://github.com/jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, next]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Contexto

“ReiBurguer – Micro Frontends + Module Federation” (`README.md:2–15`): projeto de aprendizado com três aplicações Next.js 14 / React 18 em pastas irmãs, sem workspace:
- `container`, o host, na porta padrão;
- `cardapio`, remote na porta 3001;
- `pedido`, remote na porta 3002.

Todas usam `@module-federation/nextjs-mf`. O container carrega os dois remotos na mesma página, e eles se comunicam por Custom Events do navegador (`README.md:42–72`). A homepage dos metadados aponta um deploy na Vercel. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:210` registra rank 209, ID 1117824036, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:210` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22268` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:22274` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos oito hits em cada rodada.

Busca de código:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:400..499` | `container/package.json` | 2026-10-07T18:19:01.958Z / 2026-10-08T15:34:47.034Z |
| idem | `…#size:400..499` | `pedido/package.json` | 2026-10-07T18:19:01.958Z / 2026-10-08T15:34:47.034Z |
| idem | `…#size:500..599` | `cardapio/package.json` | 2026-10-07T18:19:48.108Z / 2026-10-08T15:35:35.478Z |

Os arquivos têm 489, 498 e 500 bytes no SHA, dentro das faixas, e contêm `"@module-federation/nextjs-mf": "^8.8.47"` (`container/package.json:12`; `pedido/package.json:12`; `cardapio/package.json:12`).

Busca de repositórios, com subconsulta `…#created:2025-12` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:25:56.873Z / 2026-10-08T15:40:18.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:59.973Z / 2026-10-08T15:48:34.496Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:28:32.293Z / 2026-10-08T15:56:53.991Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:58:44.000Z / 2026-10-08T16:07:26.672Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:21:42.264Z / 2026-10-08T16:16:33.462Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`.

Metadados do hit de repositório:
- descrição “Projeto para testar aprendizado com Modulate Federation incluindo três Micro Frontends divididos em (container, cardápio e pedido)”;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 425;
- criação em 2025-12-16T21:43:05Z, push em 2026-01-04T13:50:43Z;
- homepage `rei-burguer-micro-frontends.vercel.app`.

Grafias no README:
- “Micro Frontends”: `README.md:2` e `4`;
- “Microfrontends”: `README.md:7` (“uma arquitetura de Microfrontends”); “microfrontends” em `18` e `42`;
- “microfrontend”: `README.md:24` (“cada microfrontend individualmente”) e `89`;
- “Module Federation”: `README.md:2`, `10`, `32`, `74`. A descrição grafa “Modulate Federation”.

A última alteração do README é o próprio SHA, `268d79a` (2026-01-04), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 54 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos Next.js com `package.json`, `package-lock.json`, `next.config` e `src/` próprios. O `package-lock.json` da raiz não tem pacotes (`package-lock.json:1–6`), e não há workspace. | contexto |
| Configuração (host) | `container/next.config.mjs:7–29`: `NextFederationPlugin` com `name: 'container'` e `remotes` `pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js` e `cardapio@http://localhost:3001/…`, com `react`/`react-dom` singleton. | forte |
| Configuração (remotos) | `cardapio/next.config.js:5–19`: `name: "cardapio"`, `exposes: { "./Cardapio": "./src/components/Cardapio.jsx" }`. `pedido/next.config.mjs:7–29`: `name: 'pedido'`, `exposes: { './Pedido': './src/_components/Pedido.jsx' }`. As portas dos scripts `dev` (`cardapio/package.json:6`, `--port 3001`; `pedido/package.json:6`, `--port 3002`) coincidem com as do host. | forte |
| Código-fonte (composição) | `container/src/pages/index.js:5–6`: `dynamic(() => import("cardapio/Cardapio"), { ssr: false })` e o mesmo para `pedido/Pedido`. `:20–26`: os dois montados na página. | forte |
| Código-fonte (integração) | `cardapio/src/components/Cardapio.jsx:30–43` dispara `CustomEvent("adicionarCarrinho")` em `window.top`; `pedido/src/_components/Pedido.jsx:7–16` escuta o mesmo evento. As imagens do cardápio vêm da origem do remoto (`Cardapio.jsx:21`, `http://localhost:3001${prato.imagem}`). | moderada |
| Código-fonte (fronteiras) | Busca por `../..` e por `../container`, `../cardapio` e `../pedido`: nenhuma ocorrência. Cada app usa alias `@/*` para o próprio `src` (`cardapio/jsconfig.json`). | contexto |
| Configuração (resíduo) | `cardapio` tem dois arquivos de configuração. `next.config.js` expõe `./src/components/Cardapio.jsx`, que existe; `next.config.mjs:12–14` expõe `./src/_components/Cardapio.jsx`, que não existe. Pela ordem de busca do Next 14, `next.config.js` tem precedência. Há ainda um resíduo em `Cardapio.jsx:5–8`: a função `adicionarPedido` dispara outro evento e não é chamada. | ambígua |

## Autoria e histórico

Clone não raso; 5 commits, nenhum merge, todos de Jonatas Miranda `<jonatasmiranda97.jm@gmail.com>` (como `jonatasmirand` e, no SHA, pela interface web):
- `8e7f1d9` (2025-12-14, “Subindo projeto”): adiciona `container`, `pedido` e o README, com `cardapio` como gitlink (`160000`);
- `670f5e2` (2025-12-14): ajusta o README;
- `682204a` (2025-12-16, “Adiciona micro frontend Cardapio”): atualiza o gitlink;
- `b7c02c3` (2025-12-16, “Converte cardapio de sub-repo para pasta normal”): remove o gitlink e adiciona os arquivos regulares de `cardapio/`;
- SHA `268d79a` (2026-01-04): atualiza o README.

No SHA não há mais gitlink. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --all --missing=print` revela dois blobs históricos de README ausentes (`0f5d153…` no primeiro commit e `47e33dd…` nos snapshots de `670f5e2` a `b7c02c3`); o README atual e as demais evidências do SHA foram lidos, e os metadados e nomes de arquivo do log estão disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório, duas referenciadas pela configuração de composição do host (`container/next.config.mjs:12–15`). |
| Q2 | Yes | Cada app tem `package.json`, lockfile, `next.config` e servidor próprios, sem imports de código-fonte entre eles. |
| Q3 | Yes | O container monta os dois remotos na página inicial (`container/src/pages/index.js:5–6`, `20–26`). |
| Q4 | Yes | Module Federation (`nextjs-mf`) configurado no host (`remotes`) e nos remotos (`exposes`), consumido por `dynamic(() => import("cardapio/Cardapio"))` e `import("pedido/Pedido")`. |
| Q5 | Yes | Q1–Q4 são Yes: host Next.js com dois remotos e comunicação por eventos. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- Os remotos expõem fatias de tela com estado próprio (cardápio e pedido) que se comunicam por eventos, não componentes compartilhados. Não é o caso de 089/100.
- `approaches: [module-federation]`, `ui_technologies: [react, next]`, `frontend_units: 3`, `unit_organization: monorepo` (três apps num repositório, sem workspace), `repo_type: example` (“Projeto para testar aprendizado”, `README.md:4`).
- `build_tools: [webpack]`: a federação é aplicada por `webpack(config)` em cada `next.config` e os scripts `dev` definem `NEXT_PRIVATE_LOCAL_WEBPACK=true`. Isso difere dos rascunhos 180/199, em que o Next não tinha configuração explícita de bundler e ficou `[]`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `nextjs-mf` em Next 14 (Pages Router) com `dynamic(..., { ssr: false })` e comunicação por `CustomEvent` em `window.top`. O README avisa que o MF não é suportado em Next > 15 (`README.md:6`).
- **Protocolo (snapshot):** `cardapio` foi gitlink nos dois primeiros commits e virou pasta regular em `b7c02c3`; o SHA não tem gitlinks.
- **Protocolo (busca):** o repositório entra por código (três `package.json`) e por cinco consultas textuais. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, next]`, `webpack`, três unidades e `monorepo`; sem decisão aberta (`draft`). Histórico: `cardapio` aparece primeiro como gitlink (`8e7f1d9` e `670f5e2`, alvo `907edba…`; `682204a`, alvo `54865bb…`) e é depois substituído por arquivos regulares, de modo que um terceiro snapshot ainda traz o gitlink; container e pedido entram em `8e7f1d9`. Ressalvas de execução a registrar: as portas 3001 e 3002 estão no `dev`, e os três scripts `start` usam só `next start`, exigindo portas explícitas para rodar juntos em produção; os remotes e as imagens usam URLs `localhost` fixas; a homepage da Vercel é metadado, não implantação validada; o comando `set` dos scripts pode não ser portável; o aviso do README sobre Next acima de 15 é declaração documental, e a versão declarada difere da resolvida no lockfile. Isso limita a executabilidade e a portabilidade, sem tornar incerto o mecanismo configurado e consumido no snapshot.
