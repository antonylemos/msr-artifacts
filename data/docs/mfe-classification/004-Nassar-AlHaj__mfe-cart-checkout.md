---
schema: 1
id: 1327208056
full_name: Nassar-AlHaj/mfe-cart-checkout
url: https://github.com/Nassar-AlHaj/mfe-cart-checkout
commit: 6784db74e9121e6b9c459f6997f025c5b5ef0837
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 004 — Nassar-AlHaj/mfe-cart-checkout

## Contexto

- **Abordagem de implementação:** Web Components (custom element `<cart-checkout-app>` com Shadow DOM)
- **Tipo de repositório:** example/proof of concept (parte de um "Microfrontend E-Commerce Project", `package.json:5`)
- **Classificação:** MFE-unit (revisada pelos pesquisadores; a primeira avaliação era Non-MFE)
- **Commit avaliado:** `6784db7` (HEAD do branch padrão `main`), com a implementação observada no branch `origin/feature/cart-checkout-module` (`2674624`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura (`main`) | O `main` tem só 6 arquivos versionados: `README.md`, `package.json`, `vite.config.js`, `index.html`, `eslint.config.js`, `.gitignore`. Não há diretório `src/`. | ausente |
| Código-fonte (`main`) | `index.html:17` referencia `/src/main.jsx`, que não existe no `main` | ausente |
| Tecnologia | `package.json:13-22`: React 19, MUI, Emotion, react-router-dom, react-hook-form; nenhuma dependência de MFE (Web Components é API nativa) | ausente |
| Configuração (`main`) | `vite.config.js:4-10`: comentário "built and deployed independently… later embedded by the shell app" e `base: './'` (intenção) | fraca |
| Código-fonte (branch) | `src/cart-checkout-element.jsx:11` `attachShadow({ mode: 'open' })`; `:25` `createRoot` no shadow root; `:42-43` `customElements.define('cart-checkout-app', …)` com guarda contra registro duplicado | forte |
| Configuração (branch) | `vite.config.js:22-30`: entry adicional `cart-element` → `src/cart-checkout-element.jsx`, com `entryFileNames` estável `assets/cart-element.js` para o shell referenciar uma URL fixa | forte |
| Composição | Nenhum host/shell no repositório; o shell é citado só no README (`README.md:25`, `:103`, `:122`) | ausente |
| Build/deploy | `README.md:8-9`: deploy independente na Vercel (app standalone e entry do Web Component); histórico com "Trigger Vercel deployment" (`fb6cd49`) | moderada |
| Documentação | `README.md:25` descreve o custom element `<cart-checkout-app>`; `:40-47` como carregar o script e registrar o elemento; `:51` Shadow DOM; `:122-126` notas para integradores (shell) | moderada |
| Histórico | O branch `feature/cart-checkout-module` (2026-08-13) contém a implementação; o `main` (`6784db7`, 2026-08-14) é posterior e só tem o setup e o README, indicando um merge não feito | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; nenhuma configuração de composição referencia outras unidades |
| Q2 | Yes (para a unidade) | Entry e build próprios do custom element (`vite.config.js:22-30` no branch); deploy independente na Vercel (`README.md:8-9`) |
| Q3 | Undetermined | O shell que monta o elemento não está no repositório |
| Q4 | Undetermined | O lado exposto está implementado (`customElements.define`), mas o consumidor não é observável |
| Q5 | No | A evidência mostra uma unidade preparada para composição, não uma instância de MFE no repositório |

## Motivo

- A classificação MFE-unit vale para "a single frontend unit explicitly prepared to be composed by an external host (e.g., … exported single-spa lifecycles)". Aqui a preparação é o custom element com Shadow DOM e entry estável para o shell.
- A implementação está no branch `feature/cart-checkout-module`, não no `main`. Os pesquisadores decidiram considerar esse branch: o README do `main` descreve exatamente o que o branch implementa, e a diferença vem de um merge não feito.
- Corresponde ao caso "MFE-unit: repositories containing only a remote unit, without the composing host".

## Decisão registrada

- **Primeira avaliação:** Non-MFE, considerando só o snapshot do branch padrão (seção 3.3 do protocolo) e usando o histórico só para resolver ambiguidades (seção 3.4.8, revisão histórica).
- **Decisão dos pesquisadores:** MFE-unit, considerando a implementação no branch não padrão.
- **Sugestão de regra para o checklist:** "quando o branch padrão só contém scaffolding e a documentação descreve uma implementação presente em outro branch do mesmo repositório, avaliar esse branch e registrar o commit usado".
