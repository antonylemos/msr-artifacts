---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

# 049 — LebLeb03/UX308_Assignment2_2025

## Leitura do repositório

O repositório tem três documentos (`artifacts.csv`, tipo `documentation`) além de três `LICENSE.md`/`License.md` de bibliotecas de terceiros. O README da raiz (README.md, em inglês) é o próprio README do template `cd-wordpress` ("continuous deployment wordpress"; README.md:1-2), não customizado pelo autor para o trabalho da disciplina: descreve o comando de desenvolvimento (README.md:4-9), a forma de deploy (README.md:11) e a intenção arquitetural do template, "a consumer of microfrontends... composing work from autonomous teams" (README.md:13,15). Os outros dois documentos são READMEs de plugins de terceiros copiados em `wp-content/`: `wp-content/mu-plugins/one-click-child-theme/README.md`, do plugin WordPress "One-Click Child Theme" (changelog, FAQ e instalação do plugin; menciona "custom elements" só como tag e recurso genérico do plugin, sem afirmação sobre as unidades deste projeto — README.md:6,15, ocorrências `doc-integration-technology`), e `wp-content/plugins/ecommerce-product-catalog/README.md`, README de contribuição do plugin "eCommerce Product Catalog" no GitHub, sem qualquer afirmação sobre a arquitetura deste repositório. Os três `LICENSE.md`/`License.md` (range-slider, formbuilder, fonte Source Serif Pro) são textos de licença (MIT, OFL) de bibliotecas de terceiros, sem afirmação sobre o projeto.

Os comentários e campos descritivos dos artefatos citados pelas revisões anteriores foram lidos: `package.json` da raiz não tem campo `description` (package.json:1-11); o cabeçalho do tema-filho `chatbot` só descreve sua finalidade de negócio, "For intergating chat bot" (wp-content/themes/chatbot/style.css:3), sem afirmação arquitetural; os comentários em `wp-content/plugins/akismet/views/stats.php:10` e `wp-content/plugins/akismet/views/config.php:42` explicam um contorno de cache do Firefox, detalhe interno; o comentário em `wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:568-571` só descreve a geração de arquivos do tema-filho, detalhe interno do plugin. O workflow `.github/workflows/main.yml` tem um comentário que descreve o próprio passo de build e deploy (main.yml:29) e vira linha.

A leitura confirma o que as revisões anteriores já mostraram: o README fala de uma arquitetura de microfrontends que não aparece nos artefatos do snapshot (a composição real, citada pela classificação, estava em `wp-content/database/.ht.sqlite`, removido como binário) nem corresponde às três relações que a revisão de composição encontrou, nenhuma delas chamada de "microfrontend" nos artefatos nem relacionada ao exemplo de PayPal citado no README (as ocorrências de "paypal" fora do README, conferidas por busca no snapshot, estão em código e textos de terceiros sem relação com o exemplo: o plugin de e-commerce, o README e o `readme.txt` do plugin "One-Click Child Theme" — wp-content/mu-plugins/one-click-child-theme/README.md:210, "not even a PayPal link" — e os ícones Font Awesome do tema `resume-kit` — wp-content/themes/resume-kit/assets/css/all.css:831,2946).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | .github/workflows/main.yml:29 | "run npm install, npm run build and publish to gh-pages" | build-deploy | corroborada | 3.4.6 #1; .github/workflows/main.yml:29-30 |
| 2 | README.md:11 | "This will continuously deploy on gh-pages using the diy-pwa/npm-build-2-gh-pages@v1.11 plugin." | build-deploy | corroborada | 3.4.6 #1; .github/workflows/main.yml:29-30; package.json:9 |
| 3 | README.md:11 | "You can also deploy on a cloud provider by running `npm run build`. Your static site will be in the `dist/` folder." | build-deploy | sem corroboração | — |
| 4 | README.md:13 | "The idea of this is as a consumer of microfrontends." | estrutura | parcial | 3.4.5 #1; #2 |
| 5 | README.md:13 | "There is an example microfrontend for paypal standard here." | estrutura | sem corroboração | — |
| 6 | README.md:15 | "Have fun composing work from autonomous teams." | independência | sem corroboração | — |

