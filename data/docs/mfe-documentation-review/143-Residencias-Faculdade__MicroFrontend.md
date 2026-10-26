---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

# 143 — Residencias-Faculdade/MicroFrontend

## Leitura do repositório

A documentação é só o `README.md` da raiz, em português, escrito como guia de integração em três
partes: a configuração da casca (seção A), o contrato que todo frontend externo deve cumprir
(seção B) e como plugar um frontend novo (seção C). O texto cita o código por `artefato:linha`, mas
várias referências não batem com o snapshot: o Keycloak é configurado em src/main.ts:63-78, não em
"src/main.ts:52-78" (README.md:30); o `fetch` do registro está em src/main.ts:139, não em ":122"
(README.md:68); a checagem `customElements.get(tag)` está em src/main.ts:203 e :221, não em ":193"
(README.md:102); e src/main.ts:199 (README.md:104) é a declaração `let loaderHost`. O apêndice e
alguns trechos remetem a `CONEXAO-MICROFRONTEND.md`, `Requisitos-Microfrontend.md` e
`Arquitetura-Visual.md` (README.md:125, :172, :212-214; src/main.ts:7), que não estão no snapshot
nem no `artifacts.csv`.

No conjunto, o README descreve o que as revisões anteriores encontraram: uma casca Vite que lê um
registro em runtime, injeta o `main.js` de cada frontend externo e monta o custom element dele
(3.4.4; 3.4.5 #1), construída e servida por Nginx numa imagem própria (3.4.6 #1). A diferença está
nos exemplos: o README e o `docker-compose.yml` usam o frontend `posts-crud` em
`http://localhost:4200/main.js` (README.md:64, :186; docker-compose.yml:17-24), enquanto o registro
do snapshot só tem `member-manager`, servido de `https://crud-member-manager.vercel.app/main.js`
(public/microfrontends.json:4-6). As afirmações sobre os frontends externos (isolamento, cache,
CORS, comunicação) não têm o outro lado no snapshot, porque nenhuma unidade externa está nele.

Ficaram fora da tabela:
- a inicialização do Keycloak (`login-required`, PKCE, renovação do token) e a configuração do
  realm (README.md:30, :83), detalhes internos da casca; o grid da página (README.md:30;
  src/style.css:52-56), aparência;
- as variáveis de ambiente e o cenário "Prod (Vercel/Railway)" (README.md:32-56), instrução de
  configuração com domínio hipotético (`https://sua-shell.vercel.app/*`); o realm tem um
  `redirectUris` `https://micro-frontend-rho.vercel.app/*` (keycloak/realm.json:33), sem
  configuração de hospedagem no snapshot;
- os blocos de código que reproduzem comandos, configurações e exemplos: comandos de instalação e do
  Docker (README.md:5-11, :74-79), o registro de exemplo (README.md:62-66, :184-189), o `nginx.conf`
  sugerido para o frontend (README.md:109-121), o código de autenticação (README.md:131-149), os
  exemplos por stack (README.md:155-172) e o serviço do compose (README.md:191-197);
- as instruções de passo a passo: montar o Dockerfile do frontend como o da casca (README.md:125),
  publicar o frontend e anotar a URL (README.md:182), adicionar o serviço ao compose (README.md:190)
  e rodar `npm run dev` com os frontends no ar (README.md:215). O checklist (README.md:200-206)
  repete o contrato e está nos parágrafos das afirmações 3, 9, 10, 11 e 13.

Ocorrências `doc-*`: README.md:1 está na afirmação 2; README.md:3 na 3; README.md:30 na 7, com
README.md:68 e :102 no parágrafo dela; README.md:60 na 8. Não viraram linha: README.md:91, título
da seção "B.1. Contrato Web Component (obrigatório)"; README.md:125 e :183, instruções de passo a
passo; README.md:142, linha de bloco de código; README.md:172, exemplo Vanilla que remete a documento
ausente; README.md:212-213, referências a documentos ausentes; README.md:215, instrução de execução.

Foram lidos os comentários e campos descritivos de `Dockerfile`, `Dockerfile.keycloak` (sem
comentários), `docker-compose.yml`, `nginx.conf`, `src/main.ts`, `public/microfrontends.json`,
`public/silent-check-sso.html`, `keycloak/realm.json`, `index.html`, `vite.config.ts`,
`src/style.css` e `package.json` (sem `description`). Os de Dockerfile:1, :11, docker-compose.yml:17
e public/microfrontends.json:3 viraram linha; docker-compose.yml:1, :3, :18, nginx.conf:1,
src/main.ts:1-3, :7-8, :217-218 e keycloak/realm.json:22 estão nos parágrafos das afirmações.
Ficaram de fora o SPA e o CORS dos assets da casca (nginx.conf:8, :13), a rede e a espera do
Keycloak no compose (docker-compose.yml:14, :59), a autenticação (src/main.ts:62, :77;
public/silent-check-sso.html:1-2), o título da página "Shell Micro Frontends" (index.html:6) e o
exemplo `<posts-crud></posts-crud>` (src/main.ts:165), citado na afirmação 15.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | Dockerfile:1, 11 | "STAGE 1: BUILD - Compila Vite (TS -> JS) dentro do container" / "STAGE 2: RUNTIME - Serve dist/ com Nginx" | build-deploy | corroborada | 3.4.6 #1; Dockerfile:2-18 |
| 2 | README.md:1 | "Biblioteca Shell para Micro Frontends via Web Components" | estrutura | corroborada | 3.4.3 (`.` `Yes`); 3.4.5 #1 (web-components); src/main.ts:167, 225-230 |
| 3 | README.md:3 | "importe a casca como orquestradora e plugue qualquer frontend que exponha um `Custom Element`. Sem rebuild da casca, sem acoplamento entre times." | composição | corroborada | 3.4.5 #1; src/main.ts:5, 16, 139-140, 167, 219-231; public/microfrontends.json:3 |
| 4 | README.md:8 | "docker compose up --build -d   # shell :3000 + keycloak :8080" (o compose sobe a casca e o Keycloak) | build-deploy | corroborada | 3.4.6 #1; docker-compose.yml:4-15, 34-55 |
| 5 | README.md:8 | "(+ posts-crud :4200 se existir)" (o compose só sobe o `posts-crud` se o projeto existir) | build-deploy | contradita | docker-compose.yml:1, 19-30; 3.4.6 (Leitura) |
| 6 | README.md:13 | "**Stack:** Vite 6 + TypeScript + `keycloak-js` 26.2 (PKCE S256) + Nginx + Docker Compose." | build-deploy | corroborada | package.json:8, 12, 21-22; Dockerfile:12-18; docker-compose.yml:4-15; 3.4.6 #1 |
| 7 | README.md:30 | "carrega `public/microfrontends.json:1` para injetar `<script type="module" src="url">` e montar `<tag></tag>` dentro de `#microfrontends`" | composição | corroborada | 3.4.4 (src-dynamic-script src/main.ts:225; manual src/main.ts:167; manual public/microfrontends.json:4); 3.4.5 #1 |
| 8 | README.md:60 | "`public/microfrontends.json` é o **único ponto de configuração da casca**" | composição | corroborada | 3.4.4 (manual public/microfrontends.json:4); src/main.ts:139-140, 146-169 |
| 9 | README.md:103 | "`main.js` estável sem hash (`main.js` com `no-cache`, chunks `main-*.js` com `immutable`)" | build-deploy | parcial | public/microfrontends.json:6 |
| 10 | README.md:104 | "`main.js` deve responder `200` + `Content-Type: application/javascript` + `Access-Control-Allow-Origin: *` — shell é ` :3000` buscando ` :4202` cross-origin" | build-deploy | parcial | public/microfrontends.json:6; docker-compose.yml:9; src/main.ts:225-227 |
| 11 | README.md:105 | "Isolamento: `ViewEncapsulation.ShadowDom` (Angular) ou `this.attachShadow({mode:'open'})` (React/Vanilla)." | composição | sem corroboração | — |
| 12 | README.md:105 | "Tokens via `src/tokens.css:1` `--color-primary` em vez de hardcode." (os frontends usam os tokens da casca) | estrutura | parcial | src/tokens.css:1-13; src/style.css:2, 96 |
| 13 | README.md:129 | "Copie de `src/main.ts:52` e `public/silent-check-sso.html:1`" (o frontend autentica no mesmo realm e client do Keycloak da casca) | composição | parcial | src/main.ts:63-67; keycloak/realm.json:18-37 |
| 14 | README.md:174 | "frontend nunca `import` da casca — autocontido, próprio `environment.ts` e `Dockerfile`, comunica só via `CustomEvent`/`postMessage`." | independência | parcial | docker-compose.yml:20-22 |
| 15 | docker-compose.yml:17 | "POSTS-CRUD: Micro frontend Angular (outro repo) na porta 4200" | estrutura | parcial | docker-compose.yml:19-24; 3.4.3 (Notas) |
| 16 | public/microfrontends.json:3 | "Projeto da equipe 2 (Member Manager)" (o `member-manager` é um projeto de outra equipe) | independência | parcial | public/microfrontends.json:4-6; 3.4.5 #1 (No snapshot `No`) |

## Observações

**1. Dockerfile:1, 11.** A imagem tem dois estágios: `node:22-alpine` instala as dependências e roda
`npm run build` (Dockerfile:2-9), e `nginx:alpine` copia o `nginx.conf` e o `dist/` da casca
(Dockerfile:12-18). A mesma afirmação está em README.md:72 ("`Dockerfile:1` multi-stage:
`node:22-alpine` […] → `nginx:alpine` (`COPY nginx.conf` + `dist/`)"), em docker-compose.yml:3
("SHELL: Vite build servido por Nginx na porta 3000") e em nginx.conf:1 ("NGINX DA SHELL - Serve SPA
Vite"). A revisão de build e deploy registrou build e deploy `separado` para a casca.

**2. README.md:1.** O repositório é a casca: uma só aplicação frontend (3.4.3) que monta, como custom
element, o frontend do registro (src/main.ts:167) e carrega o script que o define
(src/main.ts:225-230). O comentário de abertura de src/main.ts:1-3 repete a descrição
("Orquestradora de Micro Frontends via Web Components"). "Biblioteca" e "Use como biblioteca"
(README.md:3) não correspondem a um pacote: `atividadengx-shell` é `private` (package.json:2-4) e o
build Vite parte de `index.html` (3.4.3); o README usa a palavra para a casca reaproveitada como
orquestradora, sem empacotamento próprio. A divergência não muda a corroboração da afirmação.

**3. README.md:3.** A casca monta qualquer tag do registro e carrega a URL dela, sem saber o
framework do frontend (src/main.ts:146-169, 219-231); o contrato pede só o custom element definido
no `main.js` (README.md:93-100; src/main.ts:8, 218; docker-compose.yml:18), o que o checklist
repete (README.md:202-203: `customElements.get` indefinido antes e com a classe depois, tag com
hífen e única). "Sem rebuild": o
registro é lido por `fetch` em runtime (src/main.ts:139-140), e README.md:198 repete ("sem rebuild
da casca"). No snapshot, porém, não há volume que monte o registro no container do `shell`
(docker-compose.yml:4-15): nessa montagem, ele entra na imagem junto com o resto do `dist/`
(Dockerfile:8-9, 16). "Sem acoplamento": a casca só importa `keycloak-js` e o próprio loader
(src/main.ts:5, 16), e README.md:89 repete ("A casca não importa código dele"); o registro
identifica o frontend como "Projeto da equipe 2" (public/microfrontends.json:3). A lista de
frameworks de README.md:89 ("Angular 21, React, Vue, Vanilla") e os exemplos de README.md:155-172
não têm frontend correspondente no snapshot.

**4. README.md:8.** O compose constrói a casca no serviço `shell` (docker-compose.yml:4-15) e sobe o
Keycloak da imagem publicada (docker-compose.yml:34-55), nas portas padrão 3000 e 8080
(docker-compose.yml:9, :43). README.md:72 repete ("sobe `shell:3000` + `keycloak:8080`
(`app-network`)"). O Keycloak roda em `start-dev` (docker-compose.yml:36), montagem local.

**5. README.md:8.** O README diz que o `posts-crud` sobe "se existir", e README.md:72 detalha: "se
path `../Caio/...` não existir, sobe só casca+keycloak". O compose declara `posts-crud` como serviço
comum, com `build.context: ../Caio/aprendendo/primeiro-projeto`, sem perfil nem outra condição
(docker-compose.yml:19-30), e o comentário de docker-compose.yml:1 lista os três serviços juntos
("Sobe shell + posts-crud + keycloak"). Nada no snapshot torna o serviço opcional; com o caminho
ausente, o `docker compose up --build` de README.md:8 tenta construí-lo da mesma forma. A parte
"shell + keycloak" está na afirmação 4.

**6. README.md:13.** Vite (`^6.2.0`), TypeScript e `keycloak-js` (`^26.2.0`) estão no
package.json:12, 21-22, com build `tsc && vite build` (package.json:8); o PKCE S256 está em
src/main.ts:76; Nginx e Compose são os da afirmação 1 e 4. A lista não cita o React, que está nas
dependências (package.json:13-14) e no plugin do Vite (vite.config.ts:2, 6).

**7. README.md:30.** A casca busca o registro (src/main.ts:139), cria para cada entrada um botão e um
wrapper com a tag (src/main.ts:146-169) e injeta `<script type="module">` no `head` quando a tag
ainda não está definida (src/main.ts:219-231). README.md:68 ("faz `fetch` e para cada entrada cria
`button.sidebar-btn` + `div#wrapper-tag` com `header` e mount `<tag></tag>`") e README.md:102
("verifica `customElements.get(tag)` antes de injetar") repetem a afirmação, assim como o comentário
de src/main.ts:217; as linhas que o README cita estão desatualizadas (ver Leitura). O "Array vazio"
de README.md:68 corresponde a src/main.ts:142, 173.

**8. README.md:60.** A lista de frontends vem só de `/microfrontends.json` (src/main.ts:139-140); o
código da casca não tem URL ou tag fixa de frontend. README.md:180 repete ("**Única edição na
casca** para plugar um frontend novo"). O passo 3 de README.md:190 manda editar também o
`docker-compose.yml` "se orquestra local", o que é montagem local do frontend, não configuração da
casca. O exemplo de registro do README (README.md:62-66) difere do registro do snapshot
(public/microfrontends.json:1-8).

**9. README.md:103.** O registro aponta para um `main.js` sem hash
(public/microfrontends.json:6), o que confirma a parte do nome estável. A política de cache do
`main.js` e dos chunks é do servidor do frontend, fora do snapshot. README.md:125 (cópia de
`main-*.js` para `main.js` no Angular) e README.md:205 repetem a afirmação. O `nginx.conf` da casca,
que README.md:109 manda copiar, dá `immutable` a todo `.js` e não tem regra para `main.js`
(nginx.conf:14-19); isso vale para os arquivos da casca e não contradiz o que se pede ao frontend.

**10. README.md:104.** A casca, servida na porta 3000 (docker-compose.yml:9), carrega o script de
`https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:6;
src/main.ts:225-227), outra origem, o que confirma o carregamento cross-origin. Os cabeçalhos que o
frontend deve devolver não têm artefato no snapshot. A porta 4202 do exemplo não está no registro.
O pedido de CORS se repete em src/main.ts:8, :218, docker-compose.yml:18 e README.md:182, :201.

**11. README.md:105.** A casca insere a tag dentro de um `div` comum, sem Shadow DOM próprio
(src/main.ts:166-168); o isolamento, se houver, vem do bundle externo, que não está no snapshot. O
comentário de src/main.ts:3 ("injeta cada um como Custom Element isolado") e README.md:204 ("Shadow
DOM isolado") repetem a afirmação.

**12. README.md:105.** Os tokens existem em src/tokens.css:1-13 e são usados pela própria casca
(src/style.css:2, 96). Nenhuma outra unidade do snapshot os usa, e o frontend externo não está nele;
os tokens estão disponíveis, mas o uso pelos frontends não tem artefato.

**13. README.md:129.** A seção "Auth do frontend (se usar API protegida)" (README.md:127) manda o
frontend usar a mesma configuração do Keycloak da casca: mesmo realm e client (README.md:131-142;
src/main.ts:63-67). O realm tem um único client `frontend`, descrito como "Frontend shell e micro
frontends" (keycloak/realm.json:20-22), com `redirectUris` para a porta da casca e para 4200, 4201
e 4202 (keycloak/realm.json:30-37), o que README.md:83 e :151 também dizem. O uso pela casca se
confirma; o uso por um frontend não tem artefato, e a revisão de composição não encontrou repasse de
token entre a casca e o custom element (3.4.5, Leitura). O checklist repete a afirmação
(README.md:206: "`silent-check-sso.html` + `S256` + `updateToken(30)`"). A página
`silent-check-sso.html` que README.md:146 diz ser obrigatória não é usada pela própria casca
(3.4.4, linha `src-cross-unit-communication`).

**14. README.md:174.** O compose constrói o `posts-crud` com o `Dockerfile` do contexto dele, fora
do repositório (docker-compose.yml:20-22), o que confirma a parte do Dockerfile próprio. O resto
(não importar da casca, `environment.ts` próprio, comunicação só por `CustomEvent`/`postMessage`) é
sobre o código dos frontends, que não está no snapshot. Do lado da casca, não há ouvinte de
`CustomEvent` nem de `message`: o único `postMessage` do snapshot é o da página de silent SSO
(3.4.4).

**15. docker-compose.yml:17.** O serviço `posts-crud` é construído a partir de
`../Caio/aprendendo/primeiro-projeto`, fora do repositório (docker-compose.yml:19-24), o que
confirma "outro repo" e a porta 4200; que seja um micro frontend Angular não tem artefato. O
`posts-crud` não está no registro (public/microfrontends.json:1-8), e a revisão de composição não
registrou relação com ele (3.4.5, Leitura); ele aparece só nos exemplos (README.md:64, :186;
src/main.ts:165).

**16. public/microfrontends.json:3.** O `member-manager` é servido de um domínio próprio
(public/microfrontends.json:6) e não está no snapshot (3.4.5 #1), o que confirma que é outro
projeto. Que pertença à "equipe 2" não tem artefato.

## Resumo

Afirmações: 16 (corroborada: 7, parcial: 7, contradita: 1, sem corroboração: 1). Temas: (estrutura: 3, composição: 5, build-deploy: 6, independência: 2).
