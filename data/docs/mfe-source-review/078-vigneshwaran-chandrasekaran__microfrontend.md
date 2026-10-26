---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | host/src/App.jsx:32 | host | dynamic-loading | Yes | `loader: () => import('reactMfe1/mount')` na entrada React MFE 1 de `MFE_NAV` (host/src/App.jsx:31-36) carrega em runtime o módulo `./mount` da unidade `react-mfe-1`, exposta em react-mfe-1/webpack.config.js:52-54; remote `reactMfe1` resolvido em host/webpack.config.js:42 (dev) e :36 (prod); o loader é invocado em host/src/App.jsx:59. |
| src-remote-import | host/src/App.jsx:33 | host | dynamic-loading | Yes | `loader: () => import('reactMfe2/mount')` carrega o `./mount` da unidade `react-mfe-2`, exposto em react-mfe-2/webpack.config.js:45-47; remote `reactMfe2` resolvido em host/webpack.config.js:43 e :37; invocado em host/src/App.jsx:59. |
| src-remote-import | host/src/App.jsx:34 | host | dynamic-loading | Yes | `loader: () => import('vueMfe/mount')` carrega o `./mount` da unidade `vue-mfe`, exposto em vue-mfe/webpack.config.js:61-63; remote `vueMfe` resolvido em host/webpack.config.js:44 e :38; invocado em host/src/App.jsx:59. |
| src-remote-import | host/src/App.jsx:35 | host | dynamic-loading | Yes | `loader: () => import('angularMfe/mount')` carrega o `./mount` da unidade `angular-mfe`, exposto em angular-mfe/webpack.config.js:26-28; remote `angularMfe` resolvido pelo `promise import(...)` de host/webpack.config.js:30-32, usado em :39 e :45; invocado em host/src/App.jsx:59. |
| src-remote-import | host/webpack.config.js:32 | host | remote-resolution | Yes | `promise import('http://localhost:4200/remoteEntry.js')` resolve o `remoteEntry.js` da unidade `angular-mfe` em desenvolvimento (host/webpack.config.js:30-32); o valor entra no mapa `remotes` em :45 (dev) e :39 (prod, `/angular-mfe/remoteEntry.js`), passado ao `ModuleFederationPlugin` em :80-82. |
| src-remote-import | react-mfe-1/src/mount.js:3 | react-mfe-1 | none | No | Linha de comentário do cabeçalho (react-mfe-1/src/mount.js:1-4) que descreve a chamada do host; não é código executável. A construção correspondente é a definição de `mount` em react-mfe-1/src/mount.js:11-18, registrada na tabela manual. |
| src-remote-import | react-mfe-1/webpack.config.js:51 | react-mfe-1 | none | No | Linha de comentário (`// Host uses it as: import('reactMfe1/mount')`) acima do campo `exposes` em react-mfe-1/webpack.config.js:52-54; não é código executável. |
| src-async-bootstrap | host/src/index.js:5 | host | none | No | Linha de comentário do bloco explicativo de host/src/index.js:1-6, que cita `import('./bootstrap')` em prosa; a chamada está em host/src/index.js:7. |
| src-async-bootstrap | host/src/index.js:7 | host | dynamic-loading | No | `import('./bootstrap')` carrega host/src/bootstrap.js, arquivo da própria unidade `host` que monta o App React em host/src/bootstrap.js:9-14; construção interna à unidade. |
| src-async-bootstrap | react-mfe-1/src/index.js:3 | react-mfe-1 | dynamic-loading | No | `import('./bootstrap')` carrega react-mfe-1/src/bootstrap.js, da própria unidade (monta o App em react-mfe-1/src/bootstrap.js:9-14); interno à unidade. |
| src-async-bootstrap | react-mfe-2/src/index.js:1 | react-mfe-2 | dynamic-loading | No | `import('./bootstrap')` carrega react-mfe-2/src/bootstrap.js, da própria unidade; interno à unidade. |
| src-async-bootstrap | vue-mfe/src/index.js:1 | vue-mfe | dynamic-loading | No | `import('./bootstrap')` carrega vue-mfe/src/bootstrap.js, da própria unidade, que monta a aplicação em `#root` (vue-mfe/src/bootstrap.js:5); interno à unidade. |
| src-mount-call | host/src/App.jsx:61 | host | runtime-composition | Yes | `mount(container)` chama a função `default` do módulo remoto recebido pelo `loader` e monta a unidade remota no `div` do host (host/src/App.jsx:48-69, container em :87); os alvos são as quatro unidades de `MFE_NAV` (host/src/App.jsx:32-35) e a montagem é acionada pelas rotas em host/src/App.jsx:178-188. |
| src-mount-call | react-mfe-1/src/mount.js:3 | react-mfe-1 | none | No | Mesma linha de comentário da ocorrência `src-remote-import` acima; dois padrões apontam para react-mfe-1/src/mount.js:3, que é prosa do cabeçalho. |
| src-mount-call | react-mfe-1/webpack.config.js:9 | react-mfe-1 | none | No | Linha de comentário do bloco de documentação react-mfe-1/webpack.config.js:4-10 (`Exposes the ./mount module so the host can call mount(element)`); não é código executável. |
| src-mount-call | vue-mfe/src/mount.js:4 | vue-mfe | none | No | Linha de comentário do cabeçalho vue-mfe/src/mount.js:1-4, que descreve `app.mount(element)` em prosa; a chamada está em vue-mfe/src/mount.js:10. |
| src-mount-call | vue-mfe/src/mount.js:10 | vue-mfe | runtime-composition | Yes | `app.mount(element)` monta a aplicação Vue no elemento fornecido pelo host, dentro de `mount` (vue-mfe/src/mount.js:8-11, exportado em :13); módulo exposto como `./mount` em vue-mfe/webpack.config.js:61-63 e chamado pelo host em host/src/App.jsx:61. A definição de `mount` em vue-mfe/src/mount.js:8 é o primeiro passo da mesma construção. |
| src-iframe | host/src/App.jsx:97 | host | embedding | Yes | `<iframe src={url}>` em `IframeView` (host/src/App.jsx:95-104) embute as duas aplicações externas declaradas em `IFRAME_NAV` (host/src/App.jsx:38-41), `https://route-map-five.vercel.app/` e `https://multibank-1.onrender.com/`; as rotas que renderizam o componente estão em host/src/App.jsx:191-197. Alvos fora do snapshot. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | angular-mfe/src/mount.ts:20 | angular-mfe | runtime-composition | Yes | `const mount = (element: HTMLElement): void` cria um `<app-root>` dentro do elemento recebido do host e faz o bootstrap de `AppModule` uma única vez (angular-mfe/src/mount.ts:20-32, export em :34); módulo exposto como `./mount` em angular-mfe/webpack.config.js:26-28 e carregado pelo host em host/src/App.jsx:35. A mineração não pegou nenhuma linha executável deste arquivo. |
| manual | host/src/App.jsx:38 | host | host-relationship | Yes | `IFRAME_NAV` declara quais aplicações externas o host usa e em que rota (host/src/App.jsx:38-41): Route Map em `/route-map` e Multibank em `/multibank`; o registro alimenta o menu em :126 e as rotas em :191-197, que renderizam o `<iframe>` de :97. |
| manual | host/src/App.jsx:178 | host | host-relationship | Yes | A tabela de rotas do host gera uma rota por entrada de `MFE_NAV`, ligando cada caminho (`/react-mfe-1`, `/react-mfe-2`, `/vue-mfe`, `/angular-mfe`) ao `MfeContainer` com o `loader` da unidade correspondente (host/src/App.jsx:178-188); as rotas são renderizadas dentro de `Routes` em :160-198, sob o `BrowserRouter` de :209-211. |
| manual | react-mfe-1/src/mount.js:11 | react-mfe-1 | runtime-composition | Yes | `const mount = (element) =>` cria a raiz React no elemento fornecido pelo host e renderiza o App com o store da própria unidade (react-mfe-1/src/mount.js:11-18, export em :20); exposto como `./mount` em react-mfe-1/webpack.config.js:52-54 e chamado pelo host em host/src/App.jsx:61. A mineração pegou só a linha de comentário :3 deste arquivo. |
| manual | react-mfe-2/src/mount.js:7 | react-mfe-2 | runtime-composition | Yes | `const mount = (element) =>` monta o App React no elemento fornecido pelo host (react-mfe-2/src/mount.js:7-14, export em :16); exposto como `./mount` em react-mfe-2/webpack.config.js:45-47 e carregado pelo host em host/src/App.jsx:33. Nenhuma linha deste arquivo está no `matches.csv`. |

