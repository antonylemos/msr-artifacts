---
schema: 1
id: 1073549332
full_name: jwbqfck95434TaraWong/hub
url: https://github.com/jwbqfck95434TaraWong/hub
commit: 0d6b0a0179c05654fa019a5267df7b9527ce0aa0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 122 — jwbqfck95434TaraWong/hub

## Contexto

Cópia declarada de Alby Hub, aplicação de carteira/nó Lightning com frontend React e backend Go, disponível em modos HTTP e desktop Wails (`README.md:5–15`; `README.md:584–586`). A UI inclui Bitrefill por iframe e recebe um evento de intenção de pagamento, abrindo confirmação e usando a API local. Essa ligação concreta é distinta das conexões NWC com outras carteiras/apps e das páginas internas compiladas no mesmo bundle.

A classificação fica em revisão por dois limites: a aceitação da integração por iframe com um serviço externo como composição de unidade frontend e o tratamento de um host herdado integralmente de produto terceiro. Não se presume autoria original pelo nome do titular ou pelo autor gravado nos commits.

ID e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:123`, status `cloned`; HEAD coincide com o commit do front matter. Todos os comandos Git do clone usaram `GIT_NO_LAZY_FETCH=1`. Inspeção somente leitura, sem instalação, execução de código, rede ou acesso ao conteúdo de branches alternativos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:123` registra rank 122, estratégia `broader` e elegibilidade `pass`; o manifesto aponta à rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:19753`, com elegibilidade `unknown`, e `data/discovery/mfe-round-002/candidates.csv:19759`, com `pass`.

Ambas registram descrição **“Forked from https://github.com/getAlby/hub.git”**, tópicos vazios, linguagem TypeScript, licença Apache-2.0, `fork: false`, criação em 2025-10-10T09:18:07Z e push em 2025-10-27T19:22:09Z. O indicador técnico `fork: false` não invalida a declaração de origem nem prova autoria original.

Consultas `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, pelo ID 1073549332, mostram um hit em cada rodada:

- Consulta `broader-micro-apps`, estratégia `broader`, texto **`"micro apps" frontend in:name,description,readme`**: frase com espaço, no plural, acompanhada de `frontend`.
- Subconsulta `broader-micro-apps#created:2025-Q4`.
- Consulta efetiva `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2025-10-01..2025-12-31`.
- Coletas: 2026-10-07T23:49:15.211Z na rodada 001 e 2026-10-08T16:26:55.548Z na rodada 002; `path` vazio, sem campo/linha casada.

