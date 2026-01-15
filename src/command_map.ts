import type { State } from "./state.js";
import type { ShallowLocations } from "./pokeapi.js";

export async function commandMap(state: State) {
    let shallowLocations: ShallowLocations;
    if (state.nextLocationsURL === "") {
        shallowLocations = await state.pokeAPI.fetchLocations();
    } else {
        shallowLocations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    }
    
    state.nextLocationsURL = shallowLocations.next;
    state.prevLocationsURL = shallowLocations.previous;

    for (let res of shallowLocations.results) {
        console.log(res.name);
    }
}