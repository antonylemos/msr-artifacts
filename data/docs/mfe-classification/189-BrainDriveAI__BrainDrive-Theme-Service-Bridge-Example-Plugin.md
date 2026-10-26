---
schema: 1
id: 1024333329
full_name: BrainDriveAI/BrainDrive-Theme-Service-Bridge-Example-Plugin
url: https://github.com/BrainDriveAI/BrainDrive-Theme-Service-Bridge-Example-Plugin
commit: 431b77cd1676a257ca3ef287520c5b2a5060aa75
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 189 — BrainDriveAI/BrainDrive-Theme-Service-Bridge-Example-Plugin

## Contexto

Plugin de demonstração para a plataforma BrainDrive (“ServiceExample_Theme”), com três módulos de tema exibidos em páginas da plataforma (`README.md:5–35`). É um remoto Module Federation em webpack 5 que expõe `./ThemeDisplay`, `./ThemeController`, `./ThemeListener` e `./SettingsExample` (`webpack.config.js:43–65`). Inclui um `lifecycle_manager.py` que registra o plugin no backend da plataforma com `scope` e `bundle_location: dist/remoteEntry.js` (`lifecycle_manager.py:95–116`). O host é a plataforma BrainDrive, de outro repositório. O repositório está arquivado (`README.md:1`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:190` registra rank 189, ID 1024333329, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:190` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16718` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:16722` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` | 2026-10-07T23:19:05.495Z / 2026-10-08T16:15:24.148Z |

Metadados do hit:
- descrição “⚠️ Archived — BrainDrive is building a new system on personalaiarchitecture.org”, sem a frase;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 227;
- criação em 2025-07-22T14:33:17Z, push em 2026-03-08T01:16:59Z.

O acerto vem de `README.md:146`, “### Module Federation Architecture”, única ocorrência. A última alteração do README é o próprio SHA, `431b77c` (2026-03-07, aviso de arquivamento), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 33 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto webpack na raiz (`package.json`, `webpack.config.js`, `public/index.html`, `src/` com componentes e serviços), `lifecycle_manager.py`, guias (`DEVELOPER_GUIDE.md`, `ERROR_HANDLING_GUIDE.md`, `references/*.md`) e uma captura de tela. | contexto |
| Configuração (federação) | `webpack.config.js:43–65`: `ModuleFederationPlugin({ name: "ServiceExampleTheme", library: { type: "var" }, filename: "remoteEntry.js", exposes: { './ThemeDisplay', './ThemeController', './ThemeListener', './SettingsExample' }, shared: react/react-dom singleton eager })`, sem `remotes`. `:10–22`: `publicPath: "auto"`, biblioteca `var`. `package.json:5`: `main: dist/remoteEntry.js`. | moderada |
| Configuração (registro na plataforma) | `lifecycle_manager.py:95–116`: dados do plugin para o backend da plataforma, com `scope: "ServiceExampleTheme"`, `bundle_method: "webpack"`, `bundle_location: "dist/remoteEntry.js"` e `plugin_slug`. `:207–220`: instalação em `backend/plugins/shared/<slug>/<versão>`. `README.md:37–57`: instalação pelo Plugin Manager e uso dos módulos arrastados para páginas da BrainDrive. | moderada |
| Código-fonte (contrato com host) | `src/services/themeService.ts:1–30`: wrapper do “Theme Service Bridge” fornecido pela BrainDrive aos plugins. `src/index.tsx:1–10`: exporta os módulos “for BrainDrive to load”, com modo de desenvolvimento isolado usando serviços simulados (`:23–40`). | moderada |
| Código-fonte (fronteiras) | Os imports ficam em `src/`; a busca por `../../` não retorna nada. Os serviços da plataforma chegam em runtime pela ponte, não por import de fonte. | contexto |

## Autoria e histórico

Clone não raso; 4 commits, nenhum merge.
- **Código:** `4edc4b9` (2025-07-22, “First Commit”) e `ddefccb` (2025-09-30, “Updating new repo location”), de David J Jones `<david-j-jones@hotmail.com>`.
- **Arquivamento:** `5e35e64` e o SHA `431b77c` (2026-03-07), de Dave Waring (noreply), alteram só o README com o aviso de arquivamento (`git diff-tree`).

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a configuração de composição só tem `exposes` (`webpack.config.js:47–52`) e não referencia unidades externas. |
| Q2 | Yes (para a unidade) | Entrada e build próprios que geram `remoteEntry.js` (`webpack.config.js:12`, `46`; `package.json:6–11`). |
| Q3 | Undetermined | O host (a plataforma BrainDrive) não está no repositório; o registro e o uso são descritos em `lifecycle_manager.py` e no README. |
| Q4 | Undetermined | O lado remoto está configurado; o consumidor não é observável. |
| Q5 | No | Há uma unidade preparada para composição, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`. A exceção do checklist se aplica literalmente: `exposes`, `remoteEntry.js`, `shared` singleton e contrato com o host, com host não observável, como nos finais 001/050/069.
- **A revisão se justifica pela questão de plataforma:** o único host é o sistema de plugins da BrainDrive (Plugin Manager, `lifecycle_manager.py`, Service Bridge). O final 037 classificou como `Non-MFE` uma unidade cujo único host é o mecanismo de extensão de uma plataforma de terceiros (102/074/080).
- **Primeira parte:** como em 161, a plataforma é da mesma organização do repositório (BrainDriveAI), e o plugin é exemplo de primeira parte, não extensão de terceiros.
- Não é code sharing (089/100): os módulos expostos são módulos de página com UI e serviço próprios.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (“working demo”, `README.md:17`).

## Notas para análise

- **RQ2:** sistema de plugins por Module Federation com registro no backend (`scope`, `bundle_location`, ciclo de vida de instalação por usuário) e ponte de serviços (tema, API) injetada pelo host.
- **Protocolo (amostra):** é o segundo caso de remoto MF de plataforma de extensões da própria organização (ver 161); convém decidir os dois de forma consistente.
- **Protocolo (busca):** entrada só pela consulta `"module federation"`. O repositório está arquivado e o `pushed_at` vem do aviso de arquivamento. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

Decidir se um plugin Module Federation cujo único host é a plataforma de extensões da própria organização conta como MFE-unit ou segue 037.

- **MFE-unit (proposto):** preparação explícita (`exposes`, `remoteEntry.js`, registro de bundle) para host externo não observável, de primeira parte.
- **Non-MFE:** segue 037, porque o MF é o mecanismo de plugins de uma plataforma, e o repositório é uma extensão dela.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`, coerente com 161.
- **Contribuição da revisão independente (Lupa):** concordância provisória com MFE-unit e `review`; a decisão de aplicar a exceção MFE-unit ou o precedente Non-MFE de extensão de plataforma (037) é uma questão real de regra. Os finais 050 e 069 classificam como MFE-unit remotes únicos com `exposes` e host ausente; este caso tem evidência mais explícita de plataforma consumidora e uso em página. Em sentido contrário, 037 aplicou Non-MFE a um remote Module Federation cujo host é o mecanismo de extensão de uma plataforma. O proprietário do plugin e a BrainDrive são da mesma organização (`README.md:5–7,37–57,217`; `package.json:21`), o que impede aplicar automaticamente o precedente de plataforma terceira sem provar que host e plugin formem a mesma arquitetura decomponível. Precisões de citação: a interface `ThemeServiceBridge` começa em `src/services/themeService.ts:33` (citar `:28–33`); `lifecycle_manager.py:207–220` calcula o caminho compartilhado de armazenamento e não é, isoladamente, a instalação (a validação e o uso de `remoteEntry.js` estão em `:372–422`, e a cópia de arquivos em `:354–366`); a tabela de estrutura é inventário por `git ls-tree`, não linha de arquivo.
