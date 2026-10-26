---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
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

# 228 — Christian-Encalada/examen-microfrontend

## Leitura do repositório

As três declarações de dependência (#1–#3) levam às configurações de Module Federation (#4–#9). O host appclases declara dois remotes (#8), que expõem seus componentes (#4 e #6). O código os renderiza na mesma página (#19 e #20), formando as relações ativas host → alert-sender e host → alert-dashboard (#25 e #26). As três unidades possuem entradas e builds próprios (#21–#23, #27–#29), sustentando a leitura de host e dois remotos em um monorepositório. Deploy não foi observado, e não há versionamento independente registrado.

A comunicação direta entre remotos usa o evento academic-alert em window (#16–#18, #24). Depende de os dois componentes estarem na mesma página; os remotos têm entradas próprias, mas sozinhos não têm o outro lado do canal. O README descreve essa organização e é corroborado (#30–#37); sua lista de React e Rspack é contexto (#38).

Os quatro resultados em tipos gerados (#10–#13) não carregam remotes, e as duas ocorrências de mount na mesma declaração Footer/Footer (#14 e #15) não têm implementação nem remote conectado. São os sinais que poderiam enganar uma leitura automática. O histórico de um commit não esclarece a origem de Footer (#39), mas essa dúvida sobre o passado não muda a composição observada no snapshot. Não há decisão arquitetural aberta.

## Observações

### 1. alert-dashboard/package.json:27

**Observação:** O manifesto declara `@module-federation/enhanced` na versão `^0.8.9` em `dependencies`.

**Interpretação:** É uma declaração da tecnologia Module Federation, marcada como configurada (Yes) na 3.4.2; isoladamente é um sinal de adoção.

### 2. alert-sender/package.json:27

**Observação:** O manifesto declara `@module-federation/enhanced` na versão `^0.8.9` em `dependencies`.

**Interpretação:** É uma declaração da tecnologia Module Federation, marcada como configurada (Yes) na 3.4.2; isoladamente é um sinal de adoção.

### 3. package.json:27

**Observação:** O manifesto declara `@module-federation/enhanced` na versão `^0.8.9` em `dependencies`.

**Interpretação:** É uma declaração da tecnologia Module Federation, marcada como configurada (Yes) na 3.4.2; isoladamente é um sinal de adoção.

### 4. alert-dashboard/module-federation.config.ts:1-8

**Observação:** O objeto `mfConfig` nomeia `AlertDashboard`, define `remoteEntry.js`, expõe `./AlertDashboard` a partir de `./src/components/AlertDashboard.tsx` e compartilha `react` e `react-dom`.

**Interpretação:** Configura a federação e a superfície exposta de uma unidade; sozinho não declara um consumidor.

### 5. alert-dashboard/rspack.config.ts:5; alert-dashboard/rspack.config.ts:8; alert-dashboard/rspack.config.ts:81

**Observação:** O Rspack importa `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`, importa `mfConfig` e instancia `new ModuleFederationPlugin(mfConfig)` na lista de plugins.

**Interpretação:** Conecta a configuração de federação ao build desta unidade.

### 6. alert-sender/module-federation.config.ts:1-8

**Observação:** O objeto `mfConfig` nomeia `AlertSender`, define `remoteEntry.js`, expõe `./AlertSender` a partir de `./src/components/AlertSender.tsx` e compartilha `react` e `react-dom`.

**Interpretação:** Configura a federação e a superfície exposta de uma unidade; sozinho não declara um consumidor.

### 7. alert-sender/rspack.config.ts:5; alert-sender/rspack.config.ts:8; alert-sender/rspack.config.ts:81

**Observação:** O Rspack importa `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`, importa `mfConfig` e instancia `new ModuleFederationPlugin(mfConfig)` na lista de plugins.

**Interpretação:** Conecta a configuração de federação ao build desta unidade.

### 8. module-federation.config.ts:1-9

**Observação:** O objeto `mfConfig` nomeia `appclases`, deixa `exposes` vazio, compartilha `react` e `react-dom` e declara `AlertSender@http://localhost:3001/remoteEntry.js` e `AlertDashboard@http://localhost:3002/remoteEntry.js` em `remotes`.

**Interpretação:** Declara explicitamente o host e seus dois destinos de composição por Module Federation.

### 9. rspack.config.ts:5; rspack.config.ts:8; rspack.config.ts:81

**Observação:** O Rspack importa `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`, importa `mfConfig` e instancia `new ModuleFederationPlugin(mfConfig)` na lista de plugins.

**Interpretação:** Conecta a configuração de federação ao build desta unidade.

### 10. @mf-types/AlertDashboard/apis.d.ts:3

**Observação:** A declaração gerada usa `typeof import('AlertDashboard/AlertDashboard')` num tipo condicional.

**Interpretação:** Descreve o módulo federado para o TypeScript; a 3.4.4 registra Composição No porque não há carregamento em runtime.

### 11. @mf-types/AlertDashboard/compiled-types/components/AlertDashboard.d.ts:1

**Observação:** A declaração gerada de `AlertDashboard` usa `import("react/jsx-runtime").JSX.Element` como tipo de retorno.

**Interpretação:** É tipagem de renderização React, registrada como falso positivo e Composição No; não mostra mecanismo de MFE.

### 12. @mf-types/AlertSender/apis.d.ts:3

**Observação:** A declaração gerada usa `typeof import('AlertSender/AlertSender')` num tipo condicional.

**Interpretação:** Descreve o módulo federado para o TypeScript; a 3.4.4 registra Composição No porque não há carregamento em runtime.

### 13. @mf-types/AlertSender/compiled-types/components/AlertSender.d.ts:1

**Observação:** A declaração gerada de `AlertSender` usa `import("react/jsx-runtime").JSX.Element` como tipo de retorno.

**Interpretação:** É tipagem de renderização React, registrada como falso positivo e Composição No; não mostra mecanismo de MFE.

### 14. src/types/federation.d.ts:1-5; module-federation.config.ts:5-8

**Observação:** A linha declara a assinatura exportada de `mount(el: HTMLElement)` em `declare module "Footer/Footer"`.

**Interpretação:** A 3.4.4 registra Composição No: não há implementação, chamada nem remote Footer configurado. A declaração não participa da composição.

### 15. src/types/federation.d.ts:1-5; module-federation.config.ts:5-8

**Observação:** A ocorrência identificada como chamada é a mesma assinatura de tipo `mount(el: HTMLElement)` em `declare module "Footer/Footer"`.

**Interpretação:** A 3.4.4 registra Composição No: não há implementação, chamada nem remote Footer configurado. A declaração não participa da composição.

### 16. alert-dashboard/src/components/AlertDashboard.tsx:97-108

**Observação:** O componente registra `window.addEventListener('academic-alert', handleAlert)`, transfere `detail` para o estado e remove o ouvinte na limpeza.

**Interpretação:** É a ponta receptora da comunicação por eventos registrada como ativa na 3.4.4; a linha não nomeia a unidade emissora.

### 17. alert-sender/src/components/AlertSender.tsx:71-78

**Observação:** A função `sendAlert` cria `CustomEvent('academic-alert')` com `type`, `message` e `timestamp` em `detail`.

**Interpretação:** Prepara a mensagem do canal entre remotos registrado na 3.4.4; a construção não nomeia a unidade receptora.

### 18. alert-sender/src/components/AlertSender.tsx:72-80

**Observação:** A função dispara em `window` o evento `academic-alert` criado anteriormente.

**Interpretação:** Implementa o envio no canal de comunicação ativo entre remotos; a chamada não nomeia a unidade receptora.

### 19. src/App.tsx:3; src/App.tsx:63; module-federation.config.ts:6; alert-sender/module-federation.config.ts:2-6

**Observação:** O host importa `AlertSender/AlertSender` e renderiza `<AlertSender />` numa seção de sua página; o remote é resolvido pela configuração e exposto pela unidade `alert-sender`.

**Interpretação:** É o uso do componente federado na composição ativa. A renderização fora de rota recebe força moderada conforme a orientação da 3.5.

### 20. src/App.tsx:4; src/App.tsx:66; module-federation.config.ts:7; alert-dashboard/module-federation.config.ts:2-6

**Observação:** O host importa `AlertDashboard/AlertDashboard` e renderiza `<AlertDashboard />` numa seção de sua página; o remote é resolvido pela configuração e exposto pela unidade `alert-dashboard`.

**Interpretação:** É o uso do componente federado na composição ativa. A renderização fora de rota recebe força moderada conforme a orientação da 3.5.

### 21. ./; package.json:5; rspack.config.ts:17-19; rspack.config.ts:78-80; src/App.tsx:72-74

**Observação:** O diretório contém a aplicação React host appclases, com manifesto e comando `rspack build`, entrada `./src/index.ts`, HTML próprio e montagem React próprios.

**Interpretação:** A 3.4.3 confirma Unidade frontend Yes: há limite de aplicação e build próprio, sem que a estrutura sozinha estabeleça a composição completa.

### 22. alert-dashboard/; alert-dashboard/package.json:5; alert-dashboard/rspack.config.ts:17-19; alert-dashboard/rspack.config.ts:78-80; alert-dashboard/src/App.tsx:8-10

**Observação:** O diretório contém a aplicação React AlertDashboard, com manifesto e comando `rspack build`, entrada `./src/index.ts`, HTML próprio e montagem React próprios.

**Interpretação:** A 3.4.3 confirma Unidade frontend Yes: há limite de aplicação e build próprio, sem que a estrutura sozinha estabeleça a composição completa.

### 23. alert-sender/; alert-sender/package.json:5; alert-sender/rspack.config.ts:17-19; alert-sender/rspack.config.ts:78-80; alert-sender/src/App.tsx:8-10

**Observação:** O diretório contém a aplicação React AlertSender, com manifesto e comando `rspack build`, entrada `./src/index.ts`, HTML próprio e montagem React próprios.

**Interpretação:** A 3.4.3 confirma Unidade frontend Yes: há limite de aplicação e build próprio, sem que a estrutura sozinha estabeleça a composição completa.

### 24. alert-sender/src/components/AlertSender.tsx:72-80; alert-dashboard/src/components/AlertDashboard.tsx:97-108; src/App.tsx:62-67

**Observação:** AlertSender emite `academic-alert` em `window`; AlertDashboard escuta o mesmo evento e grava o payload no estado. Ambos são renderizados na página do host.

**Interpretação:** A relação 1 da 3.4.5 liga diretamente as duas unidades por comunicação events, ativa no snapshot e no sentido sender → dashboard.

### 25. src/App.tsx:3; src/App.tsx:63; module-federation.config.ts:6; alert-sender/module-federation.config.ts:2-6

**Observação:** O host declara o remote `AlertSender`, importa `AlertSender/AlertSender` e o renderiza; a unidade `alert-sender` define esse nome e expõe o componente correspondente.

**Interpretação:** A relação 2 da 3.4.5 liga o host à unidade remota por Module Federation e é ativa no snapshot.

### 26. src/App.tsx:4; src/App.tsx:66; module-federation.config.ts:7; alert-dashboard/module-federation.config.ts:2-6

**Observação:** O host declara o remote `AlertDashboard`, importa `AlertDashboard/AlertDashboard` e o renderiza; a unidade `alert-dashboard` define esse nome e expõe o componente correspondente.

**Interpretação:** A relação 3 da 3.4.5 liga o host à unidade remota por Module Federation e é ativa no snapshot.

### 27. package.json:3-8; rspack.config.ts:15-92

**Observação:** A aplicação `.` tem comando de build e configuração Rspack próprios. A 3.4.6 registra build separado, deploy não observado e versionamento independente No; o endereço servido é de desenvolvimento.

**Interpretação:** Confirma separação de build da unidade. Não comprova publicação ou versionamento independente.

### 28. alert-dashboard/package.json:3-8; alert-dashboard/rspack.config.ts:15-92; alert-dashboard/module-federation.config.ts:2-6

**Observação:** A aplicação `alert-dashboard` tem comando de build e configuração Rspack próprios, com geração de `remoteEntry.js` declarada no config de federação. A 3.4.6 registra build separado, deploy não observado e versionamento independente No; o endereço servido é de desenvolvimento.

**Interpretação:** Confirma separação de build da unidade. Não comprova publicação ou versionamento independente.

### 29. alert-sender/package.json:3-8; alert-sender/rspack.config.ts:15-92; alert-sender/module-federation.config.ts:2-6

**Observação:** A aplicação `alert-sender` tem comando de build e configuração Rspack próprios, com geração de `remoteEntry.js` declarada no config de federação. A 3.4.6 registra build separado, deploy não observado e versionamento independente No; o endereço servido é de desenvolvimento.

**Interpretação:** Confirma separação de build da unidade. Não comprova publicação ou versionamento independente.

### 30. README.md:3

**Observação:** O README apresenta o sistema como arquitetura de micro-frontends com Module Federation.

**Interpretação:** A afirmação situa a organização do conjunto e é corroborada pelas unidades e relações federadas.

### 31. README.md:7

**Observação:** O README descreve appclases como host contêiner que carrega os micro-frontends.

**Interpretação:** A descrição do papel do host é corroborada pela unidade e pelas duas relações host → remote.

### 32. README.md:9

**Observação:** O README apresenta AlertSender como micro-frontend que envia alertas acadêmicos.

**Interpretação:** A afirmação sobre a unidade é corroborada pelo diretório frontend, sua exposição e consumo pelo host.

### 33. README.md:11

**Observação:** O README apresenta AlertDashboard como micro-frontend que mostra alertas ativos.

**Interpretação:** A afirmação sobre a unidade é corroborada pelo diretório frontend, sua exposição e consumo pelo host.

### 34. README.md:18

**Observação:** O README afirma comunicação desacoplada por CustomEvent do DOM.

**Interpretação:** A 3.4.7 considera a afirmação corroborada pelo envio, recepção e relação de comunicação entre os dois remotos.

### 35. README.md:19

**Observação:** O README afirma que cada micro-frontend funciona de forma independente.

**Interpretação:** A 3.4.7 considera a afirmação corroborada pelas entradas próprias dos remotos. Isso não elimina a dependência do par para trocar alertas: sozinho o dashboard fica no estado vazio.

### 36. README.md:47

**Observação:** O README orienta iniciar os três serviços em terminais separados para executar o sistema completo.

**Interpretação:** A afirmação é corroborada pelos três builds e servidores próprios e pelas URLs dos remotes, sem implicar deploy em produção.

### 37. README.md:85-86

**Observação:** O README diz que AlertSender emite eventos academic-alert com detalhes e AlertDashboard os escuta e atualiza seu estado.

**Interpretação:** A afirmação descreve as duas pontas da relação de comunicação corroborada na 3.4.7.

### 38. README.md:91-93

**Observação:** O README lista React 19 e Rspack como tecnologias do projeto.

**Interpretação:** A 3.4.7 corrobora a lista com os manifests e builds das três aplicações. A lista isolada não mostra um mecanismo de MFE nem situa os limites das unidades.

### 39. 9456a399b086d78c65d167e0d08db5d2b8d31bb8 2026-02-03 (src/types/federation.d.ts)

**Observação:** A 3.4.8 registra um único commit até o snapshot; nele a declaração Footer/Footer já aparece junto com os outros 41 arquivos. Não há versão anterior nem remoção de Footer no histórico observado.

**Interpretação:** O resultado inconclusivo não distingue resto copiado de remote planejado e nunca conectado. A dúvida é sobre a origem passada; a ausência de implementação e conexão no snapshot está clara nas observações #14 e #15.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (alert-dashboard/package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4; declara #5 |
| 2 | 3.4.2 (alert-sender/package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6; declara #7 |
| 3 | 3.4.2 (package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8; declara #9 |
| 4 | 3.4.2 (alert-dashboard/package.json:27, Evidência); 3.4.3 (alert-dashboard, Marcadores); 3.4.4 (alert-dashboard/src/components/AlertDashboard.tsx:103; src/App.tsx:66, Observação); 3.4.5 #3 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #20; configura #26 |
| 5 | 3.4.2 (alert-dashboard/package.json:27, Evidência); 3.4.3 (alert-dashboard, Marcadores e Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22 |
| 6 | 3.4.2 (alert-sender/package.json:27, Evidência); 3.4.3 (alert-sender, Marcadores); 3.4.4 (alert-sender/src/components/AlertSender.tsx:72; src/App.tsx:63, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #3 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #23; configura #19; configura #25 |
| 7 | 3.4.2 (alert-sender/package.json:27, Evidência); 3.4.3 (alert-sender, Marcadores e Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #23 |
| 8 | 3.4.2 (package.json:27, Evidência); 3.4.3 (., Marcadores); 3.4.4 (src/types/federation.d.ts:2, Observação das duas linhas; src/App.tsx:63 e :66, Observação); 3.4.5 #2, #3 (Configuração); 3.4.7 #1, #2, #7 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #21; configura #19; configura #20; configura #25; configura #26 |
| 9 | 3.4.2 (package.json:27, Evidência); 3.4.3 (., Marcadores e Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #21 |
| 10 | 3.4.4 (@mf-types/AlertDashboard/apis.d.ts:3) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 11 | 3.4.4 (@mf-types/AlertDashboard/compiled-types/components/AlertDashboard.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 12 | 3.4.4 (@mf-types/AlertSender/apis.d.ts:3) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 13 | 3.4.4 (@mf-types/AlertSender/compiled-types/components/AlertSender.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (src/types/federation.d.ts:2, src-mount-export) | 3 código | código-fonte | — | contexto | fraca | — |
| 15 | 3.4.4 (src/types/federation.d.ts:2, src-mount-call) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (alert-dashboard/src/components/AlertDashboard.tsx:103) | 3 código | código-fonte | events | arquitetural | moderada | implementa #24 |
| 17 | 3.4.4 (alert-sender/src/components/AlertSender.tsx:72) | 3 código | código-fonte | events | arquitetural | moderada | implementa #24 |
| 18 | 3.4.4 (alert-sender/src/components/AlertSender.tsx:80) | 3 código | código-fonte | events | arquitetural | moderada | implementa #24 |
| 19 | 3.4.4 (src/App.tsx:63, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #25 |
| 20 | 3.4.4 (src/App.tsx:66, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #26 |
| 21 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (alert-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (alert-sender) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.5 #1 | 5 composição | código-fonte | events | arquitetural | forte | liga #23; liga #22 |
| 25 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #21; liga #23 |
| 26 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #21; liga #22 |
| 27 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #21 |
| 28 | 3.4.6 #2 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #22 |
| 29 | 3.4.6 #3 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #23 |
| 30 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #21; corrobora #22; corrobora #23; corrobora #25; corrobora #26 |
| 31 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #19; corrobora #20; corrobora #25; corrobora #26 |
| 32 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora #6; corrobora #25 |
| 33 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #4; corrobora #26 |
| 34 | 3.4.7 #5 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18; corrobora #24 |
| 35 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #23; corrobora alert-sender/src/App.tsx:4-10; corrobora alert-dashboard/src/App.tsx:4-10; corrobora alert-dashboard/src/components/AlertDashboard.tsx:123-125 |
| 36 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27; corrobora #28; corrobora #29; corrobora #8; corrobora package.json:8; corrobora alert-sender/package.json:8; corrobora alert-dashboard/package.json:8 |
| 37 | 3.4.7 #8 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #24; corrobora #16; corrobora #17; corrobora #18 |
| 38 | 3.4.7 #9 | 7 documentação | documentação | — | contexto | fraca | corrobora #27; corrobora #28; corrobora #29; corrobora package.json:28-29; corrobora alert-sender/package.json:28-29; corrobora alert-dashboard/package.json:28-29 |
| 39 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #14; explica #15 |

## Resumo

Observações: 39. Dimensões (tecnologia: 3, configuração: 6, código: 11, estrutura: 3, composição: 3, build-deploy: 3, documentação: 9, histórico: 1). Força (forte: 4, moderada: 16, fraca: 19, ambígua: 0). Evidência (tecnológica: 10, arquitetural: 23, contexto: 6).
