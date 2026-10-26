---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
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

# 355 — UserTharushi/companion-disease-risk-ai

## Leitura do repositório

Foram lidos integralmente os onze documentos `.md` classificados como `documentation`: CLAUDE.md, README.md, backend/services/nodejs/clinic-service/src/models/README.md, backend/services/nodejs/vaccination-service/src/routes/README.md, data/README.md, docs/INTERIM_REPORT.md, docs/PROGRESS_REPORT.md, docs/REQUIREMENTS.md, docs/VERIFICATION.md, docs/ml/README.md e ontology/neo4j/README.md. São textos em inglês, próprios do projeto; não há README padrão de ferramenta nessa lista. Os dois READMEs internos de serviços são descrições breves de modelos e rotas, sem afirmação sobre as unidades frontend. Os documentos de dados, ML e ontologia tratam dos modelos e serviços de apoio, sem afirmação de composição entre frontends. O relatório intermediário contém figuras referenciadas; também foram abertas as fontes textuais do diagrama de fluxo de dados e da arquitetura (docs/diagrams/src/fig04-dfd.mmd:1-38; docs/diagrams/src/fig06-architecture.mmd:1-35). O primeiro representa processos e dados, sem fronteiras entre aplicações frontend; o segundo representa o cliente PWA na porta 3001 ligado ao gateway, repetindo a afirmação 16.

As revisões 3.4.2–3.4.6 estão `final`, com ID e commit iguais aos da classificação e da aquisição. A documentação combina a descrição de monorepo com micro-frontends federados (CLAUDE.md:7; README.md:7) com a informação de que a aplicação usada é concentrada em `mfe-auth`, enquanto o shell e os demais MFEs são scaffold (CLAUDE.md:56-58; README.md:80; docs/PROGRESS_REPORT.md:26-30). Isso contextualiza a maturidade sem eliminar as seis relações federadas ativas no código da revisão 3.4.5. O snapshot confirma a concentração de rotas funcionais em `mfe-auth` (apps/mfe-auth/src/App.tsx:23-70) e a configuração federada do shell (apps/shell/vite.config.ts:9-21; apps/shell/src/App.tsx:18-23). Não comprova uso efetivo em ambiente publicado. A qualificação de todos os outros MFEs como vazios é excessiva: `mfe-pet-profile` implementa listagem e acesso à API (apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51).

Foram lidos comentários e campos descritivos dos artefatos citados nas cinco revisões: manifestos da raiz, apps, serviços Node e pacotes compartilhados; turbo.json; configurações Vite dos oito apps; suas entradas; apps/shell/src/App.tsx, apps/shell/src/layouts/ShellLayout.tsx e apps/shell/src/federation.d.ts; apps/mfe-auth/src/lib/auth-api.ts e apps/mfe-auth/src/lib/session.ts; Dockerfiles dos dois frontends e dos serviços; docker-compose.yml; e o código gerado do PWA citado na revisão de fonte. As afirmações arquiteturais dos comentários estão nas linhas 12–14 da tabela. Os comentários de instalação/cópia dos Dockerfiles (apps/shell/Dockerfile:5-11; apps/mfe-auth/Dockerfile:5-11), as descrições de produto dos manifests PWA (apps/shell/vite.config.ts:28; apps/mfe-auth/vite.config.ts:25), os títulos dos serviços do compose e seus comentários sobre a inicialização do Neo4j (docker-compose.yml:213-217) não acrescentam afirmações sobre composição de unidades. As notas de sessão e autenticação são internas a uma unidade; o código gerado de Workbox trata do service worker da própria aplicação, conforme a revisão 3.4.4.

Ocorrências `doc-*` que não viraram linha própria:

- CLAUDE.md:27: comando para executar um workspace; CLAUDE.md:116: localização do disclaimer, requisito interno da interface. CLAUDE.md:92 trata da autonomia dos agentes backend.
- README.md:20-26: nomes da árvore de pastas, reunidos na afirmação 11; README.md:80 repete as afirmações 2 e 4, com a expressão menos absoluta “scaffold”.
- docs/INTERIM_REPORT.md:138 é a expansão de uma sigla. As ocorrências de `doc-independence` em docs/INTERIM_REPORT.md:163, 172, 189, 199, 243, 263, 283, 285, 299, 304, 314, 333, 458, 500, 518, 524, 532, 627, 716, 765, 832, 854, 857, 873, 881 tratam de autonomia de IA, independência de explicações/validação ou planejamento de pesquisa, não da independência dos frontends.
- docs/PROGRESS_REPORT.md:26-30 repete a concentração em `mfe-auth` da afirmação 2 e a ligação ao gateway da 16. As ocorrências em :38, :67, :107, :142 e :169 dizem respeito ao agente de monitoramento.
- docs/REQUIREMENTS.md:90 repete a caracterização de monorepo com frontend PWA e microsserviços das afirmações 1 e 16. As ocorrências em :11, :22, :48, :51 e :99 tratam de agentes autônomos.
- docs/VERIFICATION.md:32-33 são comandos de build/typecheck em bloco de código; não geram linha conforme o procedimento da etapa. A coordenação de build também é descrita em prosa em docs/INTERIM_REPORT.md:462, afirmação 15. docs/VERIFICATION.md:105 e docs/ml/README.md:100 referem-se ao monitoramento backend.

