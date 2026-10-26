# Descompara Seguros

POC de um sistema de seguros automotivos construído como microfrontends com **Angular 22** + **Nx**, usando **Module Federation nativo** (`@angular-architects/native-federation`).

O sistema é dividido em 3 ambientes independentes, cada um com sua própria identidade visual (cores, raio de borda, etc.), mas todos reaproveitando os mesmos componentes de UI:

| Ambiente | App | Porta | Acesso | Tema |
| --- | --- | --- | --- | --- |
| **Mar Aberto** | `marAberto` | 4201 | Público | Azul claro, cantos bem arredondados |
| **Intranet** | `intranet` | 4202 | Gerentes de conta (`gerente`, `admin`) | Verde/cinza corporativo |
| **Admin** | `admin` | 4203 | Administradores (`admin`) | Escuro, acentos roxo/rosa |

Um app **shell** (host, porta 4200) orquestra a navegação entre eles, descobrindo cada remote em runtime via um manifesto de federação — nenhum dos apps precisa saber dos outros em build-time.

## Estrutura do workspace

```
descompara/
├── shell/              # host — navbar, home, rotas, guards
├── marAberto/           # remote — área pública
├── intranet/            # remote — área restrita (gerente/admin)
├── admin/                # remote — painel de administração
└── libs/shared/
    ├── types/            # interfaces de domínio (Seguradora, ProdutoSeguro, Apolice, UserRole...)
    ├── ui/                # componentes compartilhados: ds-button, ds-badge, ds-card, ds-page-header
    ├── data-access/       # services: AuthService, SeguradorasService, ApolicesService (mock, em memória)
    ├── guards/            # roleGuard — protege rotas do shell por papel do usuário
    └── theme/             # tokens.scss (CSS custom properties por ambiente) + THEME_META
```

Cada `shell`/`marAberto`/`intranet`/`admin` é um projeto Angular independente (`project.json` próprio), gerado com o Nx e ligado por Module Federation. As libs em `libs/shared/*` são os únicos pontos de acoplamento entre eles — importadas via path mapping (`@descompara/shared-ui`, `@descompara/shared-types` etc.), nunca por referência direta entre apps.

### Como funciona o tema por ambiente

Os componentes de `@descompara/shared-ui` não têm cor nenhuma "hardcoded" — usam só `var(--color-primary)`, `var(--radius-md)` etc. Quem define os valores dessas variáveis é `libs/shared/theme/src/lib/tokens.scss`, com um bloco `[data-theme='...']` por ambiente.

Cada remote seta o atributo no próprio componente raiz, por exemplo em `marAberto/src/app/remote-entry/entry.ts`:

```ts
@Component({
  ...
  host: { 'data-theme': 'mar-aberto' },
})
```

Isso faz o mesmo `ds-card`, `ds-button` etc. renderizarem com aparência diferente em cada ambiente — inclusive quando cada remote roda sozinho (fora do shell).

### Como funciona a federação

- Cada remote expõe suas rotas via `federation.config.mjs` (`exposes: { './Routes': '.../entry.routes.ts' }`)
- O shell não importa nada estaticamente: `shell/public/federation.manifest.json` mapeia nome do remote → URL do `remoteEntry.json`, e `shell/src/app/app.routes.ts` carrega cada um em runtime com `loadRemoteModule('marAberto', './Routes')`
- `shared: shareAll(...)` no `federation.config.mjs` garante que `@angular/core`, `rxjs` etc. sejam uma instância única compartilhada entre shell e remotes

### Autenticação e guards (mock)

Não há tela de login — é fora de escopo da POC. `AuthService` (em `shared-data-access`) mantém um usuário mock com role `admin` por padrão, então tudo fica acessível sem fricção. `roleGuard('gerente', 'admin')` e `roleGuard('admin')` protegem `/intranet` e `/admin` no `shell/src/app/app.routes.ts` — troque a role via `authService.setRole(...)` para simular um usuário com menos acesso.

## Rodando localmente

Pré-requisitos: Node 22.22+ ou 24.15+ (o workspace foi criado com Angular 22, que exige uma dessas versões).

```sh
npm install
```

O shell e os 3 remotes são servidos **separadamente** — cada um roda seu próprio dev-server e o shell descobre as URLs deles pelo manifesto. Suba os 4 em terminais separados:

```sh
npx nx serve shell       # http://localhost:4200
npx nx serve marAberto   # http://localhost:4201
npx nx serve intranet    # http://localhost:4202
npx nx serve admin       # http://localhost:4203
```

Ou tudo de uma vez, em paralelo:

```sh
npx nx run-many -t serve --projects=shell,marAberto,intranet,admin --parallel=4
```

Acesse **http://localhost:4200** — a navbar do shell leva para os 3 ambientes. Cada remote também pode ser acessado isoladamente na sua própria porta (útil para desenvolver um ambiente sem subir os outros).

### Outros comandos úteis

```sh
npx nx build shell                          # build de produção de um app
npx nx run-many -t build --projects=shell,marAberto,intranet,admin
npx nx run-many -t lint --projects=shell,marAberto,intranet,admin,ui,data-access,guards,theme
npx nx sync                                 # sincroniza project references do TypeScript (rode se o build acusar "workspace out of sync")
npx nx graph                                # visualiza o grafo de dependências entre apps e libs
```
