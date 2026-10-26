---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
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

# 294 — angelantilantil-web/micro-frontend

## Leitura do repositório

A documentação tem 24 arquivos Markdown em inglês: README e DOCUMENTATION na raiz e por unidade, além dos READMEs do módulo de IA e de seu backend. Não há README de ferramenta ou documento de terceiro entre eles. Foram lidos integralmente os 24 arquivos `documentation` do artifacts.csv. Os textos apresentam um painel bancário com shell e remotos Webpack Module Federation. A arquitetura é confirmada para sete ligações; accounts, cards e loans existem como remotos, mas o host não os carrega (host-app/webpack.config.js:47–55; host-app/src/App.js:230–240). Vários documentos confundem disponibilidade de um remote com consumo e separação de arquivos CSS com isolamento de estilos. A evolução independente é apoiada por entradas e builds próprios; publicação independente não tem artefatos (3.4.3 e 3.4.6).

Foram lidos os onze package.json e webpack.config.js, as onze entradas src/index.js, os comentários dos App.js citados nas revisões e start-all-modules.bat. Os manifestos não têm campo description e as configurações webpack não têm comentários arquiteturais. Os comentários do bus, store e carregamento viraram afirmações; os de layout, dados de exemplo e tratamento de upload descrevem aspectos internos. Os trechos sobre CSS foram confrontados também com as folhas e as regras style-loader/css-loader. A revisão 3.4.5 (Observação 7) registra que a integração com o backend está comentada, conforme ai-agent-module/src/App.js:84–109; o caminho ativo usa respostas locais (ai-agent-module/src/App.js:81–82). Essa leitura é consistente com as sete relações host → remote registradas na revisão de composição.

Ocorrências doc-* sem afirmação arquitetural adicional: DOCUMENTATION.md:1 e README.md:1 são títulos; README.md:8 é o nome da raiz na árvore. business-reports/DOCUMENTATION.md:4, incoming-api-logs/DOCUMENTATION.md:4, incoming-api-logs/README.md:3, model-portfolio-configuration/DOCUMENTATION.md:25 e vro-uploads/DOCUMENTATION.md:4 são menções ao projeto junto a descrições funcionais, sem acrescentar mecanismo ou papel. accounts-module/DOCUMENTATION.md:4 repete a participação já listada na raiz; ai-agent-module/README.md:3 repete a unidade de IA da árvore. Todas as demais ocorrências estão nas linhas ou nas repetições indicadas em Observações, inclusive DOCUMENTATION.md:35, README.md:111 e incoming-api-logs/README.md:28, que integram instruções de execução. As listas de comandos e os exemplos de código (README.md:37–61,69–93,99–115,164–172,178–199; DOCUMENTATION.md:23–33 e blocos locais) não foram contados como novas afirmações.

