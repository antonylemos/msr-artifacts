---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
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

# 232 — riponcc/Group4COMP308Project

## Leitura do repositório

Projeto de grupo de disciplina com três aplicações React/Vite em `client/` (shell-app como host, user-app e issue-app como remotes de Module Federation) e microsserviços Node em `server/microservices/`. Não há `package.json` na raiz nem workspace: cada aplicação tem o seu manifesto, com `vite build` próprio (client/shell-app/package.json:8; client/user-app/package.json:8; client/issue-app/package.json:8), e é instalada e rodada a partir do seu diretório. Nenhum script dispara os três builds juntos.

O snapshot não tem Dockerfile, compose, workflow de CI nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` nem `cfg-public-path`. O que existe é configuração de desenvolvimento local: os scripts `dev` e `preview` fixam as portas 3000, 3001 e 3002 (client/shell-app/package.json:7, 10; client/user-app/package.json:7, 10; client/issue-app/package.json:7, 10), e o shell aponta os remotes para `http://localhost:3001` e `http://localhost:3002` (client/shell-app/vite.config.js:39-42). Os scripts chamados `deploy` da user-app e da issue-app só fazem `npm run build && npm run preview` (client/user-app/package.json:11; client/issue-app/package.json:11), isto é, constroem e servem localmente com `vite preview`; o shell não tem esse script. O README descreve a mesma execução em seis terminais, com os serviços iniciados por `node` e o shell em `npm run dev` enquanto user-app e issue-app rodam em `npm run preview` (README.md:121-132, 138-148), e manda abrir `http://localhost:3000` (README.md:152).

Do lado do backend, `server/package.json:1-13` é um manifesto vazio, sem dependências nem script de execução, e cada microsserviço só tem scripts locais, `dev` com `nodemon` e `start` com `node` (por exemplo, server/microservices/auth-service/package.json:6-7). Nada disso empacota nem publica as aplicações frontend.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | client/issue-app | separado | não observado | `http://localhost:3002`, em `dev` e `preview` locais (client/issue-app/package.json:7, 10; client/issue-app/vite.config.js:7-9) | No | client/issue-app/vite.config.js:14-34 (federation e configuração de build próprias); client/issue-app/package.json:8 (`vite build`); client/issue-app/package.json:11 (`deploy` = build + preview local) |
| 2 | client/shell-app | separado | não observado | `http://localhost:3000`, em `dev` e `preview` locais (client/shell-app/package.json:7, 10; client/shell-app/vite.config.js:53-55) | No | client/shell-app/vite.config.js:32-56 (configuração própria); client/shell-app/package.json:8 (`vite build`) |
| 3 | client/user-app | separado | não observado | `http://localhost:3001`, em `dev` e `preview` locais (client/user-app/package.json:7, 10) | No | client/user-app/vite.config.js:7-26 (federation e configuração de build próprias); client/user-app/package.json:8 (`vite build`); client/user-app/package.json:11 (`deploy` = build + preview local) |

## Observações

**1. client/issue-app.** Build próprio com `vite build` (client/issue-app/package.json:8), que gera o `remoteEntry.js` do remote `issueApp` a partir da configuração de federation do próprio diretório (client/issue-app/vite.config.js:14-19), com `build` ajustado para federation (`modulePreload: false`, `target: 'esnext'`, client/issue-app/vite.config.js:29-34). O script `deploy` (client/issue-app/package.json:11) não publica nada: encadeia o build e o `vite preview` na porta 3002 (client/issue-app/package.json:10), que é a porta que o shell espera (client/shell-app/vite.config.js:41). Deploy `não observado`. O `version: "0.0.0"` (client/issue-app/package.json:4) não é usado em publicação, e o pacote é `private` (client/issue-app/package.json:3).

**2. client/shell-app.** Build próprio com `vite build` (client/shell-app/package.json:8) e configuração ativa em client/shell-app/vite.config.js:32-56; as linhas 1-26 do mesmo arquivo são uma versão anterior toda comentada. Os endereços dos remotes estão fixos em `localhost` (client/shell-app/vite.config.js:40-41), sem variável de ambiente nem `base`, o que amarra o build ao ambiente local. Não há script `deploy`, e o README o roda em modo `dev` (README.md:138-140). Deploy `não observado`; o `version: "0.0.0"` (client/shell-app/package.json:4) não é usado em publicação.

**3. client/user-app.** Mesmo arranjo da issue-app: build próprio (client/user-app/package.json:8) com a federation do remote `userApp` (client/user-app/vite.config.js:10-17) e o mesmo bloco `build` (client/user-app/vite.config.js:20-25). Diferente da issue-app, o `vite.config.js` não fixa porta; a 3001 que o shell espera (client/shell-app/vite.config.js:40) vem só dos scripts `dev` e `preview` (client/user-app/package.json:7, 10). O `deploy` (client/user-app/package.json:11) é build + preview local. Deploy `não observado`; versão `0.0.0` (client/user-app/package.json:4) sem uso em publicação.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
