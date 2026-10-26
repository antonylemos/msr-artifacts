---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Leitura do repositório

A documentação é o README da raiz, em inglês: estrutura das pastas, como rodar as duas aplicações e uma das duas configurações do Kong, os endereços de acesso e uma lista de "Features" (README.md:1-55). Os comentários mais informativos estão no carregador de módulos do shell, que se apresenta como um "Module Federation Loader with caching, retry logic, and error handling" (shell/src/moduleLoader.ts:1).

Foram lidos os artefatos que as revisões anteriores citam:
- as configurações Vite e os `package.json` e `index.html` das duas aplicações;
- `shell/src/main.tsx`, `shell/src/router.tsx` e `shell/src/moduleLoader.ts`;
- `shop/src/main.tsx` e `shop/src/routes/ShopRoutes.tsx`;
- os arquivos de `kong-shell/` e `kong-remote/`.

Os comentários do Kong e do script de TLS tratam de portas e certificados e ficaram fora da tabela. Também ficou fora o comentário que prevê outros módulos ("Add more modules as needed", shell/src/router.tsx:54-56), uma possibilidade, e não um fato do snapshot.

Os endereços de acesso do README (README.md:46-49) usam a porta 8000. É a porta do `kong-remote`, mas o `kong-shell` publica na 8080 (ver a revisão de build e deploy). Como porta é detalhe de infraestrutura, o ponto ficou fora da tabela.

A documentação confere com as revisões anteriores na estrutura e no uso do Kong. Dois pontos destoam:
- **Rotas do remote:** o README diz que as sub-rotas do remote entram por Module Federation, mas o shell lê um export que o shop não tem.
- **Retentativas:** o carregador diz ter "retry logic", mas as retentativas aguardam de novo a mesma promessa e não refazem a importação.

Ocorrências `doc-*` que não viraram linha: README.md:41, título da opção "Shell + standalone remote", repetição da afirmação 3. As demais estão nas afirmações 1, 2 e 5.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:1 | "Microfrontend Monorepo with Vite, TanStack Router, and Module Federation" | estrutura | corroborada | 3.4.3 (shell e shop `Yes`); 3.4.2 (module-federation configurado) |
| 2 | README.md:7-8 | "shell/ # Host app with layout & routing / shop/ # Remote microfrontend exposing routes" | estrutura | corroborada | 3.4.5 #1; shop/vite.config.ts:10-12 |
| 3 | README.md:9-10 | "kong-shell/ # Kong config for layout-controlled routing / kong-remote/ # Kong config for standalone remote access" (um gateway só com o shell, outro que também expõe o remote sozinho) | build-deploy | corroborada | 3.4.6 (Leitura); kong-shell/kong.yml:3-9; kong-remote/kong.yml:8-13 |
| 4 | README.md:53 | "Shared layout with always-visible NavBar" (o shell dá o layout comum) | composição | corroborada | shell/src/router.tsx:19-25 |
| 5 | README.md:54 | "Remote subroutes via Module Federation" (as sub-rotas do remote entram no shell) | composição | contradita | 3.4.5 #1 (Leitura); shell/src/router.tsx:61-68; shop/src/routes/ShopRoutes.tsx:49-53 |
| 6 | shell/src/moduleLoader.ts:1 | "Module Federation Loader with caching, […] and error handling" (o carregador tem cache e tratamento de erro) | composição | corroborada | shell/src/moduleLoader.ts:33-40, 49-53, 61-74, 134 |
| 7 | shell/src/moduleLoader.ts:1 | "retry logic" (o carregador tenta de novo quando a carga falha) | composição | contradita | 3.4.5 #1 (Leitura); shell/src/moduleLoader.ts:42-47, 130 |

## Observações

**1. README.md:1.** São duas aplicações Vite independentes no mesmo repositório, sem workspace, e "monorepo" está no sentido amplo. O shell usa TanStack Router e as duas usam `@originjs/vite-plugin-federation`.

**2. README.md:7-8.** O shell é o host e tem o roteador. O shop expõe `./ShopRoutes`.

**3. README.md:9-10.** O `kong-shell` encaminha tudo para o shell (kong-shell/kong.yml:3-9). O `kong-remote` acrescenta a rota `/shop` para o servidor do shop (kong-remote/kong.yml:8-13), o que permite abrir o remote sozinho. Os dois só encaminham para servidores locais, como registrou a revisão de build e deploy. Repetições: README.md:36-44 e README.md:55 ("Two Kong setups for flexible architecture").

**4. README.md:53.** A rota raiz do shell renderiza `NavBar` e `Outlet` (shell/src/router.tsx:19-25), e as rotas do remote seriam filhas dela.

**5. README.md:54.** O shell importa o módulo remoto e tenta encaixar `default.routes` na árvore (shell/src/router.tsx:52-68). O shop, porém, exporta `routes` só por nome, e a revisão de composição registrou que nada garante que as rotas cheguem à árvore. A carga do módulo por Module Federation se confirma, mas o formato que o shell lê não existe no módulo do shop, e as rotas caem no `fallback` vazio. A revisão de código-fonte deixou a linha de extração `Undetermined`, porque não testou a execução; aqui o confronto é entre o que o README afirma e o que os artefatos mostram, e eles desmentem que as sub-rotas cheguem ao shell.

**6. shell/src/moduleLoader.ts:1.** O carregador guarda o módulo em cache com validade (shell/src/moduleLoader.ts:33-40, 49-53). Na última tentativa com falha, guarda o erro e devolve o `fallback` configurado (shell/src/moduleLoader.ts:61-74), que para o shop é uma lista vazia de rotas (shell/src/moduleLoader.ts:134). Repetição: shell/src/router.tsx:48.

**7. shell/src/moduleLoader.ts:1.** O `import('shop/ShopRoutes')` é criado uma única vez, na definição de `MODULE_CONFIGS` (shell/src/moduleLoader.ts:130). O laço de "retries" só aguarda de novo essa mesma promessa (shell/src/moduleLoader.ts:42-47). Uma promessa rejeitada continua rejeitada, então a carga nunca é refeita, como registrou a revisão de composição. Repetição: shell/src/router.tsx:48.

## Resumo

Afirmações: 7 (corroborada: 5, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 2, composição: 4, build-deploy: 1).
