---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
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

# 309 — tonoizer/react-mf-patch-skew-repro

## Leitura do repositório

Quatro aplicações React/Vite têm entradas e builds próprios no mesmo workspace pnpm (#16–#19, #23–#26). A cadeia de evidências vai das declarações do plugin (#1–#4) às configurações de federação (#5–#8), aos imports e renderizações (#9–#14) e às três relações de composição (#20–#22). O host consome remote_a e remote_b, e remote_a expõe o mesmo App que consome remote_c: é simultaneamente remoto e host aninhado. As duas configurações que nomeiam destinos e os três imports identificam diretamente as ligações; as exposições de remote_b e remote_c, isoladas, apenas configuram o mecanismo de cada unidade.

A composição implementada serve a uma reprodução de falha de compartilhamento de React. A 3.4.5 julga as três relações ativas pela cadeia de entrada e de consumo, embora a saída versionada registre quebra do host antes da montagem dos remotos (#20–#22, #27). Não se infere êxito de runtime desse julgamento. Os builds são separados, mas deploy e versionamento independente não foram demonstrados (#23–#26); as portas de preview são execução local. A raiz só coordena os pacotes (#15).

A documentação confirma os papéis das unidades (#29–#32), mas generaliza indevidamente os patches distintos: host e remote_c usam o mesmo 19.2.8 (#28). A lista de compartilhamento também excede o uso demonstrado: react/jsx-dev-runtime e react/compiler-runtime são declarados, sem consumidores observados (#33). As afirmações permanecem fracas, mesmo quando corroboradas (#27–#35). O histórico de um único commit esclarece a coexistência dessas ressalvas desde a primeira versão observável (#36–#37), sem demonstrar intenção ou uso anterior. Não restam ambiguidades arquiteturais registradas nas revisões finais.

## Observações

### 1. host/package.json:15

**Observação:** O manifesto de `host` declara `@module-federation/vite` 1.21.6 em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a configuração em uso tem observação própria.

### 2. remote_a/package.json:15

**Observação:** O manifesto de `remote_a` declara `@module-federation/vite` 1.21.6 em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a configuração em uso tem observação própria.

### 3. remote_b/package.json:15

**Observação:** O manifesto de `remote_b` declara `@module-federation/vite` 1.21.6 em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a configuração em uso tem observação própria.

### 4. remote_c/package.json:15

**Observação:** O manifesto de `remote_c` declara `@module-federation/vite` 1.21.6 em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a configuração em uso tem observação própria.

### 5. host/vite.config.js:3; host/vite.config.js:5-11; host/vite.config.js:19-36

**Observação:** `federation` declara `name: 'host'` e dois remotes de tipo `module`: `remote_a`, com entrada `http://localhost:5001/remoteEntry.js`, e `remote_b`, com entrada `http://localhost:5002/remoteEntry.js`. As cinco entradas de `shared` são `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` e `react-dom/client`, todas com `singleton: true`, `strictVersion: false` e `requiredVersion: '^19.2.4'`. O plugin usa `shareStrategy: 'version-first'` e `hostInitInjectLocation: 'entry'`.

**Interpretação:** A configuração liga explicitamente o host a duas outras unidades por Module Federation.

### 6. remote_a/vite.config.js:3; remote_a/vite.config.js:5-11; remote_a/vite.config.js:19-35

**Observação:** `federation` declara `name: 'remote_a'`, `filename: 'remoteEntry.js'`, expõe `./App` de `./src/App.jsx` e declara `remote_c` de tipo `module`, com entrada `http://localhost:5003/remoteEntry.js`. As cinco entradas de `shared` são `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` e `react-dom/client`, todas com `singleton: true`, `strictVersion: false` e `requiredVersion: '^19.2.4'`. O plugin usa `shareStrategy: 'version-first'` e `hostInitInjectLocation: 'entry'`.

**Interpretação:** A configuração liga remote_a a remote_c e disponibiliza o próprio App: remote_a acumula os papéis de remoto e host aninhado.

### 7. remote_b/vite.config.js:3; remote_b/vite.config.js:5-11; remote_b/vite.config.js:19-28

**Observação:** `federation` declara `name: 'remote_b'`, `filename: 'remoteEntry.js'` e expõe `./App` de `./src/App.jsx`, sem declarar remotes. As cinco entradas de `shared` são `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` e `react-dom/client`, todas com `singleton: true`, `strictVersion: false` e `requiredVersion: '^19.2.4'`. O plugin usa `shareStrategy: 'version-first'` e `hostInitInjectLocation: 'entry'`.

**Interpretação:** Configura a exposição e o compartilhamento de uma unidade remota; sozinha, não identifica seu consumidor.

### 8. remote_c/vite.config.js:3; remote_c/vite.config.js:5-11; remote_c/vite.config.js:19-28

**Observação:** `federation` declara `name: 'remote_c'`, `filename: 'remoteEntry.js'` e expõe `./App` de `./src/App.jsx`, sem declarar remotes. As cinco entradas de `shared` são `react`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react/compiler-runtime` e `react-dom/client`, todas com `singleton: true`, `strictVersion: false` e `requiredVersion: '^19.2.4'`. O plugin usa `shareStrategy: 'version-first'` e `hostInitInjectLocation: 'entry'`.

**Interpretação:** Configura a exposição e o compartilhamento de uma unidade remota; sozinha, não identifica seu consumidor.

### 9. host/src/App.jsx:3

**Observação:** `const RemoteA = lazy(() => import('remote_a/App'))` cria o componente a partir do módulo remoto nomeado.

**Interpretação:** O import identifica diretamente a unidade de destino na composição federada de `host`.

### 10. host/src/App.jsx:4

**Observação:** `const RemoteB = lazy(() => import('remote_b/App'))` cria o componente a partir do módulo remoto nomeado.

**Interpretação:** O import identifica diretamente a unidade de destino na composição federada de `host`.

### 11. remote_a/src/App.jsx:3

**Observação:** `const RemoteC = lazy(() => import('remote_c/App'))` cria o componente a partir do módulo remoto nomeado.

**Interpretação:** O import identifica diretamente a unidade de destino na composição federada de `remote_a`.

### 12. host/src/App.jsx:76

**Observação:** `<RemoteA />` é renderizado dentro de `Suspense` e `ErrorBoundary`.

**Interpretação:** A renderização usa o componente preparado pelo import remoto, compondo a interface de `host`. O trecho isolado mostra a montagem do componente; a identificação federada está no import correspondente.

### 13. host/src/App.jsx:88

**Observação:** `<RemoteB />` é renderizado dentro de `Suspense` e `ErrorBoundary`.

**Interpretação:** A renderização usa o componente preparado pelo import remoto, compondo a interface de `host`. O trecho isolado mostra a montagem do componente; a identificação federada está no import correspondente.

### 14. remote_a/src/App.jsx:12

**Observação:** `<RemoteC />` é renderizado dentro de `Suspense`.

**Interpretação:** A renderização usa o componente preparado pelo import remoto, compondo a interface de `remote_a`. O trecho isolado mostra a montagem do componente; a identificação federada está no import correspondente.

### 15. .; package.json:1-17; pnpm-workspace.yaml:1-5

**Observação:** A raiz tem manifesto privado com scripts que delegam builds e previews aos quatro pacotes, além de `playwright-core`, sem entrada de UI ou build próprio.

**Interpretação:** É coordenação do workspace, marcada como unidade frontend No; não constitui uma quinta aplicação.

### 16. host; host/package.json:1-19; host/index.html:8-9; host/src/main.jsx:5-9; host/vite.config.js:13-39; pnpm-workspace.yaml:2

**Observação:** `host` tem manifesto, `index.html` com raiz e entrada `/src/main.jsx`, montagem React e configuração Vite próprios. O script local de build executa `vite build`, e o pacote consta no workspace.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias, conforme Yes na revisão estrutural.

### 17. remote_a; remote_a/package.json:1-19; remote_a/index.html:8-9; remote_a/src/main.jsx:5; remote_a/vite.config.js:13-38; pnpm-workspace.yaml:3

**Observação:** `remote_a` tem manifesto, `index.html` com raiz e entrada `/src/main.jsx`, montagem React e configuração Vite próprios. O script local de build executa `vite build`, e o pacote consta no workspace.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias, conforme Yes na revisão estrutural.

### 18. remote_b; remote_b/package.json:1-19; remote_b/index.html:8-9; remote_b/src/main.jsx:5; remote_b/vite.config.js:13-31; pnpm-workspace.yaml:4

**Observação:** `remote_b` tem manifesto, `index.html` com raiz e entrada `/src/main.jsx`, montagem React e configuração Vite próprios. O script local de build executa `vite build`, e o pacote consta no workspace.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias, conforme Yes na revisão estrutural.

### 19. remote_c; remote_c/package.json:1-19; remote_c/index.html:8-9; remote_c/src/main.jsx:5; remote_c/vite.config.js:13-31; pnpm-workspace.yaml:5

**Observação:** `remote_c` tem manifesto, `index.html` com raiz e entrada `/src/main.jsx`, montagem React e configuração Vite próprios. O script local de build executa `vite build`, e o pacote consta no workspace.

**Interpretação:** É uma unidade frontend com entrada e fronteira de build próprias, conforme Yes na revisão estrutural.

### 20. host/src/App.jsx:3; host/src/App.jsx:76; host/vite.config.js:22-26; remote_a/vite.config.js:16; remote_a/vite.config.js:20-24

**Observação:** `host` importa `remote_a/App` e renderiza `RemoteA`. O remote declarado resolve para o `name`, `filename` e `base` de `remote_a`, que expõe `./App` de `./src/App.jsx`.

**Interpretação:** É a relação host → remote `host → remote_a`, presente no snapshot e julgada ativa na 3.4.5. O App exposto de remote_a também monta remote_c, formando a composição aninhada.

### 21. host/src/App.jsx:4; host/src/App.jsx:88; host/vite.config.js:27-31; remote_b/vite.config.js:16; remote_b/vite.config.js:20-24

**Observação:** `host` importa `remote_b/App` e renderiza `RemoteB`. O remote declarado resolve para o `name`, `filename` e `base` de `remote_b`, que expõe `./App` de `./src/App.jsx`.

**Interpretação:** É a relação host → remote `host → remote_b`, presente no snapshot e julgada ativa na 3.4.5. A falha registrada de execução não altera esse julgamento da cadeia implementada.

### 22. remote_a/src/App.jsx:3; remote_a/src/App.jsx:12; remote_a/vite.config.js:26-30; remote_c/vite.config.js:16; remote_c/vite.config.js:20-24

**Observação:** `remote_a` importa `remote_c/App` e renderiza `RemoteC`. O remote declarado resolve para o `name`, `filename` e `base` de `remote_c`, que expõe `./App` de `./src/App.jsx`.

**Interpretação:** É a relação host → remote `remote_a → remote_c`, presente no snapshot e julgada ativa na 3.4.5. Como o App é também exposto ao host, a composição aninhada participa tanto da entrada standalone quanto do consumo federado.

### 23. host/package.json:6; host/vite.config.js:13-39; package.json:6-11

**Observação:** `host` executa `vite build` com configuração própria, `base` em `http://localhost:5000/` e preview local na mesma porta. A raiz oferece builds por pacote e `build:all`, na ordem remote_c, remote_b, remote_a, host.

**Interpretação:** O build é separado, o deploy é não observado e o versionamento independente é No na 3.4.6. A execução por preview local não demonstra publicação independente.

### 24. remote_a/package.json:6; remote_a/vite.config.js:13-38; package.json:6-11

**Observação:** `remote_a` executa `vite build` com configuração própria, `base` em `http://localhost:5001/` e preview local na mesma porta. A raiz oferece builds por pacote e `build:all`, na ordem remote_c, remote_b, remote_a, host.

**Interpretação:** O build é separado, o deploy é não observado e o versionamento independente é No na 3.4.6. A execução por preview local não demonstra publicação independente.

### 25. remote_b/package.json:6; remote_b/vite.config.js:13-31; package.json:6-11

**Observação:** `remote_b` executa `vite build` com configuração própria, `base` em `http://localhost:5002/` e preview local na mesma porta. A raiz oferece builds por pacote e `build:all`, na ordem remote_c, remote_b, remote_a, host.

**Interpretação:** O build é separado, o deploy é não observado e o versionamento independente é No na 3.4.6. A execução por preview local não demonstra publicação independente.

### 26. remote_c/package.json:6; remote_c/vite.config.js:13-31; package.json:6-11

**Observação:** `remote_c` executa `vite build` com configuração própria, `base` em `http://localhost:5003/` e preview local na mesma porta. A raiz oferece builds por pacote e `build:all`, na ordem remote_c, remote_b, remote_a, host.

**Interpretação:** O build é separado, o deploy é não observado e o versionamento independente é No na 3.4.6. A execução por preview local não demonstra publicação independente.

### 27. README.md:3

**Observação:** O README apresenta uma reprodução de quebra dos builds de produção de apps Vite federadas quando a família React é compartilhada como singleton com `requiredVersion: '^19.2.4'`, atribuindo-a à avaliação antecipada do fallback local de react-dom contra o provedor compartilhado de React.

**Interpretação:** A afirmação arquitetural é corroborada na 3.4.7 pelo arranjo configurado e pelas saídas versionadas. A execução natural registrada quebra antes de montar os remotos; os erros #527 de remote_a e remote_b vêm das cargas forçadas. A afirmação, sozinha, é semântica e não demonstra execução bem-sucedida da composição.

### 28. README.md:3

**Observação:** O README afirma que cada app instala um patch diferente de React 19.2.x.

**Interpretação:** A afirmação sobre as unidades é contradita na 3.4.7: host e remote_c fixam 19.2.8, enquanto remote_a fixa 19.2.4 e remote_b fixa 19.2.6. A generalização não pode ser usada como evidência de quatro patches distintos.

### 29. README.md:11

**Observação:** A tabela apresenta host com React 19.2.8 e remotes remote_a e remote_b.

**Interpretação:** Descreve o papel do host na organização federada, corroborado pelas duas relações e pela configuração.

### 30. README.md:12

**Observação:** A tabela apresenta remote_a com React 19.2.4, exposição de ./App e remote_c como remote, chamando-o de nested host.

**Interpretação:** Descreve o papel duplo de remote_a, corroborado pela exposição e pela relação com remote_c.

### 31. README.md:13

**Observação:** A tabela apresenta remote_b com React 19.2.6, exposição de ./App e papel remote-only.

**Interpretação:** Descreve a unidade consumida pelo host, corroborada pela relação e pela configuração sem remotes próprios.

### 32. README.md:14

**Observação:** A tabela apresenta remote_c com React 19.2.8, exposição de ./App e posição aninhada sob remote_a.

**Interpretação:** Descreve a posição da unidade na cadeia, corroborada pela configuração e pela relação remote_a → remote_c.

### 33. README.md:16-22

**Observação:** O README lista react, react/jsx-runtime, react/jsx-dev-runtime, react/compiler-runtime e react-dom/client como compartilhados com singleton, strictVersion false, requiredVersion ^19.2.4 e estratégia version-first.

**Interpretação:** É uma afirmação tecnológica parcialmente corroborada na 3.4.7: as configurações declaram as cinco entradas, mas só react, react-dom/client e react/jsx-runtime têm uso demonstrado em ao menos duas unidades. Disponibilidade das outras duas no escopo não comprova consumo.

### 34. README.md:24

**Observação:** O README afirma hostInitInjectLocation entry em todas as apps.

**Interpretação:** É uma afirmação tecnológica corroborada: a mesma opção aparece nas quatro configurações de federação. Não estabelece sozinha uma ligação entre unidades.

### 35. README.md:24

**Observação:** O README nomeia Vite 6.3.x, @module-federation/vite 1.21.6 e runtime 2.9.0.

**Interpretação:** É uma afirmação tecnológica corroborada pelos manifestos e pela dependência transitiva do plugin no lockfile; não situa a composição por si só.

### 36. 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a 2026-09-11 (README.md:3,65; host/package.json:11-12; remote_c/package.json:11-12)

**Observação:** A revisão histórica registra um único commit até o snapshot. Nele já coexistem a generalização do README sobre patches distintos e os manifestos de host e remote_c que fixam 19.2.8.

**Interpretação:** O ponto foi esclarecido: não há transição registrada de patches distintos para iguais. Isso delimita o passado observável sem explicar a redação nem modificar a afirmação contradita.

### 37. 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a 2026-09-11 (README.md:16-22; host/vite.config.js:8-9; remote_a/vite.config.js:8-9; remote_b/vite.config.js:8-9; remote_c/vite.config.js:8-9)

**Observação:** A revisão histórica registra que README, configurações com react/jsx-dev-runtime e react/compiler-runtime, fontes e evidências foram adicionados no único commit, sem estágio anterior registrado com consumidores dessas duas entradas.

**Interpretação:** O ponto foi esclarecido no limite do histórico: a declaração e o estado dos fontes coexistem desde a primeira presença observável. Isso não demonstra uso, remoção de consumidores ou abandono; permanece a corroboração parcial da documentação.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (host/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 2 | 3.4.2 (remote_a/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 3 | 3.4.2 (remote_b/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 4 | 3.4.2 (remote_c/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 5 | 3.4.2 (host/package.json:15, Evidência); 3.4.3 (host, Marcadores e Build); 3.4.4 (host/src/App.jsx:3 e :4, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #1, #3, #7, #8 (Evidência); 3.4.8 #2 (Origem) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #16; configura #9; configura #10; configura #20; configura #21 |
| 6 | 3.4.2 (remote_a/package.json:15, Evidência); 3.4.3 (remote_a, Marcadores e Build); 3.4.4 (host/src/App.jsx:3 e remote_a/src/App.jsx:3, Observação); 3.4.5 #1, #3 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #4, #7, #8 (Evidência); 3.4.8 #2 (Origem) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #17; configura #11; configura #20; configura #22 |
| 7 | 3.4.2 (remote_b/package.json:15, Evidência); 3.4.3 (remote_b, Marcadores e Build); 3.4.4 (host/src/App.jsx:4, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #5, #7, #8 (Evidência); 3.4.8 #2 (Origem) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #21 |
| 8 | 3.4.2 (remote_c/package.json:15, Evidência); 3.4.3 (remote_c, Marcadores e Build); 3.4.4 (remote_a/src/App.jsx:3, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #6, #7, #8 (Evidência); 3.4.8 #2 (Origem) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #19; configura #22 |
| 9 | 3.4.4 (host/src/App.jsx:3, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 10 | 3.4.4 (host/src/App.jsx:4, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21 |
| 11 | 3.4.4 (remote_a/src/App.jsx:3, src-remote-import) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #22 |
| 12 | 3.4.4 (host/src/App.jsx:76, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #20 |
| 13 | 3.4.4 (host/src/App.jsx:88, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #21 |
| 14 | 3.4.4 (remote_a/src/App.jsx:12, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #22 |
| 15 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.3 (host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (remote_a) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (remote_b) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (remote_c) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #17 |
| 21 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #18 |
| 22 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #19 |
| 23 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #16 |
| 24 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #17 |
| 25 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #18 |
| 26 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #19 |
| 27 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora evidence/RESULT.json:5-15; corrobora evidence/eager-static-import-proof.txt:10-13 |
| 28 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | contradiz host/package.json:11-12; contradiz remote_a/package.json:11-12; contradiz remote_b/package.json:11-12; contradiz remote_c/package.json:11-12; contradiz pnpm-lock.yaml:780-788 |
| 29 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #20; corrobora #21; corrobora #5; corrobora host/package.json:11-12 |
| 30 | 3.4.7 #4 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #20; corrobora #22; corrobora #6; corrobora remote_a/package.json:11-12 |
| 31 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #21; corrobora #7; corrobora remote_b/package.json:11-12 |
| 32 | 3.4.7 #6 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #22; corrobora #8; corrobora remote_c/package.json:11-12 |
| 33 | 3.4.7 #7 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #5; corrobora em parte #6; corrobora em parte #7; corrobora em parte #8; corrobora em parte host/src/main.jsx:1-2; corrobora em parte remote_a/src/main.jsx:1-2; corrobora em parte evidence/eager-static-import-proof.txt:3-5; corrobora em parte evidence/eager-static-import-proof.txt:20-22 |
| 34 | 3.4.7 #8 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #5; corrobora #6; corrobora #7; corrobora #8 |
| 35 | 3.4.7 #9 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora host/package.json:15-17; corrobora pnpm-lock.yaml:1129-1134 |
| 36 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #28 |
| 37 | 3.4.8 #2 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #5; explica #6; explica #7; explica #8; explica #33 |

## Resumo

Observações: 37. Dimensões (tecnologia: 4, configuração: 4, código: 6, estrutura: 5, composição: 3, build-deploy: 4, documentação: 9, histórico: 2). Força (forte: 8, moderada: 13, fraca: 16, ambígua: 0). Evidência (tecnológica: 10, arquitetural: 25, contexto: 2).
