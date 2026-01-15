import * as readline from 'readline';
import type { Interface } from 'readline';
import { getCommands } from './command.js';
import { PokeAPI } from './pokeapi.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type CLICommands = Record<string, CLICommand>;

export type State = {
    rl: Interface;
    commands: CLICommands;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
};

export function initState() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
    });
    
    const commands = getCommands();

    const pokeAPI = new PokeAPI();

    return { rl, commands, pokeAPI, nextLocationsURL: "", prevLocationsURL: "" };
}