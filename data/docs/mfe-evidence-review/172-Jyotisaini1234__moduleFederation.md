---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
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

# 172 — Jyotisaini1234/moduleFederation

## Leitura do repositório

É um exemplo mínimo de Module Federation com webpack 5. Tem dois projetos React irmãos e nenhum workspace na raiz: `mfe1` é o host (#9) e `mfe2` é o remote (#10). Cada um tem build próprio, e nenhum tem deploy observado (#12, #13).

A cadeia que sustenta a arquitetura está toda no snapshot, mas não passa pela dependência declarada:
- **Configuração:** o `ModuleFederationPlugin` embutido no webpack declara, no host, o remote `app2` e o endereço do seu `remoteEntry.js` (#2). No remote, declara o nome `app2`, o `remoteEntry.js` e o módulo exposto `./App` (#3). As duas unidades compartilham `react` e `react-dom` como singletons.
- **Código:** o host importa `app2/App` em runtime pelo nome do remote (#4) e renderiza o componente abaixo do seu próprio título (#8).
- **Relação:** daí sai uma relação host → remote ativa, com o destino no snapshot (#11).

Um sinal engana: a única dependência ligada à federação, `@module-federation/node`, está declarada e não é usada (#1). A federação vem do plugin do próprio webpack. O histórico não diz se ela já foi usada (#16). Também há uma versão alternativa do `App` do host, com import remoto condicional para SSR, toda comentada (#5); o histórico não diz se ela foi ativa antes (#17). Os bootstraps assíncronos das duas unidades (#6, #7) são o padrão do Module Federation, mas sozinhos não mostram a tecnologia.

A documentação é mínima: o README só tem o título, e as duas afirmações estão em textos dentro do código e da configuração do host (#14, #15). Ambas são corroboradas. O endereço do remote é o do servidor de desenvolvimento (`localhost:3002`), então a composição só é observada em ambiente local. Nada fica ambíguo no snapshot.

## Observações

### 1. mfe1/package.json:15

**Observação:** `@module-federation/node` (`^2.7.14`) está declarada em `dependencies` da `mfe1`. Nenhum arquivo de código ou de build do snapshot a importa ou invoca. O `ModuleFederationPlugin` usado vem de `webpack.container` (mfe1/webpack.config.ts:5, 11-12).

**Interpretação:** É uma declaração sem uso. A tecnologia de federação está configurada por outro pacote, o próprio webpack.

### 2. mfe1/webpack.config.ts:74-89

**Observação:** `new ModuleFederationPlugin({ name: 'app1', remotes: { app2: 'app2@http://localhost:3002/remoteEntry.js' }, shared: { react, 'react-dom' } })`, com `react` e `react-dom` como `singleton` e `requiredVersion: '^18.2.0'`. O plugin vem de `webpack.container` (mfe1/webpack.config.ts:11-12).

**Interpretação:** A configuração do host declara o remote `app2` e onde encontrá-lo em desenvolvimento, e compartilha o React com ele.

### 3. mfe2/webpack.config.ts:37-42

**Observação:** `new ModuleFederationPlugin({ name: 'app2', filename: 'remoteEntry.js', exposes: { './App': './src/App.tsx' }, shared: { react: { singleton: true }, 'react-dom': { singleton: true } } })`. O plugin vem de `webpack.container` (mfe2/webpack.config.ts:6-7).

**Interpretação:** A unidade se configura como remote `app2`, publica o `remoteEntry.js` e expõe um módulo, `./App`.

### 4. mfe1/src/App.tsx:4; mfe1/src/App.tsx:3-12

**Observação:** `React.lazy(() => import("app2/App").catch(...))`. Em caso de falha, um componente de fallback mostra "Failed to load Remote App" e "Make sure app2 is running on port 3002". O `App` é renderizado a partir de mfe1/src/index.tsx:3 → mfe1/src/bootstrap.tsx:15, 18.

**Interpretação:** O host carrega em runtime o módulo `./App` do remote `app2` pelo nome.

### 5. mfe1/src/App.tsx:39; mfe1/src/App.tsx:35-53

**Observação:** A linha `lazy(() => import('app2/App')...)` está num bloco todo comentado com `//`, que é uma versão alternativa do `App` com import condicional a `typeof window !== 'undefined'` e fallback para SSR.

**Interpretação:** É um carregamento remoto desativado, que não participa da composição.

### 6. mfe1/src/index.tsx:3

**Observação:** `import("./bootstrap")`, depois de `window.app2Url = "http://localhost:3002"` na linha 1.

**Interpretação:** É um bootstrap assíncrono interno ao host.

### 7. mfe2/src/index.tsx:1

**Observação:** `import("./bootstrap")`.

**Interpretação:** É um bootstrap assíncrono interno ao remote.

### 8. mfe1/src/App.tsx:26; mfe1/src/App.tsx:25-27

**Observação:** `<RemoteApp2 />`, dentro de `<Suspense fallback={<div>Loading Remote App...</div>}>`, abaixo do título "Product Listing" do host. O componente vem do `React.lazy` das linhas 3-12.

**Interpretação:** O host renderiza o componente federado do remote na sua página.

### 9. mfe1; mfe1/webpack.config.ts:19; mfe1/src/bootstrap.tsx:12-19; mfe1/webpack.config.ts:18-101; mfe1/package.json:9

**Observação:** É uma aplicação React com `package.json` próprio, entrada `./src/index.tsx`, página gerada de `./public/index.html` e build webpack próprio (`--mode production`). O bootstrap usa `hydrateRoot` ou `createRoot(...).render(<App />)`.

**Interpretação:** É uma unidade frontend com limite próprio: o host.

### 10. mfe2; mfe2/webpack.config.ts:13; mfe2/src/bootstrap.tsx:10-11; mfe2/webpack.config.ts:12-45; mfe2/package.json:9

**Observação:** É uma aplicação React com `package.json` próprio, entrada `./src/index.tsx`, página gerada de `./public/index.html` e build webpack próprio (`--mode production`). O bootstrap usa `createRoot(container)` e `root.render(<App />)`.

**Interpretação:** É uma unidade frontend com limite próprio: o remote.

### 11. mfe1/src/App.tsx:4; mfe1/src/App.tsx:26; mfe1/webpack.config.ts:74-78; mfe2/webpack.config.ts:37-40

**Observação:** O host `mfe1` declara o remote `app2` em `http://localhost:3002/remoteEntry.js`. A `mfe2` tem `name: 'app2'`, `filename: 'remoteEntry.js'` e expõe `./App`. O host importa `app2/App` e renderiza o componente. As duas unidades estão no snapshot.

**Interpretação:** É uma relação host → remote ativa por Module Federation, de `mfe1` para `mfe2`.

### 12. mfe1/package.json:9; mfe1/webpack.config.ts:18-101

**Observação:** O script `build` roda o webpack com `--mode production` sobre o `webpack.config.ts` da `mfe1`, com saída em `mfe1/dist` e nomes por `contenthash`. A unidade só é servida por `webpack serve` em `http://localhost:3001/`. Não há artefato de deploy, e a versão é `1.0.0`. O servidor SSR em mfe1/src/server/server.ts não é executado por nenhum script.

**Interpretação:** Há uma fronteira de build própria do host, sem deploy observado.

### 13. mfe2/package.json:9; mfe2/webpack.config.ts:12-45

**Observação:** O script `build` roda o webpack com `--mode production` sobre o `webpack.config.ts` da `mfe2`, que gera o `remoteEntry.js`. A unidade só é servida por `webpack serve` em `http://localhost:3002/`, o endereço em que o host a procura. Não há artefato de deploy, e a versão é `1.0.0`.

**Interpretação:** Há uma fronteira de build própria do remote, sem deploy observado.

### 14. mfe1/src/App.tsx:8

**Observação:** "Make sure app2 is running on port 3002", na mensagem que o host mostra quando o `import("app2/App")` falha.

**Interpretação:** Afirma que o app2 é uma aplicação à parte, servida na porta 3002. O servidor de desenvolvimento da `mfe2` usa essa porta, e é nela que o host procura o `remoteEntry.js`. A afirmação é corroborada.

### 15. mfe1/webpack.config.ts:92

**Observação:** "App 1 - Host Application", no `title` passado ao `HtmlWebpackPlugin` da `mfe1`.

**Interpretação:** Afirma que a `mfe1` é a aplicação host. Ela é unidade frontend e declara o remote `app2`. A afirmação é corroborada.

### 16. a38408a 2025-08-22 (mfe1/package.json); 5cf7cbb 2025-08-27 (mfe1/package.json, mfe1/webpack.config.ts)

**Observação:** O `mfe1/package.json` é criado em `a38408a` e alterado só em `5cf7cbb`, cuja versão é a do snapshot. A versão de `a38408a` não está disponível no clone. Em `a38408a`, o `node_modules` versionado da `mfe1` tem `react`, mas não `@module-federation`.

**Interpretação:** O pacote não estava instalado no estado versionado de `a38408a`, mas não dá para saber se a configuração já o usou. O ponto é inconclusivo, só sobre o passado: no snapshot, a dependência está só declarada.

### 17. a38408a 2025-08-22 (mfe1/src/App.tsx); 5cf7cbb 2025-08-27 (mfe1/src/App.tsx)

**Observação:** O `mfe1/src/App.tsx` é criado em `a38408a` e alterado só em `5cf7cbb` ("save"), cuja versão é a do snapshot, com o bloco comentado ao lado da versão ativa. A versão de `a38408a` não está disponível. O servidor SSR, a que o bloco se refere, aparece no mesmo `5cf7cbb`.

**Interpretação:** Não dá para saber se o bloco comentado já foi a versão ativa. O ponto é inconclusivo, só sobre o passado: no snapshot, o bloco está desativado.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (mfe1/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 2 | 3.4.2 (mfe1/package.json:15, Evidência); 3.4.3 (mfe1, Marcadores, Entrada e Build); 3.4.4 (mfe1/src/App.tsx:4, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.6 #2 (Onde é servida); 3.4.7 #1, #2 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #9; configura #11 |
| 3 | 3.4.3 (mfe2, Marcadores, Entrada e Build); 3.4.4 (mfe1/src/App.tsx:4, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #10; configura #11 |
| 4 | 3.4.4 (mfe1/src/App.tsx:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #11 |
| 5 | 3.4.4 (mfe1/src/App.tsx:39) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 6 | 3.4.4 (mfe1/src/index.tsx:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 (mfe2/src/index.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 8 | 3.4.4 (mfe1/src/App.tsx:26) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #11 |
| 9 | 3.4.3 (mfe1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 10 | 3.4.3 (mfe2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #9; liga #10 |
| 12 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #9 |
| 13 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #10 |
| 14 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #13; corrobora #11; corrobora #2; corrobora mfe2/webpack.config.ts:15-18 |
| 15 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #9; corrobora #11; corrobora #2 |
| 16 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #1 |
| 17 | 3.4.8 #2 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #5 |

## Resumo

Observações: 17. Dimensões (tecnologia: 1, configuração: 2, código: 5, estrutura: 2, composição: 1, build-deploy: 2, documentação: 2, histórico: 2). Força (forte: 3, moderada: 6, fraca: 8, ambígua: 0). Evidência (tecnológica: 7, arquitetural: 10, contexto: 0).
