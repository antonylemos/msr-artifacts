---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
url: https://github.com/PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Contexto

POC de dashboard com shell e duas aplicações React, Counter e Weather. O host importa os dois módulos federados e os renderiza em cards; cada remote também tem entrada standalone (`shell/src/App.tsx:3–27`; `mfe-counter/src/main.tsx:1–6`; `mfe-weather/src/main.tsx:1–6`). O objetivo demonstrativo consta em `README.md:3–5`.

A cadeia de nomes, exposições, arquivos, exports e consumidores está materializada. Mantém-se revisão sobre a suficiência de Q4 diante de configuração operacional incompleta e possível bloqueio do build, sem inventar exigência geral de execução sem erros. Também se registra o limite entre unidades mínimas de dashboard e compartilhamento de componentes, comparando com 089/100.

ID, rank e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:124`, status `cloned`; HEAD coincide com o commit do front matter. Todo Git do clone usou `GIT_NO_LAZY_FETCH=1`. Não se instalaram pacotes, executaram builds/servidores, acessaram branches alternativos ou buscou conteúdo pela rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:124` registra rank 123, estratégias `terminology;technology` e elegibilidade `pass`. A fonte é a rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:23433`, elegibilidade `unknown`, e `data/discovery/mfe-round-002/candidates.csv:23440`, elegibilidade `pass`. Ambas registram descrição “This project is **not focused on the final product**, but on validating the concept of module federation”, tópicos vazios, linguagem TypeScript, `fork: false`, criação em 2026-01-15T18:24:14Z e push em 2026-01-15T18:36:27Z.

Consultas `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` dos dois arquivos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, filtradas pelo ID 1135167821, registram:

| Consulta | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-01` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T23:22:02.859Z / 2026-10-08T16:16:43.135Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-01` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T19:35:52.546Z / 2026-10-08T15:40:33.737Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-01` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:10:21.754Z / 2026-10-08T15:48:43.516Z |

Todos são hits de repositório com `path` vazio; não há hit de código ou linha casada informada. Por eliminação, as grafias `microfrontend`/`microfrontends` não aparecem no nome/descrição registrados, e não há tópicos; são observadas no README, respectivamente em `README.md:1` e `README.md:3`. “Module Federation” aparece em `README.md:1–3`, e a descrição também contém a expressão; não é possível atribuir esse hit exclusivamente ao README. O nome contém a forma hifenizada `module-federation`, mas isso não foi usado como evidência arquitetural nem para supor tokenização da busca.

