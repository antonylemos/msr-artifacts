/**
 * RateLimiter class ensures that no more than `maxCalls` occur
 * within any rolling 1-second window.
 */
export class RateLimiter {
    private readonly maxCalls: number;
    private readonly timestamps: number[] = [];

    constructor(maxCalls: number) {
        this.maxCalls = maxCalls;
    }

    async acquireSlot(): Promise<void> {
        const now = Date.now();

        // Remove timestamps older than 1 second
        while (this.timestamps.length > 0 && now - this.timestamps[0] >= 1000) {
            this.timestamps.shift();
        }

        if (this.timestamps.length < this.maxCalls) {
            this.timestamps.push(now);
            return;
        }

        const waitTime = this.timestamps[0] + 1000 - now;

        return new Promise(resolve => {
            setTimeout(() => {
                this.timestamps.shift(); // remove oldest
                this.timestamps.push(Date.now()); // push current
                resolve();
            }, waitTime);
        });
    }
}
