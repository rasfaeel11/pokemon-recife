import { InMemoryCreaturRepository } from "./infra/database/InMemoryCreatureReposity";
import { PickRandomCreature } from "./application/PickRandomCreature";

async function main() {
    const repository = new InMemoryCreaturRepository();
    const pickCreature = new PickRandomCreature(repository);

    console.log("--- SIMULADOR DE SPAWN: PRAIA DE BOA VIAGEM ---");
    console.log("Candidatos: Caranguejo (30), Tubarão (10)");
    
    // Vamos tentar spawnar 10 vezes seguidas
    for (let i = 1; i <= 10; i++) {
        const creature = await pickCreature.execute('BEACH');
        
        if (creature) {
            console.log(`Tentativa ${i}: Apareceu um(a) [${creature.name}]`);
        } else {
            console.log(`Tentativa ${i}: Nada apareceu.`);
        }
    }
}

main();