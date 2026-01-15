type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalID: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    #reap() {
        for (let [key, value] of this.#cache) {
            if ((value.createdAt - this.#interval) > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    stopReaplLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, { createdAt: Date.now(), val: val});
    }

    get<T>(key: string) {
        if (this.#cache.has(key)) {
            return this.#cache.get(key);
        }
        return undefined;
    }
}