import * as readline from 'readline';
import type { Interface } from 'readline';
import { getCommands } from './command.js';

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type CLICommands = Record<string, CLICommand>;

export type State = {
    rl: Interface;
    commands: CLICommands;
};

export function initState() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
    });
    
    const commands = getCommands();

    return { rl, commands };
}