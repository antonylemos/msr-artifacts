---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
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

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Leitura do repositório

Prova de conceito single-spa com sete projetos irmãos e nenhum manifesto na raiz: o root config `root-config`, as aplicações `react-app` (React com webpack), `angular-app` (Angular 12), `react-vite-app` (React com Vite), um scaffold `vue-app` e duas bibliotecas compartilhadas em runtime, `common-lib-webpack` e `styleguide`. Cada projeto tem `package.json` e lockfile próprios, e o README manda instalar e rodar cada um dentro da sua pasta (README.md:4-27). Os builds são todos individuais: `webpack --mode=production` no root config e na `react-app` (root-config/package.json:9; react-app/package.json:6), `ng build` com o builder `@angular-builders/custom-webpack:browser` e saída em `dist/angular-app` na `angular-app` (angular-app/package.json:7; angular-app/angular.json:20-23), `tsc -b && vite build` com saída `format: "system"` na `react-vite-app` (react-vite-app/package.json:8; react-vite-app/vite.config.ts:24-25) e `vite build` na `vue-app` (vue-app/package.json:6, 8). Nenhum script dispara os builds juntos.

Não há artefato de deploy no snapshot: nem Dockerfile, nem compose, nem workflow de CI, nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` ou `cfg-public-path`. Os únicos hooks são os `pre-commit` do husky no root config e na `react-app`, que rodam formatação, testes e lint (root-config/package.json:11-15; react-app/package.json:15-19), sem build nem publicação.

Tudo o que o snapshot executa é de desenvolvimento. O root config sobe com `webpack serve --port 9000 --env isLocal` (root-config/package.json:4), e o import map que liga as aplicações a portas de `localhost` só é emitido quando `isLocal` é verdadeiro (root-config/src/index.ejs:62-85); o import map de produção é um comentário com espaço reservado, `src="/importmap.json"` (root-config/src/index.ejs:59-60). As aplicações sobem com `webpack serve` (react-app/package.json:4), `ng s --port 4200` (angular-app/package.json:11) e `vite build --watch` em paralelo com `vite preview` (react-vite-app/package.json:10-11). O próprio build de produção da `angular-app` fixa `deployUrl: http://localhost:4200/` (angular-app/angular.json:36), ou seja, o bundle gerado só funciona servido nessa porta local.

As duas bibliotecas compartilhadas não são aplicações frontend na revisão estrutural, mas fazem parte da mesma montagem local: `common-lib-webpack` é servida pelo `webpack serve` na porta 9001, com cabeçalhos CORS abertos (common-lib-webpack/webpack.config.js:34-40), e `styleguide` pelo `vite preview` na 3002 (styleguide/package.json:15; styleguide/vite.config.ts:39-41); o import map local aponta para as duas (root-config/src/index.ejs:70-71). Só a `common-lib-webpack` tem versão diferente de `0.0.0` (common-lib-webpack/package.json:3), e nenhuma das duas é publicada.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | angular-app | separado | não observado | `http://localhost:4200/`, só em desenvolvimento com `ng s` (angular-app/package.json:11; angular-app/angular.json:36; root-config/src/index.ejs:68) | No | angular-app/package.json:7 (`ng build`); angular-app/package.json:10 (`ng build angular-app --prod`); angular-app/angular.json:20-36 (builder custom-webpack, `outputPath: dist/angular-app`, `main: src/main.single-spa.ts`, `libraryName: angular-app`, `libraryTarget: umd`, `deployUrl`); angular-app/extra-webpack.config.js:4-10 (`singleSpaAngularWebpack` e external da biblioteca comum) |
| 2 | react-app | separado | não observado | `//localhost:8080/org1-react-app.js`, só em desenvolvimento com `webpack serve` (react-app/package.json:4; root-config/src/index.ejs:67) | No | react-app/package.json:6 (`webpack --mode=production`); react-app/webpack.config.js:5-18 (`webpack-config-single-spa-react-ts`, `orgName: "org1"`, `projectName: "react-app"`, externals) |
| 3 | react-vite-app | separado | não observado | `//localhost:3001/spa.js`, só em desenvolvimento com `vite preview` (react-vite-app/package.json:10-11; react-vite-app/vite.config.ts:39; root-config/src/index.ejs:69) | No | react-vite-app/package.json:8 (`tsc -b && vite build`); react-vite-app/vite.config.ts:14-41 (saída `format: "system"`, externals, `vitePluginSingleSpa` com `spaEntryPoints: ["src/spa.tsx"]`) |
| 4 | root-config | separado | não observado | `localhost:9000`, só em desenvolvimento com `webpack serve` (root-config/package.json:4; root-config/src/index.ejs:66) | No | root-config/package.json:9 (`webpack --mode=production`); root-config/webpack.config.js:5-28 (`webpack-config-single-spa-ts`, `projectName: "root-config"`, `HtmlWebpackPlugin` com `src/index.ejs`) |
| 5 | vue-app | separado | não observado | `localhost:4173`, só em desenvolvimento com `vite preview` (vue-app/package.json:7) | No | vue-app/package.json:6, 8 (`run-p type-check build-only` → `vite build`); vue-app/vite.config.ts:8-15 (plugins Vue, sem opção de saída) |