As descrições de telas, filtros e dados bancários são contexto funcional; business-reports/src/App.js:4–11, maker-requests/src/App.js:4–11 e model-portfolio-configuration/src/App.js:4–11 contêm placeholders. O backend tem documentação de FastAPI, banco e setup (ai-agent-backend/README.md:3–39,48–49), mas essas relações internas de backend não entram; a instrução de configuração do frontend em :44 é uma proposta de integração, sem afirmar que esteja ativa, e não vira linha. As instruções locais sem nova propriedade arquitetural também ficam nesta leitura.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | DOCUMENTATION.md:4 | "This repository implements a micro-frontend architecture [...] using `host-app` as the shell and multiple remote modules." | estrutura | corroborada | 3.4.3 (Unidades); 3.4.5 #1–7 |
| 2 | DOCUMENTATION.md:8 | "`accounts-module/` - Accounts management micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: accounts-module); accounts-module/webpack.config.js:44–49 |
| 3 | DOCUMENTATION.md:9 | "`business-reports/` - Business reports micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: business-reports); business-reports/webpack.config.js:44–49 |
| 4 | DOCUMENTATION.md:10 | "`cards-module/` - Cards management micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: cards-module); cards-module/webpack.config.js:44–49 |
| 5 | DOCUMENTATION.md:11 | "`incoming-api-logs/` - Incoming API logs micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: incoming-api-logs); incoming-api-logs/webpack.config.js:44–49 |
| 6 | DOCUMENTATION.md:12 | "`loans-module/` - Loans management micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: loans-module); loans-module/webpack.config.js:44–49 |
| 7 | DOCUMENTATION.md:13 | "`maker-requests/` - Maker-requests workflow micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: maker-requests); maker-requests/webpack.config.js:44–49 |
| 8 | DOCUMENTATION.md:14 | "`model-portfolio-configuration/` - Portfolio configuration micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: model-portfolio-configuration); model-portfolio-configuration/webpack.config.js:44–49 |
| 9 | DOCUMENTATION.md:15 | "`outgoing-api-logs/` - Outgoing API logs micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: outgoing-api-logs); outgoing-api-logs/webpack.config.js:44–49 |
| 10 | DOCUMENTATION.md:16 | "`vro-uploads/` - VRO uploads micro-frontend" | estrutura | corroborada | 3.4.3 (Unidades: vro-uploads); vro-uploads/webpack.config.js:44–49 |
| 11 | DOCUMENTATION.md:38 | "The host uses Webpack Module Federation to load remote entries from each module." | composição | contradita | 3.4.5 #1–7; host-app/webpack.config.js:47–55 |
| 12 | DOCUMENTATION.md:39 | "Each module is independently runnable and documented at its own folder level." | independência | corroborada | 3.4.3 (Unidades); 3.4.6 (Aplicações) |
| 13 | README.md:15 | "ai-agent-module/ [...] # AI Agent chatbot module" | estrutura | corroborada | 3.4.3 (Unidades: ai-agent-module); ai-agent-module/src/index.js:3–7 |
| 14 | README.md:21 | "This project uses **Webpack Module Federation** to implement a micro-frontend architecture:" | composição | corroborada | host-app/webpack.config.js:2,44–55; 3.4.5 #1–7 |
| 15 | README.md:24 | "Standalone applications that can be independently developed" | independência | corroborada | 3.4.3 (Unidades); 3.4.6 (Aplicações) |
| 16 | README.md:24 | "can be independently [...] deployed" | build-deploy | sem corroboração | — |
| 17 | README.md:135 | "Shared event bus for cross-module communication" | composição | contradita | 3.4.4 (event bus: No); host-app/src/App.js:6–27; accounts-module/src/App.js:5–19,38–48 |
| 18 | README.md:145 | "Remote module loaded by host app" | composição | corroborada | 3.4.5 #3; host-app/src/App.js:38,233 |
| 19 | README.md:176 | "Build each module for production:" | build-deploy | corroborada | 3.4.6 (Build separado: 11); host-app/package.json:6; business-reports/package.json:6 |
| 20 | accounts-module/DOCUMENTATION.md:9 | "Remote module configuration for Module Federation" | composição | corroborada | accounts-module/webpack.config.js:44–49 |
| 21 | accounts-module/DOCUMENTATION.md:15 | "Uses isolated module styles and components" | composição | contradita | accounts-module/src/App.js:1–2; accounts-module/src/styles.css:8–19; accounts-module/webpack.config.js:37–40 |
| 22 | accounts-module/DOCUMENTATION.md:26 | "The host app loads this module as a federated remote when the user navigates to the Accounts route." | composição | contradita | host-app/webpack.config.js:47–55; host-app/src/App.js:230–240 |
| 23 | accounts-module/src/App.js:4 | "Event Bus for cross-module communication" | composição | contradita | 3.4.4 (event bus: No); accounts-module/src/App.js:5–19,46–48; host-app/webpack.config.js:47–55 |
| 24 | accounts-module/src/App.js:36 | "Initialize accounts from shared store" | composição | contradita | accounts-module/src/App.js:38–44; host-app/src/App.js:6–24 |
| 25 | ai-agent-module/README.md:21 | "This module is built as a Webpack Module Federation remote and is exposed as `AIAgentApp`." | composição | corroborada | 3.4.5 #7; ai-agent-module/webpack.config.js:44–48 |
| 26 | ai-agent-module/src/App.js:84 | "API integration is currently disabled for static demo mode." | composição | corroborada | ai-agent-module/src/App.js:81–109 |
| 27 | business-reports/DOCUMENTATION.md:9 | "Remote entry configuration for Module Federation" | composição | corroborada | business-reports/webpack.config.js:44–48 |
| 28 | business-reports/DOCUMENTATION.md:15 | "Uses isolated CSS for module-specific layout" | composição | contradita | business-reports/src/styles.css:2–26; business-reports/webpack.config.js:37–40 |
| 29 | business-reports/DOCUMENTATION.md:25 | "The module is loaded by `host-app` when the Business Reports route is active." | composição | corroborada | 3.4.5 #1; host-app/src/App.js:30,231 |
| 30 | cards-module/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composição | corroborada | cards-module/webpack.config.js:44–49 |
| 31 | cards-module/DOCUMENTATION.md:14 | "Displays card data as a standalone micro-frontend" | independência | corroborada | cards-module/src/index.js:3–7; cards-module/src/App.js:38–44; cards-module/package.json:5 |
| 32 | cards-module/DOCUMENTATION.md:15 | "Uses isolated styles for module-specific UI" | composição | contradita | cards-module/src/styles.css:8–19; cards-module/webpack.config.js:37–40 |
| 33 | cards-module/DOCUMENTATION.md:26 | "The host shell loads this module dynamically as part of the micro-frontend routing." | composição | contradita | host-app/webpack.config.js:47–55; host-app/src/App.js:230–240 |
| 34 | cards-module/src/App.js:4 | "Event Bus for cross-module communication" | composição | contradita | 3.4.4 (event bus: No); cards-module/src/App.js:5–19,46–48; host-app/webpack.config.js:47–55 |
| 35 | cards-module/src/App.js:36 | "Initialize cards from shared store" | composição | contradita | cards-module/src/App.js:38–44; host-app/src/App.js:6–24 |
| 36 | host-app/DOCUMENTATION.md:10 | "Global shared styling" | composição | corroborada | host-app/src/App.js:3,228–238; host-app/src/styles.css:2–13 |
| 37 | host-app/DOCUMENTATION.md:26 | "Must run together with remote modules so the federated remotes can be loaded." | composição | corroborada | host-app/webpack.config.js:48–54; host-app/src/App.js:30–57 |
| 38 | host-app/DOCUMENTATION.md:27 | "The host app uses route-based loading for each remote module." | composição | corroborada | host-app/src/App.js:30–57,230–240 |
| 39 | host-app/src/App.js:26 | "Make EventBus available globally" | composição | corroborada | host-app/src/App.js:27 |
| 40 | host-app/src/App.js:29 | "Lazy load remote modules" | composição | corroborada | host-app/src/App.js:30–57 |
| 41 | incoming-api-logs/DOCUMENTATION.md:6 | "It is designed as a remote micro-frontend that can be loaded into the `host-app` using Webpack Module Federation." | composição | corroborada | 3.4.5 #4; incoming-api-logs/webpack.config.js:44–48; host-app/src/App.js:42,234 |
| 42 | loans-module/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composição | corroborada | loans-module/webpack.config.js:44–49 |
| 43 | loans-module/DOCUMENTATION.md:14 | "Uses independent styling and routing for the loan module" | independência | contradita | loans-module/src/App.js:1–51; loans-module/src/styles.css:8–19; loans-module/webpack.config.js:37–40 |
| 44 | loans-module/DOCUMENTATION.md:26 | "The host loads it dynamically when the Loans route is requested." | composição | contradita | host-app/webpack.config.js:47–55; host-app/src/App.js:230–240 |
| 45 | loans-module/src/App.js:4 | "Event Bus for cross-module communication" | composição | contradita | 3.4.4 (event bus: No); loans-module/src/App.js:5–19,46–48; host-app/webpack.config.js:47–55 |
| 46 | loans-module/src/App.js:36 | "Initialize loans from shared store" | composição | contradita | loans-module/src/App.js:38–44; host-app/src/App.js:6–24 |
| 47 | maker-requests/DOCUMENTATION.md:13 | "Exposes a remote entry to the host shell" | composição | corroborada | maker-requests/webpack.config.js:44–48; 3.4.5 #5 |
| 48 | maker-requests/DOCUMENTATION.md:15 | "Uses isolated styling to avoid conflicts with other modules" | composição | contradita | maker-requests/src/styles.css:2–26; maker-requests/webpack.config.js:37–40 |
| 49 | maker-requests/DOCUMENTATION.md:25 | "The host app loads this module on the Maker Requests route." | composição | corroborada | 3.4.5 #5; host-app/src/App.js:46,236 |
| 50 | model-portfolio-configuration/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composição | corroborada | model-portfolio-configuration/webpack.config.js:44–48 |
| 51 | model-portfolio-configuration/DOCUMENTATION.md:15 | "Isolation ensures styles do not leak into the host or other modules" | composição | contradita | model-portfolio-configuration/src/styles.css:2–26; model-portfolio-configuration/webpack.config.js:37–40 |
| 52 | model-portfolio-configuration/DOCUMENTATION.md:26 | "The host app loads it dynamically through Module Federation." | composição | corroborada | 3.4.5 #2; host-app/src/App.js:34,232 |
| 53 | outgoing-api-logs/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composição | corroborada | outgoing-api-logs/webpack.config.js:44–48 |
| 54 | outgoing-api-logs/DOCUMENTATION.md:15 | "Uses isolated CSS to keep the module visually separated" | composição | contradita | outgoing-api-logs/src/styles.css:2–12; outgoing-api-logs/webpack.config.js:37–40 |
| 55 | start-all-modules.bat:2 | "Batch file to run all HDFC micro frontend modules and host app in separate terminals" | independência | contradita | start-all-modules.bat:4–12; 3.4.3 (Unidades) |
| 56 | vro-uploads/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composição | corroborada | vro-uploads/webpack.config.js:44–48 |
| 57 | vro-uploads/DOCUMENTATION.md:15 | "Uses isolated styles so it does not affect the host or other modules" | composição | contradita | vro-uploads/src/styles.css:1–10; vro-uploads/webpack.config.js:37–40 |
| 58 | vro-uploads/DOCUMENTATION.md:25 | "This module is loaded when the VRO Uploads route is selected from the host app." | composição | corroborada | 3.4.5 #6; host-app/src/App.js:50,237 |

