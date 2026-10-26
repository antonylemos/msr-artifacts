# Micro Frontend Test App

A simple micro frontend application for testing the [Grafana Faro SDK](https://github.com/grafana/faro-web-sdk) in a distributed architecture.

## Architecture

- **Shell** (port 3000): Host application that loads remote micro frontends
- **Main Content** (port 3001): Remote micro frontend with its own Faro instance

Uses Webpack Module Federation to dynamically load micro frontends at runtime.

## Setup

```bash
npm install
npm start
```

Open http://localhost:3000

## Faro Configuration

Each micro frontend initializes its own Faro instance in `src/faro.ts`. Update the collector URL and app name as needed.

Test buttons in the UI allow you to trigger errors, events, logs, and console messages to verify telemetry collection.

