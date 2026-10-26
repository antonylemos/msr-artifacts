---
schema: 1
id: 1115557843
full_name: Dev-BioTech/biotech-health-mf
url: https://github.com/Dev-BioTech/biotech-health-mf
commit: 47525024cdcf770fb0a0bd17418bb00bf30b5c41
classification: MFE-unit
checklist: { q1: yes, q2: yes, q3: undetermined, q4: no, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 150 — Dev-BioTech/biotech-health-mf

## Contexto

Módulo “Health” de uma plataforma de gestão pecuária, BioTech, com vacinação, registros sanitários e diagnósticos. O README o apresenta como microfrontend acessado pela “Shell Application” em `biotech-shell.vercel.app` (`README.md:1`, `30`). O repositório contém só esse projeto Vite + React. Ele está configurado como remoto Module Federation `healthMF`, que expõe cinco telas e um store (`vite.config.js:27–45`), e também declara um remoto `authMF` em `localhost:5001` (`vite.config.js:30–32`), que nenhum código importa. O shell e o `authMF` não estão no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:151` registra rank 150, ID 1115557843, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:151` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22138` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:22144` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2025-12` | vazio | 2026-10-07T19:25:56.873Z / 2026-10-08T15:40:18.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2025-12` | vazio | 2026-10-07T22:10:09.900Z / 2026-10-08T15:48:38.435Z |
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | code | `…#size:1300..1449` | `package.json` | 2026-10-07T22:06:50.926Z / 2026-10-08T15:49:54.689Z |

As consultas terminológicas efetivas acrescentam `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`. A de código acrescenta `size:1300..1449`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 135;
- criação em 2025-12-13T04:52:46Z, push em 2026-06-11T19:43:22Z;
- homepage `biotech-health-mf.vercel.app`.

Grafias e linhas:
- **Terminologia:** sem descrição, o acerto vem do README, cuja única grafia é “Microfrontend”, em `README.md:1` e `README.md:30`. O plural “microfrontends” não aparece no README nem na descrição, então esse hit depende do processamento textual da busca do GitHub, que não está registrado, como em 143 e 149.
- **Código:** o `package.json` do SHA tem 1.374 bytes, dentro da faixa, e declara `"@originjs/vite-plugin-federation": "^1.4.1"` em `package.json:35`.

A última alteração do README é `3401e6e` (2025-12-16), anterior ao SHA (2026-03-01) e às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 37 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz (`package.json`, `vite.config.js`, `index.html`, `src/`, `vercel.json`), organizado por features (`dashboard`, `health-records`, `vaccination`) e `shared`. Não há shell, host nem segundo frontend. | contexto |
| Configuração (exposição) | `vite.config.js:27–45`: `federation({ name: "healthMF", filename: "remoteEntry.js", exposes: { "./HealthDashboard", "./HealthRecordsView", "./VaccinationCalendar", "./HealthRecords", "./DiagnosticHistory", "./HealthStore" } })`. `vite.config.js:46–62`: `shared` singleton para `react`, `react-dom`, `react-router-dom`, `zustand`, `framer-motion` e `lucide-react`. `vite.config.js:65–70`: ajustes de remoto (`modulePreload: false`, `cssCodeSplit: false`). | moderada |
| Configuração (remoto declarado) | `vite.config.js:30–32`: `remotes: { authMF: "http://localhost:5001/assets/remoteEntry.js" }`. `git grep authMF` no SHA só acha essa linha: nenhum `import("authMF/…")` ou import estático. É uma referência declarada sem consumidor. | ambígua |
| Código-fonte (contrato com o shell) | `src/features/dashboard/components/HealthDashboard.jsx:11–15`: tela exposta com callbacks `onViewRecords`, `onViewCalendar` e `onViewDiagnostics`. `src/shared/utils/auth.js:1–4`, `10–15`: lê o `auth-storage` do `localStorage`, “used by the Shell and Auth MF”. `src/shared/utils/apiClient.js:18–47`: JWT do `auth-storage` e `auth-change` em caso de 401. `src/shared/utils/alertService.js:3–9`: `CustomEvent("biotech-toast")` como “Bus de eventos para comunicación entre microfrontends”. `src/App.jsx:9–37`: app standalone que alterna as mesmas telas. | moderada |
| Código-fonte (fronteiras) | Os imports `../` ficam dentro de `src`, por exemplo `src/features/dashboard/components/HealthDashboard.jsx:9` e `src/shared/services/healthService.js:1`. Os aliases `@` e `@shared` apontam para `./src` (`vite.config.js:9–10`). O alias `@shared-services` → `../biotech-shell/src/shared/services` (`vite.config.js:11–15`), junto com `server.fs.allow: [".."]` (`vite.config.js:21–23`), atravessaria a fronteira para o repositório do shell, mas `git grep @shared-services` não acha uso em `src`. | contexto |
| Build/deploy | `package.json:6–11`: `vite build` e `preview --port 5004`. `vercel.json:2–25`: rewrite SPA e CORS `*`, compatível com servir `remoteEntry.js` a outra origem. O README aponta o shell implantado (`README.md:17`, `30`). | moderada |
| Tecnologia | `package.json:12–48`: React ^19.1.0, Zustand, React Router, Tailwind 4, Vite ^6.3.5 e `@originjs/vite-plugin-federation` ^1.4.1. Não há lockfile no inventário. | contexto |

## Autoria e histórico

Clone não raso.
- **Commits alcançáveis a partir do SHA:** 39, dos quais 17 são merges de PR. Todos são de Nikol Velasquez, sob três identidades da mesma titular:
  - `159703935+Nikotastic@users.noreply.github.com`: 17;
  - `velasqueznikol10@gmail.com` como “Nikol Velasquez”: 16;
  - o mesmo e-mail como “Nikotastic”: 6.
- **Início:** a raiz é `712cdf4` (2025-12-12, “first commit”), seguida de `de41fd2` (“initialize project architecture with auth modules…”).
- **Configuração do Vite:** `vite.config.js` muda em `712cdf4`, `de41fd2`, `55322e3`, `3401e6e`, `14567d5`, `3da3a4e` e `f5793e7` (`git log -- vite.config.js`). O `git log -S authMF` não completou por blob ausente no clone parcial (`65be4a37…`), que não foi buscado; o clone ficou inalterado.
- **Branches fora do snapshot:** `origin/develop` (`57884ad`, 2026-03-22) e `origin/feature/conexion-back` (`4b47a9f`, 2026-06-11, commits de Juan HN `<juanandres072004@hotmail.com>`) têm commits posteriores ao SHA. O `pushed_at` dos metadados (2026-06-11) corresponde ao segundo. Pelo procedimento, só o commit de `clones.csv` foi considerado.

O README credita o design a outro colaborador (`README.md:78–79`).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Pelo critério literal, a configuração de composição referencia explicitamente uma unidade externa: `remotes: { authMF }` (`vite.config.js:30–32`). Somada a `healthMF`, presente no repositório, são duas unidades. |
| Q2 | Yes | `healthMF` tem entrada e build próprios (`index.html:11`; `package.json:8`). `authMF` seria implantado separadamente (URL própria, `vite.config.js:31`). Não há import de código-fonte entre elas; o alias para `../biotech-shell` não é usado. |
| Q3 | Undetermined | `healthMF` não carrega, monta nem roteia `authMF`. A aplicação comum seria o shell, que não está no repositório e só aparece em `README.md:17`, `30`. |
| Q4 | No | A única ligação configurada no repositório, `remotes: authMF`, não tem consumidor (`git grep authMF`): pelo critério, “A declared dependency alone is No”. O lado `exposes` está configurado, mas o consumidor não é observável. |
| Q5 | No | A evidência mostra uma unidade preparada para composição por um host externo, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`. Há uma resposta No, mas a exceção do checklist se aplica: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- O padrão é o mesmo dos finais 050/069: Vite + `@originjs/vite-plugin-federation`, `exposes` de componentes de tela (`TaskDashboard` em 050, `./Main` em 069), `shared` e contrato com o container, aqui por `localStorage` e eventos de `window`.
- A diferença em relação a 050/069 é o `remotes: authMF` declarado e não consumido. Ele torna Q1 Yes pelo critério literal e Q4 No pela regra de dependência declarada. Não completa uma cadeia, como em 076/084/096/106/109, nem é um host incompleto cuja conectividade se discuta, como em 097/103/104: o repositório não consome nada do remoto.
- Não é code sharing, como em 089/100: o que se expõe são telas de domínio com callbacks de navegação e um store, não componentes genéricos. Não há plataforma de terceiros (102/074/080): o shell é do mesmo ecossistema.
- `frontend_units: 2` e `unit_organization: multi-repo` seguem o critério de Q1 do template, contando `authMF`. Os precedentes MFE-unit sem `remotes` registram `1`/`single-unit`. `repo_type: example`: projeto de equipe acadêmica ou portfólio, com demo na Vercel, não um produto distribuído. `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: [module-federation]`.

## Notas para análise

- **RQ2:** remoto Module Federation em Vite que expõe telas e store Zustand, com comunicação pelo shell por `localStorage` (`auth-storage`) e `CustomEvent` em `window`. O alias de código-fonte para o repositório do shell (`../biotech-shell`) e o `fs.allow: [".."]` indicam desenvolvimento lado a lado de repositórios irmãos, sem uso no snapshot.
- **RQ1 (sinais enganosos):** `remotes` declarado sem consumo; o README lista features (“Treatment Log”, “Vet Visits”) além do que as telas expostas mostram.
- **Protocolo (snapshot e branches):** commits posteriores, inclusive de outro autor, estão em `develop` e `feature/conexion-back`, fora do snapshot.
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

Decidir como tratar uma unidade com `exposes` que também declara em `remotes` um remoto externo nunca consumido.

- **Leitura adotada:** Q1 Yes pelo critério literal (referência na configuração de composição), Q4 No (declaração sem uso) e exceção `MFE-unit`, porque o repositório contém uma única unidade preparada para o host externo. Fica `frontend_units: 2`/`multi-repo`.
- **Alternativa:** desconsiderar a referência não consumida na contagem, tratando-a como “MFE-related dependencies that are unused”. Fica Q1 No, Q4 Undetermined, `frontend_units: 1`/`single-unit`, mesmo vetor de 050 e com a mesma classe `MFE-unit`.

- **Terceira leitura (consequência registrada pela revisão independente):** escopo da contagem de Q1 também para a exceção. Com `authMF` contado em Q1 (`frontend_units: 2`), não há uma única unidade no escopo arquitetural, e a exceção `MFE-unit` não se aplica; como Q4 é No, a regra geral resulta em `Non-MFE`, com `approaches: []`.

A classe, portanto, não é independente da leitura: as duas primeiras leituras dão `MFE-unit` (a primeira conta só a unidade local `healthMF` para a exceção; a segunda desconsidera o remote não consumido), e a terceira dá `Non-MFE`. A redação de "single frontend unit" no checklist não delimita o escopo. Não se propõe regra nova; a decisão fica para o pesquisador, e a anotação permanece em `review`. Q3 permanece Undetermined, pois sem o shell não se infere conectividade pela cópia de `auth-storage` nem pelo README isolado. Q1 No não é proposto como alternativa independente, porque o checklist conta remotes referenciados por configuração e `authMF` está em `remotes`.
- **Contribuição da revisão independente (Lupa):** concordância parcial. Concorda com a unidade `healthMF` como remote, Q3 Undetermined, Q4 No e `review`; divergiu da afirmação de que a classe não muda entre as leituras, o que foi corrigido acima. Comparadores finais: 050 e 069 (remote Vite com `exposes`, host ausente, Q1 No, uma unidade, MFE-unit); aqui o `authMF` em `remotes`, nunca consumido, altera Q1/Q4 e impede copiar o vetor. 089 e 100 estão em `review` por outra questão.
