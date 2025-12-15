import { LocationGateway } from "../domain/gateways/LocationGateway";
import { CreatureRepository } from "../domain/repositories/CreatureRepository";
import { Creature } from "../domain/entities/creature";

export class SpawnCreatureAtLocation {
    constructor(
        private locationGateway: LocationGateway,
        private creatureRepository: CreatureRepository
    ) {}

    async execute(lat: number, long: number): Promise<Creature | null> {

        const currentBiome = await this.locationGateway.getBiomeFromLocation(lat, long);
        console.log(`📍 Localização detectada: ${currentBiome}`); // Log para debug


        const possibleCreatures = await this.creatureRepository.findByBiome(currentBiome);

        if (possibleCreatures.length === 0) {
            return null;
        }

        
        let totalWeight = 0;
        for (const c of possibleCreatures) totalWeight += c.rare;

        let randomTicket = Math.random() * totalWeight;

        for (const c of possibleCreatures) {
            if (randomTicket < c.rare) return c;
            randomTicket -= c.rare;
        }

        return possibleCreatures[0];
    }
}