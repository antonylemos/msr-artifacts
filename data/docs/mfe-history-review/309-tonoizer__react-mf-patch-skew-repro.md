---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
inputs:
  clone: data/samples/mfe-sample-001/repos/tonoizer__react-mf-patch-skew-repro
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Leitura do repositório

O histórico até o snapshot tem um único commit, `92739d5` (2026-09-11, "Add React patch-skew repro for @module-federation/vite 1.21.6"). Nele já aparecem o README, os manifestos, as configurações e os fontes das quatro aplicações, além do roteiro de captura e das evidências versionadas. É a primeira presença observável desse conjunto; o histórico não informa onde ele foi desenvolvido antes.

As etapas 3.4.2 a 3.4.6 não deixam dependências, unidades, construções, relações ou deploys Undetermined, nem construções inativas ou comentadas a investigar. Os dois pontos vêm da documentação: a generalização sobre patches distintos e a lista de compartilhamento que inclui duas entradas sem uso observado. O snapshot delimita o estado atual; o único commit permite esclarecer que os artefatos envolvidos coexistem desde a primeira versão observável, sem um estágio anterior registrado que explique as diferenças. Isso não demonstra intenção, uso anterior ou abandono e não altera os julgamentos das revisões anteriores.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README afirma patches diferentes por app, mas host e remote_c fixam o mesmo patch | 3.4.7 #2 (README.md:3,65; host/package.json:11-12; remote_c/package.json:11-12) | estágios em conflito | 92739d5 2026-09-11 Add React patch-skew repro for @module-federation/vite 1.21.6 | esclarecido |
| 2 | A lista de compartilhamento inclui react/jsx-dev-runtime e react/compiler-runtime sem uso observado | 3.4.7 #7 (README.md:16-22; host/vite.config.js:8-9; remote_a/vite.config.js:8-9; remote_b/vite.config.js:8-9; remote_c/vite.config.js:8-9) | uso de dependência | 92739d5 2026-09-11 Add React patch-skew repro for @module-federation/vite 1.21.6 | esclarecido |

## Observações

**1. Patches diferentes por app.** O snapshot já mostra a ressalva: host e remote_c fixam React e React DOM 19.2.8 (host/package.json:11-12; remote_c/package.json:11-12), inclusive na tabela do próprio README (README.md:11,14). A questão histórica é se o texto generalizante poderia ser resto de uma configuração anterior. O log completo até o snapshot registra apenas a adição do README e dos manifestos no único commit. Assim, a frase e os dois manifestos coexistem desde a primeira versão observável; não há no histórico consultado uma transição de patches distintos para patches iguais. Esse é o limite do esclarecimento: não explica a origem da redação nem exclui trabalho anterior fora do histórico. A afirmação contradita da 3.4.7 permanece.

**2. Entradas compartilhadas sem uso observado.** O snapshot declara react/jsx-dev-runtime e react/compiler-runtime no objeto shared (linhas 8-9 dos quatro vite.config.js), mas a 3.4.7 não encontra imports que demonstrem seu uso; os registros do escopo só demonstram disponibilidade. O log completo mostra que README, configurações, fontes e evidências são todos adicionados no único commit, sem versão anterior registrada. O histórico esclarece, no limite desses artefatos, que não há remoção observável de consumidores nem uma fase anterior com uso demonstrado: a lista e o estado atual dos fontes já coexistem na primeira presença observável. Isso não permite atribuir abandono, cópia ou intenção às duas entradas. Saber quando aparecem não comprova uso; a afirmação parcial da 3.4.7 permanece.

## Comandos

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh tonoizer__react-mf-patch-skew-repro log --reverse --format='%h %ad %s' --date=short --name-status 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
docs/mfe-history-review/tools/hist.sh tonoizer__react-mf-patch-skew-repro rev-list --count 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

As tentativas iniciais de log e rev-list pelo hist.sh foram bloqueadas ao abrir tools/commands.log para escrita, antes de executar Git; as mesmas consultas foram repetidas com permissão para esse registro obrigatório. Não houve consulta com objeto ausente. As comparações antes e depois das consultas coincidiram com a referência.

## Resumo

Commits até o snapshot: 1 (2026-09-11 a 2026-09-11). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
