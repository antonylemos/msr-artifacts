---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 272 — scality/metalk8s

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| shell-ui | shell-ui/package.json;shell-ui/rspack.config.ts | shell-ui/package.json | shell-ui/rspack.config.ts:46 (`entry: './src/index.tsx'`); shell-ui/src/index.tsx:1-9 (`createRoot(rootElement).render(<App />)`); shell-ui/rspack.config.ts:209-213 (`HtmlRspackPlugin` com `template: './index-template.html'`) | shell-ui/rspack.config.ts:42-46 (configuração rspack própria); shell-ui/package.json:9 (`rspack build -c rspack.config.ts`) | — | shell-ui/Dockerfile:4-27 (build Node com `npm run rsbuild` e imagem nginx com `./shell`); .github/workflows/build-shell-ui.yaml:31-33 (`docker build` com `working-directory: shell-ui`); buildchain/buildchain/image.py:417-421 (imagem `shell-ui`); salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15-24 (`ScalityUI` `shell-ui-cp`) | Yes | Shell React com entrada que monta a UI e build rspack próprio, com imagem e CI próprios. |
| tools/crd-client-generator-js | tools/crd-client-generator-js/package.json | tools/crd-client-generator-js/package.json | — | — | — | — | No | Ferramenta Node de geração de clientes de CRD (`ts-node src/index.ts`, tools/crd-client-generator-js/package.json:8), não é frontend. |
| ui | ui/package.json;ui/rspack.config.ts | ui/package.json | ui/rspack.config.ts:32-34 (`entry: { metalk8s_ui: './src/index.ts' }`; `ui/src/index.ts` tem 0 bytes); ui/rspack.config.ts:121-122 (`exposes` `./FederableApp`); ui/src/FederableApp.tsx:120-122 (componente exportado, sem render próprio) | ui/rspack.config.ts:28-207 (configuração rspack própria); ui/package.json:39 (`rspack build -c rspack.config.ts`) | — | ui/Dockerfile:3-19 e ui/entrypoint.sh:5-8 (imagem builder que roda `npm run build`; buildchain/buildchain/builder.py:94-96 e buildchain/buildchain/ui.py:115-121); buildchain/buildchain/image.py:422-437 (imagem `metalk8s-ui`); images/metalk8s-ui/Dockerfile:9 (`COPY ui /usr/share/nginx/html/`); salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15-25 (`ScalityUIComponent` `metalk8s-ui`) | Undetermined | Build e deploy próprios, mas a entrada do build é um arquivo vazio e nada no diretório inicia a UI sozinho; a UI só sai pelo módulo exposto. |

## Resumo

Aplicações frontend no snapshot: 1 (shell-ui).

## Notas

- A classificação registra `frontend_units: 2` (`shell-ui` e `ui`). A diferença vem de `ui`: é o remote `metalk8s` (ui/rspack.config.ts:118-127), cuja UI o shell monta pelo `./FederableApp`, mas não há HTML, `HtmlRspackPlugin` nem `createRoot`/`render` em `ui/` (grep), e a entry `./src/index.ts` está vazia. O `Undetermined` segue o caso de módulo de entrada vazio sem início standalone (039, `apps/microfrontend`) e diz respeito a construir/servir `ui` sozinho, não ao papel de remote, que é assunto da revisão de composição (seção 3.4.5 do protocolo).
- `images/metalk8s-ui/Dockerfile:9-11` copia na mesma imagem o build de `ui`, a documentação e o build de `shell-ui`; o `shell-ui` tem também imagem própria (buildchain/buildchain/image.py:417-421).
- `SHELL_UI_BUILDER` (buildchain/buildchain/builder.py:105-107) reusa `ui/Dockerfile` como imagem builder.
- Nenhum `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `turbo.json`, `rush.json` nem `workspaces` em `package.json` fora de `ui/@mf-types`; as ocorrências `ws-path-alias` são `paths` dos `tsconfig.json`. Cada pacote tem `package-lock.json` próprio.
- `ui/@mf-types/` (tipos gerados do shell, com `package.json` sob `node_modules/`) não aparece no `units.csv`, corretamente.
