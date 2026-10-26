---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Leitura do repositório

O texto próprio do projeto está em espanhol, em `README.mkd:1-154`. A mineração não o marcou como `documentation`, pois o padrão é `**/*.md`; não há ocorrências `doc-*` no `matches.csv`. Ele foi lido integralmente, inclusive os dois diagramas. Os quatro documentos minerados são templates idênticos, em inglês, sem afirmação específica sobre o conjunto de aplicações: `apps/cms/README.md:1-5`, `apps/dashboard/README.md:1-5`, `apps/kanban/README.md:1-5` e `apps/shell/README.md:1-5`.

A documentação mistura a configuração existente com uma descrição mais ampla do ecossistema. Há quatro apps e federação configurada, mas a composição implementada no shell só carrega e renderiza o widget do Dashboard (`apps/shell/src/App.vue:5-7,21-28`). CMS e Kanban ficam declarados como remotos, sem consumo no código (3.4.5 #2-3). O kit local só é usado pelo shell (`apps/shell/src/App.vue:3,14-15`); os remotos só fazem o Tailwind varrer suas fontes (`apps/dashboard/src/style.css:4`; `apps/cms/src/style.css:4`; `apps/kanban/src/style.css:4`); o widget tem estado local (`apps/dashboard/src/components/WidgetDinero.vue:2-4,12`), sem a sessão e o estado compartilhados anunciados. As revisões 3.4.2–3.4.6 estão `final`, com o mesmo ID e commit da classificação e da aquisição.

Os títulos `README.mkd:1,7,38,65,113,115,123,130,137,144` contextualizam as afirmações abaixo. As descrições funcionais de gráficos, formulários e tarefas (`README.mkd:125-142`) não descrevem relações arquiteturais; o snapshot contém telas mínimas (`apps/cms/src/App.vue:1-10`, `apps/kanban/src/App.vue:1-10`, `apps/dashboard/src/App.vue:1-10`). Os blocos de comandos de instalação, execução e build (`README.mkd:83-87,93-95,108-111`) não viram linhas. A sequência de produção inclui `pnpm preview`, mas a raiz não tem esse script (`package.json:6-11`); as portas 5173–5176 da lista de execução (`README.mkd:99-102`) divergem das portas 5000–5003 das configurações (`apps/shell/vite.config.ts:9,13`; `apps/dashboard/vite.config.ts:8,14`; `apps/cms/vite.config.ts:8,12`; `apps/kanban/vite.config.ts:8,12`). São detalhes da execução local, sem artefato de publicação (3.4.6 #1-4).

Foram lidos os manifestos da raiz, das quatro apps e de `packages/ui-kit`, `pnpm-workspace.yaml`, `turbo.json`, as quatro configurações Vite, as entradas e componentes citados nas revisões anteriores e `apps/shell/src/vite-env.d.ts`. A descrição da raiz está vazia (`package.json:4`). Os comentários nas configurações dos remotos sobre target, depuração e CSS (`apps/cms/vite.config.ts:28-30`; `apps/dashboard/vite.config.ts:30-32`; `apps/kanban/vite.config.ts:28-30`) são justificativas genéricas de opções, sem afirmar uso de estilos entre unidades. O comentário do shell explica a chamada do plugin Tailwind (`apps/shell/vite.config.ts:17-18`); os comentários de tipos e exports só localizam arquivos ou exportações (`apps/shell/src/vite-env.d.ts:1`; `packages/ui-kit/src/index.ts:2`). O comentário repetido nas folhas de estilo das quatro apps (`apps/shell/src/style.css:3`; `apps/dashboard/src/style.css:3`; `apps/cms/src/style.css:3`; `apps/kanban/src/style.css:3`) só condiciona a diretiva `@source` à necessidade de cada projeto. Nenhum acrescenta afirmação arquitetural. O texto de interface que diz vir pela rede do Dashboard (`apps/shell/src/App.vue:19`) repete a relação #7.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.mkd:3 | “Un ecosistema de Arquitectura Microfrontend [...] construido con Vue 3, Vite y Module Federation” (ecossistema de arquitetura microfrontend construído com Vue 3, Vite e Module Federation) | estrutura | corroborada | 3.4.2, linhas do plugin nas quatro apps; 3.4.3, unidades apps/*; 3.4.5 #1 |
| 2 | README.mkd:5 | “aplicaciones verticales independientes” (aplicações verticais independentes) | independência | corroborada | 3.4.3, unidades apps/*; apps/cms/package.json:6-10; apps/dashboard/package.json:6-10; apps/kanban/package.json:6-10; apps/shell/package.json:6-9 |
| 3 | README.mkd:5 | “comparten diseño, lógica y estado” (compartilham design, lógica e estado) | outro | contradita | apps/shell/src/App.vue:2-7,14-15; apps/dashboard/src/components/WidgetDinero.vue:1-19; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10 |
| 4 | README.mkd:9 | “El sistema utiliza el patrón Host (Shell) + Remotes” (o sistema usa o padrão host/shell e remotos) | estrutura | corroborada | 3.4.5 #1-3; apps/shell/vite.config.ts:19-27 |
| 5 | README.mkd:9 | “cargando los microfrontends bajo demanda (Lazy Loading)” (carregando os microfrontends sob demanda) | composição | corroborada | 3.4.4, dynamic-loading e runtime-composition; apps/shell/src/App.vue:5-7,21-28 |
| 6 | README.mkd:9 | “compartiendo dependencias críticas para optimizar el bundle size” (compartilhando dependências críticas para otimizar o tamanho do bundle) | composição | corroborada | apps/shell/vite.config.ts:26; apps/dashboard/vite.config.ts:24; apps/cms/vite.config.ts:22; apps/kanban/vite.config.ts:22; apps/shell/src/main.ts:1; apps/dashboard/src/main.ts:1; apps/cms/src/main.ts:1; apps/kanban/src/main.ts:1 |
| 7 | README.mkd:25 | “Shell -->\|Carga Remota\| Dashboard” (shell carrega remotamente Dashboard) | composição | corroborada | 3.4.5 #1; apps/shell/src/App.vue:5-7,23 |
| 8 | README.mkd:26 | “Shell -->\|Carga Remota\| CMS” (shell carrega remotamente CMS) | composição | contradita | 3.4.5 #2; apps/shell/vite.config.ts:23; apps/shell/src/App.vue:1-33 |
| 9 | README.mkd:27 | “Shell -->\|Carga Remota\| Kanban” (shell carrega remotamente Kanban) | composição | contradita | 3.4.5 #3; apps/shell/vite.config.ts:24; apps/shell/src/App.vue:1-33 |
| 10 | README.mkd:29 | “Shell -.->\|Consume\| UIKit” (o shell consome o UI Kit) | outro | corroborada | apps/shell/package.json:12; apps/shell/src/App.vue:3,14-15 |
| 11 | README.mkd:30 | “Dashboard -.->\|Consume\| UIKit” (o Dashboard consome o UI Kit) | outro | contradita | apps/dashboard/package.json:12-16; apps/dashboard/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 12 | README.mkd:31 | “CMS -.->\|Consume\| UIKit” (o CMS consome o UI Kit) | outro | contradita | apps/cms/package.json:12-16; apps/cms/src/App.vue:1-10 |
| 13 | README.mkd:32 | “Kanban -.->\|Consume\| UIKit” (o Kanban consome o UI Kit) | outro | contradita | apps/kanban/package.json:12-16; apps/kanban/src/App.vue:1-10 |
| 14 | README.mkd:40 | “Turborepo para la orquestación de tareas y pnpm workspaces” (Turborepo para orquestrar tarefas e pnpm workspaces) | build-deploy | corroborada | package.json:7-10,18; turbo.json:3-13; pnpm-workspace.yaml:1-3 |
| 15 | README.mkd:44-51 | “apps/ [...] Shell [...] Dashboard [...] CMS [...] Kanban” (quatro aplicações em apps/) | estrutura | corroborada | 3.4.3, unidades apps/cms, apps/dashboard, apps/kanban e apps/shell |
| 16 | README.mkd:54-57 | “Librerías Compartidas [...] @repo/ui-kit [...] @repo/utils [...] Configuración TS” (bibliotecas compartilhadas: UI Kit, utils e configuração TS) | estrutura | contradita | 3.4.3, unidade packages/ui-kit; packages/ui-kit/package.json:1-21; packages/ui-kit/tsconfig.json:1-19 |
| 17 | README.mkd:68 | “Build Tool: Vite 6” | build-deploy | contradita | apps/cms/package.json:23; apps/dashboard/package.json:23; apps/kanban/package.json:23; apps/shell/package.json:23 |
| 18 | README.mkd:73 | “State Management: Pinia (Shared State)” | outro | contradita | apps/shell/package.json:11-25; apps/cms/package.json:12-25; apps/dashboard/package.json:12-25; apps/kanban/package.json:12-25; apps/dashboard/src/components/WidgetDinero.vue:2-4,12 |
| 19 | README.mkd:91 | “Turborepo lanzará las 4 aplicaciones en paralelo” (Turborepo iniciará as quatro aplicações em paralelo) | independência | corroborada | package.json:7; turbo.json:4-7; apps/cms/package.json:7; apps/dashboard/package.json:7; apps/kanban/package.json:7; apps/shell/package.json:7 |
| 20 | README.mkd:99 | “Entra aquí para ver la integración completa” (entre aqui para ver a integração completa) | composição | contradita | 3.4.5 #1-3; apps/shell/src/App.vue:1-33 |
| 21 | README.mkd:117-119 | “Maneja [...] Autenticación (JWT compartido)” (o shell gerencia autenticação com JWT compartilhado) | outro | contradita | apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 22 | README.mkd:120 | “Enrutamiento raíz” (roteamento raiz no shell) | composição | contradita | apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/shell/package.json:11-25 |
| 23 | README.mkd:150 | “Cada equipo puede desplegar su microfrontend (Dashboard, CMS) sin afectar al Shell ni a los otros módulos” (cada equipe pode implantar seu microfrontend sem afetar o shell ou os demais módulos) | build-deploy | sem corroboração | — |
| 24 | README.mkd:152 | “ver el cambio reflejado instantáneamente en las 4 apps gracias al Hot Module Replacement (HMR) unificado” (ver a alteração do UI Kit nas quatro apps graças ao HMR unificado) | outro | contradita | apps/shell/src/App.vue:3,14-15; apps/cms/package.json:12-16; apps/dashboard/package.json:12-16; apps/kanban/package.json:12-16; package.json:7,10 |

## Observações

**1. README.mkd.** Há Vue 3, Vite e o plugin de federação nas quatro apps (3.4.2), com cadeia efetiva shell → Dashboard (3.4.5 #1). A qualificação de alto desempenho na mesma frase é promocional, sem medição no snapshot. As tecnologias reaparecem em `README.mkd:47,67,69,71`; a versão específica de Vite é tratada em #17.

**2. README.mkd.** A independência é sustentada pelas entradas e pelos scripts próprios de desenvolvimento de cada app (3.4.3; `apps/cms/package.json:7`; `apps/dashboard/package.json:7`; `apps/kanban/package.json:7`; `apps/shell/package.json:7`). Isso não confirma uma divisão empresarial prévia de monólitos nem a evolução por equipes, apresentadas como motivação do exemplo.

**3. README.mkd.** A afirmação é sobre compartilhamento entre aplicações, mas o UI Kit é consumido só pelo shell (`apps/shell/src/App.vue:3,14-15`). O estado do widget é um `ref` local alterado por botão (`apps/dashboard/src/components/WidgetDinero.vue:2-4,12`); CMS e Kanban só exibem títulos (`apps/cms/src/App.vue:5`; `apps/kanban/src/App.vue:5`). Não há implementação da lógica e do estado comuns anunciados.

**4. README.mkd.** O host declara três remotos (`apps/shell/vite.config.ts:19-27`), e cada remoto expõe um módulo (3.4.5 #1-3). Os rótulos do diagrama (`README.mkd:14,17-19`) e os títulos das unidades (`README.mkd:115,123,130,137`) repetem os papéis.

**5. README.mkd.** O mecanismo de carga sob demanda existe no `defineAsyncComponent` com `import('dashboard/Widget')`, renderizado em `Suspense` (`apps/shell/src/App.vue:5-7,21-28`). A descrição geral não demonstra que todos os remotos são carregados: as arestas específicas para CMS e Kanban são avaliadas em #8-9. `README.mkd:121` repete a responsabilidade de carregar remotos.

**6. README.mkd.** `vue` está em `shared` nos quatro arquivos Vite (`apps/shell/vite.config.ts:26`; `apps/dashboard/vite.config.ts:24`; `apps/cms/vite.config.ts:22`; `apps/kanban/vite.config.ts:22`) e é usado pelas quatro entradas `src/main.ts:1`. `README.mkd:151` explica a mesma configuração como evitar quatro downloads. A configuração corrobora o mecanismo; não houve execução nem medição de downloads ou tamanho de bundle.

**7. README.mkd.** A aresta do diagrama é implementada pelo import e pela renderização do widget (`apps/shell/src/App.vue:5-7,23`), com a exposição `./Widget` no Dashboard (`apps/dashboard/vite.config.ts:21-23`). O texto visível do shell (`apps/shell/src/App.vue:19`) descreve a mesma origem remota.

**8. README.mkd.** O CMS tem URL declarada no host (`apps/shell/vite.config.ts:23`) e expõe `./Cms` (`apps/cms/vite.config.ts:19-21`), mas o componente do shell só importa Dashboard e não monta CMS (`apps/shell/src/App.vue:1-33`). A seta de carga efetiva excede o código observado; 3.4.5 #2 registra Ativa `No`.

**9. README.mkd.** Kanban também só aparece na configuração (`apps/shell/vite.config.ts:24`; `apps/kanban/vite.config.ts:19-21`), sem import nem renderização no shell (`apps/shell/src/App.vue:1-33`). A relação é Ativa `No` em 3.4.5 #3.

**10. README.mkd.** A seta de consumo do shell é implementada: o manifesto declara `@repo/ui-kit` como dependência de workspace (`apps/shell/package.json:12`) e o componente raiz importa e renderiza `setupMsg` e `MyButton` (`apps/shell/src/App.vue:3,14-15`). O import é estático, por caminho de workspace, e o pacote não é unidade na 3.4.3. `README.mkd:146` repete a promessa de consistência visual entre todos os microfrontends sem publicação npm; o consumo pelas demais apps é avaliado em #11-13. O pacote existe como fonte local e exporta `MyButton` e `setupMsg` (`packages/ui-kit/src/index.ts:1-4`).

**11. README.mkd.** O manifesto do Dashboard não declara `@repo/ui-kit` (`apps/dashboard/package.json:12-16`), e nem o componente raiz nem o widget importam algo do pacote (`apps/dashboard/src/App.vue:1-10`; `apps/dashboard/src/components/WidgetDinero.vue:1-19`). A folha de estilo pede ao Tailwind que varra as fontes do pacote (`apps/dashboard/src/style.css:4`), o que gera classes, mas não consome componente nem export do UI Kit.

**12. README.mkd.** O CMS também não declara o pacote (`apps/cms/package.json:12-16`), e o componente raiz só exibe um título (`apps/cms/src/App.vue:1-10`). A mesma diretiva `@source` do Tailwind (`apps/cms/src/style.css:4`) não cria uso da biblioteca.

**13. README.mkd.** O Kanban repete o quadro do CMS: sem a dependência no manifesto (`apps/kanban/package.json:12-16`), sem import no componente raiz (`apps/kanban/src/App.vue:1-10`) e só com a diretiva `@source` (`apps/kanban/src/style.css:4`).

**14. README.mkd.** Os scripts chamam `turbo dev`, `turbo build` e `turbo lint` (`package.json:7-9`), com tasks em `turbo.json:3-13` e workspace em `pnpm-workspace.yaml:1-3`. A declaração reaparece em `README.mkd:3,70,81`. Corrobora-se a automação configurada; o resultado `Undetermined` de 3.4.2 para uso de Turbo segue o critério próprio daquela etapa, que exclui scripts como evidência de uso.

**15. README.mkd.** As quatro apps do segundo diagrama são as quatro unidades da 3.4.3, com suas entradas e configurações próprias. As portas 5000–5003 desse diagrama coincidem com `apps/shell/vite.config.ts:9`, `apps/dashboard/vite.config.ts:8`, `apps/cms/vite.config.ts:8` e `apps/kanban/vite.config.ts:8`.

**16. README.mkd.** A listagem completa do snapshot sob `packages/` contém apenas `ui-kit`; não há `@repo/utils` nem pacote de configuração TS. `packages/ui-kit/tsconfig.json:1-19` é configuração interna desse pacote. O diagrama combina uma biblioteca existente com outras duas não presentes; por isso a afirmação conjunta é contradita. O consumo efetivo do UI Kit é avaliado separadamente em #10-13.

**17. README.mkd.** Todos os manifestos das aplicações declaram `vite: ^7.2.4`, não Vite 6 (`apps/cms/package.json:23`; `apps/dashboard/package.json:23`; `apps/kanban/package.json:23`; `apps/shell/package.json:23`).

**18. README.mkd.** Pinia não consta nos manifestos das quatro aplicações e não há store compartilhada no código. O estado implementado é local ao widget (`apps/dashboard/src/components/WidgetDinero.vue:2-4,12`). Esta afirmação nomeia um mecanismo específico e é distinta do compartilhamento genérico de #3.

**19. README.mkd.** `pnpm dev` delega à task `dev` do Turbo (`package.json:7`; `turbo.json:4-7`), presente como `vite` nas quatro apps. Isso corrobora a configuração para iniciá-las juntas. A alternativa `dev:hybrid` usa shell em dev e os remotos em build/preview (`package.json:10`); não houve execução para validar o funcionamento federado de `pnpm dev`.

**20. README.mkd.** A integração anunciada como completa não aparece na raiz do shell: há um botão local e o widget do Dashboard (`apps/shell/src/App.vue:13-28`), sem CMS e Kanban. As relações 3.4.5 #2-3 são configuradas, mas inativas. A divergência das portas da lista foi registrada na Leitura.

**21. README.mkd.** Nem a entrada nem o componente raiz do shell implementam autenticação ou sessão (`apps/shell/src/main.ts:1-5`; `apps/shell/src/App.vue:1-33`). Os componentes remotos também não usam JWT. A promessa de autenticação compartilhada contrasta com o código mínimo disponível; detalhes de layout da mesma lista ficam fora da tabela.

**22. README.mkd.** O shell monta diretamente `App` (`apps/shell/src/main.ts:3-5`) e este renderiza diretamente o widget (`apps/shell/src/App.vue:21-28`). Não há roteador nem seleção de remotos por rota; o manifesto tampouco declara dependência de roteamento (`apps/shell/package.json:11-25`).

**23. README.mkd.** A 3.4.6 registra builds separados, mas Deploy `não observado` para as quatro apps. Scripts de `vite preview` e URLs locais não sustentam a promessa de implantação independente. Não há configuração de publicação que permita verificar o efeito de implantar Dashboard ou CMS sobre os demais.

**24. README.mkd.** A promessa de refletir alterações do UI Kit nas quatro apps não corresponde ao consumo encontrado: só o shell importa o pacote (`apps/shell/src/App.vue:3,14-15`). Nenhum dos três remotos declara a dependência nos seus manifestos. A existência de desenvolvimento Vite e de orquestração conjunta (`package.json:7,10`) não cria consumidores da biblioteca nas outras apps.

## Resumo

Afirmações: 24 (corroborada: 10, parcial: 0, contradita: 13, sem corroboração: 1). Temas: (estrutura: 4, composição: 7, build-deploy: 3, independência: 2, outro: 8).
