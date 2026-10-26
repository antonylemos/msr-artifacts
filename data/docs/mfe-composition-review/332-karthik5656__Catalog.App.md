---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Leitura do repositório

Projeto de catálogo com backends .NET e três frontends React + Vite em `src/frontend/apps/`: o shell `ui-catalog` (porta 3000) e dois remotos, `ui-catalog-merchant` (3001) e `ui-catalog-consumer` (3002). A composição usa Module Federation pelo `@originjs/vite-plugin-federation`. O shell trata `remotes.json` como fonte única: cada entrada traz `scope`, URL do `remoteEntry.js`, módulo `./App`, rota e rótulo (src/frontend/apps/ui-catalog/remotes.json:2-15). O `vite.config.ts` do shell monta com isso o mapa `remotes` da federação (src/frontend/apps/ui-catalog/vite.config.ts:14-17, 85-89). Um plugin próprio gera no `buildStart` o arquivo `src/remoteApps.generated.tsx`, com um `React.lazy(() => import("<scope>/App"))` por remoto (src/frontend/apps/ui-catalog/vite.config.ts:26-59). Esse arquivo é ignorado pelo Git (src/frontend/apps/ui-catalog/.gitignore:15-16) e não está no snapshot. O `App` do shell cria uma rota `<route>/*` por remoto e renderiza o componente dentro de `Suspense` (src/frontend/apps/ui-catalog/src/App.tsx:14-28). O menu lista as mesmas rotas (src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:27-31). Tudo roda sob `BrowserRouter` com `basename="/ui-catalog"` (src/frontend/apps/ui-catalog/src/main.tsx:9).

Os dois remotos expõem `./App` como `remoteEntry.js` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23; src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23). Os dois `vite.config.ts` são iguais, a não ser pela porta (:9, :12): os dois se declaram `name: "consumerApp"` (:17). Assim o scope `merchantApp` do shell não corresponde ao `name` de nenhuma unidade, e o scope `consumerApp` corresponde ao `name` das duas. Por decisão do pesquisador para este repositório, o `name`/nome de arquivo declarado pelas duas unidades, junto com a porta da URL, conta como correspondência explícita: a entrada da porta 3002 resolve em `src/frontend/apps/ui-catalog-consumer` e a da porta 3001 em `src/frontend/apps/ui-catalog-merchant`, ambas com No snapshot `Yes` (ver relações 1 e 2). Isso coincide com o mapeamento por porta da classificação, que registrou a inconsistência de nomes como ambígua.

