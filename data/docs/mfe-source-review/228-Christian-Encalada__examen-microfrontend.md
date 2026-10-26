---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 228 — Christian-Encalada/examen-microfrontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | @mf-types/AlertDashboard/apis.d.ts:3 | . | none | No | `typeof import('AlertDashboard/AlertDashboard')` é tipo condicional num arquivo de declaração gerado do DTS do Module Federation (@mf-types/index.d.ts:1-26), usado só pelo TypeScript via `paths` (tsconfig.json:15-17); não carrega nada em runtime. O carregamento real é o import estático em src/App.tsx:4 (linha manual de src/App.tsx:66). |
| src-remote-import | @mf-types/AlertDashboard/compiled-types/components/AlertDashboard.d.ts:1 | . | none | No | `import("react/jsx-runtime").JSX.Element` é só o tipo de retorno na declaração gerada do componente `AlertDashboard`; falso positivo do padrão. |
| src-remote-import | @mf-types/AlertSender/apis.d.ts:3 | . | none | No | `typeof import('AlertSender/AlertSender')` é tipo condicional num arquivo de declaração gerado do DTS do Module Federation (@mf-types/index.d.ts:1-26), usado só pelo TypeScript via `paths` (tsconfig.json:15-17); não carrega nada em runtime. O carregamento real é o import estático em src/App.tsx:3 (linha manual de src/App.tsx:63). |
| src-remote-import | @mf-types/AlertSender/compiled-types/components/AlertSender.d.ts:1 | . | none | No | `import("react/jsx-runtime").JSX.Element` é só o tipo de retorno na declaração gerada do componente `AlertSender`; falso positivo do padrão. |
| src-mount-export | src/types/federation.d.ts:2 | . | none | No | Assinatura `export function mount(el: HTMLElement)` dentro de `declare module "Footer/Footer"` (src/types/federation.d.ts:1-5): só declaração de tipo, sem implementação. Não há remote `Footer` na configuração do host (module-federation.config.ts:5-8) nem import de `Footer/Footer` no código. |
| src-mount-call | src/types/federation.d.ts:2 | . | none | No | Mesma linha da anterior: é a assinatura de tipo `mount(el: HTMLElement)` em `declare module "Footer/Footer"`, não uma chamada; nenhum código chama `mount`. |
| src-cross-unit-communication | alert-dashboard/src/components/AlertDashboard.tsx:103 | alert-dashboard | communication | Yes | `window.addEventListener('academic-alert', handleAlert)` no `useEffect` do componente (alert-dashboard/src/components/AlertDashboard.tsx:97-108) recebe o `CustomEvent` disparado pela unidade alert-sender (alert-sender/src/components/AlertSender.tsx:72-80) e mostra o `detail` (alert-dashboard/src/components/AlertDashboard.tsx:98-101). Ativo: o componente é exposto (alert-dashboard/module-federation.config.ts:4-6) e renderizado pelo host em src/App.tsx:66, na mesma página que AlertSender (src/App.tsx:63). |
| src-cross-unit-communication | alert-sender/src/components/AlertSender.tsx:72 | alert-sender | communication | Yes | `new CustomEvent('academic-alert', { detail: { type, message, timestamp } })` criado em `sendAlert` (alert-sender/src/components/AlertSender.tsx:71-81), chamado pelos botões (alert-sender/src/components/AlertSender.tsx:87-95); o alvo é a unidade alert-dashboard, que escuta o evento em alert-dashboard/src/components/AlertDashboard.tsx:103. Ativo: o componente é exposto (alert-sender/module-federation.config.ts:4-6) e renderizado pelo host em src/App.tsx:63. |
| src-cross-unit-communication | alert-sender/src/components/AlertSender.tsx:80 | alert-sender | communication | Yes | `window.dispatchEvent(event)` dispara o `CustomEvent` `academic-alert` criado na linha 72 (alert-sender/src/components/AlertSender.tsx:72-80) para a unidade alert-dashboard (alert-dashboard/src/components/AlertDashboard.tsx:103). Mesmo mecanismo da linha anterior. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/App.tsx:63 | . | runtime-composition | Yes | Renderiza `<AlertSender />`, componente da unidade alert-sender, na primeira seção do host (src/App.tsx:62-64); o componente vem do import estático `AlertSender/AlertSender` em src/App.tsx:3, resolvido pelo remote `AlertSender@http://localhost:3001/remoteEntry.js` (module-federation.config.ts:6) e exposto em alert-sender/module-federation.config.ts:4-6. App é carregado por src/index.ts:1 e renderizado em src/App.tsx:72-74. |
| manual | src/App.tsx:66 | . | runtime-composition | Yes | Renderiza `<AlertDashboard />`, componente da unidade alert-dashboard, na segunda seção do host (src/App.tsx:65-67); o componente vem do import estático `AlertDashboard/AlertDashboard` em src/App.tsx:4, resolvido pelo remote `AlertDashboard@http://localhost:3002/remoteEntry.js` (module-federation.config.ts:7) e exposto em alert-dashboard/module-federation.config.ts:4-6. App é carregado por src/index.ts:1 e renderizado em src/App.tsx:72-74. |

## Resumo

Construções com composição: 5 (communication: 3, runtime-composition: 2).

## Notas

- As quatro linhas de `@mf-types/` são declarações de tipo geradas pelo DTS do Module Federation; não carregam nada. As `loadRemote` de @mf-types/index.d.ts:8-25 também são só declarações e não viraram linha.
- `src/types/federation.d.ts` declara um módulo `Footer/Footer` que não corresponde a nenhum remote do snapshot; parece resto de outro projeto e não participa da composição.
- Os `import("./App")` de src/index.ts:1, alert-sender/src/index.ts:1 e alert-dashboard/src/index.ts:1 são internos à própria unidade e não viraram linha.
- A comunicação entre alert-sender e alert-dashboard só funciona quando os dois estão na mesma página, o que acontece no host (src/App.tsx:62-67); cada remoto rodando sozinho (alert-sender/src/App.tsx:4-10, alert-dashboard/src/App.tsx:4-10) não tem o outro lado do evento.
- A busca do passo 4 não achou custom elements, iframes, `postMessage`, `BroadcastChannel`, `localStorage`, `loadRemote` chamado nem injeção de script.
