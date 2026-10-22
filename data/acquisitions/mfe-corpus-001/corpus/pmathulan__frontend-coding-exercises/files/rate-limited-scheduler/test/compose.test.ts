import { compose } from '../src/utils/compose.util';

// Sync function
const double = (x: number) => x * 2;

// Async function
const toStringAsync = async (x: number): Promise<string> => {
    return `Value: ${x}`;
};

// Another sync function
const addExclamation = (x: string) => `${x}!`;

// Create composed function
const composed = compose(double, toStringAsync, addExclamation);

(async () => {
    const result = await composed(5);
    console.log(result); // Output: Value: 10!
})();
