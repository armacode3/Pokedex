import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    const pokemonName = args[0];

    if (!pokemonName) {
        throw new Error("Undefined pokemon name");
    }

    if (pokemonName in state.pokedex) {
        const pokemonInfo = state.pokedex[pokemonName];
        console.log(`Name: ${pokemonInfo.name}`);
        console.log(`Height: ${pokemonInfo.height}`);
        console.log(`Weight: ${pokemonInfo.weight}`);
        console.log(`Stats: `);
        for (const stat of pokemonInfo.stats) {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const typeInfo of pokemonInfo.types) {
            console.log("  -", typeInfo.type.name);
        }

    } else {
        console.log("you have not caught that pokemon");
        return;
    }
}