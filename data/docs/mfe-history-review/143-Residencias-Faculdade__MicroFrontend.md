---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
inputs:
  clone: data/samples/mfe-sample-001/repos/Residencias-Faculdade__MicroFrontend
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Leitura do repositório

O histórico até o snapshot tem 11 commits, sem merges, de 2026-09-09 a 2026-09-30. O primeiro,
`c296e85` (2026-09-09, "feat: NGX shell + posts-crud + docs"), cria 22 arquivos: a casca inteira
(`index.html`, `src/`, `vite.config.ts`, `package.json`, lockfile), `public/microfrontends.json`,
`public/silent-check-sso.html`, `Dockerfile`, `docker-compose.yml`, `nginx.conf`,
`keycloak/realm.json` e o `README.md`. Os oito commits seguintes, todos de 2026-09-30, mexem só nas
dependências (`0a03502`) e no Keycloak: `7de7c8c` cria `Dockerfile.keycloak`, e os demais alteram
esse arquivo e `keycloak/realm.json`. Os dois últimos alteram só o registro:
`d48027b` ("feat: registra member-manager da equipe 2 na shell") e o próprio snapshot `5726e54`
("fix: Exclusão do localhost project"). Nenhum commit remove arquivo, e a árvore do snapshot tem os
mesmos 22 arquivos do primeiro commit mais `Dockerfile.keycloak`.

`README.md`, `docker-compose.yml`, `src/main.ts`, `public/silent-check-sso.html` e `src/tokens.css`
só têm um commit, `c296e85`, e o mesmo identificador de objeto em `c296e85`, `d48027b` e `5726e54`:
para eles, o primeiro commit é a primeira presença observável, e não há versão anterior nem
posterior. O clone não tem o conteúdo das duas versões antigas de `public/microfrontends.json`
(`show` de `c296e85` e de `d48027b` falhou por objeto ausente); delas se sabem os identificadores
(`56083e5…` e `5e1abe5…`, diferentes do `e24f7d7…` do snapshot) e as mensagens dos commits.

