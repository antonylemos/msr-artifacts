---
schema: 1
id: 1342733584
full_name: portable-genai/human-review-console
url: https://github.com/portable-genai/human-review-console
commit: 191cd1f2c3482d50dc3106b3ba5d613f0664beec
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [iframe]
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 156 — portable-genai/human-review-console

## Contexto

Serviço Python (FastAPI, arquitetura hexagonal) de fila de revisão humana e maker-checker para uma família de sistemas de IA generativa. Inclui uma UI Next.js em `ui/` (`README.md:3–20`). A documentação apresenta essa UI como “an embeddable Next.js micro-frontend”, que se insere em uma aplicação host do cliente:
- por iframe, com allowlist `frame-ancestors`;
- ou same-origin sob um sub-caminho de reverse proxy, com `NEXT_PUBLIC_BASE_PATH` e o modo `NEXT_PUBLIC_EMBED`, que remove o chrome da página.

Fontes: `README.md:157–162`; `docs/embedding-and-identity.md:1–19`, `76–85`. O host não está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:157` registra rank 156, ID 1342733584, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:157` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35872` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35877` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:03.458Z / 2026-10-08T16:01:57.166Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:12.610Z / 2026-10-08T16:10:36.351Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit:
- descrição sobre a fila de revisão humana, sem os termos;
- tópicos `ai-agents`, `ai-platform`, `generative-ai`, `platform`, `ports-and-adapters` e `vendor-portability`;
- linguagem Python, `fork: false`, tamanho 664;
- criação em 2026-08-22T11:12:33Z, push em 2026-10-05T08:55:32Z.

O acerto vem de `README.md:159`, “`ui/` is an embeddable Next.js micro-frontend”, com grafia hifenizada; a busca de frase trata o hífen como separador. É a única ocorrência no README raiz; o sinal se repete em `ui/README.md`, `docs/embedding-and-identity.md`, `.agents/skills/README.md` e `.agents/skills/embeddable-secure-ui/SKILL.md`. O plural “micro frontends” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `0862d35` (2026-09-04). Ela e o SHA (2026-10-02) antecedem as coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 188 entradas, 187 arquivos regulares `100644` e 1 executável `100755` (`scripts/prove-exposure-matrix.sh`); zero symlinks e zero gitlinks. Há um backend Python em `src/review_console/` (domínio, ports, adapters local/gcp/onprem, API, CLI), `tests/`, `infra/terraform/`, `eval/` e `.agents/skills/`, e um único projeto frontend em `ui/` (`ui/package.json`, `ui/next.config.mjs`, `ui/app/`, `ui/components/`, `ui/lib/`). | contexto |
| Documentação (embedding) | `README.md:157–162` e `ui/README.md:3`: “embeddable Next.js micro-frontend”. `docs/embedding-and-identity.md:7–23`: três formas de implantação, que são local, “Embedded same-origin behind a reverse proxy” (`NEXT_PUBLIC_BASE_PATH=/review`, `NEXT_PUBLIC_EMBED=1` “so … the host owns the frame”) e standalone atrás de IAP. `docs/embedding-and-identity.md:76–85`: allowlist `frame-ancestors` do host. `:122–130`: checklist de integração do cliente. | moderada |
| Configuração (preparação para host) | `ui/next.config.mjs:14–16`, `39`: `basePath`/`assetPrefix` a partir de `NEXT_PUBLIC_BASE_PATH`. `ui/app/layout.tsx:18–31`: modo embed sem chrome. `ui/app/page.tsx:7`: `IS_EMBEDDED`. `ui/proxy.ts:19–37` com `ui/lib/security-headers.mjs:47–89`: CSP `frame-ancestors` configurável e recusa de curingas. Não há `exposes`, lifecycles, custom element, `postMessage` nem registro de navegação com o host (busca registrada). | moderada |
| Código-fonte (fronteiras) | Os imports `../` de `ui/` ficam dentro de `ui/` (`ui/app/page.tsx:4–5`; `ui/components/ModelPills.tsx:5–6`; `ui/app/layout.tsx:3`). A UI fala com o backend só por HTTP (`ui/lib/api.ts:1–16`, `NEXT_PUBLIC_REVIEW_API_URL`). O `Dockerfile:23–29` empacota só o backend Python. | contexto |
| Tecnologia | `ui/package.json:14–28`: `next` 16.3.8, `react` 19.3.0, `react-dom` 19.2.8 e Tailwind 4. Não há bundler configurado explicitamente; o Next o encapsula. | contexto |
| Busca negativa | `git grep -i` no SHA, em `ui`, `src`, `docs` e `README.md`, por `postMessage`, `federation`, `single-spa`, `customElements` e `<iframe`. Só acha `FederationPolicy`/`hex_service_kit.federation`, que tratam de federação de identidade (`docs/practices-audit.md:29`; `src/review_console/adapters/gcp/identity.py:24`), sem relação com frontend. | ausente |

## Autoria e histórico

