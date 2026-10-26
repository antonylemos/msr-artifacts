# Microfrontend Challenge

Aplicação de e-commerce construída com arquitetura de microfrontends usando **Module Federation** (Vite), **React**, **TypeScript** e **TailwindCSS**.

---

<img width="1512" height="807" alt="Captura de Tela 2026-05-30 às 11 29 24" src="https://github.com/user-attachments/assets/702f936f-bc25-40d9-bb73-4d62199e9743" />


## Estrutura de Pastas

```
microfrontend-challange/
├── apps/
│   ├── host/          # App principal — orquestra os remotes (porta 3000)
│   ├── header/        # Microfrontend do cabeçalho (porta 3001)
│   ├── footer/        # Microfrontend do rodapé (porta 3002)
│   └── products/      # Microfrontend da listagem de produtos (porta 3003)
│
├── packages/
│   ├── shared/        # Estado global (Zustand), API client, React Query config
│   ├── types/         # Tipos TypeScript compartilhados (Product, Cart, etc.)
│   ├── ui/            # Componentes UI reutilizáveis (Skeletons, Modal, CartList)
│   └── config/
│       └── tailwind-config/  # Config base do Tailwind compartilhada
│
├── package.json       # Scripts e dependências raiz (npm workspaces)
└── eslint.config.js
```

### Responsabilidade de cada app

| App        | Porta | Expõe              | Descrição                                      |
|------------|-------|--------------------|------------------------------------------------|
| `host`     | 3000  | —                  | Shell da aplicação, carrega os remotes         |
| `header`   | 3001  | `header/Header`    | Navbar, carrinho (badge + modal) e menu mobile |
| `footer`   | 3002  | `footer/Footer`    | Rodapé da página                               |
| `products` | 3003  | `products/ProductsList` | Grid de produtos com adição ao carrinho  |

---

## Requisitos

- **Node.js** >= 20.19.0
- **npm** >= 10

---

## Instalação

```bash
npm install
```

---

## Rodando em Desenvolvimento

Todos os apps ao mesmo tempo:

```bash
npm run dev:all
```

Ou individualmente:

```bash
npm run dev:header    # http://localhost:3001
npm run dev:footer    # http://localhost:3002
npm run dev:products  # http://localhost:3003
npm run dev:host      # http://localhost:3000 (depende dos outros)
```

> **Importante:** para o `host` funcionar corretamente, os três remotes devem estar rodando antes.

---

## Build

Build completo (todos os apps em sequência):

```bash
npm run build
```

Ou por app:

```bash
npm run build:header
npm run build:footer
npm run build:products
npm run build:host
```

Os artefatos são gerados em `dist/<app>`.

---

## Preview (após build)

```bash
npm run preview:all
```

Ou individualmente:

```bash
npm run preview:header
npm run preview:footer
npm run preview:products
npm run preview        # host
```

---

## Testes

Rodar todos os testes:

```bash
npm test
```

Ou por app:

```bash
npm run test:header
npm run test:products
```

Os testes usam **Vitest** + **Testing Library** com ambiente `jsdom`.

---

## Lint

```bash
npm run lint
```


## ☁️ Deploy dos Microfrontends

A aplicação está distribuída em múltiplos microfrontends, cada um hospedado de forma independente via **AWS S3 + CloudFront**.

### 🌐 Acessar a aplicação

* **Host (App principal)**
  https://d6kooi9qoycog.cloudfront.net

---

### 🔌 Microfrontends (Remotes)

* **Header**
  https://do4w2f9yum2t1.cloudfront.net

* **Products**
  https://dpprlnwt0shjp.cloudfront.net

* **Footer**
  https://d1h65an7ioo3f5.cloudfront.net
---

## Tecnologias Principais

- [Vite](https://vitejs.dev/) + [@module-federation/vite](https://github.com/module-federation/vite)
- [React 19](https://react.dev/)
- [TypeScript 6](https://www.typescriptlang.org/)
- [TailwindCSS 3](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) — estado do carrinho compartilhado entre microfrontends
- [TanStack Query](https://tanstack.com/query) — cache e fetching de dados
- [Axios](https://axios-http.com/) — cliente HTTP
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
