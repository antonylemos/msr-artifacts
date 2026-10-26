---
schema: 1
id: 1240812323
full_name: sora-ot/annotation-platform
url: https://github.com/sora-ot/annotation-platform
commit: 51ee5b4f90475153e71c1496cdb8f17622a06312
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: production
approaches: [iframe]
ui_technologies: [vue, react]
build_tools: []
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 054 — sora-ot/annotation-platform

## Contexto

- **Abordagem de implementação:** portal Vue (`baseApp`) que integra ferramentas de anotação de terceiros (Xtreme1 e Label Studio) por **iframe** com handoff de autenticação; qiankun configurado, mas desativado e sem sub-app compatível
- **Tipo de repositório:** production-oriented / proof of concept (plataforma de anotação 2D/3D que agrega ferramentas open-source vendorizadas; 8.068 arquivos em um único commit)
- **Classificação:** Uncertain (depende da decisão sobre iframe; com a regra sugerida no 031, passa a MFE-implemented)
- **Commit avaliado:** `51ee5b4` (único commit, "first_commit")

O repositório agrega: `baseApp/` (portal Vue 3 + Vite, autoral), `baseApp-backend/`, cópias vendorizadas de `xtreme1-main/` (Xtreme1, ferramenta de anotação 3D) e `ls-test/` (Label Studio), além de projetos Python de ML (`OpenPCDet/`, `3d-detection/`, `label-studio-ml-backend/`, `sam2/`, `yolo_test/`).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `baseApp/package.json:16`: `qiankun` ^2.10.16 | fraca |
| Configuração (qiankun) | `baseApp/src/main.ts:8-56`: `registerMicroApps([{ name: 'xtreme1', entry: '//localhost:3100', container: '#subapp-container', activeRule: '/xtreme' }])` + `start()`, **só se** `VITE_ENABLE_QIANKUN === 'true'` (`:8-9`); nenhum `.env` versionado ativa a flag; o container `#subapp-container` não existe em nenhum template; `xtreme1-main/` não tem lifecycles qiankun nem `__POWERED_BY_QIANKUN__` (configuração inativa) | ambígua |
| Composição (iframe) | `baseApp/src/components/XtremeHostPanel.vue:15-18` e `baseApp/src/views/XtremeStandalone.vue:3,19`: `<iframe :src="xtremeFrameUrl">`, URL calculada a partir da rota (`xtremePath` e query repassados, `XtremeHostPanel.vue:34-50`); `baseApp/src/router/index.ts:61-75`: rotas `/xtreme`, `/xtreme1-main` e `/labelstudio` | moderada |
| Código-fonte (contrato com as unidades) | `baseApp/src/utils/xtremeAuth.ts:1-3,80-100`: grava/limpa o token do Xtreme1 em cookie (`baseapp_xtreme_token`, chaves legadas), handoff de autenticação; `baseApp/src/utils/labelStudioUrl.ts:62-115`: monta URLs do Label Studio via proxy (`VITE_LABEL_STUDIO_BASE_PATH`) a partir de "jumps" de tarefas (contrato de integração) | moderada |
| Estrutura | Três frontends: `baseApp/` (autoral), `xtreme1-main/` (frontend próprio) e `ls-test/web/` (Label Studio, monorepo com `libs/editor`, `libs/datamanager` etc.); cada um com build próprio; nenhum import de código-fonte entre eles (unidades independentes) | forte |
| Build/deploy | `baseApp/docker-compose.yml:1-3`: nginx; Xtreme1 e Label Studio rodam como serviços próprios (porta 3100, proxy do Label Studio) | moderada |
| Documentação | `baseApp/README.md`: boilerplate do Vue/Vite; nenhuma descrição da arquitetura | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `baseApp` (portal) + Xtreme1 e Label Studio (frontends próprios, no repositório e servidos separadamente) |
| Q2 | Yes | Builds e serviços separados; sem import de código-fonte entre o portal e as ferramentas |
| Q3 | Yes | O portal roteia `/xtreme` e `/labelstudio` para views que embutem as ferramentas (`router/index.ts:61-75`) |
| Q4 | **Undetermined** | O mecanismo efetivo é iframe com contrato (token em cookie, rota/query repassadas): decisão em aberto. O qiankun está configurado mas inativo (flag desligada, container inexistente, sub-app sem lifecycles), o que pelo critério operacional é "configuration whose actual use is unclear" ou "unused or experimental" |
| Q5 | Undetermined | Depende da decisão sobre iframe |

## Motivo

- Nenhuma resposta é No e Q4 é Undetermined, o que leva a **Uncertain**.
- Com a regra sugerida no repositório 031 ("iframe conta quando há contrato explícito com o host"), Q4 passaria a Yes: há handoff de autenticação (`xtremeAuth.ts`), repasse de rota/query para a ferramenta embutida e proxy configurado para o Label Studio. Nesse caso, **MFE-implemented**.
- O qiankun é evidência de tecnologia sem uso efetivo: provavelmente uma tentativa de integração abandonada em favor do iframe (Xtreme1 não foi adaptado como sub-app).

## Notas para análise

- **RQ1 (sinais enganosos):** dependência de qiankun + `registerMicroApps` no código, mas inativos; a composição real é iframe. Uma análise só por dependências classificaria errado.
- **Protocolo (corpus):** se incluído, restringir a mineração a `baseApp/` e aos pontos de integração; o restante (8 mil arquivos de ML e ferramentas vendorizadas) é ruído.

## Decisão registrada

Manter **Uncertain**. Embora o portal integre Xtreme1 e Label Studio por iframe com handoff de autenticação, a integração Qiankun está desativada e a decisão do protocolo sobre iframe como mecanismo de composição MFE não foi resolvida para este caso. As ferramentas integradas também são produtos de terceiros vendorizados, o que preserva a ambiguidade entre composição MFE e integração de aplicações.
