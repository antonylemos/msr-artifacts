---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Leitura do repositório

O snapshot reúne quatro aplicações React/Vite num workspace npm: host, header, footer e products (#15–#18). A dependência de federação (#1) se concretiza nas configurações (#3–#6): os remotes expõem componentes e o host declara seus destinos. Os imports nomeiam esses destinos (#7–#9), e a montagem visual (#10–#12) integra as três faixas da página nas relações ativas host → remote (#24–#26). Products e header também se comunicam por um store Zustand compartilhado (#13, #27), parametrizado como singleton nas configurações. A 3.4.5 registra esse serviço reativo como mecanismo events.

Cada app tem build, saída, bucket, distribuição e rollback próprios (#28–#31), embora o versionamento seja conjunto. A raiz e os cinco pacotes de apoio não são unidades frontend (#14, #19–#23); o nome @microfrontend/types é sinal nominal de tipos compartilhados, sem mecanismo próprio de MFE (#2). O footer compartilha React sem singleton explícito (#3), enquanto host, header e products configuram singletons (#4–#6).

As afirmações documentais corroboram essa organização (#32–#43, #45). Os endereços CloudFront listados ficam sem corroboração (#44), pois seus valores não estão nos artefatos de CI. Essa limitação não deixa em aberto a composição do snapshot. A 3.4.8 não registrou pontos históricos, portanto não há observações na dimensão 8.

## Observações

### 1. package.json:48

**Observação:** A raiz declara @module-federation/vite ^1.16.0 em devDependencies. A 3.4.2 registra Configurada Yes.

**Interpretação:** A declaração sinaliza Module Federation; as configurações dos apps mostram seu uso separadamente.

### 2. packages/shared/package.json:10; packages/shared/src/state/cart-store.ts:3-6

**Observação:** packages/shared declara @microfrontend/types 0.0.0, importado como tipo CartProduct no store. A 3.4.2 registra Configurada Yes.

**Interpretação:** O nome capturado como mfe-term corresponde a tipos internos do workspace; não identifica um mecanismo de composição.

### 3. apps/footer/vite.config.ts:13-21

**Observação:** O plugin federation nomeia footer, gera remoteEntry.js, expõe ./Footer de ./src/Footer.tsx e compartilha react e react-dom, sem singleton explícito.

**Interpretação:** Configura o mecanismo de federação e a interface pública de footer; o bloco não nomeia consumidores.

### 4. apps/header/vite.config.ts:13-37

**Observação:** O plugin federation nomeia header, gera remoteEntry.js, expõe ./Header de ./src/Header.tsx e compartilha react, react-dom, zustand, @microfrontend/shared e @tanstack/react-query como singletons.

**Interpretação:** Configura o mecanismo de federação e a interface pública de header; o bloco não nomeia consumidores.

### 5. apps/host/vite.config.ts:12-15; apps/host/vite.config.ts:22-65

**Observação:** O plugin federation nomeia host e declara header, footer e products como remotes module, com entry por VITE_*_REMOTE_URL e fallback para remoteEntry.js local. react, react-dom, zustand, @microfrontend/shared e @tanstack/react-query são singletons.

**Interpretação:** A configuração liga o host a três unidades remotas e parametriza o compartilhamento de dependências.

### 6. apps/products/vite.config.ts:13-37

**Observação:** O plugin federation nomeia products, gera remoteEntry.js, expõe ./ProductsList de ./src/ProductsList.tsx e compartilha react, react-dom, zustand, @microfrontend/shared e @tanstack/react-query como singletons.

**Interpretação:** Configura o mecanismo de federação e a interface pública de products; o bloco não nomeia consumidores.

### 7. apps/host/src/App.tsx:5

**Observação:** O host declara Header com lazy(() => import('header/Header')). A 3.4.4 registra Composição Yes.

**Interpretação:** O import identifica a unidade remota header e o módulo consumido pelo host.

### 8. apps/host/src/App.tsx:6

**Observação:** O host declara Footer com lazy(() => import('footer/Footer')). A 3.4.4 registra Composição Yes.

**Interpretação:** O import identifica a unidade remota footer e o módulo consumido pelo host.

### 9. apps/host/src/App.tsx:7

**Observação:** O host declara ProductsList com lazy(() => import('products/ProductsList')). A 3.4.4 registra Composição Yes.

**Interpretação:** O import identifica a unidade remota products e o módulo consumido pelo host.

### 10. apps/host/src/App.tsx:12-16

**Observação:** O JSX renderiza <Header /> dentro de RemoteErrorBoundary e Suspense, com skeleton. A 3.4.4 registra Composição Yes.

**Interpretação:** A renderização participa da montagem visual; isolada do import e da configuração, não resolve a unidade remota.

### 11. apps/host/src/App.tsx:19-23

**Observação:** O JSX renderiza <ProductsList /> dentro de RemoteErrorBoundary e Suspense, com skeleton. A 3.4.4 registra Composição Yes.

**Interpretação:** A renderização participa da montagem visual; isolada do import e da configuração, não resolve a unidade remota.

### 12. apps/host/src/App.tsx:26-30

**Observação:** O JSX renderiza <Footer /> dentro de RemoteErrorBoundary e Suspense, com skeleton. A 3.4.4 registra Composição Yes.

**Interpretação:** A renderização participa da montagem visual; isolada do import e da configuração, não resolve a unidade remota.

### 13. packages/shared/src/state/cart-store.ts:12-18; packages/shared/src/state/cart-store.ts:70-72; packages/shared/src/index.ts:4; apps/products/src/components/Product.tsx:14; apps/products/src/components/Product.tsx:36-43; apps/products/src/ProductsList.tsx:30; apps/header/src/Header.tsx:16-18; apps/header/src/Header.tsx:27

**Observação:** useCartStore cria estado Zustand persistido em cart-storage. ProductCard adiciona produtos; Header lê itens e quantidade e permite removê-los. A 3.4.4 registra Composição Yes.

**Interpretação:** O serviço reativo compartilhado sustenta a comunicação entre products e header; sua unicidade no conjunto é parametrizada pelas configurações de federação.

### 14. .; package.json:4-8; package.json:18-22

**Observação:** A raiz declara os workspaces apps/*, packages/* e packages/config/* e encadeia builds dos apps, sem entrada nem build de UI próprios. Unidade frontend No na 3.4.3.

**Interpretação:** A raiz coordena o workspace e não representa outra aplicação frontend.

### 15. apps/footer; apps/footer/package.json:8; apps/footer/index.html:10; apps/footer/src/main.tsx:5-9; apps/footer/vite.config.ts:47-53

**Observação:** apps/footer tem manifesto, index.html que aponta a src/main.tsx, montagem React e build Vite com saída dist/footer. Unidade frontend Yes na 3.4.3.

**Interpretação:** O diretório delimita uma aplicação frontend com entrada e build próprios. O vínculo com outras aplicações aparece nas observações de composição.

### 16. apps/header; apps/header/package.json:8; apps/header/index.html:10; apps/header/src/main.tsx:5-9; apps/header/vite.config.ts:63-69

**Observação:** apps/header tem manifesto, index.html que aponta a src/main.tsx, montagem React e build Vite com saída dist/header. Unidade frontend Yes na 3.4.3.

**Interpretação:** O diretório delimita uma aplicação frontend com entrada e build próprios. O vínculo com outras aplicações aparece nas observações de composição.

### 17. apps/host; apps/host/package.json:8; apps/host/index.html:11; apps/host/src/main.tsx:10-16; apps/host/vite.config.ts:90-96

**Observação:** apps/host tem manifesto, index.html que aponta a src/main.tsx, montagem React e build Vite com saída dist/host. Unidade frontend Yes na 3.4.3.

**Interpretação:** O diretório delimita uma aplicação frontend com entrada e build próprios. O vínculo com outras aplicações aparece nas observações de composição.

### 18. apps/products; apps/products/package.json:8; apps/products/index.html:10; apps/products/src/main.tsx:5-9; apps/products/vite.config.ts:63-69

**Observação:** apps/products tem manifesto, index.html que aponta a src/main.tsx, montagem React e build Vite com saída dist/products. Unidade frontend Yes na 3.4.3.

**Interpretação:** O diretório delimita uma aplicação frontend com entrada e build próprios. O vínculo com outras aplicações aparece nas observações de composição.

### 19. packages/config/eslint-config; packages/config/eslint-config/package.json:1-18

**Observação:** O pacote exporta uma configuração de ESLint; seu build tsc compila a configuração. Sem entrada de aplicação; Unidade frontend No na 3.4.3.

**Interpretação:** É um pacote de apoio do workspace, sem limite próprio de aplicação frontend.

### 20. packages/config/tailwind-config; packages/config/tailwind-config/package.json:1-12

**Observação:** O pacote exporta tailwind.config.ts como configuração compartilhada. Sem entrada de aplicação; Unidade frontend No na 3.4.3.

**Interpretação:** É um pacote de apoio do workspace, sem limite próprio de aplicação frontend.

### 21. packages/shared; packages/shared/package.json:1-16; packages/shared/src/index.ts:1-4

**Observação:** O pacote exporta cliente HTTP, criação de QueryClient, queryKeys e useCartStore. Sem entrada de aplicação; Unidade frontend No na 3.4.3.

**Interpretação:** É um pacote de apoio do workspace, sem limite próprio de aplicação frontend.

### 22. packages/types; packages/types/package.json:1-9; packages/types/src/index.ts:1-3

**Observação:** O pacote reexporta apenas tipos HTTP, produtos e carrinho. Sem entrada de aplicação; Unidade frontend No na 3.4.3.

**Interpretação:** É um pacote de apoio do workspace, sem limite próprio de aplicação frontend.

### 23. packages/ui; packages/ui/package.json:1-12; packages/ui/src/index.ts:1-6

**Observação:** O pacote exporta componentes UI, incluindo skeletons, Modal e CartList. Sem entrada de aplicação; Unidade frontend No na 3.4.3.

**Interpretação:** É um pacote de apoio do workspace, sem limite próprio de aplicação frontend.

### 24. apps/host/src/App.tsx:5; apps/host/src/App.tsx:14; apps/host/vite.config.ts:12; apps/host/vite.config.ts:26-32; apps/header/vite.config.ts:14-19

**Observação:** O host importa e renderiza o módulo de header; seu remote header corresponde ao name e ao exposes da configuração de apps/header. A 3.4.5 registra No snapshot Yes e Ativa Yes.

**Interpretação:** Liga diretamente o host à aplicação header por Module Federation em runtime.

### 25. apps/host/src/App.tsx:6; apps/host/src/App.tsx:28; apps/host/vite.config.ts:13; apps/host/vite.config.ts:33-39; apps/footer/vite.config.ts:14-19

**Observação:** O host importa e renderiza o módulo de footer; seu remote footer corresponde ao name e ao exposes da configuração de apps/footer. A 3.4.5 registra No snapshot Yes e Ativa Yes.

**Interpretação:** Liga diretamente o host à aplicação footer por Module Federation em runtime.

### 26. apps/host/src/App.tsx:7; apps/host/src/App.tsx:21; apps/host/vite.config.ts:14-15; apps/host/vite.config.ts:40-46; apps/products/vite.config.ts:14-19

**Observação:** O host importa e renderiza o módulo de products; seu remote products corresponde ao name e ao exposes da configuração de apps/products. A 3.4.5 registra No snapshot Yes e Ativa Yes.

**Interpretação:** Liga diretamente o host à aplicação products por Module Federation em runtime.

### 27. packages/shared/src/state/cart-store.ts:12-18; packages/shared/src/state/cart-store.ts:70-72; packages/shared/src/index.ts:4; apps/products/src/components/Product.tsx:14; apps/products/src/components/Product.tsx:36-43; apps/products/src/ProductsList.tsx:30; apps/header/src/Header.tsx:16-18; apps/header/src/Header.tsx:27; apps/host/vite.config.ts:55-60; apps/header/vite.config.ts:27-32; apps/products/vite.config.ts:27-32

**Observação:** products escreve no store do carrinho e header lê seu estado; zustand e @microfrontend/shared estão como singletons no host e nos dois remotes. A 3.4.5 registra comunicação products → header, mecanismo events, presente e ativa.

**Interpretação:** O serviço reativo constitui um canal explícito entre duas unidades frontend. A direção registrada é products → header; o host provê o compartilhamento e footer não usa o store.

### 28. apps/footer/package.json:3-8; apps/footer/vite.config.ts:47-53; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:134-137; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:230-233; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observação:** O workspace de footer constrói dist/footer; o CI publica essa saída no bucket S3 e invalida a distribuição CloudFront próprios, definidos por secrets. Há rollback por app. A 3.4.6 registra Build separado, Deploy separado e Versionamento No; o manifesto do app é privado, versão 0.0.0, e a release versiona arquivos da raiz.

**Interpretação:** Build e deploy delimitam a publicação de footer separadamente das demais aplicações. Os valores de hospedagem não se resolvem no snapshot e o versionamento permanece conjunto.

### 29. apps/header/package.json:3-8; apps/header/vite.config.ts:63-69; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:129-132; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:225-228; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observação:** O workspace de header constrói dist/header; o CI publica essa saída no bucket S3 e invalida a distribuição CloudFront próprios, definidos por secrets. Há rollback por app. A 3.4.6 registra Build separado, Deploy separado e Versionamento No; o manifesto do app é privado, versão 0.0.0, e a release versiona arquivos da raiz.

**Interpretação:** Build e deploy delimitam a publicação de header separadamente das demais aplicações. Os valores de hospedagem não se resolvem no snapshot e o versionamento permanece conjunto.

### 30. apps/host/package.json:3-8; apps/host/vite.config.ts:90-96; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:144-147; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:240-243; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observação:** O workspace de host constrói dist/host; o CI publica essa saída no bucket S3 e invalida a distribuição CloudFront próprios, definidos por secrets. Há rollback por app. A 3.4.6 registra Build separado, Deploy separado e Versionamento No; o manifesto do app é privado, versão 0.0.0, e a release versiona arquivos da raiz.

**Interpretação:** Build e deploy delimitam a publicação de host separadamente das demais aplicações. Os valores de hospedagem não se resolvem no snapshot e o versionamento permanece conjunto.

### 31. apps/products/package.json:3-8; apps/products/vite.config.ts:63-69; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:139-142; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:235-238; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observação:** O workspace de products constrói dist/products; o CI publica essa saída no bucket S3 e invalida a distribuição CloudFront próprios, definidos por secrets. Há rollback por app. A 3.4.6 registra Build separado, Deploy separado e Versionamento No; o manifesto do app é privado, versão 0.0.0, e a release versiona arquivos da raiz.

**Interpretação:** Build e deploy delimitam a publicação de products separadamente das demais aplicações. Os valores de hospedagem não se resolvem no snapshot e o versionamento permanece conjunto.

### 32. .github/workflows/ci-cd.yml:12-13

**Observação:** A documentação afirma: "App to rollback" (o rollback é feito por app: header, footer, products ou host). Corroboração na 3.4.7: corroborada.

**Interpretação:** A descrição apresenta o rollback como escolha de uma aplicação; a implementação por app corrobora a afirmação.

### 33. .github/workflows/ci-cd.yml:86

**Observação:** A documentação afirma: "Deploy changed apps to CloudFront". Corroboração na 3.4.7: corroborada.

**Interpretação:** O nome do job apresenta publicação por aplicações alteradas; os builds e destinos por app corroboram essa organização.

### 34. README.md:3

**Observação:** A documentação afirma: "Aplicação de e-commerce construída com arquitetura de microfrontends usando **Module Federation** (Vite)". Corroboração na 3.4.7: corroborada.

**Interpretação:** A documentação apresenta o e-commerce como conjunto de microfrontends ligado por Module Federation; as unidades e relações corroboram essa descrição.

### 35. README.md:15-18

**Observação:** A documentação afirma: "host/ # App principal — orquestra os remotes", "header/ # Microfrontend do cabeçalho", "footer/ # Microfrontend do rodapé", "products/ # Microfrontend da listagem de produtos". Corroboração na 3.4.7: corroborada.

**Interpretação:** A árvore atribui ao host a orquestração de três remotes, coerente com as unidades e relações observadas.

### 36. README.md:21-25

**Observação:** A documentação afirma: "shared/ # Estado global (Zustand), API client, React Query config", "types/ # Tipos TypeScript compartilhados", "ui/ # Componentes UI reutilizáveis", "tailwind-config/ # Config base do Tailwind compartilhada". Corroboração na 3.4.7: corroborada.

**Interpretação:** A documentação situa bibliotecas de apoio compartilhadas entre unidades; esses pacotes não são aplicações adicionais.

### 37. README.md:27

**Observação:** A documentação afirma: "package.json # Scripts e dependências raiz (npm workspaces)". Corroboração na 3.4.7: corroborada.

**Interpretação:** O manifesto da raiz coordena o workspace, sem constituir outra unidade frontend.

### 38. README.md:33-38

**Observação:** A documentação afirma: "Expõe": "—" (host), "`header/Header`", "`footer/Footer`", "`products/ProductsList`". Corroboração na 3.4.7: corroborada.

**Interpretação:** Os nomes de módulos publicados descrevem as interfaces que ligam host e remotes, corroboradas pela configuração e pelo código.

### 39. README.md:65-70

**Observação:** A documentação afirma: "Ou individualmente: npm run dev:header … npm run dev:footer … npm run dev:products" (cada remote roda sozinho). Corroboração na 3.4.7: corroborada.

**Interpretação:** A execução individual descrita corresponde às entradas próprias dos remotes; não demonstra isoladamente sua ligação.

### 40. README.md:71

**Observação:** A documentação afirma: "npm run dev:host # http://localhost:3000 (depende dos outros)". Corroboração na 3.4.7: corroborada.

**Interpretação:** O host depende da disponibilidade dos remotes para a página completa; os limites de erro permitem mostrar falhas sem derrubar a página inteira.

### 41. README.md:80

**Observação:** A documentação afirma: "Build completo (todos os apps em sequência)". Corroboração na 3.4.7: corroborada.

**Interpretação:** O build completo é um comando de coordenação dos builds das quatro aplicações.

### 42. README.md:86-95

**Observação:** A documentação afirma: "Ou por app: npm run build:header …" / "Os artefatos são gerados em `dist/<app>`.". Corroboração na 3.4.7: corroborada.

**Interpretação:** A documentação descreve saídas de build por unidade, corroboradas pelos artefatos de construção.

### 43. README.md:144

**Observação:** A documentação afirma: "A aplicação está distribuída em múltiplos microfrontends, cada um hospedado de forma independente via **AWS S3 + CloudFront**.". Corroboração na 3.4.7: corroborada.

**Interpretação:** A hospedagem por aplicação é corroborada pelo workflow; isso não implica versionamento independente.

### 44. README.md:148-162

**Observação:** A documentação afirma: "Host (App principal) https://d6kooi9qoycog.cloudfront.net", "Header https://do4w2f9yum2t1.cloudfront.net", "Products https://dpprlnwt0shjp.cloudfront.net", "Footer https://d1h65an7ioo3f5.cloudfront.net" (endereços publicados de cada app). Corroboração na 3.4.7: sem corroboração.

**Interpretação:** A documentação atribui um endereço público a cada unidade. Os endereços em si permanecem sem corroboração no snapshot, cujas variáveis e secrets não trazem valores.

### 45. README.md:171

**Observação:** A documentação afirma: "Zustand — estado do carrinho compartilhado entre microfrontends". Corroboração na 3.4.7: corroborada.

**Interpretação:** A afirmação descreve comunicação por estado reativo compartilhado entre products e header, corroborada pelo código e pela relação registrada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:48) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #3; declara #4; declara #5; declara #6 |
| 2 | 3.4.2 (packages/shared/package.json:10) | 1 tecnologia | manifesto | — | contexto | fraca | declara packages/shared/src/state/cart-store.ts:3 |
| 3 | 3.4.2 (package.json:48, Evidência); 3.4.3 (apps/footer, Marcadores e Build); 3.4.4 (apps/host/src/App.tsx:6, Observação); 3.4.5 #2 (Configuração); 3.4.7 #7 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #25 |
| 4 | 3.4.2 (package.json:48, Evidência); 3.4.2 (packages/shared/package.json:10, Evidência); 3.4.3 (apps/header, Marcadores e Build); 3.4.4 (apps/host/src/App.tsx:5 e packages/shared/src/state/cart-store.ts:12, Observação); 3.4.5 #1, #4 (Configuração); 3.4.7 #7 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #16; configura #24; configura #27 |
| 5 | 3.4.2 (package.json:48, Evidência); 3.4.3 (apps/host, Marcadores e Build); 3.4.4 (apps/host/src/App.tsx:5-7 e packages/shared/src/state/cart-store.ts:12, Observação); 3.4.5 #1, #2, #3, #4 (Configuração); 3.4.7 #7, #9 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #17; configura #24; configura #25; configura #26; configura #27 |
| 6 | 3.4.2 (package.json:48, Evidência); 3.4.3 (apps/products, Marcadores e Build); 3.4.4 (apps/host/src/App.tsx:7 e packages/shared/src/state/cart-store.ts:12, Observação); 3.4.5 #3, #4 (Configuração); 3.4.7 #7 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #26; configura #27 |
| 7 | 3.4.4 (apps/host/src/App.tsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #24 |
| 8 | 3.4.4 (apps/host/src/App.tsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #25 |
| 9 | 3.4.4 (apps/host/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #26 |
| 10 | 3.4.4 (apps/host/src/App.tsx:14) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #24 |
| 11 | 3.4.4 (apps/host/src/App.tsx:21) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #26 |
| 12 | 3.4.4 (apps/host/src/App.tsx:28) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #25 |
| 13 | 3.4.4 (packages/shared/src/state/cart-store.ts:12) | 3 código | código-fonte | events | arquitetural | moderada | implementa #27 |
| 14 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 15 | 3.4.3 (apps/footer) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (apps/header) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (apps/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (apps/products) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (packages/config/eslint-config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 20 | 3.4.3 (packages/config/tailwind-config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 21 | 3.4.3 (packages/shared) | 4 estrutura | diretório | — | contexto | fraca | — |
| 22 | 3.4.3 (packages/types) | 4 estrutura | diretório | — | contexto | fraca | — |
| 23 | 3.4.3 (packages/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 24 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #16 |
| 25 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #15 |
| 26 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #18 |
| 27 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | forte | liga #18; liga #16 |
| 28 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #15 |
| 29 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #16 |
| 30 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #17 |
| 31 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #18 |
| 32 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 33 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 34 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #24; corrobora #25; corrobora #26 |
| 35 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #24; corrobora #25; corrobora #26 |
| 36 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | corrobora #20; corrobora #21; corrobora #22; corrobora #23; corrobora apps/host/src/main.tsx:4; corrobora apps/host/src/App.tsx:2; corrobora apps/host/tailwind.config.ts:2 |
| 37 | 3.4.7 #6 | 7 documentação | documentação | — | contexto | fraca | corrobora #14 |
| 38 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #24; corrobora #25; corrobora #26 |
| 39 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #16; corrobora #18; corrobora package.json:14-16 |
| 40 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #24; corrobora #25; corrobora #26 |
| 41 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:18 |
| 42 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 43 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #29; corrobora #30; corrobora #31 |
| 44 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 45 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #27 |

## Resumo

Observações: 45. Dimensões (tecnologia: 2, configuração: 4, código: 7, estrutura: 10, composição: 4, build-deploy: 4, documentação: 14, histórico: 0). Força (forte: 8, moderada: 15, fraca: 22, ambígua: 0). Evidência (tecnológica: 7, arquitetural: 29, contexto: 9).
