import { CreatureRepository } from "../../domain/repositories/CreatureRepository";
import { Creature } from "../../domain/entities/Creature";
import { BiomeType } from "../../domain/entities/Biome";

export class InMemoryCreaturRepository implements CreatureRepository{
    private creatures: Creature[] = [
        new Creature(1, "Caranguejo Gigante", ['MANGUE', 'BEACH'], 30),
        new Creature(2, "Capivara Urbana", ['PARK', 'WATER'], 50),
        new Creature(3, "Tubarão de Boa Viagem", ['BEACH'], 10),
    ];

    async findByBiome(biome: BiomeType): Promise<Creature[]>{
        return this.creatures.filter(c => c.biome.includes(biome))
    }
}