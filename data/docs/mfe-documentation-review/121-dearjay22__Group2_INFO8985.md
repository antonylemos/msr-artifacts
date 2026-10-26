---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
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

# 121 — dearjay22/Group2_INFO8985

## Leitura do repositório

A documentação do projeto é o README.md da raiz, em inglês. Ele apresenta um e-commerce de demonstração com microsserviços Spring Boot, Eureka, API Gateway, Prometheus e Grafana, e um frontend formado por um shell e um "Products Microfrontend" (README.md:1-14), tudo pensado para o GitHub Codespaces (README.md:2, 16). Os outros dois arquivos `documentation` do `artifacts.csv`, frontend/products-mf/README.md e frontend/shell-app/README.md, são o README padrão do Create React App, idênticos entre si (frontend/shell-app/README.md:1-3) e sem afirmação sobre o projeto; não viram linha.

No que diz das unidades frontend, o README confere com as revisões anteriores: duas aplicações React, um shell e o products-mf, cada uma com imagem e serviço próprios no Compose, e o shell embutindo uma URL do Codespace num iframe. Destoa em dois pontos que viram linha: diz que os microfrontends funcionam com os serviços de backend, mas o código ativo das duas aplicações não chama backend (#4); e um comentário do shell diz que a URL do iframe é a do API Gateway, enquanto o código monta a porta do products-mf (#5).

O `matches.csv` tem quatro ocorrências `doc-mfe-term`. A de README.md:2 está na linha 1 da tabela, a de README.md:13 na linha 2 e a de README.md:107 na linha 4. A de README.md:70 é um título ("Products Microfrontend") acima de um comando de execução, sem afirmação; ela é citada no parágrafo da linha 2.

Não viraram linha, por serem só sobre backends, monitoramento ou instalação: a lista de serviços de backend e monitoramento (README.md:7-12, 14), os pré-requisitos (README.md:20-26) e a configuração do Eureka com a frase "You do **not** hardcode the gateway or discovery URL anywhere" (README.md:94-100), que se refere à URL do Eureka dos backends. No frontend, o único endereço fixo do gateway é o valor padrão `http://api-gateway:8080` de frontend/products-mf/src/ProductList.js:3, arquivo que nenhum outro importa (revisão de código-fonte, Notas). As instruções de execução também não viraram linha, mas não conferem com o snapshot. O README manda subir os "backend services" com `docker-compose up --build` e lista só backends e monitoramento (README.md:32-46), mas o mesmo Compose também constrói e publica o shell e o products-mf (docker-compose.yml:56-71) e põe o Grafana na porta 3030, não na 3000 (docker-compose.yml:110; README.md:46, 86). Manda entrar em `shell-app` e `products-mf` a partir da raiz (README.md:54, 57, 66, 72), mas as pastas ficam em `frontend/`. Manda rodar `npm run dev` (README.md:67, 73), script que não existe nos dois `package.json`, que só têm `start`, `build`, `test` e `eject` (frontend/shell-app/package.json:15-20; frontend/products-mf/package.json:15-20). E dá as portas 5173 e 4173 para o shell e o products-mf (README.md:82-83), números que não aparecem em nenhum outro arquivo do snapshot; o Compose publica as duas nas portas 3000 e 3001 (docker-compose.yml:62, 69). A revisão de build e deploy já registrou essas divergências na Leitura dela.

Comentários e campos descritivos lidos: os cabeçalhos de seção do docker-compose.yml (por exemplo `# FRONTEND`, docker-compose.yml:56-58), sem afirmação; os Dockerfiles, os `nginx.conf` e o .github/workflows/ci.yml das revisões anteriores, sem comentários; os `package.json`, sem `description` (frontend/shell-app/package.json:1-4; frontend/products-mf/package.json:1-4); a `meta description` dos `index.html`, padrão do CRA ("Web site created using create-react-app", frontend/shell-app/public/index.html:8-11); os comentários do CRA em `src/index.js` (frontend/shell-app/src/index.js:14-16; frontend/products-mf/src/index.js:14-16); e os comentários de frontend/shell-app/src/App.js:7, 9, 13, dos quais só o da linha 13 faz afirmação (#5).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:2 | "Running on **GitHub Codespaces** with **Docker Compose**, **Spring Boot**, **Eureka**, and **Microfrontends**" | build-deploy | corroborada | 3.4.3 (frontend/products-mf e frontend/shell-app `Yes`); 3.4.4 (src-iframe, Composição `Yes`); 3.4.5 #1; 3.4.6 #1, #2; docker-compose.yml:59-71; frontend/shell-app/src/App.js:8-14 |
| 2 | README.md:13 | "**Frontend (Shell App + Products Microfrontend)**" | estrutura | corroborada | 3.4.3; 3.4.5 #1; frontend/shell-app/src/App.js:31-36 |
| 3 | README.md:16 | "automatically resolving internal service URLs" | composição | corroborada | 3.4.5 #1; frontend/shell-app/src/App.js:6-15 |
| 4 | README.md:107 | "View frontend microfrontends working with backend services" | outro | contradita | 3.4.4 (Notas); frontend/products-mf/src/App.js:2, 7-9; frontend/products-mf/src/ProductList.js:3, 10; frontend/shell-app/src/App.js:1-45 |
| 5 | frontend/shell-app/src/App.js:13 | "Construct API Gateway URL (port 8080)" (a URL do iframe é a do API Gateway) | composição | contradita | 3.4.5 #1; frontend/shell-app/src/App.js:14; docker-compose.yml:45-52, 66-69 |

## Observações

**1. README.md:2.** O Compose declara um serviço para cada aplicação frontend, construído do diretório dela (docker-compose.yml:59-71), e a revisão de build e deploy registrou deploy separado para as duas por esse caminho. O snapshot não tem configuração de Codespaces (`.devcontainer`), mas o shell foi escrito para esse ambiente: só monta a URL do iframe quando o host termina em `app.github.dev` (frontend/shell-app/src/App.js:8-14). A parte sobre Codespaces se repete em README.md:16 ("Everything runs in **GitHub Codespaces**"). Spring Boot e Eureka são dos backends e não dizem nada sobre as unidades frontend. Quanto a "Microfrontends", há duas unidades frontend com manifesto, entrada, build e imagem próprios (3.4.3), e o shell embute outra aplicação num iframe (3.4.4; 3.4.5 #1). A revisão de composição deixou o destino do iframe como `Undetermined`, porque só a porta 3001 liga a URL ao products-mf; isso limita a ligação entre as duas, não a existência de unidades separadas. O termo volta em README.md:107 ("frontend microfrontends"), cuja outra parte é a linha 4. A frase não se divide, porque as duas partes são confirmadas; o Tema é o da primeira propriedade que ela menciona, a execução no Codespaces com Docker Compose.

**2. README.md:13.** As duas unidades têm os nomes da frase (`shell-app` e `products-mf`, frontend/shell-app/package.json:2; frontend/products-mf/package.json:2). O papel de shell se confirma: a aplicação tem navegação e embute outra no iframe da rota `/products`, com título "Products Microfrontend" (frontend/shell-app/src/App.js:26-36). O products-mf não sabe que é embutido: não tem código de composição nem de comunicação (3.4.4, Notas). Os mesmos nomes voltam nos títulos dos comandos (README.md:64, 70) e na tabela de acesso, como "Main Frontend (Shell)" e "Products MF" (README.md:82-83).

**3. README.md:16.** No frontend, a única URL resolvida automaticamente é a do iframe: o shell extrai o nome do Codespace do próprio host e monta `https://${codespaceName}-3001.app.github.dev` (frontend/shell-app/src/App.js:10-14), sem endereço fixo. A resolução só acontece no Codespaces, como a frase diz; fora dele `getApiUrl()` não retorna nada e o `src` vira `"undefined"` (frontend/shell-app/src/App.js:6-18, 33). README.md:92 ("Codespaces exposes public URLs automatically") dá a mesma explicação.

**4. README.md:107.** O código ativo das duas aplicações não chama nenhum serviço de backend. O products-mf monta a tabela com o `products.json` local (frontend/products-mf/src/App.js:2, 7-9). O shell só tem navegação e o iframe (frontend/shell-app/src/App.js:1-45), e o nginx dele não encaminha nada (frontend/shell-app/nginx.conf:8-10). O único código frontend que chamaria o gateway é o `fetch` de frontend/products-mf/src/ProductList.js:3, 10, e esse componente não é importado (3.4.4, Notas). Os backends existem e sobem no mesmo Compose, mas nenhum artefato liga as unidades a eles. A parte "frontend microfrontends" se confirma (linha 1); a parte "working with backend services" é desmentida, e a afirmação é `contradita`.

**5. frontend/shell-app/src/App.js:13.** O comentário está logo acima da linha que monta a URL do iframe, mas a URL usa a porta 3001 (frontend/shell-app/src/App.js:14). O Compose publica o API Gateway na 8080 (docker-compose.yml:45-52) e o products-mf na 3001 (docker-compose.yml:66-69). O nome da função, `getApiUrl` (frontend/shell-app/src/App.js:6), repete a ideia do comentário. A revisão de composição já apontou a diferença na Leitura dela. Pelo código, o shell embute a aplicação da porta 3001, não o gateway.

## Resumo

Afirmações: 5 (corroborada: 3, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 1, composição: 2, build-deploy: 1, outro: 1).
