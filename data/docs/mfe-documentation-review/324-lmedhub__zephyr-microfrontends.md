---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Leitura do repositório

Há dois documentos, ambos em inglês e sobre o projeto. O `frontend/README.md:1-23` apresenta uma demonstração de micro-frontends com Rspack, Module Federation, React e Zephyr Cloud, lista host, header e footer e termina com comandos de instalação e execução. A descrição corresponde à composição registrada nas revisões 3.4.4 e 3.4.5, mas não esgota as unidades: o host também importa o remote Vue `url_shortener` e monta seu componente com `createApp` (`frontend/apps/host/src/utils/VueShortener.tsx:10-16`; `frontend/apps/host/src/App.tsx:17`). A lista do README (`frontend/README.md:7-9`) não declara ser exaustiva; a omissão do encurtador limita o texto, sem contradizer as três unidades descritas. O uso de Zephyr aparece nas quatro configurações (`frontend/apps/host/rspack.config.ts:5-7`; `frontend/apps/remote-header/rspack.config.ts:5-7`; `frontend/apps/remote-footer/rspack.config.ts:5-7`; `frontend/apps/url-shortener/rspack.config.ts:3-5`), sem endereço de publicação nesses artefatos, como registra a revisão 3.4.6.

O `backend/README.md:1-67` descreve o serviço Go, instalação, endpoints, testes e Docker; não faz afirmação sobre a relação entre unidades frontend, portanto não gera linha na tabela. Seu endpoint `POST /shorten` (`backend/README.md:38`) é chamado pelo componente Vue (`frontend/apps/url-shortener/src/Shortener.vue:85-92`), relação que o README frontend não explica. Os blocos de comandos de `backend/README.md:17-62` e `frontend/README.md:15-23` são instruções de execução, sem afirmação arquitetural adicional. Não há documento de template de ferramenta entre os dois documentos inventariados.

As ocorrências `doc-mfe-term` e `doc-integration-technology` em `frontend/README.md:1` são o título, retomado pela afirmação da linha 3 (#1). As ocorrências desses dois padrões na linha 3 estão na #1; `doc-mfe-term` e `doc-host-remote` na linha 7 estão na #2; `doc-independence` nas linhas 8 e 9 estão nas #3 e #4. Foram lidos os quatro `rspack.config.ts`, os cinco `package.json` de `frontend/` e suas apps, o código de composição `frontend/apps/host/src/App.tsx:1-28` e `frontend/apps/host/src/utils/VueShortener.tsx:1-29`, as entradas e componentes dos remotes, além de `backend/Dockerfile:1-18`, `backend/docker-compose.yml:1-32` e `backend/Makefile:1-33`, citados nas revisões anteriores. Os manifestos não contêm campo `description`, e os comentários desses artefatos não acrescentam afirmação arquitetural: há supressões de TypeScript no wrapper (`frontend/apps/host/src/utils/VueShortener.tsx:9-11`), uma sugestão de notificação interna (`frontend/apps/url-shortener/src/Shortener.vue:113`) e o título do Makefile (`backend/Makefile:1`).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | frontend/README.md:3 | "This project demonstrates a microfrontends architecture using Rspack, Module Federation, React and Zephyr Cloud." | composição | corroborada | 3.4.2, notas; 3.4.5 #1-3; 3.4.6 #1-4; frontend/apps/host/rspack.config.ts:1-7,82-94; frontend/apps/host/src/App.tsx:1-7,12-22 |
| 2 | frontend/README.md:7 | "Host Application [...] Main application that consumes remote microfrontends" | estrutura | corroborada | 3.4.5 #1-3; frontend/apps/host/rspack.config.ts:83-88; frontend/apps/host/src/App.tsx:6-22; frontend/apps/host/src/utils/VueShortener.tsx:10-16 |
| 3 | frontend/README.md:8 | "Remote Header [...] Independent header component" | independência | corroborada | 3.4.3, unidade frontend/apps/remote-header; frontend/apps/remote-header/src/index.tsx:1-14; frontend/apps/remote-header/rspack.config.ts:9-19,73-79; frontend/apps/remote-header/package.json:4-7 |
| 4 | frontend/README.md:9 | "Remote Footer [...] Independent footer component" | independência | corroborada | 3.4.3, unidade frontend/apps/remote-footer; frontend/apps/remote-footer/src/index.tsx:1-14; frontend/apps/remote-footer/rspack.config.ts:9-19,73-79; frontend/apps/remote-footer/package.json:4-7 |

## Observações

**1. frontend/README.md:3.** A frase apresenta a arquitetura e as tecnologias da demonstração. O título (`frontend/README.md:1`) repete Rspack e Module Federation. O host usa o plugin de federação embutido do Rspack (`frontend/apps/host/rspack.config.ts:1,82-94`), importa React e carrega os dois componentes React remotos (`frontend/apps/host/src/App.tsx:1-7,12-22`). O `withZephyr()` envolve as configurações das quatro unidades (`frontend/apps/host/rspack.config.ts:5-7`; `frontend/apps/remote-header/rspack.config.ts:5-7`; `frontend/apps/remote-footer/rspack.config.ts:5-7`; `frontend/apps/url-shortener/rspack.config.ts:3-5`). Isso corrobora o uso declarado do serviço, sem demonstrar uma implantação efetivamente realizada. Conforme a 3.4.2, a implementação de Module Federation é a do Rspack; a frase não atribui o mecanismo ao pacote `@module-federation/enhanced`, que só está declarado na raiz (`frontend/package.json:59`). A existência adicional do remote Vue não contradiz o uso de React descrito.

**2. frontend/README.md:7.** O papel de aplicação principal consumidora é verificável: o host declara três remotes (`frontend/apps/host/rspack.config.ts:83-88`), renderiza header e footer em `Suspense` (`frontend/apps/host/src/App.tsx:6-7,12-22`) e monta o encurtador Vue via wrapper (`frontend/apps/host/src/utils/VueShortener.tsx:10-16`). As três relações estão ativas na 3.4.5 #1-3. A porta indicada no README é configuração local (`frontend/apps/host/rspack.config.ts:17-18`), sem implicar endereço publicado.

**3. frontend/README.md:8.** O header é exposto como módulo remoto (`frontend/apps/remote-header/rspack.config.ts:73-79`) e dispõe de entrada que monta `Header` em uma página própria (`frontend/apps/remote-header/src/index.tsx:1-14`), de `devServer` próprio (`frontend/apps/remote-header/rspack.config.ts:13-19`) e de script `start` (`frontend/apps/remote-header/package.json:7`). Esses artefatos sustentam a independência para execução e desenvolvimento do componente. A frase não reivindica evolução organizacional ou versionamento independente.

**4. frontend/README.md:9.** O footer segue o mesmo arranjo, com exposição de `./Footer` (`frontend/apps/remote-footer/rspack.config.ts:73-79`), entrada que renderiza o componente em uma página própria (`frontend/apps/remote-footer/src/index.tsx:1-14`), servidor local (`frontend/apps/remote-footer/rspack.config.ts:13-19`) e script `start` (`frontend/apps/remote-footer/package.json:7`). A independência descrita é corroborada nessa dimensão de execução e desenvolvimento; não há afirmação de versionamento independente.

## Resumo

Afirmações: 4 (corroborada: 4, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 1, composição: 1, independência: 2).
