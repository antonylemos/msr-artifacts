---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
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

# 009 — pmathulan/frontend-coding-exercises

## Leitura do repositório

A documentação está em inglês. O README da raiz apresenta o repositório como um conjunto de exercícios de uma avaliação técnica, cada um na sua pasta com README próprio. Só o README de `microfrontend-workspace/` descreve uma arquitetura de micro-frontends. Os outros não entram na tabela:
- **Exercícios isolados:** os READMEs de `angular-frontend-practical/` e `ssr-app/` falam de práticas internas a uma aplicação (NgRx, OnPush, SSR, lazy loading), e o de `rate-limited-scheduler/` trata de uma pasta sem interface.
- **Templates:** os READMEs de `react-performance-practical/` e de `microfrontend-workspace/projects/shared/`.

Também foram lidos os artefatos que as revisões anteriores citam:
- as configurações (`angular.json`, `package.json`, `tsconfig.json`, `webpack.config.js` e `webpack.prod.config.js`);
- os `main.ts` e `bootstrap.ts` e os componentes e rotas do shell e do mfe1;
- o `MessageService`;
- o chart `spa-helm/`.

Nenhum desses artefatos tem comentário que descreva a arquitetura; o único é uma anotação no nome do componente exportado (microfrontend-workspace/projects/shell/src/app/app.routes.ts:12). O chart `spa-helm/` não tem documentação que o ligue a um exercício.

O README do workspace confere com as revisões anteriores: shell como host, mfe1 como remote carregado em runtime por Module Federation e uma biblioteca com um serviço usado pelas duas aplicações para se comunicar. Só destoa a explicação do alias da biblioteca, que cita um arquivo e um caminho de importação que não existem.

Ocorrências `doc-*` que não viraram linha: microfrontend-workspace/README.md:1 (título) e microfrontend-workspace/README.md:21, 25, 28 (instruções de execução). As demais estão nas afirmações 2, 3, 5, 7, 8 e 9.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3-5 | "multiple frontend coding exercises […] Each exercise is organized in its own folder" (exercícios independentes, cada um na sua pasta) | estrutura | corroborada | 3.4.3 (cinco aplicações em pastas separadas, só o workspace com composição) |
| 2 | microfrontend-workspace/README.md:3 | "demonstrates a **Micro-Frontend architecture** using Angular, Module Federation, and a shared library" | composição | corroborada | 3.4.2 (module-federation configurado); 3.4.5 #1 |
| 3 | microfrontend-workspace/README.md:5-6 | "**Shell**: The main host application. **MFE1**: A remote micro-frontend loaded at runtime." | estrutura | corroborada | 3.4.5 #1; microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12; microfrontend-workspace/projects/mfe1/webpack.config.js:5-10 |
| 4 | microfrontend-workspace/README.md:7 | "**Shared Library**: Contains services or utilities used across apps." | estrutura | corroborada | microfrontend-workspace/projects/shell/src/app/app.component.ts:4; microfrontend-workspace/projects/mfe1/src/app/app.component.ts:3 |
| 5 | microfrontend-workspace/README.md:41 | "Navigating to /mfe1 in the shell will dynamically load MFE1 via Module Federation" | composição | corroborada | 3.4.5 #1; microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12 |
| 6 | microfrontend-workspace/README.md:46 | "Routes are defined […] using loadRemoteModule() from @angular-architects/module-federation." | composição | corroborada | 3.4.4; microfrontend-workspace/projects/shell/src/app/app.routes.ts:2, 8-12 |
| 7 | microfrontend-workspace/README.md:50 | "Shell can share services and state with MFE1 using the shared library." | composição | corroborada | 3.4.5 #2 (communication); microfrontend-workspace/projects/shell/webpack.config.js:11-13; microfrontend-workspace/projects/mfe1/webpack.config.js:12-14 |
| 8 | microfrontend-workspace/README.md:53 | "Exposes Angular components or modules via Module Federation." | composição | corroborada | 3.4.5 #1 (Configuração); microfrontend-workspace/projects/mfe1/webpack.config.js:8-10 |
| 9 | microfrontend-workspace/README.md:55 | "Registered as a remote in Shell's webpack.config.js." | composição | corroborada | 3.4.5 #1 (Configuração); microfrontend-workspace/projects/shell/webpack.config.js:15 |
| 10 | microfrontend-workspace/README.md:62 | "Aliased in tsconfig.base.json for clean imports (e.g., @shared/message.service)." | estrutura | contradita | microfrontend-workspace/tsconfig.json:15-18; microfrontend-workspace/projects/shell/src/app/app.component.ts:4 |

