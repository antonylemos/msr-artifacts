---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
inputs:
  clone: data/samples/mfe-sample-001/repos/anish0714__devpulse-mfe
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Leitura do repositório

O histórico até o snapshot tem 20 commits, de 2026-09-01 a 2026-09-07, com 7 merges de pull requests. O primeiro commit é `310dc85` (2026-09-01, "Initial commit: DevPulse micro-frontend showcase"), e o do snapshot é `6a2348d` (2026-09-07, "Merge pull request #11 from anish0714/redesign/terminal-theme"). Todos os commits salvo os dois últimos são do mesmo dia.

Os marcos que importam aos pontos: a mensagem do primeiro commit anuncia um shell com dois remotes de demonstração (`analytics-remote` e `notes-remote`) e um CI/CD que "assembles a single GitHub Pages deployment". `d31bfed` (2026-09-01, "Split CI/CD into per-package CI checks and a main-only deploy pipeline (#1)") cria o `ci.yml` e altera o `deploy.yml`; `f4321e2` (2026-09-01, "Consolidate remotes into pdf-conversion and pdf-manipulation tools (#2)") troca os remotes de demonstração pelos dois de PDF e ajusta os dois workflows. Os outros três remotes aparecem depois, um por commit: `25e6a9b` (dev-utils), `5062d12` (formulários PDF) e `fcca491` (OCR), todos de 2026-09-01.

O que o clone permite ver: as mensagens, os arquivos tocados por commit e os identificadores dos objetos de cada versão. O conteúdo antigo só está disponível em parte: as versões dos workflows de `f4321e2` (as mesmas do snapshot) e de `25e6a9b` puderam ser lidas; as do primeiro commit e de `d31bfed`, e todas as versões anteriores do `README.md`, não estão no clone. Por isso não se sabe em que commit as frases do README discutidas abaixo apareceram.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README diz que as unidades são "independently deployed", mas o único workflow de deploy publica tudo num site só. | 3.4.7 #2 | estágios em conflito | 310dc85 2026-09-01 Initial commit: DevPulse micro-frontend showcase; f4321e2 2026-09-01 Consolidate remotes into pdf-conversion and pdf-manipulation tools (#2); 25e6a9b 2026-09-01 Add Dev Utils remote: JSON, Base64/URL, UUID/hash, and a regex tester | esclarecido |
| 2 | O README descreve CI e site com os seis pacotes, mas os workflows só cobrem o shell e os remotes de conversão e manipulação PDF. | 3.4.7 #7, #15, #17 | estágios em conflito | f4321e2 2026-09-01 Consolidate remotes into pdf-conversion and pdf-manipulation tools (#2); 25e6a9b 2026-09-01 Add Dev Utils remote: JSON, Base64/URL, UUID/hash, and a regex tester; d0b0a84 2026-09-01 Revert workflow-file edits (push blocked without workflow OAuth scope); 5062d12 2026-09-01 Add PDF Form Filler remote: fill real interactive AcroForm fields; fcca491 2026-09-01 Add OCR remote: extract text from images or scanned PDFs (tesseract.js) | esclarecido |

## Observações

**1. Deploy "independently deployed".** A mensagem do primeiro commit (`310dc85`) já anuncia um CI/CD que constrói tudo e "assembles a single GitHub Pages deployment (shell at the root, remotes under /remotes/<name>/)". As duas versões do `deploy.yml` que puderam ser lidas, a de `f4321e2` (a mesma do snapshot, objeto `ea6a2e7`) e a de `25e6a9b`, montam um único diretório `site` e o publicam num único artefato do Pages; a de `25e6a9b` só acrescenta a cópia do `dist` de dev-utils. A mensagem de `d31bfed` fala em separar o deploy da validação de pull requests ("deploy.yml is now deploy-only"), não em separar o deploy por pacote. O conteúdo do `deploy.yml` do primeiro commit e de `d31bfed` não está no clone, e nenhuma versão antiga do README pôde ser lida, então não se sabe quando a frase apareceu. Conclusão, delimitada ao que foi lido: não há, nas versões observáveis nem nas mensagens, um estágio com deploy por unidade; a frase do README descreve a arquitetura pretendida, não um estado anterior do repositório que tenha sido abandonado.

**2. Pacotes fora do CI e do site.** `25e6a9b` altera `ci.yml`, `deploy.yml` e `README.md`; a versão lida dos workflows desse commit põe `dev-utils-remote` na matriz do CI e copia o seu `dist` para `site/remotes/dev-utils/`. O commit seguinte, `d0b0a84`, devolve os dois workflows aos objetos de `f4321e2` (`65ce162` para o `ci.yml`, `ea6a2e7` para o `deploy.yml`), e a mensagem explica: "push blocked without workflow OAuth scope" e "ci.yml and deploy.yml still need the dev-utils-remote matrix entry and deploy path added manually". As mensagens de `5062d12` e `fcca491` anunciam que esses commits atualizam o README mas não tocam os workflows, pela mesma limitação, e chamam formulários PDF e OCR de segundo e terceiro remotes "pending that follow-up". Nenhum commit posterior até o snapshot toca `.github/`, e os objetos dos dois workflows no snapshot são os de `f4321e2`. O conteúdo das versões antigas do README não está no clone; o que se sabe dele vem das mensagens. Conclusão: os workflows do snapshot são os do estágio com shell e dois remotes, e o README descreve o estágio seguinte, com seis pacotes; a ligação dos três remotes ao CI e ao deploy foi planejada e não chegou a ser feita até o snapshot, por um bloqueio de permissão no push, e não por abandono.

## Comandos

```
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe rev-list --count 6a2348d162b34030505554ab0ef954577627999a
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe log --format='%h %ad %s' --date=short --reverse 6a2348d162b34030505554ab0ef954577627999a
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe log --format='%h %ad %s' --date=short --name-status 6a2348d162b34030505554ab0ef954577627999a -- .github README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short d0b0a84
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short 25e6a9b
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short d31bfed
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short f4321e2   # falhou: objeto ausente (could not fetch 613b75b…)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short 310dc85
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short 5062d12
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show -s --format='--- %h %ad%n%B' --date=short fcca491
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 310dc85 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r d31bfed -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r f4321e2 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r ec611f4 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 25e6a9b -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r d0b0a84 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 16ca753 -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe ls-tree -r 6a2348d -- .github/workflows README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe log --format='--- %h %ad%n%B' --date=short f4321e2
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 25e6a9b:.github/workflows/deploy.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 25e6a9b:.github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 310dc85:.github/workflows/deploy.yml   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 310dc85:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:.github/workflows/deploy.yml   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show f4321e2:.github/workflows/deploy.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show f4321e2:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show ec611f4:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 25e6a9b:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 5062d12:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show fcca491:README.md   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show 6a2348d:README.md
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:.github/workflows/deploy.yml   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show d31bfed:.github/workflows/ci.yml   # falhou: objeto ausente (bad object)
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe show f4321e2:.github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh anish0714__devpulse-mfe rev-list --count --merges 6a2348d162b34030505554ab0ef954577627999a
```

## Resumo

Commits até o snapshot: 20 (2026-09-01 a 2026-09-07). Pontos: 2 (esclarecido: 2, inconclusivo: 0, resolvido pelo snapshot: 0).
