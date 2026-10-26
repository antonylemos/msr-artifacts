---
schema: 1
id: 1104280056
full_name: 4d-depot/HDI_Qodly_Pro_Session_Sharing
url: https://github.com/4d-depot/HDI_Qodly_Pro_Session_Sharing
commit: d48ce168ca0299322a5227d1c5cc506c8daeb3b1
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 010 — 4d-depot/HDI_Qodly_Pro_Session_Sharing

## Contexto

- **Tipo de repositório:** example/proof of concept (demo "HDI", How Do I, da 4D sobre compartilhamento de sessão entre 4D e Qodly)
- **Classificação:** Non-MFE (via Q5, com justificativa; pede revisão conjunta)

O repositório é um projeto 4D (banco + linguagem 4D) com uma página Qodly (plataforma low-code web da 4D). Não há `package.json` nem código-fonte JavaScript autoral. Duas estruturas lembram composição de frontends:

1. **Web area 4D → página Qodly:** um formulário desktop 4D embute a página Qodly numa web area, compartilhando a sessão por OTP.
2. **Custom components Qodly:** dois widgets pré-compilados (mapa e rating) da "Qodly Team", distribuídos como remotes de Module Federation e carregados pelo renderer Qodly, que é a plataforma e está fora do repositório.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | Nenhum `package.json`; projeto 4D (`Project/warehouse_locator.4DProject`, `Project/Sources/**/*.4dm`) | ausente |
| Configuração (composição) | `Project/Sources/Shared/CustomComponents/manifest.json:2-27`: dois componentes, `qodly_map` 0.4.6 e `qodly_rating` 0.3.0, cada um com `scope`, `module: "components"`, `remoteEntryFileName: "components.js"` e `url` em `/$shared/CustomComponents/...`; autor "Qodly Team" (`:6-9`, `:19-22`) | moderada |
| Build/deploy (artefatos) | `CustomComponents/qodly_*/components.js` + `assets/*__loadShare__*`, `*__mf_v__runtimeInit__*`, `virtualExposes-*.js`, `hostInit-*.js`: saída compilada de Module Federation (Vite), sem fonte no repositório (tecnologia) | moderada |
| Composição (uso) | `Project/Sources/WebForms/warehouses.WebForm:776` usa `SingleMap` e `:857`/`:896` usa `Rating`; a página Qodly consome os widgets remotos | moderada |
| Composição (host) | Quem carrega os remotes é o renderer Qodly (`/$lib/renderer/`), parte da plataforma 4D, não do repositório | contexto |
| Código-fonte (embed desktop) | `Project/Sources/Forms/Home/form.4DForm:88-99`: objeto `webArea` `warehouseDetails`; `ObjectMethods/warehouseDetails.4dm:7-10`: `authentify`, `getOTP` e `WA OPEN URL` para `http://localhost/$lib/renderer/?w=warehouses&$4DSID=<otp>`; `ObjectMethods/warehouseList.4dm:12`: `WA EXECUTE JAVASCRIPT FUNCTION(… "Qodly.setSource" … "warehouseId" …)` | moderada |
| Código-fonte (sessão) | `Project/Sources/Methods/getOTP.4dm:12` `Session.createOTP(60)`; `Methods/authentify.4dm:5-6` define privilégios da sessão | moderada |
| Estrutura | Uma página Qodly (`WebForms/warehouses.WebForm`) e um formulário desktop 4D (`Forms/Home`); `WebFolder/index.html` é a página padrão do servidor 4D | ambígua |
| Build/deploy | Sem CI/CD; tudo é servido pelo mesmo servidor 4D | contrária |
| Documentação | `README.md:1-3` remete a um post do blog da 4D e explica como abrir o projeto no 4D; nenhuma menção a micro-frontends | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | A página Qodly + os dois remotes (`qodly_map`, `qodly_rating`) referenciados pela config de composição (`CustomComponents/manifest.json:2-27`) |
| Q2 | Yes | Os widgets têm build e versão próprios (pré-compilados pela Qodly Team, `manifest.json:4,17`); não há import de código-fonte. Ressalva: estão vendorizados e são servidos pelo mesmo servidor, sem deploy separado. |
| Q3 | Yes | Os widgets são renderizados na mesma página (`warehouses.WebForm:776,857`) pelo renderer Qodly |
| Q4 | Yes | Remotes MF (`components.js`, `loadShare`, `runtimeInit`) registrados no manifesto e usados na página |
| Q5 | **No** (override) | Ver justificativa abaixo |

## Justificativa do Q5

O checklist é satisfeito literalmente em Q1–Q4, mas a evidência não sustenta uma arquitetura de MFE:

- **As unidades são widgets, não partes da aplicação.** `qodly_map` e `qodly_rating` são componentes de UI reutilizáveis de terceiros (autor "Qodly Team"), equivalentes a uma biblioteca de componentes. Não decompõem o frontend da aplicação em partes com responsabilidade própria.
- **O MF é o mecanismo de plugin da plataforma, não uma escolha arquitetural do repositório.** O host é o renderer Qodly, e os remotes são artefatos compilados copiados para o projeto. O repositório não configura federação nenhuma, só consome o mecanismo de extensão da plataforma low-code.
- **Casos Non-MFE mais próximos:** "component libraries using Web Components" (aqui via MF) e "Module Federation used only for code sharing, not for composing frontend units".
- **A web area 4D não muda o quadro.** É um app desktop 4D embutindo uma página web num webview, o que cai na decisão em aberto "link-only or iframe composition". O formulário 4D também não é uma unidade frontend web.

## Motivo

- Q5 é No por override, então o repositório é Non-MFE.
- O repositório é uma demo de compartilhamento de sessão 4D ↔ Qodly, e os sinais de MF vêm de artefatos da plataforma.

## Notas para análise

- **RQ1 (sinais enganosos):** artefatos compilados com nomes de MF (`__loadShare__`, `remoteEntryFileName`) aparecem sem nenhuma config de federação autoral. Uma busca automática por esses termos geraria falso positivo.

## Ponto para revisão conjunta

- O override de Q5 deve ser revisado em conjunto, pelas regras do checklist.
- Se o caso se repetir (plataformas low-code ou CMS que usam MF ou Web Components como mecanismo de plugin), vale virar regra explícita, por exemplo: "plugins/extensões carregados pelo mecanismo de uma plataforma externa, sem configuração de composição autoral, são Non-MFE".
- A web area 4D com OTP depende da decisão em aberto sobre iframe/webview.
