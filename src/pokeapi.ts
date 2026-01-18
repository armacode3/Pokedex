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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const targetUrl = `${PokeAPI.baseURL}/pokemon/${pokemonName}/`;
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

export type Pokemon = {
    abilities: Ability[],
    base_experience:          number,
    cries:                    Cries,
    forms:                    Species[],
    game_indices:             GameIndex[],
    height:                   number,
    held_items:               HeldItem[],
    id:                       number,
    is_default:               boolean,
    location_area_encounters: string,
    moves:                    Move[],
    name:                     string,
    order:                    number,
    past_abilities:           PastAbility[],
    past_types:               any[],
    species:                  Species,
    sprites:                  Sprites,
    stats:                    Stat[],
    types:                    Type[],
    weight:                   number,
};

export type Ability = {
    ability:   Species | null,
    is_hidden: boolean,
    slot:      number,
};

export type Species = {
    name: string,
    url:  string,
};

export type Cries = {
    latest: string,
    legacy: string,
};

export type GameIndex = {
    game_index: number,
    version:    Species,
};

export type HeldItem = {
    item:            Species,
    version_details: VersionDetail[],
};

export type VersionDetail = {
    rarity:  number,
    version: Species,
};

export type Move = {
    move:                  Species,
    version_group_details: VersionGroupDetail[],
};

export type VersionGroupDetail = {
    level_learned_at:  number,
    move_learn_method: Species,
    order:             number | null,
    version_group:     Species,
};

export type PastAbility = {
    abilities:  Ability[],
    generation: Species,
};

export type GenerationV = {
    "black-white": Sprites,
};

export type GenerationIv = {
    "diamond-pearl":        Sprites,
    "heartgold-soulsilver": Sprites,
    platinum:               Sprites,
};

export type Versions = {
    "generation-i":    GenerationI,
    "generation-ii":   GenerationIi,
    "generation-iii":  GenerationIii,
    "generation-iv":   GenerationIv,
    "generation-ix":   GenerationIx,
    "generation-v":    GenerationV,
    "generation-vi":   { [key: string]: Home },
    "generation-vii":  GenerationVii,
    "generation-viii": GenerationViii,
};

export type Other = {
    dream_world:        DreamWorld,
    home:               Home,
    "official-artwork": OfficialArtwork,
    showdown:           Sprites,
};

export type Sprites = {
    back_default:       string,
    back_female:        string,
    back_shiny:         string,
    back_shiny_female:  null | string,
    front_default:      string,
    front_female:       string,
    front_shiny:        string,
    front_shiny_female: string,
    other?:             Other,
    versions?:          Versions,
    animated?:          Sprites,
};

export type GenerationI = {
    "red-blue": RedBlue,
    yellow:     RedBlue,
};

export type RedBlue = {
    back_default:      string,
    back_gray:         string,
    back_transparent:  string,
    front_default:     string,
    front_gray:        string,
    front_transparent: string,
};

export type GenerationIi = {
    crystal: Crystal,
    gold:    Gold,
    silver:  Gold,
};

export type Crystal = {
    back_default:            string,
    back_shiny:              string,
    back_shiny_transparent:  string,
    back_transparent:        string,
    front_default:           string,
    front_shiny:             string,
    front_shiny_transparent: string,
    front_transparent:       string,
};

export type Gold = {
    back_default:       string,
    back_shiny:         string,
    front_default:      string,
    front_shiny:        string,
    front_transparent?: string,
};

export type GenerationIii = {
    emerald:             OfficialArtwork,
    "firered-leafgreen": Gold,
    "ruby-sapphire":     Gold,
};

export type OfficialArtwork = {
    front_default: string,
    front_shiny:   string,
};

export type GenerationIx = {
    "scarlet-violet": DreamWorld,
};

export type DreamWorld = {
    front_default: string,
    front_female:  null | string,
};

export type Home = {
    front_default:      string,
    front_female:       string,
    front_shiny:        string,
    front_shiny_female: string,
};

export type GenerationVii = {
    icons:                  DreamWorld,
    "ultra-sun-ultra-moon": Home,
};

export type GenerationViii = {
    "brilliant-diamond-shining-pearl": DreamWorld,
    icons:                             DreamWorld,
};

export type Stat = {
    base_stat: number,
    effort:    number,
    stat:      Species,
};

export type Type = {
    slot: number,
    type: Species,
};