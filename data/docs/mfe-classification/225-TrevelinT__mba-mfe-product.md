---
schema: 1
id: 1257221343
full_name: TrevelinT/mba-mfe-product
url: https://github.com/TrevelinT/mba-mfe-product
commit: 84095623e00334b94dd4f0f6cac1a16f066770c8
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 225 — TrevelinT/mba-mfe-product

## Contexto

“Product MFE” (`README.md:1–7`): remoto de micro-frontend para a seção de detalhes de produto (título, galeria e descrição), em React 19 + Vite 8 com `@originjs/vite-plugin-federation`. Ele expõe `./Product` para um shell em outro repositório (“`product/Product` when consumed by the shell”, `README.md:7`). Roda isolado na porta 5001 e tem CI, release com Changesets e deploy próprio no GitHub Pages (`README.md:30–55`). O shell não está no repositório; o README só o referencia como `../README.md` (`:28`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:226` registra rank 225, ID 1257221343, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:226` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31144` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:31152` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:37:56.959Z / 2026-10-08T16:00:28.526Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:07:22.535Z / 2026-10-08T16:09:37.872Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 449;
- criação em 2026-06-02T13:29:13Z, push em 2026-08-30T21:34:55Z.

O acerto vem de `README.md:3`, “Remote micro-frontend for the product details section (title, gallery, description).”. A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `3ebffe7` (2026-08-20), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

Nas duas rodadas, a mesma conta tem outros três candidatos: `TrevelinT/mba-modular-monolith`, `mba-mfe-cart` e `mba-mfe-buy-box` (por exemplo, `data/discovery/mfe-round-002/candidates.csv`). Só este está na amostra (`sample.csv:226`); os demais não foram inspecionados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 54 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Vite: `index.html`, `src/` (API, componentes e testes), `public/` (fontes e imagens), `vite.config.ts`, `vite-federation-css-fix.ts`, scripts de release e workflows de CI/Release/CD. | contexto |
| Configuração (remoto) | `vite.config.ts:12–22`: `federation({ name: "product", filename: "remoteEntry.js", exposes: { "./Product": "./src/components/product-container.tsx" }, shared: react/react-dom singleton })`. `:5`, `23`: correção de CSS da federação para Vite 8. `:29–38`: porta 5001 com CORS. | forte |
| Código-fonte | `src/components/product-container.tsx:6–26`: componente que carrega a página de produto e renderiza a vista ou o skeleton; exportado como default e nomeado. `src/main.tsx:5–10`: montagem isolada em `#app`. | moderada |
| Build/deploy | `package.json:10–24`: `dev`, `build`, `preview` próprios. `.github/workflows/cd.yml:1–70`: deploy próprio no GitHub Pages a partir do artefato de CI quando há tag `v*`. `README.md:55`: “Point the shell product remote at the deployed `remoteEntry.js` path under that base.” | forte |
| Host | Não há host no snapshot; a configuração não tem `remotes`. O README remete ao shell fora do repositório (`README.md:28`, `55`). | ambígua |
| Código-fonte (fronteiras) | Busca por imports `../..`: nenhuma ocorrência. Dependência `@trevelint/mfe-config` (`package.json:26`), pacote de configuração compartilhada. | contexto |

## Autoria e histórico

Clone não raso; 15 commits alcançáveis a partir do SHA, nenhum merge (a contagem de 16 incluía `32fb0be`, "Version packages", presente só em `origin/changeset-release/main` e não ancestral do SHA). São 13 de Danilo Trevelin `<danilo.muller.trevelin@gmail.com>`, de 2026-06-02 (`949f2bf`, “feat: create project boilerplate”) a 2026-08-30 (`e0154c7`, “build: first release”), e 2 de `github-actions[bot]`, incluindo o SHA `8409562` (“Version packages (#2)”). O commit `5192c5c` (2026-08-20) diz “update features to match modular monolith”. O branch `origin/changeset-release/main` não foi considerado. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` identifica 41 objetos históricos ausentes; a inspeção padrão de workflows encontra blob histórico ausente na detecção de renames, e foi repetida com `--no-renames --name-status`. Os arquivos atuais citados estão presentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a configuração de federação só tem `exposes` (`vite.config.ts:15–17`), sem referenciar outras unidades. |
| Q2 | Yes | Entrada, build, porta, CI e deploy próprios (`package.json:10–24`; `.github/workflows/cd.yml`). |
| Q3 | Undetermined | O shell não é observável; o README só afirma o consumo (`README.md:7`, `28`, `55`). |
| Q4 | Undetermined | Mecanismo preparado do lado do remoto (`exposes`, `remoteEntry.js`); a conexão depende do shell ausente. |
| Q5 | No | Uma unidade preparada para composição por host externo não observável. |

## Motivo

- `MFE-unit` pela regra “single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, com o vetor de exceção dos finais 001/050/069/004/058.
- Corresponde a “repositories containing only a remote unit, without the composing host”. O remoto expõe uma seção funcional de página com dados próprios, não utilitários (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (página de produto de demonstração, com imagens de um único produto em `public/images/`, publicada em GitHub Pages).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** remoto `@originjs/vite-plugin-federation` em Vite 8 com plugin próprio de correção de CSS (`vite-federation-css-fix.ts`) e versionamento por Changesets.
- **Protocolo (amostra):** outros repositórios da mesma conta estão nas rodadas, fora da amostra; avaliar a família pode mudar Q3/Q4 se a análise de famílias de repositórios for adotada.
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-unit, vetor No/Yes/Undetermined/Undetermined/No e `draft`: a unidade expõe um módulo funcional de produto (`./Product`) para um shell ausente, e os dois Undetermined são limites da observação do consumidor, que permaneceram após a busca local, e não uma decisão de classe aberta. Correções adotadas: contagem 15 commits (13 de Danilo Trevelin e 2 de `github-actions[bot]`, verificada); `singleton: true` em `shared` (`vite.config.ts`) não é campo suportado da interface `SharedConfig` em `@originjs/vite-plugin-federation@1.4.1` (`types/index.d.ts:260–319`, comentado), de modo que se registra "compartilhamento de React/ReactDOM configurado; flags singleton declaradas, sem suporte tipado nessa versão", e o `tsc` do build não valida esse objeto (`tsconfig.json:20` inclui fontes, não o config Vite); a citação do deploy deve cobrir os passos efetivos. Comparáveis finais: 001, 050 e 069 (remoto único com exposição explícita e consumidor ausente), com 004 e 058; não há evidência de plugin exclusivo de plataforma.
