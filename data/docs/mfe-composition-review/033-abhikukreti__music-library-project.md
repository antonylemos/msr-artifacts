---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 033 — abhikukreti/music-library-project

## Leitura do repositório

Exemplo com duas aplicações React/Vite unidas por Module Federation (`@originjs/vite-plugin-federation`): `main-app` é o host e `music-library` é o remote, que expõe o componente `MusicLibrary` (music-library/vite.config.js:8-13). O host carrega o componente com `React.lazy` e só o mostra depois do login, passando o papel do usuário como prop `isAdmin` (main-app/src/App.jsx:5-22). O controle de acesso fica dividido: o host decide se o usuário entra (login) e qual é o papel dele; o remote usa `isAdmin` para decidir se mostra o formulário de inclusão e os botões de exclusão de músicas (music-library/src/MusicLibrary.jsx:41, 84, 95).

Particularidade: o host não aponta para localhost, e sim para um deploy publicado na Netlify (main-app/vite.config.js:11). O snapshot contém a fonte do remote, mas a composição em execução depende do artefato hospedado, que pode ter divergido dela. O remote também roda sozinho e usa MSW para simular a API (music-library/src/main.jsx:10).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | main-app | music-library | host → remote | origem → destino | module-federation | Yes | Yes | main-app/vite.config.js:8-12 (remote `music_library` em `https://astonishing-seahorse-d2decf.netlify.app/assets/remoteEntry.js`); music-library/vite.config.js:8-13 (`name: 'music_library'`, `filename: 'remoteEntry.js'`, expõe `./MusicLibrary`) | main-app/src/App.jsx:5; main-app/src/App.jsx:22 |

## Observações

**1. main-app → music-library.** O nome `music_library` e o módulo `./MusicLibrary` importado pelo host correspondem a music-library/vite.config.js:9-12, por isso o destino é a unidade do snapshot, mesmo com a URL apontando para a Netlify. Ver a leitura sobre a diferença entre a fonte e o artefato publicado.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
