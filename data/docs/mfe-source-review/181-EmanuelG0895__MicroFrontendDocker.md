---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts:3 | MF-Shell | none | No | `typeof import('MF_CharacterDetail/Vista')` é tipo condicional num arquivo de declaração gerado do DTS do Module Federation (MF-Shell/@mf-types/index.d.ts:1-10); não carrega nada em runtime, e o `tsconfig` só inclui `src` (MF-Shell/tsconfig.json:19). O carregamento real de MF_CharacterDetail é o da linha MF-Shell/src/App.tsx:7. |
| src-remote-import | MF-Shell/@mf-types/MF_CharacterDetail/compiled-types/components/view.d.ts:5 | MF-Shell | none | No | `import("react/jsx-runtime").JSX.Element` é só o tipo de retorno na declaração gerada do componente `View`; falso positivo do padrão. |
| src-remote-import | MF-Shell/@mf-types/MF_Characters/compiled-types/components/vista.d.ts:5 | MF-Shell | none | No | `import("react/jsx-runtime").JSX.Element` é só o tipo de retorno na declaração gerada do componente `Vista`; falso positivo do padrão. |
| src-remote-import | MF-Shell/src/App.tsx:7 | MF-Shell | dynamic-loading | Yes | `React.lazy(() => import("MF_CharacterDetail/View"))` (MF-Shell/src/App.tsx:6-8) carrega o módulo exposto `./View` de MF-CharacterDetail (MF-CharacterDetail/module-federation.config.ts:7), remote declarado em MF-Shell/module-federation.config.ts:4 e passado ao `ModuleFederationPlugin` em MF-Shell/rspack.config.ts:98; App.tsx é carregado por `import("./App")` na entrada MF-Shell/src/index.ts:1 (MF-Shell/rspack.config.ts:17). |
| src-remote-import | MF-Shell/src/app/details.tsx:3 | MF-Shell | dynamic-loading | Yes | `React.lazy(() => import("MF_Characters/Vista"))` carrega o módulo exposto `./Vista` de MF-Characters (MF-Characters/module-federation.config.ts:5), remote declarado em MF-Shell/module-federation.config.ts:5; details.tsx é carregado pelo `React.lazy` de MF-Shell/src/App.tsx:10-12 e renderizado na rota `/details/:id` (MF-Shell/src/App.tsx:33-40). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | MF-Shell/src/App.tsx:24 | MF-Shell | host-relationship | Yes | `Routes` declara `/` para o componente remoto `CharacterInfo` (MF_CharacterDetail) e `/details/:id` para `Details`, que embrulha o remoto `Vista` de MF_Characters (MF-Shell/src/App.tsx:24-41); `App` é montado por `root.render(<App />)` em MF-Shell/src/App.tsx:55-56. |
| manual | MF-Shell/src/App.tsx:29 | MF-Shell | runtime-composition | Yes | Renderiza no host o componente remoto `CharacterInfo` (`./View` de MF-CharacterDetail, MF-Shell/src/App.tsx:6-8) dentro de `Suspense`; o host passa o callback `onCharacterClick`, que navega para `/details/${id}` (MF-Shell/src/App.tsx:18-21). |
| manual | MF-Shell/src/app/details.tsx:13 | MF-Shell | runtime-composition | Yes | Renderiza o componente remoto `Vista` de MF-Characters (MF-Shell/src/app/details.tsx:3) com o `characterId` lido da rota (MF-Shell/src/app/details.tsx:10-11); o `Suspense` em volta está em MF-Shell/src/App.tsx:36-38. |

## Resumo

Construções com composição: 5 (dynamic-loading: 2, host-relationship: 1, runtime-composition: 2).

## Notas

- As três linhas de `MF-Shell/@mf-types/` são declarações de tipo geradas pelo DTS do Module Federation; não carregam nada. `MF-Shell/@mf-types/index.d.ts:2` importa `./MF_Characters/apis.d.ts`, que não está no snapshot.
- `MF-Shell/src/types/federation.d.ts` e `MF-Shell/src/types.d.ts` só declaram módulos `MF_*` para o TypeScript; não viraram linha.
- `import("./App")` em MF-Shell/src/index.ts:1, MF-Characters/src/index.ts:1 e MF-CharacterDetail/src/index.ts:1 é o bootstrap assíncrono interno de cada unidade e não está no `matches.csv` como `src-*`; não virou linha (interno, seria `No`).
- Os remotes não importam nada de outra unidade: a busca do passo 4 não achou `import()`, `CustomEvent`, `postMessage` nem outro mecanismo em MF-Characters/src nem em MF-CharacterDetail/src. A comunicação entre o host e os remotes é só por props e callback (`onCharacterClick`, `characterId`).
- As URLs dos remotes no host apontam para as portas de dev (`localhost:3003` para MF_CharacterDetail e `localhost:3002` para MF_Characters, MF-Shell/module-federation.config.ts:4-5), que batem com MF-CharacterDetail/rspack.config.ts:25 e MF-Characters/rspack.config.ts:25. Os Dockerfiles expõem outras portas (MF-CharacterDetail/Dockerfile:37 `EXPOSE 3002`, MF-Characters/Dockerfile:37 `EXPOSE 3001`); isso não muda as respostas desta etapa.
