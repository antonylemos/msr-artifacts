---
schema: 1
id: 1096746620
full_name: andreserazoo/MICROPROYECTO-FrontEnd
url: https://github.com/andreserazoo/MICROPROYECTO-FrontEnd
commit: 91f600e6169572f4d4ebf302b78b6bbfa56d6933
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 120 — andreserazoo/MICROPROYECTO-FrontEnd

## Contexto

SPA demonstrativa de gestão de usuários com React, roteamento local, autenticação básica e dados simulados (`README.md:5–20`). Há uma aplicação materializada em `sistema-usuarios/`, com uma entrada e um build. O nome do repositório não foi usado como evidência de arquitetura.

Identidade e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:121`, com status `cloned`; HEAD coincide com o commit do front matter. Toda inspeção Git do clone usou `GIT_NO_LAZY_FETCH=1`. Não se instalaram dependências, executaram builds, consultaram servidores externos ou alteraram arquivos do clone.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:121` registra rank 120, estratégia `terminology` e elegibilidade `pass`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:21090`, com elegibilidade `unknown`, e em `data/discovery/mfe-round-002/candidates.csv:21096`, com `pass`. Ambos registram descrição nula, tópicos vazios, linguagem JavaScript, `fork: false`, criação em 2025-11-14T22:15:39Z e push em 2025-11-14T22:23:35Z.

Consultas `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, pelo ID 1096746620, mostram um hit em cada rodada:

