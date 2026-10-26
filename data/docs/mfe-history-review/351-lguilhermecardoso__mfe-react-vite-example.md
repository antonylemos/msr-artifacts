---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
inputs:
  clone: data/samples/mfe-sample-001/repos/lguilhermecardoso__mfe-react-vite-example
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Leitura do repositório

Há 14 commits alcançáveis até o snapshot, de 2025-07-15 a 2025-07-17. Em `6cdaf6f` (2025-07-15, “first commit”) já aparecem o README, os cinco projetos e suas configurações Vite: essa é a primeira presença observável, sem revelar onde foram desenvolvidos antes. `fdf3ccb` (2025-07-17, “feat: finish v1 project”) adiciona a página Sobre e altera manifestos e configurações; `980d535` (2025-07-17, “feat: try CD/CI configuration”) adiciona o workflow, o script de build e os dois arquivos de ambiente do host. O último commit é `ddf4741` (2025-07-17, “trigger deploy”).

As revisões 3.4.3–3.4.6 não deixam unidades, construções, relações ou deploy indeterminados. Os pontos são as cinco dependências sem uso da 3.4.2 e as duas afirmações contraditas da 3.4.7. O snapshot confirma o uso do pacote com escopo, a seleção dos remotes do Pages por `IS_LOCAL=false` e React `^19.1.0`; não explica, sozinho, a origem das divergências. Alguns blobs históricos estão ausentes no clone parcial: as consultas recusadas não baixaram objetos. Isso impede reconstruir as configurações antigas e parte dos manifestos. O histórico explica os limites desses pontos sem mudar os julgamentos do snapshot.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `vite-plugin-federation` declarado sem uso em `mf-dashboard` | 3.4.2 (mf-dashboard/package.json:31) | uso de dependência | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project | inconclusivo |
| 2 | `vite-plugin-federation` declarado sem uso em `mf-login` | 3.4.2 (mf-login/package.json:31) | uso de dependência | 6cdaf6f 2025-07-15 first commit | inconclusivo |
| 3 | `vite-plugin-federation` declarado sem uso em `mf-navbar` | 3.4.2 (mf-navbar/package.json:31) | uso de dependência | 6cdaf6f 2025-07-15 first commit | inconclusivo |
| 4 | `vite-plugin-federation` declarado sem uso em `mf-personagem-detalhe` | 3.4.2 (mf-personagem-detalhe/package.json:31) | uso de dependência | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project | inconclusivo |
| 5 | `vite-plugin-federation` declarado sem uso em `root-app` | 3.4.2 (root-app/package.json:33) | uso de dependência | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project; 980d535 2025-07-17 feat: try CD/CI configuration | inconclusivo |
| 6 | README descreve consumo local, mas o ambiente ativo seleciona Pages | 3.4.7 #9; 3.4.4 Notas; 3.4.5 Leitura do repositório; 3.4.6 Leitura do repositório | estágios em conflito | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project; 980d535 2025-07-17 feat: try CD/CI configuration | inconclusivo |
| 7 | A página Sobre diz React 18, mas os manifestos declaram React 19 | 3.4.7 #16 | estágios em conflito | 6cdaf6f 2025-07-15 first commit; fdf3ccb 2025-07-17 feat: finish v1 project | esclarecido |

## Observações

**1. Dependência em `mf-dashboard`.** O manifesto e a configuração Vite iniciais, de `6cdaf6f`, não estão disponíveis como blobs. O manifesto de `fdf3ccb` pôde ser lido e já contém os dois pacotes; não muda depois. A configuração Vite muda em `fdf3ccb` e `980d535`. O snapshot usa `@originjs/vite-plugin-federation` (`mf-dashboard/vite.config.ts:3`), não o pacote sem escopo. As versões antigas indisponíveis impedem verificar se houve uso anterior do pacote sem escopo, substituição ou abandono. O resultado é inconclusivo; não se atribui intenção à simples presença no manifesto.

**2. Dependência em `mf-login`.** O manifesto de `6cdaf6f` pôde ser lido: já declara os dois pacotes, inclusive `vite-plugin-federation: ^0.0.1`. Não há alteração posterior desse manifesto no log até o snapshot. A configuração Vite inicial está ausente como objeto; ela é alterada em `980d535`. O snapshot usa `@originjs/vite-plugin-federation` (`mf-login/vite.config.ts:3`), não o pacote sem escopo. As versões antigas indisponíveis impedem verificar se houve uso anterior do pacote sem escopo, substituição ou abandono. O resultado é inconclusivo; não se atribui intenção à simples presença no manifesto.

**3. Dependência em `mf-navbar`.** O manifesto de `6cdaf6f` pôde ser lido: já declara os dois pacotes, inclusive `vite-plugin-federation: ^0.0.1`. Não há alteração posterior desse manifesto no log até o snapshot. A configuração Vite inicial está ausente como objeto; ela é alterada em `980d535`. O snapshot usa `@originjs/vite-plugin-federation` (`mf-navbar/vite.config.ts:3`), não o pacote sem escopo. As versões antigas indisponíveis impedem verificar se houve uso anterior do pacote sem escopo, substituição ou abandono. O resultado é inconclusivo; não se atribui intenção à simples presença no manifesto.

