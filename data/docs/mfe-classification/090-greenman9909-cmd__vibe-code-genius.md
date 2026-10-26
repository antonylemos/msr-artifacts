---
schema: 1
id: 1380579775
full_name: greenman9909-cmd/vibe-code-genius
url: https://github.com/greenman9909-cmd/vibe-code-genius
commit: 1a7637160bfcc272d302797ec95176168a9c783a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 090 — greenman9909-cmd/vibe-code-genius

## Contexto

Ferramenta Python de planejamento e validação de artefatos para construção de aplicações, acompanhada de documentação, registros de execuções e um site estático de apresentação. A CLI tem entrada própria em `pyproject.toml:12–13`; seu planejamento grava JSON e Markdown (`vibe_code_genius/engine.py:22–31`). A arquitetura descrita como árvore/orquestração refere-se ao processo de build e aos artefatos, não à composição de aplicações frontend (`README.md:107–115`).

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:91`. Inventário completo por `git ls-tree -r 1a7637160bfcc272d302797ec95176168a9c783a`: **331 entradas, sendo 330 blobs e um gitlink**, nenhum `node_modules/` versionado. A única entrada HTML própria é `site/index.html`; não há fontes `.tsx`/`.jsx`. Os dois `package.json` estão em diretórios de scaffold e não têm a implementação de UI planejada correspondente. O gitlink é uma referência de código extraído, não outro frontend composto pelo site. Assim, `frontend_units: 1` conta o site próprio efetivamente implementado, sem contar saídas planejadas/geradas ou a referência externa.

O clone não é raso (`git rev-parse --is-shallow-repository`: false). A contagem real de commits alcançáveis pelo SHA avaliado é **49**, obtida por `git rev-list --count`; não é a quantidade dos últimos itens exibidos por `git log` nem a soma de outros branches.

**Branches, somente para registro:** `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado. Outras referências locais observadas, sem inspeção de seu conteúdo:

