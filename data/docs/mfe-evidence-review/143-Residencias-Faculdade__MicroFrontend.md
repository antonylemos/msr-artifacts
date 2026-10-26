---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

# 143 — Residencias-Faculdade/MicroFrontend

## Leitura do repositório

O snapshot tem só a casca de um sistema distribuído em vários repositórios: uma aplicação Vite + TypeScript sem framework, na raiz (#7). Ela compõe por Web Components nativos, sem biblioteca de MFE: não há dependência a observar na 3.4.2.

A cadeia que sustenta a arquitetura passa pelo registro e pelo código da casca:
- **Configuração:** o registro `public/microfrontends.json` declara a aplicação externa `member-manager` e a URL do `main.js` dela num domínio da Vercel (#1, e a mesma linha na 3.4.4, #5).
- **Código:** a casca lê o registro em runtime, monta a tag de cada entrada (#6) e injeta `<script type="module">` com a URL quando a tag ainda não está definida (#3).
- **Relação:** daí sai a única relação, casca → `member-manager`, ativa e com destino fora do snapshot (#8).

A estrutura, sozinha, mostra uma única unidade (#7), com build e deploy próprios numa imagem Nginx (#9). A decomposição só aparece no registro e no código.

Sinais que enganam se lidos sozinhos:
- **Padrões que casaram com outra coisa:** o `src-custom-element` casou com o comentário que descreve o contrato (#2), e o `src-cross-unit-communication` com o `postMessage` da página de silent SSO do Keycloak (#4), que nenhum arquivo usa. O histórico mostra que essa página nunca foi conectada (#26).
- **O `posts-crud`:** o README, o compose e um comentário do código usam um frontend `posts-crud` em `localhost:4200`, de outro repositório (#14, #24), que não está no registro e não vira relação. O histórico mostra que os exemplos são do primeiro commit e que o registro mudou depois para o `member-manager` (#29). A promessa de que o compose só o sobe "se existir" é desmentida pelo compose (#14, #27).

A documentação é um guia de integração. Ela confirma a casca e o mecanismo (#11, #12, #16, #17) e o empacotamento (#10, #13, #15). O contrato pedido aos frontends plugados (cache, CORS, tokens, autenticação, autonomia, isolamento) só se confirma em parte ou não se confirma (#18 a #23, #25), porque nenhum frontend externo está no snapshot; o histórico mostra que nunca esteve (#28). Nada fica ambíguo no snapshot. O que não se observa é o próprio `member-manager`.

## Observações

### 1. public/microfrontends.json:1-8

**Observação:** O registro é um array com uma entrada: `"_comment": "Projeto da equipe 2 (Member Manager) "`, `"tag": "member-manager"`, `"title": "Members CRUD"` e `"url": "https://crud-member-manager.vercel.app/main.js"`. A casca o lê por `fetch('/microfrontends.json')` (src/main.ts:139).

**Interpretação:** A configuração do host declara uma unidade de outra origem como aplicação a carregar, pelo nome da tag e pela URL do bundle.

### 2. src/main.ts:218

**Observação:** Linha de comentário: `// O outro projeto precisa servir url com CORS * e registrar customElements.define(tag)`.

**Interpretação:** O comentário descreve o contrato esperado da unidade externa; não é código e não participa da composição.

### 3. src/main.ts:221, 225-230

**Observação:** Em `loadScript(url, tag)`, se `customElements.get(tag)` ainda não existe, a casca cria `document.createElement('script')` com `type = 'module'` e `src = url` e o anexa ao `head`. A URL e a tag chegam por parâmetro (`loadScript(entry.url, entry.tag)`, src/main.ts:210).

**Interpretação:** A casca carrega em runtime o bundle que define o custom element, para a unidade que receber.

### 4. public/silent-check-sso.html:3

**Observação:** `parent.postMessage(location.href, location.origin)`, com comentário de que é o iframe de silent check-sso do keycloak-js (public/silent-check-sso.html:1-2). `keycloak.init` não usa `silentCheckSsoRedirectUri` (src/main.ts:74-78), e nenhum arquivo referencia a página.

**Interpretação:** É comunicação com a biblioteca de autenticação, não entre unidades frontend.

### 5. public/microfrontends.json:4, 6; src/main.ts:139

**Observação:** `"tag": "member-manager"` e `"url": "https://crud-member-manager.vercel.app/main.js"`, lidos em runtime por `fetch('/microfrontends.json')` dentro de `loadMicrofrontends()`.

**Interpretação:** A linha nomeia a aplicação externa que a casca usa e de onde a carrega.

### 6. src/main.ts:166-169; index.html:31

**Observação:** ``mount.innerHTML = `<${entry.tag}></${entry.tag}>` `` num `div`, anexado ao wrapper e ao container `#microfrontends`. A tag vem da entrada do registro.

**Interpretação:** A casca monta o custom element da unidade que o registro informar; a definição do elemento vem do script carregado em #3.

### 7. .; index.html:34; vite.config.ts:5-14; package.json:8

**Observação:** Projeto Vite na raiz, com entrada `<script type="module" src="/src/main.ts">` e build `tsc && vite build` para `dist`.

**Interpretação:** A casca é uma unidade frontend com entrada e build próprios.

### 8. src/main.ts:167; src/main.ts:225-230; public/microfrontends.json:4-6

**Observação:** A casca (`.`) usa a tag `<member-manager>` e carrega o script que a define de `https://crud-member-manager.vercel.app/main.js`. Nenhuma unidade do snapshot define o elemento. A cadeia parte da entrada: index.html:34 → `initAuth()` (src/main.ts:234) → `loadMicrofrontends()` (src/main.ts:81) → `selectMicrofrontend()` (src/main.ts:174) → `loadScript` (src/main.ts:210).

**Interpretação:** A casca compõe em runtime, por Web Components, uma unidade externa implantada em outra origem.

### 9. package.json:8; vite.config.ts:8; Dockerfile:2-18; nginx.conf:9-25; docker-compose.yml:4-15

**Observação:** O build Vite gera o `dist` da casca. Uma imagem de dois estágios roda `npm run build` e copia o `dist/` e o `nginx.conf` para o Nginx; o serviço `shell` do compose a constrói com `context: .` e publica a porta 80 em `${SHELL_PORT:-3000}`.

**Interpretação:** A casca tem build e deploy próprios; o código do `member-manager` não entra no artefato.

### 10. Dockerfile:1, 11

**Observação:** "STAGE 1: BUILD - Compila Vite (TS -> JS) dentro do container" / "STAGE 2: RUNTIME - Serve dist/ com Nginx".

**Interpretação:** A afirmação descreve o build e o deploy da casca, e o Dockerfile os confirma.

### 11. README.md:1

**Observação:** "Biblioteca Shell para Micro Frontends via Web Components".

**Interpretação:** A afirmação apresenta o repositório como casca que compõe frontends por Web Components, o que a estrutura e a relação confirmam. "Biblioteca" não corresponde a um pacote: `atividadengx-shell` é `private` (package.json:2-4).

### 12. README.md:3

**Observação:** "importe a casca como orquestradora e plugue qualquer frontend que exponha um `Custom Element`. Sem rebuild da casca, sem acoplamento entre times."

**Interpretação:** A afirmação descreve a composição por registro lido em runtime, sem import entre casca e frontend; a casca só importa `keycloak-js` e o próprio loader (src/main.ts:5, 16).

### 13. README.md:8

**Observação:** "docker compose up --build -d   # shell :3000 + keycloak :8080".

**Interpretação:** A afirmação descreve a montagem local da casca com o Keycloak, que o compose confirma.

### 14. README.md:8

**Observação:** "(+ posts-crud :4200 se existir)".

**Interpretação:** A afirmação diz que o frontend `posts-crud`, de outro repositório, é opcional na montagem local; o compose o declara como serviço comum, sem perfil nem condição (docker-compose.yml:19-30).

### 15. README.md:13

**Observação:** "**Stack:** Vite 6 + TypeScript + `keycloak-js` 26.2 (PKCE S256) + Nginx + Docker Compose."

**Interpretação:** A afirmação nomeia as tecnologias da casca, que o manifesto e o empacotamento confirmam. Não cita o React declarado (package.json:13-14).

### 16. README.md:30

**Observação:** "carrega `public/microfrontends.json:1` para injetar `<script type="module" src="url">` e montar `<tag></tag>` dentro de `#microfrontends`".

**Interpretação:** A afirmação descreve o mecanismo de composição que o código implementa; as linhas que o README cita estão desatualizadas.

### 17. README.md:60

**Observação:** "`public/microfrontends.json` é o **único ponto de configuração da casca**".

**Interpretação:** A afirmação situa no registro a declaração das unidades plugadas; o código não tem URL ou tag fixa de frontend.

### 18. README.md:103

**Observação:** "`main.js` estável sem hash (`main.js` com `no-cache`, chunks `main-*.js` com `immutable`)".

**Interpretação:** A afirmação pede ao frontend plugado um bundle de nome estável; o registro aponta um `main.js` sem hash, e a política de cache é do servidor externo, fora do snapshot.

### 19. README.md:104

**Observação:** "`main.js` deve responder `200` + `Content-Type: application/javascript` + `Access-Control-Allow-Origin: *` — shell é ` :3000` buscando ` :4202` cross-origin".

**Interpretação:** A afirmação descreve o carregamento cross-origin entre casca e frontend, que o registro e o loader confirmam; os cabeçalhos do frontend não têm artefato.

### 20. README.md:105

**Observação:** "Isolamento: `ViewEncapsulation.ShadowDom` (Angular) ou `this.attachShadow({mode:'open'})` (React/Vanilla)."

**Interpretação:** A afirmação atribui o isolamento ao Shadow DOM do frontend plugado. A casca insere a tag num `div` comum (src/main.ts:166-168), e o bundle externo não está no snapshot.

### 21. README.md:105

**Observação:** "Tokens via `src/tokens.css:1` `--color-primary` em vez de hardcode."

**Interpretação:** A afirmação diz que os frontends usam os tokens da casca; os tokens existem e a casca os usa, mas nenhum frontend do snapshot os usa.

### 22. README.md:129

**Observação:** "Copie de `src/main.ts:52` e `public/silent-check-sso.html:1`" (o frontend autentica no mesmo realm e client do Keycloak da casca).

**Interpretação:** A afirmação descreve autenticação compartilhada entre casca e frontends; a configuração da casca e o client do realm existem (src/main.ts:63-67; keycloak/realm.json:18-37), e o uso por um frontend não tem artefato.

### 23. README.md:174

**Observação:** "frontend nunca `import` da casca — autocontido, próprio `environment.ts` e `Dockerfile`, comunica só via `CustomEvent`/`postMessage`."

**Interpretação:** A afirmação descreve a autonomia dos frontends. Só o `Dockerfile` próprio do `posts-crud` tem artefato (docker-compose.yml:20-22); a casca não tem ouvinte de `CustomEvent` nem de `message`.

### 24. docker-compose.yml:17

**Observação:** "POSTS-CRUD: Micro frontend Angular (outro repo) na porta 4200".

**Interpretação:** O comentário descreve um frontend de outro repositório na montagem local; o serviço é construído fora do repositório (docker-compose.yml:19-24) e não está no registro nem na composição.

### 25. public/microfrontends.json:3

**Observação:** `"_comment": "Projeto da equipe 2 (Member Manager) "`.

**Interpretação:** O campo descritivo atribui a unidade externa a outra equipe; o domínio próprio confirma que é outro projeto, e a equipe não tem artefato.

### 26. c296e85 2026-09-09 (public/silent-check-sso.html; src/main.ts; README.md)

**Observação:** A página de silent SSO, `src/main.ts` e o README são criados em `c296e85` e não mudam até o snapshot. A única versão de `src/main.ts` inicia o Keycloak sem `silentCheckSsoRedirectUri`.

**Interpretação:** A página nunca foi usada por uma versão versionada da casca: foi acrescentada sem conexão, e não desconectada depois.

### 27. c296e85 2026-09-09 (README.md; docker-compose.yml)

**Observação:** O README e o compose só têm a versão de `c296e85`: a promessa "se existir" e o serviço `posts-crud` sem condição entram juntos no primeiro commit.

**Interpretação:** A divergência não é de estágios diferentes; documento e compose nasceram divergentes.

### 28. c296e85 2026-09-09; 7de7c8c 2026-09-30 (Dockerfile.keycloak); 5726e54 2026-09-30 (public/microfrontends.json)

**Observação:** Nenhum commit remove arquivo, e nenhuma árvore do histórico tem código, manifesto ou `Dockerfile` do `member-manager`, do `posts-crud` ou de outro frontend.

**Interpretação:** Os frontends plugados nunca estiveram neste repositório; a casca foi feita desde o início para carregar bundles de outras origens.

### 29. c296e85 2026-09-09 (README.md; docker-compose.yml; src/main.ts); d48027b 2026-09-30 (public/microfrontends.json); 5726e54 2026-09-30 (public/microfrontends.json)

**Observação:** Os exemplos com `posts-crud` só têm a versão de `c296e85`. O registro é alterado duas vezes depois: `d48027b` ("feat: registra member-manager da equipe 2 na shell") e `5726e54` ("fix: Exclusão do localhost project"). O conteúdo das versões anteriores do registro não está disponível no clone.

**Interpretação:** Os exemplos e o registro são de estágios diferentes: o registro mudou para o `member-manager` sem que o README, o compose e o comentário mudassem.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (public/microfrontends.json:4, Arquivo:linha; src/main.ts:225 e src/main.ts:167, Observação); 3.4.5 #1 (Configuração e Código); 3.4.7 #3, #7, #8, #9, #10, #16 (Documento e Evidência) | 2 configuração | configuração | web-components | arquitetural | forte | configura #3; configura #6; configura #8 |
| 2 | 3.4.4 (src/main.ts:218) | 3 código | comentário | — | contexto | fraca | — |
| 3 | 3.4.4 (src/main.ts:225) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #8 |
| 4 | 3.4.4 (public/silent-check-sso.html:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (public/microfrontends.json:4) | 3 código | configuração | web-components | arquitetural | forte | implementa #8 |
| 6 | 3.4.4 (src/main.ts:167) | 3 código | código-fonte | web-components | tecnológica | moderada | implementa #8 |
| 7 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 8 | 3.4.5 #1 | 5 composição | código-fonte | web-components | arquitetural | forte | liga #7 |
| 9 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #7 |
| 10 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #9 |
| 11 | 3.4.7 #2 | 7 documentação | documentação | web-components | arquitetural | fraca | corrobora #7; corrobora #8 |
| 12 | 3.4.7 #3 | 7 documentação | documentação | web-components | arquitetural | fraca | corrobora #1; corrobora #3; corrobora #6; corrobora #8; corrobora src/main.ts:5, 16 |
| 13 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora docker-compose.yml:34-55 |
| 14 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | contradiz docker-compose.yml:19-30 |
| 15 | 3.4.7 #6 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #9; corrobora package.json:12, 21-22 |
| 16 | 3.4.7 #7 | 7 documentação | documentação | web-components | arquitetural | fraca | corrobora #1; corrobora #3; corrobora #5; corrobora #6; corrobora #8 |
| 17 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #5; corrobora src/main.ts:139-140 |
| 18 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #1 |
| 19 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #1; corrobora em parte #3 |
| 20 | 3.4.7 #11 | 7 documentação | documentação | web-components | tecnológica | fraca | — |
| 21 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte src/tokens.css:1-13 |
| 22 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte src/main.ts:63-67; corrobora em parte keycloak/realm.json:18-37 |
| 23 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte docker-compose.yml:20-22 |
| 24 | 3.4.7 #15 | 7 documentação | comentário | — | contexto | fraca | corrobora em parte docker-compose.yml:19-24 |
| 25 | 3.4.7 #16 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #1; corrobora em parte #8 |
| 26 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #4; explica #22 |
| 27 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #14 |
| 28 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #18; explica #19; explica #21; explica #22; explica #23; explica #25 |
| 29 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #24; explica #1 |

## Resumo

Observações: 29. Dimensões (tecnologia: 0, configuração: 1, código: 5, estrutura: 1, composição: 1, build-deploy: 1, documentação: 16, histórico: 4). Força (forte: 3, moderada: 4, fraca: 22, ambígua: 0). Evidência (tecnológica: 4, arquitetural: 19, contexto: 6).
