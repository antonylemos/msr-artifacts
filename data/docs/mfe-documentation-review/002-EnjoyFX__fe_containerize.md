---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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

# 002 — EnjoyFX/fe_containerize

## Leitura do repositório

A documentação está em ucraniano, com diagramas em inglês, e tem três arquivos `.md`:
- **README.md:** visão geral, com diagrama de arquitetura e tabela de serviços.
- **README.docker-compose.md:** deploy com Docker Compose, estrutura, desenvolvimento local e notas de produção.
- **helm/README.md:** deploy em k3s com Helm, com diagrama do cluster e redeploy por serviço.

Os comentários dos artefatos citados pelas revisões anteriores são poucos:
- os Dockerfiles só marcam os estágios ("Build stage", "Production stage");
- o helm/build-and-deploy.sh descreve os passos do script;
- o frontend/nginx.conf explica o proxy do micro-frontend.

Os demais artefatos citados não têm comentários sobre a arquitetura: as configurações Vite, o docker-compose.yml, o chart Helm e o código do frontend e do microfrontend. O `App.jsx` do frontend embute cópias de arquivos do projeto como texto exibido na interface (ex.: frontend/src/App.jsx:122-124); isso é conteúdo de demonstração, não documentação.

A documentação descreve o projeto como uma demonstração de quatro serviços: frontend, backend, microfrontend e banco. O microfrontend é um widget carregado em runtime e servido internamente atrás do proxy do frontend, com dois caminhos de deploy. Tudo isso confere com as revisões anteriores.

Ocorrências `doc-*` que não viraram linha:
- **Estrutura de pastas e comandos:** README.docker-compose.md:69, 98, 132 e 135; helm/README.md:78.
- **Rótulo de diagrama:** README.md:20, dentro da repetição das afirmações 2 e 3.
- **Parâmetros do chart:** helm/README.md:100, 110.
- **Diagrama do cluster:** helm/README.md:128, repetição da afirmação 6.

As demais estão nas afirmações 1, 2, 3, 4, 6, 8 e 10.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.docker-compose.md:3-8 | "Демо застосунок з 4 сервісів […] `microfrontend`: окремий React widget у форматі IIFE" (demonstração com quatro serviços; o microfrontend é um widget React separado, em formato IIFE) | estrutura | corroborada | 3.4.3 (frontend e microfrontend `Yes`); microfrontend/vite.config.js:25-29; docker-compose.yml:2-46 |
| 2 | README.docker-compose.md:19 | "loads JS bundle at runtime" (o frontend carrega o bundle do microfrontend em runtime) | composição | corroborada | 3.4.4 (frontend/src/RemoteWidget.jsx:8, `script-loading`); 3.4.5 #1; frontend/src/App.jsx:802 |
| 3 | README.docker-compose.md:21-24 | "Micro-frontend […] internal" (o microfrontend não é exposto diretamente) | build-deploy | corroborada | 3.4.6 #2; docker-compose.yml:35-37; helm/fe-containerize/templates/microfrontend.yaml:43-56 |
| 4 | README.docker-compose.md:150-152 | "`frontend/vite.config.js` проксіює `/api` […] `/mfe` на `http://localhost:3001` […] `microfrontend/vite.config.js` проксіює `/api`" (em desenvolvimento, o Vite do frontend encaminha `/mfe` ao microfrontend, e os dois encaminham `/api` ao backend) | build-deploy | corroborada | frontend/vite.config.js:8-10; microfrontend/vite.config.js:35-37 |
| 5 | README.docker-compose.md:158 | "`frontend/nginx.conf` проксіює `/api` до `backend:8000`" (o nginx do frontend encaminha `/api` ao backend) | build-deploy | corroborada | frontend/nginx.conf:45-46 |
| 6 | README.docker-compose.md:159 | "`frontend/nginx.conf` проксіює `/mfe` до `microfrontend:80`" (o nginx do frontend encaminha `/mfe` ao microfrontend) | build-deploy | corroborada | 3.4.5 #1 (Configuração); frontend/nginx.conf:57-58 |
| 7 | README.md:3-6 | "два варіанти деплою: Docker Compose […] k3s + Helm" (duas formas de deploy) | build-deploy | corroborada | 3.4.6 (Leitura); docker-compose.yml:1-49; helm/fe-containerize/Chart.yaml:1-6 |
| 8 | README.md:32 | "`microfrontend` […] Незалежний widget" (widget independente) | independência | corroborada | 3.4.3 (microfrontend com entrada e build próprios); microfrontend/index.html; microfrontend/src/main.jsx |
| 9 | frontend/nginx.conf:56 | "Proxy micro-frontend assets (no cache — bundle changes on redeploy)" (o bundle do micro-frontend muda a cada redeploy dele) | build-deploy | corroborada | 3.4.6 #2 (deploy separado); frontend/nginx.conf:61-62 |
| 10 | helm/README.md:47 | "microfrontend.yaml # MFE: Deployment + Service" (o MFE tem Deployment e Service próprios no k3s) | build-deploy | corroborada | 3.4.6 #2; helm/fe-containerize/templates/microfrontend.yaml:1-56 |
| 11 | helm/README.md:154-158 | "Редеплой після змін у коді […] Один сервіс (наприклад frontend)" (redeploy de um único serviço) | build-deploy | corroborada | 3.4.6 #1-#2; helm/README.md:160-170; docker-compose.yml:35-41 |

