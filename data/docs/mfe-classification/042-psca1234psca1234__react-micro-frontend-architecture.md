---
schema: 1
id: 1299611320
full_name: psca1234psca1234/react-micro-frontend-architecture
url: https://github.com/psca1234psca1234/react-micro-frontend-architecture
commit: 23c5cf3b9db892edba342cea53ae0eb18786828d
classification: Non-MFE
checklist: { q1: yes, q2: no, q3: yes, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, lit]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 042 — psca1234psca1234/react-micro-frontend-architecture

## Contexto

- **Tipo de repositório:** example/proof of concept (monorepo de estudo "for mastering React, TypeScript, Web Components…", `README.md:3`, com "SENIOR INTERVIEW TIP" nos comentários)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Monorepo pnpm + Turborepo: `apps/canvas-app` e `apps/editor-app` (cada um com `package.json`, `vite.config.ts`, `src/main.tsx`), `packages/ui-library` (Web Components Lit + bridge React) e `packages/typescript-config` (`README.md:7-17`) (duas apps) | moderada |
| Configuração | `apps/canvas-app/vite.config.ts:27-56` e `apps/editor-app/vite.config.ts:16-32`: só `@vitejs/plugin-react`, portas 5173/5174; sem federação, `build.lib` ou import map | ausente |
| Estrutura (dependência entre apps) | `apps/editor-app/package.json:43-49`: `"@abhishek/canvas-app": "workspace:*"` como dependência | contrária |
| Código-fonte (integração) | `apps/editor-app/src/components/Editor/CanvasBlockNode.tsx:45-48`: `lazy(() => import('@abhishek/canvas-app/src/components/Canvas/Canvas.tsx'))`, ou seja, **import direto do código-fonte** da outra app, resolvido e empacotado no build do editor | contrária |
| Código-fonte (Web Components) | `packages/ui-library/src/components/ui-card/UiCard.ts` (componente Lit) + `react-bridge/UiCardReact.tsx`: biblioteca de componentes compartilhada | contrária |
| Documentação | Nome do repositório; `docs/Micro-App Integration.md`, `docs/Web Component & Shadow DOM Bridge Prompt.md`, `docs/Monorepo Orchestration Prompt.md` (prompts de geração) | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `canvas-app` e `editor-app` |
| Q2 | **No** | O `editor-app` importa diretamente o código-fonte do `canvas-app` (`CanvasBlockNode.tsx:48`) via dependência de workspace (`package.json:49`); o canvas é compilado dentro do bundle do editor |
| Q3 | Yes | O `editor-app` embute o canvas num bloco do editor Lexical |
| Q4 | No | A "composição" é `React.lazy` + import de código-fonte, ou seja, code splitting dentro de um build, não um mecanismo conectando unidades independentes |
| Q5 | No | Q2 e Q4 convergem |

## Motivo

- As duas apps existem, mas a integração é por import direto de código-fonte num único build. O critério operacional de Q2 diz explicitamente que as unidades "do not import each other's source code directly".
- Os Web Components (`packages/ui-library`) formam uma biblioteca de componentes compartilhada, o que corresponde ao caso Non-MFE "component libraries using Web Components".
- O nome do repositório promete uma arquitetura de micro-frontend que a implementação não realiza.

## Notas para análise

- **RQ1 (sinais enganosos):** monorepo com várias apps + Web Components + "micro-frontend" no nome, mas integração em build-time por import de código-fonte. Também toca a decisão em aberto sobre build-time composition; aqui nem há pacote publicado, só import direto de `src/`.

## Decisão registrada

- **Decisão dos pesquisadores:** Non-MFE confirmado. Monorepos contam como MFE só quando as unidades são compostas em runtime; aqui há **dependência de deploy**: qualquer mudança no `canvas-app` exige rebuild e redeploy do `editor-app`, porque o canvas é compilado dentro do bundle do editor.