**4. Dependência em `mf-personagem-detalhe`.** O manifesto e a configuração Vite iniciais, de `6cdaf6f`, não estão disponíveis como blobs. O manifesto de `fdf3ccb` pôde ser lido e já contém os dois pacotes; não muda depois. A configuração Vite muda em `fdf3ccb` e `980d535`. O snapshot usa `@originjs/vite-plugin-federation` (`mf-personagem-detalhe/vite.config.ts:3`), não o pacote sem escopo. As versões antigas indisponíveis impedem verificar se houve uso anterior do pacote sem escopo, substituição ou abandono. O resultado é inconclusivo; não se atribui intenção à simples presença no manifesto.

**5. Dependência em `root-app`.** O manifesto e a configuração Vite iniciais, de `6cdaf6f`, não estão disponíveis como blobs. O manifesto também muda em `fdf3ccb` e `980d535`; a leitura da versão intermediária falhou. As configurações antigas consultadas também falharam. O snapshot usa `@originjs/vite-plugin-federation` (`root-app/vite.config.ts:3`), não o pacote sem escopo. As versões antigas indisponíveis impedem verificar se houve uso anterior do pacote sem escopo, substituição ou abandono. O resultado é inconclusivo; não se atribui intenção à simples presença no manifesto.

**6. Consumo local no README.** O README é adicionado em `6cdaf6f` e não muda depois. Em `980d535`, os dois arquivos de ambiente são adicionados já com `IS_LOCAL=false` em `root-app/.env` e `IS_LOCAL=true` em `root-app/.env.local.bkp`; essas versões puderam ser lidas e não sofrem alterações posteriores. Isso data a coexistência dos valores, mas as configurações Vite de `6cdaf6f`, `fdf3ccb` e `980d535` não estão disponíveis. Não foi possível verificar se o README descrevia corretamente um estágio anterior nem quando o seletor local/Pages entrou. O snapshot explica a seleção vigente (`root-app/vite.config.ts:7-24`), mas o histórico da divergência permanece inconclusivo.

**7. React 18 na página Sobre.** A página é adicionada em `fdf3ccb`, já com “React 18”, e não muda depois. O conteúdo foi lido. Nesse mesmo estágio, os manifestos de `mf-dashboard` e `mf-personagem-detalhe` declaram `react` e `react-dom` `^19.1.0`; os de `mf-login` e `mf-navbar` já trazem essas versões em `6cdaf6f` e não mudam depois. Assim, a afirmação já conflita com esses quatro manifestos desde a criação da página: não é necessário supor uma migração posterior para explicar a divergência observável. O manifesto antigo do host não está disponível, e os iniciais de dashboard e detalhe também não; não se afirma que nunca existiu React 18 antes, nem que o texto foi copiado de outro projeto. O esclarecimento se limita à coexistência comprovada de texto e declarações conflitantes em `fdf3ccb`.

## Comandos

Todas as consultas abaixo são a ancestrais alcançáveis do snapshot, identificados pelo primeiro log, ou ao próprio snapshot. As leituras com `bad object` falharam por objeto histórico indisponível, sem busca na rede.

```sh
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example log --reverse --format='%h %ad %s' --date=short --name-status --no-renames ddf474192c82d47341b22be009915913c9227eca
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example rev-list --count ddf474192c82d47341b22be009915913c9227eca
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-dashboard/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-dashboard/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-login/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-login/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-navbar/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-navbar/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-personagem-detalhe/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:mf-personagem-detalhe/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:root-app/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 6cdaf6f:root-app/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:root-app/src/pages/Sobre.tsx
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:root-app/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:mf-dashboard/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:mf-personagem-detalhe/package.json
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show fdf3ccb:root-app/package.json # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 980d535:root-app/vite.config.ts # falhou: bad object (objeto ausente)
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 980d535:root-app/.env
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example show 980d535:root-app/.env.local.bkp
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example ls-tree -r 6cdaf6f -- mf-dashboard/package.json mf-dashboard/vite.config.ts mf-login/vite.config.ts mf-navbar/vite.config.ts mf-personagem-detalhe/package.json mf-personagem-detalhe/vite.config.ts root-app/package.json root-app/vite.config.ts
docs/mfe-history-review/tools/hist.sh lguilhermecardoso__mfe-react-vite-example ls-tree -r fdf3ccb -- mf-dashboard/package.json mf-dashboard/vite.config.ts mf-personagem-detalhe/package.json mf-personagem-detalhe/vite.config.ts root-app/package.json root-app/vite.config.ts
```

A comparação abaixo foi executada antes e depois das consultas, com saída vazia e código 0 em ambas:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 14 (2025-07-15 a 2025-07-17). Pontos: 7 (esclarecido: 1, inconclusivo: 6, resolvido pelo snapshot: 0).
