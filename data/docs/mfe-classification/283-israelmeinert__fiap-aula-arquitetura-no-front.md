---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
url: https://github.com/israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [runtime-script]
ui_technologies: [react, angular]
build_tools: [esbuild, vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Contexto

Material de aula de arquitetura front-end: slides em HTML/Markdown, roteiro, exercícios e 14 exemplos executáveis que implementam o mesmo domínio (“EventFlow”) em estilos de arquitetura diferentes (`README.md:1–5`; `scripts/exemplos.json:1–86`). Só o bloco 10, `exemplos/10-micro-frontends/`, compõe unidades: um shell (Vite/TypeScript) carrega em runtime dois remotos, Catálogo React e Checkout Angular. Cada remoto é compilado separadamente para um módulo ESM servido em sua própria porta (`exemplos/10-micro-frontends/README.md:15–23`). Os outros 13 blocos são aplicações isoladas, sem relação de composição. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:284` registra rank 283, ID 1408068032, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:284` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:38520` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:38556` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:>=2026-10-01` | 2026-10-07T22:44:09.214Z / 2026-10-08T16:02:37.417Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:>=2026-10-01` | 2026-10-07T23:13:19.642Z / 2026-10-08T16:11:03.037Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:>=2026-10-01`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem HTML, `fork: false`, tamanho 277, criação em 2026-10-07T00:47:22Z, push em 2026-10-07T00:48:50Z.

Sem descrição, o acerto vem do README:
- **“micro frontends”:** “micro-frontends” em `README.md:22`, `:28` e `:49`; o hífen funciona como separador.
- **“micro frontend”:** a forma singular não aparece literalmente no README raiz; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README só existe no commit único, que é o SHA (2026-10-06T21:48:41-03:00, isto é, 2026-10-07T00:48:41Z). Ele antecede as coletas, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 405 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Raiz com `package.json` (workspaces `exemplos/*/react`, `angular`, `next`, `astro`, `apps/*`; `package.json:9–15`), slides (`aula-arquitetura-front-end.html`, `conteudo/`), `material/`, `scripts/`, `tests/` e 14 pastas em `exemplos/`. No bloco 10: `apps/shell`, `apps/catalogo-react`, `apps/checkout-angular` e `packages/contracts`. | contexto |
| Código-fonte (remotos) | `exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3–6`: `export async function mount(host)` cria uma raiz React e devolve o cleanup. `exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4–12`: `mount(host)` cria uma aplicação Angular (`createApplication`, `createComponent`) e devolve o cleanup. | forte |
| Build (remotos) | `catalogo-react/package.json:6–9` e `checkout-angular/package.json:6–9`: `build` com `scripts/build-remoto.mjs` (o Angular antes com `ngc`) e `dev` com `scripts/servir-remoto.mjs` nas portas 4301/4302. `scripts/build-remoto.mjs:21–26`: esbuild gera `dist/microfrontend.js` em formato ESM a partir de `src/mount.tsx` ou `dist/compiled/mount.js`. `scripts/servir-remoto.mjs:1–6`: servidor estático de `dist` com CORS para o shell em 4300. | forte |
| Configuração (shell) | `exemplos/10-micro-frontends/apps/shell/public/remotes.json:1–5`: manifesto versionado com `catalogo` → `http://127.0.0.1:4301/microfrontend.js` e `checkout` → `http://127.0.0.1:4302/microfrontend.js`. `apps/shell/package.json:6–9`: Vite na porta 4300 e build próprio. | forte |
| Código-fonte (composição) | `apps/shell/src/main.ts:8–35`: busca `/remotes.json`, valida versão e origem (`:16–22`), carrega o remoto com `import(/* @vite-ignore */ url.href)` (`:23`), verifica o contrato `mount` (`:25`), monta num slot próprio (`:26`) e chama o cleanup ao trocar ou desmontar (`:7`, `:27–28`). `:36–38`: botões para abrir catálogo, checkout e desmontar. | forte |
| Configuração (contrato) | `exemplos/10-micro-frontends/packages/contracts/mount.ts:1–5`: tipos `Cleanup`, `Mount`, `Remote` e `Manifest` (“Contrato de integração versionado, sem componentes ou estado global compartilhados”). | moderada |
| Código-fonte (fronteiras) | Busca ativa de imports relativos que cruzam pastas no bloco 10. O shell importa só tipos do contrato (`apps/shell/src/main.ts:1`, `import type … from '../../../packages/contracts/mount'`) e a folha de estilo comum do material (`:2`, `../../../../../material/estilos.css`). Os remotos não importam o shell nem um ao outro (`catalogo-react/src/App.tsx:1`; `checkout-angular/src/mount.ts:1–3` só importam frameworks e arquivos próprios); os `../../../../scripts/*` dos `package.json` são ferramentas de build comuns. Nenhum import de código-fonte entre unidades. | contexto |
| Testes | `tests/e2e/aula.spec.ts:142–154`: teste e2e do bloco 10 cobre montagem, limpeza, remontagem e falha de remoto (manifesto com URL inexistente). | moderada |
| Documentação | `exemplos/10-micro-frontends/README.md:17–23`, `:107`, `:111`, `:117–125`: fluxo shell → manifesto → módulo ESM remoto → `mount` → `cleanup`, builds separados e exercício de recompilar só o catálogo sem novo build do shell. O deploy independente é descrito, não provisionado (“o laboratório não provisiona um pipeline de deploy”). | moderada |

## Autoria e histórico

Clone não raso. Há 1 commit, que é o SHA e a raiz (1 em todos os refs), sem merges: autor e committer `Israel M. <israelmeinert@gmail.com>`, 2026-10-06T21:48:41-03:00, “material completo da aula de front com slides implementação dos exemplos para cada arquitetura com exemplos de angular e react”. O commit único não permite distinguir a evolução ou a autoria por pasta. `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no bloco 10: `shell`, `catalogo-react` e `checkout-angular`, as duas últimas referenciadas pelo manifesto de composição (`apps/shell/public/remotes.json:3–4`). |
| Q2 | Yes | Cada unidade tem entrada e build próprios (shell: Vite, `apps/shell/package.json:7–8`; remotos: esbuild/ngc, `catalogo-react/package.json:7`, `checkout-angular/package.json:7`). Não há import de código-fonte entre unidades; o shell só importa tipos do contrato (busca registrada). |
| Q3 | Yes | O shell carrega e monta os remotos na sua página (`apps/shell/src/main.ts:23–28`, `:36–37`). |
| Q4 | Yes | Composição em runtime por manifesto e `import()` de módulo ESM remoto, com contrato `mount`/`cleanup` verificado (`main.ts:16–28`; `packages/contracts/mount.ts:2–5`). URLs e portas do manifesto correspondem aos servidores dos remotos (`servir-remoto.mjs:2–6`; `package.json` de cada remoto). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “examples, templates, and proofs of concept that actually compose frontend units”.
- O repositório é material didático com vários estilos de arquitetura, mas o bloco 10 implementa e testa a composição. Não é conteúdo sem implementação (023/075/081/094/105).
- Segue os finais 007 (repositório de exemplos com composição real em parte dos exemplos) e 002 (carga em runtime por URL com contrato `mount`).
- Os demais 13 blocos não foram contados como unidades: são aplicações isoladas, como os demos não relacionados em 193.
- Não é code sharing (089/100): os remotos são aplicações React e Angular completas, montadas com instâncias próprias.
- Não é cadeia não conectável (097/103/104): manifesto, origens permitidas e portas correspondem.
- `approaches: [runtime-script]`: o slug existente mais próximo (002). Aqui o carregamento é por `import()` de módulo ESM em vez de `<script>`; ver notas.
- `frontend_units: 3`, `unit_organization: monorepo`, `ui_technologies: [react, angular]`, `build_tools: [esbuild, vite]`, `repo_type: example`.
- Não há decisão aberta que altere a classe.

## Notas para análise

- **RQ2 (abordagem):** composição por manifesto JSON e `import()` dinâmico de módulos ESM remotos, com contrato tipado `mount(host) → cleanup`, verificação de versão e lista de origens permitidas. É próxima de `runtime-script` (002), mas sem `<script>` injetado nem global em `window`. Se os pesquisadores preferirem distinguir carga ESM por URL de carga por script, este é o primeiro caso desse tipo nesta série de triagem. Não se cria slug novo neste rascunho.
- **RQ2:** remotos heterogêneos (React e Angular AOT com linker) montados pelo mesmo shell, cada um embutindo seu framework (`exemplos/10-micro-frontends/README.md:125`).
- **RQ1:** o repositório mistura micro-frontends com outras 13 arquiteturas; contagens automáticas por `package.json` (todos os workspaces) superestimariam as unidades compostas.
- **Protocolo (busca):** o hit singular não tem grafia literal no README raiz. A elegibilidade muda de `unknown` (001) para `pass` (002). Repositório criado em 2026-10-07, dentro da partição `created:>=2026-10-01`.
