---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
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
  date: 2026-10-21
---

# 033 — abhikukreti/music-library-project

## Leitura do repositório

Duas aplicações React/Vite formam uma cadeia curta de Module Federation:
- **Dependência:** `@originjs/vite-plugin-federation`, nas duas aplicações (#1, #2).
- **Configuração:** o host declara o remote no endereço publicado na Netlify, e não em `localhost` (#3). O remote se declara e expõe o componente `MusicLibrary` (#4).
- **Código:** o host importa o componente remoto pelo nome (#5) e o renderiza depois do login, passando o papel do usuário como prop (#7).
- **Relação:** isso resulta na relação ativa main-app → music-library (#10).

O build é separado para as duas. O deploy só é separado para o remote (#12). Para o host, o deploy em site próprio é apenas relato do README (#14, #17, #18), sem artefato (#11), e o histórico não confirma a ordem de publicação descrita (#23).

A documentação tem dez afirmações, sete corroboradas. As não corroboradas tratam do deploy do host. O único sinal que engana é o service worker gerado do MSW, cujo `postMessage` não comunica unidades (#6).

## Observações

### 1. main-app/package.json:18

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do host.

### 2. music-library/package.json:20

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do remote.

### 3. main-app/vite.config.js:1-22

**Observação:** `federation` declara `name: 'main_app'` e o remote `music_library` em `https://astonishing-seahorse-d2decf.netlify.app/assets/remoteEntry.js`, e compartilha `react`, `react-dom` e `@tanstack/react-query`.

**Interpretação:** A configuração do host declara o remote e o endereço publicado dele.

### 4. music-library/vite.config.js:1-24

**Observação:** `federation` declara `name: 'music_library'` e `filename: 'remoteEntry.js'`, expõe `./MusicLibrary` (`./src/MusicLibrary.jsx`) e compartilha as mesmas bibliotecas.

**Interpretação:** O music-library está configurado como remote e oferece seu componente a um host.

**Nota:** O `music-library/public/_headers`, citado na coluna Deploy da revisão estrutural, é configuração de hospedagem. Ele entra na dimensão 6 (#12), e não aqui.

### 5. main-app/src/App.jsx:5

**Observação:** `const MusicLibrary = lazy(() => import('music_library/MusicLibrary'))`.

**Interpretação:** O host importa sob demanda o componente exposto pelo remote, pelo nome dele.

### 6. music-library/public/mockServiceWorker.js:312

**Observação:** `client.postMessage` no service worker gerado do MSW, que simula a API.

**Interpretação:** É a troca de mensagens do MSW com o seu cliente, e não comunicação entre unidades. É um falso positivo da busca por comunicação.

### 7. main-app/src/App.jsx:21-23; main-app/src/App.jsx:8-12

**Observação:** `<MusicLibrary isAdmin={isAdmin} />` dentro de `Suspense`, renderizado só depois do login.

**Interpretação:** O host renderiza o componente remoto e lhe passa o papel do usuário.

### 8. main-app; main-app/package.json:1-11; main-app/index.html:10-11; main-app/src/main.jsx:10-18; main-app/vite.config.js:5-20

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 9. music-library; music-library/package.json:1-11; music-library/index.html:10-11; music-library/src/main.jsx:9-22; music-library/vite.config.js:5-21

**Observação:** É uma aplicação React com manifesto, entrada standalone e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio, capaz de rodar sozinha.

### 10. main-app/src/App.jsx:5, 22; main-app/vite.config.js:8-12; music-library/vite.config.js:8-13

**Observação:** O host importa `music_library/MusicLibrary` e o renderiza. O nome e o módulo correspondem à configuração do remote, embora a URL aponte para o artefato publicado.

**Interpretação:** É uma relação host → remote ativa.

### 11. main-app/vite.config.js:5-22; main-app/package.json:8

**Observação:** Tem configuração e `vite build` próprios. Nenhum artefato do snapshot configura a hospedagem do host.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 12. music-library/vite.config.js:5-24; music-library/package.json:8; music-library/public/_headers:1-2; main-app/vite.config.js:11

**Observação:** Tem configuração e `vite build` próprios, que geram o `remoteEntry.js`. É servido num domínio próprio, usado pelo host, e o `_headers` da hospedagem libera CORS para `/assets/*`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 13. README.md:3

**Observação:** "React app split into two parts (main app + music library) connected via Module Federation".

**Interpretação:** Descreve as duas aplicações ligadas por Module Federation. A afirmação é corroborada.

### 14. README.md:6

**Observação:** "Main App: https://fluffy-pika-9e723b.netlify.app".

**Interpretação:** Dá o endereço publicado do host, que nenhum artefato registra. A afirmação fica sem corroboração.

### 15. README.md:7

**Observação:** "Music Library (remote): https://astonishing-seahorse-d2decf.netlify.app".

**Interpretação:** Dá o endereço publicado do remote, o mesmo que o host usa. A afirmação é corroborada.

### 16. README.md:31

**Observação:** "Both apps in one repo".

**Interpretação:** Afirma que as duas aplicações estão no mesmo repositório. A afirmação é corroborada.

### 17. README.md:31

**Observação:** "deployed as 2 separate Netlify sites".

**Interpretação:** Afirma o deploy separado das duas. A parte do remote se confirma, e a do host fica sem artefato. A afirmação é parcial.

### 18. README.md:32, 34

**Observação:** "Deployed music-library first […] Deployed main-app same way".

**Interpretação:** Relata a ordem de publicação, que o snapshot não registra. A afirmação fica sem corroboração.

### 19. README.md:33

**Observação:** "Copied its live remoteEntry.js URL into main-app's vite.config.js".

**Interpretação:** Afirma que a configuração do host tem a URL publicada do remote. A afirmação é corroborada.

### 20. README.md:35

**Observação:** "Added _headers file in music-library/public with CORS headers, since remote loads from a different domain".

**Interpretação:** Explica o `_headers` pela diferença de domínios. A afirmação é corroborada.

### 21. README.md:38

**Observação:** "music-library exposes MusicLibrary.jsx using @originjs/vite-plugin-federation, generating remoteEntry.js on build. main-app lazy loads it using React lazy() and Suspense."

**Interpretação:** Descreve a exposição e a carga do componente remoto. A afirmação é corroborada.

### 22. README.md:41

**Observação:** "Role is passed to the remote as a plain prop (isAdmin)."

**Interpretação:** Descreve o único contrato de dados entre as aplicações. A afirmação é corroborada.

### 23. 445c3aa 2026-07-18 (main-app, music-library); 9bb56ac 2026-07-18 (main-app/vite.config.js); 5876ac6 2026-07-18 (music-library/public/_headers)

**Observação:** As duas aplicações aparecem no primeiro commit. O commit seguinte altera só a configuração do host, e a mensagem anuncia que ele passou a apontar para o remote publicado. Depois, um commit cria o `_headers`. A versão anterior da configuração do host não está disponível.

**Interpretação:** A ordem das mudanças de configuração é compatível com o README, mas o histórico não registra as publicações nem o deploy do host. A dúvida é só sobre o passado: no snapshot, o deploy do host continua sem artefato.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (main-app/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #3 |
| 2 | 3.4.2 (music-library/package.json:20) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 3 | 3.4.2 (main-app/package.json:18, Evidência); 3.4.3 (main-app, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #1, #2 (Artefatos); 3.4.7 #3, #7, #8 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #8; configura #10 |
| 4 | 3.4.2 (music-library/package.json:20, Evidência); 3.4.3 (music-library, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #9; configura #10 |
| 5 | 3.4.4 (main-app/src/App.jsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #10 |
| 6 | 3.4.4 (music-library/public/mockServiceWorker.js:312) | 3 código | código-fonte | — | contexto | fraca | — |
| 7 | 3.4.4 (main-app/src/App.jsx:22) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #10 |
| 8 | 3.4.3 (main-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 9 | 3.4.3 (music-library) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 10 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #8; liga #9 |
| 11 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #8 |
| 12 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #9 |
| 13 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #10 |
| 14 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 15 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #3 |
| 16 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #9 |
| 17 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #12 |
| 18 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 19 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3 |
| 20 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora music-library/public/_headers:1-2; corrobora #3 |
| 21 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #10; corrobora #4; corrobora #5 |
| 22 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7 |
| 23 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #11; explica #17; explica #18 |

## Resumo

Observações: 23. Dimensões (tecnologia: 2, configuração: 2, código: 3, estrutura: 2, composição: 1, build-deploy: 2, documentação: 10, histórico: 1). Força (forte: 3, moderada: 6, fraca: 14, ambígua: 0). Evidência (tecnológica: 4, arquitetural: 18, contexto: 1).
