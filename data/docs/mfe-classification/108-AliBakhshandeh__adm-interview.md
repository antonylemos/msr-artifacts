---
schema: 1
id: 1321873951
full_name: AliBakhshandeh/adm-interview
url: https://github.com/AliBakhshandeh/adm-interview
commit: 7e0e173d18212a104edc4ea4aed5909174f833c8
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 108 — AliBakhshandeh/adm-interview

## Contexto

Biblioteca/framework de formulários orientados por metadados, desenvolvida como avaliação técnica, com showcase React, Storybook, pacotes de engine/renderização e CLI de geração de arquivos de formulário. A unidade própria observada é o showcase; formulários, pacotes de biblioteca e stories não são aplicações independentes compostas entre si. A natureza de avaliação está explicitada no README (`README.md:376–385`), mas não foi inferida do nome do repositório nem usada para excluir automaticamente código executável.

## Proveniência na amostra

- Rank 108, ID, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:109`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:109`. Origem da amostra na rodada 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:34693` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:34699`, `pass`. Ambas apresentam descrição nula, tópicos vazios, linguagem TypeScript, licença nula e `fork: false`.
- Consulta `sqlite3 -readonly` aos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits` e `queries` e filtrando `repository_id=1321873951`: ambas registram `terminology-microfrontend-repositories`, com consulta exata `microfrontend in:name,description,readme`, e `terminology-microfrontends-repositories`, com consulta exata `microfrontends in:name,description,readme`. Estratégia `terminology`, endpoint `repositories`, sem caminho de arquivo. São chaves SQLite, sem numeração de linha textual.
- Por eliminação, nome, descrição nula e tópicos vazios não contêm os termos. O README contém `microfrontend runtime` em `README.md:478`, dentro da lista “Intentionally out of scope” iniciada em `README.md:469`. A grafia é unida e singular; não há plural literal nessa menção. Isso é compatível com recuperação via README, sem atribuir ao banco localização exata do casamento ou explicar automaticamente o hit plural. A menção negativa não foi tomada isoladamente como classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário completo por `git ls-tree -r` do SHA: 79 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. Quarenta arquivos em dez pacotes sob `packages/`, 11 em `apps/showcase/`, 12 em `docs/`, um em `e2e/`, um em `scripts/` e 14 arquivos na raiz. Não há `node_modules`, árvore de plataforma vendorizada ou submódulos. Contagens da árvore Git, sem linhas textuais artificiais. | contexto |
| Estrutura / Build/deploy | O workspace abrange `apps/*` e `packages/*` (`pnpm-workspace.yaml:1–3`), mas o único aplicativo é `@admiral/showcase`, com scripts Vite e Storybook (`apps/showcase/package.json:1–21`). O HTML tem `#root` e uma entrada `/src/main.tsx` (`apps/showcase/index.html:8–10`); essa entrada chama `createRoot(...).render(<App />)` (`apps/showcase/src/main.tsx:90`). | contrária |
| Configuração / Tecnologia | Configuração explícita Vite importa `defineConfig` e plugin React, fixa porta 5173 e configura build (`apps/showcase/vite.config.ts:1–8`). Vite e plugin estão declarados na raiz (`package.json:45–56`) e resolvidos no lockfile: plugin React 4.7.0 com Vite 5.4.21 (`pnpm-lock.yaml:66–68`; `pnpm-lock.yaml:96–98`). React/ReactDOM 18.3.1 e links workspace do showcase estão fixados (`pnpm-lock.yaml:103–119`). Arquivos de entrada/configuração existem, sem executar instalação/build. | contexto |
| Código-fonte (consumo) | Showcase importa estaticamente `FormRenderer` e utilitários da fachada e duas definições locais (`apps/showcase/src/main.tsx:1–6`). O estado seleciona booking/employee, muda a definição e passa props a um único renderer (`apps/showcase/src/main.tsx:8–9`; `apps/showcase/src/main.tsx:35–46`; `apps/showcase/src/main.tsx:72–80`). Não há mounts de aplicações remotas ou builds separados para cada formulário. | contrária |
| Código-fonte (exports/props) | A fachada reexporta `form-react` (`packages/form-platform/src/index.ts:1–6`), que define e exporta `FormRenderer` (`packages/form-react/src/index.tsx:63–73`). As props consumidas — `definition`, `initialValues`, `context`, `draftAdapter`, `dataSources`, `plugins` — correspondem ao contrato (`packages/form-react/src/index.tsx:9–20`). É uma API de componente/biblioteca, não remotes/exposes. | contexto |
| Estrutura / Configuração | Pacotes como `form-platform` e `form-react` exportam ESM e têm builds tsup próprios (`packages/form-platform/package.json:4–20`; `packages/form-react/package.json:4–19`). Esses builds produzem bibliotecas; não fornecem segunda aplicação com entrada/browser/mount próprios. Os paths TypeScript apontam para fontes locais dos pacotes (`tsconfig.base.json:20–29`), e o lockfile liga as dependências workspace (`pnpm-lock.yaml:103–110`). | contrária |
| Código-fonte / Composição | O renderer importa engine, regras e primitivas UI como bibliotecas (`packages/form-react/src/index.tsx:1–7`) e cria uma instância da engine para a definição (`packages/form-react/src/index.tsx:63–73`). Plugins locais contribuem registros/callbacks de eventos (`packages/form-platform/src/index.ts:10–21`; `packages/form-platform/src/index.ts:25–49`). A palavra plataforma/plugin não identifica host de aplicações ou plugin de plataforma terceira. | contrária |
| Código-fonte / Estrutura (Storybook) | A configuração seleciona stories do próprio showcase e o framework `@storybook/react-vite` (`apps/showcase/.storybook/main.ts:1–7`). Stories importam o mesmo renderer e definições locais, renderizando variações do componente (`apps/showcase/src/form.stories.tsx:1–3`; `apps/showcase/src/form.stories.tsx:22–44`). É ferramenta de demonstração/teste, sem composição com o showcase como outra unidade da aplicação; não se soma uma unidade por story ou pelo Storybook. | contexto |
| Código-fonte (geração) | A CLI cria `features/<nome>`, prepara strings para schema/form/rules/validation/datasource/fixture/migrations/test e grava os arquivos (`packages/form-cli/src/index.ts:16–32`). Saídas potenciais não têm entrada/build de aplicação próprios nem são unidades presentes/referenciadas por configuração de composição. | contrária |
| Tecnologia / Configuração / Composição | Busca textual no SHA, excluindo `pnpm-lock.yaml`, por `ModuleFederation`, `remoteEntry`, `exposes`, `remotes`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe` e `loadRemote`: nenhum mecanismo de integração MFE. Os hits de `exposes` são prosa de documentação/teste; `loadRemoteOptions` é método de dados para opções de campos (`packages/form-core/src/index.ts:323–337`), não loader de módulo remoto. Inventário e leitura dos manifests/configs não encontraram cadeia remotes ↔ exposes ↔ consumo, import map ou contrato para host externo. | ausente |
| Documentação / Composição | A arquitetura descreve plataforma de formulários reutilizável e separação engine/apresentação (`docs/architecture.md:3–5`), diagrama de dependências de bibliotecas (`docs/architecture.md:21–38`) e fluxo App → Renderer → Engine (`docs/architecture.md:40–55`). O README declara runtime microfrontend fora do escopo (`README.md:469–478`), coerente com o código. Não há ADR separado no inventário; existe documentação arquitetural efetiva, não apenas título README. | contrária |

## Autoria e histórico

Metadados no SHA: 11 commits alcançáveis, zero merges, um commit-raiz `cf4f13188a55351fc2123d763ba8104ee1995300`, clone não shallow. Todos registram autor e committer `Ali Bakhshandeh Ardestani`, de 31/07/2026 a 04/08/2026. `main`, `origin/main` e `origin/HEAD` são as únicas refs observadas e apontam ao SHA avaliado; nenhum conteúdo de outro branch foi usado.

`git log --no-renames --name-status` por `apps/showcase/`, `packages/form-platform/` e `packages/form-cli/`, sempre com `GIT_NO_LAZY_FETCH=1`: o commit-raiz adiciona em bloco o showcase, fachada e CLI. Há alterações posteriores das fontes da UI em `1492379ce8c46428dee8519b1eaeeb8612ca0a3f`, das configurações Vite/Storybook em `332dab0a81825f57a9e440b97ba61fd635e384c3` e dos contratos de pacote/CLI em `cf52bfaf35dd501e1a901ad977c57a76fce678e7`. O histórico registra evolução sob a identidade do titular; uma adição em bloco não demonstra sozinha importação de terceiro nem autoria original integral. Não se identificou cópia vendorizada independente do alvo próprio. Não houve objeto ausente nas consultas; não foram necessários blobs históricos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma aplicação própria de showcase. Dois formulários são definições selecionadas no mesmo App/renderer (`apps/showcase/src/main.tsx:35–46`; `apps/showcase/src/main.tsx:72–80`); pacotes, CLI e stories não constituem unidades adicionais de composição. |
| Q2 | No | Há build/entrada do showcase e builds de bibliotecas, sem conjunto de unidades frontend com entradas/builds próprios. O renderer usa engine/UI como bibliotecas (`packages/form-react/src/index.tsx:1–7`; `packages/form-platform/package.json:4–20`), e os paths locais não estabelecem independência entre aplicações (`tsconfig.base.json:20–29`). |
| Q3 | No | O App renderiza formulários no mesmo renderer, sem host que monte/roteie unidades distintas (`apps/showcase/src/main.tsx:35–46`; `apps/showcase/src/main.tsx:72–90`). |
| Q4 | No | Consumo estático de API de biblioteca, sem mecanismo de composição MFE configurado e usado (`packages/form-platform/src/index.ts:1–6`; `packages/form-react/src/index.tsx:63–73`). Runtime MFE está explicitamente fora do escopo (`README.md:469–478`), confirmado pela inspeção de configuração e fontes. |
| Q5 | No | Biblioteca de formulários com showcase convencional; as evidências não caracterizam arquitetura MFE nem unidade preparada para host externo. |

## Motivo

- `Non-MFE`: respostas No, sem exceção MFE-unit. `repo_type: library` descreve o artefato principal reutilizável; `frontend_units: 1` conta a aplicação showcase real após inventário, sem contar biblioteca, Storybook, testes ou saída da CLI.
- Q1 exige unidades concretas ou referências de configuração de composição. Uma lista de pacotes, formulários ou stories não fornece essas unidades. Q2 exige entradas e builds próprios das unidades: builds ESM de bibliotecas não convertem seus componentes/engines em aplicações relativamente independentes.
- Não se aplica automaticamente a questão aberta de composição em build time: são bibliotecas de schema, validação, engine e renderer, sem aplicações publicadas como pacotes sendo compostas. A fachada e o contrato de props foram conferidos; não há cadeia de integração MFE apenas incompleta.
- Q4 exige mecanismo configurado e usado entre unidades; não basta importação de biblioteca ou vocabulário de plataforma/plugin/remote data. Não há unidade preparada para host externo, portanto Q2–Q4 ficam No.
- Como nos finais 023/028 e comparadores 075/081/094, conteúdo de exercício e saídas geradas não são unidades; a implementação real do showcase continua contada. O status de entrevista não exclui exemplos que efetivamente componham unidades, como 007 e 076/084/096/106, mas essa cadeia não existe aqui.
- 097/103/104 discutem integração não conectável; aqui o consumo de biblioteca é explícito e coerente, sem promessa de uma aplicação remota a completar. 089/100 discutem code sharing por federação, enquanto aqui o compartilhamento é convencional por pacotes. 074/102/080 alertam para plataforma/código terceiro; não há host de plataforma terceiro ou distribuição vendorizada a arbitrar neste caso.
- `build_tools: [vite]` decorre de config explícita e hook Storybook. Não se infere esbuild pelo comando tsup nem bundler adicional pela ferramenta de testes. Não há decisão classificatória aberta de iframe, links, build-time units ou imperfeição de execução; não foram executados build/testes/aplicação.

## Notas para análise

- **RQ1 (famílias):** buscas por `admiral`, `AliBakhshandeh`, `adm-interview` e `form-platform` nas anotações disponíveis não localizaram irmão/template já anotado. Os casos comparados são precedentes metodológicos, sem comprovação de origem comum.
- **RQ1 (sinais enganosos):** a ocorrência de `microfrontend runtime` é uma exclusão explícita do escopo; `loadRemoteOptions` carrega dados de campos, e `FormPlugin` é extensão da engine de formulários. Nenhum desses nomes confirma composição de UI.
- **RQ3:** as relações conferidas são showcase → fachada ESM → renderer/engine/bibliotecas e definição de formulário → props → FormRenderer. Export e props correspondem, mas esse encadeamento não é host → remote frontend.
- **Protocolo:** os hits das duas rodadas preservam consultas singulares/plurais unidas. O README contém singular em uma lista negativa; o banco não localiza o casamento nem justifica atribuir plural literal ao documento.
- **RQ1 (menções e procedência):** "microfrontend runtime" também aparece na lista de itens fora do escopo de `docs/performance-security-governance.md:148`, uma segunda menção negativa que não explica o acerto de descoberta (fora de nome, descrição e README). `AI_USAGE.md:5` declara o uso de OpenAI Codex para análise de arquitetura, scaffolding, estratégia de testes, documentação e revisão; é nota de procedência, sem efeito na classe.
