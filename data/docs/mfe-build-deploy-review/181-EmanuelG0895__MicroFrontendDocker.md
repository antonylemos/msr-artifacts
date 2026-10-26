---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
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

# 181 — EmanuelG0895/MicroFrontendDocker

## Leitura do repositório

Teste técnico com três aplicações React construídas com Rspack, sem workspace: cada pasta tem `package.json`, lockfile e o mesmo conjunto de scripts, `build` (`NODE_ENV=production rspack build`) e `start:prod` (`npx serve -s dist -l <porta>`) (MF-Shell/package.json:5,9; MF-Characters/package.json:5,9; MF-CharacterDetail/package.json:5,9). Não há script na raiz nem CI. Os `webpack.config.js` de MF-Characters e MF-CharacterDetail, com `publicPath: 'auto'` e `mode: 'development'` (MF-Characters/webpack.config.js:7,13; MF-CharacterDetail/webpack.config.js:7,13), não são invocados por nenhum script; o build vigente é o do `rspack.config.ts`.

O empacotamento é Docker. Há três Dockerfiles multi-stage com a mesma forma: um estágio `node:18-alpine` instala as dependências e roda `pnpm run build`, e um estágio de produção copia o `dist`, instala `serve` e as dependências de produção (Dockerfile:2-38; MF-Characters/Dockerfile:2-34; MF-CharacterDetail/Dockerfile:2-34). O da raiz constrói só `MF-Shell/` (Dockerfile:7-8,15) e sobe por start.sh, que espera o `/health` dos dois remotes antes de rodar `start:prod` (Dockerfile:34,44; start.sh:7-21); os dos remotes rodam `start:prod` direto (MF-Characters/Dockerfile:40; MF-CharacterDetail/Dockerfile:40). O docker-compose.yml tem um serviço por aplicação, cada um com o seu `build` (docker-compose.yml:18-21, 35-38, 52-55), e um serviço `nginx:alpine` que é o único com porta publicada (docker-compose.yml:3-8). O nginx.conf faz proxy de `/` para `mf-shell:3000`, de `/characters` para `mf-characters:3001` e de `/character-detail` para `mf-character-detail:3002` (nginx.conf:6-16, 29-30, 38-39, 47-48); `/health` responde do próprio nginx e `/ws` vai para o shell (nginx.conf:23-24, 56-57). Os `.dockerignore` (na raiz e em cada pasta) só excluem dependências, builds, documentação e arquivos locais do contexto da imagem.

