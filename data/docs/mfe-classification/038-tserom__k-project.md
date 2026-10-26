---
schema: 1
id: 1239974847
full_name: tserom/k-project
url: https://github.com/tserom/k-project
commit: d185434a0251651028b02445c78ea27e6feb3f71
classification: Uncertain
checklist: { q1: undetermined, q2: yes, q3: undetermined, q4: undetermined, q5: undetermined }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: null
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 038 — tserom/k-project

## Contexto

Meta-repositório de workspace: documentação, orquestração Docker e gateway. Ele agrega fisicamente vários repositórios independentes (`README.md:3`), mas os diretórios `apps/` e `vendor/` são **explicitamente ignorados** (`.gitignore`: "根仓库只跟踪工作区元文件；各应用在各自目录内单独 git", ou seja, o repositório raiz só rastreia metarquivos do workspace; cada app tem seu próprio git). Nenhum código das apps (host, sub-apps, backend) está no repositório.

A abordagem **declarada** é wujie (无界, micro-frontend baseado em iframe/Web Components) com host `wujie-react`, mas ela não é observável aqui. A branch padrão é `cursor/workspace-meta-docs`.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Só docs (`docs/*.md`), `infra/docker/docker-compose.yml`, `infra/gateway/*` (nginx), scripts e arquivos de agentes (`.cursor/`, `.claude/`, `openspec/`); `/apps/` e `/vendor/` no `.gitignore`. Nenhuma unidade frontend no repositório. | ausente |
| Documentação | `README.md:9-15`: `apps/host` (父应用, host wujie, React 17 + Vite + `wujie-react`), `apps/user-front` e `apps/hello-front` (子应用, sub-apps), `apps/user-backend` (Go); `docs/MICROFRONTEND.md:3-20`: papéis host/sub-apps, entradas `/micro/hello/` e `/micro/user/`, token compartilhado em `localStorage` | moderada |
| Build/deploy | `infra/docker/docker-compose.yml:63-84`: serviços `inventory-front`, `hello-front`, `user-front` e `host`, cada um com `build.context: ../../apps/<app>` (diretórios ausentes do repositório); unidades separadas por referência | moderada |
| Configuração (gateway) | `infra/gateway/nginx.docker.conf:42-78`: `location /micro/hello/`, `/micro/user/`, `/micro/inventory/` → upstreams dos sub-apps; `location /` → upstream do host (mesma origem, `k-project.com`). Roteamento de mesma origem, não a composição em si. | ambígua |
| Composição | O mecanismo declarado (wujie no `apps/host`) não é observável: o código do host não está versionado aqui | ausente |
| Histórico | `main` (`525adb1`) também só tem metarquivos (docs, `.cursor/`, `Makefile`) | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Undetermined | Host e sub-apps são referenciados pelo compose e pelo gateway, mas não pela configuração de composição do wujie, que está no host ausente |
| Q2 | Yes | Unidades externas com build e serviço próprios (`docker-compose.yml:63-84`) |
| Q3 | Undetermined | O host que monta os sub-apps é referenciado, mas não observável |
| Q4 | Undetermined | wujie declarado na documentação; nenhuma configuração ou código de composição no repositório |
| Q5 | Undetermined | A documentação e a infraestrutura são coerentes com um MFE real, mas o mecanismo não é observável |

## Motivo

- Nenhuma resposta é No, mas Q1, Q3 e Q4 são Undetermined, o que leva a **Uncertain**.
- Não é MFE-unit: o repositório não contém nenhuma unidade frontend, só a orquestração e a documentação de um sistema cujo código está em outros repositórios.
- A inspeção adicional não resolve a dúvida dentro do repositório, porque o código está fora por decisão explícita (`.gitignore`). Pelo protocolo, o caso deve permanecer Uncertain e ser excluído.

## Notas para análise

- **Protocolo (ecossistema multi-repositório):** caso claro de MFE distribuído (seção 5.1 do protocolo) cujo meta-repositório descreve a arquitetura sem conter as unidades.
- **RQ2:** wujie (无界) é uma abordagem não prevista inicialmente (comum no ecossistema chinês, junto com qiankun do repositório 029).

## Decisão registrada

Manter **Uncertain**. O repositório documenta uma arquitetura Wujie e a infraestrutura que a serve, mas exclui explicitamente as aplicações e o fornecedor da árvore versionada. Sem o código do host ou das subaplicações, a composição não é verificável neste snapshot.
