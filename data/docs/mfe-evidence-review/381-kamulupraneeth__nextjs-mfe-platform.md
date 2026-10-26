---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Leitura do repositório

Três aplicações Next.js com entrada e build próprios (#8–#10, #13–#15) formam uma composição Multi-Zones por roteamento no servidor. O shell declara os endereços das zonas e as regras para páginas e assets (#1); a construção registrada na 3.4.4 (#7) implementa as relações ativas com analytics-dashboard e workspace-document (#11–#12). Cada zona responde com seu próprio documento. A configuração separa os prefixos dos assets e encaminha também a API de métricas do analytics. Não há dependência das tecnologias inspecionadas na 3.4.2, portanto a dimensão tecnologia não tem observação.

Builds separados sustentam os limites das unidades, mas deploy e versionamento independente não foram observados (#13–#15). As URLs de produção são parâmetros previstos, sem artefato de publicação. Os cinco postMessage são operações entre página e worker dentro do analytics (#2–#6), sem comunicação entre frontends. A afirmação sobre a API também se refere ao backend da própria zona (#20).

A documentação acessível confirma os papéis das unidades e o encaminhamento (#16, #18–#19, #21–#23, #25–#28), mas os comentários de renderização dentro do gateway e navbar compartilhada são contraditos pelos layouts separados (#17, #24). O histórico esclarece que esses comentários já surgiram junto da separação (#30). A única dúvida histórica é se o worker externo chegou a ser usado em uma versão anterior (#29); ela não torna ambígua a arquitetura do snapshot. O README da raiz não foi usado: a revisão 3.4.7 registra sua remoção da aquisição por preset:binaries.

## Observações

### 1. host-shell/next.config.ts:3-52

**Observação:** A configuração exportada declara `ANALYTICS_URL` e `WORKSPACE_URL`, obtidas de `PRODUCTION_ANALYTICS_URL` e `PRODUCTION_WORKSPACE_URL`, com padrões locais. `rewrites()` retorna `beforeFiles` com destinos para `/analytics`, `/analytics/api/metrics`, `/analytics/:path` e `/analytics-assets/_next/:path*`, e para `/workspace`, `/workspace/:path*` e `/workspace-assets/_next/:path*`.

**Interpretação:** A configuração do shell resolve duas zonas por URL e encaminha seus caminhos e assets sob a origem do host.

**Nota:** É um único bloco da unidade host-shell, deduplicado entre as origens. Os next.config.ts das zonas citados nas tabelas só declaram basePath e assetPrefix: delimitam caminhos próprios e publicação de assets, sem declarar outra unidade ou URL de remote. Ficam em estrutura, composição e build-deploy, sem observação adicional na dimensão 2. As portas de desenvolvimento apenas corroboram os destinos.

### 2. analytics-dashboard/public/workers/filterWorker.js:2-7; analytics-dashboard/src/app/page.tsx:26-54

**Observação:** O handler `self.onmessage` devolve `logs` por `self.postMessage(logs)` quando a busca está vazia. A página instancia o worker de uma URL de Blob inline, não desse arquivo.

**Interpretação:** É comunicação worker → thread principal dentro do analytics; a revisão registra o arquivo externo sem uso, sem composição entre unidades.

### 3. analytics-dashboard/public/workers/filterWorker.js:14-23; analytics-dashboard/src/app/page.tsx:46-54

**Observação:** Após filtrar os logs, o arquivo externo chama `self.postMessage(filteredLogs)`. A página usa o worker inline.

**Interpretação:** O retorno de filtragem pertence à mesma unidade; o arquivo externo sem uso não mostra mensagens entre frontends.

### 4. analytics-dashboard/src/app/page.tsx:26-30; analytics-dashboard/src/app/page.tsx:46-54

**Observação:** A string workerCode contém `self.postMessage(logs)` para busca vazia. Ela vira Blob e Worker; o handler da página atualiza `setFilteredLogs`.

**Interpretação:** É retorno do worker inline à página do analytics, não comunicação entre unidades.

### 5. analytics-dashboard/src/app/page.tsx:26-54

**Observação:** O workerCode filtra os logs e devolve `filtered` por `self.postMessage(filtered)`. O Worker é criado da string e a resposta atualiza o estado da página.

**Interpretação:** A construção participa da filtragem interna do analytics, sem composição de frontends.

### 6. analytics-dashboard/src/app/page.tsx:46-54; analytics-dashboard/src/app/page.tsx:94-99

**Observação:** Um efeito envia `{ logs: tableLogs, searchTerm }` por `workerRef.current.postMessage` ao worker criado da URL de Blob.

**Interpretação:** É envio página → worker dentro da própria unidade; postMessage é um falso positivo para comunicação entre micro frontends.

### 7. host-shell/next.config.ts:3-6; host-shell/next.config.ts:10-46; analytics-dashboard/next.config.ts:5-6; workspace-document/next.config.ts:5-7

**Observação:** A função `rewrites()` encaminha os caminhos de analytics e workspace para ANALYTICS_URL e WORKSPACE_URL, incluindo os caminhos dos assets. As zonas declaram os basePath e assetPrefix correspondentes.

**Interpretação:** A tabela de rotas liga o shell às duas aplicações de destino. A construção manual da 3.4.4 materializa a composição Multi-Zones por encaminhamento no servidor.

**Nota:** A linha manual da 3.4.4 tem observação própria, mesmo estando no bloco de configuração de #1. A força segue a orientação para rota que liga um caminho a uma unidade de destino.

### 8. analytics-dashboard; analytics-dashboard/package.json:2-8; analytics-dashboard/src/app/layout.tsx:9; analytics-dashboard/src/app/page.tsx:16; analytics-dashboard/next.config.ts:3-7

**Observação:** O diretório tem manifesto próprio, RootLayout do App Router e página inicial próprios, com script `build: next build`. Sua configuração declara basePath `/analytics` e assetPrefix `/analytics-assets`.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias. Não há declaração de workspace.

### 9. host-shell; host-shell/package.json:2-8; host-shell/src/app/layout.tsx:17; host-shell/src/app/page.tsx:5; host-shell/next.config.ts:8-50

**Observação:** O diretório tem manifesto próprio, RootLayout do App Router e página inicial próprios, com script `build: next build`. Sua configuração declara rewrites para as duas zonas.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias. Não há declaração de workspace.

### 10. workspace-document; workspace-document/package.json:2-8; workspace-document/src/app/layout.tsx:20; workspace-document/src/app/page.tsx:8; workspace-document/next.config.ts:3-8

**Observação:** O diretório tem manifesto próprio, RootLayout do App Router e página inicial próprios, com script `build: next build`. Sua configuração declara basePath `/workspace` e assetPrefix `/workspace-assets`.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias. Não há declaração de workspace.

### 11. host-shell/next.config.ts:3-4; host-shell/next.config.ts:10-33; analytics-dashboard/next.config.ts:5-6; analytics-dashboard/src/app/page.tsx:16; analytics-dashboard/src/app/api/metrics/route.ts:5

**Observação:** O shell encaminha `/analytics`, `/analytics/api/metrics`, `/analytics/:path` e `/analytics-assets/_next/:path*` para ANALYTICS_URL. Os prefixos coincidem com basePath e assetPrefix do analytics-dashboard, que contém a página e o handler de métricas.

**Interpretação:** É a relação ativa host-shell → analytics-dashboard, por Next.js Multi-Zones, registrada como tipo e mecanismo other. A zona responde com sua página inteira; `/analytics/:path` cobre um segmento.

### 12. host-shell/next.config.ts:5-6; host-shell/next.config.ts:10; host-shell/next.config.ts:35-46; workspace-document/next.config.ts:5-7; workspace-document/src/app/page.tsx:8

**Observação:** O shell encaminha `/workspace`, `/workspace/:path*` e `/workspace-assets/_next/:path*` para WORKSPACE_URL. Os prefixos correspondem a basePath e assetPrefix do workspace-document.

**Interpretação:** É a relação ativa host-shell → workspace-document, por encaminhamento Multi-Zones, registrada como other. A zona fornece um documento próprio.

### 13. analytics-dashboard/package.json:3-8; analytics-dashboard/next.config.ts:3-7

**Observação:** O manifesto de analytics-dashboard declara `build: next build`, `start: next start`, pacote private e versão 0.1.0. A revisão registra build separado, deploy não observado e versionamento independente No.

**Interpretação:** Há fronteira de build própria da aplicação, sem evidência de publicação nem de versionamento independente. As URLs de produção previstas no shell não demonstram deploy realizado.

### 14. host-shell/package.json:3-8; host-shell/next.config.ts:8-50

**Observação:** O manifesto de host-shell declara `build: next build`, `start: next start`, pacote private e versão 0.1.0. A revisão registra build separado, deploy não observado e versionamento independente No.

**Interpretação:** Há fronteira de build própria da aplicação, sem evidência de publicação nem de versionamento independente. As URLs de produção previstas no shell não demonstram deploy realizado.

### 15. workspace-document/package.json:3-8; workspace-document/next.config.ts:3-8

**Observação:** O manifesto de workspace-document declara `build: next build`, `start: next start`, pacote private e versão 0.1.0. A revisão registra build separado, deploy não observado e versionamento independente No.

**Interpretação:** Há fronteira de build própria da aplicação, sem evidência de publicação nem de versionamento independente. As URLs de produção previstas no shell não demonstram deploy realizado.

### 16. analytics-dashboard/src/app/layout.tsx:6

**Observação:** O campo description diz “Isolated Micro-Frontend Stream Core”.

**Interpretação:** Afirma uma unidade frontend isolada, corroborada por sua estrutura, build e relação com o shell. Não prova implantação.

### 17. analytics-dashboard/src/app/layout.tsx:17

**Observação:** O comentário diz que as grades são renderizadas dentro do frame do gateway.

**Interpretação:** A afirmação de encaixe no layout do host é contradita pelos documentos HTML separados e pela relação de encaminhamento.

### 18. analytics-dashboard/src/app/page.tsx:112-113

**Observação:** A página exibe “Running independently” e “Proxied dynamically via main Host Route Matrix”.

**Interpretação:** A execução própria e o acesso pelo proxy são corroborados pelo build separado e pela relação ativa. Não é afirmação de deploy.

### 19. host-shell/next.config.ts:15

**Observação:** O comentário diz que o caminho base é encaminhado para o servidor local na porta 3001.

**Interpretação:** A regra de /analytics e o padrão local corroboram a afirmação; a variável de produção pode substituir o endereço.

### 20. host-shell/next.config.ts:20

**Observação:** O comentário anuncia o casamento explícito da rota de API pelo proxy.

**Interpretação:** A regra encaminha a API de métricas ao backend da própria zona; é contexto de acesso ao backend, sem mensagens entre frontends.

### 21. host-shell/next.config.ts:25

**Observação:** O comentário descreve o encaminhamento de subpáginas do Analytics Dashboard.

**Interpretação:** A regra /analytics/:path corrobora esse encaminhamento com alcance de um segmento, sem afirmar subpáginas existentes ou recursão ilimitada.

### 22. host-shell/next.config.ts:30

**Observação:** O comentário descreve o encaminhamento dos bundles JS sem perda de caminhos de assets.

**Interpretação:** O encaminhamento e o assetPrefix da zona corroboram a separação de caminhos, sem teste de entrega dos arquivos.

### 23. host-shell/src/app/layout.tsx:14

**Observação:** O campo description diz “Distributed Multi-Zone Orchestrator Container”.

**Interpretação:** Nomeia o papel do shell na composição Multi-Zones, corroborado pelos dois encaminhamentos. Não prova distribuição em infraestrutura externa.

### 24. host-shell/src/app/layout.tsx:27

**Observação:** O comentário descreve a navbar como compartilhada e posicionada no topo do layout.

**Interpretação:** A posição é confirmada, mas o compartilhamento entre unidades é contradito: apenas o shell importa e renderiza GlobalNavbar; as zonas têm layouts próprios.

### 25. host-shell/src/app/page.tsx:73

**Observação:** O comentário descreve links para dois módulos MFE ativos.

**Interpretação:** As duas unidades e suas relações ativas corroboram os destinos dos cartões; ativo significa configuração e código presentes, sem disponibilidade de serviço observada.

### 26. host-shell/src/components/GlobalNavbar.tsx:38

**Observação:** O comentário descreve a troca de Link por uma tag a para evitar bloqueios de cache do cliente.

**Interpretação:** As tags a da barra corroboram a navegação de documento para as zonas. A intenção sobre cache não é medição; os cartões da página inicial continuam usando Link.

### 27. workspace-document/next.config.ts:4

**Observação:** O comentário descreve a configuração do caminho base do submódulo editor.

**Interpretação:** O basePath /workspace e o encaminhamento do shell corroboram essa fronteira de rota da zona.

### 28. workspace-document/next.config.ts:6

**Observação:** O comentário descreve um prefixo para evitar colisões dos chunks com o shell.

**Interpretação:** O assetPrefix e a regra correspondente do shell corroboram a separação de caminhos de assets, sem demonstrar compilação conjunta ou resultado de build.

### 29. c201365 2026-05-31 (analytics-dashboard/public/workers/filterWorker.js, analytics-dashboard/src/app/page.tsx)

**Observação:** A revisão histórica registra a criação do arquivo externo e a alteração da página em c201365, cuja mensagem anuncia o worker inline. O conteúdo antigo da página estava ausente localmente; o snapshot instancia o worker por Blob.

**Interpretação:** Permanece inconclusivo se o arquivo externo já foi usado ou nasceu sem conexão. A dúvida é sobre o passado: não muda a leitura do snapshot, em que as mensagens são internas e o arquivo externo está sem uso.

### 30. 1dedac6 2026-05-30 (analytics-dashboard/src/app/layout.tsx, host-shell/src/app/layout.tsx); a2939d5 2026-05-31 (analytics-dashboard/src/app/layout.tsx, host-shell/src/app/layout.tsx, host-shell/src/components/GlobalNavbar.tsx)

**Observação:** Nos conteúdos disponíveis de 1dedac6, analytics e shell já têm documentos HTML próprios. Em a2939d5, o shell recebe GlobalNavbar e o comentário de barra compartilhada, e o analytics recebe o comentário do frame sem deixar seu próprio documento. A configuração inicial do shell não estava disponível.

**Interpretação:** O ponto está esclarecido para esses layouts: os comentários surgem junto da separação dos documentos, sem evidência de estágio anterior em que o analytics usasse o layout ou a barra do shell. Isso explica as duas afirmações contraditas, sem alterar a arquitetura observada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (host-shell, Marcadores, Build); 3.4.4 (host-shell/next.config.ts:10, Arquivo:linha, Observação); 3.4.5 #1, #2 (Configuração, Código); 3.4.6 #1, #3 (Onde é servida); 3.4.6 #2 (Artefatos); 3.4.7 #2-#8, #12, #13 (Evidência) | 2 configuração | configuração | other | arquitetural | forte | configura #7; configura #9; configura #11; configura #12 |
| 2 | 3.4.4 (analytics-dashboard/public/workers/filterWorker.js:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 3 | 3.4.4 (analytics-dashboard/public/workers/filterWorker.js:23) | 3 código | código-fonte | — | contexto | fraca | — |
| 4 | 3.4.4 (analytics-dashboard/src/app/page.tsx:30) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (analytics-dashboard/src/app/page.tsx:41) | 3 código | código-fonte | — | contexto | fraca | — |
| 6 | 3.4.4 (analytics-dashboard/src/app/page.tsx:97) | 3 código | código-fonte | — | contexto | fraca | — |
| 7 | 3.4.4 (host-shell/next.config.ts:10) | 3 código | configuração | other | arquitetural | forte | implementa #11; implementa #12 |
| 8 | 3.4.3 (analytics-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 9 | 3.4.3 (host-shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 10 | 3.4.3 (workspace-document) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.5 #1 | 5 composição | configuração | other | arquitetural | forte | liga #9; liga #8 |
| 12 | 3.4.5 #2 | 5 composição | configuração | other | arquitetural | forte | liga #9; liga #10 |
| 13 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #8 |
| 14 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #9 |
| 15 | 3.4.6 #3 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #10 |
| 16 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #8; corrobora #11; corrobora #13 |
| 17 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | contradiz analytics-dashboard/src/app/layout.tsx:14-20; contradiz host-shell/src/app/layout.tsx:23-32; contradiz #11 |
| 18 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #13; corrobora #11; corrobora analytics-dashboard/package.json:6-8 |
| 19 | 3.4.7 #4 | 7 documentação | comentário | other | arquitetural | fraca | corrobora #11; corrobora #1 |
| 20 | 3.4.7 #5 | 7 documentação | comentário | — | contexto | fraca | corrobora #1; corrobora analytics-dashboard/src/app/page.tsx:68; corrobora analytics-dashboard/src/app/api/metrics/route.ts:5-8 |
| 21 | 3.4.7 #6 | 7 documentação | comentário | other | arquitetural | fraca | corrobora #11; corrobora #1 |
| 22 | 3.4.7 #7 | 7 documentação | comentário | other | arquitetural | fraca | corrobora #11; corrobora analytics-dashboard/next.config.ts:6 |
| 23 | 3.4.7 #8 | 7 documentação | comentário | other | arquitetural | fraca | corrobora #11; corrobora #12 |
| 24 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | contradiz host-shell/src/app/layout.tsx:4,27-31; contradiz analytics-dashboard/src/app/layout.tsx:1-22; contradiz workspace-document/src/app/layout.tsx:1-33 |
| 25 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #8; corrobora #10; corrobora #11; corrobora #12; corrobora host-shell/src/app/page.tsx:6-23,74-79 |
| 26 | 3.4.7 #11 | 7 documentação | comentário | — | arquitetural | fraca | corrobora host-shell/src/components/GlobalNavbar.tsx:10-14,41-52 |
| 27 | 3.4.7 #12 | 7 documentação | comentário | other | arquitetural | fraca | corrobora #12; corrobora workspace-document/next.config.ts:5 |
| 28 | 3.4.7 #13 | 7 documentação | comentário | other | arquitetural | fraca | corrobora #12; corrobora workspace-document/next.config.ts:7; corrobora #1 |
| 29 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #2; explica #3; explica #4; explica #5; explica #6 |
| 30 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #17; explica #24 |

## Resumo

Observações: 30. Dimensões (tecnologia: 0, configuração: 1, código: 6, estrutura: 3, composição: 2, build-deploy: 3, documentação: 13, histórico: 2). Força (forte: 4, moderada: 6, fraca: 20, ambígua: 0). Evidência (tecnológica: 0, arquitetural: 23, contexto: 7).
