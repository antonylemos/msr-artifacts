---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

# 284 — RafaM-dev/hostRepo

## Leitura do repositório

A documentação é só o README.md, em espanhol. Ele apresenta o repositório como o host de um explorador de personagens de Rick and Morty que integra um micro-frontend remoto por Module Federation (README.md:1-3), e tem seções de instalação, execução, arquitetura, dependências, testes, estrutura de pastas, características e configuração do Module Federation. No geral, ele confere com as revisões anteriores: uma única aplicação React + Vite na raiz, o host, que carrega em runtime um remote que não está no snapshot. O README não fala de deploy. Só manda rodar `npm run build` e `npm run preview` localmente (README.md:54-62), como a revisão de build e deploy já registrou.

O README está desatualizado em relação ao snapshot em três pontos:
- **Configuração do Module Federation:** o bloco de código em README.md:334-342 reproduz um `federation(...)` com o remote `remote_root` em `http://localhost:5174/assets/remoteEntry.js`. O vite.config.ts:8-15 do snapshot declara `mf-remoteDetails` em `http://localhost:5001/assets/remoteEntry.js` e tem `filename: "remoteEntry.js"`, que o bloco não traz. O `shared: ['react', 'react-dom']` coincide (README.md:340; vite.config.ts:14). A prosa que acompanha o bloco é a afirmação 7.
- **Versões:** os blocos de dependências (README.md:145-171) e a tabela de tecnologias (README.md:304-312) citam React 18.3.1, Vite 6.0.1 e `@originjs/vite-plugin-federation` ^1.3.6. O package.json traz `react` ^19.2.0 (package.json:19), `vite` ^7.2.2 (package.json:38) e o plugin em ^1.4.1 (package.json:26), além de dependências do MUI que o README não lista (package.json:13-16).
- **Árvore de pastas:** a árvore comentada (README.md:228-276) lista `src/shared/types/` (README.md:256), que não existe no snapshot. Os tipos ficam em `src/store/index.ts`. A árvore descreve detalhes internos do host. Só o comentário de `vite.config.ts` (README.md:275) toca a composição e entra como repetição da afirmação 4.

Os comandos de execução mandam iniciar o remote em `../remote` antes do host (README.md:43-49, 352-356). Isso supõe um diretório irmão fora deste repositório, que o snapshot não mostra. A dependência do host em relação ao remote é a afirmação 3. As instruções `cd host` (README.md:30) e a raiz `host/` da árvore (README.md:229) chamam de `host` o diretório que, no GitHub, é o repositório `hostRepo`. O `package.json` também se chama `host` (package.json:2).

Não viraram linha:
- o diagrama de camadas e o fluxo de dados (README.md:107-139), que são internos ao host;
- a API externa de Rick and Morty (README.md:173-177), que é fonte de dados do host e não se liga ao remote;
- a persistência dos favoritos no Zustand (README.md:294-296; src/store/favoritesStore.ts:6-24), interna ao host;
- as portas 5173 e 5174 (README.md:52, 318, 347, 360-363);
- a seção de testes (README.md:179-224), que diz que não há testes configurados;
- o resto do README, que trata de instalação, negócio e aparência.

O `matches.csv` tem 15 ocorrências `doc-*`, em README.md:3 (dois padrões), :21, :40, :73, :75, :91, :103, :161, :275, :298, :300, :328, :332 e :347. Sem linha própria: README.md:40 repete a afirmação 3; README.md:73 é o título "Arquitectura de Micro-Frontends"; README.md:91 e :103 integram o diagrama discutido na afirmação 2; README.md:161 é a dependência em bloco de código reproduzido, discutida na afirmação 4; README.md:275 e :332 repetem a afirmação 4; README.md:298 ("4. Module Federation") e README.md:328 ("Module Federation") são títulos, sem afirmação adicional. Comentários lidos nos artefatos citados pelas revisões anteriores: vite.config.ts, src/declare.d.ts, src/App.tsx, src/main.tsx, src/features/episodes_list/ListEpisodes.tsx e index.html não têm comentários, e o package.json não tem `description`. O arquivo vazio `remote-root@0.0.0` na raiz não é documentação. O nome dele lembra o `remote_root` do README, mas ele não traz afirmação.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "implementa arquitectura de micro-frontends mediante Module Federation" (implementa arquitetura de micro-frontends por meio de Module Federation) | estrutura | corroborada | 3.4.2 (package.json:26, Configurada Yes); 3.4.5 #1; vite.config.ts:8-15 |
| 2 | README.md:3 | "Esta aplicación actúa como el **host principal** que integra módulos remotos" (esta aplicação atua como o **host principal** que integra módulos remotos) | estrutura | corroborada | 3.4.3 (. Yes); 3.4.5 #1; vite.config.ts:9-13; src/features/episodes_list/ListEpisodes.tsx:15 |
| 3 | README.md:21 | "**Aplicación Remote** corriendo en el puerto configurado (requerido para Module Federation)" (**aplicação remota** em execução na porta configurada, necessária para Module Federation) | independência | corroborada | 3.4.4 (src/features/episodes_list/ListEpisodes.tsx:96, runtime-composition); 3.4.5 #1; src/features/episodes_list/ListEpisodes.tsx:15; src/App.tsx:4; vite.config.ts:11-13 |
| 4 | README.md:75 | "utilizando `@originjs/vite-plugin-federation`" (usando `@originjs/vite-plugin-federation`) | composição | corroborada | 3.4.2 (package.json:26); vite.config.ts:3; vite.config.ts:8-15 |
| 5 | README.md:299 | "Carga dinámica de módulos remotos" (carregamento dinâmico de módulos remotos) | composição | corroborada | 3.4.4 (src/features/episodes_list/ListEpisodes.tsx:96, runtime-composition); 3.4.5 #1; vite.config.ts:12 |
| 6 | README.md:300 | "escalable" (escalável), em "Arquitectura escalable de micro-frontends" (arquitetura escalável de micro-frontends) | estrutura | sem corroboração | — |
| 7 | README.md:346-347 | "Esta aplicación consume módulos desde: **remote_root**: Micro-frontend remoto (puerto 5174)" (esta aplicação consome módulos de: **remote_root**, micro-frontend remoto, porta 5174) | composição | contradita | 3.4.5 #1; vite.config.ts:11-13; src/features/episodes_list/ListEpisodes.tsx:15 |

