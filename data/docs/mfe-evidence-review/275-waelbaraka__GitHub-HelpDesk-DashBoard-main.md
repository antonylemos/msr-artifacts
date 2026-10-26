---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
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

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Leitura do repositório

A cadeia de evidências combina duas declarações do plugin (#1–#2), configurações federadas (#3–#4), carga e rota da página remota (#5–#6) e uma relação ativa Frontend → whatsapp-module-frontend (#10). As duas aplicações React/Vite têm entradas e builds próprios (#8–#9, #11–#12). O host resolve remote_app e monta WhatsAppChannelSettingsPage em `/integrations/whatsapp`, passando cliente de API e hook por props. Essa cadeia sustenta a composição entre duas unidades frontend no snapshot; o backend Express é contexto (#7).

As configurações também declaram federação de retorno ao host (#3–#4), mas a revisão de composição só registra uso no primeiro sentido (#10). Os comentários sobre o retorno e a exposição de API/store têm corroboração parcial (#15, #17); Button aceita props sem consumidor observado (#32). A documentação contém três afirmações contraditas: o nome whatsapp_app (#13), o carregamento por metadados em outra rota (#26) e o uso do hook para obter o usuário (#28). Elas não substituem a ligação efetivamente registrada. A lista shared tem alcance maior que o uso observado e não prova ausência de duplicação (#18).

Build separado está confirmado; publicação em produção não foi observada (#11–#12). A afirmação de publicação em CDN fica sem corroboração (#22). As cinco perguntas históricas permanecem inconclusivas porque os artefatos coexistem no único commit disponível (#34–#38); dizem respeito ao passado e não deixam ambígua a composição atual. Nenhuma execução de build ou runtime é inferida desses artefatos.

## Observações

### 1. Frontend/package.json:53

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em devDependencies, na versão `^1.4.1`.

**Interpretação:** É um sinal tecnológico isolado; a revisão de dependências registra configuração no próprio pacote.

### 2. whatsapp-module-frontend/package.json:28

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em devDependencies, na versão `^1.4.1`.

**Interpretação:** É um sinal tecnológico isolado; a configuração do remoto tem observação própria.

### 3. Frontend/vite.config.js:4; Frontend/vite.config.js:11-35

**Observação:** O plugin federation configura `platform_host`, o remote `remote_app` em `http://localhost:5001/assets/remoteEntry.js`, as exposições `./apiClient` e `./authStore` e oito bibliotecas em shared.

**Interpretação:** A configuração liga explicitamente o host a outra unidade por Module Federation. As exposições do host também permitem declarar o sentido inverso, sem demonstrar seu consumo.

### 4. whatsapp-module-frontend/vite.config.js:4; whatsapp-module-frontend/vite.config.js:11-50

**Observação:** O plugin federation configura `remote_app`, gera `remoteEntry.js`, expõe `./Button` e `./WhatsAppChannelSettingsPage`, declara `platform_host` em `http://localhost:5173/assets/remoteEntry.js` e lista oito bibliotecas compartilhadas.

**Interpretação:** O bloco declara ligação entre as duas unidades, inclusive o retorno ao host. A força da declaração não implica consumo nesse sentido: a única relação ativa registrada é host → remoto.

### 5. Frontend/src/components/layouts/DashboardLayout.jsx:144; Frontend/vite.config.js:20; whatsapp-module-frontend/vite.config.js:13-19

**Observação:** `React.lazy` importa `remote_app/WhatsAppChannelSettingsPage`; o alias e o módulo exposto correspondem à unidade whatsapp-module-frontend.

**Interpretação:** A chamada nomeia diretamente a unidade de destino e carrega sua página por federação; a revisão de código registra composição Yes.

### 6. Frontend/src/components/layouts/DashboardLayout.jsx:144; Frontend/src/components/layouts/DashboardLayout.jsx:356-357; Frontend/src/components/layouts/DashboardLayout.jsx:385; whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:196

**Observação:** A rota `/integrations/whatsapp`, em Routes/Suspense, renderiza a página importada do remoto, passando `apiClient`, `useAuthStoreHook` e `user`. A página recebe os dois primeiros.

**Interpretação:** A rota liga um caminho do host ao componente remoto e materializa a composição. Os props constituem dependências injetadas pelo host.

### 7. Backend/; Backend/package.json:6; Backend/index.js:7

**Observação:** O manifesto aponta `index.js` como main e a entrada importa Express. A revisão estrutural registra Unidade frontend No.

**Interpretação:** É um servidor de backend, contexto do produto e não um limite de unidade frontend.

### 8. Frontend/; Frontend/index.html:11; Frontend/src/main.jsx:26-30; Frontend/package.json:8; Frontend/vite.config.js:7-61

**Observação:** O diretório tem manifesto próprio, entrada HTML que chama main.jsx, montagem React e script `vite build` com configuração própria. A revisão registra Unidade frontend Yes.

**Interpretação:** Esses artefatos confirmam o limite do host como unidade frontend com entrada e build próprios.

### 9. whatsapp-module-frontend/; whatsapp-module-frontend/index.html:11; whatsapp-module-frontend/src/main.jsx:6-8; whatsapp-module-frontend/package.json:8; whatsapp-module-frontend/vite.config.js:7-61

**Observação:** O diretório tem manifesto próprio, entrada HTML/React e build Vite próprio, em modo watch com preview. A revisão registra Unidade frontend Yes.

**Interpretação:** É uma segunda unidade frontend, com entrada e build delimitados separadamente do host.

### 10. Frontend/src/components/layouts/DashboardLayout.jsx:144; Frontend/src/components/layouts/DashboardLayout.jsx:385; Frontend/vite.config.js:20; whatsapp-module-frontend/vite.config.js:13-14; whatsapp-module-frontend/vite.config.js:19

**Observação:** O host resolve `remote_app` pela URL de remoteEntry.js, importa a página exposta pelo remoto e a monta na rota `/integrations/whatsapp`. A relação Frontend → whatsapp-module-frontend é No snapshot Yes e Ativa Yes.

**Interpretação:** A correspondência entre destino, exposição e rota estabelece a relação ativa entre as duas unidades por Module Federation.

### 11. Frontend/package.json:8; Frontend/vite.config.js:7-61; Frontend/vite.config.js:38

**Observação:** O host tem script `vite build` e configuração Vite próprios; a tabela registra build separado, deploy não observado e versionamento No. O endereço local é de desenvolvimento.

**Interpretação:** O build confirma o limite da unidade, mas não demonstra publicação independente em produção.

### 12. whatsapp-module-frontend/package.json:8; whatsapp-module-frontend/vite.config.js:7-61; Frontend/vite.config.js:20

**Observação:** O script combina `vite build --watch` e `vite preview --port 5001 --strictPort`; a configuração gera remoteEntry.js e habilita CORS no servidor de desenvolvimento. A tabela registra build separado, deploy não observado e versionamento No.

**Interpretação:** O remoto tem build próprio e é servido localmente para o host. Isso confirma seu limite, sem comprovar deploy em CDN ou outro ambiente de produção.

### 13. Frontend/src/modules/moduleLoader.js:9

**Observação:** O comentário afirma que a chave `whatsapp_app` corresponde ao nome federado do remoto.

**Interpretação:** A afirmação sobre o identificador da unidade é contradita: as configurações usam `remote_app`, e a relação ativa emprega esse nome.

### 14. Frontend/vite.config.js:12

**Observação:** O comentário identifica a aplicação como host.

**Interpretação:** A afirmação situa a unidade no papel de host e é corroborada pela configuração e pela relação ativa.

### 15. Frontend/vite.config.js:12

**Observação:** O comentário afirma que o remoto usará o nome do host.

**Interpretação:** A corroboração é parcial: o retorno é declarado na configuração do remoto, mas os imports estão comentados; não há consumo efetivo do host pelo remoto.

### 16. Frontend/vite.config.js:18-19

**Observação:** O comentário identifica `remote_app` como alias do projeto do botão e diz que deve coincidir com o name do remoto.

**Interpretação:** A revisão registra corroborada: os nomes coincidem e há exposição do botão. A relação ativa consome a página, não o botão.

### 17. Frontend/vite.config.js:23; Frontend/vite.config.js:26-27

**Observação:** Os comentários descrevem a exposição de módulos para remotos, incluindo cliente de API e store Zustand.

**Interpretação:** A corroboração é parcial: as exposições existem, mas o remoto recebe API e hook por props, sem import federado desses módulos.

### 18. Frontend/vite.config.js:30

**Observação:** O comentário orienta listar bibliotecas comuns em shared para evitar carregá-las duas vezes.

**Interpretação:** A corroboração é parcial: as duas configurações têm a lista, mas a revisão só confirma uso de quatro bibliotecas nas duas unidades e não verifica ausência de duplicação em runtime.

### 19. Readme.md:34

**Observação:** O README descreve o módulo como um remoto de Module Federation.

**Interpretação:** A afirmação situa o papel do remoto e é corroborada pelo limite da unidade, pela configuração e pela relação host → remoto.

### 20. Readme.md:36

**Observação:** O README descreve uma aplicação Vite/React separada que expõe componentes de UI, principalmente páginas de configuração.

**Interpretação:** A afirmação sobre o limite e a exposição da unidade é corroborada; a configuração expõe botão e página, e o host usa a página.

### 21. Readme.md:36

**Observação:** O README diz que a aplicação roda em servidor de desenvolvimento próprio e tem build independente.

**Interpretação:** A afirmação é corroborada pela entrada, pelo servidor local e pelo build separado do remoto. Rodar sozinho não significa que sua entrada local monte a página exposta.

### 22. Readme.md:36

**Observação:** O README afirma que, em produção, remoteEntry.js e chunks são publicados em CDN ou servidos pela plataforma.

**Interpretação:** É uma afirmação sobre publicação da unidade sem corroboração no snapshot. O deploy não observado não confirma nem contradiz essa publicação.

### 23. Readme.md:44

**Observação:** O README diz que o host carrega dinamicamente componentes de UI do remoto por Module Federation.

**Interpretação:** A afirmação é corroborada pela relação ativa e pelas duas construções de código; o snapshot carrega uma página. A divergência do nome é tratada em #13.

### 24. Readme.md:44

**Observação:** O README atribui a ligação às seções remotes do host e exposes do remoto nos arquivos vite.config.js.

**Interpretação:** A afirmação é corroborada pelas configurações que resolvem e expõem a página consumida.

### 25. Readme.md:46

**Observação:** O README afirma que os componentes frontend remotos chamam os endpoints do backend central da plataforma para os canais WhatsApp.

**Interpretação:** A afirmação é corroborada pelo uso do cliente recebido do host e pelas rotas HTTP. Ela descreve dependência de backend, sem estabelecer mecanismo de composição frontend.

### 26. Readme.md:53

**Observação:** O README diz que o host carrega a página pelo caminho uiComponents.settings.path da tabela Module, exemplificando `/settings/integrations/whatsapp`.

**Interpretação:** A afirmação é contradita pela rota fixa `/integrations/whatsapp`. As rotas dinâmicas leem uiComponents.page e renderizam GenericPage, sem usar o carregamento remoto documentado.

### 27. Readme.md:83

**Observação:** O README descreve axios vindo do host para chamadas de API, pré-configurado com baseURL e interceptadores.

**Interpretação:** A afirmação é corroborada pelo objeto de API do host, construído sobre axios e passado à página por props. Não demonstra consumo federado do pacote axios pelo remoto.

### 28. Readme.md:84

**Observação:** O README diz que useAuthStore vem do host para obter o usuário atual, principalmente organizationId.

**Interpretação:** A afirmação é contradita: o host passa o hook, mas a página só o desestrutura e não o chama. A passagem do prop não comprova o uso documentado.

### 29. Readme.md:85

**Observação:** O README descreve react-hot-toast vindo do host para notificações de sucesso e erro.

**Interpretação:** A revisão registra a afirmação corroborada pelo Toaster do host, pelo import no remoto e pela configuração shared. Ela descreve compartilhamento entre as unidades, sem provar sozinha o comportamento em execução.

### 30. Readme.md:86

**Observação:** O README afirma que o remoto tem dependência própria de @heroicons/react para ícones.

**Interpretação:** A afirmação é corroborada pelo manifesto e pelos imports de ícones. Isoladamente é contexto de uma biblioteca de UI, sem mecanismo de MFE ou ligação entre unidades.

### 31. whatsapp-module-frontend/src/components/Button.jsx:5

**Observação:** O comentário anuncia que não há mais imports de platform_host.

**Interpretação:** A afirmação é corroborada pelos imports comentados logo abaixo. Descreve ausência de consumo federado de retorno, sem demonstrar que tenha existido uma versão anterior ativa.

### 32. whatsapp-module-frontend/src/components/Button.jsx:9

**Observação:** O comentário diz que o componente agora aceita props do host.

**Interpretação:** A corroboração é parcial: Button aceita API, hook e usuário, mas não é consumido pelo host no snapshot. O contrato aceito não demonstra uma ligação ativa desse botão.

### 33. whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:6-7

**Observação:** Os comentários descrevem módulos compartilhados recebidos do host como props, nomeando apiClient e useAuthStoreHook.

**Interpretação:** A afirmação é corroborada pela rota e pela assinatura da página. A passagem é por props; somente o cliente de API é usado, conforme a revisão final.

### 34. ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/src/modules/moduleLoader.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/vite.config.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (whatsapp-module-frontend/vite.config.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Readme.md)

**Observação:** O loader placeholder, o nome whatsapp_app do comentário e as configurações com remote_app já coexistem no commit inicial. A revisão registra resultado inconclusivo para a hipótese de estágio anterior.

**Interpretação:** A inatividade atual e o nome usado na composição estão estabelecidos; a dúvida é sobre abandono ou origem anterior à importação, sem alterar a leitura do snapshot.

### 35. ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/src/components/layouts/DashboardLayout.jsx); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Backend/prisma/seed.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Readme.md)

**Observação:** Layout, semente e README foram adicionados no mesmo commit, com rota fixa e descrição de carga por metadados já divergentes. O ponto histórico é inconclusivo.

**Interpretação:** Não se pode afirmar que o mecanismo documentado funcionou antes ou foi substituído. A divergência atual é clara e a dúvida restante é apenas histórica.

### 36. ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/vite.config.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (whatsapp-module-frontend/vite.config.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (whatsapp-module-frontend/src/components/Button.jsx); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/src/components/layouts/DashboardLayout.jsx)

**Observação:** Exposições do host, declaração inversa, imports comentados no Button e passagem de props à página já estão no commit inicial. O ponto histórico é inconclusivo.

**Interpretação:** Não há versão comparável que comprove migração de imports federados para props ou uso anterior do botão. Isso não torna ambígua a relação ativa observada hoje.

### 37. ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/vite.config.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (whatsapp-module-frontend/vite.config.js); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (whatsapp-module-frontend/src/App.jsx)

**Observação:** As duas listas shared e o import de roteamento comentado no App do remoto aparecem desde o único commit. O histórico não esclarece uso anterior das quatro bibliotecas sem import ativo no remoto.

**Interpretação:** A pergunta sobre remoção ou listagem preventiva permanece inconclusiva, mas não muda o alcance atual das configurações nem comprova compartilhamento em runtime.

### 38. ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Readme.md); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx); ccb8398a4d53178974be0fc2b7483cba5d769013 2025-06-22 (Frontend/src/components/layouts/DashboardLayout.jsx)

**Observação:** README, página e layout aparecem no mesmo commit, já com a afirmação de uso da store e o hook apenas recebido. O ponto histórico é inconclusivo.

**Interpretação:** Não se pode atribuir a contradição atual a uma remoção, planejamento ou cópia. A ausência atual de chamada do hook está estabelecida; a dúvida é sobre o passado.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (Frontend/package.json:53) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #3 |
| 2 | 3.4.2 (whatsapp-module-frontend/package.json:28) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 3 | 3.4.2 (Frontend/package.json:53, Evidência); 3.4.3 (Frontend, Marcadores e Build); 3.4.4 (DashboardLayout.jsx:144, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #1, #2, #4, #5, #6, #12, #17 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #5; configura #8; configura #10 |
| 4 | 3.4.2 (whatsapp-module-frontend/package.json:28, Evidência); 3.4.3 (whatsapp-module-frontend, Marcadores e Build); 3.4.4 (DashboardLayout.jsx:144, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #1, #3, #4, #6, #7, #8, #12, #17 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #9; configura #10 |
| 5 | 3.4.4 (Construções da mineração, DashboardLayout.jsx:144) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #10 |
| 6 | 3.4.4 (Construções fora da mineração, DashboardLayout.jsx:385) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #10 |
| 7 | 3.4.3 (Backend) | 4 estrutura | diretório | — | contexto | fraca | — |
| 8 | 3.4.3 (Frontend) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 9 | 3.4.3 (whatsapp-module-frontend) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 10 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #8; liga #9 |
| 11 | 3.4.6 #1 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #8 |
| 12 | 3.4.6 #2 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #9 |
| 13 | 3.4.7 #1 | 7 documentação | comentário | module-federation | arquitetural | fraca | contradiz #3; contradiz #4; contradiz #10 |
| 14 | 3.4.7 #2 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #3; corrobora #10 |
| 15 | 3.4.7 #3 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora em parte #4; corrobora em parte whatsapp-module-frontend/src/components/Button.jsx:5-7 |
| 16 | 3.4.7 #4 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #3; corrobora #4; corrobora #10 |
| 17 | 3.4.7 #5 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora em parte #3; corrobora em parte whatsapp-module-frontend/src/components/Button.jsx:5-7 |
| 18 | 3.4.7 #6 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora em parte #3; corrobora em parte #4 |
| 19 | 3.4.7 #7 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2; corrobora #4; corrobora #9; corrobora #10 |
| 20 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #9 |
| 21 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #12; corrobora whatsapp-module-frontend/package.json:7 |
| 22 | 3.4.7 #10 | 7 documentação | documentação | module-federation | arquitetural | fraca | — |
| 23 | 3.4.7 #11 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #5; corrobora #6; corrobora #10 |
| 24 | 3.4.7 #12 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3; corrobora #4 |
| 25 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | corrobora whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:215; corrobora whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:246; corrobora Frontend/src/api/api.js:135-136; corrobora Backend/index.js:115 |
| 26 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #6; contradiz Frontend/src/components/layouts/DashboardLayout.jsx:395-414 |
| 27 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6; corrobora Frontend/src/api/api.js:7-8; corrobora Frontend/src/api/api.js:15; corrobora Frontend/src/api/api.js:30; corrobora whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:196-215 |
| 28 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #6; contradiz whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:196 |
| 29 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #4; corrobora Frontend/src/main.jsx:7; corrobora Frontend/src/main.jsx:31; corrobora whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:4 |
| 30 | 3.4.7 #18 | 7 documentação | documentação | — | contexto | fraca | corrobora whatsapp-module-frontend/package.json:13; corrobora whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:10-13 |
| 31 | 3.4.7 #19 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora whatsapp-module-frontend/src/components/Button.jsx:6-7 |
| 32 | 3.4.7 #20 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte whatsapp-module-frontend/src/components/Button.jsx:10 |
| 33 | 3.4.7 #21 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #6; corrobora whatsapp-module-frontend/src/pages/WhatsAppChannelSettingsPage.jsx:196 |
| 34 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #3; explica #4; explica #13 |
| 35 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #6; explica #26 |
| 36 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #3; explica #4; explica #6; explica #15; explica #17; explica #31; explica #32 |
| 37 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #3; explica #4; explica #18 |
| 38 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #6; explica #28 |

## Resumo

Observações: 38. Dimensões (tecnologia: 2, configuração: 2, código: 2, estrutura: 3, composição: 1, build-deploy: 2, documentação: 21, histórico: 5). Força (forte: 5, moderada: 4, fraca: 29, ambígua: 0). Evidência (tecnológica: 3, arquitetural: 32, contexto: 3).