## Observações

**1. angular-app.** Build próprio pelo Angular CLI, com o builder `custom-webpack` e a configuração `extra-webpack.config.js`, que aplica `singleSpaAngularWebpack` e externaliza a biblioteca comum (angular-app/angular.json:20-35; angular-app/extra-webpack.config.js:4-10). O artefato fica em `dist/angular-app` e sai como biblioteca UMD `angular-app` (angular-app/angular.json:23, 33-34). O `deployUrl` fixo em `http://localhost:4200/` vale para todas as configurações de build (angular-app/angular.json:36), e o import map local pede `main.js` nessa porta (root-config/src/index.ejs:68): o build serve à montagem local, não a uma publicação. A versão `0.0.0` com `private: true` (angular-app/package.json:3, 13) não é usada em nenhuma publicação.

**2. react-app.** Build próprio com o preset `webpack-config-single-spa-react-ts`; o nome do bundle `org1-react-app.js` pedido pelo import map local decorre de `orgName`/`projectName` (react-app/webpack.config.js:5-10; root-config/src/index.ejs:67). A porta 8080 só aparece no import map; o `webpack serve` não a declara (react-app/package.json:4). Há também `start:standalone` e `analyze` (react-app/package.json:5, 7), de desenvolvimento ou diagnóstico. O `package.json` não tem campo `version` (react-app/package.json:1-3).

**3. react-vite-app.** Build próprio pelo Vite, com saída SystemJS e o `vite-plugin-single-spa` no modo `mife`, porta 3001 e entrada `src/spa.tsx` (react-vite-app/vite.config.ts:24-25, 37-41). O script `dev:single-spa` roda o build em modo `--watch` e o `vite preview` ao mesmo tempo (react-vite-app/package.json:11): é o build de produção usado como servidor de desenvolvimento, sem publicação. A versão `0.0.0` com `private: true` (react-vite-app/package.json:3-4) não é usada.

**4. root-config.** Build próprio, que gera o root config e a página a partir de `src/index.ejs` (root-config/webpack.config.js:7-26). Sem artefato de deploy. A página de produção ficaria sem as aplicações: com `isLocal` falso, o import map com os endereços não é emitido, e o de produção está comentado (root-config/src/index.ejs:59-62, 85). O `package.json` não tem campo `version` (root-config/package.json:1-2).

**5. vue-app.** Build próprio pelo Vite (vue-app/package.json:6, 8), sem nenhuma configuração de saída além dos plugins Vue (vue-app/vite.config.ts:8-15). A aplicação não está no root config nem no import map (root-config/src/index.ejs:63-84), então não participa da montagem single-spa; o único endereço declarado é o do `vite preview` na porta 4173 (vue-app/package.json:7). A versão `0.0.0` (vue-app/package.json:3) não é usada em nenhuma publicação.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (não observado: 5). Versionamento independente: 0.
