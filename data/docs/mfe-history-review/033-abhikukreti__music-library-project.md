---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
inputs:
  clone: data/samples/mfe-sample-001/repos/abhikukreti__music-library-project
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 033 — abhikukreti/music-library-project

## Leitura do repositório

O histórico até o snapshot tem 6 commits, todos de 2026-07-18, sem merges. As duas aplicações já aparecem no primeiro commit observado, `445c3aa` ("feat: scaffold main-app and music-library with vite"). O último, `4fdce67` ("docs: add README"), acrescenta o README que a revisão de documentação analisou.

A versão inicial de `main-app/vite.config.js` não está disponível (`445c3aa:main-app/vite.config.js` falha por objeto ausente). Para o ponto abaixo, o histórico mostra a ordem dos commits e os arquivos tocados, não o que mudou dentro deles.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README diz que o remote foi publicado antes e que a URL dele foi copiada para o host; o deploy do host não tem artefato | 3.4.7 #5, #6 | introdução da composição | 445c3aa 2026-07-18 feat: scaffold main-app and music-library with vite; 9bb56ac 2026-07-18 feat: point main app to deployed music library remote; 5876ac6 2026-07-18 fix: add CORS headers for federated remote assets | inconclusivo |

## Observações

**1. O README diz que o remote foi publicado antes e que a URL dele foi copiada para o host; o deploy do host não tem artefato.** A sequência de commits é compatível com o relato do README:
- **Primeiro commit:** as duas aplicações já aparecem em `445c3aa`.
- **Configuração do host:** o commit seguinte, `9bb56ac`, altera só `main-app/vite.config.js`, e a mensagem anuncia que o host passou a apontar para o remote "deployed".
- **CORS:** `5876ac6` cria `music-library/public/_headers`, e a mensagem anuncia os cabeçalhos de CORS do remote federado. Isso corresponde aos passos 2 e 4 do README (README.md:33, 35).

A versão anterior do `vite.config.js` não está disponível, e não dá para ver o que ele apontava antes. As publicações na Netlify, inclusive a do host, acontecem fora do repositório e não aparecem no histórico. O histórico confirma a ordem das mudanças de configuração, não a ordem de publicação nem o deploy do host.

## Comandos

```
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project rev-list --count 4fdce67023d92745fe1212c84509efe1054a8a49
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project rev-list --count --merges 4fdce67023d92745fe1212c84509efe1054a8a49
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project log --reverse --format='%h %ad %s' --date=short 4fdce67023d92745fe1212c84509efe1054a8a49
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project show --name-status --format='== %h %s' 445c3aa
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project show --name-status --format='== %h %s' 9bb56ac
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project show --name-status --format='== %h %s' 5876ac6
docs/mfe-history-review/tools/hist.sh abhikukreti__music-library-project show 445c3aa:main-app/vite.config.js   # falha: objeto ausente
```

## Resumo

Commits até o snapshot: 6 (2026-07-18 a 2026-07-18). Pontos: 1 (esclarecido: 0, inconclusivo: 1, resolvido pelo snapshot: 0).
