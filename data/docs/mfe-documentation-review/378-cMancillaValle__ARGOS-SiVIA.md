---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Leitura do repositório

O README principal, em espanhol, apresenta um protótipo acadêmico de monitoramento por visão computacional, com interface web de gestão e assistente conversacional (`README.md:4-8`). Distingue o dashboard HTML/JS e o micro-frontend Hermes React/TypeScript, descreve o widget embutível e o build Vite (`README.md:47-64`, `README.md:86-110`). Isso converge com as duas unidades da 3.4.3 e a composição por custom element da 3.4.5 #1. A execução efetivamente encontrada é conjunta: o FastAPI serve as páginas e o bundle do Hermes (`backend/main.py:257-293`). O texto mistura essa arquitetura atual com referências a Flask; a tabela registra as que afetam o acesso às unidades. Os detalhes do worker de visão, autenticação e negócio não descrevem composição frontend.

Foram lidos integralmente os três documentos classificados como `documentation`. `backend/fastapi_poc/README.md:1-122` descreve um servidor experimental de WebSocket, dependências, protocolo e testes, mantendo o frontend fora da alteração (`backend/fastapi_poc/README.md:4`); são relações e procedimentos de backend, sem afirmação arquitetural frontend para a tabela. `frontend-hermes/README.md:1-73` é o template inglês React/TypeScript/Vite, com instruções genéricas de plugins e ESLint, sem afirmação específica do projeto. Os comandos de instalação e execução e o exemplo de variáveis do README principal (`README.md:225-265`, `README.md:282-305`) são instruções, não linhas adicionais.

As cinco ocorrências `doc-mfe-term` estão cobertas: `README.md:63` pelas afirmações 2 e 3; `README.md:70` pela 5; `README.md:101` repete a identificação de Hermes da 2; `README.md:208` é título da tabela tecnológica, sem nova afirmação; `README.md:312` é plano futuro de migração do host para React, e repete o contexto atual de host vanilla e Hermes React, sem alegar que a migração já ocorreu. A árvore comentada foi considerada documentação: as fronteiras e o widget/build geram afirmações; descrições de arquivos internos, como hooks, estado e tipos (`README.md:103-109`), ficam como contexto.