- Consulta: `terminology-micro-frontend-repositories`, estratégia `terminology`, texto **`"micro frontend" in:name,description,readme`**; a grafia contém espaço entre as palavras e aspas de frase.
- Subconsulta: `terminology-micro-frontend-repositories#created:2025-11`.
- Consulta efetiva: `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.
- Coletas: 2026-10-07T22:27:42.863Z na rodada 001 e 2026-10-08T15:56:36.768Z na rodada 002; `path` vazio, sem indicação do campo ou linha casada.

**Localização textual não determinada:** a leitura integral e a busca case-insensitive por `micro` e `frontend` em ambos os READMEs do SHA não encontraram ocorrências. Portanto não existe linha exata do README atual a citar como correspondência dessa consulta. `README.md:5–7` descreve explicitamente “Sistema de Usuarios – React (SPA)”; `sistema-usuarios/README.md:1–3` descreve o scaffold React/Vite. Descrição e tópicos também não explicam um match literal. O nome contém os fragmentos `MICROPROYECTO` e `FrontEnd`, mas não se afirma que isso causou o hit nem se infere uma regra de tokenização do GitHub. O banco comprova o resultado da busca, não sua correspondência textual exata.

Os metadados de histórico mostram o README raiz criado e revisado em 2025-11-14, com última alteração no SHA em 22:23:35Z; o README interno foi adicionado no commit-raiz em 22:17:10Z e não recebeu alterações posteriores alcançáveis. Ambos são anteriores às buscas de outubro de 2026, não posteriores. A ausência do termo no snapshot não foi explicada por uma mudança posterior às coletas nem por conteúdo histórico presumido.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` no SHA: 27 arquivos regulares `100644`, zero symlinks e zero gitlinks. Há um único manifesto de aplicação, um `index.html`, uma configuração Vite e uma árvore `src`, todos em `sistema-usuarios/`. Não há segunda aplicação, host/remote, submódulo ou `node_modules` versionado. | contrária |
| Código-fonte (entrada) | `sistema-usuarios/index.html:9–11` define `root` e carrega `/src/main.jsx`; `sistema-usuarios/src/main.jsx:1–13` importa `App` e `UserProvider`, montando uma única raiz React. `sistema-usuarios/src/App.jsx:1–5` retorna o roteador local. | contrária |
| Código-fonte / Composição | `sistema-usuarios/src/Router.jsx:1–7` importa estaticamente páginas e componentes locais; `sistema-usuarios/src/Router.jsx:11–22` registra Home, Register, Login e Admin no mesmo `BrowserRouter`. São páginas da mesma aplicação compilada, sem carregamento de unidades frontend independentes. | contrária |
| Código-fonte (estado e dados) | `sistema-usuarios/src/context/UserContext.jsx:3–15` compartilha sessão na árvore React; `sistema-usuarios/src/services/authService.js:1–10` e `sistema-usuarios/src/services/userService.js:1–12` importam o mesmo JSON local. `sistema-usuarios/src/pages/Admin.jsx:1–5` importa contexto, dados e `UserCard` locais. Esses módulos não têm entradas/builds próprios. | contrária |
| Configuração / Build/deploy | `sistema-usuarios/package.json:6–15` declara um build Vite e dependências React/Router. `sistema-usuarios/vite.config.js:1–7` configura explicitamente Vite com `@vitejs/plugin-react`, sem federação ou outras unidades. Os pacotes importados estão declarados em `sistema-usuarios/package.json:21–26` e resolvidos no lockfile: plugin React 5.1.1 em `sistema-usuarios/package-lock.json:1404–1406`, Vite 7.2.2 em `sistema-usuarios/package-lock.json:2781–2783`. Entradas e imports locais referenciados existem na árvore; essa verificação estática não equivale à execução do build. | contrária |
| Código-fonte (fronteiras) | Busca literal ativa `git grep -n -F -e '../../' -e '../../../'` em todos os JS/JSX do SHA: nenhuma ocorrência. Também foram lidos os imports de todos os 13 JS/JSX de `src`, com resolução estática dos caminhos relativos: todos permanecem na mesma aplicação. Exemplos de `../` locais estão em `sistema-usuarios/src/pages/Admin.jsx:2–5` e `sistema-usuarios/src/services/authService.js:1`. Não se deduz Q2 positivo apenas da ausência de travessias. | contexto |
| Tecnologia / Configuração / Composição | Busca integral nos arquivos textuais por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` e `micro.?frontend`: nenhuma ocorrência. O inventário e a leitura da configuração não mostram remotes/exposes/consumo, ciclo de vida exportado ou contrato de composição externa. | ausente |
| Documentação | `README.md:5–20` declara SPA e simulação de banco com JSON; `sistema-usuarios/README.md:1–16` preserva o texto padrão React/Vite, inclusive opções de plugins não necessariamente utilizadas. A implementação e o manifesto confirmam React/Vite, sem tomar o README isolado como prova de composição. | contexto |

## Autoria e histórico

Metadados de `git rev-list`: **4 commits, 0 merges e 1 commit-raiz**, raiz `fdbca67af3aa2e71dbea0af0b594e154142180a8`; clone não shallow. `git log --no-renames --name-status` por `sistema-usuarios` e `README.md` mostra todos os arquivos da aplicação adicionados juntos no commit-raiz, `Primer commit`, autor e committer `andreserazoo`, em 2025-11-14T14:17:10-08:00 (22:17:10Z).

Os três commits seguintes criam ou modificam somente o README raiz: `55b25d81a5797cd4957436d79020e1066ca2fe1c`, `2d48a888659a46f61775bfb7b73a7a851b88ab76` e o SHA avaliado, às 22:20:09Z, 22:23:02Z e 22:23:35Z do mesmo dia. Têm autor `Jorge Andres Erazo Sanchez` e committer `GitHub`. A adição em bloco não prova autoria original de cada arquivo; o README interno identifica o scaffold React/Vite (`sistema-usuarios/README.md:1–3`), enquanto páginas, sessão e serviços implementam a funcionalidade descrita na raiz. Não há histórico granular que permita atribuir cada trecho original ao titular, nem indício suficiente para afirmar que a aplicação funcional inteira foi vendorizada de terceiro. Não foi necessário acessar blobs históricos; nenhum objeto ausente foi encontrado.

Referências locais apenas para registro: `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado. Nenhum conteúdo de outro branch foi incorporado. Não há ADR ou documentação arquitetural separada no inventário; o README raiz documenta SPA e organização de módulos em `README.md:5–7` e `README.md:35–45`.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única SPA com entrada em `sistema-usuarios/index.html:9–11`; as quatro páginas são imports locais (`sistema-usuarios/src/Router.jsx:1–7`), sem segunda unidade ou configuração que referencie unidade externa. |
| Q2 | No | Páginas e módulos não têm entradas/builds próprios: compartilham a montagem em `sistema-usuarios/src/main.jsx:7–13` e o build global em `sistema-usuarios/package.json:6–10`. Não há conjunto de unidades compostas relativamente independentes. |
| Q3 | No | O Router navega entre componentes locais da mesma SPA (`sistema-usuarios/src/Router.jsx:14–19`), sem host/shell que carregue, monte ou roteie unidades frontend distintas. |
| Q4 | No | A configuração Vite apenas ativa React (`sistema-usuarios/vite.config.js:1–7`); buscas integrais não encontram mecanismo de composição nem contrato com host externo. |
| Q5 | No | Q1–Q4 convergem: frontend convencional único, com imports estáticos e build único, sem instância observável de arquitetura MFE. |

