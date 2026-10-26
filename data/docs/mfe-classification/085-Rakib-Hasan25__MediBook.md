---
schema: 1
id: 1166034786
full_name: Rakib-Hasan25/MediBook
url: https://github.com/Rakib-Hasan25/MediBook
commit: 57e8016c1157757418d01cbd6e3646e1ec87ee1c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 085 — Rakib-Hasan25/MediBook

## Contexto

Sistema de agendamento médico com dois alvos React próprios: o aplicativo principal em `frontend/` e um gateway de pagamento simulado em `payment-system-frontend/`. O principal abre o segundo em outra aba e passa identificadores pela query string; não há montagem de um frontend dentro do outro. A decisão sobre essa navegação como composição MFE permanece aberta. O tipo `example` registra o fluxo demonstrativo de gateway, com ações explícitas de sucesso, falha e atraso (`payment-system-frontend/src/App.tsx:184–227`; `README.md:58–62`), sem afirmar que o sistema observado está em produção.

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:86`. O inventário completo por `git ls-tree -r --name-only 57e8016c1157757418d01cbd6e3646e1ec87ee1c` contém 29.266 arquivos: 29.156 sob `frontend/node_modules/` e 110 fora de `node_modules/`. Os caminhos citados são relativos à raiz do snapshot. `frontend/dist/` é saída do mesmo aplicativo, não outra unidade. `backend/` e `firebase-functions/doctor-approval/functions/` fornecem serviços; suas funções não são unidades frontend. `frontend_units: 2` conta somente os dois alvos próprios identificados.

As referências locais `main`, `origin/main` e `origin/HEAD` apontam ao mesmo commit fixado; registradas somente como contexto. Não foram usados outros snapshots nem feitas consultas remotas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | Há dois manifestos próprios, com builds separados: `frontend/package.json:6–11` e `payment-system-frontend/package.json:6–11`. Cada alvo monta seu App por `createRoot`: `frontend/src/main.tsx:1–11` e `payment-system-frontend/src/main.tsx:1–10`. As configurações de hospedagem também são próprias em `frontend/apphosting.yaml:5–7` e `payment-system-frontend/apphosting.yaml:5–7`. | moderada |
| Tecnologia / Configuração | Ambos usam React e Vite nas respectivas configurações: `frontend/vite.config.ts:1–15` e `payment-system-frontend/vite.config.ts:1–14`. Cada alias `@` resolve o seu próprio `src`; não há configuração de federação nesses arquivos. A simples presença de dois projetos não confirma MFE. | contexto |
| Código-fonte (app principal) | `frontend/src/App.tsx:3–9` importa páginas locais; `frontend/src/App.tsx:142–179` registra rotas locais, incluindo os detalhes do médico em `/dashboard/patient/:doctorId`. `frontend/src/App.tsx:184–190` monta o roteador e o contexto de autenticação. O gateway não é importado ou montado nessa árvore. | contexto |
| Código-fonte (ligação entre os alvos) | `frontend/src/pages/PatientDoctorDetails.tsx:63–71` cria `slotid`, `userid` e `patientid` e chama `window.open` com `VITE_PAYMENT_GATWAY_URL`, destino `_blank` e `noopener,noreferrer`. O botão real chama o handler em `frontend/src/pages/PatientDoctorDetails.tsx:178–184`. `frontend/apphosting.yaml:15–19` configura a URL do gateway. Há navegação implementada, não apenas uma menção de integração. | ambígua |
| Código-fonte (contrato recebido) | `payment-system-frontend/src/App.tsx:19–29` lê os identificadores da query string, aceitando as variantes minúsculas enviadas pelo principal. `payment-system-frontend/src/App.tsx:31–53` usa esses valores para carregar a sessão do pagamento. Isso liga os dois alvos ao mesmo fluxo de reserva; não demonstra por si só composição de interfaces. | ambígua |
| Código-fonte (integração de serviços) | `payment-system-frontend/src/services/paymentGatewayService.ts:42–65` consulta `/payment-gateway/session`; `payment-system-frontend/src/services/paymentService.ts:38–48` inicia o pagamento por HTTP. `backend/src/index.js:31–33` registra as APIs do domínio, e `backend/src/routes/paymentGateway.js:10–13` e `backend/src/routes/paymentGateway.js:37–40` implementam os endpoints. Integração com API compartilhada é distinta de carregar uma unidade frontend. | contexto |
| Código-fonte (simulação) | `payment-system-frontend/src/App.tsx:90–115` inicia o pagamento e envia a ação escolhida; `payment-system-frontend/src/App.tsx:204–227` expõe botões de sucesso, falha e atraso. `payment-system-frontend/src/services/paymentActionService.ts:15–22` chama a função de pagamento por HTTP. São serviços e efeitos de negócio, sem canal de montagem da UI no app principal. | contexto |
| Documentação de arquitetura | `README.md:15–25` denomina o sistema micro-frontends/microservices e distingue um frontend principal de outro que simula um gateway de terceiros. `README.md:19` referencia `assets/architecture-image.png`; a figura foi inspecionada no commit e apresenta os dois frontends separadamente, junto de API, funções e serviços Firebase. `README.md:45–66` descreve o fluxo de reserva, gateway e webhook. Essa documentação contextualiza a navegação observada, mas a terminologia MFE isolada não confirma a classe. | contexto |
| Documentação (templates) | `frontend/README.md:1–8` e `payment-system-frontend/README.md:1–8` preservam o texto genérico React + TypeScript + Vite. O conteúdo de scaffold não demonstra uma família compartilhada com outro candidato nem implementação de composição. | contexto |
| Código-fonte (busca negativa de acoplamento) | Auditados os imports estáticos/dinâmicos e reexports em 36 arquivos `.ts`, `.tsx` e `.js` dos dois diretórios frontend, excluindo `node_modules/` e `dist/`: nenhum import relativo atravessa a fronteira de um alvo para o outro; os imports `@/` resolvem para fontes locais conforme `frontend/vite.config.ts:10–13` e `payment-system-frontend/vite.config.ts:9–12`. Não se encontrou import nominal do outro aplicativo. | ausente |
| Tecnologia / Configuração / Código-fonte (busca negativa de composição) | Em todos os arquivos próprios `.ts`, `.tsx`, `.js`, `.json`, `.yaml`, `.html` e `.md` do snapshot, excluídos `node_modules/`, `dist/` e `package-lock.json`, procurados `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` e `srcDoc`: nenhum resultado. A evidência concreta de ligação frontend a frontend é a abertura por URL, não um desses mecanismos. | ausente |
| Composição (busca negativa de canal de retorno) | Procurados `window.open`, `window.location`, `location.href`, `location.assign`, `returnUrl`, `callbackUrl` e `redirect` nos arquivos próprios de código/configuração/documentação, excluídos dependências, builds e lockfiles. A ligação do principal ao pagamento encontrada é `frontend/src/pages/PatientDoctorDetails.tsx:71`; no gateway, a recepção ocorre por `window.location.search` em `payment-system-frontend/src/App.tsx:20`. Não foi encontrado callback de navegação de volta ao principal. Também não foi encontrado `postMessage` nesse escopo; não há evidência de contrato de comunicação entre janelas além dos parâmetros de entrada. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Há dois alvos físicos, mas o gateway é apresentado como aplicação externa simulada; a abertura em nova aba não estabelece unidades de uma mesma aplicação composta. |
| Q2 | No | Builds separados não bastam sem uma relação de composição MFE aceita entre os alvos. |
| Q3 | No | O aplicativo principal só abre uma URL externa em nova aba (`frontend/src/pages/PatientDoctorDetails.tsx:63–71`); ele não monta o gateway nem o inclui em suas rotas. |
| Q4 | No | Não há federação, iframe, import map, montagem cruzada ou canal de comunicação entre janelas; os parâmetros de entrada na URL não constituem mecanismo de composição. |
| Q5 | No | O fluxo é integração de negócio por navegação para um gateway externo simulado, e não uma aplicação composta por unidades frontend. |

## Motivo

- Aplica-se a regra `Non-MFE`: a relação entre os dois aplicativos é uma navegação para outra aba, não composição de unidades frontend.
- `approaches: []` permanece correto: nenhum mecanismo MFE foi observado. Parâmetros de URL fornecem o contrato de entrada do gateway, sem federação, iframe, import map, host ou comunicação entre janelas.
- Os builds separados e a passagem funcional de identificadores demonstram integração de negócio, mas não alteram a ausência de composição. O termo “micro-frontends” no README não substitui a evidência arquitetural.

## Notas para análise

- **RQ1:** os 29.156 arquivos sob `frontend/node_modules/` foram excluídos da contagem e das buscas de evidência própria. O bundle sob `frontend/dist/` também não aumenta `frontend_units`. Nenhum build ou serviço foi executado nesta inspeção.
- **RQ1 (documentação):** o inventário foi procurado por diretórios `docs/`, `adr/` e `adrs/` e arquivos de ADR, sem artefatos próprios encontrados. A documentação de arquitetura disponível é o README e suas imagens (`README.md:15–25`, `README.md:45–66`); a figura de arquitetura foi inspecionada como contexto, sem usar o desenho como prova isolada de composição.
- **Protocolo:** a busca nas anotações existentes por `MediBook` e `Rakib-Hasan25` não encontrou família já registrada. Os READMEs internos indicam scaffold React/TypeScript/Vite, sem evidência de origem comum com um candidato específico. Há proximidade metodológica com a decisão aberta de link-only/iframe em `docs/mfe-classification/031-Scouterna__j26-tags.md`, mas esse precedente possui contrato com shell por iframe e mensagens, ausente aqui; não é evidência de família ou template compartilhado.

## Decisão registrada

Promover para **Non-MFE**. O aplicativo principal abre o gateway simulado em outra aba, com parâmetros na URL, mas não o carrega em um host nem mantém um canal de integração de interface. Isso caracteriza navegação e integração de fluxo de negócio com uma aplicação externa, não composição por micro-frontends.
