---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
url: https://github.com/varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 211 — varshinir07/mfe-onehub-shell-app

## Contexto

Aplicação React 19 gerada com Create React App e convertida para Webpack 5 com configuração própria (`package.json:18–22`; `src/webpack.config.js:1–102`). É o host “onehub” de Module Federation: consome dois remotos externos, `subscription` (`localhost:3001`) e `ownership` (`localhost:3002`), e monta cinco módulos deles num painel (`src/pages/Dashboard.jsx:3–26`). Os remotos não estão no repositório.

O README é o padrão do CRA, com cabeçalho “mfe-onehub-shell / MFE Remote App for OnehubShell” (`README.md:1–2`). Esse rótulo de “Remote App” contradiz o código, que é o host. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:212` registra rank 211, ID 996744917, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:212` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14759` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14765` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `technology-module-federation-plugin-js-code#size:3000..3999` / `ModuleFederationPlugin remotes extension:js size:3000..3999` | `src/webpack.config.js` | 2026-10-07T22:37:04.337Z / 2026-10-08T16:16:17.639Z |

O arquivo tem 3.440 bytes no SHA, dentro da faixa, e contém `ModuleFederationPlugin` (`:3`, `72`) com `remotes` (`:74–78`). Os metadados do hit de código trazem só a descrição “mfe-onehub-shell App”, sem tópicos nem datas. A entrada é só por código. O README (`README.md:1–2`) não contém os termos buscados por terminologia.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 19 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto (scaffold CRA: `public/`, `src/index.js`, `App.js`, testes, `reportWebVitals`), mais `src/pages/Dashboard.jsx` e `src/webpack.config.js`. | contexto |
| Configuração (host) | `src/webpack.config.js:72–92`: `ModuleFederationPlugin` com `name: 'onehub'`, `remotes: { remote1: 'subscription@http://localhost:3001/remoteEntry.js', remote2: 'ownership@http://localhost:3002/remoteEntry.js' }` e `react`/`react-dom` singleton e `eager`. `package.json:19–20`: `start` e `build` usam essa configuração (`webpack serve --config src/webpack.config.js`). | forte |
| Código-fonte (composição) | `src/pages/Dashboard.jsx:3–9`: `React.lazy(() => import('remote1/ModemAuthorization'))`, `remote1/SecurityPackage`, `remote1/Card`, `remote2/LabourHourHold` e `remote2/MobileService`. `:15–26`: renderizados sob `Suspense`, com `Card` recebendo props do host. `src/App.js:3–8` monta o `Dashboard`. | forte |
| Unidades externas | Os remotos `subscription` e `ownership` não estão no repositório. A configuração os referencia por nome e URL, mas sem fonte nem documentação que os localize além de `localhost`. Na amostra, a mesma conta só tem este repositório (`sample.csv`). Nas duas rodadas, a conta tem mais um candidato, `varshinir07/varshinir07`, que é o repositório de perfil e não foi inspecionado. | moderada |
| Código-fonte (fronteiras) | Imports relativos só dentro de `src/`; não há código dos remotos. | contexto |
| Documentação | `README.md:1–2`: “MFE Remote App for OnehubShell”; o restante é o README do CRA. O rótulo diverge do papel observado no código (host). | ambígua |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de Varshini (noreply) pela interface web, ambos em 2025-06-05: `74cbf87` (“Initial commit”, só `README.md`) e o SHA `1ddddc4` (“Created OneHub Shell App”, 19 arquivos). Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --all --missing=print` identifica o blob `3c7947b…` ausente (a versão inicial do README); todos os arquivos citados do SHA atual estão presentes, mas o conteúdo anterior do README não pôde ser lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O host e duas unidades externas referenciadas explicitamente pela configuração de composição (`src/webpack.config.js:74–78`). |
| Q2 | Yes | Os remotos são externos e servidos separadamente (`localhost:3001`, `3002`), sem import de código-fonte. O host tem entrada e build próprios (`src/webpack.config.js:10`; `package.json:19–20`). |
| Q3 | Yes | O host carrega e monta os módulos remotos no painel (`src/pages/Dashboard.jsx:15–26`). |
| Q4 | Yes | `ModuleFederationPlugin` com `remotes`, consumido por `import('remote1/…')` e `import('remote2/…')`. |
| Q5 | Yes | Q1–Q4 são Yes: host que compõe remotos externos. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso de inclusão “repositories containing only the host, which references external remote units”. É o mesmo enquadramento de 087: a ausência dos fontes dos remotos não equivale à ausência de configuração de composição do host.
- Os remotos estão em URLs fixas de `localhost`, não em variável de ambiente indefinida, então não se aplica a dúvida de 145/176/199.
- Os módulos consumidos são, na maioria, fatias funcionais de tela (autorização de modem, pacote de segurança, serviços) montadas no painel; só `Card` é um componente genérico. Por isso o caso não se reduz ao compartilhamento de código de 089/100.
- `build_tools: [webpack]`: configuração explícita do autor (`src/webpack.config.js`), usada pelos scripts, ao contrário do CRA não ejetado de 087. `react-scripts` resta só para `test`/`eject`.
- `frontend_units: 3` (host e dois remotos referenciados), `unit_organization: multi-repo`, `ui_technologies: [react]`, `repo_type: example` (scaffold CRA, URLs `localhost`, sem deploy).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** host Webpack 5 com `ModuleFederationPlugin`, chaves locais (`remote1`, `remote2`) distintas dos nomes globais dos containers (`subscription`, `ownership`), e `shared` com `eager: true` sem bootstrap assíncrono (`src/index.js:1–12`).
- **RQ1 (sinais enganosos):** README rotula o repositório como “Remote App” embora ele seja o host.
- **Protocolo (busca):** entrada só pela busca de código; a elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, React/webpack, três unidades referenciadas e `multi-repo`; sem decisão aberta (`draft`). É o caso explícito do checklist de repositório que contém só o host e referencia unidades externas, como os finais 008 (configuração em localhost e três unidades referenciadas) e 040 (consumo concreto de componente externo pelo host), que limitam a análise ao lado disponível. Limites a registrar: os provedores não foram inspecionados (o contraste com compartilhamento genérico não deve ser afirmado como inspeção dos provedores ausentes; basta registrar o padrão de composição pretendido), há um blob histórico ausente, a descrição do build no README não corresponde aos scripts e à configuração atuais, e `App.js:3–8` inclui o import e o elemento `Dashboard`, com o bloco da função indo até a linha 10.
