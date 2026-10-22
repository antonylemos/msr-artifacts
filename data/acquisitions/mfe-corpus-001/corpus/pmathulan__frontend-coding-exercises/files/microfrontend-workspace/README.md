# Angular Micro-Frontend Workspace

This project demonstrates a **Micro-Frontend architecture** using Angular, Module Federation, and a shared library. The structure includes:

- **Shell**: The main host application.
- **MFE1**: A remote micro-frontend loaded at runtime.
- **Shared Library**: Contains services or utilities used across apps.

---

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

Make sure you are in the root workspace folder (microfrontend-workspace/) when running this.

### 2. Run the Applications

Terminal 1: Run MFE1

```bash
ng serve mfe1 --port 4201
```

Terminal 2: Run Shell App

```bash
ng serve shell --port 4200
```

Now open your browser to:

http://localhost:4200 → Loads the Shell App

Navigating to /mfe1 in the shell will dynamically load MFE1 via Module Federation

### How It Works

- Shell (Host Application)
  Routes are defined in APP_ROUTES using loadRemoteModule() from @angular-architects/module-federation.

Micro-frontends like MFE1 are lazy-loaded at runtime.

Shell can share services and state with MFE1 using the shared library.

- MFE1 (Remote App)
  Exposes Angular components or modules via Module Federation.

Registered as a remote in Shell's webpack.config.js.

-- Shared Library
A library generated using ng generate library shared.

Used to share services such as MessageService.

Aliased in tsconfig.base.json for clean imports (e.g., @shared/message.service).

## Inter-App Communication

- To enable communication between Shell and MFE1:
- Define a service (e.g., MessageService) in the shared library.
- Use Angular’s Subject or BehaviorSubject for messaging.
- Both apps consume the same shared service (thanks to Module Federation's shared config).
