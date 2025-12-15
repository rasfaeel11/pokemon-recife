import { OverpassLocationGateway } from "./infra/geodata/OverpassLocationGateway";

async function test() {
    const geoService = new OverpassLocationGateway();

    console.log("--- Testando Geolocalização em Recife ---");

    // 1. Marco Zero (Perto da Água/Porto) -> Esperado: WATER ou INDUSTRIAL (depende do mapeamento exato) ou PARK (praça)
    // Vamos ver o que o OSM diz sobre o Marco Zero.
    console.log("Testando Marco Zero...");
    const marcoZero = await geoService.getBiomeFromLocation(-8.0631, -34.8711);
    console.log(`Resultado: ${marcoZero}`);

    // 2. Parque da Jaqueira -> Esperado: PARK
    console.log("\nTestando Parque da Jaqueira...");
    const jaqueira = await geoService.getBiomeFromLocation(-8.0376, -34.9036);
    console.log(`Resultado: ${jaqueira}`);

    // 3. Praia de Boa Viagem (Areia) -> Esperado: BEACH
    console.log("\nTestando Praia de Boa Viagem...");
    const boaViagem = await geoService.getBiomeFromLocation(-8.1274, -34.8995);
    console.log(`Resultado: ${boaViagem}`);
}

test();