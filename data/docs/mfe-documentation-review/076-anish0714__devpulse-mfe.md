---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
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

# 076 — anish0714/devpulse-mfe

## Leitura do repositório

A documentação é o README da raiz, em inglês, o único arquivo `documentation` do `artifacts.csv`. É longo e bem organizado: apresenta o projeto como caixa de ferramentas de navegador e, ao mesmo tempo, como demonstração de arquitetura de micro-frontends (README.md:9-12), descreve cada ferramenta, a interface do shell, a árvore de pacotes, a montagem do site publicado, os dois workflows e a pilha técnica. Os `package.json` não têm `description`.

No que diz da composição, o README confere com as revisões anteriores: um shell e cinco remotes webpack ligados por Module Federation, cada remote expondo `./Widget`, num monorepo de npm workspaces. A revisão de dependências não lista nenhuma dependência das tecnologias; o `ModuleFederationPlugin` vem do próprio webpack (`require("webpack").container`, packages/shell/webpack.config.js:3). Onde o README diverge dos artefatos é no build e no deploy. Ele fala em micro-frontends "independently deployed" (README.md:3), num site montado a partir de seis builds (README.md:88-97) e num CI com um job para cada um dos seis pacotes (README.md:115). O snapshot tem um único workflow de deploy, que publica tudo junto e só copia para o site o shell e dois dos cinco remotes (.github/workflows/deploy.yml:39-60), e um CI cuja matriz cobre três pacotes (.github/workflows/ci.yml:18). A revisão de build e deploy já tinha apontado essas diferenças (3.4.6, Leitura).

Ficaram fora da tabela:
- o título (README.md:1), que repete a afirmação 3;
- o bloco de código com as URLs de produção (README.md:101-107), que reproduz a configuração do shell de forma resumida (packages/shell/webpack.config.js:11-25, 53-57); a frase que o introduz é a afirmação 18;
- as portas de desenvolvimento e a troca das URLs por `localhost` (README.md:109), detalhe de infraestrutura que a configuração confirma (packages/shell/webpack.config.js:11-25; packages/pdf-conversion-remote/webpack.config.js:28) e que, como o próprio README diz, não muda o mecanismo;
- a abertura da seção de CI/CD, "Two separate GitHub Actions workflows" (README.md:113): os dois workflows existem (.github/workflows/ci.yml, .github/workflows/deploy.yml); o que a seção diz de cada um está nas afirmações 7 e 19;
- o fluxo de trabalho baseado em tronco (README.md:20, 118, 141), que é processo de desenvolvimento, não propriedade das unidades;
- detalhes internos de uma unidade: o download do motor de OCR por CDN (README.md:47) e a ausência de dependências de runtime do `dev-utils-remote` (README.md:50, 136);
- as descrições funcionais das ferramentas, a aparência da interface e a pilha de bibliotecas (README.md:22-55, 60, 129-137), salvo o que se repete nas afirmações 3 e 11.

Ocorrências `doc-*`: README.md:1 é o título. README.md:3 está nas afirmações 1 a 3; README.md:5 na 4; README.md:12 nas 6 e 7; README.md:18 na 8; README.md:58 nas 9 e 10; README.md:64 na 11; README.md:68 na 12; README.md:83 é repetição da 6; README.md:88 está nas 16 e 17; README.md:102-106 é o bloco de código citado acima; README.md:113 é a abertura citada acima; README.md:115 é repetição da 7; README.md:124 é instrução de execução (`npm run dev`, que roda o `start` de todos os workspaces, package.json:9); README.md:131 repete as afirmações 3 e 11; README.md:141 repete as afirmações 3, 2, 7 e 5.