## Resumo

Construções com composição: 13 (dynamic-loading: 4, remote-resolution: 1, runtime-composition: 5, embedding: 1, host-relationship: 2).

## Notas

- Falso positivo recorrente nesta amostra: o repositório é didático e tem comentários longos que citam as construções em prosa. Seis das 18 ocorrências `src-*` caem em linhas de comentário (react-mfe-1/src/mount.js:3 por dois padrões, react-mfe-1/webpack.config.js:9 e :51, host/src/index.js:5, vue-mfe/src/mount.js:4) e foram anotadas como `none`/`No`, com a linha executável correspondente citada na Observação.
- A mineração perdeu as definições de `mount` de três das quatro unidades remotas (react-mfe-1/src/mount.js:11, react-mfe-2/src/mount.js:7, angular-mfe/src/mount.ts:20): o padrão `src-mount-call` só casou com `app.mount(` do Vue e com as linhas de comentário. Em vue-mfe a construção já estava coberta pela ocorrência :10, por isso a definição em :8 não virou linha manual.
- O mapa `remotes` de host/webpack.config.js:34-46 nomeia as quatro unidades e seus `remoteEntry.js`, mas é configuração de build (seção 3.4.2); só a linha :32, que o `matches.csv` traz, entrou na tabela. O mesmo vale para os campos `exposes` dos quatro remotes.
- Não há mecanismo de comunicação entre unidades: host, react-mfe-1 e react-mfe-2 criam cada um o seu store Redux (host/src/store/store.js:4-8, react-mfe-1/src/store/store.js:4-8, react-mfe-2/src/store/store.js) e nenhum é compartilhado; `@reduxjs/toolkit` é declarado com `singleton: false` em host/webpack.config.js:87. A busca do passo 4 não encontrou `postMessage`, `CustomEvent`, `BroadcastChannel` nem `customElements` em código (só `<app-root>`, o selector interno do angular-mfe, em angular-mfe/src/index.html:10 e angular-mfe/src/app/app.component.ts:10).
- As duas unidades alvo dos iframes estão fora do snapshot; o host as referencia só por URL (host/src/App.jsx:39-40), como já observado na revisão estrutural.
- O `README.md` repete em exemplos as mesmas construções (README.md:415-420, inclusive um `reactMfe3/mount` que não existe no snapshot); documentação não virou linha.
