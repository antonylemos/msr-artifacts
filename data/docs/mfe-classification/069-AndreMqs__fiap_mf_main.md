---
schema: 1
id: 976411996
full_name: AndreMqs/fiap_mf_main
url: https://github.com/AndreMqs/fiap_mf_main
commit: 65ac8ce82eb1bc752c0cfafd63660185c2d79c23
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 069 — AndreMqs/fiap_mf_main

## Contexto

- **Abordagem de implementação:** Module Federation (`@originjs/vite-plugin-federation`)
- **Tipo de repositório:** example/proof of concept (trabalho da pós FIAP: app de gerenciamento financeiro em três repositórios)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:1-12`: "Projeto de Gerenciamento Financeiro com Microfrontends… Module Federation"; três repositórios: `fiap_mf_consumer_root` (container e orquestrador de rotas), `fiap_mf_home` (landing) e `fiap_mf_main` (área logada, este repositório) | moderada |
| Configuração | `vite.config.ts:9-27`: `federation({ name: 'fiap_mf_main', filename: 'remoteEntry.js', exposes: { './Main': './src/App.tsx' }, shared: [react, react-dom, @mui/*, @emotion/*, lodash, recharts, classnames, zustand] })`; sem `remotes` | moderada |
| Código-fonte (contrato) | `src/hooks/useParentApp.ts:1-19`: lê e grava o nome do usuário por `window.global.setUserName/getUserName`, funções fornecidas pelo container (contrato com o host) | moderada |
| Estrutura | Uma única app (área logada: extrato, transações, investimentos, upload CSV) | contrária |
| Composição | O container `fiap_mf_consumer_root` está em outro repositório, fora da amostra | ausente |
| Build/deploy | `dockerfile`, `default.conf` (nginx), `docker-compose.yml` (com `db.json`, API mock): deploy próprio | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a config de composição só tem `exposes` (`vite.config.ts:12-14`) |
| Q2 | Yes (para a unidade) | Build e imagem próprios (`dockerfile`, `default.conf`) |
| Q3 | Undetermined | O container `fiap_mf_consumer_root` não está no repositório |
| Q4 | Undetermined | Lado remote configurado e contrato com o host (`useParentApp.ts`); o consumidor não é observável |
| Q5 | No | Unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- Q1 é No; aplica-se a exceção MFE-unit: remote MF com `exposes` e contrato explícito com o container (`window.global`), host não observável.
- Corresponde a "repositories containing only a remote unit, without the composing host".

## Notas para análise

- **Protocolo (ecossistema multi-repositório):** a arquitetura completa (container + home + main) está documentada no README, mas só este remote está na amostra.
- **RQ3:** comunicação host ↔ remote por funções globais em `window.global`, um contrato simples e implícito.
