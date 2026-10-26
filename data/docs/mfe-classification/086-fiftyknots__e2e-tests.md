---
schema: 1
id: 1120549779
full_name: fiftyknots/e2e-tests
url: https://github.com/fiftyknots/e2e-tests
commit: 1d946b5e434c76b14679d90aaa856a2d9d071fa4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 086 — fiftyknots/e2e-tests

## Contexto

Suíte E2E para o sistema externo PackTrac. A aplicação alvo é descrita no README, mas não está implementada neste repositório. O código próprio automatiza navegação e verificações em um navegador controlado pelo Playwright (`e2e/helpers.ts:6–11`, `e2e/helpers.ts:39–64`); a configuração aponta para uma URL externa (`playwright.config.ts:27–32`).

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:87`. O inventário completo por `git ls-tree -r --name-only 1d946b5e434c76b14679d90aaa856a2d9d071fa4` contém exatamente 12 arquivos: README, `.gitignore`, manifesto e lockfile npm, `playwright.config.ts`, workflow e seis arquivos TypeScript em `e2e/` (cinco specs e um helper). Não há `node_modules/` versionado, fontes de aplicações frontend, entradas HTML ou alvos de UI próprios. As chaves `node_modules/...` em `package-lock.json` são registros de dependências, não diretórios de implementação presentes na árvore. Esse inventário fundamenta `frontend_units: 0`, em vez de null.

**Branches, somente para registro:** `main`, `origin/main` e `origin/HEAD` apontam ao commit avaliado. Há também `origin/deploy/pnp` em `d5891604aace4313a34d2150e05aca1c838e9985`. Apenas as referências foram enumeradas; nenhum conteúdo desse outro commit foi usado na classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:1–12` identifica uma suíte E2E de autenticação, permissões e interações com iframes chamados micro-frontends. `README.md:16–20` identifica Playwright e o ambiente externo de demonstração. As palavras micro-frontend e os títulos dos iframes descrevem o sistema sob teste; não demonstram implementação MFE no candidato. | contexto |
| Estrutura / Tecnologia | `package.json:6–8` oferece somente `playwright test`; `package.json:20–22` declara Playwright e tipos de Node como dependências de desenvolvimento. Não há script de build frontend. O campo `main` de `package.json:5` cita `index.js`, mas esse arquivo não existe na árvore inventariada. | contrária |
| Configuração (destino dos testes) | `playwright.config.ts:14–15` seleciona o diretório `e2e`; `playwright.config.ts:27–32` define `BASE_URL` ou `https://demo.packtrac.com`; `playwright.config.ts:35–39` configura Chromium. Esses projetos são configurações do executor de testes, não unidades frontend. `playwright.config.ts:73–78` contém apenas um exemplo comentado de `webServer`, sem servidor local ativo configurado. | contrária |
| Código-fonte (consumo externo) | `e2e/helpers.ts:6–11` navega à raiz da URL alvo, preenche o login e aguarda o dashboard. `e2e/helpers.ts:39–64` clica em User Management, localiza o iframe por título e verifica dados na tabela. O helper não cria o iframe nem define sua origem ou contrato com o host. | contexto |
| Código-fonte (iframes observados pelos testes) | `e2e/retailer.spec.ts:45–61` navega a Products e consulta um iframe existente. `e2e/retailer.spec.ts:80–96` navega a EPR Reports e consulta outro iframe. São seletores e asserções Playwright sobre páginas externas, não código de montagem de unidades. | contexto |
| Código-fonte (demais specs) | `e2e/packaging-specialist.spec.ts:1–2`, `e2e/packaging-technologist.spec.ts:1–2`, `e2e/qa-technologist.spec.ts:1–2` e `e2e/sustainability-team-member.spec.ts:1–2` importam o executor e os helpers locais. Exemplos de interação externa: `e2e/qa-technologist.spec.ts:43–55` e `e2e/sustainability-team-member.spec.ts:39–51`. Não constituem alvos renderizáveis. | contexto |
| Build/deploy | `.github/workflows/playwright.yml:12–21` faz checkout deste repositório, instala dependências e navegadores e executa os testes; `.github/workflows/playwright.yml:22–27` publica o relatório. Não há build ou implantação de aplicação frontend nesse workflow. | contrária |
| Documentação técnica | `README.md:60–66` documenta o padrão de interação com iframes; `README.md:80–89` inventaria os specs; `README.md:233–243` documenta a URL de teste configurável. Essa documentação é sobre automação de testes, sem fornecer a configuração de composição do PackTrac. O inventário dos 12 caminhos foi procurado por ADRs, diretórios `docs/`, arquivos de arquitetura e imagens/diagramas de arquitetura; nenhum foi encontrado. | contexto |
| Estrutura / Configuração (busca negativa de unidades) | Na árvore completa, procurados arquivos de entrada `.html`, `.tsx`, `.jsx`, `.vue`, `.svelte`, entradas `main`/`bootstrap` de aplicações, diretórios `src/`, `apps/`, `modules/` e configurações Vite/Webpack/Rspack/Angular/Next. Não há esses alvos. Existe somente `package.json` como manifesto npm de projeto; seu script é o de teste já citado. `package-lock.json:7–14` confirma a raiz da suíte e suas dependências de desenvolvimento. | ausente |
| Configuração / Código-fonte (busca negativa de composição e preparação) | Nos arquivos de texto próprios do snapshot, procurados `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map` e `postMessage`: nenhum resultado. Não há exposições, lifecycles ou contrato de integração de uma unidade própria com host externo. | ausente |
| Código-fonte (busca negativa de montagem) | Procurados `createRoot`, `hydrateRoot`, `createApp`, `bootstrapApplication`, `platformBrowserDynamic`, `setContent`, `page.route`, `page.evaluate`, `document.createElement`, `appendChild`, `<iframe` e atributo `src` de iframe: nenhum resultado nos arquivos de texto próprios. Os resultados de `frameLocator` são consumo pelos testes, exemplificado em `e2e/helpers.ts:46` e `e2e/retailer.spec.ts:55`, não implementação de composição. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhum alvo frontend próprio no inventário completo. A configuração contém apenas testes e um endereço externo (`playwright.config.ts:14–15`, `playwright.config.ts:27–39`); nomes de iframes em `e2e/helpers.ts:46` e `e2e/retailer.spec.ts:55–88` são seletores, não referências de uma configuração de composição. |
| Q2 | No | Não há unidades frontend a avaliar. `package.json:6–8` contém somente execução de testes e `package.json:20–22` as dependências do executor; nenhum build/entrada de unidade própria foi encontrado. |
| Q3 | No | O candidato não contém host, shell ou root de aplicação carregando unidades. `e2e/helpers.ts:6–11` visita a aplicação externa e `e2e/helpers.ts:39–46` navega e seleciona conteúdo existente; isso é automação de consumo, não implementação de host. |
| Q4 | No | Não há mecanismo de composição próprio. A operação concreta é `frameLocator` e asserções em `e2e/retailer.spec.ts:80–96`; buscas por montagem, exposições e contratos de integração foram negativas. A configuração `baseURL` em `playwright.config.ts:29` é o destino do navegador de testes. |
| Q5 | No | O conjunto demonstra uma suíte E2E de um sistema externo (`package.json:6–8`, `playwright.config.ts:27–39`, `e2e/helpers.ts:39–64`), sem implementação de unidades ou composição neste snapshot. Q5 acompanha Q1–Q4, sem override. |

