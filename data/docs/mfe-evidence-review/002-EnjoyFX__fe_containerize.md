---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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
  date: 2026-10-21
---

# 002 — EnjoyFX/fe_containerize

## Leitura do repositório

A composição não usa biblioteca de MFE: a revisão de dependências não encontrou nenhuma, e não há observação de tecnologia. A cadeia é feita só com recursos do navegador e do Vite:
- **Configuração:** o Vite do `microfrontend` empacota o widget como bundle IIFE que publica a global `MicroFrontendWidget` (#1).
- **Código do widget:** o widget exporta `mount` e `unmount` (#2, #3, #6, #7).
- **Código do host:** o `frontend` passa a URL do bundle ao componente que injeta o script (#9, #10) e chama `mount` e `unmount` pela global (#4, #5).
- **Relação:** tudo isso resulta na única relação, ativa, frontend → microfrontend (#14), entre duas unidades com limites próprios (#12, #13).

Build e deploy são separados para as duas aplicações (#15, #16). Cada uma tem imagem, serviço no compose e Deployment no chart. O microfrontend não tem endereço público próprio: chega ao navegador pelo caminho `/mfe/` do nginx do frontend.

Um sinal engana: um dos achados da mineração de URL de bundle é texto YAML exibido na interface, e não carregamento de código (#8). O backend NestJS é contexto (#11).

A documentação tem 11 afirmações, todas corroboradas e todas fracas pelo critério do protocolo. Ela descreve sobretudo o deploy, e uma delas trata só do proxy para o backend (#21, contexto).

Não há pontos históricos: a revisão histórica não encontrou ambiguidade a esclarecer.

## Observações

### 1. microfrontend/vite.config.js:19-39

**Observação:** `build.lib` usa `entry: 'src/main.jsx'`, `name: 'MicroFrontendWidget'`, `fileName: 'widget'` e `formats: ['iife']`, com `cssCodeSplit: false`. O servidor de desenvolvimento usa a porta 3001 e encaminha `/api` ao backend.

**Interpretação:** O widget está configurado para ser publicado como um script autônomo que expõe sua API numa global.

### 2. microfrontend/src/main.jsx:7-12

**Observação:** `export function mount(container)` cria uma raiz React no elemento recebido e renderiza `Widget`.

**Interpretação:** O widget oferece uma função de montagem para que outra aplicação o insira num elemento próprio.

### 3. microfrontend/src/main.jsx:14-20

**Observação:** `export function unmount(container)` desmonta a raiz React associada ao elemento.

**Interpretação:** O widget oferece a função de desmontagem que completa o ciclo de vida.

### 4. frontend/src/RemoteWidget.jsx:12-14

**Observação:** Depois que o script carrega, o componente chama `window.MicroFrontendWidget.mount(containerRef.current)`.

**Interpretação:** O host monta o widget de outra unidade pelo nome da global.

### 5. frontend/src/RemoteWidget.jsx:24-26

**Observação:** Na limpeza do efeito, o componente chama `window.MicroFrontendWidget.unmount(containerRef.current)`.

**Interpretação:** O host desmonta o widget de outra unidade pelo nome da global.

### 6. microfrontend/src/main.jsx:7

**Observação:** É a mesma declaração de `mount` do #2, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O widget oferece a função de montagem, sem chamá-la.

**Nota:** A revisão de código-fonte (3.4.4) manteve as duas linhas por sobreposição de padrões, e esta etapa (3.5) mantém uma observação por linha.

### 7. microfrontend/src/main.jsx:14

**Observação:** É a mesma declaração de `unmount` do #3, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O widget oferece a função de desmontagem, sem chamá-la.

### 8. frontend/src/App.jsx:475

**Observação:** Texto YAML (`path: /widget.iife.js`) dentro de uma string de exemplo exibida na interface.

**Interpretação:** Não é carregamento de código. É um falso positivo da busca por URL de bundle.

### 9. frontend/src/App.jsx:800-803

**Observação:** O painel lateral renderiza `<RemoteWidget src={`/mfe/widget.iife.js?v=${Date.now()}`} />`.

**Interpretação:** O host aponta para o bundle do widget, com um parâmetro que evita cache.

### 10. frontend/src/RemoteWidget.jsx:8-22

**Observação:** O componente cria um elemento `script` com a URL recebida, define `async` e o anexa ao `head`.

**Interpretação:** O host carrega em runtime um script indicado por propriedade.

### 11. backend; backend/package.json:1-8; backend/src/main.ts:5-21; backend/Dockerfile:2-17; docker-compose.yml:18-19

**Observação:** É o pacote NestJS de um servidor HTTP, com build e imagem próprios e sem UI.

**Interpretação:** É um backend no mesmo repositório, e não uma unidade frontend.

### 12. frontend; frontend/package.json:1-10; frontend/index.html:9-10; frontend/src/main.jsx:6-9; frontend/vite.config.js:4-13

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 13. microfrontend; microfrontend/package.json:1-10; microfrontend/index.html:9-12; microfrontend/src/main.jsx:7-11; microfrontend/vite.config.js:19-32

**Observação:** É um widget com manifesto, função de montagem e build próprio, e também uma página local que o executa isoladamente.

**Interpretação:** É uma unidade frontend com limite próprio, capaz de rodar sozinha.

### 14. frontend/src/RemoteWidget.jsx:8-14, 24-26; frontend/src/App.jsx:802; microfrontend/src/main.jsx:7-19; microfrontend/vite.config.js:25-29; frontend/nginx.conf:57-58

**Observação:** O frontend carrega `/mfe/widget.iife.js` e chama `mount` e `unmount` da global `MicroFrontendWidget`. O arquivo e a global correspondem ao bundle do widget, e o nginx do frontend encaminha `/mfe/` ao serviço `microfrontend`.

**Interpretação:** É uma relação page → embedded-frontend ativa.

### 15. frontend/package.json:8; frontend/Dockerfile:2-14; docker-compose.yml:39-40; helm/fe-containerize/templates/frontend.yaml:1-84; helm/fe-containerize/values.yaml:5

**Observação:** O frontend tem `vite build` e imagem nginx próprios, serviço próprio no compose e Deployment, Service e Ingress próprios no chart. A imagem usa a tag `latest`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 16. microfrontend/package.json:8; microfrontend/Dockerfile:2-14; docker-compose.yml:35-36; helm/fe-containerize/templates/microfrontend.yaml:1-56; helm/fe-containerize/values.yaml:7; frontend/nginx.conf:57-58

**Observação:** O microfrontend tem `vite build` e imagem nginx próprios, serviço próprio no compose e Deployment e Service próprios no chart, sem Ingress. Chega ao navegador pelo `/mfe/` do nginx do frontend. A imagem usa a tag `latest`.

**Interpretação:** Há fronteiras de build e de deploy próprias, mas não uma origem própria. Não há versionamento independente.

### 17. README.docker-compose.md:3-8

**Observação:** "Демо застосунок з 4 сервісів […] `microfrontend`: окремий React widget у форматі IIFE".

**Interpretação:** Descreve os quatro serviços e o microfrontend como widget IIFE separado. A afirmação é corroborada.

### 18. README.docker-compose.md:19

**Observação:** É um diagrama: o frontend "loads JS bundle at runtime" do micro-frontend.

**Interpretação:** Descreve a carga do widget em runtime. A afirmação é corroborada.

### 19. README.docker-compose.md:21-24

**Observação:** É um diagrama que marca o micro-frontend como "internal".

**Interpretação:** Afirma que o microfrontend não é exposto diretamente. A afirmação é corroborada.

### 20. README.docker-compose.md:150-152

**Observação:** "`frontend/vite.config.js` проксіює `/api` […] `/mfe` на `http://localhost:3001` […] `microfrontend/vite.config.js` проксіює `/api`".

**Interpretação:** Descreve como o frontend alcança o microfrontend em desenvolvimento. A afirmação é corroborada.

### 21. README.docker-compose.md:158

**Observação:** "`frontend/nginx.conf` проксіює `/api` до `backend:8000`".

**Interpretação:** Descreve o proxy do frontend para o backend. A afirmação é corroborada.

### 22. README.docker-compose.md:159

**Observação:** "`frontend/nginx.conf` проксіює `/mfe` до `microfrontend:80`".

**Interpretação:** Descreve como o frontend alcança o microfrontend em produção. A afirmação é corroborada.

### 23. README.md:3-6

**Observação:** "два варіанти деплою: Docker Compose […] k3s + Helm".

**Interpretação:** Afirma que há duas formas de deploy para as aplicações. A afirmação é corroborada.

### 24. README.md:32

**Observação:** "`microfrontend` […] Незалежний widget".

**Interpretação:** Afirma que o widget é independente, no sentido de rodar e ser construído sozinho. A afirmação é corroborada.

### 25. frontend/nginx.conf:56

**Observação:** "Proxy micro-frontend assets (no cache — bundle changes on redeploy)".

**Interpretação:** Supõe que o microfrontend é republicado à parte. A afirmação é corroborada.

### 26. helm/README.md:47

**Observação:** "microfrontend.yaml # MFE: Deployment + Service".

**Interpretação:** Afirma que o microfrontend tem Deployment e Service próprios. A afirmação é corroborada.

### 27. helm/README.md:154-158

**Observação:** "Редеплой після змін у коді […] Один сервіс (наприклад frontend)".

**Interpretação:** Descreve o redeploy de uma aplicação sem as outras. A afirmação é corroborada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (microfrontend, Marcadores, Entrada e Build); 3.4.4 (microfrontend/src/main.jsx:7, Observação); 3.4.5 #1 (Configuração); 3.4.7 #1 (Evidência) | 2 configuração | configuração | script | tecnológica | moderada | configura #13; configura #14 |
| 2 | 3.4.4 (microfrontend/src/main.jsx:7, src-mount-export) | 3 código | código-fonte | script | tecnológica | moderada | implementa #14 |
| 3 | 3.4.4 (microfrontend/src/main.jsx:14, src-mount-export) | 3 código | código-fonte | script | tecnológica | moderada | implementa #14 |
| 4 | 3.4.4 (frontend/src/RemoteWidget.jsx:14) | 3 código | código-fonte | script | arquitetural | forte | implementa #14 |
| 5 | 3.4.4 (frontend/src/RemoteWidget.jsx:26) | 3 código | código-fonte | script | arquitetural | forte | implementa #14 |
| 6 | 3.4.4 (microfrontend/src/main.jsx:7, src-mount-call) | 3 código | código-fonte | script | tecnológica | moderada | implementa #14 |
| 7 | 3.4.4 (microfrontend/src/main.jsx:14, src-mount-call) | 3 código | código-fonte | script | tecnológica | moderada | implementa #14 |
| 8 | 3.4.4 (frontend/src/App.jsx:475) | 3 código | código-fonte | — | contexto | fraca | — |
| 9 | 3.4.4 (frontend/src/App.jsx:802) | 3 código | código-fonte | script | arquitetural | forte | implementa #14 |
| 10 | 3.4.4 (frontend/src/RemoteWidget.jsx:8) | 3 código | código-fonte | script | tecnológica | moderada | implementa #14 |
| 11 | 3.4.3 (backend) | 4 estrutura | diretório | — | contexto | fraca | — |
| 12 | 3.4.3 (frontend) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (microfrontend) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.5 #1 | 5 composição | código-fonte | script | arquitetural | forte | liga #12; liga #13 |
| 15 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #12 |
| 16 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #13 |
| 17 | 3.4.7 #1 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #1 |
| 18 | 3.4.7 #2 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #10; corrobora #14 |
| 19 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16 |
| 20 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora frontend/vite.config.js:8-10; corrobora microfrontend/vite.config.js:35-37 |
| 21 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | corrobora frontend/nginx.conf:45-46 |
| 22 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #14 |
| 23 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #16 |
| 24 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13 |
| 25 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #16 |
| 26 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16 |
| 27 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #16 |

## Resumo

Observações: 27. Dimensões (tecnologia: 0, configuração: 1, código: 9, estrutura: 3, composição: 1, build-deploy: 2, documentação: 11, histórico: 0). Força (forte: 4, moderada: 10, fraca: 13, ambígua: 0). Evidência (tecnológica: 6, arquitetural: 18, contexto: 3).

## Decisão registrada

`frontend/vite.config.js` (citado na coluna Marcadores da revisão estrutural, 3.4.3, e na Evidência da afirmação 4 da revisão de documentação, 3.4.7) tem um `server.proxy` que encaminha `/mfe` ao servidor de desenvolvimento do microfrontend (frontend/vite.config.js:8-10). Decisão do pesquisador (2026-10-21): o proxy de desenvolvimento é tratado como o `location` do nginx, isto é, encaminhamento de caminho e não declaração do remote, cuja URL está no código (#9). Fica fora da dimensão 2. A regra foi acrescentada ao passo 2 (derivação das observações) do método descrito em `INSTRUCTIONS.md`.
