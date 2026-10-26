---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
inputs:
  clone: data/samples/mfe-sample-001/repos/Jonadersonmoura__descompara
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Leitura do repositório

O histórico até o snapshot contém um único commit, sem pais: `3dd5146` (2026-07-29, “inclusão do projeto”). O `log --name-status` registra como adições o manifesto, o lockfile, as quatro aplicações Angular, as configurações de Native Federation, as bibliotecas compartilhadas e o README. Trata-se da primeira presença observável desses artefatos neste histórico; não é possível datar sua elaboração anterior nem reconstruir uma introdução gradual da composição ou extração de aplicações.

As dúvidas das revisões anteriores já coexistem nessa primeira versão: dependências declaradas sem uso ou com uso indeterminado, a possível comunicação pelo `AuthService` e descrições do shell que divergem do código. O manifesto do commit foi lido pelo `hist.sh`; para confrontar README e código, foram lidos os arquivos do snapshot em `data/acquisitions/mfe-corpus-001/corpus/Jonadersonmoura__descompara/files/`. Não há revisão anterior alcançável pelo commit do snapshot que permita explicar a origem dessas diferenças. Não houve falha por objeto ausente nas consultas realizadas.

A afirmação 7 da revisão documental, sobre o nome “Module Federation” em README.md:31, não vira ponto histórico: README.md:3 já nomeia `@angular-architects/native-federation`, e a INSTRUCTIONS.md desta etapa exclui imprecisões de nome resolvidas pelo próprio snapshot. Isso não altera a corroboração atribuída na 3.4.7. Não há unidade indeterminada na 3.4.3 nem deploy indeterminado na 3.4.6; esta registra deploy não observado. Os sete pontos abaixo permanecem inconclusivos quanto às perguntas históricas, sem mudar os julgamentos do snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A declaração de `@module-federation/enhanced` sem uso é resto de outro mecanismo ou preparação nunca conectada? | 3.4.2 (package.json:18, Configurada No) | uso de dependência | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |
| 2 | A declaração de `@nx/module-federation` sem uso corresponde a configuração anterior ou planejada? | 3.4.2 (package.json:23, Configurada No) | uso de dependência | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |
| 3 | A declaração de `@nx/webpack` e os defaults para um executor não usado vieram de um build anterior? | 3.4.2 (package.json:27, Configurada No; Notas, nx.json:67-77) | uso de dependência | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |
| 4 | `@softarc/native-federation-orchestrator` participa do caminho de execução usado pelo projeto? | 3.4.2 (package.json:31, Configurada Undetermined) | uso de dependência | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |
| 5 | A instância de `AuthService` é compartilhada entre os remotes, tornando ativo o canal de comunicação? | 3.4.4 (libs/shared/data-access/src/lib/auth.service.ts:8, Undetermined); 3.4.5 #4-#6 | ativo ou abandonado | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |
| 6 | A navbar e a home atribuídas ao shell no README pertencem a outro estágio da aplicação? | 3.4.7 #4 (README.md:19, repetição em :81) | estágios em conflito | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |
| 7 | A proteção das rotas no shell descrita pelo README antecedeu os guards e o login dos remotes? | 3.4.7 #4 (guards) e #5 (README.md:27, :56); 3.4.4 (Notas); 3.4.5 (Leitura) | estágios em conflito | 3dd5146, 2026-07-29, inclusão do projeto | inconclusivo |

## Observações

**1. `@module-federation/enhanced`.** O manifesto lido no único commit já declara o pacote em package.json:18, e o mesmo commit adiciona as configurações de Native Federation e as rotas do shell. Não há alteração anterior do manifesto nem versão anterior dessas configurações para distinguir uso removido, planejamento ou simples declaração excedente. A coexistência não prova abandono nem intenção; permanece Configurada No na 3.4.2, com explicação histórica inconclusiva.