## Observações

**1. DOCUMENTATION.md:4.** O shell e os remotos existem; sete estão ligados. Repetições: README.md:3; README.md:23; README.md:132; host-app/DOCUMENTATION.md:4; host-app/DOCUMENTATION.md:7; host-app/DOCUMENTATION.md:13; host-app/README.md:3,9,23. DOCUMENTATION.md:7 explicita a navegação do shell; a árvore comentada de README.md:9–16 confirma a mesma organização e acrescenta a unidade de IA.

**2. DOCUMENTATION.md:8.** A unidade accounts-module tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A declaração de remote reaparece em accounts-module/README.md:3; isso não implica que seja consumida pelo shell.

**3. DOCUMENTATION.md:9.** A unidade business-reports tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A declaração de remote reaparece em business-reports/README.md:3; isso não implica que seja consumida pelo shell.

**4. DOCUMENTATION.md:10.** A unidade cards-module tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A declaração de remote reaparece em cards-module/README.md:3; isso não implica que seja consumida pelo shell.

**5. DOCUMENTATION.md:11.** A unidade incoming-api-logs tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A declaração de remote reaparece em incoming-api-logs/README.md:3; isso não implica que seja consumida pelo shell.

**6. DOCUMENTATION.md:12.** A unidade loans-module tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A declaração de remote reaparece em loans-module/README.md:3; isso não implica que seja consumida pelo shell.