## Motivo

- Q1–Q5 são No: aplica-se `Non-MFE`. O repositório implementa testes de uma aplicação descrita como MFE, não uma instância dessa arquitetura. O tipo registrado é `other`, por se tratar de suíte de testes.
- O critério dos precedentes 023/028 exige alvos e composição próprios; menções, seletores e cenários testados não contam como unidades de Q1. As seis rotinas/arquivos de teste/helper tampouco são seis aplicações frontend.
- Não é MFE-unit: nenhuma unidade própria foi encontrada, nem preparação para composição por um host ausente. Por isso Q2–Q4 são No, sem usar Undetermined apenas porque o sistema testado está fora do snapshot.
- Os iframes não abrem uma decisão metodológica neste candidato: não há implementação própria de iframe, mensagens ou contrato host/unidade. Mesmo que PackTrac possua uma arquitetura MFE, esse fato não pode ser transferido automaticamente à suíte que o testa. `approaches`, `ui_technologies` e `build_tools` ficam vazios; Playwright e Chromium não são tecnologia de UI ou bundler das unidades.

## Notas para análise

- **RQ1:** comentários sobre tempo de carregamento de micro-frontends e seletores como `iframe[title="..."]` são sinais de um sistema externo. Não equivalem a `src`, registro, montagem ou contrato explícito de integração implementado pelo candidato. O termo também aparece em `README.md:76`, `:172` e `:315` e nos comentários de espera dos specs (por exemplo, `e2e/helpers.ts:43`, `e2e/retailer.spec.ts:52` e `:85`), sempre como rótulo do sistema sob teste.
- **RQ3:** a URL externa é configurável, mas trocar `BASE_URL` apenas muda o alvo da mesma suíte. Não registra ou compõe diferentes unidades frontend.
- **Protocolo:** buscas nas anotações existentes por `fiftyknots`, `PackTrac` e `e2e-tests` não encontraram família já registrada. `playwright.config.ts:3–12` e `playwright.config.ts:73–78` preservam comentários e exemplos genéricos de configuração Playwright; não demonstram origem comum com um candidato específico. O caso 023 é próximo apenas como alerta de menção a MFE sem implementação de unidades; não indica família de repositórios.
- **Protocolo:** não se executaram os testes nem se acessou o ambiente de demonstração. A classificação descreve os artefatos do commit fixado, sem afirmar o estado atual da aplicação externa ou que as asserções passam.
