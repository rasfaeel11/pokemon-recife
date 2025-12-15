import { BiomeType } from "../domain/entities/Biome";
import { CreatureRepository } from "../domain/repositories/CreatureRepository";
import { Creature } from "../domain/entities/creature";

export class PickRandomCreature {
    constructor(
        private repository: CreatureRepository
    ) {}

   
    async execute(biome: BiomeType): Promise<Creature | null> {

        const possibleCreatures = await this.repository.findByBiome(biome);


        if (possibleCreatures.length === 0) {
            return null;
        }


        let totalWeight = 0;
        for (const creature of possibleCreatures) {
            totalWeight += creature.rare;
        }


        let randomTicket = Math.random() * totalWeight;

        
        for (const creature of possibleCreatures) {
            
            if (randomTicket < creature.rare) {
                return creature;
            }

            randomTicket -= creature.rare;
        }

        
        return possibleCreatures[0];
    }
}