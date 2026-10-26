---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
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

# 181 — EmanuelG0895/MicroFrontendDocker

## Leitura do repositório

Teste técnico (“Prueba Técnica - Microfrontends con Module Federation”, README.md:1-3) com três aplicações React + TypeScript construídas com Rspack e `@module-federation/enhanced`. `MF-Shell` é o host: declara dois remotes, `MF_CharacterDetail` e `MF_Characters`, ambos em `localhost` (MF-Shell/module-federation.config.ts:3-6), e os carrega por `React.lazy` com `import()` federado. Cada tela remota ocupa uma rota do `BrowserRouter` do host: `/` mostra a lista de personagens vinda de `MF_CharacterDetail` e `/details/:id` mostra o detalhe vindo de `MF_Characters` (MF-Shell/src/App.tsx:24-41). Os dois remotes não consomem nada um do outro nem do host; `MF-CharacterDetail` declara `remotes: {}` (MF-CharacterDetail/module-federation.config.ts:4).

Os nomes não correspondem ao conteúdo: `MF_CharacterDetail` expõe a lista com busca e paginação (MF-CharacterDetail/src/components/view.tsx:11-80), e `MF_Characters` expõe a tela de detalhe de um personagem (MF-Characters/src/components/vista.tsx:11-15); o README descreve o contrário, com `MF-Characters` como “Lista de personajes” (README.md:9-11). A ligação entre as duas telas passa pelo host: o remote da lista chama o callback `onCharacterClick` recebido por prop (MF-CharacterDetail/src/components/view.tsx:22-27), o host navega para `/details/${id}` (MF-Shell/src/App.tsx:18-21) e entrega o `characterId` ao remote de detalhe (MF-Shell/src/app/details.tsx:9-13). Isso é troca de props e callback entre host e remote, não virou relação `communication`.

O host também compartilha `shared-hooks` como singleton (MF-Shell/module-federation.config.ts:10), sem pacote nem uso correspondente nos remotes, que só compartilham `react` e `react-dom` (MF-CharacterDetail/module-federation.config.ts:9; MF-Characters/module-federation.config.ts:7). A composição está montada para o modo de desenvolvimento, em que as portas dos remotes (3003 e 3002) e os `publicPath` absolutos batem com as URLs do host. O perfil Docker/Nginx serve as unidades em 3000/3001/3002 (MF-*/package.json:9; nginx.conf:6-16), com rotas por prefixo `/characters` e `/character-detail` (nginx.conf:38-53) que não correspondem às URLs de `remotes`; o próprio README aponta portas desencontradas como causa de erro (README.md:155-157). Isso fica para a etapa de build e deploy e não muda as relações.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | MF-Shell | MF-CharacterDetail | host → remote | origem → destino | module-federation | Yes | Yes | MF-Shell/module-federation.config.ts:4 (remote `MF_CharacterDetail@http://localhost:3003/remoteEntry.js`); MF-Shell/rspack.config.ts:98 (`new ModuleFederationPlugin(mfConfig)`); MF-CharacterDetail/module-federation.config.ts:2-8 (`name: "MF_CharacterDetail"`, `filename: "remoteEntry.js"`, expõe `./CharacterInfo` e `./View`); MF-CharacterDetail/rspack.config.ts:25 (porta 3003); MF-CharacterDetail/rspack.config.ts:38 (`publicPath: "http://localhost:3003/"`); MF-CharacterDetail/rspack.config.ts:86 (`new ModuleFederationPlugin(mfConfig)`) | MF-Shell/src/App.tsx:7; MF-Shell/src/App.tsx:24; MF-Shell/src/App.tsx:29 |
| 2 | MF-Shell | MF-Characters | host → remote | origem → destino | module-federation | Yes | Yes | MF-Shell/module-federation.config.ts:5 (remote `MF_Characters@http://localhost:3002/remoteEntry.js`); MF-Shell/rspack.config.ts:98 (`new ModuleFederationPlugin(mfConfig)`); MF-Characters/module-federation.config.ts:2-6 (`name: "MF_Characters"`, `filename: "remoteEntry.js"`, expõe `./Vista`); MF-Characters/rspack.config.ts:25 (porta 3002); MF-Characters/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`); MF-Characters/rspack.config.ts:81 (`new ModuleFederationPlugin(mfConfig)`) | MF-Shell/src/app/details.tsx:3; MF-Shell/src/App.tsx:24; MF-Shell/src/app/details.tsx:13 |

## Observações

**1. MF-Shell → MF-CharacterDetail.** O host carrega `MF_CharacterDetail/View` por `React.lazy` (MF-Shell/src/App.tsx:6-8) e renderiza o componente, como `CharacterInfo`, na rota `/` dentro de `Suspense`, passando `onCharacterClick` (MF-Shell/src/App.tsx:25-31). O destino foi resolvido pelo `name: "MF_CharacterDetail"` e pela exposição `./View` → `./src/components/view.tsx` (MF-CharacterDetail/module-federation.config.ts:2,7), que exporta `View` por padrão e por nome (MF-CharacterDetail/src/components/view.tsx:11,83); a porta 3003 e o `publicPath` só corroboram. A exposição `./CharacterInfo` aponta para o mesmo arquivo (MF-CharacterDetail/module-federation.config.ts:6) e não é importada pelo host; o nome local `CharacterInfo` no shell é só o alias do módulo `./View`. A linha MF-Shell/src/App.tsx:24 (o `Routes` do host) sustenta as duas relações.

**2. MF-Shell → MF-Characters.** O componente `Details` do host, carregado por `React.lazy` na rota `/details/:id` (MF-Shell/src/App.tsx:10-12,33-40), importa `MF_Characters/Vista` (MF-Shell/src/app/details.tsx:3) e o renderiza com o id lido da rota (MF-Shell/src/app/details.tsx:10-13). O destino foi resolvido pelo `name: "MF_Characters"` e pela exposição `./Vista` → `./src/components/vista.tsx` (MF-Characters/module-federation.config.ts:2,5), cujo export padrão recebe `characterId` (MF-Characters/src/components/vista.tsx:11-15); a porta 3002 e o `publicPath` só corroboram. `details.tsx` é um arquivo do host, não do remote: a relação vai direto do shell para MF-Characters.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
