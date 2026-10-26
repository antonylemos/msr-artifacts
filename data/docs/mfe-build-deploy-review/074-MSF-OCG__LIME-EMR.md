---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
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

# 074 — MSF-OCG/LIME-EMR

## Leitura do repositório

O repositório é uma distribuição OpenMRS 3 empacotada por Maven, e não contém o código de nenhuma aplicação frontend. A revisão estrutural julga `No` os dois diretórios candidatos, `.` (pacote de testes Playwright) e `docs` (site Docsify), e conta 0 aplicações; por isso não há linhas na tabela. Os 42 módulos ESM que a distribuição compõe são externos e só aparecem como nomes e versões na configuração de montagem, como registram a classificação e a revisão de composição.

O build e a publicação são feitos por Maven no CI. O workflow `CI` chama `maven-publish.yml` em push para `main` com `-Pazure -Pbundled-docker` (.github/workflows/ci.yml:13-18) e em release com o perfil `-Pproduction` a mais (.github/workflows/ci.yml:50-55); `maven-publish.yml` roda `mvn clean deploy` (.github/workflows/maven-publish.yml:107-108). O perfil `bundled-docker` (distro/pom.xml:742-746, conta `msfocg` no registro) monta imagens Docker com o docker-maven-plugin, apesar do comentário "Disable builidng and pushing distro docker images" (distro/pom.xml:885): as execuções `build` na fase `package` e `push` na fase `deploy` estão ativas (distro/pom.xml:958-971). Entre as imagens há uma única `%a-openmrs-frontend` (distro/pom.xml:901-909), ao lado de backend, proxy, bancos e OpenFn (distro/pom.xml:892-899; distro/pom.xml:910-954). O Dockerfile dessa imagem de frontend não está no snapshot: `scripts/bundled-docker/` só tem `openfn-web`, `openfn-worker` e `openmrs`, e o resto vem de `target/openmrs/bundled-docker`, gerado a partir do parent Ozone (distro/pom.xml:777-795). Pelo que se lê aqui, os módulos externos seriam publicados juntos nessa imagem de frontend, mas nenhum deles é aplicação do snapshot, e o conteúdo da imagem não é inspecionável.

Os demais workflows não publicam aplicação frontend. `build-all.yml`, `build-all-vm.yml` e o job `build` de `configuration-build-test.yml` só rodam `mvnw clean package` (.github/workflows/build-all.yml:50-51; .github/workflows/build-all-vm.yml:36-37; .github/workflows/configuration-build-test.yml:33-34), e os jobs `release-*` deste último só imprimem que a publicação de ZIP foi descontinuada em favor das imagens do Docker Hub (.github/workflows/configuration-build-test.yml:73-74). `deploy.yml` entra por SSH em `lime-mosul-dev.madiro.org` ou `lime-mosul-uat.madiro.org` e roda `start-bundled-docker.sh`, baixado de outro repositório (.github/workflows/deploy.yml:33-38; .github/workflows/deploy.yml:54-74); a única chamada a ele, em `ci.yml`, está comentada (.github/workflows/ci.yml:25-28). `playwright.yml` e `run-e2e-tests.yml` instalam dependências e rodam os testes Playwright do diretório `.` (.github/workflows/playwright.yml:14-19; .github/workflows/run-e2e-tests.yml:81-98), e `cleanup-artifacts.yml` apaga artefatos antigos do GitHub Actions (.github/workflows/cleanup-artifacts.yml:20-21).

As ocorrências `ops-*` do `matches.csv` não cobrem aplicação frontend. Os Dockerfiles de `scripts/bundled-docker/` estendem as imagens do OpenFn (scripts/bundled-docker/openfn-web/Dockerfile:2; scripts/bundled-docker/openfn-worker/Dockerfile:2-17). `docker-compose-openfn.yml` sobe Postgres, migrações, `web` e `worker` do OpenFn (scripts/docker-compose-openfn.yml:68; scripts/docker-compose-openfn.yml:86; scripts/docker-compose-openfn.yml:99-101; scripts/docker-compose-openfn.yml:139-141). `docker-compose-openmrs-override.yml` fixa as imagens do OpenMRS core e do MariaDB e só acrescenta a variável de locale a um serviço `frontend` definido fora do snapshot (scripts/docker-compose-openmrs-override.yml:2-3; scripts/docker-compose-openmrs-override.yml:10-11; scripts/docker-compose-openmrs-override.yml:16-18). `docker-compose-traefik.yml` sobe o proxy Traefik e um auxiliar que baixa certificados (scripts/docker-compose-traefik.yml:6-11; scripts/docker-compose-traefik.yml:31-35). O site `docs` tem um `docs/.nojekyll`, mas nenhum workflow do snapshot o constrói ou publica.

## Aplicações

Nenhuma aplicação frontend na revisão estrutural.

## Observações

Nenhuma aplicação frontend na revisão estrutural.

## Resumo

Aplicações: 0.
