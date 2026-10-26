---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Leitura do repositório

O snapshot tem sete documentos próprios, em inglês: ARCHITECTURE.md, QUICK_START.md, README.md, STRUCTURE.md e os READMEs de common_simple, core_simple e users_simple. Todos foram lidos integralmente; não há README de template ou documento de terceiro entre eles. Os diagramas, árvores comentadas e instruções descrevem três aplicações: shell com roteamento, unidade de usuários e biblioteca de componentes federada. As cinco revisões 3.4.2–3.4.6 têm status `final` e o mesmo ID e commit da classificação e da aquisição. A documentação converge com as três relações de federação observadas; as principais restrições são a generalização de lazy loading, o singleton atribuído aos componentes comuns, o uso visual de Button pelo shell e as promessas de deploy sem artefato.

As ocorrências doc-* repetidas com conteúdo arquitetural estão associadas às afirmações abaixo e às suas Observações. Não constituem afirmações adicionais: títulos ARCHITECTURE.md:42, :150, :183, README.md:1, :103, QUICK_START.md:76, STRUCTURE.md:51 (“Module Federation Relationships”, ocorrência doc-integration-technology) e common_simple/README.md:19, core_simple/README.md:19, :64, users_simple/README.md:18; nomes de pasta em ARCHITECTURE.md:192, README.md:8, STRUCTURE.md:6; caminhos de comandos em QUICK_START.md:8, :20, :31, :42 e README.md:60; links de arquivos em QUICK_START.md:77-85, :126-127; links externos em README.md:178, :180; catálogo de documentação em STRUCTURE.md:221; objetivos pedagógicos em STRUCTURE.md:191-193 e afirmação de propósito em :242; extensão futura em README.md:170 e STRUCTURE.md:205. Os objetivos STRUCTURE.md:194-198 reiteram as propriedades de shell, lazy loading, compartilhamento e execução própria registradas na tabela. A recomendação de novos MFEs em ARCHITECTURE.md:265 também é prospectiva; “easy”, separação de responsabilidades e complexidade em :265-270 são avaliações qualitativas, sem propriedade adicional verificável da composição atual. Os ganhos de tamanho/desempenho anunciados em ARCHITECTURE.md:180-181 são justificativas do lazy loading de 11, sem métricas no snapshot; a prevenção de conflitos em :175 é a justificativa da política singleton de 12, não uma demonstração de resolução de conflitos.

Blocos que reproduzem comandos, imports ou configurações não geram linhas: README.md:58-95, :117-130; STRUCTURE.md:115-137, :160-174; QUICK_START.md:7-49, :98-101; common_simple/README.md:21-32, :40-48; core_simple/README.md:22-33; users_simple/README.md:21-38. Diagramas e árvores comentadas foram analisados como texto, inclusive a previsão de saída de build. A integração com JSONPlaceholder é interna à unidade de usuários (users_simple/src/App.tsx:18-32); os diagramas de fluxo de dados ARCHITECTURE.md:100-135 e descrições de API não acrescentam ligação entre frontends. Recomendações sobre estado, versões e futuras melhorias (ARCHITECTURE.md:272-273; README.md:168-174; STRUCTURE.md:201-210) não demonstram mecanismos presentes.

