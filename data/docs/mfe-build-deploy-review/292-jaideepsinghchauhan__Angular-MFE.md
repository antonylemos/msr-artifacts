---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
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

# 292 — jaideepsinghchauhan/Angular-MFE

## Leitura do repositório

Workspace Nx de tutorial, gerado em boa parte pelo scaffold da ferramenta. Há um único manifesto, na raiz, com `scripts` vazio (package.json:1-6); os builds são targets Nx definidos no `project.json` de cada projeto. As três aplicações de `appshell/` (`host`, `mfe1`, `mfe2`) usam o executor `@nx/angular:webpack-browser`, cada uma com `outputPath` próprio em `dist/appshell/<nome>` (appshell/host/project.json:9-13; appshell/mfe1/project.json:9-13; appshell/mfe2/project.json:9-13). Em produção, que é a configuração padrão do build (appshell/host/project.json:57), cada uma troca o webpack pelo seu `webpack.prod.config.ts` (appshell/host/project.json:44-46), que reaplica `withModuleFederation` à mesma configuração e só traz, em comentário, o exemplo de como apontar os remotes para URLs de deploy (appshell/host/webpack.prod.config.ts:9-24; arquivos idênticos em mfe1 e mfe2). Como esse override ficou vazio, o host declara os remotes só pelo nome (appshell/host/module-federation.config.ts:17), e o snapshot não traz nenhum endereço de produção. O README reconhece essa lacuna: o mapeamento é para localhost e, para produção, seria preciso acrescentar as URLs no arquivo de configuração de produção (README.md:134-135). A aplicação padrão `apps/angular-monorepo` usa outro builder, `@angular-devkit/build-angular:browser`, com saída em `dist/apps/angular-monorepo` (apps/angular-monorepo/project.json:9-13). O nx.json só ajusta cache e dependências dos dois executores de build (nx.json:21-26, 49-59).

Tudo o que serve as aplicações é de desenvolvimento ou local. O host sobe com `@nx/angular:module-federation-dev-server` na porta 4200 (appshell/host/project.json:59-64), mfe1 e mfe2 com `@nx/angular:dev-server` nas portas 4201 e 4202 (appshell/mfe1/project.json:59-64; appshell/mfe2/project.json:59-64). Os targets `serve-static` (`@nx/web:file-server`) servem o build já pronto de cada aplicação nas mesmas portas (appshell/host/project.json:92-99; appshell/mfe1/project.json:93-101; appshell/mfe2/project.json:93-101; apps/angular-monorepo/project.json:75-82), mas também são execução local, como a revisão estrutural já registrou nas Notas. Não há Dockerfile, compose, workflow de CI nem configuração de hospedagem no snapshot, e o `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. A pasta `dist` está no .gitignore:4. O único campo de versão é `0.0.0` no manifesto da raiz (package.json:3), sem uso em publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | apps/angular-monorepo | separado | não observado | porta 4200 em execução local (apps/angular-monorepo/project.json:80) | No | apps/angular-monorepo/project.json:9-13 (target `build` com output próprio); apps/angular-monorepo/project.json:75-82 (`serve-static` local) |
| 2 | appshell/host | separado | não observado | `http://localhost:4200` em desenvolvimento (appshell/host/project.json:63-64); porta 4200 em `serve-static` (appshell/host/project.json:97) | No | appshell/host/project.json:9-13 (target `build` com output próprio); appshell/host/project.json:44-46 (webpack de produção); appshell/host/webpack.prod.config.ts:9-24 (override de remotes vazio) |
| 3 | appshell/mfe1 | separado | não observado | `http://localhost:4201` em desenvolvimento (appshell/mfe1/project.json:63-64); porta 4201 em `serve-static` (appshell/mfe1/project.json:99) | No | appshell/mfe1/project.json:9-13 (target `build` com output próprio); appshell/mfe1/project.json:44-46 (webpack de produção) |
| 4 | appshell/mfe2 | separado | não observado | `http://localhost:4202` em desenvolvimento (appshell/mfe2/project.json:63-64); porta 4202 em `serve-static` (appshell/mfe2/project.json:99) | No | appshell/mfe2/project.json:9-13 (target `build` com output próprio); appshell/mfe2/project.json:44-46 (webpack de produção) |

## Observações

**1. apps/angular-monorepo.** Aplicação padrão gerada pelo Nx, sem relação de composição com as demais (revisão de composição, Resumo). O build é separado: target próprio com saída só dela (apps/angular-monorepo/project.json:9-13), sem `customWebpackConfig` e sem Module Federation. Nenhum artefato a publica; o `serve-static` na porta 4200 (apps/angular-monorepo/project.json:75-82) só serve o build localmente e usa a mesma porta do host. Sem versão própria. O README só mostra os comandos de desenvolvimento e build desta aplicação, herdados do scaffold (README.md:18-27).

**2. appshell/host.** Build separado, com output em `dist/appshell/host` (appshell/host/project.json:13) e webpack próprio de produção (appshell/host/project.json:44-46). O host não embute o código dos remotes: carrega-os em runtime pelos nomes `mfe1` e `mfe2` (appshell/host/module-federation.config.ts:17). Para produção, faltaria indicar onde cada remote está publicado, e o lugar previsto para isso está só em comentário (appshell/host/webpack.prod.config.ts:12-21). Deploy não observado: nada empacota nem publica o host; a porta 4200 é a do servidor de desenvolvimento federado (appshell/host/project.json:59-64) e a do `serve-static` (:92-99). Sem versão própria.

**3. appshell/mfe1.** Build separado, com output em `dist/appshell/mfe1` (appshell/mfe1/project.json:13) e o mesmo `webpack.prod.config.ts` do scaffold (appshell/mfe1/project.json:44-46). O `serve` depende de `host:serve` (appshell/mfe1/project.json:75), uma ordem de subida em desenvolvimento, não um empacotamento conjunto. Deploy não observado: só as portas locais 4201 (appshell/mfe1/project.json:63-64, 99). Sem versão própria.

**4. appshell/mfe2.** Mesmo arranjo de mfe1: build com output em `dist/appshell/mfe2` (appshell/mfe2/project.json:13), webpack de produção próprio (appshell/mfe2/project.json:44-46), `serve` dependente de `host:serve` (appshell/mfe2/project.json:75) e portas locais 4202 (appshell/mfe2/project.json:63-64, 99). Deploy não observado e sem versão própria.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
