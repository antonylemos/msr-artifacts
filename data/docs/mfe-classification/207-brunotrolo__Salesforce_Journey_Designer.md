---
schema: 1
id: 1377516451
full_name: brunotrolo/Salesforce_Journey_Designer
url: https://github.com/brunotrolo/Salesforce_Journey_Designer
commit: 91b85595fafcf47c1bac0dc3e1d3b1a08461a1a1
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 207 — brunotrolo/Salesforce_Journey_Designer

## Contexto

“Salesforce Journey Designer” (`README.md:1–38`): estúdio de desenho de jornadas para uma migração Salesforce → Salesforce. É um conjunto de agentes e skills do Claude Code (`.claude/agents/`, `.claude/skills/`, `.claude/rules/`, `.claude/hooks/`) com documentação de método Spec-Driven Development (`docs/sdd/`).

O README e os documentos descrevem uma arquitetura-alvo em que cada domínio de negócio seria “uma fronteira de micro-frontend independentemente implantável” (`README.md:56–59`; `docs/sdd/DOMAINS.md:1–3`). Nenhum domínio foi especificado nem construído no snapshot: `specs/` só tem `README.md`, e o status dos domínios é “rascunho” (`docs/sdd/DOMAINS.md:7`).

O único projeto frontend executável é `.claude/skills/salesforce-ux/design-system-2-starter-kit/`, uma cópia vendorizada sem alteração do starter kit oficial da Salesforce (LWC + Vite + SLDS2), usado como ambiente de protótipo (`.claude/skills/salesforce-ux/README.md:3–9`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:208` registra rank 207, ID 1377516451, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:208` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37607` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:37639` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:43:47.840Z / 2026-10-08T16:02:30.405Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:13:00.432Z / 2026-10-08T16:10:54.650Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 1.084;
- criação em 2026-09-19T18:56:48Z, push em 2026-10-04T01:58:33Z.

Grafias no README:
- “micro-frontend”: `README.md:57` (“Cada domínio é uma fronteira de micro-frontend independentemente implantável”) e `README.md:181` (“fronteiras de micro-frontend”). A busca de frase trata o hífen como separador.
- O plural “micro frontends” não aparece literalmente no README nem na descrição. “micro-frontends” só aparece fora do README (`specs/README.md:3`). O hit plural depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `61185d0` (2026-09-24), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 394 entradas, 393 arquivos regulares `100644` e 1 executável `100755` (`.claude/skills/salesforce/design-systems-slds-validate/scripts/analyze-quality.cjs`); zero symlinks e zero gitlinks. 378 entradas estão em `.claude/` (249 em `skills/salesforce`, 105 em `skills/salesforce-ux`). O restante: `README.md`, `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `NOTICE.md`, `docs/` (4 arquivos), `specs/README.md`, `scripts/verify-skills.mjs`, `assets/banner.svg`, um `.bat` e um workflow de CI. | contrária |
| Documentação (intenção) | `README.md:56–61` e `docs/sdd/DOMAINS.md:1–17`: sete domínios planejados como fronteiras de micro-frontend, a implementar como “LWR site/UI Bundle de Experience Cloud, um conjunto de OmniScripts+FlexCards, ou um pacote de LWCs” (`:3`), com status “rascunho” (`:7`). Agentes repetem a premissa (`.claude/agents/fsc-journey-ux-designer.md:34`; `fsc-sdd-orchestrator.md:12`). | fraca |
| Código-fonte (implementação) | `specs/` contém só `README.md`; não há `spec.md`, `prototype/` ou artefato de domínio. Nenhuma unidade frontend própria. | contrária |
| Código de terceiros | `.claude/skills/salesforce-ux/design-system-2-starter-kit/package.json:1–35`: starter kit da Salesforce UX (LWC, Vite). É uma única aplicação; os “apps” de `src/apps.config.js:1–30` são agrupamentos de rotas no mesmo build, com navegação própria. `.claude/skills/salesforce-ux/README.md:5`: “Vendorizado sem alteração de código”. | contrária |
| Busca | `git grep -i` no SHA por `micro.?front`, `federation` e `single.?spa`: só textos de documentação e prompts de agentes (README, `docs/sdd/DOMAINS.md`, `specs/README.md`, `.claude/agents/*`, `.claude/skills/salesforce-ux/README.md:13`). Nenhuma configuração de composição. Os imports `../../../` do starter kit ficam dentro do próprio kit. | ausente |

## Autoria e histórico

Clone não raso; 6 commits, nenhum merge.
- **Raiz:** `46238a9` (2026-09-19, “Início do histórico público”, 391 arquivos), com autor `Claude <noreply@anthropic.com>`. A mensagem declara squash do histórico anterior e traz trailers `Co-Authored-By: Claude Sonnet 5` e `Claude-Session`.
- **Titular:** `9ccb5d0` (Bruno Teixeira, pela interface web), `eb13ac2` e `61185d0` (`brunotrolo`), de 2026-09-23 a 2026-09-24, com ajustes de README e CI.
- **SHA:** `f2cec7e` e `91b8559` (2026-10-04), de novo com autor `Claude <noreply@anthropic.com>`, ajustam agentes, hooks e documentação.

O histórico anterior ao squash não está disponível. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend própria; os domínios são só planejados (`docs/sdd/DOMAINS.md:7`; `specs/` vazio). O starter kit vendorizado é uma aplicação única de terceiros. |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado. A arquitetura de micro-frontends está só descrita (`README.md:56–59`). |
| Q5 | No | Q1–Q4 são No: kit de agentes e documentação de método que menciona micro-frontends como arquitetura-alvo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- O starter kit é código de terceiros vendorizado como ferramenta de protótipo, sem relação de composição. É o mesmo tratamento de 205 (código de terceiros fora do escopo do projeto), não o de 102/074/080 (plataforma hospedeira de unidades).
- É conteúdo de método e prompts, como 023/094: o repositório descreve como projetar, mas não contém unidades compostas.
- `frontend_units: 0` (o kit vendorizado não é unidade do projeto), `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`. `repo_type: other`: ferramenta de agentes para desenho de jornadas, não exemplo de MFE, template nem biblioteca.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-frontend” usado como termo de arquitetura-alvo num kit de agentes de IA, com domínios ainda em rascunho.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (autoria):** três dos seis commits têm autor `Claude <noreply@anthropic.com>`, incluindo o squash inicial e o SHA.
