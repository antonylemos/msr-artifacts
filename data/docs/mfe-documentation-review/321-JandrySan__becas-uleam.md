---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
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

# 321 — JandrySan/becas-uleam

## Leitura do repositório

A documentação está em espanhol. O documento principal é o `README.md` da raiz (`README.md:1-104`),
escrito para a entrega de um "Proyecto integrado Demo Day" (`README.md:1`): descreve uma contenedora
vanilla-ts com login único que integra por iframe três módulos de frameworks diferentes, Vue em
`/vue/`, React em `/react/` e Angular em `/angular/` (`README.md:7-10`), cada um feito por um
integrante (`README.md:86-88`), compilados num único `dist` com subpastas (`README.md:32-40`) e
publicados na Vercel como uma só aplicação estática (`README.md:42`, `:70-80`, `:92`). Justifica a
escolha por iframe sob o mesmo domínio em vez de module federation (`README.md:94`) e diz que a
sessão é compartilhada por `localStorage` (`README.md:92`). Isso bate com as revisões anteriores:
quatro unidades integradas, três relações iframe e quatro de comunicação (3.4.5 #1-#7), build
separado e deploy conjunto (3.4.6 #1, #2, #4, #5). As divergências são três: o README afirma rewrites
que o `vercel.json` não tem (`README.md:80`; `vercel.json:1-6`); o `index.html` diz que a sessão vai
por `localStorage` aos três módulos, mas o React não lê as chaves de sessão (`index.html:46`); e o
README do Angular diz que o módulo não usa banco de dados, mas ele consulta o Supabase
(`3seguimiento-angular/README.md:3`). O README não menciona o scaffold `1verificador-vue/verificador`,
unidade isolada nas revisões 3.4.3 e 3.4.6.

Ficaram fora da tabela: o título (`README.md:1`) e o parágrafo de negócio (`README.md:3`); os
blocos de comando `npm install`/`npm start` e `npm run build` (`README.md:14-17`, `:28-30`), que
são instrução de execução e citam `npm` onde o projeto usa pnpm (`package.json:6`; `vercel.json:3-4`);
a criação das tabelas e o RLS (`README.md:48-58`), detalhe do banco; as variáveis de ambiente na
Vercel (`README.md:61-66`); o modo demo do login (`README.md:68`), detalhe interno da contenedora,
que aliás não se confirma, porque `src/services/supabase.ts:6-8` lança erro quando as variáveis
faltam; a nota retrospectiva sobre dados "inicialmente simulados en `localStorage`"
(`README.md:94`); e os itens pendentes de URL e capturas (`README.md:96-104`). O
`3seguimiento-angular/README.md` traz, além da linha 3, o comando de execução e a lista da rubrica
(rotas, componentes, signals, `SeguimientoStoreService`; `3seguimiento-angular/README.md:5-25`), que
são detalhes internos do módulo. `1verificador-vue/README.md` e `1verificador-vue/verificador/README.md`
são o README padrão do template Vue 3 + Vite, sem afirmação sobre o projeto. A mineração registrou
duas ocorrências `doc-integration-technology`, em `README.md:7` e `README.md:94`, que estão nas
linhas 2, 12 e 13.

Comentários e campos descritivos lidos: `index.html` (o subtítulo "Portal único: elegibilidad,
postulación y seguimiento.", `index.html:15`, que repete o papel da contenedora da linha 2, e a nota
da linha 46, que virou a linha 14); `src/main.ts` e `scripts/build-integrado.mjs`, sem comentários
(a mensagem de console "dist integrado listo: /, /vue/, /react/, /angular/",
`scripts/build-integrado.mjs:20`, repete a linha 5); `scripts/generar-angular-env.mjs:76-77`, que só
avisa que o environment é gerado; `vercel.json`, `pnpm-workspace.yaml`, os `vite.config.ts` e o
`angular.json`, sem comentários; e os `package.json` da raiz e dos módulos, sem `description`.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | 3seguimiento-angular/README.md:3 | "Prototipo navegable con datos simulados en memoria. No usa base de datos." (protótipo com dados simulados em memória; não usa banco de dados) | outro | contradita | 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:42-44; 3seguimiento-angular/src/app/services/supabase.service.ts:24-27; 3.4.6 #5 |
| 2 | README.md:7 | "**Contenedora vanilla-ts**: login único, menú principal e integración por iframe." | estrutura | corroborada | 3.4.3 (linha `.`); 3.4.4 index.html:24; 3.4.5 #1-#3; src/main.ts:59-60, 159 |
| 3 | README.md:8-10 | "**Vue** (`/vue/`): verificador de elegibilidad." / "**React** (`/react/`): postulación y documentos." / "**Angular** (`/angular/`): seguimiento de solicitudes." | estrutura | corroborada | 3.4.3 (linhas 1verificador-vue, 2postulacion-react, 3seguimiento-angular); 3.4.6 #2, #4, #5 |
| 4 | README.md:19-24 | "Durante desarrollo se levantan los módulos por separado" (em desenvolvimento os módulos sobem separados, portas 3000, 5173, 5174 e 4200) | independência | corroborada | package.json:14-15; src/main.ts:24-34; 3.4.6 #2, #4, #5 |
| 5 | README.md:32-40 | "El resultado queda en una sola carpeta:" `dist/ index.html vue/ react/ angular/` (o resultado fica numa só pasta) | build-deploy | corroborada | 3.4.6 #1, #2, #4, #5; scripts/build-integrado.mjs:14-19 |
| 6 | README.md:42 | "una URL pública, módulos en subcarpetas y navegación interna con hash routing" | build-deploy | corroborada | 3.4.6 #1; vercel.json:3-5; 1verificador-vue/src/main.ts:16; 2postulacion-react/src/main.tsx:11; 3seguimiento-angular/src/main.ts:15 |
| 7 | README.md:46, 59 | "Crear un proyecto Supabase único para todo el equipo" / "el proyecto Supabase compartido" (um único projeto Supabase compartilhado) | outro | corroborada | src/services/supabase.ts:3-10; 1verificador-vue/src/services/supabase.ts:3-6; 2postulacion-react/src/services/supabase.ts:4-11; scripts/generar-angular-env.mjs:48-49; 3seguimiento-angular/src/app/services/supabase.service.ts:24-27 |
| 8 | README.md:70-78 | "Deploy en Vercel" … "Output directory: `dist`" | build-deploy | corroborada | 3.4.6 #1; vercel.json:3-5 |
| 9 | README.md:80 | "El archivo `vercel.json` ya incluye rewrites para `/vue/`, `/react/` y `/angular/`." (o `vercel.json` já inclui rewrites para os três caminhos) | build-deploy | contradita | vercel.json:1-6; 3.4.6 (Leitura) |
| 10 | README.md:86-88 | "Integrante 1: módulo Vue" / "Integrante 2: módulo React" / "Integrante 3: módulo Angular" (cada integrante construiu um módulo) | independência | sem corroboração | — |
| 11 | README.md:92 | "El login se dejó en la contenedora para mantener una sesión única compartida mediante `localStorage`" (o login ficou na contenedora para manter uma sessão única compartilhada por `localStorage`) | composição | corroborada | 3.4.4 src/main.ts:138; 3.4.5 #4, #6 |
| 12 | README.md:94 | "integrar aplicaciones hechas con frameworks distintos sin usar herramientas complejas como module federation" (integrar sem module federation) | composição | corroborada | 3.4.2 (nenhuma dependência); 3.4.4 (Notas) |
| 13 | README.md:94 | "se carga desde un iframe bajo el mismo dominio" (cada módulo é carregado num iframe sob o mesmo domínio) | composição | corroborada | index.html:24-26; 3.4.5 #1-#3; 3.4.6 #1, #2, #4, #5 |
| 14 | index.html:46 | "La sesión se comparte con los tres módulos mediante `localStorage`." (a sessão é compartilhada com os três módulos por `localStorage`) | composição | contradita | 3.4.5 #4, #5, #6; src/main.ts:136-141; 2postulacion-react/src/context/PostulacionContext.tsx:4-6, 45-52 |

## Observações

**1. 3seguimiento-angular/README.md:3.** O README do módulo Angular o descreve como protótipo com
dados em memória e sem banco. O snapshot mostra o contrário: o `SeguimientoStoreService` carrega as
solicitações da tabela `solicitudes` pelo cliente Supabase
(`3seguimiento-angular/src/app/services/seguimiento-store.service.ts:42-44`) e grava estados em
`seguimiento` (`:196-216`); o `SupabaseService` cria o cliente e lança erro sem URL ou chave
(`3seguimiento-angular/src/app/services/supabase.service.ts:11-27`); e o build do módulo depende do
environment gerado com as variáveis do Supabase (3.4.6 #5). O README parece anterior à integração com
o Supabase, de que fala a nota retrospectiva do README da raiz (`README.md:94`).

**2. README.md:7.** Atribui à contenedora o login único, o menu e a integração por iframe. A raiz é
unidade frontend com entrada e build próprios (3.4.3, linha `.`); o login com Supabase Auth está em
`src/main.ts:59-60`, chamado em `src/main.ts:159`; o menu é a `<nav class="tabs">` que declara os
três módulos (3.4.4, `index.html:24`); e a contenedora carrega cada módulo no iframe (3.4.5 #1-#3).
A frase não se divide porque todas as partes se confirmam; o Tema é o da primeira propriedade, o
papel da contenedora. O mesmo papel reaparece em "una contenedora vanilla-ts y tres módulos por
framework" (`README.md:92`) e no subtítulo `index.html:15`; o "login se dejó en la contenedora" de
`README.md:92` também é esta afirmação, e a sessão compartilhada da mesma frase é a linha 11.

**3. README.md:8-10.** Os três módulos e seus caminhos batem com as unidades da revisão estrutural e
com a coluna "Onde é servida" da revisão de build e deploy: `/vue/`, `/react/` e `/angular/`
(3.4.6 #2, #4, #5). O Angular é carregado em `/angular/#/seguimiento` (`index.html:26`), dentro do
mesmo prefixo. A lista não inclui o scaffold `1verificador-vue/verificador`, que a revisão
estrutural conta como unidade, mas que não está integrado (3.4.6 #3); como o título da seção é
"Módulos integrados" (`README.md:5`), a omissão não contradiz a afirmação.

**4. README.md:19-24.** Em desenvolvimento cada módulo tem seu próprio servidor: o `start` da raiz
sobe com `concurrently` o Vite da contenedora na 3000, o do Vue na 5173, o do React na 5174 e o
`ng serve` do Angular na 4200 (`package.json:14-15`), e a contenedora troca as URLs do iframe por
essas portas quando roda em `localhost:3000` (`src/main.ts:24-34`). O README pede `npm start`
(`README.md:16`), mas o script chama `pnpm --dir` para os módulos (`package.json:14`).

**5. README.md:32-40.** A árvore do `dist` com `index.html` e as subpastas `vue/`, `react/` e
`angular/` é o que `scripts/build-integrado.mjs:14-19` monta ao copiar os três builds para o `dist`
da raiz, depois do `vite build` da contenedora (3.4.6 #1, #2, #4, #5). A mesma afirmação reaparece em
"usar subcarpetas" (`README.md:92`), em "cada módulo queda compilado en su carpeta"
(`README.md:94`) e na mensagem de `scripts/build-integrado.mjs:20`.

**6. README.md:42.** Uma URL pública: há um só deploy, o do `dist` integrado (`vercel.json:3-5`;
3.4.6 #1); o endereço publicado não está no snapshot (`README.md:100`, "pendiente"). Módulos em
subpastas: a linha 5. Hash routing: os três módulos usam roteamento por hash
(`1verificador-vue/src/main.ts:16`, `createWebHashHistory('/vue/')`;
`2postulacion-react/src/main.tsx:11`, `HashRouter`; `3seguimiento-angular/src/main.ts:15`,
`withHashLocation()`). As partes se confirmam todas, e a frase fica numa linha com o Tema da
primeira propriedade. `README.md:92` repete a afirmação ("usar subcarpetas y hash routing […]
desplegar todo como una sola app estática").

**7. README.md:46, 59.** O README pede um projeto Supabase único para a equipe e diz que o fluxo
depende do projeto compartilhado. A contenedora (`src/services/supabase.ts:3-10`), o Vue
(`1verificador-vue/src/services/supabase.ts:3-6`), o React
(`2postulacion-react/src/services/supabase.ts:4-11`) e o Angular
(`3seguimiento-angular/src/app/services/supabase.service.ts:24-27`, com URL e chave geradas de
`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` por `scripts/generar-angular-env.mjs:48-49`) usam o
mesmo par de variáveis; o Vue consulta a tabela `becas` (`1verificador-vue/src/views/HomeView.vue:47-50`), o React grava em `solicitudes` (`2postulacion-react/src/pages/VistaPrevia.tsx:47-48`)
e o Angular lê dela (`3seguimiento-angular/src/app/services/seguimiento-store.service.ts:43-44`). Quatro
unidades usam o mesmo backend.

**8. README.md:70-78.** Deploy na Vercel com saída `dist`: é o único artefato de deploy
(`vercel.json:3-5`; 3.4.6 #1). O passo 4 manda conferir o build command `npm run build`
(`README.md:76`), enquanto o `vercel.json:4` define `pnpm run build`; os dois rodam o mesmo script
`build` (`package.json:17`), e a diferença não muda como as unidades são construídas ou implantadas.

**9. README.md:80.** O `vercel.json` não tem `rewrites` (`vercel.json:1-6`): só `installCommand`,
`buildCommand` e `outputDirectory`. As subpastas são servidas como arquivos estáticos do `dist`, como
registra a Leitura da revisão de build e deploy.

**10. README.md:86-88.** A divisão de um módulo por integrante está sob "Completar antes de
entregar" (`README.md:84`) e não traz nomes. Nada no snapshot registra autoria. `README.md:92`
repete a ideia ("para que cada integrante pueda defender su parte de forma independiente").

**11. README.md:92.** A contenedora faz o login e grava `token`, `usuario`, `becas_session` e
`supabase_user_id` no `localStorage` em `saveSession` (3.4.4, `src/main.ts:138`; `src/main.ts:136-141`).
O Vue lê `usuario` (3.4.5 #4; `1verificador-vue/src/views/HomeView.vue:21`) e o Angular lê
`becas_session` e `usuario` (3.4.5 #6); como ao menos duas unidades usam a sessão, a afirmação é
`corroborada`. O compartilhamento depende da mesma origem, que só existe no deploy integrado
(3.4.4, Notas).

**12. README.md:94.** A revisão de dependências não encontrou nenhuma tecnologia de integração
(3.4.2), e a busca da revisão de código-fonte não achou `loadRemote`, `import()` dinâmico nem
injeção de script (3.4.4, Notas). A integração é só por iframe e mensagens (3.4.5 #1-#6).

**13. README.md:94.** Os botões declaram caminhos relativos (`index.html:24-26`) que o iframe carrega
(3.4.5 #1-#3), e os quatro builds saem no mesmo deploy (3.4.6 #1, #2, #4, #5), portanto sob o
mesmo domínio. Em desenvolvimento não é assim: as URLs passam a ser portas diferentes de
`localhost` (`src/main.ts:24-34`), como o próprio README indica (`README.md:19-24`). A primeira parte
da frase, "cada módulo queda compilado en su carpeta", repete a linha 5.

**14. index.html:46.** A nota da tela de login estende a sessão por `localStorage` aos três módulos.
O Vue lê `usuario` (3.4.5 #4) e o Angular lê `becas_session` e `usuario` (3.4.5 #6), mas o React só
lê as chaves `becas_*` dos dados do estudante
(`2postulacion-react/src/context/PostulacionContext.tsx:4-6`, `:45-52`) e nenhuma das chaves de sessão
gravadas em `src/main.ts:136-141`; a sessão chega a ele só por `BECAS_PORTAL_STATE` via `postMessage`
(3.4.5 #5). A parte do React é desmentida, e a afirmação é `contradita`. É linha separada da 11
porque nomeia os três módulos como sujeito.

## Resumo

Afirmações: 14 (corroborada: 10, parcial: 0, contradita: 3, sem corroboração: 1). Temas: (estrutura: 2, composição: 4, build-deploy: 4, independência: 2, outro: 2).
