---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Leitura do repositório

Demonstração de micro-frontends com Web Components, sem biblioteca de composição. O `app-shell` é uma página HTML estática que, para cada unidade, carrega um script por URL e usa a tag que esse script define (app-shell/index.html:12-28). Cada unidade é servida num servidor próprio:

- `app1` e `app2` são JavaScript puro, sem build: um arquivo `app.js` que define a tag (`hello-app`, `world-app`).
- `app3` é React encapsulado num custom element com Shadow DOM (app3/src/MyCounterElement.jsx:8, 20), empacotado como bundle IIFE (app3/vite.config.js:10-15).

O shell passa configuração para app3 por atributos HTML (`theme`, `maxcount`; app-shell/index.html:27), que é o único contrato de dados entre as unidades. Não há eventos entre elas. As portas 3001 a 3003 estão nas URLs dos scripts que o shell carrega (app-shell/index.html:14, 20, 26), e os servidores que as atendem são iniciados por comandos `http-server` descritos no README (README.md:52-69); não há configuração de servidor no repositório. Uma variante com Lit existe no código, mas não é alcançada por nenhum ponto de entrada.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | app-shell | app3 | application → custom-element | origem → destino | web-components | Yes | Yes | app3/vite.config.js:10-15 (bundle `lib` com entrada `src/MyCounterElement.jsx`, formato `iife`, arquivo `my-counter-app`) | app-shell/index.html:26; app3/src/MyCounterElement.jsx:6; app3/src/MyCounterElement.jsx:8; app3/src/MyCounterElement.jsx:28; app-shell/index.html:26; app-shell/index.html:27 |
| 2 | app-shell | app1 | application → custom-element | origem → destino | web-components | Yes | Yes | — | app1/app.js:1; app1/app.js:6; app-shell/index.html:14; app-shell/index.html:15 |
| 3 | app-shell | app2 | application → custom-element | origem → destino | web-components | Yes | Yes | — | app2/app.js:1; app2/app.js:6; app-shell/index.html:20; app-shell/index.html:21 |

## Observações

**1. app-shell → app3.** O shell carrega `http://localhost:3003/my-counter-app.iife.js` e usa `<my-counter-app>` (app-shell/index.html:26-27). A tag é definida em app3/src/MyCounterElement.jsx:28, e o nome do arquivo corresponde a `fileName: 'my-counter-app'` com formato `iife` (app3/vite.config.js:12-14). app-shell/index.html:26 aparece duas vezes em Código porque a revisão de código-fonte a registrou por dois padrões.

**2. app-shell → app1.** O shell carrega `http://localhost:3001/app.js` e usa `<hello-app>` (app-shell/index.html:14-15), tag definida em app1/app.js:6. A unidade não tem configuração de build.

**3. app-shell → app2.** O shell carrega `http://localhost:3002/app.js` e usa `<world-app>` (app-shell/index.html:20-21), tag definida em app2/app.js:6. A unidade não tem configuração de build.

## Resumo

Relações: 3 (application → custom-element: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
