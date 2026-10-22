---
schema: 1
id: 992844774
full_name: FaduxD/brain-agro
url: https://github.com/FaduxD/brain-agro
commit: 64e626686c86268bfd856cd9e28f8ba472a3977a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 024 — FaduxD/brain-agro

## Contexto

- **Tipo de repositório:** example/proof of concept (teste técnico "Brain Agriculture", `README.md:3`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `client/` (SPA React + Vite) e `server/` (NestJS + Prisma); uma única unidade frontend | contrária |
| Tecnologia | Nenhuma dependência de MFE em `client/package.json` | ausente |
| Configuração | `client/vite.config.ts:5-23`: só `@vitejs/plugin-react`, proxy `/api` e alias de ícones; sem federação | ausente |
| Código-fonte | `client/src/main.tsx:15-22`: um único `createRoot` com `Router` (`client/src/router.tsx`); páginas `home`, `dashboard` e `management` importadas internamente | contrária |
| Código-fonte | Nenhuma ocorrência de `federation`, `single-spa`, `customElements` ou `remoteEntry` | ausente |
| Documentação | `README.md:70`: "Estruture o projeto como um microfrontend (opcional);" no enunciado do teste técnico (requisito opcional, não implementado) | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`client/src/main.tsx:15`) |
| Q2 | No | Não há unidades a comparar |
| Q3 | No | Não há host, shell nem root config |
| Q4 | No | Nenhum mecanismo de composição |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- O frontend é uma SPA React monolítica com backend NestJS.
- "microfrontend" aparece só no enunciado do teste técnico como requisito opcional (`README.md:70`), que o candidato não implementou.
- Corresponde a "conventional frontend monoliths" e a "repositories mentioning micro-frontends without implementing them".

## Notas para análise

- **RQ1 (sinais enganosos):** o termo vem do enunciado copiado no README (texto de terceiros), não de uma decisão do autor. Enunciados de testes técnicos podem aparecer com frequência na amostra.
