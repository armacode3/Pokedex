export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageUrl?: string): Promise<ShallowLocations> {
        const targetUrl = pageUrl ? pageUrl : `${PokeAPI.baseURL}/location-area`;
        try {
            const res = await fetch(targetUrl, {
                    method: "GET",
                    mode: "cors",
            });

            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        try {
            const res = await fetch(url, {
                method: "GET",
                mode: "cors",
            });

            if (!res.ok) {
                throw new Error(`HTTP error, status: ${res.status}`);
            }

            const result = await res.json();
            console.log(result);
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
