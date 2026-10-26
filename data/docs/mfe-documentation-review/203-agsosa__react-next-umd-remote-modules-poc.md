---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
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

# 203 — agsosa/react-next-umd-remote-modules-poc

## Leitura do repositório

O `artifacts.csv` tem três documentos: `README.md` na raiz, `mf-1/README.md` e `shell/README.md`. Os dois últimos são idênticos e são o README padrão do create-next-app (shell/README.md:1, 25, 36-40). Não falam deste projeto e não viram linha. Toda a documentação do projeto está no `README.md` da raiz, em inglês. Ele apresenta uma prova de conceito de microfrontends em formato UMD, com duas aplicações Next.js, `Shell App` e `MF1`, e diz que não usa Module Federation (README.md:1-3, 12-17). Explica como o `mf-1` usa os componentes nas próprias páginas e também os compila com Vite num bundle UMD (README.md:22-54). Mostra como o shell carrega o bundle por um hook e renderiza os componentes (README.md:56-76). Termina com instruções de execução, vantagens e cuidados (README.md:78-138). Os comentários do código estão em espanhol.

No que descreve como existente, o README confere com as revisões anteriores. Há duas unidades, `mf-1` e `shell` (3.4.3), e uma relação `host → remote` por `<script>` injetado, que lê a global `MF1_RemoteModules` (3.4.5 #1). A revisão de dependências não encontrou nenhuma tecnologia de integração (3.4.2), o que confirma o "not Module Federation". Divergem do snapshot o endereço publicado na Vercel, sem configuração de deploy (afirmação 2), a frase de que o shell "only needs a `<script>` tag" (afirmação 16) e as "shared interfaces" (afirmação 18), que são duas cópias idênticas, uma em cada unidade.

Ficaram fora da tabela:
- as ocorrências `doc-*` que são títulos: README.md:1 (`doc-mfe-term`, "# UMD-based Microfrontends PoC"), README.md:56 (`doc-host-remote`, "### 2. Shell App Remote Loading") e README.md:121 (`doc-mfe-term`, "## ✅ Advantages of UMD based microfrontends");
- duas ocorrências `doc-*` que repetem afirmações e aparecem no parágrafo delas: README.md:17 (`doc-host-remote`, "Dual Usage") na afirmação 5, e README.md:138 (`doc-mfe-term`, `doc-integration-technology`) nas afirmações 1 e 3;
- os blocos de código que reproduzem configuração ou fonte:
  - README.md:28-47 resume mf-1/vite.mf.ts:27-47, com `input: './src/RemoteModules/RemoteModules.ts'` no lugar de `"src/RemoteModules/RemoteModules.ts"` (mf-1/vite.mf.ts:33) e sem `outDir` nem `entryFileNames` (mf-1/vite.mf.ts:28, 37);
  - README.md:50-52 reproduz mf-1/src/RemoteModules/RemoteModules.ts:10;
  - README.md:60-67 usa a URL fixa `http://localhost:3001/remote-modules/bundle.js`. O código monta a URL com `MF1_BASE_URL` (shell/src/components/RemoteHeader.tsx:19; shell/next.config.js:8);
  - README.md:106-110 resume shell/src/components/RemoteHeader.tsx:12, 37;
- as instruções de execução, que sobem cada aplicação no seu terminal (README.md:80-94). Conferem com os scripts `dev` de cada diretório (mf-1/package.json:6; shell/package.json:6);
- as portas de desenvolvimento: README.md:98-99. A 3001 confere com mf-1/package.json:7, e a 3000 é o padrão do `next dev` do shell (shell/package.json:6);
- o cabeçalho de cache, "The **mf-1** `next.config` also sets Cache-Control headers" (README.md:119). É detalhe do servidor. Confere com mf-1/next.config.ts:9-23, só em produção;
- "Framework Agnostic: UMD works with any JavaScript environment" (README.md:123). Fala do formato UMD, não das unidades. O bundle deste projeto depende de `React` e `ReactDOM` como globais (mf-1/vite.mf.ts:35, 42-45);
- "Full type safety", parte da afirmação 18, que não é arquitetural. As duas configurações do Next ignoram erros de TypeScript no build: "ignore eslint/typescript for now, this is just a PoC" (mf-1/next.config.ts:25, 29-31; shell/next.config.js:11, 15-17).

Comentários lidos nos artefatos citados pelas revisões anteriores:
- mf-1/vite.mf.ts. Viraram linha os de :28 e :35 (afirmações 22 e 23). O de :39 ("DEBE SER UN NOMBRE UNICO") vai na afirmação 19, e o de :42 remete ao de :35. Os de :8-9, :41 e :51 tratam de variáveis de ambiente, CSS e alias e não viraram linha. O de :9 pede "INYECTAR LAS VARIABLES DE ENTORNO RUNTIME EN LOS PODS DE KUBERNETES" como pendência, e o snapshot não tem manifesto de Kubernetes, como registrou a 3.4.6;
- mf-1/next.config.ts:6 e :25;
- shell/next.config.js:11;
- shell/src/hooks/useRemoteModule.ts. Os comentários de :11, :21, :27, :35, :39, :46, :54, :57, :69, :72 e :78 descrevem os passos do carregador. O de :11 ("Cache global para evitar cargas duplicadas") vai na afirmação 15, e o de :35 ("Preparar React globalmente") na afirmação 23;
- mf-1/src/RemoteModules/Fulfilment.tsx:216, 246 e mf-1/src/RemoteModules/FulfilmentDetails.tsx:272 ("Notificar al shell"). Descrevem as chamadas aos callbacks que a 3.4.4 registrou e não acrescentam afirmação.

Os `package.json` não têm campo `description`.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A proof-of-concept implementation of microfrontends using UMD (Universal Module Definition) format with Next.js and React, enabling remote component sharing between applications" | estrutura | corroborada | 3.4.3 (mf-1, shell `Yes`); 3.4.5 #1; mf-1/vite.mf.ts:38 |
| 2 | README.md:7-8 | "**Shell App**: https://umd-remote-modules-poc-shell.vercel.app/", "**MF1**: https://umd-remote-modules-poc-mf1.vercel.app/" | build-deploy | sem corroboração | — |
| 3 | README.md:12 | "This solution implements **UMD-based Microfrontends** (not Module Federation)" | composição | corroborada | 3.4.2 (nenhuma dependência das tecnologias); 3.4.5 #1 (mecanismo `script`) |
| 4 | README.md:14 | "**Shell App**: A Next.js application that consumes remote components from MF1" | estrutura | corroborada | 3.4.3 (shell `Yes`); 3.4.5 #1 |
| 5 | README.md:15 | "**MF1**: A Next.js application that also uses its own components internally AND exposes them as UMD bundles for remote consumption" | estrutura | corroborada | 3.4.3 (mf-1 `Yes`); 3.4.4 (Notas); mf-1/src/pages/index.tsx:3-4; mf-1/src/RemoteModules/RemoteModules.ts:10 |
| 6 | README.md:16 | "**Remote Loading**: Components are loaded dynamically via script tags" | composição | corroborada | 3.4.4 (script-loading: 4); 3.4.5 #1; shell/src/hooks/useRemoteModule.ts:79-80, 99 |
| 7 | README.md:24 | "MF1 runs as a standalone Next.js application that uses its own components locally" | independência | corroborada | 3.4.3 (mf-1: Entrada e Build próprios); mf-1/package.json:7; mf-1/src/pages/index.tsx:3-4 |
| 8 | README.md:26 | "MF1 also uses Vite to compile the same React components into a UMD bundle for remote consumption" | build-deploy | corroborada | 3.4.6 #1; mf-1/package.json:8, 11; mf-1/vite.mf.ts:33, 38 |
| 9 | README.md:58 | "The shell app uses a reusable hook to load and consume remote components" | composição | corroborada | 3.4.4 (shell/src/components/RemoteHeader.tsx:18; shell/src/components/RemoteFulfilment.tsx:29; shell/src/components/RemoteFulfilmentDetails.tsx:29) |
| 10 | README.md:74 | "**Global Access**: Components become available via `window.MF1_RemoteModules`" | composição | corroborada | 3.4.5 #1; mf-1/vite.mf.ts:39; shell/src/hooks/useRemoteModule.ts:23-24 |
| 11 | README.md:75-76 | "Components are treated as normal React components", "React renders them seamlessly into the shell's component tree" | composição | corroborada | 3.4.4 (runtime-composition: 3); 3.4.5 #1; shell/src/components/RemoteHeader.tsx:37 |
| 12 | README.md:86 | "Next.js development server + Vite watch mode for exported remote components" | build-deploy | corroborada | mf-1/package.json:6-7, 12 |
| 13 | README.md:100 | "**Remote Bundle**: http://localhost:3001/remote-modules/bundle.js (UMD bundle for Shell)" | build-deploy | corroborada | 3.4.6 #1; mf-1/vite.mf.ts:28, 37; mf-1/package.json:7 |
| 14 | README.md:104 | "router state is passed as props" | composição | corroborada | 3.4.4 (shell/src/components/RemoteHeader.tsx:37); mf-1/src/RemoteModules/Header.tsx:51, 83-85, 104-106 |
| 15 | README.md:114-117 | "The `useRemoteModule` hook implements: - **Script caching**: Prevents duplicate loads - **Component memoization**: Improves performance - **Error handling**: Graceful fallbacks" | composição | corroborada | shell/src/hooks/useRemoteModule.ts:11-13, 46-75, 94-97; shell/src/components/RemoteHeader.tsx:24-31 |
| 16 | README.md:124 | "**Simple Setup**: No complex module-federation configuration. The shell app only needs a `<script>` tag." | composição | contradita | 3.4.4 (shell/src/hooks/useRemoteModule.ts:79); shell/src/hooks/useRemoteModule.ts:36-37; mf-1/vite.mf.ts:35, 42-45; shell/next.config.js:7-9 |
| 17 | README.md:125 | "**Standalone Development**: Each microfrontend can be developed independently" | independência | corroborada | 3.4.3 (Manifesto, Entrada e Build por unidade; Notas); mf-1/package.json:6; shell/package.json:6 |
| 18 | README.md:127 | "**TypeScript Support**: Full type safety with shared interfaces" | estrutura | contradita | mf-1/src/types/remote-components.d.ts:3-29; shell/src/types/mf1-remote-components.d.ts:3-29; mf-1/src/RemoteModules/Header.tsx:2; shell/src/components/RemoteHeader.tsx:4 |
| 19 | README.md:132 | "**Global Namespace**: Each microfrontend needs unique global names" | composição | corroborada | mf-1/vite.mf.ts:39; shell/src/hooks/useRemoteModule.ts:23 |
| 20 | README.md:133 | "**Dependency Management**: External dependencies must be managed carefully" | composição | corroborada | mf-1/vite.mf.ts:35, 42-45; mf-1/package.json:17-18; shell/package.json:13-14 |
| 21 | README.md:134 | "**Runtime Loading**: Components are loaded at runtime, not build time. SSR is not compatible." | composição | corroborada | 3.4.5 #1; 3.4.6 #2; shell/src/hooks/useRemoteModule.ts:20, 79-99 |
| 22 | mf-1/vite.mf.ts:28 | "podemos subirlo a cualquier otro lugar" (podemos publicá-lo em qualquer outro lugar) | build-deploy | parcial | 3.4.6 #1; shell/next.config.js:8; shell/src/components/RemoteHeader.tsx:19 |
| 23 | mf-1/vite.mf.ts:35 | "App shell debe proveer react/react-dom. Debemos coordinar mismas versiones." (o shell deve fornecer react/react-dom; devemos coordenar as mesmas versões) | composição | corroborada | shell/src/hooks/useRemoteModule.ts:36-37; mf-1/vite.mf.ts:42-45; mf-1/package.json:17-18; shell/package.json:13-14 |

## Observações

**1. README.md:3.** A frase apresenta o projeto como microfrontends que compartilham componentes entre aplicações por meio de um bundle UMD. Há duas unidades frontend (3.4.3), e o `mf-1` gera um bundle `format: "umd"` (mf-1/vite.mf.ts:38) que o shell consome em runtime (3.4.5 #1). O "similar to Module Federation" no fim da mesma frase só compara. Não diz que o projeto usa essa tecnologia, e a frase seguinte nega que use (afirmação 3). A conclusão (README.md:138) repete a ideia: "a clean, maintainable solution for microfrontend development [...] offering the benefits of component sharing".

**2. README.md:7-8.** A seção "Live deployment" lista um endereço na Vercel para cada aplicação, o que indica publicações separadas. O snapshot não tem `vercel.json`, workflow ou outra configuração de hospedagem, e a 3.4.6 registrou Deploy `não observado` nas duas. Os `.gitignore` só ignoram `.vercel`, como a 3.4.6 anotou.

**3. README.md:12.** "UMD-based Microfrontends" repete a afirmação 1. O que esta linha acrescenta é a negação "not Module Federation". A revisão de dependências não encontrou nenhuma tecnologia de integração (3.4.2), e a relação usa mecanismo `script`, sem runtime de federação (3.4.5 #1). README.md:124 ("No complex module-federation configuration") e README.md:138 ("without the complexity of Module Federation") repetem a negação.

**4. README.md:14.** O shell é o host da única relação, `shell → mf-1` (3.4.5 #1). Os três componentes que ele consome vêm do bundle do `mf-1` (shell/src/components/RemoteHeader.tsx:18-22; shell/src/components/RemoteFulfilment.tsx:29-33; shell/src/components/RemoteFulfilmentDetails.tsx:29-33).

**5. README.md:15.** O `mf-1` importa `Header` e `Fulfilment` estaticamente nas próprias páginas (mf-1/src/pages/index.tsx:3-4), o que a 3.4.4 deixou nas Notas como uso interno. A mesma pasta `RemoteModules` é a entrada do bundle (mf-1/src/RemoteModules/RemoteModules.ts:10; mf-1/vite.mf.ts:33). O README fala em "UMD bundles", no plural, mas o build gera um só, `bundle.js` (mf-1/vite.mf.ts:37), com os três componentes. README.md:17 ("Dual Usage"), README.md:54 e README.md:126 ("Component Reusability") repetem a afirmação. Os componentes expostos passam por `withProviders` (mf-1/src/RemoteModules/RemoteModules.ts:6-8), e as páginas do `mf-1` importam os componentes sem esse wrapper. É detalhe interno.

**6. README.md:16.** O carregamento é pelo `<script>` que o hook `useRemoteModule` cria e acrescenta ao `head` (shell/src/hooks/useRemoteModule.ts:79-80, 99), registrado como `script-loading` na 3.4.4. README.md:73 ("Dynamic script tag injection loads the UMD bundle") repete a afirmação.

**7. README.md:24.** O `mf-1` tem entrada e build próprios (3.4.3) e sobe sozinho na porta 3001 (mf-1/package.json:7), usando os componentes localmente (mf-1/src/pages/index.tsx:3-4). README.md:99 ("**MF1 Standalone**: http://localhost:3001") repete a afirmação.

**8. README.md:26.** O script `build:vite` roda `vite build --config vite.mf.ts` (mf-1/package.json:11), e o `build` o executa antes do `next build` (mf-1/package.json:8). A entrada é `src/RemoteModules/RemoteModules.ts` e o formato é `umd` (mf-1/vite.mf.ts:33, 38). A afirmação 5 diz que o `mf-1` expõe um bundle UMD. Esta nomeia o mecanismo de build, o Vite, e por isso é outra linha.

**9. README.md:58.** O hook é um só, `useRemoteModule`, e o shell o chama nos três componentes que embrulham os remotos (3.4.4). Por isso o README o chama de "reusable".

**10. README.md:74.** O build define `name: "MF1_RemoteModules"` (mf-1/vite.mf.ts:39), e o hook lê `window[moduleName][componentName]` (shell/src/hooks/useRemoteModule.ts:23-24) com `moduleName: "MF1_RemoteModules"` (shell/src/components/RemoteHeader.tsx:20). A tipagem global do shell declara `Window.MF1_RemoteModules` (shell/src/types/mf1-remote-components.d.ts:25-28).

**11. README.md:75-76.** O hook devolve o componente lido da global, e o shell o renderiza como JSX comum com props e callbacks (shell/src/components/RemoteHeader.tsx:37; 3.4.4, runtime-composition: 3). A 3.4.5 #1 registrou que o destino entra como módulo de componentes na árvore do shell, sem API `mount`/`render`. O shell expõe `window.React` antes de carregar o bundle (shell/src/hooks/useRemoteModule.ts:36-37), e é isso que deixa os componentes remotos usarem a mesma instância de React (afirmação 23).

**12. README.md:86.** A afirmação está no comentário do comando `npm run dev`. O `dev` do `mf-1` roda em paralelo o `next dev -p 3001` e o `vite build --config vite.mf.ts --watch` (mf-1/package.json:6-7, 12). O bundle remoto é refeito a cada mudança enquanto a aplicação roda.

**13. README.md:100.** O bundle sai em `public/remote-modules/bundle.js` (mf-1/vite.mf.ts:28, 37) e é servido pelo próprio servidor Next do `mf-1`, na porta 3001 em desenvolvimento (mf-1/package.json:7). A 3.4.6 #1 registrou o mesmo em "Onde é servida". O comentário de mf-1/vite.mf.ts:28 diz o mesmo ("Aprovechamos la carpeta /public de Next.js para servir nuestro bundle.js") e acrescenta a possibilidade da afirmação 22. O snapshot versiona o arquivo gerado (mf-1/public/remote-modules/bundle.js:1).

**14. README.md:104.** O shell obtém o `router` com `useRouter` e o passa como prop ao `Header` remoto (shell/src/components/RemoteHeader.tsx:12, 37). O `Header` recebe o `router` por props e o usa para navegar e destacar o link atual (mf-1/src/RemoteModules/Header.tsx:51, 83-85, 90-92, 104-106). A justificativa ("Since `useRouter` doesn't work in remote components") não é verificável no snapshot, mas é coerente com ele: o `Header` não chama `useRouter`. A 3.4.4 deixou essa passagem de props como contrato entre as unidades, sem canal de comunicação.

**15. README.md:114-117.** O cache de scripts é o `scriptCache` e a verificação de `<script>` já presente no `head` (shell/src/hooks/useRemoteModule.ts:11-12, 54-75), com o comentário "Cache global para evitar cargas duplicadas" (:11). A "memoization" é o `componentCache` por `moduleName.componentName` (:13, 28-33, 46-52), não `React.memo`. O tratamento de erro grava a mensagem quando o script falha ou o componente não aparece (:63, 89, 94-97), e os wrappers mostram um texto no lugar do componente (shell/src/components/RemoteHeader.tsx:24-31). README.md:128 ("Efficient caching") repete o cache.

**16. README.md:124.** "No complex module-federation configuration" repete a afirmação 3. A segunda frase, de que o shell "only needs a `<script>` tag", os artefatos desmentem. Além do `<script>` (shell/src/hooks/useRemoteModule.ts:79), o shell precisa expor `window.React` e `window.ReactDOM` (shell/src/hooks/useRemoteModule.ts:36-37), porque o bundle trata os dois como externos e os espera como globais (mf-1/vite.mf.ts:35, 42-45). Precisa também da URL base do remote em `publicRuntimeConfig` (shell/next.config.js:7-9) e de um hook que espera o carregamento e lê o componente da global. A parte confirmada é que o shell não tem configuração de Module Federation.

**17. README.md:125.** Cada aplicação tem `package.json`, `package-lock.json`, entrada e build próprios, sem workspace (3.4.3, Notas), e sobe com o seu `npm run dev` (mf-1/package.json:6; shell/package.json:6). O `mf-1` roda sozinho (afirmação 7). O shell também sobe sozinho, mas sem o `mf-1` no ar os wrappers caem no texto de erro (shell/src/components/RemoteHeader.tsx:26-29). Os comentários do build pedem coordenação entre as equipes no nome da global e na versão do React (mf-1/vite.mf.ts:35, 39), o que limita a independência no contrato, mas não no desenvolvimento.

**18. README.md:127.** As interfaces `HeaderProps`, `FulfilmentProps`, `FulfilmentDetailsProps` e `MF1_RemoteComponents` existem nas duas unidades, mas em dois arquivos separados e idênticos (mf-1/src/types/remote-components.d.ts:3-29; shell/src/types/mf1-remote-components.d.ts:3-29). Cada unidade usa a sua cópia (mf-1/src/RemoteModules/Header.tsx:2; shell/src/components/RemoteHeader.tsx:4). Nenhum pacote, alias ou caminho comum liga as duas. As unidades usam as mesmas definições, mas copiadas, e isso contradiz o "shared". A parte confirmada é que os dois lados declaram o mesmo contrato de props. "Full type safety" não é afirmação arquitetural (ver a Leitura).

**19. README.md:132.** O nome da global vem de `name: "MF1_RemoteModules"`, e o comentário diz que ele "DEBE SER UN NOMBRE UNICO. ESTO SE DEBE COORDINAR ENTRE EQUIPOS PARA NO PISARSE" (mf-1/vite.mf.ts:39). O shell procura o componente nesse nome em `window` (shell/src/hooks/useRemoteModule.ts:23). O snapshot tem um só remote, então não há colisão que verificar. A afirmação é um requisito do mecanismo, e o código o confirma.

**20. README.md:133.** O bundle deixa `react` e `react-dom` fora (mf-1/vite.mf.ts:35, 42-45). As duas aplicações declaram as mesmas versões, `react` e `react-dom` `19.1.0` (mf-1/package.json:17-18; shell/package.json:13-14), e mais nada as sincroniza. A afirmação 23 diz o mesmo de forma mais específica.

**21. README.md:134.** O bundle só é pedido no navegador, dentro de `useEffect` (shell/src/hooks/useRemoteModule.ts:20, 79-99). O build do shell não inclui código do `mf-1` (3.4.6 #2), e o destino está fora do build do host (3.4.5 #1). Como o carregamento depende de `window` e `document`, os componentes remotos não são renderizados no servidor, o que confere com "SSR is not compatible". Os wrappers mostram "Loading..." até o script carregar (shell/src/components/RemoteHeader.tsx:24). README.md:128 ("lazy loading") vai no mesmo sentido: o script só é pedido quando o primeiro wrapper monta.

**22. mf-1/vite.mf.ts:28.** O comentário diz que o bundle é servido pela pasta `public` do Next e que poderia ser publicado em outro lugar. A primeira parte repete a afirmação 13. A possibilidade tem apoio parcial: o shell lê a URL base de `MF1_BASE_URL`, configurável por variável de ambiente (shell/next.config.js:8), e acrescenta só o caminho fixo `/remote-modules/bundle.js` (shell/src/components/RemoteHeader.tsx:19). Nenhum artefato publica o bundle fora do `mf-1` (3.4.6 #1).

**23. mf-1/vite.mf.ts:35.** O shell fornece React e ReactDOM ao bundle expondo os seus módulos em `window` (shell/src/hooks/useRemoteModule.ts:2-3, 36-37, com o comentário "Paso 1: Preparar React globalmente" em :35), e o bundle os lê como `React` e `ReactDOM` (mf-1/vite.mf.ts:42-45). As versões coincidem nos dois `package.json` (afirmação 20). O resto do comentário ("Tambien se podria incluir react en nuestro bundle.js pero no es lo mejor") é alternativa não adotada.

## Resumo

Afirmações: 23 (corroborada: 19, parcial: 1, contradita: 2, sem corroboração: 1). Temas: (estrutura: 4, composição: 12, build-deploy: 5, independência: 2).
