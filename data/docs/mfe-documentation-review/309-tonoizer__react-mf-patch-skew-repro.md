---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
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

# 309 — tonoizer/react-mf-patch-skew-repro

## Leitura do repositório

A única documentação é o README.md, em inglês, o único artefato `documentation` do `artifacts.csv`. Ele apresenta o repositório como reprodução mínima de um defeito do `@module-federation/vite` 1.21.6 (README.md:1-3). Quatro apps Vite federadas compartilham a família React como singleton, mas cada uma fixa um patch de React 19.2.x, e o build de produção quebra. O README traz:
- uma tabela com o papel de cada app (README.md:9-14);
- a configuração de `shared` comum (README.md:16-24);
- os comandos para reconstruir e servir as quatro apps e rodar o roteiro Playwright (README.md:33-45);
- os resultados esperados (README.md:48-52), a lista de evidências versionadas (README.md:56-61) e duas notas (README.md:65-66).

A arquitetura descrita confere com as revisões anteriores:
- quatro unidades React/Vite num workspace pnpm (3.4.3);
- um host de topo com dois remotes, e remote_a como host aninhado de remote_c (3.4.5 #1-#3);
- builds separados, só com execução local (3.4.6).

A única divergência está na afirmação 2: o README diz que cada app instala um patch diferente, mas host e remote_c fixam a mesma versão. As consequências de runtime que o README afirma (quebra na carga natural, erro #527 forçado) só têm como artefato as saídas versionadas em `evidence/`, gravadas por uma execução local (README.md:54). A revisão de composição já as usava como contexto (3.4.5, Leitura).

Ocorrências `doc-*`: as duas (README.md:11 e :12, `doc-host-remote`) são as afirmações 3 e 4.

Trechos do README que não viraram linha:
- **Título:** README.md:1. O nome da tecnologia e a versão estão na afirmação 9, e a quebra na afirmação 1.
- **Comportamento interno do plugin:** README.md:5 trata dos templates `__prebuild__`/`loadShare` gerados pelo `@module-federation/vite` e de como imports compartilhados irmãos se resolvem. É detalhe do plugin, não das unidades. O trecho só se apoia em evidence/eager-prebuild-snippet.txt:1-15 e evidence/eager-static-import-proof.txt:1-24.
- **Requisitos de instalação:** README.md:28-29.
- **Bloco de comandos:** README.md:33-45. Ele constrói remote_c, remote_b, remote_a e host nessa ordem e sobe quatro `vite preview` nas portas 5000-5003, como `build:all` e `preview:*` (package.json:7-11; 3.4.6).
- **Evidências:** a saída em `evidence/` e a lista dos arquivos versionados (README.md:54, 56-61).
- **Nota de build:** README.md:66 trata de `minify: false`, que só mantém as pilhas legíveis. Confere com host/vite.config.js:38 e não muda a composição.

Comentários e campos descritivos lidos nos artefatos citados pelas revisões anteriores:
- os quatro `package.json` e o da raiz não têm `description`;
- os `vite.config.js` não têm comentários;
- host/src/App.jsx tem só dois comentários de depuração, "Also try FederationInstance / runtime globals" e "expose for playwright" (host/src/App.jsx:41, 45);
- scripts/capture.mjs tem só "search ms-playwright cache" (scripts/capture.mjs:22).

Os textos exibidos pelas apps repetem afirmações do README e foram citados nos parágrafos delas: host/src/App.jsx:66, remote_a/src/App.jsx:9, remote_b/src/App.jsx:7 e remote_c/src/App.jsx:7. O `<title>` de host/index.html:5 é só um título.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "production builds of federated Vite apps crash when the React family is shared as singletons with `requiredVersion: '^19.2.4'` […] because a container's local `react-dom` fallback is evaluated eagerly against the **shared** `react` provider" | composição | corroborada | 3.4.2 (quatro linhas `@module-federation/vite`); 3.4.5 (Leitura); host/vite.config.js:5-11; evidence/RESULT.json:5-15; evidence/eager-static-import-proof.txt:10-13 |
| 2 | README.md:3 | "each app installs a **different React 19.2.x patch**" | composição | contradita | host/package.json:11-12; remote_a/package.json:11-12; remote_b/package.json:11-12; remote_c/package.json:11-12; pnpm-lock.yaml:780-788 |
| 3 | README.md:11 | "\| `host` \| 19.2.8 \| remotes: `remote_a`, `remote_b` \|" | composição | corroborada | 3.4.5 #1, #2; host/vite.config.js:21-32; host/package.json:11-12 |
| 4 | README.md:12 | "\| `remote_a` \| 19.2.4 \| exposes `./App`; also remotes `remote_c` (nested host) \|" | composição | corroborada | 3.4.5 #1, #3; remote_a/vite.config.js:22-31; remote_a/package.json:11-12 |
| 5 | README.md:13 | "\| `remote_b` \| 19.2.6 \| exposes `./App` (remote-only) \|" | composição | corroborada | 3.4.5 #2; remote_b/vite.config.js:19-28; remote_b/package.json:11-12 |
| 6 | README.md:14 | "\| `remote_c` \| 19.2.8 \| exposes `./App` (nested under `remote_a`) \|" | composição | corroborada | 3.4.5 #3; remote_c/vite.config.js:19-28; remote_c/package.json:11-12 |
| 7 | README.md:16-22 | "Shared (`singleton: true`, `strictVersion: false`, `requiredVersion: '^19.2.4'`, `shareStrategy: 'version-first'`): `react` […] `react/jsx-runtime` […] `react/jsx-dev-runtime` […] `react/compiler-runtime` […] `react-dom/client`" | composição | parcial | host/vite.config.js:5-11, 33-34; remote_a/vite.config.js:5-11, 32-33; remote_b/vite.config.js:5-11, 25-26; remote_c/vite.config.js:5-11, 25-26; host/src/main.jsx:1-2; remote_a/src/main.jsx:1-2; evidence/eager-static-import-proof.txt:3-5, 20-22 |
| 8 | README.md:24 | "`hostInitInjectLocation: 'entry'` on all apps." | composição | corroborada | host/vite.config.js:35; remote_a/vite.config.js:34; remote_b/vite.config.js:27; remote_c/vite.config.js:27 |
| 9 | README.md:24 | "Vite 6.3.x + `@module-federation/vite@1.21.6` (+ runtime 2.9.0)." | composição | corroborada | 3.4.2 (quatro linhas `@module-federation/vite` 1.21.6); host/package.json:15-17; pnpm-lock.yaml:1129-1134 |

## Observações

**1. README.md:3.** A frase descreve o arranjo e a falha que ele provoca. O arranjo se confirma nas configurações:
- as quatro apps usam o plugin de federação no build (3.4.2);
- todas declaram a família React como singleton com `requiredVersion: '^19.2.4'` (host/vite.config.js:5-11, e o mesmo bloco nas linhas 5-11 dos outros três `vite.config.js`).

A falha não tem outro artefato além das saídas versionadas de uma execução. Na carga natural, o host fica em branco com `Cannot read properties of null (reading 'useState')`. Forçando o `loadShare` de `react-dom/client` de remote_a e de remote_b sob o escopo do host, aparece o erro #527 com 19.2.8 contra 19.2.4 e 19.2.6 (evidence/RESULT.json:5-15; evidence/force-527.json; evidence/force-527-remote_b.json). A causa apontada aparece no build gravado de remote_a: o `loadShare` de `react-dom/client` importa estaticamente o `loadShare` do `react` compartilhado (evidence/eager-static-import-proof.txt:10-13). O nome do arquivo de evidência já descreve isso como "static import of shared react + inlined local react-dom".

Na carga natural, porém, a pilha registrada mostra o App do host renderizado pelo `react-dom/client` de remote_c (evidence/RESULT.json:12), e remote_c tem o mesmo patch do host. A quebra natural, portanto, não vem de uma diferença de patch entre os dois. Isso fica como contexto e não muda a corroboração do mecanismo geral.

Repetições:
- os resultados esperados (README.md:50-52);
- o resumo da evidência (evidence/RESULT.json:3), que não é documento.

**2. README.md:3.** As quatro apps fixam o próprio par `react`/`react-dom` (host/package.json:11-12; remote_a/package.json:11-12; remote_b/package.json:11-12; remote_c/package.json:11-12). Essa parte se confirma. "Different", porém, não vale para todas: host e remote_c fixam 19.2.8. O lockfile resolve só três versões de `react`: 19.2.4, 19.2.6 e 19.2.8 (pnpm-lock.yaml:780-788). A tabela do próprio README mostra as duas apps com 19.2.8 (README.md:11, 14), e evidence/RESULT.json:52-55 registra o mesmo. Pelo passo 3, a parte desmentida torna a afirmação `contradita`. A diferença de patch que importa para o experimento é a de remote_a e remote_b em relação ao host (afirmação 1).

Repetição: README.md:65, "Each app pins its own `react` / `react-dom` patch in `package.json` so pnpm installs distinct versions per package". Ela tem a mesma ressalva: dois pacotes recebem a mesma versão.

**3. README.md:11.** O host declara dois remotes, `remote_a` em `localhost:5001` e `remote_b` em `localhost:5002` (host/vite.config.js:21-32), e os carrega por `lazy(import(...))` (3.4.5 #1, #2). A versão 19.2.8 confere com host/package.json:11-12. O host não expõe módulos, como a tabela dá a entender ao listar só "remotes".

**4. README.md:12.** remote_a expõe `./App` (remote_a/vite.config.js:22-24) e declara `remote_c` como remote (remote_a/vite.config.js:25-31). O módulo exposto é o mesmo `App` que monta remote_c (3.4.5 #3), o que sustenta "nested host". A versão 19.2.4 confere com remote_a/package.json:11-12.

Repetição: o texto exibido por remote_a, "Nested host mounting remote_c" (remote_a/src/App.jsx:9).

**5. README.md:13.** remote_b expõe `./App` e não tem `remotes` (remote_b/vite.config.js:19-28), o que confirma "remote-only". A versão 19.2.6 confere com remote_b/package.json:11-12.

Repetição: o texto "remote-only" exibido pela app (remote_b/src/App.jsx:7).

**6. README.md:14.** remote_c só expõe `./App` (remote_c/vite.config.js:19-28) e é carregado por remote_a, não pelo host (3.4.5 #3). Isso confirma "nested under `remote_a`". A versão 19.2.8 confere com remote_c/package.json:11-12.

Repetição: "remote-only nested under remote_a" (remote_c/src/App.jsx:7).

**7. README.md:16-22.** As opções e a lista de cinco entradas são idênticas nas quatro configurações, com `shareStrategy: 'version-first'` em todas (host/vite.config.js:5-11, 34; remote_a/vite.config.js:33; remote_b/vite.config.js:26; remote_c/vite.config.js:26). Pela regra do passo 3, uma biblioteca compartilhada é corroborada quando ao menos duas unidades a usam. Três entradas cumprem a regra:
- `react` é importado pelos quatro `App.jsx` (ex.: host/src/App.jsx:1; remote_a/src/App.jsx:1);
- `react-dom/client` é importado pelos quatro `main.jsx` (host/src/main.jsx:2; remote_a/src/main.jsx:2);
- `react/jsx-runtime` aparece como `loadShare` nos builds gravados de remote_a e remote_b (evidence/eager-static-import-proof.txt:3, 20).

Nenhum arquivo do snapshot importa `react/jsx-dev-runtime` ou `react/compiler-runtime`. Os dois só aparecem nas configurações e no registro do escopo (evidence/share-owners.json:56), ou seja, estão disponíveis, o que não basta. Daí `parcial`.

Repetição: o texto do host, "Mounting remotes with shared React singletons (^19.2.4, version-first)" (host/src/App.jsx:66).

**8. README.md:24.** As quatro apps passam `hostInitInjectLocation: 'entry'` ao plugin, inclusive os remotos puros (host/vite.config.js:35; remote_a/vite.config.js:34; remote_b/vite.config.js:27; remote_c/vite.config.js:27). evidence/RESULT.json:62 registra o mesmo.

**9. README.md:24.** As quatro apps fixam `@module-federation/vite` 1.21.6 e `vite` 6.3.5 (ex.: host/package.json:15-17; 3.4.2). O runtime 2.9.0 é dependência do plugin no lockfile (pnpm-lock.yaml:1129-1134). Repetição: o título (README.md:1) também nomeia o plugin e a versão.

## Resumo

Afirmações: 9 (corroborada: 7, parcial: 1, contradita: 1, sem corroboração: 0). Temas: (composição: 9).

