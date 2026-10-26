# Common Simple - Shared Component Library

Port: **3001**

## Purpose

This micro frontend exposes shared UI components that can be consumed by other micro frontends.

## Exposed Components

- **Button** (`common_simple/Button`)
  - Primary and secondary variants
  - Click handler support

- **Card** (`common_simple/Card`)
  - Title and content sections
  - Styled with shadow and border

## Module Federation Configuration

```typescript
exposes: {
  './Button': './src/components/Button.tsx',
  './Card': './src/components/Card.tsx',
}
```

## Running Independently

```bash
npm run dev
```

Visit: http://localhost:3001

You'll see a demo page showcasing the Button and Card components.

## Usage in Other Apps

```typescript
import Button from 'common_simple/Button';
import Card from 'common_simple/Card';

<Card title="Example">
  <Button onClick={() => console.log('clicked')}>
    Click Me
  </Button>
</Card>
```

## Development

1. Start the dev server first (before starting apps that depend on it)
2. Make changes to components
3. Hot reload will update all consuming apps