**7. DOCUMENTATION.md:13.** A unidade maker-requests tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A ocorrência doc-mfe-term em maker-requests/README.md:3 ("The `maker-requests` module is a remote micro-frontend for the HDFC project.") repete esta afirmação sobre a unidade e seu papel de remote, sem exigir outra linha na tabela; esse papel não implica, por si só, consumo pelo shell.

**8. DOCUMENTATION.md:14.** A unidade model-portfolio-configuration tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A ocorrência doc-mfe-term em model-portfolio-configuration/README.md:3 ("The `model-portfolio-configuration` module is a remote micro-frontend for the HDFC project.") repete esta afirmação sobre a unidade e seu papel de remote, sem exigir outra linha na tabela; esse papel não implica, por si só, consumo pelo shell.

**9. DOCUMENTATION.md:15.** A unidade outgoing-api-logs tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A ocorrência doc-mfe-term em outgoing-api-logs/README.md:3 ("The `outgoing-api-logs` module is a remote micro-frontend for the HDFC project.") repete esta afirmação sobre a unidade e seu papel de remote, sem exigir outra linha na tabela; esse papel não implica, por si só, consumo pelo shell.

**10. DOCUMENTATION.md:16.** A unidade vro-uploads tem entrada e configuração remota próprias. A função de negócio no rótulo é contexto, não comprovação de funcionalidade. A ocorrência doc-mfe-term em vro-uploads/README.md:3 ("The `vro-uploads` module is a remote micro-frontend for the HDFC project.") repete esta afirmação sobre a unidade e seu papel de remote, sem exigir outra linha na tabela; esse papel não implica, por si só, consumo pelo shell.

