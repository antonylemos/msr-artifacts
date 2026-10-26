---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
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

# 203 — agsosa/react-next-umd-remote-modules-poc

## Leitura do repositório

Prova de conceito com duas aplicações Next.js independentes, `shell` e `mf-1`, cada uma no seu diretório, com `package.json` e `package-lock.json` próprios; não há `package.json` na raiz nem declaração de workspace, então cada aplicação é instalada e construída à parte. O `shell` constrói com `next build` (shell/package.json:7). O `mf-1` tem um build em duas fases: primeiro o Vite gera o bundle UMD dos componentes remotos (`vite build --config vite.mf.ts`, mf-1/package.json:11), depois o Next constrói a aplicação (mf-1/package.json:8). O bundle sai em `public/remote-modules/bundle.js` (mf-1/vite.mf.ts:28, 37-39), ou seja, dentro da pasta `public` do próprio `mf-1`, que o Next serve como arquivo estático; o comentário diz que se aproveita o `/public` do Next "pero podemos subirlo a cualquier otro lugar" (mf-1/vite.mf.ts:28). O arquivo gerado também está versionado no snapshot (mf-1/public/remote-modules/bundle.js:1).

Não há artefato de deploy no snapshot: nenhum Dockerfile, compose, workflow de CI, `vercel.json` ou outra configuração de hospedagem. O README da raiz lista dois endereços na Vercel, um para o `shell` e outro para o `mf-1` (README.md:5-8), o que indica publicações separadas, mas README não é artefato de deploy e não decide a coluna. As demais ocorrências `ops-hosting` (mf-1/README.md:25, 34, 36, 38; shell/README.md:25, 34, 36, 38) são o texto padrão do create-next-app sobre fontes e a Vercel. Os `.gitignore` ignoram `.vercel` (.gitignore:81-82; mf-1/.gitignore:36-37), sem conteúdo versionado.

O que liga as duas aplicações em tempo de execução é só uma URL: o `shell` lê `MF1_BASE_URL` da variável de ambiente, com padrão `http://localhost:3001` (shell/next.config.js:7-9), e pede `MF1_BASE_URL + "/remote-modules/bundle.js"` (shell/src/components/RemoteHeader.tsx:19). Assim o endereço do remote é configurável por ambiente, e o padrão aponta para o servidor de desenvolvimento do `mf-1` (mf-1/package.json:7). Em produção, o `mf-1` acrescenta um cabeçalho `Cache-Control` às respostas de `/remote-modules/:path*` (mf-1/next.config.ts:3, 9-23), configuração do servidor Next pensada para o bundle remoto, mas que não empacota nem publica nada. Um comentário menciona injetar variáveis de ambiente "en los pods de Kubernetes" como pendência (mf-1/vite.mf.ts:9), sem manifesto correspondente no snapshot.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | mf-1 | separado | não observado | porta 3001 em desenvolvimento (mf-1/package.json:7); bundle em `/remote-modules/bundle.js` (mf-1/vite.mf.ts:28, 37) | No | mf-1/package.json:8 (`npm run build:vite && next build`); mf-1/package.json:11 (`vite build --config vite.mf.ts`); mf-1/vite.mf.ts:27-47 (bundle UMD `bundle.js`, global `MF1_RemoteModules`, saída `public/remote-modules`); mf-1/next.config.ts:9-23 (`Cache-Control` em `/remote-modules/:path*` em produção) |
| 2 | shell | separado | não observado | — | No | shell/package.json:7 (`next build`); shell/next.config.js:7-9 (`MF1_BASE_URL`, padrão `http://localhost:3001`) |

## Observações

**1. mf-1.** Build separado: o script `build` do próprio diretório gera o bundle UMD com Vite e em seguida a aplicação Next (mf-1/package.json:8, 11), e nada fora de `mf-1/` entra nesse build. O bundle remoto não é um artefato à parte da aplicação: fica em `public/remote-modules` (mf-1/vite.mf.ts:28) e é servido pelo mesmo servidor Next, que lhe aplica cache em produção (mf-1/next.config.ts:13-17); o consumo pelo `shell` depende de o `mf-1` estar no ar. Deploy não observado: o único endereço no código é a porta 3001 do `next dev` (mf-1/package.json:7), e a publicação na Vercel só aparece no README (README.md:8). Versionamento `No`: a versão `0.1.0` com `private: true` (mf-1/package.json:3-4) não é usada em publicação, e o nome do bundle é fixo, `bundle.js` (mf-1/vite.mf.ts:37).

**2. shell.** Build separado: `next build` no próprio diretório (shell/package.json:7), sem nenhum código do `mf-1` no artefato; os componentes remotos chegam só em runtime pela URL `MF1_BASE_URL` (shell/next.config.js:8; shell/src/components/RemoteHeader.tsx:19). Deploy não observado: o snapshot não tem porta nem configuração de hospedagem do `shell` (`next dev` sem porta, shell/package.json:6), e o endereço na Vercel só aparece no README (README.md:7). Versionamento `No`: `0.1.0` com `private: true` (shell/package.json:3-4), sem uso em publicação.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
