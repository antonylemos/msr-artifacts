---
schema: 1
id: 1137873652
full_name: rgonzalez-dev/portfolio-system-ux-angular
url: https://github.com/rgonzalez-dev/portfolio-system-ux-angular
commit: 7499ea45debd958e3de52db4f8672741a8e01352
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 012 — rgonzalez-dev/portfolio-system-ux-angular

## Contexto

- **Tipo de repositório:** example/proof of concept (sistema de portfólio com dados de demonstração)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:38-39`: `@angular-architects/module-federation` e `@angular-architects/module-federation-tools` ^20 declarados | fraca |
| Configuração | `angular.json:17` builder `@angular/build:application` (esbuild), `:19` um único entry `src/main.ts`; nenhum `webpack.config.js`, nenhum `withModuleFederationPlugin`, `remotes` ou `exposes` | contrária |
| Código-fonte | Nenhuma ocorrência de `loadRemoteModule`, `remoteEntry` ou federation em `src/` | ausente |
| Código-fonte | `src/app/app.routes.ts:4-58`: todas as rotas usam `loadComponent` com `import()` local (`./shell/features/...`, `./protected-features/...`), ou seja, lazy loading comum dentro da mesma app | contrária |
| Estrutura | Uma única app Angular; as pastas `src/app/shell/` e `src/app/protected-features/` são organização interna, não unidades com entry ou build próprio | contrária |
| Documentação | `ARCHITECTURE_OPTION4.md:1-7` "Enhanced Lazy Loading + Module Federation… Foundation for future micro frontend (MFE) separation"; `:199-220` plano em fases ("Phase 2: Polyrepo…", "Phase 3: Full Module Federation Setup"); `:284-296` "Module Federation (Future)"; `PHASE1_IMPLEMENTATION.md:5,248` "MFE-ready structure… Next: Phase 2 - Polyrepo migration with Module Federation" (intenção futura) | fraca |
| Histórico | `81513c4` "refactoring to support MFE in the future"; `7499ea4` "refactoring project structure for MFE support v2" (intenção) | moderada |
| Build/deploy | Um único build; sem CI/CD | contrária |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`angular.json:19`); nenhuma config de composição referencia unidades externas |
| Q2 | No | `shell/` e `protected-features/` compartilham entry, build e deploy e são importados diretamente (`app.routes.ts:11-54`) |
| Q3 | No | O "shell" é uma pasta interna, não um host que carrega unidades |
| Q4 | No | A dependência MF está declarada (`package.json:38-39`), mas sem configuração nem uso; pelo critério operacional, "a declared dependency alone is No" |
| Q5 | No | Q1–Q4 convergem; a documentação descreve uma migração futura, não o estado atual |

## Motivo

- O repositório é um monolito Angular com lazy loading por rota, organizado em pastas que antecipam uma futura separação em MFEs.
- Corresponde a dois casos Non-MFE: "MFE-related dependencies that are unused or experimental" (`package.json:38-39`, sem uso) e "repositories mentioning micro-frontends without implementing them" (`ARCHITECTURE_OPTION4.md`, `PHASE1_IMPLEMENTATION.md`).
- Pelo protocolo (seção 3.4.7, revisão de documentação), uma documentação contradita pelos artefatos de implementação não basta como evidência. Aqui a própria documentação admite que o MF é "Future".

## Notas para análise

- **RQ1 (sinais enganosos):** este caso junta dependência de MF, pasta chamada `shell`, documentos de arquitetura com "Module Federation" no título e commits "MFE support". Todos os sinais de superfície apontam para MFE, mas a implementação é um monolito.
- **RQ1 (histórico):** os commits mostram uma preparação para MFE (fase 1 de uma migração planejada), não uma adoção.
