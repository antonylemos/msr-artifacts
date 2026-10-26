---
schema: 1
id: 810080366
full_name: dcblakesley/Controls
url: https://github.com/dcblakesley/Controls
commit: 60fed83f345f65a29984115994d0dad6ce0e389c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [blazor]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 112 — dcblakesley/Controls

## Contexto

WssBlazorControls é uma biblioteca de controles de formulário e UI em Blazor, distribuída como pacote NuGet, com componentes de demonstração em outra Razor Class Library e uma aplicação Blazor de teste/demonstração. O suporte a consumidores MFE é real no nível de resolução de assets e configuração por árvore de componentes, mas não constitui uma unidade de aplicação MFE ou uma composição entre aplicações neste repositório (`README.md:6–19`; `README.md:63–71`; `Controls/Helpers/JsModuleUrl.cs:3–16`).

`frontend_units: 1` conta a aplicação FormTesting, com host e cliente WebAssembly do mesmo aplicativo. Não soma Controls/Controls.Demo, páginas de demonstração, testes bUnit/E2E, arquivos JS auxiliares ou screenshots. A contagem decorre do inventário completo e dos projetos/entradas inspecionados.

## Proveniência na amostra

- Rank 112, ID, identidade e estratégia `terminology`: `data/samples/mfe-sample-001/sample.csv:113`. Clone, branch `master` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:113`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:8701` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:8707`, `pass`. Ambas registram descrição nula, tópicos vazios, linguagem C#, licença MIT, `fork: false` e último push `2026-10-01T16:01:33Z`.
- Consulta `sqlite3 -readonly` nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits`, `queries` e `subqueries`, por `repository_id=810080366`: ambas têm os dois hits abaixo, estratégia `terminology`, endpoint `repositories`, `path` vazio e `partition_label: created:2024-06`.

| Consulta | Grafia de `q` | Subconsulta | Grafia de `q_effective` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2024-06` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2024-06-01..2024-06-30` |
| `terminology-micro-frontends-repositories` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2024-06` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2024-06-01..2024-06-30` |

Os `fetched_at`, em ordem das duas consultas, são `2026-10-07T22:19:13.262Z` e `2026-10-07T22:50:12.634Z` na rodada 001; `2026-10-08T15:53:18.150Z` e `2026-10-08T16:04:57.527Z` na rodada 002. Identificadores SQLite não são referências a linhas de código.

Por eliminação, nome, descrição nula e tópicos vazios não explicam os termos. O README contém a forma hifenizada singular `micro-frontend` em `README.md:68`, `:262`, `:274` e `:1360`, e plural `micro-frontends` em `README.md:2285`. As consultas usam palavras separadas por espaço. Essas grafias são compatíveis com a recuperação via README, mas o banco não identifica o trecho exato ou a normalização do casamento. Nome e hits não confirmam arquitetura.

