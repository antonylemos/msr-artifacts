---
schema: 1
id: 490787580
full_name: gorillaworkout/gorillaworkout
url: https://github.com/gorillaworkout/gorillaworkout
commit: e8b828415f8fbc3212042bdd9cd081aeaea9c3d7
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

# 115 — gorillaworkout/gorillaworkout

## Contexto

Perfil/portfólio pessoal em Markdown/HTML: apresentação de Bayu Darmawan, atuação profissional, links para projetos externos, tecnologias, estatísticas e contatos (`README.md:1–16`; `README.md:27–34`). O relato de trabalho com ESMX (`README.md:14`) e o link para uma demo MFE (`README.md:33`) não são código ou configuração de composição do candidato. O nome do repositório não foi usado para inferir seu tipo ou arquitetura.

## Proveniência na amostra

- Rank 115, ID, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:116`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:116`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:4158` e `data/discovery/mfe-round-002/candidates.csv:4161` registram elegibilidade `pass` em ambas, descrição `Gorillaworkout portfoliom`, tópicos vazios, linguagem/licença nulas, `fork: false` e último push `2026-02-26T06:45:45Z`.
- Consulta `sqlite3 -readonly` aos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits`, `queries` e `subqueries`, por `repository_id=490787580`: ambas registram os mesmos dois hits, estratégia `terminology`, endpoint `repositories`, `path` vazio e `partition_label: created:2022-05`.

| Consulta | Grafia de `q` | Subconsulta | Grafia de `q_effective` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2022-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2022-05-01..2022-05-31` |
| `terminology-micro-frontends-repositories` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2022-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2022-05-01..2022-05-31` |

Os `fetched_at`, na ordem das duas linhas, são `2026-10-07T22:17:26.274Z` e `2026-10-07T22:47:40.607Z` na rodada 001; `2026-10-08T15:52:24.335Z` e `2026-10-08T16:04:06.905Z` na rodada 002. Identificadores SQLite não recebem linhas textuais artificiais.

Por eliminação, nome e descrição não contêm os termos pesquisados, e os tópicos estão vazios. No README, as grafias exatas são `micro-frontend architectures` (`README.md:14`) e `ESMX micro-frontend demo` (`README.md:33`), com hífen e singular. As consultas usam espaços e incluem variante plural; não há plural literal nesses trechos. Os hits são compatíveis com recuperação via README, sem identificar trecho exato/normalização, nem confirmar implementação MFE.