O README raiz foi criado e atualizado em 2026-01-15; sua última alteração explicitada no histórico por caminho é `e4f9c06`, às 18:27:09Z, antes do merge avaliado às 18:36:21Z e das buscas de outubro de 2026. O texto do SHA não é posterior às buscas. Os metadados históricos foram usados sem ler versões antigas do README.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário completo por `git ls-tree -r`: 48 arquivos regulares `100644`, zero symlinks e zero gitlinks. Há três projetos próprios (`shell`, `mfe-counter`, `mfe-weather`), cada um com manifesto, lockfile, HTML, fontes, tsconfigs e config Vite. Não há `node_modules`, artefatos de remote compilados ou fontes vendorizadas de outro framework identificadas como aplicações adicionais. | contexto |
| Código-fonte (entradas) | `shell/index.html:9–11`, `mfe-counter/index.html:9–11` e `mfe-weather/index.html:9–11` carregam os respectivos `src/main.tsx`. `shell/src/main.tsx:1–7` monta App; `mfe-counter/src/main.tsx:1–6` monta CounterWidget; `mfe-weather/src/main.tsx:1–6` monta WeatherWidget. São três alvos materiais, não apenas módulos em documentação. | forte |
| Configuração (host) | `shell/vite.config.ts:12–20` ativa a federação e registra `weather` em `http://localhost:4173/assets/remoteEntry.js` e `counter` em `http://localhost:4174/assets/remoteEntry.js`, compartilhando React/ReactDOM. O host usa porta de desenvolvimento 5175 (`shell/vite.config.ts:5–8`). | forte |
| Configuração (produtores) | `mfe-counter/vite.config.ts:14–20` nomeia `counter`, emite `remoteEntry.js` e expõe `./Widget` de `./src/bootstrap`; `mfe-weather/vite.config.ts:14–20` faz o correspondente com `weather`. Os arquivos `bootstrap.tsx` existem e os nomes consumidos correspondem às exposições. | forte |
| Código-fonte (exports e consumo) | `mfe-counter/src/bootstrap.tsx:1–2` e `mfe-weather/src/bootstrap.tsx:1–2` exportam por default os respectivos widgets. `shell/src/App.tsx:3–4` importa `weather/Widget` e `counter/Widget` por React.lazy; `shell/src/App.tsx:16–27` monta ambos sob Suspense. `shell/src/vite-env.d.ts:1–9` declara os mesmos módulos/default exports, sem props obrigatórias; consumidor e produtores não apresentam desencontro de props/exports. | forte |
| Código-fonte (contribuição funcional) | `mfe-counter/src/CounterWidget.tsx:1–18` possui estado e ações locais de incremento/decremento. `mfe-weather/src/WeatherWidget.tsx:1–11` apresenta clima/local fixos, sem fetch. São as mesmas interfaces montadas pelas entradas standalone. A simplicidade e a natureza de componente exposto precisam ser distinguidas de uma biblioteca compartilhada, sem inventar requisito de tamanho, rota ou tela completa. | ambígua |
| Build/deploy (independência) | Os três manifestos, em `shell/package.json:6–15`, `mfe-counter/package.json:6–15` e `mfe-weather/package.json:6–15`, definem build próprio `tsc -b && vite build`, preview e dependências React/federação. Não existe import direto de fontes de outro alvo; os remotes são referências de runtime no shell. | forte |
| Configuração (pacotes resolvíveis) | Imports de Vite, plugin React e federação nos três configs correspondem aos pacotes declarados nos manifestos (`shell/package.json:13–15`, `shell/package.json:22–29`, e mesmas linhas nos dois remotes). Cada lock resolve federação 1.4.1 (linhas 1012–1014), plugin React 5.1.2 (1740–1742) e Vite 7.3.1 (3146–3148): `shell/package-lock.json:1012–1014`, `mfe-counter/package-lock.json:1012–1014`, `mfe-weather/package-lock.json:1012–1014`; demais resoluções conferidas nos mesmos arquivos. Não se confundiu pacote declarado com sucesso de instalação/build. | moderada |
| Código-fonte (fronteiras) | Busca literal ativa `git grep -n -F -e '../../' -e '../../../'` em todos os JS/TS/TSX do SHA: nenhuma ocorrência. Leitura de todos os fontes TSX e dos imports dos configs mostra imports locais dentro de cada projeto e os dois imports federados do shell; nenhum atravessa a fronteira por fonte relativo. | moderada |
| Configuração / Build/deploy (portas) | O host espera previews em 4173/4174 (`shell/vite.config.ts:15–18`), mas os remotes só fixam `server.port` em 5173/5174 (`mfe-weather/vite.config.ts:5–8`; `mfe-counter/vite.config.ts:5–8`). Os configs completos não fixam `preview.port`, e os scripts de preview são apenas `vite preview` (`mfe-weather/package.json:10`; `mfe-counter/package.json:10`). `README.md:65–78` orienta build/preview antes de iniciar o host, sem especificar explicitamente as portas de preview. A ligação está declarada, mas não é garantida por essas configurações para qualquer ordem de inicialização/ocupação de portas. Não se executaram servidores para verificar o resultado. | ambígua |
| Código-fonte / Build/deploy (possível bloqueio) | `shell/src/main.tsx:1–7` importa React como valor, mas não o referencia; `shell/tsconfig.app.json:17–22` usa JSX automático e `noUnusedLocals: true`. O script roda `tsc -b` antes do Vite (`shell/package.json:8`), e o tsconfig raiz referencia o de aplicação (`shell/tsconfig.json:2–5`). Isso indica possível diagnóstico de import não usado bloqueando o build do shell. É constatação estática, sem alegar execução ou criar regra de exclusão automática. | ambígua |
| Documentação | `README.md:11–25` descreve três aplicações e builds independentes; `README.md:39–45` declara objetivo de validar conceitos. O README não confirma por si a conexão: os registros positivos vêm dos configs, entradas, exports e consumidores acima. Não há ADR separado no inventário. | contexto |