Também foram lidos os comentários e campos descritivos dos quatro package.json, das três rsbuild.config.ts, das entradas e bootstraps, dos três App.tsx e dos componentes Button/Card citados nas revisões anteriores. A description da raiz (package.json:5) repete a caracterização da afirmação 25; seus keywords são menções. O comentário de core_simple/src/App.tsx:8 reitera a afirmação 2; os demais comentários de código são supressões TypeScript (core_simple/src/App.tsx:3-5; users_simple/src/App.tsx:2-4). Os textos exibidos nas páginas (common_simple/src/App.tsx:8-9; core_simple/src/App.tsx:16-21; users_simple/src/App.tsx:38) repetem as exposições, papéis e consumo descritos abaixo. Não há Dockerfile ou workflow no inventário. A análise é estática, sem instalar, construir, executar ou consultar rede.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | ARCHITECTURE.md:13-19 | “CORE SIMPLE (Shell App) / React Router / Module Federation Host” | estrutura | corroborada | 3.4.3 Unidades core_simple; 3.4.5 #1, #2; core_simple/rsbuild.config.ts:8-14; core_simple/src/App.tsx:46-60 |
| 2 | ARCHITECTURE.md:18 | “Lazy Loading of Micro Frontends” | composição | corroborada | 3.4.5 #1; core_simple/src/App.tsx:8-9; core_simple/src/App.tsx:56-61 |
| 3 | ARCHITECTURE.md:27-35 | “COMMON SIMPLE [...] Exposes: [...] Button [...] Card” | composição | corroborada | 3.4.5 #2, #3; common_simple/rsbuild.config.ts:9-14 |
| 4 | ARCHITECTURE.md:27-34 | “USERS SIMPLE [...] Exposes: [...] UserList” | estrutura | corroborada | 3.4.3 Unidades users_simple; 3.4.5 #1; users_simple/rsbuild.config.ts:9-13; users_simple/src/App.tsx:14-60 |
| 5 | ARCHITECTURE.md:36-38 | “Consumes: [...] common/Button [...] common/Card” | composição | corroborada | 3.4.5 #3; users_simple/src/App.tsx:3-5; users_simple/src/App.tsx:40-53 |
| 6 | ARCHITECTURE.md:141 | “core_simple [...] common_simple/Button” | composição | corroborada | core_simple/src/App.tsx:3-4; core_simple/rsbuild.config.ts:12 |
| 7 | ARCHITECTURE.md:142 | “core_simple [...] common_simple/Card” | composição | corroborada | 3.4.5 #2; core_simple/src/App.tsx:6; core_simple/src/App.tsx:15-26; users_simple/src/App.tsx:49 |
| 8 | ARCHITECTURE.md:151-153 | “Rsbuild [...] @module-federation/rsbuild-plugin [...] Module Federation v2 support” | composição | corroborada | 3.4.2 Dependências; common_simple/package.json:16-18; core_simple/package.json:17-19; users_simple/package.json:17-19; common_simple/rsbuild.config.ts:1-8 |
| 9 | ARCHITECTURE.md:166 | “Each micro frontend exposes modules via Module Federation” | composição | corroborada | common_simple/rsbuild.config.ts:11-14; users_simple/rsbuild.config.ts:11-13; core_simple/rsbuild.config.ts:8-29 |
| 10 | ARCHITECTURE.md:167-168 | “Exposed at runtime via `remoteEntry.js` / Can be consumed by other apps” | composição | corroborada | 3.4.5 #1, #2, #3; common_simple/rsbuild.config.ts:9-14; users_simple/rsbuild.config.ts:9-16; core_simple/rsbuild.config.ts:11-14 |
| 11 | ARCHITECTURE.md:169 | “Loaded on-demand” | composição | contradita | core_simple/src/App.tsx:4-9; core_simple/src/App.tsx:15-26; users_simple/src/App.tsx:3-5 |
| 12 | ARCHITECTURE.md:172-175 | “`react` and `react-dom` are singletons / Only loaded once across all micro frontends” | composição | corroborada | common_simple/rsbuild.config.ts:15-24; core_simple/rsbuild.config.ts:15-23; users_simple/rsbuild.config.ts:17-25; common_simple/src/index.tsx:1-2; core_simple/src/bootstrap.tsx:1-2; users_simple/src/bootstrap.tsx:1-2 |
| 13 | ARCHITECTURE.md:184-185 | “Each micro frontend: [...] Can run independently” | independência | corroborada | 3.4.3 Unidades; common_simple/src/index.tsx:1-10; core_simple/src/index.tsx:1; core_simple/src/bootstrap.tsx:1-10; users_simple/src/index.tsx:1; users_simple/src/bootstrap.tsx:1-10 |
| 14 | ARCHITECTURE.md:186 | “Has its own dev server” | build-deploy | corroborada | 3.4.6 #1, #2, #3; common_simple/package.json:7; core_simple/package.json:7; users_simple/package.json:7; common_simple/rsbuild.config.ts:28-30; core_simple/rsbuild.config.ts:31-33; users_simple/rsbuild.config.ts:33-35 |
| 15 | ARCHITECTURE.md:187 | “Can be deployed separately” | build-deploy | sem corroboração | — |
| 16 | ARCHITECTURE.md:194 | “Root scripts for convenience” | build-deploy | corroborada | package.json:7-14; 3.4.6 #1, #2, #3 |
| 17 | ARCHITECTURE.md:201 | “App.tsx [...] Demo app” | estrutura | corroborada | common_simple/src/App.tsx:5-23; common_simple/src/index.tsx:3-8; 3.4.3 Unidades common_simple |
| 18 | ARCHITECTURE.md:250 | “Rsbuild checks if common components are already loaded (singleton)” | composição | contradita | common_simple/rsbuild.config.ts:11-24; core_simple/rsbuild.config.ts:11-27; users_simple/rsbuild.config.ts:11-29 |
| 19 | ARCHITECTURE.md:255 | “Each micro frontend is a separate bundle” | build-deploy | corroborada | 3.4.6 #1, #2, #3; common_simple/package.json:8; core_simple/package.json:8; users_simple/package.json:8 |
| 20 | ARCHITECTURE.md:258 | “Multiple remotes can load in parallel” | composição | sem corroboração | — |
| 21 | ARCHITECTURE.md:262 | “Teams can work on separate micro frontends” | independência | corroborada | 3.4.3 Unidades; common_simple/package.json:6-10; core_simple/package.json:6-10; users_simple/package.json:6-10; core_simple/rsbuild.config.ts:11-14; users_simple/rsbuild.config.ts:14-16 |
| 22 | ARCHITECTURE.md:264 | “Each app can use different versions (carefully)” | outro | sem corroboração | — |
| 23 | ARCHITECTURE.md:274 | “Failures in one MFE can affect others” | composição | corroborada | core_simple/src/App.tsx:4-9; core_simple/src/App.tsx:46-64; users_simple/src/App.tsx:3-5; users_simple/src/App.tsx:35-56 |
| 24 | QUICK_START.md:109 | “See changes reflect in both users_simple and core_simple” | composição | corroborada | users_simple/src/App.tsx:3, :40-42; users_simple/rsbuild.config.ts:11-13; core_simple/src/App.tsx:9, :59 |
| 25 | README.md:3 | “A minimal micro frontend architecture to understand Module Federation structure” | estrutura | corroborada | 3.4.3 Unidades; 3.4.5 #1, #2, #3; core_simple/src/App.tsx:9; core_simple/src/App.tsx:59 |
| 26 | README.md:153 | “Components from common_simple are eagerly loaded for better performance” | composição | parcial | core_simple/src/App.tsx:4-6; users_simple/src/App.tsx:3-5; core_simple/src/index.tsx:1; users_simple/src/index.tsx:1 |
| 27 | README.md:161 | “The shell app (core_simple) needs other apps to be running first” | composição | corroborada | 3.4.5 #1, #2, #3; core_simple/rsbuild.config.ts:11-14; users_simple/rsbuild.config.ts:14-16; core_simple/src/App.tsx:6-9 |
| 28 | STRUCTURE.md:142-154 | “After running `npm run build:all`, each app produces: [...] dist/ [...] remoteEntry.js” | build-deploy | parcial | 3.4.6 #1, #2, #3; package.json:11-14; common_simple/rsbuild.config.ts:10; core_simple/rsbuild.config.ts:10; users_simple/rsbuild.config.ts:10 |
| 29 | common_simple/README.md:55 | “Hot reload will update all consuming apps” | composição | sem corroboração | — |
| 30 | core_simple/README.md:9 | “Routing between different micro frontends” | estrutura | contradita | core_simple/src/App.tsx:57-60; users_simple/rsbuild.config.ts:11-13; common_simple/rsbuild.config.ts:11-14 |
| 31 | core_simple/README.md:17 | “Uses Button and Card components from common_simple” | composição | contradita | core_simple/src/App.tsx:4-6; core_simple/src/App.tsx:15-26; core_simple/src/App.tsx:1-68 |

