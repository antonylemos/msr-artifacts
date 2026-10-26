---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
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

# 121 — dearjay22/Group2_INFO8985

## Leitura do repositório

Projeto de disciplina: um e-commerce de demonstração com microsserviços Spring Boot, Eureka, Docker Compose e duas aplicações React criadas com CRA, pensado para o GitHub Codespaces. As dimensões 1 e 2 ficam vazias. A inspeção não achou dependência de tecnologia de MFE, e nenhum arquivo de configuração citado pelas revisões declara elemento da composição: os `package.json` só têm os scripts do `react-scripts`, e o `docker-compose.yml`, os Dockerfiles, os `nginx.conf` e o workflow são deploy e CI. A porta `3001:80` do serviço `products-mf`, que a 3.4.5 cita na coluna Configuração, é publicação do Compose e fica na observação de build e deploy (#5).

As duas unidades frontend são `frontend/products-mf` e `frontend/shell-app` (#2, #3). Cada uma tem manifesto, entrada, build `react-scripts` e imagem Nginx próprios, e um serviço próprio no Compose (#5, #6).

A cadeia de composição tem um só elo, sem biblioteca de MFE:
- **Código:** na rota `/products`, o shell embute num `<iframe>` a URL `https://${codespaceName}-3001.app.github.dev`, montada a partir do host do Codespace (#1).
- **Relação:** a relação page → embedded-frontend está ativa, mas o destino fica indeterminado (#4). O único elemento da URL que aponta para uma unidade é a porta 3001, e só o Compose liga essa porta ao `products-mf` (#5). Continuam plausíveis duas leituras: o shell compõe o `products-mf`, se o mapeamento de porta for aceito como correspondência (foi o critério da classificação para Q4), ou embute um endereço do Codespace que o snapshot não liga a uma unidade. Por isso #1 fica `moderada` e #4 `ambígua`, as duas com Nota.

O `products-mf` não sabe que é embutido. Não há `postMessage`, eventos nem outro contrato entre as aplicações. Fora do Codespaces, o `src` do iframe vira `"undefined"`.

Há sinais que enganam:
- O comentário logo acima da URL diz que ela é a do API Gateway na porta 8080, mas o código usa a porta do `products-mf` (#11).
- O README diz que os microfrontends funcionam com os backends, mas o código ativo das duas aplicações não chama backend: o `products-mf` lê um `products.json` local (#10).
- O histórico não esclarece nenhum dos dois pontos, porque as versões antigas dos arquivos não estão no clone (#12, #13). As dúvidas são só sobre o passado; o snapshot é claro.

As afirmações do README sobre os microfrontends, o shell com o Products Microfrontend e a resolução automática da URL no Codespaces (#7, #8, #9) são confirmadas pelas unidades, pelo deploy separado e pelo código do iframe. Nenhuma delas confirma o destino do iframe.

## Observações

### 1. frontend/shell-app/src/App.js:32; frontend/shell-app/src/App.js:31; frontend/shell-app/src/App.js:6-18; frontend/shell-app/src/index.js:4-12

**Observação:** `<iframe src= {`${getApiUrl()}`} title="Products Microfrontend">`, renderizado quando `window.location.pathname === "/products"` (linhas 4 e 31-36). `getApiUrl()` só devolve uma URL quando o host é `*.app.github.dev`: extrai o nome do Codespace e monta `https://${codespaceName}-3001.app.github.dev` (linhas 8-14). Nos demais casos não há `return`. O `App` é renderizado pela entrada do shell (frontend/shell-app/src/index.js:4-12).

**Interpretação:** O shell embute por iframe, numa rota própria, a aplicação servida na porta 3001 do Codespace. O mecanismo é usado, mas a linha não nomeia a unidade de destino.

**Nota:** Força `moderada`, fora da orientação de rota com Composição `Yes` (`forte`). A URL só traz a porta 3001, e a 3.4.5 deixou o destino `Undetermined` porque porta sozinha não basta (3.4.5 #1). A linha mostra o mecanismo usado numa rota, sem estabelecer sozinha a unidade embutida.

### 2. frontend/products-mf; frontend/products-mf/package.json:17; frontend/products-mf/src/index.js:7-12; frontend/products-mf/public/index.html:31; frontend/products-mf/Dockerfile:1-12; docker-compose.yml:66-69

**Observação:** Diretório com `package.json` próprio, entrada CRA (`ReactDOM.createRoot` renderiza `App`) e template com `<div id="root">`. O build é `react-scripts build`, sem arquivo de configuração próprio. Tem Dockerfile com build e publicação em Nginx, e o serviço `products-mf` do Compose, construído de `./frontend/products-mf`, na porta `3001:80`.

**Interpretação:** É uma unidade frontend com limite próprio de código, build e imagem.

### 3. frontend/shell-app; frontend/shell-app/package.json:17; frontend/shell-app/src/index.js:7-12; frontend/shell-app/public/index.html:31; frontend/shell-app/Dockerfile:1-12; docker-compose.yml:59-62

**Observação:** Diretório com `package.json` próprio, entrada CRA (`ReactDOM.createRoot` renderiza `App`) e template com `<div id="root">`. O build é `react-scripts build`, sem arquivo de configuração próprio. Tem Dockerfile com build e publicação em Nginx, e o serviço `shell-app` do Compose, construído de `./frontend/shell-app`, na porta `3000:80`.

**Interpretação:** É uma unidade frontend com limite próprio, e é a que contém o iframe (#1).

### 4. frontend/shell-app/src/App.js:32; frontend/shell-app/src/App.js:10-14; docker-compose.yml:66-69

**Observação:** O `frontend/shell-app` embute por iframe `https://${codespaceName}-3001.app.github.dev`, na rota `/products`. A relação tem No snapshot `Undetermined` e Ativa `Yes`. O Compose publica na porta 3001 o serviço construído de `./frontend/products-mf`. Fora do Codespaces o `src` fica `"undefined"`.

**Interpretação:** É uma relação page → embedded-frontend ativa, com destino indeterminado. Continuam plausíveis duas leituras: o shell compõe o `frontend/products-mf`, se o mapeamento de porta do Compose for aceito como correspondência, ou embute um endereço do Codespace que o snapshot não liga a uma unidade.

**Nota:** Força `ambígua`, fora da orientação de Ativa `Yes` (`forte`). A relação está ativa, mas a 3.4.5 registrou o destino como a URL, com No snapshot `Undetermined`, e descreveu as duas leituras acima. A observação não liga diretamente duas unidades.

### 5. frontend/products-mf/package.json:17; frontend/products-mf/Dockerfile:1-12; frontend/products-mf/nginx.conf:1-11; docker-compose.yml:66-71; .github/workflows/ci.yml:18-19, 31-32

**Observação:** O `react-scripts build` roda dentro da imagem da própria aplicação, e a saída é copiada para uma imagem `nginx:alpine` com fallback para `index.html`. O serviço `products-mf` do Compose publica a aplicação na porta 3001 do host. O CI constrói e sobe todos os serviços do Compose no próprio runner, sem publicar nada fora dele. O `version: "0.1.0"`, com `private: true`, não é usado em nenhuma publicação.

**Interpretação:** O `products-mf` tem build e deploy separados, como imagem e serviço próprios. A porta 3001 é a que o shell usa na URL do iframe (#1).

### 6. frontend/shell-app/package.json:17; frontend/shell-app/Dockerfile:1-12; frontend/shell-app/nginx.conf:1-11; docker-compose.yml:59-64; .github/workflows/ci.yml:18-19, 31-32

**Observação:** O mesmo arranjo do `products-mf`: `react-scripts build` dentro da imagem própria, Nginx com fallback para `index.html` e o serviço `shell-app` na porta 3000 do host. O Dockerfile e o `nginx.conf` são cópias dos do `products-mf`, sem proxy para ele. Não há versionamento usado na publicação.

**Interpretação:** O shell tem build e deploy separados, e alcança o `products-mf` direto pela porta dele, não pelo próprio servidor.

### 7. README.md:2

**Observação:** "Running on **GitHub Codespaces** with **Docker Compose**, **Spring Boot**, **Eureka**, and **Microfrontends**"

**Interpretação:** Afirma que o projeto roda no Codespaces com Docker Compose e tem microfrontends. As duas unidades com build e deploy separados (#2, #3, #5, #6) e o iframe do shell, escrito para o Codespaces (#1), confirmam a afirmação. Spring Boot e Eureka são dos backends.

### 8. README.md:13

**Observação:** "**Frontend (Shell App + Products Microfrontend)**"

**Interpretação:** Afirma um frontend formado por um shell e um microfrontend de produtos. As duas unidades têm esses nomes (#2, #3), e o shell embute outra aplicação no iframe intitulado "Products Microfrontend" (#1). A afirmação é corroborada.

### 9. README.md:16

**Observação:** "Everything runs in **GitHub Codespaces**, automatically resolving internal service URLs."

**Interpretação:** No frontend, a única URL resolvida automaticamente é a do iframe, montada a partir do host do Codespace (#1). A afirmação é corroborada, e a resolução só acontece no Codespaces, como a frase diz.

### 10. README.md:107

**Observação:** "View frontend microfrontends working with backend services"

**Interpretação:** Afirma que as aplicações frontend funcionam com os backends. O código ativo das duas não chama backend: o `products-mf` monta a tabela com o `products.json` local (frontend/products-mf/src/App.js:2, 7-9), e o `ProductList.js`, que chamaria o gateway, não é importado. A afirmação é contradita.

### 11. frontend/shell-app/src/App.js:13

**Observação:** O comentário "Construct API Gateway URL (port 8080)", logo acima da linha que monta a URL do iframe com a porta 3001.

**Interpretação:** Diz que o iframe aponta para o API Gateway. O código monta a porta 3001 (#1), e o Compose publica o gateway na 8080 (docker-compose.yml:45-52). A afirmação é contradita.

### 12. ebce825 2025-12-02 (frontend/shell-app/src/App.js); b3e4f84 2025-12-05 (frontend/shell-app/src/App.js); 20fcc0c 2025-12-06 (frontend/shell-app/src/App.js); 3b6d2f0 2025-12-07 (frontend/shell-app/src/App.js); 15495fb 2025-12-07 (docker-compose.yml)

**Observação:** O `App.js` do shell é criado em `ebce825` e muda em `b3e4f84`, `20fcc0c` e `3b6d2f0`. O objeto de `3b6d2f0` é o do snapshot, então o comentário da porta 8080 e a URL com a porta 3001 estão juntos ao menos desde esse commit. O `docker-compose.yml` muda pela última vez em `15495fb`. As versões anteriores dos dois arquivos não estão no clone.

**Interpretação:** O histórico não diz se o comentário é resto de um estágio em que o iframe apontava para o gateway, nem desde quando o `products-mf` está na porta 3001. O ponto é inconclusivo, e a dúvida é só sobre o passado: no snapshot, a URL usa a porta 3001.

### 13. ebce825 2025-12-02 (frontend/products-mf/src/ProductList.js, frontend/products-mf/src/App.js); 20fcc0c 2025-12-06 (frontend/products-mf/src/ProductList.js); 3b6d2f0 2025-12-07 (frontend/products-mf/src/products.json, frontend/products-mf/src/App.js); 9f51b10 2025-12-07 (frontend/products-mf/src/ProductList.js)

**Observação:** O `ProductList.js` é criado em `ebce825`, junto com o `App.js` do `products-mf`, e muda em `20fcc0c` e `9f51b10`. O `products.json` é criado em `3b6d2f0` ("Fix product endpoint"), que também altera o `App.js`. As versões antigas dos arquivos não estão no clone.

**Interpretação:** É compatível com a troca de uma chamada ao backend por dados locais, mas o histórico não diz se a ligação ao backend foi abandonada ou nunca chegou a ser conectada. O ponto é inconclusivo, e a dúvida é só sobre o passado: no snapshot, o `products-mf` não chama backend.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (frontend/shell-app/src/App.js:32) | 3 código | código-fonte | iframe | arquitetural | moderada | implementa #4 |
| 2 | 3.4.3 (frontend/products-mf) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 3 | 3.4.3 (frontend/shell-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 4 | 3.4.5 #1 | 5 composição | código-fonte | iframe | arquitetural | ambígua | liga #3 |
| 5 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #2 |
| 6 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #3 |
| 7 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #5; corrobora #6 |
| 8 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3 |
| 9 | 3.4.7 #3 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #1 |
| 10 | 3.4.7 #4 | 7 documentação | documentação | — | contexto | fraca | contradiz frontend/products-mf/src/App.js:2, 7-9 |
| 11 | 3.4.7 #5 | 7 documentação | comentário | — | contexto | fraca | contradiz #1 |
| 12 | 3.4.8 #1 | 8 histórico | histórico | iframe | arquitetural | fraca | explica #1; explica #4; explica #11 |
| 13 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #10 |

## Resumo

Observações: 13. Dimensões (tecnologia: 0, configuração: 0, código: 1, estrutura: 2, composição: 1, build-deploy: 2, documentação: 5, histórico: 2). Força (forte: 0, moderada: 5, fraca: 7, ambígua: 1). Evidência (tecnológica: 1, arquitetural: 9, contexto: 3).