## Autoria e histórico

Metadados de `git rev-list`: **4 commits, 1 merge e 2 commits-raiz**. Raízes: `01b1d4a16317cc853daff18c8142c71432673d7f` e `9f20c00b352397e34ce9910dfc26cd2a78d465c6`. Clone não shallow. Não se resumiu o histórico a uma raiz única ou a três commits lineares.

`git log --no-renames --name-status` foi consultado separadamente por `shell`, `mfe-counter` e `mfe-weather`, além do README. Todos os arquivos dos três projetos foram adicionados juntos em `01b1d4a`, de PedroHugo11 em 2026-01-15T15:32:02-03:00, mensagem `feat: microfrontend dashboard POC`, sem modificações posteriores de seus arquivos alcançáveis no snapshot. A outra raiz, `9f20c00`, de Pedro Hugo/GitHub às 15:24:15-03:00, introduz o README, atualizado por `e4f9c06` às 15:27:09-03:00. O merge avaliado, PedroHugo11/PedroHugo11, ocorre às 15:36:21-03:00.

Adição em bloco não prova que o titular escreveu originalmente cada trecho nem que as aplicações foram importadas de terceiros. Os projetos preservam artefatos de scaffold Vite, mas a ligação específica de configs/bootstrap/consumo foi avaliada como código materializado do candidato, não como snippet gerado apenas exibido. Não se identificou upstream declarado para a POC nas evidências lidas. Não foram consultados blobs históricos, e nenhum objeto ausente foi encontrado.

