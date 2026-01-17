import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(interval: number) {
        this.#cache = new Cache(interval);
    }

    async fetchLocations(pageUrl?: string): Promise<ShallowLocations> {
        const targetUrl = pageUrl ? pageUrl : `${PokeAPI.baseURL}/location-area`;

        try {
            const data = this.#cache.get(targetUrl);
            if (data !== undefined) {
                return data.val;
            }

            const res = await fetch(targetUrl, {
                    method: "GET",
                    mode: "cors",
            });

            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const result = await res.json();

            this.#cache.add(targetUrl, result);

            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const targetUrl = `${PokeAPI.baseURL}/location-area/${locationName}/`;
        try {
            const data = this.#cache.get(targetUrl);
            if (data !== undefined) {
                return data.val;
            }

            const res = await fetch(targetUrl, {
                method: "GET",
                mode: "cors",
            });

            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const result = await res.json();
            this.#cache.add(targetUrl, result);

            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}


export type ShallowLocations = {
    count: number,
    next: string,
    previous: string,
    results: {
        name: string,
        url: string,
    }[],
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string,
            url: string,
        },
        version_details: {
            rate: number,
            version: {
                name: string,
                url: string,
            };
        }[],
    }[],
    game_index: number,
    id: number,
    location: {
        name: string,
        url: string,
    },
    name: string,
    names: {
        language: {
            name: string,
            url: string,
        },
        name: string,
    }[],
    pokemon_encounters: {
        pokemon: {
            name: string,
            url: string,
        },
        version_details: {
            encounter_details: {
                chance: number,
                condition_values: any[],
                max_level: number,
                method: {
                    name: string,
                    url: string,
                },
                min_level: number,
            }[],
            max_chance: number,
            version: {
                name: string,
                url: string,
            },
        }[]
    }[],
};
