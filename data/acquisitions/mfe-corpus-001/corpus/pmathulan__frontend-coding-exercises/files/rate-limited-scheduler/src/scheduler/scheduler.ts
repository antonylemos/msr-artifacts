import { RateLimiter } from './RateLimiter';

/**
 * Factory function to create a scheduler with rate limit
 * @param maxCallsPerSecond - maximum number of calls allowed per second
 */
export function createScheduler(maxCallsPerSecond: number) {
    const limiter = new RateLimiter(maxCallsPerSecond);

    return async function schedule(fn: () => void, delay: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, delay));
        await limiter.acquireSlot();
        fn();
    };
}
