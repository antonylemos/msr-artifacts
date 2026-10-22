/**
 * Compose multiple functions into one.
 * Each function can be synchronous or return a Promise.
 * The composed function runs from left to right: f1(f2(f3(x)))
 */
export function compose<T>(...fns: Array<(input: any) => any | Promise<any>>) {
    return async function (initial: T): Promise<any> {
        let result: any = initial;

        for (const fn of fns) {
            result = await fn(result);
        }

        return result;
    };
}
