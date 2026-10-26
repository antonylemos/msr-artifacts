---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Leitura do repositório

A documentação é o README da raiz, em inglês. Ele apresenta o projeto como prova de conceito de micro-frontends com Module Federation em Vite, React e TypeScript (README.md:1-5), descreve as três aplicações e o papel de cada uma (README.md:9-25), lista a tecnologia (README.md:27-33) e os conceitos que a POC quer validar (README.md:37-45), e termina com o roteiro de execução local (README.md:49-82). Os READMEs de `shell/`, `mfe-counter/` e `mfe-weather/` são o mesmo arquivo, o template "React + TypeScript + Vite" do Vite (shell/README.md:1-3; o conteúdo dos três é idêntico), sem afirmação sobre o projeto.

O README confere com as revisões anteriores em tudo o que diz da estrutura e da composição: três aplicações com manifesto e build próprios (revisão de estrutura), um shell que carrega dois remotes por `@originjs/vite-plugin-federation` e os renderiza no mesmo dashboard (revisões de código-fonte e de composição), e remotes que também rodam sozinhos (mfe-weather/src/main.tsx:4-6; mfe-counter/src/main.tsx:4-6). A única afirmação sem artefato é o deploy independente (README.md:24, 43): o snapshot não tem configuração de deploy, e a revisão de build e deploy registrou `não observado` para as três aplicações.

O `artifacts.csv` lista como `documentation` só os quatro READMEs citados acima. O `matches.csv` tem 25 ocorrências `doc-*` (`doc-mfe-term`, `doc-integration-technology`, `doc-runtime-loading` e `doc-independence`), todas no README.md da raiz, em 21 linhas distintas. Estão na tabela as de README.md:3 (afirmação 1), 5 (2), 11 (3), 14 (4), 16 (5), 19 e 20 (6), 22 (7, 8 e 9), 24 (7 e 8), 25 (9) e 32 (10). As de README.md:41, 42 e 43 repetem afirmações já registradas e estão nos parágrafos das afirmações 4, 2 e 2 e 8, respectivamente. As de README.md:1, 39, 56, 59, 65, 67 e 71 são título, propósito e instruções de execução, citadas na lista abaixo.

Ficaram fora da tabela:
- o título "Microfrontend Dashboard — Module Federation + Vite" (README.md:1) e o título do card do shell e o seu subtítulo "Module Federation • Vite • React" (shell/src/App.tsx:10-12), que repetem o que a afirmação 1 já diz;
- a lista "Vite", "React", "TypeScript" do Tech Stack (README.md:29-31), tecnologia das unidades, já coberta pela afirmação 1;
- "This project is **not focused on the final product**" (README.md:39), sobre o propósito, não sobre a arquitetura;
- o roteiro de execução (README.md:51-82). O bloco de código aberto em README.md:55 não é fechado, e os subtítulos "Build and preview the Microfrontends", "Run the Shell (Host)" e "Finally" (README.md:65, 75, 80) ficam dentro dele. São comandos e instruções: `npm install` em cada projeto, `npm run build` e `npm run preview` em weather e depois em counter, `npm run dev` no shell e o endereço `http://localhost:5175` (README.md:56-82). Essa ordem é a que faz os previews dos remotes ocuparem as portas 4173 e 4174 que o shell espera (shell/vite.config.ts:16-17), como as revisões de composição e de build e deploy registraram.

Foram lidos os artefatos que as revisões anteriores citam: os três `vite.config.ts` e `package.json`, `shell/index.html`, `shell/src/App.tsx`, `shell/src/main.tsx`, `shell/src/vite-env.d.ts`, os `main.tsx`, `bootstrap.tsx` e widgets dos dois remotes, e o `.gitignore` da raiz. Nenhum tem comentário, e nenhum `package.json` tem `description`.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "demonstrate the usage of **Microfrontends with Module Federation** using **Vite, React and TypeScript**" | estrutura | corroborada | 3.4.3 (mfe-counter, mfe-weather e shell `Yes`); 3.4.2 (module-federation configurado nas três); 3.4.5 #1, #2 |
| 2 | README.md:5 | "focusing on **application decoupling**, **independent builds**, and **runtime loading of remote front-end applications**" | independência | corroborada | 3.4.3; 3.4.6 #1, #2, #3 (`separado`); 3.4.4 (shell/src/App.tsx:3-4, `dynamic-loading`); 3.4.5 #1, #2 |
| 3 | README.md:11 | "The application is composed of three independent front-end applications" | estrutura | corroborada | 3.4.3 (Resumo: 3 aplicações) |
| 4 | README.md:13-14 | "**Shell (Host)** Responsible for layout, orchestration and dynamically loading the microfrontends." | estrutura | corroborada | 3.4.5 #1, #2; shell/src/App.tsx:3-4, 16-28 |
| 5 | README.md:16-17 | "**Weather Microfrontend** A standalone widget exposed remotely and loaded by the Shell." | estrutura | corroborada | 3.4.3 (mfe-weather `Yes`); 3.4.5 #1; mfe-weather/vite.config.ts:15-18; mfe-weather/src/main.tsx:4-6 |
| 6 | README.md:19-20 | "**Counter Microfrontend** Another standalone widget, independently built and consumed by the Shell." | estrutura | corroborada | 3.4.3 (mfe-counter `Yes`); 3.4.6 #1 (`separado`); 3.4.5 #2; mfe-counter/src/main.tsx:4-6 |
| 7 | README.md:22, 24 | "Each microfrontend: […] Can be developed […] independently" | independência | corroborada | 3.4.3; mfe-weather/package.json:6-11; mfe-counter/package.json:6-11; mfe-weather/src/main.tsx:4-6; mfe-counter/src/main.tsx:4-6 |
| 8 | README.md:22, 24 | "Each microfrontend: […] Can be […] deployed independently" | build-deploy | sem corroboração | — |
| 9 | README.md:22, 25 | "Each microfrontend: […] Is loaded at runtime via Module Federation" | composição | corroborada | 3.4.4 (shell/src/App.tsx:3-4, `dynamic-loading`); 3.4.5 #1, #2 |
| 10 | README.md:32-33 | "**Module Federation** (`@originjs/vite-plugin-federation`)" | composição | corroborada | 3.4.2 (mfe-counter/package.json:13, mfe-weather/package.json:13, shell/package.json:13); 3.4.5 #1, #2 |
| 11 | README.md:45 | "Integration of multiple applications in a single UI" | composição | corroborada | 3.4.4 (shell/src/App.tsx:19, 25, `runtime-composition`); shell/src/App.tsx:16-28 |

