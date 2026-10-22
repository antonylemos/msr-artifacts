---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
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
  date: 2026-10-21
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Leitura do repositório

O repositório materializa em parte uma receita do README. A cadeia de Module Federation nativo do webpack 5 está completa na configuração e no código:
- **Configuração:** os dois remotes se declaram e expõem um componente (#1, #2), e o shell os declara (#3). Os três compartilham React como singleton.
- **Código:** o shell importa cada componente remoto pelo nome, com fallback em caso de falha (#4, #5), e o renderiza em `Suspense` (#9, #10).
- **Relações:** isso resulta em duas relações ativas (#15, #16).

A ambiguidade está na estrutura. As três aplicações exigem um `public/index.html` que não está no snapshot, e por isso os limites delas ficam ambíguos (#12 a #14). O snapshot resolve a causa: o `.gitignore` ignora `public`, e os templates nunca foram versionados (#28).

A mesma ausência desmente duas afirmações do README: que o projeto é "complete" (#20) e que é "production-ready" (#27). A segunda também é desmentida pelos remotes em `localhost` e pela falta de deploy. Build é separado, e o deploy não é observado (#17 a #19).

## Observações

### 1. header-mf/webpack.config.js:1-48

**Observação:** `ModuleFederationPlugin` declara `name: 'headerMf'` e `filename: 'remoteEntry.js'`, expõe `./Header` (`./src/Header`) e compartilha `react` e `react-dom` como singletons. A configuração exige o template `./public/index.html`.

**Interpretação:** O header-mf está configurado como remote e oferece seu componente a um host.

### 2. products-mf/webpack.config.js:1-48

**Observação:** `ModuleFederationPlugin` declara `name: 'productsMf'` e `filename: 'remoteEntry.js'`, expõe `./Products` e compartilha `react` e `react-dom` como singletons. A configuração exige o template `./public/index.html`.

**Interpretação:** O products-mf está configurado como remote e oferece seu componente a um host.

### 3. shell/webpack.config.js:1-43

**Observação:** `ModuleFederationPlugin` declara `name: 'shell'` e os remotes `headerMf@http://localhost:3001/remoteEntry.js` e `productsMf@http://localhost:3002/remoteEntry.js`, e compartilha `react` e `react-dom` como singletons. A configuração exige o template `./public/index.html`.

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los em desenvolvimento.

### 4. shell/src/App.js:3-9

**Observação:** `React.lazy` com `import('headerMf/Header')` e um componente de falha no `catch`.

**Interpretação:** O shell importa sob demanda o componente exposto pelo header-mf, pelo nome dele.

### 5. shell/src/App.js:11-17

**Observação:** `React.lazy` com `import('productsMf/Products')` e um componente de falha no `catch`.

**Interpretação:** O shell importa sob demanda o componente exposto pelo products-mf, pelo nome dele.

### 6. header-mf/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 7. products-mf/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 8. shell/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno ao shell.

### 9. shell/src/App.js:24-26

**Observação:** `<Header />` dentro de `Suspense`.

**Interpretação:** O shell renderiza o componente remoto do header-mf na própria página.

### 10. shell/src/App.js:32-34

**Observação:** `<Products />` dentro de `Suspense`.

**Interpretação:** O shell renderiza o componente remoto do products-mf na própria página.

### 11. .; package.json:1-16

**Observação:** É o manifesto da raiz, que instala, sobe e constrói as três aplicações em sequência, sem entrada própria.

**Interpretação:** É a raiz de coordenação, e não uma unidade.

### 12. header-mf; header-mf/package.json:1-7; header-mf/src/index.js:1; header-mf/src/bootstrap.js:1-6; header-mf/webpack.config.js:4-19, 46

**Observação:** Tem manifesto, entrada e build próprios, mas o build exige um template HTML que não está no snapshot.

**Interpretação:** O limite da unidade é ambíguo: é uma aplicação que se constrói sozinha quando o template existe, ou uma pasta incompleta.

### 13. products-mf; products-mf/package.json:1-7; products-mf/src/index.js:1; products-mf/src/bootstrap.js:1-6; products-mf/webpack.config.js:4-19, 46

**Observação:** Tem manifesto, entrada e build próprios, mas o build exige um template HTML que não está no snapshot.

**Interpretação:** O limite da unidade é ambíguo, pelo mesmo motivo.

### 14. shell; shell/package.json:1-7; shell/src/index.js:1; shell/src/bootstrap.js:1-6; shell/webpack.config.js:4-19, 40

**Observação:** Tem manifesto, entrada e build próprios, mas o build exige um template HTML que não está no snapshot.

**Interpretação:** O limite da unidade é ambíguo, pelo mesmo motivo.

### 15. shell/src/App.js:5, 25; shell/webpack.config.js:23-25; header-mf/webpack.config.js:23-26

**Observação:** O shell importa `headerMf/Header` e o renderiza. O nome e o módulo correspondem à configuração do header-mf.

**Interpretação:** É uma relação host → remote ativa.

### 16. shell/src/App.js:13, 33; shell/webpack.config.js:23-24, 26; products-mf/webpack.config.js:23-26

**Observação:** O shell importa `productsMf/Products` e o renderiza. O nome e o módulo correspondem à configuração do products-mf.

**Interpretação:** É uma relação host → remote ativa.

### 17. header-mf/webpack.config.js:4-19, 46; header-mf/package.json:6; package.json:12

**Observação:** Tem configuração e `webpack --mode production` próprios, encadeados pelo `build:all` da raiz. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, que depende de um arquivo ausente, sem deploy observado.

### 18. products-mf/webpack.config.js:4-19, 46; products-mf/package.json:6; package.json:12

**Observação:** Tem configuração e `webpack --mode production` próprios, encadeados pelo `build:all` da raiz. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, que depende de um arquivo ausente, sem deploy observado.

### 19. shell/webpack.config.js:4-43; shell/package.json:6; package.json:12

**Observação:** Tem configuração e `webpack --mode production` próprios, com os remotes fixados em `localhost`. Não há artefato de deploy.

**Interpretação:** Há uma fronteira de build própria, que depende de um arquivo ausente, sem deploy observado.

### 20. README.md:3

**Observação:** "A complete microfrontends project".

**Interpretação:** Afirma que o projeto está completo. Os templates que o build exige não estão no snapshot, e a afirmação é contradita.

### 21. README.md:3

**Observação:** "microfrontends project with React and Module Federation".

**Interpretação:** Apresenta o projeto como micro-frontends com Module Federation. A afirmação é corroborada.

### 22. README.md:3

**Observação:** "supports both independent and integrated development".

**Interpretação:** Afirma que cada aplicação também roda sozinha. O código para isso existe, mas depende de arquivos ausentes. A afirmação é parcial.

### 23. README.md:9

**Observação:** "**Shared Dependencies** - optimized React sharing".

**Interpretação:** Afirma o compartilhamento de React. A afirmação é corroborada.

### 24. README.md:10

**Observação:** "**Bootstrap Pattern**".

**Interpretação:** Afirma que cada aplicação entra por um bootstrap assíncrono. A afirmação é corroborada.

### 25. README.md:10

**Observação:** "prevents eager consumption errors".

**Interpretação:** Anuncia um efeito de execução que o snapshot não confirma nem desmente. A afirmação fica sem corroboração.

### 26. README.md:11

**Observação:** "**Real-World Architecture** - used by Netflix, Spotify, etc."

**Interpretação:** Faz referência a sistemas externos, sem verificação possível. A afirmação fica sem corroboração.

### 27. README.md:558

**Observação:** "You now have a production-ready microfrontend architecture".

**Interpretação:** Afirma que a arquitetura está pronta para produção. Os templates ausentes, os remotes em `localhost` e a falta de deploy a desmentem, e a afirmação é contradita.

### 28. .gitignore:79 (resolvido pelo snapshot); 31e1ab9 2025-09-27 (.gitignore); 5e5227d 2025-09-27 (header-mf, products-mf, shell)

**Observação:** O `.gitignore` da raiz ignora `public`. Ele vem do primeiro commit, e nenhuma árvore do histórico observado contém um caminho com `public/`.

**Interpretação:** Os templates nunca foram versionados, e não foram apagados. O snapshot resolve a ausência.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (header-mf, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #1, #3, #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #12; configura #15 |
| 2 | 3.4.3 (products-mf, Marcadores e Build); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #1 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #13; configura #16 |
| 3 | 3.4.3 (shell, Marcadores e Build); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #1, #4, #8 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #14; configura #15; configura #16 |
| 4 | 3.4.4 (shell/src/App.js:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 5 | 3.4.4 (shell/src/App.js:13) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #16 |
| 6 | 3.4.4 (header-mf/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 (products-mf/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 8 | 3.4.4 (shell/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 9 | 3.4.4 (shell/src/App.js:25) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #15 |
| 10 | 3.4.4 (shell/src/App.js:33) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #16 |
| 11 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 12 | 3.4.3 (header-mf) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 13 | 3.4.3 (products-mf) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 14 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 15 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #12 |
| 16 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #13 |
| 17 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #12 |
| 18 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #13 |
| 19 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #14 |
| 20 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | contradiz shell/webpack.config.js:40; contradiz header-mf/webpack.config.js:46; contradiz products-mf/webpack.config.js:46 |
| 21 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3; corrobora #15; corrobora #16 |
| 22 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte header-mf/src/bootstrap.js:5-6 |
| 23 | 3.4.7 #4 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3 |
| 24 | 3.4.7 #5 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #6; corrobora #7; corrobora #8 |
| 25 | 3.4.7 #6 | 7 documentação | documentação | module-federation | tecnológica | fraca | — |
| 26 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | — |
| 27 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #3; contradiz #19 |
| 28 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #12; explica #13; explica #14; explica #20; explica #22; explica #27 |

## Resumo

Observações: 28. Dimensões (tecnologia: 0, configuração: 3, código: 7, estrutura: 4, composição: 2, build-deploy: 3, documentação: 8, histórico: 1). Força (forte: 5, moderada: 7, fraca: 13, ambígua: 3). Evidência (tecnológica: 9, arquitetural: 17, contexto: 2).
