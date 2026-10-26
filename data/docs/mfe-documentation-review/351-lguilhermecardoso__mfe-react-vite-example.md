---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Leitura do repositório

O README da raiz, em inglês, apresenta um exemplo React/Vite com Module Federation, um container e quatro micro-frontends, instruções locais e uma lista de funcionalidades. O roadmap, em português, mistura tarefas concluídas e intenções futuras. Foram lidos integralmente os sete documentos classificados como `documentation`: README.md, roadmap.md e os READMEs das cinco unidades. Estes últimos são cópias do template React/TypeScript/Vite, sem afirmação sobre a arquitetura deste projeto (mf-dashboard/README.md:1-69; mf-login/README.md:1-69; mf-navbar/README.md:1-69; mf-personagem-detalhe/README.md:1-69; root-app/README.md:1-69). A página de apresentação também contém descrição textual da arquitetura em português (root-app/src/pages/Sobre.tsx:25-40).

As cinco revisões 3.4.2–3.4.6 estão `final`, com o mesmo ID e commit da classificação e da aquisição. Elas confirmam cinco unidades, quatro relações ativas de federação, builds separados e deploy conjunto. Os artefatos sustentam essa leitura: root-app/vite.config.ts:11-35 declara os remotes, root-app/src/App.tsx:5-8 os importa e .github/workflows/deploy.yml:19-27 publica o resultado agregado por build-all.sh:8-23. O snapshot não inclui a saída `dist/` mencionada na classificação; aqui foram usados os arquivos de configuração e fonte disponíveis.

Foram lidos comentários e campos descritivos dos cinco `package.json` (nenhum tem `description`), dos cinco `vite.config.ts`, dos cinco `index.html` e `src/main.tsx`, de root-app/src/declarations.d.ts:1-4, root-app/src/App.tsx:1-101, mf-login/src/App.tsx:1-41, mf-login/src/LoginForm.tsx:1-69, mf-navbar/src/App.tsx:1-24, mf-navbar/src/Navbar.tsx:1-133, mf-dashboard/src/App.tsx:1-8, mf-dashboard/src/Dashboard.tsx:1-154, mf-personagem-detalhe/src/App.tsx:1-12, mf-personagem-detalhe/src/PersonagemDetalhe.tsx:1-154, build-all.sh:1-25 e .github/workflows/deploy.yml:1-27. O nome do workflow e dois comentários do wrapper da navbar entram na tabela. O comentário de mock local (mf-navbar/src/App.tsx:4) reforça a independência já registrada na afirmação 8; a sugestão sobre limpar storage ou chamar o root-app (mf-navbar/src/App.tsx:10) é possibilidade de implementação, não descrição do caminho exposto. Os demais comentários explicam detalhes internos ou alterações locais, como a troca para HashRouter (root-app/src/main.tsx:5-9).

Ocorrências `doc-*` sem linha própria: README.md:1 é título e README.md:10 é o nome ilustrativo da raiz na árvore; README.md:24 é uma menção de tecnologia, já sustentada pela afirmação 2; README.md:50 e 52 são instruções para build/preview em terminais separados, assim como os comandos de README.md:40-59 e 75-77. As portas de README.md:62-67 são orientação operacional, sem configuração explícita de `preview.port` nos remotes (por exemplo mf-login/vite.config.ts:19-34). README.md:90 repete a federação da afirmação 2; README.md:101 repete a unidade da afirmação 6. README.md:113 é recomendação a contribuidores. roadmap.md:1 e 44 são títulos; roadmap.md:16, 24 e 35 repetem as unidades das afirmações 7, 5 e 6. As ocorrências README.md:3, 12-15, 33, 80 e 98 estão nas afirmações 2, 4-8, 9 e 12.

