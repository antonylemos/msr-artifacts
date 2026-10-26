---
schema: 1
id: 1365262179
full_name: Luizarrow3/censo--previdenci-rio-
url: https://github.com/Luizarrow3/censo--previdenci-rio-
commit: 6a5a4dc196abc896d83573141d2013b0ca233e63
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 091 — Luizarrow3/censo--previdenci-rio-

## Contexto

Nexo RPPS é um console administrativo React com API FastAPI. O frontend implementado concentra autenticação, shell e páginas de domínio em uma única aplicação. A documentação distingue expressamente o estado atual de um alvo futuro de micro-frontends (`docs/ARCHITECTURE.md:3–9`). O tipo `production` registra a orientação do produto e sua configuração de implantação (`README.md:29–43`, `render.yaml:1–12`), sem afirmar execução ou prontidão de produção verificadas.

Nome exato do clone conferido: `Luizarrow3__censo--previdenci-rio-`, com hífen final. O SHA corresponde a `data/samples/mfe-sample-001/clones.csv:92`. O candidato aparece em `data/samples/mfe-sample-001/sample.csv:92` com `strategies: terminology` e `eligibility_status: pass`. Isso documenta a estratégia de descoberta/amostragem registrada, não confirmação de arquitetura nem identificação de uma consulta específica. As menções documentais à futura migração são sinais temáticos observados, sem inferir que determinada consulta tenha atingido exatamente essas linhas.

Inventário completo por `git ls-tree -r 6a5a4dc196abc896d83573141d2013b0ca233e63`: **32 blobs**, nenhum `node_modules/` versionado e nenhum gitlink/submódulo. Há um `package.json`, uma entrada HTML e um frontend próprio em `src/`. `backend/` é API, não outra unidade frontend; os diretórios `apps/`, `packages/` e `mobile/` mostrados nos documentos não existem na árvore. `frontend_units: 1` decorre desse inventário e da cadeia de entrada observada.

