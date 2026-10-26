---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
url: https://github.com/LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [wordpress]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Contexto

- **Abordagem de implementação:** Web Components: custom element remoto (`<x-subscriberform>`) carregado por `<script type="module">` de outra origem e embutido numa página WordPress
- **Tipo de repositório:** example/proof of concept (trabalho da disciplina UX308, a partir do template `cd-wordpress`/`wp-pwa`)
- **Classificação:** MFE-implemented (pede revisão: composição em conteúdo de CMS, unidade externa trivial)

O repositório é um site WordPress (Playground + SQLite) exportado como site estático para o GitHub Pages pelo `wp-pwa` (`package.json`, `.github/workflows/main.yml:30`). O template declara a intenção explícita: "The idea of this is as a consumer of microfrontends… Have fun composing work from autonomous teams" (`README.md:12-16`). A composição não está em arquivos de código, e sim no **conteúdo das páginas**, gravado no banco SQLite versionado (`wp-content/database/.ht.sqlite`).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:12-16`: "a consumer of microfrontends… example microfrontend for paypal standard… composing work from autonomous teams" | contexto |
| Estrutura | Site WordPress (`wp-content/themes/*`, `wp-content/plugins/*`, `mu-plugins`) como unidade host; nenhum código do MFE consumido no repositório | contexto |
| Composição (conteúdo) | `wp-content/database/.ht.sqlite` (conteúdo de página): `<link rel="stylesheet" href="https://lebleb03.github.io/Contact_form_UX308/x-form.css">`, `<script src="https://lebleb03.github.io/Contact_form_UX308/x-form.js" type="module">` e o elemento `<x-subscriberform></x-subscriberform>` na seção "Subscriber Form" (3 ocorrências, provavelmente revisões) (composição em runtime) | forte |
| Composição (unidade externa) | `Contact_form_UX308`: outro repositório do mesmo autor, publicado no GitHub Pages (`lebleb03.github.io`) e fora da amostra; definição do elemento não observável | ausente |
| Build/deploy | `.github/workflows/main.yml:30`: `diy-pwa/npm-build-2-gh-pages` publica o site; a unidade externa tem deploy próprio (outra origem) (deploys independentes) | moderada |
| Código-fonte (ruído) | `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1-7`: custom element trivial `x-year` de um plugin do Playground (não usado como unidade) (sinal enganoso) | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O site WordPress (host) + a unidade externa `x-form`/`x-subscriberform`, referenciada pela composição na página (script + elemento) |
| Q2 | Yes | A unidade externa é implantada separadamente (outra origem, `lebleb03.github.io/Contact_form_UX308/`); nenhum código dela no repositório |
| Q3 | Yes | A página do host monta o elemento na seção de formulário |
| Q4 | Yes, com ressalva | `<script type="module">` remoto + custom element usado no conteúdo; que `x-form.js` define `<x-subscriberform>` é inferência (o código do remote não está na amostra) |
| Q5 | Yes, com ressalva | Ver ponto de revisão |

## Motivo

- Q1–Q5 são Yes, o que leva a MFE-implemented, no padrão do repositório 043 (Web Components carregados de outra origem em runtime) e do 008 (só o host no repositório, referenciando unidade externa).
- A intenção arquitetural é explícita (template "consumer of microfrontends"), e o autor criou a unidade externa num repositório separado com deploy próprio.

## Notas para análise

- **RQ1:** artefato de composição incomum: conteúdo de página em banco de dados versionado. Uma busca por arquivos de código/configuração não encontraria a composição.
- **Protocolo (família):** template `cd-wordpress` da organização `diy-pwa` (curso UX308); outros trabalhos da mesma disciplina podem aparecer na amostra.

## Ponto para revisão conjunta

- **Composição em conteúdo de CMS:** a evidência está num banco SQLite binário versionado, não em código ou configuração. Isso é difícil de minerar e pode ser visto como "embed snippet" de widget em vez de arquitetura.
- **Escala:** a unidade externa é um formulário de inscrição; a composição é um único embed. Se o estudo exigir que o host seja uma aplicação frontend (não uma página de CMS) ou que a composição esteja em artefato de código, o caso passa a **Non-MFE**.
- **Diferença em relação aos plugins de plataforma (010, 022, 035, 037):** aqui o autor criou e compõe as duas unidades; a plataforma (WordPress) só hospeda o conteúdo, não é o mecanismo de composição.
