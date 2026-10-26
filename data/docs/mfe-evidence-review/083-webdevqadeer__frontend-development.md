---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

# 083 — webdevqadeer/frontend-development

## Leitura do repositório

Exemplo de marketplace em `react/mv-marketplace/`, um monorepo de npm workspaces (#20) com cinco aplicações Vite, um shell e quatro remotes (#21 a #25), e uma biblioteca de tema que não é unidade (#26). A cadeia de Module Federation está declarada de ponta a ponta:
- **Dependências:** `@originjs/vite-plugin-federation`, nas cinco aplicações (#1 a #5).
- **Configuração:** cada remote se declara e expõe `./App` (#6 a #9). O shell nomeia os quatro remotes por URL de `localhost` (#10).
- **Código:** o shell importa os quatro `<remote>/App` por `React.lazy` (#11 a #14) e os põe numa tabela de rotas (#15 a #19).
- **Relações:** isso resulta em quatro relações host → remote (#27 a #30).

O elo que falha é a entrada do shell. `main.jsx` importa `./App.jsx`, e o snapshot só tem `src/app.jsx`, que é o arquivo que usa o roteador. Num sistema de arquivos sensível à caixa, a cadeia não alcança o roteador. Por isso o limite do shell (#25), as nove construções de código (#11 a #19) e as quatro relações (#27 a #30) ficam ambíguos: não se sabe se a composição está ativa ou se não chega a acontecer. O histórico mostra que essa divergência existe desde o primeiro commit, e não vem de uma renomeação (#44). A relação com o payment tem também um desencontro de nome, `payment_app` no shell e `payment-app` no remote (#8, #30).

Um sinal engana: as cinco configurações declaram um remote `package` em `localhost:5005` (#31 a #35), que um comentário chama de "The remote package" (#42). Nenhuma unidade do snapshot serve esse endereço, e nenhum código o importa. O histórico mostra que havia um diretório `package` no primeiro commit, removido no seguinte, e que as declarações ficaram (#45). A biblioteca `mv-theme` não configura federação e não é importada (#26).

Os cinco builds são separados (#36 a #40), sem deploy observado. A documentação se resume a três comentários da configuração do admin (#41 a #43).

## Observações

### 1. react/mv-marketplace/apps/admin/package.json:18

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do admin.

### 2. react/mv-marketplace/apps/buyer/package.json:18

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do buyer.

### 3. react/mv-marketplace/apps/payment/package.json:18

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do payment.

### 4. react/mv-marketplace/apps/seller/package.json:18

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do seller.

### 5. react/mv-marketplace/apps/shell/package.json:19

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell.

### 6. react/mv-marketplace/apps/admin/vite.config.js:1-21

**Observação:** `federation` declara `name: "admin_app"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, `remotes: { package: "http://localhost:5005/assets/remoteEntry.js" }` e `shared: ["react", "react-dom"]`. `preview` na porta 5003.

**Interpretação:** O admin está configurado como remote e oferece sua tela a um host. Também declara consumir um remote `package`.

**Nota:** A força segue o caso de configuração de uma unidade só. O remote `package` não corresponde a nenhuma unidade do snapshot (#31), então a declaração não liga o admin a outra parte.

### 7. react/mv-marketplace/apps/buyer/vite.config.js:1-21

**Observação:** `federation` declara `name: "buyer_app"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, o mesmo remote `package` e `shared: ["react", "react-dom"]`. `preview` na porta 5001.

**Interpretação:** O buyer está configurado como remote e oferece sua tela a um host.

**Nota:** Como em #6, o remote `package` não liga a unidade a outra parte (#32).

### 8. react/mv-marketplace/apps/payment/vite.config.js:1-19

**Observação:** `federation` declara `name: "payment-app"`, com hífen, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, o mesmo remote `package` e `shared: ["react", "react-dom"]`. `preview` na porta 5004.

**Interpretação:** O payment está configurado como remote. O nome difere no separador da chave `payment_app` que o shell usa.

**Nota:** Como em #6, o remote `package` não liga a unidade a outra parte (#33).

### 9. react/mv-marketplace/apps/seller/vite.config.js:1-19

**Observação:** `federation` declara `name: "seller_app"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, o mesmo remote `package` e `shared: ["react", "react-dom"]`. `preview` na porta 5002.

**Interpretação:** O seller está configurado como remote e oferece sua tela a um host.

**Nota:** Como em #6, o remote `package` não liga a unidade a outra parte (#34).

### 10. react/mv-marketplace/apps/shell/vite.config.js:1-35

**Observação:** `federation` declara `name: "shell_app"` e `remotes` `buyer_app`, `seller_app`, `admin_app` e `payment_app` em `http://localhost:5001` a `5004/assets/remoteEntry.js`, mais `package` em `5005`, com `shared: ["react", "react-dom"]`.

**Interpretação:** A configuração do host declara os quatro remotes do snapshot e onde encontrá-los, e um quinto sem unidade correspondente.

### 11. react/mv-marketplace/apps/shell/src/router.jsx:4

**Observação:** `const Buyer = React.lazy(() => import("buyer_app/App"));`.

**Interpretação:** O shell carrega o módulo exposto pelo buyer, pelo nome dele. Continuam plausíveis duas leituras: a carga acontece, se a entrada do shell chegar ao roteador, ou não acontece, porque `main.jsx` importa um `App.jsx` que não existe com essa caixa.

### 12. react/mv-marketplace/apps/shell/src/router.jsx:5

**Observação:** `const Seller = React.lazy(() => import("seller_app/App"));`.

**Interpretação:** O shell carrega o módulo exposto pelo seller. As mesmas duas leituras de #11.

### 13. react/mv-marketplace/apps/shell/src/router.jsx:6

**Observação:** `const Admin = React.lazy(() => import("admin_app/App"));`.

**Interpretação:** O shell carrega o módulo exposto pelo admin. As mesmas duas leituras de #11.

### 14. react/mv-marketplace/apps/shell/src/router.jsx:7

**Observação:** `const Payment = React.lazy(() => import("payment_app/App"));`.

**Interpretação:** O shell carrega o módulo exposto pelo payment. As mesmas duas leituras de #11.

### 15. react/mv-marketplace/apps/shell/src/router.jsx:13-18

**Observação:** `<Routes>` com as rotas `/`, `/seller`, `/admin` e `/payment`, dentro de `<BrowserRouter>` e `<Suspense>`. O roteador é usado por `react/mv-marketplace/apps/shell/src/app.jsx:9`, mas `react/mv-marketplace/apps/shell/src/main.jsx:3` importa `./App.jsx`.

**Interpretação:** A tabela de rotas do shell liga um caminho a cada remote. As mesmas duas leituras de #11.

### 16. react/mv-marketplace/apps/shell/src/router.jsx:14

**Observação:** `<Route path="/" element={<Buyer />} />`.

**Interpretação:** A rota `/` renderiza o componente do buyer. As mesmas duas leituras de #11.

### 17. react/mv-marketplace/apps/shell/src/router.jsx:15

**Observação:** `<Route path="/seller" element={<Seller />} />`.

**Interpretação:** A rota `/seller` renderiza o componente do seller. As mesmas duas leituras de #11.

### 18. react/mv-marketplace/apps/shell/src/router.jsx:16

**Observação:** `<Route path="/admin" element={<Admin />} />`.

**Interpretação:** A rota `/admin` renderiza o componente do admin. As mesmas duas leituras de #11.

### 19. react/mv-marketplace/apps/shell/src/router.jsx:17

**Observação:** `<Route path="/payment" element={<Payment />} />`.

**Interpretação:** A rota `/payment` renderiza o componente do payment. As mesmas duas leituras de #11.

### 20. react/mv-marketplace; react/mv-marketplace/package.json:1-21

**Observação:** É o manifesto coordenador, com `workspaces` para `packages/mvp-theme` e as cinco aplicações e scripts que só disparam os dos workspaces. Não tem entrada de UI nem build de aplicação.

**Interpretação:** É a raiz de coordenação do workspace, não uma unidade frontend.

### 21. react/mv-marketplace/apps/admin; react/mv-marketplace/apps/admin/package.json:1-28; react/mv-marketplace/apps/admin/index.html:11; react/mv-marketplace/apps/admin/src/main.jsx:1-9; react/mv-marketplace/apps/admin/vite.config.js:5-21

**Observação:** É uma aplicação React com manifesto, `index.html`, entrada com `createRoot` e `vite build` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 22. react/mv-marketplace/apps/buyer; react/mv-marketplace/apps/buyer/package.json:1-28; react/mv-marketplace/apps/buyer/index.html:11; react/mv-marketplace/apps/buyer/src/main.jsx:1-9; react/mv-marketplace/apps/buyer/vite.config.js:5-21

**Observação:** É uma aplicação React com manifesto, `index.html`, entrada com `createRoot` e `vite build` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 23. react/mv-marketplace/apps/payment; react/mv-marketplace/apps/payment/package.json:1-28; react/mv-marketplace/apps/payment/index.html:11; react/mv-marketplace/apps/payment/src/main.jsx:1-9; react/mv-marketplace/apps/payment/vite.config.js:5-19

**Observação:** É uma aplicação React com manifesto, `index.html`, entrada com `createRoot` e `vite build` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 24. react/mv-marketplace/apps/seller; react/mv-marketplace/apps/seller/package.json:1-28; react/mv-marketplace/apps/seller/index.html:11; react/mv-marketplace/apps/seller/src/main.jsx:1-9; react/mv-marketplace/apps/seller/vite.config.js:5-19

**Observação:** É uma aplicação React com manifesto, `index.html`, entrada com `createRoot` e `vite build` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 25. react/mv-marketplace/apps/shell; react/mv-marketplace/apps/shell/package.json:1-29; react/mv-marketplace/apps/shell/index.html:11; react/mv-marketplace/apps/shell/src/main.jsx:3, 5-9; react/mv-marketplace/apps/shell/src/app.jsx:5-15; react/mv-marketplace/apps/shell/vite.config.js:6-35

**Observação:** Tem manifesto, `index.html`, entrada e `vite build` próprios. A entrada importa `./App.jsx`, e o snapshot só tem `src/app.jsx`.

**Interpretação:** Continuam plausíveis duas leituras: é uma unidade frontend cuja entrada resolve num sistema de arquivos insensível à caixa, ou uma unidade cuja entrada não monta o shell como escrita.

### 26. react/mv-marketplace/packages/mvp-theme; react/mv-marketplace/packages/mvp-theme/package.json:1-27; react/mv-marketplace/packages/mvp-theme/vite.config.js:7-24; react/mv-marketplace/packages/mvp-theme/src/index.js:1

**Observação:** É o pacote `mv-theme`, com build de biblioteca ES/UMD a partir de `src/index.js`, que reexporta um Button. Não tem `index.html` nem configuração de federação.

**Interpretação:** É uma biblioteca de componentes, não uma unidade frontend; nenhuma aplicação a importa.

### 27. react/mv-marketplace/apps/shell/src/router.jsx:4, 13, 14; react/mv-marketplace/apps/shell/vite.config.js:12; react/mv-marketplace/apps/buyer/vite.config.js:9-12

**Observação:** O shell importa `buyer_app/App` e o põe na rota `/`. A chave `buyer_app` aponta para `localhost:5001/assets/remoteEntry.js`, e o nome e o `./App` exposto correspondem aos do buyer.

**Interpretação:** É uma relação host → remote. Continuam plausíveis duas leituras: ativa, se a entrada do shell alcançar o roteador, ou declarada mas não executada, pela divergência de caixa da entrada.

### 28. react/mv-marketplace/apps/shell/src/router.jsx:5, 13, 15; react/mv-marketplace/apps/shell/vite.config.js:13; react/mv-marketplace/apps/seller/vite.config.js:9-11

**Observação:** O shell importa `seller_app/App` e o põe na rota `/seller`. A chave aponta para `localhost:5002`, e o nome e o `./App` correspondem aos do seller.

**Interpretação:** É uma relação host → remote, com as mesmas duas leituras de #27.

### 29. react/mv-marketplace/apps/shell/src/router.jsx:6, 13, 16; react/mv-marketplace/apps/shell/vite.config.js:14; react/mv-marketplace/apps/admin/vite.config.js:9-12

**Observação:** O shell importa `admin_app/App` e o põe na rota `/admin`. A chave aponta para `localhost:5003`, e o nome e o `./App` correspondem aos do admin.

**Interpretação:** É uma relação host → remote, com as mesmas duas leituras de #27.

### 30. react/mv-marketplace/apps/shell/src/router.jsx:7, 13, 17; react/mv-marketplace/apps/shell/vite.config.js:15; react/mv-marketplace/apps/payment/vite.config.js:9-11

**Observação:** O shell importa `payment_app/App` e o põe na rota `/payment`. A chave aponta para `localhost:5004`; o remote se declara `payment-app`, com hífen, e expõe `./App` em `remoteEntry.js`.

**Interpretação:** É uma relação host → remote, com as mesmas duas leituras de #27. A diferença de nome não é verificada em execução.

### 31. react/mv-marketplace/apps/admin/vite.config.js:14-16

**Observação:** O admin declara o remote `package` em `http://localhost:5005/assets/remoteEntry.js` e não o importa. Nenhuma configuração do snapshot usa `name: "package"` nem a porta 5005.

**Interpretação:** É uma relação só de configuração, para um destino sem unidade correspondente.

### 32. react/mv-marketplace/apps/buyer/vite.config.js:14-16

**Observação:** O buyer declara o mesmo remote `package` e não o importa.

**Interpretação:** É uma relação só de configuração, para um destino sem unidade correspondente.

### 33. react/mv-marketplace/apps/payment/vite.config.js:12-14

**Observação:** O payment declara o mesmo remote `package` e não o importa.

**Interpretação:** É uma relação só de configuração, para um destino sem unidade correspondente.

### 34. react/mv-marketplace/apps/seller/vite.config.js:12-14

**Observação:** O seller declara o mesmo remote `package` e não o importa.

**Interpretação:** É uma relação só de configuração, para um destino sem unidade correspondente.

### 35. react/mv-marketplace/apps/shell/vite.config.js:16

**Observação:** O shell declara o remote `package` junto dos outros quatro, e o roteador não o importa.

**Interpretação:** É uma relação só de configuração, para um destino sem unidade correspondente.

### 36. react/mv-marketplace/apps/admin/vite.config.js:5-21; react/mv-marketplace/apps/admin/package.json:8; react/mv-marketplace/package.json:15

**Observação:** Tem configuração e `vite build` próprios, que geram o `remoteEntry.js` do `admin_app`; a raiz só dispara o build. O único endereço é a porta 5003 do `vite preview`, e nada publica o build.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 37. react/mv-marketplace/apps/buyer/vite.config.js:5-21; react/mv-marketplace/apps/buyer/package.json:8; react/mv-marketplace/package.json:15

**Observação:** Mesmo arranjo de #36, com o `buyer_app` e a porta 5001.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 38. react/mv-marketplace/apps/payment/vite.config.js:5-19; react/mv-marketplace/apps/payment/package.json:8; react/mv-marketplace/package.json:15

**Observação:** Mesmo arranjo de #36, com o `payment-app` e a porta 5004.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 39. react/mv-marketplace/apps/seller/vite.config.js:5-19; react/mv-marketplace/apps/seller/package.json:8; react/mv-marketplace/package.json:15

**Observação:** Mesmo arranjo de #36, com o `seller_app` e a porta 5002.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 40. react/mv-marketplace/apps/shell/vite.config.js:6-35; react/mv-marketplace/apps/shell/package.json:8; react/mv-marketplace/package.json:15

**Observação:** Tem configuração com saída `dist` e `vite build` próprios; os remotes entram por URL em execução. O único endereço é a porta 5173 do servidor de desenvolvimento, e nada publica o build.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 41. react/mv-marketplace/apps/admin/vite.config.js:12

**Observação:** "Exposing the main app component".

**Interpretação:** Afirma que o admin expõe seu componente principal. A afirmação é corroborada.

### 42. react/mv-marketplace/apps/admin/vite.config.js:15

**Observação:** "The remote package".

**Interpretação:** Afirma que `package` é um remote. A declaração existe, mas nenhum artefato do snapshot é esse remote, e a afirmação é corroborada em parte.

### 43. react/mv-marketplace/apps/admin/vite.config.js:17

**Observação:** "Shared libraries".

**Interpretação:** Afirma que `react` e `react-dom` são compartilhados entre as unidades. A afirmação é corroborada.

### 44. 64fe384 2025-12-14 (React/mv-marketplace/shell-app/src/main.jsx, React/mv-marketplace/shell-app/src/app.jsx); 59eb629 2025-12-16 (react/mv-marketplace/apps/shell/src/main.jsx, react/mv-marketplace/apps/shell/src/app.jsx)

**Observação:** `main.jsx` e `app.jsx` do shell aparecem juntos no primeiro commit e passam para `apps/shell/src/` com os mesmos objetos do snapshot. Nenhuma versão tem um `App.jsx` no shell. O `main.jsx` é o mesmo objeto das outras aplicações, que têm `App.jsx`.

**Interpretação:** A divergência de caixa não vem de estágios diferentes nem de renomeação. O histórico não mostra se a cadeia funcionou. O ponto está esclarecido.

### 45. 64fe384 2025-12-14 (React/mv-marketplace/package/); 59eb629 2025-12-16 (remoção de React/mv-marketplace/package/); be25e7c 2025-12-19 (apps/admin/vite.config.js, apps/shell/vite.config.js); f8d2648 2025-12-20 (apps/shell/vite.config.js)

**Observação:** O primeiro commit tem um diretório `package` com forma de aplicação Vite, e a mensagem anuncia "Shared UI remote". `59eb629` o remove, e nenhum commit o recria. As configurações de buyer, payment e seller têm no snapshot os objetos do primeiro commit.

**Interpretação:** O remote `package` aponta para um artefato que existiu e foi removido; as declarações ficaram. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (react/mv-marketplace/apps/admin/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 2 | 3.4.2 (react/mv-marketplace/apps/buyer/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 3 | 3.4.2 (react/mv-marketplace/apps/payment/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 4 | 3.4.2 (react/mv-marketplace/apps/seller/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #9 |
| 5 | 3.4.2 (react/mv-marketplace/apps/shell/package.json:19) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #10 |
| 6 | 3.4.2 (react/mv-marketplace/apps/admin/package.json:18, Evidência); 3.4.3 (react/mv-marketplace/apps/admin, Marcadores e Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:6, Observação); 3.4.5 #3, #5 (Configuração); 3.4.6 #1 (Onde é servida e Artefatos); 3.4.7 #1, #2, #3 (Documento e Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #21; configura #29; configura #31 |
| 7 | 3.4.2 (react/mv-marketplace/apps/buyer/package.json:18, Evidência); 3.4.3 (react/mv-marketplace/apps/buyer, Marcadores e Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:4, Observação); 3.4.5 #1, #6 (Configuração); 3.4.6 #2 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #27; configura #32 |
| 8 | 3.4.2 (react/mv-marketplace/apps/payment/package.json:18, Evidência); 3.4.3 (react/mv-marketplace/apps/payment, Marcadores e Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:7, Observação); 3.4.5 #4, #7 (Configuração); 3.4.6 #3 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #23; configura #30; configura #33 |
| 9 | 3.4.2 (react/mv-marketplace/apps/seller/package.json:18, Evidência); 3.4.3 (react/mv-marketplace/apps/seller, Marcadores e Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:5, Observação); 3.4.5 #2, #8 (Configuração); 3.4.6 #4 (Onde é servida e Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #28; configura #34 |
| 10 | 3.4.2 (react/mv-marketplace/apps/shell/package.json:19, Evidência); 3.4.3 (react/mv-marketplace/apps/shell, Marcadores e Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:4-7, Observação); 3.4.5 #1-#4, #9 (Configuração); 3.4.6 #1-#5 (Onde é servida e Artefatos); 3.4.7 #3 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #25; configura #27; configura #28; configura #29; configura #30; configura #35 |
| 11 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:4) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #27 |
| 12 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:5) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #28 |
| 13 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:6) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #29 |
| 14 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:7) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #30 |
| 15 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:13) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #27; implementa #28; implementa #29; implementa #30 |
| 16 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:14) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #27 |
| 17 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:15) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #28 |
| 18 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:16) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #29 |
| 19 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:17) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #30 |
| 20 | 3.4.3 (react/mv-marketplace) | 4 estrutura | diretório | — | contexto | fraca | — |
| 21 | 3.4.3 (react/mv-marketplace/apps/admin) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (react/mv-marketplace/apps/buyer) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (react/mv-marketplace/apps/payment) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (react/mv-marketplace/apps/seller) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (react/mv-marketplace/apps/shell) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 26 | 3.4.3 (react/mv-marketplace/packages/mvp-theme) | 4 estrutura | diretório | — | contexto | fraca | — |
| 27 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | ambígua | liga #25; liga #22 |
| 28 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | ambígua | liga #25; liga #24 |
| 29 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | ambígua | liga #25; liga #21 |
| 30 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | ambígua | liga #25; liga #23 |
| 31 | 3.4.5 #5 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #21; liga react/mv-marketplace/apps/admin/vite.config.js:15 |
| 32 | 3.4.5 #6 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #22; liga react/mv-marketplace/apps/buyer/vite.config.js:15 |
| 33 | 3.4.5 #7 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #23; liga react/mv-marketplace/apps/payment/vite.config.js:13 |
| 34 | 3.4.5 #8 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #24; liga react/mv-marketplace/apps/seller/vite.config.js:13 |
| 35 | 3.4.5 #9 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #25; liga react/mv-marketplace/apps/shell/vite.config.js:16 |
| 36 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #21 |
| 37 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #22 |
| 38 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #23 |
| 39 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #24 |
| 40 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #25 |
| 41 | 3.4.7 #1 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #6 |
| 42 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #31 |
| 43 | 3.4.7 #3 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #6; corrobora #10 |
| 44 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #25; explica #11; explica #12; explica #13; explica #14; explica #15; explica #16; explica #17; explica #18; explica #19; explica #27; explica #28; explica #29; explica #30 |
| 45 | 3.4.8 #2 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #31; explica #32; explica #33; explica #34; explica #35; explica #42 |

## Resumo

Observações: 45. Dimensões (tecnologia: 5, configuração: 5, código: 9, estrutura: 7, composição: 9, build-deploy: 5, documentação: 3, histórico: 2). Força (forte: 1, moderada: 18, fraca: 12, ambígua: 14). Evidência (tecnológica: 11, arquitetural: 32, contexto: 2).