**11. DOCUMENTATION.md:38.** O mecanismo confere para sete remotos, mas “each module” inclui accounts, cards e loans listados em DOCUMENTATION.md:8,10,12, que o host não declara nem importa. A universalidade também aparece em host-app/README.md:22. A instrução DOCUMENTATION.md:35 repete a carga pelo host. A afirmação geral sobre a tecnologia, sem o quantificador universal, tem linha própria em README.md:21.

**12. DOCUMENTATION.md:39.** Cada frontend tem entrada, servidor local e documentação próprios. README.md:3,24,65–67 repete a autonomia de execução e desenvolvimento; não se infere publicação. Os comandos de instalação e execução de DOCUMENTATION.md:22–33 e README.md:35–115 ilustram a operação local e não viram linhas adicionais.

**13. README.md:15.** A árvore comentada acrescenta o módulo de IA à lista antiga da documentação geral. ai-agent-module/README.md:3 repete sua participação no POC; a descrição da experiência de chat é contexto funcional.

**14. README.md:21.** A tecnologia é o plugin embutido do Webpack 5. Repetições: README.md:134,156, host-app/DOCUMENTATION.md:9,14 e host-app/README.md:6,11. Esta afirmação sobre o mecanismo não inclui a quantificação universal contradita em DOCUMENTATION.md:38.

**15. README.md:24.** A propriedade de desenvolvimento separado é sustentada por manifestos, entradas e builds por unidade. A autonomia de execução da mesma frase já está em DOCUMENTATION.md:39; aqui se registra a possibilidade de desenvolvimento separado, também repetida em accounts-module/README.md:23.

**16. README.md:24.** A possibilidade de implantação independente é declarada, mas não há configuração ou pipeline de publicação no snapshot (3.4.6: Deploy não observado nas onze aplicações). Builds separados não demonstram deploy separado. accounts-module/README.md:23 repete a intenção de suportar implantação independente.

**17. README.md:135.** O bus global existe, mas não comunica entre as unidades compostas: só há assinantes nos três remotos não carregados, sem publicador ativo. Repetições: README.md:162 e host-app/DOCUMENTATION.md:15; o exemplo README.md:164–172 é bloco de código, não nova afirmação. O comentário host-app/src/App.js:5 repete o propósito, enquanto :26 descreve corretamente sua exposição global.

**18. README.md:145.** A seção nomeia outgoing-api-logs. Repetições: outgoing-api-logs/DOCUMENTATION.md:13,25 e outgoing-api-logs/README.md:22. O host declara e monta o componente na rota outgoing-api.

**19. README.md:176.** O texto introduz builds por diretório. O bloco README.md:178–199 só exemplifica comandos para parte das unidades e não vira outra linha; os onze scripts usam webpack --mode production.

**20. accounts-module/DOCUMENTATION.md:9.** O plugin expõe AccountsApp e AccountsService. A disponibilidade do remote é real, mesmo sem consumidor. Repetições: accounts-module/DOCUMENTATION.md:13 e accounts-module/README.md:12.

**21. accounts-module/DOCUMENTATION.md:15.** Os componentes e o CSS ficam em arquivos locais, mas o CSS usa seletores globais como .module-header, também presentes em business-reports/src/styles.css:6–19. style-loader e css-loader sem CSS Modules não isolam os estilos entre unidades.

