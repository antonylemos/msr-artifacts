---
schema: 1
id: 1249073440
full_name: dobettest-plus/micro-frontend
url: https://github.com/dobettest-plus/micro-frontend
commit: a43b1d3dc4b9394c557c35f171adbbf7a141fac1
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

# 114 — dobettest-plus/micro-frontend

## Contexto

Repositório com somente um README de duas linhas: título `# micro-frontend` (`README.md:1`) e texto literal `????? - qiankun ??? + ???` (`README.md:2`). Os pontos de interrogação são bytes ASCII presentes no blob, não erro de decodificação desta inspeção; não se reconstruiu conteúdo presumido. A menção a qiankun não é acompanhada de código, dependência, configuração ou exemplo executável.

## Proveniência na amostra

- Rank 114, ID, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:115`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:115`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:30663` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:30670`, `pass`. Ambas têm descrição literal `????? - qiankun ??? + ???`, tópicos vazios, linguagem/licença nulas, `fork: false` e último push `2026-05-25T10:21:34Z`. O tamanho de repositório arredondado a zero nos metadados não substitui o inventário do blob presente.
- Consulta `sqlite3 -readonly` nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits`, `queries` e `subqueries`, por `repository_id=1249073440`: ambas têm os dois hits abaixo, estratégia `terminology`, endpoint `repositories`, `path` vazio e `partition_label: created:2026-05`.

| Consulta | Grafia de `q` | Subconsulta | Grafia de `q_effective` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` |
| `terminology-micro-frontends-repositories` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` |

Os `fetched_at`, em ordem das duas linhas, são `2026-10-07T22:35:41.883Z` e `2026-10-07T23:04:31.322Z` na rodada 001; `2026-10-08T15:59:28.928Z` e `2026-10-08T16:09:08.068Z` na rodada 002. Identificadores SQLite não recebem números de linha artificiais.

Por eliminação, a descrição menciona qiankun, mas não os termos pesquisados, e os tópicos estão vazios. Nome e título README contêm a forma singular hifenizada `micro-frontend` (`README.md:1`), enquanto as consultas usam espaços e incluem variante plural. Não há plural literal no documento. O banco não identifica qual dos dois campos ou qual normalização originou cada hit; não se atribui casamento exclusivamente ao README. Nome, menção e recuperação temática não são evidência de implementação.

O README do SHA **não é posterior às buscas**: o único commit que o adiciona é de `2026-05-25T18:21:33+08:00` (`2026-05-25T10:21:33Z`), anterior às quatro coletas em outubro. Não foi necessário inspecionar blobs históricos ou conteúdo de outro branch.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: um arquivo regular modo 100644, `README.md`; zero symlinks e zero gitlinks. Não há fontes, manifestos, lockfiles, entradas HTML/JS/TS, configurações de build, submódulos ou código vendorizado. Zero unidades é resultado de árvore completamente inventariada, não de falta de observabilidade. Inventário Git não possui linhas textuais artificiais. | contrária |
| Documentação | `README.md:1` é somente título temático; `README.md:2` contém o nome qiankun e sinais de interrogação literais. As duas linhas não identificam host, unidades concretas, URLs de entrada, lifecycle ou configuração de composição. | fraca |
| Tecnologia / Configuração / Código-fonte | Busca no único arquivo por `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, imports/exports e `require(`: único resultado é a palavra `qiankun` em `README.md:2`, como prosa. Não há chamada de API, dependência declarada ou mecanismo efetivamente configurado/usado. | ausente |
| Código-fonte (fronteiras) | Busca ativa `git grep -n -F -e '../../' -e '../../../'` em toda a árvore do SHA: nenhum resultado. O inventário confirma ausência de fontes e de fronteiras entre unidades; isso não é prova positiva de independência. | ausente |
| Build/deploy / Composição | Procurados na árvore completa manifests npm/workspace, configs de bundler/federação/qiankun, import maps, scripts de build, entradas de aplicação e exports/lifecycles: inexistentes. Não há cadeia remotes ↔ exposes ↔ consumo ou unidade preparada para um host externo. | ausente |
| Documentação / Histórico | Leitura integral do README e inventário: não há ADR, documentação de arquitetura adicional, código de exercício, gerador ou demonstração. O histórico só registra adição desse README, não implementação de uma arquitetura. | contexto |

## Autoria e histórico

