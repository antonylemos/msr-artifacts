---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Leitura do repositório

As duas unidades são o host HTML/JS estático `frontend` (#23) e o widget React `frontend-hermes`, com entrada e build próprios (#24). A cadeia observada parte do invólucro e registro do custom element (#1–#3), passa pela tag e pelo carregamento do bundle no dashboard (#21–#22) e fecha na relação ativa host → widget (#25). A segunda relação ativa é a comunicação por eventos globais: o host emite `toggle-hermes` e `close-hermes`, recebidos pelo widget (#11–#14, #26). Os trechos individuais de eventos implementam o contrato; é a relação consolidada que situa os dois lados.

O build do widget é separado e sua publicação é conjunta com o host no FastAPI (#27–#28). O compose não compila Hermes, e o caminho `/hermes/` depende do `dist` disponível. O script ngrok tenta construir o widget antes de expor o servidor. Essas evidências não comprovam execução autônoma funcional, sentido em que a afirmação de independência permanece sem corroboração (#31). A entrada HTML de desenvolvimento aponta para `main.tsx` ausente, divergência já presente na primeira ocorrência histórica consultada (#47).

Os scripts de CDN, a reexecução de scripts dos fragmentos e os eventos internos `argos:navaway` são os 13 falsos positivos da revisão de código (#4–#10, #15–#20). Não acrescentam unidades ou relações. As afirmações sobre Flask estão contraditas pelo servidor atual (#32, #44), e o histórico não encerra a origem desses textos (#48). O instalador Windows segue sem corroboração (#38), embora sua exclusão do inventário tenha explicação no snapshot (#49). Nenhuma dessas limitações deixa o destino da composição ambíguo.

A 3.4.2 não contém dependências a extrair. Não há observações de configuração elegíveis pelo passo 2: `vite.config.ts` configura biblioteca IIFE, saída, React e CSS, mas não declara builder/plugin de federação, host/remote, módulo exposto, compartilhamento federado, URL de remote, import map ou registro de aplicação. `name: HermesWidget` é o nome da biblioteca, não de host/remote. O compose configura o servidor compartilhado. Seus trechos pertinentes permanecem em estrutura, código e build/deploy; os comentários declarativos entram por suas linhas da 3.4.7. Não se acrescentaram dependências de React/Vite ausentes da tabela 3.4.2.

Limite operacional: `docs/mfe-review-pipeline/regras-comuns.md` não estava disponível neste checkout durante a extração. A revisão segue a `INSTRUCTIONS.md` e o `_template.md` disponíveis, as sete revisões finais e a orientação explícita de entregar `draft`. A conferência de trechos foi feita somente no snapshot de aquisição, sem nova mineração ou consulta aos clones.

## Observações

### 1. frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:10-28; frontend-hermes/src/hermes-widget.tsx:37-46

**Observação:** A classe HermesWidget estende HTMLElement, observa token, api-base e modulo e monta App com createRoot no connectedCallback.

**Interpretação:** Implementa o invólucro Web Component da unidade React; o mecanismo de encapsulamento, isolado, não identifica um consumidor.

### 2. frontend-hermes/src/hermes-widget.tsx:16; frontend-hermes/src/hermes-widget.tsx:18-28

**Observação:** O connectedCallback chama attachShadow com mode open, acrescenta um style com widgetCss e cria o ponto de montagem React.

**Interpretação:** O Shadow DOM delimita o encapsulamento do widget, sem ligar sozinho duas unidades.

### 3. frontend-hermes/src/hermes-widget.tsx:58; frontend-hermes/src/hermes-widget.tsx:57

**Observação:** customElements.define registra hermes-widget como HermesWidget, após verificar customElements.get.

**Interpretação:** Disponibiliza a tag pública do widget. O registro do fornecedor é um mecanismo de composição, mas não nomeia outra unidade consumidora.

**Nota:** Mantém-se a força moderada, afastando a orientação forte para registros que nomeiam o destino: neste trecho, `customElements.define` associa a tag `hermes-widget` à classe local `HermesWidget` no fornecedor. Isoladamente, confirma o mecanismo disponibilizado por uma unidade, sem ligar diretamente duas unidades relativamente independentes. O consumo pelo host e a relação entre unidades estão nas observações #21 e #25 e não aumentam a força deste registro isolado.

### 4. frontend/js/router.js:54; frontend/js/router.js:45-57; frontend/js/router.js:181-182

**Observação:** loadComponent busca components/<arquivo>, insere o fragmento via innerHTML e recria seus scripts inline; os componentes solicitados são topbar.html e sidebar.html.

**Interpretação:** É montagem interna do layout de frontend, sem carregar o bundle de outra unidade.

### 5. frontend/js/router.js:93; frontend/js/router.js:13-29; frontend/js/router.js:64-96

**Observação:** loadView busca uma vista em views/, insere seu HTML e recria scripts inline; MODULES lista os arquivos das vistas.

**Interpretação:** A navegação entre vistas permanece dentro de frontend e não estabelece composição entre unidades.

### 6. frontend/views/mapa_transmilenio.html:604; frontend/views/mapa_transmilenio.html:592-608

**Observação:** ensureLeaflet cria um script para leaflet.js no CDN unpkg quando a variável L ainda não existe.

**Interpretação:** A carga dinâmica atende a uma biblioteca de mapas, sem representar outra unidade frontend.

### 7. frontend/dashboard.html:14

**Observação:** O dashboard inclui leaflet.js do CDN unpkg por uma tag script.

**Interpretação:** A dependência de biblioteca externa é um falso positivo para composição de unidades.

### 8. frontend/dashboard.html:15

**Observação:** O dashboard inclui o script do CDN do Tailwind.

**Interpretação:** A carga de estilos por biblioteca externa não identifica unidade frontend adicional.

### 9. frontend/index.html:23

**Observação:** A página inicial inclui o script do CDN do Tailwind.

**Interpretação:** A inclusão é infraestrutura visual da mesma unidade, sem composição entre aplicações.

### 10. frontend/login.html:12

**Observação:** A página de login inclui o script do CDN do Tailwind.

**Interpretação:** A inclusão é uma biblioteca da página, sem fronteira de outra unidade.

### 11. frontend-hermes/src/App.tsx:35; frontend-hermes/src/App.tsx:25-42

**Observação:** App registra em window um listener de toggle-hermes que alterna a abertura do painel e remove o listener no cleanup.

**Interpretação:** Implementa a recepção do evento de comunicação do widget; a assinatura do evento, sozinha, não identifica a unidade emissora.

### 12. frontend-hermes/src/App.tsx:36; frontend-hermes/src/App.tsx:30-40

**Observação:** App registra em window um listener de close-hermes que solicita o fechamento do painel e remove o listener no cleanup.

**Interpretação:** Implementa a recepção do segundo evento do contrato; o listener não nomeia a unidade emissora.

### 13. frontend/components/topbar.html:26; frontend/components/topbar.html:24-30

**Observação:** O botão Hermes IA dispara em window um CustomEvent chamado toggle-hermes.

**Interpretação:** Implementa o envio do evento de abertura e fechamento; o disparo global não nomeia diretamente uma unidade destinatária.

### 14. frontend/dashboard.html:421; frontend/dashboard.html:408-422

**Observação:** toggleProfileDrawer dispara close-hermes em window ao abrir o drawer de perfil.

**Interpretação:** Implementa o envio do evento de fechamento ao contrato global; o disparo isolado não declara o destinatário.

### 15. frontend/js/router.js:71; frontend/js/router.js:64-70

**Observação:** Antes de substituir o DOM, o roteador emite argos:navaway em document para as vistas limparem timers e listeners.

**Interpretação:** O evento coordena o ciclo de vida interno de frontend, sem comunicação com frontend-hermes.

### 16. frontend/views/auditoria.html:219; frontend/js/router.js:71

**Observação:** A vista ouve argos:navaway em document e chama clearInterval sobre _autoRefresh, com once: true.

**Interpretação:** É limpeza interna de uma vista de frontend em resposta ao roteador da mesma unidade.

### 17. frontend/views/auditoria.html:288; frontend/js/router.js:71

**Observação:** A vista ouve argos:navaway em document e chama clearInterval sobre _sesAutoRefresh, com once: true.

**Interpretação:** É limpeza interna de uma vista de frontend em resposta ao roteador da mesma unidade.

### 18. frontend/views/dashboard_home.html:458; frontend/js/router.js:71

**Observação:** A vista ouve argos:navaway em document e chama clearInterval sobre _interval, com once: true.

**Interpretação:** É limpeza interna de uma vista de frontend em resposta ao roteador da mesma unidade.

### 19. frontend/views/infra_servidores.html:306; frontend/js/router.js:71

**Observação:** A vista ouve argos:navaway em document e chama clearInterval sobre _pollTimer, com once: true.

**Interpretação:** É limpeza interna de uma vista de frontend em resposta ao roteador da mesma unidade.

### 20. frontend/views/mapa_transmilenio.html:616; frontend/views/mapa_transmilenio.html:617-622; frontend/js/router.js:71

**Observação:** A vista ouve argos:navaway e remove o listener de resize e o mapa Leaflet.

**Interpretação:** A limpeza do mapa pertence ao ciclo de vida da mesma unidade frontend.

### 21. frontend/dashboard.html:361; frontend-hermes/src/hermes-widget.tsx:57-58

**Observação:** O dashboard contém hermes-widget com id hermes-ai-widget e os atributos api-base="/api" e modulo="dashboard"; o fornecedor registra a mesma tag.

**Interpretação:** O host nomeia e instancia explicitamente o custom element fornecido por frontend-hermes.

### 22. frontend/dashboard.html:366; frontend-hermes/vite.config.ts:11-15; backend/main.py:92; backend/main.py:281-288

**Observação:** O dashboard inclui /hermes/hermes-widget.js; o Vite define esse nome de saída e o backend serve frontend-hermes/dist pelo prefixo /hermes/.

**Interpretação:** O carregamento por URL resolve o bundle da outra unidade e participa da composição em runtime.

### 23. frontend/; frontend/index.html:23-24; frontend/dashboard.html:366-369

**Observação:** frontend contém páginas HTML próprias, que carregam scripts estáticos e CDNs; a revisão registra ausência de build.

**Interpretação:** Confirma o limite da unidade host estática, sem estabelecer sozinho toda a organização entre unidades.

### 24. frontend-hermes/; frontend-hermes/package.json:1-31; frontend-hermes/package.json:8; frontend-hermes/vite.config.ts:10-16; frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:27; frontend-hermes/src/hermes-widget.tsx:57-58

**Observação:** frontend-hermes tem pacote próprio, build tsc -b && vite build e entrada src/hermes-widget.tsx, que monta React e registra hermes-widget; a saída Vite é uma biblioteca IIFE.

**Interpretação:** Confirma a unidade frontend com entrada e build próprios, encapsulada como Web Component. Isso não comprova execução autônoma funcional.

### 25. frontend/dashboard.html:361; frontend/dashboard.html:366; frontend-hermes/src/hermes-widget.tsx:6; frontend-hermes/src/hermes-widget.tsx:16; frontend-hermes/src/hermes-widget.tsx:58; frontend-hermes/vite.config.ts:11-15; backend/main.py:92; backend/main.py:281-288

**Observação:** frontend usa a tag hermes-widget e carrega /hermes/hermes-widget.js. A tag é registrada por frontend-hermes, cujo build gera o bundle servido pelo FastAPI a partir de dist. A revisão registra destino presente e relação ativa.

**Interpretação:** Liga diretamente o host e o widget por Web Components e carregamento em runtime, com destino e artefato resolvidos no snapshot.

### 26. frontend/components/topbar.html:26; frontend/dashboard.html:421; frontend-hermes/src/App.tsx:35-36

**Observação:** frontend emite toggle-hermes no topbar e close-hermes no dashboard; App de frontend-hermes ouve ambos em window. A revisão registra relação ativa e direção origem → destino.

**Interpretação:** O par de emissores e receptores estabelece comunicação explícita do host para o widget, sem eventos de retorno registrados.

### 27. backend/main.py:91; backend/main.py:257-293; docker-compose.yml:3-24; ngrok_tunnel.py:95-111; ngrok_tunnel.py:153-161

**Observação:** frontend é servido diretamente por FastAPI em /, /login, /dashboard e pelos estáticos em /. O compose monta o repositório no serviço único; o túnel expõe a mesma porta. Build sem build, deploy conjunto e versionamento No na revisão.

**Interpretação:** O caminho de publicação situa o host, mas a ausência de build e o serviço compartilhado não demonstram independência de entrega.

### 28. frontend-hermes/package.json:8; frontend-hermes/vite.config.ts:11-15; backend/main.py:92; backend/main.py:281-288; docker-compose.yml:3-24; ngrok_tunnel.py:52-62; ngrok_tunnel.py:153-161

**Observação:** frontend-hermes tem build tsc -b && vite build, com saída hermes-widget.js. O mesmo FastAPI publica seu dist em /hermes/. O script ngrok tenta construir antes de subir o servidor; o compose não constrói o widget. Build separado, deploy conjunto e versionamento No na revisão.

**Interpretação:** O build próprio confirma um limite de entrega do widget, enquanto a publicação permanece compartilhada com o host. A rota depende de dist disponível.

### 29. README.md:47-48

**Observação:** O README apresenta o dashboard principal como interface SPA de múltiplos painéis renderizada dinamicamente com JavaScript vanilla.

**Interpretação:** A descrição situa a unidade host; as vistas internas não são unidades adicionais. A revisão registra corroboração.

### 30. README.md:63

**Observação:** O README chama Hermes de micro-frontend construído em React e TypeScript com Vite.

**Interpretação:** Nomeia a unidade e sua tecnologia, em acordo com estrutura, build e consumo registrados; a afirmação permanece evidência semântica.

### 31. README.md:63

**Observação:** O README qualifica Hermes como independente.

**Interpretação:** A revisão registra sem corroboração para execução autônoma funcional. O build próprio e o uso embutido não comprovam esse sentido de independência.

### 32. README.md:68

**Observação:** O README diz que pyngrok expõe um servidor Flask à internet por túnel HTTP seguro.

**Interpretação:** A revisão registra a afirmação como contradita: o processo iniciado atualmente é FastAPI/Uvicorn. A segurança do túnel não foi verificada em execução.

### 33. README.md:70

**Observação:** O README declara build automático do micro-frontend Hermes antes do lançamento do túnel.

**Interpretação:** A revisão registra corroboração pela tentativa de build no script; uma falha é registrada como advertência e não garante interrupção do lançamento.

### 34. README.md:104

**Observação:** A árvore do README descreve hermes-widget.tsx como widget embutível do chatbot.

**Interpretação:** A afirmação situa a entrada embutível de Hermes, corroborada pela relação de composição registrada.

### 35. README.md:110

**Observação:** A árvore do README descreve dist como bundle compilado gerado por Vite.

**Interpretação:** A revisão registra corroboração pelo build e diretório de saída do widget, sem exigir bundle gerado versionado.

### 36. README.md:112-113

**Observação:** O README identifica backend como servidor FastAPI e main.py como entrada com lifespan, roteadores e estáticos.

**Interpretação:** A revisão registra corroboração do servidor atual. A afirmação descreve infraestrutura backend e não uma unidade frontend.

### 37. README.md:214

**Observação:** O README associa vite-plugin-css-injected-by-js a um widget embutível sem CSS externo.

**Interpretação:** A revisão registra corroboração pela configuração do plugin e pela injeção de CSS no Shadow DOM do widget; isso não se estende ao host inteiro.

### 38. README.md:221

**Observação:** O README lista Inno Setup para geração de instalador Windows .exe.

**Interpretação:** A revisão registra sem corroboração: a declaração não comprova geração ou distribuição do instalador.

### 39. frontend-hermes/src/App.tsx:19

**Observação:** Um comentário declara a sincronização do módulo do dashboard para o widget.

**Interpretação:** A revisão registra corroboração pela passagem de modulo pelo host e atualização do estado do widget. Isso não comprova acompanhamento de toda navegação interna.

### 40. frontend-hermes/src/App.tsx:24

**Observação:** Um comentário declara a escuta de evento global do topbar para abrir e fechar.

**Interpretação:** A revisão registra corroboração pela emissão de toggle-hermes pelo host e sua recepção no widget.

### 41. frontend-hermes/vite.config.ts:17

**Observação:** O comentário do Vite diz para impedir a externalização de React, para incluí-lo no bundle.

**Interpretação:** A revisão registra corroboração em external: []. O comentário descreve empacotamento de uma biblioteca, sem declarar sozinho mecanismo de MFE ou relação entre unidades.

### 42. frontend/dashboard.html:687

**Observação:** O comentário do dashboard diz que o widget é carregado via Web Component, nomeando hermes-widget.

**Interpretação:** Nomeia o mecanismo e a ligação com o widget, corroborados pelo registro da tag e seu uso no host. A afirmação isolada continua fraca.

### 43. frontend/dashboard.html:688

**Observação:** O comentário declara que o token será passado ao widget depois do carregamento do roteador.

**Interpretação:** A revisão registra corroboração pela atribuição do token após AppRouter.init e pelo callback de atributos do widget; descreve compartilhamento de sessão entre unidades.

### 44. frontend/js/api.js:4-5

**Observação:** O comentário descreve o cliente API como comunicação entre frontend e backend Flask.

**Interpretação:** A revisão registra contradita: a comunicação existe, mas o servidor atual é FastAPI. Trata-se da ligação com o backend.

### 45. frontend/js/api.js:9-10

**Observação:** O comentário diz usar o host atual em localhost/LAN e window.location.origin em ngrok ou domínio externo.

**Interpretação:** A revisão registra corroboração: a implementação compõe a API com a origem da página, em acordo com o servidor comum; não houve verificação de domínio público em execução.

### 46. ngrok_tunnel.py:3-5

**Observação:** O cabeçalho diz expor o servidor FastAPI e o WebSocket de câmeras ao exterior por pyngrok.

**Interpretação:** A revisão registra corroboração pelo início de Uvicorn e pelo túnel HTTP na mesma porta. A descrição situa a infraestrutura comum.

### 47. 6fc3f39 2026-09-15 (frontend-hermes/index.html; frontend-hermes/vite.config.ts; frontend-hermes/src/hermes-widget.tsx); frontend-hermes/index.html:11; frontend-hermes/vite.config.ts:11-15

**Observação:** A revisão histórica registra a adição conjunta do HTML, da configuração Vite e do custom element em 6fc3f39, sem alterações posteriores nesses caminhos e sem registro de src/main.tsx. O resultado do ponto é esclarecido.

**Interpretação:** A divergência entre o HTML de desenvolvimento e a entrada de biblioteca já existe na primeira presença observável. Não demonstra uma entrada autônoma anterior nem altera o limite do widget no snapshot.

### 48. 6fc3f39 2026-09-15 (README.md; ngrok_tunnel.py; frontend/js/api.js; backend/app.py); 0ffce61 2026-09-20 (frontend/js/api.js); 221f58c 2026-10-09 (README.md; ngrok_tunnel.py; backend/app.py; backend/main.py)

**Observação:** A revisão registra a adição dos caminhos em 6fc3f39, mudança do cliente em 0ffce61 e alterações com adição de backend/main.py em 221f58c, cuja mensagem anuncia migração para FastAPI. Conteúdos anteriores de README, túnel e backend não estavam disponíveis; o resultado é inconclusivo.

**Interpretação:** A dúvida remanescente é sobre a origem histórica das referências a Flask. O servidor atual está identificado e as afirmações permanecem contraditas no snapshot; por isso a força é fraca.

### 49. .gitignore:66-67; README.md:221

**Observação:** O snapshot comenta que scripts de instalação são destinados à distribuição e exclui installer/. A revisão histórica registra resolvido pelo snapshot, sem consulta histórica específica para este ponto.

**Interpretação:** A exclusão explica a lacuna do inventário, mas não comprova instalador construído ou distribuído. A afirmação documental permanece sem corroboração.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (frontend-hermes/src/hermes-widget.tsx:6) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #25 |
| 2 | 3.4.4 (frontend-hermes/src/hermes-widget.tsx:16) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #25 |
| 3 | 3.4.4 (frontend-hermes/src/hermes-widget.tsx:58) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #25 |
| 4 | 3.4.4 (frontend/js/router.js:54) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (frontend/js/router.js:93) | 3 código | código-fonte | — | contexto | fraca | — |
| 6 | 3.4.4 (frontend/views/mapa_transmilenio.html:604) | 3 código | código-fonte | — | contexto | fraca | — |
| 7 | 3.4.4 (frontend/dashboard.html:14) | 3 código | código-fonte | — | contexto | fraca | — |
| 8 | 3.4.4 (frontend/dashboard.html:15) | 3 código | código-fonte | — | contexto | fraca | — |
| 9 | 3.4.4 (frontend/index.html:23) | 3 código | código-fonte | — | contexto | fraca | — |
| 10 | 3.4.4 (frontend/login.html:12) | 3 código | código-fonte | — | contexto | fraca | — |
| 11 | 3.4.4 (frontend-hermes/src/App.tsx:35) | 3 código | código-fonte | events | tecnológica | moderada | implementa #26 |
| 12 | 3.4.4 (frontend-hermes/src/App.tsx:36) | 3 código | código-fonte | events | tecnológica | moderada | implementa #26 |
| 13 | 3.4.4 (frontend/components/topbar.html:26) | 3 código | código-fonte | events | tecnológica | moderada | implementa #26 |
| 14 | 3.4.4 (frontend/dashboard.html:421) | 3 código | código-fonte | events | tecnológica | moderada | implementa #26 |
| 15 | 3.4.4 (frontend/js/router.js:71) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (frontend/views/auditoria.html:219) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (frontend/views/auditoria.html:288) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (frontend/views/dashboard_home.html:458) | 3 código | código-fonte | — | contexto | fraca | — |
| 19 | 3.4.4 (frontend/views/infra_servidores.html:306) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (frontend/views/mapa_transmilenio.html:616) | 3 código | código-fonte | — | contexto | fraca | — |
| 21 | 3.4.4 (frontend/dashboard.html:361) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #25 |
| 22 | 3.4.4 (frontend/dashboard.html:366) | 3 código | código-fonte | web-components | arquitetural | forte | implementa #25 |
| 23 | 3.4.3 (frontend) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (frontend-hermes) | 4 estrutura | diretório | web-components | arquitetural | moderada | — |
| 25 | 3.4.5 #1 | 5 composição | código-fonte | web-components | arquitetural | forte | liga #23; liga #24 |
| 26 | 3.4.5 #2 | 5 composição | código-fonte | events | arquitetural | forte | liga #23; liga #24 |
| 27 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | fraca | publica #23 |
| 28 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #24 |
| 29 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora frontend/js/router.js:13-29; corrobora #5 |
| 30 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #24; corrobora #28; corrobora #25 |
| 31 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 32 | 3.4.7 #4 | 7 documentação | documentação | — | contexto | fraca | contradiz ngrok_tunnel.py:95-111; contradiz ngrok_tunnel.py:153-161 |
| 33 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28 |
| 34 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25 |
| 35 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28 |
| 36 | 3.4.7 #8 | 7 documentação | documentação | — | contexto | fraca | corrobora backend/main.py:91-92; corrobora backend/main.py:257-293 |
| 37 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora frontend-hermes/vite.config.ts:3-8; corrobora #2 |
| 38 | 3.4.7 #10 | 7 documentação | documentação | — | contexto | fraca | — |
| 39 | 3.4.7 #11 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #21; corrobora frontend-hermes/src/hermes-widget.tsx:40-44; corrobora frontend-hermes/src/App.tsx:19-22; corrobora frontend-hermes/src/store/useHermesStore.ts:44 |
| 40 | 3.4.7 #12 | 7 documentação | comentário | events | arquitetural | fraca | corrobora #26; corrobora #11; corrobora #13 |
| 41 | 3.4.7 #13 | 7 documentação | comentário | — | contexto | fraca | corrobora frontend-hermes/vite.config.ts:17-23; corrobora #28 |
| 42 | 3.4.7 #14 | 7 documentação | comentário | web-components | arquitetural | fraca | corrobora #25; corrobora #21; corrobora #22; corrobora #3 |
| 43 | 3.4.7 #15 | 7 documentação | comentário | — | arquitetural | fraca | corrobora frontend/dashboard.html:724-730; corrobora frontend-hermes/src/hermes-widget.tsx:10-12; corrobora frontend-hermes/src/hermes-widget.tsx:31-44 |
| 44 | 3.4.7 #16 | 7 documentação | comentário | — | contexto | fraca | contradiz backend/main.py:257-293 |
| 45 | 3.4.7 #17 | 7 documentação | comentário | — | contexto | fraca | corrobora frontend/js/api.js:11-15; corrobora frontend/js/api.js:55; corrobora backend/main.py:257-293 |
| 46 | 3.4.7 #18 | 7 documentação | comentário | — | contexto | fraca | corrobora ngrok_tunnel.py:95-111; corrobora ngrok_tunnel.py:153-161 |
| 47 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #24; explica #31 |
| 48 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #32; explica #44 |
| 49 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #38 |

## Resumo

Observações: 49. Dimensões (tecnologia: 0, configuração: 0, código: 22, estrutura: 2, composição: 2, build-deploy: 2, documentação: 18, histórico: 3). Força (forte: 4, moderada: 10, fraca: 35, ambígua: 0). Evidência (tecnológica: 7, arquitetural: 20, contexto: 22).
