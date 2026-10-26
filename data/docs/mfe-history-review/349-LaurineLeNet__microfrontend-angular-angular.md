---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
inputs:
  clone: data/samples/mfe-sample-001/repos/LaurineLeNet__microfrontend-angular-angular
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Leitura do repositório

O histórico até o snapshot tem 4 commits, de 2026-05-14 a 2026-06-08. A primeira presença observável dos três diretórios, seus manifestos e configurações de federação é o commit inicial `73c274c` (2026-05-14, “working”); isso não informa onde o código foi produzido antes. Os dois commits intermediários, `3e43cf2` (2026-05-26, “routing in athlete”) e `686b898` (2026-05-29, “routing”), alteram arquivos de athletes e do shell, mas não os manifestos. O último, `342c92d` (2026-06-08, “feat: deployment”), modifica os três package.json, substitui os package-lock.json por bun.lock, acrescenta os wrangler.jsonc e os _headers dos remotes e modifica o manifesto de remotes do shell. Essas operações foram observadas na listagem de nomes e status; o conteúdo das versões antigas dos package.json não pôde ser lido.

As revisões 3.4.2 a 3.4.7 deixam três pontos relativos ao mesmo pacote, declarado separadamente em cada aplicação. Não há unidades ou relações Undetermined, construções inativas nem afirmações documentais parciais ou contraditas que acrescentem pontos. A busca literal no snapshot, excluindo bun.lock, encontra `@softarc/native-federation-node` somente na linha 22 dos três package.json. Isso confirma o recorte das dúvidas, mas não explica a origem das declarações. Os três manifestos iniciais existem na árvore histórica, porém suas leituras falham com `bad object`: os blobs não estão disponíveis localmente. O histórico acessível não permite distinguir uso anterior, abandono, cópia ou declaração nunca conectada. Os julgamentos No da 3.4.2 permanecem os do snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` está declarado sem uso em athletes | 3.4.2 (athletes/package.json:22) | uso de dependência | 73c274c 2026-05-14 working; 342c92d 2026-06-08 feat: deployment | inconclusivo |
| 2 | `@softarc/native-federation-node` está declarado sem uso em ranking | 3.4.2 (ranking/package.json:22) | uso de dependência | 73c274c 2026-05-14 working; 342c92d 2026-06-08 feat: deployment | inconclusivo |
| 3 | `@softarc/native-federation-node` está declarado sem uso em shell | 3.4.2 (shell/package.json:22) | uso de dependência | 73c274c 2026-05-14 working; 342c92d 2026-06-08 feat: deployment | inconclusivo |

## Observações

**1. Dependência sem uso em athletes.** `athletes/package.json` aparece no commit inicial e só é modificado novamente no snapshot. Sua versão inicial consta em `ls-tree`, mas a tentativa de leitura falha por objeto ausente. Assim, não foi possível verificar se o pacote já era declarado antes do snapshot nem se a alteração final o acrescenta ou apenas preserva. Os arquivos de código de athletes também mudam nos commits intermediários; a listagem de caminhos não demonstra uso anterior do pacote. O resultado é inconclusivo, sem evidência suficiente para atribuir abandono ou intenção à declaração.

**2. Dependência sem uso em ranking.** `ranking/package.json` tem a mesma sequência de criação no commit inicial e modificação no snapshot. Seu blob inicial também está ausente. A listagem completa de alterações não registra mudanças nos arquivos de código ou configuração de ranking depois da primeira presença observável, mas isso não revela o conteúdo do manifesto antigo nem explica a declaração. Não se pode concluir que houve abandono, cópia ou planejamento; o ponto permanece inconclusivo.

**3. Dependência sem uso em shell.** `shell/package.json` é criado no commit inicial e modificado no snapshot, com a versão inicial indisponível para leitura. As rotas e o dashboard mudam em `3e43cf2`, e o manifesto de remotes muda em `342c92d`; esses registros de caminhos não demonstram uso de `@softarc/native-federation-node`. A mensagem do último commit anuncia deployment, sem explicar a dependência. Não há base para decidir se ela foi usada anteriormente ou por que permaneceu declarada, portanto o resultado é inconclusivo.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular log --reverse --format='%H %ad %s' --date=short --name-status --no-renames 342c92dff482f1ee0a4bcc05f9302361a7354352
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular show 73c274ce47d5ca0572844ecbfbbf89593089f6be:athletes/package.json
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular show 73c274ce47d5ca0572844ecbfbbf89593089f6be:ranking/package.json
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular show 73c274ce47d5ca0572844ecbfbbf89593089f6be:shell/package.json
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular rev-list --count 342c92dff482f1ee0a4bcc05f9302361a7354352
docs/mfe-history-review/tools/hist.sh LaurineLeNet__microfrontend-angular-angular ls-tree -r 73c274ce47d5ca0572844ecbfbbf89593089f6be
```

As três consultas `show` falharam com `fatal: bad object <revisão>:<caminho>`, por blobs históricos ausentes; não houve busca de objetos. Todas as revisões consultadas são o snapshot ou ancestrais identificados no seu log.

Antes e depois das consultas, a comparação abaixo terminou com código 0, sem diferenças:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 4 (2026-05-14 a 2026-06-08). Pontos: 3 (esclarecido: 0, inconclusivo: 3, resolvido pelo snapshot: 0).
