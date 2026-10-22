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
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Leitura do repositório

A documentação é o README da raiz, em inglês. Ele apresenta o repositório como um "playground" de micro-frontends com Web Components: três aplicações, `app1` e `app2` em JavaScript puro e `app3` em React com Shadow DOM, mais um `app-shell` que as reúne. Traz a árvore de pastas comentada, as instruções para servir cada pasta com `http-server`, dicas de CORS e uma lista de "Features". O tom é promocional ("Ideal for learning, prototyping, or showcasing microfrontend architecture without any tooling overhead", README.md:92), e essa frase de propósito não virou linha.

Foram lidos os artefatos que as revisões anteriores citam:
- `app-shell/index.html`;
- `app1/index.html`, `app1/app.js`, `app2/index.html` e `app2/app.js`;
- `app3/index.html`, `app3/package.json`, `app3/vite.config.js`, `app3/src/main.jsx`, `app3/src/MyCounterElement.jsx` e `app3/src/MyCounterLitElement.jsx`.

Os únicos comentários são um sobre a injeção de CSS no Shadow DOM (app3/src/MyCounterElement.jsx:14) e trechos de código desativado.

A descrição da estrutura e da composição confere com as revisões anteriores. Destoam dois pontos:
- **Deploy:** o README diz que as aplicações são "independently deployed", mas o repositório só tem servidores locais.
- **Isolamento de estilos:** promete "zero global style bleed", mas só a `app3` isola os seus estilos.

Ocorrências `doc-*` que não viraram linha: README.md:1 (título), README.md:11 (raiz da árvore de pastas) e README.md:92 (frase de propósito). As demais estão nas afirmações 1, 2 e 6.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "3 independently deployed apps" (três aplicações implantadas de forma independente) | build-deploy | sem corroboração | 3.4.6 (Deploy `não observado` nas quatro) |
| 2 | README.md:5-8 | "`app1` – Vanilla JS component […] `app3` – A React component wrapped in Shadow DOM […] `app-shell` – The main UI that brings it all together" | estrutura | corroborada | 3.4.3 (quatro aplicações `Yes`); 3.4.5 #1-#3; app1/app.js:1-6; app3/src/MyCounterElement.jsx:8, 28 |
| 3 | README.md:16 | "index.html # Standalone entry point for app1" (a app1 roda sozinha) | independência | corroborada | 3.4.3; app1/index.html:3-4 |
| 4 | README.md:19 | "index.html # Standalone entry point for app2" (a app2 roda sozinha) | independência | corroborada | 3.4.3; app2/index.html:3-4 |
| 5 | README.md:22-23 | "my-counter-app.iife.js # Self-contained React bundle" (o bundle da app3 é autossuficiente) | build-deploy | corroborada | 3.4.6 #4; app3/vite.config.js:9-16 |
| 6 | README.md:35 | "Each app […] is dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy." | composição | corroborada | 3.4.5 #1-#3; app-shell/index.html:14-15, 20-21, 26-27 |
| 7 | README.md:88 | "Plug-and-play architecture with zero global style bleed" (nenhum estilo global vaza entre as unidades) | composição | contradita | app1/app.js:3; app-shell/style.css:48-52; app-shell/index.html:12-16 |

## Observações

**1. README.md:3.** A revisão de build e deploy não encontrou artefato de deploy: cada pasta é servida à mão com `http-server`, numa porta própria (README.md:46-69). O snapshot não confirma nem desmente um deploy independente, e o README só descreve a execução local. Por isso a afirmação fica `sem corroboração`.

**2. README.md:5-8.** As quatro pastas são aplicações na revisão estrutural. As três relações `application → custom-element` partem do shell. app1 e app2 definem custom elements em JavaScript puro, e a app3 encapsula React num custom element com `attachShadow`. Repetições: a árvore comentada (README.md:13, "Hosts all microfrontends"; README.md:17, "Vanilla JS custom element").

**3. README.md:16.** A app1 tem um `index.html` próprio que carrega o script e usa a tag, o que permite abri-la sozinha.

**4. README.md:19.** A app2 tem o mesmo arranjo da app1: um `index.html` próprio que carrega o script e usa a tag `world-app`.

**5. README.md:22-23.** A app3 é construída como biblioteca IIFE, sem dependências externas declaradas, e o shell a carrega por uma única URL. O `dist/` citado na árvore não está no snapshot, porque é saída de build.

**6. README.md:35.** O shell carrega o script de cada aplicação pela URL da sua porta e usa a tag correspondente. A frase também fala de cada app na sua própria porta; isso é detalhe de infraestrutura, já registrado na revisão de build e deploy.

**7. README.md:88.** Só a app3 isola os estilos: cria um Shadow DOM e injeta neles o seu CSS (app3/src/MyCounterElement.jsx:8, 14-16; repetição em README.md:85). app1 e app2 escrevem `<h2>` no DOM comum com `innerHTML` (app1/app.js:3). O shell estiliza `.app-container h2` (app-shell/style.css:48-52), e os dois elementos ficam dentro de `.app-container` (app-shell/index.html:12-16). O estilo do shell, portanto, atinge as duas aplicações. A afirmação vale para a app3, mas não para o conjunto.

## Resumo

Afirmações: 7 (corroborada: 5, parcial: 0, contradita: 1, sem corroboração: 1). Temas: (estrutura: 1, composição: 2, build-deploy: 2, independência: 2).
