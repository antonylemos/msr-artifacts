---
schema: 1
id: 1408914785
full_name: simcepollaro/quantum-projects
url: https://github.com/simcepollaro/quantum-projects
commit: 21c54ed2315b39d4ed66f5cbaf32bc6f011061bf
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 214 — simcepollaro/quantum-projects

## Contexto

Projetos de computação quântica com Qiskit (`README.md:1–4`). O conteúdo próprio é um script Python (`QEC_test.py`, correção de erro quântico em pares de Bell), quatro figuras, `README.md`, `LICENSE` e `.gitignore`. O repositório versiona também um ambiente virtual Python inteiro (`quantum/`, com `pyvenv.cfg`) que inclui o JupyterLab. O `package.json` do JupyterLab dentro desse ambiente é a origem do acerto. Não há código frontend próprio. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:215` registra rank 214, ID 1408914785, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:215` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:38550` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:38588` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:>=10000` / `"@module-federation" filename:package.json size:>=10000` | `quantum/share/jupyter/lab/static/package.json` | 2026-10-07T21:13:18.193Z / 2026-10-08T15:44:29.580Z |

O arquivo tem 14.693 bytes no SHA, dentro da faixa. É o manifesto `@jupyterlab/application-top` (`:2`) com `"@module-federation/runtime-tools": "^2.0.0"` em `devDependencies` (`:211`), o mesmo manifesto de terceiros do rascunho 205. Ele entrou em `69b22f5` (2026-10-07T22:43:35+02:00, ou 20:43:35Z), cerca de meia hora antes da coleta da rodada 001, e não foi alterado depois.

Os metadados do hit de código trazem só a descrição “Some examples of quantum computing project with qiskit”, sem tópicos nem datas, e sem o termo. A entrada é só por código. O README (`README.md:1–4`) não menciona micro-frontends nem Module Federation.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 597 entradas, sendo 545 arquivos regulares `100644`, 48 executáveis `100755` (scripts de `quantum/bin/`) e 4 symlinks `120000` (`quantum/bin/python` → `/usr/bin/python`, `python3` e `python3.12` → `python`, `quantum/lib64` → `lib`); zero gitlinks. Só 8 entradas ficam fora de `quantum/`: `QEC_test.py`, quatro PNGs, `README.md`, `LICENSE` e `.gitignore`. Os 4 `package.json` estão em `quantum/`. | contrária |
| Código-fonte | `QEC_test.py`: script Qiskit. Não há arquivo `.js`, `.ts`, `.vue` ou `.html` fora de `quantum/`. | contrária |
| Tecnologia (acerto) | `quantum/share/jupyter/lab/static/package.json:2`, `211`: dependência de desenvolvimento do build do próprio JupyterLab, código de terceiros instalado no ambiente virtual. Não é configuração deste projeto. | contrária |
| Busca | `git grep -i` no SHA, excluindo `quantum/`, por `micro.?front` e `federation`: nenhuma ocorrência. | ausente |

## Autoria e histórico

Clone não raso; 5 commits lineares, nenhum merge, todos de Simone Cepollaro `<sim.cepollaro@gmail.com>` (dois como `simcepollaro` pela interface web), entre 2026-10-07 e 2026-10-08:
- `26d6173`: “Initial commit”, com README, LICENSE e `.gitignore`;
- `69b22f5`: adiciona o script e os 589 arquivos de `quantum/`;
- `df752a3`: altera o README;
- `e90118b`: adiciona `N_Bell.py`;
- SHA `21c54ed` (2026-10-08T01:09:09Z): renomeia `N_Bell.py` para `QEC_test.py`.

O SHA é posterior à coleta 001 e anterior à 002, mas o arquivo casado não mudou entre elas. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend própria; o código é um script Python. |
| Q2 | No | Sem unidades, não há entradas ou builds frontend a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | O único sinal é uma dependência declarada no manifesto do JupyterLab vendorizado (`quantum/share/jupyter/lab/static/package.json:211`); “a declared dependency alone is No”, e ela nem pertence ao projeto. |
| Q5 | No | Q1–Q4 são No: projeto Qiskit com ambiente virtual versionado. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. É o mesmo caso do rascunho 205: código de terceiros (JupyterLab) dentro de um ambiente virtual versionado, sem relação com o projeto. Não é o caso de 102/074/080, em que a plataforma de terceiros hospedava as unidades.
- `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`, `repo_type: other` (projetos pessoais de estudo, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** segundo caso na amostra (com 205) de `@module-federation/runtime-tools` do JupyterLab num ambiente virtual versionado casando a busca de código por `package.json`.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002). O repositório foi criado e casado no mesmo dia da coleta 001.
