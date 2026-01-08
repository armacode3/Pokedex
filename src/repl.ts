import * as readline from 'readline';

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

export function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
    });

    const promptString = "Pokedex > ";
    rl.setPrompt(promptString);

    rl.prompt();

    rl.on("line", (input) => {
        const inputs = cleanInput(input);
        if (inputs.length === 0) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${inputs[0]}`);
        rl.prompt();
    });
}