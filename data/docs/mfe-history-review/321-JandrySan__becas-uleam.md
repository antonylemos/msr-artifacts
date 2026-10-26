---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
inputs:
  clone: data/samples/mfe-sample-001/repos/JandrySan__becas-uleam
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Leitura do repositório

O histórico alcançável até o snapshot tem 10 commits, de 2026-07-08 a 2026-07-10. A primeira presença observável da contenedora, dos três módulos e do scaffold Vue aninhado é o commit raiz `2f53246` (2026-07-08, “estructura”); isso não informa onde foram desenvolvidos antes. As revisões 3.4.2 a 3.4.7 não deixam dependências, unidades, relações ou deploy com valor `Undetermined`. Os pontos históricos são contratos de mensagens sem receptor e três contradições documentais.

`acb73a0` (2026-07-09, “Agregar servicio y archivos de base de datos de Supabase”) cria o serviço Supabase do Angular e altera seu store, a contenedora e o Vue. O README do Angular, já presente na raiz do histórico, não muda. O README da raiz muda pela última vez em `997197b` (2026-07-09, “añadir la configuración del espacio de trabajo de pnpm con las definiciones de paquetes y los límites de compilación”). Depois, `c1a2ab3` (2026-07-10, “Eliminar rewrites que bloqueaban los modulos”) altera `vercel.json`: a mensagem anuncia a remoção dos rewrites que o README ainda promete. Esses marcos explicam descompassos entre documentação e implementação, sem alterar os julgamentos do snapshot.