Clone não raso.
- **Commits alcançáveis a partir do SHA:** 57, nenhum merge, todos de Ashish Awasthi (identidades noreply e `@gmail.com`, 48 commits) e de `dependabot[bot]` (9). A raiz é `f65ee72` (2026-08-22, “Initial commit”); o SHA é `191cd1f` (2026-10-02).
- **Ferramentas de assistência:** `AGENTS.md:1–12` remete a um acordo de trabalho compartilhado da organização, e `.agents/skills/` contém playbooks, entre eles `embeddable-secure-ui/SKILL.md:1–30`, que descreve o padrão de UI embutível aplicado aqui. Os metadados não separam autoria intelectual.
- **Refs fora do snapshot:** os branches `dependabot/*` (com commits de 2026-10-05 e 2026-10-09) não foram considerados.

Nenhum blob histórico foi lido. O clone é parcial e `git rev-list --objects --missing=print` no SHA reporta 193 blobs promisor ausentes; o snapshot do SHA foi lido localmente, sem rede.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`ui/`). O backend Python não é unidade frontend. Nenhuma configuração de composição referencia outras unidades. |
| Q2 | Yes (para a unidade) | `ui/` tem entrada e build próprios (`ui/package.json:7–9`), separados do backend, com o qual só fala por HTTP. |
| Q3 | Undetermined | A aplicação host do cliente não está no repositório; só a documentação descreve a inserção (`docs/embedding-and-identity.md:16–19`, `122–130`). |
| Q4 | Undetermined | A unidade está configurada para ser embutida, por iframe (`frame-ancestors`) ou por sub-caminho same-origin (`basePath`, modo embed), mas o lado host não é observável. |
| Q5 | No | Há uma unidade preparada para inserção em host externo, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`, pelo mesmo raciocínio de 031 (`MFE-unit`/review, `approaches: [iframe]`): unidade única preparada para composição por host não observável, por iframe.
- **Diferença em relação a 031:** em 031 havia contrato bidirecional (registro de navegação e mensagens `postMessage`). Aqui a preparação é configuração de inserção: `basePath`, modo sem chrome e allowlist de `frame-ancestors`, sem protocolo de mensagens.
- **Decisão aberta do checklist:** “Link-only or iframe composition: does it count as a composition mechanism for Q4?”. Se não contar, o caso passa a `Non-MFE`, como “conventional frontend” de um serviço com UI embutível.
- **Precedentes que não se aplicam:**
  - não é plataforma de terceiros (102/074/080, 037): o host é a aplicação de qualquer cliente que adote o serviço;
  - não é code sharing (089/100);
  - não há cadeia completa (076/084/096/106/109);
  - não é conteúdo (023): há uma UI real e funcional.
- **Campos:**
  - `approaches: [iframe]`, como em 031, pelo `frame-ancestors`; a forma same-origin por reverse proxy fica registrada nas Notas.
  - `ui_technologies: [react, next]`; `build_tools: []`, pela convenção do Next.
  - `frontend_units: 1`, `single-unit`.
  - `repo_type: template`: base de referência para instituições fazerem fork (`docs/ADOPTING.md:1–5`, com ferramenta de renomeação `scripts/rename_fork.py`). `production` também seria defensável.

## Notas para análise

- **RQ2:** micro-frontend por inserção de documento (iframe com `frame-ancestors`) ou por montagem same-origin sob sub-caminho de reverse proxy, com identidade verificada no servidor e sem contrato de runtime com o host. É uma variante de composição por link ou iframe.
- **RQ1 (sinais enganosos):** “micro-frontend” como rótulo de UI embutível de um serviço backend-cêntrico. “Federation” no código é federação de identidade.
- **Protocolo (busca):** entrada só pela grafia hifenizada `README.md:159`; o hit plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

Decidir se uma UI preparada para inserção em host externo só por iframe (`frame-ancestors`) e por sub-caminho same-origin (`basePath`, modo sem chrome), sem `exposes`, lifecycles, custom element ou mensagens, conta como “frontend unit explicitly prepared to be composed by an external host”.

- **MFE-unit (proposto):** segue 031, com a preparação explícita e documentada (`docs/embedding-and-identity.md`) para um host não observável.
- **Non-MFE:** se a decisão aberta sobre iframe ou link for negativa, ou se a ausência de contrato de runtime com o host pesar, como no contraste com 031.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância com MFE-unit, Q1–Q5 No/Yes/Undetermined/Undetermined/No e `review`; a preparação para incorporação é explícita no código e na configuração, o host está ausente e a decisão metodológica sobre iframe segue aberta (checklist), junto de 031. Correções adotadas, verificadas no clone: 193 blobs promisor ausentes (não "nenhum objeto ausente") e a ocorrência terminológica não é única na documentação do repositório, pois se repete nos quatro arquivos acima. `repo_type: template` é confirmado por `ADOPTING` e `rename_fork`; `build_tools: []` porque o bundler não é declarado separadamente. As refs dependabot posteriores a `main` não foram incluídas na avaliação do snapshot.