O README do SHA **não é posterior às buscas**: o último commit que o altera é o próprio HEAD, de `2026-10-01T09:01:29-07:00` (`2026-10-01T16:01:29Z`), anterior aos quatro horários de coleta. A cronologia foi conferida por metadados; nenhum README histórico precisou ser lido.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 490 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. `Controls/`: 184 arquivos; `Controls.Demo/`: 51; `FormTesting/`: 246; `.claude/` e `.github/`: um cada; sete arquivos na raiz. Não há `node_modules`, manifesto npm, submódulo ou configuração de bundler JS. Contagens da árvore Git, sem linhas textuais artificiais. | contexto |
| Estrutura / Build/deploy | Controls usa `Microsoft.NET.Sdk.Razor`, target `net10.0` e PackageId `WssBlazorControls` (`Controls/Controls.csproj:1–14`); Controls.Demo também é Razor Class Library e declara pacote de componentes de demonstração (`Controls.Demo/Controls.Demo.csproj:1–14`; `Controls.Demo/Controls.Demo.csproj:33–38`). Demo referencia Controls como biblioteca (`Controls.Demo/Controls.Demo.csproj:65–67`), não como remote de aplicação. | contrária |
| Estrutura / Build/deploy | Host usa `Microsoft.NET.Sdk.Web`, referencia o cliente e o pacote Blazor WebAssembly Server (`FormTesting/FormTesting/FormTesting.csproj:1–14`); cliente usa SDK BlazorWebAssembly, target `net10.0`, e referencia Controls/Controls.Demo (`FormTesting/FormTesting.Client/FormTesting.Client.csproj:1–18`). São partes do mesmo aplicativo de demonstração, não múltiplas UIs independentes compostas. | contrária |
| Código-fonte (host/cliente) | Host registra Razor Components com WebAssembly interativo e mapeia `App` com o assembly do cliente (`FormTesting/FormTesting/Program.cs:9–13`; `FormTesting/FormTesting/Program.cs:31–37`). Cliente inicia um `WebAssemblyHostBuilder` (`FormTesting/FormTesting.Client/Program.cs:7–11`). A página raiz apresenta `Routes` e o runtime Blazor (`FormTesting/FormTesting/Components/App.razor:18–22`); `Routes` usa o próprio assembly do cliente (`FormTesting/FormTesting.Client/Routes.razor:1–5`). | contrária |
| Código-fonte (consumo) | A página `/` importa Controls/Controls.Demo e renderiza diretamente `<EditControlsDemo />`, opcionalmente sob `FormDefaults` (`FormTesting/FormTesting.Client/Pages/Examples.razor:1–23`). São componentes consumidos pela aplicação, sem build/browser-entry próprio de uma segunda unidade. Os estilos e scripts são assets dos RCLs (`FormTesting/FormTesting/Components/App.razor:11–13`; `FormTesting/FormTesting/Components/App.razor:20–22`). | contrária |
| Configuração / Código-fonte (suporte a MFE) | `FormDefaults.AssetBase` é parâmetro para prefixar URLs absolutas dos módulos `wss-*.js` (`Controls/FormDefaults.razor.cs:61–72`). `JsModuleUrl.Resolve` retorna a URL de um arquivo sob `_content/WssBlazorControls/`, usando origem padrão ou base fornecida (`Controls/Helpers/JsModuleUrl.cs:9–16`). Esse mecanismo carrega assets de controles, sem selecionar/montar aplicações ou publicar ciclo de vida MFE. | moderada |
| Código-fonte (uso efetivo do recurso) | A interoperabilidade faz import fallback de `edit-controls.js` e repete a chamada ao helper quando necessário (`Controls/JsInteropEc.cs:150–182`). A página de teste `JsInteropFallback` envolve um formulário local com `AssetBase` (`FormTesting/FormTesting.Client/Pages/JsInteropFallback.razor:1–8`). O hook do showcase aponta os módulos a um caminho inexistente para testar modo degradado, restringindo-o a caminhos da mesma origem (`FormTesting/FormTesting.Client/Pages/Examples.razor:6–14`; `FormTesting/FormTesting.Client/Pages/Examples.razor:30–49`). Isso confirma o recurso de biblioteca, sem fornecer segunda unidade MFE. | contexto |
| Código-fonte (busca de fronteiras) | Executado `git grep` pelos literais `../../`, `../../../` e a variante Windows `..\..\` em todos os arquivos `*.cs`, `*.razor`, `*.js`, `*.ts` e `*.csproj` do SHA. Quatro resultados: referências a Controls/Controls.Demo no projeto cliente (`FormTesting/FormTesting.Client/FormTesting.Client.csproj:17–18`) e no projeto de testes (`FormTesting/FormTesting.Client.Tests/FormTesting.Client.Tests.csproj:30–33`). São referências de projeto/biblioteca; não se afirma ausência de referências entre pastas nem independência por amostragem. | contexto |
| Tecnologia / Build/deploy | Os SDKs e targets .NET estão declarados; biblioteca, demo, host e cliente usam pacotes Blazor 10.0.12 (`Controls/Controls.csproj:93–95`; `Controls.Demo/Controls.Demo.csproj:57–66`; `FormTesting/FormTesting/FormTesting.csproj:11–14`; `FormTesting/FormTesting.Client/FormTesting.Client.csproj:11–18`). Caminhos ProjectReference e entradas existem. Não há lockfile de restore ou configuração de bundler JS no inventário. Sem restore/build executado: `build_tools: []` não infere bundler a partir de .NET/Blazor. | contexto |
| Tecnologia / Configuração / Composição | Busca textual no SHA por `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap` e `loadRemote`: nenhuma cadeia de composição de aplicações. As menções a microfrontend em comentários/documentação referem-se a consumidores e assets. Hits de iframe no CSS Bootstrap do host não são implementação própria de integração; assets Bootstrap do host não viram unidade frontend. | ausente |
| Documentação / Arquitetura | README descreve biblioteca e instalação NuGet (`README.md:6–26`) e o cenário em que host externo não serve assets da biblioteca (`README.md:63–71`). A documentação de arquitetura do projeto descreve Controls, RCL Demo e host/cliente (`CLAUDE.md:45–49`) e afirma que consumidores frequentemente são MFEs, orientando defaults por árvore (`CLAUDE.md:51–58`). Isso informa requisitos de compatibilidade, não identifica consumidores concretos compostos pelo snapshot. Não há ADR separado no inventário; as orientações arquiteturais e o README são as fontes observadas. | contexto |

## Autoria e histórico

Metadados no SHA: 991 commits alcançáveis, 19 merges, um commit-raiz `27e4a4861f464732e01095be296dcb8a4e7d9538`, clone não shallow. Todos registram autor e committer `David Blakesley`; o raiz é de 03/06/2024 (UTC de 04/06), HEAD de 01/10/2026. As únicas refs são `master`, `origin/master` e `origin/HEAD`, no SHA avaliado; nenhum conteúdo de outro branch foi usado.

`git log --no-renames --name-status` por `Controls/`, `Controls.Demo/`, `FormTesting/FormTesting.Client/` e `FormTesting/FormTesting/`, sempre com `GIT_NO_LAZY_FETCH=1`, mostra evolução dos controles e da aplicação de demonstração. `333421926e4856b723defe9e08b6c9c8e18711ab` (“Add project files.”) acrescenta host/cliente; `e832dbde048395010bfe0f33cb50cd4cfb9e01e8` extrai os componentes de demo para RCL/pacote separado; `8fca42015bbb2ea41d541678163165e8d1da9eb1` atualiza dependências .NET e de testes; HEAD modifica comentários/fontes e remove documentação/imagens antigas. Não houve objeto ausente nessas consultas, nem leitura de blobs históricos.

A identidade Git e o histórico sustentam manutenção sob o titular, sem provar originalidade de todo componente ou do scaffold Blazor. Bootstrap é código terceiro de estilo no host; não foi contado como alvo próprio. A extração de uma biblioteca Demo e referências entre projetos não foi reinterpretada como implementação de aplicações remotas.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma aplicação demonstrativa host/cliente, consumindo duas RCLs como bibliotecas (`FormTesting/FormTesting/FormTesting.csproj:11–14`; `FormTesting/FormTesting.Client/FormTesting.Client.csproj:16–18`). Compatibilidade de assets com consumidores MFE não identifica outra unidade frontend concreta (`Controls/Helpers/JsModuleUrl.cs:9–16`). |
| Q2 | No | Há builds de bibliotecas e partes host/cliente da aplicação, sem duas unidades frontend com entradas/builds independentes para composição. A página importa componentes locais por referências de projeto (`FormTesting/FormTesting.Client/Pages/Examples.razor:1–23`; `FormTesting/FormTesting.Client/FormTesting.Client.csproj:16–18`). A busca integral de caminhos foi realizada e registra os vínculos observados. |
| Q3 | No | O router carrega páginas do mesmo assembly cliente e a raiz usa runtime Blazor convencional (`FormTesting/FormTesting.Client/Routes.razor:1–5`; `FormTesting/FormTesting/Components/App.razor:18–22`), sem host compondo unidades frontend distintas. |
| Q4 | No | O mecanismo implementado é resolução/import de helpers de controles (`Controls/Helpers/JsModuleUrl.cs:9–16`; `Controls/JsInteropEc.cs:177–182`), não conexão entre aplicações. Não há cadeia remotes/exposes/consumo ou outro contrato MFE do candidato. |
| Q5 | No | Biblioteca com demo e suporte a consumidores MFE; não há arquitetura MFE implementada ou unidade de aplicação preparada para host externo neste snapshot. |

## Motivo

- `Non-MFE`: Q1–Q5 No. `repo_type: library`; uma aplicação de demonstração própria, sem contar controles, RCL Demo, testes E2E/bUnit ou bibliotecas externas como unidades.
- Q1 exige alvos frontend ou referências explícitas de configuração de composição. `AssetBase` aponta a arquivos JS, não a uma unidade. Q2 exige entradas/builds próprios das unidades, não apenas projetos .NET compiláveis de bibliotecas. Q4 exige mecanismo configurado e conectando unidades: importar helpers JS e renderizar componentes de RCL não satisfaz esse critério.
- O código de suporte a MFE foi encontrado e inspecionado; não foi descartado como mera palavra no README. Seu uso efetivo trata de origem de assets, defaults de controles e degradação de JS interop. Não expõe uma aplicação com contrato de host externo, portanto não se aplica MFE-unit; Q2–Q4 ficam No.
- Não há questão aberta de composição de aplicações publicadas como pacotes em build time. Os pacotes observados são bibliotecas de controles/demos; o host/cliente Blazor compartilha uma aplicação, não dois frontends independentes. A adaptação a consumidores MFE não converte a própria biblioteca em consumidor composto.
- Diferentemente de 097/103/104, não há cadeia prometida de host/remotes cuja conectividade precise de interpretação. Diferentemente de 089/100, não há federação a arbitrar como code sharing. Os casos 076/084/096/106/109 e o final 007 têm alvos de aplicação ligados por mecanismo explícito; aqui a ligação é consumo convencional de biblioteca.
- Os cuidados de 074/102/080 sobre origem/código terceiro foram aplicados aos assets Bootstrap e ao scaffold, sem apagar o alvo demonstrativo próprio. Não é perfil pessoal como 011/064/068/073/077/101/111; também não se contam instruções/snippets/testes como unidades, conforme 023/075/081/094/105.
- `ui_technologies: [blazor]` decorre dos SDKs, bootstrap e Razor; `build_tools: []` porque não há bundler configurado explicitamente. Não foram executados restore, build, testes ou aplicação. Não há decisão classificatória aberta sobre links, iframes ou falha de execução determinante para Q4.

## Notas para análise

- **RQ1 (famílias):** buscas por `dcblakesley`, `WssBlazor`, `blazor` e `AssetBase` nas anotações disponíveis não localizaram irmão/template já anotado. O comparador funcional mais próximo é 108, biblioteca com showcase, sem atribuir origem comum.
- **RQ1 (sinais enganosos):** uma biblioteca pode ter requisitos e código específicos para ambientes MFE sem ser MFE-unit. A linha `README.md:2285` descreve consumidores hipotéticos/externos, não remotes observáveis do candidato.
- **RQ3:** a cadeia real é aplicativo Blazor → RCLs Controls/Demo → helpers JS em `_content`. `AssetBase` modifica somente a origem dos helpers; a resolução não acrescenta roteamento, mount ou build de outra aplicação.
- **Protocolo:** grafias de consulta/subconsulta foram preservadas; README singular/plural hifenizado é anterior às buscas. Metadados de recuperação indicam compatibilidade textual, sem certificar o campo/trecho exato de casamento ou arquitetura.
- **Protocolo (precedente):** o comparador mais direto é o final 015 (`015-yoonghan__walcron-microfrontend-shared.md`), biblioteca de componentes para consumidores MFE classificada Non-MFE por ser dependência de build, não unidade composta em runtime. Contagem coerente com 015 (sem app próprio, 0) e 108 (showcase, 1); aqui `FormTesting` é o app (1). Revisão independente concordou integralmente com a classe e os campos.
