/**
 * Utility type to extract only required keys from a given object type `T`.
 */
export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Validates that all required keys of type `T` are present in the object.
 * This is a runtime safeguard on top of static typing.
 *
 * @throws Error if a required key is missing.
 * @returns true if all required keys are present.
 */
export function validateRequiredKeys<T extends object>(obj: T): boolean {
    const requiredKeys = Object.keys(obj).filter(
        key => obj[key as keyof T] !== undefined && obj[key as keyof T] !== null
    );

    for (const key of requiredKeys) {
        if (!(key in obj)) {
            throw new Error(`Missing required key: ${key}`);
        }
    }

    return true;
}
