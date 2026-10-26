---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Leitura do repositório

O único documento marcado como `documentation` no `artifacts.csv` é o README da raiz, lido integralmente: contém apenas o título “web-lab-4” (README.md:1), sem texto explicativo em português ou inglês. Não apresenta unidades, fronteiras, mecanismo de composição, compartilhamento ou condições de build e deploy. O `matches.csv` não contém ocorrências `doc-*`; portanto, não há ocorrências documentais a distribuir entre a tabela e esta leitura, nem README de template ou documento de terceiros a registrar.

Foram conferidos os comentários e campos descritivos dos artefatos citados nas revisões 3.4.2–3.4.6: os três `package.json`, `vite.config.js` e `index.html` sob `frontend/vite/{host,remote-inputs,remote-results}`; no host, `src/main.js`, `src/App.vue`, `src/pages/MainPage.vue`, `src/common/Header.vue` e `src/stores/{HistoryStore,ErrorStore}.js`; no remote de entrada, `src/InputsContainer.vue` e `src/elements/GraphCanvas.vue`; no remote de resultados, `src/ResultsContainer.vue` e `src/elements/{GroupInput,Table}.vue`; além de `.gitignore`, `config/docker-compose.yaml`, `config/nginx/{Dockerfile,nginx.conf}`, `config/backend/{auth,broker,geometry,history}/Dockerfile` e `config/prometheus/prometheus.yml`. Os três manifestos não têm `description` e usam o nome genérico `vite-vue-starter` (frontend/vite/host/package.json:1-21; frontend/vite/remote-inputs/package.json:1-20; frontend/vite/remote-results/package.json:1-20). Os comentários nas configurações dos remotes são links para a documentação do Vite (frontend/vite/remote-inputs/vite.config.js:4; frontend/vite/remote-results/vite.config.js:4). Os demais comentários tratam de layout e desenho locais, como “Shared styles” dentro de uma folha de estilo (frontend/vite/host/src/pages/MainPage.vue:102; frontend/vite/remote-inputs/src/InputsContainer.vue:150; frontend/vite/remote-results/src/ResultsContainer.vue:93), ou são código de rota desativado (frontend/vite/host/src/main.js:13). Não afirmam compartilhamento entre unidades nem outra propriedade arquitetural do conjunto. O `config/frontend/Dockerfile` e os dois `src/main.js` dos remotes estão vazios.

A ausência de afirmações documentais não contradiz nem acrescenta suporte semântico à implementação registrada nas revisões anteriores. O código do host importa e renderiza os dois painéis remotos (frontend/vite/host/src/pages/MainPage.vue:6-7,23-24; 3.4.5 #1–2), e o Dockerfile reúne os três `dist` em uma imagem nginx (config/nginx/Dockerfile:5-7; 3.4.6 #1–3). Essas são evidências de implementação, sem frase documental correspondente a confrontar nesta etapa. As cinco revisões anteriores estão `final`, com ID e commit iguais aos da classificação e da aquisição.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|

## Observações

Nenhuma afirmação arquitetural identificada nos textos examinados.

## Resumo

Afirmações: 0.
