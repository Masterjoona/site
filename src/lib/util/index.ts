export function createAsyncCache<T>(
    fetcher: () => Promise<T | { value: T, ttlMs: number }>,
    defaultTtlMs: number = 60_000
) {
    let cache: T | null = null;
    let cachedAt: number | null = null;
    let ttlMs = defaultTtlMs;

    return async (): Promise<T | null> => {
        const now = Date.now();
        if (cache && cachedAt && now < cachedAt + ttlMs) {
            return cache;
        }

        try {
            const result = await fetcher();

            if (result && typeof result === "object" && "value" in result && "ttlMs" in result) {
                cache = result.value;
                ttlMs = result.ttlMs;
            } else {
                cache = result as T;
                ttlMs = defaultTtlMs;
            }

            cachedAt = now;
            return cache;
        } catch (e) {
            console.error("Failed to fetch data for cache:", e);
            return null;
        }
    };
}
