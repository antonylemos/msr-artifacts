---
schema: 1
id: 886350855
full_name: maxgallo/talk-micro-frontends-five-years-after
url: https://github.com/maxgallo/talk-micro-frontends-five-years-after
commit: beed57f182dd6ab0cc9fc7e721f657c0d354be13
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

# 093 — maxgallo/talk-micro-frontends-five-years-after

## Contexto

Material de uma palestra: fonte Markdown, PDF, imagens e desenhos Excalidraw sobre a evolução da arquitetura frontend da DAZN. O README aponta às versões dos slides e às ferramentas de apresentação (`README.md:5–12`); o conteúdo detalha composição, roteamento e decisões arquiteturais, sem implementar as aplicações ou o orquestrador descritos (`slides.md:333–362`, `slides.md:462–485`). A classificação decorre dessa inspeção de conteúdo e inventário, não do nome do repositório.

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:94`. Inventário completo por `git ls-tree -r beed57f182dd6ab0cc9fc7e721f657c0d354be13`: **58 arquivos regulares, zero symlinks e zero gitlinks**; todos os modos são `100644`. Não há `node_modules/` versionado ou submódulo. São dois arquivos Markdown, um PDF, `.gitignore` e 54 arquivos sob `images/` (38 PNG, 14 Excalidraw, um JPG e um GIF). Não há manifesto de aplicação, entrada HTML ou fontes de unidades frontend. Por isso, `frontend_units: 0` é resultado observável do inventário, não ausência de acesso.

**Branches e histórico:** `master`, `origin/master` e `origin/HEAD` apontam ao SHA fixado. A tag local `ijs-munich-2024` aponta para `cc48ac05d7c583b9e436c80ef4f04c0f713ba68b`, ancestral do snapshot; foi registrada sem substituir o commit avaliado. O clone não é raso e `git rev-list --count` retorna **8 commits** alcançáveis pelo SHA.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:94` registra `strategies: terminology` e `eligibility_status: pass`. A origem da amostra é `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`). Em `data/discovery/mfe-round-002/candidates.csv:10651`, a linha do ID `886350855` registra a descrição “Slides for the talk done at jsday 2025 in Bologna”, `topics: []`, `language: null` e branch padrão `master`. Esses metadados contextualizam o material, mas não são prova da ausência/presença de implementação; essa conclusão vem dos artefatos inspecionados.

Consulta exclusivamente com `sqlite3 -readonly` ao banco `data/discovery/mfe-round-002/discovery.sqlite`, tabelas `hits` e `queries`, encontrou dois hits para `repository_id = 886350855`:

| query_id | strategy | endpoint | Consulta em `queries.q` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `terminology` | `repositories` | `"micro frontend" in:name,description,readme` |
| `terminology-micro-frontends-repositories` | `terminology` | `repositories` | `"micro frontends" in:name,description,readme` |

Os dois têm `path` vazio: são resultados de busca de repositórios, sem trecho de código identificado. A descrição registrada na descoberta ("Slides for the talk done at jsday 2025 in Bologna") não contém o termo e os tópicos estão vazios, então o acerto é compatível com o nome do repositório e com `README.md:1` (metadados do momento da descoberta, lidos em modo somente leitura). Para auditoria, as linhas SQLite são identificadas por essas chaves, pois o banco não possui numeração textual:

