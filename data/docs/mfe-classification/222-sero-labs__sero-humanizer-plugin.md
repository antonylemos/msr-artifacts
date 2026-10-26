---
schema: 1
id: 1191011861
full_name: sero-labs/sero-humanizer-plugin
url: https://github.com/sero-labs/sero-humanizer-plugin
commit: 3acd5e15eb656c8a8aa967ca9547b4adf78f3ac1
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 222 — sero-labs/sero-humanizer-plugin

## Contexto

Plugin “Humanizer” do Sero (`package.json:2–4`; `README.md:1–5`). Ele reescreve textos com estilos e remove padrões de escrita de IA, e tem duas partes:
- uma extensão Pi para o agente (`extension/index.ts`), com ferramenta, comando e uma skill (`skills/humanizer/SKILL.md`);
- uma UI web React construída como remote Module Federation (`vite.config.ts:1–52`), que o host Sero carrega e monta na área principal (`README.md:41–46`).

O manifesto declara a app para o Sero (`package.json:23–45`), com `"ui": "./dist/ui/remoteEntry.js"` e `"component": "HumanizerApp"`. O host Sero não está no repositório. O nome do repositório e o da organização não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:223` registra rank 222, ID 1191011861, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:223` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:27135` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:27141` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:2000..2249` / `"@module-federation" filename:package.json size:2000..2249` | `package.json` | 2026-10-07T19:59:44.705Z / 2026-10-08T15:42:41.920Z |

O `package.json` tem 2.200 bytes no SHA, dentro da faixa, e declara `"@module-federation/vite": "1.21.6"` (`:60`). Esse valor foi gravado pelo próprio SHA, `3acd5e1` (2026-09-26, “upgrade Module Federation Vite to 1.21.6”), antes das coletas. Os metadados do hit de código trazem só a descrição “Humanizer app for Sero — transform text with creative writing styles and remove AI patterns”, sem tópicos nem datas. A entrada é só por código. O README não contém termos de micro-frontend nem de Module Federation.

Nas duas rodadas, a mesma organização tem outros 17 candidatos, entre eles `sero-labs/sero` (ID 1152424927) e vários `sero-*-plugin`. Na amostra, só este repositório aparece (`sample.csv:223`).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 40 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único pacote: `ui/` (app React, `index.html` “Sero Humanizer (remote)”, componentes e libs), `extension/` (extensão Pi), `shared/types.ts`, `skills/`, `vite.config.ts` e `package.json`. | contexto |
| Configuração (remoto) | `vite.config.ts:21–36`: `federation({ name: 'sero_humanizer', filename: 'remoteEntry.js', manifest: true, exposes: { './HumanizerApp': './ui/HumanizerApp.tsx' }, shared: react/react-dom/streamdown singleton })`. O comentário diz “The host (Sero on 5173) declares this as a remote and imports components via MF” (`:4–5`). Porta própria 5192 (`:38–42`). | forte |
| Contrato com o host | `package.json:23–34`: `sero.app` com `ui: "./dist/ui/remoteEntry.js"`, `component: "HumanizerApp"`, `devPort: 5192`, `styleIsolation: "scope"`. `ui/HumanizerApp.tsx:18`, `37–39`: usa `useAppState` e `useAI` do runtime da plataforma (`@sero-ai/app-runtime`). `README.md:9–16`: o Sero clona, instala, constrói a UI e a carrega na barra lateral. | forte |
| Host | O host Sero não está no snapshot. Ele aparece como candidato `sero-labs/sero` nas rodadas, fora da amostra e não inspecionado. | ambígua |
| Código-fonte (fronteiras) | Imports relativos só dentro do pacote: `ui/` e `extension/` compartilham `../shared/types` (`ui/HumanizerApp.tsx:22–23`; `extension/index.ts:21–22`), que são tipos do próprio plugin. Não há outra unidade frontend. | contexto |

## Autoria e histórico

Clone não raso; 21 commits lineares, nenhum merge, da mesma pessoa: 15 como monobyte e 6 como Dan Carter, com o mesmo e-mail.
- **Raiz:** `c2ddd55` (2026-03-24, “feat(SERO-008): initial plugin scaffold — @sero-ai/plugin-humanizer”).
- **Evolução:** governança em abril (licença, CODEOWNERS, CI); depois, atualizações de SDK, de runtime da plataforma e do Module Federation (`e54aa46`, SHA `3acd5e1`).

O README de instalação aponta `github.com/monobyte/sero-humanizer-plugin` (`README.md:12`), compatível com transferência, renomeação ou origem anterior, mas isso não prova a transferência do repositório; o vínculo atual com Sero é mais diretamente sustentado por `CONTRIBUTING.md:5`, pelo manifesto e pelo runtime da plataforma. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --all --missing=print` encontra 28 objetos históricos ausentes; os arquivos do SHA usados como evidência foram lidos, e as mensagens e status dos commits estão disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`ui/`); a configuração de composição deste repositório só tem `exposes`, sem referenciar outra unidade. |
| Q2 | Yes | Entrada, build (`vite build`, `package.json:10–14`) e porta próprios; instalada e construída separadamente pelo host (`README.md:15–16`). |
| Q3 | Undetermined | O host Sero não é observável; o manifesto e o comentário indicam montagem pelo host (`package.json:31–32`; `vite.config.ts:4–5`). |
| Q4 | Undetermined | Mecanismo preparado do lado do remoto (`exposes`, `remoteEntry.js`, manifesto), mas a conexão depende do host ausente. |
| Q5 | No | Uma unidade preparada para composição por host externo não observável. |