## Motivo

- `Non-MFE` pelo caso de frontend monolítico convencional. A classe decorre do código e da configuração, não do prefixo do nome, da origem de scaffold ou do caráter demonstrativo.
- `frontend_units: 1` e `unit_organization: single-unit` registram o único alvo próprio materializado. Páginas, serviços, componentes e contexto não são unidades adicionais.
- `repo_type: example` registra a demonstração de autenticação e gestão de usuários com banco simulado (`README.md:7–17`). `ui_technologies: [react]` e `build_tools: [vite]` são sustentados pela montagem e configuração explícitas e por pacotes declarados/resolvidos. Não se acrescentam bundlers internos transitivos do Vite.
- Não é `MFE-unit`: não há unidade preparada para um host externo. Q2–Q4 ficam No, sem necessidade de Undetermined. Não há composição por links/iframes/build time a decidir, nem configuração MFE de conexão incerta.

## Notas para análise

- **Protocolo (família):** busca nas anotações por `andreserazoo`, `sistema-usuarios` e `Sistema de Gestión de Usuarios` não identificou irmão já anotado. O README interno e a configuração identificam a família genérica do scaffold React/Vite; isso não demonstra cópia de um candidato específico.
- **Checklist:** o caso é distinto das cadeias completas 076/084/096/106/109, dos remotes não conectáveis 097/103/104 e do code sharing federado de 089/100: aqui nenhum mecanismo MFE foi encontrado. A aplicação materializada conta como um alvo próprio, ao contrário de código apenas gerado/exibido nos casos 075/081/105; ser exemplo não é, por si, motivo de exclusão.
- **Protocolo (limitação de proveniência):** o hit de `"micro frontend"` está comprovado nas duas rodadas, mas não foi possível localizar a expressão no texto dos READMEs do SHA. Não se inventa uma linha casada, conteúdo histórico ou comportamento de busca para preencher essa lacuna. Essa limitação não deixa a decisão arquitetural em aberto, pois a implementação observável satisfaz o caso convencional de exclusão.
- **Protocolo (proveniência, padrão no banco):** no banco da rodada 002, hits da consulta singular `"micro frontend"` incluem centenas de repositórios com nome `micro<palavra>…front…` sem `micro-front`/`microfront` (por exemplo `microservice-frontend`, `microfinance-frontend`, `micropay-frontend`; a verificação de coordenação contou 328 por um padrão de nome aproximado, a do revisor 332). O candidato entra nesse padrão, e o nome é o único campo compatível por eliminação (README sem os termos, description nula, topics vazios). A regra exata de casamento do GitHub não está demonstrada e nenhuma linha casada é inferida. Sem efeito na classe.
