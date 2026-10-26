---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
url: https://github.com/SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 087 — SABHGG/odin-replica

## Contexto

Host de demonstração com uma unidade React local, `odin-react`, e uma unidade externa registrada como `leadocs-angular`. O remoto é obtido por uma URL de bundle configurável e deve publicar o objeto global `leapdocs` para o single-spa (`src/index.js:55–103`). A interface local contém páginas de demonstração e uma seção que ativa o remoto (`src/App.js:7–23`, `src/App.js:41–58`).

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:88`. O inventário completo por `git ls-tree -r --name-only 06ce2bd578663f88243854f6eef292686660dfce` contém 19 arquivos, nenhum sob `node_modules/`. Há somente um manifesto de projeto (`package.json`) e uma implementação frontend local em `src/`. A segunda unidade conta por referência explícita na configuração de composição, conforme Q1 e o template: `registerApplication('leadocs-angular', ...)` em `src/index.js:63–100`. Portanto `frontend_units: 2` significa uma unidade própria no snapshot mais um remoto explicitamente referenciado, sem contar bibliotecas de terceiros. `unit_organization: multi-repo` registra essa fronteira local/externa; a URL do repositório do remoto não é observável. O root single-spa e a unidade `odin-react` formam um único bundle CRA (`src/index.js:4` importa `./root.app` estaticamente), então a unidade local é, na prática, o host com lifecycles próprios; a contagem de 2 unidades (host local e remoto externo) segue 008. O histórico mostra o single-spa acrescentado intencionalmente sobre um scaffold CRA: commit 80616f7 (2026-03-11, scaffold) e 06ce2bd (2026-03-16, "feat: update dependencies and implement single-spa for microfrontend architecture"); histórico lido somente leitura. `zone.js` (`src/index.js:2`) corrobora a preparação do host para um remoto Angular, sem implementação Angular observada.

As referências locais `master`, `origin/master` e `origin/HEAD` apontam ao mesmo commit avaliado. Foram registradas somente como contexto; nenhum outro snapshot ou conteúdo remoto foi usado na classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:9–16` declara React, ReactDOM, single-spa, single-spa-react e zone.js. Essas dependências não confirmam a arquitetura isoladamente; seu consumo está nos registros, lifecycles e loader citados abaixo. | fraca |
| Build/deploy | `package.json:18–22` define start e build próprios com `react-scripts`. O lockfile identifica Webpack no conjunto de dependências desse toolchain (`package-lock.json:13869–13875`) e registra sua versão resolvida em `package-lock.json:16532–16534`. O bundle externo tem URL separada, definida em `src/index.js:7–9`; seus fontes e build não estão no snapshot. | moderada |
| Código-fonte (unidade local) | `src/root.app.js:6–14` adapta o componente App com `singleSpaReact` e usa `#root` como contêiner. `src/root.app.js:16–21` exporta `bootstrap`, `mount`, `unmount` e o objeto de lifecycles. `public/index.html:31` fornece o nó de montagem local. | forte |
| Configuração / Código-fonte (root single-spa) | A própria entrada `src/index.js:2–4` importa single-spa e o objeto local de lifecycles. `src/index.js:55–60` registra `odin-react` com carregamento desse objeto e ativação permanente; `src/index.js:63–100` registra a segunda unidade; `src/index.js:102–103` inicia o orquestrador. Não é somente um arquivo de preparação exportado e sem consumidor. | forte |
| Configuração (unidade externa) | `src/index.js:7–9` define origem e bundle por `REACT_APP_LEAPDOCS_ORIGIN` e `REACT_APP_LEAPDOCS_BUNDLE_URL`, com padrão `http://localhost:4200/main.js`. Esse endereço é usado no loader, não apenas citado no README. O nome de registro e os comentários identificam o remoto como Angular (`src/index.js:62–64`), mas não há código Angular próprio que permita confirmar a implementação ou versão desse framework. | moderada |
| Código-fonte (carga e contrato) | `src/index.js:65–94` implementa uma Promise de carregamento: reutiliza `globalThis.leapdocs` se presente; caso contrário, cria script com a URL externa, injeta-o em `document.head` e resolve com o objeto global esperado. Há rejeição explícita se o script não carregar ou não expuser esse objeto. O retorno do loader é entregue ao registro single-spa de `src/index.js:63–100`. | forte |
| Composição / Código-fonte (ativação e destino) | `src/App.js:16–23` emite `toggle-leapdocs` quando a seção muda, acionado pelos botões em `src/App.js:29–37`. `src/index.js:44–51` escuta esse evento, atualiza o estado de ativação e chama `triggerAppChange`. `src/index.js:96–99` usa esse estado e passa `domElementGetter` apontando para `microfrontend-container`; `src/App.js:56–58` cria esse mesmo nó dentro da área principal da UI. | forte |
| Código-fonte (coordenação de navegação) | `src/index.js:10–40` normaliza o prefixo `/leapdocs` e adapta `pushState`/`replaceState`; `src/index.js:53` trata `popstate`. É código de integração do host, embora o uso e comportamento do roteador remoto não sejam observáveis neste snapshot. A inclusão não depende de link ou iframe, e sim do registro e loader single-spa. | moderada |
| Documentação | `README.md:1–3` identifica o scaffold Create React App; `README.md:9–30` documenta os scripts padrão. O inventário dos 19 caminhos foi procurado por ADRs, diretórios `docs/`, documentos e diagramas de arquitetura, sem artefatos específicos encontrados. A arquitetura observada está no código de entrada e de lifecycles, não no texto genérico do README. | contexto |
| Estrutura / Código-fonte (busca negativa do remoto local) | Procurados outros `package.json`, `angular.json`, fontes `.ts`/`.tsx`, diretórios de segunda aplicação e arquivos de build/deploy do remoto em toda a árvore: nenhum foi encontrado. A auditoria dos imports de `src/` encontrou fontes locais da própria unidade e pacotes npm; não encontrou import direto de fontes de Leapdocs. O remoto é consumido pelo bundle externo de `src/index.js:72–93`. | ausente |
| Configuração / Código-fonte (busca negativa de outros mecanismos) | Em `src/`, `public/`, `package.json` e `README.md`, procurados `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` e `srcDoc`, sem resultados. A abordagem observada é single-spa com loader de script; não se atribui Module Federation pela presença transitiva de Webpack. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades explicitamente registradas na configuração de composição: React local em `src/index.js:55–60` e remoto em `src/index.js:63–100`. Q1 admite unidades externas referenciadas pela configuração; não são apenas nomes ou dependências. |
| Q2 | Yes | A unidade local possui entrada e build próprios (`src/index.js:2–4`, `package.json:18–22`); o remoto é um artefato carregado por URL separada (`src/index.js:7–9`, `src/index.js:72–93`), sem import de fontes locais do outro alvo. Aplica-se o critério operacional de unidade externa separadamente servida; seus comandos de build e seu repositório não são observáveis. |
| Q3 | Yes | O App local mantém o layout e cria o espaço para o remoto (`src/App.js:25–58`); seu evento de ativação chega ao orquestrador (`src/App.js:16–23`, `src/index.js:44–51`). O registro remoto recebe o getter do mesmo contêiner (`src/index.js:96–99`). Há integração de unidades na mesma aplicação, não somente navegação entre sites. |
| Q4 | Yes | O código de entrada executa `registerApplication` para os dois alvos e `start()` (`src/index.js:55–103`), com lifecycles locais reais (`src/root.app.js:6–21`) e loader remoto que retorna o objeto global ao single-spa (`src/index.js:65–94`). O acionamento está ligado aos botões da UI e ao contêiner. A composição está implementada no lado host; não se afirma que o bundle externo foi acessado ou executado nesta inspeção. |
| Q5 | Yes | Q1–Q4 convergem: registro, independência por artefato remoto, ativação, loader e contêiner são ligados por código consumidor (`src/index.js:44–103`, `src/App.js:16–23`, `src/App.js:56–58`). Não há override de Q5. |

