---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
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

# 076 — anish0714/devpulse-mfe

## Leitura do repositório

Monorepo de npm workspaces (#20) com um shell React e cinco remotes React, cada um com manifesto, entrada e build webpack próprios (#21 a #26). A cadeia de Module Federation está completa, embora não passe por dependência declarada: o `ModuleFederationPlugin` vem do próprio webpack, e a revisão de dependências não registrou nenhuma tecnologia de MFE. Por isso a cadeia começa na configuração:
- **Configuração:** cada remote se declara com nome próprio, gera `remoteEntry.js`, expõe `./Widget` e compartilha `react` e `react-dom` como singletons (#1 a #5). O shell nomeia os cinco remotes, com URL de produção sob o GitHub Pages ou de `localhost` no desenvolvimento (#6).
- **Código:** o shell importa os cinco `<remote>/Widget` por `React.lazy` (#7 a #11), reúne-os numa tabela de seções que nomeia cada remote (#18) e renderiza o widget da seção escolhida (#19).
- **Relações:** isso resulta em cinco relações host → remote ativas (#27 a #31).

Sinais que não são composição: o `import("./bootstrap")` das seis unidades (#12 a #17) é o bootstrap assíncrono que o Module Federation exige, interno a cada unidade. A raiz do workspace não é unidade (#20).

O ponto fraco está no deploy. Os seis builds são separados (#32 a #37), mas o único workflow de deploy publica tudo num só site do GitHub Pages e só copia o shell e dois remotes (#34, #36, #37); dev-utils, OCR e formulários PDF são construídos e não publicados (#32, #33, #35), embora o shell aponte para eles em produção (#6). O README diverge desses artefatos em três afirmações: deploy independente (#39), CI por pacote (#44) e site montado com os seis builds (#54); em outra, só se confirma em parte (#52). No que diz da composição, o README confere com os artefatos (#40, #45, #46, #55). O histórico esclarece as duas divergências: nunca houve deploy por unidade (#58), e os workflows ficaram no estágio com dois remotes porque o push das alterações foi bloqueado por permissão (#59).

## Observações

### 1. packages/dev-utils-remote/webpack.config.js:1-47

**Observação:** `ModuleFederationPlugin` com `name: "devUtils"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` e `react` e `react-dom` compartilhados como `singleton`. O `devServer` usa a porta 3005.

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece sua tela a um host.

### 2. packages/ocr-remote/webpack.config.js:1-47

**Observação:** `ModuleFederationPlugin` com `name: "ocr"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` e `react` e `react-dom` compartilhados como `singleton`. O `devServer` usa a porta 3007.

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece sua tela a um host.

### 3. packages/pdf-conversion-remote/webpack.config.js:1-47

**Observação:** `ModuleFederationPlugin` com `name: "pdfConversion"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` e `react` e `react-dom` compartilhados como `singleton`. O `devServer` usa a porta 3003.

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece sua tela a um host.

### 4. packages/pdf-form-filler-remote/webpack.config.js:1-47

**Observação:** `ModuleFederationPlugin` com `name: "pdfFormFiller"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` e `react` e `react-dom` compartilhados como `singleton`. O `devServer` usa a porta 3006.

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece sua tela a um host.

### 5. packages/pdf-manipulation-remote/webpack.config.js:1-47

**Observação:** `ModuleFederationPlugin` com `name: "pdfManipulation"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/Widget" }` e `react` e `react-dom` compartilhados como `singleton`. O `devServer` usa a porta 3004.

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece sua tela a um host.

### 6. packages/shell/webpack.config.js:1-67

**Observação:** `PROD_BASE = "https://anish0714.github.io/devpulse-mfe"`. Em produção, as URLs dos remotes são `${PROD_BASE}/remotes/<nome>/remoteEntry.js`; no desenvolvimento, `http://localhost:3003` a `3007/remoteEntry.js` (:11-25). `ModuleFederationPlugin` com `name: "shell"`, `remotes` `pdfConversion`, `pdfManipulation`, `devUtils`, `pdfFormFiller` e `ocr`, cada um no formato `<nome>@<url>`, e `react` e `react-dom` compartilhados como `singleton`.

**Interpretação:** A configuração do host declara as cinco unidades como remotes e onde encontrá-las em cada ambiente.

### 7. packages/shell/src/App.tsx:7

**Observação:** `const PdfConversionWidget = lazy(() => import("pdfConversion/Widget"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo remote de conversão PDF, pelo nome dele.

### 8. packages/shell/src/App.tsx:8

**Observação:** `const PdfManipulationWidget = lazy(() => import("pdfManipulation/Widget"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo remote de manipulação PDF, pelo nome dele.

### 9. packages/shell/src/App.tsx:9

**Observação:** `const DevUtilsWidget = lazy(() => import("devUtils/Widget"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo remote de utilitários, pelo nome dele.

### 10. packages/shell/src/App.tsx:10

**Observação:** `const PdfFormFillerWidget = lazy(() => import("pdfFormFiller/Widget"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo remote de formulários PDF, pelo nome dele.

### 11. packages/shell/src/App.tsx:11

**Observação:** `const OcrWidget = lazy(() => import("ocr/Widget"));`.

**Interpretação:** O shell carrega em runtime o módulo exposto pelo remote de OCR, pelo nome dele.

### 12. packages/dev-utils-remote/src/index.ts:3

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 13. packages/ocr-remote/src/index.ts:3

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 14. packages/pdf-conversion-remote/src/index.ts:3

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 15. packages/pdf-form-filler-remote/src/index.ts:3

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 16. packages/pdf-manipulation-remote/src/index.ts:3

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 17. packages/shell/src/index.ts:3

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno ao shell.

### 18. packages/shell/src/App.tsx:34-91

**Observação:** `const sections: Section[]` tem uma entrada de introdução e cinco de remote. Cada uma declara `key` com o nome do remote, `packageName` (`pdf-conversion-remote`, `pdf-manipulation-remote`, `dev-utils-remote`, `pdf-form-filler-remote`, `ocr-remote`), `url` do `remoteEntry.js` e `Component` com o widget importado em :7-11.

**Interpretação:** O host declara quais unidades usa e associa cada uma a uma seção da aplicação.

### 19. packages/shell/src/App.tsx:164

**Observação:** `<current.Component />`, dentro de `<Suspense>` (:163) e de `<RemoteErrorBoundary remoteName={current.packageName}>` (:162). `current` é a seção escolhida na navegação (:97, :135-148).

**Interpretação:** O host renderiza o widget remoto da seção ativa, qualquer que seja.

### 20. .; package.json:1-13

**Observação:** É o manifesto da raiz, sem dependências, com `workspaces: ["packages/*"]` e scripts que só disparam os dos workspaces (`npm run build --workspaces --if-present`). Não tem entrada nem configuração de build.

**Interpretação:** É a raiz de coordenação do workspace, não uma unidade frontend.

### 21. packages/dev-utils-remote; packages/dev-utils-remote/package.json:1-26; packages/dev-utils-remote/webpack.config.js:9-46; packages/dev-utils-remote/src/index.ts:3; packages/dev-utils-remote/src/bootstrap.tsx:4-7

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada (`./src/index.ts`, que monta o `App` em `bootstrap.tsx`) e `webpack build --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 22. packages/ocr-remote; packages/ocr-remote/package.json:1-28; packages/ocr-remote/webpack.config.js:9-46; packages/ocr-remote/src/index.ts:3; packages/ocr-remote/src/bootstrap.tsx:4-7

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack build --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 23. packages/pdf-conversion-remote; packages/pdf-conversion-remote/package.json:1-32; packages/pdf-conversion-remote/webpack.config.js:9-46; packages/pdf-conversion-remote/src/index.ts:3; packages/pdf-conversion-remote/src/bootstrap.tsx:4-7

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack build --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 24. packages/pdf-form-filler-remote; packages/pdf-form-filler-remote/package.json:1-28; packages/pdf-form-filler-remote/webpack.config.js:9-46; packages/pdf-form-filler-remote/src/index.ts:3; packages/pdf-form-filler-remote/src/bootstrap.tsx:4-7

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack build --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 25. packages/pdf-manipulation-remote; packages/pdf-manipulation-remote/package.json:1-28; packages/pdf-manipulation-remote/webpack.config.js:9-46; packages/pdf-manipulation-remote/src/index.ts:3; packages/pdf-manipulation-remote/src/bootstrap.tsx:4-7

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack build --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 26. packages/shell; packages/shell/package.json:1-26; packages/shell/webpack.config.js:8-66; packages/shell/src/index.ts:3; packages/shell/src/bootstrap.tsx:4-7

**Observação:** É uma aplicação React com manifesto, configuração webpack, entrada e `webpack build --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio, no papel de host.

### 27. packages/shell/src/App.tsx:7, 34, 164; packages/shell/webpack.config.js:11-13, 53; packages/pdf-conversion-remote/webpack.config.js:34-37

**Observação:** O shell importa `pdfConversion/Widget`, põe o componente numa seção e o renderiza quando ela é escolhida. O remote `pdfConversion` aponta para `remotes/pdf-conversion/remoteEntry.js` ou `localhost:3003/remoteEntry.js`, e o nome e o `./Widget` exposto correspondem aos do remote.

**Interpretação:** É uma relação host → remote ativa.

### 28. packages/shell/src/App.tsx:8, 34, 164; packages/shell/webpack.config.js:14-16, 54; packages/pdf-manipulation-remote/webpack.config.js:34-37

**Observação:** O shell importa `pdfManipulation/Widget`, põe o componente numa seção e o renderiza quando ela é escolhida. O remote `pdfManipulation` aponta para `remotes/pdf-manipulation/remoteEntry.js` ou `localhost:3004/remoteEntry.js`, e o nome e o `./Widget` exposto correspondem aos do remote.

**Interpretação:** É uma relação host → remote ativa.

### 29. packages/shell/src/App.tsx:9, 34, 164; packages/shell/webpack.config.js:17-19, 55; packages/dev-utils-remote/webpack.config.js:34-37

**Observação:** O shell importa `devUtils/Widget`, põe o componente numa seção e o renderiza quando ela é escolhida. O remote `devUtils` aponta para `remotes/dev-utils/remoteEntry.js` ou `localhost:3005/remoteEntry.js`, e o nome e o `./Widget` exposto correspondem aos do remote.

**Interpretação:** É uma relação host → remote ativa. A URL de produção não é preenchida pelo deploy (#32), o que não muda a relação no código.

### 30. packages/shell/src/App.tsx:10, 34, 164; packages/shell/webpack.config.js:20-22, 56; packages/pdf-form-filler-remote/webpack.config.js:34-37

**Observação:** O shell importa `pdfFormFiller/Widget`, põe o componente numa seção e o renderiza quando ela é escolhida. O remote `pdfFormFiller` aponta para `remotes/pdf-form-filler/remoteEntry.js` ou `localhost:3006/remoteEntry.js`, e o nome e o `./Widget` exposto correspondem aos do remote.

**Interpretação:** É uma relação host → remote ativa. A URL de produção não é preenchida pelo deploy (#35).

### 31. packages/shell/src/App.tsx:11, 34, 164; packages/shell/webpack.config.js:23-25, 57; packages/ocr-remote/webpack.config.js:34-37

**Observação:** O shell importa `ocr/Widget`, põe o componente numa seção e o renderiza quando ela é escolhida. O remote `ocr` aponta para `remotes/ocr/remoteEntry.js` ou `localhost:3007/remoteEntry.js`, e o nome e o `./Widget` exposto correspondem aos do remote.

**Interpretação:** É uma relação host → remote ativa. A URL de produção não é preenchida pelo deploy (#33).

### 32. packages/dev-utils-remote/package.json:7; packages/dev-utils-remote/webpack.config.js:13-17, 33-43; .github/workflows/deploy.yml:37, 41-44

**Observação:** Tem `webpack build --mode production` e saída em `dist` próprios, e gera o container `devUtils` com `remoteEntry.js`. O workflow de deploy constrói todos os workspaces, mas não copia esse `dist` para o site. O pacote não está na matriz do CI (.github/workflows/ci.yml:18).

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 33. packages/ocr-remote/package.json:7; packages/ocr-remote/webpack.config.js:13-17, 33-43; .github/workflows/deploy.yml:37, 41-44

**Observação:** Tem `webpack build --mode production` e saída em `dist` próprios, e gera o container `ocr` com `remoteEntry.js`. O workflow de deploy o constrói, mas não copia o `dist` para o site. O pacote não está na matriz do CI.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 34. packages/pdf-conversion-remote/package.json:7; packages/pdf-conversion-remote/webpack.config.js:13-17; .github/workflows/ci.yml:18, 36; .github/workflows/deploy.yml:43, 46-60

**Observação:** Tem `webpack build --mode production` e saída em `dist` próprios, e um job de build próprio na matriz do CI. O deploy copia o `dist` para `site/remotes/pdf-conversion/`, e o diretório `site` inteiro sobe como um único artefato do GitHub Pages, num único job.

**Interpretação:** Há uma fronteira de build própria, com deploy conjunto ao shell e ao remote de manipulação, num subcaminho próprio.

### 35. packages/pdf-form-filler-remote/package.json:7; packages/pdf-form-filler-remote/webpack.config.js:13-17, 33-43; .github/workflows/deploy.yml:37, 41-44

**Observação:** Tem `webpack build --mode production` e saída em `dist` próprios, e gera o container `pdfFormFiller` com `remoteEntry.js`. O workflow de deploy o constrói, mas não copia o `dist` para o site. O pacote não está na matriz do CI.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 36. packages/pdf-manipulation-remote/package.json:7; packages/pdf-manipulation-remote/webpack.config.js:13-17; .github/workflows/ci.yml:18, 36; .github/workflows/deploy.yml:44, 46-60

**Observação:** Tem `webpack build --mode production` e saída em `dist` próprios, e um job de build próprio na matriz do CI. O deploy copia o `dist` para `site/remotes/pdf-manipulation/`, publicado no mesmo artefato do GitHub Pages.

**Interpretação:** Há uma fronteira de build própria, com deploy conjunto, num subcaminho próprio.

### 37. packages/shell/package.json:7; packages/shell/webpack.config.js:31-35; .github/workflows/ci.yml:18, 36; .github/workflows/deploy.yml:42, 46-60

**Observação:** Tem `webpack build --mode production` e saída em `dist` próprios, e um job de build próprio na matriz do CI. O deploy copia o `dist` para a raiz de `site`, publicado no mesmo artefato do GitHub Pages que os remotes de conversão e manipulação.

**Interpretação:** Há uma fronteira de build própria, com deploy conjunto aos dois remotes publicados.

### 38. README.md:3

**Observação:** "independently developed [...] micro-frontends".

**Interpretação:** Afirma que as unidades são desenvolvidas separadamente. Cada uma tem manifesto, entrada, build e servidor de desenvolvimento próprios, e a afirmação é corroborada.

### 39. README.md:3

**Observação:** "independently deployed".

**Interpretação:** Afirma que cada unidade é implantada por conta própria. O único deploy publica três unidades juntas e não publica as outras três, e a afirmação é contradita.

### 40. README.md:3

**Observação:** "micro-frontends, composed at runtime into one app by a shell host using Webpack 5's Module Federation".

**Interpretação:** Apresenta o repositório como host e micro-frontends compostos por Module Federation em runtime. A afirmação é corroborada.

### 41. README.md:5

**Observação:** "Live: https://anish0714.github.io/devpulse-mfe/".

**Interpretação:** Dá o endereço publicado da aplicação, que é a base de produção do shell. A afirmação é corroborada; o site não foi acessado.

### 42. README.md:11

**Observação:** "entirely client-side".

**Interpretação:** Afirma que as ferramentas não dependem de backend. O snapshot só tem as unidades frontend e a raiz, e a afirmação é corroborada.

### 43. README.md:12

**Observação:** "each tool is its own React app with its own build".

**Interpretação:** Afirma que cada ferramenta é uma aplicação com build próprio. A afirmação é corroborada.

### 44. README.md:12

**Observação:** "its own CI check".

**Interpretação:** Afirma que cada ferramenta tem verificação de CI própria. A matriz do CI só tem três dos seis pacotes, e a afirmação é contradita.

### 45. README.md:18

**Observação:** "the shell has zero compile-time dependency on any tool's source; it only knows a URL and an exposed module name".

**Interpretação:** Afirma que o shell só conhece os remotes pela URL e pelo módulo exposto. A afirmação é corroborada.

### 46. README.md:58

**Observação:** "selecting one renders that remote's own widget in the right-hand content pane".

**Interpretação:** Afirma que o shell renderiza o widget do remote escolhido. A afirmação é corroborada.

### 47. README.md:58

**Observação:** "The shell itself renders no tool-specific UI — only navigation, the Introduction, and the loading/error states around whichever remote is active."

**Interpretação:** Afirma que a tela de cada ferramenta vem do remote, e o shell só dá a moldura. A afirmação é corroborada.

### 48. README.md:64

**Observação:** "This is an npm-workspaces monorepo".

**Interpretação:** Descreve a organização das unidades num monorepo. A afirmação é corroborada.

### 49. README.md:66-79

**Observação:** Árvore de `packages/` com "shell/ the host app: [...] remote loading, error boundaries [...]" e cinco remotes, cada um com "exposes ./Widget".

**Interpretação:** Descreve o host e os cinco remotes e o que cada um expõe. A afirmação é corroborada.

### 50. README.md:82

**Observação:** "has its own `webpack.config.js` and `ModuleFederationPlugin` config".

**Interpretação:** Afirma que cada pacote tem build e configuração de federação próprios. A afirmação é corroborada.

### 51. README.md:84

**Observação:** "also has a standalone `App.tsx` entry".

**Interpretação:** Afirma que cada pacote roda sozinho. A afirmação é corroborada.

### 52. README.md:84

**Observação:** "visiting a remote's own deployed URL directly still renders something meaningful".

**Interpretação:** Afirma que cada remote tem endereço publicado próprio. Só os remotes de conversão e manipulação são publicados, em subcaminhos do mesmo site, e a afirmação é corroborada em parte.

### 53. README.md:88

**Observação:** "Deployed as one GitHub Pages site (`/devpulse-mfe/`)".

**Interpretação:** Afirma que as unidades são publicadas juntas num só site. A afirmação é corroborada e contradiz a de #39.

### 54. README.md:88-97

**Observação:** "assembled from six independent builds", com um diagrama que copia os seis `dist` para `site/`.

**Interpretação:** Afirma que o site reúne os seis builds. O workflow só copia o shell e dois remotes, e a afirmação é contradita.

### 55. README.md:99

**Observação:** "The shell's production config points at those exact URLs".

**Interpretação:** Afirma que a configuração do host usa os endereços publicados dos remotes. A configuração aponta para os cinco caminhos, e a afirmação é corroborada.

### 56. README.md:116

**Observação:** "deploy.yml runs only on push to `main` (or manual dispatch): it lints and builds everything, assembles the combined site, and deploys to GitHub Pages".

**Interpretação:** Descreve um deploy que constrói tudo e publica um site combinado. A afirmação é corroborada.

### 57. packages/dev-utils-remote/src/index.ts:1-2

**Observação:** "Module Federation requires the real entry point to be loaded asynchronously so the shared module scope can initialize before this app touches React." O mesmo comentário está no `index.ts` das outras cinco unidades.

**Interpretação:** Explica o bootstrap assíncrono pelo escopo compartilhado do Module Federation. A afirmação é corroborada.

### 58. 310dc85 2026-09-01 (mensagem); f4321e2 2026-09-01 (.github/workflows/deploy.yml); 25e6a9b 2026-09-01 (.github/workflows/deploy.yml)

**Observação:** A mensagem do primeiro commit já anuncia "a single GitHub Pages deployment". As duas versões legíveis do `deploy.yml` montam um único diretório `site` e o publicam num único artefato. As versões antigas do README não estão no clone.

**Interpretação:** Nunca se observa um estágio com deploy por unidade; "independently deployed" descreve a arquitetura pretendida. O ponto está esclarecido.

### 59. f4321e2 2026-09-01 (.github/workflows); 25e6a9b 2026-09-01 (.github/workflows, README.md); d0b0a84 2026-09-01 (.github/workflows); 5062d12 2026-09-01 (README.md); fcca491 2026-09-01 (README.md)

**Observação:** `25e6a9b` acrescenta dev-utils à matriz do CI e ao site; `d0b0a84` devolve os dois workflows à versão de `f4321e2`, com a mensagem "push blocked without workflow OAuth scope". `5062d12` e `fcca491` atualizam o README sem tocar nos workflows. Nenhum commit posterior altera `.github/`.

**Interpretação:** Os workflows do snapshot são os do estágio com shell e dois remotes, e o README descreve o estágio seguinte, com seis pacotes. A ligação dos três remotes ao CI e ao deploy ficou pendente por bloqueio de permissão. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/dev-utils-remote, Marcadores, Entrada e Build); 3.4.4 (packages/shell/src/App.tsx:9, Observação); 3.4.5 #3 (Configuração); 3.4.6 #1 (Onde é servida e Artefatos); 3.4.7 #20 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #21; configura #29 |
| 2 | 3.4.3 (packages/ocr-remote, Marcadores, Entrada e Build); 3.4.4 (packages/shell/src/App.tsx:11, Observação); 3.4.5 #5 (Configuração); 3.4.6 #2 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #31 |
| 3 | 3.4.3 (packages/pdf-conversion-remote, Marcadores, Entrada e Build); 3.4.4 (packages/shell/src/App.tsx:7, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Onde é servida e Artefatos); 3.4.7 #1, #6, #12, #13 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #23; configura #27 |
| 4 | 3.4.3 (packages/pdf-form-filler-remote, Marcadores, Entrada e Build); 3.4.4 (packages/shell/src/App.tsx:10, Observação); 3.4.5 #4 (Configuração); 3.4.6 #4 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #30 |
| 5 | 3.4.3 (packages/pdf-manipulation-remote, Marcadores, Entrada e Build); 3.4.4 (packages/shell/src/App.tsx:8, Observação); 3.4.5 #2 (Configuração); 3.4.6 #5 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #25; configura #28 |
| 6 | 3.4.3 (packages/shell, Marcadores, Entrada e Build); 3.4.4 (packages/shell/src/App.tsx:7-11, Observação); 3.4.5 #1-#5 (Configuração); 3.4.6 #3, #5, #6 (Onde é servida e Artefatos); 3.4.7 #3, #4, #8, #13, #18, #20 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #27; configura #28; configura #29; configura #30; configura #31 |
| 7 | 3.4.4 (packages/shell/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #27 |
| 8 | 3.4.4 (packages/shell/src/App.tsx:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #28 |
| 9 | 3.4.4 (packages/shell/src/App.tsx:9) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 10 | 3.4.4 (packages/shell/src/App.tsx:10) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #30 |
| 11 | 3.4.4 (packages/shell/src/App.tsx:11) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #31 |
| 12 | 3.4.4 (packages/dev-utils-remote/src/index.ts:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (packages/ocr-remote/src/index.ts:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 14 | 3.4.4 (packages/pdf-conversion-remote/src/index.ts:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 15 | 3.4.4 (packages/pdf-form-filler-remote/src/index.ts:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 16 | 3.4.4 (packages/pdf-manipulation-remote/src/index.ts:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 17 | 3.4.4 (packages/shell/src/index.ts:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 18 | 3.4.4 (packages/shell/src/App.tsx:34) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #27; implementa #28; implementa #29; implementa #30; implementa #31 |
| 19 | 3.4.4 (packages/shell/src/App.tsx:164) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #27; implementa #28; implementa #29; implementa #30; implementa #31 |
| 20 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 21 | 3.4.3 (packages/dev-utils-remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (packages/ocr-remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (packages/pdf-conversion-remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (packages/pdf-form-filler-remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (packages/pdf-manipulation-remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 26 | 3.4.3 (packages/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #23 |
| 28 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #25 |
| 29 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #21 |
| 30 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #24 |
| 31 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #22 |
| 32 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #21 |
| 33 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #22 |
| 34 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #23 |
| 35 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #24 |
| 36 | 3.4.6 #5 | 6 build-deploy | CI | — | arquitetural | moderada | publica #25 |
| 37 | 3.4.6 #6 | 6 build-deploy | CI | — | arquitetural | moderada | publica #26 |
| 38 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26 |
| 39 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #32; contradiz #33; contradiz #34; contradiz #35; contradiz #36; contradiz #37 |
| 40 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #6; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 41 | 3.4.7 #4 | 7 documentação | documentação | — | contexto | fraca | corrobora #37 |
| 42 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | corrobora #20 |
| 43 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora #33; corrobora #34; corrobora #35; corrobora #36; corrobora #37 |
| 44 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz .github/workflows/ci.yml:18; contradiz #32; contradiz #33; contradiz #35 |
| 45 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/shell/package.json:10-13; corrobora #6; corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #11 |
| 46 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #18; corrobora #19; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 47 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/shell/src/App.tsx:133-168; corrobora packages/shell/src/Introduction.tsx:14-30; corrobora packages/shell/src/RemoteErrorBoundary.tsx:24-42 |
| 48 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #20 |
| 49 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 50 | 3.4.7 #13 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #6 |
| 51 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26 |
| 52 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #34; corrobora em parte #36 |
| 53 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #34; corrobora #36; corrobora #37 |
| 54 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | contradiz .github/workflows/deploy.yml:39-44; contradiz #32; contradiz #33; contradiz #35 |
| 55 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 56 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora .github/workflows/deploy.yml:3-6; corrobora #34; corrobora #36; corrobora #37 |
| 57 | 3.4.7 #20 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #12; corrobora #1; corrobora #6 |
| 58 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #39; explica #34; explica #36; explica #37 |
| 59 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #44; explica #52; explica #54; explica #32; explica #33; explica #35 |

## Resumo

Observações: 59. Dimensões (tecnologia: 0, configuração: 6, código: 13, estrutura: 7, composição: 5, build-deploy: 6, documentação: 20, histórico: 2). Força (forte: 12, moderada: 18, fraca: 29, ambígua: 0). Evidência (tecnológica: 13, arquitetural: 43, contexto: 3).
