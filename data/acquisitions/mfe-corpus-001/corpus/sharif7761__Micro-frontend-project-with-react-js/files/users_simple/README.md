# Users Simple - User Management Micro Frontend

Port: **3002**

## Purpose

This micro frontend displays a list of users fetched from the JSONPlaceholder API. It demonstrates:
- Consuming remote components from common_simple
- API integration
- Independent deployment capability

## Features

- Fetches users from https://jsonplaceholder.typicode.com/users
- Displays user information in Card components
- Refresh button to reload data

## Module Federation Configuration

**Exposes:**
```typescript
exposes: {
  './UserList': './src/App.tsx',
}
```

**Consumes:**
```typescript
remotes: {
  common_simple: 'common_simple@http://localhost:3001/remoteEntry.js',
}
```

## Running Independently

```bash
npm run dev
```

**Prerequisites:** Make sure `common_simple` is running first.

Visit: http://localhost:3002

## Running in Core Shell

This app can also be consumed by the core_simple shell app at http://localhost:3000/users

## API

Uses JSONPlaceholder free fake API:
- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Returns 10 fake users with name, email, and phone

## Development

1. Ensure common_simple is running on port 3001
2. Start this app: `npm run dev`
3. Make changes and see hot reload in action