O README do SHA **não é posterior às buscas**: HEAD integra o portfólio em `2026-02-26T13:45:45+07:00` (`2026-02-26T06:45:45Z`). O último commit de alteração do arquivo mostrado por `git log --name-status -- README.md`, `96039ce5d18491c32e94b9808b84ec5ced6c9421`, é de `2026-02-26T06:45:12Z`; ambos antecedem as coletas de outubro. A cronologia foi conferida por metadados, sem leitura de blob histórico.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário completo por `git ls-tree -r` do SHA: um arquivo regular, modo 100644, `README.md`; zero symlinks e zero gitlinks. Não há fontes, manifestos, lockfiles, entradas de aplicação, configs de build/composição, submódulos ou dependências vendorizadas. Zero unidades resulta de árvore inteiramente observável, não de falta de acesso. Inventário Git não possui linhas textuais de código artificiais. | contrária |
| Documentação | A pessoa se apresenta e relata atuação profissional (`README.md:1–16`). “Building micro-frontend architectures with ESMX framework” (`README.md:14`) é uma declaração no perfil, sem configuração executável. | contexto |
| Composição / Documentação | A tabela de projetos é um portfólio de links externos (`README.md:29–34`). MySuperApp é descrito como demo ESMX com React/Vue em uma SPA (`README.md:33`), mas não há fontes, remotes, entry URLs de configuração, lifecycles ou host do candidato que o carregue. O link de portfólio não é referência de unidade por configuração de composição. Os destinos não foram acessados. | contrária |
| Tecnologia | Next.js, React, Vue, TypeScript e Docker aparecem como tecnologias dos projetos ou badges (`README.md:31–34`; `README.md:44–66`). Sem código ou manifesto do candidato que os utilize, não preenchem `ui_technologies`, `build_tools` ou `approaches`. ESMX não é contado por menção isolada. | fraca |
| Código-fonte / Composição | Imagens, estatísticas e links de contato são conteúdo de apresentação (`README.md:4–5`; `README.md:79–97`; `README.md:102–116`). Não há unidade frontend implementada pela renderização do Markdown no GitHub, nem contrato de integração entre aplicações. | contexto |
| Tecnologia / Configuração / Build/deploy | Procurados no inventário completo manifests npm/workspace, entradas HTML/JS/TS, configs Webpack/Vite/Rspack/ESMX/federação, import maps e scripts de build/deploy: inexistentes. Busca textual no README por `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, imports/exports e `require(`: nenhum resultado. Não há cadeia remotes ↔ exposes ↔ consumo ou unidade preparada para host externo. | ausente |
| Código-fonte (fronteiras) | Busca ativa `git grep -n -F -e '../../' -e '../../../'` em toda a árvore do SHA: nenhum resultado. Ausência de fontes e de fronteiras entre unidades confirmada pelo inventário, sem usar ausência de imports como prova positiva de independência. | ausente |
| Documentação / Histórico | Leitura integral das linhas do README e inventário: não há ADR ou documentação arquitetural adicional. Metadados registram manutenção do perfil/portfólio, sem código de aplicação no snapshot. | contexto |

## Autoria e histórico

Metadados no SHA: 11 commits alcançáveis, um merge, um commit-raiz `8d662a748cb2e12588ff38d4767108fa9b4c5bd0`, clone não shallow. Dez commits registram autor `Bayu Darmawan` e committer `GitHub`; um registra `gorillaworkout` em ambos. Não se presume equivalência entre identidades nem autoria intelectual do software externo descrito no perfil.

`git log --no-renames --name-status -- README.md`, sempre com `GIT_NO_LAZY_FETCH=1`, mostra adição do README no raiz, de 10/05/2022, e revisões posteriores do documento. `96039ce5d18491c32e94b9808b84ec5ced6c9421` modifica o perfil/projetos em 26/02/2026; HEAD é o merge “Update portfolio: active projects & tech stack (#2)” no mesmo dia. Não houve objeto ausente nessas consultas; nenhum blob histórico foi necessário.

As refs `main`, `origin/main` e `origin/HEAD` apontam ao SHA avaliado. `origin/update-portfolio-readme` aponta a `96039ce5d18491c32e94b9808b84ec5ced6c9421`; somente metadados da ref foram registrados, sem leitura do conteúdo de branch alternativo. Não existem pastas de código para análise de importação/autoria por unidade. A autoria dos commits do perfil não comprova autoria ou arquitetura dos sites externos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Zero unidades após inventário completo de um README. Relato profissional e links de portfólio não são implementação nem configuração de composição (`README.md:14`; `README.md:29–34`). |
| Q2 | No | Não existem unidades com entradas/builds próprios ou fontes a comparar. Tecnologias são descritas em texto (`README.md:31–34`), sem projetos correspondentes na árvore. A busca integral de imports relativos é negativa. |
| Q3 | No | O documento oferece links externos de apresentação; nenhum host carrega, monta ou roteia unidades (`README.md:29–34`). |
| Q4 | No | ESMX aparece como tecnologia de trabalho/demo externa, não como mecanismo configurado e usado no candidato (`README.md:14`; `README.md:33`). Não há cadeia executável de composição. |
| Q5 | No | Perfil pessoal sem implementação frontend, consistente com a exclusão de menções a MFE sem arquitetura implementada. |

## Motivo

- `Non-MFE`: Q1–Q5 No, sem exceção MFE-unit. `repo_type: other`, `frontend_units: 0` e `unit_organization: none` seguem os finais 011/064/068 e os comparadores 073/077/101/111 de perfis pessoais. Zero é contagem observada, não `null` por inacessibilidade.
- Q1 exige unidades ou referências por configuração de composição. Uma entrada de portfólio que descreve demo MFE não fornece isso. Q2 exige entradas/builds de unidades e independência de fontes, não ausência de imports num documento. Q4 exige mecanismo configurado e conexão efetiva, não nome de framework ou link de demonstração.
- Não se decide a arquitetura do MySuperApp ou de qualquer destino externo. O objeto analisado é o snapshot deste perfil. Links informativos não tornam o perfil host MFE, e o caso não depende de arbitrar a regra geral de composição por links.
- Não há unidade preparada para host externo, portanto Q2–Q4 ficam No. Não é configuração não conectável como 097/103/104, federação/code sharing como 089/100, plataforma/código terceiro como discutido em 074/102/080 ou cadeia concreta como 076/084/096/106/109.
- Tecnologias e projetos mencionados são conteúdo do README, não alvos implementados; a separação de conteúdo/código efetivo dos precedentes 023/075/081/094/105 impede somá-los. Não há decisão aberta sobre build time, iframe ou imperfeição de execução.

## Notas para análise

- **RQ1 (famílias):** buscas por `gorillaworkout`, `MySuperApp` e `ESMX` nas anotações disponíveis não localizaram irmão do titular ou implementação da demo citada. A comparação é com perfis que relatam experiência MFE ou apontam projetos externos, especialmente 073/111, sem afirmar origem comum.
- **RQ3:** a cadeia é perfil → relato/link externo, sem elo para build, fonte, entrada ou configuração de composição própria. Imagens e badges não acrescentam unidades.
- **Protocolo:** consultas/subconsultas e grafias foram preservadas; o README é anterior às buscas. Não se converte a menção singular hifenizada em plural literal nem se atribui ao banco um trecho de casamento que ele não registra.
