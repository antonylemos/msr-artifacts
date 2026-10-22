# Artefatos da pesquisa — Micro frontends (MFE)

Este pacote reúne os dados e as análises de uma pesquisa sobre repositórios públicos do GitHub candidatos a implementar micro frontends. Ele cobre a descoberta dos candidatos, a amostragem, a triagem, a aquisição do corpus, a mineração, a inspeção de dependências e as revisões qualitativas. Este arquivo explica como o pacote está organizado e em que ordem consultá-lo. Os resultados ficam nas fontes indicadas abaixo, e todos os links são relativos.

## Mapa das pastas

| Pasta | Função |
|---|---|
| [`config/`](config/) | Método executável da pesquisa: protocolo de elegibilidade, catálogo de consultas e configurações de amostragem, aquisição, mineração e inspeção. |
| [`data/discovery/`](data/discovery/) | Rodada de descoberta dos candidatos, com acertos por consulta e um relatório de diagnóstico. |
| [`data/samples/`](data/samples/) | Amostra sorteada dos candidatos elegíveis e registro da clonagem. |
| [`data/docs/`](data/docs/) | Textos analíticos: as classificações e as oito revisões por repositório, cada uma com um documento metodológico. |
| [`data/acquisitions/`](data/acquisitions/) | Corpus adquirido: um snapshot de cada repositório no commit estudado. Material de apoio. |
| [`data/mining/`](data/mining/) e [`data/inspections/`](data/inspections/) | Dados estruturados da mineração e da inspeção de dependências, por repositório. |
| [`data/clones/`](data/clones/) | Clones compactados dos repositórios, usados na revisão histórica. Material de apoio. |

## Sequência de avaliação

Os arquivos de análise têm o mesmo nome em todas as etapas (`NNN-<owner>__<nome>.md`). Assim, o mesmo repositório pode ser acompanhado de uma etapa à outra.

1. **Método.** Comece por [`config/protocols/micro-frontends.json`](config/protocols/micro-frontends.json), que define a elegibilidade, e pelo [catálogo de consultas](config/catalogs/micro-frontends.json), em que cada consulta traz a justificativa da busca. As demais configurações em [`config/`](config/) parametrizam as etapas seguintes.
2. **Descoberta.** Leia o [relatório de diagnóstico](data/discovery/mfe-round-002/report.md) para ver a cobertura de cada consulta e as limitações da busca. Os candidatos estão em [`candidates.csv`](data/discovery/mfe-round-002/candidates.csv).
3. **Amostragem.** O [manifesto](data/samples/mfe-sample-001/manifest.json) descreve o sorteio, e [`sample.csv`](data/samples/mfe-sample-001/sample.csv) lista a amostra.
4. **Triagem.** As [classificações](data/docs/mfe-classification/) registram a decisão sobre cada repositório e as evidências em que ela se apoia. Esta é a primeira etapa com texto analítico.
5. **Aquisição do corpus.** [`acquisition.csv`](data/acquisitions/mfe-corpus-001/acquisition.csv) lista os repositórios do corpus e o commit estudado. Os snapshots em [`corpus/`](data/acquisitions/mfe-corpus-001/corpus/) servem para conferir uma evidência citada nas revisões.
6. **Mineração.** Os dados em [`data/mining/mfe-mining-001/`](data/mining/mfe-mining-001/) trazem artefatos, padrões e unidades por repositório, a partir do [resumo](data/mining/mfe-mining-001/summary.csv).
7. **Inspeção de dependências.** Os dados em [`data/inspections/mfe-dependencies-001/`](data/inspections/mfe-dependencies-001/) trazem as dependências por tecnologia, a partir do [resumo](data/inspections/mfe-dependencies-001/summary.csv).
8. **Revisões qualitativas.** Em cada pasta, leia primeiro o `INSTRUCTIONS.md`, que descreve o método da revisão, e depois os arquivos de análise. A ordem é:
   1. [dependências](data/docs/mfe-dependency-review/INSTRUCTIONS.md): se cada pacote está configurado e em uso;
   2. [estrutura](data/docs/mfe-structure-review/INSTRUCTIONS.md): quais diretórios são unidades frontend;
   3. [código-fonte](data/docs/mfe-source-review/INSTRUCTIONS.md): quais construções de código fazem unidades interagirem;
   4. [composição](data/docs/mfe-composition-review/INSTRUCTIONS.md): quais relações ligam as unidades;
   5. [build e deploy](data/docs/mfe-build-deploy-review/INSTRUCTIONS.md): se build e deploy são separados ou conjuntos;
   6. [documentação](data/docs/mfe-documentation-review/INSTRUCTIONS.md): o que a documentação afirma e se os artefatos a confirmam;
   7. [histórico](data/docs/mfe-history-review/INSTRUCTIONS.md): o que o histórico de commits esclarece sobre pontos ambíguos. Os [clones](data/clones/) servem para conferir essas consultas;
   8. [evidências](data/docs/mfe-evidence-review/INSTRUCTIONS.md): a síntese das revisões anteriores em observações classificadas por dimensão e por força.
