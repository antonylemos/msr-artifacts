---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 083 — webdevqadeer/frontend-development

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | react/mv-marketplace/apps/shell/src/router.jsx:4 | react/mv-marketplace/apps/shell | dynamic-loading | Undetermined | `React.lazy` com `import("buyer_app/App")`; alvo é a unidade react/mv-marketplace/apps/buyer, declarada como remote em react/mv-marketplace/apps/shell/vite.config.js:12 e exposta como `./App` em react/mv-marketplace/apps/buyer/vite.config.js:11-12. Não se confirma que a construção está ativa: react/mv-marketplace/apps/shell/index.html:11 carrega `/src/main.jsx`, e react/mv-marketplace/apps/shell/src/main.jsx:3 importa `./App.jsx`, ausente do snapshot, que só tem react/mv-marketplace/apps/shell/src/app.jsx (este sim importa o roteador em react/mv-marketplace/apps/shell/src/app.jsx:2). |
| src-remote-import | react/mv-marketplace/apps/shell/src/router.jsx:5 | react/mv-marketplace/apps/shell | dynamic-loading | Undetermined | `React.lazy` com `import("seller_app/App")`; alvo é react/mv-marketplace/apps/seller, remote em react/mv-marketplace/apps/shell/vite.config.js:13 e exposição em react/mv-marketplace/apps/seller/vite.config.js:11. Mesma cadeia de entrada não confirmada de react/mv-marketplace/apps/shell/src/main.jsx:3. |
| src-remote-import | react/mv-marketplace/apps/shell/src/router.jsx:6 | react/mv-marketplace/apps/shell | dynamic-loading | Undetermined | `React.lazy` com `import("admin_app/App")`; alvo é react/mv-marketplace/apps/admin, remote em react/mv-marketplace/apps/shell/vite.config.js:14 e exposição em react/mv-marketplace/apps/admin/vite.config.js:11-13. Mesma cadeia de entrada não confirmada de react/mv-marketplace/apps/shell/src/main.jsx:3. |
| src-remote-import | react/mv-marketplace/apps/shell/src/router.jsx:7 | react/mv-marketplace/apps/shell | dynamic-loading | Undetermined | `React.lazy` com `import("payment_app/App")`; alvo é react/mv-marketplace/apps/payment, remote em react/mv-marketplace/apps/shell/vite.config.js:15 e exposição em react/mv-marketplace/apps/payment/vite.config.js:11, cujo `name` é `payment-app` (react/mv-marketplace/apps/payment/vite.config.js:9). Mesma cadeia de entrada não confirmada de react/mv-marketplace/apps/shell/src/main.jsx:3. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | react/mv-marketplace/apps/shell/src/router.jsx:13 | react/mv-marketplace/apps/shell | host-relationship | Undetermined | `Routes` declara as rotas `/`, `/seller`, `/admin` e `/payment` para as quatro aplicações remotas (react/mv-marketplace/apps/shell/src/router.jsx:13-18), dentro de `BrowserRouter` e `Suspense` (react/mv-marketplace/apps/shell/src/router.jsx:11-12). O roteador é usado por react/mv-marketplace/apps/shell/src/app.jsx:9, mas a entrada do shell não alcança esse arquivo como escrito (react/mv-marketplace/apps/shell/src/main.jsx:3). |
| manual | react/mv-marketplace/apps/shell/src/router.jsx:14 | react/mv-marketplace/apps/shell | runtime-composition | Undetermined | Renderiza `<Buyer />` na rota `/`, componente resolvido pelo import remoto de react/mv-marketplace/apps/shell/src/router.jsx:4; atividade não confirmada pela mesma cadeia de entrada (react/mv-marketplace/apps/shell/src/main.jsx:3). |
| manual | react/mv-marketplace/apps/shell/src/router.jsx:15 | react/mv-marketplace/apps/shell | runtime-composition | Undetermined | Renderiza `<Seller />` na rota `/seller`, componente resolvido pelo import remoto de react/mv-marketplace/apps/shell/src/router.jsx:5; atividade não confirmada pela mesma cadeia de entrada (react/mv-marketplace/apps/shell/src/main.jsx:3). |
| manual | react/mv-marketplace/apps/shell/src/router.jsx:16 | react/mv-marketplace/apps/shell | runtime-composition | Undetermined | Renderiza `<Admin />` na rota `/admin`, componente resolvido pelo import remoto de react/mv-marketplace/apps/shell/src/router.jsx:6; atividade não confirmada pela mesma cadeia de entrada (react/mv-marketplace/apps/shell/src/main.jsx:3). |
| manual | react/mv-marketplace/apps/shell/src/router.jsx:17 | react/mv-marketplace/apps/shell | runtime-composition | Undetermined | Renderiza `<Payment />` na rota `/payment`, componente resolvido pelo import remoto de react/mv-marketplace/apps/shell/src/router.jsx:7; atividade não confirmada pela mesma cadeia de entrada (react/mv-marketplace/apps/shell/src/main.jsx:3). |