| Referência remota local | SHA |
|---|---|
| `origin/feat/godtree-os-core-v0.1` | `5eeba16274fa36da107ec1fb30367d731fbbdf6c` |
| `origin/feat/local-agent-gateway-v1` | `b3b207ee05ec105025d5c1e1969333991409553a` |
| `origin/patch/tool-orchestration-runtime` | `65cae9fbaf52e0535b127370005cc0178c321ef7` |
| `origin/product/god-tree-completion-2026-09-23` | `092353bae47e7946bd8dc5226d73eb9f7017b1f2` |
| `origin/research/2026-09-23-training-cycle-2` | `950b43488c3369dce6646780d75ece36ce59c862` |
| `origin/site/resend-inspired-god-tree` | `97e9c6750c27b73f7c99b9c586a968cc644690a9` |
| `origin/training/2026-09-23-evidence-cycle` | `6642f4951a619952cba6a486e78c995e33cc4650` |

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia / Código-fonte (ferramenta) | `pyproject.toml:5–13` define o pacote Python e comando `vibe-tree`. `vibe_code_genius/cli.py:18–40` registra planejamento, aquisição de referências e verificações; `vibe_code_genius/engine.py:22–31` produz arquivos de sessão e plano. Essas operações não são unidades frontend nem seu root de composição. | contexto |
| Código-fonte (frontend próprio) | `site/index.html:8` carrega CSS, `site/index.html:20–40` implementa a apresentação do produto e `site/index.html:65` carrega apenas `/app.js`. `site/app.js:1–5` adiciona foco à navegação por âncoras do próprio documento. Trata-se de uma página HTML/CSS/JavaScript, sem framework UI observado. | contrária |
| Configuração / Build/deploy | `server.py:5–9` fixa `site/` como diretório servido por `SimpleHTTPRequestHandler`; `server.py:22–26` inicia o servidor HTTP. `railway.json:3–6` executa `python server.py`. Não há bundler ou composição de outros frontends nessa entrega. | contrária |
| Estrutura (scaffolds) | `first-build/scaffold/package.json:5–19` e `trust-build-2/scaffold/package.json:5–19` declaram Next/React e scripts. Porém, `first-build/file-tree.md:5–28` e `trust-build-2/file-tree.md:4–17` descrevem arquivos de páginas/layout que não existem na árvore. Os fontes `.ts` dessas execuções são clientes API, handlers, servidor e webhook; por exemplo, `first-build/server/index.ts:17–21` define tratamento de erro de API. Manifestos e árvores propostas não confirmam duas aplicações frontend instanciadas. | contexto |
| Documentação de arquitetura (execuções) | `first-build/stack-decision.md:3–18` descreve perfil de referência e decisões-alvo Next/React; `trust-build-2/stack-decision.md:3–15` registra Next, hidratação seletiva e alvo Railway. São decisões de artefatos de execução, sem fontes das páginas correspondentes ou contrato de composição entre aplicações. Não se atribui React/Next à página estática própria por esses documentos. | contexto |
| Estrutura / Documentação (submódulo) | `.gitmodules:1–4` registra `references/extracted/ani-pm/code`; a árvore fixa esse gitlink no commit `2f734e7334a9a9e2db6a43c876fe88613687827f`. `references/extracted/ani-pm/README.md:3–13` o identifica como frontend extraído por SPA-Ripper, mantido em outro repositório como referência. Não foi inicializado nem inspecionado como outra aplicação própria do candidato. | contexto |
| Documentação (limite da referência) | `references/extracted/ani-pm/README.md:63–67` delimita a captura como referência histórica. `references/extracted/ani-pm/reference-source.json:10–13` declara modo external-pinned-reference. `contracts/extracted-design-learning-contract.md:3–19` trata código extraído como evidência para análise de design antes de implementar outro produto, não como módulo que o site carrega. | contexto |
| Documentação (processo) | `README.md:13–21` descreve a ferramenta de construção; `README.md:105–115` distingue o plano dos artefatos que a integração deve produzir e explica as etapas. `nodes/t2/11a-design-system-extract.md:11–34` descreve extração/análise de design. O vocabulário composição e componentes descreve construção de código/artefatos, não configura MFE. | contexto |
| Documentação (uso e proveniência) | `docs/customization.md:25–35` documenta adapters de integração e extensões de schema. `walkthroughs/2026-09-22-resend-god-tree-explainer.md:10–22` descreve a intenção de usar o processo para construir um site sobre a ferramenta. Esses registros contextualizam os exemplos/scaffolds, sem acrescentar uma unidade frontend ao site servido. Não há diretório ou documento identificado como ADR no inventário; as decisões de arquitetura observadas estão nos registros citados. | contexto |
| Histórico | Entre os 49 commits alcançáveis, `b3137d01fe57d912207fed5c1023fb22c3443ea2` (2026-09-22, Attach ani.pm extracted frontend as pinned code reference) já contém o gitlink no mesmo SHA fixado. `d72f5a68ce96d91b64a7a16dc4b881adf6b145db` (2026-09-22, Add Railway-ready Vibe Code Genius showcase) contém `server.py`, `site/index.html` e `site/app.js` com blobs idênticos aos do commit avaliado, conferidos por `git ls-tree`. Seus conteúdos atuais em `server.py:5–9`, `site/index.html:65` e `site/app.js:1–5` permanecem a entrega estática. Os títulos não foram usados isoladamente para inferir implementação. | contexto |
| Estrutura / Configuração (busca negativa de unidades) | Inventariados todos os caminhos: somente `site/index.html` como entrada HTML, nenhum `.tsx`/`.jsx`, nenhum `next.config.*`, `vite.config.*`, configuração de Module Federation ou outra aplicação frontend implementada. Os únicos manifestos npm são os dois scaffolds citados. O conteúdo do gitlink não pertence ao inventário de blobs próprios e não foi contabilizado como alvo de composição. | ausente |
| Tecnologia / Configuração / Código-fonte (busca negativa de composição) | Em todos os blobs próprios com extensões `.py`, `.js`, `.ts`, `.tsx`, `.json`, `.html`, `.md`, `.yaml` e `.toml`, procurados `micro.?frontend`, `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` e `srcDoc`, sem resultados. O escopo não expande o gitlink, nem as imagens; não se confunde árvore de geração com root frontend. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Há somente um frontend próprio implementado: `site/index.html:8–65`, servido por `server.py:5–9`. Os manifestos Next são scaffolds sem páginas presentes; a captura em submódulo é referência histórica (`references/extracted/ani-pm/README.md:3–13`, `references/extracted/ani-pm/README.md:63–67`), sem configuração de composição. |
| Q2 | No | Não há um conjunto de unidades frontend a avaliar nem preparação da página estática para host externo. A entrega observada serve um único diretório (`server.py:5–9`, `railway.json:3–6`); scripts declarados em `first-build/scaffold/package.json:5–9` não comprovam outra unidade implementada. |
| Q3 | No | Não há host/shell/root carregando unidades. `site/index.html:65` carrega somente o script local, e `site/app.js:1–5` opera âncoras no mesmo documento. A referência externa não é importada, montada ou roteada pelo site. |
| Q4 | No | Buscas de configuração/contratos de composição foram negativas; o servidor estático serve a página (`server.py:5–9`) e seu script não compõe outros alvos (`site/app.js:1–5`). Links de documentação e gitlink de referência não configuram composição frontend. |
| Q5 | No | A implementação mostra ferramenta Python de artefatos (`vibe_code_genius/engine.py:22–31`) com um site estático e referências de design, sem instância MFE. Q5 acompanha Q1–Q4; nenhum override. |