Referências locais apenas para registro: `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado. Nenhum outro branch local/remoto aparece na enumeração; isso não afirma inexistência de branches no servidor.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell, Counter e Weather possuem entradas próprias e relação explícita de composição (`shell/vite.config.ts:15–18`; `shell/src/App.tsx:3–4`; entradas standalone dos remotes). |
| Q2 | Yes | Cada projeto possui entrada e comando de build próprios, sem import direto de fontes do outro (`shell/package.json:6–10`; `mfe-counter/package.json:6–10`; `mfe-weather/package.json:6–10`; busca integral de imports relativos descrita acima). Possível falha do build não apaga a separação estrutural observada. |
| Q3 | Yes | O shell carrega e renderiza os dois exports no mesmo dashboard sob Suspense (`shell/src/App.tsx:16–27`), com nomes/default exports correspondentes aos produtores. |
| Q4 | Yes | Cadeia configurada e conectada no fluxo documentado: `remotes` do shell (`shell/vite.config.ts:15–18`) ↔ `exposes ./Widget` dos produtores (`vite.config.ts:14–20`) ↔ `lazy import` (`shell/src/App.tsx:3–4`) ↔ render sob Suspense (`:16–27`). O README manda rodar o shell com `npm run dev` (`README.md:75–78`), que é `vite` puro (`shell/package.json:7`) e não executa `tsc`; só os remotes precisam de build/preview (`README.md:65–73`), e os `main.tsx` deles não importam React. O import `React` sem uso do shell (`shell/src/main.tsx:1`) com `noUnusedLocals` (`tsconfig.app.json:17–22`) só afetaria o build de produção do host, fora do fluxo documentado. As portas dos previews seguem a ordem documentada (weather em 4173, counter em 4174, `shell/vite.config.ts:16–17`). |
| Q5 | Yes | Q5 acompanha Q1–Q4. Não é code sharing (089/100): cada remote expõe a aplicação standalone inteira (o `main.tsx` standalone monta o mesmo widget que `bootstrap.tsx` expõe), e o shell só compõe esses alvos, padrão host+remotes de 106/109 e do final 007. A simplicidade dos widgets é própria de POC e não cria regra de tamanho mínimo. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes, sem exceção. (O rascunho da Lupa propunha `Uncertain/review` com Q4/Q5 Undetermined; ver divergência abaixo.) Não se trata de mera dependência de federação, conteúdo em README ou exposição sem consumidor: os dois lados e a renderização estão no snapshot.
- `frontend_units: 3` e `unit_organization: monorepo` contam os três alvos próprios, não cada módulo exposto. `repo_type: example` decorre da POC explícita (`README.md:3–5`). React e Vite são observados nos fontes e configurações resolvíveis.
- Não é `MFE-unit`, pois o host e os dois produtores estão presentes. Não há mecanismo de plugin de plataforma terceira, iframe/link, ou composição restrita ao build time que explique a ligação.
- Não se impõe sucesso de execução como regra nova. Os contratos de nomes/arquivos/exports são correspondentes; os pontos de revisão são concretos (preview e possível diagnóstico do compilador), a comparar com os precedentes de imperfeição de execução.

## Notas para análise

- **Protocolo (família):** busca nas anotações por `PedroHugo11`, `mf-dashboard`, `CounterWidget` e `WeatherWidget` não encontrou irmão já anotado. Os artefatos comuns de scaffold não comprovam cópia de um candidato específico.
- **Checklist (comparadores):** 076/084/096/106/109 têm cadeias de host/remotes comparáveis, sem autorizar transferir a classe por nome/plugin. Aqui não há desencontro de chave exposta/arquivo/export como discutido em 097/103/104; Q4 permanece aberto por condições de build/serving. O precedente 083 exige decidir como tratar imperfeições sem pressupor exclusão automática.
- **Checklist (granularidade):** 089/100 estão em `review` por code sharing. Aqui o Counter mantém seu próprio estado e cada produtor standalone monta exatamente o widget exposto, em vez de somente callback/hook ou card de vitrine. Por outro lado, Weather é apresentação fixa e Counter é controle genérico; essa diferença não cria automaticamente uma regra de inclusão ou complexidade mínima.

## Divergência entre analista e revisor

O rascunho da Lupa propunha `Uncertain`/`review`, com Q4 e Q5 Undetermined, por (a) o possível bloqueio de `tsc -b` no build do host e a dependência da ordem das portas dos previews e (b) a proximidade com code sharing (089/100). O revisor independente (Prisma) propôs Q4 Yes e Q5 Yes, e a coordenação verificou os fatos no SHA e adotou a proposta, mantendo `draft`:

- O fluxo documentado do shell usa `npm run dev` (`vite`, sem `tsc`); o import `React` sem uso sob `noUnusedLocals` só afetaria `npm run build` do host, passo fora do fluxo (limitação registrada em RQ3, sem efeito em Q4).
- `vite preview` usa 4173 por padrão e avança para a porta seguinte se ocupada; o README sobe weather e depois counter, exatamente o que o shell espera. Não há desencontro de chave/arquivo/export como em 097/103/104.
- Cada remote expõe a própria aplicação standalone inteira; não é o caso de 089 (botões e hook de app com outra UI) nem de 100 (card de vitrine).

**Alternativa registrada para o pesquisador:** manter Q5 Undetermined por granularidade dos widgets (Weather é apresentação fixa, Counter é controle genérico), ou tratar a imperfeição do build do host como impeditiva de Q4 (então Non-MFE ou Uncertain). Não se realizou execução.
