import { InMemoryCreaturRepository } from "./infra/database/InMemoryCreatureReposity";
import { PickRandomCreature } from "./application/PickRandomCreature";

async function main() {
    // 1. Instanciamos o Repositório Fake (nossa "bancada de dados")
    const repository = new InMemoryCreaturRepository();

    // 2. Instanciamos o Caso de Uso, INJETANDO o repositório nele
    const pickCreature = new PickRandomCreature(repository);

    console.log("--- Testando Bioma: PRAIA (BEACH) ---");
    // 3. Executamos a lógica de negócio
    const resultBeach = await pickCreature.execute('BEACH');
    console.log(resultBeach);

    console.log("\n--- Testando Bioma: PARQUE (PARK) ---");
    const resultPark = await pickCreature.execute('PARK');
    console.log(resultPark);
}

main();