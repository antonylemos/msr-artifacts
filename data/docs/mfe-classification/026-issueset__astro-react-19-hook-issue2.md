---
schema: 1
id: 1145306346
full_name: issueset/astro-react-19-hook-issue2
url: https://github.com/issueset/astro-react-19-hook-issue2
commit: f229f38065bc24ad660216843305306500d4c003
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [astro, preact, react, solid, svelte, vue]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 026 — issueset/astro-react-19-hook-issue2

## Contexto

- **Tipo de repositório:** example/proof of concept (reprodução de bug, nome "…-hook-issue2", sobre o template oficial `framework-multiple` do Astro)
- **Commit avaliado:** `f229f38` (único commit, "init")

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:1` "Kitchen Sink: Microfrontends with Astro"; `:3-5` gerado por `npm create astro@latest -- --template framework-multiple`; `:11` "showcases Astro's built-in support for multiple frameworks" | contexto |
| Tecnologia | `package.json:2` `@example/framework-multiple`; `:13-22` integrações `@astrojs/{preact,react,solid-js,svelte,vue}` | fraca |
| Configuração | `astro.config.mjs:13-19`: as cinco integrações de framework num único projeto Astro (multi-framework) | moderada |
| Código-fonte | `src/pages/index.astro:5-11` importa estaticamente um contador por framework de `src/components/<framework>/`; `:27-40` renderiza cada um como ilha (`client:visible`) | ambígua |
| Estrutura | Um único projeto (um `package.json`, um build Astro); os componentes são arquivos dentro do mesmo `src/` | contrária |
| Build/deploy | Um único build; `.codesandbox/Dockerfile` só para sandbox | contrária |
| Histórico | Um único commit | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (projeto Astro); os contadores são componentes, não unidades com entry ou build próprios |
| Q2 | No | Os componentes compartilham build e são importados diretamente (`index.astro:5-11`) |
| Q3 | No | A página importa componentes; não carrega, monta ou roteia unidades independentes |
| Q4 | No | Islands do Astro com vários frameworks são composição de componentes em build-time dentro de uma app, não um mecanismo conectando unidades independentes |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- É o template oficial "framework-multiple" do Astro, copiado para reproduzir um bug (React 19 hooks). O título "Microfrontends with Astro" é do template.
- Misturar frameworks numa mesma página (ilhas) não torna os componentes unidades relativamente independentes: não têm entry, build ou deploy próprios.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them".

## Notas para análise

- **RQ1 (sinais enganosos):** multi-framework ≠ MFE. Ter React, Vue, Svelte, Solid e Preact na mesma página aparenta heterogeneidade de MFE, mas é uma única unidade com um build só.
- **Protocolo (duplicatas):** repositórios de reprodução de issue baseados em templates oficiais tendem a repetir o mesmo conteúdo (o nome sugere que existe um "issue1"). Vale checar se há outros clones do template na amostra.
