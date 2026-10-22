---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Leitura do repositório

A documentação em prosa é mínima. O README da raiz tem o título, uma tabela de portas por pacote e os passos de build e preview (README.md:1-23). Os READMEs de cada pacote são templates do Rsbuild e do Rslib (ex.: packages/app-mf-1/README.md; packages/lib-app-interface/README.md). A descrição mais direta da arquitetura está na `description` do `package.json` da raiz: "a micro-frontend workspace architected by qiankun and module federation" (package.json:4).

Foram lidos os artefatos que as revisões anteriores citam:
- `package.json` e `pnpm-workspace.yaml`;
- as configurações Rsbuild, Rslib e de Module Federation;
- o host (`App.tsx`, `bootstrap.tsx`, `router.tsx`, `configs/apps.ts` e os carregadores em `app-loaders/`);
- os `index.tsx`, `bootstrap.tsx`, `App.tsx`, `exposed.tsx` e `lifecycles.tsx` dos remotes.

Comentários com conteúdo arquitetural:
- **Host:** o da configuração de Module Federation explica que os remotes são carregados pela API de runtime.
- **Sub-apps qiankun:** os de `lifecycles.tsx` reproduzem a documentação do qiankun sobre quando `bootstrap` e `mount` são chamados (packages/app-qiankun-1/src/lifecycles.tsx:8-13, 18-20). É texto da biblioteca, não afirmação sobre este projeto, e por isso não vira linha.
- **Configuração dos apps:** um comentário em `configs/apps.ts` diz que, "in a real-world scenario", as configurações viriam de uma API do backend (packages/host/src/configs/apps.ts:8). É hipótese, não descrição do snapshot.

O que a documentação diz confere com as revisões anteriores: um workspace com um host, dois remotes de Module Federation e dois sub-apps qiankun.

Ocorrências `doc-*` que não viraram linha: README.md:8 e 9, que são linhas da tabela de portas (detalhe de infraestrutura). README.md:1 está na afirmação 1.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:1 | "micro-frontend workspace" | estrutura | corroborada | 3.4.3 (cinco aplicações no workspace pnpm); pnpm-workspace.yaml:1-2 |
| 2 | package.json:4 | "a micro-frontend workspace architected by qiankun and module federation" (o workspace combina qiankun e Module Federation) | estrutura | corroborada | 3.4.2 (qiankun e module-federation configurados); 3.4.5 #1-#4 |
| 3 | packages/host/module-federation.config.ts:6-7 | "we use the runtime API to load our remotes / see `src/app-loaders/module-federation.ts`" (os remotes são carregados pela API de runtime) | composição | corroborada | 3.4.4; packages/host/module-federation.config.ts:5-10; packages/host/src/app-loaders/module-federation.ts:27, 34 |

## Observações

**1. README.md:1.** O workspace tem cinco aplicações e uma biblioteca em `packages/`, todas membros do workspace pnpm. O título não diz mais do que isso.

**2. package.json:4.** A descrição nomeia as duas tecnologias que a revisão de composição encontrou: duas relações `host → remote` por Module Federation (app-mf-1 e app-mf-2) e duas `root-config → application` por qiankun (app-qiankun-1 e app-qiankun-2), todas a partir do host. A declaração de uma composição híbrida confere.

**3. packages/host/module-federation.config.ts:6-7.** O bloco `remotes` da configuração está vazio, com as entradas estáticas comentadas (packages/host/module-federation.config.ts:8-9). O carregador registra os remotes e os carrega em runtime com `registerRemotes` e `loadRemote`, a partir da lista de `configs/apps.ts`.

## Resumo

Afirmações: 3 (corroborada: 3, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 2, composição: 1).