As ocorrências roadmap.md:46, 55, 60, 67, 73-74, 81 e 99 são tarefas não marcadas, e ficam como intenções, sem linha de afirmação sobre o snapshot. O mesmo vale para README.md:102-104 e roadmap.md:36-40, 45-48, 53-54, 75-76 e 82-90. Há tarefas já implementadas ainda pendentes no texto: a navegação dashboard/detalhe passa pelo callback e pelas rotas do host (root-app/src/App.tsx:20-28, 73-84; mf-dashboard/src/Dashboard.tsx:95), e o workflow já publica no Pages (.github/workflows/deploy.yml:19-27). Não se toma o checklist como prova de ausência. A integração com a API no dashboard é detalhe interno em README.md:27, 88 e 103 e roadmap.md:27; a página Sobre descreve a dependência do aplicativo, observada também no remote de detalhe (afirmação 17). O link `ROADMAP.md` de README.md:106 difere da caixa de `roadmap.md`. Aparência, funcionalidades internas de login e conselhos genéricos de manutenção não viraram afirmações arquiteturais.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .github/workflows/deploy.yml:1 | "Deploy Microfrontends to GitHub Pages" | build-deploy | corroborada | 3.4.6 #1-5; .github/workflows/deploy.yml:19-27; build-all.sh:8-23 |
| 2 | README.md:3 | "This project demonstrates a Microfrontends architecture using React, Vite, Module Federation, and TailwindCSS." | estrutura | corroborada | 3.4.3 (cinco unidades); 3.4.5 #1-4; root-app/vite.config.ts:1-4, 28-35; mf-dashboard/vite.config.ts:1-17 |
| 3 | README.md:11 | "root-app/ […] Main application (container/orchestrator)" | estrutura | corroborada | 3.4.5 #1-4; root-app/src/App.tsx:5-8, 58-96 |
| 4 | README.md:12 | "mf-login/ […] Microfrontend: Login and sign-up screen" | estrutura | corroborada | 3.4.3 (mf-login `Yes`); mf-login/vite.config.ts:10-17; mf-login/src/App.tsx:10-33 |
| 5 | README.md:13 | "mf-dashboard/ […] Microfrontend: Main dashboard" | estrutura | corroborada | 3.4.3 (mf-dashboard `Yes`); mf-dashboard/vite.config.ts:10-17; root-app/src/App.tsx:69-77 |
| 6 | README.md:14 | "mf-personagem-detalhe/ […] Microfrontend: Character detail (e.g., Rick and Morty)" | estrutura | corroborada | 3.4.3 (mf-personagem-detalhe `Yes`); mf-personagem-detalhe/vite.config.ts:10-17; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22-53 |
| 7 | README.md:15 | "mf-navbar/ […] Microfrontend: Navbar with navigation and user info" | estrutura | corroborada | 3.4.3 (mf-navbar `Yes`); mf-navbar/vite.config.ts:10-17; mf-navbar/src/Navbar.tsx:58, 111-125 |
| 8 | README.md:33 | "Each microfrontend is an independent project (with its own package.json)." | independência | corroborada | 3.4.3 (manifesto, entrada e build de cada unidade); mf-dashboard/src/App.tsx:3-7; mf-navbar/src/App.tsx:4-20; mf-personagem-detalhe/src/App.tsx:1-7; mf-login/src/App.tsx:6-14 |
| 9 | README.md:80 | "The root-app will run on http://localhost:5000 […] consuming the microfrontends remotely from their preview servers." | composição | contradita | root-app/vite.config.ts:7-24, 41-42; root-app/.env:1; root-app/.env.local.bkp:1 |
| 10 | README.md:87 | "Navbar (mf-navbar): […] federated integration" | composição | corroborada | 3.4.5 #1; mf-navbar/vite.config.ts:10-17; root-app/src/App.tsx:5, 58-60 |
| 11 | README.md:92 | "Basic global state (user/token via localStorage)" | composição | corroborada | root-app/src/App.tsx:10-12, 36-45, 59-75; mf-login/src/LoginForm.tsx:20-23 |
| 12 | README.md:98 | "[x] Integrated login via MFE" | composição | corroborada | 3.4.5 #2; root-app/src/App.tsx:6, 36-40, 64-67; mf-login/src/App.tsx:13-14 |
| 13 | mf-navbar/src/App.tsx:15 | "Em produção, user e onLogout viriam via props do root-app ou de um context global" | composição | corroborada | root-app/src/App.tsx:42-45, 59; mf-navbar/vite.config.ts:13-14; mf-navbar/src/Navbar.tsx:71 |
| 14 | mf-navbar/src/App.tsx:21 | "esse microfrontend só expõe a Navbar" | composição | corroborada | mf-navbar/vite.config.ts:13-15; root-app/src/App.tsx:5 |
| 15 | roadmap.md:29 | "[x] Permitir clicar em um card para visualizar detalhes no mf-personagem-detalhe" | composição | corroborada | 3.4.5 #3-4; mf-dashboard/src/Dashboard.tsx:95; root-app/src/App.tsx:20-28, 73-84 |
| 16 | root-app/src/pages/Sobre.tsx:33 | "Tecnologias: React 18" | estrutura | contradita | root-app/package.json:14-15; mf-dashboard/package.json:15-16; mf-login/package.json:14-15; mf-navbar/package.json:14-15; mf-personagem-detalhe/package.json:15-16 |
| 17 | root-app/src/pages/Sobre.tsx:33 | "integração com a API pública Rick and Morty" | outro | corroborada | mf-dashboard/src/Dashboard.tsx:17, 47-59; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22, 35-53 |