**Branches e histórico:** `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado; nenhuma outra referência local foi observada. O clone não é raso (`git rev-parse --is-shallow-repository`: false), e `git rev-list --count` a partir do commit avaliado retorna **2 commits**. Não foram acessados rede, submódulos ou outros branches.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia / Build/deploy | `package.json:10–12` declara React/ReactDOM; `package.json:18–24` define um build Vite e comandos separados para a API. `vite.config.js:1–16` configura explicitamente o plugin React, proxy `/api` para FastAPI e ambiente de testes. Não há plugin de federação nessa configuração. | contrária |
| Código-fonte (entrada) | `index.html:30` fornece `#root`, e `index.html:42` carrega `/src/index.jsx`. `src/index.jsx:1–12` importa o App local e o monta com ReactDOM. Existe uma única cadeia de entrada frontend, sem carregamento de módulo externo. | contrária |
| Código-fonte (shell e páginas) | `src/App.jsx:51–80` mantém rota por hash e estado local; `src/App.jsx:112–124` alterna login e o componente Shell. `src/App.jsx:256–270` escolhe componentes de página e painéis definidos no mesmo arquivo, como `DashboardPage`, `CadastrosPage`, `IntegracoesPage`, `CompliancePage` e `NexoOperativePage`. O nome Shell não indica aqui um host de unidades independentes. | contrária |
| Código-fonte (integração com backend) | `src/App.jsx:81–87` verifica sessão por `/api/auth/me`; `src/App.jsx:140–147` carrega contexto, notificações e integrações pela API. `backend/app.py:43–50` cria o FastAPI. São chamadas de dados/serviços, não importação ou montagem de outro frontend. | contexto |
| Build/deploy (entrega da SPA) | `backend/app.py:532–543` serve os assets de um único `dist/` e usa `dist/index.html` como fallback. `render.yaml:1–7` configura um serviço Python. A entrega reforça a organização de uma SPA, sem configuração de builds/deploys de unidades frontend separadas. | contrária |
| Documentação de arquitetura (estado e alvo) | `docs/ARCHITECTURE.md:5` descreve o host React/Vite atual concentrando telas de domínio. `docs/ARCHITECTURE.md:7–9` apresenta Module Federation como estratégia recomendada quando houver times/deploys independentes. O diagrama em `docs/ARCHITECTURE.md:11–27` e a estrutura em `docs/ARCHITECTURE.md:29–44` são explicitamente alvo e proposta, não configuração executável. | contrária |
| Documentação de arquitetura (contratos e migração) | `docs/ARCHITECTURE.md:46–52` propõe eventos `nexo:*`, props e exports `mount(container, contract)`/`unmount(container)`. `docs/ARCHITECTURE.md:54–62` apresenta a sequência de extração e futura publicação independente dos módulos. A busca no código não encontrou a implementação desses contratos ou dos módulos propostos. | contexto |
| Documentação de arquitetura mobile | `docs/MOBILE_ARCHITECTURE.md:13–19` confirma o frontend atual concentrado em `src/App.jsx`. `docs/MOBILE_ARCHITECTURE.md:21–62` descreve uma arquitetura-alvo Expo/React Native, e `docs/MOBILE_ARCHITECTURE.md:163–172` apresenta sua migração. Não há aplicação mobile no snapshot; não se contam suas telas como unidades nem se atribui React Native à UI implementada. | contexto |
| Código-fonte (tempo real e PWA) | `src/App.jsx:1–9` importa o simulador local de canais; `src/realtime.js:32–62` gera eventos e assinaturas em memória. `src/index.jsx:19–21` registra `/sw.js`; `public/sw.js:1–16` configura cache e fallback da mesma aplicação. Canais de dados e service worker não são aplicações frontend independentes. | contexto |
| Documentação / Proveniência | `README.md:47–52` apresenta a extração progressiva para MFE como proposta e aponta aos dois documentos de arquitetura. `README.md:76–82` mantém texto genérico de Codespaces/Vite. A afirmação residual sobre um único commit inicial em `README.md:78` não foi usada como contagem de histórico; a contagem Git real é dois. | contexto |
| Histórico | Os dois commits são `35b5538aef6bf10cdc53a77ca68df02198d3aeba` (2026-09-11, Add files via upload) e `6a5a4dc196abc896d83573141d2013b0ca233e63` (2026-09-11, Update README.md). A comparação de todas as entradas das duas árvores por `git ls-tree -r` mostra somente mudança do blob de `README.md`; todos os fontes e documentos de arquitetura têm os mesmos blobs. Portanto os contratos propostos e a implementação monolítica já coexistiam no primeiro commit; não há extração implementada no segundo. | contexto |
| Estrutura / Configuração (busca negativa de alvos) | Procurados no inventário outros `package.json`, entradas HTML, configurações de federação e fontes sob `apps/`, `packages/` ou `mobile/`, sem resultados além da aplicação raiz. As pastas de módulos listadas em `docs/ARCHITECTURE.md:32–43` são conteúdo de Markdown, não diretórios presentes. | ausente |
| Configuração / Código-fonte (busca negativa de composição) | Em `src/`, `public/`, `index.html`, `vite.config.js`, `package.json`, `render.yaml` e `backend/`, procurados `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` e `srcDoc`, sem resultados. A busca foi feita no commit, sem expandir dependências. | ausente |
| Código-fonte (busca negativa de preparação externa) | No mesmo escopo de código/configuração, procurados os eventos `nexo:*` e os exports/contratos propostos `mount(container` e `unmount(container`, sem implementação encontrada. A busca positiva na documentação localiza os eventos em `docs/ARCHITECTURE.md:48–49` e o contrato de montagem em `docs/ARCHITECTURE.md:51`; isso os mantém no plano de migração. A chamada FastAPI `app.mount` em `backend/app.py:535` apenas serve assets e não é lifecycle frontend. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único alvo frontend: `index.html:42` → `src/index.jsx:1–12` → App local. As telas são componentes do mesmo arquivo (`src/App.jsx:256–270`). Os módulos do diagrama e da estrutura proposta não estão implementados (`docs/ARCHITECTURE.md:29–44`). |
| Q2 | No | Não há conjunto de unidades independentes nem uma unidade preparada para host externo. Há um build Vite (`package.json:18–24`, `vite.config.js:1–16`), enquanto as páginas de domínio são renderizadas internamente por `src/App.jsx:256–270`. |
| Q3 | No | O Shell é componente local da mesma SPA (`src/App.jsx:124`, `src/App.jsx:256–270`), sem host/root que carregue unidades independentes. O backend entrega um único `dist/index.html` (`backend/app.py:538–543`). |
| Q4 | No | Nenhum mecanismo de composição foi encontrado na configuração ou no código. A própria documentação situa federação e extração no futuro (`docs/ARCHITECTURE.md:7–9`, `docs/ARCHITECTURE.md:54–62`), e `vite.config.js:5–16` contém apenas React, proxy de API e testes. |
| Q5 | No | O código demonstra frontend convencional único com API. As evidências de MFE são uma arquitetura-alvo e contratos propostos, não uma instância implementada (`docs/ARCHITECTURE.md:3–9`, `docs/ARCHITECTURE.md:46–62`). Q5 acompanha Q1–Q4, sem override. |

