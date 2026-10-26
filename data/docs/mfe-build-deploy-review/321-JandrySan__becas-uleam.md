---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
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

# 321 — JandrySan/becas-uleam

## Leitura do repositório

Monorepo pnpm com a contenedora na raiz e três módulos no workspace: `1verificador-vue`,
`2postulacion-react` e `3seguimiento-angular` (pnpm-workspace.yaml:1-4; package.json:7-11). O
`build` da raiz encadeia, num único comando, o `vite build` da contenedora, o `build` de cada módulo
por `pnpm --dir` e, por fim, `node scripts/build-integrado.mjs` (package.json:17); antes dele, o
`prebuild` roda `scripts/generar-angular-env.mjs` (package.json:16), que gera
`3seguimiento-angular/src/environments/environment.generated.ts` com as variáveis do Supabase e
falha se elas faltarem (scripts/generar-angular-env.mjs:48-61, 63-86). Cada módulo compila no seu
próprio `dist`: Vue com `vite build` e `base: '/vue/'` (1verificador-vue/package.json:8;
1verificador-vue/vite.config.ts:5), React com `tsc -b && vite build` e `base: '/react/'`
(2postulacion-react/package.json:8; 2postulacion-react/vite.config.ts:5), Angular com
`ng build --base-href /angular/` e saída `dist/seguimiento-solicitud-angular`
(3seguimiento-angular/package.json:7; 3seguimiento-angular/angular.json:16). A raiz não tem
`vite.config.*`, então o build da contenedora usa o padrão do Vite, `index.html` como entrada e
`dist` como saída. O `build-integrado.mjs` copia os três `dist` para `dist/vue`, `dist/react` e
`dist/angular` dentro do `dist` da raiz (scripts/build-integrado.mjs:6-19), formando um único site
estático.

O único artefato de deploy é `vercel.json`, que instala com pnpm, roda `pnpm run build` e publica
`dist` (vercel.json:3-5): um só deploy de hospedagem com a contenedora em `/` e os módulos nas
subpastas. É configuração de produção. O README descreve o mesmo deploy em Vercel
(README.md:70-78), cita `npm run build` em vez do `pnpm run build` do `vercel.json`
(README.md:76) e afirma que o `vercel.json` "ya incluye rewrites para `/vue/`, `/react/` y
`/angular/`" (README.md:80), mas o arquivo não tem nenhum `rewrites` (vercel.json:1-6); as
subpastas são servidas como arquivos estáticos do `dist`. O README atribui a escolha de subpastas e
hash routing a "desplegar todo como una sola app estática" (README.md:92). As ocorrências
`ops-hosting` do README (README.md:61, 70, 73, 75, 80) são essa documentação e não decidem a
coluna Deploy.

O resto é desenvolvimento: `start` roda, com `concurrently`, o Vite da contenedora na porta 3000,
o Vite do Vue na 5173, o do React na 5174 e o `ng serve` do Angular na 4200 (package.json:14-15;
3seguimiento-angular/package.json:6), e a contenedora troca as URLs do iframe por essas portas
quando roda em `localhost:3000` (src/main.ts:24-34). Não há Dockerfile, compose, workflow de CI nem
outra configuração de hospedagem no snapshot. Nenhum módulo é publicado como pacote: todos são
`private: true` (1verificador-vue/package.json:3; 2postulacion-react/package.json:4;
3seguimiento-angular/package.json:4), e as versões (package.json:3; 2postulacion-react/package.json:3;
3seguimiento-angular/package.json:3) não são usadas em nenhuma publicação. O `supabase/schema.sql`
é o esquema do banco hospedado no Supabase, não um artefato de build ou deploy de frontend.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | conjunto | `/` (vercel.json:5) | No | package.json:17 (`vite build` da contenedora, primeiro passo do build integrado); vercel.json:3-5 (deploy Vercel único do `dist` integrado) |
| 2 | 1verificador-vue | separado | conjunto | `/vue/` (1verificador-vue/vite.config.ts:5; scripts/build-integrado.mjs:14); `http://localhost:5173/vue/` em desenvolvimento (src/main.ts:26) | No | 1verificador-vue/package.json:8 (`vite build`); 1verificador-vue/vite.config.ts:5 (`base: '/vue/'`); scripts/build-integrado.mjs:14 (copia `dist` para `dist/vue`); vercel.json:3-5 (deploy único) |
| 3 | 1verificador-vue/verificador | separado | não observado | — | No | 1verificador-vue/verificador/package.json:8 (`vue-tsc -b && vite build`); 1verificador-vue/verificador/vite.config.ts:5-7 (plugin Vue, sem `base`) |
| 4 | 2postulacion-react | separado | conjunto | `/react/` (2postulacion-react/vite.config.ts:5; scripts/build-integrado.mjs:15); `http://localhost:5174/react/` em desenvolvimento (src/main.ts:27) | No | 2postulacion-react/package.json:8 (`tsc -b && vite build`); 2postulacion-react/vite.config.ts:5 (`base: '/react/'`); scripts/build-integrado.mjs:15 (copia `dist` para `dist/react`); vercel.json:3-5 (deploy único) |
| 5 | 3seguimiento-angular | separado | conjunto | `/angular/` (3seguimiento-angular/package.json:7; scripts/build-integrado.mjs:16-19); `http://localhost:4200/#/seguimiento` em desenvolvimento (src/main.ts:28) | No | 3seguimiento-angular/package.json:7 (`ng build --base-href /angular/`); 3seguimiento-angular/angular.json:16 (saída `dist/seguimiento-solicitud-angular`); scripts/generar-angular-env.mjs:63-86 (gera o environment do build); scripts/build-integrado.mjs:16-19 (copia o build para `dist/angular`); vercel.json:3-5 (deploy único) |

