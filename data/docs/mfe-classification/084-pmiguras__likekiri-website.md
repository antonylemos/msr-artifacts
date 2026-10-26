---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
url: https://github.com/pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 12
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 084 — pmiguras/likekiri-website

## Contexto

Sistema orientado a produção com um site público, um painel administrativo e módulos de negócio. A classificação se baseia no código de composição dos próprios shells, nas configurações de federação e nos manifestos publicados pelos módulos; a descrição em `README.md:3–9` serve apenas de contexto. A orientação a produção também aparece nos processos separados e no proxy em `infra/systemd/likekiri-module-hello.service:6–12` e `infra/caddy/likekiri.caddy:6–33`.

O commit coincide com `data/samples/mfe-sample-001/clones.csv:85`. Inventário completo por `git ls-tree -r --name-only 4b8c5fd5053751aba70fcd4859a38fd33062c8d3`: 226 arquivos, nenhum sob `node_modules/`. Os caminhos desta anotação são relativos à raiz desse snapshot, sem prefixo adicional. Há 12 alvos frontend próprios: `apps/admin-shell`, `apps/web-shell` e dez diretórios em `modules/`. `apps/core` é o backend de integração; `packages/contract`, `packages/i18n` e `packages/tokens` são bibliotecas compartilhadas, não unidades frontend adicionais. O arquivo construído em `modules/clientes/dist-ssr/entry-ssr.js` é saída do mesmo alvo `clientes`, não outra unidade.

