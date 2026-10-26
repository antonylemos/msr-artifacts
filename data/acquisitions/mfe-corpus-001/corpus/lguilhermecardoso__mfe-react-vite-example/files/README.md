# MicroFrontend React with Module Federation

This project demonstrates a **Microfrontends architecture** using **React**, **Vite**, **Module Federation**, and **TailwindCSS**. The goal is to create a modular, scalable, and maintainable app, composed of multiple independent microfrontends that integrate into the main app (`root-app`).

---

## 📦 Project Structure

```
microfrontends-mf/
├── root-app/                   # Main application (container/orchestrator)
├── mf-login/                   # Microfrontend: Login and sign-up screen
├── mf-dashboard/               # Microfrontend: Main dashboard
├── mf-personagem-detalhe/      # Microfrontend: Character detail (e.g., Rick and Morty)
└── mf-navbar/                  # Microfrontend: Navbar with navigation and user info
```

---

## 🚀 Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (with [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation))
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/) (optional, but recommended)
- Integration with the Rick and Morty public API (in the Dashboard)

---

## 📚 How to Run Locally

Each microfrontend is an **independent project** (with its own `package.json`).  
You must build and preview each one, then start the root-app in development mode.

### 1. Install dependencies

In each folder, install dependencies:

```bash
cd mf-login && npm install
cd ../mf-dashboard && npm install
cd ../mf-personagem-detalhe && npm install
cd ../mf-navbar && npm install
cd ../root-app && npm install
```

---

### 2. Build and preview each microfrontend

In separate terminals (one for each MFE), run:

```bash
# Example for mf-login
cd mf-login
npm run build
npm run preview
# Repeat for mf-dashboard, mf-navbar, mf-personagem-detalhe
```

- `mf-login`: serves on http://localhost:4173 (or the port shown in the terminal)
- `mf-navbar`: serves on http://localhost:4174
- `mf-dashboard`: serves on http://localhost:4175
- `mf-personagem-detalhe`: serves on http://localhost:4176

**Note:** The preview port may increment if default is taken; always check the terminal output.

---

### 3. Start the root-app in development mode

In a new terminal:

```bash
cd root-app
npm run dev
```

The root-app will run on http://localhost:5000 (or your configured dev port), consuming the microfrontends remotely from their preview servers.

---

## 🗂️ Features Already Implemented

- Login (mf-login): authentication screen, sign-up, simulated token return
- Navbar (mf-navbar): displays user info, logout button, integrated navigation, federated integration
- Dashboard (mf-dashboard): initial structure, future integration with Rick and Morty API
- Character Detail (mf-personagem-detalhe): initial structure for displaying a character
- Integration between MFEs via Module Federation
- Styling with TailwindCSS
- Basic global state (user/token via localStorage)

---

## 📅 Roadmap (Short Version)

- [x] Integrated login via MFE
- [x] Federated Navbar displaying logged-in user
- [x] Dashboard with initial structure
- [x] Character Detail MFE created
- [ ] Full integration between Dashboard and Character Detail
- [ ] Rick and Morty API consumption in Dashboard
- [ ] Static deployment (e.g., GitHub Pages)

> See `ROADMAP.md` for a detailed checklist of features and progress.

---

## 🤝 Contributing

- Open issues or pull requests for improvements, bugs, suggestions, or questions!
- Follow conventions and keep each microfrontend isolated and well documented.

---

## 📄 License

MIT

---