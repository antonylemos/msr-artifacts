---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

# 049 — LebLeb03/UX308_Assignment2_2025

## Leitura do repositório

O repositório é um site WordPress montado a partir do template `cd-wordpress` ("continuous deployment wordpress"; README.md:1-2). O snapshot guarda só o `wp-content/`; o núcleo do WordPress, a geração do site estático e o servidor de desenvolvimento vêm da ferramenta externa `wp-pwa`, a única dependência do `package.json` da raiz (package.json:2-4). Os scripts são todos chamadas a ela: `wp-pwa dev` em `dev` e `start`, `wp-pwa preview` e `wp-pwa build UX308_Assignment2_2025` em `build` (package.json:6-9). Não há configuração da ferramenta no snapshot, então o que entra no artefato de build não é observável. O README diz que o build gera um site estático em `dist/` (README.md:11), pasta ignorada pelo git (.gitignore:3), assim como `.wordpress` (.gitignore:5).

A publicação é feita por um único workflow, `CI`, disparado por push e pull request na `main` e manualmente (.github/workflows/main.yml:6-14). Seu único job, `build`, com permissão de escrita no repositório (.github/workflows/main.yml:19-24), chama a action `diy-pwa/npm-build-2-gh-pages@v1.11`, que, segundo o comentário do próprio workflow, roda `npm install`, `npm run build` e publica no `gh-pages` (.github/workflows/main.yml:29-32). É configuração de produção: o site inteiro sai num só artefato e vai para o GitHub Pages do repositório. O endereço final não está registrado no snapshot. O README repete essa forma de deploy e cita a alternativa de publicar `dist/` num provedor de nuvem (README.md:11); não há artefato dessa alternativa.

Os outros três workflows do `matches.csv` pertencem ao plugin `sqlite-database-integration`, copiado em `wp-content/mu-plugins/`, e não cobrem nenhuma aplicação frontend: `cs.yml` verifica o estilo do código PHP do plugin (wp-content/mu-plugins/sqlite-database-integration/.github/workflows/cs.yml:5-20, :31-38), e `phpunit-tests.yml` roda os testes PHPUnit do plugin em várias versões do PHP, pelo workflow reutilizável `phpunit-tests-run.yml` (wp-content/mu-plugins/sqlite-database-integration/.github/workflows/phpunit-tests.yml:9-23; wp-content/mu-plugins/sqlite-database-integration/.github/workflows/phpunit-tests-run.yml:3-4). Como estão dentro de `wp-content/` e não em `.github/workflows/` da raiz, o GitHub não os executa neste repositório. O `.devcontainer/devcontainer.json` só define a imagem Node do ambiente de desenvolvimento (.devcontainer/devcontainer.json:2) e não é artefato de deploy.

As composições registradas na 3.4.5 apontam para bundles e páginas de outras origens (`lebleb03.github.io/Assignment_1_UX308/`, `rhildred.github.io/chatter/`, `tools.akismet.com`), todas sem configuração no snapshot; o build e o deploy desses destinos estão fora deste repositório.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | separado | GitHub Pages do repositório, branch `gh-pages`, endereço não registrado no snapshot (.github/workflows/main.yml:29-30) | No | package.json:9 (`wp-pwa build UX308_Assignment2_2025`); .github/workflows/main.yml:6-14 (gatilhos na `main`); .github/workflows/main.yml:29-32 (build e publicação no `gh-pages`) |

## Observações

**1. .** É a única linha da revisão estrutural, `Undetermined` lá porque nenhuma entrada de aplicação está no snapshot; esta etapa não muda isso. Build `separado`: o script `build` gera o site estático do repositório, e nenhuma outra aplicação do snapshot entra nele (package.json:9; README.md:11). O limite é que a ferramenta `wp-pwa` e sua configuração estão fora do snapshot, então o conteúdo do artefato não pode ser conferido. Deploy `separado`: o job `build` do workflow da raiz roda o build e publica o resultado no `gh-pages` (.github/workflows/main.yml:19-32); é o único artefato de deploy que cobre a aplicação e ela é publicada sozinha. A relação com os destinos externos da 3.4.5 é feita no navegador, por URL (wp-content/themes/chatbot/functions.php:14-15), e eles não entram neste artefato. Versionamento `No`: o `package.json` não tem `version` (package.json:1-11) e nenhum artefato publica a aplicação com versão própria.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (separado: 1). Versionamento independente: 0.