## Motivo

- Proposta `Non-MFE`, Q1–Q5 No. O repositório é uma ferramenta de construção/validação e documentação, com uma página própria de apresentação; não é uma aplicação composta por micro-frontends.
- Os precedentes 023/028 e 081 distinguem implementações frontend de conteúdo, código exibido/gerado e alvos sem composição. Arquivos de planejamento, manifestos de scaffold e fonte extraída como referência não acrescentam unidades a Q1.
- Não é MFE-unit: a página própria não exporta módulos, lifecycles ou contrato para host externo. Por isso, Q2–Q4 são No, sem converter a ausência de um host hipotético em Undetermined.
- A ferramenta pode ser instalada em plataformas de desenvolvimento, mas esses adapters não são extensões visuais que façam dela uma unidade frontend composta. Não se aplica a exceção de host próprio ausente nem a regra de plugin visual de plataforma.
- `ui_technologies: []` e `build_tools: []` refletem a página própria em HTML/CSS/DOM e a ausência de configuração de bundler para ela. As declarações React/Next dos scaffolds e a descrição React/Vite da captura externa não são atribuídas ao frontend próprio. Não há decisão aberta de iframe/link/build time ou code sharing neste caso.

## Notas para análise

- **RQ1:** orquestração, componentes, composição e árvore descrevem um processo de geração e seus contratos. A prova de arquitetura frontend depende de código consumidor entre unidades, não desse vocabulário.
- **RQ1 (contagem):** 331 entradas de árvore não equivalem a 331 arquivos de código próprio: são 330 blobs mais um gitlink. Não se materializou o submódulo nem se adotaram os 227 arquivos informados no inventário externo de `references/extracted/ani-pm/reference-source.json:15–22` como unidades ou fontes deste candidato.
- **Protocolo (famílias):** buscas nas anotações existentes por `greenman9909`, `vibe-code-genius`, `ani.pm` e `God Tree` não encontraram irmãos/família já anotados. O repositório de referência é citado como proveniência da captura, sem inferir origem comum com candidatos anteriores. Os casos 075 e 081 são comparáveis apenas pela separação entre ferramenta geradora e artefatos produzidos; não indicam template ou ancestralidade compartilhada.
- **Protocolo (inspeção):** a classificação usa o commit fixado e seus 49 commits ancestrais somente para contexto histórico. Nenhum conteúdo de branches alternativos foi usado; não se executaram gerador, servidor, testes, instalação ou acesso aos serviços/referências externas.
- **Protocolo (entrada na amostra e submódulo):** o candidato entrou pela estratégia `broader` (`sample.csv`, linha do rank 90) e nenhum termo de micro-frontend aparece no snapshot; a entrada se explica por termos amplos como orquestração e composição (`README.md:13`, `pyproject.toml:8`), sinal enganoso de busca. O gitlink `references/extracted/ani-pm/code` (`2f734e73…`) é declarado em `.gitmodules:2–4` (url `greenman9909-cmd/ani-pm-frontend`, branch `main`) e, segundo `references/extracted/ani-pm/README.md:3` e `:12–13`, é a captura de um site de terceiro extraída por SPA-Ripper, mantida como referência de design e não implementação do autor; reforça a exclusão de Q1 mesmo que fosse materializado. Não se entrou no submódulo nem se acessou a rede.
