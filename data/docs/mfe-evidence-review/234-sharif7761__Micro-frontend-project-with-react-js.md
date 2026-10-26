---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Leitura do repositório

Três aplicações React com build Rsbuild próprio formam um shell, uma unidade funcional de usuários e uma biblioteca de componentes com App de demonstração (#16–#18). As declarações do plugin (#1–#3) levam às configurações de Module Federation: common_simple expõe Button/Card (#4), core_simple resolve os dois provedores (#5) e users_simple expõe UserList e também resolve common_simple (#6). O shell carrega e monta UserList em `/users` (#7, #12), usa Card na Home (#10, #11), e users_simple renderiza Button/Card (#13, #14). Essas construções implementam as três relações ativas entre unidades presentes no snapshot (#19–#21).

Os bootstraps assíncronos locais (#8, #9) não compõem outras unidades. A raiz só coordena scripts (#15). Os três builds são separados, mas deploy não foi observado e não há versionamento independente demonstrado (#22–#24); portas e URLs localhost não provam publicação. A documentação corrobora os papéis e a cadeia de composição, mas generaliza lazy loading (#35), atribui singleton aos componentes (#42), anuncia vários destinos MFE roteados (#54) e uso direto de Button pelo shell (#55), em desacordo com o snapshot. O import de Button pelo shell existe (#30), mas não sua renderização direta; o componente chega ao shell também pelo App de usuários (#48).

As promessas de deploy, paralelismo, versões distintas e hot reload ficam sem corroboração (#39, #44, #46, #53); desempenho e árvore de saída têm apoio parcial (#50, #52). O único commit adicionou documentação e implementação juntas. Os seis pontos históricos são inconclusivos sobre a origem dessas divergências, sem deixar alternativas arquiteturais em aberto no snapshot (#56–#61). A extração preserva os julgamentos finais da 3.4 e não acrescenta mineração.

## Observações

### 1. common_simple/package.json:16

**Observação:** `@module-federation/rsbuild-plugin` está em `devDependencies`, versão `^0.8.12`.

**Interpretação:** A declaração sinaliza a tecnologia de federação no build de common_simple; isoladamente não mostra ligação entre unidades.

### 2. core_simple/package.json:17

**Observação:** `@module-federation/rsbuild-plugin` está em `devDependencies`, versão `^0.8.12`.

**Interpretação:** A declaração sinaliza a tecnologia de federação no build de core_simple; isoladamente não mostra ligação entre unidades.

### 3. users_simple/package.json:17

**Observação:** `@module-federation/rsbuild-plugin` está em `devDependencies`, versão `^0.8.12`.

**Interpretação:** A declaração sinaliza a tecnologia de federação no build de users_simple; isoladamente não mostra ligação entre unidades.

### 4. common_simple/rsbuild.config.ts:8-26

**Observação:** `pluginModuleFederation` declara `name: common_simple`, `filename: remoteEntry.js`, expõe `./Button` e `./Card` a partir dos componentes locais e compartilha React/ReactDOM como singleton e eager.

**Interpretação:** Configura um provedor de componentes federados; o bloco não nomeia consumidores.

### 5. core_simple/rsbuild.config.ts:8-29

**Observação:** O plugin declara `core_simple`, `remoteEntry.js`, os remotes `common_simple@http://localhost:3001/remoteEntry.js` e `users_simple@http://localhost:3002/remoteEntry.js`, React/ReactDOM singleton e eager e react-router-dom singleton.

**Interpretação:** O shell nomeia e resolve duas unidades distintas por Module Federation.

### 6. users_simple/rsbuild.config.ts:8-31

**Observação:** O plugin declara `users_simple`, `remoteEntry.js`, expõe `./UserList` como `./src/App.tsx`, resolve `common_simple@http://localhost:3001/remoteEntry.js` e compartilha React/ReactDOM singleton e eager e react-router-dom singleton.

**Interpretação:** A unidade funcional é provedora para o shell e consumidora da biblioteca federada; o bloco liga users_simple a common_simple.

### 7. core_simple/src/App.tsx:9; core_simple/src/App.tsx:56-61; core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:11-13

**Observação:** `lazy(() => import('users_simple/UserList'))` carrega UserList, montado na rota `/users` sob Suspense.

**Interpretação:** O import nomeia a unidade remota de destino e participa da composição funcional do shell.

### 8. core_simple/src/index.tsx:1; core_simple/src/bootstrap.tsx:1-10

**Observação:** `import('./bootstrap')` carrega o bootstrap local que monta o App React.

**Interpretação:** É carga assíncrona interna à aplicação, sem compor outra unidade.

### 9. users_simple/src/index.tsx:1; users_simple/src/bootstrap.tsx:1-10

**Observação:** `import('./bootstrap')` carrega o bootstrap local que monta o App React.

**Interpretação:** É carga assíncrona interna à aplicação, sem compor outra unidade.

### 10. core_simple/src/App.tsx:15-23; core_simple/src/App.tsx:6; core_simple/rsbuild.config.ts:12; common_simple/rsbuild.config.ts:13

**Observação:** A Home renderiza Card em :15-23, importado estaticamente de `common_simple/Card`.

**Interpretação:** A montagem usa um componente federado; o ponto de renderização não nomeia sozinho a unidade de origem.

### 11. core_simple/src/App.tsx:24-26; core_simple/src/App.tsx:6; core_simple/rsbuild.config.ts:12; common_simple/rsbuild.config.ts:13

**Observação:** A Home renderiza Card em :24-26, importado estaticamente de `common_simple/Card`.

**Interpretação:** A montagem usa um componente federado; o ponto de renderização não nomeia sozinho a unidade de origem.

### 12. core_simple/src/App.tsx:46-61; core_simple/src/App.tsx:9; core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:11-13

**Observação:** Routes associa `/` à Home local e `/users` ao UserList remoto, dentro de BrowserRouter e Suspense.

**Interpretação:** O roteamento define onde a unidade funcional remota é composta pelo shell.

### 13. users_simple/src/App.tsx:40-42; users_simple/src/App.tsx:3; users_simple/rsbuild.config.ts:15; common_simple/rsbuild.config.ts:12

**Observação:** users_simple renderiza Button, importado estaticamente de `common_simple/Button` para atualizar a lista.

**Interpretação:** A renderização consome um componente federado; a chamada JSX isolada não nomeia a unidade provedora.

### 14. users_simple/src/App.tsx:49-53; users_simple/src/App.tsx:5; users_simple/rsbuild.config.ts:15; common_simple/rsbuild.config.ts:13

**Observação:** users_simple renderiza Card, importado estaticamente de `common_simple/Card` para cada usuário.

**Interpretação:** A renderização consome um componente federado; a chamada JSX isolada não nomeia a unidade provedora.

### 15. .; package.json:1-22

**Observação:** O manifesto da raiz contém scripts que entram nos três subdiretórios; não há entrada nem build próprios.

**Interpretação:** A raiz coordena comandos e não constitui uma quarta unidade frontend.

### 16. common_simple/; common_simple/package.json:1-23; common_simple/src/index.tsx:1-10; common_simple/rsbuild.config.ts:5-31

**Observação:** common_simple tem manifesto, entrada que monta React, configuração Rsbuild e script `rsbuild build` próprios.

**Interpretação:** Confirma uma fronteira de aplicação frontend; o App demonstra os componentes que a unidade também expõe por federação.

### 17. core_simple/; core_simple/package.json:1-24; core_simple/src/index.tsx:1; core_simple/src/bootstrap.tsx:5-10; core_simple/rsbuild.config.ts:5-34

**Observação:** core_simple tem manifesto, entrada que monta React, configuração Rsbuild e script `rsbuild build` próprios.

**Interpretação:** Confirma uma fronteira de aplicação frontend.

### 18. users_simple/; users_simple/package.json:1-24; users_simple/src/index.tsx:1; users_simple/src/bootstrap.tsx:5-10; users_simple/rsbuild.config.ts:5-36

**Observação:** users_simple tem manifesto, entrada que monta React, configuração Rsbuild e script `rsbuild build` próprios.

**Interpretação:** Confirma uma fronteira de aplicação frontend.

### 19. core_simple/src/App.tsx:9; core_simple/src/App.tsx:57-60; core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:9-13

**Observação:** core_simple resolve users_simple por remoteEntry.js e monta seu App exposto como UserList na rota `/users`.

**Interpretação:** A relação host → remote está ativa no snapshot e integra uma unidade funcional ao shell.

### 20. core_simple/src/App.tsx:6; core_simple/src/App.tsx:15-26; core_simple/rsbuild.config.ts:12; common_simple/rsbuild.config.ts:9-14

**Observação:** core_simple resolve common_simple por remoteEntry.js e renderiza duas instâncias de seu Card na Home.

**Interpretação:** A relação host → remote está ativa por compartilhamento de componentes; o import não utilizado de Button não acrescenta relação.

### 21. users_simple/src/App.tsx:3-5; users_simple/src/App.tsx:40-53; users_simple/rsbuild.config.ts:14-16; common_simple/rsbuild.config.ts:9-14

**Observação:** users_simple resolve common_simple por remoteEntry.js e renderiza Button e Card.

**Interpretação:** A relação host → remote está ativa tanto na aplicação autônoma de usuários quanto quando seu App é composto no shell.

### 22. common_simple/package.json:2-10; common_simple/rsbuild.config.ts:5-26; package.json:11; package.json:12

**Observação:** common_simple executa `rsbuild build` com configuração local; o build agregado delega a esse projeto. O manifesto declara versão 1.0.0 e private. A 3.4.6 registra build separado, deploy não observado e versionamento independente No.

**Interpretação:** Há um alvo de build por aplicação, sem evidência de publicação ou deploy independente; endereços localhost são de execução local.

### 23. core_simple/package.json:2-10; core_simple/rsbuild.config.ts:5-29; package.json:11; package.json:14

**Observação:** core_simple executa `rsbuild build` com configuração local; o build agregado delega a esse projeto. O manifesto declara versão 1.0.0 e private. A 3.4.6 registra build separado, deploy não observado e versionamento independente No.

**Interpretação:** Há um alvo de build por aplicação, sem evidência de publicação ou deploy independente; endereços localhost são de execução local.

### 24. users_simple/package.json:2-10; users_simple/rsbuild.config.ts:5-31; package.json:11; package.json:13

**Observação:** users_simple executa `rsbuild build` com configuração local; o build agregado delega a esse projeto. O manifesto declara versão 1.0.0 e private. A 3.4.6 registra build separado, deploy não observado e versionamento independente No.

**Interpretação:** Há um alvo de build por aplicação, sem evidência de publicação ou deploy independente; endereços localhost são de execução local.

### 25. ARCHITECTURE.md:13-19

**Observação:** O diagrama apresenta core_simple como shell com React Router, navegação e Module Federation Host.

**Interpretação:** Descreve o papel de composição do shell, corroborado pela configuração e pelas relações.

### 26. ARCHITECTURE.md:18

**Observação:** O diagrama atribui ao shell carregamento lazy de micro frontends.

**Interpretação:** A afirmação é corroborada especificamente pela carga de UserList em /users.

### 27. ARCHITECTURE.md:27-35

**Observação:** O diagrama atribui a common_simple as exposições Button e Card.

**Interpretação:** Descreve o papel de biblioteca federada, corroborado pelas exposições e consumidores.

### 28. ARCHITECTURE.md:27-34

**Observação:** O diagrama apresenta users_simple com lista de usuários, integração de API e exposição UserList.

**Interpretação:** Descreve a unidade funcional remota, corroborada pelo App exposto e pela relação com o shell.

### 29. ARCHITECTURE.md:36-38

**Observação:** O diagrama atribui a users_simple o consumo de common/Button e common/Card.

**Interpretação:** O consumo de componentes da biblioteca é corroborado pelos imports e renderizações efetivos.

### 30. ARCHITECTURE.md:141

**Observação:** O grafo associa core_simple a common_simple/Button.

**Interpretação:** Corrobora uma dependência importada, sem afirmar sua renderização direta; o import está presente e não é usado no JSX.

### 31. ARCHITECTURE.md:142

**Observação:** O grafo associa core_simple a common_simple/Card.

**Interpretação:** O uso efetivo de Card pelo shell corrobora essa ligação.

### 32. ARCHITECTURE.md:151-153

**Observação:** O texto lista Rsbuild, @module-federation/rsbuild-plugin com suporte a Module Federation v2 e @rsbuild/plugin-react.

**Interpretação:** Nomeia a tecnologia escolhida, corroborada pelos manifestos e configuração; não demonstra todas as capacidades do plugin.

### 33. ARCHITECTURE.md:166

**Observação:** O texto diz que cada micro frontend expõe módulos via Module Federation.

**Interpretação:** Na seção de remotes, descreve os provedores common_simple e users_simple; o host não possui exposes.

### 34. ARCHITECTURE.md:167-168

**Observação:** O texto diz que os módulos são expostos em runtime por remoteEntry.js e podem ser consumidos por outros apps.

**Interpretação:** A descrição corresponde aos provedores e às três relações configuradas.

### 35. ARCHITECTURE.md:169

**Observação:** O texto generaliza que os módulos são carregados sob demanda.

**Interpretação:** A 3.4.7 registra a afirmação como contradita: UserList é lazy, mas os componentes comuns têm imports estáticos.

### 36. ARCHITECTURE.md:172-175

**Observação:** O texto apresenta React e ReactDOM como singletons compartilhados, carregados uma vez entre os micro frontends.

**Interpretação:** A política de compartilhamento é corroborada pela configuração; não há medição de downloads ou prevenção universal de conflitos.

### 37. ARCHITECTURE.md:184-185

**Observação:** O texto diz que cada micro frontend pode executar independentemente.

**Interpretação:** As entradas próprias corroboram a execução por unidade, preservadas as dependências remotas necessárias à composição completa.

### 38. ARCHITECTURE.md:186

**Observação:** O texto diz que cada micro frontend tem servidor de desenvolvimento próprio.

**Interpretação:** Os scripts e servidores separados corroboram a afirmação, sem demonstrar deploy.

### 39. ARCHITECTURE.md:187

**Observação:** O texto afirma que os micro frontends podem ser implantados separadamente.

**Interpretação:** A promessa de deploy separado fica sem corroboração na 3.4.7; builds próprios não a comprovam.

### 40. ARCHITECTURE.md:194

**Observação:** A árvore documental descreve o package.json da raiz como scripts de conveniência.

**Interpretação:** A raiz delega comandos e não adiciona uma aplicação ou um build frontend unificado.

### 41. ARCHITECTURE.md:201

**Observação:** A árvore documental identifica App.tsx de common_simple como aplicação de demonstração.

**Interpretação:** O App próprio corrobora a fronteira de aplicação da biblioteca federada.

### 42. ARCHITECTURE.md:250

**Observação:** O texto diz que Rsbuild verifica se os componentes comuns já foram carregados, atribuindo-lhes singleton.

**Interpretação:** A 3.4.7 registra contradição: Button/Card são exposes; singleton está nas dependências compartilhadas, sem declaração equivalente para os componentes.

### 43. ARCHITECTURE.md:255

**Observação:** O texto descreve cada micro frontend como bundle separado.

**Interpretação:** Corrobora a separação dos alvos de build, sem significar exatamente um arquivo JavaScript por aplicação.

### 44. ARCHITECTURE.md:258

**Observação:** O texto anuncia carregamento de múltiplos remotes em paralelo.

**Interpretação:** A 3.4.7 mantém a capacidade sem corroboração: referências a remotes não demonstram coordenação ou execução paralela.

### 45. ARCHITECTURE.md:262

**Observação:** O texto afirma que equipes podem trabalhar em micro frontends separados.

**Interpretação:** As fronteiras e ferramentas locais corroboram a possibilidade estrutural, sem demonstrar equipes distintas.

### 46. ARCHITECTURE.md:264

**Observação:** O texto afirma que cada app pode usar versões diferentes, com cuidado.

**Interpretação:** A capacidade fica sem corroboração: os projetos usam a mesma versão declarada de React/ReactDOM e singletons; não há exemplo de versões diferentes coexistindo.

### 47. ARCHITECTURE.md:274

**Observação:** O texto alerta que falhas em um MFE podem afetar outros.

**Interpretação:** As dependências federadas e a ausência de fronteira de erro para sua carga corroboram o acoplamento entre consumidores e provedores.

### 48. QUICK_START.md:109

**Observação:** O experimento de alteração de Button prevê mudanças visíveis em users_simple e core_simple.

**Interpretação:** O uso de Button por users_simple e a composição de UserList no shell corroboram a visibilidade encadeada; não comprovam hot reload entre servidores.

### 49. README.md:3

**Observação:** O README apresenta o projeto como arquitetura mínima de micro frontends para entender Module Federation.

**Interpretação:** A caracterização é corroborada pelas três fronteiras de aplicação e pelas relações de composição.

### 50. README.md:153

**Observação:** O README afirma que componentes de common_simple são carregados antecipadamente para melhorar o desempenho.

**Interpretação:** A corroboração é parcial: imports estáticos sustentam a antecipação após o bootstrap assíncrono, sem medição de desempenho.

### 51. README.md:161

**Observação:** O README pede que os outros apps estejam em execução antes do shell.

**Interpretação:** As referências locais e imports corroboram a dependência operacional dos provedores; não demonstram orquestração automática de inicialização.

### 52. STRUCTURE.md:142-154

**Observação:** A árvore prevista após build:all inclui dist, index.html, remoteEntry.js, JavaScript assíncrono e CSS condicional para cada app.

**Interpretação:** A corroboração é parcial: há três builds e nomes de remoteEntry configurados, sem saídas versionadas que confirmem a árvore exata, sobretudo no shell sem exposes.

### 53. common_simple/README.md:55

**Observação:** O README de common_simple promete hot reload em todos os apps consumidores.

**Interpretação:** A 3.4.7 mantém a promessa sem corroboração; os scripts dev não demonstram atualização propagada entre servidores.

### 54. core_simple/README.md:9

**Observação:** O README do shell anuncia roteamento entre diferentes micro frontends.

**Interpretação:** A 3.4.7 registra contradição: somente users_simple é destino funcional remoto por rota; a Home é local e common_simple fornece componentes.

### 55. core_simple/README.md:17

**Observação:** O README do shell afirma uso dos componentes Button e Card de common_simple.

**Interpretação:** A 3.4.7 registra contradição quanto ao uso visual direto de Button: o shell só renderiza Card; o Button da rota pertence a users_simple.

### 56. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/README.md)

**Observação:** O único commit adiciona o import de Button pelo shell e o documento que anuncia seu uso, sem renderização direta no App. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** Não há versão anterior que distinga remoção, intenção futura ou import desde sempre não utilizado. A dúvida é sobre a origem da divergência; o uso no snapshot está delimitado.

### 57. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (ARCHITECTURE.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/src/App.tsx)

**Observação:** O único commit adiciona a generalização de carregamento sob demanda junto com UserList lazy e componentes comuns importados estaticamente. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** A origem da generalização permanece inconclusiva; o snapshot distingue as estratégias de carga sem dúvida sobre a composição atual.

### 58. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (ARCHITECTURE.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (common_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/rsbuild.config.ts)

**Observação:** O único commit adiciona a alegação singleton dos componentes e as configurações que os expõem, reservando singleton às dependências shared. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** O histórico não explica a origem da divergência nem mostra configuração anterior; o papel dos componentes no snapshot está claro.

### 59. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (README.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/index.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/src/index.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/src/App.tsx)

**Observação:** O único commit contém a promessa de desempenho com carga antecipada e os imports estáticos após bootstrap assíncrono, sem comparação ou medição. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** Não há base histórica para explicar a parcela não corroborada como resultado anterior; a dúvida não muda a leitura da composição no snapshot.

### 60. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (STRUCTURE.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (package.json); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (common_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (.gitignore)

**Observação:** O único commit adiciona a árvore de build anunciada, as configurações e as regras que ignoram dist/build/.rsbuild, sem versionar saídas. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** A exclusão do versionamento é compatível com a ausência das saídas, mas não confirma execução nem a árvore exata; a dúvida histórica não desfaz os builds separados configurados.

### 61. cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/README.md); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (core_simple/src/App.tsx); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (common_simple/rsbuild.config.ts); cb2083fd77ddcb4d6493af653e0ce523ba0be010 2026-02-15 (users_simple/rsbuild.config.ts)

**Observação:** O único commit contém a promessa de roteamento entre diferentes MFEs e o App com Home local e apenas UserList remoto por rota. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** O histórico não mostra uma rota removida nem esclarece a origem do plural; a composição atual tem um destino funcional remoto roteado.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (common_simple/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (core_simple/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (users_simple/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (common_simple/package.json:16, Evidência); 3.4.3 (common_simple, Marcadores/Build); 3.4.4 (fora da mineração #1, #4, #5, Observação); 3.4.5 #2, #3 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #3, #8, #9, #10, #12, #18, #28, #30 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #16; configura #20; configura #21 |
| 5 | 3.4.2 (core_simple/package.json:17, Evidência); 3.4.3 (core_simple, Marcadores/Build); 3.4.4 (mineração #1; fora da mineração #1, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #3 (Onde é servida), #2 (Artefatos); 3.4.7 #1, #6, #9, #10, #12, #18, #21, #27, #28 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #17; configura #19; configura #20 |
| 6 | 3.4.2 (users_simple/package.json:17, Evidência); 3.4.3 (users_simple, Marcadores/Build); 3.4.4 (mineração #1; fora da mineração #4, #5, Observação); 3.4.5 #1, #3 (Configuração); 3.4.6 #1 (Onde é servida), #3 (Artefatos); 3.4.7 #4, #9, #10, #12, #18, #21, #24, #27, #28, #30 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #18; configura #19; configura #21 |
| 7 | 3.4.4 (mineração #1, core_simple/src/App.tsx:9) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 8 | 3.4.4 (mineração #2, core_simple/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 9 | 3.4.4 (mineração #3, users_simple/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (fora da mineração #1, core_simple/src/App.tsx:15) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #20 |
| 11 | 3.4.4 (fora da mineração #2, core_simple/src/App.tsx:24) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #20 |
| 12 | 3.4.4 (fora da mineração #3, core_simple/src/App.tsx:57) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 13 | 3.4.4 (fora da mineração #4, users_simple/src/App.tsx:40) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #21 |
| 14 | 3.4.4 (fora da mineração #5, users_simple/src/App.tsx:49) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #21 |
| 15 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.3 (common_simple) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (core_simple) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (users_simple) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #18 |
| 20 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #16 |
| 21 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #18; liga #16 |
| 22 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #16 |
| 23 | 3.4.6 #2 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #17 |
| 24 | 3.4.6 #3 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #18 |
| 25 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #17; corrobora #19; corrobora #20 |
| 26 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #12; corrobora #19 |
| 27 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #20; corrobora #21 |
| 28 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6; corrobora #18; corrobora #19 |
| 29 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #21 |
| 30 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora core_simple/src/App.tsx:3-4; corrobora #5 |
| 31 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10; corrobora #11; corrobora #20 |
| 32 | 3.4.7 #8 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4 |
| 33 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #4; corrobora #6 |
| 34 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #21 |
| 35 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #10; contradiz #11; contradiz #13; contradiz #14 |
| 36 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #5; corrobora #6 |
| 37 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18 |
| 38 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #23; corrobora #24 |
| 39 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 40 | 3.4.7 #16 | 7 documentação | documentação | — | contexto | fraca | corrobora #15; corrobora package.json:7-14 |
| 41 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora common_simple/src/App.tsx:5-23 |
| 42 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #4; contradiz #5; contradiz #6 |
| 43 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #23; corrobora #24 |
| 44 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 45 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18 |
| 46 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 47 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #21; corrobora core_simple/src/App.tsx:46-64; corrobora users_simple/src/App.tsx:35-56 |
| 48 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #6; corrobora #19 |
| 49 | 3.4.7 #25 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #21 |
| 50 | 3.4.7 #26 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #10; corrobora em parte #13; corrobora em parte #14; corrobora em parte #8; corrobora em parte #9 |
| 51 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #5; corrobora #6; corrobora #19; corrobora #20; corrobora #21 |
| 52 | 3.4.7 #28 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora em parte #22; corrobora em parte #23; corrobora em parte #24; corrobora em parte #4; corrobora em parte #5; corrobora em parte #6 |
| 53 | 3.4.7 #29 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 54 | 3.4.7 #30 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #12; contradiz #4; contradiz #6 |
| 55 | 3.4.7 #31 | 7 documentação | documentação | — | arquitetural | fraca | contradiz core_simple/src/App.tsx:1-68; contradiz #10; contradiz #11 |
| 56 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #55 |
| 57 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #35 |
| 58 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #42; explica #4; explica #5; explica #6 |
| 59 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #50 |
| 60 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #52; explica #22; explica #23; explica #24 |
| 61 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #54; explica #12 |

## Resumo

Observações: 61. Dimensões (tecnologia: 3, configuração: 3, código: 8, estrutura: 4, composição: 3, build-deploy: 3, documentação: 31, histórico: 6). Força (forte: 7, moderada: 11, fraca: 43, ambígua: 0). Evidência (tecnológica: 7, arquitetural: 52, contexto: 2).