## Motivo

- `MFE-unit` pela regra “single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, com o vetor de exceção (`q1: no`, `q2: yes`, `q3/q4: undetermined`, `q5: no`) dos finais 001/050/069/004/058.
- É o mesmo caso dos rascunhos 161 e 189: remoto Module Federation para a plataforma de extensões da própria organização, com manifesto e runtime da plataforma. Por isso o status é `review`, à espera da mesma decisão sobre 037 (plugin de plataforma, final `Non-MFE`).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: production`, por ser plugin publicado, com versão, CI, licença e política de segurança; se a revisão preferir `example`, como em 161/189, o campo acompanha a decisão.

## Notas para análise

- **RQ2:** plugins de uma aplicação desktop de agente de IA (Sero) distribuídos como remotos Module Federation Vite, com isolamento de CSS (`seroPluginCssScope`, `vite.config.ts:20`) e estado mediado pelo host.
- **Protocolo (amostra):** a organização tem 18 candidatos em cada rodada (o host e muitos plugins), só um na amostra; o host está fora da amostra.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

1. **Plugin de plataforma de primeira parte:** um remoto Module Federation preparado para o host de extensões da própria organização conta como MFE-unit ou segue 037?
   - **MFE-unit (proposto):** `exposes`, `remoteEntry.js`, `shared` singleton e contrato explícito com o host, como em 161/189.
   - **Non-MFE:** segue 037, porque o único host é o mecanismo de plugins de uma plataforma.
2. **`repo_type`:** `production` (plugin publicado e mantido) ou `example`, como foi usado em 161/189.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`, coerente com 161 e 189.
- **Contribuição da revisão independente (Lupa):** concordância provisória com MFE-unit e `review`: a unidade React está explicitamente preparada para composição por Module Federation e o host consumidor não é observável (montagem apenas documentada, `README.md:15–16,43–46`; a busca local por clone do host não deu resultado). O vetor No/Yes/Undetermined/Undetermined/No é coerente com a exceção. A decisão real é o enquadramento pelo precedente de plataforma 037; o simples uso do nome "plugin" não elimina a preparação comprovada. Os finais 001, 050 e 069 enquadram como MFE-unit uma única unidade com exposição e contrato explícitos e host ausente, e 004 e 058 confirmam o vetor. A revisora recomenda manter `repo_type: production` (sem segunda decisão pendente) e concentrar o ponto de revisão no escopo da regra de plugins; se prevalecer Non-MFE por 037, será preciso ajustar classe e `approaches` ao padrão do template, preservando no corpo a federação observada. O README foi alterado pela última vez em `80802ec` (2026-03-24), anterior às buscas.
