# JavaScript & TypeScript Mastery – Frontend Engineer Practical Test

This project includes implementations for 3 core challenges:

1. **Async Scheduling with Rate Limiting**
2. **Required Keys Utility Type**
3. **Function Composition Utility**

Each utility is written in TypeScript and structured with modular best practices. All code is testable via scripts in the `test/` folder.

---

---

## 1.1 Async Programming & Rate Limiting

Implements a `schedule(fn, delay)` that ensures:

- `fn` is executed **after a given delay**
- Respects a **rate limit** (no more than `N` executions per 1 second)

### ✅ Run It

```bash
npm install
npm run start
```

# OR:

```bash
npx ts-node test/scheduler.test.ts
```

## Example Output

```bash
Executed 0 at 2025-04-17T12:00:00.000Z
Executed 1 at 2025-04-17T12:00:00.100Z
Executed 2 at 2025-04-17T12:00:00.200Z
(wait 1s)
Executed 3 at 2025-04-17T12:00:01.250Z
...

1.2 RequiredKeys Utility Type
Extracts only required keys from a type T

Validates an object to ensure all RequiredKeys<T> are present

type User = { id: number; name: string; email?: string };
type RequiredUserKeys = RequiredKeys<User>; // "id" | "name"

validateRequiredKeys<User>({ id: 1, name: 'Alice' }); // ✅ Passes
validateRequiredKeys<User>({ id: 1 }); // ❌ Throws (missing name)

```

### ✅ Run It

```bash
npx ts-node test/required-keys.test.ts
```

---

---

## 1.3 Function Composition & Closures

## Usage

```bash
const double = (x: number) => x * 2;
const toStringAsync = async (x: number) => `Value: ${x}`;
const addExclamation = (x: string) => `${x}!`;

const composed = compose(double, toStringAsync, addExclamation);
await composed(5); // "Value: 10!"

```

✅ Run It

```bash
npx ts-node test/compose.test.ts
```

---

## Scripts

```bash
npm run start                          # Run scheduler.test.ts
npx ts-node test/required-keys.test.ts  # Run required keys validation
npx ts-node test/compose.test.ts        # Run function composition example
```

## Tech Stack

TypeScript
ts-node (for executing .ts files directly)
Node.js (>= 14)

## How to Build

```bash
npm run build
```
