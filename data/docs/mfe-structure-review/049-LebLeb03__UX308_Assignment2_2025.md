---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-11 (manifesto da raiz, só `wp-pwa` em devDependencies) | — | package.json:9 (`wp-pwa build UX308_Assignment2_2025`, ferramenta externa sem configuração no snapshot) | — | .github/workflows/main.yml:29-30 (`diy-pwa/npm-build-2-gh-pages@v1.11`: npm run build e publicação no gh-pages) | Undetermined | Build e deploy declarados, mas nenhuma entrada de aplicação está no snapshot: só `wp-content/` de um site WordPress, montado pela ferramenta externa. |

## Resumo

Aplicações frontend no snapshot: 0.

## Notas

- O snapshot tem só `wp-content/` (temas, plugins, mu-plugins) de um site WordPress; o núcleo do WordPress e a página inicial vêm da ferramenta `wp-pwa` (package.json:6-9) e não estão no repositório. Os `templates/index.html` dos temas (ex.: `wp-content/themes/twentytwentyfive/templates/index.html:1`) são templates de bloco do WordPress, não entradas de aplicação.
- A classificação registra frontend_units: 2: o site WordPress (host) e o formulário externo `Contact_form_UX308`, publicado em outra origem. A unidade externa está fora do snapshot e não vira linha; o host é a linha `.`, que fica Undetermined por falta de entrada observável. Por isso a contagem é 0.
- A evidência de composição citada pela classificação, `wp-content/database/.ht.sqlite`, não está no snapshot: a normalização a removeu como binário (`normalization.json:21-23`, `preset:binaries`). Não muda esta etapa, que não avalia composição.
- `package.json` aparece como `workspace-config` no `artifacts.csv`, mas não declara `workspaces` (package.json:1-11).
