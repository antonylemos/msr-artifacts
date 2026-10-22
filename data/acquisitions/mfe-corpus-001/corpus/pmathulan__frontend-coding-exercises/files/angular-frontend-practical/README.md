# Angular Frontend Practical — Project Structure & Usage Guide

This project demonstrates best practices for Angular 19+ using:

- ✅ NgRx state management
- ✅ Change Detection with OnPush
- ✅ SRP-compliant architecture
- ✅ SSR-safe localStorage abstraction
- ✅ Smart/presentational component split
- ✅ Lazy-loaded modules and standalone components

### Install dependencies

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

///

## Access App Features

/products Product list with "Add to Cart"
/cart Cart with update/remove/view items
/onpush OnPush demo with lifecycle logging
/ Homepage

## Project Highlights

- LocalStorageService inside core/services is SSR-safe and injectable anywhere
- NgRx store is isolated inside each feature module
- Cart state is persisted automatically with effects (not from component)
- Toasts are shown via ngx-toastr using side effects

## Technologies

- Angular 19
- NgRx 19+
- Standalone components
- Ngx-Toastr
- RxJS
- SSR-safe patterns

## Folder Structure Overview

src/ ├── core/ # Global services (e.g., LocalStorage)

├── features/ # App features │ ├── cart/ # Shopping Cart │ │ ├── models/ # Types/interfaces │ │ ├── components/ # Presentational components (AddToCartButton, CartView) │ │ ├── containers/ # Smart components (CartPage, ProductListPage) │ │ ├── services/ # Cart-specific logic (CartStorageService) │ │ └── store/ # NgRx state (actions, reducer, selectors, effects)

│ ├── product/ # Static product listing │ │ ├── models/ │ │ ├── components/ │ │ └── containers/

│ └── onpush/ # OnPush change detection demo │ ├── components/ │ └── containers/

├── pages/ # Page-level views (e.g. HomePage) │ └── homepage/

├── shared/ # Reusable layout/UI │ └── header/ # App header component
