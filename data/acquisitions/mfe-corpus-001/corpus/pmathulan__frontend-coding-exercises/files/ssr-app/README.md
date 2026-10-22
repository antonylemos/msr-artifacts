# Angular 19 Standalone App with Bundle Optimization and SSR Hydration

This document outlines how to work with, run, and build the Angular 19 standalone application configured for bundle optimization (code splitting, lazy loading) and Server-Side Rendering (SSR) with hydration.

## How to Work on the Application

## Install Dependencies:

    Navigate to the project root in your terminal and run:

    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Start the Development Server

    For local development without SSR, you can start the standard Angular development server:

    ```bash
    ng serve
    ```
    This will build the client-side application and serve it on `http://localhost:4200`, opening it in your default browser. Changes you make to the code will be automatically rebuilt and the browser will refresh.

## How to Run the SSR Application

To run the application with Server-Side Rendering:

## Build the SSR Application

    Run the following Angular CLI command to build both the client-side and server-side bundles:
    ```bash
    ng build
    ```
    This command will generate the necessary files in the `dist/` directory.

## Access the Application:

    Open your browser and navigate to `http://localhost:4000` (or the port specified in your `server.ts` file). You should now be seeing the application rendered on the server.

## Deployment:

    The output of the build process will be in the `dist/` directory:

    - `dist/ssr-app/browser`: Contains the client-side application files (static assets, JavaScript bundles).
    - `dist/ssr-app/server`: Contains the server-side application bundle (`server.mjs`).

    You will need to deploy both of these to your hosting environment. The `dist/angular-optimized-ssr/browser` directory should be served as your static assets. The `dist/angular-optimized-ssr/server/server.mjs` file needs to be run using Node.js on your server.

    **Deployment Strategies will vary depending on your hosting provider.** Common approaches include:

    - **Node.js Hosting:** Deploy the entire `dist/` folder and run the `server.mjs` file using a process manager like PM2. Configure your web server (e.g., Nginx) to proxy requests to your Node.js application.
    - **Serverless Functions (e.g., AWS Lambda, Google Cloud Functions):** You might need to adapt the `server.ts` to fit the specific requirements of your serverless environment.
    - **Containerization (Docker):** Create a Docker image that includes Node.js, your built application, and instructions to run the server.

## Project Structure

- `src/app/`: Contains the main application logic, including components, configuration, and routing.
- `src/app/components/`: Houses the application's UI components, organized by feature or functionality.
- `src/app/app.config.ts`: Main application configuration, including client-side providers and routing setup.
- `src/app/app.config.server.ts`: Server-specific application configuration for SSR.
- `src/app/app.routes.ts`: Defines the application's routes, including lazy-loaded routes.
- `src/main.ts`: Client-side entry point for the Angular application.
- `src/main.server.ts`: Server-side entry point for the Angular application (for SSR).
- `server.ts`: Node.js server configuration used for serving the SSR application.
- `angular.json`: Angular CLI configuration file.
- `package.json`: npm package definition file.
- `tsconfig*.json`: TypeScript compiler configuration files.
