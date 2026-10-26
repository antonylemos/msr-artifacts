---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inputs:
  clone: data/samples/mfe-sample-001/repos/hd789789789__frontend-app-learning-old-v2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Leitura do repositório

O histórico alcançável até o snapshot tem 1.518 commits, de 2019-05-02 a 2025-11-16. O primeiro é `1a782f7` (2019-05-02, "Initial commit"), que já contém README.rst: essa é sua primeira presença observável, sem demonstrar onde o texto foi elaborado antes. O último é `d987aed` (2025-11-16, "chore: update browserslist DB (#1826)"). A análise se limita à dúvida da revisão documental sobre a convenção de variáveis de ambiente entre MFEs; não reconstrói uma trajetória de adoção.

O README foi alterado em `1308d1e` (2021-08-06, "docs: explain the learning MFE specific environment variables (#578)"). A mensagem anuncia documentação das variáveis específicas da Learning, mas o conteúdo dessa versão não está disponível localmente. A última alteração do README até o snapshot é `d5a092b` (2025-03-26, "Update edx.rtd.io links to docs.openedx.org (#1654)"); sua mensagem anuncia atualização de links, sem demonstrar uma mudança na convenção de ambiente. O snapshot confirma configuração local, mas não fornece o manifesto de ambiente de outra MFE. Nenhum desses metadados resolve a abrangência da afirmação sobre todas as MFEs.

As revisões 3.4.2 a 3.4.6 não deixam dependência sem uso ou indeterminada, unidade indeterminada, construção de composição inativa ou indeterminada, relação indeterminada ou deploy indeterminado. Os exemplos de plugins são identificados como exemplos, as duas barras de discussão têm seleção ativa por flag e o deploy é não observado; não são ambiguidades históricas adicionais. As afirmações sem corroboração sobre Tutor na 3.4.7 descrevem configuração externa ausente, sem conflito entre estágios observado. A única afirmação parcial é o ponto abaixo.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A afirmação de um conjunto obrigatório de variáveis comum a todas as MFEs tem suporte apenas no ambiente da Learning | 3.4.7 #6 (README.rst:145-147) | estágios em conflito | 1308d1e 2021-08-06 docs: explain the learning MFE specific environment variables (#578); d5a092b 2025-03-26 Update edx.rtd.io links to docs.openedx.org (#1654) | inconclusivo |

## Observações

**1. Variáveis comuns às MFEs.** README.rst:144-149 distingue a configuração por ambiente, a convenção geral e as variáveis adicionais da Learning. O snapshot contém variáveis de autenticação e sessão em .env:6-8, :26-28, :40, :51, mas só para esta aplicação, como registra a 3.4.7 #6. O histórico de caminhos confirma modificações de README.rst em `1308d1e` e `d5a092b`, não quais frases foram alteradas. A consulta `ls-tree` encontra README.rst em `1308d1e`, com objeto diferente do snapshot, mas `show 1308d1e:README.rst` falha com `fatal: bad object 1308d1e:README.rst`: o conteúdo histórico não está disponível, e não houve busca de objetos. A mensagem de `1308d1e` anuncia explicação de variáveis específicas, sem provar quando a afirmação geral apareceu, se veio de outro estágio ou se foi abandonada. Permanece inconclusivo; o julgamento parcial do snapshot não muda.

## Comandos

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 rev-list --count d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 log --format='%h %ad %s' --date=short d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee -- README.rst README.md
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 log --reverse --format='%h %ad %s' --date=short d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 show 1308d1e:README.rst
# Falhou: fatal: bad object 1308d1e:README.rst (conteúdo histórico ausente).
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 log --format='%h %ad %s' --date=short --name-status --no-renames d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee -- README.rst
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 ls-tree d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee -- README.rst
docs/mfe-history-review/tools/hist.sh hd789789789__frontend-app-learning-old-v2 ls-tree 1308d1e -- README.rst
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 1518 (2019-05-02 a 2025-11-16). Pontos: 1 (esclarecido: 0, inconclusivo: 1, resolvido pelo snapshot: 0).
