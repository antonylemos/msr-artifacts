---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Leitura do repositório

O snapshot contém duas unidades frontend React: `packages/container` e `packages/marketing`, com entradas e builds próprios (#11, #14). As configurações do container declaram o marketing como remote de Module Federation em desenvolvimento e produção (#1, #2); as do marketing expõem seu bootstrap como `./MarketingApp` e compartilham as dependências do pacote (#3, #4). O bootstrap exporta `mount(el)` (#7), importado e chamado pelo wrapper do container (#8, #9). Essa cadeia materializa uma relação ativa host → remote (#16), sem props ou callbacks passados ao remoto na chamada observada.

Os builds e workflows próprios publicam artefatos separados em prefixos `container/latest` e `marketing/latest` do S3, com invalidações no CloudFront (#17, #18). Os caminhos fixos não registram versões independentes. O domínio de produção vem de um secret cujo valor não está no snapshot; isso não impede resolver a unidade de destino pelo nome federado, pelo módulo exposto e pelo caminho de publicação (#2, #4, #16, #18).

Os bootstraps assíncronos locais não compõem unidades sozinhos (#5, #6). `auth` e `dashboard` têm apenas manifesto e lockfile, sem entrada nem build (#10, #13); os diretórios `config` pertencem às duas aplicações e não constituem unidades adicionais (#12, #15). Os comentários descrevem a execução isolada em desenvolvimento e a exportação para o container, ambas corroboradas (#19, #20). A 3.4.2 não tem linhas de dependência das tecnologias inspecionadas, e a 3.4.8 não tem pontos: essas dimensões não geram observações. Não há ambiguidade arquitetural registrada nas entradas finais.

## Observações

### 1. packages/container/config/webpack.dev.js:16-22

**Observação:** O `ModuleFederationPlugin` usa `name: "container"`, declara `marketing` em `marketing@http://localhost:8081/remoteEntry.js` e define `shared: packageJson.dependencies`.

**Interpretação:** A configuração de desenvolvimento liga o host container ao remote marketing por Module Federation.

### 2. packages/container/config/webpack.prod.js:6; packages/container/config/webpack.prod.js:15-21

**Observação:** O plugin nomeia `container`, declara o remote `marketing` como `marketing@${domain}/marketing/latest/remoteEntry.js` e compartilha `packageJson.dependencies`. `domain` vem de `process.env.PRODUCTION_DOMAIN`.

**Interpretação:** A configuração de produção liga o host ao marketing por um endereço de remote parametrizado pelo domínio do ambiente.

### 3. packages/marketing/config/webpack.dev.js:16-23

**Observação:** O plugin nomeia `marketing`, gera `remoteEntry.js`, expõe `./MarketingApp` apontando para `./src/bootstrap` e define `shared: packageJson.dependencies`.

**Interpretação:** O mecanismo de federação é configurado no marketing para disponibilizar seu bootstrap, sem nomear um consumidor nesse bloco.

### 4. packages/marketing/config/webpack.prod.js:13-20

**Observação:** A configuração de produção declara `name: "marketing"`, `filename: "remoteEntry.js"`, a exposição de `./MarketingApp` a partir de `./src/bootstrap` e o compartilhamento de `packageJson.dependencies`.

**Interpretação:** O marketing oferece seu bootstrap como módulo federado de produção; o bloco configura uma unidade e não declara outra unidade consumidora.

### 5. packages/container/src/index.js:1; packages/container/src/bootstrap.js:1-5

**Observação:** A entrada executa `import('./bootstrap')`; o bootstrap local importa a App do container e a renderiza em `#root`.

**Interpretação:** Há carregamento assíncrono local, um sinal tecnológico isolado que não estabelece ligação entre unidades nem identifica sozinho o mecanismo MFE.

### 6. packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:1-22

**Observação:** A entrada executa `import('./bootstrap')`, apontando para o bootstrap do próprio marketing.

**Interpretação:** O carregamento assíncrono permanece interno à unidade; sozinho não estabelece composição nem identifica a tecnologia MFE.

### 7. packages/marketing/src/bootstrap.js:6-8; packages/marketing/src/bootstrap.js:22

**Observação:** `mount(el)` chama `ReactDOM.render(<App />, el)` e é exportada pelo bootstrap.

**Interpretação:** A função oferece montagem da aplicação num elemento recebido. A construção prepara a integração, mas não nomeia o consumidor nem estabelece sozinha a organização entre unidades.

### 8. packages/container/src/components/MarketingApp.js:1-11

**Observação:** O wrapper importa `mount` de `marketing/MarketingApp`, cria um `ref`, chama `mount(ref.current)` em `useEffect` e retorna o `div` associado. A chamada não passa outro argumento.

**Interpretação:** O container usa o mecanismo de montagem do remoto num elemento próprio. A chamada não é rota nem registro que nomeie o destino; participa da relação cuja resolução federada aparece nas configurações.

### 9. packages/container/src/components/MarketingApp.js:1; packages/container/src/components/MarketingApp.js:8

**Observação:** O código importa o símbolo `mount` de `marketing/MarketingApp` e o utiliza em `mount(ref.current)`.

**Interpretação:** O import consome um módulo federado; prepara a montagem que implementa a relação, sem constituir por si uma rota ou registro de aplicação.

### 10. packages/auth; packages/auth/package.json:1-29

**Observação:** O diretório contém manifesto e lockfile. O manifesto nomeia `auth` e só declara o script `test` padrão nas linhas 4-6; a revisão não registra entrada nem build.

**Interpretação:** O pacote não constitui unidade frontend implementada no snapshot. Seu nome e suas dependências são contexto, insuficientes para contar outra aplicação.

### 11. packages/container; packages/container/package.json:4-7; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.common.js:19-23; packages/container/config/webpack.dev.js:7-29; packages/container/config/webpack.prod.js:8-25

**Observação:** O container tem entrada que carrega o bootstrap, montagem React em `#root`, template HTML e scripts `start` e `build` que selecionam suas configurações webpack.

**Interpretação:** Entrada e build próprios confirmam o limite de uma unidade frontend. Esse limite isoladamente não liga a aplicação a outra unidade.

### 12. packages/container/config; packages/container/config/webpack.common.js:1-24; packages/container/config/webpack.dev.js:1-29; packages/container/config/webpack.prod.js:1-25

**Observação:** O diretório reúne as configurações comum, de desenvolvimento e de produção usadas pelo build do container; não tem entrada ou build próprios de outra aplicação na tabela de estrutura.

**Interpretação:** Trata-se de organização interna do build do container, sem unidade frontend adicional.

### 13. packages/dashboard; packages/dashboard/package.json:1-33

**Observação:** O diretório contém manifesto e lockfile. O manifesto nomeia `dashboard` e só tem o script `test` padrão nas linhas 4-6; a revisão não registra entrada nem build.

**Interpretação:** O pacote não confirma outra unidade frontend; as declarações de dependências não demonstram aplicação implementada.

### 14. packages/marketing; packages/marketing/package.json:4-7; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:12-17; packages/marketing/config/webpack.dev.js:7-30; packages/marketing/config/webpack.prod.js:6-24

**Observação:** O marketing tem entrada que carrega seu bootstrap, montagem isolada de desenvolvimento em `#_marketing-dev-root`, template HTML na configuração de desenvolvimento e scripts próprios para suas configurações webpack de desenvolvimento e produção.

**Interpretação:** A entrada e o build confirmam uma segunda unidade frontend. A execução isolada registrada é a de desenvolvimento.

### 15. packages/marketing/config; packages/marketing/config/webpack.common.js:1-17; packages/marketing/config/webpack.dev.js:1-30; packages/marketing/config/webpack.prod.js:1-24

**Observação:** O diretório reúne as configurações webpack usadas pelo marketing; não tem entrada ou build próprios de outra aplicação na revisão de estrutura.

**Interpretação:** É um diretório interno da unidade marketing, sem constituir uma terceira aplicação.

### 16. packages/container/src/components/MarketingApp.js:1-11; packages/container/src/App.js:10-11; packages/container/config/webpack.dev.js:18-20; packages/container/config/webpack.prod.js:17-19; packages/marketing/config/webpack.dev.js:17-21; packages/marketing/config/webpack.prod.js:14-18; packages/marketing/src/bootstrap.js:6-8; packages/marketing/src/bootstrap.js:22

**Observação:** O container declara o remote `marketing`, importa `marketing/MarketingApp` e chama sua função `mount` num wrapper renderizado pela App. O marketing declara esse nome e expõe `./MarketingApp` apontando para o bootstrap que exporta `mount`.

**Interpretação:** Há relação ativa host → remote por Module Federation entre as duas unidades presentes no snapshot. A correspondência entre declaração, exposição e consumo resolve o destino marketing.

### 17. packages/container/package.json:3-7; packages/container/config/webpack.prod.js:6-25; packages/container/config/webpack.common.js:19-23; .github/workflows/container.yml:1-35

**Observação:** O script de build seleciona a configuração de produção do container, cujo `publicPath` é `/container/latest/`; a configuração comum gera `index.html`. O workflow reage a mudanças em `packages/container/**`, instala e compila nesse diretório, recebe `PRODUCTION_DOMAIN` por secret, sincroniza `dist` para `container/latest` no S3 e invalida `/container/latest/index.html` no CloudFront. A versão `1.0.0` do manifesto não aparece no destino.

**Interpretação:** O container tem build e deploy separados, delimitando seu artefato de publicação. O caminho fixo não implementa versionamento independente; o endereço do remote fica parametrizado no build.

### 18. packages/marketing/package.json:3-7; packages/marketing/config/webpack.prod.js:6-24; packages/container/config/webpack.prod.js:18; .github/workflows/marketing.yml:1-33

**Observação:** O script de build seleciona a configuração de produção do marketing, com `publicPath: "/marketing/latest/"` e geração de `remoteEntry.js`. O workflow reage a mudanças em `packages/marketing/**`, instala e compila nesse diretório, sincroniza `dist` para `marketing/latest` no S3 e invalida `/marketing/latest/remoteEntry.js` no CloudFront. O container usa esse caminho para o remote; a versão `1.0.0` do manifesto não aparece na publicação.

**Interpretação:** O marketing possui build e deploy separados dos do container, publicado como remote de produção. O prefixo `latest` permite substituir seu artefato sem versionamento independente no caminho.

### 19. packages/marketing/src/bootstrap.js:10-11

**Observação:** O comentário afirma que, em desenvolvimento e isoladamente, a aplicação deve chamar `mount` imediatamente.

**Interpretação:** A afirmação descreve a capacidade de executar o marketing isoladamente em desenvolvimento, corroborada pela entrada da unidade e pelo ramo de montagem local. É evidência semântica de independência, sem configurar ou realizar a composição por si.

### 20. packages/marketing/src/bootstrap.js:20-21

**Observação:** O comentário afirma que a aplicação está sendo executada através do container e deve exportar a função `mount`.

**Interpretação:** O texto descreve o papel do marketing como aplicação montada pelo container, corroborado pela exportação, exposição e consumo. A afirmação sozinha não implementa essa relação.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (src-mount-call, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #8; configura #9; configura #11; configura #16 |
| 2 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (src-mount-call, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.6 #2 (Onde é servida) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #8; configura #9; configura #11; configura #16 |
| 3 | 3.4.3 (packages/marketing, Entrada e Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (src-mount-export, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #7; configura #14; configura #16 |
| 4 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (src-mount-export, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos e Onde é servida); 3.4.7 #2 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #7; configura #14; configura #16 |
| 5 | 3.4.4 (src-async-bootstrap, packages/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 6 | 3.4.4 (src-async-bootstrap, packages/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 (src-mount-export, packages/marketing/src/bootstrap.js:22) | 3 código | código-fonte | — | tecnológica | moderada | implementa #16 |
| 8 | 3.4.4 (src-mount-call, packages/container/src/components/MarketingApp.js:8) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #16 |
| 9 | 3.4.4 (src-mount-import, packages/container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #16 |
| 10 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | contexto | fraca | — |
| 11 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 13 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | contexto | fraca | — |
| 14 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #11; liga #14 |
| 17 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #11 |
| 18 | 3.4.6 #2 | 6 build-deploy | CI | module-federation | arquitetural | moderada | publica #14 |
| 19 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #14; corrobora packages/marketing/src/bootstrap.js:12-17; corrobora packages/marketing/public/index.html:5 |
| 20 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #7; corrobora #4; corrobora #9; corrobora #8; corrobora #16 |

## Resumo

Observações: 20. Dimensões (tecnologia: 0, configuração: 4, código: 5, estrutura: 6, composição: 1, build-deploy: 2, documentação: 2, histórico: 0). Força (forte: 3, moderada: 9, fraca: 8, ambígua: 0). Evidência (tecnológica: 5, arquitetural: 11, contexto: 4).