Foram lidos os artefatos que as revisões anteriores citam: os `package.json` da raiz e dos seis pacotes, as seis configurações webpack, os dois workflows, os `index.ts`, `bootstrap.tsx` e `App.tsx` das seis unidades, e `Introduction.tsx`, `RemoteErrorBoundary.tsx` e `types/remotes.d.ts` do shell. O único comentário é o dos `index.ts`, igual nas seis unidades (afirmação 20). Textos exibidos na interface repetem afirmações do README: o subtítulo do shell, "each one a separately built, separately deployed micro-frontend" (packages/shell/src/App.tsx:104-107), o parágrafo da Introdução, "independently built and independently deployed [...] loaded into this shell at runtime via Webpack Module Federation" (packages/shell/src/Introduction.tsx:25-29), e o aviso de cada remote, "standalone, at its own deployed URL" (ex.: packages/pdf-conversion-remote/src/App.tsx:25-26). São conteúdo da aplicação, não documentação, e estão citados nos parágrafos das afirmações correspondentes.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "independently developed [...] micro-frontends" | independência | corroborada | 3.4.3 (seis unidades com manifesto, entrada e build próprios); packages/shell/package.json:6; packages/pdf-conversion-remote/webpack.config.js:27-31 |
| 2 | README.md:3 | "independently deployed" (as unidades são implantadas independentemente) | build-deploy | contradita | 3.4.6 #1-#6 (deploy `conjunto`: 3, `não observado`: 3); .github/workflows/deploy.yml:36-60 |
| 3 | README.md:3 | "micro-frontends, composed at runtime into one app by a shell host using Webpack 5's Module Federation" | estrutura | corroborada | 3.4.3 (seis unidades `Yes`); 3.4.5 #1-#5; packages/shell/webpack.config.js:3, 50-58; packages/shell/src/App.tsx:7-11 |
| 4 | README.md:5 | "Live: https://anish0714.github.io/devpulse-mfe/" (endereço publicado da aplicação) | build-deploy | corroborada | 3.4.6 #6; packages/shell/webpack.config.js:6; .github/workflows/deploy.yml:42, 46-60 |
| 5 | README.md:11 | "entirely client-side" (as ferramentas não dependem de backend) | outro | corroborada | 3.4.3 (só as seis unidades frontend e a raiz); 3.4.6 (Leitura: sem Dockerfile, compose ou proxy) |
| 6 | README.md:12 | "each tool is its own React app with its own build" | build-deploy | corroborada | 3.4.6 #1-#6 (build `separado`: 6); packages/pdf-conversion-remote/webpack.config.js:13-17; package.json:10 |
| 7 | README.md:12 | "its own CI check" (cada ferramenta tem sua verificação de CI) | build-deploy | contradita | .github/workflows/ci.yml:18, 33, 36; 3.4.6 #1, #2, #4 |
| 8 | README.md:18 | "the shell has zero compile-time dependency on any tool's source; it only knows a URL and an exposed module name" | composição | corroborada | 3.4.6 #6; packages/shell/package.json:10-13; packages/shell/webpack.config.js:11-25, 52-58; packages/shell/src/App.tsx:7-11 |
| 9 | README.md:58 | "selecting one renders that remote's own widget in the right-hand content pane" | composição | corroborada | 3.4.4 (packages/shell/src/App.tsx:34, 164); 3.4.5 #1-#5; packages/shell/src/App.tsx:135-148, 162-166 |
| 10 | README.md:58 | "The shell itself renders no tool-specific UI — only navigation, the Introduction, and the loading/error states around whichever remote is active." | estrutura | corroborada | packages/shell/src/App.tsx:133-168; packages/shell/src/Introduction.tsx:14-30; packages/shell/src/RemoteErrorBoundary.tsx:24-42 |
| 11 | README.md:64 | "This is an npm-workspaces monorepo" | estrutura | corroborada | 3.4.3 (Workspace); package.json:5-7 |
| 12 | README.md:66-79 | "shell/ the host app: [...] remote loading, error boundaries [...] pdf-conversion-remote/ exposes ./Widget [...]" (árvore com o host e os cinco remotes) | estrutura | corroborada | 3.4.3 (seis unidades `Yes`); 3.4.5 #1-#5; packages/pdf-conversion-remote/webpack.config.js:33-38 |
| 13 | README.md:82 | "has its own `webpack.config.js` and `ModuleFederationPlugin` config" | build-deploy | corroborada | 3.4.3 (coluna Build das seis unidades); packages/shell/webpack.config.js:3, 50-63; packages/pdf-conversion-remote/webpack.config.js:3, 33-43 |
| 14 | README.md:84 | "also has a standalone `App.tsx` entry" (cada pacote roda sozinho) | independência | corroborada | 3.4.3 (coluna Entrada); packages/pdf-conversion-remote/src/bootstrap.tsx:2, 7; packages/pdf-conversion-remote/src/App.tsx:1-39 |
| 15 | README.md:84 | "visiting a remote's own deployed URL directly still renders something meaningful" (cada remote tem endereço publicado próprio) | build-deploy | parcial | 3.4.6 #3, #5 (`conjunto`) e #1, #2, #4 (`não observado`); .github/workflows/deploy.yml:41-44 |
| 16 | README.md:88 | "Deployed as one GitHub Pages site (`/devpulse-mfe/`)" | build-deploy | corroborada | 3.4.6 #3, #5, #6; .github/workflows/deploy.yml:46-60 |
| 17 | README.md:88-97 | "assembled from six independent builds" (diagrama com os seis `dist` copiados para `site/`) | build-deploy | contradita | .github/workflows/deploy.yml:39-44; 3.4.6 #1, #2, #4 (`não observado`) |
| 18 | README.md:99 | "The shell's production config points at those exact URLs" | composição | corroborada | 3.4.5 #1-#5; packages/shell/webpack.config.js:6, 11-25, 52-58 |
| 19 | README.md:116 | "deploy.yml runs only on push to `main` (or manual dispatch): it lints and builds everything, assembles the combined site, and deploys to GitHub Pages" | build-deploy | corroborada | 3.4.6 (Leitura); .github/workflows/deploy.yml:3-6, 33-44, 46-60 |
| 20 | packages/dev-utils-remote/src/index.ts:1-2 | "Module Federation requires the real entry point to be loaded asynchronously so the shared module scope can initialize before this app touches React." (o React fica no escopo compartilhado das unidades) | composição | corroborada | 3.4.4 (Notas, `src-async-bootstrap`); packages/shell/webpack.config.js:59-62; packages/dev-utils-remote/webpack.config.js:39-42 |