## Observações

**1. Documento.** O shell tem dois remotes e controla a navegação. Repetem o papel e o roteamento ARCHITECTURE.md:215-219, :233-235; QUICK_START.md:72; README.md:10, :39-43, :109, :137, :145; STRUCTURE.md:39-48, :77-79, :101, :194, :198; core_simple/README.md:1-9, :51-55, :62. Há uma rota remota, `/users`, e uma Home local (core_simple/src/App.tsx:57-60); não são várias fatias funcionais remotas.

**2. Documento.** O carregamento lazy feito pelo shell é o de UserList na rota `/users`. O fluxo de ARCHITECTURE.md:65-97, :239-249, o comentário core_simple/src/App.tsx:8, README.md:30, :42, :152, STRUCTURE.md:78, :195 e users_simple/README.md:44-46 reiteram esse vínculo; core_simple/README.md:10, :15, :44 também. Os passos futuros de core_simple/README.md:64-68 explicam como ampliar o mesmo mecanismo, sem evidenciar outro remote funcional presente.

**3. Documento.** common_simple publica os dois componentes por federação, e tem consumidores efetivos. Repetições: ARCHITECTURE.md:196-203, :226-227; QUICK_START.md:70; README.md:9, :18-24, :107; STRUCTURE.md:14-26, :55-62, :88; common_simple/README.md:1, :7-17; common_simple/src/App.tsx:8-9; core_simple/src/App.tsx:20. Os exemplos de configuração e uso em common_simple/README.md:21-25, :40-48, README.md:117-130 e STRUCTURE.md:115-120 são blocos de código, sem linhas adicionais.

