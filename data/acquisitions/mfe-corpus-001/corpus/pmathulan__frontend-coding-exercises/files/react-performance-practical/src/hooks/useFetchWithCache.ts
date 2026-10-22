import { useState, useEffect, useCallback, useMemo } from 'react';

// Explicitly define the type for the cache object
const cache: { [key: string]: any } = {};

interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetchWithCache<T>(url: string | null): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Memoized fetch function with caching logic
    const fetchData = useCallback(async () => {
        if (!url) {
            return;
        }

        setLoading(true);
        setError(null);

        if (cache[url]) {
            console.log(`Fetching from cache: ${url}`);
            setData(cache[url] as T);
            setLoading(false);
            return;
        }

        try {
            console.log(`Fetching from API: ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData: T = await response.json();
            setData(jsonData);
            cache[url] = jsonData; // Cache the result using the URL directly
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url]);

    // Fetch data when the URL changes
    useEffect(() => {
        fetchData();
    }, [fetchData]); // fetchData is a stable dependency due to useCallback

    return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}

export default useFetchWithCache;