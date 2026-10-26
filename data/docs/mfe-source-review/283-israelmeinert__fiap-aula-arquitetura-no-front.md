---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3 | exemplos/10-micro-frontends/apps/catalogo-react | runtime-composition | Yes | Exporta `mount(host)`, que cria a raiz React e renderiza `App` no elemento do host, devolvendo o cleanup `root.unmount()` (exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5). É a entrada do bundle `dist/microfrontend.js` (scripts/build-remoto.mjs:21-22, chamado por exemplos/10-micro-frontends/apps/catalogo-react/package.json:7), servido na porta 4301 (exemplos/10-micro-frontends/apps/catalogo-react/package.json:8) e montado pelo shell em exemplos/10-micro-frontends/apps/shell/src/main.ts:26. |
| src-mount-export | exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4 | exemplos/10-micro-frontends/apps/checkout-angular | runtime-composition | Yes | Exporta `mount(host)`, que cria a aplicação Angular, cria `CheckoutApp` com `hostElement: host` e devolve o cleanup (exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12). Compilado pelo ngc (exemplos/10-micro-frontends/apps/checkout-angular/tsconfig.json:13-15) e empacotado como `dist/microfrontend.js` (scripts/build-remoto.mjs:21-22, chamado por exemplos/10-micro-frontends/apps/checkout-angular/package.json:7), servido na porta 4302 e montado pelo shell em exemplos/10-micro-frontends/apps/shell/src/main.ts:26. |
| src-custom-element | aula-arquitetura-front-end.html:20284 | — | none | No | Script do runtime do Marp embutido nos slides (`class s extends HTMLElement`, `attachShadow`, `customElements.define("marp-auto-scaling",s)` na mesma linha), para o escalonamento dos slides; não é unidade frontend: a raiz `.` é No na revisão estrutural e o HTML é a apresentação da aula (README.md:5). |
| src-iframe | aula-arquitetura-front-end.html:20635 | — | none | No | `document.createElement("iframe")` do script de apresentação dos slides, que abre a visão geral (`view=overview`) da própria apresentação; interno ao material de aula, não embute outra unidade. |
| src-cross-unit-communication | aula-arquitetura-front-end.html:20284 | — | none | No | `postMessage` do runtime do Marp para os `iframe` da própria apresentação (`e.querySelectorAll("iframe")` … `t.postMessage(...)`, na mesma linha); comunicação interna dos slides, não entre unidades. |
| src-cross-unit-communication | aula-arquitetura-front-end.html:20635 | — | none | No | `window.parent.postMessage("closeOverview", ...)` e `postMessage(\`navigate:...\`)` entre as janelas de visão geral/apresentador do próprio deck de slides; não é mecanismo entre unidades. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | exemplos/10-micro-frontends/apps/shell/src/main.ts:16 | exemplos/10-micro-frontends/apps/shell | remote-resolution | Yes | Busca o manifesto `/remotes.json` e resolve a URL de entrada do remoto pelo nome (`catalogo` ou `checkout`), com validação de versão e de origem (exemplos/10-micro-frontends/apps/shell/src/main.ts:16-22); o manifesto aponta para `http://127.0.0.1:4301/microfrontend.js` e `http://127.0.0.1:4302/microfrontend.js` (exemplos/10-micro-frontends/apps/shell/public/remotes.json:2-4). `abrir` é ligado aos botões em exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37, entrada carregada por exemplos/10-micro-frontends/apps/shell/index.html:1. |
| manual | exemplos/10-micro-frontends/apps/shell/src/main.ts:23 | exemplos/10-micro-frontends/apps/shell | dynamic-loading | Yes | `import(/* @vite-ignore */ url.href)` carrega em runtime o módulo ESM do remoto resolvido na linha 20 (catalogo-react ou checkout-angular); tipado pelo contrato `Remote` importado de exemplos/10-micro-frontends/packages/contracts/mount.ts:4 (exemplos/10-micro-frontends/apps/shell/src/main.ts:1). |
| manual | exemplos/10-micro-frontends/apps/shell/src/main.ts:26 | exemplos/10-micro-frontends/apps/shell | runtime-composition | Yes | `remote.mount(slot)` monta o remoto carregado num `div` próprio (exemplos/10-micro-frontends/apps/shell/src/main.ts:12-13) e guarda o cleanup (linha 28), chamado ao desmontar em exemplos/10-micro-frontends/apps/shell/src/main.ts:7 e :38. |

## Resumo

Construções com composição: 5 (runtime-composition: 3, remote-resolution: 1, dynamic-loading: 1).

## Notas

- As quatro ocorrências em `aula-arquitetura-front-end.html` são falsos positivos: o arquivo é a apresentação Marp exportada, com scripts minificados de slides em linhas muito longas.
- A mineração não pegou o fluxo do shell (manifesto, `import()` com URL em variável e `mount`), registrado nas linhas manuais.
- Os `import()` locais de outras unidades (por exemplo exemplos/04-feature-based/angular/src/app/app.routes.ts:3-4, exemplos/11-renderizacao/next/src/app/painel/page.tsx:4) carregam arquivos da própria aplicação e não viraram linha.
