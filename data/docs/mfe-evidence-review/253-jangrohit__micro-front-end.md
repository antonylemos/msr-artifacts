---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Leitura do repositório

A cadeia de composição liga duas aplicações React com entrada e build próprios: container (#11) e marketing (#14). A configuração do host nomeia marketing e resolve seu remoteEntry em produção e desenvolvimento (#1, #2); o remote expõe MarketingApp (#3, #4). O container importa essa interface pelo nome federado (#9), chama mount no elemento de seu wrapper (#8), e o destino exporta a função de montagem (#7). A relação ativa #16 reúne essa cadeia de Module Federation. Os workflows constroem e publicam cada aplicação separadamente em prefixos próprios de S3/CloudFront (#17, #18), sem versionamento de publicação independente nem prova de execução dos jobs.

A 3.4.2 não tem linhas de dependências das tecnologias inspecionadas, portanto a dimensão 1 não tem observações. Isso não exclui o mecanismo: as configurações importam o plugin embutido no webpack (#1–#4). Os bootstraps assíncronos locais (#5, #6) são sinais fracos isolados. Auth e dashboard são pacotes sem UI (#10, #13), e os diretórios config não são aplicações extras (#12, #15).

As 23 afirmações documentais (#19–#41) ajudam a descrever os papéis e o contrato de montagem, mas têm força fraca por serem semânticas. Duas são contraditas: a negação dos pipelines (#40), frente aos workflows, e a conclusão sobre roteadores aninhados na mesma árvore React (#41), frente à raiz própria do marketing. O histórico esclarece que os workflows antecedem o README (#42); o segundo ponto é resolvido pelo snapshot (#43). Não resta ambiguidade arquitetural registrada pelas entradas finais. Não se infere execução bem-sucedida, sincronização de navegação ou origem externa do código.

## Observações

### 1. packages/container/config/webpack.prod.js:3-5; packages/container/config/webpack.prod.js:19-25

**Observação:** O ModuleFederationPlugin declara name `container`, remote `marketing@${domain}/marketing/latest/remoteEntry.js` e shared obtido das dependencies do pacote; domain vem de PRODUCTION_DOMAIN.

**Interpretação:** O host declara outra unidade e seu endereço de resolução em produção.

### 2. packages/container/config/webpack.dev.js:3-4; packages/container/config/webpack.dev.js:14-20

**Observação:** O ModuleFederationPlugin declara name `container`, remote `marketing@http://localhost:8081/remoteEntry.js` e shared com as dependencies do pacote.

**Interpretação:** O host declara marketing como destino federado em desenvolvimento.

### 3. packages/marketing/config/webpack.prod.js:3-4; packages/marketing/config/webpack.prod.js:19-26

**Observação:** O ModuleFederationPlugin declara name `marketing`, filename `remoteEntry.js`, exposes de `./MarketingApp` para `./src/bootstrap` e shared com as dependencies do pacote.

**Interpretação:** Configura a exposição federada da unidade marketing, sem nomear uma unidade consumidora.

### 4. packages/marketing/config/webpack.dev.js:4-5; packages/marketing/config/webpack.dev.js:15-22

**Observação:** O ModuleFederationPlugin declara name `marketing`, filename `remoteEntry.js`, exposes de `./MarketingApp` para `./src/bootstrap` e shared com as dependencies do pacote.

**Interpretação:** Configura o mesmo módulo exposto em desenvolvimento, sem identificar um consumidor.

### 5. packages/container/src/index.js:1

**Observação:** A entrada executa `import("./bootstrap")`, com destino no próprio pacote.

**Interpretação:** É um bootstrap assíncrono local; a revisão registra Composição No. A linha isolada não identifica mecanismo de MFE.

### 6. packages/marketing/src/index.js:1

**Observação:** A entrada executa `import("./bootstrap")`, com destino no próprio pacote.

**Interpretação:** É um bootstrap assíncrono local; a revisão registra Composição No. A linha isolada não identifica mecanismo de MFE.

### 7. packages/marketing/src/bootstrap.js:5-7; packages/marketing/src/bootstrap.js:17

**Observação:** Define mount(el), que executa ReactDOM.render de App no elemento recebido, e exporta mount.

**Interpretação:** Oferece a montagem da aplicação num elemento fornecido pelo consumidor; o código recebe esse elemento por parâmetro e não nomeia o host.

### 8. packages/container/src/components/MarketingApp.js:3-11

**Observação:** O wrapper importa mount de `marketing/MarketingApp`, chama `mount(ref.current)` dentro de useEffect e devolve o div referenciado. Só passa o elemento.

**Interpretação:** O wrapper monta a aplicação remota dentro do host. A chamada usa o mecanismo fora de uma rota e não estabelece sozinha as fronteiras de build ou deploy.

### 9. packages/container/src/components/MarketingApp.js:3

**Observação:** Importa mount pelo especificador federado `marketing/MarketingApp`.

**Interpretação:** A importação nomeia explicitamente a unidade remota consumida pelo container.

### 10. packages/auth; packages/auth/package.json:1-6

**Observação:** O diretório contém manifesto e lockfile; seu único script é test, sem código de UI, entrada ou build de aplicação registrados na revisão.

**Interpretação:** É um pacote sem unidade frontend no snapshot, apesar do nome sugerir uma área funcional.

### 11. packages/container; packages/container/package.json:1-7; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.common.js:19-21; packages/container/config/webpack.prod.js:6-29

**Observação:** O diretório tem manifesto, entrada que carrega bootstrap, montagem de App no elemento próprio, template HTML e comando build com configuração webpack própria.

**Interpretação:** Os artefatos confirmam o limite de uma aplicação frontend; a revisão registra Unidade frontend Yes.

### 12. packages/container/config; packages/container/config/webpack.common.js:1-23; packages/container/config/webpack.dev.js:1-24; packages/container/config/webpack.prod.js:1-29

**Observação:** O diretório reúne as configurações common, dev e prod usadas pelo container.

**Interpretação:** É suporte ao build do container, sem constituir aplicação separada; Unidade frontend No.

### 13. packages/dashboard; packages/dashboard/package.json:1-7

**Observação:** O diretório só tem manifesto e lockfile; start e build apontam para config/webpack.dev.js e config/webpack.prod.js, ausentes do snapshot segundo a revisão.

**Interpretação:** Scripts declarados sem entrada nem configuração existente não confirmam uma aplicação; Unidade frontend No.

### 14. packages/marketing; packages/marketing/package.json:1-7; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:5-14; packages/marketing/config/webpack.common.js:19-21; packages/marketing/config/webpack.prod.js:6-30

**Observação:** O diretório tem manifesto, entrada que carrega bootstrap, função mount, montagem própria em desenvolvimento, template HTML e build com configuração webpack própria.

**Interpretação:** Confirma o limite da aplicação frontend marketing; Unidade frontend Yes.

### 15. packages/marketing/config; packages/marketing/config/webpack.common.js:1-23; packages/marketing/config/webpack.dev.js:1-26; packages/marketing/config/webpack.prod.js:1-30

**Observação:** O diretório reúne as configurações common, dev e prod usadas pelo marketing.

**Interpretação:** É suporte ao build do marketing, sem constituir aplicação separada; Unidade frontend No.

### 16. packages/container/src/components/MarketingApp.js:3-11; packages/container/src/App.js:19; packages/container/src/bootstrap.js:5; packages/container/src/index.js:1; packages/container/config/webpack.prod.js:21-22; packages/container/config/webpack.dev.js:16-18; packages/marketing/config/webpack.prod.js:10; packages/marketing/config/webpack.prod.js:20-23; packages/marketing/config/webpack.dev.js:9; packages/marketing/config/webpack.dev.js:16-20; packages/marketing/src/bootstrap.js:5-7; packages/marketing/src/bootstrap.js:17

**Observação:** O container importa e chama mount de marketing/MarketingApp no wrapper renderizado por App. Seus remotes resolvem marketing; o destino declara esse nome e expõe MarketingApp a partir do bootstrap. Os caminhos de produção correspondem.

**Interpretação:** É uma relação ativa host → remote por Module Federation entre as duas aplicações presentes no snapshot, conforme a revisão de composição.

### 17. packages/container/package.json:3-7; packages/container/config/webpack.prod.js:6-27; .github/workflows/container.yml:8-13; .github/workflows/container.yml:30-42

**Observação:** O pacote executa build com sua configuração webpack. O workflow usa seu diretório e gatilho por caminho, constrói e sincroniza dist no prefixo /container/latest do S3; invalida index.html. A versão do manifesto é 1.0.0; a publicação usa latest.

**Interpretação:** Build separado e deploy separado confirmam o limite operacional da unidade. Bucket e distribuição vêm de secrets compartilhados; não há versionamento independente registrado nem comprovação de execução dos jobs.

### 18. packages/marketing/package.json:3-7; packages/marketing/config/webpack.prod.js:6-27; .github/workflows/marketing.yml:8-13; .github/workflows/marketing.yml:30-40

**Observação:** O pacote executa build com sua configuração webpack. O workflow usa seu diretório e gatilho por caminho, constrói e sincroniza dist no prefixo /marketing/latest do S3; invalida remoteEntry.js. A versão do manifesto é 1.0.0; a publicação usa latest.

**Interpretação:** Build separado e deploy separado confirmam o limite operacional da unidade. Bucket e distribuição vêm de secrets compartilhados; não há versionamento independente registrado nem comprovação de execução dos jobs.

### 19. README.md:3

**Observação:** O README apresenta o projeto como arquitetura de micro frontends com Webpack 5 Module Federation.

**Interpretação:** Afirma uma organização de unidades frontend pelo mecanismo nomeado.

### 20. README.md:3

**Observação:** O README identifica container como aplicação host.

**Interpretação:** Atribui ao container o papel de host na composição.

### 21. README.md:3

**Observação:** O README afirma que o container carrega a aplicação marketing, construída independentemente, em runtime.

**Interpretação:** Descreve a ligação em execução entre duas unidades com builds próprios.

### 22. README.md:3

**Observação:** O README afirma que auth e dashboard existem, mas não estão conectados ao host como micro frontends.

**Interpretação:** Distingue os pacotes sem UI das unidades que efetivamente participam da composição.

### 23. README.md:11

**Observação:** O diagrama coloca cabeçalho e layout superior no container.

**Interpretação:** Atribui ao host a responsabilidade pela moldura da página.

### 24. README.md:12

**Observação:** O diagrama identifica marketing como remote e informa a porta 8081.

**Interpretação:** Atribui à aplicação marketing o papel de remote; a porta é apenas apoio de desenvolvimento.

### 25. README.md:19

**Observação:** O README afirma que a configuração Module Federation do container declara marketing em http://localhost:8081/remoteEntry.js.

**Interpretação:** Descreve a resolução da unidade remota em desenvolvimento.

### 26. README.md:19

**Observação:** O README afirma que o container importa marketing/MarketingApp e chama mount com um elemento DOM do host.

**Interpretação:** Descreve o contrato de montagem do remote na página do host.

### 27. README.md:25

**Observação:** O README afirma que marketing expõe ./MarketingApp de src/bootstrap.js por Module Federation e exporta mount(element) para renderizar sua aplicação.

**Interpretação:** Descreve a interface exposta da unidade remota e sua montagem pelo consumidor.

### 28. README.md:25

**Observação:** O README afirma que marketing se monta em #_marketing-dev-root no desenvolvimento e pode ser aberto sozinho.

**Interpretação:** Descreve execução isolada da unidade em desenvolvimento, sem demonstrar deploy de produção.

### 29. README.md:39

**Observação:** O README afirma que Module Federation coordena o compartilhamento das dependências configuradas.

**Interpretação:** Nomeia o mecanismo de compartilhamento, sem que essa parte da frase situe unidades.

### 30. README.md:47

**Observação:** A tabela do README descreve auth como apenas metadados de pacote.

**Interpretação:** Documenta um pacote que não constitui unidade frontend no snapshot.

### 31. README.md:48

**Observação:** A tabela do README descreve dashboard como metadados, com scripts apontando para configurações webpack ausentes.

**Interpretação:** Explica o sinal enganoso dos scripts de um pacote sem aplicação.

### 32. README.md:52

**Observação:** O README afirma que cada pacote tem package.json e lockfile próprios e não há script de instalação na raiz.

**Interpretação:** Descreve a organização dos pacotes e suas fronteiras; a revisão estrutural não registra workspace.

### 33. README.md:72

**Observação:** O README orienta construir cada aplicação publicável a partir de seu próprio diretório de pacote.

**Interpretação:** Afirma a separação dos builds das duas aplicações.

### 34. README.md:82

**Observação:** O README afirma que o build de marketing emite remoteEntry.js, necessário ao host para localizar e carregar o módulo exposto.

**Interpretação:** Relaciona o artefato produzido pelo remote ao consumo pelo host.

### 35. README.md:86

**Observação:** O README afirma que cada aplicação tem configurações webpack common, dev e prod próprias em config/.

**Interpretação:** Descreve a separação das configurações de build por aplicação.

### 36. README.md:89

**Observação:** O README afirma que webpack.dev.js configura o servidor local e as URLs de Module Federation.

**Interpretação:** Descreve a configuração que permite resolver o remote em desenvolvimento.

### 37. README.md:90

**Observação:** O README afirma que webpack.prod.js habilita saída de produção e define caminhos de publicação.

**Interpretação:** Descreve os caminhos de saída de cada unidade, confirmados pelos artefatos de build e deploy.

### 38. README.md:98-101

**Observação:** O README afirma que o container usa PRODUCTION_DOMAIN para localizar marketing em ${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js.

**Interpretação:** Descreve a resolução do remote em produção; o domínio concreto fica fora do snapshot.

### 39. README.md:104

**Observação:** O README orienta publicar os assets de marketing, incluindo remoteEntry.js, no caminho configurado e o container no seu próprio caminho.

**Interpretação:** Afirma a publicação das duas unidades em destinos próprios.

### 40. README.md:104

**Observação:** O README afirma que o repositório não inclui pipeline que publique os artefatos.

**Interpretação:** É uma afirmação arquitetural contradita pelos workflows de publicação das duas aplicações, conforme a revisão documental.

### 41. README.md:108

**Observação:** O README afirma que os BrowserRouter do container e do marketing ficam aninhados na aplicação composta porque o host monta marketing dentro de seu roteador.

**Interpretação:** A conclusão sobre aninhamento na mesma árvore React é contradita pela montagem do marketing numa raiz React própria. O efeito de ambos no histórico do navegador não foi verificado.

### 42. 5d05e98 2026-09-27 (.github/workflows/container.yml); e002f80 2026-09-27 (.github/workflows/marketing.yml; .github/workflows/container.yml); c6c0dbc 2026-09-27 (README.md:104)

**Observação:** A revisão histórica registra a adição do workflow do container em 5d05e98 e do marketing em e002f80. Os dois arquivos lidos em e002f80 já contêm build, S3 sync e invalidação CloudFront. O README só é adicionado depois, em c6c0dbc.

**Interpretação:** Resultado esclarecido: a negação de pipeline não corresponde a um estágio anterior à presença dos workflows. A cronologia não demonstra execução, abandono nem a razão da afirmação.

### 43. packages/container/src/App.js:17-20; packages/marketing/src/App.js:14-19; packages/marketing/src/bootstrap.js:5-7; README.md:108

**Observação:** O ponto histórico foi resolvido pelo snapshot: o wrapper fica no BrowserRouter do host, mas mount do marketing executa ReactDOM.render numa raiz própria. Não houve consulta histórica específica para esse ponto.

**Interpretação:** A distinção entre árvore DOM e árvore React explica a contradição documental, sem exigir estágios distintos do código; o efeito no histórico do navegador permanece não verificado.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/container, Build; packages/container/config, Marcadores); 3.4.4 src-mount-call (Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos), #2 (Onde é servida); 3.4.7 #1, #2, #4, #11, #16, #20 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #11; configura #8; configura #9; configura #16 |
| 2 | 3.4.3 (packages/container/config, Marcadores); 3.4.5 #1 (Configuração); 3.4.7 #4, #7, #11, #18 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #11; configura #8; configura #9; configura #16 |
| 3 | 3.4.3 (packages/marketing, Build; packages/marketing/config, Marcadores); 3.4.4 src-mount-export (Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #6, #9, #11, #16 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #7; configura #14; configura #16 |
| 4 | 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 src-mount-export (Observação); 3.4.5 #1 (Configuração); 3.4.7 #7, #11, #18 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #7; configura #14; configura #16 |
| 5 | 3.4.4 src-async-bootstrap (packages/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 6 | 3.4.4 src-async-bootstrap (packages/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 src-mount-export | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #16 |
| 8 | 3.4.4 src-mount-call | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #16 |
| 9 | 3.4.4 src-mount-import | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #16 |
| 10 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | contexto | fraca | — |
| 11 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 13 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | contexto | fraca | — |
| 14 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #11; liga #14 |
| 17 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #11 |
| 18 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #14 |
| 19 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #11; corrobora #14; corrobora #16 |
| 20 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #16 |
| 21 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #16; corrobora #18 |
| 22 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10; corrobora #13; corrobora #1; corrobora #2 |
| 23 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/container/src/App.js:3,18; corrobora packages/container/src/components/Header.js:57-98 |
| 24 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #16 |
| 25 | 3.4.7 #7 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2; corrobora #4; corrobora #16 |
| 26 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #9 |
| 27 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3; corrobora #7 |
| 28 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/marketing/src/bootstrap.js:9-13; corrobora packages/marketing/public/index.html:9 |
| 29 | 3.4.7 #11 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4 |
| 30 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | corrobora #10 |
| 31 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | corrobora #13 |
| 32 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/container/package.json:1; corrobora packages/marketing/package.json:1; corrobora packages/auth/package.json:1; corrobora packages/dashboard/package.json:1 |
| 33 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18 |
| 34 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #1; corrobora #18 |
| 35 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #15 |
| 36 | 3.4.7 #18 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2; corrobora #4 |
| 37 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18 |
| 38 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #16 |
| 39 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18 |
| 40 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #17; contradiz #18 |
| 41 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | contradiz packages/marketing/src/bootstrap.js:5-7 |
| 42 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #17; explica #18; explica #40 |
| 43 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #41 |

## Resumo

Observações: 43. Dimensões (tecnologia: 0, configuração: 4, código: 5, estrutura: 6, composição: 1, build-deploy: 2, documentação: 23, histórico: 2). Força (forte: 4, moderada: 8, fraca: 31, ambígua: 0). Evidência (tecnológica: 6, arquitetural: 31, contexto: 6).