## Observações

**1. .github/workflows/deploy.yml:1.** O nome descreve o destino configurado: o job executa build-all.sh e publica `./dist` com `peaceiris/actions-gh-pages@v4` (.github/workflows/deploy.yml:19-27). O script constrói as cinco unidades e copia o host para a raiz da saída (build-all.sh:8-23). Corrobora configuração de deploy conjunto no Pages, sem afirmar que uma execução remota foi validada. As tarefas ainda abertas de README.md:104 e roadmap.md:73-89 não desfazem esse artefato.

**2. README.md:3.** A combinação de tecnologias tem implementação: plugins React, TailwindCSS e federation no host e no dashboard (root-app/vite.config.ts:1-4, 28-35; mf-dashboard/vite.config.ts:1-17), além das quatro relações da 3.4.5. O título (README.md:1), a lista de tecnologias (README.md:22-25), a integração genérica (README.md:90) e a apresentação do aplicativo (root-app/src/pages/Sobre.tsx:26, 33) repetem essa descrição. A segunda frase de README.md:3 apresenta modularidade, escalabilidade e manutenção como objetivos; a independência concreta aparece na afirmação 8.

**3. README.md:11.** A árvore comentada atribui ao root-app o papel de container/orquestrador. Os imports dos quatro remotes e a renderização da navbar e das telas nas rotas confirmam o papel (root-app/src/App.tsx:5-8, 58-96).

**4. README.md:12.** A unidade mf-login expõe seu App pela federação e alterna entre LoginForm e SignupForm (mf-login/vite.config.ts:13-14; mf-login/src/App.tsx:24-33). README.md:86 detalha o mesmo papel funcional. A integração desse login ao host é a propriedade distinta da afirmação 12.

**5. README.md:13.** O componente Dashboard é exposto pelo remote e montado na rota principal após login (mf-dashboard/vite.config.ts:13-14; root-app/src/App.tsx:69-77). README.md:88, 100 e roadmap.md:24 repetem a existência e o papel da unidade; a qualificação de integração futura com a API está desatualizada diante do fetch já presente (mf-dashboard/src/Dashboard.tsx:17, 47-59).

**6. README.md:14.** A unidade expõe PersonagemDetalhe e busca um personagem pelo ID na API indicada (mf-personagem-detalhe/vite.config.ts:13-14; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22, 35-53). README.md:89, 101 e roadmap.md:35 reiteram sua existência. A navegação a partir do dashboard é examinada separadamente na afirmação 15.

**7. README.md:15.** O módulo exposto é Navbar (mf-navbar/vite.config.ts:13-14); ele mostra iniciais do usuário e links para dashboard e Sobre (mf-navbar/src/Navbar.tsx:58, 111-116). roadmap.md:16-19 repete sua criação e os papéis de informação, logout e navegação. O mecanismo federado dessa unidade aparece na afirmação 10.

**8. README.md:33.** A independência aqui é de projeto e desenvolvimento, sustentada pelos manifestos, entradas e builds próprios da 3.4.3. Dashboard e navbar têm wrappers com dados mockados, detalhe tem ID local e login aceita callback opcional (mf-dashboard/src/App.tsx:3-7; mf-navbar/src/App.tsx:4-20; mf-personagem-detalhe/src/App.tsx:7; mf-login/src/App.tsx:6-14). A apresentação repete a autonomia das partes (root-app/src/pages/Sobre.tsx:30). Isso não afirma deploy separado: a 3.4.6 registra publicação conjunta pelo único workflow.

