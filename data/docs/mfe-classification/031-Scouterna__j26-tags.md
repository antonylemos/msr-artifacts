---
schema: 1
id: 1313837166
full_name: Scouterna/j26-tags
url: https://github.com/Scouterna/j26-tags
commit: 1e7f7bfd70988433954f285ca160849307048150
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [iframe]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 031 — Scouterna/j26-tags

## Contexto

- **Abordagem de implementação:** composição por iframe num shell externo (`j26-app`), com registro de navegação por endpoint HTTP e comunicação por `postMessage`
- **Tipo de repositório:** production-oriented application (registro de tags RFID do evento Jamboree26, imagem Docker publicada por CI)
- **Classificação:** MFE-unit (depende da decisão em aberto sobre composição por iframe)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:7-8` "Runs as a micro-frontend in an iframe inside the **j26-app** shell, mounted at `/_services/tags`."; `CLAUDE.md:13` repete | moderada |
| Estrutura | Uma única app TanStack Start (frontend + rotas de servidor + Prisma) | contrária |
| Configuração | `vite.config.ts:8-17`: `BASE = "/_services/tags"` aplicado em `base`, `nitro({ baseURL })` e `tanstackStart({ router: { basepath } })`; `src/router.tsx:7` `basepath: "/_services/tags"`. A app é montada sob um prefixo do shell. | moderada |
| Código-fonte (registro no shell) | `src/routes/api/app-config.ts:7-11`: "Shell navigation registration. j26-app fetches this and only renders the nav item when it returns 200"; `:24-45`: devolve itens de navegação (`/_services/tags`, `/_services/tags/admin`) por permissão (contrato com o host) | forte |
| Código-fonte (comunicação) | `src/lib/use-app-bar-title.ts:3-13`: `window.parent.postMessage({ type: "j26:appBar", title }, origin)`, o protocolo de mensagens com o shell que a embute (contrato com o host) | forte |
| Composição | O shell `j26-app` (que faz fetch de `/api/app-config` e embute a app em iframe) não está no repositório | ausente |
| Build/deploy | `Dockerfile`, `.github/workflows/build-image.yml:41-53`: imagem própria publicada no registry; deploy independente | moderada |
| Documentação (ecossistema multi-repositório) | Autenticação Keycloak compartilhada no ecossistema J26 (`README.md:182-183`, repositório `j26-keycloak`) | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; nenhuma configuração de composição no repositório referencia outras unidades |
| Q2 | Yes (para a unidade) | Build, imagem Docker e deploy próprios (`build-image.yml`) |
| Q3 | Undetermined | O shell `j26-app` que embute a app não está no repositório |
| Q4 | Undetermined | O lado da unidade está implementado (`app-config`, `postMessage`, basepath); o mecanismo do host não é observável, e é iframe (decisão em aberto) |
| Q5 | No | A evidência mostra uma unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No; aplica-se a exceção MFE-unit: "a single frontend unit explicitly prepared to be composed by an external host… but the composing host is not observable".
- A preparação é explícita e implementada: basepath sob o prefixo do shell, endpoint de registro de navegação consumido pelo shell e protocolo `postMessage` para a barra de título.
- Corresponde ao caso "repositories containing only a remote unit, without the composing host", aqui com iframe em vez de MF ou single-spa.

## Notas para análise

- **Protocolo (ecossistema multi-repositório):** a arquitetura completa (shell `j26-app` + serviços como este) está distribuída em vários repositórios da organização Scouterna; um caso de MFE multi-repositório em produção.
- **RQ2:** abordagem por iframe com contrato HTTP + `postMessage`, sem nenhuma dependência de MFE.

## Ponto para revisão conjunta

- **Decisão em aberto "link-only or iframe composition":** se iframe não contar como mecanismo de composição, este repositório passa a Non-MFE.
- Argumento para contar: aqui não é um iframe solto, mas um contrato bidirecional com o shell (registro dinâmico de navegação por permissão + mensagens tipadas `j26:appBar`). Sugestão de regra: "iframe conta quando há contrato explícito de integração com o host (registro, mensagens, roteamento); iframe isolado não conta".
