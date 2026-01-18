import * as readline from 'readline';
import type { Interface } from 'readline';
import { getCommands } from './command.js';
import { PokeAPI, Pokemon } from './pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type CLICommands = Record<string, CLICommand>;

export type State = {
    rl: Interface;
    commands: CLICommands;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string, Pokemon>
};

export function initState(interval: number) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
    });
    
    const commands = getCommands();

    const pokeAPI = new PokeAPI(interval);

    const pokedex: Record<string, Pokemon> = {};

    return { rl, commands, pokeAPI, nextLocationsURL: "", prevLocationsURL: "", pokedex};
}