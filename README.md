# Pokedex CLI

A command-line interface (CLI) Pokedex application built with TypeScript and Node.js. This application functions as a REPL (Read-Eval-Print Loop) that allows users to interact with the [PokeAPI](https://pokeapi.co/) to explore locations, discover Pokemon, and attempt to catch them to build their own Pokedex.

## Features

* **Interactive REPL:** A continuous shell environment for entering commands.
* **Location Exploration:** Browse through location areas in the Pokemon world with pagination.
* **Pokemon Discovery:** Explore specific areas to see which Pokemon can be found there.
* **Catching Mechanics:** Attempt to catch Pokemon using a probability-based system determined by the Pokemon's base experience.
* **Pokedex Management:** View a list of caught Pokemon and inspect their detailed statistics (height, weight, stats, types).
* **Caching:** Implements an internal caching system to minimize API requests and improve performance.

## Prerequisites

* Node.js (v18+ recommended)
* npm

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd pokedex
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```
    
### Development Mode
To compile and run the application in a single step:
```bash
npm run dev
```

### Commands
Once the REPL is running (`Pokedex >`), you can use the following commands:

| Command | Description | Usage |
| --- | --- | --- |
| `help` | Displays a help message with all available commands. | `help` |
| `map` | Displays the next 20 location areas in the Pokemon world. | `map` |
| `mapb` | Displays the previous 20 location areas. | `mapb` |
| `explore` | Lists all Pokemon available in a specific location area. | `explore <location_name>` |
| `catch` | Attempts to catch a specific Pokemon. Success is based on difficulty. | `catch <pokemon_name>` |
| `inspect` | Displays details (stats, type, height, weight) of a caught Pokemon. | `inspect <pokemon_name>` |
| `pokedex` | Lists all Pokemon currently in your Pokedex. | `pokedex` |
| `exit` | Exits the application. | `exit` |

### Testing
The project uses Vitest for testing. The suite includes unit tests for input sanitization and the caching mechanism.

To run the tests:
```bash
npm test
```

## Project Structure
- `src/main.ts`: Entry point of the application
- `src/repl.ts`: Handles the Read-Eval-Print Loop logic and input sanitization
- `src/commands/`: Contains the logic for individual commands (catch, explore, map, etc.)
- `src/pokeapi.ts`: Handles interactions with the PokeAPI
- `src/pokecache.ts`: Implements the caching class with a reaping interval to clear old data
- `src/state.ts`: Manages the application state (REPL instance, Pokedex data, pagination URLs)
