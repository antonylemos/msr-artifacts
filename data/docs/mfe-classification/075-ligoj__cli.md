---
schema: 1
id: 1135961166
full_name: ligoj/cli
url: https://github.com/ligoj/cli
commit: f06760f6d733a6c17f379b6dd141f07901892676
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 075 — ligoj/cli

## Contexto

Cliente de linha de comando Python para a API REST do Ligoj, com ferramentas de ambiente de desenvolvimento e geração/manutenção de plugins (`pyproject.toml:12–18`, `ligojcli/dev_plugin.py:92–108`). O candidato contém o gerador e a automação; os projetos Ligoj e seus plugins são entradas externas dessas ferramentas, não aplicações frontend presentes neste repositório.

Clone conferido como `data/samples/mfe-sample-001/repos/ligoj__cli/`. Rank, ID e SHA correspondem à linha `cloned` em `data/samples/mfe-sample-001/clones.csv:76`. `git rev-parse HEAD` retornou o SHA do front matter, e `git cat-file -t` confirmou o objeto como commit. Toda a inspeção usou `git ls-tree`, `git show` e `git grep` nesse SHA, sem executar a CLI, o gerador, os builds ou os deploys.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Código-fonte / Build/deploy | Inventário completo por `git ls-tree -r --name-only` no SHA: 78 arquivos; sem gitlinks no inventário por `git ls-tree -r`. Foram procurados manifestos `package.json`, configurações `vite.config`, `webpack` e `rspack`, fontes `.vue`, `.tsx`, `.jsx`, documentos `.html`, `Dockerfile` e `pom.xml`: nenhum desses caminhos está versionado. O build efetivo do candidato é Python/setuptools (`pyproject.toml:1–9`), com comando de console em `pyproject.toml:54–55`; `Makefile:55–57` constrói sdist/wheel via `uv build`. A árvore não contém unidade frontend instanciada. | ausente |
| Código-fonte / Configuração | `pyproject.toml:54–55` liga o comando `ligoj` a `ligojcli.ligoj:ligoj`; `ligojcli/ligoj.py:28–45` configura os subcomandos, e `:59–79` executa ações e prepara saída JSON. É uma interface de terminal, sem shell de aplicação web nesses artefatos. | contrária |
| Código-fonte (geração) | `ligojcli/dev_plugin.py:125–128` escolhe um novo diretório de saída; `:143–145` chama a geração. `:204–226` enumera os arquivos a produzir, incluindo `ui/package.json`, `ui/vite.config.js` e `ui/src/index.js`; `:233–238` chama os builders e grava seus textos. Esses caminhos são saídas do gerador, não arquivos frontend encontrados no commit. | contexto |
| Tecnologia / Configuração (template) | `ligojcli/dev_plugin.py:611–643` retorna uma string de manifesto Vue/Vite; `:646–689` retorna uma string de configuração Vite. O template define uma entrada de biblioteca e externaliza `@ligoj/host` (`:663–668`), enquanto resolve o host em um checkout irmão (`:651–659`). `:726–762` e `:763–797` são variantes parametrizadas do índice do plugin. Não são duas aplicações concretas nem um host que as compõe neste candidato. O template de `service.js` (`:800–830`, com `renderServiceLink`, `toolPluginId` e `delegateFeature` de `@ligoj/host`) e os testes Vitest gerados (`:900–948`, com `vi.mock('@ligoj/host')`) também são apenas strings de template; completam o inventário das referências a `@ligoj/host`, junto de `:808`, `:827`, `:900` e `:935`. | contexto |
| Build/deploy (ferramenta) | `ligojcli/plugins/dev.py:772–779` resolve o diretório externo de plugins; `:808–852` seleciona entradas recebidas por argumento, encontradas em diretórios ou consultadas na instância Ligoj, exigindo `ui/package.json`; `:855–867` instala dependências e executa `npm run build` nesses diretórios. `ligojcli/dev_plugin.py:1674–1682` recebe os checkouts a implantar; `:1766–1777` envia seus JARs e solicita reinício do contexto externo. É automação administrativa, sem configuração concreta de composição frontend neste repositório. | contexto |
| Código-fonte (ambiente externo) | `ligojcli/dev_debug.py:41–55` aponta por padrão para `~/git/ligoj` e deriva `app-ui/src/main/webapp`; `:59–82` descreve processos API, UI Java e Vite. `:599–620` verifica se o webapp externo existe e inicia `npm run dev`. API e servidores da mesma UI não foram contados como unidades frontend independentes ou composição MFE. | contexto |
| Tecnologia / Configuração / Composição | Busca textual com `git grep -n -i -E` em toda a árvore do commit por `module.?federation`, `registerApplication`, `single-spa`, `remoteEntry`, `import.?map`, `customElements[.]define`, `System[.]import` e `<iframe`: nenhuma ocorrência. Uma busca adicional por `micro.?frontend` e `@ligoj/host` encontrou a nota documental `README.md:1944–1945` e referências ao host nos templates de `ligojcli/dev_plugin.py`, incluindo `:658`, `:668`, `:734` e `:769`; estas foram inspecionadas no contexto de geração acima. Não foi encontrada configuração concreta de host/remote ou aplicação composta. | ausente |
| Documentação | `README.md:5–10` descreve o cliente REST e seus requisitos. A menção a microfrontends em `README.md:1934–1945` é uma nota de diagnóstico sobre módulos comerciais ausentes na imagem Artifactory OSS. `README.md:2291–2322` descreve os arquivos que o comando de criação produzirá. Nenhum desses trechos demonstra uma instância MFE no candidato. | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O inventário completo não contém unidades frontend instanciadas. Os caminhos de UI são produzidos por um gerador (`ligojcli/dev_plugin.py:204–238`), enquanto os projetos externos são parâmetros de ferramentas (`ligojcli/plugins/dev.py:808–852`), sem configuração de composição que identifique duas unidades concretas. |
| Q2 | No | Não há conjunto de unidades frontend do candidato com entradas e builds próprios. A entrada real é um comando Python (`pyproject.toml:54–55`). Entrada e build Vite aparecem em strings de template (`ligojcli/dev_plugin.py:611–643`, `:663–668`); builds externos executados pela ferramenta não demonstram independência de unidades compondo uma aplicação neste commit (`ligojcli/plugins/dev.py:855–867`). |
| Q3 | No | Não há host/shell/root frontend no candidato que carregue ou monte unidades. A CLI registra subcomandos (`ligojcli/ligoj.py:28–45`); o comando de depuração apenas inicia processos de um checkout externo (`ligojcli/dev_debug.py:41–82`, `:599–620`). |
| Q4 | No | A geração de arquivos (`ligojcli/dev_plugin.py:233–238`), os builds de plugins externos (`ligojcli/plugins/dev.py:855–867`) e o upload de JARs (`ligojcli/dev_plugin.py:1766–1777`) não constituem uma conexão frontend em uso no candidato. A busca de mecanismos acima não encontrou configuração concreta de composição; a referência `@ligoj/host` pertence ao template (`ligojcli/dev_plugin.py:646–689`). |
| Q5 | No | Os artefatos demonstram uma CLI Python (`pyproject.toml:12–18`, `:54–55`) e um gerador/administrador de projetos externos (`ligojcli/dev_plugin.py:125–145`, `:204–238`), sem instância composta observável. O julgamento acompanha Q1–Q4. |