Foram lidos os comentários e campos descritivos dos artefatos citados nas revisões anteriores: `backend/main.py`, `docker-compose.yml`, `frontend-hermes/package.json`, `frontend-hermes/vite.config.ts`, `frontend-hermes/index.html`, `frontend-hermes/src/hermes-widget.tsx`, `frontend-hermes/src/App.tsx`, `frontend/components/topbar.html`, `frontend/dashboard.html`, `frontend/index.html`, `frontend/login.html`, `frontend/js/router.js`, `frontend/views/auditoria.html`, `frontend/views/dashboard_home.html`, `frontend/views/infra_servidores.html`, `frontend/views/mapa_transmilenio.html`, `ngrok_tunnel.py`, `start.py` e `start_ngrok.sh`; também `frontend/js/api.js` e `frontend/js/rbac.js`, carregados pelo dashboard (`frontend/dashboard.html:367-369`). O manifesto npm não tem `description` (`frontend-hermes/package.json:1-31`). As declarações sobre comunicação, empacotamento e infraestrutura entram abaixo; comentários de UI, ciclo de vida interno, scripts CDN e limpeza das vistas não acrescentam relações entre unidades. Os rótulos “HERMES IA WIDGET (MICRO-FRONTEND)” (`frontend/dashboard.html:359`, `frontend/dashboard.html:685`) e “Construir Widget Hermes (Micro-Frontend)” (`ngrok_tunnel.py:50`) repetem as afirmações 2 e 5.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:47-48 | "Frontend Web — Dashboard Principal"; "Interfaz SPA multi-panel renderizada dinámicamente con JavaScript Vanilla" (frontend web principal com interface SPA de múltiplos painéis renderizada dinamicamente por JavaScript vanilla) | estrutura | corroborada | 3.4.3 unidade frontend; frontend/js/router.js:13-29; frontend/js/router.js:64-96 |
| 2 | README.md:63 | "Micro-frontend [...] construido en React + TypeScript con Vite" (micro-frontend construído em React + TypeScript com Vite) | estrutura | corroborada | 3.4.3 unidade frontend-hermes; 3.4.6 #2; frontend-hermes/package.json:6-29; frontend-hermes/vite.config.ts:11-15; frontend/dashboard.html:361-366 |
| 3 | README.md:63 | "independiente" (independente) | independência | sem corroboração | — |
| 4 | README.md:68 | "Túnel HTTP seguro via pyngrok para exponer el servidor Flask a internet" (túnel HTTP seguro por pyngrok para expor o servidor Flask à internet) | build-deploy | contradita | 3.4.6 #1-2; ngrok_tunnel.py:95-111; ngrok_tunnel.py:153-161 |
| 5 | README.md:70 | "Construcción automática del micro-frontend Hermes antes de lanzar el túnel" (build automático do micro-frontend Hermes antes de lançar o túnel) | build-deploy | corroborada | 3.4.6 #2; ngrok_tunnel.py:52-62; ngrok_tunnel.py:223-225 |
| 6 | README.md:104 | "hermes-widget.tsx → Widget embebible del chatbot" (widget embutível do chatbot) | composição | corroborada | 3.4.5 #1; frontend-hermes/src/hermes-widget.tsx:6-58; frontend/dashboard.html:361-366 |
| 7 | README.md:110 | "dist/ → Bundle compilado (generado por Vite)" (bundle compilado gerado por Vite) | build-deploy | corroborada | 3.4.6 #2; frontend-hermes/package.json:8; frontend-hermes/vite.config.ts:10-16; backend/main.py:92 |
| 8 | README.md:112-113 | "Servidor FastAPI"; "Entrada principal FastAPI, lifespan, routers, estáticos" (servidor FastAPI, entrada principal com ciclo de vida, roteadores e estáticos) | build-deploy | corroborada | 3.4.6 #1-2; backend/main.py:91-92; backend/main.py:257-293 |
| 9 | README.md:214 | "vite-plugin-css-injected-by-js [...] Widget embebible sin CSS externo" (widget embutível sem CSS externo) | composição | corroborada | frontend-hermes/vite.config.ts:3-8; frontend-hermes/src/hermes-widget.tsx:4; frontend-hermes/src/hermes-widget.tsx:18-21 |
| 10 | README.md:221 | "Inno Setup [...] Generación del instalador Windows (.exe)" (geração do instalador Windows) | build-deploy | sem corroboração | — |
| 11 | frontend-hermes/src/App.tsx:19 | "Sincronizar módulo del dashboard al widget" (sincronizar módulo do dashboard com o widget) | composição | corroborada | frontend/dashboard.html:361; frontend-hermes/src/hermes-widget.tsx:40-44; frontend-hermes/src/App.tsx:19-22; frontend-hermes/src/store/useHermesStore.ts:44 |
| 12 | frontend-hermes/src/App.tsx:24 | "Escuchar evento global desde el topbar para abrir/cerrar" (ouvir evento global do topbar para abrir/fechar) | composição | corroborada | 3.4.5 #2; frontend/components/topbar.html:25-26; frontend-hermes/src/App.tsx:25-40 |
| 13 | frontend-hermes/vite.config.ts:17 | "Prevent externalizing React so it gets bundled" | build-deploy | corroborada | frontend-hermes/vite.config.ts:17-23; 3.4.6 #2 |
| 14 | frontend/dashboard.html:687 | "El widget se carga vía Web Component (<hermes-widget>)" (o widget é carregado por Web Component) | composição | corroborada | 3.4.5 #1; frontend/dashboard.html:361-366; frontend-hermes/src/hermes-widget.tsx:57-58 |
| 15 | frontend/dashboard.html:688 | "Se le pasará el token una vez el router haya cargado" (o token será passado ao widget após carregar o roteador) | composição | corroborada | frontend/dashboard.html:724-730; frontend-hermes/src/hermes-widget.tsx:10-12; frontend-hermes/src/hermes-widget.tsx:31-44 |
| 16 | frontend/js/api.js:4-5 | "Capa de comunicación entre el frontend y el backend Flask" (camada de comunicação entre frontend e backend Flask) | composição | contradita | frontend/js/api.js:11-15; frontend/js/api.js:40-55; backend/main.py:257-293; 3.4.6 #1-2 |
| 17 | frontend/js/api.js:9-10 | "Localhost/LAN → usa el host actual"; "Ngrok / dominio externo → usa window.location.origin" (usa o host atual em localhost/LAN e a origem da página em ngrok/domínio externo) | composição | corroborada | frontend/js/api.js:11-15; frontend/js/api.js:55; backend/main.py:257-293 |
| 18 | ngrok_tunnel.py:3-5 | "Expone el servidor FastAPI y el WebSocket de cámaras al exterior usando pyngrok" (expõe o servidor FastAPI e o WebSocket de câmeras ao exterior usando pyngrok) | build-deploy | corroborada | 3.4.6 #1-2; ngrok_tunnel.py:95-111; ngrok_tunnel.py:153-161 |

