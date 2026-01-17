import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("You must proivde a location name");
    }
    
    const areaName = args[0];

    console.log(`Exploring ${areaName}...`);
    const locationInfo = await state.pokeAPI.fetchLocation(areaName);

    console.log("Found Pokemon:");
    for (const encounter of locationInfo.pokemon_encounters) {
        console.log(`- ${encounter.pokemon.name}`);
    }
}