As únicas referências locais observadas são `main`, `origin/main` e `origin/HEAD`, todas no commit avaliado. Foram registradas somente como contexto; nenhuma outra versão fundamenta a classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | `pnpm-workspace.yaml:1–4` inclui apps, packages e modules. Há build próprio do admin em `apps/admin-shell/package.json:7–10` e do web-shell em `apps/web-shell/package.json:7–9`. O admin entra por `apps/admin-shell/src/main.tsx:1–9`; o web-shell tem entradas distintas de cliente e SSR em `apps/web-shell/vite.config.ts:11–23`. | moderada |
| Configuração / Composição (hello) | `modules/hello/vite.config.ts:10–29` define o remote `hello`, expõe `HelloIsland` e `HelloAdminPage` e constrói sua entrada própria. `modules/hello/server.mjs:32–52` associa essas exposições às superfícies web e admin. Os componentes existem em `modules/hello/src/HelloIsland.tsx:12–14` e `modules/hello/src/HelloAdminPage.tsx:7–8`. | forte |
| Configuração / Composição (cuentas) | `modules/cuentas/vite.config.ts:8–26` expõe três páginas e define o build próprio; `modules/cuentas/server.mjs:32–58` mapeia essas páginas para rotas do admin. | forte |
| Configuração / Composição (registry) | `modules/registry/vite.config.ts:8–24` expõe `RegistryPage` e define a entrada do build; `modules/registry/server.mjs:32–45` a associa à rota `/registry` do admin. | forte |
| Configuração / Composição (ejemplo-web) | `modules/ejemplo-web/vite.config.ts:11–27` expõe `SimuladorIsland` e define seu build; `modules/ejemplo-web/server.mjs:33–48` registra a rota pública `/ejemplo-web/:modo`. É um alvo com arquivos executáveis, não somente um trecho de documentação. | forte |
| Configuração / Composição (ejemplo-admin) | `modules/ejemplo-admin/vite.config.ts:10–27` expõe `PanelPage` e `AjustesPage` e define seu build; `modules/ejemplo-admin/server.mjs:33–52` registra as duas rotas do painel. | forte |
| Configuração / Composição (clientes) | `modules/clientes/vite.config.ts:22–42` expõe três ilhas e duas páginas administrativas com entrada própria; `modules/clientes/server.mjs:998–1017` as associa a rotas web e admin. O build de cliente e SSR é próprio em `modules/clientes/package.json:7–10`. | forte |
| Configuração / Composição (sitio) | `modules/sitio/vite.config.ts:8–24` expõe `SitioPage` e define seu build; `modules/sitio/server.mjs:32–46` registra a página `/sitio` do admin. | forte |
| Configuração / Composição (media) | `modules/media/vite.config.ts:8–24` expõe `MediaPage` e define seu build; `modules/media/server.mjs:421–434` registra a rota `/media` do admin. | forte |
| Configuração / Composição (chat) | `modules/chat/vite.config.ts:8–18` expõe `ChatWidgetIsland` e `ChatAdminPage`, com entrada/build próprios; `modules/chat/server.mjs:486–497` registra um widget público e páginas administrativas. O mesmo alvo participa das duas superfícies. | forte |
| Configuração / Composição (ops) | `modules/ops/vite.config.ts:8–15` expõe `OpsAdminPage` e define seu build; `modules/ops/server.mjs:259–268` registra sua página no admin. | forte |
| Código-fonte (descoberta) | O core sincroniza os módulos em `apps/core/src/registry/registry.service.ts:117–138`, busca `/.well-known/module-manifest` em `apps/core/src/registry/registry.service.ts:394–412` e compila rotas com `moduleId` e `remoteEntry` em `apps/core/src/registry/registry.service.ts:466–486`. `apps/core/src/registry/registry.service.ts:213–223` produz as rotas do shell; o endpoint as entrega em `apps/core/src/auth/shell-manifest.controller.ts:19–38`. | forte |
| Código-fonte / Composição (admin) | `apps/admin-shell/src/api.ts:85` solicita o manifesto; `apps/admin-shell/src/App.tsx:141–157` o carrega, `apps/admin-shell/src/App.tsx:214–226` resolve a rota e instancia `ModulePage`. O loader inicializa/registra os remotes e chama `loadRemote` em `apps/admin-shell/src/federation.ts:28–51`; `apps/admin-shell/src/views/ModulePage.tsx:22–48` chama esse loader e renderiza o componente recebido. Portanto o runtime é consumido pela aplicação. | forte |
| Código-fonte / Composição (web) | `apps/core/src/shell/shell.controller.ts:44–53` resolve a rota pública e envia sua descrição ao shell. `apps/core/src/shell/shell.service.ts:127–147` repassa `moduleId`, componente, URL e props. `apps/web-shell/src/entry-server.tsx:77–101` cria o placeholder e `apps/web-shell/src/entry-server.tsx:176–181` inclui o runtime de ilhas. `apps/web-shell/src/islands.ts:22–44` coleta esses descritores; `apps/web-shell/src/islands.ts:52–67` carrega os remotes e monta ou hidrata a UI; `apps/web-shell/src/islands.ts:75–113` inicializa e aciona esse fluxo. | forte |
| Código-fonte (SSR delegado) | O core pede HTML ao servidor do módulo por HTTP em `apps/core/src/registry/registry.service.ts:294–318`. `modules/clientes/server.mjs:463–469` carrega seu bundle SSR próprio; `modules/clientes/src/entry-ssr.ts:14–23` renderiza as três ilhas. O shell recebe esse HTML e marca o nó para hidratação em `apps/web-shell/src/entry-server.tsx:83–96`; o cliente chama `hydrateRoot` em `apps/web-shell/src/islands.ts:63–67`. Não é importação do fonte de outro frontend pelo shell. | forte |
| Build/deploy | `modules/hello/server.mjs:19–22` define porta, URL do remote e diretório de saída próprios; `modules/hello/server.mjs:98–113` serve o bundle construído. Há processo independente em `infra/systemd/likekiri-module-hello.service:10–12` e proxy para ele em `infra/caddy/likekiri.caddy:15–18`. O proxy também separa os demais módulos em `infra/caddy/likekiri.caddy:19–29` e `infra/caddy/likekiri.caddy:50–73`. | moderada |
| Configuração (limite do snapshot) | A configuração real `config/modules.json` é explicitamente ignorada em `.gitignore:11–12`; somente o exemplo com `hello` está versionado em `config/modules.example.json:2–6`. O core lê essa configuração em `apps/core/src/registry/registry.service.ts:372–391`. Logo, a lista habilitada em uma implantação não é observável, embora os dez alvos e seus contratos de integração estejam presentes. | contexto |
| Código-fonte (busca negativa de acoplamento) | Auditoria de imports estáticos/dinâmicos e reexports nos arquivos `.ts`, `.tsx` e `.mjs` próprios sob `apps/`, `modules/` e `packages/`, excluindo saídas `dist*`: não se encontrou import relativo atravessando a fronteira de uma app/módulo para fontes de outra app/módulo. Os imports nominais locais encontrados referem-se somente às bibliotecas `@likekiri/contract`, `@likekiri/contract/hmac`, `@likekiri/i18n` e `@likekiri/tokens`; não há import nominal de outro alvo frontend. A composição entre frontends é o carregamento remoto citado acima. | ausente |
| Configuração / Código-fonte (busca negativa de outros mecanismos) | Nos arquivos próprios `.ts`, `.tsx`, `.mjs` e `.json` sob `apps/`, `modules/` e `packages/`, excluindo `dist*`, procurados `<iframe`, `postMessage`, `srcDoc`, `single-spa`, `registerApplication`, `registerMicroApps`, `customElements.define`, `importmap` e `import-map`, sem resultados. Não se usa link entre as superfícies como fundamento de Q4; as chamadas de federação e a montagem estão demonstradas no código. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Dois shells com entradas/builds próprios (`apps/admin-shell/src/main.tsx:1–9`, `apps/web-shell/vite.config.ts:11–23`) e dez módulos federados inventariados na tabela. Exemplo concreto de relação de composição: `modules/hello/server.mjs:38–52` conecta o mesmo módulo às duas superfícies; `modules/chat/server.mjs:492–497` faz o mesmo para chat. Contagem: 12 alvos próprios, sem duplicar componentes expostos ou builds SSR. |
| Q2 | Yes | Entradas e builds separados nos shells e em cada módulo, conforme configurações inventariadas; por exemplo, `modules/hello/vite.config.ts:23–29`, `modules/clientes/package.json:7–10`, `apps/admin-shell/package.json:7–10` e `apps/web-shell/package.json:7–9`. Processo do módulo separado em `infra/systemd/likekiri-module-hello.service:10–12`. A auditoria descrita não encontrou importação direta de fontes entre unidades frontend. Os módulos não têm app autônomo: `src/index.ts` apenas reexporta componentes (por exemplo, `modules/hello/src/index.ts:1–2`), e o `remoteEntry.js` é a entrada federada; o critério pede entrada e build próprios, não aplicação executável isolada. |
| Q3 | Yes | O core produz as rotas dos módulos em `apps/core/src/registry/registry.service.ts:213–223`; o admin as encaminha a `ModulePage` em `apps/admin-shell/src/App.tsx:214–226`. O site público recebe descritores das mesmas unidades em `apps/core/src/shell/shell.service.ts:127–147` e monta suas ilhas. São superfícies da mesma aplicação modular com módulos compartilhados, não dois sites sem relação de composição. |
| Q4 | Yes | Exposições concretas nos builds dos módulos, descoberta de seus manifestos, registro e consumo pelo runtime: `modules/hello/vite.config.ts:10–19`, `apps/core/src/registry/registry.service.ts:394–412`, `apps/admin-shell/src/federation.ts:34–51`, `apps/admin-shell/src/views/ModulePage.tsx:25–48` e `apps/web-shell/src/islands.ts:52–67`. As chamadas estão ligadas às entradas dos shells, não apenas declaradas como dependências. |
| Q5 | Yes | A cadeia entre manifesto, build independente, carregamento remoto e renderização está implementada nos artefatos de Q1–Q4; por exemplo, `modules/hello/server.mjs:38–52`, `apps/admin-shell/src/federation.ts:34–51` e `apps/admin-shell/src/views/ModulePage.tsx:25–48`. Não há divergência de Q5. |