## Observações

**1. README.md:3.** Cada uma das seis unidades tem manifesto, entrada e build próprios (3.4.3) e um servidor de desenvolvimento próprio (`webpack serve`, packages/shell/package.json:6; porta 3003 em packages/pdf-conversion-remote/webpack.config.js:27-31), e cada uma pode ser iniciada sozinha (README.md:127, que repete a afirmação 14). Isso confirma que as unidades são desenvolvidas separadamente no sentido técnico. O snapshot não diz nada sobre equipes ou autores diferentes; o README apresenta o projeto como de um só autor (README.md:60).

**2. README.md:3.** O snapshot tem um único workflow de deploy. Ele constrói todos os workspaces de uma vez (.github/workflows/deploy.yml:36-37), monta um único diretório `site` (.github/workflows/deploy.yml:39-44) e o publica como um só artefato do GitHub Pages, num só job (.github/workflows/deploy.yml:46-60). Shell e remotes de conversão e manipulação são publicados juntos (`conjunto`), e os outros três remotes não são publicados (`não observado`). Nenhuma unidade tem deploy próprio. A afirmação se repete em "its own deploy" (README.md:12), em "redeployed on its own schedule without touching the shell" (README.md:18), em "independent build/deploy pipelines per package" (README.md:141) e nos textos da interface (packages/shell/src/App.tsx:105-106; packages/shell/src/Introduction.tsx:26). O próprio README a desmente em parte: "Deployed as one GitHub Pages site" (README.md:88, afirmação 16).

**3. README.md:3.** O shell declara os cinco remotes no `ModuleFederationPlugin` do webpack 5 (packages/shell/webpack.config.js:3, 50-58) e os carrega com `React.lazy` em tempo de execução (packages/shell/src/App.tsx:7-11); as cinco relações host → remote estão na revisão de composição. Repetições: o título (README.md:1), "loaded into a shared shell at runtime rather than bundled together at build time" (README.md:12), a pilha técnica, "Webpack 5 (`ModuleFederationPlugin`) for runtime composition" (README.md:131), e "Micro-frontend architecture with genuine runtime composition" (README.md:141).

**4. README.md:5.** O endereço é a base de produção da configuração do shell (`PROD_BASE`, packages/shell/webpack.config.js:6), e o `dist` do shell vai para a raiz do site publicado no GitHub Pages (.github/workflows/deploy.yml:42, 46-60). O site não foi acessado.

