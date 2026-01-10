import { getCommands } from './command.js';
import type { State } from './state.js';

export function cleanInput(input: string): string[] {
    const cleanInput = input.trim();
    const words: string[] = cleanInput.split(" ");

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word.trim().toLowerCase();
        words[i] = word;
    }
    return words.filter(Boolean);
}

export function startREPL(state: State) {
    const promptString = "Pokedex > ";
    state.rl.setPrompt(promptString);
    state.rl.prompt();

    state.rl.on("line", (input) => {
        const inputs = cleanInput(input);
        if (inputs.length === 0) {
            state.rl.prompt();
            return;
        }

        const commandName = inputs[0];
        const cmd = state.commands[commandName];

        if (!cmd) {
            console.log("Unknown command");
            state.rl.prompt();
        } else {
            cmd.callback(state);
        }
    });
}