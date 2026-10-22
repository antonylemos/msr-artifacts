// Generates a large list of mock user objects
export function generateLargeList(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `User #${i + 1}`
    }));
}

export type User = ReturnType<typeof generateLargeList>[number];