## Observações

**1. README.docker-compose.md:3-8.** Os quatro serviços listados correspondem aos quatro do compose. Frontend e microfrontend são as duas aplicações `Yes` da revisão estrutural, e o microfrontend é construído como biblioteca IIFE com global `MicroFrontendWidget`. Repetições: README.md:3 e a tabela de serviços (README.md:28-33).

**2. README.docker-compose.md:19.** O diagrama mostra o frontend carregando o bundle do micro-frontend em runtime. O frontend renderiza `RemoteWidget` com `/mfe/widget.iife.js` (frontend/src/App.jsx:802), e o componente injeta o script e monta o widget pela API global (ver a revisão de composição). Repetição: README.md:17.

**3. README.docker-compose.md:21-24.** "internal" confere com os dois arranjos. No compose, o serviço `microfrontend` não publica porta (docker-compose.yml:35-37). No Helm, ele tem Service, mas não tem Ingress (helm/fe-containerize/templates/microfrontend.yaml:43-56). Repetições: README.md:19-23 e README.docker-compose.md:156.

**4. README.docker-compose.md:150-152.** Em desenvolvimento, o papel do nginx é do proxy do Vite: o frontend encaminha `/api` ao backend e `/mfe` ao servidor do microfrontend na porta 3001 (frontend/vite.config.js:8-10), e o microfrontend também encaminha `/api` ao backend (microfrontend/vite.config.js:35-37). Quando roda sozinho, o microfrontend pode chegar ao backend pelo próprio proxy. Integrado ao frontend, a sua requisição relativa a `/api` (microfrontend/src/Widget.jsx:45) usa a origem do frontend e passa pelo proxy dele.

**5. README.docker-compose.md:158.** O nginx do frontend tem a rota `/api/` com `proxy_pass http://backend:8000/api/` (frontend/nginx.conf:45-46). Em produção, as chamadas do microfrontend a `/api` chegam ao backend por esse mesmo proxy, porque ele é servido sob a origem do frontend.

**6. README.docker-compose.md:159.** O nginx do frontend tem a rota `/mfe/` com `proxy_pass http://microfrontend:80/` (frontend/nginx.conf:57-58). Repetições: README.md:30 ("проксює /api та /mfe", que também repete a afirmação 5) e o diagrama do cluster (helm/README.md:117-133).

**7. README.md:3-6.** O repositório traz os dois caminhos de deploy: o compose na raiz e o chart Helm em `helm/`, com o script helm/build-and-deploy.sh.

**8. README.md:32.** O microfrontend tem página, entrada e build próprios e roda sozinho no servidor de desenvolvimento (README.docker-compose.md:132-138). Isso sustenta "independente" no sentido de rodar e ser construído sozinho.

**9. frontend/nginx.conf:56.** O comentário supõe que o micro-frontend é republicado à parte e, por isso, desliga o cache desse caminho (frontend/nginx.conf:61-62). A separação de imagem e de serviço registrada na revisão de build e deploy confirma que isso é possível.

**10. helm/README.md:47.** O chart tem um Deployment e um Service só para o microfrontend, com imagem própria (helm/fe-containerize/values.yaml:7).

**11. helm/README.md:154-158.** O README descreve o redeploy de um único serviço: rebuild só do `frontend`, importação só da imagem dele e recriação só dos pods dele (helm/README.md:160-170). Como cada serviço tem `build` próprio no compose, o mesmo vale para o microfrontend.

## Resumo

Afirmações: 11 (corroborada: 11, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 1, composição: 1, build-deploy: 8, independência: 1).
