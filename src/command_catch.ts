import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("Must provide a Pokemon name");
    }

    const pokemonName = args[0];
    
    console.log(`Throwing a Pokeball at ${pokemonName}...`)

    
}