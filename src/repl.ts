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