**2. `@nx/module-federation`.** A declaração em package.json:23 está no mesmo manifesto inicial. A lista de adições inclui os quatro `federation.config.mjs` e os `project.json`, sem um estágio anterior registrado. O histórico não mostra se o pacote chegou a configurar outra federação ou por que permaneceu declarado. O No da 3.4.2 não muda.

**3. `@nx/webpack`.** O manifesto inicial declara o pacote em package.json:27, e o único commit adiciona também nx.json e os targets de cada aplicação. A revisão de dependências registra defaults para `@nx/angular:webpack-browser` em nx.json:67-77, enquanto os builds do snapshot usam Native Federation sobre `@angular/build:application`. Sem uma versão anterior, não se pode chamar esses defaults de resto de uma migração nem demonstrar uso anterior do pacote. A explicação histórica fica inconclusiva, preservando o No.

**4. `@softarc/native-federation-orchestrator`.** package.json:31 já declara `^4.2.2` na primeira versão observável. A ligação transitiva pelo lockfile, registrada na 3.4.2 (package-lock.json:375), não resolve por si o caminho efetivamente usado por `initFederation`. O único commit adiciona manifesto, lockfile e entradas das aplicações juntos; não oferece uma mudança que esclareça esse uso. Não foi consultado código instalado de dependências nem executado o projeto. Permanece Undetermined no snapshot e inconclusivo no histórico.

**5. Instância de `AuthService`.** O commit adiciona o serviço, os logins, os headers, os guards, os aliases e as configurações de federação em conjunto. O snapshot mostra `providedIn: 'root'` e o signal em libs/shared/data-access/src/lib/auth.service.ts:6-8, mas a revisão de código-fonte não pôde demonstrar o compartilhamento da biblioteca local entre builds pelo `shareAll` (shell/federation.config.mjs:7-18). O histórico não traz mudança anterior de compartilhamento nem outro estágio que responda à dúvida. As três relações de comunicação da 3.4.5 continuam Ativa Undetermined; não há base histórica para dizer que o canal foi abandonado ou que funciona entre unidades.

**6. Navbar e home do shell.** README.md:19 e :81 atribuem esses elementos ao shell. No snapshot, shell/src/app/app.html:1 contém só o outlet, e shell/src/app/app.routes.ts:4-20 carrega os remotes. O `log --name-status` registra README e esses arquivos como adições no mesmo commit raiz, junto das homes e dos headers dos remotes. Portanto, a divergência já existe na primeira versão observável. Não há versão registrada que mostre a navbar ou a home no shell, nem evidência para decidir entre intenção, cópia ou descrição de um estágio anterior externo a este histórico. A origem histórica é inconclusiva.

**7. Guards e login.** README.md:27 e :56 colocam os guards nas rotas do shell e descrevem ausência de tela de login e usuário inicial admin. O snapshot tem rotas do shell sem guards, guards nas homes de admin e intranet (admin/src/app/remote-entry/entry.routes.ts:12; intranet/src/app/remote-entry/entry.routes.ts:12), rotas de login nesses arquivos (:13) e usuário inicial público (libs/shared/data-access/src/lib/auth.service.ts:4, :8). Todos esses caminhos e o README aparecem como adições no único commit. Isso comprova coexistência da divergência, mas não uma transferência dos guards nem uma sequência entre dois estágios. A expressão “versão anterior” usada nas leituras das etapas anteriores não pode ser confirmada por este histórico; a explicação temporal permanece inconclusiva, sem alterar os julgamentos do snapshot.

## Comandos

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara log --format='%h %ad %s' --date=short --name-status 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara rev-list --count 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara show 3dd51466a7d9eece3bcb46e0663ad5ad614daf32:package.json
docs/mfe-history-review/tools/hist.sh Jonadersonmoura__descompara show -s --format='%h %ad %s | pais: %p' --date=short 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

As duas comparações da impressão digital terminaram com código 0, antes e depois das consultas.

## Resumo

Commits até o snapshot: 1 (2026-07-29 a 2026-07-29). Pontos: 7 (esclarecido: 0, inconclusivo: 7, resolvido pelo snapshot: 0).