Das revisões anteriores, a 3.4.2 não tem dependência, a 3.4.3 não tem unidade `Undetermined`, a
3.4.5 não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. Na 3.4.4, a linha
`src-custom-element` (src/main.ts:218) é prosa de comentário que descreve o contrato, não código
comentado, e não virou ponto; a linha `src-cross-unit-communication` da página de silent SSO, que
nenhum arquivo referencia, virou o ponto 1, junto com a parte da afirmação #13 da 3.4.7 sobre essa
página. Das afirmações da 3.4.7, a `contradita` (#5) é o ponto 2; as `parcial` que dependem do lado
dos frontends externos (#9, #10, #12, #13, #14, #16) viraram um ponto, o 3; a #15, sobre o
`posts-crud`, é o ponto 4. A afirmação `sem corroboração` (#11) não está entre as que o passo 2
levanta. Os documentos `CONEXAO-MICROFRONTEND.md`, `Requisitos-Microfrontend.md` e
`Arquitetura-Visual.md`, que a 3.4.7 registrou como ausentes do snapshot (README.md:212-214), não
aparecem em nenhum commit do histórico; e as referências de linha desatualizadas do README a
src/main.ts não vêm de uma mudança posterior de um dos dois arquivos, que só têm a versão de
`c296e85`. Nenhum desses dois casos é afirmação da tabela da 3.4.7, e eles não viraram ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A página `public/silent-check-sso.html` não é referenciada pela casca, que inicia o Keycloak sem `silentCheckSsoRedirectUri`, e o README a dá como obrigatória para o frontend | 3.4.4 (public/silent-check-sso.html:3); 3.4.7 #13 | ativo ou abandonado | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs | esclarecido |
| 2 | O README diz que o `posts-crud` sobe "se existir", e o compose o declara sem condição | 3.4.7 #5 | estágios em conflito | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs | esclarecido |
| 3 | As afirmações sobre os frontends plugados (cache e CORS do `main.js`, tokens, autenticação, autonomia, "equipe 2") ficam parciais porque nenhum frontend externo está no snapshot | 3.4.7 #9, #10, #12, #13, #14, #16 | extração | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs; 7de7c8c 2026-09-30 feat: Keycloak no Render com redirecionamento ao Vercel; 5726e54 2026-09-30 fix: Exclusão do localhost project | esclarecido |
| 4 | O `posts-crud` aparece no README, no compose e num comentário de `src/main.ts`, e o registro do snapshot só tem o `member-manager` | 3.4.7 #15 | estágios em conflito | c296e85 2026-09-09 feat: NGX shell + posts-crud + docs; d48027b 2026-09-30 feat: registra member-manager da equipe 2 na shell; 5726e54 2026-09-30 fix: Exclusão do localhost project | esclarecido |

## Observações

**1. A página de silent SSO sem referência.** `public/silent-check-sso.html` e `src/main.ts` são
criados em `c296e85` e não mudam depois: os dois têm o mesmo identificador de objeto nos três
commits listados, e o `log` de cada um só mostra `c296e85`. A única versão de `src/main.ts` no
histórico é a do snapshot, com `keycloak.init` sem `silentCheckSsoRedirectUri` (3.4.4,
src/main.ts:74-78). Conclusão, delimitada a esses arquivos: a página nunca foi usada por uma versão
versionada da casca; foi acrescentada junto com ela e não conectada, e não desconectada depois. O
README, que a dá como obrigatória (README.md:129), também é só de `c296e85`. O histórico não mostra
se algum frontend externo a usa. A linha da 3.4.4 continua `none` e `No`, e a afirmação #13 continua
`parcial`.

**2. "se existir" no README e serviço sem condição no compose.** `README.md` e `docker-compose.yml`
só têm a versão de `c296e85`, com o mesmo identificador de objeto em todos os commits consultados.
A promessa de README.md:8 e :72 e a declaração sem perfil nem condição de docker-compose.yml:19-30
entram juntas no primeiro commit e convivem até o snapshot: não são estágios diferentes, e a
divergência não é de um README que ficou para trás de uma mudança versionada do compose. O
histórico não mostra se o compose foi diferente antes do primeiro commit. A afirmação continua
`contradita`.

**3. Os frontends plugados fora do snapshot.** Nenhum commit do histórico remove arquivo, e as
árvores do primeiro commit (22 arquivos) e do snapshot (os mesmos mais `Dockerfile.keycloak`,
criado em `7de7c8c`) só têm a casca, o Keycloak e a documentação: não há em nenhuma versão código,
manifesto ou `Dockerfile` do `member-manager`, do `posts-crud` ou de outro frontend. Conclusão,
delimitada a este repositório: os frontends nunca estiveram aqui, e a ausência deles não é efeito de
uma extração nem de uma remoção versionada; a casca foi feita, desde `c296e85`, para carregar
bundles de outras origens. O histórico não mostra onde esses frontends existem nem se cumprem o
contrato (cache, CORS, tokens, autenticação, comunicação), nem que o `member-manager` seja da
"equipe 2"; a mensagem de `d48027b` repete essa atribuição. As afirmações continuam `parcial`.

**4. O `posts-crud` dos exemplos e o `member-manager` do registro.** O README (README.md:8, :64,
:72, :186), o compose (docker-compose.yml:17-30) e o comentário de src/main.ts:165 só têm a versão
de `c296e85`, cuja mensagem anuncia "posts-crud". O registro `public/microfrontends.json` é o único
desses arquivos alterado depois, duas vezes: `d48027b`, cuja mensagem anuncia o registro do
`member-manager`, e `5726e54`, cuja mensagem anuncia a "Exclusão do localhost project". O conteúdo
das duas versões anteriores do registro não está disponível, então não dá para ver se a de
`c296e85` tinha a entrada `posts-crud` em `localhost:4200` do exemplo do README, nem se a de
`d48027b` tinha as duas entradas; isso vem só das mensagens. Conclusão, delimitada a esses arquivos:
os exemplos com `posts-crud` são do estágio do primeiro commit e não mudaram, e o registro do
snapshot vem de duas mudanças posteriores, feitas sem alterar o README, o compose ou o comentário.
São estágios diferentes. O histórico não mostra se o `posts-crud` é Angular. A afirmação continua
`parcial`.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend rev-list --count 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend rev-list --count --merges 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --reverse --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --reverse --name-status --no-renames --format='== %h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree c296e85 public/microfrontends.json   # recusado pelo script: caminho fora do formato de revisão
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree d48027b public/microfrontends.json   # recusado pelo script: caminho fora do formato de revisão
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree 5726e54 public/microfrontends.json   # recusado pelo script: caminho fora do formato de revisão
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend show c296e85:public/microfrontends.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend show d48027b:public/microfrontends.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- README.md
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- src/main.ts
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- public/silent-check-sso.html
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- src/tokens.css
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend log --format='%h %ad %s' --date=short 5726e54de24e6b6a1ff1fd004b82db909314640c -- keycloak/realm.json
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r c296e85
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r d48027b
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r 5726e54
docs/mfe-history-review/tools/hist.sh Residencias-Faculdade__MicroFrontend ls-tree -r --name-only 5726e54de24e6b6a1ff1fd004b82db909314640c
```

## Resumo

Commits até o snapshot: 11 (2026-09-09 a 2026-09-30). Pontos: 4 (esclarecido: 4, inconclusivo: 0, resolvido pelo snapshot: 0).
