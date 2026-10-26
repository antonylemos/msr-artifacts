---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Leitura do repositório

Foram lidos integralmente os oito documentos da mineração: os dois changelogs datados, o README da raiz, `nx-mf-comm-info.md` (húngaro), `platform-communication-details.md` (inglês), o README do workspace e os dois READMEs das libs. A documentação principal é extensa e centrada na comunicação: descreve quatro aplicações Angular num workspace Nx, composição por Native Federation e contratos/adaptadores em duas libs. A federação por rotas e o deploy conjunto correspondem às revisões anteriores. Os diagramas confundem os providers do modo standalone com os componentes federados, enquanto a prosa explicita corretamente o handler da demo executado no host (README.md:66-81, :142; nx-mf-comm-info.md:100-108). O README também mantém a versão antiga do pacote (README.md:287; nx-mf-df/package.json:89).

As cinco revisões 3.4.2–3.4.6 estão `final`, com o mesmo ID e commit da classificação e do acquisition.csv. A linha manual de comunicação da 3.4.4 distingue os bootstraps e handlers executados pelo host dos consumidores nos componentes federados. O componente exposto não executa seu config standalone (nx-mf-df/apps/mf_remote_a/federation.config.js:8-10; nx-mf-df/apps/main-host/src/app/app.routes.ts:14), e provê apenas o ID de boas-vindas e `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28). O serviço consome mensagens pelo `BUS_TOKEN` herdado ou pela ponte global (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36, :62-75). Os handlers integrados são registrados no host e assinam em nome dos remotes (nx-mf-df/apps/main-host/src/app/app.config.ts:50-53; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-80), conforme a 3.4.5 #4-6. Essa distinção mantém a contradição do diagrama na afirmação 12 e a corroboração do handler no host na afirmação 16.

As ocorrências `doc-*` foram abertas. Nos changelogs, títulos/nomes de pacote e upgrades (:3, :7 de ambos), presença de função/arquivo global (CHANGELOG-2026-05-31.md:22, :71), menções a testes (:63, :77) e relatos de smoke (CHANGELOG-2026-05-24.md:40; CHANGELOG-2026-05-31.md:54) são histórico, nomes ou verificação declarada, sem afirmação adicional de arquitetura. Patch, token e configuração dos handlers estão na tabela. Em README.md, :34 é rótulo do diagrama; :160 é caminho do handler; :209 é instrução repetida de inicialização; :309-310 repetem a estrutura e tecnologia já contadas. :102-103 são contratos com participantes lógicos, :109 explica a motivação dos eventos já registrados. A tabela e as observações incorporam as demais ocorrências como afirmações ou repetições.

Em nx-mf-comm-info.md, :6 anuncia o conteúdo, :28 nomeia um import, :34 e :40 intitulam exemplos, :36-44 e :51 explicam topologias genéricas do pacote. :116-119 enumera imports usados e :162-168 lista contratos/ACLs; :178 descreve o adaptador compartilhado, :187 repete o bootstrap do host, :226 e :277 repetem o handler no host, :239 explica os rótulos da demo. Não se contam essas repetições como novas ligações físicas. :110 e :125 preservam versão e patch antigos; :117-119 e :291 nomeiam APIs, sem aplicações adicionais.

O documento platform-communication-details.md é uma referência do pacote externo ligado à composição, não a implementação adquirida desse pacote. As ocorrências :1, :3, :11, :29, :42-48, :55, :313, :318 e :476-484 são título, versão, instalação, índice de API ou promessa de suficiência do guia. :67, :202, :215, :226 e :249 são títulos; :235, :253-255, :348 e :372-373 ficam em snippets que reproduzem fontes/configurações e não viram afirmações. As ocorrências :69, :73, :75, :91, :196-198, :204, :217, :220, :247, :251, :272, :332, :392, :398, :404, :406 e :448-450 repetem o bus compartilhado, identidades, contratos ou acesso à ponte registrados na tabela. :408 é uma opção hipotética de bus local, não comportamento implantado. :430-431 e :433 apresentam adaptadores React/Vue externos, sem unidades dessas tecnologias no snapshot; :440 trata de segurança do pacote, e :455 de teardown manual. :461 e :484 remetem ao fonte/testes da biblioteca externa, ausentes neste snapshot. Não se infere daqui transporte implementado, isolamento, sincronização de estado ou aplicações adicionais.

O README Nx em nx-mf-df/README.md:1-96 e os READMEs gerados em nx-mf-df/libs/common-ui-lib/README.md:1-7 e nx-mf-df/libs/contracts-platform-messaging/README.md:1-11 são templates de ferramentas com comandos genéricos, sem afirmação sobre composição de unidades. A referência a Jest no último é contexto do template; a 3.4.2 já distingue a configuração Jest do target Vitest. Blocos de comandos, os exemplos de providers em nx-mf-comm-info.md:129-143 e os snippets de API em platform-communication-details.md foram lidos como instruções/código reproduzido. O Mermaid e a árvore comentada, ao contrário, entram nas afirmações.

Foram inspecionados comentários e campos descritivos nos artefatos citados nas revisões anteriores: package.json da raiz e das libs; project.json dos apps, e2e e libs; federation.config.js dos quatro apps; nx.json, pnpm-workspace.yaml, tsconfig.base.json, ng-package.json, configs ESLint/Jest/Vitest/Playwright; entradas main/bootstrap, app.config, rotas e componentes expostos; header/main do host; índice e serviços de mensageria das libs; scripts start-all/gh-build/gh-stage/gh-deploy e workflow do Pages. Os comentários encontrados são orientações de ferramenta, teste ou otimização, como nx-mf-df/apps/main-host/federation.config.js:16-25 e nx-mf-df/apps/mf_remote_a/federation.config.js:21-30; não acrescentam uma afirmação sobre as unidades. Não há `description` nos manifestos lidos. A string de título do cabeçalho (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:8) repete o caráter de PoC. A correção autorizada da linha manual de comunicação da 3.4.4 foi incorporada nesta leitura; nenhum arquivo de data/ foi alterado.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | CHANGELOG-2026-05-24.md:12 | “Native Federation fails without the patch” | build-deploy | parcial | nx-mf-df/pnpm-workspace.yaml:3-4; nx-mf-df/patches/@lkovari__microfrontend-platform-communication@0.3.2.patch:9-40 |
| 2 | CHANGELOG-2026-05-31.md:16 | “a shared compile-time constant is used” | composição | corroborada | nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-bridge-access-token.ts:1-2; nx-mf-df/apps/main-host/src/app/app.config.ts:43-46; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:56-83 |
| 3 | CHANGELOG-2026-05-31.md:37 | “Wired into all four app configs” | composição | corroborada | nx-mf-df/apps/main-host/src/app/app.config.ts:52-53; nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:28-29; 3.4.5 #4-6 |
| 4 | README.md:3 | “Angular 21 + Nx monorepo proof-of-concept for native module federation with host-mediated cross-microfrontend messaging” | estrutura | corroborada | 3.4.3 Unidades; 3.4.5 #1-6; nx-mf-df/package.json:31-48; nx-mf-df/apps/main-host/src/app/app.config.ts:31-47 |
| 5 | README.md:13 | “Shell: layout, routing, owns the platform bus and window.__MFE_BRIDGE__” | estrutura | corroborada | nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:13-20; nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26; nx-mf-df/apps/main-host/src/app/app.config.ts:31-47 |
| 6 | README.md:14 | “Federated remotes loaded into the shell by route” | composição | corroborada | 3.4.5 #1-3; nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25 |
| 7 | README.md:15 | “Versioned Zod contracts, participant IDs, bus validators, topic registry” | estrutura | corroborada | nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:1-14; nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:30-95; nx-mf-df/apps/main-host/src/app/app.config.ts:35-40; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:14-18 |
| 8 | README.md:16 | “Shared UI, PrimeNG setup, platform messaging adapters and demo UI” | estrutura | corroborada | nx-mf-df/apps/main-host/src/app/app.config.ts:9-22; nx-mf-df/apps/mf_remote_a/src/app/app.ts:4-20; nx-mf-df/apps/mf_remote_b/src/app/app.ts:4-20; nx-mf-df/apps/mf_remote_c/src/app/app.ts:4-20 |
| 9 | README.md:17 | “npm package: in-process bus, host bridge, Angular providers” | composição | corroborada | 3.4.2 nx-mf-df/package.json:89; nx-mf-df/apps/main-host/src/app/app.config.ts:7-47; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-83 |
| 10 | README.md:19 | “They expose only their root component into the host; they do not bootstrap a separate Angular app inside the federated shell page” | composição | corroborada | 3.4.5 #1-3; nx-mf-df/apps/mf_remote_a/federation.config.js:8-10; nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25 |
| 11 | README.md:25 | “One physical bus per browser tab. The host creates it; remotes attach through the global bridge handle” | composição | corroborada | nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-56; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-75 |
| 12 | README.md:66-81 | “mf_remote_a / b / c (federated components) → providePlatformMessageListenerBootstrap / provideDemoShellH2rQueryRemoteHandlerBootstrap” | composição | contradita | nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:26-29; nx-mf-df/apps/main-host/src/app/app.config.ts:51-53; 3.4.5 #4-6 |
| 13 | README.md:86-95 | “These strings are agreed explicitly in code (not inferred from federation build names)” | composição | corroborada | nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:1-32; nx-mf-df/apps/main-host/src/app/app.config.ts:32-44; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75 |
| 14 | README.md:95 | “Routing uses optional target on messages plus each subscription’s subscriberId” | composição | parcial | nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75; nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:47-87 |
| 15 | README.md:116 | “Remotes: listen-only UI (...) replay buffer in sessionStorage for subscribers that mount after send” | composição | corroborada | nx-mf-df/apps/mf_remote_a/src/app/app.html:1-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/message-sender.service.ts:26-29; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:87-95; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/platform-message/platform-message-replay.storage.ts:6-76 |
| 16 | README.md:142 | “the “remote” handler runs in the host process (subscribes as mf_remote_a, mf_remote_b, and mf_remote_c)” | composição | corroborada | nx-mf-df/apps/main-host/src/app/app.config.ts:50-53; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-122; 3.4.5 #4-6 |
| 17 | README.md:196 | “remotes first, then host” | independência | corroborada | nx-mf-df/scripts/start-all.mjs:9-17; nx-mf-df/scripts/start-all.mjs:113-121 |
| 18 | README.md:205 | “Production build + GitHub Pages asset prep” | build-deploy | corroborada | 3.4.6 #1-4; nx-mf-df/scripts/gh-build.mjs:49-64; nx-mf-df/scripts/gh-stage.mjs:13-27 |
| 19 | README.md:207 | “Push to gh-pages branch” | build-deploy | corroborada | 3.4.6 #1-4; nx-mf-df/scripts/gh-deploy.mjs:33-46; .github/workflows/deploy-github-pages.yml:37-58 |
| 20 | README.md:248 | “Apps expose build, serve, lint, test (and federation-related esbuild / serve-original)” | build-deploy | corroborada | nx-mf-df/apps/main-host/project.json:8-118; nx-mf-df/apps/mf_remote_a/project.json:8-118; 3.4.6 #1-4 |
| 21 | README.md:281 | “Build and lint targets use Nx caching” | build-deploy | corroborada | nx-mf-df/nx.json:19-33; nx-mf-df/nx.json:41-54 |
| 22 | README.md:287 | “is pinned at ^0.2.1 in nx-mf-df/package.json” | outro | contradita | nx-mf-df/package.json:89; nx-mf-df/pnpm-workspace.yaml:3-4; 3.4.2 nx-mf-df/package.json:89 |
| 23 | nx-mf-comm-info.md:204 | “Listen-only (nincs küldő UI remote route-on) (Somente escuta; não há UI de envio na rota remota)” | composição | contradita | nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:14-20; nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25; 3.4.5 #4-6 |
| 24 | nx-mf-comm-info.md:241-250 | “önálló dev szerver (...) nincs shell bridge (servidor de desenvolvimento autônomo; não há ponte do shell)” | independência | corroborada | nx-mf-df/apps/mf_remote_a/src/main.ts:3-5; nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:1-5; nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:19-30; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:44-56 |
| 25 | platform-communication-details.md:63-65 | “backed by a browser EventTarget (...) no postMessage, no WebSocket, and no cross-origin transport” | composição | sem corroboração | — |
| 26 | platform-communication-details.md:251 | “read handle.appId (...) and handle.remotes” | composição | corroborada | nx-mf-df/apps/main-host/src/app/app.config.ts:43-46; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:59-72 |

## Observações

**1. CHANGELOG-2026-05-24.md:12.** O mesmo requisito de resolução ESM reaparece em CHANGELOG-2026-05-31.md:12, README.md:287 e nx-mf-comm-info.md:125. Há patch registrado para 0.3.2, corrigindo `.mjs` para `.js`, mas não há tarball nem resultado de build sem patch que confirme a falha alegada. As referências a 0.2.1 e 0.3.0 nos changelogs narram upgrades passados; não comprovam o estado histórico pelo snapshot atual.

**2. CHANGELOG-2026-05-31.md:16.** A ponte do host recebe o token comum, e o adaptador dos remotes passa a mesma constante a `getBus` e `tryPublish`. A implementação confirma o contrato compartilhado para acesso à ponte; não estabelece isolamento ou autenticação forte entre as unidades.

**3. CHANGELOG-2026-05-31.md:37.** O bootstrap do handler de command está configurado nos quatro apps, conforme 3.4.5 #4-6. Isso descreve configurações próprias, não quatro handlers executados ao carregar os componentes federados. Os relatos de smoke nas linhas 40 do changelog anterior e 54 deste não demonstram publicação pelos componentes remotos na página composta.

**4. README.md:3.** O workspace contém quatro aplicações Angular e duas libs, com Native Federation e um barramento criado no host. A expressão qualificada “native module federation” corresponde ao pacote Native Federation efetivamente usado; não afirma uso de Webpack Module Federation. README.md:5, :178-184 e :309-314 e o título exibido em nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:8 repetem a estrutura e o caráter de prova de conceito.

**5. README.md:13.** O host mantém a navegação e o cabeçalho, registra as rotas e cria bus e bridge. O mesmo papel aparece no diagrama README.md:29-35 e na árvore nx-mf-comm-info.md:94-98, nos passos :187-189 e no resumo :289.

**6. README.md:14.** Cada uma das três rotas chama `loadRemoteModule` e monta `m.App`. A instrução histórica README.md:311 nomeia o mesmo mecanismo de manifesto e rotas; não constitui outra relação.

**7. README.md:15.** A lib de contratos define os participantes e os validadores/ACLs com limites de versão, consumidos pelo host e por serviços usados nos remotes. Confirma contratos de mensagens versionados, não releases independentes de apps. Repetições: README.md:38-47, :97-103; nx-mf-comm-info.md:159-170, :291. As setas shell→remote→shell dos contratos representam IDs lógicos: a implementação da demo é detalhada na afirmação sobre o handler no host.

**8. README.md:16.** O host e os três remotes importam a `common-ui-lib`; há uso por múltiplas unidades, além da disponibilidade por alias. nx-mf-comm-info.md:172-183 e :289 descreve a mesma divisão entre contratos e adaptadores/UI.

**9. README.md:17.** O pacote externo fornece os providers invocados pelo host e os tipos usados pelo adaptador. nx-mf-comm-info.md:116-121 e :291 repete os subpaths usados. As enumerações de símbolos externos em platform-communication-details.md:42-48, :313-328 e :476-482 são referências de API, não unidades adicionais do monorepo.

**10. README.md:19.** A exposição aponta para `app.ts`, não para `main.ts` nem para o bootstrap standalone. A escolha da tecnologia Native Federation na mesma linha é a já registrada na afirmação 4. nx-mf-comm-info.md:108 explicita corretamente que o `app.config.ts` do remote não executa nessa integração.

**11. README.md:25.** A aplicação composta registra o bus no host; o consumidor usa `BUS_TOKEN` herdado ou o adaptador da ponte global. A unicidade é a da coordenação dessa página, sem instâncias isoladas nos componentes. Repetições: README.md:19, :34, :76-79; nx-mf-comm-info.md:18, :22, :48-51, :180, :187-190, :250, :280; platform-communication-details.md:65-75, :91, :217-220, :367, :398-406, :433, :449-451. As topologias genéricas de nx-mf-comm-info.md:34-50 não provam emissores remotos ativos na composição.

**12. README.md:66-81.** O diagrama coloca esses bootstraps sob os componentes federados. Eles pertencem ao `app.config.ts` standalone; o componente exposto só provê o ID de boas-vindas e `PlatformWelcomeLastMessageService`. Na página composta, os bootstraps de listener/query são do host. A árvore comentada nx-mf-comm-info.md:100-105 repete essa atribuição imprecisa, embora o próprio texto :108 a limite corretamente.

**13. README.md:86-95.** Os IDs são constantes explícitas, usados nos providers e em `subscriberId`. O documento externo platform-communication-details.md:202-220, :269 e :448 repete a distinção; “independently” nessa ocorrência doc-independence se refere à identidade no bus, não à evolução autônoma de apps. Não é uma afirmação de que o projeto usa Webpack.

**14. README.md:95.** As assinaturas informam o participante e os contratos registram publicadores e assinantes. A entrega interna filtrando `target` é atribuída ao pacote externo, cujo fonte não está no snapshot. Repetições: nx-mf-comm-info.md:19, :36-44, :167-168; platform-communication-details.md:196-198, :228-247, :270, :392, :404 e :450. Os snippets de `bus.ts` no documento não substituem fonte adquirido.

**15. README.md:116.** Os componentes remotos exibem mensagens e histórico; não contêm compositor. O emissor salva eventos aceitos no storage comum da sessão e o consumidor busca por participante. README.md:57 e nx-mf-comm-info.md:178, :202, :281 descrevem o mesmo replay. Isso não remove o compositor do cabeçalho do host ao navegar para um remote.

**16. README.md:142.** O handler usa os três IDs quando há `BUS_TOKEN` no host. Logo, os propósitos “Shell → remote request” e “Remote → shell reply” em README.md:102-103 descrevem participantes lógicos da demonstração, não um round-trip entre apps federados. nx-mf-comm-info.md:108, :212-226, :239 e :277 reconhece essa simulação. A linha manual de comunicação da 3.4.4 está alinhada a essa cadeia e distingue os handlers executados no host do consumo de mensagens pelos componentes remotos.

**17. README.md:196.** O orquestrador cria um processo Nx por aplicação, espera as portas ou o prazo de espera e então inicia o host. README.md:209, :213 e :217-219 repete a sequência. Os comandos isolados :192-195 mostram targets próprios; não demonstram que mensageria standalone funcione sem o shell.

**18. README.md:205.** Há builds separados do host e de cada remote, com baseHref próprio; o script atualiza o manifesto de produção. O stage reúne as saídas em uma árvore. Os comandos README.md:197-204 e :293-299 e a história :314 complementam essa instrução, sem evidenciar deploy independente por app.

**19. README.md:207.** O caminho manual publica `gh-pages-dist` pela ferramenta `gh-pages`; o workflow usa upload/deploy do Pages. Ambos juntam as quatro aplicações num site. Não há afirmação de execução bem-sucedida em produção derivável só desses scripts.

**20. README.md:248.** Os targets aparecem nos projetos e os scripts da raiz invocam builds por app (nx-mf-df/package.json:18-24). O complemento sobre libs “where configured” não afirma que toda lib tenha todos os mesmos targets.

**21. README.md:281.** A configuração ativa cache nos executores de aplicação, lint e bibliotecas e define entradas. A afirmação descreve a configuração de reutilização de builds; não é medição de desempenho.

**22. README.md:287.** O manifesto atual usa `^0.3.2`, e o patch registrado também é 0.3.2. nx-mf-comm-info.md:110, :125 e platform-communication-details.md:3, :11 e :484 mantêm a referência antiga. A correção de exports existe, como na afirmação 1, mas para outra versão. As entradas datadas dos changelogs são histórico declarado, não fonte de confirmação da dependência atual.

**23. nx-mf-comm-info.md:204.** A ausência de emissor dentro do componente remoto é confirmada pela afirmação 15. Aqui o texto amplia a ausência à rota remota: o cabeçalho do host continua com o compositor e a suíte de query/command nas rotas integradas. Não se pode equiparar o conteúdo do componente à página inteira.

**24. nx-mf-comm-info.md:241-250.** O remote possui entrada e bootstrap próprios, mas seu config não cria bus nem host bridge. Em uma página standalone, o adaptador retorna ausência de bus até existir uma ponte. A referência a banner é contexto de UX; platform-communication-details.md:408 recomenda opcionalmente um bus local para testes, sem afirmar que o monorepo o implementou.

**25. platform-communication-details.md:63-65.** A afirmação especifica o transporte interno do pacote que conecta as unidades. O snapshot contém adaptadores/imports, não o fonte `mfe-platform-communication/src/core/bus.ts`. A ausência dessas APIs nos apps, registrada na 3.4.4 Notas, não verifica o interior do pacote; os trechos reproduzidos no documento continuam sendo documentação.

**26. platform-communication-details.md:251.** O adaptador disponibiliza `getHostAppId()` e `getRemoteTargets()` lendo esses campos. A lista vem do host. platform-communication-details.md:272 e :451 repete esse mecanismo; a ressalva sobre alterações dinâmicas não comprova descoberta dinâmica ou registro de remotes em runtime neste projeto.

## Resumo

Afirmações: 26 (corroborada: 20, parcial: 2, contradita: 3, sem corroboração: 1). Temas: (estrutura: 4, composição: 14, build-deploy: 5, independência: 2, outro: 1).