## Observações

**1. README.md:3-5.** A revisão estrutural encontrou cinco aplicações em pastas distintas, sem relação entre elas, salvo shell e mfe1 dentro do workspace. Isso confirma o repositório como coleção de exercícios. A classificação considera como MFE só o workspace.

**2. microfrontend-workspace/README.md:3.** O workspace usa Module Federation pelo pacote `@angular-architects/module-federation`, com host e remote configurados. Repetição: o título (microfrontend-workspace/README.md:1).

**3. microfrontend-workspace/README.md:5-6.** O shell carrega o mfe1 por `loadRemoteModule` numa rota com `loadComponent`, ou seja, em runtime e sob demanda. O mfe1 expõe `./Component`. Repetição: microfrontend-workspace/README.md:52.

**4. microfrontend-workspace/README.md:7.** O shell e o mfe1 importam o `MessageService` da biblioteca `shared`, o que a torna compartilhada por duas unidades. Repetição: microfrontend-workspace/README.md:57-60.

**5. microfrontend-workspace/README.md:41.** A rota `mfe1` do shell carrega o componente remoto com `loadComponent` e `loadRemoteModule` apenas quando é acessada. Repetição: microfrontend-workspace/README.md:48 ("lazy-loaded at runtime").

**6. microfrontend-workspace/README.md:46.** As rotas do shell usam `loadRemoteModule` do pacote citado. A constante se chama `routes`, e não `APP_ROUTES` (microfrontend-workspace/projects/shell/src/app/app.routes.ts:4), uma diferença de nome que não muda o mecanismo.

**7. microfrontend-workspace/README.md:50.** A revisão de composição registrou a comunicação do shell para o mfe1 pelo `MessageService`, compartilhado como singleton pelo `shareAll` das duas configurações. Repetição: microfrontend-workspace/README.md:66-69, que descreve o mesmo mecanismo com `Subject` e "Module Federation's shared config". Pela revisão de composição, o envio só acontece no sentido shell → mfe1.

**8. microfrontend-workspace/README.md:53.** O mfe1 expõe um único módulo, `./Component`, que aponta para o seu `AppComponent` (microfrontend-workspace/projects/mfe1/webpack.config.js:8-10). O README fala em "components or modules" de forma genérica.

**9. microfrontend-workspace/README.md:55.** O shell declara `mfe1` em `remotes` (microfrontend-workspace/projects/shell/webpack.config.js:15). A rota, porém, carrega o remote pela URL direta do `remoteEntry.js` (microfrontend-workspace/projects/shell/src/app/app.routes.ts:10). O registro existe, mas não é por ele que o carregamento é resolvido.

**10. microfrontend-workspace/README.md:62.** O workspace não tem `tsconfig.base.json`. O alias está em `tsconfig.json`, com o nome `shared` apontando para `./dist/shared` (microfrontend-workspace/tsconfig.json:15-18), e as aplicações importam de `'shared'`, não de `@shared/message.service`. A biblioteca é compartilhada por alias, como o README diz, mas o arquivo e o caminho descritos não existem.

## Resumo

Afirmações: 10 (corroborada: 9, parcial: 0, contradita: 1, sem corroboração: 0). Temas: (estrutura: 4, composição: 6).
