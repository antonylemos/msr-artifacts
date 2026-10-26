---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
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

# 292 — jaideepsinghchauhan/Angular-MFE

## Leitura do repositório

Documentação em inglês: o README.md da raiz combina uma apresentação de host, dois MFEs e duas bibliotecas (README.md:1-3), o texto padrão do workspace Nx (README.md:8-108) e um tutorial de criação da composição e de compartilhamento de UI e dados (README.md:111-384). Foram lidos integralmente os três documentos marcados como `documentation`: README.md, libs/shared/data/README.md e libs/shared/ui/README.md. Os dois últimos são templates de biblioteca Nx, limitados à geração e ao comando de teste (libs/shared/data/README.md:1-7; libs/shared/ui/README.md:1-7), sem afirmação sobre as unidades frontend como conjunto. Os comandos e as orientações genéricas de tarefas, geração e CI do trecho padrão não afirmam que exista um deploy do projeto (README.md:16-87).

As cinco revisões anteriores estão `final`, com o mesmo id e commit da classificação e da linha de aquisição. Elas confirmam o núcleo do tutorial: host e dois remotes ligados por Module Federation, além das bibliotecas comuns. A aplicação padrão `apps/angular-monorepo` também é uma unidade frontend na revisão estrutural, mas não participa dessa composição (3.4.3, Unidades e Notas; 3.4.5, Resumo). A principal divergência semântica está na promessa de dois componentes de um mesmo MFE exportados e carregados por rota: o host importa `mfe1/GreetingRoutes`, mas mfe1 expõe `./GreetingComponent` (appshell/host/src/app/app.routes.ts:13-17; appshell/mfe1/module-federation.config.ts:5-9). O tutorial manda acrescentar `./GreetingRoutes` (README.md:171-176), mas seu próprio bloco de configuração já mostra outra exposição (README.md:181-190). Esses blocos reproduzindo configurações e fontes são contexto, não afirmações adicionais na tabela.

Ocorrências `doc-*` sem linha própria: README.md:137 é a pergunta que introduz a explicação da conexão; README.md:142 repete a existência do segundo remote da afirmação 1; README.md:144 retoma a granularidade de múltiplas exposições da afirmação 3. README.md:151,154,176,183,185,187,213,225,226,230,371 pertencem aos exemplos de código, configuração ou template reproduzidos; README.md:171,216,220,234 são instruções de edição e diagnóstico de tipos; README.md:252 é uma pergunta sem resposta direta; README.md:292,294 reproduzem o diagnóstico do compilador, inclusive a hipótese genérica de Web Component, sem afirmar que o projeto use esse mecanismo. README.md:254,303 retomam o compartilhamento de dados da afirmação 2; README.md:349,352 apenas introduzem o exemplo de mfe1. As ocorrências nas linhas 1,2,3,134,135,138,140,250,283,346 são tratadas na tabela e nas respectivas observações. A explicação de como o mesmo serviço é injetado nas unidades tem linha própria por explicitar o mecanismo (afirmação 9).

