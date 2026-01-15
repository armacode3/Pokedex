import type { State } from "./state.js";

export async function commandMapb(state: State) {
    if (state.prevLocationsURL === "") {
        console.log("You're on the first page.");
        return;
    }

    const shallowLocations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = shallowLocations.next;
    state.prevLocationsURL = shallowLocations.previous;

    for (let res of shallowLocations.results) {
        console.log(res.name);
    }
    
}