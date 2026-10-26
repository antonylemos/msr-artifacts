# Micro-Frontend E-Commerce Application

This project is a demonstration of a micro-frontend architecture for a simple e-commerce application, built to fulfill the requirements of a frontend developer evaluation task. It consists of two independent Next.js applications: a **Store** for Browse products and a **Cart** for managing the shopping cart, containerized with Docker for a seamless and reproducible setup.

## Architecture: Multi-Zone Micro-Frontends

The application employs a **Multi-Zone** architecture, a powerful pattern for building scalable frontends.

- **Store App (Zone 1)**: The main application that runs on port `3000`. It serves the product listing page and acts as the primary entry point for users.
- **Cart App (Zone 2)**: An independent application that runs on port `3001`. It is responsible for displaying and managing the contents of the shopping cart.

These two "zones" are seamlessly combined under a single domain using **Next.js Rewrites**. The Store App is configured to proxy all requests for the `/cart` path to the Cart App, making them appear as a single, unified application to the end-user.

## Tech Stack

- **Framework**: Next.js 15 (with App Router)
- **Styling**: Tailwind CSS for a utility-first, responsive design.
- **State Management**: Zustand for lightweight, client-side state management.
- **Data Sharing**: `localStorage` is used to persist and share the cart state between the two independent applications.
- **Containerization**: Docker & Docker Compose for creating a reproducible production environment.

## Features

- **Product Listing**: Products are fetched from a live API (`https://fakestoreapi.com`) and displayed on the store page.
- **Page Caching**: The product page uses **Incremental Static Regeneration (ISR)** to serve a fast, static page that is automatically updated in the background, ensuring both performance and data freshness.
- **Full Shopping Cart**: Users can add items, update quantities (with a minimum of 1), and remove items from their cart.
- **Persistent State**: The cart's contents are saved in `localStorage`, so the state persists across page reloads.
- **User Feedback**: Professional toast notifications provide clear feedback when items are added to the cart.
- **Responsive Design**: The UI is fully responsive and optimized for both desktop and mobile devices.

## How to Run the Application

This project is designed to be run with Docker, which handles all the necessary setup and dependencies.

### Prerequisites

- Docker
- Docker Compose

### Build and Run

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/Axiean/micro-store
    cd micro-store
    ```

2.  **Build and Start the Containers**:
    From the root of the project, run the following single command. This will build the Docker images for both the `store-app` and `cart-app` and start the services.

    ```bash
    docker-compose up --build
    ```

    The initial build may take a few minutes. Once it's complete, the applications will be running.

3.  **Access the Application**:
    - **Main Store Page**: Open your browser and navigate to `http://localhost:3000`
    - **Cart Page**: Click the cart icon in the header or navigate directly to `http://localhost:3000/cart`
