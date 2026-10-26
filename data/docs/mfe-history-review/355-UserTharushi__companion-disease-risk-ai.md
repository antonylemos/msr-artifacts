---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
inputs:
  clone: data/samples/mfe-sample-001/repos/UserTharushi__companion-disease-risk-ai
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Leitura do repositório

O histórico alcançável até o snapshot tem 65 commits, de 2026-03-06 (`f3cfb0e`, “Initial commit”) a 2026-08-03 (`373de0e`, “Resolve a clinic's position from its address on save”). A consulta com `--full-history` inclui os ramos mesclados: `1d5c716` (2026-03-25, “project setup”) adiciona configurações e código do shell, enquanto `f1531e1` (2026-04-09, “chore: initial project commit”) incorpora outra árvore inicial que depois é mesclada. Não se deve interpretar o segundo registro de adição como nascimento do mecanismo no projeto inteiro.

A configuração federada do shell tem o mesmo objeto em março, abril e no snapshot; já seu App difere entre março e abril, mas o objeto de abril é idêntico ao do snapshot. Isso delimita a permanência do redirecionamento de auth desde a incorporação de abril, sem permitir ler o estágio de março. Em julho, `3d48ece` (2026-07-18, “feat(web): credentials-only login, trilingual UX fixes, explainability panel”) adiciona os clientes de API de pet-profile e admin e modifica a página de listagem; os três objetos desse commit são iguais aos do snapshot. O registro de arquivos comprova esses marcos, mas não comprova uso operacional, abandono nem extração de aplicações.

O clone permite ler metadados e árvores. As tentativas de abrir o App de março e as versões de abril e julho de CLAUDE.md falharam por conteúdo histórico indisponível, sem buscar objetos. O snapshot já explica o funcionamento atual do redirecionamento e os acessos diretos aos serviços, mas não resolve a origem histórica das afirmações documentais nem o uso anterior de Turbo. As conclusões das etapas 3.4.2–3.4.7 permanecem como registradas.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | Turbo está configurado, mas não há uso por automação observado. | 3.4.2 (package.json:20, turbo `Undetermined`); 3.4.7 #15 | uso de dependência | 1d5c716, 2026-03-25, “project setup”; f1531e1, 2026-04-09, “chore: initial project commit” | inconclusivo |
| 2 | O shell configura auth como remote, mas o alcança por redirecionamento. | 3.4.4 (Notas, apps/shell/vite.config.ts:12 e apps/shell/src/App.tsx:8-15); 3.4.5 #7; 3.4.7 #13 | ativo ou abandonado | 1d5c716, 2026-03-25, “project setup”; f1531e1, 2026-04-09, “chore: initial project commit” | esclarecido |
| 3 | A documentação apresenta auth como todo o frontend em uso e o shell como inerte. | 3.4.7 #2 e #6 | ativo ou abandonado | f1531e1, 2026-04-09, “chore: initial project commit”; 46d7f21, 2026-07-18, “docs: validation methodology, ML reports, verification guide, config”; 869945f, 2026-07-26, “Add relationship-based access control; remove hardcoded/fabricated data”; dcd3623, 2026-07-29, “Bounded inquiry threads, and scope inquiries to the vet they were sent to” | inconclusivo |
| 4 | A descrição de shell e outros MFEs como vazios conflita com rotas e acesso à API. | 3.4.7 #4 | estágios em conflito | f1531e1, 2026-04-09, “chore: initial project commit”; 3d48ece, 2026-07-18, “feat(web): credentials-only login, trilingual UX fixes, explainability panel”; 46d7f21, 2026-07-18, “docs: validation methodology, ML reports, verification guide, config” | inconclusivo |
| 5 | shared-utils é descrito como compartilhado, mas não tem consumidores observados. | 3.4.7 #8 | ativo ou abandonado | 1d5c716, 2026-03-25, “project setup”; f1531e1, 2026-04-09, “chore: initial project commit”; 9ac4ff2, 2026-07-18, “feat(backend): auth enforcement, profile fields, prediction persistence, agent chat, ML validation” | inconclusivo |
| 6 | A generalização de acesso pelo gateway com Bearer conflita com clientes diretos de pet-profile e admin. | 3.4.7 #9 | estágios em conflito | 3d48ece, 2026-07-18, “feat(web): credentials-only login, trilingual UX fixes, explainability panel”; 46d7f21, 2026-07-18, “docs: validation methodology, ML reports, verification guide, config” | inconclusivo |

## Observações

**1. Uso de Turbo.** `package.json` tem o mesmo objeto em março, abril e no snapshot; `turbo.json` muda entre março e abril e tem o mesmo objeto de abril até o snapshot. O histórico completo dos caminhos `.github`, `scripts`, Dockerfiles frontend e Cloud Build não registra workflow em `.github`; os scripts adicionados em julho tratam de ontologia, dados de demonstração, ícones e documentos. Isso não demonstra execução de Turbo em automação nem esclarece se houve uma integração removida em outro caminho. A configuração persistente não basta para decidir uso ou abandono: resultado inconclusivo, mantendo `Undetermined` da 3.4.2.

**2. Auth configurado sem consumo federado.** O mapa federado do shell é o mesmo objeto em `1d5c716`, `f1531e1` e no snapshot. O App de março tem outro objeto e sua leitura falhou; não é possível afirmar como auth era consumido naquele estágio. Já o App incorporado em `f1531e1` é exatamente o objeto atual, cujo conteúdo foi lido no snapshot (apps/shell/src/App.tsx:8-15,44): redireciona para auth e importa os outros seis remotes. Assim, a ausência de consumo federado de auth persiste desde essa incorporação de abril, sem mudanças posteriores nesse arquivo. O ponto fica esclarecido nesse limite: não é configuração que ficou sem consumidor após uma alteração posterior do App em julho. Isso não prova que auth nunca tenha sido federado antes de abril, nem prova abandono; a relação continua `Ativa: No` da 3.4.5.

**3. Uso real concentrado em auth.** CLAUDE.md é adicionado em `f1531e1` e modificado em `46d7f21`, `869945f` e `dcd3623`. As leituras das versões de abril e de 18 de julho falharam. Os metadados não permitem atribuir a nenhum desses commits a frase sobre o frontend em uso, nem confirmar que o shell deixou de ser usado. O código persistente do shell demonstra existência, não operação. As mensagens dos commits anunciam mudanças documentais, de controle de acesso e de conversas, sem provar o estado operacional do frontend. O resultado é inconclusivo.

**4. Scaffolds descritos como vazios.** Os identificadores mostram que o shell já tinha em abril o App atual com rotas e imports. Em `3d48ece`, os clientes de API de pet-profile e admin são adicionados e PetListPage é modificada; seus objetos são os mesmos do snapshot, onde PetListPage busca dados e trata carregamento/erro (apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51). A mensagem anuncia ajustes web, sem detalhar por si só essas implementações. Não se conseguiu ler o CLAUDE.md de abril nem o de `46d7f21`; portanto não é possível estabelecer se a frase “empty scaffolds” antecedeu essas funcionalidades ou foi escrita já em conflito com elas. Os marcos de código são observáveis, mas a explicação do conflito continua inconclusiva; a contradição no snapshot permanece.

**5. Biblioteca sem consumidores observados.** O histórico dos caminhos de shared-utils registra o manifesto e o código em `1d5c716` e na incorporação `f1531e1`; em `9ac4ff2` adiciona-se o tsconfig do pacote. A presença e a preparação para compilação não demonstram consumo por outras unidades. Tampouco o histórico consultado rastreia todos os possíveis consumidores antigos. Não há base para inferir biblioteca abandonada ou compartilhamento anterior; resultado inconclusivo, mantendo a ausência de corroboração da 3.4.7 #8.

**6. Gateway e clientes diretos.** Os clientes de pet-profile e admin são adicionados em `3d48ece`, com os mesmos objetos do snapshot: o primeiro usa por padrão a porta 4002, o segundo a 4003, ambos sem inclusão de Bearer no helper de requisição (apps/mfe-pet-profile/src/lib/api.ts:3-18; apps/mfe-admin/src/lib/api.ts:3-9). Isso comprova que esses clientes diretos persistem desde julho. Porém, as versões antigas de CLAUDE.md não puderam ser lidas; não se sabe quando apareceu a generalização sobre o gateway ou se descrevia exclusivamente auth em um estágio anterior. Não é possível explicar o conflito como documentação desatualizada, intenção ou cópia: resultado inconclusivo, sem alterar a contradição no snapshot.

## Comandos

Todas as revisões históricas abaixo são o snapshot ou ancestrais exibidos pelo log iniciado nele. As três consultas `show` falharam com `fatal: bad object`: os caminhos existem nas árvores, mas os conteúdos históricos não estavam disponíveis. As primeiras tentativas de `rev-list` e dos dois primeiros `log` foram bloqueadas pelo sandbox ao registrar commands.log; foram repetidas com permissão, antes de qualquer acesso ao Git pelo script.

```sh
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai rev-list --count 373de0e6083b86b2707913da037735130c8f5503
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --format='%h %ad %s' --date=short 373de0e6083b86b2707913da037735130c8f5503
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --format='%h %ad %s' --date=short --name-status --no-renames 373de0e6083b86b2707913da037735130c8f5503 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/shell/src/federation.d.ts apps/mfe-auth/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts CLAUDE.md README.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --full-history --format='%h %ad %s' --date=short --name-status --no-renames 373de0e6083b86b2707913da037735130c8f5503 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/shell/src/federation.d.ts apps/mfe-auth/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts CLAUDE.md README.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r 1d5c716 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai show 46d7f21:CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai show 1d5c716:apps/shell/src/App.tsx
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r 373de0e6083b86b2707913da037735130c8f5503 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --full-history --format='%h %ad %s' --date=short --name-status --no-renames 373de0e6083b86b2707913da037735130c8f5503 -- .github scripts infra/gcp/cloudbuild.yaml apps/shell/Dockerfile apps/mfe-auth/Dockerfile packages/shared-utils
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r f1531e1 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai show f1531e1:CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r 3d48ece -- apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts
```

A comparação abaixo foi executada antes e depois das consultas, com igualdade à referência nas duas ocasiões:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 65 (2026-03-06 a 2026-08-03). Pontos: 6 (esclarecido: 1, inconclusivo: 5, resolvido pelo snapshot: 0).