Metadados: um único commit alcançável, zero merges, um commit-raiz, todos o próprio `a43b1d3dc4b9394c557c35f171adbbf7a141fac1`; clone não shallow. Autor registrado `Ivan`, committer `GitHub`, mensagem “Initial commit”. `git log --no-renames --name-status -- README.md` confirma adição de `README.md`. Todos os comandos Git no clone usaram `GIT_NO_LAZY_FETCH=1`.

As únicas refs observadas são `main`, `origin/main` e `origin/HEAD`, no SHA avaliado. Não houve objeto ausente nas consultas, nem leitura de blob histórico. Não existem pastas de código para atribuição por unidade; identidade Git da adição do documento não comprova implementação ou autoria de software externo. Não se infere que o texto foi gerado ou importado de terceiro sem evidência.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Zero unidades no inventário completo; as duas linhas só nomeiam tema/tecnologia (`README.md:1–2`). Não há referência de configuração a unidade externa. |
| Q2 | No | Não existem unidades com entradas/builds próprios, nem fontes a comparar; apenas README (`README.md:1–2`). A busca integral de imports relativos é negativa, sem sustentar independência. |
| Q3 | No | Não há host/shell/root config que carregue, monte ou roteie unidades. O README não identifica qualquer composição (`README.md:1–2`). |
| Q4 | No | A palavra qiankun é a única ocorrência tecnológica (`README.md:2`), sem dependência, configuração ou uso. Logo não há mecanismo efetivamente conectando unidades. |
| Q5 | No | Menção temática sem implementação frontend; não caracteriza MFE nem MFE-unit. |

## Motivo

- `Non-MFE`: Q1–Q5 No, sem exceção MFE-unit. `repo_type: other` registra documento inicial mínimo, sem inferir perfil pessoal, biblioteca, template executável ou exercício implementado.
- Q1 exige unidades concretas ou referências de configuração de composição; título e tecnologia mencionada não fornecem nenhuma. Q2 exige entradas/builds e independência entre fontes; não se responde Yes só porque não há imports. Q4 exige composição configurada e usada; aqui nem dependência existe.
- `frontend_units: 0`, `unit_organization: none`, UI/build/approaches vazios decorrem da árvore completa. Não é `null`: o conteúdo é observável. Não se registra `qiankun` em approaches por menção isolada.
- Corresponde à exclusão de repositórios que mencionam microfrontends sem implementar. Os finais 023/028 e comparadores 075/081/094/105 distinguem conteúdo, geradores e software efetivamente composto; aqui sequer há aplicação de demonstração. Diferentemente dos perfis 011/064/068/073/077/101/111, o texto não apresenta pessoa, mas a ausência de código leva ao mesmo resultado arquitetural.
- Não é integração não conectável como 097/103/104, code sharing a arbitrar como 089/100, distribuição/plugin de terceiros como discutido em 074/102/080 ou cadeia host/remotes como em 076/084/096/106/109. Nenhuma dessas alternativas é sustentada pelo snapshot.
- Sem unidade preparada para host externo, Q2–Q4 permanecem No. Não há decisão aberta de links, iframe, build-time composition ou imperfeição de execução; não foram executados builds/testes/rede.

## Notas para análise

- **RQ1 (famílias):** busca por `dobettest-plus` nas anotações disponíveis não localizou irmão do titular. A comparação com casos de conteúdo é metodológica, sem afirmar origem comum.
- **RQ1 (sinal enganoso):** título temático e qiankun podem motivar descoberta sem qualquer artefato de implementação. Os caracteres `?` foram preservados conforme os bytes, sem tradução ou reconstrução presumida.
- **Protocolo:** consultas/subconsultas e grafias foram preservadas. Nome e README são campos compatíveis com os hits, que não fornecem localização exata; o README do SHA é anterior às buscas.
- **Protocolo (precedente):** o comparador mais direto é o final 030 (`030-jyotithakre05__module-federation.md`): repositório com um único "Initial commit", só o nome temático, Non-MFE, `other`, 0 unidades, `none`. Fica ao lado de 023; 028 é pouco análogo (biblioteca com três unidades sem composição).
- **Protocolo (caracteres "?"):** os `?` de `README.md:2` são bytes `0x3f` literais no blob, e a description registrada nos hits das duas rodadas já traz os mesmos `?`. A perda dos caracteres originais, provavelmente não ASCII, ocorreu na origem, não no clone nem na exportação; o conteúdo não é reconstruído. `qiankun` aparece só como menção, por isso `approaches: []`.