## Observações

**1. README.md.** A descrição do frontend principal reaparece na árvore e no stack (`README.md:86-99`, `README.md:201-205`). O roteador seleciona e insere vistas HTML da própria unidade (`frontend/js/router.js:13-29`, `frontend/js/router.js:64-96`); esses painéis internos não são unidades adicionais.

**2. README.md.** A identidade de micro-frontend React/TypeScript/Vite reaparece em `README.md:101`, `README.md:208-213` e nos rótulos do dashboard. O pacote, a entrada própria e o consumo pelo host corroboram essa identidade e a tecnologia declarada (`frontend-hermes/package.json:6-29`, `frontend-hermes/vite.config.ts:11-15`, `frontend/dashboard.html:361-366`).

**3. README.md.** “Independiente” não tem corroboração quanto à execução autônoma funcional. O snapshot demonstra um widget construído à parte e embutido, mas o build separado não comprova independência de execução (`frontend-hermes/vite.config.ts:11-15`, `frontend/dashboard.html:361-366`). A entrada HTML de desenvolvimento aponta para `/src/main.tsx`, ausente no inventário; a 3.4.3 já registra essa limitação (`frontend-hermes/index.html:11`). O servidor de publicação é compartilhado (`backend/main.py:257-293`); esse deploy conjunto tampouco demonstra ou desmente, por si só, execução autônoma.

**4. README.md.** O túnel para o servidor existe, mas o processo iniciado é `uvicorn main:app`, e não Flask (`ngrok_tunnel.py:99-111`). A contradição é o mecanismo nomeado: o texto conserva o nome anterior mesmo descrevendo um caminho real de publicação. Não se avaliou a segurança do túnel em execução.

**5. README.md.** O script chama `build_hermes_widget()` antes de iniciar o servidor e abrir o túnel (`ngrok_tunnel.py:52-62`, `ngrok_tunnel.py:223-225`). O comentário `ngrok_tunnel.py:50` repete a afirmação. O automatismo é uma tentativa de build: erro de compilação é capturado e registrado como advertência, sem interromper necessariamente o lançamento (`ngrok_tunnel.py:59-60`).

**6. README.md.** A árvore identifica corretamente a entrada embutível. Ela registra um custom element que monta `App`, enquanto o dashboard consome a tag e o bundle (`frontend-hermes/src/hermes-widget.tsx:42-58`, `frontend/dashboard.html:361-366`). A afirmação 14 acrescenta o mecanismo Web Component explicitamente nomeado pelo comentário do consumidor.

**7. README.md.** O build usa a entrada `src/hermes-widget.tsx` e gera `hermes-widget.js` como biblioteca IIFE (`frontend-hermes/vite.config.ts:10-16`). O backend aponta para `frontend-hermes/dist` (`backend/main.py:92`). É descrição do produto de build, sem exigir que o bundle gerado esteja versionado.

**8. README.md.** O servidor FastAPI mencionado na árvore é o que entrega tanto as páginas principais quanto os arquivos do widget (`backend/main.py:257-293`). A afirmação é coerente com o deploy conjunto da 3.4.6, embora outros trechos ainda digam Flask.

