---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
inputs:
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

## Leitura do repositório

A documentação é o README da raiz, em inglês, curto e direto. Ele descreve a divisão em duas aplicações ligadas por Module Federation, os endereços publicados, o deploy em dois sites Netlify, o padrão de micro-frontend, a passagem do papel do usuário ao remote e as escolhas feitas ("Tradeoffs"). Os READMEs de `main-app/` e `music-library/` são templates do Vite (main-app/README.md:1-3).

Foram lidos os artefatos que as revisões anteriores citam: as configurações Vite, os `package.json`, os `index.html`, os `main.jsx`, `main-app/src/App.jsx`, `music-library/src/App.jsx` e `music-library/src/MusicLibrary.jsx`, além do `_headers`. Nenhum tem comentário sobre a arquitetura.

O README confere com as revisões anteriores em quase tudo. O que ele acrescenta, e o snapshot não confirma inteiramente, é o deploy do host: a revisão de build e deploy decidiu que esse trecho, sozinho, não sustenta a coluna Deploy, e aqui ele entra como afirmação `parcial`. A ordem em que os sites foram publicados também é só relato.

Ficaram fora da tabela:
- a observação de que o remote precisa rodar com `build` + `preview`, porque o servidor de desenvolvimento não gera o `remoteEntry.js` (README.md:22). É comportamento do plugin, dado como instrução de execução;
- o uso do MSW para simular a API dentro do remote (README.md:46), um detalhe interno da unidade;
- o que o remote faz com o papel recebido: só mostra inclusão e exclusão de músicas para administradores (README.md:41; music-library/src/MusicLibrary.jsx:41, 84, 95), um detalhe interno da unidade;
- as melhorias anunciadas para o futuro ("With more time", README.md:49): tratamento de falha na carga do remote e estilos compartilhados. São intenções, não descrição do snapshot.

Ocorrências `doc-*` que não viraram linha: README.md:37, título da seção "Micro Frontend". README.md:3 está na afirmação 1.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "React app split into two parts (main app + music library) connected via Module Federation" | estrutura | corroborada | 3.4.3 (main-app e music-library `Yes`); 3.4.2 (module-federation configurado); 3.4.5 #1 |
| 2 | README.md:6 | "Main App: https://fluffy-pika-9e723b.netlify.app" (endereço publicado do host) | build-deploy | sem corroboração | — |
| 3 | README.md:7 | "Music Library (remote): https://astonishing-seahorse-d2decf.netlify.app" (endereço publicado do remote) | build-deploy | corroborada | 3.4.6 #2; main-app/vite.config.js:11 |
| 4 | README.md:31 | "Both apps in one repo" (as duas aplicações estão no mesmo repositório) | estrutura | corroborada | 3.4.3; main-app/package.json:1-11; music-library/package.json:1-11 |
| 5 | README.md:31 | "deployed as 2 separate Netlify sites" | build-deploy | parcial | 3.4.6 #1 (`não observado`) e #2 (`separado`); music-library/public/_headers:1-2 |
| 6 | README.md:32, 34 | "Deployed music-library first […] Deployed main-app same way" (o remote foi publicado antes do host) | build-deploy | sem corroboração | — |
| 7 | README.md:33 | "Copied its live remoteEntry.js URL into main-app's vite.config.js" (a configuração do host tem a URL publicada do remote) | build-deploy | corroborada | main-app/vite.config.js:10-12 |
| 8 | README.md:35 | "Added _headers file in music-library/public with CORS headers, since remote loads from a different domain" | build-deploy | corroborada | music-library/public/_headers:1-2; main-app/vite.config.js:11 |
| 9 | README.md:38 | "music-library exposes MusicLibrary.jsx using @originjs/vite-plugin-federation, generating remoteEntry.js on build. main-app lazy loads it using React lazy() and Suspense." | composição | corroborada | 3.4.5 #1; music-library/vite.config.js:8-13; main-app/src/App.jsx:5, 21-23 |
| 10 | README.md:41 | "Role is passed to the remote as a plain prop (isAdmin)." | composição | corroborada | main-app/src/App.jsx:22 |

## Observações

**1. README.md:3.** São duas aplicações Vite, cada uma com seu manifesto e build, ligadas por `@originjs/vite-plugin-federation`, com host e remote configurados.

**2. README.md:6.** O endereço do host não aparece em nenhuma configuração do snapshot. Só o README o registra.

**3. README.md:7.** O endereço do remote é o mesmo que o host usa para buscar o `remoteEntry.js` (main-app/vite.config.js:11), o que confirma que o remote é servido nesse domínio.

**4. README.md:31.** As duas aplicações estão em pastas próprias do mesmo repositório, sem workspace.

**5. README.md:31.** O deploy separado se confirma para o remote: domínio próprio na configuração do host e `_headers` da Netlify. Para o host, não há artefato de hospedagem no snapshot, o que a revisão de build e deploy registrou como `não observado`. A afirmação é `parcial`: a parte do remote se confirma, e a do host fica sem artefato.

**6. README.md:32, 34.** A ordem em que os dois sites foram publicados é um relato do autor. O snapshot não tem registro de publicação que a confirme ou a desminta.

**7. README.md:33.** A URL publicada do remote está fixa na configuração do host (main-app/vite.config.js:10-12). Para trocar o endereço do remote, é preciso reconstruir o host.

**8. README.md:35.** O `_headers` libera CORS em `/assets/*`, onde fica o `remoteEntry.js`. Isso é necessário porque host e remote têm domínios diferentes (README.md:6-7; main-app/vite.config.js:11).

**9. README.md:38.** O remote expõe `./MusicLibrary` a partir de `./src/MusicLibrary.jsx`, e o host o carrega com `lazy(() => import('music_library/MusicLibrary'))` dentro de um `Suspense`.

**10. README.md:41.** O host passa `isAdmin` como prop ao componente remoto. É o único contrato de dados entre as duas aplicações, e o README repete a escolha na seção "Tradeoffs": "Used prop-passing for auth instead of a shared auth module" (README.md:49). Não há biblioteca comum de autenticação no snapshot.

## Resumo

Afirmações: 10 (corroborada: 7, parcial: 1, contradita: 0, sem corroboração: 2). Temas: (estrutura: 2, composição: 2, build-deploy: 6).
