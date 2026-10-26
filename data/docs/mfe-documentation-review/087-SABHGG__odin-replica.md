---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Leitura do repositório

O único `.md` é o `README.md`, o texto padrão do Create React App, em inglês (README.md:1-3). Ele só descreve os scripts `start`, `test`, `build` e `eject` e remete à documentação do CRA (README.md:5-70). Frases como "Your app is ready to be deployed!" (README.md:28) são do template e não falam deste projeto, por isso nenhuma virou linha. O `package.json` não tem `description` (package.json:1-45). Os comentários de `public/index.html` (public/index.html:13-16, 18-26, 32-41), sua `description` "Web site created using create-react-app" (public/index.html:9-10), `public/manifest.json` (public/manifest.json:2-3) e `src/setupTests.js:1-4` também são texto de template.

A documentação do projeto está toda nos comentários e nas mensagens de console de `src/index.js`, em espanhol. Eles descrevem um root single-spa que registra uma aplicação React local, "Odin", e uma aplicação Angular remota, "Leadocs", carregada por script e ativada por evento. Isso coincide com o que as revisões anteriores encontraram: um só projeto CRA no snapshot (3.4.3), que registra a unidade local e o remoto externo `leadocs-angular` (3.4.4 src/index.js:56 e src/index.js:63; 3.4.5 #1). As divergências são de detalhe. O nome da biblioteca sugerido numa mensagem de console não é o global que o código espera (linha 8). Um comentário de `src/root.app.js` fala de import dinâmico, mas o import é estático (linha 9). E nada no snapshot mostra que o remoto é Angular (linha 5).

Comentários lidos sem afirmação arquitetural: "Asegúrate que src/root.app.js exista y exporte 'reactLifecycles'" (src/index.js:4) é um lembrete sobre o arquivo da própria unidade, que exporta o objeto `reactLifecycles` como `default` (src/root.app.js:6, 21). "--- 1. Configuración ---" (src/index.js:6) e "--- 5. Iniciar ---" (src/index.js:102) são títulos de seção. "Si ya está cargado, lo devolvemos" (src/index.js:68) é um passo interno do loader (src/index.js:69). Os comentários e mensagens que repetem uma linha da tabela estão no parágrafo dela. O rótulo de menu "Leapdocs (Microfrontend)" (src/App.js:11) é texto da interface, não comentário, e não virou linha. `src/App.js` e `src/root.app.js` só têm o comentário da linha 9 (src/root.app.js:20).

Nenhuma ocorrência `doc-*` na mineração.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | src/index.js:7 | "Puerto donde corre tu 'ng serve'" (porta onde roda o seu `ng serve`: o remoto é servido pelo servidor de desenvolvimento do Angular) | build-deploy | sem corroboração | — |
| 2 | src/index.js:44 | "Activación por evento (sin rutas)" (ativação por evento, sem rotas) | composição | corroborada | 3.4.4 (src/index.js:47); 3.4.5 #1; src/index.js:47-51, 59, 96; src/App.js:16-23 |
| 3 | src/index.js:55 | "Registrar Odin (React Local)" (registrar o Odin, React local) | estrutura | corroborada | 3.4.3 (`.` Yes); 3.4.4 (src/index.js:56); src/index.js:56-60; src/root.app.js:3-14 |
| 4 | src/index.js:58 | "Carga directa del componente exportado" (carga direta do componente exportado) | composição | corroborada | 3.4.4 (src/index.js:56); src/index.js:4, 58 |
| 5 | src/index.js:62 | "Registrar Leadocs (Angular Remoto)" (registrar o Leadocs, Angular remoto) | estrutura | parcial | 3.4.4 (src/index.js:63); 3.4.5 #1; src/index.js:7-9, 63-64 |
| 6 | src/index.js:66 | "Promesa que carga el script y devuelve el módulo" (promessa que carrega o script e devolve o módulo) | composição | corroborada | 3.4.4 (src/index.js:72); 3.4.5 #1; src/index.js:67-94 |
| 7 | src/index.js:77 | "Al terminar de cargar, Angular debe haber expuesto 'window.leapdocs'" (ao terminar de carregar, o Angular deve ter exposto `window.leapdocs`) | composição | parcial | 3.4.4 (src/index.js:72); src/index.js:69, 78-84 |
| 8 | src/index.js:83 | "Asegúrate de que en el 'angular.json' de Leadocs, la propiedad 'libraryName' sea 'leadocs'" (garanta que, no `angular.json` do Leadocs, a propriedade `libraryName` seja `leadocs`) | build-deploy | contradita | src/index.js:69, 78, 82 |
| 9 | src/root.app.js:20 | "Exportamos todo el objeto para el import dinámico" (exportamos o objeto inteiro para o import dinâmico) | composição | contradita | 3.4.4 (src/index.js:56); src/index.js:4, 58 |

## Observações

**1. src/index.js:7.** O comentário põe o remoto numa aplicação Angular à parte, servida pelo `ng serve`. A configuração ao lado só dá a origem padrão `http://localhost:4200`, que pode ser trocada por `REACT_APP_LEAPDOCS_ORIGIN` e `REACT_APP_LEAPDOCS_BUNDLE_URL` (src/index.js:8-9). O remoto não está no snapshot, e nada nele roda `ng serve` nem outro servidor do Angular (3.4.6, Leitura). A mensagem de erro do loader diz o mesmo com outro comando, "¿Está corriendo 'npm start' en el puerto 4200?" (está rodando `npm start` na porta 4200?) (src/index.js:89). Ela está neste parágrafo porque só muda o comando, não o que se afirma: o remoto roda num servidor próprio, na porta 4200.

**2. src/index.js:44.** O comentário diz que o remoto é ativado por evento, não por rota. O código confirma. A unidade local publica `toggle-leapdocs` quando a seção muda (src/App.js:16-23). O root escuta o evento, grava `isLeadocsActive` e chama `triggerAppChange()` (src/index.js:47-51). A função de atividade do remoto é `() => isLeadocsActive` (src/index.js:96), e a da unidade local é `() => true` (src/index.js:59). Nenhuma das duas lê a URL. O patch de `history.pushState`/`replaceState` que tira o prefixo `/leapdocs` (src/index.js:10-42) mexe na URL, não na ativação. A revisão de código-fonte registra o evento como interno à unidade (3.4.4 src/index.js:47), e a de composição o descreve como o gatilho da ativação (3.4.5 #1).

**3. src/index.js:55.** O "Odin" é a aplicação React do próprio snapshot: `registerApplication('odin-react', ...)` (src/index.js:56-60) recebe os lifecycles que `singleSpaReact` cria para o `App` (src/root.app.js:3-14). A revisão estrutural tem uma só unidade, `.` (3.4.3), e a de código-fonte registra esse registro como interno a ela (3.4.4 src/index.js:56). "Local" confere: o Odin está no mesmo bundle que o root.

**4. src/index.js:58.** "Carga direta" confere. A função de carga devolve o objeto `RootApp` (src/index.js:58), importado estaticamente no topo da entrada (src/index.js:4). Não há busca de rede nem chunk separado. A revisão de código-fonte anota o mesmo (3.4.4 src/index.js:56).

**5. src/index.js:62.** A parte "remoto" confere. O registro `leadocs-angular` (src/index.js:63-64) carrega um bundle por URL de fora do snapshot (src/index.js:7-9), e a revisão de composição registra a relação com destino fora do snapshot (3.4.5 #1). A parte "Angular" não tem artefato. Não há código, `angular.json` nem dependência Angular no snapshot. Os únicos indícios são o nome do registro, os comentários e mensagens e o `import 'zone.js'` (src/index.js:2), que a classificação considera preparação do host, sem implementação Angular observada. Por isso `parcial`. Repetem o "Angular" o comentário "Creamos el script apuntando al main.js de Angular" (src/index.js:71) e as mensagens de src/index.js:79, 84, 89-90.

**6. src/index.js:66.** O loader é de fato uma `Promise` (src/index.js:67). Ela cria um `<script>` com `src = LEAPDOCS_BUNDLE_URL` (src/index.js:72-73), o injeta em `document.head` (src/index.js:93) e resolve com `globalThis.leapdocs` (src/index.js:76-80). A revisão de código-fonte tem essa linha como `script-loading` (3.4.4 src/index.js:72). O "módulo" devolvido é o objeto global, não um módulo ES. Repete o mecanismo o comentário de src/index.js:71, "Creamos el script apuntando al main.js de Angular" (criamos o script apontando para o `main.js` do Angular). O `main.js` é o padrão da URL (src/index.js:9).

**7. src/index.js:77.** É o contrato entre host e remoto: o bundle deve publicar o global `leapdocs`. O lado do host confere. O loader reaproveita `globalThis.leapdocs` (src/index.js:69), resolve com ele após o `onload` e rejeita quando ele não existe (src/index.js:78-84). O lado do remoto, que é quem publicaria o global, não tem artefato, por isso `parcial`. A mensagem "El script cargó, pero 'window.leapdocs' no existe." (src/index.js:82) repete o contrato.

**8. src/index.js:83.** É uma mensagem de console, não um comentário. Ela diz como o remoto deve ser construído: com `libraryName` `leadocs` no `angular.json`. O código espera `leapdocs` (src/index.js:69, 78), e a mensagem anterior também nomeia `window.leapdocs` (src/index.js:82). Um bundle publicado como `leadocs`, como a mensagem pede, não seria encontrado pelo loader, que rejeitaria a carga (src/index.js:84). O nome do registro, `leadocs-angular` (src/index.js:64), segue a grafia da mensagem, mas é só o nome no single-spa. O `angular.json` não está no snapshot. A contradição é entre a mensagem e o global que o código lê.

**9. src/root.app.js:20.** O comentário diz que o objeto de lifecycles é exportado "para o import dinâmico". O único consumidor o importa estaticamente (`import RootApp from './root.app'`, src/index.js:4) e o devolve direto na função de carga (src/index.js:58). Não há `import()` desse arquivo no snapshot. A revisão de código-fonte registra o import estático e a unidade local no mesmo bundle (3.4.4, Notas). O export `default` existe (src/root.app.js:21) e é usado, mas não do jeito que o comentário diz, por isso `contradita`.

## Resumo

Afirmações: 9 (corroborada: 4, parcial: 2, contradita: 2, sem corroboração: 1). Temas: (estrutura: 2, composição: 5, build-deploy: 2).
