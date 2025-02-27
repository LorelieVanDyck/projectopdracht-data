import * as readline from 'readline';

import agencies from "../jsons/agencies.json";
import astronauts from "../jsons/astronauts.json";
import { createInterface } from 'readline/promises';

interface Agency {
    id: string;
    name: string;
    agencyLogoUrl: string;
    foundedYear: number;
    headquarters: string;
    director: string;
}

interface Astronaut {
    id: string;
    name: string;
    description: string;
    age: number;
    isActive: boolean;
    birthDate: string;
    imageUrl: string;
    rank: string;
    specialties: string[];
    spaceAgency: Agency;
}

const myResponse = createInterface({
    input: process.stdin,
    output: process.stdout
  });

async function showMenu() {
    let exit : boolean =  false;

    do {
        console.log("\nWelcome to the JSON data viewer!\n1. View all data\n2. Filter by ID\n3. Exit");

        const choice =  await myResponse.question("\nPlease enter your choice: ");

        switch (choice.trim()) {
            case "1":
                await viewAllData();
            break;
            case "2":
                await filterByID();
            break;
            case "3":
                console.log("Exiting JSON data viewer...")
                exit = true;
            break;
            default:
                console.log("Invalid choice! Please try again.");
            break;
        }

    } while (!exit);
}

async function viewAllData() {
    astronauts.forEach((astronaut: Astronaut) => {
        console.log(`- ${astronaut.name} (${astronaut.id})`);
    });

    await showMenu();
}

async function filterByID() {
    const id = await myResponse.question("Please enter the ID you want to filter by: ");
    const astronaut = astronauts.find((a: Astronaut) => a.id === id.trim());

    if (!astronaut) {
        console.log("Astronaut not found.");
      } else {
        console.log(`
    - ${astronaut.name} (${astronaut.id})
      - Description: ${astronaut.description}
      - Age: ${astronaut.age}
      - Active: ${astronaut.isActive}
      - Birthdate: ${astronaut.birthDate}
      - Image: ${astronaut.imageUrl}
      - Rank: ${astronaut.rank}
      - Specialties: ${astronaut.specialties.join(", ")}
      - Space Agency: ${astronaut.spaceAgency.name}
        - Headquarters: ${astronaut.spaceAgency.headquarters}
        - Director: ${astronaut.spaceAgency.director}
        `);
      }

    await showMenu();
}

showMenu();