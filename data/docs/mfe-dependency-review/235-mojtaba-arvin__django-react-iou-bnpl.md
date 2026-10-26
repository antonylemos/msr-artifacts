---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| frontend/package.json:40 | devDependencies | @module-federation/typescript | ^3.1.3 | module-federation | Undetermined | frontend/shell/tsconfig.build.json:17-24 (`compilerOptions.plugins` com `"name": "@module-federation/typescript"` e `configPath: ./webpack.config.js`), arquivo usado pelo build em frontend/shell/webpack.config.js:44-47 (`ts-loader` com `configFile: "tsconfig.build.json"`); frontend/shell/tsconfig.json:25-32 (mesma entrada); nenhum arquivo de build ou código importa ou invoca o pacote: os três `webpack.config.js` obtêm o `ModuleFederationPlugin` de `webpack` (frontend/shell/webpack.config.js:3, frontend/customer-app/webpack.config.js:3, frontend/merchant-app/webpack.config.js:3) (grep por `@module-federation` e `FederatedTypes` em `frontend/`, excluindo lockfile) |

## Notas

- `same_package_matches` está vazio. Os itens de `other_package_matches` são as linhas de `ModuleFederationPlugin`, `remotes`, `exposes` e `shared` dos três `webpack.config.js` (`:3`, `59-94` no shell; `:3`, `81-116` nos remotos), todas com o plugin nativo do webpack 5, não com este pacote.
- A única referência ao pacote fora do manifesto está em `compilerOptions.plugins` dos `tsconfig` do shell. `frontend/shell/tsconfig.build.json` é usado pelo `ts-loader`, mas a entrada declara o pacote como plugin do compilador TypeScript, e não há invocação dele no build webpack. Como não dá para confirmar que essa entrada tem efeito no build, a linha fica `Undetermined`, e não `Yes`. `frontend/customer-app` e `frontend/merchant-app` não têm essa entrada nos seus `tsconfig`.
- `frontend/package.json:70` (`dependenciesDocumentation`) diz que o pacote fornece o `ModuleFederationPlugin`, o que contradiz os `webpack.config.js`, que importam o plugin de `webpack`. É documentação, não uso.
- A configuração Module Federation do webpack 5 em si (sem pacote próprio) está registrada na classificação.