## Motivo

- Proposta `Non-MFE`, com Q1–Q5 No: corresponde a frontend monolítico convencional e repositório que menciona MFE sem implementar a composição.
- Os nomes de módulos, os diagramas Mermaid e as assinaturas de montagem aparecem como proposta documental. Conforme 023/028 e 075/081, conteúdo apresentado ou planejado não vira unidade implementada. Há uma unidade própria real, não zero; o backend e os canais do simulador não são frontends adicionais.
- Não é MFE-unit: não foram encontrados exports ou contratos implementados que preparem essa unidade para host externo. Por isso, Q2–Q4 são No, sem usar Undetermined por causa de uma migração apenas pretendida.
- Não há questão de plugin de plataforma, code sharing por federação, composição em build time ou iframe/link a resolver. React é observado na entrada; Vite tem configuração explícita no snapshot. Expo/React Native e os micro-frontends propostos não são acrescentados aos metadados de implementação.

## Notas para análise

- **RQ1 (amostragem):** `strategies: terminology` e `eligibility_status: pass` estão registrados em `data/samples/mfe-sample-001/sample.csv:92`. Elegibilidade e descoberta não classificam a arquitetura. O candidato tem hits, nas duas rodadas de descoberta, nas consultas `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories` (`micro frontend(s)` em nome, descrição e README), subconsulta `created:2026-09`; os metadados não têm descrição nem tópicos, de modo que o único texto do README compatível é `README.md:51` ("extração progressiva para micro-frontends"), uma migração futura. É um falso positivo terminológico para RQ1. Consulta feita aos bancos de descoberta em modo somente leitura.
- **RQ1 (sinais enganosos):** a documentação já contém nomes `mf-*`, diagrama de host e contratos de eventos/lifecycles antes da extração. A distinção estado atual/alvo em `docs/ARCHITECTURE.md:3–9`, junto da leitura do código consumidor, impede tratar esse material como configuração ativa.
- **Protocolo (famílias):** buscas nas anotações existentes por `Luizarrow3`, `censo`, `Nexo RPPS` e `codespaces-react` não encontraram irmão ou origem comum. O scaffold Codespaces/Vite é explícito no README, sem evidência de filiação a um candidato específico. O precedente `docs/mfe-classification/055-threatcode__dump-data.md` é análogo por recomendar migração para MFE enquanto mantém uma aplicação convencional; não indica família ou template compartilhado.
- **Protocolo (inspeção):** conferidos os 32 blobs, ausência de submódulos e contagem real de dois commits. Nenhuma consulta de rede, execução de build, aplicação, testes ou migração foi feita. A documentação informa um endereço publicado, mas seu estado atual não foi acessado nem transferido para a classificação do snapshot.