## Motivo

- Aplica-se `Non-MFE`: há respostas No e não se aplica a exceção `MFE-unit`. O objeto analisado é uma ferramenta de suporte ao desenvolvimento, não uma arquitetura frontend implementada. Não é necessário concluir se o Ligoj externo ou os projetos gerados seriam MFE para classificar esta CLI.
- O template de plugin não configura uma unidade concreta deste candidato para um host externo. As variantes service/tool de `_ui_index_js` são alternativas de geração, não duas unidades compondo uma aplicação. Isso distingue o caso de um exemplo/template que efetivamente compõe unidades e de um repositório contendo apenas um remote implementado.
- `frontend_units: 0` decorre do inventário integral de 78 arquivos e da inspeção dos sinais positivos. Não indica falta de acesso ao candidato: código gerador, caminhos de saída e ferramentas externas são observáveis, mas não constituem unidades concretas referenciadas por configuração de composição.
- Não há decisão aberta de composição por pacotes, links ou iframes: o candidato não implementa uma aplicação composta cuja classificação dependa desses mecanismos. Externalização e hooks de integração no texto gerado não foram promovidos a arquitetura executada.
- `repo_type: other` registra uma CLI/ferramenta. `approaches`, `ui_technologies` e `build_tools` ficam vazios: Vue e Vite são observados nos templates e na automação de outros projetos, sem unidades frontend do candidato; setuptools/uv são ferramentas do pacote Python.

## Notas para análise

- **RQ1 (sinais enganosos):** a palavra microfrontends no diagnóstico de Artifactory (`README.md:1944–1945`) e os trechos Vue/Vite/`@ligoj/host` no gerador (`ligojcli/dev_plugin.py:611–797`) são sinais temáticos que exigem distinguir a ferramenta de suas saídas.
- **Protocolo:** proposta de classificação, mantida em `draft`; sem promoção para `final` ou aquisição/mineração.