Os dois remotos têm um plugin que, em `vite build --watch`, chama `http://localhost:3000/__fullReload` ao fim do build (src/frontend/apps/ui-catalog-merchant/vite.config.ts:24-45; src/frontend/apps/ui-catalog-consumer/vite.config.ts:24-45), atendido por um middleware do servidor de desenvolvimento do shell (src/frontend/apps/ui-catalog/vite.config.ts:90-102). É ferramenta de desenvolvimento, não troca de mensagens entre as aplicações em runtime, e não virou relação. Não há comunicação entre as unidades no código.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | src/frontend/apps/ui-catalog | src/frontend/apps/ui-catalog-consumer | host → remote | origem → destino | module-federation | Yes | Yes | src/frontend/apps/ui-catalog/remotes.json:9-15 (scope `consumerApp`, `http://localhost:3002/assets/remoteEntry.js`, módulo `./App`, rota `consumer`); src/frontend/apps/ui-catalog/vite.config.ts:14-17 (mapa `remotes` montado de `remotes.json`); src/frontend/apps/ui-catalog/vite.config.ts:85-89 (`federation({ name: 'app', remotes: federationRemotes })`); src/frontend/apps/ui-catalog-consumer/vite.config.ts:9 (porta 3002); src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23 (`name: "consumerApp"`, `filename: "remoteEntry.js"`, `exposes: { "./App" }`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23 (mesmo `name: "consumerApp"`, `filename` e `exposes`) | src/frontend/apps/ui-catalog/vite.config.ts:37; src/frontend/apps/ui-catalog/remotes.json:3; src/frontend/apps/ui-catalog/src/App.tsx:26 |
| 2 | src/frontend/apps/ui-catalog | src/frontend/apps/ui-catalog-merchant | host → remote | origem → destino | module-federation | Yes | Yes | src/frontend/apps/ui-catalog/remotes.json:2-8 (scope `merchantApp`, `http://localhost:3001/assets/remoteEntry.js`, módulo `./App`, rota `merchant`); src/frontend/apps/ui-catalog/vite.config.ts:14-17 (mapa `remotes` montado de `remotes.json`); src/frontend/apps/ui-catalog/vite.config.ts:85-89 (`federation({ name: 'app', remotes: federationRemotes })`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:9 (porta 3001); src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23 (`name: "consumerApp"`, `filename: "remoteEntry.js"` na :18, `exposes: { "./App" }`) | src/frontend/apps/ui-catalog/vite.config.ts:37; src/frontend/apps/ui-catalog/remotes.json:3; src/frontend/apps/ui-catalog/src/App.tsx:26 |

## Observações

**1. src/frontend/apps/ui-catalog → src/frontend/apps/ui-catalog-consumer.** A segunda entrada de `remotes.json` declara o scope `consumerApp` com `http://localhost:3002/assets/remoteEntry.js` e módulo `./App` (src/frontend/apps/ui-catalog/remotes.json:9-15). O shell transforma isso no remote `consumerApp` (src/frontend/apps/ui-catalog/vite.config.ts:14-17, 85-89) e no `import("consumerApp/App")` gerado pelo template (src/frontend/apps/ui-catalog/vite.config.ts:37), renderizado na rota `consumer/*` (src/frontend/apps/ui-catalog/src/App.tsx:17, 26). O `name: "consumerApp"` aparece nas duas unidades remotas, e o `filename` e o `exposes` também são iguais nas duas (src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23; src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23), então o nome sozinho não aponta uma unidade. Por decisão do pesquisador para este caso, o `name` comum junto com a porta conta como correspondência explícita: `ui-catalog-consumer` declara `name: "consumerApp"` (src/frontend/apps/ui-catalog-consumer/vite.config.ts:17) e serve na porta 3002 (src/frontend/apps/ui-catalog-consumer/vite.config.ts:9), a mesma da URL. O destino é `src/frontend/apps/ui-catalog-consumer`, e No snapshot é `Yes`. Ativa `Yes`: as três linhas da revisão de código-fonte são `Yes`, e cada uma cobre as duas entradas de `remotes.json` (a linha src/frontend/apps/ui-catalog/remotes.json:3 é a citação do registro inteiro, :2-15, na revisão de código-fonte). A importação dinâmica só existe no arquivo gerado no build, fora do snapshot; o que está no snapshot é o gerador e sua entrada.

**2. src/frontend/apps/ui-catalog → src/frontend/apps/ui-catalog-merchant.** A primeira entrada de `remotes.json` declara o scope `merchantApp` com `http://localhost:3001/assets/remoteEntry.js`, módulo `./App` e rota `merchant` (src/frontend/apps/ui-catalog/remotes.json:2-8). Ela segue o mesmo caminho da relação 1 até o `import("merchantApp/App")` gerado (src/frontend/apps/ui-catalog/vite.config.ts:37) e a rota `merchant/*` (src/frontend/apps/ui-catalog/src/App.tsx:17, 26). Nenhuma unidade se declara `merchantApp`: `ui-catalog-merchant` se chama `consumerApp` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17). O nome de arquivo `remoteEntry.js` da URL é declarado pelas duas unidades (src/frontend/apps/ui-catalog-merchant/vite.config.ts:18; src/frontend/apps/ui-catalog-consumer/vite.config.ts:18). Por decisão do pesquisador para este caso, esse nome de arquivo comum junto com a porta conta como correspondência explícita: `ui-catalog-merchant` serve na porta 3001 (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9), a mesma da URL. O destino é `src/frontend/apps/ui-catalog-merchant`, e No snapshot é `Yes`. A rota e o rótulo `merchant`/`Merchant` (src/frontend/apps/ui-catalog/remotes.json:6-7) lembram o nome do diretório, mas não entraram na resolução. O plugin de federação busca o remote pela URL, então o `name` divergente pode não impedir a carga; isso não foi verificado por execução. Ativa `Yes` pelas mesmas três linhas `Yes` da relação 1.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