**4. Documento.** A unidade funcional de usuários expõe seu App inteiro como UserList. Reaparece em ARCHITECTURE.md:143, :207-211, :229-231; README.md:11, :27-33, :108; STRUCTURE.md:28-37, :69-80, :89, :230; users_simple/README.md:1, :7, :20-24; core_simple/src/App.tsx:21. A consulta à JSONPlaceholder (users_simple/src/App.tsx:25) é detalhe funcional dessa unidade, não outra unidade frontend.

**5. Documento.** users_simple importa e renderiza Button e Card de common_simple. O desenho abrevia os nomes, mas as referências efetivas usam `common_simple`. Repetições: ARCHITECTURE.md:81-96, :144-145, :230, :249; QUICK_START.md:63, :71; README.md:29, :35-37, :108; STRUCTURE.md:31-37, :71-73; users_simple/README.md:8, :27-31; users_simple/src/App.tsx:38. O trecho STRUCTURE.md:123-129 reproduz configuração.

**6. Documento.** O grafo de dependências tem correspondência no import de Button pelo shell. Isso confirma dependência declarada, sem confirmar renderização: o arquivo completo core_simple/src/App.tsx:1-68 não monta Button. O mesmo consumo declarado reaparece em ARCHITECTURE.md:234; README.md:45-48, :109; STRUCTURE.md:42, :48, :72-74, :90-91; core_simple/README.md:53. A afirmação explícita de uso visual é tratada em 31.

**7. Documento.** Card é usado efetivamente tanto no shell quanto em users_simple, corroborando o compartilhamento entre consumidores. Repetições do uso pelo shell: QUICK_START.md:62; README.md:47, :109; STRUCTURE.md:73, :90; core_simple/README.md:54. A configuração de consumo reproduzida em STRUCTURE.md:133-137 e core_simple/README.md:22-26 não vira outra linha.

**8. Documento.** Os três projetos usam Rsbuild com o plugin de Module Federation citado. O snapshot permite identificar a implementação escolhida, sem testar todas as capacidades anunciadas pelo plugin. README.md:143-144, STRUCTURE.md:99-100 e ARCHITECTURE.md:203, :211, :219 repetem a tecnologia/configuração; não indicam outro mecanismo de integração.

**9. Documento.** No contexto da seção “Remote Modules”, a afirmação descreve os provedores common_simple e users_simple, que têm exposes. O shell só tem remotes e shared; não se extrapola a frase para afirmar exposição pelo host. Essa distinção é explícita em STRUCTURE.md:88-90, que registra zero exposições do shell, e nas relações de 3.4.5.

