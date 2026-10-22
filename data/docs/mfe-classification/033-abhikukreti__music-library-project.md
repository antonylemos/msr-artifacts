---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
url: https://github.com/abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 033 — abhikukreti/music-library-project

## Contexto

- **Abordagem de implementação:** Module Federation (`@originjs/vite-plugin-federation`, Vite)
- **Tipo de repositório:** example/proof of concept (app de demonstração com login mock; provável exercício/teste técnico)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `main-app/package.json` e `music-library/package.json`: `@originjs/vite-plugin-federation` | fraca |
| Estrutura | Duas apps: `main-app/` e `music-library/`, cada uma com `package.json`, `vite.config.js`, `index.html` e `src/main.jsx` próprios | forte |
| Configuração (host) | `main-app/vite.config.js:8-14`: `federation({ name: 'main_app', remotes: { music_library: 'https://astonishing-seahorse-d2decf.netlify.app/assets/remoteEntry.js' }, shared: [react, react-dom, @tanstack/react-query] })`; porta 5000 (`:21`) | forte |
| Configuração (remote) | `music-library/vite.config.js:8-15`: `name: 'music_library'`, `filename: 'remoteEntry.js'`, `exposes: { './MusicLibrary': './src/MusicLibrary.jsx' }`, mesmo `shared`; porta 5001 (`:22-23`) | forte |
| Código-fonte (composição) | `main-app/src/App.jsx:5`: `lazy(() => import('music_library/MusicLibrary'))`; `:21-23`: renderiza `<MusicLibrary isAdmin={isAdmin} />` em `Suspense` depois do login (`:10-12`) | forte |
| Código-fonte (contrato) | O host passa o papel do usuário (`isAdmin`) como prop ao remote; o remote exporta `MusicLibrary` (`music-library/src/MusicLibrary.jsx:104`) | moderada |
| Código-fonte | Nenhum import de código-fonte entre as duas apps (sustenta a independência das unidades) | ausente |
| Build/deploy | `README.md:6-8,29-35`: dois sites Netlify separados (main app e remote); `music-library/public/_headers:1-2`: CORS em `/assets/*` para o host em outro domínio | forte |
| Documentação | `README.md:3` "React app split into two parts (main app + music library) connected via Module Federation"; `:37-38` seção "Micro Frontend" | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `main-app` e `music-library` |
| Q2 | Yes | Entry, build e deploy próprios (dois sites Netlify); sem import de código-fonte entre as apps |
| Q3 | Yes | O host monta o remote após o login (`main-app/src/App.jsx:21-23`) |
| Q4 | Yes | `remotes`/`exposes` configurados e usados via `import('music_library/MusicLibrary')` (`App.jsx:5`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes" e a "examples… and proofs of concept that actually compose frontend units".
- O deploy independente é explícito: o host aponta para a URL pública do `remoteEntry.js` do remote em produção, com CORS configurado para a origem cruzada.

## Notas para análise

- **RQ3:** relação host → remote com contrato por props (`isAdmin`) derivadas da autenticação no host; autenticação centralizada no host, autorização aplicada no remote.
- **RQ1 (build/deploy):** URL de produção fixa no `remotes` do host (`vite.config.js:11`), sem separação dev/prod; o README pede `build` + `preview` do remote para o desenvolvimento local.