**5. README.md:11.** O snapshot só tem as seis unidades frontend e a raiz do workspace (3.4.3), sem servidor, Dockerfile, compose ou proxy (3.4.6, Leitura), e nenhum `src` faz chamada de rede para outro endereço além das URLs dos `remoteEntry.js`. A afirmação se repete em "every tool runs 100% in the browser [...] so there's no backend to trust" (README.md:17) e em "browser-only file processing with zero backend" (README.md:141). O OCR baixa o motor e os dados de idioma por CDN (README.md:47; `tesseract.js`, packages/ocr-remote/src/Widget.tsx:2), o que não é backend do projeto.

**6. README.md:12.** Cada pacote tem `webpack build --mode production` sobre configuração própria, com saída em seu próprio `dist` (packages/pdf-conversion-remote/webpack.config.js:13-17); o `build` da raiz só dispara o de cada workspace (package.json:10). A revisão de build e deploy registrou build `separado` para as seis. Repetições: "builds to its own `dist/`, independent of the others" (README.md:83), "each package still builds independently" (README.md:64) e "A tool can be rebuilt [...] without touching the shell" (README.md:18). No deploy, porém, todos são construídos no mesmo passo (.github/workflows/deploy.yml:37).

**7. README.md:12.** A matriz do `ci.yml` tem só `shell`, `pdf-conversion-remote` e `pdf-manipulation-remote` (.github/workflows/ci.yml:18); cada job faz type-check e build de um pacote (.github/workflows/ci.yml:33, 36). Os remotes de utilitários, OCR e formulários PDF não têm verificação de CI. A afirmação se repete em "Per-package CI — each package lints and builds as its own GitHub Actions check" (README.md:19), na lista dos seis pacotes da matriz (README.md:115), em "per-package CI" (README.md:137) e em "independent build/deploy pipelines per package" (README.md:141). A parte confirmada é a dos três pacotes da matriz; a lista de README.md:115 é desmentida pela linha da matriz.

**8. README.md:18.** O `package.json` do shell só depende de `react` e `react-dom` (packages/shell/package.json:10-13), e nenhum arquivo de `packages/shell/src` importa código de outro pacote. O shell conhece cada remote pelo nome do container e pela URL do `remoteEntry.js` (packages/shell/webpack.config.js:11-25, 52-58) e importa só `<remote>/Widget` (packages/shell/src/App.tsx:7-11), com tipos declarados à parte (packages/shell/src/types/remotes.d.ts:1-29). Repetições: "wired together only via runtime URLs" (README.md:64). A segunda frase do item, sobre rebuild e redeploy por conta própria, se divide entre as afirmações 6 e 2.

**9. README.md:58.** A barra lateral escolhe a seção ativa (packages/shell/src/App.tsx:135-148), e o componente do remote escolhido é renderizado dentro de `Suspense` e de `RemoteErrorBoundary` (packages/shell/src/App.tsx:162-166). Só o widget aberto é carregado (3.4.5, Leitura).

**10. README.md:58.** O `src` do shell tem só o `App.tsx` com o cabeçalho, a navegação e a área de conteúdo (packages/shell/src/App.tsx:133-168), a Introdução, que lista as ferramentas a partir da tabela de seções (packages/shell/src/Introduction.tsx:14-30), e o error boundary (packages/shell/src/RemoteErrorBoundary.tsx:24-42). A tela de cada ferramenta vem do remote.

**11. README.md:64.** A raiz declara `workspaces` com `packages/*` (package.json:5-7). Repetição: "npm workspaces for the monorepo" (README.md:131). O resto da frase está nas afirmações 6 e 8.

**12. README.md:66-79.** A árvore lista os seis pacotes que a revisão estrutural registrou como unidades, com o shell como host e os cinco remotes expondo `./Widget`, o que as configurações confirmam (ex.: packages/pdf-conversion-remote/webpack.config.js:33-38). O shell faz a carga dos remotes e tem o error boundary (packages/shell/src/App.tsx:7-11; packages/shell/src/RemoteErrorBoundary.tsx:13).

**13. README.md:82.** As seis unidades têm `webpack.config.js` próprio com `ModuleFederationPlugin`: o shell como consumidor (packages/shell/webpack.config.js:50-63) e os remotes como containers com `remoteEntry.js` (ex.: packages/pdf-conversion-remote/webpack.config.js:33-43). As cinco configurações de remote só diferem pela porta e pelo `name` (3.4.6, Leitura).

