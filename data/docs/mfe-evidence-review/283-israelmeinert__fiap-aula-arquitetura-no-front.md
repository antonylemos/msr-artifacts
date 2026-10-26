---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Leitura do repositório

A revisão de dependências não encontrou biblioteca das tecnologias de MFE, portanto não há observação na dimensão 1. A composição é implementada com recursos do navegador: o manifesto do shell nomeia dois remotos (#1), o shell resolve seus nomes (#8), importa o ESM (#9) e chama `mount` com limpeza (#10). Os remotos React e Angular oferecem os adaptadores (#2, #3). Essa cadeia forma duas relações ativas por `script` (#42, #43), entre as três unidades do bloco 10 (#30–#32), cada uma com build separado (#62–#64). A carga ESM por URL é o mecanismo que a 3.4.5 chama `script`, correspondente ao `runtime-script` da classificação.

A estrutura contém 29 aplicações frontend (#12–#37, #39–#41); as outras 26 são exemplos isolados e não participam das duas relações. A raiz coordena o workspace (#11), e o BFF é apoio de backend (#38). Os quatro achados no HTML da apresentação são contexto: custom element, iframe e mensagens pertencem ao runtime dos slides (#4–#7). Builds próprios nas aplicações isoladas (#44–#61, #65–#72) não as tornam participantes da composição. Nenhum dos 29 registros de build e deploy tem deploy observado ou versionamento independente.

Só o manifesto gera observação de configuração: os demais arquivos citados nas tabelas declaram workspace, compilação, estilos, integração de framework ou proxies locais, sem os elementos de composição definidos na 3.5. O contrato TypeScript é código de tipos; não é configuração de ferramenta. Os scripts comuns de build e serviço dão suporte às observações estruturais, de composição e de build, sem configurar federação ou registrar destinos remotos.

As 27 afirmações documentais são apoio semântico fraco (#73–#99). A árvore dos slides atribui rotas ao shell, mas os botões e a ausência de roteador desmentem essa parte (#78). A publicação independente é apenas parcialmente corroborada (#92); a própria documentação declara não provisionar deploy (#93). A troca das origens também exige ajustar a lista fixa do shell (#94). O histórico de commit único não esclarece a intenção passada de roteamento (#100), enquanto a dúvida sobre publicação é resolvida pelo próprio snapshot (#101). Não permanece ambiguidade arquitetural do snapshot nesses dois pontos.

## Observações

### 1. exemplos/10-micro-frontends/apps/shell/public/remotes.json:1-5

**Observação:** O manifesto declara `version: 1`, `catalogo: "http://127.0.0.1:4301/microfrontend.js"` e `checkout: "http://127.0.0.1:4302/microfrontend.js"`.

**Interpretação:** A configuração do shell nomeia dois destinos remotos e seus pontos de entrada ESM.

### 2. exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-6

**Observação:** `mount(host)` cria uma raiz React, renderiza `App` e devolve uma função que chama `root.unmount()`.

**Interpretação:** O remoto React fornece um adaptador de montagem e limpeza para um host recebido por parâmetro.

### 3. exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12

**Observação:** `mount(host)` cria uma aplicação Angular, instancia `CheckoutApp` com `hostElement: host`, anexa sua view e devolve a limpeza da view, do componente e da aplicação.

**Interpretação:** O remoto Angular fornece seu ciclo de montagem e limpeza para um host recebido por parâmetro.

### 4. aula-arquitetura-front-end.html:20284

**Observação:** O script embutido declara uma classe que estende `HTMLElement`, usa `attachShadow` e registra `marp-auto-scaling` com `customElements.define`.

**Interpretação:** O custom element atende ao escalonamento do material Marp, sem constituir composição de unidades frontend.

### 5. aula-arquitetura-front-end.html:20635

**Observação:** O script dos slides cria um `iframe` para a visão geral da própria apresentação (`view=overview`).

**Interpretação:** O iframe é interno ao deck e não embute outra aplicação do domínio.

### 6. aula-arquitetura-front-end.html:20284

**Observação:** O runtime dos slides seleciona seus `iframe` e chama `postMessage` para eles.

**Interpretação:** A comunicação é interna à apresentação e não conecta unidades frontend.

### 7. aula-arquitetura-front-end.html:20635

**Observação:** O script de apresentação usa `window.parent.postMessage("closeOverview", ...)` e mensagens `navigate:...` entre as janelas do deck.

**Interpretação:** As mensagens controlam as janelas da apresentação; não são comunicação entre aplicações do domínio.

### 8. exemplos/10-micro-frontends/apps/shell/src/main.ts:8-22; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37; exemplos/10-micro-frontends/apps/shell/public/remotes.json:1-5

**Observação:** `abrir(nome)` busca `/remotes.json`, valida a versão, extrai `manifesto[nome]` e verifica a origem. Os botões chamam `abrir("catalogo")` e `abrir("checkout")`.

**Interpretação:** O shell resolve os dois destinos de composição nomeados pelos botões e pelo manifesto.

### 9. exemplos/10-micro-frontends/apps/shell/src/main.ts:20-25; exemplos/10-micro-frontends/packages/contracts/mount.ts:4

**Observação:** `import(/* @vite-ignore */ url.href)` carrega o módulo ESM da URL resolvida pelo manifesto; o resultado é tipado como `Remote`.

**Interpretação:** O shell usa um mecanismo de carga ESM em runtime; esta chamada recebe a URL por variável, sem nomear sozinha um destino.

### 10. exemplos/10-micro-frontends/apps/shell/src/main.ts:7-13; exemplos/10-micro-frontends/apps/shell/src/main.ts:26-28; exemplos/10-micro-frontends/apps/shell/src/main.ts:38

**Observação:** `remote.mount(slot)` monta no elemento criado pelo shell. A função devolvida é guardada em `cleanup` e chamada ao desmontar ou trocar a montagem.

**Interpretação:** O consumidor executa o contrato de montagem e limpeza do remoto; a chamada recebe o módulo previamente carregado.

### 11. .; package.json:9-15; package.json:23; scripts/build.mjs:6-11; README.md:5

**Observação:** A raiz declara os workspaces npm e o script que percorre seus builds. A apresentação da aula fica em `aula-arquitetura-front-end.html`.

**Interpretação:** É a raiz de coordenação do material, sem UI própria; não constitui unidade frontend.

### 12. exemplos/01-componentes/angular; angular.json:15-16; exemplos/01-componentes/angular/src/main.ts:6; angular.json:12-13; exemplos/01-componentes/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:15-16 (`browser` exemplos/01-componentes/angular/src/main.ts, `index` exemplos/01-componentes/angular/src/index.html); exemplos/01-componentes/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:12-13 (alvo `build`, `@angular/build:application`); exemplos/01-componentes/angular/package.json:8 (`ng build 01-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 13. exemplos/01-componentes/react; exemplos/01-componentes/react/index.html:2; exemplos/01-componentes/react/src/main.tsx:6; exemplos/01-componentes/react/vite.config.ts:1-3; exemplos/01-componentes/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/01-componentes/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/01-componentes/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/01-componentes/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/01-componentes/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 14. exemplos/02-atomic-design/angular; angular.json:61-62; exemplos/02-atomic-design/angular/src/main.ts:6; angular.json:58-59; exemplos/02-atomic-design/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:61-62 (`browser` exemplos/02-atomic-design/angular/src/main.ts, `index` exemplos/02-atomic-design/angular/src/index.html); exemplos/02-atomic-design/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:58-59 (alvo `build`, `@angular/build:application`); exemplos/02-atomic-design/angular/package.json:8 (`ng build 02-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 15. exemplos/02-atomic-design/react; exemplos/02-atomic-design/react/index.html:2; exemplos/02-atomic-design/react/src/main.tsx:6; exemplos/02-atomic-design/react/vite.config.ts:1-3; exemplos/02-atomic-design/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/02-atomic-design/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/02-atomic-design/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/02-atomic-design/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/02-atomic-design/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 16. exemplos/03-camadas/angular; angular.json:107-108; exemplos/03-camadas/angular/src/main.ts:6; angular.json:104-105; exemplos/03-camadas/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:107-108 (`browser` exemplos/03-camadas/angular/src/main.ts, `index` exemplos/03-camadas/angular/src/index.html); exemplos/03-camadas/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:104-105 (alvo `build`, `@angular/build:application`); exemplos/03-camadas/angular/package.json:8 (`ng build 03-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 17. exemplos/03-camadas/react; exemplos/03-camadas/react/index.html:2; exemplos/03-camadas/react/src/main.tsx:6; exemplos/03-camadas/react/vite.config.ts:1-3; exemplos/03-camadas/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/03-camadas/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/03-camadas/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/03-camadas/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/03-camadas/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 18. exemplos/04-feature-based/angular; angular.json:153-154; exemplos/04-feature-based/angular/src/main.ts:6; angular.json:150-151; exemplos/04-feature-based/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:153-154 (`browser` exemplos/04-feature-based/angular/src/main.ts, `index` exemplos/04-feature-based/angular/src/index.html); exemplos/04-feature-based/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:150-151 (alvo `build`, `@angular/build:application`); exemplos/04-feature-based/angular/package.json:8 (`ng build 04-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 19. exemplos/04-feature-based/react; exemplos/04-feature-based/react/index.html:2; exemplos/04-feature-based/react/src/main.tsx:6; exemplos/04-feature-based/react/vite.config.ts:1-3; exemplos/04-feature-based/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/04-feature-based/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/04-feature-based/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/04-feature-based/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/04-feature-based/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 20. exemplos/05-clean-architecture/angular; angular.json:199-200; exemplos/05-clean-architecture/angular/src/main.ts:6; angular.json:196-197; exemplos/05-clean-architecture/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:199-200 (`browser` exemplos/05-clean-architecture/angular/src/main.ts, `index` exemplos/05-clean-architecture/angular/src/index.html); exemplos/05-clean-architecture/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:196-197 (alvo `build`, `@angular/build:application`); exemplos/05-clean-architecture/angular/package.json:8 (`ng build 05-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 21. exemplos/05-clean-architecture/react; exemplos/05-clean-architecture/react/index.html:2; exemplos/05-clean-architecture/react/src/main.tsx:6; exemplos/05-clean-architecture/react/vite.config.ts:1-3; exemplos/05-clean-architecture/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/05-clean-architecture/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/05-clean-architecture/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/05-clean-architecture/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/05-clean-architecture/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 22. exemplos/06-hexagonal/angular; angular.json:245-246; exemplos/06-hexagonal/angular/src/main.ts:6; angular.json:242-243; exemplos/06-hexagonal/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:245-246 (`browser` exemplos/06-hexagonal/angular/src/main.ts, `index` exemplos/06-hexagonal/angular/src/index.html); exemplos/06-hexagonal/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:242-243 (alvo `build`, `@angular/build:application`); exemplos/06-hexagonal/angular/package.json:8 (`ng build 06-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 23. exemplos/06-hexagonal/react; exemplos/06-hexagonal/react/index.html:2; exemplos/06-hexagonal/react/src/main.tsx:6; exemplos/06-hexagonal/react/vite.config.ts:1-3; exemplos/06-hexagonal/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/06-hexagonal/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/06-hexagonal/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/06-hexagonal/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/06-hexagonal/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 24. exemplos/07-feature-sliced-design/angular; angular.json:291-292; exemplos/07-feature-sliced-design/angular/src/main.ts:6; angular.json:288-289; exemplos/07-feature-sliced-design/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:291-292 (`browser` exemplos/07-feature-sliced-design/angular/src/main.ts, `index` exemplos/07-feature-sliced-design/angular/src/index.html); exemplos/07-feature-sliced-design/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:288-289 (alvo `build`, `@angular/build:application`); exemplos/07-feature-sliced-design/angular/package.json:8 (`ng build 07-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 25. exemplos/07-feature-sliced-design/react; exemplos/07-feature-sliced-design/react/index.html:2; exemplos/07-feature-sliced-design/react/src/main.tsx:6; exemplos/07-feature-sliced-design/react/vite.config.ts:1-3; exemplos/07-feature-sliced-design/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/07-feature-sliced-design/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/07-feature-sliced-design/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/07-feature-sliced-design/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/07-feature-sliced-design/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 26. exemplos/08-mvvm/angular; angular.json:337-338; exemplos/08-mvvm/angular/src/main.ts:6; angular.json:334-335; exemplos/08-mvvm/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:337-338 (`browser` exemplos/08-mvvm/angular/src/main.ts, `index` exemplos/08-mvvm/angular/src/index.html); exemplos/08-mvvm/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:334-335 (alvo `build`, `@angular/build:application`); exemplos/08-mvvm/angular/package.json:8 (`ng build 08-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 27. exemplos/08-mvvm/react; exemplos/08-mvvm/react/index.html:2; exemplos/08-mvvm/react/src/main.tsx:6; exemplos/08-mvvm/react/vite.config.ts:1-3; exemplos/08-mvvm/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/08-mvvm/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/08-mvvm/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/08-mvvm/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/08-mvvm/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 28. exemplos/09-flux/angular; angular.json:383-384; exemplos/09-flux/angular/src/main.ts:6; angular.json:380-381; exemplos/09-flux/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:383-384 (`browser` exemplos/09-flux/angular/src/main.ts, `index` exemplos/09-flux/angular/src/index.html); exemplos/09-flux/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:380-381 (alvo `build`, `@angular/build:application`); exemplos/09-flux/angular/package.json:8 (`ng build 09-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 29. exemplos/09-flux/react; exemplos/09-flux/react/index.html:2; exemplos/09-flux/react/src/main.tsx:6; exemplos/09-flux/react/vite.config.ts:1-3; exemplos/09-flux/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/09-flux/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/09-flux/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/09-flux/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/09-flux/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 30. exemplos/10-micro-frontends/apps/catalogo-react; scripts/build-remoto.mjs:21; exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5; exemplos/10-micro-frontends/apps/catalogo-react/package.json:7; scripts/build-remoto.mjs:21-26

**Observação:** O diretório contém manifesto próprio. Entrada: scripts/build-remoto.mjs:21 (`entryPoints` `src/mount.tsx` no modo react); exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5 (`mount` cria raiz React e devolve o cleanup). Build: exemplos/10-micro-frontends/apps/catalogo-react/package.json:7 (`node ../../../../scripts/build-remoto.mjs react`); scripts/build-remoto.mjs:21-26 (esbuild gera `dist/microfrontend.js` ESM).

**Interpretação:** Remoto React com função de montagem e build esbuild próprio, servido em porta própria. Integra o conjunto composto do bloco 10.

### 31. exemplos/10-micro-frontends/apps/checkout-angular; exemplos/10-micro-frontends/apps/checkout-angular/tsconfig.json:13-15; scripts/build-remoto.mjs:21; exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12; exemplos/10-micro-frontends/apps/checkout-angular/package.json:7; scripts/build-remoto.mjs:9-26

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/10-micro-frontends/apps/checkout-angular/tsconfig.json:13-15 (`files` `src/mount.ts` para o ngc); scripts/build-remoto.mjs:21 (`entryPoints` `dist/compiled/mount.js` no modo angular); exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12 (`mount` cria a aplicação Angular e devolve o cleanup). Build: exemplos/10-micro-frontends/apps/checkout-angular/package.json:7 (`ngc -p tsconfig.json && node ../../../../scripts/build-remoto.mjs angular`); scripts/build-remoto.mjs:9-26 (linker Angular e esbuild ESM).

**Interpretação:** Remoto Angular com função de montagem e build ngc + esbuild próprio, servido em porta própria. Integra o conjunto composto do bloco 10.

### 32. exemplos/10-micro-frontends/apps/shell; exemplos/10-micro-frontends/apps/shell/index.html:1; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-38; exemplos/10-micro-frontends/apps/shell/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/10-micro-frontends/apps/shell/index.html:1 (`<script type="module" src="/src/main.ts">`); exemplos/10-micro-frontends/apps/shell/src/main.ts:36-38 (liga os botões que montam os remotos). Build: exemplos/10-micro-frontends/apps/shell/package.json:8 (`tsc --noEmit && vite build`, Vite sem arquivo de configuração).

**Interpretação:** Shell Vite/TypeScript com entrada e build próprios. Integra o conjunto composto do bloco 10.

### 33. exemplos/11-renderizacao/angular; angular.json:429-430; exemplos/11-renderizacao/angular/src/main.ts:4; angular.json:437-441; angular.json:426-427; exemplos/11-renderizacao/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:429-430 (`browser` exemplos/11-renderizacao/angular/src/main.ts, `index` exemplos/11-renderizacao/angular/src/index.html); exemplos/11-renderizacao/angular/src/main.ts:4 (`bootstrapApplication`); angular.json:437-441 (`server` main.server.ts, `outputMode: server`, `ssr.entry` server.ts). Build: angular.json:426-427 (alvo `build`, `@angular/build:application`); exemplos/11-renderizacao/angular/package.json:8 (`ng build 11-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 34. exemplos/11-renderizacao/next; exemplos/11-renderizacao/next/src/app/layout.tsx:4; exemplos/11-renderizacao/next/next.config.mjs:1-2; exemplos/11-renderizacao/next/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/11-renderizacao/next/src/app/layout.tsx:4 (`Layout`, App Router); exemplos/11-renderizacao/next/src/app/evento/page.tsx (rota `/evento`). Build: exemplos/11-renderizacao/next/next.config.mjs:1-2 (configuração Next); exemplos/11-renderizacao/next/package.json:8 (`next build --webpack`).

**Interpretação:** App Next.js com entrada e build próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 35. exemplos/12-ilhas/angular; angular.json:480-481; exemplos/12-ilhas/angular/src/main.ts:6; angular.json:477-478; exemplos/12-ilhas/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:480-481 (`browser` exemplos/12-ilhas/angular/src/main.ts, `index` exemplos/12-ilhas/angular/src/index.html); exemplos/12-ilhas/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:477-478 (alvo `build`, `@angular/build:application`); exemplos/12-ilhas/angular/package.json:8 (`ng build 12-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 36. exemplos/12-ilhas/astro; exemplos/12-ilhas/astro/src/pages/index.astro:1-5; exemplos/12-ilhas/astro/astro.config.mjs:1-3; exemplos/12-ilhas/astro/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/12-ilhas/astro/src/pages/index.astro:1-5 (página Astro com a ilha `<Selecionar client:visible />`). Build: exemplos/12-ilhas/astro/astro.config.mjs:1-3 (Astro com integração React); exemplos/12-ilhas/astro/package.json:8 (`astro build`).

**Interpretação:** Site Astro com entrada e build próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 37. exemplos/13-bff/apps/web-angular; angular.json:526-527; exemplos/13-bff/apps/web-angular/src/main.ts:5; angular.json:523-524; exemplos/13-bff/apps/web-angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:526-527 (`browser` exemplos/13-bff/apps/web-angular/src/main.ts, `index` exemplos/13-bff/apps/web-angular/src/index.html); exemplos/13-bff/apps/web-angular/src/main.ts:5 (`bootstrapApplication`). Build: angular.json:523-524 (alvo `build`, `@angular/build:application`); exemplos/13-bff/apps/web-angular/package.json:8 (`ng build 13-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 38. exemplos/13-bff/apps/web-bff; exemplos/13-bff/apps/web-bff/src/main.ts:1-5; exemplos/13-bff/apps/web-bff/package.json:8

**Observação:** `src/main.ts` inicia um servidor Express na porta 4011. O script `build` executa apenas `tsc -p tsconfig.json --noEmit`.

**Interpretação:** O diretório contém o BFF de apoio, sem uma unidade frontend.

### 39. exemplos/13-bff/next; exemplos/13-bff/next/src/app/layout.tsx:4; exemplos/13-bff/next/next.config.mjs:1-2; exemplos/13-bff/next/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/13-bff/next/src/app/layout.tsx:4 (`Layout`, App Router); exemplos/13-bff/next/src/app/evento/page.tsx (rota `/evento`). Build: exemplos/13-bff/next/next.config.mjs:1-2 (configuração Next); exemplos/13-bff/next/package.json:8 (`next build --webpack`).

**Interpretação:** App Next.js com entrada e build próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 40. exemplos/14-escolha-e-evolucao/angular; angular.json:572-573; exemplos/14-escolha-e-evolucao/angular/src/main.ts:6; angular.json:569-570; exemplos/14-escolha-e-evolucao/angular/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: angular.json:572-573 (`browser` exemplos/14-escolha-e-evolucao/angular/src/main.ts, `index` exemplos/14-escolha-e-evolucao/angular/src/index.html); exemplos/14-escolha-e-evolucao/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:569-570 (alvo `build`, `@angular/build:application`); exemplos/14-escolha-e-evolucao/angular/package.json:8 (`ng build 14-angular`).

**Interpretação:** Aplicação Angular com entrada e alvo de build próprios no angular.json. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 41. exemplos/14-escolha-e-evolucao/react; exemplos/14-escolha-e-evolucao/react/index.html:2; exemplos/14-escolha-e-evolucao/react/src/main.tsx:6; exemplos/14-escolha-e-evolucao/react/vite.config.ts:1-3; exemplos/14-escolha-e-evolucao/react/package.json:8

**Observação:** O diretório contém manifesto próprio. Entrada: exemplos/14-escolha-e-evolucao/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/14-escolha-e-evolucao/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/14-escolha-e-evolucao/react/vite.config.ts:1-3 (Vite com plugin React); exemplos/14-escolha-e-evolucao/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretação:** Aplicação React com entrada e build Vite próprios. É uma aplicação isolada do material; este limite não estabelece ligação com outra unidade.

### 42. exemplos/10-micro-frontends/apps/shell/src/main.ts:16-28; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37; exemplos/10-micro-frontends/apps/shell/public/remotes.json:3; exemplos/10-micro-frontends/apps/catalogo-react/package.json:7-8; scripts/build-remoto.mjs:21-26; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-6

**Observação:** O botão de catálogo chama `abrir`; a chave `catalogo` do manifesto resolve o bundle ESM servido na porta 4301. O build de `catalogo-react` gera esse `microfrontend.js`, e o shell o importa e chama seu `mount`.

**Interpretação:** O shell compõe o remoto catalogo-react em runtime pelo mecanismo `script`, com carga ESM por URL e ciclo de montagem e limpeza. A relação está ativa no snapshot.

### 43. exemplos/10-micro-frontends/apps/shell/src/main.ts:16-28; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37; exemplos/10-micro-frontends/apps/shell/public/remotes.json:4; exemplos/10-micro-frontends/apps/checkout-angular/package.json:7-8; scripts/build-remoto.mjs:21-26; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12

**Observação:** O botão de checkout chama `abrir`; a chave `checkout` do manifesto resolve o bundle ESM servido na porta 4302. O build de `checkout-angular` gera esse `microfrontend.js`, e o shell o importa e chama seu `mount`.

**Interpretação:** O shell compõe o remoto checkout-angular em runtime pelo mecanismo `script`, com carga ESM por URL e ciclo de montagem e limpeza. A relação está ativa no snapshot.

### 44. angular.json:12-13; angular.json:21; exemplos/01-componentes/angular/package.json:8; exemplos/01-componentes/angular/package.json:7

**Observação:** O script `build` chama `ng build 01-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/01-componentes/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 45. exemplos/01-componentes/react/vite.config.ts:1-3; exemplos/01-componentes/react/package.json:8; exemplos/01-componentes/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 46. angular.json:58-59; angular.json:67; exemplos/02-atomic-design/angular/package.json:8; exemplos/02-atomic-design/angular/package.json:7

**Observação:** O script `build` chama `ng build 02-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/02-atomic-design/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 47. exemplos/02-atomic-design/react/vite.config.ts:1-3; exemplos/02-atomic-design/react/package.json:8; exemplos/02-atomic-design/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 48. angular.json:104-105; angular.json:113; exemplos/03-camadas/angular/package.json:8; exemplos/03-camadas/angular/package.json:7

**Observação:** O script `build` chama `ng build 03-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/03-camadas/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 49. exemplos/03-camadas/react/vite.config.ts:1-3; exemplos/03-camadas/react/package.json:8; exemplos/03-camadas/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 50. angular.json:150-151; angular.json:159; exemplos/04-feature-based/angular/package.json:8; exemplos/04-feature-based/angular/package.json:7

**Observação:** O script `build` chama `ng build 04-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/04-feature-based/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 51. exemplos/04-feature-based/react/vite.config.ts:1-3; exemplos/04-feature-based/react/package.json:8; exemplos/04-feature-based/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 52. angular.json:196-197; angular.json:205; exemplos/05-clean-architecture/angular/package.json:8; exemplos/05-clean-architecture/angular/package.json:7

**Observação:** O script `build` chama `ng build 05-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/05-clean-architecture/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 53. exemplos/05-clean-architecture/react/vite.config.ts:1-3; exemplos/05-clean-architecture/react/package.json:8; exemplos/05-clean-architecture/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 54. angular.json:242-243; angular.json:251; exemplos/06-hexagonal/angular/package.json:8; exemplos/06-hexagonal/angular/package.json:7

**Observação:** O script `build` chama `ng build 06-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/06-hexagonal/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 55. exemplos/06-hexagonal/react/vite.config.ts:1-3; exemplos/06-hexagonal/react/package.json:8; exemplos/06-hexagonal/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 56. angular.json:288-289; angular.json:297; exemplos/07-feature-sliced-design/angular/package.json:8; exemplos/07-feature-sliced-design/angular/package.json:7

**Observação:** O script `build` chama `ng build 07-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/07-feature-sliced-design/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 57. exemplos/07-feature-sliced-design/react/vite.config.ts:1-3; exemplos/07-feature-sliced-design/react/package.json:8; exemplos/07-feature-sliced-design/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 58. angular.json:334-335; angular.json:343; exemplos/08-mvvm/angular/package.json:8; exemplos/08-mvvm/angular/package.json:7

**Observação:** O script `build` chama `ng build 08-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/08-mvvm/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 59. exemplos/08-mvvm/react/vite.config.ts:1-3; exemplos/08-mvvm/react/package.json:8; exemplos/08-mvvm/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 60. angular.json:380-381; angular.json:389; exemplos/09-flux/angular/package.json:8; exemplos/09-flux/angular/package.json:7

**Observação:** O script `build` chama `ng build 09-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/09-flux/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 61. exemplos/09-flux/react/vite.config.ts:1-3; exemplos/09-flux/react/package.json:8; exemplos/09-flux/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 62. exemplos/10-micro-frontends/apps/catalogo-react/package.json:7; scripts/build-remoto.mjs:21-26; exemplos/10-micro-frontends/apps/catalogo-react/package.json:8; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/shell/public/remotes.json:3

**Observação:** O script de build chama `build-remoto.mjs react`: esbuild empacota `src/mount.tsx` como `dist/microfrontend.js` ESM. O script `dev` serve o próprio `dist` na porta 4301 com CORS para o shell. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O bundle pode ser recompilado separadamente das outras unidades do bloco 10. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 63. exemplos/10-micro-frontends/apps/checkout-angular/package.json:7; scripts/build-remoto.mjs:9-26; exemplos/10-micro-frontends/apps/checkout-angular/package.json:8; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/shell/public/remotes.json:4

**Observação:** O build chama `ngc -p tsconfig.json` e `build-remoto.mjs angular`: linker e esbuild empacotam `dist/compiled/mount.js` como `dist/microfrontend.js` ESM. O script `dev` serve esse `dist` na porta 4302 com CORS para o shell. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O bundle pode ser recompilado separadamente das outras unidades do bloco 10. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 64. exemplos/10-micro-frontends/apps/shell/package.json:8; exemplos/10-micro-frontends/apps/shell/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O bundle pode ser recompilado separadamente das outras unidades do bloco 10. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 65. angular.json:426-427; angular.json:435-441; exemplos/11-renderizacao/angular/package.json:8; exemplos/11-renderizacao/angular/package.json:7; exemplos/11-renderizacao/angular/src/server.ts:10

**Observação:** O script `build` chama `ng build 11-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/11-renderizacao/angular/dist`. O alvo também gera o servidor SSR, que serve o diretório `browser` em `127.0.0.1:4200`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 66. exemplos/11-renderizacao/next/next.config.mjs:1-2; exemplos/11-renderizacao/next/package.json:8; exemplos/11-renderizacao/next/package.json:7

**Observação:** O manifesto declara `next build --webpack` e `next start` em `127.0.0.1:3000`; a configuração Next define `outputFileTracingRoot`. A saída própria é `.next/`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 67. angular.json:477-478; angular.json:486; exemplos/12-ilhas/angular/package.json:8; exemplos/12-ilhas/angular/package.json:7

**Observação:** O script `build` chama `ng build 12-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/12-ilhas/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 68. exemplos/12-ilhas/astro/astro.config.mjs:1-3; exemplos/12-ilhas/astro/package.json:8; exemplos/12-ilhas/astro/package.json:7

**Observação:** O manifesto declara `astro build`; a configuração Astro inclui a integração React. A aplicação gera seu próprio `dist/`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 69. angular.json:523-524; angular.json:532; exemplos/13-bff/apps/web-angular/package.json:8; exemplos/13-bff/apps/web-angular/package.json:7

**Observação:** O script `build` chama `ng build 13-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/13-bff/apps/web-angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 70. exemplos/13-bff/next/next.config.mjs:1-2; exemplos/13-bff/next/package.json:8; exemplos/13-bff/next/package.json:7

**Observação:** O manifesto declara `next build --webpack` e `next start` em `127.0.0.1:3000`; a configuração Next define `outputFileTracingRoot`. A saída própria é `.next/`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 71. angular.json:569-570; angular.json:578; exemplos/14-escolha-e-evolucao/angular/package.json:8; exemplos/14-escolha-e-evolucao/angular/package.json:7

**Observação:** O script `build` chama `ng build 14-angular`. O alvo correspondente do `angular.json` usa `@angular/build:application` e produz saída própria em `exemplos/14-escolha-e-evolucao/angular/dist`. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 72. exemplos/14-escolha-e-evolucao/react/vite.config.ts:1-3; exemplos/14-escolha-e-evolucao/react/package.json:8; exemplos/14-escolha-e-evolucao/react/package.json:7

**Observação:** O manifesto declara `build: "tsc --noEmit && vite build"`, que produz o `dist/` próprio da aplicação. Não há artefato de deploy nem versionamento independente registrado para a aplicação.

**Interpretação:** O build confirma o limite próprio desta aplicação. O build próprio não conecta esta aplicação isolada às demais. A execução local não demonstra publicação independente: o Deploy permanece `não observado`.

### 73. README.md:3

**Observação:** O documento afirma: "As pastas seguem os 14 blocos da apresentação e implementam alternativas do mesmo problema".

**Interpretação:** A documentação apresenta aplicações alternativas organizadas em blocos; a contagem de diretórios não equivale à quantidade de unidades compostas.

### 74. README.md:22

**Observação:** O documento afirma: "`10` inicia o conjunto de micro-frontends".

**Interpretação:** O texto identifica o bloco 10 como conjunto composto, em acordo com as duas relações ativas.

### 75. README.md:28

**Observação:** O documento afirma: "Shell dos micro-frontends".

**Interpretação:** O nome atribui ao shell o papel de consumidor e coordenador dos remotos.

### 76. README.md:93

**Observação:** O documento afirma: "Cada pasta é uma alternativa independente. Os exemplos não importam regras uns dos outros; compartilham apenas o estilo visual de demonstração.".

**Interpretação:** A afirmação descreve a separação entre alternativas e o compartilhamento de estilo, sem declarar composição entre os blocos.

### 77. conteudo/aula-arquitetura-front-end.md:2059-2069

**Observação:** O documento afirma: árvore "workspace/ # monorepo é opcional … apps/ shell/ catalogo-react/ … checkout-angular/ … packages/ contracts/mount.ts".

**Interpretação:** A árvore descreve as três unidades do bloco 10 num workspace e distingue delas o pacote de tipos do contrato.

### 78. conteudo/aula-arquitetura-front-end.md:2062

**Observação:** O documento afirma: "shell/ # descoberta, rotas, fallback".

**Interpretação:** A afirmação atribui ao shell um papel de roteamento que o snapshot desmente: os remotos são acionados por botões. Descoberta e fallback têm implementação, mas a corroboração da linha permanece `contradita`.

### 79. conteudo/aula-arquitetura-front-end.md:2068

**Observação:** O documento afirma: "contracts/mount.ts # contrato estável, sem store global".

**Interpretação:** O texto descreve um contrato de integração sem store global; os tipos definem montagem e limpeza.

### 80. conteudo/aula-arquitetura-front-end.md:2073

**Observação:** O documento afirma: "**adaptadores de montagem**, não uma configuração completa de federação".

**Interpretação:** A documentação descreve adaptadores próprios de montagem, em acordo com a composição por script sem biblioteca de federação.

### 81. conteudo/aula-arquitetura-front-end.md:2102

**Observação:** O documento afirma: "Contrato com o shell: **receber um elemento e devolver a limpeza**.".

**Interpretação:** O texto descreve o ciclo de integração entre host e remotos, baseado no elemento recebido e na função de limpeza devolvida.

### 82. conteudo/aula-arquitetura-front-end.md:2104

**Observação:** O documento afirma: "A origem do módulo pode mudar sem expor os componentes internos ao shell.".

**Interpretação:** A afirmação descreve encapsulamento dos componentes atrás de uma URL e de um contrato de montagem. A troca de origem exige também ajustar a lista de origens do shell.

### 83. conteudo/aula-arquitetura-front-end.md:2107

**Observação:** O documento afirma: "Este é um contrato didático próprio, não o contrato exato bootstrap/mount/unmount de single-spa.".

**Interpretação:** A afirmação distingue o contrato didático do ciclo de vida nomeado do single-spa; nomear essa tecnologia não mostra seu uso.

### 84. conteudo/aula-arquitetura-front-end.md:2107

**Observação:** O documento afirma: "O shell chama a limpeza antes de descartar a montagem.".

**Interpretação:** O texto descreve a responsabilidade do consumidor de executar o cleanup ao descartar a montagem.

### 85. conteudo/aula-arquitetura-front-end.md:2141

**Observação:** O documento afirma: "o shell mantém o mesmo contrato".

**Interpretação:** A afirmação descreve o mesmo contrato do shell para integrar ambos os remotos.

### 86. exemplos/10-micro-frontends/README.md:3

**Observação:** O documento afirma: "Compor aplicações que possuem artefatos de build separados.".

**Interpretação:** O texto associa a composição de aplicações a artefatos de build separados, em acordo com as relações e os builds do bloco 10.

### 87. exemplos/10-micro-frontends/README.md:18

**Observação:** O documento afirma: "Shell → manifesto → módulo ESM remoto → mount(host) → cleanup()".

**Interpretação:** O diagrama descreve a cadeia de descoberta, carga ESM, montagem e limpeza que o shell implementa.

### 88. exemplos/10-micro-frontends/README.md:21

**Observação:** O documento afirma: "Catálogo React e Checkout Angular são compilados separadamente e servidos em 4301 e 4302.".

**Interpretação:** A afirmação descreve dois limites de build e servidores locais separados; as portas não demonstram deploy.

### 89. exemplos/10-micro-frontends/README.md:23

**Observação:** O documento afirma: "O shell em 4300 carrega um remoto por vez, trata falha de carregamento".

**Interpretação:** O texto descreve alternância de remotos e fallback do consumidor; a documentação é apoio semântico à implementação.

### 90. exemplos/10-micro-frontends/README.md:23

**Observação:** O documento afirma: "O Angular remoto usa AOT: ngc compila os componentes e o linker finaliza as bibliotecas antes do bundle ESM.".

**Interpretação:** A afirmação descreve a cadeia de build da unidade Angular remota, sem estabelecer publicação.

### 91. exemplos/10-micro-frontends/README.md:107

**Observação:** O documento afirma: "Recompile apenas catálogo e confirme que o shell continua sem novo build.".

**Interpretação:** O exercício descreve a possibilidade de reconstruir o catálogo sem reconstruir o shell, sustentada pela carga em runtime. A troca de origem continua sujeita à lista fixa do consumidor.

### 92. exemplos/10-micro-frontends/README.md:111

**Observação:** O documento afirma: "Há bundles separados e um caminho de publicação independente".

**Interpretação:** A afirmação é parcialmente corroborada: builds separados e URLs externas ao bundle dão base ao caminho descrito, mas não há publicação provisionada.

### 93. exemplos/10-micro-frontends/README.md:111

**Observação:** O documento afirma: "o laboratório não provisiona um pipeline de deploy".

**Interpretação:** A declaração de ausência de pipeline de deploy confere com o resultado `não observado` das 29 aplicações.

### 94. exemplos/10-micro-frontends/README.md:125

**Observação:** O documento afirma: "ajuste as URLs em `apps/shell/public/remotes.json` e a lista de origens permitidas do shell".

**Interpretação:** A documentação explicita que a operação dos remotos depende tanto das URLs do manifesto quanto da lista de origens embutida no shell.

### 95. exemplos/10-micro-frontends/README.md:125

**Observação:** O documento afirma: "Neste laboratório o shell fornece os estilos".

**Interpretação:** O texto descreve a dependência visual dos remotos em relação ao documento do shell.

### 96. exemplos/10-micro-frontends/README.md:125

**Observação:** O documento afirma: "o contrato é de montagem, sem comunicação de seleção entre catálogo e checkout".

**Interpretação:** A afirmação delimita a integração a montagem e limpeza, sem troca da seleção do catálogo com o checkout.

### 97. exemplos/10-micro-frontends/README.md:125

**Observação:** O documento afirma: "Cada remoto embute seu framework.".

**Interpretação:** O texto descreve bundles que incluem o framework de cada remoto, sem compartilhamento dessas dependências em runtime.

### 98. exemplos/10-micro-frontends/packages/contracts/mount.ts:1

**Observação:** O documento afirma: "Contrato de integração versionado, sem componentes ou estado global compartilhados.".

**Interpretação:** O comentário descreve o contrato tipado e versionado entre shell e remotos, sem componentes ou estado global compartilhado.

### 99. material/gabarito.md:16

**Observação:** O documento afirma: "montar e desmontar destrói a raiz React ou a aplicação Angular; a próxima montagem começa com estado novo".

**Interpretação:** O gabarito descreve o efeito da limpeza na identidade e no estado local das instâncias React e Angular.

### 100. e1c6fb92488afd39e2c1d704ee1243ed52d862b6 2026-10-06 (conteudo/aula-arquitetura-front-end.md; exemplos/10-micro-frontends/apps/shell/)

**Observação:** O único commit adiciona os slides e o shell juntos. Não há versão anterior nem arquivo de rota do bloco 10 no histórico registrado pela 3.4.8.

**Interpretação:** O histórico não esclarece se o comentário sobre rotas era intenção ou resto anterior ao primeiro commit. A dúvida diz respeito ao passado; no snapshot, a composição por botões está clara e a afirmação sobre rotas permanece contradita.

### 101. exemplos/10-micro-frontends/README.md:111; exemplos/10-micro-frontends/README.md:125

**Observação:** Na mesma frase que descreve um caminho de publicação independente, o README declara que o laboratório não provisiona pipeline de deploy. A publicação de cada `dist/` aparece como instrução.

**Interpretação:** O snapshot resolve a dúvida: há uma possibilidade documentada de publicação, sem artefato de deploy abandonado a explicar. Não é necessário inferir um estágio de deploy anterior.

**Nota:** A 3.4.8 registra Commits `—` para este ponto, resolvido pelo snapshot; por isso o cabeçalho aponta aos trechos que o resolvem, sem atribuir um commit de investigação.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (linha manual main.ts:16, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #19, #20 (Onde é servida); 3.4.7 #10, #19, #20, #22 (Evidência) | 2 configuração | configuração | script | arquitetural | forte | configura #8; configura #42; configura #43 |
| 2 | 3.4.4 (src-mount-export, exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3) | 3 código | código-fonte | script | tecnológica | moderada | implementa #42 |
| 3 | 3.4.4 (src-mount-export, exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4) | 3 código | código-fonte | script | tecnológica | moderada | implementa #43 |
| 4 | 3.4.4 (src-custom-element, aula-arquitetura-front-end.html:20284) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (src-iframe, aula-arquitetura-front-end.html:20635) | 3 código | código-fonte | — | contexto | fraca | — |
| 6 | 3.4.4 (src-cross-unit-communication, aula-arquitetura-front-end.html:20284) | 3 código | código-fonte | — | contexto | fraca | — |
| 7 | 3.4.4 (src-cross-unit-communication, aula-arquitetura-front-end.html:20635) | 3 código | código-fonte | — | contexto | fraca | — |
| 8 | 3.4.4 (manual, exemplos/10-micro-frontends/apps/shell/src/main.ts:16) | 3 código | código-fonte | script | arquitetural | forte | implementa #42; implementa #43 |
| 9 | 3.4.4 (manual, exemplos/10-micro-frontends/apps/shell/src/main.ts:23) | 3 código | código-fonte | script | tecnológica | moderada | implementa #42; implementa #43 |
| 10 | 3.4.4 (manual, exemplos/10-micro-frontends/apps/shell/src/main.ts:26) | 3 código | código-fonte | script | tecnológica | moderada | implementa #42; implementa #43 |
| 11 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 12 | 3.4.3 (exemplos/01-componentes/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (exemplos/01-componentes/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (exemplos/02-atomic-design/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (exemplos/02-atomic-design/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (exemplos/03-camadas/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (exemplos/03-camadas/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (exemplos/04-feature-based/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (exemplos/04-feature-based/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.3 (exemplos/05-clean-architecture/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.3 (exemplos/05-clean-architecture/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (exemplos/06-hexagonal/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (exemplos/06-hexagonal/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (exemplos/07-feature-sliced-design/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (exemplos/07-feature-sliced-design/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 26 | 3.4.3 (exemplos/08-mvvm/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (exemplos/08-mvvm/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 28 | 3.4.3 (exemplos/09-flux/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (exemplos/09-flux/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (exemplos/10-micro-frontends/apps/catalogo-react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (exemplos/10-micro-frontends/apps/checkout-angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.3 (exemplos/10-micro-frontends/apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (exemplos/11-renderizacao/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 34 | 3.4.3 (exemplos/11-renderizacao/next) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 35 | 3.4.3 (exemplos/12-ilhas/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 36 | 3.4.3 (exemplos/12-ilhas/astro) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 37 | 3.4.3 (exemplos/13-bff/apps/web-angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 38 | 3.4.3 (exemplos/13-bff/apps/web-bff) | 4 estrutura | diretório | — | contexto | fraca | — |
| 39 | 3.4.3 (exemplos/13-bff/next) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 40 | 3.4.3 (exemplos/14-escolha-e-evolucao/angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 41 | 3.4.3 (exemplos/14-escolha-e-evolucao/react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 42 | 3.4.5 #1 | 5 composição | código-fonte | script | arquitetural | forte | liga #32; liga #30 |
| 43 | 3.4.5 #2 | 5 composição | código-fonte | script | arquitetural | forte | liga #32; liga #31 |
| 44 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #12 |
| 45 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #13 |
| 46 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #14 |
| 47 | 3.4.6 #4 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #15 |
| 48 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #16 |
| 49 | 3.4.6 #6 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #17 |
| 50 | 3.4.6 #7 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #18 |
| 51 | 3.4.6 #8 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #19 |
| 52 | 3.4.6 #9 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #20 |
| 53 | 3.4.6 #10 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #21 |
| 54 | 3.4.6 #11 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #22 |
| 55 | 3.4.6 #12 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #23 |
| 56 | 3.4.6 #13 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #24 |
| 57 | 3.4.6 #14 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #25 |
| 58 | 3.4.6 #15 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #26 |
| 59 | 3.4.6 #16 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #27 |
| 60 | 3.4.6 #17 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #28 |
| 61 | 3.4.6 #18 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #29 |
| 62 | 3.4.6 #19 | 6 build-deploy | manifesto | script | arquitetural | moderada | publica #30 |
| 63 | 3.4.6 #20 | 6 build-deploy | manifesto | script | arquitetural | moderada | publica #31 |
| 64 | 3.4.6 #21 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #32 |
| 65 | 3.4.6 #22 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #33 |
| 66 | 3.4.6 #23 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #34 |
| 67 | 3.4.6 #24 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #35 |
| 68 | 3.4.6 #25 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #36 |
| 69 | 3.4.6 #26 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #37 |
| 70 | 3.4.6 #27 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #39 |
| 71 | 3.4.6 #28 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #40 |
| 72 | 3.4.6 #29 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #41 |
| 73 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #32; corrobora #33; corrobora #34; corrobora #35; corrobora #36; corrobora #37; corrobora #39; corrobora #40; corrobora #41 |
| 74 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #42; corrobora #43 |
| 75 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora #42; corrobora #43 |
| 76 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora exemplos/01-componentes/react/src/main.tsx:3; corrobora exemplos/11-renderizacao/next/src/app/layout.tsx:2; corrobora exemplos/10-micro-frontends/apps/shell/src/main.ts:2; corrobora angular.json:18-20 |
| 77 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #32; corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5 |
| 78 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #8; contradiz exemplos/10-micro-frontends/apps/shell/index.html:1 |
| 79 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5 |
| 80 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #2; corrobora #3; corrobora #42; corrobora #43 |
| 81 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #2; corrobora #3; corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:2-4 |
| 82 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #8; corrobora #9; corrobora #10 |
| 83 | 3.4.7 #11 | 7 documentação | documentação | single-spa | tecnológica | fraca | corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:3-4 |
| 84 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10 |
| 85 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #10; corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:4 |
| 86 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #42; corrobora #43; corrobora #62; corrobora #63; corrobora #64 |
| 87 | 3.4.7 #15 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #10; corrobora #42; corrobora #43 |
| 88 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #62; corrobora #63 |
| 89 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10; corrobora exemplos/10-micro-frontends/apps/shell/src/main.ts:30-33; corrobora tests/e2e/aula.spec.ts:148-149; corrobora tests/e2e/aula.spec.ts:153-156 |
| 90 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #63 |
| 91 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #62; corrobora #64; corrobora #1; corrobora #9 |
| 92 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #62; corrobora em parte #63; corrobora em parte #64; corrobora em parte #1 |
| 93 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #44; corrobora #45; corrobora #46; corrobora #47; corrobora #48; corrobora #49; corrobora #50; corrobora #51; corrobora #52; corrobora #53; corrobora #54; corrobora #55; corrobora #56; corrobora #57; corrobora #58; corrobora #59; corrobora #60; corrobora #61; corrobora #62; corrobora #63; corrobora #64; corrobora #65; corrobora #66; corrobora #67; corrobora #68; corrobora #69; corrobora #70; corrobora #71; corrobora #72 |
| 94 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #8 |
| 95 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | corrobora exemplos/10-micro-frontends/apps/shell/src/main.ts:2; corrobora exemplos/10-micro-frontends/apps/catalogo-react/src/App.tsx:4; corrobora exemplos/10-micro-frontends/apps/checkout-angular/src/app/checkout-app.ts:3-5 |
| 96 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora exemplos/10-micro-frontends/apps/catalogo-react/src/App.tsx:3-4; corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5 |
| 97 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | corrobora scripts/build-remoto.mjs:21-24; corrobora #62; corrobora #63 |
| 98 | 3.4.7 #26 | 7 documentação | comentário | — | arquitetural | fraca | corrobora exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5; corrobora #8 |
| 99 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #2; corrobora #3; corrobora tests/e2e/aula.spec.ts:150-152 |
| 100 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #78 |
| 101 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #92; explica #93 |

## Resumo

Observações: 101. Dimensões (tecnologia: 0, configuração: 1, código: 9, estrutura: 31, composição: 2, build-deploy: 29, documentação: 27, histórico: 2). Força (forte: 4, moderada: 62, fraca: 35, ambígua: 0). Evidência (tecnológica: 5, arquitetural: 90, contexto: 6).
