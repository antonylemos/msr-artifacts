---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
url: https://github.com/fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 216 — fi-x64/mfe

## Contexto

Repositório webpack 5 com Module Federation em `packages/`:
- `container` (React, host);
- `marketing` (React, remote), que expõe `mount`;
- `auth` e `dashboard`, que só têm `package.json` e `package-lock.json`, sem configuração nem código.

Há workflows de deploy em S3/CloudFront para `container` e `marketing`. Não há README. A estrutura e os nomes (`container`/`marketing`/`auth`/`dashboard`, `mount`, `/<pacote>/latest/`) são os do roteiro de curso dos rascunhos 174, 177 e 197, aqui num estágio inicial, com um só remoto implementado. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:217` registra rank 216, ID 1133729895, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:217` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23316` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23323` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:46:50.503Z / 2026-10-08T15:40:44.100Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:21.754Z / 2026-10-08T15:48:43.516Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição “microfrontends react reactjs”;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 124;
- criação em 2026-01-13T18:37:02Z, push em 2026-01-14T18:49:49Z.

Não há README no SHA. O acerto vem da descrição, que traz “microfrontends”. O singular “microfrontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 29 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. `container` e `marketing` têm `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` e `src/` (`index.js` → `bootstrap.js`). `auth` e `dashboard` só têm `package.json` e lockfile (`packages/auth/package.json:4–6`, script `test` padrão). Não há workspace na raiz. | contexto |
| Configuração (host) | `packages/container/config/webpack.dev.js:16–22`: `ModuleFederationPlugin` com `name: "container"` e `remotes: { marketing: "marketing@http://localhost:8081/remoteEntry.js" }`. `webpack.prod.js:15–21`: `marketing@${domain}/marketing/latest/remoteEntry.js`, com `domain = process.env.PRODUCTION_DOMAIN` (`:6`), definido no workflow por segredo (`.github/workflows/container.yml:22–23`). | forte |
| Configuração (remoto) | `packages/marketing/config/webpack.dev.js:16–23` e `webpack.prod.js:13–20`: `name: "marketing"`, `filename: "remoteEntry.js"`, `exposes: { "./MarketingApp": "./src/bootstrap" }`. Porta 8081 (`webpack.dev.js:10`), a mesma do host. | forte |
| Código-fonte (composição) | `packages/container/src/components/MarketingApp.js:1–11`: `import { mount } from "marketing/MarketingApp"` e `mount(ref.current)`. `packages/container/src/App.js:6–14`: monta `Header` e `MarketingApp`. `packages/marketing/src/bootstrap.js:6–22`: `mount` renderiza o app e só se monta sozinho em desenvolvimento isolado. | forte |
| Código-fonte (fronteiras) | A busca por imports `../..` em `packages` (exceto lockfiles) não retorna nada; os pacotes só se ligam pelo módulo federado. | contexto |
| Build/deploy | `.github/workflows/container.yml:1–35` e `marketing.yml:1–33`: build por pacote, disparado por `paths` próprios, `aws s3 sync dist …/<pacote>/latest` e invalidação do CloudFront. | forte |

## Autoria e histórico

Clone não raso; 6 commits, nenhum merge, todos de fi.x64 `<hohoangphia@gmail.com>`, entre 2026-01-14 e 2026-01-15 (+07:00):
- `e87f279`: “first commit”;
- `e71669e`, `62b3e18`, `ffc5246`, `ad5672d`: ajustes de deploy e workflows;
- SHA `fa4088a` (“Added header”).

Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --all --missing=print` identifica dez blobs históricos ausentes (versões antigas de workflows do container e do marketing, de `packages/container/src/App.js`, do `webpack.prod` do container e dos `webpack.common` e `webpack.prod` do marketing, por exemplo `6aea48b…` e `a041e7e…`); todos os arquivos de evidência do SHA atual foram lidos, e os limites afetam só a comparação de conteúdos antigos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades implementadas (`container`, `marketing`), referenciadas pela configuração de composição do host (`packages/container/config/webpack.dev.js:18–20`). |
| Q2 | Yes | Cada uma tem entrada, configuração webpack, build e workflow de deploy próprios, sem imports de código-fonte entre elas. |
| Q3 | Yes | O container monta o remoto (`packages/container/src/App.js:10–11`; `MarketingApp.js:7–9`). |
| Q4 | Yes | Module Federation no host (`remotes`) e no remoto (`exposes`), consumido por `import { mount } from "marketing/MarketingApp"`. |
| Q5 | Yes | Q1–Q4 são Yes: host e remoto compostos em runtime, com deploy independente. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot para o par container/marketing, como em 076/084/096/106/109.
- É o mesmo roteiro de curso de 174, 177 e 197, num estágio anterior (um remoto). Como lá, a composição está implementada, não se reduz a conteúdo (023/094), e o remoto expõe uma aplicação montada, não um componente compartilhado (089/100).
- `frontend_units: 2`: `auth` e `dashboard` não contam, pois só têm manifesto e lockfile, sem entrada, configuração ou referência na composição. `approaches: [module-federation]`, `ui_technologies: [react]` (o Vue de `dashboard/package.json` está só declarado), `build_tools: [webpack]`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** integração por `mount(el)` exportado do `bootstrap` do remoto; o host ainda não passa callbacks de navegação, ao contrário de 197.
- **Protocolo (amostra):** quarto repositório da amostra com essa arquitetura de curso (174, 177, 197).
- **Protocolo (busca):** entrada pela descrição; o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, React/webpack, `frontend_units: 2` e `monorepo`; sem decisão aberta (`draft`). O par container/marketing tem configuração e consumo correspondentes; `auth` e `dashboard` são scaffolds de manifests e lockfiles, sem entrada nem referência na composição, e não contam como unidades. A relação com material de curso permanece inferência estrutural, não prova de procedência intelectual do código. Algumas respostas do checklist devem receber referências localizáveis.
