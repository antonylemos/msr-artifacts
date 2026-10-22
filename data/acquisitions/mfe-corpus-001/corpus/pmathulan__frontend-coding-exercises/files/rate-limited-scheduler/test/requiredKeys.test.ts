import { validateRequiredKeys } from "../../rate-limited-scheduler/src/utils/required-keys.util";

type User = {
    id: number;
    name: string;
    email?: string;
};

const user1: User = {
    id: 1,
    name: 'Alice',
};

const user2: User = {
    id: 2,
};

console.log('✅ user1 should pass:');
validateRequiredKeys<User>(user1); // Pass

console.log('❌ user2 should throw error (missing name):');
try {
    validateRequiredKeys<User>(user2); // Throw
} catch (e) {
    console.error((e as Error).message);
}