## Observações

**1. .github/workflows/main.yml:29.** O comentário resume o que o passo seguinte faz: `diy-pwa/npm-build-2-gh-pages@v1.11` (main.yml:30) é a própria action que a revisão de build e deploy registrou como aplicação 1 (3.4.6 #1), com build e deploy `separado`. A afirmação é corroborada pelo artefato que ela mesma comenta, dentro do mesmo arquivo.

**2. README.md:11.** O README repete, com outras palavras, a mesma forma de deploy: publicação contínua no `gh-pages` pela action `diy-pwa/npm-build-2-gh-pages@v1.11`. Casa com o que a revisão de build e deploy encontrou no workflow (.github/workflows/main.yml:29-32) e com o script `build` do `package.json` (package.json:9), citados por ela como aplicação 1 (3.4.6 #1). Corroborada.

**3. README.md:11.** A segunda parte da mesma linha descreve uma alternativa não usada neste repositório: publicar o `dist/` gerado por `npm run build` num provedor de nuvem qualquer. A revisão de build e deploy já observou que não há artefato dessa alternativa no snapshot, e `dist/` é ignorado pelo git (.gitignore:3), então nem o conteúdo do artefato de build é observável. Sem corroboração.

**4. README.md:13.** A primeira frase afirma uma arquitetura geral de consumo de microfrontends. A revisão de composição encontrou duas relações em que o host carrega, por `wp_enqueue_script_module`, bundles de outras origens (3.4.5 #1, #2: wp-content/themes/chatbot/functions.php:14-15), o que corrobora a ideia geral de compor unidades externas. Mas nenhum artefato chama esse mecanismo de "microfrontend", as duas relações ficam com Ativa `Undetermined` (o tema que as carrega não é confirmadamente o ativo) e a terceira relação encontrada (o iframe do Akismet para `tools.akismet.com`, 3.4.5 #3) é uma interface administrativa de terceiros, não uma unidade frontend composta pelo autor. Por isso a afirmação é só parcialmente sustentada.

**5. README.md:13.** A segunda frase, específica, diz haver "aqui" um exemplo de microfrontend para o padrão PayPal, com link para `diy-pwa/paypal-microfrontend`. Nenhum artefato do snapshot menciona esse exemplo: as demais ocorrências de "paypal" estão em código e textos de terceiros — o plugin `ecommerce-product-catalog` (gateway de pagamento), a nota do autor do plugin "One-Click Child Theme" (wp-content/mu-plugins/one-click-child-theme/README.md:210) e as classes de ícone do Font Awesome no tema `resume-kit` (wp-content/themes/resume-kit/assets/css/all.css:831,2946) —, nenhuma relacionada à composição de unidades, e as três relações da revisão de composição (3.4.5 #1-#3) não correspondem a ele. Como é texto herdado do template upstream (a frase não foi adaptada ao trabalho da disciplina), nenhum artefato confirma nem contradiz a existência desse exemplo neste repositório. Sem corroboração.

**6. README.md:15.** "Autonomous teams" é o tema `independência` (padrão de mineração `doc-independence`). As duas relações que levam a unidades fora do snapshot (3.4.5 #1, #2) apontam para bundles publicados em outras origens: `lebleb03.github.io/Assignment_1_UX308/index.js` (wp-content/themes/chatbot/functions.php:14), do mesmo dono deste repositório, e `rhildred.github.io/chatter/fab.js` (wp-content/themes/chatbot/functions.php:15), de outro autor. Uma URL de outro autor não mostra equipes distintas nem autonomia: nenhuma revisão anterior observa esses destinos rodando, sendo desenvolvidos ou evoluindo por conta própria (estão fora do snapshot, e a revisão de build e deploy não os cobre), e nada no snapshot contradiz a frase, herdada do template (README.md:1-2). Sem corroboração.

## Resumo

Afirmações: 6 (corroborada: 2, parcial: 1, contradita: 0, sem corroboração: 3). Temas: (estrutura: 2, build-deploy: 3, independência: 1).
