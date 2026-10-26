---
schema: 1
id: 1032199185
full_name: enablhealth/enabl-webapp
url: https://github.com/enablhealth/enabl-webapp
commit: cbd6034bfb30f76d9ba734ef3648065853988f63
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 279 — enablhealth/enabl-webapp

## Contexto

Aplicação web Next.js do “Enabl Health”, um assistente de saúde com interface de chat para agentes de IA (Amazon Bedrock), autenticação Cognito/Amplify e deploy em AWS App Runner com CloudFront (`README.md:1–3`, `:11–30`). É uma única aplicação Next.js. O README não menciona micro-frontends: o termo da busca resulta da justaposição de “Nova Micro)” e “**Frontend**” em linhas consecutivas. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:280` registra rank 279, ID 1032199185, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:280` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17293` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:17297` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-08` | 2026-10-07T22:25:10.620Z / 2026-10-08T15:55:35.228Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-08` | 2026-10-07T22:56:26.269Z / 2026-10-08T16:06:34.045Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 1102, criação em 2025-08-05T01:05:41Z, push em 2025-09-06T21:04:48Z.

**Grafia:** o README do SHA (501 linhas) não contém “micro frontend”, “micro-frontend” nem “microfrontend”. A única sequência compatível com a frase é o fim de `README.md:17` (“…basic models (Titan Text Express, Nova Micro)”), seguido do início de `README.md:18` (“- **Frontend**: AWS App Runner…”): os tokens “Micro” e “Frontend” ficam adjacentes depois de pontuação e marcação. A forma plural “micro frontends” não tem correspondência; esse hit depende do processamento textual da busca do GitHub, que não está registrado. Não se afirma qual trecho a API casou, porque ela não informa linha.

A última alteração do README é `ae5f388` (2025-08-11), e o SHA é de 2025-08-17. O `pushed_at` (2025-09-06) é posterior ao SHA da branch `main`, provavelmente por push em outro branch (`origin/development` existe), o que não foi verificado. Todos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 81 entradas, sendo 62 arquivos regulares `100644` e 19 executáveis `100755` (scripts de deploy e infraestrutura em `scripts/`); zero symlinks e zero gitlinks. Um único projeto Next.js: `package.json`, `next.config.ts`, `src/app` (página inicial, termos, rota de API de configuração), `src/components`, `src/hooks`, `src/services`, além de `Dockerfile`, `apprunner.yaml`, configurações de CloudFront e workflows. | contrária |
| Configuração / Build | `package.json:5–16`: scripts `next dev/build/start` e de deploy; `:17–28`: Next 15, React 19, AWS Amplify/Cognito, sem pacotes de federação. `next.config.ts`: configuração vazia. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` e `wujie`: nenhuma ocorrência. | ausente |
| Código-fonte (fronteiras) | Não há imports com `../../` em `src`; o projeto usa caminhos internos da mesma aplicação. Não há outra unidade frontend para cruzar. | contexto |
| Documentação | `README.md:11–30`: arquitetura em três ambientes (dev, staging, produção), cada um com backend Bedrock e um único frontend em App Runner. `README.md:166`: “Frontend Deployment (AWS App Runner)”. | contrária |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 39 commits alcançáveis a partir do SHA (40 em todos os refs), nenhum merge:
- 28 de `kieferenriquez <kc7enriquez@gmail.com>`;
- 11 de `enablhealth <enablhealth@gmail.com>`;
- autor e committer coincidem em todos.

A raiz é `db137d0` (2025-08-05, “Initial commit from Create Next App”). O branch `origin/development` não foi considerado. `git rev-list --objects $SHA --missing=print` lista 82 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend: um projeto Next.js com um `package.json` e um build (`package.json:5–8`). Nenhuma configuração de composição (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | Não há host que carregue unidades; o App Router serve páginas da própria aplicação. |
| Q4 | No | Nenhum mecanismo de composição configurado. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”.
- Nem é caso de “mentioning micro-frontends without implementing them”: o termo não aparece no repositório, e o hit resulta de tokens adjacentes de linhas distintas (“Nova Micro)” / “**Frontend**”), como o falso positivo lexical de 261 (rascunho).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`. `build_tools: []`: o Next.js encapsula o bundler e não há configuração explícita (`next.config.ts` vazio). `repo_type: production`: domínios de produção e staging (`README.md:5–9`) e deploy em AWS App Runner/CloudFront.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** falso positivo puramente lexical. A frase `"micro frontend"` casa a justaposição do nome de modelo “Nova Micro” com o rótulo “Frontend” na linha seguinte (`README.md:17–18`). Buscas de frase do GitHub ignoram pontuação e quebras de linha entre tokens, o que pode gerar ruído em READMEs de infraestrutura.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