```sql
SELECT q.query_id, q.strategy, q.endpoint, q.q, h.path
FROM hits h JOIN queries q ON q.query_id = h.query_id
WHERE h.repository_id = 886350855
ORDER BY q.query_id, h.path;
```

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação / Estrutura | `README.md:5–7` aponta a `slides.pdf` e `slides.md`; `README.md:9–12` identifica Deckset e Excalidraw como ferramentas. A fonte `slides.md:1–13` usa tema e delimitadores de apresentação, não entrada de aplicação. | contexto |
| Documentação (arquitetura externa) | `slides.md:333–360` apresenta composição, orquestrador e seis micro-frontends da DAZN em diagramas/notas. `slides.md:483–485` apresenta outra arquitetura por imagem. Essas descrições são objeto da palestra; não há fontes, builds ou configuração executável desses sistemas no repositório. | contexto |
| Documentação (mecanismos) | `slides.md:45–46`, `slides.md:172` e `slides.md:445` mencionam SystemJS, Module Federation e Single-SPA como tópicos comparados. `slides.md:462–478` discute um wrapper SystemJS e políticas de releases. Não há chamada de carregamento ou registro executável nessas passagens. | contexto |
| Documentação (composição e comunicação) | `slides.md:201–242` referencia diagramas de composição/roteamento; `slides.md:300–314` lista storage, parâmetros URL, event bus e props como alternativas. Trata-se de texto de apresentação, não contrato implementado entre unidades deste candidato. | contexto |
| Documentação / Estrutura (desenhos) | `images/monolith_vs_vertical_mfes.excalidraw:1–7` identifica dados Excalidraw e elementos gráficos; o desenho é referenciado em `slides.md:147–150`. As 14 fontes Excalidraw e suas imagens são material visual, não pacotes de aplicação ou unidades de Q1. | contexto |
| Documentação (ADRs) | `slides.md:533–547` contém uma seção comentada sobre RFCs e Architecture Decision Records como prática recomendada. O inventário não contém ADR próprio, diretório `docs/`, implementação de exemplo ou configuração de deploy das aplicações discutidas. A menção a ADR não demonstra um registro de decisão de uma aplicação implementada aqui. | contexto |
| Histórico | Oito commits, de `162257586b16e220158a9e25b6939d0457087188` (2024-11-10, initial commit) ao SHA avaliado (2025-04-08, fix: typo). Entre eles, `38a509c7d6a905cfdafe41abed4198bc56598f3b` (2024-11-12, feat: add architecture comparison), `7fbe6a385e6880cd77fa3c2a0198ee6ad99db408` (2024-11-13, feat: decision framework slides) e `b78b1de2363802f10e8f136914ac3635a8051867` (2025-04-08, feat: add qr code at the end) tratam a evolução do material. A inspeção dos caminhos nas oito árvores não encontrou `package.json`, fontes `.js/.jsx/.ts/.tsx`, entradas HTML, Vue ou Svelte. O conteúdo atual continua sendo o deck, incluindo o QR de encerramento em `slides.md:700–707`. Não se inferiu aplicação a partir dos títulos dos commits. | contexto |
| Estrutura / Build/deploy (busca negativa) | Inventariados todos os caminhos do SHA: procurados manifests de aplicação, fontes e entradas HTML/JS/TS/JSX/TSX/Vue/Svelte, diretórios de apps, configurações Webpack/Vite/Next/Angular e workflows de build/deploy. Nenhum foi encontrado. PDF, imagens e Markdown não fornecem builds/entradas de unidades frontend próprias. | ausente |
| Configuração / Código-fonte (busca negativa) | Nos arquivos Markdown e fontes textuais `.excalidraw`, procurados `ModuleFederation`, `module.federation`, `single.?spa`, `SystemJS`, `registerApplication`, `remoteEntry`, `mount(`, `unmount(`, `<iframe`, `postMessage`, `exposes:` e `remotes:`. Os resultados são somente as menções textuais de tecnologia já citadas em `slides.md`; não foram encontrados registros, loaders, exposições, lifecycles ou contratos implementados. O escopo não trata pixels do PDF/imagens como código executável. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Zero alvos frontend de aplicação no inventário. O material referenciado em `README.md:5–12` é um deck; os seis MFEs mencionados em `slides.md:353–362` são conteúdo sobre arquitetura externa, não unidades presentes ou referenciadas por configuração executável de composição. |
| Q2 | No | Não há unidades com entradas/builds próprios. Deckset e Excalidraw são ferramentas de apresentação (`README.md:9–12`), não builds de aplicações MFE; nenhum manifesto ou fonte de aplicação foi encontrado. |
| Q3 | No | Não há host/root implementado. O orquestrador aparece como assunto e imagem em `slides.md:342–349`; não existe código que carregue, monte ou roteie aplicações neste snapshot. |
| Q4 | No | Module Federation, single-spa e SystemJS aparecem em notas/slides (`slides.md:45–46`, `slides.md:445`, `slides.md:462–478`), sem configuração ou consumo executável. Não há contrato próprio por iframe/link/postMessage. |
| Q5 | No | O conjunto demonstra apresentação sobre MFE, sem implementação do fenômeno no candidato (`README.md:5–12`, `slides.md:333–362`). Q5 acompanha Q1–Q4, sem override. |

## Motivo

- Proposta `Non-MFE`, Q1–Q5 No. Corresponde diretamente à exclusão de repositório que discute MFE sem implementá-lo e ao precedente final 023 para slides.
- As aplicações, tecnologias e diagramas da palestra não contam como unidades de Q1. Nem o PDF/deck é contado como uma aplicação do corpus; `frontend_units: 0`, `ui_technologies: []`, `build_tools: []` e `approaches: []` seguem o critério aplicado a material de apresentação.
- Não é MFE-unit: não há unidade própria preparada para host externo; portanto Q2–Q4 são No, sem usar Undetermined pela ausência do sistema externo descrito na palestra.
- Não há questão aberta de plugin de plataforma, code sharing, composição por pacote, iframe/link ou execução defeituosa. Recomendações e exemplos conceituais da apresentação não foram promovidos a regras metodológicas nem a implementação observada.

## Notas para análise

- **RQ1 (amostragem):** o candidato entrou pelas buscas terminológicas de repositórios registradas acima. Nome, descrição e termos presentes no deck são metadados/conteúdo temático; nenhum deles isoladamente confirma arquitetura implementada.
- **Protocolo (famílias/templates):** buscas nas anotações por `maxgallo` e `five years after` não encontraram irmão já anotado. O caso `docs/mfe-classification/023-arunkumarsubburaj__mfe_slide_dev.md` é análogo por ser apresentação, mas usa Slidev, enquanto este material aponta a Deckset/Excalidraw. Não há evidência de template comum ou ancestralidade compartilhada.
- **Protocolo (inspeção):** conferidos 58 arquivos regulares, zero symlinks/gitlinks e oito commits alcançáveis, sem expandir dependências ou consultar a rede. O Markdown foi a fonte textual da palestra; a versão PDF foi inventariada, sem confundi-la com implementação ou exigir extração redundante para sustentar Q1–Q5. Não se executaram aplicações, builds ou ferramentas de apresentação.