## Motivo

- Q1–Q5 são Yes: proposta `MFE-implemented`, no caso de inclusão de repositório que contém o host e referencia unidades externas. A ausência dos fontes do remoto não equivale à ausência de configuração de composição do host.
- O exemplo vai além do scaffold CRA e das dependências: o single-spa é chamado pela entrada, o componente local é adaptado com lifecycles e o remoto é carregado por script sob controle do orquestrador. Não se aplica a exclusão de conteúdo didático ou de alvos sem relação de composição dos precedentes 023/028.
- Não é MFE-unit: o host/root de composição está presente e registra as duas unidades. Tampouco é plugin cujo único host seja plataforma de terceiros; o host é a aplicação React deste candidato.
- `approaches: [single-spa]` registra o mecanismo que gere as aplicações; a injeção de script é sua estratégia de carregamento neste caso. Não depende das decisões sobre iframe/link ou composição em build time.
- `ui_technologies: [react]` registra o que é observável na implementação local. `build_tools: []`: o bundler é o Webpack encapsulado pelo `react-scripts` (CRA não ejetado, sem `webpack.config.js`, craco nem config-overrides na árvore); a convenção de 013, 036 e 081 só registra bundler com configuração explícita do autor, ao contrário de 019 (CRA ejetado). O lockfile descreve dependência transitiva, não configuração. O remoto é chamado Angular no código, mas não se acrescenta Angular como tecnologia de implementação confirmada sem seus artefatos.

## Notas para análise

- **RQ1:** o README genérico não descreve MFE; a evidência decisiva está em `src/index.js`, `src/root.app.js` e no evento/contêiner de `src/App.js`. O lockfile contém registros `node_modules/...`, mas nenhum diretório de dependências foi versionado e nenhum pacote é contado como unidade.
- **RQ3:** o contrato esperado do remoto é um objeto global `leapdocs` entregue ao single-spa, junto do getter de contêiner. O código remoto que publica esse objeto e utiliza as props não está disponível. Não foram executados build, testes ou requisições ao endereço externo; a avaliação é do mecanismo consumidor implementado no host.
- **Protocolo:** buscas nas anotações por `SABHGG`, `odin-replica`, `Leapdocs` e `Leadocs` não encontraram família já registrada. Há afinidade de mecanismo com a adaptação de lifecycles de `docs/mfe-classification/058-ducknem2086__vue-lifecycle-demo.md`, mas ali o host está ausente; aqui o root registra os alvos e inicia a composição. O loader de script lembra `docs/mfe-classification/002-EnjoyFX__fe_containerize.md`, que usa contrato próprio de montagem em vez de single-spa. São comparações arquiteturais, sem evidência de origem comum de template.
- **Protocolo (contagem):** dois alvos no sentido de Q1: um local e um explicitamente referenciado. Essa contagem segue o template e o precedente de host com remotes externos `docs/mfe-classification/008-mrmechazilla__host-app.md`; não indica duas implementações próprias presentes na árvore nem aquisição do remoto.
