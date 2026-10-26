---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

# 284 — RafaM-dev/hostRepo

## Leitura do repositório

O snapshot contém uma aplicação React + Vite na raiz: o host, com entrada e build próprios (#4, #6). A declaração de `@originjs/vite-plugin-federation` é o sinal tecnológico inicial (#1). O plugin configura o host para resolver `mf-remoteDetails` em `http://localhost:5001/assets/remoteEntry.js`, compartilhando `react` e `react-dom` (#2). O código importa `DetailEpisode` desse remote e o renderiza na lista de episódios, passando o personagem selecionado, o estado de abertura e um callback de fechamento (#3). Isso sustenta a relação ativa host → remote (#5). O destino está fora do snapshot: sua implementação, seu build e seu deploy não são observáveis aqui. O build próprio do host confirma o limite de uma unidade, mas não há deploy observado (#6).

A declaração da dependência, isolada, é fraca (#1). A configuração que nomeia e resolve a outra unidade e a relação ativa são fortes (#2, #5). A renderização do componente remoto, fora de uma rota que nomeie o destino, é moderada (#3); a rota `/episodes` monta o componente local `ListEpisodes`. A estrutura e o build também são moderados (#4, #6).

A documentação confirma a organização host/remote, a dependência do remote e o mecanismo de composição (#7–#11), mas as afirmações são sinais semânticos fracos. A escalabilidade alegada não tem corroboração (#12). Há ainda uma divergência concreta: o README nomeia `remote_root`, na porta 5174, enquanto configuração e import usam `mf-remoteDetails`, na porta 5001 (#13). O histórico esclarece que a configuração não mudou desde o primeiro commit observável e que a última alteração do README é posterior à configuração e ao código de composição (#14). Não se observa um estágio anterior de configuração que explique o nome do README; a origem desse texto permanece desconhecida, sem tornar ambígua a composição do snapshot.

## Observações

### 1. package.json:26

**Observação:** `@originjs/vite-plugin-federation`, versão `^1.4.1`, está declarado em `devDependencies`.

**Interpretação:** A dependência sinaliza Module Federation no projeto; sua declaração, sozinha, não estabelece unidades nem uma relação de composição.

### 2. vite.config.ts:3; vite.config.ts:8-15

**Observação:** O arquivo importa `federation` de `@originjs/vite-plugin-federation` e aplica o plugin em `plugins`. O bloco declara `name: "host"`, `filename: "remoteEntry.js"`, o remote `mf-remoteDetails` em `http://localhost:5001/assets/remoteEntry.js` e `shared: ["react", "react-dom"]`. Não declara `exposes`.

**Interpretação:** A configuração liga explicitamente o host a outra unidade por Module Federation, indicando seu nome de resolução e endereço. O host compartilha React e React DOM, sem oferecer módulos por `exposes`.

### 3. src/features/episodes_list/ListEpisodes.tsx:15; src/features/episodes_list/ListEpisodes.tsx:96-100; src/declare.d.ts:1-4; vite.config.ts:11-13; src/App.tsx:4; src/App.tsx:11; src/main.tsx:7-13

**Observação:** `ListEpisodes` importa `DetailEpisode` de `mf-remoteDetails/DetailEpisode` e renderiza `<DetailEpisode />`, passando `character={selectedCharacter}`, `open={!!selectedCharacter}` e `onClose={() => setSelectedCharacter(null)}`. Há declaração de tipo para o mesmo módulo. O nome `mf-remoteDetails` consta no `remotes` do Vite. `App` importa `ListEpisodes` e o monta na rota `/episodes`; `main.tsx` renderiza `App`.

**Interpretação:** O host usa o componente de uma unidade externa dentro da lista de episódios, com dados e callback passados por props. A construção implementa a composição em runtime. A renderização ocorre dentro de um componente local; a rota nomeia esse componente local, e não diretamente a unidade remota.

### 4. .; index.html:11; src/main.tsx:7-13; vite.config.ts:5-17; package.json:8

**Observação:** A raiz contém `index.html`, `package.json` e `vite.config.ts`. O HTML carrega `/src/main.tsx`, que renderiza `App`. O script `build` executa `tsc -b && vite build`, e o Vite configura os plugins React e federation. A revisão estrutural registra essa raiz como a única aplicação frontend do snapshot, sem declaração de workspace nem artefato de deploy.

**Interpretação:** A raiz delimita uma unidade frontend com entrada e build próprios: o host. A existência dessa unidade não demonstra, sozinha, a ligação com outro frontend.

### 5. src/features/episodes_list/ListEpisodes.tsx:15; src/features/episodes_list/ListEpisodes.tsx:96-100; vite.config.ts:11-13; src/App.tsx:11; src/main.tsx:7-13

**Observação:** A origem `.` importa e renderiza `DetailEpisode` de `mf-remoteDetails/DetailEpisode`. O `remotes` resolve `mf-remoteDetails` em `http://localhost:5001/assets/remoteEntry.js`. O componente é usado em `ListEpisodes`, montado na rota `/episodes` do `App` renderizado por `main.tsx`. A revisão de composição registra a relação `host → remote`, direção `origem → destino`, mecanismo `module-federation`, `No snapshot: No` e `Ativa: Yes`.

**Interpretação:** Há uma relação ativa de composição do host com um remote externo ao snapshot. O nome e o endereço do destino são observáveis do lado consumidor; a implementação e a exposição do módulo pelo remote não são verificáveis neste repositório.

### 6. package.json:4; package.json:7-10; vite.config.ts:5-17

**Observação:** O host tem o script `build: "tsc -b && vite build"` e configuração Vite própria com React e federation. Os outros scripts de execução são `dev: "vite"` e `preview: "vite preview"`; o manifesto declara versão `0.0.0`. A revisão de build e deploy registra para `.` build `separado`, deploy `não observado`, local servido `—` e versionamento `No`, sem artefato de publicação no snapshot.

**Interpretação:** O build confirma o limite próprio do host, separado do código do remote que está fora do repositório. Não há evidência de deploy ou de versionamento independente de publicação do host.

### 7. README.md:3

**Observação:** O README afirma que a aplicação implementa uma arquitetura de micro-frontends por meio de Module Federation.

**Interpretação:** É uma afirmação sobre a organização arquitetural, corroborada pela dependência configurada e pela relação host → remote. Sozinha, a frase não configura nem implementa essa organização.

### 8. README.md:3

**Observação:** O README apresenta esta aplicação como o host principal que integra módulos remotos.

**Interpretação:** A documentação atribui ao repositório o papel de host, corroborado pela unidade da raiz, pela configuração e pelo consumo remoto. O snapshot mostra um único remote e um único módulo consumido, embora a frase use o plural.

### 9. README.md:21

**Observação:** O README lista como requisito uma aplicação remota em execução na porta configurada, necessária para Module Federation.

**Interpretação:** A afirmação descreve a dependência do host em relação a uma unidade remota disponível em runtime, corroborada pelo import estático, pela configuração e pela relação ativa. Não estabelece deploy do remote.

### 10. README.md:75

**Observação:** O README afirma que o projeto usa `@originjs/vite-plugin-federation` para Module Federation.

**Interpretação:** A afirmação nomeia a tecnologia de composição e é corroborada pela declaração, pelo import e pela aplicação do plugin. Não situa sozinha os limites nem a ligação entre unidades.

### 11. README.md:299

**Observação:** O README lista o carregamento dinâmico de módulos remotos como característica de Module Federation.

**Interpretação:** A afirmação descreve o mecanismo de carga em runtime, corroborado pela resolução do remote e pela renderização de seu componente. A formulação isolada não identifica as unidades envolvidas.

### 12. README.md:300

**Observação:** O README caracteriza a arquitetura de micro-frontends como escalável.

**Interpretação:** É uma propriedade arquitetural alegada sem corroboração na revisão de documentação. Configurar e consumir um remote demonstra composição, mas não confirma nem contradiz a escalabilidade.

### 13. README.md:346-347

**Observação:** O README afirma que esta aplicação consome módulos do micro-frontend remoto `remote_root`, na porta 5174.

**Interpretação:** A afirmação situa host e destino, mas é contradita pela configuração e pelo import do snapshot, que usam `mf-remoteDetails` na porta 5001. A leitura arquitetural segue a relação observada, sem transformar o nome do README em outra unidade.

### 14. 8a62219 2025-11-19 (vite.config.ts; README.md); e68ba94 2025-11-19 (vite.config.ts; README.md)

**Observação:** A revisão histórica registra que `vite.config.ts` só é tocado no primeiro commit observável, `8a62219`, e mantém até o snapshot o mesmo objeto, `06a796a`, com `mf-remoteDetails` na porta 5001. O README muda uma única vez, no commit do snapshot, `e68ba94`, posterior à configuração e ao código de composição. A versão antiga do README não pôde ser lida por objeto ausente. O ponto sobre o conflito entre README e configuração tem resultado `esclarecido`.

**Interpretação:** O histórico explica a divergência documental: não houve estágio observável do `vite.config.ts` com `remote_root` na porta 5174. O texto divergente foi gravado ou mantido na versão final do README com a configuração atual já presente. Não se determina se o texto já estava no primeiro README nem sua origem fora desses artefatos; isso não altera a relação do snapshot.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:26) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #2 |
| 2 | 3.4.2 (package.json:26, Evidência); 3.4.3 (., Marcadores, Build); 3.4.4 (src/features/episodes_list/ListEpisodes.tsx:96, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #1, #2, #3, #4, #5, #7 (Evidência); 3.4.8 #1 (Ponto) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #3; configura #4; configura #5 |
| 3 | 3.4.4 (src/features/episodes_list/ListEpisodes.tsx:96) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #5 |
| 4 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 5 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #4; liga vite.config.ts:12 |
| 6 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #4 |
| 7 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #5 |
| 8 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #2; corrobora #3; corrobora #4; corrobora #5 |
| 9 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2; corrobora #3; corrobora #5 |
| 10 | 3.4.7 #4 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2 |
| 11 | 3.4.7 #5 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #2; corrobora #3; corrobora #5 |
| 12 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 13 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #2; contradiz #3; contradiz #5 |
| 14 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #2; explica #13 |

## Resumo

Observações: 14. Dimensões (tecnologia: 1, configuração: 1, código: 1, estrutura: 1, composição: 1, build-deploy: 1, documentação: 7, histórico: 1). Força (forte: 2, moderada: 3, fraca: 9, ambígua: 0). Evidência (tecnológica: 3, arquitetural: 11, contexto: 0).