**22. accounts-module/DOCUMENTATION.md:26.** Não há remote accountsModule nem rota Accounts no host. accounts-module/README.md:22 repete a mesma carga inexistente; expor AccountsApp não basta para ser carregado.

**23. accounts-module/src/App.js:4.** accounts-module assina eventos, mas não é carregado pelo host e não há publicador ativo para completar a comunicação. O fallback é um bus local, não um canal partilhado entre as aplicações executadas separadamente.

**24. accounts-module/src/App.js:36.** O acesso ao store é condicional; o bus do host só implementa subscribe/publish e não fornece o getter procurado. O caminho disponível usa os dados locais de exemplo; não há store usado por duas unidades.

**25. ai-agent-module/README.md:21.** A chave exposta e o import federado correspondem. A função de chat não exige backend no estado atual.

**26. ai-agent-module/src/App.js:84.** O comentário descreve a fronteira com o backend: respostas locais ativas e integração HTTP comentada. Não é detalhe interno de processamento; muda de que serviço a unidade depende.

**27. business-reports/DOCUMENTATION.md:9.** A exposição de BusinessReportsApp confere. Repetições: business-reports/DOCUMENTATION.md:14 e business-reports/README.md:11.

**28. business-reports/DOCUMENTATION.md:15.** O CSS local contém .module-container, .module-header e .module-content globais, repetidos em model-portfolio-configuration/src/styles.css:2–26. O carregador não ativa escopo por módulo.

**29. business-reports/DOCUMENTATION.md:25.** Configuração e rota confirmam o carregamento. business-reports/README.md:22–23 repete a montagem pelo host.

**30. cards-module/DOCUMENTATION.md:9.** Expõe CardsApp e CardsService sem consumidor no host. Repetições: cards-module/DOCUMENTATION.md:13 e cards-module/README.md:11.

**31. cards-module/DOCUMENTATION.md:14.** Entrada própria e fallback de dados locais sustentam a execução autônoma. cards-module/DOCUMENTATION.md:25 repete a independência; servir ao lado do host não o conecta automaticamente.

**32. cards-module/DOCUMENTATION.md:15.** Os estilos são globais e repetem .module-header de accounts-module/src/styles.css:8–19. Não há isolamento técnico do CSS entre unidades.

**33. cards-module/DOCUMENTATION.md:26.** O host não declara cardsModule nem monta CardsApp. cards-module/README.md:22 repete a inexistente rota Cards.

**34. cards-module/src/App.js:4.** cards-module assina eventos, mas não é carregado pelo host e não há publicador ativo para completar a comunicação. O fallback é um bus local, não um canal partilhado entre as aplicações executadas separadamente.

**35. cards-module/src/App.js:36.** O acesso ao store é condicional; o bus do host só implementa subscribe/publish e não fornece o getter procurado. O caminho disponível usa os dados locais de exemplo; não há store usado por duas unidades.

**36. host-app/DOCUMENTATION.md:10.** O host importa CSS global com reset universal e body; os componentes remotos montados nele compartilham o documento e ficam sujeitos a essas regras. host-app/README.md:12 repete o caráter global. Não se trata de biblioteca CSS importada por vários builds.

**37. host-app/DOCUMENTATION.md:26.** As URLs exigem servidores remotos disponíveis para carregar os componentes. O shell pode mostrar avisos se faltarem, mas a afirmação condiciona a carga, não a abertura da interface.

**38. host-app/DOCUMENTATION.md:27.** Os sete remotos configurados são montados por rotas e importados por React.lazy. Aqui “each remote” descreve a estratégia dos remotos do host, não a inclusão de todos os projetos. O comentário host-app/src/App.js:29 confirma a carga preguiçosa.

**39. host-app/src/App.js:26.** A atribuição a window.EventBus existe. A disponibilidade global é propriedade distinta de comunicação efetiva, que permanece contradita.

**40. host-app/src/App.js:29.** React.lazy envolve as sete importações; é a estratégia de carga, distinta do vínculo das rotas descrito em host-app/DOCUMENTATION.md:27.

