# Microfrontends with Rspack and Module Federation

This project demonstrates a microfrontends architecture using Rspack, Module Federation, React and Zephyr Cloud.

## Architecture

- **Host Application** (Port 3000): Main application that consumes remote microfrontends
- **Remote Header** (Port 3001): Independent header component
- **Remote Footer** (Port 3002): Independent footer component

## Getting Started

### Install Dependencies

```bash
npm run install:all
```

#### Run Applications

```bash
npm run start:all
```
