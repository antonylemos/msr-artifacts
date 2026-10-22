import { createScheduler } from '../src';

const scheduler = createScheduler(3); // Max 3 calls/sec

for (let i = 0; i < 10; i++) {
    scheduler(() => {
        console.log(`Executed ${i} at ${new Date().toISOString()}`);
    }, 100 * i);
}