O arranjo de produção não bate com a composição. As URLs dos remotes no host são fixas, `http://localhost:3003/remoteEntry.js` e `http://localhost:3002/remoteEntry.js` (MF-Shell/module-federation.config.ts:4-5), e os remotes geram o bundle com `publicPath` absoluto nas portas do servidor de desenvolvimento, 3003 e 3002 (MF-CharacterDetail/rspack.config.ts:25,38; MF-Characters/rspack.config.ts:25,33). Nas imagens, os remotes servem em 3001 e 3002 (MF-Characters/package.json:9; MF-CharacterDetail/package.json:9), portas que o compose não publica, e o proxy só os expõe por prefixos de caminho que o host não usa. Pelo snapshot, o navegador não alcançaria os `remoteEntry.js` no perfil Docker; isso limita o que o deploy entrega, mas não muda que cada aplicação é empacotada à parte. O validate-project.sh e o validate-project.ps1 só verificam o compose e as rotas do nginx (validate-project.sh:45, 59-84; validate-project.ps1:44, 60-88). As ocorrências `ops-cors` são cabeçalhos do servidor de desenvolvimento (MF-Shell/rspack.config.ts:28-29; MF-CharacterDetail/rspack.config.ts:29).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | MF-CharacterDetail | separado | separado | `/character-detail` pelo nginx na porta 80 (nginx.conf:47-48; docker-compose.yml:5-6); serviço interno `mf-character-detail:3002` (nginx.conf:15; MF-CharacterDetail/package.json:9); porta 3003 em desenvolvimento (MF-CharacterDetail/rspack.config.ts:25) | No | MF-CharacterDetail/package.json:5 (`rspack build`); MF-CharacterDetail/rspack.config.ts:38 (`publicPath: "http://localhost:3003/"`); MF-CharacterDetail/Dockerfile:2-40 (build e imagem próprios, `EXPOSE 3002`); docker-compose.yml:52-55 (serviço `mf-character-detail`); nginx.conf:47-48 (rota `/character-detail`) |
| 2 | MF-Characters | separado | separado | `/characters` pelo nginx na porta 80 (nginx.conf:38-39; docker-compose.yml:5-6); serviço interno `mf-characters:3001` (nginx.conf:11; MF-Characters/package.json:9); porta 3002 em desenvolvimento (MF-Characters/rspack.config.ts:25) | No | MF-Characters/package.json:5 (`rspack build`); MF-Characters/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`); MF-Characters/Dockerfile:2-40 (build e imagem próprios, `EXPOSE 3001`); docker-compose.yml:35-38 (serviço `mf-characters`); nginx.conf:38-39 (rota `/characters`) |
| 3 | MF-Shell | separado | separado | `/` pelo nginx na porta 80 (nginx.conf:29-30; docker-compose.yml:5-6); serviço interno `mf-shell:3000` (nginx.conf:7; MF-Shell/package.json:9) | No | MF-Shell/package.json:5 (`rspack build`); MF-Shell/rspack.config.ts:35 (`publicPath: "auto"`); Dockerfile:2-44 (build e imagem próprios a partir de `MF-Shell/`, `EXPOSE 3000`); start.sh:7-21 (espera os remotes e inicia o shell); docker-compose.yml:18-21 (serviço `mf-shell`); nginx.conf:29-30 (rota `/`) |

## Observações

**1. MF-CharacterDetail.** Build próprio e imagem própria, montada da pasta da aplicação (MF-CharacterDetail/Dockerfile:7-18), num serviço próprio do compose (docker-compose.yml:52-55): deploy separado. O bundle é gerado com `publicPath: "http://localhost:3003/"` (MF-CharacterDetail/rspack.config.ts:38), que é o endereço que o host usa (MF-Shell/module-federation.config.ts:4), mas o contêiner serve na porta 3002 (MF-CharacterDetail/Dockerfile:37; MF-CharacterDetail/package.json:9) e só chega ao navegador por `/character-detail` (nginx.conf:47-48). O `version: "0.0.1"` (MF-CharacterDetail/package.json:3) não é usado na publicação e o serviço não tem imagem nomeada nem tag (docker-compose.yml:52-55): Versionamento `No`.

**2. MF-Characters.** Mesmo arranjo: build e imagem próprios (MF-Characters/Dockerfile:7-18), serviço `mf-characters` (docker-compose.yml:35-38). O bundle aponta para `http://localhost:3002/` (MF-Characters/rspack.config.ts:33), coerente com o host (MF-Shell/module-federation.config.ts:5) só em desenvolvimento; na imagem a aplicação serve em 3001 (MF-Characters/Dockerfile:37; MF-Characters/package.json:9), exposta por `/characters` (nginx.conf:38-39). Sem versão própria usada na publicação (MF-Characters/package.json:3; docker-compose.yml:35-38).

**3. MF-Shell.** O Dockerfile da raiz é o dele: copia só `MF-Shell/` (Dockerfile:7-8,15) e gera uma imagem que contém apenas o `dist` do host (Dockerfile:29); os remotes não entram nela, mas são carregados em tempo de execução pelas URLs fixas em `localhost` (MF-Shell/module-federation.config.ts:4-5). A dependência entre os deploys está no start.sh, que só inicia o shell quando os dois remotes respondem (start.sh:7-16). É a única aplicação com `publicPath: "auto"` (MF-Shell/rspack.config.ts:35) e a porta de entrada do nginx (nginx.conf:29-30). Sem versionamento observado (MF-Shell/package.json:3; docker-compose.yml:18-21).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (separado: 3). Versionamento independente: 0.
