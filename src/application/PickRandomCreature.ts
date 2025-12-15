import { BiomeType } from "../domain/entities/Biome";
import { CreatureRepository } from "../domain/repositories/CreatureRepository";

export class PickRandomCreature {
    constructor(
        protected repository: CreatureRepository
    ){}

    async execute(biome: BiomeType){
        const creatures = await this.repository.findByBiome(biome);
        return creatures;
    }

}