## Motivo

- Q1–Q5 são Yes: aplica-se `MFE-implemented`, no caso de inclusão de monorepo contendo hosts e remotes. `repo_type: production` registra a orientação do sistema, sem afirmar implantação ou execução comprovada nesta inspeção estática.
- Os exemplos `hello`, `ejemplo-web` e `ejemplo-admin` são alvos próprios com configurações, componentes e manifestos executáveis para estes hosts. Não são MFE somente como conteúdo didático, nem alvos sem relação de composição (precedentes 023/028). Os módulos de negócio também têm os mesmos contratos explícitos.
- O host é código do próprio repositório; a palavra plataforma não representa aqui um mecanismo de extensão de plataforma de terceiros. Não se aplica a exclusão de plugins de plataforma (037), nem a classe MFE-unit com host ausente (051).
- As bibliotecas compartilhadas de contratos, tradução e tokens não fundamentam composição em build time entre frontends: os componentes de UI são obtidos em runtime por federação. Não há decisão aberta de links ou iframes a resolver para esta proposta.

## Notas para análise

- **RQ1:** README e dependências confirmam o vocabulário do projeto, mas a evidência central é a ligação código a código entre exposições, manifestos, loaders e montagem. A ausência de credenciais e do registro real limita a observação do estado de implantação; não apaga o mecanismo implementado nem permite afirmar que todos os módulos estão habilitados simultaneamente. Os ADRs versionados registram a decisão arquitetural: `docs/adr/002-stack-y-versiones.md:29–32` (escolha de `@module-federation/vite` em vez de `@originjs`), `docs/adr/004-ssr-islas-auth-y-despliegue.md:14` (ilhas via `@module-federation/runtime`), `docs/adr/005`, `006` e `007` (admin por módulos, shell guiado pelo servidor e SSR delegado ao módulo) e `docs/como-integrar-un-modulo.md`. É documentação (força moderada), que corrobora o código e é útil para a mineração de artefatos.
- **RQ2:** Module Federation com descoberta por manifesto e dois consumidores: SPA administrativa e ilhas React no site SSR. O SSR delegado de `clientes` acrescenta HTML obtido por HTTP antes da hidratação federada; não é necessário criar outra categoria de abordagem para sustentar a inclusão.
- **RQ3:** um módulo é uma unidade de build mesmo quando expõe várias páginas/ilhas ou participa das duas superfícies. Por isso, `clientes` e `chat` contam uma vez cada, e os bundles servidor/cliente de um mesmo alvo não são unidades adicionais.
- **Protocolo:** a busca nas anotações existentes por `likekiri` e `pmiguras` não encontrou família já registrada. Há afinidade de mecanismo com `docs/mfe-classification/045-mrgleam__mf-tanstack-demo.md` e `docs/mfe-classification/070-viernesviernes__EmerTech-Lab-Assignment-3.md` (shells React/Vite e consumo federado), sem evidência de origem comum. Os templates internos `ejemplo-web` e `ejemplo-admin` pertencem ao próprio snapshot; seus nomes não demonstram parentesco com outro candidato.