## Resumo

Construções com composição: 0.

## Notas

- Todas as nove linhas ficaram `Undetermined` pelo mesmo motivo: o alvo de cada construção é claro, mas não se confirma que ela está ativa. A cadeia de entrada do shell é react/mv-marketplace/apps/shell/index.html:11 → react/mv-marketplace/apps/shell/src/main.jsx:3, que importa `./App.jsx`; o snapshot tem apenas react/mv-marketplace/apps/shell/src/app.jsx, e é esse arquivo que importa o roteador (react/mv-marketplace/apps/shell/src/app.jsx:2). Num sistema de arquivos sensível à caixa a cadeia não resolve. Aplicada a regra do passo 3 de preferir `Undetermined` à dúvida entre `Yes` e `Undetermined`. A alternativa seria ler a divergência de caixa como defeito de portabilidade e anotar as nove linhas como `Yes` (`dynamic-loading: 4, host-relationship: 1, runtime-composition: 4`), caminho que as etapas anteriores sugerem sem afirmar execução: `docs/mfe-classification/083-webdevqadeer__frontend-development.md` registra a cadeia como evidência "ambígua" e `docs/mfe-structure-review/083-webdevqadeer__frontend-development.md` julga o shell `Undetermined` pelo mesmo arquivo ausente. Não se executou build nem se presumiu o sistema de arquivos do autor; a classificação não foi alterada.
- `react/mv-marketplace/apps/shell` é `Undetermined` na revisão estrutural, e por isso é unidade válida nas duas tabelas (o `No` de `react/mv-marketplace` acima dele não é usado).
- O remote `package` em http://localhost:5005/assets/remoteEntry.js é declarado no shell (react/mv-marketplace/apps/shell/vite.config.js:16) e nos quatro remotes (react/mv-marketplace/apps/admin/vite.config.js:15, react/mv-marketplace/apps/buyer/vite.config.js:15, react/mv-marketplace/apps/payment/vite.config.js:13, react/mv-marketplace/apps/seller/vite.config.js:13), mas nenhum arquivo de código o importa; não gerou linha porque não há construção no código-fonte.
- Não há mecanismo de comunicação entre unidades: a busca do passo 4 em todo o snapshot (fora de `node_modules/` e dos `package-lock.json`) não encontrou `postMessage`, `CustomEvent`, `dispatchEvent`, `addEventListener`, `BroadcastChannel`, `localStorage`, `customElements`, `<iframe`, `registerApplication` nem `registerMicroApps`. O contexto de `react/mv-marketplace/apps/shell/src/store/authStore.jsx:3-12` é interno ao shell e não é compartilhado com outra unidade.
- Pelo passo 4 ficam fora da tabela: o `<script type="module" src="/src/main.jsx">` de cada `index.html` (react/mv-marketplace/apps/shell/index.html:11 e equivalentes nos quatro remotes), que carrega a entrada da própria unidade e não o bundle de outra; os `export default` dos componentes expostos (react/mv-marketplace/apps/admin/src/App.jsx:2, react/mv-marketplace/apps/buyer/src/App.jsx:9, react/mv-marketplace/apps/payment/src/App.jsx:2, react/mv-marketplace/apps/seller/src/App.jsx:5), exports comuns cuja exposição já está na configuração de build; e `Suspense`/`BrowserRouter` em react/mv-marketplace/apps/shell/src/router.jsx:11-12, passos da mesma construção já registrada em :13.
- `react/mv-marketplace/packages/mvp-theme` é `No` na revisão estrutural e não aparece como unidade; seu único código próprio reexporta um Button (react/mv-marketplace/packages/mvp-theme/src/index.js:1) e nenhuma aplicação o importa.