Foram examinados os comentários e campos descritivos dos artefatos citados nas revisões anteriores: package.json (sem `description`), nx.json, tsconfig.base.json, os project.json das aplicações, bibliotecas e e2e; as configurações module-federation.config.ts e webpack*.config.ts de host, mfe1 e mfe2; eslint.config.mjs, jest.config.ts, jest.preset.js, cypress.config.ts e playwright.config.ts; e os fontes de bootstrap, rotas, composição e bibliotecas. Os comentários federados são instruções genéricas do scaffold: remote externo hipotético (appshell/host/module-federation.config.ts:5-16), resolução do grafo Nx (appshell/host/module-federation.config.ts:20-22; appshell/mfe2/module-federation.config.ts:10-12), tipagem/DTS (appshell/host/webpack.config.ts:4-8 e equivalentes dos remotes) e exemplo de URLs de produção (appshell/host/webpack.prod.config.ts:12-21 e equivalentes dos remotes). Não afirmam a existência de outra relação ou implantação neste projeto. Os demais comentários são orientações de ferramenta, testes ou marcações de template, sem afirmação arquitetural adicional.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:1 | "This Repo include 1 host/Appshell and 2 MFE's and 2 Libraries" | estrutura | corroborada | 3.4.3 (appshell/host, appshell/mfe1, appshell/mfe2, libs/shared/data, libs/shared/ui); 3.4.5 #1-#2 |
| 2 | README.md:2 | "1 Library is for data sharing between MFEs and another is for shared html components(common used resources)" | outro | corroborada | 3.4.5 #3 e Leitura; appshell/host/src/app/app.ts:4-5,9,15; appshell/mfe1/src/app/remote-entry/entry.ts:4-6; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:3,875-877 |
| 3 | README.md:3 | "1 mfes which has 2 independent separate component being export and both lazyloaded based on the route" | estrutura | contradita | 3.4.4 (appshell/host/src/app/app.routes.ts:16, Undetermined); 3.4.5 #2; appshell/mfe1/module-federation.config.ts:5-9; appshell/host/src/app/app.routes.ts:9-17 |
| 4 | README.md:134 | "the mapping in host module federation config file for both mfes" | composição | corroborada | 3.4.5 #1-#2; appshell/host/module-federation.config.ts:17; appshell/mfe1/module-federation.config.ts:4-6; appshell/mfe2/module-federation.config.ts:4-6 |
| 5 | README.md:135 | "that is for localhost [...] we need to add the url mapping there in prod mfe config file as well" | build-deploy | corroborada | 3.4.6 #2-#4; appshell/host/project.json:44-45,59-64; appshell/host/webpack.prod.config.ts:9-24; appshell/host/module-federation.config.ts:17 |
| 6 | README.md:140 | "we use lazy loading to import [...] in host/appshell app routes, so that we only load mfe which we want to navigate to" | composição | corroborada | 3.4.4 (appshell/host/src/app/app.routes.ts:7,11, Yes); 3.4.5 #1-#2; appshell/host/src/app/app.routes.ts:5-12 |
| 7 | README.md:250 | "it works as an independent standalone mfe" | independência | contradita | 3.4.6 #3; appshell/mfe1/project.json:59-75; appshell/host/src/app/app.routes.ts:13-17; appshell/mfe1/module-federation.config.ts:5-9 |
| 8 | README.md:283 | "import and use this button in mfe1 or mfe2 [...] use the same import statement from tsconfig.base.json" | composição | corroborada | tsconfig.base.json:18; appshell/host/src/app/app.ts:4,9; appshell/mfe1/src/app/remote-entry/entry.ts:4-6; 3.4.5 (Leitura) |
| 9 | README.md:346 | "use this service in a mfe [...] simply inject the same service in mfe and work with it" | composição | corroborada | 3.4.5 #3; appshell/host/src/app/app.ts:5,15,18-23; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:3,875-877; libs/shared/data/src/lib/user.service.ts:3-20 |

## Observações

**1. README.md:1.** A apresentação nomeia as três aplicações da composição e as duas bibliotecas, confirmadas pela revisão estrutural. README.md:131-132 descreve a criação do host em `appshell/host`, e README.md:142 retoma o segundo MFE. Não se lê o título como inventário exaustivo de aplicações do workspace: a aplicação inicial `angular-monorepo` aparece nos comandos do próprio README.md:18-27 e está fora da composição segundo 3.4.5, Resumo.

**2. README.md:2.** As duas finalidades se confirmam em pelo menos duas unidades. O host importa Button e UserService e registra o botão (appshell/host/src/app/app.ts:4-5,9); mfe1 também registra Button em seus imports (appshell/mfe1/src/app/remote-entry/entry.ts:4-6) e injeta e lê o serviço de dados (appshell/mfe1/src/app/remote-entry/nx-welcome.ts:3,875-877). O host usa o botão no template para login/logout (appshell/host/src/app/app.html:6-15); em mfe1, o registro do botão não significa que seu template o renderize (appshell/mfe1/src/app/remote-entry/entry.ts:6-8). README.md:254,303 repete a intenção de compartilhar dados; a ligação concreta por injeção do serviço é detalhada na afirmação 9.

**3. README.md:3.** A frase indivisível combina duas exposições e o carregamento das duas por rota. mfe1 de fato expõe `./Routes` e `./GreetingComponent` (appshell/mfe1/module-federation.config.ts:5-9), mas o host importa `mfe1/Routes` e `mfe1/GreetingRoutes` (appshell/host/src/app/app.routes.ts:9-17). A segunda chave não corresponde ao módulo exposto. A parte confirmada não supera a contradição do carregamento adicional. README.md:144 retoma a ideia de exportar múltiplos módulos menores como MFEs individuais; README.md:171-190 mostra a divergência no próprio tutorial. Os exemplos de greeting e de declarações TypeScript (README.md:150-248) não corrigem o `exposes` do snapshot.

