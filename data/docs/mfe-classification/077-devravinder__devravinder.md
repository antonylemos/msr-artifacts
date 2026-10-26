---
schema: 1
id: 425744235
full_name: devravinder/devravinder
url: https://github.com/devravinder/devravinder
commit: 47cb7cc90860e9b413c5b3a1ff049f4ebedae366
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

# 077 — devravinder/devravinder

## Contexto

Repositório de perfil pessoal, com apresentação profissional (`README.md:1–5`), tecnologias e competências (`README.md:8–71`), descrições de projetos e contatos (`README.md:73–96`). A arquitetura dos projetos externos não é atribuída ao candidato.

Clone conferido em `data/samples/mfe-sample-001/repos/devravinder__devravinder/`. Rank, ID e SHA correspondem à linha `cloned` de `data/samples/mfe-sample-001/clones.csv:78`. `git rev-parse HEAD` retornou o SHA do front matter e `git cat-file -t` confirmou um commit. A inspeção usou `git ls-tree -r`, `git show` e `git grep` no SHA fixado, sem acessar os sites vinculados ou depender do working tree.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Configuração / Código-fonte / Build/deploy | O inventário integral por `git ls-tree -r 47cb7cc90860e9b413c5b3a1ff049f4ebedae366` contém uma única entrada: `README.md`, modo `100644`, blob `7f40d96af0b833a659348aa264675acd72434fc8`. Não há gitlinks. Foram procurados manifestos de pacotes, fontes de UI, entradas de aplicações, configurações de bundler/composição e scripts/workflows de build/deploy: nenhum está presente na árvore. A leitura integral de `README.md:1–96` confirma uma apresentação pessoal, sem implementação frontend. | ausente |
| Documentação | `README.md:57–64` lista competências de frontend; “Micro Frontend architecture” aparece em `README.md:64`. É uma competência declarada pelo autor, sem código/configuração que a implemente no candidato. | fraca |
| Tecnologia | `README.md:12–13` exibe badges React/Next.js; `README.md:58–63` lista React, Redux e arquitetura de componentes. Esses sinais descrevem habilidades, sem manifestos ou fontes para atribuir tecnologias de UI a unidades do repositório. | fraca |
| Documentação / Composição | `README.md:73–88` descreve Insta-Cred Loan App e Project Dashboard. O segundo é descrito como ferramenta para pesquisar/filtrar repositórios e recebe um link de website (`README.md:84–88`). Não há host, configuração de carregamento, montagem ou roteamento que relacione esses projetos como unidades de uma aplicação. `README.md:92–93` contém apenas contatos/portfólio. | contexto |
| Tecnologia / Configuração / Código-fonte / Composição | Busca com `git grep -n -i -E` em toda a árvore, cujo único artefato é `README.md:1–96`, por `micro.?frontend`, `module.?federation`, `single.?spa`, `registerApplication`, `remoteEntry`, `remotes`, `exposes`, `import.?map`, `qiankun`, `wujie`, `iframe`, `customElements`, `createRoot`, `bootstrap`, `webpack`, `vite`, `package.json` e `<script`: somente a competência em `README.md:64` foi encontrada. A busca repetida sem `micro.?frontend` não teve ocorrências. Não foi encontrado mecanismo de composição ou preparação de unidade para host externo. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | A árvore inventariada contém apenas `README.md:1–96`, sem unidades frontend ou configuração de composição que referencie unidades externas. Os projetos em `README.md:75–88` são descrições documentais, não unidades identificadas por configuração de composição. |
| Q2 | No | Não há unidades com entradas e builds próprios no candidato. A seção de habilidades (`README.md:57–64`) e as descrições de projetos (`README.md:75–88`) não contêm os artefatos exigidos para estabelecer unidades relativamente independentes. A ausência de entradas/builds foi verificada na árvore completa. |
| Q3 | No | Não há host, shell ou configuração raiz carregando, montando ou roteando unidades. Os links de projetos/portfólio em `README.md:73`, `README.md:88` e `README.md:92–93` são navegação documental em um perfil. |
| Q4 | No | Inventário e busca integral não encontraram mecanismo configurado conectando unidades. A menção em `README.md:64` é uma competência, e os projetos descritos em `README.md:75–88` não são acompanhados de implementação ou configuração de composição. |
| Q5 | No | O único artefato apresenta o autor (`README.md:1–5`), competências (`README.md:57–64`) e projetos externos (`README.md:73–88`). Não há evidência de instância MFE implementada, em concordância com Q1–Q4. |

## Motivo

- Aplica-se `Non-MFE`: há respostas No e não se aplica a exceção `MFE-unit`. Corresponde ao caso de exclusão de repositório que menciona micro-frontends sem implementá-los.
- O inventário integral permite registrar `frontend_units: 0`; não é um caso de unidades inacessíveis ou de conteúdo não observável. O repositório contém um perfil em Markdown, sem aplicações ou gitlinks.
- Não há unidade preparada para composição externa, como uma exposição federada ou ciclos de vida single-spa. Também não há configuração de composição de unidades externas, apenas descrições e links.
- Não existe decisão aberta sobre composição por links, iframes ou pacotes: o candidato não apresenta uma aplicação composta cuja integração dependa desses mecanismos. Os hyperlinks pertencem à apresentação pessoal e não estabelecem unidades frontend independentes compondo uma aplicação.
- `repo_type: other` registra o perfil pessoal. `approaches`, `ui_technologies` e `build_tools` permanecem vazios: as tecnologias mencionadas são competências, não implementação observada no repositório. A anotação permanece em `draft`.

## Notas para análise

- **Protocolo:** o clone tem também o branch `origin/deploy` (`README.md` e `index.html`), fora do snapshot classificado; uma busca somente leitura nesse `index.html` não encontrou sinais de MFE. Não entra na análise.

- **RQ1 (sinais enganosos):** a competência Micro Frontend (`README.md:64`), os badges de UI (`README.md:12–13`) e a descrição de projetos (`README.md:75–88`) fornecem sinais temáticos sem artefatos de arquitetura no candidato.
