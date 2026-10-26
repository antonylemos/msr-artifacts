# Microfrontend Dashboard — Module Federation + Vite

This project is a **Proof of Concept (POC)** created to demonstrate the usage of **Microfrontends with Module Federation** using **Vite, React and TypeScript**.

The goal is to validate the architectural concept in practice, focusing on **application decoupling**, **independent builds**, and **runtime loading of remote front-end applications**.

---

## 🧱 Architecture Overview

The application is composed of three independent front-end applications:

- **Shell (Host)**  
  Responsible for layout, orchestration and dynamically loading the microfrontends.

- **Weather Microfrontend**  
  A standalone widget exposed remotely and loaded by the Shell.

- **Counter Microfrontend**  
  Another standalone widget, independently built and consumed by the Shell.

Each microfrontend:
- Has its own build process
- Can be developed and deployed independently
- Is loaded at runtime via Module Federation

## 🛠 Tech Stack

- **Vite**
- **React**
- **TypeScript**
- **Module Federation**  
  (`@originjs/vite-plugin-federation`)

---

## 🎯 Purpose of this POC

This project is **not focused on the final product**, but on validating core microfrontend concepts, such as:

- Microfrontend architecture using a Shell (Host)
- Runtime loading of remote applications
- Independent builds and deployments
- Front-end decoupling by responsibility
- Integration of multiple applications in a single UI

---

## ▶️ Running the Project Locally

### 1️⃣ Install dependencies

Run the following commands in each project:

```bash
cd mfe-weather
npm install

cd mfe-counter
npm install

cd shell
npm install

### 2️⃣ Build and preview the Microfrontends

cd mfe-weather
npm run build
npm run preview

cd mfe-counter
npm run build
npm run preview

### 3️⃣ Run the Shell (Host)

cd shell
npm run dev

### Finally

http://localhost:5175 in the browser.