**4. README.md:134.** O mapeamento é `remotes: ['mfe1', 'mfe2']` no host (appshell/host/module-federation.config.ts:17). README.md:138 explica a mesma conexão pelo remote entry exportado: ambos expõem `./Routes` (appshell/mfe1/module-federation.config.ts:6; appshell/mfe2/module-federation.config.ts:6), consumido pelo host (appshell/host/src/app/app.routes.ts:7,11). O mecanismo está configurado por `withModuleFederation` (appshell/host/webpack.config.ts:1-9), coerente com a tecnologia da revisão 3.4.2 e com as relações 1 e 2 de 3.4.5.

**5. README.md:135.** A frase reconhece a configuração local e o trabalho pendente para produção, sem afirmar deploy realizado. O host serve em localhost e aponta o build de produção para webpack.prod.config.ts (appshell/host/project.json:44-45,59-64); esse arquivo reaplica a configuração, deixando apenas um exemplo comentado de URLs (appshell/host/webpack.prod.config.ts:9-24). A revisão 3.4.6 #2-#4 registra apenas serviço local e deploy não observado. A lacuna descrita pelo tutorial, portanto, coincide com os artefatos.

**6. README.md:140.** As rotas `mfe2` e `mfe1` usam `loadChildren` e imports dinâmicos dos módulos federados (appshell/host/src/app/app.routes.ts:5-12). Elas são registradas por `provideRouter(appRoutes)` (appshell/host/src/app/app.config.ts:13) e têm links e área de composição no template (appshell/host/src/app/app.html:1-5,17). Isso sustenta o carregamento por navegação dos dois MFEs; a promessa específica de duas exposições de mfe1 é a afirmação 3, com corroboração diferente.

**7. README.md:250.** A conclusão de independência vem após os passos da rota greeting e das declarações de tipos. Há entrada própria de mfe1 (appshell/mfe1/src/bootstrap.ts:1-5), mas o target `serve` depende explicitamente de `host:serve` (appshell/mfe1/project.json:59-75); essa execução não está configurada para subir sozinha. Além disso, a chave consumida para greeting no host permanece ausente do `exposes` (appshell/host/src/app/app.routes.ts:13-17; appshell/mfe1/module-federation.config.ts:5-9). `standalone` no componente Angular (appshell/mfe1/src/app/greeting/greeting.component.ts:4-8) é uma propriedade interna, insuficiente para confirmar a independência da unidade declarada pelo texto.

**8. README.md:283.** O texto apresenta mfe1 ou mfe2 como possibilidades e escolhe o entry de mfe1 como exemplo, sem afirmar uso efetivo nos dois remotes. O alias `@angular-monorepo/button` aponta para a biblioteca de UI (tsconfig.base.json:18), e o mesmo import está no host e em mfe1, registrado nos metadados Angular de ambos (appshell/host/src/app/app.ts:4,9; appshell/mfe1/src/app/remote-entry/entry.ts:4-6). README.md:261-263 introduz a biblioteca e o import no host; README.md:269-281 reproduz esse código. O erro e as instruções de reinício em README.md:285-301 são diagnóstico operacional, sem nova afirmação sobre a composição.

**9. README.md:346.** O mecanismo concreto é a injeção do UserService comum: o host altera seu signal por login/logout (appshell/host/src/app/app.ts:18-23; libs/shared/data/src/lib/user.service.ts:10-16), e mfe1 injeta o serviço e lê o estado (appshell/mfe1/src/app/remote-entry/nx-welcome.ts:3,875-877), exibido no template (:9). A revisão 3.4.5 #3 registra o canal e sua dependência do compartilhamento padrão das bibliotecas do workspace pelo wrapper Nx; não há `shared` explícito nas configurações federadas. README.md:309-344 e :352-384 reproduz o serviço e seus consumidores, sem gerar linhas adicionais.

## Resumo

Afirmações: 9 (corroborada: 7, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 2, composição: 4, build-deploy: 1, independência: 1, outro: 1).