**14. README.md:84.** Cada unidade tem entrada que monta o próprio `App` (ex.: packages/pdf-conversion-remote/src/bootstrap.tsx:2, 7). Nos remotes, o `App.tsx` envolve o `Widget` com um aviso de que se está vendo o micro-frontend sozinho (packages/pdf-conversion-remote/src/App.tsx:1-39). Repetição: "Or run a single package: `npm run start --workspace=packages/ocr-remote`" (README.md:127; packages/ocr-remote/package.json:6).

**15. README.md:84.** Os remotes de conversão e manipulação têm subcaminho próprio no site publicado (`site/remotes/pdf-conversion/` e `site/remotes/pdf-manipulation/`, .github/workflows/deploy.yml:43-44), onde o `index.html` gerado pelo `HtmlWebpackPlugin` também fica. Para os outros três, nenhum artefato do snapshot publica o `dist` (.github/workflows/deploy.yml:41-44), e só o servidor de desenvolvimento os serve. O texto da interface diz o mesmo ("at its own deployed URL", ex.: packages/ocr-remote/src/App.tsx:25-26), inclusive nos três remotes sem deploy.

**16. README.md:88.** O workflow sobe um único diretório `site` como artefato do Pages e o implanta num job só (.github/workflows/deploy.yml:46-60). A revisão de build e deploy registrou deploy `conjunto` para o shell e os dois remotes publicados. A afirmação confirma o deploy conjunto e contradiz a afirmação 2. Repetição: "GitHub Pages hosting" (README.md:137).

**17. README.md:88-97.** O diagrama põe os seis `dist` em `site/`, mas o workflow só cria `site/remotes/pdf-conversion` e `site/remotes/pdf-manipulation` e só copia o shell e esses dois remotes (.github/workflows/deploy.yml:39-44). Os `dist` de `dev-utils-remote`, `pdf-form-filler-remote` e `ocr-remote` são construídos (.github/workflows/deploy.yml:37), mas não entram no site. A parte do shell e dos dois remotes se confirma.

**18. README.md:99.** Em produção, o shell monta as cinco URLs sob `https://anish0714.github.io/devpulse-mfe/remotes/` (packages/shell/webpack.config.js:6, 11-25) e as usa nos `remotes` do `ModuleFederationPlugin` (packages/shell/webpack.config.js:52-58). A configuração aponta para os cinco caminhos do diagrama, inclusive os três que o deploy não preenche (afirmação 17); o shell trata a falha com a mensagem "It may not be deployed yet" (packages/shell/src/RemoteErrorBoundary.tsx:37-38). A tabela de seções repete as URLs no campo `url`, que o shell não lê (3.4.4, Notas).

**19. README.md:116.** O `deploy.yml` roda em push para `main` ou por `workflow_dispatch` (.github/workflows/deploy.yml:3-6), faz type-check e build de todos os workspaces (.github/workflows/deploy.yml:33-37), monta o site combinado (.github/workflows/deploy.yml:39-44) e implanta no GitHub Pages (.github/workflows/deploy.yml:46-60). "Combined site" é exato; o que o snapshot não confirma é a composição desse site, tratada na afirmação 17.

**20. packages/dev-utils-remote/src/index.ts:1-2.** O comentário explica por que a entrada carrega o `bootstrap` de forma assíncrona: o escopo compartilhado do Module Federation precisa ser inicializado antes do React. As seis configurações compartilham `react` e `react-dom` como singletons (packages/shell/webpack.config.js:59-62; packages/dev-utils-remote/webpack.config.js:39-42, igual nos outros remotes), e as seis unidades dependem de `react` (ex.: packages/dev-utils-remote/package.json:11-12), o que satisfaz a regra de biblioteca compartilhada. O mesmo comentário está em `packages/ocr-remote/src/index.ts:1-2`, `packages/pdf-conversion-remote/src/index.ts:1-2`, `packages/pdf-form-filler-remote/src/index.ts:1-2`, `packages/pdf-manipulation-remote/src/index.ts:1-2` e `packages/shell/src/index.ts:1-2`.

## Resumo

Afirmações: 20 (corroborada: 16, parcial: 1, contradita: 3, sem corroboração: 0). Temas: (estrutura: 4, composição: 4, build-deploy: 9, independência: 2, outro: 1).
