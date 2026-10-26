---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 033 — abhikukreti/music-library-project

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | main-app/src/App.jsx:5 | main-app | dynamic-loading | Yes | React.lazy importa music_library/MusicLibrary em main-app/src/App.jsx:5; o componente remoto é montado após login em main-app/src/App.jsx:21-23 e App é iniciado por main-app/src/main.jsx:6-14. |
| src-cross-unit-communication | music-library/public/mockServiceWorker.js:312 | music-library | none | No | music-library/public/mockServiceWorker.js:291-318 é código gerado do MSW que troca mensagens com seu cliente para simular requests; client.postMessage não comunica duas unidades frontend. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | main-app/src/App.jsx:22 | main-app | runtime-composition | Yes | Renderiza o componente remoto MusicLibrary e passa o papel isAdmin do host (main-app/src/App.jsx:8-22); o componente é resolvido pelo import em main-app/src/App.jsx:5. |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- A ocorrência em arquivo gerado do MSW foi mantida na primeira tabela, como exige matches.csv, mas não representa comunicação entre unidades. Arquivos gerados foram excluídos das buscas adicionais.
- O import de ./mocks/browser em music-library/src/main.jsx:10 é local à unidade. A entrada de composição usa o componente exposto, enquanto music-library/src/App.jsx:4 é sua montagem standalone interna.
- A cadeia do host é main-app/index.html:11 → main-app/src/main.jsx:6-14 → main-app/src/App.jsx:5-22. Não há ponto de dúvida no código observado.
- Pelo critério de construções fora da mineração (passo 4 do método), ficam fora da tabela a prop `isAdmin` lida em music-library/src/MusicLibrary.jsx:8 (passada em main-app/src/App.jsx:22) e o export do componente em music-library/src/MusicLibrary.jsx:104, exposto em music-library/vite.config.js:11-12.