Os blocos de instalação, testes e execução, inclusive “Start all local containers” (README.md:67-71) e a reprodução por Compose (docs/INTERIM_REPORT.md:1012), são instruções de execução. As alegações de verificações bem-sucedidas (docs/PROGRESS_REPORT.md:130-136) relatam testes, sem demonstrar separação de deploy entre unidades. As menções genéricas a GCP/Firebase (CLAUDE.md:103-106; README.md:12-13, :48-50) não identificam hospedagem de um frontend: o Cloud Build só lista imagens backend (infra/gcp/cloudbuild.yaml:1-59), como já registra a revisão 3.4.6. Não foram convertidas em uma alegação de deploy independente dos MFEs. O suporte mobile/PWA, idiomas e funcionalidades de negócio contextualizam a aplicação, sem equivaler a autonomia entre unidades.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | CLAUDE.md:7 | "Monorepo with React micro-frontends, Node.js microservices, Python ML/agent services" | estrutura | corroborada | 3.4.3 (Workspace e Unidades); package.json:5-10 |
| 2 | CLAUDE.md:56 | "apps/mfe-auth […] is the entire live front end […] the application monolith" | estrutura | parcial | apps/mfe-auth/src/App.tsx:23-70; 3.4.5 #7; 3.4.6 #2 |
| 3 | CLAUDE.md:58 | "apps/shell […] the Module Federation host, remotes map in apps/shell/vite.config.ts" | composição | corroborada | 3.4.5 #1-7; apps/shell/vite.config.ts:9-21 |
| 4 | CLAUDE.md:58 | "The other MFEs […] and apps/shell […] are empty scaffolds" | estrutura | contradita | apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51; apps/shell/src/App.tsx:18-54 |
| 5 | CLAUDE.md:62 | "Shared libs react, react-dom, react-router-dom, zustand are declared federated shared deps" | composição | corroborada | apps/shell/vite.config.ts:20; apps/mfe-auth/vite.config.ts:17; apps/mfe-pet-profile/vite.config.ts:17 |
| 6 | CLAUDE.md:62 | "inert while the shell is unused" | composição | sem corroboração | — |
| 7 | CLAUDE.md:95 | "packages/shared-types — canonical TypeScript interfaces" | composição | corroborada | apps/mfe-auth/src/lib/clinic-api.ts:1; apps/mfe-pet-profile/src/lib/api.ts:1; apps/mfe-admin/src/lib/api.ts:1 |
| 8 | CLAUDE.md:96 | "packages/shared-utils — shared utility functions" | composição | sem corroboração | — |
| 9 | CLAUDE.md:115 | "frontends call everything through the gateway (:4000) with Authorization: Bearer <jwt>" | composição | contradita | apps/mfe-auth/src/lib/clinic-api.ts:3-14; apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-pet-profile/src/lib/api.ts:3-18; apps/mfe-admin/src/lib/api.ts:3-9 |
| 10 | README.md:7 | "Frontend: React + Tailwind + Module Federation micro-frontends + PWA" | composição | corroborada | 3.4.2 (module-federation configurado nos oito apps); 3.4.5 #1-6; apps/shell/vite.config.ts:9-54; apps/mfe-auth/vite.config.ts:9-50 |
| 11 | README.md:18-26 | "apps/ […] shell/ […] mfe-auth/ […] mfe-admin/" (árvore com shell e sete apps mfe-*) | estrutura | corroborada | 3.4.3 (oito unidades frontend em apps/); apps/shell/vite.config.ts:10-18; apps/mfe-auth/package.json:2; apps/mfe-pet-profile/package.json:2 |
| 12 | apps/mfe-auth/vite.config.ts:47-48 | "The container serves vite dev, so enable the SW there too" | build-deploy | corroborada | 3.4.6 #2; apps/mfe-auth/Dockerfile:15; apps/mfe-auth/package.json:7; apps/mfe-auth/vite.config.ts:49 |
| 13 | apps/shell/src/App.tsx:8 | "Auth MFE runs standalone at localhost:3001 – redirect to it instead of federating" | independência | corroborada | 3.4.5 #7; apps/shell/src/App.tsx:9-14,44; apps/mfe-auth/Dockerfile:15; docker-compose.yml:24-32 |
| 14 | apps/shell/src/App.tsx:17 | "Lazy MFE Imports (Module Federation)" | composição | corroborada | 3.4.4 (seis src-remote-import); 3.4.5 #1-6; apps/shell/src/App.tsx:18-23,47-54 |
| 15 | docs/INTERIM_REPORT.md:462 | "Turborepo, npm workspaces […] Coordinated builds across services" | build-deploy | corroborada | 3.4.6 (Leitura e aplicações #1-8); package.json:5-13; turbo.json:5-9 |
| 16 | docs/INTERIM_REPORT.md:504 | "microservice architecture behind an API gateway, with a React PWA client" | composição | corroborada | apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-auth/src/lib/clinic-api.ts:3-14; apps/mfe-auth/vite.config.ts:19-50; docker-compose.yml:35-61 |

## Observações

**1. CLAUDE.md:7.** A raiz reúne apps, serviços e pacotes por workspaces npm (package.json:5-10). A revisão 3.4.3 distingue oito aplicações frontend dos serviços Node/Python e das bibliotecas. A formulação reaparece no README.md:3 e em docs/REQUIREMENTS.md:90. Trata-se da organização do repositório; a tecnologia específica de composição é examinada na afirmação 10.

**2. CLAUDE.md:56.** `mfe-auth` concentra autenticação, onboarding, três painéis por papel e as rotas de sintomas/resultados (apps/mfe-auth/src/App.tsx:23-70), sem depender de um import federado do shell. README.md:80 e docs/PROGRESS_REPORT.md:26-30 repetem essa centralidade. A parte “live” é relato de uso, sem prova de ambiente ativo no snapshot; a revisão 3.4.6 #2 registra deploy não observado. Por isso a afirmação é parcial. A expressão monólito descreve essa aplicação funcional, sem negar as demais unidades da revisão 3.4.3.

**3. CLAUDE.md:58.** O host declara sete remotes (apps/shell/vite.config.ts:11-19). Seis são consumidos por imports no shell; auth permanece relação apenas configurada (3.4.5 #1-7). A afirmação identifica corretamente o papel do shell e a localização do mapa, sem dizer que todos os remotes são carregados.

**4. CLAUDE.md:58.** Há placeholders, por exemplo apps/mfe-symptom-checker/src/pages/ChatbotPage.tsx:1-8, mas “empty” não descreve todos os demais MFEs. `mfe-pet-profile` busca pets e apresenta estados de carregamento/erro, enquanto seu cliente implementa listagem, consulta, criação, atualização e exclusão (apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51). O shell também tem imports e rotas reais (apps/shell/src/App.tsx:18-54). O README.md:80 só chama essa parte de scaffold, formulação compatível com maturidade limitada; isso não corrige a afirmação mais forte de vazio em CLAUDE.md.

**5. CLAUDE.md:62.** A lista declarada é exatamente a mesma no shell e nos remotes abertos (apps/shell/vite.config.ts:20; apps/mfe-auth/vite.config.ts:17; apps/mfe-pet-profile/vite.config.ts:17). A declaração de dependências federadas compartilhadas é corroborada pelas configurações. A afirmação é sobre essa declaração; não prova que os quatro pacotes sejam efetivamente usados por duas unidades.

**6. CLAUDE.md:62.** A conclusão de que a federação permanece inerte porque o shell não é usado depende de informação operacional ausente no snapshot e fica sem corroboração. Existem consumidores no código (apps/shell/src/App.tsx:18-23), mas sua presença não confirma nem contradiz a alegação de ausência de uso real do shell.

**7. CLAUDE.md:95.** O caráter comum dos tipos é confirmado por imports de ao menos três unidades (apps/mfe-auth/src/lib/clinic-api.ts:1; apps/mfe-pet-profile/src/lib/api.ts:1; apps/mfe-admin/src/lib/api.ts:1). A frase seguinte, “All services should import”, é recomendação, não comprovação de adesão de todos os serviços. O compartilhamento entre frontends é observado em tempo de compilação, por `import type`.

**8. CLAUDE.md:96.** Existem funções utilitárias implementadas (packages/shared-utils/src/index.ts:4-88), mas a busca por `shared-utils` no snapshot, excluído o lockfile, encontrou apenas o nome do próprio pacote e a árvore do README. Não há consumidores de duas unidades. A existência da biblioteca não sustenta a propriedade “shared”; não há artefato de consumo que a confirme, nem artefato que demonstre uso contrário. A menção em README.md:43 repete o nome na árvore, sem acrescentar uso.

**9. CLAUDE.md:115.** `mfe-auth` deriva a URL do gateway e envia Bearer no cliente de clínicas (apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-auth/src/lib/clinic-api.ts:6-14). Porém, `mfe-pet-profile` usa diretamente a porta 4002 sem adicionar Authorization (apps/mfe-pet-profile/src/lib/api.ts:3-18), e `mfe-admin` faz o mesmo para a 4003 (apps/mfe-admin/src/lib/api.ts:3-9). A generalização para todos os frontends é contradita. O retrato específico do cliente principal atrás de gateway, na afirmação 16, continua confirmado.

**10. README.md:7.** O mecanismo nomeado corresponde ao plugin registrado pela 3.4.2 e às seis relações ativas da 3.4.5. Os dois frontends principais configuram PWA (apps/shell/vite.config.ts:22-54; apps/mfe-auth/vite.config.ts:19-50). A frase descreve a pilha do frontend como conjunto, sem afirmar que cada remote tem PWA ou que a arquitetura já esteja publicada. O comentário específico sobre carregamento lazy recebe sua própria linha 14, por acrescentar o mecanismo no consumidor.

**11. README.md:18-26.** A árvore enumera as oito aplicações encontradas na revisão 3.4.3. Ela descreve diretórios, não limites funcionais completos nem oito implantações. A lista de nomes reaparece em CLAUDE.md:56-58; o papel do shell, que é outra propriedade verificável, está na afirmação 3.

**12. apps/mfe-auth/vite.config.ts:47-48.** O Dockerfile termina em `npm run dev` (apps/mfe-auth/Dockerfile:15), e o script roda Vite (apps/mfe-auth/package.json:7); a configuração liga o service worker nesse modo (apps/mfe-auth/vite.config.ts:49). A revisão 3.4.6 #2 já separa esse serviço de desenvolvimento de deploy de produção. A afirmação confirma o modo do contêiner, sem reivindicar publicação independente.

**13. apps/shell/src/App.tsx:8.** O comentário reaparece em apps/shell/src/App.tsx:43. A implementação substitui a localização da página por uma URL do auth (apps/shell/src/App.tsx:9-14,44), cujo serviço tem entrada própria no Compose (docker-compose.yml:24-32). A independência aqui é a execução do auth como aplicação separada; não implica independência dos serviços backend. A relação federada configurada com auth não é consumida, conforme 3.4.5 #7.

**14. apps/shell/src/App.tsx:17.** Cada declaração seguinte usa `lazy(() => import(...))` para um dos seis remotes (apps/shell/src/App.tsx:18-23). As rotas os inserem sob o layout do shell (apps/shell/src/App.tsx:47-54), dentro de Suspense. O comentário não inclui auth nessa lista; por isso corresponde exatamente às seis construções da 3.4.4 e relações ativas da 3.4.5.

**15. docs/INTERIM_REPORT.md:462.** Os scripts da raiz disparam Turbo e os workspaces delimitam os pacotes (package.json:5-13); a tarefa de build declara dependências e saídas (turbo.json:5-9). A revisão 3.4.6 registra builds separados para as oito aplicações sob esse disparo coordenado. Os comandos em CLAUDE.md:15-28 e docs/VERIFICATION.md:32 ilustram a mesma configuração, mas não demonstram execução bem-sucedida. O estado `Undetermined` de Turbo na 3.4.2 exige uso por automação naquela etapa; aqui os artefatos confirmam a configuração de coordenação, sem estabelecer CI observado.

**16. docs/INTERIM_REPORT.md:504.** O contexto é o cliente funcional PWA e seus serviços backend, não os oito apps indistintamente. A URL do gateway e o cliente autenticado de `mfe-auth` confirmam essa ligação (apps/mfe-auth/src/lib/api-base.ts:49-59; apps/mfe-auth/src/lib/clinic-api.ts:3-14), e o Compose liga o gateway aos serviços (docker-compose.yml:35-61). A mesma visão aparece em docs/PROGRESS_REPORT.md:26-39 e no diagrama docs/diagrams/src/fig06-architecture.mmd:2-30, referenciado por docs/INTERIM_REPORT.md:383-387. A omissão do shell nesse diagrama acompanha o foco no cliente principal; não contradiz a estrutura federada existente.

## Resumo

Afirmações: 16 (corroborada: 11, parcial: 1, contradita: 2, sem corroboração: 2). Temas: (estrutura: 4, composição: 9, build-deploy: 2, independência: 1).