**41. incoming-api-logs/DOCUMENTATION.md:6.** Configuração e consumo confirmam o mecanismo e a unidade. incoming-api-logs/DOCUMENTATION.md:40 e incoming-api-logs/README.md:28 repetem a integração em instruções de execução.

**42. loans-module/DOCUMENTATION.md:9.** Expõe LoansApp e LoansService. Repetições: loans-module/DOCUMENTATION.md:13 e loans-module/README.md:11. Não demonstra consumidor.

**43. loans-module/DOCUMENTATION.md:14.** O módulo tem arquivos próprios, porém não define roteador e seu CSS usa .module-header global, igual ao de accounts-module/src/styles.css:8–19. Seleção e modal internos não são rotas independentes. A ocorrência doc-independence é tratada aqui; a propriedade de isolamento entre unidades não se confirma.

**44. loans-module/DOCUMENTATION.md:26.** Não há remote loansModule nem rota Loans no host. loans-module/README.md:22 repete a afirmação.

**45. loans-module/src/App.js:4.** loans-module assina eventos, mas não é carregado pelo host e não há publicador ativo para completar a comunicação. O fallback é um bus local, não um canal partilhado entre as aplicações executadas separadamente.

**46. loans-module/src/App.js:36.** O acesso ao store é condicional; o bus do host só implementa subscribe/publish e não fornece o getter procurado. O caminho disponível usa os dados locais de exemplo; não há store usado por duas unidades.

**47. maker-requests/DOCUMENTATION.md:13.** A unidade expõe MakerRequestsApp e o host o consome. maker-requests/README.md:11 nomeia Module Federation para a mesma configuração.

**48. maker-requests/DOCUMENTATION.md:15.** O CSS repete seletores globais de business-reports/src/styles.css:2–26; o pipeline usa style-loader/css-loader comuns. Há potencial de interferência, sem escopo isolado.

**49. maker-requests/DOCUMENTATION.md:25.** A rota carrega MakerRequestsApp. maker-requests/README.md:22 repete o carregamento pelo shell.

**50. model-portfolio-configuration/DOCUMENTATION.md:9.** Expõe ModelPortfolioApp. Repetições: model-portfolio-configuration/DOCUMENTATION.md:13 e model-portfolio-configuration/README.md:11.

**51. model-portfolio-configuration/DOCUMENTATION.md:15.** Não há CSS Modules, Shadow DOM ou encapsulamento no carregador; .module-content e .module-header são seletores globais também usados por business-reports/src/styles.css:6–26. A garantia de não vazamento é desmentida pelo mecanismo.

**52. model-portfolio-configuration/DOCUMENTATION.md:26.** A carga dinâmica e a rota portfolio estão ligadas à exposição. model-portfolio-configuration/README.md:22 repete o vínculo por rota.

**53. outgoing-api-logs/DOCUMENTATION.md:9.** O remote expõe OutgoingApiLogsApp. outgoing-api-logs/README.md:11 repete a descrição da configuração; o consumo está registrado na afirmação originada em README.md:145.

**54. outgoing-api-logs/DOCUMENTATION.md:15.** A folha local usa .module-container e .module-header globais, iguais aos de business-reports/src/styles.css:2–8. Separação em arquivos não garante isolamento entre remotos.

**55. start-all-modules.bat:2.** Abre terminais separados para host, sete remotos e backend, mas “all” não se confirma: accounts-module, cards-module e loans-module não são iniciados. A parte de processos separados está correta; prevalece a contradição da abrangência.

**56. vro-uploads/DOCUMENTATION.md:9.** Expõe VroUploadsApp. Repetições: vro-uploads/DOCUMENTATION.md:13 e vro-uploads/README.md:11.

**57. vro-uploads/DOCUMENTATION.md:15.** Há seletores globais .module-container e .module-header, também presentes em outgoing-api-logs/src/styles.css:2–12. O carregamento CSS não fornece isolamento entre unidades.

**58. vro-uploads/DOCUMENTATION.md:25.** A rota monta VroUploadsApp. vro-uploads/README.md:22 repete a mesma relação.

## Resumo

Afirmações: 58 (corroborada: 37, parcial: 0, contradita: 20, sem corroboração: 1). Temas: (estrutura: 11, composição: 40, build-deploy: 2, independência: 5).