## Observações

**1. README.md:3.** O host usa `@originjs/vite-plugin-federation` configurado no vite.config.ts:8-15 e carrega um remote por ele (relação 1 da revisão de composição). Isso sustenta "micro-frontends mediante Module Federation". A segunda unidade, o remote, está fora do snapshot. Repetições: o título "Arquitectura de Micro-Frontends" e a frase "Este proyecto implementa una arquitectura de Module Federation" (README.md:73-75). A referência à arquitetura de micro-frontends em README.md:300 repete esta afirmação; a propriedade adicional "escalable" é tratada separadamente na afirmação 6.

**2. README.md:3.** O snapshot é só o host: a única aplicação frontend da revisão estrutural, com `name: "host"` e um remote declarado (vite.config.ts:9-13), do qual importa `DetailEpisode` (src/features/episodes_list/ListEpisodes.tsx:15). "Módulos remotos" está no plural, mas o snapshot mostra um único remote e um único módulo consumido. Repetições: o diagrama de arquitetura (README.md:77-105), em que o host "(Este Proyecto)" tem um bloco "Module Federation / Carga módulos remotos" e uma seta para "REMOTE MODULE (Micro-frontend)", e a raiz `host/` da árvore (README.md:229).

**3. README.md:21.** O README diz que o host só funciona com o remote rodando. O import do componente remoto é estático (src/features/episodes_list/ListEpisodes.tsx:15). `ListEpisodes` é importado diretamente pelo App (src/App.tsx:4), e o snapshot não tem `lazy`, `Suspense` nem tratamento de falha em volta. O host depende, portanto, do `remoteEntry.js` declarado em vite.config.ts:11-13 para carregar o módulo que contém a rota `/episodes`. Repetições: "Esta aplicación requiere que el micro-frontend remoto esté corriendo primero" (README.md:40) e o problema "Remote module no cargado" (README.md:351-356). O "puerto configurado" é o 5001 do vite.config.ts:12, e não o 5174 que o README cita mais adiante (afirmação 7).

**4. README.md:75.** O plugin está em package.json:26, é importado em vite.config.ts:3 e aplicado em vite.config.ts:8-15. Repetições: o comentário "Configuración Vite + Module Federation" de `vite.config.ts` na árvore (README.md:275) e "La configuración de Module Federation se encuentra en `vite.config.ts`" (README.md:332). A versão ^1.3.6 do bloco de dependências (README.md:161) é anterior à do package.json (^1.4.1), mas ela está num bloco de código e não muda o mecanismo.

**5. README.md:299.** O remote é resolvido em runtime pela URL de `remoteEntry.js` (vite.config.ts:12), e o componente importado é renderizado na lista de episódios (src/features/episodes_list/ListEpisodes.tsx:96-100). Esta é a composição em runtime registrada nas revisões de código-fonte e de composição.

**6. README.md:300.** A propriedade "escalable" acrescenta uma afirmação verificável à caracterização como arquitetura de micro-frontends, já registrada na afirmação 1. Nenhum artefato do snapshot confirma nem contradiz a escalabilidade. A configuração de um remote (vite.config.ts:11-13) e seu consumo pelo host (src/features/episodes_list/ListEpisodes.tsx:15, 96-100) demonstram composição, mas não bastam para corroborar essa propriedade. Por isso, a escalabilidade fica sem corroboração.

**7. README.md:346-347.** Uma parte se confirma: o host consome módulos de um único micro-frontend remoto. O nome e o endereço, porém, não são os do snapshot. O vite.config.ts:11-12 declara o remote `mf-remoteDetails` em `http://localhost:5001/assets/remoteEntry.js`, e o import usa `mf-remoteDetails/DetailEpisode` (src/features/episodes_list/ListEpisodes.tsx:15). Não há `remote_root` nem porta 5174 em nenhum artefato. A revisão de composição já registrou essa divergência e seguiu o vite.config.ts. O bloco de configuração logo acima (README.md:334-342) traz o mesmo `remote_root` e aparece na Leitura.

## Resumo

Afirmações: 7 (corroborada: 5, parcial: 0, contradita: 1, sem corroboração: 1). Temas: (estrutura: 3, composição: 3, independência: 1).