## Observações

**1. . (contenedora).** O build é o `vite build` do primeiro passo do `build` da raiz
(package.json:17), com a configuração padrão do Vite (não há `vite.config.*` na raiz), que gera o
`dist` da raiz só com a contenedora; os módulos entram nele depois, por cópia. Por isso o build é
`separado`. O deploy é `conjunto`: `vercel.json:3-5` publica esse `dist`, que também contém os três
módulos. A versão `2.0.0` (package.json:3) não é usada na publicação.

**2. 1verificador-vue.** Build próprio com `vite build` (1verificador-vue/package.json:8), que gera
`1verificador-vue/dist` com `base: '/vue/'` (1verificador-vue/vite.config.ts:5); o script da raiz
só o dispara (package.json:17). O deploy é `conjunto`: o `dist` é copiado para `dist/vue`
(scripts/build-integrado.mjs:14) e publicado no mesmo deploy Vercel da contenedora
(vercel.json:3-5). Em desenvolvimento roda à parte na porta 5173 (package.json:14), o que não conta
como deploy. Versão `0.0.0` (1verificador-vue/package.json:4), sem uso.

**3. 1verificador-vue/verificador.** Scaffold Vue aninhado com build próprio
(1verificador-vue/verificador/package.json:8; 1verificador-vue/verificador/vite.config.ts:5-7):
`separado`, mas nenhum script o dispara. Não está no workspace (pnpm-workspace.yaml:1-4), não está
no `build` da raiz (package.json:17) nem nas cópias de `scripts/build-integrado.mjs:14-19`, e o
`vercel.json` publica só o `dist` da raiz. Nenhum artefato de deploy o cobre: `não observado`. A
configuração não define `base`, ao contrário do módulo Vue que o contém.

**4. 2postulacion-react.** Build próprio com `tsc -b && vite build`
(2postulacion-react/package.json:8) e `base: '/react/'` (2postulacion-react/vite.config.ts:5),
disparado pela raiz (package.json:17): `separado`. O `dist` é copiado para `dist/react`
(scripts/build-integrado.mjs:15) e sai no deploy único (vercel.json:3-5): `conjunto`. Porta 5174 só
em desenvolvimento (package.json:14). Versão `1.0.0` (2postulacion-react/package.json:3), sem uso.

**5. 3seguimiento-angular.** Build próprio com `ng build --base-href /angular/`
(3seguimiento-angular/package.json:7), alvo `build` do `angular.json` com saída
`dist/seguimiento-solicitud-angular` (3seguimiento-angular/angular.json:13-16): `separado`. É o
único módulo que depende de um passo da raiz para compilar: o `prebuild` gera o seu
`environment.generated.ts` com as variáveis do Supabase (package.json:16;
scripts/generar-angular-env.mjs:63-86). O build é copiado para `dist/angular`, tentando primeiro a
subpasta `browser` do builder `application` (scripts/build-integrado.mjs:16-19), e publicado no
deploy único (vercel.json:3-5): `conjunto`. `ng serve` na porta 4200 só em desenvolvimento
(package.json:14; 3seguimiento-angular/package.json:6). Versão `1.0.0`
(3seguimiento-angular/package.json:3), sem uso.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (conjunto: 4, não observado: 1). Versionamento independente: 0.