## Observações

**1. README.md:3.** O projeto tem três unidades frontend React com Vite e TypeScript (`.tsx` e `tsc -b` no build; shell/package.json:8), ligadas por Module Federation: os remotes expõem `./Widget` e o shell os consome (mfe-weather/vite.config.ts:14-20; mfe-counter/vite.config.ts:14-20; shell/vite.config.ts:14-20). O título (README.md:1) e o subtítulo do dashboard (shell/src/App.tsx:12) repetem a mesma ideia.

**2. README.md:5.** A frase dá o foco da POC, e os três pontos se confirmam: cada aplicação tem manifesto, lockfile e configuração próprios, sem workspace nem código importado de outra unidade fora da federação, e só `react` e `react-dom` são compartilhados em runtime (shell/vite.config.ts:19); os três builds são separados (3.4.6); e os remotes são carregados em runtime por `React.lazy` (shell/src/App.tsx:3-4). A lista de conceitos da seção "Purpose" repete os três pontos: "Runtime loading of remote applications" (README.md:42), a parte "Independent builds" de README.md:43 e "Front-end decoupling by responsibility" (README.md:44), que também retoma a divisão de papéis das afirmações 4 a 6. "Has its own build process" (README.md:23) repete os builds independentes. Os remotes não se comunicam entre si nem com o shell, além de serem renderizados por ele (revisão de código-fonte, Notas).

**3. README.md:11.** São três aplicações na raiz, `shell`, `mfe-weather` e `mfe-counter`, cada uma com `package.json`, `index.html` e `vite.config.ts` próprios, e nenhuma declaração de workspace (revisão de estrutura).

**4. README.md:13-14.** O shell é o host das duas relações de Module Federation, carrega `weather/Widget` e `counter/Widget` por `React.lazy` e monta o layout em cards, com `Suspense` e esqueleto de carregamento (shell/src/App.tsx:3-4, 16-28). "Microfrontend architecture using a Shell (Host)" (README.md:41) repete a afirmação.

**5. README.md:16-17.** O remote `weather` expõe `./Widget` a partir de `./src/bootstrap` (mfe-weather/vite.config.ts:15-18), que reexporta o `WeatherWidget`; o mesmo widget é montado sozinho pela entrada própria da unidade (mfe-weather/src/main.tsx:4-6). O widget é um componente estático, com temperatura e cidade fixas no código (mfe-weather/src/WeatherWidget.tsx:4-5).

**6. README.md:19-20.** O remote `counter` tem build próprio (mfe-counter/package.json:8; mfe-counter/vite.config.ts:14-18), roda sozinho pela sua entrada (mfe-counter/src/main.tsx:4-6) e é renderizado no card "Counter" do shell (shell/src/App.tsx:23-27).

**7. README.md:22, 24.** O sujeito são os micro-frontends, isto é, os dois remotes. Cada um tem manifesto, lockfile e scripts `dev`, `build` e `preview` próprios, e uma entrada que monta o widget sem o shell; nada no snapshot obriga a desenvolvê-los juntos. A afirmação foi separada da 8 porque o desenvolvimento independente tem artefato e o deploy não.

**8. README.md:22, 24.** O snapshot não tem Dockerfile, CI nem configuração de hospedagem, e a revisão de build e deploy registrou `não observado` para as três aplicações; o único jeito de servir os remotes é o `vite preview` local (mfe-weather/package.json:10; mfe-counter/package.json:10). As URLs fixas em `localhost` no shell (shell/vite.config.ts:16-17) não desmentem a afirmação, porque um remote pode ser republicado no mesmo endereço sem reconstruir o shell, mas também não a sustentam. A parte "deployments" de "Independent builds and deployments" (README.md:43) repete esta afirmação.

**9. README.md:22, 25.** Os dois remotes são carregados pelo shell em runtime, pelos `remoteEntry.js` declarados em shell/vite.config.ts:15-18, com `import()` dinâmico dentro de `React.lazy` (shell/src/App.tsx:3-4). A revisão de composição registrou as duas relações como `module-federation`, ativas.

**10. README.md:32-33.** O plugin nomeado é o mesmo que a revisão de dependências registrou nas três unidades, `@originjs/vite-plugin-federation` `^1.4.1`, configurado em cada `vite.config.ts` (mfe-counter/vite.config.ts:3; mfe-weather/vite.config.ts:3; shell/vite.config.ts:3).

**11. README.md:45.** As duas aplicações remotas aparecem numa só página do shell, em dois cards do mesmo grid (shell/src/App.tsx:16-28).

## Resumo

Afirmações: 11 (corroborada: 10, parcial: 0, contradita: 0, sem corroboração: 1). Temas: (estrutura: 5, composição: 3, build-deploy: 1, independência: 2).
