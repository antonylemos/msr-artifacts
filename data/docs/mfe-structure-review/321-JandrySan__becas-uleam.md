---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Workspace

`pnpm-workspace.yaml:1-4` (`packages`: `1verificador-vue`, `2postulacion-react`, `3seguimiento-angular`); a mesma lista em `package.json:7-11` (`workspaces`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json | package.json:1-27 (manifesto da contenedora) | index.html:65 (`<script type="module" src="/src/main.ts">`); src/main.ts:87-97 (troca `frame.src` do `<iframe>` de index.html:61) | package.json:15 (`vite`) e package.json:17 (`vite build && ...`), sem `vite.config.*` (configuração padrão do Vite, entrada `index.html`) | — (raiz do workspace) | vercel.json:3-5 (`pnpm run build`, `outputDirectory: dist`; deploy único do build integrado) | Yes | Contenedora TypeScript com entrada `index.html` e build Vite próprios. |
| 1verificador-vue | 1verificador-vue/index.html;1verificador-vue/package.json;1verificador-vue/vite.config.ts | 1verificador-vue/package.json:1-25 | 1verificador-vue/index.html:11 (`/src/main.ts`); 1verificador-vue/src/main.ts:20-23 (monta Vue com Pinia e router) | 1verificador-vue/vite.config.ts:4-7 (`base: '/vue/'`, plugin Vue); 1verificador-vue/package.json:8 (`vite build`) | pnpm-workspace.yaml:2 (`1verificador-vue`) | — (só entra no deploy único: scripts/build-integrado.mjs:14 copia `dist` para `dist/vue`) | Yes | Aplicação Vue com entrada e build Vite próprios. |
| 1verificador-vue/verificador | 1verificador-vue/verificador/package.json;1verificador-vue/verificador/vite.config.ts | 1verificador-vue/verificador/package.json:1-22 | 1verificador-vue/verificador/index.html:62 (`/src/main.ts`); 1verificador-vue/verificador/src/main.ts:5 (`createApp(App).mount('#app')`) | 1verificador-vue/verificador/vite.config.ts:5-7 (plugin Vue); 1verificador-vue/verificador/package.json:8 (`vue-tsc -b && vite build`) | — | — | Yes | Scaffold Vue aninhado com entrada e build Vite próprios, fora do workspace e do build integrado. |
| 2postulacion-react | 2postulacion-react/index.html;2postulacion-react/package.json;2postulacion-react/vite.config.ts | 2postulacion-react/package.json:1-25 | 2postulacion-react/index.html:1 (`/src/main.tsx`); 2postulacion-react/src/main.tsx:9-17 (monta React com `HashRouter`) | 2postulacion-react/vite.config.ts:4-7 (`base: '/react/'`, plugin React); 2postulacion-react/package.json:8 (`tsc -b && vite build`) | pnpm-workspace.yaml:3 (`2postulacion-react`) | — (só entra no deploy único: scripts/build-integrado.mjs:15 copia `dist` para `dist/react`) | Yes | Aplicação React com entrada e build Vite próprios. |
| 3seguimiento-angular | 3seguimiento-angular/angular.json;3seguimiento-angular/package.json | 3seguimiento-angular/package.json:1-30 | 3seguimiento-angular/angular.json:17-18 (`index: src/index.html`, `browser: src/main.ts`); 3seguimiento-angular/src/main.ts:14-15 (`bootstrapApplication`) | 3seguimiento-angular/angular.json:13-14 (target `build` com `@angular-devkit/build-angular:application`); 3seguimiento-angular/package.json:7 (`ng build --base-href /angular/`) | pnpm-workspace.yaml:4 (`3seguimiento-angular`) | — (só entra no deploy único: scripts/build-integrado.mjs:16-19 copia o build para `dist/angular`) | Yes | Aplicação Angular com entrada e alvo de build próprios. |

## Resumo

Aplicações frontend no snapshot: 5 (., 1verificador-vue, 1verificador-vue/verificador, 2postulacion-react, 3seguimiento-angular).

## Notas

- A classificação registra `frontend_units: 4` (contenedora e três módulos) e exclui o scaffold `1verificador-vue/verificador/`. Aqui ele conta como fronteira observável: tem entrada e build próprios, mas não está em `pnpm-workspace.yaml:1-4` nem no `build` da raiz (`package.json:17`), e a contenedora não o carrega.
- A raiz não tem `vite.config.*`; o build usa a configuração padrão do Vite, que toma o `index.html` do diretório como entrada.
- O único deploy é o da raiz (`vercel.json:3-5`), que publica o `dist` integrado montado por `scripts/build-integrado.mjs:14-19`. Os módulos não têm deploy separado. As ocorrências `ops-hosting` em `README.md:61-80` são documentação desse mesmo deploy.