**9. README.md.** O plugin de injeção de CSS está configurado (`frontend-hermes/vite.config.ts:3-8`). Além disso, o custom element importa CSS inline e cria um elemento `style` no shadow DOM (`frontend-hermes/src/hermes-widget.tsx:4`, `frontend-hermes/src/hermes-widget.tsx:18-21`). A afirmação diz respeito ao widget; não implica que o host inteiro dispense CSS externo.

**10. README.md.** O instalador Windows é listado como infraestrutura, mas não há script Inno Setup ou empacotamento correspondente no inventário do snapshot, como já assinalado na Leitura da 3.4.6. A documentação sozinha não comprova a geração ou distribuição do executável.

**11. frontend-hermes/src/App.tsx.** O host fornece `modulo="dashboard"` e o custom element repassa o atributo como prop (`frontend/dashboard.html:361`, `frontend-hermes/src/hermes-widget.tsx:40-44`). O efeito atualiza o estado do widget (`frontend-hermes/src/App.tsx:19-22`, `frontend-hermes/src/store/useHermesStore.ts:44`). Isso confirma a passagem do contexto fornecido; não comprova acompanhamento automático de cada navegação interna do host.

**12. frontend-hermes/src/App.tsx.** O topbar dispara `toggle-hermes`, e o listener alterna o painel (`frontend/components/topbar.html:25-26`, `frontend-hermes/src/App.tsx:25-35`). A relação de eventos da 3.4.5 #2 confirma essa comunicação entre as unidades.

**13. frontend-hermes/vite.config.ts.** `external: []` declara React dentro do bundle, coerente com a distribuição IIFE própria (`frontend-hermes/vite.config.ts:14-23`). O comentário da linha 26 trata de `process.env.NODE_ENV` nesse mesmo bundle, sem acrescentar nova fronteira arquitetural.

**14. frontend/dashboard.html.** O comentário nomeia o mecanismo de composição: a tag usada pelo host é registrada pelo fornecedor (`frontend/dashboard.html:361-366`, `frontend-hermes/src/hermes-widget.tsx:57-58`). `frontend/dashboard.html:726` repete “Web Component”; não forma outra afirmação. O registro do custom element e a criação do shadow DOM nos comentários da entrada do widget descrevem o mesmo mecanismo (`frontend-hermes/src/hermes-widget.tsx:15-16`, `frontend-hermes/src/hermes-widget.tsx:56-58`).

**15. frontend/dashboard.html.** O host aguarda `AppRouter.init()` e então passa o token ao atributo do widget (`frontend/dashboard.html:724-730`). A lista de atributos observados e o callback atualizam `App` com esse token (`frontend-hermes/src/hermes-widget.tsx:10-12`, `frontend-hermes/src/hermes-widget.tsx:31-44`). É compartilhamento efetivo da credencial de sessão entre host e widget, não apenas disponibilidade de um campo.

**16. frontend/js/api.js.** O cliente efetivamente chama a API da origem da página (`frontend/js/api.js:11-15`, `frontend/js/api.js:40-55`), mas o servidor atual que entrega essa página é FastAPI (`backend/main.py:257-293`). A função de comunicação é confirmada e o nome Flask é desmentido; prevalece `contradita`. É outra afirmação em relação à 4 porque o sujeito é o cliente API, não o túnel de publicação.

**17. frontend/js/api.js.** A implementação usa incondicionalmente `window.location.origin + '/api'` (`frontend/js/api.js:11-15`), confirmando a origem comum nos dois cenários descritos. Isso combina com o servidor que publica os estáticos (`backend/main.py:257-293`). Não se verificou um domínio público em funcionamento.

**18. ngrok_tunnel.py.** O cabeçalho já identifica o servidor atual: o script sobe FastAPI/Uvicorn e abre um túnel HTTP para a mesma porta (`ngrok_tunnel.py:95-111`, `ngrok_tunnel.py:153-161`). A 3.4.6 registra esse caminho conjunto para as unidades. A nomeação correta de FastAPI não elimina a afirmação divergente do README na linha 68.

## Resumo

Afirmações: 18 (corroborada: 14, parcial: 0, contradita: 2, sem corroboração: 2). Temas: (estrutura: 2, composição: 8, build-deploy: 7, independência: 1).