**10. Documento.** Para os módulos expostos pelos dois provedores, os nomes de contêiner e arquivos remotos fecham as três relações. O fluxo de registro de ARCHITECTURE.md:55-57 e a busca descrita em :247-249 correspondem a esses endereços locais. Não há aferição de tráfego ou execução.

**11. Documento.** A generalização é repetida em ARCHITECTURE.md:178-181, :256: nem todo módulo remoto espera navegação para ser importado. UserList é lazy, mas Card entra por import estático no shell e é montado na Home; os componentes comuns também são imports estáticos de users_simple. A configuração lazy específica está em 2; não há medição de tamanho inicial nem de desempenho; as alegações qualitativas de melhora não provam resultado medido.

**12. Documento.** As três unidades usam React e ReactDOM e configuram ambos como singleton, corroborando a política de compartilhamento. ARCHITECTURE.md:257, README.md:151 e STRUCTURE.md:196 a repetem. O snapshot confirma a configuração, sem medir downloads nem demonstrar prevenção de todo conflito possível.

**13. Documento.** Cada unidade tem entrada e montagem próprias, sem precisar ser montada por outra. Isso não elimina suas dependências remotas: users_simple precisa de common_simple, e o shell referencia ambos (users_simple/rsbuild.config.ts:14-16; core_simple/rsbuild.config.ts:11-14). Repetições: QUICK_START.md:64-66; README.md:30, :150; STRUCTURE.md:197; common_simple/README.md:28-36; users_simple/README.md:34-42, que explicita esse pré-requisito.

**14. Documento.** Os servidores e scripts de desenvolvimento são separados. A sequência de ARCHITECTURE.md:226-235, QUICK_START.md:14-48, README.md:81-101 e STRUCTURE.md:157-177 é instrução operacional para iniciar esses processos; portas locais não demonstram deploy.

**15. Documento.** ARCHITECTURE.md:263 e users_simple/README.md:10 reiteram a capacidade de deploy independente. A 3.4.6 registra build separado e deploy não observado nas três aplicações. Não há configuração de hospedagem, publicação ou pipeline no inventário do snapshot. Builds distintos não bastam para provar a afirmação de deploy.

**16. Documento.** A raiz delega instalação, desenvolvimento e build aos três diretórios; não é um quarto frontend ou build unificado. README.md:12, STRUCTURE.md:8 e QUICK_START.md:12 repetem a organização e a instalação agregada; os comandos de instalação em si não geram afirmações adicionais.

**17. Documento.** common_simple tem sua própria página de demonstração, além de expor componentes. STRUCTURE.md:23, QUICK_START.md:65 e common_simple/README.md:36 repetem essa função. É por isso que a revisão estrutural conta três aplicações, mesmo havendo só um remote funcional de usuários.

**18. Documento.** O texto atribui singleton aos componentes comuns. Button e Card são exposes; singleton está em shared para react/react-dom e, nos consumidores, react-router-dom. Não há declaração singleton para Button, Card ou common_simple. O reaproveitamento de dependências React de 12 não é uma configuração singleton dos componentes expostos.

**19. Documento.** Há três alvos de build com configurações e diretórios próprios. A afirmação é corroborada como separação de builds por aplicação, sem interpretar “a separate bundle” como exatamente um arquivo JavaScript: os documentos também preveem chunks em STRUCTURE.md:149-152.

**20. Documento.** Os dois remotes estão declarados, mas o snapshot não fornece um carregador que coordene requisições em paralelo nem registro de execução que demonstre essa capacidade. A existência de duas referências remotas, por si só, não confirma a estratégia de paralelismo anunciada.

**21. Documento.** A separação dos projetos, entradas e ferramentas locais oferece fronteiras para desenvolvimento por unidade. A comunicação configurada usa módulos federados, sem importar os fontes de outro diretório. Isso sustenta a possibilidade estrutural; não demonstra equipes efetivamente distintas nem evolução organizacional autônoma.

