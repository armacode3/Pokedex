import type { State } from "./state.js";

const catchRates = {
    easy: 0.9,
    medium: 0.6,
    hard: 0.3,
    extreme: 0.05,
};

type difficulty = "easy" | "medium" | "hard" | "extreme";

export async function commandCatch(state: State, ...args: string[]) {
    const pokemonName = args[0];

    if (!pokemonName) {
        throw new Error("Must provide valid pokemon");
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemonInfo = await state.pokeAPI.fetchPokemon(pokemonName);
    
    const difficulty = getDifficulty(pokemonInfo.base_experience);
    
    const rand = Math.random();
    const threshold: number = catchRates[difficulty];

    if (rand < threshold) {
        console.log(`${pokemonName} was caught!`);
        console.log("You may now inspect it with the inspect command.")
        state.pokedex[pokemonName] = pokemonInfo;
        return;
    } else {
        console.log(`${pokemonName} escaped!`);
        return;
    }

}

function getDifficulty(experience: number): difficulty {
    if (experience <= 152) {
        return "easy";
    } else if (experience <= 304) {
        return "medium";
    } else if (experience <= 456) {
        return "hard";
    } else {
        return "extreme";
    }
}