import { validCurrencies } from "@/types";

// Singleton Helper class to handle caching currencies so we don't need to lookup every value every time
export default class CurrencyHelper {
    #cache = new Map(); // caches the conversion amount based on the from and to currencies, with an expiry timestamp
    #expMinutes; 
    #expMS;

    static #instance: CurrencyHelper;

    constructor(expMinutes: number = 60) {
        this.#expMinutes = expMinutes;
        this.#expMS = this.#expMinutes * 60 * 1000;
    }

    updateCacheTimeout(mins: number) {
        if (mins > 0) {
            this.#expMinutes = mins;
            this.#expMS = this.#expMinutes * 60 * 1000;
        }
    }

    get(from: typeof validCurrencies[number], to: typeof validCurrencies[number]) {
        const storedResult = this.#cache.get(from+to);
        if (storedResult) {
            const {amount, exp} = storedResult;
            // if the stored conversion amount hasn't expired, return it
            return exp > Date.now() ? amount : undefined;
        }
        return undefined;
    }

    set(from: typeof validCurrencies[number], to: typeof validCurrencies[number], amount: number) {
        this.#cache.set(from+to, {amount, exp: Date.now() + this.#expMS});
    }

    // persist a global instance of this class to enable currency caching across requests
    static getInstance(): CurrencyHelper {
        if (!this.#instance) {
            if (!(globalThis as any).__currencyCache) {
                (globalThis as any).__currencyCache = new CurrencyHelper();
            }
            this.#instance = (globalThis as any).__currencyCache;
        }
        return this.#instance;
    }
}
