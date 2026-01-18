import type { State } from "./state.js";

export async function commandPokedex(state: State) {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("There are no records in the Pokedex");
    }

    console.log("Your Pokedex:");

    for (let pokemon of Object.keys(state.pokedex)) {
        console.log(`  -${pokemon}`)
    }
}