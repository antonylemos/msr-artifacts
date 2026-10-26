---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 319 — Hariharan-s-99/microFrontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | home/src/index.ts:1 | home | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade (home/src/index.ts:1); interno a home. |
| src-async-bootstrap | settings/src/index.ts:1 | settings | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade (settings/src/index.ts:1); interno a settings. |
| src-mount-export | container/global.d.ts:3 | container | none | No | `export { mount }` dentro de `declare module "home/app"` (container/global.d.ts:1-4): declaração de tipo para o TypeScript, não carrega nem monta nada em runtime. |
| src-mount-export | container/global.d.ts:8 | container | none | No | `export { mount }` dentro de `declare module "settings/app"` (container/global.d.ts:6-9): declaração de tipo, sem efeito em runtime. |
| src-mount-export | home/src/bootstrap.tsx:12 | home | runtime-composition | Yes | Exporta `mount(element)`, que renderiza App no elemento recebido (home/src/bootstrap.tsx:6-10); exposto como `./app` em home/module-federation.config.ts:4-5 (plugin em home/rspack.config.ts:94) e chamado pelo container em container/src/Home.tsx:8. |
| src-mount-export | settings/src/bootstrap.tsx:12 | settings | runtime-composition | Yes | Exporta `mount(element)`, que renderiza App no elemento recebido (settings/src/bootstrap.tsx:6-10); exposto como `./app` em settings/module-federation.config.ts:4-5 (plugin em settings/rspack.config.ts:93) e chamado pelo container em container/src/Settings.tsx:7. |
| src-mount-call | container/src/Home.tsx:8 | container | runtime-composition | Yes | Monta o remote home no `div` do wrapper (container/src/Home.tsx:6-13); remote declarado em container/module-federation.config.ts:5; wrapper usado em container/src/App.tsx:18 e :62, a partir da entrada container/src/index.ts:1. |
| src-mount-call | container/src/Settings.tsx:7 | container | runtime-composition | Yes | Monta o remote settings no `div` do wrapper (container/src/Settings.tsx:5-12); remote declarado em container/module-federation.config.ts:4; wrapper usado em container/src/App.tsx:19 e :63. |
| src-mount-import | container/src/Home.tsx:1 | container | runtime-composition | Yes | Importa `mount` de `home/app`, chamado em container/src/Home.tsx:8; `home` resolvido para `http://localhost:8081/remoteEntry.js` em container/module-federation.config.ts:5. |
| src-mount-import | container/src/Settings.tsx:1 | container | runtime-composition | Yes | Importa `mount` de `settings/app`, chamado em container/src/Settings.tsx:7; `settings` resolvido para `http://localhost:8082/remoteEntry.js` em container/module-federation.config.ts:4. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | container/src/App.tsx:17 | container | host-relationship | Yes | `Switch` declara as rotas `/mf1` → Home e `/mf2` → Settings (container/src/App.tsx:17-20), os wrappers que montam os remotes home e settings (container/src/Home.tsx:8, container/src/Settings.tsx:7); App renderizado em container/src/App.tsx:24-27, carregado por container/src/index.ts:1. |

## Resumo

Construções com composição: 7 (runtime-composition: 6, host-relationship: 1).

## Notas

- `advancedWebpack` não tem nenhuma construção de composição: a busca do passo 4 não achou `import()`, `mount`, carregamento de script, custom element, iframe nem mecanismo de comunicação em advancedWebpack/.
- O `TabBar` (container/src/App.tsx:29-67) também renderiza `<Home />` e `<Settings />` conforme a aba (container/src/App.tsx:62-63), além das rotas; é o mesmo wrapper e a mesma montagem, por isso não virou linha separada.
- Nenhuma chamada de `unmount` e nenhum mecanismo de comunicação entre unidades; os wrappers passam `{}` como segundo argumento de `mount`, que os remotes ignoram (home/src/bootstrap.tsx:6, settings/src/bootstrap.tsx:6).