**22. Documento.** O benefício anunciado não é demonstrado: os três manifestos usam React/ReactDOM ^18.3.1 (common_simple/package.json:11-13; core_simple/package.json:11-14; users_simple/package.json:11-14), com singletons compartilhados. Não há exemplo de versões diferentes coexistindo. A ressalva “carefully” e a compatibilidade recomendada em ARCHITECTURE.md:273 não fornecem prova dessa capacidade.

**23. Documento.** Os consumidores dependem de imports federados e o shell monta diretamente UserList; há Suspense, mas não uma fronteira de erro nesses componentes. Portanto uma falha no carregamento pode atingir a composição consumidora. O catch de users_simple/src/App.tsx:24-32 trata a consulta à API, não o carregamento de remotes.

**24. Documento.** O experimento manda modificar Button e prevê mudanças visíveis nos dois apps (QUICK_START.md:107-109), sem exigir uso direto na Home. users_simple importa e renderiza o componente federado (users_simple/src/App.tsx:3, :40-42) e expõe seu App como UserList (users_simple/rsbuild.config.ts:11-13). O shell carrega UserList e o monta na rota `/users` (core_simple/src/App.tsx:9, :59); assim, o mesmo Button aparece também na composição do shell. Esse encadeamento corrobora a afirmação, sem demonstrar propagação automática por hot reload, tratada em 29.

**25. Documento.** A apresentação do projeto como demonstração MFE corresponde ao shell, ao remote funcional e à biblioteca federada. package.json:5, :17-18 e core_simple/src/App.tsx:16-21 repetem essa caracterização. STRUCTURE.md:228-230 descreve três apps, dos quais um é o MFE de usuários: é uma distinção de papéis, compatível com as três fronteiras de aplicação da 3.4.3. A coluna “Original” da comparação não é evidência de outro sistema no snapshot.

**26. Documento.** Os componentes comuns têm imports estáticos nos consumidores, em contraste com o lazy de UserList; são carregados com a inicialização dos respectivos consumidores, após seus bootstraps assíncronos. Isso sustenta a parte de carregamento antecipado. O ganho de desempenho não tem medição no snapshot. O eager: true das configurações recai em React/ReactDOM, não nos exposes Button/Card (common_simple/rsbuild.config.ts:11-24).

**27. Documento.** Os endereços de desenvolvimento e imports exigem disponibilidade dos provedores para a composição completa. QUICK_START.md:89-91, common_simple/README.md:53, core_simple/README.md:35-37, :62 e users_simple/README.md:40, :56 reiteram a dependência operacional. A ordem recomendada é uma forma de disponibilizá-los; não é prova de orquestrador automático de inicialização.

**28. Documento.** O comando agregado aciona três builds próprios e todas as configurações nomeiam remoteEntry.js. A árvore de saída inclui HTML, chunks assíncronos e CSS condicional, mas nenhum dist gerado integra o snapshot. Assim a configuração dá suporte parcial, sem confirmar a árvore exata resultante, sobretudo a emissão pelo shell que não tem exposes.

**29. Documento.** Existem scripts rsbuild dev e consumidores federados, mas o snapshot não registra atualização propagada entre servidores nem configuração específica que demonstre essa promessa para todos os consumidores. Não houve execução para validá-la.

**30. Documento.** Literalmente, o texto promete roteamento entre diferentes MFEs. Há somente um MFE funcional montado por rota, users_simple; `/` monta Home local, que usa Card remoto como componente. common_simple não é outra página remota roteada. A existência de navegação e de três aplicações é corroborada em 1, mas não essa pluralidade de destinos MFE.

**31. Documento.** O shell usa Card, mas não renderiza Button em seu App. A importação não utilizada explica a diferença entre o grafo de dependências de 6 e esta afirmação de uso dos dois componentes. O Button que aparece na rota de usuários pertence à composição feita por users_simple (users_simple/src/App.tsx:40-42).

## Resumo

Afirmações: 31 (corroborada: 21, parcial: 2, contradita: 4, sem corroboração: 4). Temas: (estrutura: 5, composição: 18, build-deploy: 5, independência: 2, outro: 1).