O clone permite consultar todos os commits e seus caminhos alterados com `--no-renames`, mas vários conteúdos históricos estão ausentes. O provedor React do primeiro commit pôde ser lido; os conteúdos antigos da contenedora, do Vue, do store Angular e de `vercel.json` não puderam. Não se infere abandono ou intenção apenas pela data de criação de um contrato incompleto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | React envia `BECAS_POSTULACION_UPDATE` à contenedora sem receptor; Angular trata essa mensagem e `BECAS_POSTULACION_ENVIADA`, sem receber nenhuma delas | 3.4.4 (2postulacion-react/src/context/PostulacionContext.tsx:69; Notas); 3.4.5 (Leitura; #5) | ativo ou abandonado | 2f53246 2026-07-08 estructura; acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase | inconclusivo |
| 2 | A contenedora espera `BECAS_VUE_READY` e envia estado ao Vue, mas o módulo não implementa esses lados do contrato | 3.4.4 (Notas, src/main.ts:205); 3.4.5 (Leitura; #4) | ativo ou abandonado | 2f53246 2026-07-08 estructura; acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase | inconclusivo |
| 3 | O README promete rewrites ausentes de `vercel.json` | 3.4.6 (Leitura); 3.4.7 #9 | estágios em conflito | 997197b 2026-07-09 añadir la configuración del espacio de trabajo de pnpm con las definiciones de paquetes y los límites de compilación; c1a2ab3 2026-07-10 Eliminar rewrites que bloqueaban los modulos | esclarecido |
| 4 | O README Angular descreve dados em memória e ausência de banco, mas o módulo usa Supabase | 3.4.7 #1 | estágios em conflito | 2f53246 2026-07-08 estructura; acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase | esclarecido |
| 5 | A nota de login estende a sessão por `localStorage` aos três módulos, mas o React não lê as chaves de sessão | 3.4.7 #14 | estágios em conflito | 2f53246 2026-07-08 estructura; acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase | inconclusivo |

## Observações

**1. Mensagens sem receptor.** `PostulacionContext.tsx` é adicionado em `2f53246` e não aparece entre os arquivos alterados pelos nove commits seguintes. Seu conteúdo inicial, disponível, já envia `BECAS_POSTULACION_UPDATE` à janela pai e aplica apenas os dados/documentos de `BECAS_PORTAL_STATE`. Portanto, o emissor React permanece igual em todo o histórico observado. `src/main.ts` e `app.component.ts` do Angular são adicionados no primeiro commit e alterados em `acb73a0`, mas seus conteúdos iniciais estão ausentes. Não é possível saber se houve receptor na contenedora ou encaminhamento funcional anterior, nem se o contrato foi abandonado ou nunca conectado. A ausência de emissor para `BECAS_POSTULACION_ENVIADA` no snapshot continua sendo a registrada em 3.4.4; o histórico disponível não esclarece sua origem.

**2. Contrato incompleto do Vue.** A contenedora e `HomeView.vue` aparecem no primeiro commit e são alterados em `acb73a0`, sem novas alterações até o snapshot. As tentativas de ler ambos no primeiro commit falharam por objeto ausente. A lista de caminhos não revela se `BECAS_VUE_READY` foi retirado do Vue ou se o ramo da contenedora nunca teve contraparte. O resultado é inconclusivo, sem atribuir abandono ao módulo ou ao contrato.

**3. Rewrites removidos e README mantido.** A última alteração do README é `997197b`. Depois, `c1a2ab3` altera apenas `vercel.json`, e sua mensagem anuncia “Eliminar rewrites que bloqueaban los modulos”. O arquivo do snapshot não tem rewrites (`vercel.json:1-6`), enquanto o README ainda os promete (`README.md:80`). A sequência esclarece a documentação desatualizada em relação à remoção anunciada. As tentativas de ler `vercel.json` em `2f53246` e `79810ab` (2026-07-10, “Actualizar vercel.json para usar pnpm en los comandos de instalación y construcción”) falharam: não foram inspecionadas as regras antigas nem verificado o bloqueio alegado pela mensagem.

**4. README Angular e Supabase.** O README Angular é adicionado em `2f53246` e não muda depois; a afirmação sobre memória e ausência de banco já pertence, portanto, à primeira versão observável desse documento. `acb73a0` cria `3seguimiento-angular/src/app/services/supabase.service.ts` e altera o store. O snapshot confirma o uso de Supabase (3.4.7 #1). O histórico esclarece o descompasso delimitado a esses artefatos: a descrição permaneceu anterior à criação do serviço Supabase no módulo. As versões inicial e intermediária do store não estão disponíveis; não se afirma ter inspecionado uma implementação anterior exclusivamente em memória, nem que a integração inteira tenha sido concluída naquele commit.

**5. Sessão do React e nota da contenedora.** A versão inicial disponível de `PostulacionContext.tsx`, que não muda até o snapshot, já lê apenas dados do estudante e documentos do `localStorage`; não lê as chaves de sessão. Isso afasta uma retirada posterior dessas leituras nesse arquivo. Porém, `index.html` e `src/main.ts` mudam em `acb73a0`, e seus conteúdos anteriores estão ausentes. Não é possível estabelecer se a nota sobre os três módulos veio de uma integração anterior ou se já nasceu mais abrangente que o código. A cronologia do provedor não basta para explicar a origem da contradição; o ponto permanece inconclusivo.

## Comandos

Todas as revisões abaixo são o snapshot ou ancestrais presentes no log limitado a ele. As consultas `show` marcadas falharam com `fatal: bad object`, sem buscar objetos. A primeira consulta `log` falhou por objeto ausente durante a detecção de renomes; a repetição com `--no-renames` retornou os 10 commits completos.

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt

docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam log --reverse --format='%h %ad %s' --date=short --name-status 613ce6ac8c615f494d214e3d1e01fa3d08e02267
# Falhou: objeto 46a0d7fadaffabe37668efcad4a478a557ceb317 ausente; lazy fetching disabled.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 613ce6ac8c615f494d214e3d1e01fa3d08e02267
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam rev-list --count 613ce6ac8c615f494d214e3d1e01fa3d08e02267
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:3seguimiento-angular/src/app/services/seguimiento-store.service.ts
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show acb73a0:3seguimiento-angular/src/app/services/seguimiento-store.service.ts
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:vercel.json
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 79810ab:vercel.json
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:index.html
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:src/main.ts
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:3seguimiento-angular/src/app/app.component.ts
# Falhou: objeto ausente.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:2postulacion-react/src/context/PostulacionContext.tsx
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:1verificador-vue/src/views/HomeView.vue
# Falhou: objeto ausente.

LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

As comparações anterior e posterior às consultas coincidiram com a referência (saída vazia, código 0).

## Resumo

Commits até o snapshot: 10 (2026-07-08 a 2026-07-10). Pontos: 5 (esclarecido: 2, inconclusivo: 3, resolvido pelo snapshot: 0).