Por eliminação, nome e descrição não contêm a frase pesquisada e não há tópicos. `README.md:604` contém exatamente **“micro apps”**, referindo-se a apps conectadas ao Hub por NIP-47; `README.md:57` e `README.md:584–586` contêm **“Frontend”/“frontend”**. São linhas compatíveis observadas, não localizações informadas pela API. O README foi alterado pela última vez no commit alcançável `8b1aacd26b957b217c8fa9b0b2c554083798b68e`, de 2025-09-04T11:53:22+07:00, portanto é anterior às buscas de outubro de 2026 e à própria criação deste repositório. Não foi considerado texto adicionado após as buscas. O nome do candidato não constitui evidência MFE.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` no SHA: 629 arquivos regulares `100644`, zero symlinks e zero gitlinks. Há um manifesto frontend (`frontend/package.json`), um config Vite, backend Go, documentação e configuração Wails. Não há segundo projeto frontend local, submódulo ou `node_modules` versionado. O alvo externo contado é referenciado pela implementação de iframe, não inferido de nomes de pastas ou dependências. | contexto |
| Código-fonte (host) | `frontend/index.html:12–14` carrega `src/main.tsx`; `frontend/src/main.tsx:1–17` monta `App` em uma raiz React. `frontend/src/App.tsx:10–19` escolhe roteador HTTP ou desktop usando a mesma lista de rotas. Esses modos são variantes do mesmo alvo, não duas unidades. | moderada |
| Código-fonte (roteamento) | `frontend/src/routes.tsx:36` importa Bitrefill e `frontend/src/routes.tsx:338–341` associa o componente ao caminho `bitrefill`. `frontend/src/screens/internal-apps/Bitrefill.tsx:84–96` renderiza o iframe para `https://embed.bitrefill.com/`, com parâmetros de pagamento Lightning. Há referência concreta a uma UI implantada em outra origem. | forte |
| Código-fonte (contrato do iframe) | `frontend/src/screens/internal-apps/Bitrefill.tsx:24–47` registra listener `message`, verifica origem `https://embed.bitrefill.com`, decodifica JSON e trata evento `payment_intent` com `paymentAddress`, abrindo diálogo de pagamento e construindo Invoice. Não é apenas um mapa, vídeo ou link documental. | forte |
| Código-fonte (integração funcional) | `frontend/src/screens/internal-apps/Bitrefill.tsx:49–81` encaminha pagamento à API local e trata resultado; `frontend/src/screens/internal-apps/Bitrefill.tsx:98–129` oferece confirmação/cancelamento na UI do host. Isso conecta a ação da UI externa ao fluxo local. O código remoto e sua emissão efetiva de eventos não estão neste snapshot. | forte |
| Configuração / Build/deploy | `frontend/package.json:6–12` define builds HTTP e Wails, ambos usando TypeScript/Vite e copiando adaptadores de plataforma. `wails.json:5–8` chama os mesmos scripts frontend. `frontend/vite.config.ts:1–13` configura React SWC, Tailwind, paths e PWA; `frontend/vite.config.ts:68–87` configura aliases/build/base. Não há segunda entrada/build próprios para as telas locais. | moderada |
| Configuração (resolução) | Imports do config correspondem aos pacotes declarados em `frontend/package.json:93–114`. O lock resolve Vite 5.4.19 (`frontend/yarn.lock:6162–6164`), React SWC 3.11.0 (`frontend/yarn.lock:2638–2640`), Tailwind Vite 4.1.11 (`frontend/yarn.lock:2405–2407`), PWA 0.20.5 (`frontend/yarn.lock:6142–6144`) e paths 4.3.2 (`frontend/yarn.lock:6153–6155`). Configuração e pacotes são estaticamente identificáveis; não se executou instalação/build nem se afirma sucesso de execução. | moderada |
| Código-fonte (fronteiras) | Busca ativa literal por `../../` e `../../../` em todos os TS/TSX/JS sob `frontend` retorna somente `frontend/src/screens/apps/NewApp.tsx:44–45`: ambos os caminhos resolvem a componentes dentro de `frontend/src/components`. Não cruzam fronteira de aplicação. Bitrefill é consumido por URL do iframe, não por import de suas fontes. A ausência de outras ocorrências não transforma telas locais em unidades independentes. | contexto |
| Tecnologia / Composição (buscas) | Busca em toda a árvore `frontend` e README por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` e `micro.?frontend` identifica a integração Bitrefill e o fluxo NWC, sem configuração de MF/single-spa/qiankun/wujie/import maps ou custom elements. A existência de iframe/mensagens foi analisada pelo seu consumidor, não considerada isoladamente. | contexto |
| Código-fonte / Documentação (outro postMessage) | `frontend/src/screens/apps/NewApp.tsx:263–289` emite `nwc:success` para a janela que abriu a autorização e pode redirecionar a `returnTo`; `README.md:352–355` documenta o fluxo. Isso autoriza uma conexão de cliente NWC; não identifica por si outra unidade frontend montada no Hub. Não foi somado à contagem. | contexto |
| Documentação / Histórico (origem) | `go.mod:1` identifica `github.com/getAlby/hub`; `wails.json:9–15` mantém autoria/empresa Alby; `README.md:5–8` identifica Alby Hub. Esses artefatos corroboram a descrição de cópia do upstream e impedem presumir que o titular deste clone criou a arquitetura. | contexto |

## Autoria e histórico

Metadados de `git rev-list`: **2.923 commits, 467 merges e 1 commit-raiz**, raiz `2e63fcf4830ebf9994d35340a77507b39420c46a`, de 2023-03-21T18:01:09+01:00, mensagem `open-source`. Clone não shallow. O SHA avaliado tem autor e committer `jwbqfck95434TaraWong`, data 2025-10-12T10:09:27+08:00, mensagem `Regular update`.

`git shortlog -sn` atribui todos os 2.923 commits à mesma identidade. Muitos commits antecedem a criação deste repositório, e os metadados de descoberta declaram a cópia de `getAlby/hub`. Portanto essa identidade gravada não prova autoria original do código ou da composição; não se afirma qual mecanismo produziu esse histórico nem se faz verificação externa.

`git log --no-renames --name-status` foi consultado por `frontend`, `frontend/src/screens/internal-apps` e `frontend/platform_specific`: respectivamente 1.113, 44 e 9 entradas de histórico de commits nessas consultas por caminho. O frontend aparece desde `09a4438` (2023-12-14); Bitrefill é adicionado em `1873fb9` (2025-03-18, `feat: bitrefill (#1195)`) e modificado em `7a5be8b`, `bf8394f` e `e56f3a3` durante agosto de 2025. Esses eventos são anteriores à criação do clone no GitHub e registram linhagem herdada, sem comprovar contribuição local do titular à integração. Não se leram blobs históricos; nenhum objeto ausente foi encontrado.

Referências locais, só para registro: `master`, `origin/master` e `origin/HEAD` apontam ao SHA fixado. Há dez outros refs remotos `origin/dependabot/...` para atualizações Go/npm, sem inspeção de seu conteúdo. A classificação não incorpora esses branches. Não há arquivo de ADR/architecture/design identificado pelo inventário; a documentação arquitetural lida está no README, incluindo a seção Frontend (`README.md:584–586`).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host React local e UI Bitrefill externa explicitamente referenciada pela implementação do iframe (`frontend/src/main.tsx:1–17`; `frontend/src/screens/internal-apps/Bitrefill.tsx:91–96`). A aceitação dessa dupla como unidades do fenômeno, diante da origem herdada e do serviço terceiro, é a decisão de revisão. |
| Q2 | Yes | O host tem entrada/build próprios (`frontend/index.html:12–14`; `frontend/package.json:6–12`); o alvo Bitrefill está implantado em origem separada e é consumido por URL, sem import direto de fontes (`frontend/src/screens/internal-apps/Bitrefill.tsx:91–96`). As duas ocorrências de imports relativos profundos ficam no mesmo alvo local. |
| Q3 | Yes | A rota Bitrefill monta o iframe no layout do host e o evento de intenção de pagamento aciona diálogo/API locais (`frontend/src/routes.tsx:338–341`; `frontend/src/screens/internal-apps/Bitrefill.tsx:24–47` e `frontend/src/screens/internal-apps/Bitrefill.tsx:49–81`). |
| Q4 | No | O iframe integra `embed.bitrefill.com`, serviço externo de pagamento, e seu contrato de mensagens não transforma o serviço em unidade frontend do Hub. |
| Q5 | No | A arquitetura e a integração foram herdadas de `getAlby/hub`; este candidato é uma cópia declarada do produto upstream. |

## Motivo

- Aplica-se a regra `Non-MFE`: o iframe integra serviço externo de pagamento e a arquitetura vem de cópia declarada do upstream, não de uma composição MFE do candidato.
- `frontend_units: 2` registra o host completo adotado pelo repositório e a UI externa explicitamente referenciada por composição. Não conta o Bitrefill como fonte própria local nem cada biblioteca/arquivo upstream como unidade. A aceitação desses alvos no fenômeno está aberta, como na distinção de distribuição completa e código vendorizado discutida em 102/074/080. Não se usa `0` ou `null` para esconder as duas aplicações identificáveis; eventual exclusão do serviço externo reduziria a contagem a um alvo local.
- `unit_organization: multi-repo` descreve a relação com a UI externa; HTTP e Wails usam a mesma aplicação e não aumentam a contagem. `repo_type: production` descreve o produto implantável de carteira, não a originalidade do fork.
- React e Vite estão demonstrados por entrada, configuração explícita e lockfile. `next-themes` é dependência utilitária e não demonstra uma aplicação Next. O PWA e as APIs Go tampouco são outras unidades frontend.
- O achado textual “micro apps” de `README.md:604` fala de clientes NWC que se conectam ao Hub, não demonstra decomposição de UI. A integração Bitrefill foi descoberta e verificada nos fontes independentemente desse sinal de seleção.

## Notas para análise

- **Protocolo (família):** busca nas anotações por `Alby`, `Bitrefill`, `getAlby` e `jwbqfck` não encontrou irmão já anotado. A origem `getAlby/hub` é declarada nos metadados e nos namespaces do código; não foi inferida apenas pelo nome do candidato.
- **Checklist:** em 031, ainda em `review`, há iframe com contrato explícito; 121 também está em revisão por suficiência do iframe, mas possui contrato mais simples de URL/rota. Aqui há evento de intenção de pagamento com origem verificada e consequência funcional local. Isso é mais forte que o embed de mapa de 119, sem resolver automaticamente a decisão metodológica.
- **Protocolo (terceiros):** 102/074 discutem distribuição/host herdado de plataforma; 080 distingue fonte vendorizada de alvo próprio. A regra final de 037 trata unidade cujo único host é plataforma de terceiros; aqui o host completo está no candidato e embute um serviço externo, situação que não deve ser equiparada automaticamente a plugin nem declarada autoral apenas pela presença dos fontes.
- **RQ1:** o histórico atribuído a um só autor é anterior à criação do repositório e contradiz uma leitura ingênua de autoria baseada em `git log`. Não se transfere o mérito arquitetural do upstream ao titular.

## Ponto para revisão conjunta

- **Iframe e serviço externo:** decidir se a UI Bitrefill, com origem própria, evento `payment_intent`, `paymentAddress` e fluxo de pagamento no host, conta como unidade frontend composta ou como integração de serviço/widget. Se contar, há evidência para Q4=Yes; se não contar, Q1/Q4/Q5 podem passar a No, `frontend_units` a 1 e a classe a `Non-MFE`. Não se propõe uma regra geral para todo iframe ou serviço de pagamento.
- **Host herdado:** a descrição declara cópia de `getAlby/hub`, e os artefatos preservam identidade Alby. Decidir se a adoção do produto completo conta como instância arquitetural do candidato, mesmo sem contribuição local de composição demonstrada, ou deve ser excluída como código de terceiros. Se o iframe for aceito mas a origem do host ainda estiver aberta, Q4 pode ser Yes e Q5 permanecer Undetermined, com justificativa explícita de divergência. Se ambos forem aceitos, a alternativa é `MFE-implemented`; caso a origem determine exclusão, registrar o fundamento de `Non-MFE` sem presumir que `fork: false` comprova autoria.

### Divergência entre analista e revisor (para a revisão conjunta)

O revisor independente (Prisma) concorda com os fatos e as citações, mas diverge da classe: propõe Non-MFE com Q1 No, `frontend_units: 1`, `single-unit`, `approaches: []`, por dois fundamentos independentes. O rascunho foi mantido em Uncertain/`review` porque ambos dependem de critério do pesquisador.

- **Fundamento A (iframe de serviço de terceiro):** o iframe aponta para `embed.bitrefill.com` com `ref` de afiliado e `utm_source=alby_hub` (`frontend/src/screens/internal-apps/Bitrefill.tsx:94`); o host apenas paga a fatura Lightning recebida. Seria o mesmo padrão de Stripe Elements em 110 e Google Maps em 119 (serviço de terceiro não é unidade própria). Esses precedentes ainda estão em `draft`, e a decisão aberta de `docs/mfe-classification-checklist.md:72` (iframe como mecanismo) não está resolvida. Bitrefill convive em `internal-apps/` com telas do mesmo bundle.
- **Fundamento B (host herdado):** `go.mod:1` é `github.com/getAlby/hub`, a description do repositório é "Forked from getAlby/hub" e o histórico inteiro do upstream, inclusive a integração Bitrefill (`1873fb9`, 2025-03-18, PR #1195 do upstream), é anterior à criação do clone (2025-10-10). A autoria única em 2.923 commits é compatível com reescrita de autoria; o mecanismo não é afirmado. É redistribuição de produto de terceiro, tema ainda em aberto (074, 080, 102).
- **Alternativa registrada:** se o pesquisador aceitar A ou B, a classe passa a Non-MFE (Q1 No, `frontend_units: 1`, `single-unit`, `approaches: []`). O revisor sugere decidir o 122 junto com 110 e 119 (widgets de terceiro), e não com 121, 078 e 031 (iframe entre alvos próprios), para não misturar critérios; o fundamento B independe da regra do iframe.