**9. README.md:80.** O host configura a porta 5000 e possui URLs de preview sob `IS_LOCAL=true` (root-app/vite.config.ts:9-24, 41-42). Contudo, o arquivo ativo contém `IS_LOCAL=false` (root-app/.env:1), selecionando os remotes do Pages; o valor verdadeiro está num arquivo `.bkp` (root-app/.env.local.bkp:1). A afirmação sobre o consumo local, na sequência dos comandos documentados, é contradita pela seleção vigente. Seria necessário ativar explicitamente o ambiente local; os comandos de README.md:75-77 não fazem essa troca.

**10. README.md:87.** O host importa `mf_navbar/Navbar` e a monta com props dentro de Suspense (root-app/src/App.tsx:5, 58-60), correspondendo ao módulo exposto pelo remote (mf-navbar/vite.config.ts:13-14). README.md:99 repete a navbar federada exibindo o usuário autenticado.

**11. README.md:92.** Há uso efetivo do armazenamento em mais de uma unidade: mf-login grava o token e devolve o payload, enquanto o host grava e remove token e usuário (mf-login/src/LoginForm.tsx:20-23; root-app/src/App.tsx:36-45). O host lê o usuário no início e passa dados aos remotes por props (root-app/src/App.tsx:10-12, 59, 73-75). Isso confirma o estado básico descrito, sem pressupor um context compartilhado nem token validado em todos os remotes. O listener de storage do host está em root-app/src/App.tsx:48-54; a 3.4.4 o distingue da composição entre unidades.

**12. README.md:98.** O remote login é carregado e recebe `onAuthSuccess={handleLogin}`; o callback atualiza armazenamento e estado do host (root-app/src/App.tsx:6, 36-40, 64-67). O App exposto encaminha o payload ao callback (mf-login/src/App.tsx:13-14). roadmap.md:8 repete a tela de login integrada com root-app.

**13. mf-navbar/src/App.tsx:15.** O comentário oferece props do root-app ou context global como alternativas. O caminho implementado é o das props: o host passa `user` e `handleLogout`, que limpa armazenamento e estado (root-app/src/App.tsx:42-45, 59). O arquivo comentado é o wrapper local; a federação expõe diretamente Navbar.tsx (mf-navbar/vite.config.ts:13-14), cujo botão chama `onLogout` (mf-navbar/src/Navbar.tsx:71). Não se infere a existência da alternativa de context.

**14. mf-navbar/src/App.tsx:21.** A afirmação sobre a superfície exposta é literal: o objeto `exposes` tem somente `./Navbar`, apontando para src/Navbar.tsx (mf-navbar/vite.config.ts:13-15). O consumidor usa exatamente esse módulo (root-app/src/App.tsx:5).

**15. roadmap.md:29.** O clique chama o callback com o ID (mf-dashboard/src/Dashboard.tsx:95). O host navega para `/personagem/:id`, lê o parâmetro e o passa ao remote de detalhe (root-app/src/App.tsx:20-28, 73-84). A integração é mediada pelo host; não exige import direto de um remote pelo outro. As tarefas não marcadas em README.md:102 e roadmap.md:40, 48 repetem a integração como trabalho futuro, embora o caminho já exista no snapshot.

**16. root-app/src/pages/Sobre.tsx:33.** A versão nomeada na apresentação é React 18; os cinco manifestos declaram React e React DOM `^19.1.0` (root-app/package.json:14-15; mf-dashboard/package.json:15-16; mf-login/package.json:14-15; mf-navbar/package.json:14-15; mf-personagem-detalhe/package.json:15-16). É uma afirmação específica de versão contradita, distinta da descrição genérica de React na afirmação 2. As outras tecnologias listadas na página repetem a combinação já examinada.

**17. root-app/src/pages/Sobre.tsx:33.** A apresentação atribui ao aplicativo integração com a API pública, repetida na atribuição de dados em root-app/src/pages/Sobre.tsx:40. Dois remotes usam o mesmo backend externo: dashboard lista personagens e detalhe consulta um ID (mf-dashboard/src/Dashboard.tsx:17, 47-59; mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22, 35-53). Os fetches corroboram a dependência do conjunto; não foi necessário consultar a API nem validar sua disponibilidade.

## Resumo

Afirmações: 17 (corroborada: 15, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 7, composição: 7, build-deploy: 1, independência: 1, outro: 1).
